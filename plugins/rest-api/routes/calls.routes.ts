/**
 * ============================================================
 * REST API Plugin - Calls Routes
 * Endpoints for triggering and managing calls
 * ============================================================
 */

import { Router, Response } from 'express';
import { apiAuthMiddleware, asyncHandler, requireScope } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest, ApiResponse, TriggerCallRequest, TriggerCallResponse, PaginationMeta } from '../types.js';
import { db } from '../../../server/db.js';
import { calls, plivoCalls, twilioOpenaiCalls, agents, phoneNumbers, users, CALL_OUTCOMES, type CallOutcome } from '../../../shared/schema.js';
import { eq, and, desc, gte, lte, or, sql, type SQL } from 'drizzle-orm';
import { z } from 'zod';
import { getCallServices } from '../service-registry.js';
import { setCallOutcome } from '../../../server/engines/plivo/services/call-outcome.js';
import { mergeCallMetadata } from '../../../server/services/call-actions/call-meta.js';
import { applyCallVariables, parseCallVariables } from '../../../server/services/call-variables.js';
import { CallbackError, createCallback } from '../../../server/services/callback-service.js';
import { queryDate, queryString, sendData, sendError, sendNotFound, sendValidationError } from './helpers.js';

const router = Router();

const OUTCOME_IDS = CALL_OUTCOMES.map(o => o.id) as CallOutcome[];
const AGENT_OUTCOME_IDS = CALL_OUTCOMES.filter(o => o.kind === 'agent').map(o => o.id) as CallOutcome[];

/** `outcome` / `outcomeSource` / `answeredBy` from a call's metadata, falling back to the classification column. */
function outcomeFields(metadata: unknown, classification: string | null | undefined) {
  const m = (metadata && typeof metadata === 'object' ? metadata : {}) as Record<string, unknown>;
  const fromMeta = typeof m.outcome === 'string' && m.outcome ? m.outcome : null;
  const fromClassification = classification && (OUTCOME_IDS as string[]).includes(classification) ? classification : null;
  return {
    outcome: fromMeta ?? fromClassification,
    outcomeSource: typeof m.outcomeSource === 'string' ? m.outcomeSource : null,
    answeredBy: typeof m.answeredBy === 'string' ? m.answeredBy : null,
  };
}

type CallTable = typeof calls | typeof plivoCalls | typeof twilioOpenaiCalls;

/** Shared list filters (`agentId`, `campaignId`, `from`, `to`, `outcome`) for one engine table. */
function listFilters(t: CallTable, req: AuthenticatedApiRequest): SQL {
  const conditions: SQL[] = [eq(t.userId, req.apiAuth.userId)];
  const agentId = queryString(req, 'agentId');
  if (agentId) conditions.push(eq(t.agentId, agentId));
  const campaignId = queryString(req, 'campaignId');
  if (campaignId) conditions.push(eq(t.campaignId, campaignId));
  const from = queryDate(req, 'from');
  if (from) conditions.push(gte(t.createdAt, from));
  const to = queryDate(req, 'to');
  if (to) conditions.push(lte(t.createdAt, to));
  const outcome = queryString(req, 'outcome');
  if (outcome) {
    const byMeta = sql`${t.metadata}->>'outcome' = ${outcome}`;
    conditions.push(t === plivoCalls ? or(byMeta, eq(plivoCalls.classification, outcome))! : byMeta);
  }
  return and(...conditions)!;
}

// Validation schemas
const triggerCallSchema = z.object({
  agentId: z.string().uuid('Invalid agent ID'),
  toNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  fromNumber: z.string().optional(),
  engine: z.enum(['elevenlabs', 'plivo', 'twilio-openai']).optional(),
  dynamicVariables: z.record(z.string()).optional(),
  metadata: z.record(z.string()).optional(),
  scheduledAt: z.string().datetime().optional(),
});

/**
 * POST /v1/calls - Trigger a new outbound call
 */
