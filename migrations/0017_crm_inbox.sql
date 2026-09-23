-- CRM team inbox: per-user inbox settings (follow-up SLA per stage, round-robin auto-assign)
-- and team-member assignment of leads.
-- Idempotent: safe to re-run.
-- NOTE: not yet listed in migrations/meta/_journal.json (owned elsewhere) — add an entry
--       { "idx": 17, "version": "7", "tag": "0017_crm_inbox", "breakpoints": true } there.

-- 1. Inbox settings, one row per account owner
CREATE TABLE IF NOT EXISTS "crm_inbox_settings" (
  "user_id" varchar PRIMARY KEY NOT NULL,
  "auto_assign" text NOT NULL DEFAULT 'off',
  "sla_hours" jsonb NOT NULL DEFAULT '{"new":24,"contacted":48,"qualified":72}'::jsonb,
  "default_sla_hours" integer NOT NULL DEFAULT 48,
  "round_robin_cursor" text,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'crm_inbox_settings_user_id_users_id_fk') THEN
    ALTER TABLE "crm_inbox_settings" ADD CONSTRAINT "crm_inbox_settings_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade;
  END IF;
END $$;

-- 2. Leads can be assigned to team members (team_members.id) as well as to the account owner
--    (users.id). The original FK to users only allowed the owner, so it is dropped; the
--    inbox API validates assignee ids against the live assignee list instead.
ALTER TABLE "leads" DROP CONSTRAINT IF EXISTS "leads_assigned_user_id_users_id_fk";

-- 3. Indexes for the inbox queries (filter by owner + assignee / stage, order by updated_at)
CREATE INDEX IF NOT EXISTS "leads_user_assigned_idx" ON "leads" ("user_id", "assigned_user_id");
CREATE INDEX IF NOT EXISTS "leads_user_stage_updated_idx" ON "leads" ("user_id", "stage", "updated_at");
CREATE INDEX IF NOT EXISTS "lead_notes_lead_created_idx" ON "lead_notes" ("lead_id", "created_at");
