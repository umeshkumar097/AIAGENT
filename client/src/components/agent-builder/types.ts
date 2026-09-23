/**
 * Agent Builder — shared types, constants and payload mapping.
 * Plivo-only builder: Sarvam (Indian voices) is the primary engine,
 * OpenAI Realtime on Plivo is the secondary option.
 */

export type BuilderEngine = 'sarvam-plivo' | 'plivo';

/** One positional WhatsApp body variable ({{1}}…{{n}}): collected from the caller or a fixed value. */
export type WhatsappVariableMode = 'collect' | 'fixed';
export interface WhatsappVariable { mode: WhatsappVariableMode; value: string }
/** Keys "1".."n" for one template. */
export type WhatsappTemplateVariables = Record<string, WhatsappVariable>;
/** Keyed by template name — the format stored in agents.messagingWhatsappVariables. */
export type WhatsappVariablesByTemplate = Record<string, WhatsappTemplateVariables>;
export const MAX_WHATSAPP_VARIABLES = 10;

export interface AgentBuilderForm {
  name: string;
  purpose: string;
  engine: BuilderEngine;
  language: string;
  voice: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  firstMessage: string;
  transferEnabled: boolean;
  transferPhoneNumber: string;
  endConversationEnabled: boolean;
  detectLanguageEnabled: boolean;
  knowledgeBaseIds: string[];
  phoneNumberId: string;
  /** Engine follows the chosen language until the user picks one explicitly. */
  engineAuto: boolean;
  messagingEmailEnabled: boolean;
  messagingWhatsappEnabled: boolean;
  /** Templates the agent may pick at runtime; empty = any active/approved template. */
  messagingEmailTemplates: string[];
  messagingWhatsappTemplates: string[];
  messagingWhatsappVariables: WhatsappVariablesByTemplate;
}

export interface BuilderAgent {
  id: string;
  name: string;
  type: string;
  telephonyProvider: string | null;
  language: string | null;
  openaiVoice: string | null;
  llmModel: string | null;
  temperature: number | null;
  systemPrompt: string | null;
  firstMessage: string | null;
  transferEnabled: boolean | null;
  transferPhoneNumber: string | null;
  endConversationEnabled: boolean | null;
  detectLanguageEnabled: boolean | null;
  knowledgeBaseIds: string[] | null;
  messagingEmailEnabled?: boolean | null;
  messagingWhatsappEnabled?: boolean | null;
  /** Legacy single-template columns (kept in sync with the first list entry). */
  messagingEmailTemplate?: string | null;
  messagingWhatsappTemplate?: string | null;
  messagingEmailTemplates?: string[] | null;
  messagingWhatsappTemplates?: string[] | null;
  /** JSON text — new keyed format or the legacy flat map (see parseWhatsappVariables). */
  messagingWhatsappVariables?: string | null;
}

export const DEFAULT_SARVAM_VOICE = 'priya';
export const DEFAULT_OPENAI_VOICE = 'alloy';
export const DEFAULT_CHAT_MODEL = 'gpt-4o-mini';
export const DEFAULT_REALTIME_MODEL = 'gpt-realtime-1.5';

