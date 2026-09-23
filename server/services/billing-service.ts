'use strict';
/**
 * Billing facade — the ONLY place that turns a payment into credits / plan / phone number + invoice + events.
 *
 * Flow (Cashfree, one-time payments):
 *   createPendingTransaction → (gateway collects payment) → completePurchase (idempotent on gatewayOrderId)
 *   → applies the purchase effect in ONE DB transaction → GST invoice → notification events.
 */
import { db } from '../db';
import { paymentTransactions, userSubscriptions, users, type PaymentTransaction } from '@shared/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { storage, type DbTransaction } from '../storage';
import { logger } from '../utils/logger';
import { dispatchEvent, type EventKey } from './event-dispatcher';
import { activateOrExtendSubscription, applyPlanCredits } from './membership-service';
import { invoiceService, resolveBuyerStateCode } from '../engines/payment/invoice-service';
import { computeGstForPrice, invoiceNumberToFilename, quotePrice, round2, type PriceQuote } from '../engines/payment/invoice-gst';
import { PlivoPhoneService } from '../engines/plivo/services/plivo-phone.service';

const SOURCE = 'BillingService';
const GATEWAY = 'cashfree';
/** Phone-number provisioning retries (webhook / status poll) before the transaction is parked as fulfilment_failed */
const MAX_FULFILMENT_ATTEMPTS = 3;

export type PurchaseType = 'credits' | 'plan' | 'phone_number';

export interface CreatePendingTransactionInput {
  userId: string;
  type: PurchaseType;
  /** INR amount, taken from the plan/package row — never from the client */
  amount: number;
  gatewayOrderId: string;
  planId?: string;
  billingPeriod?: 'monthly' | 'yearly';
  creditPackageId?: string;
  creditsAwarded?: number;
  phoneNumberId?: string;
  phoneNumber?: string;
  country?: string;
  description: string;
  /** Cashfree cf_subscription_id for mandate (auto-renew) charges */
  gatewaySubscriptionId?: string;
  /** Extra metadata merged into the row, e.g. { gst: PriceQuote, autoRenewRequested, recurring } */
  metadata?: Record<string, unknown>;
}

export interface RecurringChargeInput {
  userSubscriptionId: string;
  cfSubscriptionId: string;
  cfPaymentId: string;
  /** Amount Cashfree actually debited (INR) */
  amount: number;
  paymentMethod?: string;
  chargedAt?: Date;
}

export interface RecurringChargeFailureInput {
  userSubscriptionId: string;
  cfSubscriptionId: string;
  cfPaymentId: string;
  amount?: number;
  reason: string;
}

/** payment_transactions.gateway_order_id for a mandate charge (Cashfree has no order for these) */
export function recurringChargeOrderId(cfPaymentId: string): string {
  return `cfsub_${cfPaymentId}`;
}

export interface CompletePurchaseInput {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  paymentMethod?: string;
  paidAmount?: number;
}

export interface CompletePurchaseResult {
  transactionId: string;
  invoiceId?: string;
  alreadyCompleted: boolean;
  /** Payment was received but the purchase could not be fulfilled after MAX_FULFILMENT_ATTEMPTS (support must act) */
  fulfilmentFailed?: boolean;
  failureReason?: string | null;
}

/** payment_transactions.type values ('subscription' is the historical name for plan purchases) */
const TXN_TYPE: Record<PurchaseType, string> = { credits: 'credits', plan: 'subscription', phone_number: 'phone_number' };

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function metadataOf(txn: PaymentTransaction): Record<string, unknown> {
  return (txn.metadata && typeof txn.metadata === 'object') ? { ...(txn.metadata as Record<string, unknown>) } : {};
}

function purchaseTypeOf(txn: PaymentTransaction): PurchaseType {
  if (txn.type === 'credits') return 'credits';
  if (txn.type === 'phone_number') return 'phone_number';
  return 'plan';
}

/** Fire-and-forget notification; a failing email must never fail a payment. */
async function emit(eventKey: EventKey, userId: string, data: Record<string, unknown>, attachments?: { filename: string; content: Buffer; contentType?: string }[]): Promise<void> {
  try {
    await dispatchEvent(eventKey, { userId, data, attachments });
  } catch (error) {
    logger.error(`Failed to dispatch ${eventKey} for user ${userId}`, error, SOURCE);
  }
}

