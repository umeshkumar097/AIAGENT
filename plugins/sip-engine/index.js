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
var db_exports = {};
__export(db_exports, {
  db: () => db,
  defaultDb: () => defaultDb,
  defaultPool: () => defaultPool,
  pool: () => pool
});
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

// plugins/sip-engine/types.ts
var types_exports = {};
__export(types_exports, {
  SIP_PROVIDER_INFO: () => SIP_PROVIDER_INFO,
  VALID_COUNTRY_CODES: () => VALID_COUNTRY_CODES
});
var SIP_PROVIDER_INFO, VALID_COUNTRY_CODES;
var init_types = __esm({
  "plugins/sip-engine/types.ts"() {
    "use strict";
    SIP_PROVIDER_INFO = {
      twilio: { name: "Twilio", defaultHost: "", defaultPort: 5061, transport: "tls", hostPattern: /\.pstn\.twilio\.com$/i, hostExample: "yourtrunk.pstn.twilio.com" },
      plivo: { name: "Plivo", defaultHost: "", defaultPort: 5060, transport: "tcp", hostPattern: /\.(sip|voice)\.plivo\.com$/i, hostExample: "yourtrunk.sip.plivo.com" },
      telnyx: { name: "Telnyx", defaultHost: "sip.telnyx.com", defaultPort: 5061, transport: "tls", hostPattern: /\.telnyx\.com$/i, hostExample: "sip.telnyx.com" },
      vonage: { name: "Vonage", defaultHost: "", defaultPort: 5060, transport: "tcp", hostPattern: /\.(sip|voice)\.vonage\.com$/i, hostExample: "yourtrunk.sip.vonage.com" },
      exotel: { name: "Exotel", defaultHost: "sip.exotel.com", defaultPort: 5060, transport: "tcp", hostPattern: /\.exotel\.com$/i, hostExample: "sip.exotel.com" },
      bandwidth: { name: "Bandwidth", defaultHost: "", defaultPort: 5060, transport: "tcp", hostPattern: /\.(sip|voice)\.bandwidth\.com$/i, hostExample: "yourtrunk.sip.bandwidth.com" },
      didww: { name: "DIDWW", defaultHost: "sip.didww.com", defaultPort: 5060, transport: "tcp", hostPattern: /\.didww\.com$/i, hostExample: "sip.didww.com" },
      zadarma: { name: "Zadarma", defaultHost: "pbx.zadarma.com", defaultPort: 5060, transport: "tcp", hostPattern: /\.zadarma\.com$/i, hostExample: "pbx.zadarma.com" },
      cloudonix: { name: "Cloudonix", defaultHost: "sip.cloudonix.io", defaultPort: 5060, transport: "tcp", hostPattern: /\.cloudonix\.io$/i, hostExample: "sip.cloudonix.io" },
      ringcentral: { name: "RingCentral", defaultHost: "", defaultPort: 5060, transport: "tcp", hostPattern: /\.(sip|pstn)\.ringcentral\.com$/i, hostExample: "yourtrunk.sip.ringcentral.com" },
      sinch: { name: "Sinch", defaultHost: "", defaultPort: 5060, transport: "tcp", hostPattern: /\.(sip|voice)\.sinch\.com$/i, hostExample: "yourtrunk.sip.sinch.com" },
      infobip: { name: "Infobip", defaultHost: "sip.infobip.com", defaultPort: 5060, transport: "tcp", hostPattern: /\.infobip\.com$/i, hostExample: "sip.infobip.com" },
      generic: { name: "Generic SIP", defaultHost: "", defaultPort: 5060, transport: "tcp" }
    };
    VALID_COUNTRY_CODES = [
      "1",
      "7",
      "20",
      "27",
      "30",
      "31",
      "32",
      "33",
      "34",
      "36",
      "39",
      "40",
      "41",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "81",
      "82",
      "84",
      "86",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "98",
      "211",
      "212",
      "213",
      "216",
      "218",
      "220",
      "221",
      "222",
      "223",
      "224",
      "225",
      "226",
      "227",
      "228",
      "229",
      "230",
      "231",
      "232",
      "233",
      "234",
      "235",
      "236",
      "237",
      "238",
      "239",
      "240",
      "241",
      "242",
      "243",
      "244",
      "245",
      "246",
      "247",
      "248",
      "249",
      "250",
      "251",
      "252",
      "253",
      "254",
      "255",
      "256",
      "257",
      "258",
      "260",
      "261",
      "262",
      "263",
      "264",
      "265",
      "266",
      "267",
      "268",
      "269",
      "290",
      "291",
      "297",
      "298",
      "299",
      "350",
      "351",
      "352",
      "353",
      "354",
      "355",
      "356",
      "357",
      "358",
      "359",
      "370",
      "371",
      "372",
      "373",
      "374",
      "375",
      "376",
      "377",
      "378",
      "380",
      "381",
      "382",
      "383",
      "385",
      "386",
      "387",
      "389",
      "420",
      "421",
      "423",
      "500",
      "501",
      "502",
      "503",
      "504",
      "505",
      "506",
      "507",
      "508",
      "509",
      "590",
      "591",
      "592",
      "593",
      "594",
      "595",
      "596",
      "597",
      "598",
      "599",
      "670",
      "672",
      "673",
      "674",
      "675",
      "676",
      "677",
      "678",
      "679",
      "680",
      "681",
      "682",
      "683",
      "685",
      "686",
      "687",
      "688",
      "689",
      "690",
      "691",
      "692",
      "850",
      "852",
      "853",
      "855",
      "856",
      "880",
      "886",
      "960",
      "961",
      "962",
      "963",
      "964",
      "965",
      "966",
      "967",
      "968",
      "970",
      "971",
      "972",
      "973",
      "974",
      "975",
      "976",
      "977",
      "992",
      "993",
      "994",
      "995",
      "996",
      "998"
    ];
  }
});

// plugins/sip-engine/service-registry.ts
var service_registry_exports = {};
__export(service_registry_exports, {
  getSipServices: () => getSipServices,
  setSipServices: () => setSipServices
});
function setSipServices(services) {
  _services = services;
}
function getSipServices() {
  if (!_services) {
    throw new Error("[SIP Engine Plugin] Services not initialized. Ensure services are injected at plugin registration.");
  }
  return _services;
}
var _services;
var init_service_registry = __esm({
  "plugins/sip-engine/service-registry.ts"() {
    "use strict";
    _services = null;
  }
});

// plugins/sip-engine/index.ts
import { Router as Router5 } from "express";

// plugins/sip-engine/routes/user-trunks.routes.ts
import { Router } from "express";

