/**
 * Starts a Sarvam bridge session for a Plivo stream OR a browser test call (F4). Extracted from
 * plivo-stream.ts so both WebSocket paths build the same tools and config. Also verifies the
 * short-lived test-call token issued by POST /api/agents/:id/test-session.
 */
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { WebSocket } from 'ws';
import { db } from '../../../db';
import { plivoPhoneNumbers, type Agent, type PlivoCall } from '@shared/schema';
import { logger } from '../../../utils/logger';
import { OpenAIPoolService } from '../services/openai-pool.service';
import { SarvamBridgeService } from '../services/sarvam-bridge.service';
import { buildCallMessagingTools, type CallTool } from '../../../services/call-messaging-tools';
import { buildCallActionTools, readActionsConfig } from '../../../services/call-actions';
import { normalizePhone } from '../../../services/call-actions/util';

const SOURCE = 'SarvamSession';
export const TEST_CALL_TOKEN_TTL = '2m';
export const TEST_CALL_MAX_SECONDS = 300;

/** The `agents` columns the session needs (plivo-stream selects this subset). */
export type SarvamSessionAgent = Pick<Agent,
  'telephonyProvider' | 'systemPrompt' | 'firstMessage' | 'language' | 'openaiVoice' | 'openaiModel' | 'llmModel' |
  'detectLanguageEnabled' | 'knowledgeBaseIds' | 'userId' | 'messagingEmailEnabled' | 'messagingWhatsappEnabled' |
  'messagingEmailTemplate' | 'messagingWhatsappTemplate' | 'messagingWhatsappVariables' | 'messagingEmailTemplates' |
  'messagingWhatsappTemplates' | 'name' | 'config' | 'transferEnabled' | 'transferPhoneNumber' | 'appointmentBookingEnabled'>;

export interface TestCallTokenPayload { callId: string; callUuid: string; userId: string; agentId: string; kind: 'test' }

function jwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET must be set');
  return 'insecure-dev-secret-CHANGE-ME';
}

export function signTestCallToken(payload: Omit<TestCallTokenPayload, 'kind'>): string {
  return jwt.sign({ ...payload, kind: 'test' }, jwtSecret(), { expiresIn: TEST_CALL_TOKEN_TTL });
}

/** Tokens are single-use: the callUuid is remembered on the first successful upgrade (entries expire with the token). */
const consumedTestCalls = new Map<string, number>();
function sweepConsumed(): void {
  const now = Date.now();
  for (const [uuid, at] of consumedTestCalls) if (now - at > 10 * 60_000) consumedTestCalls.delete(uuid);
}

/**
 * Payload when `token` is a valid, unexpired, unused test-call token for `callUuid` (bound to the
 * user + agent it was issued for); null otherwise. A successful check consumes the token.
 */
export function verifyTestCallToken(token: string | null | undefined, callUuid: string): TestCallTokenPayload | null {
  if (!token || !callUuid) return null;
  try {
    const p = jwt.verify(token, jwtSecret(), { maxAge: TEST_CALL_TOKEN_TTL }) as Partial<TestCallTokenPayload>;
    if (p.kind !== 'test' || !p.callId || !p.userId || !p.agentId || p.callUuid !== callUuid) return null;
    sweepConsumed();
    if (consumedTestCalls.has(callUuid)) return null;
    consumedTestCalls.set(callUuid, Date.now());
    return p as TestCallTokenPayload;
  } catch {
    return null;
  }
}

/** transfer_call is meaningless without a Plivo leg: keep the tool but make it explain that. */
function disableTransferForTest(tools: CallTool[]): CallTool[] {
  return tools.map(t => t.definition.function.name !== 'transfer_call' ? t : {
    ...t,
    handler: async () => ({ success: false, message: 'Transfer is not available in a browser test call. Tell the caller that on a real call they would be connected now.' }),
  });
}

/**
 * Build the call tools, pick an OpenAI key and hand the socket to SarvamBridgeService.
 * Returns false (and closes the socket) when no OpenAI key is available.
 */
