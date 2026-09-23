/**
 * InvoicesList — the user's GST tax invoices and credit notes with PDF download.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, FileText, Loader2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { downloadInvoicePdf, type InvoiceListResponse } from "@/lib/invoices";
import { formatInr } from "@/lib/cashfree";

const LIMIT = 10;

export function InvoicesList() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<InvoiceListResponse>({
    queryKey: ["/api/invoices", `?page=${page}&limit=${LIMIT}`],
  });

  const invoices = data?.invoices || [];
  const totalPages = data?.pagination?.totalPages || 0;

  const handleDownload = async (id: string, invoiceNumber: string) => {
    setDownloadingId(id);
    try {
      await downloadInvoicePdf(id, { invoiceNumber });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card data-testid="card-invoices">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          {t("billing.cashfree.invoices", "Invoices & credit notes")}
        </CardTitle>
        <CardDescription>{t("billing.cashfree.invoicesDesc", "GST tax invoices for every successful payment. Credit notes are issued for refunds.")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{t("billing.cashfree.noInvoices", "No invoices yet.")}</p>
        ) : (
          <>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("billing.cashfree.invoiceNumber", "Number")}</TableHead>
                    <TableHead>{t("billing.cashfree.invoiceType", "Type")}</TableHead>
                    <TableHead>{t("billing.cashfree.invoiceDate", "Date")}</TableHead>
                    <TableHead>{t("transactionHistory.columnDescription", "Description")}</TableHead>
                    <TableHead className="text-right">{t("billing.cashfree.invoiceTotal", "Total")}</TableHead>
                    <TableHead className="text-right">{t("billing.cashfree.invoicePdf", "PDF")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} data-testid={`row-invoice-${inv.id}`}>
                      <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
                      <TableCell>
                        {inv.invoiceType === "credit_note" ? (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{t("billing.cashfree.creditNote", "Credit note")}</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{t("billing.cashfree.taxInvoice", "Tax invoice")}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{format(new Date(inv.issuedAt || inv.createdAt), "MMM d, yyyy")}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm">{inv.description}</TableCell>
                      <TableCell className="text-right font-mono font-medium">{formatInr(inv.total)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(inv.id, inv.invoiceNumber)} disabled={downloadingId === inv.id} data-testid={`button-download-invoice-${inv.id}`}>
                          {downloadingId === inv.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