// plugins/sip-engine/services/sip-trunk.service.ts
init_db();
init_types();
import { sql as sql2 } from "drizzle-orm";
var SIP_MOCK_MODE = process.env.SIP_MOCK_MODE === "true";
var COMPOUND_WORD_FIXES = [
  // Fix "Elevenlabs" (after underscore conversion) -> "ElevenLabs"
  [/Elevenlabs/g, "ElevenLabs"],
  // Fix "elevenlabs" at start of string -> "elevenLabs" (keep first char case)
  [/^elevenlabs/g, "elevenLabs"],
  // Fix "Openai" (after underscore conversion) -> "OpenAI"
  [/Openai/g, "OpenAI"],
  // Fix "openai" at start of string -> "openAI"
  [/^openai/g, "openAI"]
];
function snakeToCamel(str) {
  let result = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  for (const [pattern, replacement] of COMPOUND_WORD_FIXES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
function transformRow(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel(key)] = row[key];
  }
  return transformed;
}
function transformRows(rows) {
  return rows.map((row) => transformRow(row));
}
var SipTrunkService = class {
  static async getUserTrunks(userId) {
    const result = await db.execute(sql2`
      SELECT * FROM sip_trunks 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `);
    return transformRows(result.rows);
  }
  static async getTrunkById(id, userId) {
    const result = await db.execute(sql2`
      SELECT * FROM sip_trunks 
      WHERE id = ${id} AND user_id = ${userId}
      LIMIT 1
    `);
    return result.rows[0] ? transformRow(result.rows[0]) : null;
  }
  static async checkSipAccess(userId, engine) {
    const userResult = await db.execute(sql2`
      SELECT u.*, p.sip_enabled, p.max_concurrent_sip_calls, p.sip_engines_allowed
      FROM users u
      LEFT JOIN plans p ON u.plan_type = p.name
      WHERE u.id = ${userId}
      LIMIT 1
    `);
    const user = userResult.rows[0];
    if (!user) {
      return { allowed: false, reason: "User not found" };
    }
    if (!user.sip_enabled) {
      return { allowed: false, reason: "SIP is not enabled for your plan" };
    }
    const allowedEngines = user.sip_engines_allowed || ["elevenlabs-sip"];
    if (!allowedEngines.includes(engine)) {
      return { allowed: false, reason: `Engine ${engine} is not available for your plan` };
    }
    return { allowed: true };
  }
  static async createTrunk(userId, data) {
    const providerInfo = SIP_PROVIDER_INFO[data.provider] || SIP_PROVIDER_INFO.generic;
    const sipHost = data.sipHost || providerInfo.defaultHost;
    const sipPort = data.sipPort || providerInfo.defaultPort;
    const transport = data.transport || providerInfo.transport;
    const inboundTransport = data.inboundTransport || (data.provider === "twilio" ? "tcp" : transport);
    const inboundPort = data.inboundPort || (data.provider === "twilio" ? 5060 : sipPort);
    const result = await db.execute(sql2`
      INSERT INTO sip_trunks (
        user_id, name, engine, provider, sip_host, sip_port, transport, 
        inbound_transport, inbound_port, media_encryption, username, password
      )
      VALUES (
        ${userId}, ${data.name}, ${data.engine}, ${data.provider},
        ${sipHost}, ${sipPort}, ${transport},
        ${inboundTransport}, ${inboundPort},
        ${data.mediaEncryption || "disable"}, ${data.username || null}, ${data.password || null}
      )
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async updateTrunk(id, userId, updates) {
    const setParts = [];
    if (updates.name !== void 0) {
      setParts.push(sql2`name = ${updates.name}`);
    }
    if (updates.sipHost !== void 0) {
      setParts.push(sql2`sip_host = ${updates.sipHost}`);
    }
    if (updates.sipPort !== void 0) {
      setParts.push(sql2`sip_port = ${updates.sipPort}`);
    }
    if (updates.transport !== void 0) {
      setParts.push(sql2`transport = ${updates.transport}`);
    }
    if (updates.inboundTransport !== void 0) {
      setParts.push(sql2`inbound_transport = ${updates.inboundTransport}`);
    }
    if (updates.inboundPort !== void 0) {
      setParts.push(sql2`inbound_port = ${updates.inboundPort}`);
    }
    if (updates.mediaEncryption !== void 0) {
      setParts.push(sql2`media_encryption = ${updates.mediaEncryption}`);
    }
    if (updates.username !== void 0) {
      setParts.push(sql2`username = ${updates.username}`);
    }
    if (updates.password !== void 0) {
      setParts.push(sql2`password = ${updates.password}`);
    }
    if (updates.isActive !== void 0) {
      setParts.push(sql2`is_active = ${updates.isActive}`);
    }
    setParts.push(sql2`updated_at = NOW()`);
    const setClause = sql2.join(setParts, sql2`, `);
    const result = await db.execute(sql2`
      UPDATE sip_trunks SET ${setClause}
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async deleteTrunk(id, userId) {
    await db.transaction(async (tx) => {
      const trunkResult = await tx.execute(sql2`
        SELECT id FROM sip_trunks WHERE id = ${id} AND user_id = ${userId} FOR UPDATE
      `);
      if (trunkResult.rows.length === 0) {
        throw new Error("SIP trunk not found or access denied");
      }
      await tx.execute(sql2`
        UPDATE sip_calls SET sip_phone_number_id = NULL
        WHERE sip_phone_number_id IN (
          SELECT id FROM sip_phone_numbers WHERE sip_trunk_id = ${id} AND user_id = ${userId}
        )
      `);
      await tx.execute(sql2`
        UPDATE sip_calls SET sip_trunk_id = NULL
        WHERE sip_trunk_id = ${id}
      `);
      await tx.execute(sql2`
        UPDATE agents SET sip_phone_number_id = NULL
        WHERE sip_phone_number_id IN (
          SELECT id FROM sip_phone_numbers WHERE sip_trunk_id = ${id} AND user_id = ${userId}
        )
      `);
      await tx.execute(sql2`
        DELETE FROM sip_phone_numbers WHERE sip_trunk_id = ${id} AND user_id = ${userId}
      `);
      await tx.execute(sql2`
        DELETE FROM sip_trunks WHERE id = ${id} AND user_id = ${userId}
      `);
    });
  }
  static async testTrunkConnection(id) {
    if (SIP_MOCK_MODE) {
      return { success: true, message: "Mock mode: Connection simulated", latency: 50 };
    }
    const result = await db.execute(sql2`SELECT * FROM sip_trunks WHERE id = ${id} LIMIT 1`);
    if (result.rows.length === 0) {
      return { success: false, message: "Trunk not found" };
    }
    const trunk = transformRow(result.rows[0]);
    const host = trunk.sipHost;
    const port = trunk.sipPort || 5060;
    const transport = (trunk.transport || "udp").toLowerCase();
    const startTime = Date.now();
    try {
      if (transport === "udp") {
        const dns = await import("dns");
        await new Promise((resolve, reject) => {
          dns.lookup(host, (err) => {
            if (err) reject(new Error(`DNS resolution failed for ${host}: ${err.message}`));
            else resolve();
          });
        });
      } else {
        const net = await import("net");
        await new Promise((resolve, reject) => {
          const socket = new net.Socket();
          const timeout = 5e3;
          socket.setTimeout(timeout);
          socket.connect(port, host, () => {
            socket.destroy();
            resolve();
          });
          socket.on("timeout", () => {
            socket.destroy();
            reject(new Error(`Connection timed out after ${timeout}ms`));
          });
          socket.on("error", (err) => {
            socket.destroy();
            reject(new Error(`TCP connection failed to ${host}:${port}: ${err.message}`));
          });
        });
      }
      const latency = Date.now() - startTime;
      await db.execute(sql2`
        UPDATE sip_trunks 
        SET health_status = 'healthy', last_health_check = NOW()
        WHERE id = ${id}
      `);
      return { success: true, message: "Connection successful", latency };
    } catch (err) {
      const latency = Date.now() - startTime;
      await db.execute(sql2`
        UPDATE sip_trunks 
        SET health_status = 'unhealthy', last_health_check = NOW()
        WHERE id = ${id}
      `);
      return { success: false, message: err.message || "Connection failed", latency };
    }
  }
  static async getUserPhoneNumbers(userId) {
    const result = await db.execute(sql2`
      SELECT spn.*, st.name as trunk_name
      FROM sip_phone_numbers spn
      JOIN sip_trunks st ON spn.sip_trunk_id = st.id
      WHERE spn.user_id = ${userId}
      ORDER BY spn.created_at DESC
    `);
    return transformRows(result.rows);
  }
  static async getPhoneNumberById(id, userId) {
    const result = await db.execute(sql2`
      SELECT * FROM sip_phone_numbers 
      WHERE id = ${id} AND user_id = ${userId}
      LIMIT 1
    `);
    return result.rows[0] ? transformRow(result.rows[0]) : null;
  }
  static async importPhoneNumber(userId, trunk, data) {
    const result = await db.execute(sql2`
      INSERT INTO sip_phone_numbers (
        user_id, sip_trunk_id, phone_number, label, engine,
        agent_id, custom_headers
      )
      VALUES (
        ${userId}, ${trunk.id}, ${data.phoneNumber}, ${data.label || null},
        ${trunk.engine}, ${data.agentId || null}, ${JSON.stringify(data.customHeaders || {})}
      )
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async updatePhoneNumber(id, userId, updates) {
    const result = await db.execute(sql2`
      UPDATE sip_phone_numbers 
      SET 
        label = COALESCE(${updates.label}, label),
        inbound_enabled = COALESCE(${updates.inboundEnabled}, inbound_enabled),
        outbound_enabled = COALESCE(${updates.outboundEnabled}, outbound_enabled),
        is_active = COALESCE(${updates.isActive}, is_active),
        updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async assignAgentToPhoneNumber(id, userId, agentId) {
    const result = await db.execute(sql2`
      UPDATE sip_phone_numbers 
      SET agent_id = ${agentId}, updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async deletePhoneNumber(id, userId) {
    await db.transaction(async (tx) => {
      const phoneResult = await tx.execute(sql2`
        SELECT id FROM sip_phone_numbers WHERE id = ${id} AND user_id = ${userId} FOR UPDATE
      `);
      if (phoneResult.rows.length === 0) {
        throw new Error("SIP phone number not found or access denied");
      }
      await tx.execute(sql2`
        UPDATE sip_calls SET sip_phone_number_id = NULL WHERE sip_phone_number_id = ${id}
      `);
      await tx.execute(sql2`
        UPDATE agents SET sip_phone_number_id = NULL WHERE sip_phone_number_id = ${id}
      `);
      await tx.execute(sql2`
        UPDATE campaigns SET sip_phone_number_id = NULL WHERE sip_phone_number_id = ${id}
      `);
      await tx.execute(sql2`
        DELETE FROM sip_phone_numbers WHERE id = ${id} AND user_id = ${userId}
      `);
    });
  }
  static async getAllTrunks(filters) {
    let query = sql2`SELECT st.*, u.name as user_name, u.email as user_email 
                    FROM sip_trunks st 
                    JOIN users u ON st.user_id = u.id 
                    WHERE 1=1`;
    if (filters?.userId) {
      query = sql2`${query} AND st.user_id = ${filters.userId}`;
    }
    if (filters?.engine) {
      query = sql2`${query} AND st.engine = ${filters.engine}`;
    }
    if (filters?.isActive !== void 0) {
      query = sql2`${query} AND st.is_active = ${filters.isActive}`;
    }
    query = sql2`${query} ORDER BY st.created_at DESC`;
    const result = await db.execute(query);
    return transformRows(result.rows);
  }
  static async getAllPhoneNumbers(filters) {
    let query = sql2`SELECT spn.*, u.name as user_name, st.name as trunk_name
                    FROM sip_phone_numbers spn
                    JOIN users u ON spn.user_id = u.id
                    JOIN sip_trunks st ON spn.sip_trunk_id = st.id
                    WHERE 1=1`;
    if (filters?.userId) {
      query = sql2`${query} AND spn.user_id = ${filters.userId}`;
    }
    if (filters?.engine) {
      query = sql2`${query} AND spn.engine = ${filters.engine}`;
    }
    query = sql2`${query} ORDER BY spn.created_at DESC`;
    const result = await db.execute(query);
    return transformRows(result.rows);
  }
  static async getSipCalls(filters) {
    let query = sql2`SELECT * FROM sip_calls WHERE 1=1`;
    let countQuery = sql2`SELECT COUNT(*) as total FROM sip_calls WHERE 1=1`;
    if (filters.userId) {
      query = sql2`${query} AND user_id = ${filters.userId}`;
      countQuery = sql2`${countQuery} AND user_id = ${filters.userId}`;
    }
    if (filters.engine) {
      query = sql2`${query} AND engine = ${filters.engine}`;
      countQuery = sql2`${countQuery} AND engine = ${filters.engine}`;
    }
    if (filters.status) {
      query = sql2`${query} AND status = ${filters.status}`;
      countQuery = sql2`${countQuery} AND status = ${filters.status}`;
    }
    if (filters.startDate) {
      query = sql2`${query} AND created_at >= ${filters.startDate}`;
      countQuery = sql2`${countQuery} AND created_at >= ${filters.startDate}`;
    }
    if (filters.endDate) {
      query = sql2`${query} AND created_at <= ${filters.endDate}`;
      countQuery = sql2`${countQuery} AND created_at <= ${filters.endDate}`;
    }
    query = sql2`${query} ORDER BY created_at DESC LIMIT ${filters.limit || 50} OFFSET ${filters.offset || 0}`;
    const [callsResult, countResult] = await Promise.all([
      db.execute(query),
      db.execute(countQuery)
    ]);
    return {
      calls: transformRows(callsResult.rows),
      total: parseInt(countResult.rows[0].total)
    };
  }
  /**
   * Get a single SIP call by ID
   */
  static async getSipCall(callId) {
    const result = await db.execute(sql2`
      SELECT * FROM sip_calls WHERE id = ${callId} LIMIT 1
    `);
    if (result.rows.length === 0) {
      return null;
    }
    return transformRow(result.rows[0]);
  }
  static async getPlanSipSettings(planId) {
    const result = await db.execute(sql2`
      SELECT sip_enabled, max_concurrent_sip_calls, sip_engines_allowed
      FROM plans WHERE id = ${planId} OR name = ${planId}
      LIMIT 1
    `);
    const plan = result.rows[0];
    if (!plan) {
      return { sipEnabled: false, maxConcurrentSipCalls: 0, sipEnginesAllowed: [] };
    }
    return {
      sipEnabled: plan.sip_enabled || false,
      maxConcurrentSipCalls: plan.max_concurrent_sip_calls || 0,
      sipEnginesAllowed: plan.sip_engines_allowed || ["elevenlabs-sip"]
    };
  }
  static async updatePlanSipSettings(planId, settings) {
    const enginesArray = settings.sipEnginesAllowed ? `{${settings.sipEnginesAllowed.join(",")}}` : null;
    await db.execute(sql2`
      UPDATE plans SET
        sip_enabled = COALESCE(${settings.sipEnabled}, sip_enabled),
        max_concurrent_sip_calls = COALESCE(${settings.maxConcurrentSipCalls}, max_concurrent_sip_calls),
        sip_engines_allowed = COALESCE(${enginesArray}::text[], sip_engines_allowed),
        updated_at = NOW()
      WHERE id = ${planId} OR name = ${planId}
    `);
    return this.getPlanSipSettings(planId);
  }
  static async getAdminSettings() {
    return {
      pluginEnabled: true,
      defaultMaxConcurrentCalls: 10,
      mockMode: SIP_MOCK_MODE
    };
  }
  static async updateAdminSettings(updates) {
    return this.getAdminSettings();
  }
  static async getAdminStats() {
    const [trunksResult, phoneNumbersResult, callsResult, activeCallsResult] = await Promise.all([
      db.execute(sql2`SELECT COUNT(*) as count FROM sip_trunks`),
      db.execute(sql2`SELECT COUNT(*) as count FROM sip_phone_numbers`),
      db.execute(sql2`SELECT COUNT(*) as count FROM sip_calls`),
      db.execute(sql2`SELECT COUNT(*) as count FROM sip_calls WHERE status = 'in-progress'`)
    ]);
    const engineResult = await db.execute(sql2`
      SELECT engine, COUNT(*) as count FROM sip_trunks GROUP BY engine
    `);
    const byEngine = {};
    for (const row of engineResult.rows) {
      byEngine[row.engine] = parseInt(row.count);
    }
    return {
      totalTrunks: parseInt(trunksResult.rows[0].count),
      totalPhoneNumbers: parseInt(phoneNumbersResult.rows[0].count),
      totalCalls: parseInt(callsResult.rows[0].count),
      activeCalls: parseInt(activeCallsResult.rows[0].count),
      byEngine
    };
  }
  static async createSipCall(data) {
    const result = await db.execute(sql2`
      INSERT INTO sip_calls (
        user_id, agent_id, campaign_id, contact_id, sip_trunk_id,
        sip_phone_number_id, engine, external_call_id, from_number,
        to_number, direction, status
      )
      VALUES (
        ${data.userId}, ${data.agentId || null}, ${data.campaignId || null},
        ${data.contactId || null}, ${data.sipTrunkId || null},
        ${data.sipPhoneNumberId || null}, ${data.engine}, ${data.externalCallId || null},
        ${data.fromNumber || "unknown"}, ${data.toNumber || "unknown"}, ${data.direction},
        ${data.status || "initiated"}
      )
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
  static async updateSipCall(id, updates) {
    const result = await db.execute(sql2`
      UPDATE sip_calls SET
        status = COALESCE(${updates.status}, status),
        duration_seconds = COALESCE(${updates.durationSeconds}, duration_seconds),
        credits_used = COALESCE(${updates.creditsUsed}, credits_used),
        recording_url = COALESCE(${updates.recordingUrl}, recording_url),
        transcript = COALESCE(${updates.transcript ? JSON.stringify(updates.transcript) : null}, transcript),
        ai_summary = COALESCE(${updates.aiSummary}, ai_summary),
        answered_at = COALESCE(${updates.answeredAt}, answered_at),
        ended_at = COALESCE(${updates.endedAt}, ended_at),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `);
    return transformRow(result.rows[0]);
  }
};

// plugins/sip-engine/services/elevenlabs-sip.service.ts
init_db();
init_schema();
import { sql as sql3, eq as eq2, asc } from "drizzle-orm";
var ELEVENLABS_API_BASE = "https://api.elevenlabs.io/v1";
var SIP_MOCK_MODE2 = process.env.SIP_MOCK_MODE === "true";
var PROVIDER_SIP_DOMAINS = {
  // These providers require account-specific termination URIs from user's provider console
  twilio: { host: "", port: 5060, requiresUserHost: true },
  // User must enter: yourtrunk.pstn.twilio.com
  plivo: { host: "", port: 5060, requiresUserHost: true },
  // User must enter: yourtrunk.sip.plivo.com
  vonage: { host: "", port: 5060, requiresUserHost: true },
  // User must enter their Vonage SIP domain
  bandwidth: { host: "", port: 5060, requiresUserHost: true },
  // User must enter their Bandwidth SIP domain
  ringcentral: { host: "", port: 5060, requiresUserHost: true },
  // User must enter their RingCentral SIP domain
  sinch: { host: "", port: 5060, requiresUserHost: true },
  // User must enter their Sinch SIP domain
  // These providers have universal SIP domains that work for all accounts
  telnyx: { host: "sip.telnyx.com", port: 5060, requiresUserHost: false },
  exotel: { host: "sip.exotel.com", port: 5060, requiresUserHost: false },
  didww: { host: "sip.didww.com", port: 5060, requiresUserHost: false },
  zadarma: { host: "pbx.zadarma.com", port: 5060, requiresUserHost: false },
  cloudonix: { host: "sip.cloudonix.io", port: 5060, requiresUserHost: false },
  infobip: { host: "sip.infobip.com", port: 5060, requiresUserHost: false },
  generic: { host: "", port: 5060, requiresUserHost: true }
};
var COMPOUND_WORD_FIXES2 = [
  [/Elevenlabs/g, "ElevenLabs"],
  [/^elevenlabs/g, "elevenLabs"],
  [/Openai/g, "OpenAI"],
  [/^openai/g, "openAI"]
];
function snakeToCamel2(str) {
  let result = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  for (const [pattern, replacement] of COMPOUND_WORD_FIXES2) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
function transformRow2(row) {
  const transformed = {};
  for (const key of Object.keys(row)) {
    transformed[snakeToCamel2(key)] = row[key];
  }
  return transformed;
}
var ElevenLabsSipService = class {
  static async getApiKey(userId) {
    const userRows = await db.select({ apiKey: elevenLabsCredentials.apiKey }).from(users).leftJoin(elevenLabsCredentials, eq2(users.elevenLabsCredentialId, elevenLabsCredentials.id)).where(eq2(users.id, userId)).limit(1);
    const userApiKey = userRows[0]?.apiKey;
    if (userApiKey) {
      return userApiKey;
    }
    const defaultRows = await db.select({ apiKey: elevenLabsCredentials.apiKey }).from(elevenLabsCredentials).where(eq2(elevenLabsCredentials.isActive, true)).orderBy(asc(elevenLabsCredentials.createdAt)).limit(1);
    const defaultApiKey = defaultRows[0]?.apiKey;
    if (defaultApiKey) {
      return defaultApiKey;
    }
    throw new Error("No ElevenLabs API key configured");
  }
  /**
   * List all phone numbers from ElevenLabs API
   * Used for debugging and comparison with local database
   */
  static async listAllPhoneNumbers(userId) {
    const apiKey = await this.getApiKey(userId);
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers`, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to list phone numbers: ${errorText}`);
    }
    const data = await response.json();
    return data.phone_numbers || data || [];
  }
  /**
   * Find an existing phone number in ElevenLabs by phone number digits
   * Used to adopt orphaned phone numbers that exist in ElevenLabs but not in local DB
   */
  static async findExistingPhoneNumber(apiKey, phoneDigits) {
    try {
      const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers`, {
        method: "GET",
        headers: {
          "xi-api-key": apiKey
        }
      });
      if (!response.ok) {
        console.error(`[ElevenLabs SIP] Failed to list phone numbers: ${response.status}`);
        return null;
      }
      const data = await response.json();
      const phoneNumbers2 = data.phone_numbers || data || [];
      for (const phone of phoneNumbers2) {
        const existingDigits = (phone.phone_number || "").replace(/[^\d]/g, "");
        if (existingDigits === phoneDigits || existingDigits.endsWith(phoneDigits) || phoneDigits.endsWith(existingDigits)) {
          return {
            phone_number_id: phone.phone_number_id,
            phone_number: phone.phone_number
          };
        }
      }
      return null;
    } catch (error) {
      console.error(`[ElevenLabs SIP] Error finding existing phone number:`, error);
      return null;
    }
  }
  static async importPhoneNumber(userId, trunk, data) {
    if (SIP_MOCK_MODE2) {
      console.log("[ElevenLabs SIP] Mock mode: Simulating phone number import");
      return this.createMockPhoneNumber(userId, trunk, data);
    }
    const phoneNumberDigitsOnly = data.phoneNumber.replace(/[^\d]/g, "");
    const phoneNumberForApi = data.phoneNumber.replace(/[\s\-\(\)]/g, "");
    const phoneNumberWithPlus = phoneNumberForApi.startsWith("+") ? phoneNumberForApi : `+${phoneNumberForApi}`;
    const existingLocal = await db.execute(sql3`
      SELECT id, phone_number FROM sip_phone_numbers 
      WHERE user_id = ${userId}
      AND engine = 'elevenlabs-sip'
    `);
    for (const row of existingLocal.rows) {
      const existingDigits = (row.phone_number || "").replace(/[^\d]/g, "");
      if (existingDigits === phoneNumberDigitsOnly || existingDigits.endsWith(phoneNumberDigitsOnly) || phoneNumberDigitsOnly.endsWith(existingDigits)) {
        const error = new Error("This phone number is already imported in your account.");
        error.statusCode = 409;
        throw error;
      }
    }
    const apiKey = await this.getApiKey(userId);
    const outboundTransport = trunk.transport === "tls" ? "tls" : "tcp";
    const mediaEncryption = trunk.mediaEncryption === "require" ? "required" : trunk.mediaEncryption === "disable" ? "disabled" : trunk.mediaEncryption === "allow" ? "allowed" : "allowed";
    const providerDomain = PROVIDER_SIP_DOMAINS[trunk.provider] || PROVIDER_SIP_DOMAINS.generic;
    const defaultOutboundPort = outboundTransport === "tls" ? 5061 : 5060;
    const { host: sipHost, port: parsedPort } = this.parseHostAndPort(
      trunk.sipHost || providerDomain.host || "",
      defaultOutboundPort
    );
    const sipPort = trunk.sipPort || parsedPort;
    if (!sipHost) {
      const providerName = trunk.provider.charAt(0).toUpperCase() + trunk.provider.slice(1);
      if (providerDomain.requiresUserHost) {
        throw new Error(`SIP host is required for ${providerName}. Please enter your termination URI from your ${providerName} console (SIP Trunk settings).`);
      }
      throw new Error("SIP host is required. Please configure the SIP trunk with a valid host address.");
    }
    const credentialRequiredProviders = ["twilio", "plivo", "vonage", "bandwidth", "ringcentral", "sinch"];
    if (credentialRequiredProviders.includes(trunk.provider) && (!trunk.username || !trunk.password)) {
      const providerName = trunk.provider.charAt(0).toUpperCase() + trunk.provider.slice(1);
      const error = new Error(`${providerName} requires SIP credentials (username and password) for outbound calls. Please update your SIP trunk with the credentials from your ${providerName} console before importing phone numbers.`);
      error.statusCode = 400;
      throw error;
    }
    const inboundMediaEncryption = "allowed";
    const inboundConfig = {
      media_encryption: inboundMediaEncryption,
      remote_domains: [sipHost]
    };
    const outboundConfig = {
      address: `${sipHost}:${sipPort}`,
      transport: outboundTransport,
      media_encryption: mediaEncryption
    };
    if (trunk.username && trunk.password) {
      outboundConfig.credentials = {
        username: trunk.username,
        password: trunk.password
      };
    }
    const requestBody = {
      label: data.label || `SIP - ${data.phoneNumber}`,
      phone_number: phoneNumberWithPlus,
      provider_type: "sip_trunk",
      inbound_trunk_config: inboundConfig,
      outbound_trunk_config: outboundConfig,
      ...data.customHeaders ? { custom_headers: data.customHeaders } : {}
    };
    console.log(`[ElevenLabs SIP] Importing phone number: ${data.phoneNumber}`);
    const sanitizedBody = JSON.parse(JSON.stringify(requestBody));
    if (sanitizedBody.outbound_trunk_config?.credentials?.password) {
      sanitizedBody.outbound_trunk_config.credentials.password = "[REDACTED]";
    }
    console.log(`[ElevenLabs SIP] Request body:`, JSON.stringify(sanitizedBody, null, 2));
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ElevenLabs SIP] Import failed: ${response.status} - ${errorText}`);
      let errorMessage = "Failed to import phone number";
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.detail?.status === "phone_number_conflict") {
          console.log(`[ElevenLabs SIP] Phone number conflict - attempting to adopt existing number...`);
          const existingPhone = await this.findExistingPhoneNumber(apiKey, phoneNumberDigitsOnly);
          if (existingPhone) {
            console.log(`[ElevenLabs SIP] Found existing phone number: ${existingPhone.phone_number_id}`);
            const existingDbRecord = await db.execute(sql3`
              SELECT id, phone_number, external_elevenlabs_phone_id FROM sip_phone_numbers 
              WHERE user_id = ${userId}
              AND (external_elevenlabs_phone_id = ${existingPhone.phone_number_id}
                   OR engine = 'elevenlabs-sip')
            `);
            for (const row of existingDbRecord.rows) {
              const rec = row;
              if (rec.external_elevenlabs_phone_id === existingPhone.phone_number_id) {
                const error3 = new Error("This phone number is already registered in your account.");
                error3.statusCode = 409;
                throw error3;
              }
              const existingDigits = (rec.phone_number || "").replace(/[^\d]/g, "");
              if (existingDigits === phoneNumberDigitsOnly || existingDigits.endsWith(phoneNumberDigitsOnly) || phoneNumberDigitsOnly.endsWith(existingDigits)) {
                const error3 = new Error("This phone number is already registered in your account.");
                error3.statusCode = 409;
                throw error3;
              }
            }
            console.log(`[ElevenLabs SIP] Adopting orphaned phone number into local database...`);
            const dbResult2 = await db.execute(sql3`
              INSERT INTO sip_phone_numbers (
                user_id, sip_trunk_id, phone_number, label, engine,
                external_elevenlabs_phone_id, agent_id
              )
              VALUES (
                ${userId}, ${trunk.id}, ${data.phoneNumber}, ${data.label || null},
                'elevenlabs-sip', ${existingPhone.phone_number_id}, ${data.agentId || null}
              )
              RETURNING *
            `);
            console.log(`[ElevenLabs SIP] Successfully adopted existing phone number`);
            return transformRow2(dbResult2.rows[0]);
          }
          const error2 = new Error("This phone number already exists in ElevenLabs but could not be adopted. It may be registered under a different account.");
          error2.statusCode = 409;
          throw error2;
        }
        errorMessage = errorJson.detail?.message || errorJson.message || errorMessage;
      } catch (parseError) {
        if (parseError.statusCode) throw parseError;
        errorMessage = errorText || errorMessage;
      }
      const error = new Error(errorMessage);
      error.statusCode = response.status;
      throw error;
    }
    const result = await response.json();
    const phoneNumberId = result.phone_number_id;
    console.log(`[ElevenLabs SIP] Phone number imported: ${phoneNumberId}`);
    console.log(`[ElevenLabs SIP] Applying full SIP configuration via PATCH...`);
    const patchBody = {
      label: data.label || `SIP - ${data.phoneNumber}`,
      inbound_trunk_config: {
        media_encryption: "allowed",
        remote_domains: [sipHost]
      },
      outbound_trunk_config: {
        address: `${sipHost}:${sipPort}`,
        transport: outboundTransport,
        media_encryption: mediaEncryption,
        ...trunk.username && trunk.password ? {
          credentials: {
            username: trunk.username,
            password: trunk.password
          }
        } : {}
      }
    };
    console.log(`[ElevenLabs SIP] PATCH body:`, JSON.stringify(patchBody, null, 2));
    const patchResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers/${phoneNumberId}`, {
      method: "PATCH",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchBody)
    });
    if (!patchResponse.ok) {
      const patchError = await patchResponse.text();
      console.warn(`[ElevenLabs SIP] PATCH config failed (non-fatal): ${patchResponse.status} - ${patchError}`);
    } else {
      console.log(`[ElevenLabs SIP] Full SIP configuration applied successfully`);
    }
    let dbResult;
    try {
      dbResult = await db.execute(sql3`
        INSERT INTO sip_phone_numbers (
          user_id, sip_trunk_id, phone_number, label, engine,
          external_elevenlabs_phone_id, agent_id
        )
        VALUES (
          ${userId}, ${trunk.id}, ${data.phoneNumber}, ${data.label || null},
          'elevenlabs-sip', ${phoneNumberId}, ${data.agentId || null}
        )
        RETURNING *
      `);
    } catch (dbError) {
      console.error(`[ElevenLabs SIP] DB insert failed after successful API import. Attempting compensating delete on ElevenLabs...`);
      try {
        await this.deletePhoneNumber(userId, phoneNumberId);
        console.log(`[ElevenLabs SIP] Compensating delete succeeded for ${phoneNumberId}`);
      } catch (deleteError) {
        console.error(`[ElevenLabs SIP] Compensating delete FAILED for ${phoneNumberId}: ${deleteError.message}. Orphaned number may exist in ElevenLabs.`);
      }
      throw new Error(`Failed to save phone number to database: ${dbError.message}`);
    }
    return transformRow2(dbResult.rows[0]);
  }
  static async makeOutboundCall(userId, phoneNumber, toNumber, agentId, clientData) {
    if (SIP_MOCK_MODE2) {
      console.log("[ElevenLabs SIP] Mock mode: Simulating outbound call");
      return {
        success: true,
        conversationId: `mock_conv_${Date.now()}`,
        callId: `mock_call_${Date.now()}`
      };
    }
    const apiKey = await this.getApiKey(userId);
    if (!phoneNumber.externalElevenLabsPhoneId) {
      throw new Error("Phone number not registered with ElevenLabs");
    }
    const agentResult = await db.execute(sql3`
      SELECT eleven_labs_agent_id FROM agents WHERE id = ${agentId} LIMIT 1
    `);
    const agent = agentResult.rows[0];
    if (!agent?.eleven_labs_agent_id) {
      throw new Error("Agent does not have an ElevenLabs agent ID");
    }
    const requestBody = {
      agent_id: agent.eleven_labs_agent_id,
      agent_phone_number_id: phoneNumber.externalElevenLabsPhoneId,
      to_number: toNumber.startsWith("+") ? toNumber : `+${toNumber}`,
      conversation_initiation_client_data: clientData
    };
    console.log(`[ElevenLabs SIP] Making outbound call to ${toNumber}`);
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/sip-trunk/outbound-call`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ElevenLabs SIP] Outbound call failed: ${response.status} - ${errorText}`);
      return { success: false, error: errorText };
    }
    const result = await response.json();
    console.log(`[ElevenLabs SIP] Outbound call initiated: ${result.conversation_id}`);
    try {
      const sipCallResult = await db.execute(sql3`
        INSERT INTO sip_calls (
          user_id, agent_id, sip_trunk_id, sip_phone_number_id,
          engine, elevenlabs_conversation_id, external_call_id, from_number, to_number,
          direction, status, started_at
        )
        VALUES (
          ${userId}, ${agentId}, ${phoneNumber.sipTrunkId}, ${phoneNumber.id},
          'elevenlabs-sip', ${result.conversation_id}, ${result.sip_call_id || null},
          ${phoneNumber.phoneNumber}, ${toNumber.startsWith("+") ? toNumber : `+${toNumber}`},
          'outbound', 'initiated', NOW()
        )
        RETURNING *
      `);
      const sipCallRecord = sipCallResult.rows[0];
      console.log(`[ElevenLabs SIP] Created SIP call record: ${sipCallRecord?.id}`);
    } catch (dbError) {
      console.error(`[ElevenLabs SIP] Failed to create SIP call record:`, dbError.message);
    }
    return {
      success: true,
      conversationId: result.conversation_id,
      callId: result.sip_call_id
    };
  }
  static async assignAgentToPhoneNumber(userId, elevenLabsPhoneNumberId, agentId) {
    if (SIP_MOCK_MODE2) {
      console.log("[ElevenLabs SIP] Mock mode: Simulating agent assignment");
      return;
    }
    const apiKey = await this.getApiKey(userId);
    let elevenLabsAgentId = null;
    if (agentId) {
      const agentResult = await db.execute(sql3`
        SELECT eleven_labs_agent_id FROM agents WHERE id = ${agentId} LIMIT 1
      `);
      const agent = agentResult.rows[0];
      elevenLabsAgentId = agent?.eleven_labs_agent_id;
    }
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers/${elevenLabsPhoneNumberId}`, {
      method: "PATCH",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agent_id: elevenLabsAgentId
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ElevenLabs SIP] Agent assignment failed: ${response.status} - ${errorText}`);
      if (response.status === 404 || errorText.includes("document_not_found") || errorText.includes("not found")) {
        const err = new Error(`This phone number no longer exists on ElevenLabs (ID: ${elevenLabsPhoneNumberId}). Please delete it and re-import.`);
        err.statusCode = 404;
        err.isOrphaned = true;
        throw err;
      }
      throw new Error(`Failed to assign agent: ${errorText}`);
    }
    console.log(`[ElevenLabs SIP] Agent ${agentId} assigned to phone number ${elevenLabsPhoneNumberId}`);
  }
  static async deletePhoneNumber(userId, elevenLabsPhoneNumberId) {
    if (SIP_MOCK_MODE2) {
      console.log("[ElevenLabs SIP] Mock mode: Simulating phone number deletion");
      return;
    }
    const apiKey = await this.getApiKey(userId);
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers/${elevenLabsPhoneNumberId}`, {
      method: "DELETE",
      headers: {
        "xi-api-key": apiKey
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404 || errorText.includes("document_not_found") || errorText.includes("not found")) {
        console.log(`[ElevenLabs SIP] Phone number ${elevenLabsPhoneNumberId} already deleted from ElevenLabs (404) - treating as success`);
        return;
      }
      console.error(`[ElevenLabs SIP] Delete failed: ${response.status} - ${errorText}`);
      throw new Error(`Failed to delete phone number: ${errorText}`);
    }
    console.log(`[ElevenLabs SIP] Phone number ${elevenLabsPhoneNumberId} deleted`);
  }
  static async getPhoneNumberDetails(userId, elevenLabsPhoneNumberId) {
    if (SIP_MOCK_MODE2) {
      return { phone_number_id: elevenLabsPhoneNumberId, status: "active" };
    }
    const apiKey = await this.getApiKey(userId);
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers/${elevenLabsPhoneNumberId}`, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404 || errorText.includes("document_not_found") || errorText.includes("not found")) {
        const err = new Error(`This phone number no longer exists on ElevenLabs (ID: ${elevenLabsPhoneNumberId}). Please delete it and re-import.`);
        err.statusCode = 404;
        err.isOrphaned = true;
        throw err;
      }
      throw new Error(`Failed to get phone number details: ${errorText}`);
    }
    return response.json();
  }
  static async updatePhoneNumberSipConfig(userId, elevenLabsPhoneNumberId, trunk, phoneNumber) {
    if (SIP_MOCK_MODE2) {
      console.log("[ElevenLabs SIP] Mock mode: Simulating SIP config update");
      return { success: true };
    }
    const apiKey = await this.getApiKey(userId);
    const outboundTransport = trunk.transport === "tls" ? "tls" : "tcp";
    const mediaEncryption = trunk.mediaEncryption === "require" ? "required" : trunk.mediaEncryption === "disable" ? "disabled" : trunk.mediaEncryption === "allow" ? "allowed" : "allowed";
    const providerDomain = PROVIDER_SIP_DOMAINS[trunk.provider] || PROVIDER_SIP_DOMAINS.generic;
    const defaultOutboundPort = outboundTransport === "tls" ? 5061 : 5060;
    const { host: sipHost, port: parsedPort } = this.parseHostAndPort(
      trunk.sipHost || providerDomain.host || "",
      defaultOutboundPort
    );
    const sipPort = trunk.sipPort || parsedPort;
    if (!sipHost) {
      const providerName = trunk.provider.charAt(0).toUpperCase() + trunk.provider.slice(1);
      if (providerDomain.requiresUserHost) {
        throw new Error(`SIP host is required for ${providerName}. Please enter your termination URI from your ${providerName} console (SIP Trunk settings).`);
      }
      throw new Error("SIP host is required. Please configure the SIP trunk with a valid host address.");
    }
    const inboundMediaEncryption = "allowed";
    const inboundConfig = {
      media_encryption: inboundMediaEncryption,
      remote_domains: [sipHost]
    };
    const outboundConfig = {
      address: `${sipHost}:${sipPort}`,
      transport: outboundTransport,
      media_encryption: mediaEncryption
    };
    if (trunk.username && trunk.password) {
      outboundConfig.credentials = {
        username: trunk.username,
        password: trunk.password
      };
    }
    const requestBody = {
      inbound_trunk_config: inboundConfig,
      outbound_trunk_config: outboundConfig
    };
    console.log(`[ElevenLabs SIP] Updating SIP config for phone number: ${elevenLabsPhoneNumberId}`);
    const sanitizedBody = JSON.parse(JSON.stringify(requestBody));
    if (sanitizedBody.outbound_trunk_config?.credentials?.password) {
      sanitizedBody.outbound_trunk_config.credentials.password = "[REDACTED]";
    }
    console.log(`[ElevenLabs SIP] Request body:`, JSON.stringify(sanitizedBody, null, 2));
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/phone-numbers/${elevenLabsPhoneNumberId}`, {
      method: "PATCH",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ElevenLabs SIP] SIP config update failed: ${response.status} - ${errorText}`);
      if (response.status === 404 || errorText.includes("document_not_found") || errorText.includes("not found")) {
        const err = new Error(`This phone number no longer exists on ElevenLabs (ID: ${elevenLabsPhoneNumberId}). Please delete it and re-import.`);
        err.statusCode = 404;
        err.isOrphaned = true;
        throw err;
      }
      throw new Error(`Failed to update SIP config: ${errorText}`);
    }
    console.log(`[ElevenLabs SIP] SIP config updated successfully for ${elevenLabsPhoneNumberId}`);
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return { success: true, phoneNumberId: elevenLabsPhoneNumberId };
    }
    try {
      return await response.json();
    } catch {
      return { success: true, phoneNumberId: elevenLabsPhoneNumberId };
    }
  }
  static async createMockPhoneNumber(userId, trunk, data) {
    const mockElevenLabsId = `mock_${Date.now()}`;
    const dbResult = await db.execute(sql3`
      INSERT INTO sip_phone_numbers (
        user_id, sip_trunk_id, phone_number, label, engine,
        external_elevenlabs_phone_id, agent_id
      )
      VALUES (
        ${userId}, ${trunk.id}, ${data.phoneNumber}, ${data.label || null},
        'elevenlabs-sip', ${mockElevenLabsId}, ${data.agentId || null}
      )
      RETURNING *
    `);
    return transformRow2(dbResult.rows[0]);
  }
  static parseHostAndPort(rawHost, defaultPort) {
    if (!rawHost) {
      return { host: "", port: defaultPort };
    }
    if (rawHost.startsWith("[")) {
      const bracketEnd = rawHost.indexOf("]");
      if (bracketEnd > 0) {
        const host = rawHost.substring(1, bracketEnd);
        const portPart = rawHost.substring(bracketEnd + 1);
        if (portPart.startsWith(":")) {
          const parsed = parseInt(portPart.substring(1), 10);
          return { host, port: !isNaN(parsed) ? parsed : defaultPort };
        }
        return { host, port: defaultPort };
      }
    }
    const atIndex = rawHost.indexOf("@");
    const hostPart = atIndex > -1 ? rawHost.substring(atIndex + 1) : rawHost;
    const lastColonIndex = hostPart.lastIndexOf(":");
    if (lastColonIndex > -1) {
      const possiblePort = hostPart.substring(lastColonIndex + 1);
      const parsed = parseInt(possiblePort, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 65535) {
        return { host: hostPart.substring(0, lastColonIndex), port: parsed };
      }
    }
    return { host: hostPart, port: defaultPort };
  }
  static isIpAddress(host) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
    return ipv4Regex.test(host) || ipv6Regex.test(host);
  }
};

// plugins/sip-engine/services/openai-sip.service.ts
init_db();
import { sql as sql4 } from "drizzle-orm";
import * as crypto from "crypto";
var SIP_MOCK_MODE3 = process.env.SIP_MOCK_MODE === "true";
var OPENAI_API_BASE = "https://api.openai.com/v1";
var OpenAISipService = class {
  static async getOpenAIApiKey() {
    const result = await db.execute(sql4`
      SELECT api_key FROM openai_keys 
      WHERE is_active = true 
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    const row = result.rows[0];
    if (row?.api_key) {
      return row.api_key;
    }
    const envKey = process.env.OPENAI_API_KEY;
    if (envKey) {
      return envKey;
    }
    throw new Error("No OpenAI API key configured");
  }
  /**
   * Get webhook secret from database for signature verification
   */
  static async getWebhookSecret() {
    try {
      const result = await db.execute(sql4`
        SELECT value FROM global_settings 
        WHERE key = 'openai_sip_webhook_secret' 
        LIMIT 1
      `);
      const row = result.rows[0];
      if (!row?.value) return null;
      const val = row.value;
      if (typeof val === "string") {
        return val.replace(/^"|"$/g, "");
      }
      return String(val);
    } catch (e) {
      return null;
    }
  }
  /**
   * Verify OpenAI webhook signature
   * Based on: https://platform.openai.com/docs/guides/webhooks
   * 
   * OpenAI uses a standard webhook signature format:
   * - webhook-id: unique ID for idempotency
   * - webhook-timestamp: Unix timestamp of delivery attempt
   * - webhook-signature: v1,<base64-encoded-hmac-sha256>
   * 
   * IMPORTANT: This method assumes the secret is already retrieved by the caller.
   * It should only be called after verifying that a secret exists.
   */
  static async verifyWebhookSignature(payload, signature, webhookId, timestamp2) {
    const secret = await this.getWebhookSecret();
    if (!secret) {
      console.error("[OpenAI SIP] Cannot verify signature: No webhook secret configured");
      return false;
    }
    try {
      const parts = signature.split(",");
      if (parts.length < 2 || !parts[0].startsWith("v1")) {
        console.error("[OpenAI SIP] Invalid signature format - expected v1,<signature>");
        return false;
      }
      const expectedSignature = parts[1];
      const signedPayload = `${webhookId}.${timestamp2}.${payload}`;
      const computedSignature = crypto.createHmac("sha256", secret).update(signedPayload).digest("base64");
      try {
        const isValid = crypto.timingSafeEqual(
          Buffer.from(expectedSignature, "base64"),
          Buffer.from(computedSignature, "base64")
        );
        if (!isValid) {
          console.error("[OpenAI SIP] Webhook signature verification failed");
        }
        return isValid;
      } catch (e) {
        console.error("[OpenAI SIP] Signature length mismatch");
        return false;
      }
    } catch (error) {
      console.error("[OpenAI SIP] Error verifying webhook signature:", error);
      return false;
    }
  }
  static async getOpenAIProjectId() {
    const result = await db.execute(sql4`
      SELECT value FROM global_settings 
      WHERE key = 'openai_sip_project_id' 
      LIMIT 1
    `);
    const setting = result.rows[0];
    if (setting?.value) {
      const val = setting.value;
      if (typeof val === "string") {
        return val.replace(/^"|"$/g, "");
      }
      return String(val);
    }
    const envProjectId = process.env.OPENAI_PROJECT_ID;
    if (envProjectId) {
      return envProjectId;
    }
    throw new Error("OpenAI Project ID not configured. Set it in Admin Settings.");
  }
  static getSipEndpoint(projectId) {
    return `sip:${projectId}@sip.api.openai.com;transport=tls`;
  }
  static async handleIncomingCall(event) {
    console.log(`[OpenAI SIP] Incoming call: ${event.data.call_id}`);
    const fromHeader = event.data.sip_headers.find((h) => h.name.toLowerCase() === "from");
    const toHeader = event.data.sip_headers.find((h) => h.name.toLowerCase() === "to");
    const fromNumber = this.extractPhoneNumber(fromHeader?.value || "");
    const toNumber = this.extractPhoneNumber(toHeader?.value || "");
    console.log(`[OpenAI SIP] Call from ${fromNumber} to ${toNumber}`);
    const toNumberDigits = toNumber.replace(/[^\d]/g, "");
    const toNumberWithPlus = toNumber.startsWith("+") ? toNumber : `+${toNumber}`;
    const toNumberWithoutPlus = toNumber.replace(/^\+/, "");
    console.log(`[OpenAI SIP] Looking up phone number: digits=${toNumberDigits}, withPlus=${toNumberWithPlus}, withoutPlus=${toNumberWithoutPlus}`);
    const phoneResult = await db.execute(sql4`
      SELECT spn.*, a.id as agent_id, a.system_prompt, a.first_message, 
             a.openai_voice, a.temperature, a.name as agent_name,
             st.user_id
      FROM sip_phone_numbers spn
      JOIN sip_trunks st ON spn.sip_trunk_id = st.id
      LEFT JOIN agents a ON spn.agent_id = a.id
      WHERE (
        spn.phone_number = ${toNumber}
        OR spn.phone_number = ${toNumberWithPlus}
        OR spn.phone_number = ${toNumberWithoutPlus}
        OR REGEXP_REPLACE(spn.phone_number, '[^0-9]', '', 'g') = ${toNumberDigits}
      )
        AND spn.engine = 'openai-sip'
        AND spn.is_active = true
        AND spn.inbound_enabled = true
      LIMIT 1
    `);
    const phoneNumber = phoneResult.rows[0];
    if (!phoneNumber || !phoneNumber.agent_id) {
      console.log(`[OpenAI SIP] No agent assigned to ${toNumber}`);
      return { action: "reject", reason: "No agent configured for this number" };
    }
    await db.execute(sql4`
      INSERT INTO sip_calls (
        user_id, agent_id, sip_trunk_id, sip_phone_number_id, engine,
        external_call_id, openai_call_id, from_number, to_number, direction, status
      )
      VALUES (
        ${phoneNumber.user_id}, ${phoneNumber.agent_id}, ${phoneNumber.sip_trunk_id},
        ${phoneNumber.id}, 'openai-sip', ${event.data.call_id}, ${event.data.call_id},
        ${fromNumber}, ${toNumber}, 'inbound', 'ringing'
      )
    `);
    const acceptConfig = {
      type: "realtime",
      model: "gpt-realtime-1.5",
      instructions: phoneNumber.system_prompt || "You are a helpful AI assistant answering phone calls.",
      voice: phoneNumber.openai_voice || "alloy",
      input_audio_transcription: {
        model: "whisper-1"
      }
    };
    console.log(`[OpenAI SIP] Accepting call with agent: ${phoneNumber.agent_name}`);
    return { action: "accept", config: acceptConfig, userId: phoneNumber.user_id };
  }
  static async acceptCall(callId, config) {
    if (SIP_MOCK_MODE3) {
      console.log(`[OpenAI SIP] Mock mode: Simulating call accept for ${callId}`);
      return { success: true };
    }
    try {
      const apiKey = await this.getOpenAIApiKey();
      const response = await fetch(`${OPENAI_API_BASE}/realtime/calls/${callId}/accept`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session: {
            voice: config.voice,
            instructions: config.instructions,
            model: config.model,
            input_audio_transcription: config.input_audio_transcription,
            tools: config.tools
          }
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[OpenAI SIP] Accept call failed: ${response.status} - ${errorText}`);
        return { success: false, error: errorText };
      }
      console.log(`[OpenAI SIP] Call ${callId} accepted`);
      await db.execute(sql4`
        UPDATE sip_calls SET status = 'in-progress', answered_at = NOW(), updated_at = NOW()
        WHERE openai_call_id = ${callId}
      `);
      return { success: true };
    } catch (error) {
      console.error(`[OpenAI SIP] Error accepting call ${callId}:`, error);
      return { success: false, error: error.message };
    }
  }
  static async rejectCall(callId, reason) {
    if (SIP_MOCK_MODE3) {
      console.log(`[OpenAI SIP] Mock mode: Simulating call reject for ${callId}`);
      return { success: true };
    }
    try {
      const apiKey = await this.getOpenAIApiKey();
      const response = await fetch(`${OPENAI_API_BASE}/realtime/calls/${callId}/reject`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reason })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[OpenAI SIP] Reject call failed: ${response.status} - ${errorText}`);
        return { success: false, error: errorText };
      }
      console.log(`[OpenAI SIP] Call ${callId} rejected: ${reason}`);
      await db.execute(sql4`
        UPDATE sip_calls SET status = 'cancelled', ended_at = NOW(), updated_at = NOW()
        WHERE openai_call_id = ${callId}
      `);
      return { success: true };
    } catch (error) {
      console.error(`[OpenAI SIP] Error rejecting call ${callId}:`, error);
      return { success: false, error: error.message };
    }
  }
  static async handleCallCompleted(callId, duration, transcript) {
    console.log(`[OpenAI SIP] Call ${callId} completed`);
    const sipCallResult = await db.execute(sql4`
      SELECT id, user_id, from_number, to_number FROM sip_calls 
      WHERE openai_call_id = ${callId} LIMIT 1
    `);
    const sipCall = sipCallResult.rows[0];
    await db.execute(sql4`
      UPDATE sip_calls SET 
        status = 'completed',
        duration_seconds = ${duration || 0},
        transcript = ${JSON.stringify(transcript || [])},
        ended_at = NOW(),
        updated_at = NOW()
      WHERE openai_call_id = ${callId}
    `);
    if (sipCall && duration && duration > 0) {
      try {
        const { deductSipCallCredits } = (await Promise.resolve().then(() => (init_service_registry(), service_registry_exports))).getSipServices();
        console.log(`\u{1F4B3} [OpenAI SIP] Processing credit deduction for ${duration}s call`);
        const creditResult = await deductSipCallCredits(sipCall.id, duration, "openai-sip");
        if (creditResult.success) {
          console.log(`\u2705 [OpenAI SIP] Credits deducted: ${creditResult.creditsDeducted}`);
        } else {
          console.error(`\u274C [OpenAI SIP] Credit deduction failed: ${creditResult.error}`);
        }
      } catch (creditError) {
        console.error(`\u274C [OpenAI SIP] Credit deduction error:`, creditError.message);
      }
    }
    try {
      if (sipCall) {
        await db.execute(sql4`
          UPDATE flow_executions SET 
            status = 'completed',
            completed_at = NOW()
          WHERE call_id = ${sipCall.id} 
            AND (status = 'running' OR status = 'pending')
        `);
        console.log(`[OpenAI SIP] Updated flow execution for call ${sipCall.id} to completed`);
      }
    } catch (flowExecError) {
      console.warn(`[OpenAI SIP] Failed to update flow execution status: ${flowExecError.message}`);
    }
  }
  static async handleCallFailed(callId, reason) {
    console.log(`[OpenAI SIP] Call ${callId} failed: ${reason}`);
    await db.execute(sql4`
      UPDATE sip_calls SET 
        status = 'failed',
        metadata = jsonb_set(COALESCE(metadata, '{}')::jsonb, '{failureReason}', ${JSON.stringify(reason)}::jsonb),
        ended_at = NOW(),
        updated_at = NOW()
      WHERE openai_call_id = ${callId}
    `);
    try {
      const sipCallResult = await db.execute(sql4`
        SELECT id FROM sip_calls WHERE openai_call_id = ${callId} LIMIT 1
      `);
      const sipCall = sipCallResult.rows[0];
      if (sipCall) {
        await db.execute(sql4`
          UPDATE flow_executions SET 
            status = 'failed',
            completed_at = NOW(),
            error = ${`Call failed: ${reason}`}
          WHERE call_id = ${sipCall.id} 
            AND (status = 'running' OR status = 'pending')
        `);
        console.log(`[OpenAI SIP] Updated flow execution for call ${sipCall.id} to failed`);
      }
    } catch (flowExecError) {
      console.warn(`[OpenAI SIP] Failed to update flow execution status: ${flowExecError.message}`);
    }
  }
  static async provisionTrunk(userId, trunk) {
    try {
      const projectId = await this.getOpenAIProjectId();
      const sipEndpoint = this.getSipEndpoint(projectId);
      await db.execute(sql4`
        UPDATE sip_trunks SET 
          openai_project_id = ${projectId},
          inbound_uri = ${sipEndpoint},
          updated_at = NOW()
        WHERE id = ${trunk.id}
      `);
      console.log(`[OpenAI SIP] Trunk provisioned with endpoint: ${sipEndpoint}`);
      return { success: true, sipEndpoint };
    } catch (error) {
      console.error(`[OpenAI SIP] Error provisioning trunk:`, error);
      return { success: false, error: error.message };
    }
  }
  static async importPhoneNumber(userId, trunk, phoneNumber, label, agentId) {
    console.log(`[OpenAI SIP] Importing phone number: ${phoneNumber}`);
    const result = await db.execute(sql4`
      INSERT INTO sip_phone_numbers (
        user_id, sip_trunk_id, phone_number, label, engine,
        agent_id, inbound_enabled, outbound_enabled
      )
      VALUES (
        ${userId}, ${trunk.id}, ${phoneNumber}, ${label || null},
        'openai-sip', ${agentId || null}, true, false
      )
      RETURNING *
    `);
    return result.rows[0];
  }
  static extractPhoneNumber(sipUri) {
    const match = sipUri.match(/sip:([^@]+)@/);
    if (match) {
      return match[1].replace(/[^\d+]/g, "");
    }
    return sipUri.replace(/[^\d+]/g, "");
  }
};

