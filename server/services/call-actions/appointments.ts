/**
 * `check_availability` + `book_appointment` for Sarvam calls. Slots come from the agent's
 * working hours minus this user's scheduled/confirmed appointments and (best effort) Google
 * Calendar busy blocks. Booking writes `appointments`, syncs the calendar, marks the call
 * metadata for the CRM processor, fires `appointment.booked` and optionally sends a confirmation.
 */
import { nanoid } from 'nanoid';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../../db';
import { appointments } from '@shared/schema';
import { logger } from '../../utils/logger';
import { createCalendarEvent, getBusyIntervals, isCalendarSyncEnabled } from '../google-calendar/google-calendar.service';
import { webhookDeliveryService } from '../webhook-delivery';
import type { CallTool, CallToolResult } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { mergeCallMetadata } from './call-meta';
import {
  DAY_NAMES, DEFAULT_TIME_ZONE, EMAIL_RE, HHMM_RE, YMD_RE, addDays, busyMinutesOnDate, computeFreeSlots,
  isValidTimeZone, minutesOf, normalizePhone, nowInZone, spokenDate, spokenTime, str, weekdayOf, zonedToUtc, type MinuteInterval,
} from './util';

const SOURCE = 'CallActions';
const MAX_DAYS_AHEAD = 90;
const OPEN_STATUSES = ['scheduled', 'confirmed'];

interface AppointmentSettings {
  durationMinutes: number; timeZone: string; workingStart: string; workingEnd: string;
  workingDays: number[]; confirmVia: Array<'whatsapp' | 'email'>; serviceName: string;
}

export function appointmentSettings(ctx: CallActionContext): AppointmentSettings {
  const a = ctx.actions.appointments;
  return {
    durationMinutes: a?.durationMinutes && a.durationMinutes >= 5 ? a.durationMinutes : 30,
    timeZone: a?.timeZone && isValidTimeZone(a.timeZone) ? a.timeZone : DEFAULT_TIME_ZONE,
    workingStart: a?.workingHours?.start && HHMM_RE.test(a.workingHours.start) ? a.workingHours.start : '09:00',
    workingEnd: a?.workingHours?.end && HHMM_RE.test(a.workingHours.end) ? a.workingHours.end : '18:00',
    workingDays: a?.workingDays?.length ? a.workingDays : [1, 2, 3, 4, 5, 6],
    confirmVia: a?.confirmVia || [],
    serviceName: str(a?.serviceName),
  };
}

/** A relayable reason the date cannot be booked, or null when it is a valid working day. */
function checkDate(s: AppointmentSettings, date: string, today: string): string | null {
  if (!YMD_RE.test(date)) return 'Give the date as YYYY-MM-DD.';
  if (date < today) return 'That date has already passed. Ask for a future date.';
  if (date > addDays(today, MAX_DAYS_AHEAD)) return `We only book up to ${MAX_DAYS_AHEAD} days ahead.`;
  if (!s.workingDays.includes(weekdayOf(date))) {
    let next = date;
    for (let i = 0; i < 7 && !s.workingDays.includes(weekdayOf(next)); i++) next = addDays(next, 1);
    return `We are closed on ${DAY_NAMES[weekdayOf(date)]}s. The next working day is ${spokenDate(next)}.`;
  }
  return null;
}

/** Existing appointments + Google busy blocks on `date`, as minutes-of-day in the agent's zone. */
async function busyOn(ctx: CallActionContext, s: AppointmentSettings, date: string): Promise<MinuteInterval[]> {
  const busy: MinuteInterval[] = [];
  const rows = await db.select({ time: appointments.appointmentTime, duration: appointments.duration })
    .from(appointments)
    .where(and(eq(appointments.userId, ctx.userId), eq(appointments.appointmentDate, date), inArray(appointments.status, OPEN_STATUSES)));
  for (const r of rows) {
    const start = minutesOf(String(r.time).substring(0, 5));
    busy.push({ start, end: start + (r.duration || s.durationMinutes) });
  }
  try {
    const blocks = await getBusyIntervals(ctx.userId, zonedToUtc(date, '00:00', s.timeZone), zonedToUtc(addDays(date, 1), '00:00', s.timeZone));
    for (const b of blocks) {
      const m = busyMinutesOnDate(b.start, b.end, date, s.timeZone);
      if (m) busy.push(m);
    }
  } catch (e: any) {
    logger.warn(`Google busy lookup skipped for ${ctx.userId}: ${e.message}`, undefined, SOURCE);
  }
  return busy;
}

function freeSlots(s: AppointmentSettings, busy: MinuteInterval[], date: string, today: { date: string; minutes: number }): string[] {
  const notBefore = date === today.date ? today.minutes + 30 : undefined;
  return computeFreeSlots({ workingStart: s.workingStart, workingEnd: s.workingEnd, durationMinutes: s.durationMinutes, busy, notBeforeMinutes: notBefore, limit: 8 });
}

