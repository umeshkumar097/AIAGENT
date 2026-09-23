import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { PROVIDER_META, type IntegrationProviderKey, type IntegrationProviderState } from "@/lib/integrations";
import { CalcomConfig } from "./CalcomConfig";
import { GhlConfig } from "./GhlConfig";
import { WebhookProviderConfig } from "./WebhookProviderConfig";

interface IntegrationConfigDialogProps {
  provider: IntegrationProviderKey | null;
  state: IntegrationProviderState | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Re-run the OAuth flow (used by the CRM providers that have no extra settings). */
  onReconnect?: (provider: IntegrationProviderKey) => void;
}

export function IntegrationConfigDialog({ provider, state, open, onOpenChange, onReconnect }: IntegrationConfigDialogProps) {
  const { t } = useTranslation();
  const meta = provider ? PROVIDER_META[provider] : null;
  const close = () => onOpenChange(false);

  const descriptions: Record<IntegrationProviderKey, string> = {
    calcom: t("integrations.providers.calcom.dialogDescription", "Appointments booked by your agents are created as Cal.com bookings."),
    gohighlevel: t("integrations.providers.ghl.dialogDescription", "Leads, call notes and appointments are pushed to your GoHighLevel location."),
    zapier: t("integrations.providers.webhook.dialogDescriptionZapier", "Forward call, lead and appointment events to your Zaps."),
    pabbly: t("integrations.providers.webhook.dialogDescriptionPabbly", "Forward call, lead and appointment events to your Pabbly workflows."),
    zoho: t("integrations.providers.oauthOnly.dialogDescriptionZoho", "Leads, notes and appointment events sync to Zoho CRM automatically."),
    salesforce: t("integrations.providers.oauthOnly.dialogDescriptionSalesforce", "Leads, tasks and events sync to your Salesforce org automatically."),
  };

  const renderBody = () => {
    if (!provider) return null;
    switch (provider) {
      case "calcom":
        return <CalcomConfig state={state} onSaved={close} onCancel={close} />;
      case "gohighlevel":
        return <GhlConfig state={state} onSaved={close} onCancel={close} />;
      case "zapier":
      case "pabbly":
        return <WebhookProviderConfig provider={provider} state={state} onSaved={close} onCancel={close} />;
      case "zoho":
      case "salesforce":
        return (
          <div className="space-y-4">
            <dl className="text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t("integrations.providers.account", "Account")}</dt>
                <dd className="font-medium truncate" title={state?.accountName ?? undefined}>{state?.accountName || "-"}</dd>
              </div>
              {state?.externalAccountId && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("integrations.providers.accountId", "Account ID")}</dt>
                  <dd className="font-mono text-xs truncate" title={state.externalAccountId}>{state.externalAccountId}</dd>
                </div>
              )}
              {state?.config?.instanceUrl && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("integrations.providers.instanceUrl", "Instance")}</dt>
                  <dd className="font-mono text-xs truncate" title={state.config.instanceUrl}>{state.config.instanceUrl}</dd>
                </div>
              )}
              {state?.lastError && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("integrations.providers.lastError", "Last error")}</dt>
                  <dd className="text-destructive text-xs break-words text-right">{state.lastError}</dd>
                </div>
              )}
            </dl>
            <p className="text-xs text-muted-foreground">
              {t("integrations.providers.oauthOnly.noSettings", "This integration has no extra settings. If syncing stops working, reconnect to refresh the authorization.")}
            </p>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={close}>{t("common.close", "Close")}</Button>
              {onReconnect && (
                <Button type="button" onClick={() => { close(); onReconnect(provider); }} data-testid={`button-${provider}-reconnect`}>
                  {t("integrations.providers.reconnect", "Reconnect")}
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("integrations.providers.configureTitle", { defaultValue: "Configure {{provider}}", provider: meta?.title ?? "" })}
          </DialogTitle>
          <DialogDescription>
            {provider ? descriptions[provider] : null}
            {meta && (
              <>
                {" "}
                <a href={meta.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline">
                  {meta.docsLabel} <ExternalLink className="h-3 w-3" />
                </a>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        {renderBody()}
      </DialogContent>
    </Dialog>
  );
}
