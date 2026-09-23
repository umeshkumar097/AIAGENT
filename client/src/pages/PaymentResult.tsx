import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Crown, ArrowLeft, Sparkles, RefreshCw, Clock, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";
import { useTranslation } from "react-i18next";
import { fetchCashfreeOrderStatus, formatInr, type CashfreeOrderStatusResponse } from "@/lib/cashfree";
import { downloadInvoicePdf } from "@/lib/invoices";
import { AutoRenewSetupCard } from "@/components/billing/AutoRenewSetupCard";
import { AutoRenewResultView } from "@/components/billing/AutoRenewResultView";

type PaymentStatus = "success" | "failure" | "processing" | "cancelled" | "unverified";

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_MS = 60000;

const CheckmarkAnimation = () => (
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }} className="relative">
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
      <CheckCircle2 className="h-16 w-16 text-white" strokeWidth={2.5} />
    </motion.div>
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.5, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 1, delay: 0.4, repeat: 0 }} className="absolute inset-0 rounded-full bg-emerald-400" />
  </motion.div>
);

const FailureAnimation = () => (
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }} className="relative">
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="h-32 w-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
      <XCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
    </motion.div>
  </motion.div>
);

const ProcessingAnimation = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
    <Loader2 className="h-16 w-16 text-white animate-spin" />
  </motion.div>
);

const UnverifiedAnimation = () => (
  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
    <Clock className="h-16 w-16 text-white" />
  </motion.div>
);

