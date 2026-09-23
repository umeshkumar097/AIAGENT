import type { UserIntegration } from "@shared/schema";
import { getZohoAccountsDomain, requireOAuthKeys } from "../app-keys";
import { FORM_HEADERS, describeFailure, jsonHeaders, requestJson, truncate } from "../http";
import { authorizedRequest } from "../token-store";
import { DEFAULT_TIMEZONE, appointmentFromEvent, callNoteText, formatIsoWithOffset, leadFromEvent, type LeadLike } from "../normalize";
import { errorMessage, type EventData, type HandleContext, type IntegrationProvider, type SyncResult } from "../types";

const SCOPES = "ZohoCRM.modules.ALL,ZohoCRM.users.READ";
const LEAD_EVENTS = new Set(["lead.upserted", "form.submitted", "form.lead_created"]);
const LEAD_SOURCE = "Zonvo AI";
const TEXT_LIMIT = 32000;

interface ZohoTokenResponse {
  access_token?: string;
  refresh_token?: string;
  api_domain?: string;
  expires_in?: number;
  error?: string;
}
interface ZohoRecordResult {
  code?: string;
  message?: string;
  details?: { id?: string; api_name?: string };
}

function apiDomainFor(accountsDomain: string): string {
  return accountsDomain.replace("accounts.zoho", "www.zohoapis");
}

async function tokenRequest(params: Record<string, string>): Promise<ZohoTokenResponse & { access_token: string }> {
  const [accounts, keys] = await Promise.all([getZohoAccountsDomain(), requireOAuthKeys("zoho", "Zoho CRM")]);
  const res = await requestJson<ZohoTokenResponse>(`${accounts}/oauth/v2/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, ...params }),
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`Zoho token request failed: ${res.data?.error ?? truncate(res.text)}`);
  return { ...res.data, access_token: token };
}

function api<T = any>(row: UserIntegration, path: string, init: RequestInit = {}) {
  return authorizedRequest<T>(row, zohoProvider, (r) => ({
    url: `${r.instanceUrl || "https://www.zohoapis.in"}/crm/v2${path}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Zoho-oauthtoken ${r.accessToken}` }) },
  }));
}

/** Inserts/updates one record; retries once without a field Zoho rejects as INVALID_DATA when that field is optional for us. */
async function writeRecord(row: UserIntegration, method: "POST" | "PUT", path: string, record: Record<string, unknown>, droppable: string[]): Promise<string> {
  const res = await api<{ data?: ZohoRecordResult[] }>(row, path, { method, body: JSON.stringify({ data: [record] }) });
  const result = res.data?.data?.[0];
  if (res.ok && result?.code === "SUCCESS") return result.details?.id ?? "";
  const badField = result?.details?.api_name;
  if (result?.code === "INVALID_DATA" && badField && droppable.includes(badField) && badField in record) {
    const { [badField]: _dropped, ...rest } = record;
    return writeRecord(row, method, path, rest, droppable.filter((f) => f !== badField));
  }
  throw new Error(result?.message ? `Zoho ${result.code}: ${result.message}` : describeFailure("Zoho request", res));
}

async function findLeadId(row: UserIntegration, contact: Pick<LeadLike, "phone" | "email">): Promise<string | null> {
  const queries = [
    contact.phone ? `phone=${encodeURIComponent(contact.phone)}` : null,
    contact.email ? `email=${encodeURIComponent(contact.email)}` : null,
  ].filter((q): q is string => !!q);
  for (const query of queries) {
    const res = await api<{ data?: Array<{ id: string }> }>(row, `/Leads/search?${query}`);
    if (res.status === 204) continue;
    if (!res.ok) throw new Error(describeFailure("Zoho lead search", res));
    const id = res.data?.data?.[0]?.id;
    if (id) return id;
  }
  return null;
}

function leadRecord(lead: LeadLike): Record<string, unknown> {
  const record: Record<string, unknown> = { Last_Name: lead.lastName ?? lead.firstName ?? "Unknown" };
  if (lead.lastName && lead.firstName) record.First_Name = lead.firstName;
  if (lead.phone) record.Phone = lead.phone;
  if (lead.email) record.Email = lead.email;
  if (lead.company) record.Company = lead.company;
  if (lead.summary) record.Description = lead.summary.slice(0, TEXT_LIMIT);
  return record;
}

async function handleLead(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "lead.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const results: SyncResult[] = [];
  const existingId = await findLeadId(row, lead);
  let zohoId: string;
  if (existingId) {
    await writeRecord(row, "PUT", `/Leads/${existingId}`, leadRecord(lead), []);
    zohoId = existingId;
    results.push({ action: "lead.update", status: "success", sourceId: lead.id, externalId: zohoId });
  } else {
    zohoId = await writeRecord(row, "POST", "/Leads", { ...leadRecord(lead), Lead_Source: LEAD_SOURCE }, ["Lead_Source"]);
    results.push({ action: "lead.create", status: "success", sourceId: lead.id, externalId: zohoId });
  }
  // Form answers already live in Description; calls get a Note with the summary + transcript
  const note = lead.origin === "call" ? callNoteText(data, lead) : null;
  if (note && zohoId) {
    const noteId = await writeRecord(row, "POST", `/Leads/${zohoId}/Notes`, { Note_Title: "Call summary", Note_Content: note.slice(0, TEXT_LIMIT) }, []);
    results.push({ action: "note.create", status: "success", sourceId: lead.id, externalId: noteId });
  }
  return results;
}

async function handleAppointment(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "event.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  const leadId = await findLeadId(row, appt.contact);
  if (!leadId) return [{ action: "event.create", status: "skipped", sourceId: appt.id, error: "No Zoho lead matches the appointment contact" }];
  const record: Record<string, unknown> = {
    Event_Title: `${appt.title} — ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    Start_DateTime: formatIsoWithOffset(appt.startUtc, appt.timeZone),
    End_DateTime: formatIsoWithOffset(appt.endUtc, appt.timeZone),
    Participants: [{ type: "lead", participant: leadId }],
  };
  if (appt.notes) record.Description = appt.notes.slice(0, TEXT_LIMIT);
  const eventId = await writeRecord(row, "POST", "/Events", record, ["Participants"]);
  return [{ action: "event.create", status: "success", sourceId: appt.id, externalId: eventId }];
}