// plugins/sip-engine/routes/user-trunks.routes.ts
init_types();
init_db();
import { sql as sql5 } from "drizzle-orm";
var router = Router();
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunks = await SipTrunkService.getUserTrunks(userId);
    res.json({ success: true, data: trunks });
  } catch (error) {
    console.error("[SIP Trunks] Error fetching trunks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP trunks" });
  }
});
router.get("/providers", (req, res) => {
  res.json({
    success: true,
    data: SIP_PROVIDER_INFO
  });
});
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunk = await SipTrunkService.getTrunkById(id, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    res.json({ success: true, data: trunk });
  } catch (error) {
    console.error("[SIP Trunks] Error fetching trunk:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP trunk" });
  }
});
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { name, engine, provider, sipHost, sipPort, transport, inboundTransport, inboundPort, mediaEncryption, username, password } = req.body;
    if (!name || !engine || !provider) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, engine, provider"
      });
    }
    const validEngines = ["elevenlabs-sip", "openai-sip"];
    if (!validEngines.includes(engine)) {
      return res.status(400).json({
        success: false,
        message: `Invalid engine. Must be one of: ${validEngines.join(", ")}`
      });
    }
    const validProviders = Object.keys(SIP_PROVIDER_INFO);
    if (!validProviders.includes(provider)) {
      return res.status(400).json({
        success: false,
        message: `Invalid provider. Must be one of: ${validProviders.join(", ")}`
      });
    }
    const providerInfo = SIP_PROVIDER_INFO[provider];
    const finalSipHost = sipHost || providerInfo.defaultHost;
    if (!providerInfo.defaultHost && !sipHost) {
      const providerName = providerInfo.name || provider;
      return res.status(400).json({
        success: false,
        message: `SIP Host is required for ${providerName}. Please enter your termination URI from your ${providerName} console.`
      });
    }
    if (finalSipHost) {
      let hostToValidate = finalSipHost;
      const atIndex = hostToValidate.indexOf("@");
      if (atIndex > -1) {
        hostToValidate = hostToValidate.substring(atIndex + 1);
      }
      let portFromHost = null;
      if (hostToValidate.startsWith("[")) {
        const bracketEnd = hostToValidate.indexOf("]");
        if (bracketEnd < 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host. Malformed IPv6 address (missing closing bracket)."
          });
        }
        const ipv6Part = hostToValidate.substring(1, bracketEnd);
        const ipv6Regex2 = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
        if (!ipv6Regex2.test(ipv6Part)) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host. Must be a valid IPv6 address inside brackets."
          });
        }
        const afterBracket = hostToValidate.substring(bracketEnd + 1);
        if (afterBracket.startsWith(":")) {
          portFromHost = parseInt(afterBracket.substring(1), 10);
          if (isNaN(portFromHost) || portFromHost < 1 || portFromHost > 65535) {
            return res.status(400).json({
              success: false,
              message: "Invalid port in SIP Host. Must be between 1 and 65535."
            });
          }
        }
        hostToValidate = ipv6Part;
      } else {
        const lastColon = hostToValidate.lastIndexOf(":");
        if (lastColon > -1) {
          const possiblePort = hostToValidate.substring(lastColon + 1);
          const parsed = parseInt(possiblePort, 10);
          if (!isNaN(parsed) && parsed > 0 && parsed <= 65535) {
            portFromHost = parsed;
            hostToValidate = hostToValidate.substring(0, lastColon);
          }
        }
      }
      const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;
      const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
      if (!hostnameRegex.test(hostToValidate) && !ipv4Regex.test(hostToValidate) && !ipv6Regex.test(hostToValidate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid SIP Host. Must be a valid hostname (e.g., sip.provider.com), IPv4, or IPv6 address. You may include user@host:port format."
        });
      }
      if (ipv4Regex.test(hostToValidate)) {
        const parts = hostToValidate.split(".").map(Number);
        if (parts.some((p) => p < 0 || p > 255)) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host IP address. Each octet must be between 0 and 255."
          });
        }
      }
      if (providerInfo.hostPattern && !ipv4Regex.test(hostToValidate) && !ipv6Regex.test(hostToValidate)) {
        if (!providerInfo.hostPattern.test(hostToValidate)) {
          return res.status(400).json({
            success: false,
            message: `Invalid SIP Host for ${providerInfo.name}. The hostname must match the ${providerInfo.name} format (e.g., ${providerInfo.hostExample || "check your provider console"}). If using a custom domain, select "Generic SIP" as provider.`
          });
        }
      }
    }
    const finalPort = sipPort || providerInfo.defaultPort;
    if (finalPort && (finalPort < 1 || finalPort > 65535)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SIP port. Must be between 1 and 65535."
      });
    }
    if (engine === "openai-sip") {
      const openaiResult = await db.execute(sql5`
        SELECT value FROM global_settings 
        WHERE key = 'openai_sip_project_id' 
        LIMIT 1
      `);
      const openaiSetting = openaiResult.rows[0];
      if (!openaiSetting?.value) {
        return res.status(400).json({
          success: false,
          message: "OpenAI SIP requires admin to configure OpenAI Project ID first"
        });
      }
    }
    const accessCheck = await SipTrunkService.checkSipAccess(userId, engine);
    if (!accessCheck.allowed) {
      return res.status(403).json({ success: false, message: accessCheck.reason });
    }
    const defaultInboundTransport = provider === "twilio" ? "tcp" : transport || providerInfo.transport;
    const defaultInboundPort = provider === "twilio" ? 5060 : sipPort || providerInfo.defaultPort;
    const trunkData = {
      name,
      engine,
      provider,
      sipHost: sipHost || providerInfo.defaultHost,
      sipPort: sipPort || providerInfo.defaultPort,
      transport: transport || providerInfo.transport,
      inboundTransport: inboundTransport || defaultInboundTransport,
      inboundPort: inboundPort || defaultInboundPort,
      mediaEncryption: mediaEncryption || "disable",
      // Disabled by default for compatibility
      username,
      password
    };
    let trunk = await SipTrunkService.createTrunk(userId, trunkData);
    if (engine === "openai-sip") {
      const provisionResult = await OpenAISipService.provisionTrunk(userId, trunk);
      if (!provisionResult.success) {
        console.warn(`[SIP Trunks] OpenAI SIP provisioning warning: ${provisionResult.error}`);
      } else {
        trunk = await SipTrunkService.getTrunkById(trunk.id, userId) || trunk;
      }
    } else if (engine === "elevenlabs-sip") {
      console.log(`[SIP Trunks] ElevenLabs trunk created - provisioning occurs during phone number import`);
    }
    res.status(201).json({ success: true, data: trunk });
  } catch (error) {
    console.error("[SIP Trunks] Error creating trunk:", error);
    res.status(500).json({ success: false, message: "Failed to create SIP trunk" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunk = await SipTrunkService.getTrunkById(id, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    const updates = req.body;
    const validTransports = ["tcp", "tls", "udp"];
    if (updates.transport !== void 0 && !validTransports.includes(updates.transport)) {
      return res.status(400).json({
        success: false,
        message: `Invalid transport. Must be one of: ${validTransports.join(", ")}`
      });
    }
    if (updates.inboundTransport !== void 0 && !validTransports.includes(updates.inboundTransport)) {
      return res.status(400).json({
        success: false,
        message: `Invalid inbound transport. Must be one of: ${validTransports.join(", ")}`
      });
    }
    const validMediaEncryption = ["disable", "allow", "require"];
    if (updates.mediaEncryption !== void 0 && !validMediaEncryption.includes(updates.mediaEncryption)) {
      return res.status(400).json({
        success: false,
        message: `Invalid media encryption. Must be one of: ${validMediaEncryption.join(", ")}`
      });
    }
    if (updates.sipPort !== void 0) {
      const port = parseInt(updates.sipPort, 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        return res.status(400).json({
          success: false,
          message: "Invalid SIP port. Must be between 1 and 65535."
        });
      }
      updates.sipPort = port;
    }
    if (updates.inboundPort !== void 0) {
      const port = parseInt(updates.inboundPort, 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        return res.status(400).json({
          success: false,
          message: "Invalid inbound port. Must be between 1 and 65535."
        });
      }
      updates.inboundPort = port;
    }
    if (updates.sipHost !== void 0) {
      let hostToValidate = updates.sipHost;
      const atIndex = hostToValidate.indexOf("@");
      if (atIndex > -1) {
        hostToValidate = hostToValidate.substring(atIndex + 1);
      }
      if (hostToValidate.startsWith("[")) {
        const bracketEnd = hostToValidate.indexOf("]");
        if (bracketEnd < 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host. Malformed IPv6 address (missing closing bracket)."
          });
        }
        const ipv6Part = hostToValidate.substring(1, bracketEnd);
        const ipv6Regex2 = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
        if (!ipv6Regex2.test(ipv6Part)) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host. Must be a valid IPv6 address inside brackets."
          });
        }
        const afterBracket = hostToValidate.substring(bracketEnd + 1);
        if (afterBracket.startsWith(":")) {
          const portFromHost = parseInt(afterBracket.substring(1), 10);
          if (isNaN(portFromHost) || portFromHost < 1 || portFromHost > 65535) {
            return res.status(400).json({
              success: false,
              message: "Invalid port in SIP Host. Must be between 1 and 65535."
            });
          }
        }
        hostToValidate = ipv6Part;
      } else {
        const lastColon = hostToValidate.lastIndexOf(":");
        if (lastColon > -1) {
          const possiblePort = hostToValidate.substring(lastColon + 1);
          const parsed = parseInt(possiblePort, 10);
          if (!isNaN(parsed) && parsed > 0 && parsed <= 65535) {
            hostToValidate = hostToValidate.substring(0, lastColon);
          }
        }
      }
      const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;
      const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
      if (!hostnameRegex.test(hostToValidate) && !ipv4Regex.test(hostToValidate) && !ipv6Regex.test(hostToValidate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid SIP Host. Must be a valid hostname (e.g., sip.provider.com), IPv4, or IPv6 address."
        });
      }
      if (ipv4Regex.test(hostToValidate)) {
        const parts = hostToValidate.split(".").map(Number);
        if (parts.some((p) => p < 0 || p > 255)) {
          return res.status(400).json({
            success: false,
            message: "Invalid SIP Host IP address. Each octet must be between 0 and 255."
          });
        }
      }
    }
    const updatedTrunk = await SipTrunkService.updateTrunk(id, userId, updates);
    res.json({ success: true, data: updatedTrunk });
  } catch (error) {
    console.error("[SIP Trunks] Error updating trunk:", error);
    res.status(500).json({ success: false, message: "Failed to update SIP trunk" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunk = await SipTrunkService.getTrunkById(id, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    await SipTrunkService.deleteTrunk(id, userId);
    res.json({ success: true, message: "SIP trunk deleted successfully" });
  } catch (error) {
    console.error("[SIP Trunks] Error deleting trunk:", error);
    res.status(500).json({ success: false, message: "Failed to delete SIP trunk" });
  }
});
router.post("/:id/test", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunk = await SipTrunkService.getTrunkById(id, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    const result = await SipTrunkService.testTrunkConnection(id);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("[SIP Trunks] Error testing trunk:", error);
    res.status(500).json({ success: false, message: "Failed to test SIP trunk connection" });
  }
});
router.post("/:id/reprovision-all", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const trunk = await SipTrunkService.getTrunkById(id, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    if (trunk.engine !== "elevenlabs-sip") {
      return res.status(400).json({
        success: false,
        message: "Re-provisioning is only available for ElevenLabs SIP trunks"
      });
    }
    const phoneNumbersResult = await db.execute(sql5`
      SELECT id, phone_number, external_elevenlabs_phone_id
      FROM sip_phone_numbers
      WHERE sip_trunk_id = ${id} AND user_id = ${userId} AND engine = 'elevenlabs-sip'
    `);
    const phoneNumbers2 = phoneNumbersResult.rows;
    if (phoneNumbers2.length === 0) {
      return res.json({
        success: true,
        message: "No phone numbers to re-provision",
        data: { updated: 0, failed: 0, total: 0 }
      });
    }
    let updated = 0;
    let failed = 0;
    const errors = [];
    for (const phone of phoneNumbers2) {
      if (!phone.external_elevenlabs_phone_id) {
        console.log(`[SIP Trunks] Skipping ${phone.phone_number} - no ElevenLabs ID`);
        continue;
      }
      try {
        await ElevenLabsSipService.updatePhoneNumberSipConfig(
          userId,
          phone.external_elevenlabs_phone_id,
          trunk,
          phone.phone_number
        );
        updated++;
        console.log(`[SIP Trunks] Re-provisioned ${phone.phone_number}`);
      } catch (err) {
        failed++;
        errors.push(`${phone.phone_number}: ${err.message}`);
        console.error(`[SIP Trunks] Failed to re-provision ${phone.phone_number}:`, err.message);
      }
    }
    res.json({
      success: true,
      message: `Re-provisioned ${updated} of ${phoneNumbers2.length} phone numbers`,
      data: {
        updated,
        failed,
        total: phoneNumbers2.length,
        errors: errors.length > 0 ? errors : void 0
      }
    });
  } catch (error) {
    console.error("[SIP Trunks] Error re-provisioning trunk:", error);
    res.status(500).json({ success: false, message: "Failed to re-provision SIP trunk" });
  }
});
var user_trunks_routes_default = router;

