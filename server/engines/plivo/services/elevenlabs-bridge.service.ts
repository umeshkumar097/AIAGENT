import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

export class ElevenLabsBridgeService {
  /**
   * Convert linear PCM sample to mulaw byte (G.711)
   */
  private static linearToMulaw(sample: number): number {
    const MULAW_BIAS = 33;
    const CLIP = 32635;

    const sign = (sample >> 8) & 0x80;
    if (sign !== 0) sample = -sample;
    if (sample > CLIP) sample = CLIP;
    sample = sample + MULAW_BIAS;

    let exponent = 7;
    let mask = 0x4000;
    while ((sample & mask) === 0 && exponent > 0) {
      exponent--;
      mask >>= 1;
    }

    const mantissa = (sample >> (exponent + 3)) & 0x0F;
    return (~(sign | (exponent << 4) | mantissa)) & 0xFF;
  }

  /**
   * Convert PCM16 24kHz buffer → mulaw 8kHz buffer (3:1 downsample)
   */
  private static pcm16_24kToMulaw8k(pcmBuffer: Buffer): Buffer {
    const inputSamples = pcmBuffer.length / 2;
    const outputLength = Math.floor(inputSamples / 3);
    const output = Buffer.alloc(outputLength);

    for (let i = 0; i < outputLength; i++) {
      const baseIndex = i * 3;
      let sum = 0;
      let count = 0;
      for (let j = 0; j < 3; j++) {
        const byteOffset = (baseIndex + j) * 2;
        if (byteOffset + 1 < pcmBuffer.length) {
          sum += pcmBuffer.readInt16LE(byteOffset);
          count++;
        }
      }
      const avg = count > 0 ? Math.round(sum / count) : 0;
      const clamped = Math.max(-32768, Math.min(32767, avg));
      output[i] = this.linearToMulaw(clamped);
    }
    return output;
  }

  /**
   * Initialize a bridge between Plivo WebSocket and ElevenLabs Conversational AI WebSocket.
   *
   * ElevenLabs ConvAI WebSocket Protocol:
   * - INPUT:  { user_audio_chunk: "<base64_mulaw_8kHz>" }
   * - OUTPUT: { type: "audio", audio_event: { audio_base_64: "<base64_pcm16_24kHz>", event_id: N } }
   * - OUTPUT: { type: "interruption", interruption_event: { event_id: N } }
   * - OUTPUT: { type: "ping", ping_event: { event_id: N } }
   *
   * Plivo expects: mulaw 8kHz audio in playAudio event
   * So we must convert ElevenLabs PCM16 24kHz → mulaw 8kHz before forwarding to Plivo
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
      const elevenLabsWsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}`;
      const elevenLabsWs = new WebSocket(elevenLabsWsUrl);

      elevenLabsWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] Connected to ElevenLabs for call ${callUuid}`);
        // ElevenLabs ConvAI starts immediately - no start event needed
      });

      elevenLabsWs.on('message', (data: Buffer | string) => {
        try {
          const rawData = typeof data === 'string' ? data : data.toString('utf8');
          const message = JSON.parse(rawData);
          const msgType = message.type;

          if (msgType === 'audio' && message.audio_event?.audio_base_64) {
            // ElevenLabs sends PCM16 24kHz audio
            // Plivo needs mulaw 8kHz audio
            const pcmBuffer = Buffer.from(message.audio_event.audio_base_64, 'base64');
            const mulawBuffer = ElevenLabsBridgeService.pcm16_24kToMulaw8k(pcmBuffer);
            const mulawBase64 = mulawBuffer.toString('base64');

            const plivoMediaEvent = {
              event: 'playAudio',
              media: {
                contentType: 'audio/x-mulaw',
                sampleRate: 8000,
                payload: mulawBase64
              }
            };

            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoMediaEvent));
            }

          } else if (msgType === 'interruption') {
            // User spoke - clear Plivo audio buffer
            const plivoClearEvent = { event: 'clearAudio' };
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoClearEvent));
            }

          } else if (msgType === 'ping') {
            // Keep ElevenLabs connection alive
            const pongEvent = {
              type: 'pong',
              event_id: message.ping_event?.event_id
            };
            if (elevenLabsWs.readyState === WebSocket.OPEN) {
              elevenLabsWs.send(JSON.stringify(pongEvent));
            }

          } else if (msgType === 'conversation_initiation_metadata') {
            logger.info(`[ElevenLabsBridge] Session initiated for call ${callUuid}`, {
              conversationId: message.conversation_initiation_metadata_event?.conversation_id
            });

          } else if (msgType === 'agent_response') {
            logger.info(`[ElevenLabsBridge] Agent response for call ${callUuid}: ${message.agent_response_event?.agent_response}`);

          } else if (msgType === 'user_transcript') {
            logger.info(`[ElevenLabsBridge] User transcript for call ${callUuid}: ${message.user_transcription_event?.user_transcript}`);

          } else if (msgType === 'internal_tentative_agent_response') {
            // Ignore tentative responses (intermediate text, not final)
          } else {
            logger.info(`[ElevenLabsBridge] Unhandled msg type "${msgType}" for call ${callUuid}`);
          }

        } catch (error) {
          logger.error(`[ElevenLabsBridge] Error processing ElevenLabs message: ${error}`);
        }
      });

      elevenLabsWs.on('close', (code, reason) => {
        logger.info(`[ElevenLabsBridge] ElevenLabs connection closed for call ${callUuid} (code=${code}, reason=${reason})`);
        if (plivoWs.readyState === WebSocket.OPEN) {
          plivoWs.close();
        }
      });

      elevenLabsWs.on('error', (error) => {
        logger.error(`[ElevenLabsBridge] ElevenLabs WebSocket error for call ${callUuid}:`, error);
      });

      (plivoWs as any).elevenLabsWs = elevenLabsWs;
      (plivoWs as any).isElevenLabs = true;

    } catch (error) {
      logger.error(`[ElevenLabsBridge] Error initializing ElevenLabs bridge for call ${callUuid}:`, error);
      if (plivoWs.readyState === WebSocket.OPEN) {
        plivoWs.close();
      }
    }
  }

  /**
   * Forward Plivo audio (mulaw 8kHz base64) to ElevenLabs.
   * ElevenLabs ConvAI accepts mulaw 8kHz directly as user_audio_chunk.
   */
  static async handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      const audioChunk = { user_audio_chunk: payload };
      elevenLabsWs.send(JSON.stringify(audioChunk));
    }
  }

  /**
   * End the ElevenLabs session cleanly.
   */
  static async endSession(plivoWs: WebSocket): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      elevenLabsWs.close();
    }
  }
}
