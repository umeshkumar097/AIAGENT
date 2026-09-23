/**
 * Call QA service: eligibility query, OpenAI key resolution, scoring one call and upserting
 * the result into call_qa_scores. Used by the cron (./cron.ts) and the rescore endpoint.
 */
import { and, asc, eq, gte, isNull, lt, ne, or, sql } from "drizzle-orm";
import { db } from "../../db";
import { agents, plivoCalls, users } from "@shared/schema";
import { callQaScores, type CallQaScore } from "@shared/schema-call-qa";
import { storage } from "../../storage";
import { OpenAIPoolService } from "../../engines/plivo/services/openai-pool.service";
import { QA_MODEL, QA_PROMPT_VERSION, QaScoringError, scoreWithOpenAI } from "./scorer";

export const MIN_TRANSCRIPT_CHARS = 200;
export const MAX_FAILED_ATTEMPTS = 3;
const LOG = "🧪 [CallQA]";

/** Global kill switch: global_settings.call_qa_enabled (default true). */
export async function isCallQaEnabled(): Promise<boolean> {
  try {
    const setting = await storage.getGlobalSetting("call_qa_enabled");
    if (!setting) return true;
    const v = setting.value as unknown;
    if (typeof v === "boolean") return v;
    if (typeof v === "string") return v.toLowerCase() !== "false";
    return true;
  } catch {
    return true;
  }
}

/** Credential attached to the call → least-loaded pool key → OPENAI_API_KEY. */
async function resolveOpenAIKey(openaiCredentialId: string | null): Promise<string | null> {
  if (openaiCredentialId) {
    const cred = await OpenAIPoolService.getCredentialById(openaiCredentialId).catch(() => null);
    if (cred?.apiKey) return cred.apiKey;
  }
  const pooled = await OpenAIPoolService.getLeastLoadedCredential().catch(() => null);
  if (pooled?.apiKey) return pooled.apiKey;
  return process.env.OPENAI_API_KEY || null;
}

function isTestCall(metadata: unknown): boolean {
  return !!metadata && typeof metadata === "object" && (metadata as Record<string, unknown>).testCall === true;
}

/**
 * Completed, non-test calls from paying users with a usable transcript and either no score
 * or a failed score that still has retry budget. Oldest first.
 */
export async function findEligibleCalls(limit: number): Promise<Array<{ id: string; metadata: unknown }>> {
  const rows = await db.select({ id: plivoCalls.id, metadata: plivoCalls.metadata })
    .from(plivoCalls)
    .innerJoin(users, eq(users.id, plivoCalls.userId))
    .leftJoin(callQaScores, eq(callQaScores.callId, plivoCalls.id))
    .where(and(
      eq(plivoCalls.status, "completed"),
      sql`length(${plivoCalls.transcript}) >= ${MIN_TRANSCRIPT_CHARS}`,
      sql`coalesce(${plivoCalls.metadata}->>'testCall', 'false') <> 'true'`,
      ne(users.planType, "free"),
      or(
        isNull(callQaScores.id),
        and(eq(callQaScores.status, "failed"), lt(callQaScores.attempts, MAX_FAILED_ATTEMPTS)),
      ),
    ))
    .orderBy(asc(plivoCalls.createdAt))
    .limit(limit);
  return rows.filter((r) => !isTestCall(r.metadata));
}

export async function getScoreForCall(callId: string): Promise<CallQaScore | null> {
  const [row] = await db.select().from(callQaScores).where(eq(callQaScores.callId, callId)).limit(1);
  return row || null;
}

async function upsertFailure(callId: string, userId: string, agentId: string | null, message: string): Promise<CallQaScore> {
  const [row] = await db.insert(callQaScores)
    .values({ callId, userId, agentId, status: "failed", attempts: 1, error: message, model: QA_MODEL, promptVersion: QA_PROMPT_VERSION, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: callQaScores.callId,
      set: { status: "failed", attempts: sql`${callQaScores.attempts} + 1`, error: message, updatedAt: new Date() },
    })
    .returning();
  return row;
}

export interface ScoreOutcome { ok: boolean; score: CallQaScore | null; reason?: string }

