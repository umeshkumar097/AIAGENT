/**
 * Event dispatcher — single entry point for user-facing notifications.
 * dispatchEvent(eventKey, { userId, data }) → email (templated) + in-app notification + notification_events log.
 *
 * Pipeline per event:
 *  1. Load user (email/name) — `to` overrides the recipient (e.g. OTP before the account exists).
 *  2. Resolve template: active email_templates row for eventKey → legacy alias row → built-in default.
 *  3. Render {{placeholders}} (data + user + branding) for subject/html/text.
 *  4. Email: skipped when global setting notify_email_<eventKey> === false (OTP/reset always on),
 *     low_credits rate-guarded to once per 24h per user; sent through emailService.sendEmail.
 *  5. In-app: created for events with in-app copy (purchases, plan, credits, phone, campaigns, kyc...).
 *  6. One notification_events row per channel with status sent/failed/skipped.
 * Never throws to callers.
 */
import { and, desc, eq, gte } from 'drizzle-orm';
import { db } from '../db';
import { notificationEvents } from '@shared/schema';
import { storage } from '../storage';
import { logger } from '../utils/logger';
import { emailService } from './email-service';
import { NotificationService } from './notification-service';
import { EVENT_TEMPLATE_DEFAULTS, type EventTemplateDef } from './event-templates';

const SOURCE = 'EventDispatcher';

export type EventKey =
  | 'welcome' | 'email_verification' | 'password_reset'
  | 'purchase_completed' | 'invoice_created' | 'payment_failed' | 'refund_processed'
  | 'credits_added' | 'credits_added_by_admin' | 'low_credits'
  | 'plan_activated' | 'plan_renewed' | 'plan_expiring' | 'plan_expired'
  | 'auto_renew_enabled' | 'auto_renew_disabled'
  | 'phone_number_purchased' | 'phone_number_expiring' | 'phone_number_released' | 'phone_billing_failed'
  | 'campaign_completed' | 'campaign_failed'
  | 'kyc_approved' | 'kyc_rejected'
  | 'team_invite' | 'account_suspended' | 'account_reactivated';

export interface DispatchOptions {
  userId: string;
  /** Template variables, e.g. { amount, invoiceNumber, planName, credits, daysLeft } */
  data?: Record<string, unknown>;
  /** Files to attach to the email (e.g. the invoice PDF) */
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
  /** Override recipient (defaults to the user's email) */
  to?: string;
}

export interface DispatchResult {
  email: 'sent' | 'failed' | 'skipped';
  inApp: 'sent' | 'failed' | 'skipped';
}

type ChannelStatus = DispatchResult['email'];

/** Events whose email can never be disabled by the admin toggle. */
export const ALWAYS_ON_EVENTS: ReadonlySet<EventKey> = new Set<EventKey>(['email_verification', 'password_reset']);

/** Legacy email_templates.template_type values that map onto the new event keys. */
export const LEGACY_TEMPLATE_ALIASES: Partial<Record<EventKey, string>> = {
  email_verification: 'otp',
  purchase_completed: 'purchase_confirmation',
};

/** Events rate-limited to one email per user per window. */
const RATE_GUARDED: Partial<Record<EventKey, number>> = {
  low_credits: 24 * 60 * 60 * 1000,
};

export function emailToggleKey(eventKey: EventKey): string {
  return `notify_email_${eventKey}`;
}

/** Admin toggle: notify_email_<eventKey> (default true; always-on events ignore it). */
export async function isEventEmailEnabled(eventKey: EventKey): Promise<boolean> {
  if (ALWAYS_ON_EVENTS.has(eventKey)) return true;
  try {
    const setting = await storage.getGlobalSetting(emailToggleKey(eventKey));
    if (!setting) return true;
    const v = setting.value;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') return v.toLowerCase() !== 'false';
    return v !== 0 && v !== null;
  } catch (error) {
    logger.warn(`Could not read email toggle for ${eventKey}; defaulting to enabled`, error, SOURCE);
    return true;
  }
}

interface Branding {
  appName: string;
  appUrl: string;
  supportEmail: string;
}

async function getBranding(): Promise<Branding> {
  const appUrl = (process.env.APP_URL || process.env.BASE_URL || '').replace(/\/+$/, '');
  try {
    const [appName, supportEmail, fromEmail] = await Promise.all([
      storage.getGlobalSetting('app_name'),
      storage.getGlobalSetting('support_email'),
      storage.getGlobalSetting('smtp_from_email'),
    ]);
    return {
      appName: String(appName?.value || process.env.APP_NAME || 'AgentLabs'),
      appUrl,
      supportEmail: String(supportEmail?.value || fromEmail?.value || process.env.SMTP_FROM_EMAIL || ''),
    };
  } catch {
    return { appName: process.env.APP_NAME || 'AgentLabs', appUrl, supportEmail: process.env.SMTP_FROM_EMAIL || '' };
  }
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, ch => HTML_ESCAPES[ch]);
}

