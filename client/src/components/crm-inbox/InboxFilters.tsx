/** Inbox filter bar: mine / unassigned / overdue / all with counts, stage select, search, settings. */
import { useTranslation } from "react-i18next";
import { Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INBOX_FILTERS, stageLabel, type InboxCounts, type InboxFilter, type InboxStage } from "@/lib/crm-inbox";

interface Props {
  filter: InboxFilter;
  counts: InboxCounts;
  onFilter: (f: InboxFilter) => void;
  stage: string;
  stages: InboxStage[];
  onStage: (s: string) => void;
  q: string;
  onQ: (q: string) => void;
  onOpenSettings: () => void;
}

export function InboxFilters({ filter, counts, onFilter, stage, stages, onStage, q, onQ, onOpenSettings }: Props) {
  const { t } = useTranslation();
  const labels: Record<InboxFilter, string> = {
    mine: t("crmInbox.filter.mine", "Mine"),
    unassigned: t("crmInbox.filter.unassigned", "Unassigned"),
    overdue: t("crmInbox.filter.overdue", "Overdue"),
    all: t("crmInbox.filter.all", "All"),
  };
  return (
    <div className="flex flex-wrap items-center gap-2" data-testid="inbox-filters">
      <div className="flex items-center rounded-lg border bg-background p-1 gap-1">
        {INBOX_FILTERS.map(f => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "secondary" : "ghost"}
            onClick={() => onFilter(f)}
            data-testid={`inbox-filter-${f}`}
            className={f === "overdue" && counts.overdue > 0 && filter !== f ? "text-rose-600 dark:text-rose-400" : undefined}
          >
            {labels[f]}
            <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[11px] tabular-nums">{counts[f]}</span>
          </Button>
        ))}
      </div>
      <Select value={stage || "all"} onValueChange={onStage}>
        <SelectTrigger className="h-9 w-[180px]" data-testid="inbox-stage-filter">
          <SelectValue placeholder={t("crmInbox.allStages", "All stages")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("crmInbox.allStages", "All stages")}</SelectItem>
          {stages.map(s => (
            <SelectItem key={s.stage} value={s.stage}>{stageLabel(s.stage)} ({s.count})</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => onQ(e.target.value)}
          placeholder={t("crmInbox.searchPlaceholder", "Search name, phone, email, company")}
          className="pl-8 h-9"
          data-testid="inbox-search"
        />
      </div>
      <Button variant="outline" size="sm" onClick={onOpenSettings} data-testid="inbox-open-settings">
        <Settings2 className="w-4 h-4 mr-1.5" />
        {t("crmInbox.settings.button", "SLA & auto-assign")}
      </Button>
    </div>
  );
}
