import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Plus, Trash2, Copy, Send, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  INTEGRATION_EVENT_GROUPS,
  MAX_WEBHOOK_TARGETS,
  PROVIDER_META,
  integrationErrorMessage,
  invalidateIntegrations,
  saveIntegrationConfig,
  testIntegration,
  type IntegrationProviderState,
  type WebhookTarget,
} from "@/lib/integrations";

interface WebhookProviderConfigProps {
  provider: "zapier" | "pabbly";
  state: IntegrationProviderState | undefined;
  onSaved: () => void;
  onCancel: () => void;
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function WebhookProviderConfig({ provider, state, onSaved, onCancel }: WebhookProviderConfigProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const meta = PROVIDER_META[provider];

  const initial = state?.config?.webhooks?.length ? state.config.webhooks : [{ url: "", events: [] }];
  const [targets, setTargets] = useState<WebhookTarget[]>(initial);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setTargets(state?.config?.webhooks?.length ? state.config.webhooks : [{ url: "", events: [] }]);
  }, [state?.config?.webhooks]);

  const inboundUrl = state?.config?.inboundUrl
    || (typeof window !== "undefined" ? `${window.location.origin}/api/external/trigger-call` : "/api/external/trigger-call");

  const updateTarget = (index: number, patch: Partial<WebhookTarget>) => {
    setTargets((prev) => prev.map((tg, i) => (i === index ? { ...tg, ...patch } : tg)));
  };

  const toggleEvent = (index: number, event: string, checked: boolean) => {
    setTargets((prev) => prev.map((tg, i) => {
      if (i !== index) return tg;
      const events = checked ? Array.from(new Set([...tg.events, event])) : tg.events.filter((e) => e !== event);
      return { ...tg, events };
    }));
  };

  const addTarget = () => {
    if (targets.length >= MAX_WEBHOOK_TARGETS) return;
    setTargets((prev) => [...prev, { url: "", events: [] }]);
    setOpenIndex(targets.length);
  };

  const removeTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const cleaned = () => targets
    .map((tg) => ({ url: tg.url.trim(), events: tg.events }))
    .filter((tg) => tg.url.length > 0);

  const validate = (): boolean => {
    const list = cleaned();
    const bad = list.find((tg) => !isHttpsUrl(tg.url));
    if (bad) {
      toast({ title: t("integrations.providers.webhook.invalidUrl", "Webhook URLs must start with https://"), description: bad.url, variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const result = await saveIntegrationConfig(provider, { webhooks: cleaned() });
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

  const handleSendTest = async () => {
    if (!validate()) return;
    setTesting(true);
    try {
      // Persist first so the server tests exactly what is on screen.
      await saveIntegrationConfig(provider, { webhooks: cleaned() });
      invalidateIntegrations();
      const result = await testIntegration(provider);
      const failed = result.results?.filter((r) => !r.ok) ?? [];
      if (result.ok && failed.length === 0) {
        toast({ title: t("integrations.providers.webhook.testSent", "Test payload delivered to every URL") });
      } else {
        toast({
          title: t("integrations.providers.webhook.testFailed", "Some webhooks did not accept the test"),
          description: result.error || failed.map((r) => `${r.url}: ${r.error || r.httpStatus || "failed"}`).join("\n"),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: t("integrations.providers.webhook.testFailed", "Some webhooks did not accept the test"),
        description: integrationErrorMessage(err, t("errors.generic", "Something went wrong")),
        variant: "destructive",
      });
    } finally {
      setTesting(false);
    }
  };

  const copyInbound = () => {
    navigator.clipboard.writeText(inboundUrl).then(() =>
      toast({ title: t("integrations.providers.webhook.inboundCopied", "Trigger URL copied") })
    );
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>{t("integrations.providers.webhook.outgoing", "Outgoing webhooks")}</Label>
          <span className="text-xs text-muted-foreground">{targets.length}/{MAX_WEBHOOK_TARGETS}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("integrations.providers.webhook.outgoingHint", { defaultValue: "Paste the catch-hook URL from {{provider}}. Leave every event unchecked to receive all events.", provider: meta.title })}{" "}
          <a href={meta.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline">
            {meta.docsLabel} <ExternalLink className="h-3 w-3" />
          </a>
        </p>

        <div className="space-y-2">
          {targets.map((target, index) => {
            const open = openIndex === index;
            return (
              <div key={index} className="rounded-md border bg-muted/20 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={target.url}
                    onChange={(e) => updateTarget(index, { url: e.target.value })}
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    className="font-mono text-xs"
                    data-testid={`input-${provider}-webhook-url-${index}`}
                  />
                  <Button type="button" size="icon" variant="ghost" onClick={() => setOpenIndex(open ? null : index)} aria-label={t("integrations.providers.webhook.events", "Events")}>
                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeTarget(index)} disabled={targets.length === 1 && !target.url} aria-label={t("common.delete", "Delete")}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {target.events.length === 0 ? (
                    <Badge variant="outline" className="text-[10px]">{t("integrations.providers.webhook.allEvents", "All events")}</Badge>
                  ) : target.events.map((ev) => (
                    <Badge key={ev} variant="secondary" className="text-[10px] font-mono">{ev}</Badge>
                  ))}
                </div>
                {open && (
                  <ScrollArea className="h-48 rounded border bg-background p-2">
                    <div className="space-y-3">
                      {INTEGRATION_EVENT_GROUPS.map((group) => (
                        <div key={group.labelKey}>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t(group.labelKey, group.fallback)}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {group.events.map((ev) => {
                              const id = `${provider}-${index}-${ev.value}`;
                              return (
                                <label key={ev.value} htmlFor={id} className="flex items-center gap-2 text-xs cursor-pointer">
                                  <Checkbox
                                    id={id}
                                    checked={target.events.includes(ev.value)}
                                    onCheckedChange={(checked) => toggleEvent(index, ev.value, checked === true)}
                                  />
                                  <span>{t(ev.labelKey, ev.fallback)}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            );
          })}
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addTarget} disabled={targets.length >= MAX_WEBHOOK_TARGETS}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          {t("integrations.providers.webhook.addUrl", "Add URL")}
        </Button>
      </div>

      <div className="rounded-md border bg-muted/40 p-3 space-y-2">
        <p className="text-xs font-medium text-foreground">
          {t("integrations.providers.webhook.inboundTitle", { defaultValue: "Trigger calls from {{provider}}", provider: meta.title })}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("integrations.providers.webhook.inboundHint", "Send a POST request to this URL with your API key as a Bearer token in the Authorization header and a JSON body of { \"agent_id\", \"phone\", \"name\" }.")}
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-background border rounded px-2 py-1 font-mono truncate" data-testid={`text-${provider}-inbound-url`}>{inboundUrl}</code>
          <Button type="button" size="icon" variant="ghost" onClick={copyInbound} aria-label={t("common.copy", "Copy")}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <button
          type="button"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => setLocation("/app/settings?tab=developer")}
        >
          {t("integrations.providers.webhook.manageApiKeys", "Manage API keys")}
        </button>
      </div>

      {state?.config?.signingSecret && (
        <div className="rounded-md border bg-muted/40 p-3 space-y-2">
          <p className="text-xs font-medium text-foreground">
            {t("integrations.providers.webhook.signingTitle", "Signing secret")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("integrations.providers.webhook.signingHint", "Every payload carries an X-Zonvo-Signature header: sha256=HMAC-SHA256(body) using this secret.")}
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-background border rounded px-2 py-1 font-mono truncate" data-testid={`text-${provider}-signing-secret`}>
              {state.config.signingSecret}
            </code>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(state.config.signingSecret ?? "").then(() =>
                toast({ title: t("integrations.providers.webhook.signingCopied", "Signing secret copied") })
              )}
              aria-label={t("common.copy", "Copy")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving || testing}>{t("common.cancel", "Cancel")}</Button>
        <Button type="button" variant="secondary" onClick={handleSendTest} disabled={saving || testing || cleaned().length === 0} data-testid={`button-${provider}-send-test`}>
          {testing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          {t("integrations.providers.webhook.sendTest", "Send test")}
        </Button>
        <Button type="button" onClick={handleSave} disabled={saving || testing} data-testid={`button-${provider}-save`}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t("common.save", "Save")}
        </Button>
      </div>
    </div>
  );
}
