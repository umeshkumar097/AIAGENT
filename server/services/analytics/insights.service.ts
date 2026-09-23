/**
 * Call insights for the Analytics "Insights" tab: outcome mix, best calling hours (IST), per-agent
 * performance, language mix, daily minutes/credits and the dial→convert funnel. Input validation
 * lives here so the route stays thin; the SQL lives in insights.queries.ts.
 */
import {
  queryAgents, queryBestTimes, queryDaily, queryFunnel, queryLanguages, queryOutcomes,
  type AgentRow, type DailyRow, type FunnelRow, type InsightsScope, type LanguageRow, type OutcomeRow, type TimeBucketRow,
} from "./insights.queries";

export const INSIGHT_DAY_OPTIONS = [7, 30, 90] as const;
const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

export interface InsightsFilters {
  days: number;
  agentId?: string;
  campaignId?: string;
}

export interface CallInsights {
  range: { days: number; since: string; until: string; timezone: string };
  filters: { agentId: string | null; campaignId: string | null };
  summary: {
    dialed: number; answered: number; answerRate: number; interested: number; interestedRate: number;
    appointments: number; minutes: number; credits: number;
  };
  outcomes: Array<OutcomeRow & { share: number }>;
  bestHours: Array<TimeBucketRow & { hour: number; answerRate: number; interestedRate: number }>;
  weekdays: Array<TimeBucketRow & { weekday: number; answerRate: number; interestedRate: number }>;
  agents: Array<AgentRow & { answerRate: number; interestedRate: number }>;
  languages: { agent: LanguageRow[]; detected: LanguageRow[] };
  daily: DailyRow[];
  funnel: Array<{ stage: "dialed" | "answered" | "talked30" | "converted"; count: number; rate: number }>;
}

/** Parse and clamp query-string filters. Throws a plain Error with a user-safe message on bad ids. */
export function parseInsightsFilters(q: Record<string, unknown>): InsightsFilters {
  const rawDays = parseInt(String(q.days ?? "30"), 10);
  const days = INSIGHT_DAY_OPTIONS.includes(rawDays as (typeof INSIGHT_DAY_OPTIONS)[number])
    ? rawDays
    : Math.min(365, Math.max(1, Number.isFinite(rawDays) ? rawDays : 30));
  const pick = (key: string): string | undefined => {
    const v = q[key];
    if (v === undefined || v === null || v === "" || v === "all") return undefined;
    if (typeof v !== "string" || !ID_PATTERN.test(v)) throw new Error(`Invalid ${key}`);
    return v;
  };
  return { days, agentId: pick("agentId"), campaignId: pick("campaignId") };
}

const pct = (part: number, whole: number): number => (whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0);

function withRates<T extends TimeBucketRow>(rows: T[]) {
  return rows.map((r) => ({ ...r, answerRate: pct(r.answered, r.calls), interestedRate: pct(r.interested, r.answered) }));
}

export async function getCallInsights(userId: string, filters: InsightsFilters): Promise<CallInsights> {
  const until = new Date();
  const since = new Date(until.getTime() - filters.days * 24 * 60 * 60 * 1000);
  const scope: InsightsScope = { userId, since, agentId: filters.agentId, campaignId: filters.campaignId };

  // Six independent aggregations, one round trip each, run concurrently on the pool.
  const [outcomes, times, agentRows, languages, daily, funnel] = await Promise.all([
    queryOutcomes(scope), queryBestTimes(scope), queryAgents(scope), queryLanguages(scope), queryDaily(scope), queryFunnel(scope),
  ]);

  const totalOutcomes = outcomes.reduce((acc, o) => acc + o.count, 0);
  const hourMap = new Map(times.hours.map((h) => [h.bucket, h]));
  const dayMap = new Map(times.weekdays.map((d) => [d.bucket, d]));
  const bestHours = withRates(
    Array.from({ length: 24 }, (_, hour) => hourMap.get(hour) ?? { bucket: hour, calls: 0, answered: 0, interested: 0 }),
  ).map((h) => ({ ...h, hour: h.bucket }));
  const weekdays = withRates(
    Array.from({ length: 7 }, (_, i) => dayMap.get(i + 1) ?? { bucket: i + 1, calls: 0, answered: 0, interested: 0 }),
  ).map((d) => ({ ...d, weekday: d.bucket }));

  return {
    range: { days: filters.days, since: since.toISOString(), until: until.toISOString(), timezone: "Asia/Kolkata" },
    filters: { agentId: filters.agentId ?? null, campaignId: filters.campaignId ?? null },
    summary: {
      dialed: funnel.dialed, answered: funnel.answered, answerRate: pct(funnel.answered, funnel.dialed),
      interested: funnel.converted, interestedRate: pct(funnel.converted, funnel.answered),
      appointments: funnel.appointments, minutes: funnel.minutes, credits: funnel.credits,
    },
    outcomes: outcomes.map((o) => ({ ...o, share: pct(o.count, totalOutcomes) })),
    bestHours,
    weekdays,
    agents: agentRows.map((a) => ({ ...a, answerRate: pct(a.answered, a.calls), interestedRate: pct(a.interested, a.answered) })),
    languages,
    daily,
    funnel: toFunnel(funnel),
  };
}

function toFunnel(f: FunnelRow): CallInsights["funnel"] {
  return [
    { stage: "dialed", count: f.dialed, rate: 100 },
    { stage: "answered", count: f.answered, rate: pct(f.answered, f.dialed) },
    { stage: "talked30", count: f.talked30, rate: pct(f.talked30, f.dialed) },
    { stage: "converted", count: f.converted, rate: pct(f.converted, f.dialed) },
  ];
}
