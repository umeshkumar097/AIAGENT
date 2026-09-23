import type { UserIntegration } from "@shared/schema";
import { describeFailure, jsonHeaders, requestJson, truncate, type JsonResponse } from "../http";
import { DEFAULT_TIMEZONE, appointmentFromEvent, asObject, digitsOnly, isValidTimeZone, str, type AppointmentLike } from "../normalize";
import { ProviderAuthError, errorMessage, type EventData, type HandleContext, type IntegrationProvider, type SyncResult } from "../types";

const BASE = "https://api.cal.com/v2";
// Per cal.com/docs/api-reference/v2 (Sept 2026): event types 2024-06-14, bookings + cancel 2026-02-25
const EVENT_TYPES_VERSION = "2024-06-14";
const BOOKINGS_VERSION = "2026-02-25";
const APPOINTMENT_EVENTS = new Set(["appointment.booked", "appointment.cancelled", "appointment.rescheduled"]);
const FALLBACK_EMAIL_DOMAIN = "noemail.zonvo.tech";

interface CalConfig {
  eventTypeId: number | null;
  timeZone: string;
}

function configOf(row: UserIntegration | null): CalConfig {
  const config = asObject(row?.config) ?? {};
  const eventTypeId = Number(config.eventTypeId);
  const timeZone = str(config.timeZone);
  return {
    eventTypeId: Number.isInteger(eventTypeId) && eventTypeId > 0 ? eventTypeId : null,
    timeZone: isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE,
  };
}

function calMessage(res: JsonResponse): string {
  const data = res.data && typeof res.data === "object" ? (res.data as { error?: { message?: string }; message?: string }) : null;
  return data?.error?.message ?? data?.message ?? truncate(res.text);
}

async function api<T = any>(row: UserIntegration, path: string, init: RequestInit = {}, version?: string): Promise<JsonResponse<T>> {
  if (!row.accessToken) throw new ProviderAuthError("Cal.com API key is not set");
  const res = await requestJson<T>(`${BASE}${path}`, {
    ...init,
    headers: jsonHeaders({ Authorization: `Bearer ${row.accessToken}`, ...(version ? { "cal-api-version": version } : {}) }),
  });
  if (res.status === 401) throw new ProviderAuthError("Cal.com rejected the API key; please enter a new one");
  return res;
}

function e164(phone: string | null): string | null {
  if (!phone) return null;
  const digits = digitsOnly(phone);
  return digits.length >= 8 ? `+${digits}` : null;
}

async function createBooking(row: UserIntegration, appt: AppointmentLike, eventTypeId: number): Promise<string> {
  if (!appt.startUtc) throw new Error("Appointment has no usable date/time");
  const phone = e164(appt.contact.phone);
  const metadata: Record<string, string> = { source: "zonvo-ai" };
  if (appt.id) metadata.appointmentId = appt.id;
  const body = {
    start: appt.startUtc.toISOString(),
    eventTypeId,
    attendee: {
      name: appt.contact.name ?? appt.contact.phone ?? "Guest",
      email: appt.contact.email ?? `${digitsOnly(appt.contact.phone) || "guest"}@${FALLBACK_EMAIL_DOMAIN}`,
      timeZone: appt.timeZone,
      language: "en",
      ...(phone ? { phoneNumber: phone } : {}),
    },
    metadata,
  };
  const res = await api<{ data?: { uid?: string } }>(row, "/bookings", { method: "POST", body: JSON.stringify(body) }, BOOKINGS_VERSION);
  const uid = res.data?.data?.uid;
  if (!res.ok || !uid) throw new Error(`Cal.com booking failed: ${calMessage(res)}`);
  return uid;
}

async function cancelBooking(row: UserIntegration, uid: string, reason: string): Promise<void> {
  const res = await api(row, `/bookings/${encodeURIComponent(uid)}/cancel`, { method: "POST", body: JSON.stringify({ cancellationReason: reason }) }, BOOKINGS_VERSION);
  if (!res.ok) throw new Error(`Cal.com cancel failed: ${calMessage(res)}`);
}

