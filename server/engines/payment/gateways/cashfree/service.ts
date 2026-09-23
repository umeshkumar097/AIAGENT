'use strict';
/**
 * Cashfree Payments — API client + settings access.
 * Plain fetch, no SDK. Base URL selected by `cashfree_environment`.
 * Docs: https://docs.cashfree.com/reference/pg-new-apis-endpoint
 */

import crypto from 'crypto';
import { storage } from '../../../../storage';
import { logger } from '../../../../utils/logger';

export const CASHFREE_API_VERSION = '2026-01-01';

export type CashfreeEnvironment = 'sandbox' | 'production';

export const CASHFREE_SETTINGS = {
  ENABLED: 'cashfree_enabled',
  APP_ID: 'cashfree_app_id',
  SECRET_KEY: 'cashfree_secret_key',
  ENVIRONMENT: 'cashfree_environment',
  LAST_WEBHOOK_AT: 'cashfree_last_webhook_at',
} as const;

export interface CashfreeCredentials {
  appId: string;
  secretKey: string;
  environment: CashfreeEnvironment;
}

export interface CashfreeSettings extends CashfreeCredentials {
  enabled: boolean;
}

export interface CashfreeCustomerDetails {
  customer_id: string;
  customer_phone: string;
  customer_email?: string;
  customer_name?: string;
}

export interface CashfreeCreateOrderInput {
  order_id: string;
  order_amount: number;
  order_currency: 'INR';
  customer_details: CashfreeCustomerDetails;
  order_meta?: {
    return_url?: string;
    notify_url?: string;
    payment_methods?: string;
  };
  order_note?: string;
  order_tags?: Record<string, string>;
  order_expiry_time?: string;
}

export interface CashfreeOrder {
  cf_order_id: string;
  order_id: string;
  order_status: 'ACTIVE' | 'PAID' | 'EXPIRED' | 'TERMINATED' | 'TERMINATION_REQUESTED' | string;
  order_amount: number;
  order_currency: string;
  payment_session_id?: string;
  order_tags?: Record<string, string> | null;
  order_note?: string | null;
  customer_details?: Partial<CashfreeCustomerDetails>;
  created_at?: string;
  order_expiry_time?: string;
}

export interface CashfreePayment {
  cf_payment_id: number | string;
  order_id?: string;
  payment_status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'USER_DROPPED' | 'NOT_ATTEMPTED' | 'CANCELLED' | 'VOID' | string;
  payment_amount: number;
  payment_currency?: string;
  payment_group?: string;
  payment_method?: Record<string, unknown> | null;
  payment_time?: string;
  payment_message?: string;
  bank_reference?: string;
}

export interface CashfreeRefund {
  cf_refund_id: string;
  refund_id: string;
  order_id: string;
  refund_amount: number;
  refund_status: 'SUCCESS' | 'PENDING' | 'CANCELLED' | 'ONHOLD' | string;
  refund_note?: string;
  created_at?: string;
}

export class CashfreeApiError extends Error {
  status: number;
  code?: string;
  body?: unknown;

