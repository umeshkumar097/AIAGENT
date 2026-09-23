/**
 * Public pricing shapes (GET /api/public/pricing) plus a static fallback used only when the
 * API is unreachable. The fallback mirrors server/seed-plans.ts and server/seed-credit-packages.ts
 * (pricing revision 2026-09); the live API is always the source of truth.
 */

export interface PublicPlan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  /** INR, excl. GST unless `pricesIncludeGst` */
  monthlyPrice: number;
  yearlyPrice: number | null;
  /** Call minutes included per month (1 credit = 1 minute) */
  includedCredits: number;
  maxAgents: number;
  maxCampaigns: number;
  maxContactsPerCampaign: number;
  maxWebhooks: number;
  maxKnowledgeBases: number;
  maxFlows: number;
  maxPhoneNumbers: number;
  maxWidgets: number;
  canChooseLlm: boolean;
  canPurchaseNumbers: boolean;
  restApiEnabled: boolean;
  sipEnabled: boolean;
  teamManagementEnabled: boolean;
  maxTeamMembers: number;
  features: Record<string, unknown>;
}

export interface PublicCreditPackage {
  id: string;
  name: string;
  description: string | null;
  credits: number;
  /** INR, excl. GST unless `pricesIncludeGst` */
  price: number;
}

export interface PublicPricing {
  currency: string;
  currencySymbol: string;
  /** GST percentage added at checkout (e.g. 18) */
  gstRate: number;
  /** true = list prices already include GST */
  pricesIncludeGst: boolean;
  creditsPerMinute: number;
  plans: PublicPlan[];
  packages: PublicCreditPackage[];
}

export type BillingPeriod = "monthly" | "yearly";

const BASE_FEATURES = {
  basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true,
  batchCalling: true, webhookIntegration: true, ragKnowledgeBase: true, flowAutomation: true, multiLanguage: true,
};

function fallbackPlan(p: Partial<PublicPlan> & Pick<PublicPlan, "id" | "name" | "displayName" | "description" | "monthlyPrice" | "includedCredits">): PublicPlan {
  return {
    yearlyPrice: p.monthlyPrice * 10,
    maxAgents: 1, maxCampaigns: 1, maxContactsPerCampaign: 10, maxWebhooks: 1, maxKnowledgeBases: 2,
    maxFlows: 1, maxPhoneNumbers: 0, maxWidgets: 1, canChooseLlm: false, canPurchaseNumbers: false,
    restApiEnabled: false, sipEnabled: false, teamManagementEnabled: false, maxTeamMembers: 0,
    features: {},
    ...p,
  };
}

export const FALLBACK_PRICING: PublicPricing = {
  currency: "INR",
  currencySymbol: "₹",
  gstRate: 18,
  pricesIncludeGst: false,
  creditsPerMinute: 1,
  plans: [
    fallbackPlan({
      id: "fallback-free", name: "free", displayName: "Free",
      description: "Try AI calling with 15 free minutes on shared numbers. Upgrade any time.",
      monthlyPrice: 0, yearlyPrice: 0, includedCredits: 15,
      features: { basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true },
    }),
    fallbackPlan({
      id: "fallback-starter", name: "starter", displayName: "Starter",
      description: "For small businesses starting with AI calling: 300 minutes a month, your own number, campaigns and knowledge base.",
      monthlyPrice: 1499, includedCredits: 300,
      maxAgents: 3, maxCampaigns: 5, maxContactsPerCampaign: 500, maxWebhooks: 3, maxKnowledgeBases: 5,
      maxFlows: 3, maxPhoneNumbers: 1, canPurchaseNumbers: true,
      features: { ...BASE_FEATURES, customVoices: true },
    }),
    fallbackPlan({
      id: "fallback-pro", name: "pro", displayName: "Growth",
      description: "For growing teams: 900 minutes a month, up to 3 numbers, your choice of LLM, API and integrations.",
      monthlyPrice: 3999, includedCredits: 900,
      maxAgents: 10, maxCampaigns: 25, maxContactsPerCampaign: 5000, maxWebhooks: 10, maxKnowledgeBases: 25,
      maxFlows: 10, maxPhoneNumbers: 3, maxWidgets: 3, canChooseLlm: true, canPurchaseNumbers: true, restApiEnabled: true,
      features: { ...BASE_FEATURES, customVoices: true, apiAccess: true, advancedAnalytics: true },
    }),
    fallbackPlan({
      id: "fallback-business", name: "business", displayName: "Business",
      description: "For call-heavy businesses: 2,500 minutes a month, 10 numbers, team access, REST API and priority support.",
      monthlyPrice: 9999, includedCredits: 2500,
      maxAgents: 25, maxCampaigns: 100, maxContactsPerCampaign: 25000, maxWebhooks: 50, maxKnowledgeBases: 100,
      maxFlows: 50, maxPhoneNumbers: 10, maxWidgets: 10, canChooseLlm: true, canPurchaseNumbers: true,
      restApiEnabled: true, teamManagementEnabled: true, maxTeamMembers: 5,
      features: { ...BASE_FEATURES, customVoices: true, apiAccess: true, advancedAnalytics: true, prioritySupport: true },
    }),
  ],
  packages: [
    { id: "fallback-100", name: "100 minutes", description: null, credits: 100, price: 549 },
    { id: "fallback-500", name: "500 minutes", description: null, credits: 500, price: 2499 },
    { id: "fallback-1000", name: "1,000 minutes", description: null, credits: 1000, price: 4499 },
    { id: "fallback-2500", name: "2,500 minutes", description: null, credits: 2500, price: 10499 },
    { id: "fallback-5000", name: "5,000 minutes", description: null, credits: 5000, price: 19999 },
  ],
};