/** Languages Sarvam bulbul:v3 / saaras support (codes match the rest of the app). */
export const SARVAM_LANGUAGES = [
  { code: 'hi', label: 'Hindi / Hinglish', native: 'हिन्दी' },
  { code: 'en', label: 'English (India)', native: 'English' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'od', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
] as const;

export const SARVAM_LANG_CODES: ReadonlySet<string> = new Set(SARVAM_LANGUAGES.map(l => l.code));

/** Indian languages → Sarvam, everything else → OpenAI Realtime (subject to what the admin enabled). */
export function engineForLanguage(code: string, sarvamEnabled: boolean, plivoEnabled: boolean): BuilderEngine {
  if (SARVAM_LANG_CODES.has(code) && sarvamEnabled) return 'sarvam-plivo';
  if (plivoEnabled) return 'plivo';
  return 'sarvam-plivo';
}

export function engineDefaults(engine: BuilderEngine): Pick<AgentBuilderForm, 'voice' | 'model'> {
  return engine === 'sarvam-plivo'
    ? { voice: DEFAULT_SARVAM_VOICE, model: DEFAULT_CHAT_MODEL }
    : { voice: DEFAULT_OPENAI_VOICE, model: DEFAULT_REALTIME_MODEL };
}

/** Sarvam preview API expects the language *name*, not the code. */
export const SARVAM_PREVIEW_LANGUAGE: Record<string, string> = {
  hi: 'Hindi', ta: 'Tamil', te: 'Telugu', kn: 'Kannada', mr: 'Marathi',
};

export interface PurposePreset {
  id: string;
  systemPrompt: string;
  firstMessage: { en: string; hi: string };
}

/** Starting points — the user edits the prompt afterwards. */
export const PURPOSES: PurposePreset[] = [
  {
    id: 'support',
    systemPrompt:
      'You are a customer support agent for {{company_name}}.\n' +
      '- Greet the caller and find out what they need\n' +
      '- Answer questions about products, orders and services clearly\n' +
      '- If you cannot resolve the issue, offer to transfer or take a message\n' +
      'Be patient, calm and helpful. Keep answers short — this is a phone call.',
    firstMessage: {
      en: 'Hi, thanks for calling {{company_name}}. How can I help you today?',
      hi: 'नमस्ते, {{company_name}} में कॉल करने के लिए धन्यवाद। मैं आपकी कैसे मदद कर सकती हूँ?',
    },
  },
  {
    id: 'sales',
    systemPrompt:
      'You are a sales assistant for {{company_name}}.\n' +
      '- Understand what the caller is looking for and their budget\n' +
      '- Explain the relevant offer in simple words\n' +
      '- Ask for a good time for a follow-up or book a demo\n' +
      'Be friendly and confident, never pushy. One question at a time.',
    firstMessage: {
      en: 'Hello, this is {{agent_name}} from {{company_name}}. Do you have a minute to talk?',
      hi: 'नमस्ते, मैं {{company_name}} से {{agent_name}} बोल रही हूँ। क्या आपके पास एक मिनट है?',
    },
  },
  {
    id: 'appointment',
    systemPrompt:
      'You are an appointment booking assistant for {{company_name}}.\n' +
      '- Ask for the caller\'s name and the service they want\n' +
      '- Offer available dates and times and confirm the choice\n' +
      '- Repeat the final date, time and details back to the caller\n' +
      'Be efficient and clear. Confirm every detail before ending.',
    firstMessage: {
      en: 'Hi, this is {{company_name}}. I can help you book an appointment. May I have your name?',
      hi: 'नमस्ते, {{company_name}} से बोल रही हूँ। मैं आपका appointment book कर सकती हूँ। आपका नाम क्या है?',
    },
  },
  {
    id: 'reminder',
    systemPrompt:
      'You are calling on behalf of {{company_name}} to remind the customer about their upcoming appointment or payment.\n' +
      '- State the reminder clearly (date, time or amount)\n' +
      '- Ask them to confirm, reschedule or ask a question\n' +
      '- Thank them and end the call politely\n' +
      'Keep it under one minute.',
    firstMessage: {
      en: 'Hello, this is a reminder call from {{company_name}}. Is this a good time?',
      hi: 'नमस्ते, ये {{company_name}} की तरफ़ से एक reminder call है। क्या अभी बात करना ठीक रहेगा?',
    },
  },
  { id: 'custom', systemPrompt: '', firstMessage: { en: '', hi: '' } },
];

export function defaultForm(): AgentBuilderForm {
  return {
    name: '',
    purpose: '',
    engine: 'sarvam-plivo',
    language: 'hi',
    voice: DEFAULT_SARVAM_VOICE,
    model: DEFAULT_CHAT_MODEL,
    temperature: 0.5,
    systemPrompt: '',
    firstMessage: '',
    transferEnabled: false,
    transferPhoneNumber: '',
    endConversationEnabled: true,
    detectLanguageEnabled: false,
    knowledgeBaseIds: [],
    phoneNumberId: '',
    engineAuto: true,
    messagingEmailEnabled: false,
    messagingWhatsappEnabled: false,
    messagingEmailTemplates: [],
    messagingWhatsappTemplates: [],
    messagingWhatsappVariables: {},
  };
}

const LEGACY_VAR_KEY = /^(\d+|btn_.*|header_value)$/;

function normaliseVariable(raw: unknown): WhatsappVariable {
  if (typeof raw === 'string') return { mode: 'collect', value: raw };
  if (raw && typeof raw === 'object') {
    const v = raw as { mode?: unknown; value?: unknown };
    return {
      mode: v.mode === 'fixed' ? 'fixed' : 'collect',
      value: typeof v.value === 'string' ? v.value : '',
    };
  }
  return { mode: 'collect', value: '' };
}

/** Keep only positional body variables ("1".."n"), normalised. */
function normaliseTemplateVariables(raw: unknown): WhatsappTemplateVariables {
  const out: WhatsappTemplateVariables = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!/^\d+$/.test(key)) continue;
    const idx = Number(key);
    if (idx < 1 || idx > MAX_WHATSAPP_VARIABLES) continue;
    out[key] = normaliseVariable(value);
  }
  return out;
}

/**
 * Parse agents.messagingWhatsappVariables. New format: { templateName: { "1": {mode, value} } }.
 * Legacy format (old Agents dialog): a flat map for ONE template ({ "1": …, "btn_0": …, "header_value": … })
 * — attributed to `legacyTemplateName` (messagingWhatsappTemplate).
 */
