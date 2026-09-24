/**
 * ============================================================
 * REST API Plugin - CRM leads (pipeline view of the `leads` table)
 *   GET   /v1/leads?stage=&q=&since=&assigned=&page=&pageSize=   contacts:read
 *   GET   /v1/leads/:id                                          contacts:read   (+ notes)
 *   PATCH /v1/leads/:id                                          contacts:write  { stage?, tags?, customFields?, assignedUserId?, email?, company? }
 *   POST  /v1/leads/:id/notes                                    contacts:write  { text ≤ 4000 }
 * Every change is pushed to connected integrations + `lead.upserted` webhooks (integrationHub.onLeadUpserted).
 * ============================================================
 */

import { Router, Response } from 'express';
import { and, desc, eq, gte, ilike, isNull, or, sql, type SQL } from 'drizzle-orm';
import { z } from 'zod';
import { apiAuthMiddleware, asyncHandler } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest } from '../types.js';
import { db } from '../../../server/db.js';
import { leadNotes, leads, type Lead, type LeadNote } from '../../../shared/schema.js';
import { CRMStorage, DEFAULT_STAGES } from '../../../server/storage/crm-storage.js';
import { listAssignees } from '../../../server/routes/crm-inbox-routes.js';
import { integrationHub } from '../../../server/integrations/hub.js';
import { pageParams, paginationMeta, queryDate, queryString, sendData, sendError, sendNotFound, sendValidationError } from './helpers.js';

const router = Router();

const patchSchema = z.object({
  stage: z.string().trim().min(1).max(60).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(50).optional(),
  customFields: z.record(z.unknown()).refine(v => Object.keys(v).length <= 100, { message: 'At most 100 custom fields' }).optional(),
  assignedUserId: z.string().min(1).nullable().optional(),
  email: z.string().trim().email().max(255).or(z.literal('')).nullable().optional(),
  company: z.string().trim().max(200).nullable().optional(),
}).strict();

const noteSchema = z.object({ text: z.string().trim().min(1).max(4000) });

function shapeLead(l: Lead) {
  return {
    id: l.id, firstName: l.firstName, lastName: l.lastName, phone: l.phone, email: l.email, company: l.company,
    stage: l.stage, leadScore: l.leadScore, aiCategory: l.aiCategory, aiSummary: l.aiSummary, aiNextAction: l.aiNextAction,
    sentiment: l.sentiment, hasAppointment: l.hasAppointment, hasCallback: l.hasCallback, tags: l.tags ?? [],
    customFields: l.customFields ?? {}, assignedUserId: l.assignedUserId, sourceType: l.sourceType,
    totalCalls: l.totalCalls, lastCallAt: l.lastCallAt, callId: l.callId ?? l.plivoCallId ?? l.twilioOpenaiCallId ?? null,
    createdAt: l.createdAt, updatedAt: l.updatedAt,
  };
}

const shapeNote = (n: LeadNote) => ({ id: n.id, text: n.content, createdAt: n.createdAt });

/** Pipeline stages the user actually has: `{ key → { id, name } }` (defaults + custom, keyed like the CRM kanban). */
async function stageMap(userId: string): Promise<Map<string, { id: string; name: string }>> {
  const rows = await CRMStorage.ensureDefaultStages(userId);
  const map = new Map<string, { id: string; name: string }>();
  for (const s of rows) {
    const key = DEFAULT_STAGES.find(d => d.name === s.name)?.stage || s.name.toLowerCase().replace(/\s+/g, '_');
    map.set(key, { id: s.id, name: s.name });
  }
  return map;
}

async function ownLead(userId: string, id: string): Promise<Lead | undefined> {
  const [lead] = await db.select().from(leads).where(and(eq(leads.id, id), eq(leads.userId, userId))).limit(1);
  return lead;
}

