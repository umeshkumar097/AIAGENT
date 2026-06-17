import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

export class ElevenLabsBridgeService {
  /**
   * Initialize a bridge between Plivo WebSocket and ElevenLabs Conversational AI WebSocket.
   * 
   * ElevenLabs ConvAI WebSocket Protocol:
   * - INPUT:  { user_audio_chunk: "<base64_mulaw_audio>" }
   * - OUTPUT: { type: "audio", audio_event: { audio_base_64: "<base64_audio>", event_id: N } }
   * - OUTPUT: { type: "interruption", interruption_event: { event_id: N } }
   * - OUTPUT: { type: "ping", ping_event: { event_id: N, ping_ms: N } }
   * - OUTPUT: { type: "agent_response", ... }
   * - OUTPUT: { type: "user_transcript", ... }
   * - OUTPUT: { type: "conversation_initiation_metadata", ... }
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
      // Connect to ElevenLabs Conversational AI WebSocket
      const elevenLabsWsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}`;
      const elevenLabsWs = new WebSocket(elevenLabsWsUrl);

      elevenLabsWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] Connected to ElevenLabs for call ${callUuid}`);
        // No start event needed - ElevenLabs ConvAI starts immediately on connection
        // It will send conversation_initiation_metadata first, then we can stream audio
      });

      elevenLabsWs.on('message', (data: Buffer | string) => {
        try {
          const rawData = typeof data === 'string' ? data : data.toString('utf8');
          const message = JSON.parse(rawData);

          const msgType = message.type;

          if (msgType === 'audio' && message.audio_event?.audio_base_64) {
            // ElevenLabs sends audio as base64 mulaw 8kHz by default when input is mulaw
            // Forward to Plivo as playAudio event
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
            // ElevenLabs interrupted (user spoke) - clear Plivo audio buffer
            const plivoClearEvent = { event: 'clearAudio' };
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoClearEvent));
            }

          } else if (msgType === 'ping') {
            // Respond to ElevenLabs ping to keep connection alive
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
            // Ignore tentative responses
          } else {
            logger.info(`[ElevenLabsBridge] Unhandled message type "${msgType}" for call ${callUuid}`);
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

      // Attach ElevenLabs WS to the Plivo WS for audio forwarding
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
   * Handle incoming audio from Plivo and forward to ElevenLabs.
   * Plivo sends mulaw 8kHz base64 audio.
   * ElevenLabs ConvAI expects: { user_audio_chunk: "<base64>" }
   */
  static async handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;

    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      // ElevenLabs ConvAI protocol: send raw base64 audio as user_audio_chunk
      const audioChunk = {
        user_audio_chunk: payload
      };
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
