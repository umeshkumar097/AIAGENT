/**
 * Sarvam TTS over a persistent WebSocket (bulbul:v3, μ-law 8 kHz).
 *
 * One socket per call. Sentences are sent as they come out of the LLM and audio
 * chunks stream back in order — first audio arrives while the sentence is still
 * being synthesised, instead of waiting for a whole REST response per sentence.
 *
 * Protocol (docs.sarvam.ai → Text-to-Speech → WebSocket):
 *   client → { type:'config', data:{...} } | { type:'text', data:{ text } } | { type:'flush' } | { type:'ping' }
 *   server → { type:'audio', data:{ audio:<b64> } } | { type:'event', data:{ event_type:'final' } } | { type:'error', data:{ message } }
 * The connection is closed by Sarvam after 60 s of inactivity → ping every 20 s.
 */
import { WebSocket } from 'ws';
import { logger } from '../../../utils/logger';

const SARVAM_TTS_WS_URL = 'wss://api.sarvam.ai/text-to-speech/ws?model=bulbul:v3&send_completion_event=true';
const PING_MS = 20_000;
const OPEN_TIMEOUT_MS = 4_000;

export interface TtsStreamCallbacks {
  /** A chunk of μ-law audio for the sentence currently being synthesised. */
  onAudio: (mulaw: Buffer, text: string) => void;
  /** First audio chunk of a sentence has arrived (the caller is about to hear it). */
  onSentenceStart: (text: string) => void;
  /** Sentence fully synthesised; `audio` is the concatenated μ-law for caching. */
  onSentenceDone: (text: string, audio: Buffer) => void;
}

interface Pending {
  text: string;
  sentAt: number;
  started: boolean;
  chunks: Buffer[];
  resolve: () => void;
  reject: (e: Error) => void;
}

function abortError(msg: string): Error {
  const e = new Error(msg);
  e.name = 'AbortError';
  return e;
}

export class SarvamTtsStream {
  private ws: WebSocket | null = null;
  private opening: Promise<WebSocket> | null = null;
  private queue: Pending[] = [];
  private pingTimer: NodeJS.Timeout | null = null;
  private closed = false;
  private language: string;
  private voice: string;

  constructor(
    private readonly callUuid: string,
    private readonly apiKey: string,
    language: string,
    voice: string,
    private readonly cb: TtsStreamCallbacks,
  ) {
    this.language = language;
    this.voice = voice;
  }

  /** Socket is open, or an open attempt is in flight (callers may await speak()). */
  isReady(): boolean {
    return !this.closed && ((this.ws?.readyState === WebSocket.OPEN) || this.opening !== null);
  }

  pendingCount(): number {
    return this.queue.length;
  }

  /** Open (or reuse) the socket and send the config. Resolves once text can be sent. */
  open(): Promise<WebSocket> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return Promise.resolve(this.ws);
    if (this.opening) return this.opening;
    this.closed = false;

