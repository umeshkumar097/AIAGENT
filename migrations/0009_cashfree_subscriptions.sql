-- Cashfree Subscriptions auto-renew mandate on user_subscriptions (additive; safe to re-run)
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "auto_renew" boolean NOT NULL DEFAULT false;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "cashfree_subscription_id" text;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "cf_subscription_id" text;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "mandate_status" text;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "mandate_payment_method" text;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "mandate_authorized_at" timestamp;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "next_charge_at" timestamp;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "auto_renew_cancelled_at" timestamp;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_subscriptions_cashfree_subscription_id_idx" ON "user_subscriptions" ("cashfree_subscription_id");