/**
 * Score one plivo_calls row. `force` bypasses the eligibility filters (manual rescore) but
 * never the transcript minimum. Failures are recorded on the row so the cron can back off.
 */
export async function scoreCall(callId: string, options: { force?: boolean } = {}): Promise<ScoreOutcome> {
  const [row] = await db.select({
    call: plivoCalls,
    agentName: agents.name,
    agentSystemPrompt: agents.systemPrompt,
    planType: users.planType,
  })
    .from(plivoCalls)
    .leftJoin(agents, eq(agents.id, plivoCalls.agentId))
    .leftJoin(users, eq(users.id, plivoCalls.userId))
    .where(eq(plivoCalls.id, callId))
    .limit(1);
  if (!row || !row.call.userId) return { ok: false, score: null, reason: "call_not_found" };
  const call = row.call;
  const userId: string = row.call.userId;
  const transcript = (call.transcript || "").trim();
  if (transcript.length < MIN_TRANSCRIPT_CHARS) return { ok: false, score: null, reason: "transcript_too_short" };
  if (!options.force) {
    if (call.status !== "completed") return { ok: false, score: null, reason: "call_not_completed" };
    if (isTestCall(call.metadata)) return { ok: false, score: null, reason: "test_call" };
    if (row.planType === "free") return { ok: false, score: null, reason: "free_plan" };
  }

  const apiKey = await resolveOpenAIKey(call.openaiCredentialId);
  if (!apiKey) {
    const score = await upsertFailure(call.id, userId, call.agentId, "No OpenAI API key available");
    return { ok: false, score, reason: "no_api_key" };
  }

  try {
    const result = await scoreWithOpenAI({
      transcript,
      agentSystemPrompt: row.agentSystemPrompt,
      agentName: row.agentName,
      aiSummary: call.aiSummary,
      durationSeconds: call.duration,
      callDirection: call.callDirection,
    }, apiKey);
    const now = new Date();
    const values = {
      status: "scored",
      error: null,
      overall: result.overall,
      greeting: result.greeting,
      understanding: result.understanding,
      objectionHandling: result.objectionHandling,
      compliance: result.compliance,
      closing: result.closing,
      strengths: result.strengths,
      improvements: result.improvements,
      flags: result.flags,
      verdict: result.verdict,
      model: QA_MODEL,
      promptVersion: QA_PROMPT_VERSION,
      transcriptChars: transcript.length,
      scoredAt: now,
      updatedAt: now,
    };
    const [score] = await db.insert(callQaScores)
      .values({ callId: call.id, userId, agentId: call.agentId, attempts: 1, ...values })
      .onConflictDoUpdate({ target: callQaScores.callId, set: { ...values, attempts: sql`${callQaScores.attempts} + 1` } })
      .returning();
    return { ok: true, score };
  } catch (error: unknown) {
    const message = (error instanceof Error ? error.message : "Scoring failed").slice(0, 500);
    const retryable = error instanceof QaScoringError ? error.retryable : true;
    const score = await upsertFailure(call.id, userId, call.agentId, message);
    console.error(`${LOG} Call ${call.id} scoring failed (${retryable ? "retryable" : "final"}): ${message}`);
    return { ok: false, score, reason: "scoring_failed" };
  }
}

/** Scores in the last `days` days for one user (optionally one agent), newest first. */
export async function listScores(userId: string, days: number, agentId?: string, limit = 2000): Promise<Array<CallQaScore & { agentName: string | null }>> {
  const since = new Date(Date.now() - days * 86_400_000);
  const conditions = [eq(callQaScores.userId, userId), eq(callQaScores.status, "scored"), gte(callQaScores.scoredAt, since)];
  if (agentId) conditions.push(eq(callQaScores.agentId, agentId));
  const rows = await db.select({ score: callQaScores, agentName: agents.name })
    .from(callQaScores)
    .leftJoin(agents, eq(agents.id, callQaScores.agentId))
    .where(and(...conditions))
    .orderBy(sql`${callQaScores.scoredAt} desc`)
    .limit(limit);
  return rows.map((r) => ({ ...r.score, agentName: r.agentName }));
}
