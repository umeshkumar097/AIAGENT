var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  AI_CATEGORY_COLORS: () => AI_CATEGORY_COLORS,
  AI_CATEGORY_LABELS: () => AI_CATEGORY_LABELS,
  AI_CATEGORY_PRIORITY: () => AI_CATEGORY_PRIORITY,
  AI_LEAD_CATEGORIES: () => AI_LEAD_CATEGORIES,
  API_SCOPES: () => API_SCOPES,
  agentVersions: () => agentVersions,
  agents: () => agents,
  analyticsScripts: () => analyticsScripts,
  apiAuditLogs: () => apiAuditLogs,
  apiKeys: () => apiKeys,
  apiRateLimits: () => apiRateLimits,
  appointmentSettings: () => appointmentSettings,
  appointments: () => appointments,
  auditLogs: () => auditLogs,
  bannedWords: () => bannedWords,
  calls: () => calls,
  campaignJobs: () => campaignJobs,
  campaigns: () => campaigns,
  contacts: () => contacts,
  contentViolations: () => contentViolations,
  createAppointmentSchema: () => createAppointmentSchema,
  createAppointmentSettingsSchema: () => createAppointmentSettingsSchema,
  createFlowSchema: () => createFlowSchema,
  createFormSchema: () => createFormSchema,
  createWebhookSchema: () => createWebhookSchema,
  creditPackages: () => creditPackages,
  creditTransactions: () => creditTransactions,
  crmCategoryPreferences: () => crmCategoryPreferences,
  demoSessions: () => demoSessions,
  determineAICategory: () => determineAICategory,
  elevenLabsCredentials: () => elevenLabsCredentials,
  emailNotificationSettings: () => emailNotificationSettings,
  emailTemplates: () => emailTemplates,
  flowExecutions: () => flowExecutions,
  flowTestQueue: () => flowTestQueue,
  flows: () => flows,
  formFields: () => formFields,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  globalSettings: () => globalSettings,
  googleCalendarCredentials: () => googleCalendarCredentials,
  googleSheetsCredentials: () => googleSheetsCredentials,
  incomingAgents: () => incomingAgents,
  incomingConnections: () => incomingConnections,
  insertAgentSchema: () => insertAgentSchema,
  insertAgentVersionSchema: () => insertAgentVersionSchema,
  insertAnalyticsScriptSchema: () => insertAnalyticsScriptSchema,
  insertApiAuditLogSchema: () => insertApiAuditLogSchema,
  insertApiKeySchema: () => insertApiKeySchema,
  insertAppointmentSchema: () => insertAppointmentSchema,
  insertAppointmentSettingsSchema: () => insertAppointmentSettingsSchema,
  insertBannedWordSchema: () => insertBannedWordSchema,
  insertCallSchema: () => insertCallSchema,
  insertCampaignJobSchema: () => insertCampaignJobSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertContactSchema: () => insertContactSchema,
  insertContentViolationSchema: () => insertContentViolationSchema,
  insertCreditPackageSchema: () => insertCreditPackageSchema,
  insertCreditTransactionSchema: () => insertCreditTransactionSchema,
  insertCrmCategoryPreferencesSchema: () => insertCrmCategoryPreferencesSchema,
  insertDemoSessionSchema: () => insertDemoSessionSchema,
  insertElevenLabsCredentialSchema: () => insertElevenLabsCredentialSchema,
  insertEmailNotificationSettingsSchema: () => insertEmailNotificationSettingsSchema,
  insertEmailTemplateSchema: () => insertEmailTemplateSchema,
  insertFlowExecutionSchema: () => insertFlowExecutionSchema,
  insertFlowSchema: () => insertFlowSchema,
  insertFlowTestQueueSchema: () => insertFlowTestQueueSchema,
  insertFormFieldSchema: () => insertFormFieldSchema,
  insertFormSchema: () => insertFormSchema,
  insertFormSubmissionSchema: () => insertFormSubmissionSchema,
  insertGlobalSettingsSchema: () => insertGlobalSettingsSchema,
  insertGoogleCalendarCredentialSchema: () => insertGoogleCalendarCredentialSchema,
  insertGoogleSheetsCredentialSchema: () => insertGoogleSheetsCredentialSchema,
  insertIncomingAgentSchema: () => insertIncomingAgentSchema,
  insertIncomingConnectionSchema: () => insertIncomingConnectionSchema,
  insertInvoiceSchema: () => insertInvoiceSchema,
  insertKnowledgeBaseSchema: () => insertKnowledgeBaseSchema,
  insertKnowledgeChunkSchema: () => insertKnowledgeChunkSchema,
  insertKnowledgeProcessingQueueSchema: () => insertKnowledgeProcessingQueueSchema,
  insertLeadActivitySchema: () => insertLeadActivitySchema,
  insertLeadNoteSchema: () => insertLeadNoteSchema,
  insertLeadSchema: () => insertLeadSchema,
  insertLeadStageSchema: () => insertLeadStageSchema,
  insertLegacyWebhookDeliverySchema: () => insertLegacyWebhookDeliverySchema,
  insertLegacyWebhookSchema: () => insertLegacyWebhookSchema,
  insertLlmModelSchema: () => insertLlmModelSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertOpenaiCredentialSchema: () => insertOpenaiCredentialSchema,
  insertPaymentTransactionSchema: () => insertPaymentTransactionSchema,
  insertPaymentWebhookQueueSchema: () => insertPaymentWebhookQueueSchema,
  insertPhoneNumberRentalSchema: () => insertPhoneNumberRentalSchema,
  insertPhoneNumberSchema: () => insertPhoneNumberSchema,
  insertPhoneReleaseRetryQueueSchema: () => insertPhoneReleaseRetryQueueSchema,
  insertPlanSchema: () => insertPlanSchema,
  insertPlatformLanguageSchema: () => insertPlatformLanguageSchema,
  insertPlivoCallSchema: () => insertPlivoCallSchema,
  insertPlivoCredentialSchema: () => insertPlivoCredentialSchema,
  insertPlivoPhoneNumberSchema: () => insertPlivoPhoneNumberSchema,
  insertPlivoPhonePricingSchema: () => insertPlivoPhonePricingSchema,
  insertPromptTemplateSchema: () => insertPromptTemplateSchema,
  insertRefundSchema: () => insertRefundSchema,
  insertSeoSettingsSchema: () => insertSeoSettingsSchema,
  insertSipCallSchema: () => insertSipCallSchema,
  insertSipPhoneNumberSchema: () => insertSipPhoneNumberSchema,
  insertSipTrunkSchema: () => insertSipTrunkSchema,
  insertSupportedLanguageSchema: () => insertSupportedLanguageSchema,
  insertSyncedVoiceSchema: () => insertSyncedVoiceSchema,
  insertToolSchema: () => insertToolSchema,
  insertTwilioCountrySchema: () => insertTwilioCountrySchema,
  insertTwilioOpenaiCallSchema: () => insertTwilioOpenaiCallSchema,
  insertUsageRecordSchema: () => insertUsageRecordSchema,
  insertUserAddressSchema: () => insertUserAddressSchema,
  insertUserFeedbackSchema: () => insertUserFeedbackSchema,
  insertUserKnowledgeStorageLimitSchema: () => insertUserKnowledgeStorageLimitSchema,
  insertUserKycDocumentSchema: () => insertUserKycDocumentSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSubscriptionSchema: () => insertUserSubscriptionSchema,
  insertVoiceSchema: () => insertVoiceSchema,
  insertWebhookLogSchema: () => insertWebhookLogSchema,
  insertWebhookSchema: () => insertWebhookSchema,
  insertWebsiteWidgetSchema: () => insertWebsiteWidgetSchema,
  insertWidgetCallSessionSchema: () => insertWidgetCallSessionSchema,
  invoices: () => invoices,
  knowledgeBase: () => knowledgeBase,
  knowledgeChunks: () => knowledgeChunks,
  knowledgeProcessingQueue: () => knowledgeProcessingQueue,
  leadActivities: () => leadActivities,
  leadNotes: () => leadNotes,
  leadStages: () => leadStages,
  leads: () => leads,
  legacyWebhookDeliveries: () => legacyWebhookDeliveries,
  legacyWebhooks: () => legacyWebhooks,
  llmModels: () => llmModels,
  notifications: () => notifications,
  openaiCredentials: () => openaiCredentials,
  otpVerifications: () => otpVerifications,
  paymentTransactions: () => paymentTransactions,
  paymentWebhookQueue: () => paymentWebhookQueue,
  phoneNumberRentals: () => phoneNumberRentals,
  phoneNumbers: () => phoneNumbers,
  phoneReleaseRetryQueue: () => phoneReleaseRetryQueue,
  plans: () => plans,
  platformLanguages: () => platformLanguages,
  plivoCalls: () => plivoCalls,
  plivoCredentials: () => plivoCredentials,
  plivoPhoneNumbers: () => plivoPhoneNumbers,
  plivoPhonePricing: () => plivoPhonePricing,
  promptTemplates: () => promptTemplates,
  refreshTokens: () => refreshTokens,
  refunds: () => refunds,
  seoSettings: () => seoSettings,
  sipCalls: () => sipCalls,
  sipPhoneNumbers: () => sipPhoneNumbers,
  sipTrunks: () => sipTrunks,
  supportedLanguages: () => supportedLanguages,
  syncedVoices: () => syncedVoices,
  tools: () => tools,
  twilioCountries: () => twilioCountries,
  twilioOpenaiCalls: () => twilioOpenaiCalls,
  usageRecords: () => usageRecords,
  userAddresses: () => userAddresses,
  userFeedback: () => userFeedback,
  userKnowledgeStorageLimits: () => userKnowledgeStorageLimits,
  userKycDocuments: () => userKycDocuments,
  userSubscriptions: () => userSubscriptions,
  users: () => users,
  voices: () => voices,
  webhookDeliveryLogs: () => webhookDeliveryLogs,
  webhookLogs: () => webhookLogs,
  webhookSubscriptions: () => webhookSubscriptions,
  webhooks: () => webhooks,
  websiteWidgets: () => websiteWidgets,
  widgetCallSessions: () => widgetCallSessions
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal, doublePrecision, serial, date, time, unique, uniqueIndex, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
function determineAICategory(lead) {
  if (lead.hasAppointment) return AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED;
  if (lead.hasFormSubmission) return AI_LEAD_CATEGORIES.FORM_SUBMITTED;
  if (lead.hasTransfer) return AI_LEAD_CATEGORIES.CALL_TRANSFER;
  if (lead.hasCallback || lead.callbackScheduled) return AI_LEAD_CATEGORIES.NEED_FOLLOW_UP;
  if (lead.leadScore !== null && lead.leadScore !== void 0) {
    if (lead.leadScore >= 70) return AI_LEAD_CATEGORIES.HOT;
    if (lead.leadScore >= 40) return AI_LEAD_CATEGORIES.WARM;
  }
  if (lead.sentiment === "positive") return AI_LEAD_CATEGORIES.WARM;
  return null;
}
var users, otpVerifications, refreshTokens, elevenLabsCredentials, syncedVoices, agents, knowledgeBase, incomingAgents, phoneNumbers, incomingConnections, campaigns, contacts, calls, creditTransactions, tools, voices, plans, globalSettings, llmModels, supportedLanguages, creditPackages, userSubscriptions, phoneNumberRentals, usageRecords, legacyWebhooks, legacyWebhookDeliveries, notifications, emailTemplates, promptTemplates, agentVersions, auditLogs, platformLanguages, insertUserSchema, insertElevenLabsCredentialSchema, insertSyncedVoiceSchema, insertAgentSchema, insertKnowledgeBaseSchema, insertIncomingAgentSchema, insertPromptTemplateSchema, insertAgentVersionSchema, insertIncomingConnectionSchema, insertCampaignSchema, insertContactSchema, insertCallSchema, insertCreditTransactionSchema, insertToolSchema, insertVoiceSchema, insertPlanSchema, insertGlobalSettingsSchema, insertLlmModelSchema, insertSupportedLanguageSchema, insertPlatformLanguageSchema, insertCreditPackageSchema, insertUserSubscriptionSchema, insertPhoneNumberSchema, insertUsageRecordSchema, insertLegacyWebhookSchema, insertLegacyWebhookDeliverySchema, insertPhoneNumberRentalSchema, insertNotificationSchema, insertEmailTemplateSchema, twilioCountries, insertTwilioCountrySchema, userKnowledgeStorageLimits, knowledgeChunks, knowledgeProcessingQueue, insertUserKnowledgeStorageLimitSchema, insertKnowledgeChunkSchema, insertKnowledgeProcessingQueueSchema, flows, insertFlowSchema, createFlowSchema, flowExecutions, insertFlowExecutionSchema, flowTestQueue, insertFlowTestQueueSchema, webhookSubscriptions, webhooks, insertWebhookSchema, createWebhookSchema, webhookDeliveryLogs, webhookLogs, insertWebhookLogSchema, appointments, insertAppointmentSchema, createAppointmentSchema, appointmentSettings, insertAppointmentSettingsSchema, createAppointmentSettingsSchema, forms, insertFormSchema, createFormSchema, formFields, insertFormFieldSchema, formSubmissions, insertFormSubmissionSchema, seoSettings, insertSeoSettingsSchema, analyticsScripts, insertAnalyticsScriptSchema, paymentTransactions, insertPaymentTransactionSchema, refunds, insertRefundSchema, invoices, insertInvoiceSchema, paymentWebhookQueue, insertPaymentWebhookQueueSchema, emailNotificationSettings, insertEmailNotificationSettingsSchema, bannedWords, insertBannedWordSchema, contentViolations, insertContentViolationSchema, openaiCredentials, insertOpenaiCredentialSchema, plivoCredentials, insertPlivoCredentialSchema, plivoPhoneNumbers, insertPlivoPhoneNumberSchema, plivoCalls, insertPlivoCallSchema, campaignJobs, insertCampaignJobSchema, plivoPhonePricing, insertPlivoPhonePricingSchema, userKycDocuments, insertUserKycDocumentSchema, twilioOpenaiCalls, insertTwilioOpenaiCallSchema, demoSessions, insertDemoSessionSchema, leadStages, insertLeadStageSchema, leads, insertLeadSchema, AI_LEAD_CATEGORIES, AI_CATEGORY_LABELS, AI_CATEGORY_COLORS, AI_CATEGORY_PRIORITY, leadNotes, insertLeadNoteSchema, leadActivities, insertLeadActivitySchema, crmCategoryPreferences, insertCrmCategoryPreferencesSchema, websiteWidgets, insertWebsiteWidgetSchema, widgetCallSessions, insertWidgetCallSessionSchema, API_SCOPES, apiKeys, insertApiKeySchema, apiAuditLogs, insertApiAuditLogSchema, apiRateLimits, sipTrunks, insertSipTrunkSchema, sipPhoneNumbers, insertSipPhoneNumberSchema, sipCalls, insertSipCallSchema, userAddresses, insertUserAddressSchema, userFeedback, insertUserFeedbackSchema, googleCalendarCredentials, insertGoogleCalendarCredentialSchema, googleSheetsCredentials, insertGoogleSheetsCredentialSchema, phoneReleaseRetryQueue, insertPhoneReleaseRetryQueueSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      name: text("name").notNull(),
      role: text("role").notNull().default("user"),
      planType: text("plan_type").notNull().default("free"),
      // 'free' or 'pro'
      planExpiresAt: timestamp("plan_expires_at"),
      credits: integer("credits").notNull().default(0),
      isActive: boolean("is_active").notNull().default(true),
      stripeCustomerId: text("stripe_customer_id"),
      stripeSubscriptionId: text("stripe_subscription_id"),
      maxWebhooks: integer("max_webhooks").notNull().default(3),
      // Webhook subscription limit (admin can adjust)
      isDeleted: boolean("is_deleted").notNull().default(false),
      // Soft delete flag - user requested account deletion
      deletedAt: timestamp("deleted_at"),
      // When the user requested deletion
      deletedBy: varchar("deleted_by"),
      // Who deleted: 'user' for self-deletion, admin user ID for admin deletion
      // Timezone preference - IANA timezone string (e.g., "America/New_York", "Europe/London")
      timezone: text("timezone"),
      // GDPR Consent preferences
      cookieConsent: boolean("cookie_consent"),
      // Essential cookies always enabled, this tracks analytics/marketing consent
      analyticsConsent: boolean("analytics_consent"),
      marketingConsent: boolean("marketing_consent"),
      consentTimestamp: timestamp("consent_timestamp"),
      // When user gave/updated consent
      termsAcceptedAt: timestamp("terms_accepted_at"),
      // When user accepted Terms of Service
      privacyAcceptedAt: timestamp("privacy_accepted_at"),
      // When user accepted Privacy Policy
      // User blocking for content violations
      blockedReason: text("blocked_reason"),
      // Reason for blocking (e.g., "Content violation: banned words detected")
      blockedAt: timestamp("blocked_at"),
      // When the user was blocked
      blockedBy: varchar("blocked_by"),
      // Admin who blocked the user
      // ElevenLabs Multi-Key Pool Affinity - Once assigned, user's agents and phone numbers stay on this key
      elevenLabsCredentialId: varchar("eleven_labs_credential_id"),
      // References elevenLabsCredentials.id (can't use .references() due to declaration order)
      // User-level KYC for phone number purchases
      kycStatus: text("kyc_status").default("pending"),
      // pending, submitted, approved, rejected
      kycSubmittedAt: timestamp("kyc_submitted_at"),
      kycApprovedAt: timestamp("kyc_approved_at"),
      kycRejectionReason: text("kyc_rejection_reason"),
      // Billing Details - Stored for payment processing and pre-filling
      billingName: text("billing_name"),
      billingAddressLine1: text("billing_address_line1"),
      billingAddressLine2: text("billing_address_line2"),
      billingCity: text("billing_city"),
      billingState: text("billing_state"),
      billingPostalCode: text("billing_postal_code"),
      billingCountry: text("billing_country"),
      company: text("company"),
      // Company name for profile and team naming
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    otpVerifications = pgTable("otp_verifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: text("email").notNull(),
      otpCode: text("otp_code").notNull(),
      expiresAt: timestamp("expires_at").notNull(),
      attempts: integer("attempts").notNull().default(0),
      verified: boolean("verified").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    refreshTokens = pgTable("refresh_tokens", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      token: text("token").notNull().unique(),
      expiresAt: timestamp("expires_at").notNull(),
      isValid: boolean("is_valid").notNull().default(true),
      userAgent: text("user_agent"),
      ipAddress: text("ip_address"),
      lastUsedAt: timestamp("last_used_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      refreshTokensUserIdIdx: index("refresh_tokens_user_id_idx").on(table.userId),
      refreshTokensExpiresAtIdx: index("refresh_tokens_expires_at_idx").on(table.expiresAt)
    }));
    elevenLabsCredentials = pgTable("eleven_labs_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      // Friendly name for the key (e.g., "Primary Account", "Backup Key 1")
      apiKey: text("api_key").notNull(),
      webhookSecret: text("webhook_secret"),
      // HMAC secret for verifying webhooks from this ElevenLabs workspace (nullable for migration)
      isActive: boolean("is_active").notNull().default(true),
      maxConcurrency: integer("max_concurrency").notNull().default(30),
      // ElevenLabs default limit
      currentLoad: integer("current_load").notNull().default(0),
      // Current active calls using this key
      totalAssignedAgents: integer("total_assigned_agents").notNull().default(0),
      // How many agents use this key
      totalAssignedUsers: integer("total_assigned_users").notNull().default(0),
      // How many users are assigned to this key
      maxAgentsThreshold: integer("max_agents_threshold").notNull().default(100),
      // Soft limit before moving to next key
      lastHealthCheck: timestamp("last_health_check"),
      healthStatus: text("health_status").notNull().default("healthy"),
      // healthy, degraded, unhealthy
      metadata: jsonb("metadata"),
      // For storing additional info like account tier, limits, etc.
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    syncedVoices = pgTable("synced_voices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      credentialId: varchar("credential_id").notNull().references(() => elevenLabsCredentials.id, { onDelete: "cascade" }),
      voiceId: text("voice_id").notNull(),
      // ElevenLabs voice_id
      publicOwnerId: text("public_owner_id").notNull(),
      // Voice owner's public ID for API call
      voiceName: text("voice_name"),
      // Cached voice name for display
      status: text("status").notNull().default("synced"),
      // synced, failed, pending
      errorMessage: text("error_message"),
      syncedAt: timestamp("synced_at").notNull().defaultNow()
    }, (table) => ({
      credentialVoiceUnique: unique().on(table.credentialId, table.voiceId)
    }));
    agents = pgTable("agents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Which API key this agent uses
      // Telephony Provider Configuration - Determines which engine handles calls
      // 'twilio' = ElevenLabs Conversational AI via Twilio (default)
      // 'plivo' = Plivo telephony + OpenAI Realtime API
      // 'twilio_openai' = Twilio telephony + OpenAI Realtime API
      // 'elevenlabs-sip' = ElevenLabs native SIP (user's own SIP trunk)
      // 'openai-sip' = OpenAI Realtime API with SIP (incoming only)
      telephonyProvider: text("telephony_provider").default("twilio"),
      // 'twilio' | 'plivo' | 'twilio_openai' | 'elevenlabs-sip' | 'openai-sip'
      // SIP Trunk Configuration (used when telephonyProvider='elevenlabs-sip' or 'openai-sip')
      sipTrunkId: varchar("sip_trunk_id"),
      // References sip_trunks.id for SIP-based engines
      sipPhoneNumberId: varchar("sip_phone_number_id"),
      // References sip_phone_numbers.id for SIP-based calls
      // OpenAI Realtime Configuration (used when telephonyProvider='plivo', 'twilio_openai', or 'openai-sip')
      openaiVoice: text("openai_voice"),
      // 'alloy' | 'echo' | 'shimmer' | 'ash' | 'ballad' | 'coral' | 'sage' | 'verse' | 'cedar' | 'marin'
      openaiCredentialId: varchar("openai_credential_id"),
      // References openaiCredentials.id (can't use .references() due to declaration order)
      // Agent Type: Determines execution pipeline and usage
      // NO DEFAULT - must be explicitly set to prevent misconfiguration
      type: text("type").notNull(),
      // 'incoming' (ElevenLabs Conversational AI for receiving calls) or 'flow' (STT+TTS+FlowExecutionBridge for campaigns)
      // Incoming Agent Fields (used when type='incoming')
      // Incoming agents are used for receiving calls on purchased phone numbers with call transfer capability
      name: text("name").notNull(),
      voiceTone: text("voice_tone"),
      personality: text("personality"),
      systemPrompt: text("system_prompt"),
      language: text("language").default("en"),
      firstMessage: text("first_message").default("Hello! How can I help you today?"),
      llmModel: text("llm_model").default("gpt-4o-mini"),
      temperature: doublePrecision("temperature").default(0.5),
      elevenLabsAgentId: text("eleven_labs_agent_id"),
      // Call Transfer Configuration (for incoming agents)
      transferPhoneNumber: text("transfer_phone_number"),
      transferEnabled: boolean("transfer_enabled").default(false),
      // ElevenLabs System Tools Configuration (for incoming agents)
      detectLanguageEnabled: boolean("detect_language_enabled").default(false),
      endConversationEnabled: boolean("end_conversation_enabled").default(false),
      appointmentBookingEnabled: boolean("appointment_booking_enabled").default(false),
      messagingEmailEnabled: boolean("messaging_email_enabled").default(false),
      messagingWhatsappEnabled: boolean("messaging_whatsapp_enabled").default(false),
      messagingEmailTemplate: text("messaging_email_template"),
      messagingWhatsappTemplate: text("messaging_whatsapp_template"),
      messagingWhatsappVariables: text("messaging_whatsapp_variables"),
      expressiveMode: boolean("expressive_mode").default(false),
      // Knowledge Base (for incoming agents)
      knowledgeBaseIds: text("knowledge_base_ids").array(),
      // Shared Voice Configuration (used by both Incoming and Flow agents)
      elevenLabsVoiceId: text("eleven_labs_voice_id"),
      voiceStability: doublePrecision("voice_stability").default(0.65),
      voiceSimilarityBoost: doublePrecision("voice_similarity_boost").default(0.85),
      voiceSpeed: doublePrecision("voice_speed").default(0.92),
      turnTimeout: doublePrecision("turn_timeout").default(1.5),
      // Flow Agent Fields (used when type='flow')
      flowId: varchar("flow_id"),
      // Reference to flows table for Flow Agents
      maxDurationSeconds: integer("max_duration_seconds").default(600),
      // Max conversation duration in seconds (default 10 min, range 60-1800)
      // Legacy/Common Fields
      agentLink: text("agent_link"),
      config: jsonb("config"),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    knowledgeBase = pgTable("knowledge_base", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      title: text("title").notNull(),
      content: text("content"),
      url: text("url"),
      fileUrl: text("file_url"),
      elevenLabsDocId: text("eleven_labs_doc_id"),
      metadata: jsonb("metadata"),
      storageSize: integer("storage_size").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    incomingAgents = pgTable("incoming_agents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Basic Configuration
      name: text("name").notNull(),
      elevenLabsAgentId: text("eleven_labs_agent_id").notNull(),
      // Always uses ElevenLabs Conversational AI
      elevenLabsVoiceId: text("eleven_labs_voice_id").notNull(),
      language: text("language").notNull().default("en"),
      // AI Configuration
      systemPrompt: text("system_prompt").notNull(),
      personality: text("personality").default("helpful"),
      voiceTone: text("voice_tone").default("professional"),
      firstMessage: text("first_message").notNull().default("Hello! How can I help you today?"),
      llmModel: text("llm_model").default("gpt-4o-mini"),
      temperature: doublePrecision("temperature").default(0.5),
      // Call Transfer Configuration
      transferPhoneNumber: text("transfer_phone_number"),
      // Phone number to transfer calls to
      transferEnabled: boolean("transfer_enabled").notNull().default(false),
      // Business Hours Configuration
      businessHoursEnabled: boolean("business_hours_enabled").notNull().default(false),
      businessHoursStart: text("business_hours_start"),
      // Format: "09:00"
      businessHoursEnd: text("business_hours_end"),
      // Format: "17:00"
      businessDays: text("business_days").array(),
      // ["monday", "tuesday", etc.]
      businessHoursTimezone: text("business_hours_timezone").default("America/New_York"),
      afterHoursMessage: text("after_hours_message").default("Thank you for calling. We're currently closed. Please call back during business hours."),
      // Knowledge Base
      knowledgeBaseIds: text("knowledge_base_ids").array(),
      // Metadata
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      agentsUserIdIdx: index("agents_user_id_idx").on(table.userId),
      agentsCredentialIdIdx: index("agents_credential_id_idx").on(table.elevenLabsCredentialId),
      agentsElevenLabsAgentIdIdx: index("agents_eleven_labs_agent_id_idx").on(table.elevenLabsAgentId)
    }));
    phoneNumbers = pgTable("phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Nullable for system pool numbers
      phoneNumber: text("phone_number").notNull().unique(),
      twilioSid: text("twilio_sid").notNull().unique(),
      elevenLabsPhoneNumberId: text("eleven_labs_phone_number_id"),
      // ElevenLabs phone_number_id for synced numbers
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Which API key this phone number uses (for multi-API key pool isolation)
      friendlyName: text("friendly_name"),
      country: text("country").notNull().default("US"),
      capabilities: jsonb("capabilities"),
      status: text("status").notNull().default("active"),
      isSystemPool: boolean("is_system_pool").notNull().default(false),
      // For free plan numbers
      purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
      monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }),
      monthlyCredits: integer("monthly_credits"),
      // Credits charged per month for user-purchased numbers
      nextBillingDate: timestamp("next_billing_date"),
      // Next date when credits will be charged
      purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      credentialsSyncedAt: timestamp("credentials_synced_at"),
      // Last time Twilio credentials were re-synced into ElevenLabs (null = never explicitly synced)
      // DEPRECATED: Use incoming_connections table instead
      assignedIncomingAgentId: varchar("assigned_incoming_agent_id").references(() => incomingAgents.id, { onDelete: "set null" })
    }, (table) => ({
      phoneNumbersUserIdIdx: index("phone_numbers_user_id_idx").on(table.userId),
      phoneNumbersStatusIdx: index("phone_numbers_status_idx").on(table.status),
      phoneNumbersNextBillingDateIdx: index("phone_numbers_next_billing_date_idx").on(table.nextBillingDate)
    }));
    incomingConnections = pgTable("incoming_connections", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
      // Must be type='incoming'
      phoneNumberId: varchar("phone_number_id").notNull().references(() => phoneNumbers.id, { onDelete: "cascade" }).unique(),
      // One connection per phone number
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    campaigns = pgTable("campaigns", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      voiceId: text("voice_id"),
      phoneNumberId: varchar("phone_number_id").references(() => phoneNumbers.id, { onDelete: "set null" }),
      sipPhoneNumberId: varchar("sip_phone_number_id"),
      // References sip_phone_numbers.id for SIP-based campaigns (plugin)
      plivoPhoneNumberId: varchar("plivo_phone_number_id"),
      // References plivo_phone_numbers.id for Plivo-based campaigns
      flowId: varchar("flow_id"),
      // Reference to visual conversation flow (mutually exclusive with script)
      name: text("name").notNull(),
      type: text("type").notNull(),
      goal: text("goal"),
      script: text("script"),
      status: text("status").notNull().default("pending"),
      totalContacts: integer("total_contacts").notNull().default(0),
      completedCalls: integer("completed_calls").notNull().default(0),
      successfulCalls: integer("successful_calls").notNull().default(0),
      failedCalls: integer("failed_calls").notNull().default(0),
      scheduledFor: timestamp("scheduled_for"),
      startedAt: timestamp("started_at"),
      completedAt: timestamp("completed_at"),
      deletedAt: timestamp("deleted_at"),
      // Campaign Time Scheduling
      scheduleEnabled: boolean("schedule_enabled").notNull().default(false),
      // Whether to respect time windows
      scheduleTimeStart: text("schedule_time_start"),
      // Start time in HH:MM format (e.g., "09:00")
      scheduleTimeEnd: text("schedule_time_end"),
      // End time in HH:MM format (e.g., "17:00")
      scheduleDays: text("schedule_days").array(),
      // Array of days: ["monday", "tuesday", "wednesday", etc.]
      scheduleTimezone: text("schedule_timezone").default("America/New_York"),
      // Timezone for the schedule
      // ElevenLabs Batch Calling Integration
      batchJobId: text("batch_job_id"),
      // ElevenLabs batch job ID when campaign is running
      batchJobStatus: text("batch_job_status"),
      // pending, in_progress, completed, failed, cancelled
      retryEnabled: boolean("retry_enabled").notNull().default(false),
      // Whether to auto-retry failed/no-response calls
      // Contact Retry System - configures automatic re-calling of contacts that didn't answer
      retryMaxAttempts: integer("retry_max_attempts").default(3),
      // Max total call attempts per contact (including first)
      retryIntervalMinutes: integer("retry_interval_minutes").default(60),
      // Minutes between retry passes
      retryOnNoAnswer: boolean("retry_on_no_answer").default(true),
      // Retry contacts that didn't answer
      retryOnBusy: boolean("retry_on_busy").default(false),
      // Retry contacts that were busy
      retryOnFailed: boolean("retry_on_failed").default(false),
      // Retry contacts that failed (technical error)
      batchJobHistory: jsonb("batch_job_history").default([]),
      // Array of {batchJobId, pass, contactCount, createdAt}
      currentRetryPass: integer("current_retry_pass").default(0),
      // Which pass we're currently on (0 = initial, 1+ = retries)
      // Error tracking for failed campaigns
      errorMessage: text("error_message"),
      // Detailed error message when campaign fails
      errorCode: text("error_code"),
      // Error code for categorization (e.g., AGENT_NOT_SYNCED, NO_CONTACTS)
      config: jsonb("config"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      campaignsUserIdIdx: index("campaigns_user_id_idx").on(table.userId),
      campaignsStatusIdx: index("campaigns_status_idx").on(table.status),
      campaignsDeletedAtIdx: index("campaigns_deleted_at_idx").on(table.deletedAt),
      campaignsAgentIdIdx: index("campaigns_agent_id_idx").on(table.agentId)
    }));
    contacts = pgTable("contacts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
      firstName: text("first_name").notNull(),
      lastName: text("last_name"),
      phone: text("phone").notNull(),
      email: text("email"),
      customFields: jsonb("custom_fields"),
      status: text("status").notNull().default("pending"),
      // Retry attempt tracking
      attemptCount: integer("attempt_count").default(1),
      // How many call attempts have been made (1 = first call in progress)
      lastAttemptAt: timestamp("last_attempt_at"),
      // When the last call was attempted
      nextRetryAt: timestamp("next_retry_at"),
      // When the next retry is scheduled (null if not queued)
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      contactsCampaignIdIdx: index("contacts_campaign_id_idx").on(table.campaignId),
      contactsStatusIdx: index("contacts_status_idx").on(table.status)
      // Note: contacts has no userId column — ownership is via campaignId → campaigns.userId.
    }));
    calls = pgTable("calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Direct user ownership for guaranteed isolation
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      // Nullable for test/manual/incoming calls
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      // Nullable for test/incoming calls
      // Agent references - either from campaign (agentId via campaigns table) or incoming call (via connection)
      incomingConnectionId: varchar("incoming_connection_id").references(() => incomingConnections.id, { onDelete: "set null" }),
      // For incoming calls
      // Website Widget reference - for calls initiated through embeddable widgets
      widgetId: varchar("widget_id"),
      // References websiteWidgets.id (added later in schema)
      // DEPRECATED: Use incomingConnectionId instead
      incomingAgentId: varchar("incoming_agent_id").references(() => incomingAgents.id, { onDelete: "set null" }),
      phoneNumber: text("phone_number"),
      // Phone number dialed/caller (for test calls without contacts, or incoming caller)
      fromNumber: text("from_number"),
      // The phone number that initiated the call (caller ID)
      toNumber: text("to_number"),
      // The phone number that received the call (destination)
      twilioSid: text("twilio_sid"),
      elevenLabsConversationId: text("elevenlabs_conversation_id"),
      // ElevenLabs conversation ID for fetching details/recordings
      status: text("status").notNull().default("pending"),
      callDirection: text("call_direction").notNull().default("outgoing"),
      // 'incoming' or 'outgoing'
      duration: integer("duration"),
      recordingUrl: text("recording_url"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      classification: text("classification"),
      sentiment: text("sentiment"),
      metadata: jsonb("metadata"),
      wasTransferred: boolean("was_transferred").default(false),
      // Whether call was transferred
      transferredTo: text("transferred_to"),
      // Number call was transferred to
      transferredAt: timestamp("transferred_at"),
      // When call was transferred
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      agentId: varchar("agent_id"),
      engineType: text("engine_type"),
      creditsUsed: integer("credits_used").default(0)
    }, (table) => ({
      callsUserIdIdx: index("calls_user_id_idx").on(table.userId),
      callsCampaignIdIdx: index("calls_campaign_id_idx").on(table.campaignId),
      callsContactIdIdx: index("calls_contact_id_idx").on(table.contactId),
      callsStatusIdx: index("calls_status_idx").on(table.status),
      callsCreatedAtIdx: index("calls_created_at_idx").on(table.createdAt),
      callsTwilioSidIdx: index("calls_twilio_sid_idx").on(table.twilioSid),
      callsElevenLabsConversationIdIdx: index("calls_elevenlabs_conversation_id_idx").on(table.elevenLabsConversationId),
      callsAgentIdIdx: index("calls_agent_id_idx").on(table.agentId)
    }));
    creditTransactions = pgTable("credit_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      amount: integer("amount").notNull(),
      description: text("description").notNull(),
      reference: text("reference"),
      stripePaymentId: text("stripe_payment_id").unique(),
      // Unique constraint for idempotency
      widgetId: varchar("widget_id"),
      // For widget-originated credit deductions
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      userReferenceUnique: uniqueIndex("credit_transactions_user_reference_unique").on(table.userId, table.reference).where(sql`reference IS NOT NULL`),
      creditTransactionsUserIdIdx: index("credit_transactions_user_id_idx").on(table.userId),
      creditTransactionsCreatedAtIdx: index("credit_transactions_created_at_idx").on(table.createdAt)
    }));
    tools = pgTable("tools", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      type: text("type").notNull(),
      config: jsonb("config").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    voices = pgTable("voices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      elevenLabsVoiceId: text("eleven_labs_voice_id"),
      gender: text("gender"),
      accent: text("accent"),
      tone: text("tone"),
      isCustom: boolean("is_custom").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    plans = pgTable("plans", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull().unique(),
      // 'free' or 'pro'
      displayName: text("display_name").notNull(),
      description: text("description").notNull(),
      monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
      // USD price
      yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }),
      // USD price
      razorpayMonthlyPrice: decimal("razorpay_monthly_price", { precision: 10, scale: 2 }),
      // INR price
      razorpayYearlyPrice: decimal("razorpay_yearly_price", { precision: 10, scale: 2 }),
      // INR price
      stripeMonthlyPriceId: text("stripe_monthly_price_id"),
      // Stripe Price ID for monthly plan
      stripeYearlyPriceId: text("stripe_yearly_price_id"),
      // Stripe Price ID for yearly plan
      stripeProductId: text("stripe_product_id"),
      // Stripe Product ID
      razorpayPlanId: text("razorpay_plan_id"),
      // Razorpay Plan ID (monthly)
      razorpayYearlyPlanId: text("razorpay_yearly_plan_id"),
      // Razorpay Plan ID (yearly)
      // PayPal pricing and plan IDs
      paypalMonthlyPrice: decimal("paypal_monthly_price", { precision: 10, scale: 2 }),
      // PayPal price (supports multiple currencies)
      paypalYearlyPrice: decimal("paypal_yearly_price", { precision: 10, scale: 2 }),
      paypalProductId: text("paypal_product_id"),
      // PayPal Product ID
      paypalMonthlyPlanId: text("paypal_monthly_plan_id"),
      // PayPal Plan ID for monthly
      paypalYearlyPlanId: text("paypal_yearly_plan_id"),
      // PayPal Plan ID for yearly
      // Paystack pricing and plan codes (Africa: NGN, GHS, ZAR, KES)
      paystackMonthlyPrice: decimal("paystack_monthly_price", { precision: 10, scale: 2 }),
      paystackYearlyPrice: decimal("paystack_yearly_price", { precision: 10, scale: 2 }),
      paystackMonthlyPlanCode: text("paystack_monthly_plan_code"),
      // Paystack Plan Code for monthly
      paystackYearlyPlanCode: text("paystack_yearly_plan_code"),
      // Paystack Plan Code for yearly
      // MercadoPago pricing and plan IDs (LATAM: BRL, MXN, ARS, CLP, COP)
      mercadopagoMonthlyPrice: decimal("mercadopago_monthly_price", { precision: 10, scale: 2 }),
      mercadopagoYearlyPrice: decimal("mercadopago_yearly_price", { precision: 10, scale: 2 }),
      mercadopagoMonthlyPlanId: text("mercadopago_monthly_plan_id"),
      // MercadoPago preapproval_plan_id
      mercadopagoYearlyPlanId: text("mercadopago_yearly_plan_id"),
      maxAgents: integer("max_agents").notNull().default(1),
      maxCampaigns: integer("max_campaigns").notNull().default(1),
      maxContactsPerCampaign: integer("max_contacts_per_campaign").notNull().default(5),
      maxWebhooks: integer("max_webhooks").notNull().default(3),
      // Max webhook subscriptions
      maxKnowledgeBases: integer("max_knowledge_bases").notNull().default(5),
      // Max knowledge base items
      maxFlows: integer("max_flows").notNull().default(3),
      // Max flow automations
      maxPhoneNumbers: integer("max_phone_numbers").notNull().default(1),
      // Max rented phone numbers
      maxWidgets: integer("max_widgets").notNull().default(1),
      // Max website widgets
      includedCredits: integer("included_credits").notNull().default(0),
      defaultLlmModel: text("default_llm_model"),
      // For free plan restrictions
      canChooseLlm: boolean("can_choose_llm").notNull().default(false),
      canPurchaseNumbers: boolean("can_purchase_numbers").notNull().default(false),
      useSystemPool: boolean("use_system_pool").notNull().default(true),
      // Free plan uses system pool
      features: jsonb("features"),
      // Additional feature flags
      // Voice Engine - Controls which AI/telephony providers are shown to the user
      // 'openai'      → Normal plan: OpenAI voices + Twilio only
      // 'elevenlabs'  → Indian Voice plan: ElevenLabs voices + Plivo only
      // 'both'        → All engines visible (admin / premium plans)
      voiceProvider: text("voice_provider").notNull().default("openai"),
      // SIP Engine Plugin - Plan-level access control
      sipEnabled: boolean("sip_enabled").notNull().default(false),
      maxConcurrentSipCalls: integer("max_concurrent_sip_calls").notNull().default(1),
      sipEnginesAllowed: text("sip_engines_allowed").array().default(sql`ARRAY['elevenlabs-sip']::text[]`),
      // ['elevenlabs-sip', 'openai-sip']
      // REST API Plugin - Plan-level access control
      restApiEnabled: boolean("rest_api_enabled").notNull().default(false),
      // Team Management Plugin - Plan-level access control
      teamManagementEnabled: boolean("team_management_enabled").notNull().default(false),
      maxTeamMembers: integer("max_team_members").notNull().default(0),
      // 0 = disabled
      maxCustomRoles: integer("max_custom_roles").notNull().default(0),
      // 0 = disabled
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    globalSettings = pgTable("global_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: text("key").notNull().unique(),
      value: jsonb("value").notNull(),
      description: text("description"),
      updatedBy: varchar("updated_by").references(() => users.id),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    llmModels = pgTable("llm_models", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      modelId: text("model_id").notNull().unique(),
      // e.g., 'gpt-4o-mini', 'claude-3-5-sonnet'
      name: text("name").notNull(),
      // Display name e.g., 'GPT-4o Mini (OpenAI)'
      provider: text("provider").notNull(),
      // 'openai', 'anthropic', 'google', 'elevenlabs'
      tier: text("tier").notNull(),
      // 'free' or 'pro'
      isActive: boolean("is_active").notNull().default(true),
      sortOrder: integer("sort_order").notNull().default(0),
      // For custom ordering in UI
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    supportedLanguages = pgTable("supported_languages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: text("code").notNull().unique(),
      // ISO 639-1 code e.g., 'en', 'es', 'fr'
      label: text("label").notNull(),
      // Display name e.g., 'English', 'Spanish'
      providers: text("providers").notNull(),
      // 'elevenlabs', 'openai', or 'both'
      sortOrder: integer("sort_order").notNull().default(0),
      // For custom ordering in UI
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    creditPackages = pgTable("credit_packages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description"),
      credits: integer("credits").notNull(),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      // USD price
      razorpayPrice: decimal("razorpay_price", { precision: 10, scale: 2 }),
      // INR price
      stripeProductId: text("stripe_product_id"),
      stripePriceId: text("stripe_price_id"),
      razorpayItemId: text("razorpay_item_id"),
      // Razorpay Item ID for credit package
      // PayPal credit package pricing
      paypalPrice: decimal("paypal_price", { precision: 10, scale: 2 }),
      // PayPal price
      // Paystack credit package pricing (Africa)
      paystackPrice: decimal("paystack_price", { precision: 10, scale: 2 }),
      // Paystack price
      // MercadoPago credit package pricing (LATAM)
      mercadopagoPrice: decimal("mercadopago_price", { precision: 10, scale: 2 }),
      // MercadoPago price
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    userSubscriptions = pgTable("user_subscriptions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      planId: varchar("plan_id").notNull().references(() => plans.id, { onDelete: "restrict" }),
      status: text("status").notNull().default("active"),
      // 'active', 'cancelled', 'expired'
      currentPeriodStart: timestamp("current_period_start").notNull().defaultNow(),
      currentPeriodEnd: timestamp("current_period_end").notNull(),
      stripeSubscriptionId: text("stripe_subscription_id").unique(),
      // Unique constraint for idempotency
      razorpaySubscriptionId: text("razorpay_subscription_id").unique(),
      // Razorpay Subscription ID
      // PayPal subscription tracking
      paypalSubscriptionId: text("paypal_subscription_id").unique(),
      // PayPal Subscription ID
      // Paystack subscription tracking (Africa)
      paystackSubscriptionCode: text("paystack_subscription_code").unique(),
      // Paystack Subscription Code
      paystackCustomerCode: text("paystack_customer_code"),
      // Paystack Customer Code
      paystackEmailToken: text("paystack_email_token"),
      // Token for customer management
      // MercadoPago subscription tracking (LATAM)
      mercadopagoSubscriptionId: text("mercadopago_subscription_id").unique(),
      // MercadoPago preapproval ID
      cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
      billingPeriod: text("billing_period").notNull().default("monthly"),
      // 'monthly' or 'yearly'
      // Admin-set per-user limit overrides (null = use plan defaults)
      overrideMaxAgents: integer("override_max_agents"),
      // Override plan's maxAgents
      overrideMaxCampaigns: integer("override_max_campaigns"),
      // Override plan's maxCampaigns
      overrideMaxContactsPerCampaign: integer("override_max_contacts_per_campaign"),
      // Override plan's maxContactsPerCampaign
      overrideMaxWebhooks: integer("override_max_webhooks"),
      // Override plan's maxWebhooks
      overrideMaxKnowledgeBases: integer("override_max_knowledge_bases"),
      // Override plan's maxKnowledgeBases
      overrideMaxFlows: integer("override_max_flows"),
      // Override plan's maxFlows
      overrideMaxPhoneNumbers: integer("override_max_phone_numbers"),
      // Override plan's maxPhoneNumbers
      overrideMaxWidgets: integer("override_max_widgets"),
      // Override plan's maxWidgets
      overrideIncludedCredits: integer("override_included_credits"),
      // Override plan's includedCredits
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    phoneNumberRentals = pgTable("phone_number_rentals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      phoneNumberId: varchar("phone_number_id").notNull().references(() => phoneNumbers.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      creditsCharged: integer("credits_charged").notNull(),
      billingDate: timestamp("billing_date").notNull().defaultNow(),
      status: text("status").notNull().default("success"),
      // 'success', 'failed', 'insufficient_credits'
      transactionId: varchar("transaction_id").references(() => creditTransactions.id),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    usageRecords = pgTable("usage_records", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      subscriptionId: varchar("subscription_id").references(() => userSubscriptions.id, { onDelete: "cascade" }),
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      type: text("type").notNull(),
      minutesUsed: integer("minutes_used").notNull().default(0),
      cost: decimal("cost", { precision: 10, scale: 2 }).notNull().default("0.00"),
      billingStatus: text("billing_status").notNull().default("pending"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    legacyWebhooks = pgTable("webhooks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
      url: text("url").notNull(),
      secret: text("secret").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    legacyWebhookDeliveries = pgTable("webhook_deliveries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      webhookId: varchar("webhook_id").notNull().references(() => legacyWebhooks.id, { onDelete: "cascade" }),
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      status: text("status").notNull(),
      responseCode: integer("response_code"),
      responseBody: text("response_body"),
      payload: jsonb("payload").notNull(),
      errorMessage: text("error_message"),
      attemptCount: integer("attempt_count").notNull().default(1),
      lastAttemptAt: timestamp("last_attempt_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    notifications = pgTable("notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Nullable for broadcast notifications
      type: text("type").notNull(),
      // low_credits, membership_upgraded, membership_expiry, campaign_completed, campaign_failed, etc.
      title: text("title").notNull(),
      message: text("message").notNull(),
      link: text("link"),
      // Optional link to navigate when clicked
      icon: text("icon"),
      // Custom icon name (lucide icon name)
      displayType: text("display_type").notNull().default("bell"),
      // 'bell', 'banner', or 'both'
      priority: integer("priority").notNull().default(0),
      // For ordering banner notifications (higher = more important)
      dismissible: boolean("dismissible").notNull().default(true),
      // Whether the notification can be dismissed
      expiresAt: timestamp("expires_at"),
      // When the notification should expire (null = never)
      isRead: boolean("is_read").notNull().default(false),
      isDismissed: boolean("is_dismissed").notNull().default(false),
      // For banner dismissals
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    emailTemplates = pgTable("email_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      templateType: text("template_type").notNull().unique(),
      // 'otp', 'welcome', 'low_credits', 'campaign_complete', 'membership_upgrade', etc.
      name: text("name").notNull(),
      // Display name for admin
      subject: text("subject").notNull(),
      // Email subject line with variable support
      htmlBody: text("html_body").notNull(),
      // HTML email body with variable support
      textBody: text("text_body").notNull(),
      // Plain text fallback with variable support
      variables: text("variables").array(),
      // Available variables: ['userName', 'companyName', 'code', etc.]
      isActive: boolean("is_active").notNull().default(true),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    promptTemplates = pgTable("prompt_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // null = system template
      name: text("name").notNull(),
      description: text("description"),
      category: text("category").notNull().default("general"),
      // 'sales', 'support', 'appointment', 'survey', 'general'
      systemPrompt: text("system_prompt").notNull(),
      firstMessage: text("first_message"),
      variables: text("variables").array(),
      // Available variables: ['company', 'product', 'customerName', etc.]
      suggestedVoiceTone: text("suggested_voice_tone"),
      // Recommended voice settings
      suggestedPersonality: text("suggested_personality"),
      isSystemTemplate: boolean("is_system_template").notNull().default(false),
      // System-provided templates
      isPublic: boolean("is_public").notNull().default(false),
      // Can be used by other users
      usageCount: integer("usage_count").notNull().default(0),
      // Track popularity
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    agentVersions = pgTable("agent_versions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      agentId: varchar("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
      versionNumber: integer("version_number").notNull(),
      snapshot: jsonb("snapshot").notNull().$type(),
      changesSummary: text("changes_summary"),
      // Human-readable summary of what changed
      changedFields: text("changed_fields").array(),
      // Array of field names that changed
      editedBy: varchar("edited_by").references(() => users.id, { onDelete: "set null" }),
      note: text("note"),
      // Optional note about why changes were made
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    auditLogs = pgTable("audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      action: text("action").notNull(),
      // e.g., 'user.login', 'admin.user_update', 'payment.subscription_created'
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      // User who performed the action
      targetUserId: varchar("target_user_id").references(() => users.id, { onDelete: "set null" }),
      // User affected by the action
      resourceType: text("resource_type"),
      // e.g., 'agent', 'campaign', 'payment'
      resourceId: varchar("resource_id"),
      // ID of the affected resource
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      metadata: jsonb("metadata").$type(),
      // Additional context
      severity: text("severity").notNull().default("info"),
      // 'info', 'warning', 'error', 'critical'
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    platformLanguages = pgTable("platform_languages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: text("code").notNull().unique(),
      // ISO 639-1 code e.g., 'en', 'es', 'ar'
      name: text("name").notNull(),
      // Display name e.g., 'English', 'Spanish'
      nativeName: text("native_name").notNull(),
      // Native name e.g., 'English', 'Español'
      flag: text("flag"),
      // Flag emoji e.g., '🇺🇸', '🇪🇸'
      direction: text("direction").notNull().default("ltr"),
      // 'ltr' or 'rtl'
      isEnabled: boolean("is_enabled").notNull().default(true),
      isDefault: boolean("is_default").notNull().default(false),
      // Only one can be default
      sortOrder: integer("sort_order").notNull().default(0),
      translations: jsonb("translations").notNull().$type(),
      // Full translation keys
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserSchema = createInsertSchema(users).pick({
      email: true,
      password: true,
      name: true,
      role: true
    });
    insertElevenLabsCredentialSchema = createInsertSchema(elevenLabsCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      currentLoad: true,
      totalAssignedAgents: true
    });
    insertSyncedVoiceSchema = createInsertSchema(syncedVoices).omit({
      id: true,
      syncedAt: true
    });
    insertAgentSchema = createInsertSchema(agents).omit({
      id: true,
      createdAt: true
    });
    insertKnowledgeBaseSchema = createInsertSchema(knowledgeBase).omit({
      id: true,
      createdAt: true
    });
    insertIncomingAgentSchema = createInsertSchema(incomingAgents).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPromptTemplateSchema = createInsertSchema(promptTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      usageCount: true
    });
    insertAgentVersionSchema = createInsertSchema(agentVersions).omit({
      id: true,
      createdAt: true
    });
    insertIncomingConnectionSchema = createInsertSchema(incomingConnections).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCampaignSchema = createInsertSchema(campaigns).omit({
      id: true,
      createdAt: true,
      completedCalls: true,
      successfulCalls: true,
      failedCalls: true
    });
    insertContactSchema = createInsertSchema(contacts).omit({
      id: true,
      createdAt: true
    });
    insertCallSchema = createInsertSchema(calls).omit({
      id: true,
      createdAt: true
    });
    insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
      id: true,
      createdAt: true
    });
    insertToolSchema = createInsertSchema(tools).omit({
      id: true,
      createdAt: true
    });
    insertVoiceSchema = createInsertSchema(voices).omit({
      id: true,
      createdAt: true
    });
    insertPlanSchema = createInsertSchema(plans).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertGlobalSettingsSchema = createInsertSchema(globalSettings).omit({
      id: true,
      updatedAt: true
    });
    insertLlmModelSchema = createInsertSchema(llmModels).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertSupportedLanguageSchema = createInsertSchema(supportedLanguages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPlatformLanguageSchema = createInsertSchema(platformLanguages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCreditPackageSchema = createInsertSchema(creditPackages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      // Coerce number inputs to strings for decimal fields (frontend sends numbers)
      price: z.union([z.string(), z.number()]).transform((v) => String(v)),
      razorpayPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      paypalPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      paystackPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      mercadopagoPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional()
    });
    insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPhoneNumberSchema = createInsertSchema(phoneNumbers).omit({
      id: true,
      createdAt: true
    });
    insertUsageRecordSchema = createInsertSchema(usageRecords).omit({
      id: true,
      createdAt: true
    });
    insertLegacyWebhookSchema = createInsertSchema(legacyWebhooks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertLegacyWebhookDeliverySchema = createInsertSchema(legacyWebhookDeliveries).omit({
      id: true,
      createdAt: true
    });
    insertPhoneNumberRentalSchema = createInsertSchema(phoneNumberRentals).omit({
      id: true,
      createdAt: true
    });
    insertNotificationSchema = createInsertSchema(notifications).omit({
      id: true,
      createdAt: true,
      isRead: true,
      isDismissed: true
    });
    insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    twilioCountries = pgTable("twilio_countries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: varchar("code", { length: 2 }).notNull().unique(),
      // ISO 3166-1 alpha-2 code (e.g., "US", "GB")
      name: text("name").notNull(),
      dialCode: text("dial_code").notNull(),
      // International dialing code (e.g., "+1", "+44")
      isActive: boolean("is_active").notNull().default(true),
      sortOrder: integer("sort_order").notNull().default(100)
      // For display ordering (popular countries first)
    });
    insertTwilioCountrySchema = createInsertSchema(twilioCountries).omit({
      id: true
    });
    userKnowledgeStorageLimits = pgTable("user_knowledge_storage_limits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
      maxStorageBytes: integer("max_storage_bytes").notNull().default(20971520),
      // 20MB default per user
      usedStorageBytes: integer("used_storage_bytes").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    knowledgeChunks = pgTable("knowledge_chunks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      knowledgeBaseId: varchar("knowledge_base_id").notNull().references(() => knowledgeBase.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      chunkIndex: integer("chunk_index").notNull(),
      // Order within the document
      chunkText: text("chunk_text").notNull(),
      // The actual text content
      embedding: jsonb("embedding"),
      // Vector embedding as JSON array of floats
      tokenCount: integer("token_count").notNull().default(0),
      metadata: jsonb("metadata"),
      // Page number, section, source info
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    knowledgeProcessingQueue = pgTable("knowledge_processing_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      knowledgeBaseId: varchar("knowledge_base_id").notNull().references(() => knowledgeBase.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      status: text("status").notNull().default("pending"),
      // pending, processing, completed, failed
      errorMessage: text("error_message"),
      totalChunks: integer("total_chunks").default(0),
      processedChunks: integer("processed_chunks").default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserKnowledgeStorageLimitSchema = createInsertSchema(userKnowledgeStorageLimits).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertKnowledgeChunkSchema = createInsertSchema(knowledgeChunks).omit({
      id: true,
      createdAt: true
    });
    insertKnowledgeProcessingQueueSchema = createInsertSchema(knowledgeProcessingQueue).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    flows = pgTable("flows", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      nodes: jsonb("nodes").notNull().$type(),
      edges: jsonb("edges").notNull().$type(),
      agentId: varchar("agent_id"),
      voiceSettings: jsonb("voice_settings").$type(),
      executionConfig: jsonb("execution_config").$type(),
      isActive: boolean("is_active").default(true).notNull(),
      isTemplate: boolean("is_template").default(false).notNull(),
      compiledSystemPrompt: text("compiled_system_prompt"),
      compiledFirstMessage: text("compiled_first_message"),
      compiledStates: jsonb("compiled_states").$type(),
      compiledTools: jsonb("compiled_tools").$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertFlowSchema = createInsertSchema(flows).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      compiledSystemPrompt: true,
      compiledFirstMessage: true,
      compiledStates: true,
      compiledTools: true
    });
    createFlowSchema = insertFlowSchema.omit({ userId: true });
    flowExecutions = pgTable("flow_executions", {
      id: varchar("id").primaryKey(),
      callId: varchar("call_id").notNull(),
      flowId: varchar("flow_id").notNull().references(() => flows.id),
      currentNodeId: varchar("current_node_id"),
      status: varchar("status", { length: 50 }).notNull(),
      variables: jsonb("variables").default({}).$type(),
      pathTaken: jsonb("path_taken").default([]).$type(),
      metadata: jsonb("metadata").$type(),
      error: text("error"),
      startedAt: timestamp("started_at").defaultNow().notNull(),
      completedAt: timestamp("completed_at")
    });
    insertFlowExecutionSchema = createInsertSchema(flowExecutions).omit({
      id: true,
      startedAt: true
    });
    flowTestQueue = pgTable("flow_test_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull(),
      flowId: varchar("flow_id").notNull().references(() => flows.id, { onDelete: "cascade" }),
      toPhone: text("to_phone").notNull(),
      status: text("status").notNull().default("waiting"),
      // waiting / processing / completed / failed / cancelled
      callId: varchar("call_id"),
      // set when status=completed
      errorMessage: text("error_message"),
      // set when status=failed|cancelled
      processedAt: timestamp("processed_at"),
      // set when leaving waiting
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertFlowTestQueueSchema = createInsertSchema(flowTestQueue).omit({
      id: true,
      createdAt: true
    });
    webhookSubscriptions = pgTable("webhook_subscriptions", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      url: text("url").notNull(),
      method: varchar("method", { length: 10 }).default("POST").notNull(),
      headers: jsonb("headers").$type(),
      secret: varchar("secret", { length: 64 }).notNull(),
      authType: varchar("auth_type", { length: 50 }),
      authCredentials: jsonb("auth_credentials").$type(),
      events: jsonb("events").notNull().$type(),
      campaignIds: jsonb("campaign_ids").$type(),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    webhooks = webhookSubscriptions;
    insertWebhookSchema = createInsertSchema(webhooks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createWebhookSchema = insertWebhookSchema.omit({ userId: true });
    webhookDeliveryLogs = pgTable("webhook_logs", {
      id: serial("id").primaryKey(),
      webhookId: varchar("webhook_id").references(() => webhookSubscriptions.id, { onDelete: "cascade" }),
      event: varchar("event", { length: 100 }).notNull(),
      payload: jsonb("payload").notNull(),
      success: boolean("success").notNull(),
      httpStatus: integer("status_code"),
      responseBody: text("response_body"),
      responseTime: integer("response_time"),
      error: text("error"),
      attemptNumber: integer("attempt").default(1).notNull(),
      maxAttempts: integer("max_attempts").default(3),
      nextRetryAt: timestamp("next_retry_at"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    webhookLogs = webhookDeliveryLogs;
    insertWebhookLogSchema = createInsertSchema(webhookLogs).omit({
      id: true,
      createdAt: true
    });
    appointments = pgTable("appointments", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      callId: varchar("call_id"),
      flowId: varchar("flow_id").references(() => flows.id),
      contactName: varchar("contact_name", { length: 255 }).notNull(),
      contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
      contactEmail: varchar("contact_email", { length: 255 }),
      appointmentDate: date("appointment_date").notNull(),
      appointmentTime: time("appointment_time").notNull(),
      duration: integer("duration").notNull(),
      serviceName: varchar("service_name", { length: 255 }),
      notes: text("notes"),
      status: varchar("status", { length: 50 }).default("scheduled").notNull(),
      statusReason: varchar("status_reason", { length: 500 }),
      googleCalendarEventId: varchar("google_calendar_event_id", { length: 255 }),
      metadata: jsonb("metadata").$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertAppointmentSchema = createInsertSchema(appointments).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createAppointmentSchema = insertAppointmentSchema.omit({ userId: true });
    appointmentSettings = pgTable("appointment_settings", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull().unique(),
      allowOverlapping: boolean("allow_overlapping").default(false).notNull(),
      bufferMinutes: integer("buffer_minutes").default(0).notNull(),
      syncToGoogleCalendar: boolean("sync_to_google_calendar").default(false).notNull(),
      workingHours: jsonb("working_hours").notNull().$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertAppointmentSettingsSchema = createInsertSchema(appointmentSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createAppointmentSettingsSchema = insertAppointmentSettingsSchema.omit({ userId: true });
    forms = pgTable("forms", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertFormSchema = createInsertSchema(forms).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createFormSchema = insertFormSchema.omit({ userId: true });
    formFields = pgTable("form_fields", {
      id: varchar("id").primaryKey(),
      formId: varchar("form_id").notNull().references(() => forms.id, { onDelete: "cascade" }),
      question: text("question").notNull(),
      fieldType: varchar("field_type", { length: 50 }).notNull(),
      options: jsonb("options").$type(),
      isRequired: boolean("is_required").default(true).notNull(),
      order: integer("order").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertFormFieldSchema = createInsertSchema(formFields).omit({
      id: true,
      createdAt: true
    });
    formSubmissions = pgTable("form_submissions", {
      id: varchar("id").primaryKey(),
      formId: varchar("form_id").notNull().references(() => forms.id),
      callId: varchar("call_id"),
      flowExecutionId: varchar("flow_execution_id").references(() => flowExecutions.id),
      contactName: varchar("contact_name", { length: 255 }),
      contactPhone: varchar("contact_phone", { length: 50 }),
      responses: jsonb("responses").notNull().$type(),
      submittedAt: timestamp("submitted_at").defaultNow().notNull()
    });
    insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
      id: true,
      submittedAt: true
    });
    seoSettings = pgTable("seo_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Meta Tags - Default values for pages without specific SEO
      defaultTitle: text("default_title").default("AI Calling Platform"),
      defaultDescription: text("default_description").default("Enterprise AI-powered bulk calling platform with voice agents, Twilio integration, and intelligent lead classification."),
      defaultKeywords: text("default_keywords").array().default(sql`ARRAY[]::text[]`),
      defaultOgImage: text("default_og_image").default("/og-image.png"),
      // Sitemap Configuration
      sitemapEnabled: boolean("sitemap_enabled").default(true),
      sitemapUrls: jsonb("sitemap_urls").$type().default([]),
      sitemapAutoGenerate: boolean("sitemap_auto_generate").default(true),
      // Robots.txt Configuration
      robotsEnabled: boolean("robots_enabled").default(true),
      robotsRules: jsonb("robots_rules").$type().default([
        {
          userAgent: "*",
          allow: ["/", "/pricing", "/features", "/use-cases", "/integrations", "/blog", "/contact", "/about", "/privacy", "/terms"],
          disallow: ["/app/", "/admin/", "/api/"]
        }
      ]),
      robotsCrawlDelay: integer("robots_crawl_delay").default(0),
      // Structured Data / Schema.org
      structuredDataEnabled: boolean("structured_data_enabled").default(true),
      structuredData: jsonb("structured_data").$type().default({
        organizationName: "",
        organizationUrl: "",
        organizationLogo: "/logo.png",
        organizationDescription: "AI-powered voice agents for automated calling",
        socialProfiles: [],
        contactEmail: "",
        contactPhone: ""
      }),
      // FAQ Structured Data for rich snippets
      structuredDataFaq: jsonb("structured_data_faq").$type().default([]),
      structuredDataFaqEnabled: boolean("structured_data_faq_enabled").default(false),
      // Product Structured Data for rich snippets
      structuredDataProduct: jsonb("structured_data_product").$type().default(null),
      structuredDataProductEnabled: boolean("structured_data_product_enabled").default(false),
      // Social Media Meta Tags
      twitterHandle: text("twitter_handle"),
      facebookAppId: text("facebook_app_id"),
      // Advanced Settings
      canonicalBaseUrl: text("canonical_base_url"),
      googleVerification: text("google_verification"),
      bingVerification: text("bing_verification"),
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    analyticsScripts = pgTable("analytics_scripts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Script Identity
      name: text("name").notNull(),
      // Display name (e.g., "Google Tag Manager", "Facebook Pixel")
      type: text("type").notNull().default("custom"),
      // 'gtm', 'ga4', 'facebook_pixel', 'linkedin', 'twitter', 'tiktok', 'hotjar', 'clarity', 'custom'
      // Script Content
      code: text("code").notNull(),
      // Legacy single code field (for backward compatibility)
      headCode: text("head_code"),
      // Code to inject in <head> section
      bodyCode: text("body_code"),
      // Code to inject after <body> tag (e.g., GTM noscript)
      // Placement Configuration - Array supports multiple placements (e.g., both head and body for some scripts like GTM)
      placement: text("placement").array().notNull().default(sql`ARRAY['head']::text[]`),
      // Array of 'head' and/or 'body' - where to inject the script
      loadPriority: integer("load_priority").notNull().default(0),
      // Higher priority = loads first (within placement group)
      // Script Attributes (for <script> tag configuration)
      async: boolean("async").default(false),
      // Add async attribute
      defer: boolean("defer").default(false),
      // Add defer attribute
      // Status
      enabled: boolean("enabled").notNull().default(true),
      // Page Scope - Control where scripts are injected
      hideOnInternalPages: boolean("hide_on_internal_pages").notNull().default(false),
      // Hide on admin/user dashboard pages
      // Notes for admin reference
      description: text("description"),
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertAnalyticsScriptSchema = createInsertSchema(analyticsScripts).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    paymentTransactions = pgTable("payment_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Transaction Type
      type: text("type").notNull(),
      // 'subscription' or 'credits'
      // Gateway Information
      gateway: text("gateway").notNull(),
      // 'stripe', 'razorpay', 'paypal', 'paystack', 'mercadopago'
      gatewayTransactionId: text("gateway_transaction_id"),
      // Payment intent ID, order ID, etc.
      gatewaySubscriptionId: text("gateway_subscription_id"),
      // For subscription payments
      // Amount & Currency
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("INR"),
      // Related Records
      planId: varchar("plan_id").references(() => plans.id, { onDelete: "set null" }),
      creditPackageId: varchar("credit_package_id").references(() => creditPackages.id, { onDelete: "set null" }),
      subscriptionId: varchar("subscription_id").references(() => userSubscriptions.id, { onDelete: "set null" }),
      // Transaction Details
      description: text("description").notNull(),
      billingPeriod: text("billing_period"),
      // 'monthly', 'yearly' for subscriptions
      creditsAwarded: integer("credits_awarded"),
      // For credit purchases
      // Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'completed', 'failed', 'refunded', 'partially_refunded'
      // Invoice Reference
      invoiceId: varchar("invoice_id"),
      // Will be linked after invoice generation
      // Metadata
      metadata: jsonb("metadata"),
      // Additional gateway-specific data
      // Timestamps
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    refunds = pgTable("refunds", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull().references(() => paymentTransactions.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Refund Details
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("INR"),
      // Gateway Information
      gateway: text("gateway").notNull(),
      // Same as original transaction
      gatewayRefundId: text("gateway_refund_id"),
      // Refund ID from gateway
      // Refund Type
      reason: text("reason").notNull(),
      // 'admin_request', 'chargeback', 'customer_request', 'duplicate', 'fraudulent'
      initiatedBy: text("initiated_by").notNull(),
      // 'admin', 'customer', 'gateway' (for chargebacks)
      adminId: varchar("admin_id").references(() => users.id, { onDelete: "set null" }),
      // Admin who processed refund
      // Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'processing', 'completed', 'failed'
      // Credits Reversal
      creditsReversed: integer("credits_reversed"),
      // Credits taken back
      // User Suspension (for chargebacks)
      userSuspended: boolean("user_suspended").notNull().default(false),
      // Notes
      adminNote: text("admin_note"),
      // Internal note from admin
      customerNote: text("customer_note"),
      // Note visible to customer
      // Metadata
      metadata: jsonb("metadata"),
      // Gateway-specific refund data
      // Refund Note PDF
      refundNoteNumber: text("refund_note_number"),
      // e.g., RN-2024-0001
      pdfUrl: text("pdf_url"),
      // URL to stored refund note PDF
      pdfGeneratedAt: timestamp("pdf_generated_at"),
      // Timestamps
      processedAt: timestamp("processed_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertRefundSchema = createInsertSchema(refunds).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    invoices = pgTable("invoices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull().references(() => paymentTransactions.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Invoice Number (human-readable)
      invoiceNumber: text("invoice_number").notNull().unique(),
      // e.g., INV-2024-00001
      // Customer Details (snapshot at time of invoice)
      customerName: text("customer_name").notNull(),
      customerEmail: text("customer_email").notNull(),
      customerAddress: text("customer_address"),
      // Invoice Details
      description: text("description").notNull(),
      lineItems: jsonb("line_items").notNull().$type(),
      // Amounts
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      tax: decimal("tax", { precision: 10, scale: 2 }).default("0.00"),
      total: decimal("total", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("INR"),
      // Gateway & Payment Info
      gateway: text("gateway").notNull(),
      paymentMethod: text("payment_method"),
      // 'card', 'bank_transfer', etc.
      // PDF Storage
      pdfUrl: text("pdf_url"),
      // URL to stored PDF
      pdfGeneratedAt: timestamp("pdf_generated_at"),
      // Status
      status: text("status").notNull().default("draft"),
      // 'draft', 'sent', 'paid', 'void'
      // Email Delivery
      emailSentAt: timestamp("email_sent_at"),
      emailSentTo: text("email_sent_to"),
      // Timestamps
      issuedAt: timestamp("issued_at").notNull().defaultNow(),
      dueAt: timestamp("due_at"),
      paidAt: timestamp("paid_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertInvoiceSchema = createInsertSchema(invoices).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    paymentWebhookQueue = pgTable("payment_webhook_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Webhook Source
      gateway: text("gateway").notNull(),
      // 'stripe', 'razorpay', 'paypal', 'paystack', 'mercadopago'
      eventType: text("event_type").notNull(),
      // e.g., 'payment_intent.succeeded', 'subscription.created'
      eventId: text("event_id").notNull(),
      // Gateway's event ID for idempotency
      // Payload
      payload: jsonb("payload").notNull(),
      // Full webhook payload
      // Processing Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'processing', 'completed', 'failed', 'expired'
      // Retry Information
      attemptCount: integer("attempt_count").notNull().default(0),
      maxAttempts: integer("max_attempts").notNull().default(5),
      lastAttemptAt: timestamp("last_attempt_at"),
      nextRetryAt: timestamp("next_retry_at"),
      // Error Tracking
      lastError: text("last_error"),
      errorHistory: jsonb("error_history").$type(),
      // Related Records (if known)
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      transactionId: varchar("transaction_id").references(() => paymentTransactions.id, { onDelete: "set null" }),
      // Timestamps
      receivedAt: timestamp("received_at").notNull().defaultNow(),
      processedAt: timestamp("processed_at"),
      expiresAt: timestamp("expires_at").notNull(),
      // 24 hours from receivedAt
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertPaymentWebhookQueueSchema = createInsertSchema(paymentWebhookQueue).omit({
      id: true,
      createdAt: true
    });
    emailNotificationSettings = pgTable("email_notification_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Email Type
      eventType: text("event_type").notNull().unique(),
      // 'welcome', 'purchase_confirmation', 'low_credits', 'campaign_completed', etc.
      displayName: text("display_name").notNull(),
      // Human-readable name
      description: text("description"),
      // Description of when this email is sent
      // Settings
      isEnabled: boolean("is_enabled").notNull().default(true),
      // Template Reference (optional - for custom templates)
      templateId: varchar("template_id").references(() => emailTemplates.id, { onDelete: "set null" }),
      // Thresholds (for certain event types)
      thresholdValue: integer("threshold_value"),
      // e.g., credit count for low_credits alert
      // Metadata
      category: text("category").notNull().default("general"),
      // 'authentication', 'billing', 'campaigns', 'account', 'general'
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertEmailNotificationSettingsSchema = createInsertSchema(emailNotificationSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    bannedWords = pgTable("banned_words", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      word: text("word").notNull(),
      // The banned word or phrase
      category: text("category").notNull().default("general"),
      // 'profanity', 'harassment', 'hate_speech', 'threats', 'general'
      severity: text("severity").notNull().default("medium"),
      // 'low', 'medium', 'high', 'critical'
      isActive: boolean("is_active").notNull().default(true),
      autoBlock: boolean("auto_block").notNull().default(false),
      // Auto-block user when detected
      createdBy: varchar("created_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertBannedWordSchema = createInsertSchema(bannedWords).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    contentViolations = pgTable("content_violations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      callId: varchar("call_id").notNull().references(() => calls.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      bannedWordId: varchar("banned_word_id").references(() => bannedWords.id, { onDelete: "set null" }),
      detectedWord: text("detected_word").notNull(),
      // The actual word detected
      context: text("context"),
      // Surrounding text for context
      severity: text("severity").notNull().default("medium"),
      // 'low', 'medium', 'high', 'critical'
      status: text("status").notNull().default("pending"),
      // 'pending', 'reviewed', 'dismissed', 'actioned'
      reviewedBy: varchar("reviewed_by").references(() => users.id, { onDelete: "set null" }),
      reviewedAt: timestamp("reviewed_at"),
      actionTaken: text("action_taken"),
      // 'warning', 'blocked', 'dismissed', etc.
      notes: text("notes"),
      // Admin notes
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertContentViolationSchema = createInsertSchema(contentViolations).omit({
      id: true,
      createdAt: true
    });
    openaiCredentials = pgTable("openai_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      apiKey: text("api_key").notNull(),
      modelTier: text("model_tier").notNull().default("free"),
      // 'free' (gpt-realtime-mini) or 'pro' (gpt-realtime-1.5)
      isActive: boolean("is_active").notNull().default(true),
      maxConcurrency: integer("max_concurrency").notNull().default(50),
      currentLoad: integer("current_load").notNull().default(0),
      totalAssignedAgents: integer("total_assigned_agents").notNull().default(0),
      totalAssignedUsers: integer("total_assigned_users").notNull().default(0),
      maxAgentsThreshold: integer("max_agents_threshold").notNull().default(100),
      lastHealthCheck: timestamp("last_health_check"),
      healthStatus: text("health_status").notNull().default("healthy"),
      // healthy, degraded, unhealthy
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertOpenaiCredentialSchema = createInsertSchema(openaiCredentials).omit({
      id: true,
      currentLoad: true,
      totalAssignedAgents: true,
      totalAssignedUsers: true,
      lastHealthCheck: true,
      createdAt: true,
      updatedAt: true
    });
    plivoCredentials = pgTable("plivo_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      authId: text("auth_id").notNull(),
      authToken: text("auth_token").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      isPrimary: boolean("is_primary").notNull().default(false),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoCredentialSchema = createInsertSchema(plivoCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    plivoPhoneNumbers = pgTable("plivo_phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      plivoCredentialId: varchar("plivo_credential_id").references(() => plivoCredentials.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      phoneNumber: text("phone_number").notNull().unique(),
      plivoNumberId: text("plivo_number_id").notNull().unique(),
      friendlyName: text("friendly_name"),
      country: text("country").notNull(),
      region: text("region"),
      numberType: text("number_type").default("local"),
      // local, toll_free, national
      capabilities: jsonb("capabilities"),
      // { voice: true, sms: true }
      status: text("status").notNull().default("active"),
      // active, pending, released, suspended
      // Pricing (admin-configured credits)
      purchaseCredits: integer("purchase_credits").notNull().default(0),
      monthlyCredits: integer("monthly_credits").notNull().default(0),
      nextBillingDate: timestamp("next_billing_date"),
      // Incoming agent connection
      assignedAgentId: varchar("assigned_agent_id").references(() => agents.id, { onDelete: "set null" }),
      // Stripe subscription tracking (for monthly billing via Stripe)
      stripeSubscriptionId: text("stripe_subscription_id").unique(),
      purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoPhoneNumberSchema = createInsertSchema(plivoPhoneNumbers).omit({
      id: true,
      purchasedAt: true,
      createdAt: true,
      updatedAt: true
    });
    plivoCalls = pgTable("plivo_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      plivoPhoneNumberId: varchar("plivo_phone_number_id").references(() => plivoPhoneNumbers.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      // Plivo identifiers
      plivoCallUuid: text("plivo_call_uuid").unique(),
      fromNumber: text("from_number").notNull(),
      toNumber: text("to_number").notNull(),
      // OpenAI session
      openaiSessionId: text("openai_session_id"),
      openaiVoice: text("openai_voice").default("alloy"),
      openaiModel: text("openai_model").default("gpt-realtime-1.5"),
      // Call status
      status: text("status").notNull().default("pending"),
      // pending, initiated, ringing, in-progress, completed, busy, failed, no-answer, canceled
      callDirection: text("call_direction").notNull().default("outbound"),
      // inbound, outbound
      duration: integer("duration"),
      // seconds
      // Recording
      recordingId: text("recording_id"),
      recordingUrl: text("recording_url"),
      recordingDuration: integer("recording_duration"),
      // AI analysis
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      leadQualityScore: integer("lead_quality_score"),
      // 1-100
      sentiment: text("sentiment"),
      // positive, neutral, negative
      classification: text("classification"),
      // hot, warm, cold, lost
      keyPoints: jsonb("key_points"),
      // string[]
      nextActions: jsonb("next_actions"),
      // string[]
      // Call transfer
      wasTransferred: boolean("was_transferred").default(false),
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      // Timestamps
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      plivoCallsUserIdIdx: index("plivo_calls_user_id_idx").on(table.userId),
      plivoCallsCampaignIdIdx: index("plivo_calls_campaign_id_idx").on(table.campaignId),
      plivoCallsContactIdIdx: index("plivo_calls_contact_id_idx").on(table.contactId),
      plivoCallsStatusIdx: index("plivo_calls_status_idx").on(table.status),
      plivoCallsCreatedAtIdx: index("plivo_calls_created_at_idx").on(table.createdAt),
      // plivoCalls has no call_id FK — it uses plivoCallUuid as the primary external identifier
      plivoCallsPlivoCallUuidIdx: index("plivo_calls_plivo_call_uuid_idx").on(table.plivoCallUuid)
    }));
    insertPlivoCallSchema = createInsertSchema(plivoCalls).omit({
      id: true,
      createdAt: true
    });
    campaignJobs = pgTable("campaign_jobs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      campaignId: varchar("campaign_id").notNull(),
      contactId: varchar("contact_id").notNull(),
      engine: text("engine").notNull().default("plivo"),
      // 'plivo' or 'twilio'
      status: text("status").notNull().default("pending"),
      // pending, processing, completed, failed
      attempts: integer("attempts").notNull().default(0),
      lastError: text("last_error"),
      workerId: text("worker_id"),
      // For distributed processing
      createdAt: timestamp("created_at").notNull().defaultNow(),
      processedAt: timestamp("processed_at"),
      completedAt: timestamp("completed_at")
    });
    insertCampaignJobSchema = createInsertSchema(campaignJobs).omit({
      id: true,
      createdAt: true
    });
    plivoPhonePricing = pgTable("plivo_phone_pricing", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      countryCode: text("country_code").notNull().unique(),
      // ISO 2-letter country code
      countryName: text("country_name").notNull(),
      purchaseCredits: integer("purchase_credits").notNull().default(100),
      monthlyCredits: integer("monthly_credits").notNull().default(50),
      kycRequired: boolean("kyc_required").notNull().default(false),
      // Whether KYC verification is required for this country
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoPhonePricingSchema = createInsertSchema(plivoPhonePricing).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    userKycDocuments = pgTable("user_kyc_documents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      documentType: text("document_type").notNull(),
      // photo, company_registration, gst_certificate, authorization_letter
      fileName: text("file_name").notNull(),
      filePath: text("file_path").notNull(),
      mimeType: text("mime_type").notNull(),
      fileSize: integer("file_size"),
      uploadedAt: timestamp("uploaded_at").notNull().defaultNow()
    });
    insertUserKycDocumentSchema = createInsertSchema(userKycDocuments).omit({
      id: true,
      uploadedAt: true
    });
    twilioOpenaiCalls = pgTable("twilio_openai_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      twilioPhoneNumberId: varchar("twilio_phone_number_id").references(() => phoneNumbers.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      twilioCallSid: text("twilio_call_sid").unique(),
      fromNumber: text("from_number").notNull(),
      toNumber: text("to_number").notNull(),
      openaiSessionId: text("openai_session_id"),
      openaiVoice: text("openai_voice").default("alloy"),
      openaiModel: text("openai_model").default("gpt-realtime-1.5"),
      status: text("status").notNull().default("pending"),
      callDirection: text("call_direction").notNull().default("outbound"),
      duration: integer("duration"),
      recordingUrl: text("recording_url"),
      recordingDuration: integer("recording_duration"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      leadQualityScore: integer("lead_quality_score"),
      sentiment: text("sentiment"),
      classification: text("classification"),
      keyPoints: jsonb("key_points"),
      nextActions: jsonb("next_actions"),
      wasTransferred: boolean("was_transferred").default(false),
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      twilioOpenaiCallsUserIdIdx: index("twilio_openai_calls_user_id_idx").on(table.userId),
      twilioOpenaiCallsCampaignIdIdx: index("twilio_openai_calls_campaign_id_idx").on(table.campaignId),
      twilioOpenaiCallsContactIdIdx: index("twilio_openai_calls_contact_id_idx").on(table.contactId),
      twilioOpenaiCallsStatusIdx: index("twilio_openai_calls_status_idx").on(table.status),
      twilioOpenaiCallsCreatedAtIdx: index("twilio_openai_calls_created_at_idx").on(table.createdAt),
      // twilioOpenaiCalls has no call_id FK — it uses twilioCallSid as the primary external identifier
      twilioOpenaiCallsTwilioSidIdx: index("twilio_openai_calls_twilio_call_sid_idx").on(table.twilioCallSid)
    }));
    insertTwilioOpenaiCallSchema = createInsertSchema(twilioOpenaiCalls).omit({
      id: true,
      createdAt: true
    });
    demoSessions = pgTable("demo_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sessionToken: text("session_token").notNull().unique(),
      visitorIp: text("visitor_ip"),
      visitorFingerprint: text("visitor_fingerprint"),
      language: text("language").notNull().default("en"),
      voice: text("voice").notNull().default("alloy"),
      status: text("status").notNull().default("pending"),
      duration: integer("duration"),
      maxDuration: integer("max_duration").notNull().default(60),
      transcript: text("transcript"),
      openaiSessionId: text("openai_session_id"),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      metadata: jsonb("metadata").$type(),
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertDemoSessionSchema = createInsertSchema(demoSessions).omit({
      id: true,
      createdAt: true
    });
    leadStages = pgTable("lead_stages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      color: text("color").notNull().default("#6B7280"),
      // Hex color for stage header
      order: integer("order").notNull().default(0),
      // Display order in Kanban
      isDefault: boolean("is_default").notNull().default(false),
      // System default stages can't be deleted
      isCustom: boolean("is_custom").notNull().default(true),
      // User-created stages
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadStageSchema = createInsertSchema(leadStages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    leads = pgTable("leads", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Source - Either from a campaign or incoming connection
      sourceType: text("source_type").notNull(),
      // 'campaign' | 'incoming'
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      incomingConnectionId: varchar("incoming_connection_id").references(() => incomingConnections.id, { onDelete: "cascade" }),
      // Contact Information
      firstName: text("first_name"),
      lastName: text("last_name"),
      phone: text("phone").notNull(),
      email: text("email"),
      company: text("company"),
      customFields: jsonb("custom_fields").$type(),
      // Pipeline Status
      stageId: varchar("stage_id").references(() => leadStages.id, { onDelete: "set null" }),
      stage: text("stage").notNull().default("new"),
      // Fallback stage name: new, hot, appointment, form_submitted, follow_up, not_interested, no_answer
      // AI-Generated Insights
      leadScore: integer("lead_score"),
      // 1-100 AI-generated score
      aiSummary: text("ai_summary"),
      // AI-generated call summary
      aiNextAction: text("ai_next_action"),
      // Suggested next action
      sentiment: text("sentiment"),
      // positive, neutral, negative
      aiCategory: text("ai_category"),
      // AI-assigned category: 'warm' | 'hot' | 'appointment_booked' | 'form_submitted' | 'call_transfer' | 'need_follow_up' | null (uncategorized)
      // Tool Execution Flags - Show badges on lead card
      hasAppointment: boolean("has_appointment").notNull().default(false),
      hasFormSubmission: boolean("has_form_submission").notNull().default(false),
      hasTransfer: boolean("has_transfer").notNull().default(false),
      hasCallback: boolean("has_callback").notNull().default(false),
      // Appointment Details (if hasAppointment)
      appointmentDate: timestamp("appointment_date"),
      appointmentDetails: jsonb("appointment_details").$type(),
      // Form Submission Details (if hasFormSubmission)
      formData: jsonb("form_data").$type(),
      // Transfer Details (if hasTransfer)
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      // Callback/Follow-up Scheduling
      callbackScheduled: timestamp("callback_scheduled"),
      callbackCompleted: boolean("callback_completed").notNull().default(false),
      // Call Reference - Link to the call record
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      plivoCallId: varchar("plivo_call_id").references(() => plivoCalls.id, { onDelete: "set null" }),
      twilioOpenaiCallId: varchar("twilio_openai_call_id").references(() => twilioOpenaiCalls.id, { onDelete: "set null" }),
      // Total calls made to this lead (for follow-ups)
      totalCalls: integer("total_calls").notNull().default(1),
      lastCallAt: timestamp("last_call_at"),
      // Tags for organization
      tags: text("tags").array(),
      // Assignment for team accounts
      assignedUserId: varchar("assigned_user_id").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadSchema = createInsertSchema(leads).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    AI_LEAD_CATEGORIES = {
      WARM: "warm",
      HOT: "hot",
      APPOINTMENT_BOOKED: "appointment_booked",
      FORM_SUBMITTED: "form_submitted",
      CALL_TRANSFER: "call_transfer",
      NEED_FOLLOW_UP: "need_follow_up"
    };
    AI_CATEGORY_LABELS = {
      [AI_LEAD_CATEGORIES.WARM]: "Warm Lead",
      [AI_LEAD_CATEGORIES.HOT]: "Hot Lead",
      [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "Appointment Booked",
      [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "Form Submitted",
      [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "Call Transfer",
      [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "Need Follow Up"
    };
    AI_CATEGORY_COLORS = {
      [AI_LEAD_CATEGORIES.WARM]: "#F59E0B",
      [AI_LEAD_CATEGORIES.HOT]: "#EF4444",
      [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "#10B981",
      [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "#3B82F6",
      [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "#8B5CF6",
      [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "#F97316"
    };
    AI_CATEGORY_PRIORITY = [
      AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED,
      AI_LEAD_CATEGORIES.FORM_SUBMITTED,
      AI_LEAD_CATEGORIES.CALL_TRANSFER,
      AI_LEAD_CATEGORIES.NEED_FOLLOW_UP,
      AI_LEAD_CATEGORIES.HOT,
      AI_LEAD_CATEGORIES.WARM
    ];
    leadNotes = pgTable("lead_notes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      leadId: varchar("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      content: text("content").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadNoteSchema = createInsertSchema(leadNotes).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    leadActivities = pgTable("lead_activities", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      leadId: varchar("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Activity type: 'call' | 'note' | 'stage_change' | 'tag_added' | 'tag_removed' | 'created' | 'updated' | 'transfer' | 'appointment' | 'form_submission'
      activityType: text("activity_type").notNull(),
      // Activity details
      title: text("title").notNull(),
      // Short description: "Stage changed to Hot Lead"
      description: text("description"),
      // Longer description if needed
      // Metadata for different activity types
      metadata: jsonb("metadata").$type(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertLeadActivitySchema = createInsertSchema(leadActivities).omit({
      id: true,
      createdAt: true
    });
    crmCategoryPreferences = pgTable("crm_category_preferences", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Column order - array of category IDs in display order
      columnOrder: text("column_order").array().notNull().default(sql`ARRAY['warm', 'hot', 'appointment_booked', 'form_submitted', 'call_transfer', 'need_follow_up']::text[]`),
      // Color overrides - JSON object mapping category ID to hex color
      colorOverrides: jsonb("color_overrides").$type().default({}),
      // Per-column sort preferences - JSON object mapping category ID to sort preference
      columnSortPreferences: jsonb("column_sort_preferences").$type().default({}),
      // Filtering Settings
      hideLeadsWithoutPhone: boolean("hide_leads_without_phone").notNull().default(false),
      // Pipeline stage mappings - which AI categories go to which pipeline stage
      // Maps aiCategory (hot/warm/cold) to pipeline stage id or name
      categoryPipelineMappings: jsonb("category_pipeline_mappings").$type().default({}),
      // Score thresholds for lead classification
      // hot: score >= hotThreshold, warm: score >= warmThreshold, cold: score < warmThreshold
      hotScoreThreshold: integer("hot_score_threshold").default(80),
      warmScoreThreshold: integer("warm_score_threshold").default(50),
      // Hide specific classifications from view
      hiddenCategories: text("hidden_categories").array().default(sql`ARRAY[]::text[]`),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertCrmCategoryPreferencesSchema = createInsertSchema(crmCategoryPreferences).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    websiteWidgets = pgTable("website_widgets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Basic Info
      name: text("name").notNull(),
      description: text("description"),
      status: text("status").notNull().default("active"),
      // active, paused, disabled
      // Agent Configuration - which AI agent powers this widget
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      agentType: text("agent_type").notNull().default("natural"),
      // natural, flow
      // Branding
      iconUrl: text("icon_url"),
      // Custom icon for the chat bubble
      iconPath: text("icon_path"),
      // File path for uploaded icon
      brandName: text("brand_name"),
      // Display name shown in widget
      buttonLabel: text("button_label").notNull().default("VOICE CHAT"),
      // Customizable button text
      primaryColor: text("primary_color").notNull().default("#3B82F6"),
      // Main color
      accentColor: text("accent_color").notNull().default("#1E40AF"),
      // Secondary color
      backgroundColor: text("background_color").notNull().default("#FFFFFF"),
      // Widget background
      textColor: text("text_color").notNull().default("#1F2937"),
      // Text color
      // Terms & Conditions
      requireTermsAcceptance: boolean("require_terms_acceptance").notNull().default(false),
      // Show terms checkbox before call
      // Widget Text Content
      welcomeMessage: text("welcome_message").notNull().default("Hi! Click to start a voice conversation."),
      launcherText: text("launcher_text").notNull().default("Talk to us"),
      offlineMessage: text("offline_message").notNull().default("We're currently unavailable. Please try again later."),
      lowCreditsMessage: text("low_credits_message").notNull().default("Service temporarily unavailable."),
      // Domain Whitelisting
      allowedDomains: text("allowed_domains").array().notNull().default(sql`ARRAY[]::text[]`),
      // Empty = allow all
      // Business Hours
      businessHoursEnabled: boolean("business_hours_enabled").notNull().default(false),
      businessHoursStart: text("business_hours_start").default("09:00"),
      // HH:MM format
      businessHoursEnd: text("business_hours_end").default("17:00"),
      // HH:MM format
      businessDays: text("business_days").array().default(sql`ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday']::text[]`),
      businessTimezone: text("business_timezone").default("America/New_York"),
      // Call Limits & Abuse Prevention
      maxConcurrentCalls: integer("max_concurrent_calls").notNull().default(5),
      maxCallDuration: integer("max_call_duration").notNull().default(300),
      // seconds (5 minutes default)
      cooldownMinutes: integer("cooldown_minutes").notNull().default(0),
      // minutes between calls per IP (0 = no cooldown)
      // Appointment Booking
      appointmentBookingEnabled: boolean("appointment_booking_enabled").notNull().default(false),
      // Embed Token - used to identify widget in public API
      embedToken: text("embed_token").notNull().unique(),
      // Analytics
      totalCalls: integer("total_calls").notNull().default(0),
      totalMinutes: integer("total_minutes").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertWebsiteWidgetSchema = createInsertSchema(websiteWidgets).omit({
      id: true,
      totalCalls: true,
      totalMinutes: true,
      createdAt: true,
      updatedAt: true
    });
    widgetCallSessions = pgTable("widget_call_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      widgetId: varchar("widget_id").notNull().references(() => websiteWidgets.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Session Info
      sessionToken: text("session_token").notNull().unique(),
      visitorIp: text("visitor_ip"),
      visitorDomain: text("visitor_domain"),
      // Domain where widget is embedded
      // Call State
      status: text("status").notNull().default("pending"),
      // pending, connecting, active, completed, failed
      duration: integer("duration"),
      // seconds
      creditsUsed: integer("credits_used").default(0),
      // Recording & Transcript
      recordingUrl: text("recording_url"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      sentiment: text("sentiment"),
      // OpenAI Realtime connection
      openaiSessionId: text("openai_session_id"),
      openaiCredentialId: varchar("openai_credential_id"),
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertWidgetCallSessionSchema = createInsertSchema(widgetCallSessions).omit({
      id: true,
      createdAt: true
    });
    API_SCOPES = {
      // Read scopes
      "calls:read": "View call history and details",
      "campaigns:read": "View campaigns",
      "agents:read": "View agents",
      "contacts:read": "View contacts",
      "knowledge:read": "View knowledge bases",
      "phone-numbers:read": "View phone numbers",
      "webhooks:read": "View webhook subscriptions",
      "credits:read": "View credit balance and usage",
      "analytics:read": "View analytics data",
      // Write scopes
      "calls:write": "Trigger and manage calls",
      "campaigns:write": "Create and manage campaigns",
      "agents:write": "Create and manage agents",
      "contacts:write": "Create and manage contacts",
      "knowledge:write": "Upload knowledge base documents",
      "phone-numbers:write": "Purchase and assign phone numbers",
      "webhooks:write": "Manage webhook subscriptions",
      // Admin scopes
      "admin": "Full administrative access"
    };
    apiKeys = pgTable("api_keys", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Key identification
      name: text("name").notNull(),
      // User-friendly name: "Production Key", "CRM Integration"
      keyPrefix: text("key_prefix").notNull(),
      // First 8 chars of key for identification: "agl_1234..."
      hashedSecret: text("hashed_secret").notNull(),
      // bcrypt hash of the secret key
      // Permissions
      scopes: text("scopes").array().notNull().default(sql`ARRAY['calls:read', 'calls:write', 'campaigns:read', 'contacts:read']::text[]`),
      // Rate limiting
      rateLimit: integer("rate_limit").notNull().default(100),
      // Requests per minute
      rateLimitWindow: integer("rate_limit_window").notNull().default(60),
      // Window in seconds
      // Security
      ipWhitelist: text("ip_whitelist").array().default(sql`ARRAY[]::text[]`),
      // Empty = allow all
      expiresAt: timestamp("expires_at"),
      // Optional expiration
      // Status
      isActive: boolean("is_active").notNull().default(true),
      lastUsedAt: timestamp("last_used_at"),
      lastUsedIp: text("last_used_ip"),
      totalRequests: integer("total_requests").notNull().default(0),
      // Metadata
      description: text("description"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertApiKeySchema = createInsertSchema(apiKeys).omit({
      id: true,
      lastUsedAt: true,
      lastUsedIp: true,
      totalRequests: true,
      createdAt: true,
      updatedAt: true
    });
    apiAuditLogs = pgTable("api_audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      apiKeyId: varchar("api_key_id").references(() => apiKeys.id, { onDelete: "set null" }),
      // Request details
      method: text("method").notNull(),
      // GET, POST, PUT, DELETE
      endpoint: text("endpoint").notNull(),
      // /v1/calls, /v1/campaigns/:id
      path: text("path").notNull(),
      // Full path with params: /v1/campaigns/abc-123
      // Request info
      requestBody: jsonb("request_body"),
      // Sanitized request body (no secrets)
      queryParams: jsonb("query_params"),
      // Response info
      statusCode: integer("status_code").notNull(),
      responseTime: integer("response_time"),
      // Milliseconds
      errorMessage: text("error_message"),
      // Client info
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      // Correlation
      requestId: text("request_id").notNull(),
      // Unique ID for request tracing
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertApiAuditLogSchema = createInsertSchema(apiAuditLogs).omit({
      id: true,
      createdAt: true
    });
    apiRateLimits = pgTable("api_rate_limits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      apiKeyId: varchar("api_key_id").notNull().references(() => apiKeys.id, { onDelete: "cascade" }),
      windowStart: timestamp("window_start").notNull(),
      requestCount: integer("request_count").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    sipTrunks = pgTable("sip_trunks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      engine: text("engine").notNull(),
      // 'elevenlabs-sip' | 'openai-sip'
      provider: text("provider").notNull().default("generic"),
      // SIP provider: twilio, plivo, telnyx, vonage, exotel, bandwidth, didww, zadarma, cloudonix, ringcentral, sinch, infobip, generic
      sipHost: text("sip_host").notNull(),
      sipPort: integer("sip_port").notNull().default(5060),
      transport: text("transport").notNull().default("tls"),
      // 'udp' | 'tcp' | 'tls' - used for OUTBOUND
      mediaEncryption: text("media_encryption").notNull().default("require"),
      // 'require' | 'prefer' | 'none'
      // Inbound-specific settings (for receiving calls from provider to ElevenLabs)
      // These can differ from outbound settings - e.g., Twilio uses TCP:5060 for inbound but TLS:5061 for outbound
      inboundTransport: text("inbound_transport").default("tcp"),
      // 'udp' | 'tcp' | 'tls' - used for INBOUND
      inboundPort: integer("inbound_port").default(5060),
      // Port for inbound SIP (ElevenLabs listens on this)
      codecsAllowed: text("codecs_allowed").array().default(sql`ARRAY['PCMU', 'PCMA']::text[]`),
      username: text("username"),
      password: text("password"),
      // Stored encrypted at application layer
      realm: text("realm"),
      registrarHost: text("registrar_host"),
      externalElevenLabsId: text("external_elevenlabs_id"),
      isActive: boolean("is_active").notNull().default(true),
      healthStatus: text("health_status").notNull().default("unknown"),
      lastHealthCheck: timestamp("last_health_check"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSipTrunkSchema = createInsertSchema(sipTrunks).omit({
      id: true,
      healthStatus: true,
      lastHealthCheck: true,
      createdAt: true,
      updatedAt: true
    });
    sipPhoneNumbers = pgTable("sip_phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sipTrunkId: varchar("sip_trunk_id").notNull().references(() => sipTrunks.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      phoneNumber: text("phone_number").notNull(),
      label: text("label"),
      engine: text("engine").notNull(),
      // Inherited from trunk: 'elevenlabs-sip' | 'openai-sip'
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      inboundEnabled: boolean("inbound_enabled").notNull().default(true),
      outboundEnabled: boolean("outbound_enabled").notNull().default(true),
      externalElevenLabsPhoneId: text("external_elevenlabs_phone_id"),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      credentialsSyncedAt: timestamp("credentials_synced_at"),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSipPhoneNumberSchema = createInsertSchema(sipPhoneNumbers).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    sipCalls = pgTable("sip_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id),
      contactId: varchar("contact_id").references(() => contacts.id),
      sipTrunkId: varchar("sip_trunk_id").references(() => sipTrunks.id),
      sipPhoneNumberId: varchar("sip_phone_number_id").references(() => sipPhoneNumbers.id, { onDelete: "set null" }),
      engine: varchar("engine", { length: 50 }).notNull(),
      // 'elevenlabs-sip' | 'openai-sip'
      externalCallId: varchar("external_call_id", { length: 255 }),
      openaiCallId: varchar("openai_call_id", { length: 255 }),
      elevenlabsConversationId: varchar("elevenlabs_conversation_id", { length: 255 }),
      fromNumber: varchar("from_number", { length: 50 }),
      toNumber: varchar("to_number", { length: 50 }),
      direction: varchar("direction", { length: 20 }).notNull(),
      // 'inbound' | 'outbound'
      status: varchar("status", { length: 50 }).default("initiated"),
      durationSeconds: integer("duration_seconds").default(0),
      creditsUsed: decimal("credits_used", { precision: 10, scale: 2 }).default("0"),
      recordingUrl: text("recording_url"),
      transcript: jsonb("transcript"),
      // Matches SQL migration column name
      aiSummary: text("ai_summary"),
      sentiment: varchar("sentiment", { length: 50 }),
      classification: varchar("classification", { length: 50 }),
      sipHeaders: jsonb("sip_headers"),
      metadata: jsonb("metadata"),
      // Matches SQL migration column name
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => ({
      sipCallsUserIdIdx: index("sip_calls_user_id_idx").on(table.userId),
      sipCallsCampaignIdIdx: index("sip_calls_campaign_id_idx").on(table.campaignId),
      sipCallsContactIdIdx: index("sip_calls_contact_id_idx").on(table.contactId),
      sipCallsStatusIdx: index("sip_calls_status_idx").on(table.status),
      sipCallsCreatedAtIdx: index("sip_calls_created_at_idx").on(table.createdAt),
      // sipCalls has no call_id FK — uses externalCallId/openaiCallId/elevenlabsConversationId
      sipCallsExternalCallIdIdx: index("sip_calls_external_call_id_idx").on(table.externalCallId),
      sipCallsElevenlabsConversationIdIdx: index("sip_calls_elevenlabs_conversation_id_idx").on(table.elevenlabsConversationId)
    }));
    insertSipCallSchema = createInsertSchema(sipCalls).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    userAddresses = pgTable("user_addresses", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Address details
      customerName: text("customer_name").notNull(),
      street: text("street").notNull(),
      city: text("city").notNull(),
      region: text("region").notNull(),
      // State/Province
      postalCode: text("postal_code").notNull(),
      isoCountry: text("iso_country").notNull(),
      // ISO 3166-1 alpha-2 country code (e.g., AU, GB, DE)
      // Twilio integration
      twilioAddressSid: text("twilio_address_sid"),
      // Twilio Address SID after creation
      // Status tracking
      status: text("status").notNull().default("pending"),
      // pending, submitted, verified, rejected
      verificationStatus: text("verification_status"),
      // Twilio's verification status
      validationStatus: text("validation_status"),
      // Twilio's validation status
      rejectionReason: text("rejection_reason"),
      // Reason if rejected
      // Timestamps
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserAddressSchema = createInsertSchema(userAddresses).omit({
      id: true,
      twilioAddressSid: true,
      status: true,
      verificationStatus: true,
      validationStatus: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true
    });
    userFeedback = pgTable("user_feedback", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      // 'bug' | 'feature' | 'improvement' | 'other'
      subject: text("subject").notNull(),
      description: text("description").notNull(),
      status: text("status").notNull().default("open"),
      // 'open' | 'in_progress' | 'resolved' | 'closed'
      priority: text("priority").default("medium"),
      // 'low' | 'medium' | 'high' | 'critical'
      adminResponse: text("admin_response"),
      respondedBy: varchar("responded_by").references(() => users.id),
      respondedAt: timestamp("responded_at"),
      pageUrl: text("page_url"),
      // Where the feedback was submitted from
      userAgent: text("user_agent"),
      // Browser/device info for bug reports
      screenshot: text("screenshot"),
      // Optional base64 screenshot
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
      id: true,
      status: true,
      priority: true,
      adminResponse: true,
      respondedBy: true,
      respondedAt: true,
      createdAt: true,
      updatedAt: true
    });
    googleCalendarCredentials = pgTable("google_calendar_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().unique(),
      accessToken: text("access_token").notNull(),
      refreshToken: text("refresh_token").notNull(),
      tokenExpiry: timestamp("token_expiry").notNull(),
      connectedEmail: text("connected_email").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertGoogleCalendarCredentialSchema = createInsertSchema(googleCalendarCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    googleSheetsCredentials = pgTable("google_sheets_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().unique(),
      accessToken: text("access_token").notNull(),
      refreshToken: text("refresh_token").notNull(),
      tokenExpiry: timestamp("token_expiry").notNull(),
      connectedEmail: text("connected_email").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertGoogleSheetsCredentialSchema = createInsertSchema(googleSheetsCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    phoneReleaseRetryQueue = pgTable("phone_release_retry_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      phoneNumberId: varchar("phone_number_id").notNull(),
      provider: text("provider").notNull(),
      // 'twilio' | 'plivo'
      providerSid: text("provider_sid").notNull(),
      // twilioSid or plivoPhoneNumberId
      userId: varchar("user_id"),
      attempts: integer("attempts").notNull().default(0),
      lastError: text("last_error"),
      nextRetryAt: timestamp("next_retry_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      phoneReleaseRetryQueueNextRetryAtIdx: index("phone_release_retry_queue_next_retry_at_idx").on(table.nextRetryAt),
      phoneReleaseRetryQueuePhoneNumberIdIdx: index("phone_release_retry_queue_phone_number_id_idx").on(table.phoneNumberId)
    }));
    insertPhoneReleaseRetryQueueSchema = createInsertSchema(phoneReleaseRetryQueue).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
  }
});

// server/infrastructure/database/connection-pool.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
var DatabasePoolManager, databasePoolManager;
var init_connection_pool = __esm({
  "server/infrastructure/database/connection-pool.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_schema();
    DatabasePoolManager = class {
      pool = null;
      drizzleInstance = null;
      isInitialized = false;
      settings = {
        minConnections: 2,
        maxConnections: 20,
        idleTimeoutMs: 3e4
      };
      async initialize() {
        if (this.isInitialized) {
          console.log("[DB Pool] Already initialized, skipping");
          return;
        }
        console.log("[DB Pool] Initializing connection pool...");
        await this.loadSettings();
        await this.createPool();
        this.isInitialized = true;
        console.log("[DB Pool] Initialization complete");
      }
      async loadSettings() {
        console.log("[DB Pool] Loading settings from globalSettings table...");
        try {
          const settings = await defaultDb.select().from(globalSettings).where(
            eq(globalSettings.key, "db_pool_min_connections")
          );
          const minConnectionsSetting = settings[0];
          const maxConnectionsResult = await defaultDb.select().from(globalSettings).where(eq(globalSettings.key, "db_pool_max_connections"));
          const idleTimeoutResult = await defaultDb.select().from(globalSettings).where(eq(globalSettings.key, "db_pool_idle_timeout_ms"));
          if (minConnectionsSetting?.value) {
            this.settings.minConnections = Number(minConnectionsSetting.value);
          }
          if (maxConnectionsResult[0]?.value) {
            this.settings.maxConnections = Number(maxConnectionsResult[0].value);
          }
          if (idleTimeoutResult[0]?.value) {
            this.settings.idleTimeoutMs = Number(idleTimeoutResult[0].value);
          }
          console.log(`[DB Pool] Settings loaded: min=${this.settings.minConnections}, max=${this.settings.maxConnections}, idleTimeout=${this.settings.idleTimeoutMs}ms`);
        } catch (error) {
          console.log(`[DB Pool] Failed to load settings, using defaults: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      async createPool() {
        if (!process.env.DATABASE_URL) {
          throw new Error("[DB Pool] DATABASE_URL environment variable is not set");
        }
        console.log("[DB Pool] Creating pool with dynamic configuration...");
        this.pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          min: this.settings.minConnections,
          max: this.settings.maxConnections,
          idleTimeoutMillis: this.settings.idleTimeoutMs
        });
        this.setupEventListeners();
        console.log("[DB Pool] Pool created successfully");
      }
      setupEventListeners() {
        if (!this.pool) return;
        this.pool.on("connect", (client) => {
          console.log("[DB Pool] New client connected");
        });
        this.pool.on("acquire", (client) => {
          console.log("[DB Pool] Client acquired from pool");
        });
        this.pool.on("remove", (client) => {
          console.log("[DB Pool] Client removed from pool");
        });
        this.pool.on("error", (err, client) => {
          console.log(`[DB Pool] Error on idle client: ${err.message}`);
        });
        console.log("[DB Pool] Event listeners configured");
      }
      async healthCheck() {
        if (!this.pool) {
          return {
            healthy: false,
            message: "Pool not initialized"
          };
        }
        try {
          const client = await this.pool.connect();
          const result = await client.query("SELECT 1 as health_check");
          client.release();
          if (result.rows[0]?.health_check === 1) {
            const stats = this.getStats();
            console.log("[DB Pool] Health check passed");
            return {
              healthy: true,
              message: "Database connection is healthy",
              stats
            };
          }
          return {
            healthy: false,
            message: "Health check query returned unexpected result"
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.log(`[DB Pool] Health check failed: ${message}`);
          return {
            healthy: false,
            message: `Health check failed: ${message}`
          };
        }
      }
      getStats() {
        if (!this.pool) {
          return {
            total: 0,
            idle: 0,
            waiting: 0
          };
        }
        return {
          total: this.pool.totalCount,
          idle: this.pool.idleCount,
          waiting: this.pool.waitingCount
        };
      }
      async shutdown() {
        if (!this.pool) {
          console.log("[DB Pool] No pool to shut down");
          return;
        }
        console.log("[DB Pool] Initiating graceful shutdown...");
        try {
          await this.pool.end();
          this.pool = null;
          this.drizzleInstance = null;
          this.isInitialized = false;
          console.log("[DB Pool] Graceful shutdown complete");
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.log(`[DB Pool] Shutdown error: ${message}`);
          throw error;
        }
      }
      getPool() {
        return this.pool;
      }
      getDrizzle() {
        if (!this.pool) {
          throw new Error("[DB Pool] Pool not initialized. Call initialize() first.");
        }
        if (!this.drizzleInstance) {
          this.drizzleInstance = drizzle(this.pool, { schema: schema_exports });
        }
        return this.drizzleInstance;
      }
      getSettings() {
        return { ...this.settings };
      }
      isReady() {
        return this.isInitialized && this.pool !== null;
      }
    };
    databasePoolManager = new DatabasePoolManager();
  }
});

// server/db.ts
import "dotenv/config";
import { drizzle as drizzle2 } from "drizzle-orm/node-postgres";
import { Pool as Pool2 } from "pg";
var defaultPool, defaultDb, pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_connection_pool();
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    defaultPool = new Pool2({
      connectionString: process.env.DATABASE_URL
    });
    defaultDb = drizzle2(defaultPool, { schema: schema_exports });
    pool = new Proxy(defaultPool, {
      get(target, prop, receiver) {
        const managedPool = databasePoolManager.getPool();
        return Reflect.get(managedPool || target, prop, receiver);
      }
    });
    db = new Proxy(defaultDb, {
      get(target, prop, receiver) {
        if (databasePoolManager.isReady()) {
          return Reflect.get(databasePoolManager.getDrizzle(), prop, receiver);
        }
        return Reflect.get(target, prop, receiver);
      }
    });
  }
});

// plugins/messaging/services/email-sender.service.ts
import { sql as sql2 } from "drizzle-orm";
import nodemailer from "nodemailer";
function cleanDbValue(value) {
  if (!value) return "";
  let cleaned = value.trim();
  while (cleaned.startsWith('"""') && cleaned.endsWith('"""') || cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length > 2) {
    if (cleaned.startsWith('"""') && cleaned.endsWith('"""')) {
      cleaned = cleaned.slice(3, -3);
    } else if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1);
    }
    cleaned = cleaned.trim();
  }
  return cleaned;
}
function createTransporter(host, portNum, user, pass) {
  return nodemailer.createTransport({
    host,
    port: portNum,
    secure: portNum === 465,
    requireTLS: portNum === 587,
    pool: true,
    maxConnections: 5,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15e3,
    greetingTimeout: 15e3,
    socketTimeout: 15e3
  });
}
async function initializeFromDatabase() {
  try {
    const settings = await db.execute(sql2`
      SELECT key, value FROM global_settings WHERE key IN ('smtp_host', 'smtp_port', 'smtp_username', 'smtp_password', 'smtp_from_email', 'smtp_from_name')
    `);
    let rows = [];
    if (Array.isArray(settings)) {
      rows = settings;
    } else if (Array.isArray(settings.rows)) {
      rows = settings.rows;
    }
    const map = {};
    for (const row of rows) {
      map[row.key] = typeof row.value === "string" ? row.value : String(row.value ?? "");
    }
    const host = cleanDbValue(map["smtp_host"]);
    const port = map["smtp_port"];
    const user = cleanDbValue(map["smtp_username"]);
    const pass = cleanDbValue(map["smtp_password"]);
    const fromEmail = cleanDbValue(map["smtp_from_email"]);
    const fName = cleanDbValue(map["smtp_from_name"]);
    if (host && port && user && pass) {
      const portNum = typeof port === "string" ? parseInt(port, 10) : Number(port);
      transporter = createTransporter(host, portNum, user, pass);
      smtpConfigured = true;
      fromAddress = fromEmail || user || "";
      fromName = fName || "";
      return true;
    }
    console.warn("[Email Sender] SMTP settings incomplete in admin panel (missing host, port, username, or password).");
  } catch (error) {
    console.warn("[Email Sender] Could not load SMTP settings from database:", error.message);
  }
  smtpConfigured = false;
  transporter = null;
  return false;
}
async function sendEmail(to, subject, html) {
  const dbLoaded = await initializeFromDatabase();
  if (!dbLoaded || !smtpConfigured || !transporter) {
    const reason = "SMTP not configured. Please set up SMTP in Admin Settings \u2192 Master Settings.";
    console.warn(`[Email Sender] Cannot send to ${to}: ${reason}`);
    return { success: false, error: reason };
  }
  const from = fromName ? `"${fromName}" <${fromAddress}>` : fromAddress;
  if (!from) {
    return { success: false, error: "No from address configured in Admin Settings \u2192 Master Settings." };
  }
  try {
    const info = await transporter.sendMail({ from, to, subject, html });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Sender] Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
}
var transporter, fromAddress, fromName, smtpConfigured;
var init_email_sender_service = __esm({
  "plugins/messaging/services/email-sender.service.ts"() {
    "use strict";
    init_db();
    transporter = null;
    fromAddress = "";
    fromName = "";
    smtpConfigured = false;
  }
});

// plugins/messaging/services/messaging-log.service.ts
import { sql as sql3 } from "drizzle-orm";
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel(key)] = row[key];
  }
  return transformed;
}
var MessagingLogService, messagingLogService;
var init_messaging_log_service = __esm({
  "plugins/messaging/services/messaging-log.service.ts"() {
    "use strict";
    init_db();
    MessagingLogService = class {
      async logMessage(userId, channel, data) {
        const result = await db.execute(sql3`
      INSERT INTO messaging_logs (user_id, call_id, agent_id, channel, recipient_phone, recipient_email, template_name, status, response_data, error_message, message_content, message_type)
      VALUES (${userId}, ${data.callId || null}, ${data.agentId || null}, ${channel}, ${data.recipientPhone || null}, ${data.recipientEmail || null}, ${data.templateName}, ${data.status}, ${data.responseData ? JSON.stringify(data.responseData) : null}::jsonb, ${data.errorMessage || null}, ${data.messageContent || null}, ${data.messageType || null})
      RETURNING *
    `);
        return transformRow(result.rows[0]);
      }
      async getLogs(userId, filters = {}) {
        const limit = filters.limit || 50;
        const offset = filters.offset || 0;
        const channel = filters.channel && ["email", "whatsapp"].includes(filters.channel) ? filters.channel : null;
        const status = filters.status && ["sent", "failed", "pending"].includes(filters.status) ? filters.status : null;
        const countResult = await db.execute(sql3`
      SELECT COUNT(*) as total FROM messaging_logs
      WHERE user_id = ${userId}
        AND (${channel}::text IS NULL OR channel = ${channel})
        AND (${status}::text IS NULL OR status = ${status})
    `);
        const result = await db.execute(sql3`
      SELECT * FROM messaging_logs
      WHERE user_id = ${userId}
        AND (${channel}::text IS NULL OR channel = ${channel})
        AND (${status}::text IS NULL OR status = ${status})
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);
        const total = parseInt(countResult.rows[0]?.total || "0", 10);
        const logs = result.rows.map((row) => transformRow(row));
        return { logs, total };
      }
      async getAdminLogs(filters = {}) {
        const limit = filters.limit || 50;
        const offset = filters.offset || 0;
        const channel = filters.channel && ["email", "whatsapp"].includes(filters.channel) ? filters.channel : null;
        const status = filters.status && ["sent", "failed", "pending"].includes(filters.status) ? filters.status : null;
        const countResult = await db.execute(sql3`
      SELECT COUNT(*) as total FROM messaging_logs
      WHERE (${channel}::text IS NULL OR channel = ${channel})
        AND (${status}::text IS NULL OR status = ${status})
    `);
        const result = await db.execute(sql3`
      SELECT ml.*, u.name as user_name, u.email as user_email
      FROM messaging_logs ml
      LEFT JOIN users u ON ml.user_id = u.id
      WHERE (${channel}::text IS NULL OR ml.channel = ${channel})
        AND (${status}::text IS NULL OR ml.status = ${status})
      ORDER BY ml.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);
        const total = parseInt(countResult.rows[0]?.total || "0", 10);
        const logs = result.rows.map((row) => ({
          ...transformRow(row),
          userName: row.user_name || row.user_email || row.user_id
        }));
        return { logs, total };
      }
      async getStats() {
        const result = await db.execute(sql3`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'sent') as success_count,
        COUNT(*) FILTER (WHERE status = 'failed') as failed_count,
        COUNT(*) FILTER (WHERE channel = 'email') as email_count,
        COUNT(*) FILTER (WHERE channel = 'whatsapp') as whatsapp_count
      FROM messaging_logs
    `);
        const row = result.rows[0];
        const total = parseInt(row?.total || "0", 10);
        const successCount = parseInt(row?.success_count || "0", 10);
        const failedCount = parseInt(row?.failed_count || "0", 10);
        return {
          totalSent: total,
          totalFailed: failedCount,
          successCount,
          failedCount,
          emailCount: parseInt(row?.email_count || "0", 10),
          whatsappCount: parseInt(row?.whatsapp_count || "0", 10),
          successRate: total > 0 ? successCount / total * 100 : 0
        };
      }
    };
    messagingLogService = new MessagingLogService();
  }
});

// plugins/messaging/services/email-template.service.ts
var email_template_service_exports = {};
__export(email_template_service_exports, {
  EmailTemplateService: () => EmailTemplateService,
  emailTemplateService: () => emailTemplateService
});
import { sql as sql4 } from "drizzle-orm";
function snakeToCamel2(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow2(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel2(key)] = row[key];
  }
  return transformed;
}
var EmailTemplateService, emailTemplateService;
var init_email_template_service = __esm({
  "plugins/messaging/services/email-template.service.ts"() {
    "use strict";
    init_db();
    init_email_sender_service();
    init_messaging_log_service();
    EmailTemplateService = class {
      async getAll(userId) {
        const result = await db.execute(sql4`
      SELECT * FROM user_email_templates WHERE user_id = ${userId} ORDER BY created_at DESC
    `);
        return result.rows.map((row) => transformRow2(row));
      }
      async getById(userId, id) {
        const result = await db.execute(sql4`
      SELECT * FROM user_email_templates WHERE id = ${id} AND user_id = ${userId} LIMIT 1
    `);
        const row = result.rows[0];
        return row ? transformRow2(row) : null;
      }
      async getByName(userId, name) {
        const result = await db.execute(sql4`
      SELECT * FROM user_email_templates WHERE name = ${name} AND user_id = ${userId} AND is_active = true LIMIT 1
    `);
        const row = result.rows[0];
        return row ? transformRow2(row) : null;
      }
      async create(userId, data) {
        const variables = data.variables || [];
        const pgArray = `{${variables.map((v) => `"${v.replace(/"/g, '\\"')}"`).join(",")}}`;
        const designJson = data.designJson ? JSON.stringify(data.designJson) : null;
        const result = await db.execute(sql4`
      INSERT INTO user_email_templates (user_id, name, subject, html_body, variables, design_json)
      VALUES (${userId}, ${data.name}, ${data.subject}, ${data.htmlBody}, ${pgArray}::text[], ${designJson}::jsonb)
      RETURNING *
    `);
        return transformRow2(result.rows[0]);
      }
      async update(userId, id, data) {
        const existing = await this.getById(userId, id);
        if (!existing) return null;
        const name = data.name ?? existing.name;
        const subject = data.subject ?? existing.subject;
        const htmlBody = data.htmlBody ?? existing.htmlBody;
        const isActive = data.isActive ?? existing.isActive;
        const variables = data.variables ?? existing.variables ?? [];
        const pgArray = `{${variables.map((v) => `"${v.replace(/"/g, '\\"')}"`).join(",")}}`;
        const designJson = data.designJson !== void 0 ? data.designJson ? JSON.stringify(data.designJson) : null : existing.designJson ? JSON.stringify(existing.designJson) : null;
        const result = await db.execute(sql4`
      UPDATE user_email_templates
      SET name = ${name}, subject = ${subject}, html_body = ${htmlBody}, is_active = ${isActive},
          variables = ${pgArray}::text[],
          design_json = ${designJson}::jsonb,
          updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `);
        const row = result.rows[0];
        return row ? transformRow2(row) : null;
      }
      async delete(userId, id) {
        const result = await db.execute(sql4`
      DELETE FROM user_email_templates WHERE id = ${id} AND user_id = ${userId}
    `);
        return result.rowCount > 0;
      }
      wrapAgentEmailTemplate(content) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{company_name}}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .email-container {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      padding: 32px;
      text-align: center;
    }
    .email-logo {
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .email-tagline {
      color: #94a3b8;
      font-size: 14px;
      margin: 8px 0 0 0;
    }
    .email-body {
      padding: 40px 32px;
    }
    .email-title {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 16px 0;
    }
    .email-text {
      font-size: 16px;
      color: #4b5563;
      margin: 0 0 24px 0;
    }
    .email-highlight-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .email-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    .email-table td {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
      font-size: 15px;
    }
    .email-table td:first-child {
      color: #6b7280;
    }
    .email-table td:last-child {
      text-align: right;
      font-weight: 500;
      color: #1f2937;
    }
    .email-table tr:last-child td {
      border-bottom: none;
      font-weight: 600;
    }
    .email-alert {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 24px 0;
      border-radius: 0 8px 8px 0;
    }
    .email-alert-success {
      background: #dcfce7;
      border-left-color: #22c55e;
    }
    .email-alert-info {
      background: #dbeafe;
      border-left-color: #3b82f6;
    }
    .email-footer {
      background: #f8fafc;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .email-footer-text {
      font-size: 13px;
      color: #9ca3af;
      margin: 0 0 12px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 12px;
      }
      .email-body {
        padding: 28px 20px;
      }
      .email-header {
        padding: 24px 20px;
      }
      .email-title {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header">
        <h1 class="email-logo">{{company_name}}</h1>
      </div>
      ${content}
      <div class="email-footer">
        <p class="email-footer-text">
          &copy; {{company_name}}. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
      }
      buildUnlayerRow(rowN, colN, contents, bgColor = "#ffffff", rowPadding = "0px") {
        return {
          id: `u_row_${rowN}`,
          cells: [1],
          columns: [
            {
              id: `u_column_${colN}`,
              contents: contents.map((c) => ({
                id: `u_content_text_${c.n}`,
                type: "text",
                values: {
                  containerPadding: c.padding || "16px 40px",
                  anchor: "",
                  fontSize: "14px",
                  textAlign: "left",
                  lineHeight: "140%",
                  linkStyle: { body: true, inherit: true },
                  hideDesktop: false,
                  displayCondition: null,
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: c.html,
                  _meta: { htmlID: `u_content_text_${c.n}`, htmlClassNames: "u_content_text" },
                  effectEnabled: false,
                  color: "#000000"
                }
              })),
              values: {
                _meta: { htmlID: `u_column_${colN}`, htmlClassNames: "u_column" },
                border: {},
                padding: "0px",
                backgroundColor: ""
              }
            }
          ],
          values: {
            displayCondition: null,
            columns: false,
            backgroundColor: bgColor,
            columnsBackgroundColor: "",
            backgroundImage: { url: "", fullWidth: true, repeat: "no-repeat", size: "custom", position: "center" },
            padding: rowPadding,
            anchor: "",
            hideDesktop: false,
            _meta: { htmlID: `u_row_${rowN}`, htmlClassNames: "u_row" },
            selectable: true,
            draggable: true,
            duplicatable: true,
            deletable: true,
            hideable: true
          }
        };
      }
      buildUnlayerDesign(rows, totalTexts) {
        return {
          counters: {
            u_column: rows.length,
            u_row: rows.length,
            u_content_text: totalTexts,
            u_content_image: 0,
            u_content_button: 0,
            u_content_divider: 0,
            u_content_social: 0,
            u_content_html: 0
          },
          body: {
            id: "u_body",
            rows,
            headers: [],
            footers: [],
            values: {
              popupPosition: "center",
              popupWidth: "600px",
              popupHeight: "auto",
              borderRadius: "10px",
              contentAlign: "center",
              contentVerticalAlign: "center",
              contentWidth: 600,
              fontFamily: { label: "Arial", value: "arial,helvetica,sans-serif" },
              textColor: "#000000",
              popupBackgroundColor: "#FFFFFF",
              popupBackgroundImage: { url: "", fullWidth: true, repeat: "no-repeat", size: "cover", position: "center" },
              popupOverlay_backgroundColor: "rgba(0,0,0,0.1)",
              popupCloseButton_position: "top-right",
              popupCloseButton_backgroundColor: "#DDDDDD",
              popupCloseButton_iconColor: "#000000",
              popupCloseButton_borderRadius: "0px",
              popupCloseButton_margin: "0px",
              popupCloseButton_action: { name: "close_popup", attrs: { onClick: "document.querySelector('.u-popup-container').style.display='none';" } },
              backgroundColor: "#f3f4f6",
              preheaderText: "",
              linkStyle: { body: true, linkColor: "#2563eb", linkHoverColor: "#1d4ed8", linkUnderline: true, linkHoverUnderline: true, inherit: false },
              backgroundImage: { url: "", fullWidth: true, repeat: "no-repeat", size: "custom", position: "center" },
              _meta: { htmlID: "u_body", htmlClassNames: "u_body" },
              selectable: false,
              draggable: false,
              duplicatable: false,
              deletable: false,
              hideable: false
            }
          }
        };
      }
      getDefaultDesigns() {
        const HEADER_BG = "#1e293b";
        const BODY_BG = "#ffffff";
        const HIGHLIGHT_BG = "#f8fafc";
        const FOOTER_BG = "#f1f5f9";
        const headerHtml = (title) => `<div style="text-align:center;padding:8px 0;"><h1 style="margin:0 0 4px 0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">{{company_name}}</h1><p style="margin:0;font-size:13px;color:#94a3b8;">${title}</p></div>`;
        const footerHtml = () => `<p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">&copy; {{company_name}}. All rights reserved.</p>`;
        const detailsTableHtml = (rows) => {
          const trs = rows.map(
            ([label, value]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;width:40%;">${label}</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:500;color:#1f2937;font-size:14px;">${value}</td></tr>`
          ).join("");
          return `<table style="width:100%;border-collapse:collapse;">${trs}</table>`;
        };
        const highlightBox = (content) => `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px;">${content}</div>`;
        const alertBox = (content, color = "#f59e0b", bg = "#fef3c7") => `<div style="background:${bg};border-radius:6px;padding:14px 18px;"><span style="font-size:14px;color:#1f2937;">${content}</span></div>`;
        const p = (text2, style = "") => `<p style="margin:0;font-size:15px;line-height:1.6;color:#374151;${style}">${text2}</p>`;
        const h2 = (text2) => `<h2 style="margin:0 0 12px 0;font-size:22px;font-weight:600;color:#1e293b;">${text2}</h2>`;
        const gap = () => `<div style="height:16px;"></div>`;
        return {
          "Appointment Confirmation": (() => {
            const rows = [
              this.buildUnlayerRow(1, 1, [{ n: 1, html: headerHtml("Appointment Confirmed"), padding: "28px 40px" }], HEADER_BG),
              this.buildUnlayerRow(2, 2, [{
                n: 2,
                html: h2("Appointment Confirmed") + gap() + p("Hi {{contact_name}},") + gap() + p("Your appointment has been successfully booked. Here are the details:"),
                padding: "32px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(3, 3, [{
                n: 3,
                html: highlightBox(detailsTableHtml([
                  ["Date", "{{appointment_date}}"],
                  ["Time", "{{appointment_time}}"],
                  ["Service", "{{service_name}}"],
                  ["Duration", "{{duration}} minutes"]
                ])),
                padding: "0px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(4, 4, [{
                n: 4,
                html: alertBox("<strong>You're all set!</strong> We look forward to seeing you.", "#22c55e", "#dcfce7") + gap() + p("{{notes}}") + gap() + p("If you need to reschedule or cancel, please contact us.", "font-size:13px;color:#6b7280;"),
                padding: "0px 40px 32px"
              }], BODY_BG),
              this.buildUnlayerRow(5, 5, [{ n: 5, html: footerHtml(), padding: "20px 40px" }], FOOTER_BG)
            ];
            return this.buildUnlayerDesign(rows, 5);
          })(),
          "Appointment Reminder": (() => {
            const rows = [
              this.buildUnlayerRow(1, 1, [{ n: 1, html: headerHtml("Appointment Reminder"), padding: "28px 40px" }], HEADER_BG),
              this.buildUnlayerRow(2, 2, [{
                n: 2,
                html: h2("Appointment Reminder") + gap() + p("Hi {{contact_name}},") + gap() + p("This is a friendly reminder about your upcoming appointment:"),
                padding: "32px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(3, 3, [{
                n: 3,
                html: highlightBox(detailsTableHtml([
                  ["Date", "{{appointment_date}}"],
                  ["Time", "{{appointment_time}}"],
                  ["Service", "{{service_name}}"],
                  ["Duration", "{{duration}} minutes"]
                ])),
                padding: "0px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(4, 4, [{
                n: 4,
                html: alertBox("<strong>Please arrive on time.</strong> If you need to reschedule, contact us as soon as possible.", "#3b82f6", "#dbeafe") + gap() + p("{{notes}}") + gap() + p("We look forward to seeing you!", "font-size:13px;color:#6b7280;"),
                padding: "0px 40px 32px"
              }], BODY_BG),
              this.buildUnlayerRow(5, 5, [{ n: 5, html: footerHtml(), padding: "20px 40px" }], FOOTER_BG)
            ];
            return this.buildUnlayerDesign(rows, 5);
          })(),
          "Call Follow-Up": (() => {
            const rows = [
              this.buildUnlayerRow(1, 1, [{ n: 1, html: headerHtml("Thank You for Your Call"), padding: "28px 40px" }], HEADER_BG),
              this.buildUnlayerRow(2, 2, [{
                n: 2,
                html: h2("Thank You for Your Call") + gap() + p("Hi {{contact_name}},") + gap() + p("Thank you for speaking with us today. We appreciate your time and wanted to follow up with a summary of our conversation."),
                padding: "32px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(3, 3, [{
                n: 3,
                html: highlightBox(
                  `<p style="margin:0 0 10px 0;font-weight:600;font-size:14px;color:#1e293b;">Call Summary</p><p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">{{call_summary}}</p>`
                ),
                padding: "0px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(4, 4, [{
                n: 4,
                html: p("{{next_steps}}") + gap() + p("If you have any questions or need further assistance, please don't hesitate to reach out.", "font-size:13px;color:#6b7280;"),
                padding: "0px 40px 32px"
              }], BODY_BG),
              this.buildUnlayerRow(5, 5, [{ n: 5, html: footerHtml(), padding: "20px 40px" }], FOOTER_BG)
            ];
            return this.buildUnlayerDesign(rows, 5);
          })(),
          "Missed Call": (() => {
            const rows = [
              this.buildUnlayerRow(1, 1, [{ n: 1, html: headerHtml("We Missed Your Call"), padding: "28px 40px" }], HEADER_BG),
              this.buildUnlayerRow(2, 2, [{
                n: 2,
                html: h2("We Missed Your Call") + gap() + p("Hi {{contact_name}},") + gap() + p("We noticed we weren't able to connect with you during our recent call attempt. We'd love to speak with you at a time that works better."),
                padding: "32px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(3, 3, [{
                n: 3,
                html: alertBox("<strong>We tried reaching you</strong> but were unable to connect. Please feel free to call us back or let us know a convenient time.") + gap() + p("{{message}}") + gap() + p("We look forward to connecting with you soon.", "font-size:13px;color:#6b7280;"),
                padding: "0px 40px 32px"
              }], BODY_BG),
              this.buildUnlayerRow(4, 4, [{ n: 4, html: footerHtml(), padding: "20px 40px" }], FOOTER_BG)
            ];
            return this.buildUnlayerDesign(rows, 4);
          })(),
          "Welcome / Inquiry Response": (() => {
            const rows = [
              this.buildUnlayerRow(1, 1, [{ n: 1, html: headerHtml("Thank You for Your Inquiry"), padding: "28px 40px" }], HEADER_BG),
              this.buildUnlayerRow(2, 2, [{
                n: 2,
                html: h2("Thank You for Your Inquiry") + gap() + p("Hi {{contact_name}},") + gap() + p("Thank you for reaching out to us. We've received your inquiry and wanted to provide you with some helpful information."),
                padding: "32px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(3, 3, [{
                n: 3,
                html: highlightBox(`<p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">{{response_details}}</p>`),
                padding: "0px 40px 20px"
              }], BODY_BG),
              this.buildUnlayerRow(4, 4, [{
                n: 4,
                html: alertBox("<strong>We're here to help!</strong> A member of our team will follow up with you shortly if needed.", "#22c55e", "#dcfce7") + gap() + p("{{additional_info}}") + gap() + p("If you have any further questions, don't hesitate to contact us.", "font-size:13px;color:#6b7280;"),
                padding: "0px 40px 32px"
              }], BODY_BG),
              this.buildUnlayerRow(5, 5, [{ n: 5, html: footerHtml(), padding: "20px 40px" }], FOOTER_BG)
            ];
            return this.buildUnlayerDesign(rows, 5);
          })()
        };
      }
      async seedDefaultTemplates(userId) {
        const existing = await this.getAll(userId);
        const existingMap = new Map(existing.map((t) => [t.name, t]));
        const defaultDesigns = this.getDefaultDesigns();
        const defaults = [
          {
            name: "Appointment Confirmation",
            subject: "Your Appointment is Confirmed - {{company_name}}",
            variables: ["contact_name", "company_name", "appointment_date", "appointment_time", "service_name", "duration", "notes"],
            bodyContent: `<div class="email-body"><h2 class="email-title">Appointment Confirmed</h2><p class="email-text">Hi {{contact_name}},</p><p class="email-text">Your appointment has been successfully booked. Here are the details:</p><div class="email-highlight-box"><table class="email-table"><tr><td>Date</td><td>{{appointment_date}}</td></tr><tr><td>Time</td><td>{{appointment_time}}</td></tr><tr><td>Service</td><td>{{service_name}}</td></tr><tr><td>Duration</td><td>{{duration}} minutes</td></tr></table></div><p class="email-text">{{notes}}</p><p class="email-text" style="font-size:14px;color:#6b7280;">If you need to reschedule or cancel, please contact us.</p></div>`
          },
          {
            name: "Appointment Reminder",
            subject: "Reminder: Your Appointment is Coming Up - {{company_name}}",
            variables: ["contact_name", "company_name", "appointment_date", "appointment_time", "service_name", "duration", "notes"],
            bodyContent: `<div class="email-body"><h2 class="email-title">Appointment Reminder</h2><p class="email-text">Hi {{contact_name}},</p><p class="email-text">This is a friendly reminder about your upcoming appointment:</p><div class="email-highlight-box"><table class="email-table"><tr><td>Date</td><td>{{appointment_date}}</td></tr><tr><td>Time</td><td>{{appointment_time}}</td></tr><tr><td>Service</td><td>{{service_name}}</td></tr><tr><td>Duration</td><td>{{duration}} minutes</td></tr></table></div><p class="email-text">{{notes}}</p></div>`
          },
          {
            name: "Call Follow-Up",
            subject: "Thank You for Your Call - {{company_name}}",
            variables: ["contact_name", "company_name", "call_summary", "next_steps"],
            bodyContent: `<div class="email-body"><h2 class="email-title">Thank You for Your Call</h2><p class="email-text">Hi {{contact_name}},</p><p class="email-text">Thank you for speaking with us today. We appreciate your time and wanted to follow up with a summary of our conversation.</p><div class="email-highlight-box"><p style="margin:0 0 12px 0;font-weight:600;color:#1e293b;">Call Summary</p><p style="margin:0;color:#4b5563;">{{call_summary}}</p></div><p class="email-text">{{next_steps}}</p></div>`
          },
          {
            name: "Missed Call",
            subject: "We Missed Your Call - {{company_name}}",
            variables: ["contact_name", "company_name", "message"],
            bodyContent: `<div class="email-body"><h2 class="email-title">We Missed Your Call</h2><p class="email-text">Hi {{contact_name}},</p><p class="email-text">We noticed we weren't able to connect with you during our recent call attempt. We'd love to speak with you at a time that works better.</p><p class="email-text">{{message}}</p></div>`
          },
          {
            name: "Welcome / Inquiry Response",
            subject: "Thank You for Your Inquiry - {{company_name}}",
            variables: ["contact_name", "company_name", "response_details", "additional_info"],
            bodyContent: `<div class="email-body"><h2 class="email-title">Thank You for Your Inquiry</h2><p class="email-text">Hi {{contact_name}},</p><p class="email-text">Thank you for reaching out to us. We've received your inquiry and wanted to provide you with some helpful information.</p><div class="email-highlight-box"><p style="margin:0;color:#4b5563;">{{response_details}}</p></div><p class="email-text">{{additional_info}}</p></div>`
          }
        ];
        const toCreate = defaults.filter((d) => !existingMap.has(d.name));
        const toRepair = defaults.filter((d) => {
          const t = existingMap.get(d.name);
          if (!t) return false;
          const missingDesign = !t.designJson;
          const expectedVars = d.variables || [];
          const htmlHasMeaningfulContent = expectedVars.length === 0 ? !!t.htmlBody && t.htmlBody.includes("email-body") : expectedVars.some((v) => t.htmlBody && t.htmlBody.includes(`{{${v}}}`));
          const brokenHtml = !t.htmlBody || !htmlHasMeaningfulContent;
          return missingDesign || brokenHtml;
        });
        if (toCreate.length > 0) {
          console.log(`[Messaging] Seeding ${toCreate.length} default email templates for user ${userId}`);
          for (const tmpl of toCreate) {
            try {
              const design = defaultDesigns[tmpl.name];
              await this.create(userId, {
                name: tmpl.name,
                subject: tmpl.subject,
                htmlBody: this.wrapAgentEmailTemplate(tmpl.bodyContent),
                variables: tmpl.variables,
                designJson: design || null
              });
            } catch (err) {
              console.warn(`[Messaging] Failed to seed template "${tmpl.name}":`, err.message);
            }
          }
          console.log(`[Messaging] Default email templates seeded for user ${userId}`);
        }
        if (toRepair.length > 0) {
          console.log(`[Messaging] Repairing ${toRepair.length} template(s) with missing/broken content for user ${userId}`);
          for (const tmpl of toRepair) {
            try {
              const existing2 = existingMap.get(tmpl.name);
              const design = defaultDesigns[tmpl.name];
              await this.update(userId, existing2.id, {
                designJson: design || null,
                htmlBody: this.wrapAgentEmailTemplate(tmpl.bodyContent),
                subject: tmpl.subject
              });
            } catch (err) {
              console.warn(`[Messaging] Failed to repair template "${tmpl.name}":`, err.message);
            }
          }
          console.log(`[Messaging] Template repair complete for user ${userId}`);
        }
      }
      substituteVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
          const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
          result = result.replace(regex, value || "");
        }
        return result;
      }
      async sendEmail(userId, templateId, recipientEmail, variables = {}, meta) {
        const template = await this.getById(userId, templateId);
        if (!template) {
          const error = `Email template not found: ${templateId}`;
          await messagingLogService.logMessage(userId, "email", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientEmail,
            templateName: templateId,
            status: "failed",
            errorMessage: error
          });
          return { success: false, error };
        }
        const subject = this.substituteVariables(template.subject, variables);
        const htmlBody = this.substituteVariables(template.htmlBody, variables);
        try {
          const result = await sendEmail(recipientEmail, subject, htmlBody);
          await messagingLogService.logMessage(userId, "email", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientEmail,
            templateName: template.name,
            status: result.success ? "sent" : "failed",
            responseData: result.success ? { messageId: result.messageId } : void 0,
            errorMessage: result.error
          });
          if (result.success) {
            console.log(`\u2705 [Messaging] Email "${template.name}" sent to ${recipientEmail}`);
          } else {
            console.log(`\u274C [Messaging] Email "${template.name}" failed to ${recipientEmail}: ${result.error}`);
          }
          return result;
        } catch (error) {
          const errorMsg = error.message || "Unknown email error";
          await messagingLogService.logMessage(userId, "email", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientEmail,
            templateName: template.name,
            status: "failed",
            errorMessage: errorMsg
          });
          console.log(`\u274C [Messaging] Email "${template.name}" error to ${recipientEmail}: ${errorMsg}`);
          return { success: false, error: errorMsg };
        }
      }
      async sendEmailByName(userId, templateName, recipientEmail, variables = {}, meta) {
        const template = await this.getByName(userId, templateName);
        if (!template) {
          const error = `Email template "${templateName}" not found`;
          await messagingLogService.logMessage(userId, "email", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientEmail,
            templateName,
            status: "failed",
            errorMessage: error
          });
          return { success: false, error };
        }
        return this.sendEmail(userId, template.id, recipientEmail, variables, meta);
      }
    };
    emailTemplateService = new EmailTemplateService();
  }
});

// plugins/messaging/services/whatsway.service.ts
var whatsway_service_exports = {};
__export(whatsway_service_exports, {
  WhatswayService: () => WhatswayService,
  whatswayService: () => whatswayService
});
import { sql as sql5 } from "drizzle-orm";
function snakeToCamel3(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow3(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel3(key)] = row[key];
  }
  return transformed;
}
var WhatswayService, whatswayService;
var init_whatsway_service = __esm({
  "plugins/messaging/services/whatsway.service.ts"() {
    "use strict";
    init_db();
    init_messaging_log_service();
    WhatswayService = class {
      async getSettings(userId) {
        const result = await db.execute(sql5`
      SELECT * FROM whatsway_settings WHERE user_id = ${userId} LIMIT 1
    `);
        const row = result.rows[0];
        return row ? transformRow3(row) : null;
      }
      async saveSettings(userId, data) {
        const baseUrl = data.baseUrl || "https://whatsway.diploy.in";
        const channelId = data.channelId || "";
        const result = await db.execute(sql5`
      INSERT INTO whatsway_settings (user_id, api_key, api_secret, base_url, channel_id)
      VALUES (${userId}, ${data.apiKey}, ${data.apiSecret}, ${baseUrl}, ${channelId})
      ON CONFLICT (user_id) DO UPDATE SET
        api_key = EXCLUDED.api_key,
        api_secret = EXCLUDED.api_secret,
        base_url = EXCLUDED.base_url,
        channel_id = EXCLUDED.channel_id,
        updated_at = NOW()
      RETURNING *
    `);
        return transformRow3(result.rows[0]);
      }
      async deactivate(userId) {
        await db.execute(sql5`
      UPDATE whatsway_settings SET is_active = false, updated_at = NOW() WHERE user_id = ${userId}
    `);
      }
      async deleteSettings(userId) {
        await db.execute(sql5`
      DELETE FROM whatsway_settings WHERE user_id = ${userId}
    `);
      }
      async getCredentials(userId, skipActiveCheck = false) {
        const settings = await this.getSettings(userId);
        if (!settings) {
          throw new Error("WhatsWay not configured. Please add your API credentials first.");
        }
        if (!skipActiveCheck && !settings.isActive) {
          throw new Error("WhatsWay integration is disabled.");
        }
        return {
          apiKey: settings.apiKey,
          apiSecret: settings.apiSecret,
          baseUrl: settings.baseUrl,
          channelId: settings.channelId || ""
        };
      }
      async makeRequest(userId, method, path2, body, skipActiveCheck = false) {
        const { apiKey, apiSecret, baseUrl, channelId } = await this.getCredentials(userId, skipActiveCheck);
        const url = `${baseUrl}${path2}`;
        const headers = {
          "X-API-Key": apiKey,
          "X-API-Secret": apiSecret,
          "Content-Type": "application/json"
        };
        if (channelId) {
          headers["X-Channel-Id"] = channelId;
        }
        const options = { method, headers };
        if (body) {
          options.body = JSON.stringify(body);
        }
        console.log(`[WhatsWay] ${method} ${url}`);
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          let errorMessage = `WhatsWay API error (${response.status})`;
          if (response.status === 401 || response.status === 403) {
            errorMessage = "Invalid WhatsWay API credentials";
          } else if (response.status === 429) {
            errorMessage = "WhatsWay rate limit exceeded. Please try again later.";
          } else {
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.error || errorMessage;
            } catch {
              errorMessage = `${errorMessage}: ${errorText}`;
            }
          }
          throw new Error(errorMessage);
        }
        return response.json();
      }
      async testConnection(userId, skipActiveCheck = false) {
        const response = await this.makeRequest(userId, "GET", "/api/v1/account", void 0, skipActiveCheck);
        if (!response.success) {
          throw new Error(response.error || "Failed to connect to WhatsWay");
        }
        return response.data;
      }
      async getTemplates(userId) {
        const response = await this.makeRequest(userId, "GET", "/api/v1/templates?status=APPROVED");
        if (!response.success) {
          throw new Error(response.error || "Failed to fetch templates");
        }
        return Array.isArray(response.data) ? response.data : [];
      }
      async sendTemplate(userId, to, templateName, language, components = [], meta) {
        try {
          const response = await this.makeRequest(userId, "POST", "/api/v1/messages/template", {
            to,
            templateName,
            language,
            components
          });
          if (!response.success) {
            throw new Error(response.error || "Failed to send WhatsApp template message");
          }
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName,
            status: "sent",
            responseData: response.data
          });
          console.log(`\u2705 [WhatsWay] Template "${templateName}" sent to ${to}`);
          return response.data;
        } catch (error) {
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName,
            status: "failed",
            errorMessage: error.message
          });
          console.log(`\u274C [WhatsWay] Failed to send template "${templateName}" to ${to}: ${error.message}`);
          throw error;
        }
      }
      async sendReply(userId, to, message, meta) {
        try {
          const response = await this.makeRequest(userId, "POST", "/api/v1/messages/reply", {
            to,
            message
          });
          if (!response.success) {
            throw new Error(response.error || "Failed to send WhatsApp reply");
          }
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName: "reply",
            status: "sent",
            responseData: response.data
          });
          console.log(`\u2705 [WhatsWay] Reply sent to ${to}`);
          return response.data;
        } catch (error) {
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName: "reply",
            status: "failed",
            errorMessage: error.message
          });
          throw error;
        }
      }
      async uploadMedia(userId, fileBuffer, mimeType, filename) {
        const { apiKey, apiSecret, baseUrl, channelId } = await this.getCredentials(userId);
        const url = `${baseUrl}/api/v1/media/upload`;
        const formData = new FormData();
        formData.append("file", new Blob([fileBuffer], { type: mimeType }), filename);
        formData.append("mimeType", mimeType);
        const headers = {
          "X-API-Key": apiKey,
          "X-API-Secret": apiSecret
        };
        if (channelId) headers["X-Channel-Id"] = channelId;
        console.log(`[WhatsWay] Uploading media: ${filename} (${mimeType}, ${fileBuffer.length} bytes)`);
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: formData
        });
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(`WhatsWay media upload failed (${response.status}): ${errorText}`);
        }
        const json = await response.json();
        const mediaId = json?.data?.mediaId || json?.data?.id || json?.data?.url || "";
        if (!mediaId) {
          throw new Error("WhatsWay media upload succeeded but no media ID returned");
        }
        console.log(`[WhatsWay] Media uploaded: ${mediaId}`);
        return mediaId;
      }
      async getMediaStream(userId, mediaId) {
        const { apiKey, apiSecret, baseUrl, channelId } = await this.getCredentials(userId);
        let downloadUrl;
        if (mediaId.startsWith("http://") || mediaId.startsWith("https://")) {
          const allowedHost = new URL(baseUrl).host;
          const mediaHost = new URL(mediaId).host;
          if (mediaHost !== allowedHost) {
            throw new Error("Media URL is not from a trusted WhatsWay host");
          }
          downloadUrl = mediaId;
        } else {
          downloadUrl = `${baseUrl}/api/v1/media/${encodeURIComponent(mediaId)}`;
        }
        const headers = {
          "X-API-Key": apiKey,
          "X-API-Secret": apiSecret
        };
        if (channelId) headers["X-Channel-Id"] = channelId;
        const mediaRes = await fetch(downloadUrl, { headers });
        if (!mediaRes.ok) {
          throw new Error(`WhatsWay media download failed (${mediaRes.status})`);
        }
        const contentType = mediaRes.headers.get("content-type") || "application/octet-stream";
        const contentLength = mediaRes.headers.get("content-length");
        return {
          stream: mediaRes.body,
          contentType,
          contentLength: contentLength ? parseInt(contentLength, 10) : void 0
        };
      }
      async sendMediaMessage(userId, to, mediaType, mediaId, options, meta) {
        try {
          const response = await this.makeRequest(userId, "POST", "/api/v1/messages/media", {
            to,
            type: mediaType,
            mediaId,
            caption: options?.caption,
            filename: options?.filename
          });
          if (!response.success) {
            throw new Error(response.error || "Failed to send WhatsApp media message");
          }
          const preview = options?.caption || options?.filename || `[${mediaType}]`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: `media:${mediaType}`,
            status: "sent",
            responseData: response.data,
            messageContent: preview.substring(0, 200),
            messageType: mediaType,
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          console.log(`\u2705 [WhatsWay] ${mediaType} sent to ${to}`);
          return response.data;
        } catch (error) {
          const preview = options?.caption || options?.filename || `[${mediaType}]`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: `media:${mediaType}`,
            status: "failed",
            errorMessage: error.message,
            messageContent: preview.substring(0, 200),
            messageType: mediaType,
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          throw error;
        }
      }
      async sendLocationMessage(userId, to, latitude, longitude, name, address, meta) {
        try {
          const response = await this.makeRequest(userId, "POST", "/api/v1/messages/location", {
            to,
            latitude,
            longitude,
            name,
            address
          });
          if (!response.success) {
            throw new Error(response.error || "Failed to send WhatsApp location message");
          }
          const preview = name || `${latitude}, ${longitude}`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: "location",
            status: "sent",
            responseData: response.data,
            messageContent: preview.substring(0, 200),
            messageType: "location",
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          console.log(`\u2705 [WhatsWay] Location sent to ${to}`);
          return response.data;
        } catch (error) {
          const preview = name || `${latitude}, ${longitude}`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: "location",
            status: "failed",
            errorMessage: error.message,
            messageContent: preview.substring(0, 200),
            messageType: "location",
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          throw error;
        }
      }
    };
    whatswayService = new WhatswayService();
  }
});

// plugins/messaging/services/meta-whatsapp.service.ts
var meta_whatsapp_service_exports = {};
__export(meta_whatsapp_service_exports, {
  MetaWhatsAppService: () => MetaWhatsAppService,
  metaWhatsAppService: () => metaWhatsAppService
});
import { sql as sql6 } from "drizzle-orm";
function snakeToCamel4(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow4(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel4(key)] = row[key];
  }
  return transformed;
}
function validatePhoneNumber(phone) {
  if (!/^[+\d]/.test(phone)) {
    throw new Error("Invalid phone number format. Use international format (e.g., +1234567890).");
  }
  const stripped = phone.replace(/[^0-9+]/g, "");
  const digits = stripped.replace(/\+/g, "");
  if (digits.length < 7) {
    throw new Error("Invalid phone number format. Use international format (e.g., +1234567890).");
  }
}
var META_GRAPH_API_BASE, META_API_VERSION, MetaWhatsAppService, metaWhatsAppService;
var init_meta_whatsapp_service = __esm({
  "plugins/messaging/services/meta-whatsapp.service.ts"() {
    "use strict";
    init_db();
    init_messaging_log_service();
    META_GRAPH_API_BASE = "https://graph.facebook.com";
    META_API_VERSION = process.env.META_WHATSAPP_API_VERSION || "v21.0";
    MetaWhatsAppService = class {
      async getSettings(userId) {
        const result = await db.execute(sql6`
      SELECT * FROM meta_whatsapp_settings WHERE user_id = ${userId} LIMIT 1
    `);
        const row = result.rows[0];
        return row ? transformRow4(row) : null;
      }
      async saveSettings(userId, data) {
        const result = await db.execute(sql6`
      INSERT INTO meta_whatsapp_settings (user_id, phone_number_id, waba_id, access_token)
      VALUES (${userId}, ${data.phoneNumberId}, ${data.wabaId}, ${data.accessToken})
      ON CONFLICT (user_id) DO UPDATE SET
        phone_number_id = EXCLUDED.phone_number_id,
        waba_id = EXCLUDED.waba_id,
        access_token = EXCLUDED.access_token,
        updated_at = NOW()
      RETURNING *
    `);
        return transformRow4(result.rows[0]);
      }
      async _attemptRegister(phoneNumberId, accessToken, includePin) {
        const url = `${META_GRAPH_API_BASE}/${META_API_VERSION}/${phoneNumberId}/register`;
        const body = { messaging_product: "whatsapp" };
        if (includePin) body.pin = "123456";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(`[Meta WhatsApp] Register response (${response.status}):`, JSON.stringify(data));
        return { ok: response.ok, data, status: response.status };
      }
      async registerPhoneNumber(phoneNumberId, accessToken) {
        try {
          console.log(`[Meta WhatsApp] Registering phone number with Cloud API...`);
          let result = await this._attemptRegister(phoneNumberId, accessToken, false);
          if (!result.ok) {
            console.log(`[Meta WhatsApp] Register without pin failed (${result.data?.error?.code}), retrying with pin...`);
            result = await this._attemptRegister(phoneNumberId, accessToken, true);
          }
          if (!result.ok) {
            console.log(`[Meta WhatsApp] Both attempts failed, waiting 3s before final retry...`);
            await new Promise((resolve) => setTimeout(resolve, 3e3));
            result = await this._attemptRegister(phoneNumberId, accessToken, true);
          }
          if (!result.ok) {
            const errMsg = result.data?.error?.message || JSON.stringify(result.data);
            console.error(`[Meta WhatsApp] Phone registration failed after all attempts:`, {
              code: result.data?.error?.code,
              subcode: result.data?.error?.error_subcode,
              type: result.data?.error?.type,
              message: result.data?.error?.message,
              fbtrace_id: result.data?.error?.fbtrace_id
            });
            return { success: false, error: errMsg };
          }
          console.log(`[Meta WhatsApp] Phone number registered successfully`);
          return { success: true };
        } catch (error) {
          console.error(`[Meta WhatsApp] Phone registration error:`, error.message);
          return { success: false, error: error.message };
        }
      }
      async overrideCallbackUrl(phoneNumberId, accessToken, callbackUrl, verifyToken) {
        try {
          const url = `${META_GRAPH_API_BASE}/${META_API_VERSION}/${phoneNumberId}/override_callback_url`;
          console.log(`[Meta WhatsApp] Setting override callback URL for phone...`);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              callback_url: callbackUrl,
              verify_token: verifyToken
            })
          });
          const data = await response.json();
          if (!response.ok) {
            console.error(`[Meta WhatsApp] Override callback URL failed:`, data?.error?.message || JSON.stringify(data));
            return false;
          }
          console.log(`[Meta WhatsApp] Override callback URL set successfully`);
          return true;
        } catch (error) {
          console.error(`[Meta WhatsApp] Override callback URL error:`, error.message);
          return false;
        }
      }
      async subscribeWabaToWebhooks(wabaId, accessToken) {
        try {
          const url = `${META_GRAPH_API_BASE}/${META_API_VERSION}/${wabaId}/subscribed_apps`;
          console.log(`[Meta WhatsApp] Subscribing WABA ${wabaId} to webhook events`);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          const data = await response.json();
          if (!response.ok) {
            console.error(`[Meta WhatsApp] WABA subscription failed:`, data?.error?.message || JSON.stringify(data));
            return false;
          }
          console.log(`[Meta WhatsApp] WABA ${wabaId} subscribed to webhooks successfully`);
          return true;
        } catch (error) {
          console.error(`[Meta WhatsApp] WABA subscription error:`, error.message);
          return false;
        }
      }
      async deactivate(userId) {
        await db.execute(sql6`
      UPDATE meta_whatsapp_settings SET is_active = false, updated_at = NOW() WHERE user_id = ${userId}
    `);
      }
      async deleteSettings(userId) {
        await db.execute(sql6`
      DELETE FROM meta_whatsapp_settings WHERE user_id = ${userId}
    `);
      }
      async getCredentials(userId, skipActiveCheck = false) {
        const settings = await this.getSettings(userId);
        if (!settings) {
          throw new Error("Meta WhatsApp not configured. Please add your WABA credentials first.");
        }
        if (!skipActiveCheck && !settings.isActive) {
          throw new Error("Meta WhatsApp integration is disabled.");
        }
        return {
          phoneNumberId: settings.phoneNumberId,
          wabaId: settings.wabaId,
          accessToken: settings.accessToken
        };
      }
      async makeRequest(userId, method, path2, body, skipActiveCheck = false) {
        const { accessToken } = await this.getCredentials(userId, skipActiveCheck);
        const url = `${META_GRAPH_API_BASE}/${META_API_VERSION}${path2}`;
        const headers = {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        };
        const options = { method, headers };
        if (body) {
          options.body = JSON.stringify(body);
        }
        console.log(`[Meta WhatsApp] ${method} ${url}`);
        if (body) {
          console.log(`[Meta WhatsApp] Request Payload: ${JSON.stringify(body, null, 2)}`);
        }
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          let errorMessage = `Meta WhatsApp API error (${response.status})`;
          try {
            const errorJson = JSON.parse(errorText);
            const metaError = errorJson?.error;
            if (metaError) {
              console.error(`[Meta WhatsApp] API Error Details:`, JSON.stringify({
                code: metaError.code,
                subcode: metaError.error_subcode,
                type: metaError.type,
                message: metaError.message,
                fbtrace_id: metaError.fbtrace_id,
                error_data: metaError.error_data,
                httpStatus: response.status
              }));
            }
          } catch {
          }
          if (response.status === 401 || response.status === 190) {
            errorMessage = "Invalid or expired Meta access token";
          } else if (response.status === 403) {
            errorMessage = "Insufficient permissions. Ensure your token has whatsapp_business_management and whatsapp_business_messaging permissions.";
          } else if (response.status === 429) {
            errorMessage = "Meta API rate limit exceeded. Please try again later.";
          } else {
            try {
              const errorJson = JSON.parse(errorText);
              const metaError = errorJson?.error;
              if (metaError?.code === 131047) {
                errorMessage = "Cannot send text message: the 24-hour customer service window has closed. Use a template message instead.";
              } else if (metaError?.code === 131026) {
                errorMessage = "Message could not be delivered. The recipient may have blocked messages or the number is invalid.";
              } else if (metaError?.message) {
                errorMessage = metaError.message;
              }
            } catch {
              errorMessage = `${errorMessage}: ${errorText}`;
            }
          }
          throw new Error(errorMessage);
        }
        return response.json();
      }
      async testConnection(userId, skipActiveCheck = false) {
        const { phoneNumberId } = await this.getCredentials(userId, skipActiveCheck);
        const response = await this.makeRequest(
          userId,
          "GET",
          `/${phoneNumberId}?fields=display_phone_number,verified_name,quality_rating`,
          void 0,
          skipActiveCheck
        );
        return {
          businessName: response.verified_name || response.display_phone_number || "Meta WhatsApp",
          phoneNumber: response.display_phone_number || ""
        };
      }
      async getChannelHealth(userId) {
        const { phoneNumberId } = await this.getCredentials(userId);
        const fields = "display_phone_number,verified_name,quality_rating,account_mode,code_verification_status,name_status,messaging_limit_tier,throughput";
        const response = await this.makeRequest(
          userId,
          "GET",
          `/${phoneNumberId}?fields=${fields}`
        );
        return {
          accountMode: response.account_mode || "UNKNOWN",
          qualityRating: response.quality_rating || "UNKNOWN",
          messagingLimit: response.messaging_limit_tier || "UNKNOWN",
          throughput: response.throughput?.level || "STANDARD",
          verification: response.code_verification_status || "UNKNOWN",
          nameStatus: response.name_status || "UNKNOWN",
          phoneNumber: response.display_phone_number || "",
          businessName: response.verified_name || "",
          lastChecked: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      async getTemplates(userId) {
        const { wabaId, accessToken } = await this.getCredentials(userId);
        const MAX_PAGES = 10;
        const templates = [];
        const firstResponse = await this.makeRequest(
          userId,
          "GET",
          `/${wabaId}/message_templates?fields=name,status,category,language,components&limit=100`
        );
        const appendApproved = (data) => {
          for (const tmpl of data) {
            if (tmpl.status === "APPROVED") {
              templates.push({
                name: tmpl.name,
                status: tmpl.status,
                language: tmpl.language,
                category: tmpl.category || "",
                components: tmpl.components || []
              });
            }
          }
        };
        appendApproved(firstResponse?.data || []);
        let nextUrl = firstResponse?.paging?.next;
        let pageCount = 1;
        while (nextUrl && pageCount < MAX_PAGES) {
          pageCount++;
          console.log(`[Meta WhatsApp] Fetching templates page ${pageCount}: ${nextUrl}`);
          const response = await fetch(nextUrl, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          });
          if (!response.ok) {
            console.log(`[Meta WhatsApp] Failed to fetch templates page ${pageCount}: ${response.status}`);
            break;
          }
          const json = await response.json();
          appendApproved(json?.data || []);
          nextUrl = json?.paging?.next;
        }
        console.log(`[Meta WhatsApp] Fetched ${templates.length} approved templates across ${pageCount} page(s)`);
        return templates;
      }
      async getTemplateByName(userId, templateName) {
        try {
          const templates = await this.getTemplates(userId);
          return templates.find((t) => t.name === templateName) || null;
        } catch (error) {
          console.warn(`[Meta WhatsApp] Failed to fetch template "${templateName}": ${error.message}`);
          return null;
        }
      }
      static buildButtonComponents(templateComponents, buttonOverrides) {
        const buttonComponents = [];
        const buttonsComponent = templateComponents.find(
          (c) => c.type === "BUTTONS" || c.type === "buttons"
        );
        if (!buttonsComponent || !Array.isArray(buttonsComponent.buttons)) return buttonComponents;
        buttonsComponent.buttons.forEach((btn, index2) => {
          if (btn.type === "URL" && btn.url && btn.url.includes("{{")) {
            const overrideValue = buttonOverrides?.[index2];
            buttonComponents.push({
              type: "button",
              sub_type: "url",
              index: String(index2),
              parameters: [{
                type: "text",
                text: overrideValue || (Array.isArray(btn.example) ? btn.example[0] : null) || "details"
              }]
            });
          }
        });
        return buttonComponents;
      }
      async sendTemplate(userId, to, templateName, language, components = [], meta) {
        validatePhoneNumber(to);
        const { phoneNumberId } = await this.getCredentials(userId);
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/[^0-9]/g, ""),
          type: "template",
          template: {
            name: templateName,
            language: {
              code: language || "en_US"
            }
          }
        };
        if (components && components.length > 0) {
          payload.template.components = components;
        }
        try {
          const response = await this.makeRequest(userId, "POST", `/${phoneNumberId}/messages`, payload);
          const messageId = response?.messages?.[0]?.id || "";
          const messageStatus = response?.messages?.[0]?.message_status || "accepted";
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName,
            status: "sent",
            responseData: response,
            messageContent: `Template: ${templateName}`,
            messageType: "template"
          });
          console.log(`[Meta WhatsApp] Template "${templateName}" sent to ${to} (${messageId})`);
          return { messageId, status: messageStatus };
        } catch (error) {
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName,
            status: "failed",
            errorMessage: error.message,
            messageContent: `Template: ${templateName}`,
            messageType: "template"
          });
          console.log(`[Meta WhatsApp] Failed to send template "${templateName}" to ${to}: ${error.message}`);
          throw error;
        }
      }
      async markMessageRead(userId, metaMessageId) {
        try {
          const { phoneNumberId } = await this.getCredentials(userId);
          await this.makeRequest(userId, "POST", `/${phoneNumberId}/messages`, {
            messaging_product: "whatsapp",
            status: "read",
            message_id: metaMessageId
          });
        } catch (error) {
          console.log(`[Meta WhatsApp] Failed to send read receipt for ${metaMessageId}: ${error.message}`);
        }
      }
      async sendReply(userId, to, message, meta) {
        validatePhoneNumber(to);
        const { phoneNumberId } = await this.getCredentials(userId);
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/[^0-9]/g, ""),
          type: "text",
          text: {
            preview_url: false,
            body: message
          }
        };
        try {
          const response = await this.makeRequest(userId, "POST", `/${phoneNumberId}/messages`, payload);
          const messageId = response?.messages?.[0]?.id || "";
          const messageStatus = response?.messages?.[0]?.message_status || "accepted";
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName: "reply",
            status: "sent",
            responseData: response,
            messageContent: message.substring(0, 200),
            messageType: "text"
          });
          console.log(`[Meta WhatsApp] Reply sent to ${to} (${messageId})`);
          return { messageId, status: messageStatus };
        } catch (error) {
          await messagingLogService.logMessage(userId, "whatsapp", {
            callId: meta?.callId,
            agentId: meta?.agentId,
            recipientPhone: to,
            templateName: "reply",
            status: "failed",
            errorMessage: error.message,
            messageContent: message.substring(0, 200),
            messageType: "text"
          });
          throw error;
        }
      }
      async uploadMedia(userId, fileBuffer, mimeType, filename) {
        const { phoneNumberId, accessToken } = await this.getCredentials(userId);
        const url = `${META_GRAPH_API_BASE}/${META_API_VERSION}/${phoneNumberId}/media`;
        const formData = new FormData();
        formData.append("messaging_product", "whatsapp");
        formData.append("type", mimeType);
        formData.append("file", new Blob([fileBuffer], { type: mimeType }), filename);
        console.log(`[Meta WhatsApp] Uploading media: ${filename} (${mimeType}, ${fileBuffer.length} bytes)`);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Authorization": `Bearer ${accessToken}` },
          body: formData
        });
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(`Media upload failed (${response.status}): ${errorText}`);
        }
        const json = await response.json();
        const mediaId = json?.id;
        if (!mediaId) {
          throw new Error("Media upload succeeded but no media ID returned");
        }
        console.log(`[Meta WhatsApp] Media uploaded: ${mediaId}`);
        return mediaId;
      }
      async getMediaStream(userId, mediaId) {
        const { accessToken } = await this.getCredentials(userId);
        const metaRes = await fetch(`${META_GRAPH_API_BASE}/${META_API_VERSION}/${mediaId}`, {
          headers: { "Authorization": `Bearer ${accessToken}` }
        });
        if (!metaRes.ok) {
          throw new Error(`Failed to get media URL (${metaRes.status})`);
        }
        const metaJson = await metaRes.json();
        const downloadUrl = metaJson.url;
        if (!downloadUrl) throw new Error("No download URL returned for media");
        const mediaRes = await fetch(downloadUrl, {
          headers: { "Authorization": `Bearer ${accessToken}` }
        });
        if (!mediaRes.ok) {
          throw new Error(`Failed to download media (${mediaRes.status})`);
        }
        const contentType = mediaRes.headers.get("content-type") || "application/octet-stream";
        const contentLength = mediaRes.headers.get("content-length");
        return {
          stream: mediaRes.body,
          contentType,
          contentLength: contentLength ? parseInt(contentLength, 10) : void 0
        };
      }
      async sendMediaMessage(userId, to, mediaType, mediaId, options, meta) {
        validatePhoneNumber(to);
        const { phoneNumberId } = await this.getCredentials(userId);
        const mediaPayload = { id: mediaId };
        if (options?.caption && ["image", "video", "document"].includes(mediaType)) {
          mediaPayload.caption = options.caption;
        }
        if (options?.filename && mediaType === "document") {
          mediaPayload.filename = options.filename;
        }
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/[^0-9]/g, ""),
          type: mediaType,
          [mediaType]: mediaPayload
        };
        try {
          const response = await this.makeRequest(userId, "POST", `/${phoneNumberId}/messages`, payload);
          const messageId = response?.messages?.[0]?.id || "";
          const messageStatus = response?.messages?.[0]?.message_status || "accepted";
          const preview = options?.caption || options?.filename || `[${mediaType}]`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: `media:${mediaType}`,
            status: "sent",
            responseData: response,
            messageContent: preview.substring(0, 200),
            messageType: mediaType,
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          console.log(`[Meta WhatsApp] ${mediaType} sent to ${to} (${messageId})`);
          return { messageId, status: messageStatus };
        } catch (error) {
          const preview = options?.caption || options?.filename || `[${mediaType}]`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: `media:${mediaType}`,
            status: "failed",
            errorMessage: error.message,
            messageContent: preview.substring(0, 200),
            messageType: mediaType,
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          throw error;
        }
      }
      async sendLocationMessage(userId, to, latitude, longitude, name, address, meta) {
        validatePhoneNumber(to);
        const { phoneNumberId } = await this.getCredentials(userId);
        const locationPayload = { latitude, longitude };
        if (name) locationPayload.name = name;
        if (address) locationPayload.address = address;
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/[^0-9]/g, ""),
          type: "location",
          location: locationPayload
        };
        try {
          const response = await this.makeRequest(userId, "POST", `/${phoneNumberId}/messages`, payload);
          const messageId = response?.messages?.[0]?.id || "";
          const messageStatus = response?.messages?.[0]?.message_status || "accepted";
          const preview = name || `${latitude}, ${longitude}`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: "location",
            status: "sent",
            responseData: response,
            messageContent: preview.substring(0, 200),
            messageType: "location",
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          console.log(`[Meta WhatsApp] Location sent to ${to} (${messageId})`);
          return { messageId, status: messageStatus };
        } catch (error) {
          const preview = name || `${latitude}, ${longitude}`;
          await messagingLogService.logMessage(userId, "whatsapp", {
            recipientPhone: to,
            templateName: "location",
            status: "failed",
            errorMessage: error.message,
            messageContent: preview.substring(0, 200),
            messageType: "location",
            callId: meta?.callId,
            agentId: meta?.agentId
          });
          throw error;
        }
      }
    };
    metaWhatsAppService = new MetaWhatsAppService();
  }
});

// server/services/post-call-messaging.ts
var post_call_messaging_exports = {};
__export(post_call_messaging_exports, {
  triggerPostCallMessaging: () => triggerPostCallMessaging
});
import { sql as sql9, eq as eq2, and, desc } from "drizzle-orm";
function extractRows(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}
function stripUnresolvedVar(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^\{\{\s*\w+\s*\}\}$/.test(trimmed)) return "";
  return trimmed;
}
async function readCallerEmailFromMetadata(callId) {
  if (!callId) return "";
  try {
    for (const table of CALL_TABLES) {
      try {
        const result = await db.execute(
          sql9`SELECT metadata->>'callerEmail' as caller_email FROM ${sql9.identifier(table)} WHERE id = ${callId} LIMIT 1`
        );
        const rows = extractRows(result);
        if (rows.length > 0 && rows[0].caller_email) {
          return rows[0].caller_email;
        }
      } catch (_) {
      }
    }
  } catch (err) {
    console.warn(`[Post-Call Messaging] Could not read callerEmail from metadata: ${err.message}`);
  }
  return "";
}
async function lookupContactByPhone(phone, userId) {
  if (!phone || !userId) return {};
  try {
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits.length < 6) return {};
    const results = await db.select({
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      email: contacts.email,
      phone: contacts.phone
    }).from(contacts).innerJoin(campaigns, eq2(contacts.campaignId, campaigns.id)).where(and(
      eq2(campaigns.userId, userId),
      sql9`${contacts.phone} LIKE ${"%" + digits.slice(-10)}`
    )).orderBy(desc(contacts.createdAt)).limit(1);
    if (results.length > 0) {
      const c = results[0];
      const name = c.lastName ? `${c.firstName || ""} ${c.lastName}`.trim() : c.firstName || "";
      return {
        ...name ? { contact_name: name } : {},
        ...c.phone ? { contact_phone: c.phone } : {},
        ...c.email ? { contact_email: c.email } : {}
      };
    }
  } catch (err) {
    console.warn(`[Post-Call Messaging] Contact lookup error: ${err.message}`);
  }
  return {};
}
async function lookupSipCallData(callId, userId) {
  if (!callId || !userId) return { conversationId: "", contactData: {} };
  try {
    const result = await db.execute(sql9`
      SELECT sc.elevenlabs_conversation_id, sc.from_number, sc.to_number, sc.direction,
             a.name as agent_name,
             COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name,
             ct.email as contact_email
      FROM sip_calls sc
      LEFT JOIN agents a ON sc.agent_id = a.id
      LEFT JOIN contacts ct ON sc.contact_id = ct.id
      WHERE sc.id = ${callId} AND sc.user_id = ${userId}
      LIMIT 1
    `);
    const rows = extractRows(result);
    if (rows.length > 0) {
      const row = rows[0];
      const phone = row.direction === "inbound" ? row.from_number || row.to_number || "" : row.to_number || row.from_number || "";
      return {
        conversationId: row.elevenlabs_conversation_id || "",
        contactData: {
          ...row.contact_name ? { contact_name: row.contact_name } : {},
          ...phone ? { contact_phone: phone } : {},
          ...row.contact_email ? { contact_email: row.contact_email } : {},
          ...row.agent_name ? { agent_name: row.agent_name } : {}
        }
      };
    }
  } catch (err) {
    console.warn(`[Post-Call Messaging] SIP call lookup error: ${err.message}`);
  }
  return { conversationId: "", contactData: {} };
}
async function lookupRegularCallData(callId, userId) {
  if (!callId || !userId) return {};
  try {
    const result = await db.execute(sql9`
      SELECT c.phone_number, c.from_number, c.to_number, c.call_direction,
             a.name as agent_name,
             COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name,
             ct.email as contact_email
      FROM calls c
      LEFT JOIN agents a ON c.agent_id = a.id
      LEFT JOIN contacts ct ON c.contact_id = ct.id
      WHERE c.id = ${callId} AND c.user_id = ${userId}
      LIMIT 1
    `);
    const rows = extractRows(result);
    if (rows.length > 0) {
      const row = rows[0];
      const isOutbound = (row.call_direction || "").includes("out");
      const customerPhone = isOutbound ? row.to_number || row.phone_number || "" : row.phone_number || row.from_number || "";
      return {
        ...row.contact_name ? { contact_name: row.contact_name } : {},
        ...customerPhone ? { contact_phone: customerPhone } : {},
        ...row.contact_email ? { contact_email: row.contact_email } : {},
        ...row.agent_name ? { agent_name: row.agent_name } : {}
      };
    }
  } catch (err) {
    console.warn(`[Post-Call Messaging] Regular call lookup error: ${err.message}`);
  }
  return {};
}
async function lookupAppointmentData(callId, conversationId, userId) {
  try {
    const ids = [callId, conversationId].filter(Boolean);
    if (ids.length === 0 || !userId) return {};
    const conditions = ids.map((id) => sql9`call_id = ${id}`);
    const orClause = conditions.length === 1 ? conditions[0] : sql9`(${sql9.join(conditions, sql9` OR `)})`;
    const result = await db.execute(sql9`
      SELECT contact_name, contact_phone, contact_email, appointment_date, appointment_time,
             duration, service_name, notes, status
      FROM appointments
      WHERE user_id = ${userId} AND ${orClause}
      ORDER BY created_at DESC LIMIT 1
    `);
    const rows = extractRows(result);
    if (rows.length > 0) {
      const a = rows[0];
      console.log(`[Post-Call Messaging] Found appointment data: date=${a.appointment_date}, time=${a.appointment_time}, service=${a.service_name || "N/A"}`);
      return {
        ...a.contact_name ? { contact_name: a.contact_name } : {},
        ...a.contact_phone ? { contact_phone: a.contact_phone } : {},
        ...a.contact_email ? { contact_email: a.contact_email } : {},
        ...a.appointment_date ? { appointment_date: a.appointment_date } : {},
        ...a.appointment_time ? { appointment_time: a.appointment_time } : {},
        ...a.duration ? { duration: String(a.duration) } : {},
        ...a.service_name ? { service_name: a.service_name } : {},
        ...a.notes ? { notes: a.notes } : {},
        ...a.status ? { appointment_status: a.status } : {}
      };
    }
  } catch (err) {
    console.warn(`[Post-Call Messaging] Appointment lookup error: ${err.message}`);
  }
  return {};
}
function resolveVarValue(value, contactData) {
  if (!value) return "";
  const trimmed = value.trim();
  if (contactData[trimmed] !== void 0 && contactData[trimmed] !== "") {
    return contactData[trimmed];
  }
  const varMatch = trimmed.match(/^\{\{\s*(\w+)\s*\}\}$/);
  if (varMatch) {
    if (contactData[varMatch[1]] !== void 0 && contactData[varMatch[1]] !== "") {
      return contactData[varMatch[1]];
    }
    return "";
  }
  let resolved = trimmed.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    if (contactData[key] !== void 0 && contactData[key] !== "") {
      return contactData[key];
    }
    return "";
  });
  return resolved;
}
async function triggerPostCallMessaging(params) {
  const { elevenLabsAgentId, userId, callerPhone, callId } = params;
  const dedupeKey = callId || `${elevenLabsAgentId}:${userId}:${callerPhone}`;
  if (_triggeredCallIds.has(dedupeKey)) {
    console.log(`[Post-Call Messaging] Skipping duplicate trigger for ${dedupeKey}`);
    return;
  }
  _triggeredCallIds.add(dedupeKey);
  setTimeout(() => _triggeredCallIds.delete(dedupeKey), 10 * 60 * 1e3);
  try {
    const agentRows = await db.select().from(agents).where(sql9`eleven_labs_agent_id = ${elevenLabsAgentId} OR id = ${elevenLabsAgentId}`).limit(1);
    if (agentRows.length === 0) {
      console.log(`[Post-Call Messaging] Agent not found: ${elevenLabsAgentId}`);
      return;
    }
    const agent = agentRows[0];
    const emailEnabled = !!agent.messagingEmailEnabled;
    const whatsappEnabled = !!agent.messagingWhatsappEnabled;
    const emailTemplate = agent.messagingEmailTemplate || null;
    const whatsappTemplate = agent.messagingWhatsappTemplate || null;
    const whatsappVariables = agent.messagingWhatsappVariables || null;
    const dbAgentId = agent.id;
    const agentName = agent.name || "";
    const userId2 = agent.userId;
    console.log(`\u{1F4E8} [Post-Call Messaging] Agent ${dbAgentId}: emailEnabled=${emailEnabled}, whatsappEnabled=${whatsappEnabled}, caller=${callerPhone}, userId=${userId2}`);
    if (!emailEnabled && !whatsappEnabled) {
      return;
    }
    let callerEmail = params.callerEmail || "";
    if (!callerEmail && callId) {
      callerEmail = await readCallerEmailFromMetadata(callId);
      if (callerEmail) {
        console.log(`[Post-Call Messaging] Resolved callerEmail from call metadata: ${callerEmail}`);
      }
    }
    let contactData = {
      contact_phone: callerPhone,
      contact_email: callerEmail,
      agent_name: agentName,
      system__caller_id: callerPhone
    };
    const contactInfo = await lookupContactByPhone(callerPhone, userId2);
    if (Object.keys(contactInfo).length > 0) {
      contactData = { ...contactData, ...contactInfo };
      console.log(`[Post-Call Messaging] Enriched with contact data: ${Object.keys(contactInfo).join(", ")}`);
    }
    let conversationId = "";
    if (callId) {
      const sipData = await lookupSipCallData(callId, userId2);
      if (sipData.conversationId) {
        conversationId = sipData.conversationId;
      }
      if (Object.keys(sipData.contactData).length > 0) {
        contactData = { ...contactData, ...sipData.contactData };
      }
      const regularCallData = await lookupRegularCallData(callId, userId2);
      if (Object.keys(regularCallData).length > 0) {
        contactData = { ...contactData, ...regularCallData };
      }
    }
    if (callId || conversationId) {
      const apptData = await lookupAppointmentData(callId || "", conversationId, userId2);
      if (Object.keys(apptData).length > 0) {
        contactData = { ...contactData, ...apptData };
        console.log(`[Post-Call Messaging] Enriched with appointment fields: ${Object.keys(apptData).join(", ")}`);
      }
    }
    console.log(`[Post-Call Messaging] Final Resolved Contact Data for variable resolution: ${JSON.stringify(contactData)}`);
    if (!callerEmail && contactData.contact_email) {
      callerEmail = contactData.contact_email;
      console.log(`[Post-Call Messaging] Resolved callerEmail from contact data: ${callerEmail}`);
    }
    if (whatsappEnabled && whatsappTemplate) {
      try {
        const phoneDigits = callerPhone.replace(/[^0-9]/g, "");
        if (phoneDigits.length < 6) {
          console.warn(`[Post-Call Messaging] Cannot send WhatsApp: invalid caller phone "${callerPhone}"`);
        } else {
          console.log(`[Post-Call Messaging] Initializing WhatsApp services for user ${userId2}...`);
          const { metaWhatsAppService: metaWhatsAppService2, MetaWhatsAppService: MetaWhatsAppService2 } = await Promise.resolve().then(() => (init_meta_whatsapp_service(), meta_whatsapp_service_exports));
          const { whatswayService: whatswayService2 } = await Promise.resolve().then(() => (init_whatsway_service(), whatsway_service_exports));
          console.log(`[Post-Call Messaging] Services imported successfully.`);
          const metaSettings = await metaWhatsAppService2.getSettings(userId2);
          const whatswaySettings = await whatswayService2.getSettings(userId2);
          console.log(`[Post-Call Messaging] Settings fetched. Meta Active: ${!!metaSettings?.isActive}, WhatsWay Active: ${!!whatswaySettings?.isActive}`);
          let components = [];
          const buttonOverrides = {};
          if (whatsappVariables) {
            try {
              const parsedVars = JSON.parse(whatsappVariables);
              const bodyVarEntries = [];
              for (const [key, val] of Object.entries(parsedVars)) {
                if (!val || typeof val !== "object") continue;
                const entry = val;
                if (entry.componentType === "button") {
                  const btnIdx = key.startsWith("btn_") ? parseInt(key.replace("btn_", "")) : parseInt(key);
                  if (!isNaN(btnIdx) && entry.value) {
                    const resolved = stripUnresolvedVar(resolveVarValue(entry.value, contactData));
                    if (resolved) buttonOverrides[btnIdx] = resolved;
                  }
                } else if (entry.componentType === "header") {
                } else if (!entry.componentType && (entry.mode === "fixed" || entry.mode === "collect") && entry.value) {
                  const idx = parseInt(key);
                  if (!isNaN(idx)) {
                    bodyVarEntries.push([idx, stripUnresolvedVar(resolveVarValue(entry.value, contactData))]);
                  }
                }
              }
              if (bodyVarEntries.length > 0) {
                bodyVarEntries.sort((a, b) => a[0] - b[0]);
                components = [{ type: "body", parameters: bodyVarEntries.map(([, v]) => ({ type: "text", text: v || " " })) }];
                console.log(`[Post-Call Messaging] Built ${bodyVarEntries.length} body variable(s) from agent config`);
              }
              if (Object.keys(buttonOverrides).length > 0) {
                console.log(`[Post-Call Messaging] Found ${Object.keys(buttonOverrides).length} button override(s) from agent config`);
              }
            } catch (parseErr) {
              console.warn(`[Post-Call Messaging] Failed to parse whatsapp variables: ${parseErr.message}`);
            }
          }
          let templateLanguage = "en_US";
          if (metaSettings?.isActive) {
            try {
              const templateDef = await metaWhatsAppService2.getTemplateByName(userId2, whatsappTemplate);
              templateLanguage = templateDef?.language || "en_US";
              if (templateDef?.components) {
                const bodyComp = templateDef.components.find((c) => c.type === "BODY");
                if (bodyComp && bodyComp.text) {
                  const bodyVarMatches = bodyComp.text.match(/\{\{\d+\}\}/g) || [];
                  const requiredCount = [...new Set(bodyVarMatches)].length;
                  if (requiredCount > 0) {
                    const existingBody = components.find((c) => c.type === "body");
                    const existingParams = existingBody?.parameters || [];
                    if (existingParams.length < requiredCount) {
                      const fallbackOrder = ["contact_name", "contact_phone", "contact_email", "agent_name", "appointment_date", "appointment_time", "service_name", "duration", "notes", "appointment_status"];
                      const availableValues = fallbackOrder.filter((k) => contactData[k] && contactData[k].trim() !== "").map((k) => contactData[k]);
                      const parameters = [];
                      for (let i = 0; i < requiredCount; i++) {
                        if (i < existingParams.length && existingParams[i]?.text && existingParams[i].text.trim() !== "") {
                          parameters.push(existingParams[i]);
                        } else {
                          const fallbackIdx = i - existingParams.length;
                          parameters.push({ type: "text", text: availableValues[fallbackIdx >= 0 ? fallbackIdx : i] || " " });
                        }
                      }
                      components = components.filter((c) => c.type !== "body");
                      components.push({ type: "body", parameters });
                      console.log(`[Post-Call Messaging] Padded body variables: ${existingParams.length} saved + ${requiredCount - existingParams.length} auto-populated = ${requiredCount} total`);
                    }
                  }
                }
                const headerComp = templateDef.components.find((c) => c.type === "HEADER");
                if (headerComp) {
                  const headerFormat = (headerComp.format || "").toUpperCase();
                  if (["IMAGE", "VIDEO", "DOCUMENT"].includes(headerFormat)) {
                    let headerUrl = "";
                    if (whatsappVariables) {
                      try {
                        const parsedVars = JSON.parse(whatsappVariables);
                        for (const [, val] of Object.entries(parsedVars)) {
                          if (val && typeof val === "object" && val.componentType === "header" && val.value) {
                            headerUrl = stripUnresolvedVar(resolveVarValue(val.value, contactData));
                            break;
                          }
                        }
                      } catch (_) {
                      }
                    }
                    if (headerUrl) {
                      const mediaTypeLowercase = headerFormat.toLowerCase();
                      const headerParam = {
                        type: mediaTypeLowercase
                      };
                      headerParam[mediaTypeLowercase] = {
                        link: headerUrl.trim()
                      };
                      const headerComponent = {
                        type: "header",
                        parameters: [headerParam]
                      };
                      components = [headerComponent, ...components];
                      console.log(`[Post-Call Messaging] Added Meta HEADER (${mediaTypeLowercase}): ${headerUrl}`);
                    } else {
                      console.warn(`[Post-Call Messaging] Template has ${headerFormat} header but no URL was found in config.`);
                    }
                  } else if (headerFormat === "TEXT" && headerComp.text) {
                    const headerVarMatches = headerComp.text.match(/\{\{\d+\}\}/g) || [];
                    if (headerVarMatches.length > 0) {
                      let headerVal = "";
                      if (whatsappVariables) {
                        try {
                          const parsedVars = JSON.parse(whatsappVariables);
                          for (const [, val] of Object.entries(parsedVars)) {
                            if (val && typeof val === "object" && val.componentType === "header" && val.value) {
                              headerVal = stripUnresolvedVar(resolveVarValue(val.value, contactData));
                              break;
                            }
                          }
                        } catch (_) {
                        }
                      }
                      if (!headerVal) headerVal = contactData.contact_name || " ";
                      components = [{ type: "header", parameters: [{ type: "text", text: headerVal }] }, ...components];
                      console.log(`[Post-Call Messaging] Added HEADER text: ${headerVal}`);
                    }
                  }
                }
                const buttonComponents = MetaWhatsAppService2.buildButtonComponents(
                  templateDef.components,
                  Object.keys(buttonOverrides).length > 0 ? buttonOverrides : void 0
                );
                if (buttonComponents.length > 0) {
                  components = [...components, ...buttonComponents];
                  console.log(`[Post-Call Messaging] Added ${buttonComponents.length} button component(s)`);
                }
              }
            } catch (tmplErr) {
              console.warn(`[Post-Call Messaging] Could not fetch Meta template definition: ${tmplErr.message}`);
            }
            console.log(`[Post-Call Messaging] Attempting Meta send for ${callerPhone}...`);
            console.log(`[Post-Call Messaging] Final Resolved Components for Meta: ${JSON.stringify(components, null, 2)}`);
            const result = await metaWhatsAppService2.sendTemplate(userId2, callerPhone, whatsappTemplate, templateLanguage, components, { callId, agentId: dbAgentId });
            console.log(`\u2705 [Post-Call Messaging] WhatsApp sent via Meta. Result: ${JSON.stringify(result)}`);
          } else if (whatswaySettings?.isActive) {
            console.log(`[Post-Call Messaging] Final Resolved Components for WhatsWay: ${JSON.stringify(components, null, 2)}`);
            const result = await whatswayService2.sendTemplate(userId2, callerPhone, whatsappTemplate, templateLanguage, components, { callId, agentId: dbAgentId });
            console.log(`\u2705 [Post-Call Messaging] WhatsApp sent via WhatsWay. Result: ${JSON.stringify(result)}`);
          } else {
            console.warn(`[Post-Call Messaging] No active WhatsApp provider for user ${userId2}`);
          }
        }
      } catch (waErr) {
        console.error(`\u274C [Post-Call Messaging] WhatsApp send error: ${waErr.message}`);
        console.error(waErr.stack);
      }
    }
    if (emailEnabled && emailTemplate) {
      try {
        if (!callerEmail) {
          console.warn(`[Post-Call Messaging] Cannot send email: no email address collected for caller ${callerPhone}`);
        } else {
          const { emailTemplateService: emailTemplateService2 } = await Promise.resolve().then(() => (init_email_template_service(), email_template_service_exports));
          const variables = {
            contact_name: contactData.contact_name || "",
            contact_phone: callerPhone,
            contact_email: callerEmail,
            agent_name: contactData.agent_name || "",
            ...contactData.appointment_date ? { appointment_date: contactData.appointment_date } : {},
            ...contactData.appointment_time ? { appointment_time: contactData.appointment_time } : {},
            ...contactData.service_name ? { service_name: contactData.service_name } : {},
            ...contactData.duration ? { duration: contactData.duration } : {},
            ...contactData.notes ? { notes: contactData.notes } : {},
            ...contactData.appointment_status ? { appointment_status: contactData.appointment_status } : {}
          };
          await emailTemplateService2.sendEmailByName(userId2, emailTemplate, callerEmail, variables, { callId, agentId: dbAgentId });
          console.log(`\u2705 [Post-Call Messaging] Email sent to ${callerEmail}`);
        }
      } catch (emailErr) {
        console.error(`\u274C [Post-Call Messaging] Email send error: ${emailErr.message}`);
      }
    }
  } catch (err) {
    console.error(`\u274C [Post-Call Messaging] Unexpected error: ${err.message}`);
  }
}
var CALL_TABLES, _triggeredCallIds;
var init_post_call_messaging = __esm({
  "server/services/post-call-messaging.ts"() {
    "use strict";
    init_db();
    init_schema();
    CALL_TABLES = ["twilio_openai_calls", "plivo_calls", "calls", "sip_calls"];
    _triggeredCallIds = /* @__PURE__ */ new Set();
  }
});

// plugins/messaging/index.ts
import { Router as Router5 } from "express";

// plugins/messaging/routes/user-messaging.routes.ts
init_email_template_service();
init_whatsway_service();
init_meta_whatsapp_service();
import { Router } from "express";
import multer from "multer";

// plugins/messaging/services/meta-whatsapp-admin.service.ts
init_db();
import { sql as sql7 } from "drizzle-orm";
import crypto from "crypto";
var META_GRAPH_API_BASE2 = "https://graph.facebook.com";
var META_API_VERSION2 = process.env.META_WHATSAPP_API_VERSION || "v22.0";
function snakeToCamel5(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow5(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel5(key)] = row[key];
  }
  return transformed;
}
var MetaWhatsAppAdminService = class {
  async getConfig() {
    const result = await db.execute(sql7`
      SELECT * FROM meta_whatsapp_admin_config LIMIT 1
    `);
    const row = result.rows[0];
    return row ? transformRow5(row) : null;
  }
  async saveConfig(data) {
    const existing = await this.getConfig();
    if (existing) {
      const result = await db.execute(sql7`
        UPDATE meta_whatsapp_admin_config SET
          whatsapp_provider_mode = ${data.whatsappProviderMode !== void 0 ? data.whatsappProviderMode : existing.whatsappProviderMode},
          meta_app_id = ${data.metaAppId !== void 0 ? data.metaAppId : existing.metaAppId},
          meta_app_secret = ${data.metaAppSecret !== void 0 ? data.metaAppSecret : existing.metaAppSecret},
          meta_config_id = ${data.metaConfigId !== void 0 ? data.metaConfigId : existing.metaConfigId},
          embedded_signup_enabled = ${data.embeddedSignupEnabled !== void 0 ? data.embeddedSignupEnabled : existing.embeddedSignupEnabled},
          coexistence_enabled = ${data.coexistenceEnabled !== void 0 ? data.coexistenceEnabled : existing.coexistenceEnabled},
          webhook_verify_token = ${data.webhookVerifyToken !== void 0 ? data.webhookVerifyToken : existing.webhookVerifyToken},
          updated_at = NOW()
        WHERE id = ${existing.id}
        RETURNING *
      `);
      return transformRow5(result.rows[0]);
    } else {
      const result = await db.execute(sql7`
        INSERT INTO meta_whatsapp_admin_config (
          whatsapp_provider_mode,
          meta_app_id,
          meta_app_secret,
          meta_config_id,
          embedded_signup_enabled,
          coexistence_enabled,
          webhook_verify_token
        ) VALUES (
          ${data.whatsappProviderMode || "both"},
          ${data.metaAppId || ""},
          ${data.metaAppSecret || ""},
          ${data.metaConfigId || ""},
          ${data.embeddedSignupEnabled ?? false},
          ${data.coexistenceEnabled ?? false},
          ${data.webhookVerifyToken || ""}
        )
        RETURNING *
      `);
      return transformRow5(result.rows[0]);
    }
  }
  async getProviderMode() {
    const config = await this.getConfig();
    return config?.whatsappProviderMode || "both";
  }
  async isMetaAllowed() {
    const mode = await this.getProviderMode();
    return mode === "meta_only" || mode === "both";
  }
  async isWhatswayAllowed() {
    const mode = await this.getProviderMode();
    return mode === "whatsway_only" || mode === "both";
  }
  async getEmbeddedSignupConfig() {
    const config = await this.getConfig();
    return {
      metaAppId: config?.metaAppId || "",
      metaConfigId: config?.metaConfigId || "",
      embeddedSignupEnabled: config?.embeddedSignupEnabled ?? false,
      coexistenceEnabled: config?.coexistenceEnabled ?? false
    };
  }
  async generateWebhookVerifyToken() {
    const token = crypto.randomBytes(32).toString("hex");
    await this.saveConfig({ webhookVerifyToken: token });
    return token;
  }
  async getWebhookVerifyToken() {
    const config = await this.getConfig();
    return config?.webhookVerifyToken || "";
  }
  async exchangeCodeForToken(code) {
    const config = await this.getConfig();
    if (!config?.metaAppId || !config?.metaAppSecret) {
      throw new Error("Meta App ID and App Secret must be configured by the administrator before using Embedded Signup.");
    }
    const url = `${META_GRAPH_API_BASE2}/${META_API_VERSION2}/oauth/access_token?client_id=${encodeURIComponent(config.metaAppId)}&client_secret=${encodeURIComponent(config.metaAppSecret)}&code=${encodeURIComponent(code)}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Failed to exchange code for access token: ${errorText}`);
    }
    const data = await response.json();
    if (!data.access_token) {
      throw new Error("No access_token returned from Meta OAuth exchange.");
    }
    return data.access_token;
  }
  async debugToken(accessToken) {
    const config = await this.getConfig();
    if (!config?.metaAppId || !config?.metaAppSecret) {
      throw new Error("Meta App ID and App Secret must be configured.");
    }
    const appToken = `${config.metaAppId}|${config.metaAppSecret}`;
    const url = `${META_GRAPH_API_BASE2}/${META_API_VERSION2}/debug_token?input_token=${encodeURIComponent(accessToken)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${appToken}`
      }
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Failed to debug token: ${errorText}`);
    }
    const data = await response.json();
    const granularScopes = data?.data?.granular_scopes || [];
    const wabaIds = [];
    for (const scope of granularScopes) {
      if (scope.target_ids && Array.isArray(scope.target_ids)) {
        for (const id of scope.target_ids) {
          if (!wabaIds.includes(id)) {
            wabaIds.push(id);
          }
        }
      }
    }
    return wabaIds;
  }
  async getPhoneNumbers(wabaId, accessToken) {
    const url = `${META_GRAPH_API_BASE2}/${META_API_VERSION2}/${wabaId}/phone_numbers`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Failed to fetch phone numbers for WABA ${wabaId}: ${errorText}`);
    }
    const data = await response.json();
    const phones = data?.data || [];
    return phones.map((p) => ({
      id: p.id,
      displayPhoneNumber: p.display_phone_number || "",
      verifiedName: p.verified_name || ""
    }));
  }
};
var metaWhatsAppAdminService = new MetaWhatsAppAdminService();

// plugins/messaging/services/whatsapp-conversation.service.ts
init_db();
import { sql as sql8 } from "drizzle-orm";
function snakeToCamel6(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function transformRow6(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel6(key)] = row[key];
  }
  return transformed;
}
function normalizePhone(phone) {
  return phone.replace(/[^0-9]/g, "");
}
var WhatsAppConversationService = class {
  async getOrCreateConversation(userId, contactPhone, contactName, contactWaId) {
    const normalizedPhone = normalizePhone(contactPhone);
    const name = contactName || "";
    const waId = contactWaId || "";
    const result = await db.execute(sql8`
      INSERT INTO whatsapp_conversations (user_id, contact_phone, contact_name, contact_wa_id)
      VALUES (${userId}, ${normalizedPhone}, ${name}, ${waId})
      ON CONFLICT (user_id, contact_phone) DO UPDATE SET
        contact_name = CASE WHEN EXCLUDED.contact_name != '' THEN EXCLUDED.contact_name ELSE whatsapp_conversations.contact_name END,
        contact_wa_id = CASE WHEN EXCLUDED.contact_wa_id != '' THEN EXCLUDED.contact_wa_id ELSE whatsapp_conversations.contact_wa_id END,
        updated_at = NOW()
      RETURNING *
    `);
    return transformRow6(result.rows[0]);
  }
  async getConversations(userId, options = {}) {
    const limit = options.limit || 50;
    const offset = options.offset || 0;
    let whereClause = sql8`WHERE user_id = ${userId}`;
    if (options.status) {
      whereClause = sql8`${whereClause} AND status = ${options.status}`;
    }
    if (options.search) {
      const searchPattern = `%${options.search}%`;
      whereClause = sql8`${whereClause} AND (contact_phone ILIKE ${searchPattern} OR contact_name ILIKE ${searchPattern})`;
    }
    const countResult = await db.execute(sql8`
      SELECT COUNT(*)::int as total FROM whatsapp_conversations ${whereClause}
    `);
    const total = countResult.rows[0]?.total || 0;
    const result = await db.execute(sql8`
      SELECT * FROM whatsapp_conversations ${whereClause}
      ORDER BY last_message_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);
    const conversations = (result.rows || []).map(
      (row) => transformRow6(row)
    );
    return { conversations, total };
  }
  async getConversation(userId, conversationId) {
    const result = await db.execute(sql8`
      SELECT * FROM whatsapp_conversations WHERE id = ${conversationId} AND user_id = ${userId} LIMIT 1
    `);
    const row = result.rows[0];
    return row ? transformRow6(row) : null;
  }
  async getMessages(conversationId, options = {}) {
    const limit = options.limit || 50;
    let query;
    if (options.before) {
      query = sql8`
        SELECT * FROM whatsapp_messages
        WHERE conversation_id = ${conversationId} AND created_at < ${options.before}
        ORDER BY created_at ASC
        LIMIT ${limit}
      `;
    } else {
      query = sql8`
        SELECT * FROM (
          SELECT * FROM whatsapp_messages
          WHERE conversation_id = ${conversationId}
          ORDER BY created_at DESC
          LIMIT ${limit}
        ) sub ORDER BY created_at ASC
      `;
    }
    const result = await db.execute(query);
    return (result.rows || []).map(
      (row) => transformRow6(row)
    );
  }
  async addMessage(data) {
    const messageType = data.messageType || "text";
    const content = data.content || "";
    const status = data.status || "sent";
    const metadata = data.metadata ? JSON.stringify(data.metadata) : "{}";
    const preview = content.substring(0, 100);
    const result = await db.execute(sql8`
      INSERT INTO whatsapp_messages (
        conversation_id, user_id, direction, sender_type, message_type,
        content, meta_message_id, template_name, media_url, media_mime_type,
        status, metadata
      ) VALUES (
        ${data.conversationId}, ${data.userId}, ${data.direction}, ${data.senderType}, ${messageType},
        ${content}, ${data.metaMessageId || null}, ${data.templateName || null}, ${data.mediaUrl || null}, ${data.mediaMimeType || null},
        ${status}, ${metadata}::jsonb
      )
      RETURNING *
    `);
    if (data.direction === "inbound") {
      await db.execute(sql8`
        UPDATE whatsapp_conversations SET
          last_message_at = NOW(),
          last_message_preview = ${preview},
          unread_count = unread_count + 1,
          updated_at = NOW()
        WHERE id = ${data.conversationId}
      `);
    } else {
      await db.execute(sql8`
        UPDATE whatsapp_conversations SET
          last_message_at = NOW(),
          last_message_preview = ${preview},
          updated_at = NOW()
        WHERE id = ${data.conversationId}
      `);
    }
    return transformRow6(result.rows[0]);
  }
  async updateMessageStatus(metaMessageId, status, errorMessage) {
    await db.execute(sql8`
      UPDATE whatsapp_messages SET
        status = ${status},
        error_message = ${errorMessage || null}
      WHERE meta_message_id = ${metaMessageId}
    `);
  }
  async markRead(userId, conversationId) {
    await db.execute(sql8`
      UPDATE whatsapp_conversations SET
        unread_count = 0,
        updated_at = NOW()
      WHERE id = ${conversationId} AND user_id = ${userId}
    `);
  }
  async updateConversationStatus(userId, conversationId, status) {
    await db.execute(sql8`
      UPDATE whatsapp_conversations SET
        status = ${status},
        updated_at = NOW()
      WHERE id = ${conversationId} AND user_id = ${userId}
    `);
  }
  async setAutoReply(userId, conversationId, enabled, agentId) {
    await db.execute(sql8`
      UPDATE whatsapp_conversations SET
        auto_reply_enabled = ${enabled},
        assigned_agent_id = ${agentId || null},
        updated_at = NOW()
      WHERE id = ${conversationId} AND user_id = ${userId}
    `);
  }
  async refreshWindow(conversationId) {
    await db.execute(sql8`
      UPDATE whatsapp_conversations SET
        window_expires_at = NOW() + INTERVAL '24 hours',
        updated_at = NOW()
      WHERE id = ${conversationId}
    `);
  }
  isWindowOpen(conversation) {
    if (!conversation.windowExpiresAt) return false;
    return new Date(conversation.windowExpiresAt) > /* @__PURE__ */ new Date();
  }
  async getConversationByPhone(userId, contactPhone) {
    const normalized = normalizePhone(contactPhone);
    const result = await db.execute(sql8`
      SELECT * FROM whatsapp_conversations
      WHERE user_id = ${userId} AND contact_phone = ${normalized}
      LIMIT 1
    `);
    const row = result.rows[0];
    return row ? transformRow6(row) : null;
  }
  async findUserByPhoneNumberId(phoneNumberId) {
    const result = await db.execute(sql8`
      SELECT user_id FROM meta_whatsapp_settings
      WHERE phone_number_id = ${phoneNumberId} AND is_active = true
      LIMIT 1
    `);
    const row = result.rows[0];
    return row ? row.user_id : null;
  }
  async findUserByWabaId(wabaId) {
    const result = await db.execute(sql8`
      SELECT user_id, phone_number_id FROM meta_whatsapp_settings
      WHERE waba_id = ${wabaId} AND is_active = true
      LIMIT 1
    `);
    const row = result.rows[0];
    return row ? { userId: row.user_id, phoneNumberId: row.phone_number_id } : null;
  }
  async updatePhoneNumberId(userId, newPhoneNumberId) {
    await db.execute(sql8`
      UPDATE meta_whatsapp_settings SET
        phone_number_id = ${newPhoneNumberId},
        updated_at = NOW()
      WHERE user_id = ${userId}
    `);
  }
  async isDuplicateMessage(metaMessageId) {
    if (!metaMessageId) return false;
    const result = await db.execute(sql8`
      SELECT 1 FROM whatsapp_messages WHERE meta_message_id = ${metaMessageId} LIMIT 1
    `);
    return (result.rows || []).length > 0;
  }
  async getConversationUpdates(userId, since) {
    const result = await db.execute(sql8`
      SELECT id, unread_count, last_message_at, last_message_preview, status, updated_at, window_expires_at,
             contact_phone, contact_name, contact_wa_id, user_id, assigned_agent_id, auto_reply_enabled, created_at
      FROM whatsapp_conversations
      WHERE user_id = ${userId} AND updated_at > ${since}
      ORDER BY last_message_at DESC
    `);
    return (result.rows || []).map(
      (row) => transformRow6(row)
    );
  }
};
var whatsAppConversationService = new WhatsAppConversationService();

// plugins/messaging/routes/user-messaging.routes.ts
init_messaging_log_service();
async function getActiveWhatsAppProvider(userId) {
  const [metaSettings, whatswaySettings] = await Promise.all([
    metaWhatsAppService.getSettings(userId),
    whatswayService.getSettings(userId)
  ]);
  if (metaSettings?.isActive) return "meta";
  if (whatswaySettings?.isActive) return "whatsway";
  return null;
}
var ALLOWED_MIME_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/3gpp",
  "audio/aac",
  "audio/mp4",
  "audio/mpeg",
  "audio/amr",
  "audio/ogg",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain"
]);
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: images (JPEG/PNG/WebP), videos (MP4/3GPP), audio (AAC/MP3/OGG/AMR), and documents (PDF/DOC/XLS/PPT/TXT).`));
    }
  }
});
var router = Router();
router.get("/email-templates", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    try {
      await emailTemplateService.seedDefaultTemplates(userId);
    } catch (seedErr) {
      console.warn("[Messaging] Failed to seed default templates:", seedErr.message);
    }
    const templates = await emailTemplateService.getAll(userId);
    res.json({ success: true, data: templates });
  } catch (error) {
    console.error("[Messaging] Error fetching email templates:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch email templates" });
  }
});
router.post("/email-templates", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { name, subject, htmlBody, variables, designJson } = req.body;
    if (!name || !subject || !htmlBody) {
      return res.status(400).json({ success: false, error: "Name, subject, and htmlBody are required" });
    }
    const template = await emailTemplateService.create(userId, { name, subject, htmlBody, variables, designJson });
    res.json({ success: true, data: template });
  } catch (error) {
    console.error("[Messaging] Error creating email template:", error.message);
    res.status(500).json({ success: false, error: "Failed to create email template" });
  }
});
router.put("/email-templates/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { id } = req.params;
    const { name, subject, htmlBody } = req.body;
    if (!name || !subject || !htmlBody) {
      return res.status(400).json({ success: false, error: "Name, subject, and htmlBody are required" });
    }
    const template = await emailTemplateService.update(userId, id, req.body);
    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" });
    }
    res.json({ success: true, data: template });
  } catch (error) {
    console.error("[Messaging] Error updating email template:", error.message);
    res.status(500).json({ success: false, error: "Failed to update email template" });
  }
});
router.delete("/email-templates/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { id } = req.params;
    const deleted = await emailTemplateService.delete(userId, id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Template not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[Messaging] Error deleting email template:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete email template" });
  }
});
router.post("/email-templates/:id/test", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { id } = req.params;
    const { recipientEmail, variables } = req.body;
    if (!recipientEmail) {
      return res.status(400).json({ success: false, error: "recipientEmail is required" });
    }
    try {
      await emailTemplateService.seedDefaultTemplates(userId);
    } catch (seedErr) {
      console.warn("[Messaging] Template repair skipped before test send:", seedErr?.message);
    }
    const result = await emailTemplateService.sendEmail(userId, id, recipientEmail, variables || {});
    res.json({ success: result.success, data: result });
  } catch (error) {
    console.error("[Messaging] Error sending test email:", error.message);
    res.status(500).json({ success: false, error: "Failed to send test email" });
  }
});
router.post("/whatsapp/test", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { phoneNumber, templateName, language, components } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ success: false, error: "phoneNumber is required" });
    }
    if (!templateName) {
      return res.status(400).json({ success: false, error: "templateName is required" });
    }
    const provider = await getActiveWhatsAppProvider(userId);
    if (!provider) {
      return res.status(400).json({ success: false, error: "No WhatsApp provider configured." });
    }
    let result;
    if (provider === "meta") {
      result = await metaWhatsAppService.sendTemplate(
        userId,
        phoneNumber,
        templateName,
        language || "en_US",
        components || []
      );
    } else {
      result = await whatswayService.sendTemplate(
        userId,
        phoneNumber,
        templateName,
        language || "en_US",
        components || []
      );
    }
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[Messaging] Error sending test WhatsApp message:", error.message);
    res.status(500).json({ success: false, error: "Failed to send test WhatsApp message" });
  }
});
router.get("/whatsway/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const settings = await whatswayService.getSettings(userId);
    if (settings) {
      const masked = {
        ...settings,
        apiKey: settings.apiKey ? `${settings.apiKey.substring(0, 8)}...` : "",
        apiSecret: settings.apiSecret ? `${settings.apiSecret.substring(0, 8)}...` : ""
      };
      res.json({ success: true, data: masked });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (error) {
    console.error("[Messaging] Error fetching WhatsWay settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch WhatsWay settings" });
  }
});
router.post("/whatsway/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const whatswayAllowed = await metaWhatsAppAdminService.isWhatswayAllowed();
    if (!whatswayAllowed) {
      return res.status(403).json({ success: false, error: "WhatsWay is not enabled by the administrator" });
    }
    const { apiKey, apiSecret, baseUrl, channelId } = req.body;
    if (!apiKey || !apiSecret) {
      return res.status(400).json({ success: false, error: "apiKey and apiSecret are required" });
    }
    const settings = await whatswayService.saveSettings(userId, { apiKey, apiSecret, baseUrl, channelId });
    let verified = false;
    let accountName = "";
    let verifyError = "";
    try {
      const accountInfo = await whatswayService.testConnection(userId, true);
      verified = true;
      accountName = accountInfo?.name || accountInfo?.businessName || "";
      console.log(`[Messaging] WhatsWay credentials verified for user ${userId}: ${accountName}`);
      try {
        await metaWhatsAppService.deactivate(userId);
        console.log(`[Messaging] Deactivated Meta WhatsApp for user ${userId} (WhatsWay is now active)`);
      } catch (_) {
      }
    } catch (verErr) {
      verifyError = verErr.message || "Verification failed";
      console.log(`[Messaging] WhatsWay credentials saved but verification failed for user ${userId}: ${verifyError}`);
    }
    res.json({
      success: true,
      data: {
        id: settings.id,
        baseUrl: settings.baseUrl,
        isActive: settings.isActive,
        verified,
        accountName,
        verifyError
      }
    });
  } catch (error) {
    console.error("[Messaging] Error saving WhatsWay settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to save WhatsWay settings" });
  }
});
router.delete("/whatsway/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    await whatswayService.deleteSettings(userId);
    res.json({ success: true });
  } catch (error) {
    console.error("[Messaging] Error deleting WhatsWay settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete WhatsWay settings" });
  }
});
router.post("/whatsway/test-connection", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const accountInfo = await whatswayService.testConnection(userId);
    res.json({ success: true, data: accountInfo });
  } catch (error) {
    console.error("[Messaging] WhatsWay connection test failed:", error.message);
    res.status(400).json({ success: false, error: "Failed to test WhatsWay connection" });
  }
});
router.get("/whatsway/templates", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const templates = await whatswayService.getTemplates(userId);
    res.json({ success: true, data: templates });
  } catch (error) {
    console.error("[Messaging] Error fetching WhatsWay templates:", error.message);
    res.status(400).json({ success: false, error: "Failed to fetch WhatsWay templates" });
  }
});
router.get("/meta-whatsapp/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const settings = await metaWhatsAppService.getSettings(userId);
    if (settings) {
      const safe = {
        ...settings,
        accessToken: settings.accessToken ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "",
        hasAccessToken: !!settings.accessToken
      };
      res.json({ success: true, data: safe });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (error) {
    console.error("[Messaging] Error fetching Meta WhatsApp settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch Meta WhatsApp settings" });
  }
});
router.post("/meta-whatsapp/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const metaAllowed = await metaWhatsAppAdminService.isMetaAllowed();
    if (!metaAllowed) {
      return res.status(403).json({ success: false, error: "Meta WhatsApp is not enabled by the administrator" });
    }
    const { phoneNumberId, wabaId, accessToken } = req.body;
    if (!phoneNumberId || !wabaId) {
      return res.status(400).json({ success: false, error: "Phone Number ID and WABA ID are required" });
    }
    let tokenToSave = accessToken;
    const isPlaceholder = !accessToken || accessToken === "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" || accessToken.endsWith("...");
    if (isPlaceholder) {
      const existing = await metaWhatsAppService.getSettings(userId);
      if (existing?.accessToken) {
        tokenToSave = existing.accessToken;
      } else {
        return res.status(400).json({ success: false, error: "Access Token is required for initial setup" });
      }
    }
    const settings = await metaWhatsAppService.saveSettings(userId, { phoneNumberId, wabaId, accessToken: tokenToSave });
    try {
      const regResult = await metaWhatsAppService.registerPhoneNumber(phoneNumberId, tokenToSave);
      console.log(`[Messaging] Auto-registration result: ${regResult.success}${regResult.error ? ` (${regResult.error})` : ""}`);
    } catch (regErr) {
      console.warn(`[Messaging] Auto-registration failed for phone:`, regErr.message);
    }
    let verified = false;
    let businessName = "";
    let verifyError = "";
    try {
      const connInfo = await metaWhatsAppService.testConnection(userId, true);
      verified = true;
      businessName = connInfo.businessName || "";
      console.log(`[Messaging] Meta WhatsApp credentials verified for user ${userId}: ${businessName}`);
      try {
        await whatswayService.deactivate(userId);
        console.log(`[Messaging] Deactivated WhatsWay for user ${userId} (Meta WhatsApp is now active)`);
      } catch (_) {
      }
    } catch (verErr) {
      verifyError = verErr.message || "Verification failed";
      console.log(`[Messaging] Meta WhatsApp credentials saved but verification failed for user ${userId}: ${verifyError}`);
    }
    res.json({
      success: true,
      data: {
        id: settings.id,
        isActive: settings.isActive,
        verified,
        businessName,
        verifyError
      }
    });
  } catch (error) {
    console.error("[Messaging] Error saving Meta WhatsApp settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to save Meta WhatsApp settings" });
  }
});
router.delete("/meta-whatsapp/settings", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    await metaWhatsAppService.deleteSettings(userId);
    res.json({ success: true });
  } catch (error) {
    console.error("[Messaging] Error deleting Meta WhatsApp settings:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete Meta WhatsApp settings" });
  }
});
router.post("/meta-whatsapp/test-connection", async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    const connInfo = await metaWhatsAppService.testConnection(userId);
    res.json({ success: true, data: connInfo });
  } catch (error) {
    console.error("[Messaging] Meta WhatsApp connection test failed:", error.message);
    if (error.message && /not registered|register/i.test(error.message)) {
      console.log("[Messaging] Connection test failure looks registration-related, attempting auto-registration...");
      try {
        const settings = await metaWhatsAppService.getSettings(userId);
        if (settings?.phoneNumberId && settings?.accessToken) {
          const regResult = await metaWhatsAppService.registerPhoneNumber(settings.phoneNumberId, settings.accessToken);
          console.log(`[Messaging] Auto-registration result: ${regResult.success}${regResult.error ? ` (${regResult.error})` : ""}`);
          if (regResult.success) {
            const connInfo = await metaWhatsAppService.testConnection(userId);
            return res.json({ success: true, data: { ...connInfo, autoRegistered: true } });
          }
        }
      } catch (autoRegErr) {
        console.error("[Messaging] Auto-registration attempt failed:", autoRegErr.message);
      }
    }
    res.status(400).json({ success: false, error: "Failed to test Meta WhatsApp connection" });
  }
});
router.get("/meta-whatsapp/channel-health", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const health = await metaWhatsAppService.getChannelHealth(userId);
    res.json({ success: true, data: health });
  } catch (error) {
    console.error("[Messaging] Error fetching channel health:", error.message);
    res.status(400).json({ success: false, error: error.message || "Failed to fetch channel health" });
  }
});
router.get("/meta-whatsapp/templates", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const templates = await metaWhatsAppService.getTemplates(userId);
    res.json({ success: true, data: templates });
  } catch (error) {
    console.error("[Messaging] Error fetching Meta WhatsApp templates:", error.message);
    res.status(400).json({ success: false, error: "Failed to fetch Meta WhatsApp templates" });
  }
});
router.get("/logs", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { channel, status, startDate, endDate, limit, offset } = req.query;
    const result = await messagingLogService.getLogs(userId, {
      channel,
      status,
      startDate,
      endDate,
      limit: limit ? parseInt(limit, 10) : void 0,
      offset: offset ? parseInt(offset, 10) : void 0
    });
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[Messaging] Error fetching logs:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch messaging logs" });
  }
});
router.get("/whatsapp-provider-config", async (req, res) => {
  try {
    const config = await metaWhatsAppAdminService.getConfig();
    const providerMode = config?.whatsappProviderMode || "both";
    const embeddedSignupEnabled = config?.embeddedSignupEnabled ?? false;
    const coexistenceEnabled = config?.coexistenceEnabled ?? false;
    const result = {
      providerMode,
      embeddedSignupEnabled,
      coexistenceEnabled
    };
    if (embeddedSignupEnabled) {
      result.metaAppId = config?.metaAppId || "";
      result.metaConfigId = config?.metaConfigId || "";
    }
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[Messaging] Error fetching WhatsApp provider config:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch provider config" });
  }
});
router.get("/conversations", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { status, search, limit, offset } = req.query;
    const result = await whatsAppConversationService.getConversations(userId, {
      status,
      search,
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0
    });
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[Messaging] Error fetching conversations:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch conversations" });
  }
});
router.get("/conversations/updates", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { since } = req.query;
    if (!since) {
      return res.status(400).json({ success: false, error: "since parameter is required (ISO timestamp)" });
    }
    const conversations = await whatsAppConversationService.getConversationUpdates(userId, since);
    res.json({ success: true, data: conversations });
  } catch (error) {
    console.error("[Messaging] Error fetching conversation updates:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch conversation updates" });
  }
});
router.get("/conversations/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    res.json({ success: true, data: conversation });
  } catch (error) {
    console.error("[Messaging] Error fetching conversation:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch conversation" });
  }
});
router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    const { limit, before } = req.query;
    const messages = await whatsAppConversationService.getMessages(req.params.id, {
      limit: limit ? parseInt(limit, 10) : 50,
      before
    });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error("[Messaging] Error fetching messages:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});
router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    const provider = await getActiveWhatsAppProvider(userId);
    if (!provider) {
      return res.status(400).json({ success: false, error: "No WhatsApp provider configured. Please set up WhatsWay or Meta WhatsApp in your messaging settings." });
    }
    const { type, content, templateName, language, components, mediaId, caption, filename, mimeType, latitude, longitude, locationName, address } = req.body;
    if (type === "text") {
      if (!content) {
        return res.status(400).json({ success: false, error: "content is required for text messages" });
      }
      if (!whatsAppConversationService.isWindowOpen(conversation)) {
        return res.status(400).json({ success: false, error: "24-hour window closed. Please use a template message." });
      }
      const sendResult = provider === "meta" ? await metaWhatsAppService.sendReply(userId, conversation.contactPhone, content) : await whatswayService.sendReply(userId, conversation.contactPhone, content);
      const message = await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "outbound",
        senderType: "user",
        messageType: "text",
        content,
        metaMessageId: sendResult.messageId,
        status: "sent"
      });
      res.json({ success: true, data: message });
    } else if (type === "template") {
      if (!templateName) {
        return res.status(400).json({ success: false, error: "templateName is required for template messages" });
      }
      const sendResult = provider === "meta" ? await metaWhatsAppService.sendTemplate(userId, conversation.contactPhone, templateName, language || "en_US", components || []) : await whatswayService.sendTemplate(userId, conversation.contactPhone, templateName, language || "en_US", components || []);
      const message = await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "outbound",
        senderType: "user",
        messageType: "template",
        content: content || `Template: ${templateName}`,
        metaMessageId: sendResult.messageId,
        templateName,
        status: "sent"
      });
      res.json({ success: true, data: message });
    } else if (["image", "video", "audio", "document", "sticker"].includes(type)) {
      if (!mediaId) {
        return res.status(400).json({ success: false, error: "mediaId is required for media messages. Upload first via /upload endpoint." });
      }
      if (!whatsAppConversationService.isWindowOpen(conversation)) {
        return res.status(400).json({ success: false, error: "24-hour window closed. Please use a template message." });
      }
      const sendResult = provider === "meta" ? await metaWhatsAppService.sendMediaMessage(userId, conversation.contactPhone, type, mediaId, { caption, filename }) : await whatswayService.sendMediaMessage(userId, conversation.contactPhone, type, mediaId, { caption, filename });
      const placeholders = {
        image: "[Image]",
        video: "[Video]",
        audio: "[Audio]",
        document: "[Document]",
        sticker: "[Sticker]"
      };
      const displayContent = caption || filename || placeholders[type] || `[${type}]`;
      const message = await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "outbound",
        senderType: "user",
        messageType: type,
        content: displayContent,
        metaMessageId: sendResult.messageId,
        mediaUrl: mediaId,
        mediaMimeType: mimeType || null,
        status: "sent",
        metadata: { mediaId, caption, filename, mimeType }
      });
      res.json({ success: true, data: message });
    } else if (type === "location") {
      if (latitude == null || longitude == null) {
        return res.status(400).json({ success: false, error: "latitude and longitude are required for location messages" });
      }
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isFinite(lat) || !isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return res.status(400).json({ success: false, error: "Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180." });
      }
      if (!whatsAppConversationService.isWindowOpen(conversation)) {
        return res.status(400).json({ success: false, error: "24-hour window closed. Please use a template message." });
      }
      const sendResult = provider === "meta" ? await metaWhatsAppService.sendLocationMessage(userId, conversation.contactPhone, lat, lng, locationName, address) : await whatswayService.sendLocationMessage(userId, conversation.contactPhone, lat, lng, locationName, address);
      const displayContent = `[Location: ${locationName || `${lat}, ${lng}`}]`;
      const message = await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "outbound",
        senderType: "user",
        messageType: "location",
        content: displayContent,
        metaMessageId: sendResult.messageId,
        status: "sent",
        metadata: { latitude: lat, longitude: lng, name: locationName, address }
      });
      res.json({ success: true, data: message });
    } else {
      return res.status(400).json({ success: false, error: "Unsupported message type. Use: text, template, image, video, audio, document, sticker, or location." });
    }
  } catch (error) {
    console.error("[Messaging] Error sending message:", error.message);
    res.status(500).json({ success: false, error: error.message || "Failed to send message" });
  }
});
router.post("/conversations/:id/upload", upload.single("file"), async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }
    const provider = await getActiveWhatsAppProvider(userId);
    if (!provider) {
      return res.status(400).json({ success: false, error: "No WhatsApp provider configured." });
    }
    const mediaId = provider === "meta" ? await metaWhatsAppService.uploadMedia(userId, file.buffer, file.mimetype, file.originalname) : await whatswayService.uploadMedia(userId, file.buffer, file.mimetype, file.originalname);
    res.json({
      success: true,
      data: {
        mediaId,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size
      }
    });
  } catch (error) {
    console.error("[Messaging] Error uploading media:", error.message);
    res.status(500).json({ success: false, error: error.message || "Failed to upload media" });
  }
});
router.get("/media/:mediaId", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { mediaId } = req.params;
    if (!mediaId) return res.status(400).json({ success: false, error: "Media ID required" });
    const provider = await getActiveWhatsAppProvider(userId);
    if (!provider) {
      return res.status(400).json({ success: false, error: "No WhatsApp provider configured." });
    }
    let mediaResult;
    try {
      mediaResult = provider === "meta" ? await metaWhatsAppService.getMediaStream(userId, mediaId) : await whatswayService.getMediaStream(userId, mediaId);
    } catch (primaryErr) {
      try {
        mediaResult = provider === "meta" ? await whatswayService.getMediaStream(userId, mediaId) : await metaWhatsAppService.getMediaStream(userId, mediaId);
        console.log(`[Messaging] Media fallback succeeded for ${mediaId} (primary=${provider})`);
      } catch {
        throw primaryErr;
      }
    }
    const { stream, contentType, contentLength } = mediaResult;
    res.setHeader("Content-Type", contentType);
    if (contentLength) res.setHeader("Content-Length", contentLength);
    res.setHeader("Cache-Control", "private, max-age=3600");
    const { Readable } = await import("stream");
    if (stream && typeof stream.pipe === "function") {
      stream.pipe(res);
    } else if (stream && typeof stream.getReader === "function") {
      const nodeStream = Readable.fromWeb(stream);
      nodeStream.pipe(res);
    } else {
      res.status(500).json({ success: false, error: "Invalid media stream" });
    }
  } catch (error) {
    console.error("[Messaging] Error proxying media:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: error.message || "Failed to fetch media" });
    }
  }
});
router.post("/conversations/:id/read", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    await whatsAppConversationService.markRead(userId, req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("[Messaging] Error marking conversation as read:", error.message);
    res.status(500).json({ success: false, error: "Failed to mark conversation as read" });
  }
});
router.patch("/conversations/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const conversation = await whatsAppConversationService.getConversation(userId, req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, error: "Conversation not found" });
    }
    const { status, autoReplyEnabled, assignedAgentId } = req.body;
    if (status !== void 0) {
      const validStatuses = ["active", "closed", "archived"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, error: "Invalid status. Must be active, closed, or archived." });
      }
      await whatsAppConversationService.updateConversationStatus(userId, req.params.id, status);
    }
    if (autoReplyEnabled !== void 0) {
      await whatsAppConversationService.setAutoReply(userId, req.params.id, autoReplyEnabled, assignedAgentId);
    }
    const updated = await whatsAppConversationService.getConversation(userId, req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Messaging] Error updating conversation:", error.message);
    res.status(500).json({ success: false, error: "Failed to update conversation" });
  }
});
router.post("/meta-whatsapp/embedded-signup/callback", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const { code, wabaId, phoneNumberId, coexistenceMode } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: "Authorization code is required" });
    }
    const adminConfig = await metaWhatsAppAdminService.getConfig();
    const isCoexistence = coexistenceMode === true && adminConfig?.coexistenceEnabled === true;
    if (coexistenceMode === true && !adminConfig?.coexistenceEnabled) {
      return res.status(403).json({ success: false, error: "Coexistence mode is not enabled by the administrator." });
    }
    let accessToken;
    try {
      accessToken = await metaWhatsAppAdminService.exchangeCodeForToken(code);
    } catch (exchangeErr) {
      console.warn(`[Messaging] Code exchange failed, checking if value is already an access token: ${exchangeErr.message}`);
      const tokenTestUrl = `https://graph.facebook.com/v21.0/me?access_token=${encodeURIComponent(code)}`;
      const tokenTestRes = await fetch(tokenTestUrl);
      if (tokenTestRes.ok) {
        console.log("[Messaging] Value is a valid access token, using directly");
        accessToken = code;
      } else {
        throw exchangeErr;
      }
    }
    let finalWabaId = wabaId;
    let finalPhoneNumberId = phoneNumberId;
    if (!finalWabaId || !finalPhoneNumberId) {
      const wabaIds = await metaWhatsAppAdminService.debugToken(accessToken);
      if (wabaIds.length === 0) {
        return res.status(400).json({ success: false, error: "No WhatsApp Business Account found for this token." });
      }
      if (!finalWabaId) {
        finalWabaId = wabaIds[0];
      }
      if (!finalPhoneNumberId) {
        const phones = await metaWhatsAppAdminService.getPhoneNumbers(finalWabaId, accessToken);
        if (phones.length === 0) {
          return res.status(400).json({ success: false, error: "No phone numbers found for this WhatsApp Business Account." });
        }
        finalPhoneNumberId = phones[0].id;
      }
    }
    let registered = false;
    let callbackOverridden = false;
    let coexistenceFallback = false;
    if (isCoexistence) {
      const verifyToken = adminConfig?.webhookVerifyToken || "";
      if (!verifyToken) {
        return res.status(400).json({ success: false, error: "Webhook verify token must be configured before using coexistence mode." });
      }
    }
    const regResult = await metaWhatsAppService.registerPhoneNumber(finalPhoneNumberId, accessToken);
    registered = regResult.success;
    if (isCoexistence) {
      console.log(`[Messaging] Coexistence mode: setting up callback override...`);
      const verifyToken = adminConfig?.webhookVerifyToken || "";
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const isLocalhost = typeof host === "string" && (host.startsWith("localhost") || host.startsWith("127.0.0.1"));
      const protocol = isLocalhost ? "http" : req.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
      const webhookUrl = `${protocol}://${host}/api/webhooks/messaging/meta/webhook`;
      callbackOverridden = await metaWhatsAppService.overrideCallbackUrl(finalPhoneNumberId, accessToken, webhookUrl, verifyToken);
      if (!callbackOverridden) {
        console.warn(`[Messaging] Coexistence override failed`);
        coexistenceFallback = true;
      } else {
        console.log(`[Messaging] Coexistence override callback: ${callbackOverridden} (URL: ${webhookUrl})`);
      }
    }
    const subscribed = await metaWhatsAppService.subscribeWabaToWebhooks(finalWabaId, accessToken);
    console.log(`[Messaging] Post-signup: coexistence=${isCoexistence}, registration=${registered}, callbackOverridden=${callbackOverridden}, subscription=${subscribed}`);
    await metaWhatsAppService.saveSettings(userId, {
      phoneNumberId: finalPhoneNumberId,
      wabaId: finalWabaId,
      accessToken
    });
    try {
      await whatswayService.deactivate(userId);
      console.log(`[Messaging] Deactivated WhatsWay for user ${userId} (Embedded Signup completed)`);
    } catch (_) {
    }
    let businessName = "";
    try {
      const connInfo = await metaWhatsAppService.testConnection(userId, true);
      businessName = connInfo.businessName || "";
    } catch (_) {
    }
    res.json({
      success: true,
      data: {
        wabaId: finalWabaId,
        phoneNumberId: finalPhoneNumberId,
        businessName,
        registered,
        subscribed,
        coexistenceEnabled: isCoexistence && !coexistenceFallback,
        callbackOverridden,
        coexistenceFallback,
        ...coexistenceFallback ? { fallbackReason: "This number does not support coexistence mode. It has been connected in standard mode instead." } : {}
      }
    });
  } catch (error) {
    console.error("[Messaging] Embedded Signup callback error:", error.message);
    res.status(500).json({ success: false, error: error.message || "Embedded Signup failed" });
  }
});
var user_messaging_routes_default = router;

