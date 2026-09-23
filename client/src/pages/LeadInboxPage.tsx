/**
 * Team inbox for leads — who owns each lead and which follow-ups are overdue.
 * Rendered inside CRMPage (view "inbox"); a dedicated /app/leads/inbox route can mount it standalone.
 */
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ASSIGNEES_KEY, assignLead, bulkAssign, fetchAssignees, fetchInbox, inboxQueryKey, invalidateInbox, stageLabel,
  type InboxFilter, type InboxLead, type InboxQuery,
} from "@/lib/crm-inbox";
import { InboxFilters } from "@/components/crm-inbox/InboxFilters";
import { InboxTable } from "@/components/crm-inbox/InboxTable";
import { BulkAssignBar } from "@/components/crm-inbox/BulkAssignBar";
import { NotesDrawer } from "@/components/crm-inbox/NotesDrawer";
import { InboxSettingsDialog } from "@/components/crm-inbox/InboxSettingsDialog";

const PAGE_SIZE = 25;
const EMPTY_COUNTS = { all: 0, mine: 0, unassigned: 0, overdue: 0 };

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(() => setV(value), ms); return () => clearTimeout(id); }, [value, ms]);
  return v;
}

export default function LeadInboxPage({ embedded = false }: { embedded?: boolean }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [filter, setFilter] = useState<InboxFilter>("mine");
  const [stage, setStage] = useState("all");
  const [q, setQ] = useState("");
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notesLead, setNotesLead] = useState<InboxLead | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const debouncedQ = useDebounced(q, 300);

  const query: InboxQuery = useMemo(() => ({ filter, stage, q: debouncedQ, limit: PAGE_SIZE, offset }), [filter, stage, debouncedQ, offset]);
  useEffect(() => { setOffset(0); setSelected(new Set()); }, [filter, stage, debouncedQ]);

  const inbox = useQuery({ queryKey: inboxQueryKey(query), queryFn: () => fetchInbox(query), placeholderData: (prev) => prev });
  const { data: assignees = [] } = useQuery({ queryKey: ASSIGNEES_KEY, queryFn: fetchAssignees });

  const leads = inbox.data?.leads ?? [];
  const counts = inbox.data?.counts ?? EMPTY_COUNTS;
  const stages = inbox.data?.stages ?? [];
  const total = inbox.data?.total ?? 0;

  const fail = (title: string) => (e: Error) => toast({ title, description: e.message, variant: "destructive" });

  const assign = useMutation({
    mutationFn: ({ leadId, userId }: { leadId: string; userId: string | null }) => assignLead(leadId, userId),
    onMutate: ({ leadId }) => setAssigningId(leadId),
    onSuccess: (lead) => {
      invalidateInbox();
      toast({ title: lead.assigneeName ? t("crmInbox.assignedTo", "Assigned to {{name}}", { name: lead.assigneeName }) : t("crmInbox.unassignedDone", "Lead unassigned") });
    },
    onError: fail(t("crmInbox.assignFailed", "Could not assign the lead")),
    onSettled: () => setAssigningId(null),
  });

  const bulk = useMutation({
    mutationFn: (userId: string | null) => bulkAssign(Array.from(selected), userId),
    onSuccess: (r) => {
      invalidateInbox();
      setSelected(new Set());
      toast({ title: r.assigneeName ? t("crmInbox.bulkAssigned", "{{count}} leads assigned to {{name}}", { count: r.updated, name: r.assigneeName }) : t("crmInbox.bulkUnassigned", "{{count}} leads unassigned", { count: r.updated }) });
    },
    onError: fail(t("crmInbox.bulkFailed", "Could not assign the selected leads")),
  });

  const toggle = (id: string) => setSelected(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const toggleAll = (ids: string[], checked: boolean) => setSelected(prev => { const next = new Set(prev); ids.forEach(id => (checked ? next.add(id) : next.delete(id))); return next; });

  const page = Math.floor(offset / PAGE_SIZE) + 1;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className={embedded ? "h-full overflow-y-auto p-6 space-y-4" : "p-6 space-y-4"} data-testid="lead-inbox-page">
      {!embedded && (
        <div>
          <h1 className="text-2xl font-semibold">{t("crmInbox.title", "Team inbox")}</h1>
          <p className="text-sm text-muted-foreground">{t("crmInbox.subtitle", "Who owns each lead, and which follow-ups are overdue.")}</p>
        </div>
      )}

      <InboxFilters
        filter={filter} counts={counts} onFilter={setFilter}
        stage={stage} stages={stages} onStage={setStage}
        q={q} onQ={setQ}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <BulkAssignBar count={selected.size} assignees={assignees} pending={bulk.isPending} onAssign={(userId) => bulk.mutate(userId)} onClear={() => setSelected(new Set())} />

      {inbox.isError && (
        <p className="text-sm text-destructive" data-testid="inbox-error">{t("crmInbox.loadFailed", "Could not load the inbox.")} {(inbox.error as Error).message}</p>
      )}

      <InboxTable
        leads={leads} assignees={assignees} selected={selected}
        onToggle={toggle} onToggleAll={toggleAll}
        onAssign={(leadId, userId) => assign.mutate({ leadId, userId })}
        onOpenNotes={setNotesLead} stageName={stageLabel}
        isLoading={inbox.isLoading} assigningId={assigningId}
      />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span data-testid="inbox-total">{t("crmInbox.total", "{{count}} leads", { count: total })}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => inbox.refetch()} title={t("common.refresh", "Refresh")} data-testid="inbox-refresh">
            <RefreshCw className={`w-4 h-4 ${inbox.isFetching ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))} data-testid="inbox-prev"><ChevronLeft className="w-4 h-4" /></Button>
          <span className="px-2 tabular-nums">{page} / {pages}</span>
          <Button variant="outline" size="icon" disabled={offset + PAGE_SIZE >= total} onClick={() => setOffset(offset + PAGE_SIZE)} data-testid="inbox-next"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <NotesDrawer lead={notesLead} onClose={() => setNotesLead(null)} />
      <InboxSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} stages={stages.map(s => s.stage)} />
    </div>
  );
}
