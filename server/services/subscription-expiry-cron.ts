'use strict';
/**
 * Subscription expiry cron (Cashfree one-time-payment-per-period model).
 * Runs on boot and then daily:
 *  - plan_expiring reminders at ≤7 / ≤3 / ≤1 days before current_period_end (once per threshold)
 *  - at period end: downgrade to the free plan (status 'expired') + plan_expired (once)
 *  - auto-renew rows (mandate ACTIVE / BANK_APPROVAL_PENDING): no reminders, and a 3-day grace after the period
 *    end for the Cashfree mandate charge to land before the plan expires
 *  - phone_number_expiring for rented numbers whose next billing date is ≤3 days away (once per cycle)
 * Overlap-safe: in-process flag + Postgres advisory lock (safe across instances).
 */
import { db } from '../db';
import { plans, users, userSubscriptions, phoneNumbers, plivoPhoneNumbers, notificationEvents } from '@shared/schema';
import { and, eq, gte, lte, sql, isNotNull } from 'drizzle-orm';
import { logger } from '../utils/logger';
import { dispatchEvent } from './event-dispatcher';
import { expireSubscription } from './membership-service';
import { MANDATE_LIVE_STATUSES } from '../engines/payment/gateways/cashfree/subscriptions';

const SOURCE = 'SubscriptionExpiryCron';
const DAY_MS = 24 * 60 * 60 * 1000;
const RUN_INTERVAL_MS = DAY_MS;
const BOOT_DELAY_MS = 90 * 1000;
const PHONE_REMINDER_DAYS = 3;
/** How long an auto-renewing plan waits past its period end for the mandate charge (Cashfree retries failed charges) */
const AUTO_RENEW_GRACE_MS = 3 * DAY_MS;
const LOCK_KEY = 'subscription_expiry_cron';

/** Ascending so `find(t => daysLeft <= t)` yields the tightest threshold (1 day left → 1, not 7) */
const REMINDER_THRESHOLDS = [1, 3, 7] as const;
type Threshold = typeof REMINDER_THRESHOLDS[number];
const REMINDER_COLUMN: Record<Threshold, 'reminder7SentAt' | 'reminder3SentAt' | 'reminder1SentAt'> = {
  7: 'reminder7SentAt', 3: 'reminder3SentAt', 1: 'reminder1SentAt',
};

let timer: NodeJS.Timeout | null = null;
let running = false;

export interface ExpiryRunResult {
  expired: number;
  reminded: number;
  phoneReminded: number;
  skipped: boolean;
}

function toNumber(value: string | number | null | undefined): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value ?? '0'));
  return Number.isFinite(n) ? n : 0;
}

export function startSubscriptionExpiryCron(): void {
  if (timer) return;
  setTimeout(() => { void runSubscriptionExpiryCheck(); }, BOOT_DELAY_MS).unref();
  timer = setInterval(() => { void runSubscriptionExpiryCheck(); }, RUN_INTERVAL_MS);
  timer.unref();
  logger.info('Subscription expiry cron started (daily + on boot)', undefined, SOURCE);
}

