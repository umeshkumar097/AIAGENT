/**
 * Browser-side audio for the in-browser test call: G.711 μ-law codec, 8 kHz
 * resampling, 20 ms microphone frames (AudioWorklet with a ScriptProcessor
 * fallback) and a gapless playback queue on the same AudioContext.
 *
 * Wire format matches the Plivo stream protocol the Sarvam bridge already speaks:
 * base64 μ-law, 8000 Hz, 160 bytes per 20 ms frame.
 */

export const MULAW_SAMPLE_RATE = 8000;
export const FRAME_SAMPLES = 160; // 20 ms at 8 kHz

const MULAW_BIAS = 0x84;
const MULAW_CLIP = 32635;

/** 16-bit PCM sample → μ-law byte (G.711). */
export function mulawEncodeSample(sample: number): number {
  let s = Math.max(-32768, Math.min(32767, Math.round(sample)));
  const sign = s < 0 ? 0x80 : 0;
  if (s < 0) s = -s;
  if (s > MULAW_CLIP) s = MULAW_CLIP;
  s += MULAW_BIAS;
  let exponent = 7;
  for (let mask = 0x4000; (s & mask) === 0 && exponent > 0; exponent--, mask >>= 1) { /* find segment */ }
  const mantissa = (s >> (exponent + 3)) & 0x0f;
  return (~(sign | (exponent << 4) | mantissa)) & 0xff;
}

const DECODE_TABLE: Float32Array = (() => {
  const table = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const u = ~i & 0xff;
    const sign = u & 0x80;
    const exponent = (u >> 4) & 0x07;
    const mantissa = u & 0x0f;
    let sample = ((mantissa << 3) + MULAW_BIAS) << exponent;
    sample -= MULAW_BIAS;
    table[i] = (sign ? -sample : sample) / 32768;
  }
  return table;
})();

/** Float32 PCM (-1..1) at 8 kHz → μ-law bytes. */
export function encodeMulaw(pcm: Float32Array): Uint8Array {
  const out = new Uint8Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) out[i] = mulawEncodeSample(pcm[i] * 32767);
  return out;
}

/** μ-law bytes → Float32 PCM (-1..1). */
export function decodeMulaw(bytes: Uint8Array): Float32Array {
  const out = new Float32Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = DECODE_TABLE[bytes[i]];
  return out;
}

export function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Linear-interpolation resampler that keeps its fractional position across chunks. */
export class Resampler {
  private readonly ratio: number;
  private pos = 0;
  private last = 0;
  constructor(fromRate: number, toRate: number = MULAW_SAMPLE_RATE) { this.ratio = fromRate / toRate; }

  process(input: Float32Array): Float32Array {
    const out: number[] = [];
    // Virtual index -1 holds the last sample of the previous chunk
    while (this.pos < input.length) {
      const i = Math.floor(this.pos);
      const frac = this.pos - i;
      const a = i - 1 >= 0 ? input[i - 1] : this.last;
      const b = input[i];
      out.push(a + (b - a) * frac);
      this.pos += this.ratio;
    }
    this.pos -= input.length;
    this.last = input[input.length - 1] ?? this.last;
    return Float32Array.from(out);
  }
}

const WORKLET_SOURCE = `
class TestCallCapture extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch && ch.length) this.port.postMessage(ch.slice(0));
    return true;
  }
}
registerProcessor('test-call-capture', TestCallCapture);
`;

export interface MicCaptureHandle { stop: () => void }

/**
 * Captures the microphone, resamples to 8 kHz and calls `onFrame` with one
 * 160-sample μ-law frame every 20 ms. Uses AudioWorklet when available.
 */
export async function startMicCapture(
  ctx: AudioContext, stream: MediaStream, onFrame: (mulaw: Uint8Array) => void,
): Promise<MicCaptureHandle> {
  const source = ctx.createMediaStreamSource(stream);
  const resampler = new Resampler(ctx.sampleRate);
  let pending = new Float32Array(0);

  const push = (chunk: Float32Array) => {
    const down = resampler.process(chunk);
    const merged = new Float32Array(pending.length + down.length);
    merged.set(pending); merged.set(down, pending.length);
    let offset = 0;
    while (merged.length - offset >= FRAME_SAMPLES) {
      onFrame(encodeMulaw(merged.subarray(offset, offset + FRAME_SAMPLES)));
      offset += FRAME_SAMPLES;
    }
    pending = merged.slice(offset);
  };

  // Keep the graph alive without echoing the mic to the speakers
  const sink = ctx.createGain();
  sink.gain.value = 0;
  sink.connect(ctx.destination);

  if (typeof AudioWorkletNode !== 'undefined' && ctx.audioWorklet) {
    const url = URL.createObjectURL(new Blob([WORKLET_SOURCE], { type: 'application/javascript' }));
    try {
      await ctx.audioWorklet.addModule(url);
      const node = new AudioWorkletNode(ctx, 'test-call-capture', { numberOfInputs: 1, numberOfOutputs: 1, channelCount: 1 });
      node.port.onmessage = (e: MessageEvent<Float32Array>) => push(e.data);
      source.connect(node);
      node.connect(sink);
      return {
        stop: () => { node.port.onmessage = null; try { source.disconnect(); node.disconnect(); sink.disconnect(); } catch { /* already gone */ } },
      };
    } catch {
      // fall through to ScriptProcessor
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const processor = ctx.createScriptProcessor(2048, 1, 1);
  processor.onaudioprocess = (e) => push(e.inputBuffer.getChannelData(0).slice(0));
  source.connect(processor);
  processor.connect(sink);
  return {
    stop: () => { processor.onaudioprocess = null; try { source.disconnect(); processor.disconnect(); sink.disconnect(); } catch { /* already gone */ } },
  };
}

/** Schedules decoded μ-law chunks back-to-back; `clear()` flushes on barge-in. */
export class PlaybackQueue {
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  constructor(private readonly ctx: AudioContext) {}

  enqueue(mulaw: Uint8Array): void {
    if (mulaw.length === 0) return;
    const pcm = decodeMulaw(mulaw);
    const buffer = this.ctx.createBuffer(1, pcm.length, MULAW_SAMPLE_RATE);
    buffer.copyToChannel(pcm, 0);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.ctx.destination);
    const startAt = Math.max(this.nextStartTime, this.ctx.currentTime + 0.03);
    src.start(startAt);
    this.nextStartTime = startAt + buffer.duration;
    this.sources.add(src);
    src.onended = () => this.sources.delete(src);
  }

  /** True while scheduled audio is still playing out. */
  isPlaying(): boolean { return this.nextStartTime > this.ctx.currentTime; }

  clear(): void {
    for (const src of this.sources) { try { src.stop(); } catch { /* not started */ } }
    this.sources.clear();
    this.nextStartTime = 0;
  }
}
