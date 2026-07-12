'use strict';
/**
 * ============================================================
 * Hybrid Cache Manager
 * 
 * A fail-open caching layer for high-frequency database reads.
 * Uses Redis when BullMQ is enabled (ENABLE_BULLMQ=true + REDIS_URL),
 * or falls back to a local in-memory Map with TTL expiry.
 * 
 * Features:
 * - Generic get/set/del with TTL support
 * - `wrap()` helper for transparent cache-aside pattern
 * - Pattern-based deletion (e.g., del all keys starting with "cache:plans:")
 * - Fail-open: if Redis errors, silently falls through to DB
 * - Periodic sweep of expired in-memory entries
 * ============================================================
 */

import type Redis from 'ioredis';

interface CacheEntry<T = any> {
  value: T;
  expiry: number; // Unix timestamp in ms
}

/** Default TTLs in seconds */
export const CACHE_TTL = {
  GLOBAL_SETTINGS: 3600,      // 1 hour — rarely changes
  SEO_SETTINGS: 3600,         // 1 hour — admin-only updates
  PLANS: 3600,                // 1 hour — admin-only updates
  EMAIL_TEMPLATES: 1800,      // 30 minutes
  PROMPT_TEMPLATES: 3600,     // 1 hour
  USER_EFFECTIVE_LIMITS: 300, // 5 minutes — user-specific, changes on subscription update
} as const;

/** Cache key prefixes used by the storage layer */
export const CACHE_KEYS = {
  SETTING: (key: string) => `cache:settings:${key}`,
  SEO: 'cache:seo_settings',
  PLAN: (id: string) => `cache:plans:${id}`,
  ALL_PLANS: 'cache:plans:all',
  EMAIL_TEMPLATE: (type: string) => `cache:email_template:${type}`,
  PROMPT_TEMPLATES_SYSTEM: 'cache:prompt_templates:system',
  USER_LIMITS: (userId: string) => `cache:limits:${userId}`,
} as const;

const SWEEP_INTERVAL_MS = 60_000; // Sweep expired in-memory entries every 60s

export class CacheManager {
  private memoryStore = new Map<string, CacheEntry>();
  private sweepTimer: NodeJS.Timeout | null = null;
  private redisClient: Redis | null = null;
  private useRedis = false;
  private isInitialized = false;

  /**
   * Initialize the cache manager.
   * Call this AFTER BullMQ/Redis is ready.
   * If Redis is unavailable, silently falls back to in-memory.
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Try to get Redis connection from BullMQ infrastructure
    try {
      const { isBullMQEnabled, getRedisConnection } = await import('../bullmq');
      if (isBullMQEnabled()) {
        this.redisClient = getRedisConnection();
        this.useRedis = true;
        console.log('[CacheManager] Initialized with Redis backend');
      } else {
        console.log('[CacheManager] Initialized with in-memory backend (BullMQ not enabled)');
      }
    } catch {
      console.log('[CacheManager] Initialized with in-memory backend (BullMQ module unavailable)');
    }

    // Start periodic sweep for in-memory store
    this.startSweep();
    this.isInitialized = true;
  }

  /**
   * Get a cached value by key.
   * Returns undefined on miss or error (fail-open).
   */
  async get<T>(key: string): Promise<T | undefined> {
    try {
      if (this.useRedis && this.redisClient) {
        const raw = await this.redisClient.get(key);
        if (raw === null) return undefined;
        return JSON.parse(raw) as T;
      }

      // In-memory fallback
      const entry = this.memoryStore.get(key);
      if (!entry) return undefined;
      if (Date.now() > entry.expiry) {
        this.memoryStore.delete(key);
        return undefined;
      }
      return entry.value as T;
    } catch (error: any) {
      // Fail-open: log and return undefined so caller falls through to DB
      console.warn(`[CacheManager] GET error for key "${key}":`, error.message);
      return undefined;
    }
  }

