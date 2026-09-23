/**
 * Usage alerts + low-balance guard. Every 10 minutes:
 *  - users whose balance crossed their threshold since the last alert get email (+ in-app, + WhatsApp via
 *    Waki when an approved template exists). Dedupe: last_alert_balance is set when alerted and cleared once
 *    the balance is back above the threshold, so a top-up re-arms the alert.
 *  - balance at 0 → running campaigns are paused (pauseCampaignsWhenEmpty) and the user is told once.
 *  - 09:00 IST → daily usage summary (yesterday's minutes, calls, balance, top-up link) when enabled.
 * Users without a preferences row use the defaults; a row is only written when state changes.
 */
import { and, eq, gt, gte, isNull, lt, ne, or, sql } from 'drizzle-orm';
import { db } from '../db';
import { calls, campaigns, creditTransactions, plans, plivoCalls, userSubscriptions, users } from '@shared/schema';
import { userBillingPreferences, DEFAULT_ALERT_THRESHOLD_PERCENT, DEFAULT_WHATSAPP_TEMPLATE } from '@shared/schema-billing';
import { storage } from '../storage';
import { emailService } from './email-service';
import { dispatchEvent } from './event-dispatcher';
import { NotificationService } from './notification-service';
import { normalizePhone } from './call-actions/util';
import { FRONTEND_URL } from '../engines/payment/webhook-helper';

const SWEEP_INTERVAL_MS = 10 * 60_000;
const FIRST_SWEEP_DELAY_MS = 30_000;
const SUMMARY_HOUR_IST = 9;
const IST_OFFSET_MS = 5.5 * 3_600_000;
const GLOBAL_FALLBACK_THRESHOLD = 50;
const LOG = '💳 [UsageAlerts]';
const TOP_UP_URL = `${FRONTEND_URL}/app/checkout?type=credits`;

export type ChannelStatus = 'sent' | 'failed' | 'skipped';
export interface AlertPrefs {
  alertThresholdPercent: number;
  alertThresholdCredits: number | null;
  alertEmail: string | null;
  alertWhatsappPhone: string | null;
  whatsappTemplate: string;
  pauseCampaignsWhenEmpty: boolean;
  dailyUsageSummary: boolean;
  lastAlertBalance: number | null;
  lastEmptyAlertAt: Date | null;
}
export interface ThresholdInfo { threshold: number; planMinutes: number | null; source: 'credits' | 'percent' | 'global' }

export const DEFAULT_PREFS: AlertPrefs = {
  alertThresholdPercent: DEFAULT_ALERT_THRESHOLD_PERCENT, alertThresholdCredits: null, alertEmail: null,
  alertWhatsappPhone: null, whatsappTemplate: DEFAULT_WHATSAPP_TEMPLATE, pauseCampaignsWhenEmpty: true,
  dailyUsageSummary: false, lastAlertBalance: null, lastEmptyAlertAt: null,
};

let sweeping = false;

// ── Threshold ──────────────────────────────────────────────────────────────
async function globalThreshold(): Promise<number> {
  try {
    const s = await storage.getGlobalSetting('low_credits_threshold');
    return typeof s?.value === 'number' && s.value > 0 ? s.value : GLOBAL_FALLBACK_THRESHOLD;
  } catch { return GLOBAL_FALLBACK_THRESHOLD; }
}

export function effectiveThreshold(prefs: AlertPrefs, planMinutes: number | null, fallback: number): ThresholdInfo {
  if (prefs.alertThresholdCredits && prefs.alertThresholdCredits > 0) {
    return { threshold: prefs.alertThresholdCredits, planMinutes, source: 'credits' };
  }
  if (planMinutes && planMinutes > 0) {
    const pct = prefs.alertThresholdPercent || DEFAULT_ALERT_THRESHOLD_PERCENT;
    return { threshold: Math.max(1, Math.ceil((planMinutes * pct) / 100)), planMinutes, source: 'percent' };
  }
  return { threshold: fallback, planMinutes, source: 'global' };
}

/** Monthly minutes of the user's active plan (admin override wins), or null without an active plan. */
export async function planMonthlyMinutes(userId: string): Promise<number | null> {
  const [row] = await db.select({ included: plans.includedCredits, override: userSubscriptions.overrideIncludedCredits })
    .from(userSubscriptions).innerJoin(plans, eq(plans.id, userSubscriptions.planId))
    .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, 'active'), gt(userSubscriptions.currentPeriodEnd, new Date())))
    .limit(1);
  return row ? (row.override ?? row.included) : null;
}

