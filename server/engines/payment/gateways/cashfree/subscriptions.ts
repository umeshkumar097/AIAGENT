'use strict';
/**
 * Cashfree Subscriptions (auto-renew mandates) — create / sync / cancel.
 *
 * The first period of a plan is always paid with a one-time order; the mandate (UPI AutoPay / card / eNACH)
 * only charges renewals at current_period_end. Mandate state lives on user_subscriptions:
 *   cashfreeSubscriptionId (our zvsub_… id), cfSubscriptionId, mandateStatus, mandatePaymentMethod,
 *   mandateAuthorizedAt, nextChargeAt, autoRenew (true only while the mandate can charge), autoRenewCancelledAt.
 */

import crypto from 'crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../../../../db';
import { plans, userSubscriptions, users, type Plan, type User, type UserSubscription } from '@shared/schema';
import { storage } from '../../../../storage';
import { dispatchEvent } from '../../../../services/event-dispatcher';
import { resolveBuyerStateCode } from '../../invoice-service';
import { quotePrice, round2, type PriceQuote } from '../../invoice-gst';
import { logger } from '../../../../utils/logger';
import { FRONTEND_URL } from '../../webhook-helper';
import {
  CashfreeApiError,
  FALLBACK_CUSTOMER_PHONE,
  createSubscription,
  getSubscription,
  manageSubscription,
  normaliseCustomerPhone,
  type CashfreeSubscription,
} from './service';

const SOURCE = 'CashfreeSubscriptions';
const HOUR_MS = 60 * 60 * 1000;
/** Cashfree needs the first charge ≥ 2 h after creation (UPI AutoPay pre-debit notice) — keep a margin */
const MIN_FIRST_CHARGE_DELAY_MS = 3 * HOUR_MS;
const MANDATE_LIFETIME_YEARS = 5;
const AUTHORIZATION_AMOUNT_INR = 1;
const MANDATE_PAYMENT_METHODS = ['upi', 'card', 'enach'];

export const SUBSCRIPTION_ID_PATTERN = /^zvsub_[a-f0-9]{12}$/;

/** Statuses in which the mandate is (or may soon be) able to charge → autoRenew = true */
export const MANDATE_CHARGING_STATUSES: ReadonlySet<string> = new Set(['ACTIVE', 'BANK_APPROVAL_PENDING', 'ON_HOLD']);
/** Statuses the expiry cron treats as "a charge is coming" (reminders off, 3-day grace) */
export const MANDATE_LIVE_STATUSES: ReadonlySet<string> = new Set(['ACTIVE', 'BANK_APPROVAL_PENDING']);
/** Terminal statuses — the mandate can never charge again */
export const MANDATE_ENDED_STATUSES: ReadonlySet<string> = new Set(['CANCELLED', 'CUSTOMER_CANCELLED', 'EXPIRED', 'LINK_EXPIRED', 'COMPLETED']);

export class MandateRequestError extends Error {
  status: number;
  details?: Record<string, unknown>;
  constructor(message: string, status = 400, details?: Record<string, unknown>) {
    super(message);
    this.name = 'MandateRequestError';
    this.status = status;
    this.details = details;
  }
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function parseDate(value: unknown): Date | null {
  if (!value) return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function planListPrice(plan: Plan, billingPeriod: 'monthly' | 'yearly'): number {
  return round2(toNumber(billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice));
}

/** Human label for authorisation_details.payment_group */
export function mandateMethodLabel(paymentGroup: string | null | undefined): string {
  const group = (paymentGroup || '').toLowerCase();
  if (group === 'upi') return 'UPI AutoPay';
  if (group === 'card') return 'card';
  if (group === 'enach' || group === 'nach') return 'eNACH';
  return group || 'your payment method';
}

export function authorisationOf(cfSub: Partial<CashfreeSubscription>) {
  return cfSub.authorisation_details || cfSub.authorization_details || null;
}

async function updateRow(id: string, patch: Partial<UserSubscription>): Promise<void> {
  await db.update(userSubscriptions).set({ ...patch, updatedAt: new Date() }).where(eq(userSubscriptions.id, id));
}

export async function getSubscriptionRowById(id: string): Promise<UserSubscription | undefined> {
  const [row] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.id, id)).limit(1);
  return row;
}

