-- Cashfree-only billing, GST invoices, notification event log (additive; safe to re-run)
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "cashfree_order_id" text;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "reminder_7_sent_at" timestamp;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "reminder_3_sent_at" timestamp;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "reminder_1_sent_at" timestamp;
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN IF NOT EXISTS "expired_notified_at" timestamp;
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "gateway_order_id" text;
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "payment_method" text;
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "failure_reason" text;
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "refunded_amount" numeric(10, 2) DEFAULT '0.00';
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "refund_id" text;
--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD COLUMN IF NOT EXISTS "phone_number_id" varchar;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_transactions_gateway_order_id_idx" ON "payment_transactions" ("gateway_order_id");
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "invoice_type" text NOT NULL DEFAULT 'tax_invoice';
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "related_invoice_id" varchar;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "financial_year" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "seller_name" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "seller_gstin" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "seller_address" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "seller_state_code" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "buyer_gstin" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "buyer_state_code" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "place_of_supply" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "hsn_sac" text;
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "taxable_amount" numeric(10, 2);
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "cgst" numeric(10, 2) DEFAULT '0.00';
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "sgst" numeric(10, 2) DEFAULT '0.00';
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "igst" numeric(10, 2) DEFAULT '0.00';
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tax_rate" numeric(5, 2);
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "is_inter_state" boolean DEFAULT false;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "billing_state_code" text;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "billing_phone" text;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "gstin" text;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_events" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" varchar REFERENCES "users"("id") ON DELETE CASCADE,
  "event_key" text NOT NULL,
  "channel" text NOT NULL,
  "status" text NOT NULL,
  "recipient" text,
  "subject" text,
  "error" text,
  "payload" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_events_user_id_idx" ON "notification_events" ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_events_event_key_idx" ON "notification_events" ("event_key");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_events_created_at_idx" ON "notification_events" ("created_at");
