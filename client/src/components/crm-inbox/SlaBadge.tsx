/** Follow-up SLA badge: ok / due soon / overdue / none, with the deadline as a tooltip-ish caption. */
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { relativeTime, type SlaStatus } from "@/lib/crm-inbox";

const STYLES: Record<SlaStatus, string> = {
  ok: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  due_soon: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  overdue: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  none: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export function SlaBadge({ status, dueAt, hours }: { status: SlaStatus; dueAt: string | null; hours: number }) {
  const { t } = useTranslation();
  const label: Record<SlaStatus, string> = {
    ok: t("crmInbox.sla.ok", "On track"),
    due_soon: t("crmInbox.sla.dueSoon", "Due soon"),
    overdue: t("crmInbox.sla.overdue", "Overdue"),
    none: t("crmInbox.sla.none", "No SLA"),
  };
  const when = relativeTime(dueAt);
  return (
    <div className="flex flex-col gap-0.5" data-testid={`sla-badge-${status}`}>
      <Badge variant="outline" className={STYLES[status]}>{label[status]}</Badge>
      {status !== "none" && when && (
        <span className="text-[11px] text-muted-foreground" title={dueAt ?? undefined}>
          {status === "overdue"
            ? t("crmInbox.sla.dueAgo", "due {{when}}", { when })
            : t("crmInbox.sla.dueIn", "due {{when}} · {{hours}}h SLA", { when, hours })}
        </span>
      )}
    </div>
  );
}
