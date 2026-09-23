/**
 * plivo_calls.metadata merge used to hand call-time outcomes (appointment, lead, callback)
 * to the post-call CRM lead processor, which reads these keys after the call ends.
 */
import { db } from '../../db';
import { plivoCalls } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { logger } from '../../utils/logger';

/** Shallow-merge `patch` into plivo_calls.metadata (by row id); `aiInsights` is merged one level deeper. Never throws. */
export async function mergeCallMetadata(callId: string, patch: Record<string, unknown>): Promise<void> {
  try {
    const [row] = await db.select({ metadata: plivoCalls.metadata }).from(plivoCalls).where(eq(plivoCalls.id, callId)).limit(1);
    const current = (row?.metadata as Record<string, unknown> | null) || {};
    const aiInsights = { ...((current.aiInsights as Record<string, unknown>) || {}), ...((patch.aiInsights as Record<string, unknown>) || {}) };
    await db.update(plivoCalls).set({ metadata: { ...current, ...patch, aiInsights } }).where(eq(plivoCalls.id, callId));
  } catch (e: any) {
    logger.warn(`Could not update metadata for call ${callId}: ${e.message}`, undefined, 'CallActions');
  }
}
