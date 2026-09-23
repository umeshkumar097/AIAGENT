/** Sticky bar shown when rows are selected: assign all to one person, or unassign. */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, UserMinus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InboxAssignee } from "@/lib/crm-inbox";
import { AssigneeSelect } from "./AssigneeSelect";

interface Props {
  count: number;
  assignees: InboxAssignee[];
  pending: boolean;
  onAssign: (userId: string | null) => void;
  onClear: () => void;
}

export function BulkAssignBar({ count, assignees, pending, onAssign, onClear }: Props) {
  const { t } = useTranslation();
  const [target, setTarget] = useState<string | null>(null);
  if (count === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-primary/5 px-4 py-2" data-testid="bulk-assign-bar">
      <span className="text-sm font-medium flex items-center gap-1.5">
        <Users className="w-4 h-4" />
        {t("crmInbox.bulk.selected", "{{count}} selected", { count })}
      </span>
      <AssigneeSelect value={target} assignees={assignees} onChange={setTarget} hideNone className="h-8 w-[200px] text-xs" placeholder={t("crmInbox.bulk.pick", "Pick a teammate")} testId="bulk-assignee" />
      <Button size="sm" disabled={!target || pending} onClick={() => target && onAssign(target)} data-testid="bulk-assign-apply">
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("crmInbox.bulk.assign", "Assign")}
      </Button>
      <Button size="sm" variant="outline" disabled={pending} onClick={() => onAssign(null)} data-testid="bulk-unassign">
        <UserMinus className="w-4 h-4 mr-1" />
        {t("crmInbox.bulk.unassign", "Unassign")}
      </Button>
      <Button size="sm" variant="ghost" onClick={onClear} className="ml-auto" data-testid="bulk-clear">
        <X className="w-4 h-4 mr-1" />
        {t("common.clear", "Clear")}
      </Button>
    </div>
  );
}
