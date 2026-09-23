/**
 * Do-not-call list (own rows only). Mounted at /api/dnd behind authenticateToken.
 *   GET    /?q=&limit=&offset=   → { numbers: [...], total }
 *   GET    /check?phone=         → { blocked }
 *   POST   /                     { phone, note? } → 201 { number }
 *   POST   /import               { phones: string[] } (≤ 5000) or multipart CSV "file" (first column = phone) → { added, skipped }
 *   DELETE /:id
 */
import { Router, type Response } from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import type { AuthRequest } from '../middleware/auth';
import type { DoNotCallNumber } from '@shared/schema';
import { addDoNotCall, importDoNotCall, isDoNotCall, listDoNotCall, normalizePhone, removeDoNotCallById } from '../services/dnd-service';

export const dndRouter = Router();

const MAX_IMPORT = 5000;
const csvUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok = /csv|text\/plain|excel|octet-stream/i.test(file.mimetype) || /\.(csv|txt)$/i.test(file.originalname);
    if (!ok) return cb(new Error('Only CSV or text files are accepted'));
    cb(null, true);
  },
});

function shape(row: DoNotCallNumber) {
  return { id: row.id, phone: row.phone, reason: row.reason, source: row.source, note: row.note, callId: row.callId, createdAt: row.createdAt };
}

/** Phones from a CSV/text body: first column of every row, header row skipped when it is not a number. */
export function phonesFromCsv(text: string): string[] {
  const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
  const out: string[] = [];
  for (const row of parsed.data) {
    const first = Array.isArray(row) ? String(row[0] ?? '').trim() : '';
    if (!first) continue;
    if (!/\d{6,}/.test(first)) continue; // header or junk
    out.push(first);
  }
  return out;
}

dndRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.substring(0, 50) : '';
    const limit = Number.parseInt(String(req.query.limit ?? ''), 10);
    const offset = Number.parseInt(String(req.query.offset ?? ''), 10);
    const result = await listDoNotCall(req.userId!, {
      q, limit: Number.isFinite(limit) ? limit : 50, offset: Number.isFinite(offset) ? offset : 0,
    });
    res.json({ numbers: result.numbers.map(shape), total: result.total });
  } catch (error: any) {
    console.error('List DND error:', error.message);
    res.status(500).json({ error: 'Failed to load the do-not-call list' });
  }
});

dndRouter.get('/check', async (req: AuthRequest, res: Response) => {
  try {
    const phone = typeof req.query.phone === 'string' ? req.query.phone : '';
    if (!normalizePhone(phone)) return res.status(400).json({ error: 'A valid phone number is required' });
    res.json({ blocked: await isDoNotCall(req.userId!, phone), phone: normalizePhone(phone) });
  } catch (error: any) {
    console.error('Check DND error:', error.message);
    res.status(500).json({ error: 'Failed to check the number' });
  }
});

dndRouter.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const phone = typeof req.body?.phone === 'string' ? req.body.phone : '';
    if (!normalizePhone(phone)) return res.status(400).json({ error: 'A valid phone number is required' });
    const note = typeof req.body?.note === 'string' ? req.body.note.trim().substring(0, 500) : null;
    const { number, added } = await addDoNotCall({ userId: req.userId!, phone, reason: 'manual', source: 'manual', note: note || null });
    res.status(added ? 201 : 200).json({ number: shape(number), added });
  } catch (error: any) {
    console.error('Add DND error:', error.message);
    res.status(500).json({ error: 'Failed to add the number' });
  }
});

dndRouter.post('/import', (req, res, next) => {
  if (!req.is('multipart/form-data')) return next();
  csvUpload.single('file')(req, res, (err) => (err ? res.status(400).json({ error: err.message || 'Invalid upload' }) : next()));
}, async (req: AuthRequest, res: Response) => {
  try {
    let phones: string[] = [];
    const file = (req as AuthRequest & { file?: { buffer?: Buffer } }).file;
    if (file?.buffer) phones = phonesFromCsv(file.buffer.toString('utf-8'));
    else if (Array.isArray(req.body?.phones)) phones = req.body.phones.filter((p: unknown) => typeof p === 'string' || typeof p === 'number').map(String);
    else return res.status(400).json({ error: 'Send { phones: string[] } or a CSV file' });
    if (phones.length === 0) return res.status(400).json({ error: 'No phone numbers found' });
    if (phones.length > MAX_IMPORT) return res.status(400).json({ error: `At most ${MAX_IMPORT} numbers per import` });
    const result = await importDoNotCall(req.userId!, phones, file ? 'upload' : 'api');
    res.json(result);
  } catch (error: any) {
    console.error('Import DND error:', error.message);
    res.status(500).json({ error: 'Failed to import numbers' });
  }
});

dndRouter.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id || '');
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) return res.status(400).json({ error: 'Invalid id' });
    const removed = await removeDoNotCallById(req.userId!, id);
    if (!removed) return res.status(404).json({ error: 'Number not found' });
    res.json({ success: true });
  } catch (error: any) {
    console.error('Delete DND error:', error.message);
    res.status(500).json({ error: 'Failed to remove the number' });
  }
});
