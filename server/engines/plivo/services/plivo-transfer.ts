/**
 * Plivo call transfer shared by the OpenAI-Realtime bridge (audio-bridge.service.ts) and the
 * Sarvam bridge: redirect the A-leg to our Dial XML with the Update Call API, then stop the
 * media stream so Plivo fetches that XML. Requires keepCallAlive="true" in the Stream XML.
 */
import axios from 'axios';
import { db } from '../../../db';
import { plivoCalls, plivoCredentials } from '@shared/schema';
import { desc, eq } from 'drizzle-orm';
import { logger } from '../../../utils/logger';
import { getDomain } from '../../../utils/domain';
import { getTransferWebhookUrl } from '../config/plivo-config';

const SOURCE = 'PlivoTransfer';

export interface PlivoTransferParams {
  callUuid: string;
  plivoCredentialId?: string | null;
  fromNumber?: string | null;
  toNumber?: string | null;
  callDirection?: 'inbound' | 'outbound' | string | null;
  targetNumber: string;
}

export interface PlivoTransferResult { success: boolean; error?: string; callerId?: string }

/**
 * The Plivo-owned number is the caller ID for the Dial: inbound → the number the customer dialed
 * (toNumber); outbound → the number we called from (fromNumber).
 */
export function transferCallerId(p: Pick<PlivoTransferParams, 'fromNumber' | 'toNumber' | 'callDirection'>): string {
  return (p.callDirection === 'inbound' ? (p.toNumber || p.fromNumber) : (p.fromNumber || p.toNumber)) || '';
}

/** Update Call (aleg_url → Dial XML) + DELETE Stream. Never throws. */
export async function executePlivoTransfer(p: PlivoTransferParams): Promise<PlivoTransferResult> {
  const { callUuid, targetNumber } = p;
  const callerId = transferCallerId(p);
  logger.info(`[Transfer] ${callUuid}: ${p.callDirection || 'unknown'} call → ${targetNumber} (caller ID ${callerId})`, undefined, SOURCE);

  try {
    const credentials = p.plivoCredentialId
      ? await db.select().from(plivoCredentials).where(eq(plivoCredentials.id, p.plivoCredentialId)).limit(1)
      : [];
    if (!credentials.length) throw new Error('Plivo credentials not found');
    const { authId, authToken } = credentials[0];
    const auth = { username: authId, password: authToken };

    const transferXmlUrl = getTransferWebhookUrl(getDomain(), targetNumber, callerId);
    const transferResponse = await axios.post(
      `https://api.plivo.com/v1/Account/${authId}/Call/${callUuid}/`,
      { legs: 'aleg', aleg_url: transferXmlUrl, aleg_method: 'GET' },
      { auth, timeout: 10000 }
    );
    logger.info(`[Transfer] ${callUuid}: Update Call → ${transferResponse.status}`, undefined, SOURCE);

    // Stopping the stream makes Plivo fetch the aleg_url we just set
    try {
      const stopResponse = await axios.delete(`https://api.plivo.com/v1/Account/${authId}/Call/${callUuid}/Stream/`, { auth, timeout: 10000 });
      logger.info(`[Transfer] ${callUuid}: Stop Stream → ${stopResponse.status}`, undefined, SOURCE);
    } catch (stopError: any) {
      logger.warn(`[Transfer] ${callUuid}: Stop Stream error (may be ok): ${stopError.message}`, undefined, SOURCE);
    }

    logger.info(`[Transfer] ${callUuid}: initiated — Plivo will dial ${targetNumber}`, undefined, SOURCE);
    return { success: true, callerId };
  } catch (error: any) {
    const detail = error.response ? ` (${error.response.status}: ${JSON.stringify(error.response.data).substring(0, 200)})` : '';
    logger.error(`[Transfer] ${callUuid}: failed: ${error.message}${detail}`, undefined, SOURCE);
    return { success: false, error: error.message, callerId };
  }
}

/**
 * Hang up by Plivo call UUID with the Delete Call API. Does not depend on the plivo_calls row or its
 * status, so it works even when the DB record is missing/stale. Falls back to the primary active
 * credential when the session did not carry one. Never throws.
 */
export async function executePlivoHangup(p: { callUuid: string; plivoCredentialId?: string | null }): Promise<{ success: boolean; error?: string }> {
  const { callUuid } = p;
  try {
    let credentials = p.plivoCredentialId
      ? await db.select().from(plivoCredentials).where(eq(plivoCredentials.id, p.plivoCredentialId)).limit(1)
      : [];
    if (!credentials.length) {
      credentials = await db.select().from(plivoCredentials).where(eq(plivoCredentials.isActive, true)).orderBy(desc(plivoCredentials.isPrimary)).limit(1);
    }
    if (!credentials.length) throw new Error('Plivo credentials not found');
    const { authId, authToken } = credentials[0];
    const auth = { username: authId, password: authToken };

    const res = await axios.delete(`https://api.plivo.com/v1/Account/${authId}/Call/${callUuid}/`, { auth, timeout: 10000 });
    logger.info(`[Hangup] ${callUuid}: Delete Call → ${res.status}`, undefined, SOURCE);
    return { success: true };
  } catch (error: any) {
    // 404 = the call already ended on Plivo's side — that is the outcome we wanted
    if (error.response?.status === 404) return { success: true };
    const detail = error.response ? ` (${error.response.status}: ${JSON.stringify(error.response.data).substring(0, 200)})` : '';
    logger.error(`[Hangup] ${callUuid}: failed: ${error.message}${detail}`, undefined, SOURCE);
    return { success: false, error: error.message };
  }
}

/** Record the transfer on the plivo_calls row (by uuid). Best effort. */
export async function markCallTransferred(callUuid: string, targetNumber: string): Promise<void> {
  try {
    const [row] = await db.select({ metadata: plivoCalls.metadata }).from(plivoCalls).where(eq(plivoCalls.plivoCallUuid, callUuid)).limit(1);
    const metadata = { ...((row?.metadata as Record<string, unknown> | null) || {}), wasTransferred: true, hasTransfer: true, transferredTo: targetNumber, transferredAt: new Date().toISOString() };
    await db.update(plivoCalls)
      .set({ wasTransferred: true, transferredTo: targetNumber, transferredAt: new Date(), metadata })
      .where(eq(plivoCalls.plivoCallUuid, callUuid));
  } catch (e: any) {
    logger.warn(`[Transfer] ${callUuid}: could not mark call transferred: ${e.message}`, undefined, SOURCE);
  }
}
