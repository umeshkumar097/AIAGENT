'use strict';
/**
 * ============================================================
 * Redis Pub/Sub Manager
 * Manages subscription and publishing of cluster-wide events
 * ============================================================
 */

import Redis from 'ioredis';

let pubClient: Redis | null = null;
let subClient: Redis | null = null;
const activeListeners = new Map<string, Set<(message: any) => void>>();

export function getPublisher(): Redis {
  if (!pubClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    pubClient = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
    pubClient.on('error', (err) => console.error('[PubSub] Publisher error:', err.message));
  }
  return pubClient;
}

export function getSubscriber(): Redis {
  if (!subClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    subClient = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
    subClient.on('error', (err) => console.error('[PubSub] Subscriber error:', err.message));
    
    subClient.on('message', (channel, message) => {
      const listeners = activeListeners.get(channel);
      if (listeners) {
        let parsedMessage = message;
        try {
          parsedMessage = JSON.parse(message);
        } catch (e) {
          // Keep as raw string if JSON parsing fails
        }
        for (const listener of listeners) {
          try {
            listener(parsedMessage);
          } catch (err: any) {
            console.error(`[PubSub] Error in listener for channel ${channel}:`, err.message);
          }
        }
      }
    });
  }
  return subClient;
}

export async function publish(channel: string, message: any): Promise<number> {
  if (!process.env.REDIS_URL && process.env.NODE_ENV !== 'production') {
    // Fallback if Redis is not configured (e.g. single-node local testing)
    // Directly trigger local subscriber listeners synchronously
    const listeners = activeListeners.get(channel);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(message);
        } catch (err: any) {
          console.error(`[PubSub-Local] Error in local listener:`, err.message);
        }
      }
    }
    return 1;
  }

  try {
    const pub = getPublisher();
    const stringMessage = typeof message === 'string' ? message : JSON.stringify(message);
    return await pub.publish(channel, stringMessage);
  } catch (error: any) {
    console.error(`[PubSub] Publish failed to channel ${channel}:`, error.message);
    return 0;
  }
}

export async function subscribe(channel: string, listener: (message: any) => void): Promise<void> {
  let listeners = activeListeners.get(channel);
  if (!listeners) {
    listeners = new Set();
    activeListeners.set(channel, listeners);
  }
  listeners.add(listener);

  if (process.env.REDIS_URL) {
    try {
      const sub = getSubscriber();
      if (listeners.size === 1) {
        await sub.subscribe(channel);
        console.log(`[PubSub] Subscribed to Redis channel: ${channel}`);
      }
    } catch (error: any) {
      console.error(`[PubSub] Subscribe failed to channel ${channel}:`, error.message);
    }
  }
}

export async function unsubscribe(channel: string, listener: (message: any) => void): Promise<void> {
  const listeners = activeListeners.get(channel);
  if (listeners) {
    listeners.delete(listener);
    if (listeners.size === 0) {
      activeListeners.delete(channel);
      if (process.env.REDIS_URL && subClient) {
        try {
          await subClient.unsubscribe(channel);
          console.log(`[PubSub] Unsubscribed from Redis channel: ${channel}`);
        } catch (error: any) {
          console.error(`[PubSub] Unsubscribe failed from channel ${channel}:`, error.message);
        }
      }
    }
  }
}

export async function closePubSub(): Promise<void> {
  const closePromises: Promise<void>[] = [];
  if (pubClient) {
    closePromises.push(pubClient.quit().then(() => { pubClient = null; }));
  }
  if (subClient) {
    closePromises.push(subClient.quit().then(() => { subClient = null; }));
  }
  await Promise.all(closePromises);
  activeListeners.clear();
  console.log('[PubSub] PubSub connections closed gracefully');
}
