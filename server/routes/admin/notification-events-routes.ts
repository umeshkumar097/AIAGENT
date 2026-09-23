'use strict';
/**
 * Admin routes for dispatcher events: per-event email toggles, delivery log and test sends.
 * Mounted under /api/admin/notifications (after checkAdminOrTeamMember).
 * Permission resource: communications.notifications (seeded in seed-all.ts).
 */
import { Router, Response } from 'express';
import { and, desc, eq, gte, ilike, or, sql } from 'drizzle-orm';
import { db } from '../../db';
import { notificationEvents, users } from '@shared/schema';
import { storage } from '../../storage';
import { AdminRequest, requireAdminPermission } from '../../middleware/admin-auth';
import { ALWAYS_ON_EVENTS, dispatchEvent, emailToggleKey, isEventEmailEnabled, type EventKey } from '../../services/event-dispatcher';
import { ALL_EVENT_KEYS, EVENT_TEMPLATE_DEFAULTS, isEventKey } from '../../services/event-templates';

const LOG_STATUSES = new Set(['sent', 'failed', 'skipped']);
const LOG_CHANNELS = new Set(['email', 'in_app']);

async function emailStats(): Promise<Map<string, { lastSentAt: Date | null; sent24h: number; failed24h: number }>> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const rows = await db
    .select({
      eventKey: notificationEvents.eventKey,
      lastSentAt: sql<Date | null>`max(case when ${notificationEvents.status} = 'sent' then ${notificationEvents.createdAt} end)`,
      sent24h: sql<number>`count(*) filter (where ${notificationEvents.status} = 'sent' and ${notificationEvents.createdAt} >= ${since})`,
      failed24h: sql<number>`count(*) filter (where ${notificationEvents.status} = 'failed' and ${notificationEvents.createdAt} >= ${since})`,
    })
    .from(notificationEvents)
    .where(eq(notificationEvents.channel, 'email'))
    .groupBy(notificationEvents.eventKey);
  const map = new Map<string, { lastSentAt: Date | null; sent24h: number; failed24h: number }>();
  for (const r of rows) {
    map.set(r.eventKey, { lastSentAt: r.lastSentAt ? new Date(r.lastSentAt) : null, sent24h: Number(r.sent24h) || 0, failed24h: Number(r.failed24h) || 0 });
  }
  return map;
}

