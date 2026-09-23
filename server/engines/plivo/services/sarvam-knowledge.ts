'use strict';
/**
 * Knowledge base retrieval for Sarvam calls.
 *
 * The Sarvam pipeline talks to chat/completions once per turn, so a tool round-trip
 * (model → lookup → model) would add a whole extra LLM call to every answer. Instead the
 * caller's utterance is embedded, matched against the agent's chunks in memory and the
 * best passages are injected into the system prompt before the (single) LLM call.
 *
 * Chunks + embeddings are loaded once per call (in the background at session start) so a
 * turn only pays for the query embedding (~100-200 ms) plus an in-process cosine scan.
 */
import { RAGKnowledgeService, cosineSimilarity, generateEmbedding } from '../../../services/rag-knowledge';
import { logger } from '../../../utils/logger';

/** Hard cap on chunks held per call (≈ 2000 × 1536 floats ≈ 25 MB) */
const MAX_CHUNKS = 2000;
/** Passages below this cosine score are noise for text-embedding-3-small */
const MIN_SCORE = 0.25;
const MAX_PASSAGES = 4;
/** Keep the injected context short — it is read on every turn of a phone call */
const MAX_CONTEXT_CHARS = 1400;
/** Never hold the reply hostage to a slow chunk preload */
const RETRIEVE_TIMEOUT_MS = 900;
/** The query embedding sits on the serial path before GPT — give up fast and reuse the last context */
const EMBED_TIMEOUT_MS = 450;
/** Repeated questions on a call reuse their embedding */
const EMBED_CACHE_MAX = 64;
/** "haan", "ok", "theek hai" carry no retrieval signal — reuse the previous context */
const MIN_QUERY_WORDS = 3;

interface LoadedChunk {
  text: string;
  embedding: number[];
}

export class SarvamKnowledge {
  private chunks: LoadedChunk[] = [];
  private loading: Promise<void> | null = null;
  private lastContext: string | null = null;
  private readonly embedCache = new Map<string, number[]>();

  private constructor(
    private readonly callUuid: string,
    private readonly userId: string,
    private readonly knowledgeBaseIds: string[],
  ) {}

  /** Returns null when the agent has no knowledge base attached. */
  static create(callUuid: string, userId: string | undefined, knowledgeBaseIds: string[] | null | undefined): SarvamKnowledge | null {
    const ids = (knowledgeBaseIds || []).filter((id): id is string => typeof id === 'string' && id.length > 0);
    if (!userId || ids.length === 0) return null;
    return new SarvamKnowledge(callUuid, userId, ids);
  }

  /** Loads chunks + embeddings into memory; safe to call more than once. */
  preload(): Promise<void> {
    if (!this.loading) {
      this.loading = RAGKnowledgeService.loadChunksForSearch(this.knowledgeBaseIds, this.userId, MAX_CHUNKS)
        .then(rows => {
          this.chunks = rows;
          logger.info(`[SarvamKnowledge][${this.callUuid}] Loaded ${rows.length} chunks from ${this.knowledgeBaseIds.length} knowledge base(s)`);
        })
        .catch(err => {
          logger.error(`[SarvamKnowledge][${this.callUuid}] Failed to load chunks: ${err?.message}`);
        });
    }
    return this.loading;
  }

  /**
   * Best passages for the caller's last utterance, formatted for the prompt.
   * Falls back to the previous turn's context on short utterances, timeouts or errors.
   */
  async retrieve(query: string, signal?: AbortSignal): Promise<string | null> {
    const trimmed = (query || '').trim();
    if (!trimmed) return this.lastContext;
    if (trimmed.split(/\s+/).length < MIN_QUERY_WORDS) return this.lastContext;

    try {
      await Promise.race([this.preload(), delay(RETRIEVE_TIMEOUT_MS)]);
      if (signal?.aborted || this.chunks.length === 0) return this.lastContext;

      const embedding = await this.embed(trimmed);
      if (!embedding || signal?.aborted) {
        if (!embedding) logger.warn(`[SarvamKnowledge][${this.callUuid}] Query embedding timed out; reusing previous context`);
        return this.lastContext;
      }

      const ranked = this.chunks
        .map(chunk => ({ text: chunk.text, score: cosineSimilarity(embedding, chunk.embedding) }))
        .filter(c => c.score >= MIN_SCORE)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_PASSAGES);

      if (ranked.length === 0) {
        logger.info(`[SarvamKnowledge][${this.callUuid}] No passage above ${MIN_SCORE} for "${trimmed.substring(0, 40)}"`);
        this.lastContext = null;
        return null;
      }

      let budget = MAX_CONTEXT_CHARS;
      const passages: string[] = [];
      for (const { text } of ranked) {
        if (budget <= 80) break;
        const slice = text.length > budget ? `${text.substring(0, budget - 1)}…` : text;
        passages.push(`- ${slice}`);
        budget -= slice.length;
      }
      this.lastContext = passages.join('\n');
      logger.info(`[SarvamKnowledge][${this.callUuid}] ${ranked.length} passage(s), top score ${ranked[0].score.toFixed(3)}`);
      return this.lastContext;
    } catch (err: any) {
      if (err?.name !== 'AbortError') logger.error(`[SarvamKnowledge][${this.callUuid}] Retrieval failed: ${err?.message}`);
      return this.lastContext;
    }
  }

  /** Query embedding with a short timeout and a small per-call memo (repeat questions are common). */
  private async embed(text: string): Promise<number[] | null> {
    const key = text.toLowerCase().replace(/\s+/g, ' ');
    const cached = this.embedCache.get(key);
    if (cached) return cached;
    const embedding = await Promise.race([
      generateEmbedding(text),
      delay(EMBED_TIMEOUT_MS).then(() => null),
    ]);
    if (embedding) {
      if (this.embedCache.size >= EMBED_CACHE_MAX) {
        const oldest = this.embedCache.keys().next().value;
        if (oldest !== undefined) this.embedCache.delete(oldest);
      }
      this.embedCache.set(key, embedding);
    }
    return embedding;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
