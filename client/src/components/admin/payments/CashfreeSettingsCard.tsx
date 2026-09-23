/**
 * Admin — Cashfree gateway configuration card.
 * GET/PUT /api/admin/payments/cashfree, POST /api/admin/payments/cashfree/test
 */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, Copy, CreditCard, Eye, EyeOff, Loader2, Save, TestTube, Webhook, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CashfreeAdminConfig {
  enabled: boolean;
  appId: string | null;
  secretKeyMasked: string | null;
  configured: boolean;
  environment: "sandbox" | "production";
  lastWebhookAt: string | null;
  webhookUrl: string;
  returnUrl: string;
}

interface TestResult {
  success: boolean;
  message: string;
  environment?: string;
}

const QUERY_KEY = ["/api/admin/payments/cashfree"];

export function CashfreeSettingsCard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [appId, setAppId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [environment, setEnvironment] = useState<"sandbox" | "production">("sandbox");
  const [dirty, setDirty] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const { data: config, isLoading } = useQuery<CashfreeAdminConfig>({ queryKey: QUERY_KEY });

  useEffect(() => {
    if (config && !dirty) {
      setAppId(config.appId || "");
      setEnvironment(config.environment || "sandbox");
      setSecretKey("");
    }
  }, [config, dirty]);

  const saveMutation = useMutation({
    mutationFn: async (body: Partial<{ enabled: boolean; appId: string; secretKey: string; environment: "sandbox" | "production" }>) => {
      const res = await apiRequest("PUT", "/api/admin/payments/cashfree", body);
      return (await res.json()) as CashfreeAdminConfig;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/settings/payment-gateway"] });
      setDirty(false);
      setSecretKey("");
      toast({ title: t("admin.payments.cashfree.saved", "Cashfree settings saved") });
    },
    onError: (error: Error) => {
      toast({ title: t("admin.payments.updateFailed", "Update failed"), description: error.message, variant: "destructive" });
    },
  });

  const testMutation = useMutation({
    mutationFn: async () => {
      const body: Record<string, string> = { environment };
      if (appId.trim()) body.appId = appId.trim();
      if (secretKey.trim()) body.secretKey = secretKey.trim();
      const res = await apiRequest("POST", "/api/admin/payments/cashfree/test", body);
      return (await res.json()) as TestResult;
    },
    onSuccess: (result) => setTestResult(result),
    onError: (error: Error) => setTestResult({ success: false, message: error.message }),
  });

  const handleSave = () => {
    const body: Partial<{ appId: string; secretKey: string; environment: "sandbox" | "production" }> = { appId: appId.trim(), environment };
    if (secretKey.trim()) body.secretKey = secretKey.trim();
    saveMutation.mutate(body);
  };

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: t("admin.payments.cashfree.copied", "{{label}} copied", { label }) });
    } catch {
      toast({ title: t("admin.payments.cashfree.copyFailed", "Could not copy"), variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-cashfree-settings">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {t("admin.payments.cashfree.title", "Cashfree Payments")}
                {config?.configured ? (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{t("admin.payments.configured", "Configured")}</Badge>
                ) : (
                  <Badge variant="secondary">{t("admin.payments.cashfree.notConfigured", "Not configured")}</Badge>
                )}
                <Badge variant="outline" className="capitalize">{config?.environment}</Badge>
              </CardTitle>
              <CardDescription>{t("admin.payments.cashfree.description", "The only payment gateway. All prices are in INR; Cashfree handles UPI, cards, net banking and wallets.")}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="cashfree-enabled" className="text-sm">{t("admin.payments.cashfree.enabled", "Enabled")}</Label>
            <Switch
              id="cashfree-enabled"
              checked={!!config?.enabled}
              disabled={saveMutation.isPending || !config?.configured}
              onCheckedChange={(checked) => saveMutation.mutate({ enabled: checked })}
              data-testid="switch-cashfree-enabled"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!config?.configured && (
          <Alert>
            <AlertDescription>{t("admin.payments.cashfree.configureFirst", "Enter your App ID and Secret Key from the Cashfree merchant dashboard (Developers → API keys), save, then enable the gateway.")}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cashfree-app-id">{t("admin.payments.cashfree.appId", "App ID")}</Label>
            <Input id="cashfree-app-id" value={appId} onChange={(e) => { setAppId(e.target.value); setDirty(true); }} placeholder="TEST1234567890abcdef" autoComplete="off" data-testid="input-cashfree-app-id" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cashfree-secret">{t("admin.payments.cashfree.secretKey", "Secret Key")}</Label>
            <div className="relative">
              <Input
                id="cashfree-secret"
                type={showSecret ? "text" : "password"}
                value={secretKey}
                onChange={(e) => { setSecretKey(e.target.value); setDirty(true); }}
                placeholder={config?.secretKeyMasked ? `${config.secretKeyMasked} · ${t("admin.payments.cashfree.leaveBlank", "leave blank to keep")}` : "cfsk_ma_test_…"}
                autoComplete="new-password"
                className="pr-10"
                data-testid="input-cashfree-secret"
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowSecret((v) => !v)} aria-label="toggle secret visibility">
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("admin.payments.cashfree.environment", "Environment")}</Label>
            <Select value={environment} onValueChange={(v) => { setEnvironment(v as "sandbox" | "production"); setDirty(true); }}>
              <SelectTrigger data-testid="select-cashfree-environment"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sandbox">{t("admin.payments.cashfree.sandbox", "Sandbox (test)")}</SelectItem>
                <SelectItem value="production">{t("admin.payments.cashfree.production", "Production (live)")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("admin.payments.cashfree.lastWebhook", "Last webhook received")}</Label>
            <div className="h-10 flex items-center text-sm text-muted-foreground" data-testid="text-cashfree-last-webhook">
              {config?.lastWebhookAt
                ? `${new Date(config.lastWebhookAt).toLocaleString()} (${formatDistanceToNow(new Date(config.lastWebhookAt), { addSuffix: true })})`
                : t("admin.payments.cashfree.noWebhookYet", "No webhook received yet")}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2"><Webhook className="h-4 w-4" />{t("admin.payments.cashfree.webhookUrl", "Webhook URL")}</Label>
          <div className="flex gap-2">
            <Input readOnly value={config?.webhookUrl || ""} className="font-mono text-xs" data-testid="input-cashfree-webhook-url" />
            <Button variant="outline" size="icon" onClick={() => config?.webhookUrl && copy(config.webhookUrl, "Webhook URL")} title="Copy"><Copy className="h-4 w-4" /></Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("admin.payments.cashfree.webhookHint", "Add this URL in Cashfree → Developers → Webhooks (Payment Gateway, version 2025-01-01) and subscribe to payment success, failed, user dropped and refund events.")}
          </p>
          {config?.returnUrl && (
            <p className="text-xs text-muted-foreground font-mono break-all">{t("admin.payments.cashfree.returnUrl", "Return URL")}: {config.returnUrl}</p>
          )}
        </div>

        {testResult && (
          <Alert className={testResult.success ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30" : "border-red-200 bg-red-50 dark:bg-red-950/30"} data-testid="alert-cashfree-test-result">
            {testResult.success ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
            <AlertDescription className={testResult.success ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}>
              {testResult.message}{testResult.environment ? ` (${testResult.environment})` : ""}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={() => testMutation.mutate()} disabled={testMutation.isPending || (!appId.trim() && !config?.configured)} data-testid="button-cashfree-test">
            {testMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <TestTube className="h-4 w-4 mr-2" />}
            {t("admin.payments.cashfree.testConnection", "Test connection")}
          </Button>
          <Button onClick={handleSave} disabled={saveMutation.isPending || !dirty} data-testid="button-cashfree-save">
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {t("common.saveChanges", "Save changes")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
