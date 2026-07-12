var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// plugins/team-management/index.ts
import { Router as Router9 } from "express";

// plugins/team-management/routes/user-team.routes.js
import { Router } from "express";

// server/db.js
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// shared/schema.js
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
  flows: () => flows,
  fonosterCredentials: () => fonosterCredentials,
  formFields: () => formFields,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  globalSettings: () => globalSettings,
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
  insertFonosterCredentialSchema: () => insertFonosterCredentialSchema,
  insertFormFieldSchema: () => insertFormFieldSchema,
  insertFormSchema: () => insertFormSchema,
  insertFormSubmissionSchema: () => insertFormSubmissionSchema,
  insertGlobalSettingsSchema: () => insertGlobalSettingsSchema,
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
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal, doublePrecision, serial, date, time, unique, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var otpVerifications = pgTable("otp_verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  otpCode: text("otp_code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  attempts: integer("attempts").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var refreshTokens = pgTable("refresh_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  isValid: boolean("is_valid").notNull().default(true),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var elevenLabsCredentials = pgTable("eleven_labs_credentials", {
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
var syncedVoices = pgTable("synced_voices", {
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
var agents = pgTable("agents", {
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
  // Knowledge Base (for incoming agents)
  knowledgeBaseIds: text("knowledge_base_ids").array(),
  // Shared Voice Configuration (used by both Incoming and Flow agents)
  elevenLabsVoiceId: text("eleven_labs_voice_id"),
  voiceStability: doublePrecision("voice_stability").default(0.55),
  voiceSimilarityBoost: doublePrecision("voice_similarity_boost").default(0.85),
  voiceSpeed: doublePrecision("voice_speed").default(1),
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
var knowledgeBase = pgTable("knowledge_base", {
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
var incomingAgents = pgTable("incoming_agents", {
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
});
var phoneNumbers = pgTable("phone_numbers", {
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
  // DEPRECATED: Use incoming_connections table instead
  assignedIncomingAgentId: varchar("assigned_incoming_agent_id").references(() => incomingAgents.id, { onDelete: "set null" })
});
var incomingConnections = pgTable("incoming_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  agentId: varchar("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  // Must be type='incoming'
  phoneNumberId: varchar("phone_number_id").notNull().references(() => phoneNumbers.id, { onDelete: "cascade" }).unique(),
  // One connection per phone number
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var campaigns = pgTable("campaigns", {
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
  // Contact Retry System
  retryMaxAttempts: integer("retry_max_attempts").default(3),
  retryIntervalMinutes: integer("retry_interval_minutes").default(60),
  retryOnNoAnswer: boolean("retry_on_no_answer").default(true),
  retryOnBusy: boolean("retry_on_busy").default(false),
  retryOnFailed: boolean("retry_on_failed").default(false),
  batchJobHistory: jsonb("batch_job_history").default([]),
  currentRetryPass: integer("current_retry_pass").default(0),
  // Error tracking for failed campaigns
  errorMessage: text("error_message"),
  // Detailed error message when campaign fails
  errorCode: text("error_code"),
  // Error code for categorization (e.g., AGENT_NOT_SYNCED, NO_CONTACTS)
  config: jsonb("config"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  phone: text("phone").notNull(),
  email: text("email"),
  customFields: jsonb("custom_fields"),
  status: text("status").notNull().default("pending"),
  attemptCount: integer("attempt_count").default(1),
  lastAttemptAt: timestamp("last_attempt_at"),
  nextRetryAt: timestamp("next_retry_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var calls = pgTable("calls", {
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
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var creditTransactions = pgTable("credit_transactions", {
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
  userReferenceUnique: uniqueIndex("credit_transactions_user_reference_unique").on(table.userId, table.reference).where(sql`reference IS NOT NULL`)
}));
var tools = pgTable("tools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  config: jsonb("config").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var voices = pgTable("voices", {
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
var plans = pgTable("plans", {
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
var globalSettings = pgTable("global_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  description: text("description"),
  updatedBy: varchar("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var llmModels = pgTable("llm_models", {
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
var supportedLanguages = pgTable("supported_languages", {
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
var creditPackages = pgTable("credit_packages", {
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
var userSubscriptions = pgTable("user_subscriptions", {
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
var phoneNumberRentals = pgTable("phone_number_rentals", {
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
var usageRecords = pgTable("usage_records", {
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
var legacyWebhooks = pgTable("webhooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  secret: text("secret").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var legacyWebhookDeliveries = pgTable("webhook_deliveries", {
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
var notifications = pgTable("notifications", {
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
var emailTemplates = pgTable("email_templates", {
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
var promptTemplates = pgTable("prompt_templates", {
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
var agentVersions = pgTable("agent_versions", {
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
var auditLogs = pgTable("audit_logs", {
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
var platformLanguages = pgTable("platform_languages", {
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
var insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
  role: true
});
var insertElevenLabsCredentialSchema = createInsertSchema(elevenLabsCredentials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currentLoad: true,
  totalAssignedAgents: true
});
var insertSyncedVoiceSchema = createInsertSchema(syncedVoices).omit({
  id: true,
  syncedAt: true
});
var insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true
});
var insertKnowledgeBaseSchema = createInsertSchema(knowledgeBase).omit({
  id: true,
  createdAt: true
});
var insertIncomingAgentSchema = createInsertSchema(incomingAgents).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPromptTemplateSchema = createInsertSchema(promptTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true
});
var insertAgentVersionSchema = createInsertSchema(agentVersions).omit({
  id: true,
  createdAt: true
});
var insertIncomingConnectionSchema = createInsertSchema(incomingConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  completedCalls: true,
  successfulCalls: true,
  failedCalls: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});
var insertCallSchema = createInsertSchema(calls).omit({
  id: true,
  createdAt: true
});
var insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
  id: true,
  createdAt: true
});
var insertToolSchema = createInsertSchema(tools).omit({
  id: true,
  createdAt: true
});
var insertVoiceSchema = createInsertSchema(voices).omit({
  id: true,
  createdAt: true
});
var insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertGlobalSettingsSchema = createInsertSchema(globalSettings).omit({
  id: true,
  updatedAt: true
});
var insertLlmModelSchema = createInsertSchema(llmModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSupportedLanguageSchema = createInsertSchema(supportedLanguages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPlatformLanguageSchema = createInsertSchema(platformLanguages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCreditPackageSchema = createInsertSchema(creditPackages).omit({
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
var insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPhoneNumberSchema = createInsertSchema(phoneNumbers).omit({
  id: true,
  createdAt: true
});
var insertUsageRecordSchema = createInsertSchema(usageRecords).omit({
  id: true,
  createdAt: true
});
var insertLegacyWebhookSchema = createInsertSchema(legacyWebhooks).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertLegacyWebhookDeliverySchema = createInsertSchema(legacyWebhookDeliveries).omit({
  id: true,
  createdAt: true
});
var insertPhoneNumberRentalSchema = createInsertSchema(phoneNumberRentals).omit({
  id: true,
  createdAt: true
});
var insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
  isRead: true,
  isDismissed: true
});
var insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var twilioCountries = pgTable("twilio_countries", {
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
var insertTwilioCountrySchema = createInsertSchema(twilioCountries).omit({
  id: true
});
var userKnowledgeStorageLimits = pgTable("user_knowledge_storage_limits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  maxStorageBytes: integer("max_storage_bytes").notNull().default(20971520),
  // 20MB default per user
  usedStorageBytes: integer("used_storage_bytes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var knowledgeChunks = pgTable("knowledge_chunks", {
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
var knowledgeProcessingQueue = pgTable("knowledge_processing_queue", {
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
var insertUserKnowledgeStorageLimitSchema = createInsertSchema(userKnowledgeStorageLimits).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertKnowledgeChunkSchema = createInsertSchema(knowledgeChunks).omit({
  id: true,
  createdAt: true
});
var insertKnowledgeProcessingQueueSchema = createInsertSchema(knowledgeProcessingQueue).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var flows = pgTable("flows", {
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
var insertFlowSchema = createInsertSchema(flows).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  compiledSystemPrompt: true,
  compiledFirstMessage: true,
  compiledStates: true,
  compiledTools: true
});
var createFlowSchema = insertFlowSchema.omit({ userId: true });
var flowExecutions = pgTable("flow_executions", {
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
var insertFlowExecutionSchema = createInsertSchema(flowExecutions).omit({
  id: true,
  startedAt: true
});
var webhookSubscriptions = pgTable("webhook_subscriptions", {
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
var webhooks = webhookSubscriptions;
var insertWebhookSchema = createInsertSchema(webhooks).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var createWebhookSchema = insertWebhookSchema.omit({ userId: true });
var webhookDeliveryLogs = pgTable("webhook_logs", {
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
var webhookLogs = webhookDeliveryLogs;
var insertWebhookLogSchema = createInsertSchema(webhookLogs).omit({
  id: true,
  createdAt: true
});
var appointments = pgTable("appointments", {
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
  metadata: jsonb("metadata").$type(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var createAppointmentSchema = insertAppointmentSchema.omit({ userId: true });
var appointmentSettings = pgTable("appointment_settings", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  allowOverlapping: boolean("allow_overlapping").default(false).notNull(),
  bufferMinutes: integer("buffer_minutes").default(0).notNull(),
  workingHours: jsonb("working_hours").notNull().$type(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertAppointmentSettingsSchema = createInsertSchema(appointmentSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var createAppointmentSettingsSchema = insertAppointmentSettingsSchema.omit({ userId: true });
var forms = pgTable("forms", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertFormSchema = createInsertSchema(forms).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var createFormSchema = insertFormSchema.omit({ userId: true });
var formFields = pgTable("form_fields", {
  id: varchar("id").primaryKey(),
  formId: varchar("form_id").notNull().references(() => forms.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  fieldType: varchar("field_type", { length: 50 }).notNull(),
  options: jsonb("options").$type(),
  isRequired: boolean("is_required").default(true).notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertFormFieldSchema = createInsertSchema(formFields).omit({
  id: true,
  createdAt: true
});
var formSubmissions = pgTable("form_submissions", {
  id: varchar("id").primaryKey(),
  formId: varchar("form_id").notNull().references(() => forms.id),
  callId: varchar("call_id"),
  flowExecutionId: varchar("flow_execution_id").references(() => flowExecutions.id),
  contactName: varchar("contact_name", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  responses: jsonb("responses").notNull().$type(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
  id: true,
  submittedAt: true
});
var seoSettings = pgTable("seo_settings", {
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
      allow: ["/", "/pricing", "/features", "/blog", "/contact"],
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
var insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var analyticsScripts = pgTable("analytics_scripts", {
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
var insertAnalyticsScriptSchema = createInsertSchema(analyticsScripts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var paymentTransactions = pgTable("payment_transactions", {
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
  currency: text("currency").notNull().default("USD"),
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
var insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var refunds = pgTable("refunds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionId: varchar("transaction_id").notNull().references(() => paymentTransactions.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  // Refund Details
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
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
var insertRefundSchema = createInsertSchema(refunds).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var invoices = pgTable("invoices", {
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
  currency: text("currency").notNull().default("USD"),
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
var insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var paymentWebhookQueue = pgTable("payment_webhook_queue", {
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
var insertPaymentWebhookQueueSchema = createInsertSchema(paymentWebhookQueue).omit({
  id: true,
  createdAt: true
});
var emailNotificationSettings = pgTable("email_notification_settings", {
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
var insertEmailNotificationSettingsSchema = createInsertSchema(emailNotificationSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var bannedWords = pgTable("banned_words", {
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
var insertBannedWordSchema = createInsertSchema(bannedWords).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var contentViolations = pgTable("content_violations", {
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
var insertContentViolationSchema = createInsertSchema(contentViolations).omit({
  id: true,
  createdAt: true
});
var openaiCredentials = pgTable("openai_credentials", {
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
var insertOpenaiCredentialSchema = createInsertSchema(openaiCredentials).omit({
  id: true,
  currentLoad: true,
  totalAssignedAgents: true,
  totalAssignedUsers: true,
  lastHealthCheck: true,
  createdAt: true,
  updatedAt: true
});
var plivoCredentials = pgTable("plivo_credentials", {
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
var insertPlivoCredentialSchema = createInsertSchema(plivoCredentials).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var plivoPhoneNumbers = pgTable("plivo_phone_numbers", {
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
  purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertPlivoPhoneNumberSchema = createInsertSchema(plivoPhoneNumbers).omit({
  id: true,
  purchasedAt: true,
  createdAt: true,
  updatedAt: true
});
var plivoCalls = pgTable("plivo_calls", {
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
});
var insertPlivoCallSchema = createInsertSchema(plivoCalls).omit({
  id: true,
  createdAt: true
});
var campaignJobs = pgTable("campaign_jobs", {
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
var insertCampaignJobSchema = createInsertSchema(campaignJobs).omit({
  id: true,
  createdAt: true
});
var plivoPhonePricing = pgTable("plivo_phone_pricing", {
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
var insertPlivoPhonePricingSchema = createInsertSchema(plivoPhonePricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var userKycDocuments = pgTable("user_kyc_documents", {
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
var insertUserKycDocumentSchema = createInsertSchema(userKycDocuments).omit({
  id: true,
  uploadedAt: true
});
var twilioOpenaiCalls = pgTable("twilio_openai_calls", {
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
});
var insertTwilioOpenaiCallSchema = createInsertSchema(twilioOpenaiCalls).omit({
  id: true,
  createdAt: true
});
var demoSessions = pgTable("demo_sessions", {
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
var insertDemoSessionSchema = createInsertSchema(demoSessions).omit({
  id: true,
  createdAt: true
});
var leadStages = pgTable("lead_stages", {
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
var insertLeadStageSchema = createInsertSchema(leadStages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var leads = pgTable("leads", {
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
var insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var AI_LEAD_CATEGORIES = {
  WARM: "warm",
  HOT: "hot",
  APPOINTMENT_BOOKED: "appointment_booked",
  FORM_SUBMITTED: "form_submitted",
  CALL_TRANSFER: "call_transfer",
  NEED_FOLLOW_UP: "need_follow_up"
};
var AI_CATEGORY_LABELS = {
  [AI_LEAD_CATEGORIES.WARM]: "Warm Lead",
  [AI_LEAD_CATEGORIES.HOT]: "Hot Lead",
  [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "Appointment Booked",
  [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "Form Submitted",
  [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "Call Transfer",
  [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "Need Follow Up"
};
var AI_CATEGORY_COLORS = {
  [AI_LEAD_CATEGORIES.WARM]: "#F59E0B",
  [AI_LEAD_CATEGORIES.HOT]: "#EF4444",
  [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "#10B981",
  [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "#3B82F6",
  [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "#8B5CF6",
  [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "#F97316"
};
var AI_CATEGORY_PRIORITY = [
  AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED,
  AI_LEAD_CATEGORIES.FORM_SUBMITTED,
  AI_LEAD_CATEGORIES.CALL_TRANSFER,
  AI_LEAD_CATEGORIES.NEED_FOLLOW_UP,
  AI_LEAD_CATEGORIES.HOT,
  AI_LEAD_CATEGORIES.WARM
];
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
var leadNotes = pgTable("lead_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertLeadNoteSchema = createInsertSchema(leadNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var leadActivities = pgTable("lead_activities", {
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
var insertLeadActivitySchema = createInsertSchema(leadActivities).omit({
  id: true,
  createdAt: true
});
var crmCategoryPreferences = pgTable("crm_category_preferences", {
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
var insertCrmCategoryPreferencesSchema = createInsertSchema(crmCategoryPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var websiteWidgets = pgTable("website_widgets", {
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
var insertWebsiteWidgetSchema = createInsertSchema(websiteWidgets).omit({
  id: true,
  totalCalls: true,
  totalMinutes: true,
  createdAt: true,
  updatedAt: true
});
var widgetCallSessions = pgTable("widget_call_sessions", {
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
var insertWidgetCallSessionSchema = createInsertSchema(widgetCallSessions).omit({
  id: true,
  createdAt: true
});
var API_SCOPES = {
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
var apiKeys = pgTable("api_keys", {
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
var insertApiKeySchema = createInsertSchema(apiKeys).omit({
  id: true,
  lastUsedAt: true,
  lastUsedIp: true,
  totalRequests: true,
  createdAt: true,
  updatedAt: true
});
var apiAuditLogs = pgTable("api_audit_logs", {
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
var insertApiAuditLogSchema = createInsertSchema(apiAuditLogs).omit({
  id: true,
  createdAt: true
});
var apiRateLimits = pgTable("api_rate_limits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  apiKeyId: varchar("api_key_id").notNull().references(() => apiKeys.id, { onDelete: "cascade" }),
  windowStart: timestamp("window_start").notNull(),
  requestCount: integer("request_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var fonosterCredentials = pgTable("fonoster_credentials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  accessKeyId: text("access_key_id").notNull(),
  apiKeyEncrypted: text("api_key_encrypted").notNull(),
  apiSecretEncrypted: text("api_secret_encrypted").notNull(),
  endpoint: text("endpoint"),
  isPrimary: boolean("is_primary").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  healthStatus: text("health_status").notNull().default("unknown"),
  lastHealthCheck: timestamp("last_health_check"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertFonosterCredentialSchema = createInsertSchema(fonosterCredentials).omit({
  id: true,
  healthStatus: true,
  lastHealthCheck: true,
  createdAt: true,
  updatedAt: true
});
var sipTrunks = pgTable("sip_trunks", {
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
  externalFonosterTrunkId: text("external_fonoster_trunk_id"),
  fonosterCredentialId: varchar("fonoster_credential_id").references(() => fonosterCredentials.id),
  isActive: boolean("is_active").notNull().default(true),
  healthStatus: text("health_status").notNull().default("unknown"),
  lastHealthCheck: timestamp("last_health_check"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertSipTrunkSchema = createInsertSchema(sipTrunks).omit({
  id: true,
  healthStatus: true,
  lastHealthCheck: true,
  createdAt: true,
  updatedAt: true
});
var sipPhoneNumbers = pgTable("sip_phone_numbers", {
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
  externalFonosterPhoneId: text("external_fonoster_phone_id"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertSipPhoneNumberSchema = createInsertSchema(sipPhoneNumbers).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var sipCalls = pgTable("sip_calls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  agentId: varchar("agent_id").references(() => agents.id),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  contactId: varchar("contact_id").references(() => contacts.id),
  sipTrunkId: varchar("sip_trunk_id").references(() => sipTrunks.id),
  sipPhoneNumberId: varchar("sip_phone_number_id").references(() => sipPhoneNumbers.id),
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
  sipHeaders: jsonb("sip_headers"),
  metadata: jsonb("metadata"),
  // Matches SQL migration column name
  startedAt: timestamp("started_at"),
  answeredAt: timestamp("answered_at"),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertSipCallSchema = createInsertSchema(sipCalls).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var userAddresses = pgTable("user_addresses", {
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
var insertUserAddressSchema = createInsertSchema(userAddresses).omit({
  id: true,
  twilioAddressSid: true,
  status: true,
  verificationStatus: true,
  validationStatus: true,
  rejectionReason: true,
  createdAt: true,
  updatedAt: true
});
var userFeedback = pgTable("user_feedback", {
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
var insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  status: true,
  priority: true,
  adminResponse: true,
  respondedBy: true,
  respondedAt: true,
  createdAt: true,
  updatedAt: true
});

// server/db.js
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
var db = drizzle(pool, { schema: schema_exports });

// plugins/team-management/services/team.service.js
import { sql as sql2 } from "drizzle-orm";
import bcrypt from "bcrypt";

// plugins/team-management/types.js
var DEFAULT_ROLE_PERMISSIONS = {
  owner: {
    "*": true
  },
  admin: {
    "campaigns.*": true,
    "agents.*": true,
    "crm.*": true,
    "calls.*": true,
    "messaging.*": true,
    "knowledge_base.*": true,
    "phone_numbers.*": true,
    "analytics.*": true,
    "settings.view_settings": true,
    "settings.edit_settings": true,
    "settings.manage_integrations": true,
    "team.*": true
  },
  manager: {
    "campaigns.*": true,
    "agents.view_agents": true,
    "agents.create_agents": true,
    "agents.edit_agents": true,
    "agents.flow_builder": true,
    "crm.*": true,
    "calls.*": true,
    "messaging.view_conversations": true,
    "messaging.send_messages": true,
    "knowledge_base.view_knowledge": true,
    "knowledge_base.create_knowledge": true,
    "analytics.view_analytics": true,
    "team.view_team": true
  },
  viewer: {
    "campaigns.view_campaigns": true,
    "agents.view_agents": true,
    "crm.view_leads": true,
    "calls.view_calls": true,
    "calls.view_transcripts": true,
    "messaging.view_conversations": true,
    "knowledge_base.view_knowledge": true,
    "analytics.view_analytics": true,
    "team.view_team": true
  }
};
var PERMISSION_SECTIONS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "Home",
    subsections: [
      { id: "view_dashboard", label: "View Dashboard" },
      { id: "view_stats", label: "View Statistics" }
    ]
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: "Megaphone",
    subsections: [
      { id: "view_campaigns", label: "View Campaigns" },
      { id: "create_campaigns", label: "Create Campaigns" },
      { id: "edit_campaigns", label: "Edit Campaigns" },
      { id: "delete_campaigns", label: "Delete Campaigns" },
      { id: "manage_contacts", label: "Manage Contacts" },
      { id: "execute_campaigns", label: "Execute Campaigns" }
    ]
  },
  {
    id: "agents",
    label: "Agents",
    icon: "Bot",
    subsections: [
      { id: "view_agents", label: "View Agents" },
      { id: "create_agents", label: "Create Agents" },
      { id: "edit_agents", label: "Edit Agents" },
      { id: "delete_agents", label: "Delete Agents" },
      { id: "flow_builder", label: "Flow Builder" }
    ]
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: "Contact",
    subsections: [
      { id: "view_contacts", label: "View Contacts" },
      { id: "create_contacts", label: "Create Contacts" },
      { id: "edit_contacts", label: "Edit Contacts" },
      { id: "delete_contacts", label: "Delete Contacts" },
      { id: "import_contacts", label: "Import Contacts" },
      { id: "export_contacts", label: "Export Contacts" }
    ]
  },
  {
    id: "crm",
    label: "CRM",
    icon: "Users",
    subsections: [
      { id: "view_leads", label: "View Leads" },
      { id: "edit_leads", label: "Edit Leads" },
      { id: "delete_leads", label: "Delete Leads" },
      { id: "manage_pipelines", label: "Manage Pipelines" }
    ]
  },
  {
    id: "calls",
    label: "Calls & Conversations",
    icon: "Phone",
    subsections: [
      { id: "view_calls", label: "View Calls" },
      { id: "view_recordings", label: "View Recordings" },
      { id: "view_transcripts", label: "View Transcripts" }
    ]
  },
  {
    id: "messaging",
    label: "Messaging & Conversations",
    icon: "MessageSquare",
    subsections: [
      { id: "view_conversations", label: "View Conversations" },
      { id: "send_messages", label: "Send Messages" },
      { id: "manage_conversations", label: "Manage Conversations" }
    ]
  },
  {
    id: "knowledge_base",
    label: "Knowledge Base",
    icon: "BookOpen",
    subsections: [
      { id: "view_knowledge", label: "View Knowledge Base" },
      { id: "create_knowledge", label: "Add Documents" },
      { id: "edit_knowledge", label: "Edit Documents" },
      { id: "delete_knowledge", label: "Delete Documents" }
    ]
  },
  {
    id: "templates",
    label: "Templates",
    icon: "FileText",
    subsections: [
      { id: "view_templates", label: "View Templates" },
      { id: "create_templates", label: "Create Templates" },
      { id: "edit_templates", label: "Edit Templates" },
      { id: "delete_templates", label: "Delete Templates" }
    ]
  },
  {
    id: "website_widget",
    label: "Website Widget",
    icon: "Globe",
    subsections: [
      { id: "view_widget", label: "View Widget" },
      { id: "create_widget", label: "Create Widget" },
      { id: "edit_widget", label: "Edit Widget" },
      { id: "delete_widget", label: "Delete Widget" },
      { id: "embed_code", label: "View Embed Code" }
    ]
  },
  {
    id: "webhooks",
    label: "Webhooks",
    icon: "Webhook",
    subsections: [
      { id: "view_webhooks", label: "View Webhooks" },
      { id: "create_webhooks", label: "Create Webhooks" },
      { id: "edit_webhooks", label: "Edit Webhooks" },
      { id: "delete_webhooks", label: "Delete Webhooks" }
    ]
  },
  {
    id: "phone_numbers",
    label: "Phone Numbers",
    icon: "PhoneCall",
    subsections: [
      { id: "view_numbers", label: "View Numbers" },
      { id: "purchase_numbers", label: "Purchase Numbers" },
      { id: "manage_numbers", label: "Manage Numbers" }
    ]
  },
  {
    id: "billing",
    label: "Billing & Credits",
    icon: "CreditCard",
    subsections: [
      { id: "view_billing", label: "View Billing" },
      { id: "manage_billing", label: "Manage Billing" },
      { id: "purchase_credits", label: "Purchase Credits" }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "BarChart3",
    subsections: [
      { id: "view_analytics", label: "View Analytics" },
      { id: "export_analytics", label: "Export Reports" }
    ]
  },
  {
    id: "api_keys",
    label: "API Keys",
    icon: "Key",
    subsections: [
      { id: "view_api_keys", label: "View API Keys" },
      { id: "create_api_keys", label: "Create API Keys" },
      { id: "delete_api_keys", label: "Delete API Keys" }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    subsections: [
      { id: "view_settings", label: "View Settings" },
      { id: "edit_settings", label: "Edit Settings" },
      { id: "manage_integrations", label: "Manage Integrations" }
    ]
  },
  {
    id: "team",
    label: "Team Management",
    icon: "UserCog",
    subsections: [
      { id: "view_team", label: "View Team" },
      { id: "invite_members", label: "Invite Members" },
      { id: "manage_members", label: "Manage Members" },
      { id: "manage_roles", label: "Manage Roles" }
    ]
  }
];
var ADMIN_PERMISSION_SECTIONS = [
  {
    id: "users",
    label: "Users",
    icon: "Users",
    subsections: [
      { id: "view_users", label: "View Users" },
      { id: "edit_users", label: "Edit Users" },
      { id: "suspend_users", label: "Suspend Users" },
      { id: "delete_users", label: "Delete Users" },
      { id: "manage_credits", label: "Manage Credits" },
      { id: "manage_plans", label: "Manage User Plans" }
    ]
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: "Contact",
    subsections: [
      { id: "view_contacts", label: "View Contacts" },
      { id: "edit_contacts", label: "Edit Contacts" },
      { id: "delete_contacts", label: "Delete Contacts" },
      { id: "export_contacts", label: "Export Contacts" }
    ]
  },
  {
    id: "billing",
    label: "Billing",
    icon: "CreditCard",
    subsections: [
      { id: "plans", label: "Plans" },
      { id: "credits", label: "Credits" },
      { id: "transactions", label: "Transactions" },
      { id: "payments", label: "Payments" }
    ]
  },
  {
    id: "phones",
    label: "Phones",
    icon: "Phone",
    subsections: [
      { id: "phone_numbers", label: "Phone Numbers" }
    ]
  },
  {
    id: "batch_jobs",
    label: "Batch Jobs",
    icon: "ListChecks",
    subsections: [
      { id: "view_batch_jobs", label: "View Batch Jobs" },
      { id: "manage_batch_jobs", label: "Manage Batch Jobs" },
      { id: "cancel_batch_jobs", label: "Cancel Batch Jobs" }
    ]
  },
  {
    id: "call_monitoring",
    label: "Call Monitoring",
    icon: "PhoneCall",
    subsections: [
      { id: "all_calls", label: "All Calls" },
      { id: "banned_words", label: "Banned Words" }
    ]
  },
  {
    id: "communications",
    label: "Communications",
    icon: "MessageSquare",
    subsections: [
      { id: "email_settings", label: "Email Settings" },
      { id: "notifications", label: "In-App Notifications" }
    ]
  },
  {
    id: "voice_ai",
    label: "Voice AI",
    icon: "Mic",
    subsections: [
      { id: "twilio_openai_engine", label: "Twilio + OpenAI Engine" },
      { id: "plivo_openai_engine", label: "Plivo + OpenAI Engine" },
      { id: "openai_pool", label: "OpenAI Pool" },
      { id: "plivo_settings", label: "Plivo Settings" }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    subsections: [
      { id: "master_settings", label: "Master Settings" },
      { id: "elevenlabs_settings", label: "ElevenLabs Settings" },
      { id: "seo_settings", label: "SEO Module" },
      { id: "analytics_settings", label: "Analytics" },
      { id: "languages_settings", label: "Languages" },
      { id: "system_settings", label: "System Settings" }
    ]
  }
];

// plugins/team-management/services/team.service.js
var BCRYPT_ROUNDS = 12;
var TeamService = class {
  static async createTeam(userId, name) {
    const result = await db.execute(sql2`
      INSERT INTO teams (user_id, name)
      VALUES (${userId}, ${name || "My Team"})
      ON CONFLICT (user_id) DO UPDATE SET updated_at = NOW()
      RETURNING *
    `);
    const team = this.mapTeamRow(result.rows[0]);
    await this.initializeDefaultRoles(team.id);
    return team;
  }
  static async getTeamByUserId(userId) {
    const result = await db.execute(sql2`
      SELECT * FROM teams WHERE user_id = ${userId}
    `);
    if (result.rows.length === 0) return null;
    return this.mapTeamRow(result.rows[0]);
  }
  static async getTeamById(teamId) {
    const result = await db.execute(sql2`
      SELECT * FROM teams WHERE id = ${teamId}::uuid
    `);
    if (result.rows.length === 0) return null;
    return this.mapTeamRow(result.rows[0]);
  }
  static async updateTeam(teamId, data) {
    const setClauses = [];
    if (data.name) {
      setClauses.push(sql2`name = ${data.name}`);
    }
    if (data.description !== void 0) {
      setClauses.push(sql2`description = ${data.description}`);
    }
    if (data.settings) {
      setClauses.push(sql2`settings = ${JSON.stringify(data.settings)}::jsonb`);
    }
    if (setClauses.length === 0) {
      const team = await this.getTeamById(teamId);
      if (!team) throw new Error("Team not found");
      return team;
    }
    const result = await db.execute(sql2`
      UPDATE teams 
      SET ${sql2.join(setClauses, sql2`, `)}, updated_at = NOW()
      WHERE id = ${teamId}::uuid
      RETURNING *
    `);
    return this.mapTeamRow(result.rows[0]);
  }
  static async initializeDefaultRoles(teamId) {
    const defaultRoles = [
      { name: "owner", displayName: "Owner", description: "Full access to all features", isDefault: false },
      { name: "admin", displayName: "Admin", description: "Manage team and most features", isDefault: false },
      { name: "manager", displayName: "Manager", description: "Manage campaigns and agents", isDefault: true },
      { name: "viewer", displayName: "Viewer", description: "View-only access", isDefault: false }
    ];
    const roles = [];
    for (const role of defaultRoles) {
      const result = await db.execute(sql2`
        INSERT INTO team_roles (team_id, name, display_name, description, is_system, is_default)
        VALUES (${teamId}::uuid, ${role.name}, ${role.displayName}, ${role.description}, true, ${role.isDefault})
        ON CONFLICT (team_id, name) DO NOTHING
        RETURNING *
      `);
      if (result.rows.length > 0) {
        const createdRole = this.mapRoleRow(result.rows[0]);
        roles.push(createdRole);
        await this.initializeRolePermissions(createdRole.id, role.name);
      }
    }
    return roles;
  }
  static async initializeRolePermissions(roleId, roleName) {
    const permissions = DEFAULT_ROLE_PERMISSIONS[roleName];
    for (const section of PERMISSION_SECTIONS) {
      for (const subsection of section.subsections) {
        const permKey = `${section.id}.${subsection.id}`;
        const wildcardSection = `${section.id}.*`;
        const hasPermission = permissions["*"] || permissions[wildcardSection] || permissions[permKey];
        if (hasPermission) {
          await db.execute(sql2`
            INSERT INTO team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
            VALUES (
              ${roleId}::uuid, 
              ${section.id}, 
              ${subsection.id}, 
              true, true, true, true
            )
            ON CONFLICT (role_id, section, subsection) DO NOTHING
          `);
        }
      }
    }
  }
  static async createMember(teamId, data) {
    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    const result = await db.execute(sql2`
      INSERT INTO team_members (team_id, email, password_hash, first_name, last_name, role_id, status)
      VALUES (
        ${teamId}::uuid, 
        ${data.email.toLowerCase()}, 
        ${passwordHash}, 
        ${data.firstName || null}, 
        ${data.lastName || null}, 
        ${data.roleId}::uuid,
        'active'
      )
      RETURNING *
    `);
    return this.mapMemberRow(result.rows[0]);
  }
  static async getMemberById(memberId) {
    const result = await db.execute(sql2`
      SELECT * FROM team_members WHERE id = ${memberId}::uuid
    `);
    if (result.rows.length === 0) return null;
    return this.mapMemberRow(result.rows[0]);
  }
  static async getMemberByEmail(teamId, email) {
    const result = await db.execute(sql2`
      SELECT * FROM team_members 
      WHERE team_id = ${teamId}::uuid AND LOWER(email) = ${email.toLowerCase()}
    `);
    if (result.rows.length === 0) return null;
    return this.mapMemberRow(result.rows[0]);
  }
  static async getMemberWithRole(memberId) {
    const result = await db.execute(sql2`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, 
             r.description as role_description, r.is_system as role_is_system, r.is_default as role_is_default
      FROM team_members m
      JOIN team_roles r ON m.role_id = r.id
      WHERE m.id = ${memberId}::uuid
    `);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      ...this.mapMemberRow(row),
      role: {
        id: row.role_id,
        teamId: row.team_id,
        name: row.role_name,
        displayName: row.role_display_name,
        description: row.role_description,
        isSystem: row.role_is_system,
        isDefault: row.role_is_default,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    };
  }
  static async getMembersByTeam(teamId) {
    const result = await db.execute(sql2`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, 
             r.description as role_description, r.is_system as role_is_system, r.is_default as role_is_default
      FROM team_members m
      JOIN team_roles r ON m.role_id = r.id
      WHERE m.team_id = ${teamId}::uuid
      ORDER BY m.created_at ASC
    `);
    return result.rows.map((row) => ({
      ...this.mapMemberRow(row),
      role: {
        id: row.role_id,
        teamId: row.team_id,
        name: row.role_name,
        displayName: row.role_display_name,
        description: row.role_description,
        isSystem: row.role_is_system,
        isDefault: row.role_is_default,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    }));
  }
  static async updateMember(memberId, data) {
    const setClauses = [];
    if (data.firstName !== void 0) setClauses.push(sql2`first_name = ${data.firstName}`);
    if (data.lastName !== void 0) setClauses.push(sql2`last_name = ${data.lastName}`);
    if (data.roleId) setClauses.push(sql2`role_id = ${data.roleId}::uuid`);
    if (data.status) setClauses.push(sql2`status = ${data.status}`);
    if (setClauses.length === 0) {
      const member = await this.getMemberById(memberId);
      if (!member) throw new Error("Member not found");
      return member;
    }
    const result = await db.execute(sql2`
      UPDATE team_members 
      SET ${sql2.join(setClauses, sql2`, `)}
      WHERE id = ${memberId}::uuid
      RETURNING *
    `);
    if (result.rows.length === 0) throw new Error("Member not found");
    return this.mapMemberRow(result.rows[0]);
  }
  static async updateMemberPassword(memberId, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await db.execute(sql2`
      UPDATE team_members 
      SET password_hash = ${passwordHash}
      WHERE id = ${memberId}::uuid
    `);
  }
  static async deleteMember(memberId) {
    await db.execute(sql2`
      DELETE FROM team_member_sessions WHERE member_id = ${memberId}::uuid
    `);
    await db.execute(sql2`
      DELETE FROM team_members WHERE id = ${memberId}::uuid
    `);
  }
  static async getRolesByTeam(teamId) {
    const result = await db.execute(sql2`
      SELECT * FROM team_roles 
      WHERE team_id = ${teamId}::uuid
      ORDER BY is_system DESC, created_at ASC
    `);
    return result.rows.map((row) => this.mapRoleRow(row));
  }
  static async getRoleById(roleId) {
    const result = await db.execute(sql2`
      SELECT * FROM team_roles WHERE id = ${roleId}::uuid
    `);
    if (result.rows.length === 0) return null;
    return this.mapRoleRow(result.rows[0]);
  }
  static async createRole(teamId, data) {
    const result = await db.execute(sql2`
      INSERT INTO team_roles (team_id, name, display_name, description, is_system, is_default)
      VALUES (
        ${teamId}::uuid, 
        ${data.name.toLowerCase().replace(/\s+/g, "_")}, 
        ${data.displayName}, 
        ${data.description || null},
        false,
        false
      )
      RETURNING *
    `);
    const role = this.mapRoleRow(result.rows[0]);
    if (data.copyFromRoleId) {
      await this.copyRolePermissions(data.copyFromRoleId, role.id);
    }
    return role;
  }
  static async updateRole(roleId, data) {
    if (!data.displayName && data.description === void 0) {
      const role = await this.getRoleById(roleId);
      if (!role) throw new Error("Role not found");
      return role;
    }
    const result = await db.execute(sql2`
      UPDATE team_roles 
      SET 
        display_name = COALESCE(${data.displayName || null}, display_name),
        description = CASE WHEN ${data.description !== void 0} THEN ${data.description || null} ELSE description END
      WHERE id = ${roleId}::uuid AND is_system = false
      RETURNING *
    `);
    if (result.rows.length === 0) throw new Error("Role not found or is a system role");
    return this.mapRoleRow(result.rows[0]);
  }
  static async deleteRole(roleId) {
    const role = await this.getRoleById(roleId);
    if (!role) throw new Error("Role not found");
    if (role.isSystem) throw new Error("Cannot delete system roles");
    const membersWithRole = await db.execute(sql2`
      SELECT COUNT(*) as count FROM team_members WHERE role_id = ${roleId}::uuid
    `);
    if (parseInt(membersWithRole.rows[0].count) > 0) {
      throw new Error("Cannot delete role with assigned members");
    }
    await db.execute(sql2`
      DELETE FROM team_permissions WHERE role_id = ${roleId}::uuid
    `);
    await db.execute(sql2`
      DELETE FROM team_roles WHERE id = ${roleId}::uuid
    `);
  }
  static async copyRolePermissions(fromRoleId, toRoleId) {
    await db.execute(sql2`
      INSERT INTO team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
      SELECT ${toRoleId}::uuid, section, subsection, can_create, can_read, can_update, can_delete
      FROM team_permissions
      WHERE role_id = ${fromRoleId}::uuid
      ON CONFLICT (role_id, section, subsection) DO UPDATE
      SET can_create = EXCLUDED.can_create,
          can_read = EXCLUDED.can_read,
          can_update = EXCLUDED.can_update,
          can_delete = EXCLUDED.can_delete
    `);
  }
  static async getMemberCount(teamId) {
    const result = await db.execute(sql2`
      SELECT COUNT(*) as count FROM team_members WHERE team_id = ${teamId}::uuid
    `);
    return parseInt(result.rows[0].count);
  }
  static async logActivity(teamId, memberId, action, targetType, targetId, metadata, ipAddress) {
    await db.execute(sql2`
      INSERT INTO team_activity_logs (team_id, member_id, action, target_type, target_id, metadata, ip_address)
      VALUES (
        ${teamId}::uuid, 
        ${memberId ? sql2`${memberId}::uuid` : sql2`NULL`}, 
        ${action}, 
        ${targetType}, 
        ${targetId ? sql2`${targetId}::uuid` : sql2`NULL`},
        ${metadata ? JSON.stringify(metadata) : null}::jsonb,
        ${ipAddress || null}
      )
    `);
  }
  static async getActivityLogs(teamId, options) {
    const page = options?.page || 1;
    const pageSize = options?.pageSize || 50;
    const offset = (page - 1) * pageSize;
    const search = options?.search?.toLowerCase();
    let query = sql2`
      SELECT 
        tal.id,
        tal.team_id,
        tal.member_id,
        tal.action,
        tal.target_type,
        tal.target_id,
        tal.metadata,
        tal.ip_address,
        tal.created_at,
        tm.email as member_email,
        tm.first_name as member_first_name,
        tm.last_name as member_last_name
      FROM team_activity_logs tal
      LEFT JOIN team_members tm ON tal.member_id = tm.id
      WHERE tal.team_id = ${teamId}::uuid
    `;
    if (search) {
      query = sql2`${query} AND (
        LOWER(tal.action) LIKE ${`%${search}%`}
        OR LOWER(tal.target_type) LIKE ${`%${search}%`}
        OR LOWER(tm.email) LIKE ${`%${search}%`}
        OR LOWER(tm.first_name) LIKE ${`%${search}%`}
        OR LOWER(tm.last_name) LIKE ${`%${search}%`}
      )`;
    }
    query = sql2`${query} ORDER BY tal.created_at DESC LIMIT ${pageSize} OFFSET ${offset}`;
    const result = await db.execute(query);
    let countQuery = sql2`
      SELECT COUNT(*) as count FROM team_activity_logs tal
      LEFT JOIN team_members tm ON tal.member_id = tm.id
      WHERE tal.team_id = ${teamId}::uuid
    `;
    if (search) {
      countQuery = sql2`${countQuery} AND (
        LOWER(tal.action) LIKE ${`%${search}%`}
        OR LOWER(tal.target_type) LIKE ${`%${search}%`}
        OR LOWER(tm.email) LIKE ${`%${search}%`}
        OR LOWER(tm.first_name) LIKE ${`%${search}%`}
        OR LOWER(tm.last_name) LIKE ${`%${search}%`}
      )`;
    }
    const countResult = await db.execute(countQuery);
    const total = parseInt(countResult.rows[0].count);
    const activities = result.rows.map((row) => ({
      id: row.id,
      teamId: row.team_id,
      memberId: row.member_id,
      memberEmail: row.member_email,
      memberName: row.member_first_name && row.member_last_name ? `${row.member_first_name} ${row.member_last_name}` : row.member_email || "System",
      action: row.action,
      targetType: row.target_type,
      targetId: row.target_id,
      metadata: row.metadata,
      ipAddress: row.ip_address,
      createdAt: new Date(row.created_at).toISOString()
    }));
    return { activities, total };
  }
  static mapTeamRow(row) {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      description: row.description,
      settings: typeof row.settings === "string" ? JSON.parse(row.settings) : row.settings,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  static mapMemberRow(row) {
    return {
      id: row.id,
      teamId: row.team_id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      lastName: row.last_name,
      roleId: row.role_id,
      status: row.status,
      lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : void 0,
      invitedBy: row.invited_by,
      invitedAt: row.invited_at ? new Date(row.invited_at) : void 0,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  static mapRoleRow(row) {
    return {
      id: row.id,
      teamId: row.team_id,
      name: row.name,
      displayName: row.display_name,
      description: row.description,
      isSystem: row.is_system,
      isDefault: row.is_default,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
};

// plugins/team-management/routes/user-team.routes.js
var router = Router();
router.get("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      team = await TeamService.createTeam(req.userId);
    }
    const memberCount = await TeamService.getMemberCount(team.id);
    res.json({
      ...team,
      memberCount
    });
  } catch (error) {
    console.error("[Team] Error fetching team:", error);
    res.status(500).json({ error: "Failed to fetch team" });
  }
});
router.post("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name } = req.body;
    const existingTeam = await TeamService.getTeamByUserId(req.userId);
    if (existingTeam) {
      return res.status(400).json({ error: "Team already exists" });
    }
    const team = await TeamService.createTeam(req.userId, name);
    res.status(201).json(team);
  } catch (error) {
    console.error("[Team] Error creating team:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
});
router.patch("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const { name, description, settings } = req.body;
    const updatedTeam = await TeamService.updateTeam(team.id, {
      name,
      description,
      settings
    });
    res.json(updatedTeam);
  } catch (error) {
    console.error("[Team] Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
});
router.get("/activity", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;
    const { activities, total } = await TeamService.getActivityLogs(team.id, {
      search,
      page,
      pageSize
    });
    res.json({
      activities,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error("[Team] Error fetching activity:", error);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});
var user_team_routes_default = router;

// plugins/team-management/routes/user-members.routes.js
import { Router as Router2 } from "express";

// plugins/team-management/services/team-auth.service.js
import { sql as sql4 } from "drizzle-orm";
import bcrypt2 from "bcrypt";
import crypto from "crypto";

// plugins/team-management/services/team-permission.service.js
import { sql as sql3 } from "drizzle-orm";
var TeamPermissionService = class {
  static async checkPermission(roleId, check) {
    const result = await db.execute(sql3`
      SELECT * FROM team_permissions 
      WHERE role_id = ${roleId}::uuid 
        AND section = ${check.section}
        AND subsection = ${check.subsection}
    `);
    if (result.rows.length === 0) {
      return false;
    }
    const perm = result.rows[0];
    switch (check.action) {
      case "create":
        return perm.can_create;
      case "read":
        return perm.can_read;
      case "update":
        return perm.can_update;
      case "delete":
        return perm.can_delete;
      default:
        return false;
    }
  }
  static async checkMemberPermission(memberId, check) {
    const memberResult = await db.execute(sql3`
      SELECT role_id FROM team_members WHERE id = ${memberId}::uuid
    `);
    if (memberResult.rows.length === 0) {
      return false;
    }
    const roleId = memberResult.rows[0].role_id;
    return this.checkPermission(roleId, check);
  }
  static async getPermissionsForRole(roleId) {
    const result = await db.execute(sql3`
      SELECT * FROM team_permissions WHERE role_id = ${roleId}::uuid
    `);
    return result.rows.map((row) => ({
      id: row.id,
      roleId: row.role_id,
      section: row.section,
      subsection: row.subsection,
      canCreate: row.can_create,
      canRead: row.can_read,
      canUpdate: row.can_update,
      canDelete: row.can_delete
    }));
  }
  static async getPermissionMatrix(roleId) {
    const permissions = await this.getPermissionsForRole(roleId);
    const permMap = /* @__PURE__ */ new Map();
    for (const perm of permissions) {
      permMap.set(`${perm.section}.${perm.subsection}`, perm);
    }
    const sections = PERMISSION_SECTIONS.map((section) => ({
      id: section.id,
      label: section.label,
      icon: section.icon,
      subsections: section.subsections.map((sub) => {
        const perm = permMap.get(`${section.id}.${sub.id}`);
        return {
          id: sub.id,
          label: sub.label,
          canCreate: perm?.canCreate ?? false,
          canRead: perm?.canRead ?? false,
          canUpdate: perm?.canUpdate ?? false,
          canDelete: perm?.canDelete ?? false
        };
      })
    }));
    return { roleId, sections };
  }
  static async setPermission(data) {
    const result = await db.execute(sql3`
      INSERT INTO team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
      VALUES (
        ${data.roleId}::uuid, 
        ${data.section}, 
        ${data.subsection}, 
        ${data.canCreate}, 
        ${data.canRead}, 
        ${data.canUpdate}, 
        ${data.canDelete}
      )
      ON CONFLICT (role_id, section, subsection) DO UPDATE
      SET can_create = ${data.canCreate},
          can_read = ${data.canRead},
          can_update = ${data.canUpdate},
          can_delete = ${data.canDelete},
          updated_at = NOW()
      RETURNING *
    `);
    const row = result.rows[0];
    return {
      id: row.id,
      roleId: row.role_id,
      section: row.section,
      subsection: row.subsection,
      canCreate: row.can_create,
      canRead: row.can_read,
      canUpdate: row.can_update,
      canDelete: row.can_delete
    };
  }
  static async bulkSetPermissions(data) {
    if (data.permissions.length === 0) return;
    const CHUNK_SIZE = 50;
    const chunks = [];
    for (let i = 0; i < data.permissions.length; i += CHUNK_SIZE) {
      chunks.push(data.permissions.slice(i, i + CHUNK_SIZE));
    }
    await Promise.all(chunks.map(async (chunk) => {
      const values = chunk.map(
        (perm) => sql3`(${data.roleId}::uuid, ${perm.section}, ${perm.subsection}, ${perm.canCreate}, ${perm.canRead}, ${perm.canUpdate}, ${perm.canDelete})`
      );
      await db.execute(sql3`
        INSERT INTO team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
        VALUES ${sql3.join(values, sql3`, `)}
        ON CONFLICT (role_id, section, subsection) DO UPDATE
        SET can_create = EXCLUDED.can_create,
            can_read = EXCLUDED.can_read,
            can_update = EXCLUDED.can_update,
            can_delete = EXCLUDED.can_delete,
            updated_at = NOW()
      `);
    }));
  }
  static async clearRolePermissions(roleId) {
    await db.execute(sql3`
      DELETE FROM team_permissions WHERE role_id = ${roleId}::uuid
    `);
  }
  static async grantAllPermissions(roleId) {
    for (const section of PERMISSION_SECTIONS) {
      for (const subsection of section.subsections) {
        await this.setPermission({
          roleId,
          section: section.id,
          subsection: subsection.id,
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true
        });
      }
    }
  }
  static async grantSectionPermissions(roleId, sectionId, permissions) {
    const section = PERMISSION_SECTIONS.find((s) => s.id === sectionId);
    if (!section) return;
    for (const subsection of section.subsections) {
      await this.setPermission({
        roleId,
        section: sectionId,
        subsection: subsection.id,
        canCreate: permissions.canCreate ?? false,
        canRead: permissions.canRead ?? false,
        canUpdate: permissions.canUpdate ?? false,
        canDelete: permissions.canDelete ?? false
      });
    }
  }
  static getAvailableSections() {
    return PERMISSION_SECTIONS;
  }
};

// plugins/team-management/services/team-auth.service.js
var SESSION_EXPIRY_HOURS = parseInt(process.env.TEAM_SESSION_EXPIRY || "24");
var TeamAuthService = class {
  static async login(data) {
    try {
      let teamId = data.teamId;
      if (!teamId) {
        const memberResult = await db.execute(sql4`
          SELECT team_id FROM team_members 
          WHERE LOWER(email) = ${data.email.toLowerCase()}
          LIMIT 1
        `);
        if (memberResult.rows.length === 0) {
          return { success: false, error: "Invalid email or password" };
        }
        teamId = memberResult.rows[0].team_id;
      }
      const member = await TeamService.getMemberByEmail(teamId, data.email);
      if (!member) {
        return { success: false, error: "Invalid email or password" };
      }
      if (member.status !== "active") {
        return { success: false, error: "Account is not active" };
      }
      const passwordValid = await bcrypt2.compare(data.password, member.passwordHash);
      if (!passwordValid) {
        return { success: false, error: "Invalid email or password" };
      }
      const token = this.generateToken();
      const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1e3);
      await db.execute(sql4`
        INSERT INTO team_member_sessions (member_id, team_id, token, expires_at)
        VALUES (${member.id}::uuid, ${member.teamId}::uuid, ${token}, ${expiresAt})
      `);
      await db.execute(sql4`
        UPDATE team_members SET last_login_at = NOW() WHERE id = ${member.id}::uuid
      `);
      const team = await TeamService.getTeamById(member.teamId);
      const memberWithRole = await TeamService.getMemberWithRole(member.id);
      await TeamService.logActivity(
        member.teamId,
        member.id,
        "login",
        "member",
        member.id
      );
      return {
        success: true,
        token,
        member: memberWithRole,
        team,
        expiresAt
      };
    } catch (error) {
      console.error("[Team Auth] Login error:", error);
      return { success: false, error: "Authentication failed" };
    }
  }
  static async logout(token) {
    await db.execute(sql4`
      DELETE FROM team_member_sessions WHERE token = ${token}
    `);
  }
  static async validateSession(token) {
    try {
      const sessionResult = await db.execute(sql4`
        SELECT s.*, m.role_id, m.team_id, t.user_id, r.name as role_name
        FROM team_member_sessions s
        JOIN team_members m ON s.member_id = m.id
        JOIN teams t ON s.team_id = t.id
        JOIN team_roles r ON m.role_id = r.id
        WHERE s.token = ${token} AND s.expires_at > NOW()
      `);
      if (sessionResult.rows.length === 0) {
        return null;
      }
      const session = sessionResult.rows[0];
      await db.execute(sql4`
        UPDATE team_member_sessions SET last_activity_at = NOW() WHERE token = ${token}
      `);
      const permissions = await TeamPermissionService.getPermissionsForRole(session.role_id);
      return {
        memberId: session.member_id,
        teamId: session.team_id,
        userId: session.user_id,
        roleId: session.role_id,
        roleName: session.role_name,
        permissions
      };
    } catch (error) {
      console.error("[Team Auth] Session validation error:", error);
      return null;
    }
  }
  static async refreshSession(token) {
    const context = await this.validateSession(token);
    if (!context) {
      return null;
    }
    const newToken = this.generateToken();
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1e3);
    await db.execute(sql4`
      UPDATE team_member_sessions 
      SET token = ${newToken}, expires_at = ${expiresAt}, last_activity_at = NOW()
      WHERE token = ${token}
    `);
    return newToken;
  }
  static async invalidateAllSessions(memberId) {
    await db.execute(sql4`
      DELETE FROM team_member_sessions WHERE member_id = ${memberId}::uuid
    `);
  }
  static async cleanupExpiredSessions() {
    const result = await db.execute(sql4`
      DELETE FROM team_member_sessions WHERE expires_at < NOW()
      RETURNING id
    `);
    return result.rows.length;
  }
  static async getActiveSessions(memberId) {
    const result = await db.execute(sql4`
      SELECT * FROM team_member_sessions 
      WHERE member_id = ${memberId}::uuid AND expires_at > NOW()
      ORDER BY last_activity_at DESC
    `);
    return result.rows.map((row) => ({
      id: row.id,
      memberId: row.member_id,
      teamId: row.team_id,
      token: row.token,
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
      lastActivityAt: new Date(row.last_activity_at),
      userAgent: row.user_agent,
      ipAddress: row.ip_address
    }));
  }
  static async generatePasswordResetToken(memberId) {
    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1e3);
    return token;
  }
  static generateToken() {
    return crypto.randomBytes(32).toString("hex");
  }
};

// plugins/team-management/routes/user-members.routes.js
var router2 = Router2();
router2.get("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const members = await TeamService.getMembersByTeam(team.id);
    const sanitizedMembers = members.map((m) => ({
      id: m.id,
      email: m.email,
      name: `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.email,
      roleId: m.roleId,
      roleName: m.role?.displayName || m.role?.name || "Unknown",
      status: m.status,
      lastLoginAt: m.lastLoginAt,
      createdAt: m.createdAt
    }));
    res.json({ members: sanitizedMembers });
  } catch (error) {
    console.error("[Team Members] Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});
router2.post("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const { email, password, firstName, lastName, roleId } = req.body;
    if (!email || !password || !roleId) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }
    const existingMember = await TeamService.getMemberByEmail(team.id, email);
    if (existingMember) {
      return res.status(400).json({ error: "A member with this email already exists" });
    }
    const memberCount = await TeamService.getMemberCount(team.id);
    if (memberCount >= team.settings.maxMembers) {
      return res.status(400).json({ error: "Team member limit reached" });
    }
    const member = await TeamService.createMember(team.id, {
      email,
      password,
      firstName,
      lastName,
      roleId
    });
    await TeamService.logActivity(team.id, null, "member_created", "member", member.id, {
      email: member.email
    });
    res.status(201).json({
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      roleId: member.roleId,
      status: member.status,
      createdAt: member.createdAt
    });
  } catch (error) {
    console.error("[Team Members] Error creating member:", error);
    res.status(500).json({ error: "Failed to create team member" });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberWithRole(req.params.id);
    if (!member || member.teamId !== team.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json({
      id: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      status: member.status,
      lastLoginAt: member.lastLoginAt,
      createdAt: member.createdAt
    });
  } catch (error) {
    console.error("[Team Members] Error fetching member:", error);
    res.status(500).json({ error: "Failed to fetch team member" });
  }
});
router2.patch("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberById(req.params.id);
    if (!member || member.teamId !== team.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    const { firstName, lastName, roleId, status } = req.body;
    const updatedMember = await TeamService.updateMember(req.params.id, {
      firstName,
      lastName,
      roleId,
      status
    });
    await TeamService.logActivity(team.id, null, "member_updated", "member", member.id, {
      changes: { firstName, lastName, roleId, status }
    });
    res.json({
      id: updatedMember.id,
      email: updatedMember.email,
      firstName: updatedMember.firstName,
      lastName: updatedMember.lastName,
      roleId: updatedMember.roleId,
      status: updatedMember.status
    });
  } catch (error) {
    console.error("[Team Members] Error updating member:", error);
    res.status(500).json({ error: "Failed to update team member" });
  }
});
router2.delete("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberById(req.params.id);
    if (!member || member.teamId !== team.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    await TeamService.deleteMember(req.params.id);
    await TeamService.logActivity(team.id, null, "member_deleted", "member", req.params.id, {
      email: member.email
    });
    res.json({ success: true });
  } catch (error) {
    console.error("[Team Members] Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete team member" });
  }
});
router2.post("/:id/reset-password", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberById(req.params.id);
    if (!member || member.teamId !== team.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    await TeamService.updateMemberPassword(req.params.id, newPassword);
    await TeamAuthService.invalidateAllSessions(req.params.id);
    await TeamService.logActivity(team.id, null, "password_reset", "member", req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("[Team Members] Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});
var user_members_routes_default = router2;

// plugins/team-management/routes/user-roles.routes.js
import { Router as Router3 } from "express";
var router3 = Router3();
router3.get("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const roles = await TeamService.getRolesByTeam(team.id);
    const formattedRoles = roles.map((r) => ({
      id: r.id,
      name: r.displayName || r.name,
      description: r.description,
      isSystemRole: r.isSystem,
      createdAt: r.createdAt
    }));
    res.json({ roles: formattedRoles });
  } catch (error) {
    console.error("[Team Roles] Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});
router3.post("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    if (!team.settings.allowCustomRoles) {
      return res.status(403).json({ error: "Custom roles are not allowed for this team" });
    }
    const { name, displayName, description, copyFromRoleId } = req.body;
    if (!name || !displayName) {
      return res.status(400).json({ error: "Name and display name are required" });
    }
    const role = await TeamService.createRole(team.id, {
      name,
      displayName,
      description,
      copyFromRoleId
    });
    await TeamService.logActivity(team.id, null, "role_created", "role", role.id, {
      name: role.name
    });
    res.status(201).json(role);
  } catch (error) {
    console.error("[Team Roles] Error creating role:", error);
    if (error.message?.includes("unique")) {
      return res.status(400).json({ error: "A role with this name already exists" });
    }
    res.status(500).json({ error: "Failed to create role" });
  }
});
router3.get("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.id);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    const permissionMatrix = await TeamPermissionService.getPermissionMatrix(role.id);
    res.json({
      ...role,
      permissions: permissionMatrix
    });
  } catch (error) {
    console.error("[Team Roles] Error fetching role:", error);
    res.status(500).json({ error: "Failed to fetch role" });
  }
});
router3.patch("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.id);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    if (role.isSystem) {
      return res.status(403).json({ error: "System roles cannot be modified" });
    }
    const { displayName, description } = req.body;
    const updatedRole = await TeamService.updateRole(req.params.id, {
      displayName,
      description
    });
    await TeamService.logActivity(team.id, null, "role_updated", "role", role.id);
    res.json(updatedRole);
  } catch (error) {
    console.error("[Team Roles] Error updating role:", error);
    res.status(500).json({ error: "Failed to update role" });
  }
});
router3.delete("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.id);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    await TeamService.deleteRole(req.params.id);
    await TeamService.logActivity(team.id, null, "role_deleted", "role", req.params.id, {
      name: role.name
    });
    res.json({ success: true });
  } catch (error) {
    console.error("[Team Roles] Error deleting role:", error);
    if (error.message?.includes("system")) {
      return res.status(403).json({ error: "System roles cannot be deleted" });
    }
    if (error.message?.includes("assigned")) {
      return res.status(400).json({ error: "Cannot delete a role that is currently assigned to members" });
    }
    res.status(500).json({ error: "Failed to delete role" });
  }
});
var user_roles_routes_default = router3;

// plugins/team-management/routes/user-permissions.routes.js
import { Router as Router4 } from "express";
var router4 = Router4();
router4.get("/sections", async (req, res) => {
  try {
    res.json(PERMISSION_SECTIONS);
  } catch (error) {
    console.error("[Team Permissions] Error fetching sections:", error);
    res.status(500).json({ error: "Failed to fetch permission sections" });
  }
});
router4.get("/matrix/:roleId", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.roleId);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    const matrix = await TeamPermissionService.getPermissionMatrix(req.params.roleId);
    res.json(matrix);
  } catch (error) {
    console.error("[Team Permissions] Error fetching matrix:", error);
    res.status(500).json({ error: "Failed to fetch permission matrix" });
  }
});
router4.patch("/:roleId", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.roleId);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    const { permissions } = req.body;
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ error: "Permissions must be an array" });
    }
    await TeamPermissionService.bulkSetPermissions({
      roleId: req.params.roleId,
      permissions
    });
    await TeamService.logActivity(team.id, null, "permissions_updated", "role", role.id, {
      permissionCount: permissions.length
    });
    const updatedMatrix = await TeamPermissionService.getPermissionMatrix(req.params.roleId);
    res.json(updatedMatrix);
  } catch (error) {
    console.error("[Team Permissions] Error updating permissions:", error);
    res.status(500).json({ error: "Failed to update permissions" });
  }
});
router4.post("/:roleId/grant-all", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.roleId);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    await TeamPermissionService.grantAllPermissions(req.params.roleId);
    await TeamService.logActivity(team.id, null, "permissions_granted_all", "role", role.id);
    const matrix = await TeamPermissionService.getPermissionMatrix(req.params.roleId);
    res.json(matrix);
  } catch (error) {
    console.error("[Team Permissions] Error granting all permissions:", error);
    res.status(500).json({ error: "Failed to grant all permissions" });
  }
});
router4.post("/:roleId/clear", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.roleId);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Role not found" });
    }
    await TeamPermissionService.clearRolePermissions(req.params.roleId);
    await TeamService.logActivity(team.id, null, "permissions_cleared", "role", role.id);
    const matrix = await TeamPermissionService.getPermissionMatrix(req.params.roleId);
    res.json(matrix);
  } catch (error) {
    console.error("[Team Permissions] Error clearing permissions:", error);
    res.status(500).json({ error: "Failed to clear permissions" });
  }
});
router4.post("/:roleId/copy-from/:sourceRoleId", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await TeamService.getTeamByUserId(req.userId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const role = await TeamService.getRoleById(req.params.roleId);
    if (!role || role.teamId !== team.id) {
      return res.status(404).json({ error: "Target role not found" });
    }
    const sourceRole = await TeamService.getRoleById(req.params.sourceRoleId);
    if (!sourceRole || sourceRole.teamId !== team.id) {
      return res.status(404).json({ error: "Source role not found" });
    }
    await TeamService.copyRolePermissions(req.params.sourceRoleId, req.params.roleId);
    await TeamService.logActivity(team.id, null, "permissions_copied", "role", role.id, {
      sourceRoleId: sourceRole.id,
      sourceRoleName: sourceRole.name
    });
    const matrix = await TeamPermissionService.getPermissionMatrix(req.params.roleId);
    res.json(matrix);
  } catch (error) {
    console.error("[Team Permissions] Error copying permissions:", error);
    res.status(500).json({ error: "Failed to copy permissions" });
  }
});
var user_permissions_routes_default = router4;

// plugins/team-management/routes/team-auth.routes.js
import { Router as Router5 } from "express";
import { eq } from "drizzle-orm";
var router5 = Router5();
router5.post("/login", async (req, res) => {
  try {
    const { email, password, teamId } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const result = await TeamAuthService.login({
      email,
      password,
      teamId
    });
    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }
    let teamDisplayName = result.team.name;
    const [parentUser] = await db.select({ company: users.company }).from(users).where(eq(users.id, String(result.team.userId)));
    if (parentUser?.company && (teamDisplayName === "My Team" || !teamDisplayName)) {
      teamDisplayName = parentUser.company;
    }
    res.json({
      token: result.token,
      expiresAt: result.expiresAt,
      member: {
        id: result.member.id,
        email: result.member.email,
        firstName: result.member.firstName,
        lastName: result.member.lastName,
        role: result.member.role
      },
      team: {
        id: result.team.id,
        name: teamDisplayName,
        type: "user",
        parentUserId: result.team.userId
      }
    });
  } catch (error) {
    console.error("[Team Auth] Login error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router5.post("/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    await TeamAuthService.logout(token);
    res.json({ success: true });
  } catch (error) {
    console.error("[Team Auth] Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});
router5.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const context = await TeamAuthService.validateSession(token);
    if (!context) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    const member = await TeamService.getMemberWithRole(context.memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    const team = await TeamService.getTeamById(context.teamId);
    const permMap = {};
    for (const perm of context.permissions) {
      if (!permMap[perm.section]) {
        permMap[perm.section] = {};
      }
      permMap[perm.section][perm.subsection] = {
        canCreate: perm.canCreate,
        canRead: perm.canRead,
        canUpdate: perm.canUpdate,
        canDelete: perm.canDelete
      };
    }
    let teamDisplayName = team?.name || "My Team";
    if (team) {
      const [parentUser] = await db.select({ company: users.company }).from(users).where(eq(users.id, String(team.userId)));
      if (parentUser?.company && (teamDisplayName === "My Team" || !teamDisplayName)) {
        teamDisplayName = parentUser.company;
      }
    }
    res.json({
      member: {
        id: member.id,
        email: member.email,
        firstName: member.firstName,
        lastName: member.lastName,
        role: member.role,
        status: member.status
      },
      team: team ? {
        id: team.id,
        name: teamDisplayName,
        type: "user",
        parentUserId: team.userId
      } : null,
      permissions: permMap,
      parentUserId: team?.userId
    });
  } catch (error) {
    console.error("[Team Auth] Get me error:", error);
    res.status(500).json({ error: "Failed to get member info" });
  }
});
router5.post("/refresh", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const newToken = await TeamAuthService.refreshSession(token);
    if (!newToken) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    res.json({
      token: newToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3)
    });
  } catch (error) {
    console.error("[Team Auth] Refresh error:", error);
    res.status(500).json({ error: "Failed to refresh session" });
  }
});
router5.get("/sessions", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const context = await TeamAuthService.validateSession(token);
    if (!context) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    const sessions = await TeamAuthService.getActiveSessions(context.memberId);
    res.json(sessions.map((s) => ({
      id: s.id,
      createdAt: s.createdAt,
      lastActivityAt: s.lastActivityAt,
      expiresAt: s.expiresAt,
      userAgent: s.userAgent,
      isCurrent: s.token === token
    })));
  } catch (error) {
    console.error("[Team Auth] Get sessions error:", error);
    res.status(500).json({ error: "Failed to get sessions" });
  }
});
var team_auth_routes_default = router5;

// plugins/team-management/routes/admin-team-auth.routes.js
import { Router as Router6 } from "express";

// plugins/team-management/services/admin-team.service.js
import { sql as sql5 } from "drizzle-orm";
import bcrypt3 from "bcrypt";
var BCRYPT_ROUNDS2 = 12;
var AdminTeamService = class {
  static async getOrCreateAdminTeam() {
    const existing = await db.execute(sql5`SELECT * FROM admin_teams LIMIT 1`);
    if (existing.rows.length > 0) {
      return this.mapTeamRow(existing.rows[0]);
    }
    const result = await db.execute(sql5`
      INSERT INTO admin_teams (name, description)
      VALUES ('Admin Team', 'Platform administration team for sub-admins')
      RETURNING *
    `);
    const team = this.mapTeamRow(result.rows[0]);
    await this.initializeDefaultRoles(team.id);
    return team;
  }
  static async getAdminTeam() {
    const result = await db.execute(sql5`SELECT * FROM admin_teams LIMIT 1`);
    if (result.rows.length === 0) return null;
    return this.mapTeamRow(result.rows[0]);
  }
  static async initializeDefaultRoles(adminTeamId) {
    const defaultRoles = [
      { name: "super_admin", displayName: "Super Admin", description: "Full access to all admin features", isDefault: false },
      { name: "admin", displayName: "Admin", description: "Manage users and billing", isDefault: true },
      { name: "support", displayName: "Support", description: "View users and handle support", isDefault: false },
      { name: "viewer", displayName: "Viewer", description: "Read-only access", isDefault: false }
    ];
    const roles = [];
    for (const role of defaultRoles) {
      const result = await db.execute(sql5`
        INSERT INTO admin_team_roles (admin_team_id, name, display_name, description, is_system, is_default)
        VALUES (${adminTeamId}, ${role.name}, ${role.displayName}, ${role.description}, true, ${role.isDefault})
        ON CONFLICT (admin_team_id, name) DO NOTHING
        RETURNING *
      `);
      if (result.rows.length > 0) {
        const createdRole = this.mapRoleRow(result.rows[0]);
        roles.push(createdRole);
        await this.initializeRolePermissions(createdRole.id, role.name);
      }
    }
    return roles;
  }
  static async initializeRolePermissions(roleId, roleName) {
    const permissionLevel = this.getDefaultPermissionLevel(roleName);
    for (const section of ADMIN_PERMISSION_SECTIONS) {
      for (const subsection of section.subsections) {
        const perms = this.getPermissionsForLevel(permissionLevel);
        await db.execute(sql5`
          INSERT INTO admin_team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
          VALUES (${roleId}, ${section.id}, ${subsection.id}, ${perms.canCreate}, ${perms.canRead}, ${perms.canUpdate}, ${perms.canDelete})
          ON CONFLICT (role_id, section, subsection) DO NOTHING
        `);
      }
    }
  }
  static getDefaultPermissionLevel(roleName) {
    switch (roleName) {
      case "super_admin":
        return "full";
      case "admin":
        return "manage";
      case "support":
        return "read";
      case "viewer":
        return "read";
      default:
        return "none";
    }
  }
  static getPermissionsForLevel(level) {
    switch (level) {
      case "full":
        return { canCreate: true, canRead: true, canUpdate: true, canDelete: true };
      case "manage":
        return { canCreate: true, canRead: true, canUpdate: true, canDelete: false };
      case "read":
        return { canCreate: false, canRead: true, canUpdate: false, canDelete: false };
      default:
        return { canCreate: false, canRead: false, canUpdate: false, canDelete: false };
    }
  }
  static async createMember(adminTeamId, data) {
    const passwordHash = await bcrypt3.hash(data.password, BCRYPT_ROUNDS2);
    const result = await db.execute(sql5`
      INSERT INTO admin_team_members (admin_team_id, email, password_hash, first_name, last_name, role_id, status, invited_by, invited_at)
      VALUES (
        ${adminTeamId},
        ${data.email.toLowerCase()},
        ${passwordHash},
        ${data.firstName || null},
        ${data.lastName || null},
        ${data.roleId},
        'active',
        ${data.invitedBy || null},
        NOW()
      )
      RETURNING *
    `);
    return this.mapMemberRow(result.rows[0]);
  }
  static async getMembersByTeam(adminTeamId) {
    const result = await db.execute(sql5`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, 
             r.description as role_description, r.is_system as role_is_system, r.is_default as role_is_default
      FROM admin_team_members m
      JOIN admin_team_roles r ON m.role_id = r.id
      WHERE m.admin_team_id = ${adminTeamId}
      ORDER BY m.created_at ASC
    `);
    return result.rows.map((row) => ({
      ...this.mapMemberRow(row),
      role: {
        id: row.role_id,
        adminTeamId: row.admin_team_id,
        name: row.role_name,
        displayName: row.role_display_name,
        description: row.role_description,
        isSystem: row.role_is_system,
        isDefault: row.role_is_default,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    }));
  }
  static async getMemberById(memberId) {
    const result = await db.execute(sql5`
      SELECT * FROM admin_team_members WHERE id = ${memberId}
    `);
    if (result.rows.length === 0) return null;
    return this.mapMemberRow(result.rows[0]);
  }
  static async getMemberByEmail(email) {
    const result = await db.execute(sql5`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, 
             r.description as role_description, r.is_system as role_is_system, r.is_default as role_is_default
      FROM admin_team_members m
      JOIN admin_team_roles r ON m.role_id = r.id
      WHERE m.email = ${email.toLowerCase()}
    `);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      ...this.mapMemberRow(row),
      role: {
        id: row.role_id,
        adminTeamId: row.admin_team_id,
        name: row.role_name,
        displayName: row.role_display_name,
        description: row.role_description,
        isSystem: row.role_is_system,
        isDefault: row.role_is_default,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    };
  }
  static async updateMember(memberId, data) {
    const setClauses = [];
    if (data.firstName !== void 0) setClauses.push(sql5`first_name = ${data.firstName}`);
    if (data.lastName !== void 0) setClauses.push(sql5`last_name = ${data.lastName}`);
    if (data.roleId) setClauses.push(sql5`role_id = ${data.roleId}`);
    if (data.status) setClauses.push(sql5`status = ${data.status}`);
    if (setClauses.length === 0) {
      const member = await this.getMemberById(memberId);
      if (!member) throw new Error("Member not found");
      return member;
    }
    const result = await db.execute(sql5`
      UPDATE admin_team_members 
      SET ${sql5.join(setClauses, sql5`, `)}, updated_at = NOW()
      WHERE id = ${memberId}
      RETURNING *
    `);
    if (result.rows.length === 0) throw new Error("Member not found");
    return this.mapMemberRow(result.rows[0]);
  }
  static async updateMemberPassword(memberId, newPassword) {
    const passwordHash = await bcrypt3.hash(newPassword, BCRYPT_ROUNDS2);
    await db.execute(sql5`
      UPDATE admin_team_members SET password_hash = ${passwordHash}, updated_at = NOW() WHERE id = ${memberId}
    `);
  }
  static async deleteMember(memberId) {
    await db.execute(sql5`DELETE FROM admin_team_sessions WHERE member_id = ${memberId}`);
    await db.execute(sql5`DELETE FROM admin_team_members WHERE id = ${memberId}`);
  }
  static async getRolesByTeam(adminTeamId) {
    const result = await db.execute(sql5`
      SELECT * FROM admin_team_roles 
      WHERE admin_team_id = ${adminTeamId}
      ORDER BY is_system DESC, created_at ASC
    `);
    return result.rows.map((row) => this.mapRoleRow(row));
  }
  static async getRoleById(roleId) {
    const result = await db.execute(sql5`SELECT * FROM admin_team_roles WHERE id = ${roleId}`);
    if (result.rows.length === 0) return null;
    return this.mapRoleRow(result.rows[0]);
  }
  static async createRole(adminTeamId, data) {
    const result = await db.execute(sql5`
      INSERT INTO admin_team_roles (admin_team_id, name, display_name, description, is_system, is_default)
      VALUES (
        ${adminTeamId},
        ${data.name.toLowerCase().replace(/\s+/g, "_")},
        ${data.displayName},
        ${data.description || null},
        false,
        false
      )
      RETURNING *
    `);
    const role = this.mapRoleRow(result.rows[0]);
    if (data.copyFromRoleId) {
      await this.copyRolePermissions(data.copyFromRoleId, role.id);
    }
    return role;
  }
  static async updateRole(roleId, data) {
    if (!data.displayName && data.description === void 0) {
      const role = await this.getRoleById(roleId);
      if (!role) throw new Error("Role not found");
      return role;
    }
    const result = await db.execute(sql5`
      UPDATE admin_team_roles 
      SET 
        display_name = COALESCE(${data.displayName || null}, display_name),
        description = CASE WHEN ${data.description !== void 0} THEN ${data.description || null} ELSE description END,
        updated_at = NOW()
      WHERE id = ${roleId} AND is_system = false
      RETURNING *
    `);
    if (result.rows.length === 0) throw new Error("Role not found or is a system role");
    return this.mapRoleRow(result.rows[0]);
  }
  static async deleteRole(roleId) {
    const role = await this.getRoleById(roleId);
    if (!role) throw new Error("Role not found");
    if (role.isSystem) throw new Error("Cannot delete system roles");
    const membersWithRole = await db.execute(sql5`
      SELECT COUNT(*) as count FROM admin_team_members WHERE role_id = ${roleId}
    `);
    if (parseInt(membersWithRole.rows[0].count) > 0) {
      throw new Error("Cannot delete role with assigned members");
    }
    await db.execute(sql5`DELETE FROM admin_team_permissions WHERE role_id = ${roleId}`);
    await db.execute(sql5`DELETE FROM admin_team_roles WHERE id = ${roleId}`);
  }
  static async copyRolePermissions(fromRoleId, toRoleId) {
    await db.execute(sql5`
      INSERT INTO admin_team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
      SELECT ${toRoleId}, section, subsection, can_create, can_read, can_update, can_delete
      FROM admin_team_permissions
      WHERE role_id = ${fromRoleId}
      ON CONFLICT (role_id, section, subsection) DO UPDATE
      SET can_create = EXCLUDED.can_create,
          can_read = EXCLUDED.can_read,
          can_update = EXCLUDED.can_update,
          can_delete = EXCLUDED.can_delete
    `);
  }
  static async getPermissionsForRole(roleId) {
    const result = await db.execute(sql5`
      SELECT * FROM admin_team_permissions WHERE role_id = ${roleId}
    `);
    return result.rows.map((row) => ({
      id: row.id,
      roleId: row.role_id,
      section: row.section,
      subsection: row.subsection,
      canCreate: row.can_create,
      canRead: row.can_read,
      canUpdate: row.can_update,
      canDelete: row.can_delete
    }));
  }
  static async bulkSetPermissions(roleId, permissions) {
    if (permissions.length === 0) return;
    const CHUNK_SIZE = 50;
    const chunks = [];
    for (let i = 0; i < permissions.length; i += CHUNK_SIZE) {
      chunks.push(permissions.slice(i, i + CHUNK_SIZE));
    }
    await Promise.all(chunks.map(async (chunk) => {
      const values = chunk.map(
        (perm) => sql5`(${roleId}, ${perm.section}, ${perm.subsection}, ${perm.canCreate}, ${perm.canRead}, ${perm.canUpdate}, ${perm.canDelete})`
      );
      await db.execute(sql5`
        INSERT INTO admin_team_permissions (role_id, section, subsection, can_create, can_read, can_update, can_delete)
        VALUES ${sql5.join(values, sql5`, `)}
        ON CONFLICT (role_id, section, subsection) DO UPDATE
        SET can_create = EXCLUDED.can_create,
            can_read = EXCLUDED.can_read,
            can_update = EXCLUDED.can_update,
            can_delete = EXCLUDED.can_delete
      `);
    }));
  }
  static async getMemberCount(adminTeamId) {
    const result = await db.execute(sql5`
      SELECT COUNT(*) as count FROM admin_team_members WHERE admin_team_id = ${adminTeamId}
    `);
    return parseInt(result.rows[0].count);
  }
  /**
   * Validate admin team session token
   * Returns session context if valid, null otherwise
   * Checks for:
   * - Valid session in database
   * - Session not expired
   * - Member is active (not suspended/disabled)
   */
  static async validateSession(token) {
    try {
      const sessionResult = await db.execute(sql5`
        SELECT 
          s.id, s.member_id, s.admin_team_id, s.expires_at,
          m.role_id, m.status, m.email, m.first_name, m.last_name,
          t.id as team_id,
          r.name as role_name
        FROM admin_team_sessions s
        JOIN admin_team_members m ON s.member_id = m.id
        JOIN admin_teams t ON s.admin_team_id = t.id
        JOIN admin_team_roles r ON m.role_id = r.id
        WHERE s.token = ${token} AND s.expires_at > NOW()
      `);
      if (sessionResult.rows.length === 0) {
        return null;
      }
      const session = sessionResult.rows[0];
      if (session.status !== "active") {
        console.log(`[Admin Team Auth] Session rejected: member ${session.member_id} has status ${session.status}`);
        return null;
      }
      await db.execute(sql5`
        UPDATE admin_team_sessions SET last_activity_at = NOW() WHERE token = ${token}
      `);
      const permissions = await this.getPermissionsForRole(session.role_id);
      return {
        memberId: session.member_id,
        teamId: session.admin_team_id,
        adminId: session.admin_team_id,
        // Use team ID for admin context
        roleId: session.role_id,
        roleName: session.role_name,
        permissions
      };
    } catch (error) {
      console.error("[Admin Team Auth] Session validation error:", error);
      return null;
    }
  }
  static mapTeamRow(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      settings: typeof row.settings === "string" ? JSON.parse(row.settings) : row.settings,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  static mapMemberRow(row) {
    return {
      id: row.id,
      adminTeamId: row.admin_team_id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      lastName: row.last_name,
      roleId: row.role_id,
      status: row.status,
      lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : void 0,
      invitedBy: row.invited_by,
      invitedAt: row.invited_at ? new Date(row.invited_at) : void 0,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  static mapRoleRow(row) {
    return {
      id: row.id,
      adminTeamId: row.admin_team_id,
      name: row.name,
      displayName: row.display_name,
      description: row.description,
      isSystem: row.is_system,
      isDefault: row.is_default,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  /**
   * Log admin team activity for audit trail
   */
  static async logActivity(adminTeamId, memberId, action, targetType, targetId, metadata, ipAddress) {
    try {
      await db.execute(sql5`
        INSERT INTO admin_team_activity_logs (admin_team_id, member_id, action, target_type, target_id, metadata, ip_address)
        VALUES (
          ${adminTeamId},
          ${memberId || null},
          ${action},
          ${targetType},
          ${targetId || null},
          ${metadata ? JSON.stringify(metadata) : null}::jsonb,
          ${ipAddress || null}
        )
      `);
    } catch (error) {
      console.error("[Admin Team] Failed to log activity:", error);
    }
  }
  /**
   * Get activity logs for admin team
   */
  static async getActivityLogs(adminTeamId, options) {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;
    let whereClause = sql5`WHERE l.admin_team_id = ${adminTeamId}`;
    if (options?.memberId) {
      whereClause = sql5`${whereClause} AND l.member_id = ${options.memberId}`;
    }
    if (options?.action) {
      whereClause = sql5`${whereClause} AND l.action = ${options.action}`;
    }
    if (options?.search) {
      const searchTerm = `%${options.search.toLowerCase()}%`;
      whereClause = sql5`${whereClause} AND (
        LOWER(l.action) LIKE ${searchTerm} OR 
        LOWER(l.target_type) LIKE ${searchTerm} OR 
        LOWER(m.email) LIKE ${searchTerm} OR
        LOWER(m.first_name) LIKE ${searchTerm} OR
        LOWER(m.last_name) LIKE ${searchTerm}
      )`;
    }
    const countResult = await db.execute(sql5`
      SELECT COUNT(*) as total FROM admin_team_activity_logs l
      LEFT JOIN admin_team_members m ON l.member_id = m.id
      ${whereClause}
    `);
    const total = parseInt(countResult.rows[0].total, 10);
    const result = await db.execute(sql5`
      SELECT 
        l.*,
        m.email as member_email,
        m.first_name as member_first_name,
        m.last_name as member_last_name
      FROM admin_team_activity_logs l
      LEFT JOIN admin_team_members m ON l.member_id = m.id
      ${whereClause}
      ORDER BY l.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);
    return {
      logs: result.rows.map((row) => ({
        id: row.id,
        adminTeamId: row.admin_team_id,
        memberId: row.member_id,
        memberEmail: row.member_email,
        memberName: row.member_first_name && row.member_last_name ? `${row.member_first_name} ${row.member_last_name}`.trim() : row.member_email,
        action: row.action,
        targetType: row.target_type,
        targetId: row.target_id,
        metadata: row.metadata,
        ipAddress: row.ip_address,
        createdAt: new Date(row.created_at)
      })),
      total
    };
  }
};

// plugins/team-management/routes/admin-team-auth.routes.js
import { sql as sql6 } from "drizzle-orm";
import bcrypt4 from "bcrypt";
import crypto2 from "crypto";
var router6 = Router6();
var SESSION_EXPIRY_HOURS2 = parseInt(process.env.ADMIN_TEAM_SESSION_EXPIRY || "24");
router6.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const memberResult = await db.execute(sql6`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, at.id as admin_team_id, at.name as admin_team_name
      FROM admin_team_members m
      JOIN admin_team_roles r ON m.role_id = r.id
      JOIN admin_teams at ON m.admin_team_id = at.id
      WHERE LOWER(m.email) = ${email.toLowerCase()}
      LIMIT 1
    `);
    if (memberResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const member = memberResult.rows[0];
    if (member.status !== "active") {
      return res.status(401).json({ error: "Account is not active" });
    }
    const passwordValid = await bcrypt4.compare(password, member.password_hash);
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = crypto2.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS2 * 60 * 60 * 1e3);
    await db.execute(sql6`
      INSERT INTO admin_team_sessions (member_id, admin_team_id, token, expires_at)
      VALUES (${member.id}, ${member.admin_team_id}, ${token}, ${expiresAt})
    `);
    await db.execute(sql6`
      UPDATE admin_team_members SET last_login_at = NOW() WHERE id = ${member.id}
    `);
    await AdminTeamService.logActivity(
      member.admin_team_id,
      member.id,
      "login",
      "member",
      member.id,
      { email: member.email },
      req.ip || req.socket.remoteAddress
    );
    res.json({
      token,
      expiresAt,
      member: {
        id: member.id,
        email: member.email,
        firstName: member.first_name,
        lastName: member.last_name,
        role: {
          id: member.role_id,
          name: member.role_display_name || member.role_name
        }
      },
      team: {
        id: member.admin_team_id,
        name: member.admin_team_name,
        type: "admin"
      }
    });
  } catch (error) {
    console.error("[Admin Team Auth] Login error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router6.post("/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const sessionResult = await db.execute(sql6`
      SELECT s.member_id, s.admin_team_id, m.email 
      FROM admin_team_sessions s
      JOIN admin_team_members m ON s.member_id = m.id
      WHERE s.token = ${token}
    `);
    await db.execute(sql6`
      DELETE FROM admin_team_sessions WHERE token = ${token}
    `);
    if (sessionResult.rows.length > 0) {
      const session = sessionResult.rows[0];
      await AdminTeamService.logActivity(
        session.admin_team_id,
        session.member_id,
        "logout",
        "member",
        session.member_id,
        { email: session.email },
        req.ip || req.socket.remoteAddress
      );
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin Team Auth] Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});
router6.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const sessionResult = await db.execute(sql6`
      SELECT s.*, m.role_id, m.admin_team_id, r.name as role_name, r.display_name as role_display_name
      FROM admin_team_sessions s
      JOIN admin_team_members m ON s.member_id = m.id
      JOIN admin_team_roles r ON m.role_id = r.id
      WHERE s.token = ${token} AND s.expires_at > NOW()
    `);
    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    const session = sessionResult.rows[0];
    await db.execute(sql6`
      UPDATE admin_team_sessions SET last_activity_at = NOW() WHERE token = ${token}
    `);
    const memberResult = await db.execute(sql6`
      SELECT m.*, r.name as role_name, r.display_name as role_display_name, at.name as admin_team_name
      FROM admin_team_members m
      JOIN admin_team_roles r ON m.role_id = r.id
      JOIN admin_teams at ON m.admin_team_id = at.id
      WHERE m.id = ${session.member_id}
    `);
    if (memberResult.rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }
    const member = memberResult.rows[0];
    const permissions = await AdminTeamService.getPermissionsForRole(member.role_id);
    const permMap = {};
    for (const perm of permissions) {
      if (!permMap[perm.section]) {
        permMap[perm.section] = {};
      }
      permMap[perm.section][perm.subsection] = {
        canCreate: perm.canCreate,
        canRead: perm.canRead,
        canUpdate: perm.canUpdate,
        canDelete: perm.canDelete
      };
    }
    res.json({
      member: {
        id: member.id,
        email: member.email,
        firstName: member.first_name,
        lastName: member.last_name,
        role: {
          id: member.role_id,
          name: member.role_display_name || member.role_name
        },
        status: member.status
      },
      team: {
        id: member.admin_team_id,
        name: member.admin_team_name,
        type: "admin"
      },
      permissions: permMap
    });
  } catch (error) {
    console.error("[Admin Team Auth] Get me error:", error);
    res.status(500).json({ error: "Failed to get member info" });
  }
});
router6.post("/refresh", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.substring(7);
    const sessionResult = await db.execute(sql6`
      SELECT * FROM admin_team_sessions
      WHERE token = ${token} AND expires_at > NOW()
    `);
    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    const newToken = crypto2.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS2 * 60 * 60 * 1e3);
    await db.execute(sql6`
      UPDATE admin_team_sessions 
      SET token = ${newToken}, expires_at = ${expiresAt}, last_activity_at = NOW()
      WHERE token = ${token}
    `);
    res.json({
      token: newToken,
      expiresAt
    });
  } catch (error) {
    console.error("[Admin Team Auth] Refresh error:", error);
    res.status(500).json({ error: "Failed to refresh session" });
  }
});
var admin_team_auth_routes_default = router6;

// plugins/team-management/routes/admin-teams.routes.js
import { Router as Router7 } from "express";
import { sql as sql7 } from "drizzle-orm";
var router7 = Router7();
function requireAdminOrTeamMember(req, res, next) {
  if (!req.isAdmin && !req.adminTeamMember) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
router7.use(requireAdminOrTeamMember);
router7.get("/", async (req, res) => {
  try {
    const { page = "1", limit = "20", search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let whereClause = sql7`1=1`;
    if (search) {
      whereClause = sql7`(t.name ILIKE ${`%${search}%`} OR u.email ILIKE ${`%${search}%`})`;
    }
    const result = await db.execute(sql7`
      SELECT t.*, u.email as owner_email, u.id as owner_user_id,
        (SELECT COUNT(*) FROM team_members WHERE team_id = t.id) as member_count
      FROM teams t
      JOIN users u ON t.user_id = u.id
      WHERE ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ${parseInt(limit)} OFFSET ${offset}
    `);
    const countResult = await db.execute(sql7`
      SELECT COUNT(*) as total
      FROM teams t
      JOIN users u ON t.user_id = u.id
      WHERE ${whereClause}
    `);
    const total = parseInt(countResult.rows[0].total);
    res.json({
      teams: result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        settings: row.settings,
        ownerEmail: row.owner_email,
        ownerUserId: row.owner_user_id,
        memberCount: parseInt(row.member_count),
        createdAt: row.created_at,
        updatedAt: row.updated_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("[Admin Teams] Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});
router7.get("/stats", async (req, res) => {
  try {
    const teamsResult = await db.execute(sql7`SELECT COUNT(*) as count FROM teams`);
    const membersResult = await db.execute(sql7`SELECT COUNT(*) as count FROM team_members`);
    const activeResult = await db.execute(sql7`
      SELECT COUNT(*) as count FROM team_members WHERE status = 'active'
    `);
    const invitedResult = await db.execute(sql7`
      SELECT COUNT(*) as count FROM team_members WHERE status = 'invited'
    `);
    const stats = {
      totalTeams: parseInt(teamsResult.rows[0].count),
      totalMembers: parseInt(membersResult.rows[0].count),
      activeMembers: parseInt(activeResult.rows[0].count),
      invitedMembers: parseInt(invitedResult.rows[0].count),
      teamsByPlan: {}
    };
    res.json(stats);
  } catch (error) {
    console.error("[Admin Teams] Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch team stats" });
  }
});
router7.get("/:id", async (req, res) => {
  try {
    const team = await TeamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const members = await TeamService.getMembersByTeam(req.params.id);
    const roles = await TeamService.getRolesByTeam(req.params.id);
    res.json({
      ...team,
      members: members.map((m) => ({
        id: m.id,
        email: m.email,
        firstName: m.firstName,
        lastName: m.lastName,
        role: m.role,
        status: m.status,
        lastLoginAt: m.lastLoginAt,
        createdAt: m.createdAt
      })),
      roles
    });
  } catch (error) {
    console.error("[Admin Teams] Error fetching team:", error);
    res.status(500).json({ error: "Failed to fetch team" });
  }
});
router7.get("/:id/members", async (req, res) => {
  try {
    const team = await TeamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const members = await TeamService.getMembersByTeam(req.params.id);
    res.json({
      members: members.map((m) => ({
        id: m.id,
        email: m.email,
        name: `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.email,
        roleId: m.roleId,
        roleName: m.role?.displayName || m.role?.name || "Unknown",
        status: m.status,
        lastLoginAt: m.lastLoginAt,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    console.error("[Admin Teams] Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});
router7.patch("/:id/settings", async (req, res) => {
  try {
    const team = await TeamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const { name, description, settings } = req.body;
    const updatedTeam = await TeamService.updateTeam(req.params.id, {
      name,
      description,
      settings: settings ? { ...team.settings, ...settings } : void 0
    });
    res.json(updatedTeam);
  } catch (error) {
    console.error("[Admin Teams] Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
});
router7.delete("/:id/members/:memberId", async (req, res) => {
  try {
    const team = await TeamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberById(req.params.memberId);
    if (!member || member.teamId !== req.params.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    await TeamService.deleteMember(req.params.memberId);
    await TeamService.logActivity(team.id, null, "admin_removed_member", "member", req.params.memberId, {
      email: member.email,
      adminUserId: req.userId
    });
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin Teams] Error removing member:", error);
    res.status(500).json({ error: "Failed to remove member" });
  }
});
router7.post("/:id/members/:memberId/reset-password", async (req, res) => {
  try {
    const team = await TeamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await TeamService.getMemberById(req.params.memberId);
    if (!member || member.teamId !== req.params.id) {
      return res.status(404).json({ error: "Member not found" });
    }
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    await TeamService.updateMemberPassword(req.params.memberId, newPassword);
    await TeamService.logActivity(team.id, null, "admin_reset_password", "member", req.params.memberId, {
      adminUserId: req.userId
    });
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin Teams] Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});
var admin_teams_routes_default = router7;

// plugins/team-management/routes/admin-team.routes.js
import { Router as Router8 } from "express";
var router8 = Router8();
router8.get("/", async (req, res) => {
  try {
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const memberCount = await AdminTeamService.getMemberCount(team.id);
    res.json({
      id: team.id,
      name: team.name,
      description: team.description,
      settings: team.settings,
      memberCount,
      createdAt: team.createdAt
    });
  } catch (error) {
    console.error("[Admin Team] Error fetching admin team:", error);
    res.status(500).json({ error: "Failed to fetch admin team" });
  }
});
router8.get("/members", async (req, res) => {
  try {
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const members = await AdminTeamService.getMembersByTeam(team.id);
    res.json({
      members: members.map((m) => ({
        id: m.id,
        email: m.email,
        name: `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.email,
        firstName: m.firstName,
        lastName: m.lastName,
        roleId: m.roleId,
        roleName: m.role?.displayName || m.role?.name || "Unknown",
        status: m.status,
        lastLoginAt: m.lastLoginAt,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    console.error("[Admin Team] Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch admin team members" });
  }
});
router8.post("/members", async (req, res) => {
  try {
    const { email, password, firstName, lastName, roleId } = req.body;
    if (!email || !password || !roleId) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const member = await AdminTeamService.createMember(team.id, {
      email,
      password,
      firstName,
      lastName,
      roleId
    });
    await AdminTeamService.logActivity(
      team.id,
      null,
      "member_created",
      "member",
      member.id,
      { email: member.email, createdBy: req.userId },
      req.ip || req.socket.remoteAddress
    );
    res.status(201).json({
      id: member.id,
      email: member.email,
      name: `${member.firstName || ""} ${member.lastName || ""}`.trim() || member.email,
      roleId: member.roleId,
      status: member.status,
      createdAt: member.createdAt
    });
  } catch (error) {
    console.error("[Admin Team] Error creating member:", error);
    if (error.message?.includes("unique") || error.code === "23505") {
      return res.status(400).json({ error: "A member with this email already exists" });
    }
    res.status(500).json({ error: "Failed to create admin team member" });
  }
});
router8.patch("/members/:id", async (req, res) => {
  try {
    const { firstName, lastName, roleId, status } = req.body;
    const member = await AdminTeamService.updateMember(req.params.id, {
      firstName,
      lastName,
      roleId,
      status
    });
    const team = await AdminTeamService.getOrCreateAdminTeam();
    await AdminTeamService.logActivity(
      team.id,
      null,
      "member_updated",
      "member",
      member.id,
      { email: member.email, changes: { firstName, lastName, roleId, status }, updatedBy: req.userId },
      req.ip || req.socket.remoteAddress
    );
    res.json({
      id: member.id,
      email: member.email,
      name: `${member.firstName || ""} ${member.lastName || ""}`.trim() || member.email,
      roleId: member.roleId,
      status: member.status
    });
  } catch (error) {
    console.error("[Admin Team] Error updating member:", error);
    res.status(500).json({ error: "Failed to update admin team member" });
  }
});
router8.post("/members/:id/reset-password", async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    await AdminTeamService.updateMemberPassword(req.params.id, newPassword);
    const team = await AdminTeamService.getOrCreateAdminTeam();
    await AdminTeamService.logActivity(
      team.id,
      null,
      "password_reset",
      "member",
      req.params.id,
      { resetBy: req.userId },
      req.ip || req.socket.remoteAddress
    );
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("[Admin Team] Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});
router8.delete("/members/:id", async (req, res) => {
  try {
    const memberToDelete = await AdminTeamService.getMemberById(req.params.id);
    const team = await AdminTeamService.getOrCreateAdminTeam();
    await AdminTeamService.deleteMember(req.params.id);
    await AdminTeamService.logActivity(
      team.id,
      null,
      "member_deleted",
      "member",
      req.params.id,
      { email: memberToDelete?.email, deletedBy: req.userId },
      req.ip || req.socket.remoteAddress
    );
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin Team] Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete admin team member" });
  }
});
router8.get("/roles", async (req, res) => {
  try {
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const roles = await AdminTeamService.getRolesByTeam(team.id);
    res.json({
      roles: roles.map((r) => ({
        id: r.id,
        name: r.displayName || r.name,
        description: r.description,
        isSystem: r.isSystem,
        isDefault: r.isDefault,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    console.error("[Admin Team] Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch admin team roles" });
  }
});
router8.post("/roles", async (req, res) => {
  try {
    const { name, displayName, description, copyFromRoleId } = req.body;
    if (!name || !displayName) {
      return res.status(400).json({ error: "Name and display name are required" });
    }
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const role = await AdminTeamService.createRole(team.id, {
      name,
      displayName,
      description,
      copyFromRoleId
    });
    res.status(201).json({
      id: role.id,
      name: role.displayName || role.name,
      description: role.description,
      isSystem: role.isSystem,
      createdAt: role.createdAt
    });
  } catch (error) {
    console.error("[Admin Team] Error creating role:", error);
    if (error.message?.includes("unique")) {
      return res.status(400).json({ error: "A role with this name already exists" });
    }
    res.status(500).json({ error: "Failed to create role" });
  }
});
router8.get("/roles/:id", async (req, res) => {
  try {
    const role = await AdminTeamService.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    const permissions = await AdminTeamService.getPermissionsForRole(role.id);
    res.json({
      ...role,
      permissions
    });
  } catch (error) {
    console.error("[Admin Team] Error fetching role:", error);
    res.status(500).json({ error: "Failed to fetch role" });
  }
});
router8.patch("/roles/:id", async (req, res) => {
  try {
    const { displayName, description } = req.body;
    const role = await AdminTeamService.updateRole(req.params.id, {
      displayName,
      description
    });
    res.json({
      id: role.id,
      name: role.displayName || role.name,
      description: role.description,
      isSystem: role.isSystem
    });
  } catch (error) {
    console.error("[Admin Team] Error updating role:", error);
    res.status(500).json({ error: "Failed to update role" });
  }
});
router8.delete("/roles/:id", async (req, res) => {
  try {
    await AdminTeamService.deleteRole(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin Team] Error deleting role:", error);
    if (error.message?.includes("system")) {
      return res.status(403).json({ error: "System roles cannot be deleted" });
    }
    if (error.message?.includes("assigned")) {
      return res.status(400).json({ error: "Cannot delete a role that is currently assigned to members" });
    }
    res.status(500).json({ error: "Failed to delete role" });
  }
});
router8.get("/activity-logs", async (req, res) => {
  try {
    const team = await AdminTeamService.getOrCreateAdminTeam();
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const action = req.query.action;
    const memberId = req.query.memberId;
    const search = req.query.search;
    const offset = (page - 1) * limit;
    const { logs, total } = await AdminTeamService.getActivityLogs(team.id, {
      limit,
      offset,
      action,
      memberId,
      search
    });
    res.json({
      logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("[Admin Team] Error fetching activity logs:", error);
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
});
router8.get("/permissions/sections", async (req, res) => {
  try {
    res.json({ sections: ADMIN_PERMISSION_SECTIONS });
  } catch (error) {
    console.error("[Admin Team] Error fetching permission sections:", error);
    res.status(500).json({ error: "Failed to fetch permission sections" });
  }
});
router8.get("/permissions/:roleId", async (req, res) => {
  try {
    const permissions = await AdminTeamService.getPermissionsForRole(req.params.roleId);
    const permMap = /* @__PURE__ */ new Map();
    for (const perm of permissions) {
      permMap.set(`${perm.section}.${perm.subsection}`, perm);
    }
    const matrix = {
      roleId: req.params.roleId,
      sections: ADMIN_PERMISSION_SECTIONS.map((section) => ({
        id: section.id,
        label: section.label,
        icon: section.icon,
        subsections: section.subsections.map((sub) => {
          const perm = permMap.get(`${section.id}.${sub.id}`);
          return {
            id: sub.id,
            label: sub.label,
            canCreate: perm?.canCreate ?? false,
            canRead: perm?.canRead ?? false,
            canUpdate: perm?.canUpdate ?? false,
            canDelete: perm?.canDelete ?? false
          };
        })
      }))
    };
    res.json(matrix);
  } catch (error) {
    console.error("[Admin Team] Error fetching permissions:", error);
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
});
router8.patch("/permissions/:roleId", async (req, res) => {
  try {
    const { permissions } = req.body;
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ error: "Permissions must be an array" });
    }
    await AdminTeamService.bulkSetPermissions(req.params.roleId, permissions);
    const updated = await AdminTeamService.getPermissionsForRole(req.params.roleId);
    res.json({ success: true, permissions: updated });
  } catch (error) {
    console.error("[Admin Team] Error updating permissions:", error);
    res.status(500).json({ error: "Failed to update permissions" });
  }
});
var admin_team_routes_default = router8;

// plugins/team-management/index.ts
var PLUGIN_VERSION = "1.0.0";
var PLUGIN_NAME = "team-management";
function createUserTeamRouter() {
  const router9 = Router9();
  router9.use("/", user_team_routes_default);
  router9.use("/members", user_members_routes_default);
  router9.use("/roles", user_roles_routes_default);
  router9.use("/permissions", user_permissions_routes_default);
  return router9;
}
function createTeamAuthRouter() {
  const router9 = Router9();
  router9.use("/", team_auth_routes_default);
  return router9;
}
function createAdminTeamAuthRouter() {
  const router9 = Router9();
  router9.use("/", admin_team_auth_routes_default);
  return router9;
}
function createAdminTeamsRouter() {
  const router9 = Router9();
  router9.use("/", admin_teams_routes_default);
  return router9;
}
function createAdminTeamRouter() {
  const router9 = Router9();
  router9.use("/", admin_team_routes_default);
  return router9;
}
function registerTeamManagementRoutes(app, options) {
  const { sessionAuthMiddleware, adminAuthMiddleware } = options;
  app.use("/api/team/auth", createTeamAuthRouter());
  app.use("/api/admin/team/auth", createAdminTeamAuthRouter());
  app.use("/api/team", sessionAuthMiddleware, createUserTeamRouter());
  app.use("/api/admin/teams", adminAuthMiddleware, createAdminTeamsRouter());
  app.use("/api/admin/team", adminAuthMiddleware, createAdminTeamRouter());
  console.log("[Team Management] Plugin registered (v1.0)");
  console.log("[Team Management] Endpoints:");
  console.log("  - /api/team (user auth) - User team management");
  console.log("  - /api/team/members (user auth) - User team member CRUD");
  console.log("  - /api/team/roles (user auth) - User team role management");
  console.log("  - /api/team/permissions (user auth) - User permission config");
  console.log("  - /api/team/auth (public) - Team member authentication");
  console.log("  - /api/admin/team/auth (public) - Admin sub-admin authentication");
  console.log("  - /api/admin/teams (admin auth) - User team oversight");
  console.log("  - /api/admin/team (admin auth) - Admin team for sub-admins");
  console.log("\u2705 Team Management Plugin initialized");
}
var index_default = {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerTeamManagementRoutes
};
export {
  ADMIN_PERMISSION_SECTIONS,
  AdminTeamService,
  DEFAULT_ROLE_PERMISSIONS,
  PERMISSION_SECTIONS,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  TeamAuthService,
  TeamPermissionService,
  TeamService,
  createAdminTeamAuthRouter,
  createAdminTeamRouter,
  createAdminTeamsRouter,
  createTeamAuthRouter,
  createUserTeamRouter,
  index_default as default,
  registerTeamManagementRoutes
};
