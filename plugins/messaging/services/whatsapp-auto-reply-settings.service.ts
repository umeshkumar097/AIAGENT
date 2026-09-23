import crypto from 'crypto';
import { db } from '../../../server/db';
import { sql } from 'drizzle-orm';
import type { WhatsAppAutoReplySettings } from '../types';

/**
 * User-level WhatsApp auto-reply defaults + the per-user inbound webhook secret.
 * Stored in the plugin's own `whatsapp_auto_reply_settings` table (migration 006).
 */

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function transformRow<T>(row: Record<string, any>): T {
  const transformed: Record<string, any> = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel(key)] = row[key];
  }
  return transformed as T;
}

function newSecret(): string {
  return crypto.randomBytes(24).toString('hex'); // 48 chars, fits VARCHAR(64)
}

export const WAKI_WEBHOOK_PATH_PREFIX = '/api/webhooks/messaging/waki';

export class WhatsAppAutoReplySettingsService {
  /** Returns the user's row, creating it (with a fresh secret) on first access. */
  async getSettings(userId: string): Promise<WhatsAppAutoReplySettings> {
    const existing = await db.execute(sql`
      SELECT * FROM whatsapp_auto_reply_settings WHERE user_id = ${userId} LIMIT 1
    `);
    const row = (existing as any).rows[0];
    if (row) return transformRow<WhatsAppAutoReplySettings>(row);

    const created = await db.execute(sql`
      INSERT INTO whatsapp_auto_reply_settings (user_id, webhook_secret)
      VALUES (${userId}, ${newSecret()})
      ON CONFLICT (user_id) DO UPDATE SET updated_at = NOW()
      RETURNING *
    `);
    return transformRow<WhatsAppAutoReplySettings>((created as any).rows[0]);
  }

  /** Read-only variant for the webhook hot path (never creates rows). */
  async findByUserId(userId: string): Promise<WhatsAppAutoReplySettings | null> {
    const result = await db.execute(sql`
      SELECT * FROM whatsapp_auto_reply_settings WHERE user_id = ${userId} LIMIT 1
    `);
    const row = (result as any).rows[0];
    return row ? transformRow<WhatsAppAutoReplySettings>(row) : null;
  }

  /** Validates that the agent exists and belongs to the user. */
  async agentBelongsToUser(userId: string, agentId: string): Promise<boolean> {
    const result = await db.execute(sql`
      SELECT 1 FROM agents WHERE id = ${agentId} AND user_id = ${userId} LIMIT 1
    `);
    return ((result as any).rows || []).length > 0;
  }

  async saveSettings(
    userId: string,
    data: { defaultWhatsappAgentId: string | null; whatsappAutoReplyDefault: boolean }
  ): Promise<WhatsAppAutoReplySettings> {
    await this.getSettings(userId); // ensure the row (and secret) exist
    const result = await db.execute(sql`
      UPDATE whatsapp_auto_reply_settings SET
        default_whatsapp_agent_id = ${data.defaultWhatsappAgentId},
        whatsapp_auto_reply_default = ${data.whatsappAutoReplyDefault},
        updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `);
    return transformRow<WhatsAppAutoReplySettings>((result as any).rows[0]);
  }

  async regenerateSecret(userId: string): Promise<WhatsAppAutoReplySettings> {
    await this.getSettings(userId);
    const result = await db.execute(sql`
      UPDATE whatsapp_auto_reply_settings SET
        webhook_secret = ${newSecret()},
        updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `);
    return transformRow<WhatsAppAutoReplySettings>((result as any).rows[0]);
  }

  /** Resolves the owner of an inbound Waki webhook from the secret in the URL. */
  async findUserBySecret(secret: string): Promise<string | null> {
    if (!secret || secret.length < 16 || secret.length > 64 || !/^[a-f0-9]+$/i.test(secret)) return null;
    const result = await db.execute(sql`
      SELECT user_id, webhook_secret FROM whatsapp_auto_reply_settings WHERE webhook_secret = ${secret} LIMIT 1
    `);
    const row = (result as any).rows[0];
    if (!row) return null;
    const a = Buffer.from(String(row.webhook_secret));
    const b = Buffer.from(secret);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return row.user_id as string;
  }

  /** Optional HMAC check (`X-Webhook-Signature: sha256=<hex>` over the raw body) when the sender signs. */
  verifySignature(rawBody: Buffer | string | undefined, signatureHeader: string | undefined, secret: string): boolean {
    if (!signatureHeader) return true; // unsigned delivery: the URL secret is the credential
    if (!rawBody) return false;
    try {
      const provided = signatureHeader.startsWith('sha256=') ? signatureHeader.slice(7) : signatureHeader;
      const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
      const a = Buffer.from(provided, 'hex');
      const b = Buffer.from(expected, 'hex');
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }

  buildWebhookUrl(origin: string, secret: string): string {
    return `${origin.replace(/\/+$/, '')}${WAKI_WEBHOOK_PATH_PREFIX}/${secret}`;
  }
}

export const whatsAppAutoReplySettingsService = new WhatsAppAutoReplySettingsService();
