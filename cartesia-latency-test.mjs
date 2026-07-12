#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║       CARTESIA SONIC — LATENCY BENCHMARK TOOL           ║
 * ║   Tests: TTFB | Streaming | E2E | Concurrent Load       ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   node cartesia-latency-test.mjs --api-key YOUR_KEY
 *   node cartesia-latency-test.mjs --api-key YOUR_KEY --concurrent 10
 *   node cartesia-latency-test.mjs --api-key YOUR_KEY --compare-sarvam
 *
 * Install deps first:
 *   npm install node-fetch ws
 */

import https from 'https';
import http from 'http';
import { performance } from 'perf_hooks';
import { parseArgs } from 'util';

// ─── CONFIG ──────────────────────────────────────────────────
const { values: args } = parseArgs({
  options: {
    'api-key':        { type: 'string' },
    'concurrent':     { type: 'string', default: '1' },
    'runs':           { type: 'string', default: '10' },
    'compare-sarvam': { type: 'boolean', default: false },
    'sarvam-key':     { type: 'string' },
    'voice-id':       { type: 'string', default: 'a0e99841-438c-4a64-b679-ae501e7d6091' }, // Cartesia default English
    'language':       { type: 'string', default: 'en' },
  }
});

const CARTESIA_API_KEY = args['api-key'] || process.env.CARTESIA_API_KEY;
const SARVAM_API_KEY   = args['sarvam-key'] || process.env.SARVAM_API_KEY;
const CONCURRENT       = parseInt(args['concurrent']);
const RUNS             = parseInt(args['runs']);

if (!CARTESIA_API_KEY) {
  console.error('❌ Error: --api-key is required');
  console.error('   Usage: node cartesia-latency-test.mjs --api-key sk_car_...');
  process.exit(1);
}

// ─── TEST SENTENCES (Real-world call scenarios) ───────────────
const TEST_SENTENCES = {
  short: [
    "Hello! How can I help you today?",                          // 7 words
    "Please hold on while I check that for you.",               // 9 words
    "Your appointment has been confirmed for tomorrow.",        // 8 words
  ],
  medium: [
    "Thank you for calling. I'm your AI assistant. I can help you with bookings, information, and general queries today.", // 20 words
    "I understand you're looking for information about our premium plan. Let me walk you through the key features and pricing.", // 22 words
    "Great news! I found an available slot this Thursday at 3 PM. Shall I go ahead and book that for you?", // 23 words
  ],
  long: [
    "Based on what you've told me, I'd recommend our Enterprise package which includes unlimited AI calls, advanced analytics, CRM integration, and dedicated support. The monthly pricing starts at twenty thousand rupees with a free trial available.", // 40 words
    "I've reviewed your account and I can see that your subscription is currently on the basic plan. To upgrade to premium, which gives you access to all features including voice cloning and custom personas, you can simply say yes and I'll process the upgrade right away.", // 50 words
  ],
  hindi: [
    "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?",              // Hindi short
    "आपकी अपॉइंटमेंट कल सुबह दस बजे के लिए बुक हो गई है।", // Hindi medium
    "धन्यवाद हमसे संपर्क करने के लिए। मैं आपका AI असिस्टेंट हूं और आज आपकी पूरी मदद करूंगा।", // Hindi long
  ],
  hinglish: [
    "Hello! Main aapki kaise help kar sakta hoon?",              // Hinglish short
    "Aapki appointment confirm ho gayi hai. Koi aur sawaal?",    // Hinglish medium
    "Main aapke account ki details check kar raha hoon. Ek minute please, main abhi aapko full information deta hoon.", // Hinglish long
  ]
};

// ─── COLORS ──────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgBlue: '\x1b[44m',
};

const color = (c, text) => `${c}${text}${C.reset}`;

// ─── CARTESIA LATENCY TEST ────────────────────────────────────
async function testCartesiaLatency(text, voiceId = args['voice-id']) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model_id: "sonic-2",
      transcript: text,
      voice: {
        mode: "id",
        id: voiceId,
      },
      output_format: {
        container: "raw",
        encoding: "pcm_s16le",
        sample_rate: 16000,
      },
      language: args['language'],
    });

    const options = {
      hostname: 'api.cartesia.ai',
      port: 443,
      path: '/tts/bytes',
      method: 'POST',
      headers: {
        'Cartesia-Version': '2024-06-10',
        'X-API-Key': CARTESIA_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const result = {
      text,
      charCount: text.length,
      wordCount: text.split(' ').length,
      startTime: performance.now(),
      ttfb: null,            // Time to First Byte
      totalTime: null,       // Time to Last Byte
      bytesReceived: 0,
      audioMs: null,         // Estimated audio duration
      error: null,
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errBody = '';
        res.on('data', d => errBody += d);
        res.on('end', () => {
          result.error = `HTTP ${res.statusCode}: ${errBody}`;
          resolve(result);
        });
        return;
      }

      let firstChunk = true;
      res.on('data', (chunk) => {
        if (firstChunk) {
          result.ttfb = performance.now() - result.startTime;
          firstChunk = false;
        }
        result.bytesReceived += chunk.length;
      });

      res.on('end', () => {
        result.totalTime = performance.now() - result.startTime;
        // PCM s16le at 16000Hz = 32000 bytes/second
        result.audioMs = (result.bytesReceived / 32000) * 1000;
        resolve(result);
      });
    });

    req.on('error', (err) => {
      result.error = err.message;
      result.totalTime = performance.now() - result.startTime;
      resolve(result);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      result.error = 'Timeout (10s)';
      result.totalTime = performance.now() - result.startTime;
      resolve(result);
    });

    req.write(body);
    req.end();
  });
}

