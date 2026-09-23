/**
 * CRM team inbox — assignment + follow-up SLA on top of the `leads` table.
 * Mounted at /api/crm after crm-routes (hybridAuth + "crm" section permission), so only
 * paths crm-routes does not define live here.
 *
 *   GET  /inbox?filter=mine|unassigned|overdue|all&stage=&q=&limit=&offset=
 *        → { leads, total, counts: { all, mine, unassigned, overdue }, stages: [{ stage, count }] }
 *   GET  /inbox/assignees                 → [{ id, name, kind: 'owner'|'member' }]
 *   GET  /inbox/settings  PUT /inbox/settings { autoAssign?, slaHours?, defaultSlaHours? }
 *   POST /leads/:id/assign { userId|null }
 *   POST /leads/:id/note   { text }        (GET /leads/:id/notes is served by crm-routes)
 *   POST /leads/bulk-assign { leadIds, userId|null }
 *
 * Assignee ids: the owner's users.id or a team_members.id (FK dropped in migration 0017).
 * SLA clock = leads.updated_at; adding a note resets it, assigning does not.
 */
import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { and, eq, isNull, inArray, ilike, or, sql, type SQL } from 'drizzle-orm';
import { db } from '../db';
import { leads, leadNotes, users } from '@shared/schema';
import {
  crmInboxSettings, updateCrmInboxSettingsSchema, INBOX_FILTERS, SLA_CLOSED_STAGES,
  slaHoursForStage, evaluateSla, type CrmInboxSettings, type InboxFilter,
} from '@shared/schema-crm-inbox';
import { CRMStorage } from '../storage/crm-storage';
import { getTeamService } from '../plugins/team-management-adapter';

interface AuthRequest extends Request {
  userId?: string;
  isTeamMember?: boolean;
  teamMember?: { memberId: string; teamId: string; userId: string; roleId: string; permissions: unknown };
}
export interface InboxAssignee { id: string; name: string; kind: 'owner' | 'member' }

const router = Router();
const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
/** Who "mine" means: the team member's own id, or the owner's user id. */
const actorId = (req: AuthRequest) => (req.isTeamMember && req.teamMember ? req.teamMember.memberId : req.userId!);

// ---------------------------------------------------------------- settings + assignees

export async function getInboxSettings(userId: string): Promise<CrmInboxSettings> {
  const [existing] = await db.select().from(crmInboxSettings).where(eq(crmInboxSettings.userId, userId));
  if (existing) return existing;
  const [created] = await db.insert(crmInboxSettings).values({ userId }).onConflictDoNothing().returning();
  if (created) return created;
  const [row] = await db.select().from(crmInboxSettings).where(eq(crmInboxSettings.userId, userId));
  return row;
}

/** Account owner + active team members (from the team-management plugin, when installed). */
export async function listAssignees(ownerUserId: string): Promise<InboxAssignee[]> {
  const out: InboxAssignee[] = [];
  const [owner] = await db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.id, ownerUserId));
  if (owner) out.push({ id: owner.id, name: owner.name || owner.email, kind: 'owner' });
  try {
    const TeamService = getTeamService();
    const team = TeamService ? await TeamService.getTeamByUserId(ownerUserId) : null;
    if (team) {
      const members: Array<{ id: string; email: string; firstName?: string | null; lastName?: string | null; status: string }> =
        await TeamService.getMembersByTeam(team.id);
      for (const m of members) {
        if (m.status !== 'active') continue;
        out.push({ id: m.id, name: `${m.firstName || ''} ${m.lastName || ''}`.trim() || m.email, kind: 'member' });
      }
    }
  } catch (err) {
    console.error('[CRM Inbox] Could not load team members:', err);
  }
  return out;
}

/**
 * Round-robin auto-assign for a freshly created lead. No-op unless the owner's inbox setting
 * autoAssign === 'round_robin' or the lead is already assigned. Rotates over active team members
 * (falls back to the owner when the team is empty). Returns the assignee id or null.
 *
 * Intended call site (owned by another agent, not wired yet):
 *   server/engines/crm/lead-processor.service.ts — right after the lead row is inserted:
 *   `await assignLeadRoundRobin(lead.userId, lead.id)`.
 */
export async function assignLeadRoundRobin(userId: string, leadId: string): Promise<string | null> {
  const settings = await getInboxSettings(userId);
  if (settings.autoAssign !== 'round_robin') return null;
  const assignees = await listAssignees(userId);
  const pool = assignees.filter(a => a.kind === 'member');
  const candidates = pool.length ? pool : assignees;
  if (!candidates.length) return null;
  const last = candidates.findIndex(a => a.id === settings.roundRobinCursor);
  const next = candidates[(last + 1) % candidates.length];
  const [updated] = await db.update(leads).set({ assignedUserId: next.id })
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId), isNull(leads.assignedUserId))).returning({ id: leads.id });
  if (!updated) return null;
  await db.update(crmInboxSettings).set({ roundRobinCursor: next.id, updatedAt: new Date() }).where(eq(crmInboxSettings.userId, userId));
  return next.id;
}