export async function loadPrefs(userId: string): Promise<AlertPrefs> {
  const [row] = await db.select().from(userBillingPreferences).where(eq(userBillingPreferences.userId, userId)).limit(1);
  return row ? { ...DEFAULT_PREFS, ...row } : { ...DEFAULT_PREFS };
}

export async function resolveThreshold(userId: string, prefs?: AlertPrefs): Promise<ThresholdInfo> {
  const [p, minutes, fallback] = await Promise.all([prefs ?? loadPrefs(userId), planMonthlyMinutes(userId), globalThreshold()]);
  return effectiveThreshold(p, minutes, fallback);
}

// ── Channels ───────────────────────────────────────────────────────────────
async function appName(): Promise<string> {
  try { const s = await storage.getGlobalSetting('app_name'); return typeof s?.value === 'string' && s.value ? s.value : 'Zonvo'; }
  catch { return 'Zonvo'; }
}

function esc(v: unknown): string {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function html(brand: string, title: string, lines: string[], rows: [string, string][]): string {
  const table = rows.map(([k, v]) => `<tr><td style="padding:6px 12px;color:#64748b">${esc(k)}</td><td style="padding:6px 12px;font-weight:600">${esc(v)}</td></tr>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0f172a"><h2 style="margin:0 0 12px">${esc(title)}</h2>`
    + lines.map((l) => `<p style="margin:0 0 10px;line-height:1.5">${esc(l)}</p>`).join('')
    + `<table style="border-collapse:collapse;background:#f8fafc;border-radius:8px;margin:12px 0">${table}</table>`
    + `<p><a href="${esc(TOP_UP_URL)}" style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Add minutes</a></p>`
    + `<p style="color:#94a3b8;font-size:12px">${esc(brand)} · change these alerts under Billing → Usage alerts.</p></div>`;
}

async function sendMail(to: string, subject: string, body: string): Promise<ChannelStatus> {
  if (!to) return 'skipped';
  try { return (await emailService.sendEmail(to, subject, body)).success ? 'sent' : 'failed'; }
  catch (error: any) { console.error(`${LOG} Email failed: ${error?.message}`); return 'failed'; }
}

/** Waki template (default `low_balance`), body variables {{1}} = balance, {{2}} = top-up link. Best effort. */
async function sendWhatsApp(userId: string, prefs: AlertPrefs, balance: number): Promise<ChannelStatus> {
  const phone = normalizePhone(prefs.alertWhatsappPhone || '');
  if (!phone) return 'skipped';
  try {
    const { whatswayService } = await import('../../plugins/messaging/services/whatsway.service');
    const settings = await whatswayService.getSettings(userId);
    if (!settings?.isActive) return 'skipped';
    const name = prefs.whatsappTemplate || DEFAULT_WHATSAPP_TEMPLATE;
    const template = (await whatswayService.getTemplates(userId)).find((t) => t.name === name);
    if (!template) return 'skipped';
    const components = [{ type: 'body', parameters: [{ type: 'text', text: String(balance) }, { type: 'text', text: TOP_UP_URL }] }];
    await whatswayService.sendTemplate(userId, phone, template.name, template.language || 'en', components);
    return 'sent';
  } catch (error: any) {
    console.error(`${LOG} WhatsApp alert failed for user ${userId}: ${error?.message}`);
    return 'failed';
  }
}

async function pauseRunningCampaigns(userId: string): Promise<string[]> {
  const running = await db.select({ id: campaigns.id, name: campaigns.name }).from(campaigns)
    .where(and(eq(campaigns.userId, userId), eq(campaigns.status, 'running'), isNull(campaigns.deletedAt)));
  if (running.length === 0) return [];
  const { campaignExecutor } = await import('./campaign-executor');
  const paused: string[] = [];
  for (const c of running) {
    try { await campaignExecutor.pauseCampaign(c.id, 'manual'); paused.push(c.name); }
    catch (error: any) { console.error(`${LOG} Could not pause campaign ${c.id}: ${error?.message}`); }
  }
  return paused;
}

async function saveState(userId: string, patch: Partial<typeof userBillingPreferences.$inferInsert>): Promise<void> {
  await db.insert(userBillingPreferences).values({ userId, ...patch })
    .onConflictDoUpdate({ target: userBillingPreferences.userId, set: { ...patch, updatedAt: new Date() } });
}

// ── Per-user evaluation ────────────────────────────────────────────────────
type UserRow = { id: string; email: string; credits: number };

async function evaluateUser(u: UserRow, prefs: AlertPrefs, hasRow: boolean, planMinutes: number | null, fallback: number): Promise<void> {
  const { threshold } = effectiveThreshold(prefs, planMinutes, fallback);
  const to = prefs.alertEmail || u.email;
  if (u.credits > threshold) {
    if (hasRow && (prefs.lastAlertBalance !== null || prefs.lastEmptyAlertAt !== null)) {
      await saveState(u.id, { lastAlertBalance: null, lastEmptyAlertAt: null });
    }
    return;
  }
  if (prefs.lastAlertBalance === null) {
    await dispatchEvent('low_credits', { userId: u.id, to, data: { currentCredits: u.credits, threshold, topUpUrl: TOP_UP_URL } });
    const wa = await sendWhatsApp(u.id, prefs, u.credits);
    await saveState(u.id, { lastAlertAt: new Date(), lastAlertBalance: u.credits });
    console.log(`${LOG} Threshold alert for user ${u.id}: balance ${u.credits} <= ${threshold} (whatsapp=${wa})`);
  }
  if (u.credits > 0) {
    if (prefs.lastEmptyAlertAt !== null) await saveState(u.id, { lastEmptyAlertAt: null });
    return;
  }
  const paused = prefs.pauseCampaignsWhenEmpty ? await pauseRunningCampaigns(u.id) : [];
  if (prefs.lastEmptyAlertAt === null || paused.length > 0) {
    const brand = await appName();
    const pausedLine = paused.length ? `Paused campaigns: ${paused.join(', ')}. Resume them after topping up.` : 'New calls and campaigns cannot run until you add minutes.';
    await NotificationService.create({
      userId: u.id, type: 'credits_empty', title: 'Balance is empty', message: `Your minute balance is 0. ${pausedLine}`,
      link: '/app/checkout?type=credits', icon: 'alert-triangle', priority: 90, displayType: 'both',
    });
    if (prefs.lastEmptyAlertAt === null) {
      await sendMail(to, `Balance is empty - ${brand}`, html(brand, 'Your minute balance is empty',
        ['Your account has run out of calling minutes.', pausedLine], [['Balance', '0 minutes'], ['Paused campaigns', String(paused.length)]]));
      await sendWhatsApp(u.id, prefs, 0);
      await saveState(u.id, { lastEmptyAlertAt: new Date() });
    }
    console.log(`${LOG} Empty balance for user ${u.id}: paused ${paused.length} campaign(s)`);
  }
}

// ── Daily summary (09:00 IST) ──────────────────────────────────────────────
function istToday(): { date: string; hour: number; dayStartUtc: Date } {
  const shifted = new Date(Date.now() + IST_OFFSET_MS);
  const y = shifted.getUTCFullYear(), m = shifted.getUTCMonth(), d = shifted.getUTCDate();
  return { date: shifted.toISOString().slice(0, 10), hour: shifted.getUTCHours(), dayStartUtc: new Date(Date.UTC(y, m, d) - IST_OFFSET_MS) };
}

async function countCalls(userId: string, from: Date, to: Date): Promise<number> {
  const [[p], [c]] = await Promise.all([
    db.select({ n: sql<number>`count(*)::int` }).from(plivoCalls).where(and(eq(plivoCalls.userId, userId), gte(plivoCalls.createdAt, from), lt(plivoCalls.createdAt, to))),
    db.select({ n: sql<number>`count(*)::int` }).from(calls).where(and(eq(calls.userId, userId), gte(calls.createdAt, from), lt(calls.createdAt, to))),
  ]);
  return (p?.n ?? 0) + (c?.n ?? 0);
}

export async function sendDailySummaries(): Promise<number> {
  const { date, hour, dayStartUtc } = istToday();
  if (hour < SUMMARY_HOUR_IST) return 0;
  const yesterdayStart = new Date(dayStartUtc.getTime() - 86_400_000);
  const due = await db.select({ id: users.id, email: users.email, credits: users.credits, alertEmail: userBillingPreferences.alertEmail })
    .from(userBillingPreferences).innerJoin(users, eq(users.id, userBillingPreferences.userId))
    .where(and(eq(userBillingPreferences.dailyUsageSummary, true), eq(users.isActive, true), isNull(users.deletedAt),
      or(isNull(userBillingPreferences.lastSummaryDate), ne(userBillingPreferences.lastSummaryDate, date))))
    .limit(500);
  const brand = await appName();
  let sent = 0;
  for (const u of due) {
    try {
      const [[usage], callCount] = await Promise.all([
        db.select({ minutes: sql<number>`COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0)::int` }).from(creditTransactions)
          .where(and(eq(creditTransactions.userId, u.id), eq(creditTransactions.type, 'usage'), gte(creditTransactions.createdAt, yesterdayStart), lt(creditTransactions.createdAt, dayStartUtc))),
        countCalls(u.id, yesterdayStart, dayStartUtc),
      ]);
      const label = yesterdayStart.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });
      const status = await sendMail(u.alertEmail || u.email, `Daily usage summary for ${label} - ${brand}`, html(brand, `Usage on ${label}`,
        ['Here is what your agents did yesterday.'], [['Minutes used', String(usage?.minutes ?? 0)], ['Calls', String(callCount)], ['Balance', `${u.credits} minutes`]]));
      await saveState(u.id, { lastSummaryDate: date });
      if (status === 'sent') sent++;
    } catch (error: any) {
      console.error(`${LOG} Daily summary failed for user ${u.id}: ${error?.message}`);
    }
  }
  return sent;
}

