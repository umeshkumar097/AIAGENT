'use strict';
/**
 * Payment Engine Types
 * Cashfree is the only live gateway; LegacyGateway exists so old rows stay readable.
 */

export type PaymentGateway = 'cashfree';

/** Gateways that no longer exist but still appear on historic transactions/refunds. */
export type LegacyGateway = 'stripe' | 'razorpay' | 'paypal' | 'paystack' | 'mercadopago';

export type AnyGateway = PaymentGateway | LegacyGateway;

export const LEGACY_GATEWAYS: readonly LegacyGateway[] = ['stripe', 'razorpay', 'paypal', 'paystack', 'mercadopago'];

export function isLegacyGateway(gateway: string | null | undefined): gateway is LegacyGateway {
  return !!gateway && (LEGACY_GATEWAYS as readonly string[]).includes(gateway);
}

export type PaymentType = 'plan' | 'credits' | 'phone_number' | 'subscription' | 'one_time';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded' | 'disputed' | 'cancelled' | 'fulfilment_failed';

export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled' | 'suspended' | 'trialing' | 'incomplete' | 'expired';

export type RefundStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type DisputeStatus = 'open' | 'under_review' | 'won' | 'lost' | 'closed';

export interface WebhookConfig {
  gateway: PaymentGateway;
  webhookUrl: string;
  webhookSecret: string | null;
  lastReceivedAt: Date | null;
  isConfigured: boolean;
  testResult?: {
    success: boolean;
    message: string;
    testedAt: Date;
  };
}

export interface GatewayCredentials {
  gateway: PaymentGateway;
  isConfigured: boolean;
  isEnabled: boolean;
  publicKey?: string;
  currency?: string;
  currencySymbol?: string;
  mode?: 'production' | 'sandbox';
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  gatewayTransactionId?: string;
  error?: string;
  errorCode?: string;
  metadata?: Record<string, any>;
}

export interface RefundResult {
  success: boolean;
  refundId?: string;
  gatewayRefundId?: string;
  amount?: number;
  currency?: string;
  error?: string;
}

export interface WebhookEvent {
  gateway: PaymentGateway;
  eventType: string;
  eventId?: string;
  rawPayload: string;
  signature?: string;
  headers: Record<string, string>;
  receivedAt: Date;
}

export interface WebhookProcessResult {
  success: boolean;
  eventType: string;
  processed: boolean;
  action?: string;
  error?: string;
  userId?: string;
  transactionId?: string;
}

export interface RefundWebhookData {
  refundId: string;
  originalPaymentId: string;
  amount: number;
  currency: string;
  status: RefundStatus;
  reason?: string;
  userId?: string;
}

export interface AuditLogEntry {
  action: string;
  gateway?: AnyGateway;
  userId?: string;
  transactionId?: string;
  subscriptionId?: string;
  refundId?: string;
  disputeId?: string;
  adminId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  timestamp: Date;
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
  SGD: 'S$',
  AED: 'د.إ',
  BRL: 'R$',
  MXN: 'MX$',
  NGN: '₦',
  GHS: '₵',
  KES: 'KSh',
  ZAR: 'R',
};

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] || currency.toUpperCase();
}

export function formatCurrency(amount: number | string, currency: string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${numAmount.toFixed(2)}`;
}

export const GLOBAL_SETTINGS_KEYS = {
  CASHFREE_ENABLED: 'cashfree_enabled',
  CASHFREE_APP_ID: 'cashfree_app_id',
  CASHFREE_SECRET_KEY: 'cashfree_secret_key',
  CASHFREE_ENVIRONMENT: 'cashfree_environment',
  CASHFREE_LAST_WEBHOOK_AT: 'cashfree_last_webhook_at',

  ELEVENLABS_HMAC_SECRET: 'elevenlabs_hmac_secret',
  ELEVENLABS_LAST_WEBHOOK_AT: 'elevenlabs_last_webhook_at',
} as const;
