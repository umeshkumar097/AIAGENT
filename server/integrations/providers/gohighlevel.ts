import type { UserIntegration } from "@shared/schema";
import { requireOAuthKeys } from "../app-keys";
import { FORM_HEADERS, describeFailure, jsonHeaders, requestJson, truncate, type JsonResponse } from "../http";
import { authorizedRequest } from "../token-store";
import { DEFAULT_TIMEZONE, appointmentFromEvent, asObject, callNoteText, formatIsoWithOffset, leadFromEvent, splitName, str } from "../normalize";
import { errorMessage, type EventData, type HandleContext, type IntegrationProvider, type SyncResult } from "../types";

const BASE = "https://services.leadconnectorhq.com";
const AUTH_URL = "https://marketplace.gohighlevel.com/oauth/chooselocation";
const SCOPES = "contacts.readonly contacts.write calendars.readonly calendars/events.write locations.readonly";
// API version headers from GoHighLevel's published OpenAPI specs (contacts/oauth/locations vs calendars)
const VERSION = "2021-07-28";
const CALENDAR_VERSION = "2021-04-15";
const LEAD_EVENTS = new Set(["lead.upserted", "form.submitted", "form.lead_created"]);

interface GhlTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  locationId?: string;
  companyId?: string;
  userType?: string;
  error?: string;
  message?: string | string[];
}

interface ContactInput {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
}

function ghlMessage(res: JsonResponse): string {
  const message = res.data && typeof res.data === "object" ? (res.data as { message?: string | string[] }).message : undefined;
  return Array.isArray(message) ? message.join("; ") : message ?? truncate(res.text);
}

async function tokenRequest(params: Record<string, string>): Promise<GhlTokenResponse & { access_token: string }> {
  const keys = await requireOAuthKeys("ghl", "GoHighLevel");
  const res = await requestJson<GhlTokenResponse>(`${BASE}/oauth/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, user_type: "Location", ...params }),
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`GoHighLevel token request failed: ${ghlMessage(res)}`);
  return { ...res.data, access_token: token };
}

function locationIdOf(row: UserIntegration): string {
  if (!row.externalAccountId) throw new Error("GoHighLevel location id missing; please reconnect");
  return row.externalAccountId;
}

function api<T = any>(row: UserIntegration, path: string, init: RequestInit = {}, version = VERSION) {
  return authorizedRequest<T>(row, gohighlevelProvider, (r) => ({
    url: `${BASE}${path}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}`, Version: version }) },
  }));
}

async function upsertContact(row: UserIntegration, contact: ContactInput): Promise<{ id: string; created: boolean }> {
  if (!contact.phone && !contact.email) throw new Error("Contact has no phone or email");
  const body: Record<string, unknown> = { locationId: locationIdOf(row), source: "Zonvo AI" };
  if (contact.firstName) body.firstName = contact.firstName;
  if (contact.lastName) body.lastName = contact.lastName;
  if (contact.phone) body.phone = contact.phone;
  if (contact.email) body.email = contact.email;
  const res = await api<{ new?: boolean; contact?: { id?: string } }>(row, "/contacts/upsert", { method: "POST", body: JSON.stringify(body) });
  const id = res.data?.contact?.id;
  if (!res.ok || !id) throw new Error(`GoHighLevel contact upsert failed: ${ghlMessage(res)}`);
  return { id, created: res.data?.new === true };
}

async function addNote(row: UserIntegration, contactId: string, text: string): Promise<string | null> {
  const res = await api<{ note?: { id?: string } }>(row, `/contacts/${encodeURIComponent(contactId)}/notes`, { method: "POST", body: JSON.stringify({ body: text.slice(0, 20_000) }) });
  if (!res.ok) throw new Error(`GoHighLevel note failed: ${ghlMessage(res)}`);
  return res.data?.note?.id ?? null;
}

async function handleLead(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "contact.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const contact = await upsertContact(row, lead);
  const results: SyncResult[] = [{ action: "contact.upsert", status: "success", sourceId: lead.id, externalId: contact.id, payload: { created: contact.created } }];
  const note = callNoteText(data, lead);
  if (note) {
    const noteId = await addNote(row, contact.id, note);
    results.push({ action: "note.create", status: "success", sourceId: lead.id, externalId: noteId });
  }
  return results;
}

async function handleAppointment(row: UserIntegration, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "appointment.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  if (!appt.contact.phone && !appt.contact.email) {
    return [{ action: "appointment.create", status: "skipped", sourceId: appt.id, error: "Appointment contact has no phone or email" }];
  }
  const contact = await upsertContact(row, { ...splitName(appt.contact.name), phone: appt.contact.phone, email: appt.contact.email });
  const results: SyncResult[] = [{ action: "contact.upsert", status: "success", sourceId: appt.id, externalId: contact.id }];
  const calendarId = str(asObject(row.config)?.calendarId);
  if (!calendarId) {
    results.push({ action: "appointment.create", status: "skipped", sourceId: appt.id, error: "No GoHighLevel calendar selected" });
    return results;
  }
  const body = {
    calendarId,
    locationId: locationIdOf(row),
    contactId: contact.id,
    startTime: formatIsoWithOffset(appt.startUtc, appt.timeZone),
    endTime: formatIsoWithOffset(appt.endUtc, appt.timeZone),
    title: `${appt.title} — ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    appointmentStatus: "confirmed",
    ignoreDateRange: true,
    ignoreFreeSlotValidation: true,
  };
  const res = await api<{ id?: string }>(row, "/calendars/events/appointments", { method: "POST", body: JSON.stringify(body) }, CALENDAR_VERSION);
  if (!res.ok || !res.data?.id) throw new Error(`GoHighLevel appointment failed: ${ghlMessage(res)}`);
  results.push({ action: "appointment.create", status: "success", sourceId: appt.id, externalId: res.data.id, payload: { calendarId, startTime: body.startTime } });
  return results;
}