function stringify(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Replace {{var}} placeholders. Unknown placeholders render as empty strings so
 * customers never see raw braces. Values are HTML-escaped in HTML mode unless the
 * key ends with "Html" (caller-supplied markup) or "Url" (links must stay intact).
 */
export function renderTemplate(template: string, vars: Record<string, unknown>, html: boolean): string {
  let out = template;
  // Resolve nested placeholders inside values (e.g. sample invoiceUrl = "{{appUrl}}/app/billing") — two passes max.
  for (let pass = 0; pass < 2; pass++) {
    out = out.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (_m, key: string) => {
      const raw = stringify(vars[key]);
      if (html && !/(Html|Url)$/.test(key)) return escapeHtml(raw);
      return raw;
    });
    if (!/\{\{\s*[a-zA-Z0-9_.]+\s*\}\}/.test(out)) break;
  }
  return out;
}

interface ResolvedTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
  source: 'db' | 'legacy' | 'default';
}

async function resolveTemplate(eventKey: EventKey): Promise<ResolvedTemplate> {
  try {
    const row = await storage.getEmailTemplate(eventKey);
    if (row && row.isActive) return { subject: row.subject, htmlBody: row.htmlBody, textBody: row.textBody || '', source: 'db' };
    const alias = LEGACY_TEMPLATE_ALIASES[eventKey];
    if (alias) {
      const legacy = await storage.getEmailTemplate(alias);
      if (legacy && legacy.isActive) return { subject: legacy.subject, htmlBody: legacy.htmlBody, textBody: legacy.textBody || '', source: 'legacy' };
    }
  } catch (error) {
    logger.warn(`Template lookup failed for ${eventKey}; using built-in default`, error, SOURCE);
  }
  const def: EventTemplateDef = EVENT_TEMPLATE_DEFAULTS[eventKey];
  return { subject: def.subject, htmlBody: def.htmlBody, textBody: def.textBody, source: 'default' };
}

async function logChannel(
  userId: string | null,
  eventKey: EventKey,
  channel: 'email' | 'in_app',
  status: ChannelStatus,
  extra: { recipient?: string | null; subject?: string | null; error?: string | null; payload?: Record<string, unknown> | null }
): Promise<void> {
  try {
    await db.insert(notificationEvents).values({
      userId,
      eventKey,
      channel,
      status,
      recipient: extra.recipient ?? null,
      subject: extra.subject ?? null,
      error: extra.error ? String(extra.error).slice(0, 1000) : null,
      payload: extra.payload ?? null,
    });
  } catch (error) {
    logger.error(`Failed to write notification_events row (${eventKey}/${channel})`, error, SOURCE);
  }
}

async function isRateLimited(userId: string, eventKey: EventKey): Promise<boolean> {
  const windowMs = RATE_GUARDED[eventKey];
  if (!windowMs || !userId) return false;
  try {
    const since = new Date(Date.now() - windowMs);
    const [recent] = await db.select({ id: notificationEvents.id })
      .from(notificationEvents)
      .where(and(
        eq(notificationEvents.userId, userId),
        eq(notificationEvents.eventKey, eventKey),
        eq(notificationEvents.channel, 'email'),
        eq(notificationEvents.status, 'sent'),
        gte(notificationEvents.createdAt, since),
      ))
      .orderBy(desc(notificationEvents.createdAt))
      .limit(1);
    return Boolean(recent);
  } catch (error) {
    logger.warn(`Rate-guard lookup failed for ${eventKey}; allowing send`, error, SOURCE);
    return false;
  }
}

/** Strip non-serialisable/large values before storing the payload in the log. */
function safePayload(data: Record<string, unknown> | undefined): Record<string, unknown> | null {
  if (!data) return null;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (Buffer.isBuffer(v)) continue;
    out[k] = typeof v === 'string' && v.length > 500 ? `${v.slice(0, 500)}…` : v;
  }
  return out;
}

