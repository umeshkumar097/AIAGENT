'use strict';
/**
 * Plivo webhook signature validation.
 *
 * Plivo signs every HTTP request it makes to the platform with
 *   X-Plivo-Signature-V3 / X-Plivo-Signature-V3-Nonce   (preferred; covers method, URL, query and POST params)
 *   X-Plivo-Signature-V2 / X-Plivo-Signature-V2-Nonce   (legacy; covers the base URL only)
 * using the account auth token. Plivo credentials are platform-level rows in
 * `plivo_credentials`, so every active token is tried (a handful at most).
 *
 * The signed URL is the one Plivo actually requested. Behind a proxy we cannot
 * trust the socket, so the configured public origin (APP_DOMAIN / DEV_DOMAIN /
 * BASE_URL / APP_URL via getDomain()) is preferred and the request-derived
 * origin (`trust proxy` -> req.protocol + Host) is tried as a fallback.
 */
import type { Request, Response, NextFunction } from 'express';
import * as plivo from 'plivo';
import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { plivoCredentials } from '@shared/schema';
import { allowUnverifiedWebhooks } from '../../../middleware/webhookValidation';
import { getDomain } from '../../../utils/domain';
import { logger } from '../../../utils/logger';

const SOURCE = 'PlivoWebhook';
const TOKEN_CACHE_TTL_MS = 60_000;

let tokenCache: { tokens: string[]; expiresAt: number } | null = null;
const unverifiedWarned = new Set<string>();

async function getActiveAuthTokens(): Promise<string[]> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.tokens;
  }
  const rows = await db
    .select({ authToken: plivoCredentials.authToken })
    .from(plivoCredentials)
    .where(eq(plivoCredentials.isActive, true));
  const tokens = Array.from(new Set(rows.map(r => r.authToken).filter((t): t is string => typeof t === 'string' && t.length > 0)));
  tokenCache = { tokens, expiresAt: now + TOKEN_CACHE_TTL_MS };
  return tokens;
}

/** Drop the token cache (e.g. after credentials are edited). */
export function resetPlivoSignatureCache(): void {
  tokenCache = null;
}

function headerValue(req: Request, name: string): string | undefined {
  const raw = req.headers[name];
  if (Array.isArray(raw)) return raw[0];
  return typeof raw === 'string' && raw.length > 0 ? raw : undefined;
}

/** Candidate absolute URLs for the request as Plivo would have signed them. */
function candidateUrls(req: Request): string[] {
  const urls: string[] = [];
  const configured = getDomain(req.get('host')).replace(/\/+$/, '');
  urls.push(`${configured}${req.originalUrl}`);
  const host = req.get('host');
  if (host) {
    urls.push(`${req.protocol}://${host}${req.originalUrl}`);
  }
  return Array.from(new Set(urls));
}

function formParams(req: Request): Record<string, unknown> {
  if (req.method !== 'POST') return {};
  const body = req.body;
  return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
}

function allowUnverifiedOnce(req: Request, reason: string, next: NextFunction): void {
  const key = `${req.method} ${req.route?.path ?? req.path}`;
  if (!unverifiedWarned.has(key)) {
    unverifiedWarned.add(key);
    logger.warn(`${reason} on ${key}; allowing because ALLOW_UNVERIFIED_WEBHOOKS=true (set it to false in production)`, undefined, SOURCE);
  }
  next();
}

/**
 * Express middleware: reject Plivo webhooks whose signature cannot be verified.
 * Apply only to plain HTTP webhooks (never to WebSocket/stream upgrade routes).
 */
export async function validatePlivoWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const v3Sig = headerValue(req, 'x-plivo-signature-v3');
    const v3Nonce = headerValue(req, 'x-plivo-signature-v3-nonce');
    const v2Sig = headerValue(req, 'x-plivo-signature-v2');
    const v2Nonce = headerValue(req, 'x-plivo-signature-v2-nonce');

    const hasV3 = Boolean(v3Sig && v3Nonce);
    const hasV2 = Boolean(v2Sig && v2Nonce);

    if (!hasV3 && !hasV2) {
      if (allowUnverifiedWebhooks()) {
        return allowUnverifiedOnce(req, 'Missing Plivo signature headers', next);
      }
      logger.warn(`Rejected ${req.method} ${req.path}: missing X-Plivo-Signature-V3/V2 headers (set ALLOW_UNVERIFIED_WEBHOOKS=true only for local testing)`, undefined, SOURCE);
      res.status(403).json({ error: 'Missing webhook signature' });
      return;
    }

    const tokens = await getActiveAuthTokens();
    if (tokens.length === 0) {
      if (allowUnverifiedWebhooks()) {
        return allowUnverifiedOnce(req, 'No active Plivo credentials to verify signature', next);
      }
      logger.warn(`Rejected ${req.method} ${req.path}: no active Plivo credentials available for signature verification`, undefined, SOURCE);
      res.status(403).json({ error: 'Webhook signature could not be verified' });
      return;
    }

    const urls = candidateUrls(req);
    const params = formParams(req);
    let valid = false;

    for (const token of tokens) {
      for (const url of urls) {
        if (hasV3 && plivo.validateV3Signature(req.method, url, v3Nonce as string, token, v3Sig as string, params)) {
          valid = true;
          break;
        }
        if (!hasV3 && hasV2 && plivo.validateSignature(url, v2Nonce as string, v2Sig as string, token)) {
          valid = true;
          break;
        }
      }
      if (valid) break;
    }

    if (!valid) {
      if (allowUnverifiedWebhooks()) {
        return allowUnverifiedOnce(req, `Invalid Plivo ${hasV3 ? 'V3' : 'V2'} signature`, next);
      }
      logger.warn(`Rejected ${req.method} ${req.path}: invalid Plivo ${hasV3 ? 'V3' : 'V2'} signature (checked URLs: ${urls.join(', ')})`, undefined, SOURCE);
      res.status(403).json({ error: 'Invalid webhook signature' });
      return;
    }

    next();
  } catch (error) {
    logger.error('Plivo signature validation error', error, SOURCE);
    res.status(403).json({ error: 'Webhook signature validation failed' });
  }
}