  /**
   * Set a cached value with TTL.
   * Silently swallows errors (fail-open).
   */
  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        const serialized = JSON.stringify(value);
        await this.redisClient.setex(key, ttlSeconds, serialized);
        return;
      }

      // In-memory fallback
      this.memoryStore.set(key, {
        value,
        expiry: Date.now() + (ttlSeconds * 1000),
      });
    } catch (error: any) {
      console.warn(`[CacheManager] SET error for key "${key}":`, error.message);
    }
  }

  /**
   * Delete a cached key.
   * Silently swallows errors (fail-open).
   */
  async del(key: string): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        await this.redisClient.del(key);
      }
      // Always clear from memory store too (covers dual-mode edge cases)
      this.memoryStore.delete(key);
    } catch (error: any) {
      console.warn(`[CacheManager] DEL error for key "${key}":`, error.message);
    }
  }

  /**
   * Delete all keys matching a prefix (e.g., "cache:plans:").
   * For Redis, uses SCAN to avoid blocking. For memory, iterates the Map.
   */
  async delByPrefix(prefix: string): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        let cursor = '0';
        do {
          const [nextCursor, keys] = await this.redisClient.scan(
            cursor, 'MATCH', `${prefix}*`, 'COUNT', '100'
          );
          cursor = nextCursor;
          if (keys.length > 0) {
            await this.redisClient.del(...keys);
          }
        } while (cursor !== '0');
      }

      // Also clear from memory store
      for (const key of this.memoryStore.keys()) {
        if (key.startsWith(prefix)) {
          this.memoryStore.delete(key);
        }
      }
    } catch (error: any) {
      console.warn(`[CacheManager] DEL-PREFIX error for "${prefix}":`, error.message);
    }
  }

  /**
   * Cache-aside helper: returns cached value if available,
   * otherwise calls `fn()`, caches the result, and returns it.
   * 
   * Usage:
   *   const setting = await cache.wrap(
   *     CACHE_KEYS.SETTING('app_name'),
   *     () => db.select().from(globalSettings).where(...),
   *     CACHE_TTL.GLOBAL_SETTINGS
   *   );
   */
  async wrap<T>(key: string, fn: () => Promise<T>, ttlSeconds: number = 3600): Promise<T> {
    // Try cache first
    const cached = await this.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    // Cache miss — call the original function
    const result = await fn();

    // Only cache non-undefined results
    if (result !== undefined) {
      await this.set(key, result, ttlSeconds);
    }

    return result;
  }

  /**
   * Periodic sweep to remove expired entries from the in-memory store.
   */
  private startSweep(): void {
    if (this.sweepTimer) return;

    this.sweepTimer = setInterval(() => {
      const now = Date.now();
      let swept = 0;
      for (const [key, entry] of this.memoryStore.entries()) {
        if (now > entry.expiry) {
          this.memoryStore.delete(key);
          swept++;
        }
      }
      if (swept > 0) {
        console.log(`[CacheManager] Swept ${swept} expired entries`);
      }
    }, SWEEP_INTERVAL_MS);

    // Don't keep the process alive just for sweep
    this.sweepTimer.unref();
  }

  /**
   * Get cache statistics for monitoring/debugging.
   */
  getStats(): { backend: 'redis' | 'memory'; memoryEntries: number; initialized: boolean } {
    return {
      backend: this.useRedis ? 'redis' : 'memory',
      memoryEntries: this.memoryStore.size,
      initialized: this.isInitialized,
    };
  }

  /**
   * Graceful shutdown.
   */
  async shutdown(): Promise<void> {
    if (this.sweepTimer) {
      clearInterval(this.sweepTimer);
      this.sweepTimer = null;
    }
    this.memoryStore.clear();
    this.isInitialized = false;
    console.log('[CacheManager] Shutdown complete');
  }
}

/** Singleton instance */
export const cacheManager = new CacheManager();
