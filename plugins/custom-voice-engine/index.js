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
  AGENT_CALL_OUTCOMES: () => AGENT_CALL_OUTCOMES,
  AI_CATEGORY_COLORS: () => AI_CATEGORY_COLORS,
  AI_CATEGORY_LABELS: () => AI_CATEGORY_LABELS,
  AI_CATEGORY_PRIORITY: () => AI_CATEGORY_PRIORITY,
  AI_LEAD_CATEGORIES: () => AI_LEAD_CATEGORIES,
  API_SCOPES: () => API_SCOPES,
  AgentActionsConfigSchema: () => AgentActionsConfigSchema,
  AgentApiToolSchema: () => AgentApiToolSchema,
  CALL_OUTCOMES: () => CALL_OUTCOMES,
  FINAL_CALL_OUTCOMES: () => FINAL_CALL_OUTCOMES,
  INTEGRATION_PROVIDERS: () => INTEGRATION_PROVIDERS,
  RETRY_OUTCOMES: () => RETRY_OUTCOMES,
  RetryRuleSchema: () => RetryRuleSchema,
  RetryRulesSchema: () => RetryRulesSchema,
  SYSTEM_CALL_OUTCOMES: () => SYSTEM_CALL_OUTCOMES,
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
  doNotCallNumbers: () => doNotCallNumbers,
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
  insertDoNotCallNumberSchema: () => insertDoNotCallNumberSchema,
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
  insertNotificationEventSchema: () => insertNotificationEventSchema,
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
  insertScheduledCallbackSchema: () => insertScheduledCallbackSchema,
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
  insertUserIntegrationSchema: () => insertUserIntegrationSchema,
  insertUserKnowledgeStorageLimitSchema: () => insertUserKnowledgeStorageLimitSchema,
  insertUserKycDocumentSchema: () => insertUserKycDocumentSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSubscriptionSchema: () => insertUserSubscriptionSchema,
  insertVoiceSchema: () => insertVoiceSchema,
  insertWebhookLogSchema: () => insertWebhookLogSchema,
  insertWebhookSchema: () => insertWebhookSchema,
  insertWebsiteWidgetSchema: () => insertWebsiteWidgetSchema,
  insertWidgetCallSessionSchema: () => insertWidgetCallSessionSchema,
  integrationSyncLogs: () => integrationSyncLogs,
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
  notificationEvents: () => notificationEvents,
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
  scheduledCallbacks: () => scheduledCallbacks,
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
  userIntegrations: () => userIntegrations,
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
function isValidTimeZone(tz) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
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
var users, otpVerifications, refreshTokens, elevenLabsCredentials, syncedVoices, agents, knowledgeBase, incomingAgents, phoneNumbers, incomingConnections, campaigns, contacts, calls, creditTransactions, tools, voices, plans, globalSettings, llmModels, supportedLanguages, creditPackages, userSubscriptions, phoneNumberRentals, usageRecords, legacyWebhooks, legacyWebhookDeliveries, notifications, emailTemplates, promptTemplates, agentVersions, auditLogs, platformLanguages, insertUserSchema, insertElevenLabsCredentialSchema, insertSyncedVoiceSchema, insertAgentSchema, insertKnowledgeBaseSchema, insertIncomingAgentSchema, insertPromptTemplateSchema, insertAgentVersionSchema, insertIncomingConnectionSchema, insertCampaignSchema, insertContactSchema, insertCallSchema, insertCreditTransactionSchema, insertToolSchema, insertVoiceSchema, insertPlanSchema, insertGlobalSettingsSchema, insertLlmModelSchema, insertSupportedLanguageSchema, insertPlatformLanguageSchema, insertCreditPackageSchema, insertUserSubscriptionSchema, insertPhoneNumberSchema, insertUsageRecordSchema, insertLegacyWebhookSchema, insertLegacyWebhookDeliverySchema, insertPhoneNumberRentalSchema, insertNotificationSchema, insertEmailTemplateSchema, twilioCountries, insertTwilioCountrySchema, userKnowledgeStorageLimits, knowledgeChunks, knowledgeProcessingQueue, insertUserKnowledgeStorageLimitSchema, insertKnowledgeChunkSchema, insertKnowledgeProcessingQueueSchema, AGENT_CALL_OUTCOMES, SYSTEM_CALL_OUTCOMES, CALL_OUTCOMES, FINAL_CALL_OUTCOMES, RETRY_OUTCOMES, RetryRuleSchema, RetryRulesSchema, HHMM_RE, TOOL_NAME_RE, PARAM_NAME_RE, HEADER_KEY_RE, AgentApiToolSchema, OWNER_ALERT_TRIGGERS, OWNER_ALERT_FIELD_RE, EMAIL_LIST_RE, AgentActionsConfigSchema, flows, insertFlowSchema, createFlowSchema, flowExecutions, insertFlowExecutionSchema, flowTestQueue, insertFlowTestQueueSchema, webhookSubscriptions, webhooks, insertWebhookSchema, createWebhookSchema, webhookDeliveryLogs, webhookLogs, insertWebhookLogSchema, appointments, insertAppointmentSchema, createAppointmentSchema, appointmentSettings, insertAppointmentSettingsSchema, createAppointmentSettingsSchema, forms, insertFormSchema, createFormSchema, formFields, insertFormFieldSchema, formSubmissions, insertFormSubmissionSchema, seoSettings, insertSeoSettingsSchema, analyticsScripts, insertAnalyticsScriptSchema, paymentTransactions, insertPaymentTransactionSchema, refunds, insertRefundSchema, invoices, insertInvoiceSchema, paymentWebhookQueue, insertPaymentWebhookQueueSchema, emailNotificationSettings, insertEmailNotificationSettingsSchema, bannedWords, insertBannedWordSchema, contentViolations, insertContentViolationSchema, openaiCredentials, insertOpenaiCredentialSchema, plivoCredentials, insertPlivoCredentialSchema, plivoPhoneNumbers, insertPlivoPhoneNumberSchema, plivoCalls, insertPlivoCallSchema, scheduledCallbacks, insertScheduledCallbackSchema, doNotCallNumbers, insertDoNotCallNumberSchema, campaignJobs, insertCampaignJobSchema, plivoPhonePricing, insertPlivoPhonePricingSchema, userKycDocuments, insertUserKycDocumentSchema, twilioOpenaiCalls, insertTwilioOpenaiCallSchema, demoSessions, insertDemoSessionSchema, leadStages, insertLeadStageSchema, leads, insertLeadSchema, AI_LEAD_CATEGORIES, AI_CATEGORY_LABELS, AI_CATEGORY_COLORS, AI_CATEGORY_PRIORITY, leadNotes, insertLeadNoteSchema, leadActivities, insertLeadActivitySchema, crmCategoryPreferences, insertCrmCategoryPreferencesSchema, websiteWidgets, insertWebsiteWidgetSchema, widgetCallSessions, insertWidgetCallSessionSchema, API_SCOPES, apiKeys, insertApiKeySchema, apiAuditLogs, insertApiAuditLogSchema, apiRateLimits, sipTrunks, insertSipTrunkSchema, sipPhoneNumbers, insertSipPhoneNumberSchema, sipCalls, insertSipCallSchema, userAddresses, insertUserAddressSchema, userFeedback, insertUserFeedbackSchema, googleCalendarCredentials, insertGoogleCalendarCredentialSchema, googleSheetsCredentials, insertGoogleSheetsCredentialSchema, INTEGRATION_PROVIDERS, userIntegrations, insertUserIntegrationSchema, integrationSyncLogs, phoneReleaseRetryQueue, insertPhoneReleaseRetryQueueSchema, notificationEvents, insertNotificationEventSchema;
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
      billingStateCode: text("billing_state_code"),
      // GST state code (e.g. '09' for UP) — decides CGST/SGST vs IGST
      billingPhone: text("billing_phone"),
      gstin: text("gstin"),
      // Buyer GSTIN for B2B invoices
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
      // Templates the agent may pick at runtime (empty = any active/approved template). The single
      // *Template columns above stay as the legacy default / first choice.
      messagingEmailTemplates: text("messaging_email_templates").array(),
      messagingWhatsappTemplates: text("messaging_whatsapp_templates").array(),
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
      engine: text("engine"),
      openaiModel: text("openai_model"),
      sarvamVoice: text("sarvam_voice"),
      voice: text("voice"),
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
      // Per-outcome smart retry (no_answer / busy / failed / voicemail); null → derived from the legacy columns above
      retryRules: jsonb("retry_rules").$type(),
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
      // INR (Cashfree)
      yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }),
      // INR (Cashfree)
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
      // INR (Cashfree)
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
      cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
      billingPeriod: text("billing_period").notNull().default("monthly"),
      // 'monthly' or 'yearly'
      // Cashfree one-time-per-period model: last paid order + expiry reminder bookkeeping
      cashfreeOrderId: text("cashfree_order_id"),
      reminder7SentAt: timestamp("reminder_7_sent_at"),
      reminder3SentAt: timestamp("reminder_3_sent_at"),
      reminder1SentAt: timestamp("reminder_1_sent_at"),
      expiredNotifiedAt: timestamp("expired_notified_at"),
      // Cashfree Subscriptions auto-renew mandate (UPI AutoPay / card / eNACH). The first period is always
      // paid with a one-time order; the mandate only charges renewals at current_period_end.
      autoRenew: boolean("auto_renew").notNull().default(false),
      cashfreeSubscriptionId: text("cashfree_subscription_id"),
      // our subscription_id sent to Cashfree (zvsub_…)
      cfSubscriptionId: text("cf_subscription_id"),
      // Cashfree's reference id
      mandateStatus: text("mandate_status"),
      // INITIALIZED | BANK_APPROVAL_PENDING | ACTIVE | ON_HOLD | PAUSED | CANCELLED | COMPLETED | EXPIRED
      mandatePaymentMethod: text("mandate_payment_method"),
      // upi | card | enach
      mandateAuthorizedAt: timestamp("mandate_authorized_at"),
      nextChargeAt: timestamp("next_charge_at"),
      autoRenewCancelledAt: timestamp("auto_renew_cancelled_at"),
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
    AGENT_CALL_OUTCOMES = [
      "interested",
      "not_interested",
      "callback_requested",
      "wrong_number",
      "already_customer",
      "do_not_call",
      "no_decision"
    ];
    SYSTEM_CALL_OUTCOMES = [
      "voicemail",
      "no_answer",
      "busy",
      "failed",
      "transferred",
      "appointment_booked"
    ];
    CALL_OUTCOMES = [
      { id: "interested", label: "Interested", kind: "agent" },
      { id: "not_interested", label: "Not interested", kind: "agent" },
      { id: "callback_requested", label: "Callback requested", kind: "agent" },
      { id: "wrong_number", label: "Wrong number", kind: "agent" },
      { id: "already_customer", label: "Already a customer", kind: "agent" },
      { id: "do_not_call", label: "Do not call", kind: "agent" },
      { id: "no_decision", label: "No decision", kind: "agent" },
      { id: "voicemail", label: "Voicemail", kind: "system" },
      { id: "no_answer", label: "No answer", kind: "system" },
      { id: "busy", label: "Busy", kind: "system" },
      { id: "failed", label: "Failed", kind: "system" },
      { id: "transferred", label: "Transferred", kind: "system" },
      { id: "appointment_booked", label: "Appointment booked", kind: "system" }
    ];
    FINAL_CALL_OUTCOMES = [
      "do_not_call",
      "wrong_number",
      "not_interested",
      "interested",
      "appointment_booked",
      "already_customer"
    ];
    RETRY_OUTCOMES = ["no_answer", "busy", "failed", "voicemail"];
    RetryRuleSchema = z.object({
      enabled: z.boolean(),
      delayMinutes: z.number().int().min(5).max(10080),
      maxAttempts: z.number().int().min(0).max(10)
    });
    RetryRulesSchema = z.object({
      no_answer: RetryRuleSchema,
      busy: RetryRuleSchema,
      failed: RetryRuleSchema,
      voicemail: RetryRuleSchema
    }).strict();
    HHMM_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
    TOOL_NAME_RE = /^[a-z0-9_]{2,30}$/;
    PARAM_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]{0,39}$/;
    HEADER_KEY_RE = /^[A-Za-z0-9-]{1,64}$/;
    AgentApiToolSchema = z.object({
      id: z.string().min(1).max(40),
      name: z.string().regex(TOOL_NAME_RE, "Tool name must be 2-30 lowercase letters, digits or underscores"),
      description: z.string().trim().min(1).max(500),
      url: z.string().trim().max(2e3).refine((u) => /^https:\/\//i.test(u), "URL must start with https://"),
      method: z.enum(["GET", "POST"]),
      headers: z.record(z.string().regex(HEADER_KEY_RE), z.string().max(2e3)).optional(),
      params: z.array(z.object({
        name: z.string().regex(PARAM_NAME_RE),
        type: z.enum(["string", "number"]),
        description: z.string().trim().max(300),
        required: z.boolean()
      })).max(10),
      bodyTemplate: z.string().max(4e3).optional(),
      responsePath: z.string().max(200).optional(),
      timeoutMs: z.number().int().min(1e3).max(12e3).optional()
    }).refine((t) => Object.keys(t.headers || {}).length <= 10, { message: "At most 10 headers" });
    OWNER_ALERT_TRIGGERS = ["interested", "appointment_booked", "callback_requested", "transferred", "do_not_call", "all"];
    OWNER_ALERT_FIELD_RE = /^(caller_name|caller_phone|outcome|summary|appointment|callback|agent_name|call_time|duration|call_link|text:[\s\S]{0,200})$/;
    EMAIL_LIST_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+(\s*,\s*[^\s@,]+@[^\s@,]+\.[^\s@,]+){0,2}$/;
    AgentActionsConfigSchema = z.object({
      voicemail: z.object({
        action: z.enum(["hangup", "leave_message"]),
        message: z.string().trim().max(400).optional()
      }).refine((v) => v.action !== "leave_message" || !!v.message?.trim(), { message: "A voicemail message is required", path: ["message"] }).optional(),
      ownerAlerts: z.object({
        enabled: z.boolean(),
        triggers: z.array(z.enum(OWNER_ALERT_TRIGGERS)).max(6),
        email: z.string().trim().max(320).refine((e) => e === "" || EMAIL_LIST_RE.test(e), "Up to 3 comma-separated email addresses").optional(),
        whatsappPhone: z.string().trim().max(20).refine((p) => p === "" || /^\+?[\d\s-]{8,20}$/.test(p), "Invalid WhatsApp number").optional(),
        whatsappTemplate: z.string().trim().max(120).optional(),
        whatsappVariables: z.record(z.string().regex(/^[1-9]\d{0,2}$/), z.string().max(210).regex(OWNER_ALERT_FIELD_RE, "Unknown field")).optional()
      }).optional(),
      appointments: z.object({
        durationMinutes: z.number().int().min(5).max(240),
        timeZone: z.string().refine(isValidTimeZone, "Invalid IANA time zone"),
        workingHours: z.object({
          start: z.string().regex(HHMM_RE, "Use HH:MM"),
          end: z.string().regex(HHMM_RE, "Use HH:MM")
        }).refine((h) => h.start < h.end, { message: "Working hours must end after they start" }),
        workingDays: z.array(z.number().int().min(0).max(6)).max(7),
        confirmVia: z.array(z.enum(["whatsapp", "email"])).max(2),
        serviceName: z.string().trim().max(120).optional()
      }).optional(),
      saveLead: z.object({
        fields: z.array(z.object({
          key: z.string().regex(PARAM_NAME_RE),
          label: z.string().trim().min(1).max(80),
          required: z.boolean()
        })).max(8)
      }).optional(),
      callback: z.object({
        enabled: z.boolean(),
        maxDaysAhead: z.number().int().min(1).max(60)
      }).optional(),
      apiTools: z.array(AgentApiToolSchema).max(10).optional()
    }).strict();
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
      gatewayOrderId: text("gateway_order_id"),
      // Cashfree order_id (idempotency key)
      paymentMethod: text("payment_method"),
      // upi, card, netbanking, wallet…
      failureReason: text("failure_reason"),
      refundedAmount: decimal("refunded_amount", { precision: 10, scale: 2 }).default("0.00"),
      refundId: text("refund_id"),
      phoneNumberId: varchar("phone_number_id"),
      // For phone number rentals
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
      // GST (India) — snapshot of seller/buyer tax details at issue time
      invoiceType: text("invoice_type").notNull().default("tax_invoice"),
      // 'tax_invoice' | 'credit_note'
      relatedInvoiceId: varchar("related_invoice_id"),
      // credit note → original invoice
      financialYear: text("financial_year"),
      // e.g. '25-26'
      sellerName: text("seller_name"),
      sellerGstin: text("seller_gstin"),
      sellerAddress: text("seller_address"),
      sellerStateCode: text("seller_state_code"),
      buyerGstin: text("buyer_gstin"),
      buyerStateCode: text("buyer_state_code"),
      placeOfSupply: text("place_of_supply"),
      hsnSac: text("hsn_sac"),
      taxableAmount: decimal("taxable_amount", { precision: 10, scale: 2 }),
      cgst: decimal("cgst", { precision: 10, scale: 2 }).default("0.00"),
      sgst: decimal("sgst", { precision: 10, scale: 2 }).default("0.00"),
      igst: decimal("igst", { precision: 10, scale: 2 }).default("0.00"),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }),
      isInterState: boolean("is_inter_state").default(false),
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
    scheduledCallbacks = pgTable("scheduled_callbacks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      sourceCallId: varchar("source_call_id"),
      // plivo_calls.id of the call that booked it
      plivoPhoneNumberId: varchar("plivo_phone_number_id"),
      contactName: text("contact_name"),
      contactPhone: text("contact_phone").notNull(),
      reason: text("reason"),
      scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
      timeZone: text("time_zone").notNull().default("Asia/Kolkata"),
      status: text("status").notNull().default("pending"),
      // pending | calling | completed | failed | cancelled
      attempts: integer("attempts").notNull().default(0),
      lastError: text("last_error"),
      resultCallId: varchar("result_call_id"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      scheduledCallbacksDueIdx: index("scheduled_callbacks_status_scheduled_at_idx").on(table.status, table.scheduledAt),
      scheduledCallbacksUserIdx: index("scheduled_callbacks_user_created_idx").on(table.userId, table.createdAt)
    }));
    insertScheduledCallbackSchema = createInsertSchema(scheduledCallbacks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    doNotCallNumbers = pgTable("do_not_call_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      phone: text("phone").notNull(),
      // normalised: +<digits>
      reason: text("reason").notNull().default("manual"),
      // caller_request | manual | import | complaint
      source: text("source").notNull().default("manual"),
      // agent | manual | upload | api
      callId: varchar("call_id"),
      // plivo_calls.id when added during a call
      note: text("note"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      doNotCallUserPhoneUnique: uniqueIndex("do_not_call_numbers_user_phone_unique").on(table.userId, table.phone),
      doNotCallUserIdx: index("do_not_call_numbers_user_id_idx").on(table.userId)
    }));
    insertDoNotCallNumberSchema = createInsertSchema(doNotCallNumbers).omit({ id: true, createdAt: true });
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
      // Owner user id OR team_members.id — no FK (migration 0017 dropped it) so team members can be assignees
      assignedUserId: varchar("assigned_user_id"),
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
    INTEGRATION_PROVIDERS = ["gohighlevel", "salesforce", "zoho", "calcom", "zapier", "pabbly"];
    userIntegrations = pgTable("user_integrations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      provider: text("provider").notNull(),
      // IntegrationProvider
      status: text("status").notNull().default("connected"),
      // 'connected' | 'error' | 'disconnected'
      accessToken: text("access_token"),
      refreshToken: text("refresh_token"),
      tokenExpiry: timestamp("token_expiry"),
      /** Salesforce instance_url / Zoho api_domain / GoHighLevel API base */
      instanceUrl: text("instance_url"),
      /** GoHighLevel locationId, Salesforce org id, Zoho org, Cal.com user id */
      externalAccountId: text("external_account_id"),
      accountName: text("account_name"),
      /** Provider options: zapier/pabbly { webhooks:[{url,events[]}] }, calcom { apiKey, eventTypeId, timeZone }, gohighlevel { calendarId }, … */
      config: jsonb("config").$type(),
      lastSyncAt: timestamp("last_sync_at"),
      lastError: text("last_error"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      userIntegrationsUserProviderIdx: uniqueIndex("user_integrations_user_provider_idx").on(table.userId, table.provider)
    }));
    insertUserIntegrationSchema = createInsertSchema(userIntegrations).omit({ id: true, createdAt: true, updatedAt: true });
    integrationSyncLogs = pgTable("integration_sync_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      provider: text("provider").notNull(),
      event: text("event").notNull(),
      // lead.upserted | appointment.booked | form.submitted | call.completed | test …
      action: text("action").notNull(),
      // e.g. 'lead.create', 'contact.upsert', 'booking.create', 'webhook.post'
      status: text("status").notNull(),
      // 'success' | 'failed' | 'skipped'
      /** Local record the push was about (lead id, appointment id, call id) */
      sourceId: varchar("source_id"),
      /** Provider-side id (Lead Id, contact id, booking uid, …) */
      externalId: text("external_id"),
      error: text("error"),
      payload: jsonb("payload").$type(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      integrationSyncLogsUserProviderIdx: index("integration_sync_logs_user_provider_idx").on(table.userId, table.provider, table.createdAt),
      integrationSyncLogsSourceIdx: index("integration_sync_logs_source_idx").on(table.provider, table.sourceId)
    }));
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
    notificationEvents = pgTable("notification_events", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      eventKey: text("event_key").notNull(),
      // e.g. 'purchase_completed', 'plan_expiring'
      channel: text("channel").notNull(),
      // 'email' | 'in_app'
      status: text("status").notNull(),
      // 'sent' | 'failed' | 'skipped'
      recipient: text("recipient"),
      subject: text("subject"),
      error: text("error"),
      payload: jsonb("payload"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      userIdx: index("notification_events_user_id_idx").on(table.userId),
      eventIdx: index("notification_events_event_key_idx").on(table.eventKey),
      createdIdx: index("notification_events_created_at_idx").on(table.createdAt)
    }));
    insertNotificationEventSchema = createInsertSchema(notificationEvents).omit({ id: true, createdAt: true });
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

// server/storage/analytics-helpers.ts
import { eq as eq7, sql as sql12, and, gte, lt, desc, isNull, or, inArray as inArray3 } from "drizzle-orm";
async function calculateGlobalAnalytics(timeRange) {
  const now = /* @__PURE__ */ new Date();
  let startDate;
  let previousStartDate;
  let previousEndDate;
  let groupByWeek = false;
  let isAllTime = false;
  switch (timeRange) {
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1e3);
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3);
      break;
    case "90d":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1e3);
      groupByWeek = true;
      break;
    case "all":
      startDate = /* @__PURE__ */ new Date(0);
      previousStartDate = /* @__PURE__ */ new Date(0);
      previousEndDate = /* @__PURE__ */ new Date(0);
      groupByWeek = true;
      isAllTime = true;
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3);
  }
  const allUsers = await db.select().from(users);
  const allPhoneNumbers = await db.select().from(phoneNumbers);
  const allContacts = await db.select().from(contacts);
  const allKnowledgeBases = await db.select().from(knowledgeBase);
  let filteredCalls = [];
  const filteredCampaigns = await db.select().from(campaigns).where(gte(campaigns.createdAt, startDate));
  const filteredUsers = await db.select().from(users).where(gte(users.createdAt, startDate));
  try {
    filteredCalls = await db.select().from(calls).where(gte(calls.createdAt, startDate));
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[GlobalAnalytics] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[GlobalAnalytics] Error fetching filtered calls:", callFetchError.message);
    }
  }
  let previousUsers = [];
  let previousCalls = [];
  let previousCampaigns = [];
  if (!isAllTime) {
    previousUsers = await db.select().from(users).where(
      and(gte(users.createdAt, previousStartDate), lt(users.createdAt, previousEndDate))
    );
    try {
      previousCalls = await db.select().from(calls).where(
        and(gte(calls.createdAt, previousStartDate), lt(calls.createdAt, previousEndDate))
      );
    } catch (callFetchError) {
      if (callFetchError?.code === "42703") {
        console.warn("[GlobalAnalytics] Missing database column for previous calls:", callFetchError.message);
      } else {
        console.error("[GlobalAnalytics] Error fetching previous calls:", callFetchError.message);
      }
    }
    previousCampaigns = await db.select().from(campaigns).where(
      and(gte(campaigns.createdAt, previousStartDate), lt(campaigns.createdAt, previousEndDate))
    );
  }
  const calculateGrowthPercent = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return (current - previous) / previous * 100;
  };
  const userGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredUsers.length, previousUsers.length);
  const callGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredCalls.length, previousCalls.length);
  const campaignGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredCampaigns.length, previousCampaigns.length);
  const totalCalls = filteredCalls.length;
  const completedCalls = filteredCalls.filter((c) => c.status === "completed").length;
  const successRate = totalCalls > 0 ? completedCalls / totalCalls * 100 : 0;
  const qualifiedLeads = filteredCalls.filter((c) => c.classification === "hot" || c.classification === "warm").length;
  const growthData = calculateGrowthData(
    filteredUsers,
    filteredCalls,
    filteredCampaigns,
    startDate,
    now,
    groupByWeek,
    isAllTime
  );
  const activeSubscriptions = await db.select({
    userId: userSubscriptions.userId,
    planName: plans.name,
    status: userSubscriptions.status,
    currentPeriodEnd: userSubscriptions.currentPeriodEnd
  }).from(userSubscriptions).innerJoin(plans, eq7(userSubscriptions.planId, plans.id)).where(
    and(
      eq7(userSubscriptions.status, "active"),
      or(
        isNull(userSubscriptions.currentPeriodEnd),
        gte(userSubscriptions.currentPeriodEnd, now)
      )
    )
  );
  const proUserIds = /* @__PURE__ */ new Set();
  for (const sub of activeSubscriptions) {
    if (sub.planName !== "free") {
      proUserIds.add(sub.userId);
    }
  }
  const proPlanUsers = proUserIds.size;
  const freePlanUsers = allUsers.length - proPlanUsers;
  return {
    totalUsers: filteredUsers.length,
    totalCampaigns: filteredCampaigns.length,
    totalCalls,
    successRate,
    qualifiedLeads,
    activeUsers: filteredUsers.filter((u) => u.isActive).length,
    proPlanUsers,
    freePlanUsers,
    totalPhoneNumbers: allPhoneNumbers.length,
    totalContacts: allContacts.length,
    totalKnowledgeBases: allKnowledgeBases.length,
    growthData,
    userGrowthPercent: Math.round(userGrowthPercent * 10) / 10,
    callGrowthPercent: Math.round(callGrowthPercent * 10) / 10,
    campaignGrowthPercent: Math.round(campaignGrowthPercent * 10) / 10
  };
}
function calculateGrowthData(filteredUsers, filteredCalls, filteredCampaigns, startDate, now, groupByWeek, isAllTime) {
  const growthMap = /* @__PURE__ */ new Map();
  const getIsoDateKey = (date2) => {
    const d = new Date(date2);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  };
  const getMonthKey = (date2) => {
    const d = new Date(date2);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };
  const formatDateLabel = (isoDate, isMonthly = false) => {
    if (isMonthly) {
      const [year, month] = isoDate.split("-");
      const d2 = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
      return d2.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    }
    const d = /* @__PURE__ */ new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  let chartStartDate = startDate;
  let useMonthlyBuckets = false;
  if (isAllTime) {
    const allDates = [];
    for (const user of filteredUsers) {
      if (user.createdAt) allDates.push(new Date(user.createdAt));
    }
    for (const call of filteredCalls) {
      if (call.createdAt) allDates.push(new Date(call.createdAt));
    }
    for (const campaign of filteredCampaigns) {
      if (campaign.createdAt) allDates.push(new Date(campaign.createdAt));
    }
    if (allDates.length > 0) {
      chartStartDate = allDates.reduce((min, d) => d < min ? d : min, allDates[0]);
      chartStartDate = new Date(chartStartDate.getFullYear(), chartStartDate.getMonth(), 1);
    } else {
      chartStartDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    }
    useMonthlyBuckets = true;
  }
  const startDateIso = useMonthlyBuckets ? getMonthKey(chartStartDate) : getIsoDateKey(chartStartDate);
  const nowDateIso = useMonthlyBuckets ? getMonthKey(now) : getIsoDateKey(now);
  const bucketKeys = [];
  const currentDate = new Date(chartStartDate);
  currentDate.setHours(0, 0, 0, 0);
  if (useMonthlyBuckets) {
    while (getMonthKey(currentDate) <= nowDateIso) {
      bucketKeys.push(getMonthKey(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else {
    const interval = groupByWeek ? 7 : 1;
    while (getIsoDateKey(currentDate) <= nowDateIso) {
      bucketKeys.push(getIsoDateKey(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    }
  }
  if (bucketKeys.length === 0) {
    bucketKeys.push(startDateIso);
  }
  for (const key of bucketKeys) {
    growthMap.set(key, { users: 0, calls: 0, campaigns: 0 });
  }
  const getBucketKey = (date2) => {
    if (useMonthlyBuckets) {
      const monthKey = getMonthKey(date2);
      if (monthKey < startDateIso || monthKey > nowDateIso) {
        return null;
      }
      return growthMap.has(monthKey) ? monthKey : null;
    }
    const dateKey = getIsoDateKey(date2);
    if (dateKey < startDateIso || dateKey > nowDateIso) {
      return null;
    }
    if (groupByWeek) {
      for (let i = bucketKeys.length - 1; i >= 0; i--) {
        if (dateKey >= bucketKeys[i]) {
          return bucketKeys[i];
        }
      }
      return bucketKeys[0];
    } else {
      return growthMap.has(dateKey) ? dateKey : null;
    }
  };
  for (const user of filteredUsers) {
    if (user.createdAt) {
      const bucketKey = getBucketKey(new Date(user.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.users++;
      }
    }
  }
  for (const call of filteredCalls) {
    if (call.createdAt) {
      const bucketKey = getBucketKey(new Date(call.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.calls++;
      }
    }
  }
  for (const campaign of filteredCampaigns) {
    if (campaign.createdAt) {
      const bucketKey = getBucketKey(new Date(campaign.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.campaigns++;
      }
    }
  }
  return Array.from(growthMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([isoDate, data]) => ({
    date: formatDateLabel(isoDate, useMonthlyBuckets),
    ...data
  }));
}
async function calculateUserAnalytics(userId, timeRange = "7days", callType = "all") {
  const now = /* @__PURE__ */ new Date();
  let startDate = /* @__PURE__ */ new Date();
  switch (timeRange) {
    case "7days":
      startDate.setDate(now.getDate() - 7);
      break;
    case "30days":
      startDate.setDate(now.getDate() - 30);
      break;
    case "90days":
      startDate.setDate(now.getDate() - 90);
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case "all":
      startDate = /* @__PURE__ */ new Date(0);
      break;
    default:
      startDate.setDate(now.getDate() - 7);
  }
  const userCampaigns = await db.select().from(campaigns).where(eq7(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq7(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(and(eq7(calls.userId, userId), gte(calls.createdAt, startDate)));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(and(inArray3(calls.campaignId, campaignIds), gte(calls.createdAt, startDate)));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(and(inArray3(calls.incomingConnectionId, incomingConnectionIds), gte(calls.createdAt, startDate)));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(and(eq7(twilioOpenaiCalls.userId, userId), gte(twilioOpenaiCalls.createdAt, startDate)));
    for (const toc of twilioOpenAICallsData) {
      allUserCalls.push({
        id: toc.id,
        userId: toc.userId,
        campaignId: toc.campaignId,
        contactId: toc.contactId,
        phoneNumber: toc.fromNumber,
        status: toc.status,
        callDirection: toc.callDirection,
        duration: toc.duration,
        classification: null,
        sentiment: toc.sentiment,
        createdAt: toc.createdAt,
        metadata: toc.metadata,
        incomingConnectionId: null
      });
    }
    const plivoAnalyticsCallsData = await db.select().from(plivoCalls).where(and(eq7(plivoCalls.userId, userId), gte(plivoCalls.createdAt, startDate)));
    for (const pc of plivoAnalyticsCallsData) {
      allUserCalls.push({
        id: pc.id,
        userId: pc.userId,
        campaignId: pc.campaignId,
        contactId: pc.contactId,
        phoneNumber: pc.fromNumber,
        status: pc.status,
        callDirection: pc.callDirection,
        duration: pc.duration,
        classification: null,
        sentiment: pc.sentiment,
        createdAt: pc.createdAt,
        metadata: pc.metadata,
        incomingConnectionId: null
      });
    }
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Analytics] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[Analytics] Error fetching calls:", callFetchError.message);
    }
  }
  const isBatchCall = (c) => {
    const meta = c.metadata;
    return !!(meta?.batch_call || meta?.batchId || meta?.batch_calling);
  };
  const incomingDirections = ["incoming", "inbound", "bridged", "simulcall"];
  const outgoingDirections = ["outgoing", "outbound"];
  const isIncomingCall = (c) => incomingDirections.includes(c.callDirection || "") || !!c.incomingConnectionId;
  const isOutgoingCall = (c) => {
    if (isBatchCall(c)) return false;
    if (outgoingDirections.includes(c.callDirection || "")) return true;
    if (c.campaignId && !c.incomingConnectionId && !incomingDirections.includes(c.callDirection || "")) return true;
    if (!isIncomingCall(c)) return true;
    return false;
  };
  let filteredCalls = allUserCalls;
  if (callType === "incoming") filteredCalls = allUserCalls.filter(isIncomingCall);
  else if (callType === "outgoing") filteredCalls = allUserCalls.filter(isOutgoingCall);
  else if (callType === "batch") filteredCalls = allUserCalls.filter(isBatchCall);
  const allCalls = filteredCalls;
  const typeBreakdown = {
    incoming: allUserCalls.filter(isIncomingCall).length,
    outgoing: allUserCalls.filter(isOutgoingCall).length,
    batch: allUserCalls.filter(isBatchCall).length,
    total: allUserCalls.length
  };
  const totalCalls = allCalls.length;
  const completedCalls = allCalls.filter((c) => c.status === "completed").length;
  const successRate = totalCalls > 0 ? completedCalls / totalCalls * 100 : 0;
  const qualifiedLeads = allCalls.filter(
    (c) => c.classification === "hot" || c.classification === "warm"
  ).length;
  const totalDuration = allCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
  const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;
  const leadCounts = {
    hot: allCalls.filter((c) => c.classification === "hot" || c.classification === "qualified").length,
    warm: allCalls.filter((c) => c.classification === "warm" || c.classification === "interested").length,
    cold: allCalls.filter((c) => c.classification === "cold" || c.classification === "not_interested").length,
    lost: allCalls.filter((c) => c.classification === "lost" || c.classification === "do_not_call").length
  };
  const leadDistribution = [
    { name: "Hot", value: leadCounts.hot },
    { name: "Warm", value: leadCounts.warm },
    { name: "Cold", value: leadCounts.cold },
    { name: "Lost", value: leadCounts.lost }
  ].filter((item) => item.value > 0);
  const sentimentCounts = {
    positive: allCalls.filter((c) => c.sentiment === "positive").length,
    neutral: allCalls.filter((c) => c.sentiment === "neutral").length,
    negative: allCalls.filter((c) => c.sentiment === "negative").length
  };
  const sentimentDistribution = [
    { name: "Positive", value: sentimentCounts.positive },
    { name: "Neutral", value: sentimentCounts.neutral },
    { name: "Negative", value: sentimentCounts.negative }
  ].filter((item) => item.value > 0);
  const campaignPerformance = userCampaigns.map((campaign) => {
    const campaignCalls = allCalls.filter((c) => c.campaignId === campaign.id);
    const completed = campaignCalls.filter((c) => c.status === "completed").length;
    const total = campaignCalls.length;
    const rate = total > 0 ? completed / total * 100 : 0;
    return {
      name: campaign.name,
      value: parseFloat(rate.toFixed(1)),
      totalCalls: total,
      completedCalls: completed
    };
  });
  const dailyCalls = calculateDailyCalls(allCalls, timeRange);
  return {
    totalCalls,
    successRate: parseFloat(successRate.toFixed(1)),
    qualifiedLeads,
    avgDuration: Math.round(avgDuration),
    leadDistribution,
    sentimentDistribution,
    campaignPerformance,
    dailyCalls,
    typeBreakdown
  };
}
function calculateDailyCalls(allCalls, timeRange) {
  const dailyCalls = [];
  let daysToShow = 7;
  if (timeRange === "30days") daysToShow = 30;
  else if (timeRange === "90days") daysToShow = 90;
  else if (timeRange === "year") daysToShow = 365;
  if (daysToShow <= 14) {
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date2 = /* @__PURE__ */ new Date();
      date2.setDate(date2.getDate() - i);
      date2.setHours(0, 0, 0, 0);
      const nextDay = new Date(date2);
      nextDay.setDate(nextDay.getDate() + 1);
      const dayCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= date2 && callDate < nextDay;
      }).length;
      dailyCalls.push({ date: date2.toISOString(), count: dayCount });
    }
  } else if (daysToShow <= 90) {
    const weeksToShow = Math.ceil(daysToShow / 7);
    for (let i = weeksToShow - 1; i >= 0; i--) {
      const weekEnd = /* @__PURE__ */ new Date();
      weekEnd.setDate(weekEnd.getDate() - i * 7);
      weekEnd.setHours(23, 59, 59, 999);
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekStart.getDate() - 6);
      weekStart.setHours(0, 0, 0, 0);
      const weekCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= weekStart && callDate <= weekEnd;
      }).length;
      dailyCalls.push({ date: weekStart.toISOString(), count: weekCount });
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const monthStart = /* @__PURE__ */ new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);
      const monthCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= monthStart && callDate <= monthEnd;
      }).length;
      dailyCalls.push({ date: monthStart.toISOString(), count: monthCount });
    }
  }
  return dailyCalls;
}
async function calculateDashboardData(userId) {
  const now = /* @__PURE__ */ new Date();
  const weekAgo = /* @__PURE__ */ new Date();
  weekAgo.setDate(now.getDate() - 7);
  const userCampaigns = await db.select().from(campaigns).where(eq7(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq7(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(eq7(calls.userId, userId));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(inArray3(calls.incomingConnectionId, incomingConnectionIds));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(eq7(twilioOpenaiCalls.userId, userId));
    for (const toc of twilioOpenAICallsData) {
      allUserCalls.push({
        id: toc.id,
        userId: toc.userId,
        campaignId: toc.campaignId,
        contactId: toc.contactId,
        phoneNumber: toc.fromNumber,
        status: toc.status,
        callDirection: toc.callDirection,
        duration: toc.duration,
        classification: toc.classification,
        sentiment: toc.sentiment,
        createdAt: toc.createdAt,
        metadata: toc.metadata,
        incomingConnectionId: null
      });
    }
    const plivoCallsData = await db.select().from(plivoCalls).where(eq7(plivoCalls.userId, userId));
    for (const pc of plivoCallsData) {
      allUserCalls.push({
        id: pc.id,
        userId: pc.userId,
        campaignId: pc.campaignId,
        contactId: pc.contactId,
        phoneNumber: pc.fromNumber,
        status: pc.status,
        callDirection: pc.callDirection,
        duration: pc.duration,
        classification: pc.classification,
        sentiment: pc.sentiment,
        createdAt: pc.createdAt,
        metadata: pc.metadata,
        incomingConnectionId: null
      });
    }
    const sipCallsData = await db.select().from(sipCalls).where(eq7(sipCalls.userId, userId));
    for (const sc of sipCallsData) {
      allUserCalls.push({
        id: sc.id,
        userId: sc.userId,
        campaignId: sc.campaignId,
        contactId: sc.contactId,
        phoneNumber: sc.direction === "inbound" ? sc.fromNumber : sc.toNumber,
        status: sc.status,
        callDirection: sc.direction === "inbound" ? "incoming" : "outgoing",
        duration: sc.durationSeconds,
        classification: null,
        sentiment: null,
        createdAt: sc.createdAt,
        metadata: sc.metadata,
        incomingConnectionId: null
      });
    }
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Dashboard] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[Dashboard] Error fetching calls:", callFetchError.message);
    }
  }
  const incomingDirections = ["incoming", "inbound", "bridged", "simulcall"];
  const outgoingDirections = ["outgoing", "outbound"];
  const isBatchCall = (c) => {
    const meta = c.metadata;
    return !!(meta?.batch_call || meta?.batchId || meta?.batch_calling);
  };
  const isIncomingCall = (c) => incomingDirections.includes(c.callDirection || "") || !!c.incomingConnectionId;
  const isOutgoingCall = (c) => {
    if (isBatchCall(c)) return false;
    if (outgoingDirections.includes(c.callDirection || "")) return true;
    if (c.campaignId && !c.incomingConnectionId && !incomingDirections.includes(c.callDirection || "")) return true;
    if (!isIncomingCall(c)) return true;
    return false;
  };
  const prevWeekStart = /* @__PURE__ */ new Date();
  prevWeekStart.setDate(now.getDate() - 14);
  const thisWeekCalls = allUserCalls.filter((c) => new Date(c.createdAt) >= weekAgo);
  const prevWeekCalls = allUserCalls.filter((c) => {
    const date2 = new Date(c.createdAt);
    return date2 >= prevWeekStart && date2 < weekAgo;
  });
  const incomingThisWeek = thisWeekCalls.filter(isIncomingCall);
  const outgoingThisWeek = thisWeekCalls.filter(isOutgoingCall);
  const incomingPrevWeek = prevWeekCalls.filter(isIncomingCall);
  const outgoingPrevWeek = prevWeekCalls.filter(isOutgoingCall);
  const calcTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round((current - previous) / previous * 100);
  };
  const calcStats = (callList) => {
    const completed = callList.filter((c) => c.status === "completed");
    const successRate = callList.length > 0 ? Math.round(completed.length / callList.length * 100) : 0;
    const avgDuration = completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + (c.duration || 0), 0) / completed.length) : 0;
    return { successRate, avgDuration };
  };
  const dailyBreakdown = [];
  for (let i = 6; i >= 0; i--) {
    const day = /* @__PURE__ */ new Date();
    day.setDate(now.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    const dayCalls = thisWeekCalls.filter((c) => {
      const callDate = new Date(c.createdAt);
      return callDate >= day && callDate <= dayEnd;
    });
    dailyBreakdown.push({
      date: day.toISOString(),
      incoming: dayCalls.filter(isIncomingCall).length,
      outgoing: dayCalls.filter(isOutgoingCall).length
    });
  }
  const leadDistribution = {
    hot: allUserCalls.filter((c) => c.classification?.toLowerCase() === "hot" || c.classification?.toLowerCase() === "qualified").length,
    warm: allUserCalls.filter((c) => c.classification?.toLowerCase() === "warm" || c.classification?.toLowerCase() === "interested").length,
    cold: allUserCalls.filter((c) => c.classification?.toLowerCase() === "cold" || c.classification?.toLowerCase() === "not_interested").length,
    lost: allUserCalls.filter((c) => c.classification?.toLowerCase() === "lost" || c.classification?.toLowerCase() === "do_not_call").length
  };
  let recentCalls = [];
  try {
    recentCalls = await db.select({
      id: calls.id,
      phoneNumber: calls.phoneNumber,
      status: calls.status,
      duration: calls.duration,
      classification: calls.classification,
      callDirection: calls.callDirection,
      createdAt: calls.createdAt,
      campaignId: calls.campaignId,
      incomingConnectionId: calls.incomingConnectionId,
      metadata: calls.metadata
    }).from(calls).where(eq7(calls.userId, userId)).orderBy(desc(calls.createdAt)).limit(10);
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Dashboard] Missing database column for recent calls:", callFetchError.message);
    } else {
      console.error("[Dashboard] Error fetching recent calls:", callFetchError.message);
    }
  }
  let recentUsers = [];
  const [currentUser] = await db.select().from(users).where(eq7(users.id, userId));
  if (currentUser?.role === "admin" || currentUser?.role === "super_admin") {
    recentUsers = await db.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt)).limit(5);
  }
  const totalCampaigns = userCampaigns.length;
  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "in_progress" || c.status === "scheduled" || c.status === "pending"
  ).length;
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed").length;
  let allCampaignCalls = [];
  if (campaignIds.length > 0) {
    try {
      allCampaignCalls = await db.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
    } catch (callFetchError) {
      if (callFetchError?.code === "42703") {
        console.warn("[Dashboard] Missing database column for campaign calls:", callFetchError.message);
      } else {
        console.error("[Dashboard] Error fetching campaign calls:", callFetchError.message);
      }
    }
  }
  const campaignCallsCompleted = allCampaignCalls.filter((c) => c.status === "completed");
  const campaignSuccessRate = allCampaignCalls.length > 0 ? Math.round(campaignCallsCompleted.length / allCampaignCalls.length * 100) : 0;
  const campaignAvgDuration = campaignCallsCompleted.length > 0 ? Math.round(campaignCallsCompleted.reduce((sum, c) => sum + (c.duration || 0), 0) / campaignCallsCompleted.length) : 0;
  const [appointmentsResult] = await db.select({ count: sql12`count(*)` }).from(appointments).where(eq7(appointments.userId, userId));
  const appointmentsCount = Number(appointmentsResult?.count || 0);
  const userForms = await db.select({ id: forms.id }).from(forms).where(eq7(forms.userId, userId));
  const formsCount = userForms.length;
  let formSubmissionsCount = 0;
  if (userForms.length > 0) {
    const formIds = userForms.map((f) => f.id);
    const [submissionsResult] = await db.select({ count: sql12`count(*)` }).from(formSubmissions).where(inArray3(formSubmissions.formId, formIds));
    formSubmissionsCount = Number(submissionsResult?.count || 0);
  }
  const [kbResult] = await db.select({ count: sql12`count(*)` }).from(knowledgeBase).where(eq7(knowledgeBase.userId, userId));
  const knowledgeBaseCount = Number(kbResult?.count || 0);
  const [webhooksResult] = await db.select({ count: sql12`count(*)` }).from(webhookSubscriptions).where(eq7(webhookSubscriptions.userId, userId));
  const webhooksCount = Number(webhooksResult?.count || 0);
  const [userTemplatesResult] = await db.select({ count: sql12`count(*)` }).from(promptTemplates).where(eq7(promptTemplates.userId, userId));
  const userTemplatesCount = Number(userTemplatesResult?.count || 0);
  const [systemTemplatesResult] = await db.select({ count: sql12`count(*)` }).from(promptTemplates).where(eq7(promptTemplates.isSystemTemplate, true));
  const systemTemplatesCount = Number(systemTemplatesResult?.count || 0);
  const templatesCount = userTemplatesCount + systemTemplatesCount;
  const sentimentDistribution = {
    positive: allUserCalls.filter((c) => c.sentiment === "positive").length,
    neutral: allUserCalls.filter((c) => c.sentiment === "neutral").length,
    negative: allUserCalls.filter((c) => c.sentiment === "negative").length
  };
  const incomingAllTime = allUserCalls.filter(isIncomingCall);
  const outgoingAllTime = allUserCalls.filter(isOutgoingCall);
  const incomingAllStats = calcStats(incomingAllTime);
  const outgoingAllStats = calcStats(outgoingAllTime);
  return {
    callTypeStats: {
      incoming: {
        count: incomingAllTime.length,
        trend: calcTrend(incomingThisWeek.length, incomingPrevWeek.length),
        successRate: incomingAllStats.successRate,
        avgDuration: incomingAllStats.avgDuration
      },
      outgoing: {
        count: outgoingAllTime.length,
        trend: calcTrend(outgoingThisWeek.length, outgoingPrevWeek.length),
        successRate: outgoingAllStats.successRate,
        avgDuration: outgoingAllStats.avgDuration
      },
      campaign: {
        count: totalCampaigns,
        active: activeCampaigns,
        completed: completedCampaigns,
        successRate: campaignSuccessRate,
        avgDuration: campaignAvgDuration,
        totalCalls: allCampaignCalls.length
      }
    },
    weeklyCallsChart: dailyBreakdown,
    leadDistribution,
    sentimentDistribution,
    recentCalls: recentCalls.map((c) => ({
      ...c,
      callType: isBatchCall(c) ? "batch" : c.callDirection === "incoming" || c.incomingConnectionId ? "incoming" : "outgoing"
    })),
    recentUsers,
    userName: currentUser?.name || currentUser?.email?.split("@")[0] || "User",
    totalCalls: allUserCalls.length,
    totalThisWeek: thisWeekCalls.length,
    totalPrevWeek: prevWeekCalls.length,
    weeklyTrend: calcTrend(thisWeekCalls.length, prevWeekCalls.length),
    appointmentsBooked: appointmentsCount,
    formsSubmitted: formSubmissionsCount,
    formsCount,
    knowledgeBaseCount,
    webhooksCount,
    templatesCount
  };
}
var init_analytics_helpers = __esm({
  "server/storage/analytics-helpers.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/storage.ts
import { nanoid } from "nanoid";
import { eq as eq8, sql as sql13, and as and2, gte as gte2, lte as lte2, desc as desc2, asc, isNull as isNull2, isNotNull as isNotNull2, or as or2, inArray as inArray4, ilike, count } from "drizzle-orm";
function userSubscriptionPreferenceOrder() {
  return [
    sql13`CASE WHEN ${userSubscriptions.status} = 'active' THEN 0 ELSE 1 END`,
    sql13`CASE WHEN ${userSubscriptions.status} = 'active' THEN ${userSubscriptions.currentPeriodEnd} END DESC NULLS LAST`,
    desc2(userSubscriptions.createdAt)
  ];
}
var DbStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_analytics_helpers();
    DbStorage = class {
      // Users
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq8(users.id, id));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq8(users.email, email));
        return user;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async updateUserCredits(userId, credits) {
        await db.update(users).set({ credits }).where(eq8(users.id, userId));
      }
      // Agents
      async getAgent(id) {
        const [agent] = await db.select().from(agents).where(eq8(agents.id, id));
        return agent;
      }
      async getUserAgents(userId) {
        return db.select().from(agents).where(eq8(agents.userId, userId));
      }
      async createAgent(insertAgent) {
        const [agent] = await db.insert(agents).values(insertAgent).returning();
        return agent;
      }
      async updateAgent(id, agent) {
        await db.update(agents).set(agent).where(eq8(agents.id, id));
      }
      async deleteAgent(id) {
        await db.delete(agents).where(eq8(agents.id, id));
      }
      // Knowledge Base
      async getKnowledgeBaseItem(id) {
        const [item] = await db.select().from(knowledgeBase).where(eq8(knowledgeBase.id, id));
        return item;
      }
      async getUserKnowledgeBase(userId) {
        return db.select().from(knowledgeBase).where(eq8(knowledgeBase.userId, userId));
      }
      async getUserKnowledgeBaseCount(userId) {
        const result = await db.select({ count: sql13`count(*)` }).from(knowledgeBase).where(eq8(knowledgeBase.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async createKnowledgeBaseItem(insertItem) {
        const [item] = await db.insert(knowledgeBase).values(insertItem).returning();
        return item;
      }
      async updateKnowledgeBaseItem(id, item) {
        await db.update(knowledgeBase).set(item).where(eq8(knowledgeBase.id, id));
      }
      async deleteKnowledgeBaseItem(id) {
        await db.delete(knowledgeBase).where(eq8(knowledgeBase.id, id));
      }
      // Campaigns
      async getCampaign(id) {
        const [campaign] = await db.select().from(campaigns).where(and2(
          eq8(campaigns.id, id),
          isNull2(campaigns.deletedAt)
        ));
        return campaign;
      }
      async getCampaignIncludingDeleted(id) {
        const [campaign] = await db.select().from(campaigns).where(eq8(campaigns.id, id));
        return campaign;
      }
      async getUserCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq8(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async getUserDeletedCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq8(campaigns.userId, userId),
          isNotNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async createCampaign(insertCampaign) {
        const [campaign] = await db.insert(campaigns).values(insertCampaign).returning();
        return campaign;
      }
      async updateCampaign(id, campaign) {
        await db.update(campaigns).set(campaign).where(eq8(campaigns.id, id));
      }
      async deleteCampaign(id) {
        await db.update(campaigns).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq8(campaigns.id, id));
      }
      async restoreCampaign(id) {
        await db.update(campaigns).set({ deletedAt: null }).where(eq8(campaigns.id, id));
      }
      // Contacts
      async getContact(id) {
        const [contact] = await db.select().from(contacts).where(eq8(contacts.id, id));
        return contact;
      }
      async getCampaignContacts(campaignId) {
        return db.select().from(contacts).where(eq8(contacts.campaignId, campaignId));
      }
      async getUserContacts(userId) {
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq8(contacts.campaignId, campaigns.id)).where(and2(
          eq8(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        ));
        return results.map((r) => ({
          ...r.contact,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null
        }));
      }
      async getUserContactsDeduplicated(userId) {
        const normalizePhone = (phone) => {
          let cleaned = phone.replace(/[\s\-().]/g, "");
          if (cleaned.startsWith("00")) cleaned = "+" + cleaned.slice(2);
          if (!cleaned.startsWith("+") && cleaned.length >= 10) cleaned = "+" + cleaned;
          return cleaned;
        };
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq8(contacts.campaignId, campaigns.id)).where(and2(
          eq8(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(contacts.createdAt));
        const phoneGroups = /* @__PURE__ */ new Map();
        for (const result of results) {
          const { contact, campaign } = result;
          const phone = normalizePhone(contact.phone);
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: contact.email,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set(),
              latestContactId: contact.id,
              latestStatus: contact.status,
              latestEmail: contact.email,
              latestCreatedAt: contact.createdAt,
              source: "campaign",
              callCount: 0
            });
          }
          const group = phoneGroups.get(phone);
          const nameKey = `${contact.firstName.toLowerCase()}|${(contact.lastName || "").toLowerCase()}`;
          if (!group.names.has(nameKey)) {
            group.names.add(nameKey);
            group.namesList.push({
              firstName: contact.firstName,
              lastName: contact.lastName
            });
          }
          if (!group.campaigns.has(campaign.id) && campaign) {
            group.campaigns.add(campaign.id);
            group.campaignsList.push({
              id: campaign.id,
              name: campaign.name
            });
          }
          group.statuses.add(contact.status);
          if (contact.createdAt > group.latestCreatedAt) {
            group.latestContactId = contact.id;
            group.latestStatus = contact.status;
            group.latestEmail = contact.email;
            group.latestCreatedAt = contact.createdAt;
          }
        }
        const callsWithoutContacts = await db.select({
          phoneNumber: calls.phoneNumber,
          callDirection: calls.callDirection,
          createdAt: calls.createdAt,
          status: calls.status
        }).from(calls).where(and2(
          eq8(calls.userId, userId),
          isNull2(calls.contactId),
          isNotNull2(calls.phoneNumber)
        )).orderBy(desc2(calls.createdAt));
        for (const call of callsWithoutContacts) {
          const rawPhone = call.phoneNumber;
          if (!rawPhone || rawPhone === "Unknown Caller" || rawPhone === "unknown") continue;
          const phone = normalizePhone(rawPhone);
          const callStatus = call.callDirection === "incoming" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `call-${phone}`,
              // Virtual ID for call-only contacts
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const leadsResults = await db.select({
          phone: leads.phone,
          firstName: leads.firstName,
          lastName: leads.lastName,
          email: leads.email,
          stage: leads.stage,
          sourceType: leads.sourceType,
          createdAt: leads.createdAt,
          id: leads.id
        }).from(leads).where(eq8(leads.userId, userId)).orderBy(desc2(leads.createdAt));
        for (const lead of leadsResults) {
          if (!lead.phone || lead.phone === "Unknown Caller" || lead.phone === "unknown") continue;
          const phone = normalizePhone(lead.phone);
          const leadStatus = `lead_${lead.stage || "new"}`;
          const leadSource = lead.sourceType === "campaign" ? "campaign" : "call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: lead.email,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([leadStatus]),
              latestContactId: lead.id,
              latestStatus: leadStatus,
              latestEmail: lead.email,
              latestCreatedAt: lead.createdAt,
              source: leadSource,
              callCount: 0
            });
            if (lead.firstName) {
              const nameKey = `${lead.firstName.toLowerCase()}|${(lead.lastName || "").toLowerCase()}`;
              phoneGroups.get(phone).names.add(nameKey);
              phoneGroups.get(phone).namesList.push({
                firstName: lead.firstName,
                lastName: lead.lastName
              });
            }
          } else {
            const group = phoneGroups.get(phone);
            group.statuses.add(leadStatus);
            if (lead.email) {
              group.latestEmail = lead.email;
            }
            if (lead.firstName) {
              const nameKey = `${lead.firstName.toLowerCase()}|${(lead.lastName || "").toLowerCase()}`;
              if (!group.names.has(nameKey)) {
                group.names.add(nameKey);
                group.namesList.unshift({
                  firstName: lead.firstName,
                  lastName: lead.lastName
                });
              }
            }
            if (lead.createdAt > group.latestCreatedAt) {
              group.latestContactId = lead.id;
              group.latestStatus = leadStatus;
              group.latestCreatedAt = lead.createdAt;
            }
          }
        }
        const twilioOpenaiCallsResults = await db.select({
          fromNumber: twilioOpenaiCalls.fromNumber,
          toNumber: twilioOpenaiCalls.toNumber,
          callDirection: twilioOpenaiCalls.callDirection,
          createdAt: twilioOpenaiCalls.createdAt,
          status: twilioOpenaiCalls.status
        }).from(twilioOpenaiCalls).where(and2(
          eq8(twilioOpenaiCalls.userId, userId),
          isNull2(twilioOpenaiCalls.contactId)
        )).orderBy(desc2(twilioOpenaiCalls.createdAt));
        for (const call of twilioOpenaiCallsResults) {
          const rawTwPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawTwPhone || rawTwPhone === "Unknown Caller" || rawTwPhone === "unknown") continue;
          const phone = normalizePhone(rawTwPhone);
          const callStatus = call.callDirection === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `twilio-openai-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const plivoCallsResults = await db.select({
          fromNumber: plivoCalls.fromNumber,
          toNumber: plivoCalls.toNumber,
          callDirection: plivoCalls.callDirection,
          createdAt: plivoCalls.createdAt,
          status: plivoCalls.status
        }).from(plivoCalls).where(and2(
          eq8(plivoCalls.userId, userId),
          isNull2(plivoCalls.contactId)
        )).orderBy(desc2(plivoCalls.createdAt));
        for (const call of plivoCallsResults) {
          const rawPlPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawPlPhone || rawPlPhone === "Unknown Caller" || rawPlPhone === "unknown") continue;
          const phone = normalizePhone(rawPlPhone);
          const callStatus = call.callDirection === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `plivo-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const sipCallsResults = await db.select({
          fromNumber: sipCalls.fromNumber,
          toNumber: sipCalls.toNumber,
          direction: sipCalls.direction,
          createdAt: sipCalls.createdAt,
          status: sipCalls.status
        }).from(sipCalls).where(and2(
          eq8(sipCalls.userId, userId),
          isNull2(sipCalls.contactId)
        )).orderBy(desc2(sipCalls.createdAt));
        for (const call of sipCallsResults) {
          const rawSipPhone = call.direction === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawSipPhone || rawSipPhone === "Unknown Caller" || rawSipPhone === "unknown") continue;
          const phone = normalizePhone(rawSipPhone);
          const callStatus = call.direction === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `sip-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt || /* @__PURE__ */ new Date(0),
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt && call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        return Array.from(phoneGroups.values()).map((group) => ({
          id: group.latestContactId,
          phone: group.phone,
          email: group.latestEmail,
          names: group.namesList,
          campaigns: group.campaignsList,
          status: group.latestStatus,
          allStatuses: Array.from(group.statuses),
          source: group.source,
          callCount: group.callCount
        }));
      }
      async createContact(insertContact) {
        const [contact] = await db.insert(contacts).values(insertContact).returning();
        return contact;
      }
      async createContacts(insertContacts) {
        return db.insert(contacts).values(insertContacts).returning();
      }
      async deleteContact(id) {
        await db.delete(contacts).where(eq8(contacts.id, id));
      }
      // Calls
      async getCall(id) {
        const [call] = await db.select().from(calls).where(eq8(calls.id, id));
        return call;
      }
      async getCallWithDetails(id) {
        const elevenLabsResults = await db.select({
          call: calls,
          campaign: campaigns,
          contact: contacts,
          incomingConnection: incomingConnections,
          widget: websiteWidgets
        }).from(calls).leftJoin(campaigns, eq8(calls.campaignId, campaigns.id)).leftJoin(contacts, eq8(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq8(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq8(calls.widgetId, websiteWidgets.id)).where(eq8(calls.id, id));
        if (elevenLabsResults.length > 0) {
          const r = elevenLabsResults[0];
          const metadataEngine = r.call.metadata?.engine;
          const engine = metadataEngine || "elevenlabs";
          return {
            ...r.call,
            engine,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: r.incomingConnection ? { id: r.incomingConnection.id, agentId: r.incomingConnection.agentId } : null,
            widget: r.widget ? { id: r.widget.id, name: r.widget.name } : null
          };
        }
        const twilioOpenAIResults = await db.select({
          call: twilioOpenaiCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq8(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq8(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq8(twilioOpenaiCalls.agentId, agents.id)).where(eq8(twilioOpenaiCalls.id, id));
        if (twilioOpenAIResults.length > 0) {
          const r = twilioOpenAIResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.fromNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            twilioSid: r.call.twilioCallSid,
            status: r.call.status,
            callDirection: r.call.callDirection === "inbound" ? "incoming" : r.call.callDirection === "outbound" ? "outgoing" : r.call.callDirection,
            duration: r.call.duration,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment,
            wasTransferred: r.call.wasTransferred,
            transferredTo: r.call.transferredTo,
            transferredAt: r.call.transferredAt,
            startedAt: r.call.startedAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: "twilio-openai",
            openaiSessionId: r.call.openaiSessionId,
            openaiVoice: r.call.openaiVoice,
            openaiModel: r.call.openaiModel,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        const plivoResults = await db.select({
          call: plivoCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(plivoCalls).leftJoin(campaigns, eq8(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq8(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq8(plivoCalls.agentId, agents.id)).where(eq8(plivoCalls.id, id));
        if (plivoResults.length > 0) {
          const r = plivoResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.fromNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            plivoCallUuid: r.call.plivoCallUuid,
            status: r.call.status,
            callDirection: r.call.callDirection === "inbound" ? "incoming" : r.call.callDirection === "outbound" ? "outgoing" : r.call.callDirection,
            duration: r.call.duration,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment,
            leadQualityScore: r.call.leadQualityScore,
            keyPoints: r.call.keyPoints,
            nextActions: r.call.nextActions,
            wasTransferred: r.call.wasTransferred,
            transferredTo: r.call.transferredTo,
            transferredAt: r.call.transferredAt,
            startedAt: r.call.startedAt,
            answeredAt: r.call.answeredAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: "plivo-openai",
            openaiSessionId: r.call.openaiSessionId,
            openaiVoice: r.call.openaiVoice,
            openaiModel: r.call.openaiModel,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        const sipResults = await db.select({
          call: sipCalls,
          agent: agents,
          contact: contacts
        }).from(sipCalls).leftJoin(agents, eq8(sipCalls.agentId, agents.id)).leftJoin(contacts, eq8(sipCalls.contactId, contacts.id)).where(eq8(sipCalls.id, id));
        if (sipResults.length > 0) {
          const r = sipResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.direction === "inbound" ? r.call.fromNumber : r.call.toNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            status: r.call.status,
            callDirection: r.call.direction === "inbound" ? "incoming" : "outgoing",
            duration: r.call.durationSeconds,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment || r.call.metadata?.sentiment || null,
            classification: r.call.classification || r.call.metadata?.classification || null,
            startedAt: r.call.startedAt,
            answeredAt: r.call.answeredAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: r.call.engine,
            sipTrunkId: r.call.sipTrunkId,
            sipPhoneNumberId: r.call.sipPhoneNumberId,
            elevenLabsConversationId: r.call.elevenlabsConversationId,
            elevenlabsConversationId: r.call.elevenlabsConversationId,
            externalCallId: r.call.externalCallId,
            openaiCallId: r.call.openaiCallId,
            creditsUsed: r.call.creditsUsed,
            sipHeaders: r.call.sipHeaders,
            campaign: null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        return void 0;
      }
      async getCampaignCalls(campaignId) {
        return db.select().from(calls).where(eq8(calls.campaignId, campaignId));
      }
      async getUserCalls(userId) {
        const results = await db.select({ calls }).from(calls).leftJoin(campaigns, eq8(calls.campaignId, campaigns.id)).leftJoin(incomingConnections, eq8(calls.incomingConnectionId, incomingConnections.id)).where(
          or2(
            eq8(calls.userId, userId),
            and2(isNotNull2(calls.campaignId), eq8(campaigns.userId, userId)),
            and2(isNotNull2(calls.incomingConnectionId), eq8(incomingConnections.userId, userId))
          )
        );
        return results.map((r) => r.calls);
      }
      async getUserCallsWithDetails(userId) {
        const elevenLabsResults = await db.select({
          call: calls,
          campaign: campaigns,
          contact: contacts,
          incomingConnection: incomingConnections,
          widget: websiteWidgets
        }).from(calls).leftJoin(campaigns, eq8(calls.campaignId, campaigns.id)).leftJoin(contacts, eq8(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq8(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq8(calls.widgetId, websiteWidgets.id)).where(
          or2(
            // Primary filter: Direct user ownership (guaranteed isolation)
            eq8(calls.userId, userId),
            // Fallback for legacy calls: Check via campaign ownership
            and2(isNotNull2(calls.campaignId), eq8(campaigns.userId, userId)),
            // Fallback for legacy calls: Check via incoming connection ownership
            and2(isNotNull2(calls.incomingConnectionId), eq8(incomingConnections.userId, userId))
          )
        ).orderBy(sql13`${calls.createdAt} DESC`);
        const elevenLabsCalls = elevenLabsResults.map((r) => {
          const metadataEngine = r.call.metadata?.engine;
          const engine = metadataEngine || "elevenlabs";
          return {
            ...r.call,
            engine,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: r.incomingConnection ? { id: r.incomingConnection.id, agentId: r.incomingConnection.agentId } : null,
            widget: r.widget ? { id: r.widget.id, name: r.widget.name } : null
          };
        });
        const twilioOpenAIResults = await db.select({
          call: twilioOpenaiCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq8(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq8(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq8(twilioOpenaiCalls.agentId, agents.id)).where(eq8(twilioOpenaiCalls.userId, userId)).orderBy(sql13`${twilioOpenaiCalls.createdAt} DESC`);
        const twilioOpenAICalls = twilioOpenAIResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.fromNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          twilioSid: r.call.twilioCallSid,
          status: r.call.status,
          callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
          duration: r.call.duration,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment,
          wasTransferred: r.call.wasTransferred,
          transferredTo: r.call.transferredTo,
          transferredAt: r.call.transferredAt,
          startedAt: r.call.startedAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: "twilio-openai",
          openaiSessionId: r.call.openaiSessionId,
          openaiVoice: r.call.openaiVoice,
          openaiModel: r.call.openaiModel,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const plivoResults = await db.select({
          call: plivoCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(plivoCalls).leftJoin(campaigns, eq8(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq8(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq8(plivoCalls.agentId, agents.id)).where(eq8(plivoCalls.userId, userId)).orderBy(sql13`${plivoCalls.createdAt} DESC`);
        const plivoOpenAICalls = plivoResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.fromNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          plivoCallUuid: r.call.plivoCallUuid,
          status: r.call.status,
          callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
          duration: r.call.duration,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment,
          leadQualityScore: r.call.leadQualityScore,
          keyPoints: r.call.keyPoints,
          nextActions: r.call.nextActions,
          wasTransferred: r.call.wasTransferred,
          transferredTo: r.call.transferredTo,
          transferredAt: r.call.transferredAt,
          startedAt: r.call.startedAt,
          answeredAt: r.call.answeredAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: "plivo-openai",
          openaiSessionId: r.call.openaiSessionId,
          openaiVoice: r.call.openaiVoice,
          openaiModel: r.call.openaiModel,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const sipCallResults = await db.select({
          call: sipCalls,
          agent: agents,
          contact: contacts
        }).from(sipCalls).leftJoin(agents, eq8(sipCalls.agentId, agents.id)).leftJoin(contacts, eq8(sipCalls.contactId, contacts.id)).where(eq8(sipCalls.userId, userId)).orderBy(sql13`${sipCalls.createdAt} DESC`);
        const sipCallsFormatted = sipCallResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.direction === "inbound" ? r.call.fromNumber : r.call.toNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          status: r.call.status,
          callDirection: r.call.direction === "inbound" ? "incoming" : "outgoing",
          duration: r.call.durationSeconds,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment || r.call.metadata?.sentiment || null,
          classification: r.call.classification || r.call.metadata?.classification || null,
          startedAt: r.call.startedAt,
          answeredAt: r.call.answeredAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: r.call.engine,
          sipTrunkId: r.call.sipTrunkId,
          sipPhoneNumberId: r.call.sipPhoneNumberId,
          elevenLabsConversationId: r.call.elevenlabsConversationId,
          elevenlabsConversationId: r.call.elevenlabsConversationId,
          creditsUsed: r.call.creditsUsed,
          campaign: null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const twilioOpenAIByCampaignContact = new Set(
          twilioOpenAICalls.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const plivoByCampaignContact = new Set(
          plivoOpenAICalls.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const filteredElevenLabsCalls = elevenLabsCalls.filter((c) => {
          if (!c.campaignId || !c.contactId) return true;
          const md = c.metadata || {};
          if (md.batchCall !== true) return true;
          const key = `${c.campaignId}:${c.contactId}`;
          if (md.telephonyProvider === "twilio_openai" && twilioOpenAIByCampaignContact.has(key)) {
            return false;
          }
          if (md.telephonyProvider === "plivo" && plivoByCampaignContact.has(key)) {
            return false;
          }
          return true;
        });
        const allCalls = [...filteredElevenLabsCalls, ...twilioOpenAICalls, ...plivoOpenAICalls, ...sipCallsFormatted];
        allCalls.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        return allCalls;
      }
      async createCall(insertCall) {
        const [call] = await db.insert(calls).values(insertCall).returning();
        return call;
      }
      async updateCall(id, call) {
        await db.update(calls).set(call).where(eq8(calls.id, id));
      }
      // Credit Transactions
      async getCreditTransaction(id) {
        const [transaction] = await db.select().from(creditTransactions).where(eq8(creditTransactions.id, id));
        return transaction;
      }
      async getUserCreditTransactions(userId) {
        return db.select().from(creditTransactions).where(eq8(creditTransactions.userId, userId));
      }
      async createCreditTransaction(insertTransaction) {
        const [transaction] = await db.insert(creditTransactions).values(insertTransaction).returning();
        return transaction;
      }
      // Atomic credit purchase: creates transaction + adds credits in single DB transaction
      async addCreditsAtomic(userId, credits, description, reference, executor) {
        const run = async (tx) => {
          if (executor) {
            const [dup] = await tx.select({ id: creditTransactions.id }).from(creditTransactions).where(eq8(creditTransactions.stripePaymentId, reference)).limit(1);
            if (dup) throw new Error(`duplicate credit reference ${reference}`);
          }
          await tx.insert(creditTransactions).values({
            userId,
            type: "credit",
            amount: credits,
            description,
            stripePaymentId: reference
          });
          await tx.execute(sql13`
        UPDATE users 
        SET credits = COALESCE(credits, 0) + ${credits}
        WHERE id = ${userId}
      `);
        };
        if (executor) {
          await run(executor);
        } else {
          await db.transaction(async (tx) => run(tx));
        }
      }
      // Tools
      async getTool(id) {
        const [tool] = await db.select().from(tools).where(eq8(tools.id, id));
        return tool;
      }
      async getUserTools(userId) {
        return db.select().from(tools).where(eq8(tools.userId, userId));
      }
      async createTool(insertTool) {
        const [tool] = await db.insert(tools).values(insertTool).returning();
        return tool;
      }
      async updateTool(id, tool) {
        await db.update(tools).set(tool).where(eq8(tools.id, id));
      }
      async deleteTool(id) {
        await db.delete(tools).where(eq8(tools.id, id));
      }
      // Phone Number Rentals
      async createPhoneNumberRental(insertRental) {
        const [rental] = await db.insert(phoneNumberRentals).values(insertRental).returning();
        return rental;
      }
      async getPhoneNumberRentals(phoneNumberId) {
        return db.select().from(phoneNumberRentals).where(eq8(phoneNumberRentals.phoneNumberId, phoneNumberId)).orderBy(desc2(phoneNumberRentals.createdAt));
      }
      // Voices
      async getVoice(id) {
        const [voice] = await db.select().from(voices).where(eq8(voices.id, id));
        return voice;
      }
      async getUserVoices(userId) {
        return db.select().from(voices).where(eq8(voices.userId, userId));
      }
      async createVoice(insertVoice) {
        const [voice] = await db.insert(voices).values(insertVoice).returning();
        return voice;
      }
      async deleteVoice(id) {
        await db.delete(voices).where(eq8(voices.id, id));
      }
      // Plans
      async getPlan(id) {
        const [plan] = await db.select().from(plans).where(eq8(plans.id, id));
        return plan;
      }
      async getPlanByName(name) {
        const [plan] = await db.select().from(plans).where(eq8(plans.name, name));
        return plan;
      }
      async getAllPlans() {
        return db.select().from(plans).where(eq8(plans.isActive, true));
      }
      async createPlan(insertPlan) {
        const [plan] = await db.insert(plans).values(insertPlan).returning();
        return plan;
      }
      async updatePlan(id, plan) {
        const result = await db.update(plans).set(plan).where(eq8(plans.id, id)).returning({ id: plans.id });
        if (result.length === 0) {
          throw new Error(`Failed to update plan: Plan with id '${id}' not found`);
        }
      }
      async deletePlan(id) {
        await db.delete(plans).where(eq8(plans.id, id));
      }
      // Global Settings
      async getGlobalSetting(key) {
        const [setting] = await db.select().from(globalSettings).where(eq8(globalSettings.key, key));
        if (setting && setting.value !== null && setting.value !== void 0) {
          let val = setting.value;
          if (typeof val === "string" && val.startsWith('"') && val.endsWith('"')) {
            try {
              val = JSON.parse(val);
            } catch {
            }
          }
          return { ...setting, value: val };
        }
        return setting;
      }
      async updateGlobalSetting(key, value) {
        try {
          const jsonValue = JSON.stringify(value);
          await db.execute(sql13`
        INSERT INTO global_settings (id, key, value, updated_at)
        VALUES (gen_random_uuid(), ${key}, ${jsonValue}::jsonb, NOW())
        ON CONFLICT (key) DO UPDATE SET 
          value = ${jsonValue}::jsonb,
          updated_at = NOW()
      `);
          console.log(`\u2705 [Settings] Saved setting '${key}' successfully`);
        } catch (error) {
          console.error(`\u274C [Settings] Failed to save setting '${key}':`, error.message);
          throw new Error(`Failed to save setting '${key}': ${error.message}`);
        }
      }
      // Credit Packages
      async getCreditPackage(id) {
        const [pack] = await db.select().from(creditPackages).where(eq8(creditPackages.id, id));
        return pack;
      }
      async getAllCreditPackages() {
        return db.select().from(creditPackages).where(eq8(creditPackages.isActive, true));
      }
      async createCreditPackage(insertPack) {
        const [pack] = await db.insert(creditPackages).values(insertPack).returning();
        return pack;
      }
      async updateCreditPackage(id, pack) {
        const result = await db.update(creditPackages).set(pack).where(eq8(creditPackages.id, id)).returning({ id: creditPackages.id });
        if (result.length === 0) {
          throw new Error(`Failed to update credit package: Package with id '${id}' not found`);
        }
      }
      // Admin Functions
      async getAllUsers() {
        return db.select().from(users).orderBy(desc2(users.createdAt));
      }
      async getAllAdminUsers() {
        return db.select().from(users).where(
          sql13`${users.role} = 'admin'`
        ).orderBy(desc2(users.createdAt));
      }
      async updateUser(id, user) {
        const result = await db.update(users).set(user).where(eq8(users.id, id)).returning({ id: users.id });
        if (result.length === 0) {
          throw new Error(`Failed to update user: User with id '${id}' not found`);
        }
      }
      async getSystemPhoneNumbers() {
        const results = await db.select({
          phone: phoneNumbers,
          user: users
        }).from(phoneNumbers).leftJoin(users, eq8(phoneNumbers.userId, users.id));
        return results.map((r) => ({
          ...r.phone,
          userEmail: r.user?.email
        }));
      }
      async getGlobalAnalytics(timeRange) {
        return calculateGlobalAnalytics(timeRange);
      }
      // User Subscriptions
      async getUserSubscription(userId) {
        const result = await db.select({
          subscription: userSubscriptions,
          plan: plans
        }).from(userSubscriptions).leftJoin(plans, eq8(userSubscriptions.planId, plans.id)).where(eq8(userSubscriptions.userId, userId)).orderBy(...userSubscriptionPreferenceOrder()).limit(1);
        if (result.length > 0 && result[0].subscription && result[0].plan) {
          return {
            ...result[0].subscription,
            plan: result[0].plan
          };
        }
        const [freePlan] = await db.select().from(plans).where(eq8(plans.name, "free")).limit(1);
        if (!freePlan) {
          return null;
        }
        return null;
      }
      async getAllUserSubscriptions() {
        return await db.select().from(userSubscriptions);
      }
      async createUserSubscription(insertSubscription) {
        const [subscription] = await db.insert(userSubscriptions).values(insertSubscription).returning();
        return subscription;
      }
      async updateUserSubscription(id, subscription) {
        await db.update(userSubscriptions).set(subscription).where(eq8(userSubscriptions.id, id));
      }
      async updateUserSubscriptionByUserId(userId, subscription) {
        await db.update(userSubscriptions).set({ ...subscription, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(userSubscriptions.userId, userId));
      }
      // Get effective limits for a user - merges plan defaults with per-user overrides
      async getUserEffectiveLimits(userId) {
        const subscriptionWithPlan = await this.getUserSubscription(userId);
        const defaultLimits = {
          maxAgents: 1,
          maxCampaigns: 1,
          maxContactsPerCampaign: 5,
          maxWebhooks: 3,
          maxKnowledgeBases: 5,
          maxFlows: 3,
          maxPhoneNumbers: 0,
          includedCredits: 0,
          sources: {
            maxAgents: "plan",
            maxCampaigns: "plan",
            maxContactsPerCampaign: "plan",
            maxWebhooks: "plan",
            maxKnowledgeBases: "plan",
            maxFlows: "plan",
            maxPhoneNumbers: "plan",
            includedCredits: "plan"
          },
          planName: "free",
          planDisplayName: "Free"
        };
        if (!subscriptionWithPlan || !subscriptionWithPlan.plan) {
          const [freePlan] = await db.select().from(plans).where(eq8(plans.name, "free")).limit(1);
          if (freePlan) {
            return {
              maxAgents: freePlan.maxAgents,
              maxCampaigns: freePlan.maxCampaigns,
              maxContactsPerCampaign: freePlan.maxContactsPerCampaign,
              maxWebhooks: freePlan.maxWebhooks ?? 3,
              maxKnowledgeBases: freePlan.maxKnowledgeBases ?? 5,
              maxFlows: freePlan.maxFlows ?? 3,
              maxPhoneNumbers: freePlan.maxPhoneNumbers ?? 0,
              includedCredits: freePlan.includedCredits,
              sources: {
                maxAgents: "plan",
                maxCampaigns: "plan",
                maxContactsPerCampaign: "plan",
                maxWebhooks: "plan",
                maxKnowledgeBases: "plan",
                maxFlows: "plan",
                maxPhoneNumbers: "plan",
                includedCredits: "plan"
              },
              planName: freePlan.name,
              planDisplayName: freePlan.displayName
            };
          }
          return defaultLimits;
        }
        const plan = subscriptionWithPlan.plan;
        const sub = subscriptionWithPlan;
        return {
          maxAgents: sub.overrideMaxAgents ?? plan.maxAgents,
          maxCampaigns: sub.overrideMaxCampaigns ?? plan.maxCampaigns,
          maxContactsPerCampaign: sub.overrideMaxContactsPerCampaign ?? plan.maxContactsPerCampaign,
          maxWebhooks: sub.overrideMaxWebhooks ?? plan.maxWebhooks ?? 3,
          maxKnowledgeBases: sub.overrideMaxKnowledgeBases ?? plan.maxKnowledgeBases ?? 5,
          maxFlows: sub.overrideMaxFlows ?? plan.maxFlows ?? 3,
          maxPhoneNumbers: sub.overrideMaxPhoneNumbers ?? plan.maxPhoneNumbers ?? 0,
          includedCredits: sub.overrideIncludedCredits ?? plan.includedCredits,
          sources: {
            maxAgents: sub.overrideMaxAgents !== null ? "override" : "plan",
            maxCampaigns: sub.overrideMaxCampaigns !== null ? "override" : "plan",
            maxContactsPerCampaign: sub.overrideMaxContactsPerCampaign !== null ? "override" : "plan",
            maxWebhooks: sub.overrideMaxWebhooks !== null ? "override" : "plan",
            maxKnowledgeBases: sub.overrideMaxKnowledgeBases !== null ? "override" : "plan",
            maxFlows: sub.overrideMaxFlows !== null ? "override" : "plan",
            maxPhoneNumbers: sub.overrideMaxPhoneNumbers !== null ? "override" : "plan",
            includedCredits: sub.overrideIncludedCredits !== null ? "override" : "plan"
          },
          planName: plan.name,
          planDisplayName: plan.displayName
        };
      }
      // Phone Numbers
      async getPhoneNumber(id) {
        const [phoneNumber] = await db.select().from(phoneNumbers).where(eq8(phoneNumbers.id, id));
        return phoneNumber;
      }
      async getUserPhoneNumbers(userId) {
        return db.select().from(phoneNumbers).where(eq8(phoneNumbers.userId, userId));
      }
      async getAllPhoneNumbers() {
        return db.select().from(phoneNumbers);
      }
      async createPhoneNumber(insertPhoneNumber) {
        const [phoneNumber] = await db.insert(phoneNumbers).values(insertPhoneNumber).returning();
        return phoneNumber;
      }
      async updatePhoneNumber(id, phoneNumber) {
        await db.update(phoneNumbers).set(phoneNumber).where(eq8(phoneNumbers.id, id));
      }
      async deletePhoneNumber(id) {
        await db.delete(phoneNumbers).where(eq8(phoneNumbers.id, id));
      }
      // Usage Records
      async createUsageRecord(insertRecord) {
        const [record] = await db.insert(usageRecords).values(insertRecord).returning();
        return record;
      }
      async getUserUsageRecords(userId) {
        return db.select().from(usageRecords).where(eq8(usageRecords.userId, userId));
      }
      // Analytics methods - delegate to extracted helper functions
      async getUserAnalytics(userId, timeRange = "7days", callType = "all") {
        return calculateUserAnalytics(userId, timeRange, callType);
      }
      async getDashboardData(userId) {
        return calculateDashboardData(userId);
      }
      // Webhooks (Subscriptions)
      async getWebhook(id) {
        const [webhook] = await db.select().from(webhookSubscriptions).where(eq8(webhookSubscriptions.id, id));
        return webhook;
      }
      async getUserWebhooks(userId) {
        return await db.select().from(webhookSubscriptions).where(eq8(webhookSubscriptions.userId, userId)).orderBy(desc2(webhookSubscriptions.createdAt));
      }
      async getUserWebhookCount(userId) {
        const result = await db.select({ count: sql13`count(*)` }).from(webhookSubscriptions).where(eq8(webhookSubscriptions.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async getWebhooksForEvent(userId, event, campaignId) {
        const allUserWebhooks = await db.select().from(webhookSubscriptions).where(and2(
          eq8(webhookSubscriptions.userId, userId),
          eq8(webhookSubscriptions.isActive, true)
        ));
        return allUserWebhooks.filter((webhook) => {
          if (!webhook.events.includes(event)) return false;
          if (campaignId && webhook.campaignIds && webhook.campaignIds.length > 0) {
            return webhook.campaignIds.includes(campaignId);
          }
          return true;
        });
      }
      async createWebhook(webhook) {
        const [newWebhook] = await db.insert(webhookSubscriptions).values({
          ...webhook,
          id: nanoid()
        }).returning();
        return newWebhook;
      }
      async updateWebhook(id, webhook) {
        const updateData = { ...webhook, updatedAt: /* @__PURE__ */ new Date() };
        await db.update(webhookSubscriptions).set(updateData).where(eq8(webhookSubscriptions.id, id));
      }
      async deleteWebhook(id) {
        await db.delete(webhookSubscriptions).where(eq8(webhookSubscriptions.id, id));
      }
      // Webhook Delivery Logs
      async getWebhookLog(id) {
        const [log] = await db.select().from(webhookDeliveryLogs).where(eq8(webhookDeliveryLogs.id, id));
        return log;
      }
      async getWebhookLogs(webhookId, limit = 50) {
        return await db.select().from(webhookDeliveryLogs).where(eq8(webhookDeliveryLogs.webhookId, webhookId)).orderBy(desc2(webhookDeliveryLogs.createdAt)).limit(limit);
      }
      async createWebhookLog(log) {
        const [newLog] = await db.insert(webhookDeliveryLogs).values(log).returning();
        return newLog;
      }
      async updateWebhookLog(id, log) {
        await db.update(webhookDeliveryLogs).set(log).where(eq8(webhookDeliveryLogs.id, id));
      }
      async getFailedWebhookLogs(limit = 100) {
        return await db.select().from(webhookDeliveryLogs).where(and2(
          eq8(webhookDeliveryLogs.success, false),
          isNotNull2(webhookDeliveryLogs.nextRetryAt)
        )).orderBy(asc(webhookDeliveryLogs.nextRetryAt)).limit(limit);
      }
      // Notifications
      async getNotification(id) {
        const [notification] = await db.select().from(notifications).where(eq8(notifications.id, id));
        return notification;
      }
      async getUserNotifications(userId, limit = 50) {
        return await db.select().from(notifications).where(eq8(notifications.userId, userId)).orderBy(desc2(notifications.createdAt)).limit(limit);
      }
      async getUnreadNotificationCount(userId) {
        const result = await db.select({ count: sql13`count(*)` }).from(notifications).where(and2(eq8(notifications.userId, userId), eq8(notifications.isRead, false)));
        return Number(result[0]?.count || 0);
      }
      async createNotification(notification) {
        const [newNotification] = await db.insert(notifications).values(notification).returning();
        return newNotification;
      }
      async markNotificationAsRead(id) {
        await db.update(notifications).set({ isRead: true }).where(eq8(notifications.id, id));
      }
      async markAllNotificationsAsRead(userId) {
        await db.update(notifications).set({ isRead: true }).where(eq8(notifications.userId, userId));
      }
      async getBannerNotifications(userId) {
        return await db.select().from(notifications).where(and2(
          eq8(notifications.userId, userId),
          or2(
            eq8(notifications.displayType, "banner"),
            eq8(notifications.displayType, "both")
          ),
          eq8(notifications.isDismissed, false),
          or2(
            isNull2(notifications.expiresAt),
            gte2(notifications.expiresAt, /* @__PURE__ */ new Date())
          )
        )).orderBy(desc2(notifications.priority), desc2(notifications.createdAt));
      }
      async dismissNotification(id, userId) {
        if (userId) {
          await db.update(notifications).set({ isDismissed: true }).where(and2(eq8(notifications.id, id), eq8(notifications.userId, userId)));
        } else {
          await db.update(notifications).set({ isDismissed: true }).where(eq8(notifications.id, id));
        }
      }
      async deleteNotification(id) {
        await db.delete(notifications).where(eq8(notifications.id, id));
      }
      // Email Templates
      async getEmailTemplates() {
        return await db.select().from(emailTemplates).orderBy(emailTemplates.templateType);
      }
      async getEmailTemplate(templateType) {
        const [template] = await db.select().from(emailTemplates).where(eq8(emailTemplates.templateType, templateType));
        return template;
      }
      async updateEmailTemplate(id, data) {
        await db.update(emailTemplates).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(emailTemplates.id, id));
      }
      async createEmailTemplate(data) {
        const [template] = await db.insert(emailTemplates).values(data).returning();
        return template;
      }
      // Prompt Templates
      async getPromptTemplate(id) {
        const [template] = await db.select().from(promptTemplates).where(eq8(promptTemplates.id, id));
        return template;
      }
      async getUserPromptTemplates(userId) {
        return await db.select().from(promptTemplates).where(eq8(promptTemplates.userId, userId)).orderBy(desc2(promptTemplates.createdAt));
      }
      async getSystemPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq8(promptTemplates.isSystemTemplate, true)).orderBy(asc(promptTemplates.category), asc(promptTemplates.name));
      }
      async getPublicPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq8(promptTemplates.isPublic, true)).orderBy(desc2(promptTemplates.usageCount), asc(promptTemplates.name));
      }
      async createPromptTemplate(template) {
        const [newTemplate] = await db.insert(promptTemplates).values(template).returning();
        return newTemplate;
      }
      async updatePromptTemplate(id, template) {
        await db.update(promptTemplates).set({ ...template, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(promptTemplates.id, id));
      }
      async deletePromptTemplate(id) {
        await db.delete(promptTemplates).where(eq8(promptTemplates.id, id));
      }
      async incrementPromptTemplateUsage(id) {
        await db.update(promptTemplates).set({
          usageCount: sql13`${promptTemplates.usageCount} + 1`,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq8(promptTemplates.id, id));
      }
      // Agent Versions
      async getAgentVersion(id) {
        const [version] = await db.select().from(agentVersions).where(eq8(agentVersions.id, id));
        return version;
      }
      async getAgentVersions(agentId) {
        return await db.select().from(agentVersions).where(eq8(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber));
      }
      async getAgentVersionByNumber(agentId, versionNumber) {
        const [version] = await db.select().from(agentVersions).where(and2(
          eq8(agentVersions.agentId, agentId),
          eq8(agentVersions.versionNumber, versionNumber)
        ));
        return version;
      }
      async getLatestAgentVersion(agentId) {
        const [version] = await db.select().from(agentVersions).where(eq8(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber)).limit(1);
        return version;
      }
      async createAgentVersion(version) {
        const [newVersion] = await db.insert(agentVersions).values(version).returning();
        return newVersion;
      }
      // SEO Settings
      async getSeoSettings() {
        const [settings] = await db.select().from(seoSettings).limit(1);
        return settings;
      }
      async updateSeoSettings(settings) {
        const existing = await this.getSeoSettings();
        if (existing) {
          const updateData = { ...settings, updatedAt: /* @__PURE__ */ new Date() };
          const [updated] = await db.update(seoSettings).set(updateData).where(eq8(seoSettings.id, existing.id)).returning();
          return updated;
        } else {
          const [created] = await db.insert(seoSettings).values(settings).returning();
          return created;
        }
      }
      // Analytics Scripts
      async getAnalyticsScript(id) {
        const [script] = await db.select().from(analyticsScripts).where(eq8(analyticsScripts.id, id));
        return script;
      }
      async getAllAnalyticsScripts() {
        return db.select().from(analyticsScripts).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async getEnabledAnalyticsScripts() {
        return db.select().from(analyticsScripts).where(eq8(analyticsScripts.enabled, true)).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async createAnalyticsScript(script) {
        const [created] = await db.insert(analyticsScripts).values(script).returning();
        return created;
      }
      async updateAnalyticsScript(id, script) {
        const updateData = { ...script, updatedAt: /* @__PURE__ */ new Date() };
        await db.update(analyticsScripts).set(updateData).where(eq8(analyticsScripts.id, id));
      }
      async deleteAnalyticsScript(id) {
        await db.delete(analyticsScripts).where(eq8(analyticsScripts.id, id));
      }
      // Payment Transactions
      async getPaymentTransaction(id) {
        const [transaction] = await db.select().from(paymentTransactions).where(eq8(paymentTransactions.id, id));
        return transaction;
      }
      async getPaymentTransactionByGatewayId(gateway, gatewayTransactionId) {
        const [transaction] = await db.select().from(paymentTransactions).where(and2(
          eq8(paymentTransactions.gateway, gateway),
          eq8(paymentTransactions.gatewayTransactionId, gatewayTransactionId)
        ));
        return transaction;
      }
      async getPaymentTransactionByOrderId(gatewayOrderId) {
        const [transaction] = await db.select().from(paymentTransactions).where(eq8(paymentTransactions.gatewayOrderId, gatewayOrderId)).limit(1);
        return transaction;
      }
      async getUserPaymentTransactions(userId) {
        return db.select().from(paymentTransactions).where(eq8(paymentTransactions.userId, userId)).orderBy(desc2(paymentTransactions.createdAt));
      }
      async getAllPaymentTransactions(filters) {
        const conditions = [];
        if (filters?.gateway) {
          conditions.push(eq8(paymentTransactions.gateway, filters.gateway));
        }
        if (filters?.type) {
          conditions.push(eq8(paymentTransactions.type, filters.type));
        }
        if (filters?.status) {
          conditions.push(eq8(paymentTransactions.status, filters.status));
        }
        if (filters?.startDate) {
          conditions.push(gte2(paymentTransactions.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte2(paymentTransactions.createdAt, filters.endDate));
        }
        if (conditions.length > 0) {
          return db.select().from(paymentTransactions).where(and2(...conditions)).orderBy(desc2(paymentTransactions.createdAt));
        }
        return db.select().from(paymentTransactions).orderBy(desc2(paymentTransactions.createdAt));
      }
      async createPaymentTransaction(transaction) {
        const [created] = await db.insert(paymentTransactions).values(transaction).returning();
        return created;
      }
      async updatePaymentTransaction(id, transaction) {
        await db.update(paymentTransactions).set({ ...transaction, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(paymentTransactions.id, id));
      }
      async getPaymentAnalytics(startDate, endDate) {
        const revenueStatuses = ["completed", "refunded", "partially_refunded"];
        const conditions = [];
        if (startDate) conditions.push(gte2(paymentTransactions.createdAt, startDate));
        if (endDate) conditions.push(lte2(paymentTransactions.createdAt, endDate));
        const transactions = await db.select().from(paymentTransactions).where(
          conditions.length > 0 ? and2(
            inArray4(paymentTransactions.status, revenueStatuses),
            ...conditions
          ) : inArray4(paymentTransactions.status, revenueStatuses)
        );
        const dateConditions = [];
        if (startDate) dateConditions.push(gte2(paymentTransactions.createdAt, startDate));
        if (endDate) dateConditions.push(lte2(paymentTransactions.createdAt, endDate));
        const allTransactions = await db.select().from(paymentTransactions).where(dateConditions.length > 0 ? and2(...dateConditions) : void 0);
        const refundConditions = [];
        if (startDate) refundConditions.push(gte2(refunds.createdAt, startDate));
        if (endDate) refundConditions.push(lte2(refunds.createdAt, endDate));
        const allRefunds = await db.select().from(refunds).where(refundConditions.length > 0 ? and2(...refundConditions) : void 0);
        let totalRevenue = 0;
        const revenueByGateway = {};
        const revenueByType = {};
        const transactionsByStatus = {};
        for (const tx of transactions) {
          const amount = parseFloat(tx.amount || "0");
          totalRevenue += amount;
          revenueByGateway[tx.gateway] = (revenueByGateway[tx.gateway] || 0) + amount;
          revenueByType[tx.type] = (revenueByType[tx.type] || 0) + amount;
        }
        for (const tx of allTransactions) {
          transactionsByStatus[tx.status] = (transactionsByStatus[tx.status] || 0) + 1;
        }
        let totalRefunded = 0;
        for (const refund of allRefunds) {
          totalRefunded += parseFloat(refund.amount || "0");
        }
        return {
          totalRevenue,
          revenueByGateway,
          revenueByType,
          transactionCount: allTransactions.length,
          transactionsByStatus,
          refundCount: allRefunds.length,
          totalRefunded
        };
      }
      // Refunds
      async getRefund(id) {
        const [refund] = await db.select().from(refunds).where(eq8(refunds.id, id));
        return refund;
      }
      async getTransactionRefunds(transactionId) {
        return db.select().from(refunds).where(eq8(refunds.transactionId, transactionId)).orderBy(desc2(refunds.createdAt));
      }
      async getUserRefunds(userId) {
        return db.select().from(refunds).where(eq8(refunds.userId, userId)).orderBy(desc2(refunds.createdAt));
      }
      async getAllRefunds() {
        return db.select().from(refunds).orderBy(desc2(refunds.createdAt));
      }
      async createRefund(refund) {
        const [created] = await db.insert(refunds).values(refund).returning();
        return created;
      }
      async updateRefund(id, refund) {
        await db.update(refunds).set({ ...refund, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(refunds.id, id));
      }
      // Invoices
      async getInvoice(id) {
        const [invoice] = await db.select().from(invoices).where(eq8(invoices.id, id));
        return invoice;
      }
      async getInvoiceByNumber(invoiceNumber) {
        const [invoice] = await db.select().from(invoices).where(eq8(invoices.invoiceNumber, invoiceNumber));
        return invoice;
      }
      /** The tax invoice of a transaction (credit notes share the transactionId and are excluded). */
      async getTransactionInvoice(transactionId) {
        const [invoice] = await db.select().from(invoices).where(and2(eq8(invoices.transactionId, transactionId), eq8(invoices.invoiceType, "tax_invoice"))).orderBy(asc(invoices.createdAt)).limit(1);
        return invoice;
      }
      async getTransactionCreditNotes(transactionId) {
        return db.select().from(invoices).where(and2(eq8(invoices.transactionId, transactionId), eq8(invoices.invoiceType, "credit_note"))).orderBy(asc(invoices.createdAt));
      }
      async getUserInvoices(userId) {
        return db.select().from(invoices).where(eq8(invoices.userId, userId)).orderBy(desc2(invoices.createdAt));
      }
      async getAllInvoices() {
        return db.select().from(invoices).orderBy(desc2(invoices.createdAt));
      }
      async createInvoice(invoice) {
        const [created] = await db.insert(invoices).values(invoice).returning();
        return created;
      }
      async updateInvoice(id, invoice) {
        await db.update(invoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(invoices.id, id));
      }
      async getUserInvoicesPaginated(userId, options) {
        const limit = Math.min(Math.max(options.limit ?? 20, 1), 100);
        const offset = Math.max(options.offset ?? 0, 0);
        const conditions = [eq8(invoices.userId, userId)];
        if (options.type) conditions.push(eq8(invoices.invoiceType, options.type));
        const where = and2(...conditions);
        const [rows, [{ value: total }]] = await Promise.all([
          db.select().from(invoices).where(where).orderBy(desc2(invoices.issuedAt), desc2(invoices.createdAt)).limit(limit).offset(offset),
          db.select({ value: count() }).from(invoices).where(where)
        ]);
        return { invoices: rows, total: Number(total) };
      }
      async getAdminInvoices(filters) {
        const limit = Math.min(Math.max(filters.limit ?? 50, 1), 200);
        const offset = Math.max(filters.offset ?? 0, 0);
        const conditions = [];
        if (filters.userId) conditions.push(eq8(invoices.userId, filters.userId));
        if (filters.type) conditions.push(eq8(invoices.invoiceType, filters.type));
        if (filters.startDate) conditions.push(gte2(invoices.issuedAt, filters.startDate));
        if (filters.endDate) conditions.push(lte2(invoices.issuedAt, filters.endDate));
        if (filters.search) {
          const pattern = `%${filters.search.replace(/[%_\\]/g, "\\$&")}%`;
          const searchCondition = or2(
            ilike(invoices.invoiceNumber, pattern),
            ilike(invoices.customerEmail, pattern),
            ilike(invoices.customerName, pattern)
          );
          if (searchCondition) conditions.push(searchCondition);
        }
        const where = conditions.length > 0 ? and2(...conditions) : void 0;
        const [rows, [{ value: total }]] = await Promise.all([
          db.select({ invoice: invoices, userName: users.name, userEmail: users.email }).from(invoices).leftJoin(users, eq8(invoices.userId, users.id)).where(where).orderBy(desc2(invoices.issuedAt), desc2(invoices.createdAt)).limit(limit).offset(offset),
          db.select({ value: count() }).from(invoices).where(where)
        ]);
        return {
          invoices: rows.map((r) => ({ ...r.invoice, userName: r.userName, userEmail: r.userEmail })),
          total: Number(total)
        };
      }
      /**
       * Computes the next sequence for `<prefix>/<FY>/<NNNN>`. Numbering is per prefix (tax invoice prefix
       * or 'CN' for credit notes) and per financial year. Must run inside the advisory lock to be safe.
       */
      async computeNextInvoiceNumber(executor, numbering) {
        const prefix = numbering.prefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "INV";
        const fy = numbering.financialYear;
        const likePattern = `${prefix}/${fy}/%`;
        const result = await executor.execute(sql13`
      SELECT MAX(CAST(SPLIT_PART(${invoices.invoiceNumber}, '/', 3) AS INTEGER)) as max_num
      FROM ${invoices}
      WHERE ${invoices.invoiceNumber} LIKE ${likePattern}
        AND SPLIT_PART(${invoices.invoiceNumber}, '/', 3) ~ '^[0-9]+$'
    `);
        const maxNum = result.rows?.[0]?.max_num;
        let nextNum = 1;
        if (numbering.startNumber && numbering.startNumber > 0) nextNum = numbering.startNumber;
        if (maxNum !== null && maxNum !== void 0 && !isNaN(Number(maxNum))) {
          nextNum = Math.max(Number(maxNum) + 1, nextNum);
        }
        return `${prefix}/${fy}/${String(nextNum).padStart(4, "0")}`;
      }
      async getNextInvoiceNumber(numbering) {
        const resolved = numbering ?? await this.defaultInvoiceNumbering();
        return this.computeNextInvoiceNumber(db, resolved);
      }
      async defaultInvoiceNumbering() {
        const [prefixSetting] = await db.select().from(globalSettings).where(eq8(globalSettings.key, "invoice_prefix"));
        const rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "AIC";
        const now = /* @__PURE__ */ new Date();
        const ist = new Date(now.getTime() + 330 * 60 * 1e3);
        const year = ist.getUTCFullYear();
        const startYear = ist.getUTCMonth() + 1 >= 4 ? year : year - 1;
        const yy = (n) => String(n % 100).padStart(2, "0");
        return { prefix: rawPrefix || "AIC", financialYear: `${yy(startYear)}-${yy(startYear + 1)}` };
      }
      async createInvoiceWithNumber(invoice, numbering) {
        const lockKey = `invoice_number:${numbering.prefix}:${numbering.financialYear}`;
        return db.transaction(async (tx) => {
          await tx.execute(sql13`SELECT pg_advisory_xact_lock(hashtext(${lockKey}))`);
          const invoiceNumber = await this.computeNextInvoiceNumber(tx, numbering);
          const [created] = await tx.insert(invoices).values({ ...invoice, invoiceNumber }).returning();
          return created;
        });
      }
      async getNextRefundNoteNumber() {
        const [prefixSetting] = await db.select().from(globalSettings).where(eq8(globalSettings.key, "refund_note_prefix"));
        let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "RF";
        const prefix = rawPrefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "RF";
        const result = await db.execute(sql13`
      SELECT MAX(
        CAST(
          REGEXP_REPLACE(refund_note_number, '^[A-Za-z]+', '', 'g') 
          AS INTEGER
        )
      ) as max_num
      FROM refunds
      WHERE refund_note_number ~ ${`^${prefix}[0-9]+$`}
    `);
        let nextNum = 1;
        const maxNum = result.rows?.[0]?.max_num;
        if (maxNum !== null && maxNum !== void 0 && !isNaN(Number(maxNum))) {
          nextNum = Number(maxNum) + 1;
        }
        return `${prefix}${String(nextNum).padStart(2, "0")}`;
      }
      // Payment Webhook Queue
      async getWebhookQueueItem(id) {
        const [item] = await db.select().from(paymentWebhookQueue).where(eq8(paymentWebhookQueue.id, id));
        return item;
      }
      async getPendingWebhooks() {
        return db.select().from(paymentWebhookQueue).where(eq8(paymentWebhookQueue.status, "pending")).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      async getWebhookByEventId(gateway, eventId) {
        const [item] = await db.select().from(paymentWebhookQueue).where(and2(
          eq8(paymentWebhookQueue.gateway, gateway),
          eq8(paymentWebhookQueue.eventId, eventId)
        ));
        return item;
      }
      async createWebhookQueueItem(item) {
        const [created] = await db.insert(paymentWebhookQueue).values(item).returning();
        return created;
      }
      async updateWebhookQueueItem(id, item) {
        await db.update(paymentWebhookQueue).set(item).where(eq8(paymentWebhookQueue.id, id));
      }
      async getExpiredWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          eq8(paymentWebhookQueue.status, "pending"),
          lte2(paymentWebhookQueue.expiresAt, now)
        ));
      }
      async getRetryableWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          or2(
            eq8(paymentWebhookQueue.status, "pending"),
            eq8(paymentWebhookQueue.status, "failed")
          ),
          sql13`${paymentWebhookQueue.attemptCount} < ${paymentWebhookQueue.maxAttempts}`,
          or2(
            isNull2(paymentWebhookQueue.nextRetryAt),
            lte2(paymentWebhookQueue.nextRetryAt, now)
          ),
          gte2(paymentWebhookQueue.expiresAt, now)
        )).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      // Email Notification Settings
      async getEmailNotificationSetting(eventType) {
        const [setting] = await db.select().from(emailNotificationSettings).where(eq8(emailNotificationSettings.eventType, eventType));
        return setting;
      }
      async getAllEmailNotificationSettings() {
        return db.select().from(emailNotificationSettings).orderBy(asc(emailNotificationSettings.category), asc(emailNotificationSettings.eventType));
      }
      async getEmailNotificationSettingsByCategory(category) {
        return db.select().from(emailNotificationSettings).where(eq8(emailNotificationSettings.category, category)).orderBy(asc(emailNotificationSettings.eventType));
      }
      async createEmailNotificationSetting(setting) {
        const [created] = await db.insert(emailNotificationSettings).values(setting).returning();
        return created;
      }
      async updateEmailNotificationSetting(eventType, setting) {
        await db.update(emailNotificationSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(emailNotificationSettings.eventType, eventType));
      }
      // Admin Call Monitoring
      async getAdminCalls(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq8(calls.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq8(calls.status, options.status));
        }
        if (options.startDate) {
          conditions.push(gte2(calls.createdAt, options.startDate));
        }
        if (options.endDate) {
          conditions.push(lte2(calls.createdAt, options.endDate));
        }
        if (options.search) {
          const escapeLike2 = (term) => term.replace(/[\\%_]/g, (ch) => `\\${ch}`);
          const searchPattern = `%${escapeLike2(options.search)}%`;
          conditions.push(
            or2(
              sql13`${calls.phoneNumber} ILIKE ${searchPattern} ESCAPE '\\'`,
              sql13`${calls.transcript} ILIKE ${searchPattern} ESCAPE '\\'`
            )
          );
        }
        const whereClause = conditions.length > 0 ? and2(...conditions) : void 0;
        const violationCountSubquery = db.select({
          callId: contentViolations.callId,
          count: sql13`count(*)`.as("violation_count"),
          summary: sql13`string_agg(${contentViolations.detectedWord}, ', ' ORDER BY ${contentViolations.createdAt} DESC)`.as("violation_summary")
        }).from(contentViolations).groupBy(contentViolations.callId).as("violation_counts");
        let query = db.select({
          call: calls,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          campaign: {
            id: campaigns.id,
            name: campaigns.name
          },
          violationCount: sql13`COALESCE(${violationCountSubquery.count}, 0)`,
          violationSummary: sql13`${violationCountSubquery.summary}`
        }).from(calls).leftJoin(users, eq8(calls.userId, users.id)).leftJoin(campaigns, eq8(calls.campaignId, campaigns.id)).leftJoin(violationCountSubquery, eq8(calls.id, violationCountSubquery.callId));
        if (whereClause) {
          query = query.where(whereClause);
        }
        if (options.hasViolations === true) {
          query = query.where(sql13`COALESCE(${violationCountSubquery.count}, 0) > 0`);
        } else if (options.hasViolations === false) {
          query = query.where(sql13`COALESCE(${violationCountSubquery.count}, 0) = 0`);
        }
        const results = await query.orderBy(desc2(calls.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql13`count(*)` }).from(calls).where(whereClause);
        const totalItems = Number(countResult[0]?.count || 0);
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
          data: results.map((r) => ({
            ...r.call,
            user: r.user,
            campaign: r.campaign,
            violationCount: Number(r.violationCount),
            violationSummary: r.violationSummary || null
          })),
          pagination: { page, pageSize, totalItems, totalPages }
        };
      }
      async getAdminCallById(id) {
        const [result] = await db.select({
          call: calls,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          campaign: {
            id: campaigns.id,
            name: campaigns.name
          },
          contact: {
            id: contacts.id,
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            phone: contacts.phone,
            email: contacts.email
          }
        }).from(calls).leftJoin(users, eq8(calls.userId, users.id)).leftJoin(campaigns, eq8(calls.campaignId, campaigns.id)).leftJoin(contacts, eq8(calls.contactId, contacts.id)).where(eq8(calls.id, id));
        if (!result) return void 0;
        const violations = await this.getViolationsByCallId(id);
        return {
          ...result.call,
          user: result.user,
          campaign: result.campaign,
          contact: result.contact,
          violations
        };
      }
      async getUserById(id) {
        return this.getUser(id);
      }
      // Content Violations
      async getViolationsByCallId(callId) {
        return db.select().from(contentViolations).where(eq8(contentViolations.callId, callId)).orderBy(desc2(contentViolations.createdAt));
      }
      async getContentViolations(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq8(contentViolations.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq8(contentViolations.status, options.status));
        }
        if (options.severity) {
          conditions.push(eq8(contentViolations.severity, options.severity));
        }
        if (options.startDate) {
          conditions.push(gte2(contentViolations.createdAt, options.startDate));
        }
        if (options.endDate) {
          conditions.push(lte2(contentViolations.createdAt, options.endDate));
        }
        const whereClause = conditions.length > 0 ? and2(...conditions) : void 0;
        let query = db.select({
          violation: contentViolations,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          call: {
            id: calls.id,
            phoneNumber: calls.phoneNumber,
            status: calls.status
          }
        }).from(contentViolations).leftJoin(users, eq8(contentViolations.userId, users.id)).leftJoin(calls, eq8(contentViolations.callId, calls.id));
        if (whereClause) {
          query = query.where(whereClause);
        }
        const results = await query.orderBy(desc2(contentViolations.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql13`count(*)` }).from(contentViolations).where(whereClause);
        const totalItems = Number(countResult[0]?.count || 0);
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
          data: results.map((r) => ({
            ...r.violation,
            user: r.user,
            call: r.call
          })),
          pagination: { page, pageSize, totalItems, totalPages }
        };
      }
      async updateContentViolation(id, data) {
        const [updated] = await db.update(contentViolations).set(data).where(eq8(contentViolations.id, id)).returning();
        return updated;
      }
      async createContentViolation(data) {
        const [violation] = await db.insert(contentViolations).values(data).returning();
        return violation;
      }
      // Banned Words
      async getBannedWords() {
        return db.select().from(bannedWords).orderBy(asc(bannedWords.word));
      }
      async getActiveBannedWords() {
        return db.select().from(bannedWords).where(eq8(bannedWords.isActive, true)).orderBy(asc(bannedWords.word));
      }
      async createBannedWord(data) {
        const [word] = await db.insert(bannedWords).values(data).returning();
        return word;
      }
      async updateBannedWord(id, data) {
        const [updated] = await db.update(bannedWords).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(bannedWords.id, id)).returning();
        return updated;
      }
      async deleteBannedWord(id) {
        const result = await db.delete(bannedWords).where(eq8(bannedWords.id, id)).returning();
        return result.length > 0;
      }
      async getCallsWithTranscripts() {
        return db.select().from(calls).where(and2(
          isNotNull2(calls.transcript),
          sql13`${calls.transcript} != ''`
        ));
      }
      // Demo Sessions - Browser-based demo calls
      async createDemoSession(data) {
        const [session] = await db.insert(demoSessions).values(data).returning();
        return session;
      }
      async getDemoSession(id) {
        const [session] = await db.select().from(demoSessions).where(eq8(demoSessions.id, id));
        return session;
      }
      async getDemoSessionByToken(token) {
        const [session] = await db.select().from(demoSessions).where(eq8(demoSessions.sessionToken, token));
        return session;
      }
      async updateDemoSession(id, data) {
        await db.update(demoSessions).set(data).where(eq8(demoSessions.id, id));
      }
      async getActiveDemoSessionCount() {
        const result = await db.select({ count: sql13`count(*)` }).from(demoSessions).where(eq8(demoSessions.status, "active"));
        return Number(result[0]?.count || 0);
      }
      async getRecentDemoSessionByIp(ip, cooldownMinutes) {
        const cooldownTime = new Date(Date.now() - cooldownMinutes * 60 * 1e3);
        const [session] = await db.select().from(demoSessions).where(and2(
          eq8(demoSessions.visitorIp, ip),
          gte2(demoSessions.createdAt, cooldownTime)
        )).orderBy(desc2(demoSessions.createdAt)).limit(1);
        return session;
      }
      async getDemoSessionStats(days = 30) {
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
        const sessions = await db.select().from(demoSessions).where(gte2(demoSessions.createdAt, startDate));
        const completed = sessions.filter((s) => s.status === "completed");
        const totalDuration = completed.reduce((sum, s) => sum + (s.duration || 0), 0);
        const languageBreakdown = {};
        for (const session of sessions) {
          languageBreakdown[session.language] = (languageBreakdown[session.language] || 0) + 1;
        }
        return {
          totalSessions: sessions.length,
          completedSessions: completed.length,
          averageDuration: completed.length > 0 ? Math.round(totalDuration / completed.length) : 0,
          languageBreakdown
        };
      }
    };
    storage = new DbStorage();
  }
});

// server/services/notification-service.ts
async function getLowCreditsThreshold() {
  const now = Date.now();
  if (cachedLowCreditsThreshold !== null && now - thresholdCacheTime < THRESHOLD_CACHE_TTL) {
    return cachedLowCreditsThreshold;
  }
  try {
    const setting = await storage.getGlobalSetting("low_credits_threshold");
    const threshold = typeof setting?.value === "number" ? setting.value : DEFAULT_LOW_CREDITS_THRESHOLD;
    cachedLowCreditsThreshold = threshold;
    thresholdCacheTime = now;
    return threshold;
  } catch (error) {
    console.error("[NotificationService] Failed to fetch low_credits_threshold, using default:", error);
    return DEFAULT_LOW_CREDITS_THRESHOLD;
  }
}
async function getAppName() {
  const now = Date.now();
  if (cachedAppName !== null && now - appNameCacheTime < THRESHOLD_CACHE_TTL) {
    return cachedAppName;
  }
  try {
    const setting = await storage.getGlobalSetting("app_name");
    const appName = typeof setting?.value === "string" ? setting.value : DEFAULT_APP_NAME;
    cachedAppName = appName;
    appNameCacheTime = now;
    return appName;
  } catch (error) {
    console.error("[NotificationService] Failed to fetch app_name, using default:", error);
    return DEFAULT_APP_NAME;
  }
}
var DEFAULT_LOW_CREDITS_THRESHOLD, DEFAULT_APP_NAME, cachedLowCreditsThreshold, thresholdCacheTime, THRESHOLD_CACHE_TTL, cachedAppName, appNameCacheTime, EVENT_NOTIFICATION_STYLE, NotificationService;
var init_notification_service = __esm({
  "server/services/notification-service.ts"() {
    "use strict";
    init_storage();
    DEFAULT_LOW_CREDITS_THRESHOLD = 50;
    DEFAULT_APP_NAME = "";
    cachedLowCreditsThreshold = null;
    thresholdCacheTime = 0;
    THRESHOLD_CACHE_TTL = 5 * 60 * 1e3;
    cachedAppName = null;
    appNameCacheTime = 0;
    EVENT_NOTIFICATION_STYLE = {
      welcome: { icon: "sparkles", priority: 0 },
      purchase_completed: { icon: "credit-card", priority: 10 },
      invoice_created: { icon: "file-text", priority: 5 },
      payment_failed: { icon: "alert-triangle", priority: 80 },
      refund_processed: { icon: "rotate-ccw", priority: 20 },
      credits_added: { icon: "coins", priority: 10 },
      credits_added_by_admin: { icon: "gift", priority: 10 },
      low_credits: { icon: "alert-circle", priority: 60 },
      plan_activated: { icon: "crown", priority: 20 },
      plan_renewed: { icon: "refresh-cw", priority: 10 },
      plan_expiring: { icon: "clock", priority: 50 },
      plan_expired: { icon: "alert-triangle", priority: 70 },
      phone_number_purchased: { icon: "phone", priority: 10 },
      phone_number_expiring: { icon: "clock", priority: 40 },
      phone_number_released: { icon: "phone-off", priority: 70 },
      phone_billing_failed: { icon: "alert-triangle", priority: 80 },
      campaign_completed: { icon: "check-circle", priority: 10 },
      campaign_failed: { icon: "x-circle", priority: 70 },
      kyc_approved: { icon: "shield-check", priority: 20 },
      kyc_rejected: { icon: "shield-alert", priority: 60 },
      account_reactivated: { icon: "check-circle", priority: 20 }
    };
    NotificationService = {
      async create(options) {
        try {
          await storage.createNotification({
            userId: options.userId,
            type: options.type,
            title: options.title,
            message: options.message,
            link: options.link || null,
            icon: options.icon || null,
            displayType: options.displayType || "bell",
            priority: options.priority ?? 0,
            dismissible: options.dismissible ?? true,
            expiresAt: options.expiresAt || null
          });
        } catch (error) {
          console.error("Failed to create notification:", error);
        }
      },
      /**
       * Generic in-app notification for a dispatcher event (used by event-dispatcher).
       * Returns true when the row was created, false on failure (never throws).
       */
      async createForEvent(eventKey, userId, title, message, link) {
        const style = EVENT_NOTIFICATION_STYLE[eventKey] || { icon: "bell", priority: 0 };
        try {
          await storage.createNotification({
            userId,
            type: eventKey,
            title,
            message,
            link: link || null,
            icon: style.icon,
            displayType: style.priority >= 50 ? "both" : "bell",
            priority: style.priority,
            dismissible: true,
            expiresAt: null
          });
          return true;
        } catch (error) {
          console.error(`[NotificationService] Failed to create ${eventKey} notification for ${userId}:`, error);
          return false;
        }
      },
      async notifyLowCredits(userId, currentCredits) {
        await this.create({
          userId,
          type: "low_credits",
          title: "Low Credits Warning",
          message: `Your credit balance is low (${currentCredits} credits remaining). Purchase more credits to continue using phone numbers and making calls.`,
          link: "/app/billing"
        });
      },
      async notifyMembershipUpgraded(userId, planName) {
        await this.create({
          userId,
          type: "membership_upgraded",
          title: "Welcome to Pro",
          message: `Your membership has been upgraded to ${planName}. You now have unlimited agents, campaigns, and contacts!`,
          link: "/app/billing"
        });
      },
      async notifyMembershipCancelled(userId) {
        await this.create({
          userId,
          type: "membership_expiry",
          title: "Membership Cancelled",
          message: "Your Pro membership has been cancelled. You'll continue to have Pro access until the end of your billing period.",
          link: "/app/billing"
        });
      },
      async notifyCampaignCompleted(userId, campaignId, campaignName, callCount) {
        await this.create({
          userId,
          type: "campaign_completed",
          title: "Campaign Completed",
          message: `Campaign "${campaignName}" has completed with ${callCount} calls made.`,
          link: `/app/campaigns/${campaignId}`
        });
      },
      async notifyCampaignFailed(userId, campaignId, campaignName, error) {
        await this.create({
          userId,
          type: "campaign_failed",
          title: "Campaign Failed",
          message: `Campaign "${campaignName}" failed: ${error}`,
          link: `/app/campaigns/${campaignId}`
        });
      },
      async notifyCampaignPaused(userId, campaignId, campaignName, reason) {
        await this.create({
          userId,
          type: "campaign_paused",
          title: "Campaign Paused",
          message: `Campaign "${campaignName}" has been paused: ${reason}`,
          link: `/app/campaigns/${campaignId}`
        });
      },
      async notifyPhoneBillingSuccess(userId, phoneNumber, creditsCharged) {
        await this.create({
          userId,
          type: "phone_billing_success",
          title: "Phone Number Renewed",
          message: `Phone number ${phoneNumber} has been renewed for ${creditsCharged} credits.`,
          link: "/app/phone-numbers"
        });
      },
      async notifyPhoneBillingFailed(userId, phoneNumber, reason) {
        await this.create({
          userId,
          type: "phone_billing_failed",
          title: "Phone Number Billing Failed",
          message: `Phone number ${phoneNumber} billing failed: ${reason}. The number has been released.`,
          link: "/app/phone-numbers"
        });
      },
      async notifyCallCreditFailed(userId, options) {
        const { callId, creditsRequired, currentBalance, durationSeconds } = options;
        const durationText = durationSeconds && durationSeconds > 0 ? ` (${Math.ceil(durationSeconds / 60)} min call)` : "";
        await this.create({
          userId,
          type: "call_credit_failed",
          title: "Call Could Not Be Billed",
          message: `A call ended but your credit balance was too low to bill it${durationText}. Required ${creditsRequired} credits, balance ${currentBalance}. Top up to keep new calls running.`,
          link: `/app/calls/${callId}`,
          icon: "alert-triangle",
          priority: 70,
          displayType: "both"
        });
      },
      async notifyPhoneReleased(userId, phoneNumber) {
        await this.create({
          userId,
          type: "phone_released",
          title: "Phone Number Released",
          message: `Phone number ${phoneNumber} has been released due to insufficient credits.`,
          link: "/app/phone-numbers"
        });
      },
      async notifyWelcome(userId, userName) {
        const appName = await getAppName();
        await this.create({
          userId,
          type: "welcome",
          title: `Welcome to ${appName}, ${userName}`,
          message: "Get started by creating your first AI agent and launching a campaign. Check out our knowledge base for tips and best practices.",
          link: "/app/agents"
        });
      },
      async createNotificationForAllAdmins(options) {
        try {
          const adminUsers = await storage.getAllAdminUsers();
          for (const admin of adminUsers) {
            await this.create({
              ...options,
              userId: admin.id
            });
          }
        } catch (error) {
          console.error("Failed to create admin notifications:", error);
        }
      },
      async notifyAdmins(title, message, severity = "info") {
        const icon = severity === "critical" ? "alert-triangle" : severity === "warning" ? "alert-circle" : "info";
        await this.createNotificationForAllAdmins({
          type: `admin_${severity}`,
          title,
          message,
          icon,
          priority: severity === "critical" ? 100 : severity === "warning" ? 50 : 0,
          displayType: severity === "critical" ? "both" : "bell"
        });
      },
      async notifyPaymentFailed(userId) {
        await this.create({
          userId,
          type: "payment_failed",
          title: "Payment Failed",
          message: "Your subscription payment failed. Please update your payment method to maintain your Pro membership.",
          link: "/app/billing",
          icon: "credit-card",
          priority: 80,
          displayType: "both"
        });
      },
      async notifySubscriptionPastDue(userId) {
        await this.create({
          userId,
          type: "subscription_past_due",
          title: "Payment Overdue",
          message: "Your subscription is past due. Please update your payment method to avoid losing access to Pro features.",
          link: "/app/billing",
          icon: "alert-triangle",
          priority: 90,
          displayType: "both"
        });
      },
      async shouldNotifyLowCredits(currentCredits) {
        const threshold = await getLowCreditsThreshold();
        return currentCredits > 0 && currentCredits <= threshold;
      },
      // Utility to get current threshold (for email service, etc.)
      async getLowCreditsThreshold() {
        return getLowCreditsThreshold();
      }
    };
  }
});

// server/engines/plivo/services/openai-pool.service.ts
var openai_pool_service_exports = {};
__export(openai_pool_service_exports, {
  OpenAIPoolService: () => OpenAIPoolService
});
import { eq as eq11, and as and3, desc as desc3, asc as asc2, sql as sql14 } from "drizzle-orm";
var lastNotificationThreshold, OpenAIPoolService;
var init_openai_pool_service = __esm({
  "server/engines/plivo/services/openai-pool.service.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_notification_service();
    lastNotificationThreshold = /* @__PURE__ */ new Map();
    OpenAIPoolService = class {
      /**
       * Add a new OpenAI API key to the pool
       */
      static async addCredential(data) {
        const isValid = await this.testCredential(data.apiKey);
        if (!isValid) {
          throw new Error("Invalid OpenAI API key");
        }
        const [credential] = await db.insert(openaiCredentials).values({
          ...data,
          healthStatus: "healthy",
          lastHealthCheck: /* @__PURE__ */ new Date()
        }).returning();
        console.log(`\u2705 Added OpenAI credential: ${credential.name} (tier: ${credential.modelTier})`);
        return credential;
      }
      /**
       * Update an existing credential
       */
      static async updateCredential(id, data) {
        const [updated] = await db.update(openaiCredentials).set({
          ...data,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq11(openaiCredentials.id, id)).returning();
        if (!updated) {
          throw new Error("Credential not found");
        }
        console.log(`\u2705 Updated OpenAI credential: ${updated.name}`);
        return updated;
      }
      /**
       * Test if an API key is valid by making a simple API call
       */
      static async testCredential(apiKey) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15e3);
        try {
          const response = await fetch("https://api.openai.com/v1/models", {
            signal: controller.signal,
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            }
          });
          if (!response.ok) {
            console.error("\u274C OpenAI API key test failed");
            return false;
          }
          console.log("\u2705 OpenAI API key validated");
          return true;
        } catch (error) {
          if (error.name === "AbortError") {
            console.error("\u274C OpenAI API key test timed out after 15s");
          } else {
            console.error("\u274C OpenAI API key test failed:", error);
          }
          return false;
        } finally {
          clearTimeout(timeoutId);
        }
      }
      /**
       * Get credential by ID
       */
      static async getCredentialById(credentialId) {
        const [credential] = await db.select().from(openaiCredentials).where(eq11(openaiCredentials.id, credentialId)).limit(1);
        return credential || null;
      }
      /**
       * Get the least-loaded active credential for a given model tier
       * Considers both current load and total assigned agents for optimal distribution
       */
      static async getLeastLoadedCredential(tier) {
        const baseConditions = [eq11(openaiCredentials.isActive, true)];
        if (tier) {
          baseConditions.push(eq11(openaiCredentials.modelTier, tier));
        }
        const credentials = await db.select().from(openaiCredentials).where(and3(...baseConditions));
        if (credentials.length === 0) {
          return null;
        }
        const sorted = credentials.map((c) => ({
          ...c,
          utilization: c.maxConcurrency > 0 ? c.currentLoad / c.maxConcurrency : 0,
          agentDensity: c.totalAssignedAgents
        })).sort((a, b) => {
          if (Math.abs(a.utilization - b.utilization) > 0.1) {
            return a.utilization - b.utilization;
          }
          return a.agentDensity - b.agentDensity;
        });
        return sorted[0];
      }
      /**
       * Get credential for a specific agent (with load balancing fallback)
       */
      static async getCredentialForAgent(agentId) {
        const [agent] = await db.select().from(agents).where(eq11(agents.id, agentId)).limit(1);
        if (agent?.openaiCredentialId) {
          const [credential] = await db.select().from(openaiCredentials).where(
            and3(
              eq11(openaiCredentials.id, agent.openaiCredentialId),
              eq11(openaiCredentials.isActive, true)
            )
          ).limit(1);
          if (credential) {
            return credential;
          }
        }
        return this.getLeastLoadedCredential();
      }
      /**
       * Get credential with available capacity for making calls
       * Checks both current load, concurrency limit, and model tier
       */
      static async getAvailableCredential(tier) {
        const baseConditions = [eq11(openaiCredentials.isActive, true)];
        if (tier) {
          baseConditions.push(eq11(openaiCredentials.modelTier, tier));
        }
        const credentials = await db.select().from(openaiCredentials).where(and3(...baseConditions)).orderBy(asc2(openaiCredentials.currentLoad));
        for (const credential of credentials) {
          if (credential.currentLoad < credential.maxConcurrency) {
            return credential;
          }
        }
        return null;
      }
      /**
       * Atomically reserve a slot on the least-loaded credential with available capacity.
       * Uses a single UPDATE with WHERE condition to atomically find and reserve.
       * 
       * @param tier - Optional model tier to filter by ('free' or 'pro')
       * @returns The credential with reserved slot, or null if no capacity available
       */
      static async reserveSlot(tier) {
        try {
          let result;
          if (tier) {
            result = await db.execute(sql14`
          UPDATE openai_credentials
          SET current_load = current_load + 1,
              updated_at = NOW()
          WHERE id = (
            SELECT id FROM openai_credentials
            WHERE is_active = true
              AND current_load < max_concurrency
            ORDER BY 
              CASE WHEN model_tier = ${tier} THEN 0 ELSE 1 END,
              (current_load::float / NULLIF(max_concurrency, 0)) ASC,
              total_assigned_agents ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
          )
          RETURNING *
        `);
          } else {
            result = await db.execute(sql14`
          UPDATE openai_credentials
          SET current_load = current_load + 1,
              updated_at = NOW()
          WHERE id = (
            SELECT id FROM openai_credentials
            WHERE is_active = true
              AND current_load < max_concurrency
            ORDER BY 
              (current_load::float / NULLIF(max_concurrency, 0)) ASC,
              total_assigned_agents ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
          )
          RETURNING *
        `);
          }
          if (result.rows && result.rows.length > 0) {
            const row = result.rows[0];
            const tierMatch = tier && row.model_tier !== tier ? ` (fallback from '${tier}')` : "";
            console.log(`[OpenAI Pool] Reserved slot on ${row.name} (tier: ${row.model_tier}${tierMatch}, load: ${row.current_load}/${row.max_concurrency})`);
            return this.mapRowToCredential(row);
          }
          console.log(`[OpenAI Pool] No available capacity${tier ? ` for tier ${tier}` : ""} - all credentials at max load or none configured`);
          return null;
        } catch (error) {
          console.error(`[OpenAI Pool] Failed to reserve slot:`, error);
          return null;
        }
      }
      /**
       * Reserve a slot on a specific credential
       */
      static async reserveSlotOnCredential(credentialId) {
        try {
          const result = await db.execute(sql14`
        UPDATE openai_credentials
        SET current_load = current_load + 1,
            updated_at = NOW()
        WHERE id = ${credentialId}
          AND is_active = true
          AND current_load < max_concurrency
        RETURNING *
      `);
          if (result.rows && result.rows.length > 0) {
            const row = result.rows[0];
            console.log(`\u{1F512} [OpenAI Pool] Reserved slot on ${row.name} (load: ${row.current_load}/${row.max_concurrency})`);
            return this.mapRowToCredential(row);
          }
          console.log(`\u26A0\uFE0F [OpenAI Pool] Credential ${credentialId} has no capacity or is inactive`);
          return null;
        } catch (error) {
          console.error(`\u274C [OpenAI Pool] Failed to reserve slot on credential ${credentialId}:`, error);
          return null;
        }
      }
      /**
       * Release a slot when call ends
       */
      static async releaseSlot(credentialId) {
        await db.update(openaiCredentials).set({
          currentLoad: sql14`GREATEST(0, ${openaiCredentials.currentLoad} - 1)`,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq11(openaiCredentials.id, credentialId));
        console.log(`\u{1F513} [OpenAI Pool] Released slot on credential ${credentialId}`);
      }
      /**
       * Update agent assignment count for a credential
       */
      static async updateAssignmentCount(credentialId, increment) {
        if (increment) {
          await db.update(openaiCredentials).set({
            totalAssignedAgents: sql14`${openaiCredentials.totalAssignedAgents} + 1`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq11(openaiCredentials.id, credentialId));
        } else {
          await db.update(openaiCredentials).set({
            totalAssignedAgents: sql14`GREATEST(0, ${openaiCredentials.totalAssignedAgents} - 1)`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq11(openaiCredentials.id, credentialId));
        }
      }
      /**
       * Get all credentials with stats (sanitized - no API keys)
       */
      static async getAllWithStats() {
        const credentials = await db.select().from(openaiCredentials).orderBy(desc3(openaiCredentials.createdAt));
        return credentials.map(({ apiKey, ...rest }) => rest);
      }
      /**
       * Get pool statistics with tier breakdown
       */
      static async getPoolStats() {
        const credentials = await db.select().from(openaiCredentials).where(eq11(openaiCredentials.isActive, true));
        const totalCapacity = credentials.reduce((sum, c) => sum + c.maxConcurrency, 0);
        const totalLoad = credentials.reduce((sum, c) => sum + c.currentLoad, 0);
        const totalAgents = credentials.reduce((sum, c) => sum + c.totalAssignedAgents, 0);
        const totalUsers = credentials.reduce((sum, c) => sum + c.totalAssignedUsers, 0);
        const availableCapacity = totalCapacity - totalLoad;
        const utilizationPercent = totalCapacity > 0 ? totalLoad / totalCapacity * 100 : 0;
        const freeCredentials = credentials.filter((c) => c.modelTier === "free");
        const proCredentials = credentials.filter((c) => c.modelTier === "pro");
        const byTier = {
          free: {
            keys: freeCredentials.length,
            capacity: freeCredentials.reduce((sum, c) => sum + c.maxConcurrency, 0),
            load: freeCredentials.reduce((sum, c) => sum + c.currentLoad, 0),
            available: freeCredentials.reduce((sum, c) => sum + (c.maxConcurrency - c.currentLoad), 0)
          },
          pro: {
            keys: proCredentials.length,
            capacity: proCredentials.reduce((sum, c) => sum + c.maxConcurrency, 0),
            load: proCredentials.reduce((sum, c) => sum + c.currentLoad, 0),
            available: proCredentials.reduce((sum, c) => sum + (c.maxConcurrency - c.currentLoad), 0)
          }
        };
        await this.checkCapacityAndNotify(utilizationPercent);
        return {
          totalKeys: credentials.length,
          totalCapacity,
          totalLoad,
          availableCapacity,
          utilizationPercent: Math.round(utilizationPercent * 100) / 100,
          totalAgents,
          totalUsers,
          byTier,
          credentials: credentials.map((c) => ({
            id: c.id,
            name: c.name,
            modelTier: c.modelTier,
            maxConcurrency: c.maxConcurrency,
            currentLoad: c.currentLoad,
            totalAssignedAgents: c.totalAssignedAgents,
            totalAssignedUsers: c.totalAssignedUsers,
            maxAgentsThreshold: c.maxAgentsThreshold,
            utilizationPercent: c.maxConcurrency > 0 ? Math.round(c.currentLoad / c.maxConcurrency * 1e4) / 100 : 0,
            healthStatus: c.healthStatus,
            isActive: c.isActive
          }))
        };
      }
      /**
       * Check capacity and send notifications to admins if needed (throttled)
       */
      static async checkCapacityAndNotify(utilizationPercent) {
        const now = Date.now();
        const THROTTLE_PERIOD = 4 * 60 * 60 * 1e3;
        let threshold = 0;
        if (utilizationPercent >= 95) {
          threshold = 95;
        } else if (utilizationPercent >= 90) {
          threshold = 90;
        } else if (utilizationPercent >= 80) {
          threshold = 80;
        }
        if (threshold === 0) {
          lastNotificationThreshold.clear();
          return;
        }
        const lastSent = lastNotificationThreshold.get(threshold);
        if (lastSent && now - lastSent < THROTTLE_PERIOD) {
          return;
        }
        if (threshold === 95) {
          await NotificationService.createNotificationForAllAdmins({
            type: "system",
            title: "CRITICAL: OpenAI Pool at 95%+ Capacity",
            message: `The OpenAI API key pool is at ${utilizationPercent.toFixed(1)}% capacity. Add more API keys immediately to prevent service disruption.`,
            link: "/admin/openai-pool"
          });
          lastNotificationThreshold.set(95, now);
        } else if (threshold === 90) {
          await NotificationService.createNotificationForAllAdmins({
            type: "system",
            title: "WARNING: OpenAI Pool at 90%+ Capacity",
            message: `The OpenAI API key pool is at ${utilizationPercent.toFixed(1)}% capacity. Consider adding more API keys soon.`,
            link: "/admin/openai-pool"
          });
          lastNotificationThreshold.set(90, now);
        } else if (threshold === 80) {
          await NotificationService.createNotificationForAllAdmins({
            type: "system",
            title: "Notice: OpenAI Pool at 80%+ Capacity",
            message: `The OpenAI API key pool is at ${utilizationPercent.toFixed(1)}% capacity. Monitor usage and plan to add more keys if needed.`,
            link: "/admin/openai-pool"
          });
          lastNotificationThreshold.set(80, now);
        }
      }
      /**
       * Deactivate a credential
       */
      static async deactivateCredential(id) {
        await db.update(openaiCredentials).set({
          isActive: false,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq11(openaiCredentials.id, id));
      }
      /**
       * Activate a credential
       */
      static async activateCredential(id) {
        await db.update(openaiCredentials).set({
          isActive: true,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq11(openaiCredentials.id, id));
      }
      /**
       * Delete a credential (only if no agents are using it)
       */
      static async deleteCredential(id) {
        const [credential] = await db.select().from(openaiCredentials).where(eq11(openaiCredentials.id, id)).limit(1);
        if (!credential) {
          throw new Error("Credential not found");
        }
        if (credential.totalAssignedAgents > 0) {
          throw new Error(`Cannot delete credential. ${credential.totalAssignedAgents} agents are still using it.`);
        }
        await db.delete(openaiCredentials).where(eq11(openaiCredentials.id, id));
        console.log(`\u{1F5D1}\uFE0F [OpenAI Pool] Deleted credential: ${credential.name}`);
      }
      /**
       * Perform health check on all credentials
       */
      static async performHealthChecks() {
        const credentials = await db.select().from(openaiCredentials);
        for (const credential of credentials) {
          const isHealthy = await this.testCredential(credential.apiKey);
          await db.update(openaiCredentials).set({
            healthStatus: isHealthy ? "healthy" : "unhealthy",
            lastHealthCheck: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq11(openaiCredentials.id, credential.id));
        }
        console.log(`\u{1F3E5} [OpenAI Pool] Health checks completed for ${credentials.length} credentials`);
      }
      /**
       * Recalculate agent counts for all credentials based on actual agents in database
       */
      static async recalculateAgentCounts() {
        const credentials = await db.select().from(openaiCredentials);
        const updates = [];
        for (const credential of credentials) {
          const [result] = await db.select({ count: sql14`count(*)::int` }).from(agents).where(eq11(agents.openaiCredentialId, credential.id));
          const actualCount = result?.count || 0;
          const oldCount = credential.totalAssignedAgents;
          if (actualCount !== oldCount) {
            await db.update(openaiCredentials).set({
              totalAssignedAgents: actualCount,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq11(openaiCredentials.id, credential.id));
            updates.push({
              id: credential.id,
              name: credential.name,
              oldCount,
              newCount: actualCount
            });
            console.log(`\u{1F504} [OpenAI Pool] Recalculated ${credential.name}: ${oldCount} \u2192 ${actualCount} agents`);
          }
        }
        return {
          updated: updates.length,
          credentials: updates
        };
      }
      /**
       * Get or assign a credential for a user based on their plan
       * Free plan users get 'free' tier, Pro plan users get 'pro' tier
       */
      static async getOrAssignCredentialForUser(userId, requiredTier = "free") {
        const [user] = await db.select().from(users).where(eq11(users.id, userId)).limit(1);
        if (!user) {
          return null;
        }
        const credential = await this.getLeastLoadedCredential(requiredTier);
        if (credential) {
          await db.update(openaiCredentials).set({
            totalAssignedUsers: sql14`${openaiCredentials.totalAssignedUsers} + 1`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq11(openaiCredentials.id, credential.id));
        }
        return credential;
      }
      /**
       * Get model tier for user based on subscription
       */
      static getModelTierForUser(subscriptionPlan) {
        if (!subscriptionPlan) return "free";
        const plan = subscriptionPlan.toLowerCase();
        if (plan === "pro" || plan === "enterprise" || plan === "premium") {
          return "pro";
        }
        return "free";
      }
      /**
       * Get available models for a tier
       */
      static getModelsForTier(tier) {
        if (tier === "pro") {
          return ["gpt-realtime-2", "gpt-realtime-translate", "gpt-realtime-whisper", "gpt-realtime-1.5", "gpt-realtime", "gpt-realtime-mini", "gpt-4o-realtime-preview", "gpt-4o-mini-realtime-preview"];
        }
        return ["gpt-realtime-mini", "gpt-4o-mini-realtime-preview"];
      }
      /**
       * Map database row to TypeScript OpenaiCredential type
       */
      static mapRowToCredential(row) {
        return {
          id: row.id,
          name: row.name,
          apiKey: row.api_key,
          modelTier: row.model_tier,
          maxConcurrency: row.max_concurrency,
          currentLoad: row.current_load,
          totalAssignedAgents: row.total_assigned_agents,
          totalAssignedUsers: row.total_assigned_users,
          maxAgentsThreshold: row.max_agents_threshold,
          isActive: row.is_active,
          healthStatus: row.health_status,
          lastHealthCheck: row.last_health_check ? new Date(row.last_health_check) : null,
          metadata: row.metadata,
          createdAt: row.created_at ? new Date(row.created_at) : /* @__PURE__ */ new Date(),
          updatedAt: row.updated_at ? new Date(row.updated_at) : /* @__PURE__ */ new Date()
        };
      }
    };
  }
});

// server/storage/crm-storage.ts
import { eq as eq14, and as and6, desc as desc4, asc as asc3, sql as sql18, ilike as ilike2, or as or3, inArray as inArray6, notInArray, gte as gte3, lte as lte3, count as count2, isNotNull as isNotNull3 } from "drizzle-orm";
function escapeLike(term) {
  return term.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}
var DEFAULT_STAGES, CRMStorage;
var init_crm_storage = __esm({
  "server/storage/crm-storage.ts"() {
    "use strict";
    init_db();
    init_schema();
    DEFAULT_STAGES = [
      { name: "New Lead", color: "#9CA3AF", order: 0, stage: "new" },
      { name: "Hot Lead", color: "#EF4444", order: 1, stage: "hot" },
      { name: "Appointment Booked", color: "#22C55E", order: 2, stage: "appointment" },
      { name: "Form Submitted", color: "#3B82F6", order: 3, stage: "form_submitted" },
      { name: "Needs Follow-up", color: "#F59E0B", order: 4, stage: "follow_up" },
      { name: "Not Interested", color: "#6B7280", order: 5, stage: "not_interested" },
      { name: "No Answer", color: "#D1D5DB", order: 6, stage: "no_answer" }
    ];
    CRMStorage = class {
      // ============================================================
      // Lead Stages
      // ============================================================
      static async getStagesByUser(userId) {
        return db.select().from(leadStages).where(eq14(leadStages.userId, userId)).orderBy(asc3(leadStages.order));
      }
      static async ensureDefaultStages(userId) {
        const existing = await this.getStagesByUser(userId);
        if (existing.length > 0) {
          return existing;
        }
        const stagesToInsert = DEFAULT_STAGES.map((s) => ({
          userId,
          name: s.name,
          color: s.color,
          order: s.order,
          isDefault: true,
          isCustom: false
        }));
        const inserted = await db.insert(leadStages).values(stagesToInsert).returning();
        return inserted;
      }
      static async createStage(data) {
        const maxOrder = await db.select({ maxOrder: sql18`COALESCE(MAX("order"), 0)` }).from(leadStages).where(eq14(leadStages.userId, data.userId));
        const [stage] = await db.insert(leadStages).values({
          ...data,
          order: (maxOrder[0]?.maxOrder || 0) + 1,
          isDefault: false,
          isCustom: true
        }).returning();
        return stage;
      }
      static async updateStage(id, userId, data) {
        const [stage] = await db.update(leadStages).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and6(eq14(leadStages.id, id), eq14(leadStages.userId, userId))).returning();
        return stage || null;
      }
      static async deleteStage(id, userId) {
        const result = await db.delete(leadStages).where(and6(
          eq14(leadStages.id, id),
          eq14(leadStages.userId, userId),
          eq14(leadStages.isCustom, true)
        )).returning();
        return result.length > 0;
      }
      static async reorderStages(userId, stageIds) {
        for (let i = 0; i < stageIds.length; i++) {
          await db.update(leadStages).set({ order: i, updatedAt: /* @__PURE__ */ new Date() }).where(and6(eq14(leadStages.id, stageIds[i]), eq14(leadStages.userId, userId)));
        }
      }
      // ============================================================
      // Leads
      // ============================================================
      static async getLeadById(id, userId) {
        const [lead] = await db.select().from(leads).where(and6(eq14(leads.id, id), eq14(leads.userId, userId)));
        return lead || null;
      }
      static async getLeadsBySource(userId, sourceType, sourceId, filters) {
        const conditions = [
          eq14(leads.userId, userId),
          eq14(leads.sourceType, sourceType)
        ];
        if (sourceType === "campaign") {
          conditions.push(eq14(leads.campaignId, sourceId));
        } else {
          conditions.push(eq14(leads.incomingConnectionId, sourceId));
        }
        if (filters?.stage) {
          conditions.push(eq14(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          const searchPattern = `%${escapeLike(filters.search)}%`;
          conditions.push(or3(
            ilike2(leads.firstName, searchPattern),
            ilike2(leads.lastName, searchPattern),
            ilike2(leads.phone, searchPattern),
            ilike2(leads.email, searchPattern),
            ilike2(leads.company, searchPattern)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and6(...conditions)).orderBy(desc4(leads.createdAt));
      }
      static async getAllLeads(userId, filters) {
        const conditions = [eq14(leads.userId, userId)];
        if (filters?.stage) {
          conditions.push(eq14(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          const searchPattern = `%${escapeLike(filters.search)}%`;
          conditions.push(or3(
            ilike2(leads.firstName, searchPattern),
            ilike2(leads.lastName, searchPattern),
            ilike2(leads.phone, searchPattern),
            ilike2(leads.email, searchPattern),
            ilike2(leads.company, searchPattern)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and6(...conditions)).orderBy(desc4(leads.createdAt));
      }
      static async getLeadsBySourceType(userId, sourceType, filters) {
        const conditions = [
          eq14(leads.userId, userId),
          eq14(leads.sourceType, sourceType)
        ];
        if (filters?.stage) {
          conditions.push(eq14(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          const searchPattern = `%${escapeLike(filters.search)}%`;
          conditions.push(or3(
            ilike2(leads.firstName, searchPattern),
            ilike2(leads.lastName, searchPattern),
            ilike2(leads.phone, searchPattern),
            ilike2(leads.email, searchPattern),
            ilike2(leads.company, searchPattern)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and6(...conditions)).orderBy(desc4(leads.createdAt));
      }
      static async getLeadsGroupedByStage(userId, sourceType, sourceId, options) {
        const allLeads = await this.getLeadsBySource(userId, sourceType, sourceId, {
          hideLeadsWithoutPhone: options?.hideLeadsWithoutPhone
        });
        const grouped = /* @__PURE__ */ new Map();
        for (const lead of allLeads) {
          const stage = lead.stage;
          if (!grouped.has(stage)) {
            grouped.set(stage, []);
          }
          grouped.get(stage).push(lead);
        }
        return grouped;
      }
      // ============================================================
      // AI-Categorized Leads (Paginated) - Only qualified prospects
      // ============================================================
      /**
       * Get paginated leads filtered by AI category
       * Only returns leads that have been categorized (not null aiCategory)
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getPaginatedLeadsByCategory(userId, options) {
        const limit = options.limit || 50;
        const offset = options.offset || 0;
        const conditions = [
          eq14(leads.userId, userId),
          isNotNull3(leads.aiCategory)
          // Only categorized leads
        ];
        if (options.aiCategory) {
          conditions.push(eq14(leads.aiCategory, options.aiCategory));
        }
        if (options.hiddenCategories && options.hiddenCategories.length > 0) {
          if (options.aiCategory && options.hiddenCategories.includes(options.aiCategory)) {
            return { leads: [], total: 0, hasMore: false };
          }
          if (!options.aiCategory) {
            conditions.push(notInArray(leads.aiCategory, options.hiddenCategories));
          }
        }
        if (options.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        if (options.sourceType) {
          conditions.push(eq14(leads.sourceType, options.sourceType));
          if (options.sourceId) {
            if (options.sourceType === "campaign") {
              conditions.push(eq14(leads.campaignId, options.sourceId));
            } else {
              conditions.push(eq14(leads.incomingConnectionId, options.sourceId));
            }
          }
        }
        if (options.search) {
          const searchPattern = `%${escapeLike(options.search)}%`;
          conditions.push(or3(
            ilike2(leads.firstName, searchPattern),
            ilike2(leads.lastName, searchPattern),
            ilike2(leads.phone, searchPattern),
            ilike2(leads.email, searchPattern),
            ilike2(leads.company, searchPattern)
          ));
        }
        const [countResult] = await db.select({ count: count2() }).from(leads).where(and6(...conditions));
        const total = countResult?.count || 0;
        let orderBy;
        switch (options.sortBy) {
          case "oldest":
            orderBy = asc3(leads.createdAt);
            break;
          case "score-high":
            orderBy = desc4(leads.leadScore);
            break;
          case "score-low":
            orderBy = asc3(leads.leadScore);
            break;
          default:
            orderBy = desc4(leads.createdAt);
        }
        const results = await db.select().from(leads).where(and6(...conditions)).orderBy(orderBy).limit(limit).offset(offset);
        return {
          leads: results,
          total,
          hasMore: offset + results.length < total
        };
      }
      /**
       * Get lead counts grouped by AI category
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getLeadCountsByCategory(userId, options) {
        const conditions = [
          eq14(leads.userId, userId),
          isNotNull3(leads.aiCategory)
        ];
        if (options?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        if (options?.hiddenCategories && options.hiddenCategories.length > 0) {
          conditions.push(notInArray(leads.aiCategory, options.hiddenCategories));
        }
        if (options?.sourceType) {
          conditions.push(eq14(leads.sourceType, options.sourceType));
          if (options.sourceId) {
            if (options.sourceType === "campaign") {
              conditions.push(eq14(leads.campaignId, options.sourceId));
            } else {
              conditions.push(eq14(leads.incomingConnectionId, options.sourceId));
            }
          }
        }
        const results = await db.select({
          category: leads.aiCategory,
          count: count2()
        }).from(leads).where(and6(...conditions)).groupBy(leads.aiCategory);
        const counts = {
          [AI_LEAD_CATEGORIES.WARM]: 0,
          [AI_LEAD_CATEGORIES.HOT]: 0,
          [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: 0,
          [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: 0,
          [AI_LEAD_CATEGORIES.CALL_TRANSFER]: 0,
          [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: 0
        };
        for (const row of results) {
          if (row.category && row.category in counts) {
            counts[row.category] = row.count;
          }
        }
        return counts;
      }
      /**
       * Get leads grouped by AI category for Kanban view (paginated per column)
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getLeadsByAICategory(userId, category, options) {
        return this.getPaginatedLeadsByCategory(userId, {
          aiCategory: category,
          sourceType: options?.sourceType,
          sourceId: options?.sourceId,
          limit: options?.limit || 20,
          offset: options?.offset || 0,
          hideLeadsWithoutPhone: options?.hideLeadsWithoutPhone,
          hiddenCategories: options?.hiddenCategories
        });
      }
      static async createLead(data) {
        const [lead] = await db.insert(leads).values(data).returning();
        return lead;
      }
      static async updateLead(id, userId, data) {
        const [lead] = await db.update(leads).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and6(eq14(leads.id, id), eq14(leads.userId, userId))).returning();
        return lead || null;
      }
      static async updateLeadStage(id, userId, stage, stageId) {
        const [lead] = await db.update(leads).set({
          stage,
          stageId: stageId || null,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and6(eq14(leads.id, id), eq14(leads.userId, userId))).returning();
        return lead || null;
      }
      static async deleteLead(id, userId) {
        const result = await db.delete(leads).where(and6(eq14(leads.id, id), eq14(leads.userId, userId))).returning();
        return result.length > 0;
      }
      static async bulkDeleteLeads(ids, userId) {
        if (ids.length === 0) return 0;
        const result = await db.delete(leads).where(and6(eq14(leads.userId, userId), inArray6(leads.id, ids))).returning();
        return result.length;
      }
      static async bulkUpdateStage(ids, userId, stage, stageId) {
        const result = await db.update(leads).set({
          stage,
          stageId: stageId || null,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and6(
          inArray6(leads.id, ids),
          eq14(leads.userId, userId)
        )).returning();
        return result.length;
      }
      static async bulkAddTags(ids, userId, newTags) {
        const leadsToUpdate = await db.select().from(leads).where(and6(inArray6(leads.id, ids), eq14(leads.userId, userId)));
        let updated = 0;
        for (const lead of leadsToUpdate) {
          const existingTags = lead.tags || [];
          const mergedTags = Array.from(/* @__PURE__ */ new Set([...existingTags, ...newTags]));
          await db.update(leads).set({ tags: mergedTags, updatedAt: /* @__PURE__ */ new Date() }).where(eq14(leads.id, lead.id));
          updated++;
        }
        return updated;
      }
      static async bulkAssign(ids, userId, assignedUserId) {
        const result = await db.update(leads).set({
          assignedUserId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and6(
          inArray6(leads.id, ids),
          eq14(leads.userId, userId)
        )).returning();
        return result.length;
      }
      static async getLeadCountsByStage(userId, sourceType, sourceId, options) {
        const conditions = [
          eq14(leads.userId, userId),
          eq14(leads.sourceType, sourceType)
        ];
        if (sourceType === "campaign") {
          conditions.push(eq14(leads.campaignId, sourceId));
        } else {
          conditions.push(eq14(leads.incomingConnectionId, sourceId));
        }
        if (options?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql18`TRIM(${leads.phone}) != ''`);
          conditions.push(sql18`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        const counts = await db.select({
          stage: leads.stage,
          count: sql18`COUNT(*)::int`
        }).from(leads).where(and6(...conditions)).groupBy(leads.stage);
        return counts;
      }
      // ============================================================
      // Lead Notes
      // ============================================================
      static async getNotesByLead(leadId) {
        return db.select().from(leadNotes).where(eq14(leadNotes.leadId, leadId)).orderBy(desc4(leadNotes.createdAt));
      }
      /**
       * Get notes count for multiple leads at once (batch operation)
       */
      static async getNotesCountByLeadIds(leadIds) {
        if (leadIds.length === 0) return /* @__PURE__ */ new Map();
        const counts = await db.select({
          leadId: leadNotes.leadId,
          count: sql18`COUNT(*)::int`
        }).from(leadNotes).where(inArray6(leadNotes.leadId, leadIds)).groupBy(leadNotes.leadId);
        const map = /* @__PURE__ */ new Map();
        for (const row of counts) {
          map.set(row.leadId, row.count);
        }
        return map;
      }
      /**
       * Enrich leads with notes count
       */
      static async enrichLeadsWithNotesCount(leadsList) {
        if (leadsList.length === 0) return [];
        const leadIds = leadsList.map((l) => l.id);
        const notesCounts = await this.getNotesCountByLeadIds(leadIds);
        return leadsList.map((lead) => ({
          ...lead,
          notesCount: notesCounts.get(lead.id) || 0
        }));
      }
      static async createNote(data) {
        const [note] = await db.insert(leadNotes).values(data).returning();
        return note;
      }
      static async updateNote(id, userId, content) {
        const [note] = await db.update(leadNotes).set({ content, updatedAt: /* @__PURE__ */ new Date() }).where(and6(eq14(leadNotes.id, id), eq14(leadNotes.userId, userId))).returning();
        return note || null;
      }
      static async deleteNote(id, userId) {
        const result = await db.delete(leadNotes).where(and6(eq14(leadNotes.id, id), eq14(leadNotes.userId, userId))).returning();
        return result.length > 0;
      }
      // ============================================================
      // Source Data Helpers
      // ============================================================
      static async getUserCampaigns(userId) {
        const campaignList = await db.select({
          id: campaigns.id,
          name: campaigns.name
        }).from(campaigns).where(eq14(campaigns.userId, userId)).orderBy(desc4(campaigns.createdAt));
        const result = [];
        for (const c of campaignList) {
          const [countResult] = await db.select({ count: sql18`COUNT(*)::int` }).from(leads).where(and6(eq14(leads.campaignId, c.id), eq14(leads.userId, userId)));
          result.push({
            id: c.id,
            name: c.name,
            totalLeads: countResult?.count || 0
          });
        }
        return result;
      }
      static async getUserIncomingConnections(userId) {
        const connections = await db.select().from(incomingConnections).where(eq14(incomingConnections.userId, userId));
        const result = [];
        for (const conn of connections) {
          const [countResult] = await db.select({ count: sql18`COUNT(*)::int` }).from(leads).where(and6(eq14(leads.incomingConnectionId, conn.id), eq14(leads.userId, userId)));
          result.push({
            id: conn.id,
            name: `Incoming - ${conn.id.slice(0, 8)}`,
            phoneNumber: conn.phoneNumberId,
            totalLeads: countResult?.count || 0
          });
        }
        return result;
      }
      // ============================================================
      // Lead Creation from Call Completion
      // ============================================================
      static async createOrUpdateLeadFromCall(userId, callData) {
        let stage = "new";
        if (callData.hasAppointment) {
          stage = "appointment";
        } else if (callData.hasFormSubmission) {
          stage = "form_submitted";
        } else if (callData.hasCallback) {
          stage = "follow_up";
        } else if (callData.hasTransfer) {
          stage = "hot";
        } else if (callData.leadScore && callData.leadScore >= 70) {
          stage = "hot";
        } else if (callData.sentiment === "negative") {
          stage = "not_interested";
        }
        const leadData = {
          userId,
          phone: callData.phone,
          firstName: callData.firstName,
          lastName: callData.lastName,
          email: callData.email,
          company: callData.company,
          customFields: callData.customFields,
          sourceType: callData.sourceType,
          campaignId: callData.campaignId,
          incomingConnectionId: callData.incomingConnectionId,
          stage,
          callId: callData.callId,
          plivoCallId: callData.plivoCallId,
          twilioOpenaiCallId: callData.twilioOpenaiCallId,
          aiSummary: callData.aiSummary,
          leadScore: callData.leadScore,
          aiNextAction: callData.aiNextAction,
          sentiment: callData.sentiment,
          hasAppointment: callData.hasAppointment || false,
          hasFormSubmission: callData.hasFormSubmission || false,
          hasTransfer: callData.hasTransfer || false,
          hasCallback: callData.hasCallback || false,
          appointmentDate: callData.appointmentDate,
          appointmentDetails: callData.appointmentDetails,
          formData: callData.formData,
          transferredTo: callData.transferredTo,
          callbackScheduled: callData.callbackScheduled,
          lastCallAt: /* @__PURE__ */ new Date()
        };
        const lead = await this.createLead(leadData);
        return lead;
      }
      // ============================================================
      // Lead Activities - Activity Timeline
      // ============================================================
      static async getActivitiesByLead(leadId, userId) {
        return db.select().from(leadActivities).where(and6(eq14(leadActivities.leadId, leadId), eq14(leadActivities.userId, userId))).orderBy(desc4(leadActivities.createdAt));
      }
      static async createActivity(data) {
        const [activity] = await db.insert(leadActivities).values(data).returning();
        return activity;
      }
      static async logStageChange(leadId, userId, fromStage, toStage, fromStageName, toStageName) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "stage_change",
          title: `Stage changed to ${toStageName || toStage}`,
          description: `Moved from "${fromStageName || fromStage}" to "${toStageName || toStage}"`,
          metadata: { fromStage, toStage, fromStageName, toStageName }
        });
      }
      static async logNoteAdded(leadId, userId, noteId, noteContent) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "note",
          title: "Note added",
          description: noteContent.substring(0, 200) + (noteContent.length > 200 ? "..." : ""),
          metadata: { noteId, noteContent: noteContent.substring(0, 500) }
        });
      }
      static async logCallActivity(leadId, userId, callId, callDuration, callStatus) {
        const durationStr = callDuration > 60 ? `${Math.floor(callDuration / 60)}m ${callDuration % 60}s` : `${callDuration}s`;
        return this.createActivity({
          leadId,
          userId,
          activityType: "call",
          title: `Call ${callStatus}`,
          description: `Duration: ${durationStr}`,
          metadata: { callId, callDuration, callStatus }
        });
      }
      static async logTagChange(leadId, userId, action, tagName) {
        return this.createActivity({
          leadId,
          userId,
          activityType: action === "added" ? "tag_added" : "tag_removed",
          title: `Tag ${action}: ${tagName}`,
          metadata: { tagName }
        });
      }
      static async logLeadCreated(leadId, userId, source) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "created",
          title: "Lead created",
          description: `Source: ${source}`
        });
      }
      // ============================================================
      // Analytics & Export
      // ============================================================
      static async getLeadsWithDetails(userId) {
        const allLeads = await this.getAllLeads(userId);
        const leadsWithDetails = await Promise.all(
          allLeads.map(async (lead) => {
            const [notes, activities] = await Promise.all([
              this.getNotesByLead(lead.id),
              this.getActivitiesByLead(lead.id, userId)
            ]);
            return { ...lead, notes, activities };
          })
        );
        return leadsWithDetails;
      }
      static async getAnalytics(userId) {
        const [totalResult] = await db.select({ count: count2() }).from(leads).where(eq14(leads.userId, userId));
        const totalLeads = totalResult?.count || 0;
        const categoryResults = await db.select({ category: leads.aiCategory, count: count2() }).from(leads).where(and6(eq14(leads.userId, userId), isNotNull3(leads.aiCategory))).groupBy(leads.aiCategory);
        const leadsByCategory = categoryResults.map((r) => ({
          category: r.category || "uncategorized",
          count: Number(r.count)
        }));
        const stageResults = await db.select({ stage: leads.stage, count: count2() }).from(leads).where(eq14(leads.userId, userId)).groupBy(leads.stage);
        const leadsByStage = stageResults.map((r) => ({ stage: r.stage, count: Number(r.count) }));
        const sourceResults = await db.select({ sourceType: leads.sourceType, count: count2() }).from(leads).where(eq14(leads.userId, userId)).groupBy(leads.sourceType);
        const leadsBySource = sourceResults.map((r) => ({ sourceType: r.sourceType, count: Number(r.count) }));
        const thirtyDaysAgo = /* @__PURE__ */ new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dateResults = await db.select({
          date: sql18`DATE(${leads.createdAt})`,
          count: count2()
        }).from(leads).where(and6(eq14(leads.userId, userId), gte3(leads.createdAt, thirtyDaysAgo))).groupBy(sql18`DATE(${leads.createdAt})`).orderBy(sql18`DATE(${leads.createdAt})`);
        const leadsByDate = dateResults.map((r) => ({ date: r.date, count: Number(r.count) }));
        const [scoreResult] = await db.select({ avg: sql18`COALESCE(AVG(${leads.leadScore}), 0)` }).from(leads).where(and6(eq14(leads.userId, userId), sql18`${leads.leadScore} IS NOT NULL`));
        const avgLeadScore = Math.round(scoreResult?.avg || 0);
        const sentimentResults = await db.select({ sentiment: leads.sentiment, count: count2() }).from(leads).where(and6(eq14(leads.userId, userId), sql18`${leads.sentiment} IS NOT NULL`)).groupBy(leads.sentiment);
        const sentimentBreakdown = sentimentResults.map((r) => ({
          sentiment: r.sentiment || "unknown",
          count: Number(r.count)
        }));
        const stageChanges = await db.select().from(leadActivities).where(and6(
          eq14(leadActivities.userId, userId),
          eq14(leadActivities.activityType, "stage_change")
        ));
        const conversionMap = /* @__PURE__ */ new Map();
        for (const change of stageChanges) {
          const metadata = change.metadata;
          if (metadata?.fromStage && metadata?.toStage) {
            const key = metadata.fromStage;
            if (!conversionMap.has(key)) {
              conversionMap.set(key, { total: 0, conversions: /* @__PURE__ */ new Map() });
            }
            const data = conversionMap.get(key);
            data.total++;
            data.conversions.set(
              metadata.toStage,
              (data.conversions.get(metadata.toStage) || 0) + 1
            );
          }
        }
        const conversionRates = [];
        Array.from(conversionMap.entries()).forEach(([fromStage, data]) => {
          Array.from(data.conversions.entries()).forEach(([toStage, cnt]) => {
            conversionRates.push({
              fromStage,
              toStage,
              rate: Math.round(cnt / data.total * 100)
            });
          });
        });
        return {
          totalLeads,
          leadsByStage,
          leadsByCategory,
          leadsBySource,
          leadsByDate,
          conversionRates,
          avgLeadScore,
          sentimentBreakdown
        };
      }
      static async getAllUniqueTags(userId) {
        const allLeads = await db.select({ tags: leads.tags }).from(leads).where(eq14(leads.userId, userId));
        const tagsSet = /* @__PURE__ */ new Set();
        for (const lead of allLeads) {
          if (lead.tags) {
            for (const tag of lead.tags) {
              tagsSet.add(tag);
            }
          }
        }
        return Array.from(tagsSet).sort();
      }
      // ============================================================
      // CRM Category Preferences
      // ============================================================
      static async getCategoryPreferences(userId) {
        const [prefs] = await db.select().from(crmCategoryPreferences).where(eq14(crmCategoryPreferences.userId, userId));
        return prefs || null;
      }
      static async getOrCreateCategoryPreferences(userId) {
        const existing = await this.getCategoryPreferences(userId);
        if (existing) return existing;
        const [created] = await db.insert(crmCategoryPreferences).values({ userId }).returning();
        return created;
      }
      static async updateCategoryPreferences(userId, updates) {
        const existing = await this.getOrCreateCategoryPreferences(userId);
        const updateData = { updatedAt: /* @__PURE__ */ new Date() };
        if (updates.columnOrder !== void 0) {
          updateData.columnOrder = updates.columnOrder;
        }
        if (updates.colorOverrides !== void 0) {
          updateData.colorOverrides = updates.colorOverrides;
        }
        if (updates.columnSortPreferences !== void 0) {
          updateData.columnSortPreferences = updates.columnSortPreferences;
        }
        if (updates.hideLeadsWithoutPhone !== void 0) {
          updateData.hideLeadsWithoutPhone = updates.hideLeadsWithoutPhone;
        }
        if (updates.categoryPipelineMappings !== void 0) {
          updateData.categoryPipelineMappings = updates.categoryPipelineMappings;
        }
        if (updates.hotScoreThreshold !== void 0) {
          updateData.hotScoreThreshold = updates.hotScoreThreshold;
        }
        if (updates.warmScoreThreshold !== void 0) {
          updateData.warmScoreThreshold = updates.warmScoreThreshold;
        }
        if (updates.hiddenCategories !== void 0) {
          updateData.hiddenCategories = updates.hiddenCategories;
        }
        const [updated] = await db.update(crmCategoryPreferences).set(updateData).where(eq14(crmCategoryPreferences.id, existing.id)).returning();
        return updated;
      }
      static async updateCategoryColor(userId, categoryId, color) {
        const prefs = await this.getOrCreateCategoryPreferences(userId);
        const colorOverrides = { ...prefs.colorOverrides || {}, [categoryId]: color };
        return this.updateCategoryPreferences(userId, { colorOverrides });
      }
      static async updateColumnOrder(userId, columnOrder) {
        return this.updateCategoryPreferences(userId, { columnOrder });
      }
      static async updateColumnSort(userId, categoryId, sortBy) {
        const prefs = await this.getOrCreateCategoryPreferences(userId);
        const columnSortPreferences = { ...prefs.columnSortPreferences || {}, [categoryId]: sortBy };
        return this.updateCategoryPreferences(userId, { columnSortPreferences });
      }
    };
  }
});

// server/engines/payment/types.ts
var GLOBAL_SETTINGS_KEYS;
var init_types = __esm({
  "server/engines/payment/types.ts"() {
    "use strict";
    GLOBAL_SETTINGS_KEYS = {
      CASHFREE_ENABLED: "cashfree_enabled",
      CASHFREE_APP_ID: "cashfree_app_id",
      CASHFREE_SECRET_KEY: "cashfree_secret_key",
      CASHFREE_ENVIRONMENT: "cashfree_environment",
      CASHFREE_LAST_WEBHOOK_AT: "cashfree_last_webhook_at",
      ELEVENLABS_HMAC_SECRET: "elevenlabs_hmac_secret",
      ELEVENLABS_LAST_WEBHOOK_AT: "elevenlabs_last_webhook_at"
    };
  }
});

// server/engines/payment/webhook-helper.ts
function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}
function getValidatedFrontendUrl() {
  if (process.env.NODE_ENV === "production") {
    if (process.env.APP_DOMAIN) {
      const domain = stripProtocol(process.env.APP_DOMAIN);
      return `https://${domain}`;
    }
    if (process.env.APP_URL) {
      return process.env.APP_URL;
    }
    console.error("[CONFIG ERROR] Production requires APP_DOMAIN or APP_URL to be set");
    return "http://localhost:5000";
  }
  if (process.env.APP_DOMAIN) {
    const domain = stripProtocol(process.env.APP_DOMAIN);
    return `https://${domain}`;
  }
  return process.env.APP_URL || "http://localhost:5000";
}
var FRONTEND_URL, LAST_WEBHOOK_KEYS;
var init_webhook_helper = __esm({
  "server/engines/payment/webhook-helper.ts"() {
    "use strict";
    init_storage();
    init_types();
    FRONTEND_URL = getValidatedFrontendUrl();
    LAST_WEBHOOK_KEYS = {
      cashfree: GLOBAL_SETTINGS_KEYS.CASHFREE_LAST_WEBHOOK_AT,
      elevenlabs: GLOBAL_SETTINGS_KEYS.ELEVENLABS_LAST_WEBHOOK_AT
    };
  }
});

// server/integrations/app-keys.ts
async function getSettingString(key) {
  try {
    const setting = await storage.getGlobalSetting(key);
    const value = setting?.value;
    if (value == null) return null;
    const text2 = String(value).trim();
    return text2 || null;
  } catch (err) {
    console.error(`[Integrations] Failed to read setting ${key}:`, err.message);
    return null;
  }
}
async function getOAuthAppKeys(prefix) {
  const idKey = `${prefix}_client_id`;
  const secretKey = `${prefix}_client_secret`;
  const [clientId, clientSecret] = await Promise.all([getSettingString(idKey), getSettingString(secretKey)]);
  const missing = [!clientId && idKey, !clientSecret && secretKey].filter((k) => !!k);
  if (missing.length || !clientId || !clientSecret) return { clientId: null, clientSecret: null, missing };
  return { clientId, clientSecret, missing: [] };
}
async function getZohoAccountsDomain() {
  const value = await getSettingString("zoho_accounts_domain");
  return value && ZOHO_ACCOUNTS_DOMAINS.includes(value) ? value : ZOHO_ACCOUNTS_DOMAINS[0];
}
async function getSalesforceLoginUrl() {
  const value = await getSettingString("salesforce_login_url");
  return value && SALESFORCE_LOGIN_URLS.includes(value) ? value : SALESFORCE_LOGIN_URLS[0];
}
function inboundTriggerUrl() {
  return `${FRONTEND_URL}/api/external/trigger-call`;
}
async function requireOAuthKeys(prefix, displayName) {
  const keys = await getOAuthAppKeys(prefix);
  if (keys.clientId && keys.clientSecret) return { clientId: keys.clientId, clientSecret: keys.clientSecret };
  throw new Error(`${displayName} app keys are not configured (${keys.missing.join(", ")})`);
}
var ZOHO_ACCOUNTS_DOMAINS, SALESFORCE_LOGIN_URLS;
var init_app_keys = __esm({
  "server/integrations/app-keys.ts"() {
    "use strict";
    init_storage();
    init_webhook_helper();
    ZOHO_ACCOUNTS_DOMAINS = [
      "https://accounts.zoho.in",
      "https://accounts.zoho.com",
      "https://accounts.zoho.eu",
      "https://accounts.zoho.com.au",
      "https://accounts.zoho.jp",
      "https://accounts.zoho.com.cn"
    ];
    SALESFORCE_LOGIN_URLS = ["https://login.salesforce.com", "https://test.salesforce.com"];
  }
});

// server/integrations/http.ts
function truncate(text2, max = 300) {
  const single = text2.replace(/\s+/g, " ").trim();
  return single.length > max ? `${single.slice(0, max)}\u2026` : single;
}
async function fetchWithTimeout(url, init = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`Request to ${new URL(url).host} timed out after ${timeoutMs} ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
async function requestJson(url, init = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const resp = await fetchWithTimeout(url, init, timeoutMs);
  const text2 = await resp.text();
  let data = null;
  if (text2) {
    try {
      data = JSON.parse(text2);
    } catch {
      data = null;
    }
  }
  return { ok: resp.ok, status: resp.status, data, text: text2 };
}
function describeFailure(what, res) {
  const body = res.data && typeof res.data === "object" ? JSON.stringify(res.data) : res.text;
  return `${what} failed (HTTP ${res.status}): ${truncate(body || "empty response")}`;
}
function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", Accept: "application/json", ...extra };
}
var DEFAULT_TIMEOUT_MS, FORM_HEADERS;
var init_http = __esm({
  "server/integrations/http.ts"() {
    "use strict";
    DEFAULT_TIMEOUT_MS = 1e4;
    FORM_HEADERS = { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" };
  }
});

// server/integrations/types.ts
function errorMessage(err) {
  if (err instanceof Error) return err.message;
  return typeof err === "string" ? err : "Unknown error";
}
var ProviderAuthError;
var init_types2 = __esm({
  "server/integrations/types.ts"() {
    "use strict";
    ProviderAuthError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "ProviderAuthError";
      }
    };
  }
});

// server/integrations/token-store.ts
import { and as and7, desc as desc5, eq as eq15, gt, inArray as inArray7 } from "drizzle-orm";
async function listIntegrationRows(userId) {
  return db.select().from(userIntegrations).where(eq15(userIntegrations.userId, userId));
}
async function updateIntegrationRow(id, values) {
  const [row] = await db.update(userIntegrations).set({ ...values, updatedAt: /* @__PURE__ */ new Date() }).where(eq15(userIntegrations.id, id)).returning();
  return row ?? null;
}
async function markIntegrationError(id, error, status) {
  await updateIntegrationRow(id, { lastError: error.slice(0, 1e3), ...status ? { status } : {} });
}
async function markIntegrationSynced(id, lastError) {
  await updateIntegrationRow(id, { lastSyncAt: /* @__PURE__ */ new Date(), lastError: lastError ? lastError.slice(0, 1e3) : null });
}
function tokenExpired(row) {
  return !!row.tokenExpiry && row.tokenExpiry.getTime() - REFRESH_SKEW_MS < Date.now();
}
async function refreshIntegrationToken(row, provider) {
  if (!provider.refresh) throw new ProviderAuthError(`${provider.displayName} token expired and cannot be refreshed`);
  try {
    const result = await provider.refresh(row);
    const updated = await updateIntegrationRow(row.id, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken ?? row.refreshToken,
      tokenExpiry: result.expiresIn ? new Date(Date.now() + result.expiresIn * 1e3) : row.tokenExpiry,
      instanceUrl: result.instanceUrl ?? row.instanceUrl,
      status: "connected"
    });
    return updated ?? { ...row, accessToken: result.accessToken };
  } catch (err) {
    const message = `Token refresh failed: ${errorMessage(err)}`;
    await markIntegrationError(row.id, message, "error");
    throw new ProviderAuthError(message);
  }
}
async function withValidToken(row, provider) {
  if (!row.accessToken) throw new ProviderAuthError(`${provider.displayName} is not connected`);
  return tokenExpired(row) ? refreshIntegrationToken(row, provider) : row;
}
async function authorizedRequest(row, provider, build, timeoutMs) {
  let current = await withValidToken(row, provider);
  let req = build(current);
  let res = await requestJson(req.url, req.init, timeoutMs);
  if (res.status === 401 && provider.refresh) {
    current = await refreshIntegrationToken(current, provider);
    req = build(current);
    res = await requestJson(req.url, req.init, timeoutMs);
  }
  if (res.status === 401) throw new ProviderAuthError(`${provider.displayName} rejected the access token; please reconnect`);
  return res;
}
async function logSync(entry) {
  try {
    await db.insert(integrationSyncLogs).values({
      userId: entry.userId,
      provider: entry.provider,
      event: entry.event,
      action: entry.action,
      status: entry.status,
      sourceId: entry.sourceId ?? null,
      externalId: entry.externalId ?? null,
      error: entry.error ? entry.error.slice(0, 1e3) : null,
      payload: entry.payload ?? null
    });
  } catch (err) {
    console.error("[Integrations] Failed to write sync log:", errorMessage(err));
  }
}
async function logSyncResults(userId, provider, event, results) {
  for (const r of results) {
    await logSync({ userId, provider, event, ...r });
  }
}
async function findExternalId(provider, sourceId, action, userId) {
  const [row] = await db.select({ externalId: integrationSyncLogs.externalId }).from(integrationSyncLogs).where(and7(
    ...userId ? [eq15(integrationSyncLogs.userId, userId)] : [],
    eq15(integrationSyncLogs.provider, provider),
    eq15(integrationSyncLogs.sourceId, sourceId),
    eq15(integrationSyncLogs.action, action),
    eq15(integrationSyncLogs.status, "success")
  )).orderBy(desc5(integrationSyncLogs.createdAt)).limit(1);
  return row?.externalId ?? null;
}
async function wasRecentlySynced(userId, provider, event, sourceId, windowMs) {
  const [row] = await db.select({ id: integrationSyncLogs.id }).from(integrationSyncLogs).where(and7(
    eq15(integrationSyncLogs.userId, userId),
    eq15(integrationSyncLogs.provider, provider),
    eq15(integrationSyncLogs.event, event),
    eq15(integrationSyncLogs.sourceId, sourceId),
    inArray7(integrationSyncLogs.status, ["success", "skipped"]),
    gt(integrationSyncLogs.createdAt, new Date(Date.now() - windowMs))
  )).limit(1);
  return !!row;
}
var REFRESH_SKEW_MS;
var init_token_store = __esm({
  "server/integrations/token-store.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_http();
    init_types2();
    REFRESH_SKEW_MS = 6e4;
  }
});

// server/integrations/normalize.ts
function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function str(value) {
  if (value == null) return null;
  const text2 = String(value).trim();
  return text2 ? text2 : null;
}
function digitsOnly(phone) {
  return (phone || "").replace(/\D/g, "");
}
function splitName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: null, lastName: null };
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}
function isValidTimeZone2(tz) {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
function tzOffsetMs(date2, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(date2);
  const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return asUtc - Math.floor(date2.getTime() / 1e3) * 1e3;
}
function zonedDateTimeToUtc(date2, time2, timeZone) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date2 || "") || !/^\d{1,2}(:\d{2}(:\d{2})?)?$/.test(time2 || "")) return null;
  const [y, m, d] = date2.split("-").map(Number);
  const [hh, mm = 0, ss = 0] = time2.split(":").map(Number);
  if ([y, m, d, hh, mm, ss].some((n) => !Number.isFinite(n))) return null;
  const tz = isValidTimeZone2(timeZone) ? timeZone : DEFAULT_TIMEZONE;
  const wall = Date.UTC(y, m - 1, d, hh, mm, ss);
  let utc = wall - tzOffsetMs(new Date(wall), tz);
  const secondPass = tzOffsetMs(new Date(utc), tz);
  if (wall - secondPass !== utc) utc = wall - secondPass;
  return new Date(utc);
}
function formatIsoWithOffset(date2, timeZone) {
  const tz = isValidTimeZone2(timeZone) ? timeZone : "UTC";
  const offsetMin = Math.round(tzOffsetMs(date2, tz) / 6e4);
  const local = new Date(date2.getTime() + offsetMin * 6e4).toISOString().slice(0, 19);
  const sign = offsetMin < 0 ? "-" : "+";
  const abs = Math.abs(offsetMin);
  const pad = (n) => String(n).padStart(2, "0");
  return `${local}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}
function leadFromRowLike(lead) {
  return {
    id: str(lead.id),
    firstName: str(lead.firstName),
    lastName: str(lead.lastName),
    phone: str(lead.phone),
    email: str(lead.email),
    company: str(lead.company),
    summary: str(lead.aiSummary),
    nextAction: str(lead.aiNextAction),
    sentiment: str(lead.sentiment),
    category: str(lead.aiCategory),
    score: typeof lead.leadScore === "number" ? lead.leadScore : null,
    origin: "call"
  };
}
function findResponse(responses, pattern) {
  for (const [key, value] of Object.entries(responses)) {
    if (pattern.test(key) && str(value)) return str(value);
  }
  return null;
}
function leadFromSubmission(submission) {
  const responses = asObject(submission.responses) ?? {};
  const name = str(submission.contactName) ?? findResponse(responses, /name/i);
  const phone = str(submission.contactPhone) ?? findResponse(responses, /phone|mobile/i);
  const email = str(submission.contactEmail) ?? findResponse(responses, /e-?mail/i);
  if (!phone && !email) return null;
  const lines = Object.entries(responses).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`);
  const formName = str(submission.formName) ?? "form";
  return {
    ...splitName(name),
    id: str(submission.id),
    phone,
    email,
    company: findResponse(responses, /company|organi[sz]ation|business/i),
    summary: `Form "${formName}" submitted${lines.length ? `:
${lines.join("\n")}` : ""}`,
    nextAction: "Review submitted form data and follow up",
    sentiment: null,
    category: "form_submitted",
    score: null,
    origin: "form"
  };
}
function leadFromEvent(data) {
  const lead = asObject(data.lead);
  if (lead && (str(lead.phone) || str(lead.email))) return leadFromRowLike(lead);
  const submission = asObject(data.submission);
  if (submission) return leadFromSubmission(submission);
  const contact = asObject(data.contact);
  if (contact && (str(contact.phone) || str(contact.email))) {
    return { ...splitName(str(contact.name)), id: str(contact.id), phone: str(contact.phone), email: str(contact.email), company: str(contact.company), summary: null, nextAction: null, sentiment: null, category: null, score: null, origin: "form" };
  }
  return null;
}
function callFromEvent(data) {
  const call = asObject(data.call);
  if (!call) return null;
  return {
    id: str(call.id),
    direction: str(call.direction) ?? str(call.callDirection),
    duration: typeof call.duration === "number" ? call.duration : null,
    summary: str(call.summary) ?? str(call.aiSummary),
    transcript: str(call.transcript)
  };
}
function callNoteText(data, lead) {
  const call = callFromEvent(data);
  const summary = lead?.summary ?? call?.summary;
  if (!call && !summary) return null;
  const lines = [];
  if (summary) lines.push(summary);
  if (lead?.nextAction) lines.push(`Next action: ${lead.nextAction}`);
  if (lead?.sentiment) lines.push(`Sentiment: ${lead.sentiment}`);
  if (call?.duration != null) lines.push(`Call duration: ${call.duration}s${call.direction ? ` (${call.direction})` : ""}`);
  if (call?.transcript) lines.push(`
Transcript:
${call.transcript.slice(0, 2e4)}`);
  return lines.length ? lines.join("\n") : null;
}
function appointmentFromEvent(data, fallbackTimeZone) {
  const appt = asObject(data.appointment);
  if (!appt) return null;
  const contact = asObject(data.contact) ?? {};
  const date2 = str(appt.scheduledDate) ?? str(appt.date) ?? str(data.newDate);
  const rawTime = str(appt.scheduledTime) ?? str(appt.time) ?? str(data.newTime);
  if (!date2 || !rawTime) return null;
  const time2 = rawTime.slice(0, 8);
  const timeZone = isValidTimeZone2(str(appt.timezone)) ? str(appt.timezone) : fallbackTimeZone;
  const duration = Number(appt.duration);
  const durationMinutes = Number.isFinite(duration) && duration > 0 ? duration : 30;
  const startUtc = zonedDateTimeToUtc(date2, time2, timeZone);
  return {
    id: str(appt.id) ?? str(appt.appointmentId),
    title: str(appt.type) ?? str(appt.serviceName) ?? "Appointment",
    date: date2,
    time: time2,
    timeZone,
    durationMinutes,
    notes: str(appt.notes),
    status: str(appt.status),
    contact: {
      name: str(contact.name) ?? str(appt.contactName),
      phone: str(contact.phone) ?? str(appt.contactPhone),
      email: str(contact.email) ?? str(appt.contactEmail)
    },
    startUtc,
    endUtc: startUtc ? new Date(startUtc.getTime() + durationMinutes * 6e4) : null
  };
}
function eventSourceId(event, data) {
  const lead = asObject(data.lead);
  const appt = asObject(data.appointment);
  const submission = asObject(data.submission);
  const call = asObject(data.call);
  const campaign = asObject(data.campaign);
  const flow = asObject(data.flow);
  if (event === "lead.upserted") return str(lead?.id);
  if (event.startsWith("appointment.")) return str(appt?.id) ?? str(appt?.appointmentId);
  if (event.startsWith("form.")) return str(submission?.id) ?? str(lead?.id);
  if (event.startsWith("campaign.")) return str(campaign?.id) ?? str(data.campaignId);
  if (event.startsWith("flow.")) return str(flow?.id) ?? str(call?.id);
  return str(call?.id) ?? str(data.callId);
}
var DEFAULT_TIMEZONE;
var init_normalize = __esm({
  "server/integrations/normalize.ts"() {
    "use strict";
    DEFAULT_TIMEZONE = "Asia/Kolkata";
  }
});

// server/integrations/providers/zoho.ts
function apiDomainFor(accountsDomain) {
  return accountsDomain.replace("accounts.zoho", "www.zohoapis");
}
async function tokenRequest(params) {
  const [accounts, keys] = await Promise.all([getZohoAccountsDomain(), requireOAuthKeys("zoho", "Zoho CRM")]);
  const res = await requestJson(`${accounts}/oauth/v2/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, ...params })
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`Zoho token request failed: ${res.data?.error ?? truncate(res.text)}`);
  return { ...res.data, access_token: token };
}
function api(row, path2, init = {}) {
  return authorizedRequest(row, zohoProvider, (r) => ({
    url: `${r.instanceUrl || "https://www.zohoapis.in"}/crm/v2${path2}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Zoho-oauthtoken ${r.accessToken}` }) }
  }));
}
async function writeRecord(row, method, path2, record, droppable) {
  const res = await api(row, path2, { method, body: JSON.stringify({ data: [record] }) });
  const result = res.data?.data?.[0];
  if (res.ok && result?.code === "SUCCESS") return result.details?.id ?? "";
  const badField = result?.details?.api_name;
  if (result?.code === "INVALID_DATA" && badField && droppable.includes(badField) && badField in record) {
    const { [badField]: _dropped, ...rest } = record;
    return writeRecord(row, method, path2, rest, droppable.filter((f) => f !== badField));
  }
  throw new Error(result?.message ? `Zoho ${result.code}: ${result.message}` : describeFailure("Zoho request", res));
}
async function findLeadId(row, contact) {
  const queries = [
    contact.phone ? `phone=${encodeURIComponent(contact.phone)}` : null,
    contact.email ? `email=${encodeURIComponent(contact.email)}` : null
  ].filter((q) => !!q);
  for (const query of queries) {
    const res = await api(row, `/Leads/search?${query}`);
    if (res.status === 204) continue;
    if (!res.ok) throw new Error(describeFailure("Zoho lead search", res));
    const id = res.data?.data?.[0]?.id;
    if (id) return id;
  }
  return null;
}
function leadRecord(lead) {
  const record = { Last_Name: lead.lastName ?? lead.firstName ?? "Unknown" };
  if (lead.lastName && lead.firstName) record.First_Name = lead.firstName;
  if (lead.phone) record.Phone = lead.phone;
  if (lead.email) record.Email = lead.email;
  if (lead.company) record.Company = lead.company;
  if (lead.summary) record.Description = lead.summary.slice(0, TEXT_LIMIT);
  return record;
}
async function handleLead(row, data, ctx) {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "lead.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const results = [];
  const existingId = await findLeadId(row, lead);
  let zohoId;
  if (existingId) {
    await writeRecord(row, "PUT", `/Leads/${existingId}`, leadRecord(lead), []);
    zohoId = existingId;
    results.push({ action: "lead.update", status: "success", sourceId: lead.id, externalId: zohoId });
  } else {
    zohoId = await writeRecord(row, "POST", "/Leads", { ...leadRecord(lead), Lead_Source: LEAD_SOURCE }, ["Lead_Source"]);
    results.push({ action: "lead.create", status: "success", sourceId: lead.id, externalId: zohoId });
  }
  const note = lead.origin === "call" ? callNoteText(data, lead) : null;
  if (note && zohoId) {
    const noteId = await writeRecord(row, "POST", `/Leads/${zohoId}/Notes`, { Note_Title: "Call summary", Note_Content: note.slice(0, TEXT_LIMIT) }, []);
    results.push({ action: "note.create", status: "success", sourceId: lead.id, externalId: noteId });
  }
  return results;
}
async function handleAppointment(row, data, ctx) {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "event.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  const leadId = await findLeadId(row, appt.contact);
  if (!leadId) return [{ action: "event.create", status: "skipped", sourceId: appt.id, error: "No Zoho lead matches the appointment contact" }];
  const record = {
    Event_Title: `${appt.title} \u2014 ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    Start_DateTime: formatIsoWithOffset(appt.startUtc, appt.timeZone),
    End_DateTime: formatIsoWithOffset(appt.endUtc, appt.timeZone),
    Participants: [{ type: "lead", participant: leadId }]
  };
  if (appt.notes) record.Description = appt.notes.slice(0, TEXT_LIMIT);
  const eventId = await writeRecord(row, "POST", "/Events", record, ["Participants"]);
  return [{ action: "event.create", status: "success", sourceId: appt.id, externalId: eventId }];
}
var SCOPES, LEAD_EVENTS, LEAD_SOURCE, TEXT_LIMIT, zohoProvider;
var init_zoho = __esm({
  "server/integrations/providers/zoho.ts"() {
    "use strict";
    init_app_keys();
    init_http();
    init_token_store();
    init_normalize();
    init_types2();
    SCOPES = "ZohoCRM.modules.ALL,ZohoCRM.users.READ";
    LEAD_EVENTS = /* @__PURE__ */ new Set(["lead.upserted", "form.submitted", "form.lead_created"]);
    LEAD_SOURCE = "Zonvo AI";
    TEXT_LIMIT = 32e3;
    zohoProvider = {
      key: "zoho",
      displayName: "Zoho CRM",
      kind: "oauth",
      appKeys: ["zoho_client_id", "zoho_client_secret"],
      async getAuthUrl(redirectUri, state) {
        const [accounts, keys] = await Promise.all([getZohoAccountsDomain(), requireOAuthKeys("zoho", "Zoho CRM")]);
        const params = new URLSearchParams({
          scope: SCOPES,
          client_id: keys.clientId,
          response_type: "code",
          access_type: "offline",
          prompt: "consent",
          redirect_uri: redirectUri,
          state
        });
        return `${accounts}/oauth/v2/auth?${params.toString()}`;
      },
      async exchangeCode(code, redirectUri) {
        const token = await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
        return {
          accessToken: token.access_token,
          refreshToken: token.refresh_token ?? null,
          expiresIn: token.expires_in ?? 3600,
          instanceUrl: token.api_domain ?? apiDomainFor(await getZohoAccountsDomain())
        };
      },
      async refresh(row) {
        if (!row.refreshToken) throw new Error("No refresh token stored");
        const token = await tokenRequest({ grant_type: "refresh_token", refresh_token: row.refreshToken });
        return { accessToken: token.access_token, expiresIn: token.expires_in ?? 3600, instanceUrl: token.api_domain ?? null };
      },
      async revoke(row) {
        if (!row.refreshToken) return;
        const accounts = await getZohoAccountsDomain();
        await requestJson(`${accounts}/oauth/v2/token/revoke?token=${encodeURIComponent(row.refreshToken)}`, { method: "POST" });
      },
      async validate(row) {
        try {
          const res = await api(row, "/users?type=CurrentUser");
          if (!res.ok) return { ok: false, error: describeFailure("Zoho user lookup", res) };
          const user = res.data?.users?.[0];
          return { ok: true, accountName: user ? [user.full_name, user.email].filter(Boolean).join(" \xB7 ") : null, externalAccountId: user?.id ?? null };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },
      publicConfig() {
        return {};
      },
      supports(event) {
        return LEAD_EVENTS.has(event) || event === "appointment.booked";
      },
      handle(row, event, data, ctx) {
        return event === "appointment.booked" ? handleAppointment(row, data, ctx) : handleLead(row, data, ctx);
      }
    };
  }
});

// server/integrations/providers/salesforce.ts
async function tokenRequest2(params) {
  const [loginUrl, keys] = await Promise.all([getSalesforceLoginUrl(), requireOAuthKeys("salesforce", "Salesforce")]);
  const res = await requestJson(`${loginUrl}/services/oauth2/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, ...params })
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`Salesforce token request failed: ${res.data?.error_description ?? res.data?.error ?? truncate(res.text)}`);
  return { ...res.data, access_token: token };
}
function instanceUrlOf(row) {
  if (!row.instanceUrl) throw new Error("Salesforce instance URL missing; please reconnect");
  return row.instanceUrl.replace(/\/$/, "");
}
function api2(row, path2, init = {}) {
  return authorizedRequest(row, salesforceProvider, (r) => ({
    url: `${instanceUrlOf(r)}/services/data/${API_VERSION}${path2}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}` }) }
  }));
}
function sfErrors(res) {
  return Array.isArray(res.data) ? res.data : [];
}
function sfFailure(what, res) {
  const messages = sfErrors(res).map((e) => `${e.errorCode ?? "ERROR"}: ${e.message ?? ""}`);
  return new Error(messages.length ? `Salesforce ${what} failed: ${messages.join("; ")}` : describeFailure(`Salesforce ${what}`, res));
}
async function createRecord(row, sobject, body, droppable) {
  const res = await api2(row, `/sobjects/${sobject}`, { method: "POST", body: JSON.stringify(body) });
  if (res.ok && res.data?.id) return res.data.id;
  const badField = sfErrors(res).flatMap((e) => e.fields ?? []).find((f) => droppable.includes(f) && f in body);
  if (badField) {
    const { [badField]: _dropped, ...rest } = body;
    return createRecord(row, sobject, rest, droppable.filter((f) => f !== badField));
  }
  throw sfFailure(`${sobject} create`, res);
}
async function updateRecord(row, sobject, id, body) {
  const res = await api2(row, `/sobjects/${sobject}/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) });
  if (!res.ok) throw sfFailure(`${sobject} update`, res);
}
function soql(value) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}
async function findLeadId2(row, contact) {
  const conditions = [];
  if (contact.phone) conditions.push(`Phone = '${soql(contact.phone)}'`, `MobilePhone = '${soql(contact.phone)}'`);
  if (contact.email) conditions.push(`Email = '${soql(contact.email)}'`);
  if (!conditions.length) return null;
  const query = `SELECT Id FROM Lead WHERE IsConverted = false AND (${conditions.join(" OR ")}) ORDER BY CreatedDate DESC LIMIT 1`;
  const res = await api2(row, `/query?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw sfFailure("lead query", res);
  return res.data?.records?.[0]?.Id ?? null;
}
function leadRecord2(lead, forUpdate) {
  const record = { LastName: lead.lastName ?? lead.firstName ?? "Unknown" };
  if (lead.lastName && lead.firstName) record.FirstName = lead.firstName;
  if (lead.company) record.Company = lead.company;
  else if (!forUpdate) record.Company = "Unknown";
  if (lead.phone) record.Phone = lead.phone;
  if (lead.email) record.Email = lead.email;
  if (lead.summary) record.Description = lead.summary.slice(0, TEXT_LIMIT2);
  return record;
}
async function handleLead2(row, data, ctx) {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "lead.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const results = [];
  let leadId = await findLeadId2(row, lead);
  if (leadId) {
    await updateRecord(row, "Lead", leadId, leadRecord2(lead, true));
    results.push({ action: "lead.update", status: "success", sourceId: lead.id, externalId: leadId });
  } else {
    leadId = await createRecord(row, "Lead", { ...leadRecord2(lead, false), LeadSource: LEAD_SOURCE2 }, ["LeadSource"]);
    results.push({ action: "lead.create", status: "success", sourceId: lead.id, externalId: leadId });
  }
  const note = lead.origin === "call" ? callNoteText(data, lead) : null;
  if (note) {
    const taskId = await createRecord(row, "Task", {
      Subject: "AI call",
      Description: note.slice(0, TEXT_LIMIT2),
      WhoId: leadId,
      Status: "Completed",
      TaskSubtype: "Call",
      ActivityDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    }, ["TaskSubtype", "Status"]);
    results.push({ action: "task.create", status: "success", sourceId: lead.id, externalId: taskId });
  }
  return results;
}
async function handleAppointment2(row, data, ctx) {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "event.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  const leadId = await findLeadId2(row, appt.contact);
  if (!leadId) return [{ action: "event.create", status: "skipped", sourceId: appt.id, error: "No Salesforce lead matches the appointment contact" }];
  const body = {
    Subject: `${appt.title} \u2014 ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    StartDateTime: appt.startUtc.toISOString(),
    EndDateTime: appt.endUtc.toISOString(),
    DurationInMinutes: appt.durationMinutes,
    WhoId: leadId
  };
  if (appt.notes) body.Description = appt.notes.slice(0, TEXT_LIMIT2);
  const eventId = await createRecord(row, "Event", body, []);
  return [{ action: "event.create", status: "success", sourceId: appt.id, externalId: eventId }];
}
function orgIdFromIdentity(identityUrl) {
  const match = identityUrl?.match(/\/id\/([^/]+)\/[^/]+$/);
  return match?.[1] ?? null;
}
var API_VERSION, SCOPES2, LEAD_EVENTS2, LEAD_SOURCE2, TEXT_LIMIT2, salesforceProvider;
var init_salesforce = __esm({
  "server/integrations/providers/salesforce.ts"() {
    "use strict";
    init_app_keys();
    init_http();
    init_token_store();
    init_normalize();
    init_types2();
    API_VERSION = "v60.0";
    SCOPES2 = "api refresh_token offline_access";
    LEAD_EVENTS2 = /* @__PURE__ */ new Set(["lead.upserted", "form.submitted", "form.lead_created"]);
    LEAD_SOURCE2 = "Zonvo AI";
    TEXT_LIMIT2 = 32e3;
    salesforceProvider = {
      key: "salesforce",
      displayName: "Salesforce",
      kind: "oauth",
      appKeys: ["salesforce_client_id", "salesforce_client_secret"],
      async getAuthUrl(redirectUri, state) {
        const [loginUrl, keys] = await Promise.all([getSalesforceLoginUrl(), requireOAuthKeys("salesforce", "Salesforce")]);
        const params = new URLSearchParams({ response_type: "code", client_id: keys.clientId, redirect_uri: redirectUri, scope: SCOPES2, state });
        return `${loginUrl}/services/oauth2/authorize?${params.toString()}`;
      },
      async exchangeCode(code, redirectUri) {
        const token = await tokenRequest2({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
        if (!token.instance_url) throw new Error("Salesforce did not return an instance URL");
        return {
          accessToken: token.access_token,
          refreshToken: token.refresh_token ?? null,
          expiresIn: null,
          instanceUrl: token.instance_url,
          externalAccountId: orgIdFromIdentity(token.id)
        };
      },
      async refresh(row) {
        if (!row.refreshToken) throw new Error("No refresh token stored");
        const token = await tokenRequest2({ grant_type: "refresh_token", refresh_token: row.refreshToken });
        return { accessToken: token.access_token, instanceUrl: token.instance_url ?? null, expiresIn: null };
      },
      async revoke(row) {
        if (!row.refreshToken) return;
        const loginUrl = await getSalesforceLoginUrl();
        await requestJson(`${loginUrl}/services/oauth2/revoke`, { method: "POST", headers: FORM_HEADERS, body: new URLSearchParams({ token: row.refreshToken }) });
      },
      async validate(row) {
        try {
          const res = await authorizedRequest(row, salesforceProvider, (r) => ({
            url: `${instanceUrlOf(r)}/services/oauth2/userinfo`,
            init: { headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}` }) }
          }));
          if (!res.ok) return { ok: false, error: describeFailure("Salesforce userinfo", res) };
          const info = res.data ?? {};
          return {
            ok: true,
            accountName: [info.name, info.preferred_username ?? info.email].filter(Boolean).join(" \xB7 ") || null,
            externalAccountId: info.organization_id ?? row.externalAccountId ?? null
          };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },
      publicConfig(row) {
        return { instanceUrl: row?.instanceUrl ?? null };
      },
      supports(event) {
        return LEAD_EVENTS2.has(event) || event === "appointment.booked";
      },
      handle(row, event, data, ctx) {
        return event === "appointment.booked" ? handleAppointment2(row, data, ctx) : handleLead2(row, data, ctx);
      }
    };
  }
});

// server/integrations/providers/gohighlevel.ts
function ghlMessage(res) {
  const message = res.data && typeof res.data === "object" ? res.data.message : void 0;
  return Array.isArray(message) ? message.join("; ") : message ?? truncate(res.text);
}
async function tokenRequest3(params) {
  const keys = await requireOAuthKeys("ghl", "GoHighLevel");
  const res = await requestJson(`${BASE}/oauth/token`, {
    method: "POST",
    headers: FORM_HEADERS,
    body: new URLSearchParams({ client_id: keys.clientId, client_secret: keys.clientSecret, user_type: "Location", ...params })
  });
  const token = res.data?.access_token;
  if (!res.ok || !token) throw new Error(`GoHighLevel token request failed: ${ghlMessage(res)}`);
  return { ...res.data, access_token: token };
}
function locationIdOf(row) {
  if (!row.externalAccountId) throw new Error("GoHighLevel location id missing; please reconnect");
  return row.externalAccountId;
}
function api3(row, path2, init = {}, version = VERSION) {
  return authorizedRequest(row, gohighlevelProvider, (r) => ({
    url: `${BASE}${path2}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Bearer ${r.accessToken}`, Version: version }) }
  }));
}
async function upsertContact(row, contact) {
  if (!contact.phone && !contact.email) throw new Error("Contact has no phone or email");
  const body = { locationId: locationIdOf(row), source: "Zonvo AI" };
  if (contact.firstName) body.firstName = contact.firstName;
  if (contact.lastName) body.lastName = contact.lastName;
  if (contact.phone) body.phone = contact.phone;
  if (contact.email) body.email = contact.email;
  const res = await api3(row, "/contacts/upsert", { method: "POST", body: JSON.stringify(body) });
  const id = res.data?.contact?.id;
  if (!res.ok || !id) throw new Error(`GoHighLevel contact upsert failed: ${ghlMessage(res)}`);
  return { id, created: res.data?.new === true };
}
async function addNote(row, contactId, text2) {
  const res = await api3(row, `/contacts/${encodeURIComponent(contactId)}/notes`, { method: "POST", body: JSON.stringify({ body: text2.slice(0, 2e4) }) });
  if (!res.ok) throw new Error(`GoHighLevel note failed: ${ghlMessage(res)}`);
  return res.data?.note?.id ?? null;
}
async function handleLead3(row, data, ctx) {
  const lead = leadFromEvent(data);
  if (!lead) return [{ action: "contact.upsert", status: "skipped", sourceId: ctx.sourceId, error: "Payload has no phone or email" }];
  const contact = await upsertContact(row, lead);
  const results = [{ action: "contact.upsert", status: "success", sourceId: lead.id, externalId: contact.id, payload: { created: contact.created } }];
  const note = callNoteText(data, lead);
  if (note) {
    const noteId = await addNote(row, contact.id, note);
    results.push({ action: "note.create", status: "success", sourceId: lead.id, externalId: noteId });
  }
  return results;
}
async function handleAppointment3(row, data, ctx) {
  const appt = appointmentFromEvent(data, DEFAULT_TIMEZONE);
  if (!appt?.startUtc || !appt.endUtc) {
    return [{ action: "appointment.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  }
  if (!appt.contact.phone && !appt.contact.email) {
    return [{ action: "appointment.create", status: "skipped", sourceId: appt.id, error: "Appointment contact has no phone or email" }];
  }
  const contact = await upsertContact(row, { ...splitName(appt.contact.name), phone: appt.contact.phone, email: appt.contact.email });
  const results = [{ action: "contact.upsert", status: "success", sourceId: appt.id, externalId: contact.id }];
  const calendarId = str(asObject(row.config)?.calendarId);
  if (!calendarId) {
    results.push({ action: "appointment.create", status: "skipped", sourceId: appt.id, error: "No GoHighLevel calendar selected" });
    return results;
  }
  const body = {
    calendarId,
    locationId: locationIdOf(row),
    contactId: contact.id,
    startTime: formatIsoWithOffset(appt.startUtc, appt.timeZone),
    endTime: formatIsoWithOffset(appt.endUtc, appt.timeZone),
    title: `${appt.title} \u2014 ${appt.contact.name ?? appt.contact.phone ?? "contact"}`,
    appointmentStatus: "confirmed",
    ignoreDateRange: true,
    ignoreFreeSlotValidation: true
  };
  const res = await api3(row, "/calendars/events/appointments", { method: "POST", body: JSON.stringify(body) }, CALENDAR_VERSION);
  if (!res.ok || !res.data?.id) throw new Error(`GoHighLevel appointment failed: ${ghlMessage(res)}`);
  results.push({ action: "appointment.create", status: "success", sourceId: appt.id, externalId: res.data.id, payload: { calendarId, startTime: body.startTime } });
  return results;
}
var BASE, AUTH_URL, SCOPES3, VERSION, CALENDAR_VERSION, LEAD_EVENTS3, gohighlevelProvider;
var init_gohighlevel = __esm({
  "server/integrations/providers/gohighlevel.ts"() {
    "use strict";
    init_app_keys();
    init_http();
    init_token_store();
    init_normalize();
    init_types2();
    BASE = "https://services.leadconnectorhq.com";
    AUTH_URL = "https://marketplace.gohighlevel.com/oauth/chooselocation";
    SCOPES3 = "contacts.readonly contacts.write calendars.readonly calendars/events.write locations.readonly";
    VERSION = "2021-07-28";
    CALENDAR_VERSION = "2021-04-15";
    LEAD_EVENTS3 = /* @__PURE__ */ new Set(["lead.upserted", "form.submitted", "form.lead_created"]);
    gohighlevelProvider = {
      key: "gohighlevel",
      displayName: "GoHighLevel",
      kind: "oauth",
      appKeys: ["ghl_client_id", "ghl_client_secret"],
      async getAuthUrl(redirectUri, state) {
        const keys = await requireOAuthKeys("ghl", "GoHighLevel");
        const params = new URLSearchParams({ response_type: "code", redirect_uri: redirectUri, client_id: keys.clientId, scope: SCOPES3, state });
        return `${AUTH_URL}?${params.toString()}`;
      },
      async exchangeCode(code, redirectUri) {
        const token = await tokenRequest3({ grant_type: "authorization_code", code, redirect_uri: redirectUri });
        if (!token.locationId) {
          throw new Error("GoHighLevel returned an agency-level token. Install the app on a sub-account (location) and try again.");
        }
        return {
          accessToken: token.access_token,
          refreshToken: token.refresh_token ?? null,
          expiresIn: token.expires_in ?? 86400,
          externalAccountId: token.locationId
        };
      },
      async refresh(row) {
        if (!row.refreshToken) throw new Error("No refresh token stored");
        const token = await tokenRequest3({ grant_type: "refresh_token", refresh_token: row.refreshToken });
        return { accessToken: token.access_token, refreshToken: token.refresh_token ?? null, expiresIn: token.expires_in ?? 86400 };
      },
      async validate(row) {
        try {
          const locationId = locationIdOf(row);
          const res = await api3(row, `/locations/${encodeURIComponent(locationId)}`);
          if (!res.ok) return { ok: false, error: describeFailure("GoHighLevel location lookup", res) };
          return { ok: true, accountName: res.data?.location?.name ?? null, externalAccountId: locationId };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },
      async options(row) {
        const res = await api3(row, `/calendars/?locationId=${encodeURIComponent(locationIdOf(row))}`, {}, CALENDAR_VERSION);
        if (!res.ok) throw new Error(describeFailure("GoHighLevel calendars", res));
        return { calendars: (res.data?.calendars ?? []).map((c) => ({ id: c.id, name: c.name })) };
      },
      async applyConfig(input, existing) {
        const calendarId = str(input.calendarId);
        return { config: { ...asObject(existing?.config) ?? {}, calendarId } };
      },
      publicConfig(row) {
        return { calendarId: str(asObject(row?.config)?.calendarId), locationId: row?.externalAccountId ?? null };
      },
      supports(event) {
        return LEAD_EVENTS3.has(event) || event === "appointment.booked";
      },
      handle(row, event, data, ctx) {
        return event === "appointment.booked" ? handleAppointment3(row, data, ctx) : handleLead3(row, data, ctx);
      }
    };
  }
});

// server/integrations/providers/calcom.ts
function configOf(row) {
  const config = asObject(row?.config) ?? {};
  const eventTypeId = Number(config.eventTypeId);
  const timeZone = str(config.timeZone);
  return {
    eventTypeId: Number.isInteger(eventTypeId) && eventTypeId > 0 ? eventTypeId : null,
    timeZone: isValidTimeZone2(timeZone) ? timeZone : DEFAULT_TIMEZONE
  };
}
function calMessage(res) {
  const data = res.data && typeof res.data === "object" ? res.data : null;
  return data?.error?.message ?? data?.message ?? truncate(res.text);
}
async function api4(row, path2, init = {}, version) {
  if (!row.accessToken) throw new ProviderAuthError("Cal.com API key is not set");
  const res = await requestJson(`${BASE2}${path2}`, {
    ...init,
    headers: jsonHeaders({ Authorization: `Bearer ${row.accessToken}`, ...version ? { "cal-api-version": version } : {} })
  });
  if (res.status === 401) throw new ProviderAuthError("Cal.com rejected the API key; please enter a new one");
  return res;
}
function e164(phone) {
  if (!phone) return null;
  const digits = digitsOnly(phone);
  return digits.length >= 8 ? `+${digits}` : null;
}
async function createBooking(row, appt, eventTypeId) {
  if (!appt.startUtc) throw new Error("Appointment has no usable date/time");
  const phone = e164(appt.contact.phone);
  const metadata = { source: "zonvo-ai" };
  if (appt.id) metadata.appointmentId = appt.id;
  const body = {
    start: appt.startUtc.toISOString(),
    eventTypeId,
    attendee: {
      name: appt.contact.name ?? appt.contact.phone ?? "Guest",
      email: appt.contact.email ?? `${digitsOnly(appt.contact.phone) || "guest"}@${FALLBACK_EMAIL_DOMAIN}`,
      timeZone: appt.timeZone,
      language: "en",
      ...phone ? { phoneNumber: phone } : {}
    },
    metadata
  };
  const res = await api4(row, "/bookings", { method: "POST", body: JSON.stringify(body) }, BOOKINGS_VERSION);
  const uid = res.data?.data?.uid;
  if (!res.ok || !uid) throw new Error(`Cal.com booking failed: ${calMessage(res)}`);
  return uid;
}
async function cancelBooking(row, uid, reason) {
  const res = await api4(row, `/bookings/${encodeURIComponent(uid)}/cancel`, { method: "POST", body: JSON.stringify({ cancellationReason: reason }) }, BOOKINGS_VERSION);
  if (!res.ok) throw new Error(`Cal.com cancel failed: ${calMessage(res)}`);
}
async function handleBooked(row, appt, ctx) {
  const { eventTypeId } = configOf(row);
  if (!eventTypeId) return [{ action: "booking.create", status: "skipped", sourceId: ctx.sourceId, error: "No Cal.com event type selected" }];
  if (!appt?.startUtc) return [{ action: "booking.create", status: "skipped", sourceId: ctx.sourceId, error: "Appointment has no usable date/time" }];
  const uid = await createBooking(row, appt, eventTypeId);
  return [{ action: "booking.create", status: "success", sourceId: appt.id, externalId: uid, payload: { start: appt.startUtc.toISOString() } }];
}
async function handleCancelled(row, appt, data, ctx) {
  const sourceId = appt?.id ?? ctx.sourceId;
  const uid = sourceId ? await ctx.findExternalId("booking.create", sourceId) : null;
  if (!uid) return [{ action: "booking.cancel", status: "skipped", sourceId, error: "No Cal.com booking recorded for this appointment" }];
  await cancelBooking(row, uid, str(data.cancelReason) ?? "Cancelled in Zonvo");
  return [{ action: "booking.cancel", status: "success", sourceId, externalId: uid }];
}
async function handleRescheduled(row, appt, ctx) {
  const sourceId = appt?.id ?? ctx.sourceId;
  const results = [];
  const uid = sourceId ? await ctx.findExternalId("booking.create", sourceId) : null;
  if (uid) {
    try {
      await cancelBooking(row, uid, "Rescheduled in Zonvo");
      results.push({ action: "booking.cancel", status: "success", sourceId, externalId: uid });
    } catch (err) {
      results.push({ action: "booking.cancel", status: "failed", sourceId, externalId: uid, error: errorMessage(err) });
    }
  }
  results.push(...await handleBooked(row, appt, ctx));
  return results;
}
var BASE2, EVENT_TYPES_VERSION, BOOKINGS_VERSION, APPOINTMENT_EVENTS, FALLBACK_EMAIL_DOMAIN, calcomProvider;
var init_calcom = __esm({
  "server/integrations/providers/calcom.ts"() {
    "use strict";
    init_http();
    init_normalize();
    init_types2();
    BASE2 = "https://api.cal.com/v2";
    EVENT_TYPES_VERSION = "2024-06-14";
    BOOKINGS_VERSION = "2026-02-25";
    APPOINTMENT_EVENTS = /* @__PURE__ */ new Set(["appointment.booked", "appointment.cancelled", "appointment.rescheduled"]);
    FALLBACK_EMAIL_DOMAIN = "noemail.zonvo.tech";
    calcomProvider = {
      key: "calcom",
      displayName: "Cal.com",
      kind: "apikey",
      appKeys: [],
      async validate(row) {
        try {
          const res = await api4(row, "/me");
          if (!res.ok) return { ok: false, error: describeFailure("Cal.com profile lookup", res) };
          const me = res.data?.data ?? {};
          return {
            ok: true,
            accountName: [me.name ?? me.username, me.email].filter(Boolean).join(" \xB7 ") || null,
            externalAccountId: me.id != null ? String(me.id) : null
          };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },
      async options(row) {
        const res = await api4(row, "/event-types", {}, EVENT_TYPES_VERSION);
        if (!res.ok) throw new Error(describeFailure("Cal.com event types", res));
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : asObject(raw)?.eventTypes ?? [];
        const eventTypes = list.map((item) => asObject(item)).filter((item) => !!item).map((item) => ({ id: Number(item.id), title: str(item.title) ?? "", lengthInMinutes: Number(item.lengthInMinutes ?? item.length) || null }));
        return { eventTypes };
      },
      async applyConfig(input, existing) {
        const apiKey = str(input.apiKey);
        if (apiKey && !apiKey.startsWith("cal_")) return { config: {}, error: "Cal.com API keys start with cal_" };
        if (!apiKey && !existing?.accessToken) return { config: {}, error: "Cal.com API key is required" };
        const rawEventType = input.eventTypeId;
        const eventTypeId = rawEventType == null || rawEventType === "" ? null : Number(rawEventType);
        if (eventTypeId !== null && (!Number.isInteger(eventTypeId) || eventTypeId <= 0)) return { config: {}, error: "eventTypeId must be a positive integer" };
        const timeZone = str(input.timeZone) ?? DEFAULT_TIMEZONE;
        if (!isValidTimeZone2(timeZone)) return { config: {}, error: `Unknown time zone: ${timeZone}` };
        return { config: { eventTypeId, timeZone }, accessToken: apiKey ?? void 0 };
      },
      publicConfig(row) {
        return { apiKeySet: !!row?.accessToken, ...configOf(row) };
      },
      supports(event) {
        return APPOINTMENT_EVENTS.has(event);
      },
      async handle(row, event, data, ctx) {
        const appt = appointmentFromEvent(data, configOf(row).timeZone);
        if (event === "appointment.cancelled") return handleCancelled(row, appt, data, ctx);
        if (event === "appointment.rescheduled") return handleRescheduled(row, appt, ctx);
        return handleBooked(row, appt, ctx);
      }
    };
  }
});

// server/utils/url-validator.ts
import { URL as URL2 } from "url";
import dns from "dns";
import { promisify } from "util";
import net from "net";
function mappedIPv4(ip) {
  const dotted = ip.match(/^(?:0*:)*ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i);
  if (dotted) return dotted[1];
  const hex = ip.match(/^(?:0*:)*ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (hex) {
    const hi = parseInt(hex[1], 16);
    const lo = parseInt(hex[2], 16);
    return `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`;
  }
  return null;
}
function isPrivateIP(ip) {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true;
    if (parts[0] === 0) return true;
    if (parts[0] >= 224) return true;
  }
  if (net.isIPv6(ip)) {
    const mapped = mappedIPv4(ip);
    if (mapped) return isPrivateIP(mapped);
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower === "::" || /^f[cd]/.test(lower) || /^fe[89ab]/.test(lower)) return true;
  }
  return false;
}
async function validateWebhookUrl(url) {
  try {
    const parsed = new URL2(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS URLs are allowed" };
    }
    const hostname = parsed.hostname.replace(/^\[|\]$/g, "");
    if (BLOCKED_HOSTNAMES.includes(hostname)) {
      return { valid: false, error: "Webhook URL must not point to a local or internal address" };
    }
    if (net.isIP(hostname)) {
      if (isPrivateIP(hostname)) {
        return { valid: false, error: "Webhook URL must not point to a private IP address" };
      }
    } else {
      try {
        const answers = await dnsLookup(hostname, { all: true });
        if (!answers.length || answers.some((a) => isPrivateIP(a.address))) {
          return { valid: false, error: "Webhook URL resolves to a private IP address" };
        }
      } catch {
        return { valid: false, error: "Could not resolve webhook URL hostname" };
      }
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}
var dnsLookup, BLOCKED_HOSTNAMES;
var init_url_validator = __esm({
  "server/utils/url-validator.ts"() {
    "use strict";
    dnsLookup = promisify(dns.lookup);
    BLOCKED_HOSTNAMES = [
      "localhost",
      "127.0.0.1",
      "[::1]",
      "0.0.0.0",
      "169.254.169.254",
      "metadata.google.internal"
    ];
  }
});

// server/services/webhook-test-service.ts
import crypto from "crypto";
function generateComprehensiveTestPayload(eventType = "webhook.test") {
  const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
  const baseData = {
    test: true,
    environment: "test",
    webhookVersion: "1.0"
  };
  switch (eventType) {
    case "call.started":
      return {
        event: "call.started",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "in-progress",
            startedAt: timestamp2,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876",
            email: "john.doe@example.com"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Agent",
            type: "natural"
          }
        }
      };
    case "call.completed":
      return {
        event: "call.completed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "completed",
            startedAt: new Date(Date.now() - 12e4).toISOString(),
            endedAt: timestamp2,
            duration: 120,
            durationMinutes: 2,
            fromNumber: "+15555551234",
            toNumber: "+15555559876",
            recordingUrl: "https://api.twilio.com/recordings/test-recording.mp3"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Jane Smith",
            phone: "+15555559876",
            email: "jane.smith@example.com",
            company: "Acme Corp"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Sales Outreach Q1"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Sales Agent",
            type: "natural"
          },
          analysis: {
            classification: "Warm Lead",
            sentiment: "positive",
            summary: "The caller expressed interest in our product and requested a follow-up meeting. They mentioned budget approval is pending.",
            transcript: [
              { role: "agent", text: "Hello, this is Sarah from Acme. How are you today?" },
              { role: "user", text: "Hi Sarah, I'm doing well. I was actually looking into your services." },
              { role: "agent", text: "That's great to hear! What specific services are you interested in?" },
              { role: "user", text: "We need help with our customer outreach program." },
              { role: "agent", text: "I'd love to schedule a detailed demo. Would next Tuesday work for you?" },
              { role: "user", text: "Yes, that works. Let me give you my email." }
            ],
            keyInsights: [
              "Interested in customer outreach services",
              "Budget approval pending",
              "Demo scheduled for next week"
            ],
            nextActions: [
              "Send calendar invite for demo",
              "Prepare custom proposal",
              "Follow up on budget timeline"
            ]
          },
          collectedData: {
            product_interest: "customer outreach",
            budget_status: "pending approval",
            meeting_scheduled: true,
            preferred_contact: "email"
          }
        }
      };
    case "call.failed":
      return {
        event: "call.failed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "failed",
            startedAt: new Date(Date.now() - 3e4).toISOString(),
            endedAt: timestamp2,
            duration: 30,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Robert Johnson",
            phone: "+15555559876",
            email: "robert.johnson@example.com"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Re-engagement Campaign"
          },
          error: {
            code: "NO_ANSWER",
            reason: "Call was not answered after multiple rings",
            retryable: true,
            suggestedAction: "Schedule retry in 2 hours"
          },
          analysis: {
            classification: "No Answer",
            summary: "Call was not answered. Voicemail was not detected."
          }
        }
      };
    case "call.transferred":
      return {
        event: "call.transferred",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "transferred",
            startedAt: new Date(Date.now() - 18e4).toISOString(),
            transferredAt: timestamp2,
            duration: 180,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Emily Chen",
            phone: "+15555559876",
            email: "emily.chen@example.com"
          },
          transfer: {
            reason: "Customer requested human agent",
            transferTo: "+15555550000",
            transferType: "warm",
            agentName: "Customer Support Team",
            department: "Support"
          },
          analysis: {
            summary: "Customer had a billing inquiry that required human assistance. AI collected initial information before transferring.",
            preTransferContext: {
              issue_type: "billing",
              account_number: "ACC-12345",
              issue_description: "Discrepancy in monthly invoice"
            }
          }
        }
      };
    case "campaign.started":
      return {
        event: "campaign.started",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Product Launch Outreach",
            description: "Outreach campaign for new product launch",
            status: "running",
            startedAt: timestamp2,
            totalContacts: 500,
            completedCalls: 0,
            remainingCalls: 500,
            estimatedDuration: "4 hours"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Product Launch Agent",
            type: "natural"
          },
          schedule: {
            timezone: "America/New_York",
            callWindow: {
              start: "09:00",
              end: "17:00"
            },
            daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"]
          }
        }
      };
    case "campaign.completed":
      return {
        event: "campaign.completed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Q1 Sales Outreach",
            description: "Quarterly sales outreach campaign",
            status: "completed",
            startedAt: new Date(Date.now() - 144e5).toISOString(),
            completedAt: timestamp2,
            totalContacts: 500,
            completedCalls: 487,
            failedCalls: 13
          },
          statistics: {
            totalDuration: 14400,
            averageCallDuration: 95,
            successRate: 0.974,
            answeredRate: 0.68,
            classifications: {
              "Hot Lead": 45,
              "Warm Lead": 120,
              "Cold Lead": 80,
              "Not Interested": 90,
              "Callback Requested": 65,
              "No Answer": 87
            },
            appointmentsBooked: 23,
            formsCompleted: 156,
            transfersCompleted: 12
          },
          topPerformingSegments: [
            { segment: "Tech Industry", conversionRate: 0.32 },
            { segment: "Enterprise", conversionRate: 0.28 },
            { segment: "Mid-Market", conversionRate: 0.22 }
          ]
        }
      };
    case "campaign.paused":
      return {
        event: "campaign.paused",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Holiday Promotion",
            description: "Holiday season promotional campaign",
            status: "paused",
            startedAt: new Date(Date.now() - 72e5).toISOString(),
            pausedAt: timestamp2,
            totalContacts: 1e3,
            completedCalls: 234,
            remainingCalls: 766
          },
          pauseReason: "Scheduled maintenance window",
          resumeScheduledAt: new Date(Date.now() + 36e5).toISOString(),
          statistics: {
            callsBeforePause: 234,
            successRate: 0.89,
            averageCallDuration: 78
          }
        }
      };
    case "campaign.resumed":
      return {
        event: "campaign.resumed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Holiday Promotion",
            description: "Holiday season promotional campaign",
            status: "running",
            startedAt: new Date(Date.now() - 72e5).toISOString(),
            pausedAt: new Date(Date.now() - 36e5).toISOString(),
            resumedAt: timestamp2,
            totalContacts: 1e3,
            completedCalls: 234,
            remainingCalls: 766
          },
          resumeReason: "Maintenance completed",
          statistics: {
            callsBeforeResume: 234,
            successRate: 0.89
          }
        }
      };
    case "campaign.failed":
      return {
        event: "campaign.failed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Failed Campaign",
            description: "Campaign that encountered an error",
            status: "failed",
            startedAt: new Date(Date.now() - 18e5).toISOString(),
            failedAt: timestamp2,
            totalContacts: 500,
            completedCalls: 45,
            failedCalls: 12
          },
          error: {
            code: "INSUFFICIENT_CREDITS",
            message: "Campaign stopped due to insufficient credits",
            details: "User credit balance reached zero during execution"
          }
        }
      };
    case "campaign.cancelled":
      return {
        event: "campaign.cancelled",
        timestamp: timestamp2,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Cancelled Campaign",
            description: "Campaign manually cancelled by user",
            status: "cancelled",
            startedAt: new Date(Date.now() - 36e5).toISOString(),
            cancelledAt: timestamp2,
            totalContacts: 500,
            completedCalls: 123,
            remainingCalls: 377
          },
          cancelReason: "User requested cancellation"
        }
      };
    case "call.ringing":
      return {
        event: "call.ringing",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "ringing",
            startedAt: timestamp2,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.answered":
      return {
        event: "call.answered",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "in-progress",
            startedAt: new Date(Date.now() - 1e4).toISOString(),
            answeredAt: timestamp2,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.no_answer":
      return {
        event: "call.no_answer",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "no-answer",
            startedAt: new Date(Date.now() - 3e4).toISOString(),
            endedAt: timestamp2,
            duration: 30,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.busy":
      return {
        event: "call.busy",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "busy",
            startedAt: new Date(Date.now() - 5e3).toISOString(),
            endedAt: timestamp2,
            duration: 5,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.voicemail":
      return {
        event: "call.voicemail",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "voicemail",
            startedAt: new Date(Date.now() - 45e3).toISOString(),
            endedAt: timestamp2,
            duration: 45,
            fromNumber: "+15555551234",
            toNumber: "+15555559876",
            voicemailDetected: true
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "inbound_call.received":
      return {
        event: "inbound_call.received",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "ringing",
            receivedAt: timestamp2,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          },
          phoneNumber: {
            id: `phone_test_${crypto.randomUUID().substring(0, 8)}`,
            number: "+15555551234",
            country: "US"
          }
        }
      };
    case "inbound_call.answered":
      return {
        event: "inbound_call.answered",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "in-progress",
            receivedAt: new Date(Date.now() - 5e3).toISOString(),
            answeredAt: timestamp2,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          }
        }
      };
    case "inbound_call.completed":
      return {
        event: "inbound_call.completed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "completed",
            receivedAt: new Date(Date.now() - 3e5).toISOString(),
            answeredAt: new Date(Date.now() - 295e3).toISOString(),
            endedAt: timestamp2,
            duration: 300,
            durationMinutes: 5,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          },
          analysis: {
            classification: "Support Request",
            sentiment: "neutral",
            summary: "Customer called for product support"
          }
        }
      };
    case "inbound_call.missed":
      return {
        event: "inbound_call.missed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "missed",
            receivedAt: new Date(Date.now() - 3e4).toISOString(),
            missedAt: timestamp2,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          },
          reason: "No answer - call timed out"
        }
      };
    case "flow.started":
      return {
        event: "flow.started",
        timestamp: timestamp2,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`
          },
          startNode: {
            id: "node_start",
            type: "start"
          }
        }
      };
    case "flow.completed":
      return {
        event: "flow.completed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`
          },
          endNode: {
            id: "node_end",
            type: "end_call"
          },
          nodesExecuted: 5,
          flowDuration: 180
        }
      };
    case "flow.failed":
      return {
        event: "flow.failed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`
          },
          failedNode: {
            id: "node_api_call",
            type: "api_call"
          },
          error: {
            code: "API_TIMEOUT",
            message: "External API call timed out"
          }
        }
      };
    case "appointment.booked":
      return {
        event: "appointment.booked",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "confirmed",
            scheduledDate: new Date(Date.now() + 864e5 * 3).toISOString().split("T")[0],
            scheduledTime: "14:00",
            timezone: "America/New_York",
            duration: 30,
            location: "Virtual - Zoom",
            notes: "Customer interested in enterprise features"
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Michael Brown",
            phone: "+15555559876",
            email: "michael.brown@example.com",
            company: "Brown Industries",
            title: "Director of Operations"
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            duration: 145
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Demo Scheduling Campaign"
          },
          bookedBy: {
            agentId: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            agentName: "Appointment Setter AI"
          }
        }
      };
    case "appointment.confirmed":
      return {
        event: "appointment.confirmed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "confirmed",
            scheduledDate: new Date(Date.now() + 864e5 * 2).toISOString().split("T")[0],
            scheduledTime: "10:00",
            timezone: "America/New_York",
            duration: 30,
            confirmedAt: timestamp2
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Michael Brown",
            phone: "+15555559876",
            email: "michael.brown@example.com"
          },
          confirmationMethod: "sms_reply"
        }
      };
    case "appointment.cancelled":
      return {
        event: "appointment.cancelled",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Consultation",
            status: "cancelled",
            scheduledDate: new Date(Date.now() + 864e5).toISOString().split("T")[0],
            scheduledTime: "15:00",
            timezone: "America/New_York",
            cancelledAt: timestamp2
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Jane Smith",
            phone: "+15555559876",
            email: "jane.smith@example.com"
          },
          cancelReason: "Customer requested cancellation",
          cancelledBy: "customer"
        }
      };
    case "appointment.rescheduled":
      return {
        event: "appointment.rescheduled",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "rescheduled",
            originalDate: new Date(Date.now() + 864e5).toISOString().split("T")[0],
            originalTime: "10:00",
            newDate: new Date(Date.now() + 864e5 * 3).toISOString().split("T")[0],
            newTime: "14:00",
            timezone: "America/New_York",
            rescheduledAt: timestamp2
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Michael Brown",
            phone: "+15555559876",
            email: "michael.brown@example.com"
          },
          rescheduleReason: "Conflict with another meeting",
          rescheduledBy: "customer"
        }
      };
    case "appointment.completed":
      return {
        event: "appointment.completed",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "completed",
            scheduledDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            scheduledTime: "10:00",
            timezone: "America/New_York",
            duration: 30,
            completedAt: timestamp2
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Michael Brown",
            phone: "+15555559876",
            email: "michael.brown@example.com"
          },
          outcome: {
            status: "successful",
            notes: "Customer was impressed with demo, requested follow-up"
          }
        }
      };
    case "appointment.no_show":
      return {
        event: "appointment.no_show",
        timestamp: timestamp2,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto.randomUUID().substring(0, 8)}`,
            type: "Consultation",
            status: "no_show",
            scheduledDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            scheduledTime: "14:00",
            timezone: "America/New_York",
            markedNoShowAt: timestamp2
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Robert Wilson",
            phone: "+15555559876",
            email: "robert.wilson@example.com"
          },
          followUpAction: "Attempt to reschedule"
        }
      };
    case "form.submitted":
      return {
        event: "form.submitted",
        timestamp: timestamp2,
        data: {
          ...baseData,
          form: {
            id: `form_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Lead Qualification Form",
            submittedAt: timestamp2
          },
          submission: {
            id: `submission_test_${crypto.randomUUID().substring(0, 8)}`,
            fields: {
              full_name: "Sarah Williams",
              email: "sarah.williams@example.com",
              phone: "+15555559876",
              company: "Williams & Associates",
              company_size: "50-100 employees",
              annual_revenue: "$5M - $10M",
              current_solution: "Manual outreach",
              pain_points: "Time-consuming, inconsistent results",
              budget_range: "$1,000 - $5,000/month",
              decision_timeline: "1-3 months",
              preferred_contact_method: "Email",
              additional_notes: "Looking to scale outreach efforts for Q2"
            },
            completionTime: 180,
            completionPercentage: 100
          },
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Sarah Williams",
            phone: "+15555559876",
            email: "sarah.williams@example.com"
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            duration: 210
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Lead Qualification Campaign"
          },
          qualification: {
            score: 85,
            grade: "A",
            recommended_action: "Schedule demo call"
          }
        }
      };
    case "form.lead_created":
      return {
        event: "form.lead_created",
        timestamp: timestamp2,
        data: {
          ...baseData,
          lead: {
            id: `lead_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "David Johnson",
            email: "david.johnson@example.com",
            phone: "+15555559876",
            company: "Johnson Enterprises",
            source: "AI Voice Agent",
            status: "new",
            createdAt: timestamp2
          },
          form: {
            id: `form_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Lead Capture Form"
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            duration: 180
          },
          qualification: {
            score: 75,
            grade: "B",
            tags: ["enterprise", "demo-requested"]
          }
        }
      };
    case "webhook.test":
    default:
      return {
        event: "webhook.test",
        timestamp: timestamp2,
        data: {
          ...baseData,
          message: "This is a comprehensive test webhook from your platform",
          sampleEvents: WEBHOOK_EVENT_TYPES.filter((e) => e !== "webhook.test"),
          documentation: "Each event type contains detailed structured data. Subscribe to specific events to receive real-time notifications.",
          contact: {
            id: `contact_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test User",
            phone: "+15555551234",
            email: "test@example.com",
            company: "Test Company Inc."
          },
          call: {
            id: `call_test_${crypto.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto.randomBytes(16).toString("hex")}`,
            status: "completed",
            duration: 120,
            durationMinutes: 2,
            classification: "Warm Lead",
            sentiment: "positive",
            transcript: "Sample transcript of the conversation...",
            summary: "Test call completed successfully with positive outcome.",
            recordingUrl: "https://example.com/recordings/test.mp3"
          },
          campaign: {
            id: `campaign_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Campaign",
            status: "running"
          },
          agent: {
            id: `agent_test_${crypto.randomUUID().substring(0, 8)}`,
            name: "Test Agent",
            type: "natural"
          },
          collectedData: {
            product_interest: "AI Voice Agents",
            budget: "$5,000/month",
            timeline: "Q1 2025",
            decision_maker: true
          }
        }
      };
  }
}
var WEBHOOK_EVENT_TYPES, WebhookTestService, webhookTestService;
var init_webhook_test_service = __esm({
  "server/services/webhook-test-service.ts"() {
    "use strict";
    init_storage();
    init_url_validator();
    WEBHOOK_EVENT_TYPES = [
      // Campaign events
      "campaign.started",
      "campaign.paused",
      "campaign.resumed",
      "campaign.completed",
      "campaign.failed",
      "campaign.cancelled",
      // Call events (outbound)
      "call.started",
      "call.ringing",
      "call.answered",
      "call.completed",
      "call.failed",
      "call.transferred",
      "call.no_answer",
      "call.busy",
      "call.voicemail",
      // Call events (inbound)
      "inbound_call.received",
      "inbound_call.answered",
      "inbound_call.completed",
      "inbound_call.missed",
      // Flow events
      "flow.started",
      "flow.completed",
      "flow.failed",
      // Appointment events
      "appointment.booked",
      "appointment.confirmed",
      "appointment.cancelled",
      "appointment.rescheduled",
      "appointment.completed",
      "appointment.no_show",
      // Form events
      "form.submitted",
      "form.lead_created",
      // Callback events (agent-scheduled call backs)
      "callback.scheduled",
      // System
      "webhook.test"
    ];
    WebhookTestService = class {
      generateSignature(payload, secret, timestamp2) {
        const signaturePayload = timestamp2 + payload;
        return crypto.createHmac("sha256", secret).update(signaturePayload).digest("hex");
      }
      buildHeaders(webhook, payload, timestamp2) {
        const signature = this.generateSignature(payload, webhook.secret, timestamp2);
        const headers = {
          "Content-Type": "application/json",
          "User-Agent": "Platform-Webhook/1.0",
          "X-Webhook-Signature": signature,
          "X-Webhook-Timestamp": timestamp2,
          "X-Webhook-Event": "webhook.test",
          "X-Webhook-Delivery": crypto.randomUUID()
        };
        if (webhook.authType === "bearer" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.token) {
            headers["Authorization"] = `Bearer ${creds.token}`;
          }
        } else if (webhook.authType === "basic" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.username) {
            const basicAuth = Buffer.from(`${creds.username}:${creds.password || ""}`).toString("base64");
            headers["Authorization"] = `Basic ${basicAuth}`;
          }
        }
        if (webhook.headers) {
          Object.assign(headers, webhook.headers);
        }
        return headers;
      }
      async testWebhook(webhookId, userId) {
        console.log(`\u{1F9EA} [WebhookTest] Testing webhook ${webhookId}`);
        const webhook = await storage.getWebhook(webhookId);
        if (!webhook) {
          console.log(`\u274C [WebhookTest] Webhook ${webhookId} not found in database`);
          return {
            success: false,
            responseTime: 0,
            error: "Webhook not found. It may have been deleted.",
            message: "Webhook not found"
          };
        }
        if (webhook.userId !== userId) {
          console.log(`\u274C [WebhookTest] Access denied for webhook ${webhookId}`);
          return {
            success: false,
            responseTime: 0,
            error: "Access denied",
            message: "You do not have permission to test this webhook"
          };
        }
        const testPayload = generateComprehensiveTestPayload("webhook.test");
        const timestamp2 = testPayload.timestamp;
        const payloadString = JSON.stringify(testPayload);
        const headers = this.buildHeaders(webhook, payloadString, timestamp2);
        const startTime = Date.now();
        let result;
        try {
          console.log(`\u{1F4E4} [WebhookTest] Sending to ${webhook.url}`);
          const urlCheck = await validateWebhookUrl(webhook.url);
          if (!urlCheck.valid) {
            console.warn(`\u{1F6AB} [WebhookTest] SSRF blocked: ${urlCheck.error} for URL ${webhook.url}`);
            return {
              success: false,
              responseTime: 0,
              error: urlCheck.error,
              message: urlCheck.error || "Blocked by security policy"
            };
          }
          const response = await fetch(webhook.url, {
            method: webhook.method || "POST",
            headers,
            body: payloadString,
            signal: AbortSignal.timeout(3e4),
            redirect: "error"
          });
          const responseTime = Date.now() - startTime;
          let responseBody = "";
          try {
            responseBody = await response.text();
            if (responseBody.length > 2e3) {
              responseBody = responseBody.substring(0, 2e3) + "...[truncated]";
            }
          } catch {
            responseBody = "Unable to read response body";
          }
          if (response.ok) {
            console.log(`\u2705 [WebhookTest] Success - Status: ${response.status}, Time: ${responseTime}ms`);
            result = {
              success: true,
              status: response.status,
              responseTime,
              responseBody,
              message: "Test webhook sent successfully"
            };
          } else {
            console.log(`\u26A0\uFE0F [WebhookTest] Failed - Status: ${response.status}, Time: ${responseTime}ms`);
            result = {
              success: false,
              status: response.status,
              responseTime,
              responseBody,
              error: `Webhook endpoint returned ${response.status}: ${response.statusText}`,
              message: "Webhook endpoint returned an error"
            };
          }
        } catch (error) {
          const responseTime = Date.now() - startTime;
          const errorMessage2 = error.name === "TimeoutError" ? "Request timed out after 30 seconds" : error.message || "Unknown error";
          console.error(`\u274C [WebhookTest] Error: ${errorMessage2}`);
          result = {
            success: false,
            responseTime,
            error: errorMessage2,
            message: "Failed to send test webhook"
          };
        }
        await this.logDelivery(webhook, testPayload, result);
        return result;
      }
      async logDelivery(webhook, payload, result) {
        try {
          const existingWebhook = await storage.getWebhook(webhook.id);
          if (!existingWebhook) {
            console.log(`\u26A0\uFE0F [WebhookTest] Webhook ${webhook.id} no longer exists, skipping log`);
            return;
          }
          const logData = {
            webhookId: webhook.id,
            event: "webhook.test",
            payload,
            success: result.success,
            httpStatus: result.status || null,
            responseBody: result.responseBody || null,
            responseTime: result.responseTime || null,
            error: result.error || null,
            attemptNumber: 1,
            maxAttempts: 1,
            nextRetryAt: null
          };
          await storage.createWebhookLog(logData);
          console.log(`\u{1F4DD} [WebhookTest] Logged delivery for webhook ${webhook.id}`);
        } catch (error) {
          console.error(`\u26A0\uFE0F [WebhookTest] Failed to log delivery (non-fatal):`, error);
        }
      }
    };
    webhookTestService = new WebhookTestService();
  }
});

// server/integrations/providers/webhook-forwarder.ts
import { createHmac } from "crypto";
function targetsOf(row) {
  const raw = asObject(row?.config)?.webhooks;
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => asObject(item)).filter((item) => !!item && !!str(item.url)).map((item) => ({
    url: str(item.url),
    events: Array.isArray(item.events) ? item.events.filter((e) => typeof e === "string") : []
  }));
}
async function parseTargets(input) {
  const raw = input.webhooks;
  if (!Array.isArray(raw)) return { webhooks: [], error: "webhooks must be an array" };
  if (raw.length > MAX_WEBHOOKS) return { webhooks: [], error: `At most ${MAX_WEBHOOKS} webhook URLs are allowed` };
  const webhooks2 = [];
  for (const item of raw) {
    const entry = asObject(item);
    const url = str(entry?.url);
    if (!url) return { webhooks: [], error: "Each webhook needs a url" };
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return { webhooks: [], error: `Invalid URL: ${url}` };
    }
    if (parsed.protocol !== "https:") return { webhooks: [], error: `Webhook URLs must use https: ${url}` };
    const check = await validateWebhookUrl(url);
    if (!check.valid) return { webhooks: [], error: `${check.error}: ${url}` };
    const events = Array.isArray(entry?.events) ? entry.events.filter((e) => typeof e === "string") : [];
    const unknown = events.filter((e) => !FORWARDABLE_EVENTS.includes(e));
    if (unknown.length) return { webhooks: [], error: `Unknown event(s): ${unknown.join(", ")}` };
    if (!webhooks2.some((w) => w.url === url)) webhooks2.push({ url, events: Array.from(new Set(events)) });
  }
  return { webhooks: webhooks2 };
}
function signedHeaders(row, event, body) {
  return {
    "Content-Type": "application/json",
    "User-Agent": "Zonvo-Integrations/1.0",
    "X-Zonvo-Event": event,
    "X-Zonvo-Signature": `sha256=${createHmac("sha256", row.id).update(body).digest("hex")}`
  };
}
async function post(url, body, headers) {
  let outcome = { ok: false, attempts: 0 };
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const resp = await fetchWithTimeout(url, { method: "POST", headers, body, redirect: "manual" }, TIMEOUT_MS);
      const redirected = resp.status >= 300 && resp.status < 400;
      const ok = resp.ok && !redirected;
      outcome = { ok, httpStatus: resp.status, attempts: attempt, error: ok ? void 0 : redirected ? `HTTP ${resp.status} redirect not followed` : `HTTP ${resp.status}` };
      if (ok || resp.status < 500) return outcome;
    } catch (err) {
      outcome = { ok: false, attempts: attempt, error: errorMessage(err) };
    }
  }
  return outcome;
}
function subscribed(target, event) {
  return target.events.length === 0 || target.events.includes(event);
}
function createWebhookProvider(key, displayName) {
  return {
    key,
    displayName,
    kind: "webhook",
    appKeys: [],
    async applyConfig(input) {
      const parsed = await parseTargets(input);
      if (parsed.error) return { config: {}, error: parsed.error };
      return { config: { webhooks: parsed.webhooks } };
    },
    publicConfig(row) {
      return { webhooks: targetsOf(row), inboundUrl: inboundTriggerUrl(), signingSecret: row?.id ?? null };
    },
    async validate(row) {
      const targets = targetsOf(row);
      if (!targets.length) return { ok: false, error: "No webhook URLs configured" };
      return { ok: true, accountName: `${targets.length} webhook${targets.length === 1 ? "" : "s"}` };
    },
    async test(row) {
      const targets = targetsOf(row);
      if (!targets.length) return { ok: false, error: "No webhook URLs configured" };
      const body = JSON.stringify(generateComprehensiveTestPayload("webhook.test"));
      const headers = signedHeaders(row, "webhook.test", body);
      const results = await Promise.all(targets.map(async (t) => {
        const outcome = await post(t.url, body, headers);
        return { url: t.url, ok: outcome.ok, httpStatus: outcome.httpStatus, error: outcome.error };
      }));
      const failed = results.find((r) => !r.ok);
      return { ok: !failed, results, error: failed ? `${failed.url}: ${failed.error}` : void 0 };
    },
    supports(event, row) {
      return event !== "webhook.test" && targetsOf(row).some((t) => subscribed(t, event));
    },
    async handle(row, event, data, ctx) {
      const body = JSON.stringify({ event, timestamp: (/* @__PURE__ */ new Date()).toISOString(), data });
      const headers = signedHeaders(row, event, body);
      const targets = targetsOf(row).filter((t) => subscribed(t, event));
      return Promise.all(targets.map(async (t) => {
        const outcome = await post(t.url, body, headers);
        return {
          action: "webhook.post",
          status: outcome.ok ? "success" : "failed",
          sourceId: ctx.sourceId,
          error: outcome.error ?? null,
          payload: { url: t.url, httpStatus: outcome.httpStatus ?? null, attempts: outcome.attempts }
        };
      }));
    }
  };
}
var MAX_WEBHOOKS, TIMEOUT_MS, MAX_ATTEMPTS, FORWARDABLE_EVENTS;
var init_webhook_forwarder = __esm({
  "server/integrations/providers/webhook-forwarder.ts"() {
    "use strict";
    init_webhook_test_service();
    init_url_validator();
    init_app_keys();
    init_http();
    init_normalize();
    init_types2();
    MAX_WEBHOOKS = 5;
    TIMEOUT_MS = 8e3;
    MAX_ATTEMPTS = 2;
    FORWARDABLE_EVENTS = ["lead.upserted", ...WEBHOOK_EVENT_TYPES.filter((e) => e !== "webhook.test")];
  }
});

// server/integrations/providers/zapier.ts
var zapierProvider;
var init_zapier = __esm({
  "server/integrations/providers/zapier.ts"() {
    "use strict";
    init_webhook_forwarder();
    zapierProvider = createWebhookProvider("zapier", "Zapier");
  }
});

// server/integrations/providers/pabbly.ts
var pabblyProvider;
var init_pabbly = __esm({
  "server/integrations/providers/pabbly.ts"() {
    "use strict";
    init_webhook_forwarder();
    pabblyProvider = createWebhookProvider("pabbly", "Pabbly Connect");
  }
});

// server/integrations/providers/index.ts
function isProviderKey(value) {
  return INTEGRATION_PROVIDERS.includes(value);
}
function getProvider(key) {
  return isProviderKey(key) ? PROVIDERS[key] : null;
}
var PROVIDERS;
var init_providers = __esm({
  "server/integrations/providers/index.ts"() {
    "use strict";
    init_schema();
    init_zoho();
    init_salesforce();
    init_gohighlevel();
    init_calcom();
    init_zapier();
    init_pabbly();
    PROVIDERS = {
      gohighlevel: gohighlevelProvider,
      salesforce: salesforceProvider,
      zoho: zohoProvider,
      calcom: calcomProvider,
      zapier: zapierProvider,
      pabbly: pabblyProvider
    };
  }
});

// server/integrations/hub.ts
import { eq as eq16 } from "drizzle-orm";
function invalidateIntegrationCache(userId) {
  rowCache.delete(userId);
}
async function connectedRows(userId) {
  const cached = rowCache.get(userId);
  if (cached && Date.now() - cached.at < ROW_CACHE_TTL_MS) return cached.rows;
  const rows = (await listIntegrationRows(userId)).filter((r) => r.status === "connected");
  rowCache.set(userId, { at: Date.now(), rows });
  return rows;
}
function publicLead(lead) {
  const source = lead;
  const out = {};
  for (const key of LEAD_PUBLIC_FIELDS) out[key] = source[key] ?? null;
  return out;
}
async function appointmentPayloadForLead(lead, callId) {
  const details = asObject(lead.appointmentDetails);
  const apptId = str(details?.appointmentId);
  let row;
  if (apptId) [row] = await db.select().from(appointments).where(eq16(appointments.id, apptId)).limit(1);
  if (!row && callId) [row] = await db.select().from(appointments).where(eq16(appointments.callId, callId)).limit(1);
  if (row) {
    if (row.status === "cancelled") return null;
    return {
      appointment: {
        id: row.id,
        type: row.serviceName,
        status: row.status,
        scheduledDate: row.appointmentDate,
        scheduledTime: row.appointmentTime,
        duration: row.duration,
        notes: row.notes
      },
      contact: { name: row.contactName, phone: row.contactPhone, email: row.contactEmail, company: lead.company },
      call: row.callId ? { id: row.callId } : null,
      lead: { id: lead.id }
    };
  }
  const date2 = str(details?.date);
  const time2 = str(details?.time);
  if (!date2 || !time2) return null;
  return {
    appointment: { id: `lead-${lead.id}`, type: str(details?.serviceName), status: "scheduled", scheduledDate: date2, scheduledTime: time2, duration: Number(details?.duration) || 30, notes: null },
    contact: { name: str(details?.contactName) ?? ([lead.firstName, lead.lastName].filter(Boolean).join(" ") || null), phone: str(details?.contactPhone) ?? lead.phone, email: lead.email, company: lead.company },
    call: callId ? { id: callId } : null,
    lead: { id: lead.id }
  };
}
var ROW_CACHE_TTL_MS, DEDUPE_WINDOW_MS, LOG, LEAD_PUBLIC_FIELDS, rowCache, IntegrationHub, integrationHub;
var init_hub = __esm({
  "server/integrations/hub.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_providers();
    init_token_store();
    init_normalize();
    init_types2();
    ROW_CACHE_TTL_MS = 1e4;
    DEDUPE_WINDOW_MS = 5 * 6e4;
    LOG = "[Integrations]";
    LEAD_PUBLIC_FIELDS = [
      "id",
      "firstName",
      "lastName",
      "phone",
      "email",
      "company",
      "stage",
      "leadScore",
      "aiSummary",
      "aiNextAction",
      "sentiment",
      "aiCategory",
      "hasAppointment",
      "hasFormSubmission",
      "hasTransfer",
      "hasCallback",
      "appointmentDate",
      "appointmentDetails",
      "formData",
      "transferredTo",
      "tags",
      "sourceType",
      "campaignId",
      "totalCalls",
      "lastCallAt",
      "createdAt",
      "updatedAt"
    ];
    rowCache = /* @__PURE__ */ new Map();
    IntegrationHub = class {
      /** Fire-and-forget: routes an app event to every connected provider for the user. Never throws. */
      dispatch(userId, event, data) {
        if (!userId || event === "webhook.test") return;
        this.run(userId, event, data).catch((err) => console.error(`${LOG} dispatch ${event} failed:`, errorMessage(err)));
      }
      async run(userId, event, data) {
        const rows = await connectedRows(userId);
        if (!rows.length) return;
        const sourceId = eventSourceId(event, data);
        await Promise.allSettled(rows.map((row) => this.runProvider(row, event, data, sourceId)));
      }
      async runProvider(row, event, data, sourceId) {
        const provider = getProvider(row.provider);
        if (!provider || !provider.supports(event, row)) return;
        if (sourceId && await wasRecentlySynced(row.userId, row.provider, event, sourceId, DEDUPE_WINDOW_MS)) return;
        const ctx = {
          userId: row.userId,
          sourceId,
          findExternalId: (action, id) => findExternalId(row.provider, id, action, row.userId)
        };
        try {
          const results = await provider.handle(row, event, data, ctx);
          await logSyncResults(row.userId, row.provider, event, results);
          const failed = results.find((r) => r.status === "failed");
          if (results.some((r) => r.status === "success")) await markIntegrationSynced(row.id, failed?.error ?? null);
          else if (failed) await markIntegrationError(row.id, failed.error ?? "Sync failed");
        } catch (err) {
          const message = errorMessage(err);
          console.error(`${LOG} ${row.provider} ${event} failed for user ${row.userId}: ${message}`);
          await logSync({ userId: row.userId, provider: row.provider, event, action: "handle", status: "failed", sourceId, error: message });
          const authFailure = err instanceof ProviderAuthError;
          await markIntegrationError(row.id, message, authFailure ? "error" : void 0);
          if (authFailure) invalidateIntegrationCache(row.userId);
        }
      }
      /** Called by the CRM lead processor after a lead row was created/updated from a call. Never throws. */
      async onLeadUpserted(userId, lead, context) {
        try {
          const rows = await connectedRows(userId);
          if (!rows.length) return;
          const call = context.callData;
          this.dispatch(userId, "lead.upserted", {
            lead: publicLead(lead),
            created: context.created,
            call: call ? {
              id: call.id,
              direction: call.callDirection ?? null,
              duration: call.duration ?? null,
              summary: call.aiSummary ?? null,
              transcript: call.transcript ?? null,
              from: call.fromNumber ?? null,
              to: call.toNumber ?? null,
              engine: call.engine ?? null,
              campaignId: call.campaignId ?? null
            } : null
          });
          if (lead.hasAppointment) {
            const payload = await appointmentPayloadForLead(lead, call?.id ?? null);
            if (payload) this.dispatch(userId, "appointment.booked", payload);
          }
        } catch (err) {
          console.error(`${LOG} onLeadUpserted failed for user ${userId}:`, errorMessage(err));
        }
      }
    };
    integrationHub = new IntegrationHub();
  }
});

// server/engines/crm/lead-processor.service.ts
var lead_processor_service_exports = {};
__export(lead_processor_service_exports, {
  CRMLeadProcessor: () => CRMLeadProcessor,
  default: () => lead_processor_service_default
});
import { eq as eq17, and as and8, sql as sql19 } from "drizzle-orm";
var CRMLeadProcessor, lead_processor_service_default;
var init_lead_processor_service = __esm({
  "server/engines/crm/lead-processor.service.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_crm_storage();
    init_hub();
    CRMLeadProcessor = class {
      static LOG_PREFIX = "[CRM Lead Processor]";
      // Minimum quality thresholds
      static MIN_DURATION_SECONDS = 10;
      // At least 10 seconds
      static MIN_TRANSCRIPT_LENGTH = 20;
      // At least 20 characters
      /**
       * Resolve the correct phone number based on call direction
       * For incoming calls: customer is the caller (fromNumber)
       * For outgoing calls: customer is the recipient (toNumber)
       * Handles undefined callDirection and engine-specific metadata
       */
      static resolveLeadPhone(callData) {
        let phone = null;
        const metadata = callData.metadata || {};
        if (metadata.customerPhone) {
          phone = String(metadata.customerPhone);
        } else if (metadata.callerPhone) {
          phone = String(metadata.callerPhone);
        }
        if (!phone || !this.isValidPhone(phone)) {
          const direction = callData.callDirection?.toLowerCase();
          if (direction === "incoming") {
            phone = callData.fromNumber || callData.phoneNumber || callData.toNumber || null;
          } else if (direction === "outgoing") {
            phone = callData.toNumber || callData.phoneNumber || callData.fromNumber || null;
          } else {
            phone = callData.fromNumber || callData.toNumber || callData.phoneNumber || null;
          }
        }
        if (phone && this.isValidPhone(phone)) {
          return this.normalizePhone(phone);
        }
        return "Unknown";
      }
      /**
       * Check if a phone number is valid dialable number
       * Rejects SIP identifiers, client IDs, and non-phone strings
       */
      static isValidPhone(phone) {
        if (!phone) return false;
        const cleaned = phone.trim().toLowerCase();
        if (cleaned === "" || cleaned === "unknown" || cleaned === "anonymous" || cleaned === "null" || cleaned === "undefined") {
          return false;
        }
        if (cleaned.startsWith("client:") || cleaned.startsWith("sip:") || cleaned.startsWith("agent:") || cleaned.includes("@")) {
          return false;
        }
        const digitsOnly2 = phone.replace(/\D/g, "");
        if (digitsOnly2.length < 5 || digitsOnly2.length > 15) {
          return false;
        }
        const digitRatio = digitsOnly2.length / cleaned.replace(/\s/g, "").length;
        if (digitRatio < 0.5) {
          return false;
        }
        return true;
      }
      /**
       * Normalize phone number to E.164 format for consistent deduplication
       * Always outputs +<digits> format when possible
       */
      static normalizePhone(phone) {
        let normalized = phone.trim();
        normalized = normalized.replace(/^(whatsapp:|tel:|phone:)/i, "");
        const digitsOnly2 = normalized.replace(/[^\d]/g, "");
        const hadPlus = normalized.startsWith("+");
        if (digitsOnly2.length >= 10) {
          return "+" + digitsOnly2;
        } else if (digitsOnly2.length >= 5) {
          return hadPlus ? "+" + digitsOnly2 : digitsOnly2;
        }
        return digitsOnly2 || normalized;
      }
      /**
       * Check if a call meets minimum quality standards for lead creation
       * Requires either meaningful duration OR transcript content OR high-value signals
       */
      static meetsQualityThreshold(callData) {
        const metadata = callData.metadata || {};
        const aiInsights = callData.aiInsights || metadata.aiInsights || {};
        const hasAppointment = metadata.appointmentBooked === true || metadata.hasAppointment === true || aiInsights.primaryOutcome === "appointment_booked" || aiInsights.appointmentBooked === true || metadata.appointmentDetails !== void 0 || metadata.appointmentData !== void 0;
        const hasForm = metadata.formSubmitted === true || metadata.hasFormSubmission === true || aiInsights.primaryOutcome === "form_submitted" || aiInsights.formSubmitted === true || metadata.formData !== void 0 || metadata.collectedData !== void 0;
        const hasTransfer = callData.wasTransferred === true || aiInsights.primaryOutcome === "call_transfer";
        const hasCallback = aiInsights.primaryOutcome === "need_follow_up" || aiInsights.needsFollowUp === true;
        if (hasAppointment || hasForm || hasTransfer || hasCallback) {
          return { passed: true, reason: "Has high-value business outcome" };
        }
        const hasTranscript = callData.transcript && callData.transcript.trim().length >= this.MIN_TRANSCRIPT_LENGTH;
        const hasDuration = callData.duration && callData.duration >= this.MIN_DURATION_SECONDS;
        const hasExplicitSignal = callData.aiSummary && callData.aiSummary.trim().length > 10 || callData.classification && callData.classification.trim() !== "" || callData.sentiment && callData.sentiment.trim() !== "";
        if (hasTranscript || hasDuration || hasExplicitSignal) {
          return { passed: true, reason: "Meets quality threshold" };
        }
        return {
          passed: false,
          reason: `Call too short (${callData.duration || 0}s) and no transcript (${callData.transcript?.length || 0} chars)`
        };
      }
      /**
       * Process a completed call and create a lead if it qualifies
       */
      static async processCall(callData) {
        console.log(`${this.LOG_PREFIX} Processing call ${callData.id} from engine: ${callData.engine}`);
        const qualityCheck = this.meetsQualityThreshold(callData);
        if (!qualityCheck.passed) {
          console.log(`${this.LOG_PREFIX} Call ${callData.id} rejected: ${qualityCheck.reason}`);
          return {
            leadId: null,
            qualification: {
              qualified: false,
              category: null,
              score: 0,
              hasAppointment: false,
              hasFormSubmission: false,
              hasTransfer: false,
              hasCallback: false
            }
          };
        }
        try {
          const qualification = await this.qualifyCall(callData);
          if (!qualification.qualified) {
            console.log(`${this.LOG_PREFIX} Call ${callData.id} does not qualify for CRM (no category matched)`);
            return { leadId: null, qualification };
          }
          const existingLead = await this.findExistingLead(callData);
          if (existingLead) {
            const updatedLead = await this.updateExistingLead(existingLead, callData, qualification);
            if (updatedLead) {
              void integrationHub.onLeadUpserted(callData.userId, updatedLead, { created: false, callData });
              const categoryChanged = existingLead.aiCategory !== updatedLead.aiCategory;
              console.log(`${this.LOG_PREFIX} Updated existing lead ${updatedLead.id} - aiCategory: ${existingLead.aiCategory || "none"} -> ${updatedLead.aiCategory || qualification.category}${categoryChanged ? " (changed)" : ""}`);
              return {
                leadId: updatedLead.id,
                qualification
              };
            }
            console.log(`${this.LOG_PREFIX} Update returned null, creating new lead`);
          }
          const lead = await this.createLeadFromCall(callData, qualification);
          if (!lead) {
            console.log(`${this.LOG_PREFIX} Failed to create lead for call ${callData.id} - createLeadFromCall returned null`);
            return { leadId: null, qualification };
          }
          console.log(`${this.LOG_PREFIX} Created lead ${lead.id} with category: ${qualification.category}`);
          void integrationHub.onLeadUpserted(callData.userId, lead, { created: true, callData });
          try {
            await CRMStorage.createActivity({
              userId: callData.userId,
              leadId: lead.id,
              activityType: "call",
              title: `Auto-created from ${callData.engine} call`,
              description: `Lead auto-created from ${callData.engine} ${callData.callDirection} call`,
              metadata: {
                callId: callData.id
              }
            });
          } catch (activityError) {
            console.error(`${this.LOG_PREFIX} Failed to create activity:`, activityError);
          }
          return { leadId: lead.id, qualification };
        } catch (error) {
          console.error(`${this.LOG_PREFIX} Error processing call ${callData.id}:`, error);
          throw error;
        }
      }
      /**
       * Qualify a call and determine its CRM category
       * Priority order: appointment_booked > form_submitted > call_transfer > need_follow_up > hot > warm
       */
      static async qualifyCall(callData) {
        const metadata = callData.metadata || {};
        const aiInsights = callData.aiInsights || metadata.aiInsights || metadata;
        const mergedMetadata = { ...metadata, ...aiInsights };
        const primaryOutcome = aiInsights.primaryOutcome;
        const engagementScore = this.extractEngagementScore(callData, aiInsights);
        let hasAppointment = this.checkAppointmentBooked(callData, mergedMetadata);
        let appointmentData = hasAppointment ? this.extractAppointmentData(mergedMetadata) : void 0;
        if (!hasAppointment) {
          const dbAppointment = await this.checkAppointmentInDatabase(callData);
          if (dbAppointment) {
            hasAppointment = true;
            appointmentData = dbAppointment;
          }
        }
        const hasFormSubmission = this.checkFormSubmitted(callData, mergedMetadata);
        const formData = hasFormSubmission ? this.extractFormData(mergedMetadata) : void 0;
        const hasTransfer = callData.wasTransferred === true || primaryOutcome === "call_transfer";
        const hasCallback = primaryOutcome === "need_follow_up" || this.checkNeedsFollowUp(callData, aiInsights);
        let category = null;
        if (hasAppointment) {
          category = AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED;
        } else if (hasFormSubmission) {
          category = AI_LEAD_CATEGORIES.FORM_SUBMITTED;
        } else if (hasTransfer) {
          category = AI_LEAD_CATEGORIES.CALL_TRANSFER;
        } else if (hasCallback) {
          category = AI_LEAD_CATEGORIES.NEED_FOLLOW_UP;
        } else if (engagementScore >= 70) {
          category = AI_LEAD_CATEGORIES.HOT;
        } else if (engagementScore >= 40) {
          category = AI_LEAD_CATEGORIES.WARM;
        }
        const qualified = category !== null;
        console.log(`${this.LOG_PREFIX} Qualification result for call ${callData.id}:`, {
          qualified,
          category,
          score: engagementScore,
          hasAppointment,
          hasFormSubmission,
          hasTransfer,
          hasCallback,
          primaryOutcome
        });
        return {
          qualified,
          category,
          score: engagementScore,
          hasAppointment,
          hasFormSubmission,
          hasTransfer,
          hasCallback,
          appointmentData,
          formData
        };
      }
      /**
       * Extract engagement score from call data or AI insights
       */
      static extractEngagementScore(callData, aiInsights) {
        const sources = [
          aiInsights.engagementScore,
          aiInsights.leadScore,
          aiInsights.score,
          callData.metadata?.leadScore,
          callData.metadata?.engagementScore
        ];
        for (const source of sources) {
          if (typeof source === "number" && source >= 0 && source <= 100) {
            return source;
          }
        }
        return this.calculateScoreFromSentiment(callData);
      }
      /**
       * Calculate engagement score based on sentiment, classification, and call quality
       * Balanced scoring - requires signals to qualify but tolerant of formatting differences
       */
      static calculateScoreFromSentiment(callData) {
        let score = 30;
        let hasAnySignal = false;
        const sentiment = (callData.sentiment || "").trim().toLowerCase();
        if (sentiment === "positive" || sentiment === "pos" || sentiment.includes("positive")) {
          score += 30;
          hasAnySignal = true;
        } else if (sentiment === "neutral" || sentiment.includes("neutral")) {
          score += 15;
          hasAnySignal = true;
        } else if (sentiment === "negative" || sentiment === "neg" || sentiment.includes("negative")) {
          score -= 10;
          hasAnySignal = true;
        }
        const classification = (callData.classification || "").trim().toLowerCase();
        if (classification === "hot" || classification === "interested" || classification === "qualified" || classification.includes("hot") || classification.includes("interested")) {
          score += 25;
          hasAnySignal = true;
        } else if (classification === "warm" || classification.includes("warm")) {
          score += 15;
          hasAnySignal = true;
        } else if (classification === "cold" || classification === "not_interested" || classification.includes("cold") || classification.includes("not interested")) {
          score -= 10;
          hasAnySignal = true;
        }
        if (callData.duration) {
          if (callData.duration >= 180) {
            score += 20;
            hasAnySignal = true;
          } else if (callData.duration >= 120) {
            score += 15;
            hasAnySignal = true;
          } else if (callData.duration >= 60) {
            score += 10;
            hasAnySignal = true;
          } else if (callData.duration >= 30) {
            score += 5;
            hasAnySignal = true;
          }
        }
        if (callData.transcript && callData.transcript.trim().length > 50) {
          score += 10;
          hasAnySignal = true;
        }
        if (callData.aiSummary && callData.aiSummary.trim().length > 20) {
          score += 5;
          hasAnySignal = true;
        }
        if (!hasAnySignal) {
          score = 25;
        }
        return Math.max(0, Math.min(100, score));
      }
      /**
       * Check if appointment was booked during the call
       */
      static checkAppointmentBooked(callData, metadata) {
        if (metadata.appointmentBooked === true) return true;
        if (metadata.hasAppointment === true) return true;
        const aiInsights = metadata.aiInsights;
        if (aiInsights?.primaryOutcome === "appointment_booked") return true;
        if (aiInsights?.appointmentBooked === true) return true;
        if (metadata.appointmentDetails || metadata.appointmentData) return true;
        if (callData.aiSummary) {
          const summary = callData.aiSummary.toLowerCase();
          if (summary.includes("appointment scheduled") || summary.includes("meeting booked") || summary.includes("appointment booked") || summary.includes("scheduled for")) {
            return true;
          }
        }
        return false;
      }
      static async checkAppointmentInDatabase(callData) {
        try {
          const formatAppt = (appt, matchedBy) => {
            console.log(`${this.LOG_PREFIX} Found appointment ${appt.id} in database for call ${callData.id} (matched by: ${matchedBy})`);
            return {
              appointmentId: appt.id,
              contactName: appt.contactName,
              contactPhone: appt.contactPhone,
              date: appt.appointmentDate,
              time: appt.appointmentTime,
              bookedAt: appt.createdAt?.toISOString()
            };
          };
          const byCallId = await db.select().from(appointments).where(eq17(appointments.callId, callData.id)).limit(1);
          if (byCallId.length > 0) {
            return formatAppt(byCallId[0], "callId");
          }
          const phone = callData.phoneNumber || callData.fromNumber || callData.toNumber;
          if (!phone) return null;
          const normalizedPhone = phone.replace(/\D/g, "").slice(-10);
          if (normalizedPhone.length < 7) return null;
          const byPhone = await db.select().from(appointments).where(and8(
            eq17(appointments.userId, callData.userId),
            sql19`${appointments.createdAt} > NOW() - INTERVAL '30 minutes'`,
            sql19`RIGHT(REGEXP_REPLACE(${appointments.contactPhone}, '[^0-9]', '', 'g'), 10) = ${normalizedPhone}`
          )).limit(1);
          if (byPhone.length > 0) {
            return formatAppt(byPhone[0], `userId+phone(${normalizedPhone})`);
          }
          return null;
        } catch (error) {
          console.warn(`${this.LOG_PREFIX} Appointment DB check failed for call ${callData.id}: ${error.message}`);
          return null;
        }
      }
      /**
       * Check if form was submitted during the call
       */
      static checkFormSubmitted(callData, metadata) {
        if (metadata.formSubmitted === true) return true;
        if (metadata.hasFormSubmission === true) return true;
        const aiInsights = metadata.aiInsights;
        if (aiInsights?.primaryOutcome === "form_submitted") return true;
        if (aiInsights?.formSubmitted === true) return true;
        if (metadata.formData || metadata.collectedData) return true;
        if (aiInsights?.formData || aiInsights?.collectedData) return true;
        return false;
      }
      /**
       * Check if call needs follow-up
       */
      static checkNeedsFollowUp(callData, aiInsights) {
        const classification = (callData.classification || "").toLowerCase();
        if (classification === "follow_up" || classification === "callback") return true;
        if (aiInsights.needsFollowUp === true) return true;
        if (aiInsights.followUpRequired === true) return true;
        if (aiInsights.callbackRequested === true) return true;
        const nextAction = aiInsights.aiNextAction || aiInsights.nextAction || "";
        if (nextAction.toLowerCase().includes("follow") || nextAction.toLowerCase().includes("callback") || nextAction.toLowerCase().includes("call back")) {
          return true;
        }
        return false;
      }
      /**
       * Extract appointment data from metadata
       */
      static extractAppointmentData(metadata) {
        return metadata.appointmentDetails || metadata.appointmentData || metadata.aiInsights?.appointmentDetails;
      }
      /**
       * Extract form data from metadata
       */
      static extractFormData(metadata) {
        return metadata.formData || metadata.collectedData || metadata.aiInsights?.formData || metadata.aiInsights?.collectedData;
      }
      /**
       * Find existing lead for a call
       * Respects campaign/incoming scope to prevent collapsing different campaigns' leads
       */
      static async findExistingLead(callData) {
        const phoneNumber = this.resolveLeadPhone(callData);
        const hasValidPhone = phoneNumber && phoneNumber !== "Unknown";
        if (callData.engine === "elevenlabs-twilio") {
          const [existingByCallId] = await db.select().from(leads).where(and8(
            eq17(leads.userId, callData.userId),
            eq17(leads.callId, callData.id)
          )).limit(1);
          if (existingByCallId) return existingByCallId;
        }
        if (callData.campaignId && hasValidPhone) {
          const [existingByCampaign] = await db.select().from(leads).where(and8(
            eq17(leads.userId, callData.userId),
            eq17(leads.phone, phoneNumber),
            eq17(leads.campaignId, callData.campaignId)
          )).limit(1);
          if (existingByCampaign) return existingByCampaign;
        }
        if (callData.incomingConnectionId && hasValidPhone) {
          const [existingByConnection] = await db.select().from(leads).where(and8(
            eq17(leads.userId, callData.userId),
            eq17(leads.phone, phoneNumber),
            eq17(leads.incomingConnectionId, callData.incomingConnectionId)
          )).limit(1);
          if (existingByConnection) return existingByConnection;
        }
        if (hasValidPhone && !callData.campaignId) {
          const [existingByPhone] = await db.select().from(leads).where(and8(
            eq17(leads.userId, callData.userId),
            eq17(leads.phone, phoneNumber),
            eq17(leads.sourceType, "incoming")
          )).limit(1);
          return existingByPhone || null;
        }
        return null;
      }
      /**
       * Create a lead from call data
       */
      static async createLeadFromCall(callData, qualification) {
        const phoneNumber = this.resolveLeadPhone(callData);
        const sourceType = callData.campaignId ? "campaign" : "incoming";
        const leadData = {
          userId: callData.userId,
          sourceType,
          campaignId: callData.campaignId || null,
          incomingConnectionId: callData.incomingConnectionId || null,
          phone: phoneNumber,
          stage: "new",
          leadScore: qualification.score,
          aiSummary: callData.aiSummary,
          aiNextAction: this.generateNextAction(qualification),
          sentiment: callData.sentiment,
          aiCategory: qualification.category,
          hasAppointment: qualification.hasAppointment,
          hasFormSubmission: qualification.hasFormSubmission,
          hasTransfer: qualification.hasTransfer,
          hasCallback: qualification.hasCallback,
          appointmentDetails: qualification.appointmentData,
          formData: qualification.formData,
          transferredTo: callData.transferredTo,
          transferredAt: callData.wasTransferred ? /* @__PURE__ */ new Date() : null,
          callId: callData.engine === "elevenlabs-twilio" ? callData.id : null
        };
        return CRMStorage.createLead(leadData);
      }
      /**
       * Update an existing lead with new call data and qualification
       */
      static async updateExistingLead(existingLead, callData, qualification) {
        const updates = {};
        if (qualification.score > (existingLead.leadScore || 0)) {
          updates.leadScore = qualification.score;
        }
        const actionCategories = [
          AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED,
          AI_LEAD_CATEGORIES.FORM_SUBMITTED,
          AI_LEAD_CATEGORIES.CALL_TRANSFER,
          AI_LEAD_CATEGORIES.NEED_FOLLOW_UP
        ];
        const sentimentCategories = [
          AI_LEAD_CATEGORIES.HOT,
          AI_LEAD_CATEGORIES.WARM
        ];
        const isNewCategoryAction = qualification.category && actionCategories.includes(qualification.category);
        const isExistingCategorySentiment = !existingLead.aiCategory || sentimentCategories.includes(existingLead.aiCategory);
        if (qualification.category && (isNewCategoryAction || isExistingCategorySentiment)) {
          updates.aiCategory = qualification.category;
          updates.aiNextAction = this.generateNextAction(qualification);
        }
        if (qualification.hasAppointment && !existingLead.hasAppointment) {
          updates.hasAppointment = true;
          if (qualification.appointmentData) {
            updates.appointmentDetails = qualification.appointmentData;
          }
        }
        if (qualification.hasFormSubmission && !existingLead.hasFormSubmission) {
          updates.hasFormSubmission = true;
          if (qualification.formData) {
            updates.formData = qualification.formData;
          }
        }
        if (qualification.hasTransfer && !existingLead.hasTransfer) {
          updates.hasTransfer = true;
          if (callData.transferredTo) {
            updates.transferredTo = callData.transferredTo;
            updates.transferredAt = /* @__PURE__ */ new Date();
          }
        }
        if (qualification.hasCallback && !existingLead.hasCallback) {
          updates.hasCallback = true;
        }
        if (callData.aiSummary) {
          updates.aiSummary = callData.aiSummary;
        }
        if (callData.sentiment) {
          updates.sentiment = callData.sentiment;
        }
        if (!existingLead.campaignId && callData.campaignId) {
          updates.campaignId = callData.campaignId;
          updates.sourceType = "campaign";
        }
        if (!existingLead.incomingConnectionId && callData.incomingConnectionId) {
          updates.incomingConnectionId = callData.incomingConnectionId;
        }
        if (!existingLead.callId && callData.engine === "elevenlabs-twilio") {
          updates.callId = callData.id;
        }
        if (Object.keys(updates).length > 0) {
          return CRMStorage.updateLead(existingLead.id, callData.userId, updates);
        }
        return existingLead;
      }
      /**
       * Generate suggested next action based on qualification
       */
      static generateNextAction(qualification) {
        if (qualification.hasAppointment) {
          return "Confirm appointment details and send reminder";
        }
        if (qualification.hasFormSubmission) {
          return "Review submitted form data and follow up";
        }
        if (qualification.hasTransfer) {
          return "Review call transfer outcome with agent";
        }
        if (qualification.hasCallback) {
          return "Schedule follow-up call";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.HOT) {
          return "High priority - contact immediately";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.WARM) {
          return "Nurture lead with relevant content";
        }
        return "Review call and determine next steps";
      }
      /**
       * Process a call from the ElevenLabs-Twilio engine (calls table)
       */
      static async processElevenLabsTwilioCall(callId) {
        const [call] = await db.select().from(calls).where(eq17(calls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const elevenLabsMetadata = call.metadata || {};
        const elevenLabsAiInsights = elevenLabsMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.phoneNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: call.incomingConnectionId,
          metadata: elevenLabsMetadata,
          aiInsights: elevenLabsAiInsights,
          // ElevenLabs stores insights in metadata
          engine: "elevenlabs-twilio"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the Plivo+OpenAI engine (plivo_calls table)
       */
      static async processPlivoOpenAICall(callId) {
        const [call] = await db.select().from(plivoCalls).where(eq17(plivoCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Plivo call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Plivo call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const plivoMetadata = call.metadata || {};
        const plivoAiInsights = plivoMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.fromNumber || call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          // Plivo uses plivoPhoneNumberId instead
          metadata: plivoMetadata,
          aiInsights: plivoAiInsights,
          engine: "plivo-openai"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the Twilio+OpenAI engine (twilio_openai_calls table)
       */
      static async processTwilioOpenAICall(callId) {
        const [call] = await db.select().from(twilioOpenaiCalls).where(eq17(twilioOpenaiCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Twilio-OpenAI call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Twilio-OpenAI call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const twilioMetadata = call.metadata || {};
        const twilioAiInsights = twilioMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.fromNumber || call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          // Twilio-OpenAI uses twilioPhoneNumberId instead
          metadata: twilioMetadata,
          aiInsights: twilioAiInsights,
          engine: "twilio-openai"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the SIP engine (sip_calls table)
       */
      static async processSipCall(callId) {
        const [call] = await db.select().from(sipCalls).where(eq17(sipCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} SIP call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} SIP call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const sipMetadata = call.metadata || {};
        const sipAiInsights = sipMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.direction === "inbound" ? call.fromNumber || "" : call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.direction === "inbound" ? "incoming" : "outgoing",
          status: call.status || "completed",
          duration: call.durationSeconds,
          transcript: call.transcript ? typeof call.transcript === "string" ? call.transcript : JSON.stringify(call.transcript) : null,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: false,
          transferredTo: null,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          metadata: sipMetadata,
          aiInsights: sipAiInsights,
          engine: call.engine || "elevenlabs-sip"
        };
        return this.processCall(callData);
      }
      /**
       * Parse AI summary as insights if it's a JSON string
       */
      static parseAiSummaryAsInsights(aiSummary) {
        if (!aiSummary) return null;
        try {
          const parsed = JSON.parse(aiSummary);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
        }
        return null;
      }
    };
    lead_processor_service_default = CRMLeadProcessor;
  }
});

// plugins/custom-voice-engine/routes/admin-settings.routes.ts
init_db();
import { Router } from "express";
import { sql as sql3 } from "drizzle-orm";

// server/middleware/admin-auth.ts
init_db();
init_schema();
import jwt from "jsonwebtoken";
import { sql as sql2, eq as eq2 } from "drizzle-orm";
var JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  }
  return "insecure-dev-secret-CHANGE-ME";
})();
function requireAdminPermission(section, subsection, action) {
  return async (req, res, next) => {
    try {
      if (req.isAdmin) {
        return next();
      }
      if (req.adminTeamMember) {
        const { roleId } = req.adminTeamMember;
        const actionColumn = action === "create" ? "can_create" : action === "read" ? "can_read" : action === "update" ? "can_update" : "can_delete";
        const permResult = await db.execute(sql2`
          SELECT ${sql2.raw(actionColumn)} as has_permission
          FROM admin_team_permissions
          WHERE role_id = ${roleId}
            AND section = ${section}
            AND subsection = ${subsection}
        `);
        if (permResult.rows.length > 0 && permResult.rows[0].has_permission === true) {
          return next();
        }
        return res.status(403).json({
          error: "Permission denied",
          details: `Required permission: ${section}.${subsection}.${action}`
        });
      }
      return res.status(401).json({ error: "Authentication required" });
    } catch (error) {
      console.error("[Permission Check] Error:", error);
      return res.status(500).json({ error: "Permission check failed" });
    }
  };
}

// plugins/custom-voice-engine/routes/admin-settings.routes.ts
function createAdminSettingsRouter() {
  const router = Router();
  (async () => {
    try {
      await db.execute(sql3`DROP TABLE IF EXISTS ve_sip_gateways CASCADE;`);
      console.log("[VE Admin] Deleted old ve_sip_gateways table");
    } catch (err) {
      console.error("[VE Admin] Failed to drop ve_sip_gateways table:", err.message);
    }
  })();
  router.get("/", requireAdminPermission("settings", "system_settings", "read"), async (_req, res) => {
    try {
      const result = await db.execute(
        sql3`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({
        success: true,
        data: {
          nodes: result.rows,
          totalNodes: result.rows.length,
          onlineNodes: result.rows.filter((n) => n.status === "online").length
        }
      });
    } catch (err) {
      console.error("[VE Admin] Error fetching settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  });
  router.get("/nodes", requireAdminPermission("settings", "system_settings", "read"), async (_req, res) => {
    try {
      const result = await db.execute(
        sql3`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/nodes", requireAdminPermission("settings", "system_settings", "create"), async (req, res) => {
    try {
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      if (!name || !eslHost || !eslPort || !sipHost || !sipPort || !wsPort) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const result = await db.execute(sql3`
        INSERT INTO ve_freeswitch_nodes (name, esl_host, esl_port, esl_password, sip_host, sip_port, ws_port, max_calls, status)
        VALUES (${name}, ${eslHost}, ${eslPort}, ${eslPassword || "ClueCon"}, ${sipHost}, ${sipPort}, ${wsPort}, ${maxCalls || 100}, ${status || "offline"})
        RETURNING *
      `);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/nodes/:id", requireAdminPermission("settings", "system_settings", "update"), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      const result = await db.execute(sql3`
        UPDATE ve_freeswitch_nodes SET
          name = COALESCE(${name !== void 0 ? name : null}, name),
          esl_host = COALESCE(${eslHost !== void 0 ? eslHost : null}, esl_host),
          esl_port = COALESCE(${eslPort !== void 0 ? eslPort : null}, esl_port),
          esl_password = COALESCE(${eslPassword !== void 0 ? eslPassword : null}, esl_password),
          sip_host = COALESCE(${sipHost !== void 0 ? sipHost : null}, sip_host),
          sip_port = COALESCE(${sipPort !== void 0 ? sipPort : null}, sip_port),
          ws_port = COALESCE(${wsPort !== void 0 ? wsPort : null}, ws_port),
          max_calls = COALESCE(${maxCalls !== void 0 ? maxCalls : null}, max_calls),
          status = COALESCE(${status !== void 0 ? status : null}, status),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Node not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/nodes/:id", requireAdminPermission("settings", "system_settings", "delete"), async (req, res) => {
    try {
      const { id } = req.params;
      await db.execute(sql3`DELETE FROM ve_freeswitch_nodes WHERE id = ${id}`);
      res.json({ success: true, message: "Node deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/admin-provider-keys.routes.ts
init_db();
init_schema();
import { Router as Router2 } from "express";
import { eq as eq4, inArray } from "drizzle-orm";
var SETTINGS_KEYS = {
  // Active provider selections
  sttActiveProvider: "ve_stt_active_provider",
  llmActiveProvider: "ve_llm_active_provider",
  ttsActiveProvider: "ve_tts_active_provider",
  // Allowed LLMs array (JSON array of strings)
  llmAllowedModels: "ve_llm_allowed_models",
  // Allowed providers arrays (JSON array of strings)
  sttAllowedProviders: "ve_stt_allowed_providers",
  ttsAllowedProviders: "ve_tts_allowed_providers",
  // API keys
  deepgramApiKey: "ve_deepgram_api_key",
  sarvamApiKey: "ve_sarvam_api_key",
  openrouterApiKey: "ve_openrouter_api_key",
  // Models (per-provider, so switching providers doesn't lose the other's selection)
  sttDeepgramModel: "ve_stt_deepgram_model",
  sttDeepgramAllowedModels: "ve_stt_deepgram_allowed_models",
  sttSarvamModel: "ve_stt_sarvam_model",
  sttSarvamAllowedModels: "ve_stt_sarvam_allowed_models",
  llmDefaultModel: "ve_llm_default_model",
  ttsDeepgramModel: "ve_tts_deepgram_model",
  ttsDeepgramAllowedModels: "ve_tts_deepgram_allowed_models",
  ttsSarvamModel: "ve_tts_sarvam_model",
  ttsSarvamAllowedModels: "ve_tts_sarvam_allowed_models",
  ttsSarvamSpeaker: "ve_tts_sarvam_speaker",
  // FreeSWITCH
  freeswitchEslHost: "ve_freeswitch_esl_host",
  freeswitchEslPort: "ve_freeswitch_esl_port",
  freeswitchEslPassword: "ve_freeswitch_esl_password",
  // Plugin enabled
  pluginEnabled: "ve_plugin_enabled"
};
function maskKey(key) {
  if (!key) return "";
  if (key.length <= 4) return "****";
  return "\u2022".repeat(Math.min(key.length - 4, 20)) + key.slice(-4);
}
function extractValue(val) {
  if (val === null || val === void 0) return null;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) return val;
  return val;
}
function createAdminProviderKeysRouter() {
  const router = Router2();
  router.get("/", requireAdminPermission("settings", "system_settings", "read"), async (_req, res) => {
    try {
      const allKeys = Object.values(SETTINGS_KEYS);
      const results = await db.select().from(globalSettings).where(inArray(globalSettings.key, allKeys));
      const settingsMap = {};
      for (const row of results) {
        settingsMap[row.key] = extractValue(row.value);
      }
      const parseAllowedArray = (key, defaultArray) => {
        const val = settingsMap[key];
        if (!val) return defaultArray;
        if (Array.isArray(val)) return val;
        if (typeof val === "string") {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
            return [parsed];
          } catch (e) {
            return [val];
          }
        }
        return defaultArray;
      };
      const response = {
        stt: {
          activeProvider: settingsMap[SETTINGS_KEYS.sttActiveProvider] || "deepgram",
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.sttAllowedProviders, ["deepgram"]),
          defaultModel: settingsMap[SETTINGS_KEYS.sttActiveProvider] === "sarvam" ? settingsMap[SETTINGS_KEYS.sttSarvamModel] || "saaras:v3" : settingsMap[SETTINGS_KEYS.sttDeepgramModel] || "nova-2",
          deepgramModel: settingsMap[SETTINGS_KEYS.sttDeepgramModel] || "nova-2",
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttDeepgramAllowedModels, ["nova-2", "nova-2-phonecall"]),
          sarvamModel: settingsMap[SETTINGS_KEYS.sttSarvamModel] || "saaras:v3",
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttSarvamAllowedModels, ["saaras:v3"]),
          providers: {
            deepgram: {
              name: "Deepgram",
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey])
            },
            sarvam: {
              name: "Sarvam AI",
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey])
            }
          }
        },
        llm: {
          activeProvider: settingsMap[SETTINGS_KEYS.llmActiveProvider] || "openrouter",
          defaultModel: settingsMap[SETTINGS_KEYS.llmDefaultModel] || "openai/gpt-4o-mini",
          allowedModels: parseAllowedArray(SETTINGS_KEYS.llmAllowedModels, ["openai/gpt-4o-mini", "anthropic/claude-3-haiku", "google/gemini-flash-1.5"]),
          providers: {
            openrouter: {
              name: "OpenRouter",
              hasKey: !!settingsMap[SETTINGS_KEYS.openrouterApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openrouterApiKey])
            }
          }
        },
        tts: {
          activeProvider: settingsMap[SETTINGS_KEYS.ttsActiveProvider] || "deepgram",
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.ttsAllowedProviders, ["deepgram"]),
          defaultModel: settingsMap[SETTINGS_KEYS.ttsActiveProvider] === "sarvam" ? settingsMap[SETTINGS_KEYS.ttsSarvamModel] || "bulbul:v3" : settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || "aura-asteria-en",
          deepgramModel: settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || "aura-asteria-en",
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsDeepgramAllowedModels, ["aura-asteria-en", "aura-luna-en"]),
          sarvamModel: settingsMap[SETTINGS_KEYS.ttsSarvamModel] || "bulbul:v3",
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsSarvamAllowedModels, ["bulbul:v3", "bulbul:v2"]),
          sarvamSpeaker: settingsMap[SETTINGS_KEYS.ttsSarvamSpeaker] || "neha",
          providers: {
            deepgram: {
              name: "Deepgram",
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey])
            },
            sarvam: {
              name: "Sarvam AI",
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey])
            }
          }
        },
        freeswitch: {
          eslHost: settingsMap[SETTINGS_KEYS.freeswitchEslHost] || "127.0.0.1",
          eslPort: settingsMap[SETTINGS_KEYS.freeswitchEslPort] || 8021,
          eslPassword: settingsMap[SETTINGS_KEYS.freeswitchEslPassword] ? "\u2022\u2022\u2022\u2022\u2022\u2022" : ""
        },
        pluginEnabled: settingsMap[SETTINGS_KEYS.pluginEnabled] ?? true
      };
      res.json({ success: true, data: response });
    } catch (err) {
      console.error("[VE Admin Keys] Error fetching provider keys:", err);
      res.status(500).json({ success: false, error: `Failed to fetch provider settings: ${err.message}`, stack: err.stack });
    }
  });
  router.put("/", requireAdminPermission("settings", "system_settings", "update"), async (req, res) => {
    try {
      const {
        sttActiveProvider,
        llmActiveProvider,
        ttsActiveProvider,
        sttAllowedProviders,
        ttsAllowedProviders,
        deepgramApiKey,
        sarvamApiKey,
        openrouterApiKey,
        sttDeepgramModel,
        sttDeepgramAllowedModels,
        sttSarvamModel,
        sttSarvamAllowedModels,
        ttsDeepgramModel,
        ttsDeepgramAllowedModels,
        ttsSarvamModel,
        ttsSarvamAllowedModels,
        ttsSarvamSpeaker,
        llmDefaultModel,
        llmAllowedModels,
        freeswitchEslHost,
        freeswitchEslPort,
        freeswitchEslPassword,
        pluginEnabled
      } = req.body;
      const updates = [];
      if (sttActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttActiveProvider,
          value: sttActiveProvider,
          description: "Voice Engine: Active STT provider"
        });
      }
      if (sttAllowedProviders !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttAllowedProviders,
          value: JSON.stringify(sttAllowedProviders),
          description: "Voice Engine: Allowed STT providers array"
        });
      }
      if (llmActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmActiveProvider,
          value: llmActiveProvider,
          description: "Voice Engine: Active LLM provider"
        });
      }
      if (ttsActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsActiveProvider,
          value: ttsActiveProvider,
          description: "Voice Engine: Active TTS provider"
        });
      }
      if (ttsAllowedProviders !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsAllowedProviders,
          value: JSON.stringify(ttsAllowedProviders),
          description: "Voice Engine: Allowed TTS providers array"
        });
      }
      if (deepgramApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.deepgramApiKey,
          value: deepgramApiKey || "",
          description: "Voice Engine: Deepgram API key"
        });
      }
      if (sarvamApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sarvamApiKey,
          value: sarvamApiKey || "",
          description: "Voice Engine: Sarvam AI API key"
        });
      }
      if (openrouterApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.openrouterApiKey,
          value: openrouterApiKey || "",
          description: "Voice Engine: OpenRouter API key"
        });
      }
      if (sttDeepgramModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramModel,
          value: sttDeepgramModel,
          description: "Voice Engine: STT Deepgram model"
        });
      }
      if (sttDeepgramAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramAllowedModels,
          value: JSON.stringify(sttDeepgramAllowedModels),
          description: "Voice Engine: Allowed STT Deepgram models"
        });
      }
      if (sttSarvamModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamModel,
          value: sttSarvamModel,
          description: "Voice Engine: STT Sarvam model"
        });
      }
      if (sttSarvamAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamAllowedModels,
          value: JSON.stringify(sttSarvamAllowedModels),
          description: "Voice Engine: Allowed STT Sarvam models"
        });
      }
      if (ttsDeepgramModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramModel,
          value: ttsDeepgramModel,
          description: "Voice Engine: TTS Deepgram model"
        });
      }
      if (ttsDeepgramAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramAllowedModels,
          value: JSON.stringify(ttsDeepgramAllowedModels),
          description: "Voice Engine: Allowed TTS Deepgram models"
        });
      }
      if (ttsSarvamModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamModel,
          value: ttsSarvamModel,
          description: "Voice Engine: TTS Sarvam model"
        });
      }
      if (ttsSarvamAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamAllowedModels,
          value: JSON.stringify(ttsSarvamAllowedModels),
          description: "Voice Engine: Allowed TTS Sarvam models"
        });
      }
      if (ttsSarvamSpeaker !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamSpeaker,
          value: ttsSarvamSpeaker,
          description: "Voice Engine: Default TTS speaker/voice for Sarvam AI"
        });
      }
      if (llmDefaultModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmDefaultModel,
          value: llmDefaultModel,
          description: "Voice Engine: Default LLM model"
        });
      }
      if (llmAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmAllowedModels,
          value: llmAllowedModels,
          description: "Voice Engine: Allowed LLM models array"
        });
      }
      if (freeswitchEslHost !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslHost,
          value: freeswitchEslHost,
          description: "Voice Engine: FreeSWITCH ESL host"
        });
      }
      if (freeswitchEslPort !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPort,
          value: freeswitchEslPort,
          description: "Voice Engine: FreeSWITCH ESL port"
        });
      }
      if (freeswitchEslPassword !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPassword,
          value: freeswitchEslPassword || "",
          description: "Voice Engine: FreeSWITCH ESL password"
        });
      }
      if (pluginEnabled !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.pluginEnabled,
          value: pluginEnabled,
          description: "Voice Engine: Plugin enabled state"
        });
      }
      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: "No settings to update" });
      }
      for (const update of updates) {
        await db.insert(globalSettings).values({
          key: update.key,
          value: update.value,
          description: update.description
        }).onConflictDoUpdate({
          target: globalSettings.key,
          set: { value: update.value }
        });
      }
      res.json({
        success: true,
        message: `Updated ${updates.length} setting(s)`,
        updatedKeys: updates.map((u) => u.key)
      });
    } catch (err) {
      console.error("[VE Admin Keys] Error updating provider keys:", err.message);
      res.status(500).json({ success: false, error: "Failed to update provider settings" });
    }
  });
  router.get("/openrouter-models", requireAdminPermission("settings", "system_settings", "read"), async (_req, res) => {
    try {
      const [setting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, SETTINGS_KEYS.openrouterApiKey)).limit(1);
      const apiKey = setting?.value;
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }
      const response = await fetch("https://openrouter.ai/api/v1/models", { headers });
      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          error: `OpenRouter returned ${response.status}`
        });
      }
      const json = await response.json();
      const sorted = (json.data || []).sort((a, b) => a.name.localeCompare(b.name));
      res.json({ success: true, data: sorted });
    } catch (err) {
      console.error("[VE Admin Keys] Error fetching OpenRouter models:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch OpenRouter models" });
    }
  });
  router.post("/test/:provider", requireAdminPermission("settings", "system_settings", "read"), async (req, res) => {
    try {
      const { provider } = req.params;
      let keyName;
      switch (provider) {
        case "deepgram":
          keyName = SETTINGS_KEYS.deepgramApiKey;
          break;
        case "sarvam":
          keyName = SETTINGS_KEYS.sarvamApiKey;
          break;
        case "openrouter":
          keyName = SETTINGS_KEYS.openrouterApiKey;
          break;
        default:
          return res.status(400).json({ success: false, error: `Unknown provider: ${provider}` });
      }
      const [setting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, keyName)).limit(1);
      const apiKey = setting?.value;
      if (!apiKey) {
        return res.json({
          success: true,
          data: {
            provider,
            connected: false,
            error: "No API key configured"
          }
        });
      }
      let connected = false;
      let details = "";
      try {
        if (provider === "deepgram") {
          const response = await fetch("https://api.deepgram.com/v1/projects", {
            headers: { Authorization: `Token ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to Deepgram" : `HTTP ${response.status}`;
        } else if (provider === "sarvam") {
          connected = apiKey.length > 10;
          details = connected ? "API key format valid" : "API key too short";
        } else if (provider === "openrouter") {
          const response = await fetch("https://openrouter.ai/api/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to OpenRouter" : `HTTP ${response.status}`;
        }
      } catch (fetchErr) {
        details = `Connection failed: ${fetchErr.message}`;
      }
      res.json({
        success: true,
        data: { provider, connected, details }
      });
    } catch (err) {
      console.error("[VE Admin Keys] Error testing provider:", err.message);
      res.status(500).json({ success: false, error: "Failed to test provider" });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/admin-storage.routes.ts
init_db();
init_schema();
import { Router as Router3 } from "express";
import { inArray as inArray2 } from "drizzle-orm";
var STORAGE_KEYS = {
  provider: "ve_recording_storage",
  retentionDays: "ve_recording_retention_days",
  bucket: "ve_recording_s3_bucket",
  region: "ve_recording_s3_region",
  accessKey: "ve_recording_s3_access_key",
  secretKey: "ve_recording_s3_secret_key",
  endpoint: "ve_recording_s3_endpoint",
  gcsBucket: "ve_recording_gcs_bucket",
  gcsProjectId: "ve_recording_gcs_project_id",
  gcsCredentials: "ve_recording_gcs_credentials"
};
function maskKey2(key) {
  if (!key) return "";
  return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
}
function isMasked(value) {
  if (typeof value !== "string") return false;
  return value.includes("\u2022\u2022\u2022\u2022") || value === "";
}
function createAdminStorageRouter() {
  const router = Router3();
  router.get("/", requireAdminPermission("settings", "system_settings", "read"), async (_req, res) => {
    try {
      const keys = Object.values(STORAGE_KEYS);
      const results = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
      const settingsMap = {};
      for (const row of results) {
        settingsMap[row.key] = row.value;
      }
      const response = {
        provider: settingsMap[STORAGE_KEYS.provider] || "local",
        retentionDays: Number(settingsMap[STORAGE_KEYS.retentionDays] ?? 30),
        bucket: settingsMap[STORAGE_KEYS.bucket] || "",
        region: settingsMap[STORAGE_KEYS.region] || "",
        accessKey: settingsMap[STORAGE_KEYS.accessKey] || "",
        secretKey: settingsMap[STORAGE_KEYS.secretKey] ? maskKey2(settingsMap[STORAGE_KEYS.secretKey]) : "",
        endpoint: settingsMap[STORAGE_KEYS.endpoint] || "",
        gcsBucket: settingsMap[STORAGE_KEYS.gcsBucket] || "",
        gcsProjectId: settingsMap[STORAGE_KEYS.gcsProjectId] || "",
        gcsCredentials: settingsMap[STORAGE_KEYS.gcsCredentials] ? maskKey2(settingsMap[STORAGE_KEYS.gcsCredentials]) : ""
      };
      res.json({ success: true, data: response });
    } catch (err) {
      console.error("[VE Admin Storage] Error fetching settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch storage settings" });
    }
  });
  router.post("/", requireAdminPermission("settings", "system_settings", "update"), async (req, res) => {
    try {
      const {
        provider,
        retentionDays,
        bucket,
        region,
        accessKey,
        secretKey,
        endpoint,
        gcsBucket,
        gcsProjectId,
        gcsCredentials
      } = req.body;
      const keys = Object.values(STORAGE_KEYS);
      const existingResults = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
      const existingMap = {};
      for (const row of existingResults) {
        existingMap[row.key] = row.value;
      }
      const updates = [];
      updates.push({
        key: STORAGE_KEYS.provider,
        value: provider || "local",
        description: "Voice Engine: Recording storage provider"
      });
      updates.push({
        key: STORAGE_KEYS.retentionDays,
        value: retentionDays !== void 0 ? Number(retentionDays) : 30,
        description: "Voice Engine: Recording retention days"
      });
      updates.push({
        key: STORAGE_KEYS.bucket,
        value: bucket || "",
        description: "Voice Engine: S3 bucket name"
      });
      updates.push({
        key: STORAGE_KEYS.region,
        value: region || "",
        description: "Voice Engine: S3 region"
      });
      updates.push({
        key: STORAGE_KEYS.accessKey,
        value: accessKey || "",
        description: "Voice Engine: S3 access key ID"
      });
      const resolvedSecretKey = isMasked(secretKey) ? existingMap[STORAGE_KEYS.secretKey] || "" : secretKey || "";
      updates.push({
        key: STORAGE_KEYS.secretKey,
        value: resolvedSecretKey,
        description: "Voice Engine: S3 secret access key"
      });
      updates.push({
        key: STORAGE_KEYS.endpoint,
        value: endpoint || "",
        description: "Voice Engine: S3-compatible custom endpoint"
      });
      updates.push({
        key: STORAGE_KEYS.gcsBucket,
        value: gcsBucket || "",
        description: "Voice Engine: GCS bucket name"
      });
      updates.push({
        key: STORAGE_KEYS.gcsProjectId,
        value: gcsProjectId || "",
        description: "Voice Engine: GCS project ID"
      });
      const resolvedGcsCredentials = isMasked(gcsCredentials) ? existingMap[STORAGE_KEYS.gcsCredentials] || "" : gcsCredentials || "";
      updates.push({
        key: STORAGE_KEYS.gcsCredentials,
        value: resolvedGcsCredentials,
        description: "Voice Engine: GCS service account credentials JSON"
      });
      for (const update of updates) {
        await db.insert(globalSettings).values({
          key: update.key,
          value: update.value,
          description: update.description
        }).onConflictDoUpdate({
          target: globalSettings.key,
          set: { value: update.value }
        });
      }
      res.json({ success: true, message: "Recording storage settings saved successfully" });
    } catch (err) {
      console.error("[VE Admin Storage] Error saving settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to save storage settings" });
    }
  });
  router.post("/activate", requireAdminPermission("settings", "system_settings", "update"), async (req, res) => {
    const { provider } = req.body;
    if (!["local", "s3", "gcs", "do_spaces", "wasabi"].includes(provider)) {
      return res.status(400).json({ success: false, error: "Invalid provider" });
    }
    await db.insert(globalSettings).values({ key: "ve_storage_active_provider", value: provider, description: "Active storage provider" }).onConflictDoUpdate({ target: globalSettings.key, set: { value: provider } });
    res.json({ success: true, activeProvider: provider });
  });
  router.post("/test", requireAdminPermission("settings", "system_settings", "read"), async (req, res) => {
    try {
      const {
        provider,
        bucket,
        region,
        accessKey,
        secretKey,
        endpoint,
        gcsBucket,
        gcsProjectId,
        gcsCredentials
      } = req.body;
      if (provider === "local") {
        return res.json({ success: true, message: "Local storage does not require connection test" });
      }
      let finalSecretKey = secretKey;
      let finalGcsCredentials = gcsCredentials;
      if (isMasked(secretKey) || isMasked(gcsCredentials)) {
        const keys = [STORAGE_KEYS.secretKey, STORAGE_KEYS.gcsCredentials];
        const results = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
        const existingMap = {};
        for (const row of results) {
          existingMap[row.key] = row.value;
        }
        if (isMasked(secretKey)) {
          finalSecretKey = existingMap[STORAGE_KEYS.secretKey] || "";
        }
        if (isMasked(gcsCredentials)) {
          finalGcsCredentials = existingMap[STORAGE_KEYS.gcsCredentials] || "";
        }
      }
      if (["s3", "do_spaces", "wasabi"].includes(provider)) {
        if (!bucket || !region || !accessKey || !finalSecretKey) {
          return res.status(400).json({ success: false, message: "Bucket, Region, Access Key, and Secret Key are required" });
        }
        try {
          const { S3Client, ListObjectsV2Command } = await import("@aws-sdk/client-s3");
          const s3Config = {
            region,
            credentials: {
              accessKeyId: accessKey,
              secretAccessKey: finalSecretKey
            }
          };
          if (endpoint) {
            s3Config.endpoint = endpoint;
          } else if (provider === "do_spaces") {
            s3Config.endpoint = `https://${region}.digitaloceanspaces.com`;
          } else if (provider === "wasabi") {
            s3Config.endpoint = `https://s3.${region}.wasabisys.com`;
          }
          const client = new S3Client(s3Config);
          await client.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 }));
          return res.json({ success: true, message: `Successfully connected to ${provider} bucket "${bucket}"` });
        } catch (s3Err) {
          if (s3Err.code === "MODULE_NOT_FOUND" || s3Err.message?.includes("Cannot find module")) {
            console.warn("[VE Admin Storage] S3 client module not found, using HTTP check fallback");
            const host = endpoint ? new URL(endpoint).host : provider === "do_spaces" ? `${bucket}.${region}.digitaloceanspaces.com` : provider === "wasabi" ? `${bucket}.s3.${region}.wasabisys.com` : `${bucket}.s3.${region}.amazonaws.com`;
            try {
              const dns2 = await import("dns").then((m) => m.promises);
              await dns2.lookup(host);
              return res.json({
                success: true,
                message: `Credentials configured. Host "${host}" is resolvable (AWS SDK is not installed on the server to perform full bucket API test).`
              });
            } catch (dnsErr) {
              return res.json({
                success: false,
                message: `Failed to resolve storage host "${host}": ${dnsErr.message}`
              });
            }
          }
          return res.json({ success: false, message: `Connection failed: ${s3Err.message}` });
        }
      }
      if (provider === "gcs") {
        if (!gcsBucket || !gcsProjectId || !finalGcsCredentials) {
          return res.status(400).json({ success: false, message: "Bucket Name, Project ID, and Service Account JSON are required" });
        }
        try {
          JSON.parse(finalGcsCredentials);
        } catch {
          return res.status(400).json({ success: false, message: "Invalid Service Account JSON format" });
        }
        try {
          const { Storage } = await import("@google-cloud/storage");
          const credentials = JSON.parse(finalGcsCredentials);
          const storageClient = new Storage({
            projectId: gcsProjectId,
            credentials
          });
          await storageClient.bucket(gcsBucket).exists();
          return res.json({ success: true, message: `Successfully authenticated GCS bucket "${gcsBucket}"` });
        } catch (gcsErr) {
          if (gcsErr.code === "MODULE_NOT_FOUND" || gcsErr.message?.includes("Cannot find module")) {
            return res.json({
              success: true,
              message: "GCS credentials format validated (Google Cloud Storage SDK not installed on the server for full bucket API check)."
            });
          }
          return res.json({ success: false, message: `GCS Auth failed: ${gcsErr.message}` });
        }
      }
      res.status(400).json({ success: false, message: `Unsupported provider: ${provider}` });
    } catch (err) {
      console.error("[VE Admin Storage] Connection test error:", err.message);
      res.status(500).json({ success: false, message: `Test failed: ${err.message}` });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/tenant-config.routes.ts
init_db();
import { Router as Router4 } from "express";
import { sql as sql6 } from "drizzle-orm";
function createTenantConfigRouter() {
  const router = Router4();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const result = await db.execute(
        sql6`SELECT * FROM ve_provider_configs WHERE user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.json({
          success: true,
          data: {
            sttProvider: "deepgram",
            llmProvider: "openrouter",
            llmModel: "openai/gpt-4o-mini",
            ttsProvider: "deepgram",
            ttsVoice: "aura-asteria-en",
            maxConcurrentCalls: 10,
            recordingEnabled: true,
            memoryEnabled: true,
            cacheEnabled: true,
            isDefault: true
          }
        });
      }
      const config = result.rows[0];
      if (config.stt_api_key) config.stt_api_key = "***" + config.stt_api_key.slice(-4);
      if (config.llm_api_key) config.llm_api_key = "***" + config.llm_api_key.slice(-4);
      if (config.tts_api_key) config.tts_api_key = "***" + config.tts_api_key.slice(-4);
      res.json({ success: true, data: config });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const {
        sttProvider,
        sttApiKey,
        llmProvider,
        llmApiKey,
        llmModel,
        ttsProvider,
        ttsApiKey,
        ttsVoice,
        maxConcurrentCalls,
        recordingEnabled,
        recordingStorage,
        recordingRetentionDays,
        memoryEnabled,
        cacheEnabled,
        cacheTtlSeconds
      } = req.body;
      const result = await db.execute(sql6`
        INSERT INTO ve_provider_configs (user_id, stt_provider, stt_api_key, llm_provider, llm_api_key, llm_model, tts_provider, tts_api_key, tts_voice, max_concurrent_calls, recording_enabled, recording_storage, recording_retention_days, memory_enabled, cache_enabled, cache_ttl_seconds)
        VALUES (${userId}, ${sttProvider || "deepgram"}, ${sttApiKey || null}, ${llmProvider || "openrouter"}, ${llmApiKey || null}, ${llmModel || "openai/gpt-4o-mini"}, ${ttsProvider || "deepgram"}, ${ttsApiKey || null}, ${ttsVoice || "aura-asteria-en"}, ${maxConcurrentCalls || 10}, ${recordingEnabled ?? true}, ${recordingStorage || "local"}, ${recordingRetentionDays || 30}, ${memoryEnabled ?? true}, ${cacheEnabled ?? true}, ${cacheTtlSeconds || 3600})
        ON CONFLICT (user_id) DO UPDATE SET
          stt_provider = COALESCE(EXCLUDED.stt_provider, ve_provider_configs.stt_provider),
          stt_api_key = CASE WHEN ${sttApiKey || null} IS NOT NULL THEN ${sttApiKey || null} ELSE ve_provider_configs.stt_api_key END,
          llm_provider = COALESCE(EXCLUDED.llm_provider, ve_provider_configs.llm_provider),
          llm_api_key = CASE WHEN ${llmApiKey || null} IS NOT NULL THEN ${llmApiKey || null} ELSE ve_provider_configs.llm_api_key END,
          llm_model = COALESCE(EXCLUDED.llm_model, ve_provider_configs.llm_model),
          tts_provider = COALESCE(EXCLUDED.tts_provider, ve_provider_configs.tts_provider),
          tts_api_key = CASE WHEN ${ttsApiKey || null} IS NOT NULL THEN ${ttsApiKey || null} ELSE ve_provider_configs.tts_api_key END,
          tts_voice = COALESCE(EXCLUDED.tts_voice, ve_provider_configs.tts_voice),
          max_concurrent_calls = COALESCE(EXCLUDED.max_concurrent_calls, ve_provider_configs.max_concurrent_calls),
          recording_enabled = COALESCE(EXCLUDED.recording_enabled, ve_provider_configs.recording_enabled),
          recording_storage = COALESCE(EXCLUDED.recording_storage, ve_provider_configs.recording_storage),
          recording_retention_days = COALESCE(EXCLUDED.recording_retention_days, ve_provider_configs.recording_retention_days),
          memory_enabled = COALESCE(EXCLUDED.memory_enabled, ve_provider_configs.memory_enabled),
          cache_enabled = COALESCE(EXCLUDED.cache_enabled, ve_provider_configs.cache_enabled),
          cache_ttl_seconds = COALESCE(EXCLUDED.cache_ttl_seconds, ve_provider_configs.cache_ttl_seconds),
          updated_at = NOW()
        RETURNING *
      `);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/calls.routes.ts
init_db();
import { Router as Router5 } from "express";
import { sql as sql7 } from "drizzle-orm";
function createCallsRouter() {
  const router = Router5();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;
      const direction = req.query.direction;
      const status = req.query.status;
      let query = sql7`SELECT * FROM ve_sessions WHERE user_id = ${userId}`;
      if (direction) query = sql7`${query} AND direction = ${direction}`;
      if (status) query = sql7`${query} AND status = ${status}`;
      query = sql7`${query} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      const result = await db.execute(query);
      const countResult = await db.execute(
        sql7`SELECT COUNT(*)::int as total FROM ve_sessions WHERE user_id = ${userId}`
      );
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page,
          limit,
          total: countResult.rows[0]?.total || 0
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const result = await db.execute(
        sql7`SELECT * FROM ve_sessions WHERE id = ${id} AND user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/outbound", async (req, res) => {
    try {
      const userId = req.userId;
      const { agentId, toNumber, fromNumber } = req.body;
      if (!agentId || !toNumber) {
        return res.status(400).json({ success: false, error: "agentId and toNumber are required" });
      }
      const agentResult = await db.execute(
        sql7`SELECT * FROM ve_voice_agents WHERE id = ${agentId} AND user_id = ${userId} AND is_active = true LIMIT 1`
      );
      if (agentResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Agent not found or inactive" });
      }
      const sessionResult = await db.execute(sql7`
        INSERT INTO ve_sessions (user_id, agent_id, to_number, from_number, direction, status)
        VALUES (${userId}, ${agentId}, ${toNumber}, ${fromNumber || null}, 'outbound', 'initializing')
        RETURNING *
      `);
      const session = sessionResult.rows[0];
      res.json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/:id/hangup", async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      await db.execute(sql7`
        UPDATE ve_sessions SET status = 'completed', ended_at = NOW(), end_reason = 'user_hangup', updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId} AND status IN ('initializing', 'active')
      `);
      res.json({ success: true, message: "Call ended" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/recordings.routes.ts
init_db();
import { Router as Router6 } from "express";
import { sql as sql8 } from "drizzle-orm";
function createRecordingsRouter() {
  const router = Router6();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;
      const result = await db.execute(sql8`
        SELECT r.*, s.from_number, s.to_number, s.direction, s.ai_summary
        FROM ve_call_recordings r
        LEFT JOIN ve_sessions s ON r.session_id = s.id
        WHERE r.user_id = ${userId} AND r.status = 'available'
        ORDER BY r.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(
        sql8`SELECT * FROM ve_call_recordings WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Recording not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      await db.execute(
        sql8`UPDATE ve_call_recordings SET status = 'deleted' WHERE id = ${req.params.id} AND user_id = ${userId}`
      );
      res.json({ success: true, message: "Recording deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/memory.routes.ts
init_db();
import { Router as Router7 } from "express";
import { sql as sql9 } from "drizzle-orm";
function createMemoryRouter() {
  const router = Router7();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = ((parseInt(req.query.page) || 1) - 1) * limit;
      const result = await db.execute(
        sql9`SELECT * FROM ve_customer_memory WHERE user_id = ${userId} ORDER BY last_interaction_at DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const memResult = await db.execute(
        sql9`SELECT * FROM ve_customer_memory WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`
      );
      if (memResult.rows.length === 0) return res.status(404).json({ success: false, error: "Not found" });
      const facts = await db.execute(sql9`SELECT * FROM ve_customer_facts WHERE memory_id = ${req.params.id} ORDER BY extracted_at DESC LIMIT 50`);
      const history = await db.execute(sql9`SELECT * FROM ve_conversation_memory WHERE memory_id = ${req.params.id} ORDER BY call_date DESC LIMIT 20`);
      res.json({ success: true, data: { ...memResult.rows[0], facts: facts.rows, callHistory: history.rows } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { customerName, customerEmail, customerCompany, language, timezone } = req.body;
      await db.execute(sql9`UPDATE ve_customer_memory SET customer_name = COALESCE(${customerName}, customer_name), customer_email = COALESCE(${customerEmail}, customer_email), customer_company = COALESCE(${customerCompany}, customer_company), language = COALESCE(${language}, language), timezone = COALESCE(${timezone}, timezone), updated_at = NOW() WHERE id = ${req.params.id} AND user_id = ${userId}`);
      res.json({ success: true, message: "Updated" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/analytics.routes.ts
init_db();
import { Router as Router8 } from "express";
import { sql as sql10 } from "drizzle-orm";
function createAnalyticsRouter() {
  const router = Router8();
  router.get("/dashboard", async (req, res) => {
    try {
      const userId = req.userId;
      const days = parseInt(req.query.days) || 30;
      const [calls3, usage, active] = await Promise.all([
        db.execute(sql10`SELECT COUNT(*)::int as total, COALESCE(AVG(duration_seconds), 0)::int as avg_duration, COALESCE(SUM(duration_seconds), 0)::int as total_duration, COUNT(CASE WHEN direction = 'inbound' THEN 1 END)::int as inbound, COUNT(CASE WHEN direction = 'outbound' THEN 1 END)::int as outbound FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days}`),
        db.execute(sql10`SELECT COALESCE(SUM(total_cost), 0) as total_cost, COALESCE(SUM(stt_cost), 0) as stt_cost, COALESCE(SUM(llm_cost), 0) as llm_cost, COALESCE(SUM(tts_cost), 0) as tts_cost, COALESCE(SUM(llm_prompt_tokens + llm_completion_tokens), 0)::int as total_tokens FROM ve_usage_tracking WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days}`),
        db.execute(sql10`SELECT COUNT(*)::int as count FROM ve_sessions WHERE user_id = ${userId} AND status = 'active'`)
      ]);
      res.json({
        success: true,
        data: {
          calls: calls3.rows[0],
          usage: usage.rows[0],
          activeCalls: active.rows[0]?.count || 0
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/calls-per-day", async (req, res) => {
    try {
      const userId = req.userId;
      const days = parseInt(req.query.days) || 30;
      const result = await db.execute(sql10`SELECT DATE(created_at) as date, COUNT(*)::int as calls, COALESCE(AVG(duration_seconds), 0)::int as avg_duration FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days} GROUP BY DATE(created_at) ORDER BY date ASC`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/provider-latency", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql10`SELECT stt_provider, llm_provider, tts_provider, COUNT(*)::int as calls, COALESCE(AVG(stt_duration_ms), 0)::int as avg_stt_ms, COALESCE(AVG(tts_duration_ms), 0)::int as avg_tts_ms FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '7 days' GROUP BY stt_provider, llm_provider, tts_provider`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/agents.routes.ts
init_db();
init_schema();
import { Router as Router9 } from "express";
import { sql as sql11, eq as eq6 } from "drizzle-orm";

// plugins/custom-voice-engine/services/providers/tts/deepgram-tts.provider.ts
import axios from "axios";

// plugins/custom-voice-engine/services/providers/tts/tts-provider.interface.ts
var BaseTtsProvider = class {
};

// plugins/custom-voice-engine/services/providers/http-agent.ts
import http from "http";
import https from "https";
var httpKeepAliveAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 3e4,
  maxSockets: 50,
  maxFreeSockets: 10
});
var httpsKeepAliveAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 3e4,
  maxSockets: 50,
  maxFreeSockets: 10
});
var keepAliveAxiosConfig = {
  httpAgent: httpKeepAliveAgent,
  httpsAgent: httpsKeepAliveAgent
};

// plugins/custom-voice-engine/services/providers/tts/deepgram-tts.provider.ts
var DEEPGRAM_TTS_URL = "https://api.deepgram.com/v1/speak";
var DeepgramTtsProvider = class extends BaseTtsProvider {
  name = "deepgram";
  async synthesize(text2, config) {
    let model = config.voice || config.deepgramModel || "aura-asteria-en";
    if (model === "aura-2") model = "aura-2-asteria-en";
    if (model === "aura") model = "aura-asteria-en";
    const params = new URLSearchParams({
      model
    });
    const encoding = config.outputFormat?.encoding || "linear16";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    if (encoding === "linear16") {
      params.set("encoding", "linear16");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    } else if (encoding === "mulaw") {
      params.set("encoding", "mulaw");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    } else if (encoding === "alaw") {
      params.set("encoding", "alaw");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    }
    const response = await axios.post(
      `${DEEPGRAM_TTS_URL}?${params.toString()}`,
      { text: text2 },
      {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Token ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        timeout: 3e4
      }
    );
    return Buffer.from(response.data);
  }
  async *synthesizeStream(text2, config) {
    let model = config.voice || config.deepgramModel || "aura-asteria-en";
    if (model === "aura-2") model = "aura-2-asteria-en";
    if (model === "aura") model = "aura-asteria-en";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    const encoding = config.outputFormat?.encoding || "linear16";
    const params = new URLSearchParams({
      model,
      encoding: encoding === "mulaw" ? "mulaw" : encoding === "alaw" ? "alaw" : "linear16",
      sample_rate: String(sampleRate),
      container: "none"
    });
    const response = await axios.post(
      `${DEEPGRAM_TTS_URL}?${params.toString()}`,
      { text: text2 },
      {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Token ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        responseType: "stream",
        timeout: 3e4
      }
    );
    const stream = response.data;
    const chunkSize = 640;
    let buffer = Buffer.alloc(0);
    for await (const data of stream) {
      const chunk = Buffer.isBuffer(data) ? data : Buffer.from(data);
      buffer = Buffer.concat([buffer, chunk]);
      while (buffer.length >= chunkSize) {
        yield buffer.subarray(0, chunkSize);
        buffer = buffer.subarray(chunkSize);
      }
    }
    if (buffer.length > 0) {
      yield buffer;
    }
  }
};

// plugins/custom-voice-engine/services/providers/tts/sarvam-tts.provider.ts
import axios2 from "axios";
var SARVAM_API_BASE = "https://api.sarvam.ai";
var SarvamTtsProvider = class extends BaseTtsProvider {
  name = "sarvam";
  async synthesize(text2, config) {
    const language = config.language || "en-IN";
    const speaker = config.sarvamSpeaker || config.voice || "meera";
    const model = config.sarvamModel || "bulbul:v3";
    console.log(`[TTS:Sarvam] Synthesizing: speaker="${speaker}" model="${model}" lang="${language}" sampleRate=${config.outputFormat?.sampleRate || 8e3}`);
    try {
      const response = await axios2.post(
        `${SARVAM_API_BASE}/text-to-speech`,
        {
          inputs: [text2],
          target_language_code: this.mapLanguage(language),
          speaker,
          model,
          pace: config.speed || 1.15,
          // Increased from 1.0 to 1.15 for a more natural speed
          speech_sample_rate: config.outputFormat?.sampleRate || 8e3,
          enable_preprocessing: true
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            "API-Subscription-Key": config.apiKey,
            "Content-Type": "application/json"
          },
          timeout: 3e4
        }
      );
      if (response.data?.audios?.[0]) {
        return Buffer.from(response.data.audios[0], "base64");
      }
      console.error(`[TTS:Sarvam] No audio in response:`, JSON.stringify(response.data));
      throw new Error(`Sarvam TTS returned no audio data (speaker="${speaker}", model="${model}")`);
    } catch (err) {
      if (err.response?.data) {
        console.error(`[TTS:Sarvam] API error response:`, JSON.stringify(err.response.data, null, 2));
      }
      console.error(`[TTS:Sarvam] Request body:`, JSON.stringify({
        inputs: [text2],
        target_language_code: this.mapLanguage(language),
        speaker,
        model,
        pitch: config.pitch || 0,
        pace: config.speed || 1.15,
        loudness: 1.5,
        speech_sample_rate: config.outputFormat?.sampleRate || 8e3,
        enable_preprocessing: true
      }));
      throw err;
    }
  }
  async *synthesizeStream(text2, config) {
    const audioBuffer = await this.synthesize(text2, config);
    const chunkSize = 640;
    for (let offset = 0; offset < audioBuffer.length; offset += chunkSize) {
      const end = Math.min(offset + chunkSize, audioBuffer.length);
      yield audioBuffer.subarray(offset, end);
    }
  }
  mapLanguage(lang) {
    if (lang.includes("-")) return lang;
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      bn: "bn-IN",
      pa: "pa-IN",
      or: "od-IN"
    };
    return langMap[lang] || "en-IN";
  }
};

// plugins/custom-voice-engine/services/providers/tts/tts-provider.factory.ts
var providerRegistry = {
  deepgram: DeepgramTtsProvider,
  sarvam: SarvamTtsProvider
};
var TtsProviderFactory = class {
  static create(provider) {
    const ProviderClass = providerRegistry[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown TTS provider: ${provider}. Available: ${Object.keys(providerRegistry).join(", ")}`);
    }
    return new ProviderClass();
  }
  static getAvailableProviders() {
    return Object.keys(providerRegistry);
  }
  static isAvailable(provider) {
    return provider in providerRegistry;
  }
  static register(name, providerClass) {
    providerRegistry[name] = providerClass;
    console.log(`[TTS Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/routes/agents.routes.ts
function formatPgArray(arr) {
  if (!arr || !arr.length) return null;
  return `{${arr.map((val) => `"${val.replace(/"/g, '\\"')}"`).join(",")}}`;
}
function createAgentsRouter() {
  const router = Router9();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql11`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} ORDER BY created_at DESC`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql11`SELECT * FROM ve_voice_agents WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`);
      if (result.rows.length === 0) return res.status(404).json({ success: false, error: "Agent not found" });
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const userId = req.userId;
      const { name, description, systemPrompt, firstMessage, language, llmModel, temperature, maxTokens, ttsVoice, ttsProvider, sttProvider, sttModel, ttsModel, interruptible, silenceTimeoutMs, maxDurationSeconds, endCallOnSilence, businessRules, knowledgeBaseIds, enabledTools, enableMemory, memoryRetentionDays, detectLanguageEnabled, appointmentBookingEnabled, endConversationEnabled, transferEnabled, transferPhoneNumber, messagingEmailEnabled, messagingWhatsappEnabled, messagingEmailTemplate, messagingWhatsappTemplate } = req.body;
      if (!name || !systemPrompt) return res.status(400).json({ success: false, error: "name and systemPrompt are required" });
      const result = await db.execute(sql11`
        INSERT INTO ve_voice_agents (
          user_id, name, description, system_prompt, first_message, language, llm_model, 
          temperature, max_tokens, tts_voice, tts_provider, stt_provider, stt_model, tts_model, interruptible, 
          silence_timeout_ms, max_duration_seconds, end_call_on_silence, business_rules, 
          knowledge_base_ids, enabled_tools, enable_memory, memory_retention_days, 
          detect_language_enabled, appointment_booking_enabled, end_conversation_enabled, 
          transfer_enabled, transfer_phone_number, messaging_email_enabled, 
          messaging_whatsapp_enabled, messaging_email_template, messaging_whatsapp_template
        )
        VALUES (
          ${userId}, ${name}, ${description || null}, ${systemPrompt}, ${firstMessage || "Hello! How can I help you today?"}, 
          ${language || "en"}, ${llmModel || "openai/gpt-4o-mini"}, ${temperature || 0.7}, ${maxTokens || 500}, 
          ${ttsVoice || "aura-asteria-en"}, ${ttsProvider || "deepgram"}, ${sttProvider || "deepgram"}, 
          ${sttModel || (sttProvider === "sarvam" ? "saaras:v3" : null)}, ${ttsModel || (ttsProvider === "sarvam" ? "bulbul:v3" : null)},
          ${interruptible ?? true}, ${silenceTimeoutMs || 5e3}, ${maxDurationSeconds || 600}, 
          ${endCallOnSilence ?? false}, ${JSON.stringify(businessRules || [])}, ${formatPgArray(knowledgeBaseIds)}, 
          ${formatPgArray(enabledTools)}, ${enableMemory ?? true}, ${memoryRetentionDays || 90}, 
          ${detectLanguageEnabled ?? false}, ${appointmentBookingEnabled ?? false}, ${endConversationEnabled ?? false}, 
          ${transferEnabled ?? false}, ${transferPhoneNumber || null}, ${messagingEmailEnabled ?? false}, 
          ${messagingWhatsappEnabled ?? false}, ${messagingEmailTemplate || null}, ${messagingWhatsappTemplate || null}
        )
        RETURNING *
      `);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { name, description, systemPrompt, firstMessage, language, llmModel, temperature, maxTokens, ttsVoice, ttsProvider, sttProvider, sttModel, ttsModel, interruptible, silenceTimeoutMs, maxDurationSeconds, endCallOnSilence, businessRules, knowledgeBaseIds, enableMemory, isActive, detectLanguageEnabled, appointmentBookingEnabled, endConversationEnabled, transferEnabled, transferPhoneNumber, messagingEmailEnabled, messagingWhatsappEnabled, messagingEmailTemplate, messagingWhatsappTemplate } = req.body;
      const effectiveSttModel = sttModel !== void 0 ? sttModel || (sttProvider === "sarvam" ? "saaras:v3" : sttModel) : void 0;
      const effectiveTtsModel = ttsModel !== void 0 ? ttsModel || (ttsProvider === "sarvam" ? "bulbul:v3" : ttsModel) : void 0;
      const result = await db.execute(sql11`
        UPDATE ve_voice_agents SET
          name = COALESCE(${name}, name), description = COALESCE(${description}, description),
          system_prompt = COALESCE(${systemPrompt}, system_prompt), first_message = COALESCE(${firstMessage}, first_message),
          language = COALESCE(${language}, language), llm_model = COALESCE(${llmModel}, llm_model),
          temperature = COALESCE(${temperature}, temperature), max_tokens = COALESCE(${maxTokens}, max_tokens),
          tts_voice = COALESCE(${ttsVoice}, tts_voice), tts_provider = COALESCE(${ttsProvider}, tts_provider),
          stt_provider = COALESCE(${sttProvider}, stt_provider), stt_model = COALESCE(${effectiveSttModel}, stt_model),
          tts_model = COALESCE(${effectiveTtsModel}, tts_model), interruptible = ${interruptible === void 0 ? sql11`interruptible` : interruptible},
          silence_timeout_ms = COALESCE(${silenceTimeoutMs}, silence_timeout_ms),
          max_duration_seconds = COALESCE(${maxDurationSeconds}, max_duration_seconds),
          end_call_on_silence = ${endCallOnSilence === void 0 ? sql11`end_call_on_silence` : endCallOnSilence},
          business_rules = COALESCE(${businessRules ? JSON.stringify(businessRules) : null}, business_rules),
          knowledge_base_ids = ${knowledgeBaseIds === void 0 ? sql11`knowledge_base_ids` : formatPgArray(knowledgeBaseIds)},
          enable_memory = ${enableMemory === void 0 ? sql11`enable_memory` : enableMemory},
          detect_language_enabled = ${detectLanguageEnabled === void 0 ? sql11`detect_language_enabled` : detectLanguageEnabled},
          appointment_booking_enabled = ${appointmentBookingEnabled === void 0 ? sql11`appointment_booking_enabled` : appointmentBookingEnabled},
          end_conversation_enabled = ${endConversationEnabled === void 0 ? sql11`end_conversation_enabled` : endConversationEnabled},
          transfer_enabled = ${transferEnabled === void 0 ? sql11`transfer_enabled` : transferEnabled},
          transfer_phone_number = COALESCE(${transferPhoneNumber}, transfer_phone_number),
          messaging_email_enabled = ${messagingEmailEnabled === void 0 ? sql11`messaging_email_enabled` : messagingEmailEnabled},
          messaging_whatsapp_enabled = ${messagingWhatsappEnabled === void 0 ? sql11`messaging_whatsapp_enabled` : messagingWhatsappEnabled},
          messaging_email_template = COALESCE(${messagingEmailTemplate}, messaging_email_template),
          messaging_whatsapp_template = COALESCE(${messagingWhatsappTemplate}, messaging_whatsapp_template),
          is_active = ${isActive === void 0 ? sql11`is_active` : isActive}, updated_at = NOW()
        WHERE id = ${req.params.id} AND user_id = ${userId} RETURNING *
      `);
      if (result.rows.length === 0) return res.status(404).json({ success: false, error: "Not found" });
      try {
        await db.execute(sql11`
          UPDATE agents 
          SET name = COALESCE(${name}, name),
              language = COALESCE(${language}, language),
              system_prompt = COALESCE(${systemPrompt}, system_prompt),
              first_message = COALESCE(${firstMessage}, first_message),
              llm_model = COALESCE(${llmModel}, llm_model),
              temperature = COALESCE(${temperature}, temperature)
          WHERE id = ${req.params.id} AND user_id = ${userId}
        `);
      } catch (syncErr) {
        console.error("Failed to sync updated custom voice agent to agents table:", syncErr);
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      await db.execute(sql11`DELETE FROM ve_voice_agents WHERE id = ${req.params.id} AND user_id = ${userId}`);
      res.json({ success: true, message: "Agent deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/preview", async (req, res) => {
    try {
      const { voiceId, text: text2, provider, language, ttsModel } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: "voiceId is required" });
      }
      const previewText = text2 || "Hello! This is a preview of how I'll sound. I can adjust my tone and style based on your preferences.";
      const isSarvam = provider === "sarvam";
      const providerName = isSarvam ? "sarvam" : "deepgram";
      const keyName = isSarvam ? "ve_sarvam_api_key" : "ve_deepgram_api_key";
      const [setting] = await db.select().from(globalSettings).where(eq6(globalSettings.key, keyName)).limit(1);
      const apiKey = setting?.value;
      if (!apiKey) {
        return res.status(400).json({ success: false, error: `API key for ${providerName} is not configured in settings.` });
      }
      const ttsProvider = TtsProviderFactory.create(providerName);
      const effectiveModel = isSarvam ? ttsModel || "bulbul:v3" : void 0;
      const config = isSarvam ? {
        apiKey,
        voice: voiceId,
        sarvamSpeaker: voiceId,
        sarvamModel: effectiveModel,
        language: language || "en-IN",
        outputFormat: {
          encoding: "linear16",
          sampleRate: 8e3
        },
        speed: 1
      } : {
        apiKey,
        voice: voiceId,
        language: language || "en",
        outputFormat: {
          encoding: "mp3",
          sampleRate: 24e3
        }
      };
      const audioBuffer = await ttsProvider.synthesize(previewText, config);
      res.setHeader("Content-Type", isSarvam ? "audio/wav" : "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length);
      res.setHeader("Cache-Control", "no-cache");
      res.send(audioBuffer);
    } catch (err) {
      console.error("[CVE Voice Preview] Error:", err.message);
      const detail = err.response?.data ? JSON.stringify(err.response.data) : null;
      res.status(500).json({ success: false, error: err.message || "Failed to generate voice preview", detail });
    }
  });
  return router;
}

// plugins/custom-voice-engine/services/audio-pipeline/ws-audio-server.ts
import { WebSocketServer, WebSocket as WebSocket2 } from "ws";
import fs2 from "fs";

// plugins/custom-voice-engine/services/audio-pipeline/audio-session.ts
init_db();
import { EventEmitter } from "events";
import * as fs from "fs";
import * as path from "path";
import { sql as sql17 } from "drizzle-orm";

// plugins/custom-voice-engine/services/tools/tool-executor.ts
init_db();
init_schema();
import { sql as sql16, eq as eq13 } from "drizzle-orm";
import { nanoid as nanoid2 } from "nanoid";

// server/services/google-calendar/google-calendar.service.ts
init_db();
init_schema();
import { eq as eq10 } from "drizzle-orm";

// server/services/google-sheets/google-sheets.service.ts
init_db();
init_schema();
init_storage();
import { eq as eq9 } from "drizzle-orm";
var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
var GOOGLE_SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
async function getGoogleCredentials() {
  try {
    const [dbClientId, dbClientSecret] = await Promise.all([
      storage.getGlobalSetting("google_client_id"),
      storage.getGlobalSetting("google_client_secret")
    ]);
    const clientId = dbClientId?.value?.trim() || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = dbClientSecret?.value?.trim() || process.env.GOOGLE_CLIENT_SECRET;
    if (clientId && clientSecret) return { clientId, clientSecret };
  } catch (err) {
    console.error("[GoogleSheets] Failed to read credentials from DB, falling back to env:", err.message);
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (clientId && clientSecret) return { clientId, clientSecret };
  }
  return null;
}
async function refreshAccessToken(userId, force = false) {
  const [cred] = await db.select().from(googleSheetsCredentials).where(eq9(googleSheetsCredentials.userId, userId)).limit(1);
  if (!cred) return null;
  const now = /* @__PURE__ */ new Date();
  if (!force && cred.tokenExpiry > now) {
    return cred.accessToken;
  }
  const creds = await getGoogleCredentials();
  if (!creds) {
    console.error("[GoogleSheets] Google OAuth credentials not configured (DB or env)");
    return null;
  }
  const { clientId, clientSecret } = creds;
  try {
    const resp = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: cred.refreshToken,
        grant_type: "refresh_token"
      })
    });
    if (!resp.ok) {
      console.error("[GoogleSheets] Token refresh failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    const newExpiry = new Date(Date.now() + data.expires_in * 1e3);
    await db.update(googleSheetsCredentials).set({
      accessToken: data.access_token,
      tokenExpiry: newExpiry,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq9(googleSheetsCredentials.userId, userId));
    return data.access_token;
  } catch (err) {
    console.error("[GoogleSheets] Token refresh error:", err.message);
    return null;
  }
}
async function readSheetRow1(accessToken, spreadsheetId, sheetName) {
  const range = encodeURIComponent(`${sheetName}!A1:Z1`);
  const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}`;
  try {
    const resp = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (resp.status === 401) return null;
    if (!resp.ok) {
      console.warn(`[GoogleSheets] readSheetRow1 failed (${resp.status}) for sheet ${spreadsheetId}`);
      return null;
    }
    const data = await resp.json();
    return data.values?.[0] ?? [];
  } catch (err) {
    console.warn("[GoogleSheets] readSheetRow1 error:", err.message);
    return null;
  }
}
async function ensureSheetHeaders(userId, spreadsheetId, sheetName, headerRow) {
  let token = await refreshAccessToken(userId);
  if (!token) {
    console.warn("[GoogleSheets] ensureSheetHeaders: no valid token for user:", userId);
    return false;
  }
  try {
    let existing = await readSheetRow1(token, spreadsheetId, sheetName);
    if (existing === null) {
      console.warn(`[GoogleSheets] readSheetRow1 returned null for sheet ${spreadsheetId} tab "${sheetName}" \u2014 forcing token refresh`);
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) return false;
      token = freshToken;
      existing = await readSheetRow1(freshToken, spreadsheetId, sheetName);
      if (existing === null) {
        console.error(`[GoogleSheets] readSheetRow1 still failed after token refresh for sheet ${spreadsheetId}`);
        return false;
      }
    }
    if (existing.length > 0) {
      console.log(`[GoogleSheets] Header row already exists in "${sheetName}" \u2014 skipping write`);
      return false;
    }
    const range = encodeURIComponent(`${sheetName}!A1`);
    const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}?valueInputOption=USER_ENTERED`;
    let resp = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [headerRow], range: `${sheetName}!A1` })
    });
    if (resp.status === 401) {
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) return false;
      resp = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${freshToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [headerRow], range: `${sheetName}!A1` })
      });
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[GoogleSheets] ensureSheetHeaders write failed for sheet ${spreadsheetId} tab "${sheetName}":`, errText);
      return false;
    }
    console.log(`[GoogleSheets] Header row written to "${sheetName}" (${spreadsheetId}): [${headerRow.join(", ")}]`);
    return true;
  } catch (err) {
    console.error("[GoogleSheets] ensureSheetHeaders error:", err.message);
    return false;
  }
}
async function appendRowToSheet(userId, spreadsheetId, sheetName, rowData) {
  const token = await refreshAccessToken(userId);
  if (!token) {
    console.error("[GoogleSheets] No valid token for user:", userId);
    return false;
  }
  const doAppend = async (accessToken) => {
    const range = encodeURIComponent(`${sheetName}!A1`);
    const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    return fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [rowData] })
    });
  };
  try {
    let resp = await doAppend(token);
    if (resp.status === 401) {
      console.warn("[GoogleSheets] Got 401, forcing token refresh and retrying append...");
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) {
        console.error("[GoogleSheets] Force refresh failed \u2014 cannot append row");
        return false;
      }
      resp = await doAppend(freshToken);
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[GoogleSheets] Append row failed:", errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[GoogleSheets] Append row error:", err.message);
    return false;
  }
}

// server/services/google-calendar/google-calendar.service.ts
var GOOGLE_TOKEN_URL2 = "https://oauth2.googleapis.com/token";
var GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";
async function refreshCalendarToken(userId, force = false) {
  const [cred] = await db.select().from(googleCalendarCredentials).where(eq10(googleCalendarCredentials.userId, userId)).limit(1);
  if (!cred) return null;
  const now = /* @__PURE__ */ new Date();
  if (!force && cred.tokenExpiry > now) {
    return cred.accessToken;
  }
  const creds = await getGoogleCredentials();
  if (!creds) {
    console.error("[GoogleCalendar] Google OAuth credentials not configured");
    return null;
  }
  try {
    const resp = await fetch(GOOGLE_TOKEN_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        refresh_token: cred.refreshToken,
        grant_type: "refresh_token"
      })
    });
    if (!resp.ok) {
      console.error("[GoogleCalendar] Token refresh failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    const newExpiry = new Date(Date.now() + data.expires_in * 1e3);
    await db.update(googleCalendarCredentials).set({ accessToken: data.access_token, tokenExpiry: newExpiry, updatedAt: /* @__PURE__ */ new Date() }).where(eq10(googleCalendarCredentials.userId, userId));
    return data.access_token;
  } catch (err) {
    console.error("[GoogleCalendar] Token refresh error:", err.message);
    return null;
  }
}
function buildEventBody(apt) {
  const dateStr = apt.appointmentDate;
  const timeStr = apt.appointmentTime.substring(0, 5);
  const startDateTime = `${dateStr}T${timeStr}:00`;
  const startMs = (/* @__PURE__ */ new Date(`${dateStr}T${timeStr}`)).getTime();
  const endMs = startMs + apt.duration * 60 * 1e3;
  const endDate = new Date(endMs);
  const endDateStr = endDate.toISOString().split("T")[0];
  const endTimeStr = endDate.toISOString().split("T")[1].substring(0, 5);
  const endDateTime = `${endDateStr}T${endTimeStr}:00`;
  const descParts = [
    `Phone: ${apt.contactPhone}`
  ];
  if (apt.contactEmail) descParts.push(`Email: ${apt.contactEmail}`);
  if (apt.serviceName) descParts.push(`Service: ${apt.serviceName}`);
  descParts.push(`Duration: ${apt.duration} minutes`);
  if (apt.notes) descParts.push(`Notes: ${apt.notes}`);
  descParts.push(`
Booked by AI agent via Zonvo AI`);
  if (apt.status === "completed") {
    const completedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    descParts.push(`
Completed at: ${completedAt}`);
  }
  const statusLabel = apt.status.charAt(0).toUpperCase() + apt.status.slice(1);
  return {
    summary: `${statusLabel}: ${apt.contactName}${apt.serviceName ? ` \u2014 ${apt.serviceName}` : ""}`,
    description: descParts.join("\n"),
    start: { dateTime: startDateTime, timeZone: "UTC" },
    end: { dateTime: endDateTime, timeZone: "UTC" }
  };
}
async function createCalendarEvent(userId, apt) {
  let token = await refreshCalendarToken(userId);
  if (!token) return null;
  const body = buildEventBody(apt);
  const doCreate = (t) => fetch(`${GOOGLE_CALENDAR_API}/calendars/primary/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  try {
    let resp = await doCreate(token);
    if (resp.status === 401) {
      const fresh = await refreshCalendarToken(userId, true);
      if (!fresh) return null;
      resp = await doCreate(fresh);
    }
    if (!resp.ok) {
      console.error("[GoogleCalendar] Create event failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    console.log(`\u{1F4C5} [GoogleCalendar] Created event ${data.id} for appointment ${apt.id}`);
    return data.id;
  } catch (err) {
    console.error("[GoogleCalendar] Create event error:", err.message);
    return null;
  }
}
async function isCalendarSyncEnabled(userId) {
  const [cred] = await db.select({ id: googleCalendarCredentials.id }).from(googleCalendarCredentials).where(eq10(googleCalendarCredentials.userId, userId)).limit(1);
  if (!cred) return false;
  const [settings] = await db.select({ syncToGoogleCalendar: appointmentSettings.syncToGoogleCalendar }).from(appointmentSettings).where(eq10(appointmentSettings.userId, userId)).limit(1);
  return settings?.syncToGoogleCalendar ?? false;
}

// server/services/rag-knowledge.ts
init_db();
init_schema();
import OpenAI from "openai";
import { eq as eq12, and as and4, inArray as inArray5, sql as sql15 } from "drizzle-orm";
var EMBEDDING_MODEL = "text-embedding-3-small";
var MAX_CHUNK_CHARS = 2e3;
var DEFAULT_STORAGE_LIMIT_BYTES = 20 * 1024 * 1024;
var openaiClient = null;
var lastApiKey = null;
var API_KEY_CACHE_MS = 6e4;
var cachedApiKey = null;
async function getOpenAIApiKey() {
  if (cachedApiKey && Date.now() - cachedApiKey.at < API_KEY_CACHE_MS) return cachedApiKey.key;
  const key = await resolveOpenAIApiKey();
  cachedApiKey = { key, at: Date.now() };
  return key;
}
async function resolveOpenAIApiKey() {
  try {
    const [dbSetting] = await db.select().from(globalSettings).where(eq12(globalSettings.key, "openai_api_key")).limit(1);
    if (dbSetting?.value) {
      return dbSetting.value;
    }
  } catch (e) {
  }
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  try {
    const { OpenAIPoolService: OpenAIPoolService2 } = await Promise.resolve().then(() => (init_openai_pool_service(), openai_pool_service_exports));
    const cred = await OpenAIPoolService2.getLeastLoadedCredential();
    if (cred?.apiKey) return cred.apiKey;
  } catch {
  }
  throw new Error("OPENAI_API_KEY is required for RAG knowledge system. Configure it in Admin Settings or as an environment variable.");
}
async function getOpenAIClient() {
  const apiKey = await getOpenAIApiKey();
  if (!openaiClient || lastApiKey !== apiKey) {
    openaiClient = new OpenAI({ apiKey });
    lastApiKey = apiKey;
  }
  return openaiClient;
}
function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must have same length");
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
function chunkText(text2, maxChars = MAX_CHUNK_CHARS, overlapChars = 200) {
  const chunks = [];
  const cleanText = text2.replace(/\s+/g, " ").trim();
  if (cleanText.length <= maxChars) {
    return [cleanText];
  }
  let start = 0;
  while (start < cleanText.length) {
    let end = start + maxChars;
    if (end < cleanText.length) {
      const lastPeriod = cleanText.lastIndexOf(".", end);
      const lastNewline = cleanText.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      if (breakPoint > start + maxChars / 2) {
        end = breakPoint + 1;
      }
    }
    const chunk = cleanText.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    start = end - overlapChars;
    if (start >= cleanText.length) break;
  }
  return chunks;
}
async function generateEmbedding(text2) {
  const openai = await getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text2
  });
  return response.data[0].embedding;
}
function estimateTokens(text2) {
  return Math.ceil(text2.length / 4);
}
var RAGKnowledgeService = class {
  /**
   * Get or create storage limit for user
   */
  static async getUserStorageLimit(userId) {
    const [existing] = await db.select().from(userKnowledgeStorageLimits).where(eq12(userKnowledgeStorageLimits.userId, userId));
    if (existing) {
      return { maxBytes: existing.maxStorageBytes, usedBytes: existing.usedStorageBytes };
    }
    await db.insert(userKnowledgeStorageLimits).values({
      userId,
      maxStorageBytes: DEFAULT_STORAGE_LIMIT_BYTES,
      usedStorageBytes: 0
    });
    return { maxBytes: DEFAULT_STORAGE_LIMIT_BYTES, usedBytes: 0 };
  }
  /**
   * Update used storage for user
   */
  static async updateUsedStorage(userId, deltaBytes) {
    await db.update(userKnowledgeStorageLimits).set({
      usedStorageBytes: sql15`${userKnowledgeStorageLimits.usedStorageBytes} + ${deltaBytes}`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq12(userKnowledgeStorageLimits.userId, userId));
  }
  /**
   * Check if user has enough storage space
   */
  static async checkStorageSpace(userId, requiredBytes) {
    const { maxBytes, usedBytes } = await this.getUserStorageLimit(userId);
    return usedBytes + requiredBytes <= maxBytes;
  }
  /**
   * Process and store knowledge base item with embeddings
   */
  static async processKnowledgeItem(knowledgeBaseId, userId, content, metadata) {
    try {
      console.log(`[RAG] Processing knowledge item ${knowledgeBaseId} for user ${userId}`);
      const contentSize = Buffer.byteLength(content, "utf8");
      const hasSpace = await this.checkStorageSpace(userId, contentSize);
      if (!hasSpace) {
        return {
          success: false,
          chunksCreated: 0,
          error: "Storage limit exceeded. Please delete some knowledge items or upgrade your plan."
        };
      }
      const [queueEntry] = await db.insert(knowledgeProcessingQueue).values({
        knowledgeBaseId,
        userId,
        status: "processing"
      }).returning();
      const chunks = chunkText(content);
      console.log(`[RAG] Created ${chunks.length} chunks from content`);
      await db.update(knowledgeProcessingQueue).set({ totalChunks: chunks.length }).where(eq12(knowledgeProcessingQueue.id, queueEntry.id));
      let processedCount = 0;
      for (let i = 0; i < chunks.length; i++) {
        const chunkText2 = chunks[i];
        try {
          const embedding = await generateEmbedding(chunkText2);
          await db.insert(knowledgeChunks).values({
            knowledgeBaseId,
            userId,
            chunkIndex: i,
            chunkText: chunkText2,
            embedding,
            // Store as JSON array
            tokenCount: estimateTokens(chunkText2),
            metadata: { ...metadata, chunkIndex: i, totalChunks: chunks.length }
          });
          processedCount++;
          await db.update(knowledgeProcessingQueue).set({ processedChunks: processedCount, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(knowledgeProcessingQueue.id, queueEntry.id));
        } catch (chunkError) {
          console.error(`[RAG] Error processing chunk ${i}:`, chunkError.message);
        }
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      await this.updateUsedStorage(userId, contentSize);
      await db.update(knowledgeProcessingQueue).set({ status: "completed", updatedAt: /* @__PURE__ */ new Date() }).where(eq12(knowledgeProcessingQueue.id, queueEntry.id));
      console.log(`[RAG] Successfully processed ${processedCount}/${chunks.length} chunks`);
      return { success: true, chunksCreated: processedCount };
    } catch (error) {
      console.error(`[RAG] Error processing knowledge item:`, error.message);
      await db.update(knowledgeProcessingQueue).set({ status: "failed", errorMessage: error.message, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId));
      return { success: false, chunksCreated: 0, error: error.message };
    }
  }
  /**
   * Chunks with embeddings for in-memory search (one load per call on the Sarvam pipeline).
   */
  static async loadChunksForSearch(knowledgeBaseIds, userId, limit) {
    if (knowledgeBaseIds.length === 0) return [];
    const rows = await db.select({ text: knowledgeChunks.chunkText, embedding: knowledgeChunks.embedding }).from(knowledgeChunks).where(and4(inArray5(knowledgeChunks.knowledgeBaseId, knowledgeBaseIds), eq12(knowledgeChunks.userId, userId))).limit(limit);
    return rows.filter((row) => Array.isArray(row.embedding) && row.embedding.length > 0).map((row) => ({ text: row.text, embedding: row.embedding }));
  }
  /**
   * Re-runs chunking + embeddings for an item from its stored content (failed runs, items created
   * before RAG existed). Existing chunks and queue rows are dropped first so the status is fresh.
   */
  static async reprocessKnowledgeItem(knowledgeBaseId, userId, content, metadata) {
    await this.deleteKnowledgeChunks(knowledgeBaseId, userId);
    return this.processKnowledgeItem(knowledgeBaseId, userId, content, metadata);
  }
  /**
   * Search knowledge base using semantic similarity
   */
  static async searchKnowledge(query, knowledgeBaseIds, userId, maxResults = 5) {
    try {
      console.log(`[RAG] Searching knowledge for: "${query.substring(0, 50)}..."`);
      if (knowledgeBaseIds.length === 0) {
        return [];
      }
      const queryEmbedding = await generateEmbedding(query);
      const chunks = await db.select().from(knowledgeChunks).where(
        and4(
          inArray5(knowledgeChunks.knowledgeBaseId, knowledgeBaseIds),
          eq12(knowledgeChunks.userId, userId)
        )
      );
      if (chunks.length === 0) {
        console.log(`[RAG] No chunks found for knowledge bases`);
        return [];
      }
      console.log(`[RAG] Searching ${chunks.length} chunks`);
      const scoredChunks = chunks.filter((chunk) => chunk.embedding && Array.isArray(chunk.embedding)).map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
        source: chunk.knowledgeBaseId
      })).sort((a, b) => b.score - a.score).slice(0, maxResults);
      console.log(`[RAG] Found ${scoredChunks.length} relevant chunks (top score: ${scoredChunks[0]?.score.toFixed(3) || "N/A"})`);
      return scoredChunks;
    } catch (error) {
      console.error(`[RAG] Search error:`, error.message);
      return [];
    }
  }
  /**
   * Format search results for agent consumption
   */
  static formatResultsForAgent(results, maxTokens = 500) {
    if (results.length === 0) {
      return "No relevant information found in the knowledge base.";
    }
    let output = "Based on the knowledge base:\n\n";
    let totalTokens = estimateTokens(output);
    for (const result of results) {
      const chunkTokens = estimateTokens(result.chunk.chunkText);
      if (totalTokens + chunkTokens > maxTokens) {
        const remainingTokens = maxTokens - totalTokens - 10;
        if (remainingTokens > 50) {
          const truncatedChars = remainingTokens * 4;
          output += `\u2022 ${result.chunk.chunkText.substring(0, truncatedChars)}...
`;
        }
        break;
      }
      output += `\u2022 ${result.chunk.chunkText}

`;
      totalTokens += chunkTokens + 5;
    }
    return output.trim();
  }
  /**
   * Delete all chunks for a knowledge base item
   */
  static async deleteKnowledgeChunks(knowledgeBaseId, userId) {
    const chunks = await db.select().from(knowledgeChunks).where(
      and4(
        eq12(knowledgeChunks.knowledgeBaseId, knowledgeBaseId),
        eq12(knowledgeChunks.userId, userId)
      )
    );
    const totalSize = chunks.reduce((sum, chunk) => {
      return sum + Buffer.byteLength(chunk.chunkText, "utf8");
    }, 0);
    await db.delete(knowledgeChunks).where(eq12(knowledgeChunks.knowledgeBaseId, knowledgeBaseId));
    await db.delete(knowledgeProcessingQueue).where(eq12(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId));
    if (totalSize > 0) {
      await this.updateUsedStorage(userId, -totalSize);
    }
    console.log(`[RAG] Deleted ${chunks.length} chunks for knowledge base ${knowledgeBaseId}`);
  }
  /**
   * Get processing status for a knowledge base item
   */
  static async getProcessingStatus(knowledgeBaseId) {
    const [entry] = await db.select().from(knowledgeProcessingQueue).where(eq12(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId)).orderBy(sql15`${knowledgeProcessingQueue.createdAt} DESC`).limit(1);
    if (!entry) {
      return null;
    }
    const progress = entry.totalChunks ? (entry.processedChunks || 0) / entry.totalChunks * 100 : 0;
    return {
      status: entry.status,
      progress: Math.round(progress),
      error: entry.errorMessage || void 0
    };
  }
  /**
   * Get chunk count for a knowledge base item
   */
  static async getChunkCount(knowledgeBaseId) {
    const result = await db.select({ count: sql15`count(*)` }).from(knowledgeChunks).where(eq12(knowledgeChunks.knowledgeBaseId, knowledgeBaseId));
    return Number(result[0]?.count || 0);
  }
};

// plugins/custom-voice-engine/services/tools/tool-executor.ts
var ToolExecutor = class _ToolExecutor {
  static async executeToolCall(toolCall, metadata, userId, agentId, callId, session) {
    const name = toolCall.function.name;
    let params = {};
    try {
      params = JSON.parse(toolCall.function.arguments);
    } catch {
      params = {};
    }
    if (name === "book_appointment" || name.startsWith("book_appointment_")) {
      return await _ToolExecutor.executeBookAppointment(params, metadata, userId, agentId, callId);
    } else if (name.startsWith("submit_form")) {
      return await _ToolExecutor.executeFormSubmission(params, metadata, userId, callId);
    } else if (name === "lookup_knowledge_base" || name === "query_knowledge_base") {
      const kbIds = metadata?.knowledgeBaseIds || [];
      if (!kbIds.length) return { success: false, result: "No knowledge base configured." };
      if (!params.query) return { success: false, result: "Query is required." };
      try {
        const results = await RAGKnowledgeService.searchKnowledge(params.query, kbIds, userId);
        const formattedResponse = RAGKnowledgeService.formatResultsForAgent(results, 400);
        return { success: true, result: formattedResponse || "No relevant information found in the knowledge base." };
      } catch (err) {
        console.error("[ToolExecutor] Knowledge base error:", err);
        return { success: false, result: "Unable to search knowledge base at this time." };
      }
    } else if (name.startsWith("webhook_") || name.startsWith("send_email_") || name.startsWith("send_whatsapp_") || metadata?.webhookUrl || metadata?.url) {
      return await _ToolExecutor.executeWebhook(name, params, metadata);
    } else if (name === "end_call") {
      setImmediate(() => {
        session.end("hangup").catch(() => {
        });
      });
      return { success: true, result: "Ending call" };
    } else if (name === "transfer_call" || name.startsWith("transfer_")) {
      const targetNumber = params.destination || params.phoneNumber || metadata?.phoneNumber || "";
      if (!targetNumber) {
        return { success: false, result: "No transfer destination specified." };
      }
      setImmediate(() => {
        session.emit("transfer", targetNumber);
      });
      return { success: true, result: `Initiated transfer to ${targetNumber}` };
    } else if (name === "play_audio" || name.startsWith("play_audio_")) {
      const audioUrl = params.audioUrl || params.audio_url || metadata?.audioUrl || "";
      if (!audioUrl) {
        return { success: false, result: "No audio URL specified." };
      }
      setImmediate(() => {
        session.emit("play_audio", audioUrl);
      });
      return { success: true, result: "Playing audio" };
    } else {
      console.log(`[ToolExecutor] Unknown tool: ${name}`);
      return { success: true, result: "Tool executed" };
    }
  }
  static async executeWebhook(name, params, metadata) {
    try {
      const webhookUrl = metadata?.webhookUrl || metadata?.url || "";
      if (!webhookUrl) {
        console.warn(`[ToolExecutor] Webhook tool ${name} missing URL in metadata`);
        return { success: false, result: "Webhook URL is not configured." };
      }
      const webhookMethod = metadata?.webhookMethod || metadata?.method || "POST";
      const headers = metadata?.headers || metadata?.webhookHeaders || {};
      console.log(`[ToolExecutor] Executing Webhook: ${webhookMethod} ${webhookUrl}`);
      let payload = { ...params };
      const fetchOptions = {
        method: webhookMethod.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      };
      if (["POST", "PUT", "PATCH"].includes(webhookMethod.toUpperCase())) {
        fetchOptions.body = JSON.stringify(payload);
      }
      const response = await fetch(webhookUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }
      console.log(`[ToolExecutor] Webhook response received successfully`);
      return { success: true, result: responseData || "Webhook executed successfully." };
    } catch (err) {
      console.error(`[ToolExecutor] Webhook error for ${name}:`, err.message);
      return { success: false, result: `Failed to execute webhook: ${err.message}` };
    }
  }
  static async executeBookAppointment(params, metadata, userId, agentId, callId) {
    try {
      const googleSheetId = metadata?.googleSheetId;
      const googleSheetName = metadata?.googleSheetName;
      console.log(`[Appointment Tool] metadata:`, JSON.stringify(metadata));
      console.log(`[Appointment Tool] googleSheetId:`, googleSheetId, `googleSheetName:`, googleSheetName);
      console.log(`[Appointment Tool] Booking:`, JSON.stringify(params));
      if (!params.contactName || !params.contactPhone || !params.appointmentDate || !params.appointmentTime) {
        return { success: false, result: "Please provide name, phone, date and time for the appointment." };
      }
      let resolvedFlowId = null;
      const agentRow = await db.execute(sql16`SELECT flow_id FROM agents WHERE id = ${agentId} LIMIT 1`);
      const agentData = agentRow.rows?.[0];
      if (agentData?.flow_id) {
        resolvedFlowId = agentData.flow_id;
      } else {
        const flowRow = await db.execute(sql16`SELECT id FROM flows WHERE agent_id = ${agentId} AND is_active = true LIMIT 1`);
        resolvedFlowId = flowRow.rows?.[0]?.id || null;
      }
      const settingsResult = await db.execute(sql16`
        SELECT * FROM appointment_settings WHERE user_id = ${userId} LIMIT 1
      `);
      const settings = settingsResult.rows?.[0];
      const defaultWorkingHours = {
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "09:00", end: "17:00", enabled: false },
        sunday: { start: "09:00", end: "17:00", enabled: false }
      };
      const appointmentDate = params.appointmentDate;
      const appointmentTime = params.appointmentTime;
      const parsedDate = /* @__PURE__ */ new Date(appointmentDate + "T12:00:00");
      if (!isNaN(parsedDate.getTime())) {
        const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const dayOfWeek = parsedDate.getDay();
        const dayName = dayNames[dayOfWeek];
        let daySettings = defaultWorkingHours[dayName];
        if (settings?.working_hours) {
          const wh = typeof settings.working_hours === "string" ? JSON.parse(settings.working_hours) : settings.working_hours;
          if (wh[dayName]) {
            daySettings = { ...daySettings, ...wh[dayName] };
          }
        }
        if (!daySettings.enabled) {
          const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          return { success: false, result: `We're not available on ${capitalizedDay}s. Please choose a different day.` };
        }
        const parseTimeToMinutes = (timeStr) => {
          const parts = timeStr.split(":");
          return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || "0", 10);
        };
        const requestedMinutes = parseTimeToMinutes(appointmentTime);
        const startMinutes = parseTimeToMinutes(daySettings.start || "09:00");
        const endMinutes = parseTimeToMinutes(daySettings.end || "17:00");
        const duration = params.duration || 30;
        const appointmentEndMinutes = requestedMinutes + duration;
        if (requestedMinutes < startMinutes || appointmentEndMinutes > endMinutes) {
          const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          return {
            success: false,
            result: `${appointmentTime} is outside our available hours on ${capitalizedDay}. We're available from ${daySettings.start} to ${daySettings.end}.`
          };
        }
      }
      if (callId) {
        const dupResult = await db.execute(sql16`
          SELECT id FROM appointments
          WHERE call_id = ${callId} AND appointment_date = ${appointmentDate} AND status = 'scheduled'
          LIMIT 1
        `);
        if (dupResult.rows?.length > 0) {
          const existing = dupResult.rows[0];
          return { success: true, result: `Your appointment is already confirmed for ${appointmentDate}.`, appointmentId: existing.id, alreadyBooked: true };
        }
      }
      const dupByContact = await db.execute(sql16`
        SELECT id FROM appointments
        WHERE user_id = ${userId} AND contact_phone = ${params.contactPhone}
          AND appointment_date = ${appointmentDate} AND appointment_time = ${appointmentTime}
          AND status = 'scheduled'
        LIMIT 1
      `);
      if (dupByContact.rows?.length > 0) {
        const existing = dupByContact.rows[0];
        return { success: true, result: `Your appointment is confirmed for ${appointmentDate} at ${appointmentTime}.`, appointmentId: existing.id, alreadyBooked: true };
      }
      if (settings && !settings.allow_overlapping) {
        const overlapResult = await db.execute(sql16`
          SELECT id FROM appointments
          WHERE user_id = ${userId} AND appointment_date = ${appointmentDate}
            AND appointment_time = ${appointmentTime} AND status = 'scheduled'
          LIMIT 1
        `);
        if (overlapResult.rows?.length > 0) {
          return { success: false, result: "That time slot is already booked. Please choose a different time." };
        }
      }
      const appointmentId = nanoid2();
      await db.execute(sql16`
        INSERT INTO appointments (id, user_id, call_id, flow_id, contact_name, contact_phone, contact_email, appointment_date, appointment_time, duration, service_name, notes, status, metadata)
        VALUES (${appointmentId}, ${userId}, ${callId || null}, ${resolvedFlowId}, ${params.contactName}, ${params.contactPhone}, ${params.contactEmail || null}, ${params.appointmentDate}, ${params.appointmentTime}, ${params.duration || 30}, ${params.serviceName || null}, ${params.notes || null}, 'scheduled', ${JSON.stringify({ source: "custom-voice-engine", agentId })})
      `);
      console.log(`[Appointment Tool] \u2705 Created appointment ${appointmentId} for user ${userId}, flow_id=${resolvedFlowId}, callId=${callId}`);
      if (googleSheetId) {
        try {
          let sheetTab = googleSheetName || "";
          if (!sheetTab) {
            const tabsResult = await db.execute(sql16`SELECT list_sheet_tabs(${userId}, ${googleSheetId})`);
            sheetTab = tabsResult.rows?.[0]?.list_sheet_tabs?.[0]?.title || "Sheet1";
          }
          const row = [
            String(params.contactName || ""),
            String(params.contactPhone || ""),
            String(appointmentDate || ""),
            String(appointmentTime || ""),
            String(params.duration || 30),
            String(params.serviceName || ""),
            String(callId || ""),
            (/* @__PURE__ */ new Date()).toISOString()
          ];
          const pushed = await appendRowToSheet(userId, googleSheetId, sheetTab, row);
          if (pushed) {
            console.log(`[Appointment Tool] \u2705 Successfully pushed appointment row to Google Sheet ${googleSheetId} tab "${sheetTab}"`);
          } else {
            console.warn(`[Appointment Tool] \u26A0\uFE0F Google Sheets push returned false for sheet ${googleSheetId} tab "${sheetTab}"`);
          }
        } catch (sheetErr) {
          console.error(`[Appointment Tool] Google Sheets push failed (non-fatal):`, sheetErr.message);
        }
      }
      try {
        const syncEnabled = await isCalendarSyncEnabled(userId);
        if (syncEnabled) {
          const calendarApt = {
            id: appointmentId,
            contactName: params.contactName,
            contactPhone: params.contactPhone,
            contactEmail: params.contactEmail || null,
            appointmentDate,
            appointmentTime,
            duration: params.duration || 30,
            serviceName: params.serviceName || null,
            notes: params.notes || null,
            status: "scheduled"
          };
          const eventId = await createCalendarEvent(userId, calendarApt);
          if (eventId) {
            await db.update(appointments).set({ googleCalendarEventId: eventId, updatedAt: /* @__PURE__ */ new Date() }).where(eq13(appointments.id, appointmentId));
            console.log(`\u{1F4C5} [GoogleCalendar] Auto-synced appointment ${appointmentId} \u2192 event ${eventId}`);
          }
        }
      } catch (calErr) {
        console.error(`\u{1F4C5} [GoogleCalendar] Auto-sync error for ${appointmentId}:`, calErr.message);
      }
      return { success: true, result: `Appointment booked for ${params.contactName} on ${appointmentDate} at ${appointmentTime}`, appointmentId };
    } catch (error) {
      console.error(`[Appointment Tool] Error:`, error.message, error.stack);
      return { success: false, result: "Unable to book appointment at this time. Please try again." };
    }
  }
  static async executeFormSubmission(params, metadata, userId, callId) {
    try {
      const googleSheetId = metadata?.googleSheetId;
      const googleSheetName = metadata?.googleSheetName;
      const formId = metadata?.formId;
      if (!formId) {
        console.error(`[Form Tool] Missing formId in metadata`);
        return { success: false, result: "Form configuration not found." };
      }
      console.log(`[Form Tool] Submitting to form ${formId}:`, JSON.stringify(params));
      const formResult = await db.execute(sql16`
        SELECT id, name FROM forms WHERE id = ${formId} LIMIT 1
      `);
      const form = formResult.rows?.[0];
      if (!form) {
        return { success: false, result: "Form configuration not found." };
      }
      const fieldsResult = await db.execute(sql16`
        SELECT id, question, field_type, is_required FROM form_fields WHERE form_id = ${formId} ORDER BY "order" ASC
      `);
      const formFieldRows = fieldsResult.rows || [];
      const responses = [];
      for (const field of formFieldRows) {
        const fieldKey = `field_${field.id.replace(/-/g, "_")}`;
        const answer = params[fieldKey] ?? params[field.id] ?? params[field.question] ?? null;
        if (answer !== null && answer !== void 0) {
          responses.push({
            fieldId: field.id,
            question: field.question,
            answer: String(answer)
          });
        }
      }
      if (responses.length === 0 && metadata?.fields) {
        for (const f of metadata.fields) {
          const key = f.name || f.id || f;
          const answer = params[key];
          if (answer !== null && answer !== void 0) {
            responses.push({
              fieldId: key,
              question: f.description || f.label || key,
              answer: String(answer)
            });
          }
        }
      }
      const submissionId = nanoid2();
      await db.execute(sql16`
        INSERT INTO form_submissions (id, form_id, call_id, contact_name, contact_phone, responses)
        VALUES (${submissionId}, ${formId}, ${callId || null}, ${params.contactName || params.fullName || null}, ${params.contactPhone || params.phone || null}, ${JSON.stringify(responses)})
      `);
      console.log(`[Form Tool] Created submission ${submissionId} with ${responses.length} responses`);
      if (googleSheetId) {
        try {
          const sheetTab = googleSheetName || "Sheet1";
          const headerRow = [
            "Contact Name",
            "Contact Phone",
            ...responses.map((r) => r.question || r.fieldId || ""),
            "Call ID",
            "Submitted At"
          ];
          try {
            await ensureSheetHeaders(userId, googleSheetId, sheetTab, headerRow);
          } catch (headerErr) {
            console.warn(`[Form Tool] Safety-net header write failed (non-fatal):`, headerErr.message);
          }
          const answerValues = responses.map((r) => r.answer ?? "");
          const sheetRow = [
            params.contactName || params.fullName || null,
            params.contactPhone || params.phone || null,
            ...answerValues,
            callId || null,
            (/* @__PURE__ */ new Date()).toISOString()
          ];
          const pushed = await appendRowToSheet(userId, googleSheetId, sheetTab, sheetRow);
          if (pushed) {
            console.log(`[Form Tool] \u2705 Appended row to Google Sheet "${sheetTab}" (${googleSheetId})`);
          } else {
            console.error(`[Form Tool] \u26A0\uFE0F Google Sheets append FAILED for sheet ${googleSheetId} tab "${sheetTab}"`);
          }
        } catch (sheetErr) {
          console.error(`[Form Tool] Google Sheets push failed (non-fatal):`, sheetErr.message);
        }
      }
      return { success: true, result: `Form submitted successfully.`, submissionId };
    } catch (error) {
      console.error(`[Form Tool] Error:`, error.message, error.stack);
      return { success: false, result: "Unable to submit form at this time. Please try again." };
    }
  }
};

// plugins/custom-voice-engine/types.ts
var DEFAULT_TELEPHONY_FORMAT = {
  encoding: "linear16",
  sampleRate: 8e3,
  channels: 1,
  bitDepth: 16
};
var DEFAULT_STT_FORMAT = {
  encoding: "linear16",
  sampleRate: 16e3,
  channels: 1,
  bitDepth: 16
};
var DEFAULT_VAD_CONFIG = {
  speechThresholdMs: 250,
  silenceThresholdMs: 500,
  energyThreshold: 0.015,
  bargeInEnabled: true
};

// plugins/custom-voice-engine/services/providers/stt/deepgram-stt.provider.ts
import WebSocket from "ws";

// plugins/custom-voice-engine/services/providers/stt/stt-provider.interface.ts
var BaseSttProvider = class {
  config = null;
  format = null;
  connected = false;
  transcriptCallbacks = [];
  errorCallbacks = [];
  onTranscript(callback) {
    this.transcriptCallbacks.push(callback);
  }
  onError(callback) {
    this.errorCallbacks.push(callback);
  }
  isConnected() {
    return this.connected;
  }
  emitTranscript(transcript) {
    for (const cb of this.transcriptCallbacks) {
      try {
        cb(transcript);
      } catch (err) {
        console.error(`[STT:${this.name}] Transcript callback error:`, err);
      }
    }
  }
  emitError(error) {
    for (const cb of this.errorCallbacks) {
      try {
        cb(error);
      } catch (err) {
        console.error(`[STT:${this.name}] Error callback error:`, err);
      }
    }
  }
};

// plugins/custom-voice-engine/services/providers/stt/deepgram-stt.provider.ts
var DEEPGRAM_WS_URL = "wss://api.deepgram.com/v1/listen";
var DeepgramSttProvider = class extends BaseSttProvider {
  name = "deepgram";
  ws = null;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  keepAliveInterval = null;
  isClosing = false;
  async connect(config, format) {
    this.config = config;
    this.format = format;
    this.isClosing = false;
    return this.createConnection();
  }
  async createConnection() {
    if (!this.config || !this.format) throw new Error("Configuration missing");
    const paramsObj = {
      model: this.config.model || this.config.deepgramModel || "nova-2",
      encoding: this.mapEncoding(this.format.encoding),
      sample_rate: String(this.format.sampleRate),
      channels: String(this.format.channels),
      punctuate: String(this.config.punctuate ?? true),
      interim_results: String(this.config.interimResults ?? true),
      endpointing: String(this.config.endpointing ?? 300),
      utterance_end_ms: "1000",
      vad_events: "true",
      smart_format: "true"
    };
    paramsObj.language = this.mapLanguage(this.config.language || "en");
    const params = new URLSearchParams(paramsObj);
    const url = `${DEEPGRAM_WS_URL}?${params.toString()}`;
    console.log(`[STT:Deepgram] Connecting to URL: ${url.replace(this.config.apiKey, "***")}`);
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url, {
        headers: {
          Authorization: `Token ${this.config.apiKey}`
        }
      });
      this.ws.on("unexpected-response", (req, res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          console.error(`[STT:Deepgram] HTTP 400 Response Body from Deepgram: ${body}`);
        });
      });
      const timeout = setTimeout(() => {
        if (!this.connected) {
          reject(new Error("Deepgram connection timeout"));
          this.ws?.close();
        }
      }, 1e4);
      this.ws.on("open", () => {
        clearTimeout(timeout);
        this.connected = true;
        this.reconnectAttempts = 0;
        console.log("[STT:Deepgram] WebSocket connected");
        this.keepAliveInterval = setInterval(() => {
          if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type: "KeepAlive" }));
          }
        }, 8e3);
        resolve();
      });
      this.ws.on("message", (data) => {
        try {
          const response = JSON.parse(data.toString());
          this.handleResponse(response);
        } catch (err) {
          console.error("[STT:Deepgram] Failed to parse response:", err);
        }
      });
      this.ws.on("error", (err) => {
        clearTimeout(timeout);
        console.error("[STT:Deepgram] WebSocket error:", err);
        if (!this.connected) reject(err);
      });
      this.ws.on("close", (code, reason) => {
        clearTimeout(timeout);
        const wasConnected = this.connected;
        this.connected = false;
        if (this.keepAliveInterval) {
          clearInterval(this.keepAliveInterval);
          this.keepAliveInterval = null;
        }
        if (wasConnected && !this.isClosing && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = Math.pow(2, this.reconnectAttempts) * 1e3;
          console.log(`[STT:Deepgram] Unexpected close (code ${code}), reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => this.createConnection().catch((err) => {
            console.error(`[STT:Deepgram] Reconnect attempt ${this.reconnectAttempts} failed:`, err.message);
          }), delay);
        }
      });
    });
  }
  sendAudio(chunk) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(chunk);
    }
  }
  async close() {
    this.isClosing = true;
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
    if (this.ws) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "CloseStream" }));
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            this.ws?.terminate();
            resolve();
          }, 2e3);
          this.ws.once("close", () => {
            clearTimeout(timeout);
            resolve();
          });
          this.ws.close();
        });
      }
      this.ws = null;
    }
    this.connected = false;
    this.transcriptCallbacks = [];
    this.errorCallbacks = [];
  }
  handleResponse(response) {
    if (response.type === "Results") {
      const result = response;
      const channel = result.channel;
      if (!channel?.alternatives?.length) return;
      const alt = channel.alternatives[0];
      if (!alt.transcript) return;
      const words = (alt.words || []).map((w) => ({
        word: w.punctuated_word || w.word,
        start: w.start,
        end: w.end,
        confidence: w.confidence
      }));
      this.emitTranscript({
        text: alt.transcript,
        isFinal: result.is_final,
        confidence: alt.confidence,
        words,
        duration: result.duration * 1e3
      });
    } else if (response.type === "UtteranceEnd") {
      this.emitTranscript({ text: "", isFinal: true, confidence: 1, duration: 0 });
    } else if (response.type === "Error") {
      this.emitError(new Error(`Deepgram error: ${response.message || JSON.stringify(response)}`));
    }
  }
  mapEncoding(encoding) {
    switch (encoding) {
      case "linear16":
        return "linear16";
      case "mulaw":
        return "mulaw";
      case "alaw":
        return "alaw";
      case "opus":
        return "opus";
      default:
        return "linear16";
    }
  }
  mapLanguage(lang) {
    if (!lang) return "en-IN";
    if (lang.includes("-")) return lang;
    const langMap = {
      en: "en-IN",
      hi: "hi",
      ta: "ta",
      te: "te",
      kn: "kn",
      ml: "ml",
      mr: "mr",
      gu: "gu",
      bn: "bn",
      pa: "pa"
    };
    return langMap[lang] || lang;
  }
};

// plugins/custom-voice-engine/services/providers/stt/sarvam-stt.provider.ts
import axios3 from "axios";
var SARVAM_API_BASE2 = "https://api.sarvam.ai";
var BUFFER_FLUSH_INTERVAL_MS = 3e3;
var MIN_API_CALL_INTERVAL_MS = 1200;
var SarvamSttProvider = class extends BaseSttProvider {
  name = "sarvam";
  audioBuffer = [];
  flushInterval = null;
  totalBufferSize = 0;
  isFlushing = false;
  retryFlushPending = false;
  closed = false;
  lastApiCallTime = 0;
  // timestamp of last Sarvam API call (rate limiting)
  async connect(config, format) {
    this.config = config;
    this.format = format;
    this.connected = true;
    this.closed = false;
    this.audioBuffer = [];
    this.totalBufferSize = 0;
    this.retryFlushPending = false;
    console.log(`[STT:Sarvam] Connecting with format:`, format);
    try {
      await axios3.get(`${SARVAM_API_BASE2}/v1/models`, {
        ...keepAliveAxiosConfig,
        headers: { "api-subscription-key": config.apiKey },
        timeout: 5e3
      });
      console.log("[STT:Sarvam] API key validated successfully");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error("Sarvam API key is invalid");
      }
      console.warn("[STT:Sarvam] API key validation warning (non-auth error):", err.message);
    }
    this.flushInterval = setInterval(() => {
      this.flushBuffer(false).catch((err) => {
        this.emitError(new Error(`Sarvam flush error: ${err.message}`));
      });
    }, BUFFER_FLUSH_INTERVAL_MS);
    console.log("[STT:Sarvam] Provider connected");
  }
  sendAudio(chunk) {
    if (!this.connected || this.closed) return;
    this.audioBuffer.push(chunk);
    this.totalBufferSize += chunk.length;
    if (this.totalBufferSize % 6400 === 0) {
      console.log(`[STT:Sarvam] Buffered ${(this.totalBufferSize / 1024).toFixed(1)}KB audio so far`);
    }
  }
  async flush(force = true) {
    if (this.isFlushing) {
      console.log(`[STT:Sarvam] Flush requested but already flushing, queuing retry (force=${force})`);
      this.retryFlushPending = true;
      return;
    }
    await this.flushBuffer(force);
  }
  async close() {
    this.closed = true;
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    if (this.totalBufferSize > 0) {
      console.log(`[STT:Sarvam] Closing with ${(this.totalBufferSize / 1024).toFixed(1)}KB buffered audio, flushing...`);
      await this.flushBuffer(true);
    }
    this.connected = false;
    this.audioBuffer = [];
    this.totalBufferSize = 0;
    this.transcriptCallbacks = [];
    this.errorCallbacks = [];
    console.log("[STT:Sarvam] Provider closed");
  }
  /**
   * Flush buffered audio to Sarvam's speech-to-text REST API.
   *
   * Key constraints of the Sarvam /speech-to-text endpoint:
   *  - Max audio duration: 30 seconds per request (hard API limit)
   *  - Rate limits: too many requests too quickly → rate_limit_exceeded_error
   *
   * Strategy:
   *  1. Drain the entire audio buffer into one raw PCM block.
   *  2. Split that PCM block into ≤25s segments (safe margin under 30s).
   *  3. Send each segment as its own API call, with a rate-limit cooldown
   *     (MIN_API_CALL_INTERVAL_MS) enforced between consecutive calls.
   *  4. Emit a transcript event for each segment that returns text.
   *
   * @param force - skip the minimum-size check (used at close() to drain remaining audio)
   */
  async flushBuffer(force = false) {
    if (this.isFlushing) {
      console.log(`[STT:Sarvam] flushBuffer called but isFlushing=true, force=${force}`);
      return;
    }
    if (!this.config || !this.format) {
      console.log(`[STT:Sarvam] flushBuffer skipped: config=${!!this.config}, format=${!!this.format}`);
      return;
    }
    const { sampleRate: flushSampleRate = 8e3, channels: flushChannels = 1 } = this.format || {};
    const minBufferSize = flushSampleRate * flushChannels * 2 * 2;
    if (!force && this.totalBufferSize < minBufferSize) {
      console.log(`[STT:Sarvam] flushBuffer skipped: buffer ${this.totalBufferSize}B < min ${minBufferSize}B (force=${force})`);
      return;
    }
    if (this.totalBufferSize === 0) {
      console.log(`[STT:Sarvam] flushBuffer skipped: buffer is empty (force=${force})`);
      return;
    }
    this.isFlushing = true;
    this.retryFlushPending = false;
    const chunks = this.audioBuffer.splice(0);
    this.totalBufferSize = 0;
    const rawAudio = Buffer.concat(chunks);
    console.log(`[STT:Sarvam] flushBuffer: force=${force}, draining ${chunks.length} chunks, ${(rawAudio.length / 1024).toFixed(1)}KB`);
    try {
      const languageCode = this.config.detectLanguage ? "unknown" : this.config.sarvamLanguageCode || this.mapLanguage(this.config.language);
      const { sampleRate = 16e3, channels = 1 } = this.format;
      const MAX_SEGMENT_SECONDS = 25;
      const bytesPerSecond = sampleRate * channels * 2;
      const maxSegmentBytes = MAX_SEGMENT_SECONDS * bytesPerSecond;
      const totalSegments = Math.ceil(rawAudio.length / maxSegmentBytes);
      console.log(
        `[STT:Sarvam] Processing ${(rawAudio.length / 1024).toFixed(1)}KB audio as ${totalSegments} segment(s) of \u2264${MAX_SEGMENT_SECONDS}s each (lang: ${languageCode}, sampleRate: ${sampleRate})`
      );
      for (let seg = 0; seg < totalSegments; seg++) {
        const start = seg * maxSegmentBytes;
        const segmentPcm = rawAudio.slice(start, start + maxSegmentBytes);
        const segmentDurationS = segmentPcm.length / bytesPerSecond;
        const now = Date.now();
        const timeSinceLast = now - this.lastApiCallTime;
        if (this.lastApiCallTime > 0 && timeSinceLast < MIN_API_CALL_INTERVAL_MS) {
          const waitMs = MIN_API_CALL_INTERVAL_MS - timeSinceLast;
          console.log(`[STT:Sarvam] Rate-limit cooldown: waiting ${waitMs}ms before segment ${seg + 1}/${totalSegments}`);
          await new Promise((resolve) => setTimeout(resolve, waitMs));
        }
        const wavHeader = this.createWavHeader(segmentPcm.length, sampleRate, channels);
        const wavData = Buffer.concat([wavHeader, segmentPcm]);
        console.log(
          `[STT:Sarvam] Sending segment ${seg + 1}/${totalSegments}: ${segmentDurationS.toFixed(1)}s (${(wavData.length / 1024).toFixed(1)}KB) to ${SARVAM_API_BASE2}/speech-to-text`
        );
        const formData = new FormData();
        const blob = new Blob([wavData], { type: "audio/wav" });
        formData.append("file", blob, "audio.wav");
        formData.append("model", this.config.sarvamModel || "saaras:v3");
        formData.append("mode", "transcribe");
        if (languageCode) {
          formData.append("language_code", languageCode);
        }
        this.lastApiCallTime = Date.now();
        try {
          console.log(`[STT:Sarvam] POST segment ${seg + 1} starting...`);
          const response = await axios3.post(
            `${SARVAM_API_BASE2}/speech-to-text`,
            formData,
            {
              ...keepAliveAxiosConfig,
              headers: { "api-subscription-key": this.config.apiKey },
              timeout: 3e4
            }
          );
          console.log(`[STT:Sarvam] Segment ${seg + 1} response status: ${response.status}, has transcript: ${!!response.data?.transcript}`);
          if (response.data?.transcript) {
            const transcript = {
              text: response.data.transcript,
              isFinal: true,
              confidence: response.data.confidence || 0.85,
              language: response.data.language_code || languageCode,
              duration: segmentDurationS * 1e3
            };
            console.log(`[STT:Sarvam] EMITTING transcript: "${response.data.transcript.substring(0, 100)}"`);
            this.emitTranscript(transcript);
          } else {
            console.warn(`[STT:Sarvam] Segment ${seg + 1} returned no transcript. Full response:`, JSON.stringify(response.data));
          }
        } catch (segErr) {
          let errorMsg = segErr.message;
          if (segErr.response?.data) {
            console.error(
              `[STT:Sarvam] Segment ${seg + 1} API Error:`,
              JSON.stringify(segErr.response.data, null, 2)
            );
            errorMsg = segErr.response.data.message || JSON.stringify(segErr.response.data);
          }
          console.error(`[STT:Sarvam] Segment ${seg + 1} error: ${errorMsg}`);
          this.emitError(new Error(`Sarvam STT error (segment ${seg + 1}): ${errorMsg}`));
        }
      }
    } catch (outerErr) {
      console.error(`[STT:Sarvam] flushBuffer unexpected error:`, outerErr.message);
    } finally {
      this.isFlushing = false;
      if (this.retryFlushPending) {
        console.log(`[STT:Sarvam] Retrying pending flush after current flush completed`);
        this.retryFlushPending = false;
        this.flushBuffer(true).catch((err) => {
          console.error(`[STT:Sarvam] Retry flush error:`, err.message);
        });
      }
    }
  }
  createWavHeader(dataLength, sampleRate, channels) {
    const header = Buffer.alloc(44);
    header.write("RIFF", 0);
    header.writeUInt32LE(36 + dataLength, 4);
    header.write("WAVE", 8);
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * channels * 2, 28);
    header.writeUInt16LE(channels * 2, 32);
    header.writeUInt16LE(16, 34);
    header.write("data", 36);
    header.writeUInt32LE(dataLength, 40);
    return header;
  }
  mapLanguage(lang) {
    if (!lang) return "en-IN";
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      bn: "bn-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      od: "od-IN",
      pa: "pa-IN",
      ta: "ta-IN",
      te: "te-IN",
      gu: "gu-IN",
      as: "as-IN",
      ur: "ur-IN",
      ne: "ne-IN"
    };
    return langMap[baseLang] || "en-IN";
  }
};

// plugins/custom-voice-engine/services/providers/stt/stt-provider.factory.ts
var providerRegistry2 = {
  deepgram: DeepgramSttProvider,
  sarvam: SarvamSttProvider
};
var SttProviderFactory = class {
  /**
   * Create an STT provider instance.
   * @throws Error if provider is not registered
   */
  static create(provider) {
    const ProviderClass = providerRegistry2[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown STT provider: ${provider}. Available: ${Object.keys(providerRegistry2).join(", ")}`);
    }
    return new ProviderClass();
  }
  /**
   * Get list of available STT providers
   */
  static getAvailableProviders() {
    return Object.keys(providerRegistry2);
  }
  /**
   * Check if a provider is registered
   */
  static isAvailable(provider) {
    return provider in providerRegistry2;
  }
  /**
   * Register a custom STT provider at runtime (plugin extensibility)
   */
  static register(name, providerClass) {
    providerRegistry2[name] = providerClass;
    console.log(`[STT Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/services/providers/llm/openrouter-llm.provider.ts
import axios4 from "axios";

// plugins/custom-voice-engine/services/providers/llm/llm-provider.interface.ts
var BaseLlmProvider = class {
};

// plugins/custom-voice-engine/services/providers/llm/openrouter-llm.provider.ts
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
var OpenRouterLlmProvider = class extends BaseLlmProvider {
  name = "openrouter";
  async complete(messages, config, tools2) {
    const startTime = Date.now();
    const payload = {
      model: config.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...m.toolCallId ? { tool_call_id: m.toolCallId } : {},
        ...m.toolCalls ? { tool_calls: m.toolCalls } : {}
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 500,
      top_p: config.topP ?? 1,
      frequency_penalty: config.frequencyPenalty ?? 0,
      presence_penalty: config.presencePenalty ?? 0
    };
    if (tools2 && tools2.length > 0) {
      payload.tools = tools2;
      payload.tool_choice = "auto";
    }
    try {
      const response = await axios4.post(OPENROUTER_API_URL, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://zonvo.tech",
          "X-Title": "Zonvo AI Voice Engine"
        },
        timeout: 6e4
      });
      const data = response.data;
      const choice = data.choices?.[0];
      const latencyMs = Date.now() - startTime;
      return {
        content: choice?.message?.content || null,
        toolCalls: choice?.message?.tool_calls,
        finishReason: choice?.finish_reason || "stop",
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        model: data.model || config.model,
        latencyMs
      };
    } catch (err) {
      const statusCode = err.response?.status;
      const errorMsg = err.response?.data?.error?.message || err.message;
      if (statusCode === 429) {
        throw new Error(`OpenRouter rate limited: ${errorMsg}`);
      }
      if (statusCode === 402) {
        throw new Error(`OpenRouter insufficient credits: ${errorMsg}`);
      }
      throw new Error(`OpenRouter LLM error (${statusCode}): ${errorMsg}`);
    }
  }
  async *stream(messages, config, tools2) {
    const payload = {
      model: config.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...m.toolCallId ? { tool_call_id: m.toolCallId } : {},
        ...m.toolCalls ? { tool_calls: m.toolCalls } : {}
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 500,
      top_p: config.topP ?? 1,
      stream: true
    };
    if (tools2 && tools2.length > 0) {
      payload.tools = tools2;
      payload.tool_choice = "auto";
    }
    const controller = new AbortController();
    const STREAM_CHUNK_TIMEOUT_MS = 3e4;
    let inactivityTimer = null;
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        controller.abort();
      }, STREAM_CHUNK_TIMEOUT_MS);
    };
    resetInactivityTimer();
    try {
      const response = await axios4.post(OPENROUTER_API_URL, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://zonvo.tech",
          "X-Title": "Zonvo AI Voice Engine"
        },
        responseType: "stream",
        timeout: 6e4,
        signal: controller.signal
      });
      const stream = response.data;
      let buffer = "";
      for await (const rawChunk of stream) {
        resetInactivityTimer();
        buffer += rawChunk.toString();
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            const finishReason = parsed.choices?.[0]?.finish_reason;
            if (delta) {
              const chunk = {};
              if (delta.content) chunk.content = delta.content;
              if (delta.tool_calls) chunk.toolCalls = delta.tool_calls;
              if (finishReason) chunk.finishReason = finishReason;
              yield chunk;
            }
          } catch {
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError" || err.code === "ERR_CANCELED" || controller.signal.aborted) {
        throw new Error(`OpenRouter stream timed out after ${STREAM_CHUNK_TIMEOUT_MS / 1e3}s of inactivity`);
      }
      throw err;
    } finally {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    }
  }
};

// plugins/custom-voice-engine/services/providers/llm/llm-provider.factory.ts
var providerRegistry3 = {
  openrouter: OpenRouterLlmProvider
};
var LlmProviderFactory = class {
  static create(provider) {
    const ProviderClass = providerRegistry3[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown LLM provider: ${provider}. Available: ${Object.keys(providerRegistry3).join(", ")}`);
    }
    return new ProviderClass();
  }
  static getAvailableProviders() {
    return Object.keys(providerRegistry3);
  }
  static isAvailable(provider) {
    return provider in providerRegistry3;
  }
  static register(name, providerClass) {
    providerRegistry3[name] = providerClass;
    console.log(`[LLM Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/vad-detector.ts
var VadDetector = class {
  config;
  state = "silence";
  speechStartTime = 0;
  silenceStartTime = 0;
  lastEnergyValues = [];
  energyWindowSize = 10;
  constructor(config) {
    this.config = { ...DEFAULT_VAD_CONFIG, ...config };
    this.silenceStartTime = Date.now();
  }
  /**
   * Process a chunk of PCM audio and return VAD result.
   * Audio must be linear16 (signed 16-bit little-endian).
   */
  processChunk(chunk, isPlayingTts = false) {
    const energy = this.calculateEnergy(chunk);
    this.lastEnergyValues.push(energy);
    if (this.lastEnergyValues.length > this.energyWindowSize) {
      this.lastEnergyValues.shift();
    }
    const smoothedEnergy = this.lastEnergyValues.reduce((a, b) => a + b, 0) / this.lastEnergyValues.length;
    const threshold = isPlayingTts ? 0.06 : this.config.energyThreshold;
    const isSpeech = smoothedEnergy > threshold;
    const now = Date.now();
    let isSpeechStart = false;
    let isSpeechEnd = false;
    if (isSpeech) {
      if (this.state === "silence" || this.state === "uncertain") {
        if (this.speechStartTime === 0) {
          this.speechStartTime = now;
        }
        if (now - this.speechStartTime >= this.config.speechThresholdMs) {
          if (this.state !== "speech") {
            isSpeechStart = true;
            this.state = "speech";
          }
        } else {
          this.state = "uncertain";
        }
      }
      this.silenceStartTime = 0;
    } else {
      if (this.state === "speech" || this.state === "uncertain") {
        if (this.silenceStartTime === 0) {
          this.silenceStartTime = now;
        }
        if (now - this.silenceStartTime >= this.config.silenceThresholdMs) {
          if (this.state === "speech") {
            isSpeechEnd = true;
          }
          this.state = "silence";
          this.speechStartTime = 0;
        }
      }
    }
    const speechDurationMs = this.state === "speech" && this.speechStartTime > 0 ? now - this.speechStartTime : 0;
    const silenceDurationMs = this.state === "silence" && this.silenceStartTime > 0 ? now - this.silenceStartTime : 0;
    return {
      state: this.state,
      energy: smoothedEnergy,
      speechDurationMs,
      silenceDurationMs,
      isSpeechStart,
      isSpeechEnd
    };
  }
  /**
   * Reset VAD state (e.g., after TTS playback ends)
   */
  reset() {
    this.state = "silence";
    this.speechStartTime = 0;
    this.silenceStartTime = Date.now();
    this.lastEnergyValues = [];
  }
  /**
   * Get current state
   */
  getState() {
    return this.state;
  }
  /**
   * Calculate RMS energy of a PCM buffer (linear16, signed 16-bit LE)
   */
  calculateEnergy(buffer) {
    if (buffer.length < 2) return 0;
    let sumSquares = 0;
    const sampleCount = Math.floor(buffer.length / 2);
    for (let i = 0; i < buffer.length - 1; i += 2) {
      const sample = buffer.readInt16LE(i);
      const normalized = sample / 32768;
      sumSquares += normalized * normalized;
    }
    return Math.sqrt(sumSquares / sampleCount);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/audio-session.ts
function writeWavHeader(samplesLength, sampleRate, numChannels, bitsPerSample) {
  const header = Buffer.alloc(44);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = samplesLength * blockAlign;
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  return header;
}
var AudioSession = class extends EventEmitter {
  id;
  channelUuid;
  isTransferred = false;
  session;
  agentConfig;
  sttConfig;
  llmConfig;
  ttsConfig;
  // Pipeline components
  sttProvider = null;
  llmProvider = null;
  ttsProvider = null;
  vadDetector;
  // State
  isProcessingLlm = false;
  isPlayingTts = false;
  sampleRateWarned = false;
  ttsGeneration = 0;
  lastTtsEndTime = 0;
  pendingTranscript = "";
  finalTranscriptTimer = null;
  conversationMessages = [];
  sessionStartTime;
  destroyed = false;
  silenceWarningCount = 0;
  initialized = false;
  isDemoUser = false;
  demoLimitTimeoutId = null;
  isCallAnswered = false;
  firstMessageTriggered = false;
  callAnsweredTime = 0;
  lastIncomingWriteEnd = 0;
  lastOutgoingWriteEnd = 0;
  // Recording buffer
  pcmBuffer = Buffer.alloc(0);
  totalIncomingBytes = 0;
  bargeInPreBuffer = Buffer.alloc(0);
  // Idle timeout
  idleTimeoutId = null;
  lastUserActivityTime = 0;
  // Audio output callback (sends audio back to FreeSWITCH)
  audioOutCallback = null;
  // Sends a control/JSON text frame to mod_audio_fork over this session's
  // websocket (used by the streaming `playAudio` / `killAudio` protocol).
  controlOutCallback = null;
  // Experimental gap-free streaming playback. OFF by default so live calls keep
  // using the proven file-per-sentence uuid_broadcast path until streaming is
  // validated on real phone calls. Set VE_STREAMING_PLAYBACK=true to enable it.
  // (On this deployment mod_audio_fork turns each streamed block into its own
  // uuid_broadcast, so streaming must be A/B tested on real calls before it can
  // safely become the default.)
  streamingPlayback = process.env.VE_STREAMING_PLAYBACK === "true";
  // Tool calling
  tools = [];
  toolMetadata = /* @__PURE__ */ new Map();
  accumulatedToolCalls = /* @__PURE__ */ new Map();
  // Pre-synthesized greeting audio (the static firstMessage). Synthesized during
  // initialize() so the greeting plays immediately on answer instead of paying a
  // cold TTS round-trip on the critical path. Falls back to live synthesis on miss.
  greetingAudioCache = null;
  greetingCacheText = null;
  preSynthesizePromise = null;
  // Latency instrumentation: marks the start of the current turn (caller finished
  // speaking) so we can log STT→LLM→TTS→playback timings per turn.
  turnStartTime = 0;
  constructor(sessionId, session, agentConfig, sttConfig, llmConfig, ttsConfig, vadConfig, tools2, toolMetadata) {
    super();
    this.id = sessionId;
    this.session = session;
    this.agentConfig = agentConfig;
    this.sttConfig = sttConfig;
    this.llmConfig = llmConfig;
    this.ttsConfig = ttsConfig;
    this.vadDetector = new VadDetector(vadConfig);
    this.sessionStartTime = Date.now();
    this.isCallAnswered = session.direction === "inbound";
    if (this.isCallAnswered) {
      this.callAnsweredTime = Date.now();
    }
    if (tools2) this.tools = tools2;
    if (toolMetadata) this.toolMetadata = toolMetadata;
  }
  isInitialized() {
    return this.initialized;
  }
  get direction() {
    return this.session.direction;
  }
  get userId() {
    return this.session.userId;
  }
  /**
   * Initialize the audio pipeline (connect STT, prepare LLM/TTS)
   */
  async initialize() {
    if (this.initialized) return;
    this.initialized = true;
    try {
      this.sttProvider = SttProviderFactory.create(this.sttConfig.provider);
      await this.sttProvider.connect(this.sttConfig, DEFAULT_TELEPHONY_FORMAT);
      this.sttProvider.onTranscript((transcript) => {
        this.handleSttTranscript(transcript);
      });
      this.sttProvider.onError((error) => {
        this.emitPipelineEvent({
          type: "error",
          sessionId: this.id,
          error: `STT error: ${error.message}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      });
      this.llmProvider = LlmProviderFactory.create(this.llmConfig.provider);
      this.ttsProvider = TtsProviderFactory.create(this.ttsConfig.provider);
      this.preSynthesizePromise = this.preSynthesizeGreeting();
      const now = /* @__PURE__ */ new Date();
      const formatterOptions = { timeZone: "Asia/Kolkata" };
      const dateContext = [
        `

---`,
        `**Current date/time context (use this for all date calculations):**`,
        `- Today's date: ${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", ...formatterOptions })}`,
        `- ISO date: ${now.toLocaleDateString("en-CA", formatterOptions)}   (YYYY-MM-DD format \u2014 always use this format for appointmentDate)`,
        `- Current time: ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, ...formatterOptions })}`,
        `- Day of week: ${now.toLocaleDateString("en-US", { weekday: "long", ...formatterOptions })}`,
        `When the user says "today", use ${now.toLocaleDateString("en-CA", formatterOptions)}. When they say "tomorrow", use ${new Date(now.getTime() + 864e5).toLocaleDateString("en-CA", formatterOptions)}.`
      ].join("\n");
      const baseSystemPrompt = this.llmConfig.systemPrompt || this.agentConfig.systemPrompt || "";
      const finalPromptContent = this.llmConfig.systemPrompt ? baseSystemPrompt : baseSystemPrompt + dateContext;
      this.conversationMessages.push({
        role: "system",
        content: finalPromptContent
      });
      this.updateStatus("active");
      this.emitPipelineEvent({
        type: "session_start",
        sessionId: this.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      try {
        const userResult = await db.execute(sql17`
          SELECT email FROM users WHERE id = ${this.userId} LIMIT 1
        `);
        if (userResult.rows[0]?.email === "demo@diploy.in") {
          this.isDemoUser = true;
          console.log(`[AudioSession:${this.id}] Demo user detected. Enforcing 3 minute call duration limit.`);
          if (this.isCallAnswered) {
            this.startDemoCallDurationLimit();
          }
        }
      } catch (err) {
        console.warn(`[AudioSession:${this.id}] Failed to check demo user status:`, err.message);
      }
      console.log(`[AudioSession:${this.id}] Pipeline initialized. direction=${this.session.direction}, answered=${this.isCallAnswered}`);
    } catch (err) {
      this.updateStatus("failed");
      throw new Error(`Pipeline initialization failed: ${err.message}`);
    }
  }
  startDemoCallDurationLimit() {
    if (!this.isDemoUser || this.demoLimitTimeoutId) return;
    console.log(`[AudioSession:${this.id}] Starting 3-minute demo call limit timer.`);
    this.demoLimitTimeoutId = setTimeout(async () => {
      console.log(`[AudioSession:${this.id}] Enforcing 3-minute call duration limit. Hanging up.`);
      this.emit("hangup", "demo_limit_exceeded");
    }, 3 * 60 * 1e3);
  }
  /**
   * Pre-synthesize the static greeting audio during pipeline init.
   * Runs in the background (fire-and-forget). On success the greeting plays
   * from memory on answer; on any failure we simply fall back to live synthesis.
   */
  async preSynthesizeGreeting() {
    const greeting = this.agentConfig.firstMessage;
    if (!greeting || !this.ttsProvider) return;
    try {
      const startTime = Date.now();
      const chunks = [];
      const config = { ...this.ttsConfig };
      if (this.agentConfig.detectLanguageEnabled) {
        config.language = this.detectTtsLanguage(greeting, config.language || "en-IN");
      }
      for await (const audioChunk of this.ttsProvider.synthesizeStream(greeting, config)) {
        chunks.push(audioChunk);
      }
      if (chunks.length > 0 && !this.destroyed) {
        this.greetingAudioCache = Buffer.concat(chunks);
        this.greetingCacheText = greeting;
        console.log(`[AudioSession:${this.id}] [latency] Greeting pre-synthesized in ${Date.now() - startTime}ms (${this.greetingAudioCache.length} bytes cached)`);
      }
    } catch (err) {
      console.warn(`[AudioSession:${this.id}] Greeting pre-synthesis failed (will fall back to live TTS): ${err.message}`);
    }
  }
  async triggerFirstMessage() {
    if (this.firstMessageTriggered) {
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - already triggered, returning`);
      return;
    }
    this.firstMessageTriggered = true;
    if (!this.agentConfig.firstMessage) {
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - no firstMessage configured`);
      return;
    }
    const greetingStart = Date.now();
    const isCached = this.greetingCacheText === this.agentConfig.firstMessage && !!this.greetingAudioCache;
    console.log(`[AudioSession:${this.id}] triggerFirstMessage - speaking first message: "${this.agentConfig.firstMessage}" (cached=${isCached})`);
    if (isCached) {
      await this.speakText(this.agentConfig.firstMessage);
    } else {
      const sentences = this.splitIntoSentences(this.agentConfig.firstMessage);
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - split uncached greeting into ${sentences.length} sentences`);
      for (const sentence of sentences) {
        this.queueTts(sentence);
      }
      while (this.isProcessingTtsQueue || this.ttsQueue.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    this.conversationMessages.push({
      role: "assistant",
      content: this.agentConfig.firstMessage
    });
    console.log(`[AudioSession:${this.id}] [latency] triggerFirstMessage - done in ${Date.now() - greetingStart}ms`);
  }
  /**
   * Yield TTS audio for `text`. If we have a matching pre-synthesized buffer
   * (the greeting), stream it from memory in provider-sized frames; otherwise
   * fall through to live provider synthesis. Keeps speakText's mixing/offset
   * logic identical for both paths.
   */
  async *getTtsStream(text2) {
    if (text2 === this.agentConfig.firstMessage && this.preSynthesizePromise) {
      try {
        await this.preSynthesizePromise;
      } catch (err) {
        console.warn(`[AudioSession:${this.id}] Failed waiting for greeting pre-synthesis: ${err.message}`);
      }
    }
    if (this.greetingAudioCache && this.greetingCacheText === text2) {
      const cached = this.greetingAudioCache;
      const chunkSize = 640;
      for (let offset = 0; offset < cached.length; offset += chunkSize) {
        yield cached.subarray(offset, Math.min(offset + chunkSize, cached.length));
      }
      return;
    }
    const config = { ...this.ttsConfig };
    if (this.agentConfig.detectLanguageEnabled) {
      config.language = this.detectTtsLanguage(text2, config.language || "en-IN");
    }
    yield* this.ttsProvider.synthesizeStream(text2, config);
  }
  async enableAudio() {
    if (!this.isCallAnswered) {
      console.log(`[AudioSession:${this.id}] enableAudio - marking answered`);
      this.isCallAnswered = true;
      this.callAnsweredTime = Date.now();
      this.startDemoCallDurationLimit();
    } else {
      console.log(`[AudioSession:${this.id}] enableAudio - already answered`);
    }
  }
  async markCallAnswered() {
    if (!this.isCallAnswered) {
      console.log(`[AudioSession:${this.id}] callAnswered - marking answered, triggering first message`);
      this.isCallAnswered = true;
      this.callAnsweredTime = Date.now();
      this.startDemoCallDurationLimit();
      this.emit("callAnswered");
    }
    await this.triggerFirstMessage();
  }
  /**
   * Process incoming audio from FreeSWITCH (mod_audio_fork)
   */
  processAudio(chunk) {
    if (this.destroyed) return;
    if (!this.isCallAnswered) return;
    const elapsedMs = Math.max(0, Date.now() - this.callAnsweredTime);
    let startOffset = Math.round(elapsedMs * 8) * 2;
    if (startOffset < this.lastIncomingWriteEnd) {
      startOffset = this.lastIncomingWriteEnd;
    }
    this.mixAudioAtOffset(chunk, startOffset);
    this.lastIncomingWriteEnd = startOffset + chunk.length;
    const timeSinceLastTts = Date.now() - this.lastTtsEndTime;
    const isWithinEchoGuardWindow = timeSinceLastTts < 250;
    if (!isWithinEchoGuardWindow) {
      const vadResult = this.vadDetector.processChunk(chunk, this.isPlayingTts);
      if (vadResult.isSpeechEnd) {
        console.log(`[AudioSession:${this.id}] VAD isSpeechEnd, provider=${this.sttProvider?.name}, hasFlush=${typeof this.sttProvider?.flush === "function"}, playingTts=${this.isPlayingTts}`);
      }
      if (vadResult.isSpeechStart) {
        this.clearIdleTimeout();
        this.silenceWarningCount = 0;
        if (this.isPlayingTts && this.agentConfig.interruptible) {
          this.handleInterruption();
        }
      }
      if (vadResult.isSpeechEnd && this.sttProvider?.flush) {
        console.log(`[AudioSession:${this.id}] Calling STT flush`);
        this.sttProvider.flush().catch((err) => {
          console.error(`[AudioSession:${this.id}] STT flush error:`, err.message);
        });
      }
    }
    const canSendAudio = !this.isPlayingTts;
    if (canSendAudio) {
      this.bargeInPreBuffer = Buffer.alloc(0);
      if (!isWithinEchoGuardWindow && this.sttProvider?.isConnected()) {
        this.sttProvider.sendAudio(chunk);
      }
    } else {
      const maxPreBufferBytes = 16e3;
      this.bargeInPreBuffer = Buffer.concat([this.bargeInPreBuffer, chunk]);
      if (this.bargeInPreBuffer.length > maxPreBufferBytes) {
        this.bargeInPreBuffer = this.bargeInPreBuffer.slice(this.bargeInPreBuffer.length - maxPreBufferBytes);
      }
    }
    const answeredTime = this.callAnsweredTime > 0 ? this.callAnsweredTime : this.sessionStartTime;
    const elapsed = (Date.now() - answeredTime) / 1e3;
    if (elapsed >= this.agentConfig.maxDurationSeconds) {
      this.end("timeout");
    }
  }
  /**
   * Set callback for sending audio back to caller
   */
  onAudioOut(callback) {
    this.audioOutCallback = callback;
  }
  /**
   * Set callback for sending control/JSON frames (playAudio / killAudio) to
   * mod_audio_fork over this session's websocket. Required for streaming playback.
   */
  onControlOut(callback) {
    this.controlOutCallback = callback;
  }
  /** True when gap-free streaming playback is active for this session. */
  get isStreamingPlayback() {
    return this.streamingPlayback && !!this.controlOutCallback;
  }
  // ── Private: Idle Timeout ──────────────────────────────
  getSilenceMessages() {
    const lang = this.agentConfig.language || "en";
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();
    switch (baseLang) {
      case "hi":
        return {
          warning: "\u0928\u092E\u0938\u094D\u0924\u0947, \u0915\u094D\u092F\u093E \u0906\u092A \u0935\u0939\u0940\u0902 \u0939\u0948\u0902? \u092E\u0941\u091D\u0947 \u0906\u092A\u0915\u0940 \u0906\u0935\u093E\u091C\u093C \u0928\u0939\u0940\u0902 \u0906 \u0930\u0939\u0940 \u0939\u0948\u0964",
          end: "\u091A\u0942\u0902\u0915\u093F \u0906\u092A\u0915\u0940 \u0906\u0935\u093E\u091C\u093C \u0928\u0939\u0940\u0902 \u0906 \u0930\u0939\u0940 \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0939\u092E \u0907\u0938 \u0915\u0949\u0932 \u0915\u094B \u0938\u092E\u093E\u092A\u094D\u0924 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964 \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964"
        };
      case "ta":
        return {
          warning: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0B99\u0BCD\u0B95\u0BC7 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE? \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
          end: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBE\u0BA4\u0BA4\u0BBE\u0BB2\u0BCD, \u0BA8\u0BBE\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB4\u0BC8\u0BAA\u0BCD\u0BAA\u0BC8 \u0BAE\u0BC1\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BCB\u0BAE\u0BCD. \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF."
        };
      case "te":
        return {
          warning: "\u0C39\u0C32\u0C4B, \u0C2E\u0C40\u0C30\u0C41 \u0C05\u0C15\u0C4D\u0C15\u0C21\u0C47 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E? \u0C2E\u0C40 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C35\u0C3F\u0C28\u0C2A\u0C21\u0C21\u0C02 \u0C32\u0C47\u0C26\u0C41.",
          end: "\u0C2E\u0C40 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C35\u0C3F\u0C28\u0C2A\u0C21\u0C28\u0C02\u0C26\u0C41\u0C28, \u0C2E\u0C47\u0C2E\u0C41 \u0C15\u0C3E\u0C32\u0C4D \u0C2E\u0C41\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2E\u0C41. \u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41."
        };
      case "kn":
        return {
          warning: "\u0CB9\u0CB2\u0CCB, \u0CA8\u0CC0\u0CB5\u0CC1 \u0C85\u0CB2\u0CCD\u0CB2\u0CC7 \u0C87\u0CA6\u0CCD\u0CA6\u0CC0\u0CB0\u0CBE? \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CB2\u0CCD\u0CB2.",
          end: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CA6 \u0C95\u0CBE\u0CB0\u0CA3, \u0CA8\u0CBE\u0CB5\u0CC1 \u0C95\u0CB0\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAE\u0CC1\u0C95\u0CCD\u0CA4\u0CBE\u0CAF\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CB5\u0CC6. \u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1."
        };
      default:
        return {
          warning: "Hello, are you still there? I can't hear you.",
          end: "Since you are not audible, we are ending this call now. Goodbye."
        };
    }
  }
  resetIdleTimeout() {
    this.clearIdleTimeout();
    if (this.destroyed) return;
    const timeoutMs = this.agentConfig.silenceTimeoutMs || 15e3;
    const warningInterval = Math.max(5e3, Math.floor(timeoutMs / 2));
    this.idleTimeoutId = setTimeout(async () => {
      if (this.destroyed) return;
      const messages = this.getSilenceMessages();
      if (this.silenceWarningCount === 0) {
        this.silenceWarningCount++;
        console.log(`[AudioSession:${this.id}] Silence warning triggered, speaking check-in`);
        await this.speakText(messages.warning);
        this.resetIdleTimeout();
      } else {
        console.log(`[AudioSession:${this.id}] Second silence timeout reached, ending call`);
        await this.speakText(messages.end);
        setTimeout(() => {
          this.end("timeout");
        }, 2500);
      }
    }, warningInterval);
  }
  clearIdleTimeout() {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
      this.idleTimeoutId = null;
    }
  }
  /**
   * End the session
   */
  async end(reason = "normal") {
    if (this.destroyed) return;
    this.clearIdleTimeout();
    if (this.demoLimitTimeoutId) {
      clearTimeout(this.demoLimitTimeoutId);
      this.demoLimitTimeoutId = null;
    }
    const answeredTime = this.callAnsweredTime > 0 ? this.callAnsweredTime : this.sessionStartTime;
    this.session.durationSeconds = Math.floor((Date.now() - answeredTime) / 1e3);
    this.session.endedAt = /* @__PURE__ */ new Date();
    this.updateStatus("completing");
    if (this.finalTranscriptTimer) {
      clearTimeout(this.finalTranscriptTimer);
      this.finalTranscriptTimer = null;
    }
    try {
      if (this.sttProvider) await this.sttProvider.close();
    } catch {
    }
    this.destroyed = true;
    console.log(`[AudioSession:${this.id}] Session ending. pcmBuffer size: ${this.pcmBuffer.length} bytes. totalIncomingBytes: ${this.totalIncomingBytes}`);
    if (this.pcmBuffer.length > 0) {
      try {
        const expectedBufferBytes = Math.round(this.session.durationSeconds * 8e3 * 2);
        const trimmedBuffer = this.pcmBuffer.length > expectedBufferBytes ? this.pcmBuffer.slice(0, expectedBufferBytes) : this.pcmBuffer;
        if (trimmedBuffer.length !== this.pcmBuffer.length) {
          console.log(`[AudioSession:${this.id}] Trimmed pcmBuffer: ${this.pcmBuffer.length} -> ${trimmedBuffer.length} bytes (removed ${this.pcmBuffer.length - trimmedBuffer.length} trailing silence bytes)`);
        }
        const samplesCount = trimmedBuffer.length / 2;
        const durationSeconds = Math.round(samplesCount / 8e3);
        console.log(`[AudioSession:${this.id}] Preparing to save WAV recording. Samples: ${samplesCount}, Duration: ${durationSeconds}s`);
        const recordingsDir = path.join(process.cwd(), "client", "public", "uploads", "recordings");
        if (!fs.existsSync(recordingsDir)) {
          console.log(`[AudioSession:${this.id}] Creating recordings directory: ${recordingsDir}`);
          fs.mkdirSync(recordingsDir, { recursive: true });
        }
        const wavHeader = writeWavHeader(samplesCount, 8e3, 1, 16);
        const wavBuffer = Buffer.concat([wavHeader, trimmedBuffer]);
        const fileName = `${this.id}.wav`;
        const storagePath = path.join(recordingsDir, fileName);
        const storageUrl = `/uploads/recordings/${fileName}`;
        console.log(`[AudioSession:${this.id}] Writing WAV file to disk at: ${storagePath}`);
        await fs.promises.writeFile(storagePath, wavBuffer);
        console.log(`[AudioSession:${this.id}] WAV file successfully written to disk. File size: ${wavBuffer.length} bytes`);
        const textTranscript = typeof this.session.transcript === "string" ? this.session.transcript : JSON.stringify(this.session.transcript || []);
        console.log(`[AudioSession:${this.id}] Inserting recording metadata into ve_call_recordings table...`);
        await db.execute(sql17`
          INSERT INTO ve_call_recordings (
            session_id, user_id, call_id, storage_backend, storage_path, storage_url, file_size, duration_seconds, format, status, transcript, created_at
          ) VALUES (
            ${this.id}, ${this.session.userId}, ${this.session.callId || null}, 'local', ${storagePath}, ${storageUrl}, ${wavBuffer.length}, ${durationSeconds}, 'wav', 'available', ${textTranscript}, NOW()
          )
        `);
        console.log(`[AudioSession:${this.id}] Successfully saved local recording to database with storageUrl: ${storageUrl}`);
      } catch (err) {
        console.error(`[AudioSession:${this.id}] Failed to save local recording:`, err.stack || err.message);
      }
    } else {
      console.warn(`[AudioSession:${this.id}] Warning: No audio was recorded for this session. pcmBuffer is empty.`);
    }
    this.updateStatus("completed");
    this.emitPipelineEvent({
      type: "session_end",
      sessionId: this.id,
      reason,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[AudioSession:${this.id}] Ended: ${reason} (${this.session.durationSeconds}s)`);
    this.emit("hangup", reason);
    this.removeAllListeners();
  }
  /**
   * Get current session data
   */
  getSession() {
    return { ...this.session };
  }
  // ── Private: STT Handling ──────────────────────────────
  lastTranscriptText = "";
  lastTranscriptTime = 0;
  handleSttTranscript(transcript) {
    if (this.destroyed) {
      console.log(`[AudioSession:${this.id}] handleSttTranscript - destroyed, ignoring "${transcript.text}"`);
      return;
    }
    this.emitPipelineEvent({
      type: "stt_transcript",
      sessionId: this.id,
      transcript,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (!transcript.isFinal) {
      this.pendingTranscript = transcript.text;
      console.log(`[AudioSession:${this.id}] handleSttTranscript - interim: "${transcript.text}"`);
      return;
    }
    const text2 = transcript.text || this.pendingTranscript;
    console.log(`[AudioSession:${this.id}] handleSttTranscript - FINAL: "${text2}"`);
    if (text2 && this.lastTranscriptText === text2 && Date.now() - this.lastTranscriptTime < 3e3) {
      console.log(`[AudioSession:${this.id}] Skipping duplicate transcript: "${text2}"`);
      return;
    }
    this.lastTranscriptText = text2 || "";
    this.lastTranscriptTime = Date.now();
    this.pendingTranscript = "";
    if (!text2.trim()) return;
    this.lastUserActivityTime = Date.now();
    this.clearIdleTimeout();
    if (this.finalTranscriptTimer) {
      clearTimeout(this.finalTranscriptTimer);
    }
    this.processUserUtterance(text2);
  }
  // ── Private: TTS Queue ────────────────────────────────
  ttsQueue = [];
  isProcessingTtsQueue = false;
  async processTtsQueue() {
    if (this.isProcessingTtsQueue || this.ttsQueue.length === 0 || this.destroyed) return;
    this.isProcessingTtsQueue = true;
    const drainGeneration = this.ttsGeneration;
    const useStreaming = this.streamingPlayback && !!this.controlOutCallback;
    console.log(`[AudioSession:${this.id}] processTtsQueue - START (${this.ttsQueue.length} items, streaming=${useStreaming})`);
    let prefetchText = null;
    let prefetchPromise = null;
    while ((this.ttsQueue.length > 0 || prefetchPromise) && !this.destroyed) {
      if (this.ttsGeneration !== drainGeneration) {
        this.ttsQueue.length = 0;
        break;
      }
      let text2;
      let audio;
      if (prefetchPromise) {
        text2 = prefetchText;
        audio = await prefetchPromise;
        prefetchPromise = null;
        prefetchText = null;
      } else {
        text2 = this.ttsQueue.shift();
        audio = useStreaming ? null : await this.synthesizeSentence(text2);
      }
      if (this.ttsGeneration !== drainGeneration) {
        this.ttsQueue.length = 0;
        break;
      }
      if (this.ttsQueue.length > 0 && !this.destroyed) {
        prefetchText = this.ttsQueue.shift();
        prefetchPromise = this.synthesizeSentence(prefetchText);
      }
      await this.speakText(text2, audio);
    }
    this.isProcessingTtsQueue = false;
    console.log(`[AudioSession:${this.id}] processTtsQueue - DONE`);
    this.resetIdleTimeout();
  }
  /**
   * Synthesize a full sentence into a single PCM buffer. Runs independently of
   * playback so processTtsQueue can prefetch the next sentence while the current
   * one is still playing. Returns null if nothing was produced.
   */
  async synthesizeSentence(text2) {
    if (this.destroyed || !this.ttsProvider) return null;
    try {
      const chunks = [];
      let firstChunkLogged = false;
      for await (const audioChunk of this.getTtsStream(text2)) {
        if (this.destroyed) break;
        if (!firstChunkLogged) {
          firstChunkLogged = true;
          if (this.turnStartTime > 0) {
            console.log(`[AudioSession:${this.id}] [latency] First TTS audio byte ${Date.now() - this.turnStartTime}ms after turn start`);
          }
        }
        chunks.push(audioChunk);
      }
      return chunks.length > 0 ? Buffer.concat(chunks) : null;
    } catch (err) {
      console.error(`[AudioSession:${this.id}] TTS synthesis error:`, err.message);
      return null;
    }
  }
  queueTts(text2) {
    this.ttsQueue.push(text2);
    console.log(`[AudioSession:${this.id}] queueTts - queued "${text2.substring(0, 50)}..." (queue size: ${this.ttsQueue.length})`);
    if (!this.isProcessingTtsQueue) {
      this.processTtsQueue();
    }
  }
  // ── Private: LLM Processing ────────────────────────────
  pendingUtterances = [];
  async processNextUtterance() {
    if (this.destroyed || this.isProcessingLlm || this.pendingUtterances.length === 0) return;
    const text2 = this.pendingUtterances.shift();
    await this.processUserUtterance(text2);
  }
  async processUserUtterance(text2) {
    if (this.destroyed) return;
    if (this.isProcessingLlm) {
      console.log(`[AudioSession:${this.id}] processUserUtterance - LLM busy, queueing: "${text2}"`);
      this.pendingUtterances.push(text2);
      return;
    }
    this.isProcessingLlm = true;
    this.turnStartTime = Date.now();
    console.log(`[AudioSession:${this.id}] processUserUtterance - START: "${text2}"`);
    this.clearIdleTimeout();
    this.conversationMessages.push({ role: "user", content: text2 });
    this.addTranscriptEntry("user", text2);
    this.emitPipelineEvent({
      type: "llm_start",
      sessionId: this.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      const startTime = Date.now();
      let fullResponse = "";
      let sentenceBuffer = "";
      this.accumulatedToolCalls.clear();
      const stream = this.llmProvider.stream(
        this.conversationMessages,
        this.llmConfig,
        this.tools.length > 0 ? this.tools : void 0
      );
      let firstTokenLogged = false;
      for await (const chunk of stream) {
        if (this.destroyed) break;
        if (chunk.content) {
          if (!firstTokenLogged) {
            firstTokenLogged = true;
            console.log(`[AudioSession:${this.id}] [latency] LLM first token ${Date.now() - this.turnStartTime}ms after turn start`);
          }
          fullResponse += chunk.content;
          sentenceBuffer += chunk.content;
          const sentenceEnd = this.findSentenceEnd(sentenceBuffer);
          if (sentenceEnd !== -1) {
            const sentence = sentenceBuffer.substring(0, sentenceEnd + 1).trim();
            sentenceBuffer = sentenceBuffer.substring(sentenceEnd + 1);
            if (sentence) {
              this.queueTts(sentence);
            }
          }
        }
        if (chunk.toolCalls) {
          for (const deltaTc of chunk.toolCalls) {
            if (deltaTc.index === void 0) continue;
            const existing = this.accumulatedToolCalls.get(deltaTc.index) || {};
            if (deltaTc.id) existing.id = deltaTc.id;
            if (deltaTc.type) existing.type = deltaTc.type;
            if (deltaTc.function) {
              if (!existing.function) existing.function = { name: "", arguments: "" };
              if (deltaTc.function.name) existing.function.name = (existing.function.name || "") + deltaTc.function.name;
              if (deltaTc.function.arguments) existing.function.arguments = (existing.function.arguments || "") + deltaTc.function.arguments;
            }
            this.accumulatedToolCalls.set(deltaTc.index, existing);
          }
        }
      }
      const toolCallEntries = Array.from(this.accumulatedToolCalls.entries()).sort(([a], [b]) => a - b).map(([_, tc]) => tc).filter((tc) => tc.id && tc.function?.name);
      if (toolCallEntries.length > 0) {
        console.log(`[AudioSession:${this.id}] LLM returned ${toolCallEntries.length} tool calls, executing...`);
        this.conversationMessages.push({
          role: "assistant",
          content: fullResponse || null,
          toolCalls: toolCallEntries
        });
        let hasEndCall = false;
        for (const tc of toolCallEntries) {
          console.log(`[AudioSession:${this.id}] Tool call: ${tc.function.name}(${tc.function.arguments})`);
          const metadata = this.toolMetadata.get(tc.function.name);
          const result = await ToolExecutor.executeToolCall(
            tc,
            metadata,
            this.session.userId,
            this.agentConfig.id,
            this.session.callId,
            this
          );
          if (tc.function.name === "end_call") {
            hasEndCall = true;
          }
          this.conversationMessages.push({
            role: "tool",
            content: JSON.stringify(result.result),
            toolCallId: tc.id
          });
          this.emitPipelineEvent({
            type: "llm_tool_call",
            sessionId: this.id,
            toolCall: tc,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        if (hasEndCall || this.destroyed) {
          this.session.llmPromptTokens += Math.round(fullResponse.length / 4);
          this.session.llmCompletionTokens += Math.round(fullResponse.length / 4);
          return;
        }
        console.log(`[AudioSession:${this.id}] Streaming follow-up LLM response for tool confirmation...`);
        this.clearIdleTimeout();
        const followUpStartTime = Date.now();
        let followUpFull = "";
        let followUpSentenceBuffer = "";
        const followUpStream = this.llmProvider.stream(
          this.conversationMessages,
          this.llmConfig
        );
        for await (const chunk of followUpStream) {
          if (this.destroyed) break;
          if (chunk.content) {
            followUpFull += chunk.content;
            followUpSentenceBuffer += chunk.content;
            const sentenceEnd = this.findSentenceEnd(followUpSentenceBuffer);
            if (sentenceEnd !== -1) {
              const sentence = followUpSentenceBuffer.substring(0, sentenceEnd + 1).trim();
              followUpSentenceBuffer = followUpSentenceBuffer.substring(sentenceEnd + 1);
              if (sentence) {
                this.queueTts(sentence);
              }
            }
          }
        }
        if (followUpSentenceBuffer.trim() && !this.destroyed) {
          this.queueTts(followUpSentenceBuffer.trim());
        }
        if (followUpFull && !this.destroyed) {
          this.conversationMessages.push({ role: "assistant", content: followUpFull });
          this.session.llmPromptTokens += Math.round(followUpFull.length / 4);
          this.session.llmCompletionTokens += Math.round(followUpFull.length / 4);
          this.emitPipelineEvent({
            type: "llm_response",
            sessionId: this.id,
            response: followUpFull,
            latencyMs: Date.now() - followUpStartTime,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        this.accumulatedToolCalls.clear();
        this.trimConversationHistory();
        return;
      }
      if (sentenceBuffer.trim() && !this.destroyed) {
        this.queueTts(sentenceBuffer.trim());
      }
      const latencyMs = Date.now() - startTime;
      console.log(`[AudioSession:${this.id}] processUserUtterance - LLM done in ${latencyMs}ms, response length: ${fullResponse.length} chars`);
      this.session.llmPromptTokens += Math.round(fullResponse.length / 4);
      this.session.llmCompletionTokens += Math.round(fullResponse.length / 4);
      this.conversationMessages.push({ role: "assistant", content: fullResponse });
      this.trimConversationHistory();
      this.emitPipelineEvent({
        type: "llm_response",
        sessionId: this.id,
        response: fullResponse,
        latencyMs,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      console.error(`[AudioSession:${this.id}] LLM error:`, err.message, err.stack);
      this.emitPipelineEvent({
        type: "error",
        sessionId: this.id,
        error: `LLM error: ${err.message}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (!this.destroyed) {
        const fallbackMsg = "I apologize, but I encountered a technical issue. Could you please repeat that?";
        this.conversationMessages.push({ role: "assistant", content: fallbackMsg });
        this.queueTts(fallbackMsg);
      }
    } finally {
      this.isProcessingLlm = false;
      console.log(`[AudioSession:${this.id}] processUserUtterance - DONE, checking for queued utterances (${this.pendingUtterances.length} pending)`);
      this.processNextUtterance();
    }
  }
  // ── Private: TTS Output ────────────────────────────────
  async speakText(text2, preSynth) {
    if (this.streamingPlayback && this.controlOutCallback) {
      return this.speakTextStreaming(text2, preSynth);
    }
    return this.speakTextFile(text2, preSynth);
  }
  async speakTextFile(text2, preSynth) {
    if (this.destroyed || !this.ttsProvider || !this.audioOutCallback) {
      console.log(`[AudioSession:${this.id}] speakText - skipped (destroyed=${this.destroyed}, hasTts=${!!this.ttsProvider}, hasAudioCb=${!!this.audioOutCallback})`);
      return;
    }
    this.clearIdleTimeout();
    const drainGeneration = this.ttsGeneration;
    console.log(`[AudioSession:${this.id}] speakText - START playing: "${text2.substring(0, 60)}..."`);
    this.emitPipelineEvent({
      type: "tts_start",
      sessionId: this.id,
      text: text2,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      let audio = preSynth ?? null;
      if (!audio) {
        const chunks = [];
        let firstChunkLogged = false;
        for await (const audioChunk of this.getTtsStream(text2)) {
          if (this.destroyed || this.ttsGeneration !== drainGeneration) break;
          if (!firstChunkLogged) {
            firstChunkLogged = true;
            if (this.turnStartTime > 0) {
              console.log(`[AudioSession:${this.id}] [latency] First TTS audio byte ${Date.now() - this.turnStartTime}ms after turn start`);
            }
          }
          chunks.push(audioChunk);
        }
        audio = chunks.length > 0 ? Buffer.concat(chunks) : null;
      }
      if (audio) {
        audio = this.ensureTelephonySampleRate(audio);
      }
      if (audio && audio.length > 0 && !this.destroyed && this.ttsGeneration === drainGeneration) {
        this.isPlayingTts = true;
        const totalBytes = audio.length;
        const ttsPlayStartMs = Math.max(0, Date.now() - this.callAnsweredTime);
        let agentWriteOffset = Math.round(ttsPlayStartMs * 8) * 2;
        if (agentWriteOffset < this.lastOutgoingWriteEnd) {
          agentWriteOffset = this.lastOutgoingWriteEnd;
        }
        this.mixAudioAtOffset(audio, agentWriteOffset);
        this.lastOutgoingWriteEnd = agentWriteOffset + totalBytes;
        this.audioOutCallback(audio);
        const playbackDurationMs = Math.round(totalBytes / 16);
        await new Promise((resolve) => setTimeout(resolve, playbackDurationMs));
        this.addTranscriptEntry("assistant", text2);
        console.log(`[AudioSession:${this.id}] speakText - FINISHED playback (${playbackDurationMs}ms), added to transcript`);
        this.session.ttsCharacters += text2.length;
        this.session.ttsDurationMs += Math.round(totalBytes / 16);
        this.emitPipelineEvent({
          type: "tts_audio",
          sessionId: this.id,
          bytes: totalBytes,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } else {
        console.log(`[AudioSession:${this.id}] speakText - audio DISCARDED (hasAudio=${!!audio}, destroyed=${this.destroyed}, isPlaying=${this.isPlayingTts})`);
      }
    } catch (err) {
      console.error(`[AudioSession:${this.id}] TTS error:`, err.message);
    } finally {
      this.isPlayingTts = false;
      this.lastTtsEndTime = Date.now();
      this.vadDetector.reset();
    }
  }
  /**
   * Streaming playback path (default). Forwards TTS audio to the caller in small
   * blocks as it is produced, over the mod_audio_fork websocket using drachtio's
   * `playAudio` control message. Consecutive blocks — and consecutive sentences —
   * are handed to the module back-to-back with no per-file gap, and the caller
   * starts hearing the agent as soon as the first block is generated. Falls back
   * to the legacy file path when no control channel is available.
   *
   * `preSynth` (a fully synthesized sentence buffer from the prefetch pipeline) is
   * chunked and streamed in blocks; when omitted the audio is streamed live from
   * the TTS provider for the fastest possible first audio.
   */
  async speakTextStreaming(text2, preSynth) {
    if (this.destroyed || !this.controlOutCallback || !this.ttsProvider && !preSynth) {
      return this.speakTextFile(text2, preSynth);
    }
    this.clearIdleTimeout();
    const drainGeneration = this.ttsGeneration;
    console.log(`[AudioSession:${this.id}] speakTextStreaming - START "${text2.substring(0, 60)}..."`);
    this.emitPipelineEvent({
      type: "tts_start",
      sessionId: this.id,
      text: text2,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    const FIRST_FLUSH_BYTES = 1600;
    const FLUSH_BYTES = 8e3;
    let offset = Math.round(Math.max(0, Date.now() - this.callAnsweredTime) * 8) * 2;
    if (offset < this.lastOutgoingWriteEnd) offset = this.lastOutgoingWriteEnd;
    let totalBytes = 0;
    let firstFlushDone = false;
    let firstBlockLogged = false;
    const stopped = () => this.destroyed || this.ttsGeneration !== drainGeneration;
    const flush = async (block) => {
      const out = this.ensureTelephonySampleRate(block);
      if (out.length === 0) return;
      if (offset < this.lastOutgoingWriteEnd) offset = this.lastOutgoingWriteEnd;
      this.mixAudioAtOffset(out, offset);
      offset += out.length;
      this.lastOutgoingWriteEnd = offset;
      totalBytes += out.length;
      this.isPlayingTts = true;
      this.controlOutCallback({
        type: "playAudio",
        data: {
          audioContentType: "raw",
          sampleRate: "8000",
          audioContent: out.toString("base64")
        }
      });
      if (!firstBlockLogged) {
        firstBlockLogged = true;
        if (this.turnStartTime > 0) {
          console.log(`[AudioSession:${this.id}] [latency] First TTS audio sent ${Date.now() - this.turnStartTime}ms after turn start`);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, Math.round(out.length / 16)));
    };
    try {
      let pending = Buffer.alloc(0);
      const source = preSynth ? (async function* () {
        yield preSynth;
      })() : this.getTtsStream(text2);
      for await (const chunk of source) {
        if (stopped()) break;
        pending = pending.length ? Buffer.concat([pending, chunk]) : chunk;
        let threshold = firstFlushDone ? FLUSH_BYTES : FIRST_FLUSH_BYTES;
        while (pending.length >= threshold) {
          const block = Buffer.from(pending.subarray(0, threshold));
          pending = pending.subarray(threshold);
          firstFlushDone = true;
          await flush(block);
          if (stopped()) break;
          threshold = FLUSH_BYTES;
        }
        if (stopped()) break;
      }
      if (!stopped() && pending.length > 0) {
        await flush(Buffer.from(pending));
      }
      if (totalBytes > 0 && this.ttsGeneration === drainGeneration) {
        this.addTranscriptEntry("assistant", text2);
        this.session.ttsCharacters += text2.length;
        this.session.ttsDurationMs += Math.round(totalBytes / 16);
        this.emitPipelineEvent({
          type: "tts_audio",
          sessionId: this.id,
          bytes: totalBytes,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(`[AudioSession:${this.id}] speakTextStreaming - FINISHED (${totalBytes} bytes)`);
      } else {
        console.log(`[AudioSession:${this.id}] speakTextStreaming - stopped/empty (bytes=${totalBytes})`);
      }
    } catch (err) {
      console.error(`[AudioSession:${this.id}] streaming TTS error:`, err.message);
    } finally {
      this.isPlayingTts = false;
      this.lastTtsEndTime = Date.now();
      this.vadDetector.reset();
    }
  }
  mixAudioAtOffset(chunk, startOffset) {
    if (this.destroyed || chunk.length === 0) return;
    const endOffset = startOffset + chunk.length;
    if (endOffset > this.pcmBuffer.length) {
      const newBuffer = Buffer.alloc(endOffset);
      this.pcmBuffer.copy(newBuffer);
      this.pcmBuffer = newBuffer;
    }
    const sampleCount = chunk.length >> 1;
    const dst = new Int16Array(
      this.pcmBuffer.buffer,
      this.pcmBuffer.byteOffset + startOffset,
      sampleCount
    );
    if ((chunk.byteOffset & 1) === 0) {
      const src = new Int16Array(chunk.buffer, chunk.byteOffset, sampleCount);
      for (let i = 0; i < sampleCount; i++) {
        let mixed = dst[i] + src[i];
        if (mixed > 32767) mixed = 32767;
        else if (mixed < -32768) mixed = -32768;
        dst[i] = mixed;
      }
    } else {
      for (let i = 0; i < sampleCount; i++) {
        let mixed = dst[i] + chunk.readInt16LE(i << 1);
        if (mixed > 32767) mixed = 32767;
        else if (mixed < -32768) mixed = -32768;
        dst[i] = mixed;
      }
    }
  }
  /**
   * The playback path writes a fixed 8kHz WAV header, so any TTS audio produced
   * at a different sample rate would play back distorted ("slow-motion"). If the
   * TTS config requests a non-8kHz rate, downsample the PCM to 8kHz here so the
   * caller always hears correct-speed audio. No-op for the normal 8kHz case.
   */
  ensureTelephonySampleRate(audio) {
    const configured = this.ttsConfig.outputFormat?.sampleRate;
    if (!configured || configured === 8e3) return audio;
    if (!this.sampleRateWarned) {
      this.sampleRateWarned = true;
      console.warn(`[AudioSession:${this.id}] TTS sample rate ${configured}Hz != 8000Hz playback rate \u2014 resampling to 8kHz to avoid distorted audio`);
    }
    return this.resamplePcm16(audio, configured, 8e3);
  }
  resamplePcm16(audio, fromRate, toRate) {
    if (fromRate === toRate || audio.length < 2) return audio;
    const srcSamples = audio.length >> 1;
    const ratio = toRate / fromRate;
    const dstSamples = Math.max(1, Math.floor(srcSamples * ratio));
    const out = Buffer.alloc(dstSamples * 2);
    for (let i = 0; i < dstSamples; i++) {
      const srcPos = i / ratio;
      const idx = Math.floor(srcPos);
      const frac = srcPos - idx;
      const s0 = audio.readInt16LE(Math.min(idx, srcSamples - 1) * 2);
      const s1 = audio.readInt16LE(Math.min(idx + 1, srcSamples - 1) * 2);
      out.writeInt16LE(Math.round(s0 + (s1 - s0) * frac), i * 2);
    }
    return out;
  }
  /**
   * Cap the live conversation history so long calls don't keep inflating the LLM
   * prompt every turn (which steadily raises latency). Always keeps the system
   * prompt plus the most recent messages, and never leaves a dangling tool
   * result whose assistant tool-call parent was trimmed away.
   */
  trimConversationHistory() {
    const MAX_RECENT = 40;
    if (this.conversationMessages.length <= MAX_RECENT + 1) return;
    const system = this.conversationMessages[0];
    const rest = this.conversationMessages.slice(1);
    let start = rest.length - MAX_RECENT;
    while (start < rest.length && rest[start].role === "tool") {
      start++;
    }
    this.conversationMessages = [system, ...rest.slice(start)];
  }
  // ── Private: Interruption Handling ─────────────────────
  handleInterruption() {
    if (!this.isPlayingTts) return;
    this.isPlayingTts = false;
    this.isProcessingLlm = false;
    this.ttsGeneration++;
    this.vadDetector.reset();
    if (this.bargeInPreBuffer.length > 0 && this.sttProvider?.isConnected()) {
      console.log(`[AudioSession:${this.id}] Sending ${this.bargeInPreBuffer.length} bytes of pre-buffered barge-in audio to STT`);
      this.sttProvider.sendAudio(this.bargeInPreBuffer);
      this.bargeInPreBuffer = Buffer.alloc(0);
    }
    this.emitPipelineEvent({
      type: "interruption",
      sessionId: this.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[AudioSession:${this.id}] User interrupted TTS`);
  }
  // ── Private: Helpers ───────────────────────────────────
  findSentenceEnd(text2) {
    const endings = [". ", "! ", "? ", ".\n", "!\n", "?\n", "\u0964 ", "\u0964\n", "| ", "|\n"];
    let lastEnd = -1;
    for (const ending of endings) {
      const idx = text2.lastIndexOf(ending);
      if (idx > lastEnd) {
        lastEnd = idx;
      }
    }
    return lastEnd;
  }
  splitIntoSentences(text2) {
    const sentences = [];
    let remaining = text2;
    while (remaining.length > 0) {
      const endings = [". ", "! ", "? ", ".\n", "!\n", "?\n", "\u0964 ", "\u0964\n", "| ", "|\n", ".", "!", "?", "\u0964", "|"];
      let earliestIdx = -1;
      let matchedEnding = "";
      for (const ending of endings) {
        const idx = remaining.indexOf(ending);
        if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
          earliestIdx = idx;
          matchedEnding = ending;
        }
      }
      if (earliestIdx !== -1) {
        const sentence = remaining.substring(0, earliestIdx + matchedEnding.trim().length).trim();
        if (sentence) {
          sentences.push(sentence);
        }
        remaining = remaining.substring(earliestIdx + matchedEnding.length).trim();
      } else {
        if (remaining.trim()) {
          sentences.push(remaining.trim());
        }
        break;
      }
    }
    return sentences;
  }
  detectTtsLanguage(text2, defaultLang) {
    if (/[\u0900-\u097F]/.test(text2)) return "hi-IN";
    if (/[\u0B80-\u0BFF]/.test(text2)) return "ta-IN";
    if (/[\u0C00-\u0C7F]/.test(text2)) return "te-IN";
    if (/[\u0C80-\u0CFF]/.test(text2)) return "kn-IN";
    if (/[\u0D00-\u0D7F]/.test(text2)) return "ml-IN";
    if (/[\u0980-\u09FF]/.test(text2)) return "bn-IN";
    if (/[\u0A80-\u0AFF]/.test(text2)) return "gu-IN";
    if (/[\u0A00-\u0A7F]/.test(text2)) return "pa-IN";
    if (/[\u0B00-\u0B7F]/.test(text2)) return "od-IN";
    return defaultLang;
  }
  addTranscriptEntry(role, content) {
    this.session.transcript.push({
      role,
      content,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  updateStatus(status) {
    this.session.status = status;
    this.emit("statusChange", status);
  }
  emitPipelineEvent(event) {
    this.emit("pipelineEvent", event);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/ws-audio-server.ts
init_db();
import { sql as sql20 } from "drizzle-orm";

// plugins/custom-voice-engine/services/freeswitch/esl-connection.ts
import { Socket } from "net";
import { EventEmitter as EventEmitter2 } from "events";
var EslConnection = class extends EventEmitter2 {
  socket = null;
  config;
  connected = false;
  authenticated = false;
  reconnecting = false;
  expectedDiscards = 0;
  reconnectAttempts = 0;
  reconnectTimer = null;
  buffer = "";
  pendingCommands = [];
  constructor(config) {
    super();
    this.config = {
      reconnect: true,
      reconnectIntervalMs: 5e3,
      maxReconnectAttempts: 10,
      ...config
    };
  }
  /**
   * Connect to FreeSWITCH ESL
   */
  async connect() {
    return new Promise((resolve, reject) => {
      this.socket = new Socket();
      this.socket.setEncoding("utf8");
      const timeout = setTimeout(() => {
        this.off("ready", onReady);
        this.off("error", onError);
        reject(new Error(`ESL connection timeout to ${this.config.host}:${this.config.port}`));
        this.socket?.destroy();
      }, 1e4);
      const onReady = () => {
        clearTimeout(timeout);
        this.off("error", onError);
        resolve();
      };
      const onError = (err) => {
        clearTimeout(timeout);
        this.off("ready", onReady);
        reject(err);
      };
      this.once("ready", onReady);
      this.once("error", onError);
      this.socket.on("connect", () => {
        console.log(`[ESL] Socket connected to ${this.config.host}:${this.config.port}, waiting for authentication...`);
      });
      this.socket.on("data", (data) => {
        this.buffer += data;
        this.processBuffer();
      });
      this.socket.on("error", (err) => {
        console.error("[ESL] Socket error:", err.message);
        this.emit("error", err);
      });
      this.socket.on("close", () => {
        const wasAuthenticated = this.authenticated;
        this.connected = false;
        this.authenticated = false;
        console.log("[ESL] Connection closed");
        this.emit("disconnect");
        if (!wasAuthenticated) {
          this.emit("error", new Error(`ESL connection to ${this.config.host}:${this.config.port} closed before authentication completed \u2014 check ESL password and FreeSWITCH ESL config`));
        }
        if (this.config.reconnect && !this.reconnecting) {
          this.scheduleReconnect();
        }
      });
      this.socket.connect(this.config.port, this.config.host);
    });
  }
  /**
   * Send an API command to FreeSWITCH
   */
  async api(command) {
    return this.sendCommand(`api ${command}`);
  }
  /**
   * Send a background API command
   */
  async bgapi(command) {
    return this.sendCommand(`bgapi ${command}`);
  }
  /**
   * Execute an application on a channel
   */
  async execute(uuid, app, arg) {
    const cmd = arg ? `sendmsg ${uuid}
call-command: execute
execute-app-name: ${app}
execute-app-arg: ${arg}` : `sendmsg ${uuid}
call-command: execute
execute-app-name: ${app}`;
    return this.sendCommand(cmd);
  }
  /**
   * Originate an outbound call
   */
  async originate(dialString, destination, options = {}) {
    const vars = Object.entries(options).map(([k, v]) => `${k}=${v}`).join(",");
    const varsStr = vars ? `{${vars}}` : "";
    return this.bgapi(`originate ${varsStr}${dialString} ${destination}`);
  }
  /**
   * Start audio forking on a channel (sends audio to WebSocket)
   */
  async startAudioFork(uuid, wsUrl) {
    return this.execute(uuid, "audio_fork", wsUrl);
  }
  /**
   * Stop audio forking on a channel
   */
  async stopAudioFork(uuid) {
    return this.execute(uuid, "stop_audio_fork");
  }
  /**
   * Hang up a channel
   */
  async hangup(uuid, cause) {
    return this.api(`uuid_kill ${uuid} ${cause || "NORMAL_CLEARING"}`);
  }
  /**
   * Get channel variable
   */
  async getVariable(uuid, variable) {
    return this.api(`uuid_getvar ${uuid} ${variable}`);
  }
  /**
   * Set channel variable
   */
  async setVariable(uuid, variable, value) {
    return this.api(`uuid_setvar ${uuid} ${variable} ${value}`);
  }
  /**
   * Get active channel count
   */
  async getActiveChannelCount() {
    const result = await this.api("show calls count");
    const match = result.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
  /**
   * Disconnect from FreeSWITCH
   */
  async disconnect() {
    this.config.reconnect = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
    this.connected = false;
    this.authenticated = false;
    console.log("[ESL] Disconnected");
  }
  isConnected() {
    return this.connected && this.authenticated;
  }
  // ── Private Methods ────────────────────────────────────
  async sendCommand(command) {
    if (!this.connected || !this.socket) {
      throw new Error("ESL not connected");
    }
    return new Promise((resolve, reject) => {
      this.pendingCommands.push({ resolve, reject });
      this.sendRaw(`${command}

`);
      setTimeout(() => {
        const idx = this.pendingCommands.findIndex((p) => p.resolve === resolve);
        if (idx !== -1) {
          this.pendingCommands.splice(idx, 1);
          reject(new Error(`ESL command timeout: ${command.split("\n")[0]}`));
        }
      }, 15e3);
    });
  }
  sendRaw(data) {
    if (this.socket && !this.socket.destroyed) {
      this.socket.write(data);
    }
  }
  processBuffer() {
    this.buffer = this.buffer.trimStart();
    while (true) {
      const headerEndIndex = this.buffer.indexOf("\n\n");
      if (headerEndIndex === -1) break;
      const headerPart = this.buffer.substring(0, headerEndIndex);
      const headers = {};
      const lines = headerPart.split("\n");
      for (const line of lines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.substring(0, colonIdx).trim();
          const value = line.substring(colonIdx + 1).trim();
          headers[key] = decodeURIComponent(value);
        }
      }
      const contentLength = headers["Content-Length"] ? parseInt(headers["Content-Length"], 10) : 0;
      const totalMessageLength = headerEndIndex + 2 + contentLength;
      if (this.buffer.length < totalMessageLength) {
        break;
      }
      const body = this.buffer.substring(headerEndIndex + 2, headerEndIndex + 2 + contentLength);
      this.buffer = this.buffer.substring(totalMessageLength).trimStart();
      this.processMessage(headers, body);
    }
  }
  processMessage(headers, body) {
    const contentType = headers["Content-Type"];
    if (contentType === "auth/request") {
      this.sendRaw(`auth ${this.config.password}

`);
      return;
    }
    if (contentType === "api/response" || contentType === "command/reply") {
      const replyText = headers["Reply-Text"] || body.trim();
      if (!this.authenticated) {
        if (replyText.startsWith("+OK accepted")) {
          this.authenticated = true;
          this.connected = true;
          this.reconnectAttempts = 0;
          this.sendRaw("event plain CHANNEL_CREATE CHANNEL_ANSWER CHANNEL_HANGUP CHANNEL_DESTROY\n\n");
          this.sendRaw("event plain CUSTOM mod_audio_fork::play_audio\n\n");
          this.expectedDiscards = 2;
          console.log("[ESL] Authenticated successfully, waiting for subscription confirmations...");
        } else if (replyText.startsWith("-ERR")) {
          const err = new Error(`ESL authentication failed: ${replyText}`);
          this.emit("error", err);
          this.socket?.destroy();
        } else {
          const err = new Error(`ESL auth reply unexpected: ${replyText}`);
          this.emit("error", err);
          this.socket?.destroy();
        }
        return;
      }
      if (this.expectedDiscards > 0) {
        this.expectedDiscards--;
        if (this.expectedDiscards === 0) {
          console.log("[ESL] Subscription confirmations received, connection ready");
          this.emit("ready");
        }
        return;
      }
      const pending = this.pendingCommands.shift();
      if (pending) {
        if (replyText.startsWith("-ERR")) {
          pending.reject(new Error(replyText));
        } else {
          pending.resolve(body.trim() || replyText);
        }
      }
      return;
    }
    if (contentType === "text/event-plain") {
      const eventHeaders = {};
      const lines = body.split("\n");
      let eventBody = "";
      let inEventBody = false;
      for (const line of lines) {
        if (inEventBody) {
          eventBody += line + "\n";
          continue;
        }
        if (line.trim() === "") {
          inEventBody = true;
          continue;
        }
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.substring(0, colonIdx).trim();
          const value = line.substring(colonIdx + 1).trim();
          eventHeaders[key] = decodeURIComponent(value);
        }
      }
      const event = {
        eventName: eventHeaders["Event-Name"] || "UNKNOWN",
        eventSubclass: eventHeaders["Event-Subclass"],
        headers: eventHeaders,
        body: eventBody.trim() || void 0
      };
      const keyEvents = ["CHANNEL_CREATE", "CHANNEL_ANSWER", "CHANNEL_HANGUP", "CHANNEL_DESTROY"];
      if (keyEvents.includes(event.eventName)) {
        console.log(`[ESL] Received event: ${event.eventName}`);
      }
      this.emit("event", event);
      this.emit(`event:${event.eventName}`, event);
    }
  }
  scheduleReconnect() {
    if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 10)) {
      console.error("[ESL] Max reconnect attempts reached");
      this.emit("maxReconnectAttempts");
      return;
    }
    this.reconnecting = true;
    this.reconnectAttempts++;
    const delay = this.config.reconnectIntervalMs || 5e3;
    console.log(`[ESL] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    this.reconnectTimer = setTimeout(async () => {
      try {
        await this.connect();
        this.reconnecting = false;
      } catch (err) {
        console.error("[ESL] Reconnect failed:", err.message);
        this.reconnecting = false;
        this.scheduleReconnect();
      }
    }, delay);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/ws-audio-server.ts
function camelizeKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = camelizeKeys(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
var AudioWebSocketServer = class {
  wss;
  sessions = /* @__PURE__ */ new Map();
  eslConnections = [];
  constructor(httpServer) {
    this.wss = new WebSocketServer({
      noServer: true,
      perMessageDeflate: false,
      // Disable compression for low-latency audio
      maxPayload: 64 * 1024
      // 64KB max per message
    });
    httpServer.on("upgrade", (req, socket, head) => {
      const pathname = req.url?.split("?")[0] || "";
      if (pathname.startsWith("/voice-engine/audio/") || pathname.startsWith("/api/voice-engine/ws/audio/") || pathname.startsWith("/voice-engine/ws/audio/")) {
        this.wss.handleUpgrade(req, socket, head, (ws) => {
          this.wss.emit("connection", ws, req);
        });
      }
    });
    this.wss.on("connection", (ws, req) => {
      this.handleConnection(ws, req);
    });
    this.wss.on("error", (err) => {
      console.error("[AudioWS] Server error:", err);
    });
    console.log("[AudioWS] WebSocket audio server started");
  }
  /**
   * Register an AudioSession to receive audio
   */
  registerSession(session) {
    this.sessions.set(session.id, session);
    console.log(`[AudioWS] Session registered: ${session.id}`);
  }
  /**
   * Unregister an AudioSession
   */
  unregisterSession(sessionId) {
    this.sessions.delete(sessionId);
    console.log(`[AudioWS] Session unregistered: ${sessionId}`);
  }
  /**
   * Get active session count
   */
  getActiveSessionCount() {
    return this.sessions.size;
  }
  /**
   * Initialize persistent FreeSWITCH ESL connections for event monitoring and commands
   */
  async initializeEslConnections(wsUrl) {
    await this.closeEslConnections();
    try {
      const nodesResult = await db.execute(sql20`
        SELECT * FROM ve_freeswitch_nodes WHERE status = 'online'
      `);
      for (const node of camelizeKeys(nodesResult.rows)) {
        const eslHost = node.eslHost;
        const eslPort = node.eslPort;
        const eslPassword = node.eslPassword || "ClueCon";
        try {
          const esl = new EslConnection({
            host: eslHost,
            port: eslPort,
            password: eslPassword,
            reconnect: true
          });
          esl.on("error", (err) => {
            console.error(`[AudioWS] ESL Connection error for node ${node.name || eslHost}:`, err.message);
          });
          esl.on("event:CUSTOM", async (evt) => {
            const eventSubclass = evt.eventSubclass || evt.headers["Event-Subclass"];
            if (eventSubclass === "mod_audio_fork::play_audio") {
              try {
                const bodyStr = evt.body;
                if (!bodyStr) return;
                const payload = JSON.parse(bodyStr);
                const file = payload.file;
                const channelUuid = evt.headers["Unique-ID"];
                if (file && channelUuid) {
                  await esl.api(`uuid_broadcast ${channelUuid} ${file} aleg`);
                }
              } catch (err) {
                console.error(`[AudioWS] Error handling play_audio event:`, err.message);
              }
            }
          });
          esl.on("event:CHANNEL_ANSWER", async (evt) => {
            try {
              const channelUuid = evt.headers["Unique-ID"] || evt.headers["Channel-Call-UUID"];
              if (channelUuid) {
                const session = this.sessions.get(channelUuid);
                if (session) {
                  console.log(`[AudioWS] CHANNEL_ANSWER event received for session ${channelUuid}. Calling markCallAnswered.`);
                  await session.markCallAnswered();
                }
              }
            } catch (err) {
              console.error(`[AudioWS] Error handling CHANNEL_ANSWER event:`, err.message);
            }
          });
          esl.on("event:CHANNEL_HANGUP", async (evt) => {
            try {
              const channelUuid = evt.headers["Unique-ID"] || evt.headers["Channel-Call-UUID"];
              if (!channelUuid) return;
              const hangupCause = evt.headers["Hangup-Cause"] || "";
              console.log(`[AudioWS] CHANNEL_HANGUP event received: uuid=${channelUuid}, cause=${hangupCause}, duration=${evt.headers["variable_duration"]}, billsec=${evt.headers["variable_billsec"]}`);
              const unansweredCauses = [
                "NO_ANSWER",
                "USER_BUSY",
                "NO_ROUTE_DESTINATION",
                "CALL_REJECTED",
                "NUMBER_CHANGED",
                "SUBSCRIBER_ABSENT",
                "UNALLOCATED_NUMBER",
                "NORMAL_UNSPECIFIED",
                "RECOVERY_ON_TIMER_EXPIRE"
              ];
              const isUnanswered = unansweredCauses.includes(hangupCause);
              const session = this.sessions.get(channelUuid);
              if (session) {
                if (isUnanswered) {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) \u2014 call never answered for ${channelUuid}. Marking as failed.`);
                  try {
                    await db.execute(sql20`
                      UPDATE ve_sessions
                      SET status = 'failed',
                          end_reason = ${hangupCause.toLowerCase()},
                          ended_at = NOW(),
                          updated_at = NOW()
                      WHERE id = ${channelUuid}
                    `);
                  } catch (dbErr) {
                    console.error(`[AudioWS] Failed to update unanswered session status:`, dbErr.message);
                  }
                  session.destroyed = true;
                  session.removeAllListeners();
                  this.unregisterSession(channelUuid);
                } else {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) for session ${channelUuid}. Ending session.`);
                  await session.end("hangup");
                  this.unregisterSession(channelUuid);
                }
              } else {
                if (isUnanswered) {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) \u2014 no session in memory for ${channelUuid}, updating DB status.`);
                  try {
                    await db.execute(sql20`
                      UPDATE ve_sessions
                      SET status = 'failed',
                          end_reason = ${hangupCause.toLowerCase()},
                          ended_at = NOW(),
                          updated_at = NOW()
                      WHERE id = ${channelUuid} AND status IN ('initializing', 'active')
                    `);
                  } catch (dbErr) {
                    console.error(`[AudioWS] Failed to update orphaned session status:`, dbErr.message);
                  }
                } else {
                  try {
                    const sessionResult = await db.execute(sql20`
                      SELECT * FROM ve_sessions WHERE id = ${channelUuid} LIMIT 1
                    `);
                    const sessionData = sessionResult.rows?.[0];
                    if (sessionData && sessionData.status === "completed" && sessionData.end_reason === "transferred") {
                      const oldDuration = sessionData.duration_seconds || 0;
                      const startedAt = sessionData.started_at ? new Date(sessionData.started_at).getTime() : null;
                      const totalDuration = startedAt ? Math.floor((Date.now() - startedAt) / 1e3) : 0;
                      console.log(`[AudioWS] final CHANNEL_HANGUP for transferred session ${channelUuid}. oldDuration=${oldDuration}s, wallClock=${totalDuration}s`);
                      if (totalDuration > oldDuration) {
                        const oldMinutes = Math.ceil(oldDuration / 60);
                        const newMinutes = Math.ceil(totalDuration / 60);
                        const additionalMinutes = newMinutes - oldMinutes;
                        let newCreditsUsed = sessionData.credits_used || 0;
                        if (additionalMinutes > 0) {
                          const creditPriceResult = await db.execute(sql20`
                            SELECT value FROM global_settings WHERE key = 'credit_price_per_minute' LIMIT 1
                          `);
                          const creditPriceSetting = creditPriceResult.rows?.[0];
                          let creditPricePerMinute = 1;
                          if (creditPriceSetting?.value) {
                            const parsed = Number(creditPriceSetting.value);
                            if (Number.isFinite(parsed) && parsed >= 0) {
                              creditPricePerMinute = parsed;
                            }
                          }
                          const creditsToDeduct = additionalMinutes * creditPricePerMinute;
                          const deductCallCredits = global.deductCallCredits;
                          if (deductCallCredits) {
                            const creditResult = await deductCallCredits({
                              userId: sessionData.user_id,
                              creditsToDeduct,
                              callId: `${channelUuid}-adjustment`,
                              fromNumber: sessionData.from_number || "Unknown",
                              toNumber: sessionData.to_number || "Unknown",
                              durationSeconds: totalDuration - oldDuration,
                              engine: "custom-voice-engine"
                            });
                            if (creditResult.success || creditResult.alreadyDeducted) {
                              newCreditsUsed += creditsToDeduct;
                              console.log(`[AudioWS] Charged additional ${creditsToDeduct} credits for transferred session ${channelUuid}. Total duration: ${totalDuration}s, old: ${oldDuration}s`);
                            }
                          }
                        }
                        await db.execute(sql20`
                          UPDATE ve_sessions
                          SET duration_seconds = ${totalDuration},
                              credits_used = ${newCreditsUsed},
                              updated_at = NOW()
                          WHERE id = ${channelUuid}
                        `);
                      }
                    }
                  } catch (err) {
                    console.error(`[AudioWS] Failed to process final hangup billing for ${channelUuid}:`, err.message);
                  }
                }
              }
            } catch (err) {
              console.error(`[AudioWS] Error handling CHANNEL_HANGUP event:`, err.message);
            }
          });
          esl.on("esl:ready", () => {
            console.log(`[AudioWS] ESL connection ready for node ${node.name || eslHost}`);
          });
          esl.on("esl:end", () => {
            console.log(`[AudioWS] ESL connection ended for node ${node.name || eslHost}, will auto-reconnect`);
          });
          await esl.connect();
          await esl.api(`global_setvar ve_audio_ws_url ${wsUrl}`);
          this.eslConnections.push(esl);
          console.log(`[AudioWS] Established persistent ESL connection to FreeSWITCH node ${node.name || eslHost}`);
        } catch (nodeErr) {
          console.warn(`[AudioWS] Failed to connect to FreeSWITCH node ${node.name || eslHost}:`, nodeErr.message);
        }
      }
    } catch (err) {
      console.warn(`[AudioWS] Failed to query FreeSWITCH nodes on initialization:`, err.message);
    }
  }
  /**
   * Close all persistent ESL connections
   */
  async closeEslConnections() {
    for (const esl of this.eslConnections) {
      try {
        await esl.disconnect();
      } catch {
      }
    }
    this.eslConnections = [];
  }
  /**
   * Shutdown the WebSocket server
   */
  shutdown() {
    for (const client of this.wss.clients) {
      client.close(1001, "Server shutting down");
    }
    this.wss.close();
    this.sessions.clear();
    this.closeEslConnections().catch(() => {
    });
    console.log("[AudioWS] Server shut down");
  }
  // ── Private ────────────────────────────────────────────
  async handleConnection(ws, req) {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const pathParts = url.pathname.split("/");
      const sessionId = pathParts[pathParts.length - 1];
      if (!sessionId) {
        console.warn("[AudioWS] Connection without session ID");
        ws.close(4e3, "Missing session ID");
        return;
      }
      console.log(`[AudioWS] Incoming connection for sessionId: ${sessionId}`);
      let session = this.sessions.get(sessionId);
      if (!session) {
        console.log(`[AudioWS] Session not found in cache. Querying DB/FreeSWITCH for ${sessionId}...`);
        session = await this.resolveSessionDynamically(sessionId);
      }
      if (!session) {
        console.warn(`[AudioWS] No session found/resolved: ${sessionId}`);
        ws.close(4001, "Session not found");
        return;
      }
      console.log(`[AudioWS] Client connected for session: ${sessionId}`);
      let audioPlayCount = 0;
      session.onAudioOut(async (audio) => {
        try {
          audioPlayCount++;
          const samplesCount = audio.length / 2;
          const wavHeader = Buffer.alloc(44);
          const sampleRate = 8e3;
          const numChannels = 1;
          const bitsPerSample = 16;
          const blockAlign = numChannels * (bitsPerSample / 8);
          const byteRate = sampleRate * blockAlign;
          const dataSize = samplesCount * blockAlign;
          wavHeader.write("RIFF", 0);
          wavHeader.writeUInt32LE(36 + dataSize, 4);
          wavHeader.write("WAVE", 8);
          wavHeader.write("fmt ", 12);
          wavHeader.writeUInt32LE(16, 16);
          wavHeader.writeUInt16LE(1, 20);
          wavHeader.writeUInt16LE(numChannels, 22);
          wavHeader.writeUInt32LE(sampleRate, 24);
          wavHeader.writeUInt32LE(byteRate, 28);
          wavHeader.writeUInt16LE(blockAlign, 32);
          wavHeader.writeUInt16LE(bitsPerSample, 34);
          wavHeader.write("data", 36);
          wavHeader.writeUInt32LE(dataSize, 40);
          const wavBuffer = Buffer.concat([wavHeader, audio]);
          const filePath = `/tmp/${sessionId}_tts_${Date.now()}_${audioPlayCount}.wav`;
          await fs2.promises.writeFile(filePath, wavBuffer);
          console.log(`[AudioWS] Wrote TTS audio to ${filePath} (${wavBuffer.length} bytes), playing via ESL uuid_broadcast...`);
          for (const esl of this.eslConnections) {
            try {
              if (esl.isConnected()) {
                const targetUuid = session.channelUuid || sessionId;
                await esl.api(`uuid_broadcast ${targetUuid} ${filePath}`);
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send uuid_broadcast:`, err.message);
            }
          }
        } catch (err) {
          console.error(`[AudioWS] Error in onAudioOut playback handler:`, err.message);
        }
      });
      session.onControlOut((msg) => {
        try {
          if (ws.readyState === WebSocket2.OPEN) {
            ws.send(JSON.stringify(msg));
          }
        } catch (err) {
          console.error(`[AudioWS] Failed to send control message:`, err.message);
        }
      });
      session.on("pipelineEvent", async (event) => {
        if (event.type === "interruption") {
          console.log(`[AudioWS] Interruption detected, breaking playback for session ${sessionId}`);
          for (const esl of this.eslConnections) {
            try {
              if (esl.isConnected()) {
                const targetUuid = session.channelUuid || sessionId;
                await esl.api(`uuid_break ${targetUuid} all`);
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send uuid_break:`, err.message);
            }
          }
          if (session.isStreamingPlayback) {
            try {
              if (ws.readyState === WebSocket2.OPEN) {
                ws.send(JSON.stringify({ type: "killAudio" }));
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send killAudio:`, err.message);
            }
          }
        }
      });
      session.once("transfer", async (targetNumber) => {
        session.isTransferred = true;
        console.log(`[AudioWS] Session ${sessionId} initiating transfer to ${targetNumber}`);
        let gatewayName = "twilio";
        try {
          const userId = session.userId;
          let activeGateway = null;
          if (userId) {
            const userGatewayResult = await db.execute(sql20`
              SELECT name FROM user_sip_gateways WHERE user_id = ${userId} AND is_active = true LIMIT 1
            `);
            activeGateway = userGatewayResult.rows[0];
          }
          if (activeGateway) {
            gatewayName = activeGateway.name.toLowerCase();
          }
        } catch (err) {
          console.error(`[AudioWS] Failed to fetch active gateway for transfer:`, err.message);
        }
        const formattedTo = !targetNumber.startsWith("+") && !targetNumber.startsWith("sip:") ? `+${targetNumber}` : targetNumber;
        const targetUuid = session.channelUuid || sessionId;
        const dialString = formattedTo.startsWith("sip:") ? formattedTo : `sofia/gateway/${gatewayName}/${formattedTo}`;
        console.log(`[AudioWS] Transferring channel ${targetUuid} to ${dialString}`);
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              await esl.api(`uuid_transfer ${targetUuid} 'bridge:${dialString}' inline`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to transfer call for session ${sessionId}:`, err.message);
          }
        }
        try {
          await db.execute(sql20`
            UPDATE ve_sessions
            SET end_reason = 'transferred',
                updated_at = NOW()
            WHERE id = ${sessionId}
          `);
          console.log(`[AudioWS] Marked session ${sessionId} as transferred in DB`);
        } catch (err) {
          console.error(`[AudioWS] Failed to mark session as transferred:`, err.message);
        }
        if (ws.readyState === WebSocket2.OPEN) {
          ws.close(1e3, "Call transferred");
        }
        this.unregisterSession(sessionId);
      });
      session.on("play_audio", async (audioUrl) => {
        console.log(`[AudioWS] Session ${sessionId} playing audio: ${audioUrl}`);
        const targetUuid = session.channelUuid || sessionId;
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              await esl.api(`uuid_broadcast ${targetUuid} ${audioUrl}`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to play audio for session ${sessionId}:`, err.message);
          }
        }
      });
      session.once("hangup", async (reason) => {
        if (session.isTransferred) {
          console.log(`[AudioWS] Session ${sessionId} was transferred. Skipping ESL uuid_kill.`);
          this.unregisterSession(sessionId);
          return;
        }
        console.log(`[AudioWS] Session ${sessionId} ended (reason: ${reason}), issuing ESL uuid_kill`);
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              const targetUuid = session.channelUuid || sessionId;
              await esl.api(`uuid_kill ${targetUuid} NORMAL_CLEARING`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to send uuid_kill for ${sessionId}:`, err.message);
          }
        }
        if (ws.readyState === WebSocket2.OPEN) {
          ws.close(1e3, "Session ended");
        }
        this.unregisterSession(sessionId);
      });
      ws.on("message", (data, isBinary) => {
        if (isBinary || data instanceof Buffer) {
          const buf = data instanceof Buffer ? data : Buffer.from(data);
          session.processAudio(buf);
        } else if (data instanceof ArrayBuffer) {
          session.processAudio(Buffer.from(data));
        } else {
          try {
            const msg = JSON.parse(data.toString());
            const msgType = msg.type || msg.event;
            if (msgType === "stop" || msgType === "clear") {
              console.log(`[AudioWS] mod_audio_fork ${msgType} event for session ${sessionId}`);
            } else if (msgType === "start") {
              console.log(`[AudioWS] mod_audio_fork start event for session ${sessionId}`);
              if (msg.uuid) {
                session.channelUuid = msg.uuid;
              }
              session.markCallAnswered().catch((err) => {
                console.error(`[AudioWS] Error marking call answered on start event:`, err.message);
              });
            } else {
              console.log(`[AudioWS] mod_audio_fork JSON message type="${msgType}" for ${sessionId}`);
            }
          } catch {
          }
        }
      });
      ws.on("close", (code, reason) => {
        console.log(`[AudioWS] Client disconnected: ${sessionId} (${code})`);
        session.end("websocket_closed").catch(() => {
        });
        this.unregisterSession(sessionId);
      });
      ws.on("error", (err) => {
        console.error(`[AudioWS] Client error for ${sessionId}:`, err.message);
      });
      if (!session.isInitialized()) {
        console.log(`[AudioWS] Initializing pipeline for session: ${sessionId}`);
        await session.initialize();
        if (session.direction === "inbound") {
          console.log(`[AudioWS] Inbound call, triggering greeting for session ${sessionId}.`);
          await session.markCallAnswered();
        } else {
          console.log(`[AudioWS] Outbound call, waiting for CHANNEL_ANSWER for session ${sessionId}.`);
        }
      }
    } catch (err) {
      console.error(`[AudioWS] Error handling connection for ${req.url}:`, err.message);
      ws.close(1011, "Internal Server Error");
    }
  }
  async resolveSessionDynamically(sessionId) {
    try {
      const sessionResult = await db.execute(sql20`
        SELECT * FROM ve_sessions WHERE id = ${sessionId} LIMIT 1
      `);
      let sessionData = null;
      let isNewSession = false;
      let fromNumber = "";
      let toNumber = "";
      if (sessionResult.rows.length > 0) {
        sessionData = camelizeKeys(sessionResult.rows[0]);
        console.log(`[AudioWS] Found pre-registered session for ID: ${sessionId}`);
      } else {
        console.log(`[AudioWS] Inbound call detected. Querying FreeSWITCH for channel ${sessionId}...`);
        const nodesResult = await db.execute(sql20`
          SELECT * FROM ve_freeswitch_nodes WHERE status = 'online' ORDER BY created_at ASC
        `);
        const nodes = camelizeKeys(nodesResult.rows);
        let fsVars = null;
        if (nodes.length > 0) {
          for (const node of nodes) {
            fsVars = await this.getChannelVariablesFromNode(node, sessionId);
            if (fsVars) break;
          }
        } else {
          const defaultNode = {
            eslHost: process.env.FREESWITCH_ESL_HOST || "127.0.0.1",
            eslPort: parseInt(process.env.FREESWITCH_ESL_PORT || "8021"),
            eslPassword: process.env.FREESWITCH_ESL_PASSWORD || "ClueCon"
          };
          fsVars = await this.getChannelVariablesFromNode(defaultNode, sessionId);
        }
        if (!fsVars) {
          console.warn(`[AudioWS] Could not retrieve channel variables from FreeSWITCH for ${sessionId}`);
          return null;
        }
        fromNumber = fsVars.callerIdNumber || "";
        toNumber = fsVars.destinationNumber || "";
        isNewSession = true;
      }
      let agentResult = null;
      let targetAgentId = null;
      if (sessionData) {
        if (sessionData.agentId) {
          targetAgentId = sessionData.agentId;
        } else if (sessionData.metadata) {
          try {
            const meta = typeof sessionData.metadata === "string" ? JSON.parse(sessionData.metadata) : sessionData.metadata;
            targetAgentId = meta?.agentId || null;
          } catch {
          }
        }
      }
      if (!targetAgentId && toNumber) {
        const cleanToNumber = toNumber.startsWith("+") ? toNumber.substring(1) : toNumber;
        const plusToNumber = toNumber.startsWith("+") ? toNumber : "+" + toNumber;
        let connResult = await db.execute(sql20`
          SELECT agent_id FROM incoming_connections ic
          JOIN phone_numbers pn ON ic.phone_number_id = pn.id
          WHERE pn.phone_number = ${toNumber} OR pn.phone_number = ${cleanToNumber} OR pn.phone_number = ${plusToNumber} LIMIT 1
        `);
        if (connResult.rows.length > 0) {
          targetAgentId = connResult.rows[0].agent_id;
          console.log(`[AudioWS] Found incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
        } else {
          connResult = await db.execute(sql20`
            SELECT assigned_agent_id as agent_id FROM plivo_phone_numbers
            WHERE phone_number = ${toNumber} OR phone_number = ${cleanToNumber} OR phone_number = ${plusToNumber} LIMIT 1
          `);
          if (connResult.rows.length > 0 && connResult.rows[0].agent_id) {
            targetAgentId = connResult.rows[0].agent_id;
            console.log(`[AudioWS] Found Plivo incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
          }
        }
        if (!targetAgentId) {
          connResult = await db.execute(sql20`
            SELECT agent_id FROM user_sip_phone_numbers
            WHERE phone_number = ${toNumber} OR phone_number = ${cleanToNumber} OR phone_number = ${plusToNumber} LIMIT 1
          `);
          if (connResult.rows.length > 0 && connResult.rows[0].agent_id) {
            targetAgentId = connResult.rows[0].agent_id;
            console.log(`[AudioWS] Found User SIP incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
          }
        }
      }
      if (targetAgentId) {
        agentResult = await db.execute(sql20`
          SELECT * FROM ve_voice_agents WHERE id = ${targetAgentId} LIMIT 1
        `);
        if (agentResult.rows.length === 0) {
          agentResult = await db.execute(sql20`
            SELECT * FROM agents WHERE id = ${targetAgentId} LIMIT 1
          `);
        }
      } else {
        if (toNumber) {
          agentResult = await db.execute(sql20`
            SELECT * FROM ve_voice_agents 
            WHERE is_active = true AND (name = ${toNumber} OR description LIKE ${"%" + toNumber + "%"})
            LIMIT 1
          `);
          if (agentResult.rows.length === 0) {
            agentResult = await db.execute(sql20`
              SELECT * FROM agents 
              WHERE is_active = true AND telephony_provider = 'custom-voice-engine' AND name = ${toNumber}
              LIMIT 1
            `);
          }
        }
        if (!agentResult || agentResult.rows.length === 0) {
          if (isNewSession) {
            console.warn(`[AudioWS] Rejecting inbound call: no agent mapped or matched for destination number ${toNumber || "unknown"}`);
            for (const esl of this.eslConnections) {
              try {
                if (esl.isConnected()) {
                  await esl.api(`uuid_kill ${sessionId} CALL_REJECTED`);
                }
              } catch (err) {
                console.error(`[AudioWS] Failed to send uuid_kill for unmapped call ${sessionId}:`, err.message);
              }
            }
            return null;
          }
          agentResult = await db.execute(sql20`
            SELECT * FROM ve_voice_agents WHERE is_active = true ORDER BY created_at ASC LIMIT 1
          `);
          if (agentResult.rows.length === 0) {
            agentResult = await db.execute(sql20`
              SELECT * FROM agents WHERE is_active = true AND telephony_provider = 'custom-voice-engine' ORDER BY created_at ASC LIMIT 1
            `);
          }
        }
      }
      if (!agentResult || agentResult.rows.length === 0) {
        console.error(`[AudioWS] No voice agent found for call ${sessionId}`);
        return null;
      }
      const agent = camelizeKeys(agentResult.rows[0]);
      if (agent.firstMessage && fromNumber) {
        const spacedDigits = (fromNumber.startsWith("+") ? "plus " : "") + fromNumber.replace(/\+/g, "").split("").join(" ");
        agent.firstMessage = agent.firstMessage.replace(/\{\{(phone|phone_number)\}\}/gi, spacedDigits);
      }
      let flow = null;
      const flowExecResult = await db.execute(sql20`
        SELECT * FROM flow_executions WHERE call_id = ${sessionId} AND status = 'running' LIMIT 1
      `);
      if (flowExecResult.rows.length > 0) {
        const flowExec = camelizeKeys(flowExecResult.rows[0]);
        const flowResult = await db.execute(sql20`
          SELECT * FROM flows WHERE id = ${flowExec.flowId} LIMIT 1
        `);
        if (flowResult.rows.length > 0) {
          flow = camelizeKeys(flowResult.rows[0]);
          console.log(`[AudioWS] Found active flow execution for call ${sessionId} -> flowId: ${flow.id}`);
          if (flow.compiledSystemPrompt) {
            agent.systemPrompt = flow.compiledSystemPrompt;
            console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
          }
          if (flow.compiledFirstMessage) {
            agent.firstMessage = flow.compiledFirstMessage;
          }
          agent.type = "flow";
          agent.flowId = flow.id;
        }
      }
      if (!flow) {
        if (agent.type === "flow" && agent.flowId) {
          console.log(`[AudioWS] Agent is flow-based, loading flow ${agent.flowId}`);
          const flowResult = await db.execute(sql20`
            SELECT * FROM flows WHERE id = ${agent.flowId} LIMIT 1
          `);
          if (flowResult.rows.length > 0) {
            flow = camelizeKeys(flowResult.rows[0]);
            if (flow.compiledSystemPrompt) {
              agent.systemPrompt = flow.compiledSystemPrompt;
              console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
            }
            if (flow.compiledFirstMessage) {
              agent.firstMessage = flow.compiledFirstMessage;
            }
          }
        } else {
          console.log(`[AudioWS] Agent ${agent.id} type is ${agent.type || "unknown"}, checking for active flow assigned to this agent`);
          const flowResult = await db.execute(sql20`
            SELECT * FROM flows WHERE agent_id = ${agent.id} AND is_active = true LIMIT 1
          `);
          if (flowResult.rows.length > 0) {
            flow = camelizeKeys(flowResult.rows[0]);
            console.log(`[AudioWS] Found active flow ${flow.id} pointing to agent ${agent.id}`);
            if (flow.compiledSystemPrompt) {
              agent.systemPrompt = flow.compiledSystemPrompt;
              console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
            }
            if (flow.compiledFirstMessage) {
              agent.firstMessage = flow.compiledFirstMessage;
            }
            agent.type = "flow";
            agent.flowId = flow.id;
          }
        }
      }
      if (agent.knowledgeBaseIds && agent.knowledgeBaseIds.length > 0) {
        agent.systemPrompt = `
\u26A0\uFE0F CRITICAL KNOWLEDGE BASE INSTRUCTION \u26A0\uFE0F
You have access to a knowledge base tool called "lookup_knowledge_base".
- When the user asks ANY question that might require information from the knowledge base, you MUST call the "lookup_knowledge_base" tool IMMEDIATELY.
- Do NOT say things like "I will search the knowledge base" or "Let me check" or "Let me look that up".
- Do NOT answer from memory if information could exist in the knowledge base.

${agent.systemPrompt || ""}`;
      }
      if (agent.endConversationEnabled) {
        agent.systemPrompt = `
\u26A0\uFE0F CRITICAL END CALL INSTRUCTION \u26A0\uFE0F
You have access to an "end_call" tool. 
- You MUST call this tool when the conversation naturally concludes, the user says goodbye, or requests to hang up.

${agent.systemPrompt || ""}`;
      }
      let tools2 = [];
      let toolMetadata = /* @__PURE__ */ new Map();
      if (flow?.compiledTools && Array.isArray(flow.compiledTools) && flow.compiledTools.length > 0) {
        console.log(`[AudioWS] Found ${flow.compiledTools.length} compiled tools in flow ${flow.id}`);
        for (const ct of flow.compiledTools) {
          if (ct.type === "function" && ct.function?.name) {
            const toolDef = {
              type: "function",
              function: {
                name: ct.function.name,
                description: ct.function.description || "",
                parameters: ct.function.parameters || {}
              }
            };
            tools2.push(toolDef);
            const meta = ct._metadata || ct.Metadata || ct._metadata;
            if (meta) {
              toolMetadata.set(ct.function.name, meta);
            }
          }
        }
        console.log(`[AudioWS] Built ${tools2.length} tool definitions for LLM`);
      }
      if (agent.knowledgeBaseIds && agent.knowledgeBaseIds.length > 0) {
        tools2.push({
          type: "function",
          function: {
            name: "lookup_knowledge_base",
            description: "Search the knowledge base for relevant information to answer user questions. Use this when you need facts, policies, product details, pricing, or any specific information.",
            parameters: {
              type: "object",
              properties: {
                query: { type: "string", description: "The specific search query to look up in the knowledge base." }
              },
              required: ["query"]
            }
          }
        });
        toolMetadata.set("lookup_knowledge_base", { knowledgeBaseIds: agent.knowledgeBaseIds });
        console.log(`[AudioWS] Added lookup_knowledge_base tool for ${agent.knowledgeBaseIds.length} KBs`);
      }
      if (agent.endConversationEnabled) {
        tools2.push({
          type: "function",
          function: {
            name: "end_call",
            description: "End the conversation when the user says goodbye or the interaction is complete.",
            parameters: { type: "object", properties: {} }
          }
        });
        console.log(`[AudioWS] Added end_call tool`);
      }
      const userId = agent.userId;
      if (isNewSession) {
        const checkAgentInVe = await db.execute(sql20`
          SELECT id FROM ve_voice_agents WHERE id = ${agent.id} LIMIT 1
        `);
        const isVeAgent = checkAgentInVe.rows.length > 0;
        const dbAgentId = isVeAgent ? agent.id : null;
        const metadata = !isVeAgent ? { agentId: agent.id } : null;
        const insertResult = await db.execute(sql20`
          INSERT INTO ve_sessions (
            id, user_id, agent_id, from_number, to_number, direction, status, channel_uuid, metadata
          ) VALUES (
            ${sessionId}, ${userId}, ${dbAgentId}, ${fromNumber || null}, ${toNumber || null}, 'inbound', 'initializing', ${sessionId}, ${metadata ? JSON.stringify(metadata) : null}
          ) RETURNING *
        `);
        sessionData = camelizeKeys(insertResult.rows[0]);
        console.log(`[AudioWS] Created new inbound session in DB for channel ${sessionId}`);
      }
      let apptSettingsText = "";
      try {
        const apptSettingsResult = await db.execute(sql20`
          SELECT * FROM appointment_settings WHERE user_id = ${userId} LIMIT 1
        `);
        const apptSettings = apptSettingsResult.rows?.[0];
        if (apptSettings) {
          let workingDays = [];
          let workingHoursStart = "09:00";
          let workingHoursEnd = "17:00";
          if (apptSettings.working_hours) {
            const wh = typeof apptSettings.working_hours === "string" ? JSON.parse(apptSettings.working_hours) : apptSettings.working_hours;
            workingDays = Object.keys(wh).filter((day) => wh[day]?.enabled);
            for (const day of ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]) {
              if (wh[day]?.enabled) {
                workingHoursStart = wh[day].start || workingHoursStart;
                workingHoursEnd = wh[day].end || workingHoursEnd;
                break;
              }
            }
          }
          apptSettingsText = `
**Appointment Booking Availability & Settings:**
- Working Days (available for appointments): ${workingDays.length > 0 ? workingDays.join(", ") : "None"}
- Working Hours: ${workingHoursStart} to ${workingHoursEnd}
- Slot Buffer Time: ${apptSettings.buffer_minutes || 0} minutes
- Allow Overlapping Appointments: ${apptSettings.allow_overlapping ? "Yes" : "No"}
`;
        }
      } catch (apptErr) {
        console.warn(`[AudioWS] Failed to fetch appointment settings for user ${userId}:`, apptErr.message);
      }
      const globalSettingsResult = await db.execute(sql20`
        SELECT key, value FROM global_settings WHERE key IN (
          've_stt_active_provider', 've_llm_active_provider', 've_tts_active_provider',
          've_deepgram_api_key', 've_sarvam_api_key', 've_openrouter_api_key',
          've_stt_deepgram_model', 've_stt_sarvam_model',
          've_llm_default_model',
          've_tts_deepgram_model', 've_tts_sarvam_model',
          've_tts_sarvam_speaker'
        )
      `);
      const globalSettingsMap = {};
      for (const row of globalSettingsResult.rows) {
        globalSettingsMap[row.key] = row.value;
      }
      let sttProvider = globalSettingsMap["ve_stt_active_provider"] || "deepgram";
      let sttApiKey = sttProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      let sttModel = sttProvider === "sarvam" ? globalSettingsMap["ve_stt_sarvam_model"] || "saaras:v3" : globalSettingsMap["ve_stt_deepgram_model"] || "nova-2";
      let sttConfig = {};
      let llmProvider = globalSettingsMap["ve_llm_active_provider"] || "openrouter";
      let llmApiKey = globalSettingsMap["ve_openrouter_api_key"] || process.env.OPENROUTER_API_KEY || "";
      let llmModel = globalSettingsMap["ve_llm_default_model"] || "openai/gpt-4o-mini";
      let llmConfig = {};
      let ttsProvider = globalSettingsMap["ve_tts_active_provider"] || "deepgram";
      let ttsApiKey = ttsProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      let ttsModel = ttsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_model"] || "bulbul:v3" : globalSettingsMap["ve_tts_deepgram_model"] || "aura-asteria-en";
      let ttsSpeaker = ttsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_speaker"] || "neha" : "";
      let ttsConfig = {};
      const providerConfigResult = await db.execute(sql20`
        SELECT * FROM ve_provider_configs WHERE user_id = ${userId} LIMIT 1
      `);
      if (providerConfigResult.rows.length > 0) {
        const pc2 = camelizeKeys(providerConfigResult.rows[0]);
        sttProvider = pc2.sttProvider || sttProvider;
        sttApiKey = pc2.sttApiKey || sttApiKey;
        sttModel = pc2.sttModel || sttModel;
        sttConfig = pc2.sttConfig || {};
        llmProvider = pc2.llmProvider || llmProvider;
        llmApiKey = pc2.llmApiKey || llmApiKey;
        llmModel = pc2.llmModel || llmModel;
        llmConfig = pc2.llmConfig || {};
        ttsProvider = pc2.ttsProvider || ttsProvider;
        ttsApiKey = pc2.ttsApiKey || ttsApiKey;
        ttsModel = pc2.ttsVoice || ttsModel;
        ttsConfig = pc2.ttsConfig || {};
      }
      const effectiveSttProvider = agent.sttProvider || agent.config?.sttProvider || sttProvider;
      const effectiveTtsProvider = agent.ttsProvider || agent.config?.ttsProvider || ttsProvider;
      const resolvedSttApiKey = effectiveSttProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      const providerConfig = providerConfigResult.rows.length > 0 ? camelizeKeys(providerConfigResult.rows[0]) : null;
      const finalSttApiKey = providerConfig && providerConfig.sttProvider === effectiveSttProvider && providerConfig.sttApiKey ? providerConfig.sttApiKey : resolvedSttApiKey;
      const resolvedTtsApiKey = effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      const finalTtsApiKey = providerConfig && providerConfig.ttsProvider === effectiveTtsProvider && providerConfig.ttsApiKey ? providerConfig.ttsApiKey : resolvedTtsApiKey;
      console.log(`[AudioWS] Provider config resolved \u2014 STT: ${effectiveSttProvider}, TTS: ${effectiveTtsProvider}, LLM: ${llmProvider}`);
      const pc = providerConfigResult.rows.length > 0 ? camelizeKeys(providerConfigResult.rows[0]) : null;
      const finalSttModel = pc && pc.sttProvider === effectiveSttProvider && pc.sttModel ? pc.sttModel : effectiveSttProvider === "sarvam" ? globalSettingsMap["ve_stt_sarvam_model"] || "saaras:v3" : globalSettingsMap["ve_stt_deepgram_model"] || "nova-2";
      const finalTtsModel = effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_model"] || "bulbul:v3" : pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsVoice ? pc.ttsVoice : globalSettingsMap["ve_tts_deepgram_model"] || "aura-asteria-en";
      const finalTtsSpeaker = pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsVoice && effectiveTtsProvider === "sarvam" ? pc.ttsVoice : pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsConfig?.sarvamSpeaker ? pc.ttsConfig.sarvamSpeaker : effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_speaker"] || "neha" : "";
      const sttConfigObj = {
        provider: effectiveSttProvider,
        apiKey: finalSttApiKey,
        language: agent.language || "en",
        model: agent.sttModel || finalSttModel,
        deepgramModel: agent.sttModel || finalSttModel,
        // Backward compatibility
        sarvamModel: agent.sttModel || finalSttModel,
        // Backward compatibility
        detectLanguage: agent.detectLanguageEnabled || false,
        ...sttConfig
      };
      const isOutbound = sessionData?.direction === "outbound";
      const rawCustomerPhone = isOutbound ? sessionData?.toNumber || toNumber || "" : sessionData?.fromNumber || fromNumber || "";
      const customerPhone = (rawCustomerPhone.startsWith("+") ? "plus " : "") + rawCustomerPhone.replace(/\+/g, "").split("").join(" ");
      const today = /* @__PURE__ */ new Date();
      const dateContext = `

[SYSTEM CONTEXT]
- Current Date and Time: ${today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (IST)
- Today is a: ${today.toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" })}
- ISO Date: ${today.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })}
- Always interpret relative dates (like "today", "tomorrow", "this Sunday", "next Monday") based on this current date.
${customerPhone ? `- Customer's Phone Number (the number they are using for this call): ${customerPhone}
- IF the customer says "use my own number", "same number", "use the number I am calling from", "use the number you called", or similar, do NOT ask them to repeat or say it. You already have it. Simply confirm it with them: "So you want to use ${customerPhone}, is that correct?" and then proceed.` : ""}
${agent.detectLanguageEnabled ? `- Dynamic Language Switching: If the customer speaks to you in Hindi, Tamil, Telugu, Kannada, or any language other than English, you MUST immediately switch your response and speak ONLY in that same language. Do not speak English if they speak to you in a different language.` : ""}
${apptSettingsText}`;
      const langDisplayNames = new Intl.DisplayNames(["en"], { type: "language" });
      const agentLanguage = agent.language || "en";
      const languageName = langDisplayNames.of(agentLanguage) || agentLanguage;
      let systemPrompt = agent.systemPrompt || "";
      systemPrompt = systemPrompt.replace(/#{0,2}\s*CRITICAL LANGUAGE REQUIREMENT[\s\S]*?(?=\n\n|$)/g, "").trim();
      systemPrompt += dateContext;
      if (agentLanguage !== "en") {
        systemPrompt += `

## CRITICAL LANGUAGE REQUIREMENT (FINAL OVERRIDE)
You MUST speak ONLY in ${languageName}. From the very first word you say, speak in ${languageName}. Do NOT speak English or any other language. This overrides any previous language instructions in this prompt. This is mandatory.`;
      }
      const llmConfigObj = {
        provider: llmProvider,
        apiKey: llmApiKey,
        model: agent.llmModel || llmModel,
        temperature: agent.temperature || 0.7,
        maxTokens: agent.maxTokens || 500,
        systemPrompt,
        ...llmConfig
      };
      let resolvedTtsVoice;
      let resolvedSarvamSpeaker;
      if (effectiveTtsProvider === "sarvam") {
        const agentSpeaker = agent.ttsVoice && !agent.ttsVoice.startsWith("aura-") ? agent.ttsVoice : agent.openaiVoice && !agent.openaiVoice.startsWith("aura-") ? agent.openaiVoice : null;
        resolvedSarvamSpeaker = agentSpeaker || finalTtsSpeaker || "neha";
        resolvedTtsVoice = resolvedSarvamSpeaker;
      } else {
        const agentDeepgramVoice = agent.ttsVoice && agent.ttsVoice.startsWith("aura-") ? agent.ttsVoice : agent.openaiVoice && agent.openaiVoice.startsWith("aura-") ? agent.openaiVoice : null;
        resolvedTtsVoice = agentDeepgramVoice || finalTtsModel;
        resolvedSarvamSpeaker = "";
      }
      const ttsConfigObj = {
        provider: effectiveTtsProvider,
        apiKey: finalTtsApiKey,
        voice: resolvedTtsVoice,
        language: agent.language || "en",
        deepgramModel: resolvedTtsVoice,
        sarvamModel: agent.ttsModel || finalTtsModel,
        sarvamSpeaker: resolvedSarvamSpeaker,
        outputFormat: {
          encoding: "linear16",
          sampleRate: 8e3,
          channels: 1,
          bitDepth: 16
        },
        ...ttsConfig
      };
      const audioSession = new AudioSession(
        sessionId,
        sessionData,
        agent,
        sttConfigObj,
        llmConfigObj,
        ttsConfigObj,
        void 0,
        tools2,
        toolMetadata
      );
      this.setupDatabaseSync(audioSession);
      this.registerSession(audioSession);
      return audioSession;
    } catch (err) {
      console.error(`[AudioWS] Failed to resolve session ${sessionId} dynamically:`, err.message);
      return null;
    }
  }
  async getChannelVariablesFromNode(node, channelUuid) {
    const existingEsl = this.eslConnections.find(
      (e) => e.config.host === node.eslHost && e.config.port === node.eslPort && e.isConnected()
    );
    if (existingEsl) {
      try {
        let destinationNumber = await existingEsl.getVariable(channelUuid, "destination_number");
        let callerIdNumber = await existingEsl.getVariable(channelUuid, "caller_id_number");
        if (destinationNumber === "_undef_") destinationNumber = void 0;
        if (callerIdNumber === "_undef_") callerIdNumber = void 0;
        return { destinationNumber, callerIdNumber };
      } catch (err) {
        console.warn(`[AudioWS] Failed to get variables using existing connection to ${node.eslHost}:`, err.message);
      }
    }
    const esl = new EslConnection({
      host: node.eslHost,
      port: node.eslPort,
      password: node.eslPassword,
      reconnect: false
    });
    esl.on("error", (err) => {
      console.error("[ESL] Client error during channel variables retrieval:", err.message);
    });
    try {
      await esl.connect();
      let destinationNumber = await esl.getVariable(channelUuid, "destination_number");
      let callerIdNumber = await esl.getVariable(channelUuid, "caller_id_number");
      await esl.disconnect();
      if (destinationNumber === "_undef_") destinationNumber = void 0;
      if (callerIdNumber === "_undef_") callerIdNumber = void 0;
      return { destinationNumber, callerIdNumber };
    } catch (err) {
      console.error(`[AudioWS] Failed to get variables on ${node.eslHost}:${node.eslPort}:`, err.message);
      try {
        await esl.disconnect();
      } catch {
      }
      return null;
    }
  }
  setupDatabaseSync(session) {
    const saveSession = async () => {
      try {
        const sess = session.getSession();
        const channelUuid = sess.channelUuid || session.id;
        await db.execute(sql20`
          UPDATE ve_sessions
          SET status = ${sess.status},
              duration_seconds = GREATEST(duration_seconds, ${sess.durationSeconds || 0}),
              ended_at = ${sess.endedAt || null},
              transcript = ${JSON.stringify(sess.transcript)},
              stt_duration_ms = ${sess.sttDurationMs || 0},
              llm_prompt_tokens = ${sess.llmPromptTokens || 0},
              llm_completion_tokens = ${sess.llmCompletionTokens || 0},
              tts_duration_ms = ${sess.ttsDurationMs || 0},
              tts_characters = ${sess.ttsCharacters || 0},
              credits_used = GREATEST(credits_used, ${sess.creditsUsed || 0}),
              channel_uuid = ${channelUuid},
              updated_at = NOW()
          WHERE id = ${session.id}
        `);
      } catch (err) {
        console.error(`[AudioWS] Failed to save session ${session.id} to DB:`, err.message);
      }
    };
    session.on("statusChange", async (status) => {
      if (status === "completed" || session.getSession().status === "completed") {
        try {
          const sess = session.getSession();
          const duration = sess.durationSeconds || 0;
          if (duration > 0) {
            const creditPriceResult = await db.execute(sql20`
              SELECT value FROM global_settings WHERE key = 'credit_price_per_minute' LIMIT 1
            `);
            const creditPriceSetting = creditPriceResult.rows?.[0];
            let creditPricePerMinute = 1;
            if (creditPriceSetting?.value) {
              const parsed = Number(creditPriceSetting.value);
              if (Number.isFinite(parsed) && parsed >= 0) {
                creditPricePerMinute = parsed;
              }
            }
            const minutes = Math.ceil(duration / 60);
            const creditsToDeduct = Math.ceil(minutes * creditPricePerMinute);
            const deductCallCredits = global.deductCallCredits;
            if (!deductCallCredits) {
              throw new Error("deductCallCredits is not registered globally");
            }
            const creditResult = await deductCallCredits({
              userId: sess.userId,
              creditsToDeduct,
              callId: session.id,
              fromNumber: sess.fromNumber || "Unknown",
              toNumber: sess.toNumber || "Unknown",
              durationSeconds: duration,
              engine: "custom-voice-engine"
            });
            if (creditResult.success || creditResult.alreadyDeducted) {
              session.session.creditsUsed = creditsToDeduct;
              console.log(`[AudioWS] Deducted ${creditsToDeduct} credits for custom-voice-engine session ${session.id}`);
            }
          }
        } catch (creditErr) {
          console.error(`[AudioWS] Failed to deduct credits for session ${session.id}:`, creditErr.message);
        }
      }
      await saveSession();
      if (status === "completed" || session.getSession().status === "completed") {
        try {
          let CRMLeadProcessor2 = global.CRMLeadProcessor;
          if (!CRMLeadProcessor2) {
            const module = await Promise.resolve().then(() => (init_lead_processor_service(), lead_processor_service_exports));
            CRMLeadProcessor2 = module.CRMLeadProcessor;
          }
          await CRMLeadProcessor2.processCustomVoiceEngineCall(session.id);
        } catch (err) {
          console.error(`[AudioWS] Failed to process lead generation for session ${session.id}:`, err.message);
        }
      }
    });
    session.on("callAnswered", async () => {
      console.log(`[AudioWS] Session ${session.id} marked as answered, syncing to DB.`);
      await saveSession();
    });
    session.on("pipelineEvent", async (event) => {
      if (event.type === "stt_transcript" && event.transcript.isFinal || event.type === "llm_response" || event.type === "session_end") {
        await saveSession();
      }
    });
  }
};

// plugins/custom-voice-engine/services/monitoring/metrics-collector.ts
var MetricsCollector = class _MetricsCollector {
  static instance = null;
  counters = /* @__PURE__ */ new Map();
  gauges = /* @__PURE__ */ new Map();
  histograms = /* @__PURE__ */ new Map();
  static getInstance() {
    if (!_MetricsCollector.instance) _MetricsCollector.instance = new _MetricsCollector();
    return _MetricsCollector.instance;
  }
  incrementCounter(name, value = 1) {
    this.counters.set(name, (this.counters.get(name) || 0) + value);
  }
  setGauge(name, value) {
    this.gauges.set(name, value);
  }
  recordHistogram(name, value) {
    const values = this.histograms.get(name) || [];
    values.push(value);
    if (values.length > 1e3) values.shift();
    this.histograms.set(name, values);
  }
  // Track voice engine specific metrics
  trackCallStart() {
    this.incrementCounter("ve_calls_total");
    this.setGauge("ve_active_calls", (this.gauges.get("ve_active_calls") || 0) + 1);
  }
  trackCallEnd(durationMs) {
    this.setGauge("ve_active_calls", Math.max(0, (this.gauges.get("ve_active_calls") || 0) - 1));
    this.recordHistogram("ve_call_duration_ms", durationMs);
  }
  trackSttLatency(ms) {
    this.recordHistogram("ve_stt_latency_ms", ms);
  }
  trackLlmLatency(ms) {
    this.recordHistogram("ve_llm_latency_ms", ms);
  }
  trackTtsLatency(ms) {
    this.recordHistogram("ve_tts_latency_ms", ms);
  }
  trackError(type) {
    this.incrementCounter(`ve_errors_total_${type}`);
  }
  /** Prometheus text format */
  toPrometheusFormat() {
    const lines = [];
    for (const [name, value] of this.counters) lines.push(`# TYPE ${name} counter
${name} ${value}`);
    for (const [name, value] of this.gauges) lines.push(`# TYPE ${name} gauge
${name} ${value}`);
    for (const [name, values] of this.histograms) {
      if (values.length === 0) continue;
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const p50 = this.percentile(values, 0.5);
      const p95 = this.percentile(values, 0.95);
      const p99 = this.percentile(values, 0.99);
      lines.push(`# TYPE ${name} summary
${name}{quantile="0.5"} ${p50}
${name}{quantile="0.95"} ${p95}
${name}{quantile="0.99"} ${p99}
${name}_sum ${sum}
${name}_count ${values.length}
${name}_avg ${avg.toFixed(2)}`);
    }
    return lines.join("\n\n");
  }
  getSnapshot() {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      histogramSummaries: Object.fromEntries(
        Array.from(this.histograms.entries()).map(([k, v]) => [k, { count: v.length, avg: v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(2) : 0, p95: this.percentile(v, 0.95) }])
      )
    };
  }
  percentile(values, p) {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.ceil(p * sorted.length) - 1;
    return sorted[Math.max(0, idx)];
  }
};

// plugins/custom-voice-engine/index.ts
var PLUGIN_VERSION = "1.0.0";
var PLUGIN_NAME = "ai-voice-engine";
var audioWsServer = null;
var metricsCollector = null;
function registerAiVoiceEngineRoutes(app, options) {
  const { sessionAuthMiddleware, adminAuthMiddleware, httpServer } = options;
  app.use("/api/voice-engine/admin/settings", adminAuthMiddleware, createAdminSettingsRouter());
  app.use("/api/voice-engine/admin/freeswitch", adminAuthMiddleware, createAdminSettingsRouter());
  app.use("/api/voice-engine/admin/provider-keys", adminAuthMiddleware, createAdminProviderKeysRouter());
  app.use("/api/voice-engine/admin/storage", adminAuthMiddleware, createAdminStorageRouter());
  app.use("/api/voice-engine/config", sessionAuthMiddleware, createTenantConfigRouter());
  app.use("/api/voice-engine/calls", sessionAuthMiddleware, createCallsRouter());
  app.use("/api/voice-engine/recordings", sessionAuthMiddleware, createRecordingsRouter());
  app.use("/api/voice-engine/memory", sessionAuthMiddleware, createMemoryRouter());
  app.use("/api/voice-engine/analytics", sessionAuthMiddleware, createAnalyticsRouter());
  app.use("/api/voice-engine/agents", sessionAuthMiddleware, createAgentsRouter());
  if (httpServer) {
    try {
      if (audioWsServer) {
        audioWsServer.shutdown();
      }
      audioWsServer = new AudioWebSocketServer(httpServer);
      console.log("[AI Voice Engine]   - WebSocket audio server initialized");
    } catch (err) {
      console.warn("[AI Voice Engine] WebSocket server init failed:", err.message);
    }
  }
  try {
    metricsCollector = MetricsCollector.getInstance();
    console.log("[AI Voice Engine]   - Metrics collector initialized");
  } catch (err) {
    console.warn("[AI Voice Engine] Metrics collector init failed:", err.message);
  }
  (async () => {
    try {
      const os = await import("os");
      const getContainerIp = () => {
        const interfaces = os.networkInterfaces();
        for (const name of Object.keys(interfaces)) {
          for (const net2 of interfaces[name] || []) {
            if (net2.family === "IPv4" && !net2.internal) {
              if (net2.address.startsWith("10.") || net2.address.startsWith("172.") || net2.address.startsWith("192.168.")) {
                return net2.address;
              }
            }
          }
        }
        return "127.0.0.1";
      };
      const containerIp = getContainerIp();
      if (containerIp === "127.0.0.1") return;
      if (process.env.DISABLE_FREESWITCH_ESL === "true" || process.env.DISABLE_FREESWITCH_ESL === "1") {
        console.log("[AI Voice Engine] FreeSWITCH ESL connection initialization disabled via DISABLE_FREESWITCH_ESL environment variable.");
        return;
      }
      const wsUrl = `ws://${containerIp}:${process.env.PORT || "5000"}/voice-engine/ws/audio`;
      if (audioWsServer) {
        await audioWsServer.initializeEslConnections(wsUrl);
      }
    } catch (err) {
      console.warn(`[AI Voice Engine] Failed to configure FreeSWITCH nodes and ESL connections on startup:`, err.message);
    }
  })();
  console.log("[AI Voice Engine] Plugin registered (v1.0.0)");
  console.log("[AI Voice Engine] Endpoints:");
  console.log("  - /api/voice-engine/admin/settings (admin auth)");
  console.log("  - /api/voice-engine/admin/freeswitch (admin auth)");
  console.log("  - /api/voice-engine/admin/provider-keys (admin auth)");
  console.log("  - /api/voice-engine/config (user auth)");
  console.log("  - /api/voice-engine/calls (user auth)");
  console.log("  - /api/voice-engine/recordings (user auth)");
  console.log("  - /api/voice-engine/memory (user auth)");
  console.log("  - /api/voice-engine/analytics (user auth)");
  console.log("  - /api/voice-engine/agents (user auth)");
  console.log("[AI Voice Engine] Providers:");
  console.log("  - STT: Deepgram, Sarvam");
  console.log("  - LLM: OpenRouter (GPT-4o-mini, Gemini Flash)");
  console.log("  - TTS: Deepgram Nova-2, Sarvam");
  console.log("\u2705 AI Voice Engine Plugin initialized");
}
function getAudioWsServer() {
  return audioWsServer;
}
function getMetricsCollector() {
  return metricsCollector;
}
var index_default = {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerAiVoiceEngineRoutes
};
export {
  DEFAULT_STT_FORMAT,
  DEFAULT_TELEPHONY_FORMAT,
  DEFAULT_VAD_CONFIG,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  index_default as default,
  getAudioWsServer,
  getMetricsCollector,
  registerAiVoiceEngineRoutes
};
