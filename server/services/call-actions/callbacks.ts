/**
 * `schedule_callback` — the agent books a time; callback-cron.ts places the call when due.
 * The window follows the appointment working hours when configured, else 08:00–21:00 IST.
 */
import { and, eq } from 'drizzle-orm';
import { db } from '../../db';
import { leads, scheduledCallbacks } from '@shared/schema';
import { logger } from '../../utils/logger';
import { webhookDeliveryService } from '../webhook-delivery';
import type { CallTool, CallToolResult } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { mergeCallMetadata } from './call-meta';
import {
  DAY_NAMES, DEFAULT_TIME_ZONE, HHMM_RE, YMD_RE, addDays, isValidTimeZone, minutesOf, normalizePhone, nowInZone,
  spokenDate, spokenTime, str, weekdayOf, zonedToUtc,
} from './util';

const SOURCE = 'CallActions';

export interface CallbackWindow { timeZone: string; start: string; end: string; days: number[]; maxDaysAhead: number }

export function callbackWindow(ctx: CallActionContext): CallbackWindow {
  const a = ctx.actions.appointments;
  const tz = a?.timeZone && isValidTimeZone(a.timeZone) ? a.timeZone : DEFAULT_TIME_ZONE;
  const maxDaysAhead = ctx.actions.callback?.maxDaysAhead && ctx.actions.callback.maxDaysAhead > 0 ? ctx.actions.callback.maxDaysAhead : 7;
  if (a) {
    return {
      timeZone: tz,
      start: a.workingHours?.start && HHMM_RE.test(a.workingHours.start) ? a.workingHours.start : '09:00',
      end: a.workingHours?.end && HHMM_RE.test(a.workingHours.end) ? a.workingHours.end : '18:00',
      days: a.workingDays?.length ? a.workingDays : [1, 2, 3, 4, 5, 6],
      maxDaysAhead,
    };
  }
  return { timeZone: tz, start: '08:00', end: '21:00', days: [0, 1, 2, 3, 4, 5, 6], maxDaysAhead };
}

/** Relayable reason the slot is not allowed, or null. Exported for the manual POST /api/callbacks route. */
export function checkCallbackSlot(w: CallbackWindow, date: string, time: string, now = new Date()): string | null {
  if (!YMD_RE.test(date)) return 'Give the date as YYYY-MM-DD.';
  if (!HHMM_RE.test(time)) return 'Give the time as HH:MM in 24-hour format.';
  const today = nowInZone(w.timeZone, now);
  if (zonedToUtc(date, time, w.timeZone).getTime() <= now.getTime() + 5 * 60_000) return 'That time has already passed. Ask for a later time.';
  if (date > addDays(today.date, w.maxDaysAhead)) return `Callbacks can only be scheduled up to ${w.maxDaysAhead} days ahead.`;
  if (!w.days.includes(weekdayOf(date))) return `We do not call back on ${DAY_NAMES[weekdayOf(date)]}s. Offer another day.`;
  const m = minutesOf(time);
  if (m < minutesOf(w.start) || m > minutesOf(w.end)) return `Callbacks are possible between ${spokenTime(w.start)} and ${spokenTime(w.end)}. Offer a time in that window.`;
  return null;
}

export function buildCallbackTool(ctx: CallActionContext): CallTool | null {
  if (!ctx.actions.callback?.enabled) return null;
  const w = callbackWindow(ctx);

  return {
    definition: {
      type: 'function',
      function: {
        name: 'schedule_callback',
        description: `Schedule an automatic callback to the caller at a specific date and time (${w.timeZone}, between ${w.start} and ${w.end}, up to ${w.maxDaysAhead} days ahead). Confirm the exact day and time with the caller before calling this.`,
        parameters: {
          type: 'object',
          properties: {
            date: { type: 'string', description: 'YYYY-MM-DD' },
            time: { type: 'string', description: 'HH:MM, 24-hour.' },
            contactName: { type: 'string', description: "The caller's name, if known." },
            phone: { type: 'string', description: 'Number to call back, with country code. Omit to use the number they are calling from.' },
            reason: { type: 'string', description: 'What the callback is about, in a few words.' },
          },
          required: ['date', 'time'],
        },
      },
    },
    handler: async (args): Promise<CallToolResult> => {
      const date = str(args.date);
      const time = str(args.time).substring(0, 5);
      const err = checkCallbackSlot(w, date, time);
      if (err) return { success: false, message: err };
      const phone = normalizePhone(str(args.phone)) || ctx.callerPhone;
      if (!phone) return { success: false, message: 'Ask the caller which number to call back.' };
      const scheduledAt = zonedToUtc(date, time, w.timeZone);
      const reason = str(args.reason) || null;
      const contactName = str(args.contactName) || null;

      try {
        const [row] = await db.insert(scheduledCallbacks).values({
          userId: ctx.userId, agentId: ctx.agentId, sourceCallId: ctx.callId, plivoPhoneNumberId: ctx.plivoPhoneNumberId,
          contactName, contactPhone: phone, reason, scheduledAt, timeZone: w.timeZone, status: 'pending',
        }).returning({ id: scheduledCallbacks.id });

        await db.update(leads).set({ hasCallback: true, callbackScheduled: scheduledAt, callbackCompleted: false, updatedAt: new Date() })
          .where(and(eq(leads.userId, ctx.userId), eq(leads.phone, phone)));

        void mergeCallMetadata(ctx.callId, {
          callbackScheduled: { id: row.id, scheduledAt: scheduledAt.toISOString(), timeZone: w.timeZone, reason },
          aiInsights: { needsFollowUp: true },
        });
        void webhookDeliveryService.triggerEvent(ctx.userId, 'callback.scheduled', {
          callback: { id: row.id, contactName, contactPhone: phone, reason, scheduledAt: scheduledAt.toISOString(), timeZone: w.timeZone, status: 'pending' },
          call: { id: ctx.callId, direction: ctx.callDirection },
          agent: { id: ctx.agentId, name: ctx.agent.name || null },
        }, ctx.campaignId || null);

        logger.info(`[CallActions] Callback ${row.id} scheduled from call ${ctx.callId} at ${scheduledAt.toISOString()}`, undefined, SOURCE);
        return {
          success: true,
          message: `Callback scheduled for ${spokenDate(date)} at ${spokenTime(time)}. Confirm the exact day and time to the caller in one sentence.`,
          data: { callbackId: row.id, scheduledAt: scheduledAt.toISOString() },
        };
      } catch (e: any) {
        logger.error(`[CallActions] schedule_callback failed on call ${ctx.callId}: ${e.message}`, e, SOURCE);
        return { success: false, message: 'The callback could not be scheduled right now. Offer to note it down instead.' };
      }
    },
  };
}
