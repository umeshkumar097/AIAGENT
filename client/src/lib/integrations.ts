/**
 * Client-side types, fetchers and metadata for the real third-party
 * integrations (GoHighLevel, Salesforce, Zoho CRM, Cal.com, Zapier, Pabbly).
 *
 * Server contract: GET /api/integrations and the per-provider routes under
 * /api/integrations/:provider (auth, exchange, config, test, options, logs, DELETE).
 */
import { apiRequest, queryClient } from "./queryClient";

export const INTEGRATION_PROVIDERS = ["gohighlevel", "salesforce", "zoho", "calcom", "zapier", "pabbly"] as const;
export type IntegrationProviderKey = typeof INTEGRATION_PROVIDERS[number];

export type IntegrationKind = "oauth" | "apikey" | "webhook";
export type IntegrationStatus = "connected" | "error" | "disconnected";

export interface WebhookTarget {
  url: string;
  events: string[];
}

/** Public (secret-free) config as returned by GET /api/integrations. */
export interface IntegrationPublicConfig {
  // Cal.com
  apiKeySet?: boolean;
  eventTypeId?: number | string | null;
  timeZone?: string;
  // GoHighLevel
  calendarId?: string | null;
  locationId?: string | null;
  // Zapier / Pabbly
  webhooks?: WebhookTarget[];
  inboundUrl?: string;
  /** Value used for the X-Zonvo-Signature header so the receiver can verify payloads. */
  signingSecret?: string;
  // Salesforce
  instanceUrl?: string;
}

export interface IntegrationProviderState {
  provider: IntegrationProviderKey;
  displayName: string;
  kind: IntegrationKind;
  configured: boolean;
  connected: boolean;
  status: IntegrationStatus | null;
  accountName: string | null;
  externalAccountId: string | null;
  lastSyncAt: string | null;
  lastError: string | null;
  config: IntegrationPublicConfig;
  redirectUri?: string;
}

export interface IntegrationsListResponse {
  providers: IntegrationProviderState[];
}

export interface IntegrationSyncLog {
  id: string | number;
  provider?: string;
  event: string;
  action: string | null;
  status: "success" | "failed" | "skipped";
  sourceId: string | null;
  externalId: string | null;
  error: string | null;
  createdAt: string;
}

export interface IntegrationOptionsResponse {
  calendars?: { id: string; name: string }[];
  eventTypes?: { id: number | string; title: string; lengthInMinutes?: number }[];
}

export interface TestResult {
  ok: boolean;
  error?: string;
  accountName?: string;
  results?: { url: string; ok: boolean; httpStatus?: number; error?: string }[];
}

export interface ConfigSaveResult {
  ok: boolean;
  accountName?: string;
  error?: string;
}

export const INTEGRATIONS_QUERY_KEY = ["/api/integrations"] as const;

export function providerPath(provider: IntegrationProviderKey, suffix = ""): string {
  return `/api/integrations/${provider}${suffix}`;
}

export async function fetchIntegrationAuthUrl(provider: IntegrationProviderKey): Promise<{ url: string }> {
  const res = await apiRequest("GET", providerPath(provider, "/auth"));
  return res.json();
}

export async function exchangeIntegrationCode(
  provider: IntegrationProviderKey,
  body: { code: string; state: string },
): Promise<{ connected: boolean; accountName?: string }> {
  const res = await apiRequest("POST", providerPath(provider, "/exchange"), body);
  return res.json();
}

export async function saveIntegrationConfig(
  provider: IntegrationProviderKey,
  config: Record<string, unknown>,
): Promise<ConfigSaveResult> {
  const res = await apiRequest("PUT", providerPath(provider, "/config"), config);
  return res.json();
}

export async function testIntegration(provider: IntegrationProviderKey): Promise<TestResult> {
  const res = await apiRequest("POST", providerPath(provider, "/test"));
  return res.json();
}

export async function disconnectIntegration(provider: IntegrationProviderKey): Promise<void> {
  await apiRequest("DELETE", providerPath(provider));
}

export function invalidateIntegrations(): void {
  queryClient.invalidateQueries({ queryKey: INTEGRATIONS_QUERY_KEY });
}

export interface ProviderMeta {
  key: IntegrationProviderKey;
  title: string;
  category: string;
  description: string;
  /** Icon key resolved by the Tools page (keeps this module free of JSX). */
  icon: "database" | "salesforce" | "calendar" | "zapier" | "cable" | "zoho";
  kind: IntegrationKind;
  docsUrl: string;
  docsLabel: string;
  /** Admin app-key settings this provider needs (empty = no admin keys required). */
  adminKeys: string[];
}

