/**
 * Per-user billing preferences: credit usage alerts + low-balance guard.
 * Table lives in migrations/0015_user_billing_preferences.sql.
 */
import { sql } from "drizzle-orm";
import { pgTable, varchar, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { users } from "@shared/schema";

export const DEFAULT_ALERT_THRESHOLD_PERCENT = 20;
export const DEFAULT_WHATSAPP_TEMPLATE = "low_balance";

export const userBillingPreferences = pgTable("user_billing_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  /** % of the plan's monthly minutes (included credits) at which to alert. */
  alertThresholdPercent: integer("alert_threshold_percent").notNull().default(DEFAULT_ALERT_THRESHOLD_PERCENT),
  /** Absolute credit threshold; when set it overrides the percentage. */
  alertThresholdCredits: integer("alert_threshold_credits"),
  /** Null → the account email. */
  alertEmail: text("alert_email"),
  /** E.164 number for WhatsApp alerts via Waki (optional). */
  alertWhatsappPhone: text("alert_whatsapp_phone"),
  /** Approved Waki template name used for WhatsApp alerts. */
  whatsappTemplate: text("whatsapp_template").notNull().default(DEFAULT_WHATSAPP_TEMPLATE),
  pauseCampaignsWhenEmpty: boolean("pause_campaigns_when_empty").notNull().default(true),
  dailyUsageSummary: boolean("daily_usage_summary").notNull().default(false),
  // Dedupe bookkeeping (written by server/services/usage-alerts-cron.ts)
  lastAlertAt: timestamp("last_alert_at"),
  /** Balance at the last threshold alert; null = armed (balance is above threshold). */
  lastAlertBalance: integer("last_alert_balance"),
  lastEmptyAlertAt: timestamp("last_empty_alert_at"),
  /** IST calendar date (YYYY-MM-DD) of the last daily summary sent. */
  lastSummaryDate: text("last_summary_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type UserBillingPreferences = typeof userBillingPreferences.$inferSelect;
export type InsertUserBillingPreferences = typeof userBillingPreferences.$inferInsert;

const optionalTrimmed = (max: number) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), z.string().trim().max(max).nullable().optional());

/** Body of PUT /api/billing/preferences (all fields optional; unknown keys stripped). */
export const updateBillingPreferencesSchema = z.object({
  alertThresholdPercent: z.coerce.number().int().min(1).max(100).optional(),
  alertThresholdCredits: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v === null ? null : Number(v)),
    z.number().int().min(1).max(10_000_000).nullable().optional(),
  ),
  alertEmail: z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), z.string().trim().email().max(254).nullable().optional()),
  alertWhatsappPhone: optionalTrimmed(20),
  whatsappTemplate: z.string().trim().min(1).max(100).regex(/^[a-z0-9_]+$/i).optional(),
  pauseCampaignsWhenEmpty: z.boolean().optional(),
  dailyUsageSummary: z.boolean().optional(),
});

export type UpdateBillingPreferences = z.infer<typeof updateBillingPreferencesSchema>;
