/**
 * Agent Builder — "actions on calls" types, defaults and the mapping between
 * the builder form and `agents.config.actions` (see shared/schema.ts AgentActionsConfig).
 */
import { apiRequest } from "@/lib/queryClient";

export type ApiToolMethod = 'GET' | 'POST';
export type ApiToolParamType = 'string' | 'number';

export interface AgentApiToolParam {
  name: string;
  type: ApiToolParamType;
  description: string;
  required: boolean;
}

/** Mirrors the server's AgentApiTool — one user-defined endpoint the agent may call as `api_<name>`. */
export interface AgentApiTool {
  id: string;
  name: string;
  description: string;
  url: string;
  method: ApiToolMethod;
  headers?: Record<string, string>;
  params: AgentApiToolParam[];
  bodyTemplate?: string;
  responsePath?: string;
  timeoutMs?: number;
}

export interface LeadField { key: string; label: string; required: boolean }

export interface AppointmentsForm {
  durationMinutes: number;
  timeZone: string;
  workingStart: string;
  workingEnd: string;
  workingDays: number[];
  confirmVia: string[];
  serviceName: string;
}

/** What an outbound call does when an answering machine picks up (Plivo AMD). */
export type VoicemailAction = 'hangup' | 'leave_message';
export interface VoicemailForm { action: VoicemailAction; message: string }
export const VOICEMAIL_MESSAGE_MAX = 400;

/** Owner alert after a call: which outcomes trigger it and where it goes. */
export const OWNER_ALERT_TRIGGERS = ['interested', 'appointment_booked', 'callback_requested', 'transferred', 'do_not_call', 'all'] as const;
export type OwnerAlertTrigger = typeof OWNER_ALERT_TRIGGERS[number];
/** Field keys a WhatsApp template variable can map to; anything else is sent as `text:<fixed>`. */
export const OWNER_ALERT_FIELDS = [
  'caller_name', 'caller_phone', 'outcome', 'summary', 'appointment', 'callback', 'agent_name', 'call_time', 'duration', 'call_link',
] as const;
export type OwnerAlertField = typeof OWNER_ALERT_FIELDS[number];
export interface OwnerAlertsForm {
  enabled: boolean;
  triggers: OwnerAlertTrigger[];
  email: string;
  whatsappPhone: string;
  whatsappTemplate: string;
  /** "1".."n" → field key or `text:<fixed>` */
  whatsappVariables: Record<string, string>;
}

export interface AgentActionsForm {
  appointments: AppointmentsForm;
  saveLeadEnabled: boolean;
  saveLeadFields: LeadField[];
  callbackEnabled: boolean;
  callbackMaxDaysAhead: number;
  apiTools: AgentApiTool[];
  voicemail: VoicemailForm;
  ownerAlerts: OwnerAlertsForm;
}

/** Server-side shape stored in agents.config.actions. */
export interface AgentActionsConfig {
  appointments?: {
    durationMinutes: number;
    timeZone: string;
    workingHours: { start: string; end: string };
    workingDays: number[];
    confirmVia: Array<'whatsapp' | 'email'>;
    serviceName?: string;
  };
  saveLead?: { fields: LeadField[] };
  callback?: { enabled: boolean; maxDaysAhead: number };
  apiTools?: AgentApiTool[];
  voicemail?: { action: VoicemailAction; message?: string };
  ownerAlerts?: {
    enabled: boolean;
    triggers: OwnerAlertTrigger[];
    email?: string;
    whatsappPhone?: string;
    whatsappTemplate?: string;
    whatsappVariables?: Record<string, string>;
  };
}

export const MAX_API_TOOLS = 10;
export const MAX_API_TOOL_PARAMS = 10;
export const MAX_LEAD_FIELDS = 8;
export const API_TOOL_NAME_RE = /^[a-z0-9_]{2,30}$/;
export const PARAM_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;
export const LEAD_KEY_RE = /^[a-z][a-z0-9_]{0,29}$/;
export const HHMM_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
export const DEFAULT_TIME_ZONE = 'Asia/Kolkata';
export const APPOINTMENT_DURATIONS = [15, 20, 30, 45, 60, 90, 120] as const;
export const TIME_ZONES = [
  'Asia/Kolkata', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Dhaka', 'Asia/Kathmandu', 'Asia/Colombo',
  'Asia/Singapore', 'Asia/Kuala_Lumpur', 'Asia/Riyadh', 'Europe/London', 'Europe/Berlin',
  'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Australia/Sydney',
] as const;

