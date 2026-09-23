-- Per-agent allowed messaging template lists (additive; safe to re-run)
ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "messaging_email_templates" text[];
--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "messaging_whatsapp_templates" text[];