// plugins/messaging/routes/admin-messaging.routes.ts
init_messaging_log_service();
import { Router as Router2 } from "express";
var router2 = Router2();
router2.get("/logs", async (req, res) => {
  try {
    const { channel, status, limit, offset } = req.query;
    const result = await messagingLogService.getAdminLogs({
      channel,
      status,
      limit: limit ? parseInt(limit, 10) : void 0,
      offset: offset ? parseInt(offset, 10) : void 0
    });
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[Messaging Admin] Error fetching logs:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch messaging logs" });
  }
});
router2.get("/stats", async (req, res) => {
  try {
    const stats = await messagingLogService.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("[Messaging Admin] Error fetching stats:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch messaging stats" });
  }
});
router2.get("/whatsapp-config", async (req, res) => {
  try {
    const config = await metaWhatsAppAdminService.getConfig();
    if (!config) {
      return res.json({ success: true, data: null });
    }
    const masked = {
      ...config,
      metaAppSecret: config.metaAppSecret ? config.metaAppSecret.substring(0, 8) + "..." : ""
    };
    res.json({ success: true, data: masked });
  } catch (error) {
    console.error("[Messaging Admin] Error fetching WhatsApp config:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch WhatsApp config" });
  }
});
router2.patch("/whatsapp-config", async (req, res) => {
  try {
    const { provider_mode, meta_app_id, meta_app_secret, meta_config_id, embedded_signup_enabled, coexistence_enabled } = req.body;
    const updateData = {};
    if (provider_mode !== void 0) updateData.whatsappProviderMode = provider_mode;
    if (meta_app_id !== void 0) updateData.metaAppId = meta_app_id;
    if (meta_config_id !== void 0) updateData.metaConfigId = meta_config_id;
    if (embedded_signup_enabled !== void 0) updateData.embeddedSignupEnabled = embedded_signup_enabled;
    if (coexistence_enabled !== void 0) updateData.coexistenceEnabled = coexistence_enabled;
    if (meta_app_secret !== void 0 && !meta_app_secret.endsWith("...")) {
      updateData.metaAppSecret = meta_app_secret;
    }
    const config = await metaWhatsAppAdminService.saveConfig(updateData);
    const masked = {
      ...config,
      metaAppSecret: config.metaAppSecret ? config.metaAppSecret.substring(0, 8) + "..." : ""
    };
    res.json({ success: true, data: masked });
  } catch (error) {
    console.error("[Messaging Admin] Error updating WhatsApp config:", error.message);
    res.status(500).json({ success: false, error: "Failed to update WhatsApp config" });
  }
});
router2.post("/whatsapp-config/generate-verify-token", async (req, res) => {
  try {
    const token = await metaWhatsAppAdminService.generateWebhookVerifyToken();
    res.json({ success: true, data: { verifyToken: token } });
  } catch (error) {
    console.error("[Messaging Admin] Error generating verify token:", error.message);
    res.status(500).json({ success: false, error: "Failed to generate verify token" });
  }
});
router2.post("/whatsapp-config/test-connection", async (req, res) => {
  try {
    const config = await metaWhatsAppAdminService.getConfig();
    if (!config || !config.metaAppId || !config.metaAppSecret) {
      return res.json({
        success: true,
        data: {
          status: "failed",
          error: "Meta App ID and App Secret are not configured. Please save your Meta configuration first."
        }
      });
    }
    const META_API_VERSION3 = process.env.META_WHATSAPP_API_VERSION || "v22.0";
    const appToken = `${config.metaAppId}|${config.metaAppSecret}`;
    const url = `https://graph.facebook.com/${META_API_VERSION3}/${config.metaAppId}?fields=name`;
    const metaRes = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${appToken}` }
    });
    if (!metaRes.ok) {
      const errText = await metaRes.text().catch(() => "Unknown error");
      let errorMsg = `Meta API returned ${metaRes.status}`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson?.error?.message) errorMsg = errJson.error.message;
      } catch {
      }
      return res.json({
        success: true,
        data: {
          status: "failed",
          error: errorMsg
        }
      });
    }
    const metaData = await metaRes.json();
    res.json({
      success: true,
      data: {
        status: "connected",
        appName: metaData.name || config.metaAppId
      }
    });
  } catch (error) {
    console.error("[Messaging Admin] Test connection error:", error.message);
    res.json({
      success: true,
      data: { status: "failed", error: error.message || "Connection test failed" }
    });
  }
});
router2.get("/whatsapp-config/webhook-url", async (req, res) => {
  try {
    const host = req.get("host") || "localhost";
    const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
    const protocol = isLocalhost ? "http" : req.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
    const webhookUrl = `${protocol}://${host}/api/webhooks/messaging/meta/webhook`;
    res.json({ success: true, data: { webhookUrl } });
  } catch (error) {
    console.error("[Messaging Admin] Error getting webhook URL:", error.message);
    res.status(500).json({ success: false, error: "Failed to get webhook URL" });
  }
});
var admin_messaging_routes_default = router2;

