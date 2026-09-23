/**
 * Tool-call plumbing for the Sarvam bridge's chat/completions loop:
 * streamed `tool_calls` delta accumulation, handler execution with a timeout,
 * and the follow-up messages for the second streamed pass.
 */
import { logger } from '../../../utils/logger';
import type { CallTool, CallToolResult } from '../../../services/call-messaging-tools';

export const TOOL_TIMEOUT_MS = 15_000;

export interface ChatToolCall { id: string; type: 'function'; function: { name: string; arguments: string } }

/** Messages inside one streamGPTAndSpeak turn (chatHistory itself stays user/assistant text). */
export type ChatMessage =
  | { role: 'system' | 'user' | 'assistant'; content: string }
  | { role: 'assistant'; content: string | null; tool_calls: ChatToolCall[] }
  | { role: 'tool'; tool_call_id: string; content: string };

export interface StreamedToolCall { index: number; id: string; name: string; arguments: string }

export interface ExecutedToolCall { call: StreamedToolCall; result: CallToolResult }

/** Merge one streamed `delta.tool_calls` array into the per-index accumulator. */
export function accumulateToolCallDeltas(acc: Map<number, StreamedToolCall>, deltas: unknown): void {
  if (!Array.isArray(deltas)) return;
  for (const d of deltas) {
    if (!d || typeof d !== 'object') continue;
    const delta = d as { index?: number; id?: string; function?: { name?: string; arguments?: string } };
    const index = typeof delta.index === 'number' ? delta.index : acc.size;
    const cur = acc.get(index) || { index, id: '', name: '', arguments: '' };
    if (delta.id) cur.id = cur.id || delta.id;
    if (delta.function?.name) cur.name += delta.function.name;
    if (delta.function?.arguments) cur.arguments += delta.function.arguments;
    acc.set(index, cur);
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} took too long`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => { if (timer) clearTimeout(timer); });
}

/** Run every collected call in parallel; each is isolated (no throw) and capped at `timeoutMs`. */
export async function executeStreamedToolCalls(
  callUuid: string,
  calls: StreamedToolCall[],
  tools: CallTool[],
  timeoutMs = TOOL_TIMEOUT_MS
): Promise<ExecutedToolCall[]> {
  return Promise.all(calls.map(async (call): Promise<ExecutedToolCall> => {
    const tool = tools.find(t => t.definition.function.name === call.name);
    if (!tool) return { call, result: { success: false, message: `Unknown tool ${call.name}.` } };

    let args: Record<string, unknown> = {};
    try {
      args = call.arguments ? JSON.parse(call.arguments) : {};
    } catch {
      return { call, result: { success: false, message: 'The tool arguments were not valid JSON. Try again with the details.' } };
    }

    const started = Date.now();
    try {
      const result = await withTimeout(tool.handler(args), timeoutMs, call.name);
      logger.info(`[SarvamBridge][${callUuid}] Tool ${call.name} → ${result.success ? 'ok' : 'failed'} (${Date.now() - started}ms): ${result.message}`);
      return { call, result };
    } catch (e: any) {
      const timedOut = /took too long/.test(e?.message || '');
      logger.error(`[SarvamBridge][${callUuid}] Tool ${call.name} ${timedOut ? 'timed out' : 'threw'} after ${Date.now() - started}ms: ${e?.message}`);
      return {
        call,
        result: {
          success: false,
          message: timedOut
            ? `${call.name} took too long. Tell the caller it did not go through and offer to try again.`
            : `${call.name} failed. Tell the caller it did not go through.`,
        },
      };
    }
  }));
}

/** The assistant `tool_calls` message plus one `tool` message per call, appended after the first pass. */
export function buildToolRoundMessages(fullReply: string, executed: ExecutedToolCall[]): ChatMessage[] {
  const idOf = (c: StreamedToolCall) => c.id || `call_${c.index}`;
  const assistant: ChatMessage = {
    role: 'assistant',
    content: fullReply || null,
    tool_calls: executed.map(({ call }) => ({
      id: idOf(call),
      type: 'function',
      function: { name: call.name, arguments: call.arguments || '{}' },
    })),
  };
  const results: ChatMessage[] = executed.map(({ call, result }) => ({
    role: 'tool',
    tool_call_id: idOf(call),
    content: JSON.stringify(result),
  }));
  return [assistant, ...results];
}

/** Short spoken line while the tools run — only used when nothing was spoken yet in the turn. */
export function toolFillerText(language: string, gender: 'female' | 'male'): string {
  const prefix = (language || '').split('-')[0].toLowerCase();
  if (prefix === 'hi') return gender === 'male' ? 'एक सेकंड, भेज रहा हूँ।' : 'एक सेकंड, भेज रही हूँ।';
  return 'One moment, sending that now.';
}
