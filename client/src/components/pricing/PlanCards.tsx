/**
 * Plan cards for the public pricing page: monthly/yearly toggle, included minutes, effective
 * per-minute price, GST note, feature bullets from the plan's quotas + `features` flags, and a
 * CTA into the product (register on app.zonvo.tech). Renders skeletons while loading.
 */
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLink, getStartedPath } from "@/components/landing/AppLink";
import type { BillingPeriod, PublicPlan, PublicPricing } from "./types";
import {
  formatCount, formatInrPaise, formatInrWhole, gstNote, periodPrice, perMinute,
  planBullets, popularPlanName, yearlyFreeMonths, type Tr,
} from "./format";

interface PlanCardsProps {
  pricing: PublicPricing | null;
  isLoading: boolean;
  period: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ period, onPeriodChange, plans }: {
  period: BillingPeriod;
  onPeriodChange: (p: BillingPeriod) => void;
  plans: PublicPlan[];
}) {
  const { t: i18nT } = useTranslation();
  const t = i18nT as Tr;
  const freeMonths = Math.max(0, ...plans.map(yearlyFreeMonths));
  const option = (value: BillingPeriod, label: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={period === value}
      onClick={() => onPeriodChange(value)}
      className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
        period === value ? "bg-[#27D3C9] text-black" : "text-slate-300 hover:text-white"
      }`}
      data-testid={`toggle-billing-${value}`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <div role="radiogroup" aria-label={t("landing.publicPricing.billingPeriod", "Billing period")} className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5">
        {option("monthly", t("landing.pricingPage.billing.monthly", "Monthly"))}
        {option("yearly", t("landing.pricingPage.billing.yearly", "Yearly"))}
      </div>
      {freeMonths > 0 && (
        <p className="text-xs text-[#27D3C9] font-medium">
          {t("landing.publicPricing.yearlyFreeMonths", "Pay yearly and get {{count}} months free", { count: formatCount(freeMonths) })}
        </p>
      )}
    </div>
  );
}

function PlanCardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl p-8 border border-white/10 bg-white/5" aria-hidden="true">
      <Skeleton className="h-7 w-28 bg-white/10 mb-3" />
      <Skeleton className="h-4 w-full bg-white/10 mb-2" />
      <Skeleton className="h-4 w-3/4 bg-white/10 mb-8" />
      <Skeleton className="h-10 w-36 bg-white/10 mb-2" />
      <Skeleton className="h-4 w-40 bg-white/10 mb-8" />
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-5/6 bg-white/10 mb-3" />
      ))}
      <Skeleton className="h-12 w-full bg-white/10 mt-auto" />
    </div>
  );
}

function PlanCard({ plan, pricing, period, popular, t }: {
  plan: PublicPlan;
  pricing: PublicPricing;
  period: BillingPeriod;
  popular: boolean;
  t: Tr;
}) {
  const isFree = plan.monthlyPrice <= 0;
  const price = periodPrice(plan, period);
  const monthlyEquivalent = period === "yearly" ? price / 12 : price;
  const minuteRate = perMinute(monthlyEquivalent, plan.includedCredits);
  const bullets = planBullets(plan, t);

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
        popular
          ? "border-2 border-[#27D3C9] bg-gradient-to-b from-[#27D3C9]/10 to-white/5 shadow-2xl shadow-[#27D3C9]/20"
          : "border border-white/10 bg-white/5 hover:border-white/20"
      }`}
      data-testid={`plan-card-${plan.name}`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#27D3C9] text-black text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
          {t("landing.pricingPage.plans.mostPopular", "Most Popular")}
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.displayName}</h3>
        <p className="text-sm text-slate-400">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-1 flex-wrap">
          <span className="text-4xl font-extrabold text-white" data-testid={`plan-price-${plan.name}`}>
            {isFree ? t("landing.publicPricing.freePrice", "Free") : formatInrWhole(price)}
          </span>
          {!isFree && (
            <span className="text-slate-400 mb-1">
              {period === "yearly" ? t("landing.pricingPage.billing.perYear", "/year") : t("landing.pricingPage.billing.perMonth", "/month")}
            </span>
          )}
        </div>
        {!isFree && (
          <p className="text-xs text-slate-500 mt-1">
            {gstNote(pricing, t)}
            {period === "yearly" && ` · ${t("landing.publicPricing.monthlyEquivalent", "{{amount}}/month equivalent", { amount: formatInrWhole(monthlyEquivalent) })}`}
          </p>
        )}
        <p className="text-sm text-[#27D3C9] font-medium mt-3">
          {t("landing.publicPricing.includedMinutes", "{{count}} call minutes included / month", { count: formatCount(plan.includedCredits) })}
        </p>
        {minuteRate !== null && (
          <p className="text-xs text-slate-400 mt-1" data-testid={`plan-per-minute-${plan.name}`}>
            {t("landing.publicPricing.effectivePerMinute", "{{amount}} per minute effective", { amount: formatInrPaise(minuteRate) })}
          </p>
        )}
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#27D3C9]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <AppLink to={getStartedPath()} className="block" data-testid={`plan-cta-${plan.name}`}>
        <Button
          className={`w-full h-12 rounded-xl font-bold text-base transition-all ${
            popular ? "bg-[#27D3C9] hover:bg-[#20b5ad] text-black shadow-lg shadow-[#27D3C9]/25" : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          {isFree ? t("landing.pricingPage.plans.startFree", "Start Free") : t("landing.pricingPage.plans.getStarted", "Get Started")}
        </Button>
      </AppLink>
    </div>
  );
}

export function PlanCards({ pricing, isLoading, period, onPeriodChange }: PlanCardsProps) {
  const { t } = useTranslation();
  const plans = pricing?.plans ?? [];
  const popular = popularPlanName(plans);
  const cols = plans.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3";

  return (
    <div>
      <BillingToggle period={period} onPeriodChange={onPeriodChange} plans={plans} />
      <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6 pt-4`}>
        {isLoading || !pricing
          ? Array.from({ length: 4 }).map((_, i) => <PlanCardSkeleton key={i} />)
          : plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} pricing={pricing} period={period} popular={plan.name === popular} t={t as Tr} />
            ))}
      </div>
    </div>
  );
}