router.post(
  '/',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId, apiKeyId } = req.apiAuth;
    
    // Validate request body
    const parseResult = triggerCallSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: { errors: parseResult.error.flatten().fieldErrors },
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(400).json(response);
    }
    
    const { agentId, toNumber, fromNumber, engine, dynamicVariables, metadata, scheduledAt } = parseResult.data;
    const parsedVariables = parseCallVariables(dynamicVariables);
    if ('error' in parsedVariables) {
      return sendError(req, res, 400, 'VALIDATION_ERROR', parsedVariables.error, { field: 'dynamicVariables' });
    }
    const callVariables = parsedVariables.variables;

    // Check user has credits
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user || user.credits < 1) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'INSUFFICIENT_CREDITS',
          message: 'Insufficient credits to make a call. Please add more credits.',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(402).json(response);
    }
    
    // Get agent
    const [agent] = await db
      .select()
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.userId, userId)))
      .limit(1);
    
    if (!agent) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Agent not found or does not belong to you.',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(404).json(response);
    }
    
    if (!agent.isActive) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'AGENT_NOT_ACTIVE',
          message: 'Agent is not active. Please activate it before making calls.',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(400).json(response);
    }

    // A future scheduledAt (≤ 60 days) books a scheduled call instead of dialling now.
    // The callback runner places it with the same variables; `metadata.externalRef` makes the request idempotent.
    if (scheduledAt && new Date(scheduledAt).getTime() > Date.now()) {
      try {
        const { callback } = await createCallback(userId, {
          agentId, contactPhone: toNumber, scheduledAt, fromNumber,
          contactName: callVariables.contact_name || callVariables.name || metadata?.contact_name || null,
          reason: metadata?.reason || null,
          variables: callVariables,
          externalRef: metadata?.externalRef || null,
        }, 'api');
        return sendData(req, res, { scheduled: true, callbackId: callback.id, scheduledAt: callback.scheduledAt }, 202);
      } catch (error) {
        if (error instanceof CallbackError) return sendError(req, res, error.status, error.code, error.message);
        throw error;
      }
    }

    // Determine engine to use - default to elevenlabs for outbound calls
    const callEngine = engine || agent.telephonyProvider || 'elevenlabs';
    
    // Get from number and phone record if not provided
    let callerNumber = fromNumber;
    let fromPhoneRecord: typeof phoneNumbers.$inferSelect | null = null;
    
    if (!callerNumber) {
      // Find a phone number owned by the user
      const [userPhone] = await db
        .select()
        .from(phoneNumbers)
        .where(and(eq(phoneNumbers.userId, userId), eq(phoneNumbers.status, 'active')))
        .limit(1);
      
      if (!userPhone) {
        const response: ApiResponse = {
          success: false,
          error: {
            code: 'PHONE_NUMBER_NOT_AVAILABLE',
            message: 'No active phone number found. Please provide a fromNumber or purchase a phone number.',
          },
          meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
        };
        return res.status(400).json(response);
      }
      callerNumber = userPhone.phoneNumber;
      fromPhoneRecord = userPhone;
    } else {
      // Look up phone record by number
      const [foundPhone] = await db
        .select()
        .from(phoneNumbers)
        .where(and(eq(phoneNumbers.phoneNumber, callerNumber), eq(phoneNumbers.userId, userId)))
        .limit(1);
      fromPhoneRecord = foundPhone || null;
    }
    
    // Create call based on engine
    let callId: string;
    let callStatus: string = 'queued';
    
    let services: ReturnType<typeof getCallServices>;
    try {
      services = getCallServices();
    } catch (serviceErr: any) {
      console.error('[REST API] Call initiation failed:', serviceErr.message);
      return res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Call services are not available. Ensure the REST API plugin is properly registered with call service injection.',
        },
      } as ApiResponse);
    }

    try {
      if (callEngine === 'plivo') {
        // Use Plivo + OpenAI engine
        if (!fromPhoneRecord) {
          throw new Error('Phone number not found in database.');
        }
        const { PlivoCallService } = services;
        // {{key}} substitution + "Details for this call" block from dynamicVariables (values are never logged)
        const prompt = applyCallVariables(agent.systemPrompt || 'You are a helpful assistant.', agent.firstMessage, callVariables);
        const result = await PlivoCallService.initiateCall({
          userId,
          agentId,
          toNumber,
          fromNumber: callerNumber,
          plivoPhoneNumberId: fromPhoneRecord.id,
          agentConfig: {
            voice: (agent.openaiVoice as any) || 'alloy',
            model: (agent.openaiModel as any) || 'gpt-realtime-1.5',
            systemPrompt: prompt.systemPrompt,
            firstMessage: prompt.firstMessage,
          },
        });
        // The row id (what lists, GET /calls/{id} and webhooks use); the Plivo UUID is also accepted on lookups
        callId = result.plivoCall?.id || result.callUuid;
        callStatus = result.plivoCall?.status || 'queued';
        if (result.plivoCall?.id) {
          await mergeCallMetadata(result.plivoCall.id, { apiKeyId, externalRef: metadata?.externalRef || null });
        }
      } else if (callEngine === 'twilio-openai') {
        // Use Twilio + OpenAI engine
        if (!fromPhoneRecord) {
          throw new Error('Phone number not found in database.');
        }
        const { TwilioOpenAICallService } = services;
        const result = await TwilioOpenAICallService.initiateCall({
          userId,
          agentId,
          toNumber,
          fromNumberId: fromPhoneRecord.id,
        });
        if (!result.success) {
          throw new Error(result.error || 'Failed to initiate Twilio-OpenAI call');
        }
        callId = result.callId || '';
        callStatus = 'queued';
      } else {
        // Use ElevenLabs engine (default)
        const { OutboundCallService, getCredentialForAgent } = services;
        
        // Get the agent's ElevenLabs ID
        if (!agent.elevenLabsAgentId) {
          throw new Error('Agent is not configured for ElevenLabs. Missing elevenLabsAgentId.');
        }
        
        // Find phone number with ElevenLabs ID
        const [elPhone] = await db
          .select()
          .from(phoneNumbers)
          .where(and(eq(phoneNumbers.phoneNumber, callerNumber), eq(phoneNumbers.userId, userId)))
          .limit(1);
        
        if (!elPhone || !elPhone.elevenLabsPhoneNumberId) {
          throw new Error('Phone number is not configured for ElevenLabs outbound calls. Missing elevenLabsPhoneNumberId.');
        }
        
        // Get API key from pool
        const credential = await getCredentialForAgent(agentId);
        if (!credential) {
          throw new Error('No ElevenLabs API capacity available.');
        }
        
        const merged: Record<string, string> = {
          ...(metadata || {}),
          ...(dynamicVariables || {}),
        };
        const callDynamicVars: Record<string, string> = {
          contact_name: merged.contact_name?.trim() || toNumber,
          contact_phone: merged.contact_phone?.trim() || toNumber,
          name: merged.name?.trim() || toNumber,
          phone: merged.phone?.trim() || toNumber,
          ...merged,
        };
        callDynamicVars.contact_name = callDynamicVars.contact_name?.trim() || toNumber;
        callDynamicVars.name = callDynamicVars.name?.trim() || toNumber;

        const callService = new OutboundCallService(credential.apiKey);
        const result = await callService.initiateCall({
          agentId: agent.elevenLabsAgentId,
          agentPhoneNumberId: elPhone.elevenLabsPhoneNumberId,
          toNumber,
          dynamicData: callDynamicVars,
        });
        
        const contactName = callDynamicVars.contact_name || toNumber;

        // Create a call record in the database
        const callRecord = await db.insert(calls).values({
          id: result.conversationId || `el-${Date.now()}`,
          userId,
          toNumber,
          fromNumber: callerNumber,
          status: result.success ? 'in-progress' : 'failed',
          callDirection: 'outgoing',
          twilioSid: result.callSid || undefined,
          elevenLabsConversationId: result.conversationId,
          metadata: { apiKeyId, callSid: result.callSid, agentId, agentName: agent.name, engine: callEngine, credentialId: credential.id, contactName, dynamicVariables: callDynamicVars },
          agentId,
          engineType: callEngine,
          creditsUsed: 1,
        }).returning();
        
        callId = callRecord[0]?.id || result.conversationId || '';
        callStatus = result.success ? 'in-progress' : 'failed';
      }
    } catch (error: any) {
      console.error('[REST API] Call initiation failed:', error);
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to initiate call',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(500).json(response);
    }
    
    const responseData: TriggerCallResponse = {
      callId,
      status: callStatus,
      agentId,
      toNumber,
      fromNumber: callerNumber,
      engine: callEngine,
      createdAt: new Date().toISOString(),
    };
    
    const response: ApiResponse<TriggerCallResponse> = {
      success: true,
      data: responseData,
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.status(201).json(response);
  })
);

