import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Settings2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PROVIDER_META, type IntegrationProviderKey } from "@/lib/integrations";

interface DisconnectDialogProps {
  provider: IntegrationProviderKey | null;
  pending: boolean;
  onConfirm: (provider: IntegrationProviderKey) => void;
  onClose: () => void;
}

/** "Disconnect <Provider>?" confirmation. */
export function IntegrationDisconnectDialog({ provider, pending, onConfirm, onClose }: DisconnectDialogProps) {
  const { t } = useTranslation();
  const meta = provider ? PROVIDER_META[provider] : null;
  return (
    <AlertDialog open={provider !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("integrations.providers.disconnectTitle", { defaultValue: "Disconnect {{provider}}?", provider: meta?.title ?? "" })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("integrations.providers.disconnectDescription", "Syncing stops immediately. Data already pushed to the other system is kept. You can reconnect at any time.")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel", "Cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => { e.preventDefault(); if (provider) onConfirm(provider); }}
            data-testid="button-confirm-disconnect-integration"
          >
            {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {t("integrations.providers.actions.disconnect", "Disconnect")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface NotConfiguredDialogProps {
  provider: IntegrationProviderKey | null;
  isAdmin: boolean;
  onClose: () => void;
}

/** Shown when an OAuth provider's admin app keys are missing (GET /auth → 503 or configured:false). */
export function IntegrationNotConfiguredDialog({ provider, isAdmin, onClose }: NotConfiguredDialogProps) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const meta = provider ? PROVIDER_META[provider] : null;
  return (
    <Dialog open={provider !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("integrations.providers.notConfiguredTitle", { defaultValue: "{{provider}} is not set up yet", provider: meta?.title ?? "" })}
          </DialogTitle>
          <DialogDescription>
            {t("integrations.providers.notConfiguredDescription", { defaultValue: "Your admin needs to add the {{provider}} app keys before users can connect.", provider: meta?.title ?? "" })}
          </DialogDescription>
        </DialogHeader>
        {meta && (
          <p className="text-xs text-muted-foreground">
            {t("integrations.providers.notConfiguredHint", "The keys come from the provider's developer console:")}{" "}
            <a href={meta.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline">
              {meta.docsLabel} <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t("common.close", "Close")}</Button>
          {isAdmin && (
            <Button onClick={() => setLocation("/admin?tab=settings")} data-testid="button-open-admin-settings">
              <Settings2 className="w-4 h-4 mr-2" />
              {t("integrations.providers.openAdminSettings", "Open admin settings")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
