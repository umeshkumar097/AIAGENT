/**
 * Billing — plans, minute packs, history (payments + invoices + ledger) and phone numbers.
 * All purchases go through Cashfree (INR, one-time payments).
 */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Loader2, Check, Crown, AlertCircle, Wallet, Coins, Receipt, TrendingUp, Sparkles, ArrowUpRight, FileText, Phone, ShieldCheck } from "lucide-react";
import { CreditPurchaseDialog, type CreditPackageOption } from "@/components/CreditPurchaseDialog";
import { CreditLedger } from "@/components/billing/CreditLedger";
import { InvoicesList } from "@/components/billing/InvoicesList";
import TransactionHistory from "@/pages/TransactionHistory";
import { UpgradePlansContent, type UserSubscription } from "@/pages/Upgrade";
import { PhoneNumberSubscriptionSection } from "@/components/PhoneNumberSubscriptionSection";
import { formatInr } from "@/lib/cashfree";

interface User {
  credits: number;
  planId: string | null;
  email?: string;
}

type BillingTab = "plans" | "packs" | "history" | "numbers";

const TAB_ALIASES: Record<string, BillingTab> = {
  plans: "plans",
  packs: "packs",
  credits: "history",
  history: "history",
  invoices: "history",
  numbers: "numbers",
};

