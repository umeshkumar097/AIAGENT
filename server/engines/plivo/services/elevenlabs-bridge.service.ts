import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

export class ElevenLabsBridgeService {
  /**
   * Initialize a bridge between Plivo WebSocket and ElevenLabs Conversational AI WebSocket.
   *
   * KEY INSIGHT: We tell ElevenLabs to use ulaw_8000 format for BOTH input and output.
   * This way:
   * - Plivo sends mulaw 8kHz → directly forward to ElevenLabs (no conversion needed)
   * - ElevenLabs sends mulaw 8kHz → directly forward to Plivo (no conversion needed)
   *
   * ElevenLabs ConvAI WebSocket URL params:
   *   output_format=ulaw_8000  → ElevenLabs sends mulaw 8kHz audio back
   *
   * ElevenLabs ConvAI input format:
   *   user_audio_chunk: base64 mulaw 8kHz audio
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
      // Request ulaw_8000 output format - matches Plivo's expected format exactly
      // This eliminates ALL audio conversion and avoids speed/pitch issues
      const elevenLabsWsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}&output_format=ulaw_8000`;
      const elevenLabsWs = new WebSocket(elevenLabsWsUrl);

      elevenLabsWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] Connected to ElevenLabs for call ${callUuid} (ulaw_8000 mode)`);
        // No initialization message needed - ElevenLabs ConvAI starts immediately
      });

      elevenLabsWs.on('message', (data: Buffer | string) => {
        try {
          const rawData = typeof data === 'string' ? data : data.toString('utf8');
          const message = JSON.parse(rawData);
          const msgType = message.type;

          if (msgType === 'audio' && message.audio_event?.audio_base_64) {
            // ElevenLabs sends mulaw 8kHz (because we requested ulaw_8000)
            // Forward directly to Plivo - no conversion needed!
            const plivoMediaEvent = {
              event: 'playAudio',
              media: {
                contentType: 'audio/x-mulaw',
                sampleRate: 8000,
                payload: message.audio_event.audio_base_64
              }
            };

            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoMediaEvent));
            }

          } else if (msgType === 'interruption') {
            // User spoke - clear Plivo audio buffer immediately
            const plivoClearEvent = { event: 'clearAudio' };
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoClearEvent));
            }
            logger.info(`[ElevenLabsBridge] Interruption for call ${callUuid} - audio cleared`);

          } else if (msgType === 'ping') {
            // Keep connection alive with pong
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
            logger.info(`[ElevenLabsBridge] Agent: ${message.agent_response_event?.agent_response}`);

          } else if (msgType === 'user_transcript') {
            logger.info(`[ElevenLabsBridge] User said: ${message.user_transcription_event?.user_transcript}`);

          } else if (msgType === 'internal_tentative_agent_response') {
            // Ignore tentative/intermediate responses
          } else {
            logger.info(`[ElevenLabsBridge] Unhandled type "${msgType}" for call ${callUuid}`);
          }

        } catch (error) {
          logger.error(`[ElevenLabsBridge] Error processing message: ${error}`);
        }
      });

      elevenLabsWs.on('close', (code, reason) => {
        logger.info(`[ElevenLabsBridge] ElevenLabs closed for call ${callUuid} (code=${code}, reason=${reason?.toString()})`);
        if (plivoWs.readyState === WebSocket.OPEN) {
          plivoWs.close();
        }
      });

      elevenLabsWs.on('error', (error) => {
        logger.error(`[ElevenLabsBridge] WebSocket error for call ${callUuid}:`, error);
      });

      (plivoWs as any).elevenLabsWs = elevenLabsWs;
      (plivoWs as any).isElevenLabs = true;

    } catch (error) {
      logger.error(`[ElevenLabsBridge] Init error for call ${callUuid}:`, error);
      if (plivoWs.readyState === WebSocket.OPEN) {
        plivoWs.close();
      }
    }
  }

  /**
   * Forward Plivo audio (mulaw 8kHz base64) directly to ElevenLabs.
   * No conversion needed - ElevenLabs ConvAI accepts mulaw 8kHz in user_audio_chunk.
   */
  static async handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      // Send mulaw 8kHz directly - ElevenLabs handles the format
      elevenLabsWs.send(JSON.stringify({ user_audio_chunk: payload }));
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