export async function getSubscriptionRowByCashfreeId(cashfreeSubscriptionId: string): Promise<UserSubscription | undefined> {
  const [row] = await db.select().from(userSubscriptions)
    .where(eq(userSubscriptions.cashfreeSubscriptionId, cashfreeSubscriptionId)).limit(1);
  return row;
}

export interface PaidSubscription {
  row: UserSubscription;
  plan: Plan;
  user: User;
  billingPeriod: 'monthly' | 'yearly';
  listPrice: number;
}

/** The caller's active, paid subscription (period still running) — the only thing a mandate can be attached to. */
export async function getActivePaidSubscription(userId: string): Promise<PaidSubscription> {
  const [user, sub] = await Promise.all([storage.getUser(userId), storage.getUserSubscription(userId)]);
  if (!user) throw new MandateRequestError('User not found', 404);
  if (!sub || sub.status !== 'active' || !sub.plan) throw new MandateRequestError('You need an active paid plan before enabling auto-renew');
  const { plan, ...row } = sub as UserSubscription & { plan: Plan };
  if (new Date(row.currentPeriodEnd) <= new Date()) throw new MandateRequestError('Your plan has expired — renew it first, then enable auto-renew');
  const billingPeriod = row.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
  const listPrice = planListPrice(plan, billingPeriod);
  if (listPrice <= 0) throw new MandateRequestError('Auto-renew is only available for paid plans');
  return { row, plan, user, billingPeriod, listPrice };
}

async function quoteFor(user: User, listPrice: number): Promise<PriceQuote> {
  return quotePrice(listPrice, resolveBuyerStateCode(user));
}

export interface CreateMandateResult {
  subscriptionId: string;
  subscriptionSessionId: string;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
  nextChargeAt: Date;
  quote: PriceQuote;
}

/**
 * Creates the Cashfree subscription for the caller's current plan and stores it on the row (status INITIALIZED).
 * The browser then opens `subscriptionsCheckout({ subsSessionId })` to authorise the mandate.
 */
