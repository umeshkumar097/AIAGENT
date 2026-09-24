/**
 * ============================================================
 * REST API Plugin - Do-not-call list
 *   GET    /v1/dnd?q=&page=&pageSize=     contacts:read
 *   GET    /v1/dnd/check?phone=            contacts:read
 *   POST   /v1/dnd                         contacts:write  { phone, note?, reason? }
 *   POST   /v1/dnd/import                  contacts:write  { phones: string[] ≤ 5000 }
 *   DELETE /v1/dnd?phone=  |  /v1/dnd/:id  contacts:write
 * Numbers are normalised (10 digits → +91). Rows are the caller's own.
 * ============================================================
 */

import { Router, Response } from 'express';
import { z } from 'zod';
import { apiAuthMiddleware, asyncHandler } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest } from '../types.js';
import {
  addDoNotCall, importDoNotCall, isDoNotCall, listDoNotCall, normalizePhone, removeDoNotCall, removeDoNotCallById,
} from '../../../server/services/dnd-service.js';
import type { DoNotCallNumber } from '../../../shared/schema.js';
import { pageParams, paginationMeta, queryString, sendData, sendError, sendNotFound, sendValidationError } from './helpers.js';

const router = Router();

const addSchema = z.object({
  phone: z.string().min(8).max(32),
  note: z.string().trim().max(500).optional(),
  reason: z.enum(['manual', 'complaint']).optional(),
});

const importSchema = z.object({
  phones: z.array(z.string().max(32)).min(1).max(5000),
});

function shape(row: DoNotCallNumber) {
  return { id: row.id, phone: row.phone, reason: row.reason, source: row.source, note: row.note, callId: row.callId, createdAt: row.createdAt };
}

/** GET /v1/dnd - List blocked numbers */
router.get(
  '/',
  apiAuthMiddleware('contacts:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { page, pageSize, offset } = pageParams(req, 50);
    const { numbers, total } = await listDoNotCall(req.apiAuth.userId, { q: queryString(req, 'q'), limit: pageSize, offset });
    sendData(req, res, numbers.map(shape), 200, paginationMeta(page, pageSize, total));
  })
);

/** GET /v1/dnd/check?phone= - Is this number blocked? */
router.get(
  '/check',
  apiAuthMiddleware('contacts:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const phone = normalizePhone(queryString(req, 'phone'));
    if (!phone) return sendError(req, res, 400, 'VALIDATION_ERROR', 'A valid phone number is required (query parameter "phone").');
    const blocked = await isDoNotCall(req.apiAuth.userId, phone);
    sendData(req, res, { phone, blocked });
  })
);

/** POST /v1/dnd - Add a number (idempotent: `added: false` when it was already listed) */
router.post(
  '/',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const parsed = addSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const phone = normalizePhone(parsed.data.phone);
    if (!phone) return sendError(req, res, 400, 'VALIDATION_ERROR', 'A valid phone number is required.');
    const { number, added } = await addDoNotCall({
      userId: req.apiAuth.userId, phone, reason: parsed.data.reason || 'manual', source: 'api', note: parsed.data.note || null,
    });
    sendData(req, res, { id: number.id, phone: number.phone, added }, 201);
  })
);

/** POST /v1/dnd/import - Bulk add; invalid and already-listed numbers count as skipped */
router.post(
  '/import',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const parsed = importSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const result = await importDoNotCall(req.apiAuth.userId, parsed.data.phones, 'api');
    sendData(req, res, result);
  })
);

/** DELETE /v1/dnd?phone= - Remove by number */
router.delete(
  '/',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const phone = normalizePhone(queryString(req, 'phone'));
    if (!phone) return sendError(req, res, 400, 'VALIDATION_ERROR', 'A valid phone number is required (query parameter "phone").');
    const removed = await removeDoNotCall(req.apiAuth.userId, phone);
    if (!removed) return sendNotFound(req, res, 'Do-not-call entry');
    sendData(req, res, { removed: true });
  })
);

/** DELETE /v1/dnd/:id - Remove by id */
router.delete(
  '/:id',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const removed = await removeDoNotCallById(req.apiAuth.userId, req.params.id);
    if (!removed) return sendNotFound(req, res, 'Do-not-call entry');
    sendData(req, res, { removed: true });
  })
);

export default router;
