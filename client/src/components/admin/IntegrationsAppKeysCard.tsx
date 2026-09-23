import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, CheckCircle2, Copy, ExternalLink, Plug } from "lucide-react";
import type { IntegrationProviderKey } from "@/lib/integrations";

/** Same masking convention as SMTPSettings: a stored secret is shown as ******** and never sent back unchanged. */
const MASK = "********";

type OAuthProvider = Extract<IntegrationProviderKey, "zoho" | "salesforce" | "gohighlevel">;

interface SelectField {
  key: string;
  label: string;
  tooltip: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}

interface ProviderSection {
  provider: OAuthProvider;
  title: string;
  clientIdKey: string;
  clientSecretKey: string;
  select?: SelectField;
  docsUrl: string;
  docsLabel: string;
  notes: string[];
}

export interface IntegrationsAppKeysCardProps {
  /** Raw GET /api/admin/settings payload (secrets arrive as `true` when set, ids as strings). */
  settings: Record<string, unknown> | undefined;
  /** PATCH /api/admin/settings/:key — the same mutation GlobalSettings uses. */
  onSave: (key: string, value: string) => Promise<unknown>;
}

function redirectUri(provider: OAuthProvider): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/app/integrations/callback/${provider}`;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function isSecretSet(value: unknown): boolean {
  return value === true || (typeof value === "string" && value.length > 0);
}

export function IntegrationsAppKeysCard({ settings, onSave }: IntegrationsAppKeysCardProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const sections: ProviderSection[] = [
    {
      provider: "zoho",
      title: "Zoho CRM",
      clientIdKey: "zoho_client_id",
      clientSecretKey: "zoho_client_secret",
      select: {
        key: "zoho_accounts_domain",
        label: t("integrations.providers.admin.zohoDomain", "Accounts domain"),
        tooltip: t("integrations.providers.admin.zohoDomainTooltip", "Must match the data centre of the Zoho account that created the client (India = accounts.zoho.in)."),
        defaultValue: "https://accounts.zoho.in",
        options: [
          { value: "https://accounts.zoho.in", label: "India (accounts.zoho.in)" },
          { value: "https://accounts.zoho.com", label: "US (accounts.zoho.com)" },
          { value: "https://accounts.zoho.eu", label: "EU (accounts.zoho.eu)" },
          { value: "https://accounts.zoho.com.au", label: "Australia (accounts.zoho.com.au)" },
          { value: "https://accounts.zoho.jp", label: "Japan (accounts.zoho.jp)" },
          { value: "https://accounts.zoho.com.cn", label: "China (accounts.zoho.com.cn)" },
        ],
      },
      docsUrl: "https://api-console.zoho.in/",
      docsLabel: "Zoho API Console",
      notes: [
        t("integrations.providers.admin.zohoNote1", "Create a Server-based Application in the Zoho API Console and paste its Client ID and Client Secret."),
        t("integrations.providers.admin.zohoNote2", "Register the redirect URI below as the Authorized Redirect URI."),
      ],
    },
    {
      provider: "salesforce",
      title: "Salesforce",
      clientIdKey: "salesforce_client_id",
      clientSecretKey: "salesforce_client_secret",
      select: {
        key: "salesforce_login_url",
        label: t("integrations.providers.admin.salesforceLogin", "Login URL"),
        tooltip: t("integrations.providers.admin.salesforceLoginTooltip", "Use test.salesforce.com for sandbox orgs."),
        defaultValue: "https://login.salesforce.com",
        options: [
          { value: "https://login.salesforce.com", label: "Production (login.salesforce.com)" },
          { value: "https://test.salesforce.com", label: "Sandbox (test.salesforce.com)" },
        ],
      },
      docsUrl: "https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm",
      docsLabel: "Salesforce connected app guide",
      notes: [
        t("integrations.providers.admin.salesforceNote1", "Create a Connected App with OAuth enabled and the scopes: api, refresh_token, offline_access."),
        t("integrations.providers.admin.salesforceNote2", "Paste the Consumer Key as Client ID and the Consumer Secret as Client Secret; add the redirect URI below as a Callback URL."),
      ],
    },
    {
      provider: "gohighlevel",
      title: "GoHighLevel",
      clientIdKey: "ghl_client_id",
      clientSecretKey: "ghl_client_secret",
      docsUrl: "https://marketplace.gohighlevel.com/",
      docsLabel: "GoHighLevel Marketplace",
      notes: [
        t("integrations.providers.admin.ghlNote1", "Create a Marketplace app (Private, Sub-Account distribution) with the scopes contacts.readonly, contacts.write, calendars.readonly, calendars/events.write and locations.readonly."),
        t("integrations.providers.admin.ghlNote2", "Add the redirect URI below to the app and paste its Client ID and Client Secret."),
      ],
    },
  ];

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<OAuthProvider | null>(null);

  const draft = (key: string): string | undefined => drafts[key];
  const setDraft = (key: string, value: string) => setDrafts((prev) => ({ ...prev, [key]: value }));

  const copyRedirect = (provider: OAuthProvider) => {
    navigator.clipboard.writeText(redirectUri(provider)).then(() =>
      toast({ title: t("integrations.providers.admin.redirectCopied", "Redirect URI copied to clipboard") })
    );
  };

  const handleSave = async (section: ProviderSection) => {
    const keys = [section.clientIdKey, section.clientSecretKey, section.select?.key].filter((k): k is string => !!k);
    const updates = keys
      .map((key) => ({ key, value: (draft(key) ?? "").trim() }))
      .filter(({ key, value }) => value.length > 0 && !(key === section.clientSecretKey && value === MASK));
    if (updates.length === 0) {
      toast({ title: t("integrations.providers.admin.noChanges", "No changes to save"), variant: "destructive" });
      return;
    }
    setSaving(section.provider);
    try {
      await Promise.all(updates.map(({ key, value }) => onSave(key, value)));
      setDrafts((prev) => {
        const next = { ...prev };
        keys.forEach((k) => delete next[k]);
        return next;
      });
      toast({ title: t("integrations.providers.admin.saved", { defaultValue: "{{provider}} app keys saved", provider: section.title }) });
    } catch (err) {
      toast({
        title: t("integrations.providers.admin.saveFailed", { defaultValue: "Failed to save {{provider}} app keys", provider: section.title }),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card id="integration-app-keys">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Plug className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>{t("integrations.providers.admin.title", "CRM Integration App Keys")}</CardTitle>
            <CardDescription>
              {t("integrations.providers.admin.description", "OAuth app credentials for Zoho CRM, Salesforce and GoHighLevel. Users connect their own accounts from Tools > Integrations. Cal.com, Zapier and Pabbly need no admin keys.")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section) => {
          const currentId = asString(settings?.[section.clientIdKey]);
          const secretSet = isSecretSet(settings?.[section.clientSecretKey]);
          const configured = currentId.length > 0 && secretSet;
          const sel = section.select;
          const selectValue = sel
            ? (draft(sel.key) ?? asString(settings?.[sel.key])) || sel.defaultValue
            : undefined;
          const isSaving = saving === section.provider;
          return (
            <div key={section.provider} className="rounded-md border p-4 space-y-4" data-testid={`section-app-keys-${section.provider}`}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h4 className="font-medium">{section.title}</h4>
                {configured && (
                  <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{t("integrations.providers.admin.configured", "Configured")}</span>
                  </div>
                )}
              </div>

              <div className="rounded-md border bg-muted/40 p-3 space-y-2">
                <p className="text-xs font-medium text-foreground">{t("integrations.providers.admin.setupGuide", "Setup guide")}</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>
                    <a href={section.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline">
                      {section.docsLabel} <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  {section.notes.map((note, i) => <li key={i}>{note}</li>)}
                </ol>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 text-xs bg-background border rounded px-2 py-1 font-mono text-foreground truncate" data-testid={`text-redirect-uri-${section.provider}`}>
                    {redirectUri(section.provider)}
                  </code>
                  <Button size="icon" variant="ghost" onClick={() => copyRedirect(section.provider)} data-testid={`button-copy-redirect-uri-${section.provider}`}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center">
                    <Label htmlFor={`${section.provider}-client-id`}>{t("integrations.providers.admin.clientId", "Client ID")}</Label>
                    <InfoTooltip content={t("integrations.providers.admin.clientIdTooltip", "Public identifier of your OAuth app at the provider.")} />
                  </div>
                  <Input
                    id={`${section.provider}-client-id`}
                    type="text"
                    autoComplete="off"
                    value={draft(section.clientIdKey) ?? currentId}
                    onChange={(e) => setDraft(section.clientIdKey, e.target.value)}
                    placeholder={t("integrations.providers.admin.clientIdPlaceholder", "Paste the Client ID")}
                    data-testid={`input-${section.provider}-client-id`}
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <Label htmlFor={`${section.provider}-client-secret`}>{t("integrations.providers.admin.clientSecret", "Client Secret")}</Label>
                    <InfoTooltip content={t("integrations.providers.admin.clientSecretTooltip", "Stored encrypted and never shown again. Paste a new value to rotate it.")} />
                  </div>
                  <Input
                    id={`${section.provider}-client-secret`}
                    type="password"
                    autoComplete="new-password"
                    value={draft(section.clientSecretKey) ?? (secretSet ? MASK : "")}
                    onFocus={() => { if (draft(section.clientSecretKey) === undefined && secretSet) setDraft(section.clientSecretKey, ""); }}
                    onChange={(e) => setDraft(section.clientSecretKey, e.target.value)}
                    placeholder={secretSet ? MASK : t("integrations.providers.admin.clientSecretPlaceholder", "Paste the Client Secret")}
                    data-testid={`input-${section.provider}-client-secret`}
                  />
                </div>
                {sel && (
                  <div>
                    <div className="flex items-center">
                      <Label>{sel.label}</Label>
                      <InfoTooltip content={sel.tooltip} />
                    </div>
                    <Select value={selectValue} onValueChange={(v) => setDraft(sel.key, v)}>
                      <SelectTrigger data-testid={`select-${sel.key}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sel.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave(section)} disabled={isSaving} data-testid={`button-save-${section.provider}-keys`}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("admin.settings.saving", "Saving...")}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {t("integrations.providers.admin.saveKeys", { defaultValue: "Save {{provider}} keys", provider: section.title })}
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