export async function createMandate(userId: string, returnOrigin: string = FRONTEND_URL): Promise<CreateMandateResult> {
  const { row, plan, user, billingPeriod, listPrice } = await getActivePaidSubscription(userId);
  if (row.cashfreeSubscriptionId && MANDATE_LIVE_STATUSES.has(row.mandateStatus || '')) {
    throw new MandateRequestError('Auto-renew is already set up for this plan', 409, { mandateStatus: row.mandateStatus });
  }
  // A stale mandate (never authorised / on hold / paused) is replaced: cancel it so it can never charge later
  if (row.cashfreeSubscriptionId && !MANDATE_ENDED_STATUSES.has(row.mandateStatus || '')) {
    await cancelAtCashfree(row.cashfreeSubscriptionId);
  }

  const quote = await quoteFor(user, listPrice);
  const now = Date.now();
  const firstCharge = new Date(Math.max(new Date(row.currentPeriodEnd).getTime(), now + MIN_FIRST_CHARGE_DELAY_MS));
  const expiry = new Date(now);
  expiry.setFullYear(expiry.getFullYear() + MANDATE_LIFETIME_YEARS);
  const subscriptionId = `zvsub_${crypto.randomBytes(6).toString('hex')}`;

  let customerPhone = normaliseCustomerPhone(user.billingPhone);
  if (!customerPhone) {
    customerPhone = FALLBACK_CUSTOMER_PHONE;
    logger.warn(`User ${userId} has no billing phone; using placeholder customer_phone for mandate ${subscriptionId}`, undefined, SOURCE);
  }

  let cfSub: CashfreeSubscription;
  try {
    cfSub = await createSubscription({
      subscription_id: subscriptionId,
      customer_details: {
        customer_name: (user.billingName || user.name || '').slice(0, 100) || undefined,
        customer_email: user.email,
        customer_phone: customerPhone,
      },
      plan_details: {
        plan_name: `${plan.displayName} ${billingPeriod}`.slice(0, 40),
        plan_type: 'PERIODIC',
        plan_amount: quote.total,
        plan_max_amount: quote.total,
        plan_intervals: 1,
        plan_interval_type: billingPeriod === 'yearly' ? 'YEAR' : 'MONTH',
        plan_currency: 'INR',
        plan_note: `${plan.displayName} plan (${billingPeriod}) auto-renewal`.slice(0, 200),
      },
      authorization_details: {
        authorization_amount: AUTHORIZATION_AMOUNT_INR,
        authorization_amount_refund: true,
        payment_methods: MANDATE_PAYMENT_METHODS,
      },
      subscription_meta: {
        return_url: `${returnOrigin}/app/payment-result?gateway=cashfree&subscription_id=${subscriptionId}`,
        notification_channel: ['EMAIL'],
      },
      subscription_first_charge_time: firstCharge.toISOString(),
      subscription_expiry_time: expiry.toISOString(),
      subscription_note: `Auto-renewal of the ${plan.displayName} plan`.slice(0, 200),
      subscription_tags: { userId, planId: plan.id, billingPeriod, userSubscriptionId: row.id },
    });
  } catch (error: any) {
    const message = error instanceof CashfreeApiError ? error.message : 'Failed to create the Cashfree subscription';
    logger.error(`Cashfree subscription creation failed for user ${userId}: ${message}`, error, SOURCE);
    throw new MandateRequestError(message, 502);
  }
  if (!cfSub.subscription_session_id) {
    logger.error(`Cashfree subscription ${subscriptionId} returned no subscription_session_id`, cfSub, SOURCE);
    throw new MandateRequestError('Cashfree did not return a subscription session', 502);
  }

  const nextChargeAt = parseDate(cfSub.next_schedule_date) || firstCharge;
  await updateRow(row.id, {
    cashfreeSubscriptionId: subscriptionId,
    cfSubscriptionId: cfSub.cf_subscription_id ? String(cfSub.cf_subscription_id) : null,
    mandateStatus: cfSub.subscription_status || 'INITIALIZED',
    mandatePaymentMethod: null,
    mandateAuthorizedAt: null,
    autoRenew: false,
    autoRenewCancelledAt: null,
    nextChargeAt,
  });
  logger.info(`Created Cashfree subscription ${subscriptionId} for user ${userId} (${plan.name}/${billingPeriod}, ${quote.total} INR)`, undefined, SOURCE);

  return { subscriptionId, subscriptionSessionId: cfSub.subscription_session_id, amount: quote.total, billingPeriod, nextChargeAt, quote };
}

/** Minimal view of a Cashfree subscription used by the sync rule (API response or webhook subscription_details). */
export interface MandateSnapshot {
  subscription_status: string;
  next_schedule_date?: string | null;
  authorisation_details?: CashfreeSubscription['authorisation_details'];
  authorization_details?: CashfreeSubscription['authorization_details'];
  plan_details?: CashfreeSubscription['plan_details'];
}

/**
 * Sync rule: mandateStatus = Cashfree status; autoRenew = status ∈ {ACTIVE, BANK_APPROVAL_PENDING, ON_HOLD};
 * payment method / authorised-at / next charge from the snapshot. Dispatches auto_renew_enabled the first time the
 * mandate can charge and auto_renew_disabled when it ends. Optimistic on mandateStatus so a webhook and a status
 * poll syncing at the same time never double-notify.
 */