async function invoiceAttachment(invoiceId: string | null | undefined): Promise<{ filename: string; content: Buffer; contentType: string }[] | undefined> {
  if (!invoiceId) return undefined;
  try {
    const invoice = await storage.getInvoice(invoiceId);
    const pdf = await invoiceService.getInvoicePDF(invoiceId);
    if (!invoice || !pdf) return undefined;
    const label = invoice.invoiceType === 'credit_note' ? 'CreditNote' : 'Invoice';
    return [{ filename: `${label}-${invoiceNumberToFilename(invoice.invoiceNumber)}.pdf`, content: pdf, contentType: 'application/pdf' }];
  } catch (error) {
    logger.warn(`Could not attach invoice ${invoiceId}`, { error }, SOURCE);
    return undefined;
  }
}

interface EffectResult {
  events: { key: EventKey; data: Record<string, unknown> }[];
  subscriptionId?: string;
  phoneNumberId?: string;
}

/** Applies credits / plan inside the claim transaction (phone numbers are bought after commit). */
async function applyEffectInTx(tx: DbTransaction, txn: PaymentTransaction): Promise<EffectResult> {
  const kind = purchaseTypeOf(txn);
  const amount = toNumber(txn.amount);

  if (kind === 'credits') {
    const credits = txn.creditsAwarded || 0;
    if (credits <= 0) throw new Error(`Transaction ${txn.id} has no creditsAwarded`);
    await storage.addCreditsAtomic(txn.userId, credits, txn.description, `cashfree_${txn.gatewayOrderId}`, tx);
    const [balanceRow] = await tx.select({ credits: users.credits }).from(users).where(eq(users.id, txn.userId)).limit(1);
    return { events: [{ key: 'credits_added', data: { credits, amount, description: txn.description, balance: balanceRow?.credits ?? null } }] };
  }

  if (kind === 'plan') {
    if (!txn.planId) throw new Error(`Transaction ${txn.id} has no planId`);
    const billingPeriod = txn.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
    const activation = await activateOrExtendSubscription({
      userId: txn.userId, planId: txn.planId, billingPeriod, cashfreeOrderId: txn.gatewayOrderId || txn.id,
    }, tx);
    const credits = await applyPlanCredits(txn.userId, txn.planId, GATEWAY, txn.id, tx, billingPeriod);
    await tx.update(paymentTransactions).set({ subscriptionId: activation.subscription.id }).where(eq(paymentTransactions.id, txn.id));
    return {
      subscriptionId: activation.subscription.id,
      events: [{
        key: activation.renewed ? 'plan_renewed' : 'plan_activated',
        data: {
          planName: activation.plan.displayName, planId: activation.plan.id, billingPeriod,
          periodStart: activation.periodStart.toISOString(), periodEnd: activation.periodEnd.toISOString(),
          expiresAt: activation.periodEnd.toISOString(), credits, amount,
        },
      }],
    };
  }

  // phone_number: nothing to do inside the DB transaction — the Plivo purchase happens after commit
  return { events: [] };
}

async function purchasePhoneNumberAfterCommit(txn: PaymentTransaction): Promise<EffectResult> {
  const meta = metadataOf(txn);
  const phoneNumber = typeof meta.phoneNumber === 'string' ? meta.phoneNumber : '';
  const country = typeof meta.country === 'string' ? meta.country : '';
  if (!phoneNumber || !country) throw new Error(`Transaction ${txn.id} is missing metadata.phoneNumber / metadata.country`);
  const row = await PlivoPhoneService.purchaseNumberPaid({ userId: txn.userId, phoneNumber, country, transactionId: txn.id });
  await storage.updatePaymentTransaction(txn.id, { phoneNumberId: row.id });
  return {
    phoneNumberId: row.id,
    events: [{
      key: 'phone_number_purchased',
      data: {
        phoneNumber: row.phoneNumber, country: row.country, phoneNumberId: row.id, status: row.status,
        amount: toNumber(txn.amount), nextBillingDate: row.nextBillingDate ? new Date(row.nextBillingDate).toISOString() : null,
      },
    }],
  };
}