router.get('/inbox/assignees', requireAuth, async (req: AuthRequest, res: Response) => {
  try { res.json(await listAssignees(req.userId!)); }
  catch (err) { console.error('[CRM Inbox] assignees:', err); res.status(500).json({ error: 'Failed to load assignees' }); }
});

router.get('/inbox/settings', requireAuth, async (req: AuthRequest, res: Response) => {
  try { res.json(publicSettings(await getInboxSettings(req.userId!))); }
  catch (err) { console.error('[CRM Inbox] settings:', err); res.status(500).json({ error: 'Failed to load settings' }); }
});

router.put('/inbox/settings', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const patch = updateCrmInboxSettingsSchema.parse(req.body ?? {});
    await getInboxSettings(req.userId!);
    const [row] = await db.update(crmInboxSettings).set({ ...patch, updatedAt: new Date() })
      .where(eq(crmInboxSettings.userId, req.userId!)).returning();
    res.json(publicSettings(row));
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid settings', details: err.errors });
    console.error('[CRM Inbox] save settings:', err); res.status(500).json({ error: 'Failed to save settings' });
  }
});

function publicSettings(s: CrmInboxSettings) {
  return { autoAssign: s.autoAssign, slaHours: s.slaHours, defaultSlaHours: s.defaultSlaHours, closedStages: SLA_CLOSED_STAGES };
}

// ---------------------------------------------------------------- inbox list

/** `CASE leads.stage WHEN 'new' THEN 24 ... ELSE default END` hours, 0 for closed stages. */
function slaHoursSql(settings: CrmInboxSettings): SQL<number> {
  const parts: SQL[] = [sql`CASE ${leads.stage}`];
  for (const stage of SLA_CLOSED_STAGES) parts.push(sql`WHEN ${stage} THEN 0`);
  for (const [stage, hours] of Object.entries(settings.slaHours || {})) parts.push(sql`WHEN ${stage} THEN ${Number(hours) || 0}`);
  parts.push(sql`ELSE ${settings.defaultSlaHours} END`);
  return sql.join(parts, sql` `) as SQL<number>;
}
const overdueSql = (settings: CrmInboxSettings): SQL =>
  sql`(${slaHoursSql(settings)}) > 0 AND ${leads.updatedAt} < now() - ((${slaHoursSql(settings)}) * interval '1 hour')`;

const inboxQuerySchema = z.object({
  filter: z.enum(INBOX_FILTERS).default('all'),
  stage: z.string().max(64).optional(),
  q: z.string().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});

router.get('/inbox', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const query = inboxQuerySchema.parse(req.query);
    const userId = req.userId!;
    const [settings, assignees] = await Promise.all([getInboxSettings(userId), listAssignees(userId)]);
    const me = actorId(req);

    const base: SQL[] = [eq(leads.userId, userId)];
    if (query.stage && query.stage !== 'all') base.push(eq(leads.stage, query.stage));
    if (query.q?.trim()) {
      const pattern = `%${query.q.trim().replace(/[\\%_]/g, ch => `\\${ch}`)}%`;
      base.push(or(ilike(leads.firstName, pattern), ilike(leads.lastName, pattern), ilike(leads.phone, pattern),
        ilike(leads.email, pattern), ilike(leads.company, pattern))!);
    }
    const byFilter: Record<InboxFilter, SQL | undefined> = {
      mine: eq(leads.assignedUserId, me), unassigned: isNull(leads.assignedUserId), overdue: overdueSql(settings), all: undefined,
    };
    const where = and(...base, byFilter[query.filter]);
    const lastNoteAt = sql<Date | null>`(SELECT MAX(${leadNotes.createdAt}) FROM ${leadNotes} WHERE ${leadNotes.leadId} = ${leads.id})`;

    const [rows, [counts], stages] = await Promise.all([
      db.select({
        id: leads.id, firstName: leads.firstName, lastName: leads.lastName, phone: leads.phone, email: leads.email,
        company: leads.company, stage: leads.stage, leadScore: leads.leadScore, aiNextAction: leads.aiNextAction,
        hasCallback: leads.hasCallback, callbackScheduled: leads.callbackScheduled, assignedUserId: leads.assignedUserId,
        lastCallAt: leads.lastCallAt, totalCalls: leads.totalCalls, createdAt: leads.createdAt, updatedAt: leads.updatedAt,
        lastNoteAt, isOverdue: sql<boolean>`(${overdueSql(settings)})`,
      }).from(leads).where(where).orderBy(sql`(${overdueSql(settings)}) DESC`, leads.updatedAt).limit(query.limit).offset(query.offset),
      db.select({
        total: sql<number>`count(*)::int`,
        mine: sql<number>`count(*) FILTER (WHERE ${eq(leads.assignedUserId, me)})::int`,
        unassigned: sql<number>`count(*) FILTER (WHERE ${leads.assignedUserId} IS NULL)::int`,
        overdue: sql<number>`count(*) FILTER (WHERE ${overdueSql(settings)})::int`,
        filtered: sql<number>`count(*) FILTER (WHERE ${byFilter[query.filter] ?? sql`true`})::int`,
      }).from(leads).where(and(...base)),
      db.select({ stage: leads.stage, count: sql<number>`count(*)::int` }).from(leads).where(eq(leads.userId, userId)).groupBy(leads.stage).orderBy(leads.stage),
    ]);

    const names = new Map(assignees.map(a => [a.id, a.name]));
    const out = rows.map(r => {
      const hours = slaHoursForStage(settings, r.stage);
      const sla = evaluateSla(r.updatedAt, hours);
      const contact = [r.lastCallAt, r.lastNoteAt].filter(Boolean).map(d => new Date(d as Date).getTime());
      return {
        ...r, name: `${r.firstName || ''} ${r.lastName || ''}`.trim() || r.phone,
        assigneeName: r.assignedUserId ? names.get(r.assignedUserId) ?? null : null,
        lastContactAt: contact.length ? new Date(Math.max(...contact)).toISOString() : null,
        slaHours: hours, slaDueAt: sla.dueAt, slaStatus: r.isOverdue ? 'overdue' : sla.status,
      };
    });
    res.json({
      leads: out, total: counts.filtered, stages,
      counts: { all: counts.total, mine: counts.mine, unassigned: counts.unassigned, overdue: counts.overdue },
    });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid query', details: err.errors });
    console.error('[CRM Inbox] list:', err); res.status(500).json({ error: 'Failed to load inbox' });
  }
});

