'use strict';
/**
 * ============================================================
 * Cache Manager
 * 
 * Provides hybrid Redis and In-Memory caching with automatic
 * failover, generic retrieval interfaces, and key management.
 * ============================================================
 */

import Redis from 'ioredis';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheManager {
  private redisClient: Redis | null = null;
  private memoryCache = new Map<string, CacheEntry<any>>();
  private useRedis = false;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    const enableBullMQ = process.env.ENABLE_BULLMQ === 'true';

    // Enable Redis caching if Redis URL is configured and BullMQ is enabled (standard cluster setup)
    if (redisUrl && (enableBullMQ || process.env.NODE_ENV === 'production')) {
      try {
        this.redisClient = new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          enableReadyCheck: false,
          connectTimeout: 5000,
          retryStrategy: (times) => {
            if (times > 3) {
              console.warn('[Cache] Redis unreachable. Falling back to In-Memory cache.');
              this.useRedis = false;
              return null; // Stop retrying and fail
            }
            return Math.min(times * 500, 2000);
          }
        });

        this.redisClient.on('connect', () => {
          console.log('[Cache] Redis connected, using Redis cache');
          this.useRedis = true;
        });

        this.redisClient.on('error', (err) => {
          console.error('[Cache] Redis error:', err.message);
          this.useRedis = false;
        });

        this.redisClient.on('close', () => {
          console.log('[Cache] Redis connection closed. Falling back to In-Memory cache.');
          this.useRedis = false;
        });

      } catch (err: any) {
        console.error('[Cache] Failed to initialize Redis client:', err.message);
        this.useRedis = false;
      }
    } else {
      console.log('[Cache] Redis URL not configured or BullMQ disabled. Using In-Memory cache.');
    }

    // Periodically clean up expired keys in memory cache to avoid memory leaks
    this.cleanupInterval = setInterval(() => this.cleanupMemoryCache(), 60000);
  }

  /**
   * Get a value from the cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (this.useRedis && this.redisClient) {
      try {
        const val = await this.redisClient.get(key);
        if (val !== null) {
          return JSON.parse(val) as T;
        }
        return null;
      } catch (err: any) {
        console.warn(`[Cache] Redis GET error for key ${key}, falling back to memory:`, err.message);
      }
    }

    // Memory fallback
    const entry = this.memoryCache.get(key);
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Set a value in the cache with an optional TTL in seconds
   */
  async set<T>(key: string, value: T, ttlSeconds = 3600): Promise<void> {
    if (this.useRedis && this.redisClient) {
      try {
        const stringVal = JSON.stringify(value);
        await this.redisClient.set(key, stringVal, 'EX', ttlSeconds);
        return;
      } catch (err: any) {
        console.warn(`[Cache] Redis SET error for key ${key}, falling back to memory:`, err.message);
      }
    }

    // Memory fallback
    const expiresAt = Date.now() + (ttlSeconds * 1000);
    this.memoryCache.set(key, { value, expiresAt });
  }

  /**
   * Delete a value from the cache
   */
  async del(key: string): Promise<void> {
    this.memoryCache.delete(key);

    if (this.redisClient) {
      try {
        await this.redisClient.del(key);
      } catch (err: any) {
        console.warn(`[Cache] Redis DEL error for key ${key}:`, err.message);
      }
    }
  }

  /**
   * Wrap a database/external query with caching logic.
   * Checks the cache first, executes the fetch function on cache miss, and caches the result.
   */
  async wrap<T>(key: string, fetchFn: () => Promise<T>, ttlSeconds = 3600): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const freshValue = await fetchFn();
    // Cache the fresh value if it's not undefined
    if (freshValue !== undefined) {
      await this.set(key, freshValue, ttlSeconds);
    }
    return freshValue;
  }

  /**
   * Cleans up expired items from memory cache to control memory usage
   */
  private cleanupMemoryCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.memoryCache.entries()) {
      if (now > entry.expiresAt) {
        this.memoryCache.delete(key);
      }
    }
  }

  /**
   * Clean up resources on shutdown
   */
  async close(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    if (this.redisClient) {
      try {
        await this.redisClient.quit();
      } catch (err: any) {
        this.redisClient.disconnect();
      }
      this.redisClient = null;
    }
    this.memoryCache.clear();
  }
}

export const cacheManager = new CacheManager();
export default cacheManager;
