import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import {
  AXIS_LINE, AXIS_TICK, SERIES_COLORS, TOOLTIP_STYLE, WEEKDAY_SHORT, formatHour,
  type HourBucket, type WeekdayBucket,
} from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

type Metric = "answerRate" | "interestedRate";

/**
 * Best calling hours (IST). A 24-cell sequential heat strip for hour of day (one hue, light->dark
 * by the chosen rate; cells with no calls stay neutral) plus a weekday bar chart of both rates.
 */
export function BestHoursHeatmap({ hours, weekdays }: { hours: HourBucket[]; weekdays: WeekdayBucket[] }) {
  const { t } = useTranslation();
  const [metric, setMetric] = useState<Metric>("answerRate");
  const total = hours.reduce((acc, h) => acc + h.calls, 0);
  const max = Math.max(1, ...hours.map((h) => h[metric]));
  const best = hours.filter((h) => h.calls >= 3).sort((a, b) => b[metric] - a[metric]).slice(0, 3);
  const weekdayData = weekdays.map((d) => ({
    name: t(`analytics.insights.weekday.${d.weekday}`, WEEKDAY_SHORT[d.weekday - 1] || String(d.weekday)),
    answerRate: d.answerRate, interestedRate: d.interestedRate, calls: d.calls,
  }));
  const labelFor = (m: Metric) => (m === "answerRate"
    ? t("analytics.insights.answerRate", "Answer rate")
    : t("analytics.insights.interestedRate", "Interested rate"));

  return (
    <Card data-testid="card-best-hours">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{t("analytics.insights.bestHours.title", "Best calling hours")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("analytics.insights.bestHours.subtitle", "By hour of day and weekday, India time (IST).")}</p>
          </div>
          <Tabs value={metric} onValueChange={(v) => setMetric(v as Metric)}>
            <TabsList className="h-8">
              <TabsTrigger value="answerRate" className="text-xs px-2">{labelFor("answerRate")}</TabsTrigger>
              <TabsTrigger value="interestedRate" className="text-xs px-2">{labelFor("interestedRate")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {total === 0 ? (
          <InsightsEmpty />
        ) : (
          <>
            <div>
              <div className="grid grid-cols-12 gap-1" role="table" aria-label={t("analytics.insights.bestHours.hourGrid", "Hour of day heatmap")}>
                {hours.map((h) => {
                  const strength = h.calls > 0 ? 0.15 + 0.85 * (h[metric] / max) : 0;
                  return (
                    <div
                      key={h.hour}
                      role="cell"
                      title={`${formatHour(h.hour)} - ${h.calls} ${t("analytics.insights.calls", "Calls").toLowerCase()}, ${labelFor(metric)} ${h[metric]}%`}
                      className="flex h-11 flex-col items-center justify-center rounded-md border border-border/60 text-[10px] leading-tight"
                      style={{ backgroundColor: h.calls > 0 ? `hsl(var(--chart-1) / ${strength.toFixed(2)})` : "hsl(var(--muted) / 0.4)" }}
                      data-testid={`heat-hour-${h.hour}`}
                    >
                      <span className="text-muted-foreground">{formatHour(h.hour)}</span>
                      <span className="font-semibold text-foreground">{h.calls > 0 ? `${Math.round(h[metric])}%` : "-"}</span>
                    </div>
                  );
                })}
              </div>
              {best.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground" data-testid="text-best-hours">
                  {t("analytics.insights.bestHours.top", "Top slots")}: {best.map((h) => `${formatHour(h.hour)} (${Math.round(h[metric])}%)`).join(", ")}
                  {" · "}{t("analytics.insights.bestHours.minCalls", "hours with at least 3 calls")}
                </p>
              )}
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weekdayData} margin={{ left: -12, right: 8, top: 4, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis dataKey="name" tick={AXIS_TICK} axisLine={AXIS_LINE} tickLine={false} />
                <YAxis unit="%" domain={[0, 100]} tick={AXIS_TICK} axisLine={AXIS_LINE} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="answerRate" name={labelFor("answerRate")} fill={SERIES_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="interestedRate" name={labelFor("interestedRate")} fill={SERIES_COLORS[1]} radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
