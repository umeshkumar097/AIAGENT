/**
 * Custom API lookups: one `api_<name>` tool per `config.actions.apiTools[]` entry.
 * Placeholders `{{param}}` are URL-encoded in the URL and JSON-escaped in the POST body;
 * every request passes the SSRF guard, is https-only, times out, and the response is capped
 * at 8 KB. Header values are never logged.
 */
import type { AgentApiTool } from '@shared/schema';
import { logger } from '../../utils/logger';
import { validateWebhookUrl } from '../../utils/url-validator';
import type { CallTool, CallToolResult } from '../call-messaging-tools';
import type { CallActionContext } from './types';

const SOURCE = 'CallActions';
const NAME_RE = /^[a-z0-9_]{2,30}$/;
const PLACEHOLDER_RE = /\{\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/g;
const MAX_RESPONSE_BYTES = 8 * 1024;
const MAX_MODEL_CHARS = 1500;
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_TIMEOUT_MS = 12000;

export interface ApiToolRunResult { ok: boolean; message: string; status?: number; error?: string }

type Values = Record<string, string | number>;

/** Coerce the model's / tester's values to the declared params; error names the first missing/invalid one. */
export function coerceParams(tool: AgentApiTool, values: Record<string, unknown>): { values: Values } | { error: string } {
  const out: Values = {};
  for (const p of tool.params || []) {
    const raw = values?.[p.name];
    const empty = raw == null || (typeof raw === 'string' && raw.trim() === '');
    if (empty) {
      if (p.required) return { error: `Missing required parameter "${p.name}".` };
      continue;
    }
    if (p.type === 'number') {
      const n = typeof raw === 'number' ? raw : Number(String(raw).trim());
      if (!Number.isFinite(n)) return { error: `Parameter "${p.name}" must be a number.` };
      out[p.name] = n;
    } else {
      out[p.name] = String(raw).trim().substring(0, 500);
    }
  }
  return { values: out };
}

/** Replace `{{name}}` with `encode(value)`; unknown names become ''. Returns the names used. */
export function substitute(template: string, values: Values, encode: (v: string) => string): { text: string; used: Set<string> } {
  const used = new Set<string>();
  const text = template.replace(PLACEHOLDER_RE, (_m, name: string) => {
    used.add(name);
    return values[name] === undefined ? '' : encode(String(values[name]));
  });
  return { text, used };
}

const jsonEscape = (v: string): string => JSON.stringify(v).slice(1, -1);

/** Walk a dot path ("data.items.0.name") into a parsed JSON value. */
export function pickPath(value: unknown, path: string | undefined): unknown {
  const parts = (path || '').split('.').map(s => s.trim()).filter(Boolean);
  let cur: unknown = value;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (total < MAX_RESPONSE_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.length;
    }
  } finally {
    reader.cancel().catch(() => {});
  }
  return Buffer.concat(chunks).toString('utf8').substring(0, MAX_RESPONSE_BYTES);
}

function compact(text: string, responsePath?: string): string {
  let parsed: unknown;
  try { parsed = JSON.parse(text); } catch { return text.replace(/\s+/g, ' ').trim().substring(0, MAX_MODEL_CHARS); }
  const picked = responsePath ? pickPath(parsed, responsePath) : parsed;
  const out = picked === undefined ? 'null' : (typeof picked === 'string' ? picked : JSON.stringify(picked));
  return out.length > MAX_MODEL_CHARS ? out.substring(0, MAX_MODEL_CHARS) + '…' : out;
}

/** Run one API tool with concrete values. Never throws; never logs URL values or headers. */
export async function runApiTool(tool: AgentApiTool, rawValues: Record<string, unknown>): Promise<ApiToolRunResult> {
  const coerced = coerceParams(tool, rawValues);
  if ('error' in coerced) return { ok: false, message: coerced.error, error: coerced.error };
  const values = coerced.values;

  const method = tool.method === 'POST' ? 'POST' : 'GET';
  const { text: urlText, used } = substitute(String(tool.url || ''), values, encodeURIComponent);
  if (!/^https:\/\//i.test(urlText)) return { ok: false, message: 'Only https URLs are allowed.', error: 'Only https URLs are allowed.' };
  let url: URL;
  try { url = new URL(urlText); } catch { return { ok: false, message: 'Invalid URL.', error: 'Invalid URL.' }; }
  const guard = await validateWebhookUrl(url.toString());
  if (!guard.valid) return { ok: false, message: guard.error || 'URL not allowed.', error: guard.error || 'URL not allowed.' };

  const headers: Record<string, string> = { Accept: 'application/json, text/plain;q=0.8' };
  for (const [k, v] of Object.entries(tool.headers || {})) if (/^[A-Za-z0-9-]{1,64}$/.test(k)) headers[k] = String(v);

  let body: string | undefined;
  if (method === 'GET') {
    for (const [k, v] of Object.entries(values)) if (!used.has(k)) url.searchParams.set(k, String(v));
  } else {
    const template = String(tool.bodyTemplate || '').trim();
    body = template ? substitute(template, values, jsonEscape).text : JSON.stringify(values);
    if (!Object.keys(headers).some(h => h.toLowerCase() === 'content-type')) headers['Content-Type'] = 'application/json';
  }

  const timeoutMs = Math.min(Math.max(1000, tool.timeoutMs || DEFAULT_TIMEOUT_MS), MAX_TIMEOUT_MS);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const started = Date.now();
  try {
    const res = await fetch(url.toString(), { method, headers, body, signal: ctrl.signal, redirect: 'manual' });
    const text = await readCapped(res);
    const message = compact(text, tool.responsePath);
    logger.info(`[CallActions] api_${tool.name} ${method} ${url.host} → ${res.status} (${Date.now() - started}ms, ${text.length}B)`, undefined, SOURCE);
    if (!res.ok) return { ok: false, status: res.status, message, error: `HTTP ${res.status}` };
    return { ok: true, status: res.status, message };
  } catch (e: any) {
    const timedOut = e?.name === 'AbortError';
    const error = timedOut ? `Timed out after ${timeoutMs} ms` : `Request failed: ${e?.message || 'unknown error'}`;
    logger.warn(`[CallActions] api_${tool.name} ${method} ${url.host} failed: ${error}`, undefined, SOURCE);
    return { ok: false, message: error, error };
  } finally {
    clearTimeout(timer);
  }
}

function toCallTool(tool: AgentApiTool): CallTool {
  const properties: Record<string, unknown> = {};
  for (const p of tool.params || []) properties[p.name] = { type: p.type === 'number' ? 'number' : 'string', description: p.description || p.name };
  return {
    definition: {
      type: 'function',
      function: {
        name: `api_${tool.name}`,
        description: tool.description,
        parameters: { type: 'object', properties, required: (tool.params || []).filter(p => p.required).map(p => p.name) },
      },
    },
    handler: async (args): Promise<CallToolResult> => {
      const r = await runApiTool(tool, args);
      if (r.ok) return { success: true, message: `Result: ${r.message}. Relay only what the caller asked for, in one short sentence.` };
      return { success: false, message: `Lookup failed (${r.error}). Tell the caller you could not fetch it right now.` };
    },
  };
}

export function buildApiTools(ctx: CallActionContext): CallTool[] {
  const list = (ctx.actions.apiTools || []).filter(t => t && NAME_RE.test(String(t.name)) && /^https:\/\//i.test(String(t.url))).slice(0, 10);
  const seen = new Set<string>();
  const tools: CallTool[] = [];
  for (const t of list) {
    if (seen.has(t.name)) continue;
    seen.add(t.name);
    tools.push(toCallTool(t));
  }
  return tools;
}
