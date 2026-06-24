import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';
import { db } from '../../../db';
import { globalSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';

// ── Audio pacing config (same as ElevenLabs bridge) ─────────────────────────
const MULAW_CHUNK_BYTES = 160;   // 20ms at 8kHz
const MULAW_CHUNK_MS    = 20;

// ── Sarvam endpoints ─────────────────────────────────────────────────────────
const SARVAM_STT_URL = 'wss://api.sarvam.ai/speech-to-text/ws';
const SARVAM_TTS_URL = 'wss://api.sarvam.ai/text-to-speech/ws';

export interface SarvamAgentConfig {
  systemPrompt:  string;
  firstMessage?: string;
  language?:     string;
  voice?:        string;
  openaiApiKey:  string;
}

export class SarvamBridgeService {

  // ── mulaw decode table (G.711) ────────────────────────────────────────────
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

  // ── mulaw 8kHz → PCM16 8kHz ──────────────────────────────────────────────
  private static mulaw8k_to_pcm16_8k(src: Buffer): Buffer {
    const out = Buffer.alloc(src.length * 2);
    for (let i = 0; i < src.length; i++) {
      out.writeInt16LE(SarvamBridgeService.MULAW_DECODE[src[i]], i * 2);
    }
    return out;
  }

  // ── PCM16 any-rate → mulaw 8kHz ──────────────────────────────────────────
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
    if (!queue || queue.length === 0) { (plivoWs as any).sarvamIsPacing = false; return; }
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

  // ── Get Sarvam API key from DB ─────────────────────────────────────────────
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

  // ── GPT-4o-mini streaming → sentence-level TTS dispatch ──────────────────
  // Streams GPT response and fires TTS for each sentence as it completes.
  // This cuts latency by 50-70% — caller hears first sentence immediately.
  private static async streamGPTAndSpeak(
    callUuid: string,
    plivoWs: WebSocket,
    openaiApiKey: string,
    systemPrompt: string,
    history: { role: 'user' | 'assistant'; content: string }[],
    sarvamApiKey: string,
    language: string,
    voice: string
  ): Promise<string> {
    // Natural conversation wrapper — prevents scripted/verbatim system prompt reading
    const naturalWrapper = `IMPORTANT PHONE CALL RULES:\n- Tum ek REAL phone call pe ho — bilkul natural baat karo.\n- EK baar mein sirf 1-2 chhoti sentences bolo, max 30 words.\n- Ek hi sawaal poochho ek baar mein.\n- Script ki tarah mat parho — natural raho.\n- Pehle user ki baat ka jawab do, phir aage badho.\n\nYour role:\n${systemPrompt}`;
    const messages = [{ role: 'system' as const, content: naturalWrapper }, ...history];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 200, temperature: 0.7, stream: true })
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}: ${await response.text()}`);

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullReply = '';
    let sentenceBuffer = '';
    let firstSentence = true;
    (plivoWs as any).sarvamIsSpeaking = true;

    // Flush a sentence to TTS
    const flushSentence = async (sentence: string) => {
      const s = sentence.trim();
      if (!s) return;
      if (firstSentence) {
        logger.info(`[SarvamBridge] First sentence ready (${s.length}c), firing TTS immediately`);
        firstSentence = false;
      }
      await SarvamBridgeService.speakViaTTS(callUuid, plivoWs, s, sarvamApiKey, language, voice);
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const chunk = JSON.parse(data);
            const token = chunk.choices?.[0]?.delta?.content || '';
            if (!token) continue;
            fullReply += token;
            sentenceBuffer += token;
            // Check for sentence boundary
            const match = sentenceBuffer.match(/^(.*[।.!?\n])(.*)$/s);
            if (match) {
              const sentence = match[1];
              sentenceBuffer = match[2] || '';
              flushSentence(sentence).catch(e => logger.error(`[SarvamBridge] Sentence TTS err: ${e.message}`));
            }
          } catch {}
        }
      }
      // Flush remaining buffer
      if (sentenceBuffer.trim()) await flushSentence(sentenceBuffer);
    } finally {
      reader.cancel().catch(() => {});
      (plivoWs as any).sarvamIsSpeaking = false;
    }
    return fullReply.trim() || 'Kuch samajh nahi aaya, kripya dobara bolein.';
  }

  // ── Kept for first-message use (non-streaming) ─────────────────────────────
  private static async callGPT(
    openaiApiKey: string,
    systemPrompt: string,
    history: { role: 'user' | 'assistant'; content: string }[]
  ): Promise<string> {
    const naturalWrapper = `IMPORTANT PHONE CALL RULES:\n- Tum ek REAL phone call pe ho — bilkul natural baat karo.\n- EK baar mein sirf 1-2 chhoti sentences bolo, max 30 words.\n- Ek hi sawaal poochho ek baar mein.\n- Script ki tarah mat parho — natural raho.\n\nYour role:\n${systemPrompt}`;
    const messages = [{ role: 'system' as const, content: naturalWrapper }, ...history];
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 200, temperature: 0.7 })
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}: ${await response.text()}`);
    const data = await response.json() as any;
    return data.choices?.[0]?.message?.content?.trim() || 'Kuch samajh nahi aaya, kripya dobara bolein.';
  }

  // ── Play text via Sarvam TTS REST API → Plivo ─────────────────────────────
  // We use the REST API instead of WebSocket because REST supports PCM output
  // directly, while the WS endpoint returns MP3 which requires decoding.
  private static async speakViaTTS(
    callUuid: string,
    plivoWs: WebSocket,
    text: string,
    sarvamApiKey: string,
    language: string,
    voice: string
  ): Promise<void> {
    (plivoWs as any).sarvamIsSpeaking = true;
    try {
      logger.info(`[SarvamBridge] TTS REST call for "${text.substring(0, 50)}..." call ${callUuid}`);
      
      // Use REST API which supports wav/pcm output
      const res = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Subscription-Key': sarvamApiKey
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: language || 'hi-IN',
          speaker: voice || 'priya',
          model: 'bulbul:v3',
          speech_sample_rate: 8000,
          enable_preprocessing: true
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        logger.error(`[SarvamBridge] TTS REST failed: ${res.status} ${errText} for ${callUuid}`);
        return;
      }

      const json = await res.json() as any;
      const b64Audio = json.audios?.[0];
      if (!b64Audio) {
        logger.error(`[SarvamBridge] TTS REST no audio in response for ${callUuid}`);
        return;
      }

      // Response is base64 WAV — strip 44-byte WAV header to get raw PCM16 8kHz
      const wavBuf = Buffer.from(b64Audio, 'base64');
      const pcmBuf = wavBuf.subarray(44); // Skip WAV header
      
      logger.info(`[SarvamBridge] TTS got ${pcmBuf.length} PCM bytes, converting to mulaw for ${callUuid}`);
      
      // Convert PCM16 LE 8kHz → mulaw 8kHz
      const mulawBuf = Buffer.alloc(pcmBuf.length / 2);
      for (let i = 0; i < mulawBuf.length; i++) {
        mulawBuf[i] = SarvamBridgeService.lin2ulaw(pcmBuf.readInt16LE(i * 2));
      }
      
      logger.info(`[SarvamBridge] Sending ${mulawBuf.length} mulaw bytes to Plivo for ${callUuid}`);
      SarvamBridgeService.sendMulawPaced(callUuid, plivoWs, mulawBuf);
    } catch (e: any) {
      logger.error(`[SarvamBridge] TTS error: ${e.message} for ${callUuid}`);
    } finally {
      (plivoWs as any).sarvamIsSpeaking = false;
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
    logger.info(`[SarvamBridge] Init for call ${callUuid}`);

    const sarvamApiKey = await SarvamBridgeService.getSarvamApiKey();
    if (!sarvamApiKey) {
      logger.error(`[SarvamBridge] No Sarvam API key — aborting ${callUuid}`);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      return;
    }

    // ── Normalize language code for Sarvam (must be like 'hi-IN', 'en-IN', etc.) ──
    const LANG_MAP: Record<string, string> = {
      'hi': 'hi-IN', 'en': 'en-IN', 'bn': 'bn-IN', 'ta': 'ta-IN',
      'te': 'te-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'mr': 'mr-IN',
      'pa': 'pa-IN', 'gu': 'gu-IN', 'od': 'od-IN', 'ur': 'ur-IN',
    };
    const rawLang = agentConfig.language || 'hi-IN';
    const language = LANG_MAP[rawLang] ?? (rawLang.includes('-') ? rawLang : 'hi-IN');

    // ── Normalize voice for bulbul:v3 (priya is valid; map v2-only voices to priya) ──
    // bulbul:v3 valid speakers: priya (female), meera, kavya, etc.
    // bulbul:v2 voices (anushka/manisha/vidya/arya/karun/hitesh/abhilash) → map to priya
    const BULBUL_V3_VOICES = ['priya'];
    const rawVoice = (agentConfig.voice || 'priya').toLowerCase();
    // Map v2-only voices to their v3 equivalents
    const VOICE_MAP: Record<string, string> = {
      'anushka': 'priya', 'manisha': 'priya', 'vidya': 'priya',
      'arya': 'priya', 'karun': 'priya', 'hitesh': 'priya', 'abhilash': 'priya',
      'meera': 'priya', 'maya': 'priya', 'raj': 'priya', 'ravi': 'priya',
    };
    const voice = BULBUL_V3_VOICES.includes(rawVoice) ? rawVoice : (VOICE_MAP[rawVoice] || 'priya');
    logger.info(`[SarvamBridge] language=${language} voice=${voice} (raw: ${rawLang}/${rawVoice}) for ${callUuid}`);


    // Init plivoWs state
    (plivoWs as any).sarvamAudioQueue     = [];
    (plivoWs as any).sarvamIsPacing       = false;
    (plivoWs as any).sarvamPacingTimer    = null;
    (plivoWs as any).sarvamIsSpeaking     = false;
    (plivoWs as any).isSarvam             = true;

    const transcriptLines: string[] = [];
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    (plivoWs as any).sarvamTranscriptLines = transcriptLines;
    (plivoWs as any).sarvamCallStartTime   = Date.now();

    try {
      const sttUrl = `${SARVAM_STT_URL}?language-code=${language}&model=saaras:v3&mode=transcribe&sample_rate=8000&input_audio_codec=pcm_s16le`;
      const sttWs = new WebSocket(sttUrl, {
        headers: { 'Api-Subscription-Key': sarvamApiKey }
      });

      (plivoWs as any).sarvamSttWs = sttWs;

      sttWs.on('open', async () => {
        logger.info(`[SarvamBridge] STT WS open for call ${callUuid}`);

        // ── Keep STT alive with silence until real Plivo audio arrives ────────
        // Sarvam STT closes (1000) if no audio within ~500ms of opening
        // Format: { audio: { data: <base64>, encoding: "audio/wav", sample_rate: 8000 } }
        const SILENCE_B64 = Buffer.alloc(320, 0).toString('base64');
        const SILENCE_MSG = JSON.stringify({ audio: { data: SILENCE_B64, encoding: 'audio/wav', sample_rate: 8000 } });
        const keepAlive = setInterval(() => {
          if (sttWs.readyState === WebSocket.OPEN) {
            sttWs.send(SILENCE_MSG);
          } else {
            clearInterval(keepAlive);
          }
        }, 20);
        (plivoWs as any).sarvamKeepAlive = keepAlive;

        if (agentConfig.firstMessage) {
          const msg = agentConfig.firstMessage;
          chatHistory.push({ role: 'assistant', content: msg });
          transcriptLines.push(`Agent: ${msg}`);
          // Fire-and-forget — do NOT await so silence keeps flowing to STT
          SarvamBridgeService.speakViaTTS(callUuid, plivoWs, msg, sarvamApiKey, language, voice)
            .catch((e: Error) => logger.error(`[SarvamBridge] First msg TTS error: ${e.message}`));
        }
      });

      sttWs.on('message', async (raw: Buffer | string) => {
        try {
          if (raw instanceof Buffer && raw[0] !== 123) return;
          const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));

          // User started speaking → interrupt
          if (msg.type === 'user_started_speaking') {
            if ((plivoWs as any).sarvamIsSpeaking) {
              SarvamBridgeService.stopPacing(plivoWs);
              if (plivoWs.readyState === WebSocket.OPEN) plivoWs.send(JSON.stringify({ event: 'clearAudio' }));
              logger.info(`[SarvamBridge] Interrupted for call ${callUuid}`);
            }
            return;
          }

          const transcript = msg.data?.transcript || msg.transcript || msg.data?.text;
          if (!transcript || !transcript.trim()) return;

          logger.info(`[SarvamBridge] User: ${transcript}`);
          transcriptLines.push(`User: ${transcript}`);
          chatHistory.push({ role: 'user', content: transcript });

          if ((plivoWs as any).sarvamIsSpeaking) return; // debounce

          try {
            // Stream GPT + sentence-level TTS for low latency
            const reply = await SarvamBridgeService.streamGPTAndSpeak(
              callUuid, plivoWs,
              agentConfig.openaiApiKey,
              agentConfig.systemPrompt,
              chatHistory,
              sarvamApiKey, language, voice
            );
            logger.info(`[SarvamBridge] Agent (full): ${reply.substring(0, 80)}`);
            transcriptLines.push(`Agent: ${reply}`);
            chatHistory.push({ role: 'assistant', content: reply });
          } catch (gptErr: any) {
            logger.error(`[SarvamBridge] GPT error: ${gptErr.message}`);
          }
        } catch (e: any) {
          logger.error(`[SarvamBridge] STT msg error: ${e.message}`);
        }
      });

      sttWs.on('close', (code, reason) => {
        logger.info(`[SarvamBridge] STT closed (${code}: ${reason?.toString()}) for ${callUuid}`);
        // Stop keep-alive interval
        const ka = (plivoWs as any).sarvamKeepAlive;
        if (ka) { clearInterval(ka); (plivoWs as any).sarvamKeepAlive = null; }
        SarvamBridgeService.stopPacing(plivoWs);
        if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      });

      sttWs.on('error', (e) => {
        logger.error(`[SarvamBridge] STT error for ${callUuid}:`, e);
      });

    } catch (e) {
      logger.error(`[SarvamBridge] Init error for ${callUuid}:`, e);
      SarvamBridgeService.stopPacing(plivoWs);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
    }
  }

  /** Forward Plivo mulaw 8kHz → Sarvam STT as JSON { audio: { data, encoding, sample_rate } } */
  static handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): void {
    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (!sttWs || sttWs.readyState !== WebSocket.OPEN) return;

    // ── Stop silence keep-alive on first real audio from Plivo ───────────────
    // The keep-alive sends silence to prevent Sarvam timing out before the call
    // starts. Once real audio arrives, we must stop it or it drowns out the user.
    const ka = (plivoWs as any).sarvamKeepAlive;
    if (ka) {
      clearInterval(ka);
      (plivoWs as any).sarvamKeepAlive = null;
      logger.info(`[SarvamBridge] KeepAlive stopped on first real audio for ${callUuid}`);
    }

    const mulawBuf = Buffer.from(payload, 'base64');
    const pcmBuf   = SarvamBridgeService.mulaw8k_to_pcm16_8k(mulawBuf);
    // Sarvam STT requires JSON: { audio: { data: <base64_pcm>, encoding: "audio/wav", sample_rate: 8000 } }
    sttWs.send(JSON.stringify({ audio: { data: pcmBuf.toString('base64'), encoding: 'audio/wav', sample_rate: 8000 } }));
  }

  /** End session — returns transcript and duration */
  static endSession(plivoWs: WebSocket): { duration: number; transcript: string } {
    SarvamBridgeService.stopPacing(plivoWs);
    const sttWs = (plivoWs as any).sarvamSttWs as WebSocket | undefined;
    if (sttWs && sttWs.readyState === WebSocket.OPEN) sttWs.close();
    const lines: string[] = (plivoWs as any).sarvamTranscriptLines || [];
    const startMs: number = (plivoWs as any).sarvamCallStartTime   || Date.now();
    const duration = Math.round((Date.now() - startMs) / 1000);
    return { duration, transcript: lines.join('\n') };
  }
}
