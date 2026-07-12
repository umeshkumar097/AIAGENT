'use strict';

import { WebSocket } from "ws";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { globalSettings } from "@shared/schema";
import { randomUUID } from "crypto";
import { isBullMQEnabled, getRedisConnection } from "../bullmq";
import { publish, subscribe } from "../redis/pubsub-manager";

interface ConnectionLimits {
  maxPerProcess: number;
  maxPerUser: number;
  maxPerIp: number;
}

interface ConnectionStats {
  totalConnections: number;
  uniqueUsers: number;
  uniqueIPs: number;
  limits: ConnectionLimits;
  utilizationPercent: number;
}

export class WebSocketConnectionManager {
  private instanceId: string = randomUUID();
  private connections: Map<string, WebSocket> = new Map();
  private userConnections: Map<string, Set<string>> = new Map();
  private ipConnections: Map<string, Set<string>> = new Map();
  private connectionMetadata: Map<string, { userId?: string; ip?: string }> = new Map();
  
  private limits: ConnectionLimits = {
    maxPerProcess: 1000,
    maxPerUser: 5,
    maxPerIp: 10,
  };
  
  private settingsLoaded = false;

  constructor() {
    this.initializePubSub();
  }

  private initializePubSub(): void {
    if (isBullMQEnabled()) {
      subscribe("ws:user-updates", (message: any) => {
        const { userId, payload } = message;
        this.sendToLocalUser(userId, payload);
      }).catch(err => {
        console.error("[WS Manager] Redis PubSub subscription error:", err);
      });
    }
  }

  async loadSettings(): Promise<void> {
    console.log("[WS Manager] Loading settings from globalSettings table...");
    
    try {
      const maxPerProcessResult = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, "max_ws_connections_per_process"));
      
