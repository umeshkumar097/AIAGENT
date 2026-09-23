/**
 * Call-time messaging tools shared by the Sarvam and OpenAI-Realtime call paths:
 * `send_whatsapp` (Waki / Meta templates) and `send_email` (platform email via the
 * user's templates). Built once per call — template lists are loaded at session
 * start and cached in the handlers. Tool names are unchanged so audio-bridge keeps working.
 */
import { db } from '../db';
import { agents, plivoCalls } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { logger } from '../utils/logger';

const SOURCE = 'CallMessagingTools';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Types ────────────────────────────────────────────────────────────────────
export interface CallToolResult { success: boolean; message: string }

export interface CallToolDefinition {
  type: 'function';
  function: { name: string; description: string; parameters: Record<string, unknown> };
}

export interface CallTool {
  definition: CallToolDefinition;
  handler: (args: Record<string, unknown>) => Promise<CallToolResult>;
}

/** One body variable ({{1}}…{{n}}) or a legacy button/header entry. */
export interface WhatsappVarSpec { mode: 'collect' | 'fixed'; value: string; componentType?: 'button' | 'header' }
/** `{ "1": spec, "2": spec }` for one template. */
export type WhatsappVarMap = Record<string, WhatsappVarSpec>;
/** `agents.messagingWhatsappVariables` parsed: keyed by template name. */
export type WhatsappTemplateVariables = Record<string, WhatsappVarMap>;

/** The messaging columns of an `agents` row (legacy single columns + the new allowed lists). */
export interface CallMessagingAgent {
  messagingEmailEnabled?: boolean | null; messagingWhatsappEnabled?: boolean | null;
  messagingEmailTemplate?: string | null; messagingWhatsappTemplate?: string | null;
  messagingWhatsappVariables?: string | null;
  messagingEmailTemplates?: string[] | null; messagingWhatsappTemplates?: string[] | null;
}

export interface BuildCallMessagingToolsOptions {
  userId: string; agentId: string; callId?: string; callUuid?: string;
  fromNumber?: string | null; toNumber?: string | null; callDirection?: string | null;
  agent: CallMessagingAgent;
}

// ── Variables JSON (new keyed format with legacy flat-map fallback) ──────────
const LEGACY_KEY = /^(\d+|btn_\d+|header_value)$/;

function normalizeVarMap(raw: unknown): WhatsappVarMap {
  const out: WhatsappVarMap = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof val === 'string') { out[key] = { mode: 'collect', value: val }; continue; }
    if (!val || typeof val !== 'object') continue;
    const v = val as { mode?: unknown; value?: unknown; componentType?: unknown };
    const value = v.value == null ? '' : String(v.value);
    if (v.componentType === 'button' || v.componentType === 'header') {
      out[key] = { mode: 'fixed', value, componentType: v.componentType };
    } else if (v.mode === 'fixed' || v.mode === 'collect') {
      out[key] = { mode: v.mode, value };
    }
  }
  return out;
}

/**
 * Parse `agents.messagingWhatsappVariables`. New format:
 * `{ "<templateName>": { "1": { mode: "collect", value: "customer name" }, "2": { mode: "fixed", value: "Aiclex" } } }`.
 * If the top-level keys look like `1`, `btn_0`, `header_value` it is the legacy flat map for `legacyTemplateName`.
 */
export function parseWhatsappVariables(raw: string | null | undefined, legacyTemplateName?: string | null): WhatsappTemplateVariables {
  if (!raw) return {};
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return {}; }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  const entries = Object.entries(parsed as Record<string, unknown>);
  if (entries.length === 0) return {};
  if (entries.some(([k]) => LEGACY_KEY.test(k))) {
    const name = (legacyTemplateName || '').trim();
    return name ? { [name]: normalizeVarMap(parsed) } : {};
  }
  const out: WhatsappTemplateVariables = {};
  for (const [name, map] of entries) {
    const normalized = normalizeVarMap(map);
    if (Object.keys(normalized).length) out[name] = normalized;
  }
  return out;
}

