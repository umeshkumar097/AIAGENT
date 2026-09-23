/**
 * Checkout — /app/checkout?type=plan&planId=&period= | type=credits&packageId= | type=phone_number&phoneNumber=&country=&numberType=
 * Order summary + billing details (saved to the user) + server-side GST quote + Cashfree one-time payment.
 * Plans can opt into auto-renew; the mandate itself is set up on the payment-result page after this payment.
 */
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearch } from "wouter";
import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { fetchCheckoutQuote, startCashfreeCheckout, PAYMENT_GATEWAY_QUERY_KEY, type CashfreePublicConfig, type CheckoutQuoteResponse } from "@/lib/cashfree";
import type { Plan } from "@/pages/Upgrade";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { BillingDetailsForm } from "@/components/checkout/BillingDetailsForm";
import { PriceBreakdownCard } from "@/components/checkout/PriceBreakdownCard";
import {
  EMPTY_BILLING_FORM, backPathFor, billingFormFromUser, billingPayload, gstinStateCode, parseCheckoutParams, validateBillingForm,
  type BillingForm, type BillingFormErrors, type CheckoutUser,
} from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const search = useSearch();
  const item = useMemo(() => parseCheckoutParams(search), [search]);
  const backPath = backPathFor(item);

  const [form, setForm] = useState<BillingForm>(EMPTY_BILLING_FORM);
  const [errors, setErrors] = useState<BillingFormErrors>({});
  const [hydrated, setHydrated] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);
  const [paying, setPaying] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery<CheckoutUser>({ queryKey: ["/api/auth/me"] });
  const { data: gateway } = useQuery<CashfreePublicConfig>({ queryKey: PAYMENT_GATEWAY_QUERY_KEY });
  const { data: plans } = useQuery<Plan[]>({ queryKey: ["/api/plans"], enabled: item?.type === "plan" });
  const plan = item?.type === "plan" ? plans?.find((p) => p.id === item.planId) : undefined;

  useEffect(() => {
    if (!user || hydrated) return;
    setForm(billingFormFromUser(user));
    setHydrated(true);
  }, [user, hydrated]);

  const lockedState = gstinStateCode(form.gstin);
  const stateCode = lockedState || form.billingStateCode || undefined;

  const quoteQuery = useQuery<CheckoutQuoteResponse>({
    queryKey: ["/api/cashfree/quote", item, stateCode ?? null],
    queryFn: () => {
      if (!item) throw new Error("No checkout item");
      return fetchCheckoutQuote({ ...item, stateCode });
    },
    enabled: !!item && hydrated,
    placeholderData: (previous) => previous,
  });
  const quote = quoteQuery.data;

  const onChange = (field: keyof BillingForm, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "gstin") {
        const code = gstinStateCode(value);
        if (code) next.billingStateCode = code;
      }
      return next;
    });
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handlePay = async () => {
    if (!item || !quote) return;
    const nextErrors = validateBillingForm(form, t);
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      toast({ title: t("billing.checkout.fixDetails", "Check your billing details"), description: t("billing.checkout.fixDetailsDesc", "Some required fields are missing or invalid."), variant: "destructive" });
      document.getElementById(`checkout-${Object.keys(nextErrors)[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setPaying(true);
    try {
      const res = await apiRequest("PATCH", "/api/auth/me", billingPayload(form));
      await res.json();
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    } catch (error) {
      toast({ title: t("settings.updateFailed", "Update failed"), description: error instanceof Error ? error.message : t("common.tryAgain", "Please try again."), variant: "destructive" });
      setPaying(false);
      return;
    }
    try {
      await startCashfreeCheckout({ ...item, autoRenew: item.type === "plan" && quote.autoRenewAvailable && autoRenew });
    } catch {
      // toast already shown by the helper
    } finally {
      setPaying(false);
    }
  };

  if (!item) {
    return (
      <div className="max-w-xl mx-auto py-10 space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("billing.checkout.invalidLink", "This checkout link is incomplete. Pick a plan, pack or number again.")}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => navigate("/app/billing")} data-testid="button-checkout-back-billing">
          <ArrowLeft className="h-4 w-4 mr-2" />{t("payment.returnToBilling", "Return to Billing")}
        </Button>
      </div>
    );
  }

  const gatewayDisabled = gateway ? gateway.cashfreeEnabled === false : false;
  const quoteError = quoteQuery.error instanceof Error ? quoteQuery.error.message : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6" data-testid="page-checkout">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Link href={backPath} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" data-testid="link-checkout-back">
            <ArrowLeft className="h-4 w-4" />{t("common.back", "Back")}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{t("billing.checkout.title", "Checkout")}</h1>
          <p className="text-sm text-muted-foreground">{t("billing.checkout.subtitle", "Review your order, confirm your billing details and pay securely in INR.")}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          {t("billing.checkout.secureBadge", "256-bit encrypted checkout by Cashfree")}
        </div>
      </div>

      {gatewayDisabled && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("billing.checkout.gatewayDisabled", "Online payments are temporarily unavailable. Please try again later or contact support.")}</AlertDescription>
        </Alert>
      )}
      {quoteError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{quoteError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          <OrderSummaryCard item={item} quote={quote} plan={plan} isLoading={quoteQuery.isLoading || userLoading} changePath={backPath} />
          <BillingDetailsForm form={form} errors={errors} stateLocked={!!lockedState} disabled={paying || userLoading} onChange={onChange} />
        </div>
        <PriceBreakdownCard
          quote={quote}
          isLoading={quoteQuery.isLoading || userLoading}
          isRefreshing={quoteQuery.isFetching && !!quote}
          autoRenew={autoRenew}
          onAutoRenewChange={setAutoRenew}
          onPay={handlePay}
          paying={paying}
          disabled={gatewayDisabled || !!quoteError}
        />
      </div>
    </div>
  );
}
