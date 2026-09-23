/**
 * Do-not-call list: one row per (user, normalised phone). Used by contact upload, the campaign
 * dialers, the callback cron and the agent's mark_do_not_call tool. Inbound calls are never blocked.
 */
import { and, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { db } from '../db';
import { doNotCallNumbers, type DoNotCallNumber } from '@shared/schema';
import { logger } from '../utils/logger';

const SOURCE = 'DND';
export type DndReason = 'caller_request' | 'manual' | 'import' | 'complaint';
export type DndSource = 'agent' | 'manual' | 'upload' | 'api';
export const DND_REASONS: ReadonlyArray<DndReason> = ['caller_request', 'manual', 'import', 'complaint'];

/**
 * `+<digits>`: strips spaces/dashes/brackets and prefixes; a bare 10-digit number is assumed Indian (+91),
 * `0`-prefixed 11 digits likewise. '' when the input is not a dialable number.
 */
export function normalizePhone(raw: unknown): string {
  const s = (typeof raw === 'string' ? raw : raw == null ? '' : String(raw)).trim().replace(/^(whatsapp:|tel:|phone:)/i, '');
  if (!s || s.includes('@')) return '';
  const hasPlus = s.startsWith('+');
  const digitsRaw = s.replace(/\D/g, '');
  if (!digitsRaw) return '';
  let digits = digitsRaw;
  if (!hasPlus) {
    // "00" international dialling prefix → drop it (when what remains is still a plausible number)
    if (digits.startsWith('00') && digits.length - 2 >= 8 && digits.length - 2 <= 15) digits = digits.slice(2);
    // bare national numbers → India
    if (digits.length === 10) digits = `91${digits}`;
    else if (digits.length === 11 && digits.startsWith('0')) digits = `91${digits.slice(1)}`;
  }
  if (digits.length < 8 || digits.length > 15) return '';
  return `+${digits}`;
}

export async function isDoNotCall(userId: string, phone: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const [row] = await db.select({ id: doNotCallNumbers.id }).from(doNotCallNumbers)
    .where(and(eq(doNotCallNumbers.userId, userId), eq(doNotCallNumbers.phone, normalized))).limit(1);
  return !!row;
}

/** Idempotent insert. Returns the row and whether it was newly added. Throws only on invalid phone. */
export async function addDoNotCall(opts: {
  userId: string; phone: string; reason: DndReason; source: DndSource; callId?: string | null; note?: string | null;
}): Promise<{ number: DoNotCallNumber; added: boolean }> {
  const phone = normalizePhone(opts.phone);
  if (!phone) throw new Error('Invalid phone number');
  const [inserted] = await db.insert(doNotCallNumbers).values({
    userId: opts.userId, phone, reason: opts.reason, source: opts.source,
    callId: opts.callId || null, note: opts.note ? String(opts.note).substring(0, 500) : null,
  }).onConflictDoNothing({ target: [doNotCallNumbers.userId, doNotCallNumbers.phone] }).returning();
  if (inserted) {
    logger.info(`Added ${phone.replace(/\d(?=\d{4})/g, '*')} to DND for user ${opts.userId} (${opts.reason}/${opts.source})`, undefined, SOURCE);
    return { number: inserted, added: true };
  }
  const [existing] = await db.select().from(doNotCallNumbers)
    .where(and(eq(doNotCallNumbers.userId, opts.userId), eq(doNotCallNumbers.phone, phone))).limit(1);
  return { number: existing, added: false };
}

export async function removeDoNotCall(userId: string, phone: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const rows = await db.delete(doNotCallNumbers)
    .where(and(eq(doNotCallNumbers.userId, userId), eq(doNotCallNumbers.phone, normalized))).returning({ id: doNotCallNumbers.id });
  return rows.length > 0;
}

export async function removeDoNotCallById(userId: string, id: string): Promise<boolean> {
  const rows = await db.delete(doNotCallNumbers)
    .where(and(eq(doNotCallNumbers.userId, userId), eq(doNotCallNumbers.id, id))).returning({ id: doNotCallNumbers.id });
  return rows.length > 0;
}

/** The subset of `phones` (raw, any format) that is blocked, as normalised numbers. Chunked for large uploads. */
export async function filterDoNotCall(userId: string, phones: string[]): Promise<Set<string>> {
  const blocked = new Set<string>();
  const wanted = Array.from(new Set(phones.map(normalizePhone).filter(Boolean)));
  for (let i = 0; i < wanted.length; i += 1000) {
    const chunk = wanted.slice(i, i + 1000);
    const rows = await db.select({ phone: doNotCallNumbers.phone }).from(doNotCallNumbers)
      .where(and(eq(doNotCallNumbers.userId, userId), inArray(doNotCallNumbers.phone, chunk)));
    for (const r of rows) blocked.add(r.phone);
  }
  return blocked;
}

export async function listDoNotCall(userId: string, opts: { q?: string; limit?: number; offset?: number } = {}): Promise<{ numbers: DoNotCallNumber[]; total: number }> {
  const limit = Math.min(500, Math.max(1, opts.limit ?? 50));
  const offset = Math.max(0, opts.offset ?? 0);
  const q = (opts.q || '').trim();
  const where = q
    ? and(eq(doNotCallNumbers.userId, userId), or(ilike(doNotCallNumbers.phone, `%${q.replace(/[%_]/g, '')}%`), ilike(doNotCallNumbers.note, `%${q.replace(/[%_]/g, '')}%`)))
    : eq(doNotCallNumbers.userId, userId);
  const [numbers, [{ count }]] = await Promise.all([
    db.select().from(doNotCallNumbers).where(where).orderBy(desc(doNotCallNumbers.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(doNotCallNumbers).where(where),
  ]);
  return { numbers, total: count };
}

/** Bulk add (upload / API import). Invalid numbers are counted as skipped. */
export async function importDoNotCall(userId: string, phones: string[], source: DndSource = 'upload'): Promise<{ added: number; skipped: number }> {
  const unique = Array.from(new Set(phones.map(normalizePhone).filter(Boolean)));
  let added = 0;
  for (let i = 0; i < unique.length; i += 500) {
    const chunk = unique.slice(i, i + 500);
    const rows = await db.insert(doNotCallNumbers)
      .values(chunk.map(phone => ({ userId, phone, reason: 'import' as const, source })))
      .onConflictDoNothing({ target: [doNotCallNumbers.userId, doNotCallNumbers.phone] })
      .returning({ id: doNotCallNumbers.id });
    added += rows.length;
  }
  logger.info(`DND import for user ${userId}: ${added} added, ${phones.length - added} skipped`, undefined, SOURCE);
  return { added, skipped: phones.length - added };
}
