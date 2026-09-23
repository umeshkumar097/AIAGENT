/**
 * AdminInvoicesTab — all GST invoices / credit notes (GET /api/admin/invoices) with filters,
 * PDF download and the bulk ZIP export of documents.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Archive, ChevronLeft, ChevronRight, Download, FileText, Loader2, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthStorage } from "@/lib/auth-storage";
import { useToast } from "@/hooks/use-toast";
import { downloadInvoicePdf, gatewayLabel, type InvoiceListResponse } from "@/lib/invoices";
import { formatInr } from "@/lib/cashfree";

const LIMIT = 20;

export function AdminInvoicesTab() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState<"all" | "tax_invoice" | "credit_note">("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [exportType, setExportType] = useState<"all" | "invoices" | "refunds">("all");

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(LIMIT));
  if (search) params.set("search", search);
  if (type !== "all") params.set("type", type);
  if (from) params.set("from", from);
  if (to) params.set("to", to);

  const { data, isLoading, isError } = useQuery<InvoiceListResponse>({
    queryKey: ["/api/admin/invoices", `?${params.toString()}`],
  });

  const invoices = data?.invoices || [];
  const totalPages = data?.pagination?.totalPages || 0;

  const handleDownload = async (id: string, invoiceNumber: string) => {
    setDownloadingId(id);
    try {
      await downloadInvoicePdf(id, { invoiceNumber, admin: true });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleBulkExport = async () => {
    setBulkDownloading(true);
    try {
      const authHeader = AuthStorage.getAuthHeader();
      if (!authHeader) throw new Error("Authentication required");
      const exportParams = new URLSearchParams();
      if (from) exportParams.append("startDate", from);
      if (to) exportParams.append("endDate", to);
      exportParams.append("type", exportType);
      const response = await fetch(`/api/admin/transactions/export/zip?${exportParams}`, { headers: { Authorization: authHeader } });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || "Failed to download documents");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const disposition = response.headers.get("Content-Disposition");
      a.download = disposition?.split("filename=")[1]?.replace(/"/g, "") || "documents-export.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: "Export ready", description: "The ZIP archive has been downloaded." });
    } catch (error) {
      toast({ title: "Export failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    } finally {
      setBulkDownloading(false);
    }
  };

  const applySearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices & credit notes
          </CardTitle>
          <CardDescription>GST documents generated for Cashfree payments and refunds. Legacy invoices remain downloadable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs">Search</Label>
              <div className="flex gap-2">
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applySearch()}
                  placeholder="Invoice no., email, name"
                  className="w-56"
                  data-testid="input-invoice-search"
                />
                <Button variant="outline" size="icon" onClick={applySearch} data-testid="button-invoice-search"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <Select value={type} onValueChange={(v) => { setType(v as typeof type); setPage(1); }}>
                <SelectTrigger className="w-40" data-testid="select-invoice-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All documents</SelectItem>
                  <SelectItem value="tax_invoice">Tax invoices</SelectItem>
                  <SelectItem value="credit_note">Credit notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">From</Label>
              <Input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }} className="w-40" data-testid="input-invoice-from" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To</Label>
              <Input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }} className="w-40" data-testid="input-invoice-to" />
            </div>
            <div className="ml-auto flex items-end gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Bulk export</Label>
                <Select value={exportType} onValueChange={(v) => setExportType(v as typeof exportType)}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="invoices">Invoices</SelectItem>
                    <SelectItem value="refunds">Refund notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={handleBulkExport} disabled={bulkDownloading} data-testid="button-bulk-export">
                {bulkDownloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Archive className="h-4 w-4 mr-2" />}
                ZIP
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : isError ? (
            <p className="text-sm text-destructive text-center py-8">Failed to load invoices.</p>
          ) : invoices.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invoices found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Gateway</TableHead>
                      <TableHead className="text-right">Taxable</TableHead>
                      <TableHead className="text-right">GST</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">PDF</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => {
                      const gst = (parseFloat(inv.cgst || "0") || 0) + (parseFloat(inv.sgst || "0") || 0) + (parseFloat(inv.igst || "0") || 0);
                      return (
                        <TableRow key={inv.id} data-testid={`row-admin-invoice-${inv.id}`}>
                          <TableCell className="font-mono text-xs whitespace-nowrap">{inv.invoiceNumber}</TableCell>
                          <TableCell>
                            {inv.invoiceType === "credit_note" ? (
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/30">Credit note</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">Tax invoice</Badge>
                            )}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm">{format(new Date(inv.issuedAt || inv.createdAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{inv.userName || "-"}</div>
                            <div className="text-xs text-muted-foreground">{inv.userEmail}</div>
                            {inv.buyerGstin && <div className="text-[10px] font-mono text-muted-foreground">GSTIN {inv.buyerGstin}</div>}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm">{inv.description}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{gatewayLabel(inv.gateway)}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{formatInr(inv.taxableAmount ?? inv.subtotal)}</TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatInr(gst || inv.tax || 0)}
                            {inv.isInterState != null && <div className="text-[10px] text-muted-foreground">{inv.isInterState ? "IGST" : "CGST+SGST"}</div>}
                          </TableCell>
                          <TableCell className="text-right font-mono font-medium">{formatInr(inv.total)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" title="Download PDF" disabled={downloadingId === inv.id} onClick={() => handleDownload(inv.id, inv.invoiceNumber)} data-testid={`button-download-admin-invoice-${inv.id}`}>
                              {downloadingId === inv.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{data?.pagination.total} documents</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminInvoicesTab;
