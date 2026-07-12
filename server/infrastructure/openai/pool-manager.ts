'use strict';
/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { db } from "../../db";
import { globalSettings } from "@shared/schema";
import { eq } from "drizzle-orm";
import type WebSocket from "ws";
import { isBullMQEnabled, getRedisConnection } from "../bullmq";

interface OpenAIConnection {
  ws: WebSocket;
  sessionId: string;
  callUuid: string;
  credentialId: string;
  createdAt: number;
  lastActivity: number;
}

interface PoolSettings {
  maxConnectionsPerCredential: number;
  connectionTimeoutMs: number;
  idleTimeoutMs: number;
}

interface CredentialStats {
  credentialId: string;
  currentLoad: number;
}

interface PoolStats {
  totalConnections: number;
  credentials: CredentialStats[];
  oldestConnectionAge: number;
  averageIdleTime: number;
}

const DEFAULT_SETTINGS: PoolSettings = {
  maxConnectionsPerCredential: 50,
  connectionTimeoutMs: 3600000, // 1 hour
  idleTimeoutMs: 300000, // 5 minutes
};

export class OpenAIPoolManager {
  private connections: Map<string, OpenAIConnection> = new Map();
  private credentialLoads: Map<string, number> = new Map();
  private settings: PoolSettings = { ...DEFAULT_SETTINGS };
  private cleanupInterval: NodeJS.Timeout | null = null;
  private settingsLoaded: boolean = false;

  constructor() {
    this.startCleanupInterval();
  }

  private log(message: string): void {
    console.log(`[OpenAI Pool] ${message}`);
  }

  private warn(message: string): void {
    console.warn(`[OpenAI Pool] ${message}`);
  }

  private error(message: string, err?: Error): void {
    console.error(`[OpenAI Pool] ${message}`, err || "");
  }

  async loadSettings(): Promise<void> {
    try {
      const settingsRows = await db
        .select()
        .from(globalSettings)
        .where(
          eq(globalSettings.key, "max_openai_connections_per_credential")
        );

      const timeoutRows = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, "openai_connection_timeout_ms"));

