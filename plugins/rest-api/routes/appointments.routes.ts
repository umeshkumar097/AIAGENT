/**
 * ============================================================
 * REST API Plugin - Appointments booked by agents
 *   GET   /v1/appointments?from=&to=&status=&page=&pageSize=   calls:read   (from/to = YYYY-MM-DD or ISO)
 *   GET   /v1/appointments/:id                                  calls:read
 *   PATCH /v1/appointments/:id                                  calls:write  { status, statusReason? }
 * A status change syncs the linked Google Calendar event (best effort) and fires
 * `appointment.<confirmed|cancelled|completed|no_show>` webhooks.
 * ============================================================
 */

import { Router, Response } from 'express';
import { and, desc, eq, gte, lte, sql, type SQL } from 'drizzle-orm';
import { z } from 'zod';
import { apiAuthMiddleware, asyncHandler } from '../middleware/auth.middleware.js';
import type { AuthenticatedApiRequest } from '../types.js';
import { db } from '../../../server/db.js';
import { appointments, type Appointment } from '../../../shared/schema.js';
import { deleteCalendarEvent, updateCalendarEvent } from '../../../server/services/google-calendar/google-calendar.service.js';
import { webhookDeliveryService } from '../../../server/services/webhook-delivery.js';
import { pageParams, paginationMeta, queryString, sendData, sendError, sendNotFound, sendValidationError } from './helpers.js';

const router = Router();

export const APPOINTMENT_STATUSES = ['scheduled', 'confirmed', 'cancelled', 'completed', 'no_show'] as const;
type AppointmentStatus = typeof APPOINTMENT_STATUSES[number];

const patchSchema = z.object({
  status: z.enum(APPOINTMENT_STATUSES),
  statusReason: z.string().trim().max(500).optional(),
});

function shape(a: Appointment) {
  return {
    id: a.id, contactName: a.contactName, contactPhone: a.contactPhone, contactEmail: a.contactEmail,
    appointmentDate: a.appointmentDate, appointmentTime: a.appointmentTime, duration: a.duration, serviceName: a.serviceName,
    notes: a.notes, status: a.status, statusReason: a.statusReason, callId: a.callId, googleCalendarEventId: a.googleCalendarEventId,
    createdAt: a.createdAt, updatedAt: a.updatedAt,
  };
}

/** `YYYY-MM-DD` from a date or ISO date-time query value; null when absent/invalid. */
function queryDay(req: AuthenticatedApiRequest, key: string): string | null {
  const raw = queryString(req, key);
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/** Event payload shape shared with the app's appointment routes (flow-automation-routes.ts). */
function eventPayload(a: Appointment) {
  return {
    appointmentId: a.id, contactName: a.contactName || null, contactPhone: a.contactPhone || null, contactEmail: a.contactEmail || null,
    date: a.appointmentDate, time: a.appointmentTime, duration: a.duration || 30, serviceName: a.serviceName || null,
    notes: a.notes || null, status: a.status, flowId: a.flowId || null, callId: a.callId || null,
  };
}

async function ownAppointment(userId: string, id: string): Promise<Appointment | undefined> {
  const [row] = await db.select().from(appointments).where(and(eq(appointments.id, id), eq(appointments.userId, userId))).limit(1);
  return row;
}

/** Google Calendar sync for a status change — best effort, never throws. Returns the row to store. */
async function syncCalendar(userId: string, row: Appointment): Promise<Appointment> {
  if (!row.googleCalendarEventId) return row;
  try {
    if (row.status === 'cancelled') {
      const deleted = await deleteCalendarEvent(userId, row.googleCalendarEventId);
      if (deleted) {
        const [cleared] = await db.update(appointments).set({ googleCalendarEventId: null }).where(eq(appointments.id, row.id)).returning();
        return cleared || { ...row, googleCalendarEventId: null };
      }
    } else {
      await updateCalendarEvent(userId, row.googleCalendarEventId, {
        id: row.id, contactName: row.contactName, contactPhone: row.contactPhone, contactEmail: row.contactEmail,
        appointmentDate: row.appointmentDate, appointmentTime: row.appointmentTime, duration: row.duration,
        serviceName: row.serviceName, notes: row.notes, status: row.status,
      });
    }
  } catch (e: any) {
    console.error(`[REST API] Calendar sync failed for appointment ${row.id}: ${e.message}`);
  }
  return row;
}

function fireStatusEvent(userId: string, row: Appointment, status: AppointmentStatus, statusReason: string | null): void {
  const now = new Date().toISOString();
  const extra: Record<string, unknown> = {
    confirmed: { confirmedAt: now },
    cancelled: { cancelReason: statusReason, cancelledAt: now },
    completed: { completedAt: now },
    no_show: { markedNoShowAt: now },
  }[status as Exclude<AppointmentStatus, 'scheduled'>] || {};
  if (status === 'scheduled') return;
  void webhookDeliveryService.triggerEvent(userId, `appointment.${status}`, { appointment: eventPayload(row), ...extra });
}

/** GET /v1/appointments - List (latest date first) */
router.get(
  '/',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const { page, pageSize, offset } = pageParams(req, 50);
    const conditions: SQL[] = [eq(appointments.userId, userId)];
    const from = queryDay(req, 'from');
    if (from) conditions.push(gte(appointments.appointmentDate, from));
    const to = queryDay(req, 'to');
    if (to) conditions.push(lte(appointments.appointmentDate, to));
    const status = queryString(req, 'status');
    if (status) {
      if (!(APPOINTMENT_STATUSES as ReadonlyArray<string>).includes(status)) {
        return sendError(req, res, 400, 'VALIDATION_ERROR', `status must be one of: ${APPOINTMENT_STATUSES.join(', ')}`);
      }
      conditions.push(eq(appointments.status, status));
    }
    const where = and(...conditions);
    const [rows, countRows] = await Promise.all([
      db.select().from(appointments).where(where).orderBy(desc(appointments.appointmentDate), desc(appointments.appointmentTime)).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(appointments).where(where),
    ]);
    sendData(req, res, rows.map(shape), 200, paginationMeta(page, pageSize, Number(countRows[0]?.count || 0)));
  })
);

/** GET /v1/appointments/:id */
router.get(
  '/:id',
  apiAuthMiddleware('calls:read'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const row = await ownAppointment(req.apiAuth.userId, req.params.id);
    if (!row) return sendNotFound(req, res, 'Appointment');
    sendData(req, res, shape(row));
  })
);

/** PATCH /v1/appointments/:id - Change status */
router.patch(
  '/:id',
  apiAuthMiddleware('calls:write'),
  asyncHandler(async (req: AuthenticatedApiRequest, res: Response) => {
    const { userId } = req.apiAuth;
    const existing = await ownAppointment(userId, req.params.id);
    if (!existing) return sendNotFound(req, res, 'Appointment');
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const { status, statusReason } = parsed.data;
    const [updated] = await db.update(appointments)
      .set({ status, statusReason: statusReason ?? existing.statusReason, updatedAt: new Date() })
      .where(eq(appointments.id, existing.id)).returning();
    let row = updated;
    if (existing.status !== status) {
      row = await syncCalendar(userId, updated);
      fireStatusEvent(userId, row, status, statusReason ?? null);
    }
    sendData(req, res, shape(row));
  })
);

export default router;
