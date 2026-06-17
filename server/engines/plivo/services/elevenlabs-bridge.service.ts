import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

export class ElevenLabsBridgeService {

  // ── Mulaw decoder table (256 entries) ──────────────────────────────────────
  private static readonly MULAW_DECODE_TABLE: Int16Array = (() => {
    const table = new Int16Array(256);
    for (let i = 0; i < 256; i++) {
      let ulaw = ~i & 0xFF;
      const sign = ulaw & 0x80;
      const exponent = (ulaw >> 4) & 0x07;
      const mantissa = ulaw & 0x0F;
      let sample = ((mantissa << 3) + 0x84) << exponent;
      sample -= 0x84;
      table[i] = sign ? -sample : sample;
    }
    return table;
  })();

  // ── Mulaw encoder ──────────────────────────────────────────────────────────
  private static linearToMulaw(sample: number): number {
    const BIAS = 33;
    const CLIP = 32635;
    const sign = (sample >> 8) & 0x80;
    if (sign) sample = -sample;
    if (sample > CLIP) sample = CLIP;
    sample += BIAS;
    let exp = 7;
    let mask = 0x4000;
    while (!(sample & mask) && exp > 0) { exp--; mask >>= 1; }
    const mantissa = (sample >> (exp + 3)) & 0x0F;
    return (~(sign | (exp << 4) | mantissa)) & 0xFF;
  }

  // ── mulaw 8kHz → PCM16 16kHz (decode + 2× upsample) ──────────────────────
  private static mulaw8kToPcm16_16k(mulawBuf: Buffer): Buffer {
    const out = Buffer.alloc(mulawBuf.length * 4); // 2× samples × 2 bytes each
    let outPos = 0;
    for (let i = 0; i < mulawBuf.length; i++) {
      const s = ElevenLabsBridgeService.MULAW_DECODE_TABLE[mulawBuf[i]];
      out.writeInt16LE(s, outPos);     // original sample
      out.writeInt16LE(s, outPos + 2); // duplicated sample (simple 2× upsample)
      outPos += 4;
    }
    return out;
  }

  // ── PCM16 at any rate → mulaw 8kHz (proper box-filter resampling) ──────────
  /**
   * Converts PCM16 LE buffer at srcRate Hz → mulaw 8kHz.
   * Works for ANY srcRate including non-integer ratios (e.g. 44100→8000 = 5.5125×).
   * Uses box-filter averaging: for each output sample, averages all input samples
   * in the corresponding time window. This provides anti-aliasing.
   */
  private static pcm16ToMulaw8k(pcmBuf: Buffer, srcRate: number): Buffer {
    const inputSamples = Math.floor(pcmBuf.length / 2);
    const outputLength = Math.floor(inputSamples * 8000 / srcRate);
    const ratio = srcRate / 8000; // e.g. 44100/8000 = 5.5125
    const out = Buffer.alloc(outputLength);

    for (let i = 0; i < outputLength; i++) {
      const startPos = Math.floor(i * ratio);
      const endPos = Math.min(Math.floor((i + 1) * ratio) + 1, inputSamples);

      let sum = 0;
      let count = 0;
      for (let j = startPos; j < endPos; j++) {
        const byteOffset = j * 2;
        if (byteOffset + 1 < pcmBuf.length) {
          sum += pcmBuf.readInt16LE(byteOffset);
          count++;
        }
      }
      const avg = count > 0 ? Math.round(sum / count) : 0;
      out[i] = ElevenLabsBridgeService.linearToMulaw(Math.max(-32768, Math.min(32767, avg)));
    }
    return out;
  }

  // ── Detect ElevenLabs output sample rate from first audio packet ───────────
  /**
   * Calculate actual sample rate from packet size.
   * ElevenLabs sends ~20ms audio chunks.
   * PCM16 bytes = sampleRate × 0.02 × 2
   * mulaw bytes = sampleRate × 0.02 × 1
   * Returns 0 if mulaw, otherwise returns PCM16 sample rate.
   */
  private static detectSampleRate(base64Audio: string, callUuid: string): number {
    const bytes = Math.floor(base64Audio.length * 3 / 4);

    // mulaw 8kHz max practical chunk = 320 bytes (40ms)
    if (bytes <= 320) {
      logger.info(`[ElevenLabsBridge] Audio packet: ${bytes} bytes → mulaw_8kHz (direct forward) for call ${callUuid}`);
      return 0; // mulaw - forward directly
    }

    // PCM16: bytes = sampleRate × chunkDuration × 2
    // Assume 20ms chunks: sampleRate = bytes / 0.02 / 2 = bytes × 25
    const estimatedRate = bytes * 25;

    // Round to nearest standard rate
    let srcRate: number;
    if (estimatedRate <= 12000)       srcRate = 8000;
    else if (estimatedRate <= 20000)  srcRate = 16000;
    else if (estimatedRate <= 28000)  srcRate = 24000;
    else if (estimatedRate <= 38000)  srcRate = 32000;
    else                              srcRate = 44100;

    logger.info(`[ElevenLabsBridge] Audio packet: ${bytes} bytes → estimated ${estimatedRate}Hz → using PCM16_${srcRate}Hz for call ${callUuid}`);
    return srcRate;
  }