export async function startSarvamSession(opts: {
  callUuid: string; ws: WebSocket; streamSid: string | null; call: PlivoCall; agent: SarvamSessionAgent; isTestCall?: boolean;
}): Promise<boolean> {
  const { callUuid, ws, call, agent } = opts;
  const isTestCall = !!opts.isTestCall;
  const agentId = call.agentId!;
  logger.info(`[${SOURCE}] Starting Sarvam session for ${callUuid}${isTestCall ? ' (browser test)' : ''}`, undefined, SOURCE);

  // Everything below the greeting can start needs at most one DB round trip: messaging templates,
  // the Plivo credential and the OpenAI key are independent, so they are fetched together.
  const callMeta = call.metadata as Record<string, unknown> | null;
  const callDirection: 'inbound' | 'outbound' = call.callDirection === 'inbound' ? 'inbound' : 'outbound';
  const knownCredentialId = (callMeta?.plivoCredentialId as string | undefined) || null;

  const [messagingTools, lookedUpCredentialId, openaiKeyFromCall] = await Promise.all([
    // Messaging tools (send_whatsapp / send_email) — templates resolved once per call
    (agent.messagingEmailEnabled || agent.messagingWhatsappEnabled)
      ? buildCallMessagingTools({
          userId: agent.userId, agentId, callId: call.id, callUuid,
          fromNumber: call.fromNumber, toNumber: call.toNumber, callDirection: call.callDirection, agent,
        }).catch((e: any) => { logger.warn(`[${SOURCE}] Messaging tools unavailable for ${callUuid}: ${e?.message}`, undefined, SOURCE); return [] as CallTool[]; })
      : Promise.resolve([] as CallTool[]),
    (!knownCredentialId && call.plivoPhoneNumberId)
      ? db.select({ plivoCredentialId: plivoPhoneNumbers.plivoCredentialId })
          .from(plivoPhoneNumbers).where(eq(plivoPhoneNumbers.id, call.plivoPhoneNumberId)).limit(1)
          .then(rows => rows[0]?.plivoCredentialId || null)
      : Promise.resolve<string | null>(null),
    call.openaiCredentialId
      ? OpenAIPoolService.getCredentialById(call.openaiCredentialId).then(c => c?.apiKey || null)
      : Promise.resolve<string | null>(null),
  ]);
  let callTools: CallTool[] = messagingTools;
  const plivoCredentialId = knownCredentialId || lookedUpCredentialId;

  // Action tools (transfer / appointments / save_lead / callbacks / api_* / dnd / outcome) from the agent row
  const actions = readActionsConfig(agent.config);
  const callerPhone = isTestCall ? '' : normalizePhone(callDirection === 'inbound' ? call.fromNumber : call.toNumber);
  callTools.push(...await buildCallActionTools({
    userId: agent.userId, agentId, callId: call.id, callUuid,
    fromNumber: call.fromNumber, toNumber: call.toNumber, callDirection, callerPhone,
    plivoPhoneNumberId: call.plivoPhoneNumberId || null, plivoCredentialId,
    campaignId: call.campaignId || null,
    agent: { id: agentId, ...agent },
    actions,
    language: agent.language || 'hi-IN',
    messagingTools: [...callTools],
  }));
  if (isTestCall) callTools = disableTransferForTest(callTools);

  // OpenAI key for the chat model: the call's credential, else the least-loaded pool key, else env
  let openaiKey: string | null = openaiKeyFromCall;
  if (!openaiKey) {
    const anyCred = await OpenAIPoolService.getLeastLoadedCredential();
    openaiKey = anyCred?.apiKey || null;
  }
  if (!openaiKey && process.env.OPENAI_API_KEY) openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    logger.error(`[${SOURCE}] No OpenAI key available for Sarvam call ${callUuid} — add OpenAI credentials in admin`, undefined, SOURCE);
    ws.close();
    return false;
  }

  await SarvamBridgeService.initializeSession(callUuid, ws, opts.streamSid, agentId, {
    systemPrompt: (callMeta?.systemPrompt as string) || agent.systemPrompt || 'Aap ek helpful Indian voice assistant hain.',
    firstMessage: (callMeta?.firstMessage as string) || agent.firstMessage || undefined,
    language: agent.language || 'hi-IN',
    voice: agent.openaiVoice || 'priya',
    openaiApiKey: openaiKey,
    // Sarvam uses chat/completions: prefer the agent's chat model (llmModel); call.openaiModel is a Realtime id
    openaiModel: agent.llmModel || agent.openaiModel || 'gpt-4o-mini',
    detectLanguage: !!agent.detectLanguageEnabled,
    knowledgeBaseIds: agent.knowledgeBaseIds || null,
    userId: agent.userId,
    tools: callTools,
    plivoCredentialId,
    plivoPhoneNumberId: call.plivoPhoneNumberId || null,
    callDirection,
    fromNumber: call.fromNumber,
    toNumber: call.toNumber,
    actionsTimeZone: actions.appointments?.timeZone,
    voicemail: actions.voicemail,
    isTestCall,
  }, call.id);
  return true;
}
