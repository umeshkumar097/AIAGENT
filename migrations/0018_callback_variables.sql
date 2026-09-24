-- API-scheduled calls (CRM / WebinarX reminders): per-call variables, source and an idempotency key.
-- Additive and idempotent; safe to re-run.
ALTER TABLE "scheduled_callbacks" ADD COLUMN IF NOT EXISTS "variables" jsonb;
ALTER TABLE "scheduled_callbacks" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'agent';
ALTER TABLE "scheduled_callbacks" ADD COLUMN IF NOT EXISTS "external_ref" text;
CREATE UNIQUE INDEX IF NOT EXISTS "scheduled_callbacks_user_external_ref_idx"
  ON "scheduled_callbacks" ("user_id", "external_ref");