/** Positional body keys ("1", "2", …) of a template spec, in order. */
export function bodyVariableKeys(spec?: WhatsappVarMap): string[] {
  return Object.keys(spec || {})
    .filter(k => /^\d+$/.test(k) && !spec![k].componentType)
    .sort((a, b) => Number(a) - Number(b));
}

/** `{{1}} = customer name (collect), {{2}} = fixed` — used in tool descriptions. */
export function describeWhatsappVariables(spec?: WhatsappVarMap): string {
  const keys = bodyVariableKeys(spec);
  if (!keys.length) return 'no variables';
  return keys.map(k => (spec![k].mode === 'collect'
    ? `{{${k}}} = ${spec![k].value || 'value to collect'} (collect)`
    : `{{${k}}} = fixed`)).join(', ');
}

export interface ResolvedWhatsappVariables {
  components: Array<Record<string, unknown>>;
  /** Descriptions of the collect variables the model did not supply. */
  missing: string[];
  buttonOverrides?: Record<number, string>;
}

/**
 * Merge the stored spec with what the model supplied (`{ "1": "…" }`, legacy `var_1` accepted).
 * Fixed values win; every collect variable must be present, otherwise it is reported in `missing`.
 */
export function resolveWhatsappVariables(spec: WhatsappVarMap | undefined, provided: unknown): ResolvedWhatsappVariables {
  const given: Record<string, string> = {};
  if (provided && typeof provided === 'object' && !Array.isArray(provided)) {
    for (const [k, v] of Object.entries(provided as Record<string, unknown>)) {
      const text = v == null ? '' : String(v).trim();
      if (text) given[k.replace(/^var_/, '')] = text;
    }
  }

  const values: Record<number, string> = {};
  const missing: string[] = [];
  const keys = bodyVariableKeys(spec);
  for (const key of keys) {
    const s = spec![key];
    if (s.mode === 'fixed') values[Number(key)] = s.value;
    else if (given[key]) values[Number(key)] = given[key];
    else missing.push(s.value || `variable ${key}`);
  }
  if (keys.length === 0) {
    // No stored spec for this template: trust the model's positional values
    for (const [k, v] of Object.entries(given)) if (/^[1-9]\d*$/.test(k)) values[Number(k)] = v;
  }

  const buttonOverrides: Record<number, string> = {};
  for (const [k, s] of Object.entries(spec || {})) {
    if (s.componentType !== 'button') continue;
    const idx = k.startsWith('btn_') ? Number(k.slice(4)) : Number(k);
    if (!Number.isNaN(idx)) buttonOverrides[idx] = s.value;
  }

  // WhatsApp body parameters are positional 1..n — fill any gap with a blank
  const max = Math.max(0, ...Object.keys(values).map(Number));
  const parameters = Array.from({ length: max }, (_, i) => ({ type: 'text', text: values[i + 1] || ' ' }));
  const components: Array<Record<string, unknown>> = max > 0 ? [{ type: 'body', parameters }] : [];
  return { components, missing, buttonOverrides: Object.keys(buttonOverrides).length ? buttonOverrides : undefined };
}

// ── Small helpers ────────────────────────────────────────────────────────────
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());

/** Explicit list wins; otherwise the legacy single template; otherwise "any". */
function allowedNames(list: string[] | null | undefined, legacySingle: string | null | undefined): string[] {
  const names = (list || []).map(s => str(s)).filter(Boolean);
  if (names.length) return names;
  return str(legacySingle) ? [str(legacySingle)] : [];
}

const findByName = <T extends { name: string }>(items: T[], name: string): T | undefined =>
  items.find(t => t.name === name) || items.find(t => t.name.toLowerCase() === name.toLowerCase());

