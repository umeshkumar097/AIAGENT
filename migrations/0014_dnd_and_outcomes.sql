-- Do-not-call list + per-outcome smart retry rules.
-- Idempotent: safe to re-run.

-- 1. Do-not-call numbers (one row per user + normalised phone)
CREATE TABLE IF NOT EXISTS "do_not_call_numbers" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" varchar NOT NULL,
  "phone" text NOT NULL,
  "reason" text NOT NULL DEFAULT 'manual',
  "source" text NOT NULL DEFAULT 'manual',
  "call_id" varchar,
  "note" text,
  "created_at" timestamp NOT NULL DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'do_not_call_numbers_user_id_users_id_fk') THEN
    ALTER TABLE "do_not_call_numbers" ADD CONSTRAINT "do_not_call_numbers_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "do_not_call_numbers_user_phone_unique" ON "do_not_call_numbers" ("user_id", "phone");
CREATE INDEX IF NOT EXISTS "do_not_call_numbers_user_id_idx" ON "do_not_call_numbers" ("user_id");

-- 2. Smart retry rules per campaign: { no_answer|busy|failed|voicemail: { enabled, delayMinutes, maxAttempts } }
--    NULL means "derive from the legacy retry_* columns" (see server/services/retry-rules.ts).
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "retry_rules" jsonb;
