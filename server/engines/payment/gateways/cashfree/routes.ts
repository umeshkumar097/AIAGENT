'use strict';
/**
 * Cashfree Routes — mounted at /api/cashfree
 *   GET  /config                     (auth)   → { enabled, appId, environment }
 *   GET  /quote                      (auth)   → checkout price breakdown (quote-routes.ts)
 *   POST /orders                     (auth)   → { orderId, paymentSessionId, environment, amount, quote, ... }
 *   GET  /orders/:orderId/status     (auth)   → verifies with Cashfree, finalises if PAID
 *   POST /webhook                    (public) → signature-verified, idempotent (orders + SUBSCRIPTION_* events)
 *   /subscriptions/*                 (auth)   → auto-renew mandates (subscription-routes.ts)
 * Order amounts are GST quotes: list price from the plan / package row + GST for the buyer's state.
 */

import crypto from 'crypto';
import express, { type Request, type Response, type Router } from 'express';
import { authenticateToken, type AuthRequest } from '../../../../middleware/auth';
import { apiRateLimiter, paymentRateLimiter } from '../../../../middleware/rateLimiter';
import { allowUnverifiedWebhooks, type RawBodyRequest } from '../../../../middleware/webhookValidation';
import { storage } from '../../../../storage';
import { billingService, type PurchaseType } from '../../../../services/billing-service';
import { PlivoPhoneService } from '../../../plivo/services/plivo-phone.service';
import { logger } from '../../../../utils/logger';
import { getWebhookUrl, recordWebhookReceived, resolveAppOrigin } from '../../webhook-helper';
import { resolveBuyerStateCode } from '../../invoice-service';
import { quotePrice } from '../../invoice-gst';
import {
  CashfreeApiError,
  FALLBACK_CUSTOMER_PHONE,
  createOrder,
  getCashfreeConfig,
  getCashfreeSettings,
  isCashfreeEnabled,
  normaliseCustomerPhone,
  verifyWebhookSignature,
} from './service';
import { getTransactionByOrderId, handleCashfreeWebhook, syncOrderWithCashfree } from './handlers';
import { cashfreeQuoteRouter, getPhoneNumberPriceInr } from './quote-routes';
import { cashfreeSubscriptionRouter } from './subscription-routes';

const router: Router = express.Router();

const ORDER_EXPIRY_MINUTES = 30;
/** Webhooks whose x-webhook-timestamp is further than this from our clock are rejected (replay protection) */
const WEBHOOK_MAX_SKEW_MS = 5 * 60 * 1000;
const PLIVO_NUMBER_TYPES = ['local', 'toll_free', 'national'] as const;
type PlivoNumberType = typeof PLIVO_NUMBER_TYPES[number];

/** Cashfree sends the timestamp as epoch seconds or milliseconds — accept both. */
/** Cashfree's dashboard test sends `{ type: 'WEBHOOK', data: {} }` (no order, no payment). */
function isCashfreeTestPing(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const b = body as { type?: unknown; data?: unknown };
  if (b.type !== 'WEBHOOK') return false;
  const data = b.data;
  if (data === undefined || data === null) return true;
  if (typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return !d.order && !d.payment && !d.refund;
}

function isWebhookTimestampFresh(raw: unknown, now = Date.now()): boolean {
  const value = Number(String(raw ?? '').trim());
  if (!Number.isFinite(value) || value <= 0) return false;
  const ms = value > 1e12 ? value : value * 1000;
  return Math.abs(now - ms) <= WEBHOOK_MAX_SKEW_MS;
}

function toAmount(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value ?? ''));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

interface ResolvedPurchase {
  type: PurchaseType;
  /** List price (excl. GST unless the seller setting says prices are inclusive) */
  amount: number;
  description: string;
  planId?: string;
  billingPeriod?: 'monthly' | 'yearly';
  creditPackageId?: string;
  creditsAwarded?: number;
  phoneNumber?: string;
  country?: string;
  tags: Record<string, string>;
}

class OrderRequestError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

