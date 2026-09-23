import type { EventData } from "./types";

export const DEFAULT_TIMEZONE = "Asia/Kolkata";
type Obj = Record<string, unknown>;

export function asObject(value: unknown): Obj | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Obj) : null;
}

export function str(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text : null;
}

export function digitsOnly(phone: string | null | undefined): string {
  return (phone || "").replace(/\D/g, "");
}

export function splitName(name: string | null | undefined): { firstName: string | null; lastName: string | null } {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: null, lastName: null };
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

export function isValidTimeZone(tz: string | null | undefined): tz is string {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function tzOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** Wall-clock `YYYY-MM-DD` + `HH:mm[:ss]` in an IANA zone → UTC instant */
export function zonedDateTimeToUtc(date: string, time: string, timeZone: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !/^\d{1,2}(:\d{2}(:\d{2})?)?$/.test(time || "")) return null;
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm = 0, ss = 0] = time.split(":").map(Number);
  if ([y, m, d, hh, mm, ss].some((n) => !Number.isFinite(n))) return null;
  const tz = isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
  const wall = Date.UTC(y, m - 1, d, hh, mm, ss);
  let utc = wall - tzOffsetMs(new Date(wall), tz);
  const secondPass = tzOffsetMs(new Date(utc), tz);
  if (wall - secondPass !== utc) utc = wall - secondPass;
  return new Date(utc);
}