// ── Sweep / test / cron ────────────────────────────────────────────────────
export async function runUsageAlertsSweep(): Promise<void> {
  if (sweeping) return;
  sweeping = true;
  try {
    const fallback = await globalThreshold();
    const rows = await db.select({ id: users.id, email: users.email, credits: users.credits, prefs: userBillingPreferences,
      included: plans.includedCredits, override: userSubscriptions.overrideIncludedCredits })
      .from(users)
      .leftJoin(userBillingPreferences, eq(userBillingPreferences.userId, users.id))
      .leftJoin(userSubscriptions, and(eq(userSubscriptions.userId, users.id), eq(userSubscriptions.status, 'active'), gt(userSubscriptions.currentPeriodEnd, new Date())))
      .leftJoin(plans, eq(plans.id, userSubscriptions.planId))
      .where(and(eq(users.isActive, true), isNull(users.deletedAt)));
    const seen = new Set<string>();
    for (const r of rows) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      const planMinutes = r.included === null ? null : (r.override ?? r.included);
      const prefs: AlertPrefs = r.prefs ? { ...DEFAULT_PREFS, ...r.prefs } : { ...DEFAULT_PREFS };
      await evaluateUser({ id: r.id, email: r.email, credits: r.credits }, prefs, !!r.prefs, planMinutes, fallback).catch((error: any) =>
        console.error(`${LOG} Evaluation failed for user ${r.id}: ${error?.message}`));
    }
    await sendDailySummaries();
  } catch (error: any) {
    console.error(`${LOG} Sweep error: ${error?.message}`);
  } finally {
    sweeping = false;
  }
}