/**
 * GET /v1/calls - List calls
 */
router.get(
  '/',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize as string, 10) || 20, 100);
    const offset = (page - 1) * pageSize;

    const outcomeFilter = queryString(req, 'outcome');
    if (outcomeFilter && !(OUTCOME_IDS as string[]).includes(outcomeFilter)) {
      return sendError(req, res, 400, 'VALIDATION_ERROR', `outcome must be one of: ${OUTCOME_IDS.join(', ')}`);
    }
    const fetchLimit = offset + pageSize;
    const [elWhere, plivoWhere, twilioWhere] = [listFilters(calls, req), listFilters(plivoCalls, req), listFilters(twilioOpenaiCalls, req)];

    const [
      elevenLabsCalls, plivoCallsList, twilioOpenaiCallsList,
      elCount, plivoCount, twilioCount,
    ] = await Promise.all([
      db.select().from(calls).where(elWhere).orderBy(desc(calls.createdAt)).limit(fetchLimit),
      db.select().from(plivoCalls).where(plivoWhere).orderBy(desc(plivoCalls.createdAt)).limit(fetchLimit),
      db.select().from(twilioOpenaiCalls).where(twilioWhere).orderBy(desc(twilioOpenaiCalls.createdAt)).limit(fetchLimit),
      db.select({ count: sql<number>`count(*)` }).from(calls).where(elWhere),
      db.select({ count: sql<number>`count(*)` }).from(plivoCalls).where(plivoWhere),
      db.select({ count: sql<number>`count(*)` }).from(twilioOpenaiCalls).where(twilioWhere),
    ]);

    const totalItems = Number(elCount[0]?.count || 0) + Number(plivoCount[0]?.count || 0) + Number(twilioCount[0]?.count || 0);

    // Normalize and merge calls
    const normalizedCalls = [
      ...elevenLabsCalls.map(c => ({
        id: c.id,
        engine: 'elevenlabs',
        agentId: c.agentId,
        campaignId: c.campaignId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: c.creditsUsed,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        ...outcomeFields(c.metadata, null),
        createdAt: c.createdAt,
        endedAt: c.endedAt,
      })),
      ...plivoCallsList.map(c => ({
        id: c.id,
        engine: 'plivo',
        agentId: c.agentId,
        campaignId: c.campaignId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: null,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        ...outcomeFields(c.metadata, c.classification),
        createdAt: c.createdAt,
        endedAt: c.endedAt,
      })),
      ...twilioOpenaiCallsList.map(c => ({
        id: c.id,
        engine: 'twilio-openai',
        agentId: c.agentId,
        campaignId: c.campaignId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: null,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        ...outcomeFields(c.metadata, null),
        createdAt: c.createdAt,
        endedAt: c.endedAt,
      })),
    ].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const response: ApiResponse = {
      success: true,
      data: normalizedCalls.slice(offset, offset + pageSize),
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
    
    res.json(response);
  })
);

