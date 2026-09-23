import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';
import { db } from '../../../db';
import { globalSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';
import https from 'https';
import axios from 'axios';
import { PlivoCallService } from './plivo-call.service';
import { SARVAM_VOICES } from '../../../routes/sarvam-routes';
import { SarvamTtsStream } from './sarvam-tts-stream';
import { SarvamKnowledge } from './sarvam-knowledge';
import type { CallTool } from '../../../services/call-messaging-tools';
import {
  accumulateToolCallDeltas, buildToolRoundMessages, executeStreamedToolCalls, pendingTransferTarget, toolFillerText,
  type ChatMessage, type StreamedToolCall,
} from './sarvam-tools';
import { executePlivoTransfer, markCallTransferred } from './plivo-transfer';
import { actionPromptRules } from '../../../services/call-actions';

// Persistent HTTPS agent for reusing connection keep-alive (reduces 120ms handshake overhead per TTS request)
const keepAliveAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 5000,
  maxSockets: 64,
  timeout: 10000
});

// ── Audio pacing config ───────────────────────────────────────────────────────
const MULAW_CHUNK_BYTES = 160;   // 20 ms at 8 kHz
const MULAW_CHUNK_MS    = 20;

// ── Sarvam endpoints ─────────────────────────────────────────────────────────
// Realtime STT: partial/final transcripts, VAD events, native μ-law input and
// language_code=auto (detected language on every final). The legacy
// /speech-to-text/ws endpoint supports none of these.
const SARVAM_STT_URL = 'wss://api.sarvam.ai/speech-to-text-realtime/ws';
// TTS via REST, requesting μ-law@8k so audio goes to Plivo untouched.
const SARVAM_TTS_REST_URL = 'https://api.sarvam.ai/text-to-speech';
// Cached TTS audio (greeting, fillers, repeated lines) — bounded FIFO
const TTS_CACHE_MAX = 300;
// Play a short filler only if the first sentence audio is not ready by then
const FILLER_DELAY_MS = 700;
// Keep the last N chat messages in the LLM context
const HISTORY_MAX_MESSAGES = 20;

// ── Conversation state machine ─────────────────────────────────────────────────
type ConvState = 'LISTENING' | 'THINKING' | 'SPEAKING' | 'INTERRUPTED' | 'TERMINATED';

const VALID_TRANSITIONS: Record<ConvState, ConvState[]> = {
  LISTENING:   ['THINKING', 'TERMINATED'],
  THINKING:    ['SPEAKING', 'INTERRUPTED', 'LISTENING', 'TERMINATED'],
  SPEAKING:    ['LISTENING', 'INTERRUPTED', 'TERMINATED'],
  INTERRUPTED: ['LISTENING', 'THINKING', 'TERMINATED'],
  TERMINATED:  [],
};

export interface SarvamAgentConfig {
  systemPrompt:  string;
  firstMessage?: string;
  language?:     string;
  voice?:        string;
  openaiApiKey:  string;
  openaiModel?:  string;
  /** Follow the caller's language (STT language_code=auto + prompt rule) */
  detectLanguage?: boolean;
  /** Knowledge base items attached to the agent (retrieved per turn, injected into the prompt) */
  knowledgeBaseIds?: string[] | null;
  /** Owner of the knowledge base items */
  userId?: string;
  /** Call-time tools (messaging + actions) built once per call by plivo-stream */
  tools?: CallTool[];
  /** Needed to execute a transfer_call on this bridge (Plivo Update Call + Stop Stream) */
  plivoCredentialId?: string | null;
  plivoPhoneNumberId?: string | null;
  callDirection?: 'inbound' | 'outbound';
  fromNumber?: string | null;
  toNumber?: string | null;
  /** IANA zone for the "today is …" rule of the appointment/callback tools */
  actionsTimeZone?: string;
}

