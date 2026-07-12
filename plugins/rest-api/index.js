var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// plugins/rest-api/index.ts
import { Router as Router10 } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

// plugins/rest-api/routes/calls.routes.js
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

// plugins/rest-api/services/api-key.service.js
import { eq, and, gte, sql as sql2 } from "drizzle-orm";
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
    const [record] = await db.insert(apiKeys).values({
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
    const [keyRecord] = await db.select().from(apiKeys).where(eq(apiKeys.keyPrefix, keyPrefix)).limit(1);
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
    await db.update(apiKeys).set({
      lastUsedAt: /* @__PURE__ */ new Date(),
      totalRequests: sql2`${apiKeys.totalRequests} + 1`
    }).where(eq(apiKeys.id, keyRecord.id));
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
    const [rateLimit] = await db.select().from(apiRateLimits).where(
      and(
        eq(apiRateLimits.apiKeyId, keyRecord.id),
        gte(apiRateLimits.windowStart, windowStart)
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
      await db.update(apiRateLimits).set({ requestCount: sql2`${apiRateLimits.requestCount} + 1` }).where(eq(apiRateLimits.id, rateLimit.id));
    } else {
      await db.insert(apiRateLimits).values({
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
    const keys = await db.select({
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
    }).from(apiKeys).where(eq(apiKeys.userId, userId));
    return keys;
  }
  /**
   * Revoke an API key
   */
  static async revokeKey(keyId, userId) {
    const result = await db.update(apiKeys).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId))).returning();
    return result.length > 0;
  }
  /**
   * Delete an API key permanently
   */
  static async deleteKey(keyId, userId) {
    const result = await db.delete(apiKeys).where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId))).returning();
    return result.length > 0;
  }
  /**
   * Update API key settings
   */
  static async updateKey(keyId, userId, updates) {
    const [updated] = await db.update(apiKeys).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId))).returning();
    return updated || null;
  }
  /**
   * Regenerate an API key (creates new secret, keeps settings)
   */
  static async regenerateKey(keyId, userId) {
    const [existing] = await db.select().from(apiKeys).where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId))).limit(1);
    if (!existing) {
      return null;
    }
    const randomBytes = crypto.randomBytes(32);
    const keySecret = randomBytes.toString("base64url");
    const fullKey = `${API_KEY_PREFIX}${keySecret}`;
    const keyPrefix = fullKey.substring(0, 16);
    const hashedSecret = await bcrypt.hash(keySecret, BCRYPT_ROUNDS);
    const [updated] = await db.update(apiKeys).set({
      keyPrefix,
      hashedSecret,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(apiKeys.id, keyId)).returning();
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
    await db.insert(apiAuditLogs).values({
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
    const conditions = [eq(apiAuditLogs.userId, userId)];
    if (options.apiKeyId) {
      conditions.push(eq(apiAuditLogs.apiKeyId, options.apiKeyId));
    }
    const logs = await db.select().from(apiAuditLogs).where(and(...conditions)).orderBy(sql2`${apiAuditLogs.createdAt} DESC`).limit(pageSize).offset(offset);
    return logs;
  }
};

// plugins/rest-api/middleware/auth.middleware.js
import { nanoid } from "nanoid";
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
    const requestId = nanoid(12);
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
    const requestId = authReq.requestId || nanoid(12);
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
import { eq as eq2, and as and2, desc, sql as sql3 } from "drizzle-orm";
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
    const [user] = await db.select().from(users).where(eq2(users.id, userId)).limit(1);
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
    const [agent] = await db.select().from(agents).where(and2(eq2(agents.id, agentId), eq2(agents.userId, userId))).limit(1);
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
      const [userPhone] = await db.select().from(phoneNumbers).where(and2(eq2(phoneNumbers.userId, userId), eq2(phoneNumbers.status, "active"))).limit(1);
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
      const [foundPhone] = await db.select().from(phoneNumbers).where(and2(eq2(phoneNumbers.phoneNumber, callerNumber), eq2(phoneNumbers.userId, userId))).limit(1);
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
        const [elPhone] = await db.select().from(phoneNumbers).where(and2(eq2(phoneNumbers.phoneNumber, callerNumber), eq2(phoneNumbers.userId, userId))).limit(1);
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
        const callRecord = await db.insert(calls).values({
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
      db.select().from(calls).where(eq2(calls.userId, userId)).orderBy(desc(calls.createdAt)).limit(fetchLimit),
      db.select().from(plivoCalls).where(eq2(plivoCalls.userId, userId)).orderBy(desc(plivoCalls.createdAt)).limit(fetchLimit),
      db.select().from(twilioOpenaiCalls).where(eq2(twilioOpenaiCalls.userId, userId)).orderBy(desc(twilioOpenaiCalls.createdAt)).limit(fetchLimit),
      db.select({ count: sql3`count(*)` }).from(calls).where(eq2(calls.userId, userId)),
      db.select({ count: sql3`count(*)` }).from(plivoCalls).where(eq2(plivoCalls.userId, userId)),
      db.select({ count: sql3`count(*)` }).from(twilioOpenaiCalls).where(eq2(twilioOpenaiCalls.userId, userId))
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
    const [elevenLabsCall] = await db.select().from(calls).where(and2(eq2(calls.id, id), eq2(calls.userId, userId))).limit(1);
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
    const [plivoCall] = await db.select().from(plivoCalls).where(and2(eq2(plivoCalls.id, id), eq2(plivoCalls.userId, userId))).limit(1);
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
    const [twilioCall] = await db.select().from(twilioOpenaiCalls).where(and2(eq2(twilioOpenaiCalls.id, id), eq2(twilioOpenaiCalls.userId, userId))).limit(1);
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
import { eq as eq5, and as and5, desc as desc4, sql as sql6 } from "drizzle-orm";
import { z as z3 } from "zod";

// server/services/contact-upload-service.js
import Papa from "papaparse";

// server/storage.js
import { nanoid as nanoid2 } from "nanoid";
import { eq as eq4, sql as sql5, and as and4, gte as gte3, lte, desc as desc3, asc, isNull as isNull2, isNotNull, or as or2, inArray as inArray2 } from "drizzle-orm";

// server/storage/analytics-helpers.js
import { eq as eq3, sql as sql4, and as and3, gte as gte2, lt, desc as desc2, isNull, or, inArray } from "drizzle-orm";
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
  const filteredCalls = await db.select().from(calls).where(gte2(calls.createdAt, startDate));
  const filteredCampaigns = await db.select().from(campaigns).where(gte2(campaigns.createdAt, startDate));
  const filteredUsers = await db.select().from(users).where(gte2(users.createdAt, startDate));
  let previousUsers = [];
  let previousCalls = [];
  let previousCampaigns = [];
  if (!isAllTime) {
    previousUsers = await db.select().from(users).where(
      and3(gte2(users.createdAt, previousStartDate), lt(users.createdAt, previousEndDate))
    );
    previousCalls = await db.select().from(calls).where(
      and3(gte2(calls.createdAt, previousStartDate), lt(calls.createdAt, previousEndDate))
    );
    previousCampaigns = await db.select().from(campaigns).where(
      and3(gte2(campaigns.createdAt, previousStartDate), lt(campaigns.createdAt, previousEndDate))
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
  }).from(userSubscriptions).innerJoin(plans, eq3(userSubscriptions.planId, plans.id)).where(
    and3(
      eq3(userSubscriptions.status, "active"),
      or(
        isNull(userSubscriptions.currentPeriodEnd),
        gte2(userSubscriptions.currentPeriodEnd, now)
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
      const d2 = new Date(parseInt(year), parseInt(month) - 1, 1);
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
  const userCampaigns = await db.select().from(campaigns).where(eq3(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq3(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  const directOwnershipCalls = await db.select().from(calls).where(and3(eq3(calls.userId, userId), gte2(calls.createdAt, startDate)));
  allUserCalls.push(...directOwnershipCalls);
  if (campaignIds.length > 0) {
    const campaignCalls = await db.select().from(calls).where(and3(inArray(calls.campaignId, campaignIds), gte2(calls.createdAt, startDate)));
    for (const call of campaignCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  if (incomingConnectionIds.length > 0) {
    const incomingCalls = await db.select().from(calls).where(and3(inArray(calls.incomingConnectionId, incomingConnectionIds), gte2(calls.createdAt, startDate)));
    for (const call of incomingCalls) {
      if (!allUserCalls.find((c) => c.id === call.id)) {
        allUserCalls.push(call);
      }
    }
  }
  const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(and3(eq3(twilioOpenaiCalls.userId, userId), gte2(twilioOpenaiCalls.createdAt, startDate)));
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
  const plivoAnalyticsCallsData = await db.select().from(plivoCalls).where(and3(eq3(plivoCalls.userId, userId), gte2(plivoCalls.createdAt, startDate)));
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
  const userCampaigns = await db.select().from(campaigns).where(eq3(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq3(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  const directOwnershipCalls = await db.select().from(calls).where(eq3(calls.userId, userId));
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
  const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(eq3(twilioOpenaiCalls.userId, userId));
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
  const plivoCallsData = await db.select().from(plivoCalls).where(eq3(plivoCalls.userId, userId));
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
  const recentCalls = await db.select({
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
  }).from(calls).where(eq3(calls.userId, userId)).orderBy(desc2(calls.createdAt)).limit(10);
  let recentUsers = [];
  const [currentUser] = await db.select().from(users).where(eq3(users.id, userId));
  if (currentUser?.role === "admin" || currentUser?.role === "super_admin") {
    recentUsers = await db.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    }).from(users).orderBy(desc2(users.createdAt)).limit(5);
  }
  const totalCampaigns = userCampaigns.length;
  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "in_progress" || c.status === "scheduled" || c.status === "pending"
  ).length;
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed").length;
  let allCampaignCalls = [];
  if (campaignIds.length > 0) {
    allCampaignCalls = await db.select().from(calls).where(inArray(calls.campaignId, campaignIds));
  }
  const campaignCallsCompleted = allCampaignCalls.filter((c) => c.status === "completed");
  const campaignSuccessRate = allCampaignCalls.length > 0 ? Math.round(campaignCallsCompleted.length / allCampaignCalls.length * 100) : 0;
  const campaignAvgDuration = campaignCallsCompleted.length > 0 ? Math.round(campaignCallsCompleted.reduce((sum, c) => sum + (c.duration || 0), 0) / campaignCallsCompleted.length) : 0;
  const [appointmentsResult] = await db.select({ count: sql4`count(*)` }).from(appointments).where(eq3(appointments.userId, userId));
  const appointmentsCount = Number(appointmentsResult?.count || 0);
  const userForms = await db.select({ id: forms.id }).from(forms).where(eq3(forms.userId, userId));
  const formsCount = userForms.length;
  let formSubmissionsCount = 0;
  if (userForms.length > 0) {
    const formIds = userForms.map((f) => f.id);
    const [submissionsResult] = await db.select({ count: sql4`count(*)` }).from(formSubmissions).where(inArray(formSubmissions.formId, formIds));
    formSubmissionsCount = Number(submissionsResult?.count || 0);
  }
  const [kbResult] = await db.select({ count: sql4`count(*)` }).from(knowledgeBase).where(eq3(knowledgeBase.userId, userId));
  const knowledgeBaseCount = Number(kbResult?.count || 0);
  const [webhooksResult] = await db.select({ count: sql4`count(*)` }).from(webhookSubscriptions).where(eq3(webhookSubscriptions.userId, userId));
  const webhooksCount = Number(webhooksResult?.count || 0);
  const [userTemplatesResult] = await db.select({ count: sql4`count(*)` }).from(promptTemplates).where(eq3(promptTemplates.userId, userId));
  const userTemplatesCount = Number(userTemplatesResult?.count || 0);
  const [systemTemplatesResult] = await db.select({ count: sql4`count(*)` }).from(promptTemplates).where(eq3(promptTemplates.isSystemTemplate, true));
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
var DbStorage = class {
  // Users
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq4(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq4(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUserCredits(userId, credits) {
    await db.update(users).set({ credits }).where(eq4(users.id, userId));
  }
  // Agents
  async getAgent(id) {
    const [agent] = await db.select().from(agents).where(eq4(agents.id, id));
    return agent;
  }
  async getUserAgents(userId) {
    return db.select().from(agents).where(eq4(agents.userId, userId));
  }
  async createAgent(insertAgent) {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }
  async updateAgent(id, agent) {
    await db.update(agents).set(agent).where(eq4(agents.id, id));
  }
  async deleteAgent(id) {
    await db.delete(agents).where(eq4(agents.id, id));
  }
  // Knowledge Base
  async getKnowledgeBaseItem(id) {
    const [item] = await db.select().from(knowledgeBase).where(eq4(knowledgeBase.id, id));
    return item;
  }
  async getUserKnowledgeBase(userId) {
    return db.select().from(knowledgeBase).where(eq4(knowledgeBase.userId, userId));
  }
  async getUserKnowledgeBaseCount(userId) {
    const result = await db.select({ count: sql5`count(*)` }).from(knowledgeBase).where(eq4(knowledgeBase.userId, userId));
    return Number(result[0]?.count || 0);
  }
  async createKnowledgeBaseItem(insertItem) {
    const [item] = await db.insert(knowledgeBase).values(insertItem).returning();
    return item;
  }
  async updateKnowledgeBaseItem(id, item) {
    await db.update(knowledgeBase).set(item).where(eq4(knowledgeBase.id, id));
  }
  async deleteKnowledgeBaseItem(id) {
    await db.delete(knowledgeBase).where(eq4(knowledgeBase.id, id));
  }
  // Campaigns
  async getCampaign(id) {
    const [campaign] = await db.select().from(campaigns).where(and4(
      eq4(campaigns.id, id),
      isNull2(campaigns.deletedAt)
    ));
    return campaign;
  }
  async getCampaignIncludingDeleted(id) {
    const [campaign] = await db.select().from(campaigns).where(eq4(campaigns.id, id));
    return campaign;
  }
  async getUserCampaigns(userId) {
    return db.select().from(campaigns).where(and4(
      eq4(campaigns.userId, userId),
      isNull2(campaigns.deletedAt)
    )).orderBy(desc3(campaigns.createdAt));
  }
  async getUserDeletedCampaigns(userId) {
    return db.select().from(campaigns).where(and4(
      eq4(campaigns.userId, userId),
      isNotNull(campaigns.deletedAt)
    )).orderBy(desc3(campaigns.createdAt));
  }
  async createCampaign(insertCampaign) {
    const [campaign] = await db.insert(campaigns).values(insertCampaign).returning();
    return campaign;
  }
  async updateCampaign(id, campaign) {
    await db.update(campaigns).set(campaign).where(eq4(campaigns.id, id));
  }
  async deleteCampaign(id) {
    await db.update(campaigns).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq4(campaigns.id, id));
  }
  async restoreCampaign(id) {
    await db.update(campaigns).set({ deletedAt: null }).where(eq4(campaigns.id, id));
  }
  // Contacts
  async getContact(id) {
    const [contact] = await db.select().from(contacts).where(eq4(contacts.id, id));
    return contact;
  }
  async getCampaignContacts(campaignId) {
    return db.select().from(contacts).where(eq4(contacts.campaignId, campaignId));
  }
  async getUserContacts(userId) {
    const results = await db.select({
      contact: contacts,
      campaign: campaigns
    }).from(contacts).innerJoin(campaigns, eq4(contacts.campaignId, campaigns.id)).where(and4(
      eq4(campaigns.userId, userId),
      isNull2(campaigns.deletedAt)
    ));
    return results.map((r) => ({
      ...r.contact,
      campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null
    }));
  }
  async getUserContactsDeduplicated(userId) {
    const results = await db.select({
      contact: contacts,
      campaign: campaigns
    }).from(contacts).innerJoin(campaigns, eq4(contacts.campaignId, campaigns.id)).where(and4(
      eq4(campaigns.userId, userId),
      isNull2(campaigns.deletedAt)
    )).orderBy(desc3(contacts.createdAt));
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
    const callsWithoutContacts = await db.select({
      phoneNumber: calls.phoneNumber,
      callDirection: calls.callDirection,
      createdAt: calls.createdAt,
      status: calls.status
    }).from(calls).where(and4(
      eq4(calls.userId, userId),
      isNull2(calls.contactId),
      isNotNull(calls.phoneNumber)
    )).orderBy(desc3(calls.createdAt));
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
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
  async createContacts(insertContacts) {
    return db.insert(contacts).values(insertContacts).returning();
  }
  async deleteContact(id) {
    await db.delete(contacts).where(eq4(contacts.id, id));
  }
  // Calls
  async getCall(id) {
    const [call] = await db.select().from(calls).where(eq4(calls.id, id));
    return call;
  }
  async getCallWithDetails(id) {
    const elevenLabsResults = await db.select({
      call: calls,
      campaign: campaigns,
      contact: contacts,
      incomingConnection: incomingConnections,
      widget: websiteWidgets
    }).from(calls).leftJoin(campaigns, eq4(calls.campaignId, campaigns.id)).leftJoin(contacts, eq4(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq4(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq4(calls.widgetId, websiteWidgets.id)).where(eq4(calls.id, id));
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
    }).from(twilioOpenaiCalls).leftJoin(campaigns, eq4(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq4(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq4(twilioOpenaiCalls.agentId, agents.id)).where(eq4(twilioOpenaiCalls.id, id));
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
    }).from(plivoCalls).leftJoin(campaigns, eq4(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq4(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq4(plivoCalls.agentId, agents.id)).where(eq4(plivoCalls.id, id));
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
    return db.select().from(calls).where(eq4(calls.campaignId, campaignId));
  }
  async getUserCalls(userId) {
    const results = await db.select({ calls }).from(calls).leftJoin(campaigns, eq4(calls.campaignId, campaigns.id)).leftJoin(incomingConnections, eq4(calls.incomingConnectionId, incomingConnections.id)).where(
      or2(
        eq4(calls.userId, userId),
        and4(isNotNull(calls.campaignId), eq4(campaigns.userId, userId)),
        and4(isNotNull(calls.incomingConnectionId), eq4(incomingConnections.userId, userId))
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
    }).from(calls).leftJoin(campaigns, eq4(calls.campaignId, campaigns.id)).leftJoin(contacts, eq4(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq4(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq4(calls.widgetId, websiteWidgets.id)).where(
      or2(
        // Primary filter: Direct user ownership (guaranteed isolation)
        eq4(calls.userId, userId),
        // Fallback for legacy calls: Check via campaign ownership
        and4(isNotNull(calls.campaignId), eq4(campaigns.userId, userId)),
        // Fallback for legacy calls: Check via incoming connection ownership
        and4(isNotNull(calls.incomingConnectionId), eq4(incomingConnections.userId, userId))
      )
    ).orderBy(sql5`${calls.createdAt} DESC`);
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
    }).from(twilioOpenaiCalls).leftJoin(campaigns, eq4(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq4(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq4(twilioOpenaiCalls.agentId, agents.id)).where(eq4(twilioOpenaiCalls.userId, userId)).orderBy(sql5`${twilioOpenaiCalls.createdAt} DESC`);
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
    }).from(plivoCalls).leftJoin(campaigns, eq4(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq4(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq4(plivoCalls.agentId, agents.id)).where(eq4(plivoCalls.userId, userId)).orderBy(sql5`${plivoCalls.createdAt} DESC`);
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
    }).from(sipCalls).leftJoin(agents, eq4(sipCalls.agentId, agents.id)).leftJoin(contacts, eq4(sipCalls.contactId, contacts.id)).where(eq4(sipCalls.userId, userId)).orderBy(sql5`${sipCalls.createdAt} DESC`);
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
    const [call] = await db.insert(calls).values(insertCall).returning();
    return call;
  }
  async updateCall(id, call) {
    await db.update(calls).set(call).where(eq4(calls.id, id));
  }
  // Credit Transactions
  async getCreditTransaction(id) {
    const [transaction] = await db.select().from(creditTransactions).where(eq4(creditTransactions.id, id));
    return transaction;
  }
  async getUserCreditTransactions(userId) {
    return db.select().from(creditTransactions).where(eq4(creditTransactions.userId, userId));
  }
  async createCreditTransaction(insertTransaction) {
    const [transaction] = await db.insert(creditTransactions).values(insertTransaction).returning();
    return transaction;
  }
  // Atomic credit purchase: creates transaction + adds credits in single DB transaction
  async addCreditsAtomic(userId, credits, description, stripePaymentId) {
    await db.transaction(async (tx) => {
      await tx.insert(creditTransactions).values({
        userId,
        type: "credit",
        amount: credits,
        description,
        stripePaymentId
      });
      await tx.execute(sql5`
        UPDATE users 
        SET credits = COALESCE(credits, 0) + ${credits}
        WHERE id = ${userId}
      `);
    });
  }
  // Tools
  async getTool(id) {
    const [tool] = await db.select().from(tools).where(eq4(tools.id, id));
    return tool;
  }
  async getUserTools(userId) {
    return db.select().from(tools).where(eq4(tools.userId, userId));
  }
  async createTool(insertTool) {
    const [tool] = await db.insert(tools).values(insertTool).returning();
    return tool;
  }
  async updateTool(id, tool) {
    await db.update(tools).set(tool).where(eq4(tools.id, id));
  }
  async deleteTool(id) {
    await db.delete(tools).where(eq4(tools.id, id));
  }
  // Phone Number Rentals
  async createPhoneNumberRental(insertRental) {
    const [rental] = await db.insert(phoneNumberRentals).values(insertRental).returning();
    return rental;
  }
  async getPhoneNumberRentals(phoneNumberId) {
    return db.select().from(phoneNumberRentals).where(eq4(phoneNumberRentals.phoneNumberId, phoneNumberId)).orderBy(desc3(phoneNumberRentals.createdAt));
  }
  // Voices
  async getVoice(id) {
    const [voice] = await db.select().from(voices).where(eq4(voices.id, id));
    return voice;
  }
  async getUserVoices(userId) {
    return db.select().from(voices).where(eq4(voices.userId, userId));
  }
  async createVoice(insertVoice) {
    const [voice] = await db.insert(voices).values(insertVoice).returning();
    return voice;
  }
  async deleteVoice(id) {
    await db.delete(voices).where(eq4(voices.id, id));
  }
  // Plans
  async getPlan(id) {
    const [plan] = await db.select().from(plans).where(eq4(plans.id, id));
    return plan;
  }
  async getPlanByName(name) {
    const [plan] = await db.select().from(plans).where(eq4(plans.name, name));
    return plan;
  }
  async getAllPlans() {
    return db.select().from(plans).where(eq4(plans.isActive, true));
  }
  async createPlan(insertPlan) {
    const [plan] = await db.insert(plans).values(insertPlan).returning();
    return plan;
  }
  async updatePlan(id, plan) {
    const result = await db.update(plans).set(plan).where(eq4(plans.id, id)).returning({ id: plans.id });
    if (result.length === 0) {
      throw new Error(`Failed to update plan: Plan with id '${id}' not found`);
    }
  }
  async deletePlan(id) {
    await db.delete(plans).where(eq4(plans.id, id));
  }
  // Global Settings
  async getGlobalSetting(key) {
    const [setting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, key));
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
      await db.execute(sql5`
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
    const [pack] = await db.select().from(creditPackages).where(eq4(creditPackages.id, id));
    return pack;
  }
  async getAllCreditPackages() {
    return db.select().from(creditPackages).where(eq4(creditPackages.isActive, true));
  }
  async createCreditPackage(insertPack) {
    const [pack] = await db.insert(creditPackages).values(insertPack).returning();
    return pack;
  }
  async updateCreditPackage(id, pack) {
    const result = await db.update(creditPackages).set(pack).where(eq4(creditPackages.id, id)).returning({ id: creditPackages.id });
    if (result.length === 0) {
      throw new Error(`Failed to update credit package: Package with id '${id}' not found`);
    }
  }
  // Admin Functions
  async getAllUsers() {
    return db.select().from(users).orderBy(desc3(users.createdAt));
  }
  async getAllAdminUsers() {
    return db.select().from(users).where(
      sql5`${users.role} = 'admin'`
    ).orderBy(desc3(users.createdAt));
  }
  async updateUser(id, user) {
    const result = await db.update(users).set(user).where(eq4(users.id, id)).returning({ id: users.id });
    if (result.length === 0) {
      throw new Error(`Failed to update user: User with id '${id}' not found`);
    }
  }
  async getSystemPhoneNumbers() {
    const results = await db.select({
      phone: phoneNumbers,
      user: users
    }).from(phoneNumbers).leftJoin(users, eq4(phoneNumbers.userId, users.id));
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
    }).from(userSubscriptions).leftJoin(plans, eq4(userSubscriptions.planId, plans.id)).where(eq4(userSubscriptions.userId, userId)).orderBy(desc3(userSubscriptions.createdAt)).limit(1);
    if (result.length > 0 && result[0].subscription && result[0].plan) {
      return {
        ...result[0].subscription,
        plan: result[0].plan
      };
    }
    const [freePlan] = await db.select().from(plans).where(eq4(plans.name, "free")).limit(1);
    if (!freePlan) {
      return null;
    }
    return null;
  }
  async getAllUserSubscriptions() {
    return await db.select().from(userSubscriptions);
  }
  async getUserSubscriptionByPaystackCode(subscriptionCode) {
    const [subscription] = await db.select().from(userSubscriptions).where(eq4(userSubscriptions.paystackSubscriptionCode, subscriptionCode)).limit(1);
    return subscription;
  }
  async createUserSubscription(insertSubscription) {
    const [subscription] = await db.insert(userSubscriptions).values(insertSubscription).returning();
    return subscription;
  }
  async updateUserSubscription(id, subscription) {
    await db.update(userSubscriptions).set(subscription).where(eq4(userSubscriptions.id, id));
  }
  async updateUserSubscriptionByUserId(userId, subscription) {
    await db.update(userSubscriptions).set({ ...subscription, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(userSubscriptions.userId, userId));
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
      const [freePlan] = await db.select().from(plans).where(eq4(plans.name, "free")).limit(1);
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
    const [phoneNumber] = await db.select().from(phoneNumbers).where(eq4(phoneNumbers.id, id));
    return phoneNumber;
  }
  async getUserPhoneNumbers(userId) {
    return db.select().from(phoneNumbers).where(eq4(phoneNumbers.userId, userId));
  }
  async getAllPhoneNumbers() {
    return db.select().from(phoneNumbers);
  }
  async createPhoneNumber(insertPhoneNumber) {
    const [phoneNumber] = await db.insert(phoneNumbers).values(insertPhoneNumber).returning();
    return phoneNumber;
  }
  async updatePhoneNumber(id, phoneNumber) {
    await db.update(phoneNumbers).set(phoneNumber).where(eq4(phoneNumbers.id, id));
  }
  async deletePhoneNumber(id) {
    await db.delete(phoneNumbers).where(eq4(phoneNumbers.id, id));
  }
  // Usage Records
  async createUsageRecord(insertRecord) {
    const [record] = await db.insert(usageRecords).values(insertRecord).returning();
    return record;
  }
  async getUserUsageRecords(userId) {
    return db.select().from(usageRecords).where(eq4(usageRecords.userId, userId));
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
    const [webhook] = await db.select().from(webhookSubscriptions).where(eq4(webhookSubscriptions.id, id));
    return webhook;
  }
  async getUserWebhooks(userId) {
    return await db.select().from(webhookSubscriptions).where(eq4(webhookSubscriptions.userId, userId)).orderBy(desc3(webhookSubscriptions.createdAt));
  }
  async getUserWebhookCount(userId) {
    const result = await db.select({ count: sql5`count(*)` }).from(webhookSubscriptions).where(eq4(webhookSubscriptions.userId, userId));
    return Number(result[0]?.count || 0);
  }
  async getWebhooksForEvent(userId, event, campaignId) {
    const allUserWebhooks = await db.select().from(webhookSubscriptions).where(and4(
      eq4(webhookSubscriptions.userId, userId),
      eq4(webhookSubscriptions.isActive, true)
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
      id: nanoid2()
    }).returning();
    return newWebhook;
  }
  async updateWebhook(id, webhook) {
    const updateData = { ...webhook, updatedAt: /* @__PURE__ */ new Date() };
    await db.update(webhookSubscriptions).set(updateData).where(eq4(webhookSubscriptions.id, id));
  }
  async deleteWebhook(id) {
    await db.delete(webhookSubscriptions).where(eq4(webhookSubscriptions.id, id));
  }
  // Webhook Delivery Logs
  async getWebhookLog(id) {
    const [log] = await db.select().from(webhookDeliveryLogs).where(eq4(webhookDeliveryLogs.id, id));
    return log;
  }
  async getWebhookLogs(webhookId, limit = 50) {
    return await db.select().from(webhookDeliveryLogs).where(eq4(webhookDeliveryLogs.webhookId, webhookId)).orderBy(desc3(webhookDeliveryLogs.createdAt)).limit(limit);
  }
  async createWebhookLog(log) {
    const [newLog] = await db.insert(webhookDeliveryLogs).values(log).returning();
    return newLog;
  }
  async updateWebhookLog(id, log) {
    await db.update(webhookDeliveryLogs).set(log).where(eq4(webhookDeliveryLogs.id, id));
  }
  async getFailedWebhookLogs(limit = 100) {
    return await db.select().from(webhookDeliveryLogs).where(and4(
      eq4(webhookDeliveryLogs.success, false),
      isNotNull(webhookDeliveryLogs.nextRetryAt)
    )).orderBy(asc(webhookDeliveryLogs.nextRetryAt)).limit(limit);
  }
  // Notifications
  async getNotification(id) {
    const [notification] = await db.select().from(notifications).where(eq4(notifications.id, id));
    return notification;
  }
  async getUserNotifications(userId, limit = 50) {
    return await db.select().from(notifications).where(eq4(notifications.userId, userId)).orderBy(desc3(notifications.createdAt)).limit(limit);
  }
  async getUnreadNotificationCount(userId) {
    const result = await db.select({ count: sql5`count(*)` }).from(notifications).where(and4(eq4(notifications.userId, userId), eq4(notifications.isRead, false)));
    return Number(result[0]?.count || 0);
  }
  async createNotification(notification) {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }
  async markNotificationAsRead(id) {
    await db.update(notifications).set({ isRead: true }).where(eq4(notifications.id, id));
  }
  async markAllNotificationsAsRead(userId) {
    await db.update(notifications).set({ isRead: true }).where(eq4(notifications.userId, userId));
  }
  async getBannerNotifications(userId) {
    return await db.select().from(notifications).where(and4(
      eq4(notifications.userId, userId),
      or2(
        eq4(notifications.displayType, "banner"),
        eq4(notifications.displayType, "both")
      ),
      eq4(notifications.isDismissed, false),
      or2(
        isNull2(notifications.expiresAt),
        gte3(notifications.expiresAt, /* @__PURE__ */ new Date())
      )
    )).orderBy(desc3(notifications.priority), desc3(notifications.createdAt));
  }
  async dismissNotification(id, userId) {
    if (userId) {
      await db.update(notifications).set({ isDismissed: true }).where(and4(eq4(notifications.id, id), eq4(notifications.userId, userId)));
    } else {
      await db.update(notifications).set({ isDismissed: true }).where(eq4(notifications.id, id));
    }
  }
  async deleteNotification(id) {
    await db.delete(notifications).where(eq4(notifications.id, id));
  }
  // Email Templates
  async getEmailTemplates() {
    return await db.select().from(emailTemplates).orderBy(emailTemplates.templateType);
  }
  async getEmailTemplate(templateType) {
    const [template] = await db.select().from(emailTemplates).where(eq4(emailTemplates.templateType, templateType));
    return template;
  }
  async updateEmailTemplate(id, data) {
    await db.update(emailTemplates).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(emailTemplates.id, id));
  }
  async createEmailTemplate(data) {
    const [template] = await db.insert(emailTemplates).values(data).returning();
    return template;
  }
  // Prompt Templates
  async getPromptTemplate(id) {
    const [template] = await db.select().from(promptTemplates).where(eq4(promptTemplates.id, id));
    return template;
  }
  async getUserPromptTemplates(userId) {
    return await db.select().from(promptTemplates).where(eq4(promptTemplates.userId, userId)).orderBy(desc3(promptTemplates.createdAt));
  }
  async getSystemPromptTemplates() {
    return await db.select().from(promptTemplates).where(eq4(promptTemplates.isSystemTemplate, true)).orderBy(asc(promptTemplates.category), asc(promptTemplates.name));
  }
  async getPublicPromptTemplates() {
    return await db.select().from(promptTemplates).where(eq4(promptTemplates.isPublic, true)).orderBy(desc3(promptTemplates.usageCount), asc(promptTemplates.name));
  }
  async createPromptTemplate(template) {
    const [newTemplate] = await db.insert(promptTemplates).values(template).returning();
    return newTemplate;
  }
  async updatePromptTemplate(id, template) {
    await db.update(promptTemplates).set({ ...template, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(promptTemplates.id, id));
  }
  async deletePromptTemplate(id) {
    await db.delete(promptTemplates).where(eq4(promptTemplates.id, id));
  }
  async incrementPromptTemplateUsage(id) {
    await db.update(promptTemplates).set({
      usageCount: sql5`${promptTemplates.usageCount} + 1`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq4(promptTemplates.id, id));
  }
  // Agent Versions
  async getAgentVersion(id) {
    const [version] = await db.select().from(agentVersions).where(eq4(agentVersions.id, id));
    return version;
  }
  async getAgentVersions(agentId) {
    return await db.select().from(agentVersions).where(eq4(agentVersions.agentId, agentId)).orderBy(desc3(agentVersions.versionNumber));
  }
  async getAgentVersionByNumber(agentId, versionNumber) {
    const [version] = await db.select().from(agentVersions).where(and4(
      eq4(agentVersions.agentId, agentId),
      eq4(agentVersions.versionNumber, versionNumber)
    ));
    return version;
  }
  async getLatestAgentVersion(agentId) {
    const [version] = await db.select().from(agentVersions).where(eq4(agentVersions.agentId, agentId)).orderBy(desc3(agentVersions.versionNumber)).limit(1);
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
      const [updated] = await db.update(seoSettings).set(updateData).where(eq4(seoSettings.id, existing.id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(seoSettings).values(settings).returning();
      return created;
    }
  }
  // Analytics Scripts
  async getAnalyticsScript(id) {
    const [script] = await db.select().from(analyticsScripts).where(eq4(analyticsScripts.id, id));
    return script;
  }
  async getAllAnalyticsScripts() {
    return db.select().from(analyticsScripts).orderBy(desc3(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
  }
  async getEnabledAnalyticsScripts() {
    return db.select().from(analyticsScripts).where(eq4(analyticsScripts.enabled, true)).orderBy(desc3(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
  }
  async createAnalyticsScript(script) {
    const [created] = await db.insert(analyticsScripts).values(script).returning();
    return created;
  }
  async updateAnalyticsScript(id, script) {
    const updateData = { ...script, updatedAt: /* @__PURE__ */ new Date() };
    await db.update(analyticsScripts).set(updateData).where(eq4(analyticsScripts.id, id));
  }
  async deleteAnalyticsScript(id) {
    await db.delete(analyticsScripts).where(eq4(analyticsScripts.id, id));
  }
  // Payment Transactions
  async getPaymentTransaction(id) {
    const [transaction] = await db.select().from(paymentTransactions).where(eq4(paymentTransactions.id, id));
    return transaction;
  }
  async getPaymentTransactionByGatewayId(gateway, gatewayTransactionId) {
    const [transaction] = await db.select().from(paymentTransactions).where(and4(
      eq4(paymentTransactions.gateway, gateway),
      eq4(paymentTransactions.gatewayTransactionId, gatewayTransactionId)
    ));
    return transaction;
  }
  async getUserPaymentTransactions(userId) {
    return db.select().from(paymentTransactions).where(eq4(paymentTransactions.userId, userId)).orderBy(desc3(paymentTransactions.createdAt));
  }
  async getAllPaymentTransactions(filters) {
    const conditions = [];
    if (filters?.gateway) {
      conditions.push(eq4(paymentTransactions.gateway, filters.gateway));
    }
    if (filters?.type) {
      conditions.push(eq4(paymentTransactions.type, filters.type));
    }
    if (filters?.status) {
      conditions.push(eq4(paymentTransactions.status, filters.status));
    }
    if (filters?.startDate) {
      conditions.push(gte3(paymentTransactions.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(paymentTransactions.createdAt, filters.endDate));
    }
    if (conditions.length > 0) {
      return db.select().from(paymentTransactions).where(and4(...conditions)).orderBy(desc3(paymentTransactions.createdAt));
    }
    return db.select().from(paymentTransactions).orderBy(desc3(paymentTransactions.createdAt));
  }
  async createPaymentTransaction(transaction) {
    const [created] = await db.insert(paymentTransactions).values(transaction).returning();
    return created;
  }
  async updatePaymentTransaction(id, transaction) {
    await db.update(paymentTransactions).set({ ...transaction, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(paymentTransactions.id, id));
  }
  async getPaymentAnalytics(startDate, endDate) {
    const revenueStatuses = ["completed", "refunded", "partially_refunded"];
    const conditions = [];
    if (startDate) conditions.push(gte3(paymentTransactions.createdAt, startDate));
    if (endDate) conditions.push(lte(paymentTransactions.createdAt, endDate));
    const transactions = await db.select().from(paymentTransactions).where(
      conditions.length > 0 ? and4(
        inArray2(paymentTransactions.status, revenueStatuses),
        ...conditions
      ) : inArray2(paymentTransactions.status, revenueStatuses)
    );
    const dateConditions = [];
    if (startDate) dateConditions.push(gte3(paymentTransactions.createdAt, startDate));
    if (endDate) dateConditions.push(lte(paymentTransactions.createdAt, endDate));
    const allTransactions = await db.select().from(paymentTransactions).where(dateConditions.length > 0 ? and4(...dateConditions) : void 0);
    const refundConditions = [];
    if (startDate) refundConditions.push(gte3(refunds.createdAt, startDate));
    if (endDate) refundConditions.push(lte(refunds.createdAt, endDate));
    const allRefunds = await db.select().from(refunds).where(refundConditions.length > 0 ? and4(...refundConditions) : void 0);
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
    const [refund] = await db.select().from(refunds).where(eq4(refunds.id, id));
    return refund;
  }
  async getTransactionRefunds(transactionId) {
    return db.select().from(refunds).where(eq4(refunds.transactionId, transactionId)).orderBy(desc3(refunds.createdAt));
  }
  async getUserRefunds(userId) {
    return db.select().from(refunds).where(eq4(refunds.userId, userId)).orderBy(desc3(refunds.createdAt));
  }
  async getAllRefunds() {
    return db.select().from(refunds).orderBy(desc3(refunds.createdAt));
  }
  async createRefund(refund) {
    const [created] = await db.insert(refunds).values(refund).returning();
    return created;
  }
  async updateRefund(id, refund) {
    await db.update(refunds).set({ ...refund, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(refunds.id, id));
  }
  // Invoices
  async getInvoice(id) {
    const [invoice] = await db.select().from(invoices).where(eq4(invoices.id, id));
    return invoice;
  }
  async getInvoiceByNumber(invoiceNumber) {
    const [invoice] = await db.select().from(invoices).where(eq4(invoices.invoiceNumber, invoiceNumber));
    return invoice;
  }
  async getTransactionInvoice(transactionId) {
    const [invoice] = await db.select().from(invoices).where(eq4(invoices.transactionId, transactionId));
    return invoice;
  }
  async getUserInvoices(userId) {
    return db.select().from(invoices).where(eq4(invoices.userId, userId)).orderBy(desc3(invoices.createdAt));
  }
  async getAllInvoices() {
    return db.select().from(invoices).orderBy(desc3(invoices.createdAt));
  }
  async createInvoice(invoice) {
    const [created] = await db.insert(invoices).values(invoice).returning();
    return created;
  }
  async updateInvoice(id, invoice) {
    await db.update(invoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(invoices.id, id));
  }
  async getNextInvoiceNumber() {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const [prefixSetting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, "invoice_prefix"));
    let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "INV";
    const prefix = rawPrefix.replace(/[^A-Za-z0-9_]/g, "").substring(0, 10) || "INV";
    const [startSetting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, "invoice_start_number"));
    const startNumber = startSetting?.value ? parseInt(String(startSetting.value).replace(/"/g, ""), 10) || 1 : 1;
    const likePattern = `${prefix}-${year}-%`;
    const result = await db.execute(sql5`
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
    const [prefixSetting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, "refund_note_prefix"));
    let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "RF";
    const prefix = rawPrefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "RF";
    const result = await db.execute(sql5`
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
    const [item] = await db.select().from(paymentWebhookQueue).where(eq4(paymentWebhookQueue.id, id));
    return item;
  }
  async getPendingWebhooks() {
    return db.select().from(paymentWebhookQueue).where(eq4(paymentWebhookQueue.status, "pending")).orderBy(asc(paymentWebhookQueue.receivedAt));
  }
  async getWebhookByEventId(gateway, eventId) {
    const [item] = await db.select().from(paymentWebhookQueue).where(and4(
      eq4(paymentWebhookQueue.gateway, gateway),
      eq4(paymentWebhookQueue.eventId, eventId)
    ));
    return item;
  }
  async createWebhookQueueItem(item) {
    const [created] = await db.insert(paymentWebhookQueue).values(item).returning();
    return created;
  }
  async updateWebhookQueueItem(id, item) {
    await db.update(paymentWebhookQueue).set(item).where(eq4(paymentWebhookQueue.id, id));
  }
  async getExpiredWebhooks() {
    const now = /* @__PURE__ */ new Date();
    return db.select().from(paymentWebhookQueue).where(and4(
      eq4(paymentWebhookQueue.status, "pending"),
      lte(paymentWebhookQueue.expiresAt, now)
    ));
  }
  async getRetryableWebhooks() {
    const now = /* @__PURE__ */ new Date();
    return db.select().from(paymentWebhookQueue).where(and4(
      or2(
        eq4(paymentWebhookQueue.status, "pending"),
        eq4(paymentWebhookQueue.status, "failed")
      ),
      sql5`${paymentWebhookQueue.attemptCount} < ${paymentWebhookQueue.maxAttempts}`,
      or2(
        isNull2(paymentWebhookQueue.nextRetryAt),
        lte(paymentWebhookQueue.nextRetryAt, now)
      ),
      gte3(paymentWebhookQueue.expiresAt, now)
    )).orderBy(asc(paymentWebhookQueue.receivedAt));
  }
  // Email Notification Settings
  async getEmailNotificationSetting(eventType) {
    const [setting] = await db.select().from(emailNotificationSettings).where(eq4(emailNotificationSettings.eventType, eventType));
    return setting;
  }
  async getAllEmailNotificationSettings() {
    return db.select().from(emailNotificationSettings).orderBy(asc(emailNotificationSettings.category), asc(emailNotificationSettings.eventType));
  }
  async getEmailNotificationSettingsByCategory(category) {
    return db.select().from(emailNotificationSettings).where(eq4(emailNotificationSettings.category, category)).orderBy(asc(emailNotificationSettings.eventType));
  }
  async createEmailNotificationSetting(setting) {
    const [created] = await db.insert(emailNotificationSettings).values(setting).returning();
    return created;
  }
  async updateEmailNotificationSetting(eventType, setting) {
    await db.update(emailNotificationSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(emailNotificationSettings.eventType, eventType));
  }
  // Admin Call Monitoring
  async getAdminCalls(options) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const offset = (page - 1) * pageSize;
    const conditions = [];
    if (options.userId) {
      conditions.push(eq4(calls.userId, options.userId));
    }
    if (options.status) {
      conditions.push(eq4(calls.status, options.status));
    }
    if (options.startDate) {
      conditions.push(gte3(calls.createdAt, options.startDate));
    }
    if (options.endDate) {
      conditions.push(lte(calls.createdAt, options.endDate));
    }
    if (options.search) {
      conditions.push(
        or2(
          sql5`${calls.phoneNumber} ILIKE ${`%${options.search}%`}`,
          sql5`${calls.transcript} ILIKE ${`%${options.search}%`}`
        )
      );
    }
    const whereClause = conditions.length > 0 ? and4(...conditions) : void 0;
    const violationCountSubquery = db.select({
      callId: contentViolations.callId,
      count: sql5`count(*)`.as("violation_count"),
      summary: sql5`string_agg(${contentViolations.detectedWord}, ', ' ORDER BY ${contentViolations.createdAt} DESC)`.as("violation_summary")
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
      violationCount: sql5`COALESCE(${violationCountSubquery.count}, 0)`,
      violationSummary: sql5`${violationCountSubquery.summary}`
    }).from(calls).leftJoin(users, eq4(calls.userId, users.id)).leftJoin(campaigns, eq4(calls.campaignId, campaigns.id)).leftJoin(violationCountSubquery, eq4(calls.id, violationCountSubquery.callId));
    if (whereClause) {
      query = query.where(whereClause);
    }
    if (options.hasViolations === true) {
      query = query.where(sql5`COALESCE(${violationCountSubquery.count}, 0) > 0`);
    } else if (options.hasViolations === false) {
      query = query.where(sql5`COALESCE(${violationCountSubquery.count}, 0) = 0`);
    }
    const results = await query.orderBy(desc3(calls.createdAt)).limit(pageSize).offset(offset);
    const countResult = await db.select({ count: sql5`count(*)` }).from(calls).where(whereClause);
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
    }).from(calls).leftJoin(users, eq4(calls.userId, users.id)).leftJoin(campaigns, eq4(calls.campaignId, campaigns.id)).leftJoin(contacts, eq4(calls.contactId, contacts.id)).where(eq4(calls.id, id));
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
    return db.select().from(contentViolations).where(eq4(contentViolations.callId, callId)).orderBy(desc3(contentViolations.createdAt));
  }
  async getContentViolations(options) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const offset = (page - 1) * pageSize;
    const conditions = [];
    if (options.userId) {
      conditions.push(eq4(contentViolations.userId, options.userId));
    }
    if (options.status) {
      conditions.push(eq4(contentViolations.status, options.status));
    }
    if (options.severity) {
      conditions.push(eq4(contentViolations.severity, options.severity));
    }
    if (options.startDate) {
      conditions.push(gte3(contentViolations.createdAt, options.startDate));
    }
    if (options.endDate) {
      conditions.push(lte(contentViolations.createdAt, options.endDate));
    }
    const whereClause = conditions.length > 0 ? and4(...conditions) : void 0;
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
    }).from(contentViolations).leftJoin(users, eq4(contentViolations.userId, users.id)).leftJoin(calls, eq4(contentViolations.callId, calls.id));
    if (whereClause) {
      query = query.where(whereClause);
    }
    const results = await query.orderBy(desc3(contentViolations.createdAt)).limit(pageSize).offset(offset);
    const countResult = await db.select({ count: sql5`count(*)` }).from(contentViolations).where(whereClause);
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
    const [updated] = await db.update(contentViolations).set(data).where(eq4(contentViolations.id, id)).returning();
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
    return db.select().from(bannedWords).where(eq4(bannedWords.isActive, true)).orderBy(asc(bannedWords.word));
  }
  async createBannedWord(data) {
    const [word] = await db.insert(bannedWords).values(data).returning();
    return word;
  }
  async updateBannedWord(id, data) {
    const [updated] = await db.update(bannedWords).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(bannedWords.id, id)).returning();
    return updated;
  }
  async deleteBannedWord(id) {
    const result = await db.delete(bannedWords).where(eq4(bannedWords.id, id)).returning();
    return result.length > 0;
  }
  async getCallsWithTranscripts() {
    return db.select().from(calls).where(and4(
      isNotNull(calls.transcript),
      sql5`${calls.transcript} != ''`
    ));
  }
  // Demo Sessions - Browser-based demo calls
  async createDemoSession(data) {
    const [session] = await db.insert(demoSessions).values(data).returning();
    return session;
  }
  async getDemoSession(id) {
    const [session] = await db.select().from(demoSessions).where(eq4(demoSessions.id, id));
    return session;
  }
  async getDemoSessionByToken(token) {
    const [session] = await db.select().from(demoSessions).where(eq4(demoSessions.sessionToken, token));
    return session;
  }
  async updateDemoSession(id, data) {
    await db.update(demoSessions).set(data).where(eq4(demoSessions.id, id));
  }
  async getActiveDemoSessionCount() {
    const result = await db.select({ count: sql5`count(*)` }).from(demoSessions).where(eq4(demoSessions.status, "active"));
    return Number(result[0]?.count || 0);
  }
  async getRecentDemoSessionByIp(ip, cooldownMinutes) {
    const cooldownTime = new Date(Date.now() - cooldownMinutes * 60 * 1e3);
    const [session] = await db.select().from(demoSessions).where(and4(
      eq4(demoSessions.visitorIp, ip),
      gte3(demoSessions.createdAt, cooldownTime)
    )).orderBy(desc3(demoSessions.createdAt)).limit(1);
    return session;
  }
  async getDemoSessionStats(days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
    const sessions = await db.select().from(demoSessions).where(gte3(demoSessions.createdAt, startDate));
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
var storage = new DbStorage();

// server/utils/batch-utils.js
import { nanoid as nanoid3 } from "nanoid";
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
      const inserted = await db.insert(contacts).values(chunk).returning();
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
          const [singleInsert] = await db.insert(contacts).values(contactInsert).returning();
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
    await storage.updateCampaign(campaignId, {
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
    const [agent] = await db.select().from(agents).where(and5(eq5(agents.id, data.agentId), eq5(agents.userId, userId))).limit(1);
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
      const [userPhone] = await db.select().from(phoneNumbers).where(and5(eq5(phoneNumbers.userId, userId), eq5(phoneNumbers.status, "active"))).limit(1);
      if (userPhone) {
        fromPhoneId = userPhone.id;
      }
    }
    const [campaign] = await db.insert(campaigns).values({
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
            const [existing] = await db.select().from(contacts).where(and5(eq5(contacts.campaignId, campaign.id), eq5(contacts.phone, contact.phone))).limit(1);
            if (existing) {
              skipped++;
              continue;
            }
            await db.insert(contacts).values({
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
          await db.update(campaigns).set({ totalContacts: sql6`COALESCE(${campaigns.totalContacts}, 0) + ${added}` }).where(eq5(campaigns.id, campaign.id));
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
      db.select().from(campaigns).where(eq5(campaigns.userId, userId)).orderBy(desc4(campaigns.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql6`count(*)` }).from(campaigns).where(eq5(campaigns.userId, userId))
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
    const [campaign] = await db.select().from(campaigns).where(and5(eq5(campaigns.id, id), eq5(campaigns.userId, userId))).limit(1);
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
    const [campaign] = await db.select().from(campaigns).where(and5(eq5(campaigns.id, id), eq5(campaigns.userId, userId))).limit(1);
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
      const [existing] = await db.select().from(contacts).where(and5(eq5(contacts.campaignId, id), eq5(contacts.phone, contact.phoneNumber))).limit(1);
      if (existing) {
        skipped++;
        continue;
      }
      await db.insert(contacts).values({
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
    await db.update(campaigns).set({ totalContacts: sql6`${campaigns.totalContacts} + ${added}` }).where(eq5(campaigns.id, id));
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
    const [campaign] = await db.select().from(campaigns).where(and5(eq5(campaigns.id, id), eq5(campaigns.userId, userId))).limit(1);
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
    const [user] = await db.select().from(users).where(eq5(users.id, userId)).limit(1);
    if (!user || user.credits < campaign.totalContacts) {
      const response2 = {
        success: false,
        error: { code: "INSUFFICIENT_CREDITS", message: "Insufficient credits to run this campaign." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(402).json(response2);
    }
    await db.update(campaigns).set({
      status: "running",
      startedAt: /* @__PURE__ */ new Date()
    }).where(eq5(campaigns.id, id));
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
    const [campaign] = await db.select().from(campaigns).where(and5(eq5(campaigns.id, id), eq5(campaigns.userId, userId))).limit(1);
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
    await db.update(campaigns).set({ status: "paused" }).where(eq5(campaigns.id, id));
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
    const [campaign] = await db.select().from(campaigns).where(and5(eq5(campaigns.id, id), eq5(campaigns.userId, userId))).limit(1);
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
        const [existing] = await db.select().from(contacts).where(and5(eq5(contacts.campaignId, id), eq5(contacts.phone, contact.phone))).limit(1);
        if (existing) {
          skipped++;
          continue;
        }
        await db.insert(contacts).values({
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
      await db.update(campaigns).set({
        totalContacts: sql6`${campaigns.totalContacts} + ${added}`
      }).where(eq5(campaigns.id, id));
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
import { eq as eq6, and as and6, desc as desc5, sql as sql7 } from "drizzle-orm";
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
      db.select().from(agents).where(eq6(agents.userId, userId)).orderBy(desc5(agents.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql7`count(*)` }).from(agents).where(eq6(agents.userId, userId))
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
    const [agent] = await db.select().from(agents).where(and6(eq6(agents.id, id), eq6(agents.userId, userId))).limit(1);
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
    const [agent] = await db.select().from(agents).where(and6(eq6(agents.id, id), eq6(agents.userId, userId))).limit(1);
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
    const [flow] = await db.select().from(flows).where(eq6(flows.id, agent.flowId)).limit(1);
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
    const [agent] = await db.select().from(agents).where(and6(eq6(agents.id, id), eq6(agents.userId, userId))).limit(1);
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
      await db.update(flows).set({
        nodes: flow.nodes,
        edges: flow.edges,
        variables: flow.variables,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq6(flows.id, agent.flowId));
    } else {
      const [newFlow] = await db.insert(flows).values({
        userId,
        name: flow.name || `${agent.name} Flow`,
        nodes: flow.nodes,
        edges: flow.edges,
        variables: flow.variables
      }).returning();
      await db.update(agents).set({ flowId: newFlow.id, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(agents.id, id));
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
import { eq as eq7, and as and7, desc as desc6, sql as sql8 } from "drizzle-orm";
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
      db.select().from(leads).where(eq7(leads.userId, userId)).orderBy(desc6(leads.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql8`count(*)` }).from(leads).where(eq7(leads.userId, userId))
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
    const [existing] = await db.select().from(leads).where(and7(eq7(leads.userId, userId), eq7(leads.phone, data.phone))).limit(1);
    if (existing) {
      const response2 = {
        success: false,
        error: { code: "ALREADY_EXISTS", message: "Contact with this phone number already exists." },
        meta: { requestId: req.requestId, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      };
      return res.status(409).json(response2);
    }
    const [contact] = await db.insert(leads).values({
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
    const [contact] = await db.select().from(leads).where(and7(eq7(leads.id, id), eq7(leads.userId, userId))).limit(1);
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
    const [existing] = await db.select().from(leads).where(and7(eq7(leads.id, id), eq7(leads.userId, userId))).limit(1);
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
    const [updated] = await db.update(leads).set({
      phone: phone ?? existing.phone,
      firstName: firstName ?? existing.firstName,
      lastName: lastName ?? existing.lastName,
      email: email ?? existing.email,
      company: company ?? existing.company,
      tags: tags ?? existing.tags,
      customFields: customFields ?? existing.customFields,
      stage: stage ?? existing.stage,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq7(leads.id, id)).returning();
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
    const result = await db.delete(leads).where(and7(eq7(leads.id, id), eq7(leads.userId, userId))).returning();
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
        const [existing] = await db.select().from(leads).where(and7(eq7(leads.userId, userId), eq7(leads.phone, contact.phone))).limit(1);
        if (existing) {
          if (skipDuplicates) {
            skipped++;
            continue;
          } else {
            errors.push({ row: i + 1, phone: contact.phone, error: "Duplicate phone number" });
            continue;
          }
        }
        await db.insert(leads).values({
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
import { eq as eq8, and as and8, gte as gte4, desc as desc7, sql as sql9 } from "drizzle-orm";
var router5 = Router5();
router5.get(
  "/balance",
  apiAuthMiddleware("credits:read"),
  asyncHandler(async (req, res) => {
    const { userId } = req.apiAuth;
    const [user] = await db.select({ credits: users.credits }).from(users).where(eq8(users.id, userId)).limit(1);
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
    const transactions = await db.select().from(creditTransactions).where(and8(
      eq8(creditTransactions.userId, userId),
      gte4(creditTransactions.createdAt, startDate)
    )).orderBy(desc7(creditTransactions.createdAt)).limit(1e3);
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
      db.select({
        totalCalls: sql9`count(*)`,
        completedCalls: sql9`count(*) filter (where status = 'completed')`,
        failedCalls: sql9`count(*) filter (where status = 'failed')`,
        totalDuration: sql9`coalesce(sum(duration), 0)`
      }).from(calls).where(and8(eq8(calls.userId, userId), gte4(calls.createdAt, startDate))),
      db.select({
        totalCalls: sql9`count(*)`,
        completedCalls: sql9`count(*) filter (where status = 'completed')`,
        failedCalls: sql9`count(*) filter (where status = 'failed')`,
        totalDuration: sql9`coalesce(sum(duration), 0)`
      }).from(plivoCalls).where(and8(eq8(plivoCalls.userId, userId), gte4(plivoCalls.createdAt, startDate))),
      db.select({
        totalCalls: sql9`count(*)`,
        completedCalls: sql9`count(*) filter (where status = 'completed')`,
        failedCalls: sql9`count(*) filter (where status = 'failed')`,
        totalDuration: sql9`coalesce(sum(duration), 0)`
      }).from(twilioOpenaiCalls).where(and8(eq8(twilioOpenaiCalls.userId, userId), gte4(twilioOpenaiCalls.createdAt, startDate))),
      db.select({
        totalCredits: sql9`coalesce(sum(abs(amount)), 0)`
      }).from(creditTransactions).where(and8(
        eq8(creditTransactions.userId, userId),
        gte4(creditTransactions.createdAt, startDate),
        sql9`amount < 0`
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
      db.select().from(campaigns).where(eq8(campaigns.userId, userId)).orderBy(desc7(campaigns.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql9`count(*)` }).from(campaigns).where(eq8(campaigns.userId, userId))
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
import { eq as eq9, and as and9, gte as gte5, desc as desc8, sql as sql10 } from "drizzle-orm";
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
      db.select({
        totalCalls: sql10`count(*)`,
        completedCalls: sql10`count(*) filter (where status = 'completed')`,
        failedCalls: sql10`count(*) filter (where status = 'failed')`,
        totalDuration: sql10`coalesce(sum(duration), 0)`
      }).from(calls).where(and9(eq9(calls.userId, userId), gte5(calls.createdAt, startDate))),
      db.select({
        totalCalls: sql10`count(*)`,
        completedCalls: sql10`count(*) filter (where status = 'completed')`,
        failedCalls: sql10`count(*) filter (where status = 'failed')`,
        totalDuration: sql10`coalesce(sum(duration), 0)`
      }).from(plivoCalls).where(and9(eq9(plivoCalls.userId, userId), gte5(plivoCalls.createdAt, startDate))),
      db.select({
        totalCalls: sql10`count(*)`,
        completedCalls: sql10`count(*) filter (where status = 'completed')`,
        failedCalls: sql10`count(*) filter (where status = 'failed')`,
        totalDuration: sql10`coalesce(sum(duration), 0)`
      }).from(twilioOpenaiCalls).where(and9(eq9(twilioOpenaiCalls.userId, userId), gte5(twilioOpenaiCalls.createdAt, startDate))),
      db.select({
        totalCredits: sql10`coalesce(sum(abs(amount)), 0)`
      }).from(creditTransactions).where(and9(
        eq9(creditTransactions.userId, userId),
        gte5(creditTransactions.createdAt, startDate),
        sql10`amount < 0`
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
      db.select().from(campaigns).where(eq9(campaigns.userId, userId)).orderBy(desc8(campaigns.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql10`count(*)` }).from(campaigns).where(eq9(campaigns.userId, userId))
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
      total: sql10`count(*)`,
      completed: sql10`count(*) filter (where status = 'completed')`
    };
    const [elevenLabsStats, plivoStats, twilioStats, campaignStats] = await Promise.all([
      db.select(callCountSelect).from(calls).where(and9(eq9(calls.userId, userId), gte5(calls.createdAt, startDate))),
      db.select(callCountSelect).from(plivoCalls).where(and9(eq9(plivoCalls.userId, userId), gte5(plivoCalls.createdAt, startDate))),
      db.select(callCountSelect).from(twilioOpenaiCalls).where(and9(eq9(twilioOpenaiCalls.userId, userId), gte5(twilioOpenaiCalls.createdAt, startDate))),
      db.select({
        total: sql10`count(*)`,
        running: sql10`count(*) filter (where status = 'running')`,
        completed: sql10`count(*) filter (where status = 'completed')`
      }).from(campaigns).where(eq9(campaigns.userId, userId))
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
import { eq as eq10, and as and10, desc as desc9, sql as sql11 } from "drizzle-orm";
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
      db.select().from(webhookSubscriptions).where(eq10(webhookSubscriptions.userId, userId)).orderBy(desc9(webhookSubscriptions.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql11`count(*)` }).from(webhookSubscriptions).where(eq10(webhookSubscriptions.userId, userId))
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
    const [webhook] = await db.insert(webhookSubscriptions).values({
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
    const [existing] = await db.select().from(webhookSubscriptions).where(and10(eq10(webhookSubscriptions.id, id), eq10(webhookSubscriptions.userId, userId))).limit(1);
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
    const [updated] = await db.update(webhookSubscriptions).set({
      url: url ?? existing.url,
      events: events ?? existing.events,
      isActive: isActive ?? existing.isActive,
      description: description ?? existing.description,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq10(webhookSubscriptions.id, id)).returning();
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
    const result = await db.delete(webhookSubscriptions).where(and10(eq10(webhookSubscriptions.id, id), eq10(webhookSubscriptions.userId, userId))).returning();
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
    const [webhook] = await db.select().from(webhookSubscriptions).where(and10(eq10(webhookSubscriptions.id, id), eq10(webhookSubscriptions.userId, userId))).limit(1);
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
        message: "This is a test webhook delivery from AgentLabs API.",
        webhookId: webhook.id
      }
    };
    try {
      const signature = crypto2.createHmac("sha256", webhook.secret).update(JSON.stringify(testPayload)).digest("hex");
      const deliveryResponse = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AgentLabs-Signature": signature,
          "X-AgentLabs-Event": "test.ping"
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

// plugins/rest-api/routes/api-keys.routes.js
import { Router as Router8 } from "express";
import { z as z6 } from "zod";
import { eq as eq11, and as and11, sql as sql12 } from "drizzle-orm";
var router8 = Router8();
var requireAuth = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Authentication required" }
    });
  }
  next();
};
var createKeySchema = z6.object({
  name: z6.string().min(1).max(100),
  scopes: z6.array(z6.string()).optional(),
  rateLimit: z6.number().int().min(10).max(1e4).optional(),
  ipWhitelist: z6.array(z6.string().ip()).optional(),
  expiresAt: z6.string().datetime().optional(),
  description: z6.string().max(500).optional()
});
var updateKeySchema = z6.object({
  name: z6.string().min(1).max(100).optional(),
  scopes: z6.array(z6.string()).optional(),
  rateLimit: z6.number().int().min(10).max(1e4).optional(),
  ipWhitelist: z6.array(z6.string().ip()).optional(),
  isActive: z6.boolean().optional(),
  description: z6.string().max(500).optional()
});
router8.get("/", requireAuth, async (req, res) => {
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
router8.post("/", requireAuth, async (req, res) => {
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
router8.put("/:id", requireAuth, async (req, res) => {
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
router8.post("/:id/regenerate", requireAuth, async (req, res) => {
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
router8.delete("/:id", requireAuth, async (req, res) => {
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
router8.get("/scopes", requireAuth, async (req, res) => {
  const response = {
    success: true,
    data: Object.entries(API_SCOPES).map(([scope, description]) => ({
      scope,
      description
    }))
  };
  res.json(response);
});
router8.get("/:id/audit-logs", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const [logs, countResult] = await Promise.all([
      ApiKeyService.getAuditLogs(userId, { page, pageSize, apiKeyId: id }),
      db.select({ count: sql12`count(*)` }).from(apiAuditLogs).where(and11(eq11(apiAuditLogs.userId, userId), eq11(apiAuditLogs.apiKeyId, id)))
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
var api_keys_routes_default = router8;

// plugins/rest-api/routes/admin.routes.js
import { Router as Router9 } from "express";
import { eq as eq12, desc as desc10, sql as sql13 } from "drizzle-orm";
import { z as z7 } from "zod";
var router9 = Router9();
var requireAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "admin" && user.role !== "super_admin") {
    return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } });
  }
  next();
};
router9.get("/", requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 50, 100);
    const offset = (page - 1) * pageSize;
    const [keys, countResult, requestCounts] = await Promise.all([
      db.select({
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
      }).from(apiKeys).leftJoin(users, eq12(apiKeys.userId, users.id)).orderBy(desc10(apiKeys.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql13`count(*)` }).from(apiKeys),
      db.select({
        apiKeyId: apiAuditLogs.apiKeyId,
        count: sql13`count(*)`
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
router9.get("/settings", requireAdmin, async (req, res) => {
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
router9.put("/settings", requireAdmin, async (req, res) => {
  try {
    const schema = z7.object({
      defaultRateLimit: z7.number().min(1).max(1e4),
      defaultRateLimitWindow: z7.number().min(1).max(3600)
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
router9.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateSchema = z7.object({
      isActive: z7.boolean().optional(),
      rateLimit: z7.number().min(1).max(1e4).optional(),
      rateLimitWindow: z7.number().min(1).max(3600).optional()
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
    const [updated] = await db.update(apiKeys).set(updateData).where(eq12(apiKeys.id, id)).returning();
    if (!updated) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API key not found" } });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Admin API Keys] Update error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update API key" } });
  }
});
router9.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.delete(apiKeys).where(eq12(apiKeys.id, id)).returning();
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API key not found" } });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("[Admin API Keys] Delete error:", error);
    res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to delete API key" } });
  }
});
var admin_routes_default = router9;

// plugins/rest-api/index.ts
var API_VERSION2 = "v1";
var API_BASE_PATH = `/api/${API_VERSION2}`;
function createRestApiRouter() {
  const router10 = Router10();
  router10.use("/calls", calls_routes_default);
  router10.use("/campaigns", campaigns_routes_default);
  router10.use("/agents", agents_routes_default);
  router10.use("/contacts", contacts_routes_default);
  router10.use("/credits", credits_routes_default);
  router10.use("/analytics", analytics_routes_default);
  router10.use("/webhooks", webhooks_routes_default);
  router10.get("/health", (req, res) => {
    res.json({
      success: true,
      data: {
        status: "healthy",
        version: API_VERSION2,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  });
  router10.get("/", (req, res) => {
    res.json({
      success: true,
      data: {
        name: "AgentLabs REST API",
        version: API_VERSION2,
        documentation: "/api/v1/docs",
        endpoints: {
          calls: "/api/v1/calls",
          campaigns: "/api/v1/campaigns",
          agents: "/api/v1/agents",
          contacts: "/api/v1/contacts",
          credits: "/api/v1/credits",
          analytics: "/api/v1/analytics",
          webhooks: "/api/v1/webhooks"
        },
        authentication: {
          type: "API Key",
          header: "Authorization: Bearer <api_key>",
          alternativeHeader: "X-API-Key: <api_key>"
        }
      }
    });
  });
  return router10;
}
function registerRestApiRoutes(app, options) {
  if (options.callServices) {
    setCallServices(options.callServices);
  }
  app.use(API_BASE_PATH, createRestApiRouter());
  app.use("/api/user/api-keys", options.sessionAuthMiddleware, api_keys_routes_default);
  app.use("/api/admin/api-keys", options.sessionAuthMiddleware, options.adminAuthMiddleware, admin_routes_default);
  try {
    const specPath = path.join(process.cwd(), "plugins", "rest-api", "docs", "openapi.yaml");
    const openApiDocument = YAML.load(specPath);
    app.get("/api/docs/openapi.json", (_req, res) => {
      res.json(openApiDocument);
    });
    app.get("/api/docs", (_req, res) => {
      res.type("html").send(`<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AgentLabs API Reference</title>
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
          <span class="logo-text">AgentLabs</span>
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
</html>`);
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
      customSiteTitle: "AgentLabs API Playground",
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
    app.get("/api/docs/playground", swaggerUi.setup(openApiDocument, swaggerUiOptions));
    console.log("[REST API] Redoc documentation available at /api/docs (public access)");
    console.log("[REST API] Swagger UI playground available at /api/docs/playground");
  } catch (error) {
    console.warn("[REST API] Could not load OpenAPI spec, documentation disabled:", error);
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
  console.log("  - /api/user/api-keys (session auth)");
  console.log("  - /api/admin/api-keys (admin auth)");
}
var pluginInfo = {
  name: "rest-api",
  version: "1.0.0",
  description: "Comprehensive REST API for external system integration",
  author: "AgentLabs",
  features: [
    "API Key Authentication",
    "Rate Limiting",
    "Request Audit Logging",
    "IP Whitelisting",
    "Scoped Permissions",
    "Calls API",
    "Campaigns API",
    "Agents API",
    "Contacts API",
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
  API_VERSION2 as API_VERSION,
  ApiKeyService,
  apiAuthMiddleware,
  asyncHandler,
  createRestApiRouter,
  pluginInfo,
  registerRestApiRoutes,
  requireScope
};
