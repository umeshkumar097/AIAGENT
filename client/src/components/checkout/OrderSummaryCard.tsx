/**
 * Checkout — what is being bought (plan / minute pack / phone number).
 */
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Coins, Crown, Phone, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { CheckoutQuoteResponse } from "@/lib/cashfree";
import type { Plan } from "@/pages/Upgrade";
import type { CheckoutItem } from "./checkout-form";

interface Props {
  item: CheckoutItem;
  quote: CheckoutQuoteResponse | undefined;
  plan: Plan | undefined;
  isLoading: boolean;
  changePath: string;
}

const unlimited = (value: number | undefined) => value === -1 || (value ?? 0) >= 999;

export function OrderSummaryCard({ item, quote, plan, isLoading, changePath }: Props) {
  const { t } = useTranslation();

  const icon =
    item.type === "plan" ? <Crown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
    : item.type === "credits" ? <Coins className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
    : <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;

  const kindLabel =
    item.type === "plan" ? t("billing.checkout.kindPlan", "Plan")
    : item.type === "credits" ? t("billing.checkout.kindCredits", "Minute pack")
    : t("billing.checkout.kindPhone", "Phone number");

  const periodLabel = item.billingPeriod === "yearly" ? t("billing.cashfree.yearly", "Yearly") : t("billing.cashfree.monthly", "Monthly");

  const highlights: string[] = [];
  if (plan) {
    const unl = t("billing.cashfree.unlimited", "Unlimited");
    highlights.push(unlimited(plan.maxAgents) ? `${unl} ${t("billing.cashfree.aiAgents", "AI Agents")}` : `${plan.maxAgents} ${t("billing.cashfree.aiAgents", "AI Agents")}`);
    highlights.push(unlimited(plan.maxCampaigns) ? `${unl} ${t("billing.cashfree.campaigns", "Campaigns")}` : `${plan.maxCampaigns} ${t("billing.cashfree.campaigns", "Campaigns")}`);
    if (plan.includedCredits > 0) highlights.push(t("billing.cashfree.includedMinutes", "{{count}} included minutes", { count: plan.includedCredits }));
    if (plan.canPurchaseNumbers) highlights.push(t("billing.cashfree.ownNumbers", "Own phone numbers"));
    if (plan.canChooseLlm) highlights.push(t("billing.cashfree.chooseLlm", "Choose your LLM"));
  }

  return (
    <Card data-testid="card-checkout-summary">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">{icon}</div>
          <div>
            <CardTitle className="text-base">{t("billing.checkout.orderSummary", "Order summary")}</CardTitle>
            <p className="text-xs text-muted-foreground">{kindLabel}</p>
          </div>
        </div>
        <Link href={changePath} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap" data-testid="link-checkout-change">
          {t("billing.checkout.change", "Change")}
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading || !quote ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground" data-testid="text-checkout-item-name">
                  {item.type === "plan" ? quote.planName || quote.description : item.type === "phone_number" ? quote.phoneNumber || item.phoneNumber : quote.description}
                </h3>
                {item.type === "plan" && <Badge variant="secondary">{periodLabel}</Badge>}
                {item.type === "phone_number" && item.numberType && <Badge variant="secondary" className="capitalize">{item.numberType.replace("_", " ")}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {item.type === "plan" && plan?.description ? plan.description : quote.description}
              </p>
            </div>

            {item.type === "credits" && quote.credits != null && (
              <p className="text-sm text-foreground">
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{quote.credits.toLocaleString()}</span>{" "}
                {t("billing.cashfree.minutes", "minutes")}
              </p>
            )}
            {item.type === "phone_number" && (
              <p className="text-sm text-muted-foreground">
                {t("billing.checkout.phoneNote", "One-time activation for {{country}}. Monthly rental is billed in minutes afterwards.", { country: quote.country || item.country })}
              </p>
            )}
            {item.type === "plan" && (
              <p className="text-sm text-muted-foreground">
                {item.billingPeriod === "yearly"
                  ? t("billing.checkout.planPeriodYearly", "Valid for 12 months from activation.")
                  : t("billing.checkout.planPeriodMonthly", "Valid for 1 month from activation.")}
              </p>
            )}
            {highlights.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {highlights.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderSummaryCard;
