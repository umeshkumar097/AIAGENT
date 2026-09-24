/**
 * ============================================================
 * REST API Plugin - Webhooks Routes
 * Endpoints for managing webhook subscriptions
 * ============================================================
 */

import { Router, Response } from 'express';
import { apiAuthMiddleware, asyncHandler } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest, ApiResponse, WebhookResponse } from '../types.js';
import { db } from '../../../server/db.js';
import { webhookSubscriptions } from '../../../shared/schema.js';
import { eq, and, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { WEBHOOK_EVENT_TYPES } from '../../../server/services/webhook-test-service.js';

const router = Router();

const updateWebhookSchema = z.object({
  url: z.string().url('Invalid webhook URL').optional(),
  events: z.array(z.string()).min(1, 'At least one event is required').optional(),
  isActive: z.boolean().optional(),
  description: z.string().max(1000).optional(),
  name: z.string().trim().min(1).max(255).optional(),
});

/**
 * Subscriptions created here live in `webhook_subscriptions`, the same table the platform's
 * webhookDeliveryService reads for every event it fires — so the list below is exactly what can be
 * delivered: the platform event list (minus the manual `webhook.test`) plus `lead.upserted`.
 */
export const SUPPORTED_EVENTS: string[] = [
  ...WEBHOOK_EVENT_TYPES.filter(e => e !== 'webhook.test'),
  'lead.upserted',
];

const createWebhookSchema = z.object({
  url: z.string().url('Invalid webhook URL'),
  events: z.array(z.string()).min(1, 'At least one event is required'),
  secret: z.string().min(16).max(64).optional(),
  description: z.string().max(1000).optional(),
  name: z.string().trim().min(1).max(255).optional(),
});

/**
 * GET /v1/webhooks - List webhook subscriptions
 */
router.get(
  '/',
  apiAuthMiddleware('webhooks:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize as string, 10) || 50, 100);
    const offset = (page - 1) * pageSize;
    
    const [webhooks, countResult] = await Promise.all([
      db
        .select()
        .from(webhookSubscriptions)
        .where(eq(webhookSubscriptions.userId, userId))
        .orderBy(desc(webhookSubscriptions.createdAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(webhookSubscriptions)
        .where(eq(webhookSubscriptions.userId, userId)),
    ]);
    
    const totalItems = Number(countResult[0]?.count || 0);
    
    const response: ApiResponse = {
      success: true,
      data: webhooks.map(w => ({
        id: w.id,
        name: w.name,
        url: w.url,
        events: w.events,
        isActive: w.isActive,
        description: w.description,
        createdAt: w.createdAt,
      })),
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1,
        },
      },
    };
    
    res.json(response);
  })
);

/**
 * POST /v1/webhooks - Create webhook subscription
 */
router.post(
  '/',
  apiAuthMiddleware('webhooks:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    
    const parseResult = createWebhookSchema.safeParse(req.body);
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
    
    const { url, events, secret, description, name } = parseResult.data;

    // Validate events
    const invalidEvents = events.filter(e => !SUPPORTED_EVENTS.includes(e));
    if (invalidEvents.length > 0) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid event types',
          details: { invalidEvents, supportedEvents: SUPPORTED_EVENTS },
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(400).json(response);
    }

    // Generate secret if not provided
    const webhookSecret = secret || crypto.randomBytes(32).toString('hex');

    // `id` and `name` have no DB defaults (the app's webhook UI sets them too)
    const [webhook] = await db
      .insert(webhookSubscriptions)
      .values({
        id: nanoid(),
        userId,
        name: name || description?.substring(0, 255) || `API subscription ${new Date().toISOString().slice(0, 10)}`,
        url,
        events,
        secret: webhookSecret,
        description,
        isActive: true,
      })
      .returning();
    
    const responseData: WebhookResponse = {
      id: webhook.id,
      url: webhook.url,
      events: webhook.events as string[],
      secret: webhookSecret, // Only shown on creation
      isActive: webhook.isActive,
      createdAt: webhook.createdAt.toISOString(),
    };
    
    const response: ApiResponse<WebhookResponse> = {
      success: true,
      data: responseData,
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.status(201).json(response);
  })
);

/**
 * PUT /v1/webhooks/:id - Update webhook subscription
 */
router.put(
  '/:id',
  apiAuthMiddleware('webhooks:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    
    const [existing] = await db
      .select()
      .from(webhookSubscriptions)
      .where(and(eq(webhookSubscriptions.id, id), eq(webhookSubscriptions.userId, userId)))
      .limit(1);
    
    if (!existing) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Webhook not found.' },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(404).json(response);
    }
    
    const parseResult = updateWebhookSchema.safeParse(req.body);
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
    
    const { url, events, isActive, description, name } = parseResult.data;

    if (events) {
      const invalidEvents = events.filter((e: string) => !SUPPORTED_EVENTS.includes(e));
      if (invalidEvents.length > 0) {
        const response: ApiResponse = {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid event types',
            details: { invalidEvents, supportedEvents: SUPPORTED_EVENTS },
          },
          meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
        };
        return res.status(400).json(response);
      }
    }
    
    const [updated] = await db
      .update(webhookSubscriptions)
      .set({
        url: url ?? existing.url,
        events: events ?? existing.events,
        isActive: isActive ?? existing.isActive,
        description: description ?? existing.description,
        name: name ?? existing.name,
        updatedAt: new Date(),
      })
      .where(eq(webhookSubscriptions.id, id))
      .returning();
    
    const response: ApiResponse = {
      success: true,
      data: {
        id: updated.id,
        url: updated.url,
        events: updated.events,
        isActive: updated.isActive,
        description: updated.description,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.json(response);
  })
);

