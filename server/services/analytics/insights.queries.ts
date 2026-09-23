/**
 * SQL for /api/analytics/insights. Every query is one round trip, scoped by user_id, fully
 * parameterised through drizzle's `sql` tag, and aggregates over plivo_calls (the Indian
 * Plivo + Sarvam engine). Times are bucketed in IST (Asia/Kolkata).
 */
import { sql, type SQL } from "drizzle-orm";
import { db } from "../../db";

export interface InsightsScope {
  userId: string;
  since: Date;
  agentId?: string;
  campaignId?: string;
}

/** Constant (never user input) — inlined so identical expressions match in GROUPING SETS. */
const IST = sql.raw("'Asia/Kolkata'");

/** Shared WHERE for plivo_calls aliased `p`: user, window, optional agent/campaign, no browser test calls. */
function scopeWhere(s: InsightsScope, alias = "p"): SQL {
  const a = sql.raw(alias);
  const parts: SQL[] = [
    sql`${a}.user_id = ${s.userId}`,
    sql`${a}.created_at >= ${s.since}`,
    sql`COALESCE(${a}.metadata->>'testCall', 'false') <> 'true'`,
  ];
  if (s.agentId) parts.push(sql`${a}.agent_id = ${s.agentId}`);
  if (s.campaignId) parts.push(sql`${a}.campaign_id = ${s.campaignId}`);
  return sql.join(parts, sql` AND `);
}

/**
 * Outcome id per call: metadata.outcome wins, then the classification column (new ids or the
 * legacy hot/warm/cold/lost), then telephony status. In-flight calls are `in_progress`.
 */
const OUTCOME = sql`COALESCE(
  NULLIF(p.metadata->>'outcome', ''),
  CASE lower(COALESCE(p.classification, ''))
    WHEN '' THEN NULL
    WHEN 'hot' THEN 'interested'
    WHEN 'warm' THEN 'no_decision'
    WHEN 'cold' THEN 'not_interested'
    WHEN 'lost' THEN 'not_interested'
    ELSE lower(p.classification)
  END,
  CASE
    WHEN p.was_transferred = true THEN 'transferred'
    WHEN p.metadata->>'appointmentBooked' = 'true' THEN 'appointment_booked'
    WHEN p.status = 'no-answer' THEN 'no_answer'
    WHEN p.status = 'busy' THEN 'busy'
    WHEN p.status IN ('failed', 'canceled', 'credit_failed') THEN 'failed'
    WHEN p.status IN ('pending', 'initiated', 'ringing', 'in-progress') THEN 'in_progress'
    ELSE 'no_decision'
  END
)`;

const ANSWERED = sql`(p.answered_at IS NOT NULL OR (p.status = 'completed' AND COALESCE(p.duration, 0) > 0))`;
const INTERESTED = sql`(${OUTCOME} IN ('interested', 'appointment_booked'))`;
const APPOINTMENT = sql`(${OUTCOME} = 'appointment_booked' OR p.metadata->>'appointmentBooked' = 'true')`;
const CALLBACK = sql`(${OUTCOME} = 'callback_requested')`;
/** created_at is stored as UTC (timestamp without tz); shift it into IST for bucketing. */
const LOCAL_TS = sql`((p.created_at AT TIME ZONE 'UTC') AT TIME ZONE ${IST})`;
/** Credits charged per Plivo call: ceil(minutes), see plivo-call.service handleCallStatus. */
const CREDITS = sql`CEIL(COALESCE(p.duration, 0) / 60.0)`;

const n = (v: unknown): number => Number(v) || 0;

export interface OutcomeRow { outcome: string; count: number }
export async function queryOutcomes(s: InsightsScope): Promise<OutcomeRow[]> {
  const r = await db.execute(sql`
    SELECT ${OUTCOME} AS outcome, COUNT(*)::int AS count
    FROM plivo_calls p WHERE ${scopeWhere(s)}
    GROUP BY 1 ORDER BY 2 DESC`);
  return r.rows.map((x) => ({ outcome: String(x.outcome), count: n(x.count) }));
}

