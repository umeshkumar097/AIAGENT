-- Per-user billing preferences: credit usage alerts + low-balance guard.
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS "user_billing_preferences" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" varchar NOT NULL,
  "alert_threshold_percent" integer NOT NULL DEFAULT 20,
  "alert_threshold_credits" integer,
  "alert_email" text,
  "alert_whatsapp_phone" text,
  "whatsapp_template" text NOT NULL DEFAULT 'low_balance',
  "pause_campaigns_when_empty" boolean NOT NULL DEFAULT true,
  "daily_usage_summary" boolean NOT NULL DEFAULT false,
  "last_alert_at" timestamp,
  "last_alert_balance" integer,
  "last_empty_alert_at" timestamp,
  "last_summary_date" text,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Columns (in case the table pre-exists from an older build)
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "alert_threshold_percent" integer NOT NULL DEFAULT 20;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "alert_threshold_credits" integer;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "alert_email" text;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "alert_whatsapp_phone" text;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "whatsapp_template" text NOT NULL DEFAULT 'low_balance';
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "pause_campaigns_when_empty" boolean NOT NULL DEFAULT true;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "daily_usage_summary" boolean NOT NULL DEFAULT false;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "last_alert_at" timestamp;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "last_alert_balance" integer;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "last_empty_alert_at" timestamp;
ALTER TABLE "user_billing_preferences" ADD COLUMN IF NOT EXISTS "last_summary_date" text;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_billing_preferences_user_id_users_id_fk') THEN
    ALTER TABLE "user_billing_preferences" ADD CONSTRAINT "user_billing_preferences_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "user_billing_preferences_user_id_unique" ON "user_billing_preferences" ("user_id");
CREATE INDEX IF NOT EXISTS "user_billing_preferences_daily_summary_idx" ON "user_billing_preferences" ("daily_usage_summary") WHERE "daily_usage_summary" = true;
