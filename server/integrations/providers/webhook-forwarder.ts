import { createHmac } from "crypto";
import type { UserIntegration, IntegrationProvider as ProviderKey } from "@shared/schema";
import { WEBHOOK_EVENT_TYPES, generateComprehensiveTestPayload } from "../../services/webhook-test-service";
import { validateWebhookUrl } from "../../utils/url-validator";
import { inboundTriggerUrl } from "../app-keys";
import { fetchWithTimeout } from "../http";
import { asObject, str } from "../normalize";
import { errorMessage, type EventData, type IntegrationProvider, type SyncResult } from "../types";

const MAX_WEBHOOKS = 5;
const TIMEOUT_MS = 8_000;
const MAX_ATTEMPTS = 2;

/** Events a Zapier/Pabbly webhook may subscribe to: the app's outgoing events plus the CRM `lead.upserted` */
export const FORWARDABLE_EVENTS: string[] = ["lead.upserted", ...WEBHOOK_EVENT_TYPES.filter((e) => e !== "webhook.test")];

interface WebhookTarget {
  url: string;
  events: string[];
}

interface PostOutcome {
  ok: boolean;
  httpStatus?: number;
  error?: string;
  attempts: number;
}

function targetsOf(row: UserIntegration | null): WebhookTarget[] {
  const raw = asObject(row?.config)?.webhooks;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => asObject(item))
    .filter((item): item is Record<string, unknown> => !!item && !!str(item.url))
    .map((item) => ({
      url: str(item.url) as string,
      events: Array.isArray(item.events) ? item.events.filter((e): e is string => typeof e === "string") : [],
    }));
}

async function parseTargets(input: Record<string, unknown>): Promise<{ webhooks: WebhookTarget[]; error?: string }> {
  const raw = input.webhooks;
  if (!Array.isArray(raw)) return { webhooks: [], error: "webhooks must be an array" };
  if (raw.length > MAX_WEBHOOKS) return { webhooks: [], error: `At most ${MAX_WEBHOOKS} webhook URLs are allowed` };
  const webhooks: WebhookTarget[] = [];
  for (const item of raw) {
    const entry = asObject(item);
    const url = str(entry?.url);
    if (!url) return { webhooks: [], error: "Each webhook needs a url" };
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return { webhooks: [], error: `Invalid URL: ${url}` };
    }
    if (parsed.protocol !== "https:") return { webhooks: [], error: `Webhook URLs must use https: ${url}` };
    const check = await validateWebhookUrl(url);
    if (!check.valid) return { webhooks: [], error: `${check.error}: ${url}` };
    const events = Array.isArray(entry?.events) ? entry.events.filter((e): e is string => typeof e === "string") : [];
    const unknown = events.filter((e) => !FORWARDABLE_EVENTS.includes(e));
    if (unknown.length) return { webhooks: [], error: `Unknown event(s): ${unknown.join(", ")}` };
    if (!webhooks.some((w) => w.url === url)) webhooks.push({ url, events: Array.from(new Set(events)) });
  }
  return { webhooks };
}

function signedHeaders(row: UserIntegration, event: string, body: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "User-Agent": "Zonvo-Integrations/1.0",
    "X-Zonvo-Event": event,
    "X-Zonvo-Signature": `sha256=${createHmac("sha256", row.id).update(body).digest("hex")}`,
  };
}

/** POSTs once, retrying a single time on 5xx / timeout / network failure */
async function post(url: string, body: string, headers: Record<string, string>): Promise<PostOutcome> {
  let outcome: PostOutcome = { ok: false, attempts: 0 };
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      // Never follow redirects: the target was SSRF-checked, a 3xx could point anywhere (internal hosts included)
      const resp = await fetchWithTimeout(url, { method: "POST", headers, body, redirect: "manual" }, TIMEOUT_MS);
      const redirected = resp.status >= 300 && resp.status < 400;
      const ok = resp.ok && !redirected;
      outcome = { ok, httpStatus: resp.status, attempts: attempt, error: ok ? undefined : redirected ? `HTTP ${resp.status} redirect not followed` : `HTTP ${resp.status}` };
      if (ok || resp.status < 500) return outcome;
    } catch (err) {
      outcome = { ok: false, attempts: attempt, error: errorMessage(err) };
    }
  }
  return outcome;
}

function subscribed(target: WebhookTarget, event: string): boolean {
  return target.events.length === 0 || target.events.includes(event);
}

export function createWebhookProvider(key: ProviderKey, displayName: string): IntegrationProvider {
  return {
    key,
    displayName,
    kind: "webhook",
    appKeys: [],

    async applyConfig(input) {
      const parsed = await parseTargets(input);
      if (parsed.error) return { config: {}, error: parsed.error };
      return { config: { webhooks: parsed.webhooks } };
    },

    publicConfig(row) {
      return { webhooks: targetsOf(row), inboundUrl: inboundTriggerUrl(), signingSecret: row?.id ?? null };
    },

    async validate(row) {
      const targets = targetsOf(row);
      if (!targets.length) return { ok: false, error: "No webhook URLs configured" };
      return { ok: true, accountName: `${targets.length} webhook${targets.length === 1 ? "" : "s"}` };
    },

    async test(row) {
      const targets = targetsOf(row);
      if (!targets.length) return { ok: false, error: "No webhook URLs configured" };
      const body = JSON.stringify(generateComprehensiveTestPayload("webhook.test"));
      const headers = signedHeaders(row, "webhook.test", body);
      const results = await Promise.all(targets.map(async (t) => {
        const outcome = await post(t.url, body, headers);
        return { url: t.url, ok: outcome.ok, httpStatus: outcome.httpStatus, error: outcome.error };
      }));
      const failed = results.find((r) => !r.ok);
      return { ok: !failed, results, error: failed ? `${failed.url}: ${failed.error}` : undefined };
    },

    supports(event, row) {
      return event !== "webhook.test" && targetsOf(row).some((t) => subscribed(t, event));
    },

    async handle(row, event, data: EventData, ctx) {
      const body = JSON.stringify({ event, timestamp: new Date().toISOString(), data });
      const headers = signedHeaders(row, event, body);
      const targets = targetsOf(row).filter((t) => subscribed(t, event));
      return Promise.all(targets.map(async (t): Promise<SyncResult> => {
        const outcome = await post(t.url, body, headers);
        return {
          action: "webhook.post",
          status: outcome.ok ? "success" : "failed",
          sourceId: ctx.sourceId,
          error: outcome.error ?? null,
          payload: { url: t.url, httpStatus: outcome.httpStatus ?? null, attempts: outcome.attempts },
        };
      }));
    },
  };
}
