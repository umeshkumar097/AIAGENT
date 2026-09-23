/**
 * CreditPurchaseDialog — pick a credit (minute) package and pay via Cashfree.
 * Single gateway, INR only. The server derives the amount from the package row.
 */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Check, Coins, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatInr, startCashfreeCheckout } from "@/lib/cashfree";

export interface CreditPackageOption {
  id: string;
  name: string;
  description: string | null;
  credits: number;
  price: string | number;
  isActive?: boolean;
}

interface CreditPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Package to preselect when the dialog opens */
  packageId?: string | null;
  /** Called after the checkout redirect has been requested */
  onCheckoutStarted?: () => void;
}

export function CreditPurchaseDialog({ open, onOpenChange, packageId, onCheckoutStarted }: CreditPurchaseDialogProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(packageId ?? null);
  const [isStarting, setIsStarting] = useState(false);

  const { data: packages, isLoading } = useQuery<CreditPackageOption[]>({
    queryKey: ["/api/credit-packages"],
    enabled: open,
  });

  useEffect(() => {
    if (open) setSelectedId(packageId ?? null);
  }, [open, packageId]);

  const activePackages = (packages || []).filter((p) => p.isActive !== false);
  const selected = activePackages.find((p) => p.id === selectedId) || null;

  const handlePay = async () => {
    if (!selected) return;
    setIsStarting(true);
    try {
      await startCashfreeCheckout({ type: "credits", packageId: selected.id });
      onCheckoutStarted?.();
    } catch {
      // toast already shown by startCashfreeCheckout
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isStarting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-credit-purchase">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-emerald-600" />
            {t("billing.cashfree.buyMinutesTitle", "Add minutes")}
          </DialogTitle>
          <DialogDescription>
            {t("billing.cashfree.buyMinutesDescription", "Choose a package. You will be taken to Cashfree to complete the payment in INR.")}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : activePackages.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("billing.cashfree.noPackages", "No packages are available right now.")}
          </p>
        ) : (
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {activePackages.map((pkg, index) => {
              const isSelected = pkg.id === selectedId;
              const price = typeof pkg.price === "string" ? parseFloat(pkg.price) : pkg.price;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedId(pkg.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-50/60 dark:bg-indigo-950/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  data-testid={`option-package-${pkg.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{pkg.name}</span>
                        {index === 1 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:text-indigo-300">
                            <Sparkles className="h-3 w-3" />
                            {t("billing.popular", "Popular")}
                          </span>
                        )}
                      </div>
                      {pkg.description && <p className="text-xs text-muted-foreground mt-0.5">{pkg.description}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        {pkg.credits.toLocaleString()} {t("billing.cashfree.minutes", "minutes")} · {formatInr(price / Math.max(pkg.credits, 1))} {t("billing.perMinute", "per minute")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{formatInr(price)}</span>
                      <span className={`h-6 w-6 rounded-full border flex items-center justify-center ${isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 dark:border-slate-600"}`}>
                        {isSelected && <Check className="h-4 w-4" />}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          {t("billing.cashfree.securedBy", "Payments are processed securely by Cashfree. A GST tax invoice is emailed after payment.")}
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isStarting}>
            {t("common.cancel", "Cancel")}
          </Button>
          <Button onClick={handlePay} disabled={!selected || isStarting} data-testid="button-pay-cashfree">
            {isStarting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("billing.cashfree.redirecting", "Redirecting to Cashfree…")}
              </>
            ) : (
              <>
                {t("billing.cashfree.payAmount", "Pay {{amount}}", { amount: selected ? formatInr(selected.price) : "" })}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreditPurchaseDialog;
