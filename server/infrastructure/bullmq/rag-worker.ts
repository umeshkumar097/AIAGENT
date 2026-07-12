'use strict';
/**
 * ============================================================
 * BullMQ RAG Ingestion Worker
 * Processes background document parsing, chunking, and embedding generation (RAG).
 * ============================================================
 */

import { Worker, Job } from 'bullmq';
import { getRedisConnection } from './redis-connection';
import { QUEUE_NAMES, RAGProcessingJob } from './queues';

let ragWorker: Worker<RAGProcessingJob> | null = null;

const CONCURRENCY = parseInt(process.env.BULLMQ_RAG_CONCURRENCY || '1', 10); // RAG is extremely CPU-bound; default to 1

async function processRAGIngestion(job: Job<RAGProcessingJob>): Promise<{ success: boolean }> {
  const { knowledgeBaseId, userId, fileContent, metadata } = job.data;
  const docName = metadata.filename || metadata.url || 'Text Ingest';
  
  console.log(`[RAGWorker] Processing RAG document: ${docName} (ID: ${knowledgeBaseId}) for user: ${userId}`);
  
  try {
    const { RAGKnowledgeService } = await import('../../services/rag-knowledge');
    await RAGKnowledgeService.processKnowledgeItem(
      knowledgeBaseId,
      userId,
      fileContent,
      metadata
    );
    console.log(`[RAGWorker] Successfully processed RAG document: ${docName}`);
    return { success: true };
  } catch (error: any) {
    console.error(`[RAGWorker] RAG processing failed for ${docName} (${knowledgeBaseId}):`, error.message);
    throw error;
  }
}

export function startRAGWorker(): Worker<RAGProcessingJob> {
  if (ragWorker) {
    return ragWorker;
  }
  
  ragWorker = new Worker<RAGProcessingJob>(
    QUEUE_NAMES.RAG_PROCESSING,
    processRAGIngestion,
    {
      connection: getRedisConnection(),
      concurrency: CONCURRENCY,
    }
  );
  
  ragWorker.on('completed', (job, result) => {
    console.log(`[RAGWorker] Job ${job.id} completed:`, result);
  });
  
  ragWorker.on('failed', (job, err) => {
    if (job) {
      console.error(`[RAGWorker] Job ${job.id} failed after retries:`, err.message);
    }
  });
  
  ragWorker.on('error', (err) => {
    console.error('[RAGWorker] Worker error:', err.message);
  });
  
  console.log(`[RAGWorker] Started with concurrency: ${CONCURRENCY}`);
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