export interface TimeBucketRow { bucket: number; calls: number; answered: number; interested: number }
/** One query, two grouping sets: hour of day (0-23) and ISO weekday (1=Mon..7=Sun), both IST. */
export async function queryBestTimes(s: InsightsScope): Promise<{ hours: TimeBucketRow[]; weekdays: TimeBucketRow[] }> {
  const r = await db.execute(sql`
    SELECT
      EXTRACT(HOUR FROM ${LOCAL_TS})::int AS hour,
      EXTRACT(ISODOW FROM ${LOCAL_TS})::int AS dow,
      COUNT(*)::int AS calls,
      COUNT(*) FILTER (WHERE ${ANSWERED})::int AS answered,
      COUNT(*) FILTER (WHERE ${INTERESTED})::int AS interested
    FROM plivo_calls p WHERE ${scopeWhere(s)}
    GROUP BY GROUPING SETS ((EXTRACT(HOUR FROM ${LOCAL_TS})), (EXTRACT(ISODOW FROM ${LOCAL_TS})))`);
  const hours: TimeBucketRow[] = [];
  const weekdays: TimeBucketRow[] = [];
  for (const x of r.rows) {
    const row = { calls: n(x.calls), answered: n(x.answered), interested: n(x.interested) };
    if (x.hour !== null && x.hour !== undefined) hours.push({ bucket: n(x.hour), ...row });
    else if (x.dow !== null && x.dow !== undefined) weekdays.push({ bucket: n(x.dow), ...row });
  }
  return { hours, weekdays };
}

export interface AgentRow {
  agentId: string | null; name: string; language: string | null; calls: number; answered: number;
  avgDuration: number; interested: number; appointments: number; callbacks: number; minutes: number;
}
export async function queryAgents(s: InsightsScope): Promise<AgentRow[]> {
  const r = await db.execute(sql`
    SELECT p.agent_id, a.name, a.language,
      COUNT(*)::int AS calls,
      COUNT(*) FILTER (WHERE ${ANSWERED})::int AS answered,
      COALESCE(AVG(p.duration) FILTER (WHERE ${ANSWERED}), 0)::float AS avg_duration,
      COUNT(*) FILTER (WHERE ${INTERESTED})::int AS interested,
      COUNT(*) FILTER (WHERE ${APPOINTMENT})::int AS appointments,
      COUNT(*) FILTER (WHERE ${CALLBACK})::int AS callbacks,
      (COALESCE(SUM(p.duration), 0) / 60.0)::float AS minutes
    FROM plivo_calls p
    LEFT JOIN agents a ON a.id = p.agent_id AND a.user_id = ${s.userId}
    WHERE ${scopeWhere(s)}
    GROUP BY p.agent_id, a.name, a.language
    ORDER BY calls DESC`);
  return r.rows.map((x) => ({
    agentId: x.agent_id ? String(x.agent_id) : null,
    name: x.name ? String(x.name) : "Unassigned",
    language: x.language ? String(x.language) : null,
    calls: n(x.calls), answered: n(x.answered), avgDuration: Math.round(n(x.avg_duration)),
    interested: n(x.interested), appointments: n(x.appointments), callbacks: n(x.callbacks),
    minutes: Math.round(n(x.minutes) * 10) / 10,
  }));
}

