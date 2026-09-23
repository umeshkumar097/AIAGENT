/**
 * Plan picker — Cashfree one-time payment per billing period (monthly / yearly), INR only.
 * No mandates: a plan is prepaid for a period and renewed by paying again.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { format, formatDistanceToNow, differenceInCalendarDays } from "date-fns";
import { Check, Zap, Crown, Loader2, Star, CreditCard, Sparkles, ArrowRight, Calendar, RefreshCw, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatInr, startCashfreeCheckout } from "@/lib/cashfree";

type BillingPeriod = "monthly" | "yearly";

// Plan tier hierarchy for upgrade/downgrade comparison
const PLAN_TIER_ORDER: Record<string, number> = { free: 0, pro: 1, enterprise: 2 };

const getPlanChangeType = (currentPlanName: string, targetPlanName: string): "upgrade" | "downgrade" | "same" => {
  const currentTier = PLAN_TIER_ORDER[currentPlanName.toLowerCase()] ?? 0;
  const targetTier = PLAN_TIER_ORDER[targetPlanName.toLowerCase()] ?? 1;
  if (targetTier > currentTier) return "upgrade";
  if (targetTier < currentTier) return "downgrade";
  return "same";
};

export interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string | null;
  maxAgents: number;
  maxCampaigns: number;
  maxContactsPerCampaign: number;
  maxWebhooks?: number;
  maxKnowledgeBases?: number;
  maxFlows?: number;
  maxPhoneNumbers?: number;
  includedCredits: number;
  canChooseLlm: boolean;
  canPurchaseNumbers: boolean;
  sipEnabled?: boolean;
  restApiEnabled?: boolean;
}

interface PluginCapabilities {
  success: boolean;
  data?: { capabilities?: Record<string, boolean> };
}

export interface UserSubscription {
  id: string;
  planId: string;
  status: string;
  billingPeriod: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  plan: Plan;
}

interface User {
  id: string;
  planType: string;
}

const priceOf = (plan: Plan, period: BillingPeriod): number => {
  const raw = period === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  const value = parseFloat(raw || "0");
  return Number.isFinite(value) ? value : 0;
};

function FeatureRow({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {highlight ? (
        <Star className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
      ) : (
        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
      )}
      <span className={`text-sm ${highlight ? "font-medium" : ""}`}>{children}</span>
    </div>
  );
}

const limitLabel = (value: number | undefined, singular: string, plural: string, unlimitedLabel: string) => {
  if (value === undefined) return null;
  if (value === -1 || value >= 999) return `${unlimitedLabel} ${plural}`;
  return `${value} ${value === 1 ? singular : plural}`;
};

export function UpgradePlansContent() {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery<User>({ queryKey: ["/api/auth/me"] });
  const { data: plans, isLoading: plansLoading } = useQuery<Plan[]>({ queryKey: ["/api/plans"] });
  const { data: subscription, isLoading: subscriptionLoading } = useQuery<UserSubscription | null>({ queryKey: ["/api/user-subscription"] });
  const { data: pluginCapabilities } = useQuery<PluginCapabilities>({ queryKey: ["/api/plugins/capabilities"] });

  const sipPluginEnabled = pluginCapabilities?.data?.capabilities?.["sip-engine"] ?? false;
  const restApiPluginEnabled = pluginCapabilities?.data?.capabilities?.["rest-api"] ?? false;

  if (userLoading || plansLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const currentPlanName = subscription?.plan?.name || user?.planType || "free";
  const currentPlan = subscription?.plan || plans?.find((p) => p.name === currentPlanName);
  const isPremium = currentPlanName !== "free";
  const hasActiveSubscription = !!subscription && subscription.status === "active" && isPremium;
  const periodEnd = subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : null;
  const daysLeft = periodEnd ? differenceInCalendarDays(periodEnd, new Date()) : null;
  const expiringSoon = hasActiveSubscription && daysLeft !== null && daysLeft <= 7;
  const expired = subscription && subscription.status !== "active" && isPremium;

  const sortedPlans = [...(plans || [])].sort((a, b) => {
    if (a.name === "free") return -1;
    if (b.name === "free") return 1;
    return parseFloat(a.monthlyPrice) - parseFloat(b.monthlyPrice);
  });

  const openCheckout = (plan: Plan, period?: BillingPeriod) => {
    setSelectedPlan(plan);
    if (period) setBillingPeriod(period);
    else if (!plan.yearlyPrice || priceOf(plan, "yearly") <= 0) setBillingPeriod("monthly");
  };

  const handleProceed = async () => {
    if (!selectedPlan) return;
    setIsStarting(true);
    try {
      await startCashfreeCheckout({ type: "plan", planId: selectedPlan.id, billingPeriod });
    } catch {
      // toast already shown
    } finally {
      setIsStarting(false);
    }
  };

  const renewPeriod: BillingPeriod = subscription?.billingPeriod === "yearly" ? "yearly" : "monthly";

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/50 to-indigo-50 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-indigo-950/40 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-700 to-indigo-800 dark:from-slate-600 dark:to-indigo-700 flex items-center justify-center shadow-lg shadow-slate-500/25 dark:shadow-indigo-500/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {isPremium ? t("billing.cashfree.yourPlan", "Your plan") : t("billing.upgradeYourPlan", "Upgrade your plan")}
                </h1>
                {isPremium && (
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white" data-testid="badge-premium-member">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("billing.cashfree.premium", "Premium")}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-0.5">
                {isPremium
                  ? t("billing.cashfree.prepaidNote", "Plans are prepaid per period — no auto-renewal. Renew any time before expiry.")
                  : t("billing.upgradeSubtitle", "Choose the plan that fits your needs")}
              </p>
            </div>
          </div>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-1" data-testid="toggle-billing-period">
            {(["monthly", "yearly"] as BillingPeriod[]).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setBillingPeriod(period)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  billingPeriod === period ? "bg-indigo-600 text-white shadow" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                data-testid={`button-period-${period}`}
              >
                {period === "monthly" ? t("billing.cashfree.monthly", "Monthly") : t("billing.cashfree.yearly", "Yearly")}
              </button>
            ))}
          </div>
        </div>

        {currentPlan && (
          <div className="relative mt-6 bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${currentPlan.name === "free" ? "bg-slate-100 dark:bg-slate-700" : "bg-indigo-100 dark:bg-indigo-900/50"}`}>
                  {currentPlan.name === "free" ? <Zap className="h-5 w-5 text-slate-600 dark:text-slate-400" /> : <Crown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("billing.cashfree.current", "Current")}: {currentPlan.displayName}</h3>
                  <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
                  {periodEnd && isPremium && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1" data-testid="text-subscription-end-date">
                      <Calendar className="h-3 w-3" />
                      {expired
                        ? t("billing.cashfree.expiredOn", "Expired on {{date}}", { date: format(periodEnd, "MMM dd, yyyy") })
                        : t("billing.cashfree.validUntil", "Valid until {{date}} ({{relative}})", { date: format(periodEnd, "MMM dd, yyyy"), relative: formatDistanceToNow(periodEnd, { addSuffix: true }) })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground">
                    {currentPlan.name === "free" ? t("billing.free", "Free") : formatInr(priceOf(currentPlan, renewPeriod))}
                  </div>
                  {currentPlan.name !== "free" && (
                    <p className="text-xs text-muted-foreground">{renewPeriod === "yearly" ? t("billing.perYear", "per year") : t("billing.perMonth", "per month")}</p>
                  )}
                </div>
                {isPremium && (
                  <Button onClick={() => openCheckout(currentPlan, renewPeriod)} className="bg-indigo-600 hover:bg-indigo-700" data-testid="button-renew-plan">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t("billing.cashfree.renew", "Renew")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {(expiringSoon || expired) && (
          <Alert className="relative mt-4 border-amber-200 dark:border-amber-800/50 bg-amber-50/80 dark:bg-amber-950/30">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              {expired
                ? t("billing.cashfree.expiredBanner", "Your plan has expired. Renew now to restore your limits and features.")
                : t("billing.cashfree.expiringBanner", "Your plan expires in {{count}} day(s). Renew now to avoid interruption.", { count: Math.max(daysLeft ?? 0, 0) })}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className={`grid grid-cols-1 ${sortedPlans.length === 2 ? "md:grid-cols-2" : sortedPlans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"} gap-6`}>
        {sortedPlans.map((plan, index) => {
          const isCurrentPlan = currentPlanName === plan.name;
          const isFree = plan.name === "free";
          const isRecommended = !isFree && index === 1;
          const planChangeType = getPlanChangeType(currentPlanName, plan.name);
          const monthly = priceOf(plan, "monthly");
          const yearly = priceOf(plan, "yearly");
          const hasYearly = yearly > 0;
          const showYearly = billingPeriod === "yearly" && hasYearly;
          const yearlySavings = hasYearly ? monthly * 12 - yearly : 0;
          const unlimited = t("billing.cashfree.unlimited", "Unlimited");

          return (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-200 ${
                isCurrentPlan
                  ? "ring-2 ring-indigo-500 dark:ring-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20"
                  : isRecommended
                    ? "ring-2 ring-slate-300 dark:ring-slate-600"
                    : "hover:border-slate-300 dark:hover:border-slate-600"
              }`}
              data-testid={`card-plan-${plan.name}`}
            >
              {isRecommended && !isCurrentPlan && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-slate-700 to-indigo-700 text-white text-xs font-medium py-1.5 text-center">
                  <Crown className="h-3 w-3 inline mr-1" />
                  {t("billing.recommended", "Most popular")}
                </div>
              )}

              <div className={`p-6 space-y-6 ${isRecommended && !isCurrentPlan ? "pt-10" : ""}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isFree ? "bg-slate-100 dark:bg-slate-800" : "bg-indigo-100 dark:bg-indigo-900/50"}`}>
                      {isFree ? <Zap className="h-4 w-4 text-slate-600 dark:text-slate-400" /> : <Crown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{plan.displayName}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                  {isFree ? (
                    <>
                      <div className="text-3xl font-bold text-foreground">{t("billing.free", "Free")}</div>
                      <p className="text-sm text-muted-foreground">{t("billing.cashfree.forever", "Forever")}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">{formatInr(showYearly ? yearly : monthly)}</span>
                        <span className="text-muted-foreground text-sm">/{showYearly ? t("billing.cashfree.year", "year") : t("billing.cashfree.month", "month")}</span>
                      </div>
                      {hasYearly && yearlySavings > 0 && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                          {t("billing.cashfree.saveYearly", "Save {{amount}}/year with yearly billing", { amount: formatInr(yearlySavings) })}
                        </p>
                      )}
                      {billingPeriod === "yearly" && !hasYearly && (
                        <p className="text-xs text-muted-foreground mt-1">{t("billing.cashfree.monthlyOnly", "Monthly billing only")}</p>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <FeatureRow>{limitLabel(plan.maxAgents, t("billing.cashfree.aiAgent", "AI Agent"), t("billing.cashfree.aiAgents", "AI Agents"), unlimited)}</FeatureRow>
                  <FeatureRow>{limitLabel(plan.maxCampaigns, t("billing.cashfree.campaign", "Campaign"), t("billing.cashfree.campaigns", "Campaigns"), unlimited)}</FeatureRow>
                  <FeatureRow>
                    {plan.maxContactsPerCampaign === -1 || plan.maxContactsPerCampaign >= 999999
                      ? t("billing.unlimitedContacts", "Unlimited contacts")
                      : t("billing.cashfree.maxContacts", "Max {{count}} contacts per campaign", { count: plan.maxContactsPerCampaign })}
                  </FeatureRow>
                  {plan.canPurchaseNumbers && <FeatureRow>{t("billing.cashfree.ownNumbers", "Own phone numbers")}</FeatureRow>}
                  {plan.canChooseLlm && <FeatureRow>{t("billing.cashfree.chooseLlm", "Choose your LLM")}</FeatureRow>}
                  {plan.maxFlows !== undefined && plan.maxFlows > 0 && (
                    <FeatureRow>{limitLabel(plan.maxFlows, t("billing.cashfree.flow", "Flow automation"), t("billing.cashfree.flows", "Flow automations"), unlimited)}</FeatureRow>
                  )}
                  {plan.maxKnowledgeBases !== undefined && plan.maxKnowledgeBases > 0 && (
                    <FeatureRow>{limitLabel(plan.maxKnowledgeBases, t("billing.cashfree.knowledgeBase", "Knowledge base"), t("billing.cashfree.knowledgeBases", "Knowledge bases"), unlimited)}</FeatureRow>
                  )}
                  {plan.maxWebhooks !== undefined && plan.maxWebhooks > 0 && (
                    <FeatureRow>{limitLabel(plan.maxWebhooks, t("billing.cashfree.webhook", "Webhook"), t("billing.cashfree.webhooks", "Webhooks"), unlimited)}</FeatureRow>
                  )}
                  {plan.maxPhoneNumbers !== undefined && plan.maxPhoneNumbers > 0 && (
                    <FeatureRow>{limitLabel(plan.maxPhoneNumbers, t("billing.cashfree.phoneNumber", "Phone number"), t("billing.cashfree.phoneNumbers", "Phone numbers"), unlimited)}</FeatureRow>
                  )}
                  {plan.includedCredits > 0 && (
                    <FeatureRow highlight>{t("billing.cashfree.includedMinutes", "{{count}} included minutes", { count: plan.includedCredits })}</FeatureRow>
                  )}
                  {!isFree && <FeatureRow>{t("billing.prioritySupport", "Priority support")}</FeatureRow>}
                  {sipPluginEnabled && plan.sipEnabled && !isFree && <FeatureRow>{t("billing.cashfree.sipAccess", "SIP trunk access")}</FeatureRow>}
                  {restApiPluginEnabled && plan.restApiEnabled && !isFree && <FeatureRow>{t("billing.cashfree.restApiAccess", "REST API access")}</FeatureRow>}
                </div>

                <Button
                  variant={isCurrentPlan || isFree ? "outline" : "default"}
                  className={`w-full ${!isFree && !isCurrentPlan ? "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600" : ""}`}
                  disabled={isFree || (isCurrentPlan && !expired && !expiringSoon)}
                  onClick={() => !isFree && openCheckout(plan)}
                  data-testid={`button-select-${plan.name}`}
                >
                  {isFree ? (
                    t("billing.cashfree.freeTier", "Free tier")
                  ) : isCurrentPlan ? (
                    expired || expiringSoon ? (
                      <>{t("billing.cashfree.renew", "Renew")}<RefreshCw className="h-4 w-4 ml-2" /></>
                    ) : (
                      t("billing.currentPlanButton", "Current plan")
                    )
                  ) : planChangeType === "downgrade" ? (
                    <>{t("billing.cashfree.downgrade", "Downgrade")}<ArrowRight className="h-4 w-4 ml-2" /></>
                  ) : (
                    <>{t("billing.cashfree.upgrade", "Upgrade")}<ArrowRight className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{t("billing.cashfree.creditCallingTitle", "Minute-based calling")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("billing.cashfree.creditCallingDesc", "Paid plan users can buy minute packs for calls. 1 minute = 60 seconds of call time (rounded up). Prices are in INR and include a GST tax invoice.")}
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={selectedPlan !== null} onOpenChange={(open) => !open && !isStarting && setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("billing.cashfree.subscribeTo", "Subscribe to {{plan}}", { plan: selectedPlan.displayName })}
                </DialogTitle>
                <DialogDescription>
                  {t("billing.cashfree.chooseBillingPeriod", "Choose a billing period. You will be redirected to Cashfree to pay in INR.")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                  {(["monthly", "yearly"] as BillingPeriod[]).map((period) => {
                    const price = priceOf(selectedPlan, period);
                    const disabled = period === "yearly" && price <= 0;
                    return (
                      <Button
                        key={period}
                        type="button"
                        variant={billingPeriod === period ? "default" : "outline"}
                        disabled={disabled}
                        className="h-16 flex flex-col items-center justify-center gap-0.5"
                        onClick={() => setBillingPeriod(period)}
                        data-testid={`button-dialog-period-${period}`}
                      >
                        <span className="text-xs uppercase tracking-wide">{period === "monthly" ? t("billing.cashfree.monthly", "Monthly") : t("billing.cashfree.yearly", "Yearly")}</span>
                        <span className="font-semibold">{disabled ? t("billing.cashfree.notAvailable", "N/A") : formatInr(price)}</span>
                      </Button>
                    );
                  })}
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("billing.cashfree.total", "Total")}</span>
                    <span className="text-2xl font-bold">
                      {formatInr(priceOf(selectedPlan, billingPeriod))}
                      <span className="text-sm font-normal text-muted-foreground">/{billingPeriod === "yearly" ? t("billing.cashfree.year", "year") : t("billing.cashfree.month", "month")}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("billing.cashfree.prepaidDialogNote", "One-time payment for this period. No auto-renewal — we will remind you before it expires.")}
                  </p>
                </div>

                <Button className="w-full" size="lg" disabled={isStarting} onClick={handleProceed} data-testid="button-proceed-payment">
                  {isStarting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t("billing.cashfree.redirecting", "Redirecting to Cashfree…")}</>
                  ) : (
                    t("billing.cashfree.proceedToPayment", "Proceed to payment")
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Upgrade() {
  return <UpgradePlansContent />;
}
