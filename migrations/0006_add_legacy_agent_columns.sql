-- ============================================================
-- Migration 0006: Add legacy agent columns to agents table
-- ============================================================

ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "engine" text;
ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "openai_model" text;
ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "sarvam_voice" text;
ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "voice" text;