export function parseWhatsappVariables(raw: string | null | undefined, legacyTemplateName?: string | null): WhatsappVariablesByTemplate {
  if (!raw || !raw.trim()) return {};
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return {}; }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  const obj = parsed as Record<string, unknown>;
  const keys = Object.keys(obj);
  if (keys.length > 0 && keys.every(k => LEGACY_VAR_KEY.test(k))) {
    if (!legacyTemplateName) return {};
    const vars = normaliseTemplateVariables(obj);
    return Object.keys(vars).length ? { [legacyTemplateName]: vars } : {};
  }
  const out: WhatsappVariablesByTemplate = {};
  for (const [name, vars] of Object.entries(obj)) {
    if (!name.trim()) continue;
    out[name] = normaliseTemplateVariables(vars);
  }
  return out;
}

/** JSON text for the payload — only the selected templates, '' when there is nothing to store. */
export function serialiseWhatsappVariables(vars: WhatsappVariablesByTemplate, selectedTemplates: string[]): string {
  const out: WhatsappVariablesByTemplate = {};
  for (const name of selectedTemplates) {
    const tv = vars[name];
    if (tv && Object.keys(tv).length > 0) out[name] = tv;
  }
  return Object.keys(out).length ? JSON.stringify(out) : '';
}

function templateList(list: string[] | null | undefined, legacy: string | null | undefined): string[] {
  if (Array.isArray(list) && list.length > 0) return list.filter(x => typeof x === 'string' && x.trim());
  return legacy && legacy.trim() ? [legacy] : [];
}

export function formFromAgent(agent: BuilderAgent, phoneNumberId = ''): AgentBuilderForm {
  const engine: BuilderEngine = agent.telephonyProvider === 'plivo' ? 'plivo' : 'sarvam-plivo';
  return {
    name: agent.name,
    purpose: 'custom',
    engine,
    language: (agent.language || 'hi').split('-')[0],
    voice: agent.openaiVoice || (engine === 'plivo' ? DEFAULT_OPENAI_VOICE : DEFAULT_SARVAM_VOICE),
    model: agent.llmModel || (engine === 'plivo' ? DEFAULT_REALTIME_MODEL : DEFAULT_CHAT_MODEL),
    temperature: agent.temperature ?? 0.5,
    systemPrompt: agent.systemPrompt || '',
    firstMessage: agent.firstMessage || '',
    transferEnabled: !!agent.transferEnabled,
    transferPhoneNumber: agent.transferPhoneNumber || '',
    endConversationEnabled: agent.endConversationEnabled ?? true,
    detectLanguageEnabled: !!agent.detectLanguageEnabled,
    knowledgeBaseIds: agent.knowledgeBaseIds || [],
    phoneNumberId,
    engineAuto: false,
    messagingEmailEnabled: !!agent.messagingEmailEnabled,
    messagingWhatsappEnabled: !!agent.messagingWhatsappEnabled,
    messagingEmailTemplates: templateList(agent.messagingEmailTemplates, agent.messagingEmailTemplate),
    messagingWhatsappTemplates: templateList(agent.messagingWhatsappTemplates, agent.messagingWhatsappTemplate),
    messagingWhatsappVariables: parseWhatsappVariables(agent.messagingWhatsappVariables, agent.messagingWhatsappTemplate),
  };
}

/** Body for POST /api/agents and PATCH /api/agents/:id. */
export function toAgentPayload(form: AgentBuilderForm) {
  return {
    type: 'incoming' as const,
    name: form.name.trim(),
    telephonyProvider: form.engine,
    language: form.language,
    openaiVoice: form.voice,
    llmModel: form.model,
    temperature: form.temperature,
    systemPrompt: form.systemPrompt.trim(),
    firstMessage: form.firstMessage.trim(),
    transferEnabled: form.transferEnabled,
    transferPhoneNumber: form.transferEnabled ? form.transferPhoneNumber.trim() : '',
    endConversationEnabled: form.endConversationEnabled,
    detectLanguageEnabled: form.detectLanguageEnabled,
    knowledgeBaseIds: form.knowledgeBaseIds,
    messagingEmailEnabled: form.messagingEmailEnabled,
    messagingWhatsappEnabled: form.messagingWhatsappEnabled,
    messagingEmailTemplates: form.messagingEmailTemplates,
    messagingWhatsappTemplates: form.messagingWhatsappTemplates,
    // Legacy single-template columns stay in sync with the first selected template
    messagingEmailTemplate: form.messagingEmailTemplates[0] || '',
    messagingWhatsappTemplate: form.messagingWhatsappTemplates[0] || '',
    messagingWhatsappVariables: serialiseWhatsappVariables(form.messagingWhatsappVariables, form.messagingWhatsappTemplates),
    // Required by the API for flow agents; harmless defaults for conversational agents
    voiceTone: 'professional',
    personality: 'helpful',
  };
}

export function validateForm(form: AgentBuilderForm): string | null {
  if (!form.name.trim()) return 'nameRequired';
  if (!form.systemPrompt.trim()) return 'promptRequired';
  if (form.transferEnabled && !form.transferPhoneNumber.trim()) return 'transferNumberRequired';
  return null;
}
