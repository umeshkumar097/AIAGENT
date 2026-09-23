'use strict';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { and, eq, sql } from 'drizzle-orm';
import { authenticateHybrid } from '../middleware/hybrid-auth';
import { db } from '../db';
import { flows } from '@shared/schema';

const router = Router();

// Ensure audio directory exists
const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

type AudioExt = 'mp3' | 'wav' | 'm4a' | 'ogg';

// Stored filenames are always <uuid>.<sniffed-ext>; nothing else is ever served or deleted.
const STORED_FILENAME_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(mp3|wav|m4a|ogg)$/;

/**
 * Detect the audio container from magic bytes. The client-supplied extension
 * and mimetype are never trusted (an HTML/SVG payload with an audio mimetype
 * would otherwise be stored and served from /audio).
 */
function sniffAudioExt(buf: Buffer): AudioExt | null {
  if (buf.length < 12) return null;
  // MP3: ID3v2 tag or MPEG audio frame sync (0xFFE..)
  if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) return 'mp3';
  if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return 'mp3';
  // WAV: "RIFF"...."WAVE"
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WAVE') return 'wav';
  // M4A / MP4 audio: ISO BMFF "ftyp" box at offset 4
  if (buf.toString('ascii', 4, 8) === 'ftyp') return 'm4a';
  // OGG: "OggS"
  if (buf.toString('ascii', 0, 4) === 'OggS') return 'ogg';
  return null;
}

// Buffer in memory (5MB cap) so the bytes can be sniffed before anything touches disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5MB limit
});

// POST /api/audio/upload - Upload audio file
router.post('/upload', authenticateHybrid as any, upload.single('audio'), (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const ext = sniffAudioExt(req.file.buffer);
    if (!ext) {
      return res.status(400).json({ error: 'Only MP3, WAV, M4A and OGG audio files are allowed' });
    }

    const filename = `${randomUUID()}.${ext}`;
    fs.writeFileSync(path.join(AUDIO_DIR, filename), req.file.buffer, { mode: 0o644 });

    const url = `/audio/${filename}`;
    console.log(`[AudioUpload] User ${(req as any).userId} uploaded: ${req.file.originalname} -> ${url}`);

    res.json({
      url,
      filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    console.error('[AudioUpload] Error:', error);
    res.status(500).json({ error: 'Failed to upload audio file' });
  }
});

// DELETE /api/audio/:filename - Delete audio file
// Only files referenced by one of the caller's own flows may be deleted.
router.delete('/:filename', authenticateHybrid as any, async (req, res) => {
  try {
    const { filename } = req.params;
    const userId = (req as any).userId as string | undefined;

    // Security: strict <uuid>.<ext> only (no traversal, no arbitrary names)
    if (!STORED_FILENAME_RE.test(filename)) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Ownership check: the file must appear in a play_audio node of a flow owned by this user.
    // Filename is validated above, so only [0-9a-f-.] and a fixed extension reach the pattern.
    const [owned] = await db
      .select({ id: flows.id })
      .from(flows)
      .where(and(eq(flows.userId, userId), sql`${flows.nodes}::text LIKE ${`%/audio/${filename}%`}`))
      .limit(1);

    if (!owned) {
      return res.status(403).json({ error: 'Audio file is not referenced by any of your flows' });
    }

    const filePath = path.join(AUDIO_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[AudioUpload] User ${userId} deleted: ${filename}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('[AudioUpload] Delete error:', error);
    res.status(500).json({ error: 'Failed to delete audio file' });
  }
});

export default router;
