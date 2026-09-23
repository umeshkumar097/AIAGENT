/**
 * Pure helpers for the call-time action tools: argument coercion, phone normalisation
 * (same rule as the CRM lead processor), IANA time-zone date maths without a library,
 * and free-slot computation. No I/O — safe to unit test without a database.
 */
export const DEFAULT_TIME_ZONE = 'Asia/Kolkata';
export const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;
export const HHMM_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());

/** `+<digits>` for 10+ digit numbers (mirrors LeadProcessorService.normalizePhone); '' when not dialable. */
export function normalizePhone(raw: string): string {
  const cleaned = str(raw).replace(/^(whatsapp:|tel:|phone:)/i, '');
  if (!cleaned || cleaned.includes('@') || /^(client|sip|agent):/i.test(cleaned)) return '';
  const digits = cleaned.replace(/\D/g, '');
  if (digits.length < 5 || digits.length > 15) return '';
  if (digits.length >= 10) return '+' + digits;
  return cleaned.startsWith('+') ? '+' + digits : digits;
}

export function isValidTimeZone(tz: string): boolean {
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch { return false; }
}

const dtfCache = new Map<string, Intl.DateTimeFormat>();
function partsFormatter(tz: string): Intl.DateTimeFormat {
  let f = dtfCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    dtfCache.set(tz, f);
  }
  return f;
}

/** Wall-clock parts of `at` in `tz`. */
export function zonedParts(at: Date, tz: string): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  const out: Record<string, number> = {};
  for (const p of partsFormatter(tz).formatToParts(at)) if (p.type !== 'literal') out[p.type] = Number(p.value);
  return { year: out.year, month: out.month, day: out.day, hour: out.hour === 24 ? 0 : out.hour, minute: out.minute, second: out.second };
}

/** Offset of `tz` from UTC at instant `at`, in minutes (IST → 330). */
export function tzOffsetMinutes(at: Date, tz: string): number {
  const p = zonedParts(at, tz);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** The instant at which the wall clock in `tz` reads `date` `time` (DST-safe two-pass). */
export function zonedToUtc(date: string, time: string, tz: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  let utc = guess - tzOffsetMinutes(new Date(guess), tz) * 60000;
  utc = guess - tzOffsetMinutes(new Date(utc), tz) * 60000;
  return new Date(utc);
}

/** Today's date, current HH:MM and weekday (0=Sun) in `tz`. */
export function nowInZone(tz: string, at = new Date()): { date: string; time: string; weekday: number; minutes: number } {
  const p = zonedParts(at, tz);
  const date = `${p.year}-${pad2(p.month)}-${pad2(p.day)}`;
  return { date, time: `${pad2(p.hour)}:${pad2(p.minute)}`, weekday: weekdayOf(date), minutes: p.hour * 60 + p.minute };
}

export const pad2 = (n: number): string => String(n).padStart(2, '0');
export const minutesOf = (hhmm: string): number => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const hhmmOf = (minutes: number): string => `${pad2(Math.floor(minutes / 60) % 24)}:${pad2(minutes % 60)}`;

/** Weekday of a calendar date (0=Sun), independent of any time zone. */
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
}

/** 'Tuesday 24 September' — short enough to be spoken. */
export function spokenDate(date: string): string {
  const [, m, d] = date.split('-').map(Number);
  return `${DAY_NAMES[weekdayOf(date)]} ${d} ${MONTH_NAMES[m - 1]}`;
}

/** '10:30' → '10:30 AM' for the spoken summary. */
export function spokenTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${pad2(m)} ${suffix}`;
}

/** Time-of-day interval [start, end) in minutes. */
export interface MinuteInterval { start: number; end: number }

/**
 * Free slots of `durationMinutes` between working start/end on one day, skipping busy intervals
 * (minutes since midnight in the same zone) and anything before `notBeforeMinutes`.
 */
export function computeFreeSlots(opts: {
  workingStart: string; workingEnd: string; durationMinutes: number;
  busy: MinuteInterval[]; notBeforeMinutes?: number; limit?: number;
}): string[] {
  const start = minutesOf(opts.workingStart);
  const end = minutesOf(opts.workingEnd);
  const dur = Math.max(5, opts.durationMinutes);
  const limit = opts.limit ?? 8;
  const out: string[] = [];
  for (let t = start; t + dur <= end && out.length < limit; t += dur) {
    if (opts.notBeforeMinutes != null && t < opts.notBeforeMinutes) continue;
    const clash = opts.busy.some(b => t < b.end && t + dur > b.start);
    if (!clash) out.push(hhmmOf(t));
  }
  return out;
}

/** Busy interval in the zone's minutes-of-day for `date`, clipped to the day; null when outside. */
export function busyMinutesOnDate(start: Date, end: Date, date: string, tz: string): MinuteInterval | null {
  const dayStart = zonedToUtc(date, '00:00', tz).getTime();
  const dayEnd = zonedToUtc(addDays(date, 1), '00:00', tz).getTime();
  const s = Math.max(start.getTime(), dayStart);
  const e = Math.min(end.getTime(), dayEnd);
  if (e <= s) return null;
  return { start: Math.floor((s - dayStart) / 60000), end: Math.ceil((e - dayStart) / 60000) };
}