function buildCheckAvailability(ctx: CallActionContext, s: AppointmentSettings): CallTool {
  return {
    definition: {
      type: 'function',
      function: {
        name: 'check_availability',
        description: `Get the free ${s.durationMinutes}-minute appointment slots on a date (${s.timeZone}). Call it before offering times.`,
        parameters: {
          type: 'object',
          properties: { date: { type: 'string', description: 'The day to check, YYYY-MM-DD.' } },
          required: ['date'],
        },
      },
    },
    handler: async (args): Promise<CallToolResult> => {
      const date = str(args.date);
      const today = nowInZone(s.timeZone);
      const err = checkDate(s, date, today.date);
      if (err) return { success: false, message: err };
      const slots = freeSlots(s, await busyOn(ctx, s, date), date, today);
      if (!slots.length) return { success: true, message: `No free slots on ${spokenDate(date)}. Offer another day.`, data: { date, slots } };
      return {
        success: true,
        message: `Free on ${spokenDate(date)}: ${slots.map(spokenTime).join(', ')}. Offer two or three of these, not the whole list.`,
        data: { date, slots },
      };
    },
  };
}

function buildBookAppointment(ctx: CallActionContext, s: AppointmentSettings): CallTool {
  return {
    definition: {
      type: 'function',
      function: {
        name: 'book_appointment',
        description: `Book an appointment${s.serviceName ? ` for ${s.serviceName}` : ''} (${s.durationMinutes} min, ${s.timeZone}). Confirm the name, date and time with the caller first.`,
        parameters: {
          type: 'object',
          properties: {
            contactName: { type: 'string', description: "The caller's name." },
            contactPhone: { type: 'string', description: 'Phone number with country code. Omit to use the number they are calling from.' },
            contactEmail: { type: 'string', description: 'Email address, if the caller gave one.' },
            date: { type: 'string', description: 'YYYY-MM-DD' },
            time: { type: 'string', description: 'HH:MM, 24-hour, one of the free slots.' },
            notes: { type: 'string', description: 'What the appointment is about, in a few words.' },
          },
          required: ['contactName', 'date', 'time'],
        },
      },
    },
    handler: async (args): Promise<CallToolResult> => {
      const name = str(args.contactName);
      if (!name) return { success: false, message: 'Ask the caller for their name first.' };
      const phone = normalizePhone(str(args.contactPhone)) || ctx.callerPhone;
      if (!phone) return { success: false, message: 'Ask the caller for a phone number.' };
      const email = str(args.contactEmail);
      if (email && !EMAIL_RE.test(email)) return { success: false, message: 'Ask the caller to repeat the email address.' };
      const date = str(args.date);
      const time = str(args.time).substring(0, 5);
      const today = nowInZone(s.timeZone);
      const dateErr = checkDate(s, date, today.date);
      if (dateErr) return { success: false, message: dateErr };
      if (!HHMM_RE.test(time)) return { success: false, message: 'Give the time as HH:MM in 24-hour format.' };
      const start = minutesOf(time);
      if (start < minutesOf(s.workingStart) || start + s.durationMinutes > minutesOf(s.workingEnd)) {
        return { success: false, message: `${spokenTime(time)} is outside working hours (${spokenTime(s.workingStart)} to ${spokenTime(s.workingEnd)}). Offer a time within them.` };
      }
      if (date === today.date && start < today.minutes + 15) return { success: false, message: 'That time has already passed today. Offer a later slot.' };

      // Same call, same day → the model is repeating itself, not double-booking
      const [repeat] = await db.select({ id: appointments.id, time: appointments.appointmentTime }).from(appointments)
        .where(and(eq(appointments.callId, ctx.callId), eq(appointments.appointmentDate, date), inArray(appointments.status, OPEN_STATUSES))).limit(1);
      if (repeat) return { success: true, message: `Already booked for ${spokenDate(date)} at ${spokenTime(String(repeat.time).substring(0, 5))}. Just confirm it.`, data: { appointmentId: repeat.id } };

      const busy = await busyOn(ctx, s, date);
      if (busy.some(b => start < b.end && start + s.durationMinutes > b.start)) {
        const alt = freeSlots(s, busy, date, today).slice(0, 3);
        return { success: false, message: `${spokenTime(time)} is already taken.${alt.length ? ` Free instead: ${alt.map(spokenTime).join(', ')}.` : ' Offer another day.'}`, data: { date, slots: alt } };
      }

      const id = nanoid();
      await db.insert(appointments).values({
        id, userId: ctx.userId, callId: ctx.callId, contactName: name, contactPhone: phone, contactEmail: email || null,
        appointmentDate: date, appointmentTime: time, duration: s.durationMinutes, serviceName: s.serviceName || null,
        notes: str(args.notes) || null, status: 'scheduled',
        metadata: { source: 'sarvam-call', agentId: ctx.agentId, timeZone: s.timeZone },
      });
      logger.info(`[CallActions] Appointment ${id} booked on call ${ctx.callId}: ${date} ${time}`, undefined, SOURCE);

      void afterBooking(ctx, s, { id, name, phone, email, date, time, notes: str(args.notes) });
      const confirmNote = s.confirmVia.length ? ' A confirmation message is being sent.' : '';
      return { success: true, message: `Booked ${spokenDate(date)} at ${spokenTime(time)} for ${name}. Confirm it to the caller in one sentence.${confirmNote}`, data: { appointmentId: id, date, time } };
    },
  };
}

