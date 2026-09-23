/**
 * Owner alerts after a call (F5): email via the platform email service and/or a Waki WhatsApp
 * template, driven by `agents.config.actions.ownerAlerts`. Called fire-and-forget from
 * PlivoCallService.handleCallStatus once a call is completed; deduped per call via
 * plivo_calls.metadata.ownerAlertSentAt. Never throws.
 */
import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { agents, appointments, contacts, leads, plivoCalls, scheduledCallbacks, users, CALL_OUTCOMES, type AgentActionsConfig } from '@shared/schema';
import { logger } from '../utils/logger';
import { readActionsConfig } from './call-actions';
import { normalizePhone } from './dnd-service';
import { emailService } from './email-service';

const SOURCE = 'OwnerAlerts';
type OwnerAlerts = NonNullable<AgentActionsConfig['ownerAlerts']>;

export interface OwnerAlertFields {
  caller_name: string; caller_phone: string; outcome: string; summary: string; appointment: string; callback: string;
  agent_name: string; call_time: string; duration: string; call_link: string;
}

const outcomeLabel = (id: string | null | undefined): string => CALL_OUTCOMES.find(o => o.id === id)?.label || (id ? id.replace(/_/g, ' ') : 'Completed');
const fmtDuration = (s: number | null | undefined): string => `${Math.floor((s || 0) / 60)}:${String((s || 0) % 60).padStart(2, '0')}`;
const esc = (v: string): string => v.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

function frontendUrl(): string {
  const raw = process.env.FRONTEND_URL || process.env.APP_URL || process.env.BASE_URL || '';
  return raw.replace(/\/+$/, '');
}

/** Resolve one template variable spec (`field key` or `text:<fixed>`). */
export function resolveVariable(spec: string, fields: OwnerAlertFields): string {
  if (spec.startsWith('text:')) return spec.slice(5);
  const v = (fields as unknown as Record<string, string>)[spec];
  return v == null ? '' : v;
}

/** Positional WhatsApp body components from the `{{n}} → spec` mapping. */
export function buildComponents(mapping: Record<string, string> | undefined, fields: OwnerAlertFields): Array<Record<string, unknown>> {
  const idx = Object.keys(mapping || {}).map(Number).filter(n => Number.isInteger(n) && n > 0);
  if (idx.length === 0) return [];
  const max = Math.max(...idx);
  const parameters = Array.from({ length: max }, (_, i) => ({ type: 'text', text: (resolveVariable(mapping![String(i + 1)] || '', fields) || ' ').substring(0, 1000) }));
  return [{ type: 'body', parameters }];
}

function shouldFire(cfg: OwnerAlerts, outcome: string | null): boolean {
  if (!cfg.enabled) return false;
  const triggers = cfg.triggers || [];
  if (triggers.includes('all')) return true;
  return !!outcome && (triggers as string[]).includes(outcome);
}

async function collectFields(callId: string): Promise<{ fields: OwnerAlertFields; cfg: OwnerAlerts; userId: string; callerPhone: string; meta: Record<string, unknown>; agentName: string } | null> {
  const [call] = await db.select().from(plivoCalls).where(eq(plivoCalls.id, callId)).limit(1);
  if (!call || !call.userId || !call.agentId) return null;
  const [agent] = await db.select({ name: agents.name, config: agents.config }).from(agents).where(eq(agents.id, call.agentId)).limit(1);
  if (!agent) return null;
  const cfg = readActionsConfig(agent.config).ownerAlerts;
  if (!cfg) return null;
  const meta = (call.metadata as Record<string, unknown> | null) || {};
  const outcome = typeof meta.outcome === 'string' ? meta.outcome : null;
  if (!shouldFire(cfg, outcome)) return null;

  const isTest = meta.testCall === true;
  const callerPhone = isTest ? '' : normalizePhone(call.callDirection === 'inbound' ? call.fromNumber : call.toNumber);
  let callerName = '';
  if (call.contactId) {
    const [c] = await db.select({ firstName: contacts.firstName, lastName: contacts.lastName }).from(contacts).where(eq(contacts.id, call.contactId)).limit(1);
    if (c) callerName = [c.firstName, c.lastName].filter(Boolean).join(' ').trim();
  }
  if (!callerName && callerPhone) {
    const [l] = await db.select({ firstName: leads.firstName, lastName: leads.lastName }).from(leads)
      .where(eq(leads.phone, callerPhone)).orderBy(desc(leads.createdAt)).limit(1);
    if (l) callerName = [l.firstName, l.lastName].filter(Boolean).join(' ').trim();
  }
  const [appt] = await db.select({ date: appointments.appointmentDate, time: appointments.appointmentTime, service: appointments.serviceName })
    .from(appointments).where(eq(appointments.callId, callId)).limit(1);
  const [cb] = await db.select({ at: scheduledCallbacks.scheduledAt, tz: scheduledCallbacks.timeZone, reason: scheduledCallbacks.reason })
    .from(scheduledCallbacks).where(eq(scheduledCallbacks.sourceCallId, callId)).limit(1);

  const summaryRaw = (call.aiSummary || call.transcript || '').trim();
  const summary = summaryRaw.length > 300 ? `${summaryRaw.substring(0, 297)}…` : summaryRaw;
  const when = call.answeredAt || call.startedAt || call.createdAt;
  const callTime = when ? new Date(when).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : '';
  const base = frontendUrl();

  return {
    cfg, userId: call.userId, callerPhone, meta, agentName: agent.name,
    fields: {
      caller_name: callerName || (isTest ? 'Browser test' : 'Unknown caller'),
      caller_phone: callerPhone || (isTest ? 'browser' : ''),
      outcome: outcomeLabel(outcome),
      summary: summary || 'No summary available',
      appointment: appt ? `${appt.date} ${String(appt.time).substring(0, 5)}${appt.service ? ` (${appt.service})` : ''}` : 'None',
      callback: cb ? new Date(cb.at).toLocaleString('en-IN', { timeZone: cb.tz || 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + (cb.reason ? ` — ${cb.reason}` : '') : 'None',
      agent_name: agent.name,
      call_time: callTime,
      duration: fmtDuration(call.duration),
      call_link: base ? `${base}/app/calls/${callId}` : `/app/calls/${callId}`,
    },
  };
}

function emailBodies(f: OwnerAlertFields): { subject: string; html: string; text: string } {
  const subject = `New ${f.outcome.toLowerCase()} from ${f.caller_name}${f.caller_phone && f.caller_phone !== f.caller_name ? ` (${f.caller_phone})` : ''} — ${f.agent_name}`;
  const rows: Array<[string, string]> = [
    ['Caller', `${f.caller_name}${f.caller_phone ? ` · ${f.caller_phone}` : ''}`], ['Outcome', f.outcome], ['Agent', f.agent_name],
    ['When', f.call_time], ['Duration', f.duration], ['Appointment', f.appointment], ['Callback', f.callback], ['Summary', f.summary],
  ];
  const text = `${subject}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nOpen the call: ${f.call_link}\n`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
  <h2 style="font-size:18px;margin:0 0 12px">${esc(subject)}</h2>
  <table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) =>
    `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;color:#666;width:120px">${esc(k)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`).join('')}</table>
  <p style="margin:16px 0"><a href="${esc(f.call_link)}" style="background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Open the call</a></p>
