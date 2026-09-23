import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AnalyticsHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onExportPDF: () => void;
  isExporting: boolean;
  /** Hide the overview-only controls (period select + PDF export) when another tab owns its filters. */
  showControls: boolean;
}

/** Gradient page header for Analytics with the Overview period selector and PDF export. */
export function AnalyticsHeader({ timeRange, onTimeRangeChange, onExportPDF, isExporting, showControls }: AnalyticsHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-violet-100/50 to-fuchsia-50 dark:from-purple-950/40 dark:via-violet-900/30 dark:to-fuchsia-950/40 border border-purple-100 dark:border-purple-900/50 p-6 md:p-8">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-analytics-title">{t("analytics.title")}</h1>
            <p className="text-muted-foreground mt-0.5">{t("analytics.subtitle")}</p>
          </div>
        </div>
        {showControls && (
          <div className="flex flex-wrap items-center gap-3">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-[150px] bg-white/80 dark:bg-white/10 border-purple-200 dark:border-purple-800" data-testid="select-time-range">
                <SelectValue placeholder={t("analytics.selectPeriod")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">{t("analytics.timeRange.last7Days")}</SelectItem>
                <SelectItem value="30days">{t("analytics.timeRange.last30Days")}</SelectItem>
                <SelectItem value="90days">{t("analytics.timeRange.last90Days")}</SelectItem>
                <SelectItem value="year">{t("analytics.timeRange.thisYear")}</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={onExportPDF} disabled={isExporting} data-testid="button-export-report">
              {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
              {t("analytics.exportReport")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