export const PROVIDER_META: Record<IntegrationProviderKey, ProviderMeta> = {
  gohighlevel: {
    key: "gohighlevel",
    title: "GoHighLevel",
    category: "CRM & Marketing Automation",
    description: "Manage CRM contacts, sync calendars, and automate appointments with GHL.",
    icon: "database",
    kind: "oauth",
    docsUrl: "https://marketplace.gohighlevel.com/",
    docsLabel: "GoHighLevel Marketplace app",
    adminKeys: ["ghl_client_id", "ghl_client_secret"],
  },
  salesforce: {
    key: "salesforce",
    title: "Salesforce",
    category: "CRM",
    description: "Sync contacts, deals, and appointments with your Salesforce org via OAuth.",
    icon: "salesforce",
    kind: "oauth",
    docsUrl: "https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm",
    docsLabel: "Salesforce connected app",
    adminKeys: ["salesforce_client_id", "salesforce_client_secret"],
  },
  calcom: {
    key: "calcom",
    title: "Cal.com",
    category: "Scheduling & Booking",
    description: "Sync booking pages and let agents handle appointment scheduling directly.",
    icon: "calendar",
    kind: "apikey",
    docsUrl: "https://app.cal.com/settings/developer/api-keys",
    docsLabel: "Cal.com API keys",
    adminKeys: [],
  },
  zapier: {
    key: "zapier",
    title: "Zapier",
    category: "Automation",
    description: "Connect your AI agents to 5000+ apps through Zapier webhooks and triggers.",
    icon: "zapier",
    kind: "webhook",
    docsUrl: "https://zapier.com/apps/webhook/integrations",
    docsLabel: "Webhooks by Zapier (Catch Hook)",
    adminKeys: [],
  },
  pabbly: {
    key: "pabbly",
    title: "Pabbly Connect",
    category: "Automation",
    description: "Create custom workflows and automate tasks without any coding.",
    icon: "cable",
    kind: "webhook",
    docsUrl: "https://www.pabbly.com/connect/integrations/webhook/",
    docsLabel: "Pabbly Connect Webhook trigger",
    adminKeys: [],
  },
  zoho: {
    key: "zoho",
    title: "Zoho CRM",
    category: "CRM",
    description: "Sync your leads and contacts with Zoho CRM for better pipeline management.",
    icon: "zoho",
    kind: "oauth",
    docsUrl: "https://api-console.zoho.in/",
    docsLabel: "Zoho API Console",
    adminKeys: ["zoho_client_id", "zoho_client_secret"],
  },
};

/** Order in which the cards are rendered on the Tools page. */
export const PROVIDER_ORDER: IntegrationProviderKey[] = ["gohighlevel", "salesforce", "calcom", "zapier", "pabbly", "zoho"];

/**
 * Events a Zapier / Pabbly webhook can subscribe to. Labels reuse the
 * i18n keys of the Webhooks page (`webhooks.events.*`) plus the integration-only
 * `lead.upserted` event emitted by the CRM lead processor.
 */
export interface IntegrationEventOption {
  value: string;
  labelKey: string;
  fallback: string;
}

export interface IntegrationEventGroup {
  labelKey: string;
  fallback: string;
  events: IntegrationEventOption[];
}

