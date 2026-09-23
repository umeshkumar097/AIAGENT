import { Router, type Request, type Response } from "express";
import { INTEGRATION_PROVIDERS, type IntegrationProvider as ProviderKey, type UserIntegration } from "@shared/schema";
import { strictRateLimiter } from "../middleware/rateLimiter";
import { missingAppKeys, redirectUriFor } from "./app-keys";
import { invalidateIntegrationCache } from "./hub";
import { asObject } from "./normalize";
import { signState, verifyState } from "./oauth-state";
import { PROVIDERS, isProviderKey } from "./providers";
import {
  deleteIntegrationRow, getIntegrationRow, listIntegrationRows, recentSyncLogs, updateIntegrationRow, upsertIntegrationRow,
} from "./token-store";
import { errorMessage, type IntegrationProvider, type TestResult } from "./types";

export const integrationsRouter = Router();
const LOG = "[Integrations]";

function userIdOf(req: Request): string {
  const r = req as Request & { userId?: string; user?: { id?: string } };
  return r.userId ?? r.user?.id ?? "";
}

function providerOf(req: Request): IntegrationProvider {
  return PROVIDERS[req.params.provider as ProviderKey];
}

async function isConfigured(provider: IntegrationProvider): Promise<boolean> {
  return provider.appKeys.length === 0 || (await missingAppKeys(provider.appKeys)).length === 0;
}

function summarize(provider: IntegrationProvider, row: UserIntegration | null, configured: boolean) {
  return {
    provider: provider.key,
    displayName: provider.displayName,
    kind: provider.kind,
    configured,
    connected: !!row && row.status !== "disconnected",
    status: row?.status ?? "disconnected",
    accountName: row?.accountName ?? null,
    externalAccountId: row?.externalAccountId ?? null,
    lastSyncAt: row?.lastSyncAt ?? null,
    lastError: row?.lastError ?? null,
    config: provider.publicConfig(row),
    redirectUri: provider.kind === "oauth" ? redirectUriFor(provider.key) : null,
  };
}

integrationsRouter.use((req: Request, res: Response, next) => {
  if (!userIdOf(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
});

integrationsRouter.param("provider", (req, res, next, value: string) => {
  if (!isProviderKey(value)) {
    res.status(404).json({ error: "Unknown integration provider" });
    return;
  }
  next();
});

integrationsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const rows = await listIntegrationRows(userIdOf(req));
    const providers = await Promise.all(INTEGRATION_PROVIDERS.map(async (key) => {
      const provider = PROVIDERS[key];
      return summarize(provider, rows.find((r) => r.provider === key) ?? null, await isConfigured(provider));
    }));
    res.json({ providers });
  } catch (err) {
    console.error(`${LOG} list failed:`, errorMessage(err));
    res.status(500).json({ error: "Failed to load integrations" });
  }
});

integrationsRouter.get("/:provider/auth", strictRateLimiter, async (req: Request, res: Response) => {
  const provider = providerOf(req);
  if (provider.kind !== "oauth" || !provider.getAuthUrl) {
    res.status(400).json({ error: `${provider.displayName} does not use OAuth` });
    return;
  }
  const missing = await missingAppKeys(provider.appKeys);
  if (missing.length) {
    res.status(503).json({ errorCode: "not_configured", error: `${provider.displayName} app keys are not configured`, missing });
    return;
  }
  try {
    const url = await provider.getAuthUrl(redirectUriFor(provider.key), signState(userIdOf(req), provider.key));
    res.json({ url });
  } catch (err) {
    console.error(`${LOG} ${provider.key} auth url failed:`, errorMessage(err));
    res.status(500).json({ error: "Could not build the authorization URL" });
  }
});

integrationsRouter.post("/:provider/exchange", strictRateLimiter, async (req: Request, res: Response) => {
  const userId = userIdOf(req);
  const provider = providerOf(req);
  if (!provider.exchangeCode) {
    res.status(400).json({ error: `${provider.displayName} does not use OAuth` });
    return;
  }
  const { code, state } = (asObject(req.body) ?? {}) as { code?: unknown; state?: unknown };
  if (typeof code !== "string" || typeof state !== "string" || !code || !state) {
    res.status(400).json({ error: "Missing code or state parameter" });
    return;
  }
  const verified = verifyState(state);
  if (!verified) {
    res.status(400).json({ errorCode: "invalid_state", error: "OAuth state is invalid or expired. Please try connecting again." });
    return;
  }
  if (verified.userId !== userId) {
    res.status(403).json({ errorCode: "state_user_mismatch", error: "OAuth state does not match the authenticated user." });
    return;
  }
  if (verified.provider !== provider.key) {
    res.status(400).json({ errorCode: "provider_mismatch", error: "OAuth state was issued for a different provider." });
    return;
  }
  const missing = await missingAppKeys(provider.appKeys);
  if (missing.length) {
    res.status(503).json({ errorCode: "not_configured", error: `${provider.displayName} app keys are not configured`, missing });
    return;
  }
  try {
    const existing = await getIntegrationRow(userId, provider.key);
    const result = await provider.exchangeCode(code, redirectUriFor(provider.key));
    let row = await upsertIntegrationRow(userId, provider.key, {
      status: "connected",
      accessToken: result.accessToken,
      refreshToken: result.refreshToken ?? existing?.refreshToken ?? null,
      tokenExpiry: result.expiresIn ? new Date(Date.now() + result.expiresIn * 1000) : null,
      instanceUrl: result.instanceUrl ?? existing?.instanceUrl ?? null,
      externalAccountId: result.externalAccountId ?? existing?.externalAccountId ?? null,
      accountName: result.accountName ?? existing?.accountName ?? null,
      config: existing?.config ?? {},
      lastError: null,
    });
    const check = await provider.validate(row);
    row = (await updateIntegrationRow(row.id, check.ok
      ? { status: "connected", lastError: null, accountName: check.accountName ?? row.accountName, externalAccountId: check.externalAccountId ?? row.externalAccountId }
      : { status: "error", lastError: check.error ?? "Validation failed" })) ?? row;
    invalidateIntegrationCache(userId);
    if (!check.ok) {
      res.status(502).json({ errorCode: "validation_failed", error: check.error ?? "Validation failed" });
      return;
    }
    res.json({ connected: true, accountName: row.accountName });
  } catch (err) {
    console.error(`${LOG} ${provider.key} exchange failed:`, errorMessage(err));
    res.status(502).json({ errorCode: "token_exchange_failed", error: errorMessage(err) });
  }
});