  constructor(message: string, status: number, code?: string, body?: unknown) {
    super(message);
    this.name = 'CashfreeApiError';
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

const REQUEST_TIMEOUT_MS = 15000;

function toBool(value: unknown): boolean {
  return value === true || value === 'true';
}

function normaliseEnvironment(value: unknown): CashfreeEnvironment {
  return value === 'production' ? 'production' : 'sandbox';
}

export function getCashfreeBaseUrl(environment: CashfreeEnvironment): string {
  return environment === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
}

/**
 * Reads the Cashfree settings from global_settings (env vars as fallback).
 */
export async function getCashfreeSettings(): Promise<CashfreeSettings> {
  const [enabled, appId, secretKey, environment] = await Promise.all([
    storage.getGlobalSetting(CASHFREE_SETTINGS.ENABLED),
    storage.getGlobalSetting(CASHFREE_SETTINGS.APP_ID),
    storage.getGlobalSetting(CASHFREE_SETTINGS.SECRET_KEY),
    storage.getGlobalSetting(CASHFREE_SETTINGS.ENVIRONMENT),
  ]);

  return {
    enabled: toBool(enabled?.value),
    appId: ((appId?.value as string) || process.env.CASHFREE_APP_ID || '').trim(),
    secretKey: ((secretKey?.value as string) || process.env.CASHFREE_SECRET_KEY || '').trim(),
    environment: normaliseEnvironment((environment?.value as string) || process.env.CASHFREE_ENVIRONMENT),
  };
}

export async function isCashfreeConfigured(): Promise<boolean> {
  const settings = await getCashfreeSettings();
  return !!(settings.appId && settings.secretKey);
}

export async function isCashfreeEnabled(): Promise<boolean> {
  const settings = await getCashfreeSettings();
  return settings.enabled && !!(settings.appId && settings.secretKey);
}

/** Safe-to-expose config for the browser SDK. */
export async function getCashfreeConfig(): Promise<{ enabled: boolean; appId: string | null; environment: CashfreeEnvironment }> {
  const settings = await getCashfreeSettings();
  const enabled = settings.enabled && !!(settings.appId && settings.secretKey);
  return {
    enabled,
    appId: enabled ? settings.appId : null,
    environment: settings.environment,
  };
}

async function resolveCredentials(override?: Partial<CashfreeCredentials>): Promise<CashfreeCredentials> {
  const settings = await getCashfreeSettings();
  const appId = (override?.appId || settings.appId || '').trim();
  const secretKey = (override?.secretKey || settings.secretKey || '').trim();
  const environment = override?.environment ? normaliseEnvironment(override.environment) : settings.environment;
  if (!appId || !secretKey) {
    throw new CashfreeApiError('Cashfree is not configured (missing App ID or Secret Key)', 0, 'not_configured');
  }
  return { appId, secretKey, environment };
}

async function cashfreeRequest<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
  override?: Partial<CashfreeCredentials>,
): Promise<T> {
  const creds = await resolveCredentials(override);
  const url = `${getCashfreeBaseUrl(creds.environment)}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-client-id': creds.appId,
        'x-client-secret': creds.secretKey,
        'x-api-version': CASHFREE_API_VERSION,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      const message = data?.message || data?.error_description || `Cashfree API error (${response.status})`;
      throw new CashfreeApiError(message, response.status, data?.code || data?.type, data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof CashfreeApiError) throw error;
    if (error?.name === 'AbortError') {
      throw new CashfreeApiError('Cashfree API request timed out', 0, 'timeout');
    }
    throw new CashfreeApiError(error?.message || 'Cashfree API request failed', 0, 'network_error');
  } finally {
    clearTimeout(timeout);
  }
}

export async function createOrder(input: CashfreeCreateOrderInput): Promise<CashfreeOrder> {
  return cashfreeRequest<CashfreeOrder>('POST', '/orders', input);
}

export async function getOrder(orderId: string): Promise<CashfreeOrder> {
  return cashfreeRequest<CashfreeOrder>('GET', `/orders/${encodeURIComponent(orderId)}`);
}

export async function getOrderPayments(orderId: string): Promise<CashfreePayment[]> {
  const payments = await cashfreeRequest<CashfreePayment[] | { data?: CashfreePayment[] }>(
    'GET',
    `/orders/${encodeURIComponent(orderId)}/payments`,
  );
  if (Array.isArray(payments)) return payments;
  return Array.isArray(payments?.data) ? payments.data : [];
}

export async function createRefund(
  orderId: string,
  input: { refund_id: string; refund_amount: number; refund_note?: string },
): Promise<CashfreeRefund> {
  return cashfreeRequest<CashfreeRefund>('POST', `/orders/${encodeURIComponent(orderId)}/refunds`, input);
}

/**
 * Webhook signature = base64(HMAC-SHA256(timestamp + rawBody, secretKey)).
 * Constant-time comparison; any missing input → false.
 */
export function verifyWebhookSignature(
  rawBody: Buffer | string,
  timestamp: string | undefined,
  signature: string | undefined,
  secretKey: string,
): boolean {
  if (!timestamp || !signature || !secretKey) return false;
  const payload = Buffer.concat([
    Buffer.from(String(timestamp), 'utf8'),
    Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf8'),
  ]);
  const expected = crypto.createHmac('sha256', secretKey).update(payload).digest('base64');
  const expectedBuf = Buffer.from(expected, 'utf8');
  const receivedBuf = Buffer.from(String(signature), 'utf8');
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

/**
 * Derives a short, human-readable payment method label from a Cashfree payment object.
 */
export function describePaymentMethod(payment: CashfreePayment | undefined | null): string | undefined {
  if (!payment) return undefined;
  if (payment.payment_group) return String(payment.payment_group).toLowerCase();
  const method = payment.payment_method;
  if (method && typeof method === 'object') {
    const keys = Object.keys(method);
    if (keys.length > 0) return keys[0].toLowerCase();
  }
  return undefined;
}

/**
 * Credential check: GET a non-existent order. 404 → credentials accepted; 401/403 → rejected.
 */
export async function testCredentials(override?: Partial<CashfreeCredentials>): Promise<{
  success: boolean;
  message: string;
  environment: CashfreeEnvironment;
}> {
  let environment: CashfreeEnvironment = 'sandbox';
  try {
    environment = (await resolveCredentials(override)).environment;
    await cashfreeRequest<CashfreeOrder>('GET', `/orders/zv_probe_${crypto.randomBytes(4).toString('hex')}`, undefined, override);
    return { success: true, message: 'Credentials accepted by Cashfree', environment };
  } catch (error: any) {
    if (error instanceof CashfreeApiError) {
      if (error.status === 404) {
        return { success: true, message: `Credentials accepted by Cashfree (${environment})`, environment };
      }
      if (error.status === 401 || error.status === 403) {
        return { success: false, message: 'Invalid App ID / Secret Key for the selected environment', environment };
      }
      if (error.code === 'not_configured') {
        return { success: false, message: error.message, environment };
      }
      logger.warn(`Cashfree credential test returned ${error.status}: ${error.message}`, undefined, 'Cashfree');
      return { success: false, message: error.message, environment };
    }
    return { success: false, message: error?.message || 'Connection test failed', environment };
  }
}