export async function syncMandateFromCashfree(row: UserSubscription, cfSub: MandateSnapshot): Promise<UserSubscription> {
  const status = String(cfSub.subscription_status || row.mandateStatus || 'INITIALIZED').toUpperCase();
  const auth = authorisationOf(cfSub);
  const now = new Date();
  const autoRenew = MANDATE_CHARGING_STATUSES.has(status);
  const nextChargeAt = parseDate(cfSub.next_schedule_date);
  const patch: Partial<UserSubscription> = {
    mandateStatus: status,
    autoRenew,
    updatedAt: now,
    ...(auth?.payment_group ? { mandatePaymentMethod: String(auth.payment_group).toLowerCase() } : {}),
    ...(auth?.authorization_status === 'ACTIVE' && !row.mandateAuthorizedAt ? { mandateAuthorizedAt: now } : {}),
    ...(nextChargeAt ? { nextChargeAt } : {}),
    ...(MANDATE_ENDED_STATUSES.has(status) && !row.autoRenewCancelledAt ? { autoRenewCancelledAt: now } : {}),
  };

  const [updated] = await db.update(userSubscriptions).set(patch)
    .where(and(
      eq(userSubscriptions.id, row.id),
      row.mandateStatus ? eq(userSubscriptions.mandateStatus, row.mandateStatus) : isNull(userSubscriptions.mandateStatus),
    ))
    .returning();
  if (!updated) {
    // Someone else synced first — their events stand
    return (await getSubscriptionRowById(row.id)) || row;
  }

  if (status !== row.mandateStatus) {
    logger.info(`Mandate ${row.cashfreeSubscriptionId} ${row.mandateStatus || '(new)'} → ${status} (user ${row.userId})`, undefined, SOURCE);
  }
  if (!row.autoRenew && status === 'ACTIVE') {
    await notifyAutoRenewEnabled(updated, cfSub);
  } else if (row.autoRenew && MANDATE_ENDED_STATUSES.has(status)) {
    await notifyAutoRenewDisabled(updated);
  }
  return updated;
}

async function notifyAutoRenewEnabled(row: UserSubscription, cfSub: MandateSnapshot): Promise<void> {
  try {
    const [plan, user] = await Promise.all([storage.getPlan(row.planId), storage.getUser(row.userId)]);
    if (!plan || !user) return;
    const billingPeriod = row.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
    const planAmount = toNumber(cfSub.plan_details?.plan_amount);
    const amount = planAmount > 0 ? planAmount : (await quoteFor(user, planListPrice(plan, billingPeriod))).total;
    await dispatchEvent('auto_renew_enabled', {
      userId: row.userId,
      data: {
        planName: plan.displayName, planId: plan.id, billingPeriod, amount: amount.toFixed(2), currency: 'INR',
        nextChargeAt: row.nextChargeAt || row.currentPeriodEnd, paymentMethod: mandateMethodLabel(row.mandatePaymentMethod),
        subscriptionId: row.cashfreeSubscriptionId,
      },
    });
  } catch (error) {
    logger.error(`Failed to dispatch auto_renew_enabled for user ${row.userId}`, error, SOURCE);
  }
}

export async function notifyAutoRenewDisabled(row: UserSubscription): Promise<void> {
  try {
    const plan = await storage.getPlan(row.planId);
    await dispatchEvent('auto_renew_disabled', {
      userId: row.userId,
      data: { planName: plan?.displayName || 'your', planId: row.planId, expiresAt: row.currentPeriodEnd, subscriptionId: row.cashfreeSubscriptionId },
    });
  } catch (error) {
    logger.error(`Failed to dispatch auto_renew_disabled for user ${row.userId}`, error, SOURCE);
  }
}

/**
 * CANCEL at Cashfree. Tolerates a mandate that is already gone (404) or already ended; any other failure is
 * re-thrown so we never turn auto-renew off locally while Cashfree could still charge.
 */