// plugins/sip-engine/routes/user-phone-numbers.routes.ts
import { Router as Router2 } from "express";
init_types();
init_service_registry();
init_db();
import { sql as sql6 } from "drizzle-orm";
var router2 = Router2();
var importRateLimits = /* @__PURE__ */ new Map();
var IMPORT_RATE_LIMIT = 10;
var IMPORT_RATE_WINDOW = 6e4;
var RATE_LIMIT_MAX_ENTRIES = 1e4;
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of importRateLimits) {
    if (now > val.resetTime) importRateLimits.delete(key);
  }
}, 6e4);
function checkImportRateLimit(userId) {
  const now = Date.now();
  const userLimit = importRateLimits.get(userId);
  if (!userLimit || now > userLimit.resetTime) {
    if (importRateLimits.size >= RATE_LIMIT_MAX_ENTRIES) {
      for (const [key, val] of importRateLimits) {
        if (now > val.resetTime) importRateLimits.delete(key);
      }
      if (importRateLimits.size >= RATE_LIMIT_MAX_ENTRIES) {
        return false;
      }
    }
    importRateLimits.set(userId, { count: 1, resetTime: now + IMPORT_RATE_WINDOW });
    return true;
  }
  if (userLimit.count >= IMPORT_RATE_LIMIT) {
    return false;
  }
  userLimit.count++;
  return true;
}
router2.get("/", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumbers2 = await SipTrunkService.getUserPhoneNumbers(userId);
    res.json({ success: true, data: phoneNumbers2 });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error fetching:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP phone numbers" });
  }
});
router2.get("/debug/elevenlabs-comparison", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const elevenLabsNumbers = await ElevenLabsSipService.listAllPhoneNumbers(userId);
    const ourNumbers = await SipTrunkService.getUserPhoneNumbers(userId);
    const agentResult = await db.execute(sql6`
      SELECT id, name, eleven_labs_agent_id FROM agents WHERE user_id = ${userId}
    `);
    const agents2 = agentResult.rows;
    const agentMap = {};
    agents2.forEach((a) => {
      if (a.eleven_labs_agent_id) {
        agentMap[a.eleven_labs_agent_id] = a;
      }
    });
    const comparison = elevenLabsNumbers.map((elPhone) => {
      const ourMatch = ourNumbers.find((p) => p.externalElevenLabsPhoneId === elPhone.phone_number_id);
      const assignedAgent = elPhone.agent_id ? agentMap[elPhone.agent_id] : null;
      return {
        elevenLabsPhoneId: elPhone.phone_number_id,
        phoneNumber: elPhone.phone_number,
        name: elPhone.name || elPhone.label,
        provider: elPhone.provider,
        // What ElevenLabs has
        elevenLabsAgentId: elPhone.agent_id || "none",
        elevenLabsAgentName: assignedAgent?.name || "unknown (not in our DB)",
        // What our DB has
        ourDbMatch: ourMatch ? {
          id: ourMatch.id,
          agentId: ourMatch.agentId,
          label: ourMatch.label
        } : null,
        // Status
        synced: ourMatch && ourMatch.agentId ? assignedAgent?.id === ourMatch.agentId : false,
        issue: !ourMatch ? "NOT IN OUR DB" : !ourMatch.agentId ? "NO AGENT ASSIGNED IN OUR DB" : !elPhone.agent_id ? "NO AGENT IN ELEVENLABS" : assignedAgent?.id !== ourMatch.agentId ? "AGENT MISMATCH" : "OK"
      };
    });
    res.json({
      success: true,
      message: "Comparison of ElevenLabs phone numbers vs our database",
      elevenlabsCount: elevenLabsNumbers.length,
      ourDbCount: ourNumbers.length,
      comparison
    });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error in debug comparison:", error);
    res.status(500).json({ success: false, message: "Failed to compare phone numbers" });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    res.json({ success: true, data: phoneNumber });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error fetching:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP phone number" });
  }
});
router2.post("/import", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!checkImportRateLimit(userId)) {
      return res.status(429).json({
        success: false,
        message: "Too many import requests. Please wait a minute before trying again."
      });
    }
    const { sipTrunkId, phoneNumber, label, agentId, customHeaders } = req.body;
    if (!sipTrunkId || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: sipTrunkId, phoneNumber"
      });
    }
    const digitsOnly = phoneNumber.replace(/[^\d]/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must contain between 7 and 15 digits (e.g., +1234567890)."
      });
    }
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, "");
    if (!phoneRegex.test(cleanedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format. Must start with a country code (e.g., +1234567890 or 1234567890). Cannot start with 0."
      });
    }
    const numberWithoutPlus = cleanedPhone.startsWith("+") ? cleanedPhone.slice(1) : cleanedPhone;
    const hasValidCountryCode = VALID_COUNTRY_CODES.some((code) => numberWithoutPlus.startsWith(code));
    if (!hasValidCountryCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid country code. The phone number must start with a valid country calling code (e.g., +1 for US, +44 for UK, +91 for India)."
      });
    }
    const existingNumbers = await SipTrunkService.getUserPhoneNumbers(userId);
    const inputDigits = cleanedPhone.replace(/[^\d]/g, "");
    const duplicate = existingNumbers.find((n) => {
      const existingDigits = (n.phoneNumber || "").replace(/[^\d]/g, "");
      return existingDigits === inputDigits;
    });
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: `This phone number (${phoneNumber}) is already imported. Each number can only be imported once.`
      });
    }
    const trunk = await SipTrunkService.getTrunkById(sipTrunkId, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "SIP trunk not found" });
    }
    const importRequest = {
      sipTrunkId,
      phoneNumber,
      label,
      agentId,
      customHeaders
    };
    let result;
    if (trunk.engine === "elevenlabs-sip") {
      result = await ElevenLabsSipService.importPhoneNumber(userId, trunk, importRequest);
    } else if (trunk.engine === "openai-sip") {
      result = await OpenAISipService.importPhoneNumber(userId, trunk, phoneNumber, label, agentId);
    } else {
      result = await SipTrunkService.importPhoneNumber(userId, trunk, importRequest);
    }
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error importing:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: "Failed to import SIP phone number" });
  }
});
router2.put("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    const updates = req.body;
    const updated = await SipTrunkService.updatePhoneNumber(id, userId, updates);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error updating:", error);
    res.status(500).json({ success: false, message: "Failed to update SIP phone number" });
  }
});
router2.post("/:id/assign-agent", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { agentId } = req.body;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    if (agentId) {
      const { canAssignSipAgent } = getSipServices();
      const creditCheck = await canAssignSipAgent(userId);
      if (!creditCheck.allowed) {
        return res.status(403).json({
          success: false,
          message: `Insufficient credits to assign an agent. You need at least ${creditCheck.threshold} credits (current balance: ${creditCheck.balance}). Please recharge your credits first.`
        });
      }
    }
    const updated = await SipTrunkService.assignAgentToPhoneNumber(id, userId, agentId);
    if (phoneNumber.engine === "elevenlabs-sip" && phoneNumber.externalElevenLabsPhoneId) {
      await ElevenLabsSipService.assignAgentToPhoneNumber(
        userId,
        phoneNumber.externalElevenLabsPhoneId,
        agentId
      );
      if (agentId) {
        try {
          const { ElevenLabsService, getCredentialForAgent } = getSipServices();
          const agentResult = await db.execute(sql6`
            SELECT eleven_labs_agent_id, appointment_booking_enabled, user_id
            FROM agents WHERE id = ${agentId} AND user_id = ${userId} LIMIT 1
          `);
          const agent = agentResult.rows[0];
          const credential = await getCredentialForAgent(agentId);
          if (agent?.eleven_labs_agent_id && credential) {
            const elevenLabsService = new ElevenLabsService(credential.apiKey);
            if (agent?.appointment_booking_enabled) {
              console.log(`[SIP Phone Numbers] Refreshing appointment tool for agent ${agentId}...`);
              await elevenLabsService.refreshAppointmentToolWithCurrentDate(agent.eleven_labs_agent_id);
              console.log(`[SIP Phone Numbers] Appointment tool refreshed for agent ${agentId}`);
            }
            try {
              const elAgent = await elevenLabsService.getAgent(agent.eleven_labs_agent_id);
              const promptTools = elAgent?.conversation_config?.agent?.prompt?.tools;
              if (Array.isArray(promptTools)) {
                let needsPatch = false;
                const updatedTools = promptTools.map((tool) => {
                  if (tool.type === "system" && tool.name === "transfer_to_number" && tool.params?.transfers) {
                    const updatedTransfers = tool.params.transfers.map((t) => {
                      if (t.transfer_type === "conference") {
                        needsPatch = true;
                        return { ...t, transfer_type: "sip_refer" };
                      }
                      return t;
                    });
                    return { ...tool, params: { ...tool.params, transfers: updatedTransfers } };
                  }
                  return tool;
                });
                if (needsPatch) {
                  console.log(`[SIP Phone Numbers] Patching transfer tool to sip_refer for SIP agent ${agent.eleven_labs_agent_id}...`);
                  const patchRes = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agent.eleven_labs_agent_id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      "xi-api-key": credential.apiKey
                    },
                    body: JSON.stringify({
                      conversation_config: {
                        agent: {
                          prompt: {
                            tools: updatedTools
                          }
                        }
                      }
                    })
                  });
                  if (!patchRes.ok) {
                    const errText = await patchRes.text();
                    console.warn(`[SIP Phone Numbers] Transfer tool patch failed: ${patchRes.status} - ${errText}`);
                  } else {
                    console.log(`[SIP Phone Numbers] Transfer tool patched to sip_refer successfully`);
                  }
                }
              }
            } catch (transferErr) {
              console.warn(`[SIP Phone Numbers] Warning: Could not patch transfer tool to sip_refer: ${transferErr.message}`);
            }
          } else if (!credential) {
            console.warn(`[SIP Phone Numbers] No ElevenLabs credential found for agent ${agentId}`);
          }
        } catch (toolError) {
          console.warn(`[SIP Phone Numbers] Warning: Could not refresh agent tools: ${toolError.message}`);
        }
      }
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error assigning agent:", error);
    res.status(500).json({ success: false, message: "Failed to assign agent to phone number" });
  }
});
router2.post("/:id/resync", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    if (phoneNumber.engine !== "elevenlabs-sip") {
      return res.status(400).json({ success: false, message: "Resync is only available for ElevenLabs SIP phone numbers" });
    }
    if (!phoneNumber.externalElevenLabsPhoneId) {
      return res.status(400).json({ success: false, message: "Phone number is not linked to ElevenLabs" });
    }
    if (!phoneNumber.agentId) {
      return res.status(400).json({ success: false, message: "No agent assigned to this phone number" });
    }
    console.log(`[SIP Phone Numbers] Resyncing phone ${phoneNumber.phoneNumber} agent ${phoneNumber.agentId} to ElevenLabs...`);
    await ElevenLabsSipService.assignAgentToPhoneNumber(
      userId,
      phoneNumber.externalElevenLabsPhoneId,
      phoneNumber.agentId
    );
    try {
      const { ElevenLabsService, getCredentialForAgent } = getSipServices();
      const agentResult = await db.execute(sql6`
        SELECT eleven_labs_agent_id FROM agents WHERE id = ${phoneNumber.agentId} AND user_id = ${userId} LIMIT 1
      `);
      const agent = agentResult.rows[0];
      if (agent?.eleven_labs_agent_id) {
        const credential = await getCredentialForAgent(phoneNumber.agentId);
        if (credential) {
          const elevenLabsService = new ElevenLabsService(credential.apiKey);
          const elAgent = await elevenLabsService.getAgent(agent.eleven_labs_agent_id);
          const promptTools = elAgent?.conversation_config?.agent?.prompt?.tools;
          if (Array.isArray(promptTools)) {
            let needsPatch = false;
            const updatedTools = promptTools.map((tool) => {
              if (tool.type === "system" && tool.name === "transfer_to_number" && tool.params?.transfers) {
                const updatedTransfers = tool.params.transfers.map((t) => {
                  if (t.transfer_type === "conference") {
                    needsPatch = true;
                    return { ...t, transfer_type: "sip_refer" };
                  }
                  return t;
                });
                return { ...tool, params: { ...tool.params, transfers: updatedTransfers } };
              }
              return tool;
            });
            if (needsPatch) {
              console.log(`[SIP Resync] Patching transfer tool to sip_refer for agent ${agent.eleven_labs_agent_id}...`);
              const patchRes = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agent.eleven_labs_agent_id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "xi-api-key": credential.apiKey
                },
                body: JSON.stringify({
                  conversation_config: {
                    agent: {
                      prompt: {
                        tools: updatedTools
                      }
                    }
                  }
                })
              });
              if (!patchRes.ok) {
                const errText = await patchRes.text();
                console.warn(`[SIP Resync] Transfer tool patch failed: ${patchRes.status} - ${errText}`);
              } else {
                console.log(`[SIP Resync] Transfer tool patched to sip_refer successfully`);
              }
            }
          }
        }
      }
    } catch (transferErr) {
      console.warn(`[SIP Resync] Warning: Could not patch transfer tool: ${transferErr.message}`);
    }
    console.log(`[SIP Phone Numbers] Resync complete for phone ${phoneNumber.phoneNumber}`);
    res.json({ success: true, message: "Phone number agent resynced to ElevenLabs successfully" });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error resyncing:", error);
    res.status(500).json({ success: false, message: "Failed to resync phone number" });
  }
});
router2.delete("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    if (phoneNumber.engine === "elevenlabs-sip" && phoneNumber.externalElevenLabsPhoneId) {
      try {
        await ElevenLabsSipService.deletePhoneNumber(userId, phoneNumber.externalElevenLabsPhoneId);
      } catch (elError) {
        console.warn(`[SIP Phone Numbers] ElevenLabs cleanup failed for ${phoneNumber.externalElevenLabsPhoneId}: ${elError.message} - proceeding with database delete`);
      }
    }
    await SipTrunkService.deletePhoneNumber(id, userId);
    res.json({ success: true, message: "Phone number deleted successfully" });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error deleting:", error);
    if (error.message?.includes("not found or access denied")) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    res.status(500).json({ success: false, message: "Failed to delete phone number" });
  }
});
router2.get("/:id/elevenlabs-details", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    if (phoneNumber.engine !== "elevenlabs-sip" || !phoneNumber.externalElevenLabsPhoneId) {
      return res.status(400).json({ success: false, message: "Not an ElevenLabs SIP phone number" });
    }
    const details = await ElevenLabsSipService.getPhoneNumberDetails(
      userId,
      phoneNumber.externalElevenLabsPhoneId
    );
    res.json({ success: true, data: details });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error fetching ElevenLabs details:", error);
    res.status(500).json({ success: false, message: "Failed to fetch phone number details" });
  }
});
router2.post("/:id/reprovision", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const phoneNumber = await SipTrunkService.getPhoneNumberById(id, userId);
    if (!phoneNumber) {
      return res.status(404).json({ success: false, message: "Phone number not found" });
    }
    if (phoneNumber.engine !== "elevenlabs-sip" || !phoneNumber.externalElevenLabsPhoneId) {
      return res.status(400).json({ success: false, message: "Re-provisioning only available for ElevenLabs SIP phone numbers" });
    }
    const trunk = await SipTrunkService.getTrunkById(phoneNumber.sipTrunkId, userId);
    if (!trunk) {
      return res.status(404).json({ success: false, message: "Associated SIP trunk not found" });
    }
    const result = await ElevenLabsSipService.updatePhoneNumberSipConfig(
      userId,
      phoneNumber.externalElevenLabsPhoneId,
      trunk,
      phoneNumber.phoneNumber
    );
    if (phoneNumber.agentId) {
      try {
        const { ElevenLabsService, getCredentialForAgent } = getSipServices();
        const agentResult = await db.execute(sql6`
          SELECT eleven_labs_agent_id FROM agents WHERE id = ${phoneNumber.agentId} AND user_id = ${userId} LIMIT 1
        `);
        const agent = agentResult.rows[0];
        if (agent?.eleven_labs_agent_id) {
          const credential = await getCredentialForAgent(phoneNumber.agentId);
          if (credential) {
            const elevenLabsService = new ElevenLabsService(credential.apiKey);
            const elAgent = await elevenLabsService.getAgent(agent.eleven_labs_agent_id);
            const promptTools = elAgent?.conversation_config?.agent?.prompt?.tools;
            if (Array.isArray(promptTools)) {
              let needsPatch = false;
              const updatedTools = promptTools.map((tool) => {
                if (tool.type === "system" && tool.name === "transfer_to_number" && tool.params?.transfers) {
                  const updatedTransfers = tool.params.transfers.map((t) => {
                    if (t.transfer_type === "conference") {
                      needsPatch = true;
                      return { ...t, transfer_type: "sip_refer" };
                    }
                    return t;
                  });
                  return { ...tool, params: { ...tool.params, transfers: updatedTransfers } };
                }
                return tool;
              });
              if (needsPatch) {
                console.log(`[SIP Reprovision] Patching transfer tool to sip_refer for agent ${agent.eleven_labs_agent_id}...`);
                const patchRes = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agent.eleven_labs_agent_id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    "xi-api-key": credential.apiKey
                  },
                  body: JSON.stringify({
                    conversation_config: {
                      agent: {
                        prompt: {
                          tools: updatedTools
                        }
                      }
                    }
                  })
                });
                if (!patchRes.ok) {
                  const errText = await patchRes.text();
                  console.warn(`[SIP Reprovision] Transfer tool patch failed: ${patchRes.status} - ${errText}`);
                } else {
                  console.log(`[SIP Reprovision] Transfer tool patched to sip_refer successfully`);
                }
              }
            }
          }
        }
      } catch (transferErr) {
        console.warn(`[SIP Reprovision] Warning: Could not patch transfer tool: ${transferErr.message}`);
      }
    }
    res.json({
      success: true,
      message: "Phone number SIP configuration updated successfully. Inbound calls should now be enabled.",
      data: result
    });
  } catch (error) {
    console.error("[SIP Phone Numbers] Error re-provisioning:", error);
    res.status(500).json({ success: false, message: "Failed to re-provision phone number" });
  }
});
var user_phone_numbers_routes_default = router2;

