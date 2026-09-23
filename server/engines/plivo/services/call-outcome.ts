/**
 * Call outcome tagging for plivo_calls: `metadata.outcome` / `metadata.outcomeSource` plus the
 * `classification` column (so lists and exports show the same id). Agent-set outcomes always win
 * over system/AI ones; the answering-machine webhook and handleCallStatus feed the system side.
 */
import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { plivoCalls, type CallOutcome, type CallOutcomeSource, type PlivoCall } from '@shared/schema';
import { logger } from '../../../utils/logger';

const SOURCE = 'CallOutcome';
type Meta = Record<string, unknown>;

export function readOutcome(metadata: unknown): { outcome: CallOutcome | null; source: CallOutcomeSource | null } {
  const m = (metadata && typeof metadata === 'object' ? metadata : {}) as Meta;
  const outcome = typeof m.outcome === 'string' && m.outcome ? (m.outcome as CallOutcome) : null;
  const source = typeof m.outcomeSource === 'string' ? (m.outcomeSource as CallOutcomeSource) : null;
  return { outcome, source };
}

/** True when `next` may replace the stored outcome: agent beats everything, system beats ai, same source overwrites. */
function mayReplace(current: CallOutcomeSource | null, next: CallOutcomeSource): boolean {
  if (!current) return true;
  const rank: Record<CallOutcomeSource, number> = { ai: 0, system: 1, agent: 2 };
  return rank[next] >= rank[current];
}

/** Persist an outcome on a call row (by id). Never throws. Returns true when written. */
export async function setCallOutcome(callId: string, outcome: CallOutcome, source: CallOutcomeSource, extra: Meta = {}): Promise<boolean> {
  try {
    const [row] = await db.select({ metadata: plivoCalls.metadata }).from(plivoCalls).where(eq(plivoCalls.id, callId)).limit(1);
    if (!row) return false;
    const current = readOutcome(row.metadata);
    if (!mayReplace(current.source, source)) {
      logger.info(`Call ${callId}: keeping ${current.source} outcome "${current.outcome}" over ${source} "${outcome}"`, undefined, SOURCE);
      return false;
    }
    const metadata = { ...((row.metadata as Meta | null) || {}), ...extra, outcome, outcomeSource: source, outcomeAt: new Date().toISOString() };
    await db.update(plivoCalls).set({ metadata, classification: outcome }).where(eq(plivoCalls.id, callId));
    logger.info(`Call ${callId}: outcome "${outcome}" (${source})`, undefined, SOURCE);
    return true;
  } catch (e: any) {
    logger.warn(`Could not set outcome for call ${callId}: ${e.message}`, undefined, SOURCE);
    return false;
  }
}

/** Plivo AMD said "machine": tag the row (by Plivo UUID) so the status handler and retries see it. */
export async function markMachineDetected(callUuid: string): Promise<PlivoCall | null> {
  const [call] = await db.select().from(plivoCalls).where(eq(plivoCalls.plivoCallUuid, callUuid)).limit(1);
  if (!call) return null;
  await setCallOutcome(call.id, 'voicemail', 'system', { answeredBy: 'machine', machineDetectedAt: new Date().toISOString() });
  return call;
}

/**
 * The outcome a call should carry once its terminal status is known. The stored (agent) outcome wins;
 * otherwise telephony status, transfer and booking flags decide. Null when nothing applies yet.
 */
export function resolveSystemOutcome(call: PlivoCall, status: string): { outcome: CallOutcome; source: CallOutcomeSource } | null {
  const m = (call.metadata as Meta | null) || {};
  const stored = readOutcome(m);
  if (stored.outcome && stored.source === 'agent') return { outcome: stored.outcome, source: 'agent' };
  if (call.wasTransferred || m.wasTransferred === true) return { outcome: 'transferred', source: 'system' };
  if (m.appointmentBooked === true) return { outcome: 'appointment_booked', source: 'system' };
  if (stored.outcome) return { outcome: stored.outcome, source: stored.source || 'system' };
  if (status === 'no-answer') return { outcome: 'no_answer', source: 'system' };
  if (status === 'busy') return { outcome: 'busy', source: 'system' };
  if (status === 'failed' || status === 'canceled') return { outcome: 'failed', source: 'system' };
  return null;
}

/**
 * Fallback for a completed call with no outcome: map the CRM processor's category (or the insights
 * classification) to an outcome, tagged `outcomeSource: 'ai'`.
 */
export function outcomeFromAnalysis(category: string | null | undefined, classification: string | null | undefined): CallOutcome {
  const c = (category || '').toLowerCase();
  if (c === 'appointment_booked') return 'appointment_booked';
  if (c === 'call_transfer') return 'transferred';
  if (c === 'need_follow_up') return 'callback_requested';
  if (c === 'hot' || c === 'interested') return 'interested';
  if (c === 'cold' || c === 'not_interested') return 'not_interested';
  const k = (classification || '').toLowerCase();
  if (k === 'hot' || k === 'interested') return 'interested';
  if (k === 'cold' || k === 'lost' || k === 'not_interested') return 'not_interested';
  return 'no_decision';
}
