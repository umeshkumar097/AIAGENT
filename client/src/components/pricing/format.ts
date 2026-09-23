/**
 * Money and copy helpers for the public pricing page. All amounts are INR as served by
 * /api/public/pricing (excl. GST unless `pricesIncludeGst`).
 */
import type { BillingPeriod, PublicPlan, PublicPricing } from "./types";

/** i18n function shape used by the pricing components: t(key, fallback, options?) */
export type Tr = (key: string, fallback: string, options?: Record<string, unknown>) => string;

/** "₹1,499" — whole rupees, Indian digit grouping. */
export function formatInrWhole(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  try {
    return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(safe)}`;
  } catch {
    return `₹${safe}`;
  }
}

/** "₹4.44" — per-minute price with paise. */
export function formatInrPaise(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  try {
    return `₹${new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(safe)}`;
  } catch {
    return `₹${safe.toFixed(2)}`;
  }
}

export function formatCount(n: number): string {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return String(n);
  }
}

/** Effective price per included minute; null when nothing is included or the plan is free. */
export function perMinute(price: number, minutes: number): number | null {
  if (!Number.isFinite(price) || price <= 0 || !minutes || minutes <= 0) return null;
  return price / minutes;
}

/** Amount charged for the chosen period (yearly falls back to 12× monthly when unset). */
export function periodPrice(plan: PublicPlan, period: BillingPeriod): number {
  if (period === "monthly") return plan.monthlyPrice;
  return plan.yearlyPrice ?? plan.monthlyPrice * 12;
}

/** Whole months of the yearly price that are effectively free vs. paying monthly (0 when none). */
export function yearlyFreeMonths(plan: PublicPlan): number {
  if (plan.monthlyPrice <= 0 || plan.yearlyPrice === null || plan.yearlyPrice <= 0) return 0;
  const months = 12 - plan.yearlyPrice / plan.monthlyPrice;
  return months > 0.05 ? Math.round(months * 10) / 10 : 0;
}

/** "excl. 18% GST" / "incl. GST" — the note printed under every price. */
export function gstNote(pricing: Pick<PublicPricing, "gstRate" | "pricesIncludeGst">, t: Tr): string {
  if (pricing.pricesIncludeGst) return t("landing.publicPricing.inclGst", "incl. GST");
  const rate = Number.isFinite(pricing.gstRate) && pricing.gstRate > 0 ? `${pricing.gstRate}%` : "";
  return rate
    ? t("landing.publicPricing.exclGstRate", "excl. {{rate}} GST", { rate })
    : t("landing.publicPricing.exclGst", "excl. GST");
}

/** The plan to badge as "Most popular": the middle paid tier, else the second paid plan. */
export function popularPlanName(plans: PublicPlan[]): string | null {
  const paid = plans.filter((p) => p.monthlyPrice > 0);
  if (paid.length === 0) return null;
  return paid[Math.min(1, paid.length - 1)].name;
}

/** Labels for the `features` JSON flags; unknown flags are not rendered (nothing invented). */
const FEATURE_LABELS: Array<[key: string, i18nKey: string, fallback: string]> = [
  ["callRecording", "callRecording", "Call recording"],
  ["transcription", "transcription", "Call transcripts"],
  ["multiLanguage", "multiLanguage", "Multilingual voices"],
  ["customVoices", "customVoices", "Choose from all voices"],
  ["batchCalling", "batchCalling", "Batch campaign calling"],
  ["ragKnowledgeBase", "ragKnowledgeBase", "Knowledge base (RAG)"],
  ["flowAutomation", "flowAutomation", "Flow automations"],
  ["webhookIntegration", "webhookIntegration", "Webhooks and integrations"],
  ["basicAnalytics", "basicAnalytics", "Call analytics"],
  ["advancedAnalytics", "advancedAnalytics", "Advanced analytics"],
  ["apiAccess", "apiAccess", "REST API access"],
  ["emailSupport", "emailSupport", "Email support"],
  ["prioritySupport", "prioritySupport", "Priority support"],
  ["whiteLabel", "whiteLabel", "White-label"],
  ["dedicatedManager", "dedicatedManager", "Dedicated account manager"],
];

/** Bullet list for a plan card: quotas first, then the enabled feature flags. */
export function planBullets(plan: PublicPlan, t: Tr): string[] {
  const n = (count: number, one: string, many: string, key: string) =>
    t(`landing.publicPricing.quota.${key}`, count === 1 ? one : many, { count: formatCount(count) });

  const bullets: string[] = [
    n(plan.maxAgents, "{{count}} AI agent", "{{count}} AI agents", "agents"),
    n(plan.maxCampaigns, "{{count}} campaign", "{{count}} campaigns", "campaigns"),
    t("landing.publicPricing.quota.contacts", "{{count}} contacts per campaign", { count: formatCount(plan.maxContactsPerCampaign) }),
    plan.maxPhoneNumbers > 0
      ? n(plan.maxPhoneNumbers, "{{count}} phone number", "{{count}} phone numbers", "numbers")
      : t("landing.publicPricing.quota.sharedNumbers", "Calls from shared numbers"),
    n(plan.maxKnowledgeBases, "{{count}} knowledge base", "{{count}} knowledge bases", "knowledgeBases"),
    n(plan.maxFlows, "{{count}} flow automation", "{{count}} flow automations", "flows"),
  ];
  if (plan.canChooseLlm) bullets.push(t("landing.publicPricing.quota.chooseLlm", "Choose your LLM"));
  if (plan.teamManagementEnabled && plan.maxTeamMembers > 0) {
    bullets.push(n(plan.maxTeamMembers, "{{count}} team member", "{{count}} team members", "team"));
  }

  const flags = plan.features ?? {};
  for (const [flag, i18nKey, fallback] of FEATURE_LABELS) {
    if (flags[flag] === true) bullets.push(t(`landing.publicPricing.feature.${i18nKey}`, fallback));
  }
  return bullets;
}
