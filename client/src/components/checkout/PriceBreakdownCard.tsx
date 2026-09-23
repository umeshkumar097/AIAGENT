/**
 * Checkout — GST breakdown, auto-renew toggle (plans) and the Pay button.
 * Every amount comes from the server quote; nothing is computed here.
 */
import { useTranslation } from "react-i18next";
import { CreditCard, Landmark, Loader2, Lock, RefreshCw, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { formatInr, type CheckoutQuoteResponse } from "@/lib/cashfree";
import { stateNameForCode } from "@/lib/indian-states";

interface Props {
  quote: CheckoutQuoteResponse | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  autoRenew: boolean;
  onAutoRenewChange: (value: boolean) => void;
  onPay: () => void;
  paying: boolean;
  disabled: boolean;
}

function Row({ label, value, muted, testId }: { label: string; value: string; muted?: boolean; testId?: string }) {
  return (
    <div className={`flex items-center justify-between text-sm ${muted ? "text-muted-foreground" : ""}`}>
      <span>{label}</span>
      <span className="font-medium tabular-nums" data-testid={testId}>{value}</span>
    </div>
  );
}

export function PriceBreakdownCard({ quote, isLoading, isRefreshing, autoRenew, onAutoRenewChange, onPay, paying, disabled }: Props) {
  const { t } = useTranslation();
  const q = quote?.quote;
  const showAutoRenew = quote?.type === "plan" && quote.autoRenewAvailable;

  return (
    <Card className="lg:sticky lg:top-6" data-testid="card-checkout-price">
      <CardHeader>
        <CardTitle className="text-base">{t("billing.checkout.priceDetails", "Price details")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading || !q ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        ) : (
          <div className={`space-y-2 transition-opacity ${isRefreshing ? "opacity-60" : ""}`}>
            <Row label={q.pricesIncludeGst ? t("billing.checkout.priceInclGst", "Price (incl. GST)") : t("billing.checkout.listPrice", "Price")} value={formatInr(q.listPrice)} testId="text-checkout-list-price" />
            {q.pricesIncludeGst && <Row label={t("billing.checkout.taxableValue", "Taxable value")} value={formatInr(q.taxableAmount)} muted />}
            {q.isInterState ? (
              <Row label={t("billing.checkout.igst", "IGST {{rate}}%", { rate: q.taxRate })} value={formatInr(q.igst)} muted testId="text-checkout-igst" />
            ) : (
              <>
                <Row label={t("billing.checkout.cgst", "CGST {{rate}}%", { rate: q.taxRate / 2 })} value={formatInr(q.cgst)} muted testId="text-checkout-cgst" />
                <Row label={t("billing.checkout.sgst", "SGST {{rate}}%", { rate: q.taxRate / 2 })} value={formatInr(q.sgst)} muted testId="text-checkout-sgst" />
              </>
            )}
            <Separator className="my-2" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{t("billing.checkout.totalPayable", "Total payable")}</span>
              <span className="text-2xl font-bold tabular-nums" data-testid="text-checkout-total">{formatInr(q.total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {q.pricesIncludeGst
                ? t("billing.checkout.pricesInclusive", "Prices include GST {{rate}}%.", { rate: q.taxRate })
                : t("billing.checkout.pricesExclusive", "Prices exclude GST. GST {{rate}}% is added as shown.", { rate: q.taxRate })}
              {" "}
              {q.buyerStateCode
                ? t("billing.checkout.placeOfSupply", "Place of supply: {{state}}.", { state: stateNameForCode(q.buyerStateCode) || q.buyerStateCode })
                : t("billing.checkout.selectStateForGst", "Select your state to see CGST/SGST vs IGST.")}
            </p>
            {quote?.hsnSac && <p className="text-xs text-muted-foreground">HSN/SAC {quote.hsnSac}</p>}
          </div>
        )}

        {showAutoRenew && (
          <div className="rounded-lg border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/60 dark:bg-indigo-950/20 p-3 space-y-2" data-testid="box-checkout-auto-renew">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="checkout-auto-renew" className="flex items-center gap-2 font-medium cursor-pointer">
                <RefreshCw className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                {t("billing.autoRenew.toggle", "Auto-renew")}
              </Label>
              <Switch id="checkout-auto-renew" checked={autoRenew} onCheckedChange={onAutoRenewChange} disabled={disabled} data-testid="switch-checkout-auto-renew" />
            </div>
            <p className="text-xs text-muted-foreground">
              {t("billing.autoRenew.checkoutCopy", "Auto-renew with UPI AutoPay / card — set up after this payment, ₹1 verification (refunded). Cancel any time.")}
            </p>
          </div>
        )}

        <Button
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
          size="lg"
          disabled={disabled || paying || !q}
          onClick={onPay}
          data-testid="button-checkout-pay"
        >
          {paying ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t("billing.cashfree.redirecting", "Redirecting to Cashfree…")}</>
          ) : (
            <><Lock className="h-4 w-4 mr-2" />{t("billing.checkout.payButton", "Pay {{amount}} securely", { amount: q ? formatInr(q.total) : "" })}</>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Smartphone className="h-3.5 w-3.5" />UPI</span>
          <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" />{t("billing.checkout.cards", "Cards")}</span>
          <span className="flex items-center gap-1"><Landmark className="h-3.5 w-3.5" />{t("billing.checkout.netBanking", "Net banking")}</span>
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          {t("billing.checkout.securedByCashfree", "Payments are processed securely by Cashfree. A GST tax invoice is emailed after payment.")}
        </p>
      </CardContent>
    </Card>
  );
}

export default PriceBreakdownCard;