const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    initial={{ y: -20, x, opacity: 1, scale: 1 }}
    animate={{ y: 400, opacity: 0, scale: 0, rotate: 360 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
    className="absolute top-0 w-3 h-3 rounded-full"
    style={{ backgroundColor: color, left: `${x}%` }}
  />
);

const CONFETTI_COLORS = ["#10b981", "#8b5cf6", "#f59e0b", "#3b82f6", "#ec4899"];

function invalidateBillingQueries() {
  queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
  queryClient.invalidateQueries({ queryKey: ["/api/user-subscription"] });
  queryClient.invalidateQueries({ queryKey: ["/api/credit-transactions"] });
  queryClient.invalidateQueries({ queryKey: ["/api/transactions/history"] });
  queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
  queryClient.invalidateQueries({ queryKey: ["/api/phone-number/subscriptions"] });
  queryClient.invalidateQueries({ queryKey: ["/api/plivo/phone-numbers"] });
}

function classifyOrder(order: CashfreeOrderStatusResponse): PaymentStatus {
  // Paid but provisioning gave up: shown as a failure that support resolves (never a retry / second charge)
  if (order.transactionStatus === "fulfilment_failed") return "failure";
  if (order.status === "PAID" || order.transactionStatus === "completed") return "success";
  if (order.paymentStatus === "USER_DROPPED" || order.paymentStatus === "CANCELLED") return "cancelled";
  if (order.status === "EXPIRED" || order.status === "TERMINATED" || order.status === "TERMINATION_REQUESTED" || order.status === "FAILED") return "failure";
  if (order.paymentStatus === "FAILED" || order.paymentStatus === "VOID" || order.transactionStatus === "failed") return "failure";
  return "processing";
}

export default function PaymentResult() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<PaymentStatus>("processing");
  const [order, setOrder] = useState<CashfreeOrderStatusResponse | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [mandateId, setMandateId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [pollTick, setPollTick] = useState(0);
  const confettiRef = useRef(Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  })));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gateway = params.get("gateway");
    const id = params.get("order_id");
    const subscriptionId = params.get("subscription_id");
    const cancelled = params.get("canceled") === "true" || params.get("cancelled") === "true";

    if (cancelled) {
      setStatus("cancelled");
      return;
    }
    if (gateway === "cashfree" && subscriptionId && /^zvsub_[a-f0-9]{12}$/.test(subscriptionId)) {
      // Mandate (auto-renew) return — handled by AutoRenewResultView, no order to poll
      setMandateId(subscriptionId);
      return;
    }
    if (gateway !== "cashfree" || !id) {
      // Nothing verifiable on the server — never show success from URL params alone
      setStatus("unverified");
      return;
    }
    setOrderId(id);

    let active = true;
    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      try {
        const result = await fetchCashfreeOrderStatus(id);
        if (!active) return;
        setOrder(result);
        const next = classifyOrder(result);
        if (next === "success") {
          setStatus("success");
          setShowConfetti(true);
          invalidateBillingQueries();
          return;
        }
        if (next !== "processing") {
          setStatus(next);
          return;
        }
        if (Date.now() - startedAt >= POLL_MAX_MS) {
          setStatus("unverified");
          return;
        }
        setStatus("processing");
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (error) {
        console.error("Payment verification error:", error);
        if (!active) return;
        if (Date.now() - startedAt >= POLL_MAX_MS) {
          setStatus("unverified");
          return;
        }
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [pollTick]);

  const isPlan = order?.type === "plan";
  const isPhone = order?.type === "phone_number";
  const isFulfilmentFailed = order?.transactionStatus === "fulfilment_failed";
  const offerAutoRenew = status === "success" && isPlan && !!order?.autoRenewRequested && !order?.autoRenewActive;

  if (mandateId) {
    return <AutoRenewResultView subscriptionId={mandateId} />;
  }

  const getTitle = () => {
    switch (status) {
      case "success":
        if (isPlan) return t("payment.subscriptionSuccess", "Plan activated!");
        if (isPhone) return t("billing.cashfree.phoneNumberSuccess", "Phone number activated!");
        return t("payment.creditsSuccess", "Minutes added!");
      case "failure":
        if (isFulfilmentFailed) return t("billing.cashfree.fulfilmentFailed", "Purchase needs attention");
        return t("payment.failed", "Payment failed");
      case "cancelled":
        return t("payment.cancelled", "Payment cancelled");
      case "processing":
        return t("billing.cashfree.confirming", "Confirming your payment…");
      case "unverified":
      default:
        return t("payment.unverified", "Payment not confirmed yet");
    }
  };

  const getDescription = () => {
    switch (status) {
      case "success":
        if (isPlan) {
          return order?.planName
            ? `${t("payment.welcomeToPlan", "Welcome to")} ${order.planName}! ${t("payment.subscriptionActive", "Your plan is now active.")}`
            : t("payment.subscriptionActiveGeneric", "Your plan has been activated successfully.");
        }
        if (isPhone) {
          return order?.phoneNumber
            ? t("billing.cashfree.phoneNumberSuccessDesc", "{{number}} is now active on your account.", { number: order.phoneNumber })
            : t("billing.cashfree.phoneNumberSuccessGeneric", "Your phone number is being provisioned and will appear shortly.");
        }
        return order?.credits
          ? `${order.credits.toLocaleString()} ${t("payment.creditsAdded", "minutes have been added to your account.")}`
          : t("payment.creditsAddedGeneric", "Your minutes have been added to your account.");
      case "failure":
        if (isFulfilmentFailed) {
          return t("billing.cashfree.fulfilmentFailedDescription", "Your payment was received, but we could not activate your purchase automatically. Our support team has been notified and will activate it or refund you shortly. Please do not pay again.");
        }
        return t("payment.failedDescription", "We couldn't process your payment. Please try again or use a different payment method.");
      case "cancelled":
        return t("payment.cancelledDescription", "You cancelled the payment. No charges have been made to your account.");
      case "processing":
        return t("billing.cashfree.confirmingDesc", "We are verifying your payment with Cashfree. This usually takes a few seconds.");
      case "unverified":
      default:
        return t("payment.unverifiedDescription", "We could not confirm this payment yet. If you were charged, your purchase will be applied once the payment is confirmed.");
    }
  };

  const handleDownloadInvoice = async () => {
    if (!order?.invoiceId) return;
    setDownloading(true);
    try {
      await downloadInvoicePdf(order.invoiceId);
    } finally {
      setDownloading(false);
    }
  };

  const retryPath = isPlan ? "/app/billing?tab=plans" : isPhone ? "/app/billing?tab=numbers" : "/app/billing?tab=packs";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showConfetti && confettiRef.current.map((p) => <ConfettiParticle key={p.id} delay={p.delay} x={p.x} color={p.color} />)}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <AnimatePresence mode="wait">
              {status === "processing" && <ProcessingAnimation key="processing" />}
              {status === "success" && <CheckmarkAnimation key="success" />}
              {(status === "failure" || status === "cancelled") && <FailureAnimation key="failure" />}
              {status === "unverified" && <UnverifiedAnimation key="unverified" />}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100" data-testid="text-payment-result-title">{getTitle()}</h1>
              <p className="text-slate-600 dark:text-slate-400" data-testid="text-payment-result-description">{getDescription()}</p>
            </motion.div>

            {order && status !== "processing" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">{t("payment.paymentMethod", "Payment method")}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300" data-testid="text-payment-gateway">
                    Cashfree{order.paymentMethod ? ` · ${order.paymentMethod.toUpperCase()}` : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">{t("payment.type", "Type")}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1" data-testid="text-payment-type">
                    {isPlan ? (
                      <><Crown className="h-4 w-4 text-indigo-500" />{t("payment.subscription", "Plan")}{order.billingPeriod ? ` (${order.billingPeriod})` : ""}</>
                    ) : isPhone ? (
                      <><Phone className="h-4 w-4 text-indigo-500" />{t("billing.cashfree.phoneNumberRental", "Phone number")}</>
                    ) : (
                      <><Sparkles className="h-4 w-4 text-amber-500" />{t("payment.creditPurchase", "Minutes")}</>
                    )}
                  </span>
                </div>
                {order.amount != null && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">{t("payment.amount", "Amount")}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300" data-testid="text-payment-amount">{formatInr(order.amount)}</span>
                  </div>
                )}
                {order.credits ? (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">{t("payment.credits", "Minutes")}</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400" data-testid="text-payment-credits">+{order.credits.toLocaleString()}</span>
                  </div>
                ) : null}
                {order.planName && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">{t("payment.plan", "Plan")}</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400" data-testid="text-payment-plan">{order.planName}</span>
                  </div>
                )}
                {order.phoneNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">{t("billing.cashfree.phoneNumber", "Number")}</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{order.phoneNumber}</span>
                  </div>
                )}
                {orderId && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">{t("billing.cashfree.orderId", "Order ID")}</span>
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400 truncate max-w-[180px]" data-testid="text-transaction-id">{orderId}</span>
                  </div>
                )}
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full space-y-3 pt-2">
              {status === "success" && (
                order?.invoiceId ? (
                  <Button variant="outline" className="w-full" onClick={handleDownloadInvoice} disabled={downloading} data-testid="button-download-invoice">
                    {downloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
                    {t("billing.cashfree.downloadInvoice", "Download invoice")}
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">{t("billing.cashfree.invoiceEmailed", "Your GST invoice will be emailed to you shortly.")}</p>
                )
              )}
              {(status === "failure" || status === "cancelled") && !isFulfilmentFailed && (
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" onClick={() => navigate(retryPath)} data-testid="button-try-again">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t("payment.tryAgain", "Try again")}
                </Button>
              )}
              {status === "unverified" && orderId && (
                <Button variant="outline" className="w-full" onClick={() => { setStatus("processing"); setPollTick((n) => n + 1); }} data-testid="button-check-again">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t("billing.cashfree.checkAgain", "Check again")}
                </Button>
              )}
              <Button
                variant={status === "success" ? "default" : "outline"}
                className={status === "success" ? "w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" : "w-full"}
                onClick={() => navigate("/app/billing")}
                data-testid="button-return-billing"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("payment.returnToBilling", "Return to Billing")}
              </Button>
            </motion.div>
          </div>
        </Card>
        {offerAutoRenew && order && <AutoRenewSetupCard amount={order.amount} billingPeriod={order.billingPeriod} planName={order.planName} />}
      </motion.div>
    </div>
  );
}
