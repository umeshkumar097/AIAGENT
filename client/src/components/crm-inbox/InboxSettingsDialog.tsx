/** Inbox settings: follow-up SLA hours per stage (0 = none) and round-robin auto-assign. */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SETTINGS_KEY, fetchSettings, invalidateInbox, saveSettings, stageLabel, type AutoAssignMode, type InboxSettings } from "@/lib/crm-inbox";

/** `stages`: the account's live `leads.stage` keys; settings keys are merged in so unused stages still show. */
interface Props { open: boolean; onOpenChange: (o: boolean) => void; stages: string[] }

const MAX_HOURS = 24 * 30;
const clampHours = (v: string) => Math.min(MAX_HOURS, Math.max(0, Math.floor(Number(v) || 0)));

export function InboxSettingsDialog({ open, onOpenChange, stages }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data, isLoading } = useQuery({ queryKey: SETTINGS_KEY, queryFn: fetchSettings, enabled: open });

  const [autoAssign, setAutoAssign] = useState<AutoAssignMode>("off");
  const [defaultHours, setDefaultHours] = useState(48);
  const [slaHours, setSlaHours] = useState<Record<string, number>>({});
  const [newStage, setNewStage] = useState("");

  useEffect(() => {
    if (!data) return;
    setAutoAssign(data.autoAssign);
    setDefaultHours(data.defaultSlaHours);
    setSlaHours({ ...data.slaHours });
  }, [data]);

  const closed = new Set(data?.closedStages ?? []);
  const stageKeys = Array.from(new Set([...stages, ...Object.keys(slaHours)])).filter(k => !closed.has(k));

  const save = useMutation({
    mutationFn: () => saveSettings({ autoAssign, defaultSlaHours: defaultHours, slaHours }),
    onSuccess: (saved: InboxSettings) => {
      invalidateInbox();
      toast({ title: t("crmInbox.settings.saved", "Inbox settings saved"), description: saved.autoAssign === "round_robin" ? t("crmInbox.settings.rrOn", "New leads will rotate across the team.") : undefined });
      onOpenChange(false);
    },
    onError: (e: Error) => toast({ title: t("crmInbox.settings.failed", "Could not save settings"), description: e.message, variant: "destructive" }),
  });

  const addStage = () => {
    const key = newStage.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_|_$/g, "");
    if (!key || key.length > 64) return;
    setSlaHours(prev => (key in prev ? prev : { ...prev, [key]: defaultHours }));
    setNewStage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" data-testid="inbox-settings-dialog">
        <DialogHeader>
          <DialogTitle>{t("crmInbox.settings.title", "Follow-up SLA & auto-assign")}</DialogTitle>
          <DialogDescription>{t("crmInbox.settings.desc", "A lead is overdue when nobody has touched it (note, call, stage change) for longer than its stage's SLA. 0 hours = no SLA.")}</DialogDescription>
        </DialogHeader>

        {isLoading ? <div className="py-8 flex justify-center"><Loader2 className="w-5 h-5 animate-spin" /></div> : (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs">{t("crmInbox.settings.autoAssign", "Auto-assign new leads")}</Label>
              <Select value={autoAssign} onValueChange={(v) => setAutoAssign(v as AutoAssignMode)}>
                <SelectTrigger data-testid="settings-auto-assign"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="off">{t("crmInbox.settings.autoOff", "Off — assign manually")}</SelectItem>
                  <SelectItem value="round_robin">{t("crmInbox.settings.autoRr", "Round-robin across active team members")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="sla-default" className="text-xs">{t("crmInbox.settings.defaultHours", "Default SLA (hours) for stages not listed")}</Label>
              <Input id="sla-default" type="number" min={0} max={MAX_HOURS} value={defaultHours} onChange={(e) => setDefaultHours(clampHours(e.target.value))} className="w-32" data-testid="settings-default-hours" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">{t("crmInbox.settings.perStage", "SLA per stage (hours)")}</Label>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {stageKeys.map(key => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-sm flex-1 truncate" title={key}>{stageLabel(key)}</span>
                    <Input
                      type="number" min={0} max={MAX_HOURS} className="w-20 h-8"
                      value={slaHours[key] ?? defaultHours}
                      placeholder={String(defaultHours)}
                      onChange={(e) => setSlaHours(prev => ({ ...prev, [key]: clampHours(e.target.value) }))}
                      data-testid={`settings-sla-${key}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input value={newStage} onChange={(e) => setNewStage(e.target.value)} placeholder={t("crmInbox.settings.addStage", "Add a stage key (e.g. contacted)")} className="h-8" maxLength={64} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addStage(); } }} data-testid="settings-add-stage" />
                <Button type="button" size="sm" variant="outline" onClick={addStage}><Plus className="w-4 h-4" /></Button>
              </div>
              {closed.size > 0 && <p className="text-[11px] text-muted-foreground">{t("crmInbox.settings.closedNote", "Closed stages ({{stages}}) never go overdue.", { stages: Array.from(closed).join(", ") })}</p>}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("common.cancel", "Cancel")}</Button>
          <Button onClick={() => save.mutate()} disabled={isLoading || save.isPending} data-testid="settings-save">
            {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("common.save", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