function pickPhone(explicit: string, opts: BuildCallMessagingToolsOptions): string {
  if (explicit.replace(/[^0-9]/g, '').length >= 6) return explicit;
  const dir = (opts.callDirection || '').toLowerCase();
  const caller = dir === 'inbound' || dir === 'incoming' ? opts.fromNumber : opts.toNumber;
  return caller && caller.replace(/[^0-9]/g, '').length >= 6 ? caller : '';
}

async function loadCallMetadata(callUuid?: string): Promise<Record<string, unknown>> {
  if (!callUuid) return {};
  const [row] = await db.select({ metadata: plivoCalls.metadata }).from(plivoCalls).where(eq(plivoCalls.plivoCallUuid, callUuid)).limit(1);
  return (row?.metadata as Record<string, unknown> | null) || {};
}

async function lookupCallerEmail(callUuid?: string): Promise<string> {
  try {
    const email = (await loadCallMetadata(callUuid)).callerEmail;
    return typeof email === 'string' && EMAIL_RE.test(email) ? email : '';
  } catch { return ''; }
}

async function rememberCallerEmail(callUuid: string | undefined, email: string): Promise<void> {
  if (!callUuid) return;
  try {
    const metadata = { ...(await loadCallMetadata(callUuid)), callerEmail: email };
    await db.update(plivoCalls).set({ metadata }).where(eq(plivoCalls.plivoCallUuid, callUuid));
  } catch (e: any) {
    logger.warn(`Could not store callerEmail for ${callUuid}: ${e.message}`, undefined, SOURCE);
  }
}

async function lookupAgentName(agentId: string): Promise<string> {
  try {
    const [row] = await db.select({ name: agents.name }).from(agents).where(eq(agents.id, agentId)).limit(1);
    return row?.name || '';
  } catch { return ''; }
}

// ── send_email ───────────────────────────────────────────────────────────────
async function buildEmailTool(opts: BuildCallMessagingToolsOptions): Promise<CallTool | null> {
  const { emailTemplateService } = await import('../../plugins/messaging/services/email-template.service');
  const active = (await emailTemplateService.getAll(opts.userId)).filter(t => t.isActive);
  const allowed = allowedNames(opts.agent.messagingEmailTemplates, opts.agent.messagingEmailTemplate);
  const templates = allowed.length ? active.filter(t => allowed.includes(t.name)) : active;
  if (!templates.length) {
    logger.warn(`No active email templates for agent ${opts.agentId} — send_email not added`, undefined, SOURCE);
    return null;
  }
  const names = templates.map(t => t.name);
  const knownEmail = await lookupCallerEmail(opts.callUuid);
  const agentName = await lookupAgentName(opts.agentId);
  const list = templates.map(t => `"${t.name}" (variables: ${(t.variables || []).join(', ') || 'none'})`).join('; ');
  const addressRule = knownEmail
    ? `The caller's email address is already known (${knownEmail}); recipient_email may be omitted.`
    : 'Ask the caller for their email address and repeat it back before sending.';

  return {
    definition: {
      type: 'function',
      function: {
        name: 'send_email',
        description: `Send one of the user's email templates to the caller. Templates: ${list}. ${addressRule} Fill the template variables from the conversation; agent_name is filled automatically.`,
        parameters: {
          type: 'object',
          properties: {
            template_name: { type: 'string', enum: names, description: 'Which email template to send.' },
            recipient_email: { type: 'string', description: "The caller's email address." },
            variables: {
              type: 'object',
              description: 'Values for the template variables, keyed by variable name, e.g. {"contact_name": "Rahul"}.',
              additionalProperties: { type: 'string' },
            },
          },
          required: knownEmail ? ['template_name'] : ['template_name', 'recipient_email'],
        },
      },
    },
    handler: async (args) => {
      const template = findByName(templates, str(args.template_name));
      if (!template) return { success: false, message: `Unknown template. Choose one of: ${names.join(', ')}.` };
      const to = str(args.recipient_email) || (await lookupCallerEmail(opts.callUuid)) || knownEmail;
      if (!EMAIL_RE.test(to)) return { success: false, message: 'Ask the caller for a valid email address first.' };

      const variables: Record<string, string> = {};
      for (const v of template.variables || []) variables[v] = '';
      if (agentName) variables.agent_name = agentName;
      const supplied = args.variables;
      if (supplied && typeof supplied === 'object' && !Array.isArray(supplied)) {
        for (const [k, v] of Object.entries(supplied as Record<string, unknown>)) if (v != null) variables[k] = String(v);
      }

      const result = await emailTemplateService.sendEmailByName(opts.userId, template.name, to, variables, { callId: opts.callId, agentId: opts.agentId });
      if (result.success) {
        void rememberCallerEmail(opts.callUuid, to);
        return { success: true, message: `Email "${template.name}" sent to ${to}.` };
      }
      return { success: false, message: `The email could not be sent: ${result.error || 'unknown error'}.` };
    },
  };
}

