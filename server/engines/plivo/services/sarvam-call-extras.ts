/**
 * Small helpers the Sarvam bridge calls but that do not need its private state:
 *  - browser test calls: live `transcript` events over the same WebSocket (F4)
 *  - the DND safety net when the caller says "don't call me again" (F2)
 */
import type { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';
import { addDoNotCall, normalizePhone } from '../../../services/dnd-service';
import { setCallOutcome } from './call-outcome';

/** Hard stop for a browser test call. */
export const TEST_CALL_MAX_MS = 300_000;

export type TestTranscriptRole = 'user' | 'agent' | 'system';

/** `{ event: 'transcript', role, text }` — only for browser test calls (ws.sarvamIsTestCall). */
export function emitTest(ws: WebSocket, role: TestTranscriptRole, text: string): void {
  if (!(ws as any).sarvamIsTestCall || ws.readyState !== ws.OPEN) return;
  try {
    ws.send(JSON.stringify({ event: 'transcript', role, text }));
  } catch { /* socket closing */ }
}

/**
 * A transcript array whose `push` also emits every line as a transcript event. The bridge pushes
 * "User: …", "Agent: …", "Agent (interrupted): …" and "System: …" lines, so one hook covers all of them.
 */
export function testTranscriptLines(ws: WebSocket): string[] {
  const lines: string[] = [];
  const emitLine = (line: string) => {
    const m = /^(User|Agent(?: \(interrupted\))?|System):\s*([\s\S]*)$/.exec(line);
    if (!m) return emitTest(ws, 'system', line);
    const role: TestTranscriptRole = m[1] === 'User' ? 'user' : m[1] === 'System' ? 'system' : 'agent';
    emitTest(ws, role, m[2]);
  };
  lines.push = (...items: string[]): number => {
    for (const item of items) emitLine(item);
    return Array.prototype.push.apply(lines, items);
  };
  return lines;
}

/**
 * The caller asked not to be called again: add their number to the owner's DND list and tag the call.
 * Never throws; returns false when the number could not be determined.
 */
export async function autoDoNotCall(opts: {
  callUuid: string; callId?: string | null; userId?: string | null;
  callDirection?: 'inbound' | 'outbound'; fromNumber?: string | null; toNumber?: string | null; transcript: string;
}): Promise<boolean> {
  const phone = normalizePhone(opts.callDirection === 'inbound' ? opts.fromNumber : opts.toNumber);
  if (!opts.userId || !phone) return false;
  try {
    await addDoNotCall({ userId: opts.userId, phone, reason: 'caller_request', source: 'agent', callId: opts.callId || null, note: opts.transcript.substring(0, 200) });
    if (opts.callId) await setCallOutcome(opts.callId, 'do_not_call', 'agent');
    logger.info(`[SarvamBridge][${opts.callUuid}] Caller asked not to be called again → added to DND`);
    return true;
  } catch (e: any) {
    logger.warn(`[SarvamBridge][${opts.callUuid}] Auto DND failed: ${e.message}`);
    return false;
  }
}
