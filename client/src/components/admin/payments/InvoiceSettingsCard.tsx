/**
 * Admin — Invoice & GST settings card (GET/PUT /api/admin/invoice-settings).
 */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FileText, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { INDIAN_STATES } from "@/lib/indian-states";

export interface InvoiceSettings {
  invoice_seller_name: string;
  invoice_seller_trade_name: string;
  invoice_seller_gstin: string;
  invoice_seller_cin: string;
  invoice_seller_dpiit: string;
  invoice_seller_address: string;
  invoice_seller_state_code: string;
  invoice_seller_email: string;
  invoice_seller_phone: string;
  invoice_prefix: string;
  invoice_gst_rate: number | string;
  invoice_hsn_sac: string;
  invoice_footer_text: string;
  invoice_logo_url: string;
}

const QUERY_KEY = ["/api/admin/invoice-settings"];

type TextField = Exclude<keyof InvoiceSettings, "invoice_gst_rate">;

const FIELDS: Array<{ key: TextField; label: string; placeholder?: string; wide?: boolean }> = [
  { key: "invoice_seller_name", label: "Legal name", placeholder: "Aiclex Solutions Pvt. Ltd." },
  { key: "invoice_seller_trade_name", label: "Trade name", placeholder: "AICLEX Technologies" },
  { key: "invoice_seller_gstin", label: "Seller GSTIN", placeholder: "09ABGCA0151N1ZL" },
  { key: "invoice_seller_cin", label: "CIN", placeholder: "U62099UW2026PTC254970" },
  { key: "invoice_seller_dpiit", label: "DPIIT recognition no.", placeholder: "DIPP271379" },
  { key: "invoice_prefix", label: "Invoice number prefix", placeholder: "AIC" },
  { key: "invoice_hsn_sac", label: "HSN / SAC code", placeholder: "998314" },
  { key: "invoice_seller_email", label: "Billing email", placeholder: "billing@example.com" },
  { key: "invoice_seller_phone", label: "Billing phone", placeholder: "+91 …" },
  { key: "invoice_logo_url", label: "Logo URL (optional, falls back to branding logo)", placeholder: "https://…/logo.png", wide: true },
];

export function InvoiceSettingsCard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState<InvoiceSettings | null>(null);
  const [dirty, setDirty] = useState(false);

  const { data, isLoading } = useQuery<InvoiceSettings>({ queryKey: QUERY_KEY });

  useEffect(() => {
    if (data && !dirty) setForm({ ...data, invoice_gst_rate: data.invoice_gst_rate ?? 18 });
  }, [data, dirty]);

  const saveMutation = useMutation({
    mutationFn: async (body: InvoiceSettings) => {
      const res = await apiRequest("PUT", "/api/admin/invoice-settings", { ...body, invoice_gst_rate: Number(body.invoice_gst_rate) });
      return (await res.json()) as InvoiceSettings;
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(QUERY_KEY, saved);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      setDirty(false);
      toast({ title: t("admin.invoiceSettings.saved", "Invoice settings saved") });
    },
    onError: (error: Error) => {
      toast({ title: t("admin.payments.updateFailed", "Update failed"), description: error.message, variant: "destructive" });
    },
  });

  const update = <K extends keyof InvoiceSettings>(key: K, value: InvoiceSettings[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
  };

  if (isLoading || !form) {
    return (
      <Card>
        <CardContent className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></CardContent>
      </Card>
    );
  }

  const gstRate = Number(form.invoice_gst_rate);
  const gstRateInvalid = !Number.isFinite(gstRate) || gstRate < 0 || gstRate > 100;

  return (
    <Card data-testid="card-invoice-settings">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle>{t("admin.invoiceSettings.title", "Invoice & GST")}</CardTitle>
            <CardDescription>{t("admin.invoiceSettings.description", "Seller details printed on every GST tax invoice and credit note. Numbering restarts each financial year (e.g. AIC/25-26/0001).")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {FIELDS.map((field) => (
            <div key={field.key} className={`space-y-2 ${field.wide ? "md:col-span-2" : ""}`}>
              <Label htmlFor={field.key}>{t(`admin.invoiceSettings.${field.key}`, field.label)}</Label>
              <Input id={field.key} value={form[field.key] ?? ""} placeholder={field.placeholder} onChange={(e) => update(field.key, e.target.value)} data-testid={`input-${field.key.replace(/_/g, "-")}`} />
            </div>
          ))}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="invoice_seller_address">{t("admin.invoiceSettings.invoice_seller_address", "Registered address")}</Label>
            <Textarea id="invoice_seller_address" rows={2} value={form.invoice_seller_address ?? ""} onChange={(e) => update("invoice_seller_address", e.target.value)} data-testid="input-invoice-seller-address" />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.invoiceSettings.invoice_seller_state_code", "Seller state (GST code)")}</Label>
            <Select value={form.invoice_seller_state_code || ""} onValueChange={(v) => update("invoice_seller_state_code", v)}>
              <SelectTrigger data-testid="select-invoice-seller-state"><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((s) => <SelectItem key={s.code} value={s.code}>{s.code} · {s.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{t("admin.invoiceSettings.stateHint", "Buyers in the same state are charged CGST+SGST; others IGST.")}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice_gst_rate">{t("admin.invoiceSettings.invoice_gst_rate", "GST rate (%)")}</Label>
            <Input id="invoice_gst_rate" type="number" min={0} max={100} step="0.01" value={form.invoice_gst_rate} onChange={(e) => update("invoice_gst_rate", e.target.value)} data-testid="input-invoice-gst-rate" />
            {gstRateInvalid && <p className="text-xs text-red-600">{t("admin.invoiceSettings.gstRateInvalid", "Enter a rate between 0 and 100.")}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="invoice_footer_text">{t("admin.invoiceSettings.invoice_footer_text", "Footer text")}</Label>
            <Textarea id="invoice_footer_text" rows={2} value={form.invoice_footer_text ?? ""} placeholder="This is a computer-generated invoice and does not require a signature." onChange={(e) => update("invoice_footer_text", e.target.value)} data-testid="input-invoice-footer" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => form && saveMutation.mutate(form)} disabled={saveMutation.isPending || !dirty || gstRateInvalid} data-testid="button-save-invoice-settings">
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {t("common.saveChanges", "Save changes")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
