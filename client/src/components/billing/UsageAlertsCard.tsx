/**
 * UsageAlertsCard — per-user credit usage alerts + low-balance guard (GET/PUT /api/billing/preferences).
 */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { BellRing, Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface BillingPreferences {
  alertThresholdPercent: number;
  alertThresholdCredits: number | null;
  alertEmail: string | null;
  alertWhatsappPhone: string | null;
  whatsappTemplate: string;
  pauseCampaignsWhenEmpty: boolean;
  dailyUsageSummary: boolean;
  accountEmail: string | null;
  balance: number;
  effectiveThreshold: number;
  thresholdSource: "credits" | "percent" | "global";
  planMonthlyMinutes: number | null;
}

interface FormState {
  alertThresholdPercent: string;
  alertThresholdCredits: string;
  alertEmail: string;
  alertWhatsappPhone: string;
  whatsappTemplate: string;
  pauseCampaignsWhenEmpty: boolean;
  dailyUsageSummary: boolean;
}

const QUERY_KEY = ["/api/billing/preferences"];

function toForm(p: BillingPreferences): FormState {
  return {
    alertThresholdPercent: String(p.alertThresholdPercent),
    alertThresholdCredits: p.alertThresholdCredits === null ? "" : String(p.alertThresholdCredits),
    alertEmail: p.alertEmail ?? "",
    alertWhatsappPhone: p.alertWhatsappPhone ?? "",
    whatsappTemplate: p.whatsappTemplate || "low_balance",
    pauseCampaignsWhenEmpty: p.pauseCampaignsWhenEmpty,
    dailyUsageSummary: p.dailyUsageSummary,
  };
}

export function UsageAlertsCard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState | null>(null);

  const { data: prefs, isLoading } = useQuery<BillingPreferences>({ queryKey: QUERY_KEY });
  useEffect(() => { if (prefs) setForm(toForm(prefs)); }, [prefs]);

  const save = useMutation({
    mutationFn: async (f: FormState) => {
      const body = {
        alertThresholdPercent: Number(f.alertThresholdPercent) || 20,
        alertThresholdCredits: f.alertThresholdCredits.trim() === "" ? null : Number(f.alertThresholdCredits),
        alertEmail: f.alertEmail.trim() || null,
        alertWhatsappPhone: f.alertWhatsappPhone.trim() || null,
        whatsappTemplate: f.whatsappTemplate.trim() || "low_balance",
        pauseCampaignsWhenEmpty: f.pauseCampaignsWhenEmpty,
        dailyUsageSummary: f.dailyUsageSummary,
      };
      return (await apiRequest("PUT", "/api/billing/preferences", body)).json() as Promise<BillingPreferences>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY, data);
      toast({ title: t("billing.alerts.saved", "Usage alerts saved") });
    },
    onError: (error: Error) => toast({ title: t("billing.alerts.saveFailed", "Could not save alerts"), description: error.message, variant: "destructive" }),
  });

  const test = useMutation({
    mutationFn: async () => (await apiRequest("POST", "/api/billing/preferences/test")).json() as Promise<{ email: string; whatsapp: string; inApp: string; to: string }>,
    onSuccess: (r) => toast({
      title: t("billing.alerts.testSent", "Test alert sent"),
      description: t("billing.alerts.testResult", "Email: {{email}} ({{to}}) · WhatsApp: {{whatsapp}} · In-app: {{inApp}}", { email: r.email, to: r.to, whatsapp: r.whatsapp, inApp: r.inApp }),
    }),
    onError: (error: Error) => toast({ title: t("billing.alerts.testFailed", "Test alert failed"), description: error.message, variant: "destructive" }),
  });

  if (isLoading || !form || !prefs) {
    return (
      <Card><CardContent className="flex items-center justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></CardContent></Card>
    );
  }

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => (f ? { ...f, [key]: value } : f));
  const thresholdHint = prefs.thresholdSource === "credits"
    ? t("billing.alerts.hintCredits", "Alerts fire at {{n}} minutes (fixed).", { n: prefs.effectiveThreshold })
    : prefs.thresholdSource === "percent"
      ? t("billing.alerts.hintPercent", "Alerts fire at {{n}} minutes ({{pct}}% of your plan's {{plan}} monthly minutes).", { n: prefs.effectiveThreshold, pct: prefs.alertThresholdPercent, plan: prefs.planMonthlyMinutes })
      : t("billing.alerts.hintGlobal", "No active plan: alerts fire at the platform default of {{n}} minutes. Set a fixed threshold to override.", { n: prefs.effectiveThreshold });

  return (
    <Card data-testid="card-usage-alerts">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-amber-500" />{t("billing.alerts.title", "Usage alerts")}</CardTitle>
        <CardDescription>{t("billing.alerts.subtitle", "Get warned before your minutes run out and stop campaigns when the balance hits zero.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="alert-pct">{t("billing.alerts.thresholdPercent", "Alert at % of monthly minutes")}</Label>
            <Input id="alert-pct" type="number" min={1} max={100} value={form.alertThresholdPercent} onChange={(e) => set("alertThresholdPercent", e.target.value)} data-testid="input-alert-percent" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="alert-credits">{t("billing.alerts.thresholdCredits", "Or a fixed number of minutes (optional)")}</Label>
            <Input id="alert-credits" type="number" min={1} placeholder={t("billing.alerts.thresholdCreditsPlaceholder", "e.g. 100")} value={form.alertThresholdCredits} onChange={(e) => set("alertThresholdCredits", e.target.value)} data-testid="input-alert-credits" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{thresholdHint}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="alert-email">{t("billing.alerts.email", "Alert email")}</Label>
            <Input id="alert-email" type="email" placeholder={prefs.accountEmail ?? ""} value={form.alertEmail} onChange={(e) => set("alertEmail", e.target.value)} data-testid="input-alert-email" />
            <p className="text-xs text-muted-foreground">{t("billing.alerts.emailHint", "Leave empty to use your account email.")}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="alert-wa">{t("billing.alerts.whatsapp", "WhatsApp number (optional)")}</Label>
            <Input id="alert-wa" type="tel" placeholder="+91 98765 43210" value={form.alertWhatsappPhone} onChange={(e) => set("alertWhatsappPhone", e.target.value)} data-testid="input-alert-whatsapp" />
            <p className="text-xs text-muted-foreground">{t("billing.alerts.whatsappHint", "Sent through your Waki connection using the approved template below (body variable 1 = balance, variable 2 = top-up link).")}</p>
          </div>
        </div>
        <div className="space-y-1.5 md:w-1/2">
          <Label htmlFor="alert-template">{t("billing.alerts.template", "WhatsApp template name")}</Label>
          <Input id="alert-template" value={form.whatsappTemplate} onChange={(e) => set("whatsappTemplate", e.target.value)} data-testid="input-alert-template" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">{t("billing.alerts.pauseCampaigns", "Pause campaigns when the balance hits 0")}</div>
              <div className="text-xs text-muted-foreground">{t("billing.alerts.pauseCampaignsHint", "Running campaigns are paused and you are notified. Resume them after topping up.")}</div>
            </div>
            <Switch checked={form.pauseCampaignsWhenEmpty} onCheckedChange={(v) => set("pauseCampaignsWhenEmpty", v)} data-testid="switch-pause-campaigns" />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">{t("billing.alerts.dailySummary", "Daily usage summary")}</div>
              <div className="text-xs text-muted-foreground">{t("billing.alerts.dailySummaryHint", "Every day at 09:00 IST: minutes used, calls and your balance.")}</div>
            </div>
            <Switch checked={form.dailyUsageSummary} onCheckedChange={(v) => set("dailyUsageSummary", v)} data-testid="switch-daily-summary" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => save.mutate(form)} disabled={save.isPending} data-testid="button-save-alerts">
            {save.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {t("common.save", "Save")}
          </Button>
          <Button variant="outline" onClick={() => test.mutate()} disabled={test.isPending} data-testid="button-test-alert">
            {test.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            {t("billing.alerts.sendTest", "Send test alert")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