export const gohighlevelProvider: IntegrationProvider = {
  key: "gohighlevel",
  displayName: "GoHighLevel",
  kind: "oauth",
  appKeys: ["ghl_client_id", "ghl_client_secret"],

  async getAuthUrl(redirectUri, state) {
    const keys = await requireOAuthKeys("ghl", "GoHighLevel");
    const params = new URLSearchParams({ response_type: "code", redirect_uri: redirectUri, client_id: keys.clientId, scope: SCOPES, state });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCode(code, redirectUri) {
    const token = await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
    if (!token.locationId) {
      throw new Error("GoHighLevel returned an agency-level token. Install the app on a sub-account (location) and try again.");
    }
    return {
      accessToken: token.access_token,
      refreshToken: token.refresh_token ?? null,
      expiresIn: token.expires_in ?? 86400,
      externalAccountId: token.locationId,
    };
  },

  async refresh(row) {
    if (!row.refreshToken) throw new Error("No refresh token stored");
    const token = await tokenRequest({ grant_type: "refresh_token", refresh_token: row.refreshToken });
    return { accessToken: token.access_token, refreshToken: token.refresh_token ?? null, expiresIn: token.expires_in ?? 86400 };
  },

  async validate(row) {
    try {
      const locationId = locationIdOf(row);
      const res = await api<{ location?: { id?: string; name?: string } }>(row, `/locations/${encodeURIComponent(locationId)}`);
      if (!res.ok) return { ok: false, error: describeFailure("GoHighLevel location lookup", res) };
      return { ok: true, accountName: res.data?.location?.name ?? null, externalAccountId: locationId };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  },

  async options(row) {
    const res = await api<{ calendars?: Array<{ id: string; name: string }> }>(row, `/calendars/?locationId=${encodeURIComponent(locationIdOf(row))}`, {}, CALENDAR_VERSION);
    if (!res.ok) throw new Error(describeFailure("GoHighLevel calendars", res));
    return { calendars: (res.data?.calendars ?? []).map((c) => ({ id: c.id, name: c.name })) };
  },

  async applyConfig(input, existing) {
    const calendarId = str(input.calendarId);
    return { config: { ...(asObject(existing?.config) ?? {}), calendarId } };
  },

  publicConfig(row) {
    return { calendarId: str(asObject(row?.config)?.calendarId), locationId: row?.externalAccountId ?? null };
  },

  supports(event) {
    return LEAD_EVENTS.has(event) || event === "appointment.booked";
  },

  handle(row, event, data, ctx) {
    return event === "appointment.booked" ? handleAppointment(row, data, ctx) : handleLead(row, data, ctx);
  },
};