export interface LanguageRow { language: string; count: number }
/** Grouping sets: configured agent language vs. language detected on the call (metadata.detectedLanguage). */
export async function queryLanguages(s: InsightsScope): Promise<{ agent: LanguageRow[]; detected: LanguageRow[] }> {
  const r = await db.execute(sql`
    SELECT GROUPING(a.language) AS g_agent,
      a.language AS agent_language,
      NULLIF(p.metadata->>'detectedLanguage', '') AS detected_language,
      COUNT(*)::int AS count
    FROM plivo_calls p
    LEFT JOIN agents a ON a.id = p.agent_id AND a.user_id = ${s.userId}
    WHERE ${scopeWhere(s)}
    GROUP BY GROUPING SETS ((a.language), (NULLIF(p.metadata->>'detectedLanguage', '')))
    ORDER BY count DESC`);
  const agent: LanguageRow[] = [];
  const detected: LanguageRow[] = [];
  for (const x of r.rows) {
    if (n(x.g_agent) === 0) agent.push({ language: x.agent_language ? String(x.agent_language) : "unknown", count: n(x.count) });
    else if (x.detected_language) detected.push({ language: String(x.detected_language), count: n(x.count) });
  }
  return { agent, detected };
}

export interface DailyRow { date: string; calls: number; minutes: number; credits: number }
/**
 * Per-day minutes and credits (IST days). plivo_calls credits are derived (ceil minutes, non-test);
 * legacy `calls` rows carry credits_used, so they are unioned in cheaply on the same indexes.
 */
export async function queryDaily(s: InsightsScope): Promise<DailyRow[]> {
  const legacyWhere: SQL[] = [sql`c.user_id = ${s.userId}`, sql`c.created_at >= ${s.since}`];
  if (s.agentId) legacyWhere.push(sql`c.agent_id = ${s.agentId}`);
  if (s.campaignId) legacyWhere.push(sql`c.campaign_id = ${s.campaignId}`);
  const r = await db.execute(sql`
    SELECT to_char(day, 'YYYY-MM-DD') AS date, SUM(calls)::int AS calls,
      (SUM(seconds) / 60.0)::float AS minutes, SUM(credits)::float AS credits
    FROM (
      SELECT date_trunc('day', ${LOCAL_TS}) AS day, COUNT(*) AS calls,
        COALESCE(SUM(p.duration), 0) AS seconds, COALESCE(SUM(${CREDITS}), 0) AS credits
      FROM plivo_calls p WHERE ${scopeWhere(s)} GROUP BY 1
      UNION ALL
      SELECT date_trunc('day', (c.created_at AT TIME ZONE 'UTC') AT TIME ZONE ${IST}) AS day, COUNT(*) AS calls,
        COALESCE(SUM(c.duration), 0) AS seconds, COALESCE(SUM(c.credits_used), 0) AS credits
      FROM calls c WHERE ${sql.join(legacyWhere, sql` AND `)} GROUP BY 1
    ) u
    GROUP BY day ORDER BY day`);
  return r.rows.map((x) => ({
    date: String(x.date), calls: n(x.calls),
    minutes: Math.round(n(x.minutes) * 10) / 10, credits: Math.round(n(x.credits)),
  }));
}

export interface FunnelRow { dialed: number; answered: number; talked30: number; converted: number; appointments: number; minutes: number; credits: number }
export async function queryFunnel(s: InsightsScope): Promise<FunnelRow> {
  const r = await db.execute(sql`
    SELECT COUNT(*)::int AS dialed,
      COUNT(*) FILTER (WHERE ${ANSWERED})::int AS answered,
      COUNT(*) FILTER (WHERE ${ANSWERED} AND COALESCE(p.duration, 0) >= 30)::int AS talked30,
      COUNT(*) FILTER (WHERE ${INTERESTED})::int AS converted,
      COUNT(*) FILTER (WHERE ${APPOINTMENT})::int AS appointments,
      (COALESCE(SUM(p.duration), 0) / 60.0)::float AS minutes,
      COALESCE(SUM(${CREDITS}), 0)::float AS credits
    FROM plivo_calls p WHERE ${scopeWhere(s)}`);
  const x = r.rows[0] || {};
  return {
    dialed: n(x.dialed), answered: n(x.answered), talked30: n(x.talked30), converted: n(x.converted),
    appointments: n(x.appointments), minutes: Math.round(n(x.minutes) * 10) / 10, credits: Math.round(n(x.credits)),
  };
}
