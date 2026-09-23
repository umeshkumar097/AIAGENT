-- Scheduled callbacks: booked by the agent during a call (schedule_callback tool) or by the
-- owner from the Callbacks page; the callback cron places the call when scheduled_at is due.
-- Idempotent: safe to re-run.
CREATE TABLE IF NOT EXISTS "scheduled_callbacks" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" varchar NOT NULL,
  "agent_id" varchar,
  "source_call_id" varchar,
  "plivo_phone_number_id" varchar,
  "contact_name" text,
  "contact_phone" text NOT NULL,
  "reason" text,
  "scheduled_at" timestamptz NOT NULL,
  "time_zone" text NOT NULL DEFAULT 'Asia/Kolkata',
  "status" text NOT NULL DEFAULT 'pending',
  "attempts" integer NOT NULL DEFAULT 0,
  "last_error" text,
  "result_call_id" varchar,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'scheduled_callbacks_user_id_users_id_fk') THEN
    ALTER TABLE "scheduled_callbacks" ADD CONSTRAINT "scheduled_callbacks_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'scheduled_callbacks_agent_id_agents_id_fk') THEN
    ALTER TABLE "scheduled_callbacks" ADD CONSTRAINT "scheduled_callbacks_agent_id_agents_id_fk"
      FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE set null;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "scheduled_callbacks_status_scheduled_at_idx" ON "scheduled_callbacks" ("status", "scheduled_at");
CREATE INDEX IF NOT EXISTS "scheduled_callbacks_user_created_idx" ON "scheduled_callbacks" ("user_id", "created_at");
