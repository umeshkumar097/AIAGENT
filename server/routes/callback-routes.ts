/**
 * Scheduled callbacks (own rows only). Mounted at /api/callbacks behind authenticateToken.
 *   GET    /            ?status=&limit=   newest first
 *   POST   /            { contactPhone, contactName?, agentId, scheduledAt (ISO), reason? }
 *   DELETE /:id         pending → cancelled
 */
import { Router, type Response } from 'express';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { agents, scheduledCallbacks, type ScheduledCallback } from '@shared/schema';
import type { AuthRequest } from '../middleware/auth';
import { normalizePhone, isValidTimeZone, DEFAULT_TIME_ZONE } from '../services/call-actions/util';
import { readActionsConfig } from '../services/call-actions';

const STATUSES = new Set(['pending', 'calling', 'completed', 'failed', 'cancelled']);
const MAX_DAYS_AHEAD = 60;

export const callbackRouter = Router();

function shape(row: ScheduledCallback, agentName?: string | null) {
  return {
    id: row.id,
    contactName: row.contactName,
    contactPhone: row.contactPhone,
    reason: row.reason,
    scheduledAt: row.scheduledAt,
    timeZone: row.timeZone,
    status: row.status,
    attempts: row.attempts,
    lastError: row.lastError,
    agentId: row.agentId,
    agentName: agentName ?? null,
    resultCallId: row.resultCallId,
    createdAt: row.createdAt,
  };
}

callbackRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : '';
    const limitRaw = Number(req.query.limit);
    const limit = Number.isFinite(limitRaw) ? Math.min(200, Math.max(1, Math.floor(limitRaw))) : 50;
    const where = status && STATUSES.has(status)
      ? and(eq(scheduledCallbacks.userId, req.userId!), eq(scheduledCallbacks.status, status))
      : eq(scheduledCallbacks.userId, req.userId!);
    const rows = await db.select({ row: scheduledCallbacks, agentName: agents.name })
      .from(scheduledCallbacks)
      .leftJoin(agents, eq(agents.id, scheduledCallbacks.agentId))
      .where(where)
      .orderBy(desc(scheduledCallbacks.createdAt))
      .limit(limit);
    res.json({ callbacks: rows.map(r => shape(r.row, r.agentName)) });
  } catch (error: any) {
    console.error('List callbacks error:', error.message);
    res.status(500).json({ error: 'Failed to load callbacks' });
  }
});

callbackRouter.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const body = (req.body || {}) as Record<string, unknown>;
    const contactPhone = normalizePhone(String(body.contactPhone ?? ''));
    if (!contactPhone) return res.status(400).json({ error: 'A valid phone number with country code is required' });
    const agentId = typeof body.agentId === 'string' ? body.agentId.trim() : '';
    if (!agentId) return res.status(400).json({ error: 'agentId is required' });
    const scheduledAt = new Date(String(body.scheduledAt ?? ''));
    if (Number.isNaN(scheduledAt.getTime())) return res.status(400).json({ error: 'scheduledAt must be an ISO date-time' });
    if (scheduledAt.getTime() <= Date.now()) return res.status(400).json({ error: 'scheduledAt must be in the future' });
    if (scheduledAt.getTime() > Date.now() + MAX_DAYS_AHEAD * 86_400_000) return res.status(400).json({ error: `scheduledAt must be within ${MAX_DAYS_AHEAD} days` });
    const contactName = typeof body.contactName === 'string' ? body.contactName.trim().substring(0, 120) || null : null;
    const reason = typeof body.reason === 'string' ? body.reason.trim().substring(0, 500) || null : null;

    const [agent] = await db.select({ id: agents.id, config: agents.config }).from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.userId, req.userId!))).limit(1);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    const tz = readActionsConfig(agent.config).appointments?.timeZone;
    const timeZone = typeof body.timeZone === 'string' && isValidTimeZone(body.timeZone) ? body.timeZone : (tz && isValidTimeZone(tz) ? tz : DEFAULT_TIME_ZONE);

    const [row] = await db.insert(scheduledCallbacks).values({
      userId: req.userId!, agentId: agent.id, contactName, contactPhone, reason, scheduledAt, timeZone, status: 'pending',
    }).returning();
    res.status(201).json({ callback: shape(row) });
  } catch (error: any) {
    console.error('Create callback error:', error.message);
    res.status(500).json({ error: 'Failed to schedule the callback' });
  }
});

callbackRouter.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const [row] = await db.update(scheduledCallbacks)
      .set({ status: 'cancelled', updatedAt: new Date() })
      .where(and(eq(scheduledCallbacks.id, req.params.id), eq(scheduledCallbacks.userId, req.userId!), eq(scheduledCallbacks.status, 'pending')))
      .returning();
    if (!row) return res.status(404).json({ error: 'Callback not found or no longer pending' });
    res.json({ success: true, callback: shape(row) });
  } catch (error: any) {
    console.error('Cancel callback error:', error.message);
    res.status(500).json({ error: 'Failed to cancel the callback' });
  }
});