interface Booked { id: string; name: string; phone: string; email: string; date: string; time: string; notes: string }

/** Calendar sync, call metadata, webhook/integrations event, confirmation messages — all best effort. */
async function afterBooking(ctx: CallActionContext, s: AppointmentSettings, b: Booked): Promise<void> {
  try {
    if (await isCalendarSyncEnabled(ctx.userId)) {
      const eventId = await createCalendarEvent(ctx.userId, {
        id: b.id, contactName: b.name, contactPhone: b.phone, contactEmail: b.email || null, appointmentDate: b.date,
        appointmentTime: b.time, duration: s.durationMinutes, serviceName: s.serviceName || null, notes: b.notes || null, status: 'scheduled',
      });
      if (eventId) await db.update(appointments).set({ googleCalendarEventId: eventId }).where(eq(appointments.id, b.id));
    }
  } catch (e: any) {
    logger.warn(`Calendar sync failed for appointment ${b.id}: ${e.message}`, undefined, SOURCE);
  }

  await mergeCallMetadata(ctx.callId, {
    appointmentBooked: true, hasAppointment: true,
    appointmentData: { appointmentId: b.id, date: b.date, time: b.time, contactName: b.name, contactPhone: b.phone, serviceName: s.serviceName, duration: s.durationMinutes, timeZone: s.timeZone, bookedAt: new Date().toISOString() },
    aiInsights: { primaryOutcome: 'appointment_booked', appointmentBooked: true },
  });

  void webhookDeliveryService.triggerEvent(ctx.userId, 'appointment.booked', {
    appointment: { id: b.id, type: s.serviceName || null, status: 'scheduled', scheduledDate: b.date, scheduledTime: b.time, duration: s.durationMinutes, notes: b.notes || null, timeZone: s.timeZone },
    contact: { name: b.name, phone: b.phone, email: b.email || null },
    call: { id: ctx.callId, direction: ctx.callDirection },
    agent: { id: ctx.agentId, name: ctx.agent.name || null },
  }, ctx.campaignId || null);

  await sendConfirmations(ctx, s, b);
}

async function sendConfirmations(ctx: CallActionContext, s: AppointmentSettings, b: Booked): Promise<void> {
  const when = `${spokenDate(b.date)} ${spokenTime(b.time)}`;
  for (const channel of s.confirmVia) {
    const toolName = channel === 'whatsapp' ? 'send_whatsapp' : 'send_email';
    const tool = ctx.messagingTools?.find(t => t.definition.function.name === toolName);
    if (!tool) continue;
    const template = channel === 'whatsapp'
      ? (ctx.agent.messagingWhatsappTemplates?.[0] || ctx.agent.messagingWhatsappTemplate)
      : (ctx.agent.messagingEmailTemplates?.[0] || ctx.agent.messagingEmailTemplate);
    if (!template) continue;
    if (channel === 'email' && !b.email) continue;
    try {
      const result = await tool.handler(channel === 'whatsapp'
        ? { template_name: template, phone_number: b.phone, variables: { '1': b.name, '2': when, '3': s.serviceName || '' } }
        : { template_name: template, recipient_email: b.email, variables: { contact_name: b.name, name: b.name, appointment_date: spokenDate(b.date), appointment_time: spokenTime(b.time), date: b.date, time: b.time, service_name: s.serviceName || '' } });
      logger.info(`[CallActions] Appointment ${b.id} confirmation via ${channel}: ${result.success ? 'sent' : result.message}`, undefined, SOURCE);
    } catch (e: any) {
      logger.warn(`Appointment ${b.id} confirmation via ${channel} failed: ${e.message}`, undefined, SOURCE);
    }
  }
}

export function buildAppointmentTools(ctx: CallActionContext): CallTool[] {
  if (!ctx.agent.appointmentBookingEnabled) return [];
  const s = appointmentSettings(ctx);
  return [buildCheckAvailability(ctx, s), buildBookAppointment(ctx, s)];
}
