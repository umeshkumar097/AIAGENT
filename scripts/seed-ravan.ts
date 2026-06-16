import { db } from "../server/db";
import { plans } from "../shared/schema";
import { eq } from "drizzle-orm";

const NEW_PLANS = [
  {
    name: "starter",
    displayName: "Starter",
    description: "Perfect for individuals and small teams exploring AI calling.",
    monthlyPrice: "500.00",
    yearlyPrice: "4800.00",
    razorpayMonthlyPrice: "500.00",
    razorpayYearlyPrice: "4800.00",
    maxAgents: 1,
    maxCampaigns: 5,
    maxContactsPerCampaign: 50,
    maxWebhooks: 5,
    maxKnowledgeBases: 2,
    maxFlows: 5,
    maxPhoneNumbers: 1,
    includedCredits: 400,
    defaultLlmModel: "gpt-4o-mini",
    canChooseLlm: false,
    canPurchaseNumbers: true,
    useSystemPool: true,
    features: {
      basicAnalytics: true,
      callRecording: true,
      transcription: true,
      emailSupport: true,
      apiAccess: false,
      prioritySupport: false,
      customVoices: false,
      advancedAnalytics: false,
      whiteLabel: false,
      dedicatedManager: false,
      batchCalling: true,
      webhookIntegration: true,
      ragKnowledgeBase: true,
      flowAutomation: true,
      multiLanguage: false,
    },
    isActive: true,
  },
  {
    name: "growth",
    displayName: "Growth",
    description: "For growing businesses scaling their outreach operations.",
    monthlyPrice: "2500.00",
    yearlyPrice: "24000.00",
    razorpayMonthlyPrice: "2500.00",
    razorpayYearlyPrice: "24000.00",
    maxAgents: 10,
    maxCampaigns: 50,
    maxContactsPerCampaign: 1000,
    maxWebhooks: 20,
    maxKnowledgeBases: 5,
    maxFlows: 25,
    maxPhoneNumbers: 5,
    includedCredits: 1600,
    defaultLlmModel: null,
    canChooseLlm: true,
    canPurchaseNumbers: true,
    useSystemPool: false,
    features: {
      basicAnalytics: true,
      callRecording: true,
      transcription: true,
      emailSupport: true,
      apiAccess: false,
      prioritySupport: true,
      customVoices: false,
      advancedAnalytics: true,
      whiteLabel: false,
      dedicatedManager: false,
      batchCalling: true,
      webhookIntegration: true,
      ragKnowledgeBase: true,
      flowAutomation: true,
      multiLanguage: true,
    },
    isActive: true,
  },
  {
    name: "scale",
    displayName: "Scale",
    description: "High-volume teams needing maximum capabilities and reliability.",
    monthlyPrice: "4500.00",
    yearlyPrice: "43200.00",
    razorpayMonthlyPrice: "4500.00",
    razorpayYearlyPrice: "43200.00",
    maxAgents: 100,
    maxCampaigns: 500,
    maxContactsPerCampaign: 10000,
    maxWebhooks: 100,
    maxKnowledgeBases: 15,
    maxFlows: 100,
    maxPhoneNumbers: 50,
    includedCredits: 3500,
    defaultLlmModel: null,
    canChooseLlm: true,
    canPurchaseNumbers: true,
    useSystemPool: false,
    features: {
      basicAnalytics: true,
      callRecording: true,
      transcription: true,
      emailSupport: true,
      apiAccess: true,
      prioritySupport: true,
      customVoices: true,
      advancedAnalytics: true,
      whiteLabel: false,
      dedicatedManager: false,
      batchCalling: true,
      webhookIntegration: true,
      ragKnowledgeBase: true,
      flowAutomation: true,
      multiLanguage: true,
    },
    isActive: true,
  }
];

async function seed() {
  console.log("Upserting Ravan plans...");
  for (const plan of NEW_PLANS) {
    const existing = await db.select().from(plans).where(eq(plans.name, plan.name)).limit(1);
    if (existing.length > 0) {
      console.log(`Updating ${plan.name}...`);
      await db.update(plans).set(plan).where(eq(plans.name, plan.name));
    } else {
      console.log(`Inserting ${plan.name}...`);
      await db.insert(plans).values(plan);
    }
  }
  
  console.log("Done.");
  process.exit(0);
}

seed().catch(console.error);
