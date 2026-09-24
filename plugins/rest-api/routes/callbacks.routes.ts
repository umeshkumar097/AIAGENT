/**
 * ============================================================
 * REST API Plugin - Scheduled callbacks
 *   GET    /v1/callbacks?status=&page=&pageSize=   calls:read
 *   POST   /v1/callbacks                           calls:write  (201 created / 200 existing externalRef)
 *   POST   /v1/callbacks/bulk                      calls:write  ≤ 500 contacts
 *   DELETE /v1/callbacks/:id  |  ?externalRef=     calls:write  (pending → cancelled)
 * Validation/inserts: server/services/callback-service.ts (shared with the app and the cron).
 * ============================================================
 */

import { Router, Response } from 'express';
import { z } from 'zod';
import { apiAuthMiddleware, asyncHandler } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest } from '../types.js';
import {
  CALLBACK_STATUSES, CallbackError, MAX_EXTERNAL_REF, cancelCallback, createCallback, listCallbacks, resolveCallbackAgent,
  type CallbackSkipReason,
} from '../../../server/services/callback-service.js';
import { MAX_VARIABLES, VARIABLE_KEY_RE } from '../../../server/services/call-variables.js';
import { pageParams, paginationMeta, queryString, sendData, sendError, sendNotFound, sendValidationError } from './helpers.js';

const router = Router();

const variablesSchema = z.record(
  z.string().regex(VARIABLE_KEY_RE, 'Variable names: letters, digits, underscore (max 40)'),
  z.union([z.string().max(300), z.number(), z.boolean()]),
).refine(v => Object.keys(v).length <= MAX_VARIABLES, { message: `At most ${MAX_VARIABLES} variables` }).optional();

const createSchema = z.object({
  agentId: z.string().min(1),
  contactPhone: z.string().min(8).max(32),
  scheduledAt: z.string().min(1),
  contactName: z.string().max(120).optional(),
  reason: z.string().max(200).optional(),
  timeZone: z.string().max(64).optional(),
  variables: variablesSchema,
  externalRef: z.string().trim().min(1).max(MAX_EXTERNAL_REF).optional(),
});

const bulkSchema = z.object({
  agentId: z.string().min(1),
  timeZone: z.string().max(64).optional(),
  contacts: z.array(z.object({
    phone: z.string().min(1).max(32),
    name: z.string().max(120).optional(),
    scheduledAt: z.string().min(1),
    variables: variablesSchema,
    externalRef: z.string().trim().min(1).max(MAX_EXTERNAL_REF).optional(),
    reason: z.string().max(200).optional(),
  })).min(1).max(500),
});

interface BulkResult {
  created: Array<{ id: string; phone: string; externalRef: string | null; scheduledAt: Date }>;
  skipped: Array<{ phone: string; externalRef?: string | null; reason: CallbackSkipReason }>;
}

/** Bulk schedule: per-contact business failures land in `skipped`; anything else propagates (500). */
async function scheduleBulk(userId: string, body: z.infer<typeof bulkSchema>): Promise<BulkResult> {
  const agent = await resolveCallbackAgent(userId, body.agentId);
  const result: BulkResult = { created: [], skipped: [] };
  for (const c of body.contacts) {
    const externalRef = c.externalRef || null;
    try {
      const { callback, created } = await createCallback(userId, {
        agentId: agent.id, contactPhone: c.phone, contactName: c.name, scheduledAt: c.scheduledAt,
        variables: c.variables, externalRef, reason: c.reason, timeZone: body.timeZone,
      }, 'api', agent);
      if (created) result.created.push({ id: callback.id, phone: callback.contactPhone, externalRef: callback.externalRef, scheduledAt: callback.scheduledAt });
      else result.skipped.push({ phone: callback.contactPhone, externalRef, reason: 'duplicate' });
    } catch (e) {
      if (e instanceof CallbackError && e.reason) result.skipped.push({ phone: c.phone, externalRef, reason: e.reason });
      else throw e;
    }
  }
  return result;
}

function sendCallbackError(req: AuthenticatedApiRequest, res: Response, error: unknown): boolean {
  if (!(error instanceof CallbackError)) return false;
  sendError(req, res, error.status, error.code, error.message, error.reason ? { reason: error.reason } : undefined);
  return true;
}

/** GET /v1/callbacks - List (newest first) */
router.get(
  '/',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const status = queryString(req, 'status');
    if (status && !(CALLBACK_STATUSES as ReadonlyArray<string>).includes(status)) {
      return sendError(req, res, 400, 'VALIDATION_ERROR', `status must be one of: ${CALLBACK_STATUSES.join(', ')}`);
    }
    const { page, pageSize, offset } = pageParams(req, 50);
    const { rows, total } = await listCallbacks(req.apiAuth.userId, { status, limit: pageSize, offset });
    sendData(req, res, rows, 200, paginationMeta(page, pageSize, total));
  })
);

/** POST /v1/callbacks - Schedule one call (idempotent on externalRef) */
router.post(
  '/',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    try {
      const { callback, created } = await createCallback(req.apiAuth.userId, parsed.data, 'api');
      sendData(req, res, callback, created ? 201 : 200);
    } catch (error) {
      if (!sendCallbackError(req, res, error)) throw error;
    }
  })
);

/** POST /v1/callbacks/bulk - Schedule many; per-contact problems are reported in `skipped` */
router.post(
  '/bulk',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const parsed = bulkSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    try {
      sendData(req, res, await scheduleBulk(req.apiAuth.userId, parsed.data), 201);
    } catch (error) {
      if (!sendCallbackError(req, res, error)) throw error;
    }
  })
);

/** DELETE /v1/callbacks?externalRef= - Cancel a pending callback by your reference */
router.delete(
  '/',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const externalRef = queryString(req, 'externalRef');
    if (!externalRef) return sendError(req, res, 400, 'VALIDATION_ERROR', 'Query parameter "externalRef" is required.');
    const callback = await cancelCallback(req.apiAuth.userId, { externalRef });
    if (!callback) return sendNotFound(req, res, 'Pending callback');
    sendData(req, res, { cancelled: true, callback });
  })
);

/** DELETE /v1/callbacks/:id - Cancel a pending callback */
router.delete(
  '/:id',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const callback = await cancelCallback(req.apiAuth.userId, { id: req.params.id });
    if (!callback) return sendNotFound(req, res, 'Pending callback');
    sendData(req, res, { cancelled: true, callback });
  })
);

export default router;