/**
 * DELETE /v1/webhooks/:id - Delete webhook subscription
 */
router.delete(
  '/:id',
  apiAuthMiddleware('webhooks:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    
    const result = await db
      .delete(webhookSubscriptions)
      .where(and(eq(webhookSubscriptions.id, id), eq(webhookSubscriptions.userId, userId)))
      .returning();
    
    if (result.length === 0) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Webhook not found.' },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse = {
      success: true,
      data: { deleted: true },
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.json(response);
  })
);

/**
 * POST /v1/webhooks/:id/test - Test webhook delivery
 */
router.post(
  '/:id/test',
  apiAuthMiddleware('webhooks:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    
    const [webhook] = await db
      .select()
      .from(webhookSubscriptions)
      .where(and(eq(webhookSubscriptions.id, id), eq(webhookSubscriptions.userId, userId)))
      .limit(1);
    
    if (!webhook) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Webhook not found.' },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      return res.status(404).json(response);
    }
    
    // Send test payload
    const testPayload = {
      event: 'test.ping',
      timestamp: new Date().toISOString(),
      data: {
        message: 'This is a test webhook delivery from Zonvo AI API.',
        webhookId: webhook.id,
      },
    };
    
    try {
      const signature = crypto
        .createHmac('sha256', webhook.secret)
        .update(JSON.stringify(testPayload))
        .digest('hex');
      
      const deliveryResponse = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Zonvo-Signature': signature,
          'X-Zonvo-Event': 'test.ping',
          // Legacy header names kept so existing receivers keep verifying
          'X-AgentLabs-Signature': signature,
          'X-AgentLabs-Event': 'test.ping',
        },
        body: JSON.stringify(testPayload),
        signal: AbortSignal.timeout(10000),
      });
      
      const response: ApiResponse = {
        success: true,
        data: {
          delivered: deliveryResponse.ok,
          statusCode: deliveryResponse.status,
          message: deliveryResponse.ok ? 'Test webhook delivered successfully.' : 'Webhook delivery failed.',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      
      res.json(response);
    } catch (error: any) {
      const isTimeout = error.name === 'TimeoutError' || error.name === 'AbortError';
      const response: ApiResponse = {
        success: false,
        error: {
          code: isTimeout ? 'TIMEOUT' : 'INTERNAL_ERROR',
          message: isTimeout
            ? 'Webhook delivery timed out after 10 seconds. The destination URL may be unresponsive.'
            : 'Failed to deliver test webhook. The destination URL may be unreachable.',
        },
        meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
      };
      res.status(isTimeout ? 504 : 500).json(response);
    }
  })
);

/**
 * GET /v1/webhooks/events - List supported events
 */
router.get(
  '/events',
  apiAuthMiddleware('webhooks:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: {
        events: SUPPORTED_EVENTS.map(event => ({
          name: event,
          description: getEventDescription(event),
        })),
      },
      meta: { requestId: req.requestId, timestamp: new Date().toISOString() },
    };
    
    res.json(response);
  })
);

function getEventDescription(event: string): string {
  const descriptions: Record<string, string> = {
    'campaign.started': 'A campaign started dialling',
    'campaign.paused': 'A campaign was paused',
    'campaign.resumed': 'A paused campaign resumed',
    'campaign.completed': 'A campaign finished all its contacts',
    'campaign.failed': 'A campaign stopped because of an error',
    'campaign.cancelled': 'A campaign was cancelled',
    'call.started': 'An outbound call was placed',
    'call.ringing': 'The callee\'s phone is ringing',
    'call.answered': 'The callee answered',
    'call.completed': 'An outbound call ended (includes transcript, summary, outcome, metadata.externalRef)',
    'call.failed': 'An outbound call could not be completed',
    'call.transferred': 'The agent transferred the call to a human',
    'call.no_answer': 'Nobody answered',
    'call.busy': 'The line was busy',
    'call.voicemail': 'An answering machine picked up',
    'inbound_call.received': 'An inbound call arrived on one of your numbers',
    'inbound_call.answered': 'An inbound call was answered by an agent',
    'inbound_call.completed': 'An inbound call ended',
    'inbound_call.missed': 'An inbound call was not answered',
    'flow.started': 'A flow agent started its flow',
    'flow.completed': 'A flow agent finished its flow',
    'flow.failed': 'A flow agent\'s flow failed',
    'appointment.booked': 'The agent booked an appointment during a call',
    'appointment.confirmed': 'An appointment was confirmed',
    'appointment.cancelled': 'An appointment was cancelled',
    'appointment.rescheduled': 'An appointment was moved to another date/time',
    'appointment.completed': 'An appointment was marked completed',
    'appointment.no_show': 'An appointment was marked as a no-show',
    'form.submitted': 'The agent collected a form during a call',
    'form.lead_created': 'A form submission created a lead',
    'callback.scheduled': 'A callback was scheduled (by the agent, the app or the API)',
    'lead.upserted': 'A CRM lead was created or updated (after a call, by the agent, or through the API)',
  };
  return descriptions[event] || 'No description available';
}

export default router;
