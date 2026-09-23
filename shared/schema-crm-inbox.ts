/**
 * CRM team inbox — per-user inbox settings (follow-up SLA per stage, auto-assign).
 *
 * Lead notes already live in `lead_notes` (shared/schema.ts → leadNotes) and are reused
 * by the inbox; assignment uses the existing `leads.assigned_user_id` column, which after
 * migration 0017 may hold either the owner's users.id or a team_members.id.
 *
 * Kept out of shared/schema.ts on purpose (that file is owned elsewhere); import from here.
 */
import { pgTable, varchar, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const AUTO_ASSIGN_MODES = ["off", "round_robin"] as const;
export type AutoAssignMode = typeof AUTO_ASSIGN_MODES[number];

/** Default follow-up SLA in hours per lead stage. A stage missing here uses defaultSlaHours; 0 = no SLA. */
export const DEFAULT_SLA_HOURS: Record<string, number> = { new: 24, contacted: 48, qualified: 72 };
export const DEFAULT_SLA_FALLBACK_HOURS = 48;
/** Stages that never go overdue (the lead is closed). */
export const SLA_CLOSED_STAGES = ["not_interested"] as const;

export const crmInboxSettings = pgTable("crm_inbox_settings", {
  userId: varchar("user_id").primaryKey(),
  autoAssign: text("auto_assign").notNull().default("off"),
  slaHours: jsonb("sla_hours").$type<Record<string, number>>().notNull().default(DEFAULT_SLA_HOURS),
  defaultSlaHours: integer("default_sla_hours").notNull().default(DEFAULT_SLA_FALLBACK_HOURS),
  /** Assignee id that received the last round-robin lead; the next one goes to the following member. */
  roundRobinCursor: text("round_robin_cursor"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCrmInboxSettingsSchema = createInsertSchema(crmInboxSettings).omit({
  createdAt: true,
  updatedAt: true,
});
export type CrmInboxSettings = typeof crmInboxSettings.$inferSelect;
export type InsertCrmInboxSettings = z.infer<typeof insertCrmInboxSettingsSchema>;

const hours = z.number().int().min(0).max(24 * 30);

/** Body of PUT /api/crm/inbox/settings (all fields optional; merged over the stored row). */
export const updateCrmInboxSettingsSchema = z.object({
  autoAssign: z.enum(AUTO_ASSIGN_MODES).optional(),
  slaHours: z.record(z.string().min(1).max(64), hours).optional(),
  defaultSlaHours: hours.optional(),
}).strict();
export type UpdateCrmInboxSettings = z.infer<typeof updateCrmInboxSettingsSchema>;

export const INBOX_FILTERS = ["mine", "unassigned", "overdue", "all"] as const;
export type InboxFilter = typeof INBOX_FILTERS[number];

export type SlaStatus = "ok" | "due_soon" | "overdue" | "none";

/** Hours allowed for a stage before the lead is overdue; 0 means no SLA. */
export function slaHoursForStage(settings: Pick<CrmInboxSettings, "slaHours" | "defaultSlaHours">, stage: string): number {
  if ((SLA_CLOSED_STAGES as readonly string[]).includes(stage)) return 0;
  const configured = settings.slaHours?.[stage];
  return typeof configured === "number" ? configured : settings.defaultSlaHours;
}

/** Pure SLA evaluation shared by server and client. "due_soon" = within 25% of the window (min 2h) of the deadline. */
export function evaluateSla(updatedAt: Date | string, slaHours: number, now: Date = new Date()): { status: SlaStatus; dueAt: string | null } {
  if (!slaHours || slaHours <= 0) return { status: "none", dueAt: null };
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(updated)) return { status: "none", dueAt: null };
  const dueMs = updated + slaHours * 3_600_000;
  const remaining = dueMs - now.getTime();
  const warnWindow = Math.max(2 * 3_600_000, slaHours * 3_600_000 * 0.25);
  const status: SlaStatus = remaining < 0 ? "overdue" : remaining <= warnWindow ? "due_soon" : "ok";
  return { status, dueAt: new Date(dueMs).toISOString() };
}
