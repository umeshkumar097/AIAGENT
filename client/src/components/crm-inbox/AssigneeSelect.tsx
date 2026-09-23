/** Assign-to dropdown: account owner + active team members, or "Unassigned". */
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InboxAssignee } from "@/lib/crm-inbox";

const NONE = "__unassigned__";

interface Props {
  value: string | null;
  assignees: InboxAssignee[];
  onChange: (userId: string | null) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  /** When true, hide the "Unassigned" option (used for bulk assign where "nobody" is a separate action). */
  hideNone?: boolean;
  testId?: string;
}

export function AssigneeSelect({ value, assignees, onChange, disabled, className, placeholder, hideNone, testId }: Props) {
  const { t } = useTranslation();
  const known = value && assignees.some(a => a.id === value);
  return (
    <Select
      value={value ? (known ? value : NONE) : NONE}
      onValueChange={(v) => onChange(v === NONE ? null : v)}
      disabled={disabled}
    >
      <SelectTrigger className={className ?? "h-8 w-[170px] text-xs"} data-testid={testId ?? "select-assignee"}>
        <SelectValue placeholder={placeholder ?? t("crmInbox.unassigned", "Unassigned")} />
      </SelectTrigger>
      <SelectContent>
        {!hideNone && <SelectItem value={NONE}>{t("crmInbox.unassigned", "Unassigned")}</SelectItem>}
        {assignees.map(a => (
          <SelectItem key={a.id} value={a.id}>
            {a.name}{a.kind === "owner" ? ` · ${t("crmInbox.owner", "owner")}` : ""}
          </SelectItem>
        ))}
        {value && !known && <SelectItem value={value} disabled>{t("crmInbox.formerMember", "Former member")}</SelectItem>}
      </SelectContent>
    </Select>
  );
}
