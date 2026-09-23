'use strict';
/**
 * ============================================================
 * Payment Engine v2.0.0 — Cashfree only (INR)
 * ============================================================
 * One-time payments for plans (per period), credit packages and
 * phone number rentals via Cashfree Payments, with signed webhooks,
 * status polling, refunds (credit notes) and admin controls.
 *
 * Legacy gateways (Stripe, Razorpay, PayPal, Paystack, MercadoPago)
 * were removed; their historic rows stay readable via `LegacyGateway`.
 *
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * ============================================================
 */

export * from './types';
export * from './webhook-helper';

export { cashfreeRouter } from './gateways/cashfree';

export { invoiceService, generateInvoiceForTransaction } from './invoice-service';

export { PaymentAuditService } from './audit';

export const PAYMENT_ENGINE_VERSION = '2.0.0';

export function getPaymentEngineInfo() {
  return {
    version: PAYMENT_ENGINE_VERSION,
    gateways: ['cashfree'],
    features: [
      'Cashfree hosted checkout (INR)',
      'Signed webhooks with DB secrets',
      'Order status verification fallback',
      'Refunds with GST credit notes',
      'One-time-per-period subscriptions with expiry reminders',
      'GST tax invoice PDF generation',
      'Event-driven email notifications',
      'Admin dashboard',
      'Audit logging',
    ],
  };
}
