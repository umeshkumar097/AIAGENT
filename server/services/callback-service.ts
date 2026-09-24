/**
 * Scheduled callbacks shared by the app route (/api/callbacks), the public API (/api/v1/callbacks,
 * POST /api/v1/calls with scheduledAt) and the runner (callback-cron.ts). One validation path:
 * agent must belong to the user, time in the future and ≤ 60 days, phone not on the do-not-call list,
 * optional per-call `variables` and an idempotent `externalRef` (unique per user).
 */
import { and, desc, eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { agents, leads, plivoPhoneNumbers, scheduledCallbacks, type ScheduledCallback } from '@shared/schema';
import { isDoNotCall, normalizePhone } from './dnd-service';
import { DEFAULT_TIME_ZONE, isValidTimeZone } from './call-actions/util';
import { readActionsConfig } from './call-actions';
import { webhookDeliveryService } from './webhook-delivery';
import { parseCallVariables, type CallVariables } from './call-variables';

export const CALLBACK_STATUSES = ['pending', 'calling', 'completed', 'failed', 'cancelled'] as const;
export type CallbackStatus = typeof CALLBACK_STATUSES[number];
export type CallbackSource = 'agent' | 'manual' | 'api';
export type CallbackSkipReason = 'do_not_call' | 'duplicate' | 'invalid_phone' | 'past' | 'too_far';
export const MAX_DAYS_AHEAD = 60;
export const MAX_EXTERNAL_REF = 120;

export class CallbackError extends Error {
  constructor(
    readonly status: number,
    readonly code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'DO_NOT_CALL',
    message: string,
    readonly reason?: CallbackSkipReason,
  ) { super(message); }
}

export interface CallbackInput {
  agentId: string;
  contactPhone: string;
  scheduledAt: string | Date;
  contactName?: string | null;
  reason?: string | null;
  timeZone?: string | null;
  variables?: unknown;
  externalRef?: string | null;
  /** Number to call from (must be one of the user's Plivo numbers); else the agent's assigned number when placed */
  fromNumber?: string | null;
}

export interface CallbackAgent { id: string; name: string; timeZone: string | null }

export function shapeCallback(row: ScheduledCallback, agentName?: string | null) {
  return {
    id: row.id,
    contactName: row.contactName,
    contactPhone: row.contactPhone,
    reason: row.reason,
    scheduledAt: row.scheduledAt,
    timeZone: row.timeZone,
    status: row.status,
    attempts: row.attempts,
    lastError: row.lastError,
    agentId: row.agentId,
    agentName: agentName ?? null,
    resultCallId: row.resultCallId,
    variables: row.variables ?? null,
    externalRef: row.externalRef ?? null,
    source: row.source,
    createdAt: row.createdAt,
  };
}
export type CallbackView = ReturnType<typeof shapeCallback>;

export function isCallbackStatus(s: unknown): s is CallbackStatus {
  return typeof s === 'string' && (CALLBACK_STATUSES as ReadonlyArray<string>).includes(s);
}

/** The user's agent (404 otherwise) with its configured appointment time zone. */
export async function resolveCallbackAgent(userId: string, agentId: string): Promise<CallbackAgent> {
  const id = typeof agentId === 'string' ? agentId.trim() : '';
  if (!id) throw new CallbackError(400, 'VALIDATION_ERROR', 'agentId is required');
  const [agent] = await db.select({ id: agents.id, name: agents.name, config: agents.config }).from(agents)
    .where(and(eq(agents.id, id), eq(agents.userId, userId))).limit(1);
  if (!agent) throw new CallbackError(404, 'NOT_FOUND', 'Agent not found or does not belong to you.');
  const tz = readActionsConfig(agent.config).appointments?.timeZone;
  return { id: agent.id, name: agent.name, timeZone: tz && isValidTimeZone(tz) ? tz : null };
}

const clean = (v: unknown, max: number): string | null =>
  (typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().substring(0, max) : '') || null;

export function parseScheduledAt(raw: unknown, now = Date.now()): Date {
  const at = raw instanceof Date ? raw : new Date(String(raw ?? ''));
  if (Number.isNaN(at.getTime())) throw new CallbackError(400, 'VALIDATION_ERROR', 'scheduledAt must be an ISO date-time', 'past');
  if (at.getTime() <= now) throw new CallbackError(400, 'VALIDATION_ERROR', 'scheduledAt must be in the future', 'past');
  if (at.getTime() > now + MAX_DAYS_AHEAD * 86_400_000) {
    throw new CallbackError(400, 'VALIDATION_ERROR', `scheduledAt must be within ${MAX_DAYS_AHEAD} days`, 'too_far');
  }
  return at;
}

async function findByExternalRef(userId: string, externalRef: string): Promise<ScheduledCallback | undefined> {
  const [row] = await db.select().from(scheduledCallbacks)
    .where(and(eq(scheduledCallbacks.userId, userId), eq(scheduledCallbacks.externalRef, externalRef))).limit(1);
  return row;
}

async function resolveFromNumberId(userId: string, fromNumber: string | null | undefined): Promise<string | null> {
  const phone = normalizePhone(fromNumber);
  if (!phone) return null;
  const [row] = await db.select({ id: plivoPhoneNumbers.id }).from(plivoPhoneNumbers)
    .where(and(eq(plivoPhoneNumbers.userId, userId), eq(plivoPhoneNumbers.phoneNumber, phone))).limit(1);
  return row?.id ?? null;
}

/**
 * Validates and inserts one callback. Same user + same externalRef returns the existing row
 * (`created: false`) — never a duplicate. Throws CallbackError (400 / 404 / 409 DO_NOT_CALL).
 */
export async function createCallback(
  userId: string, input: CallbackInput, source: CallbackSource, agent?: CallbackAgent,
): Promise<{ callback: CallbackView; created: boolean }> {
  const resolvedAgent = agent ?? await resolveCallbackAgent(userId, input.agentId);
  const contactPhone = normalizePhone(input.contactPhone);
  if (!contactPhone) throw new CallbackError(400, 'VALIDATION_ERROR', 'A valid phone number with country code is required', 'invalid_phone');
  const scheduledAt = parseScheduledAt(input.scheduledAt);
  const parsed = parseCallVariables(input.variables);
  if ('error' in parsed) throw new CallbackError(400, 'VALIDATION_ERROR', parsed.error);
  const variables: CallVariables | null = Object.keys(parsed.variables).length ? parsed.variables : null;
  const externalRef = clean(input.externalRef, MAX_EXTERNAL_REF);
  if (externalRef) {
    const existing = await findByExternalRef(userId, externalRef);
    if (existing) return { callback: shapeCallback(existing, resolvedAgent.name), created: false };
  }
  if (await isDoNotCall(userId, contactPhone)) {
    throw new CallbackError(409, 'DO_NOT_CALL', 'This number is on your do-not-call list.', 'do_not_call');
  }
  const timeZone = input.timeZone && isValidTimeZone(input.timeZone) ? input.timeZone : (resolvedAgent.timeZone || DEFAULT_TIME_ZONE);
  const values = {
    userId, agentId: resolvedAgent.id, contactPhone, scheduledAt, timeZone, status: 'pending', source, variables, externalRef,
    contactName: clean(input.contactName, 120), reason: clean(input.reason, 200),
    plivoPhoneNumberId: await resolveFromNumberId(userId, input.fromNumber),
  };
  let row: ScheduledCallback | undefined;
  try {
    [row] = await db.insert(scheduledCallbacks).values(values).returning();
  } catch (e: any) {
    // Two requests with the same externalRef raced: the unique index kept one — return it
    if (e?.code === '23505' && externalRef) row = await findByExternalRef(userId, externalRef);
    if (!row) throw e;
    return { callback: shapeCallback(row, resolvedAgent.name), created: false };
  }
  void afterScheduled(userId, row, resolvedAgent);
  return { callback: shapeCallback(row, resolvedAgent.name), created: true };
}

/** Lead badge + `callback.scheduled` webhook (the agent tool does the same from inside a call). Never throws. */
async function afterScheduled(userId: string, row: ScheduledCallback, agent: CallbackAgent): Promise<void> {
  try {
    await db.update(leads).set({ hasCallback: true, callbackScheduled: row.scheduledAt, callbackCompleted: false, updatedAt: new Date() })
      .where(and(eq(leads.userId, userId), eq(leads.phone, row.contactPhone)));
  } catch (e: any) {
    console.error(`[Callbacks] lead flag update failed for ${row.id}: ${e.message}`);
  }
  void webhookDeliveryService.triggerEvent(userId, 'callback.scheduled', {
    callback: {
      id: row.id, contactName: row.contactName, contactPhone: row.contactPhone, reason: row.reason,
      scheduledAt: row.scheduledAt.toISOString(), timeZone: row.timeZone, status: row.status, source: row.source, externalRef: row.externalRef,
    },
    call: null,
    agent: { id: agent.id, name: agent.name },
  });
}

export async function listCallbacks(
  userId: string, opts: { status?: string; limit: number; offset?: number },
): Promise<{ rows: CallbackView[]; total: number }> {
  const where = isCallbackStatus(opts.status)
    ? and(eq(scheduledCallbacks.userId, userId), eq(scheduledCallbacks.status, opts.status))
    : eq(scheduledCallbacks.userId, userId);
  const [rows, [{ count }]] = await Promise.all([
    db.select({ row: scheduledCallbacks, agentName: agents.name }).from(scheduledCallbacks)
      .leftJoin(agents, eq(agents.id, scheduledCallbacks.agentId))
      .where(where).orderBy(desc(scheduledCallbacks.createdAt)).limit(opts.limit).offset(opts.offset ?? 0),
    db.select({ count: sql<number>`count(*)::int` }).from(scheduledCallbacks).where(where),
  ]);
  return { rows: rows.map(r => shapeCallback(r.row, r.agentName)), total: Number(count) };
}

/** Cancels a pending callback by id or externalRef; null when none is pending. */
export async function cancelCallback(userId: string, by: { id?: string; externalRef?: string }): Promise<CallbackView | null> {
  const key = by.id ? eq(scheduledCallbacks.id, by.id) : by.externalRef ? eq(scheduledCallbacks.externalRef, by.externalRef) : null;
  if (!key) return null;
  const [row] = await db.update(scheduledCallbacks)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(and(key, eq(scheduledCallbacks.userId, userId), eq(scheduledCallbacks.status, 'pending')))
    .returning();
  return row ? shapeCallback(row) : null;
}
