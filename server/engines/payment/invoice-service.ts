'use strict';
/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

/**
 * GST tax invoices and credit notes (India).
 * - Seller block from invoice_* settings (Aiclex defaults), buyer block from users.billing* + gstin.
 * - Tax split: the PriceQuote stored on the transaction at checkout (metadata.gst) is used verbatim; transactions
 *   without one (pre-checkout-page) are treated as GST-inclusive: taxable = total / (1 + rate).
 *   CGST+SGST when buyer state == seller state, else IGST.
 * - Numbering: <prefix>/<FY>/<0001> per financial year (Apr–Mar); credit notes CN/<FY>/<n>.
 * - PDFs stored under data/invoices (INVOICE_STORAGE_DIR) and regenerated on demand if missing.
 */
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument as PDFLib } from 'pdf-lib';
import { storage } from '../../storage';
import { logger } from '../../utils/logger';
import type { Invoice, InsertInvoice, PaymentTransaction, User } from '@shared/schema';
import {
  CREDIT_NOTE_PREFIX, INVOICE_TIMEZONE, computeGst, computeGstForPrice, getFinancialYear, getSellerInfo,
  invoiceNumberToFilename, resolveStateCode, round2, stateNameForCode, type GstBreakdown, type PriceQuote, type SellerInfo,
} from './invoice-gst';
import { renderInvoicePdf, type InvoiceLineItem } from './invoice-pdf';

const INVOICE_DIR = process.env.INVOICE_STORAGE_DIR || './data/invoices';
const SOURCE = 'InvoiceService';

export type LineItem = InvoiceLineItem;
/** Kept for backwards compatibility with older imports; the seller block now comes from SellerInfo. */
export type CompanyInfo = SellerInfo;