/**
 * Pending-transaction input for a mandate charge: plan price from the subscription row, GST quoted for the
 * user's current state. When the debited amount differs from the quote (plan price changed after the mandate
 * was set up) the invoice is derived from the paid amount instead, so it always matches the money received.
 */
async function recurringPendingInput(userSubscriptionId: string, cfSubscriptionId: string, paidAmount?: number): Promise<Omit<CreatePendingTransactionInput, 'gatewayOrderId'> & { metadata: Record<string, unknown> }> {
  const [row] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.id, userSubscriptionId)).limit(1);
  if (!row) throw new Error(`Subscription not found: ${userSubscriptionId}`);
  const [plan, user] = await Promise.all([storage.getPlan(row.planId), storage.getUser(row.userId)]);
  if (!plan) throw new Error(`Plan not found: ${row.planId}`);
  if (!user) throw new Error(`User not found: ${row.userId}`);
  const billingPeriod = row.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
  const listPrice = toNumber(billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice);
  let gst: PriceQuote = await quotePrice(listPrice, resolveBuyerStateCode(user));
  if (paidAmount !== undefined && Math.abs(gst.total - paidAmount) > 0.01) {
    logger.warn(`Mandate charge ${paidAmount} differs from the quoted ${gst.total} for subscription ${row.id}; invoicing the paid amount`, undefined, SOURCE);
    gst = { ...gst, ...computeGstForPrice(paidAmount, gst.taxRate, gst.isInterState, true), listPrice: paidAmount, pricesIncludeGst: true };
  }
  return {
    userId: row.userId, type: 'plan', amount: paidAmount ?? gst.total, planId: plan.id, billingPeriod,
    description: `${plan.displayName} plan (${billingPeriod}) auto-renewal`,
    gatewaySubscriptionId: cfSubscriptionId,
    metadata: { gst, userSubscriptionId: row.id, cashfreeSubscriptionId: row.cashfreeSubscriptionId },
  };
}

