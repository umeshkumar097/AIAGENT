'use strict';
/**
 * Cashfree handlers — order finalisation, webhook events and admin refunds.
 * All money → credits/plan/phone/invoice work is delegated to billingService (module B).
 */

import crypto from 'crypto';
import { and, eq, gt, sql } from 'drizzle-orm';
import { db } from '../../../../db';
import { paymentTransactions, userSubscriptions, users, type PaymentTransaction, type Refund } from '@shared/schema';
import { storage } from '../../../../storage';
import { billingService } from '../../../../services/billing-service';
import { applyRefund } from '../../../../services/credit-service';
import { PlivoPhoneService } from '../../../plivo/services/plivo-phone.service';
import { logger } from '../../../../utils/logger';
import {
  CashfreeApiError,
  createRefund,
  describePaymentMethod,
  getOrder,
  getOrderPayments,
  type CashfreePayment,
} from './service';
import { handleSubscriptionWebhook, isSubscriptionWebhook } from './subscription-webhooks';

export const CASHFREE_GATEWAY = 'cashfree';

export interface CashfreeWebhookPayload {
  type?: string;
  event_time?: string;
  data?: {
    order?: { order_id?: string; order_amount?: number; order_currency?: string; order_tags?: Record<string, string> | null };
    payment?: CashfreePayment & { error_details?: { error_reason?: string; error_description?: string } | null };
    refund?: {
      cf_refund_id?: string | number;
      refund_id?: string;
      order_id?: string;
      refund_amount?: number;
      refund_status?: string;
      refund_note?: string;
    };
    error_details?: { error_reason?: string; error_description?: string } | null;
    /** SUBSCRIPTION_* events (see subscription-webhooks.ts) */
    subscription_details?: Record<string, unknown> | null;
    authorization_details?: Record<string, unknown> | null;
    payment_details?: Record<string, unknown> | null;
    [key: string]: unknown;
  };
}

export async function getTransactionByOrderId(orderId: string): Promise<PaymentTransaction | undefined> {
  const [transaction] = await db
    .select()
    .from(paymentTransactions)
    .where(and(eq(paymentTransactions.gateway, CASHFREE_GATEWAY), eq(paymentTransactions.gatewayOrderId, orderId)))
    .limit(1);
  return transaction;
}

function pickSuccessfulPayment(payments: CashfreePayment[]): CashfreePayment | undefined {
  return payments.find((p) => p.payment_status === 'SUCCESS');
}

function pickLatestPayment(payments: CashfreePayment[]): CashfreePayment | undefined {
  if (payments.length === 0) return undefined;
  return [...payments].sort((a, b) => {
    const ta = a.payment_time ? Date.parse(a.payment_time) : 0;
    const tb = b.payment_time ? Date.parse(b.payment_time) : 0;
    return tb - ta;
  })[0];
}

export interface OrderSyncResult {
  orderStatus: string;
  paymentStatus: string | null;
  transactionId?: string;
  invoiceId?: string;
  alreadyCompleted?: boolean;
}

/**
 * Verifies the order with Cashfree and finalises it (idempotently) when PAID.
 */
export async function syncOrderWithCashfree(orderId: string): Promise<OrderSyncResult> {
  const order = await getOrder(orderId);
  let payments: CashfreePayment[] = [];
  try {
    payments = await getOrderPayments(orderId);
  } catch (error: any) {
    // Payments list is optional for non-PAID orders; for PAID we need it (retry below)
    if (order.order_status === 'PAID') throw error;
    logger.warn(`Could not list payments for ${orderId}: ${error?.message}`, undefined, 'Cashfree');
  }

  const latest = pickLatestPayment(payments);
  const result: OrderSyncResult = {
    orderStatus: order.order_status,
    paymentStatus: latest?.payment_status || null,
  };

  if (order.order_status !== 'PAID') {
    return result;
  }

  const success = pickSuccessfulPayment(payments) || latest;
  const completion = await billingService.completePurchase({
    gatewayOrderId: orderId,
    gatewayPaymentId: success ? String(success.cf_payment_id) : `order:${order.cf_order_id}`,
    paymentMethod: describePaymentMethod(success),
    paidAmount: success?.payment_amount ?? order.order_amount,
  });

  result.paymentStatus = 'SUCCESS';
  result.transactionId = completion.transactionId;
  result.invoiceId = completion.invoiceId;
  result.alreadyCompleted = completion.alreadyCompleted;
  if (!completion.alreadyCompleted) {
    logger.info(`Order ${orderId} finalised via status poll (txn ${completion.transactionId})`, undefined, 'Cashfree');
  }
  return result;
}

