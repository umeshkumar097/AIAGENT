/**
 * Scheduled callbacks (own rows only). Mounted at /api/callbacks behind authenticateToken.
 *   GET    /            ?status=&limit=   newest first
 *   POST   /            { contactPhone, contactName?, agentId, scheduledAt (ISO), reason?, timeZone? }
 *   DELETE /:id         pending → cancelled
 * Validation and inserts live in services/callback-service.ts (shared with the public API and the cron).
 */
import { Router, type Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { CallbackError, cancelCallback, createCallback, listCallbacks } from '../services/callback-service';

export const callbackRouter = Router();

callbackRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : '';
    const limitRaw = Number(req.query.limit);
    const limit = Number.isFinite(limitRaw) ? Math.min(200, Math.max(1, Math.floor(limitRaw))) : 50;
    const { rows } = await listCallbacks(req.userId!, { status, limit });
    res.json({ callbacks: rows });
  } catch (error: any) {
    console.error('List callbacks error:', error.message);
    res.status(500).json({ error: 'Failed to load callbacks' });
  }
});

callbackRouter.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const body = (req.body || {}) as Record<string, unknown>;
    const { callback } = await createCallback(req.userId!, {
      agentId: typeof body.agentId === 'string' ? body.agentId : '',
      contactPhone: String(body.contactPhone ?? ''),
      scheduledAt: String(body.scheduledAt ?? ''),
      contactName: typeof body.contactName === 'string' ? body.contactName : null,
      reason: typeof body.reason === 'string' ? body.reason : null,
      timeZone: typeof body.timeZone === 'string' ? body.timeZone : null,
    }, 'manual');
    res.status(201).json({ callback });
  } catch (error: any) {
    if (error instanceof CallbackError) return res.status(error.status).json({ error: error.message, code: error.code });
    console.error('Create callback error:', error.message);
    res.status(500).json({ error: 'Failed to schedule the callback' });
  }
});

callbackRouter.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const callback = await cancelCallback(req.userId!, { id: req.params.id });
    if (!callback) return res.status(404).json({ error: 'Callback not found or no longer pending' });
    res.json({ success: true, callback });
  } catch (error: any) {
    console.error('Cancel callback error:', error.message);
    res.status(500).json({ error: 'Failed to cancel the callback' });
  }
});