</div>`;
  return { subject, html, text };
}

async function sendWhatsapp(userId: string, cfg: OwnerAlerts, fields: OwnerAlertFields, callId: string): Promise<boolean> {
  const to = normalizePhone(cfg.whatsappPhone || '');
  const templateName = (cfg.whatsappTemplate || '').trim();
  if (!to || !templateName) return false;
  try {
    const { whatswayService } = await import('../../plugins/messaging/services/whatsway.service');
    const settings = await whatswayService.getSettings(userId).catch(() => null);
    if (!settings?.isActive) { logger.info(`Owner WhatsApp skipped for call ${callId}: Waki not connected`, undefined, SOURCE); return false; }
    let language = 'en';
    try {
      const tpl = (await whatswayService.getTemplates(userId)).find(t => t.name === templateName);
      if (!tpl) { logger.warn(`Owner WhatsApp skipped for call ${callId}: template "${templateName}" not found`, undefined, SOURCE); return false; }
      language = tpl.language || language;
    } catch (e: any) {
      logger.warn(`Owner WhatsApp: template list unavailable (${e.message}), sending anyway`, undefined, SOURCE);
    }
    await whatswayService.sendTemplate(userId, to, templateName, language, buildComponents(cfg.whatsappVariables, fields), { callId });
    return true;
  } catch (e: any) {
    logger.warn(`Owner WhatsApp failed for call ${callId}: ${e.message}`, undefined, SOURCE);
    return false;
  }
}

async function sendEmails(userId: string, cfg: OwnerAlerts, fields: OwnerAlertFields, callId: string): Promise<boolean> {
  let recipients = (cfg.email || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 3);
  if (recipients.length === 0) {
    const [u] = await db.select({ email: users.email }).from(users).where(eq(users.id, userId)).limit(1);
    if (u?.email) recipients = [u.email];
  }
  if (recipients.length === 0) return false;
  const { subject, html, text } = emailBodies(fields);
  let sent = false;
  for (const to of recipients) {
    try {
      const r = await emailService.sendEmail(to, subject, html, undefined, { text });
      sent = sent || r.success;
      if (!r.success) logger.warn(`Owner email to ${to} not sent for call ${callId}: ${r.error}`, undefined, SOURCE);
    } catch (e: any) {
      logger.warn(`Owner email to ${to} failed for call ${callId}: ${e.message}`, undefined, SOURCE);
    }
  }
  return sent;
}

/** Send the configured owner alerts for a completed call. Safe to call more than once. */
export async function sendOwnerAlerts(callId: string): Promise<{ email: boolean; whatsapp: boolean } | null> {
  try {
    const data = await collectFields(callId);
    if (!data) return null;
    if (data.meta.ownerAlertSentAt) return null; // already sent
    // Claim first so a concurrent status update cannot double-send
    await db.update(plivoCalls).set({ metadata: { ...data.meta, ownerAlertSentAt: new Date().toISOString() } }).where(eq(plivoCalls.id, callId));

    const [email, whatsapp] = await Promise.all([
      sendEmails(data.userId, data.cfg, data.fields, callId),
      sendWhatsapp(data.userId, data.cfg, data.fields, callId),
    ]);
    logger.info(`Owner alerts for call ${callId} (${data.agentName}): email=${email} whatsapp=${whatsapp}`, undefined, SOURCE);
    return { email, whatsapp };
  } catch (e: any) {
    logger.error(`Owner alerts failed for call ${callId}: ${e.message}`, undefined, SOURCE);
    return null;
  }
}
