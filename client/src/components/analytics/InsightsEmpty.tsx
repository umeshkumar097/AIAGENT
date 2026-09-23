import { useTranslation } from "react-i18next";
import { BarChart3 } from "lucide-react";

/** Shared empty state for an insights card (no rows in the selected range). */
export function InsightsEmpty({ message }: { message?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground" data-testid="insights-empty">
      <BarChart3 className="h-8 w-8 opacity-40" />
      <p className="text-sm">{message || t("analytics.insights.empty", "No calls in this period yet. Run a campaign or take an inbound call and check back.")}</p>
    </div>
  );
}