export function defaultAppointments(): AppointmentsForm {
  return {
    durationMinutes: 30, timeZone: DEFAULT_TIME_ZONE, workingStart: '09:00', workingEnd: '18:00',
    workingDays: [1, 2, 3, 4, 5, 6], confirmVia: [], serviceName: '',
  };
}

export function defaultOwnerAlerts(): OwnerAlertsForm {
  return {
    enabled: false, triggers: ['interested', 'appointment_booked', 'callback_requested'],
    email: '', whatsappPhone: '', whatsappTemplate: '', whatsappVariables: {},
  };
}

export function defaultActionsForm(): AgentActionsForm {
  return {
    appointments: defaultAppointments(),
    saveLeadEnabled: false,
    saveLeadFields: [],
    callbackEnabled: false,
    callbackMaxDaysAhead: 7,
    apiTools: [],
    voicemail: { action: 'hangup', message: '' },
    ownerAlerts: defaultOwnerAlerts(),
  };
}

function readOwnerAlerts(raw: AgentActionsConfig['ownerAlerts']): OwnerAlertsForm {
  const out = defaultOwnerAlerts();
  if (!raw || typeof raw !== 'object') return out;
  out.enabled = raw.enabled === true;
  if (Array.isArray(raw.triggers)) {
    const valid = raw.triggers.filter((x): x is OwnerAlertTrigger => (OWNER_ALERT_TRIGGERS as readonly string[]).includes(x));
    if (valid.length > 0) out.triggers = valid;
  }
  out.email = typeof raw.email === 'string' ? raw.email : '';
  out.whatsappPhone = typeof raw.whatsappPhone === 'string' ? raw.whatsappPhone : '';
  out.whatsappTemplate = typeof raw.whatsappTemplate === 'string' ? raw.whatsappTemplate : '';
  if (raw.whatsappVariables && typeof raw.whatsappVariables === 'object') {
    for (const [k, v] of Object.entries(raw.whatsappVariables)) {
      if (/^\d+$/.test(k) && typeof v === 'string') out.whatsappVariables[k] = v;
    }
  }
  return out;
}

const isHHMM = (v: unknown): v is string => typeof v === 'string' && HHMM_RE.test(v);

function readLeadFields(raw: unknown): LeadField[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((f): f is Record<string, unknown> => !!f && typeof f === 'object' && typeof f.key === 'string')
    .slice(0, MAX_LEAD_FIELDS)
    .map(f => ({ key: String(f.key), label: typeof f.label === 'string' ? f.label : String(f.key), required: f.required === true }));
}

function readApiTools(raw: unknown): AgentApiTool[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is Record<string, unknown> => !!t && typeof t === 'object' && typeof t.name === 'string' && typeof t.url === 'string')
    .slice(0, MAX_API_TOOLS)
    .map((t, i) => ({
      id: typeof t.id === 'string' && t.id ? t.id : `tool_${i}`,
      name: String(t.name),
      description: typeof t.description === 'string' ? t.description : '',
      url: String(t.url),
      method: t.method === 'POST' ? 'POST' : 'GET',
      headers: t.headers && typeof t.headers === 'object' ? (t.headers as Record<string, string>) : undefined,
      params: Array.isArray(t.params)
        ? (t.params as Array<Record<string, unknown>>).slice(0, MAX_API_TOOL_PARAMS).map(p => ({
          name: String(p.name ?? ''), type: p.type === 'number' ? 'number' : 'string',
          description: typeof p.description === 'string' ? p.description : '', required: p.required === true,
        }))
        : [],
      bodyTemplate: typeof t.bodyTemplate === 'string' ? t.bodyTemplate : undefined,
      responsePath: typeof t.responsePath === 'string' ? t.responsePath : undefined,
      timeoutMs: typeof t.timeoutMs === 'number' ? t.timeoutMs : undefined,
    }));
}