// plugins/sip-engine/routes/admin-sip.routes.ts
import { Router as Router3 } from "express";
import { z as z2 } from "zod";
var router3 = Router3();
router3.get("/settings", async (req, res) => {
  try {
    const settings = await SipTrunkService.getAdminSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Admin SIP] Error fetching settings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP settings" });
  }
});
router3.put("/settings", async (req, res) => {
  try {
    const updates = req.body;
    const settings = await SipTrunkService.updateAdminSettings(updates);
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Admin SIP] Error updating settings:", error);
    res.status(500).json({ success: false, message: "Failed to update SIP settings" });
  }
});
router3.get("/openai-sip/config", async (req, res) => {
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql8 } = await import("drizzle-orm");
    let projectId = "";
    let webhookSecret = "";
    try {
      projectId = await OpenAISipService.getOpenAIProjectId();
    } catch (e) {
    }
    try {
      const secretResult = await db2.execute(sql8`
        SELECT value FROM global_settings 
        WHERE key = 'openai_sip_webhook_secret' 
        LIMIT 1
      `);
      const secretRow = secretResult.rows[0];
      webhookSecret = secretRow?.value || "";
    } catch (e) {
    }
    const sipEndpoint = projectId ? OpenAISipService.getSipEndpoint(projectId) : "";
    const baseUrl = process.env.BASE_URL || req.get("origin") || "https://your-domain.com";
    res.json({
      success: true,
      data: {
        sipEndpoint,
        projectId,
        webhookSecret: webhookSecret ? "********" : "",
        // Masked for security
        webhookSecretSet: !!webhookSecret,
        webhookUrl: `${baseUrl}/api/openai-sip/webhook`,
        instructions: [
          "Go to platform.openai.com and navigate to Settings > Project > General to find your Project ID",
          "Navigate to Settings > Project > Webhooks and create a new webhook",
          'Enter the Webhook URL shown below and select "realtime.call.incoming" event',
          "Copy the Webhook Secret from OpenAI and paste it below",
          "Configure your SIP trunk provider to point to the SIP Endpoint",
          "Import phone numbers in AgentLabs and assign AI agents",
          "Test by calling one of your imported numbers"
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch OpenAI SIP configuration" });
  }
});
router3.post("/openai-sip/project-id", async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required"
      });
    }
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql8 } = await import("drizzle-orm");
    await db2.execute(sql8`
      INSERT INTO global_settings (id, key, value, description)
      VALUES (gen_random_uuid(), 'openai_sip_project_id', to_jsonb(${projectId}::text), 'OpenAI Project ID for SIP integration')
      ON CONFLICT (key) DO UPDATE SET value = to_jsonb(${projectId}::text), updated_at = NOW()
    `);
    res.json({
      success: true,
      data: {
        projectId,
        sipEndpoint: OpenAISipService.getSipEndpoint(projectId)
      }
    });
  } catch (error) {
    console.error("[Admin SIP] Error setting OpenAI project ID:", error);
    res.status(500).json({ success: false, message: "Failed to set OpenAI project ID" });
  }
});
router3.post("/openai-sip/webhook-secret", async (req, res) => {
  try {
    const { webhookSecret } = req.body;
    if (!webhookSecret) {
      return res.status(400).json({
        success: false,
        message: "Webhook secret is required"
      });
    }
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql8 } = await import("drizzle-orm");
    await db2.execute(sql8`
      INSERT INTO global_settings (id, key, value, description)
      VALUES (gen_random_uuid(), 'openai_sip_webhook_secret', to_jsonb(${webhookSecret}::text), 'OpenAI webhook secret for signature verification')
      ON CONFLICT (key) DO UPDATE SET value = to_jsonb(${webhookSecret}::text), updated_at = NOW()
    `);
    console.log("[Admin SIP] OpenAI webhook secret saved");
    res.json({
      success: true,
      message: "Webhook secret saved successfully"
    });
  } catch (error) {
    console.error("[Admin SIP] Error setting webhook secret:", error);
    res.status(500).json({ success: false, message: "Failed to set webhook secret" });
  }
});
router3.get("/trunks", async (req, res) => {
  try {
    const { userId, engine, status } = req.query;
    const filters = {
      userId,
      engine,
      isActive: status === "active" ? true : status === "inactive" ? false : void 0
    };
    const trunks = await SipTrunkService.getAllTrunks(filters);
    res.json({ success: true, data: trunks });
  } catch (error) {
    console.error("[Admin SIP] Error fetching trunks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP trunks" });
  }
});
router3.get("/phone-numbers", async (req, res) => {
  try {
    const { userId, engine } = req.query;
    const filters = {
      userId,
      engine
    };
    const phoneNumbers2 = await SipTrunkService.getAllPhoneNumbers(filters);
    res.json({ success: true, data: phoneNumbers2 });
  } catch (error) {
    console.error("[Admin SIP] Error fetching phone numbers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP phone numbers" });
  }
});
router3.get("/calls", async (req, res) => {
  try {
    const { userId, engine, status, startDate, endDate, limit, offset } = req.query;
    const filters = {
      userId,
      engine,
      status,
      startDate: startDate ? new Date(startDate) : void 0,
      endDate: endDate ? new Date(endDate) : void 0,
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };
    const calls2 = await SipTrunkService.getSipCalls(filters);
    res.json({ success: true, data: calls2 });
  } catch (error) {
    console.error("[Admin SIP] Error fetching calls:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP calls" });
  }
});
router3.get("/plans/:planId/sip-settings", async (req, res) => {
  try {
    const { planId } = req.params;
    const settings = await SipTrunkService.getPlanSipSettings(planId);
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Admin SIP] Error fetching plan settings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plan SIP settings" });
  }
});
router3.put("/plans/:planId/sip-settings", async (req, res) => {
  try {
    const { planId } = req.params;
    const planSipSettingsSchema = z2.object({
      sipEnabled: z2.boolean().optional(),
      maxConcurrentSipCalls: z2.number().int().min(0).max(1e3).optional(),
      sipEnginesAllowed: z2.array(z2.enum(["elevenlabs-sip", "openai-sip"])).optional()
    });
    const parseResult = planSipSettingsSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Invalid plan SIP settings", details: parseResult.error.flatten().fieldErrors }
      });
    }
    const { sipEnabled, maxConcurrentSipCalls, sipEnginesAllowed } = parseResult.data;
    const settings = await SipTrunkService.updatePlanSipSettings(planId, {
      sipEnabled,
      maxConcurrentSipCalls,
      sipEnginesAllowed
    });
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Admin SIP] Error updating plan settings:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update plan SIP settings" } });
  }
});
router3.get("/stats", async (req, res) => {
  try {
    const stats = await SipTrunkService.getAdminStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("[Admin SIP] Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch SIP stats" });
  }
});
router3.get("/providers", async (req, res) => {
  const { SIP_PROVIDER_INFO: SIP_PROVIDER_INFO2 } = await Promise.resolve().then(() => (init_types(), types_exports));
  res.json({
    success: true,
    data: SIP_PROVIDER_INFO2
  });
});
var admin_sip_routes_default = router3;