export const zohoProvider: IntegrationProvider = {
  key: "zoho",
  displayName: "Zoho CRM",
  kind: "oauth",
  appKeys: ["zoho_client_id", "zoho_client_secret"],

  async getAuthUrl(redirectUri, state) {
    const [accounts, keys] = await Promise.all([getZohoAccountsDomain(), requireOAuthKeys("zoho", "Zoho CRM")]);
    const params = new URLSearchParams({
      scope: SCOPES, client_id: keys.clientId, response_type: "code", access_type: "offline", prompt: "consent", redirect_uri: redirectUri, state,
    });
    return `${accounts}/oauth/v2/auth?${params.toString()}`;
  },

  async exchangeCode(code, redirectUri) {
    const token = await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
    return {
      accessToken: token.access_token,
      refreshToken: token.refresh_token ?? null,
      expiresIn: token.expires_in ?? 3600,
      instanceUrl: token.api_domain ?? apiDomainFor(await getZohoAccountsDomain()),
    };
  },

  async refresh(row) {
    if (!row.refreshToken) throw new Error("No refresh token stored");
    const token = await tokenRequest({ grant_type: "refresh_token", refresh_token: row.refreshToken });
    return { accessToken: token.access_token, expiresIn: token.expires_in ?? 3600, instanceUrl: token.api_domain ?? null };
  },

  async revoke(row) {
    if (!row.refreshToken) return;
    const accounts = await getZohoAccountsDomain();
    await requestJson(`${accounts}/oauth/v2/token/revoke?token=${encodeURIComponent(row.refreshToken)}`, { method: "POST" });
  },

  async validate(row) {
    try {
      const res = await api<{ users?: Array<{ id: string; full_name?: string; email?: string }> }>(row, "/users?type=CurrentUser");
      if (!res.ok) return { ok: false, error: describeFailure("Zoho user lookup", res) };
      const user = res.data?.users?.[0];
      return { ok: true, accountName: user ? [user.full_name, user.email].filter(Boolean).join(" · ") : null, externalAccountId: user?.id ?? null };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  },

  publicConfig() {
    return {};
  },

  supports(event) {
    return LEAD_EVENTS.has(event) || event === "appointment.booked";
  },

  handle(row, event, data, ctx) {
    return event === "appointment.booked" ? handleAppointment(row, data, ctx) : handleLead(row, data, ctx);
  },
};
