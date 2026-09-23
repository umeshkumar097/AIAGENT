/**
 * Auto-renew row on the current-plan card: ON (mandate active / pending bank approval),
 * ON_HOLD (last charge failed, Cashfree retries) or OFF (offer to enable).
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cancelAutoRenew, mandateMethodLabel, startAutoRenewSetup } from "@/lib/cashfree";

export interface AutoRenewSubscription {
  autoRenew?: boolean | null;
  mandateStatus?: string | null;
  mandatePaymentMethod?: string | null;
  nextChargeAt?: string | null;
  currentPeriodEnd: string;
}

interface Props {
  subscription: AutoRenewSubscription;
}

type RowState = "on" | "pending" | "on_hold" | "off";

function stateOf(sub: AutoRenewSubscription): RowState {
  const status = (sub.mandateStatus || "").toUpperCase();
  if (status === "ON_HOLD") return "on_hold";
  if (status === "BANK_APPROVAL_PENDING") return "pending";
  if (sub.autoRenew && status === "ACTIVE") return "on";
  if (sub.autoRenew) return "on";
  return "off";
}

export function AutoRenewRow({ subscription }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const state = stateOf(subscription);
  const chargeDate = subscription.nextChargeAt || subscription.currentPeriodEnd;
  const chargeLabel = chargeDate ? format(new Date(chargeDate), "MMM dd, yyyy") : "—";
  const method = mandateMethodLabel(subscription.mandatePaymentMethod);

  const handleEnable = async () => {
    setBusy(true);
    try {
      await startAutoRenewSetup();
    } catch {
      // toast shown by the helper
    } finally {
      setBusy(false);
    }
  };

  const handleTurnOff = async () => {
    setBusy(true);
    try {
      const result = await cancelAutoRenew();
      queryClient.invalidateQueries({ queryKey: ["/api/user-subscription"] });
      toast({
        title: t("billing.autoRenew.turnedOff", "Auto-renew turned off"),
        description: t("billing.autoRenew.turnedOffDesc", "Your plan stays active until {{date}}. Renew manually before then to keep it.", {
          date: result.currentPeriodEnd ? format(new Date(result.currentPeriodEnd), "MMM dd, yyyy") : chargeLabel,
        }),
      });
      setConfirmOpen(false);
    } catch (error) {
      toast({ title: t("common.error", "Error"), description: error instanceof Error ? error.message : t("common.tryAgain", "Please try again."), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" data-testid="row-auto-renew">
      <div className="flex items-start gap-2 min-w-0">
        {state === "on_hold" ? (
          <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        ) : (
          <RefreshCw className={`h-4 w-4 mt-0.5 flex-shrink-0 ${state === "off" ? "text-slate-400" : "text-indigo-600 dark:text-indigo-400"}`} />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">{t("billing.autoRenew.label", "Auto-renew")}</span>
            {state === "on" && <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white" data-testid="badge-auto-renew-on">{t("billing.autoRenew.on", "ON")}</Badge>}
            {state === "pending" && <Badge variant="secondary" data-testid="badge-auto-renew-pending">{t("billing.autoRenew.pendingBadge", "Pending approval")}</Badge>}
            {state === "on_hold" && <Badge className="bg-amber-500 hover:bg-amber-500 text-white" data-testid="badge-auto-renew-hold">{t("billing.autoRenew.onHold", "On hold")}</Badge>}
            {state === "off" && <Badge variant="outline" data-testid="badge-auto-renew-off">{t("billing.autoRenew.off", "OFF")}</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {state === "on" && t("billing.autoRenew.renewsOn", "Renews automatically on {{date}} via {{method}}.", { date: chargeLabel, method })}
            {state === "pending" && t("billing.autoRenew.pendingBank", "Waiting for your bank to approve the mandate — we'll email you once it is active.")}
            {state === "on_hold" && t("billing.autoRenew.onHoldDesc", "Last renewal charge failed — Cashfree will retry; update your payment method or pay manually with Renew.")}
            {state === "off" && t("billing.autoRenew.offDesc", "Set up UPI AutoPay / card so your plan renews automatically. ₹1 verification, refunded. Cancel any time.")}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {state === "off" ? (
          <Button size="sm" variant="outline" onClick={handleEnable} disabled={busy} className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-950/40" data-testid="button-enable-auto-renew">
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            {t("billing.autoRenew.enable", "Enable auto-renew")}
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setConfirmOpen(true)} disabled={busy} className="text-muted-foreground" data-testid="button-turn-off-auto-renew">
            {t("billing.autoRenew.turnOff", "Turn off")}
          </Button>
        )}
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={(open) => !busy && setConfirmOpen(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("billing.autoRenew.confirmTitle", "Turn off auto-renew?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("billing.autoRenew.confirmDesc", "The mandate will be cancelled at Cashfree. Your current period stays active until {{date}}; after that you will need to renew manually.", { date: format(new Date(subscription.currentPeriodEnd), "MMM dd, yyyy") })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>{t("common.cancel", "Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); void handleTurnOff(); }} disabled={busy} className="bg-red-600 hover:bg-red-700" data-testid="button-confirm-turn-off">
              {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              {t("billing.autoRenew.turnOff", "Turn off")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AutoRenewRow;
