/**
 * Do-not-call list — client types, fetchers and the paste/CSV parser.
 *
 * Server contract (/api/dnd, authenticated):
 *   GET    /?q=&limit=&offset=  → { numbers: DndNumber[], total }
 *   POST   /  { phone, note? }   → 201 { number }
 *   POST   /import { phones }    → { added, skipped }   (≤ 5000 phones; CSV parsed here)
 *   DELETE /:id
 *   GET    /check?phone=         → { blocked }
 */
import { apiRequest, queryClient } from "./queryClient";

export interface DndNumber {
  id: string;
  phone: string;
  reason: 'caller_request' | 'manual' | 'import' | 'complaint' | string;
  source: 'agent' | 'manual' | 'upload' | 'api' | string;
  note: string | null;
  callId: string | null;
  createdAt: string;
}

export interface DndListResponse { numbers: DndNumber[]; total: number }
export interface DndImportResult { added: number; skipped: number }

export const DND_IMPORT_MAX = 5000;
export const DND_QUERY_PREFIX = "/api/dnd";

export function dndQueryKey(q: string, limit: number, offset: number): readonly [string] {
  const qs = new URLSearchParams();
  if (q.trim()) qs.set("q", q.trim());
  qs.set("limit", String(limit));
  qs.set("offset", String(offset));
  return [`${DND_QUERY_PREFIX}?${qs.toString()}`];
}

export async function fetchDnd(q: string, limit: number, offset: number): Promise<DndListResponse> {
  const res = await apiRequest("GET", dndQueryKey(q, limit, offset)[0]);
  const body = await res.json();
  return { numbers: Array.isArray(body?.numbers) ? body.numbers : [], total: Number(body?.total) || 0 };
}

export async function addDnd(phone: string, note?: string): Promise<DndNumber | null> {
  const res = await apiRequest("POST", DND_QUERY_PREFIX, { phone, note: note?.trim() || undefined });
  const body = await res.json().catch(() => null);
  return body?.number ?? null;
}

export async function importDnd(phones: string[]): Promise<DndImportResult> {
  const res = await apiRequest("POST", `${DND_QUERY_PREFIX}/import`, { phones: phones.slice(0, DND_IMPORT_MAX) });
  const body = await res.json().catch(() => ({}));
  return { added: Number(body?.added) || 0, skipped: Number(body?.skipped) || 0 };
}

export async function removeDnd(id: string): Promise<void> {
  await apiRequest("DELETE", `${DND_QUERY_PREFIX}/${encodeURIComponent(id)}`);
}

export function invalidateDnd(): void {
  queryClient.invalidateQueries({
    predicate: (q) => typeof q.queryKey[0] === "string" && (q.queryKey[0] as string).startsWith(DND_QUERY_PREFIX),
  });
}

/** Loose client-side normalisation; the server applies the canonical one (10 digits → +91). */
export function normalizePhoneLoose(raw: string): string | null {
  const trimmed = raw.replace(/["']/g, "").trim();
  if (!trimmed) return null;
  const plus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (plus) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return `+${digits}`;
}

/**
 * Parses pasted text or CSV content into unique phone numbers.
 * One number per line (or separated by , ; whitespace); in CSV rows the first
 * column that looks like a phone number is used; header rows are skipped.
 */
export function parsePhones(text: string): { phones: string[]; invalid: number } {
  const seen = new Set<string>();
  let invalid = 0;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells = line.split(/[,;\t]/).map(c => c.trim()).filter(Boolean);
    const singleLine = cells.length <= 1 ? line.split(/\s+/).filter(Boolean) : cells;
    let matched = false;
    for (const cell of singleLine) {
      if (cell.replace(/\D/g, "").length < 8) continue;
      const phone = normalizePhoneLoose(cell);
      if (phone) { seen.add(phone); matched = true; if (cells.length > 1) break; }
    }
    if (!matched && !/^[a-zA-Z\s_,;"']+$/.test(line)) invalid++;
  }
  return { phones: Array.from(seen), invalid };
}