export interface WebhookHandleResult {
  action: 'completed' | 'already_completed' | 'failed' | 'refund_recorded' | 'refund_ignored' | 'ignored'
    | 'mandate_synced' | 'renewed' | 'renewal_failed';
  orderId?: string;
  transactionId?: string;
}

/**
 * Processes a verified Cashfree webhook payload. Idempotent on (order_id, cf_payment_id).
 */
export async function handleCashfreeWebhook(payload: CashfreeWebhookPayload): Promise<WebhookHandleResult> {
  const type = payload?.type || '';
  if (isSubscriptionWebhook(type)) return handleSubscriptionWebhook(payload);
  const data = payload?.data || {};
  const orderId = data.order?.order_id || data.refund?.order_id || data.payment?.order_id;

  switch (type) {
    case 'PAYMENT_SUCCESS_WEBHOOK': {
      if (!orderId || !data.payment) {
        logger.warn('PAYMENT_SUCCESS_WEBHOOK without order/payment data', undefined, 'Cashfree');
        return { action: 'ignored' };
      }
      if (!(await getTransactionByOrderId(orderId))) {
        // Not ours (other environment / manually created order) — acknowledge so Cashfree stops retrying
        logger.warn(`PAYMENT_SUCCESS_WEBHOOK for unknown order ${orderId}; ignoring`, undefined, 'Cashfree');
        return { action: 'ignored', orderId };
      }
      // Fulfilment (credits / plan / Plivo number rental) runs ONLY for a SUCCESS payment — never for a
      // pending/failed payment that happened to arrive under this event type
      if (data.payment.payment_status && data.payment.payment_status !== 'SUCCESS') {
        logger.warn(`PAYMENT_SUCCESS_WEBHOOK for ${orderId} carries payment_status=${data.payment.payment_status}; ignoring`, undefined, 'Cashfree');
        return { action: 'ignored', orderId };
      }
      const completion = await billingService.completePurchase({
        gatewayOrderId: orderId,
        gatewayPaymentId: String(data.payment.cf_payment_id),
        paymentMethod: describePaymentMethod(data.payment),
        paidAmount: data.payment.payment_amount,
      });
      return {
        action: completion.alreadyCompleted ? 'already_completed' : 'completed',
        orderId,
        transactionId: completion.transactionId,
      };
    }

    case 'PAYMENT_FAILED_WEBHOOK':
    case 'PAYMENT_USER_DROPPED_WEBHOOK': {
      if (!orderId) return { action: 'ignored' };
      const reason =
        data.payment?.error_details?.error_description ||
        data.error_details?.error_description ||
        data.payment?.payment_message ||
        (type === 'PAYMENT_USER_DROPPED_WEBHOOK' ? 'Customer abandoned the payment' : 'Payment failed');
      await billingService.failPurchase(orderId, reason);
      return { action: 'failed', orderId };
    }

    case 'REFUND_STATUS_WEBHOOK': {
      const refund = data.refund;
      if (!orderId || !refund) return { action: 'ignored' };
      logger.info(
        `Refund ${refund.cf_refund_id ?? refund.refund_id} for order ${orderId}: ${refund.refund_status}`,
        undefined,
        'Cashfree',
      );
      if (refund.refund_status !== 'SUCCESS') {
        return { action: 'refund_ignored', orderId };
      }
      const transaction = await getTransactionByOrderId(orderId);
      if (!transaction) {
        logger.warn(`Refund webhook for unknown order ${orderId}`, undefined, 'Cashfree');
        return { action: 'refund_ignored', orderId };
      }
      const cfRefundId = String(refund.cf_refund_id ?? refund.refund_id ?? '');
      const existing = await storage.getTransactionRefunds(transaction.id);
      const known = existing.find(
        (r) => r.gatewayRefundId && (r.gatewayRefundId === cfRefundId || r.gatewayRefundId === refund.refund_id),
      );
      if (known) {
        if (known.status !== 'completed') {
          await storage.updateRefund(known.id, { status: 'completed', processedAt: new Date() });
        }
        return { action: 'refund_ignored', orderId, transactionId: transaction.id };
      }
      // Refund initiated outside the app (Cashfree dashboard) → record it now
      const amount = Number(refund.refund_amount || 0);
      if (amount <= 0) return { action: 'refund_ignored', orderId, transactionId: transaction.id };
      await recordRefundLocally({
        transaction,
        amount,
        cfRefundId,
        reason: refund.refund_note || 'gateway_refund',
        initiatedBy: 'gateway',
      });
      return { action: 'refund_recorded', orderId, transactionId: transaction.id };
    }

    default:
      logger.info(`Ignoring Cashfree webhook type ${type || '(none)'}`, undefined, 'Cashfree');
      return { action: 'ignored', orderId };
  }
}