// ---------------------------------------------------------------- assignment + notes

async function logTeam(req: AuthRequest, action: string, targetId: string | undefined, metadata: Record<string, unknown>) {
  if (!req.isTeamMember || !req.teamMember) return;
  try { await getTeamService()?.logActivity(req.teamMember.teamId, req.teamMember.memberId, action, 'lead', targetId, metadata, req.ip); }
  catch (err) { console.error('[CRM Inbox] team activity log failed:', err); }
}

/** Validates the assignee against the live list; returns its display name, null for "unassign", or undefined if unknown. */
async function resolveAssignee(ownerUserId: string, userId: unknown): Promise<string | null | undefined> {
  if (userId === null) return null;
  if (typeof userId !== 'string' || !userId) return undefined;
  return (await listAssignees(ownerUserId)).find(a => a.id === userId)?.name;
}

router.post('/leads/:id/assign', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const assigneeName = await resolveAssignee(req.userId!, req.body?.userId ?? null);
    if (assigneeName === undefined) return res.status(400).json({ error: 'userId must be an assignee id or null' });
    const assignedUserId = assigneeName === null ? null : (req.body.userId as string);
    const [lead] = await db.update(leads).set({ assignedUserId })
      .where(and(eq(leads.id, req.params.id), eq(leads.userId, req.userId!))).returning();
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    await CRMStorage.createActivity({
      leadId: lead.id, userId: req.userId!, activityType: 'assigned',
      title: assigneeName ? `Assigned to ${assigneeName}` : 'Unassigned', metadata: {},
    });
    await logTeam(req, 'assign_lead', lead.id, { assignedUserId });
    res.json({ ...lead, assigneeName });
  } catch (err) { console.error('[CRM Inbox] assign:', err); res.status(500).json({ error: 'Failed to assign lead' }); }
});

const bulkAssignSchema = z.object({ leadIds: z.array(z.string().min(1)).min(1).max(500), userId: z.string().min(1).nullable() });

router.post('/leads/bulk-assign', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { leadIds, userId } = bulkAssignSchema.parse(req.body);
    const assigneeName = await resolveAssignee(req.userId!, userId);
    if (assigneeName === undefined) return res.status(400).json({ error: 'userId must be an assignee id or null' });
    const updated = await db.update(leads).set({ assignedUserId: userId })
      .where(and(inArray(leads.id, leadIds), eq(leads.userId, req.userId!))).returning({ id: leads.id });
    await logTeam(req, 'bulk_assign_leads', undefined, { count: updated.length, assignedUserId: userId });
    res.json({ updated: updated.length, assigneeName });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid payload', details: err.errors });
    console.error('[CRM Inbox] bulk assign:', err); res.status(500).json({ error: 'Failed to assign leads' });
  }
});

const noteSchema = z.object({ text: z.string().trim().min(1).max(4000) });

router.post('/leads/:id/note', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { text } = noteSchema.parse(req.body);
    const lead = await CRMStorage.getLeadById(req.params.id, req.userId!);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    const note = await CRMStorage.createNote({ leadId: lead.id, userId: req.userId!, content: text });
    await CRMStorage.logNoteAdded(lead.id, req.userId!, note.id, text);
    // A note counts as a follow-up: restart the SLA clock.
    await db.update(leads).set({ updatedAt: new Date() }).where(eq(leads.id, lead.id));
    await logTeam(req, 'add_note', lead.id, { noteId: note.id, contentPreview: text.slice(0, 100) });
    res.status(201).json(note);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'text is required (max 4000 chars)', details: err.errors });
    console.error('[CRM Inbox] note:', err); res.status(500).json({ error: 'Failed to add note' });
  }
});

export default router;
