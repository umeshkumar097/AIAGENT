# 🧠 Zonvo AI — Complete Application Blueprint
> **Version:** 5.4.1 | **Brand:** Zonvo AI (Aiclex Solutions Pvt. Ltd.) | **License:** Aiclex Technologies

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Architecture Diagram](#4-architecture-diagram)
5. [Backend — Server Layer](#5-backend--server-layer)
6. [Frontend — Client Layer](#6-frontend--client-layer)
7. [Database Layer](#7-database-layer)
8. [API Routes Map](#8-api-routes-map)
9. [Background Jobs & Queue System](#9-background-jobs--queue-system)
10. [Plugin System](#10-plugin-system)
11. [Voice & AI Engine](#11-voice--ai-engine)
12. [Payment Integrations](#12-payment-integrations)
13. [Webhooks System](#13-webhooks-system)
14. [Security & Middleware](#14-security--middleware)
15. [Environment Variables](#15-environment-variables)
16. [Deployment](#16-deployment)

---

## 1. Project Overview

**Zonvo AI** ek full-stack, multi-tenant AI Voice Agent Platform hai jo businesses ko:
- AI-powered voice calls (inbound + outbound) karne deta hai
- Automated calling campaigns chalane deta hai
- CRM/Lead management karne deta hai
- WhatsApp/Email messaging integrate karne deta hai
- Flow-based automation banane deta hai
- Knowledge Base + RAG se agent ko smarter banane deta hai
- Multiple payment gateways se subscriptions manage karne deta hai

**App URL (Production):** `https://app.zonvo.tech`
**Process Manager:** PM2 (`zonvo-app` on port 3000)

---

## 2. Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ (ESM modules) |
| Framework | Express.js v4 |
| Language | TypeScript 5.6.3 |
| ORM | Drizzle ORM v0.45 |
| Database | PostgreSQL (NeonDB / self-hosted) |
| Auth | Passport.js (Local Strategy) + JWT |
| Session | express-session + connect-pg-simple |
| Queue | BullMQ v5 (optional Redis-backed) |
| Caching | Redis (ioredis) |
| WebSocket | express-ws + ws |
| Process Mgr | PM2 |

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| Language | TypeScript |
| Routing | Wouter v3 |
| State Mgmt | TanStack Query v5 |
| UI Library | Radix UI + shadcn/ui |
| Styling | TailwindCSS v3 + Framer Motion |
| Forms | React Hook Form + Zod |
| i18n | i18next + react-i18next |
| Charts | Recharts |
| Flow Builder | @xyflow/react (ReactFlow) |

### AI / Voice Providers
| Provider | Role |
|----------|------|
| ElevenLabs | Primary AI Voice Engine (Conversational AI) |
| OpenAI | LLM (GPT-4o-mini), Realtime API (SIP) |
| Sarvam AI | Indian language STT + TTS (Bulbul v3) |
| Deepgram | STT / TTS (Custom Voice Engine) |
| OpenRouter | LLM fallback (Custom Voice Engine) |

### Telephony Providers
| Provider | Role |
|----------|------|
| Twilio | Primary PSTN (calls + phone numbers) |
| Plivo | WhatsApp Business + PSTN backup |
| SIP Trunks | 13 providers (Telnyx, Vonage, Exotel, Bandwidth, etc.) |

### Payment Gateways
| Gateway | Region |
|---------|--------|
| Stripe | Global |
| Razorpay | India |
| PayPal | Global |
| Paystack | Africa |
| MercadoPago | Latin America |

---

## 3. Directory Structure

```
agentlabs_v5.4.1/
│
├── client/                          # React Frontend (SPA)
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── main.tsx                 # App entry point
│       ├── App.tsx                  # Router + Route definitions
│       ├── index.css                # Global styles (TailwindCSS)
│       ├── pages/                   # 48 page components
│       ├── components/              # Reusable UI components
│       ├── hooks/                   # Custom React hooks
│       ├── contexts/                # React Context providers
│       ├── lib/                     # Utility functions
│       └── i18n/                    # Internationalization
│
├── server/                          # Express Backend
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # Master route registration
│   ├── storage.ts                   # Database access layer (IStorage interface)
│   ├── db.ts                        # Drizzle DB instance
│   ├── vite.ts                      # Vite dev server integration
│   │
│   ├── routes/                      # API Route handlers (36 files)
│   │   ├── auth-routes.ts           # Login, signup, OTP, OAuth
│   │   ├── agent-routes.ts          # AI Agent CRUD (67KB)
│   │   ├── webhook-routes.ts        # ElevenLabs webhook handlers (264KB!)
│   │   ├── campaign-routes.ts       # Campaign management (53KB)
│   │   ├── phone-routes.ts          # Twilio phone numbers
│   │   ├── flow-automation-routes.ts# Flow Builder (154KB)
│   │   ├── crm-routes.ts            # CRM & leads
│   │   ├── analytics-routes.ts      # Analytics & reporting
│   │   ├── stripe-routes.ts         # Stripe billing
│   │   ├── razorpay-routes.ts       # Razorpay billing
│   │   ├── paypal-routes.ts         # PayPal billing
│   │   ├── paystack-routes.ts       # Paystack billing
│   │   ├── mercadopago-routes.ts    # MercadoPago billing
│   │   ├── rag-knowledge-routes.ts  # RAG / Knowledge Base
│   │   ├── sarvam-routes.ts         # Sarvam voice agent
│   │   ├── subscription-routes.ts   # Plan management
│   │   ├── admin-routes.ts          # Admin panel
│   │   └── ... (19 more route files)
│   │
│   ├── services/                    # Business Logic Services (57 files)
│   │   ├── elevenlabs.ts            # ElevenLabs API wrapper (153KB)
│   │   ├── campaign-executor.ts     # Campaign call execution (136KB)
│   │   ├── campaign-scheduler.ts    # Scheduler cron logic
│   │   ├── twilio.ts                # Twilio API wrapper (45KB)
│   │   ├── email-service.ts         # SMTP + template engine (70KB)
│   │   ├── flow-agent.ts            # Flow automation executor (51KB)
│   │   ├── enhanced-flow-compiler.ts# Flow to ElevenLabs format (57KB)
│   │   ├── rag-knowledge.ts         # RAG vector search
│   │   ├── credit-service.ts        # Credit ledger
│   │   ├── membership-service.ts    # Plan/subscription logic
│   │   ├── recording-service.ts     # Call recording
│   │   ├── post-call-messaging.ts   # Post-call email/WhatsApp
│   │   ├── incoming-agent.ts        # Inbound call handler (26KB)
│   │   ├── webhook-delivery.ts      # Outbound webhook delivery
│   │   ├── phone-billing-cron.ts    # Phone number billing
│   │   ├── startup-health-check.ts  # Boot checks (14KB)
│   │   ├── graceful-shutdown.ts     # SIGTERM handling
│   │   ├── resource-watchdog.ts     # Memory/CPU monitor
│   │   ├── elevenlabs-pool.ts       # API key pool manager (38KB)
│   │   ├── system-update-service.ts # Over-the-air updates (51KB)
│   │   └── ... (37 more services)
│   │
│   ├── engines/                     # Call Engine Adapters
│   │   ├── plivo/                   # Plivo WhatsApp/PSTN Engine
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── config/
│   │   ├── twilio-openai/           # Twilio + OpenAI Realtime Engine
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── routes/
│   │   │   └── services/
│   │   ├── crm/                     # CRM Engine
│   │   ├── kyc/                     # KYC Engine
│   │   ├── payment/                 # Payment processing
│   │   └── elevenlabs-migration/    # ElevenLabs agent migrator
│   │
│   ├── infrastructure/              # Core Infrastructure
│   │   ├── database/                # Connection pool manager
│   │   ├── redis/                   # Redis client
│   │   ├── bullmq/                  # BullMQ distributed queues
│   │   │   ├── queues.ts            # Queue definitions
│   │   │   ├── call-worker.ts       # Call processing worker (18KB)
│   │   │   ├── scheduler-worker.ts  # Campaign scheduler worker
│   │   │   └── campaign-queue-bridge.ts
│   │   ├── websocket/               # WebSocket manager
│   │   └── openai/                  # OpenAI client
│   │
│   ├── middleware/                  # Express Middleware
│   │   ├── auth.ts                  # JWT session auth
│   │   ├── admin-auth.ts            # Admin authentication
│   │   ├── hybrid-auth.ts           # JWT + Session hybrid
│   │   ├── rateLimiter.ts           # Rate limiting
│   │   ├── webhookValidation.ts     # HMAC webhook verification
│   │   ├── correlation-id.ts        # Request tracing
│   │   └── errorHandler.ts          # Global error handler
│   │
│   ├── utils/                       # Utility helpers
│   ├── types/                       # TypeScript type definitions
│   ├── lib/                         # Internal libraries
│   ├── storage/                     # File storage utilities
│   ├── scripts/                     # DB scripts
│   │
│   └── seed-*.ts                    # Database seeders
│       ├── seed-all.ts              # Master seeder (49KB)
│       ├── seed-agent-templates.ts
│       ├── seed-email-templates.ts
│       ├── seed-plans.ts
│       ├── seed-prompt-templates.ts
│       └── ... (6 more seeders)
│
├── shared/                          # Shared Code (Client + Server)
│   └── schema.ts                    # Drizzle DB schema (148KB, 3000+ lines)
│
├── plugins/                         # Self-contained Plugin System
│   ├── sip-engine/                  # SIP Telephony Plugin (v2.3.0)
│   ├── messaging/                   # Email + WhatsApp Plugin (v1.0.3)
│   ├── rest-api/                    # Public REST API Plugin
│   └── team-management/             # Team RBAC Plugin (v2.3.0)
│
├── custom-voice-engine/             # FreeSWITCH-based Custom Voice Engine
│   ├── services/                    # STT/LLM/TTS pipeline
│   ├── routes/                      # API endpoints
│   ├── docker/                      # Docker configuration
│   └── migrations/
│
├── migrations/                      # Drizzle SQL migrations (6 files)
│   ├── 0000_damp_spectrum.sql       # Initial schema (88KB)
│   ├── 0001_add_missing_columns.sql
│   ├── 0002_add_google_sheets_credentials.sql
│   ├── 0003_campaign_contact_retry.sql
│   ├── 0004_add_missing_tables.sql
│   └── 0005_add_missing_agent_messaging_columns.sql
│
├── packages/                        # Internal npm packages
│   └── Zonvo AI-core/              # @zonvo-ai/core package
│
├── data/                            # Static data files
├── kyc/                             # KYC uploaded documents
├── exports/                         # Data export files
├── logs/                            # Application logs
├── public/                          # Static assets
├── scripts/                         # Build/deploy scripts
├── ecosystem.config.cjs             # PM2 configuration
├── drizzle.config.ts                # Drizzle ORM config
├── vite.config.ts                   # Vite build config
├── tailwind.config.ts               # TailwindCSS config
├── tsconfig.json                    # TypeScript config
└── package.json                     # npm config (name: zonvo-ai, v5.4.1)
```

---

## 4. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER / CLIENT                            │
│                    React 18 + Vite SPA (Port 5000)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Dashboard │ │Agents    │ │Campaigns │ │Flow Bdr  │ │CRM/Leads │  │
│  │Analytics │ │PhoneNums │ │KnowledgeB│ │Billing   │ │Settings  │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
└───────┼────────────┼────────────┼────────────┼────────────┼─────────┘
        │                   REST API / WebSocket
        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS BACKEND (Port 5000)                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────┐   │
│  │Auth Middle │ │Rate Limiter│ │Correlation │ │Webhook         │   │
│  │(JWT+Session│ │            │ │ID Tracer   │ │Validator(HMAC) │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     ROUTE HANDLERS (36 files)               │   │
│  │  Auth | Agents | Campaigns | Webhooks | Phone | CRM | Admin  │   │
│  │  Billing | Analytics | Flow | RAG | Sarvam | Plugins | ...  │   │
│  └────────────────────────┬────────────────────────────────────┘   │
│                           │                                        │
│  ┌────────────────────────▼────────────────────────────────────┐   │
│  │                  BUSINESS LOGIC SERVICES (57 files)         │   │
│  │  ElevenLabs | Twilio | Campaigns | Email | Flow | RAG       │   │
│  │  Credits | Membership | Recording | Post-Call | Webhooks    │   │
│  └────┬──────────────┬─────────────────┬──────────────┬────────┘   │
│       │              │                 │              │            │
│  ┌────▼──┐    ┌──────▼────┐    ┌───────▼───┐  ┌─────▼───────┐    │
│  │BullMQ │    │ Redis     │    │PostgreSQL │  │External APIs│    │
│  │Queues │    │ Cache/Pub │    │ (Drizzle) │  │(ElevenLabs, │    │
│  └───────┘    └───────────┘    └───────────┘  │ Twilio, etc)│    │
└──────────────────────────────────────────────────────────────────── ┘

┌─────────────────────────────────────────────────────────────────────┐
│                         PLUGIN SYSTEM                               │
│  ┌─────────────┐ ┌─────────────┐ ┌───────────┐ ┌────────────────┐  │
│  │ SIP Engine  │ │  Messaging  │ │ REST API  │ │ Team Mgmt      │  │
│  │ (SIP Trunks)│ │(Email+WA)   │ │ (Pub API) │ │ (RBAC)         │  │
│  └─────────────┘ └─────────────┘ └───────────┘ └────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   CUSTOM VOICE ENGINE (Optional)                    │
│   FreeSWITCH -> WebSocket Audio -> STT -> LLM -> TTS -> FreeSWITCH  │
│   STT: Deepgram / Sarvam   LLM: OpenRouter   TTS: Deepgram / Sarvam │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Backend — Server Layer

### Entry Point (`server/index.ts`)

Server boot sequence:
1. `setupGlobalHandlers()` — SIGTERM, uncaughtException handlers
2. `initializeDirectories()` — required folders create karna
3. `databasePoolManager.initialize()` — DB pool warm-up
4. Express app setup — compression (gzip level 6), JSON body parser (2MB limit), cookie parser
5. `correlationIdMiddleware` — request tracing headers
6. `runStartupHealthCheck()` — DB connectivity, Redis, ElevenLabs ping
7. `registerRoutes(app)` — all API routes mount
8. Plugin routes auto-mount (SIP, Messaging, REST API, Team Mgmt)
9. Vite dev server (development mode only)
10. Background services start:
    - `startPhoneBillingCron()`
    - `startCreditBackfillMonitor()`
    - `startPhoneReleaseRetryWorker()`
    - `startWatchdog()`
    - `webhookRetryService.start()`
    - SIP resync jobs

### Storage Layer (`server/storage.ts` — 106KB)

- **IStorage interface** — 100+ method definitions covering all entities
- **DatabaseStorage class** — PostgreSQL implementation using Drizzle ORM
- Handles: Users, Agents, Calls, Campaigns, Contacts, CRM, Credits, Subscriptions, Phone Numbers, Knowledge Base, Flows, Webhooks, Analytics, etc.
- `db.ts` — Drizzle DB instance with NeonDB/PG connection

---

## 6. Frontend — Client Layer

### Pages (48 files in `client/src/pages/`)

| Page | Description |
|------|-------------|
| `LoginPage.tsx` | Multi-method auth (email/Google/Magic link) |
| `Dashboard.tsx` | Overview stats + 3D globe visualization |
| `Agents.tsx` | AI Agent management (largest file: 176KB) |
| `Campaigns.tsx` | Bulk calling campaigns list |
| `CampaignDetail.tsx` | Campaign detail + contacts + live progress |
| `Calls.tsx` | Call history |
| `CallDetail.tsx` | Call transcript + recording player |
| `CRMPage.tsx` | CRM leads + pipeline view (110KB) |
| `PhoneNumbers.tsx` | Twilio/SIP number management (73KB) |
| `KnowledgeBase.tsx` | RAG document upload + management |
| `FlowBuilderPage.tsx` | Visual flow automation builder (80KB) |
| `FlowsPage.tsx` | Flow list |
| `Analytics.tsx` | Call analytics + charts |
| `Billing.tsx` | Subscription + credit management (50KB) |
| `Settings.tsx` | Account settings (52KB) |
| `AdminDashboard.tsx` | Super admin panel (38KB) |
| `IncomingConnections.tsx` | Inbound call configuration (60KB) |
| `WebhookConfigPage.tsx` | Webhook management (50KB) |
| `Integrations.tsx` | Third-party integrations |
| `Voices.tsx` | ElevenLabs voice library |
| `WidgetsPage.tsx` | Embeddable widget config (71KB) |
| `FormsPage.tsx` | Lead capture forms (26KB) |
| `AppointmentsPage.tsx` | Appointment scheduling (46KB) |
| `Conversations.tsx` | WhatsApp conversations inbox |
| `TransactionHistory.tsx` | Payment transaction history |
| `Upgrade.tsx` | Plan upgrade page (49KB) |
| `InstallWizard.tsx` | First-time setup wizard |
| `AllContacts.tsx` | Global contacts list |

### Key Components

| Component | Purpose |
|-----------|---------|
| `AgentCreationWizard.tsx` | Multi-step agent creation (71KB) |
| `CreateCampaignDialog.tsx` | Campaign creation wizard (46KB) |
| `CreditPurchaseDialog.tsx` | Credit top-up flow (51KB) |
| `PromptTemplatesLibrary.tsx` | AI prompt library (35KB) |
| `PhoneNumberSubscriptionSection.tsx` | Phone billing UI (21KB) |
| `app-sidebar.tsx` | Main navigation sidebar (19KB) |
| `BrandingProvider.tsx` | White-label branding system |
| `VoicePreviewButton.tsx` | Voice preview player (13KB) |
| `TestFlowDialog.tsx` | Flow testing interface |
| `AgentVersionHistory.tsx` | Agent version management |
| `NotificationBell.tsx` | In-app notifications |

### State Management

- **TanStack Query** — all server state (API calls, cache, background refetch)
- **React Context** — auth state, theme (dark/light), direction (RTL/LTR)
- **React Hook Form + Zod** — form state + schema validation
- **Custom hooks:** `useActivityTimeout`, `useSeoSettings`, `usePluginStatus`, `useToast`, `useMobile`

---

## 7. Database Layer

### ORM & Migration

- **ORM:** Drizzle ORM (PostgreSQL dialect)
- **Schema file:** `shared/schema.ts` (148KB — largest file in project, 3000+ lines)
- **Migration tool:** drizzle-kit
- **Migration folder:** `migrations/` (6 migration files)
- **Seeder:** `server/seed-all.ts` (49KB)

### Core Tables (from `shared/schema.ts`)

```
users                    — user accounts (multi-tenant)
agents                   — AI voice agents per user
agent_versions           — agent version history
calls                    — call records (inbound + outbound)
call_recordings          — recording metadata and URLs
campaigns                — bulk calling campaigns
campaign_contacts        — contacts per campaign
contacts                 — global contact list
crm_leads                — CRM pipeline leads
crm_stages               — CRM pipeline stages
phone_numbers            — Twilio phone numbers
knowledge_base_docs      — RAG documents
knowledge_chunks         — RAG embeddings/chunks
flows                    — automation flows
flow_nodes               — flow node data
flow_edges               — flow edge connections
appointments             — appointment records
subscriptions            — user subscriptions
subscription_plans       — available plans
credit_packages          — purchasable credit packs
credits                  — credit ledger
transactions             — payment transactions
api_keys                 — user API keys
api_audit_logs           — API usage logs
api_rate_limits          — rate limit tracking
sip_trunks               — SIP trunk credentials
sip_phone_numbers        — SIP phone number mappings
sip_calls                — SIP call records
webhooks                 — user-configured outbound webhooks
webhook_deliveries       — webhook delivery logs
global_settings          — admin global configuration
email_templates          — system email templates
languages                — supported languages
platform_languages       — UI language packs
llm_models               — available LLM models
prompt_templates         — prompt template library
notifications            — in-app notifications
audit_logs               — system audit trail
```

### Plugin-Only Tables (excluded from drizzle-kit scope)

```
teams, team_roles, team_members, team_permissions, team_member_sessions, team_activity_logs
admin_teams, admin_team_roles, admin_team_members, admin_team_permissions, admin_team_sessions
whatsapp_conversations, whatsapp_messages
user_email_templates, messaging_logs, messaging_plugin_meta
whatsway_settings, meta_whatsapp_settings, meta_whatsapp_admin_config
```

---

## 8. API Routes Map

### Authentication (`/api/auth`)
- `POST /api/auth/register` — User registration + OTP email
- `POST /api/auth/login` — Email/password login
- `POST /api/auth/logout` — Session destroy
- `POST /api/auth/verify-otp` — OTP verification
- `GET  /api/auth/google` — Google OAuth initiate
- `GET  /api/auth/google/callback` — Google OAuth callback
- `POST /api/auth/magic-link` — Magic link email
- `GET  /api/auth/me` — Current user info

### Agents (`/api/agents`)
- `GET/POST /api/agents` — List / Create agent
- `GET/PUT/DELETE /api/agents/:id` — Agent CRUD
- `POST /api/agents/:id/test-call` — Test call
- `GET /api/agents/:id/versions` — Version history
- `POST /api/agents/:id/deploy` — Deploy to ElevenLabs

### Calls (`/api/calls`)
- `GET /api/calls` — Call history (paginated + filtered)
- `GET /api/calls/:id` — Call detail + transcript
- `POST /api/calls/outbound` — Initiate outbound call
- `GET /api/calls/:id/recording` — Call recording stream

### Campaigns (`/api/campaigns`)
- `GET/POST /api/campaigns` — List / Create campaign
- `GET/PUT/DELETE /api/campaigns/:id` — Campaign CRUD
- `POST /api/campaigns/:id/start` — Start campaign
- `POST /api/campaigns/:id/pause` — Pause campaign
- `POST /api/campaigns/:id/stop` — Stop campaign
- `GET /api/campaigns/:id/contacts` — Contact list
- `POST /api/campaigns/:id/contacts/upload` — CSV upload

### CRM (`/api/crm`)
- `GET/POST /api/crm/leads` — Leads management
- `GET/PUT /api/crm/leads/:id` — Lead detail/update
- `GET/POST /api/crm/stages` — Pipeline stages
- `POST /api/crm/leads/:id/convert` — Convert to contact

### Phone Numbers (`/api/phone-numbers`)
- `GET /api/phone-numbers` — List owned numbers
- `POST /api/phone-numbers/buy` — Purchase Twilio number
- `DELETE /api/phone-numbers/:id` — Release number
- `GET /api/phone-numbers/available` — Search available numbers

### Knowledge Base (`/api/knowledge`)
- `GET/POST /api/knowledge/docs` — Document management
- `DELETE /api/knowledge/docs/:id` — Delete document
- `POST /api/knowledge/search` — RAG semantic search
- `POST /api/knowledge/sync` — Sync to ElevenLabs

### Flow Automation (`/api/flows`)
- `GET/POST /api/flows` — Flow list / create
- `GET/PUT/DELETE /api/flows/:id` — Flow CRUD
- `POST /api/flows/:id/compile` — Compile to agent tool
- `GET /api/flow-templates` — Template library
- `GET /api/flows/:id/logs` — Execution logs

### Analytics (`/api/analytics`)
- `GET /api/analytics/overview` — Dashboard stats
- `GET /api/analytics/calls` — Call analytics + breakdown
- `GET /api/analytics/campaigns` — Campaign performance
- `GET /api/analytics/credits` — Credit usage charts

### Billing
- `POST /api/stripe/create-checkout` — Stripe checkout session
- `POST /api/razorpay/create-order` — Razorpay order
- `POST /api/paypal/create-order` — PayPal order
- `POST /api/paystack/initialize` — Paystack payment
- `POST /api/mercadopago/create-preference` — MP preference
- `POST /api/credits/purchase` — Buy credit package
- `GET /api/transactions` — Transaction history

### Webhooks — ElevenLabs Inbound
- `POST /api/webhooks/elevenlabs/:agentId/post-call` — Post-call summary
- `POST /api/webhooks/elevenlabs/:agentId/tool-call` — Tool invocation

### Admin (`/api/admin`)
- `GET /api/admin/users` — All users list
- `GET /api/admin/stats` — Platform statistics
- `POST /api/admin/plans` — Plan CRUD
- `POST /api/admin/elevenlabs-keys` — API key pool management
- `POST /api/admin/system-update` — System update trigger

### Sarvam / Plivo
- `POST /api/plivo/whatsapp/answer` — WhatsApp voice answer URL
- `POST /api/plivo/whatsapp/message` — WhatsApp message webhook
- `GET  /api/sarvam/voices` — Available Sarvam voices

---

## 9. Background Jobs & Queue System

### In-Memory Mode (Default — `ENABLE_BULLMQ=false`)

| Service | Purpose | Interval |
|---------|---------|---------|
| `campaign-scheduler.ts` | Queue pending campaigns | 30s |
| `campaign-executor.ts` | Execute active campaigns | Real-time |
| `phone-billing-cron.ts` | Charge monthly phone fees | Daily |
| `credit-backfill-monitor.ts` | Fix missing credit records | 5 min |
| `phone-release-retry-worker.ts` | Retry failed phone releases | 10 min |
| `webhook-retry-service.ts` | Retry failed webhooks | 5 min |
| `resource-watchdog.ts` | Monitor CPU/memory | 60s |

### BullMQ Mode (Distributed — `ENABLE_BULLMQ=true`)

Redis-backed distributed job processing:

| Queue | Worker | Purpose |
|-------|--------|---------|
| `call-queue` | `call-worker.ts` | Process individual calls (18KB) |
| `scheduler-queue` | `scheduler-worker.ts` | Campaign scheduling (10KB) |
| `campaign-queue` | `campaign-executor.ts` | Campaign execution |

**Config:**
```
ENABLE_BULLMQ=true
REDIS_URL=redis://localhost:6379
BULLMQ_MAX_CONCURRENT_CALLS=10
BULLMQ_STUCK_CAMPAIGN_MAX_AGE_MS=1800000
BULLMQ_STALE_CALL_MAX_AGE_MS=3600000
```

---

## 10. Plugin System

Har plugin ek self-contained module hai. Structure:
- `plugin.json` — metadata, routes, DB tables, features list
- `index.ts` — register function (entry point)
- `routes/` — HTTP route handlers
- `services/` — business logic
- `migrations/` — plugin-specific SQL migrations
- `frontend/` or `ui/` — React component bundles (compiled)

### Available Plugins

#### SIP Engine Plugin (`plugins/sip-engine/` — v2.3.0)
- **Purpose:** SIP telephony integration
- **Engines:** ElevenLabs SIP (Inbound + Outbound), OpenAI Realtime SIP (Inbound only)
- **Providers:** 13 SIP providers — Twilio, Plivo, Telnyx, Vonage, Exotel, Bandwidth, DIDWW, Zadarma, Cloudonix, RingCentral, Sinch, Infobip, Generic
- **DB Tables:** `sip_trunks`, `sip_phone_numbers`, `sip_calls`
- **Routes:** `/api/sip/*`, `/api/openai-sip/*`, `/api/admin/sip/*`
- **Features:** Auto-provisioning, multi-provider, plan-based access control, campaign integration

#### Messaging Plugin (`plugins/messaging/` — v1.0.3)
- **Purpose:** Email + WhatsApp messaging
- **Providers:** SMTP, WhatsWay API, Meta WhatsApp Business Cloud API
- **DB Tables:** `user_email_templates`, `whatsapp_conversations`, `whatsapp_messages`, `messaging_logs`, `whatsway_settings`, `meta_whatsapp_settings`
- **Routes:** `/api/messaging/*`, `/api/webhooks/messaging/*`
- **Features:** WhatsApp inbox with AI auto-reply, Flow Builder nodes, Meta Embedded Signup

#### REST API Plugin (`plugins/rest-api/`)
- **Purpose:** Public developer API
- **Auth:** API key (Bearer token)
- **DB Tables:** `api_keys`, `api_audit_logs`, `api_rate_limits`
- **Features:** Rate limiting, audit logging, Swagger/OpenAPI docs

#### Team Management Plugin (`plugins/team-management/` — v2.3.0)
- **Purpose:** Role-based access control
- **Levels:** User-level teams + Admin-level teams
- **DB Tables:** `teams`, `team_roles`, `team_members`, `team_permissions`, `team_member_sessions`, `team_activity_logs`, `admin_teams`, `admin_team_members` (and variants)
- **Routes:** `/api/team/*`, `/api/admin/teams/*`
- **Features:** Section-wise CRUD permissions, separate login, activity logs

#### Custom Voice Engine (`custom-voice-engine/` — v1.0.0)
- **Purpose:** Self-hosted FreeSWITCH-based voice pipeline
- **STT:** Deepgram, Sarvam AI
- **LLM:** OpenRouter (GPT-4o-mini, Gemini Flash)
- **TTS:** Deepgram Nova-2, Sarvam AI
- **DB Tables:** `ve_provider_configs`, `ve_sessions`, `ve_call_recordings`, `ve_customer_memory`, `ve_conversation_memory`, `ve_llm_cache`, `ve_freeswitch_nodes`
- **Features:** VAD, barge-in, customer memory (short + long term), semantic LLM cache (Redis), call recording (S3/R2), Prometheus metrics
- **Deployment:** Docker + Kubernetes ready

---

## 11. Voice & AI Engine

### Primary Engine — ElevenLabs Conversational AI

```
Call Flow:
Twilio (PSTN) ──► ElevenLabs Agent ──► Post-call Webhook ──► Zonvo Backend
                      │                                           │
                      ├─ Tool Call: RAG Search                    ├─ Store Transcript
                      ├─ Tool Call: Book Appointment              ├─ Update CRM
                      ├─ Tool Call: Fill Form                     ├─ Send Email
                      └─ Tool Call: External Webhook              └─ Trigger Flow
```

1. **Agent Creation** → `server/services/elevenlabs.ts` → ElevenLabs REST API
2. **Outbound Call** → Twilio REST → ElevenLabs handles full conversation
3. **Inbound Call** → Twilio webhook → Zonvo routes to ElevenLabs
4. **Tool Calls** during live call → ElevenLabs calls Zonvo `/api/webhooks` tools
5. **Post-call** → ElevenLabs POSTs summary → transcript stored, post-call actions triggered

### ElevenLabs Tool Services
| File | Tool Purpose |
|------|-------------|
| `appointment-elevenlabs-tool.ts` | Book/check appointments |
| `form-elevenlabs-tool.ts` | Capture lead form data |
| `rag-elevenlabs-tool.ts` | Knowledge base lookup |
| `play-audio-elevenlabs-tool.ts` | Play audio file to caller |
| `universal-webhook-tool.ts` | Call user's external webhook |

### Sarvam Voice Agent (Custom Integration — Zonvo)
| Setting | Value |
|---------|-------|
| Telephony | Plivo |
| Voice | `priya` |
| TTS Model | `bulbul:v3` |
| LLM | `gpt-4o-mini` (streaming) |
| STT | Sarvam `saaras:v3` |
| Answer URL | `https://app.zonvo.tech/api/plivo/whatsapp/answer` |
| Message URL | `https://app.zonvo.tech/api/plivo/whatsapp/message` |

### ElevenLabs API Key Pool
- Multiple API keys managed by `elevenlabs-pool.ts` (38KB)
- Round-robin / least-used key selection
- Rate limit tracking per key
- Admin panel → add/remove/disable keys

### Flow Builder Compiler
- Visual nodes → `enhanced-flow-compiler.ts` (57KB)
- Converts ReactFlow graph → ElevenLabs Conversational AI tools format
- Node types: Message, Condition, Transfer, Tool Call, End, Webhook, Email, WhatsApp

---

## 12. Payment Integrations

### Architecture

```
User wants to subscribe/buy credits
            │
            ├── Stripe (Global)
            │     stripe-routes.ts ──► stripe-service.ts
            │     Webhook: POST /api/stripe/webhook
            │
            ├── Razorpay (India)
            │     razorpay-routes.ts ──► razorpay-service.ts
            │     Webhook: POST /api/razorpay/webhook
            │
            ├── PayPal (Global)
            │     paypal-routes.ts ──► paypal-service.ts
            │     Webhook: POST /api/paypal/webhook
            │
            ├── Paystack (Africa)
            │     paystack-routes.ts ──► paystack-service.ts
            │     Webhook: POST /api/paystack/webhook
            │
            └── MercadoPago (LATAM)
                  mercadopago-routes.ts ──► mercadopago-service.ts
                  Webhook: POST /api/mercadopago/webhook
```

### Credit System
- Credits = call minutes / usage units
- `credit-service.ts` (19KB) — deduct credits per call duration
- `credit-backfill-monitor.ts` (21KB) — detect and repair missing deductions
- Admin: bulk top-up; Users: purchase credit packages via any gateway
- `membership-service.ts` (14KB) — plan features, limits, renewal

---

## 13. Webhooks System

### Inbound Webhooks (External Systems → Zonvo)

| Source | Endpoint | Handler File |
|--------|----------|-------------|
| ElevenLabs post-call | `/api/webhooks/elevenlabs/:id/post-call` | `webhook-routes.ts` |
| ElevenLabs tool call | `/api/webhooks/elevenlabs/:id/tool-*` | `webhook-routes.ts` |
| Twilio call events | `/api/twilio/*` | `twilio.ts` |
| Stripe payment | `/api/stripe/webhook` | `stripe-routes.ts` |
| Razorpay payment | `/api/razorpay/webhook` | `razorpay-routes.ts` |
| PayPal payment | `/api/paypal/webhook` | `paypal-routes.ts` |
| Paystack payment | `/api/paystack/webhook` | `paystack-routes.ts` |
| MercadoPago | `/api/mercadopago/webhook` | `mercadopago-routes.ts` |
| Meta WhatsApp | `/api/webhooks/messaging/meta/webhook` | Messaging Plugin |
| SIP Events | `/api/openai-sip/webhook` | SIP Plugin |
| Plivo WhatsApp voice | `/api/plivo/whatsapp/answer` | `engines/plivo` |
| Plivo WhatsApp message | `/api/plivo/whatsapp/message` | `engines/plivo` |

### Outbound Webhooks (Zonvo → User's System)
- Users configure webhook URLs per agent in Settings
- `webhook-delivery.ts` (10KB) — HTTP POST with timeout + retry
- `webhook-retry-service.ts` (8KB) — exponential backoff retry queue
- `user-webhook-routes.ts` — CRUD + test endpoint for webhooks
- Delivery logs stored in `webhook_deliveries` table

### Webhook Security
- `webhookValidation.ts` — HMAC-SHA256 signature verification
- Headers: `X-ElevenLabs-Signature`, `X-Zonvo-Signature`
- Raw body preserved for signature validation

---

## 14. Security & Middleware

### Authentication Layers

```
HTTP Request
    │
    ├── Cookie Session Auth (main web app users)
    │     middleware/auth.ts
    │     Passport.js LocalStrategy
    │     JWT stored in httpOnly cookie
    │
    ├── JWT Bearer Auth (REST API plugin users)
    │     middleware/hybrid-auth.ts
    │     Authorization: Bearer <token>
    │
    ├── Admin Auth (super admin panel)
    │     middleware/admin-auth.ts
    │     Separate admin session
    │
    └── Team Member Auth (team management plugin)
          Team member session cookie
          Section-level RBAC enforcement
```

### Security Stack
| Layer | Tool | Purpose |
|-------|------|---------|
| Headers | `helmet()` | XSS, HSTS, CSP headers |
| Compression | `compression()` | Gzip (level 6, threshold 1KB) |
| Rate Limiting | `rateLimiter.ts` | Per-IP/user rate limits |
| Session | `express-session` | Server-side sessions (PG store) |
| Cookies | `cookie-parser` | Secure httpOnly cookies |
| Validation | `zod` | Input schema validation |
| CORS | Express CORS | Origin whitelist |

---

## 15. Environment Variables

### Required for Startup

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname
PGHOST=localhost
PGPORT=5432
PGUSER=zonvo_ai
PGPASSWORD=secure_password
PGDATABASE=zonvo_ai

# Application
NODE_ENV=production
PORT=5000
APP_URL=https://yourdomain.com

# Security (auto-generated by: npm run setup)
SESSION_SECRET=<64-char random string>
JWT_SECRET=<64-char random string>

# Twilio (telephony)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# ElevenLabs (primary AI engine)
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Stripe (payment — minimum one gateway required)
STRIPE_SECRET_KEY=sk_live_xxxxxx
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxxx

# SMTP (for OTP verification emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
```

### Optional Variables

```bash
# BullMQ / Redis (distributed mode)
ENABLE_BULLMQ=false
REDIS_URL=redis://localhost:6379
BULLMQ_MAX_CONCURRENT_CALLS=10
BULLMQ_STUCK_CAMPAIGN_MAX_AGE_MS=1800000

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# PayPal
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx

# Paystack
PAYSTACK_SECRET_KEY=sk_live_xxx

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=xxx

# Sarvam AI
SARVAM_API_KEY=sk_sif_xxx

# Deepgram (Custom Voice Engine)
DEEPGRAM_API_KEY=xxx

# OpenAI (SIP plugin + Twilio-OpenAI engine)
OPENAI_API_KEY=sk-xxx

# FreeSWITCH (Custom Voice Engine)
FREESWITCH_ESL_HOST=127.0.0.1
FREESWITCH_ESL_PORT=8021
FREESWITCH_ESL_PASSWORD=ClueCon

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# OpenRouter (Custom Voice Engine)
OPENROUTER_API_KEY=xxx

# Custom Voice Engine Recording Storage
VE_RECORDING_S3_BUCKET=xxx
VE_RECORDING_S3_REGION=us-east-1
VE_RECORDING_R2_ACCOUNT_ID=xxx
VE_RECORDING_R2_BUCKET=xxx
```

---

## 16. Deployment

### Production Setup

```bash
# 1. Clone and install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Fill in all required values

# 3. Database setup
npm run db:push        # Create/update tables
npm run db:seed        # Seed initial data

# 4. Build for production
npm run build

# 5. Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### PM2 Configuration (`ecosystem.config.cjs`)
```
Process name : zonvo-app
Port         : 3000
Mode         : fork / cluster
Auto-restart : on-failure
Log file     : logs/zonvo-app.log
```

### Build Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (tsx + Vite HMR) |
| `npm run build` | Production build (Vite frontend + esbuild backend) |
| `npm run start` | Production start (`node dist/index.js`) |
| `npm run db:push` | Apply schema changes to DB |
| `npm run db:migrate` | Run safe incremental migrations |
| `npm run db:generate` | Generate new migration files |
| `npm run db:seed` | Seed all initial data |
| `npm run check` | TypeScript type check |

### Build Output Structure
```
dist/
├── index.js         # Compiled Express server (esbuild, ESM)
└── public/          # Compiled React SPA (Vite)
    ├── index.html
    └── assets/
        ├── *.js     # JS chunks
        └── *.css    # CSS bundles
```

### Nginx Setup (Reverse Proxy)
```nginx
server {
    listen 80;
    server_name app.zonvo.tech;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";  # WebSocket support
        proxy_set_header Host $host;
    }
}
```

---

## Summary Stats

| Metric | Value |
|--------|-------|
| App Name | `zonvo-ai` |
| Version | 5.4.1 |
| Backend Route Files | 36 |
| Backend Service Files | 57 |
| Frontend Pages | 48 |
| Frontend Components | 42+ |
| DB Tables (core schema) | 40+ |
| DB Tables (plugins) | 20+ |
| Plugins | 5 |
| API Endpoints (approx) | 200+ |
| Payment Gateways | 5 |
| Telephony Providers | 13+ SIP + Twilio + Plivo |
| AI Voice Providers | ElevenLabs, Sarvam, Deepgram, OpenAI |
| LLM Providers | OpenAI GPT-4o-mini, OpenRouter |
| i18n Languages | Multi-language (RTL + LTR support) |


*Generated: July 2026 | Zonvo AI v5.4.1 | Brand: Aiclex Solutions Pvt. Ltd.*
