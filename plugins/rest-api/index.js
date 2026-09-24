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
      // Migration 0018 — API-scheduled calls (CRM / WebinarX reminders)
      variables: jsonb("variables").$type(),
      // {{key}} substitutions for prompt + first message
      source: text("source").notNull().default("agent"),
      // agent | manual | api
      externalRef: text("external_ref"),
      // caller's idempotency key / their record id, unique per user
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      scheduledCallbacksDueIdx: index("scheduled_callbacks_status_scheduled_at_idx").on(table.status, table.scheduledAt),
      scheduledCallbacksUserIdx: index("scheduled_callbacks_user_created_idx").on(table.userId, table.createdAt),
      scheduledCallbacksExternalRefIdx: uniqueIndex("scheduled_callbacks_user_external_ref_idx").on(table.userId, table.externalRef)
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
import { eq as eq2, sql as sql2, and, gte, lt, desc, isNull, or, inArray } from "drizzle-orm";
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
  }).from(userSubscriptions).innerJoin(plans, eq2(userSubscriptions.planId, plans.id)).where(
    and(
      eq2(userSubscriptions.status, "active"),
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
  const userCampaigns = await db.select().from(campaigns).where(eq2(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq2(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(and(eq2(calls.userId, userId), gte(calls.createdAt, startDate)));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(and(inArray(calls.campaignId, campaignIds), gte(calls.createdAt, startDate)));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(and(inArray(calls.incomingConnectionId, incomingConnectionIds), gte(calls.createdAt, startDate)));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(and(eq2(twilioOpenaiCalls.userId, userId), gte(twilioOpenaiCalls.createdAt, startDate)));
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
    const plivoAnalyticsCallsData = await db.select().from(plivoCalls).where(and(eq2(plivoCalls.userId, userId), gte(plivoCalls.createdAt, startDate)));
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
  const userCampaigns = await db.select().from(campaigns).where(eq2(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq2(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(eq2(calls.userId, userId));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(inArray(calls.campaignId, campaignIds));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(inArray(calls.incomingConnectionId, incomingConnectionIds));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(eq2(twilioOpenaiCalls.userId, userId));
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
    const plivoCallsData = await db.select().from(plivoCalls).where(eq2(plivoCalls.userId, userId));
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
    const sipCallsData = await db.select().from(sipCalls).where(eq2(sipCalls.userId, userId));
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
    }).from(calls).where(eq2(calls.userId, userId)).orderBy(desc(calls.createdAt)).limit(10);
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Dashboard] Missing database column for recent calls:", callFetchError.message);
    } else {
      console.error("[Dashboard] Error fetching recent calls:", callFetchError.message);
    }
  }
  let recentUsers = [];
  const [currentUser] = await db.select().from(users).where(eq2(users.id, userId));
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
      allCampaignCalls = await db.select().from(calls).where(inArray(calls.campaignId, campaignIds));
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
  const [appointmentsResult] = await db.select({ count: sql2`count(*)` }).from(appointments).where(eq2(appointments.userId, userId));
  const appointmentsCount = Number(appointmentsResult?.count || 0);
  const userForms = await db.select({ id: forms.id }).from(forms).where(eq2(forms.userId, userId));
  const formsCount = userForms.length;
  let formSubmissionsCount = 0;
  if (userForms.length > 0) {
    const formIds = userForms.map((f) => f.id);
    const [submissionsResult] = await db.select({ count: sql2`count(*)` }).from(formSubmissions).where(inArray(formSubmissions.formId, formIds));
    formSubmissionsCount = Number(submissionsResult?.count || 0);
  }
  const [kbResult] = await db.select({ count: sql2`count(*)` }).from(knowledgeBase).where(eq2(knowledgeBase.userId, userId));
  const knowledgeBaseCount = Number(kbResult?.count || 0);
  const [webhooksResult] = await db.select({ count: sql2`count(*)` }).from(webhookSubscriptions).where(eq2(webhookSubscriptions.userId, userId));
  const webhooksCount = Number(webhooksResult?.count || 0);
  const [userTemplatesResult] = await db.select({ count: sql2`count(*)` }).from(promptTemplates).where(eq2(promptTemplates.userId, userId));
  const userTemplatesCount = Number(userTemplatesResult?.count || 0);
  const [systemTemplatesResult] = await db.select({ count: sql2`count(*)` }).from(promptTemplates).where(eq2(promptTemplates.isSystemTemplate, true));
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
import { eq as eq3, sql as sql3, and as and2, gte as gte2, lte as lte2, desc as desc2, asc, isNull as isNull2, isNotNull as isNotNull2, or as or2, inArray as inArray2, ilike, count } from "drizzle-orm";
function userSubscriptionPreferenceOrder() {
  return [
    sql3`CASE WHEN ${userSubscriptions.status} = 'active' THEN 0 ELSE 1 END`,
    sql3`CASE WHEN ${userSubscriptions.status} = 'active' THEN ${userSubscriptions.currentPeriodEnd} END DESC NULLS LAST`,
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
        const [user] = await db.select().from(users).where(eq3(users.id, id));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq3(users.email, email));
        return user;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async updateUserCredits(userId, credits) {
        await db.update(users).set({ credits }).where(eq3(users.id, userId));
      }
      // Agents
      async getAgent(id) {
        const [agent] = await db.select().from(agents).where(eq3(agents.id, id));
        return agent;
      }
      async getUserAgents(userId) {
        return db.select().from(agents).where(eq3(agents.userId, userId));
      }
      async createAgent(insertAgent) {
        const [agent] = await db.insert(agents).values(insertAgent).returning();
        return agent;
      }
      async updateAgent(id, agent) {
        await db.update(agents).set(agent).where(eq3(agents.id, id));
      }
      async deleteAgent(id) {
        await db.delete(agents).where(eq3(agents.id, id));
      }
      // Knowledge Base
      async getKnowledgeBaseItem(id) {
        const [item] = await db.select().from(knowledgeBase).where(eq3(knowledgeBase.id, id));
        return item;
      }
      async getUserKnowledgeBase(userId) {
        return db.select().from(knowledgeBase).where(eq3(knowledgeBase.userId, userId));
      }
      async getUserKnowledgeBaseCount(userId) {
        const result = await db.select({ count: sql3`count(*)` }).from(knowledgeBase).where(eq3(knowledgeBase.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async createKnowledgeBaseItem(insertItem) {
        const [item] = await db.insert(knowledgeBase).values(insertItem).returning();
        return item;
      }
      async updateKnowledgeBaseItem(id, item) {
        await db.update(knowledgeBase).set(item).where(eq3(knowledgeBase.id, id));
      }
      async deleteKnowledgeBaseItem(id) {
        await db.delete(knowledgeBase).where(eq3(knowledgeBase.id, id));
      }
      // Campaigns
      async getCampaign(id) {
        const [campaign] = await db.select().from(campaigns).where(and2(
          eq3(campaigns.id, id),
          isNull2(campaigns.deletedAt)
        ));
        return campaign;
      }
      async getCampaignIncludingDeleted(id) {
        const [campaign] = await db.select().from(campaigns).where(eq3(campaigns.id, id));
        return campaign;
      }
      async getUserCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq3(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async getUserDeletedCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq3(campaigns.userId, userId),
          isNotNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async createCampaign(insertCampaign) {
        const [campaign] = await db.insert(campaigns).values(insertCampaign).returning();
        return campaign;
      }
      async updateCampaign(id, campaign) {
        await db.update(campaigns).set(campaign).where(eq3(campaigns.id, id));
      }
      async deleteCampaign(id) {
        await db.update(campaigns).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq3(campaigns.id, id));
      }
      async restoreCampaign(id) {
        await db.update(campaigns).set({ deletedAt: null }).where(eq3(campaigns.id, id));
      }
      // Contacts
      async getContact(id) {
        const [contact] = await db.select().from(contacts).where(eq3(contacts.id, id));
        return contact;
      }
      async getCampaignContacts(campaignId) {
        return db.select().from(contacts).where(eq3(contacts.campaignId, campaignId));
      }
      async getUserContacts(userId) {
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq3(contacts.campaignId, campaigns.id)).where(and2(
          eq3(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        ));
        return results.map((r) => ({
          ...r.contact,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null
        }));
      }
      async getUserContactsDeduplicated(userId) {
        const normalizePhone3 = (phone) => {
          let cleaned = phone.replace(/[\s\-().]/g, "");
          if (cleaned.startsWith("00")) cleaned = "+" + cleaned.slice(2);
          if (!cleaned.startsWith("+") && cleaned.length >= 10) cleaned = "+" + cleaned;
          return cleaned;
        };
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq3(contacts.campaignId, campaigns.id)).where(and2(
          eq3(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(contacts.createdAt));
        const phoneGroups = /* @__PURE__ */ new Map();
        for (const result of results) {
          const { contact, campaign } = result;
          const phone = normalizePhone3(contact.phone);
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
          eq3(calls.userId, userId),
          isNull2(calls.contactId),
          isNotNull2(calls.phoneNumber)
        )).orderBy(desc2(calls.createdAt));
        for (const call of callsWithoutContacts) {
          const rawPhone = call.phoneNumber;
          if (!rawPhone || rawPhone === "Unknown Caller" || rawPhone === "unknown") continue;
          const phone = normalizePhone3(rawPhone);
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
        }).from(leads).where(eq3(leads.userId, userId)).orderBy(desc2(leads.createdAt));
        for (const lead of leadsResults) {
          if (!lead.phone || lead.phone === "Unknown Caller" || lead.phone === "unknown") continue;
          const phone = normalizePhone3(lead.phone);
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
          eq3(twilioOpenaiCalls.userId, userId),
          isNull2(twilioOpenaiCalls.contactId)
        )).orderBy(desc2(twilioOpenaiCalls.createdAt));
        for (const call of twilioOpenaiCallsResults) {
          const rawTwPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawTwPhone || rawTwPhone === "Unknown Caller" || rawTwPhone === "unknown") continue;
          const phone = normalizePhone3(rawTwPhone);
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
          eq3(plivoCalls.userId, userId),
          isNull2(plivoCalls.contactId)
        )).orderBy(desc2(plivoCalls.createdAt));
        for (const call of plivoCallsResults) {
          const rawPlPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawPlPhone || rawPlPhone === "Unknown Caller" || rawPlPhone === "unknown") continue;
          const phone = normalizePhone3(rawPlPhone);
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
          eq3(sipCalls.userId, userId),
          isNull2(sipCalls.contactId)
        )).orderBy(desc2(sipCalls.createdAt));
        for (const call of sipCallsResults) {
          const rawSipPhone = call.direction === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawSipPhone || rawSipPhone === "Unknown Caller" || rawSipPhone === "unknown") continue;
          const phone = normalizePhone3(rawSipPhone);
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
        await db.delete(contacts).where(eq3(contacts.id, id));
      }
      // Calls
      async getCall(id) {
        const [call] = await db.select().from(calls).where(eq3(calls.id, id));
        return call;
      }
      async getCallWithDetails(id) {
        const elevenLabsResults = await db.select({
          call: calls,
          campaign: campaigns,
          contact: contacts,
          incomingConnection: incomingConnections,
          widget: websiteWidgets
        }).from(calls).leftJoin(campaigns, eq3(calls.campaignId, campaigns.id)).leftJoin(contacts, eq3(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq3(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq3(calls.widgetId, websiteWidgets.id)).where(eq3(calls.id, id));
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
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq3(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq3(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq3(twilioOpenaiCalls.agentId, agents.id)).where(eq3(twilioOpenaiCalls.id, id));
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
        }).from(plivoCalls).leftJoin(campaigns, eq3(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq3(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq3(plivoCalls.agentId, agents.id)).where(eq3(plivoCalls.id, id));
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
        }).from(sipCalls).leftJoin(agents, eq3(sipCalls.agentId, agents.id)).leftJoin(contacts, eq3(sipCalls.contactId, contacts.id)).where(eq3(sipCalls.id, id));
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
        return db.select().from(calls).where(eq3(calls.campaignId, campaignId));
      }
      async getUserCalls(userId) {
        const results = await db.select({ calls }).from(calls).leftJoin(campaigns, eq3(calls.campaignId, campaigns.id)).leftJoin(incomingConnections, eq3(calls.incomingConnectionId, incomingConnections.id)).where(
          or2(
            eq3(calls.userId, userId),
            and2(isNotNull2(calls.campaignId), eq3(campaigns.userId, userId)),
            and2(isNotNull2(calls.incomingConnectionId), eq3(incomingConnections.userId, userId))
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
        }).from(calls).leftJoin(campaigns, eq3(calls.campaignId, campaigns.id)).leftJoin(contacts, eq3(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq3(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq3(calls.widgetId, websiteWidgets.id)).where(
          or2(
            // Primary filter: Direct user ownership (guaranteed isolation)
            eq3(calls.userId, userId),
            // Fallback for legacy calls: Check via campaign ownership
            and2(isNotNull2(calls.campaignId), eq3(campaigns.userId, userId)),
            // Fallback for legacy calls: Check via incoming connection ownership
            and2(isNotNull2(calls.incomingConnectionId), eq3(incomingConnections.userId, userId))
          )
        ).orderBy(sql3`${calls.createdAt} DESC`);
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
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq3(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq3(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq3(twilioOpenaiCalls.agentId, agents.id)).where(eq3(twilioOpenaiCalls.userId, userId)).orderBy(sql3`${twilioOpenaiCalls.createdAt} DESC`);
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
        }).from(plivoCalls).leftJoin(campaigns, eq3(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq3(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq3(plivoCalls.agentId, agents.id)).where(eq3(plivoCalls.userId, userId)).orderBy(sql3`${plivoCalls.createdAt} DESC`);
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
        }).from(sipCalls).leftJoin(agents, eq3(sipCalls.agentId, agents.id)).leftJoin(contacts, eq3(sipCalls.contactId, contacts.id)).where(eq3(sipCalls.userId, userId)).orderBy(sql3`${sipCalls.createdAt} DESC`);
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
        await db.update(calls).set(call).where(eq3(calls.id, id));
      }
      // Credit Transactions
      async getCreditTransaction(id) {
        const [transaction] = await db.select().from(creditTransactions).where(eq3(creditTransactions.id, id));
        return transaction;
      }
      async getUserCreditTransactions(userId) {
        return db.select().from(creditTransactions).where(eq3(creditTransactions.userId, userId));
      }
      async createCreditTransaction(insertTransaction) {
        const [transaction] = await db.insert(creditTransactions).values(insertTransaction).returning();
        return transaction;
      }
      // Atomic credit purchase: creates transaction + adds credits in single DB transaction
      async addCreditsAtomic(userId, credits, description, reference, executor) {
        const run = async (tx) => {
          if (executor) {
            const [dup] = await tx.select({ id: creditTransactions.id }).from(creditTransactions).where(eq3(creditTransactions.stripePaymentId, reference)).limit(1);
            if (dup) throw new Error(`duplicate credit reference ${reference}`);
          }
          await tx.insert(creditTransactions).values({
            userId,
            type: "credit",
            amount: credits,
            description,
            stripePaymentId: reference
          });
          await tx.execute(sql3`
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
        const [tool] = await db.select().from(tools).where(eq3(tools.id, id));
        return tool;
      }
      async getUserTools(userId) {
        return db.select().from(tools).where(eq3(tools.userId, userId));
      }
      async createTool(insertTool) {
        const [tool] = await db.insert(tools).values(insertTool).returning();
        return tool;
      }
      async updateTool(id, tool) {
        await db.update(tools).set(tool).where(eq3(tools.id, id));
      }
      async deleteTool(id) {
        await db.delete(tools).where(eq3(tools.id, id));
      }
      // Phone Number Rentals
      async createPhoneNumberRental(insertRental) {
        const [rental] = await db.insert(phoneNumberRentals).values(insertRental).returning();
        return rental;
      }
      async getPhoneNumberRentals(phoneNumberId) {
        return db.select().from(phoneNumberRentals).where(eq3(phoneNumberRentals.phoneNumberId, phoneNumberId)).orderBy(desc2(phoneNumberRentals.createdAt));
      }
      // Voices
      async getVoice(id) {
        const [voice] = await db.select().from(voices).where(eq3(voices.id, id));
        return voice;
      }
      async getUserVoices(userId) {
        return db.select().from(voices).where(eq3(voices.userId, userId));
      }
      async createVoice(insertVoice) {
        const [voice] = await db.insert(voices).values(insertVoice).returning();
        return voice;
      }
      async deleteVoice(id) {
        await db.delete(voices).where(eq3(voices.id, id));
      }
      // Plans
      async getPlan(id) {
        const [plan] = await db.select().from(plans).where(eq3(plans.id, id));
        return plan;
      }
      async getPlanByName(name) {
        const [plan] = await db.select().from(plans).where(eq3(plans.name, name));
        return plan;
      }
      async getAllPlans() {
        return db.select().from(plans).where(eq3(plans.isActive, true));
      }
      async createPlan(insertPlan) {
        const [plan] = await db.insert(plans).values(insertPlan).returning();
        return plan;
      }
      async updatePlan(id, plan) {
        const result = await db.update(plans).set(plan).where(eq3(plans.id, id)).returning({ id: plans.id });
        if (result.length === 0) {
          throw new Error(`Failed to update plan: Plan with id '${id}' not found`);
        }
      }
      async deletePlan(id) {
        await db.delete(plans).where(eq3(plans.id, id));
      }
      // Global Settings
      async getGlobalSetting(key) {
        const [setting] = await db.select().from(globalSettings).where(eq3(globalSettings.key, key));
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
          await db.execute(sql3`
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
        const [pack] = await db.select().from(creditPackages).where(eq3(creditPackages.id, id));
        return pack;
      }
      async getAllCreditPackages() {
        return db.select().from(creditPackages).where(eq3(creditPackages.isActive, true));
      }
      async createCreditPackage(insertPack) {
        const [pack] = await db.insert(creditPackages).values(insertPack).returning();
        return pack;
      }
      async updateCreditPackage(id, pack) {
        const result = await db.update(creditPackages).set(pack).where(eq3(creditPackages.id, id)).returning({ id: creditPackages.id });
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
          sql3`${users.role} = 'admin'`
        ).orderBy(desc2(users.createdAt));
      }
      async updateUser(id, user) {
        const result = await db.update(users).set(user).where(eq3(users.id, id)).returning({ id: users.id });
        if (result.length === 0) {
          throw new Error(`Failed to update user: User with id '${id}' not found`);
        }
      }
      async getSystemPhoneNumbers() {
        const results = await db.select({
          phone: phoneNumbers,
          user: users
        }).from(phoneNumbers).leftJoin(users, eq3(phoneNumbers.userId, users.id));
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
        }).from(userSubscriptions).leftJoin(plans, eq3(userSubscriptions.planId, plans.id)).where(eq3(userSubscriptions.userId, userId)).orderBy(...userSubscriptionPreferenceOrder()).limit(1);
        if (result.length > 0 && result[0].subscription && result[0].plan) {
          return {
            ...result[0].subscription,
            plan: result[0].plan
          };
        }
        const [freePlan] = await db.select().from(plans).where(eq3(plans.name, "free")).limit(1);
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
        await db.update(userSubscriptions).set(subscription).where(eq3(userSubscriptions.id, id));
      }
      async updateUserSubscriptionByUserId(userId, subscription) {
        await db.update(userSubscriptions).set({ ...subscription, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(userSubscriptions.userId, userId));
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
          const [freePlan] = await db.select().from(plans).where(eq3(plans.name, "free")).limit(1);
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
        const [phoneNumber] = await db.select().from(phoneNumbers).where(eq3(phoneNumbers.id, id));
        return phoneNumber;
      }
      async getUserPhoneNumbers(userId) {
        return db.select().from(phoneNumbers).where(eq3(phoneNumbers.userId, userId));
      }
      async getAllPhoneNumbers() {
        return db.select().from(phoneNumbers);
      }
      async createPhoneNumber(insertPhoneNumber) {
        const [phoneNumber] = await db.insert(phoneNumbers).values(insertPhoneNumber).returning();
        return phoneNumber;
      }
      async updatePhoneNumber(id, phoneNumber) {
        await db.update(phoneNumbers).set(phoneNumber).where(eq3(phoneNumbers.id, id));
      }
      async deletePhoneNumber(id) {
        await db.delete(phoneNumbers).where(eq3(phoneNumbers.id, id));
      }
      // Usage Records
      async createUsageRecord(insertRecord) {
        const [record] = await db.insert(usageRecords).values(insertRecord).returning();
        return record;
      }
      async getUserUsageRecords(userId) {
        return db.select().from(usageRecords).where(eq3(usageRecords.userId, userId));
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
        const [webhook] = await db.select().from(webhookSubscriptions).where(eq3(webhookSubscriptions.id, id));
        return webhook;
      }
      async getUserWebhooks(userId) {
        return await db.select().from(webhookSubscriptions).where(eq3(webhookSubscriptions.userId, userId)).orderBy(desc2(webhookSubscriptions.createdAt));
      }
      async getUserWebhookCount(userId) {
        const result = await db.select({ count: sql3`count(*)` }).from(webhookSubscriptions).where(eq3(webhookSubscriptions.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async getWebhooksForEvent(userId, event, campaignId) {
        const allUserWebhooks = await db.select().from(webhookSubscriptions).where(and2(
          eq3(webhookSubscriptions.userId, userId),
          eq3(webhookSubscriptions.isActive, true)
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
        await db.update(webhookSubscriptions).set(updateData).where(eq3(webhookSubscriptions.id, id));
      }
      async deleteWebhook(id) {
        await db.delete(webhookSubscriptions).where(eq3(webhookSubscriptions.id, id));
      }
      // Webhook Delivery Logs
      async getWebhookLog(id) {
        const [log] = await db.select().from(webhookDeliveryLogs).where(eq3(webhookDeliveryLogs.id, id));
        return log;
      }
      async getWebhookLogs(webhookId, limit = 50) {
        return await db.select().from(webhookDeliveryLogs).where(eq3(webhookDeliveryLogs.webhookId, webhookId)).orderBy(desc2(webhookDeliveryLogs.createdAt)).limit(limit);
      }
      async createWebhookLog(log) {
        const [newLog] = await db.insert(webhookDeliveryLogs).values(log).returning();
        return newLog;
      }
      async updateWebhookLog(id, log) {
        await db.update(webhookDeliveryLogs).set(log).where(eq3(webhookDeliveryLogs.id, id));
      }
      async getFailedWebhookLogs(limit = 100) {
        return await db.select().from(webhookDeliveryLogs).where(and2(
          eq3(webhookDeliveryLogs.success, false),
          isNotNull2(webhookDeliveryLogs.nextRetryAt)
        )).orderBy(asc(webhookDeliveryLogs.nextRetryAt)).limit(limit);
      }
      // Notifications
      async getNotification(id) {
        const [notification] = await db.select().from(notifications).where(eq3(notifications.id, id));
        return notification;
      }
      async getUserNotifications(userId, limit = 50) {
        return await db.select().from(notifications).where(eq3(notifications.userId, userId)).orderBy(desc2(notifications.createdAt)).limit(limit);
      }
      async getUnreadNotificationCount(userId) {
        const result = await db.select({ count: sql3`count(*)` }).from(notifications).where(and2(eq3(notifications.userId, userId), eq3(notifications.isRead, false)));
        return Number(result[0]?.count || 0);
      }
      async createNotification(notification) {
        const [newNotification] = await db.insert(notifications).values(notification).returning();
        return newNotification;
      }
      async markNotificationAsRead(id) {
        await db.update(notifications).set({ isRead: true }).where(eq3(notifications.id, id));
      }
      async markAllNotificationsAsRead(userId) {
        await db.update(notifications).set({ isRead: true }).where(eq3(notifications.userId, userId));
      }
      async getBannerNotifications(userId) {
        return await db.select().from(notifications).where(and2(
          eq3(notifications.userId, userId),
          or2(
            eq3(notifications.displayType, "banner"),
            eq3(notifications.displayType, "both")
          ),
          eq3(notifications.isDismissed, false),
          or2(
            isNull2(notifications.expiresAt),
            gte2(notifications.expiresAt, /* @__PURE__ */ new Date())
          )
        )).orderBy(desc2(notifications.priority), desc2(notifications.createdAt));
      }
      async dismissNotification(id, userId) {
        if (userId) {
          await db.update(notifications).set({ isDismissed: true }).where(and2(eq3(notifications.id, id), eq3(notifications.userId, userId)));
        } else {
          await db.update(notifications).set({ isDismissed: true }).where(eq3(notifications.id, id));
        }
      }
      async deleteNotification(id) {
        await db.delete(notifications).where(eq3(notifications.id, id));
      }
      // Email Templates
      async getEmailTemplates() {
        return await db.select().from(emailTemplates).orderBy(emailTemplates.templateType);
      }
      async getEmailTemplate(templateType) {
        const [template] = await db.select().from(emailTemplates).where(eq3(emailTemplates.templateType, templateType));
        return template;
      }
      async updateEmailTemplate(id, data) {
        await db.update(emailTemplates).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(emailTemplates.id, id));
      }
      async createEmailTemplate(data) {
        const [template] = await db.insert(emailTemplates).values(data).returning();
        return template;
      }
      // Prompt Templates
      async getPromptTemplate(id) {
        const [template] = await db.select().from(promptTemplates).where(eq3(promptTemplates.id, id));
        return template;
      }
      async getUserPromptTemplates(userId) {
        return await db.select().from(promptTemplates).where(eq3(promptTemplates.userId, userId)).orderBy(desc2(promptTemplates.createdAt));
      }
      async getSystemPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq3(promptTemplates.isSystemTemplate, true)).orderBy(asc(promptTemplates.category), asc(promptTemplates.name));
      }
      async getPublicPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq3(promptTemplates.isPublic, true)).orderBy(desc2(promptTemplates.usageCount), asc(promptTemplates.name));
      }
      async createPromptTemplate(template) {
        const [newTemplate] = await db.insert(promptTemplates).values(template).returning();
        return newTemplate;
      }
      async updatePromptTemplate(id, template) {
        await db.update(promptTemplates).set({ ...template, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(promptTemplates.id, id));
      }
      async deletePromptTemplate(id) {
        await db.delete(promptTemplates).where(eq3(promptTemplates.id, id));
      }
      async incrementPromptTemplateUsage(id) {
        await db.update(promptTemplates).set({
          usageCount: sql3`${promptTemplates.usageCount} + 1`,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq3(promptTemplates.id, id));
      }
      // Agent Versions
      async getAgentVersion(id) {
        const [version] = await db.select().from(agentVersions).where(eq3(agentVersions.id, id));
        return version;
      }
      async getAgentVersions(agentId) {
        return await db.select().from(agentVersions).where(eq3(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber));
      }
      async getAgentVersionByNumber(agentId, versionNumber) {
        const [version] = await db.select().from(agentVersions).where(and2(
          eq3(agentVersions.agentId, agentId),
          eq3(agentVersions.versionNumber, versionNumber)
        ));
        return version;
      }
      async getLatestAgentVersion(agentId) {
        const [version] = await db.select().from(agentVersions).where(eq3(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber)).limit(1);
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
          const [updated] = await db.update(seoSettings).set(updateData).where(eq3(seoSettings.id, existing.id)).returning();
          return updated;
        } else {
          const [created] = await db.insert(seoSettings).values(settings).returning();
          return created;
        }
      }
      // Analytics Scripts
      async getAnalyticsScript(id) {
        const [script] = await db.select().from(analyticsScripts).where(eq3(analyticsScripts.id, id));
        return script;
      }
      async getAllAnalyticsScripts() {
        return db.select().from(analyticsScripts).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async getEnabledAnalyticsScripts() {
        return db.select().from(analyticsScripts).where(eq3(analyticsScripts.enabled, true)).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async createAnalyticsScript(script) {
        const [created] = await db.insert(analyticsScripts).values(script).returning();
        return created;
      }
      async updateAnalyticsScript(id, script) {
        const updateData = { ...script, updatedAt: /* @__PURE__ */ new Date() };
        await db.update(analyticsScripts).set(updateData).where(eq3(analyticsScripts.id, id));
      }
      async deleteAnalyticsScript(id) {
        await db.delete(analyticsScripts).where(eq3(analyticsScripts.id, id));
      }
      // Payment Transactions
      async getPaymentTransaction(id) {
        const [transaction] = await db.select().from(paymentTransactions).where(eq3(paymentTransactions.id, id));
        return transaction;
      }
      async getPaymentTransactionByGatewayId(gateway, gatewayTransactionId) {
        const [transaction] = await db.select().from(paymentTransactions).where(and2(
          eq3(paymentTransactions.gateway, gateway),
          eq3(paymentTransactions.gatewayTransactionId, gatewayTransactionId)
        ));
        return transaction;
      }
      async getPaymentTransactionByOrderId(gatewayOrderId) {
        const [transaction] = await db.select().from(paymentTransactions).where(eq3(paymentTransactions.gatewayOrderId, gatewayOrderId)).limit(1);
        return transaction;
      }
      async getUserPaymentTransactions(userId) {
        return db.select().from(paymentTransactions).where(eq3(paymentTransactions.userId, userId)).orderBy(desc2(paymentTransactions.createdAt));
      }
      async getAllPaymentTransactions(filters) {
        const conditions = [];
        if (filters?.gateway) {
          conditions.push(eq3(paymentTransactions.gateway, filters.gateway));
        }
        if (filters?.type) {
          conditions.push(eq3(paymentTransactions.type, filters.type));
        }
        if (filters?.status) {
          conditions.push(eq3(paymentTransactions.status, filters.status));
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
        await db.update(paymentTransactions).set({ ...transaction, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(paymentTransactions.id, id));
      }
      async getPaymentAnalytics(startDate, endDate) {
        const revenueStatuses = ["completed", "refunded", "partially_refunded"];
        const conditions = [];
        if (startDate) conditions.push(gte2(paymentTransactions.createdAt, startDate));
        if (endDate) conditions.push(lte2(paymentTransactions.createdAt, endDate));
        const transactions = await db.select().from(paymentTransactions).where(
          conditions.length > 0 ? and2(
            inArray2(paymentTransactions.status, revenueStatuses),
            ...conditions
          ) : inArray2(paymentTransactions.status, revenueStatuses)
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
        const [refund] = await db.select().from(refunds).where(eq3(refunds.id, id));
        return refund;
      }
      async getTransactionRefunds(transactionId) {
        return db.select().from(refunds).where(eq3(refunds.transactionId, transactionId)).orderBy(desc2(refunds.createdAt));
      }
      async getUserRefunds(userId) {
        return db.select().from(refunds).where(eq3(refunds.userId, userId)).orderBy(desc2(refunds.createdAt));
      }
      async getAllRefunds() {
        return db.select().from(refunds).orderBy(desc2(refunds.createdAt));
      }
      async createRefund(refund) {
        const [created] = await db.insert(refunds).values(refund).returning();
        return created;
      }
      async updateRefund(id, refund) {
        await db.update(refunds).set({ ...refund, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(refunds.id, id));
      }
      // Invoices
      async getInvoice(id) {
        const [invoice] = await db.select().from(invoices).where(eq3(invoices.id, id));
        return invoice;
      }
      async getInvoiceByNumber(invoiceNumber) {
        const [invoice] = await db.select().from(invoices).where(eq3(invoices.invoiceNumber, invoiceNumber));
        return invoice;
      }
      /** The tax invoice of a transaction (credit notes share the transactionId and are excluded). */
      async getTransactionInvoice(transactionId) {
        const [invoice] = await db.select().from(invoices).where(and2(eq3(invoices.transactionId, transactionId), eq3(invoices.invoiceType, "tax_invoice"))).orderBy(asc(invoices.createdAt)).limit(1);
        return invoice;
      }
      async getTransactionCreditNotes(transactionId) {
        return db.select().from(invoices).where(and2(eq3(invoices.transactionId, transactionId), eq3(invoices.invoiceType, "credit_note"))).orderBy(asc(invoices.createdAt));
      }
      async getUserInvoices(userId) {
        return db.select().from(invoices).where(eq3(invoices.userId, userId)).orderBy(desc2(invoices.createdAt));
      }
      async getAllInvoices() {
        return db.select().from(invoices).orderBy(desc2(invoices.createdAt));
      }
      async createInvoice(invoice) {
        const [created] = await db.insert(invoices).values(invoice).returning();
        return created;
      }
      async updateInvoice(id, invoice) {
        await db.update(invoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(invoices.id, id));
      }
      async getUserInvoicesPaginated(userId, options) {
        const limit = Math.min(Math.max(options.limit ?? 20, 1), 100);
        const offset = Math.max(options.offset ?? 0, 0);
        const conditions = [eq3(invoices.userId, userId)];
        if (options.type) conditions.push(eq3(invoices.invoiceType, options.type));
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
        if (filters.userId) conditions.push(eq3(invoices.userId, filters.userId));
        if (filters.type) conditions.push(eq3(invoices.invoiceType, filters.type));
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
          db.select({ invoice: invoices, userName: users.name, userEmail: users.email }).from(invoices).leftJoin(users, eq3(invoices.userId, users.id)).where(where).orderBy(desc2(invoices.issuedAt), desc2(invoices.createdAt)).limit(limit).offset(offset),
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
        const result = await executor.execute(sql3`
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
        const [prefixSetting] = await db.select().from(globalSettings).where(eq3(globalSettings.key, "invoice_prefix"));
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
          await tx.execute(sql3`SELECT pg_advisory_xact_lock(hashtext(${lockKey}))`);
          const invoiceNumber = await this.computeNextInvoiceNumber(tx, numbering);
          const [created] = await tx.insert(invoices).values({ ...invoice, invoiceNumber }).returning();
          return created;
        });
      }
      async getNextRefundNoteNumber() {
        const [prefixSetting] = await db.select().from(globalSettings).where(eq3(globalSettings.key, "refund_note_prefix"));
        let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "RF";
        const prefix = rawPrefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "RF";
        const result = await db.execute(sql3`
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
        const [item] = await db.select().from(paymentWebhookQueue).where(eq3(paymentWebhookQueue.id, id));
        return item;
      }
      async getPendingWebhooks() {
        return db.select().from(paymentWebhookQueue).where(eq3(paymentWebhookQueue.status, "pending")).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      async getWebhookByEventId(gateway, eventId) {
        const [item] = await db.select().from(paymentWebhookQueue).where(and2(
          eq3(paymentWebhookQueue.gateway, gateway),
          eq3(paymentWebhookQueue.eventId, eventId)
        ));
        return item;
      }
      async createWebhookQueueItem(item) {
        const [created] = await db.insert(paymentWebhookQueue).values(item).returning();
        return created;
      }
      async updateWebhookQueueItem(id, item) {
        await db.update(paymentWebhookQueue).set(item).where(eq3(paymentWebhookQueue.id, id));
      }
      async getExpiredWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          eq3(paymentWebhookQueue.status, "pending"),
          lte2(paymentWebhookQueue.expiresAt, now)
        ));
      }
      async getRetryableWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          or2(
            eq3(paymentWebhookQueue.status, "pending"),
            eq3(paymentWebhookQueue.status, "failed")
          ),
          sql3`${paymentWebhookQueue.attemptCount} < ${paymentWebhookQueue.maxAttempts}`,
          or2(
            isNull2(paymentWebhookQueue.nextRetryAt),
            lte2(paymentWebhookQueue.nextRetryAt, now)
          ),
          gte2(paymentWebhookQueue.expiresAt, now)
        )).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      // Email Notification Settings
      async getEmailNotificationSetting(eventType) {
        const [setting] = await db.select().from(emailNotificationSettings).where(eq3(emailNotificationSettings.eventType, eventType));
        return setting;
      }
      async getAllEmailNotificationSettings() {
        return db.select().from(emailNotificationSettings).orderBy(asc(emailNotificationSettings.category), asc(emailNotificationSettings.eventType));
      }
      async getEmailNotificationSettingsByCategory(category) {
        return db.select().from(emailNotificationSettings).where(eq3(emailNotificationSettings.category, category)).orderBy(asc(emailNotificationSettings.eventType));
      }
      async createEmailNotificationSetting(setting) {
        const [created] = await db.insert(emailNotificationSettings).values(setting).returning();
        return created;
      }
      async updateEmailNotificationSetting(eventType, setting) {
        await db.update(emailNotificationSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(emailNotificationSettings.eventType, eventType));
      }
      // Admin Call Monitoring
      async getAdminCalls(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq3(calls.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq3(calls.status, options.status));
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
              sql3`${calls.phoneNumber} ILIKE ${searchPattern} ESCAPE '\\'`,
              sql3`${calls.transcript} ILIKE ${searchPattern} ESCAPE '\\'`
            )
          );
        }
        const whereClause = conditions.length > 0 ? and2(...conditions) : void 0;
        const violationCountSubquery = db.select({
          callId: contentViolations.callId,
          count: sql3`count(*)`.as("violation_count"),
          summary: sql3`string_agg(${contentViolations.detectedWord}, ', ' ORDER BY ${contentViolations.createdAt} DESC)`.as("violation_summary")
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
          violationCount: sql3`COALESCE(${violationCountSubquery.count}, 0)`,
          violationSummary: sql3`${violationCountSubquery.summary}`
        }).from(calls).leftJoin(users, eq3(calls.userId, users.id)).leftJoin(campaigns, eq3(calls.campaignId, campaigns.id)).leftJoin(violationCountSubquery, eq3(calls.id, violationCountSubquery.callId));
        if (whereClause) {
          query = query.where(whereClause);
        }
        if (options.hasViolations === true) {
          query = query.where(sql3`COALESCE(${violationCountSubquery.count}, 0) > 0`);
        } else if (options.hasViolations === false) {
          query = query.where(sql3`COALESCE(${violationCountSubquery.count}, 0) = 0`);
        }
        const results = await query.orderBy(desc2(calls.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql3`count(*)` }).from(calls).where(whereClause);
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
        }).from(calls).leftJoin(users, eq3(calls.userId, users.id)).leftJoin(campaigns, eq3(calls.campaignId, campaigns.id)).leftJoin(contacts, eq3(calls.contactId, contacts.id)).where(eq3(calls.id, id));
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
        return db.select().from(contentViolations).where(eq3(contentViolations.callId, callId)).orderBy(desc2(contentViolations.createdAt));
      }
      async getContentViolations(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq3(contentViolations.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq3(contentViolations.status, options.status));
        }
        if (options.severity) {
          conditions.push(eq3(contentViolations.severity, options.severity));
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
        }).from(contentViolations).leftJoin(users, eq3(contentViolations.userId, users.id)).leftJoin(calls, eq3(contentViolations.callId, calls.id));
        if (whereClause) {
          query = query.where(whereClause);
        }
        const results = await query.orderBy(desc2(contentViolations.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql3`count(*)` }).from(contentViolations).where(whereClause);
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
        const [updated] = await db.update(contentViolations).set(data).where(eq3(contentViolations.id, id)).returning();
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
        return db.select().from(bannedWords).where(eq3(bannedWords.isActive, true)).orderBy(asc(bannedWords.word));
      }
      async createBannedWord(data) {
        const [word] = await db.insert(bannedWords).values(data).returning();
        return word;
      }
      async updateBannedWord(id, data) {
        const [updated] = await db.update(bannedWords).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq3(bannedWords.id, id)).returning();
        return updated;
      }
      async deleteBannedWord(id) {
        const result = await db.delete(bannedWords).where(eq3(bannedWords.id, id)).returning();
        return result.length > 0;
      }
      async getCallsWithTranscripts() {
        return db.select().from(calls).where(and2(
          isNotNull2(calls.transcript),
          sql3`${calls.transcript} != ''`
        ));
      }
      // Demo Sessions - Browser-based demo calls
      async createDemoSession(data) {
        const [session] = await db.insert(demoSessions).values(data).returning();
        return session;
      }
      async getDemoSession(id) {
        const [session] = await db.select().from(demoSessions).where(eq3(demoSessions.id, id));
        return session;
      }
      async getDemoSessionByToken(token) {
        const [session] = await db.select().from(demoSessions).where(eq3(demoSessions.sessionToken, token));
        return session;
      }
      async updateDemoSession(id, data) {
        await db.update(demoSessions).set(data).where(eq3(demoSessions.id, id));
      }
      async getActiveDemoSessionCount() {
        const result = await db.select({ count: sql3`count(*)` }).from(demoSessions).where(eq3(demoSessions.status, "active"));
        return Number(result[0]?.count || 0);
      }
      async getRecentDemoSessionByIp(ip, cooldownMinutes) {
        const cooldownTime = new Date(Date.now() - cooldownMinutes * 60 * 1e3);
        const [session] = await db.select().from(demoSessions).where(and2(
          eq3(demoSessions.visitorIp, ip),
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

// server/integrations/app-keys.ts
async function getSettingString(key) {
  try {
    const setting = await storage.getGlobalSetting(key);
    const value = setting?.value;
    if (value == null) return null;
    const text3 = String(value).trim();
    return text3 || null;
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
function truncate(text3, max = 300) {
  const single = text3.replace(/\s+/g, " ").trim();
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
  const text3 = await resp.text();
  let data = null;
  if (text3) {
    try {
      data = JSON.parse(text3);
    } catch {
      data = null;
    }
  }
  return { ok: resp.ok, status: resp.status, data, text: text3 };
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
import { and as and14, desc as desc13, eq as eq17, gt, inArray as inArray6 } from "drizzle-orm";
async function listIntegrationRows(userId) {
  return db.select().from(userIntegrations).where(eq17(userIntegrations.userId, userId));
}
async function updateIntegrationRow(id, values) {
  const [row] = await db.update(userIntegrations).set({ ...values, updatedAt: /* @__PURE__ */ new Date() }).where(eq17(userIntegrations.id, id)).returning();
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
  const [row] = await db.select({ externalId: integrationSyncLogs.externalId }).from(integrationSyncLogs).where(and14(
    ...userId ? [eq17(integrationSyncLogs.userId, userId)] : [],
    eq17(integrationSyncLogs.provider, provider),
    eq17(integrationSyncLogs.sourceId, sourceId),
    eq17(integrationSyncLogs.action, action),
    eq17(integrationSyncLogs.status, "success")
  )).orderBy(desc13(integrationSyncLogs.createdAt)).limit(1);
  return row?.externalId ?? null;
}
async function wasRecentlySynced(userId, provider, event, sourceId, windowMs) {
  const [row] = await db.select({ id: integrationSyncLogs.id }).from(integrationSyncLogs).where(and14(
    eq17(integrationSyncLogs.userId, userId),
    eq17(integrationSyncLogs.provider, provider),
    eq17(integrationSyncLogs.event, event),
    eq17(integrationSyncLogs.sourceId, sourceId),
    inArray6(integrationSyncLogs.status, ["success", "skipped"]),
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
function str2(value) {
  if (value == null) return null;
  const text3 = String(value).trim();
  return text3 ? text3 : null;
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
function isValidTimeZone3(tz) {
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
  const tz = isValidTimeZone3(timeZone) ? timeZone : DEFAULT_TIMEZONE;
  const wall = Date.UTC(y, m - 1, d, hh, mm, ss);
  let utc = wall - tzOffsetMs(new Date(wall), tz);
  const secondPass = tzOffsetMs(new Date(utc), tz);
  if (wall - secondPass !== utc) utc = wall - secondPass;
  return new Date(utc);
}
function formatIsoWithOffset(date2, timeZone) {
  const tz = isValidTimeZone3(timeZone) ? timeZone : "UTC";
  const offsetMin = Math.round(tzOffsetMs(date2, tz) / 6e4);
  const local = new Date(date2.getTime() + offsetMin * 6e4).toISOString().slice(0, 19);
  const sign = offsetMin < 0 ? "-" : "+";
  const abs = Math.abs(offsetMin);
  const pad = (n) => String(n).padStart(2, "0");
  return `${local}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}
function leadFromRowLike(lead) {
  return {
    id: str2(lead.id),
    firstName: str2(lead.firstName),
    lastName: str2(lead.lastName),
    phone: str2(lead.phone),
    email: str2(lead.email),
    company: str2(lead.company),
    summary: str2(lead.aiSummary),
    nextAction: str2(lead.aiNextAction),
    sentiment: str2(lead.sentiment),
    category: str2(lead.aiCategory),
    score: typeof lead.leadScore === "number" ? lead.leadScore : null,
    origin: "call"
  };
}
function findResponse(responses, pattern) {
  for (const [key, value] of Object.entries(responses)) {
    if (pattern.test(key) && str2(value)) return str2(value);
  }
  return null;
}
function leadFromSubmission(submission) {
  const responses = asObject(submission.responses) ?? {};
  const name = str2(submission.contactName) ?? findResponse(responses, /name/i);
  const phone = str2(submission.contactPhone) ?? findResponse(responses, /phone|mobile/i);
  const email = str2(submission.contactEmail) ?? findResponse(responses, /e-?mail/i);
  if (!phone && !email) return null;
  const lines = Object.entries(responses).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`);
  const formName = str2(submission.formName) ?? "form";
  return {
    ...splitName(name),
    id: str2(submission.id),
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
  if (lead && (str2(lead.phone) || str2(lead.email))) return leadFromRowLike(lead);
  const submission = asObject(data.submission);
  if (submission) return leadFromSubmission(submission);
  const contact = asObject(data.contact);
  if (contact && (str2(contact.phone) || str2(contact.email))) {
    return { ...splitName(str2(contact.name)), id: str2(contact.id), phone: str2(contact.phone), email: str2(contact.email), company: str2(contact.company), summary: null, nextAction: null, sentiment: null, category: null, score: null, origin: "form" };
  }
  return null;
}
function callFromEvent(data) {
  const call = asObject(data.call);
  if (!call) return null;
  return {
    id: str2(call.id),
    direction: str2(call.direction) ?? str2(call.callDirection),
    duration: typeof call.duration === "number" ? call.duration : null,
    summary: str2(call.summary) ?? str2(call.aiSummary),
    transcript: str2(call.transcript)
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
  const date2 = str2(appt.scheduledDate) ?? str2(appt.date) ?? str2(data.newDate);
  const rawTime = str2(appt.scheduledTime) ?? str2(appt.time) ?? str2(data.newTime);
  if (!date2 || !rawTime) return null;
  const time2 = rawTime.slice(0, 8);
  const timeZone = isValidTimeZone3(str2(appt.timezone)) ? str2(appt.timezone) : fallbackTimeZone;
  const duration = Number(appt.duration);
  const durationMinutes = Number.isFinite(duration) && duration > 0 ? duration : 30;
  const startUtc = zonedDateTimeToUtc(date2, time2, timeZone);
  return {
    id: str2(appt.id) ?? str2(appt.appointmentId),
    title: str2(appt.type) ?? str2(appt.serviceName) ?? "Appointment",
    date: date2,
    time: time2,
    timeZone,
    durationMinutes,
    notes: str2(appt.notes),
    status: str2(appt.status),
    contact: {
      name: str2(contact.name) ?? str2(appt.contactName),
      phone: str2(contact.phone) ?? str2(appt.contactPhone),
      email: str2(contact.email) ?? str2(appt.contactEmail)
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
  if (event === "lead.upserted") return str2(lead?.id);
  if (event.startsWith("appointment.")) return str2(appt?.id) ?? str2(appt?.appointmentId);
  if (event.startsWith("form.")) return str2(submission?.id) ?? str2(lead?.id);
  if (event.startsWith("campaign.")) return str2(campaign?.id) ?? str2(data.campaignId);
  if (event.startsWith("flow.")) return str2(flow?.id) ?? str2(call?.id);
  return str2(call?.id) ?? str2(data.callId);
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
function api(row, path3, init = {}) {
  return authorizedRequest(row, zohoProvider, (r) => ({
    url: `${r.instanceUrl || "https://www.zohoapis.in"}/crm/v2${path3}`,
    init: { ...init, headers: jsonHeaders({ Authorization: `Zoho-oauthtoken ${r.accessToken}` }) }
  }));
}
async function writeRecord(row, method, path3, record, droppable) {
  const res = await api(row, path3, { method, body: JSON.stringify({ data: [record] }) });
  const result = res.data?.data?.[0];
  if (res.ok && result?.code === "SUCCESS") return result.details?.id ?? "";
  const badField = result?.details?.api_name;
  if (result?.code === "INVALID_DATA" && badField && droppable.includes(badField) && badField in record) {
    const { [badField]: _dropped, ...rest } = record;
    return writeRecord(row, method, path3, rest, droppable.filter((f) => f !== badField));
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
function api2(row, path3, init = {}) {
  return authorizedRequest(row, salesforceProvider, (r) => ({
    url: `${instanceUrlOf(r)}/services/data/${API_VERSION2}${path3}`,
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
var API_VERSION2, SCOPES2, LEAD_EVENTS2, LEAD_SOURCE2, TEXT_LIMIT2, salesforceProvider;
var init_salesforce = __esm({
  "server/integrations/providers/salesforce.ts"() {
    "use strict";
    init_app_keys();
    init_http();
    init_token_store();
    init_normalize();
    init_types2();
    API_VERSION2 = "v60.0";
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
function api3(row, path3, init = {}, version = VERSION) {
  return authorizedRequest(row, gohighlevelProvider, (r) => ({
    url: `${BASE}${path3}`,
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
async function addNote(row, contactId, text3) {
  const res = await api3(row, `/contacts/${encodeURIComponent(contactId)}/notes`, { method: "POST", body: JSON.stringify({ body: text3.slice(0, 2e4) }) });
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
  const calendarId = str2(asObject(row.config)?.calendarId);
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
        const calendarId = str2(input.calendarId);
        return { config: { ...asObject(existing?.config) ?? {}, calendarId } };
      },
      publicConfig(row) {
        return { calendarId: str2(asObject(row?.config)?.calendarId), locationId: row?.externalAccountId ?? null };
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
  const timeZone = str2(config.timeZone);
  return {
    eventTypeId: Number.isInteger(eventTypeId) && eventTypeId > 0 ? eventTypeId : null,
    timeZone: isValidTimeZone3(timeZone) ? timeZone : DEFAULT_TIMEZONE
  };
}
function calMessage(res) {
  const data = res.data && typeof res.data === "object" ? res.data : null;
  return data?.error?.message ?? data?.message ?? truncate(res.text);
}
async function api4(row, path3, init = {}, version) {
  if (!row.accessToken) throw new ProviderAuthError("Cal.com API key is not set");
  const res = await requestJson(`${BASE2}${path3}`, {
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
  await cancelBooking(row, uid, str2(data.cancelReason) ?? "Cancelled in Zonvo");
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
        const eventTypes = list.map((item) => asObject(item)).filter((item) => !!item).map((item) => ({ id: Number(item.id), title: str2(item.title) ?? "", lengthInMinutes: Number(item.lengthInMinutes ?? item.length) || null }));
        return { eventTypes };
      },
      async applyConfig(input, existing) {
        const apiKey = str2(input.apiKey);
        if (apiKey && !apiKey.startsWith("cal_")) return { config: {}, error: "Cal.com API keys start with cal_" };
        if (!apiKey && !existing?.accessToken) return { config: {}, error: "Cal.com API key is required" };
        const rawEventType = input.eventTypeId;
        const eventTypeId = rawEventType == null || rawEventType === "" ? null : Number(rawEventType);
        if (eventTypeId !== null && (!Number.isInteger(eventTypeId) || eventTypeId <= 0)) return { config: {}, error: "eventTypeId must be a positive integer" };
        const timeZone = str2(input.timeZone) ?? DEFAULT_TIMEZONE;
        if (!isValidTimeZone3(timeZone)) return { config: {}, error: `Unknown time zone: ${timeZone}` };
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

// server/services/webhook-test-service.ts
import crypto3 from "crypto";
function generateComprehensiveTestPayload(eventType = "webhook.test") {
  const timestamp3 = (/* @__PURE__ */ new Date()).toISOString();
  const baseData = {
    test: true,
    environment: "test",
    webhookVersion: "1.0"
  };
  switch (eventType) {
    case "call.started":
      return {
        event: "call.started",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "in-progress",
            startedAt: timestamp3,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876",
            email: "john.doe@example.com"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Agent",
            type: "natural"
          }
        }
      };
    case "call.completed":
      return {
        event: "call.completed",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "completed",
            startedAt: new Date(Date.now() - 12e4).toISOString(),
            endedAt: timestamp3,
            duration: 120,
            durationMinutes: 2,
            fromNumber: "+15555551234",
            toNumber: "+15555559876",
            recordingUrl: "https://api.twilio.com/recordings/test-recording.mp3"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Jane Smith",
            phone: "+15555559876",
            email: "jane.smith@example.com",
            company: "Acme Corp"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Sales Outreach Q1"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "failed",
            startedAt: new Date(Date.now() - 3e4).toISOString(),
            endedAt: timestamp3,
            duration: 30,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Robert Johnson",
            phone: "+15555559876",
            email: "robert.johnson@example.com"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "transferred",
            startedAt: new Date(Date.now() - 18e4).toISOString(),
            transferredAt: timestamp3,
            duration: 180,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Product Launch Outreach",
            description: "Outreach campaign for new product launch",
            status: "running",
            startedAt: timestamp3,
            totalContacts: 500,
            completedCalls: 0,
            remainingCalls: 500,
            estimatedDuration: "4 hours"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Q1 Sales Outreach",
            description: "Quarterly sales outreach campaign",
            status: "completed",
            startedAt: new Date(Date.now() - 144e5).toISOString(),
            completedAt: timestamp3,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Holiday Promotion",
            description: "Holiday season promotional campaign",
            status: "paused",
            startedAt: new Date(Date.now() - 72e5).toISOString(),
            pausedAt: timestamp3,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Holiday Promotion",
            description: "Holiday season promotional campaign",
            status: "running",
            startedAt: new Date(Date.now() - 72e5).toISOString(),
            pausedAt: new Date(Date.now() - 36e5).toISOString(),
            resumedAt: timestamp3,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Failed Campaign",
            description: "Campaign that encountered an error",
            status: "failed",
            startedAt: new Date(Date.now() - 18e5).toISOString(),
            failedAt: timestamp3,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Cancelled Campaign",
            description: "Campaign manually cancelled by user",
            status: "cancelled",
            startedAt: new Date(Date.now() - 36e5).toISOString(),
            cancelledAt: timestamp3,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "ringing",
            startedAt: timestamp3,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.answered":
      return {
        event: "call.answered",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "in-progress",
            startedAt: new Date(Date.now() - 1e4).toISOString(),
            answeredAt: timestamp3,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.no_answer":
      return {
        event: "call.no_answer",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "no-answer",
            startedAt: new Date(Date.now() - 3e4).toISOString(),
            endedAt: timestamp3,
            duration: 30,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.busy":
      return {
        event: "call.busy",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "busy",
            startedAt: new Date(Date.now() - 5e3).toISOString(),
            endedAt: timestamp3,
            duration: 5,
            fromNumber: "+15555551234",
            toNumber: "+15555559876"
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "call.voicemail":
      return {
        event: "call.voicemail",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "outbound",
            status: "voicemail",
            startedAt: new Date(Date.now() - 45e3).toISOString(),
            endedAt: timestamp3,
            duration: 45,
            fromNumber: "+15555551234",
            toNumber: "+15555559876",
            voicemailDetected: true
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "John Doe",
            phone: "+15555559876"
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign"
          }
        }
      };
    case "inbound_call.received":
      return {
        event: "inbound_call.received",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "ringing",
            receivedAt: timestamp3,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          },
          phoneNumber: {
            id: `phone_test_${crypto3.randomUUID().substring(0, 8)}`,
            number: "+15555551234",
            country: "US"
          }
        }
      };
    case "inbound_call.answered":
      return {
        event: "inbound_call.answered",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "in-progress",
            receivedAt: new Date(Date.now() - 5e3).toISOString(),
            answeredAt: timestamp3,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          }
        }
      };
    case "inbound_call.completed":
      return {
        event: "inbound_call.completed",
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "completed",
            receivedAt: new Date(Date.now() - 3e5).toISOString(),
            answeredAt: new Date(Date.now() - 295e3).toISOString(),
            endedAt: timestamp3,
            duration: 300,
            durationMinutes: 5,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
            direction: "inbound",
            status: "missed",
            receivedAt: new Date(Date.now() - 3e4).toISOString(),
            missedAt: timestamp3,
            fromNumber: "+15555559876",
            toNumber: "+15555551234"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Inbound Support Agent",
            type: "incoming"
          },
          reason: "No answer - call timed out"
        }
      };
    case "flow.started":
      return {
        event: "flow.started",
        timestamp: timestamp3,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          flow: {
            id: `flow_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Customer Support Flow",
            version: 1
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
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
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Michael Brown",
            phone: "+15555559876",
            email: "michael.brown@example.com",
            company: "Brown Industries",
            title: "Director of Operations"
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            duration: 145
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Demo Scheduling Campaign"
          },
          bookedBy: {
            agentId: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
            agentName: "Appointment Setter AI"
          }
        }
      };
    case "appointment.confirmed":
      return {
        event: "appointment.confirmed",
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "confirmed",
            scheduledDate: new Date(Date.now() + 864e5 * 2).toISOString().split("T")[0],
            scheduledTime: "10:00",
            timezone: "America/New_York",
            duration: 30,
            confirmedAt: timestamp3
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
            type: "Consultation",
            status: "cancelled",
            scheduledDate: new Date(Date.now() + 864e5).toISOString().split("T")[0],
            scheduledTime: "15:00",
            timezone: "America/New_York",
            cancelledAt: timestamp3
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "rescheduled",
            originalDate: new Date(Date.now() + 864e5).toISOString().split("T")[0],
            originalTime: "10:00",
            newDate: new Date(Date.now() + 864e5 * 3).toISOString().split("T")[0],
            newTime: "14:00",
            timezone: "America/New_York",
            rescheduledAt: timestamp3
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
            type: "Product Demo",
            status: "completed",
            scheduledDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            scheduledTime: "10:00",
            timezone: "America/New_York",
            duration: 30,
            completedAt: timestamp3
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          appointment: {
            id: `apt_test_${crypto3.randomUUID().substring(0, 8)}`,
            type: "Consultation",
            status: "no_show",
            scheduledDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            scheduledTime: "14:00",
            timezone: "America/New_York",
            markedNoShowAt: timestamp3
          },
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          form: {
            id: `form_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Lead Qualification Form",
            submittedAt: timestamp3
          },
          submission: {
            id: `submission_test_${crypto3.randomUUID().substring(0, 8)}`,
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
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Sarah Williams",
            phone: "+15555559876",
            email: "sarah.williams@example.com"
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            duration: 210
          },
          campaign: {
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          lead: {
            id: `lead_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "David Johnson",
            email: "david.johnson@example.com",
            phone: "+15555559876",
            company: "Johnson Enterprises",
            source: "AI Voice Agent",
            status: "new",
            createdAt: timestamp3
          },
          form: {
            id: `form_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Lead Capture Form"
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
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
        timestamp: timestamp3,
        data: {
          ...baseData,
          message: "This is a comprehensive test webhook from your platform",
          sampleEvents: WEBHOOK_EVENT_TYPES.filter((e) => e !== "webhook.test"),
          documentation: "Each event type contains detailed structured data. Subscribe to specific events to receive real-time notifications.",
          contact: {
            id: `contact_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test User",
            phone: "+15555551234",
            email: "test@example.com",
            company: "Test Company Inc."
          },
          call: {
            id: `call_test_${crypto3.randomUUID().substring(0, 8)}`,
            conversationId: `conv_test_${crypto3.randomUUID().substring(0, 8)}`,
            callSid: `CA${crypto3.randomBytes(16).toString("hex")}`,
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
            id: `campaign_test_${crypto3.randomUUID().substring(0, 8)}`,
            name: "Test Campaign",
            status: "running"
          },
          agent: {
            id: `agent_test_${crypto3.randomUUID().substring(0, 8)}`,
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
      // CRM
      "lead.upserted",
      // System
      "webhook.test"
    ];
    WebhookTestService = class {
      generateSignature(payload, secret, timestamp3) {
        const signaturePayload = timestamp3 + payload;
        return crypto3.createHmac("sha256", secret).update(signaturePayload).digest("hex");
      }
      buildHeaders(webhook, payload, timestamp3) {
        const signature = this.generateSignature(payload, webhook.secret, timestamp3);
        const headers = {
          "Content-Type": "application/json",
          "User-Agent": "Platform-Webhook/1.0",
          "X-Webhook-Signature": signature,
          "X-Webhook-Timestamp": timestamp3,
          "X-Webhook-Event": "webhook.test",
          "X-Webhook-Delivery": crypto3.randomUUID()
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
        const timestamp3 = testPayload.timestamp;
        const payloadString = JSON.stringify(testPayload);
        const headers = this.buildHeaders(webhook, payloadString, timestamp3);
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
  return raw.map((item) => asObject(item)).filter((item) => !!item && !!str2(item.url)).map((item) => ({
    url: str2(item.url),
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
    const url = str2(entry?.url);
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
import { eq as eq18 } from "drizzle-orm";
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
  const apptId = str2(details?.appointmentId);
  let row;
  if (apptId) [row] = await db.select().from(appointments).where(eq18(appointments.id, apptId)).limit(1);
  if (!row && callId) [row] = await db.select().from(appointments).where(eq18(appointments.callId, callId)).limit(1);
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
  const date2 = str2(details?.date);
  const time2 = str2(details?.time);
  if (!date2 || !time2) return null;
  return {
    appointment: { id: `lead-${lead.id}`, type: str2(details?.serviceName), status: "scheduled", scheduledDate: date2, scheduledTime: time2, duration: Number(details?.duration) || 30, notes: null },
    contact: { name: str2(details?.contactName) ?? ([lead.firstName, lead.lastName].filter(Boolean).join(" ") || null), phone: str2(details?.contactPhone) ?? lead.phone, email: lead.email, company: lead.company },
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
      /**
       * Called after a lead row was created/updated (CRM lead processor, agent save_lead tool, REST API).
       * Delivers `lead.upserted` to the user's webhook subscriptions and — through the delivery service —
       * to every connected integration. Never throws.
       */
      async onLeadUpserted(userId, lead, context) {
        try {
          const call = context.callData;
          const { webhookDeliveryService: webhookDeliveryService2 } = await Promise.resolve().then(() => (init_webhook_delivery(), webhook_delivery_exports));
          void webhookDeliveryService2.triggerEvent(userId, "lead.upserted", {
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
          const rows = await connectedRows(userId);
          if (!rows.length) return;
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

// server/services/webhook-delivery.ts
var webhook_delivery_exports = {};
__export(webhook_delivery_exports, {
  WebhookDeliveryService: () => WebhookDeliveryService,
  webhookDeliveryService: () => webhookDeliveryService
});
import crypto4 from "crypto";
import { eq as eq19, and as and15 } from "drizzle-orm";
var RETRY_DELAYS, WebhookDeliveryService, webhookDeliveryService;
var init_webhook_delivery = __esm({
  "server/services/webhook-delivery.ts"() {
    "use strict";
    init_storage();
    init_db();
    init_schema();
    init_url_validator();
    init_hub();
    RETRY_DELAYS = [0, 6e4, 3e5];
    WebhookDeliveryService = class {
      generateSignature(payload, secret) {
        return crypto4.createHmac("sha256", secret).update(payload).digest("hex");
      }
      buildHeaders(webhook, payloadString, event) {
        const signature = this.generateSignature(payloadString, webhook.secret);
        const headers = {
          "Content-Type": "application/json",
          "User-Agent": "Platform-Webhook/1.0",
          "X-Webhook-Event": event,
          "X-Webhook-Delivery": crypto4.randomUUID(),
          "X-Webhook-Signature": `sha256=${signature}`,
          // Same HMAC-SHA256 hex of the raw body, under the names the REST API docs use (legacy names kept for old receivers)
          "X-Zonvo-Signature": signature,
          "X-Zonvo-Event": event,
          "X-AgentLabs-Signature": signature,
          "X-AgentLabs-Event": event
        };
        if (webhook.authType === "basic" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.username && creds.password) {
            const basicAuth = Buffer.from(`${creds.username}:${creds.password}`).toString("base64");
            headers["Authorization"] = `Basic ${basicAuth}`;
          }
        } else if (webhook.authType === "bearer" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.token) {
            headers["Authorization"] = `Bearer ${creds.token}`;
          }
        }
        if (webhook.headers) {
          const customHeaders = webhook.headers;
          Object.assign(headers, customHeaders);
        }
        return headers;
      }
      async deliverWebhook(webhook, payload, attemptNumber = 1) {
        const payloadString = JSON.stringify(payload);
        const headers = this.buildHeaders(webhook, payloadString, payload.event);
        const startTime = Date.now();
        console.log(`\u{1F4E4} [Webhook] Delivering to ${webhook.url} (attempt ${attemptNumber})`);
        console.log(`   Event: ${payload.event}`);
        try {
          const urlCheck = await validateWebhookUrl(webhook.url);
          if (!urlCheck.valid) {
            console.warn(`\u{1F6AB} [Webhook] SSRF blocked: ${urlCheck.error} for URL ${webhook.url}`);
            return {
              success: false,
              httpStatus: 0,
              responseBody: `Blocked: ${urlCheck.error}`,
              responseTime: 0,
              error: urlCheck.error
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
            if (responseBody.length > 1e4) {
              responseBody = responseBody.substring(0, 1e4) + "...[truncated]";
            }
          } catch {
            responseBody = "Unable to read response body";
          }
          const success = response.ok;
          console.log(`${success ? "\u2705" : "\u274C"} [Webhook] Status: ${response.status}, Time: ${responseTime}ms`);
          return {
            success,
            httpStatus: response.status,
            responseBody,
            responseTime
          };
        } catch (error) {
          const responseTime = Date.now() - startTime;
          const errorMessage2 = error.name === "TimeoutError" ? "Request timed out after 30 seconds" : error.message || "Unknown error";
          console.error(`\u274C [Webhook] Delivery failed: ${errorMessage2}`);
          return {
            success: false,
            responseTime,
            error: errorMessage2
          };
        }
      }
      async deliverWithRetry(webhook, payload, maxAttempts = 3) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          const result = await this.deliverWebhook(webhook, payload, attempt);
          const logData = {
            webhookId: webhook.id,
            event: payload.event,
            payload,
            success: result.success,
            httpStatus: result.httpStatus || null,
            responseBody: result.responseBody || null,
            responseTime: result.responseTime || null,
            error: result.error || null,
            attemptNumber: attempt,
            maxAttempts,
            nextRetryAt: null
          };
          if (!result.success && attempt < maxAttempts) {
            const delay = RETRY_DELAYS[attempt] || 3e5;
            logData.nextRetryAt = new Date(Date.now() + delay);
            console.log(`\u23F3 [Webhook] Scheduling retry in ${delay / 1e3}s`);
          }
          try {
            const webhookExists = await storage.getWebhook(webhook.id);
            if (webhookExists) {
              await storage.createWebhookLog(logData);
            } else {
              console.log(`\u2139\uFE0F [Webhook] Skipping log - webhook ${webhook.id} was deleted`);
            }
          } catch (err) {
            if (err.code === "23503" || err.message?.includes("foreign key constraint")) {
              console.log(`\u2139\uFE0F [Webhook] Skipping log - webhook ${webhook.id} no longer exists`);
            } else {
              console.error(`\u274C [Webhook] Failed to log delivery:`, err);
            }
          }
          if (result.success) {
            console.log(`\u2705 [Webhook] Delivery successful on attempt ${attempt}`);
            return;
          }
          if (attempt < maxAttempts) {
            const delay = RETRY_DELAYS[attempt] || 6e4;
            console.log(`\u23F3 [Webhook] Waiting ${delay / 1e3}s before retry...`);
            await new Promise((resolve2) => setTimeout(resolve2, delay));
          }
        }
        console.error(`\u274C [Webhook] All ${maxAttempts} attempts failed for ${webhook.url}`);
      }
      async triggerEvent(userId, event, data, campaignId) {
        console.log(`\u{1F514} [Webhook] Triggering event: ${event}`);
        console.log(`   UserId: ${userId}, CampaignId: ${campaignId || "N/A"}`);
        integrationHub.dispatch(userId, event, data);
        try {
          const webhooks2 = await storage.getWebhooksForEvent(userId, event, campaignId || void 0);
          if (webhooks2.length === 0) {
            console.log(`\u2139\uFE0F [Webhook] No webhooks configured for event: ${event}`);
            return;
          }
          console.log(`\u{1F4E4} [Webhook] Found ${webhooks2.length} webhook(s) to deliver`);
          const payload = {
            event,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            data
          };
          const deliveryPromises = webhooks2.map(
            (webhook) => this.deliverWithRetry(webhook, payload).catch((err) => {
              console.error(`\u274C [Webhook] Error delivering to ${webhook.url}:`, err);
            })
          );
          await Promise.allSettled(deliveryPromises);
          console.log(`\u2705 [Webhook] Event ${event} processing complete`);
        } catch (error) {
          console.error(`\u274C [Webhook] Error triggering event ${event}:`, error);
        }
      }
      async testWebhook(webhookId, userId) {
        const [webhook] = await db.select().from(webhooks).where(and15(eq19(webhooks.id, webhookId), eq19(webhooks.userId, userId)));
        if (!webhook) {
          throw new Error("Webhook not found");
        }
        const testPayload = {
          event: "webhook.test",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          data: {
            test: true,
            message: "This is a test webhook from your platform"
          }
        };
        console.log(`\u{1F9EA} Testing webhook ${webhookId}...`);
        const result = await this.deliverWebhook(webhook, testPayload, 1);
        return {
          success: result.success,
          statusCode: result.httpStatus || 0,
          responseTime: result.responseTime || 0,
          responseBody: result.responseBody || "",
          error: result.error
        };
      }
      async retryWebhook(logId, userId) {
        const [log] = await db.select().from(webhookLogs).where(eq19(webhookLogs.id, logId));
        if (!log) {
          throw new Error("Webhook log not found");
        }
        const [webhook] = await db.select().from(webhooks).where(and15(eq19(webhooks.id, log.webhookId), eq19(webhooks.userId, userId)));
        if (!webhook) {
          throw new Error("Webhook not found or access denied");
        }
        console.log(`\u{1F504} Manually retrying webhook ${webhook.id} (log ${logId})...`);
        const payload = {
          event: log.event,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          data: log.payload?.data || log.payload
        };
        const result = await this.deliverWebhook(webhook, payload, 1);
        const logData = {
          webhookId: webhook.id,
          event: log.event,
          payload: log.payload,
          success: result.success,
          httpStatus: result.httpStatus || null,
          responseBody: result.responseBody || null,
          responseTime: result.responseTime || null,
          error: result.error || null,
          attemptNumber: 1,
          maxAttempts: 1,
          nextRetryAt: null
        };
        try {
          const newLog = await storage.createWebhookLog(logData);
          return {
            success: result.success,
            newLogId: newLog?.id,
            error: result.error
          };
        } catch (err) {
          console.error(`\u274C [Webhook] Failed to log retry:`, err);
          return {
            success: result.success,
            error: result.error
          };
        }
      }
    };
    webhookDeliveryService = new WebhookDeliveryService();
  }
});

// plugins/rest-api/index.ts
import { Router as Router15 } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path2 from "path";

// server/utils/request-origin.ts
init_webhook_helper();
var HOST_RE = /^[a-z0-9]([a-z0-9.-]{0,252})(:\d{1,5})?$/i;
function first(value) {
  const v = Array.isArray(value) ? value[0] : value;
  return (v || "").split(",")[0].trim();
}
function resolveRequestOrigin(req) {
  const host = first(req.headers["x-forwarded-host"]) || first(req.headers.host);
  if (!host || !HOST_RE.test(host)) return FRONTEND_URL;
  const forwardedProto = first(req.headers["x-forwarded-proto"]).toLowerCase();
  const hostname = host.split(":")[0].toLowerCase();
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const proto = forwardedProto === "http" || forwardedProto === "https" ? forwardedProto : req.secure || !isLocal ? "https" : "http";
  return `${proto}://${host}`;
}
function replaceDocsPlaceholder(text3, origin) {
  return text3.replace(/https:\/\/your-domain\.com/g, origin);
}

// plugins/rest-api/routes/calls.routes.js
import { Router } from "express";

// server/db.js
init_schema();
import "dotenv/config";
import { drizzle as drizzle3 } from "drizzle-orm/node-postgres";
import { Pool as Pool3 } from "pg";
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool2 = new Pool3({
  connectionString: process.env.DATABASE_URL
});
var db2 = drizzle3(pool2, { schema: schema_exports });

// plugins/rest-api/services/api-key.service.js
init_schema();
import { eq as eq4, and as and3, gte as gte3, sql as sql4 } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";

// plugins/rest-api/types.js
var API_VERSION = "v1";
var API_PREFIX = `/api/${API_VERSION}`;
var API_KEY_PREFIX = "agl_sk_";
var API_ERROR_CODES = {
  // Authentication
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_API_KEY: "INVALID_API_KEY",
  EXPIRED_API_KEY: "EXPIRED_API_KEY",
  INSUFFICIENT_SCOPES: "INSUFFICIENT_SCOPES",
  IP_NOT_WHITELISTED: "IP_NOT_WHITELISTED",
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_REQUEST_BODY: "INVALID_REQUEST_BODY",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  // Resources
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",
  // Business Logic
  INSUFFICIENT_CREDITS: "INSUFFICIENT_CREDITS",
  AGENT_NOT_ACTIVE: "AGENT_NOT_ACTIVE",
  CAMPAIGN_NOT_ACTIVE: "CAMPAIGN_NOT_ACTIVE",
  PHONE_NUMBER_NOT_AVAILABLE: "PHONE_NUMBER_NOT_AVAILABLE",
  // Server
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE"
};

// plugins/rest-api/services/api-key.service.js
var BCRYPT_ROUNDS = 12;
var ApiKeyService = class {
  /**
   * Generate a new API key for a user
   * Returns the full key (shown once) and the stored key record
   */
  static async generateKey(params) {
    const randomBytes = crypto.randomBytes(32);
    const keySecret = randomBytes.toString("base64url");
    const fullKey = `${API_KEY_PREFIX}${keySecret}`;
    const keyPrefix = fullKey.substring(0, 16);
    const hashedSecret = await bcrypt.hash(keySecret, BCRYPT_ROUNDS);
    const [record] = await db2.insert(apiKeys).values({
      userId: params.userId,
      name: params.name,
      keyPrefix,
      hashedSecret,
      scopes: params.scopes || ["calls:read", "calls:write", "campaigns:read", "contacts:read"],
      rateLimit: params.rateLimit || 100,
      ipWhitelist: params.ipWhitelist || [],
      expiresAt: params.expiresAt,
      description: params.description
    }).returning();
    return { key: fullKey, record };
  }
  /**
   * Validate an API key and return the key record if valid
   */
  static async validateKey(fullKey) {
    if (!fullKey.startsWith(API_KEY_PREFIX)) {
      return null;
    }
    const keyPrefix = fullKey.substring(0, 16);
    const keySecret = fullKey.substring(API_KEY_PREFIX.length);
    const [keyRecord] = await db2.select().from(apiKeys).where(eq4(apiKeys.keyPrefix, keyPrefix)).limit(1);
    if (!keyRecord) {
      return null;
    }
    if (!keyRecord.isActive) {
      return null;
    }
    if (keyRecord.expiresAt && new Date(keyRecord.expiresAt) < /* @__PURE__ */ new Date()) {
      return null;
    }
    const isValid = await bcrypt.compare(keySecret, keyRecord.hashedSecret);
    if (!isValid) {
      return null;
    }
    await db2.update(apiKeys).set({
      lastUsedAt: /* @__PURE__ */ new Date(),
      totalRequests: sql4`${apiKeys.totalRequests} + 1`
    }).where(eq4(apiKeys.id, keyRecord.id));
    return keyRecord;
  }
  /**
   * Check if IP is allowed for this key
   */
  static isIpAllowed(keyRecord, clientIp) {
    if (!keyRecord.ipWhitelist || keyRecord.ipWhitelist.length === 0) {
      return true;
    }
    return keyRecord.ipWhitelist.includes(clientIp);
  }
  /**
   * Check if key has required scope
   */
  static hasScope(keyRecord, requiredScope) {
    if (keyRecord.scopes.includes("admin")) {
      return true;
    }
    return keyRecord.scopes.includes(requiredScope);
  }
  /**
   * Check and update rate limit
   * Returns true if request is allowed, false if rate limited
   */
  static async checkRateLimit(keyRecord) {
    const now = /* @__PURE__ */ new Date();
    const windowStart = new Date(now.getTime() - keyRecord.rateLimitWindow * 1e3);
    const [rateLimit] = await db2.select().from(apiRateLimits).where(
      and3(
        eq4(apiRateLimits.apiKeyId, keyRecord.id),
        gte3(apiRateLimits.windowStart, windowStart)
      )
    ).limit(1);
    const currentCount = rateLimit?.requestCount || 0;
    const resetAt = new Date(now.getTime() + keyRecord.rateLimitWindow * 1e3);
    if (currentCount >= keyRecord.rateLimit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt
      };
    }
    if (rateLimit) {
      await db2.update(apiRateLimits).set({ requestCount: sql4`${apiRateLimits.requestCount} + 1` }).where(eq4(apiRateLimits.id, rateLimit.id));
    } else {
      await db2.insert(apiRateLimits).values({
        apiKeyId: keyRecord.id,
        windowStart: now,
        requestCount: 1
      });
    }
    return {
      allowed: true,
      remaining: keyRecord.rateLimit - currentCount - 1,
      resetAt
    };
  }
  /**
   * Get all API keys for a user (without secrets)
   */
  static async getUserKeys(userId) {
    const keys = await db2.select({
      id: apiKeys.id,
      userId: apiKeys.userId,
      name: apiKeys.name,
      keyPrefix: apiKeys.keyPrefix,
      scopes: apiKeys.scopes,
      rateLimit: apiKeys.rateLimit,
      rateLimitWindow: apiKeys.rateLimitWindow,
      ipWhitelist: apiKeys.ipWhitelist,
      expiresAt: apiKeys.expiresAt,
      isActive: apiKeys.isActive,
      lastUsedAt: apiKeys.lastUsedAt,
      lastUsedIp: apiKeys.lastUsedIp,
      totalRequests: apiKeys.totalRequests,
      description: apiKeys.description,
      metadata: apiKeys.metadata,
      createdAt: apiKeys.createdAt,
      updatedAt: apiKeys.updatedAt
    }).from(apiKeys).where(eq4(apiKeys.userId, userId));
    return keys;
  }
  /**
   * Revoke an API key
   */
  static async revokeKey(keyId, userId) {
    const result = await db2.update(apiKeys).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(and3(eq4(apiKeys.id, keyId), eq4(apiKeys.userId, userId))).returning();
    return result.length > 0;
  }
  /**
   * Delete an API key permanently
   */
  static async deleteKey(keyId, userId) {
    const result = await db2.delete(apiKeys).where(and3(eq4(apiKeys.id, keyId), eq4(apiKeys.userId, userId))).returning();
    return result.length > 0;
  }
  /**
   * Update API key settings
   */
  static async updateKey(keyId, userId, updates) {
    const [updated] = await db2.update(apiKeys).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and3(eq4(apiKeys.id, keyId), eq4(apiKeys.userId, userId))).returning();
    return updated || null;
  }
  /**
   * Regenerate an API key (creates new secret, keeps settings)
   */
  static async regenerateKey(keyId, userId) {
    const [existing] = await db2.select().from(apiKeys).where(and3(eq4(apiKeys.id, keyId), eq4(apiKeys.userId, userId))).limit(1);
    if (!existing) {
      return null;
    }
    const randomBytes = crypto.randomBytes(32);
    const keySecret = randomBytes.toString("base64url");
    const fullKey = `${API_KEY_PREFIX}${keySecret}`;
    const keyPrefix = fullKey.substring(0, 16);
    const hashedSecret = await bcrypt.hash(keySecret, BCRYPT_ROUNDS);
    const [updated] = await db2.update(apiKeys).set({
      keyPrefix,
      hashedSecret,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq4(apiKeys.id, keyId)).returning();
    return { key: fullKey, record: updated };
  }
  /**
   * Log an API request
   */
  static async logRequest(params) {
    let sanitizedBody = params.requestBody;
    if (typeof sanitizedBody === "object" && sanitizedBody !== null) {
      const body = { ...sanitizedBody };
      delete body.password;
      delete body.secret;
      delete body.apiKey;
      delete body.token;
      sanitizedBody = body;
    }
    await db2.insert(apiAuditLogs).values({
      userId: params.userId,
      apiKeyId: params.apiKeyId,
      method: params.method,
      endpoint: params.endpoint,
      path: params.path,
      requestBody: sanitizedBody,
      queryParams: params.queryParams,
      statusCode: params.statusCode,
      responseTime: params.responseTime,
      errorMessage: params.errorMessage,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      requestId: params.requestId
    });
  }
  /**
   * Get audit logs for a user
   */
  static async getAuditLogs(userId, options = {}) {
    const page = options.page || 1;
    const pageSize = Math.min(options.pageSize || 50, 100);
    const offset = (page - 1) * pageSize;
    const conditions = [eq4(apiAuditLogs.userId, userId)];
    if (options.apiKeyId) {
      conditions.push(eq4(apiAuditLogs.apiKeyId, options.apiKeyId));
    }
    const logs = await db2.select().from(apiAuditLogs).where(and3(...conditions)).orderBy(sql4`${apiAuditLogs.createdAt} DESC`).limit(pageSize).offset(offset);
    return logs;
  }
};

// plugins/rest-api/middleware/auth.middleware.js
import { nanoid as nanoid2 } from "nanoid";
function extractApiKey(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  const apiKeyHeader = req.headers["x-api-key"];
  if (typeof apiKeyHeader === "string") {
    return apiKeyHeader;
  }
  return null;
}
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}
function sendError(res, statusCode, code, message, requestId, details) {
  const response = {
    success: false,
    error: {
      code,
      message,
      details
    },
    meta: {
      requestId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  res.status(statusCode).json(response);
}
function apiAuthMiddleware(requiredScope) {
  return async (req, res, next) => {
    const requestId = nanoid2(12);
    const requestStartTime = Date.now();
    const clientIp = getClientIp(req);
    req.requestId = requestId;
    req.requestStartTime = requestStartTime;
    res.setHeader("X-Request-ID", requestId);
    try {
      const apiKey = extractApiKey(req);
      if (!apiKey) {
        return sendError(res, 401, "UNAUTHORIZED", "API key is required. Provide via Authorization: Bearer <key> or X-API-Key header.", requestId);
      }
      const keyRecord = await ApiKeyService.validateKey(apiKey);
      if (!keyRecord) {
        return sendError(res, 401, "INVALID_API_KEY", "Invalid or expired API key.", requestId);
      }
      if (!ApiKeyService.isIpAllowed(keyRecord, clientIp)) {
        await ApiKeyService.logRequest({
          userId: keyRecord.userId,
          apiKeyId: keyRecord.id,
          method: req.method,
          endpoint: req.route?.path || req.path,
          path: req.path,
          requestBody: req.body,
          queryParams: req.query,
          statusCode: 403,
          responseTime: Date.now() - requestStartTime,
          errorMessage: "IP not whitelisted",
          ipAddress: clientIp,
          userAgent: req.headers["user-agent"],
          requestId
        });
        return sendError(res, 403, "IP_NOT_WHITELISTED", `IP address ${clientIp} is not in the whitelist.`, requestId);
      }
      const rateLimitResult = await ApiKeyService.checkRateLimit(keyRecord);
      res.setHeader("X-RateLimit-Limit", keyRecord.rateLimit);
      res.setHeader("X-RateLimit-Remaining", rateLimitResult.remaining);
      res.setHeader("X-RateLimit-Reset", Math.ceil(rateLimitResult.resetAt.getTime() / 1e3));
      if (!rateLimitResult.allowed) {
        await ApiKeyService.logRequest({
          userId: keyRecord.userId,
          apiKeyId: keyRecord.id,
          method: req.method,
          endpoint: req.route?.path || req.path,
          path: req.path,
          requestBody: req.body,
          queryParams: req.query,
          statusCode: 429,
          responseTime: Date.now() - requestStartTime,
          errorMessage: "Rate limit exceeded",
          ipAddress: clientIp,
          userAgent: req.headers["user-agent"],
          requestId
        });
        return sendError(res, 429, "RATE_LIMIT_EXCEEDED", `Rate limit exceeded. Retry after ${Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1e3)} seconds.`, requestId, {
          retryAfter: Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1e3)
        });
      }
      if (requiredScope && !ApiKeyService.hasScope(keyRecord, requiredScope)) {
        await ApiKeyService.logRequest({
          userId: keyRecord.userId,
          apiKeyId: keyRecord.id,
          method: req.method,
          endpoint: req.route?.path || req.path,
          path: req.path,
          requestBody: req.body,
          queryParams: req.query,
          statusCode: 403,
          responseTime: Date.now() - requestStartTime,
          errorMessage: `Missing scope: ${requiredScope}`,
          ipAddress: clientIp,
          userAgent: req.headers["user-agent"],
          requestId
        });
        return sendError(res, 403, "INSUFFICIENT_SCOPES", `API key does not have required scope: ${requiredScope}`, requestId, {
          requiredScope,
          availableScopes: keyRecord.scopes
        });
      }
      req.apiAuth = {
        userId: keyRecord.userId,
        apiKeyId: keyRecord.id,
        keyPrefix: keyRecord.keyPrefix,
        scopes: keyRecord.scopes,
        rateLimit: keyRecord.rateLimit,
        rateLimitWindow: keyRecord.rateLimitWindow
      };
      res.on("finish", () => {
        ApiKeyService.logRequest({
          userId: keyRecord.userId,
          apiKeyId: keyRecord.id,
          method: req.method,
          endpoint: req.route?.path || req.path,
          path: req.path,
          requestBody: req.body,
          queryParams: req.query,
          statusCode: res.statusCode,
          responseTime: Date.now() - requestStartTime,
          ipAddress: clientIp,
          userAgent: req.headers["user-agent"],
          requestId
        }).catch((err) => console.error("[REST API] Failed to log request:", err));
      });
      next();
    } catch (error) {
      console.error("[REST API] Auth middleware error:", error);
      return sendError(res, 500, "INTERNAL_ERROR", "An internal error occurred during authentication.", requestId);
    }
  };
}
function requireScope(scope) {
  return (req, res, next) => {
    const authReq = req;
    const requestId = authReq.requestId || nanoid2(12);
    if (!authReq.apiAuth) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required.", requestId);
    }
    if (!ApiKeyService.hasScope({ scopes: authReq.apiAuth.scopes }, scope)) {
      return sendError(res, 403, "INSUFFICIENT_SCOPES", `API key does not have required scope: ${scope}`, requestId);
    }
    next();
  };
}
function asyncHandler(fn) {
  return (req, res, next) => {
    const authReq = req;
    Promise.resolve(fn(authReq, res, next)).catch((error) => {
      console.error("[REST API] Route handler error:", error);
      const requestId = authReq.requestId || "unknown";
      sendError(res, 500, "INTERNAL_ERROR", "An internal error occurred.", requestId);
    });
  };
}

// plugins/rest-api/routes/calls.routes.js
init_schema();
import { eq as eq5, and as and4, desc as desc3, sql as sql5 } from "drizzle-orm";
import { z as z2 } from "zod";

// plugins/rest-api/service-registry.js
var _services = null;
function setCallServices(services) {
  _services = services;
}
function getCallServices() {
  if (!_services) {
    throw new Error("[REST API Plugin] Call services not initialized. Ensure services are injected at plugin registration.");
  }
  return _services;
}

// plugins/rest-api/routes/calls.routes.js
var router = Router();
var triggerCallSchema = z2.object({
  agentId: z2.string().uuid("Invalid agent ID"),
  toNumber: z2.string().min(10, "Phone number must be at least 10 digits"),
  fromNumber: z2.string().optional(),
  engine: z2.enum(["elevenlabs", "plivo", "twilio-openai"]).optional(),
  dynamicVariables: z2.record(z2.string()).optional(),
  metadata: z2.record(z2.string()).optional(),
  scheduledAt: z2.string().datetime().optional()
});
router.post(
  "/",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const { userId, apiKeyId } = req.apiAuth;
    const parseResult = triggerCallSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { agentId, toNumber, fromNumber, engine, dynamicVariables, metadata } = parseResult.data;
    const [user] = await db2.select().from(users).where(eq5(users.id, userId)).limit(1);
    if (!user || user.credits < 1) {
      const response2 = {
        success: false,
        error: {
          code: "INSUFFICIENT_CREDITS",
          message: "Insufficient credits to make a call. Please add more credits."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(402).json(response2);
    }
    const [agent] = await db2.select().from(agents).where(and4(eq5(agents.id, agentId), eq5(agents.userId, userId))).limit(1);
    if (!agent) {
      const response2 = {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Agent not found or does not belong to you."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (!agent.isActive) {
      const response2 = {
        success: false,
        error: {
          code: "AGENT_NOT_ACTIVE",
          message: "Agent is not active. Please activate it before making calls."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const callEngine = engine || agent.telephonyProvider || "elevenlabs";
    let callerNumber = fromNumber;
    let fromPhoneRecord = null;
    if (!callerNumber) {
      const [userPhone] = await db2.select().from(phoneNumbers).where(and4(eq5(phoneNumbers.userId, userId), eq5(phoneNumbers.status, "active"))).limit(1);
      if (!userPhone) {
        const response2 = {
          success: false,
          error: {
            code: "PHONE_NUMBER_NOT_AVAILABLE",
            message: "No active phone number found. Please provide a fromNumber or purchase a phone number."
          },
          meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
        };
        return res.status(400).json(response2);
      }
      callerNumber = userPhone.phoneNumber;
      fromPhoneRecord = userPhone;
    } else {
      const [foundPhone] = await db2.select().from(phoneNumbers).where(and4(eq5(phoneNumbers.phoneNumber, callerNumber), eq5(phoneNumbers.userId, userId))).limit(1);
      fromPhoneRecord = foundPhone || null;
    }
    let callId;
    let callStatus = "queued";
    let services;
    try {
      services = getCallServices();
    } catch (serviceErr) {
      console.error("[REST API] Call initiation failed:", serviceErr.message);
      return res.status(503).json({
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Call services are not available. Ensure the REST API plugin is properly registered with call service injection."
        }
      });
    }
    try {
      if (callEngine === "plivo") {
        if (!fromPhoneRecord) {
          throw new Error("Phone number not found in database.");
        }
        const { PlivoCallService } = services;
        const result = await PlivoCallService.initiateCall({
          userId,
          agentId,
          toNumber,
          fromNumber: callerNumber,
          plivoPhoneNumberId: fromPhoneRecord.id,
          agentConfig: {
            voice: agent.openaiVoice || "alloy",
            model: agent.openaiModel || "gpt-realtime-1.5",
            systemPrompt: agent.systemPrompt || "You are a helpful assistant.",
            firstMessage: agent.firstMessage || void 0
          }
        });
        callId = result.callUuid;
        callStatus = result.plivoCall?.status || "queued";
      } else if (callEngine === "twilio-openai") {
        if (!fromPhoneRecord) {
          throw new Error("Phone number not found in database.");
        }
        const { TwilioOpenAICallService } = services;
        const result = await TwilioOpenAICallService.initiateCall({
          userId,
          agentId,
          toNumber,
          fromNumberId: fromPhoneRecord.id
        });
        if (!result.success) {
          throw new Error(result.error || "Failed to initiate Twilio-OpenAI call");
        }
        callId = result.callId || "";
        callStatus = "queued";
      } else {
        const { OutboundCallService, getCredentialForAgent } = services;
        if (!agent.elevenLabsAgentId) {
          throw new Error("Agent is not configured for ElevenLabs. Missing elevenLabsAgentId.");
        }
        const [elPhone] = await db2.select().from(phoneNumbers).where(and4(eq5(phoneNumbers.phoneNumber, callerNumber), eq5(phoneNumbers.userId, userId))).limit(1);
        if (!elPhone || !elPhone.elevenLabsPhoneNumberId) {
          throw new Error("Phone number is not configured for ElevenLabs outbound calls. Missing elevenLabsPhoneNumberId.");
        }
        const credential = await getCredentialForAgent(agentId);
        if (!credential) {
          throw new Error("No ElevenLabs API capacity available.");
        }
        const merged = {
          ...metadata || {},
          ...dynamicVariables || {}
        };
        const callDynamicVars = {
          contact_name: merged.contact_name?.trim() || toNumber,
          contact_phone: merged.contact_phone?.trim() || toNumber,
          name: merged.name?.trim() || toNumber,
          phone: merged.phone?.trim() || toNumber,
          ...merged
        };
        callDynamicVars.contact_name = callDynamicVars.contact_name?.trim() || toNumber;
        callDynamicVars.name = callDynamicVars.name?.trim() || toNumber;
        const callService = new OutboundCallService(credential.apiKey);
        const result = await callService.initiateCall({
          agentId: agent.elevenLabsAgentId,
          agentPhoneNumberId: elPhone.elevenLabsPhoneNumberId,
          toNumber,
          dynamicData: callDynamicVars
        });
        const contactName = callDynamicVars.contact_name || toNumber;
        const callRecord = await db2.insert(calls).values({
          id: result.conversationId || `el-${Date.now()}`,
          userId,
          toNumber,
          fromNumber: callerNumber,
          status: result.success ? "in-progress" : "failed",
          callDirection: "outgoing",
          twilioSid: result.callSid || void 0,
          elevenLabsConversationId: result.conversationId,
          metadata: { apiKeyId, callSid: result.callSid, agentId, agentName: agent.name, engine: callEngine, credentialId: credential.id, contactName, dynamicVariables: callDynamicVars },
          agentId,
          engineType: callEngine,
          creditsUsed: 1
        }).returning();
        callId = callRecord[0]?.id || result.conversationId || "";
        callStatus = result.success ? "in-progress" : "failed";
      }
    } catch (error) {
      console.error("[REST API] Call initiation failed:", error);
      const response2 = {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to initiate call"
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(500).json(response2);
    }
    const responseData = {
      callId,
      status: callStatus,
      agentId,
      toNumber,
      fromNumber: callerNumber,
      engine: callEngine,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const response = {
      success: true,
      data: responseData,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
router.get(
  "/",
  apiAuthMiddleware("calls:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
    const offset = (page - 1) * pageSize;
    const fetchLimit = offset + pageSize;
    const [
      elevenLabsCalls,
      plivoCallsList,
      twilioOpenaiCallsList,
      elCount,
      plivoCount,
      twilioCount
    ] = await Promise.all([
      db2.select().from(calls).where(eq5(calls.userId, userId)).orderBy(desc3(calls.createdAt)).limit(fetchLimit),
      db2.select().from(plivoCalls).where(eq5(plivoCalls.userId, userId)).orderBy(desc3(plivoCalls.createdAt)).limit(fetchLimit),
      db2.select().from(twilioOpenaiCalls).where(eq5(twilioOpenaiCalls.userId, userId)).orderBy(desc3(twilioOpenaiCalls.createdAt)).limit(fetchLimit),
      db2.select({ count: sql5`count(*)` }).from(calls).where(eq5(calls.userId, userId)),
      db2.select({ count: sql5`count(*)` }).from(plivoCalls).where(eq5(plivoCalls.userId, userId)),
      db2.select({ count: sql5`count(*)` }).from(twilioOpenaiCalls).where(eq5(twilioOpenaiCalls.userId, userId))
    ]);
    const totalItems = Number(elCount[0]?.count || 0) + Number(plivoCount[0]?.count || 0) + Number(twilioCount[0]?.count || 0);
    const normalizedCalls = [
      ...elevenLabsCalls.map((c) => ({
        id: c.id,
        engine: "elevenlabs",
        agentId: c.agentId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: c.creditsUsed,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        createdAt: c.createdAt,
        endedAt: c.endedAt
      })),
      ...plivoCallsList.map((c) => ({
        id: c.id,
        engine: "plivo",
        agentId: c.agentId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: c.creditsUsed,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        createdAt: c.createdAt,
        endedAt: c.endedAt
      })),
      ...twilioOpenaiCallsList.map((c) => ({
        id: c.id,
        engine: "twilio-openai",
        agentId: c.agentId,
        toNumber: c.toNumber,
        fromNumber: c.fromNumber,
        status: c.status,
        duration: c.duration,
        creditsUsed: c.creditsUsed,
        transcript: c.transcript,
        aiSummary: c.aiSummary,
        recordingUrl: c.recordingUrl,
        createdAt: c.createdAt,
        endedAt: c.endedAt
      }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const totalPages = Math.ceil(totalItems / pageSize);
    const response = {
      success: true,
      data: normalizedCalls.slice(offset, offset + pageSize),
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router.get(
  "/:id",
  apiAuthMiddleware("calls:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [elevenLabsCall] = await db2.select().from(calls).where(and4(eq5(calls.id, id), eq5(calls.userId, userId))).limit(1);
    if (elevenLabsCall) {
      const response2 = {
        success: true,
        data: {
          id: elevenLabsCall.id,
          engine: "elevenlabs",
          agentId: elevenLabsCall.agentId,
          toNumber: elevenLabsCall.toNumber,
          fromNumber: elevenLabsCall.fromNumber,
          status: elevenLabsCall.status,
          duration: elevenLabsCall.duration,
          creditsUsed: elevenLabsCall.creditsUsed,
          transcript: elevenLabsCall.transcript,
          aiSummary: elevenLabsCall.aiSummary,
          recordingUrl: elevenLabsCall.recordingUrl,
          sentiment: elevenLabsCall.sentiment,
          createdAt: elevenLabsCall.createdAt,
          endedAt: elevenLabsCall.endedAt
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.json(response2);
    }
    const [plivoCall] = await db2.select().from(plivoCalls).where(and4(eq5(plivoCalls.id, id), eq5(plivoCalls.userId, userId))).limit(1);
    if (plivoCall) {
      const response2 = {
        success: true,
        data: {
          id: plivoCall.id,
          engine: "plivo",
          agentId: plivoCall.agentId,
          toNumber: plivoCall.toNumber,
          fromNumber: plivoCall.fromNumber,
          status: plivoCall.status,
          duration: plivoCall.durationSeconds,
          creditsUsed: plivoCall.creditsUsed,
          transcript: plivoCall.transcript,
          aiSummary: plivoCall.aiSummary,
          recordingUrl: plivoCall.recordingUrl,
          createdAt: plivoCall.createdAt,
          endedAt: plivoCall.endedAt
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.json(response2);
    }
    const [twilioCall] = await db2.select().from(twilioOpenaiCalls).where(and4(eq5(twilioOpenaiCalls.id, id), eq5(twilioOpenaiCalls.userId, userId))).limit(1);
    if (twilioCall) {
      const response2 = {
        success: true,
        data: {
          id: twilioCall.id,
          engine: "twilio-openai",
          agentId: twilioCall.agentId,
          toNumber: twilioCall.toNumber,
          fromNumber: twilioCall.fromNumber,
          status: twilioCall.status,
          duration: twilioCall.durationSeconds,
          creditsUsed: twilioCall.creditsUsed,
          transcript: twilioCall.transcript,
          aiSummary: twilioCall.aiSummary,
          recordingUrl: twilioCall.recordingUrl,
          createdAt: twilioCall.createdAt,
          endedAt: twilioCall.endedAt
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.json(response2);
    }
    const response = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Call not found."
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(404).json(response);
  })
);
router.post(
  "/:id/hangup",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const response = {
      success: true,
      data: {
        callId: id,
        status: "hangup_requested",
        message: "Hangup request sent to call."
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
var calls_routes_default = router;

// plugins/rest-api/routes/campaigns.routes.js
import { Router as Router2 } from "express";
import multer from "multer";
init_schema();
import { eq as eq8, and as and7, desc as desc6, sql as sql8 } from "drizzle-orm";
import { z as z3 } from "zod";

// server/services/contact-upload-service.js
import Papa from "papaparse";

// server/storage.js
init_schema();
import { nanoid as nanoid3 } from "nanoid";
import { eq as eq7, sql as sql7, and as and6, gte as gte5, lte as lte3, desc as desc5, asc as asc2, isNull as isNull4, isNotNull as isNotNull3, or as or4, inArray as inArray4 } from "drizzle-orm";

// server/storage/analytics-helpers.js
init_schema();
import { eq as eq6, sql as sql6, and as and5, gte as gte4, lt as lt3, desc as desc4, isNull as isNull3, or as or3, inArray as inArray3 } from "drizzle-orm";
async function calculateGlobalAnalytics2(timeRange) {
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
  const allUsers = await db2.select().from(users);
  const allPhoneNumbers = await db2.select().from(phoneNumbers);
  const allContacts = await db2.select().from(contacts);
  const allKnowledgeBases = await db2.select().from(knowledgeBase);
  const filteredCalls = await db2.select().from(calls).where(gte4(calls.createdAt, startDate));
  const filteredCampaigns = await db2.select().from(campaigns).where(gte4(campaigns.createdAt, startDate));
  const filteredUsers = await db2.select().from(users).where(gte4(users.createdAt, startDate));
  let previousUsers = [];
  let previousCalls = [];
  let previousCampaigns = [];
  if (!isAllTime) {
    previousUsers = await db2.select().from(users).where(
      and5(gte4(users.createdAt, previousStartDate), lt3(users.createdAt, previousEndDate))
    );
    previousCalls = await db2.select().from(calls).where(
      and5(gte4(calls.createdAt, previousStartDate), lt3(calls.createdAt, previousEndDate))
    );
    previousCampaigns = await db2.select().from(campaigns).where(
      and5(gte4(campaigns.createdAt, previousStartDate), lt3(campaigns.createdAt, previousEndDate))
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
  const growthData = calculateGrowthData2(
    filteredUsers,
    filteredCalls,
    filteredCampaigns,
    startDate,
    now,
    groupByWeek,
    isAllTime
  );
  const activeSubscriptions = await db2.select({
    userId: userSubscriptions.userId,
    planName: plans.name,
    status: userSubscriptions.status,
    currentPeriodEnd: userSubscriptions.currentPeriodEnd
  }).from(userSubscriptions).innerJoin(plans, eq6(userSubscriptions.planId, plans.id)).where(
    and5(
      eq6(userSubscriptions.status, "active"),
      or3(
        isNull3(userSubscriptions.currentPeriodEnd),
        gte4(userSubscriptions.currentPeriodEnd, now)
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
function calculateGrowthData2(filteredUsers, filteredCalls, filteredCampaigns, startDate, now, groupByWeek, isAllTime) {
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
async function calculateUserAnalytics2(userId, timeRange = "7days", callType = "all") {
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
  const userCampaigns = await db2.select().from(campaigns).where(eq6(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db2.select().from(incomingConnections).where(eq6(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  const directOwnershipCalls = await db2.select().from(calls).where(and5(eq6(calls.userId, userId), gte4(calls.createdAt, startDate)));
  allUserCalls.push(...directOwnershipCalls);
  if (campaignIds.length > 0) {
    const campaignCalls = await db2.select().from(calls).where(and5(inArray3(calls.campaignId, campaignIds), gte4(calls.createdAt, startDate)));
    for (const call of campaignCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  if (incomingConnectionIds.length > 0) {
    const incomingCalls = await db2.select().from(calls).where(and5(inArray3(calls.incomingConnectionId, incomingConnectionIds), gte4(calls.createdAt, startDate)));
    for (const call of incomingCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  const twilioOpenAICallsData = await db2.select().from(twilioOpenaiCalls).where(and5(eq6(twilioOpenaiCalls.userId, userId), gte4(twilioOpenaiCalls.createdAt, startDate)));
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
  const plivoAnalyticsCallsData = await db2.select().from(plivoCalls).where(and5(eq6(plivoCalls.userId, userId), gte4(plivoCalls.createdAt, startDate)));
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
  const dailyCalls = calculateDailyCalls2(allCalls, timeRange);
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
function calculateDailyCalls2(allCalls, timeRange) {
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
async function calculateDashboardData2(userId) {
  const now = /* @__PURE__ */ new Date();
  const weekAgo = /* @__PURE__ */ new Date();
  weekAgo.setDate(now.getDate() - 7);
  const userCampaigns = await db2.select().from(campaigns).where(eq6(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db2.select().from(incomingConnections).where(eq6(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  const directOwnershipCalls = await db2.select().from(calls).where(eq6(calls.userId, userId));
  allUserCalls.push(...directOwnershipCalls);
  if (campaignIds.length > 0) {
    const campaignCalls = await db2.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
    for (const call of campaignCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  if (incomingConnectionIds.length > 0) {
    const incomingCalls = await db2.select().from(calls).where(inArray3(calls.incomingConnectionId, incomingConnectionIds));
    for (const call of incomingCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  const twilioOpenAICallsData = await db2.select().from(twilioOpenaiCalls).where(eq6(twilioOpenaiCalls.userId, userId));
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
  const plivoCallsData = await db2.select().from(plivoCalls).where(eq6(plivoCalls.userId, userId));
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
  const recentCalls = await db2.select({
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
  }).from(calls).where(eq6(calls.userId, userId)).orderBy(desc4(calls.createdAt)).limit(10);
  let recentUsers = [];
  const [currentUser] = await db2.select().from(users).where(eq6(users.id, userId));
  if (currentUser?.role === "admin" || currentUser?.role === "super_admin") {
    recentUsers = await db2.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    }).from(users).orderBy(desc4(users.createdAt)).limit(5);
  }
  const totalCampaigns = userCampaigns.length;
  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "in_progress" || c.status === "scheduled" || c.status === "pending"
  ).length;
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed").length;
  let allCampaignCalls = [];
  if (campaignIds.length > 0) {
    allCampaignCalls = await db2.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
  }
  const campaignCallsCompleted = allCampaignCalls.filter((c) => c.status === "completed");
  const campaignSuccessRate = allCampaignCalls.length > 0 ? Math.round(campaignCallsCompleted.length / allCampaignCalls.length * 100) : 0;
  const campaignAvgDuration = campaignCallsCompleted.length > 0 ? Math.round(campaignCallsCompleted.reduce((sum, c) => sum + (c.duration || 0), 0) / campaignCallsCompleted.length) : 0;
  const [appointmentsResult] = await db2.select({ count: sql6`count(*)` }).from(appointments).where(eq6(appointments.userId, userId));
  const appointmentsCount = Number(appointmentsResult?.count || 0);
  const userForms = await db2.select({ id: forms.id }).from(forms).where(eq6(forms.userId, userId));
  const formsCount = userForms.length;
  let formSubmissionsCount = 0;
  if (userForms.length > 0) {
    const formIds = userForms.map((f) => f.id);
    const [submissionsResult] = await db2.select({ count: sql6`count(*)` }).from(formSubmissions).where(inArray3(formSubmissions.formId, formIds));
    formSubmissionsCount = Number(submissionsResult?.count || 0);
  }
  const [kbResult] = await db2.select({ count: sql6`count(*)` }).from(knowledgeBase).where(eq6(knowledgeBase.userId, userId));
  const knowledgeBaseCount = Number(kbResult?.count || 0);
  const [webhooksResult] = await db2.select({ count: sql6`count(*)` }).from(webhookSubscriptions).where(eq6(webhookSubscriptions.userId, userId));
  const webhooksCount = Number(webhooksResult?.count || 0);
  const [userTemplatesResult] = await db2.select({ count: sql6`count(*)` }).from(promptTemplates).where(eq6(promptTemplates.userId, userId));
  const userTemplatesCount = Number(userTemplatesResult?.count || 0);
  const [systemTemplatesResult] = await db2.select({ count: sql6`count(*)` }).from(promptTemplates).where(eq6(promptTemplates.isSystemTemplate, true));
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

// server/storage.js
var DbStorage2 = class {
  // Users
  async getUser(id) {
    const [user] = await db2.select().from(users).where(eq7(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db2.select().from(users).where(eq7(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db2.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUserCredits(userId, credits) {
    await db2.update(users).set({ credits }).where(eq7(users.id, userId));
  }
  // Agents
  async getAgent(id) {
    const [agent] = await db2.select().from(agents).where(eq7(agents.id, id));
    return agent;
  }
  async getUserAgents(userId) {
    return db2.select().from(agents).where(eq7(agents.userId, userId));
  }
  async createAgent(insertAgent) {
    const [agent] = await db2.insert(agents).values(insertAgent).returning();
    return agent;
  }
  async updateAgent(id, agent) {
    await db2.update(agents).set(agent).where(eq7(agents.id, id));
  }
  async deleteAgent(id) {
    await db2.delete(agents).where(eq7(agents.id, id));
  }
  // Knowledge Base
  async getKnowledgeBaseItem(id) {
    const [item] = await db2.select().from(knowledgeBase).where(eq7(knowledgeBase.id, id));
    return item;
  }
  async getUserKnowledgeBase(userId) {
    return db2.select().from(knowledgeBase).where(eq7(knowledgeBase.userId, userId));
  }
  async getUserKnowledgeBaseCount(userId) {
    const result = await db2.select({ count: sql7`count(*)` }).from(knowledgeBase).where(eq7(knowledgeBase.userId, userId));
    return Number(result[0]?.count || 0);
  }
  async createKnowledgeBaseItem(insertItem) {
    const [item] = await db2.insert(knowledgeBase).values(insertItem).returning();
    return item;
  }
  async updateKnowledgeBaseItem(id, item) {
    await db2.update(knowledgeBase).set(item).where(eq7(knowledgeBase.id, id));
  }
  async deleteKnowledgeBaseItem(id) {
    await db2.delete(knowledgeBase).where(eq7(knowledgeBase.id, id));
  }
  // Campaigns
  async getCampaign(id) {
    const [campaign] = await db2.select().from(campaigns).where(and6(
      eq7(campaigns.id, id),
      isNull4(campaigns.deletedAt)
    ));
    return campaign;
  }
  async getCampaignIncludingDeleted(id) {
    const [campaign] = await db2.select().from(campaigns).where(eq7(campaigns.id, id));
    return campaign;
  }
  async getUserCampaigns(userId) {
    return db2.select().from(campaigns).where(and6(
      eq7(campaigns.userId, userId),
      isNull4(campaigns.deletedAt)
    )).orderBy(desc5(campaigns.createdAt));
  }
  async getUserDeletedCampaigns(userId) {
    return db2.select().from(campaigns).where(and6(
      eq7(campaigns.userId, userId),
      isNotNull3(campaigns.deletedAt)
    )).orderBy(desc5(campaigns.createdAt));
  }
  async createCampaign(insertCampaign) {
    const [campaign] = await db2.insert(campaigns).values(insertCampaign).returning();
    return campaign;
  }
  async updateCampaign(id, campaign) {
    await db2.update(campaigns).set(campaign).where(eq7(campaigns.id, id));
  }
  async deleteCampaign(id) {
    await db2.update(campaigns).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq7(campaigns.id, id));
  }
  async restoreCampaign(id) {
    await db2.update(campaigns).set({ deletedAt: null }).where(eq7(campaigns.id, id));
  }
  // Contacts
  async getContact(id) {
    const [contact] = await db2.select().from(contacts).where(eq7(contacts.id, id));
    return contact;
  }
  async getCampaignContacts(campaignId) {
    return db2.select().from(contacts).where(eq7(contacts.campaignId, campaignId));
  }
  async getUserContacts(userId) {
    const results = await db2.select({
      contact: contacts,
      campaign: campaigns
    }).from(contacts).innerJoin(campaigns, eq7(contacts.campaignId, campaigns.id)).where(and6(
      eq7(campaigns.userId, userId),
      isNull4(campaigns.deletedAt)
    ));
    return results.map((r) => ({
      ...r.contact,
      campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null
    }));
  }
  async getUserContactsDeduplicated(userId) {
    const results = await db2.select({
      contact: contacts,
      campaign: campaigns
    }).from(contacts).innerJoin(campaigns, eq7(contacts.campaignId, campaigns.id)).where(and6(
      eq7(campaigns.userId, userId),
      isNull4(campaigns.deletedAt)
    )).orderBy(desc5(contacts.createdAt));
    const phoneGroups = /* @__PURE__ */ new Map();
    for (const result of results) {
      const { contact, campaign } = result;
      const phone = contact.phone;
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
    const callsWithoutContacts = await db2.select({
      phoneNumber: calls.phoneNumber,
      callDirection: calls.callDirection,
      createdAt: calls.createdAt,
      status: calls.status
    }).from(calls).where(and6(
      eq7(calls.userId, userId),
      isNull4(calls.contactId),
      isNotNull3(calls.phoneNumber)
    )).orderBy(desc5(calls.createdAt));
    for (const call of callsWithoutContacts) {
      const phone = call.phoneNumber;
      if (!phone || phone === "Unknown Caller" || phone === "unknown") continue;
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
    const [contact] = await db2.insert(contacts).values(insertContact).returning();
    return contact;
  }
  async createContacts(insertContacts) {
    return db2.insert(contacts).values(insertContacts).returning();
  }
  async deleteContact(id) {
    await db2.delete(contacts).where(eq7(contacts.id, id));
  }
  // Calls
  async getCall(id) {
    const [call] = await db2.select().from(calls).where(eq7(calls.id, id));
    return call;
  }
  async getCallWithDetails(id) {
    const elevenLabsResults = await db2.select({
      call: calls,
      campaign: campaigns,
      contact: contacts,
      incomingConnection: incomingConnections,
      widget: websiteWidgets
    }).from(calls).leftJoin(campaigns, eq7(calls.campaignId, campaigns.id)).leftJoin(contacts, eq7(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq7(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq7(calls.widgetId, websiteWidgets.id)).where(eq7(calls.id, id));
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
    const twilioOpenAIResults = await db2.select({
      call: twilioOpenaiCalls,
      campaign: campaigns,
      contact: contacts,
      agent: agents
    }).from(twilioOpenaiCalls).leftJoin(campaigns, eq7(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq7(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq7(twilioOpenaiCalls.agentId, agents.id)).where(eq7(twilioOpenaiCalls.id, id));
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
    const plivoResults = await db2.select({
      call: plivoCalls,
      campaign: campaigns,
      contact: contacts,
      agent: agents
    }).from(plivoCalls).leftJoin(campaigns, eq7(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq7(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq7(plivoCalls.agentId, agents.id)).where(eq7(plivoCalls.id, id));
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
    return void 0;
  }
  async getCampaignCalls(campaignId) {
    return db2.select().from(calls).where(eq7(calls.campaignId, campaignId));
  }
  async getUserCalls(userId) {
    const results = await db2.select({ calls }).from(calls).leftJoin(campaigns, eq7(calls.campaignId, campaigns.id)).leftJoin(incomingConnections, eq7(calls.incomingConnectionId, incomingConnections.id)).where(
      or4(
        eq7(calls.userId, userId),
        and6(isNotNull3(calls.campaignId), eq7(campaigns.userId, userId)),
        and6(isNotNull3(calls.incomingConnectionId), eq7(incomingConnections.userId, userId))
      )
    );
    return results.map((r) => r.calls);
  }
  async getUserCallsWithDetails(userId) {
    const elevenLabsResults = await db2.select({
      call: calls,
      campaign: campaigns,
      contact: contacts,
      incomingConnection: incomingConnections,
      widget: websiteWidgets
    }).from(calls).leftJoin(campaigns, eq7(calls.campaignId, campaigns.id)).leftJoin(contacts, eq7(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq7(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq7(calls.widgetId, websiteWidgets.id)).where(
      or4(
        // Primary filter: Direct user ownership (guaranteed isolation)
        eq7(calls.userId, userId),
        // Fallback for legacy calls: Check via campaign ownership
        and6(isNotNull3(calls.campaignId), eq7(campaigns.userId, userId)),
        // Fallback for legacy calls: Check via incoming connection ownership
        and6(isNotNull3(calls.incomingConnectionId), eq7(incomingConnections.userId, userId))
      )
    ).orderBy(sql7`${calls.createdAt} DESC`);
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
    const twilioOpenAIResults = await db2.select({
      call: twilioOpenaiCalls,
      campaign: campaigns,
      contact: contacts,
      agent: agents
    }).from(twilioOpenaiCalls).leftJoin(campaigns, eq7(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq7(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq7(twilioOpenaiCalls.agentId, agents.id)).where(eq7(twilioOpenaiCalls.userId, userId)).orderBy(sql7`${twilioOpenaiCalls.createdAt} DESC`);
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
    const plivoResults = await db2.select({
      call: plivoCalls,
      campaign: campaigns,
      contact: contacts,
      agent: agents
    }).from(plivoCalls).leftJoin(campaigns, eq7(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq7(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq7(plivoCalls.agentId, agents.id)).where(eq7(plivoCalls.userId, userId)).orderBy(sql7`${plivoCalls.createdAt} DESC`);
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
    const sipCallResults = await db2.select({
      call: sipCalls,
      agent: agents,
      contact: contacts
    }).from(sipCalls).leftJoin(agents, eq7(sipCalls.agentId, agents.id)).leftJoin(contacts, eq7(sipCalls.contactId, contacts.id)).where(eq7(sipCalls.userId, userId)).orderBy(sql7`${sipCalls.createdAt} DESC`);
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
      startedAt: r.call.startedAt,
      answeredAt: r.call.answeredAt,
      endedAt: r.call.endedAt,
      createdAt: r.call.createdAt,
      metadata: r.call.metadata,
      engine: r.call.engine,
      sipTrunkId: r.call.sipTrunkId,
      sipPhoneNumberId: r.call.sipPhoneNumberId,
      elevenlabsConversationId: r.call.elevenlabsConversationId,
      creditsUsed: r.call.creditsUsed,
      campaign: null,
      contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
      incomingConnection: null,
      agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
    }));
    const allCalls = [...elevenLabsCalls, ...twilioOpenAICalls, ...plivoOpenAICalls, ...sipCallsFormatted];
    allCalls.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return allCalls;
  }
  async createCall(insertCall) {
    const [call] = await db2.insert(calls).values(insertCall).returning();
    return call;
  }
  async updateCall(id, call) {
    await db2.update(calls).set(call).where(eq7(calls.id, id));
  }
  // Credit Transactions
  async getCreditTransaction(id) {
    const [transaction] = await db2.select().from(creditTransactions).where(eq7(creditTransactions.id, id));
    return transaction;
  }
  async getUserCreditTransactions(userId) {
    return db2.select().from(creditTransactions).where(eq7(creditTransactions.userId, userId));
  }
  async createCreditTransaction(insertTransaction) {
    const [transaction] = await db2.insert(creditTransactions).values(insertTransaction).returning();
    return transaction;
  }
  // Atomic credit purchase: creates transaction + adds credits in single DB transaction
  async addCreditsAtomic(userId, credits, description, stripePaymentId) {
    await db2.transaction(async (tx) => {
      await tx.insert(creditTransactions).values({
        userId,
        type: "credit",
        amount: credits,
        description,
        stripePaymentId
      });
      await tx.execute(sql7`
        UPDATE users 
        SET credits = COALESCE(credits, 0) + ${credits}
        WHERE id = ${userId}
      `);
    });
  }
  // Tools
  async getTool(id) {
    const [tool] = await db2.select().from(tools).where(eq7(tools.id, id));
    return tool;
  }
  async getUserTools(userId) {
    return db2.select().from(tools).where(eq7(tools.userId, userId));
  }
  async createTool(insertTool) {
    const [tool] = await db2.insert(tools).values(insertTool).returning();
    return tool;
  }
  async updateTool(id, tool) {
    await db2.update(tools).set(tool).where(eq7(tools.id, id));
  }
  async deleteTool(id) {
    await db2.delete(tools).where(eq7(tools.id, id));
  }
  // Phone Number Rentals
  async createPhoneNumberRental(insertRental) {
    const [rental] = await db2.insert(phoneNumberRentals).values(insertRental).returning();
    return rental;
  }
  async getPhoneNumberRentals(phoneNumberId) {
    return db2.select().from(phoneNumberRentals).where(eq7(phoneNumberRentals.phoneNumberId, phoneNumberId)).orderBy(desc5(phoneNumberRentals.createdAt));
  }
  // Voices
  async getVoice(id) {
    const [voice] = await db2.select().from(voices).where(eq7(voices.id, id));
    return voice;
  }
  async getUserVoices(userId) {
    return db2.select().from(voices).where(eq7(voices.userId, userId));
  }
  async createVoice(insertVoice) {
    const [voice] = await db2.insert(voices).values(insertVoice).returning();
    return voice;
  }
  async deleteVoice(id) {
    await db2.delete(voices).where(eq7(voices.id, id));
  }
  // Plans
  async getPlan(id) {
    const [plan] = await db2.select().from(plans).where(eq7(plans.id, id));
    return plan;
  }
  async getPlanByName(name) {
    const [plan] = await db2.select().from(plans).where(eq7(plans.name, name));
    return plan;
  }
  async getAllPlans() {
    return db2.select().from(plans).where(eq7(plans.isActive, true));
  }
  async createPlan(insertPlan) {
    const [plan] = await db2.insert(plans).values(insertPlan).returning();
    return plan;
  }
  async updatePlan(id, plan) {
    const result = await db2.update(plans).set(plan).where(eq7(plans.id, id)).returning({ id: plans.id });
    if (result.length === 0) {
      throw new Error(`Failed to update plan: Plan with id '${id}' not found`);
    }
  }
  async deletePlan(id) {
    await db2.delete(plans).where(eq7(plans.id, id));
  }
  // Global Settings
  async getGlobalSetting(key) {
    const [setting] = await db2.select().from(globalSettings).where(eq7(globalSettings.key, key));
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
      await db2.execute(sql7`
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
    const [pack] = await db2.select().from(creditPackages).where(eq7(creditPackages.id, id));
    return pack;
  }
  async getAllCreditPackages() {
    return db2.select().from(creditPackages).where(eq7(creditPackages.isActive, true));
  }
  async createCreditPackage(insertPack) {
    const [pack] = await db2.insert(creditPackages).values(insertPack).returning();
    return pack;
  }
  async updateCreditPackage(id, pack) {
    const result = await db2.update(creditPackages).set(pack).where(eq7(creditPackages.id, id)).returning({ id: creditPackages.id });
    if (result.length === 0) {
      throw new Error(`Failed to update credit package: Package with id '${id}' not found`);
    }
  }
  // Admin Functions
  async getAllUsers() {
    return db2.select().from(users).orderBy(desc5(users.createdAt));
  }
  async getAllAdminUsers() {
    return db2.select().from(users).where(
      sql7`${users.role} = 'admin'`
    ).orderBy(desc5(users.createdAt));
  }
  async updateUser(id, user) {
    const result = await db2.update(users).set(user).where(eq7(users.id, id)).returning({ id: users.id });
    if (result.length === 0) {
      throw new Error(`Failed to update user: User with id '${id}' not found`);
    }
  }
  async getSystemPhoneNumbers() {
    const results = await db2.select({
      phone: phoneNumbers,
      user: users
    }).from(phoneNumbers).leftJoin(users, eq7(phoneNumbers.userId, users.id));
    return results.map((r) => ({
      ...r.phone,
      userEmail: r.user?.email
    }));
  }
  async getGlobalAnalytics(timeRange) {
    return calculateGlobalAnalytics2(timeRange);
  }
  // User Subscriptions
  async getUserSubscription(userId) {
    const result = await db2.select({
      subscription: userSubscriptions,
      plan: plans
    }).from(userSubscriptions).leftJoin(plans, eq7(userSubscriptions.planId, plans.id)).where(eq7(userSubscriptions.userId, userId)).orderBy(desc5(userSubscriptions.createdAt)).limit(1);
    if (result.length > 0 && result[0].subscription && result[0].plan) {
      return {
        ...result[0].subscription,
        plan: result[0].plan
      };
    }
    const [freePlan] = await db2.select().from(plans).where(eq7(plans.name, "free")).limit(1);
    if (!freePlan) {
      return null;
    }
    return null;
  }
  async getAllUserSubscriptions() {
    return await db2.select().from(userSubscriptions);
  }
  async getUserSubscriptionByPaystackCode(subscriptionCode) {
    const [subscription] = await db2.select().from(userSubscriptions).where(eq7(userSubscriptions.paystackSubscriptionCode, subscriptionCode)).limit(1);
    return subscription;
  }
  async createUserSubscription(insertSubscription) {
    const [subscription] = await db2.insert(userSubscriptions).values(insertSubscription).returning();
    return subscription;
  }
  async updateUserSubscription(id, subscription) {
    await db2.update(userSubscriptions).set(subscription).where(eq7(userSubscriptions.id, id));
  }
  async updateUserSubscriptionByUserId(userId, subscription) {
    await db2.update(userSubscriptions).set({ ...subscription, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(userSubscriptions.userId, userId));
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
      const [freePlan] = await db2.select().from(plans).where(eq7(plans.name, "free")).limit(1);
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
    const [phoneNumber] = await db2.select().from(phoneNumbers).where(eq7(phoneNumbers.id, id));
    return phoneNumber;
  }
  async getUserPhoneNumbers(userId) {
    return db2.select().from(phoneNumbers).where(eq7(phoneNumbers.userId, userId));
  }
  async getAllPhoneNumbers() {
    return db2.select().from(phoneNumbers);
  }
  async createPhoneNumber(insertPhoneNumber) {
    const [phoneNumber] = await db2.insert(phoneNumbers).values(insertPhoneNumber).returning();
    return phoneNumber;
  }
  async updatePhoneNumber(id, phoneNumber) {
    await db2.update(phoneNumbers).set(phoneNumber).where(eq7(phoneNumbers.id, id));
  }
  async deletePhoneNumber(id) {
    await db2.delete(phoneNumbers).where(eq7(phoneNumbers.id, id));
  }
  // Usage Records
  async createUsageRecord(insertRecord) {
    const [record] = await db2.insert(usageRecords).values(insertRecord).returning();
    return record;
  }
  async getUserUsageRecords(userId) {
    return db2.select().from(usageRecords).where(eq7(usageRecords.userId, userId));
  }
  // Analytics methods - delegate to extracted helper functions
  async getUserAnalytics(userId, timeRange = "7days", callType = "all") {
    return calculateUserAnalytics2(userId, timeRange, callType);
  }
  async getDashboardData(userId) {
    return calculateDashboardData2(userId);
  }
  // Webhooks (Subscriptions)
  async getWebhook(id) {
    const [webhook] = await db2.select().from(webhookSubscriptions).where(eq7(webhookSubscriptions.id, id));
    return webhook;
  }
  async getUserWebhooks(userId) {
    return await db2.select().from(webhookSubscriptions).where(eq7(webhookSubscriptions.userId, userId)).orderBy(desc5(webhookSubscriptions.createdAt));
  }
  async getUserWebhookCount(userId) {
    const result = await db2.select({ count: sql7`count(*)` }).from(webhookSubscriptions).where(eq7(webhookSubscriptions.userId, userId));
    return Number(result[0]?.count || 0);
  }
  async getWebhooksForEvent(userId, event, campaignId) {
    const allUserWebhooks = await db2.select().from(webhookSubscriptions).where(and6(
      eq7(webhookSubscriptions.userId, userId),
      eq7(webhookSubscriptions.isActive, true)
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
    const [newWebhook] = await db2.insert(webhookSubscriptions).values({
      ...webhook,
      id: nanoid3()
    }).returning();
    return newWebhook;
  }
  async updateWebhook(id, webhook) {
    const updateData = { ...webhook, updatedAt: /* @__PURE__ */ new Date() };
    await db2.update(webhookSubscriptions).set(updateData).where(eq7(webhookSubscriptions.id, id));
  }
  async deleteWebhook(id) {
    await db2.delete(webhookSubscriptions).where(eq7(webhookSubscriptions.id, id));
  }
  // Webhook Delivery Logs
  async getWebhookLog(id) {
    const [log] = await db2.select().from(webhookDeliveryLogs).where(eq7(webhookDeliveryLogs.id, id));
    return log;
  }
  async getWebhookLogs(webhookId, limit = 50) {
    return await db2.select().from(webhookDeliveryLogs).where(eq7(webhookDeliveryLogs.webhookId, webhookId)).orderBy(desc5(webhookDeliveryLogs.createdAt)).limit(limit);
  }
  async createWebhookLog(log) {
    const [newLog] = await db2.insert(webhookDeliveryLogs).values(log).returning();
    return newLog;
  }
  async updateWebhookLog(id, log) {
    await db2.update(webhookDeliveryLogs).set(log).where(eq7(webhookDeliveryLogs.id, id));
  }
  async getFailedWebhookLogs(limit = 100) {
    return await db2.select().from(webhookDeliveryLogs).where(and6(
      eq7(webhookDeliveryLogs.success, false),
      isNotNull3(webhookDeliveryLogs.nextRetryAt)
    )).orderBy(asc2(webhookDeliveryLogs.nextRetryAt)).limit(limit);
  }
  // Notifications
  async getNotification(id) {
    const [notification] = await db2.select().from(notifications).where(eq7(notifications.id, id));
    return notification;
  }
  async getUserNotifications(userId, limit = 50) {
    return await db2.select().from(notifications).where(eq7(notifications.userId, userId)).orderBy(desc5(notifications.createdAt)).limit(limit);
  }
  async getUnreadNotificationCount(userId) {
    const result = await db2.select({ count: sql7`count(*)` }).from(notifications).where(and6(eq7(notifications.userId, userId), eq7(notifications.isRead, false)));
    return Number(result[0]?.count || 0);
  }
  async createNotification(notification) {
    const [newNotification] = await db2.insert(notifications).values(notification).returning();
    return newNotification;
  }
  async markNotificationAsRead(id) {
    await db2.update(notifications).set({ isRead: true }).where(eq7(notifications.id, id));
  }
  async markAllNotificationsAsRead(userId) {
    await db2.update(notifications).set({ isRead: true }).where(eq7(notifications.userId, userId));
  }
  async getBannerNotifications(userId) {
    return await db2.select().from(notifications).where(and6(
      eq7(notifications.userId, userId),
      or4(
        eq7(notifications.displayType, "banner"),
        eq7(notifications.displayType, "both")
      ),
      eq7(notifications.isDismissed, false),
      or4(
        isNull4(notifications.expiresAt),
        gte5(notifications.expiresAt, /* @__PURE__ */ new Date())
      )
    )).orderBy(desc5(notifications.priority), desc5(notifications.createdAt));
  }
  async dismissNotification(id, userId) {
    if (userId) {
      await db2.update(notifications).set({ isDismissed: true }).where(and6(eq7(notifications.id, id), eq7(notifications.userId, userId)));
    } else {
      await db2.update(notifications).set({ isDismissed: true }).where(eq7(notifications.id, id));
    }
  }
  async deleteNotification(id) {
    await db2.delete(notifications).where(eq7(notifications.id, id));
  }
  // Email Templates
  async getEmailTemplates() {
    return await db2.select().from(emailTemplates).orderBy(emailTemplates.templateType);
  }
  async getEmailTemplate(templateType) {
    const [template] = await db2.select().from(emailTemplates).where(eq7(emailTemplates.templateType, templateType));
    return template;
  }
  async updateEmailTemplate(id, data) {
    await db2.update(emailTemplates).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(emailTemplates.id, id));
  }
  async createEmailTemplate(data) {
    const [template] = await db2.insert(emailTemplates).values(data).returning();
    return template;
  }
  // Prompt Templates
  async getPromptTemplate(id) {
    const [template] = await db2.select().from(promptTemplates).where(eq7(promptTemplates.id, id));
    return template;
  }
  async getUserPromptTemplates(userId) {
    return await db2.select().from(promptTemplates).where(eq7(promptTemplates.userId, userId)).orderBy(desc5(promptTemplates.createdAt));
  }
  async getSystemPromptTemplates() {
    return await db2.select().from(promptTemplates).where(eq7(promptTemplates.isSystemTemplate, true)).orderBy(asc2(promptTemplates.category), asc2(promptTemplates.name));
  }
  async getPublicPromptTemplates() {
    return await db2.select().from(promptTemplates).where(eq7(promptTemplates.isPublic, true)).orderBy(desc5(promptTemplates.usageCount), asc2(promptTemplates.name));
  }
  async createPromptTemplate(template) {
    const [newTemplate] = await db2.insert(promptTemplates).values(template).returning();
    return newTemplate;
  }
  async updatePromptTemplate(id, template) {
    await db2.update(promptTemplates).set({ ...template, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(promptTemplates.id, id));
  }
  async deletePromptTemplate(id) {
    await db2.delete(promptTemplates).where(eq7(promptTemplates.id, id));
  }
  async incrementPromptTemplateUsage(id) {
    await db2.update(promptTemplates).set({
      usageCount: sql7`${promptTemplates.usageCount} + 1`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq7(promptTemplates.id, id));
  }
  // Agent Versions
  async getAgentVersion(id) {
    const [version] = await db2.select().from(agentVersions).where(eq7(agentVersions.id, id));
    return version;
  }
  async getAgentVersions(agentId) {
    return await db2.select().from(agentVersions).where(eq7(agentVersions.agentId, agentId)).orderBy(desc5(agentVersions.versionNumber));
  }
  async getAgentVersionByNumber(agentId, versionNumber) {
    const [version] = await db2.select().from(agentVersions).where(and6(
      eq7(agentVersions.agentId, agentId),
      eq7(agentVersions.versionNumber, versionNumber)
    ));
    return version;
  }
  async getLatestAgentVersion(agentId) {
    const [version] = await db2.select().from(agentVersions).where(eq7(agentVersions.agentId, agentId)).orderBy(desc5(agentVersions.versionNumber)).limit(1);
    return version;
  }
  async createAgentVersion(version) {
    const [newVersion] = await db2.insert(agentVersions).values(version).returning();
    return newVersion;
  }
  // SEO Settings
  async getSeoSettings() {
    const [settings] = await db2.select().from(seoSettings).limit(1);
    return settings;
  }
  async updateSeoSettings(settings) {
    const existing = await this.getSeoSettings();
    if (existing) {
      const updateData = { ...settings, updatedAt: /* @__PURE__ */ new Date() };
      const [updated] = await db2.update(seoSettings).set(updateData).where(eq7(seoSettings.id, existing.id)).returning();
      return updated;
    } else {
      const [created] = await db2.insert(seoSettings).values(settings).returning();
      return created;
    }
  }
  // Analytics Scripts
  async getAnalyticsScript(id) {
    const [script] = await db2.select().from(analyticsScripts).where(eq7(analyticsScripts.id, id));
    return script;
  }
  async getAllAnalyticsScripts() {
    return db2.select().from(analyticsScripts).orderBy(desc5(analyticsScripts.loadPriority), asc2(analyticsScripts.createdAt));
  }
  async getEnabledAnalyticsScripts() {
    return db2.select().from(analyticsScripts).where(eq7(analyticsScripts.enabled, true)).orderBy(desc5(analyticsScripts.loadPriority), asc2(analyticsScripts.createdAt));
  }
  async createAnalyticsScript(script) {
    const [created] = await db2.insert(analyticsScripts).values(script).returning();
    return created;
  }
  async updateAnalyticsScript(id, script) {
    const updateData = { ...script, updatedAt: /* @__PURE__ */ new Date() };
    await db2.update(analyticsScripts).set(updateData).where(eq7(analyticsScripts.id, id));
  }
  async deleteAnalyticsScript(id) {
    await db2.delete(analyticsScripts).where(eq7(analyticsScripts.id, id));
  }
  // Payment Transactions
  async getPaymentTransaction(id) {
    const [transaction] = await db2.select().from(paymentTransactions).where(eq7(paymentTransactions.id, id));
    return transaction;
  }
  async getPaymentTransactionByGatewayId(gateway, gatewayTransactionId) {
    const [transaction] = await db2.select().from(paymentTransactions).where(and6(
      eq7(paymentTransactions.gateway, gateway),
      eq7(paymentTransactions.gatewayTransactionId, gatewayTransactionId)
    ));
    return transaction;
  }
  async getUserPaymentTransactions(userId) {
    return db2.select().from(paymentTransactions).where(eq7(paymentTransactions.userId, userId)).orderBy(desc5(paymentTransactions.createdAt));
  }
  async getAllPaymentTransactions(filters) {
    const conditions = [];
    if (filters?.gateway) {
      conditions.push(eq7(paymentTransactions.gateway, filters.gateway));
    }
    if (filters?.type) {
      conditions.push(eq7(paymentTransactions.type, filters.type));
    }
    if (filters?.status) {
      conditions.push(eq7(paymentTransactions.status, filters.status));
    }
    if (filters?.startDate) {
      conditions.push(gte5(paymentTransactions.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte3(paymentTransactions.createdAt, filters.endDate));
    }
    if (conditions.length > 0) {
      return db2.select().from(paymentTransactions).where(and6(...conditions)).orderBy(desc5(paymentTransactions.createdAt));
    }
    return db2.select().from(paymentTransactions).orderBy(desc5(paymentTransactions.createdAt));
  }
  async createPaymentTransaction(transaction) {
    const [created] = await db2.insert(paymentTransactions).values(transaction).returning();
    return created;
  }
  async updatePaymentTransaction(id, transaction) {
    await db2.update(paymentTransactions).set({ ...transaction, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(paymentTransactions.id, id));
  }
  async getPaymentAnalytics(startDate, endDate) {
    const revenueStatuses = ["completed", "refunded", "partially_refunded"];
    const conditions = [];
    if (startDate) conditions.push(gte5(paymentTransactions.createdAt, startDate));
    if (endDate) conditions.push(lte3(paymentTransactions.createdAt, endDate));
    const transactions = await db2.select().from(paymentTransactions).where(
      conditions.length > 0 ? and6(
        inArray4(paymentTransactions.status, revenueStatuses),
        ...conditions
      ) : inArray4(paymentTransactions.status, revenueStatuses)
    );
    const dateConditions = [];
    if (startDate) dateConditions.push(gte5(paymentTransactions.createdAt, startDate));
    if (endDate) dateConditions.push(lte3(paymentTransactions.createdAt, endDate));
    const allTransactions = await db2.select().from(paymentTransactions).where(dateConditions.length > 0 ? and6(...dateConditions) : void 0);
    const refundConditions = [];
    if (startDate) refundConditions.push(gte5(refunds.createdAt, startDate));
    if (endDate) refundConditions.push(lte3(refunds.createdAt, endDate));
    const allRefunds = await db2.select().from(refunds).where(refundConditions.length > 0 ? and6(...refundConditions) : void 0);
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
    const [refund] = await db2.select().from(refunds).where(eq7(refunds.id, id));
    return refund;
  }
  async getTransactionRefunds(transactionId) {
    return db2.select().from(refunds).where(eq7(refunds.transactionId, transactionId)).orderBy(desc5(refunds.createdAt));
  }
  async getUserRefunds(userId) {
    return db2.select().from(refunds).where(eq7(refunds.userId, userId)).orderBy(desc5(refunds.createdAt));
  }
  async getAllRefunds() {
    return db2.select().from(refunds).orderBy(desc5(refunds.createdAt));
  }
  async createRefund(refund) {
    const [created] = await db2.insert(refunds).values(refund).returning();
    return created;
  }
  async updateRefund(id, refund) {
    await db2.update(refunds).set({ ...refund, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(refunds.id, id));
  }
  // Invoices
  async getInvoice(id) {
    const [invoice] = await db2.select().from(invoices).where(eq7(invoices.id, id));
    return invoice;
  }
  async getInvoiceByNumber(invoiceNumber) {
    const [invoice] = await db2.select().from(invoices).where(eq7(invoices.invoiceNumber, invoiceNumber));
    return invoice;
  }
  async getTransactionInvoice(transactionId) {
    const [invoice] = await db2.select().from(invoices).where(eq7(invoices.transactionId, transactionId));
    return invoice;
  }
  async getUserInvoices(userId) {
    return db2.select().from(invoices).where(eq7(invoices.userId, userId)).orderBy(desc5(invoices.createdAt));
  }
  async getAllInvoices() {
    return db2.select().from(invoices).orderBy(desc5(invoices.createdAt));
  }
  async createInvoice(invoice) {
    const [created] = await db2.insert(invoices).values(invoice).returning();
    return created;
  }
  async updateInvoice(id, invoice) {
    await db2.update(invoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(invoices.id, id));
  }
  async getNextInvoiceNumber() {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const [prefixSetting] = await db2.select().from(globalSettings).where(eq7(globalSettings.key, "invoice_prefix"));
    let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "INV";
    const prefix = rawPrefix.replace(/[^A-Za-z0-9_]/g, "").substring(0, 10) || "INV";
    const [startSetting] = await db2.select().from(globalSettings).where(eq7(globalSettings.key, "invoice_start_number"));
    const startNumber = startSetting?.value ? parseInt(String(startSetting.value).replace(/"/g, ""), 10) || 1 : 1;
    const likePattern = `${prefix}-${year}-%`;
    const result = await db2.execute(sql7`
      SELECT MAX(CAST(SPLIT_PART(${invoices.invoiceNumber}, '-', 3) AS INTEGER)) as max_num
      FROM ${invoices}
      WHERE ${invoices.invoiceNumber} LIKE ${likePattern}
    `);
    let nextNum = startNumber;
    const maxNum = result.rows?.[0]?.max_num;
    if (maxNum !== null && maxNum !== void 0 && !isNaN(Number(maxNum))) {
      nextNum = Math.max(Number(maxNum) + 1, startNumber);
    }
    return `${prefix}-${year}-${String(nextNum).padStart(5, "0")}`;
  }
  async getNextRefundNoteNumber() {
    const [prefixSetting] = await db2.select().from(globalSettings).where(eq7(globalSettings.key, "refund_note_prefix"));
    let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "RF";
    const prefix = rawPrefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "RF";
    const result = await db2.execute(sql7`
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
    const [item] = await db2.select().from(paymentWebhookQueue).where(eq7(paymentWebhookQueue.id, id));
    return item;
  }
  async getPendingWebhooks() {
    return db2.select().from(paymentWebhookQueue).where(eq7(paymentWebhookQueue.status, "pending")).orderBy(asc2(paymentWebhookQueue.receivedAt));
  }
  async getWebhookByEventId(gateway, eventId) {
    const [item] = await db2.select().from(paymentWebhookQueue).where(and6(
      eq7(paymentWebhookQueue.gateway, gateway),
      eq7(paymentWebhookQueue.eventId, eventId)
    ));
    return item;
  }
  async createWebhookQueueItem(item) {
    const [created] = await db2.insert(paymentWebhookQueue).values(item).returning();
    return created;
  }
  async updateWebhookQueueItem(id, item) {
    await db2.update(paymentWebhookQueue).set(item).where(eq7(paymentWebhookQueue.id, id));
  }
  async getExpiredWebhooks() {
    const now = /* @__PURE__ */ new Date();
    return db2.select().from(paymentWebhookQueue).where(and6(
      eq7(paymentWebhookQueue.status, "pending"),
      lte3(paymentWebhookQueue.expiresAt, now)
    ));
  }
  async getRetryableWebhooks() {
    const now = /* @__PURE__ */ new Date();
    return db2.select().from(paymentWebhookQueue).where(and6(
      or4(
        eq7(paymentWebhookQueue.status, "pending"),
        eq7(paymentWebhookQueue.status, "failed")
      ),
      sql7`${paymentWebhookQueue.attemptCount} < ${paymentWebhookQueue.maxAttempts}`,
      or4(
        isNull4(paymentWebhookQueue.nextRetryAt),
        lte3(paymentWebhookQueue.nextRetryAt, now)
      ),
      gte5(paymentWebhookQueue.expiresAt, now)
    )).orderBy(asc2(paymentWebhookQueue.receivedAt));
  }
  // Email Notification Settings
  async getEmailNotificationSetting(eventType) {
    const [setting] = await db2.select().from(emailNotificationSettings).where(eq7(emailNotificationSettings.eventType, eventType));
    return setting;
  }
  async getAllEmailNotificationSettings() {
    return db2.select().from(emailNotificationSettings).orderBy(asc2(emailNotificationSettings.category), asc2(emailNotificationSettings.eventType));
  }
  async getEmailNotificationSettingsByCategory(category) {
    return db2.select().from(emailNotificationSettings).where(eq7(emailNotificationSettings.category, category)).orderBy(asc2(emailNotificationSettings.eventType));
  }
  async createEmailNotificationSetting(setting) {
    const [created] = await db2.insert(emailNotificationSettings).values(setting).returning();
    return created;
  }
  async updateEmailNotificationSetting(eventType, setting) {
    await db2.update(emailNotificationSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(emailNotificationSettings.eventType, eventType));
  }
  // Admin Call Monitoring
  async getAdminCalls(options) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const offset = (page - 1) * pageSize;
    const conditions = [];
    if (options.userId) {
      conditions.push(eq7(calls.userId, options.userId));
    }
    if (options.status) {
      conditions.push(eq7(calls.status, options.status));
    }
    if (options.startDate) {
      conditions.push(gte5(calls.createdAt, options.startDate));
    }
    if (options.endDate) {
      conditions.push(lte3(calls.createdAt, options.endDate));
    }
    if (options.search) {
      conditions.push(
        or4(
          sql7`${calls.phoneNumber} ILIKE ${`%${options.search}%`}`,
          sql7`${calls.transcript} ILIKE ${`%${options.search}%`}`
        )
      );
    }
    const whereClause = conditions.length > 0 ? and6(...conditions) : void 0;
    const violationCountSubquery = db2.select({
      callId: contentViolations.callId,
      count: sql7`count(*)`.as("violation_count"),
      summary: sql7`string_agg(${contentViolations.detectedWord}, ', ' ORDER BY ${contentViolations.createdAt} DESC)`.as("violation_summary")
    }).from(contentViolations).groupBy(contentViolations.callId).as("violation_counts");
    let query = db2.select({
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
      violationCount: sql7`COALESCE(${violationCountSubquery.count}, 0)`,
      violationSummary: sql7`${violationCountSubquery.summary}`
    }).from(calls).leftJoin(users, eq7(calls.userId, users.id)).leftJoin(campaigns, eq7(calls.campaignId, campaigns.id)).leftJoin(violationCountSubquery, eq7(calls.id, violationCountSubquery.callId));
    if (whereClause) {
      query = query.where(whereClause);
    }
    if (options.hasViolations === true) {
      query = query.where(sql7`COALESCE(${violationCountSubquery.count}, 0) > 0`);
    } else if (options.hasViolations === false) {
      query = query.where(sql7`COALESCE(${violationCountSubquery.count}, 0) = 0`);
    }
    const results = await query.orderBy(desc5(calls.createdAt)).limit(pageSize).offset(offset);
    const countResult = await db2.select({ count: sql7`count(*)` }).from(calls).where(whereClause);
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
    const [result] = await db2.select({
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
    }).from(calls).leftJoin(users, eq7(calls.userId, users.id)).leftJoin(campaigns, eq7(calls.campaignId, campaigns.id)).leftJoin(contacts, eq7(calls.contactId, contacts.id)).where(eq7(calls.id, id));
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
    return db2.select().from(contentViolations).where(eq7(contentViolations.callId, callId)).orderBy(desc5(contentViolations.createdAt));
  }
  async getContentViolations(options) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const offset = (page - 1) * pageSize;
    const conditions = [];
    if (options.userId) {
      conditions.push(eq7(contentViolations.userId, options.userId));
    }
    if (options.status) {
      conditions.push(eq7(contentViolations.status, options.status));
    }
    if (options.severity) {
      conditions.push(eq7(contentViolations.severity, options.severity));
    }
    if (options.startDate) {
      conditions.push(gte5(contentViolations.createdAt, options.startDate));
    }
    if (options.endDate) {
      conditions.push(lte3(contentViolations.createdAt, options.endDate));
    }
    const whereClause = conditions.length > 0 ? and6(...conditions) : void 0;
    let query = db2.select({
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
    }).from(contentViolations).leftJoin(users, eq7(contentViolations.userId, users.id)).leftJoin(calls, eq7(contentViolations.callId, calls.id));
    if (whereClause) {
      query = query.where(whereClause);
    }
    const results = await query.orderBy(desc5(contentViolations.createdAt)).limit(pageSize).offset(offset);
    const countResult = await db2.select({ count: sql7`count(*)` }).from(contentViolations).where(whereClause);
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
    const [updated] = await db2.update(contentViolations).set(data).where(eq7(contentViolations.id, id)).returning();
    return updated;
  }
  async createContentViolation(data) {
    const [violation] = await db2.insert(contentViolations).values(data).returning();
    return violation;
  }
  // Banned Words
  async getBannedWords() {
    return db2.select().from(bannedWords).orderBy(asc2(bannedWords.word));
  }
  async getActiveBannedWords() {
    return db2.select().from(bannedWords).where(eq7(bannedWords.isActive, true)).orderBy(asc2(bannedWords.word));
  }
  async createBannedWord(data) {
    const [word] = await db2.insert(bannedWords).values(data).returning();
    return word;
  }
  async updateBannedWord(id, data) {
    const [updated] = await db2.update(bannedWords).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq7(bannedWords.id, id)).returning();
    return updated;
  }
  async deleteBannedWord(id) {
    const result = await db2.delete(bannedWords).where(eq7(bannedWords.id, id)).returning();
    return result.length > 0;
  }
  async getCallsWithTranscripts() {
    return db2.select().from(calls).where(and6(
      isNotNull3(calls.transcript),
      sql7`${calls.transcript} != ''`
    ));
  }
  // Demo Sessions - Browser-based demo calls
  async createDemoSession(data) {
    const [session] = await db2.insert(demoSessions).values(data).returning();
    return session;
  }
  async getDemoSession(id) {
    const [session] = await db2.select().from(demoSessions).where(eq7(demoSessions.id, id));
    return session;
  }
  async getDemoSessionByToken(token) {
    const [session] = await db2.select().from(demoSessions).where(eq7(demoSessions.sessionToken, token));
    return session;
  }
  async updateDemoSession(id, data) {
    await db2.update(demoSessions).set(data).where(eq7(demoSessions.id, id));
  }
  async getActiveDemoSessionCount() {
    const result = await db2.select({ count: sql7`count(*)` }).from(demoSessions).where(eq7(demoSessions.status, "active"));
    return Number(result[0]?.count || 0);
  }
  async getRecentDemoSessionByIp(ip, cooldownMinutes) {
    const cooldownTime = new Date(Date.now() - cooldownMinutes * 60 * 1e3);
    const [session] = await db2.select().from(demoSessions).where(and6(
      eq7(demoSessions.visitorIp, ip),
      gte5(demoSessions.createdAt, cooldownTime)
    )).orderBy(desc5(demoSessions.createdAt)).limit(1);
    return session;
  }
  async getDemoSessionStats(days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
    const sessions = await db2.select().from(demoSessions).where(gte5(demoSessions.createdAt, startDate));
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
var storage2 = new DbStorage2();

// server/utils/batch-utils.js
init_schema();
import { nanoid as nanoid4 } from "nanoid";
var BATCH_SIZE = 500;
var LOG_INTERVAL = 1e3;
function chunkArray(array, chunkSize = BATCH_SIZE) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
async function batchInsertContacts(contactInserts, logPrefix = "[Batch Insert]") {
  const result = {
    success: true,
    inserted: 0,
    failed: 0,
    results: [],
    errors: []
  };
  if (contactInserts.length === 0) {
    return result;
  }
  const chunks = chunkArray(contactInserts, BATCH_SIZE);
  const totalRecords = contactInserts.length;
  let processedCount = 0;
  console.log(`${logPrefix} Starting batch insert of ${totalRecords} contacts in ${chunks.length} chunks`);
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const inserted = await db2.insert(contacts).values(chunk).returning();
      result.results.push(...inserted);
      result.inserted += inserted.length;
      processedCount += chunk.length;
      if (processedCount % LOG_INTERVAL === 0 || i === chunks.length - 1) {
        console.log(`${logPrefix} Progress: ${processedCount}/${totalRecords} contacts (${Math.round(processedCount / totalRecords * 100)}%)`);
      }
    } catch (error) {
      result.failed += chunk.length;
      result.errors.push(`Chunk ${i + 1}: ${error.message}`);
      console.error(`${logPrefix} \u274C Chunk ${i + 1} failed: ${error.message}`);
      for (const contactInsert of chunk) {
        try {
          const [singleInsert] = await db2.insert(contacts).values(contactInsert).returning();
          result.results.push(singleInsert);
          result.inserted++;
          result.failed--;
        } catch (singleError) {
          console.warn(`${logPrefix} \u26A0\uFE0F Single insert failed for ${contactInsert.phone}: ${singleError.message}`);
        }
      }
    }
  }
  result.success = result.failed === 0;
  console.log(`${logPrefix} \u2705 Batch insert complete: ${result.inserted} success, ${result.failed} failed`);
  return result;
}

// server/services/contact-upload-service.js
var PlanLimitExceededError = class extends Error {
  upgradeRequired;
  currentContacts;
  maxContacts;
  allowedContacts;
  constructor(message, currentContacts, maxContacts, allowedContacts) {
    super(message);
    this.name = "PlanLimitExceededError";
    this.upgradeRequired = true;
    this.currentContacts = currentContacts;
    this.maxContacts = maxContacts;
    this.allowedContacts = allowedContacts;
  }
};
var STANDARD_FIELD_NAMES = [
  "firstName",
  "FirstName",
  "first_name",
  "lastName",
  "LastName",
  "last_name",
  "name",
  "Name",
  "contact_name",
  "contactName",
  "Contact_Name",
  "phone",
  "Phone",
  "phone_number",
  "email",
  "Email"
];
var ContactUploadService = class {
  /**
   * Parses contacts from CSV file content.
   * Supports multiple CSV formats:
   * - Standard format with firstName/lastName columns
   * - Legacy format with single "name" column (splits into first/last)
   * - ElevenLabs format with "phone_number" and "dynamic_data.*" columns
   * 
   * @param fileContent - The raw CSV file content as a string
   * @param campaignId - The campaign ID to associate contacts with
   * @returns Array of parsed contacts ready for validation and creation
   * 
   * @example
   * ```typescript
   * const contacts = service.parseContactsFromCSV(csvContent, "campaign-123");
   * ```
   */
  parseContactsFromCSV(fileContent, campaignId) {
    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });
    return parsed.data.map((row) => {
      return this.parseContactRow(row, campaignId);
    });
  }
  /**
   * Parses a single CSV row into a ParsedContact object.
   * Handles field mapping and custom field extraction.
   * 
   * @param row - The CSV row data as a key-value object
   * @param campaignId - The campaign ID to associate the contact with
   * @returns A parsed contact object
   */
  parseContactRow(row, campaignId) {
    let firstName = row.firstName || row.FirstName || row.first_name || "";
    let lastName = row.lastName || row.LastName || row.last_name || "";
    const phone = row.phone || row.Phone || row.phone_number || "";
    const email = row.email || row.Email || null;
    if (!firstName && (row.name || row.Name || row.contact_name || row.contactName || row.Contact_Name)) {
      const fullName = row.name || row.Name || row.contact_name || row.contactName || row.Contact_Name || "";
      const parts = fullName.trim().split(/\s+/);
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }
    const customFields = this.extractCustomFields(row);
    return {
      campaignId,
      firstName: firstName || "Unknown",
      lastName: lastName || "",
      phone,
      email,
      customFields: Object.keys(customFields).length > 0 ? customFields : null,
      status: "pending"
    };
  }
  /**
   * Extracts custom fields from a CSV row.
   * Handles two types of custom fields:
   * - ElevenLabs dynamic_data format (columns starting with "dynamic_data.")
   * - Flat custom fields (any column that's not a standard field)
   * 
   * @param row - The CSV row data as a key-value object
   * @returns Object containing all custom field key-value pairs
   */
  extractCustomFields(row) {
    const customFields = {};
    for (const key of Object.keys(row)) {
      if (key.startsWith("dynamic_data.")) {
        const fieldName = key.replace("dynamic_data.", "");
        if (row[key] && row[key].trim() !== "") {
          customFields[fieldName] = row[key];
        }
      } else if (!STANDARD_FIELD_NAMES.includes(key)) {
        if (row[key] && String(row[key]).trim() !== "") {
          customFields[key] = row[key];
        }
      }
    }
    return customFields;
  }
  /**
   * Validates that adding new contacts won't exceed the plan's contact limit.
   * Throws a PlanLimitExceededError if the limit would be exceeded.
   * 
   * @param contactsCount - Number of new contacts to add
   * @param existingCount - Current number of contacts in the campaign
   * @param planLimit - Maximum contacts allowed per campaign by the plan
   * @param planDisplayName - Display name of the plan for error messages
   * @throws {PlanLimitExceededError} When adding contacts would exceed the limit
   * 
   * @example
   * ```typescript
   * try {
   *   service.validateContactsAgainstPlanLimit(50, 100, 100, "Pro");
   * } catch (error) {
   *   if (error instanceof PlanLimitExceededError) {
   *     // Handle limit exceeded
   *   }
   * }
   * ```
   */
  validateContactsAgainstPlanLimit(contactsCount, existingCount, planLimit, planDisplayName) {
    const newTotalContacts = existingCount + contactsCount;
    if (newTotalContacts > planLimit) {
      const allowedContacts = planLimit - existingCount;
      throw new PlanLimitExceededError(
        `Contact limit exceeded. Your ${planDisplayName} allows maximum ${planLimit} contacts per campaign. You can only add ${allowedContacts} more contact(s).`,
        existingCount,
        planLimit,
        allowedContacts
      );
    }
  }
  /**
   * Creates contacts in the database for a campaign.
   * Also updates the campaign's total contact count.
   * 
   * @param campaignId - The campaign ID to create contacts for
   * @param contacts - Array of parsed contacts to create
   * @param currentTotalContacts - The campaign's current total contact count
   * @returns Promise resolving to the created contact records
   * 
   * @example
   * ```typescript
   * const createdContacts = await service.createContactsForCampaign(
   *   "campaign-123",
   *   parsedContacts,
   *   50
   * );
   * ```
   */
  async createContactsForCampaign(campaignId, contacts2, currentTotalContacts) {
    const insertContacts = contacts2.map((contact) => ({
      campaignId: contact.campaignId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      customFields: contact.customFields,
      status: contact.status
    }));
    const batchResult = await batchInsertContacts(insertContacts, "\u{1F4CB} [Contact Upload]");
    if (!batchResult.success) {
      console.warn(`[Contact Upload] \u26A0\uFE0F Some contacts failed to insert: ${batchResult.failed} failed`);
    }
    await storage2.updateCampaign(campaignId, {
      totalContacts: currentTotalContacts + batchResult.inserted
    });
    return batchResult.results;
  }
  /**
   * Reads file content from a multer file upload.
   * Handles both buffer-based and path-based uploads.
   * 
   * @param file - The multer file object from the request
   * @returns Promise resolving to the file content as a string
   * @throws {Error} When the file upload is invalid
   */
  async readFileContent(file) {
    if (file.buffer) {
      return file.buffer.toString("utf-8");
    } else if (file.path) {
      const fs = await import("fs");
      const content = fs.readFileSync(file.path, "utf-8");
      fs.unlinkSync(file.path);
      return content;
    } else {
      throw new Error("Invalid file upload");
    }
  }
};
var contactUploadService = new ContactUploadService();

// plugins/rest-api/routes/campaigns.routes.js
var csvUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  }
});
var router2 = Router2();
var createCampaignSchema = z3.object({
  name: z3.string().min(1, "Name is required").max(255),
  agentId: z3.string().uuid("Invalid agent ID"),
  phoneNumberId: z3.string().uuid().optional(),
  engine: z3.enum(["elevenlabs", "plivo", "twilio-openai"]).optional(),
  scheduledStartTime: z3.string().datetime().optional(),
  timezone: z3.string().optional(),
  callWindowStart: z3.string().regex(/^\d{2}:\d{2}$/).optional(),
  callWindowEnd: z3.string().regex(/^\d{2}:\d{2}$/).optional(),
  maxConcurrentCalls: z3.number().int().min(1).max(100).optional(),
  retryAttempts: z3.number().int().min(0).max(5).optional(),
  retryDelayMinutes: z3.number().int().min(1).max(1440).optional()
});
var addContactsSchema = z3.object({
  contacts: z3.array(z3.object({
    phoneNumber: z3.string().min(10),
    firstName: z3.string().optional(),
    lastName: z3.string().optional(),
    email: z3.string().email().optional(),
    customFields: z3.record(z3.string()).optional()
  })).min(1).max(1e4)
});
router2.post(
  "/",
  apiAuthMiddleware("campaigns:write"),
  csvUpload.single("contacts"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    let campaignData;
    if (req.body.data) {
      try {
        campaignData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body.data;
      } catch {
        const response2 = {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Invalid JSON in data field" },
          meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
        };
        return res.status(400).json(response2);
      }
    } else {
      campaignData = {
        name: req.body.name,
        agentId: req.body.agentId,
        phoneNumberId: req.body.phoneNumberId,
        engine: req.body.engine,
        scheduledStartTime: req.body.scheduledStartTime,
        timezone: req.body.timezone,
        callWindowStart: req.body.callWindowStart,
        callWindowEnd: req.body.callWindowEnd,
        maxConcurrentCalls: req.body.maxConcurrentCalls ? parseInt(req.body.maxConcurrentCalls) : void 0,
        retryAttempts: req.body.retryAttempts ? parseInt(req.body.retryAttempts) : void 0,
        retryDelayMinutes: req.body.retryDelayMinutes ? parseInt(req.body.retryDelayMinutes) : void 0
      };
    }
    const parseResult = createCampaignSchema.safeParse(campaignData);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const data = parseResult.data;
    const [agent] = await db2.select().from(agents).where(and7(eq8(agents.id, data.agentId), eq8(agents.userId, userId))).limit(1);
    if (!agent) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Agent not found or does not belong to you." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    let fromPhoneId = data.phoneNumberId;
    if (!fromPhoneId) {
      const [userPhone] = await db2.select().from(phoneNumbers).where(and7(eq8(phoneNumbers.userId, userId), eq8(phoneNumbers.status, "active"))).limit(1);
      if (userPhone) {
        fromPhoneId = userPhone.id;
      }
    }
    const [campaign] = await db2.insert(campaigns).values({
      userId,
      agentId: data.agentId,
      phoneNumberId: fromPhoneId,
      name: data.name,
      status: "draft",
      scheduledStartTime: data.scheduledStartTime ? new Date(data.scheduledStartTime) : void 0,
      timezone: data.timezone || "UTC",
      callWindowStart: data.callWindowStart || "09:00",
      callWindowEnd: data.callWindowEnd || "18:00",
      maxConcurrentCalls: data.maxConcurrentCalls || 5,
      retryAttempts: data.retryAttempts || 2,
      retryDelayMinutes: data.retryDelayMinutes || 30
    }).returning();
    let contactStats = null;
    if (req.file) {
      try {
        const fileContent = await contactUploadService.readFileContent(req.file);
        const parsedContacts = contactUploadService.parseContactsFromCSV(fileContent, campaign.id);
        if (parsedContacts.length > 0) {
          const validContacts = parsedContacts.filter((c) => c.phone && c.phone.trim().length >= 10);
          const invalidCount = parsedContacts.length - validContacts.length;
          let added = 0;
          let skipped = 0;
          for (const contact of validContacts) {
            const [existing] = await db2.select().from(contacts).where(and7(eq8(contacts.campaignId, campaign.id), eq8(contacts.phone, contact.phone))).limit(1);
            if (existing) {
              skipped++;
              continue;
            }
            await db2.insert(contacts).values({
              campaignId: campaign.id,
              phone: contact.phone,
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
              customFields: contact.customFields,
              status: "pending"
            });
            added++;
          }
          await db2.update(campaigns).set({ totalContacts: sql8`COALESCE(${campaigns.totalContacts}, 0) + ${added}` }).where(eq8(campaigns.id, campaign.id));
          contactStats = {
            fileName: req.file.originalname,
            totalRows: parsedContacts.length,
            contactsAdded: added,
            contactsSkipped: skipped,
            invalidRows: invalidCount
          };
        }
      } catch (error) {
        console.error("[Campaigns API] CSV processing error:", error.message);
        contactStats = {
          fileName: req.file.originalname,
          error: "Failed to parse CSV file"
        };
      }
    }
    const response = {
      success: true,
      data: {
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        agentId: campaign.agentId,
        phoneNumberId: campaign.phoneNumberId,
        scheduledStartTime: campaign.scheduledStartTime,
        timezone: campaign.timezone,
        callWindowStart: campaign.callWindowStart,
        callWindowEnd: campaign.callWindowEnd,
        maxConcurrentCalls: campaign.maxConcurrentCalls,
        createdAt: campaign.createdAt,
        ...contactStats && { contacts: contactStats }
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
router2.get(
  "/",
  apiAuthMiddleware("campaigns:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
    const offset = (page - 1) * pageSize;
    const [campaignList, countResult] = await Promise.all([
      db2.select().from(campaigns).where(eq8(campaigns.userId, userId)).orderBy(desc6(campaigns.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql8`count(*)` }).from(campaigns).where(eq8(campaigns.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const response = {
      success: true,
      data: campaignList.map((c) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        agentId: c.agentId,
        totalContacts: c.totalContacts,
        calledContacts: c.calledContacts,
        scheduledStartTime: c.scheduledStartTime,
        startedAt: c.startedAt,
        completedAt: c.completedAt,
        createdAt: c.createdAt
      })),
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router2.get(
  "/:id",
  apiAuthMiddleware("campaigns:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [campaign] = await db2.select().from(campaigns).where(and7(eq8(campaigns.id, id), eq8(campaigns.userId, userId))).limit(1);
    if (!campaign) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Campaign not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: campaign,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router2.post(
  "/:id/contacts",
  apiAuthMiddleware("campaigns:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [campaign] = await db2.select().from(campaigns).where(and7(eq8(campaigns.id, id), eq8(campaigns.userId, userId))).limit(1);
    if (!campaign) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Campaign not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (campaign.status !== "draft" && campaign.status !== "paused") {
      const response2 = {
        success: false,
        error: { code: "CONFLICT", message: "Cannot add contacts to an active or completed campaign." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response2);
    }
    const parseResult = addContactsSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { contacts: newContacts } = parseResult.data;
    let added = 0;
    let skipped = 0;
    for (const contact of newContacts) {
      const [existing] = await db2.select().from(contacts).where(and7(eq8(contacts.campaignId, id), eq8(contacts.phone, contact.phoneNumber))).limit(1);
      if (existing) {
        skipped++;
        continue;
      }
      await db2.insert(contacts).values({
        campaignId: id,
        phone: contact.phoneNumber,
        firstName: contact.firstName || "Unknown",
        lastName: contact.lastName,
        email: contact.email,
        customFields: contact.customFields,
        status: "pending"
      });
      added++;
    }
    await db2.update(campaigns).set({ totalContacts: sql8`${campaigns.totalContacts} + ${added}` }).where(eq8(campaigns.id, id));
    const response = {
      success: true,
      data: {
        campaignId: id,
        contactsAdded: added,
        contactsSkipped: skipped
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
router2.post(
  "/:id/start",
  apiAuthMiddleware("campaigns:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [campaign] = await db2.select().from(campaigns).where(and7(eq8(campaigns.id, id), eq8(campaigns.userId, userId))).limit(1);
    if (!campaign) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Campaign not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (campaign.status === "running") {
      const response2 = {
        success: false,
        error: { code: "CONFLICT", message: "Campaign is already running." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response2);
    }
    const [user] = await db2.select().from(users).where(eq8(users.id, userId)).limit(1);
    if (!user || user.credits < campaign.totalContacts) {
      const response2 = {
        success: false,
        error: { code: "INSUFFICIENT_CREDITS", message: "Insufficient credits to run this campaign." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(402).json(response2);
    }
    await db2.update(campaigns).set({
      status: "running",
      startedAt: /* @__PURE__ */ new Date()
    }).where(eq8(campaigns.id, id));
    const response = {
      success: true,
      data: {
        campaignId: id,
        status: "running",
        message: "Campaign started successfully."
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router2.post(
  "/:id/pause",
  apiAuthMiddleware("campaigns:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [campaign] = await db2.select().from(campaigns).where(and7(eq8(campaigns.id, id), eq8(campaigns.userId, userId))).limit(1);
    if (!campaign) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Campaign not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (campaign.status !== "running") {
      const response2 = {
        success: false,
        error: { code: "CONFLICT", message: "Campaign is not running." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response2);
    }
    await db2.update(campaigns).set({ status: "paused" }).where(eq8(campaigns.id, id));
    const response = {
      success: true,
      data: {
        campaignId: id,
        status: "paused",
        message: "Campaign paused successfully."
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router2.post(
  "/:id/contacts-upload",
  apiAuthMiddleware("campaigns:write"),
  csvUpload.single("file"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    if (!req.file) {
      const response = {
        success: false,
        error: { code: "VALIDATION_ERROR", message: 'No CSV file provided. Upload a file with field name "file".' },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response);
    }
    const [campaign] = await db2.select().from(campaigns).where(and7(eq8(campaigns.id, id), eq8(campaigns.userId, userId))).limit(1);
    if (!campaign) {
      const response = {
        success: false,
        error: { code: "NOT_FOUND", message: "Campaign not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response);
    }
    if (campaign.status !== "draft" && campaign.status !== "paused") {
      const response = {
        success: false,
        error: { code: "CONFLICT", message: "Cannot add contacts to an active or completed campaign." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response);
    }
    try {
      const fileContent = await contactUploadService.readFileContent(req.file);
      const parsedContacts = contactUploadService.parseContactsFromCSV(fileContent, id);
      if (parsedContacts.length === 0) {
        const response2 = {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "CSV file is empty or has no valid rows." },
          meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
        };
        return res.status(400).json(response2);
      }
      const validContacts = parsedContacts.filter((c) => c.phone && c.phone.trim().length >= 10);
      const invalidCount = parsedContacts.length - validContacts.length;
      let added = 0;
      let skipped = 0;
      for (const contact of validContacts) {
        const [existing] = await db2.select().from(contacts).where(and7(eq8(contacts.campaignId, id), eq8(contacts.phone, contact.phone))).limit(1);
        if (existing) {
          skipped++;
          continue;
        }
        await db2.insert(contacts).values({
          campaignId: id,
          phone: contact.phone,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          customFields: contact.customFields,
          status: "pending"
        });
        added++;
      }
      await db2.update(campaigns).set({
        totalContacts: sql8`${campaigns.totalContacts} + ${added}`
      }).where(eq8(campaigns.id, id));
      const response = {
        success: true,
        data: {
          campaignId: id,
          fileName: req.file.originalname,
          totalRows: parsedContacts.length,
          contactsAdded: added,
          contactsSkipped: skipped,
          invalidRows: invalidCount
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      res.status(201).json(response);
    } catch (error) {
      const response = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Failed to parse CSV file."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response);
    }
  })
);
var campaigns_routes_default = router2;

// plugins/rest-api/routes/agents.routes.js
import { Router as Router3 } from "express";
init_schema();
import { eq as eq9, and as and8, desc as desc7, sql as sql9 } from "drizzle-orm";
var router3 = Router3();
router3.get(
  "/",
  apiAuthMiddleware("agents:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
    const offset = (page - 1) * pageSize;
    const [agentList, countResult] = await Promise.all([
      db2.select().from(agents).where(eq9(agents.userId, userId)).orderBy(desc7(agents.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql9`count(*)` }).from(agents).where(eq9(agents.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const response = {
      success: true,
      data: agentList.map((a) => ({
        id: a.id,
        name: a.name,
        type: a.type,
        telephonyProvider: a.telephonyProvider,
        language: a.language,
        isActive: a.isActive,
        transferEnabled: a.transferEnabled,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      })),
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router3.get(
  "/:id",
  apiAuthMiddleware("agents:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [agent] = await db2.select().from(agents).where(and8(eq9(agents.id, id), eq9(agents.userId, userId))).limit(1);
    if (!agent) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Agent not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: {
        id: agent.id,
        name: agent.name,
        type: agent.type,
        telephonyProvider: agent.telephonyProvider,
        systemPrompt: agent.systemPrompt,
        firstMessage: agent.firstMessage,
        language: agent.language,
        llmModel: agent.llmModel,
        temperature: agent.temperature,
        voiceId: agent.elevenLabsVoiceId,
        openaiVoice: agent.openaiVoice,
        transferEnabled: agent.transferEnabled,
        transferPhoneNumber: agent.transferPhoneNumber,
        isActive: agent.isActive,
        maxDurationSeconds: agent.maxDurationSeconds,
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router3.get(
  "/:id/flow",
  apiAuthMiddleware("agents:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [agent] = await db2.select().from(agents).where(and8(eq9(agents.id, id), eq9(agents.userId, userId))).limit(1);
    if (!agent) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Agent not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (agent.type !== "flow" || !agent.flowId) {
      const response2 = {
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Agent is not a flow agent or has no flow assigned." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const [flow] = await db2.select().from(flows).where(eq9(flows.id, agent.flowId)).limit(1);
    if (!flow) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Flow not found for this agent." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: {
        version: "1.0",
        agentId: agent.id,
        agentName: agent.name,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        flow: {
          id: flow.id,
          name: flow.name,
          nodes: flow.nodes,
          edges: flow.edges,
          variables: flow.variables
        }
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router3.put(
  "/:id/flow",
  apiAuthMiddleware("agents:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [agent] = await db2.select().from(agents).where(and8(eq9(agents.id, id), eq9(agents.userId, userId))).limit(1);
    if (!agent) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Agent not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    if (agent.type !== "flow") {
      const response2 = {
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Agent is not a flow agent." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { flow } = req.body;
    if (!flow || !flow.nodes || !flow.edges) {
      const response2 = {
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Invalid flow data. Required: flow.nodes and flow.edges" },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    if (agent.flowId) {
      await db2.update(flows).set({
        nodes: flow.nodes,
        edges: flow.edges,
        variables: flow.variables,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq9(flows.id, agent.flowId));
    } else {
      const [newFlow] = await db2.insert(flows).values({
        userId,
        name: flow.name || `${agent.name} Flow`,
        nodes: flow.nodes,
        edges: flow.edges,
        variables: flow.variables
      }).returning();
      await db2.update(agents).set({ flowId: newFlow.id, updatedAt: /* @__PURE__ */ new Date() }).where(eq9(agents.id, id));
    }
    const response = {
      success: true,
      data: {
        agentId: id,
        message: "Flow imported successfully."
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
var agents_routes_default = router3;

// plugins/rest-api/routes/contacts.routes.js
import { Router as Router4 } from "express";
init_schema();
import { eq as eq10, and as and9, desc as desc8, sql as sql10 } from "drizzle-orm";
import { z as z4 } from "zod";
var router4 = Router4();
var createContactSchema = z4.object({
  phone: z4.string().min(10, "Phone number must be at least 10 digits"),
  firstName: z4.string().optional(),
  lastName: z4.string().optional(),
  email: z4.string().email().optional().or(z4.literal("")),
  company: z4.string().optional(),
  tags: z4.array(z4.string()).optional(),
  customFields: z4.record(z4.unknown()).optional()
});
var updateContactSchema = z4.object({
  phone: z4.string().min(10, "Phone number must be at least 10 digits").optional(),
  firstName: z4.string().optional(),
  lastName: z4.string().optional(),
  email: z4.string().email().optional().or(z4.literal("")).optional(),
  company: z4.string().optional(),
  tags: z4.array(z4.string()).optional(),
  customFields: z4.record(z4.unknown()).optional(),
  stage: z4.string().optional()
});
var bulkImportSchema = z4.object({
  contacts: z4.array(createContactSchema).min(1).max(1e4),
  skipDuplicates: z4.boolean().optional().default(true)
});
router4.get(
  "/",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [contactList, countResult] = await Promise.all([
      db2.select().from(leads).where(eq10(leads.userId, userId)).orderBy(desc8(leads.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql10`count(*)` }).from(leads).where(eq10(leads.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const response = {
      success: true,
      data: contactList.map((c) => ({
        id: c.id,
        phone: c.phone,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        company: c.company,
        tags: c.tags,
        customFields: c.customFields,
        stage: c.stage,
        leadScore: c.leadScore,
        aiSummary: c.aiSummary,
        sentiment: c.sentiment,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      })),
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router4.post(
  "/",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const parseResult = createContactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const data = parseResult.data;
    const [existing] = await db2.select().from(leads).where(and9(eq10(leads.userId, userId), eq10(leads.phone, data.phone))).limit(1);
    if (existing) {
      const response2 = {
        success: false,
        error: { code: "ALREADY_EXISTS", message: "Contact with this phone number already exists." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response2);
    }
    const [contact] = await db2.insert(leads).values({
      userId,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || void 0,
      company: data.company,
      tags: data.tags,
      customFields: data.customFields,
      sourceType: "api",
      // Created via API
      stage: "new"
    }).returning();
    const response = {
      success: true,
      data: {
        id: contact.id,
        phone: contact.phone,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        company: contact.company,
        tags: contact.tags,
        customFields: contact.customFields,
        stage: contact.stage,
        createdAt: contact.createdAt
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
router4.get(
  "/:id",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [contact] = await db2.select().from(leads).where(and9(eq10(leads.id, id), eq10(leads.userId, userId))).limit(1);
    if (!contact) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Contact not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: contact,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router4.put(
  "/:id",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [existing] = await db2.select().from(leads).where(and9(eq10(leads.id, id), eq10(leads.userId, userId))).limit(1);
    if (!existing) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Contact not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const parseResult = updateContactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { phone, firstName, lastName, email, company, tags, customFields, stage } = parseResult.data;
    const [updated] = await db2.update(leads).set({
      phone: phone ?? existing.phone,
      firstName: firstName ?? existing.firstName,
      lastName: lastName ?? existing.lastName,
      email: email ?? existing.email,
      company: company ?? existing.company,
      tags: tags ?? existing.tags,
      customFields: customFields ?? existing.customFields,
      stage: stage ?? existing.stage,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq10(leads.id, id)).returning();
    const response = {
      success: true,
      data: updated,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router4.delete(
  "/:id",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const result = await db2.delete(leads).where(and9(eq10(leads.id, id), eq10(leads.userId, userId))).returning();
    if (result.length === 0) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Contact not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: { deleted: true },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router4.post(
  "/bulk-import",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const parseResult = bulkImportSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { contacts: newContacts, skipDuplicates } = parseResult.data;
    let imported = 0;
    let skipped = 0;
    const errors = [];
    for (let i = 0; i < newContacts.length; i++) {
      const contact = newContacts[i];
      try {
        const [existing] = await db2.select().from(leads).where(and9(eq10(leads.userId, userId), eq10(leads.phone, contact.phone))).limit(1);
        if (existing) {
          if (skipDuplicates) {
            skipped++;
            continue;
          } else {
            errors.push({ row: i + 1, phone: contact.phone, error: "Duplicate phone number" });
            continue;
          }
        }
        await db2.insert(leads).values({
          userId,
          phone: contact.phone,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email || void 0,
          company: contact.company,
          tags: contact.tags,
          customFields: contact.customFields,
          sourceType: "api",
          stage: "new"
        });
        imported++;
      } catch (error) {
        errors.push({ row: i + 1, phone: contact.phone, error: error.message });
      }
    }
    const responseData = {
      imported,
      skipped,
      errors: errors.map((e) => ({ row: e.row, phoneNumber: e.phone, error: e.error }))
    };
    const response = {
      success: true,
      data: responseData,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
var contacts_routes_default = router4;

// plugins/rest-api/routes/credits.routes.js
import { Router as Router5 } from "express";
init_schema();
import { eq as eq11, and as and10, gte as gte6, desc as desc9, sql as sql11 } from "drizzle-orm";
var router5 = Router5();
router5.get(
  "/balance",
  apiAuthMiddleware("credits:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const [user] = await db2.select({ credits: users.credits }).from(users).where(eq11(users.id, userId)).limit(1);
    if (!user) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "User not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const balance = {
      available: user.credits,
      reserved: 0,
      // Could calculate from active campaigns
      total: user.credits,
      currency: "credits"
    };
    const response = {
      success: true,
      data: balance,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router5.get(
  "/usage",
  apiAuthMiddleware("credits:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const days = parseInt(req.query.days) || 30;
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(startDate.getDate() - days);
    const transactions = await db2.select().from(creditTransactions).where(and10(
      eq11(creditTransactions.userId, userId),
      gte6(creditTransactions.createdAt, startDate)
    )).orderBy(desc9(creditTransactions.createdAt)).limit(1e3);
    const usageByDate = {};
    for (const tx of transactions) {
      const date2 = tx.createdAt.toISOString().split("T")[0];
      if (!usageByDate[date2]) {
        usageByDate[date2] = { calls: 0, minutes: 0, credits: 0 };
      }
      if (tx.type === "deduction") {
        usageByDate[date2].calls += 1;
        usageByDate[date2].credits += Math.abs(tx.amount);
        usageByDate[date2].minutes += Math.abs(tx.amount);
      }
    }
    const usage = Object.entries(usageByDate).map(([date2, data]) => ({ date: date2, ...data })).sort((a, b) => a.date.localeCompare(b.date));
    const total = usage.reduce(
      (acc, day) => ({
        calls: acc.calls + day.calls,
        minutes: acc.minutes + day.minutes,
        credits: acc.credits + day.credits
      }),
      { calls: 0, minutes: 0, credits: 0 }
    );
    const response = {
      success: true,
      data: {
        period: {
          start: startDate.toISOString(),
          end: (/* @__PURE__ */ new Date()).toISOString()
        },
        usage,
        total
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router5.get(
  "/calls",
  apiAuthMiddleware("analytics:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const days = parseInt(req.query.days) || 30;
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(startDate.getDate() - days);
    const [elevenLabsStats, plivoStats, twilioStats, creditsResult] = await Promise.all([
      db2.select({
        totalCalls: sql11`count(*)`,
        completedCalls: sql11`count(*) filter (where status = 'completed')`,
        failedCalls: sql11`count(*) filter (where status = 'failed')`,
        totalDuration: sql11`coalesce(sum(duration), 0)`
      }).from(calls).where(and10(eq11(calls.userId, userId), gte6(calls.createdAt, startDate))),
      db2.select({
        totalCalls: sql11`count(*)`,
        completedCalls: sql11`count(*) filter (where status = 'completed')`,
        failedCalls: sql11`count(*) filter (where status = 'failed')`,
        totalDuration: sql11`coalesce(sum(duration), 0)`
      }).from(plivoCalls).where(and10(eq11(plivoCalls.userId, userId), gte6(plivoCalls.createdAt, startDate))),
      db2.select({
        totalCalls: sql11`count(*)`,
        completedCalls: sql11`count(*) filter (where status = 'completed')`,
        failedCalls: sql11`count(*) filter (where status = 'failed')`,
        totalDuration: sql11`coalesce(sum(duration), 0)`
      }).from(twilioOpenaiCalls).where(and10(eq11(twilioOpenaiCalls.userId, userId), gte6(twilioOpenaiCalls.createdAt, startDate))),
      db2.select({
        totalCredits: sql11`coalesce(sum(abs(amount)), 0)`
      }).from(creditTransactions).where(and10(
        eq11(creditTransactions.userId, userId),
        gte6(creditTransactions.createdAt, startDate),
        sql11`amount < 0`
      ))
    ]);
    const combined = {
      totalCalls: Number(elevenLabsStats[0]?.totalCalls || 0) + Number(plivoStats[0]?.totalCalls || 0) + Number(twilioStats[0]?.totalCalls || 0),
      completedCalls: Number(elevenLabsStats[0]?.completedCalls || 0) + Number(plivoStats[0]?.completedCalls || 0) + Number(twilioStats[0]?.completedCalls || 0),
      failedCalls: Number(elevenLabsStats[0]?.failedCalls || 0) + Number(plivoStats[0]?.failedCalls || 0) + Number(twilioStats[0]?.failedCalls || 0),
      totalDuration: Number(elevenLabsStats[0]?.totalDuration || 0) + Number(plivoStats[0]?.totalDuration || 0) + Number(twilioStats[0]?.totalDuration || 0),
      totalCredits: Number(creditsResult[0]?.totalCredits || 0)
    };
    const analytics = {
      totalCalls: combined.totalCalls,
      completedCalls: combined.completedCalls,
      failedCalls: combined.failedCalls,
      totalDurationMinutes: Math.round(combined.totalDuration / 60),
      averageDurationSeconds: combined.totalCalls > 0 ? Math.round(combined.totalDuration / combined.totalCalls) : 0,
      creditsUsed: combined.totalCredits,
      period: {
        start: startDate.toISOString(),
        end: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    const response = {
      success: true,
      data: analytics,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router5.get(
  "/campaigns",
  apiAuthMiddleware("analytics:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [campaignList, countResult] = await Promise.all([
      db2.select().from(campaigns).where(eq11(campaigns.userId, userId)).orderBy(desc9(campaigns.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql11`count(*)` }).from(campaigns).where(eq11(campaigns.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const analytics = campaignList.map((c) => ({
      campaignId: c.id,
      name: c.name,
      status: c.status,
      totalContacts: c.totalContacts || 0,
      called: c.completedCalls || 0,
      connected: c.completedCalls || 0,
      completed: c.status === "completed" ? c.totalContacts : c.completedCalls || 0,
      failed: c.failedCalls || 0,
      pending: (c.totalContacts || 0) - (c.completedCalls || 0),
      successRate: c.totalContacts > 0 ? Math.round((c.successfulCalls || 0) / c.totalContacts * 100) : 0
    }));
    const response = {
      success: true,
      data: analytics,
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
var credits_routes_default = router5;

// plugins/rest-api/routes/analytics.routes.js
import { Router as Router6 } from "express";
init_schema();
import { eq as eq12, and as and11, gte as gte7, desc as desc10, sql as sql12 } from "drizzle-orm";
var router6 = Router6();
router6.get(
  "/calls",
  apiAuthMiddleware("analytics:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const days = parseInt(req.query.days) || 30;
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(startDate.getDate() - days);
    const [elevenLabsStats, plivoStats, twilioStats, creditsResult] = await Promise.all([
      db2.select({
        totalCalls: sql12`count(*)`,
        completedCalls: sql12`count(*) filter (where status = 'completed')`,
        failedCalls: sql12`count(*) filter (where status = 'failed')`,
        totalDuration: sql12`coalesce(sum(duration), 0)`
      }).from(calls).where(and11(eq12(calls.userId, userId), gte7(calls.createdAt, startDate))),
      db2.select({
        totalCalls: sql12`count(*)`,
        completedCalls: sql12`count(*) filter (where status = 'completed')`,
        failedCalls: sql12`count(*) filter (where status = 'failed')`,
        totalDuration: sql12`coalesce(sum(duration), 0)`
      }).from(plivoCalls).where(and11(eq12(plivoCalls.userId, userId), gte7(plivoCalls.createdAt, startDate))),
      db2.select({
        totalCalls: sql12`count(*)`,
        completedCalls: sql12`count(*) filter (where status = 'completed')`,
        failedCalls: sql12`count(*) filter (where status = 'failed')`,
        totalDuration: sql12`coalesce(sum(duration), 0)`
      }).from(twilioOpenaiCalls).where(and11(eq12(twilioOpenaiCalls.userId, userId), gte7(twilioOpenaiCalls.createdAt, startDate))),
      db2.select({
        totalCredits: sql12`coalesce(sum(abs(amount)), 0)`
      }).from(creditTransactions).where(and11(
        eq12(creditTransactions.userId, userId),
        gte7(creditTransactions.createdAt, startDate),
        sql12`amount < 0`
      ))
    ]);
    const combined = {
      totalCalls: Number(elevenLabsStats[0]?.totalCalls || 0) + Number(plivoStats[0]?.totalCalls || 0) + Number(twilioStats[0]?.totalCalls || 0),
      completedCalls: Number(elevenLabsStats[0]?.completedCalls || 0) + Number(plivoStats[0]?.completedCalls || 0) + Number(twilioStats[0]?.completedCalls || 0),
      failedCalls: Number(elevenLabsStats[0]?.failedCalls || 0) + Number(plivoStats[0]?.failedCalls || 0) + Number(twilioStats[0]?.failedCalls || 0),
      totalDuration: Number(elevenLabsStats[0]?.totalDuration || 0) + Number(plivoStats[0]?.totalDuration || 0) + Number(twilioStats[0]?.totalDuration || 0),
      totalCredits: Number(creditsResult[0]?.totalCredits || 0)
    };
    const analytics = {
      totalCalls: combined.totalCalls,
      completedCalls: combined.completedCalls,
      failedCalls: combined.failedCalls,
      totalDurationMinutes: Math.round(combined.totalDuration / 60),
      averageDurationSeconds: combined.totalCalls > 0 ? Math.round(combined.totalDuration / combined.totalCalls) : 0,
      creditsUsed: combined.totalCredits,
      period: {
        start: startDate.toISOString(),
        end: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    const response = {
      success: true,
      data: analytics,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router6.get(
  "/campaigns",
  apiAuthMiddleware("analytics:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [campaignList, countResult] = await Promise.all([
      db2.select().from(campaigns).where(eq12(campaigns.userId, userId)).orderBy(desc10(campaigns.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql12`count(*)` }).from(campaigns).where(eq12(campaigns.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const analytics = campaignList.map((c) => ({
      campaignId: c.id,
      name: c.name,
      status: c.status,
      totalContacts: c.totalContacts || 0,
      completed: c.completedCalls || 0,
      successful: c.successfulCalls || 0,
      failed: c.failedCalls || 0,
      pending: (c.totalContacts || 0) - (c.completedCalls || 0),
      successRate: c.totalContacts > 0 ? Math.round((c.successfulCalls || 0) / c.totalContacts * 100) : 0,
      startedAt: c.startedAt,
      completedAt: c.completedAt,
      createdAt: c.createdAt
    }));
    const response = {
      success: true,
      data: analytics,
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router6.get(
  "/summary",
  apiAuthMiddleware("analytics:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const days = parseInt(req.query.days) || 30;
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(startDate.getDate() - days);
    const callCountSelect = {
      total: sql12`count(*)`,
      completed: sql12`count(*) filter (where status = 'completed')`
    };
    const [elevenLabsStats, plivoStats, twilioStats, campaignStats] = await Promise.all([
      db2.select(callCountSelect).from(calls).where(and11(eq12(calls.userId, userId), gte7(calls.createdAt, startDate))),
      db2.select(callCountSelect).from(plivoCalls).where(and11(eq12(plivoCalls.userId, userId), gte7(plivoCalls.createdAt, startDate))),
      db2.select(callCountSelect).from(twilioOpenaiCalls).where(and11(eq12(twilioOpenaiCalls.userId, userId), gte7(twilioOpenaiCalls.createdAt, startDate))),
      db2.select({
        total: sql12`count(*)`,
        running: sql12`count(*) filter (where status = 'running')`,
        completed: sql12`count(*) filter (where status = 'completed')`
      }).from(campaigns).where(eq12(campaigns.userId, userId))
    ]);
    const totalCalls = Number(elevenLabsStats[0]?.total || 0) + Number(plivoStats[0]?.total || 0) + Number(twilioStats[0]?.total || 0);
    const completedCalls = Number(elevenLabsStats[0]?.completed || 0) + Number(plivoStats[0]?.completed || 0) + Number(twilioStats[0]?.completed || 0);
    const response = {
      success: true,
      data: {
        period: {
          start: startDate.toISOString(),
          end: (/* @__PURE__ */ new Date()).toISOString(),
          days
        },
        calls: {
          total: totalCalls,
          completed: completedCalls
        },
        campaigns: {
          total: Number(campaignStats[0]?.total || 0),
          running: Number(campaignStats[0]?.running || 0),
          completed: Number(campaignStats[0]?.completed || 0)
        }
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
var analytics_routes_default = router6;

// plugins/rest-api/routes/webhooks.routes.js
import { Router as Router7 } from "express";
init_schema();
import { eq as eq13, and as and12, desc as desc11, sql as sql13 } from "drizzle-orm";
import { z as z5 } from "zod";
import crypto2 from "crypto";
var router7 = Router7();
var updateWebhookSchema = z5.object({
  url: z5.string().url("Invalid webhook URL").optional(),
  events: z5.array(z5.string()).min(1, "At least one event is required").optional(),
  isActive: z5.boolean().optional(),
  description: z5.string().optional()
});
var SUPPORTED_EVENTS = [
  "call.started",
  "call.completed",
  "call.failed",
  "campaign.started",
  "campaign.completed",
  "campaign.paused",
  "contact.created",
  "contact.updated",
  "credits.low",
  "credits.depleted"
];
var createWebhookSchema2 = z5.object({
  url: z5.string().url("Invalid webhook URL"),
  events: z5.array(z5.string()).min(1, "At least one event is required"),
  secret: z5.string().optional(),
  description: z5.string().optional()
});
router7.get(
  "/",
  apiAuthMiddleware("webhooks:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [webhooks2, countResult] = await Promise.all([
      db2.select().from(webhookSubscriptions).where(eq13(webhookSubscriptions.userId, userId)).orderBy(desc11(webhookSubscriptions.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql13`count(*)` }).from(webhookSubscriptions).where(eq13(webhookSubscriptions.userId, userId))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const response = {
      success: true,
      data: webhooks2.map((w) => ({
        id: w.id,
        url: w.url,
        events: w.events,
        isActive: w.isActive,
        description: w.description,
        lastDeliveryAt: w.lastDeliveryAt,
        lastDeliveryStatus: w.lastDeliveryStatus,
        createdAt: w.createdAt
      })),
      meta: {
        requestId: req.requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  })
);
router7.post(
  "/",
  apiAuthMiddleware("webhooks:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const parseResult = createWebhookSchema2.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { url, events, secret, description } = parseResult.data;
    const invalidEvents = events.filter((e) => !SUPPORTED_EVENTS.includes(e));
    if (invalidEvents.length > 0) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid event types",
          details: { invalidEvents, supportedEvents: SUPPORTED_EVENTS }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const webhookSecret = secret || crypto2.randomBytes(32).toString("hex");
    const [webhook] = await db2.insert(webhookSubscriptions).values({
      userId,
      url,
      events,
      secret: webhookSecret,
      description,
      isActive: true
    }).returning();
    const responseData = {
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      secret: webhookSecret,
      // Only shown on creation
      isActive: webhook.isActive,
      createdAt: webhook.createdAt.toISOString()
    };
    const response = {
      success: true,
      data: responseData,
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.status(201).json(response);
  })
);
router7.put(
  "/:id",
  apiAuthMiddleware("webhooks:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [existing] = await db2.select().from(webhookSubscriptions).where(and12(eq13(webhookSubscriptions.id, id), eq13(webhookSubscriptions.userId, userId))).limit(1);
    if (!existing) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Webhook not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const parseResult = updateWebhookSchema.safeParse(req.body);
    if (!parseResult.success) {
      const response2 = {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: { errors: parseResult.error.flatten().fieldErrors }
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(400).json(response2);
    }
    const { url, events, isActive, description } = parseResult.data;
    if (events) {
      const invalidEvents = events.filter((e) => !SUPPORTED_EVENTS.includes(e));
      if (invalidEvents.length > 0) {
        const response2 = {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid event types",
            details: { invalidEvents, supportedEvents: SUPPORTED_EVENTS }
          },
          meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
        };
        return res.status(400).json(response2);
      }
    }
    const [updated] = await db2.update(webhookSubscriptions).set({
      url: url ?? existing.url,
      events: events ?? existing.events,
      isActive: isActive ?? existing.isActive,
      description: description ?? existing.description,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq13(webhookSubscriptions.id, id)).returning();
    const response = {
      success: true,
      data: {
        id: updated.id,
        url: updated.url,
        events: updated.events,
        isActive: updated.isActive,
        description: updated.description,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router7.delete(
  "/:id",
  apiAuthMiddleware("webhooks:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const result = await db2.delete(webhookSubscriptions).where(and12(eq13(webhookSubscriptions.id, id), eq13(webhookSubscriptions.userId, userId))).returning();
    if (result.length === 0) {
      const response2 = {
        success: false,
        error: { code: "NOT_FOUND", message: "Webhook not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response2);
    }
    const response = {
      success: true,
      data: { deleted: true },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
router7.post(
  "/:id/test",
  apiAuthMiddleware("webhooks:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { id } = req.params;
    const [webhook] = await db2.select().from(webhookSubscriptions).where(and12(eq13(webhookSubscriptions.id, id), eq13(webhookSubscriptions.userId, userId))).limit(1);
    if (!webhook) {
      const response = {
        success: false,
        error: { code: "NOT_FOUND", message: "Webhook not found." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(404).json(response);
    }
    const testPayload = {
      event: "test.ping",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      data: {
        message: "This is a test webhook delivery from Zonvo AI API.",
        webhookId: webhook.id
      }
    };
    try {
      const signature = crypto2.createHmac("sha256", webhook.secret).update(JSON.stringify(testPayload)).digest("hex");
      const deliveryResponse = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Zonvo AI-Signature": signature,
          "X-Zonvo AI-Event": "test.ping"
        },
        body: JSON.stringify(testPayload),
        signal: AbortSignal.timeout(1e4)
      });
      const response = {
        success: true,
        data: {
          delivered: deliveryResponse.ok,
          statusCode: deliveryResponse.status,
          message: deliveryResponse.ok ? "Test webhook delivered successfully." : "Webhook delivery failed."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      res.json(response);
    } catch (error) {
      const isTimeout = error.name === "TimeoutError" || error.name === "AbortError";
      const response = {
        success: false,
        error: {
          code: isTimeout ? "TIMEOUT" : "INTERNAL_ERROR",
          message: isTimeout ? "Webhook delivery timed out after 10 seconds. The destination URL may be unresponsive." : "Failed to deliver test webhook. The destination URL may be unreachable."
        },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      res.status(isTimeout ? 504 : 500).json(response);
    }
  })
);
router7.get(
  "/events",
  apiAuthMiddleware("webhooks:read"),
  asyncHandler(async (req, res) => {
    const response = {
      success: true,
      data: {
        events: SUPPORTED_EVENTS.map((event) => ({
          name: event,
          description: getEventDescription(event)
        }))
      },
      meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    };
    res.json(response);
  })
);
function getEventDescription(event) {
  const descriptions = {
    "call.started": "Triggered when a call begins",
    "call.completed": "Triggered when a call ends successfully",
    "call.failed": "Triggered when a call fails",
    "campaign.started": "Triggered when a campaign starts",
    "campaign.completed": "Triggered when a campaign finishes",
    "campaign.paused": "Triggered when a campaign is paused",
    "contact.created": "Triggered when a contact is created",
    "contact.updated": "Triggered when a contact is updated",
    "credits.low": "Triggered when credits fall below threshold",
    "credits.depleted": "Triggered when credits are exhausted"
  };
  return descriptions[event] || "No description available";
}
var webhooks_routes_default = router7;

// plugins/rest-api/routes/dnd.routes.ts
import { Router as Router8 } from "express";
import { z as z6 } from "zod";

// server/services/dnd-service.ts
init_db();
init_schema();
import { and as and13, desc as desc12, eq as eq14, ilike as ilike2, inArray as inArray5, or as or5, sql as sql14 } from "drizzle-orm";

// server/utils/logger.ts
var Logger = class {
  isDevelopment;
  logLevel;
  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== "production";
    this.logLevel = this.getLogLevel();
  }
  /**
   * Determines the appropriate log level based on environment
   * @returns {LogLevel} The configured log level
   */
  getLogLevel() {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase();
    if (envLevel === "debug" || envLevel === "info" || envLevel === "warn" || envLevel === "error") {
      return envLevel;
    }
    return this.isDevelopment ? "debug" : "info";
  }
  /**
   * Formats timestamp for log output
   * @returns {string} Formatted timestamp
   */
  getTimestamp() {
    const tz = process.env.LOG_TIMEZONE || "Asia/Kolkata";
    try {
      return (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: tz,
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).replace(",", "") + " IST";
    } catch {
      return (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
    }
  }
  /**
   * Determines if a log should be output based on current log level
   * @param {LogLevel} level - The level of the log message
   * @returns {boolean} Whether the log should be output
   */
  shouldLog(level) {
    const levels = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }
  /**
   * Formats and outputs a log message
   * @param {LogLevel} level - The severity level
   * @param {string} message - The log message
   * @param {any} data - Optional data to log
   * @param {string} source - Optional source identifier
   */
  log(level, message, data, source) {
    if (!this.shouldLog(level)) {
      return;
    }
    const logMessage = {
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
      source
    };
    const formattedMessage = this.isDevelopment ? this.formatDevelopmentLog(logMessage) : this.formatProductionLog(logMessage);
    switch (level) {
      case "error":
        console.error(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }
  /**
   * Formats log message for development environment
   * @param {LogMessage} logMessage - The log message object
   * @returns {string} Formatted log string
   */
  formatDevelopmentLog(logMessage) {
    const { timestamp: timestamp3, level, message, data, source } = logMessage;
    const levelPrefix = {
      debug: "[DEBUG]",
      info: "[INFO] ",
      warn: "[WARN] ",
      error: "[ERROR]"
    };
    let formatted = `${timestamp3} ${levelPrefix[level]}`;
    if (source) {
      formatted += ` [${source}]`;
    }
    formatted += ` ${message}`;
    if (data !== void 0) {
      formatted += `
${JSON.stringify(data, null, 2)}`;
    }
    return formatted;
  }
  /**
   * Formats log message for production environment
   * @param {LogMessage} logMessage - The log message object
   * @returns {string} JSON formatted log string
   */
  formatProductionLog(logMessage) {
    return JSON.stringify(logMessage);
  }
  /**
   * Log debug message (development only)
   * @param {string} message - The debug message
   * @param {any} data - Optional data
   * @param {string} source - Optional source
   */
  debug(message, data, source) {
    this.log("debug", message, data, source);
  }
  /**
   * Log info message
   * @param {string} message - The info message
   * @param {any} data - Optional data
   * @param {string} source - Optional source
   */
  info(message, data, source) {
    this.log("info", message, data, source);
  }
  /**
   * Log warning message
   * @param {string} message - The warning message
   * @param {any} data - Optional data
   * @param {string} source - Optional source
   */
  warn(message, data, source) {
    this.log("warn", message, data, source);
  }
  /**
   * Log error message
   * @param {string} message - The error message
   * @param {any} error - Optional error object or data
   * @param {string} source - Optional source
   */
  error(message, error, source) {
    this.log("error", message, error, source);
  }
  /**
   * Log HTTP request/response
   * @param {string} method - HTTP method
   * @param {string} path - Request path
   * @param {number} statusCode - Response status code
   * @param {number} duration - Request duration in ms
   * @param {any} response - Optional response data
   */
  http(method, path3, statusCode, duration, response) {
    if (path3.startsWith("/api")) {
      let logLine = `${method} ${path3} ${statusCode} in ${duration}ms`;
      if (response && this.isDevelopment) {
        const responseStr = JSON.stringify(response);
        if (responseStr.length > 80) {
          logLine += ` :: ${responseStr.slice(0, 79)}\u2026`;
        } else {
          logLine += ` :: ${responseStr}`;
        }
      }
      this.info(logLine, void 0, "HTTP");
    }
  }
};
var logger = new Logger();

// server/services/dnd-service.ts
var SOURCE = "DND";
function normalizePhone(raw) {
  const s = (typeof raw === "string" ? raw : raw == null ? "" : String(raw)).trim().replace(/^(whatsapp:|tel:|phone:)/i, "");
  if (!s || s.includes("@")) return "";
  const hasPlus = s.startsWith("+");
  const digitsRaw = s.replace(/\D/g, "");
  if (!digitsRaw) return "";
  let digits = digitsRaw;
  if (!hasPlus) {
    if (digits.startsWith("00") && digits.length - 2 >= 8 && digits.length - 2 <= 15) digits = digits.slice(2);
    if (digits.length === 10) digits = `91${digits}`;
    else if (digits.length === 11 && digits.startsWith("0")) digits = `91${digits.slice(1)}`;
  }
  if (digits.length < 8 || digits.length > 15) return "";
  return `+${digits}`;
}
async function isDoNotCall(userId, phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const [row] = await db.select({ id: doNotCallNumbers.id }).from(doNotCallNumbers).where(and13(eq14(doNotCallNumbers.userId, userId), eq14(doNotCallNumbers.phone, normalized))).limit(1);
  return !!row;
}
async function addDoNotCall(opts) {
  const phone = normalizePhone(opts.phone);
  if (!phone) throw new Error("Invalid phone number");
  const [inserted] = await db.insert(doNotCallNumbers).values({
    userId: opts.userId,
    phone,
    reason: opts.reason,
    source: opts.source,
    callId: opts.callId || null,
    note: opts.note ? String(opts.note).substring(0, 500) : null
  }).onConflictDoNothing({ target: [doNotCallNumbers.userId, doNotCallNumbers.phone] }).returning();
  if (inserted) {
    logger.info(`Added ${phone.replace(/\d(?=\d{4})/g, "*")} to DND for user ${opts.userId} (${opts.reason}/${opts.source})`, void 0, SOURCE);
    return { number: inserted, added: true };
  }
  const [existing] = await db.select().from(doNotCallNumbers).where(and13(eq14(doNotCallNumbers.userId, opts.userId), eq14(doNotCallNumbers.phone, phone))).limit(1);
  return { number: existing, added: false };
}
async function removeDoNotCall(userId, phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const rows = await db.delete(doNotCallNumbers).where(and13(eq14(doNotCallNumbers.userId, userId), eq14(doNotCallNumbers.phone, normalized))).returning({ id: doNotCallNumbers.id });
  return rows.length > 0;
}
async function removeDoNotCallById(userId, id) {
  const rows = await db.delete(doNotCallNumbers).where(and13(eq14(doNotCallNumbers.userId, userId), eq14(doNotCallNumbers.id, id))).returning({ id: doNotCallNumbers.id });
  return rows.length > 0;
}
async function listDoNotCall(userId, opts = {}) {
  const limit = Math.min(500, Math.max(1, opts.limit ?? 50));
  const offset = Math.max(0, opts.offset ?? 0);
  const q = (opts.q || "").trim();
  const where = q ? and13(eq14(doNotCallNumbers.userId, userId), or5(ilike2(doNotCallNumbers.phone, `%${q.replace(/[%_]/g, "")}%`), ilike2(doNotCallNumbers.note, `%${q.replace(/[%_]/g, "")}%`))) : eq14(doNotCallNumbers.userId, userId);
  const [numbers, [{ count: count3 }]] = await Promise.all([
    db.select().from(doNotCallNumbers).where(where).orderBy(desc12(doNotCallNumbers.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql14`count(*)::int` }).from(doNotCallNumbers).where(where)
  ]);
  return { numbers, total: count3 };
}
async function importDoNotCall(userId, phones, source = "upload") {
  const unique2 = Array.from(new Set(phones.map(normalizePhone).filter(Boolean)));
  let added = 0;
  for (let i = 0; i < unique2.length; i += 500) {
    const chunk = unique2.slice(i, i + 500);
    const rows = await db.insert(doNotCallNumbers).values(chunk.map((phone) => ({ userId, phone, reason: "import", source }))).onConflictDoNothing({ target: [doNotCallNumbers.userId, doNotCallNumbers.phone] }).returning({ id: doNotCallNumbers.id });
    added += rows.length;
  }
  logger.info(`DND import for user ${userId}: ${added} added, ${phones.length - added} skipped`, void 0, SOURCE);
  return { added, skipped: phones.length - added };
}

// plugins/rest-api/routes/helpers.ts
var MAX_PAGE_SIZE = 100;
function baseMeta(req) {
  return { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() };
}
function paginationMeta(page, pageSize, totalItems) {
  const totalPages = Math.ceil(totalItems / pageSize);
  return { page, pageSize, totalItems, totalPages, hasNext: page < totalPages, hasPrev: page > 1 };
}
function pageParams(req, defaultSize = 50) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(Math.max(1, parseInt(req.query.pageSize, 10) || defaultSize), MAX_PAGE_SIZE);
  return { page, pageSize, offset: (page - 1) * pageSize };
}
function sendData(req, res, data, status = 200, pagination) {
  const response = { success: true, data, meta: { ...baseMeta(req), ...pagination ? { pagination } : {} } };
  res.status(status).json(response);
}
function sendError2(req, res, status, code, message, details) {
  const response = { success: false, error: { code, message, details }, meta: baseMeta(req) };
  res.status(status).json(response);
}
function sendValidationError(req, res, error) {
  sendError2(req, res, 400, "VALIDATION_ERROR", "Invalid request body", { errors: error.flatten().fieldErrors });
}
function sendNotFound(req, res, what) {
  sendError2(req, res, 404, "NOT_FOUND", `${what} not found.`);
}
function queryString(req, key) {
  const v = req.query[key];
  return typeof v === "string" ? v.trim() : "";
}
function queryDate(req, key) {
  const raw = queryString(req, key);
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

// plugins/rest-api/routes/dnd.routes.ts
var router8 = Router8();
var addSchema = z6.object({
  phone: z6.string().min(8).max(32),
  note: z6.string().trim().max(500).optional(),
  reason: z6.enum(["manual", "complaint"]).optional()
});
var importSchema = z6.object({
  phones: z6.array(z6.string().max(32)).min(1).max(5e3)
});
function shape(row) {
  return { id: row.id, phone: row.phone, reason: row.reason, source: row.source, note: row.note, callId: row.callId, createdAt: row.createdAt };
}
router8.get(
  "/",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const { page, pageSize, offset } = pageParams(req, 50);
    const { numbers, total } = await listDoNotCall(req.apiAuth.userId, { q: queryString(req, "q"), limit: pageSize, offset });
    sendData(req, res, numbers.map(shape), 200, paginationMeta(page, pageSize, total));
  })
);
router8.get(
  "/check",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const phone = normalizePhone(queryString(req, "phone"));
    if (!phone) return sendError2(req, res, 400, "VALIDATION_ERROR", 'A valid phone number is required (query parameter "phone").');
    const blocked = await isDoNotCall(req.apiAuth.userId, phone);
    sendData(req, res, { phone, blocked });
  })
);
router8.post(
  "/",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const parsed = addSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const phone = normalizePhone(parsed.data.phone);
    if (!phone) return sendError2(req, res, 400, "VALIDATION_ERROR", "A valid phone number is required.");
    const { number, added } = await addDoNotCall({
      userId: req.apiAuth.userId,
      phone,
      reason: parsed.data.reason || "manual",
      source: "api",
      note: parsed.data.note || null
    });
    sendData(req, res, { id: number.id, phone: number.phone, added }, 201);
  })
);
router8.post(
  "/import",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const parsed = importSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const result = await importDoNotCall(req.apiAuth.userId, parsed.data.phones, "api");
    sendData(req, res, result);
  })
);
router8.delete(
  "/",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const phone = normalizePhone(queryString(req, "phone"));
    if (!phone) return sendError2(req, res, 400, "VALIDATION_ERROR", 'A valid phone number is required (query parameter "phone").');
    const removed = await removeDoNotCall(req.apiAuth.userId, phone);
    if (!removed) return sendNotFound(req, res, "Do-not-call entry");
    sendData(req, res, { removed: true });
  })
);
router8.delete(
  "/:id",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const removed = await removeDoNotCallById(req.apiAuth.userId, req.params.id);
    if (!removed) return sendNotFound(req, res, "Do-not-call entry");
    sendData(req, res, { removed: true });
  })
);
var dnd_routes_default = router8;

// plugins/rest-api/routes/callbacks.routes.ts
import { Router as Router9 } from "express";
import { z as z7 } from "zod";

// server/services/callback-service.ts
init_db();
init_schema();
import { and as and20, desc as desc15, eq as eq26, sql as sql16 } from "drizzle-orm";

// server/services/call-actions/util.ts
var DEFAULT_TIME_ZONE = "Asia/Kolkata";
function isValidTimeZone2(tz) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// server/services/call-actions/appointments.ts
init_db();
init_schema();
import { nanoid as nanoid5 } from "nanoid";
import { and as and16, eq as eq21, inArray as inArray7 } from "drizzle-orm";

// server/services/google-calendar/google-calendar.service.ts
init_db();
init_schema();
import { eq as eq16 } from "drizzle-orm";

// server/services/google-sheets/google-sheets.service.ts
init_db();
init_schema();
init_storage();
import { eq as eq15 } from "drizzle-orm";
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

// server/services/google-calendar/google-calendar.service.ts
var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
var GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";
async function refreshCalendarToken(userId, force = false) {
  const [cred] = await db.select().from(googleCalendarCredentials).where(eq16(googleCalendarCredentials.userId, userId)).limit(1);
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
    const resp = await fetch(GOOGLE_TOKEN_URL, {
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
    await db.update(googleCalendarCredentials).set({ accessToken: data.access_token, tokenExpiry: newExpiry, updatedAt: /* @__PURE__ */ new Date() }).where(eq16(googleCalendarCredentials.userId, userId));
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
async function updateCalendarEvent(userId, eventId, apt) {
  let token = await refreshCalendarToken(userId);
  if (!token) return false;
  const body = buildEventBody(apt);
  const doUpdate = (t) => fetch(`${GOOGLE_CALENDAR_API}/calendars/primary/events/${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  try {
    let resp = await doUpdate(token);
    if (resp.status === 401) {
      const fresh = await refreshCalendarToken(userId, true);
      if (!fresh) return false;
      resp = await doUpdate(fresh);
    }
    if (!resp.ok) {
      console.error("[GoogleCalendar] Update event failed:", await resp.text());
      return false;
    }
    console.log(`\u{1F4C5} [GoogleCalendar] Updated event ${eventId}`);
    return true;
  } catch (err) {
    console.error("[GoogleCalendar] Update event error:", err.message);
    return false;
  }
}
async function deleteCalendarEvent(userId, eventId) {
  let token = await refreshCalendarToken(userId);
  if (!token) return false;
  const doDelete = (t) => fetch(`${GOOGLE_CALENDAR_API}/calendars/primary/events/${encodeURIComponent(eventId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${t}` }
  });
  try {
    let resp = await doDelete(token);
    if (resp.status === 401) {
      const fresh = await refreshCalendarToken(userId, true);
      if (!fresh) return false;
      resp = await doDelete(fresh);
    }
    if (resp.status === 404) {
      console.warn(`[GoogleCalendar] Event ${eventId} not found (already deleted?)`);
      return true;
    }
    if (!resp.ok) {
      console.error("[GoogleCalendar] Delete event failed:", await resp.text());
      return false;
    }
    console.log(`\u{1F4C5} [GoogleCalendar] Deleted event ${eventId}`);
    return true;
  } catch (err) {
    console.error("[GoogleCalendar] Delete event error:", err.message);
    return false;
  }
}

// server/services/call-actions/appointments.ts
init_webhook_delivery();

// server/services/call-actions/call-meta.ts
init_db();
init_schema();
import { eq as eq20 } from "drizzle-orm";

// server/services/call-actions/leads.ts
init_db();
init_schema();
import { and as and18, eq as eq23 } from "drizzle-orm";

// server/storage/crm-storage.ts
init_db();
init_schema();
import { eq as eq22, and as and17, desc as desc14, asc as asc3, sql as sql15, ilike as ilike3, or as or6, inArray as inArray8, notInArray, gte as gte8, lte as lte4, count as count2, isNotNull as isNotNull4 } from "drizzle-orm";
function escapeLike(term) {
  return term.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}
var DEFAULT_STAGES = [
  { name: "New Lead", color: "#9CA3AF", order: 0, stage: "new" },
  { name: "Hot Lead", color: "#EF4444", order: 1, stage: "hot" },
  { name: "Appointment Booked", color: "#22C55E", order: 2, stage: "appointment" },
  { name: "Form Submitted", color: "#3B82F6", order: 3, stage: "form_submitted" },
  { name: "Needs Follow-up", color: "#F59E0B", order: 4, stage: "follow_up" },
  { name: "Not Interested", color: "#6B7280", order: 5, stage: "not_interested" },
  { name: "No Answer", color: "#D1D5DB", order: 6, stage: "no_answer" }
];
var CRMStorage = class {
  // ============================================================
  // Lead Stages
  // ============================================================
  static async getStagesByUser(userId) {
    return db.select().from(leadStages).where(eq22(leadStages.userId, userId)).orderBy(asc3(leadStages.order));
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
    const maxOrder = await db.select({ maxOrder: sql15`COALESCE(MAX("order"), 0)` }).from(leadStages).where(eq22(leadStages.userId, data.userId));
    const [stage] = await db.insert(leadStages).values({
      ...data,
      order: (maxOrder[0]?.maxOrder || 0) + 1,
      isDefault: false,
      isCustom: true
    }).returning();
    return stage;
  }
  static async updateStage(id, userId, data) {
    const [stage] = await db.update(leadStages).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and17(eq22(leadStages.id, id), eq22(leadStages.userId, userId))).returning();
    return stage || null;
  }
  static async deleteStage(id, userId) {
    const result = await db.delete(leadStages).where(and17(
      eq22(leadStages.id, id),
      eq22(leadStages.userId, userId),
      eq22(leadStages.isCustom, true)
    )).returning();
    return result.length > 0;
  }
  static async reorderStages(userId, stageIds) {
    for (let i = 0; i < stageIds.length; i++) {
      await db.update(leadStages).set({ order: i, updatedAt: /* @__PURE__ */ new Date() }).where(and17(eq22(leadStages.id, stageIds[i]), eq22(leadStages.userId, userId)));
    }
  }
  // ============================================================
  // Leads
  // ============================================================
  static async getLeadById(id, userId) {
    const [lead] = await db.select().from(leads).where(and17(eq22(leads.id, id), eq22(leads.userId, userId)));
    return lead || null;
  }
  static async getLeadsBySource(userId, sourceType, sourceId, filters) {
    const conditions = [
      eq22(leads.userId, userId),
      eq22(leads.sourceType, sourceType)
    ];
    if (sourceType === "campaign") {
      conditions.push(eq22(leads.campaignId, sourceId));
    } else {
      conditions.push(eq22(leads.incomingConnectionId, sourceId));
    }
    if (filters?.stage) {
      conditions.push(eq22(leads.stage, filters.stage));
    }
    if (filters?.minScore) {
      conditions.push(gte8(leads.leadScore, filters.minScore));
    }
    if (filters?.maxScore) {
      conditions.push(lte4(leads.leadScore, filters.maxScore));
    }
    if (filters?.startDate) {
      conditions.push(gte8(leads.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte4(leads.createdAt, filters.endDate));
    }
    if (filters?.search) {
      const searchPattern = `%${escapeLike(filters.search)}%`;
      conditions.push(or6(
        ilike3(leads.firstName, searchPattern),
        ilike3(leads.lastName, searchPattern),
        ilike3(leads.phone, searchPattern),
        ilike3(leads.email, searchPattern),
        ilike3(leads.company, searchPattern)
      ));
    }
    if (filters?.hideLeadsWithoutPhone) {
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    return db.select().from(leads).where(and17(...conditions)).orderBy(desc14(leads.createdAt));
  }
  static async getAllLeads(userId, filters) {
    const conditions = [eq22(leads.userId, userId)];
    if (filters?.stage) {
      conditions.push(eq22(leads.stage, filters.stage));
    }
    if (filters?.minScore) {
      conditions.push(gte8(leads.leadScore, filters.minScore));
    }
    if (filters?.maxScore) {
      conditions.push(lte4(leads.leadScore, filters.maxScore));
    }
    if (filters?.startDate) {
      conditions.push(gte8(leads.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte4(leads.createdAt, filters.endDate));
    }
    if (filters?.search) {
      const searchPattern = `%${escapeLike(filters.search)}%`;
      conditions.push(or6(
        ilike3(leads.firstName, searchPattern),
        ilike3(leads.lastName, searchPattern),
        ilike3(leads.phone, searchPattern),
        ilike3(leads.email, searchPattern),
        ilike3(leads.company, searchPattern)
      ));
    }
    if (filters?.hideLeadsWithoutPhone) {
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    return db.select().from(leads).where(and17(...conditions)).orderBy(desc14(leads.createdAt));
  }
  static async getLeadsBySourceType(userId, sourceType, filters) {
    const conditions = [
      eq22(leads.userId, userId),
      eq22(leads.sourceType, sourceType)
    ];
    if (filters?.stage) {
      conditions.push(eq22(leads.stage, filters.stage));
    }
    if (filters?.minScore) {
      conditions.push(gte8(leads.leadScore, filters.minScore));
    }
    if (filters?.maxScore) {
      conditions.push(lte4(leads.leadScore, filters.maxScore));
    }
    if (filters?.startDate) {
      conditions.push(gte8(leads.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte4(leads.createdAt, filters.endDate));
    }
    if (filters?.search) {
      const searchPattern = `%${escapeLike(filters.search)}%`;
      conditions.push(or6(
        ilike3(leads.firstName, searchPattern),
        ilike3(leads.lastName, searchPattern),
        ilike3(leads.phone, searchPattern),
        ilike3(leads.email, searchPattern),
        ilike3(leads.company, searchPattern)
      ));
    }
    if (filters?.hideLeadsWithoutPhone) {
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    return db.select().from(leads).where(and17(...conditions)).orderBy(desc14(leads.createdAt));
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
      eq22(leads.userId, userId),
      isNotNull4(leads.aiCategory)
      // Only categorized leads
    ];
    if (options.aiCategory) {
      conditions.push(eq22(leads.aiCategory, options.aiCategory));
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
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    if (options.sourceType) {
      conditions.push(eq22(leads.sourceType, options.sourceType));
      if (options.sourceId) {
        if (options.sourceType === "campaign") {
          conditions.push(eq22(leads.campaignId, options.sourceId));
        } else {
          conditions.push(eq22(leads.incomingConnectionId, options.sourceId));
        }
      }
    }
    if (options.search) {
      const searchPattern = `%${escapeLike(options.search)}%`;
      conditions.push(or6(
        ilike3(leads.firstName, searchPattern),
        ilike3(leads.lastName, searchPattern),
        ilike3(leads.phone, searchPattern),
        ilike3(leads.email, searchPattern),
        ilike3(leads.company, searchPattern)
      ));
    }
    const [countResult] = await db.select({ count: count2() }).from(leads).where(and17(...conditions));
    const total = countResult?.count || 0;
    let orderBy;
    switch (options.sortBy) {
      case "oldest":
        orderBy = asc3(leads.createdAt);
        break;
      case "score-high":
        orderBy = desc14(leads.leadScore);
        break;
      case "score-low":
        orderBy = asc3(leads.leadScore);
        break;
      default:
        orderBy = desc14(leads.createdAt);
    }
    const results = await db.select().from(leads).where(and17(...conditions)).orderBy(orderBy).limit(limit).offset(offset);
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
      eq22(leads.userId, userId),
      isNotNull4(leads.aiCategory)
    ];
    if (options?.hideLeadsWithoutPhone) {
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    if (options?.hiddenCategories && options.hiddenCategories.length > 0) {
      conditions.push(notInArray(leads.aiCategory, options.hiddenCategories));
    }
    if (options?.sourceType) {
      conditions.push(eq22(leads.sourceType, options.sourceType));
      if (options.sourceId) {
        if (options.sourceType === "campaign") {
          conditions.push(eq22(leads.campaignId, options.sourceId));
        } else {
          conditions.push(eq22(leads.incomingConnectionId, options.sourceId));
        }
      }
    }
    const results = await db.select({
      category: leads.aiCategory,
      count: count2()
    }).from(leads).where(and17(...conditions)).groupBy(leads.aiCategory);
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
    const [lead] = await db.update(leads).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and17(eq22(leads.id, id), eq22(leads.userId, userId))).returning();
    return lead || null;
  }
  static async updateLeadStage(id, userId, stage, stageId) {
    const [lead] = await db.update(leads).set({
      stage,
      stageId: stageId || null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and17(eq22(leads.id, id), eq22(leads.userId, userId))).returning();
    return lead || null;
  }
  static async deleteLead(id, userId) {
    const result = await db.delete(leads).where(and17(eq22(leads.id, id), eq22(leads.userId, userId))).returning();
    return result.length > 0;
  }
  static async bulkDeleteLeads(ids, userId) {
    if (ids.length === 0) return 0;
    const result = await db.delete(leads).where(and17(eq22(leads.userId, userId), inArray8(leads.id, ids))).returning();
    return result.length;
  }
  static async bulkUpdateStage(ids, userId, stage, stageId) {
    const result = await db.update(leads).set({
      stage,
      stageId: stageId || null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and17(
      inArray8(leads.id, ids),
      eq22(leads.userId, userId)
    )).returning();
    return result.length;
  }
  static async bulkAddTags(ids, userId, newTags) {
    const leadsToUpdate = await db.select().from(leads).where(and17(inArray8(leads.id, ids), eq22(leads.userId, userId)));
    let updated = 0;
    for (const lead of leadsToUpdate) {
      const existingTags = lead.tags || [];
      const mergedTags = Array.from(/* @__PURE__ */ new Set([...existingTags, ...newTags]));
      await db.update(leads).set({ tags: mergedTags, updatedAt: /* @__PURE__ */ new Date() }).where(eq22(leads.id, lead.id));
      updated++;
    }
    return updated;
  }
  static async bulkAssign(ids, userId, assignedUserId) {
    const result = await db.update(leads).set({
      assignedUserId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and17(
      inArray8(leads.id, ids),
      eq22(leads.userId, userId)
    )).returning();
    return result.length;
  }
  static async getLeadCountsByStage(userId, sourceType, sourceId, options) {
    const conditions = [
      eq22(leads.userId, userId),
      eq22(leads.sourceType, sourceType)
    ];
    if (sourceType === "campaign") {
      conditions.push(eq22(leads.campaignId, sourceId));
    } else {
      conditions.push(eq22(leads.incomingConnectionId, sourceId));
    }
    if (options?.hideLeadsWithoutPhone) {
      conditions.push(isNotNull4(leads.phone));
      conditions.push(sql15`TRIM(${leads.phone}) != ''`);
      conditions.push(sql15`LOWER(TRIM(${leads.phone})) != 'unknown'`);
    }
    const counts = await db.select({
      stage: leads.stage,
      count: sql15`COUNT(*)::int`
    }).from(leads).where(and17(...conditions)).groupBy(leads.stage);
    return counts;
  }
  // ============================================================
  // Lead Notes
  // ============================================================
  static async getNotesByLead(leadId) {
    return db.select().from(leadNotes).where(eq22(leadNotes.leadId, leadId)).orderBy(desc14(leadNotes.createdAt));
  }
  /**
   * Get notes count for multiple leads at once (batch operation)
   */
  static async getNotesCountByLeadIds(leadIds) {
    if (leadIds.length === 0) return /* @__PURE__ */ new Map();
    const counts = await db.select({
      leadId: leadNotes.leadId,
      count: sql15`COUNT(*)::int`
    }).from(leadNotes).where(inArray8(leadNotes.leadId, leadIds)).groupBy(leadNotes.leadId);
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
    const [note] = await db.update(leadNotes).set({ content, updatedAt: /* @__PURE__ */ new Date() }).where(and17(eq22(leadNotes.id, id), eq22(leadNotes.userId, userId))).returning();
    return note || null;
  }
  static async deleteNote(id, userId) {
    const result = await db.delete(leadNotes).where(and17(eq22(leadNotes.id, id), eq22(leadNotes.userId, userId))).returning();
    return result.length > 0;
  }
  // ============================================================
  // Source Data Helpers
  // ============================================================
  static async getUserCampaigns(userId) {
    const campaignList = await db.select({
      id: campaigns.id,
      name: campaigns.name
    }).from(campaigns).where(eq22(campaigns.userId, userId)).orderBy(desc14(campaigns.createdAt));
    const result = [];
    for (const c of campaignList) {
      const [countResult] = await db.select({ count: sql15`COUNT(*)::int` }).from(leads).where(and17(eq22(leads.campaignId, c.id), eq22(leads.userId, userId)));
      result.push({
        id: c.id,
        name: c.name,
        totalLeads: countResult?.count || 0
      });
    }
    return result;
  }
  static async getUserIncomingConnections(userId) {
    const connections = await db.select().from(incomingConnections).where(eq22(incomingConnections.userId, userId));
    const result = [];
    for (const conn of connections) {
      const [countResult] = await db.select({ count: sql15`COUNT(*)::int` }).from(leads).where(and17(eq22(leads.incomingConnectionId, conn.id), eq22(leads.userId, userId)));
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
    return db.select().from(leadActivities).where(and17(eq22(leadActivities.leadId, leadId), eq22(leadActivities.userId, userId))).orderBy(desc14(leadActivities.createdAt));
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
    const [totalResult] = await db.select({ count: count2() }).from(leads).where(eq22(leads.userId, userId));
    const totalLeads = totalResult?.count || 0;
    const categoryResults = await db.select({ category: leads.aiCategory, count: count2() }).from(leads).where(and17(eq22(leads.userId, userId), isNotNull4(leads.aiCategory))).groupBy(leads.aiCategory);
    const leadsByCategory = categoryResults.map((r) => ({
      category: r.category || "uncategorized",
      count: Number(r.count)
    }));
    const stageResults = await db.select({ stage: leads.stage, count: count2() }).from(leads).where(eq22(leads.userId, userId)).groupBy(leads.stage);
    const leadsByStage = stageResults.map((r) => ({ stage: r.stage, count: Number(r.count) }));
    const sourceResults = await db.select({ sourceType: leads.sourceType, count: count2() }).from(leads).where(eq22(leads.userId, userId)).groupBy(leads.sourceType);
    const leadsBySource = sourceResults.map((r) => ({ sourceType: r.sourceType, count: Number(r.count) }));
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateResults = await db.select({
      date: sql15`DATE(${leads.createdAt})`,
      count: count2()
    }).from(leads).where(and17(eq22(leads.userId, userId), gte8(leads.createdAt, thirtyDaysAgo))).groupBy(sql15`DATE(${leads.createdAt})`).orderBy(sql15`DATE(${leads.createdAt})`);
    const leadsByDate = dateResults.map((r) => ({ date: r.date, count: Number(r.count) }));
    const [scoreResult] = await db.select({ avg: sql15`COALESCE(AVG(${leads.leadScore}), 0)` }).from(leads).where(and17(eq22(leads.userId, userId), sql15`${leads.leadScore} IS NOT NULL`));
    const avgLeadScore = Math.round(scoreResult?.avg || 0);
    const sentimentResults = await db.select({ sentiment: leads.sentiment, count: count2() }).from(leads).where(and17(eq22(leads.userId, userId), sql15`${leads.sentiment} IS NOT NULL`)).groupBy(leads.sentiment);
    const sentimentBreakdown = sentimentResults.map((r) => ({
      sentiment: r.sentiment || "unknown",
      count: Number(r.count)
    }));
    const stageChanges = await db.select().from(leadActivities).where(and17(
      eq22(leadActivities.userId, userId),
      eq22(leadActivities.activityType, "stage_change")
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
    const allLeads = await db.select({ tags: leads.tags }).from(leads).where(eq22(leads.userId, userId));
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
    const [prefs] = await db.select().from(crmCategoryPreferences).where(eq22(crmCategoryPreferences.userId, userId));
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
    const [updated] = await db.update(crmCategoryPreferences).set(updateData).where(eq22(crmCategoryPreferences.id, existing.id)).returning();
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

// server/services/call-actions/leads.ts
init_hub();

// server/services/call-actions/callbacks.ts
init_db();
init_schema();
import { and as and19, eq as eq24 } from "drizzle-orm";
init_webhook_delivery();

// server/services/call-actions/api-tools.ts
init_url_validator();
var MAX_RESPONSE_BYTES = 8 * 1024;

// server/engines/plivo/services/call-outcome.ts
init_db();
init_schema();
import { eq as eq25 } from "drizzle-orm";

// server/services/call-actions/outcome.ts
init_schema();

// server/services/call-actions/index.ts
function readActionsConfig(config) {
  if (!config || typeof config !== "object") return {};
  const actions = config.actions;
  return actions && typeof actions === "object" && !Array.isArray(actions) ? actions : {};
}

// server/services/callback-service.ts
init_webhook_delivery();

// server/services/call-variables.ts
var VARIABLE_KEY_RE = /^[a-zA-Z0-9_]{1,40}$/;
var MAX_VARIABLES = 20;
var MAX_VARIABLE_VALUE_LENGTH = 300;
function parseCallVariables(input) {
  if (input == null) return { variables: {} };
  if (typeof input !== "object" || Array.isArray(input)) return { error: "variables must be an object of key \u2192 value" };
  const entries = Object.entries(input);
  if (entries.length > MAX_VARIABLES) return { error: `At most ${MAX_VARIABLES} variables are allowed` };
  const variables = {};
  for (const [key, raw] of entries) {
    if (!VARIABLE_KEY_RE.test(key)) return { error: `Variable name "${key}" must match ${VARIABLE_KEY_RE.source}` };
    if (raw == null) continue;
    if (typeof raw !== "string" && typeof raw !== "number" && typeof raw !== "boolean") {
      return { error: `Variable "${key}" must be a string, number or boolean` };
    }
    const value = String(raw).replace(/[\r\n\t]+/g, " ").trim();
    if (value.length > MAX_VARIABLE_VALUE_LENGTH) return { error: `Variable "${key}" must be at most ${MAX_VARIABLE_VALUE_LENGTH} characters` };
    variables[key] = value;
  }
  return { variables };
}

// server/services/callback-service.ts
var CALLBACK_STATUSES = ["pending", "calling", "completed", "failed", "cancelled"];
var MAX_DAYS_AHEAD = 60;
var MAX_EXTERNAL_REF = 120;
var CallbackError = class extends Error {
  constructor(status, code, message, reason) {
    super(message);
    this.status = status;
    this.code = code;
    this.reason = reason;
  }
};
function shapeCallback(row, agentName) {
  return {
    id: row.id,
    contactName: row.contactName,
    contactPhone: row.contactPhone,
    reason: row.reason,
    scheduledAt: row.scheduledAt,
    timeZone: row.timeZone,
    status: row.status,
    attempts: row.attempts,
    lastError: row.lastError,
    agentId: row.agentId,
    agentName: agentName ?? null,
    resultCallId: row.resultCallId,
    variables: row.variables ?? null,
    externalRef: row.externalRef ?? null,
    source: row.source,
    createdAt: row.createdAt
  };
}
function isCallbackStatus(s) {
  return typeof s === "string" && CALLBACK_STATUSES.includes(s);
}
async function resolveCallbackAgent(userId, agentId) {
  const id = typeof agentId === "string" ? agentId.trim() : "";
  if (!id) throw new CallbackError(400, "VALIDATION_ERROR", "agentId is required");
  const [agent] = await db.select({ id: agents.id, name: agents.name, config: agents.config }).from(agents).where(and20(eq26(agents.id, id), eq26(agents.userId, userId))).limit(1);
  if (!agent) throw new CallbackError(404, "NOT_FOUND", "Agent not found or does not belong to you.");
  const tz = readActionsConfig(agent.config).appointments?.timeZone;
  return { id: agent.id, name: agent.name, timeZone: tz && isValidTimeZone2(tz) ? tz : null };
}
var clean = (v, max) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().substring(0, max) : "") || null;
function parseScheduledAt(raw, now = Date.now()) {
  const at = raw instanceof Date ? raw : new Date(String(raw ?? ""));
  if (Number.isNaN(at.getTime())) throw new CallbackError(400, "VALIDATION_ERROR", "scheduledAt must be an ISO date-time", "past");
  if (at.getTime() <= now) throw new CallbackError(400, "VALIDATION_ERROR", "scheduledAt must be in the future", "past");
  if (at.getTime() > now + MAX_DAYS_AHEAD * 864e5) {
    throw new CallbackError(400, "VALIDATION_ERROR", `scheduledAt must be within ${MAX_DAYS_AHEAD} days`, "too_far");
  }
  return at;
}
async function findByExternalRef(userId, externalRef) {
  const [row] = await db.select().from(scheduledCallbacks).where(and20(eq26(scheduledCallbacks.userId, userId), eq26(scheduledCallbacks.externalRef, externalRef))).limit(1);
  return row;
}
async function resolveFromNumberId(userId, fromNumber) {
  const phone = normalizePhone(fromNumber);
  if (!phone) return null;
  const [row] = await db.select({ id: plivoPhoneNumbers.id }).from(plivoPhoneNumbers).where(and20(eq26(plivoPhoneNumbers.userId, userId), eq26(plivoPhoneNumbers.phoneNumber, phone))).limit(1);
  return row?.id ?? null;
}
async function createCallback(userId, input, source, agent) {
  const resolvedAgent = agent ?? await resolveCallbackAgent(userId, input.agentId);
  const contactPhone = normalizePhone(input.contactPhone);
  if (!contactPhone) throw new CallbackError(400, "VALIDATION_ERROR", "A valid phone number with country code is required", "invalid_phone");
  const scheduledAt = parseScheduledAt(input.scheduledAt);
  const parsed = parseCallVariables(input.variables);
  if ("error" in parsed) throw new CallbackError(400, "VALIDATION_ERROR", parsed.error);
  const variables = Object.keys(parsed.variables).length ? parsed.variables : null;
  const externalRef = clean(input.externalRef, MAX_EXTERNAL_REF);
  if (externalRef) {
    const existing = await findByExternalRef(userId, externalRef);
    if (existing) return { callback: shapeCallback(existing, resolvedAgent.name), created: false };
  }
  if (await isDoNotCall(userId, contactPhone)) {
    throw new CallbackError(409, "DO_NOT_CALL", "This number is on your do-not-call list.", "do_not_call");
  }
  const timeZone = input.timeZone && isValidTimeZone2(input.timeZone) ? input.timeZone : resolvedAgent.timeZone || DEFAULT_TIME_ZONE;
  const values = {
    userId,
    agentId: resolvedAgent.id,
    contactPhone,
    scheduledAt,
    timeZone,
    status: "pending",
    source,
    variables,
    externalRef,
    contactName: clean(input.contactName, 120),
    reason: clean(input.reason, 200),
    plivoPhoneNumberId: await resolveFromNumberId(userId, input.fromNumber)
  };
  let row;
  try {
    [row] = await db.insert(scheduledCallbacks).values(values).returning();
  } catch (e) {
    if (e?.code === "23505" && externalRef) row = await findByExternalRef(userId, externalRef);
    if (!row) throw e;
    return { callback: shapeCallback(row, resolvedAgent.name), created: false };
  }
  void afterScheduled(userId, row, resolvedAgent);
  return { callback: shapeCallback(row, resolvedAgent.name), created: true };
}
async function afterScheduled(userId, row, agent) {
  try {
    await db.update(leads).set({ hasCallback: true, callbackScheduled: row.scheduledAt, callbackCompleted: false, updatedAt: /* @__PURE__ */ new Date() }).where(and20(eq26(leads.userId, userId), eq26(leads.phone, row.contactPhone)));
  } catch (e) {
    console.error(`[Callbacks] lead flag update failed for ${row.id}: ${e.message}`);
  }
  void webhookDeliveryService.triggerEvent(userId, "callback.scheduled", {
    callback: {
      id: row.id,
      contactName: row.contactName,
      contactPhone: row.contactPhone,
      reason: row.reason,
      scheduledAt: row.scheduledAt.toISOString(),
      timeZone: row.timeZone,
      status: row.status,
      source: row.source,
      externalRef: row.externalRef
    },
    call: null,
    agent: { id: agent.id, name: agent.name }
  });
}
async function listCallbacks(userId, opts) {
  const where = isCallbackStatus(opts.status) ? and20(eq26(scheduledCallbacks.userId, userId), eq26(scheduledCallbacks.status, opts.status)) : eq26(scheduledCallbacks.userId, userId);
  const [rows, [{ count: count3 }]] = await Promise.all([
    db.select({ row: scheduledCallbacks, agentName: agents.name }).from(scheduledCallbacks).leftJoin(agents, eq26(agents.id, scheduledCallbacks.agentId)).where(where).orderBy(desc15(scheduledCallbacks.createdAt)).limit(opts.limit).offset(opts.offset ?? 0),
    db.select({ count: sql16`count(*)::int` }).from(scheduledCallbacks).where(where)
  ]);
  return { rows: rows.map((r) => shapeCallback(r.row, r.agentName)), total: Number(count3) };
}
async function cancelCallback(userId, by) {
  const key = by.id ? eq26(scheduledCallbacks.id, by.id) : by.externalRef ? eq26(scheduledCallbacks.externalRef, by.externalRef) : null;
  if (!key) return null;
  const [row] = await db.update(scheduledCallbacks).set({ status: "cancelled", updatedAt: /* @__PURE__ */ new Date() }).where(and20(key, eq26(scheduledCallbacks.userId, userId), eq26(scheduledCallbacks.status, "pending"))).returning();
  return row ? shapeCallback(row) : null;
}

// plugins/rest-api/routes/callbacks.routes.ts
var router9 = Router9();
var variablesSchema = z7.record(
  z7.string().regex(VARIABLE_KEY_RE, "Variable names: letters, digits, underscore (max 40)"),
  z7.union([z7.string().max(300), z7.number(), z7.boolean()])
).refine((v) => Object.keys(v).length <= MAX_VARIABLES, { message: `At most ${MAX_VARIABLES} variables` }).optional();
var createSchema = z7.object({
  agentId: z7.string().min(1),
  contactPhone: z7.string().min(8).max(32),
  scheduledAt: z7.string().min(1),
  contactName: z7.string().max(120).optional(),
  reason: z7.string().max(200).optional(),
  timeZone: z7.string().max(64).optional(),
  variables: variablesSchema,
  externalRef: z7.string().trim().min(1).max(MAX_EXTERNAL_REF).optional()
});
var bulkSchema = z7.object({
  agentId: z7.string().min(1),
  timeZone: z7.string().max(64).optional(),
  contacts: z7.array(z7.object({
    phone: z7.string().min(1).max(32),
    name: z7.string().max(120).optional(),
    scheduledAt: z7.string().min(1),
    variables: variablesSchema,
    externalRef: z7.string().trim().min(1).max(MAX_EXTERNAL_REF).optional(),
    reason: z7.string().max(200).optional()
  })).min(1).max(500)
});
async function scheduleBulk(userId, body) {
  const agent = await resolveCallbackAgent(userId, body.agentId);
  const result = { created: [], skipped: [] };
  for (const c of body.contacts) {
    const externalRef = c.externalRef || null;
    try {
      const { callback, created } = await createCallback(userId, {
        agentId: agent.id,
        contactPhone: c.phone,
        contactName: c.name,
        scheduledAt: c.scheduledAt,
        variables: c.variables,
        externalRef,
        reason: c.reason,
        timeZone: body.timeZone
      }, "api", agent);
      if (created) result.created.push({ id: callback.id, phone: callback.contactPhone, externalRef: callback.externalRef, scheduledAt: callback.scheduledAt });
      else result.skipped.push({ phone: callback.contactPhone, externalRef, reason: "duplicate" });
    } catch (e) {
      if (e instanceof CallbackError && e.reason) result.skipped.push({ phone: c.phone, externalRef, reason: e.reason });
      else throw e;
    }
  }
  return result;
}
function sendCallbackError(req, res, error) {
  if (!(error instanceof CallbackError)) return false;
  sendError2(req, res, error.status, error.code, error.message, error.reason ? { reason: error.reason } : void 0);
  return true;
}
router9.get(
  "/",
  apiAuthMiddleware("calls:read"),
  asyncHandler(async (req, res) => {
    const status = queryString(req, "status");
    if (status && !CALLBACK_STATUSES.includes(status)) {
      return sendError2(req, res, 400, "VALIDATION_ERROR", `status must be one of: ${CALLBACK_STATUSES.join(", ")}`);
    }
    const { page, pageSize, offset } = pageParams(req, 50);
    const { rows, total } = await listCallbacks(req.apiAuth.userId, { status, limit: pageSize, offset });
    sendData(req, res, rows, 200, paginationMeta(page, pageSize, total));
  })
);
router9.post(
  "/",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    try {
      const { callback, created } = await createCallback(req.apiAuth.userId, parsed.data, "api");
      sendData(req, res, callback, created ? 201 : 200);
    } catch (error) {
      if (!sendCallbackError(req, res, error)) throw error;
    }
  })
);
router9.post(
  "/bulk",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const parsed = bulkSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    try {
      sendData(req, res, await scheduleBulk(req.apiAuth.userId, parsed.data), 201);
    } catch (error) {
      if (!sendCallbackError(req, res, error)) throw error;
    }
  })
);
router9.delete(
  "/",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const externalRef = queryString(req, "externalRef");
    if (!externalRef) return sendError2(req, res, 400, "VALIDATION_ERROR", 'Query parameter "externalRef" is required.');
    const callback = await cancelCallback(req.apiAuth.userId, { externalRef });
    if (!callback) return sendNotFound(req, res, "Pending callback");
    sendData(req, res, { cancelled: true, callback });
  })
);
router9.delete(
  "/:id",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const callback = await cancelCallback(req.apiAuth.userId, { id: req.params.id });
    if (!callback) return sendNotFound(req, res, "Pending callback");
    sendData(req, res, { cancelled: true, callback });
  })
);
var callbacks_routes_default = router9;

// plugins/rest-api/routes/leads.routes.ts
import { Router as Router11 } from "express";
import { and as and22, desc as desc16, eq as eq28, gte as gte9, ilike as ilike5, isNull as isNull6, or as or8, sql as sql18 } from "drizzle-orm";
import { z as z10 } from "zod";
init_schema();

// server/routes/crm-inbox-routes.ts
init_db();
init_schema();
import { Router as Router10 } from "express";
import { z as z9 } from "zod";
import { and as and21, eq as eq27, isNull as isNull5, inArray as inArray9, ilike as ilike4, or as or7, sql as sql17 } from "drizzle-orm";

// shared/schema-crm-inbox.ts
import { pgTable as pgTable2, varchar as varchar2, text as text2, integer as integer2, jsonb as jsonb2, timestamp as timestamp2 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema2 } from "drizzle-zod";
import { z as z8 } from "zod";
var AUTO_ASSIGN_MODES = ["off", "round_robin"];
var DEFAULT_SLA_HOURS = { new: 24, contacted: 48, qualified: 72 };
var DEFAULT_SLA_FALLBACK_HOURS = 48;
var SLA_CLOSED_STAGES = ["not_interested"];
var crmInboxSettings = pgTable2("crm_inbox_settings", {
  userId: varchar2("user_id").primaryKey(),
  autoAssign: text2("auto_assign").notNull().default("off"),
  slaHours: jsonb2("sla_hours").$type().notNull().default(DEFAULT_SLA_HOURS),
  defaultSlaHours: integer2("default_sla_hours").notNull().default(DEFAULT_SLA_FALLBACK_HOURS),
  /** Assignee id that received the last round-robin lead; the next one goes to the following member. */
  roundRobinCursor: text2("round_robin_cursor"),
  createdAt: timestamp2("created_at").notNull().defaultNow(),
  updatedAt: timestamp2("updated_at").notNull().defaultNow()
});
var insertCrmInboxSettingsSchema = createInsertSchema2(crmInboxSettings).omit({
  createdAt: true,
  updatedAt: true
});
var hours = z8.number().int().min(0).max(24 * 30);
var updateCrmInboxSettingsSchema = z8.object({
  autoAssign: z8.enum(AUTO_ASSIGN_MODES).optional(),
  slaHours: z8.record(z8.string().min(1).max(64), hours).optional(),
  defaultSlaHours: hours.optional()
}).strict();
var INBOX_FILTERS = ["mine", "unassigned", "overdue", "all"];
function slaHoursForStage(settings, stage) {
  if (SLA_CLOSED_STAGES.includes(stage)) return 0;
  const configured = settings.slaHours?.[stage];
  return typeof configured === "number" ? configured : settings.defaultSlaHours;
}
function evaluateSla(updatedAt, slaHours, now = /* @__PURE__ */ new Date()) {
  if (!slaHours || slaHours <= 0) return { status: "none", dueAt: null };
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(updated)) return { status: "none", dueAt: null };
  const dueMs = updated + slaHours * 36e5;
  const remaining = dueMs - now.getTime();
  const warnWindow = Math.max(2 * 36e5, slaHours * 36e5 * 0.25);
  const status = remaining < 0 ? "overdue" : remaining <= warnWindow ? "due_soon" : "ok";
  return { status, dueAt: new Date(dueMs).toISOString() };
}

// server/plugins/team-management-adapter.ts
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var PLUGIN_DIR = path.resolve(__dirname, "..", "..", "plugins", "team-management");
var cachedServices = {};
function getTeamService() {
  return cachedServices.TeamService || null;
}

// server/routes/crm-inbox-routes.ts
var router10 = Router10();
var requireAuth = (req, res, next) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  next();
};
var actorId = (req) => req.isTeamMember && req.teamMember ? req.teamMember.memberId : req.userId;
async function getInboxSettings(userId) {
  const [existing] = await db.select().from(crmInboxSettings).where(eq27(crmInboxSettings.userId, userId));
  if (existing) return existing;
  const [created] = await db.insert(crmInboxSettings).values({ userId }).onConflictDoNothing().returning();
  if (created) return created;
  const [row] = await db.select().from(crmInboxSettings).where(eq27(crmInboxSettings.userId, userId));
  return row;
}
async function listAssignees(ownerUserId) {
  const out = [];
  const [owner] = await db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq27(users.id, ownerUserId));
  if (owner) out.push({ id: owner.id, name: owner.name || owner.email, kind: "owner" });
  try {
    const TeamService = getTeamService();
    const team = TeamService ? await TeamService.getTeamByUserId(ownerUserId) : null;
    if (team) {
      const members = await TeamService.getMembersByTeam(team.id);
      for (const m of members) {
        if (m.status !== "active") continue;
        out.push({ id: m.id, name: `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.email, kind: "member" });
      }
    }
  } catch (err) {
    console.error("[CRM Inbox] Could not load team members:", err);
  }
  return out;
}
router10.get("/inbox/assignees", requireAuth, async (req, res) => {
  try {
    res.json(await listAssignees(req.userId));
  } catch (err) {
    console.error("[CRM Inbox] assignees:", err);
    res.status(500).json({ error: "Failed to load assignees" });
  }
});
router10.get("/inbox/settings", requireAuth, async (req, res) => {
  try {
    res.json(publicSettings(await getInboxSettings(req.userId)));
  } catch (err) {
    console.error("[CRM Inbox] settings:", err);
    res.status(500).json({ error: "Failed to load settings" });
  }
});
router10.put("/inbox/settings", requireAuth, async (req, res) => {
  try {
    const patch = updateCrmInboxSettingsSchema.parse(req.body ?? {});
    await getInboxSettings(req.userId);
    const [row] = await db.update(crmInboxSettings).set({ ...patch, updatedAt: /* @__PURE__ */ new Date() }).where(eq27(crmInboxSettings.userId, req.userId)).returning();
    res.json(publicSettings(row));
  } catch (err) {
    if (err instanceof z9.ZodError) return res.status(400).json({ error: "Invalid settings", details: err.errors });
    console.error("[CRM Inbox] save settings:", err);
    res.status(500).json({ error: "Failed to save settings" });
  }
});
function publicSettings(s) {
  return { autoAssign: s.autoAssign, slaHours: s.slaHours, defaultSlaHours: s.defaultSlaHours, closedStages: SLA_CLOSED_STAGES };
}
function slaHoursSql(settings) {
  const parts = [sql17`CASE ${leads.stage}`];
  for (const stage of SLA_CLOSED_STAGES) parts.push(sql17`WHEN ${stage} THEN 0`);
  for (const [stage, hours2] of Object.entries(settings.slaHours || {})) parts.push(sql17`WHEN ${stage} THEN ${Number(hours2) || 0}`);
  parts.push(sql17`ELSE ${settings.defaultSlaHours} END`);
  return sql17.join(parts, sql17` `);
}
var overdueSql = (settings) => sql17`(${slaHoursSql(settings)}) > 0 AND ${leads.updatedAt} < now() - ((${slaHoursSql(settings)}) * interval '1 hour')`;
var inboxQuerySchema = z9.object({
  filter: z9.enum(INBOX_FILTERS).default("all"),
  stage: z9.string().max(64).optional(),
  q: z9.string().max(120).optional(),
  limit: z9.coerce.number().int().min(1).max(100).default(25),
  offset: z9.coerce.number().int().min(0).default(0)
});
router10.get("/inbox", requireAuth, async (req, res) => {
  try {
    const query = inboxQuerySchema.parse(req.query);
    const userId = req.userId;
    const [settings, assignees] = await Promise.all([getInboxSettings(userId), listAssignees(userId)]);
    const me = actorId(req);
    const base = [eq27(leads.userId, userId)];
    if (query.stage && query.stage !== "all") base.push(eq27(leads.stage, query.stage));
    if (query.q?.trim()) {
      const pattern = `%${query.q.trim().replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`;
      base.push(or7(
        ilike4(leads.firstName, pattern),
        ilike4(leads.lastName, pattern),
        ilike4(leads.phone, pattern),
        ilike4(leads.email, pattern),
        ilike4(leads.company, pattern)
      ));
    }
    const byFilter = {
      mine: eq27(leads.assignedUserId, me),
      unassigned: isNull5(leads.assignedUserId),
      overdue: overdueSql(settings),
      all: void 0
    };
    const where = and21(...base, byFilter[query.filter]);
    const lastNoteAt = sql17`(SELECT MAX(${leadNotes.createdAt}) FROM ${leadNotes} WHERE ${leadNotes.leadId} = ${leads.id})`;
    const [rows, [counts], stages] = await Promise.all([
      db.select({
        id: leads.id,
        firstName: leads.firstName,
        lastName: leads.lastName,
        phone: leads.phone,
        email: leads.email,
        company: leads.company,
        stage: leads.stage,
        leadScore: leads.leadScore,
        aiNextAction: leads.aiNextAction,
        hasCallback: leads.hasCallback,
        callbackScheduled: leads.callbackScheduled,
        assignedUserId: leads.assignedUserId,
        lastCallAt: leads.lastCallAt,
        totalCalls: leads.totalCalls,
        createdAt: leads.createdAt,
        updatedAt: leads.updatedAt,
        lastNoteAt,
        isOverdue: sql17`(${overdueSql(settings)})`
      }).from(leads).where(where).orderBy(sql17`(${overdueSql(settings)}) DESC`, leads.updatedAt).limit(query.limit).offset(query.offset),
      db.select({
        total: sql17`count(*)::int`,
        mine: sql17`count(*) FILTER (WHERE ${eq27(leads.assignedUserId, me)})::int`,
        unassigned: sql17`count(*) FILTER (WHERE ${leads.assignedUserId} IS NULL)::int`,
        overdue: sql17`count(*) FILTER (WHERE ${overdueSql(settings)})::int`,
        filtered: sql17`count(*) FILTER (WHERE ${byFilter[query.filter] ?? sql17`true`})::int`
      }).from(leads).where(and21(...base)),
      db.select({ stage: leads.stage, count: sql17`count(*)::int` }).from(leads).where(eq27(leads.userId, userId)).groupBy(leads.stage).orderBy(leads.stage)
    ]);
    const names = new Map(assignees.map((a) => [a.id, a.name]));
    const out = rows.map((r) => {
      const hours2 = slaHoursForStage(settings, r.stage);
      const sla = evaluateSla(r.updatedAt, hours2);
      const contact = [r.lastCallAt, r.lastNoteAt].filter(Boolean).map((d) => new Date(d).getTime());
      return {
        ...r,
        name: `${r.firstName || ""} ${r.lastName || ""}`.trim() || r.phone,
        assigneeName: r.assignedUserId ? names.get(r.assignedUserId) ?? null : null,
        lastContactAt: contact.length ? new Date(Math.max(...contact)).toISOString() : null,
        slaHours: hours2,
        slaDueAt: sla.dueAt,
        slaStatus: r.isOverdue ? "overdue" : sla.status
      };
    });
    res.json({
      leads: out,
      total: counts.filtered,
      stages,
      counts: { all: counts.total, mine: counts.mine, unassigned: counts.unassigned, overdue: counts.overdue }
    });
  } catch (err) {
    if (err instanceof z9.ZodError) return res.status(400).json({ error: "Invalid query", details: err.errors });
    console.error("[CRM Inbox] list:", err);
    res.status(500).json({ error: "Failed to load inbox" });
  }
});
async function logTeam(req, action, targetId, metadata) {
  if (!req.isTeamMember || !req.teamMember) return;
  try {
    await getTeamService()?.logActivity(req.teamMember.teamId, req.teamMember.memberId, action, "lead", targetId, metadata, req.ip);
  } catch (err) {
    console.error("[CRM Inbox] team activity log failed:", err);
  }
}
async function resolveAssignee(ownerUserId, userId) {
  if (userId === null) return null;
  if (typeof userId !== "string" || !userId) return void 0;
  return (await listAssignees(ownerUserId)).find((a) => a.id === userId)?.name;
}
router10.post("/leads/:id/assign", requireAuth, async (req, res) => {
  try {
    const assigneeName = await resolveAssignee(req.userId, req.body?.userId ?? null);
    if (assigneeName === void 0) return res.status(400).json({ error: "userId must be an assignee id or null" });
    const assignedUserId = assigneeName === null ? null : req.body.userId;
    const [lead] = await db.update(leads).set({ assignedUserId }).where(and21(eq27(leads.id, req.params.id), eq27(leads.userId, req.userId))).returning();
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    await CRMStorage.createActivity({
      leadId: lead.id,
      userId: req.userId,
      activityType: "assigned",
      title: assigneeName ? `Assigned to ${assigneeName}` : "Unassigned",
      metadata: {}
    });
    await logTeam(req, "assign_lead", lead.id, { assignedUserId });
    res.json({ ...lead, assigneeName });
  } catch (err) {
    console.error("[CRM Inbox] assign:", err);
    res.status(500).json({ error: "Failed to assign lead" });
  }
});
var bulkAssignSchema = z9.object({ leadIds: z9.array(z9.string().min(1)).min(1).max(500), userId: z9.string().min(1).nullable() });
router10.post("/leads/bulk-assign", requireAuth, async (req, res) => {
  try {
    const { leadIds, userId } = bulkAssignSchema.parse(req.body);
    const assigneeName = await resolveAssignee(req.userId, userId);
    if (assigneeName === void 0) return res.status(400).json({ error: "userId must be an assignee id or null" });
    const updated = await db.update(leads).set({ assignedUserId: userId }).where(and21(inArray9(leads.id, leadIds), eq27(leads.userId, req.userId))).returning({ id: leads.id });
    await logTeam(req, "bulk_assign_leads", void 0, { count: updated.length, assignedUserId: userId });
    res.json({ updated: updated.length, assigneeName });
  } catch (err) {
    if (err instanceof z9.ZodError) return res.status(400).json({ error: "Invalid payload", details: err.errors });
    console.error("[CRM Inbox] bulk assign:", err);
    res.status(500).json({ error: "Failed to assign leads" });
  }
});
var noteSchema = z9.object({ text: z9.string().trim().min(1).max(4e3) });
router10.post("/leads/:id/note", requireAuth, async (req, res) => {
  try {
    const { text: text3 } = noteSchema.parse(req.body);
    const lead = await CRMStorage.getLeadById(req.params.id, req.userId);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    const note = await CRMStorage.createNote({ leadId: lead.id, userId: req.userId, content: text3 });
    await CRMStorage.logNoteAdded(lead.id, req.userId, note.id, text3);
    await db.update(leads).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq27(leads.id, lead.id));
    await logTeam(req, "add_note", lead.id, { noteId: note.id, contentPreview: text3.slice(0, 100) });
    res.status(201).json(note);
  } catch (err) {
    if (err instanceof z9.ZodError) return res.status(400).json({ error: "text is required (max 4000 chars)", details: err.errors });
    console.error("[CRM Inbox] note:", err);
    res.status(500).json({ error: "Failed to add note" });
  }
});

// plugins/rest-api/routes/leads.routes.ts
init_hub();
var router11 = Router11();
var patchSchema = z10.object({
  stage: z10.string().trim().min(1).max(60).optional(),
  tags: z10.array(z10.string().trim().min(1).max(50)).max(50).optional(),
  customFields: z10.record(z10.unknown()).refine((v) => Object.keys(v).length <= 100, { message: "At most 100 custom fields" }).optional(),
  assignedUserId: z10.string().min(1).nullable().optional(),
  email: z10.string().trim().email().max(255).or(z10.literal("")).nullable().optional(),
  company: z10.string().trim().max(200).nullable().optional()
}).strict();
var noteSchema2 = z10.object({ text: z10.string().trim().min(1).max(4e3) });
function shapeLead(l) {
  return {
    id: l.id,
    firstName: l.firstName,
    lastName: l.lastName,
    phone: l.phone,
    email: l.email,
    company: l.company,
    stage: l.stage,
    leadScore: l.leadScore,
    aiCategory: l.aiCategory,
    aiSummary: l.aiSummary,
    aiNextAction: l.aiNextAction,
    sentiment: l.sentiment,
    hasAppointment: l.hasAppointment,
    hasCallback: l.hasCallback,
    tags: l.tags ?? [],
    customFields: l.customFields ?? {},
    assignedUserId: l.assignedUserId,
    sourceType: l.sourceType,
    totalCalls: l.totalCalls,
    lastCallAt: l.lastCallAt,
    callId: l.callId ?? l.plivoCallId ?? l.twilioOpenaiCallId ?? null,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt
  };
}
var shapeNote = (n) => ({ id: n.id, text: n.content, createdAt: n.createdAt });
async function stageMap(userId) {
  const rows = await CRMStorage.ensureDefaultStages(userId);
  const map = /* @__PURE__ */ new Map();
  for (const s of rows) {
    const key = DEFAULT_STAGES.find((d) => d.name === s.name)?.stage || s.name.toLowerCase().replace(/\s+/g, "_");
    map.set(key, { id: s.id, name: s.name });
  }
  return map;
}
async function ownLead(userId, id) {
  const [lead] = await db2.select().from(leads).where(and22(eq28(leads.id, id), eq28(leads.userId, userId))).limit(1);
  return lead;
}
router11.get(
  "/",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { page, pageSize, offset } = pageParams(req, 50);
    const conditions = [eq28(leads.userId, userId)];
    const stage = queryString(req, "stage");
    if (stage) conditions.push(eq28(leads.stage, stage));
    const since = queryDate(req, "since");
    if (since) conditions.push(gte9(leads.updatedAt, since));
    const assigned = queryString(req, "assigned");
    if (assigned === "none") conditions.push(isNull6(leads.assignedUserId));
    else if (assigned) conditions.push(eq28(leads.assignedUserId, assigned));
    const q = queryString(req, "q").replace(/[%_]/g, "");
    if (q) {
      const like = `%${q}%`;
      conditions.push(or8(ilike5(leads.phone, like), ilike5(leads.firstName, like), ilike5(leads.lastName, like), ilike5(leads.email, like), ilike5(leads.company, like)));
    }
    const where = and22(...conditions);
    const [rows, countRows] = await Promise.all([
      db2.select().from(leads).where(where).orderBy(desc16(leads.updatedAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql18`count(*)` }).from(leads).where(where)
    ]);
    sendData(req, res, rows.map(shapeLead), 200, paginationMeta(page, pageSize, Number(countRows[0]?.count || 0)));
  })
);
router11.get(
  "/:id",
  apiAuthMiddleware("contacts:read"),
  asyncHandler(async (req, res) => {
    const lead = await ownLead(req.apiAuth.userId, req.params.id);
    if (!lead) return sendNotFound(req, res, "Lead");
    const notes = await db2.select().from(leadNotes).where(eq28(leadNotes.leadId, lead.id)).orderBy(desc16(leadNotes.createdAt)).limit(200);
    sendData(req, res, { ...shapeLead(lead), notes: notes.map(shapeNote) });
  })
);
router11.patch(
  "/:id",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const existing = await ownLead(userId, req.params.id);
    if (!existing) return sendNotFound(req, res, "Lead");
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const body = parsed.data;
    const patch = { updatedAt: /* @__PURE__ */ new Date() };
    let stageChange = null;
    if (body.stage !== void 0 && body.stage !== existing.stage) {
      const stages = await stageMap(userId);
      const target = stages.get(body.stage);
      if (!target) {
        return sendError2(req, res, 400, "VALIDATION_ERROR", `Unknown stage "${body.stage}"`, { allowedStages: Array.from(stages.keys()) });
      }
      patch.stage = body.stage;
      patch.stageId = target.id;
      stageChange = { to: target, toKey: body.stage };
    }
    if (body.assignedUserId !== void 0) {
      if (body.assignedUserId !== null && !(await listAssignees(userId)).some((a) => a.id === body.assignedUserId)) {
        return sendError2(req, res, 400, "VALIDATION_ERROR", "assignedUserId must be one of your assignees (owner or team member) or null");
      }
      patch.assignedUserId = body.assignedUserId;
    }
    if (body.tags !== void 0) patch.tags = Array.from(new Set(body.tags));
    if (body.customFields !== void 0) patch.customFields = { ...existing.customFields || {}, ...body.customFields };
    if (body.email !== void 0) patch.email = body.email || null;
    if (body.company !== void 0) patch.company = body.company || null;
    const [updated] = await db2.update(leads).set(patch).where(eq28(leads.id, existing.id)).returning();
    if (stageChange) {
      const stages = await stageMap(userId);
      const fromName = Array.from(stages.entries()).find(([key]) => key === existing.stage)?.[1].name || existing.stage;
      await CRMStorage.logStageChange(existing.id, userId, existing.stage, stageChange.toKey, fromName, stageChange.to.name);
    }
    void integrationHub.onLeadUpserted(userId, updated, { created: false, callData: null });
    sendData(req, res, shapeLead(updated));
  })
);
router11.post(
  "/:id/notes",
  apiAuthMiddleware("contacts:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const lead = await ownLead(userId, req.params.id);
    if (!lead) return sendNotFound(req, res, "Lead");
    const parsed = noteSchema2.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const note = await CRMStorage.createNote({ leadId: lead.id, userId, content: parsed.data.text });
    await CRMStorage.logNoteAdded(lead.id, userId, note.id, parsed.data.text);
    const [updated] = await db2.update(leads).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq28(leads.id, lead.id)).returning();
    void integrationHub.onLeadUpserted(userId, updated || lead, { created: false, callData: null });
    sendData(req, res, shapeNote(note), 201);
  })
);
var leads_routes_default = router11;

// plugins/rest-api/routes/appointments.routes.ts
import { Router as Router12 } from "express";
import { and as and23, desc as desc17, eq as eq29, gte as gte10, lte as lte5, sql as sql19 } from "drizzle-orm";
import { z as z11 } from "zod";
init_schema();
init_webhook_delivery();
var router12 = Router12();
var APPOINTMENT_STATUSES = ["scheduled", "confirmed", "cancelled", "completed", "no_show"];
var patchSchema2 = z11.object({
  status: z11.enum(APPOINTMENT_STATUSES),
  statusReason: z11.string().trim().max(500).optional()
});
function shape2(a) {
  return {
    id: a.id,
    contactName: a.contactName,
    contactPhone: a.contactPhone,
    contactEmail: a.contactEmail,
    appointmentDate: a.appointmentDate,
    appointmentTime: a.appointmentTime,
    duration: a.duration,
    serviceName: a.serviceName,
    notes: a.notes,
    status: a.status,
    statusReason: a.statusReason,
    callId: a.callId,
    googleCalendarEventId: a.googleCalendarEventId,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt
  };
}
function queryDay(req, key) {
  const raw = queryString(req, key);
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}
function eventPayload(a) {
  return {
    appointmentId: a.id,
    contactName: a.contactName || null,
    contactPhone: a.contactPhone || null,
    contactEmail: a.contactEmail || null,
    date: a.appointmentDate,
    time: a.appointmentTime,
    duration: a.duration || 30,
    serviceName: a.serviceName || null,
    notes: a.notes || null,
    status: a.status,
    flowId: a.flowId || null,
    callId: a.callId || null
  };
}
async function ownAppointment(userId, id) {
  const [row] = await db2.select().from(appointments).where(and23(eq29(appointments.id, id), eq29(appointments.userId, userId))).limit(1);
  return row;
}
async function syncCalendar(userId, row) {
  if (!row.googleCalendarEventId) return row;
  try {
    if (row.status === "cancelled") {
      const deleted = await deleteCalendarEvent(userId, row.googleCalendarEventId);
      if (deleted) {
        const [cleared] = await db2.update(appointments).set({ googleCalendarEventId: null }).where(eq29(appointments.id, row.id)).returning();
        return cleared || { ...row, googleCalendarEventId: null };
      }
    } else {
      await updateCalendarEvent(userId, row.googleCalendarEventId, {
        id: row.id,
        contactName: row.contactName,
        contactPhone: row.contactPhone,
        contactEmail: row.contactEmail,
        appointmentDate: row.appointmentDate,
        appointmentTime: row.appointmentTime,
        duration: row.duration,
        serviceName: row.serviceName,
        notes: row.notes,
        status: row.status
      });
    }
  } catch (e) {
    console.error(`[REST API] Calendar sync failed for appointment ${row.id}: ${e.message}`);
  }
  return row;
}
function fireStatusEvent(userId, row, status, statusReason) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const extra = {
    confirmed: { confirmedAt: now },
    cancelled: { cancelReason: statusReason, cancelledAt: now },
    completed: { completedAt: now },
    no_show: { markedNoShowAt: now }
  }[status] || {};
  if (status === "scheduled") return;
  void webhookDeliveryService.triggerEvent(userId, `appointment.${status}`, { appointment: eventPayload(row), ...extra });
}
router12.get(
  "/",
  apiAuthMiddleware("calls:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const { page, pageSize, offset } = pageParams(req, 50);
    const conditions = [eq29(appointments.userId, userId)];
    const from = queryDay(req, "from");
    if (from) conditions.push(gte10(appointments.appointmentDate, from));
    const to = queryDay(req, "to");
    if (to) conditions.push(lte5(appointments.appointmentDate, to));
    const status = queryString(req, "status");
    if (status) {
      if (!APPOINTMENT_STATUSES.includes(status)) {
        return sendError2(req, res, 400, "VALIDATION_ERROR", `status must be one of: ${APPOINTMENT_STATUSES.join(", ")}`);
      }
      conditions.push(eq29(appointments.status, status));
    }
    const where = and23(...conditions);
    const [rows, countRows] = await Promise.all([
      db2.select().from(appointments).where(where).orderBy(desc17(appointments.appointmentDate), desc17(appointments.appointmentTime)).limit(pageSize).offset(offset),
      db2.select({ count: sql19`count(*)` }).from(appointments).where(where)
    ]);
    sendData(req, res, rows.map(shape2), 200, paginationMeta(page, pageSize, Number(countRows[0]?.count || 0)));
  })
);
router12.get(
  "/:id",
  apiAuthMiddleware("calls:read"),
  asyncHandler(async (req, res) => {
    const row = await ownAppointment(req.apiAuth.userId, req.params.id);
    if (!row) return sendNotFound(req, res, "Appointment");
    sendData(req, res, shape2(row));
  })
);
router12.patch(
  "/:id",
  apiAuthMiddleware("calls:write"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const existing = await ownAppointment(userId, req.params.id);
    if (!existing) return sendNotFound(req, res, "Appointment");
    const parsed = patchSchema2.safeParse(req.body);
    if (!parsed.success) return sendValidationError(req, res, parsed.error);
    const { status, statusReason } = parsed.data;
    const [updated] = await db2.update(appointments).set({ status, statusReason: statusReason ?? existing.statusReason, updatedAt: /* @__PURE__ */ new Date() }).where(eq29(appointments.id, existing.id)).returning();
    let row = updated;
    if (existing.status !== status) {
      row = await syncCalendar(userId, updated);
      fireStatusEvent(userId, row, status, statusReason ?? null);
    }
    sendData(req, res, shape2(row));
  })
);
var appointments_routes_default = router12;

// plugins/rest-api/routes/api-keys.routes.js
import { Router as Router13 } from "express";
init_schema();
import { z as z12 } from "zod";
import { eq as eq30, and as and24, sql as sql20 } from "drizzle-orm";
var router13 = Router13();
var requireAuth2 = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Authentication required" }
    });
  }
  next();
};
var createKeySchema = z12.object({
  name: z12.string().min(1).max(100),
  scopes: z12.array(z12.string()).optional(),
  rateLimit: z12.number().int().min(10).max(1e4).optional(),
  ipWhitelist: z12.array(z12.string().ip()).optional(),
  expiresAt: z12.string().datetime().optional(),
  description: z12.string().max(500).optional()
});
var updateKeySchema = z12.object({
  name: z12.string().min(1).max(100).optional(),
  scopes: z12.array(z12.string()).optional(),
  rateLimit: z12.number().int().min(10).max(1e4).optional(),
  ipWhitelist: z12.array(z12.string().ip()).optional(),
  isActive: z12.boolean().optional(),
  description: z12.string().max(500).optional()
});
router13.get("/", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(Math.max(1, parseInt(req.query.pageSize) || 50), 100);
    const offset = (page - 1) * pageSize;
    const allKeys = await ApiKeyService.getUserKeys(userId);
    const totalItems = allKeys.length;
    const paginatedKeys = allKeys.slice(offset, offset + pageSize);
    const response = {
      success: true,
      data: paginatedKeys.map((k) => ({
        id: k.id,
        name: k.name,
        keyPrefix: k.keyPrefix,
        scopes: k.scopes,
        rateLimit: k.rateLimit,
        ipWhitelist: k.ipWhitelist,
        isActive: k.isActive,
        lastUsedAt: k.lastUsedAt,
        totalRequests: k.totalRequests,
        expiresAt: k.expiresAt,
        description: k.description,
        createdAt: k.createdAt
      })),
      meta: {
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  } catch (error) {
    console.error("[API Keys] Error listing keys:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to list API keys" }
    });
  }
});
router13.post("/", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const parseResult = createKeySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors
        }
      });
    }
    const { name, scopes, rateLimit, ipWhitelist, expiresAt, description } = parseResult.data;
    const validScopes = Object.keys(API_SCOPES);
    if (scopes) {
      const invalidScopes = scopes.filter((s) => !validScopes.includes(s));
      if (invalidScopes.length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid scopes",
            details: { invalidScopes, validScopes }
          }
        });
      }
    }
    const { key, record } = await ApiKeyService.generateKey({
      userId,
      name,
      scopes,
      rateLimit,
      ipWhitelist,
      expiresAt: expiresAt ? new Date(expiresAt) : void 0,
      description
    });
    const response = {
      success: true,
      data: {
        id: record.id,
        name: record.name,
        key,
        // Full key - only shown once!
        keyPrefix: record.keyPrefix,
        scopes: record.scopes,
        rateLimit: record.rateLimit,
        ipWhitelist: record.ipWhitelist,
        expiresAt: record.expiresAt,
        description: record.description,
        createdAt: record.createdAt,
        warning: "Save this API key securely. It will not be shown again."
      }
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("[API Keys] Error creating key:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to create API key" }
    });
  }
});
router13.put("/:id", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const parseResult = updateKeySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors
        }
      });
    }
    const updates = parseResult.data;
    if (updates.scopes) {
      const validScopes = Object.keys(API_SCOPES);
      const invalidScopes = updates.scopes.filter((s) => !validScopes.includes(s));
      if (invalidScopes.length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid scopes",
            details: { invalidScopes, validScopes }
          }
        });
      }
    }
    const updated = await ApiKeyService.updateKey(id, userId, updates);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "API key not found" }
      });
    }
    const response = {
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        keyPrefix: updated.keyPrefix,
        scopes: updated.scopes,
        rateLimit: updated.rateLimit,
        ipWhitelist: updated.ipWhitelist,
        isActive: updated.isActive,
        expiresAt: updated.expiresAt,
        description: updated.description,
        updatedAt: updated.updatedAt
      }
    };
    res.json(response);
  } catch (error) {
    console.error("[API Keys] Error updating key:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to update API key" }
    });
  }
});
router13.post("/:id/regenerate", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const result = await ApiKeyService.regenerateKey(id, userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "API key not found" }
      });
    }
    const response = {
      success: true,
      data: {
        id: result.record.id,
        name: result.record.name,
        key: result.key,
        // New full key - only shown once!
        keyPrefix: result.record.keyPrefix,
        warning: "Save this API key securely. It will not be shown again. The old key is now invalid."
      }
    };
    res.json(response);
  } catch (error) {
    console.error("[API Keys] Error regenerating key:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to regenerate API key" }
    });
  }
});
router13.delete("/:id", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const deleted = await ApiKeyService.deleteKey(id, userId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "API key not found" }
      });
    }
    const response = {
      success: true,
      data: { deleted: true }
    };
    res.json(response);
  } catch (error) {
    console.error("[API Keys] Error deleting key:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to delete API key" }
    });
  }
});
router13.get("/scopes", requireAuth2, async (req, res) => {
  const response = {
    success: true,
    data: Object.entries(API_SCOPES).map(([scope, description]) => ({
      scope,
      description
    }))
  };
  res.json(response);
});
router13.get("/:id/audit-logs", requireAuth2, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const [logs, countResult] = await Promise.all([
      ApiKeyService.getAuditLogs(userId, { page, pageSize, apiKeyId: id }),
      db2.select({ count: sql20`count(*)` }).from(apiAuditLogs).where(and24(eq30(apiAuditLogs.userId, userId), eq30(apiAuditLogs.apiKeyId, id)))
    ]);
    const totalItems = Number(countResult[0]?.count || 0);
    const response = {
      success: true,
      data: logs,
      meta: {
        requestId: "audit-log-request",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    };
    res.json(response);
  } catch (error) {
    console.error("[API Keys] Error fetching audit logs:", error);
    res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Failed to fetch audit logs" }
    });
  }
});
var api_keys_routes_default = router13;

// plugins/rest-api/routes/admin.routes.js
import { Router as Router14 } from "express";
init_schema();
import { eq as eq31, desc as desc18, sql as sql21 } from "drizzle-orm";
import { z as z13 } from "zod";
var router14 = Router14();
var requireAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "admin" && user.role !== "super_admin") {
    return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } });
  }
  next();
};
router14.get("/", requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [keys, countResult, requestCounts] = await Promise.all([
      db2.select({
        id: apiKeys.id,
        userId: apiKeys.userId,
        userName: users.name,
        userEmail: users.email,
        name: apiKeys.name,
        keyPrefix: apiKeys.keyPrefix,
        scopes: apiKeys.scopes,
        rateLimit: apiKeys.rateLimit,
        rateLimitWindow: apiKeys.rateLimitWindow,
        isActive: apiKeys.isActive,
        lastUsedAt: apiKeys.lastUsedAt,
        createdAt: apiKeys.createdAt
      }).from(apiKeys).leftJoin(users, eq31(apiKeys.userId, users.id)).orderBy(desc18(apiKeys.createdAt)).limit(pageSize).offset(offset),
      db2.select({ count: sql21`count(*)` }).from(apiKeys),
      db2.select({
        apiKeyId: apiAuditLogs.apiKeyId,
        count: sql21`count(*)`
      }).from(apiAuditLogs).groupBy(apiAuditLogs.apiKeyId)
    ]);
    const countMap = new Map(requestCounts.map((r) => [r.apiKeyId, Number(r.count)]));
    const totalItems = Number(countResult[0]?.count || 0);
    const keysWithCount = keys.map((k) => ({
      ...k,
      requestCount: countMap.get(k.id) || 0
    }));
    res.json({
      success: true,
      data: keysWithCount,
      meta: {
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          hasNext: page < Math.ceil(totalItems / pageSize),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error("[Admin API Keys] List error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to list API keys" } });
  }
});
router14.get("/settings", requireAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        defaultRateLimit: 100,
        defaultRateLimitWindow: 60
      }
    });
  } catch (error) {
    console.error("[Admin API Keys] Settings error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to get settings" } });
  }
});
router14.put("/settings", requireAdmin, async (req, res) => {
  try {
    const schema = z13.object({
      defaultRateLimit: z13.number().min(1).max(1e4),
      defaultRateLimitWindow: z13.number().min(1).max(3600)
    });
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid settings" } });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin API Keys] Update settings error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update settings" } });
  }
});
router14.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateSchema = z13.object({
      isActive: z13.boolean().optional(),
      rateLimit: z13.number().min(1).max(1e4).optional(),
      rateLimitWindow: z13.number().min(1).max(3600).optional()
    });
    const parseResult = updateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid request body", details: parseResult.error.flatten().fieldErrors } });
    }
    const { isActive, rateLimit, rateLimitWindow } = parseResult.data;
    const updateData = {};
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (typeof rateLimit === "number") updateData.rateLimit = rateLimit;
    if (typeof rateLimitWindow === "number") updateData.rateLimitWindow = rateLimitWindow;
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "No valid fields to update" } });
    }
    const [updated] = await db2.update(apiKeys).set(updateData).where(eq31(apiKeys.id, id)).returning();
    if (!updated) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API key not found" } });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Admin API Keys] Update error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update API key" } });
  }
});
router14.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db2.delete(apiKeys).where(eq31(apiKeys.id, id)).returning();
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API key not found" } });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin API Keys] Delete error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to delete API key" } });
  }
});
var admin_routes_default = router14;

// plugins/rest-api/index.ts
var API_VERSION3 = "v1";
var API_BASE_PATH = `/api/${API_VERSION3}`;
function createRestApiRouter() {
  const router15 = Router15();
  router15.use("/calls", calls_routes_default);
  router15.use("/campaigns", campaigns_routes_default);
  router15.use("/agents", agents_routes_default);
  router15.use("/contacts", contacts_routes_default);
  router15.use("/credits", credits_routes_default);
  router15.use("/analytics", analytics_routes_default);
  router15.use("/webhooks", webhooks_routes_default);
  router15.use("/dnd", dnd_routes_default);
  router15.use("/callbacks", callbacks_routes_default);
  router15.use("/leads", leads_routes_default);
  router15.use("/appointments", appointments_routes_default);
  router15.get("/health", (req, res) => {
    res.json({
      success: true,
      data: {
        status: "healthy",
        version: API_VERSION3,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  });
  router15.get("/", (req, res) => {
    res.json({
      success: true,
      data: {
        name: "Zonvo AI REST API",
        version: API_VERSION3,
        documentation: "/api/v1/docs",
        endpoints: {
          calls: "/api/v1/calls",
          campaigns: "/api/v1/campaigns",
          agents: "/api/v1/agents",
          contacts: "/api/v1/contacts",
          credits: "/api/v1/credits",
          analytics: "/api/v1/analytics",
          webhooks: "/api/v1/webhooks",
          dnd: "/api/v1/dnd",
          callbacks: "/api/v1/callbacks",
          leads: "/api/v1/leads",
          appointments: "/api/v1/appointments"
        },
        authentication: {
          type: "API Key",
          header: "Authorization: Bearer <api_key>",
          alternativeHeader: "X-API-Key: <api_key>"
        }
      }
    });
  });
  return router15;
}
function registerRestApiRoutes(app, options) {
  if (options.callServices) {
    setCallServices(options.callServices);
  }
  app.use(API_BASE_PATH, createRestApiRouter());
  app.use("/api/user/api-keys", options.sessionAuthMiddleware, api_keys_routes_default);
  app.use("/api/admin/api-keys", options.sessionAuthMiddleware, options.adminAuthMiddleware, admin_routes_default);
  try {
    const specPath = path2.join(process.cwd(), "plugins", "rest-api", "docs", "openapi.yaml");
    const openApiDocument = YAML.load(specPath);
    const specTemplate = JSON.stringify(openApiDocument);
    const specCache = /* @__PURE__ */ new Map();
    const specForOrigin = (origin) => {
      const cached = specCache.get(origin);
      if (cached) return cached;
      const spec = JSON.parse(replaceDocsPlaceholder(specTemplate, origin));
      spec.servers = [{ url: `${origin}/api/v1`, description: "API v1" }];
      if (specCache.size >= 20) specCache.clear();
      specCache.set(origin, spec);
      return spec;
    };
    const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    app.get("/api/docs/openapi.json", (req, res) => {
      res.json(specForOrigin(resolveRequestOrigin(req)));
    });
    app.get("/api/docs", (req, res) => {
      const origin = escapeHtml(resolveRequestOrigin(req));
      res.type("html").send(replaceDocsPlaceholder(`<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Zonvo AI API Reference</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <style>
      :root {
        --bg: #ffffff;
        --text: #0a2540;
        --text-secondary: #425466;
        --border: #e3e8ee;
        --sidebar-bg: #f6f9fc;
        --accent: #635bff;
        --code-bg: #0a2540;
      }
      html[data-theme="dark"] {
        --bg: #0a0a0a;
        --text: #f6f9fc;
        --text-secondary: #a3acb9;
        --border: #2a2a2a;
        --sidebar-bg: #111111;
        --accent: #7c75ff;
        --code-bg: #1a1a1a;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: var(--bg);
        color: var(--text);
        -webkit-font-smoothing: antialiased;
      }
      .header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--bg);
        border-bottom: 1px solid var(--border);
        padding: 0 24px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: var(--text);
      }
      .logo-text {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .logo-api {
        font-size: 13px;
        font-weight: 500;
        color: var(--accent);
        padding: 2px 8px;
        background: rgba(99, 91, 255, 0.1);
        border-radius: 4px;
        margin-left: 4px;
      }
      .version {
        font-size: 12px;
        color: var(--text-secondary);
        padding: 3px 8px;
        background: var(--sidebar-bg);
        border: 1px solid var(--border);
        border-radius: 4px;
      }
      .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .playground-btn {
        font-size: 13px;
        font-weight: 500;
        color: var(--text);
        padding: 8px 16px;
        background: var(--sidebar-bg);
        border: 1px solid var(--border);
        border-radius: 6px;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: background 0.15s, border-color 0.15s;
      }
      .playground-btn:hover {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
      }
      .playground-btn svg {
        width: 16px;
        height: 16px;
      }
      .theme-toggle {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: var(--bg);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s, border-color 0.15s;
      }
      .theme-toggle:hover {
        background: var(--sidebar-bg);
        border-color: var(--text-secondary);
      }
      .theme-toggle svg {
        width: 18px;
        height: 18px;
        color: var(--text-secondary);
      }
      .sun-icon { display: block; }
      .moon-icon { display: none; }
      html[data-theme="dark"] .sun-icon { display: none; }
      html[data-theme="dark"] .moon-icon { display: block; }
      #redoc-container {
        background: var(--bg);
      }
      @media (max-width: 600px) {
        .header { padding: 0 16px; }
        .version { display: none; }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="header-left">
        <a href="/api/docs" class="logo">
          <span class="logo-text">Zonvo AI</span>
          <span class="logo-api">API</span>
        </a>
        <span class="version">v1.0</span>
      </div>
      <div class="header-right">
        <a href="/api/docs/playground" class="playground-btn" title="Interactive API Playground">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          Try it
        </a>
        <button class="theme-toggle" id="themeToggle" title="Toggle theme">
          <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="redoc-container"></div>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
    <script>
      (function() {
        var theme = localStorage.getItem('api-docs-theme');
        if (!theme) {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        
        function getRedocTheme(isDark) {
          return {
            spacing: { sectionVertical: 20, sectionHorizontal: 28 },
            colors: {
              primary: { main: isDark ? '#7c75ff' : '#635bff' },
              success: { main: '#30c85e' },
              warning: { main: '#f5a623' },
              error: { main: '#ed5f74' },
              text: { primary: isDark ? '#f6f9fc' : '#0a2540', secondary: isDark ? '#a3acb9' : '#425466' },
              border: { dark: isDark ? '#2a2a2a' : '#e3e8ee', light: isDark ? '#1a1a1a' : '#f6f9fc' },
              http: { get: '#0073e6', post: '#30c85e', put: '#f5a623', delete: '#ed5f74', patch: '#9a6eff' }
            },
            typography: {
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              headings: { fontFamily: 'Inter, sans-serif', fontWeight: '600' },
              code: { fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace', fontSize: '13px', lineHeight: '1.5' }
            },
            sidebar: {
              backgroundColor: isDark ? '#111111' : '#f6f9fc',
              textColor: isDark ? '#a3acb9' : '#425466',
              activeTextColor: isDark ? '#ffffff' : '#0a2540',
              groupItems: { textTransform: 'uppercase' },
              width: '260px'
            },
            rightPanel: {
              backgroundColor: isDark ? '#1a1a1a' : '#0a2540',
              textColor: '#ffffff',
              width: '40%'
            }
          };
        }
        
        function initRedoc() {
          var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          var container = document.getElementById('redoc-container');
          container.innerHTML = '';
          Redoc.init('/api/docs/openapi.json', {
            hideDownloadButton: true,
            hideHostname: false,
            expandResponses: '200,201',
            requiredPropsFirst: true,
            sortPropsAlphabetically: true,
            pathInMiddlePanel: true,
            scrollYOffset: 64,
            nativeScrollbars: true,
            theme: getRedocTheme(isDark)
          }, container);
        }
        
        document.getElementById('themeToggle').addEventListener('click', function() {
          var current = document.documentElement.getAttribute('data-theme');
          var next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('api-docs-theme', next);
          initRedoc();
        });
        
        initRedoc();
      })();
    </script>
  </body>
</html>`, origin));
    });
    const swaggerUiOptions = {
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin-bottom: 16px; }
        .swagger-ui .info .title { font-size: 28px; }
        .swagger-ui .info .description { max-height: 120px; overflow: hidden; }
        .swagger-ui .scheme-container { 
          background: #f6f9fc; 
          padding: 12px 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #e3e8ee;
        }
        .swagger-ui .opblock-tag { 
          font-size: 16px; 
          padding: 8px 0;
          border-bottom: 1px solid #e3e8ee;
        }
        .swagger-ui .opblock { margin-bottom: 8px; }
        .swagger-ui .opblock .opblock-summary { padding: 8px 12px; }
        .swagger-ui .opblock-summary-method { 
          min-width: 60px; 
          font-size: 12px;
          padding: 4px 8px;
        }
        .swagger-ui .filter-container { 
          margin: 0 0 16px 0;
          position: sticky;
          top: 52px;
          z-index: 99;
          background: white;
          padding: 8px 0;
        }
        .swagger-ui .filter .operation-filter-input {
          border: 1px solid #e3e8ee;
          border-radius: 6px;
          padding: 8px 12px;
        }
        .swagger-ui section.models { display: none; }
        body { background: #fafbfc; }
        .swagger-ui .wrapper { max-width: 1200px; padding: 16px 24px; }
      `,
      customSiteTitle: "Zonvo AI API Playground",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: "none",
        filter: true,
        showExtensions: false,
        defaultModelsExpandDepth: -1,
        tagsSorter: "alpha",
        operationsSorter: "alpha",
        tryItOutEnabled: true,
        deepLinking: true
      }
    };
    app.use("/api/docs/playground", swaggerUi.serve);
    app.get("/api/docs/playground", swaggerUi.setup(void 0, { ...swaggerUiOptions, swaggerUrl: "/api/docs/openapi.json" }));
    console.log("[REST API] Redoc documentation available at /api/docs (public access)");
    console.log("[REST API] Swagger UI playground available at /api/docs/playground");
  } catch (error) {
    console.warn("[REST API] Could not load OpenAPI spec, documentation disabled:", error);
    app.get(["/api/docs", "/api/docs/openapi.json", "/api/docs/playground"], (_req, res) => {
      res.status(503).type("text").send("API documentation is unavailable: plugins/rest-api/docs/openapi.yaml could not be loaded on this server.");
    });
  }
  console.log(`[REST API] Plugin registered at ${API_BASE_PATH}`);
  console.log("[REST API] Endpoints:");
  console.log(`  - ${API_BASE_PATH}/calls`);
  console.log(`  - ${API_BASE_PATH}/campaigns`);
  console.log(`  - ${API_BASE_PATH}/agents`);
  console.log(`  - ${API_BASE_PATH}/contacts`);
  console.log(`  - ${API_BASE_PATH}/credits`);
  console.log(`  - ${API_BASE_PATH}/analytics`);
  console.log(`  - ${API_BASE_PATH}/webhooks`);
  console.log(`  - ${API_BASE_PATH}/dnd`);
  console.log(`  - ${API_BASE_PATH}/callbacks`);
  console.log(`  - ${API_BASE_PATH}/leads`);
  console.log(`  - ${API_BASE_PATH}/appointments`);
  console.log("  - /api/user/api-keys (session auth)");
  console.log("  - /api/admin/api-keys (admin auth)");
}
var pluginInfo = {
  name: "rest-api",
  version: "2.3.0",
  description: "Comprehensive REST API for external system integration",
  author: "Zonvo AI",
  features: [
    "API Key Authentication",
    "Rate Limiting",
    "Request Audit Logging",
    "IP Whitelisting",
    "Scoped Permissions",
    "Calls API (outcomes, scheduled calls, per-call variables)",
    "Campaigns API",
    "Agents API",
    "Contacts API",
    "Leads API (CRM pipeline, notes)",
    "Callbacks API (scheduled calls, bulk, idempotent externalRef)",
    "Appointments API",
    "Do-not-call API",
    "Credits API",
    "Analytics API",
    "Webhooks API",
    "Flow Export/Import"
  ]
};
export {
  API_BASE_PATH,
  API_ERROR_CODES,
  API_KEY_PREFIX,
  API_PREFIX,
  API_VERSION3 as API_VERSION,
  ApiKeyService,
  apiAuthMiddleware,
  asyncHandler,
  createRestApiRouter,
  pluginInfo,
  registerRestApiRoutes,
  requireScope
};
