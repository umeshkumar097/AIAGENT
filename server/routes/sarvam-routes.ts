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
import { strictRateLimiter } from '../middleware/rateLimiter';

// ── All Sarvam bulbul:v3 voices ─────────────────────────────────────────────
// bulbul:v3 speakers only (verified against docs.sarvam.ai, Sep 2026). Every speaker speaks all 11
// supported languages; ids must be lowercase. Legacy ids (meera, anushka, arvind, …) were bulbul:v2 or
// never existed and make the TTS API return 4xx — the bridge maps them to a same-gender v3 voice.
export const SARVAM_VOICES = [
  { id: 'priya',     name: 'Priya',     gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Natural & conversational — default' },
  { id: 'shubh',     name: 'Shubh',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Sarvam default — top-rated across languages' },
  { id: 'ishita',    name: 'Ishita',    gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Top-rated across languages' },
  { id: 'neha',      name: 'Neha',      gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Clear & friendly' },
  { id: 'ritu',      name: 'Ritu',      gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Warm & professional' },
  { id: 'pooja',     name: 'Pooja',     gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Soft & polite' },
  { id: 'simran',    name: 'Simran',    gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Bright & energetic' },
  { id: 'kavya',     name: 'Kavya',     gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Calm & clear' },
  { id: 'shreya',    name: 'Shreya',    gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Confident & articulate' },
  { id: 'roopa',     name: 'Roopa',     gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Mature & steady' },
  { id: 'kavitha',   name: 'Kavitha',   gender: 'Female',  language: 'All 11 languages', age: 'Adult', description: 'Gentle & natural' },
  { id: 'aditya',    name: 'Aditya',    gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Clear & professional' },
  { id: 'rahul',     name: 'Rahul',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Friendly & natural' },
  { id: 'rohan',     name: 'Rohan',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Modern & energetic' },
  { id: 'amit',      name: 'Amit',      gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Steady & confident' },
  { id: 'dev',       name: 'Dev',       gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Warm & calm' },
  { id: 'kabir',     name: 'Kabir',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Deep & composed' },
  { id: 'manan',     name: 'Manan',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Polite & clear' },
  { id: 'sumit',     name: 'Sumit',     gender: 'Male',    language: 'All 11 languages', age: 'Adult', description: 'Mature & authoritative' },
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
  router.post('/api/sarvam/preview', strictRateLimiter, async (req: Request, res: Response) => {
    try {
      const { voiceId, language } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: 'voiceId required' });
      }
      if (!SARVAM_VOICES.some(v => v.id === String(voiceId).toLowerCase())) {
        return res.status(400).json({ success: false, error: `Unknown Sarvam voice "${String(voiceId).slice(0, 40)}" — pick one from the list` });
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
        // Surface Sarvam's own reason (e.g. invalid speaker) so the UI can show something actionable
        let detail = '';
        try {
          const parsed = JSON.parse(err) as { error?: { message?: string } | string; message?: string };
          detail = typeof parsed.error === 'string' ? parsed.error : parsed.error?.message || parsed.message || '';
        } catch {
          detail = err.slice(0, 200);
        }
        return res.status(502).json({
          success: false,
          error: detail ? `Sarvam TTS API error (${response.status}): ${detail}` : `Sarvam TTS API error (${response.status})`,
        });
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
