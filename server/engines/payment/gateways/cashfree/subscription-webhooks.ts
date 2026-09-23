'use strict';
/**
 * SUBSCRIPTION_* webhooks (Cashfree Subscriptions / mandates). Same endpoint + signature as order webhooks.
 *   SUBSCRIPTION_AUTH_STATUS / SUBSCRIPTION_STATUS_CHANGED → mandate sync (autoRenew, status, method, next charge)
 *   SUBSCRIPTION_PAYMENT_SUCCESS (CHARGE)                 → billingService.recordRecurringCharge (idempotent on cf_payment_id)
 *   SUBSCRIPTION_PAYMENT_FAILED                           → ON_HOLD + payment_failed once per cf_payment_id
 *   everything else                                       → logged and acknowledged
 * Payload shapes vary between events, so every field is read defensively (flat on data, or nested under
 * subscription_details / authorization_details / payment_details / payment).
 */

import { billingService, recurringChargeOrderId } from '../../../../services/billing-service';
import { logger } from '../../../../utils/logger';
import type { CashfreeWebhookPayload, WebhookHandleResult } from './handlers';
import {
  MANDATE_ENDED_STATUSES,
  getSubscriptionRowById,
  getSubscriptionRowByCashfreeId,
  syncMandateFromCashfree,
  type MandateSnapshot,
} from './subscriptions';

const SOURCE = 'Cashfree';
/** Mandate authorisation debits (₹1, refunded) are never invoiced */
const MAX_AUTH_AMOUNT_INR = 1;

type Dict = Record<string, unknown>;

function obj(value: unknown): Dict {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Dict) : {};
}

function str(value: unknown): string {
  if (value === null || value === undefined) return '';
  return typeof value === 'string' ? value.trim() : String(value);
}

function num(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value ?? ''));
  return Number.isFinite(n) ? n : 0;
}

export function isSubscriptionWebhook(type: string): boolean {
  return type.startsWith('SUBSCRIPTION_');
}

interface ParsedSubscriptionEvent {
  subscriptionId: string;
  cfSubscriptionId: string;
  snapshot: MandateSnapshot;
  cfPaymentId: string;
  amount: number;
  paymentType: string;
  paymentStatus: string;
  paymentMethod: string | undefined;
  reason: string;
  chargedAt: Date | undefined;
}

function parseEvent(payload: CashfreeWebhookPayload): ParsedSubscriptionEvent {
  const data = obj(payload.data);
  const details = obj(data.subscription_details);
  const payment = { ...obj(data.payment), ...obj(data.payment_details) };
  const pick = (key: string): unknown => data[key] ?? payment[key];
  const errorDetails = { ...obj(payment.error_details), ...obj(data.error_details) };

  const rawMethod = pick('payment_method');
  let paymentMethod: string | undefined;
  if (typeof rawMethod === 'string' && rawMethod) paymentMethod = rawMethod.toLowerCase();
  else if (rawMethod && typeof rawMethod === 'object') paymentMethod = Object.keys(rawMethod as Dict)[0]?.toLowerCase();
  if (!paymentMethod) paymentMethod = str(pick('payment_group')).toLowerCase() || undefined;

  const scheduled = str(pick('payment_initiated_date')) || str(pick('payment_schedule_date')) || str(payload.event_time);
  const chargedAt = scheduled ? new Date(scheduled) : undefined;

  return {
    subscriptionId: str(details.subscription_id) || str(data.subscription_id),
    cfSubscriptionId: str(details.cf_subscription_id) || str(data.cf_subscription_id),
    snapshot: {
      subscription_status: (str(details.subscription_status) || str(data.subscription_status)).toUpperCase(),
      next_schedule_date: str(details.next_schedule_date) || str(data.next_schedule_date) || null,
      authorization_details: Object.keys(obj(data.authorization_details)).length ? (data.authorization_details as MandateSnapshot['authorization_details']) : undefined,
    },
    cfPaymentId: str(pick('cf_payment_id')) || str(pick('payment_id')),
    amount: num(pick('payment_amount')),
    paymentType: str(pick('payment_type')).toUpperCase(),
    paymentStatus: str(pick('payment_status')).toUpperCase(),
    paymentMethod,
    reason: str(pick('payment_message')) || str(errorDetails.error_description) || str(errorDetails.error_reason),
    chargedAt: chargedAt && !Number.isNaN(chargedAt.getTime()) ? chargedAt : undefined,
  };
}

