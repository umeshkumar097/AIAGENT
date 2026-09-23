/**
 * Invoice helpers — the /api/invoices mount requires a Bearer header,
 * so PDFs are fetched as blobs instead of plain <a href> links.
 */
import { AuthStorage } from "@/lib/auth-storage";
import { toast } from "@/hooks/use-toast";

export interface InvoiceListItem {
  id: string;
  invoiceNumber: string;
  invoiceType: "tax_invoice" | "credit_note" | string;
  relatedInvoiceId: string | null;
  transactionId: string;
  description: string;
  subtotal: string;
  taxableAmount: string | null;
  cgst: string | null;
  sgst: string | null;
  igst: string | null;
  tax: string | null;
  total: string;
  taxRate: string | null;
  isInterState: boolean | null;
  currency: string;
  status: string;
  gateway: string;
  paymentMethod: string | null;
  financialYear: string | null;
  buyerGstin: string | null;
  placeOfSupply: string | null;
  issuedAt: string;
  paidAt: string | null;
  pdfAvailable: boolean;
  createdAt: string;
  userName?: string;
  userEmail?: string;
}

export interface InvoiceListResponse {
  invoices: InvoiceListItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export function invoicePdfPath(invoiceId: string, admin = false): string {
  return admin ? `/api/admin/invoices/${encodeURIComponent(invoiceId)}/pdf` : `/api/invoices/${encodeURIComponent(invoiceId)}/pdf`;
}

async function fetchPdfBlob(url: string): Promise<{ blob: Blob; filename: string | null }> {
  const headers: Record<string, string> = {};
  const authHeader = AuthStorage.getAuthHeader();
  if (authHeader) headers.Authorization = authHeader;
  const response = await fetch(url, { headers, credentials: "include" });
  if (!response.ok) {
    let message = `Download failed (${response.status})`;
    try {
      const data = await response.json();
      message = data.error || data.message || message;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = /filename="?([^";]+)"?/i.exec(disposition);
  return { blob: await response.blob(), filename: match ? match[1] : null };
}

/** Downloads an invoice PDF; shows a toast on failure. Returns true on success. */
export async function downloadInvoicePdf(invoiceId: string, options?: { invoiceNumber?: string | null; admin?: boolean }): Promise<boolean> {
  try {
    const { blob, filename } = await fetchPdfBlob(invoicePdfPath(invoiceId, options?.admin));
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `Invoice-${(options?.invoiceNumber || invoiceId).replace(/\//g, "-")}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    toast({
      title: "Invoice download failed",
      description: error instanceof Error ? error.message : "Please try again.",
      variant: "destructive",
    });
    return false;
  }
}

export function gatewayLabel(gateway: string | null | undefined): string {
  if (!gateway) return "-";
  if (gateway.toLowerCase() === "cashfree") return "Cashfree";
  const pretty = gateway.charAt(0).toUpperCase() + gateway.slice(1);
  return `Legacy: ${pretty}`;
}