      const idleRows = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, "openai_idle_timeout_ms"));

      if (settingsRows.length > 0 && settingsRows[0].value !== null) {
        this.settings.maxConnectionsPerCredential = Number(settingsRows[0].value);
      }

      if (timeoutRows.length > 0 && timeoutRows[0].value !== null) {
        this.settings.connectionTimeoutMs = Number(timeoutRows[0].value);
      }

      if (idleRows.length > 0 && idleRows[0].value !== null) {
        this.settings.idleTimeoutMs = Number(idleRows[0].value);
      }

      this.settingsLoaded = true;
      this.log(
        `Settings loaded: maxConnections=${this.settings.maxConnectionsPerCredential}, ` +
        `timeout=${this.settings.connectionTimeoutMs}ms, idle=${this.settings.idleTimeoutMs}ms`
      );
    } catch (err) {
      this.error("Failed to load settings, using defaults", err as Error);
    }
  }

  async refreshSettings(): Promise<void> {
    await this.loadSettings();
  }

  canReserveSlot(credentialId: string): boolean {
    const currentLoad = this.credentialLoads.get(credentialId) || 0;
    return currentLoad < this.settings.maxConnectionsPerCredential;
  }

  async reserveSlot(credentialId: string): Promise<boolean> {
    const maxLimit = this.settings.maxConnectionsPerCredential;

    if (isBullMQEnabled()) {
      try {
        const redis = getRedisConnection();
        const key = `openai:pool:load:${credentialId}`;
        const newLoad = await redis.incr(key);

        await redis.expire(key, 86400); // 24-hour safety TTL

        if (newLoad > maxLimit) {
          await redis.decr(key);
          this.warn(`Global limit reached for ${credentialId}: ${newLoad}/${maxLimit}`);
          return false;
        }
        return true;
      } catch (err: any) {
        this.error(`Redis reserveSlot failed for ${credentialId}`, err);
        return this.reserveSlotLocal(credentialId);
      }
    } else {
      return this.reserveSlotLocal(credentialId);
    }
  }

  private reserveSlotLocal(credentialId: string): boolean {
    const currentLoad = this.credentialLoads.get(credentialId) || 0;
    if (currentLoad >= this.settings.maxConnectionsPerCredential) {
      return false;
    }
    this.credentialLoads.set(credentialId, currentLoad + 1);
    return true;
  }

  async releaseSlot(credentialId: string): Promise<void> {
    if (isBullMQEnabled()) {
      try {
        const redis = getRedisConnection();
        const key = `openai:pool:load:${credentialId}`;
        const newLoad = await redis.decr(key);
        if (newLoad < 0) {
          await redis.set(key, 0);
        }
      } catch (err: any) {
        this.error(`Redis releaseSlot failed for ${credentialId}`, err);
        this.releaseSlotLocal(credentialId);
      }
    } else {
      this.releaseSlotLocal(credentialId);
    }
  }

  private releaseSlotLocal(credentialId: string): void {
    const currentLoad = this.credentialLoads.get(credentialId) || 0;
    const newLoad = Math.max(0, currentLoad - 1);
    if (newLoad === 0) {
      this.credentialLoads.delete(credentialId);
    } else {
      this.credentialLoads.set(credentialId, newLoad);
    }
  }

  addConnection(
    callUuid: string,
    ws: WebSocket,
    sessionId: string,
    credentialId: string
  ): void {
    const now = Date.now();
    const connection: OpenAIConnection = {
      ws,
      sessionId,
      callUuid,
      credentialId,
      createdAt: now,
      lastActivity: now,
    };

    this.connections.set(callUuid, connection);

    this.getCredentialLoad(credentialId).then(load => {
      this.log(
        `Added connection: callUuid=${callUuid}, credentialId=${credentialId}, ` +
        `load=${load}/${this.settings.maxConnectionsPerCredential}`
      );
    }).catch(() => {
      this.log(`Added connection: callUuid=${callUuid}, credentialId=${credentialId}`);
    });
  }

  async removeConnection(callUuid: string): Promise<void> {
    const connection = this.connections.get(callUuid);
    if (!connection) {
      return;
    }

    const { credentialId } = connection;
    this.connections.delete(callUuid);

    await this.releaseSlot(credentialId);

    const newLoad = await this.getCredentialLoad(credentialId);
    this.log(
      `Removed connection: callUuid=${callUuid}, credentialId=${credentialId}, ` +
      `load=${newLoad}/${this.settings.maxConnectionsPerCredential}`
    );
  }

  updateActivity(callUuid: string): void {
    const connection = this.connections.get(callUuid);
    if (connection) {
      connection.lastActivity = Date.now();
    }
  }

  cleanupStaleConnections(): void {
    const now = Date.now();
    let closedCount = 0;

    const connectionsToClose: string[] = [];

    Array.from(this.connections.entries()).forEach(([callUuid, connection]) => {
      const age = now - connection.createdAt;
      const idleTime = now - connection.lastActivity;

      const isTimedOut = age > this.settings.connectionTimeoutMs;
      const isIdle = idleTime > this.settings.idleTimeoutMs;

      if (isTimedOut || isIdle) {
        const reason = isTimedOut ? "connection timeout" : "idle timeout";
        this.warn(
          `Closing stale connection: callUuid=${callUuid}, reason=${reason}, ` +
          `age=${Math.round(age / 1000)}s, idle=${Math.round(idleTime / 1000)}s`
        );

        try {
          if (connection.ws.readyState === 1) { // WebSocket.OPEN
            connection.ws.close(1000, `Closed by pool manager: ${reason}`);
          }
        } catch (err) {
          this.error(`Error closing WebSocket for ${callUuid}`, err as Error);
        }

        connectionsToClose.push(callUuid);
        closedCount++;
      }
    });

    // Handle removal asynchronously
    connectionsToClose.forEach(callUuid => {
      this.removeConnection(callUuid).catch(err => {
        this.error(`Failed to remove stale connection ${callUuid}`, err);
      });
    });

    if (closedCount > 0) {
      this.log(`Cleanup completed: closed ${closedCount} stale connections`);
    }
  }

  private startCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      this.cleanupStaleConnections();
    }, 60000); // Every 60 seconds

    this.log("Started cleanup interval (60s)");
  }

  stopCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
      this.log("Stopped cleanup interval");
    }
  }

  async getStats(): Promise<PoolStats> {
    const now = Date.now();
    let totalConnections = this.connections.size;
    let oldestAge = 0;
    let totalIdleTime = 0;

    Array.from(this.connections.values()).forEach(connection => {
      const age = now - connection.createdAt;
      const idleTime = now - connection.lastActivity;

      if (age > oldestAge) {
        oldestAge = age;
      }
      totalIdleTime += idleTime;
    });

    const credentials: CredentialStats[] = [];

    if (isBullMQEnabled()) {
      try {
        const redis = getRedisConnection();
        const credentialIds = new Set<string>();
        Array.from(this.connections.values()).forEach(c => credentialIds.add(c.credentialId));
        Array.from(this.credentialLoads.keys()).forEach(c => credentialIds.add(c));

        for (const credId of credentialIds) {
          const currentLoad = Number(await redis.get(`openai:pool:load:${credId}`) || 0);
          credentials.push({ credentialId: credId, currentLoad });
        }
      } catch (err) {
        Array.from(this.credentialLoads.entries()).forEach(
          ([credentialId, currentLoad]) => {
            credentials.push({ credentialId, currentLoad });
          }
        );
      }
    } else {
      Array.from(this.credentialLoads.entries()).forEach(
        ([credentialId, currentLoad]) => {
          credentials.push({ credentialId, currentLoad });
        }
      );
    }

    return {
      totalConnections,
      credentials,
      oldestConnectionAge: oldestAge,
      averageIdleTime: totalConnections > 0 ? Math.round(totalIdleTime / totalConnections) : 0,
    };
  }

  getConnection(callUuid: string): OpenAIConnection | undefined {
    return this.connections.get(callUuid);
  }

  async getCredentialLoad(credentialId: string): Promise<number> {
    if (isBullMQEnabled()) {
      try {
        const redis = getRedisConnection();
        return Number(await redis.get(`openai:pool:load:${credentialId}`) || 0);
      } catch (err) {
        return this.credentialLoads.get(credentialId) || 0;
      }
    }
    return this.credentialLoads.get(credentialId) || 0;
  }

  getSettings(): PoolSettings {
    return { ...this.settings };
  }

  isSettingsLoaded(): boolean {
    return this.settingsLoaded;
  }
}

export const openaiPoolManager = new OpenAIPoolManager();
