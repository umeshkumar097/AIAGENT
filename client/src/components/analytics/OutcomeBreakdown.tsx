import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import { AXIS_LINE, AXIS_TICK, OUTCOME_LABELS, SERIES_COLORS, TOOLTIP_STYLE, type OutcomeSlice } from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

const POSITIVE = new Set(["interested", "appointment_booked", "transferred", "callback_requested"]);
const NEGATIVE = new Set(["not_interested", "do_not_call", "wrong_number", "failed"]);

/** Horizontal ranked bars: one row per outcome id, sorted by count, with share on hover. */
export function OutcomeBreakdown({ outcomes }: { outcomes: OutcomeSlice[] }) {
  const { t } = useTranslation();
  const data = outcomes.map((o) => ({
    id: o.outcome,
    name: t(`analytics.insights.outcome.${o.outcome}`, OUTCOME_LABELS[o.outcome] || o.outcome),
    count: o.count,
    share: o.share,
  }));
  const colorFor = (id: string) => (POSITIVE.has(id) ? SERIES_COLORS[1] : NEGATIVE.has(id) ? SERIES_COLORS[4] : SERIES_COLORS[0]);
  const height = Math.max(200, data.length * 34 + 40);

  return (
    <Card data-testid="card-outcome-breakdown">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("analytics.insights.outcomes.title", "Call outcomes")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("analytics.insights.outcomes.subtitle", "What happened on each call — agent-tagged outcomes first, then AI and telephony fallbacks.")}</p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <InsightsEmpty />
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }} barCategoryGap={6}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" horizontal={false} />
              <XAxis type="number" tick={AXIS_TICK} axisLine={AXIS_LINE} allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={150} tick={AXIS_TICK} axisLine={AXIS_LINE} tickLine={false} />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
                formatter={(value: number, _name, item) => [`${value} (${(item?.payload as { share: number })?.share ?? 0}%)`, t("analytics.insights.calls", "Calls")]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22} label={{ position: "right", fill: "hsl(var(--muted-foreground))", fontSize: 12 }}>
                {data.map((d) => <Cell key={d.id} fill={colorFor(d.id)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
