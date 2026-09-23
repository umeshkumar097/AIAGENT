/**
 * Payment result — "Step 2: enable auto-renew" offered after a paid plan order that was placed
 * with the auto-renew toggle on. Starts the Cashfree mandate flow (₹1 verification, refunded).
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Loader2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatInr, startAutoRenewSetup } from "@/lib/cashfree";

interface Props {
  amount: number | null;
  billingPeriod: "monthly" | "yearly" | null;
  planName: string | null;
}

interface SubscriptionRow { currentPeriodEnd?: string | null }

export function AutoRenewSetupCard({ amount, billingPeriod, planName }: Props) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [busy, setBusy] = useState(false);
  const { data: subscription } = useQuery<SubscriptionRow | null>({ queryKey: ["/api/user-subscription"] });

  const nextCharge = subscription?.currentPeriodEnd ? format(new Date(subscription.currentPeriodEnd), "MMM dd, yyyy") : null;
  const period = billingPeriod === "yearly" ? t("billing.cashfree.year", "year") : t("billing.cashfree.month", "month");

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

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-4">
      <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-indigo-200/60 dark:border-indigo-700/40 shadow-xl" data-testid="card-auto-renew-setup">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="space-y-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{t("billing.autoRenew.stepTwo", "Step 2")}</p>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t("billing.autoRenew.setupTitle", "Enable auto-renew")}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("billing.autoRenew.setupDesc", "{{plan}} will renew at {{amount}}/{{period}}{{next}}. Authorise once with UPI AutoPay, card or eNACH — ₹1 verification, refunded. Cancel any time from Billing.", {
                plan: planName || t("payment.plan", "Plan"),
                amount: amount != null ? formatInr(amount) : "",
                period,
                next: nextCharge ? t("billing.autoRenew.setupNext", ", first charge on {{date}}", { date: nextCharge }) : "",
              })}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" onClick={handleEnable} disabled={busy} data-testid="button-setup-auto-renew">
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            {t("billing.autoRenew.enable", "Enable auto-renew")}
          </Button>
          <Button variant="ghost" className="flex-1" onClick={() => navigate("/app/billing")} disabled={busy} data-testid="button-skip-auto-renew">
            {t("billing.autoRenew.skip", "Skip for now")}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export default AutoRenewSetupCard;