export const INTEGRATION_EVENT_GROUPS: IntegrationEventGroup[] = [
  {
    labelKey: "integrations.providers.events.leads",
    fallback: "Leads",
    events: [
      { value: "lead.upserted", labelKey: "integrations.providers.events.leadUpserted", fallback: "Lead created or updated" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.callEvents",
    fallback: "Call events",
    events: [
      { value: "call.started", labelKey: "webhooks.events.callStarted", fallback: "Call started" },
      { value: "call.answered", labelKey: "webhooks.events.callAnswered", fallback: "Call answered" },
      { value: "call.completed", labelKey: "webhooks.events.callCompleted", fallback: "Call completed" },
      { value: "call.failed", labelKey: "webhooks.events.callFailed", fallback: "Call failed" },
      { value: "call.transferred", labelKey: "webhooks.events.callTransferred", fallback: "Call transferred" },
      { value: "call.no_answer", labelKey: "webhooks.events.callNoAnswer", fallback: "No answer" },
      { value: "call.busy", labelKey: "webhooks.events.callBusy", fallback: "Busy" },
      { value: "call.voicemail", labelKey: "webhooks.events.callVoicemail", fallback: "Voicemail" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.inboundCallEvents",
    fallback: "Inbound call events",
    events: [
      { value: "inbound_call.received", labelKey: "webhooks.events.inboundCallReceived", fallback: "Inbound call received" },
      { value: "inbound_call.answered", labelKey: "webhooks.events.inboundCallAnswered", fallback: "Inbound call answered" },
      { value: "inbound_call.completed", labelKey: "webhooks.events.inboundCallCompleted", fallback: "Inbound call completed" },
      { value: "inbound_call.missed", labelKey: "webhooks.events.inboundCallMissed", fallback: "Inbound call missed" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.campaignEvents",
    fallback: "Campaign events",
    events: [
      { value: "campaign.started", labelKey: "webhooks.events.campaignStarted", fallback: "Campaign started" },
      { value: "campaign.paused", labelKey: "webhooks.events.campaignPaused", fallback: "Campaign paused" },
      { value: "campaign.resumed", labelKey: "webhooks.events.campaignResumed", fallback: "Campaign resumed" },
      { value: "campaign.completed", labelKey: "webhooks.events.campaignCompleted", fallback: "Campaign completed" },
      { value: "campaign.failed", labelKey: "webhooks.events.campaignFailed", fallback: "Campaign failed" },
      { value: "campaign.cancelled", labelKey: "webhooks.events.campaignCancelled", fallback: "Campaign cancelled" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.flowEvents",
    fallback: "Flow events",
    events: [
      { value: "flow.started", labelKey: "webhooks.events.flowStarted", fallback: "Flow started" },
      { value: "flow.completed", labelKey: "webhooks.events.flowCompleted", fallback: "Flow completed" },
      { value: "flow.failed", labelKey: "webhooks.events.flowFailed", fallback: "Flow failed" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.appointmentEvents",
    fallback: "Appointment events",
    events: [
      { value: "appointment.booked", labelKey: "webhooks.events.appointmentBooked", fallback: "Appointment booked" },
      { value: "appointment.confirmed", labelKey: "webhooks.events.appointmentConfirmed", fallback: "Appointment confirmed" },
      { value: "appointment.cancelled", labelKey: "webhooks.events.appointmentCancelled", fallback: "Appointment cancelled" },
      { value: "appointment.rescheduled", labelKey: "webhooks.events.appointmentRescheduled", fallback: "Appointment rescheduled" },
      { value: "appointment.completed", labelKey: "webhooks.events.appointmentCompleted", fallback: "Appointment completed" },
      { value: "appointment.no_show", labelKey: "webhooks.events.appointmentNoShow", fallback: "Appointment no-show" },
    ],
  },
  {
    labelKey: "webhooks.eventGroups.formEvents",
    fallback: "Form events",
    events: [
      { value: "form.submitted", labelKey: "webhooks.events.formSubmitted", fallback: "Form submitted" },
      { value: "form.lead_created", labelKey: "webhooks.events.formLeadCreated", fallback: "Lead created from form" },
    ],
  },
];

export const MAX_WEBHOOK_TARGETS = 5;

/** Short, common IANA zones for the Cal.com booking timezone select. */
export const INTEGRATION_TIMEZONES: { value: string; label: string }[] = [
  { value: "Asia/Kolkata", label: "India (Asia/Kolkata)" },
  { value: "Asia/Dubai", label: "Dubai (Asia/Dubai)" },
  { value: "Asia/Singapore", label: "Singapore (Asia/Singapore)" },
  { value: "Asia/Tokyo", label: "Tokyo (Asia/Tokyo)" },
  { value: "Australia/Sydney", label: "Sydney (Australia/Sydney)" },
  { value: "Europe/London", label: "London (Europe/London)" },
  { value: "Europe/Paris", label: "Paris (Europe/Paris)" },
  { value: "Europe/Berlin", label: "Berlin (Europe/Berlin)" },
  { value: "America/New_York", label: "New York (America/New_York)" },
  { value: "America/Chicago", label: "Chicago (America/Chicago)" },
  { value: "America/Denver", label: "Denver (America/Denver)" },
  { value: "America/Los_Angeles", label: "Los Angeles (America/Los_Angeles)" },
  { value: "America/Sao_Paulo", label: "Sao Paulo (America/Sao_Paulo)" },
  { value: "UTC", label: "UTC" },
];

/** Extracts a user-facing message from an ApiError / Error thrown by apiRequest. */
export function integrationErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const e = err as { data?: { error?: string; missing?: string[] }; message?: string };
    if (e.data?.error) {
      return e.data.missing?.length ? `${e.data.error} (${e.data.missing.join(", ")})` : e.data.error;
    }
    if (e.message) return e.message;
  }
  return fallback;
}