export async function dispatchEvent(eventKey: EventKey, opts: DispatchOptions): Promise<DispatchResult> {
  const result: DispatchResult = { email: 'skipped', inApp: 'skipped' };
  const def = EVENT_TEMPLATE_DEFAULTS[eventKey];
  if (!def) {
    logger.error(`Unknown event key: ${String(eventKey)}`, undefined, SOURCE);
    return result;
  }

  try {
    const user = opts.userId ? await storage.getUser(opts.userId).catch(() => undefined) : undefined;
    const recipient = (opts.to || user?.email || '').trim();
    const data = opts.data || {};
    const branding = await getBranding();
    const userName = stringify(data.userName) || user?.name || stringify(data.name) || 'there';

    const vars: Record<string, unknown> = {
      currency: 'INR',
      year: new Date().getFullYear(),
      ...data,
      userName,
      name: userName,
      email: recipient,
      appName: branding.appName,
      companyName: branding.appName,
      appUrl: branding.appUrl,
      dashboardUrl: `${branding.appUrl}/app`,
      billingUrl: `${branding.appUrl}/app/billing`,
      creditsUrl: `${branding.appUrl}/app/billing`,
      supportEmail: branding.supportEmail,
      supportUrl: `${branding.appUrl}/contact`,
    };
    // Legacy OTP templates use {{code}}; new ones use {{otpCode}} — keep both in sync.
    if (vars.otpCode === undefined && vars.code !== undefined) vars.otpCode = vars.code;
    if (vars.code === undefined && vars.otpCode !== undefined) vars.code = vars.otpCode;
    if (vars.campaignId && vars.campaignUrl === undefined) vars.campaignUrl = `${branding.appUrl}/app/campaigns/${stringify(vars.campaignId)}`;
    // Billing-module data shapes → template names
    if (vars.invoiceId && vars.invoiceUrl === undefined) vars.invoiceUrl = `${branding.appUrl}/api/invoices/${stringify(vars.invoiceId)}/pdf`;
    if (vars.invoiceUrl === undefined) vars.invoiceUrl = `${branding.appUrl}/app/billing`;
    if (vars.invoiceDate === undefined && vars.paidAt !== undefined) vars.invoiceDate = vars.paidAt;
    if (vars.renewalDate === undefined && vars.nextBillingDate !== undefined) vars.renewalDate = vars.nextBillingDate;
    if (vars.expiresAt === undefined && vars.periodEnd !== undefined) vars.expiresAt = vars.periodEnd;
    for (const dateKey of ['invoiceDate', 'expiresAt', 'expiredAt', 'renewalDate', 'nextBillingDate', 'periodEnd', 'periodStart', 'paidAt']) {
      const v = vars[dateKey];
      if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) vars[dateKey] = stringify(new Date(v));
    }

    const logUserId = user?.id ?? null;
    const payload = safePayload(data);

    // ── Email channel ─────────────────────────────────────────────────────
    const template = await resolveTemplate(eventKey);
    const subject = renderTemplate(template.subject, vars, false);
    if (!recipient) {
      result.email = 'skipped';
      await logChannel(logUserId, eventKey, 'email', 'skipped', { subject, error: 'no_recipient', payload });
    } else if (!(await isEventEmailEnabled(eventKey))) {
      result.email = 'skipped';
      await logChannel(logUserId, eventKey, 'email', 'skipped', { recipient, subject, error: 'disabled_by_admin', payload });
    } else if (await isRateLimited(opts.userId, eventKey)) {
      result.email = 'skipped';
      await logChannel(logUserId, eventKey, 'email', 'skipped', { recipient, subject, error: 'rate_limited', payload });
    } else {
      const html = renderTemplate(template.htmlBody, vars, true);
      const text = template.textBody ? renderTemplate(template.textBody, vars, false) : undefined;
      const attachments = opts.attachments?.map(a => ({ filename: a.filename, content: a.content }));
      try {
        const sent = await emailService.sendEmail(recipient, subject, html, attachments, { text });
        result.email = sent.success ? 'sent' : 'failed';
        await logChannel(logUserId, eventKey, 'email', result.email, {
          recipient, subject, error: sent.success ? null : sent.error || 'send_failed',
          payload: { ...payload, templateSource: template.source, messageId: sent.messageId },
        });
      } catch (error: unknown) {
        result.email = 'failed';
        const message = error instanceof Error ? error.message : String(error);
        await logChannel(logUserId, eventKey, 'email', 'failed', { recipient, subject, error: message, payload });
        logger.error(`Email send threw for ${eventKey}`, error, SOURCE);
      }
    }

    // ── In-app channel ────────────────────────────────────────────────────
    if (def.inApp && user) {
      const title = renderTemplate(def.inApp.title, vars, false);
      const message = renderTemplate(def.inApp.message, vars, false);
      const link = renderTemplate(def.inApp.link, vars, false);
      const ok = await NotificationService.createForEvent(eventKey, user.id, title, message, link);
      result.inApp = ok ? 'sent' : 'failed';
      await logChannel(user.id, eventKey, 'in_app', result.inApp, { recipient: user.id, subject: title, error: ok ? null : 'create_failed', payload });
    }

    logger.info(`Dispatched ${eventKey}: email=${result.email}, inApp=${result.inApp}`, { userId: opts.userId, recipient }, SOURCE);
  } catch (error) {
    logger.error(`dispatchEvent(${eventKey}) failed unexpectedly`, error, SOURCE);
  }
  return result;
}