/** Tolerant read of agents.config.actions — missing/malformed parts fall back to defaults. */
export function actionsFromConfig(raw: unknown): AgentActionsForm {
  const out = defaultActionsForm();
  if (!raw || typeof raw !== 'object') return out;
  const cfg = raw as AgentActionsConfig;
  const ap = cfg.appointments;
  if (ap && typeof ap === 'object') {
    out.appointments = {
      durationMinutes: typeof ap.durationMinutes === 'number' && ap.durationMinutes > 0 ? ap.durationMinutes : 30,
      timeZone: typeof ap.timeZone === 'string' && ap.timeZone ? ap.timeZone : DEFAULT_TIME_ZONE,
      workingStart: isHHMM(ap.workingHours?.start) ? ap.workingHours.start : '09:00',
      workingEnd: isHHMM(ap.workingHours?.end) ? ap.workingHours.end : '18:00',
      workingDays: Array.isArray(ap.workingDays) ? ap.workingDays.filter(d => Number.isInteger(d) && d >= 0 && d <= 6) : [1, 2, 3, 4, 5, 6],
      confirmVia: Array.isArray(ap.confirmVia) ? ap.confirmVia.filter(c => c === 'whatsapp' || c === 'email') : [],
      serviceName: typeof ap.serviceName === 'string' ? ap.serviceName : '',
    };
  }
  if (cfg.saveLead && typeof cfg.saveLead === 'object') {
    out.saveLeadEnabled = true;
    out.saveLeadFields = readLeadFields(cfg.saveLead.fields);
  }
  if (cfg.callback && typeof cfg.callback === 'object') {
    out.callbackEnabled = cfg.callback.enabled === true;
    const d = cfg.callback.maxDaysAhead;
    out.callbackMaxDaysAhead = typeof d === 'number' && d >= 1 && d <= 60 ? d : 7;
  }
  out.apiTools = readApiTools(cfg.apiTools);
  if (cfg.voicemail && typeof cfg.voicemail === 'object') {
    out.voicemail = {
      action: cfg.voicemail.action === 'leave_message' ? 'leave_message' : 'hangup',
      message: typeof cfg.voicemail.message === 'string' ? cfg.voicemail.message : '',
    };
  }
  out.ownerAlerts = readOwnerAlerts(cfg.ownerAlerts);
  return out;
}

/** Complete `config.actions` object for the payload — the server replaces the previous one. */
export function actionsToConfig(form: AgentActionsForm): AgentActionsConfig {
  const ap = form.appointments;
  return {
    appointments: {
      durationMinutes: ap.durationMinutes,
      timeZone: ap.timeZone,
      workingHours: { start: ap.workingStart, end: ap.workingEnd },
      workingDays: [...ap.workingDays].sort((a, b) => a - b),
      confirmVia: ap.confirmVia.filter((c): c is 'whatsapp' | 'email' => c === 'whatsapp' || c === 'email'),
      serviceName: ap.serviceName.trim() || undefined,
    },
    saveLead: form.saveLeadEnabled
      ? { fields: form.saveLeadFields.map(f => ({ key: f.key.trim(), label: f.label.trim() || f.key.trim(), required: f.required })) }
      : undefined,
    callback: { enabled: form.callbackEnabled, maxDaysAhead: form.callbackMaxDaysAhead },
    apiTools: form.apiTools,
    voicemail: form.voicemail.action === 'leave_message'
      ? { action: 'leave_message', message: form.voicemail.message.trim().slice(0, VOICEMAIL_MESSAGE_MAX) }
      : { action: 'hangup' },
    ownerAlerts: ownerAlertsToConfig(form.ownerAlerts),
  };
}

function ownerAlertsToConfig(a: OwnerAlertsForm): NonNullable<AgentActionsConfig['ownerAlerts']> {
  const variables: Record<string, string> = {};
  for (const [k, v] of Object.entries(a.whatsappVariables)) if (v.trim()) variables[k] = v.trim();
  return {
    enabled: a.enabled,
    triggers: a.triggers.length ? a.triggers : ['all'],
    email: a.email.trim() || undefined,
    whatsappPhone: a.whatsappPhone.trim() || undefined,
    whatsappTemplate: a.whatsappPhone.trim() && a.whatsappTemplate ? a.whatsappTemplate : undefined,
    whatsappVariables: a.whatsappPhone.trim() && a.whatsappTemplate && Object.keys(variables).length ? variables : undefined,
  };
}

/** Human summary for the builder's Summary card, e.g. ["Transfer", "Appointments", "2 API lookups"]. */
export function enabledActionLabels(
  form: AgentActionsForm, flags: { transferEnabled: boolean; appointmentBookingEnabled: boolean },
  labels: { transfer: string; appointments: string; saveLead: string; callbacks: string; apiTools: (n: number) => string },
): string[] {
  const out: string[] = [];
  if (flags.transferEnabled) out.push(labels.transfer);
  if (flags.appointmentBookingEnabled) out.push(labels.appointments);
  if (form.saveLeadEnabled) out.push(labels.saveLead);
  if (form.callbackEnabled) out.push(labels.callbacks);
  if (form.apiTools.length > 0) out.push(labels.apiTools(form.apiTools.length));
  return out;
}

export interface ApiToolTestResult { ok: boolean; message: string; status?: number; error?: string }

/** Runs one custom API tool once with sample values (owner-only route). */
export async function testApiTool(tool: AgentApiTool, values: Record<string, string | number>): Promise<ApiToolTestResult> {
  const res = await apiRequest("POST", "/api/agents/tools/test", { tool, values });
  return res.json();
}
