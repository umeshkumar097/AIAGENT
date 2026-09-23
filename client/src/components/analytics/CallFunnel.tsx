import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { SERIES_COLORS, type FunnelStage } from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

const STAGE_FALLBACK: Record<FunnelStage["stage"], string> = {
  dialed: "Dialed",
  answered: "Answered",
  talked30: "Talked 30s+",
  converted: "Interested / appointment",
};

/** Dialed -> answered -> talked >=30s -> interested/appointment. Bars are width-scaled to the dialed count. */
export function CallFunnel({ funnel }: { funnel: FunnelStage[] }) {
  const { t } = useTranslation();
  const top = funnel[0]?.count ?? 0;

  return (
    <Card data-testid="card-call-funnel">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("analytics.insights.funnel.title", "Call funnel")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("analytics.insights.funnel.subtitle", "Where calls drop off between dialing and a positive outcome.")}</p>
      </CardHeader>
      <CardContent>
        {top === 0 ? (
          <InsightsEmpty />
        ) : (
          <ol className="space-y-3">
            {funnel.map((s, i) => {
              const prev = funnel[i - 1];
              const stepRate = prev && prev.count > 0 ? Math.round((s.count / prev.count) * 1000) / 10 : null;
              return (
                <li key={s.stage} data-testid={`funnel-${s.stage}`}>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span className="font-medium">{t(`analytics.insights.funnel.${s.stage}`, STAGE_FALLBACK[s.stage])}</span>
                    <span className="tabular-nums text-muted-foreground">
                      <span className="font-semibold text-foreground">{s.count.toLocaleString()}</span>
                      {" · "}{s.rate}%
                      {stepRate !== null && <span className="ml-1 text-xs">({stepRate}% {t("analytics.insights.funnel.ofPrevious", "of previous")})</span>}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50" role="img" aria-label={`${s.count} (${s.rate}%)`}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.max(1.5, (s.count / top) * 100)}%`, backgroundColor: SERIES_COLORS[Math.min(i, SERIES_COLORS.length - 1)] }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
