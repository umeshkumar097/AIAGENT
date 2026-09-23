'use strict';
/**
 * Webhook Helper Service
 * Webhook URLs, secrets and last-received tracking for Cashfree + ElevenLabs.
 */

import { storage } from '../../storage';
import { PaymentGateway, WebhookConfig, GLOBAL_SETTINGS_KEYS } from './types';

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

function getValidatedFrontendUrl(): string {
  // In production, require APP_DOMAIN or APP_URL to be set
  if (process.env.NODE_ENV === 'production') {
    if (process.env.APP_DOMAIN) {
      // Strip any existing protocol to prevent "https://https://..." URLs
      const domain = stripProtocol(process.env.APP_DOMAIN);
      return `https://${domain}`;
    }
    if (process.env.APP_URL) {
      return process.env.APP_URL;
    }
    // Log error but don't crash - fallback for backwards compatibility
    console.error('[CONFIG ERROR] Production requires APP_DOMAIN or APP_URL to be set');
    return 'http://localhost:5000'; // Will fail gracefully
  }

  // Development environment
  if (process.env.APP_DOMAIN) {
    // Strip any existing protocol to prevent "https://https://..." URLs
    const domain = stripProtocol(process.env.APP_DOMAIN);
    return `https://${domain}`;
  }
  return process.env.APP_URL || 'http://localhost:5000';
}

export const FRONTEND_URL = getValidatedFrontendUrl();

/**
 * Hosts a browser may be on for this deployment: the configured host plus its `app.` / `www.`
 * siblings (app.zonvo.tech ↔ zonvo.tech ↔ www.zonvo.tech) and anything in APP_TRUSTED_HOSTS.
 * An exact allow-list, not a "same registrable domain" guess (which breaks on .co.in etc.).
 */
export function trustedAppHosts(): Set<string> {
  const hosts = new Set<string>();
  try {
    const base = new URL(FRONTEND_URL).hostname.toLowerCase();
    const bare = base.replace(/^(app|www)\./, '');
    for (const h of [base, bare, `app.${bare}`, `www.${bare}`]) hosts.add(h);
  } catch {
    // FRONTEND_URL malformed → nothing trusted beyond the extra list
  }
  for (const h of (process.env.APP_TRUSTED_HOSTS || '').split(',')) {
    const t = h.trim().toLowerCase();
    if (t) hosts.add(t);
  }
  return hosts;
}

/**
 * Origin the user is browsing from (Origin, else Referer), used for post-payment return URLs
 * so the browser comes back to the host that holds the login cookie (app.zonvo.tech rather
 * than the marketing site). Only https origins on a trusted host are accepted; anything else
 * falls back to FRONTEND_URL.
 */
export function resolveAppOrigin(req: { headers: Record<string, string | string[] | undefined> }): string {
  const raw = req.headers.origin ?? req.headers.referer;
  const candidate = Array.isArray(raw) ? raw[0] : raw;
  if (!candidate) return FRONTEND_URL;
  try {
    const url = new URL(candidate);
    const trusted = trustedAppHosts().has(url.hostname.toLowerCase());
    const secure = url.protocol === 'https:' || url.hostname === 'localhost';
    if (trusted && secure) return url.origin;
  } catch {
    // malformed header → fall through
  }
  return FRONTEND_URL;
}

export function getWebhookUrl(gateway: PaymentGateway): string {
  return `${FRONTEND_URL}/api/${gateway}/webhook`;
}

export function getElevenLabsWebhookUrl(): string {
  return `${FRONTEND_URL}/api/elevenlabs/webhook`;
}

/** Cashfree signs webhooks with the API secret key — there is no separate webhook secret. */
export async function getWebhookSecret(gateway: PaymentGateway): Promise<string | null> {
  if (gateway !== 'cashfree') return null;
  const setting = await storage.getGlobalSetting(GLOBAL_SETTINGS_KEYS.CASHFREE_SECRET_KEY);
  if (setting?.value) {
    return setting.value as string;
  }
  return process.env.CASHFREE_SECRET_KEY || null;
}

