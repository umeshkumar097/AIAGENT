/**
 * PhoneNumberSubscriptionSection — 3-step: Country → Pick Number → Pay
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Phone, Plus, Trash2, CheckCircle, AlertCircle, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Matches the shape returned by searchAvailableNumbers in plivo-phone.service.ts
interface AvailableNumber {
  phoneNumber: string;  // API uses "phoneNumber"
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
  stripeSubscriptionId: string | null;
  purchasedAt: string;
  nextBillingDate: string | null;
}

interface Props { hasActiveSubscription: boolean; }

type Step = 1 | 2 | 3 | 4;

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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rentOpen, setRentOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<MyNumber | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [pickedNumber, setPickedNumber] = useState<AvailableNumber | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [confirmedNumber, setConfirmedNumber] = useState<string | null>(null);

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
      // API returns { numbers: [...], pricing: {...} }
      return (data.numbers || []) as AvailableNumber[];
    },
  });

  /* --- Cancel subscription --- */
  const cancelMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/phone-number/subscriptions/${id}`);
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed"); }
    },
    onSuccess: () => {
      toast({ title: "Number released", description: "Subscription cancelled." });
      queryClient.invalidateQueries({ queryKey: ["/api/phone-number/subscriptions"] });
      setCancelTarget(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const reset = () => { setStep(1); setActiveSearch(null); setPickedNumber(null); setIsPaying(false); setConfirmedNumber(null); };

  const goSearch = () => { setActiveSearch(selectedCountry); setStep(2); };

  const pickNumber = (n: AvailableNumber) => { setPickedNumber(n); setStep(3); };

  const handlePay = async () => {
    if (!pickedNumber) return;
    setIsPaying(true);
    try {
      const res = await apiRequest("POST", "/api/phone-number/subscribe", {
        country: selectedCountry,
        phoneNumber: pickedNumber.phoneNumber,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");

      if (data.clientSecret) {
        // Need Stripe.js for payment
        const StripeJs = (window as any).Stripe;
        const pubKey = (import.meta as any).env?.VITE_STRIPE_PUBLIC_KEY;
        if (!StripeJs || !pubKey) {
          toast({ title: "Stripe.js not loaded", description: "Please reload the page and try again.", variant: "destructive" });
          return;
        }
        const stripe = StripeJs(pubKey);
        const { error } = await stripe.confirmPayment({
          clientSecret: data.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/app/billing?tab=numbers&pending_sub=${data.subscriptionId}&phone=${encodeURIComponent(pickedNumber.phoneNumber)}&country=${selectedCountry}`,
          },
        });
        if (error) throw new Error(error.message);
        return;
      }

      // Subscription already active (e.g. trial/admin) — confirm directly
      if (data.status === "active" || data.status === "trialing") {
        const cr = await apiRequest("POST", "/api/phone-number/subscribe/confirm", {
          stripeSubscriptionId: data.subscriptionId,
          country: selectedCountry,
          phoneNumber: pickedNumber.phoneNumber,
        });
        const cd = await cr.json();
        if (!cr.ok) throw new Error(cd.error);
        setConfirmedNumber(cd.phoneNumber);
        setStep(4);
        queryClient.invalidateQueries({ queryKey: ["/api/phone-number/subscriptions"] });
      }
    } catch (e: any) {
      toast({ title: "Payment Error", description: e.message, variant: "destructive" });
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Phone Numbers</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Rent a dedicated number — <strong>₹400/month</strong> via Stripe</p>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25" onClick={() => { reset(); setRentOpen(true); }} disabled={!hasActiveSubscription} data-testid="button-rent-number">
            <Plus className="h-5 w-5 mr-2" />Rent a Number
          </Button>
        </div>
        {!hasActiveSubscription && (
          <Alert className="mt-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/80 dark:bg-amber-950/30">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-700 dark:text-amber-300">You need an active plan to rent a phone number.</AlertDescription>
          </Alert>
        )}
      </div>

      {/* My numbers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Your Phone Numbers</h3>
        {myLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>
        ) : myNumbers && myNumbers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {myNumbers.map(num => (
              <div key={num.id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-mono text-lg font-semibold text-slate-800 dark:text-slate-100">{num.phoneNumber}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{num.country}</span>
                      {num.nextBillingDate && (<><span>•</span><span>Next: {new Date(num.nextBillingDate).toLocaleDateString()}</span></>)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"><CheckCircle className="h-3 w-3 mr-1" />{num.status}</Badge>
                  <div className="text-sm font-bold">₹400/mo</div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setCancelTarget(num)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4"><Phone className="h-8 w-8 text-indigo-400" /></div>
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">No phone numbers yet</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Rent a number so customers can call your AI agent directly.</p>
          </div>
        )}
      </div>

      {/* ═══ RENT DIALOG ═══ */}
      <Dialog open={rentOpen} onOpenChange={(o) => { if (!o) reset(); setRentOpen(o); }}>
        <DialogContent className="max-w-lg" data-testid="dialog-rent-number">

          {/* STEP 1 – Country */}
          {step === 1 && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-indigo-500" />Rent a Phone Number</DialogTitle>
              <DialogDescription>Choose a country to see available numbers.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger data-testid="select-phone-country"><SelectValue /></SelectTrigger>
                  <SelectContent>{COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800/50 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Monthly</span><span className="font-bold text-indigo-700 dark:text-indigo-300">₹400</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Billing</span><span>Stripe auto-renewal</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Type</span><span>Local DID</span></div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRentOpen(false)}>Cancel</Button>
              <Button onClick={goSearch} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" data-testid="button-search-numbers">
                <Search className="h-4 w-4 mr-2" />See Available Numbers <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </DialogFooter>
          </>)}

          {/* STEP 2 – Pick a number */}
          {step === 2 && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-1 h-7 w-7" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /></Button>
                {COUNTRIES.find(c => c.code === selectedCountry)?.label} — Available Numbers
              </DialogTitle>
              <DialogDescription>Click a number to select it.</DialogDescription>
            </DialogHeader>
            <div className="py-2 max-h-64 overflow-y-auto space-y-2">
              {searchLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  <p className="text-sm text-slate-500">Searching Plivo numbers...</p>
                </div>
              ) : searchError ? (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">{(searchError as Error).message}</AlertDescription>
                </Alert>
              ) : searchResult && searchResult.length > 0 ? (
                searchResult.map(num => (
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
                  <p className="font-medium">No numbers available</p>
                  <p className="text-xs mt-1">Try a different country.</p>
                </div>
              )}
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setStep(1)}>Back</Button></DialogFooter>
          </>)}

          {/* STEP 3 – Confirm & Pay */}
          {step === 3 && pickedNumber && (<>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-1 h-7 w-7" onClick={() => setStep(2)} disabled={isPaying}><ArrowLeft className="h-4 w-4" /></Button>
                Confirm & Pay
              </DialogTitle>
              <DialogDescription>Review your selected number and confirm payment.</DialogDescription>
            </DialogHeader>
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-indigo-700 dark:text-indigo-300">+{pickedNumber.phoneNumber}</div>
                  <div className="text-xs text-slate-500 capitalize">{pickedNumber.numberType} • {COUNTRIES.find(c => c.code === selectedCountry)?.label}</div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Billing Summary</div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Number rental</span><span className="font-semibold">₹400</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Cycle</span><span>Monthly</span></div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold">
                    <span>Total today</span><span className="text-indigo-600 dark:text-indigo-400">₹400</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">Processed via Stripe. Cancel anytime from this page.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(2)} disabled={isPaying}>Back</Button>
              <Button onClick={handlePay} disabled={isPaying} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 min-w-[160px]" data-testid="button-confirm-pay">
                {isPaying ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : <>Pay ₹400 &amp; Activate</>}
              </Button>
            </DialogFooter>
          </>)}

          {/* STEP 4 – Success */}
          {step === 4 && (<>
            <DialogHeader>
              <DialogTitle className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><CheckCircle className="h-6 w-6" />Number Activated!</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
                <Phone className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-100">+{confirmedNumber || pickedNumber?.phoneNumber}</p>
                <p className="text-slate-500 text-sm mt-1">is now active in your account</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Go to <strong>Phone Numbers</strong> to connect it to an AI agent.</p>
            </div>
            <DialogFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => { setRentOpen(false); reset(); }}>Done</Button>
            </DialogFooter>
          </>)}

        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={(o) => !o && setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release {cancelTarget?.phoneNumber}?</DialogTitle>
            <DialogDescription>Cancels the ₹400/month subscription and permanently releases the number.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelTarget(null)} disabled={cancelMut.isPending}>Keep Number</Button>
            <Button variant="destructive" onClick={() => cancelTarget && cancelMut.mutate(cancelTarget.id)} disabled={cancelMut.isPending} data-testid="button-confirm-release">
              {cancelMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Release Number"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