/** List price ALWAYS comes from DB rows / settings — never from the client. GST is quoted on top afterwards. */
async function resolvePurchase(body: any, userId: string): Promise<ResolvedPurchase> {
  const type = body?.type as PurchaseType;

  if (type === 'credits') {
    const packageId = typeof body.packageId === 'string' ? body.packageId : '';
    if (!packageId) throw new OrderRequestError('packageId is required');
    const pkg = await storage.getCreditPackage(packageId);
    if (!pkg) throw new OrderRequestError('Credit package not found', 404);
    if (!pkg.isActive) throw new OrderRequestError('Credit package is not available');
    const amount = toAmount(pkg.price);
    if (amount <= 0) throw new OrderRequestError('Credit package has no price configured');
    return {
      type,
      amount,
      description: `${pkg.name} (${pkg.credits} credits)`,
      creditPackageId: pkg.id,
      creditsAwarded: pkg.credits,
      tags: { type, userId, packageId: pkg.id },
    };
  }

  if (type === 'plan') {
    const planId = typeof body.planId === 'string' ? body.planId : '';
    if (!planId) throw new OrderRequestError('planId is required');
    const billingPeriod = body.billingPeriod === 'yearly' ? 'yearly' : 'monthly';
    const plan = await storage.getPlan(planId);
    if (!plan) throw new OrderRequestError('Plan not found', 404);
    if (!plan.isActive) throw new OrderRequestError('Plan is not available');
    const amount = billingPeriod === 'yearly' ? toAmount(plan.yearlyPrice) : toAmount(plan.monthlyPrice);
    if (amount <= 0) {
      throw new OrderRequestError(
        billingPeriod === 'yearly' && !plan.yearlyPrice
          ? 'This plan has no yearly price'
          : 'This plan does not require payment',
      );
    }
    return {
      type,
      amount,
      description: `${plan.displayName} plan (${billingPeriod})`,
      planId: plan.id,
      billingPeriod,
      tags: { type, userId, planId: plan.id, billingPeriod },
    };
  }

  if (type === 'phone_number') {
    const phoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber.trim() : '';
    const country = typeof body.country === 'string' ? body.country.trim().toUpperCase() : '';
    if (!/^\+?[0-9]{6,20}$/.test(phoneNumber)) throw new OrderRequestError('A valid phoneNumber is required');
    if (!/^[A-Z]{2}$/.test(country)) throw new OrderRequestError('A valid 2-letter country code is required');
    const pricing = await PlivoPhoneService.getAdminPricing(country);
    if (!pricing) throw new OrderRequestError(`Phone numbers are not available for ${country}`);
    if (!pricing.isActive) throw new OrderRequestError(`Phone numbers are disabled for ${pricing.countryName}`);
    const existing = await PlivoPhoneService.getPhoneNumberByNumber(phoneNumber);
    if (existing && existing.status !== 'released') {
      throw new OrderRequestError('This phone number is no longer available');
    }
    // Numbers are fulfilled through Plivo only: refuse anything Plivo does not list as purchasable in this country
    const numberType: PlivoNumberType = (PLIVO_NUMBER_TYPES as readonly string[]).includes(body.numberType) ? body.numberType : 'local';
    let available: boolean;
    try {
      available = await PlivoPhoneService.isNumberAvailableForPurchase(country, phoneNumber, numberType);
    } catch (error: any) {
      logger.error(`Could not verify ${phoneNumber} (${country}) with Plivo: ${error?.message}`, error, 'Cashfree');
      throw new OrderRequestError('Could not verify the phone number with Plivo. Please try again in a moment.', 502);
    }
    if (!available) {
      throw new OrderRequestError(`${phoneNumber} is not available for purchase from Plivo in ${pricing.countryName}. Please search again and choose a listed number.`);
    }
    const amount = await getPhoneNumberPriceInr();
    return {
      type,
      amount,
      description: `Phone number rental: ${phoneNumber} (${pricing.countryName})`,
      phoneNumber,
      country,
      tags: { type, userId, phoneNumber, country },
    };
  }

  throw new OrderRequestError("type must be one of 'credits', 'plan', 'phone_number'");
}

router.get('/config', authenticateToken, async (_req: AuthRequest, res: Response) => {
  try {
    res.json(await getCashfreeConfig());
  } catch (error: any) {
    logger.error('Error fetching Cashfree config', error, 'Cashfree');
    res.status(500).json({ error: 'Failed to fetch Cashfree configuration' });
  }
});

