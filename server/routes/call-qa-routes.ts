/**
 * Call QA routes (mounted at /api; each route authenticates itself so the mount stays inert for
 * every other /api path).
 *   GET  /calls/:id/qa           owner only → { status: 'scored'|'failed'|'none', score? }
 *   POST /calls/:id/qa/rescore   owner only → same shape, scored synchronously (force)
 *   GET  /qa/summary?days=7&agentId=  → averages, distribution, top improvements, flags, per-agent
 */
import { Router, type Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { plivoCalls } from "@shared/schema";
import { QA_FLAGS, QA_SUB_SCORES, type CallQaScore } from "@shared/schema-call-qa";
import { authenticateHybrid, type HybridAuthRequest } from "../middleware/hybrid-auth";
import { getScoreForCall, isCallQaEnabled, listScores, scoreCall } from "../services/call-qa";

export const callQaRouter = Router();

const RESCORE_COOLDOWN_MS = 60_000;
const lastRescoreAt = new Map<string, number>();

function shape(row: CallQaScore) {
  return {
    id: row.id,
    callId: row.callId,
    agentId: row.agentId,
    status: row.status,
    attempts: row.attempts,
    error: row.status === "failed" ? row.error : null,
    overall: row.overall,
    subScores: {
      greeting: row.greeting,
      understanding: row.understanding,
      objectionHandling: row.objectionHandling,
      compliance: row.compliance,
      closing: row.closing,
    },
    strengths: row.strengths || [],
    improvements: row.improvements || [],
    flags: row.flags || [],
    verdict: row.verdict,
    model: row.model,
    scoredAt: row.scoredAt,
    updatedAt: row.updatedAt,
  };
}

/** Resolves the plivo_calls row and enforces ownership (404 for other users' calls). */
async function ownedCall(req: HybridAuthRequest, res: Response): Promise<{ id: string } | null> {
  const id = String(req.params.id || "");
  if (!/^[A-Za-z0-9-]{1,64}$/.test(id)) { res.status(400).json({ error: "Invalid call id" }); return null; }
  const [call] = await db.select({ id: plivoCalls.id, userId: plivoCalls.userId }).from(plivoCalls).where(eq(plivoCalls.id, id)).limit(1);
  if (!call || call.userId !== req.userId) { res.status(404).json({ error: "Call not found" }); return null; }
  return { id: call.id };
}

callQaRouter.get("/calls/:id/qa", authenticateHybrid, async (req: HybridAuthRequest, res: Response) => {
  try {
    const call = await ownedCall(req, res);
    if (!call) return;
    const row = await getScoreForCall(call.id);
    if (!row) return res.json({ status: "none", score: null, enabled: await isCallQaEnabled() });
    res.json({ status: row.status, score: shape(row) });
  } catch (error: unknown) {
    console.error("Get call QA error:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to load call quality score" });
  }
});

callQaRouter.post("/calls/:id/qa/rescore", authenticateHybrid, async (req: HybridAuthRequest, res: Response) => {
  try {
    const call = await ownedCall(req, res);
    if (!call) return;
    const last = lastRescoreAt.get(call.id) || 0;
    if (Date.now() - last < RESCORE_COOLDOWN_MS) return res.status(429).json({ error: "Please wait a minute before re-scoring this call again" });
    lastRescoreAt.set(call.id, Date.now());
    const outcome = await scoreCall(call.id, { force: true });
    if (!outcome.ok) {
      const status = outcome.reason === "transcript_too_short" ? 422 : outcome.reason === "no_api_key" ? 503 : 502;
      return res.status(status).json({ error: outcome.reason || "scoring_failed", score: outcome.score ? shape(outcome.score) : null });
    }
    res.json({ status: "scored", score: shape(outcome.score!) });
  } catch (error: unknown) {
    console.error("Rescore call QA error:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to re-score call" });
  }
});

function avg(values: number[]): number | null {
  const nums = values.filter((v) => Number.isFinite(v));
  return nums.length ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10 : null;
}

callQaRouter.get("/qa/summary", authenticateHybrid, async (req: HybridAuthRequest, res: Response) => {
  try {
    const daysRaw = Number(req.query.days);
    const days = Number.isFinite(daysRaw) ? Math.min(90, Math.max(1, Math.floor(daysRaw))) : 7;
    const agentIdRaw = typeof req.query.agentId === "string" ? req.query.agentId.trim() : "";
    const agentId = /^[A-Za-z0-9-]{1,64}$/.test(agentIdRaw) ? agentIdRaw : undefined;
    const rows = await listScores(req.userId!, days, agentId);

    const averages: Record<string, number | null> = { overall: avg(rows.map((r) => r.overall ?? NaN)) };
    for (const key of QA_SUB_SCORES) averages[key] = avg(rows.map((r) => r[key] ?? NaN));

    const distribution = Array.from({ length: 10 }, (_, i) => ({ score: i + 1, count: 0 }));
    const flagCounts: Record<string, number> = Object.fromEntries(QA_FLAGS.map((f) => [f, 0]));
    const improvementCounts = new Map<string, { text: string; count: number }>();
    const perAgent = new Map<string, { agentId: string | null; agentName: string | null; count: number; sum: number; flagged: number }>();

    for (const r of rows) {
      if (r.overall) distribution[r.overall - 1].count++;
      for (const f of r.flags || []) if (f in flagCounts) flagCounts[f]++;
      for (const text of r.improvements || []) {
        const key = text.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
        if (!key) continue;
        const entry = improvementCounts.get(key) || { text, count: 0 };
        entry.count++;
        improvementCounts.set(key, entry);
      }
      const agentKey = r.agentId || "none";
      const entry = perAgent.get(agentKey) || { agentId: r.agentId, agentName: r.agentName, count: 0, sum: 0, flagged: 0 };
      entry.count++;
      entry.sum += r.overall || 0;
      if ((r.flags || []).length) entry.flagged++;
      perAgent.set(agentKey, entry);
    }

    res.json({
      days,
      agentId: agentId || null,
      count: rows.length,
      averages,
      distribution,
      flags: flagCounts,
      topImprovements: Array.from(improvementCounts.values()).sort((a, b) => b.count - a.count).slice(0, 5),
      perAgent: Array.from(perAgent.values())
        .map((a) => ({ agentId: a.agentId, agentName: a.agentName, count: a.count, avgOverall: Math.round((a.sum / a.count) * 10) / 10, flaggedCalls: a.flagged }))
        .sort((a, b) => b.count - a.count),
    });
  } catch (error: unknown) {
    console.error("QA summary error:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to build QA summary" });
  }
});
