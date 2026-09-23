import { INTEGRATION_PROVIDERS, type IntegrationProvider as ProviderKey } from "@shared/schema";
import type { IntegrationProvider } from "../types";
import { zohoProvider } from "./zoho";
import { salesforceProvider } from "./salesforce";
import { gohighlevelProvider } from "./gohighlevel";
import { calcomProvider } from "./calcom";
import { zapierProvider } from "./zapier";
import { pabblyProvider } from "./pabbly";

export const PROVIDERS: Record<ProviderKey, IntegrationProvider> = {
  gohighlevel: gohighlevelProvider,
  salesforce: salesforceProvider,
  zoho: zohoProvider,
  calcom: calcomProvider,
  zapier: zapierProvider,
  pabbly: pabblyProvider,
};

export function isProviderKey(value: string): value is ProviderKey {
  return (INTEGRATION_PROVIDERS as readonly string[]).includes(value);
}

export function getProvider(key: string): IntegrationProvider | null {
  return isProviderKey(key) ? PROVIDERS[key] : null;
}