export const billingService = {
  async createPendingTransaction(input: CreatePendingTransactionInput): Promise<{ transactionId: string }> {
    if (!input.userId || !input.gatewayOrderId) throw new Error('userId and gatewayOrderId are required');
    if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error('amount must be a positive number');
    if (input.type === 'plan' && !input.planId) throw new Error('planId is required for plan purchases');
    if (input.type === 'credits' && (!input.creditsAwarded || input.creditsAwarded <= 0)) throw new Error('creditsAwarded is required for credit purchases');
    if (input.type === 'phone_number' && (!input.phoneNumber || !input.country)) throw new Error('phoneNumber and country are required for phone number purchases');

    const existing = await storage.getPaymentTransactionByOrderId(input.gatewayOrderId);
    if (existing) return { transactionId: existing.id };

    const created = await storage.createPaymentTransaction({
      userId: input.userId,
      type: TXN_TYPE[input.type],
      gateway: GATEWAY,
      gatewayOrderId: input.gatewayOrderId,
      amount: round2(input.amount).toFixed(2),
      currency: 'INR',
      planId: input.planId || null,
      creditPackageId: input.creditPackageId || null,
      billingPeriod: input.billingPeriod || null,
      creditsAwarded: input.creditsAwarded || null,
      phoneNumberId: input.phoneNumberId || null,
      gatewaySubscriptionId: input.gatewaySubscriptionId || null,
      description: input.description,
      status: 'pending',
      metadata: {
        ...(input.metadata || {}),
        purchaseType: input.type,
        ...(input.phoneNumber ? { phoneNumber: input.phoneNumber } : {}),
        ...(input.country ? { country: input.country.toUpperCase() } : {}),
      },
    });
    logger.info(`Pending ${input.type} transaction ${created.id} for order ${input.gatewayOrderId}`, { userId: input.userId, amount: input.amount }, SOURCE);
    return { transactionId: created.id };
  },

  /** Idempotent: a second call for the same gatewayOrderId returns { alreadyCompleted: true } */
  async completePurchase(input: CompletePurchaseInput): Promise<CompletePurchaseResult> {
    const txn = await storage.getPaymentTransactionByOrderId(input.gatewayOrderId);
    if (!txn) throw new Error(`Transaction not found for order ${input.gatewayOrderId}`);
    if (['completed', 'refunded', 'partially_refunded'].includes(txn.status)) {
      return { transactionId: txn.id, invoiceId: txn.invoiceId || undefined, alreadyCompleted: true };
    }
    if (txn.status === 'fulfilment_failed') {
      // Money was received but provisioning gave up — never retry automatically; support resolves it
      return { transactionId: txn.id, invoiceId: txn.invoiceId || undefined, alreadyCompleted: true, fulfilmentFailed: true, failureReason: txn.failureReason || null };
    }

    const expected = toNumber(txn.amount);
    if (input.paidAmount !== undefined && Number.isFinite(input.paidAmount) && input.paidAmount < expected - 0.01) {
      throw new Error(`Paid amount ${input.paidAmount} is less than the order amount ${expected} for ${input.gatewayOrderId}`);
    }

    const now = new Date();
    const claim = await db.transaction(async (tx) => {
      const [claimed] = await tx.update(paymentTransactions)
        .set({
          status: 'completed',
          gatewayTransactionId: input.gatewayPaymentId,
          paymentMethod: input.paymentMethod || null,
          failureReason: null,
          completedAt: now,
          updatedAt: now,
          metadata: { ...metadataOf(txn), paidAmount: input.paidAmount ?? expected, lastError: undefined },
        })
        .where(and(eq(paymentTransactions.id, txn.id), inArray(paymentTransactions.status, ['pending', 'failed'])))
        .returning();
      if (!claimed) return null; // another call finalised this order first
      const effect = await applyEffectInTx(tx, claimed);
      return { claimed, effect };
    });

    if (!claim) {
      const latest = await storage.getPaymentTransaction(txn.id);
      return { transactionId: txn.id, invoiceId: latest?.invoiceId || undefined, alreadyCompleted: true };
    }

    let { effect } = claim;
    const { claimed } = claim;
    if (purchaseTypeOf(claimed) === 'phone_number') {
      try {
        effect = await purchasePhoneNumberAfterCommit(claimed);
      } catch (error: any) {
        const message = String(error?.message || error);
        const meta = metadataOf(claimed);
        const attempts = (typeof meta.fulfilmentAttempts === 'number' ? meta.fulfilmentAttempts : 0) + 1;
        if (attempts >= MAX_FULFILMENT_ATTEMPTS) {
          // Give up: the payment stays recorded (money was received) but nothing retries this order any more
          await storage.updatePaymentTransaction(claimed.id, {
            status: 'fulfilment_failed',
            failureReason: `Phone number provisioning failed after ${attempts} attempts: ${message}`.slice(0, 500),
            metadata: { ...meta, fulfilmentAttempts: attempts, lastError: message },
          });
          console.error(`[ADMIN ALERT] Phone number fulfilment failed for Cashfree order ${input.gatewayOrderId} (transaction ${claimed.id}, user ${claimed.userId}) after ${attempts} attempts: ${message}. Provision the number manually or refund the transaction.`);
          logger.error(`ADMIN ALERT: phone number fulfilment failed for order ${input.gatewayOrderId}; transaction ${claimed.id} marked fulfilment_failed`, error, SOURCE);
          await emit('payment_failed', claimed.userId, {
            transactionId: claimed.id, orderId: claimed.gatewayOrderId, amount: expected, currency: claimed.currency,
            description: claimed.description, purchaseType: 'phone_number',
            reason: 'Your payment was received, but we could not provision the phone number automatically. Our support team has been notified and will activate the number or refund you shortly.',
          });
          return { transactionId: claimed.id, alreadyCompleted: false, fulfilmentFailed: true, failureReason: message };
        }
        // Roll back to pending so the next webhook / status poll retries the (idempotent) purchase
        await storage.updatePaymentTransaction(claimed.id, {
          status: 'pending', completedAt: null,
          metadata: { ...meta, fulfilmentAttempts: attempts, lastError: message },
        });
        logger.error(`Phone number purchase failed for order ${input.gatewayOrderId} (attempt ${attempts}/${MAX_FULFILMENT_ATTEMPTS}); transaction reverted to pending`, error, SOURCE);
        throw error;
      }
    }

    logger.info(`Purchase completed for order ${input.gatewayOrderId}`, { transactionId: claimed.id, type: claimed.type }, SOURCE);

    let invoiceId: string | undefined;
    let invoiceNumber: string | undefined;
    try {
      const invoice = await invoiceService.generateInvoice(claimed.id);
      invoiceId = invoice.id;
      invoiceNumber = invoice.invoiceNumber;
    } catch (error) {
      logger.error(`Invoice generation failed for transaction ${claimed.id}`, error, SOURCE);
    }

    const attachments = await invoiceAttachment(invoiceId);
    const base = {
      transactionId: claimed.id, orderId: claimed.gatewayOrderId, paymentId: input.gatewayPaymentId,
      amount: expected, currency: claimed.currency, description: claimed.description,
      paymentMethod: input.paymentMethod || null, purchaseType: purchaseTypeOf(claimed),
      invoiceId: invoiceId || null, invoiceNumber: invoiceNumber || null, paidAt: now.toISOString(),
    };
    // One attachment per purchase: the PDF rides on invoice_created; purchase_completed only references the invoice number
    await emit('purchase_completed', claimed.userId, { ...base, ...(effect.events[0]?.data || {}) });
    for (const event of effect.events) {
      await emit(event.key, claimed.userId, { ...base, ...event.data });
    }
    if (invoiceId) {
      await emit('invoice_created', claimed.userId, { ...base }, attachments);
    }

    return { transactionId: claimed.id, invoiceId, alreadyCompleted: false };
  },

  async failPurchase(gatewayOrderId: string, reason: string): Promise<void> {
    const txn = await storage.getPaymentTransactionByOrderId(gatewayOrderId);
    if (!txn) {
      logger.warn(`failPurchase: no transaction for order ${gatewayOrderId}`, undefined, SOURCE);
      return;
    }
    if (txn.status !== 'pending') {
      logger.info(`failPurchase: order ${gatewayOrderId} is ${txn.status}; ignoring`, { reason }, SOURCE);
      return;
    }
    await storage.updatePaymentTransaction(txn.id, { status: 'failed', failureReason: reason.slice(0, 500) });
    logger.warn(`Payment failed for order ${gatewayOrderId}: ${reason}`, { transactionId: txn.id }, SOURCE);
    await emit('payment_failed', txn.userId, {
      transactionId: txn.id, orderId: gatewayOrderId, amount: toNumber(txn.amount), currency: txn.currency,
      description: txn.description, reason, purchaseType: purchaseTypeOf(txn),
    });
  },

  /**
   * A successful Cashfree mandate charge (SUBSCRIPTION_PAYMENT_SUCCESS): creates the recurring plan transaction
   * and finalises it through completePurchase (period extends from the current end, credits, invoice, events).
   * Idempotent on cfPaymentId.
   */
  async recordRecurringCharge(input: RecurringChargeInput): Promise<CompletePurchaseResult> {
    const gatewayOrderId = recurringChargeOrderId(input.cfPaymentId);
    const amount = round2(input.amount);
    if (!Number.isFinite(amount) || amount <= 0) throw new Error(`Recurring charge ${input.cfPaymentId} has no positive amount`);
    if (!(await storage.getPaymentTransactionByOrderId(gatewayOrderId))) {
      const pending = await recurringPendingInput(input.userSubscriptionId, input.cfSubscriptionId, amount);
      await billingService.createPendingTransaction({ ...pending, gatewayOrderId, metadata: { ...pending.metadata, recurring: true, cfPaymentId: input.cfPaymentId } });
    }
    return billingService.completePurchase({
      gatewayOrderId, gatewayPaymentId: input.cfPaymentId, paymentMethod: input.paymentMethod, paidAmount: amount,
    });
  },

  /** A failed mandate charge: one 'failed' transaction + payment_failed per cfPaymentId (Cashfree retries the charge). */
  async recordRecurringChargeFailure(input: RecurringChargeFailureInput): Promise<{ deduped: boolean; transactionId?: string }> {
    const gatewayOrderId = recurringChargeOrderId(input.cfPaymentId);
    const existing = await storage.getPaymentTransactionByOrderId(gatewayOrderId);
    if (existing) return { deduped: true, transactionId: existing.id };
    const pending = await recurringPendingInput(input.userSubscriptionId, input.cfSubscriptionId, input.amount);
    const { transactionId } = await billingService.createPendingTransaction({ ...pending, gatewayOrderId, metadata: { ...pending.metadata, recurring: true, cfPaymentId: input.cfPaymentId } });
    await billingService.failPurchase(gatewayOrderId, input.reason);
    return { deduped: false, transactionId };
  },

  /**
   * Records a gateway refund on the transaction and issues a credit note + refund_processed.
   * Does NOT reverse credits — the caller decides (credit-service.applyRefund).
   */
  async recordRefund(transactionId: string, amount: number, refundId: string, reason?: string): Promise<{ creditNoteId?: string }> {
    const txn = await storage.getPaymentTransaction(transactionId);
    if (!txn) throw new Error(`Transaction not found: ${transactionId}`);
    if (!['completed', 'partially_refunded', 'refunded', 'fulfilment_failed'].includes(txn.status)) {
      throw new Error(`Cannot refund a transaction with status ${txn.status}`);
    }
    const refundAmount = round2(amount);
    if (!Number.isFinite(refundAmount) || refundAmount <= 0) throw new Error('Refund amount must be positive');
    const total = toNumber(txn.amount);
    const alreadyRefunded = toNumber(txn.refundedAmount);
    const cumulative = round2(alreadyRefunded + refundAmount);
    if (cumulative > total + 0.01) {
      throw new Error(`Refund of ${refundAmount} exceeds the refundable balance ${round2(total - alreadyRefunded)}`);
    }

    const meta = metadataOf(txn);
    const refunds = Array.isArray(meta.refunds) ? [...(meta.refunds as unknown[])] : [];
    refunds.push({ refundId, amount: refundAmount, reason: reason || null, at: new Date().toISOString() });
    await storage.updatePaymentTransaction(txn.id, {
      refundedAmount: cumulative.toFixed(2),
      refundId,
      status: cumulative >= total - 0.005 ? 'refunded' : 'partially_refunded',
      metadata: { ...meta, refunds },
    });

    let creditNoteId: string | undefined;
    let creditNoteNumber: string | undefined;
    try {
      const note = await invoiceService.generateCreditNote({ transactionId: txn.id, amount: refundAmount, refundId, reason });
      creditNoteId = note.id;
      creditNoteNumber = note.invoiceNumber;
    } catch (error) {
      logger.error(`Credit note generation failed for transaction ${txn.id}`, error, SOURCE);
    }

    const original = txn.invoiceId ? await storage.getInvoice(txn.invoiceId) : undefined;
    await emit('refund_processed', txn.userId, {
      transactionId: txn.id, orderId: txn.gatewayOrderId, refundId, amount: refundAmount, currency: txn.currency,
      reason: reason || null, description: txn.description, totalRefunded: cumulative,
      invoiceNumber: original?.invoiceNumber || null, creditNoteId: creditNoteId || null, creditNoteNumber: creditNoteNumber || null,
    }, await invoiceAttachment(creditNoteId));

    logger.info(`Refund ${refundId} of ${refundAmount} recorded on transaction ${txn.id}`, { creditNoteNumber }, SOURCE);
    return { creditNoteId };
  },

  /** Admin top-up: credits + credits_added_by_admin (no invoice — nothing was sold) */
  async adminAddCredits(userId: string, credits: number, reason: string, adminId: string): Promise<void> {
    if (!Number.isInteger(credits) || credits <= 0) throw new Error('credits must be a positive integer');
    const user = await storage.getUser(userId);
    if (!user) throw new Error(`User not found: ${userId}`);
    const description = reason?.trim() || 'Credits added by admin';
    await storage.addCreditsAtomic(userId, credits, description, `admin_${adminId}_${Date.now()}_${nanoid(6)}`);
    const updated = await storage.getUser(userId);
    logger.info(`Admin ${adminId} added ${credits} credits to user ${userId}`, { reason: description }, SOURCE);
    await emit('credits_added_by_admin', userId, {
      credits, reason: description, balance: updated?.credits ?? (user.credits + credits), adminId,
    });
  },
};

