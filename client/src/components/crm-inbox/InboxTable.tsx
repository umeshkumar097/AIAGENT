/** Inbox table: selection, lead, stage, next action, last contact, SLA badge, assignee dropdown, notes. */
import { useTranslation } from "react-i18next";
import { MessageSquare, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { relativeTime, type InboxAssignee, type InboxLead } from "@/lib/crm-inbox";
import { AssigneeSelect } from "./AssigneeSelect";
import { SlaBadge } from "./SlaBadge";

interface Props {
  leads: InboxLead[];
  assignees: InboxAssignee[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[], checked: boolean) => void;
  onAssign: (leadId: string, userId: string | null) => void;
  onOpenNotes: (lead: InboxLead) => void;
  stageName: (stage: string) => string;
  isLoading: boolean;
  assigningId?: string | null;
}

export function InboxTable({ leads, assignees, selected, onToggle, onToggleAll, onAssign, onOpenNotes, stageName, isLoading, assigningId }: Props) {
  const { t } = useTranslation();
  const ids = leads.map(l => l.id);
  const allChecked = ids.length > 0 && ids.every(id => selected.has(id));

  return (
    <div className="rounded-lg border overflow-x-auto" data-testid="inbox-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox checked={allChecked} onCheckedChange={(c) => onToggleAll(ids, c === true)} aria-label={t("crmInbox.selectAll", "Select all")} data-testid="inbox-select-all" />
            </TableHead>
            <TableHead>{t("crmInbox.col.lead", "Lead")}</TableHead>
            <TableHead>{t("crmInbox.col.stage", "Stage")}</TableHead>
            <TableHead>{t("crmInbox.col.nextAction", "Next action")}</TableHead>
            <TableHead>{t("crmInbox.col.lastContact", "Last contact")}</TableHead>
            <TableHead>{t("crmInbox.col.sla", "Follow-up SLA")}</TableHead>
            <TableHead>{t("crmInbox.col.assignee", "Assigned to")}</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && leads.length === 0 && Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={`sk-${i}`}>
              {Array.from({ length: 8 }).map((__, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}
            </TableRow>
          ))}
          {!isLoading && leads.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-12 text-center text-muted-foreground" data-testid="inbox-empty">
                {t("crmInbox.empty", "Nothing here — no leads match this filter.")}
              </TableCell>
            </TableRow>
          )}
          {leads.map(lead => (
            <TableRow key={lead.id} data-testid={`inbox-row-${lead.id}`} className={lead.slaStatus === "overdue" ? "bg-rose-500/[0.04]" : undefined}>
              <TableCell>
                <Checkbox checked={selected.has(lead.id)} onCheckedChange={() => onToggle(lead.id)} aria-label={lead.name} />
              </TableCell>
              <TableCell>
                <div className="font-medium leading-tight">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.phone}{lead.company ? ` · ${lead.company}` : ""}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{stageName(lead.stage)}</Badge>
                {lead.leadScore != null && <span className="ml-1 text-xs text-muted-foreground tabular-nums">{lead.leadScore}</span>}
              </TableCell>
              <TableCell className="max-w-[260px]">
                <div className="text-sm truncate" title={lead.aiNextAction ?? undefined}>
                  {lead.aiNextAction || <span className="text-muted-foreground">{t("crmInbox.noNextAction", "—")}</span>}
                </div>
                {lead.hasCallback && lead.callbackScheduled && (
                  <div className="text-[11px] text-sky-700 dark:text-sky-400 flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" />
                    {t("crmInbox.callback", "Callback {{when}}", { when: relativeTime(lead.callbackScheduled) })}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {lead.lastContactAt
                  ? <span title={lead.lastContactAt}>{relativeTime(lead.lastContactAt)}</span>
                  : <span className="text-muted-foreground">{t("crmInbox.never", "Never")}</span>}
                <div className="text-[11px] text-muted-foreground">{t("crmInbox.calls", "{{count}} calls", { count: lead.totalCalls })}</div>
              </TableCell>
              <TableCell><SlaBadge status={lead.slaStatus} dueAt={lead.slaDueAt} hours={lead.slaHours} /></TableCell>
              <TableCell>
                <AssigneeSelect
                  value={lead.assignedUserId}
                  assignees={assignees}
                  onChange={(userId) => onAssign(lead.id, userId)}
                  disabled={assigningId === lead.id}
                  testId={`assign-${lead.id}`}
                />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onOpenNotes(lead)} title={t("crmInbox.notes", "Notes")} data-testid={`notes-${lead.id}`}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