function ensureInvoiceDir(): void {
  if (!fs.existsSync(INVOICE_DIR)) {
    fs.mkdirSync(INVOICE_DIR, { recursive: true });
    logger.info(`Created invoice directory: ${INVOICE_DIR}`, undefined, SOURCE);
  }
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

interface BuyerInfo {
  name: string;
  email: string;
  address: string | null;
  gstin: string | null;
  stateCode: string | null;
}

/** Explicit GST state code wins; otherwise derive from the GSTIN (first two digits) or the state name. */
export function resolveBuyerStateCode(user: Pick<User, 'billingStateCode' | 'gstin' | 'billingState'>): string | null {
  const gstin = (user.gstin || '').trim().toUpperCase();
  return resolveStateCode(user.billingStateCode)
    || (/^\d{2}/.test(gstin) ? resolveStateCode(gstin.slice(0, 2)) : null)
    || resolveStateCode(user.billingState);
}

function buildBuyerInfo(user: User): BuyerInfo {
  const addressParts = [
    user.billingAddressLine1,
    user.billingAddressLine2,
    [user.billingCity, user.billingState].filter(Boolean).join(', '),
    [user.billingPostalCode, user.billingCountry].filter(Boolean).join(' '),
    user.billingPhone ? `Phone: ${user.billingPhone}` : null,
  ].map(p => (p || '').trim()).filter(Boolean);
  return {
    name: (user.billingName || user.company || user.name || '').trim() || user.email,
    email: user.email,
    address: addressParts.length ? addressParts.join('\n') : null,
    gstin: (user.gstin || '').trim().toUpperCase() || null,
    stateCode: resolveBuyerStateCode(user),
  };
}

/** The checkout quote stored on the transaction (metadata.gst), when it is complete enough to invoice from. */
export function storedPriceQuote(transaction: PaymentTransaction): PriceQuote | null {
  const meta = (transaction.metadata || {}) as Record<string, unknown>;
  const gst = meta.gst as Partial<PriceQuote> | undefined;
  if (!gst || typeof gst !== 'object') return null;
  const numeric = ['total', 'taxableAmount', 'taxAmount', 'cgst', 'sgst', 'igst', 'taxRate', 'listPrice'] as const;
  if (!numeric.every(k => typeof gst[k] === 'number' && Number.isFinite(gst[k]))) return null;
  if (typeof gst.isInterState !== 'boolean') return null;
  return gst as PriceQuote;
}

export interface CreditNoteInput {
  transactionId: string;
  /** Refund amount (GST-inclusive, INR) */
  amount: number;
  refundId?: string;
  reason?: string;
}

export class InvoiceService {
  /** Seller block (settings with Aiclex defaults). */
  async getCompanyInfo(): Promise<SellerInfo> {
    return getSellerInfo();
  }

  /**
   * Creates the GST tax invoice for a completed transaction (idempotent per transaction).
   */
  async generateInvoice(transactionId: string): Promise<Invoice> {
    logger.info(`Generating invoice for transaction: ${transactionId}`, undefined, SOURCE);

    const transaction = await storage.getPaymentTransaction(transactionId);
    if (!transaction) {
      throw new Error(`Transaction not found: ${transactionId}`);
    }
    if (!['completed', 'refunded', 'partially_refunded', 'fulfilment_failed'].includes(transaction.status)) {
      throw new Error(`Cannot generate invoice for non-completed transaction. Status: ${transaction.status}`);
    }

    const existingInvoice = await storage.getTransactionInvoice(transactionId);
    if (existingInvoice) {
      logger.info(`Invoice already exists for transaction: ${transactionId}`, { invoiceNumber: existingInvoice.invoiceNumber }, SOURCE);
      return existingInvoice;
    }

    const user = await storage.getUser(transaction.userId);
    if (!user) {
      throw new Error(`User not found: ${transaction.userId}`);
    }

    const seller = await getSellerInfo();
    const buyer = buildBuyerInfo(user);
    const total = round2(toNumber(transaction.amount));
    // The quote the customer saw at checkout wins; older transactions were GST-inclusive.
    // Unknown buyer state → treat as intra-state (CGST+SGST, place of supply = seller state)
    const quote = storedPriceQuote(transaction);
    const isInterState = quote ? quote.isInterState : !!buyer.stateCode && buyer.stateCode !== seller.stateCode;
    const gst: GstBreakdown = quote || computeGstForPrice(total, seller.gstRate, isInterState, true);
    const placeOfSupplyCode = (quote ? quote.buyerStateCode : buyer.stateCode) || seller.stateCode;
    const issuedAt = transaction.completedAt || new Date();
    const financialYear = getFinancialYear(issuedAt);
    const lineItems = this.buildLineItems(transaction, gst.taxableAmount);

    const invoice = await storage.createInvoiceWithNumber({
      transactionId: transaction.id,
      userId: user.id,
      customerName: buyer.name,
      customerEmail: buyer.email,
      customerAddress: buyer.address,
      description: transaction.description,
      lineItems,
      subtotal: gst.taxableAmount.toFixed(2),
      tax: gst.taxAmount.toFixed(2),
      total: gst.total.toFixed(2),
      currency: transaction.currency || 'INR',
      gateway: transaction.gateway,
      paymentMethod: transaction.paymentMethod || this.getPaymentMethodDisplay(transaction),
      invoiceType: 'tax_invoice',
      relatedInvoiceId: null,
      financialYear,
      ...this.sellerSnapshot(seller),
      buyerGstin: buyer.gstin,
      buyerStateCode: quote ? quote.buyerStateCode : buyer.stateCode,
      placeOfSupply: this.placeOfSupplyLabel(placeOfSupplyCode),
      hsnSac: seller.hsnSac,
      taxableAmount: gst.taxableAmount.toFixed(2),
      cgst: gst.cgst.toFixed(2),
      sgst: gst.sgst.toFixed(2),
      igst: gst.igst.toFixed(2),
      taxRate: gst.taxRate.toFixed(2),
      isInterState,
      pdfUrl: null,
      pdfGeneratedAt: null,
      status: 'paid',
      emailSentAt: null,
      emailSentTo: null,
      issuedAt,
      dueAt: issuedAt,
      paidAt: issuedAt,
    }, { prefix: seller.prefix, financialYear });

    logger.info(`Invoice record created: ${invoice.id}`, { invoiceNumber: invoice.invoiceNumber }, SOURCE);
    await storage.updatePaymentTransaction(transaction.id, { invoiceId: invoice.id });
    return this.renderAndStore(invoice);
  }

  /**
   * Issues a credit note against the transaction's tax invoice for a (partial) refund.
   * Tax is split with the same rate / inter-state rule as the original invoice.
   */
  async generateCreditNote(input: CreditNoteInput): Promise<Invoice> {
    const transaction = await storage.getPaymentTransaction(input.transactionId);
    if (!transaction) throw new Error(`Transaction not found: ${input.transactionId}`);
    const user = await storage.getUser(transaction.userId);
    if (!user) throw new Error(`User not found: ${transaction.userId}`);

    // Make sure the original tax invoice exists so the credit note can reference it
    let original = await storage.getTransactionInvoice(transaction.id);
    if (!original) {
      original = await this.generateInvoice(transaction.id);
    }

    const seller = await getSellerInfo();
    // Cumulative credit notes can never exceed the tax invoice total
    const issuedNotes = await storage.getTransactionCreditNotes(transaction.id);
    const alreadyCredited = round2(issuedNotes.reduce((sum, note) => sum + toNumber(note.total), 0));
    const remaining = round2(toNumber(original.total) - alreadyCredited);
    if (remaining <= 0) {
      throw new Error(`Credit notes already cover the full value of invoice ${original.invoiceNumber}`);
    }
    const amount = round2(Math.min(Math.max(input.amount, 0), remaining));
    const isInterState = original.isInterState ?? (!!original.buyerStateCode && original.buyerStateCode !== seller.stateCode);
    const rate = original.taxRate != null ? toNumber(original.taxRate) : seller.gstRate;
    const gst = computeGst(amount, rate, isInterState);
    const issuedAt = new Date();
    const financialYear = getFinancialYear(issuedAt);
    const description = `Refund of Rs. ${amount.toFixed(2)} against invoice ${original.invoiceNumber}`
      + (input.reason ? ` (${input.reason})` : '')
      + (input.refundId ? ` — refund ref ${input.refundId}` : '');

    const creditNote = await storage.createInvoiceWithNumber({
      transactionId: transaction.id,
      userId: user.id,
      customerName: original.customerName,
      customerEmail: original.customerEmail,
      customerAddress: original.customerAddress,
      description,
      lineItems: [{ description: `Refund — ${transaction.description}`, quantity: 1, unitPrice: amount, total: amount }],
      subtotal: gst.taxableAmount.toFixed(2),
      tax: gst.taxAmount.toFixed(2),
      total: gst.total.toFixed(2),
      currency: original.currency,
      gateway: transaction.gateway,
      paymentMethod: original.paymentMethod,
      invoiceType: 'credit_note',
      relatedInvoiceId: original.id,
      financialYear,
      ...this.sellerSnapshot(seller),
      buyerGstin: original.buyerGstin,
      buyerStateCode: original.buyerStateCode,
      placeOfSupply: original.placeOfSupply || this.placeOfSupplyLabel(original.buyerStateCode || seller.stateCode),
      hsnSac: original.hsnSac || seller.hsnSac,
      taxableAmount: gst.taxableAmount.toFixed(2),
      cgst: gst.cgst.toFixed(2),
      sgst: gst.sgst.toFixed(2),
      igst: gst.igst.toFixed(2),
      taxRate: gst.taxRate.toFixed(2),
      isInterState,
      pdfUrl: null,
      pdfGeneratedAt: null,
      status: 'issued',
      emailSentAt: null,
      emailSentTo: null,
      issuedAt,
      dueAt: null,
      paidAt: null,
    }, { prefix: CREDIT_NOTE_PREFIX, financialYear });

    logger.info(`Credit note created: ${creditNote.invoiceNumber}`, { transactionId: transaction.id, amount }, SOURCE);
    return this.renderAndStore(creditNote);
  }

  private sellerSnapshot(seller: SellerInfo): Pick<InsertInvoice, 'sellerName' | 'sellerGstin' | 'sellerAddress' | 'sellerStateCode'> {
    return {
      sellerName: seller.name,
      sellerGstin: seller.gstin,
      sellerAddress: seller.address,
      sellerStateCode: seller.stateCode,
    };
  }

  private placeOfSupplyLabel(stateCode: string | null | undefined): string | null {
    if (!stateCode) return null;
    const name = stateNameForCode(stateCode);
    return name ? `${stateCode} - ${name}` : stateCode;
  }

  private async renderAndStore(invoice: Invoice): Promise<Invoice> {
    try {
      const pdfBuffer = await this.generatePDF(invoice);
      const pdfPath = await this.savePDF(invoice.invoiceNumber, pdfBuffer);
      await storage.updateInvoice(invoice.id, { pdfUrl: pdfPath, pdfGeneratedAt: new Date() });
      logger.info(`PDF generated and saved: ${pdfPath}`, undefined, SOURCE);
      const updated = await storage.getInvoice(invoice.id);
      return updated || invoice;
    } catch (error) {
      logger.error(`Failed to generate PDF for invoice: ${invoice.id}`, error, SOURCE);
      return invoice;
    }
  }

  /** One line per transaction; unit price = taxable (pre-GST) value so the totals block adds the tax once. */
  private buildLineItems(transaction: PaymentTransaction, taxableAmount: number): LineItem[] {
    const amount = round2(taxableAmount);
    if (transaction.type === 'credits' && transaction.creditsAwarded) {
      return [{ description: `${transaction.creditsAwarded} Credits — ${transaction.description}`, quantity: 1, unitPrice: amount, total: amount }];
    }
    if (transaction.type === 'subscription' || transaction.type === 'plan') {
      const billingPeriod = transaction.billingPeriod === 'yearly' ? 'Yearly' : 'Monthly';
      const meta = (transaction.metadata || {}) as Record<string, unknown>;
      const kind = meta.recurring === true ? 'Subscription, auto-renewal' : 'Subscription';
      return [{ description: `${transaction.description} (${billingPeriod} ${kind})`, quantity: 1, unitPrice: amount, total: amount }];
    }
    if (transaction.type === 'phone_number') {
      const meta = (transaction.metadata || {}) as Record<string, unknown>;
      const number = typeof meta.phoneNumber === 'string' ? ` ${meta.phoneNumber}` : '';
      return [{ description: `Phone number rental${number} — ${transaction.description}`, quantity: 1, unitPrice: amount, total: amount }];
    }
    return [{ description: transaction.description, quantity: 1, unitPrice: amount, total: amount }];
  }

  private getPaymentMethodDisplay(transaction: PaymentTransaction): string {
    const metadata = transaction.metadata as Record<string, unknown> | null;
    if (metadata && typeof metadata.paymentMethod === 'string') return metadata.paymentMethod;
    return transaction.gateway.charAt(0).toUpperCase() + transaction.gateway.slice(1);
  }

  async generatePDF(invoice: Invoice): Promise<Buffer> {
    const seller = await getSellerInfo();
    let relatedInvoiceNumber: string | null = null;
    if (invoice.relatedInvoiceId) {
      const related = await storage.getInvoice(invoice.relatedInvoiceId);
      relatedInvoiceNumber = related?.invoiceNumber || null;
    }
    const raw = await renderInvoicePdf(invoice, seller, { relatedInvoiceNumber, timezone: INVOICE_TIMEZONE });
    // Guard against pdfkit overflowing onto a blank second page (very long descriptions)
    const pdfDoc = await PDFLib.load(raw);
    if (pdfDoc.getPageCount() > 1) {
      for (let i = pdfDoc.getPageCount() - 1; i >= 1; i--) pdfDoc.removePage(i);
      return Buffer.from(await pdfDoc.save());
    }
    return raw;
  }

  private async savePDF(invoiceNumber: string, buffer: Buffer): Promise<string> {
    ensureInvoiceDir();
    const filepath = path.join(INVOICE_DIR, `${invoiceNumberToFilename(invoiceNumber)}.pdf`);
    await fs.promises.writeFile(filepath, buffer);
    return filepath;
  }

  /** Returns the stored PDF, regenerating (and re-saving) it when the file is missing. */
  async getInvoicePDF(invoiceId: string): Promise<Buffer | null> {
    const invoice = await storage.getInvoice(invoiceId);
    if (!invoice) {
      logger.warn(`Invoice not found: ${invoiceId}`, undefined, SOURCE);
      return null;
    }
    if (invoice.pdfUrl && fs.existsSync(invoice.pdfUrl)) {
      return fs.promises.readFile(invoice.pdfUrl);
    }
    logger.info(`PDF file not found, regenerating for invoice: ${invoice.invoiceNumber}`, undefined, SOURCE);
    const pdfBuffer = await this.generatePDF(invoice);
    const pdfPath = await this.savePDF(invoice.invoiceNumber, pdfBuffer);
    await storage.updateInvoice(invoice.id, { pdfUrl: pdfPath, pdfGeneratedAt: new Date() });
    return pdfBuffer;
  }

  async getInvoicePDFByNumber(invoiceNumber: string): Promise<Buffer | null> {
    const invoice = await storage.getInvoiceByNumber(invoiceNumber);
    if (!invoice) {
      logger.warn(`Invoice not found by number: ${invoiceNumber}`, undefined, SOURCE);
      return null;
    }
    return this.getInvoicePDF(invoice.id);
  }

  async regeneratePDF(invoiceId: string): Promise<string | null> {
    const invoice = await storage.getInvoice(invoiceId);
    if (!invoice) {
      logger.warn(`Invoice not found for regeneration: ${invoiceId}`, undefined, SOURCE);
      return null;
    }
    const pdfBuffer = await this.generatePDF(invoice);
    const pdfPath = await this.savePDF(invoice.invoiceNumber, pdfBuffer);
    await storage.updateInvoice(invoice.id, { pdfUrl: pdfPath, pdfGeneratedAt: new Date() });
    logger.info(`PDF regenerated for invoice: ${invoice.invoiceNumber}`, undefined, SOURCE);
    return pdfPath;
  }
}

export const invoiceService = new InvoiceService();

export async function generateInvoiceForTransaction(transactionId: string): Promise<Invoice | null> {
  try {
    const invoice = await invoiceService.generateInvoice(transactionId);
    logger.info(`Invoice generated successfully: ${invoice.invoiceNumber}`, { transactionId }, SOURCE);
    return invoice;
  } catch (error) {
    logger.error(`Failed to auto-generate invoice for transaction: ${transactionId}`, error, SOURCE);
    return null;
  }
}
