import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LABELS, SERIES_COLORS, TOOLTIP_STYLE, foldSlices, type LanguageSlice } from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

function LanguagePie({ title, rows, testId }: { title: string; rows: LanguageSlice[]; testId: string }) {
  const { t } = useTranslation();
  const data = foldSlices(rows, (r) => t(`analytics.insights.language.${r.language}`, LANGUAGE_LABELS[r.language] || r.language));
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="flex-1 min-w-[220px]" data-testid={testId}>
      <h4 className="mb-1 text-sm font-medium text-muted-foreground">{title}</h4>
      {total === 0 ? (
        <InsightsEmpty message={t("analytics.insights.languages.none", "No language data in this period.")} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2} stroke="hsl(var(--card))" strokeWidth={2}>
              {data.map((d, i) => <Cell key={d.name} fill={SERIES_COLORS[i % SERIES_COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v} (${Math.round((v / total) * 100)}%)`, t("analytics.insights.calls", "Calls")]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/** Language mix: what the agents are configured to speak vs. what was detected on the call, when recorded. */
export function LanguageMix({ languages }: { languages: { agent: LanguageSlice[]; detected: LanguageSlice[] } }) {
  const { t } = useTranslation();
  return (
    <Card data-testid="card-language-mix">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("analytics.insights.languages.title", "Language mix")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("analytics.insights.languages.subtitle", "Agent language setting, and the language detected on the call where available.")}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          <LanguagePie title={t("analytics.insights.languages.agent", "Agent language")} rows={languages.agent} testId="pie-agent-language" />
          <LanguagePie title={t("analytics.insights.languages.detected", "Detected on call")} rows={languages.detected} testId="pie-detected-language" />
        </div>
      </CardContent>
    </Card>
  );
}
