import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  integrationErrorMessage,
  invalidateIntegrations,
  providerPath,
  saveIntegrationConfig,
  type IntegrationOptionsResponse,
  type IntegrationProviderState,
} from "@/lib/integrations";

const NONE_VALUE = "__none__";

interface GhlConfigProps {
  state: IntegrationProviderState | undefined;
  onSaved: () => void;
  onCancel: () => void;
}

export function GhlConfig({ state, onSaved, onCancel }: GhlConfigProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [calendarId, setCalendarId] = useState<string>(state?.config?.calendarId || NONE_VALUE);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCalendarId(state?.config?.calendarId || NONE_VALUE);
  }, [state?.config?.calendarId]);

  const optionsQuery = useQuery<IntegrationOptionsResponse>({
    queryKey: [providerPath("gohighlevel", "/options")],
    enabled: !!state?.connected,
    retry: false,
  });
  const calendars = optionsQuery.data?.calendars ?? [];

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await saveIntegrationConfig("gohighlevel", {
        calendarId: calendarId === NONE_VALUE ? null : calendarId,
      });
      if (result.ok === false) {
        toast({ title: t("integrations.providers.saveFailed", "Could not save settings"), description: result.error, variant: "destructive" });
        return;
      }
      invalidateIntegrations();
      toast({ title: t("integrations.providers.saved", "Integration settings saved") });
      onSaved();
    } catch (err) {
      toast({
        title: t("integrations.providers.saveFailed", "Could not save settings"),
        description: integrationErrorMessage(err, t("errors.generic", "Something went wrong")),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!state?.connected) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {t("integrations.providers.ghl.connectFirst", "Connect your GoHighLevel location first, then choose the calendar used for appointments.")}
          </AlertDescription>
        </Alert>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>{t("common.close", "Close")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.config?.locationId && (
        <p className="text-xs text-muted-foreground">
          {t("integrations.providers.ghl.location", "Location")}: <span className="font-mono">{state.config.locationId}</span>
        </p>
      )}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>{t("integrations.providers.ghl.calendar", "Calendar for appointments")}</Label>
          <Button type="button" size="sm" variant="ghost" className="h-7 text-xs" onClick={() => optionsQuery.refetch()} disabled={optionsQuery.isFetching}>
            {optionsQuery.isFetching ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
            {t("common.refresh", "Refresh")}
          </Button>
        </div>
        {optionsQuery.isError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {integrationErrorMessage(optionsQuery.error, t("integrations.providers.ghl.calendarsFailed", "Could not load calendars."))}
            </AlertDescription>
          </Alert>
        ) : (
          <Select value={calendarId} onValueChange={setCalendarId}>
            <SelectTrigger data-testid="select-ghl-calendar">
              <SelectValue placeholder={optionsQuery.isLoading ? t("common.loading", "Loading...") : undefined} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE_VALUE}>
                {t("integrations.providers.ghl.noCalendar", "Do not create appointments")}
              </SelectItem>
              {calendars.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="text-xs text-muted-foreground">
          {t("integrations.providers.ghl.calendarHint", "Contacts and call notes sync regardless. Appointments booked by your agents are added to this calendar.")}
        </p>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>{t("common.cancel", "Cancel")}</Button>
        <Button type="button" onClick={handleSave} disabled={saving} data-testid="button-ghl-save">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t("common.save", "Save")}
        </Button>
      </div>
    </div>
  );
}