async function handleBooked(row: UserIntegration, appt: AppointmentLike | null, ctx: HandleContext): Promise<SyncResult[]> {
  const { eventTypeId } = configOf(row);
  if (!eventTypeId) return [{ action: "booking.create", status: "skipped", sourceId: ctx.sourceId, error: "No Cal.com event type selected" }];
  if (!appt?.startUtc) return [{ action: "booking.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  const uid = await createBooking(row, appt, eventTypeId);
  return [{ action: "booking.create", status: "success", sourceId: appt.id, externalId: uid, payload: { start: appt.startUtc.toISOString() } }];
}

async function handleCancelled(row: UserIntegration, appt: AppointmentLike | null, data: EventData, ctx: HandleContext): Promise<SyncResult[]> {
  const sourceId = appt?.id ?? ctx.sourceId;
  const uid = sourceId ? await ctx.findExternalId("booking.create", sourceId) : null;
  if (!uid) return [{ action: "booking.cancel", status: "skipped", sourceId, error: "No Cal.com booking recorded for this appointment" }];
  await cancelBooking(row, uid, str(data.cancelReason) ?? "Cancelled in Zonvo");
  return [{ action: "booking.cancel", status: "success", sourceId, externalId: uid }];
}

async function handleRescheduled(row: UserIntegration, appt: AppointmentLike | null, ctx: HandleContext): Promise<SyncResult[]> {
  const sourceId = appt?.id ?? ctx.sourceId;
  const results: SyncResult[] = [];
  const uid = sourceId ? await ctx.findExternalId("booking.create", sourceId) : null;
  if (uid) {
    try {
      await cancelBooking(row, uid, "Rescheduled in Zonvo");
      results.push({ action: "booking.cancel", status: "success", sourceId, externalId: uid });
    } catch (err) {
      results.push({ action: "booking.cancel", status: "failed", sourceId, externalId: uid, error: errorMessage(err) });
    }
  }
  results.push(...await handleBooked(row, appt, ctx));
  return results;
}

export const calcomProvider: IntegrationProvider = {
  key: "calcom",
  displayName: "Cal.com",
  kind: "apikey",
  appKeys: [],

  async validate(row) {
    try {
      const res = await api<{ data?: { id?: number; username?: string; email?: string; name?: string } }>(row, "/me");
      if (!res.ok) return { ok: false, error: describeFailure("Cal.com profile lookup", res) };
      const me = res.data?.data ?? {};
      return {
        ok: true,
        accountName: [me.name ?? me.username, me.email].filter(Boolean).join(" · ") || null,
        externalAccountId: me.id != null ? String(me.id) : null,
      };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  },

  async options(row) {
    const res = await api<{ data?: unknown }>(row, "/event-types", {}, EVENT_TYPES_VERSION);
    if (!res.ok) throw new Error(describeFailure("Cal.com event types", res));
    const raw = res.data?.data;
    const list = Array.isArray(raw) ? raw : (asObject(raw)?.eventTypes as unknown[] | undefined) ?? [];
    const eventTypes = list
      .map((item) => asObject(item))
      .filter((item): item is Record<string, unknown> => !!item)
      .map((item) => ({ id: Number(item.id), title: str(item.title) ?? "", lengthInMinutes: Number(item.lengthInMinutes ?? item.length) || null }));
    return { eventTypes };
  },

  async applyConfig(input, existing) {
    const apiKey = str(input.apiKey);
    if (apiKey && !apiKey.startsWith("cal_")) return { config: {}, error: "Cal.com API keys start with cal_" };
    if (!apiKey && !existing?.accessToken) return { config: {}, error: "Cal.com API key is required" };
    const rawEventType = input.eventTypeId;
    const eventTypeId = rawEventType == null || rawEventType === "" ? null : Number(rawEventType);
    if (eventTypeId !== null && (!Number.isInteger(eventTypeId) || eventTypeId <= 0)) return { config: {}, error: "eventTypeId must be a positive integer" };
    const timeZone = str(input.timeZone) ?? DEFAULT_TIMEZONE;
    if (!isValidTimeZone(timeZone)) return { config: {}, error: `Unknown time zone: ${timeZone}` };
    return { config: { eventTypeId, timeZone }, accessToken: apiKey ?? undefined };
  },

  publicConfig(row) {
    return { apiKeySet: !!row?.accessToken, ...configOf(row) };
  },

  supports(event) {
    return APPOINTMENT_EVENTS.has(event);
  },

  async handle(row, event, data, ctx) {
    const appt = appointmentFromEvent(data, configOf(row).timeZone);
    if (event === "appointment.cancelled") return handleCancelled(row, appt, data, ctx);
    if (event === "appointment.rescheduled") return handleRescheduled(row, appt, ctx);
    return handleBooked(row, appt, ctx);
  },
};
