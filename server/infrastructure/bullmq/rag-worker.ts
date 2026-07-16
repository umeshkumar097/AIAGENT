'use strict';
/**
 * ============================================================
 * BullMQ RAG Knowledge Worker
 * 
 * Processes document chunking and embedding generation asynchronously.
 * ============================================================
 */

import { Worker, Job } from 'bullmq';
import { getRedisConnection } from './redis-connection';
import { QUEUE_NAMES, RAGProcessingJob } from './queues';

let ragWorker: Worker<RAGProcessingJob> | null = null;

async function processRAGJob(job: Job<RAGProcessingJob>): Promise<{ success: boolean; chunksCreated: number }> {
  const { knowledgeBaseId, userId, content, metadata } = job.data;
  console.log(`[RAGWorker] Processing knowledge item ${knowledgeBaseId} for user ${userId}`);

  try {
    const { RAGKnowledgeService } = await import('../../services/rag-knowledge');
    const result = await RAGKnowledgeService.processKnowledgeItem(
      knowledgeBaseId,
      userId,
      content,
      metadata
    );

    if (!result.success) {
      throw new Error(result.error || 'Failed to process knowledge item');
    }

    console.log(`[RAGWorker] Successfully processed knowledge item ${knowledgeBaseId}. Chunks created: ${result.chunksCreated}`);
    return { success: true, chunksCreated: result.chunksCreated };
  } catch (error: any) {
    console.error(`[RAGWorker] Error processing knowledge item ${knowledgeBaseId}:`, error.message);
    throw error;
  }
}

export function startRAGWorker(): Worker<RAGProcessingJob> {
  if (ragWorker) {
    return ragWorker;
  }

  ragWorker = new Worker<RAGProcessingJob>(
    QUEUE_NAMES.RAG_PROCESSING,
    processRAGJob,
    {
      connection: getRedisConnection(),
      concurrency: 2, // Limit concurrent embedding calls to prevent rate-limiting and CPU load
    }
  );

  ragWorker.on('completed', (job) => {
    console.log(`[RAGWorker] Job ${job.id} completed successfully`);
  });

  ragWorker.on('failed', (job, err) => {
    if (job) {
      console.error(`[RAGWorker] Job ${job.id} failed:`, err.message);
    }
  });

  ragWorker.on('error', (err) => {
    console.error('[RAGWorker] Worker error:', err.message);
  });

  console.log('[RAGWorker] Started successfully');
  return ragWorker;
}

export async function stopRAGWorker(): Promise<void> {
  if (ragWorker) {
    await ragWorker.close();
    ragWorker = null;
    console.log('[RAGWorker] Stopped');
  }
}

export function getRAGWorker(): Worker<RAGProcessingJob> | null {
  return ragWorker;
}