// ── send_whatsapp ────────────────────────────────────────────────────────────
async function buildWhatsappTool(opts: BuildCallMessagingToolsOptions): Promise<CallTool | null> {
  const { whatswayService } = await import('../../plugins/messaging/services/whatsway.service');
  const { metaWhatsAppService, MetaWhatsAppService } = await import('../../plugins/messaging/services/meta-whatsapp.service');
  const [waki, meta] = await Promise.all([
    whatswayService.getSettings(opts.userId).catch(() => null),
    metaWhatsAppService.getSettings(opts.userId).catch(() => null),
  ]);
  const provider: 'waki' | 'meta' | null = waki?.isActive ? 'waki' : meta?.isActive ? 'meta' : null;
  if (!provider) {
    logger.warn(`No active WhatsApp provider for user ${opts.userId} — send_whatsapp not added`, undefined, SOURCE);
    return null;
  }

  const allowed = allowedNames(opts.agent.messagingWhatsappTemplates, opts.agent.messagingWhatsappTemplate);
  const varsByTemplate = parseWhatsappVariables(opts.agent.messagingWhatsappVariables, opts.agent.messagingWhatsappTemplate);

  let available: Array<{ name: string; language: string }> = [];
  try {
    const list = provider === 'waki' ? await whatswayService.getTemplates(opts.userId) : await metaWhatsAppService.getTemplates(opts.userId);
    available = list
      .filter(t => !t.status || String(t.status).toUpperCase() === 'APPROVED')
      .map(t => ({ name: t.name, language: t.language || 'en_US' }));
  } catch (e: any) {
    logger.warn(`Could not load ${provider} templates for user ${opts.userId}: ${e.message}`, undefined, SOURCE);
    available = allowed.map(name => ({ name, language: 'en_US' }));
  }
  const templates = allowed.length ? available.filter(t => allowed.includes(t.name)) : available;
  if (!templates.length) {
    logger.warn(`No approved WhatsApp templates for agent ${opts.agentId} — send_whatsapp not added`, undefined, SOURCE);
    return null;
  }
  const names = templates.map(t => t.name);
  const list = templates.map(t => `"${t.name}": ${describeWhatsappVariables(varsByTemplate[t.name])}`).join('; ');

  return {
    definition: {
      type: 'function',
      function: {
        name: 'send_whatsapp',
        description: `Send an approved WhatsApp template to the caller. Templates and their body variables: ${list}. Collect every "collect" variable from the caller before sending; fixed ones are filled automatically. The caller's own number is used unless phone_number is given.`,
        parameters: {
          type: 'object',
          properties: {
            template_name: { type: 'string', enum: names, description: 'Which WhatsApp template to send.' },
            phone_number: { type: 'string', description: 'Recipient number with country code. Omit to send to the caller.' },
            variables: {
              type: 'object',
              description: 'Body variable values keyed by position, e.g. {"1": "Rahul", "2": "Monday 5pm"}. Only the collect variables are needed.',
              additionalProperties: { type: 'string' },
            },
          },
          required: ['template_name'],
        },
      },
    },
    handler: async (args) => {
      const template = findByName(templates, str(args.template_name));
      if (!template) return { success: false, message: `Unknown template. Choose one of: ${names.join(', ')}.` };
      const phone = pickPhone(str(args.phone_number), opts);
      if (!phone) return { success: false, message: 'Could not determine the phone number. Ask the caller for it.' };

      const { components, missing, buttonOverrides } = resolveWhatsappVariables(varsByTemplate[template.name], args.variables);
      if (missing.length) return { success: false, message: `Ask the caller for: ${missing.join(', ')}.` };

      let allComponents = components;
      if (provider === 'meta') {
        try {
          const def = await metaWhatsAppService.getTemplateByName(opts.userId, template.name);
          if (def?.components) allComponents = [...components, ...MetaWhatsAppService.buildButtonComponents(def.components, buttonOverrides)];
        } catch (e: any) {
          logger.warn(`Could not fetch Meta template metadata for "${template.name}": ${e.message}`, undefined, SOURCE);
        }
      }
      const language = str(args.language) || template.language;
      const meta = { callId: opts.callId, agentId: opts.agentId };

      try {
        const sent = provider === 'waki'
          ? await whatswayService.sendTemplate(opts.userId, phone, template.name, language, allComponents, meta)
          : await metaWhatsAppService.sendTemplate(opts.userId, phone, template.name, language, allComponents, meta);
        try {
          const { whatsAppConversationService } = await import('../../plugins/messaging/services/whatsapp-conversation.service');
          const conversation = await whatsAppConversationService.getOrCreateConversation(opts.userId, phone);
          await whatsAppConversationService.addMessage({
            conversationId: conversation.id,
            userId: opts.userId,
            direction: 'outbound',
            senderType: 'agent',
            messageType: 'template',
            content: `[Template: ${template.name}]`,
            templateName: template.name,
            metaMessageId: sent?.messageId || undefined,
            status: 'sent',
            metadata: { agentId: opts.agentId, callId: opts.callId, source: 'call-tools', provider },
          });
        } catch (convError: any) {
          logger.warn(`Failed to store WhatsApp in conversations: ${convError.message}`, undefined, SOURCE);
        }
        return { success: true, message: `WhatsApp template "${template.name}" sent to ${phone}.` };
      } catch (e: any) {
        logger.error(`send_whatsapp failed: ${e.message}`, e, SOURCE);
        return { success: false, message: `The WhatsApp message could not be sent: ${e.message || 'unknown error'}.` };
      }
    },
  };
}

// ── Entry point ──────────────────────────────────────────────────────────────
/** Build the messaging tools for one call. Never throws — a failed channel is skipped and logged. */
export async function buildCallMessagingTools(opts: BuildCallMessagingToolsOptions): Promise<CallTool[]> {
  const tools: CallTool[] = [];
  const channels: Array<[boolean, string, (o: BuildCallMessagingToolsOptions) => Promise<CallTool | null>]> = [
    [!!opts.agent.messagingEmailEnabled, 'send_email', buildEmailTool],
    [!!opts.agent.messagingWhatsappEnabled, 'send_whatsapp', buildWhatsappTool],
  ];
  for (const [enabled, name, build] of channels) {
    if (!enabled) continue;
    try {
      const tool = await build(opts);
      if (tool) tools.push(tool);
    } catch (e: any) {
      logger.error(`${name} tool unavailable for agent ${opts.agentId}: ${e.message}`, e, SOURCE);
    }
  }
  if (tools.length) {
    logger.info(`Call messaging tools for agent ${opts.agentId}: ${tools.map(t => t.definition.function.name).join(', ')}`, undefined, SOURCE);
  }
  return tools;
}