export async function setWebhookSecret(gateway: PaymentGateway, secret: string): Promise<void> {
  if (gateway !== 'cashfree') return;
  await storage.updateGlobalSetting(GLOBAL_SETTINGS_KEYS.CASHFREE_SECRET_KEY, secret);
}

const LAST_WEBHOOK_KEYS: Record<PaymentGateway | 'elevenlabs', string> = {
  cashfree: GLOBAL_SETTINGS_KEYS.CASHFREE_LAST_WEBHOOK_AT,
  elevenlabs: GLOBAL_SETTINGS_KEYS.ELEVENLABS_LAST_WEBHOOK_AT,
};

export async function getLastWebhookReceivedAt(gateway: PaymentGateway | 'elevenlabs'): Promise<Date | null> {
  const setting = await storage.getGlobalSetting(LAST_WEBHOOK_KEYS[gateway]);
  if (setting?.value) {
    return new Date(setting.value as string);
  }
  return null;
}

export async function recordWebhookReceived(gateway: PaymentGateway | 'elevenlabs'): Promise<void> {
  await storage.updateGlobalSetting(LAST_WEBHOOK_KEYS[gateway], new Date().toISOString());
}

export async function getElevenLabsHmacSecret(): Promise<string | null> {
  const setting = await storage.getGlobalSetting(GLOBAL_SETTINGS_KEYS.ELEVENLABS_HMAC_SECRET);
  if (setting?.value) {
    return setting.value as string;
  }
  return process.env.ELEVENLABS_HMAC_SECRET || null;
}

export async function setElevenLabsHmacSecret(secret: string): Promise<void> {
  await storage.updateGlobalSetting(GLOBAL_SETTINGS_KEYS.ELEVENLABS_HMAC_SECRET, secret);
}

export async function getWebhookConfig(gateway: PaymentGateway): Promise<WebhookConfig> {
  const [secret, lastReceivedAt] = await Promise.all([
    getWebhookSecret(gateway),
    getLastWebhookReceivedAt(gateway),
  ]);

  return {
    gateway,
    webhookUrl: getWebhookUrl(gateway),
    webhookSecret: secret,
    lastReceivedAt,
    isConfigured: !!secret,
  };
}

export async function getAllWebhookConfigs(): Promise<WebhookConfig[]> {
  return [await getWebhookConfig('cashfree')];
}

export async function getElevenLabsWebhookConfig(): Promise<{
  webhookUrl: string;
  hmacSecret: string | null;
  lastReceivedAt: Date | null;
  isConfigured: boolean;
}> {
  const [hmacSecret, lastReceivedAt] = await Promise.all([
    getElevenLabsHmacSecret(),
    getLastWebhookReceivedAt('elevenlabs'),
  ]);

  return {
    webhookUrl: getElevenLabsWebhookUrl(),
    hmacSecret,
    lastReceivedAt,
    isConfigured: !!hmacSecret,
  };
}

export async function isGatewayEnabled(gateway: PaymentGateway): Promise<boolean> {
  if (gateway !== 'cashfree') return false;
  const setting = await storage.getGlobalSetting(GLOBAL_SETTINGS_KEYS.CASHFREE_ENABLED);
  return setting?.value === true || setting?.value === 'true';
}

export async function isGatewayConfigured(gateway: PaymentGateway): Promise<boolean> {
  if (gateway !== 'cashfree') return false;
  const [appId, secretKey] = await Promise.all([
    storage.getGlobalSetting(GLOBAL_SETTINGS_KEYS.CASHFREE_APP_ID),
    storage.getGlobalSetting(GLOBAL_SETTINGS_KEYS.CASHFREE_SECRET_KEY),
  ]);
  const dbConfigured = !!(appId?.value && secretKey?.value);
  const envConfigured = !!(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);
  return dbConfigured || envConfigured;
}

export async function getEnabledGateways(): Promise<PaymentGateway[]> {
  const [enabled, configured] = await Promise.all([
    isGatewayEnabled('cashfree'),
    isGatewayConfigured('cashfree'),
  ]);
  return enabled && configured ? ['cashfree'] : [];
}