    const attempt = new Promise<WebSocket>((resolve, reject) => {
      const ws = new WebSocket(SARVAM_TTS_WS_URL, { headers: { 'Api-Subscription-Key': this.apiKey } });
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new Error('TTS WS open timeout'));
        try { ws.terminate(); } catch { /* ignore */ }
      }, OPEN_TIMEOUT_MS);

      ws.once('open', () => {
        clearTimeout(timer);
        if (settled) return;
        settled = true;
        this.ws = ws;
        this.sendConfig(ws);
        this.startPing(ws);
        logger.info(`[SarvamTTS][${this.callUuid}] stream open (${this.language}/${this.voice})`);
        resolve(ws);
      });
      ws.on('message', (raw: Buffer | string) => this.onMessage(raw));
      ws.on('error', (err: Error) => {
        clearTimeout(timer);
        logger.warn(`[SarvamTTS][${this.callUuid}] stream error: ${err.message}`);
        this.failAll(err);
        if (!settled) { settled = true; reject(err); }
      });
      ws.on('close', (code: number) => {
        this.stopPing();
        if (this.ws === ws) this.ws = null;
        this.failAll(new Error(`TTS stream closed (${code})`));
        if (!settled) { settled = true; reject(new Error(`TTS stream closed before open (${code})`)); }
      });
    });

    this.opening = attempt.finally(() => { this.opening = null; });
    return this.opening;
  }

  /** Switch speaker/language mid-call (Sarvam flushes buffered text before applying). */
  configure(language: string, voice: string): void {
    if (language === this.language && voice === this.voice) return;
    this.language = language;
    this.voice = voice;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.sendConfig(this.ws);
  }

  /** Queue one sentence; resolves when its audio has fully arrived. */
  async speak(text: string, signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) throw abortError('aborted before send');
    const ws = await this.open();
    if (signal?.aborted) throw abortError('aborted during open');
    return new Promise<void>((resolve, reject) => {
      this.queue.push({ text, sentAt: Date.now(), started: false, chunks: [], resolve, reject });
      ws.send(JSON.stringify({ type: 'text', data: { text } }));
      ws.send(JSON.stringify({ type: 'flush' }));
    });
  }

  /** Barge-in: drop everything in flight and pre-warm a fresh socket for the next turn. */
  abort(): void {
    const ws = this.ws;
    this.ws = null;
    this.stopPing();
    this.failAll(abortError('interrupted'));
    if (ws) { try { ws.terminate(); } catch { /* ignore */ } }
    if (!this.closed) this.open().catch(() => { /* REST fallback will be used */ });
  }

  close(): void {
    this.closed = true;
    this.stopPing();
    this.failAll(abortError('session ended'));
    const ws = this.ws;
    this.ws = null;
    if (ws) { try { ws.close(); } catch { /* ignore */ } }
  }

  // ── internals ─────────────────────────────────────────────────────────────
  private sendConfig(ws: WebSocket): void {
    ws.send(JSON.stringify({
      type: 'config',
      data: {
        language_code: this.language,
        speaker: this.voice,
        model: 'bulbul:v3',
        speech_sample_rate: '8000',
        output_audio_codec: 'mulaw',
        enable_preprocessing: true,
        min_buffer_size: 30,
        max_chunk_length: 150,
      },
    }));
  }

  private startPing(ws: WebSocket): void {
    this.stopPing();
    this.pingTimer = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
      else this.stopPing();
    }, PING_MS);
    this.pingTimer.unref?.();
  }

  private stopPing(): void {
    if (this.pingTimer) { clearInterval(this.pingTimer); this.pingTimer = null; }
  }

  private failAll(err: Error): void {
    const q = this.queue;
    this.queue = [];
    for (const p of q) p.reject(err);
  }

  private onMessage(raw: Buffer | string): void {
    let msg: any;
    try {
      msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString('utf8'));
    } catch {
      return;
    }
    const head = this.queue[0];

    if (msg.type === 'audio') {
      if (!head || !msg.data?.audio) return;
      let buf = Buffer.from(msg.data.audio, 'base64');
      // Defensive: strip a WAV header if the service ever wraps μ-law in a container
      if (buf.length > 44 && buf.subarray(0, 4).toString('ascii') === 'RIFF') buf = buf.subarray(44);
      if (!head.started) {
        head.started = true;
        logger.info(`[PERF][${this.callUuid}] TTS_WS first-audio: ${Date.now() - head.sentAt}ms`);
        this.cb.onSentenceStart(head.text);
      }
      head.chunks.push(buf);
      this.cb.onAudio(buf, head.text);
      return;
    }

    if (msg.type === 'event' && msg.data?.event_type === 'final') {
      if (!head) return;
      this.queue.shift();
      this.cb.onSentenceDone(head.text, Buffer.concat(head.chunks));
      head.resolve();
      return;
    }

    if (msg.type === 'error') {
      const message = msg.data?.message || 'TTS stream error';
      logger.error(`[SarvamTTS][${this.callUuid}] ${message}`);
      if (head) {
        this.queue.shift();
        head.reject(new Error(message));
      }
    }
  }
}