/**
 * GET /v1/calls/outcomes - The outcome vocabulary (agent-set + system-set ids)
 */
router.get(
  '/outcomes',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    sendData(req, res, CALL_OUTCOMES);
  })
);

type OwnedCall =
  | { engine: 'elevenlabs'; row: typeof calls.$inferSelect }
  | { engine: 'plivo'; row: typeof plivoCalls.$inferSelect }
  | { engine: 'twilio-openai'; row: typeof twilioOpenaiCalls.$inferSelect };

/** The user's call by row id (Plivo rows also match their Plivo call UUID), whichever engine placed it. */
async function findOwnedCall(userId: string, id: string): Promise<OwnedCall | null> {
  const [el] = await db.select().from(calls).where(and(eq(calls.id, id), eq(calls.userId, userId))).limit(1);
  if (el) return { engine: 'elevenlabs', row: el };
  const [pl] = await db.select().from(plivoCalls)
    .where(and(or(eq(plivoCalls.id, id), eq(plivoCalls.plivoCallUuid, id)), eq(plivoCalls.userId, userId))).limit(1);
  if (pl) return { engine: 'plivo', row: pl };
  const [tw] = await db.select().from(twilioOpenaiCalls).where(and(eq(twilioOpenaiCalls.id, id), eq(twilioOpenaiCalls.userId, userId))).limit(1);
  if (tw) return { engine: 'twilio-openai', row: tw };
  return null;
}