export function stopSubscriptionExpiryCron(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

/** One pass; safe to call manually (admin tooling / tests). */
export async function runSubscriptionExpiryCheck(now: Date = new Date()): Promise<ExpiryRunResult> {
  const result: ExpiryRunResult = { expired: 0, reminded: 0, phoneReminded: 0, skipped: false };
  if (running) {
    result.skipped = true;
    return result;
  }
  running = true;
  try {
    await db.transaction(async (tx) => {
      const lock = await tx.execute(sql`SELECT pg_try_advisory_xact_lock(hashtext(${LOCK_KEY})) AS locked`);
      if (!(lock.rows?.[0] as { locked?: boolean } | undefined)?.locked) {
        logger.info('Another instance is running the expiry check; skipping', undefined, SOURCE);
        result.skipped = true;
        return;
      }
      const subs = await processSubscriptions(now);
      result.expired = subs.expired;
      result.reminded = subs.reminded;
      result.phoneReminded = await processPhoneNumbers(now);
    });
    logger.info('Subscription expiry check finished', result, SOURCE);
  } catch (error) {
    logger.error('Subscription expiry check failed', error, SOURCE);
  } finally {
    running = false;
  }
  return result;
}

async function processSubscriptions(now: Date): Promise<{ expired: number; reminded: number }> {
  const horizon = new Date(now.getTime() + 7 * DAY_MS);
  const rows = await db
    .select({ subscription: userSubscriptions, plan: plans, user: { id: users.id, email: users.email, name: users.name, isActive: users.isActive } })
    .from(userSubscriptions)
    .innerJoin(plans, eq(userSubscriptions.planId, plans.id))
    .innerJoin(users, eq(userSubscriptions.userId, users.id))
    .where(and(eq(userSubscriptions.status, 'active'), lte(userSubscriptions.currentPeriodEnd, horizon)));

  let expired = 0;
  let reminded = 0;
  for (const { subscription, plan, user } of rows) {
    const isPaidPlan = plan.name.toLowerCase() !== 'free' || toNumber(plan.monthlyPrice) > 0 || toNumber(plan.yearlyPrice) > 0;
    if (!isPaidPlan) continue; // free plans never expire
    const periodEnd = new Date(subscription.currentPeriodEnd);
    const price = subscription.billingPeriod === 'yearly' ? toNumber(plan.yearlyPrice) : toNumber(plan.monthlyPrice);
    const baseData = {
      subscriptionId: subscription.id, planId: plan.id, planName: plan.displayName, billingPeriod: subscription.billingPeriod,
      expiresAt: periodEnd.toISOString(), amount: price, currency: 'INR',
    };

    const mandateLive = subscription.autoRenew && MANDATE_LIVE_STATUSES.has(subscription.mandateStatus || '');

    try {
      if (periodEnd <= now) {
        if (mandateLive && periodEnd.getTime() + AUTO_RENEW_GRACE_MS > now.getTime()) continue; // waiting for the mandate charge
        if (!(await expireSubscription(subscription.id, user.id))) continue; // renewed / already handled meanwhile
        expired++;
        if (!subscription.expiredNotifiedAt) {
          await db.update(userSubscriptions).set({ expiredNotifiedAt: now }).where(eq(userSubscriptions.id, subscription.id));
          if (user.isActive) await dispatchEvent('plan_expired', { userId: user.id, data: { ...baseData, expiredAt: periodEnd.toISOString() } });
        }
        continue;
      }

      if (mandateLive) continue; // Cashfree charges the mandate at period end — no "renew now" reminders
      const daysLeft = Math.max(1, Math.ceil((periodEnd.getTime() - now.getTime()) / DAY_MS));
      const threshold = REMINDER_THRESHOLDS.find(t => daysLeft <= t) ?? null;
      if (!threshold || subscription[REMINDER_COLUMN[threshold]]) continue;

      // Stamp this threshold and every larger one so a missed 7-day reminder is not sent later as "7 days left"
      const stamp: Partial<Record<typeof REMINDER_COLUMN[Threshold], Date>> = {};
      for (const t of REMINDER_THRESHOLDS) {
        if (t >= threshold && !subscription[REMINDER_COLUMN[t]]) stamp[REMINDER_COLUMN[t]] = now;
      }
      await db.update(userSubscriptions).set({ ...stamp, updatedAt: now }).where(eq(userSubscriptions.id, subscription.id));
      if (user.isActive) {
        await dispatchEvent('plan_expiring', { userId: user.id, data: { ...baseData, daysLeft, threshold } });
      }
      reminded++;
    } catch (error) {
      logger.error(`Failed to process subscription ${subscription.id}`, error, SOURCE);
    }
  }
  return { expired, reminded };
}

/** Has phone_number_expiring already been sent for this number in the current billing cycle? */
async function phoneReminderAlreadySent(userId: string, phoneNumberId: string, nextBillingDate: Date): Promise<boolean> {
  const cycleStart = new Date(nextBillingDate.getTime() - 25 * DAY_MS);
  const [row] = await db.select({ id: notificationEvents.id })
    .from(notificationEvents)
    .where(and(
      eq(notificationEvents.userId, userId),
      eq(notificationEvents.eventKey, 'phone_number_expiring'),
      eq(notificationEvents.channel, 'email'),
      gte(notificationEvents.createdAt, cycleStart),
      sql`${notificationEvents.payload}::text LIKE ${`%${phoneNumberId}%`}`,
    ))
    .limit(1);
  return !!row;
}

async function processPhoneNumbers(now: Date): Promise<number> {
  const horizon = new Date(now.getTime() + PHONE_REMINDER_DAYS * DAY_MS);
  const [twilio, plivo] = await Promise.all([
    db.select({ id: phoneNumbers.id, userId: phoneNumbers.userId, phoneNumber: phoneNumbers.phoneNumber, nextBillingDate: phoneNumbers.nextBillingDate, monthlyCredits: phoneNumbers.monthlyCredits })
      .from(phoneNumbers)
      .where(and(eq(phoneNumbers.status, 'active'), eq(phoneNumbers.isSystemPool, false), isNotNull(phoneNumbers.userId),
        isNotNull(phoneNumbers.nextBillingDate), lte(phoneNumbers.nextBillingDate, horizon), gte(phoneNumbers.nextBillingDate, now))),
    db.select({ id: plivoPhoneNumbers.id, userId: plivoPhoneNumbers.userId, phoneNumber: plivoPhoneNumbers.phoneNumber, nextBillingDate: plivoPhoneNumbers.nextBillingDate, monthlyCredits: plivoPhoneNumbers.monthlyCredits })
      .from(plivoPhoneNumbers)
      .where(and(eq(plivoPhoneNumbers.status, 'active'), isNotNull(plivoPhoneNumbers.userId),
        isNotNull(plivoPhoneNumbers.nextBillingDate), lte(plivoPhoneNumbers.nextBillingDate, horizon), gte(plivoPhoneNumbers.nextBillingDate, now))),
  ]);

  let sent = 0;
  for (const number of [...twilio.map(n => ({ ...n, provider: 'twilio' })), ...plivo.map(n => ({ ...n, provider: 'plivo' }))]) {
    if (!number.userId || !number.nextBillingDate) continue;
    try {
      const nextBillingDate = new Date(number.nextBillingDate);
      if (await phoneReminderAlreadySent(number.userId, number.id, nextBillingDate)) continue;
      const daysLeft = Math.max(1, Math.ceil((nextBillingDate.getTime() - now.getTime()) / DAY_MS));
      await dispatchEvent('phone_number_expiring', {
        userId: number.userId,
        data: {
          phoneNumberId: number.id, phoneNumber: number.phoneNumber, provider: number.provider,
          nextBillingDate: nextBillingDate.toISOString(), daysLeft, monthlyCredits: number.monthlyCredits ?? 0,
        },
      });
      sent++;
    } catch (error) {
      logger.error(`Failed to send phone_number_expiring for ${number.id}`, error, SOURCE);
    }
  }
  return sent;
}
