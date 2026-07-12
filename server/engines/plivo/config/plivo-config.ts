'use strict';
/**
 * ============================================================
 * Plivo + OpenAI Engine Configuration
 * ============================================================
 */

import type { OpenAIVoice, OpenAIRealtimeModel } from '../types';

export const PlivoEngineConfig = {
  plivoApiVersion: 'v1',
  plivoBaseUrl: 'https://api.plivo.com',
  
  openaiRealtimeUrl: 'wss://api.openai.com/v1/realtime',
  
  audioFormat: {
    plivoFormat: 'raw',
    plivoCodec: 'PCMU',
    plivoSampleRate: 8000,
    openaiFormat: 'pcm16',
    openaiSampleRate: 24000,
  },
  
  defaults: {
    voice: 'alloy' as OpenAIVoice,
    model: 'gpt-realtime-1.5' as OpenAIRealtimeModel,
    maxCallDuration: 600,
    temperature: 0.7,
    turnDetection: {
      type: 'server_vad' as const,
      threshold: 0.5,
      prefixPaddingMs: 300,
      silenceDurationMs: 500,
    },
    concurrentCallLimit: 5,
    callDelayMs: 500,
  },
  
  rateLimits: {
    maxConcurrentCallsPerKey: 50,
    maxCallsPerMinute: 100,
    healthCheckIntervalMs: 60000,
  },
  
  recording: {
    enabled: true,
    format: 'mp3',
    maxDurationSeconds: 3600,
  },
  
  kyc: {
    requiredForCountries: ['IN'],
    documentTypes: ['identity_proof', 'address_proof', 'business_registration'],
    maxFileSizeMb: 10,
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  },
};

export function getWebhookUrl(baseUrl: string, path: string): string {
  return `${baseUrl}/api/plivo${path}`;
}

export function getStreamUrl(baseUrl: string, callUuid: string): string {
  let wsBaseUrl = process.env.WEBSOCKET_HOST || baseUrl;
  if (wsBaseUrl.startsWith('http://')) {
    wsBaseUrl = wsBaseUrl.replace('http://', 'ws://');
  } else if (wsBaseUrl.startsWith('https://')) {
    wsBaseUrl = wsBaseUrl.replace('https://', 'wss://');
  } else if (!wsBaseUrl.startsWith('ws://') && !wsBaseUrl.startsWith('wss://')) {
    wsBaseUrl = `wss://${wsBaseUrl}`;
  }
  return `${wsBaseUrl}/api/plivo/stream/${callUuid}`;
}

export function getTransferWebhookUrl(baseUrl: string, targetNumber: string, callerId: string): string {
  const encodedTarget = encodeURIComponent(targetNumber);
  const encodedCallerId = encodeURIComponent(callerId);
  return `${baseUrl}/api/plivo/voice/transfer?target=${encodedTarget}&callerId=${encodedCallerId}`;
}

export function generateTransferXML(phoneNumber: string, callerId: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="${escapeXml(callerId)}">
    <Number>${escapeXml(phoneNumber)}</Number>
  </Dial>
</Response>`;
}

export function generateHangupXML(message?: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${message ? `<Speak>${escapeXml(message)}</Speak>` : ''}
  <Hangup/>
</Response>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
