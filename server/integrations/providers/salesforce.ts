import type { UserIntegration } from "@shared/schema";
import { getSalesforceLoginUrl, requireOAuthKeys } from "../app-keys";
import { FORM_HEADERS, describeFailure, jsonHeaders, requestJson, truncate } from "../http";
import { authorizedRequest } from "../token-store";
import { DEFAULT_TIMEZONE, appointmentFromEvent, callNoteText, leadFromEvent, type LeadLike } from "../normalize";
import { errorMessage, type EventData, type HandleContext, type IntegrationProvider, type SyncResult } from "../types";

const API_VERSION = "v60.0";
const SCOPES = "api refresh_token offline_access";
const LEAD_EVENTS = new Set(["lead.upserted", "form.submitted", "form.lead_created"]);
const LEAD_SOURCE = "Zonvo AI";
const TEXT_LIMIT = 32000;

interface SfTokenResponse {
  access_token?: string;
  refresh_token?: string;
  instance_url?: string;
  id?: string;
  error?: string;
  error_description?: string;
}
interface SfError {
  message?: string;
  errorCode?: string;
  fields?: string[];
}

async function tokenRequest(params: Record<string, string>): Promise<SfTokenResponse & { access_token: string }> {
  const [loginUrl, keys] = await Promise.all([getSalesforceLoginUrl(), requireOAuthKeys("salesforce", "Salesforce")]);
  const res = await requestJson<SfTokenResponse>(`${loginUrl}/services/oauth2/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, ...params }),
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`Salesforce token request failed: ${res.data?.error_description ?? res.data?.error ?? truncate(res.text)}`);
  return { ...res.data, access_token: token };
}

function instanceUrlOf(row: UserIntegration): string {
  if (!row.instanceUrl) throw new Error("Salesforce instance URL missing; please reconnect");
  return row.instanceUrl.replace(/\/$/, "");
}

function api<T = any>(row: UserIntegration, path: string, init: RequestInit = {}) {
  return authorizedRequest<T>(row, salesforceProvider, (r) => ({
    url: `${instanceUrlOf(r)}/services/data/${API_VERSION}${path}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}` }) },
  }));
}

function sfErrors(res: { data: unknown; text: string; status: number }): SfError[] {
  return Array.isArray(res.data) ? (res.data as SfError[]) : [];
}

function sfFailure(what: string, res: { data: unknown; text: string; status: number }): Error {
  const messages = sfErrors(res).map((e) => `${e.errorCode ?? "ERROR"}: ${e.message ?? ""}`);
  return new Error(messages.length ? `Salesforce ${what} failed: ${messages.join("; ")}` : describeFailure(`Salesforce ${what}`, res as any));
}

/** Creates a record; retries once without a field Salesforce rejects when that field is optional for us. */
async function createRecord(row: UserIntegration, sobject: string, body: Record<string, unknown>, droppable: string[]): Promise<string> {
  const res = await api<{ id?: string; success?: boolean }>(row, `/sobjects/${sobject}`, { method: "POST", body: JSON.stringify(body) });
  if (res.ok && res.data?.id) return res.data.id;
  const badField = sfErrors(res).flatMap((e) => e.fields ?? []).find((f) => droppable.includes(f) && f in body);
  if (badField) {
    const { [badField]: _dropped, ...rest } = body;
    return createRecord(row, sobject, rest, droppable.filter((f) => f !== badField));
  }
  throw sfFailure(`${sobject} create`, res);
}

async function updateRecord(row: UserIntegration, sobject: string, id: string, body: Record<string, unknown>): Promise<void> {
  const res = await api(row, `/sobjects/${sobject}/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) });
  if (!res.ok) throw sfFailure(`${sobject} update`, res);
}