interface RecordRefundLocallyInput {
  transaction: PaymentTransaction;
  amount: number;
  cfRefundId: string;
  reason: string;
  initiatedBy: 'admin' | 'gateway';
  adminId?: string | null;
  adminNote?: string | null;
  customerNote?: string | null;
  /** refunds row already inserted (status pending) the moment Cashfree accepted the refund */
  refundRowId?: string;
}

interface RecordRefundLocallyResult {
  refund: Refund;
  creditNoteId?: string;
  creditsReversed: number | null;
}

/**
 * Side effects of a FULL refund (partial refunds change nothing):
 *  - plan purchase → the paid period ends now (status stays 'active'; the expiry cron marks it expired)
 *  - phone number → the number is released via PlivoPhoneService.releaseNumber
 * Returns human-readable notes for the refund record.
 */
async function applyFullRefundEffects(transaction: PaymentTransaction, cfRefundId: string): Promise<string[]> {
  const latest = await storage.getPaymentTransaction(transaction.id);
  if (!latest || latest.status !== 'refunded') return [];
  const notes: string[] = [];
  const now = new Date();

  if (latest.type === 'subscription' && latest.subscriptionId) {
    const [ended] = await db.update(userSubscriptions)
      .set({ currentPeriodEnd: now, updatedAt: now })
      .where(and(
        eq(userSubscriptions.id, latest.subscriptionId),
        eq(userSubscriptions.status, 'active'),
        gt(userSubscriptions.currentPeriodEnd, now),
      ))
      .returning({ id: userSubscriptions.id });
    if (ended) {
      await db.update(users)
        .set({ planExpiresAt: now, updatedAt: now })
        .where(and(eq(users.id, latest.userId), gt(users.planExpiresAt, now)));
      notes.push(`Full refund ${cfRefundId}: plan period ended ${now.toISOString()} (subscription ${ended.id}; expiry cron downgrades the plan)`);
      logger.info(`Plan period ended after full refund of txn ${latest.id}`, { subscriptionId: ended.id }, 'Cashfree');
    }
  }

  if (latest.type === 'phone_number' && latest.phoneNumberId) {
    try {
      const number = await PlivoPhoneService.getPhoneNumberById(latest.phoneNumberId);
      if (number && number.status !== 'released' && number.userId === latest.userId) {
        await PlivoPhoneService.releaseNumber(number.id);
        notes.push(`Full refund ${cfRefundId}: phone number ${number.phoneNumber} released`);
        logger.info(`Released phone number ${number.phoneNumber} after full refund of txn ${latest.id}`, undefined, 'Cashfree');
      }
    } catch (error) {
      logger.error(`Could not release phone number ${latest.phoneNumberId} after full refund of txn ${latest.id}`, error, 'Cashfree');
      notes.push(`Full refund ${cfRefundId}: phone number release FAILED — release it manually`);
    }
  }
  return notes;
}

