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
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";
import { databasePoolManager } from "./infrastructure/database/connection-pool";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Fallback pool and database instance for early bootstrapping
export const defaultPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const defaultDb = drizzle(defaultPool, { schema });

// Proxy to delegate pg Pool calls to DatabasePoolManager once ready
export const pool = new Proxy(defaultPool, {
  get(target, prop, receiver) {
    const managedPool = databasePoolManager.getPool();
    return Reflect.get(managedPool || target, prop, receiver);
  }
});

// Proxy to delegate drizzle queries to DatabasePoolManager once ready
export const db = new Proxy(defaultDb, {
  get(target, prop, receiver) {
    if (databasePoolManager.isReady()) {
      return Reflect.get(databasePoolManager.getDrizzle(), prop, receiver);
    }
    return Reflect.get(target, prop, receiver);
  }
});