/** `2024-01-01T10:00:00+05:30` — the form Zoho and GoHighLevel expect */
export function formatIsoWithOffset(date: Date, timeZone: string): string {
  const tz = isValidTimeZone(timeZone) ? timeZone : "UTC";
  const offsetMin = Math.round(tzOffsetMs(date, tz) / 60_000);
  const local = new Date(date.getTime() + offsetMin * 60_000).toISOString().slice(0, 19);
  const sign = offsetMin < 0 ? "-" : "+";
  const abs = Math.abs(offsetMin);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${local}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

export interface LeadLike {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  summary: string | null;
  nextAction: string | null;
  sentiment: string | null;
  category: string | null;
  score: number | null;
  origin: "call" | "form";
}

function leadFromRowLike(lead: Obj): LeadLike {
  return {
    id: str(lead.id),
    firstName: str(lead.firstName),
    lastName: str(lead.lastName),
    phone: str(lead.phone),
    email: str(lead.email),
    company: str(lead.company),
    summary: str(lead.aiSummary),
    nextAction: str(lead.aiNextAction),
    sentiment: str(lead.sentiment),
    category: str(lead.aiCategory),
    score: typeof lead.leadScore === "number" ? lead.leadScore : null,
    origin: "call",
  };
}

function findResponse(responses: Obj, pattern: RegExp): string | null {
  for (const [key, value] of Object.entries(responses)) {
    if (pattern.test(key) && str(value)) return str(value);
  }
  return null;
}

function leadFromSubmission(submission: Obj): LeadLike | null {
  const responses = asObject(submission.responses) ?? {};
  const name = str(submission.contactName) ?? findResponse(responses, /name/i);
  const phone = str(submission.contactPhone) ?? findResponse(responses, /phone|mobile/i);
  const email = str(submission.contactEmail) ?? findResponse(responses, /e-?mail/i);
  if (!phone && !email) return null;
  const lines = Object.entries(responses).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`);
  const formName = str(submission.formName) ?? "form";
  return {
    ...splitName(name),
    id: str(submission.id),
    phone, email,
    company: findResponse(responses, /company|organi[sz]ation|business/i),
    summary: `Form "${formName}" submitted${lines.length ? `:\n${lines.join("\n")}` : ""}`,
    nextAction: "Review submitted form data and follow up",
    sentiment: null, category: "form_submitted", score: null,
    origin: "form",
  };
}

/** Lead fields from `lead.upserted` (CRM row) or `form.submitted` / `form.lead_created` payloads */
export function leadFromEvent(data: EventData): LeadLike | null {
  const lead = asObject(data.lead);
  if (lead && (str(lead.phone) || str(lead.email))) return leadFromRowLike(lead);
  const submission = asObject(data.submission);
  if (submission) return leadFromSubmission(submission);
  const contact = asObject(data.contact);
  if (contact && (str(contact.phone) || str(contact.email))) {
    return { ...splitName(str(contact.name)), id: str(contact.id), phone: str(contact.phone), email: str(contact.email), company: str(contact.company), summary: null, nextAction: null, sentiment: null, category: null, score: null, origin: "form" };
  }
  return null;
}

export interface CallLike {
  id: string | null;
  direction: string | null;
  duration: number | null;
  summary: string | null;
  transcript: string | null;
}

export function callFromEvent(data: EventData): CallLike | null {
  const call = asObject(data.call);
  if (!call) return null;
  return {
    id: str(call.id),
    direction: str(call.direction) ?? str(call.callDirection),
    duration: typeof call.duration === "number" ? call.duration : null,
    summary: str(call.summary) ?? str(call.aiSummary),
    transcript: str(call.transcript),
  };
}

/** Text for a CRM note describing the call; null when the payload carries nothing worth noting */
export function callNoteText(data: EventData, lead: LeadLike | null): string | null {
  const call = callFromEvent(data);
  const summary = lead?.summary ?? call?.summary;
  if (!call && !summary) return null;
  const lines: string[] = [];
  if (summary) lines.push(summary);
  if (lead?.nextAction) lines.push(`Next action: ${lead.nextAction}`);
  if (lead?.sentiment) lines.push(`Sentiment: ${lead.sentiment}`);
  if (call?.duration != null) lines.push(`Call duration: ${call.duration}s${call.direction ? ` (${call.direction})` : ""}`);
  if (call?.transcript) lines.push(`\nTranscript:\n${call.transcript.slice(0, 20_000)}`);
  return lines.length ? lines.join("\n") : null;
}

export interface AppointmentLike {
  id: string | null;
  title: string;
  date: string;
  time: string;
  timeZone: string;
  durationMinutes: number;
  notes: string | null;
  status: string | null;
  contact: { name: string | null; phone: string | null; email: string | null };
  startUtc: Date | null;
  endUtc: Date | null;
}

/**
 * Accepts both payload shapes the app emits: `{ appointment: { id, scheduledDate, scheduledTime, timezone, duration }, contact }`
 * and `{ appointment: { appointmentId, date, time, duration, contactName, contactPhone, contactEmail } }`.
 */
export function appointmentFromEvent(data: EventData, fallbackTimeZone: string): AppointmentLike | null {
  const appt = asObject(data.appointment);
  if (!appt) return null;
  const contact = asObject(data.contact) ?? {};
  const date = str(appt.scheduledDate) ?? str(appt.date) ?? str(data.newDate);
  const rawTime = str(appt.scheduledTime) ?? str(appt.time) ?? str(data.newTime);
  if (!date || !rawTime) return null;
  const time = rawTime.slice(0, 8);
  const timeZone = isValidTimeZone(str(appt.timezone)) ? (str(appt.timezone) as string) : fallbackTimeZone;
  const duration = Number(appt.duration);
  const durationMinutes = Number.isFinite(duration) && duration > 0 ? duration : 30;
  const startUtc = zonedDateTimeToUtc(date, time, timeZone);
  return {
    id: str(appt.id) ?? str(appt.appointmentId),
    title: str(appt.type) ?? str(appt.serviceName) ?? "Appointment",
    date, time, timeZone, durationMinutes,
    notes: str(appt.notes),
    status: str(appt.status),
    contact: {
      name: str(contact.name) ?? str(appt.contactName),
      phone: str(contact.phone) ?? str(appt.contactPhone),
      email: str(contact.email) ?? str(appt.contactEmail),
    },
    startUtc,
    endUtc: startUtc ? new Date(startUtc.getTime() + durationMinutes * 60_000) : null,
  };
}

/** Local record id the event is about — used for dedupe and for finding provider ids later */
export function eventSourceId(event: string, data: EventData): string | null {
  const lead = asObject(data.lead);
  const appt = asObject(data.appointment);
  const submission = asObject(data.submission);
  const call = asObject(data.call);
  const campaign = asObject(data.campaign);
  const flow = asObject(data.flow);
  if (event === "lead.upserted") return str(lead?.id);
  if (event.startsWith("appointment.")) return str(appt?.id) ?? str(appt?.appointmentId);
  if (event.startsWith("form.")) return str(submission?.id) ?? str(lead?.id);
  if (event.startsWith("campaign.")) return str(campaign?.id) ?? str(data.campaignId);
  if (event.startsWith("flow.")) return str(flow?.id) ?? str(call?.id);
  return str(call?.id) ?? str(data.callId);
}