export default function Billing() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const [activeTab, setActiveTab] = useState<BillingTab>("plans");
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  useEffect(() => {
    const tab = new URLSearchParams(searchString).get("tab");
    if (tab && TAB_ALIASES[tab]) setActiveTab(TAB_ALIASES[tab]);
  }, [searchString]);

  const handleTabChange = (value: string) => {
    const tab = (TAB_ALIASES[value] || "plans") as BillingTab;
    setActiveTab(tab);
    setLocation(tab === "plans" ? "/app/billing" : `/app/billing?tab=${tab}`);
  };

  const { data: user, isLoading: userLoading } = useQuery<User>({ queryKey: ["/api/auth/me"] });
  const { data: subscription, isLoading: subscriptionLoading } = useQuery<UserSubscription | null>({ queryKey: ["/api/user-subscription"] });
  const { data: packages, isLoading: packagesLoading } = useQuery<CreditPackageOption[]>({ queryKey: ["/api/credit-packages"] });

  if (userLoading || subscriptionLoading || packagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const currentBalance = user?.credits || 0;
  const hasActiveSubscription = !!(subscription && subscription.status === "active");
  const activePackages = (packages || []).filter((p) => p.isActive !== false);

  const openPurchase = (packageId?: string) => {
    setSelectedPackageId(packageId || activePackages[0]?.id || null);
    setPurchaseDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/50 to-indigo-50 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-indigo-950/40 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-700 to-indigo-800 dark:from-slate-600 dark:to-indigo-700 flex items-center justify-center shadow-lg shadow-slate-500/25 dark:shadow-indigo-500/20">
              <Wallet className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("billing.title", "Billing")}</h1>
              <p className="text-muted-foreground mt-0.5">{t("billing.subtitle", "Manage your plan, minutes and invoices")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            {t("billing.cashfree.poweredBy", "Secure INR payments by Cashfree · GST invoices included")}
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-200" data-testid="text-header-balance">{currentBalance.toLocaleString()}</div>
            </div>
            <div className="text-slate-600/70 dark:text-slate-400/70 text-sm">{t("billing.currentBalance", "Available minutes")}</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{subscription?.plan.displayName || t("billing.free", "Free")}</div>
            </div>
            <div className="text-indigo-600/70 dark:text-indigo-400/70 text-sm">{t("billing.currentPlan", "Current plan")}</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {subscription?.currentPeriodEnd && hasActiveSubscription ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "-"}
              </div>
            </div>
            <div className="text-slate-600/70 dark:text-slate-400/70 text-sm">{t("billing.cashfree.planValidUntil", "Plan valid until")}</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 capitalize">{subscription?.status || t("common.active", "Active")}</div>
            </div>
            <div className="text-emerald-600/70 dark:text-emerald-400/70 text-sm">{t("common.status", "Status")}</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="plans" className="gap-2" data-testid="tab-plans">
            <Crown className="h-4 w-4" />
            {t("billing.plans", "Plans")}
          </TabsTrigger>
          <TabsTrigger value="packs" className="gap-2" data-testid="tab-packs">
            <Coins className="h-4 w-4" />
            {t("billing.creditPacks", "Minute packs")}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2" data-testid="tab-history">
            <FileText className="h-4 w-4" />
            {t("billing.transactionHistory", "History & invoices")}
          </TabsTrigger>
          <TabsTrigger value="numbers" className="gap-2" data-testid="tab-phone-numbers">
            <Phone className="h-4 w-4" />
            {t("billing.cashfree.phoneNumbers", "Phone numbers")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-8">
          <UpgradePlansContent />
        </TabsContent>

        <TabsContent value="packs" className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/80 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Coins className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t("billing.creditsAndUsage", "Minutes & usage")}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{t("billing.creditsSubtitle", "Your available calling minutes")}</p>
                </div>
              </div>

              {!hasActiveSubscription && (
                <Alert className="mb-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/80 dark:bg-amber-950/30">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-700 dark:text-amber-300">{t("billing.membershipRequired", "An active plan is required to buy minute packs.")}</AlertDescription>
                </Alert>
              )}

              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shadow-lg">
                      <Wallet className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{t("billing.currentBalance", "Current balance")}</div>
                      <div className="text-5xl font-bold font-mono tabular-nums text-slate-800 dark:text-slate-100" data-testid="text-credit-balance">{currentBalance.toLocaleString()}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {t("billing.availableCredits", "Available minutes")}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => openPurchase()}
                    disabled={!hasActiveSubscription || activePackages.length === 0}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-500/25"
                    data-testid="button-recharge-credits"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    {t("billing.purchaseCredits", "Add minutes")}
                  </Button>
                </div>
              </div>

              {activePackages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    {t("billing.creditPackages", "Minute packages")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activePackages.map((pkg, index) => {
                      const price = typeof pkg.price === "string" ? parseFloat(pkg.price) : pkg.price;
                      const isPopular = index === 1;
                      return (
                        <div
                          key={pkg.id}
                          className={`relative bg-white dark:bg-slate-800/80 rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg ${
                            isPopular ? "ring-2 ring-indigo-500 dark:ring-indigo-400 border-indigo-200 dark:border-indigo-800" : "border-slate-200 dark:border-slate-700"
                          }`}
                          data-testid={`card-package-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {isPopular && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs font-medium py-1.5 text-center">
                              <Sparkles className="h-3 w-3 inline mr-1" />
                              {t("billing.popular", "Popular")}
                            </div>
                          )}
                          <div className={`p-5 ${isPopular ? "pt-9" : ""}`}>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{pkg.name}</h4>
                                {pkg.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pkg.description}</p>}
                              </div>
                              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isPopular ? "bg-indigo-100 dark:bg-indigo-900/50" : "bg-slate-100 dark:bg-slate-700/50"}`}>
                                <Coins className={`h-5 w-5 ${isPopular ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`} />
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{formatInr(price)}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xl font-mono font-semibold text-emerald-600 dark:text-emerald-400">{pkg.credits.toLocaleString()}</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">{t("billing.cashfree.minutes", "minutes")}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                              {formatInr(price / Math.max(pkg.credits, 1))} {t("billing.perMinute", "per minute")}
                            </div>
                            <Button
                              className={`w-full ${isPopular ? "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800" : ""}`}
                              variant={isPopular ? "default" : "outline"}
                              onClick={() => openPurchase(pkg.id)}
                              disabled={!hasActiveSubscription}
                              data-testid={`button-buy-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {t("billing.purchase", "Purchase")}
                              <ArrowUpRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-8">
          <TransactionHistory embedded />
          <InvoicesList />
          <CreditLedger />
        </TabsContent>

        <TabsContent value="numbers" className="space-y-8">
          <PhoneNumberSubscriptionSection hasActiveSubscription={hasActiveSubscription} />
        </TabsContent>
      </Tabs>

      <CreditPurchaseDialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen} packageId={selectedPackageId} />
    </div>
  );
}
