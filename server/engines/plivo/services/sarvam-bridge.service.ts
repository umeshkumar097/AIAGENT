import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';
import { db } from '../../../db';
import { globalSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';

// ── Audio pacing config ───────────────────────────────────────────────────────
const MULAW_CHUNK_BYTES = 160;   // 20 ms at 8 kHz
const MULAW_CHUNK_MS    = 20;

// ── Sarvam endpoints ─────────────────────────────────────────────────────────
const SARVAM_STT_URL     = 'wss://api.sarvam.ai/speech-to-text/ws';
const SARVAM_TTS_WS_URL  = 'wss://api.sarvam.ai/text-to-speech/ws';

// ── Conversation state machine ─────────────────────────────────────────────────
type ConvState = 'LISTENING' | 'THINKING' | 'SPEAKING' | 'INTERRUPTED' | 'TERMINATED';

// Valid state transitions (used for logging unexpected ones)
const VALID_TRANSITIONS: Record<ConvState, ConvState[]> = {
  LISTENING:   ['THINKING', 'TERMINATED'],
  THINKING:    ['SPEAKING', 'INTERRUPTED', 'LISTENING', 'TERMINATED'],
  SPEAKING:    ['LISTENING', 'INTERRUPTED', 'TERMINATED'],
  INTERRUPTED: ['LISTENING', 'TERMINATED'],
  TERMINATED:  [],
};

export interface SarvamAgentConfig {
  systemPrompt:  string;
  firstMessage?: string;
  language?:     string;
  voice?:        string;
  openaiApiKey:  string;
}

// ── Per-call latency profiler (Suggestion 6, 7, 10) ─────────────────────────
class PerfTimer {
  private marks = new Map<string, number>();
  constructor(private readonly callUuid: string) {}

  mark(label: string): void {
    this.marks.set(label, Date.now());
  }

  log(from: string, to: string): void {
    const t0 = this.marks.get(from);
    const t1 = this.marks.get(to) ?? Date.now();
    if (t0 == null) return;
    logger.info(`[PERF][${this.callUuid}] ${from}→${to}: ${t1 - t0}ms`);
  }

  summary(from: string): void {
    const t0 = this.marks.get(from);
    if (t0 == null) return;
    logger.info(`[PERF][${this.callUuid}] TURN_TOTAL (${from}→now): ${Date.now() - t0}ms`);
  }
}

export class SarvamBridgeService {

  // ── mulaw decode table (G.711 μ-law) ─────────────────────────────────────
  private static readonly MULAW_DECODE: Int16Array = (() => {
    const t = new Int16Array(256);
    for (let i = 0; i < 256; i++) {
      let u = ~i & 0xFF;
      const sign = u & 0x80;
      const exp  = (u >> 4) & 0x07;
      const mant = u & 0x0F;
      let s = ((mant << 3) + 0x84) << exp;
      s -= 0x84;
      t[i] = sign ? -s : s;
    }
    return t;
  })();

  // ── G.711 μ-law encoder ───────────────────────────────────────────────────
  private static lin2ulaw(s: number): number {
    const BIAS = 33, CLIP = 32635;
    const sign = (s >> 8) & 0x80;
    if (sign) s = -s;
    if (s > CLIP) s = CLIP;
    s += BIAS;
    let exp = 7, mask = 0x4000;
    while (!(s & mask) && exp > 0) { exp--; mask >>= 1; }
    const mant = (s >> (exp + 3)) & 0x0F;
    return (~(sign | (exp << 4) | mant)) & 0xFF;
  }

  // ── μ-law 8 kHz → PCM16 LE 8 kHz ─────────────────────────────────────────
  private static mulaw8k_to_pcm16_8k(src: Buffer): Buffer {
    const out = Buffer.alloc(src.length * 2);
    for (let i = 0; i < src.length; i++) {
      out.writeInt16LE(SarvamBridgeService.MULAW_DECODE[src[i]], i * 2);
    }
    return out;
  }

  // ── PCM16 LE any-rate → μ-law 8 kHz (downsampler for 24 kHz TTS output) ──
  private static pcm16_to_mulaw8k(src: Buffer, srcRate: number): Buffer {
    const inSamples  = Math.floor(src.length / 2);
    const outSamples = Math.floor(inSamples * 8000 / srcRate);
    const ratio      = srcRate / 8000;
    const out        = Buffer.alloc(outSamples);
    for (let i = 0; i < outSamples; i++) {
      const lo = Math.floor(i * ratio);
      const hi = Math.min(Math.floor((i + 1) * ratio) + 1, inSamples);
      let sum = 0, cnt = 0;
      for (let j = lo; j < hi; j++) {
        const byteOffset = j * 2;
        if (byteOffset + 1 < src.length) { sum += src.readInt16LE(byteOffset); cnt++; }
      }
      const avg = cnt ? Math.round(sum / cnt) : 0;
      out[i] = SarvamBridgeService.lin2ulaw(Math.max(-32768, Math.min(32767, avg)));
    }
    return out;
  }

  // ── Paced audio sender ────────────────────────────────────────────────────
  private static sendMulawPaced(callUuid: string, plivoWs: WebSocket, mulawBuf: Buffer): void {
    const queue = (plivoWs as any).sarvamAudioQueue as Buffer[];
    for (let offset = 0; offset < mulawBuf.length; offset += MULAW_CHUNK_BYTES) {
      queue.push(mulawBuf.slice(offset, Math.min(offset + MULAW_CHUNK_BYTES, mulawBuf.length)));
    }
    if (!(plivoWs as any).sarvamIsPacing) {
      (plivoWs as any).sarvamIsPacing = true;
      SarvamBridgeService.paceNext(callUuid, plivoWs);
    }
  }

  private static paceNext(callUuid: string, plivoWs: WebSocket): void {
    const queue = (plivoWs as any).sarvamAudioQueue as Buffer[];
    if (!queue || queue.length === 0) {
      (plivoWs as any).sarvamIsPacing = false;
      // Audio drained: if still SPEAKING, transition to LISTENING
      const st: ConvState = (plivoWs as any).sarvamState;
      if (st === 'SPEAKING') {
        SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
        (plivoWs as any).sarvamIsSpeaking = false;
        logger.info(`[SarvamBridge][${callUuid}] Audio queue drained → LISTENING`);
      }
      return;
    }
    const chunk = queue.shift()!;
    if (plivoWs.readyState === WebSocket.OPEN) {
      plivoWs.send(JSON.stringify({
        event: 'playAudio',
        media: { contentType: 'audio/x-mulaw', sampleRate: 8000, payload: chunk.toString('base64') }
      }));
    }
    const timer = setTimeout(() => SarvamBridgeService.paceNext(callUuid, plivoWs), MULAW_CHUNK_MS);
    (plivoWs as any).sarvamPacingTimer = timer;
  }

  private static stopPacing(plivoWs: WebSocket): void {
    if ((plivoWs as any).sarvamPacingTimer) {
      clearTimeout((plivoWs as any).sarvamPacingTimer);
      (plivoWs as any).sarvamPacingTimer = null;
    }
    (plivoWs as any).sarvamAudioQueue = [];
    (plivoWs as any).sarvamIsPacing   = false;
  }

  // ── State machine helper ──────────────────────────────────────────────────
  private static setState(callUuid: string, plivoWs: WebSocket, next: ConvState): void {
    const prev: ConvState = (plivoWs as any).sarvamState ?? 'LISTENING';
    if (prev === 'TERMINATED') return; // terminal — no further transitions
    if (!VALID_TRANSITIONS[prev].includes(next)) {
      logger.warn(`[SarvamBridge][${callUuid}] Unexpected state: ${prev} → ${next}`);
    }
    (plivoWs as any).sarvamState = next;
  }

  // ── Close TTS WebSocket cleanly ───────────────────────────────────────────
  private static closeTtsWs(plivoWs: WebSocket): void {
    const ttsWs = (plivoWs as any).sarvamTtsWs as WebSocket | null;
    if (ttsWs) {
      ttsWs.removeAllListeners();
      if (ttsWs.readyState === WebSocket.OPEN || ttsWs.readyState === WebSocket.CONNECTING) {
        try { ttsWs.close(); } catch { /* ignore */ }
      }
      (plivoWs as any).sarvamTtsWs   = null;
      (plivoWs as any).sarvamTtsReady = false;
    }
  }

  // ── Full barge-in interrupt ───────────────────────────────────────────────
  // Suggestions 7, 8, 9: abort GPT, clear audio, signal Plivo, invalidate turn
  private static interruptAI(callUuid: string, plivoWs: WebSocket): void {
    const prev: ConvState = (plivoWs as any).sarvamState ?? 'LISTENING';
    if (prev === 'LISTENING' || prev === 'TERMINATED') return;

    // 1. Abort in-flight GPT fetch via AbortController
    const ctrl = (plivoWs as any).sarvamAbortController as AbortController | null;
    if (ctrl) {
      ctrl.abort();
      (plivoWs as any).sarvamAbortController = null;
    }

    // 2. Stop audio pacing and drain queue completely (Suggestion 7)
    SarvamBridgeService.stopPacing(plivoWs);

    // 3. Close TTS WebSocket — stops any in-progress synthesis (Suggestion 9)
    SarvamBridgeService.closeTtsWs(plivoWs);

    // 4. Tell Plivo to discard its internal audio buffer
    if (plivoWs.readyState === WebSocket.OPEN) {
      plivoWs.send(JSON.stringify({ event: 'clearAudio' }));
    }

    // 5. Bump turnId — outstanding .then() callbacks see mismatch and drop stale replies
    (plivoWs as any).sarvamTurnId = ((plivoWs as any).sarvamTurnId ?? 0) + 1;

    // 6. Clear legacy flag
    (plivoWs as any).sarvamIsSpeaking = false;

    SarvamBridgeService.setState(callUuid, plivoWs, 'INTERRUPTED');
    logger.info(`[SarvamBridge][${callUuid}] AI interrupted (was: ${prev}) — GPT aborted, audio cleared`);
  }

  // ── Get Sarvam API key ────────────────────────────────────────────────────
  private static async getSarvamApiKey(): Promise<string | null> {
    try {
      const [row] = await db
        .select({ value: globalSettings.value })
        .from(globalSettings)
        .where(eq(globalSettings.key, 'sarvam_api_key'))
        .limit(1);
      return (row?.value as string) || null;
    } catch {
      return null;
    }
  }

  // ── Gender detection from voice ───────────────────────────────────────────
  private static getGenderFromVoice(voice: string): 'female' | 'male' {
    const femaleVoices = ['priya', 'meera', 'kavya', 'anushka', 'manisha', 'vidya', 'maya'];
    return femaleVoices.includes((voice || '').toLowerCase()) ? 'female' : 'male';
  }

  // ── System prompt wrapper (Suggestion 6: compact, ~250 tokens) ────────────
  private static buildWrapper(systemPrompt: string, voice: string): string {
    const gender = SarvamBridgeService.getGenderFromVoice(voice);
    const selfRef = gender === 'female'
      ? 'Main ek female assistant hoon — "main karti hoon", "mujhe lagta hai" etc. use karo.'
      : 'Main ek male assistant hoon — "main karta hoon", "mujhe lagta hai" etc. use karo.';
    return `PHONE CALL RULES (MUST FOLLOW):
- Tum REAL phone call pe ho — bilkul natural bolo.
- SIRF 1-2 short sentences, max 25 words per turn.
- EK hi sawaal ek baar mein poochho.
- GENDER: ${selfRef}
- HINDI STYLE: Aam boli (spoken Hindi/Hinglish) use karo. Sarkari/formal Hindi BILKUL mat use karo.
  ❌ Avoid: avsyak, sampark, vibhinn, prashn, uttam, prarambh, sthiti, krpaya, abhivyakti
  ✅ Use: zaroor, contact, alag, sawaal, theek, shuru, situation, please, feeling
- Numbers, dates, English brand names English mein bol sakte ho.
- Script padhne ki tarah mat bolo — real conversation ki tarah bolo.

Your role:
${systemPrompt}`;
  }

  // ── Open/Reuse persistent TTS WebSocket (Suggestion 3: WS replaces REST) ─
  // Returns immediately — audio arrives via 'message' events on ttsWs
  private static openTtsWs(
    callUuid: string,
    plivoWs: WebSocket,
    sarvamApiKey: string,
    language: string,
    voice: string
  ): WebSocket {
    SarvamBridgeService.closeTtsWs(plivoWs); // close any stale one

    const ttsWs = new WebSocket(
      `${SARVAM_TTS_WS_URL}?model=bulbul:v3&send_completion_event=true`,
      { headers: { 'Api-Subscription-Key': sarvamApiKey } }
    );
    (plivoWs as any).sarvamTtsWs   = ttsWs;
    (plivoWs as any).sarvamTtsReady = false;

    ttsWs.on('open', () => {
      (plivoWs as any).sarvamTtsReady = true;
      // Send config immediately on open
      ttsWs.send(JSON.stringify({
        type: 'config',
        data: { target_language_code: language, speaker: voice }
      }));
      logger.info(`[SarvamBridge][${callUuid}] TTS WebSocket opened (lang=${language} voice=${voice})`);
    });

    ttsWs.on('message', (raw: Buffer | string) => {
      try {
        const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));

        if (msg.type === 'audio' && msg.data?.audio) {
          // Sarvam TTS WS returns 24 kHz PCM16 LE — downsample to 8 kHz μ-law for Plivo
          const pcm24k  = Buffer.from(msg.data.audio, 'base64');
          const mulaw8k = SarvamBridgeService.pcm16_to_mulaw8k(pcm24k, 24000);

          // Guard: only send if call is still in SPEAKING or THINKING state
          const st: ConvState = (plivoWs as any).sarvamState;
          if (st === 'SPEAKING' || st === 'THINKING') {
            SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, mulaw8k);
          }
        } else if (msg.type === 'event') {
          logger.info(`[SarvamBridge][${callUuid}] TTS synthesis completed`);
        }
      } catch { /* ignore malformed */ }
    });

    ttsWs.on('error', (e) => {
      logger.error(`[SarvamBridge][${callUuid}] TTS WS error: ${(e as Error).message}`);
    });

    ttsWs.on('close', (code) => {
      logger.info(`[SarvamBridge][${callUuid}] TTS WS closed (${code})`);
      // Only clear if this is still the active ttsWs (not a replaced one)
      if ((plivoWs as any).sarvamTtsWs === ttsWs) {
        (plivoWs as any).sarvamTtsWs   = null;
        (plivoWs as any).sarvamTtsReady = false;
      }
    });

    return ttsWs;
  }

  // ── Send one sentence to TTS WebSocket ───────────────────────────────────
  // Returns after flushing — audio chunks arrive asynchronously via message handler
  private static async sendSentenceToTtsWs(
    callUuid: string,
    plivoWs: WebSocket,
    text: string,
    sarvamApiKey: string,
    language: string,
    voice: string,
    signal: AbortSignal,
    perf: PerfTimer,
    idx: number
  ): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) return;

    perf.mark(`TTS_START_${idx}`);

    // Ensure TTS WS is open; open if needed
    let ttsWs = (plivoWs as any).sarvamTtsWs as WebSocket | null;
    if (!ttsWs || ttsWs.readyState === WebSocket.CLOSED || ttsWs.readyState === WebSocket.CLOSING) {
      ttsWs = SarvamBridgeService.openTtsWs(callUuid, plivoWs, sarvamApiKey, language, voice);
    }

    // Wait up to 3 s for the WS to be ready (usually ~50–100 ms)
    if (!(plivoWs as any).sarvamTtsReady) {
      await new Promise<void>((resolve) => {
        const deadline = Date.now() + 3000;
        const poll = () => {
          if (signal.aborted || Date.now() > deadline) { resolve(); return; }
          if ((plivoWs as any).sarvamTtsReady)         { resolve(); return; }
          setTimeout(poll, 20);
        };
        poll();
      });
    }

    if (signal.aborted) return;

    const ws = (plivoWs as any).sarvamTtsWs as WebSocket | null;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      logger.warn(`[SarvamBridge][${callUuid}] TTS WS not ready for sentence ${idx} — skipping`);
      return;
    }

    // Send text chunk then flush → server streams audio back
    ws.send(JSON.stringify({ type: 'audio', data: { text: trimmed } }));
    ws.send(JSON.stringify({ type: 'flush' }));

    perf.mark(`TTS_FLUSHED_${idx}`);
    perf.log(`TTS_START_${idx}`, `TTS_FLUSHED_${idx}`);

    // First sentence: transition THINKING → SPEAKING
    if (idx === 0) {
      SarvamBridgeService.setState(callUuid, plivoWs, 'SPEAKING');
      (plivoWs as any).sarvamIsSpeaking = true; // legacy compat
    }

    logger.info(`[SarvamBridge][${callUuid}] TTS WS sent sentence ${idx}: "${trimmed.substring(0, 50)}"`);
  }

  // ── GPT-4o-mini streaming → sentence-level TTS (non-blocking capable) ─────
  // Respects AbortSignal — stops immediately when ctrl.abort() is called.
  // Suggestions 3, 6, 8, 9
  private static async streamGPTAndSpeak(
    callUuid: string,
    plivoWs: WebSocket,
    openaiApiKey: string,
    systemPrompt: string,
    history: { role: 'user' | 'assistant'; content: string }[],
    sarvamApiKey: string,
    language: string,
    voice: string,
    signal: AbortSignal,
    perf: PerfTimer
  ): Promise<string> {
    const naturalWrapper = SarvamBridgeService.buildWrapper(systemPrompt, voice);
    const messages = [{ role: 'system' as const, content: naturalWrapper }, ...history];

    perf.mark('GPT_START');

    // Passes AbortSignal to fetch — network request cancelled immediately on abort
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 200,
        temperature: 0.7,
        stream: true
      }),
      signal
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}: ${await response.text()}`);

    const reader     = response.body!.getReader();
    const decoder    = new TextDecoder();
    let buffer       = '';
    let fullReply    = '';
    let sentenceBuf  = '';
    let sentenceIdx  = 0;
    let firstToken   = false;

    try {
      while (true) {
        if (signal.aborted) break;

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (signal.aborted) break;
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const chunk = JSON.parse(data);
            const token = chunk.choices?.[0]?.delta?.content || '';
            if (!token) continue;

            // Perf: mark first token separately (Suggestion 6, 7)
            if (!firstToken) {
              firstToken = true;
              perf.mark('GPT_FIRST_TOKEN');
              perf.log('GPT_START', 'GPT_FIRST_TOKEN');
            }

            fullReply   += token;
            sentenceBuf += token;

            // Sentence boundary: ., !, ?, ।, \n
            // Note: using [\s\S] instead of /s flag for ES2015 compat
            const match = sentenceBuf.match(/^([\s\S]*[।.!?\n])([\s\S]*)$/);
            if (match) {
              const sentence = match[1];
              sentenceBuf    = match[2] || '';
              if (!signal.aborted) {
                // Fire TTS immediately — do NOT await; keeps reading GPT tokens concurrently
                SarvamBridgeService.sendSentenceToTtsWs(
                  callUuid, plivoWs, sentence,
                  sarvamApiKey, language, voice,
                  signal, perf, sentenceIdx
                ).catch(e => {
                  if (!signal.aborted) {
                    logger.error(`[SarvamBridge][${callUuid}] TTS err sentence ${sentenceIdx}: ${e.message}`);
                  }
                });
                sentenceIdx++;
              }
            }
          } catch { /* ignore malformed SSE */ }
        }
      }

      // Flush remaining buffer (sentence without trailing punctuation)
      if (sentenceBuf.trim() && !signal.aborted) {
        perf.mark('GPT_DONE');
        await SarvamBridgeService.sendSentenceToTtsWs(
          callUuid, plivoWs, sentenceBuf,
          sarvamApiKey, language, voice,
          signal, perf, sentenceIdx
        );
      } else {
        perf.mark('GPT_DONE');
      }

      perf.log('GPT_START', 'GPT_DONE');
      perf.summary('STT_FINAL');

    } finally {
      reader.cancel().catch(() => {});
      // Note: sarvamIsSpeaking cleared by paceNext() when audio queue drains
    }

    return signal.aborted ? '' : (fullReply.trim() || 'Kuch samajh nahi aaya, kripya dobara bolein.');
  }

  // ── Fire first message (greeting) ─────────────────────────────────────────
  private static async fireFirstMessage(
    callUuid: string,
    plivoWs: WebSocket,
    agentConfig: SarvamAgentConfig,
    sarvamApiKey: string,
    language: string,
    voice: string,
    chatHistory: { role: 'user' | 'assistant'; content: string }[],
    transcriptLines: string[],
    signal: AbortSignal,
    perf: PerfTimer
  ): Promise<void> {
    if (agentConfig.firstMessage) {
      const fullMsg = agentConfig.firstMessage;
      logger.info(`[SarvamBridge][${callUuid}] First message configured (${fullMsg.length} chars)`);
      chatHistory.push({ role: 'assistant', content: fullMsg });
      transcriptLines.push(`Agent: ${fullMsg}`);
      SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');

      // Split into sentences and TTS sequentially
      // Note: using manual split to avoid lookbehind regex (ES2018+)
      const sentences: string[] = [];
      const parts = fullMsg.split(/([।.!?]+)/);
      for (let pi = 0; pi < parts.length - 1; pi += 2) {
        const s = ((parts[pi] || '') + (parts[pi + 1] || '')).trim();
        if (s.length > 0) sentences.push(s);
      }
      // Add any remaining text after last punctuation
      const lastPart = parts[parts.length - 1]?.trim();
      if (lastPart && lastPart.length > 0) sentences.push(lastPart);
      const allSents = sentences.length > 0 ? sentences : [fullMsg];

      for (let i = 0; i < allSents.length; i++) {
        if (signal.aborted || plivoWs.readyState !== WebSocket.OPEN) break;
        await SarvamBridgeService.sendSentenceToTtsWs(
          callUuid, plivoWs, allSents[i],
          sarvamApiKey, language, voice, signal, perf, i
        ).catch(e => logger.error(`[SarvamBridge][${callUuid}] First msg TTS s${i}: ${e.message}`));
      }
    } else {
      // No firstMessage — GPT generates greeting
      logger.info(`[SarvamBridge][${callUuid}] No firstMessage — streaming GPT greeting`);
      SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');
      try {
        const gptReply = await SarvamBridgeService.streamGPTAndSpeak(
          callUuid, plivoWs, agentConfig.openaiApiKey,
          agentConfig.systemPrompt, [],
          sarvamApiKey, language, voice, signal, perf
        );
        if (gptReply && !signal.aborted) {
          chatHistory.push({ role: 'assistant', content: gptReply });
          transcriptLines.push(`Agent: ${gptReply}`);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          const fallback = 'Namaste! Main aapki kaise madad kar sakta hoon?';
          logger.warn(`[SarvamBridge][${callUuid}] GPT greeting failed: ${e.message}`);
          chatHistory.push({ role: 'assistant', content: fallback });
          transcriptLines.push(`Agent: ${fallback}`);
          await SarvamBridgeService.sendSentenceToTtsWs(
            callUuid, plivoWs, fallback, sarvamApiKey, language, voice, signal, perf, 0
          ).catch(() => {});
        }
      }
    }
  }

  // ── Public: Initialize session ─────────────────────────────────────────────
  static async initializeSession(
    callUuid: string,
    plivoWs: WebSocket,
    _streamSid: string | null,
    _agentId: string,
    agentConfig: SarvamAgentConfig
  ): Promise<void> {
    logger.info(`[SarvamBridge][${callUuid}] Initializing session`);

    const sarvamApiKey = await SarvamBridgeService.getSarvamApiKey();
    if (!sarvamApiKey) {
      logger.error(`[SarvamBridge][${callUuid}] No Sarvam API key — aborting`);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      return;
    }

    // ── Language normalization ────────────────────────────────────────────────
    const LANG_MAP: Record<string, string> = {
      'hi': 'hi-IN', 'en': 'en-IN', 'bn': 'bn-IN', 'ta': 'ta-IN',
      'te': 'te-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'mr': 'mr-IN',
      'pa': 'pa-IN', 'gu': 'gu-IN', 'od': 'od-IN', 'ur': 'ur-IN',
    };
    const rawLang  = agentConfig.language || 'hi-IN';
    const language = LANG_MAP[rawLang] ?? (rawLang.includes('-') ? rawLang : 'hi-IN');

    // ── Voice normalization ───────────────────────────────────────────────────
    const BULBUL_V3_VOICES = ['priya'];
    const rawVoice = (agentConfig.voice || 'priya').toLowerCase();
    const VOICE_MAP: Record<string, string> = {
      'anushka': 'priya', 'manisha': 'priya', 'vidya': 'priya',
      'arya': 'priya',    'karun': 'priya',   'hitesh': 'priya',
      'abhilash': 'priya','meera': 'priya',   'maya': 'priya',
      'raj': 'priya',     'ravi': 'priya',
    };
    const voice = BULBUL_V3_VOICES.includes(rawVoice) ? rawVoice : (VOICE_MAP[rawVoice] || 'priya');
    logger.info(`[SarvamBridge][${callUuid}] language=${language} voice=${voice} (raw: ${rawLang}/${rawVoice})`);

    // ── Initialize per-call state on plivoWs ─────────────────────────────────
    (plivoWs as any).sarvamAudioQueue           = [];
    (plivoWs as any).sarvamIsPacing             = false;
    (plivoWs as any).sarvamPacingTimer          = null;
    (plivoWs as any).sarvamIsSpeaking           = false;     // legacy compat flag
    (plivoWs as any).isSarvam                   = true;
    (plivoWs as any).sarvamState                = 'LISTENING' as ConvState;
    (plivoWs as any).sarvamAbortController      = null as AbortController | null;
    (plivoWs as any).sarvamTurnId               = 0;
    (plivoWs as any).sarvamTtsWs                = null;
    (plivoWs as any).sarvamTtsReady             = false;
    (plivoWs as any).sarvamRealAudioStarted     = false;

    const transcriptLines: string[] = [];
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    (plivoWs as any).sarvamTranscriptLines = transcriptLines;
    (plivoWs as any).sarvamCallStartTime   = Date.now();

    // Master abort controller — aborted on call end to stop any in-flight tasks
    const masterCtrl = new AbortController();
    (plivoWs as any).sarvamMasterAbortController = masterCtrl;

    try {
      // ── Pre-warm TTS WebSocket (opens in background, ready before first user turn) ──
      SarvamBridgeService.openTtsWs(callUuid, plivoWs, sarvamApiKey, language, voice);

      // ── Fire greeting (non-blocking — STT connects in parallel) ──────────
      const greetPerf = new PerfTimer(`${callUuid}:greeting`);
      greetPerf.mark('GREETING_START');
      SarvamBridgeService.fireFirstMessage(
        callUuid, plivoWs, agentConfig,
        sarvamApiKey, language, voice,
        chatHistory, transcriptLines,
        masterCtrl.signal, greetPerf
      ).then(() => greetPerf.summary('GREETING_START'))
       .catch(e => {
         if (e.name !== 'AbortError') {
           logger.error(`[SarvamBridge][${callUuid}] Greeting error: ${e.message}`);
         }
       });

      // ── STT WebSocket ─────────────────────────────────────────────────────
      // Suggestion 1: vad_signals=true → receive START_SPEECH events for barge-in
      // Suggestion 1: high_vad_sensitivity=true → 0.5 s silence threshold (was ~1 s = saves 400-500 ms)
      const sttUrl = [
        SARVAM_STT_URL,
        `?language-code=${language}`,
        `&model=saaras:v3`,
        `&mode=transcribe`,
        `&sample_rate=8000`,
        `&input_audio_codec=pcm_s16le`,
        `&vad_signals=true`,          // Suggestion 1: receive VAD barge-in events
        `&high_vad_sensitivity=true`, // Suggestion 1: 0.5 s end-of-speech (saves 400-500 ms)
      ].join('');

      const sttWs = new WebSocket(sttUrl, {
        headers: { 'Api-Subscription-Key': sarvamApiKey }
      });
      (plivoWs as any).sarvamSttWs = sttWs;

      sttWs.on('open', () => {
        logger.info(`[SarvamBridge][${callUuid}] STT WebSocket opened`);

        // Suggestion 11: 5 s ping (was 20 ms silence flood = 250× fewer messages)
        // Sarvam docs: use { type: "ping" } to keep connection alive
        const keepAlive = setInterval(() => {
          if (sttWs.readyState === WebSocket.OPEN) {
            sttWs.send(JSON.stringify({ type: 'ping' }));
          } else {
            clearInterval(keepAlive);
          }
        }, 5000);
        (plivoWs as any).sarvamKeepAlive = keepAlive;
      });

      sttWs.on('message', async (raw: Buffer | string) => {
        try {
          // Ignore binary frames that are not JSON
          if (raw instanceof Buffer && raw[0] !== 123) return;
          const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));

          // ── VAD event: user started speaking → barge-in ──────────────────
          // Suggestion 1: vad_signals=true enables these events from Sarvam
          // Fires ~100-200 ms after speech onset — much earlier than final transcript
          if (msg.type === 'user_started_speaking' || msg.type === 'START_SPEECH') {
            const st: ConvState = (plivoWs as any).sarvamState;
            if (st === 'SPEAKING' || st === 'THINKING') {
              logger.info(`[SarvamBridge][${callUuid}] VAD barge-in detected (state: ${st})`);
              SarvamBridgeService.interruptAI(callUuid, plivoWs);
            }
            return;
          }

          // ── Final transcript received ─────────────────────────────────────
          // Suggestion 1: saaras:v3 progressive updates; we treat each as actionable
          const transcript = msg.data?.transcript || msg.transcript || msg.data?.text;
          if (!transcript || !transcript.trim()) return;

          const st: ConvState = (plivoWs as any).sarvamState;

          // If AI is mid-turn, interrupt it before processing new user speech
          if (st === 'SPEAKING' || st === 'THINKING') {
            SarvamBridgeService.interruptAI(callUuid, plivoWs);
          }

          // ── Latency profiling (Suggestions 6, 7, 10) ─────────────────────
          const perf = new PerfTimer(callUuid);
          perf.mark('STT_FINAL');
          logger.info(`[SarvamBridge][${callUuid}] User: "${transcript.substring(0, 80)}"`);
          perf.log('STT_FINAL', 'STT_FINAL');

          // Build history snapshot BEFORE adding current turn
          // (snapshot is safe to read inside the async GPT call)
          transcriptLines.push(`User: ${transcript}`);
          chatHistory.push({ role: 'user', content: transcript });
          const historyCopy = [...chatHistory]; // snapshot for this turn

          // ── Start new conversation turn ───────────────────────────────────
          SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');
          const turnId = ++(plivoWs as any).sarvamTurnId;
          const ctrl   = new AbortController();
          (plivoWs as any).sarvamAbortController = ctrl;

          // Open a fresh TTS WebSocket for this turn (clean state, no leftover audio)
          SarvamBridgeService.openTtsWs(callUuid, plivoWs, sarvamApiKey, language, voice);

          // ── NON-BLOCKING GPT call (Suggestion 4: handler returns immediately) ──
          // New STT messages (barge-in) can be processed while GPT is running
          SarvamBridgeService.streamGPTAndSpeak(
            callUuid, plivoWs,
            agentConfig.openaiApiKey,
            agentConfig.systemPrompt,
            historyCopy,
            sarvamApiKey, language, voice,
            ctrl.signal, perf
          ).then(reply => {
            // Suggestion 8, 9: turnId guard — stale replies are never committed
            const currentTurnId = (plivoWs as any).sarvamTurnId;
            if (currentTurnId !== turnId) {
              logger.info(`[SarvamBridge][${callUuid}] Stale reply discarded (turn ${turnId} < current ${currentTurnId})`);
              return;
            }
            if (reply) {
              logger.info(`[SarvamBridge][${callUuid}] Agent (turn ${turnId}): "${reply.substring(0, 80)}"`);
              transcriptLines.push(`Agent: ${reply}`);
              chatHistory.push({ role: 'assistant', content: reply });
            }
            // Transition to LISTENING if audio queue already drained
            // (otherwise paceNext() handles it when queue empties)
            if (!(plivoWs as any).sarvamIsPacing) {
              SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
            }
          }).catch(err => {
            if (err.name === 'AbortError') {
              logger.info(`[SarvamBridge][${callUuid}] GPT turn ${turnId} aborted (barge-in)`);
            } else {
              logger.error(`[SarvamBridge][${callUuid}] GPT turn ${turnId} error: ${err.message}`);
            }
            // Recover state — don't leave stuck in THINKING
            if ((plivoWs as any).sarvamTurnId === turnId) {
              SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
            }
          });

        } catch (e: any) {
          logger.error(`[SarvamBridge][${callUuid}] STT message error: ${e.message}`);
        }
      }); // end sttWs.on('message')

      sttWs.on('close', (code, reason) => {
        logger.info(`[SarvamBridge][${callUuid}] STT closed (${code}: ${reason?.toString()})`);
        const ka = (plivoWs as any).sarvamKeepAlive;
        if (ka) { clearInterval(ka); (plivoWs as any).sarvamKeepAlive = null; }
        SarvamBridgeService.stopPacing(plivoWs);
        SarvamBridgeService.setState(callUuid, plivoWs, 'TERMINATED');
        if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      });

      sttWs.on('error', (e) => {
        logger.error(`[SarvamBridge][${callUuid}] STT error:`, e);
      });

    } catch (e) {
      logger.error(`[SarvamBridge][${callUuid}] Init error:`, e);
      SarvamBridgeService.stopPacing(plivoWs);
      SarvamBridgeService.closeTtsWs(plivoWs);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
    }
  }

  /** Forward Plivo μ-law 8 kHz → Sarvam STT as JSON */
  static handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): void {
    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (!sttWs || sttWs.readyState !== WebSocket.OPEN) return;

    if (!(plivoWs as any).sarvamRealAudioStarted) {
      (plivoWs as any).sarvamRealAudioStarted = true;
      logger.info(`[SarvamBridge][${callUuid}] First Plivo audio frame received`);
      // Note: keepAlive continues — it now sends JSON pings, not silence
    }

    const mulawBuf = Buffer.from(payload, 'base64');
    const pcmBuf   = SarvamBridgeService.mulaw8k_to_pcm16_8k(mulawBuf);
    sttWs.send(JSON.stringify({
      audio: { data: pcmBuf.toString('base64'), encoding: 'audio/wav', sample_rate: 8000 }
    }));
  }

  /** End session cleanly — returns transcript and duration */
  static endSession(plivoWs: WebSocket): { duration: number; transcript: string } {
    // Abort master controller — cancels any in-flight GPT/TTS
    const masterCtrl = (plivoWs as any).sarvamMasterAbortController as AbortController | null;
    if (masterCtrl) { masterCtrl.abort(); }

    SarvamBridgeService.setState('call_end', plivoWs, 'TERMINATED');
    SarvamBridgeService.stopPacing(plivoWs);
    SarvamBridgeService.closeTtsWs(plivoWs);

    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (sttWs && (sttWs.readyState === WebSocket.OPEN || sttWs.readyState === WebSocket.CONNECTING)) {
      try { sttWs.close(); } catch { /* ignore */ }
    }

    const ka = (plivoWs as any).sarvamKeepAlive;
    if (ka) { clearInterval(ka); (plivoWs as any).sarvamKeepAlive = null; }

    const lines: string[] = (plivoWs as any).sarvamTranscriptLines || [];
    const startMs: number = (plivoWs as any).sarvamCallStartTime   || Date.now();
    const duration = Math.round((Date.now() - startMs) / 1000);
    return { duration, transcript: lines.join('\n') };
  }
}
