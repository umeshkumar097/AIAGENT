/**
 * Automatic call QA scoring — one row per completed Plivo/Sarvam call, written by
 * server/services/call-qa (cron + rescore endpoint). Migration: migrations/0016_call_qa_scores.sql
 */
import { sql } from "drizzle-orm";
import { pgTable, varchar, text, integer, jsonb, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { plivoCalls, users, agents } from "@shared/schema";

export const QA_FLAGS = ["rude", "wrong_info", "talked_over_caller", "unresolved"] as const;
export type QaFlag = typeof QA_FLAGS[number];

export const QA_SUB_SCORES = ["greeting", "understanding", "objectionHandling", "compliance", "closing"] as const;
export type QaSubScore = typeof QA_SUB_SCORES[number];

export const callQaScores = pgTable("call_qa_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  callId: varchar("call_id").notNull().references(() => plivoCalls.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),

  status: text("status").notNull().default("scored"), // scored | failed
  attempts: integer("attempts").notNull().default(1),
  error: text("error"),

  // 1-10 (null while failed)
  overall: integer("overall"),
  greeting: integer("greeting"),
  understanding: integer("understanding"),
  objectionHandling: integer("objection_handling"),
  compliance: integer("compliance"),
  closing: integer("closing"),

  strengths: jsonb("strengths").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  improvements: jsonb("improvements").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  flags: jsonb("flags").$type<QaFlag[]>().notNull().default(sql`'[]'::jsonb`),
  verdict: text("verdict"), // one-sentence overall verdict

  model: text("model"),
  promptVersion: integer("prompt_version").notNull().default(1),
  transcriptChars: integer("transcript_chars"),
  scoredAt: timestamp("scored_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  callQaScoresCallIdUnique: uniqueIndex("call_qa_scores_call_id_unique").on(table.callId),
  callQaScoresUserScoredAtIdx: index("call_qa_scores_user_scored_at_idx").on(table.userId, table.scoredAt),
  callQaScoresAgentIdIdx: index("call_qa_scores_agent_id_idx").on(table.agentId),
}));

export type CallQaScore = typeof callQaScores.$inferSelect;
export type InsertCallQaScore = typeof callQaScores.$inferInsert;
