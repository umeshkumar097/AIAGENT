import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  INTEGRATION_TIMEZONES,
  PROVIDER_META,
  integrationErrorMessage,
  invalidateIntegrations,
  providerPath,
  saveIntegrationConfig,
  type IntegrationOptionsResponse,
  type IntegrationProviderState,
} from "@/lib/integrations";

interface CalcomConfigProps {
  state: IntegrationProviderState | undefined;
  onSaved: () => void;
  onCancel: () => void;
}

export function CalcomConfig({ state, onSaved, onCancel }: CalcomConfigProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const apiKeySet = !!state?.config?.apiKeySet;

  const [apiKey, setApiKey] = useState("");
  const [eventTypeId, setEventTypeId] = useState<string>(state?.config?.eventTypeId ? String(state.config.eventTypeId) : "");
  const [timeZone, setTimeZone] = useState<string>(state?.config?.timeZone || "Asia/Kolkata");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEventTypeId(state?.config?.eventTypeId ? String(state.config.eventTypeId) : "");
    setTimeZone(state?.config?.timeZone || "Asia/Kolkata");
  }, [state?.config?.eventTypeId, state?.config?.timeZone]);

  // Event types can only be listed once a key is stored server-side.
  const optionsQuery = useQuery<IntegrationOptionsResponse>({
    queryKey: [providerPath("calcom", "/options")],
    enabled: apiKeySet,
    retry: false,
  });
  const eventTypes = optionsQuery.data?.eventTypes ?? [];
  const timezoneOptions = INTEGRATION_TIMEZONES.some((tz) => tz.value === timeZone)
    ? INTEGRATION_TIMEZONES
    : [{ value: timeZone, label: timeZone }, ...INTEGRATION_TIMEZONES];

  const handleSave = async (closeAfter: boolean) => {
    const trimmedKey = apiKey.trim();
    if (!apiKeySet && !trimmedKey) {
      toast({ title: t("integrations.providers.calcom.apiKeyRequired", "Enter your Cal.com API key"), variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const body: Record<string, unknown> = { timeZone };
      if (trimmedKey) body.apiKey = trimmedKey;
      if (eventTypeId) body.eventTypeId = Number.isNaN(Number(eventTypeId)) ? eventTypeId : Number(eventTypeId);
      const result = await saveIntegrationConfig("calcom", body);
      if (result.ok === false) {
        toast({
          title: t("integrations.providers.calcom.validationFailed", "Cal.com rejected the API key"),
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      setApiKey("");
      invalidateIntegrations();
      optionsQuery.refetch();
      toast({
        title: t("integrations.providers.saved", "Integration settings saved"),
        description: result.accountName
          ? t("integrations.providers.connectedAs", { defaultValue: "Connected as {{name}}", name: result.accountName })
          : undefined,
      });
      if (closeAfter) onSaved();
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

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="calcom-api-key">{t("integrations.providers.calcom.apiKey", "API key")}</Label>
        <Input
          id="calcom-api-key"
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={apiKeySet ? "********" : "cal_live_..."}
          data-testid="input-calcom-api-key"
        />
        <p className="text-xs text-muted-foreground">
          {apiKeySet
            ? t("integrations.providers.calcom.apiKeySaved", "A key is saved. Paste a new one to replace it.")
            : t("integrations.providers.calcom.apiKeyHint", "Create a key on the Cal.com developer page and paste it here.")}{" "}
          <a
            href={PROVIDER_META.calcom.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline"
          >
            {PROVIDER_META.calcom.docsLabel} <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>{t("integrations.providers.calcom.eventType", "Event type for bookings")}</Label>
          {apiKeySet && (
            <Button type="button" size="sm" variant="ghost" className="h-7 text-xs" onClick={() => optionsQuery.refetch()} disabled={optionsQuery.isFetching}>
              {optionsQuery.isFetching ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
              {t("common.refresh", "Refresh")}
            </Button>
          )}
        </div>
        {!apiKeySet ? (
          <p className="text-xs text-muted-foreground">
            {t("integrations.providers.calcom.saveKeyFirst", "Save your API key first, then pick an event type.")}
          </p>
        ) : optionsQuery.isError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {integrationErrorMessage(optionsQuery.error, t("integrations.providers.calcom.eventTypesFailed", "Could not load event types."))}
            </AlertDescription>
          </Alert>
        ) : (
          <Select value={eventTypeId} onValueChange={setEventTypeId}>
            <SelectTrigger data-testid="select-calcom-event-type">
              <SelectValue placeholder={optionsQuery.isLoading
                ? t("common.loading", "Loading...")
                : t("integrations.providers.calcom.selectEventType", "Select an event type")} />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((et) => (
                <SelectItem key={String(et.id)} value={String(et.id)}>
                  {et.title}{et.lengthInMinutes ? ` (${et.lengthInMinutes} min)` : ""}
                </SelectItem>
              ))}
              {eventTypes.length === 0 && !optionsQuery.isLoading && (
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  {t("integrations.providers.calcom.noEventTypes", "No event types found on this account.")}
                </div>
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>{t("integrations.providers.calcom.timeZone", "Booking time zone")}</Label>
        <Select value={timeZone} onValueChange={setTimeZone}>
          <SelectTrigger data-testid="select-calcom-timezone">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timezoneOptions.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {t("integrations.providers.calcom.timeZoneHint", "Appointment dates and times collected by your agents are interpreted in this zone.")}
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          {t("common.cancel", "Cancel")}
        </Button>
        {!apiKeySet && (
          <Button type="button" variant="secondary" onClick={() => handleSave(false)} disabled={saving || !apiKey.trim()} data-testid="button-calcom-save-key">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {t("integrations.providers.calcom.saveKey", "Save key & load event types")}
          </Button>
        )}
        <Button type="button" onClick={() => handleSave(true)} disabled={saving} data-testid="button-calcom-save">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t("common.save", "Save")}
        </Button>
      </div>
    </div>
  );
}