// plugins/messaging/routes/webhook-messaging.routes.ts
init_db();
import { Router as Router3 } from "express";
import { sql as sql10 } from "drizzle-orm";

// plugins/messaging/services/webhook-auth.service.ts
import crypto2 from "crypto";
import fs from "fs";
import path from "path";
var PERSISTED_SECRET_PATH = path.join(process.cwd(), ".appointment-webhook-secret");
var appointmentWebhookSecret = null;
function getAppointmentWebhookSecret() {
  if (!appointmentWebhookSecret) {
    if (process.env.APPOINTMENT_WEBHOOK_SECRET) {
      appointmentWebhookSecret = process.env.APPOINTMENT_WEBHOOK_SECRET;
    } else {
      try {
        if (fs.existsSync(PERSISTED_SECRET_PATH)) {
          appointmentWebhookSecret = fs.readFileSync(PERSISTED_SECRET_PATH, "utf-8").trim();
          console.log(`[Webhook Auth] Loaded persisted webhook secret from file`);
        }
      } catch (err) {
      }
      if (!appointmentWebhookSecret) {
        appointmentWebhookSecret = crypto2.randomBytes(32).toString("hex");
        console.log(`[Webhook Auth] Generated new webhook secret`);
      }
      try {
        fs.writeFileSync(PERSISTED_SECRET_PATH, appointmentWebhookSecret, { mode: 384 });
      } catch (err) {
        console.warn(`[Webhook Auth] Could not persist webhook secret to file`);
      }
    }
  }
  return appointmentWebhookSecret;
}
function validateAppointmentWebhookToken(providedToken) {
  if (!providedToken) {
    return false;
  }
  const secret = getAppointmentWebhookSecret();
  const providedBuffer = Buffer.from(providedToken);
  const secretBuffer = Buffer.from(secret);
  if (providedBuffer.length !== secretBuffer.length) {
    return false;
  }
  return crypto2.timingSafeEqual(providedBuffer, secretBuffer);
}

