-- Third-party integrations (GoHighLevel, Salesforce, Zoho, Cal.com, Zapier, Pabbly) — additive; safe to re-run
CREATE TABLE IF NOT EXISTS "user_integrations" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" varchar NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "provider" text NOT NULL,
  "status" text NOT NULL DEFAULT 'connected',
  "access_token" text,
  "refresh_token" text,
  "token_expiry" timestamp,
  "instance_url" text,
  "external_account_id" text,
  "account_name" text,
  "config" jsonb,
  "last_sync_at" timestamp,
  "last_error" text,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_integrations_user_provider_idx" ON "user_integrations" ("user_id", "provider");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integration_sync_logs" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" varchar NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "provider" text NOT NULL,
  "event" text NOT NULL,
  "action" text NOT NULL,
  "status" text NOT NULL,
  "source_id" varchar,
  "external_id" text,
  "error" text,
  "payload" jsonb,
  "created_at" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "integration_sync_logs_user_provider_idx" ON "integration_sync_logs" ("user_id", "provider", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "integration_sync_logs_source_idx" ON "integration_sync_logs" ("provider", "source_id");
