import { and, desc, eq, gt, inArray } from "drizzle-orm";
import { db } from "../db";
import { integrationSyncLogs, userIntegrations, type UserIntegration, type IntegrationProvider as ProviderKey } from "@shared/schema";
import { requestJson, type JsonResponse } from "./http";
import { ProviderAuthError, errorMessage, type IntegrationProvider, type SyncResult, type SyncStatus } from "./types";

type IntegrationInsert = typeof userIntegrations.$inferInsert;
const REFRESH_SKEW_MS = 60_000;

export async function getIntegrationRow(userId: string, provider: ProviderKey): Promise<UserIntegration | null> {
  const [row] = await db
    .select()
    .from(userIntegrations)
    .where(and(eq(userIntegrations.userId, userId), eq(userIntegrations.provider, provider)))
    .limit(1);
  return row ?? null;
}

export async function listIntegrationRows(userId: string): Promise<UserIntegration[]> {
  return db.select().from(userIntegrations).where(eq(userIntegrations.userId, userId));
}

export async function upsertIntegrationRow(
  userId: string,
  provider: ProviderKey,
  values: Partial<Omit<IntegrationInsert, "userId" | "provider">>,
): Promise<UserIntegration> {
  const [row] = await db
    .insert(userIntegrations)
    .values({ userId, provider, ...values })
    .onConflictDoUpdate({
      target: [userIntegrations.userId, userIntegrations.provider],
      set: { ...values, updatedAt: new Date() },
    })
    .returning();
  return row;
}

export async function updateIntegrationRow(id: string, values: Partial<IntegrationInsert>): Promise<UserIntegration | null> {
  const [row] = await db
    .update(userIntegrations)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(userIntegrations.id, id))
    .returning();
  return row ?? null;
}

export async function deleteIntegrationRow(userId: string, provider: ProviderKey): Promise<UserIntegration | null> {
  const [row] = await db
    .delete(userIntegrations)
    .where(and(eq(userIntegrations.userId, userId), eq(userIntegrations.provider, provider)))
    .returning();
  return row ?? null;
}

export async function markIntegrationError(id: string, error: string, status?: "error"): Promise<void> {
  await updateIntegrationRow(id, { lastError: error.slice(0, 1000), ...(status ? { status } : {}) });
}

export async function markIntegrationSynced(id: string, lastError: string | null): Promise<void> {
  await updateIntegrationRow(id, { lastSyncAt: new Date(), lastError: lastError ? lastError.slice(0, 1000) : null });
}

function tokenExpired(row: UserIntegration): boolean {
  return !!row.tokenExpiry && row.tokenExpiry.getTime() - REFRESH_SKEW_MS < Date.now();
}

/** Refreshes the access token and persists it; on failure the row is flagged `status: 'error'`. */
export async function refreshIntegrationToken(row: UserIntegration, provider: IntegrationProvider): Promise<UserIntegration> {
  if (!provider.refresh) throw new ProviderAuthError(`${provider.displayName} token expired and cannot be refreshed`);
  try {
    const result = await provider.refresh(row);
    const updated = await updateIntegrationRow(row.id, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken ?? row.refreshToken,
      tokenExpiry: result.expiresIn ? new Date(Date.now() + result.expiresIn * 1000) : row.tokenExpiry,
      instanceUrl: result.instanceUrl ?? row.instanceUrl,
      status: "connected",
    });
    return updated ?? { ...row, accessToken: result.accessToken };
  } catch (err) {
    const message = `Token refresh failed: ${errorMessage(err)}`;
    await markIntegrationError(row.id, message, "error");
    throw new ProviderAuthError(message);
  }
}

export async function withValidToken(row: UserIntegration, provider: IntegrationProvider): Promise<UserIntegration> {
  if (!row.accessToken) throw new ProviderAuthError(`${provider.displayName} is not connected`);
  return tokenExpired(row) ? refreshIntegrationToken(row, provider) : row;
}

/**
 * Runs an authenticated request; a 401 triggers one forced refresh + retry, a second 401 becomes ProviderAuthError.
 */