/** "Send test alert" — exercises every channel with the user's current settings. */
export async function sendTestAlert(userId: string): Promise<{ email: ChannelStatus; whatsapp: ChannelStatus; inApp: ChannelStatus; threshold: number; to: string }> {
  const user = await storage.getUser(userId);
  if (!user) throw new Error('User not found');
  const prefs = await loadPrefs(userId);
  const { threshold } = await resolveThreshold(userId, prefs);
  const to = prefs.alertEmail || user.email;
  const brand = await appName();
  const email = await sendMail(to, `[Test] Low balance alert - ${brand}`, html(brand, 'Test: low balance alert',
    ['This is a test of your usage alerts. Real alerts are sent when your balance drops to the threshold below.'],
    [['Current balance', `${user.credits} minutes`], ['Alert threshold', `${threshold} minutes`]]));
  const whatsapp = await sendWhatsApp(userId, prefs, user.credits);
  let inApp: ChannelStatus = 'failed';
  try {
    await NotificationService.create({ userId, type: 'low_credits', title: 'Test alert', message: `Usage alerts are working. Threshold: ${threshold} minutes.`, link: '/app/billing?tab=packs', icon: 'bell' });
    inApp = 'sent';
  } catch { /* reported as failed */ }
  return { email, whatsapp, inApp, threshold, to };
}

export function startUsageAlertsCron(): void {
  console.log(`${LOG} Cron started (every ${SWEEP_INTERVAL_MS / 60_000} min; daily summary at ${SUMMARY_HOUR_IST}:00 IST)`);
  setTimeout(() => { void runUsageAlertsSweep(); }, FIRST_SWEEP_DELAY_MS);
  setInterval(() => { void runUsageAlertsSweep(); }, SWEEP_INTERVAL_MS);
}
