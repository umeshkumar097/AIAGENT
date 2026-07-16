import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';
import { db } from '../../../db';
import { globalSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';
import https from 'https';
import axios from 'axios';
import { PlivoCallService } from './plivo-call.service';

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

// ── Sarvam STT endpoint ───────────────────────────────────────────────────────
const SARVAM_STT_URL = 'wss://api.sarvam.ai/speech-to-text/ws';
// NOTE: TTS uses REST, NOT WebSocket — WS endpoint returns MP3 which requires
// additional decoding. REST returns base64 WAV/PCM8k directly.
const SARVAM_TTS_REST_URL = 'https://api.sarvam.ai/text-to-speech';

// ── Conversation state machine ─────────────────────────────────────────────────
type ConvState = 'LISTENING' | 'THINKING' | 'SPEAKING' | 'INTERRUPTED' | 'TERMINATED';

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

  // ── Pre-built STT message templates (avoids JSON.stringify per chunk) ────────
  private static readonly STT_MSG_PREFIX = '{"audio":{"data":"';
  private static readonly STT_MSG_SUFFIX = '","encoding":"audio/wav","sample_rate":8000}}';

  // ── Smart Fillers cache & config ───────────────────────────────────────────
  private static readonly fillerCache = new Map<string, Buffer>();

  private static readonly FILLERS_BY_LANG: Record<string, string[]> = {
    'hi-IN': ['ji', 'achha', 'hmm', 'theek hai'],
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
            enable_preprocessing: true
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Api-Subscription-Key': sarvamApiKey
            },
            httpsAgent: keepAliveAgent,
            timeout: 10000
          });

          const json = res.data;
          const b64Audio = json.audios?.[0];
          if (!b64Audio) {
            logger.warn(`[SarvamBridge][${callUuid}] Pre-synthesizing filler "${text}" failed: no audio in response`);
            return;
          }

          const wavBuf  = Buffer.from(b64Audio, 'base64');
          const pcmBuf  = wavBuf.subarray(44);

          // Convert PCM16 LE 8kHz → μ-law 8kHz
          const mulawBuf = Buffer.alloc(pcmBuf.length / 2);
          for (let i = 0; i < mulawBuf.length; i++) {
            mulawBuf[i] = SarvamBridgeService.lin2ulaw(pcmBuf.readInt16LE(i * 2));
          }

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
        
        // Handle end call trigger after speaking goodbye
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

    // 1. Abort in-flight GPT fetch
    const ctrl = (plivoWs as any).sarvamAbortController as AbortController | null;
    if (ctrl) {
      ctrl.abort();
      (plivoWs as any).sarvamAbortController = null;
    }

    // Clear any pending VAD timer
    if ((plivoWs as any).sarvamVadTimer) {
      clearTimeout((plivoWs as any).sarvamVadTimer);
      (plivoWs as any).sarvamVadTimer = null;
    }

    // 2. Stop audio pacing and drain queue
    SarvamBridgeService.stopPacing(plivoWs);

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
    const femaleVoices = ['priya', 'meera', 'kavya', 'anushka', 'manisha', 'vidya', 'maya'];
    return femaleVoices.includes((voice || '').toLowerCase()) ? 'female' : 'male';
  }

  // ── System prompt wrapper ─────────────────────────────────────────────────
  private static buildWrapper(systemPrompt: string, voice: string): string {
    const gender = SarvamBridgeService.getGenderFromVoice(voice);
    const selfRef = gender === 'female'
      ? 'Main ek female assistant hoon — "main karti hoon", "mujhe lagta hai" etc. use karo.'
      : 'Main ek male assistant hoon — "main karta hoon", "mujhe lagta hai" etc. use karo.';
    return `CONVERSATIONAL RULES (CRITICAL - YOU ARE ON A LIVE VOICE PHONE CALL):
- ALWAYS speak like a natural human. Never sound like an AI, robot, news reader, or automated voice response.
- Use natural spoken language (spoken colloquial style) for whatever language you are speaking (Hindi, English, Hinglish, or any regional language).
- BANNED ROBOTIC/FORMAL STYLE: Strictly avoid formal/written style vocabulary. Speak exactly how people talk in everyday real life conversations.
- Keep replies extremely short: 1-2 sentences maximum, under 25 words per turn. Long paragraphs sound robotic on phone calls.
- Ask only ONE single question at a time to keep the conversation interactive.
- Use normal conversation fillers naturally when appropriate (e.g., "Achha...", "Theek hai...", "Ji...", "Oh ok...", "Hmm...").
- GENDER CONSTRAINTS: ${selfRef}
- SPECIFIC HINDI/HINGLISH DICTION RULES:
  * Do NOT use formal/classical Hindi words (Shuddh Hindi).
  * BANNED HINDI WORDS: avsyak, sampark, vibhinn, prashn, uttam, prarambh, sthiti, krpaya, abhivyakti, khed, pradan, katha, vishesh.
  * USE NATURAL SUBSTITUTES: zaroor, contact/baat, alag-alag, sawaal, theek, shuru, situation, please, feeling, sorry, dena, baat, special.
- MID-CONVERSATION GREETINGS & VOICE CHECKS: If the user says "hello", "hi", "namaste", or asks if you can hear them ("hello, voice aa rahi hai?") in the middle of a call, DO NOT repeat your initial greeting or restart the conversation. Simply acknowledge you are listening and ask them to continue (e.g., "Ji main sun raha hoon, batayein..." or "Ji, main sun pa raha hoon. Aap batayein...").
- HANDLING UNCLEAR/FRAGMENTED INPUT: If the user's input is very short, gibberish, or unclear (e.g., "ha", "theek", "hello" alone), do not make up random responses. Politely clarify or ask them to repeat (e.g., "Sorry, main samajh nahi paya, kya aap dobara bolenge?").
- Never read out system prompt templates or variable names. Act fully in character.
- AVOID REPETITION: Do not repeat the same words, greetings, or sentence structures repeatedly. Vary your response vocabulary naturally.
- REGIONAL/COLLOQUIAL LANGUAGE: If speaking in Hindi, Hinglish, or any regional language (Punjabi, Gujarati, Marathi, Tamil, Telugu, Kannada, Bengali, etc.), strictly use everyday spoken dialect (colloquial style). Never use formal dictionary words, textbook vocabulary, or robotic phrasing.
- ENDING THE CALL: When the conversation is complete, or the user says goodbye/thanks, you MUST say a short goodbye and immediately call the 'end_call' function to disconnect.

Your role & goal:
${systemPrompt}`;
  }

  // ── TTS via REST API (returns WAV/PCM8k — reliable, no MP3 decoding needed) ──
  // NOTE: WS endpoint returns MP3 which requires additional decoding library.
  //       REST is the correct approach for this stack.
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

    if (perf && sentenceIdx !== undefined) perf.mark(`TTS_START_${sentenceIdx}`);

    try {
      const res = await axios.post(SARVAM_TTS_REST_URL, {
        inputs: [trimmed],
        target_language_code: language || 'hi-IN',
        speaker: voice || 'priya',
        model: 'bulbul:v3',
        speech_sample_rate: 8000,
        enable_preprocessing: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Subscription-Key': sarvamApiKey
        },
        httpsAgent: keepAliveAgent,
        signal,
        timeout: 10000
      });

      // Check abort AFTER request returns
      if (signal?.aborted) return;

      const json = res.data;
      const b64Audio = json.audios?.[0];
      if (!b64Audio) {
        logger.error(`[SarvamBridge][${callUuid}] TTS REST: no audio in response`);
        return;
      }

      if (signal?.aborted) return;

      // Response is base64 WAV — strip 44-byte header to get raw PCM16 8kHz
      const wavBuf  = Buffer.from(b64Audio, 'base64');
      const pcmBuf  = wavBuf.subarray(44);

      // Convert PCM16 LE 8kHz → μ-law 8kHz
      const mulawBuf = Buffer.alloc(pcmBuf.length / 2);
      for (let i = 0; i < mulawBuf.length; i++) {
        mulawBuf[i] = SarvamBridgeService.lin2ulaw(pcmBuf.readInt16LE(i * 2));
      }

      if (perf && sentenceIdx !== undefined) {
        perf.mark(`TTS_DONE_${sentenceIdx}`);
        perf.log(`TTS_START_${sentenceIdx}`, `TTS_DONE_${sentenceIdx}`);
      }

      logger.info(`[SarvamBridge][${callUuid}] TTS: ${mulawBuf.length} mulaw bytes → Plivo`);

      // Transition THINKING → SPEAKING on first sentence audio
      const st: ConvState = (plivoWs as any).sarvamState;
      if (st === 'THINKING') {
        SarvamBridgeService.setState(callUuid, plivoWs, 'SPEAKING');
        (plivoWs as any).sarvamIsSpeaking = true;
      }

      SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, mulawBuf);

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

    const groqApiKey = await SarvamBridgeService.getGroqApiKey();
    const url = groqApiKey ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
    const authHeader = groqApiKey ? `Bearer ${groqApiKey}` : `Bearer ${openaiApiKey}`;
    const model = groqApiKey ? 'llama-3.1-8b-instant' : 'gpt-4o-mini';

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 60,       // Keep it under 20 words for faster generation
        temperature: 0.3,     // Higher consistency, faster tokens processing
        frequency_penalty: 0.5, // Reduces verbal loops
        presence_penalty: 0.6,  // Encourages model to get to the point
        stream: true,
        tools: [
          {
            type: 'function',
            function: {
              name: 'end_call',
              description: 'Call this function to disconnect/hang up the call when the conversation is complete, after you have said goodbye or the user has confirmed they are done.'
            }
          }
        ]
      }),
      signal
    });
    if (!response.ok) throw new Error(`${groqApiKey ? 'Groq' : 'OpenAI'} ${response.status}: ${await response.text()}`);

    const reader    = response.body!.getReader();
    const decoder   = new TextDecoder();
    let buffer      = '';
    let fullReply   = '';
    let sentenceBuf = '';
    let sentenceIdx = 0;
    let firstToken  = false;

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
              // Check if word count exceeds 8 and we have a connecting word/sub-clause boundary (aur, lekin, and, but)
              const words = sentenceBuf.split(/\s+/);
              if (words.length > 8) {
                const connectingWords = ['aur', 'lekin', 'and', 'but', 'और', 'लेकिन'];
                const idx = words.findIndex((w, i) => {
                  if (i === 0 || i === words.length - 1) return false; // don't split at very beginning or end
                  const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
                  return connectingWords.includes(clean);
                });
                if (idx !== -1) {
                  splitText = words.slice(0, idx + 1).join(' ');
                  remainingText = words.slice(idx + 1).join(' ');
                }
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
        const task = SarvamBridgeService.speakViaTTS(
          callUuid, plivoWs, sentenceBuf,
          sarvamApiKey, language, voice,
          signal, perf, sentenceIdx
        );
        ttsTasks.push(task);
        await task;
      } else {
        perf.mark('GPT_DONE');
      }

      perf.log('GPT_START', 'GPT_DONE');
      perf.summary('STT_FINAL');

    } finally {
      reader.cancel().catch(() => {});
    }

    return signal.aborted ? '' : (fullReply.trim() || 'Kuch samajh nahi aaya, kripya dobara bolein.');
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
          sarvamApiKey, language, voice, signal, perf
        );
        if (reply && !signal.aborted) {
          chatHistory.push({ role: 'assistant', content: reply });
          transcriptLines.push(`Agent: ${reply}`);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          const fallback = 'Namaste! Main aapki kaise madad kar sakta hoon?';
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

    const LANG_MAP: Record<string, string> = {
      'hi': 'hi-IN', 'en': 'en-IN', 'bn': 'bn-IN', 'ta': 'ta-IN',
      'te': 'te-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'mr': 'mr-IN',
      'pa': 'pa-IN', 'gu': 'gu-IN', 'od': 'od-IN', 'ur': 'ur-IN',
    };
    const rawLang  = agentConfig.language || 'hi-IN';
    const language = LANG_MAP[rawLang] ?? (rawLang.includes('-') ? rawLang : 'hi-IN');

    const BULBUL_V3_VOICES = ['priya'];
    const rawVoice = (agentConfig.voice || 'priya').toLowerCase();
    const VOICE_MAP: Record<string, string> = {
      'anushka': 'priya', 'manisha': 'priya', 'vidya': 'priya',
      'arya': 'priya',    'karun': 'priya',   'hitesh': 'priya',
      'abhilash': 'priya','meera': 'priya',   'maya': 'priya',
      'raj': 'priya',     'ravi': 'priya',
    };
    const voice = BULBUL_V3_VOICES.includes(rawVoice) ? rawVoice : (VOICE_MAP[rawVoice] || 'priya');
    logger.info(`[SarvamBridge][${callUuid}] language=${language} voice=${voice}`);

    // ── Per-call state ────────────────────────────────────────────────────────
    (plivoWs as any).sarvamAudioQueue           = [];
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

    const transcriptLines: string[] = [];
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    (plivoWs as any).sarvamTranscriptLines = transcriptLines;
    (plivoWs as any).sarvamCallStartTime   = Date.now();

    const masterCtrl = new AbortController();
    (plivoWs as any).sarvamMasterAbortController = masterCtrl;

    try {
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

      // ── STT WebSocket ─────────────────────────────────────────────────────
      // vad_signals=true  → receive START_SPEECH events for early barge-in
      // high_vad_sensitivity=true → 0.5s silence threshold (was ~1s, saves 400-500ms)
      const sttUrl = [
        SARVAM_STT_URL,
        `?language-code=${language}`,
        `&model=saaras:v3`,
        `&mode=transcribe`,
        `&sample_rate=8000`,
        `&input_audio_codec=pcm_s16le`,
        `&vad_signals=true`,
        `&high_vad_sensitivity=true`,
      ].join('');

      const sttWs = new WebSocket(sttUrl, {
        headers: { 'Api-Subscription-Key': sarvamApiKey }
      });
      (plivoWs as any).sarvamSttWs = sttWs;

      sttWs.on('open', () => {
        logger.info(`[SarvamBridge][${callUuid}] STT WebSocket opened`);

        // Silence keepalive: STT expects continuous audio at 20ms intervals.
        // Send PCM16 silence until first real Plivo audio arrives.
        // This prevents STT from timing out during the greeting phase.
        const SILENCE_PCM = Buffer.alloc(320, 0); // 20ms silence at 8kHz
        const SILENCE_B64 = SILENCE_PCM.toString('base64');
        const SILENCE_MSG = JSON.stringify({
          audio: { data: SILENCE_B64, encoding: 'audio/wav', sample_rate: 8000 }
        });
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

          // VAD barge-in: fires ~100-200ms after speech onset
          if (msg.type === 'user_started_speaking' || msg.type === 'START_SPEECH') {
            const st: ConvState = (plivoWs as any).sarvamState;
            if (st === 'SPEAKING' || st === 'THINKING') {
              // Debounce VAD trigger by 150ms to ensure it is actual speech and not static pop noise
              if (!(plivoWs as any).sarvamVadTimer) {
                (plivoWs as any).sarvamVadTimer = setTimeout(() => {
                  (plivoWs as any).sarvamVadTimer = null;
                  const currentSt: ConvState = (plivoWs as any).sarvamState;
                  if (currentSt === 'SPEAKING' || currentSt === 'THINKING') {
                    logger.info(`[SarvamBridge][${callUuid}] Confirmed VAD barge-in (state: ${currentSt})`);
                    SarvamBridgeService.interruptAI(callUuid, plivoWs);
                  }
                }, 150);
              }
            }
            return;
          }

          // Final transcript
          const transcript = msg.data?.transcript || msg.transcript || msg.data?.text;
          if (!transcript || !transcript.trim()) return;

          const st: ConvState = (plivoWs as any).sarvamState;
          if (st === 'SPEAKING' || st === 'THINKING') {
            SarvamBridgeService.interruptAI(callUuid, plivoWs);
          }

          const perf = new PerfTimer(callUuid);
          perf.mark('STT_FINAL');
          logger.info(`[SarvamBridge][${callUuid}] User: "${transcript.substring(0, 80)}"`);

          transcriptLines.push(`User: ${transcript}`);
          chatHistory.push({ role: 'user', content: transcript });
          const historyCopy = [...chatHistory];

          SarvamBridgeService.setState(callUuid, plivoWs, 'THINKING');
          
          // Play a smart filler (e.g., "Hmm...", "Achha...") immediately to mask latency
          SarvamBridgeService.playFillerIfAvailable(callUuid, plivoWs, language, voice);

          const turnId = ++(plivoWs as any).sarvamTurnId;
          const ctrl   = new AbortController();
          (plivoWs as any).sarvamAbortController = ctrl;

          // NON-BLOCKING: returns immediately, new STT messages can be processed
          SarvamBridgeService.streamGPTAndSpeak(
            callUuid, plivoWs,
            agentConfig.openaiApiKey,
            agentConfig.systemPrompt,
            historyCopy,
            sarvamApiKey, language, voice,
            ctrl.signal, perf
          ).then(reply => {
            const currentTurn = (plivoWs as any).sarvamTurnId;
            if (currentTurn !== turnId) {
              if (reply) {
                logger.info(`[SarvamBridge][${callUuid}] Interrupted reply saved to history (turn ${turnId} < ${currentTurn}): "${reply.substring(0, 80)}"`);
                chatHistory.push({ role: 'assistant', content: reply });
                transcriptLines.push(`Agent (partial): ${reply}`);
              }
              return;
            }
            if (reply) {
              logger.info(`[SarvamBridge][${callUuid}] Agent (t${turnId}): "${reply.substring(0, 80)}"`);
              transcriptLines.push(`Agent: ${reply}`);
              chatHistory.push({ role: 'assistant', content: reply });
            }
            if (!(plivoWs as any).sarvamIsPacing) {
              SarvamBridgeService.setState(callUuid, plivoWs, 'LISTENING');
              
              if ((plivoWs as any).sarvamTriggeredEndCall) {
                logger.info(`[SarvamBridge][${callUuid}] End call triggered by agent (no pending audio) - hanging up...`);
                const callId = (plivoWs as any).sarvamCallId;
                if (callId) {
                  PlivoCallService.endCall(callId).catch((err: any) => {
                    logger.error(`[SarvamBridge][${callUuid}] Failed to execute endCall: ${err.message}`);
                  });
                }
              }
            }
          }).catch(err => {
            if (err.name === 'AbortError') {
              logger.info(`[SarvamBridge][${callUuid}] GPT turn ${turnId} aborted`);
            } else {
              logger.error(`[SarvamBridge][${callUuid}] GPT turn ${turnId} error: ${err.message}`);
            }
            if ((plivoWs as any).sarvamTurnId === turnId) {
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
      logger.info(`[SarvamBridge][${callUuid}] First real Plivo audio — silence keepalive stops`);
    }

    const mulawBuf = Buffer.from(payload, 'base64');
    const pcmBuf   = SarvamBridgeService.mulaw8k_to_pcm16_8k(mulawBuf);
    // Pre-built template — avoids JSON.stringify on every 20ms audio chunk
    sttWs.send(
      SarvamBridgeService.STT_MSG_PREFIX +
      pcmBuf.toString('base64') +
      SarvamBridgeService.STT_MSG_SUFFIX
    );
  }

  /** End session — returns transcript and duration */
  static endSession(plivoWs: WebSocket): { duration: number; transcript: string } {
    const masterCtrl = (plivoWs as any).sarvamMasterAbortController as AbortController | null;
    if (masterCtrl) masterCtrl.abort();

    SarvamBridgeService.setState('call_end', plivoWs, 'TERMINATED');
    SarvamBridgeService.stopPacing(plivoWs);

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