// ─── SARVAM TTS LATENCY TEST ─────────────────────────────────
async function testSarvamLatency(text) {
  if (!SARVAM_API_KEY) return null;

  return new Promise((resolve) => {
    const body = JSON.stringify({
      inputs: [text],
      target_language_code: "hi-IN",
      speaker: "meera",
      model: "bulbul:v1",
    });

    const options = {
      hostname: 'api.sarvam.ai',
      port: 443,
      path: '/text-to-speech',
      method: 'POST',
      headers: {
        'API-Subscription-Key': SARVAM_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const result = {
      text,
      charCount: text.length,
      startTime: performance.now(),
      ttfb: null,
      totalTime: null,
      bytesReceived: 0,
      error: null,
    };

    const req = https.request(options, (res) => {
      let firstChunk = true;
      res.on('data', (chunk) => {
        if (firstChunk) {
          result.ttfb = performance.now() - result.startTime;
          firstChunk = false;
        }
        result.bytesReceived += chunk.length;
      });
      res.on('end', () => {
        result.totalTime = performance.now() - result.startTime;
        resolve(result);
      });
    });

    req.on('error', (err) => {
      result.error = err.message;
      resolve(result);
    });

    req.write(body);
    req.end();
  });
}

// ─── CONCURRENT LOAD TEST ─────────────────────────────────────
async function runConcurrentTest(text, concurrency, runs) {
  console.log(color(C.cyan, `\n⚡ Concurrent Load Test: ${concurrency} simultaneous requests × ${runs} rounds`));
  
  const allResults = [];
  
  for (let round = 0; round < runs; round++) {
    const promises = Array(concurrency).fill(null).map(() => testCartesiaLatency(text));
    const results = await Promise.all(promises);
    allResults.push(...results.filter(r => !r.error));
    
    const roundTTFBs = results.map(r => r.ttfb).filter(Boolean);
    const avgTTFB = roundTTFBs.reduce((a, b) => a + b, 0) / roundTTFBs.length;
    const errors = results.filter(r => r.error).length;
    
    process.stdout.write(`  Round ${round + 1}/${runs}: avg TTFB ${color(C.green, avgTTFB.toFixed(0) + 'ms')}${errors > 0 ? color(C.red, ` | ${errors} errors`) : ''}\r`);
  }
  
  return allResults;
}

// ─── STATISTICS ───────────────────────────────────────────────
function computeStats(values) {
  if (values.length === 0) return { min: 0, max: 0, avg: 0, p50: 0, p95: 0, p99: 0 };
  const sorted = [...values].sort((a, b) => a - b);
  const avg = sorted.reduce((a, b) => a + b, 0) / sorted.length;
  return {
    min:  Math.round(sorted[0]),
    max:  Math.round(sorted[sorted.length - 1]),
    avg:  Math.round(avg),
    p50:  Math.round(sorted[Math.floor(sorted.length * 0.50)]),
    p95:  Math.round(sorted[Math.floor(sorted.length * 0.95)]),
    p99:  Math.round(sorted[Math.floor(sorted.length * 0.99)]),
  };
}

function ttfbColor(ms) {
  if (ms < 200) return color(C.green, ms + 'ms ✅');
  if (ms < 400) return color(C.yellow, ms + 'ms ⚠️');
  return color(C.red, ms + 'ms ❌');
}

function printStats(label, stats) {
  console.log(`  ${color(C.bright, label)}`);
  console.log(`    Min: ${ttfbColor(stats.min)}  Max: ${ttfbColor(stats.max)}`);
  console.log(`    Avg: ${ttfbColor(stats.avg)}  P50: ${ttfbColor(stats.p50)}`);
  console.log(`    P95: ${ttfbColor(stats.p95)}  P99: ${ttfbColor(stats.p99)}`);
}

// ─── MAIN ─────────────────────────────────────────────────────
async function main() {
  console.log('\n' + color(C.bgBlue, color(C.bright, '  CARTESIA SONIC — LATENCY BENCHMARK  ')));
  console.log(color(C.dim, `  ${new Date().toISOString()} | Runs: ${RUNS} | Concurrent: ${CONCURRENT}`));
  console.log(color(C.dim, '─'.repeat(60)));

  // ── 1. Connectivity Check ──────────────────────────────────
  console.log(color(C.cyan, '\n📡 Step 1: Connectivity Check'));
  const pingResult = await testCartesiaLatency("Hello.");
  if (pingResult.error) {
    console.log(color(C.red, `  ❌ API Error: ${pingResult.error}`));
    console.log(color(C.yellow, '  Check your API key and network connection.'));
    process.exit(1);
  }
  console.log(color(C.green, `  ✅ Connected! First request TTFB: ${pingResult.ttfb?.toFixed(0)}ms`));

  // ── 2. Short Text Tests ────────────────────────────────────
  console.log(color(C.cyan, `\n📊 Step 2: Short Phrases (${RUNS} runs each)`));
  const shortResults = [];
  for (const text of TEST_SENTENCES.short) {
    for (let i = 0; i < RUNS; i++) {
      const r = await testCartesiaLatency(text);
      if (!r.error) shortResults.push(r);
    }
    const ttfbs = shortResults.slice(-RUNS).map(r => r.ttfb).filter(Boolean);
    const avgTTFB = ttfbs.reduce((a, b) => a + b, 0) / ttfbs.length;
    console.log(`  "${text.substring(0, 40)}..." → TTFB: ${ttfbColor(Math.round(avgTTFB))}`);
  }

  // ── 3. Medium Text Tests ───────────────────────────────────
  console.log(color(C.cyan, `\n📊 Step 3: Medium Sentences (${RUNS} runs each)`));
  const medResults = [];
  for (const text of TEST_SENTENCES.medium) {
    for (let i = 0; i < RUNS; i++) {
      const r = await testCartesiaLatency(text);
      if (!r.error) medResults.push(r);
    }
    const ttfbs = medResults.slice(-RUNS).map(r => r.ttfb).filter(Boolean);
    const avgTTFB = ttfbs.reduce((a, b) => a + b, 0) / ttfbs.length;
    console.log(`  "${text.substring(0, 40)}..." → TTFB: ${ttfbColor(Math.round(avgTTFB))}`);
  }

  // ── 4. Long Text Tests ─────────────────────────────────────
  console.log(color(C.cyan, `\n📊 Step 4: Long Responses (${RUNS} runs each)`));
  const longResults = [];
  for (const text of TEST_SENTENCES.long) {
    for (let i = 0; i < RUNS; i++) {
      const r = await testCartesiaLatency(text);
      if (!r.error) longResults.push(r);
    }
    const ttfbs = longResults.slice(-RUNS).map(r => r.ttfb).filter(Boolean);
    const avgTTFB = ttfbs.reduce((a, b) => a + b, 0) / ttfbs.length;
    console.log(`  "${text.substring(0, 40)}..." → TTFB: ${ttfbColor(Math.round(avgTTFB))}`);
  }

  // ── 5. Hindi Tests ─────────────────────────────────────────
  console.log(color(C.cyan, `\n🇮🇳 Step 5: Hindi Text (checking Hindi support)`));
  const hindiResults = [];
  for (const text of TEST_SENTENCES.hindi) {
    const r = await testCartesiaLatency(text);
    hindiResults.push(r);
    if (r.error) {
      console.log(`  "${text.substring(0, 30)}..." → ${color(C.red, '❌ Error: ' + r.error)}`);
    } else {
      console.log(`  "${text.substring(0, 30)}..." → TTFB: ${ttfbColor(Math.round(r.ttfb))} | Audio: ${Math.round(r.audioMs)}ms`);
    }
  }

  // ── 6. Concurrent Load Test ────────────────────────────────
  if (CONCURRENT > 1) {
    const concResults = await runConcurrentTest(
      TEST_SENTENCES.medium[0],
      CONCURRENT,
      Math.min(RUNS, 5)
    );
    const concTTFBs = concResults.map(r => r.ttfb).filter(Boolean);
    const concStats = computeStats(concTTFBs);
    console.log('');
    printStats(`Concurrent (${CONCURRENT} parallel)`, concStats);
  }

  // ── 7. Sarvam Comparison ───────────────────────────────────
  let sarvamStats = null;
  if (args['compare-sarvam'] && SARVAM_API_KEY) {
    console.log(color(C.cyan, '\n🔄 Step 6: Sarvam TTS Comparison'));
    const sarvamResults = [];
    for (const text of [...TEST_SENTENCES.short, ...TEST_SENTENCES.hindi]) {
      const r = await testSarvamLatency(text);
      if (r && !r.error) sarvamResults.push(r);
    }
    const sarvamTTFBs = sarvamResults.map(r => r.ttfb).filter(Boolean);
    sarvamStats = computeStats(sarvamTTFBs);
  }

  // ── FINAL REPORT ───────────────────────────────────────────
  const allTTFBs = [...shortResults, ...medResults, ...longResults]
    .map(r => r.ttfb).filter(Boolean);
  const allTotalTimes = [...shortResults, ...medResults, ...longResults]
    .map(r => r.totalTime).filter(Boolean);

  const ttfbStats  = computeStats(allTTFBs);
  const totalStats = computeStats(allTotalTimes);

  console.log('\n' + color(C.bgBlue, color(C.bright, '  📈 FINAL BENCHMARK REPORT  ')));
  console.log(color(C.dim, '─'.repeat(60)));

  printStats('TTFB (Time to First Audio Byte)', ttfbStats);
  console.log('');
  printStats('Total Request Time (all audio)', totalStats);

  // Throughput
  const avgBytesPerSec = [...shortResults, ...medResults]
    .filter(r => r.totalTime > 0)
    .map(r => r.bytesReceived / (r.totalTime / 1000))
    .reduce((a, b) => a + b, 0) / (shortResults.length + medResults.length);
  
  console.log(color(C.cyan, '\n  📦 Throughput'));
  console.log(`    Avg bytes/sec: ${Math.round(avgBytesPerSec).toLocaleString()} B/s`);
  console.log(`    PCM 16kHz equivalent: ${Math.round(avgBytesPerSec / 32000 * 1000)}ms audio/sec`);

  // ── LATENCY VERDICT ────────────────────────────────────────
  console.log(color(C.cyan, '\n  🏆 Latency Verdict'));
  const p95 = ttfbStats.p95;
  if (p95 < 200) {
    console.log(color(C.green, `  ✅ EXCELLENT — P95 TTFB ${p95}ms (well under 200ms target)`));
    console.log(color(C.green, '     Cartesia Sonic is PRODUCTION READY for English calls'));
  } else if (p95 < 400) {
    console.log(color(C.yellow, `  ⚠️  ACCEPTABLE — P95 TTFB ${p95}ms (under 400ms)`));
    console.log(color(C.yellow, '     Acceptable for non-realtime use cases'));
  } else {
    console.log(color(C.red, `  ❌ TOO SLOW — P95 TTFB ${p95}ms (over 400ms)`));
    console.log(color(C.red, '     Not suitable for real-time voice AI calls'));
  }

  // ── SARVAM VS CARTESIA COMPARISON ─────────────────────────
  if (sarvamStats) {
    console.log(color(C.cyan, '\n  📊 Cartesia vs Sarvam Comparison'));
    console.log(`  ${'Provider'.padEnd(15)} ${'P50 TTFB'.padEnd(20)} ${'P95 TTFB'.padEnd(20)} ${'Avg TTFB'}`);
    console.log('  ' + '─'.repeat(50));
    console.log(`  ${'Cartesia Sonic'.padEnd(15)} ${ttfbColor(ttfbStats.p50).padEnd(30)} ${ttfbColor(ttfbStats.p95).padEnd(30)} ${ttfbColor(ttfbStats.avg)}`);
    console.log(`  ${'Sarvam Bulbul'.padEnd(15)} ${ttfbColor(sarvamStats.p50).padEnd(30)} ${ttfbColor(sarvamStats.p95).padEnd(30)} ${ttfbColor(sarvamStats.avg)}`);
    
    const faster = ttfbStats.avg < sarvamStats.avg ? 'Cartesia' : 'Sarvam';
    const diff = Math.abs(ttfbStats.avg - sarvamStats.avg);
    console.log(color(C.bright, `\n  → ${faster} is ${diff}ms faster on average`));
  }

  // ── COST COMPARISON ────────────────────────────────────────
  console.log(color(C.cyan, '\n  💰 Cost Comparison (per 1,000 chars)'));
  console.log(`  Cartesia Sonic: ${color(C.yellow, '₹5.4')}  (=$0.065)`);
  console.log(`  Sarvam Bulbul:  ${color(C.green, '₹3.0')}  (current)`);
  console.log(`  Azure Neural:   ${color(C.green, '₹1.33')} ($0.016)`);
  console.log(`  Kokoro (GPU):   ${color(C.green, '₹0.06')} (self-hosted)`);
  console.log(color(C.bright, '\n  ⚠️  Cartesia is 1.8× MORE EXPENSIVE than Sarvam!'));
  console.log('     Use Cartesia for ENGLISH calls only (latency advantage)');
  console.log('     Use Sarvam/Kokoro for Hindi/Hinglish calls\n');
}

main().catch(console.error);
