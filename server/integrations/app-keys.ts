import type { IntegrationProvider as ProviderKey } from "@shared/schema";
import { storage } from "../storage";
import { FRONTEND_URL } from "../engines/payment/webhook-helper";

export const ZOHO_ACCOUNTS_DOMAINS = [
  "https://accounts.zoho.in",
  "https://accounts.zoho.com",
  "https://accounts.zoho.eu",
  "https://accounts.zoho.com.au",
  "https://accounts.zoho.jp",
  "https://accounts.zoho.com.cn",
];
export const SALESFORCE_LOGIN_URLS = ["https://login.salesforce.com", "https://test.salesforce.com"];

/** Admin-managed OAuth app keys (global_settings) — also the allowlist used by the admin settings routes */
export const INTEGRATION_SETTING_KEYS = [
  "ghl_client_id", "ghl_client_secret",
  "salesforce_client_id", "salesforce_client_secret", "salesforce_login_url",
  "zoho_client_id", "zoho_client_secret", "zoho_accounts_domain",
];
export const INTEGRATION_SECRET_KEYS = ["ghl_client_secret", "salesforce_client_secret", "zoho_client_secret"];

export type OAuthKeyPrefix = "ghl" | "salesforce" | "zoho";

export async function getSettingString(key: string): Promise<string | null> {
  try {
    const setting = await storage.getGlobalSetting(key);
    const value = setting?.value;
    if (value == null) return null;
    const text = String(value).trim();
    return text || null;
  } catch (err) {
    console.error(`[Integrations] Failed to read setting ${key}:`, (err as Error).message);
    return null;
  }
}

export type AppKeysResult = { clientId: string; clientSecret: string; missing: [] } | { clientId: null; clientSecret: null; missing: string[] };

export async function getOAuthAppKeys(prefix: OAuthKeyPrefix): Promise<AppKeysResult> {
  const idKey = `${prefix}_client_id`;
  const secretKey = `${prefix}_client_secret`;
  const [clientId, clientSecret] = await Promise.all([getSettingString(idKey), getSettingString(secretKey)]);
  const missing = [!clientId && idKey, !clientSecret && secretKey].filter((k): k is string => !!k);
  if (missing.length || !clientId || !clientSecret) return { clientId: null, clientSecret: null, missing };
  return { clientId, clientSecret, missing: [] };
}

export async function getZohoAccountsDomain(): Promise<string> {
  const value = await getSettingString("zoho_accounts_domain");
  return value && ZOHO_ACCOUNTS_DOMAINS.includes(value) ? value : ZOHO_ACCOUNTS_DOMAINS[0];
}

export async function getSalesforceLoginUrl(): Promise<string> {
  const value = await getSettingString("salesforce_login_url");
  return value && SALESFORCE_LOGIN_URLS.includes(value) ? value : SALESFORCE_LOGIN_URLS[0];
}

export async function missingAppKeys(keys: string[]): Promise<string[]> {
  const values = await Promise.all(keys.map((k) => getSettingString(k)));
  return keys.filter((_, i) => !values[i]);
}

export function redirectUriFor(provider: ProviderKey): string {
  return `${FRONTEND_URL}/app/integrations/callback/${provider}`;
}

export function inboundTriggerUrl(): string {
  return `${FRONTEND_URL}/api/external/trigger-call`;
}

export async function requireOAuthKeys(prefix: OAuthKeyPrefix, displayName: string): Promise<{ clientId: string; clientSecret: string }> {
  const keys = await getOAuthAppKeys(prefix);
  if (keys.clientId && keys.clientSecret) return { clientId: keys.clientId, clientSecret: keys.clientSecret };
  throw new Error(`${displayName} app keys are not configured (${keys.missing.join(", ")})`);
}