// plugins/messaging/routes/webhook-messaging.routes.ts
init_email_template_service();
init_whatsway_service();
init_meta_whatsapp_service();
var router3 = Router3();
function stripUnresolvedElevenLabsVar(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^\{\{\s*\w+\s*\}\}$/.test(trimmed)) return "";
  return trimmed;
}
function buildSipLookupResult(row) {
  const phone = row.direction === "inbound" ? row.from_number || row.to_number || "" : row.to_number || row.from_number || "";
  if (!phone) return null;
  return {
    phone,
    sipCallId: row.id || "",
    conversationId: row.elevenlabs_conversation_id || "",
    contactData: {
      contact_name: row.contact_name || "",
      contact_phone: phone,
      contact_email: row.contact_email || "",
      agent_name: row.agent_name || "",
      system__caller_id: phone
    }
  };
}
async function lookupSipCallByConversationId(conversationId, userId) {
  if (!conversationId) return null;
  try {
    const conditions = userId ? sql10`sc.elevenlabs_conversation_id = ${conversationId} AND sc.user_id = ${userId}` : sql10`sc.elevenlabs_conversation_id = ${conversationId}`;
    const sipResult = await db.execute(sql10`
      SELECT sc.id, sc.from_number, sc.to_number, sc.direction, sc.elevenlabs_conversation_id,
             a.name as agent_name, COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name, ct.email as contact_email
      FROM sip_calls sc
      LEFT JOIN agents a ON sc.agent_id = a.id
      LEFT JOIN contacts ct ON sc.contact_id = ct.id
      WHERE ${conditions}
      ORDER BY sc.created_at DESC LIMIT 1
    `);
    const rows = Array.isArray(sipResult) ? sipResult : sipResult.rows || [];
    if (rows.length > 0) return buildSipLookupResult(rows[0]);
  } catch (err) {
    console.warn(`[SIP Lookup] Error querying sip_calls by conversationId: ${err.message}`);
  }
  return null;
}
async function lookupAnyCallByAgentId(elevenLabsAgentId, userId) {
  try {
    const callResult = await db.execute(sql10`
      SELECT c.id, c.phone_number, COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name, ct.email as contact_email, a.name as agent_name
      FROM calls c
      JOIN agents a ON c.agent_id = a.id
      LEFT JOIN contacts ct ON c.contact_id = ct.id
      WHERE (a.eleven_labs_agent_id = ${elevenLabsAgentId} OR a.id = ${elevenLabsAgentId})
        AND c.user_id = ${userId}
        AND c.created_at > NOW() - INTERVAL '10 minutes'
      ORDER BY c.created_at DESC LIMIT 1
    `);
    const callRows = Array.isArray(callResult) ? callResult : callResult.rows || [];
    if (callRows.length > 0) {
      const row = callRows[0];
      console.log(`\u{1F4AC} [Messaging Webhook] Found matching record in calls table for agent: ${elevenLabsAgentId}`);
      return {
        phone: row.phone_number,
        sipCallId: row.id,
        contactData: {
          contact_name: row.contact_name || "",
          contact_phone: row.phone_number,
          contact_email: row.contact_email || "",
          agent_name: row.agent_name || "",
          system__caller_id: row.phone_number
        }
      };
    }
    const sipResult = await db.execute(sql10`
      SELECT sc.id, sc.from_number, sc.to_number, sc.direction, sc.elevenlabs_conversation_id,
             a.name as agent_name, COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name, ct.email as contact_email
      FROM sip_calls sc
      JOIN agents a ON sc.agent_id = a.id
      LEFT JOIN contacts ct ON sc.contact_id = ct.id
      WHERE (a.eleven_labs_agent_id = ${elevenLabsAgentId} OR a.id = ${elevenLabsAgentId})
        AND sc.user_id = ${userId}
        AND sc.created_at > NOW() - INTERVAL '10 minutes'
      ORDER BY CASE WHEN sc.status IN ('initiated', 'ringing', 'in-progress', 'answered') THEN 0 ELSE 1 END, sc.created_at DESC LIMIT 1
    `);
    const sipRows = Array.isArray(sipResult) ? sipResult : sipResult.rows || [];
    if (sipRows.length > 0) {
      console.log(`\u{1F4AC} [Messaging Webhook] Found matching record in sip_calls table for agent: ${elevenLabsAgentId}`);
      return buildSipLookupResult(sipRows[0]);
    }
  } catch (err) {
    console.warn(`[Call Lookup] Error querying by agentId: ${err.message}`);
  }
  return null;
}
async function lookupAppointmentData2(sipCallId, conversationId, userId) {
  try {
    const ids = [sipCallId, conversationId].filter(Boolean);
    if (ids.length === 0 || !userId) return {};
    const conditions = ids.map((id) => sql10`call_id = ${id}`);
    const orClause = conditions.length === 1 ? conditions[0] : sql10`(${sql10.join(conditions, sql10` OR `)})`;
    const apptResult = await db.execute(sql10`
      SELECT contact_name, contact_phone, contact_email, appointment_date, appointment_time,
             duration, service_name, notes, status
      FROM appointments
      WHERE user_id = ${userId} AND ${orClause}
      ORDER BY created_at DESC LIMIT 1
    `);
    const rows = Array.isArray(apptResult) ? apptResult : apptResult.rows || [];
    if (rows.length > 0) {
      const a = rows[0];
      console.log(`\u{1F4AC} [Messaging Webhook] Found appointment data: date=${a.appointment_date}, time=${a.appointment_time}, service=${a.service_name || "N/A"}`);
      return {
        ...a.contact_name ? { contact_name: a.contact_name } : {},
        ...a.contact_phone ? { contact_phone: a.contact_phone } : {},
        ...a.contact_email ? { contact_email: a.contact_email } : {},
        ...a.appointment_date ? { appointment_date: a.appointment_date } : {},
        ...a.appointment_time ? { appointment_time: a.appointment_time } : {},
        ...a.duration ? { duration: String(a.duration) } : {},
        ...a.service_name ? { service_name: a.service_name } : {},
        ...a.notes ? { notes: a.notes } : {},
        ...a.status ? { appointment_status: a.status } : {}
      };
    }
  } catch (err) {
    console.warn(`[SIP Lookup] Error querying appointments: ${err.message}`);
  }
  return {};
}
router3.post("/collect-email/:token/:agentId", async (req, res) => {
  const { token, agentId: elevenLabsAgentId } = req.params;
  const { email, caller_email, email_address, conversationId: bodyConversationId, callId: bodyCallId } = req.body;
  const conversationId = stripUnresolvedElevenLabsVar(req.query.conversationId || bodyConversationId);
  const callId = req.query.callId || bodyCallId;
  try {
    if (!validateAppointmentWebhookToken(token)) {
      console.warn(`\u{1F4E7} [Collect Email] Invalid token`);
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const callerEmail = (email_address || email || caller_email || "").trim().toLowerCase();
    if (!callerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callerEmail)) {
      return res.json({ success: false, message: "Invalid email address provided" });
    }
    if (!conversationId && !callId) {
      return res.json({ success: false, message: "Missing conversationId or callId" });
    }
    let updated = false;
    const ALLOWED_CONV_TABLES = ["calls", "sip_calls"];
    const ALLOWED_ID_TABLES = ["twilio_openai_calls", "plivo_calls", "calls", "sip_calls"];
    if (conversationId) {
      for (const tbl of ALLOWED_CONV_TABLES) {
        try {
          const r = await db.execute(
            sql10`UPDATE ${sql10.identifier(tbl)} SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('callerEmail', ${callerEmail}::text) WHERE elevenlabs_conversation_id = ${conversationId} RETURNING id`
          );
          const rows = Array.isArray(r) ? r : r.rows || [];
          if (rows.length > 0) {
            updated = true;
          }
        } catch (_) {
        }
      }
    }
    if (callId) {
      for (const tbl of ALLOWED_ID_TABLES) {
        try {
          const r = await db.execute(
            sql10`UPDATE ${sql10.identifier(tbl)} SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('callerEmail', ${callerEmail}::text) WHERE id = ${callId} RETURNING id`
          );
          const rows = Array.isArray(r) ? r : r.rows || [];
          if (rows.length > 0) {
            updated = true;
          }
        } catch (_) {
        }
      }
    }
    if (!updated) {
      console.warn(`\u{1F4E7} [Collect Email] No call found for conversationId=${conversationId} callId=${callId}`);
      return res.json({ success: false, message: "Call record not found" });
    }
    console.log(`\u{1F4E7} [Collect Email] Saved callerEmail=${callerEmail} for conversationId=${conversationId} callId=${callId}`);
    return res.json({ success: true, message: `Email ${callerEmail} collected successfully` });
  } catch (error) {
    console.error(`\u{1F4E7} [Collect Email] Error:`, error.message);
    return res.json({ success: false, message: "Error saving caller email" });
  }
});
router3.post("/send-email/:token/:agentId", async (req, res) => {
  const startTime = Date.now();
  console.log(`\u{1F4E7} [Messaging Webhook] ===== SEND EMAIL WEBHOOK HIT =====`);
  const { token, agentId: elevenLabsAgentId } = req.params;
  try {
    if (!validateAppointmentWebhookToken(token)) {
      console.warn(`\u{1F4E7} [Messaging Webhook] Invalid authentication token`);
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const agentResult = await db.execute(sql10`
      SELECT id, user_id, messaging_email_template FROM agents 
      WHERE eleven_labs_agent_id = ${elevenLabsAgentId} OR id = ${elevenLabsAgentId} LIMIT 1
    `);
    const agentRows = Array.isArray(agentResult) ? agentResult : agentResult.rows || [];
    if (agentRows.length === 0) {
      console.warn(`\u{1F4E7} [Messaging Webhook] Agent not found: ${elevenLabsAgentId}`);
      return res.json({ success: false, message: "Agent not found" });
    }
    const { id: dbAgentId, user_id: userId, messaging_email_template: savedEmailTemplate } = agentRows[0];
    const { recipient_email: rawRecipientEmail, template_name: requestedTemplateName, variables, dynamic_variables } = req.body;
    const template_name = savedEmailTemplate || requestedTemplateName;
    let recipient_email = stripUnresolvedElevenLabsVar(rawRecipientEmail);
    console.log(`\u{1F4E7} [Messaging Webhook] Headers: ${JSON.stringify(req.headers, null, 2)}`);
    const rawConvId = req.query.conversationId || req.body.conversationId || req.headers["elevenlabs-conversation-id"] || req.headers["x-elevenlabs-conversation-id"] || req.headers["xi-conversation-id"];
    const conversationId = stripUnresolvedElevenLabsVar(rawConvId);
    const callId = req.query.callId || req.body.callId;
    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!recipient_email || !isValidEmail(recipient_email)) {
      recipient_email = "";
    }
    if (!recipient_email && conversationId) {
      console.log(`\u{1F4E7} [Messaging Webhook] recipient_email unresolved, attempting sip_calls lookup for conversationId: ${conversationId}`);
      const sipLookup = await lookupSipCallByConversationId(conversationId, userId);
      if (sipLookup?.contactData?.contact_email && isValidEmail(sipLookup.contactData.contact_email)) {
        recipient_email = sipLookup.contactData.contact_email;
        console.log(`\u{1F4E7} [Messaging Webhook] Resolved email from sip_calls (by convId): ${recipient_email}`);
      }
    }
    if (!recipient_email) {
      console.log(`\u{1F4E7} [Messaging Webhook] Attempting agent-based SIP lookup for agent: ${elevenLabsAgentId}`);
      const sipLookup = await lookupSipCallByAgentId(elevenLabsAgentId, userId);
      if (sipLookup?.contactData?.contact_email && isValidEmail(sipLookup.contactData.contact_email)) {
        recipient_email = sipLookup.contactData.contact_email;
        console.log(`\u{1F4E7} [Messaging Webhook] Resolved email from sip_calls (by agentId): ${recipient_email}`);
      }
    }
    if (!recipient_email || !template_name) {
      return res.json({
        success: false,
        message: "Please provide both the email address and template name."
      });
    }
    const mergedVars = { ...variables || {}, ...dynamic_variables || {} };
    const result = await emailTemplateService.sendEmailByName(
      userId,
      template_name,
      recipient_email,
      mergedVars,
      { callId: req.query.callId, agentId: dbAgentId }
    );
    if (recipient_email && (callId || conversationId)) {
      const CONV_TABLES = ["calls", "sip_calls"];
      const ID_TABLES = ["twilio_openai_calls", "plivo_calls", "calls", "sip_calls"];
      if (conversationId) {
        for (const tbl of CONV_TABLES) {
          try {
            await db.execute(
              sql10`UPDATE ${sql10.identifier(tbl)} SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('callerEmail', ${recipient_email}::text) WHERE elevenlabs_conversation_id = ${conversationId}`
            );
          } catch (_) {
          }
        }
      }
      if (callId) {
        for (const tbl of ID_TABLES) {
          try {
            await db.execute(
              sql10`UPDATE ${sql10.identifier(tbl)} SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('callerEmail', ${recipient_email}::text) WHERE id = ${callId}`
            );
          } catch (_) {
          }
        }
      }
    }
    const elapsed = Date.now() - startTime;
    console.log(`\u{1F4E7} [Messaging Webhook] Email completed in ${elapsed}ms - success: ${result.success}`);
    return res.json({
      success: result.success,
      message: result.success ? `Email sent successfully to ${recipient_email}` : `Failed to send email: ${result.error}`
    });
  } catch (error) {
    console.error(`\u{1F4E7} [Messaging Webhook] Error:`, error.message);
    return res.json({
      success: false,
      message: "Error processing email webhook"
    });
  }
});
router3.post("/send-whatsapp/:token/:agentId", async (req, res) => {
  const startTime = Date.now();
  const { token, agentId: elevenLabsAgentId } = req.params;
  console.log(`\u{1F4AC} [Messaging Webhook] Agent ID: ${elevenLabsAgentId}`);
  console.log(`\u{1F4AC} [Messaging Webhook] Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`\u{1F4AC} [Messaging Webhook] Query: ${JSON.stringify(req.query)}`);
  try {
    if (!validateAppointmentWebhookToken(token)) {
      console.warn(`\u{1F4AC} [Messaging Webhook] Invalid authentication token`);
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const agentResult = await db.execute(sql10`
      SELECT id, user_id, messaging_whatsapp_template, messaging_whatsapp_variables FROM agents 
      WHERE eleven_labs_agent_id = ${elevenLabsAgentId} OR id = ${elevenLabsAgentId} LIMIT 1
    `);
    const agentRows = Array.isArray(agentResult) ? agentResult : agentResult.rows || [];
    if (agentRows.length === 0) {
      console.warn(`\u{1F4AC} [Messaging Webhook] Agent not found: ${elevenLabsAgentId}`);
      return res.json({ success: false, message: "Agent not found" });
    }
    const { id: dbAgentId, user_id: userId, messaging_whatsapp_template: savedWhatsappTemplate, messaging_whatsapp_variables: savedWhatsappVariables } = agentRows[0];
    const { template_name: requestedTemplateName, language, phone_number: rawPhoneNumber, template_variables, headerVariable: incomingHeader, buttonVariables: incomingButtons } = req.body;
    console.log(`\u{1F4AC} [Messaging Webhook] Incoming Request Body: ${JSON.stringify(req.body, null, 2)}`);
    const template_name = savedWhatsappTemplate || requestedTemplateName;
    if (!template_name) {
      return res.json({
        success: false,
        message: "Please provide the WhatsApp template name."
      });
    }
    let recipientPhone = stripUnresolvedElevenLabsVar(rawPhoneNumber);
    let digits = recipientPhone.replace(/[^0-9]/g, "");
    let contactData = {};
    console.log(`\u{1F4AC} [Messaging Webhook] Headers: ${JSON.stringify(req.headers, null, 2)}`);
    const rawConversationId = req.query.conversationId || req.body.conversationId || req.headers["elevenlabs-conversation-id"] || req.headers["x-elevenlabs-conversation-id"] || req.headers["xi-conversation-id"];
    const resolvedConversationId = stripUnresolvedElevenLabsVar(rawConversationId);
    if (digits.length < 6 || Array.isArray(template_variables) && template_variables.length > 0 || savedWhatsappVariables) {
      if (req.query.callId) {
        const callResult = await db.execute(sql10`
          SELECT c.phone_number, COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name, ct.email as contact_email, a.name as agent_name
          FROM calls c
          LEFT JOIN contacts ct ON c.contact_id = ct.id
          LEFT JOIN agents a ON c.agent_id = a.id
          WHERE c.id = ${req.query.callId} LIMIT 1
        `);
        const callRows = Array.isArray(callResult) ? callResult : callResult.rows || [];
        if (callRows.length > 0) {
          const row = callRows[0];
          if (row.phone_number) {
            recipientPhone = row.phone_number;
            digits = recipientPhone.replace(/[^0-9]/g, "");
            console.log(`\u{1F4AC} [Messaging Webhook] Resolved real customer phone from call record: ${recipientPhone}`);
          }
          contactData = {
            contact_name: row.contact_name || "",
            contact_phone: row.phone_number || recipientPhone,
            contact_email: row.contact_email || "",
            agent_name: row.agent_name || "",
            system__caller_id: recipientPhone
          };
        }
      }
    }
    if ((!recipientPhone || recipientPhone.replace(/[^0-9]/g, "").length < 6) && resolvedConversationId) {
      console.log(`\u{1F4AC} [Messaging Webhook] Attempting conversationId fallback for: ${resolvedConversationId}`);
      const convResult = await db.execute(sql10`
          SELECT c.phone_number, c.from_number, COALESCE(ct.first_name || ' ' || ct.last_name, ct.first_name, '') as contact_name, ct.email as contact_email, a.name as agent_name
          FROM calls c
          LEFT JOIN contacts ct ON c.contact_id = ct.id
          LEFT JOIN agents a ON c.agent_id = a.id
          WHERE c.elevenlabs_conversation_id = ${resolvedConversationId}
          AND c.user_id = ${userId}
          ORDER BY c.created_at DESC LIMIT 1
        `);
      const convRows = Array.isArray(convResult) ? convResult : convResult.rows || [];
      if (convRows.length > 0) {
        const row = convRows[0];
        const resolvedPhone = row.phone_number || row.from_number || "";
        if (resolvedPhone) {
          recipientPhone = resolvedPhone;
          digits = recipientPhone.replace(/[^0-9]/g, "");
          console.log(`\u{1F4AC} [Messaging Webhook] Resolved real customer phone from calls table: ${recipientPhone}`);
        }
        contactData = {
          contact_name: row.contact_name || "",
          contact_phone: resolvedPhone || recipientPhone,
          contact_email: row.contact_email || "",
          agent_name: row.agent_name || "",
          system__caller_id: recipientPhone
        };
      }
    }
    let sipCallId = "";
    let resolvedSipConversationId = "";
    if ((!recipientPhone || recipientPhone.replace(/[^0-9]/g, "").length < 6) && resolvedConversationId) {
      console.log(`\u{1F4AC} [Messaging Webhook] Attempting sip_calls fallback for conversationId: ${resolvedConversationId}`);
      const sipLookup = await lookupSipCallByConversationId(resolvedConversationId, userId);
      if (sipLookup && sipLookup.phone) {
        recipientPhone = sipLookup.phone;
        digits = recipientPhone.replace(/[^0-9]/g, "");
        contactData = sipLookup.contactData;
        sipCallId = sipLookup.sipCallId;
        resolvedSipConversationId = sipLookup.conversationId;
        console.log(`\u{1F4AC} [Messaging Webhook] Resolved phone from sip_calls (by convId): ${recipientPhone}`);
      }
    }
    if (!recipientPhone || recipientPhone.replace(/[^0-9]/g, "").length < 6) {
      console.log(`\u{1F4AC} [Messaging Webhook] Attempting agent-based lookup for agent: ${elevenLabsAgentId}`);
      const anyLookup = await lookupAnyCallByAgentId(elevenLabsAgentId, userId);
      if (anyLookup && anyLookup.phone) {
        recipientPhone = anyLookup.phone;
        digits = recipientPhone.replace(/[^0-9]/g, "");
        contactData = anyLookup.contactData;
        sipCallId = anyLookup.callId || anyLookup.sipCallId;
        resolvedSipConversationId = anyLookup.conversationId;
        console.log(`\u{1F4AC} [Messaging Webhook] Resolved phone from agent-based lookup: ${recipientPhone}`);
      }
    }
    if (digits.length >= 6 && Object.keys(contactData).length === 0) {
      try {
        console.log(`\u{1F4AC} [Messaging Webhook] Direct contact lookup for ${recipientPhone}...`);
        const { lookupContactByPhone: lookupContactByPhone2 } = await Promise.resolve().then(() => (init_post_call_messaging(), post_call_messaging_exports));
        const contactInfo = await lookupContactByPhone2(recipientPhone, userId);
        if (contactInfo && Object.keys(contactInfo).length > 0) {
          contactData = {
            contact_name: contactInfo.contact_name || "",
            contact_phone: recipientPhone,
            contact_email: contactInfo.contact_email || "",
            agent_name: agentRows[0].name || "",
            system__caller_id: recipientPhone,
            ...contactInfo
          };
          console.log(`\u{1F4AC} [Messaging Webhook] Found contact by phone: ${contactData.contact_name}`);
        }
      } catch (err) {
        console.warn(`\u{1F4AC} [Messaging Webhook] Direct contact lookup failed: ${err.message}`);
      }
    }
    if (!recipientPhone || recipientPhone.replace(/[^0-9]/g, "").length < 6) {
      return res.json({
        success: false,
        message: "Could not determine the recipient phone number."
      });
    }
    if (sipCallId || resolvedSipConversationId) {
      const apptData = await lookupAppointmentData2(sipCallId, resolvedSipConversationId, userId);
      if (Object.keys(apptData).length > 0) {
        contactData = { ...contactData, ...apptData };
        console.log(`\u{1F4AC} [Messaging Webhook] Enriched contactData with appointment fields: ${Object.keys(apptData).join(", ")}`);
      }
    }
    console.log(`\u{1F4AC} [Messaging Webhook] Final Resolved Contact Data: ${JSON.stringify(contactData)}`);
    let components = [];
    const buttonOverrides = {};
    if (Array.isArray(template_variables) && template_variables.length > 0) {
      const bodyVars = template_variables.filter((tv) => tv.componentType !== "button");
      const buttonVars = template_variables.filter((tv) => tv.componentType === "button");
      if (bodyVars.length > 0) {
        const sorted = [...bodyVars].sort((a, b) => a.position - b.position);
        const parameters = sorted.map((tv) => {
          let val = stripUnresolvedElevenLabsVar(tv.value || "");
          if (tv.source && tv.source !== "custom" && contactData[tv.source]) {
            val = contactData[tv.source];
          } else if (!val || val.trim() === "") {
            const varMatch = (tv.value || "").match(/^\{\{(\w+)\}\}$/);
            if (varMatch && contactData[varMatch[1]]) {
              val = contactData[varMatch[1]];
            }
          } else {
            const varMatch = val.match(/^\{\{(\w+)\}\}$/);
            if (varMatch && contactData[varMatch[1]]) {
              val = contactData[varMatch[1]];
            }
          }
          return { type: "text", text: val || " " };
        });
        components = [{ type: "body", parameters }];
        console.log(`[Messaging Webhook] Built ${parameters.length} body template variable(s)`);
      }
      for (const tv of buttonVars) {
        const btnIdx = typeof tv.position === "number" ? tv.position : parseInt(tv.position || "0");
        let val = stripUnresolvedElevenLabsVar(tv.value || "");
        if (tv.source && tv.source !== "custom" && contactData[tv.source]) {
          val = contactData[tv.source];
        } else if (!val || val.trim() === "") {
          const varMatch = (tv.value || "").match(/^\{\{(\w+)\}\}$/);
          if (varMatch && contactData[varMatch[1]]) {
            val = contactData[varMatch[1]];
          }
        } else {
          const varMatch = val.match(/^\{\{(\w+)\}\}$/);
          if (varMatch && contactData[varMatch[1]]) {
            val = contactData[varMatch[1]];
          }
        }
        if (val) buttonOverrides[btnIdx] = val;
      }
      if (Object.keys(buttonOverrides).length > 0) {
        console.log(`[Messaging Webhook] Found ${Object.keys(buttonOverrides).length} button variable override(s) from request`);
      }
    }
    if (savedWhatsappVariables) {
      try {
        const parsedVars = JSON.parse(savedWhatsappVariables);
        if (Object.keys(buttonOverrides).length === 0) {
          for (const [key, val] of Object.entries(parsedVars)) {
            if (val && typeof val === "object" && val.componentType === "button") {
              const btnIdx = key.startsWith("btn_") ? parseInt(key.replace("btn_", "")) : parseInt(key);
              if (!isNaN(btnIdx) && val.value) {
                let btnVal = val.value;
                if (contactData[btnVal]) {
                  btnVal = contactData[btnVal];
                } else {
                  const varMatch = btnVal.match(/^\{\{\s*(\w+)\s*\}\}$/);
                  if (varMatch && contactData[varMatch[1]]) {
                    btnVal = contactData[varMatch[1]];
                  } else {
                    btnVal = btnVal.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key2) => {
                      return contactData[key2] && contactData[key2].trim() !== "" ? contactData[key2] : "";
                    });
                  }
                }
                btnVal = stripUnresolvedElevenLabsVar(btnVal);
                if (btnVal) buttonOverrides[btnIdx] = btnVal;
              }
            }
          }
          if (Object.keys(buttonOverrides).length > 0) {
            console.log(`[Messaging Webhook] Found ${Object.keys(buttonOverrides).length} button variable override(s) from agent config`);
          }
        }
        if (components.length === 0) {
          const bodyVarEntries = [];
          for (const [key, val] of Object.entries(parsedVars)) {
            if (val && typeof val === "object" && !val.componentType && (val.mode === "fixed" || val.mode === "collect") && val.value) {
              const idx = parseInt(key);
              if (!isNaN(idx)) {
                bodyVarEntries.push([idx, val.value]);
              }
            }
          }
          if (bodyVarEntries.length > 0) {
            bodyVarEntries.sort((a, b) => a[0] - b[0]);
            const parameters = bodyVarEntries.map(([, value]) => {
              let resolved = value;
              if (contactData[value]) {
                resolved = contactData[value];
              } else {
                const varMatch = value.match(/^\{\{\s*(\w+)\s*\}\}$/);
                if (varMatch && contactData[varMatch[1]]) {
                  resolved = contactData[varMatch[1]];
                } else {
                  resolved = value.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
                    return contactData[key] && contactData[key].trim() !== "" ? contactData[key] : "";
                  });
                }
              }
              resolved = stripUnresolvedElevenLabsVar(resolved);
              return { type: "text", text: resolved || " " };
            });
            components = [{ type: "body", parameters }];
            console.log(`[Messaging Webhook] Built ${parameters.length} body variable(s) from agent config`);
          }
        }
      } catch (parseErr) {
        console.warn(`[Messaging Webhook] Failed to parse saved variables: ${parseErr.message}`);
      }
    }
    const metaSettings = await metaWhatsAppService.getSettings(userId);
    const whatswaySettings = await whatswayService.getSettings(userId);
    let headerVariable = incomingHeader || req.body.headerVariable || null;
    const buttonVariables = incomingButtons || req.body.buttonVariables || [];
    console.log(`\u{1F4AC} [Messaging Webhook] Initial Header Variable: ${JSON.stringify(headerVariable)}`);
    console.log(`\u{1F4AC} [Messaging Webhook] Initial Button Variables: ${JSON.stringify(buttonVariables)}`);
    if (!headerVariable && savedWhatsappVariables) {
      try {
        const parsedVars = JSON.parse(savedWhatsappVariables);
        for (const [, val] of Object.entries(parsedVars)) {
          if (val && typeof val === "object" && val.componentType === "header" && val.value) {
            headerVariable = { value: val.value, source: val.source };
            break;
          }
        }
      } catch (_) {
      }
    }
    let resolvedLanguage = language || "en_US";
    if (metaSettings?.isActive) {
      try {
        const templateDef = await metaWhatsAppService.getTemplateByName(userId, template_name);
        if (templateDef) {
          if (language === "en_US" || !language) {
            resolvedLanguage = templateDef.language || "en_US";
          } else {
            resolvedLanguage = language || templateDef.language || "en_US";
          }
        }
        if (templateDef && templateDef.components) {
          const bodyComp = templateDef.components.find((c) => c.type === "BODY");
          if (bodyComp && bodyComp.text) {
            const bodyVarMatches = bodyComp.text.match(/\{\{\d+\}\}/g) || [];
            const requiredCount = [...new Set(bodyVarMatches)].length;
            if (requiredCount > 0) {
              const existingBody = components.find((c) => c.type === "body");
              const existingParams = existingBody?.parameters || [];
              if (existingParams.length < requiredCount) {
                const fallbackOrder = ["contact_name", "contact_phone", "contact_email", "agent_name", "appointment_date", "appointment_time", "service_name", "duration", "notes", "appointment_status"];
                const availableValues = fallbackOrder.filter((k) => contactData[k] && contactData[k].trim() !== "").map((k) => contactData[k]);
                const parameters = [];
                for (let i = 0; i < requiredCount; i++) {
                  if (i < existingParams.length && existingParams[i]?.text && existingParams[i].text.trim() !== "") {
                    parameters.push(existingParams[i]);
                  } else {
                    const fallbackIdx = i - existingParams.length;
                    parameters.push({ type: "text", text: availableValues[fallbackIdx >= 0 ? fallbackIdx : i] || " " });
                  }
                }
                components = components.filter((c) => c.type !== "body");
                components.push({ type: "body", parameters });
                console.log(`[Messaging Webhook] Body variables: ${existingParams.length} provided + ${requiredCount - existingParams.length} auto-populated = ${requiredCount} total for template "${template_name}"`);
              }
            }
          }
          const headerComp = templateDef.components.find((c) => c.type === "HEADER");
          if (headerComp) {
            const headerFormat = (headerComp.format || "").toUpperCase();
            if (["IMAGE", "VIDEO", "DOCUMENT"].includes(headerFormat)) {
              let headerUrl = stripUnresolvedElevenLabsVar(headerVariable?.url || headerVariable?.value || "");
              if (headerUrl) {
                const varMatch = headerUrl.match(/^\{\{(\w+)\}\}$/);
                if (varMatch && contactData[varMatch[1]]) headerUrl = contactData[varMatch[1]];
              }
              if (headerUrl) {
                const mediaTypeLowercase = headerFormat.toLowerCase();
                const headerParam = {
                  type: mediaTypeLowercase
                };
                headerParam[mediaTypeLowercase] = {
                  link: headerUrl.trim()
                };
                const headerComponent = {
                  type: "header",
                  parameters: [headerParam]
                };
                components = [headerComponent, ...components.filter((c) => c.type !== "header")];
                console.log(`\u{1F4AC} [Messaging Webhook] Added Meta HEADER (${mediaTypeLowercase}) component: ${headerUrl}`);
              }
            } else if (headerFormat === "TEXT" && headerComp.text) {
              const headerVarMatches = headerComp.text.match(/\{\{\d+\}\}/g) || [];
              if (headerVarMatches.length > 0) {
                let headerVal = stripUnresolvedElevenLabsVar(headerVariable?.value || headerVariable?.text || "");
                if (!headerVal || headerVal.trim() === "") {
                  headerVal = contactData.contact_name || " ";
                } else {
                  const varMatch = headerVal.match(/^\{\{(\w+)\}\}$/);
                  if (varMatch && contactData[varMatch[1]]) headerVal = contactData[varMatch[1]];
                  if (headerVariable?.source && headerVariable.source !== "custom" && contactData[headerVariable.source]) {
                    headerVal = contactData[headerVariable.source];
                  }
                }
                components = [{ type: "header", parameters: [{ type: "text", text: headerVal }] }, ...components];
                console.log(`[Messaging Webhook] Added HEADER text variable: ${headerVal}`);
              }
            }
          }
          if (Array.isArray(buttonVariables) && buttonVariables.length > 0) {
            for (const bv of buttonVariables) {
              const idx = typeof bv.index === "number" ? bv.index : parseInt(bv.index || "0");
              let btnVal = stripUnresolvedElevenLabsVar(bv.value || "");
              if (btnVal) {
                const varMatch = btnVal.match(/^\{\{(\w+)\}\}$/);
                if (varMatch && contactData[varMatch[1]]) btnVal = contactData[varMatch[1]];
              }
              if (btnVal && !isNaN(idx)) {
                buttonOverrides[idx] = btnVal;
              }
            }
          }
          const buttonComponents = MetaWhatsAppService.buildButtonComponents(
            templateDef.components,
            Object.keys(buttonOverrides).length > 0 ? buttonOverrides : void 0
          );
          if (buttonComponents.length > 0) {
            components = [...components, ...buttonComponents];
            console.log(`[Messaging Webhook] Auto-added ${buttonComponents.length} button component(s) for template "${template_name}"`);
          }
        }
      } catch (tmplError) {
        console.warn(`[Messaging Webhook] Could not fetch template metadata: ${tmplError.message}`);
      }
    }
    console.log(`\u{1F4AC} [Messaging Webhook] Final send: to=${recipientPhone}, template=${template_name}, lang=${resolvedLanguage}, bodyVars=${components.length > 0 ? JSON.stringify(components[0]?.parameters?.map((p) => p.text)) : "[]"}, contactDataKeys=${Object.keys(contactData).join(",")}`);
    let sendResult;
    if (metaSettings?.isActive) {
      console.log(`[Messaging Webhook] Using Meta WhatsApp Cloud API for user ${userId}`);
      console.log(`\u{1F4AC} [Messaging Webhook] Final Constructed Components for Meta: ${JSON.stringify(components, null, 2)}`);
      sendResult = await metaWhatsAppService.sendTemplate(
        userId,
        recipientPhone,
        template_name,
        resolvedLanguage,
        components,
        { callId: req.query.callId, agentId: dbAgentId }
      );
    } else if (whatswaySettings?.isActive) {
      console.log(`[Messaging Webhook] Using WhatsWay for user ${userId}`);
      console.log(`\u{1F4AC} [Messaging Webhook] Final Constructed Components for WhatsWay: ${JSON.stringify(components, null, 2)}`);
      sendResult = await whatswayService.sendTemplate(
        userId,
        recipientPhone,
        template_name,
        resolvedLanguage,
        components,
        { callId: req.query.callId, agentId: dbAgentId }
      );
    } else {
      console.warn(`[Messaging Webhook] No WhatsApp provider configured for user ${userId}`);
      return res.json({
        success: false,
        message: "No WhatsApp provider configured. Please set up WhatsWay or Meta WhatsApp in your messaging settings."
      });
    }
    try {
      const conversation = await whatsAppConversationService.getOrCreateConversation(
        userId,
        recipientPhone
      );
      await whatsAppConversationService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "outbound",
        senderType: "agent",
        messageType: "template",
        content: `[Template: ${template_name}]`,
        templateName: template_name,
        metaMessageId: sendResult?.messageId || void 0,
        status: "sent",
        metadata: { agentId: dbAgentId, source: "webhook" }
      });
      console.log(`\u{1F4AC} [Messaging Webhook] Stored outgoing message in conversation ${conversation.id}`);
    } catch (convError) {
      console.warn(`\u{1F4AC} [Messaging Webhook] Failed to store in conversations: ${convError.message}`);
    }
    const elapsed = Date.now() - startTime;
    console.log(`[Messaging Webhook] WhatsApp completed in ${elapsed}ms - success: true`);
    return res.json({
      success: true,
      message: `WhatsApp message sent successfully to ${recipientPhone}`
    });
  } catch (error) {
    console.error(`\u{1F4AC} [Messaging Webhook] Error:`, error.message);
    return res.json({
      success: false,
      message: "Error processing WhatsApp webhook"
    });
  }
});
var webhook_messaging_routes_default = router3;

// plugins/messaging/routes/meta-webhook.routes.ts
import { Router as Router4 } from "express";
import crypto3 from "crypto";
init_meta_whatsapp_service();
var router4 = Router4();
function getConversationService() {
  return whatsAppConversationService;
}
function getAdminService() {
  return metaWhatsAppAdminService;
}
function getMetaService() {
  return metaWhatsAppService;
}
function verifySignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader || !appSecret) return false;
  try {
    const expectedSignature = "sha256=" + crypto3.createHmac("sha256", appSecret).update(rawBody).digest("hex");
    return crypto3.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}
function extractMessageContent(message) {
  const type = message.type || "unknown";
  let content = "";
  let messageType = type;
  let mediaUrl = null;
  let mediaMimeType = null;
  let metadata = {};
  switch (type) {
    case "text":
      content = message.text?.body || "";
      break;
    case "image":
      content = message.image?.caption || "[Image]";
      mediaUrl = message.image?.id || null;
      mediaMimeType = message.image?.mime_type || "image/jpeg";
      metadata = { mediaId: message.image?.id, sha256: message.image?.sha256 };
      break;
    case "video":
      content = message.video?.caption || "[Video]";
      mediaUrl = message.video?.id || null;
      mediaMimeType = message.video?.mime_type || "video/mp4";
      metadata = { mediaId: message.video?.id };
      break;
    case "audio":
      content = "[Audio]";
      mediaUrl = message.audio?.id || null;
      mediaMimeType = message.audio?.mime_type || "audio/ogg";
      metadata = { mediaId: message.audio?.id };
      break;
    case "document":
      content = message.document?.filename || "[Document]";
      mediaUrl = message.document?.id || null;
      mediaMimeType = message.document?.mime_type || "application/octet-stream";
      metadata = { mediaId: message.document?.id, filename: message.document?.filename };
      break;
    case "sticker":
      content = "[Sticker]";
      mediaUrl = message.sticker?.id || null;
      mediaMimeType = message.sticker?.mime_type || "image/webp";
      metadata = { mediaId: message.sticker?.id };
      break;
    case "reaction":
      content = message.reaction?.emoji || "";
      messageType = "reaction";
      metadata = { reactedMessageId: message.reaction?.message_id };
      break;
    case "button":
      content = message.button?.text || "";
      messageType = "button";
      metadata = { payload: message.button?.payload };
      break;
    case "interactive":
      if (message.interactive?.type === "button_reply") {
        content = message.interactive.button_reply?.title || "";
        metadata = { buttonId: message.interactive.button_reply?.id };
      } else if (message.interactive?.type === "list_reply") {
        content = message.interactive.list_reply?.title || "";
        metadata = { listId: message.interactive.list_reply?.id, description: message.interactive.list_reply?.description };
      } else {
        content = "[Interactive]";
      }
      break;
    case "location":
      content = `[Location: ${message.location?.latitude}, ${message.location?.longitude}]`;
      metadata = { latitude: message.location?.latitude, longitude: message.location?.longitude, name: message.location?.name, address: message.location?.address };
      break;
    case "contacts":
      const firstContact = message.contacts?.[0];
      content = firstContact?.name?.formatted_name || "[Contact]";
      metadata = { contacts: message.contacts };
      messageType = "contacts";
      break;
    default:
      content = `[${type}]`;
      messageType = "unknown";
  }
  return { content, messageType, mediaUrl, mediaMimeType, metadata };
}
router4.get("/webhook", async (req, res) => {
  try {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    console.log(`[Meta Webhook] Verification request: mode=${mode}, token=${token ? token.substring(0, 8) + "..." : "(empty)"}, challenge=${challenge ? "present" : "missing"}`);
    if (mode !== "subscribe") {
      console.log("[Meta Webhook] Verification failed: mode is not subscribe");
      return res.status(403).send("Forbidden");
    }
    const admin = getAdminService();
    const config = await admin.getConfig();
    const storedToken = config?.webhookVerifyToken || "";
    console.log(`[Meta Webhook] Stored token: ${storedToken ? storedToken.substring(0, 8) + "..." : "(empty)"}, Received token: ${token ? token.substring(0, 8) + "..." : "(empty)"}`);
    if (!storedToken || token !== storedToken) {
      console.log("[Meta Webhook] Verification failed: token mismatch");
      return res.status(403).send("Forbidden");
    }
    console.log("[Meta Webhook] Verification successful \u2014 returning challenge");
    return res.status(200).send(challenge);
  } catch (error) {
    console.error("[Meta Webhook] Verification error:", error.message);
    return res.status(403).send("Forbidden");
  }
});
router4.post("/webhook", async (req, res) => {
  try {
    const signatureHeader = req.headers["x-hub-signature-256"];
    const admin = getAdminService();
    const config = await admin.getConfig();
    const appSecret = config?.metaAppSecret || "";
    if (appSecret) {
      if (!signatureHeader) {
        console.warn("[Meta Webhook] Missing X-Hub-Signature-256 header \u2014 rejecting");
        return res.status(401).send("Unauthorized");
      }
      const rawBody = req.rawBody;
      if (!rawBody) {
        console.warn("[Meta Webhook] rawBody not captured \u2014 rejecting (ensure raw body middleware is active)");
        return res.status(500).send("Server configuration error");
      }
      if (!verifySignature(Buffer.from(rawBody), signatureHeader, appSecret)) {
        console.warn("[Meta Webhook] Invalid HMAC signature \u2014 rejecting");
        return res.status(403).send("Forbidden");
      }
    }
    const body = req.body;
    if (body?.object !== "whatsapp_business_account") {
      return res.status(200).send("OK");
    }
    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const value = change.value;
        if (!value) continue;
        if (value.messages && Array.isArray(value.messages)) {
          await processInboundMessages(value);
        }
        if (value.statuses && Array.isArray(value.statuses)) {
          await processStatusUpdates(value.statuses);
        }
      }
    }
  } catch (error) {
    console.error("[Meta Webhook] Error processing webhook:", error.message);
  }
  return res.status(200).send("OK");
});
async function processInboundMessages(value) {
  const phoneNumberId = value.metadata?.phone_number_id;
  if (!phoneNumberId) {
    console.warn("[Meta Webhook] No phone_number_id in metadata");
    return;
  }
  const convService = getConversationService();
  const meta = getMetaService();
  let userId = await convService.findUserByPhoneNumberId(phoneNumberId);
  if (!userId) {
    const wabaId = value.metadata?.waba_id;
    if (wabaId) {
      const wabaMatch = await convService.findUserByWabaId(wabaId);
      if (wabaMatch) {
        console.log(`[Meta Webhook] phone_number_id mismatch detected. Auto-healing via WABA lookup`);
        await convService.updatePhoneNumberId(wabaMatch.userId, phoneNumberId);
        userId = wabaMatch.userId;
      }
    }
    if (!userId) {
      console.warn(`[Meta Webhook] No user found for incoming phone_number_id`);
      return;
    }
  }
  const contactName = value.contacts?.[0]?.profile?.name || "";
  const contactWaId = value.contacts?.[0]?.wa_id || "";
  for (const message of value.messages) {
    try {
      const isDuplicate = await convService.isDuplicateMessage(message.id);
      if (isDuplicate) {
        console.log(`[Meta Webhook] Skipping duplicate message: ${message.id}`);
        continue;
      }
      const conversation = await convService.getOrCreateConversation(
        userId,
        message.from,
        contactName,
        contactWaId
      );
      await convService.refreshWindow(conversation.id);
      const { content, messageType, mediaUrl, mediaMimeType, metadata } = extractMessageContent(message);
      await convService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: "inbound",
        senderType: "customer",
        messageType,
        content,
        metaMessageId: message.id,
        mediaUrl,
        mediaMimeType,
        metadata
      });
      meta.markMessageRead(userId, message.id).catch(() => {
      });
      console.log(`[Meta Webhook] Inbound message from ${message.from} stored (${message.id})`);
    } catch (error) {
      console.error(`[Meta Webhook] Error processing message ${message.id}:`, error.message);
    }
  }
}
async function processStatusUpdates(statuses) {
  const convService = getConversationService();
  for (const status of statuses) {
    try {
      const errorMessage = status.errors?.[0]?.message || null;
      await convService.updateMessageStatus(status.id, status.status, errorMessage);
    } catch (error) {
      console.error(`[Meta Webhook] Error processing status update for ${status.id}:`, error.message);
    }
  }
}
var meta_webhook_routes_default = router4;

// plugins/messaging/index.ts
init_email_template_service();
init_whatsway_service();
init_meta_whatsapp_service();
init_messaging_log_service();
var PLUGIN_VERSION = "1.0.3";
var PLUGIN_NAME = "messaging";
function createUserMessagingRouter() {
  const router5 = Router5();
  router5.use("/", user_messaging_routes_default);
  return router5;
}
function createAdminMessagingRouter() {
  const router5 = Router5();
  router5.use("/", admin_messaging_routes_default);
  return router5;
}
function createWebhookMessagingRouter() {
  const router5 = Router5();
  router5.use("/", webhook_messaging_routes_default);
  router5.use("/meta", meta_webhook_routes_default);
  return router5;
}
function registerMessagingRoutes(app, options) {
  const { sessionAuthMiddleware, adminAuthMiddleware } = options;
  app.use("/api/messaging", sessionAuthMiddleware, createUserMessagingRouter());
  app.use("/api/admin/messaging", adminAuthMiddleware, createAdminMessagingRouter());
  app.use("/api/webhooks/messaging", createWebhookMessagingRouter());
  console.log("[Messaging] Plugin registered (v1.0.3)");
  console.log("[Messaging] Endpoints:");
  console.log("  - /api/messaging/email-templates (user auth)");
  console.log("  - /api/messaging/whatsway/* (user auth)");
  console.log("  - /api/messaging/meta-whatsapp/* (user auth)");
  console.log("  - /api/messaging/conversations (user auth)");
  console.log("  - /api/messaging/logs (user auth)");
  console.log("  - /api/admin/messaging/* (admin auth)");
  console.log("  - /api/admin/messaging/whatsapp-config (admin auth)");
  console.log("  - /api/webhooks/messaging/send-email (webhook)");
  console.log("  - /api/webhooks/messaging/send-whatsapp (webhook)");
  console.log("  - /api/webhooks/messaging/meta/webhook (Meta webhook)");
  console.log("[Messaging] Plugin initialized");
}
var index_default = {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerMessagingRoutes
};
export {
  EmailTemplateService,
  MessagingLogService,
  MetaWhatsAppAdminService,
  MetaWhatsAppService,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  WhatsAppConversationService,
  WhatswayService,
  createAdminMessagingRouter,
  createUserMessagingRouter,
  createWebhookMessagingRouter,
  index_default as default,
  emailTemplateService,
  messagingLogService,
  metaWhatsAppAdminService,
  metaWhatsAppService,
  registerMessagingRoutes,
  whatsAppConversationService,
  whatswayService
};