// plugins/sip-engine/routes/openai-sip-webhooks.routes.ts
import { Router as Router4 } from "express";
var router4 = Router4();
var WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS = 300;
var processedWebhookIds = /* @__PURE__ */ new Map();
var WEBHOOK_DEDUP_WINDOW_MS = 3e5;
var WEBHOOK_DEDUP_MAX_ENTRIES = 1e4;
function cleanupExpiredWebhookIds() {
  const cutoff = Date.now() - WEBHOOK_DEDUP_WINDOW_MS;
  for (const [id, ts] of processedWebhookIds) {
    if (ts < cutoff) processedWebhookIds.delete(id);
  }
}
setInterval(cleanupExpiredWebhookIds, 6e4);
async function verifyWebhookSignature(req) {
  const webhookId = req.headers["webhook-id"];
  const webhookTimestamp = req.headers["webhook-timestamp"];
  const webhookSignature = req.headers["webhook-signature"];
  const secret = await OpenAISipService.getWebhookSecret();
  if (!secret) {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      console.error("[OpenAI SIP] SECURITY: Rejecting webhook - no secret configured in production");
      return { valid: false, reason: "Webhook secret not configured. Configure in Admin > Plugins > SIP Engine." };
    }
    console.warn("[OpenAI SIP] SECURITY WARNING: No webhook secret configured - accepting in development mode only");
    return { valid: true, reason: "No secret configured (development mode)" };
  }
  if (!webhookSignature) {
    return { valid: false, reason: "Missing webhook-signature header" };
  }
  if (!webhookId) {
    return { valid: false, reason: "Missing webhook-id header" };
  }
  if (!webhookTimestamp) {
    return { valid: false, reason: "Missing webhook-timestamp header" };
  }
  const timestampNum = parseInt(webhookTimestamp, 10);
  if (isNaN(timestampNum)) {
    return { valid: false, reason: "Invalid webhook-timestamp format" };
  }
  const now = Math.floor(Date.now() / 1e3);
  if (Math.abs(now - timestampNum) > WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS) {
    console.error(`[OpenAI SIP] Webhook timestamp outside tolerance: ${timestampNum} vs now ${now}`);
    return { valid: false, reason: "Webhook timestamp outside acceptable window (possible replay attack)" };
  }
  cleanupExpiredWebhookIds();
  if (processedWebhookIds.has(webhookId)) {
    console.warn(`[OpenAI SIP] Duplicate webhook-id rejected: ${webhookId}`);
    return { valid: false, reason: "Duplicate webhook-id (replay rejected)" };
  }
  if (processedWebhookIds.size >= WEBHOOK_DEDUP_MAX_ENTRIES) {
    const oldest = [...processedWebhookIds.entries()].sort((a, b) => a[1] - b[1]);
    const toRemove = oldest.slice(0, Math.floor(WEBHOOK_DEDUP_MAX_ENTRIES * 0.2));
    for (const [id] of toRemove) processedWebhookIds.delete(id);
  }
  const rawBody = req.rawBody ? req.rawBody.toString("utf8") : JSON.stringify(req.body);
  const isValid = await OpenAISipService.verifyWebhookSignature(
    rawBody,
    webhookSignature,
    webhookId,
    webhookTimestamp
  );
  if (isValid) {
    processedWebhookIds.set(webhookId, Date.now());
  }
  return { valid: isValid, reason: isValid ? void 0 : "Signature verification failed" };
}
router4.post("/webhook", async (req, res) => {
  try {
    const verification = await verifyWebhookSignature(req);
    if (!verification.valid) {
      console.error(`[OpenAI SIP] Webhook rejected: ${verification.reason}`);
      return res.status(401).json({ success: false, message: verification.reason || "Invalid signature" });
    }
    const event = req.body;
    console.log(`[OpenAI SIP] Webhook received: ${event.type}`);
    switch (event.type) {
      case "realtime.call.incoming": {
        const result = await OpenAISipService.handleIncomingCall(event);
        if (result.action === "accept" && result.config) {
          const { checkUserCreditBalance } = (await Promise.resolve().then(() => (init_service_registry(), service_registry_exports))).getSipServices();
          const userId = result.userId;
          if (userId) {
            const creditCheck = await checkUserCreditBalance(userId);
            if (!creditCheck.hasCredits) {
              console.error(`\u{1F6AB} [OpenAI SIP] User ${userId} has 0 credits - rejecting incoming call ${event.data.call_id}`);
              await OpenAISipService.rejectCall(event.data.call_id, "Insufficient credits");
              break;
            }
          }
          const acceptResult = await OpenAISipService.acceptCall(event.data.call_id, result.config);
          if (!acceptResult.success) {
            console.error(`[OpenAI SIP] Failed to accept call: ${acceptResult.error}`);
          }
        } else {
          await OpenAISipService.rejectCall(event.data.call_id, result.reason || "Call rejected");
        }
        break;
      }
      case "realtime.call.completed": {
        await OpenAISipService.handleCallCompleted(
          event.data.call_id,
          event.data.duration_seconds,
          event.data.transcript
        );
        break;
      }
      case "realtime.call.failed": {
        await OpenAISipService.handleCallFailed(
          event.data.call_id,
          event.data.reason || "Unknown error"
        );
        break;
      }
      default:
        console.log(`[OpenAI SIP] Unhandled event type: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("[OpenAI SIP] Error handling webhook:", error);
    res.status(500).json({ success: false, message: "Internal webhook processing error" });
  }
});
router4.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      engine: "openai-sip",
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
});
router4.get("/config", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  try {
    const projectId = await OpenAISipService.getOpenAIProjectId();
    const sipEndpoint = OpenAISipService.getSipEndpoint(projectId);
    res.json({
      success: true,
      data: {
        sipEndpoint,
        projectId,
        webhookUrl: `${process.env.BASE_URL || "https://your-domain.com"}/api/openai-sip/webhook`,
        instructions: [
          "1. Configure your SIP trunk to point to the sipEndpoint above",
          "2. Set the webhookUrl in your OpenAI Platform project settings",
          "3. Import phone numbers and assign agents in AgentLabs",
          "4. Incoming calls will be handled by the assigned AI agent"
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch SIP configuration" });
  }
});
var openai_sip_webhooks_routes_default = router4;

// plugins/sip-engine/routes/openai-sip-stream.ts
init_db();
import { WebSocketServer, WebSocket } from "ws";
import { sql as sql7 } from "drizzle-orm";
var sharedWss = null;
var isSetupComplete = false;
var activeStreams = /* @__PURE__ */ new Map();
function setupOpenAISipStream(httpServer) {
  if (isSetupComplete) {
    console.log("[OpenAI SIP Stream] Already initialized, skipping duplicate setup");
    return;
  }
  isSetupComplete = true;
  if (!sharedWss) {
    sharedWss = new WebSocketServer({ noServer: true });
    console.log("[OpenAI SIP Stream] Shared WebSocketServer created");
  }
  httpServer.on("upgrade", (request, socket, head) => {
    const pathname = request.url?.split("?")[0] || "";
    if (pathname.startsWith("/api/openai-sip/stream/")) {
      const callId = pathname.split("/api/openai-sip/stream/")[1];
      if (!callId) {
        console.error(`[OpenAI SIP Stream] Invalid stream URL: ${pathname}`);
        socket.destroy();
        return;
      }
      console.log(`[OpenAI SIP Stream] Handling WebSocket upgrade for call: ${callId}`);
      sharedWss.handleUpgrade(request, socket, head, (ws) => {
        console.log(`[OpenAI SIP Stream] WebSocket connected for call: ${callId}`);
        handleOpenAISipStreamConnection(ws, callId);
      });
    }
  });
  console.log("[OpenAI SIP Stream] WebSocket stream endpoint registered");
}
function handleOpenAISipStreamConnection(ws, callId) {
  let isClosing = false;
  let heartbeatInterval = null;
  let lastActivityTime = Date.now();
  const HEARTBEAT_INTERVAL = 3e4;
  const INACTIVITY_TIMEOUT = 3e5;
  activeStreams.set(callId, {
    ws,
    callId,
    transcript: []
  });
  heartbeatInterval = setInterval(() => {
    if (isClosing) return;
    const inactiveTime = Date.now() - lastActivityTime;
    if (inactiveTime > INACTIVITY_TIMEOUT) {
      console.log(`[OpenAI SIP Stream] Closing stale connection for ${callId}`);
      cleanupAndClose();
      return;
    }
    if (ws.readyState === WebSocket.OPEN) {
      try {
        ws.ping();
      } catch (e) {
        console.error(`[OpenAI SIP Stream] Heartbeat ping failed for ${callId}`);
      }
    }
  }, HEARTBEAT_INTERVAL);
  function cleanupAndClose() {
    if (isClosing) return;
    isClosing = true;
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    const stream = activeStreams.get(callId);
    if (stream && stream.transcript.length > 0) {
      db.execute(sql7`
        UPDATE sip_calls SET 
          transcript = ${JSON.stringify(stream.transcript)},
          updated_at = NOW()
        WHERE openai_call_id = ${callId}
      `).catch((err) => {
        console.error(`[OpenAI SIP Stream] Error saving transcript for ${callId}:`, err);
      });
    }
    activeStreams.delete(callId);
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      try {
        ws.close();
      } catch (e) {
        console.error(`[OpenAI SIP Stream] Error closing WebSocket for ${callId}:`, e);
      }
    }
    console.log(`[OpenAI SIP Stream] Cleaned up connection for ${callId}`);
  }
  ws.on("pong", () => {
    lastActivityTime = Date.now();
  });
  ws.on("message", async (data) => {
    lastActivityTime = Date.now();
    try {
      const rawData = typeof data === "string" ? data : String(data);
      if (!rawData || rawData.trim() === "") {
        return;
      }
      let message;
      try {
        message = JSON.parse(rawData);
      } catch (parseError) {
        console.warn(`[OpenAI SIP Stream] Invalid JSON for ${callId}`);
        return;
      }
      const stream = activeStreams.get(callId);
      switch (message.type) {
        case "transcript.update":
          if (stream && message.data) {
            stream.transcript.push({
              role: message.data.role || "unknown",
              content: message.data.content || "",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
          break;
        case "call.completed":
          console.log(`[OpenAI SIP Stream] Call completed: ${callId}`);
          cleanupAndClose();
          break;
        default:
          console.log(`[OpenAI SIP Stream] Received: ${message.type}`);
      }
    } catch (error) {
      console.error(`[OpenAI SIP Stream] Error processing message for ${callId}:`, error);
    }
  });
  ws.on("close", () => {
    console.log(`[OpenAI SIP Stream] Connection closed for ${callId}`);
    cleanupAndClose();
  });
  ws.on("error", (error) => {
    console.error(`[OpenAI SIP Stream] WebSocket error for ${callId}:`, error);
    cleanupAndClose();
  });
}

// plugins/sip-engine/index.ts
init_service_registry();
init_types();
var PLUGIN_VERSION = "2.0.0";
var PLUGIN_NAME = "sip-engine";
function createUserSipRouter() {
  const router5 = Router5();
  router5.use("/trunks", user_trunks_routes_default);
  router5.use("/phone-numbers", user_phone_numbers_routes_default);
  return router5;
}
function createAdminSipRouter() {
  const router5 = Router5();
  router5.use("/", admin_sip_routes_default);
  return router5;
}
function createOpenAISipWebhookRouter() {
  const router5 = Router5();
  router5.use("/", openai_sip_webhooks_routes_default);
  return router5;
}
function registerSipEngineRoutes(app, options) {
  const { sessionAuthMiddleware, adminAuthMiddleware, httpServer, sipServices } = options;
  if (sipServices) {
    setSipServices(sipServices);
    console.log("[SIP Engine] Services injected via service registry");
  }
  app.use("/api/sip", sessionAuthMiddleware, createUserSipRouter());
  app.use("/api/admin/sip", adminAuthMiddleware, createAdminSipRouter());
  app.use("/api/openai-sip", createOpenAISipWebhookRouter());
  if (httpServer) {
    setupOpenAISipStream(httpServer);
    console.log("[SIP Engine]   - /api/openai-sip/stream/:callId (WebSocket)");
  }
  console.log("[SIP Engine] Plugin registered (v2.0)");
  console.log("[SIP Engine] Endpoints:");
  console.log("  - /api/sip/trunks (user auth)");
  console.log("  - /api/sip/phone-numbers (user auth)");
  console.log("  - /api/admin/sip (admin auth)");
  console.log("  - /api/openai-sip (webhooks)");
  console.log("  - /api/openai-sip/stream/:callId (WebSocket)");
  console.log("[SIP Engine] Engines: ElevenLabs SIP, OpenAI SIP");
  console.log("\u2705 SIP Engine Plugin initialized");
}
function registerSipEngineWebSockets(httpServer) {
  setupOpenAISipStream(httpServer);
  console.log("[SIP Engine] WebSocket handlers registered");
}
var index_default = {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerSipEngineRoutes,
  registerWebSockets: registerSipEngineWebSockets
};
export {
  ElevenLabsSipService,
  OpenAISipService,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  SIP_PROVIDER_INFO,
  SipTrunkService,
  VALID_COUNTRY_CODES,
  createAdminSipRouter,
  createOpenAISipWebhookRouter,
  createUserSipRouter,
  index_default as default,
  registerSipEngineRoutes,
  registerSipEngineWebSockets,
  setupOpenAISipStream
};