integrationsRouter.put("/:provider/config", async (req: Request, res: Response) => {
  const userId = userIdOf(req);
  const provider = providerOf(req);
  if (!provider.applyConfig) {
    res.status(400).json({ ok: false, error: `${provider.displayName} has no configurable options` });
    return;
  }
  try {
    const existing = await getIntegrationRow(userId, provider.key);
    if (provider.kind === "oauth" && !existing) {
      res.status(409).json({ ok: false, error: `Connect ${provider.displayName} before configuring it` });
      return;
    }
    const result = await provider.applyConfig(asObject(req.body) ?? {}, existing);
    if (result.error) {
      res.status(400).json({ ok: false, error: result.error });
      return;
    }
    let row = await upsertIntegrationRow(userId, provider.key, {
      config: result.config,
      status: "connected",
      lastError: null,
      ...(result.accessToken !== undefined ? { accessToken: result.accessToken } : {}),
    });
    if (provider.kind === "apikey") {
      const check = await provider.validate(row);
      row = (await updateIntegrationRow(row.id, check.ok
        ? { accountName: check.accountName ?? row.accountName, externalAccountId: check.externalAccountId ?? row.externalAccountId }
        : { status: "error", lastError: check.error ?? "Validation failed" })) ?? row;
      invalidateIntegrationCache(userId);
      if (!check.ok) {
        res.status(400).json({ ok: false, error: check.error ?? "Validation failed" });
        return;
      }
    }
    invalidateIntegrationCache(userId);
    res.json({ ok: true, accountName: row.accountName, config: provider.publicConfig(row) });
  } catch (err) {
    console.error(`${LOG} ${provider.key} config failed:`, errorMessage(err));
    res.status(500).json({ ok: false, error: "Failed to save configuration" });
  }
});

integrationsRouter.post("/:provider/test", strictRateLimiter, async (req: Request, res: Response) => {
  const userId = userIdOf(req);
  const provider = providerOf(req);
  const row = await getIntegrationRow(userId, provider.key);
  if (!row) {
    res.status(404).json({ ok: false, error: `${provider.displayName} is not connected` });
    return;
  }
  try {
    const result: TestResult = provider.test ? await provider.test(row) : await provider.validate(row);
    await updateIntegrationRow(row.id, result.ok
      ? { status: "connected", lastError: null, accountName: result.accountName ?? row.accountName, externalAccountId: result.externalAccountId ?? row.externalAccountId }
      : { lastError: result.error ?? "Test failed" });
    invalidateIntegrationCache(userId);
    res.json({ ok: result.ok, error: result.error, results: result.results, accountName: result.accountName ?? row.accountName });
  } catch (err) {
    console.error(`${LOG} ${provider.key} test failed:`, errorMessage(err));
    res.status(502).json({ ok: false, error: errorMessage(err) });
  }
});

integrationsRouter.get("/:provider/options", async (req: Request, res: Response) => {
  const provider = providerOf(req);
  const row = await getIntegrationRow(userIdOf(req), provider.key);
  if (!row) {
    res.status(404).json({ error: `${provider.displayName} is not connected` });
    return;
  }
  try {
    res.json(provider.options ? await provider.options(row) : {});
  } catch (err) {
    console.error(`${LOG} ${provider.key} options failed:`, errorMessage(err));
    res.status(502).json({ error: errorMessage(err) });
  }
});

integrationsRouter.get("/:provider/logs", async (req: Request, res: Response) => {
  const provider = providerOf(req);
  const requested = parseInt(String(req.query.limit ?? "20"), 10);
  const limit = Math.min(100, Math.max(1, Number.isFinite(requested) ? requested : 20));
  try {
    res.json({ logs: await recentSyncLogs(userIdOf(req), provider.key, limit) });
  } catch (err) {
    console.error(`${LOG} ${provider.key} logs failed:`, errorMessage(err));
    res.status(500).json({ error: "Failed to load sync logs" });
  }
});

integrationsRouter.delete("/:provider", async (req: Request, res: Response) => {
  const userId = userIdOf(req);
  const provider = providerOf(req);
  try {
    const row = await getIntegrationRow(userId, provider.key);
    if (row && provider.revoke) {
      try {
        await provider.revoke(row);
      } catch (err) {
        console.warn(`${LOG} ${provider.key} revoke failed (continuing):`, errorMessage(err));
      }
    }
    await deleteIntegrationRow(userId, provider.key);
    invalidateIntegrationCache(userId);
    res.json({ success: true });
  } catch (err) {
    console.error(`${LOG} ${provider.key} disconnect failed:`, errorMessage(err));
    res.status(500).json({ error: "Failed to disconnect" });
  }
});
