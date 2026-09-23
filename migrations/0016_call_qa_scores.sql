-- Automatic call QA scores: one row per completed Plivo/Sarvam call (server/services/call-qa).
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS "call_qa_scores" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "call_id" varchar NOT NULL,
  "user_id" varchar NOT NULL,
  "agent_id" varchar,
  "status" text NOT NULL DEFAULT 'scored',
  "attempts" integer NOT NULL DEFAULT 1,
  "error" text,
  "overall" integer,
  "greeting" integer,
  "understanding" integer,
  "objection_handling" integer,
  "compliance" integer,
  "closing" integer,
  "strengths" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "improvements" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "flags" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "verdict" text,
  "model" text,
  "prompt_version" integer NOT NULL DEFAULT 1,
  "transcript_chars" integer,
  "scored_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'call_qa_scores_call_id_plivo_calls_id_fk') THEN
    ALTER TABLE "call_qa_scores" ADD CONSTRAINT "call_qa_scores_call_id_plivo_calls_id_fk"
      FOREIGN KEY ("call_id") REFERENCES "plivo_calls"("id") ON DELETE cascade;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'call_qa_scores_user_id_users_id_fk') THEN
    ALTER TABLE "call_qa_scores" ADD CONSTRAINT "call_qa_scores_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'call_qa_scores_agent_id_agents_id_fk') THEN
    ALTER TABLE "call_qa_scores" ADD CONSTRAINT "call_qa_scores_agent_id_agents_id_fk"
      FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE set null;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "call_qa_scores_call_id_unique" ON "call_qa_scores" ("call_id");
CREATE INDEX IF NOT EXISTS "call_qa_scores_user_scored_at_idx" ON "call_qa_scores" ("user_id", "scored_at");
CREATE INDEX IF NOT EXISTS "call_qa_scores_agent_id_idx" ON "call_qa_scores" ("agent_id");

-- Cron eligibility scan: completed calls with a transcript, oldest first.
CREATE INDEX IF NOT EXISTS "plivo_calls_status_created_at_idx" ON "plivo_calls" ("status", "created_at");

-- Global cost guard (admin can flip to false to pause scoring platform-wide).
INSERT INTO "global_settings" ("key", "value", "description")
SELECT 'call_qa_enabled', 'true'::jsonb, 'Automatic LLM QA scoring of completed Sarvam/Plivo calls'
WHERE NOT EXISTS (SELECT 1 FROM "global_settings" WHERE "key" = 'call_qa_enabled');