/** GET /v1/leads - List (most recently updated first) */
router.get(
  '/',
  apiAuthMiddleware('contacts:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { page, pageSize, offset } = pageParams(req, 50);
    const conditions: SQL[] = [eq(leads.userId, userId)];
    const stage = queryString(req, 'stage');
    if (stage) conditions.push(eq(leads.stage, stage));
    const since = queryDate(req, 'since');
    if (since) conditions.push(gte(leads.updatedAt, since));
    const assigned = queryString(req, 'assigned');
    if (assigned === 'none') conditions.push(isNull(leads.assignedUserId));
    else if (assigned) conditions.push(eq(leads.assignedUserId, assigned));
    const q = queryString(req, 'q').replace(/[%_]/g, '');
    if (q) {
      const like = `%${q}%`;
      conditions.push(or(ilike(leads.phone, like), ilike(leads.firstName, like), ilike(leads.lastName, like), ilike(leads.email, like), ilike(leads.company, like))!);
    }
    const where = and(...conditions);
    const [rows, countRows] = await Promise.all([
      db.select().from(leads).where(where).orderBy(desc(leads.updatedAt)).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(leads).where(where),
    ]);
    sendData(req, res, rows.map(shapeLead), 200, paginationMeta(page, pageSize, Number(countRows[0]?.count || 0)));
  })
);

/** GET /v1/leads/:id - Detail with notes (newest first) */
router.get(
  '/:id',
  apiAuthMiddleware('contacts:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const lead = await ownLead(req.apiAuth.userId, req.params.id);
    if (!lead) return sendNotFound(req, res, 'Lead');
    const notes = await db.select().from(leadNotes).where(eq(leadNotes.leadId, lead.id)).orderBy(desc(leadNotes.createdAt)).limit(200);
    sendData(req, res, { ...shapeLead(lead), notes: notes.map(shapeNote) });
  })
);

/** PATCH /v1/leads/:id - Update pipeline fields (customFields are shallow-merged) */
router.patch(
  '/:id',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const existing = await ownLead(userId, req.params.id);
    if (!existing) return sendNotFound(req, res, 'Lead');
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const body = parsed.data;
    const patch: Partial<typeof leads.$inferInsert> = { updatedAt: new Date() };

    let stageChange: { to: { id: string; name: string }; toKey: string } | null = null;
    if (body.stage !== undefined && body.stage !== existing.stage) {
      const stages = await stageMap(userId);
      const target = stages.get(body.stage);
      if (!target) {
        return sendError(req, res, 400, 'VALIDATION_ERROR', `Unknown stage "${body.stage}"`, { allowedStages: Array.from(stages.keys()) });
      }
      patch.stage = body.stage;
      patch.stageId = target.id;
      stageChange = { to: target, toKey: body.stage };
    }
    if (body.assignedUserId !== undefined) {
      if (body.assignedUserId !== null && !(await listAssignees(userId)).some(a => a.id === body.assignedUserId)) {
        return sendError(req, res, 400, 'VALIDATION_ERROR', 'assignedUserId must be one of your assignees (owner or team member) or null');
      }
      patch.assignedUserId = body.assignedUserId;
    }
    if (body.tags !== undefined) patch.tags = Array.from(new Set(body.tags));
    if (body.customFields !== undefined) patch.customFields = { ...(existing.customFields || {}), ...body.customFields };
    if (body.email !== undefined) patch.email = body.email || null;
    if (body.company !== undefined) patch.company = body.company || null;

    const [updated] = await db.update(leads).set(patch).where(eq(leads.id, existing.id)).returning();
    if (stageChange) {
      const stages = await stageMap(userId);
      const fromName = Array.from(stages.entries()).find(([key]) => key === existing.stage)?.[1].name || existing.stage;
      await CRMStorage.logStageChange(existing.id, userId, existing.stage, stageChange.toKey, fromName, stageChange.to.name);
    }
    void integrationHub.onLeadUpserted(userId, updated, { created: false, callData: null });
    sendData(req, res, shapeLead(updated));
  })
);

/** POST /v1/leads/:id/notes - Add a note (restarts the CRM inbox SLA clock) */
router.post(
  '/:id/notes',
  apiAuthMiddleware('contacts:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const lead = await ownLead(userId, req.params.id);
    if (!lead) return sendNotFound(req, res, 'Lead');
    const parsed = noteSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const note = await CRMStorage.createNote({ leadId: lead.id, userId, content: parsed.data.text });
    await CRMStorage.logNoteAdded(lead.id, userId, note.id, parsed.data.text);
    const [updated] = await db.update(leads).set({ updatedAt: new Date() }).where(eq(leads.id, lead.id)).returning();
    void integrationHub.onLeadUpserted(userId, updated || lead, { created: false, callData: null });
    sendData(req, res, shapeNote(note), 201);
  })
);

export default router;
