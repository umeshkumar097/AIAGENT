import { WebSocket } from 'ws';
import { db } from '../../../db';
import { plivoCalls } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { logger } from '../../../utils/logger';

export class ElevenLabsBridgeService {
  /**
   * Initialize a bridge between Plivo WebSocket and ElevenLabs WebSocket
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
      // Create ElevenLabs WebSocket connection
      const elevenLabsWsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${elevenLabsAgentId}`;
      const elevenLabsWs = new WebSocket(elevenLabsWsUrl);

      elevenLabsWs.on('open', () => {
        logger.info(`[ElevenLabsBridge] Connected to ElevenLabs for call ${callUuid}`);
        
        // ElevenLabs expects a Twilio-like start event
        const startEvent = {
          event: "start",
          start: {
            streamSid: streamSid || callUuid,
            callSid: callUuid,
            customParameters: {
              plivoCallUuid: callUuid
            }
          }
        };
        elevenLabsWs.send(JSON.stringify(startEvent));
      });

      elevenLabsWs.on('message', (data: Buffer | string) => {
        try {
          const rawData = typeof data === 'string' ? data : data.toString('utf8');
          const message = JSON.parse(rawData);

          // Translate ElevenLabs messages to Plivo format
          if (message.event === 'media' && message.media?.payload) {
            const plivoMediaEvent = {
              event: 'playAudio',
              media: {
                payload: message.media.payload
              }
            };
            
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoMediaEvent));
            }
          } else if (message.event === 'clear') {
            const plivoClearEvent = {
              event: 'clearAudio'
            };
            if (plivoWs.readyState === WebSocket.OPEN) {
              plivoWs.send(JSON.stringify(plivoClearEvent));
            }
          }
        } catch (error) {
          logger.error(`[ElevenLabsBridge] Error processing ElevenLabs message: ${error}`);
        }
      });

      elevenLabsWs.on('close', () => {
        logger.info(`[ElevenLabsBridge] ElevenLabs connection closed for call ${callUuid}`);
        if (plivoWs.readyState === WebSocket.OPEN) {
          plivoWs.close();
        }
      });

      elevenLabsWs.on('error', (error) => {
        logger.error(`[ElevenLabsBridge] ElevenLabs WebSocket error for call ${callUuid}:`, error);
      });

      // Save the elevenLabsWs to the Plivo ws object for later access
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
   * Handle incoming audio from Plivo and forward to ElevenLabs
   */
  static async handlePlivoAudio(callUuid: string, plivoWs: WebSocket, payload: string): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      // Forward to ElevenLabs in Twilio-like format
      const mediaEvent = {
        event: "media",
        media: {
          payload: payload
        }
      };
      elevenLabsWs.send(JSON.stringify(mediaEvent));
    }
  }

  /**
   * End the session
   */
  static async endSession(plivoWs: WebSocket): Promise<void> {
    const elevenLabsWs = (plivoWs as any).elevenLabsWs;
    if (elevenLabsWs && elevenLabsWs.readyState === WebSocket.OPEN) {
      elevenLabsWs.close();
    }
  }
}