export function registerNotificationEventsRoutes(router: Router) {
  // List every event with toggle state, template presence and 24h delivery stats
  router.get('/events', requireAdminPermission('communications', 'notifications', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      const [templates, stats] = await Promise.all([storage.getEmailTemplates(), emailStats()]);
      const byType = new Map(templates.map(t => [t.templateType, t]));
      const events = await Promise.all(ALL_EVENT_KEYS.map(async (key) => {
        const def = EVENT_TEMPLATE_DEFAULTS[key];
        const tpl = byType.get(key);
        const s = stats.get(key);
        return {
          key,
          label: def.name,
          category: def.category,
          emailEnabled: await isEventEmailEnabled(key),
          alwaysOn: ALWAYS_ON_EVENTS.has(key),
          inApp: Boolean(def.inApp),
          hasTemplate: Boolean(tpl && tpl.isActive),
          templateId: tpl?.id ?? null,
          templateType: key,
          variables: tpl?.variables ?? def.variables,
          lastSentAt: s?.lastSentAt ? s.lastSentAt.toISOString() : null,
          sent24h: s?.sent24h ?? 0,
          failed24h: s?.failed24h ?? 0,
        };
      }));
      res.json({ events });
    } catch (error) {
      console.error('[Admin/Notifications] list events failed:', error);
      res.status(500).json({ error: 'Failed to load notification events' });
    }
  });

  // Toggle a single event's email channel
  router.put('/events/:eventKey', requireAdminPermission('communications', 'notifications', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const key = req.params.eventKey;
      if (!isEventKey(key)) return res.status(400).json({ error: 'Unknown event key' });
      if (ALWAYS_ON_EVENTS.has(key)) return res.status(400).json({ error: 'This event cannot be disabled' });
      const enabled = req.body?.enabled;
      if (typeof enabled !== 'boolean') return res.status(400).json({ error: 'enabled (boolean) is required' });
      await storage.updateGlobalSetting(emailToggleKey(key), enabled);
      res.json({ success: true, key, emailEnabled: enabled });
    } catch (error) {
      console.error('[Admin/Notifications] toggle failed:', error);
      res.status(500).json({ error: 'Failed to update notification event' });
    }
  });

  // Bulk toggle: { [eventKey]: boolean }
  router.put('/events', requireAdminPermission('communications', 'notifications', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Body must be an object of { eventKey: boolean }' });
      const updated: string[] = [];
      const skipped: string[] = [];
      for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
        if (!isEventKey(key) || ALWAYS_ON_EVENTS.has(key) || typeof value !== 'boolean') { skipped.push(key); continue; }
        await storage.updateGlobalSetting(emailToggleKey(key), value);
        updated.push(key);
      }
      res.json({ success: true, updated, skipped });
    } catch (error) {
      console.error('[Admin/Notifications] bulk toggle failed:', error);
      res.status(500).json({ error: 'Failed to update notification events' });
    }
  });

  // Delivery log (newest first, 50/page)
  router.get('/log', requireAdminPermission('communications', 'notifications', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit ?? '50'), 10) || 50));
      const eventKey = typeof req.query.eventKey === 'string' ? req.query.eventKey : '';
      const status = typeof req.query.status === 'string' ? req.query.status : '';
      const channel = typeof req.query.channel === 'string' ? req.query.channel : '';
      const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
      const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 200) : '';

      const conditions = [];
      if (eventKey && isEventKey(eventKey)) conditions.push(eq(notificationEvents.eventKey, eventKey));
      if (status && LOG_STATUSES.has(status)) conditions.push(eq(notificationEvents.status, status));
      if (channel && LOG_CHANNELS.has(channel)) conditions.push(eq(notificationEvents.channel, channel));
      if (userId) conditions.push(eq(notificationEvents.userId, userId));
      if (search) {
        const pattern = `%${search.replace(/[%_\\]/g, ch => `\\${ch}`)}%`;
        conditions.push(or(ilike(notificationEvents.recipient, pattern), ilike(notificationEvents.subject, pattern), ilike(users.email, pattern))!);
      }
      const where = conditions.length ? and(...conditions) : undefined;

      const [countRow] = await db
        .select({ total: sql<number>`count(*)` })
        .from(notificationEvents)
        .leftJoin(users, eq(notificationEvents.userId, users.id))
        .where(where);
      const total = Number(countRow?.total) || 0;

      const rows = await db
        .select({
          id: notificationEvents.id,
          userId: notificationEvents.userId,
          userEmail: users.email,
          userName: users.name,
          eventKey: notificationEvents.eventKey,
          channel: notificationEvents.channel,
          status: notificationEvents.status,
          recipient: notificationEvents.recipient,
          subject: notificationEvents.subject,
          error: notificationEvents.error,
          payload: notificationEvents.payload,
          createdAt: notificationEvents.createdAt,
        })
        .from(notificationEvents)
        .leftJoin(users, eq(notificationEvents.userId, users.id))
        .where(where)
        .orderBy(desc(notificationEvents.createdAt))
        .limit(limit)
        .offset((page - 1) * limit);

      res.json({ items: rows, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) });
    } catch (error) {
      console.error('[Admin/Notifications] log failed:', error);
      res.status(500).json({ error: 'Failed to load notification log' });
    }
  });

  // Send a test email for an event to the logged-in admin's own address using sample data
  router.post('/test/:eventKey', requireAdminPermission('communications', 'notifications', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const key = req.params.eventKey;
      if (!isEventKey(key)) return res.status(400).json({ error: 'Unknown event key' });
      const admin = req.userId ? await storage.getUser(req.userId) : undefined;
      const recipient = admin?.email || req.adminTeamMember?.email;
      if (!recipient) return res.status(400).json({ error: 'No email address on the current admin account' });

      const def = EVENT_TEMPLATE_DEFAULTS[key as EventKey];
      const result = await dispatchEvent(key as EventKey, {
        userId: admin?.id || '',
        to: recipient,
        data: { ...def.sample, userName: admin?.name || 'Admin', isTest: true },
      });
      const success = result.email === 'sent';
      res.status(success ? 200 : 502).json({ success, recipient, result });
    } catch (error) {
      console.error('[Admin/Notifications] test send failed:', error);
      res.status(500).json({ error: 'Failed to send test notification' });
    }
  });

  // Recent activity window helper for dashboards: counts per status in the last 24h
  router.get('/summary', requireAdminPermission('communications', 'notifications', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const rows = await db
        .select({ status: notificationEvents.status, channel: notificationEvents.channel, count: sql<number>`count(*)` })
        .from(notificationEvents)
        .where(gte(notificationEvents.createdAt, since))
        .groupBy(notificationEvents.status, notificationEvents.channel);
      res.json({ since: since.toISOString(), counts: rows.map(r => ({ ...r, count: Number(r.count) || 0 })) });
    } catch (error) {
      console.error('[Admin/Notifications] summary failed:', error);
      res.status(500).json({ error: 'Failed to load notification summary' });
    }
  });
}