function soql(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function findLeadId(row: UserIntegration, contact: Pick<LeadLike, "phone" | "email">): Promise<string | null> {
  const conditions: string[] = [];
  if (contact.phone) conditions.push(`Phone = '${soql(contact.phone)}'`, `MobilePhone = '${soql(contact.phone)}'`);
  if (contact.email) conditions.push(`Email = '${soql(contact.email)}'`);
  if (!conditions.length) return null;
  const query = `SELECT Id FROM Lead WHERE IsConverted = false AND (${conditions.join(" OR ")}) ORDER BY CreatedDate DESC LIMIT 1`;
  const res = await api<{ records?: Array<{ Id: string }> }>(row, `/query?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw sfFailure("lead query", res);
  return res.data?.records?.[0]?.Id ?? null;
}

function leadRecord(lead: LeadLike, forUpdate: boolean): Record<string, unknown> {
  const record: Record<string, unknown> = { LastName: lead.lastName ?? lead.firstName ?? "Unknown" };
  if (lead.lastName && lead.firstName) record.FirstName = lead.firstName;
  if (lead.company) record.Company = lead.company;
  else if (!forUpdate) record.Company = "Unknown";
  if (lead.phone) record.Phone = lead.phone;
  if (lead.email) record.Email = lead.email;
  if (lead.summary) record.Description = lead.summary.slice(0, TEXT_LIMIT);
  return record;
}

async function handleLead(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "lead.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const results: SyncResult[] = [];
  let leadId = await findLeadId(row, lead);
  if (leadId) {
    await updateRecord(row, "Lead", leadId, leadRecord(lead, true));
    results.push({ action: "lead.update", status: "success", sourceId: lead.id, externalId: leadId });
  } else {
    leadId = await createRecord(row, "Lead", { ...leadRecord(lead, false), LeadSource: LEAD_SOURCE }, ["LeadSource"]);
    results.push({ action: "lead.create", status: "success", sourceId: lead.id, externalId: leadId });
  }
  const note = lead.origin === "call" ? callNoteText(data, lead) : null;
  if (note) {
    const taskId = await createRecord(row, "Task", {
      Subject: "AI call",
      Description: note.slice(0, TEXT_LIMIT),
      WhoId: leadId,
      Status: "Completed",
      TaskSubtype: "Call",
      ActivityDate: new Date().toISOString().slice(0, 10),
    }, ["TaskSubtype", "Status"]);
    results.push({ action: "task.create", status: "success", sourceId: lead.id, externalId: taskId });
  }
  return results;
}

async function handleAppointment(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "event.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  const leadId = await findLeadId(row, appt.contact);
  if (!leadId) return [{ action: "event.create", status: "skipped", sourceId: appt.id, error: "No Salesforce lead matches the appointment contact" }];
  const body: Record<string, unknown> = {
    Subject: `${appt.title} — ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    StartDateTime: appt.startUtc.toISOString(),
    EndDateTime: appt.endUtc.toISOString(),
    DurationInMinutes: appt.durationMinutes,
    WhoId: leadId,
  };
  if (appt.notes) body.Description = appt.notes.slice(0, TEXT_LIMIT);
  const eventId = await createRecord(row, "Event", body, []);
  return [{ action: "event.create", status: "success", sourceId: appt.id, externalId: eventId }];
}

function orgIdFromIdentity(identityUrl: string | undefined): string | null {
  // https://login.salesforce.com/id/<orgId>/<userId>
  const match = identityUrl?.match(/\/id\/([^/]+)\/[^/]+$/);
  return match?.[1] ?? null;
}

export const salesforceProvider: IntegrationProvider = {
  key: "salesforce",
  displayName: "Salesforce",
  kind: "oauth",
  appKeys: ["salesforce_client_id", "salesforce_client_secret"],

  async getAuthUrl(redirectUri, state) {
    const [loginUrl, keys] = await Promise.all([getSalesforceLoginUrl(), requireOAuthKeys("salesforce", "Salesforce")]);
    const params = new URLSearchParams({ response_type: "code", client_id: keys.clientId, redirect_uri: redirectUri, scope: SCOPES, state });
    return `${loginUrl}/services/oauth2/authorize?${params.toString()}`;
  },

  async exchangeCode(code, redirectUri) {
    const token = await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
    if (!token.instance_url) throw new Error("Salesforce did not return an instance URL");
    // Salesforce does not return expires_in here; a 401 triggers the refresh path instead
    return {
      accessToken: token.access_token,
      refreshToken: token.refresh_token ?? null,
      expiresIn: null,
      instanceUrl: token.instance_url,
      externalAccountId: orgIdFromIdentity(token.id),
    };
  },

  async refresh(row) {
    if (!row.refreshToken) throw new Error("No refresh token stored");
    const token = await tokenRequest({ grant_type: "refresh_token", refresh_token: row.refreshToken });
    return { accessToken: token.access_token, instanceUrl: token.instance_url ?? null, expiresIn: null };
  },

  async revoke(row) {
    if (!row.refreshToken) return;
    const loginUrl = await getSalesforceLoginUrl();
    await requestJson(`${loginUrl}/services/oauth2/revoke`, { method: "POST", headers: FORM_HEADERS, body: new URLSearchParams({ token: row.refreshToken }) });
  },

  async validate(row) {
    try {
      const res = await authorizedRequest<{ name?: string; email?: string; organization_id?: string; preferred_username?: string }>(row, salesforceProvider, (r) => ({
        url: `${instanceUrlOf(r)}/services/oauth2/userinfo`,
        init: { headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}` }) },
      }));
      if (!res.ok) return { ok: false, error: describeFailure("Salesforce userinfo", res) };
      const info = res.data ?? {};
      return {
        ok: true,
        accountName: [info.name, info.preferred_username ?? info.email].filter(Boolean).join(" · ") || null,
        externalAccountId: info.organization_id ?? row.externalAccountId ?? null,
      };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  },

  publicConfig(row) {
    return { instanceUrl: row?.instanceUrl ?? null };
  },

  supports(event) {
    return LEAD_EVENTS.has(event) || event === "appointment.booked";
  },

  handle(row, event, data, ctx) {
    return event === "appointment.booked" ? handleAppointment(row, data, ctx) : handleLead(row, data, ctx);
  },
};