// ── Per-call latency profiler ────────────────────────────────────────────────
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

  // ── Realtime STT audio frame (Plivo μ-law base64 passes straight through) ──
  private static sttAudioFrame(b64Mulaw: string): string {
    return '{"event":"audio_input","audio":"' + b64Mulaw + '"}';
  }

  // ── Smart Fillers cache & config ───────────────────────────────────────────
  private static readonly fillerCache = new Map<string, Buffer>();

  private static readonly FILLERS_BY_LANG: Record<string, string[]> = {
    'hi-IN': ['जी', 'अच्छा', 'हम्म', 'ठीक है'],
    'en-IN': ['ok', 'got it', 'hmm', 'sure'],
    'en-US': ['ok', 'got it', 'hmm', 'sure'],
  };

  private static getFillersForLanguage(lang: string): string[] {
    if (SarvamBridgeService.FILLERS_BY_LANG[lang]) {
      return SarvamBridgeService.FILLERS_BY_LANG[lang];
    }
    if (lang.startsWith('hi')) {
      return SarvamBridgeService.FILLERS_BY_LANG['hi-IN'];
    }
    if (lang.startsWith('en')) {
      return SarvamBridgeService.FILLERS_BY_LANG['en-IN'];
    }
    return ['hmm', 'ji'];
  }

  private static async prefetchFillers(
    callUuid: string,
    sarvamApiKey: string,
    language: string,
    voice: string
  ): Promise<void> {
    const texts = SarvamBridgeService.getFillersForLanguage(language);
    
    await Promise.all(
      texts.map(async (text) => {
        const cacheKey = `${language}:${voice}:${text}`;
        if (SarvamBridgeService.fillerCache.has(cacheKey)) return;

        try {
          logger.info(`[SarvamBridge][${callUuid}] Pre-synthesizing filler "${text}" for key ${cacheKey}`);
          
          const res = await axios.post(SARVAM_TTS_REST_URL, {
            inputs: [text],
            target_language_code: language,
            speaker: voice,
            model: 'bulbul:v3',
            speech_sample_rate: 8000,
            output_audio_codec: 'mulaw',
            enable_preprocessing: true
          }, {
            headers: { 'Content-Type': 'application/json', 'Api-Subscription-Key': sarvamApiKey },
            httpsAgent: keepAliveAgent,
            timeout: 10000
          });

          const b64Audio = res.data?.audios?.[0];
          if (!b64Audio) {
            logger.warn(`[SarvamBridge][${callUuid}] Pre-synthesizing filler "${text}" failed: no audio in response`);
            return;
          }
          const mulawBuf = SarvamBridgeService.toMulaw(Buffer.from(b64Audio, 'base64'));
          SarvamBridgeService.fillerCache.set(cacheKey, mulawBuf);
          logger.info(`[SarvamBridge][${callUuid}] Pre-synthesized and cached filler "${text}" (${mulawBuf.length} mulaw bytes)`);
        } catch (e: any) {
          logger.warn(`[SarvamBridge][${callUuid}] Failed to pre-synthesize filler "${text}": ${e.message}`);
        }
      })
    );
  }

  private static playFillerIfAvailable(
    callUuid: string,
    plivoWs: WebSocket,
    language: string,
    voice: string
  ): void {
    const texts = SarvamBridgeService.getFillersForLanguage(language);
    const available = texts.filter(text => {
      const cacheKey = `${language}:${voice}:${text}`;
      return SarvamBridgeService.fillerCache.has(cacheKey);
    });

    if (available.length === 0) {
      logger.info(`[SarvamBridge][${callUuid}] No pre-synthesized fillers available in cache for ${language}:${voice}`);
      return;
    }

    const randomText = available[Math.floor(Math.random() * available.length)];
    const cacheKey = `${language}:${voice}:${randomText}`;
    const fillerBuf = SarvamBridgeService.fillerCache.get(cacheKey)!;

    logger.info(`[SarvamBridge][${callUuid}] Playing filler: "${randomText}" (${fillerBuf.length} mulaw bytes)`);
    
    SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, fillerBuf);
  }

  /** Play a filler only if the reply's first audio is still not ready after FILLER_DELAY_MS. */
  private static scheduleFiller(callUuid: string, plivoWs: WebSocket, language: string, voice: string): void {
    SarvamBridgeService.cancelFiller(plivoWs);
    (plivoWs as any).sarvamFillerTimer = setTimeout(() => {
      (plivoWs as any).sarvamFillerTimer = null;
      const st: ConvState = (plivoWs as any).sarvamState;
      if (st === 'THINKING' && !(plivoWs as any).sarvamIsPacing) {
        SarvamBridgeService.playFillerIfAvailable(callUuid, plivoWs, language, voice);
      }
    }, FILLER_DELAY_MS);
  }

  private static cancelFiller(plivoWs: WebSocket): void {
    const t = (plivoWs as any).sarvamFillerTimer;
    if (t) { clearTimeout(t); (plivoWs as any).sarvamFillerTimer = null; }
  }

  // ── Language codes ─────────────────────────────────────────────────────────
  private static readonly LANG_MAP: Record<string, string> = {
    'hi': 'hi-IN', 'en': 'en-IN', 'bn': 'bn-IN', 'ta': 'ta-IN',
    'te': 'te-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'mr': 'mr-IN',
    'pa': 'pa-IN', 'gu': 'gu-IN', 'od': 'od-IN', 'ur': 'ur-IN',
  };

  /** 'hi' | 'hi-IN' | 'HI-in' → 'hi-IN'; unknown → null */
  private static normalizeLang(raw: string | undefined | null): string | null {
    if (!raw) return null;
    const base = raw.split('-')[0].toLowerCase();
    if (SarvamBridgeService.LANG_MAP[base]) return SarvamBridgeService.LANG_MAP[base];
    return raw.includes('-') ? raw : null;
  }

  // ── TTS cache ──────────────────────────────────────────────────────────────
  private static readonly ttsCache = new Map<string, Buffer>();

  private static cacheTts(key: string, buf: Buffer): void {
    const c = SarvamBridgeService.ttsCache;
    if (c.size >= TTS_CACHE_MAX) {
      const oldest = c.keys().next().value;
      if (oldest !== undefined) c.delete(oldest);
    }
    c.set(key, buf);
  }

  // ── Normalise a Sarvam TTS payload to raw μ-law 8 kHz ─────────────────────
  // With output_audio_codec=mulaw the API returns raw μ-law or a WAV container
  // (format 7). If it still returns WAV PCM16 (format 1), convert it here.
  private static toMulaw(buf: Buffer): Buffer {
    if (buf.length > 44 && buf.subarray(0, 4).toString('ascii') === 'RIFF') {
      const fmt = buf.readUInt16LE(20);
      const body = buf.subarray(44);
      if (fmt === 7) return body;
      if (fmt === 1) {
        const out = Buffer.alloc(body.length >> 1);
        for (let i = 0; i < out.length; i++) out[i] = SarvamBridgeService.lin2ulaw(body.readInt16LE(i * 2));
        return out;
      }
    }
    return buf;
  }

  // ── What the caller actually heard ─────────────────────────────────────────
  /** Record that sentence `idx` was queued for playback (for barge-in history + echo guard). */
  private static noteSpoken(plivoWs: WebSocket, idx: number): void {
    const text: string | undefined = (plivoWs as any).sarvamSentenceText?.get(idx);
    if (text) SarvamBridgeService.noteSpokenText(plivoWs, text);
  }

  private static noteSpokenText(plivoWs: WebSocket, text: string): void {
    const turn: number = (plivoWs as any).sarvamTurnId ?? 0;
    const byTurn: Map<number, string> | undefined = (plivoWs as any).sarvamSpokenByTurn;
    if (byTurn) byTurn.set(turn, ((byTurn.get(turn) || '') + ' ' + text).trim());
    const last = (((plivoWs as any).sarvamLastAgentText || '') + ' ' + text);
    (plivoWs as any).sarvamLastAgentText = last.length > 600 ? last.slice(-600) : last;
  }

  /**
   * Streamed TTS audio → paced Plivo playback. Chunks from the socket are not
   * 20 ms aligned, so keep a remainder and only emit whole 160-byte frames;
   * `flush` pads the tail at sentence end.
   */
  private static pushStreamAudio(callUuid: string, plivoWs: WebSocket, buf: Buffer, flush: boolean): void {
    if ((plivoWs as any).sarvamState === 'TERMINATED') return;
    const pending = Buffer.concat([(plivoWs as any).sarvamStreamRemainder || Buffer.alloc(0), buf]);
    const whole = pending.length - (pending.length % MULAW_CHUNK_BYTES);
    let out = pending.subarray(0, whole);
    let rest = pending.subarray(whole);
    if (flush && rest.length) {
      out = Buffer.concat([out, rest, Buffer.alloc(MULAW_CHUNK_BYTES - rest.length, 0xff)]);
      rest = Buffer.alloc(0);
    }
    (plivoWs as any).sarvamStreamRemainder = Buffer.from(rest);
    if (!out.length) return;

    (plivoWs as any).sarvamReplyAudioQueued = true;
    SarvamBridgeService.cancelFiller(plivoWs);
    const st: ConvState = (plivoWs as any).sarvamState;
    if (st === 'THINKING') {
      SarvamBridgeService.setState(callUuid, plivoWs, 'SPEAKING');
      (plivoWs as any).sarvamIsSpeaking = true;
    }
    SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, out);
  }

  /** Queue every completed sentence whose turn has come (REST/cached path keeps strict order). */
  private static drainCompletedAudio(callUuid: string, plivoWs: WebSocket): void {
    const completedAudio = (plivoWs as any).sarvamCompletedAudio as Map<number, Buffer> | undefined;
    if (!completedAudio) return;
    let nextIdx: number = (plivoWs as any).sarvamNextPlayIdx ?? 0;
    while (completedAudio.has(nextIdx)) {
      const nextBuf = completedAudio.get(nextIdx)!;
      completedAudio.delete(nextIdx);
      SarvamBridgeService.cancelFiller(plivoWs);
      SarvamBridgeService.noteSpoken(plivoWs, nextIdx);
      (plivoWs as any).sarvamReplyAudioQueued = true;

      logger.info(`[SarvamBridge][${callUuid}] Queueing s${nextIdx} for paced playback`);
      const st: ConvState = (plivoWs as any).sarvamState;
      if (st === 'THINKING') {
        SarvamBridgeService.setState(callUuid, plivoWs, 'SPEAKING');
        (plivoWs as any).sarvamIsSpeaking = true;
      }
      SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, nextBuf);
      nextIdx++;
    }
    (plivoWs as any).sarvamNextPlayIdx = nextIdx;
  }

  /** True when a transcript is mostly the agent's own recent words (handset/PSTN echo). */
  private static looksLikeEcho(transcript: string, agentText: string): boolean {
    // Strip punctuation only (no \p{..} classes: tsconfig has no ES6 target for the `u` flag)
    const norm = (t: string) => t.toLowerCase().replace(/[.,!?;:"'()[\]{}\-–—…।|/]+/g, ' ').split(/\s+/).filter(Boolean);
    const words = norm(transcript);
    if (words.length < 5 || !agentText) return false;
    const recent = new Set(norm(agentText).slice(-60));
    const hits = words.filter(w => recent.has(w)).length;
    // Nearly every word must be ours — a caller confirming a number they just heard is not echo
    return hits / words.length >= 0.9;
  }


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
      const st: ConvState = (plivoWs as any).sarvamState;
      if (st === 'SPEAKING') {
        SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
        (plivoWs as any).sarvamIsSpeaking = false;
        logger.info(`[SarvamBridge][${callUuid}] Audio queue drained → LISTENING`);
        SarvamBridgeService.finishTurnActions(callUuid, plivoWs);
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

  // ── End-of-turn side effects (after the reply audio drained) ─────────────
  /** A pending transfer wins over end_call; otherwise honour end_call. */
  private static finishTurnActions(callUuid: string, plivoWs: WebSocket): void {
    const target = (plivoWs as any).sarvamPendingTransfer as string | null | undefined;
    if (target) {
      (plivoWs as any).sarvamPendingTransfer = null;
      (plivoWs as any).sarvamTriggeredEndCall = false;
      SarvamBridgeService.runTransfer(callUuid, plivoWs, target);
      return;
    }
    if ((plivoWs as any).sarvamTriggeredEndCall) {
      logger.info(`[SarvamBridge][${callUuid}] End call triggered by agent - hanging up...`);
      const callId = (plivoWs as any).sarvamCallId;
      if (callId) {
        PlivoCallService.endCall(callId).catch((err: any) => {
          logger.error(`[SarvamBridge][${callUuid}] Failed to execute endCall: ${err.message}`);
        });
      }
    }
  }

  /** Plivo Update Call → Dial XML + Stop Stream. On success the stream closes and the session ends; on failure the caller is told and the call continues. */
  private static runTransfer(callUuid: string, plivoWs: WebSocket, target: string): void {
    if ((plivoWs as any).sarvamTransferStarted) return;
    (plivoWs as any).sarvamTransferStarted = true;
    const cfg = ((plivoWs as any).sarvamAgentConfig || {}) as SarvamAgentConfig;
    logger.info(`[SarvamBridge][${callUuid}] Executing transfer → ${target}`);
    executePlivoTransfer({
      callUuid, plivoCredentialId: cfg.plivoCredentialId, fromNumber: cfg.fromNumber, toNumber: cfg.toNumber,
      callDirection: cfg.callDirection, targetNumber: target,
    }).then(result => {
      if (result.success) {
        SarvamBridgeService.setState(callUuid, plivoWs, 'TERMINATED');
        void markCallTransferred(callUuid, target);
        return;
      }
      (plivoWs as any).sarvamTransferStarted = false;
      const tts = (plivoWs as any).sarvamTtsParams as { sarvamApiKey: string; voice: string } | undefined;
      const lang: string = (plivoWs as any).sarvamActiveLang || 'hi-IN';
      const apology = lang.startsWith('en')
        ? 'Sorry, I could not connect you right now. How else can I help?'
        : 'माफ़ कीजिए, अभी कनेक्ट नहीं हो पाया। मैं और कैसे मदद कर सकती हूँ?';
      (plivoWs as any).sarvamTranscriptLines?.push(`Agent: ${apology}`);
      if (tts && (plivoWs as any).sarvamState !== 'TERMINATED') {
        SarvamBridgeService.speakViaTTS(callUuid, plivoWs, apology, tts.sarvamApiKey, lang, tts.voice).catch(() => {});
      }
    });
  }

  // ── State machine helper ──────────────────────────────────────────────────
  private static setState(callUuid: string, plivoWs: WebSocket, next: ConvState): void {
    const prev: ConvState = (plivoWs as any).sarvamState ?? 'LISTENING';
    if (prev === 'TERMINATED') return;
    if (!VALID_TRANSITIONS[prev].includes(next)) {
      logger.warn(`[SarvamBridge][${callUuid}] Unexpected state: ${prev} → ${next}`);
    }
    (plivoWs as any).sarvamState = next;
  }

  // ── Full barge-in interrupt ───────────────────────────────────────────────
  private static interruptAI(callUuid: string, plivoWs: WebSocket): void {
    const prev: ConvState = (plivoWs as any).sarvamState ?? 'LISTENING';
    if (prev === 'LISTENING' || prev === 'TERMINATED') return;
    // The transfer was already decided; the caller talking over the announcement must not lose it
    if ((plivoWs as any).sarvamPendingTransfer) {
      const target = (plivoWs as any).sarvamPendingTransfer as string;
      (plivoWs as any).sarvamPendingTransfer = null;
      (plivoWs as any).sarvamTriggeredEndCall = false;
      SarvamBridgeService.runTransfer(callUuid, plivoWs, target);
    }

    // 1. Abort in-flight GPT fetch
    const ctrl = (plivoWs as any).sarvamAbortController as AbortController | null;
    if (ctrl) {
      ctrl.abort();
      (plivoWs as any).sarvamAbortController = null;
    }

    // Abort master controller (greeting/background pipeline)
    const masterCtrl = (plivoWs as any).sarvamMasterAbortController as AbortController | null;
    if (masterCtrl) {
      masterCtrl.abort();
      (plivoWs as any).sarvamMasterAbortController = null;
    }

    SarvamBridgeService.cancelFiller(plivoWs);

    // Clear any pending VAD timer
    if ((plivoWs as any).sarvamVadTimer) {
      clearTimeout((plivoWs as any).sarvamVadTimer);
      (plivoWs as any).sarvamVadTimer = null;
    }

    // 2. Stop audio pacing and drain queue (and anything Sarvam is still synthesising)
    SarvamBridgeService.stopPacing(plivoWs);
    (plivoWs as any).sarvamTts?.abort();
    (plivoWs as any).sarvamStreamRemainder = Buffer.alloc(0);

    // Clear completed audio buffers
    if ((plivoWs as any).sarvamCompletedAudio) {
      (plivoWs as any).sarvamCompletedAudio.clear();
    }
    (plivoWs as any).sarvamNextPlayIdx = 0;

    // 3. Tell Plivo to discard its audio buffer
    if (plivoWs.readyState === WebSocket.OPEN) {
      plivoWs.send(JSON.stringify({ event: 'clearAudio' }));
    }

    // 4. Bump turnId — stale .then() callbacks drop their replies
    (plivoWs as any).sarvamTurnId = ((plivoWs as any).sarvamTurnId ?? 0) + 1;
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

  // ── Get Groq API key ──────────────────────────────────────────────────────
  private static async getGroqApiKey(): Promise<string | null> {
    try {
      const [row] = await db
        .select({ value: globalSettings.value })
        .from(globalSettings)
        .where(eq(globalSettings.key, 'groq_api_key'))
        .limit(1);
      return (row?.value as string) || null;
    } catch {
      return null;
    }
  }

  // ── Gender detection from voice ───────────────────────────────────────────
  private static getGenderFromVoice(voice: string): 'female' | 'male' {
    const v = SARVAM_VOICES.find(x => x.id === (voice || '').toLowerCase());
    return v?.gender === 'Male' ? 'male' : 'female';
  }

  /** Legacy ids saved by older builds (bulbul:v2 or never valid) → the nearest bulbul:v3 speaker. */
  private static readonly LEGACY_SPEAKERS: Record<string, string> = {
    meera: 'priya', anushka: 'priya', maya: 'priya', maitreyi: 'roopa', kalpana: 'priya', pavithra: 'priya',
    vinaya: 'priya', manisha: 'priya', vidya: 'priya', arya: 'priya',
    arvind: 'shubh', aarav: 'shubh', neel: 'shubh', amol: 'shubh', abhilash: 'shubh', karun: 'shubh', hitesh: 'shubh',
  };

  static resolveSpeaker(rawVoice: string): string {
    const id = (rawVoice || '').toLowerCase();
    if (SARVAM_VOICES.some(v => v.id === id)) return id;
    return SarvamBridgeService.LEGACY_SPEAKERS[id] || 'priya';
  }

  // ── System prompt wrapper ─────────────────────────────────────────────────
  // Deliberately short: long rule lists (and lists of banned words) make the
  // model repeat itself and over-use fillers. Fillers are handled in audio.
  private static buildWrapper(systemPrompt: string, voice: string, language: string, detectLanguage = false, knowledge: string | null = null, hasTools = false, actionRules = ''): string {
    const langNames: Record<string, string> = {
      'hi': 'Hindi/Hinglish', 'en': 'English', 'bn': 'Bengali', 'ta': 'Tamil',
      'te': 'Telugu', 'kn': 'Kannada', 'ml': 'Malayalam', 'mr': 'Marathi',
      'pa': 'Punjabi', 'gu': 'Gujarati', 'od': 'Odia', 'ur': 'Urdu',
    };
    const prefix = (language || '').split('-')[0].toLowerCase();
    const langName = langNames[prefix] || 'Hindi/Hinglish';
    const isEnglish = prefix === 'en';
    const gender = SarvamBridgeService.getGenderFromVoice(voice);

    // The voice engine reads native script naturally and mispronounces romanised text ("Namaste, main aapki…")
    const scriptRule = '- Write every non-English word in its native script (Devanagari for Hindi, Tamil script for Tamil, and so on). Never romanise. English words, names and brands may stay in English letters.';
    const languageRule = detectLanguage
      ? `- Reply in the language the caller used in their last message (${langName} by default). If they switch language, switch with them.\n${scriptRule}`
      : isEnglish
        ? '- Speak only in natural spoken English. Do not mix in Hindi words.'
        : `- Speak only in everyday spoken ${langName}, the way people actually talk on the phone. No formal or textbook words.\n${scriptRule}`;
    const genderRule = isEnglish ? '' : (gender === 'female'
      ? '\n- You are a female assistant: use feminine forms ("main karti hoon").'
      : '\n- You are a male assistant: use masculine forms ("main karta hoon").');

    return `You are on a live phone call. Sound like a real person, never like a bot or an announcement.
${languageRule}${genderRule}
- Keep every reply to one or two short sentences (under 25 words). Ask at most one question per turn.
- Do not start replies with the same word each time, and never repeat what you just said unless asked.
- ONLY talk about the job described below. If the caller asks about anything else — general knowledge, news, jokes, maths, coding, other companies or products, personal opinions — do NOT answer it. Say in one short sentence that you can only help with this, then bring the conversation back to the job. Never invent policies, prices or details that are not written below.
- Confirm important details (names, dates, numbers) briefly before moving on.
- Never read out template text or variable names.
- When the conversation is complete or the caller says goodbye, say a short goodbye and call end_call.${hasTools ? `
- Tools: confirm the details with the caller in one sentence before sending, booking or saving; call each tool at most once per request; after the result, tell the caller the outcome briefly.` : ''}${actionRules ? `
${actionRules}` : ''}

Your role & goal:
${systemPrompt}${knowledge ? `

Knowledge base — facts for this call. Answer from these when relevant, in your own short spoken words (never read them out verbatim). If the caller asks something these do not cover, say you will check and get back to them — never guess:
${knowledge}` : ''}`;
  }

  // ── TTS: WebSocket stream first, REST fallback ─────────────────────────────
  // Streamed chunks play while the sentence is still being synthesised; cached
  // sentences (greeting, fillers) play instantly when nothing else is queued.
  private static async speakViaTTS(
    callUuid: string,
    plivoWs: WebSocket,
    text: string,
    sarvamApiKey: string,
    language: string,
    voice: string,
    signal?: AbortSignal,
    perf?: PerfTimer,
    sentenceIdx?: number
  ): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (sentenceIdx !== undefined) (plivoWs as any).sarvamSentenceText?.set(sentenceIdx, trimmed);

    if (perf && sentenceIdx !== undefined) perf.mark(`TTS_START_${sentenceIdx}`);

    try {
      const cacheKey = `${language}:${voice}:${trimmed}`;
      let mulawBuf = SarvamBridgeService.ttsCache.get(cacheKey);

      // A cached sentence may only play instantly when it is the next one due and nothing is streaming
      const stream: SarvamTtsStream | undefined = (plivoWs as any).sarvamTts;
      const nextDue: number = (plivoWs as any).sarvamNextPlayIdx ?? 0;
      const instantOk = !!mulawBuf && (!stream || stream.pendingCount() === 0) && (sentenceIdx === undefined || sentenceIdx === nextDue);
      if (stream && stream.isReady() && !instantOk) {
        stream.configure(language || 'hi-IN', voice || 'priya');
        try {
          await stream.speak(trimmed, signal);
          if (perf && sentenceIdx !== undefined) {
            perf.mark(`TTS_DONE_${sentenceIdx}`);
            perf.log(`TTS_START_${sentenceIdx}`, `TTS_DONE_${sentenceIdx}`);
          }
          if (sentenceIdx !== undefined) {
            // Streamed audio is already queued in order; release any later cached/REST sentence
            (plivoWs as any).sarvamNextPlayIdx = Math.max((plivoWs as any).sarvamNextPlayIdx ?? 0, sentenceIdx + 1);
            SarvamBridgeService.drainCompletedAudio(callUuid, plivoWs);
          }
          return;
        } catch (e: any) {
          if (e.name === 'AbortError' || signal?.aborted) return;
          logger.warn(`[SarvamBridge][${callUuid}] TTS stream failed (s${sentenceIdx}), REST fallback: ${e.message}`);
        }
      }

      if (!mulawBuf) {
        const res = await axios.post(SARVAM_TTS_REST_URL, {
          inputs: [trimmed],
          target_language_code: language || 'hi-IN',
          speaker: voice || 'priya',
          model: 'bulbul:v3',
          speech_sample_rate: 8000,
          output_audio_codec: 'mulaw',
          enable_preprocessing: true
        }, {
          headers: { 'Content-Type': 'application/json', 'Api-Subscription-Key': sarvamApiKey },
          httpsAgent: keepAliveAgent,
          signal,
          timeout: 10000
        });

        // Check abort AFTER request returns
        if (signal?.aborted) return;

        const b64Audio = res.data?.audios?.[0];
        if (!b64Audio) {
          logger.error(`[SarvamBridge][${callUuid}] TTS REST: no audio in response`);
          return;
        }
        mulawBuf = SarvamBridgeService.toMulaw(Buffer.from(b64Audio, 'base64'));
        SarvamBridgeService.cacheTts(cacheKey, mulawBuf);
      }

      if (signal?.aborted) return;

      if (perf && sentenceIdx !== undefined) {
        perf.mark(`TTS_DONE_${sentenceIdx}`);
        perf.log(`TTS_START_${sentenceIdx}`, `TTS_DONE_${sentenceIdx}`);
      }

      logger.info(`[SarvamBridge][${callUuid}] TTS (s${sentenceIdx}): ${mulawBuf.length} mulaw bytes synthesized`);

      if (sentenceIdx !== undefined) {
        const completedAudio = (plivoWs as any).sarvamCompletedAudio as Map<number, Buffer>;
        if (completedAudio) {
          completedAudio.set(sentenceIdx, mulawBuf);
        }

        SarvamBridgeService.drainCompletedAudio(callUuid, plivoWs);
      } else {
        // Fallback for calls without index (e.g. legacy/fillers)
        const st: ConvState = (plivoWs as any).sarvamState;
        if (st === 'THINKING') {
          SarvamBridgeService.setState(callUuid, plivoWs, 'SPEAKING');
          (plivoWs as any).sarvamIsSpeaking = true;
        }
        SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, mulawBuf);
      }

    } catch (e: any) {
      if (e.name === 'AbortError') return; // normal barge-in cancellation
      logger.error(`[SarvamBridge][${callUuid}] TTS error: ${e.message}`);
    }
  }

  // ── GPT-4o-mini streaming → per-sentence TTS ─────────────────────────────
  private static async streamGPTAndSpeak(
    callUuid: string,
    plivoWs: WebSocket,
    openaiApiKey: string,
    systemPrompt: string,
    history: ChatMessage[],
    sarvamApiKey: string,
    language: string,
    voice: string,
    signal: AbortSignal,
    perf: PerfTimer,
    openaiModel?: string,
    detectLanguage = false,
    knowledge: string | null = null,
    tools: CallTool[] = [],
    depth = 0,
    sentenceIdxStart = 0
  ): Promise<string> {
    // depth 0: fresh turn (system + trimmed chat history). depth > 0: the tool follow-up pass,
    // where `history` already carries the system prompt, the assistant tool_calls and tool results.
    const actionRules = depth === 0 && tools.length > 0 ? actionPromptRules(tools, (plivoWs as any).sarvamActionsTimeZone) : '';
    const messages: ChatMessage[] = depth === 0
      ? [{ role: 'system', content: SarvamBridgeService.buildWrapper(systemPrompt, voice, language, detectLanguage, knowledge, tools.length > 0, actionRules) },
         ...history.slice(-HISTORY_MAX_MESSAGES)]
      : history;

    perf.mark('GPT_START');

    const url = 'https://api.openai.com/v1/chat/completions';
    const authHeader = `Bearer ${openaiApiKey}`;
    // Realtime model ids (from legacy call records) are not valid for chat/completions
    const model = (openaiModel && !openaiModel.includes('realtime')) ? openaiModel : 'gpt-4o-mini';

    logger.info(`[SarvamBridge][${callUuid}] OpenAI Model: ${model}, Language: ${language}, Messages: ${messages.length}`);

    const isReasoningModel = model.includes('gpt-5') || model.startsWith('o1') || model.startsWith('o3');

    const requestBody: any = {
      model,
      messages,
      stream: true,
      tools: [
        {
          type: 'function',
          function: {
            name: 'end_call',
            description: 'Call this function to disconnect/hang up the call when the conversation is complete, after you have said goodbye or the user has confirmed they are done.'
          }
        },
        ...tools.map(t => t.definition)
      ]
    };

    if (isReasoningModel) {
      // max_completion_tokens covers reasoning + visible output, so keep reasoning minimal
      // on a live phone call — otherwise the budget is spent thinking and content comes back empty
      requestBody.max_completion_tokens = 400;
      if (model.includes('gpt-5')) {
        requestBody.reasoning_effort = 'minimal';
        requestBody.verbosity = 'low';
      } else {
        requestBody.reasoning_effort = 'low'; // o-series: 'minimal'/'verbosity' are rejected
      }
      // Reasoning models do not support custom temperature, frequency_penalty or presence_penalty
    } else {
      // Heavy penalties on Hinglish suppress common necessary words → odd phrasing.
      requestBody.max_tokens = 200;
      requestBody.temperature = 0.6;
      requestBody.frequency_penalty = 0.2;
      requestBody.presence_penalty = 0.2;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}: ${await response.text()}`);

    const reader    = response.body!.getReader();
    const decoder   = new TextDecoder();
    let buffer      = '';
    let fullReply   = '';
    let sentenceBuf = '';
    let sentenceIdx = sentenceIdxStart;
    let firstToken  = false;
    // Streamed tool_calls arrive as deltas keyed by index (id once, name/arguments in pieces)
    const toolCallAcc = new Map<number, StreamedToolCall>();

    // Collect all TTS promises to await at end
    const ttsTasks: Promise<void>[] = [];

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
            
            // Check for tool calls (specifically end_call)
            const toolCalls = chunk.choices?.[0]?.delta?.tool_calls;
            if (toolCalls && toolCalls.length > 0) {
              accumulateToolCallDeltas(toolCallAcc, toolCalls);
              for (const tc of toolCalls) {
                if (tc.function?.name) {
                  (plivoWs as any).sarvamToolNameBuf = ((plivoWs as any).sarvamToolNameBuf || '') + tc.function.name;
                }
              }
            }
            if ((plivoWs as any).sarvamToolNameBuf && (plivoWs as any).sarvamToolNameBuf.includes('end_call')) {
              (plivoWs as any).sarvamTriggeredEndCall = true;
            }

            const token = chunk.choices?.[0]?.delta?.content || '';
            if (!token) continue;

            if (!firstToken) {
              firstToken = true;
              perf.mark('GPT_FIRST_TOKEN');
              perf.log('GPT_START', 'GPT_FIRST_TOKEN');
            }

            fullReply   += token;
            sentenceBuf += token;

            // Check for sentence/clause boundaries or connecting words
            let splitText = '';
            let remainingText = '';
            
            const match = sentenceBuf.match(/^([\s\S]*[।.!?,\n])([\s\S]*)$/);
            if (match) {
              const sentence = match[1];
              // Avoid sending tiny fragments (like 1-2 words) on comma breaks to prevent weird speech pacing
              if (sentence.endsWith(',') && sentence.split(/\s+/).length < 5) {
                // Do not split on comma yet, wait for next token
              } else {
                splitText = sentence;
                remainingText = match[2] || '';
              }
            } else {
              // No punctuation yet: don't let one breath run too long before TTS starts.
              // (Never split right after a conjunction — TTS pronounces "...aur" as a dangling fragment.)
              const words = sentenceBuf.split(/\s+/);
              if (words.length > 22) {
                splitText = words.slice(0, 18).join(' ');
                remainingText = words.slice(18).join(' ');
              }
            }

            if (splitText && !signal.aborted) {
              sentenceBuf = remainingText;
              const idx = sentenceIdx++;
              // Fire TTS immediately — do NOT await (keeps reading GPT tokens)
              const task = SarvamBridgeService.speakViaTTS(
                callUuid, plivoWs, splitText,
                sarvamApiKey, language, voice,
                signal, perf, idx
              ).catch(e => {
                if (!signal.aborted) logger.error(`[SarvamBridge][${callUuid}] TTS s${idx}: ${e.message}`);
              });
              ttsTasks.push(task);
            }
          } catch { /* ignore malformed SSE */ }
        }
      }

      // Flush remaining buffer
      if (sentenceBuf.trim() && !signal.aborted) {
        perf.mark('GPT_DONE');
        const idx = sentenceIdx++; // keep sentenceIdx = next free slot for the tool filler / follow-up pass
        const task = SarvamBridgeService.speakViaTTS(
          callUuid, plivoWs, sentenceBuf,
          sarvamApiKey, language, voice,
          signal, perf, idx
        );
        ttsTasks.push(task.catch(e => {
          if (!signal.aborted) logger.error(`[SarvamBridge][${callUuid}] TTS s${idx}: ${e.message}`);
        }));
      } else {
        perf.mark('GPT_DONE');
      }
      // REST-fallback sentences finish out of order — only hand back to LISTENING once all are queued
      await Promise.all(ttsTasks);

      perf.log('GPT_START', 'GPT_DONE');
      perf.summary('STT_FINAL');

    } finally {
      reader.cancel().catch(() => {});
    }

    // Empty reply (e.g. tool-call only) must not be replaced by text the caller never heard
    if (signal.aborted) return '';
    const firstPass = fullReply.trim();

    // ── Tool loop: run the collected messaging tools, then let the model tell the caller the outcome ──
    // end_call is handled by name above; only real tools go through the handlers. Max depth 2.
    const pending = [...toolCallAcc.values()].filter(tc => tc.name && tc.name !== 'end_call');
    if (pending.length === 0 || tools.length === 0 || depth >= 2) return firstPass;

    logger.info(`[SarvamBridge][${callUuid}] Running ${pending.length} tool call(s) at depth ${depth}: ${pending.map(t => t.name).join(', ')}`);
    const execution = executeStreamedToolCalls(callUuid, pending, tools);
    // Nothing spoken yet this turn → a short filler covers the round trip
    if (!(plivoWs as any).sarvamReplyAudioQueued) {
      const filler = toolFillerText(language, SarvamBridgeService.getGenderFromVoice(voice));
      await SarvamBridgeService.speakViaTTS(callUuid, plivoWs, filler, sarvamApiKey, language, voice, signal, perf, sentenceIdx++)
        .catch(() => {});
    }
    const executed = await execution;
    // A transfer is performed once the follow-up sentence has been spoken; it wins over end_call
    const transferTo = pendingTransferTarget(executed);
    if (transferTo) {
      (plivoWs as any).sarvamPendingTransfer = transferTo;
      (plivoWs as any).sarvamTriggeredEndCall = false;
      logger.info(`[SarvamBridge][${callUuid}] Transfer pending → ${transferTo} (after the reply is spoken)`);
    }
    if (signal.aborted) return firstPass;

    const followUp = await SarvamBridgeService.streamGPTAndSpeak(
      callUuid, plivoWs, openaiApiKey, systemPrompt,
      [...messages, ...buildToolRoundMessages(firstPass, executed)],
      sarvamApiKey, language, voice, signal, perf,
      openaiModel, detectLanguage, knowledge, tools, depth + 1, sentenceIdx
    );
    return [firstPass, followUp].filter(Boolean).join(' ');
  }

  // ── Fire first message ────────────────────────────────────────────────────
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
      logger.info(`[SarvamBridge][${callUuid}] First message (${fullMsg.length} chars)`);
      chatHistory.push({ role: 'assistant', content: fullMsg });
      transcriptLines.push(`Agent: ${fullMsg}`);
      SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');

      // Split into sentences — clean regex, reliable on Hindi + English
      const allSents = fullMsg
        .split(/(?<=[।.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      const sentences = allSents.length > 0 ? allSents : [fullMsg];

      // Fire ALL sentence TTS calls in parallel — audio pacing queue (sentenceIdx)
      // ensures correct playback order even if API responses arrive out of order
      if (!signal.aborted && plivoWs.readyState === WebSocket.OPEN) {
        await Promise.all(
          sentences.map((s, i) =>
            SarvamBridgeService.speakViaTTS(
              callUuid, plivoWs, s,
              sarvamApiKey, language, voice,
              signal, perf, i
            ).catch(e => logger.error(`[SarvamBridge][${callUuid}] First msg s${i}: ${e.message}`))
          )
        );
      }
    } else {
      logger.info(`[SarvamBridge][${callUuid}] No firstMessage — GPT greeting`);
      SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');
      try {
        const reply = await SarvamBridgeService.streamGPTAndSpeak(
          callUuid, plivoWs, agentConfig.openaiApiKey,
          agentConfig.systemPrompt, [],
          sarvamApiKey, language, voice, signal, perf,
          agentConfig.openaiModel
        );
        if (reply && !signal.aborted) {
          chatHistory.push({ role: 'assistant', content: reply });
          transcriptLines.push(`Agent: ${reply}`);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          const fallback = language.startsWith('en')
            ? 'Hello! How can I help you today?'
            : 'नमस्ते! मैं आपकी कैसे मदद कर सकती हूँ?';
          logger.warn(`[SarvamBridge][${callUuid}] GPT greeting failed: ${e.message}`);
          chatHistory.push({ role: 'assistant', content: fallback });
          transcriptLines.push(`Agent: ${fallback}`);
          await SarvamBridgeService.speakViaTTS(
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
    agentConfig: SarvamAgentConfig,
    callId?: string
  ): Promise<void> {
    logger.info(`[SarvamBridge][${callUuid}] Initializing session`);

    const sarvamApiKey = await SarvamBridgeService.getSarvamApiKey();
    if (!sarvamApiKey) {
      logger.error(`[SarvamBridge][${callUuid}] No Sarvam API key — aborting`);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      return;
    }

    const language = SarvamBridgeService.normalizeLang(agentConfig.language || 'hi-IN') || 'hi-IN';

    // Any bulbul:v3 speaker from the shared list is valid; legacy/unknown ids map to a same-gender v3 voice
    const rawVoice = (agentConfig.voice || 'priya').toLowerCase();
    const voice = SarvamBridgeService.resolveSpeaker(rawVoice);
    logger.info(`[SarvamBridge][${callUuid}] language=${language} voice=${voice}`);

    // ── Per-call state ────────────────────────────────────────────────────────
    (plivoWs as any).sarvamAudioQueue           = [];
    (plivoWs as any).sarvamCompletedAudio       = new Map<number, Buffer>();
    (plivoWs as any).sarvamNextPlayIdx          = 0;
    (plivoWs as any).sarvamIsPacing             = false;
    (plivoWs as any).sarvamPacingTimer          = null;
    (plivoWs as any).sarvamIsSpeaking           = false;
    (plivoWs as any).isSarvam                   = true;
    (plivoWs as any).sarvamState                = 'LISTENING' as ConvState;
    (plivoWs as any).sarvamAbortController      = null as AbortController | null;
    (plivoWs as any).sarvamVadTimer             = null as NodeJS.Timeout | null;
    (plivoWs as any).sarvamTurnId               = 0;
    (plivoWs as any).sarvamRealAudioStarted     = false;
    (plivoWs as any).sarvamCallId               = callId;
    (plivoWs as any).sarvamTriggeredEndCall     = false;
    (plivoWs as any).sarvamToolNameBuf          = '';
    (plivoWs as any).sarvamActiveLang           = language;
    (plivoWs as any).sarvamSentenceText         = new Map<number, string>();
    (plivoWs as any).sarvamSpokenByTurn         = new Map<number, string>();
    (plivoWs as any).sarvamLastAgentText        = '';
    (plivoWs as any).sarvamFillerTimer          = null as NodeJS.Timeout | null;
    (plivoWs as any).sarvamStreamRemainder      = Buffer.alloc(0);
    (plivoWs as any).sarvamReplyAudioQueued     = false;
    (plivoWs as any).sarvamPendingTransfer      = null as string | null;
    (plivoWs as any).sarvamTransferStarted      = false;
    (plivoWs as any).sarvamAgentConfig          = agentConfig;
    (plivoWs as any).sarvamActionsTimeZone      = agentConfig.actionsTimeZone;
    (plivoWs as any).sarvamTtsParams            = { sarvamApiKey, voice };

    const transcriptLines: string[] = [];
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    // Chunks load in the background while the greeting plays; the first caller turn finds them ready
    const knowledge = SarvamKnowledge.create(callUuid, agentConfig.userId, agentConfig.knowledgeBaseIds);
    if (knowledge) void knowledge.preload();
    (plivoWs as any).sarvamTranscriptLines = transcriptLines;
    (plivoWs as any).sarvamCallStartTime   = Date.now();

    const masterCtrl = new AbortController();
    (plivoWs as any).sarvamMasterAbortController = masterCtrl;

    try {
      // ── TTS stream (opens in parallel with STT; REST is the fallback) ─────
      const tts = new SarvamTtsStream(callUuid, sarvamApiKey, language, voice, {
        onAudio: (buf) => SarvamBridgeService.pushStreamAudio(callUuid, plivoWs, buf, false),
        onSentenceStart: (text) => SarvamBridgeService.noteSpokenText(plivoWs, text),
        onSentenceDone: (text, audio) => {
          SarvamBridgeService.pushStreamAudio(callUuid, plivoWs, Buffer.alloc(0), true);
          if (audio.length) {
            const lang = (plivoWs as any).sarvamActiveLang || language;
            SarvamBridgeService.cacheTts(`${lang}:${voice}:${text}`, audio);
          }
        },
      });
      (plivoWs as any).sarvamTts = tts;
      tts.open().catch(e => logger.warn(`[SarvamBridge][${callUuid}] TTS stream unavailable, using REST: ${e.message}`));

      // ── Fire greeting (non-blocking) ─────────────────────────────────────
      const greetPerf = new PerfTimer(`${callUuid}:greeting`);
      greetPerf.mark('GREETING_START');
      SarvamBridgeService.fireFirstMessage(
        callUuid, plivoWs, agentConfig,
        sarvamApiKey, language, voice,
        chatHistory, transcriptLines,
        masterCtrl.signal, greetPerf
      ).then(() => greetPerf.summary('GREETING_START'))
       .catch(e => {
         if (e.name !== 'AbortError') logger.error(`[SarvamBridge][${callUuid}] Greeting error: ${e.message}`);
       });

      // Start prefetching fillers in the background
      SarvamBridgeService.prefetchFillers(callUuid, sarvamApiKey, language, voice).catch(e => {
        logger.error(`[SarvamBridge][${callUuid}] Filler prefetch error: ${e.message}`);
      });

      // ── STT WebSocket (realtime) ──────────────────────────────────────────
      // encoding=mulaw → Plivo frames pass through untouched (no PCM decode per 20 ms)
      // language_code=auto → every final carries the detected language
      // endpointing=vad + silence_duration_ms → end of turn ~450 ms after the caller stops
      const sttUrl = [
        SARVAM_STT_URL,
        `?language_code=${agentConfig.detectLanguage ? 'auto' : language}`,
        `&model=saaras:v3-realtime`,
        `&mode=transcribe`,
        `&encoding=mulaw`,
        `&sample_rate=8000`,
        `&endpointing=vad`,
        `&silence_duration_ms=450`,
        `&threshold=0.3`,
        `&min_speech_duration_ms=250`,
        `&stream_type=fast`,
      ].join('');

      const sttWs = new WebSocket(sttUrl, {
        headers: { 'api-subscription-key': sarvamApiKey }
      });
      (plivoWs as any).sarvamSttWs = sttWs;

      sttWs.on('open', () => {
        logger.info(`[SarvamBridge][${callUuid}] STT WebSocket opened`);

        // Silence keepalive: STT expects continuous audio at 20ms intervals.
        // Send PCM16 silence until first real Plivo audio arrives.
        // This prevents STT from timing out during the greeting phase.
        // 20 ms of μ-law silence (0xFF) until the first real Plivo frame arrives
        const SILENCE_MSG = SarvamBridgeService.sttAudioFrame(Buffer.alloc(MULAW_CHUNK_BYTES, 0xff).toString('base64'));
        const keepAlive = setInterval(() => {
          if (sttWs.readyState === WebSocket.OPEN) {
            if (!(plivoWs as any).sarvamRealAudioStarted) {
              sttWs.send(SILENCE_MSG);
            }
          } else {
            clearInterval(keepAlive);
          }
        }, 20);
        (plivoWs as any).sarvamKeepAlive = keepAlive;
        logger.info(`[SarvamBridge][${callUuid}] STT keepalive started (silence until real audio)`);
      });

      sttWs.on('message', async (raw: Buffer | string) => {
        try {
          if (raw instanceof Buffer && raw[0] !== 123) return; // not JSON
          const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));
          const event: string = String(msg.event || msg.type || '');

          // ── VAD: caller started speaking → early barge-in (150 ms debounce) ──
          const legacySignal = msg.type === 'events' ? String(msg.data?.signal_type || '') : '';
          if (event === 'vad.speech_start' || legacySignal === 'speech_start' || legacySignal === 'START_SPEECH') {
            const st: ConvState = (plivoWs as any).sarvamState;
            if ((st === 'SPEAKING' || st === 'THINKING') && !(plivoWs as any).sarvamVadTimer) {
              (plivoWs as any).sarvamVadTimer = setTimeout(() => {
                (plivoWs as any).sarvamVadTimer = null;
                const cur: ConvState = (plivoWs as any).sarvamState;
                if (cur === 'SPEAKING' || cur === 'THINKING') {
                  logger.info(`[SarvamBridge][${callUuid}] VAD barge-in (state: ${cur})`);
                  SarvamBridgeService.interruptAI(callUuid, plivoWs);
                }
              }, 150);
            }
            return;
          }
          if (event === 'error') {
            logger.error(`[SarvamBridge][${callUuid}] STT error event: ${JSON.stringify(msg).substring(0, 300)}`);
            return;
          }
          // Only finals drive a turn (partials are informational)
          const isFinal = event === 'transcript.final' || (!event.startsWith('transcript.') && !!(msg.data?.transcript ?? msg.transcript));
          if (!isFinal) return;
          const transcript = String(msg.text ?? msg.data?.transcript ?? msg.transcript ?? '').trim();
          if (!transcript) return;

          const st: ConvState = (plivoWs as any).sarvamState;
          if (st === 'TERMINATED') return; // transferred or torn down: no further turns
          // Our own voice coming back through the handset must not become a "user" turn
          if (st === 'SPEAKING' && SarvamBridgeService.looksLikeEcho(transcript, (plivoWs as any).sarvamLastAgentText || '')) {
            logger.info(`[SarvamBridge][${callUuid}] Ignoring echo of agent speech: "${transcript.substring(0, 60)}"`);
            return;
          }
          if (st === 'SPEAKING' || st === 'THINKING') {
            SarvamBridgeService.interruptAI(callUuid, plivoWs);
          }

          // What the caller heard from the turn we just cut off goes in BEFORE their new line,
          // otherwise the model never sees its own half-sentence and repeats it.
          {
            const prevTurn: number = (plivoWs as any).sarvamTurnId ?? 0;
            const byTurn: Map<number, string> | undefined = (plivoWs as any).sarvamSpokenByTurn;
            const spoken = prevTurn > 0 ? (byTurn?.get(prevTurn) || '').trim() : '';
            byTurn?.delete(prevTurn);
            if (spoken) {
              chatHistory.push({ role: 'assistant', content: `${spoken} — (interrupted by caller)` });
              transcriptLines.push(`Agent (interrupted): ${spoken}`);
            }
          }

          // Follow the caller's language when the agent has detection enabled
          if (agentConfig.detectLanguage && typeof msg.language === 'string' && msg.language) {
            const conf = typeof msg.language_confidence === 'number' ? msg.language_confidence : 1;
            const detected = SarvamBridgeService.normalizeLang(msg.language);
            if (conf >= 0.75 && detected && detected !== (plivoWs as any).sarvamActiveLang) {
              logger.info(`[SarvamBridge][${callUuid}] Caller language → ${detected} (conf ${conf.toFixed(2)})`);
              (plivoWs as any).sarvamActiveLang = detected;
            }
          }
          const activeLang: string = (plivoWs as any).sarvamActiveLang || language;

          const perf = new PerfTimer(callUuid);
          perf.mark('STT_FINAL');
          logger.info(`[SarvamBridge][${callUuid}] User: "${transcript.substring(0, 80)}"`);

          transcriptLines.push(`User: ${transcript}`);
          chatHistory.push({ role: 'user', content: transcript });
          const historyCopy = [...chatHistory];

          SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');
          if ((plivoWs as any).sarvamCompletedAudio) (plivoWs as any).sarvamCompletedAudio.clear();
          (plivoWs as any).sarvamNextPlayIdx  = 0;
          (plivoWs as any).sarvamSentenceText = new Map<number, string>();
          (plivoWs as any).sarvamToolNameBuf  = '';
          (plivoWs as any).sarvamReplyAudioQueued = false;
          (plivoWs as any).sarvamLastAgentText    = '';

          const turnId = ++(plivoWs as any).sarvamTurnId;
          const spokenByTurn: Map<number, string> = (plivoWs as any).sarvamSpokenByTurn;
          spokenByTurn.set(turnId, '');
          const ctrl = new AbortController();
          (plivoWs as any).sarvamAbortController = ctrl;

          // Filler only if the first sentence is slow (avoids "achha… achha ji" on every turn)
          SarvamBridgeService.scheduleFiller(callUuid, plivoWs, activeLang, voice);

          // Whatever the caller actually heard before interrupting goes into history,
          // otherwise the model repeats the whole sentence on the next turn.
          const recordInterrupted = () => {
            const spoken = (spokenByTurn.get(turnId) || '').trim();
            spokenByTurn.delete(turnId);
            if (spoken) {
              chatHistory.push({ role: 'assistant', content: `${spoken} — (interrupted by caller)` });
              transcriptLines.push(`Agent (interrupted): ${spoken}`);
            }
          };

          const kbLookup: Promise<string | null> = knowledge
            ? knowledge.retrieve(transcript, ctrl.signal).then(ctx => { perf.mark('KB_DONE'); perf.log('STT_FINAL', 'KB_DONE'); return ctx; })
            : Promise.resolve(null);

          kbLookup.then(kbContext => SarvamBridgeService.streamGPTAndSpeak(
            callUuid, plivoWs,
            agentConfig.openaiApiKey,
            agentConfig.systemPrompt,
            historyCopy,
            sarvamApiKey, activeLang, voice,
            ctrl.signal, perf,
            agentConfig.openaiModel,
            !!agentConfig.detectLanguage,
            kbContext,
            agentConfig.tools || []
          )).then(reply => {
            if ((plivoWs as any).sarvamTurnId !== turnId) { recordInterrupted(); return; }
            spokenByTurn.delete(turnId);
            if (reply) {
              logger.info(`[SarvamBridge][${callUuid}] Agent (t${turnId}): "${reply.substring(0, 80)}"`);
              transcriptLines.push(`Agent: ${reply}`);
              chatHistory.push({ role: 'assistant', content: reply });
            }
            // Only reply audio keeps us in SPEAKING (paceNext hands back to LISTENING when it drains);
            // a filler that is still playing must not swallow the LISTENING transition or end_call.
            if (!(plivoWs as any).sarvamReplyAudioQueued || !(plivoWs as any).sarvamIsPacing) {
              SarvamBridgeService.cancelFiller(plivoWs);
              if (!(plivoWs as any).sarvamReplyAudioQueued) SarvamBridgeService.stopPacing(plivoWs);
              SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
              SarvamBridgeService.finishTurnActions(callUuid, plivoWs);
            }
          }).catch(err => {
            if (err.name === 'AbortError') {
              logger.info(`[SarvamBridge][${callUuid}] GPT turn ${turnId} aborted`);
              recordInterrupted();
            } else {
              logger.error(`[SarvamBridge][${callUuid}] GPT turn ${turnId} error: ${err.message}`);
              spokenByTurn.delete(turnId);
            }
            if ((plivoWs as any).sarvamTurnId === turnId) {
              SarvamBridgeService.cancelFiller(plivoWs);
              SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
            }
          });

        } catch (e: any) {
          logger.error(`[SarvamBridge][${callUuid}] STT message error: ${e.message}`);
        }
      });

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
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
    }
  }

  /** Forward Plivo μ-law 8 kHz → Sarvam STT */
  static handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): void {
    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (!sttWs || sttWs.readyState !== WebSocket.OPEN) return;

    if (!(plivoWs as any).sarvamRealAudioStarted) {
      (plivoWs as any).sarvamRealAudioStarted = true;
      const ka = (plivoWs as any).sarvamKeepAlive;
      if (ka) { clearInterval(ka); (plivoWs as any).sarvamKeepAlive = null; }
      logger.info(`[SarvamBridge][${callUuid}] First real Plivo audio — silence keepalive stopped`);
    }

    // Plivo already delivers μ-law 8 kHz — forward the base64 payload as-is
    sttWs.send(SarvamBridgeService.sttAudioFrame(payload));
  }

  /** End session — returns transcript and duration */
  static endSession(plivoWs: WebSocket): { duration: number; transcript: string } {
    const masterCtrl = (plivoWs as any).sarvamMasterAbortController as AbortController | null;
    if (masterCtrl) masterCtrl.abort();

    SarvamBridgeService.setState('call_end', plivoWs, 'TERMINATED');
    SarvamBridgeService.stopPacing(plivoWs);
    SarvamBridgeService.cancelFiller(plivoWs);
    (plivoWs as any).sarvamTts?.close();

    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (sttWs && (sttWs.readyState === WebSocket.OPEN || sttWs.readyState === WebSocket.CONNECTING)) {
      try { sttWs.close(); } catch { /* ignore */ }
    }

    const ka = (plivoWs as any).sarvamKeepAlive;
    if (ka) { clearInterval(ka); (plivoWs as any).sarvamKeepAlive = null; }

    const lines: string[] = (plivoWs as any).sarvamTranscriptLines || [];
    const startMs: number = (plivoWs as any).sarvamCallStartTime   || Date.now();
    return { duration: Math.round((Date.now() - startMs) / 1000), transcript: lines.join('\n') };
  }
}
