/**
 * BillingDetailsSection — buyer details printed on GST tax invoices.
 * Saves via PATCH /api/auth/me (server validates GSTIN and derives the state code from it).
 */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Building2, Loader2, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { INDIAN_STATES, GSTIN_REGEX, stateNameForCode } from "@/lib/indian-states";

interface BillingProfile {
  billingName?: string | null;
  company?: string | null;
  billingAddressLine1?: string | null;
  billingAddressLine2?: string | null;
  billingCity?: string | null;
  billingState?: string | null;
  billingStateCode?: string | null;
  billingPostalCode?: string | null;
  billingCountry?: string | null;
  billingPhone?: string | null;
  gstin?: string | null;
  name?: string;
}

interface FormState {
  billingName: string;
  company: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingStateCode: string;
  billingPostalCode: string;
  billingPhone: string;
  gstin: string;
}

const emptyForm: FormState = {
  billingName: "",
  company: "",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingCity: "",
  billingStateCode: "",
  billingPostalCode: "",
  billingPhone: "",
  gstin: "",
};

export function BillingDetailsSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [gstinError, setGstinError] = useState<string | null>(null);

  const { data: user } = useQuery<BillingProfile>({ queryKey: ["/api/auth/me"] });

  useEffect(() => {
    if (!user) return;
    const codeFromName = user.billingState ? INDIAN_STATES.find((s) => s.name.toLowerCase() === user.billingState?.toLowerCase())?.code : undefined;
    setForm({
      billingName: user.billingName || user.name || "",
      company: user.company || "",
      billingAddressLine1: user.billingAddressLine1 || "",
      billingAddressLine2: user.billingAddressLine2 || "",
      billingCity: user.billingCity || "",
      billingStateCode: user.billingStateCode || codeFromName || "",
      billingPostalCode: user.billingPostalCode || "",
      billingPhone: user.billingPhone || "",
      gstin: user.gstin || "",
    });
  }, [user]);

  const set = (field: keyof FormState) => (value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const saveMutation = useMutation({
    mutationFn: async () => {
      const gstin = form.gstin.trim().toUpperCase();
      const payload = {
        billingName: form.billingName.trim() || null,
        company: form.company.trim() || null,
        billingAddressLine1: form.billingAddressLine1.trim() || null,
        billingAddressLine2: form.billingAddressLine2.trim() || null,
        billingCity: form.billingCity.trim() || null,
        billingState: stateNameForCode(form.billingStateCode) || null,
        billingStateCode: form.billingStateCode || null,
        billingPostalCode: form.billingPostalCode.trim() || null,
        billingCountry: "IN",
        billingPhone: form.billingPhone.trim() || null,
        gstin: gstin || null,
      };
      const res = await apiRequest("PATCH", "/api/auth/me", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("settings.billingDetails.saved", "Billing details saved"), description: t("settings.billingDetails.savedDesc", "These details will appear on your next GST invoice.") });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
    onError: (error: Error) => {
      toast({ title: t("settings.updateFailed", "Update failed"), description: error.message, variant: "destructive" });
    },
  });

  const handleSave = () => {
    const gstin = form.gstin.trim().toUpperCase();
    if (gstin && !GSTIN_REGEX.test(gstin)) {
      setGstinError(t("settings.billingDetails.gstinInvalid", "Enter a valid 15-character GSTIN (e.g. 09ABCDE1234F1Z5)."));
      return;
    }
    if (gstin && form.billingStateCode && gstin.slice(0, 2) !== form.billingStateCode) {
      setGstinError(t("settings.billingDetails.gstinStateMismatch", "The GSTIN state code ({{code}}) does not match the selected state.", { code: gstin.slice(0, 2) }));
      return;
    }
    setGstinError(null);
    saveMutation.mutate();
  };

  return (
    <Card className="p-6" data-testid="card-billing-details">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {t("settings.billingDetails.title", "Billing details")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("settings.billingDetails.description", "Used on your GST tax invoices. Add your GSTIN to receive B2B invoices with input tax credit.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="billing-name">{t("settings.billingDetails.billingName", "Billing name")}</Label>
            <Input id="billing-name" value={form.billingName} onChange={(e) => set("billingName")(e.target.value)} data-testid="input-billing-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-company">{t("settings.billingDetails.company", "Company (optional)")}</Label>
            <Input id="billing-company" value={form.company} onChange={(e) => set("company")(e.target.value)} data-testid="input-billing-company" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billing-address1">{t("settings.billingDetails.addressLine1", "Address line 1")}</Label>
            <Input id="billing-address1" value={form.billingAddressLine1} onChange={(e) => set("billingAddressLine1")(e.target.value)} data-testid="input-billing-address1" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billing-address2">{t("settings.billingDetails.addressLine2", "Address line 2 (optional)")}</Label>
            <Input id="billing-address2" value={form.billingAddressLine2} onChange={(e) => set("billingAddressLine2")(e.target.value)} data-testid="input-billing-address2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-city">{t("settings.billingDetails.city", "City")}</Label>
            <Input id="billing-city" value={form.billingCity} onChange={(e) => set("billingCity")(e.target.value)} data-testid="input-billing-city" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-state">{t("settings.billingDetails.state", "State")}</Label>
            <Select value={form.billingStateCode} onValueChange={set("billingStateCode")}>
              <SelectTrigger id="billing-state" data-testid="select-billing-state">
                <SelectValue placeholder={t("settings.billingDetails.selectState", "Select state")} />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state.code} value={state.code}>{state.code} · {state.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{t("settings.billingDetails.stateHint", "The GST state code decides CGST+SGST vs IGST on your invoice.")}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-postal">{t("settings.billingDetails.postalCode", "PIN code")}</Label>
            <Input id="billing-postal" value={form.billingPostalCode} onChange={(e) => set("billingPostalCode")(e.target.value)} inputMode="numeric" data-testid="input-billing-postal" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-phone">{t("settings.billingDetails.phone", "Billing phone")}</Label>
            <Input id="billing-phone" value={form.billingPhone} onChange={(e) => set("billingPhone")(e.target.value)} placeholder="+91 98765 43210" data-testid="input-billing-phone" />
            <p className="text-xs text-muted-foreground">{t("settings.billingDetails.phoneHint", "Required by Cashfree for checkout.")}</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billing-gstin">{t("settings.billingDetails.gstin", "GSTIN (optional)")}</Label>
            <Input
              id="billing-gstin"
              value={form.gstin}
              onChange={(e) => { set("gstin")(e.target.value.toUpperCase()); setGstinError(null); }}
              placeholder="09ABCDE1234F1Z5"
              maxLength={15}
              className="font-mono uppercase"
              data-testid="input-billing-gstin"
            />
            {gstinError ? (
              <p className="text-xs text-red-600" data-testid="text-gstin-error">{gstinError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">{t("settings.billingDetails.gstinHint", "15 characters. The first two digits must match your state code.")}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saveMutation.isPending} data-testid="button-save-billing-details">
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {t("settings.billingDetails.save", "Save billing details")}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default BillingDetailsSection;