export async function handleSubscriptionWebhook(payload: CashfreeWebhookPayload): Promise<WebhookHandleResult> {
  const type = payload?.type || '';
  const event = parseEvent(payload);
  if (!event.subscriptionId) {
    logger.warn(`${type} without subscription_id; ignoring`, undefined, SOURCE);
    return { action: 'ignored' };
  }
  const row = await getSubscriptionRowByCashfreeId(event.subscriptionId);
  if (!row) {
    // Not ours (other environment / created outside the app) — acknowledge so Cashfree stops retrying
    logger.warn(`${type} for unknown subscription ${event.subscriptionId}; ignoring`, undefined, SOURCE);
    return { action: 'ignored', orderId: event.subscriptionId };
  }
  const cfSubscriptionId = event.cfSubscriptionId || row.cfSubscriptionId || '';
  // A missing/zero amount is NOT an auth debit: a real charge whose amount we failed to parse must
  // fail loudly (500 → Cashfree retries + alert) instead of being silently acknowledged as "mandate_synced".
  const isAuthPayment = event.paymentType === 'AUTH'
    || (event.paymentType !== 'CHARGE' && event.amount > 0 && event.amount <= MAX_AUTH_AMOUNT_INR);
  if (type === 'SUBSCRIPTION_PAYMENT_SUCCESS' && !isAuthPayment && !(event.amount > 0)) {
    throw new Error(`SUBSCRIPTION_PAYMENT_SUCCESS ${event.cfPaymentId || '?'} for ${event.subscriptionId} without a positive payment_amount`);
  }

  switch (type) {
    case 'SUBSCRIPTION_AUTH_STATUS':
    case 'SUBSCRIPTION_STATUS_CHANGED': {
      if (!event.snapshot.subscription_status) {
        logger.warn(`${type} for ${event.subscriptionId} without subscription_status; ignoring`, undefined, SOURCE);
        return { action: 'ignored', orderId: event.subscriptionId };
      }
      await syncMandateFromCashfree(row, event.snapshot);
      return { action: 'mandate_synced', orderId: event.subscriptionId };
    }

    case 'SUBSCRIPTION_PAYMENT_SUCCESS': {
      if (isAuthPayment) {
        // ₹1 mandate authorisation — sync the mandate state, never invoice it
        if (event.snapshot.subscription_status) await syncMandateFromCashfree(row, event.snapshot);
        return { action: 'mandate_synced', orderId: event.subscriptionId };
      }
      if (!event.cfPaymentId) {
        logger.warn(`SUBSCRIPTION_PAYMENT_SUCCESS for ${event.subscriptionId} without cf_payment_id; ignoring`, undefined, SOURCE);
        return { action: 'ignored', orderId: event.subscriptionId };
      }
      if (event.paymentStatus && event.paymentStatus !== 'SUCCESS') {
        logger.warn(`SUBSCRIPTION_PAYMENT_SUCCESS for ${event.subscriptionId} carries payment_status ${event.paymentStatus}; ignoring`, undefined, SOURCE);
        return { action: 'ignored', orderId: event.subscriptionId };
      }
      const completion = await billingService.recordRecurringCharge({
        userSubscriptionId: row.id,
        cfSubscriptionId,
        cfPaymentId: event.cfPaymentId,
        amount: event.amount,
        paymentMethod: event.paymentMethod,
        chargedAt: event.chargedAt,
      });
      // The charge landed: the mandate is charging (clears ON_HOLD) and the next charge date moves on
      const latest = (await getSubscriptionRowById(row.id)) || row;
      await syncMandateFromCashfree(latest, { ...event.snapshot, subscription_status: 'ACTIVE' });
      if (!completion.alreadyCompleted) {
        logger.info(`Auto-renewal charge ${event.cfPaymentId} (${event.amount} INR) applied for subscription ${event.subscriptionId}`, undefined, SOURCE);
      }
      return {
        action: completion.alreadyCompleted ? 'already_completed' : 'renewed',
        orderId: recurringChargeOrderId(event.cfPaymentId),
        transactionId: completion.transactionId,
      };
    }

    case 'SUBSCRIPTION_PAYMENT_FAILED': {
      if (isAuthPayment) {
        if (event.snapshot.subscription_status) await syncMandateFromCashfree(row, event.snapshot);
        return { action: 'mandate_synced', orderId: event.subscriptionId };
      }
      if (!event.cfPaymentId) {
        logger.warn(`SUBSCRIPTION_PAYMENT_FAILED for ${event.subscriptionId} without cf_payment_id; ignoring`, undefined, SOURCE);
        return { action: 'ignored', orderId: event.subscriptionId };
      }
      const failure = await billingService.recordRecurringChargeFailure({
        userSubscriptionId: row.id,
        cfSubscriptionId,
        cfPaymentId: event.cfPaymentId,
        amount: event.amount > MAX_AUTH_AMOUNT_INR ? event.amount : undefined,
        reason: event.reason || 'Auto-renewal charge failed',
      });
      // Cashfree retries the charge, so auto-renew stays on; a terminal status from Cashfree wins over ON_HOLD
      const status = MANDATE_ENDED_STATUSES.has(event.snapshot.subscription_status) ? event.snapshot.subscription_status : 'ON_HOLD';
      await syncMandateFromCashfree(row, { ...event.snapshot, subscription_status: status });
      return { action: 'renewal_failed', orderId: recurringChargeOrderId(event.cfPaymentId), transactionId: failure.transactionId };
    }

    default:
      logger.info(`Ignoring Cashfree subscription webhook ${type} for ${event.subscriptionId}`, undefined, SOURCE);
      return { action: 'ignored', orderId: event.subscriptionId };
  }
}
