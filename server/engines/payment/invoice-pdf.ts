'use strict';
/**
 * PDF renderer for GST tax invoices and credit notes (pdfkit, single A4 page).
 * Legacy invoices (issued before GST fields existed) render with a plain subtotal/tax/total block.
 */
import PDFDocument from 'pdfkit';
import type { Invoice } from '@shared/schema';
import { amountInWordsINR, stateNameForCode, type SellerInfo } from './invoice-gst';
import { logger } from '../../utils/logger';

const SOURCE = 'InvoicePdf';
const PAGE_MARGIN = 40;
const COLOR_TEXT = '#222222';
const COLOR_MUTED = '#666666';
const COLOR_LINE = '#d9d9d9';
const COLOR_FILL = '#f4f5f7';

type Doc = PDFKit.PDFDocument;

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoicePdfMeta {
  /** Original tax invoice number when rendering a credit note */
  relatedInvoiceNumber?: string | null;
  timezone: string;
}

function num(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

/** Standard PDF fonts have no rupee glyph, so amounts are printed as "Rs. 1,180.00". */
export function formatINR(value: string | number | null | undefined): string {
  const n = num(value);
  return `Rs. ${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date | string | null | undefined, timezone: string): string {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit', timeZone: timezone });
  } catch {
    return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' });
  }
}

function labelValue(doc: Doc, label: string, value: string, x: number, y: number, width: number): number {
  doc.font('Helvetica').fontSize(8).fillColor(COLOR_MUTED).text(label, x, y, { width, lineBreak: false });
  doc.font('Helvetica').fontSize(9).fillColor(COLOR_TEXT).text(value || '-', x, y + 10, { width });
  return doc.y + 4;
}

export function renderInvoicePdf(invoice: Invoice, seller: SellerInfo, meta: InvoicePdfMeta): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const chunks: Buffer[] = [];
      const isCreditNote = invoice.invoiceType === 'credit_note';
      const title = isCreditNote ? 'CREDIT NOTE' : 'TAX INVOICE';
      const doc = new PDFDocument({
        size: 'A4',
        margin: PAGE_MARGIN,
        info: { Title: `${title} ${invoice.invoiceNumber}`, Author: seller.name, Subject: title },
      });
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const left = PAGE_MARGIN;
      const right = doc.page.width - PAGE_MARGIN;
      const width = right - left;

      let y = renderHeader(doc, invoice, seller, meta, title, left, right, width);
      y = renderParties(doc, invoice, seller, left, right, y);
      y = renderItemsTable(doc, invoice, seller, left, right, y);
      y = renderTotals(doc, invoice, left, right, y);
      renderNotes(doc, invoice, seller, meta, left, width, y);
      renderFooter(doc, seller, left, width);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function renderHeader(doc: Doc, invoice: Invoice, seller: SellerInfo, meta: InvoicePdfMeta, title: string,
  left: number, right: number, width: number): number {
  let y = PAGE_MARGIN;
  if (seller.logoUrl && seller.logoUrl.startsWith('data:image')) {
    try {
      const logoBuffer = Buffer.from(seller.logoUrl.split(',')[1], 'base64');
      doc.image(logoBuffer, left, y, { fit: [120, 40] });
      y += 46;
    } catch (error) {
      logger.warn('Failed to render invoice logo', { error }, SOURCE);
    }
  }
  doc.font('Helvetica-Bold').fontSize(13).fillColor(COLOR_TEXT).text(seller.name, left, y, { width: width * 0.6 });
  if (seller.tradeName && seller.tradeName !== seller.name) {
    doc.font('Helvetica').fontSize(9).fillColor(COLOR_MUTED).text(`Trade name: ${seller.tradeName}`, { width: width * 0.6 });
  }
  doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_TEXT).text(seller.address, { width: width * 0.6 });
  const sellerLines = [
    seller.gstin ? `GSTIN: ${seller.gstin}` : '',
    seller.cin ? `CIN: ${seller.cin}` : '',
    seller.dpiit ? `DPIIT: ${seller.dpiit}` : '',
    [seller.email, seller.phone].filter(Boolean).join(' | '),
  ].filter(Boolean);
  for (const line of sellerLines) doc.text(line, { width: width * 0.6 });
  const leftBottom = doc.y;

  // Right column: document title + numbers
  const colX = right - 200;
  let ry = PAGE_MARGIN;
  doc.font('Helvetica-Bold').fontSize(18).fillColor(COLOR_TEXT).text(title, colX, ry, { width: 200, align: 'right' });
  ry = doc.y + 6;
  const rows: [string, string][] = [
    [invoice.invoiceType === 'credit_note' ? 'Credit Note No.' : 'Invoice No.', invoice.invoiceNumber],
    ['Date', formatDate(invoice.issuedAt, meta.timezone)],
  ];
  if (invoice.financialYear) rows.push(['Financial Year', invoice.financialYear]);
  if (meta.relatedInvoiceNumber) rows.push(['Against Invoice', meta.relatedInvoiceNumber]);
  if (invoice.placeOfSupply) rows.push(['Place of Supply', invoice.placeOfSupply]);
  rows.push(['Reverse Charge', 'No']);
  for (const [label, value] of rows) {
    doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_MUTED).text(label, colX, ry, { width: 90, lineBreak: false });
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLOR_TEXT).text(value, colX + 90, ry, { width: 110, align: 'right', lineBreak: false });
    ry += 13;
  }
  const status = invoice.invoiceType === 'credit_note' ? 'ISSUED' : (invoice.status === 'void' ? 'VOID' : 'PAID');
  doc.font('Helvetica-Bold').fontSize(10).fillColor(status === 'VOID' ? '#b91c1c' : '#15803d')
    .text(status, colX, ry, { width: 200, align: 'right', lineBreak: false });
  ry += 16;

  const dividerY = Math.max(leftBottom, ry) + 10;
  doc.moveTo(left, dividerY).lineTo(right, dividerY).lineWidth(0.8).stroke(COLOR_LINE);
  return dividerY + 12;
}

function renderParties(doc: Doc, invoice: Invoice, seller: SellerInfo, left: number, right: number, startY: number): number {
  const colWidth = (right - left) / 2 - 10;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLOR_TEXT).text('Bill To', left, startY, { lineBreak: false });
  let y = startY + 14;
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR_TEXT).text(invoice.customerName, left, y, { width: colWidth });
  doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_TEXT);
  if (invoice.customerAddress) doc.text(invoice.customerAddress, { width: colWidth });
  if (invoice.buyerStateCode) {
    const name = stateNameForCode(invoice.buyerStateCode);
    doc.text(`State: ${name ? `${name} (${invoice.buyerStateCode})` : invoice.buyerStateCode}`, { width: colWidth });
  }
  doc.text(`GSTIN: ${invoice.buyerGstin || 'Unregistered / B2C'}`, { width: colWidth });
  doc.fillColor(COLOR_MUTED).text(invoice.customerEmail, { width: colWidth });
  const leftBottom = doc.y;

  const rx = left + colWidth + 20;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLOR_TEXT).text('Supply Details', rx, startY, { lineBreak: false });
  y = startY + 14;
  const taxType = invoice.taxableAmount == null ? 'N/A (legacy invoice)'
    : invoice.isInterState ? 'Inter-state (IGST)' : 'Intra-state (CGST + SGST)';
  y = labelValue(doc, 'Tax Type', taxType, rx, y, colWidth);
  y = labelValue(doc, 'HSN / SAC', invoice.hsnSac || seller.hsnSac || '-', rx, y, colWidth);
  y = labelValue(doc, 'Payment', [invoice.gateway ? capitalize(invoice.gateway) : '', invoice.paymentMethod || ''].filter(Boolean).join(' - ') || '-', rx, y, colWidth);

  const bottom = Math.max(leftBottom, y) + 12;
  return bottom;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderItemsTable(doc: Doc, invoice: Invoice, seller: SellerInfo, left: number, right: number, startY: number): number {
  const width = right - left;
  const cols = [
    { key: 'idx', label: '#', w: 0.05, align: 'left' as const },
    { key: 'desc', label: 'Description', w: 0.39, align: 'left' as const },
    { key: 'hsn', label: 'HSN/SAC', w: 0.12, align: 'center' as const },
    { key: 'qty', label: 'Qty', w: 0.07, align: 'center' as const },
    { key: 'taxable', label: 'Taxable Value', w: 0.14, align: 'right' as const },
    { key: 'rate', label: 'GST %', w: 0.08, align: 'center' as const },
    { key: 'total', label: 'Total (incl. GST)', w: 0.15, align: 'right' as const },
  ];
  const isGst = invoice.taxableAmount != null;
  const rate = num(invoice.taxRate);
  const items = (invoice.lineItems as InvoiceLineItem[]) || [];
  const invoiceTotal = num(invoice.total);

  doc.rect(left, startY, width, 20).fill(COLOR_FILL);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(COLOR_TEXT);
  let x = left;
  for (const col of cols) {
    doc.text(col.label, x + 4, startY + 6, { width: col.w * width - 8, align: col.align, lineBreak: false });
    x += col.w * width;
  }

  let y = startY + 26;
  items.forEach((item, i) => {
    const lineTotal = num(item.total);
    const share = invoiceTotal > 0 ? lineTotal / invoiceTotal : 1;
    const taxable = isGst ? num(invoice.taxableAmount) * share : lineTotal;
    const cells: Record<string, string> = {
      idx: String(i + 1),
      desc: item.description,
      hsn: invoice.hsnSac || seller.hsnSac || '-',
      qty: String(item.quantity),
      taxable: formatINR(taxable),
      rate: isGst ? `${rate}%` : '-',
      total: formatINR(lineTotal),
    };
    doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_TEXT);
    x = left;
    let rowHeight = 14;
    for (const col of cols) {
      const cellWidth = col.w * width - 8;
      const text = cells[col.key];
      const h = doc.heightOfString(text, { width: cellWidth });
      rowHeight = Math.max(rowHeight, h + 4);
      doc.text(text, x + 4, y, { width: cellWidth, align: col.align });
      x += col.w * width;
    }
    y += rowHeight + 4;
  });
  doc.moveTo(left, y).lineTo(right, y).lineWidth(0.8).stroke(COLOR_LINE);
  return y + 10;
}

function renderTotals(doc: Doc, invoice: Invoice, left: number, right: number, startY: number): number {
  const isGst = invoice.taxableAmount != null;
  const rate = num(invoice.taxRate);
  const boxX = right - 240;
  let y = startY;
  const line = (label: string, value: string, bold = false) => {
    doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(bold ? 10 : 9).fillColor(bold ? COLOR_TEXT : COLOR_MUTED)
      .text(label, boxX, y, { width: 130, lineBreak: false });
    doc.fillColor(COLOR_TEXT).text(value, boxX + 130, y, { width: 110, align: 'right', lineBreak: false });
    y += bold ? 18 : 14;
  };
  if (isGst) {
    line('Taxable Amount', formatINR(invoice.taxableAmount));
    if (invoice.isInterState) {
      line(`IGST @ ${rate}%`, formatINR(invoice.igst));
    } else {
      line(`CGST @ ${rate / 2}%`, formatINR(invoice.cgst));
      line(`SGST @ ${rate / 2}%`, formatINR(invoice.sgst));
    }
  } else {
    line('Subtotal', formatINR(invoice.subtotal));
    line('Tax', formatINR(invoice.tax));
  }
  doc.moveTo(boxX, y - 2).lineTo(right, y - 2).lineWidth(0.8).stroke(COLOR_LINE);
  y += 4;
  line(invoice.invoiceType === 'credit_note' ? 'Total Credit' : 'Total', formatINR(invoice.total), true);

  doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_MUTED).text('Amount in words:', left, startY, { lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLOR_TEXT)
    .text(amountInWordsINR(num(invoice.total)), left, startY + 12, { width: right - left - 260 });
  return Math.max(doc.y, y) + 12;
}

function renderNotes(doc: Doc, invoice: Invoice, seller: SellerInfo, meta: InvoicePdfMeta, left: number, width: number, startY: number): void {
  const isGst = invoice.taxableAmount != null;
  const notes: string[] = [];
  if (invoice.invoiceType === 'credit_note' && meta.relatedInvoiceNumber && !invoice.description.includes(meta.relatedInvoiceNumber)) {
    notes.push(`Credit note against tax invoice ${meta.relatedInvoiceNumber}: ${invoice.description}`);
  } else {
    notes.push(invoice.description);
  }
  if (isGst) {
    notes.push(`All prices are inclusive of GST @ ${num(invoice.taxRate)}%. Taxable value = total / (1 + GST rate). Supply of online IT services (SAC ${invoice.hsnSac || seller.hsnSac}).`);
  }
  notes.push('This is a computer-generated document and does not require a physical signature.');
  doc.font('Helvetica').fontSize(8);
  const textWidth = width - 16;
  const boxHeight = notes.reduce((h, note) => h + doc.heightOfString(note, { width: textWidth }) + 4, 8);
  doc.rect(left, startY, width, boxHeight).fill(COLOR_FILL);
  doc.fillColor(COLOR_MUTED);
  let y = startY + 6;
  for (const note of notes) {
    doc.text(note, left + 8, y, { width: textWidth });
    y = doc.y + 4;
  }
}

function renderFooter(doc: Doc, seller: SellerInfo, left: number, width: number): void {
  // Stay above the bottom margin, otherwise pdfkit would open a second page
  const footerY = doc.page.height - PAGE_MARGIN - 40;
  doc.moveTo(left, footerY).lineTo(left + width, footerY).lineWidth(0.8).stroke(COLOR_LINE);
  const text = seller.footerText || 'Thank you for your business!';
  doc.font('Helvetica').fontSize(8.5).fillColor(COLOR_MUTED).text(text, left, footerY + 8, { width, align: 'center', lineBreak: false });
  const contact = [seller.email, seller.phone].filter(Boolean).join(' | ');
  doc.fontSize(7).fillColor('#999999')
    .text(`${seller.name}${contact ? ` | ${contact}` : ''} | GSTIN ${seller.gstin}`, left, footerY + 22, { width, align: 'center', lineBreak: false });
}