      const maxPerUserResult = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, "max_ws_connections_per_user"));
      
      const maxPerIpResult = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, "max_ws_connections_per_ip"));

      if (maxPerProcessResult[0]?.value) {
        this.limits.maxPerProcess = Number(maxPerProcessResult[0].value);
      }
      
      if (maxPerUserResult[0]?.value) {
        this.limits.maxPerUser = Number(maxPerUserResult[0].value);
      }
      
      if (maxPerIpResult[0]?.value) {
        this.limits.maxPerIp = Number(maxPerIpResult[0].value);
      }

      this.settingsLoaded = true;
      console.log(`[WS Manager] Settings loaded: maxPerProcess=${this.limits.maxPerProcess}, maxPerUser=${this.limits.maxPerUser}, maxPerIp=${this.limits.maxPerIp}`);
    } catch (error) {
      console.log(`[WS Manager] Failed to load settings, using defaults: ${error instanceof Error ? error.message : String(error)}`);
      this.settingsLoaded = true;
    }
  }

  async refreshSettings(): Promise<void> {
    console.log("[WS Manager] Refreshing settings...");
    this.settingsLoaded = false;
    await this.loadSettings();
  }

  private async ensureSettingsLoaded(): Promise<void> {
    if (!this.settingsLoaded) {
      await this.loadSettings();
    }
  }

  async addConnection(id: string, ws: WebSocket, userId?: string, ip?: string): Promise<boolean> {
    await this.ensureSettingsLoaded();

    if (this.connections.size >= this.limits.maxPerProcess) {
      console.log(`[WS Manager] Connection rejected: process limit reached (${this.connections.size}/${this.limits.maxPerProcess})`);
      return false;
    }

    if (isBullMQEnabled()) {
      const redis = getRedisConnection();
      
      if (userId) {
        const userSetKey = `ws:global:conns:user:${userId}`;
        await redis.sadd(userSetKey, `${this.instanceId}:${id}`);
        await redis.expire(userSetKey, 86400); // 24-hour safety TTL
        
        const globalUserCount = await redis.scard(userSetKey);
        if (globalUserCount > this.limits.maxPerUser) {
          console.log(`[WS Manager] Connection rejected: global user limit reached for ${userId} (${globalUserCount}/${this.limits.maxPerUser})`);
          await redis.srem(userSetKey, `${this.instanceId}:${id}`);
          return false;
        }
      }

      if (ip) {
        const ipSetKey = `ws:global:conns:ip:${ip}`;
        await redis.sadd(ipSetKey, `${this.instanceId}:${id}`);
        await redis.expire(ipSetKey, 86400); // 24-hour safety TTL
        
        const globalIpCount = await redis.scard(ipSetKey);
        if (globalIpCount > this.limits.maxPerIp) {
          console.log(`[WS Manager] Connection rejected: global IP limit reached for ${ip} (${globalIpCount}/${this.limits.maxPerIp})`);
          await redis.srem(ipSetKey, `${this.instanceId}:${id}`);
          
          if (userId) {
            const userSetKey = `ws:global:conns:user:${userId}`;
            await redis.srem(userSetKey, `${this.instanceId}:${id}`);
          }
          return false;
        }
      }
    } else {
      if (userId) {
        const userConns = this.userConnections.get(userId);
        if (userConns && userConns.size >= this.limits.maxPerUser) {
          console.log(`[WS Manager] Connection rejected: user limit reached for ${userId} (${userConns.size}/${this.limits.maxPerUser})`);
          return false;
        }
      }

      if (ip) {
        const ipConns = this.ipConnections.get(ip);
        if (ipConns && ipConns.size >= this.limits.maxPerIp) {
          console.log(`[WS Manager] Connection rejected: IP limit reached for ${ip} (${ipConns.size}/${this.limits.maxPerIp})`);
          return false;
        }
      }
    }

    this.connections.set(id, ws);
    this.connectionMetadata.set(id, { userId, ip });

    if (userId) {
      if (!this.userConnections.has(userId)) {
        this.userConnections.set(userId, new Set());
      }
      this.userConnections.get(userId)!.add(id);
    }

    if (ip) {
      if (!this.ipConnections.has(ip)) {
        this.ipConnections.set(ip, new Set());
      }
      this.ipConnections.get(ip)!.add(id);
    }

    ws.on("close", () => {
      this.removeConnection(id, userId, ip);
    });

    console.log(`[WS Manager] Connection added: ${id} (total: ${this.connections.size})`);
    return true;
  }

  removeConnection(id: string, userId?: string, ip?: string): void {
    if (!this.connections.has(id)) {
      return;
    }

    this.connections.delete(id);
    
    const metadata = this.connectionMetadata.get(id);
    const effectiveUserId = userId || metadata?.userId;
    const effectiveIp = ip || metadata?.ip;

    if (effectiveUserId) {
      const userConns = this.userConnections.get(effectiveUserId);
      if (userConns) {
        userConns.delete(id);
        if (userConns.size === 0) {
          this.userConnections.delete(effectiveUserId);
        }
      }

      if (isBullMQEnabled()) {
        const redis = getRedisConnection();
        redis.srem(`ws:global:conns:user:${effectiveUserId}`, `${this.instanceId}:${id}`)
          .catch(err => console.error(`[WS Manager] Error removing user connection from Redis:`, err));
      }
    }

    if (effectiveIp) {
      const ipConns = this.ipConnections.get(effectiveIp);
      if (ipConns) {
        ipConns.delete(id);
        if (ipConns.size === 0) {
          this.ipConnections.delete(effectiveIp);
        }
      }

      if (isBullMQEnabled()) {
        const redis = getRedisConnection();
        redis.srem(`ws:global:conns:ip:${effectiveIp}`, `${this.instanceId}:${id}`)
          .catch(err => console.error(`[WS Manager] Error removing IP connection from Redis:`, err));
      }
    }

    this.connectionMetadata.delete(id);
    console.log(`[WS Manager] Connection removed: ${id} (total: ${this.connections.size})`);
  }

  getConnection(id: string): WebSocket | undefined {
    return this.connections.get(id);
  }

  getUserConnections(userId: string): Set<string> {
    return this.userConnections.get(userId) || new Set();
  }

  async sendToUser(userId: string, payload: any): Promise<void> {
    if (isBullMQEnabled()) {
      await publish("ws:user-updates", { userId, payload });
    } else {
      this.sendToLocalUser(userId, payload);
    }
  }

  private sendToLocalUser(userId: string, payload: any): void {
    const localSockets = this.getUserConnections(userId);
    localSockets.forEach(socketId => {
      const ws = this.getConnection(socketId);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
      }
    });
  }

  getStats(): ConnectionStats {
    const totalConnections = this.connections.size;
    const uniqueUsers = this.userConnections.size;
    const uniqueIPs = this.ipConnections.size;
    const utilizationPercent = this.limits.maxPerProcess > 0 
      ? Math.round((totalConnections / this.limits.maxPerProcess) * 100) 
      : 0;

    return {
      totalConnections,
      uniqueUsers,
      uniqueIPs,
      limits: { ...this.limits },
      utilizationPercent,
    };
  }

  async closeAll(reason: string): Promise<void> {
    console.log(`[WS Manager] Closing all connections: ${reason}`);
    
    const closePromises: Promise<void>[] = [];
    
    Array.from(this.connections.entries()).forEach(([id, ws]) => {
      closePromises.push(
        new Promise<void>((resolve) => {
          try {
            if (ws.readyState === WebSocket.OPEN) {
              ws.close(1001, reason);
            }
          } catch (error) {
            console.log(`[WS Manager] Error closing connection ${id}: ${error instanceof Error ? error.message : String(error)}`);
          }
          resolve();
        })
      );
    });

    await Promise.all(closePromises);

    if (isBullMQEnabled()) {
      try {
        const redis = getRedisConnection();
        const redisPromises: Promise<any>[] = [];
        
        for (const [id, metadata] of this.connectionMetadata.entries()) {
          if (metadata.userId) {
            redisPromises.push(redis.srem(`ws:global:conns:user:${metadata.userId}`, `${this.instanceId}:${id}`));
          }
          if (metadata.ip) {
            redisPromises.push(redis.srem(`ws:global:conns:ip:${metadata.ip}`, `${this.instanceId}:${id}`));
          }
        }
        
        await Promise.all(redisPromises);
      } catch (err: any) {
        console.error(`[WS Manager] Error cleaning up Redis connections on closeAll:`, err.message);
      }
    }
    
    this.connections.clear();
    this.userConnections.clear();
    this.ipConnections.clear();
    this.connectionMetadata.clear();
    
    console.log(`[WS Manager] All connections closed: ${reason}`);
  }

  getLimits(): ConnectionLimits {
    return { ...this.limits };
  }

  isSettingsLoaded(): boolean {
    return this.settingsLoaded;
  }
}

export const wsManager = new WebSocketConnectionManager();
