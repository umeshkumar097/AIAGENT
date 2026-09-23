/**
 * CreditLedger — the user's minute (credit) ledger with CSV export and paging.
 */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Download, Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthStorage } from "@/lib/auth-storage";
import { useToast } from "@/hooks/use-toast";

export interface CreditTransaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

export function CreditLedger() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const { data: transactions } = useQuery<CreditTransaction[]>({ queryKey: ["/api/credit-transactions"] });
  const totalPages = transactions ? Math.ceil(transactions.length / PAGE_SIZE) : 0;

  useEffect(() => {
    if (totalPages > 0 && page >= totalPages) setPage(totalPages - 1);
  }, [page, totalPages]);

  const handleExport = async () => {
    try {
      const headers: Record<string, string> = {};
      const authHeader = AuthStorage.getAuthHeader();
      if (authHeader) headers.Authorization = authHeader;
      const response = await fetch("/api/credit-transactions/export", { headers, credentials: "include" });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: t("billing.exportFailed", "Export failed") }));
        throw new Error(error.message || t("billing.exportFailed", "Export failed"));
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `credit-transactions-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: t("billing.exportSuccess", "Export successful"), description: t("billing.exportSuccessDesc", "Your transactions have been exported.") });
    } catch (error) {
      toast({
        title: t("billing.exportFailed", "Export failed"),
        description: error instanceof Error ? error.message : t("billing.exportFailedDesc", "Failed to export transactions."),
        variant: "destructive",
      });
    }
  };

  const rows = [...(transactions || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100/50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8">
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shadow-lg">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t("billing.cashfree.minuteLedger", "Minute ledger")}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t("billing.cashfree.minuteLedgerDesc", "Every minute added to or used from your balance")}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleExport} data-testid="button-export-transactions">
            <Download className="h-4 w-4 mr-2" />
            {t("billing.exportCSV", "Export CSV")}
          </Button>
        </div>

        {rows.length > 0 ? (
          <>
            <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/50 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80 dark:bg-slate-900/50">
                    <TableHead className="font-semibold uppercase text-xs tracking-wider">{t("billing.tableHeaders.type", "Type")}</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider">{t("billing.tableHeaders.description", "Description")}</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider text-right">{t("billing.tableHeaders.amount", "Minutes")}</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider">{t("billing.tableHeaders.date", "Date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="py-3">
                        <Badge
                          variant={tx.type === "credit" ? "default" : "destructive"}
                          className={tx.type === "credit"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                            : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/50 dark:text-red-400 border border-red-200 dark:border-red-800"}
                        >
                          {tx.type === "credit" ? <><Plus className="h-3 w-3 mr-1" />{t("billing.credit", "Added")}</> : t("billing.debit", "Used")}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 text-sm text-slate-800 dark:text-slate-200">{tx.description}</TableCell>
                      <TableCell className="py-3 text-right">
                        <span className={`font-mono text-sm font-bold ${tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {tx.type === "credit" ? "+" : "-"}{Math.abs(tx.amount).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t("billing.pagination", { start: page * PAGE_SIZE + 1, end: Math.min((page + 1) * PAGE_SIZE, transactions?.length || 0), total: transactions?.length || 0 })}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} data-testid="button-billing-previous-page">
                    <ChevronLeft className="h-4 w-4" />
                    {t("billing.previous", "Previous")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1} data-testid="button-billing-next-page">
                    {t("billing.next", "Next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-10 text-center">
            <Receipt className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">{t("billing.noTransactions", "No transactions yet")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