async function cancelAtCashfree(cashfreeSubscriptionId: string): Promise<void> {
  try {
    await manageSubscription(cashfreeSubscriptionId, 'CANCEL');
  } catch (error: any) {
    if (error instanceof CashfreeApiError && error.status === 404) return;
    if (error instanceof CashfreeApiError && error.status >= 400 && error.status < 500) {
      const current = await getSubscription(cashfreeSubscriptionId);
      if (MANDATE_ENDED_STATUSES.has(String(current.subscription_status).toUpperCase())) return;
      throw new MandateRequestError(`Cashfree could not cancel the mandate: ${error.message}`, 502);
    }
    throw new MandateRequestError(error instanceof CashfreeApiError ? error.message : 'Failed to cancel the Cashfree subscription', 502);
  }
}

/** Turns auto-renew off: cancels the mandate at Cashfree, marks the row, notifies. The paid period stays active. */
export async function cancelMandate(userId: string): Promise<{ currentPeriodEnd: Date; alreadyOff: boolean }> {
  const sub = await storage.getUserSubscription(userId);
  if (!sub) throw new MandateRequestError('No subscription found', 404);
  const row = sub as UserSubscription;
  if (!row.cashfreeSubscriptionId) throw new MandateRequestError('Auto-renew is not set up for this plan');
  const alreadyOff = !row.autoRenew && MANDATE_ENDED_STATUSES.has(row.mandateStatus || '');
  if (!alreadyOff) {
    await cancelAtCashfree(row.cashfreeSubscriptionId);
    await updateRow(row.id, { autoRenew: false, mandateStatus: 'CANCELLED', autoRenewCancelledAt: new Date() });
    logger.info(`Auto-renew cancelled by user ${userId} (mandate ${row.cashfreeSubscriptionId})`, undefined, SOURCE);
    await notifyAutoRenewDisabled({ ...row, autoRenew: false, mandateStatus: 'CANCELLED' });
  }
  return { currentPeriodEnd: new Date(row.currentPeriodEnd), alreadyOff };
}

export interface MandateStatusView {
  subscriptionId: string | null;
  cfSubscriptionId: string | null;
  status: string | null;
  authorizationStatus: string | null;
  mandateStatus: string | null;
  autoRenew: boolean;
  paymentMethod: string | null;
  nextChargeAt: Date | null;
  planName: string | null;
  billingPeriod: string;
  amount: number | null;
  currentPeriodEnd: Date;
}

/** Fetches the mandate from Cashfree, syncs the row and returns the client-facing view. */
export async function fetchAndSyncMandate(row: UserSubscription): Promise<MandateStatusView> {
  if (!row.cashfreeSubscriptionId) throw new MandateRequestError('Auto-renew is not set up for this plan', 404);
  const cfSub = await getSubscription(row.cashfreeSubscriptionId);
  const updated = await syncMandateFromCashfree(row, cfSub);
  const [plan, user] = await Promise.all([
    db.select().from(plans).where(eq(plans.id, updated.planId)).limit(1).then(r => r[0]),
    db.select().from(users).where(eq(users.id, updated.userId)).limit(1).then(r => r[0]),
  ]);
  const billingPeriod = updated.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
  const planAmount = toNumber(cfSub.plan_details?.plan_amount);
  const amount = planAmount > 0 ? planAmount : (plan && user ? (await quoteFor(user, planListPrice(plan, billingPeriod))).total : null);
  return {
    subscriptionId: updated.cashfreeSubscriptionId,
    cfSubscriptionId: updated.cfSubscriptionId,
    status: cfSub.subscription_status || updated.mandateStatus,
    authorizationStatus: authorisationOf(cfSub)?.authorization_status || null,
    mandateStatus: updated.mandateStatus,
    autoRenew: updated.autoRenew,
    paymentMethod: updated.mandatePaymentMethod,
    nextChargeAt: updated.nextChargeAt,
    planName: plan?.displayName || null,
    billingPeriod,
    amount,
    currentPeriodEnd: updated.currentPeriodEnd,
  };
}
