/**
 * Payment result — mandate return (/app/payment-result?gateway=cashfree&subscription_id=zvsub_…).
 * Polls GET /api/cashfree/subscriptions/:id/status every 2.5 s for up to 60 s.
 */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowLeft, CheckCircle2, Clock, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";
import { fetchAutoRenewStatus, formatInr, mandateMethodLabel, startAutoRenewSetup, type AutoRenewStatusResponse } from "@/lib/cashfree";

type ViewState = "checking" | "active" | "pending" | "unconfirmed" | "failed";

const POLL_INTERVAL_MS = 2500;
const POLL_MAX_MS = 60000;
const FAILED_STATUSES = new Set(["CANCELLED", "CUSTOMER_CANCELLED", "EXPIRED", "LINK_EXPIRED", "COMPLETED"]);

function classify(status: string): ViewState | null {
  const s = status.toUpperCase();
  if (s === "ACTIVE" || s === "ON_HOLD") return "active";
  if (s === "BANK_APPROVAL_PENDING") return "pending";
  if (FAILED_STATUSES.has(s)) return "failed";
  return null;
}

function Bubble({ state }: { state: ViewState }) {
  const cls = "h-28 w-28 rounded-full flex items-center justify-center shadow-2xl";
  if (state === "checking") return <div className={`${cls} bg-gradient-to-br from-blue-400 to-indigo-600 shadow-blue-500/30`}><Loader2 className="h-14 w-14 text-white animate-spin" /></div>;
  if (state === "active") return <div className={`${cls} bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30`}><CheckCircle2 className="h-14 w-14 text-white" strokeWidth={2.5} /></div>;
  if (state === "failed") return <div className={`${cls} bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30`}><XCircle className="h-14 w-14 text-white" strokeWidth={2.5} /></div>;
  return <div className={`${cls} bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30`}><Clock className="h-14 w-14 text-white" /></div>;
}

export function AutoRenewResultView({ subscriptionId }: { subscriptionId: string }) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [state, setState] = useState<ViewState>("checking");
  const [result, setResult] = useState<AutoRenewStatusResponse | null>(null);
  const [pollTick, setPollTick] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      try {
        const status = await fetchAutoRenewStatus(subscriptionId);
        if (!active) return;
        setResult(status);
        const next = classify(status.status);
        if (next) {
          setState(next);
          queryClient.invalidateQueries({ queryKey: ["/api/user-subscription"] });
          return;
        }
      } catch (error) {
        console.error("Mandate verification error:", error);
        if (!active) return;
      }
      if (Date.now() - startedAt >= POLL_MAX_MS) {
        setState("unconfirmed");
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    setState("checking");
    poll();
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [subscriptionId, pollTick]);

  const handleRetry = async () => {
    setBusy(true);
    try {
      await startAutoRenewSetup();
    } catch {
      // toast shown by the helper
    } finally {
      setBusy(false);
    }
  };

  const title = {
    checking: t("billing.autoRenew.confirming", "Confirming your mandate…"),
    active: t("billing.autoRenew.enabledTitle", "Auto-renew enabled"),
    pending: t("billing.autoRenew.pendingTitle", "Pending bank approval"),
    unconfirmed: t("billing.autoRenew.unconfirmedTitle", "Not confirmed yet"),
    failed: t("billing.autoRenew.failedTitle", "Auto-renew not set up"),
  }[state];

  const nextCharge = result?.nextChargeAt ? format(new Date(result.nextChargeAt), "MMM dd, yyyy") : null;
  const description = {
    checking: t("billing.autoRenew.confirmingDesc", "We are checking the mandate status with Cashfree. This usually takes a few seconds."),
    active: t("billing.autoRenew.enabledDesc", "Your {{plan}} plan will renew automatically via {{method}}{{next}}. You can turn this off any time from Billing.", {
      plan: result?.planName || "",
      method: mandateMethodLabel(result?.paymentMethod),
      next: nextCharge ? t("billing.autoRenew.enabledNext", " — next charge on {{date}}", { date: nextCharge }) : "",
    }),
    pending: t("billing.autoRenew.pendingDesc", "Your bank is still approving the mandate. We'll email you as soon as it is active — nothing else to do."),
    unconfirmed: t("billing.autoRenew.unconfirmedDesc", "Cashfree has not confirmed the mandate yet. If you completed the authorisation, it will show up shortly."),
    failed: t("billing.autoRenew.failedDesc", "The mandate was cancelled or expired before it could be authorised. Your paid plan is unaffected — you can try again."),
  }[state];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl" data-testid="card-auto-renew-result">
          <div className="flex flex-col items-center text-center space-y-6">
            <Bubble state={state} />
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100" data-testid="text-auto-renew-result-title">{title}</h1>
              <p className="text-slate-600 dark:text-slate-400" data-testid="text-auto-renew-result-description">{description}</p>
            </div>

            {result && state !== "checking" && (
              <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-2 text-sm">
                {result.planName && (
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">{t("payment.plan", "Plan")}</span><span className="font-medium text-indigo-600 dark:text-indigo-400">{result.planName}{result.billingPeriod ? ` (${result.billingPeriod})` : ""}</span></div>
                )}
                {result.amount != null && (
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">{t("billing.autoRenew.chargePerPeriod", "Charge per period")}</span><span className="font-medium text-slate-700 dark:text-slate-300">{formatInr(result.amount)}</span></div>
                )}
                {result.paymentMethod && (
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">{t("payment.paymentMethod", "Payment method")}</span><span className="font-medium text-slate-700 dark:text-slate-300">{mandateMethodLabel(result.paymentMethod)}</span></div>
                )}
                {nextCharge && (
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">{t("billing.autoRenew.nextCharge", "Next charge")}</span><span className="font-medium text-slate-700 dark:text-slate-300">{nextCharge}</span></div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{t("billing.autoRenew.mandateId", "Mandate ID")}</span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400 truncate max-w-[180px]">{subscriptionId}</span>
                </div>
              </div>
            )}

            <div className="w-full space-y-3 pt-2">
              {state === "unconfirmed" && (
                <Button variant="outline" className="w-full" onClick={() => setPollTick((n) => n + 1)} data-testid="button-mandate-check-again">
                  <RefreshCw className="h-4 w-4 mr-2" />{t("billing.cashfree.checkAgain", "Check again")}
                </Button>
              )}
              {state === "failed" && (
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" onClick={handleRetry} disabled={busy} data-testid="button-mandate-try-again">
                  {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                  {t("payment.tryAgain", "Try again")}
                </Button>
              )}
              <Button
                variant={state === "active" ? "default" : "outline"}
                className={state === "active" ? "w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" : "w-full"}
                onClick={() => navigate("/app/billing")}
                data-testid="button-mandate-return-billing"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />{t("payment.returnToBilling", "Return to Billing")}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default AutoRenewResultView;