/**
 * Shared bookkeeping after Cashfree has accepted a refund:
 * refunds row (pending) → billingService.recordRefund (txn status + credit note + event) → credit reversal
 * → full-refund effects → refunds row completed.
 * Serialised per transaction with a Postgres advisory lock so the admin path and REFUND_STATUS_WEBHOOK
 * never double-record the same refund; idempotent on the gateway refund id.
 */
async function recordRefundLocally(input: RecordRefundLocallyInput): Promise<RecordRefundLocallyResult> {
  const { transaction, amount, cfRefundId, reason } = input;

  return db.transaction(async (tx) => {
    await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtext(${`refund:${transaction.id}`}))`);

    const rows = await storage.getTransactionRefunds(transaction.id);
    let refund = rows.find((r) => input.refundRowId && r.id === input.refundRowId)
      || rows.find((r) => !!r.gatewayRefundId && r.gatewayRefundId === cfRefundId);
    if (refund && refund.status === 'completed') {
      const meta = (refund.metadata || {}) as { creditNoteId?: string };
      return { refund, creditNoteId: meta.creditNoteId, creditsReversed: refund.creditsReversed ?? null };
    }
    if (!refund) {
      refund = await storage.createRefund({
        transactionId: transaction.id,
        userId: transaction.userId,
        amount: amount.toFixed(2),
        currency: transaction.currency,
        gateway: CASHFREE_GATEWAY,
        gatewayRefundId: cfRefundId,
        reason,
        initiatedBy: input.initiatedBy,
        adminId: input.adminId || null,
        status: 'pending',
        creditsReversed: null,
        adminNote: input.adminNote || null,
        customerNote: input.customerNote || null,
        processedAt: null,
        metadata: null,
      });
    }

    const { creditNoteId } = await billingService.recordRefund(transaction.id, amount, cfRefundId, reason);

    let creditsReversed: number | null = null;
    if (transaction.type === 'credits' && transaction.creditsAwarded) {
      const ratio = amount / parseFloat(transaction.amount);
      const creditsToReverse = Math.floor(transaction.creditsAwarded * ratio);
      if (creditsToReverse > 0) {
        const reversal = await applyRefund({
          userId: transaction.userId,
          creditsToReverse,
          gateway: CASHFREE_GATEWAY,
          gatewayRefundId: cfRefundId,
          transactionId: transaction.id,
          reason,
        });
        if (reversal.success) {
          creditsReversed = reversal.creditsReversed;
        } else {
          logger.error(`Credit reversal failed for txn ${transaction.id}: ${reversal.error}`, undefined, 'Cashfree');
        }
      }
    }

    const effectNotes = await applyFullRefundEffects(transaction, cfRefundId);
    const adminNote = [input.adminNote || refund.adminNote, ...effectNotes].filter(Boolean).join(' | ') || null;
    const metadata = {
      ...((refund.metadata && typeof refund.metadata === 'object') ? (refund.metadata as Record<string, unknown>) : {}),
      ...(creditNoteId ? { creditNoteId } : {}),
      ...(effectNotes.length ? { fullRefundEffects: effectNotes } : {}),
    };
    await storage.updateRefund(refund.id, {
      status: 'completed',
      creditsReversed,
      adminNote,
      processedAt: new Date(),
      metadata: Object.keys(metadata).length ? metadata : null,
    });
    const updated = await storage.getRefund(refund.id);

    return { refund: updated || refund, creditNoteId, creditsReversed };
  });
}

export interface AdminRefundInput {
  transactionId: string;
  amount: number;
  reason?: string;
  /** users.id of the acting admin (null for admin team members without a user row) */
  adminId?: string | null;
  adminNote?: string | null;
  customerNote?: string | null;
}

export class RefundValidationError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'RefundValidationError';
    this.status = status;
  }
}

/**
 * Admin-initiated refund: validates, calls Cashfree, then records locally.
 */
export async function processCashfreeRefund(input: AdminRefundInput) {
  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new RefundValidationError('Valid refund amount is required');
  }

  const transaction = await storage.getPaymentTransaction(input.transactionId);
  if (!transaction) {
    throw new RefundValidationError('Transaction not found', 404);
  }
  if (transaction.gateway !== CASHFREE_GATEWAY || !transaction.gatewayOrderId) {
    throw new RefundValidationError('Only Cashfree transactions can be refunded here');
  }
  if (transaction.status === 'refunded') {
    throw new RefundValidationError('Transaction has already been fully refunded');
  }
  if (!['completed', 'partially_refunded', 'fulfilment_failed'].includes(transaction.status)) {
    throw new RefundValidationError('Only completed transactions can be refunded');
  }

  const transactionAmount = parseFloat(transaction.amount);
  const existingRefunds = await storage.getTransactionRefunds(transaction.id);
  const refundedFromRows = existingRefunds
    .filter((r) => r.status === 'completed' || r.status === 'pending' || r.status === 'processing')
    .reduce((sum, r) => sum + parseFloat(r.amount), 0);
  const refundedOnTxn = parseFloat(transaction.refundedAmount || '0') || 0;
  const alreadyRefunded = Math.max(refundedFromRows, refundedOnTxn);
  const available = Math.round((transactionAmount - alreadyRefunded) * 100) / 100;
  if (amount > available + 0.001) {
    throw new RefundValidationError(
      `Refund amount exceeds available balance. Maximum refundable: ${available.toFixed(2)} ${transaction.currency}`,
    );
  }

  const refundId = `rf_${crypto.randomBytes(6).toString('hex')}`;
  const reason = input.reason?.trim() || 'admin_request';

  let cfRefund;
  try {
    cfRefund = await createRefund(transaction.gatewayOrderId, {
      refund_id: refundId,
      refund_amount: Math.round(amount * 100) / 100,
      refund_note: reason.slice(0, 100),
    });
  } catch (error: any) {
    if (error instanceof CashfreeApiError) {
      throw new RefundValidationError(`Cashfree refund failed: ${error.message}`, 502);
    }
    throw error;
  }

  const cfRefundId = String(cfRefund.cf_refund_id || refundId);
  // Record the refund locally right away (pending) so a racing REFUND_STATUS_WEBHOOK finds it and only updates status
  const pendingRow = await storage.createRefund({
    transactionId: transaction.id,
    userId: transaction.userId,
    amount: amount.toFixed(2),
    currency: transaction.currency,
    gateway: CASHFREE_GATEWAY,
    gatewayRefundId: cfRefundId,
    reason,
    initiatedBy: 'admin',
    adminId: input.adminId || null,
    status: 'pending',
    creditsReversed: null,
    adminNote: input.adminNote || null,
    customerNote: input.customerNote || null,
    processedAt: null,
    metadata: { refundId, cfRefundStatus: cfRefund.refund_status ?? null },
  });
  const recorded = await recordRefundLocally({
    transaction,
    amount,
    cfRefundId,
    reason,
    initiatedBy: 'admin',
    adminId: input.adminId,
    adminNote: input.adminNote,
    customerNote: input.customerNote,
    refundRowId: pendingRow.id,
  });

  logger.info(
    `Admin ${input.adminId || 'team-member'} refunded ${amount} ${transaction.currency} on txn ${transaction.id} (cf_refund ${cfRefundId})`,
    undefined,
    'Cashfree',
  );

  return {
    refund: recorded.refund,
    cfRefundId,
    cfRefundStatus: cfRefund.refund_status,
    creditNoteId: recorded.creditNoteId || null,
    creditsReversed: recorded.creditsReversed,
  };
}
