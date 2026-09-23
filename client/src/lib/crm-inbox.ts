/**
 * CRM team inbox — client types and fetchers.
 *
 * Server contract (/api/crm, authenticated; see server/routes/crm-inbox-routes.ts):
 *   GET  /inbox?filter=mine|unassigned|overdue|all&stage=&q=&limit=&offset=  → InboxResponse
 *   GET  /inbox/assignees                    → InboxAssignee[]
 *   GET  /inbox/settings, PUT /inbox/settings → InboxSettings
 *   POST /leads/:id/assign { userId|null }
 *   POST /leads/bulk-assign { leadIds, userId|null }
 *   POST /leads/:id/note { text }, GET /leads/:id/notes
 */
import { apiRequest, queryClient } from "./queryClient";

export const INBOX_FILTERS = ["mine", "unassigned", "overdue", "all"] as const;
export type InboxFilter = typeof INBOX_FILTERS[number];
export type SlaStatus = "ok" | "due_soon" | "overdue" | "none";
export type AutoAssignMode = "off" | "round_robin";

export interface InboxLead {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  phone: string;
  email: string | null;
  company: string | null;
  stage: string;
  leadScore: number | null;
  aiNextAction: string | null;
  hasCallback: boolean;
  callbackScheduled: string | null;
  assignedUserId: string | null;
  assigneeName: string | null;
  lastCallAt: string | null;
  lastNoteAt: string | null;
  lastContactAt: string | null;
  totalCalls: number;
  createdAt: string;
  updatedAt: string;
  slaHours: number;
  slaDueAt: string | null;
  slaStatus: SlaStatus;
}

export interface InboxCounts { all: number; mine: number; unassigned: number; overdue: number }
/** A `leads.stage` key with how many of the account's leads sit in it. */
export interface InboxStage { stage: string; count: number }
export interface InboxResponse { leads: InboxLead[]; total: number; counts: InboxCounts; stages: InboxStage[] }
export interface InboxAssignee { id: string; name: string; kind: "owner" | "member" }
export interface InboxSettings {
  autoAssign: AutoAssignMode;
  slaHours: Record<string, number>;
  defaultSlaHours: number;
  closedStages: string[];
}
export interface LeadNote { id: string; leadId: string; userId: string; content: string; createdAt: string }

/** Labels for the built-in `leads.stage` keys (custom keys fall back to a prettified key). */
const STAGE_LABELS: Record<string, string> = {
  new: "New Lead", contacted: "Contacted", qualified: "Qualified", hot: "Hot Lead", appointment: "Appointment Booked",
  form_submitted: "Form Submitted", follow_up: "Needs Follow-up", not_interested: "Not Interested", no_answer: "No Answer",
};
export function stageLabel(key: string): string {
  return STAGE_LABELS[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export interface InboxQuery { filter: InboxFilter; stage: string; q: string; limit: number; offset: number }

export const INBOX_PREFIX = "/api/crm/inbox";
export const ASSIGNEES_KEY = [`${INBOX_PREFIX}/assignees`] as const;
export const SETTINGS_KEY = [`${INBOX_PREFIX}/settings`] as const;
export const notesKey = (leadId: string) => [`/api/crm/leads/${leadId}/notes`] as const;

export function inboxQueryKey(q: InboxQuery): readonly [string] {
  const qs = new URLSearchParams();
  qs.set("filter", q.filter);
  if (q.stage && q.stage !== "all") qs.set("stage", q.stage);
  if (q.q.trim()) qs.set("q", q.q.trim());
  qs.set("limit", String(q.limit));
  qs.set("offset", String(q.offset));
  return [`${INBOX_PREFIX}?${qs.toString()}`];
}

async function json<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

export async function fetchInbox(q: InboxQuery): Promise<InboxResponse> {
  const body = await json<Partial<InboxResponse>>(await apiRequest("GET", inboxQueryKey(q)[0]));
  return {
    leads: Array.isArray(body.leads) ? body.leads : [],
    total: Number(body.total) || 0,
    counts: { all: 0, mine: 0, unassigned: 0, overdue: 0, ...(body.counts || {}) },
    stages: Array.isArray(body.stages) ? body.stages : [],
  };
}

export async function fetchAssignees(): Promise<InboxAssignee[]> {
  const body = await json<unknown>(await apiRequest("GET", ASSIGNEES_KEY[0]));
  return Array.isArray(body) ? (body as InboxAssignee[]) : [];
}

export async function fetchSettings(): Promise<InboxSettings> {
  return json<InboxSettings>(await apiRequest("GET", SETTINGS_KEY[0]));
}

export async function saveSettings(patch: Partial<Pick<InboxSettings, "autoAssign" | "slaHours" | "defaultSlaHours">>): Promise<InboxSettings> {
  return json<InboxSettings>(await apiRequest("PUT", SETTINGS_KEY[0], patch));
}

export async function assignLead(leadId: string, userId: string | null): Promise<InboxLead> {
  return json<InboxLead>(await apiRequest("POST", `/api/crm/leads/${leadId}/assign`, { userId }));
}

export async function bulkAssign(leadIds: string[], userId: string | null): Promise<{ updated: number; assigneeName: string | null }> {
  return json(await apiRequest("POST", "/api/crm/leads/bulk-assign", { leadIds, userId }));
}

export async function fetchNotes(leadId: string): Promise<LeadNote[]> {
  const body = await json<unknown>(await apiRequest("GET", notesKey(leadId)[0]));
  return Array.isArray(body) ? (body as LeadNote[]) : [];
}

export async function addNote(leadId: string, text: string): Promise<LeadNote> {
  return json<LeadNote>(await apiRequest("POST", `/api/crm/leads/${leadId}/note`, { text }));
}

/** Refresh every inbox query plus the classic CRM lead lists (they share the `leads` rows). */
export function invalidateInbox(leadId?: string): void {
  queryClient.invalidateQueries({ predicate: (q) => String(q.queryKey[0]).startsWith(INBOX_PREFIX) });
  queryClient.invalidateQueries({ predicate: (q) => String(q.queryKey[0]).startsWith("/api/crm/leads") });
  if (leadId) queryClient.invalidateQueries({ queryKey: notesKey(leadId) });
}

/** Short relative time such as "3h ago" / "in 2d"; null when the date is missing. */
export function relativeTime(iso: string | null | undefined, now: number = Date.now()): string | null {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - now;
  if (Number.isNaN(ms)) return null;
  const abs = Math.abs(ms);
  const unit = abs < 3_600_000 ? [Math.max(1, Math.round(abs / 60_000)), "m"]
    : abs < 86_400_000 ? [Math.round(abs / 3_600_000), "h"]
    : [Math.round(abs / 86_400_000), "d"];
  return ms < 0 ? `${unit[0]}${unit[1]} ago` : `in ${unit[0]}${unit[1]}`;
}
