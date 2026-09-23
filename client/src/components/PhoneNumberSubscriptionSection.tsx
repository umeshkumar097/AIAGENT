/**
 * PhoneNumberSubscriptionSection — 3-step: Country → Pick Number → Pay (Cashfree, one-time INR)
 * After payment the number is bought from Plivo by the server; monthly renewals are billed in minutes.
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Phone, Plus, Trash2, CheckCircle, AlertCircle, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatInr, startCashfreeCheckout, PAYMENT_GATEWAY_QUERY_KEY, type CashfreePublicConfig } from "@/lib/cashfree";

// Matches the shape returned by searchAvailableNumbers in plivo-phone.service.ts
interface AvailableNumber {
  phoneNumber: string;
  country: string;
  region: string | null;
  city: string | null;
  numberType: string;
  capabilities: { voice: boolean; sms: boolean };
  monthlyRentalRate: number;
}

interface MyNumber {
  id: string;
  phoneNumber: string;
  country: string;
  status: string;
  monthlyCredits?: number | null;
  purchasedAt: string;
  nextBillingDate: string | null;
}

interface Props { hasActiveSubscription: boolean; }

type Step = 1 | 2 | 3;

const COUNTRIES = [
  { code: "IN", label: "🇮🇳 India (+91)" },
  { code: "US", label: "🇺🇸 United States (+1)" },
  { code: "GB", label: "🇬🇧 United Kingdom (+44)" },
  { code: "AU", label: "🇦🇺 Australia (+61)" },
  { code: "SG", label: "🇸🇬 Singapore (+65)" },
  { code: "CA", label: "🇨🇦 Canada (+1)" },
  { code: "DE", label: "🇩🇪 Germany (+49)" },
  { code: "AE", label: "🇦🇪 UAE (+971)" },
];

export function PhoneNumberSubscriptionSection({ hasActiveSubscription }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rentOpen, setRentOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<MyNumber | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [pickedNumber, setPickedNumber] = useState<AvailableNumber | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const { data: gatewayConfig } = useQuery<CashfreePublicConfig>({ queryKey: [...PAYMENT_GATEWAY_QUERY_KEY] });
  const price = gatewayConfig?.phoneNumberPriceInr ?? 400;
  const priceLabel = formatInr(price);

  /* --- My rented numbers --- */
  const { data: myNumbers, isLoading: myLoading } = useQuery<MyNumber[]>({
    queryKey: ["/api/phone-number/subscriptions"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/phone-number/subscriptions");
      return res.json();
    },
  });

  /* --- Available Plivo numbers (search) --- */
  const { data: searchResult, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ["/api/plivo/phone-numbers/search", activeSearch],
    enabled: !!activeSearch && step === 2,
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/plivo/phone-numbers/search?country=${activeSearch}&limit=10`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      return (data.numbers || []) as AvailableNumber[];
    },
  });

  /* --- Release number --- */
  const cancelMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/phone-number/subscriptions/${id}`);
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed"); }
    },
    onSuccess: () => {
      toast({ title: t("billing.cashfree.numberReleased", "Number released"), description: t("billing.cashfree.numberReleasedDesc", "The number has been released from your account.") });
      queryClient.invalidateQueries({ queryKey: ["/api/phone-number/subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/plivo/phone-numbers"] });
      setCancelTarget(null);
    },
    onError: (e: Error) => toast({ title: t("common.error", "Error"), description: e.message, variant: "destructive" }),
  });

  const reset = () => { setStep(1); setActiveSearch(null); setPickedNumber(null); setIsPaying(false); };
  const goSearch = () => { setActiveSearch(selectedCountry); setStep(2); };
  const pickNumber = (n: AvailableNumber) => { setPickedNumber(n); setStep(3); };

  const handlePay = async () => {
    if (!pickedNumber) return;
    setIsPaying(true);
    try {
      await startCashfreeCheckout({ type: "phone_number", phoneNumber: pickedNumber.phoneNumber, country: selectedCountry });
    } catch {
      // toast shown by helper
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50/50 dark:from-indigo-950/40 dark:via-slate-800/80 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-700/30 p-6 md:p-8">
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t("billing.cashfree.phoneNumbers", "Phone numbers")}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {t("billing.cashfree.rentNumberSubtitle", "Rent a dedicated number — {{price}} one-time via Cashfree, then billed monthly in minutes", { price: priceLabel })}
              </p>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25" onClick={() => { reset(); setRentOpen(true); }} disabled={!hasActiveSubscription} data-testid="button-rent-number">
            <Plus className="h-5 w-5 mr-2" />{t("billing.cashfree.rentNumber", "Rent a number")}
          </Button>
        </div>
        {!hasActiveSubscription && (
          <Alert className="mt-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/80 dark:bg-amber-950/30">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-700 dark:text-amber-300">{t("billing.cashfree.planRequiredForNumbers", "You need an active plan to rent a phone number.")}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* My numbers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{t("billing.cashfree.yourNumbers", "Your phone numbers")}</h3>
        {myLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>
        ) : myNumbers && myNumbers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {myNumbers.map((num) => (
              <div key={num.id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-mono text-lg font-semibold text-slate-800 dark:text-slate-100">{num.phoneNumber}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{num.country}</span>
                      {num.nextBillingDate && (<><span>•</span><span>{t("billing.cashfree.nextBilling", "Next")}: {new Date(num.nextBillingDate).toLocaleDateString()}</span></>)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"><CheckCircle className="h-3 w-3 mr-1" />{num.status}</Badge>
                  {num.monthlyCredits ? <div className="text-sm font-bold">{num.monthlyCredits} {t("billing.cashfree.minPerMonth", "min/mo")}</div> : null}
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setCancelTarget(num)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4"><Phone className="h-8 w-8 text-indigo-400" /></div>
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">{t("billing.cashfree.noNumbers", "No phone numbers yet")}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t("billing.cashfree.noNumbersDesc", "Rent a number so customers can call your AI agent directly.")}</p>
          </div>
        )}
      </div>

      {/* Rent dialog */}
      <Dialog open={rentOpen} onOpenChange={(o) => { if (!o) reset(); setRentOpen(o); }}>
        <DialogContent className="max-w-lg" data-testid="dialog-rent-number">
          {step === 1 && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-indigo-500" />{t("billing.cashfree.rentNumber", "Rent a phone number")}</DialogTitle>
              <DialogDescription>{t("billing.cashfree.chooseCountry", "Choose a country to see available numbers.")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium mb-2 block">{t("billing.cashfree.country", "Country")}</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger data-testid="select-phone-country"><SelectValue /></SelectTrigger>
                  <SelectContent>{COUNTRIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800/50 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">{t("billing.cashfree.setupFee", "Activation (one-time)")}</span><span className="font-bold text-indigo-700 dark:text-indigo-300">{priceLabel}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t("billing.cashfree.billingLabel", "Billing")}</span><span>{t("billing.cashfree.billingValue", "Cashfree · GST invoice")}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t("billing.cashfree.renewalLabel", "Renewal")}</span><span>{t("billing.cashfree.renewalValue", "Monthly in minutes")}</span></div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRentOpen(false)}>{t("common.cancel", "Cancel")}</Button>
              <Button onClick={goSearch} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" data-testid="button-search-numbers">
                <Search className="h-4 w-4 mr-2" />{t("billing.cashfree.seeAvailable", "See available numbers")} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </DialogFooter>
          </>)}

          {step === 2 && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-1 h-7 w-7" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /></Button>
                {COUNTRIES.find((c) => c.code === selectedCountry)?.label} — {t("billing.cashfree.availableNumbers", "Available numbers")}
              </DialogTitle>
              <DialogDescription>{t("billing.cashfree.clickToSelect", "Click a number to select it.")}</DialogDescription>
            </DialogHeader>
            <div className="py-2 max-h-64 overflow-y-auto space-y-2">
              {searchLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  <p className="text-sm text-slate-500">{t("billing.cashfree.searching", "Searching Plivo numbers...")}</p>
                </div>
              ) : searchError ? (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">{(searchError as Error).message}</AlertDescription>
                </Alert>
              ) : searchResult && searchResult.length > 0 ? (
                searchResult.map((num) => (
                  <button key={num.phoneNumber} onClick={() => pickNumber(num)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all group text-left"
                    data-testid={`btn-pick-${num.phoneNumber}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-mono font-semibold text-slate-800 dark:text-slate-100">+{num.phoneNumber}</div>
                        <div className="text-xs text-slate-500 capitalize">
                          {num.numberType} {num.city ? `• ${num.city}` : ""} • Voice: {num.capabilities.voice ? "✓" : "✗"} SMS: {num.capabilities.sms ? "✓" : "✗"}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-medium">{t("billing.cashfree.noAvailable", "No numbers available")}</p>
                  <p className="text-xs mt-1">{t("billing.cashfree.tryAnotherCountry", "Try a different country.")}</p>
                </div>
              )}
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setStep(1)}>{t("common.back", "Back")}</Button></DialogFooter>
          </>)}

          {step === 3 && pickedNumber && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-1 h-7 w-7" onClick={() => setStep(2)} disabled={isPaying}><ArrowLeft className="h-4 w-4" /></Button>
                {t("billing.cashfree.confirmAndPay", "Confirm & pay")}
              </DialogTitle>
              <DialogDescription>{t("billing.cashfree.reviewNumber", "Review your selected number and continue to Cashfree.")}</DialogDescription>
            </DialogHeader>
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-indigo-700 dark:text-indigo-300">+{pickedNumber.phoneNumber}</div>
                  <div className="text-xs text-slate-500 capitalize">{pickedNumber.numberType} • {COUNTRIES.find((c) => c.code === selectedCountry)?.label}</div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">{t("billing.cashfree.billingSummary", "Billing summary")}</div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{t("billing.cashfree.numberActivation", "Number activation")}</span><span className="font-semibold">{priceLabel}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{t("billing.cashfree.renewalLabel", "Renewal")}</span><span>{t("billing.cashfree.renewalValue", "Monthly in minutes")}</span></div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold">
                    <span>{t("billing.cashfree.totalToday", "Total today")}</span><span className="text-indigo-600 dark:text-indigo-400">{priceLabel}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">{t("billing.cashfree.processedByCashfree", "Processed securely by Cashfree. A GST invoice is issued after payment.")}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(2)} disabled={isPaying}>{t("common.back", "Back")}</Button>
              <Button onClick={handlePay} disabled={isPaying} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 min-w-[160px]" data-testid="button-confirm-pay">
                {isPaying ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />{t("billing.cashfree.redirecting", "Redirecting to Cashfree…")}</> : <>{t("billing.cashfree.payAndActivate", "Pay {{amount}} & activate", { amount: priceLabel })}</>}
              </Button>
            </DialogFooter>
          </>)}
        </DialogContent>
      </Dialog>

      {/* Release dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={(o) => !o && setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("billing.cashfree.releaseTitle", "Release {{number}}?", { number: cancelTarget?.phoneNumber })}</DialogTitle>
            <DialogDescription>{t("billing.cashfree.releaseDesc", "Stops the monthly minute charge and permanently releases the number. Activation fees are not refundable.")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelTarget(null)} disabled={cancelMut.isPending}>{t("billing.cashfree.keepNumber", "Keep number")}</Button>
            <Button variant="destructive" onClick={() => cancelTarget && cancelMut.mutate(cancelTarget.id)} disabled={cancelMut.isPending} data-testid="button-confirm-release">
              {cancelMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("billing.cashfree.releaseNumber", "Release number")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
