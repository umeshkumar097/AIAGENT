'use strict';
/**
 * ============================================================
 * BullMQ PDF Generation Worker
 * 
 * Generates invoice and refund PDFs asynchronously.
 * ============================================================
 */

import { Worker, Job } from 'bullmq';
import { getRedisConnection } from './redis-connection';
import { QUEUE_NAMES, PDFGenerationJob } from './queues';

let pdfWorker: Worker<PDFGenerationJob> | null = null;

async function processPDFJob(job: Job<PDFGenerationJob>): Promise<{ success: boolean; pdfPath: string | null }> {
  const { type, id } = job.data;
  console.log(`[PDFWorker] Processing PDF job of type: ${type} for ID: ${id}`);

  try {
    const { invoiceService } = await import('../../engines/payment/invoice-service');
    
    if (type === 'invoice') {
      const pdfPath = await invoiceService.regeneratePDF(id);
      return { success: !!pdfPath, pdfPath };
    } else {
      throw new Error(`Unsupported PDF generation type: ${type}`);
    }
  } catch (error: any) {
    console.error(`[PDFWorker] Error generating PDF for ${type} ${id}:`, error.message);
    throw error;
  }
}

export function startPDFWorker(): Worker<PDFGenerationJob> {
  if (pdfWorker) {
    return pdfWorker;
  }

  pdfWorker = new Worker<PDFGenerationJob>(
    QUEUE_NAMES.PDF_GENERATION,
    processPDFJob,
    {
      connection: getRedisConnection(),
      concurrency: 2, // Low concurrency to avoid CPU spikes
    }
  );

  pdfWorker.on('completed', (job) => {
    console.log(`[PDFWorker] Job ${job.id} completed successfully`);
  });

  pdfWorker.on('failed', (job, err) => {
    if (job) {
      console.error(`[PDFWorker] Job ${job.id} failed:`, err.message);
    }
  });

  pdfWorker.on('error', (err) => {
    console.error('[PDFWorker] Worker error:', err.message);
  });

  console.log('[PDFWorker] Started successfully');
  return pdfWorker;
}

export async function stopPDFWorker(): Promise<void> {
  if (pdfWorker) {
    await pdfWorker.close();
    pdfWorker = null;
    console.log('[PDFWorker] Stopped');
  }
}

export function getPDFWorker(): Worker<PDFGenerationJob> | null {
  return pdfWorker;
}
