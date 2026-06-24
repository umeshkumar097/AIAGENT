'use strict';
/**
 * Sarvam AI Routes
 * - GET /api/sarvam/voices    → list available Sarvam voices
 * - POST /api/sarvam/preview  → generate TTS preview audio (base64 WAV)
 */

import type { Router, Request, Response } from 'express';
import { db } from '../db';
import { globalSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { logger } from '../utils/logger';

// ── All Sarvam bulbul:v3 voices ─────────────────────────────────────────────
export const SARVAM_VOICES = [
  { id: 'priya',    name: 'Priya',    gender: 'Female', language: 'Hindi',    age: 'Young',       description: 'Natural & Conversational — default' },
  { id: 'meera',    name: 'Meera',    gender: 'Female', language: 'Hindi',    age: 'Young',       description: 'Warm & Expressive' },
  { id: 'anushka',  name: 'Anushka',  gender: 'Female', language: 'Hindi',    age: 'Young',       description: 'Cheerful & Friendly' },
  { id: 'maya',     name: 'Maya',     gender: 'Female', language: 'Hindi',    age: 'Young',       description: 'Professional & Clear' },
  { id: 'maitreyi', name: 'Maitreyi', gender: 'Female', language: 'Hindi',    age: 'Middle_aged', description: 'Deep & Mature' },
  { id: 'kalpana',  name: 'Kalpana',  gender: 'Female', language: 'Tamil',    age: 'Young',       description: 'Tamil Native' },
  { id: 'pavithra', name: 'Pavithra', gender: 'Female', language: 'Telugu',   age: 'Young',       description: 'Telugu Native' },
  { id: 'vinaya',   name: 'Vinaya',   gender: 'Female', language: 'Kannada',  age: 'Young',       description: 'Kannada Native' },
  { id: 'arvind',   name: 'Arvind',   gender: 'Male',   language: 'Hindi',    age: 'Young',       description: 'Clear & Authoritative' },
  { id: 'aarav',    name: 'Aarav',    gender: 'Male',   language: 'Hindi',    age: 'Young',       description: 'Modern & Dynamic' },
  { id: 'neel',     name: 'Neel',     gender: 'Male',   language: 'Hindi',    age: 'Young',       description: 'Professional Male' },
  { id: 'amol',     name: 'Amol',     gender: 'Male',   language: 'Marathi',  age: 'Young',       description: 'Marathi Native' },
];

// ── Sample preview phrases per language ─────────────────────────────────────
const PREVIEW_PHRASES: Record<string, string> = {
  'Hindi':   'नमस्ते! मैं आपकी सहायता करने के लिए यहाँ हूँ। मुझे बताइए, मैं आपके लिए क्या कर सकती हूँ?',
  'Tamil':   'வணக்கம்! நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன். என்ன உதவி வேண்டும்?',
  'Telugu':  'నమస్కారం! నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీకు ఏమి కావాలో చెప్పండి.',
  'Kannada': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನಿಮಗೆ ಏನು ಬೇಕು?',
  'Marathi': 'नमस्कार! मी तुम्हाला मदत करण्यासाठी इथे आहे. तुम्हाला काय हवे आहे?',
};

const LANG_CODES: Record<string, string> = {
  'Hindi':   'hi-IN',
  'Tamil':   'ta-IN',
  'Telugu':  'te-IN',
  'Kannada': 'kn-IN',
  'Marathi': 'mr-IN',
};

async function getSarvamApiKey(): Promise<string | null> {
  try {
    const [row] = await db.select({ value: globalSettings.value })
      .from(globalSettings)
      .where(eq(globalSettings.key, 'sarvam_api_key'))
      .limit(1);
    return (row?.value as string) || null;
  } catch {
    return null;
  }
}

export function registerSarvamRoutes(router: Router): void {

  // GET /api/sarvam/voices — list all available voices
  router.get('/api/sarvam/voices', async (_req: Request, res: Response) => {
    try {
      const apiKey = await getSarvamApiKey();
      res.json({
        success: true,
        voices: SARVAM_VOICES,
        configured: !!apiKey,
      });
    } catch (error) {
      logger.error('Sarvam voices error', { error }, 'SarvamRoutes');
      res.status(500).json({ success: false, error: 'Failed to fetch voices' });
    }
  });

  // POST /api/sarvam/preview — generate TTS preview audio
  router.post('/api/sarvam/preview', async (req: Request, res: Response) => {
    try {
      const { voiceId, language } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: 'voiceId required' });
      }

      const apiKey = await getSarvamApiKey();
      if (!apiKey) {
        return res.status(400).json({ success: false, error: 'Sarvam API key not configured' });
      }

      const lang = language || 'Hindi';
      const text = PREVIEW_PHRASES[lang] || PREVIEW_PHRASES['Hindi'];
      const langCode = LANG_CODES[lang] || 'hi-IN';

      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: langCode,
          speaker: voiceId,
          model: 'bulbul:v3',
          pace: 1.0,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        logger.error('Sarvam TTS failed', { status: response.status, err }, 'SarvamRoutes');
        return res.status(502).json({ success: false, error: 'Sarvam TTS API error' });
      }

      const data = await response.json() as { audios?: string[] };
      const audioBase64 = data.audios?.[0];
      if (!audioBase64) {
        return res.status(502).json({ success: false, error: 'No audio in Sarvam response' });
      }

      res.json({ success: true, audio: audioBase64, format: 'wav' });
    } catch (error) {
      logger.error('Sarvam preview error', { error }, 'SarvamRoutes');
      res.status(500).json({ success: false, error: 'Preview generation failed' });
    }
  });
}
