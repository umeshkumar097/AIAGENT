/**
 * Client-side types and fetchers for scheduled callbacks
 * (the agent books a time on a call; the platform calls the contact back).
 *
 * Server contract: GET /api/callbacks?status=&limit=, POST /api/callbacks, DELETE /api/callbacks/:id.
 */
import { apiRequest, queryClient } from "./queryClient";

export const CALLBACK_STATUSES = ["pending", "calling", "completed", "failed", "cancelled"] as const;
export type CallbackStatus = typeof CALLBACK_STATUSES[number];

export interface ScheduledCallback {
  id: string;
  contactName: string | null;
  contactPhone: string;
  reason: string | null;
  /** ISO timestamp (UTC). */
  scheduledAt: string;
  timeZone: string;
  status: CallbackStatus | string;
  attempts: number;
  lastError: string | null;
  agentId: string | null;
  agentName?: string | null;
  resultCallId: string | null;
  createdAt: string;
}

export interface CallbacksListResponse {
  callbacks: ScheduledCallback[];
}

export interface CreateCallbackInput {
  contactPhone: string;
  contactName?: string;
  agentId: string;
  /** ISO timestamp. */
  scheduledAt: string;
  reason?: string;
}

export const CALLBACKS_QUERY_KEY = ["/api/callbacks"] as const;

/** Query key for a filtered list — keeps the "/api/callbacks" prefix so invalidation covers it. */
export function callbacksQueryKey(status?: string, limit = 100): readonly unknown[] {
  const qs = new URLSearchParams();
  if (status && status !== "all") qs.set("status", status);
  qs.set("limit", String(limit));
  return [`/api/callbacks?${qs.toString()}`];
}

export async function fetchCallbacks(status?: string, limit = 100): Promise<CallbacksListResponse> {
  const res = await apiRequest("GET", callbacksQueryKey(status, limit)[0] as string);
  const body = await res.json();
  return { callbacks: Array.isArray(body?.callbacks) ? body.callbacks : [] };
}

export async function createCallback(input: CreateCallbackInput): Promise<ScheduledCallback | null> {
  const res = await apiRequest("POST", "/api/callbacks", input);
  const body = await res.json().catch(() => null);
  return (body?.callback ?? body) || null;
}

export async function cancelCallback(id: string): Promise<void> {
  await apiRequest("DELETE", `/api/callbacks/${encodeURIComponent(id)}`);
}

export function invalidateCallbacks(): void {
  queryClient.invalidateQueries({
    predicate: (q) => typeof q.queryKey[0] === "string" && (q.queryKey[0] as string).startsWith("/api/callbacks"),
  });
}
