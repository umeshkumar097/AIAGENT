/**
 * In-browser test call against a Sarvam agent — no phone, no credits.
 *
 * Server contract:
 *   POST /api/agents/:id/test-session → { token, callUuid, wsPath, maxSeconds }
 *   WS   wsPath (token in the query string), Plivo stream protocol:
 *     → { event: 'start' } | { event: 'media', media: { payload } } | { event: 'stop' }
 *     ← { event: 'playAudio', media: { payload } } | { event: 'clearAudio' }
 *       | { event: 'transcript', role: 'user'|'agent'|'system', text }
 */
import { apiRequest } from "./queryClient";
import { PlaybackQueue, base64ToBytes, bytesToBase64, startMicCapture, type MicCaptureHandle } from "./mulaw-audio";

export interface TestSession { token: string; callUuid: string; wsPath: string; maxSeconds: number }
export type TestCallStatus = 'idle' | 'mic' | 'connecting' | 'listening' | 'speaking' | 'ended' | 'error';
export type TranscriptRole = 'user' | 'agent' | 'system';
export interface TranscriptLine { id: number; role: TranscriptRole; text: string }

export const TEST_CALL_MAX_SECONDS = 300;

export async function createTestSession(agentId: string): Promise<TestSession> {
  const res = await apiRequest("POST", `/api/agents/${encodeURIComponent(agentId)}/test-session`);
  const body = await res.json();
  if (!body?.wsPath) throw new Error('Test session did not return a socket path');
  return { token: body.token, callUuid: body.callUuid, wsPath: body.wsPath, maxSeconds: Number(body.maxSeconds) || TEST_CALL_MAX_SECONDS };
}

/** wss on https, ws otherwise — same host as the app (the API proxies the stream paths). */
export function buildWsUrl(wsPath: string): string {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}${wsPath.startsWith('/') ? wsPath : `/${wsPath}`}`;
}

export interface TestCallEvents {
  onStatus: (status: TestCallStatus, detail?: string) => void;
  onTranscript: (line: Omit<TranscriptLine, 'id'>) => void;
}

/** One live test call: mic → WS → agent → speakers. Call `start()` from a click handler. */
export class TestCallClient {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private mic: MicCaptureHandle | null = null;
  private ws: WebSocket | null = null;
  private playback: PlaybackQueue | null = null;
  private speakingTimer: number | null = null;
  private stopped = false;

  constructor(private readonly agentId: string, private readonly events: TestCallEvents) {}

  async start(): Promise<TestSession> {
    // Chrome/Safari only allow audio output when the context is created in a user gesture
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC || !navigator.mediaDevices?.getUserMedia) throw new Error('This browser does not support microphone audio');
    this.ctx = new AC();
    if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => undefined);
    this.playback = new PlaybackQueue(this.ctx);

    this.events.onStatus('mic');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    if (this.stopped) { stream.getTracks().forEach(t => t.stop()); throw new Error('cancelled'); }
    this.stream = stream;

    this.events.onStatus('connecting');
    const session = await createTestSession(this.agentId);
    if (this.stopped) throw new Error('cancelled');

    await this.openSocket(buildWsUrl(session.wsPath));
    this.mic = await startMicCapture(this.ctx, this.stream, (frame) => this.send({ event: 'media', media: { payload: bytesToBase64(frame) } }));
    this.events.onStatus('listening');
    this.speakingTimer = window.setInterval(() => {
      if (!this.playback || this.stopped) return;
      this.events.onStatus(this.playback.isPlaying() ? 'speaking' : 'listening');
    }, 150);
    return session;
  }

  private openSocket(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      this.ws = ws;
      let opened = false;
      ws.onopen = () => {
        opened = true;
        ws.send(JSON.stringify({ event: 'start' }));
        resolve();
      };
      ws.onmessage = (e) => this.handleMessage(e.data);
      ws.onerror = () => { if (!opened) reject(new Error('Could not connect to the test call')); };
      ws.onclose = (e) => {
        if (!opened) reject(new Error(e.reason || 'Could not connect to the test call'));
        else if (!this.stopped) this.finish(e.reason || undefined);
      };
    });
  }

  private handleMessage(raw: unknown): void {
    if (typeof raw !== 'string') return;
    let msg: { event?: string; media?: { payload?: string }; role?: string; text?: string; reason?: string };
    try { msg = JSON.parse(raw); } catch { return; }
    switch (msg.event) {
      case 'playAudio':
        if (msg.media?.payload && this.playback) this.playback.enqueue(base64ToBytes(msg.media.payload));
        break;
      case 'clearAudio':
        this.playback?.clear();
        break;
      case 'transcript':
        if (typeof msg.text === 'string' && msg.text.trim()) {
          const role: TranscriptRole = msg.role === 'agent' || msg.role === 'system' ? msg.role : 'user';
          this.events.onTranscript({ role, text: msg.text });
        }
        break;
      case 'stop':
      case 'hangup':
        this.finish(msg.reason);
        break;
      default:
        break;
    }
  }

  private send(payload: unknown): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(payload));
  }

  /** Ends the call from the UI: tells the bridge to stop, then tears everything down. */
  stop(): void {
    if (this.stopped) return;
    this.send({ event: 'stop' });
    this.finish();
  }

  private finish(detail?: string): void {
    if (this.stopped) return;
    this.stopped = true;
    if (this.speakingTimer !== null) { window.clearInterval(this.speakingTimer); this.speakingTimer = null; }
    this.mic?.stop(); this.mic = null;
    this.playback?.clear(); this.playback = null;
    this.stream?.getTracks().forEach(t => t.stop()); this.stream = null;
    const ws = this.ws; this.ws = null;
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      ws.onclose = null;
      try { ws.close(1000, 'ended'); } catch { /* ignore */ }
    }
    const ctx = this.ctx; this.ctx = null;
    ctx?.close().catch(() => undefined);
    this.events.onStatus('ended', detail);
  }
}