router.post('/orders', paymentRateLimiter, authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    if (!(await isCashfreeEnabled())) {
      return res.status(400).json({ error: 'Cashfree payments are not enabled' });
    }

    const user = await storage.getUser(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let purchase: ResolvedPurchase;
    try {
      purchase = await resolvePurchase(req.body || {}, userId);
    } catch (error: any) {
      if (error instanceof OrderRequestError) return res.status(error.status).json({ error: error.message });
      throw error;
    }

    // The customer pays the quoted total; the quote is stored on the transaction so the invoice reproduces it exactly
    const quote = await quotePrice(purchase.amount, resolveBuyerStateCode(user));
    const autoRenewRequested = purchase.type === 'plan' && req.body?.autoRenew === true;
    const orderId = `zv_${purchase.type}_${crypto.randomBytes(6).toString('hex')}`;
    const { transactionId } = await billingService.createPendingTransaction({
      userId,
      type: purchase.type,
      amount: quote.total,
      gatewayOrderId: orderId,
      planId: purchase.planId,
      billingPeriod: purchase.billingPeriod,
      creditPackageId: purchase.creditPackageId,
      creditsAwarded: purchase.creditsAwarded,
      phoneNumber: purchase.phoneNumber,
      country: purchase.country,
      description: purchase.description,
      metadata: { gst: quote, ...(purchase.type === 'plan' ? { autoRenewRequested } : {}) },
    });

    let customerPhone = normaliseCustomerPhone(user.billingPhone);
    if (!customerPhone) {
      customerPhone = FALLBACK_CUSTOMER_PHONE;
      logger.warn(
        `User ${userId} has no billing phone; using placeholder customer_phone for order ${orderId}`,
        undefined,
        'Cashfree',
      );
    }

    const { environment } = await getCashfreeSettings();
    const expiry = new Date(Date.now() + ORDER_EXPIRY_MINUTES * 60 * 1000).toISOString();

    let order;
    try {
      order = await createOrder({
        order_id: orderId,
        order_amount: quote.total,
        order_currency: 'INR',
        customer_details: {
          customer_id: userId.replace(/[^A-Za-z0-9_-]/g, '_'),
          customer_phone: customerPhone,
          customer_email: user.email,
          customer_name: (user.billingName || user.name || '').slice(0, 100) || undefined,
        },
        order_meta: {
          return_url: `${resolveAppOrigin(req)}/app/payment-result?gateway=cashfree&order_id={order_id}`,
          notify_url: getWebhookUrl('cashfree'),
        },
        order_note: purchase.description.slice(0, 200),
        order_tags: { ...purchase.tags, transactionId },
        order_expiry_time: expiry,
      });
    } catch (error: any) {
      const message = error instanceof CashfreeApiError ? error.message : 'Failed to create Cashfree order';
      logger.error(`Cashfree order creation failed for ${orderId}: ${message}`, error, 'Cashfree');
      await storage.updatePaymentTransaction(transactionId, {
        status: 'failed',
        failureReason: `order_create_failed: ${message}`.slice(0, 500),
      });
      return res.status(502).json({ error: message });
    }

    if (!order.payment_session_id) {
      logger.error(`Cashfree order ${orderId} returned no payment_session_id`, order, 'Cashfree');
      await storage.updatePaymentTransaction(transactionId, { status: 'failed', failureReason: 'no_payment_session' });
      return res.status(502).json({ error: 'Cashfree did not return a payment session' });
    }

    await storage.updatePaymentTransaction(transactionId, {
      gatewayTransactionId: order.cf_order_id ? String(order.cf_order_id) : null,
    });

    res.json({
      orderId,
      paymentSessionId: order.payment_session_id,
      environment,
      amount: quote.total,
      baseAmount: quote.taxableAmount,
      taxAmount: quote.taxAmount,
      quote,
      currency: 'INR',
      transactionId,
      autoRenewRequested,
      cfOrderId: order.cf_order_id ? String(order.cf_order_id) : null,
    });
  } catch (error: any) {
    logger.error('Error creating Cashfree order', error, 'Cashfree');
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

router.get('/orders/:orderId/status', apiRateLimiter, authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!/^[A-Za-z0-9_-]{3,45}$/.test(orderId)) {
      return res.status(400).json({ error: 'Invalid order id' });
    }

    let transaction = await getTransactionByOrderId(orderId);
    if (!transaction || transaction.userId !== req.userId) {
      return res.status(404).json({ error: 'Order not found' });
    }

    let orderStatus: string;
    let paymentStatus: string | null;

    if (['completed', 'refunded', 'partially_refunded', 'fulfilment_failed'].includes(transaction.status)) {
      // Paid and finalised (fulfilment_failed = paid, provisioning gave up; never re-run fulfilment from a poll)
      orderStatus = 'PAID';
      paymentStatus = 'SUCCESS';
    } else {
      try {
        const sync = await syncOrderWithCashfree(orderId);
        orderStatus = sync.orderStatus;
        paymentStatus = sync.paymentStatus;
      } catch (error: any) {
        if (error instanceof CashfreeApiError && error.status === 404) {
          return res.status(404).json({ error: 'Order not found at Cashfree' });
        }
        throw error;
      }
      transaction = (await getTransactionByOrderId(orderId)) || transaction;
    }

    const plan = transaction.planId ? await storage.getPlan(transaction.planId) : undefined;
    const metadata = (transaction.metadata || {}) as Record<string, unknown>;
    // Plan orders: tell the result page whether to offer the auto-renew (mandate) step
    const subscription = transaction.type === 'subscription' ? await storage.getUserSubscription(transaction.userId) : null;

    res.json({
      orderId,
      status: orderStatus,
      paymentStatus,
      transactionId: transaction.id,
      transactionStatus: transaction.status,
      invoiceId: transaction.invoiceId || null,
      type: transaction.type,
      amount: parseFloat(transaction.amount),
      currency: transaction.currency,
      credits: transaction.creditsAwarded ?? null,
      planId: transaction.planId || null,
      planName: plan?.displayName || null,
      billingPeriod: transaction.billingPeriod || null,
      phoneNumber: typeof metadata.phoneNumber === 'string' ? metadata.phoneNumber : null,
      paymentMethod: transaction.paymentMethod || null,
      failureReason: transaction.failureReason || null,
      completedAt: transaction.completedAt || null,
      quote: metadata.gst ?? null,
      autoRenewRequested: metadata.autoRenewRequested === true,
      autoRenewActive: subscription?.autoRenew === true,
    });
  } catch (error: any) {
    logger.error('Error checking Cashfree order status', error, 'Cashfree');
    res.status(500).json({ error: 'Failed to check order status' });
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  const rawReq = req as RawBodyRequest;
  const signature = req.headers['x-webhook-signature'] as string | undefined;
  const timestamp = req.headers['x-webhook-timestamp'] as string | undefined;

  try {
    const { secretKey } = await getCashfreeSettings();
    if (!Buffer.isBuffer(rawReq.rawBody)) {
      // The signature covers the exact bytes Cashfree sent; a re-serialised body can never be verified
      logger.warn('Rejected Cashfree webhook: raw request body unavailable', undefined, 'Cashfree');
      return res.status(400).json({ error: 'Raw request body required for signature verification' });
    }
    const rawBody: Buffer = rawReq.rawBody;
    const verified = verifyWebhookSignature(rawBody, timestamp, signature, secretKey);
    const fresh = isWebhookTimestampFresh(timestamp);

    // The dashboard "Test endpoint" ping carries no order/payment data, so acknowledging it has no
    // side effects and there is nothing a forged ping could do. Real events still need a valid signature.
    if (!verified && isCashfreeTestPing(req.body)) {
      logger.info('Acknowledged Cashfree webhook test ping', undefined, 'Cashfree');
      await recordWebhookReceived('cashfree');
      return res.status(200).json({ received: true, action: 'test_ping' });
    }

    if (!verified || !fresh) {
      if (!allowUnverifiedWebhooks()) {
        const why = !secretKey ? 'secret not configured' : !signature ? 'missing signature' : !verified ? 'invalid signature' : 'stale or missing timestamp';
        logger.warn(`Rejected Cashfree webhook: ${why}`, undefined, 'Cashfree');
        return res.status(401).json({ error: verified ? 'Webhook timestamp outside the accepted window' : 'Invalid webhook signature' });
      }
      logger.warn('Accepting unverified Cashfree webhook (ALLOW_UNVERIFIED_WEBHOOKS=true)', undefined, 'Cashfree');
    }

    await recordWebhookReceived('cashfree');

    const payload = (req.body || {}) as Parameters<typeof handleCashfreeWebhook>[0];
    const result = await handleCashfreeWebhook(payload);
    logger.info(`Cashfree webhook ${payload.type || '?'} → ${result.action}${result.orderId ? ` (${result.orderId})` : ''}`, undefined, 'Cashfree');
    res.status(200).json({ received: true, action: result.action });
  } catch (error: any) {
    // Processing error after verification: 500 so Cashfree retries (at-least-once delivery)
    logger.error('Cashfree webhook processing failed', error, 'Cashfree');
    res.status(500).json({ received: false, error: 'Webhook processing failed' });
  }
});

router.use(cashfreeQuoteRouter);
router.use(cashfreeSubscriptionRouter);

export const cashfreeRouter = router;
