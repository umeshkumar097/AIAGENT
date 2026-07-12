'use strict';
/**
 * ============================================================
 * BullMQ PDF Generation Worker
 * Processes background PDF generation for invoices and refund notes.
 * ============================================================
 */

import { Worker, Job } from 'bullmq';
import { getRedisConnection } from './redis-connection';
import { QUEUE_NAMES, PDFGenerationJob } from './queues';

let pdfWorker: Worker<PDFGenerationJob> | null = null;

const CONCURRENCY = parseInt(process.env.BULLMQ_PDF_CONCURRENCY || '2', 10);

async function processPDFGeneration(job: Job<PDFGenerationJob>): Promise<{ success: boolean; path?: string }> {
  const { type, targetId } = job.data;
  
  console.log(`[PDFWorker] Generating ${type} PDF for ID: ${targetId}`);
  
  try {
    if (type === 'invoice') {
      const { invoiceService } = await import('../../engines/payment/invoice-service');
      const invoice = await invoiceService.generateInvoice(targetId);
      console.log(`[PDFWorker] Successfully generated invoice PDF: ${invoice.invoiceNumber}`);
      return { success: true, path: invoice.pdfUrl || undefined };
    } else if (type === 'refund-note') {
      const { refundNoteService } = await import('../../services/refund-note-service');
      const refund = await refundNoteService.generateRefundNote(targetId);
      console.log(`[PDFWorker] Successfully generated refund note PDF: ${refund.pdfUrl || ''}`);
      return { success: true, path: refund.pdfUrl || undefined };
    } else {
      throw new Error(`Unknown PDF generation type: ${type}`);
    }
  } catch (error: any) {
    console.error(`[PDFWorker] PDF generation failed for ${type} ${targetId}:`, error.message);
    throw error;
  }
}

export function startPDFWorker(): Worker<PDFGenerationJob> {
  if (pdfWorker) {
    return pdfWorker;
  }
  
  pdfWorker = new Worker<PDFGenerationJob>(
    QUEUE_NAMES.PDF_GENERATION,
    processPDFGeneration,
    {
      connection: getRedisConnection(),
      concurrency: CONCURRENCY,
    }
  );
  
  pdfWorker.on('completed', (job, result) => {
    console.log(`[PDFWorker] Job ${job.id} completed:`, result);
  });
  
  pdfWorker.on('failed', (job, err) => {
    if (job) {
      console.error(`[PDFWorker] Job ${job.id} failed after retries:`, err.message);
    }
  });
  
  pdfWorker.on('error', (err) => {
    console.error('[PDFWorker] Worker error:', err.message);
  });
  
  console.log(`[PDFWorker] Started with concurrency: ${CONCURRENCY}`);
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