function callDetail(found: OwnedCall) {
  const { engine, row } = found;
  return {
    id: row.id,
    engine,
    agentId: row.agentId,
    campaignId: row.campaignId,
    toNumber: row.toNumber,
    fromNumber: row.fromNumber,
    status: row.status,
    duration: row.duration,
    creditsUsed: found.engine === 'elevenlabs' ? found.row.creditsUsed : null,
    transcript: row.transcript,
    aiSummary: row.aiSummary,
    recordingUrl: row.recordingUrl,
    sentiment: row.sentiment ?? null,
    ...outcomeFields(row.metadata, engine === 'plivo' ? row.classification : null),
    createdAt: row.createdAt,
    endedAt: row.endedAt,
  };
}

/**
 * GET /v1/calls/:id - Get call details
 */
router.get(
  '/:id',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const found = await findOwnedCall(req.apiAuth.userId, req.params.id);
    if (!found) return sendNotFound(req, res, 'Call');
    sendData(req, res, callDetail(found));
  })
);

const outcomeSchema = z.object({
  outcome: z.string().refine(v => (AGENT_OUTCOME_IDS as string[]).includes(v), { message: `outcome must be one of: ${AGENT_OUTCOME_IDS.join(', ')}` }),
  note: z.string().trim().max(500).optional(),
});

/**
 * POST /v1/calls/:id/outcome - Set the outcome from your CRM (authoritative, like an agent-set outcome)
 */
router.post(
  '/:id/outcome',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const found = await findOwnedCall(req.apiAuth.userId, req.params.id);
    if (!found) return sendNotFound(req, res, 'Call');
    const parsed = outcomeSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const outcome = parsed.data.outcome as CallOutcome;
    const note = parsed.data.note || null;
    const extra = { outcomeNote: note, outcomeVia: 'api', outcomeApiKeyId: req.apiAuth.apiKeyId };
    let written: boolean;
    if (found.engine === 'plivo') {
      // 'agent' precedence: the CRM's decision replaces system/AI outcomes, like the agent's own outcome tool
      written = await setCallOutcome(found.row.id, outcome, 'agent', extra);
    } else {
      const table = found.engine === 'elevenlabs' ? calls : twilioOpenaiCalls;
      const metadata = { ...((found.row.metadata as Record<string, unknown> | null) || {}), ...extra, outcome, outcomeSource: 'agent', outcomeAt: new Date().toISOString() };
      const rows = await db.update(table).set({ metadata }).where(eq(table.id, found.row.id)).returning({ id: table.id });
      written = rows.length > 0;
    }
    if (!written) return sendError(req, res, 500, 'INTERNAL_ERROR', 'The outcome could not be saved.');
    sendData(req, res, { callId: found.row.id, outcome, outcomeSource: 'agent', note });
  })
);

/**
 * POST /v1/calls/:id/hangup - Hangup an active call
 */
router.post(
  '/:id/hangup',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    
    // This would integrate with the call service to end the call
    // For now, return a placeholder response
    const response: ApiResponse = {
      success: true,
      data: {
        callId: id,
        status: 'hangup_requested',
        message: 'Hangup request sent to call.',
      },
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.json(response);
  })
);

export default router;
