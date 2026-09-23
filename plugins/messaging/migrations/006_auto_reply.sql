-- Migration 006: WhatsApp AI auto-reply
-- User-level defaults + per-user inbound webhook secret, and conversation flags used by the
-- auto-reply loop (handoff marker + "one AI reply per inbound message" claim). Idempotent.

CREATE TABLE IF NOT EXISTS whatsapp_auto_reply_settings (
  user_id VARCHAR PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  default_whatsapp_agent_id VARCHAR NULL,
  whatsapp_auto_reply_default BOOLEAN NOT NULL DEFAULT false,
  webhook_secret VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wa_auto_reply_webhook_secret ON whatsapp_auto_reply_settings(webhook_secret);

ALTER TABLE whatsapp_conversations ADD COLUMN IF NOT EXISTS needs_attention BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE whatsapp_conversations ADD COLUMN IF NOT EXISTS last_ai_reply_source_id UUID NULL;