  /**
   * Initialize a bridge between Plivo WebSocket and ElevenLabs Conversational AI.
   *
   * Strategy:
   * 1. Connect with output_format=ulaw_8000 requested in URL
   * 2. Also send conversation_config_override on open to reinforce format
   * 3. Auto-detect actual output format from first audio packet
   * 4. Convert if necessary (PCM16 → mulaw)
   * 5. Input: convert Plivo mulaw 8kHz → PCM16 16kHz for ElevenLabs
   */
  static async initializeSession(
    callUuid: string,
    plivoWs: WebSocket,
    streamSid: string | null,
    agentId: string,
    elevenLabsAgentId: string
  ): Promise<void> {
    logger.info(`[ElevenLabsBridge] Initializing bridge for call ${callUuid} to agent ${elevenLabsAgentId}`);

    try {
      // Request ulaw_8000 in URL - ElevenLabs may or may not honour it
      const elevenLabsWsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}&output_format=ulaw_8000`;
      const elevenLabsWs = new WebSocket(elevenLabsWsUrl);

      let detectedSampleRate: number | null = null; // null = not yet detected

      elevenLabsWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] Connected to ElevenLabs for call ${callUuid}`);

        // Also request mulaw output via config override (belt + suspenders)
        const initMsg = {
          conversation_config_override: {
            tts: { output_format: 'ulaw_8000' }
          }
        };
        elevenLabsWs.send(JSON.stringify(initMsg));
      });

      elevenLabsWs.on('message', (data: Buffer | string) => {
        try {
          const rawData = typeof data === 'string' ? data : data.toString('utf8');
          const message = JSON.parse(rawData);
          const msgType = message.type;

          if (msgType === 'audio' && message.audio_event?.audio_base_64) {
            const b64 = message.audio_event.audio_base_64 as string;

            // Auto-detect sample rate on first packet
            if (detectedSampleRate === null) {
              detectedSampleRate = ElevenLabsBridgeService.detectSampleRate(b64, callUuid);
              logger.info(`[ElevenLabsBridge] Detected output: ${detectedSampleRate === 0 ? 'mulaw_8kHz (direct)' : `PCM16_${detectedSampleRate}Hz (will convert)`}`);
            }

            let mulawBase64: string;

            if (detectedSampleRate === 0) {
              // ElevenLabs is already sending mulaw 8kHz - use directly!
              mulawBase64 = b64;
            } else {
              // ElevenLabs is sending PCM16 - convert to mulaw 8kHz
              const pcmBuf = Buffer.from(b64, 'base64');
              const mulawBuf = ElevenLabsBridgeService.pcm16ToMulaw8k(pcmBuf, detectedSampleRate);
              mulawBase64 = mulawBuf.toString('base64');
            }

            const plivoEvent = {
              event: 'playAudio',
              media: {
                contentType: 'audio/x-mulaw',
                sampleRate: 8000,
                payload: mulawBase64
              }
            };

            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoEvent));
            }

          } else if (msgType === 'interruption') {
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify({ event: 'clearAudio' }));
            }
            logger.info(`[ElevenLabsBridge] Interruption for call ${callUuid}`);

          } else if (msgType === 'ping') {
            if (elevenLabsWs.readyState === WebSocket.OPEN) {
              elevenLabsWs.send(JSON.stringify({ type: 'pong', event_id: message.ping_event?.event_id }));
            }

          } else if (msgType === 'conversation_initiation_metadata') {
            logger.info(`[ElevenLabsBridge] Session initiated for call ${callUuid}`, {
              conversationId: message.conversation_initiation_metadata_event?.conversation_id
            });

          } else if (msgType === 'agent_response') {
            logger.info(`[ElevenLabsBridge] Agent: ${message.agent_response_event?.agent_response}`);

          } else if (msgType === 'user_transcript') {
            logger.info(`[ElevenLabsBridge] User said: ${message.user_transcription_event?.user_transcript}`);

          } else if (msgType === 'internal_tentative_agent_response') {
            // ignore
          } else {
            logger.info(`[ElevenLabsBridge] Unhandled type "${msgType}"`);
          }
        } catch (err) {
          logger.error(`[ElevenLabsBridge] Message error: ${err}`);
        }
      });

      elevenLabsWs.on('close', (code, reason) => {
        logger.info(`[ElevenLabsBridge] ElevenLabs closed for call ${callUuid} (code=${code}, reason=${reason?.toString()})`);
        if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
      });

      elevenLabsWs.on('error', (err) => {
        logger.error(`[ElevenLabsBridge] WS error for call ${callUuid}:`, err);
      });

      (plivoWs as any).elevenLabsWs = elevenLabsWs;
      (plivoWs as any).isElevenLabs = true;

    } catch (err) {
      logger.error(`[ElevenLabsBridge] Init error for call ${callUuid}:`, err);
      if (plivoWs.readyState === WebSocket.OPEN) plivoWs.close();
    }
  }

  /**
   * Forward Plivo audio (mulaw 8kHz) to ElevenLabs.
   * Convert mulaw 8kHz → PCM16 16kHz for ElevenLabs input.
   */
  static async handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (!elevenLabsWs || elevenLabsWs.readyState !== WebSocket.OPEN) return;

    // Convert mulaw 8kHz → PCM16 16kHz so ElevenLabs understands the user's voice
    const mulawBuf = Buffer.from(payload, 'base64');
    const pcm16Buf = ElevenLabsBridgeService.mulaw8kToPcm16_16k(mulawBuf);
    const pcm16Base64 = pcm16Buf.toString('base64');

    elevenLabsWs.send(JSON.stringify({ user_audio_chunk: pcm16Base64 }));
  }

  /**
   * End the ElevenLabs session cleanly.
   */
  static async endSession(plivoWs: WebSocket): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) elevenLabsWs.close();
  }
}