export async function authorizedRequest<T = any>(
  row: UserIntegration,
  provider: IntegrationProvider,
  build: (current: UserIntegration) => { url: string; init?: RequestInit },
  timeoutMs?: number,
): Promise<JsonResponse<T>> {
  let current = await withValidToken(row, provider);
  let req = build(current);
  let res = await requestJson<T>(req.url, req.init, timeoutMs);
  if (res.status === 401 && provider.refresh) {
    current = await refreshIntegrationToken(current, provider);
    req = build(current);
    res = await requestJson<T>(req.url, req.init, timeoutMs);
  }
  if (res.status === 401) throw new ProviderAuthError(`${provider.displayName} rejected the access token; please reconnect`);
  return res;
}

export interface SyncLogEntry {
  userId: string;
  provider: ProviderKey | string;
  event: string;
  action: string;
  status: SyncStatus;
  sourceId?: string | null;
  externalId?: string | null;
  error?: string | null;
  payload?: Record<string, unknown> | null;
}

export async function logSync(entry: SyncLogEntry): Promise<void> {
  try {
    await db.insert(integrationSyncLogs).values({
      userId: entry.userId,
      provider: entry.provider,
      event: entry.event,
      action: entry.action,
      status: entry.status,
      sourceId: entry.sourceId ?? null,
      externalId: entry.externalId ?? null,
      error: entry.error ? entry.error.slice(0, 1000) : null,
      payload: entry.payload ?? null,
    });
  } catch (err) {
    console.error("[Integrations] Failed to write sync log:", errorMessage(err));
  }
}

export async function logSyncResults(userId: string, provider: ProviderKey | string, event: string, results: SyncResult[]): Promise<void> {
  for (const r of results) {
    await logSync({ userId, provider, event, ...r });
  }
}

export async function recentSyncLogs(userId: string, provider: ProviderKey, limit: number) {
  return db
    .select({
      id: integrationSyncLogs.id,
      event: integrationSyncLogs.event,
      action: integrationSyncLogs.action,
      status: integrationSyncLogs.status,
      sourceId: integrationSyncLogs.sourceId,
      externalId: integrationSyncLogs.externalId,
      error: integrationSyncLogs.error,
      createdAt: integrationSyncLogs.createdAt,
    })
    .from(integrationSyncLogs)
    .where(and(eq(integrationSyncLogs.userId, userId), eq(integrationSyncLogs.provider, provider)))
    .orderBy(desc(integrationSyncLogs.createdAt))
    .limit(limit);
}

/** Newest provider-side id logged for (provider, action, sourceId), e.g. the Cal.com booking uid of an appointment */
export async function findExternalId(provider: ProviderKey | string, sourceId: string, action: string, userId?: string): Promise<string | null> {
  const [row] = await db
    .select({ externalId: integrationSyncLogs.externalId })
    .from(integrationSyncLogs)
    .where(and(
      ...(userId ? [eq(integrationSyncLogs.userId, userId)] : []),
      eq(integrationSyncLogs.provider, provider),
      eq(integrationSyncLogs.sourceId, sourceId),
      eq(integrationSyncLogs.action, action),
      eq(integrationSyncLogs.status, "success"),
    ))
    .orderBy(desc(integrationSyncLogs.createdAt))
    .limit(1);
  return row?.externalId ?? null;
}

export async function wasRecentlySynced(userId: string, provider: string, event: string, sourceId: string, windowMs: number): Promise<boolean> {
  const [row] = await db
    .select({ id: integrationSyncLogs.id })
    .from(integrationSyncLogs)
    .where(and(
      eq(integrationSyncLogs.userId, userId),
      eq(integrationSyncLogs.provider, provider),
      eq(integrationSyncLogs.event, event),
      eq(integrationSyncLogs.sourceId, sourceId),
      inArray(integrationSyncLogs.status, ["success", "skipped"]),
      gt(integrationSyncLogs.createdAt, new Date(Date.now() - windowMs)),
    ))
    .limit(1);
  return !!row;
}
