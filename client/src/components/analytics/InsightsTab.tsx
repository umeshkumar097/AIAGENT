import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Loader2, Phone, PhoneCall, Sparkles, CalendarCheck } from "lucide-react";
import type { Agent } from "@shared/schema";
import { MetricCard } from "@/components/MetricCard";
import { apiRequest } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OutcomeBreakdown } from "./OutcomeBreakdown";
import { BestHoursHeatmap } from "./BestHoursHeatmap";
import { AgentPerformanceTable } from "./AgentPerformanceTable";
import { LanguageMix } from "./LanguageMix";
import { CallFunnel } from "./CallFunnel";
import { UsageSeries } from "./UsageSeries";
import { InsightsEmpty } from "./InsightsEmpty";
import type { CallInsights } from "./insights-shared";

const DAY_OPTIONS = [7, 30, 90] as const;

/** The Analytics "Insights" tab: date range + agent filter, KPI row, and the six insight cards. */
export function InsightsTab() {
  const { t } = useTranslation();
  const [days, setDays] = useState<number>(30);
  const [agentId, setAgentId] = useState<string>("all");

  const { data: agents = [] } = useQuery<Agent[]>({ queryKey: ["/api/agents"] });
  const params = new URLSearchParams({ days: String(days) });
  if (agentId !== "all") params.set("agentId", agentId);
  const url = `/api/analytics/insights?${params.toString()}`;
  const { data, isLoading, error } = useQuery<CallInsights>({
    queryKey: ["/api/analytics/insights", days, agentId],
    queryFn: async () => {
      const res = await apiRequest("GET", url);
      return res.json();
    },
  });

  return (
    <div className="space-y-6" data-testid="insights-tab">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
          <SelectTrigger className="w-[150px]" data-testid="select-insights-days">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DAY_OPTIONS.map((d) => (
              <SelectItem key={d} value={String(d)}>{t(`analytics.insights.range.${d}`, `Last ${d} days`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={agentId} onValueChange={setAgentId}>
          <SelectTrigger className="w-[220px]" data-testid="select-insights-agent">
            <SelectValue placeholder={t("analytics.insights.allAgents", "All agents")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("analytics.insights.allAgents", "All agents")}</SelectItem>
            {agents.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{t("analytics.insights.timezoneNote", "All times in IST (Asia/Kolkata).")}</span>
      </div>

      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error || !data ? (
        <InsightsEmpty message={t("analytics.insights.loadFailed", "Could not load insights. Please try again.")} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t("analytics.insights.kpi.dialed", "Calls dialed")}
              value={data.summary.dialed.toLocaleString()}
              icon={Phone}
              testId="metric-insights-dialed"
              gradientClassName="bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent dark:from-cyan-950/40 dark:via-sky-950/20 dark:to-slate-950/10"
              iconClassName="text-cyan-600 dark:text-cyan-400"
            />
            <MetricCard
              title={t("analytics.insights.kpi.answerRate", "Answer rate")}
              value={`${data.summary.answerRate}%`}
              subtitle={`${data.summary.answered.toLocaleString()} ${t("analytics.insights.kpi.answered", "answered")}`}
              icon={PhoneCall}
              testId="metric-insights-answer-rate"
              gradientClassName="bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent dark:from-emerald-950/40 dark:via-green-950/20 dark:to-slate-950/10"
              iconClassName="text-emerald-600 dark:text-emerald-400"
            />
            <MetricCard
              title={t("analytics.insights.kpi.interestedRate", "Interested rate")}
              value={`${data.summary.interestedRate}%`}
              subtitle={`${data.summary.interested.toLocaleString()} ${t("analytics.insights.kpi.ofAnswered", "of answered calls")}`}
              icon={Sparkles}
              testId="metric-insights-interested-rate"
              gradientClassName="bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-slate-950/10"
              iconClassName="text-blue-600 dark:text-blue-400"
            />
            <MetricCard
              title={t("analytics.insights.kpi.appointments", "Appointments")}
              value={data.summary.appointments.toLocaleString()}
              subtitle={`${Math.round(data.summary.credits).toLocaleString()} ${t("analytics.insights.kpi.creditsUsed", "credits used")}`}
              icon={CalendarCheck}
              testId="metric-insights-appointments"
              gradientClassName="bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-950/10"
              iconClassName="text-violet-600 dark:text-violet-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CallFunnel funnel={data.funnel} />
            <OutcomeBreakdown outcomes={data.outcomes} />
          </div>
          <BestHoursHeatmap hours={data.bestHours} weekdays={data.weekdays} />
          <AgentPerformanceTable agents={data.agents} days={days} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <UsageSeries daily={data.daily} />
            <LanguageMix languages={data.languages} />
          </div>
        </>
      )}
    </div>
  );
}
