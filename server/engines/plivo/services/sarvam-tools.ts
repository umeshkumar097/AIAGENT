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
    content: JSON.stringify(modelVisibleResult(result)),
  }));
  return [assistant, ...results];
}

/** Only success/message/data reach the model; `action`/`phoneNumber` are bridge-side side effects. */
export function modelVisibleResult(result: CallToolResult): { success: boolean; message: string; data?: unknown } {
  const visible: { success: boolean; message: string; data?: unknown } = { success: result.success, message: result.message };
  if (result.data !== undefined) visible.data = result.data;
  return visible;
}

/** The transfer target requested by any executed tool this round (transfer wins over end_call). */
export function pendingTransferTarget(executed: ExecutedToolCall[]): string | null {
  for (const { result } of executed) {
    if (result.success && result.action === 'transfer' && result.phoneNumber) return result.phoneNumber;
  }
  return null;
}

/** Short spoken line while the tools run — only used when nothing was spoken yet in the turn. */
export function toolFillerText(language: string, gender: 'female' | 'male'): string {
  const prefix = (language || '').split('-')[0].toLowerCase();
  if (prefix === 'hi') return gender === 'male' ? 'एक सेकंड, भेज रहा हूँ।' : 'एक सेकंड, भेज रही हूँ।';
  return 'One moment, sending that now.';
}

/** Goodbye spoken when the call is ending but the model produced no text (tool-call-only reply). */
export function goodbyeText(language: string): string {
  const prefix = (language || '').split('-')[0].toLowerCase();
  const lines: Record<string, string> = {
    hi: 'ठीक है, धन्यवाद। आपका दिन शुभ हो।',
    bn: 'ঠিক আছে, ধন্যবাদ। আপনার দিন শুভ হোক।',
    ta: 'சரி, நன்றி. உங்கள் நாள் இனிதாக அமையட்டும்.',
    te: 'సరే, ధన్యవాదాలు. మీ రోజు శుభంగా ఉండాలి.',
    kn: 'ಸರಿ, ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ದಿನ ಶುಭವಾಗಿರಲಿ.',
    ml: 'ശരി, നന്ദി. നല്ലൊരു ദിവസം ആശംസിക്കുന്നു.',
    mr: 'ठीक आहे, धन्यवाद. तुमचा दिवस शुभ जावो.',
    pa: 'ਠੀਕ ਹੈ, ਧੰਨਵਾਦ। ਤੁਹਾਡਾ ਦਿਨ ਸ਼ੁਭ ਹੋਵੇ।',
    gu: 'ઠીક છે, આભાર. તમારો દિવસ શુભ રહે.',
    od: 'ଠିକ ଅଛି, ଧନ୍ୟବାଦ। ଆପଣଙ୍କ ଦିନ ଶୁଭ ହେଉ।',
  };
  return lines[prefix] || 'Alright, thank you. Have a good day.';
}

/**
 * Caller clearly wants the call to end ("call cut kar do", "baat nahi karni", "bye", "hang up" …).
 * Used as a safety net when the model says goodbye without calling end_call — otherwise the agent
 * would just wait in silence. Kept conservative: "not interested" alone does not end the call.
 */
const END_CALL_INTENT = new RegExp([
  // Hinglish / Hindi (romanised and Devanagari)
  'call\\s*(cut|kat|band|rakh)', 'cut\\s*kar', 'kaat\\s*d', 'phone\\s*(rakh|band|kat)', 'rakh\\s*(do|dijiye|deta|deti|raha|rahi)', 'rakht[aei]\\s*h', 'रखत[ाी]\\s*ह',
  'baat\\s*nahi+\\s*karn', 'baat\\s*nhi+\\s*karn', 'band\\s*kar(o|iye|\\s*do)', 'disconnect', 'hang\\s*up',
  "don'?t\\s+want\\s+to\\s+talk", 'not\\s+(want|interested).{0,20}\\b(bye|call)', 'end\\s+(the\\s+)?call', 'stop\\s+calling',
  '\\b(bye|goodbye|alvida|good\\s*bye)\\b', 'कॉल\\s*(काट|कट|बंद|रख)', 'फ़?ोन\\s*(रख|काट|बंद)', 'बात\\s*नहीं\\s*करन', 'रख\\s*(दो|दीजिए|देता|देती)',
  'अलविदा', 'बाय',
].join('|'), 'i');

export function callerWantsToEnd(transcript: string): boolean {
  const t = (transcript || '').trim();
  if (!t) return false;
  // "bye" as a one-word reply counts; "bye" buried in a long sentence about something else does not
  if (/^\s*(bye|goodbye|alvida|बाय|अलविदा)[\s.!।]*$/i.test(t)) return true;
  return END_CALL_INTENT.test(t) && t.split(/\s+/).length <= 25;
}

/**
 * Caller asks not to be called again ("dobara call mat karna", "remove my number", "unsubscribe",
 * "do not call" …). Safety net for the mark_do_not_call tool: the number is added to the DND list
 * and the call is ended after the reply, even if the model never calls the tool.
 */
const DND_INTENT = new RegExp([
  // Hinglish (romanised): "dobara/phir se/aage se call mat karna", "mat call karo", "call mat karna/karo/kijiye"
  '(dobara|dubara|phir\\s*se|aage\\s*se|kabhi|ab)\\s*(mujhe\\s*)?(call|phone|contact)\\s*(mat|na|nahi+|nhi+)\\s*(karna|karo|kijiye|kariye|karein|kare)',
  '(mat|na)\\s*(call|phone)\\s*(karna|karo|kijiye|kariye|karein|kare)',
  '(call|phone)\\s*(mat|na|nahi+|nhi+)\\s*(karna|karo|kijiye|kariye|karein|kare)',
  'number\\s*(hata|nikal|delete|remove)',
  // English
  "(don'?t|do\\s+not|never|stop)\\s+(call|calling|contact|contacting)(\\s+me)?",
  'remove\\s+(my\\s+)?(number|me)', 'unsubscribe', 'take\\s+me\\s+off', 'do\\s*-?\\s*not\\s*-?\\s*call', '\\bdnd\\b', 'block\\s+(this|my)\\s+number',
  // Devanagari
  '(दोबारा|दुबारा|फिर\\s*से|आगे\\s*से|कभी)\\s*(मुझे\\s*)?(कॉल|फ़?ोन)\\s*(मत|ना|नहीं)\\s*(करना|करो|कीजिए|करिए|करें)',
  '(कॉल|फ़?ोन)\\s*(मत|ना|नहीं)\\s*(करना|करो|कीजिए|करिए|करें)', 'मत\\s*(कॉल|फ़?ोन)\\s*(करना|करो|कीजिए)',
  'नंबर\\s*(हटा|निकाल|डिलीट)',
].join('|'), 'i');

export function callerRequestsDnd(transcript: string): boolean {
  const t = (transcript || '').trim();
  if (!t) return false;
  return DND_INTENT.test(t) && t.split(/\s+/).length <= 40;
}
