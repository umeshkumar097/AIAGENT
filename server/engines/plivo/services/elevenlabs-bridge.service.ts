import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

// ── Chunk size for pacing: 160 mulaw bytes = 20ms at 8kHz ──────────────────
const MULAW_CHUNK_BYTES = 160;    // 20ms per chunk at 8kHz (1 byte = 1/8000s)
const MULAW_CHUNK_MS    = 20;     // 20ms interval between sends

export class ElevenLabsBridgeService {

  // ── mulaw decoder table ────────────────────────────────────────────────────
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

  // ── linear PCM → mulaw encoder ────────────────────────────────────────────
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

  // ── mulaw 8kHz → PCM16 16kHz (upsample 2×) ───────────────────────────────
  private static mulaw8k_to_pcm16k(src: Buffer): Buffer {
    const out = Buffer.alloc(src.length * 4);
    for (let i = 0; i < src.length; i++) {
      const s = ElevenLabsBridgeService.MULAW_DECODE[src[i]];
      out.writeInt16LE(s, i * 4);
      out.writeInt16LE(s, i * 4 + 2);
    }
    return out;
  }

  // ── PCM16 → mulaw 8kHz (generic, box-filter downsampler) ────────────────────
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
        if (byteOffset + 1 < src.length) {
          sum += src.readInt16LE(byteOffset);
          cnt++;
        }
      }
      const avg = cnt ? Math.round(sum / cnt) : 0;
      out[i] = ElevenLabsBridgeService.lin2ulaw(Math.max(-32768, Math.min(32767, avg)));
    }
    return out;
  }

  // ── Paced audio sender: breaks large mulaw buffer into 20ms chunks ─────────
  // This prevents Plivo buffer overflow which causes chipmunk/fast audio.
  // ElevenLabs pre-generates and sends audio in large bursts.
  // We pace the send rate to match real-time 8kHz playback speed.
  private static sendMulawPaced(callUuid: string, plivoWs: WebSocket, mulawBuf: Buffer): void {
    const queue = (plivoWs as any).audioQueue as Buffer[];
    const totalBefore = queue.reduce((a, b) => a + b.length, 0);

    // Slice into 20ms chunks and add to queue
    for (let offset = 0; offset < mulawBuf.length; offset += MULAW_CHUNK_BYTES) {
      queue.push(mulawBuf.slice(offset, Math.min(offset + MULAW_CHUNK_BYTES, mulawBuf.length)));
    }

    // Start pacing if not already running
    if (!(plivoWs as any).isPacing) {
      (plivoWs as any).isPacing = true;
      ElevenLabsBridgeService.paceNext(callUuid, plivoWs);
    }
  }

  private static paceNext(callUuid: string, plivoWs: WebSocket): void {
    const queue = (plivoWs as any).audioQueue as Buffer[];
    if (!queue || queue.length === 0) {
      (plivoWs as any).isPacing = false;
      return;
    }

    const chunk = queue.shift()!;
    if (plivoWs.readyState === WebSocket.OPEN) {
      plivoWs.send(JSON.stringify({
        event: 'playAudio',
        media: { contentType: 'audio/x-mulaw', sampleRate: 8000, payload: chunk.toString('base64') }
      }));
    }

    // Schedule next chunk after exactly 20ms (real-time pacing)
    const timer = setTimeout(() => ElevenLabsBridgeService.paceNext(callUuid, plivoWs), MULAW_CHUNK_MS);
    (plivoWs as any).pacingTimer = timer;
  }

  private static stopPacing(plivoWs: WebSocket): void {
    if ((plivoWs as any).pacingTimer) {
      clearTimeout((plivoWs as any).pacingTimer);
      (plivoWs as any).pacingTimer = null;
    }
    (plivoWs as any).audioQueue = [];
    (plivoWs as any).isPacing   = false;
  }

  /**
   * Initialize bridge between Plivo WS and ElevenLabs ConvAI WS.
   *
   * Root cause of chipmunk voice:
   *   ElevenLabs pre-generates TTS and sends audio in large bursts.
   *   When forwarded immediately, Plivo overflows its buffer and plays/drops
   *   audio incorrectly causing extremely fast playback.
   *
   * Fix: Pace audio output to Plivo at exactly 20ms per 160-byte chunk.
   */
  static async initializeSession(
    callUuid: string,
    plivoWs: WebSocket,
    _streamSid: string | null,
    _agentId: string,
    elevenLabsAgentId: string,
    plivoAuthId?: string,
    plivoAuthToken?: string,
    recordingCallbackUrl?: string
  ): Promise<void> {
    logger.info(`[ElevenLabsBridge] Init for call ${callUuid} → agent ${elevenLabsAgentId}`);

    // Init audio queue for pacing
    (plivoWs as any).audioQueue = [];
    (plivoWs as any).isPacing   = false;
    (plivoWs as any).pacingTimer = null;

    // Transcript & duration tracking
    const transcriptLines: string[] = [];
    const callStartTime = Date.now();
    (plivoWs as any).elTranscriptLines = transcriptLines;
    (plivoWs as any).elCallStartTime   = callStartTime;

    try {
      const url = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}`;
      const elWs = new WebSocket(url);

      // detectedRate: 0 = mulaw_8000 direct, >0 = PCM16 at that Hz, null = not yet known
      let detectedRate: number | null = null;

      elWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] WS open for call ${callUuid}`);
        const initData = { type: 'conversation_initiation_client_data' };
        elWs.send(JSON.stringify(initData));
        logger.info(`[ElevenLabsBridge] Session init sent for call ${callUuid}`);

        // Start Plivo recording via REST API
        if (plivoAuthId && plivoAuthToken) {
          const https = require('https');
          const recBody = JSON.stringify({
            time_limit: 3600,
            record_format: 'mp3',
            callback_url: recordingCallbackUrl || ''
          });
          const opts = {
            hostname: 'api.plivo.com',
            path: `/v1/Account/${plivoAuthId}/Call/${callUuid}/Record/`,
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + Buffer.from(`${plivoAuthId}:${plivoAuthToken}`).toString('base64'),
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(recBody)
            }
          };
          const req = https.request(opts, (res: any) => {
            let d = '';
            res.on('data', (x: any) => d += x);
            res.on('end', () => {
              logger.info(`[ElevenLabsBridge] Recording started (${res.statusCode}): ${d.substring(0, 100)}`, undefined);
            });
          });
          req.on('error', (e: any) => logger.warn(`[ElevenLabsBridge] Recording API error: ${e.message}`));
          req.write(recBody);
          req.end();
        } else {
          logger.warn(`[ElevenLabsBridge] No Plivo credentials — recording skipped for call ${callUuid}`);
        }
      });

      elWs.on('message', (raw: Buffer | string) => {
        try {
          const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));

          // ── Audio from ElevenLabs ──────────────────────────────────────────
          if ((msg.type === 'audio' || msg.event === 'media') &&
              (msg.audio_event?.audio_base_64 || msg.media?.payload)) {

            const b64 = msg.audio_event?.audio_base_64 ?? msg.media?.payload;

            // Use detected rate from metadata (set when conversation_initiation_metadata arrives)
            // Default to 16000 Hz PCM16 if metadata hasn't arrived yet
            const rate = detectedRate ?? 16000;

            let mulawBuf: Buffer;
            if (rate === 0) {
              // mulaw 8kHz direct – no conversion needed
              mulawBuf = Buffer.from(b64, 'base64');
            } else {
              // PCM16 at 'rate' Hz → downsample to mulaw 8kHz
              const pcm = Buffer.from(b64, 'base64');
              mulawBuf = ElevenLabsBridgeService.pcm16_to_mulaw8k(pcm, rate);
            }

            // PACED send - prevents Plivo buffer overflow / chipmunk voice
            ElevenLabsBridgeService.sendMulawPaced(callUuid, plivoWs, mulawBuf);

          // ── Interruption / clear ───────────────────────────────────────────
          } else if (msg.type === 'interruption' || msg.event === 'clear') {
            // User interrupted - clear audio queue immediately
            ElevenLabsBridgeService.stopPacing(plivoWs);
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify({ event: 'clearAudio' }));
            }
            logger.info(`[ElevenLabsBridge] Interruption - cleared audio queue for call ${callUuid}`);

          // ── Ping → pong ────────────────────────────────────────────────────
          } else if (msg.type === 'ping') {
            if (elWs.readyState === WebSocket.OPEN) {
              elWs.send(JSON.stringify({ type: 'pong', event_id: msg.ping_event?.event_id }));
            }

          // ── Metadata / transcripts / responses ────────────────────────────
          } else if (msg.type === 'conversation_initiation_metadata') {
            // Determine the actual audio format ElevenLabs is sending and set detectedRate
            const meta = msg.conversation_initiation_metadata_event;
            const audioFormat: string = meta?.agent_output_audio_format ?? 'pcm_16000';
            if (audioFormat === 'ulaw_8000' || audioFormat === 'mulaw_8000') {
              detectedRate = 0;   // mulaw 8kHz direct – no conversion
            } else if (audioFormat === 'pcm_16000') {
              detectedRate = 16000;
            } else if (audioFormat === 'pcm_22050') {
              detectedRate = 22050;
            } else if (audioFormat === 'pcm_24000') {
              detectedRate = 24000;
            } else {
              detectedRate = 44100;  // pcm_44100 or unknown → use 44100
            }
            logger.info(`[ElevenLabsBridge] Format from metadata: ${audioFormat} → detectedRate=${detectedRate} for call ${callUuid}`, {
              conversationId: meta?.conversation_id
            });
          } else if (msg.type === 'agent_response') {
            const agentText = msg.agent_response_event?.agent_response;
            logger.info(`[ElevenLabsBridge] Agent: ${agentText}`);
            if (agentText) transcriptLines.push(`Agent: ${agentText}`);
          } else if (msg.type === 'user_transcript') {
            const userText = msg.user_transcription_event?.user_transcript;
            logger.info(`[ElevenLabsBridge] User: ${userText}`);
            if (userText) transcriptLines.push(`User: ${userText}`);
          } else if (msg.type === 'internal_tentative_agent_response') {
            // ignore
          } else {
            logger.info(`[ElevenLabsBridge] Unhandled: event="${msg.event}" type="${msg.type}"`);
          }

        } catch (e: any) {
          logger.error(`[ElevenLabsBridge] Message error: ${e?.message || e}`);
          if (e?.stack) logger.error(`[ElevenLabsBridge] Stack: ${e.stack}`);
        }
      });

      elWs.on('close', (code, reason) => {
        logger.info(`[ElevenLabsBridge] Closed for call ${callUuid} (${code}: ${reason?.toString()})`);
        ElevenLabsBridgeService.stopPacing(plivoWs);
        if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      });

      elWs.on('error', (e) => {
        logger.error(`[ElevenLabsBridge] WS error for call ${callUuid}:`, e);
      });

      (plivoWs as any).elevenLabsWs = elWs;
      (plivoWs as any).isElevenLabs = true;

    } catch (e) {
      logger.error(`[ElevenLabsBridge] Init error for call ${callUuid}:`, e);
      ElevenLabsBridgeService.stopPacing(plivoWs);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
    }
  }

  /**
   * Forward Plivo mulaw 8kHz → ElevenLabs (PCM16 16kHz).
   */
  static async handlePlivoAudio(_callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elWs = (plivoWs as any).elevenLabsWs as WebSocket | undefined;
    if (!elWs || elWs.readyState !== WebSocket.OPEN) return;
    const mulawBuf = Buffer.from(payload, 'base64');
    const pcmBuf   = ElevenLabsBridgeService.mulaw8k_to_pcm16k(mulawBuf);
    elWs.send(JSON.stringify({ user_audio_chunk: pcmBuf.toString('base64') }));
  }

  /** End the session cleanly — returns transcript and duration for DB persistence. */
  static async endSession(plivoWs: WebSocket): Promise<{ duration: number; transcript: string }> {
    ElevenLabsBridgeService.stopPacing(plivoWs);
    const elWs = (plivoWs as any).elevenLabsWs as WebSocket | undefined;
    if (elWs && elWs.readyState === WebSocket.OPEN) elWs.close();

    const lines: string[]  = (plivoWs as any).elTranscriptLines || [];
    const startMs: number  = (plivoWs as any).elCallStartTime   || Date.now();
    const duration = Math.round((Date.now() - startMs) / 1000);
    const transcript = lines.join('\n');
    logger.info(`[ElevenLabsBridge] Session ended: duration=${duration}s, transcript lines=${lines.length}`);
    return { duration, transcript };
  }
}
