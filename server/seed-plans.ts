/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { db } from "./db";
import { plans } from "@shared/schema";

// Prices are INR excl. GST (Cashfree is the only gateway; GST is added at checkout).
// includedCredits = call minutes per month (yearly purchases grant 12×). Vendor cost ≈ ₹2.5/min.
// Mirrors migrations/0012_pricing_sept_2026.sql (the migration updates existing installs;
// this seed only runs on an empty plans table).
const PLAN_FEATURES = {
  free: {
    basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true,
    apiAccess: false, prioritySupport: false, customVoices: false, advancedAnalytics: false,
    whiteLabel: false, dedicatedManager: false,
  },
  starter: {
    basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true,
    apiAccess: false, prioritySupport: false, customVoices: true, advancedAnalytics: false,
    whiteLabel: false, dedicatedManager: false, batchCalling: true, webhookIntegration: true,
    ragKnowledgeBase: true, flowAutomation: true, multiLanguage: true,
  },
  growth: {
    basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true,
    apiAccess: true, prioritySupport: false, customVoices: true, advancedAnalytics: true,
    whiteLabel: false, dedicatedManager: false, batchCalling: true, webhookIntegration: true,
    ragKnowledgeBase: true, flowAutomation: true, multiLanguage: true,
  },
  business: {
    basicAnalytics: true, callRecording: true, transcription: true, emailSupport: true,
    apiAccess: true, prioritySupport: true, customVoices: true, advancedAnalytics: true,
    whiteLabel: false, dedicatedManager: false, batchCalling: true, webhookIntegration: true,
    ragKnowledgeBase: true, flowAutomation: true, multiLanguage: true,
  },
};

const PLANS_SEED_DATA = [
  {
    name: "free",
    displayName: "Free",
    description: "Try AI calling with 15 free minutes on shared numbers. Upgrade any time.",
    monthlyPrice: "0.00",
    yearlyPrice: "0.00",
    maxAgents: 1,
    maxCampaigns: 1,
    maxContactsPerCampaign: 10,
    maxWebhooks: 1,
    maxKnowledgeBases: 2,
    maxFlows: 1,
    maxPhoneNumbers: 0,
    maxWidgets: 1,
    includedCredits: 15,
    defaultLlmModel: "gpt-4o-mini",
    canChooseLlm: false,
    canPurchaseNumbers: false,
    useSystemPool: true,
    features: PLAN_FEATURES.free,
    voiceProvider: "both",
    isActive: true,
  },
  {
    name: "starter",
    displayName: "Starter",
    description: "For small businesses starting with AI calling: 300 minutes a month, your own number, campaigns and knowledge base.",
    monthlyPrice: "1499.00",
    yearlyPrice: "14990.00",
    maxAgents: 3,
    maxCampaigns: 5,
    maxContactsPerCampaign: 500,
    maxWebhooks: 3,
    maxKnowledgeBases: 5,
    maxFlows: 3,
    maxPhoneNumbers: 1,
    maxWidgets: 1,
    includedCredits: 300,
    defaultLlmModel: "gpt-4o-mini",
    canChooseLlm: false,
    canPurchaseNumbers: true,
    useSystemPool: true,
    features: PLAN_FEATURES.starter,
    voiceProvider: "both",
    isActive: true,
  },
  {
    // Keeps the legacy 'pro' name so existing subscriptions stay linked
    name: "pro",
    displayName: "Growth",
    description: "For growing teams: 900 minutes a month, up to 3 numbers, your choice of LLM, API and integrations.",
    monthlyPrice: "3999.00",
    yearlyPrice: "39990.00",
    maxAgents: 10,
    maxCampaigns: 25,
    maxContactsPerCampaign: 5000,
    maxWebhooks: 10,
    maxKnowledgeBases: 25,
    maxFlows: 10,
    maxPhoneNumbers: 3,
    maxWidgets: 3,
    includedCredits: 900,
    defaultLlmModel: null,
    canChooseLlm: true,
    canPurchaseNumbers: true,
    useSystemPool: false,
    features: PLAN_FEATURES.growth,
    voiceProvider: "both",
    restApiEnabled: true,
    isActive: true,
  },
  {
    name: "business",
    displayName: "Business",
    description: "For call-heavy businesses: 2,500 minutes a month, 10 numbers, team access, REST API and priority support.",
    monthlyPrice: "9999.00",
    yearlyPrice: "99990.00",
    maxAgents: 25,
    maxCampaigns: 100,
    maxContactsPerCampaign: 25000,
    maxWebhooks: 50,
    maxKnowledgeBases: 100,
    maxFlows: 50,
    maxPhoneNumbers: 10,
    maxWidgets: 10,
    includedCredits: 2500,
    defaultLlmModel: null,
    canChooseLlm: true,
    canPurchaseNumbers: true,
    useSystemPool: false,
    features: PLAN_FEATURES.business,
    voiceProvider: "both",
    restApiEnabled: true,
    teamManagementEnabled: true,
    maxTeamMembers: 5,
    maxCustomRoles: 3,
    isActive: true,
  },
];

async function seedPlans() {
  try {
    console.log("🌱 Starting Plans seed...");

    const existingPlans = await db.select().from(plans);

    if (existingPlans.length > 0) {
      console.log(`⚠️  Found ${existingPlans.length} existing plans. Skipping seed to prevent duplicates.`);
      console.log("   To re-seed, first delete all plans from the database.");
      return;
    }

    console.log(`📦 Inserting ${PLANS_SEED_DATA.length} subscription plans...`);
    await db.insert(plans).values(PLANS_SEED_DATA);

    console.log("✅ Successfully seeded Plans!");
    PLANS_SEED_DATA.forEach((p) => {
      console.log(`   - ${p.displayName}: ₹${p.monthlyPrice}/month, ${p.includedCredits} minutes included`);
    });

  } catch (error) {
    console.error("❌ Error seeding Plans:", error);
    throw error;
  }
}

export { seedPlans, PLANS_SEED_DATA };
