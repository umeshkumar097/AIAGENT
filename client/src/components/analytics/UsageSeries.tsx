import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import { AXIS_LINE, AXIS_TICK, SERIES_COLORS, TOOLTIP_STYLE, type DailyUsage } from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

/**
 * Minutes used and credits charged per day (IST). Both share one axis: a credit is one billed
 * minute (rounded up per call), so the gap between the bars is the rounding overhead.
 */
export function UsageSeries({ daily }: { daily: DailyUsage[] }) {
  const { t } = useTranslation();
  const data = daily.map((d) => ({
    ...d,
    name: new Date(`${d.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));
  const totalMinutes = daily.reduce((acc, d) => acc + d.minutes, 0);
  const totalCredits = daily.reduce((acc, d) => acc + d.credits, 0);
  const minutesLabel = t("analytics.insights.usage.minutes", "Minutes");
  const creditsLabel = t("analytics.insights.usage.credits", "Credits");

  return (
    <Card data-testid="card-usage-series">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{t("analytics.insights.usage.title", "Minutes and credits per day")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("analytics.insights.usage.subtitle", "Talk time used and credits charged, by India calendar day.")}</p>
          </div>
          <div className="flex gap-4 text-sm tabular-nums">
            <div><span className="text-muted-foreground">{minutesLabel}: </span><span className="font-semibold" data-testid="text-total-minutes">{Math.round(totalMinutes).toLocaleString()}</span></div>
            <div><span className="text-muted-foreground">{creditsLabel}: </span><span className="font-semibold" data-testid="text-total-credits">{Math.round(totalCredits).toLocaleString()}</span></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <InsightsEmpty />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ left: -12, right: 8, top: 4, bottom: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
              <XAxis dataKey="name" tick={AXIS_TICK} axisLine={AXIS_LINE} tickLine={false} minTickGap={16} />
              <YAxis tick={AXIS_TICK} axisLine={AXIS_LINE} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
                labelFormatter={(label, payload) => {
                  const calls = (payload?.[0]?.payload as DailyUsage | undefined)?.calls ?? 0;
                  return `${label} · ${calls} ${t("analytics.insights.calls", "Calls").toLowerCase()}`;
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="minutes" name={minutesLabel} fill={SERIES_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={24} />
              <Bar dataKey="credits" name={creditsLabel} fill={SERIES_COLORS[2]} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
