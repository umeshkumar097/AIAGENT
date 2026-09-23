import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calendar, Webhook, Globe, Key, Users, Mail, ContactRound, Link as LinkIcon, TableProperties, ExternalLink, Unlink, Loader2, MessageSquare, Workflow, ScrollText, FlaskConical } from "lucide-react";
import { usePluginStatus } from "@/hooks/use-plugin-status";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { IntegrationCard, type IntegrationCardAction } from "@/components/dashboard/IntegrationCard";
import { SiGooglesheets } from "react-icons/si";
import { AuthStorage } from "@/lib/auth-storage";
import { IntegrationConfigDialog } from "@/components/integrations/IntegrationConfigDialog";
import { IntegrationLogsDialog } from "@/components/integrations/IntegrationLogsDialog";
import { IntegrationDisconnectDialog, IntegrationNotConfiguredDialog } from "@/components/integrations/IntegrationDialogs";
import { PROVIDER_ICONS } from "@/components/integrations/provider-icons";
import {
  INTEGRATIONS_QUERY_KEY, PROVIDER_META, PROVIDER_ORDER,
  disconnectIntegration, fetchIntegrationAuthUrl, integrationErrorMessage, invalidateIntegrations, testIntegration,
  type IntegrationProviderKey, type IntegrationProviderState, type IntegrationsListResponse,
} from "@/lib/integrations";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: typeof ClipboardList;
  iconColor: string;
  iconBg: string;
  url: string;
  pluginRequired?: string;
}

const allTools: ToolCard[] = [
  {
    id: "forms",
    title: "Forms",
    description: "Create and manage forms to collect data from your contacts and leads.",
    icon: ClipboardList,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    url: "/app/flows/forms",
  },
  {
    id: "appointments",
    title: "Appointments",
    description: "Manage appointment bookings from your AI agents and forms.",
    icon: Calendar,
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    url: "/app/flows/appointments",
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Configure webhook endpoints to receive real-time event notifications.",
    icon: Webhook,
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
    url: "/app/flows/webhooks",
  },
  {
    id: "widget",
    title: "Website Widget",
    description: "Embed an AI chat widget on your website for visitor engagement.",
    icon: Globe,
    iconColor: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/20",
    url: "/app/tools/widgets",
  },
  {
    id: "crm",
    title: "Quick CRM",
    description: "Organize and manage your leads with a kanban board and contact filters.",
    icon: ContactRound,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    url: "/app/crm",
  },
  {
    id: "incoming-connections",
    title: "Incoming Connections",
    description: "Manage incoming call routing and connect callers to your AI agents.",
    icon: LinkIcon,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    url: "/app/incoming-connections",
  },
  {
    id: "developer",
    title: "Developer / API Keys",
    description: "Manage API keys and access REST API documentation.",
    icon: Key,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    url: "/app/settings?tab=developer",
    pluginRequired: "rest-api",
  },
  {
    id: "team",
    title: "Team Management",
    description: "Invite team members, assign roles, and manage permissions.",
    icon: Users,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    url: "/app/settings?tab=team",
    pluginRequired: "team-management",
  },
  {
    id: "messaging",
    title: "WhatsApp & Email",
    description: "Configure WhatsApp Business and email messaging for your agents.",
    icon: Mail,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/app/settings?tab=messaging",
    pluginRequired: "messaging",
  },
];

export default function ToolsPage() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { isPluginEnabled, isLoading } = usePluginStatus();
  const { toast } = useToast();

  const [connecting, setConnecting] = useState<string | null>(null);
  const [testing, setTesting] = useState<IntegrationProviderKey | null>(null);
  const [configProvider, setConfigProvider] = useState<IntegrationProviderKey | null>(null);
  const [logsProvider, setLogsProvider] = useState<IntegrationProviderKey | null>(null);
  const [disconnectProvider, setDisconnectProvider] = useState<IntegrationProviderKey | null>(null);
  const [notConfiguredProvider, setNotConfiguredProvider] = useState<IntegrationProviderKey | null>(null);
  const isAdmin = AuthStorage.isAdmin();

  const { data: googleStatus } = useQuery<{ connected: boolean; email?: string }>({
    queryKey: ["/api/integrations/google/status"],
    retry: false,
  });

  const { data: integrations } = useQuery<IntegrationsListResponse>({
    queryKey: INTEGRATIONS_QUERY_KEY,
    retry: false,
  });
  const providerState = (key: IntegrationProviderKey): IntegrationProviderState | undefined =>
    integrations?.providers?.find((p) => p.provider === key);

  const disconnectGoogleMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", "/api/integrations/google/disconnect"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations/google/status"] });
      toast({ title: "Google account disconnected" });
    },
    onError: () => {
      toast({ title: "Failed to disconnect", variant: "destructive" });
    },
  });

  const handleConnectGoogle = async () => {
    setConnecting("google-sheets");
    try {
      const res = await apiRequest("GET", "/api/integrations/google/auth");
      const body = await res.json();
      window.location.href = body.url;
    } catch (err: any) {
      const errData = err?.data ?? err?.response;
      const description = errData?.errorCode === "not_configured"
        ? "Google OAuth credentials are not configured. Please add them in Admin > Settings."
        : errData?.error || undefined;
      toast({ title: "Google connection failed", description, variant: "destructive" });
      setConnecting(null);
    }
  };

  const startOAuth = async (provider: IntegrationProviderKey) => {
    const meta = PROVIDER_META[provider];
    setConnecting(provider);
    try {
      const { url } = await fetchIntegrationAuthUrl(provider);
      if (!url) throw new Error("No authorization URL returned");
      window.location.href = url;
    } catch (err: any) {
      if (err?.status === 503) {
        setNotConfiguredProvider(provider);
      } else {
        toast({
          title: t("integrations.providers.connectFailed", { defaultValue: "{{provider}} connection failed", provider: meta.title }),
          description: integrationErrorMessage(err, t("errors.generic", "Something went wrong")),
          variant: "destructive",
        });
      }
      setConnecting(null);
    }
  };

  const handlePrimary = (provider: IntegrationProviderKey) => {
    const state = providerState(provider);
    const kind = state?.kind ?? PROVIDER_META[provider].kind;
    if (state?.connected) {
      setConfigProvider(provider);
      return;
    }
    if (kind === "oauth") {
      if (state && state.configured === false) {
        setNotConfiguredProvider(provider);
        return;
      }
      void startOAuth(provider);
      return;
    }
    setConfigProvider(provider);
  };

  const handleTest = async (provider: IntegrationProviderKey) => {
    const meta = PROVIDER_META[provider];
    setTesting(provider);
    try {
      const result = await testIntegration(provider);
      const failed = result.results?.filter((r) => !r.ok) ?? [];
      if (result.ok && failed.length === 0) {
        toast({
          title: t("integrations.providers.testOk", { defaultValue: "{{provider}} is working", provider: meta.title }),
          description: result.accountName || undefined,
        });
      } else {
        toast({
          title: t("integrations.providers.testFailed", { defaultValue: "{{provider}} test failed", provider: meta.title }),
          description: result.error || failed.map((r) => `${r.url}: ${r.error || r.httpStatus || "failed"}`).join("\n"),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: t("integrations.providers.testFailed", { defaultValue: "{{provider}} test failed", provider: meta.title }),
        description: integrationErrorMessage(err, t("errors.generic", "Something went wrong")),
        variant: "destructive",
      });
    } finally {
      invalidateIntegrations();
      setTesting(null);
    }
  };

  const disconnectMutation = useMutation({
    mutationFn: (provider: IntegrationProviderKey) => disconnectIntegration(provider),
    onSuccess: (_data, provider) => {
      invalidateIntegrations();
      toast({ title: t("integrations.providers.disconnected", { defaultValue: "{{provider}} disconnected", provider: PROVIDER_META[provider].title }) });
    },
    onError: (err: unknown) => {
      toast({
        title: t("integrations.providers.disconnectFailed", "Failed to disconnect"),
        description: integrationErrorMessage(err, t("errors.generic", "Something went wrong")),
        variant: "destructive",
      });
    },
    onSettled: () => setDisconnectProvider(null),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleConnected = params.get("google_connected");
    const googleError = params.get("google_error");
    const integration = params.get("integration");
    if (googleConnected === "true") {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations/google/status"] });
      toast({ title: "Google account connected successfully" });
      window.history.replaceState({}, "", "/app/tools");
    } else if (googleError) {
      const messages: Record<string, string> = {
        access_denied: "Access was denied. Please try again.",
        invalid_state: "OAuth state was invalid or expired. Please try connecting again.",
        no_refresh_token: "No refresh token received. Please re-connect and grant offline access.",
        token_exchange_failed: "Failed to exchange token. Please try again.",
        not_configured: "Google OAuth is not configured on this server.",
        server_error: "A server error occurred. Please try again.",
      };
      toast({
        title: "Google connection failed",
        description: messages[googleError] || "An unknown error occurred.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/app/tools");
    } else if (integration) {
      const meta = PROVIDER_META[integration as IntegrationProviderKey];
      const title = meta?.title ?? integration;
      const error = params.get("error");
      if (params.get("connected") === "true") {
        invalidateIntegrations();
        toast({ title: t("integrations.providers.connectedToast", { defaultValue: "{{provider}} connected successfully", provider: title }) });
      } else if (error) {
        toast({
          title: t("integrations.providers.connectFailed", { defaultValue: "{{provider}} connection failed", provider: title }),
          description: error,
          variant: "destructive",
        });
      }
      window.history.replaceState({}, "", "/app/tools");
    }
  // Runs once on mount to consume the OAuth return query.
  }, []);

  const visibleTools = allTools.filter((tool) => {
    if (!tool.pluginRequired) return true;
    return isPluginEnabled?.(tool.pluginRequired) ?? false;
  });

  const cardLabels = {
    connected: t("integrations.providers.status.connected", "Connected"),
    notConnected: t("integrations.providers.status.notConnected", "Not Connected"),
    error: t("integrations.providers.status.error", "Needs attention"),
    status: t("integrations.providers.card.status", "Status"),
    lastSync: t("integrations.providers.card.lastSync", "Last Sync"),
    account: t("integrations.providers.card.account", "Connected Account"),
  };

  const extraRow = (provider: IntegrationProviderKey, state: IntegrationProviderState | undefined): { label: string; value: string } => {
    const connected = !!state?.connected;
    switch (provider) {
      case "zapier":
      case "pabbly": {
        const count = state?.config?.webhooks?.length ?? 0;
        return { label: t("integrations.providers.card.webhooks", "Webhooks"), value: connected ? String(count) : "-" };
      }
      case "calcom":
        return {
          label: t("integrations.providers.card.eventType", "Event type"),
          value: connected ? (state?.config?.eventTypeId ? String(state.config.eventTypeId) : t("integrations.providers.card.notSet", "Not set")) : "-",
        };
      case "gohighlevel":
        return {
          label: t("integrations.providers.card.calendar", "Calendar"),
          value: connected ? (state?.config?.calendarId ? t("integrations.providers.card.set", "Set") : t("integrations.providers.card.notSet", "Not set")) : "-",
        };
      default:
        return { label: t("integrations.providers.card.sync", "Sync"), value: connected ? t("integrations.providers.card.leadsAppointments", "Leads & appointments") : "-" };
    }
  };

  const renderProviderCard = (provider: IntegrationProviderKey) => {
    const meta = PROVIDER_META[provider];
    const state = providerState(provider);
    const connected = !!state?.connected;
    const status = state?.status === "error" ? "error" : connected ? "connected" : "disconnected";
    const extra = extraRow(provider, state);
    const actions: IntegrationCardAction[] = connected ? [
      { key: "test", label: t("integrations.providers.actions.test", "Test"), icon: <FlaskConical className="w-3.5 h-3.5 mr-1" />, onClick: () => handleTest(provider), loading: testing === provider },
      { key: "logs", label: t("integrations.providers.actions.logs", "Logs"), icon: <ScrollText className="w-3.5 h-3.5 mr-1" />, onClick: () => setLogsProvider(provider) },
      { key: "disconnect", label: t("integrations.providers.actions.disconnect", "Disconnect"), icon: <Unlink className="w-3.5 h-3.5 mr-1" />, onClick: () => setDisconnectProvider(provider), variant: "ghost", loading: disconnectMutation.isPending && disconnectMutation.variables === provider },
    ] : [];
    return (
      <IntegrationCard
        key={provider}
        id={provider}
        title={meta.title}
        category={meta.category}
        description={meta.description}
        icon={PROVIDER_ICONS[provider].icon}
        iconBg={PROVIDER_ICONS[provider].iconBg}
        isConnected={connected}
        isConnecting={connecting === provider}
        status={status}
        errorMessage={state?.lastError}
        accountLabel={connected ? (state?.accountName || t("integrations.providers.card.active", "Active")) : "-"}
        lastSyncLabel={connected
          ? (state?.lastSyncAt ? formatDistanceToNow(new Date(state.lastSyncAt), { addSuffix: true }) : t("integrations.providers.card.never", "Never"))
          : "-"}
        extraLabel={extra.label}
        extraValue={extra.value}
        primaryLabel={connected
          ? t("integrations.providers.actions.configure", "Configure")
          : meta.kind === "oauth" ? t("integrations.providers.actions.connect", "Connect") : t("integrations.providers.actions.setUp", "Set up")}
        onConnect={() => handlePrimary(provider)}
        actions={actions}
        labels={cardLabels}
      />
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12 pb-24">
      {/* Platform Tools Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-tools-title">Tools</h1>
          <p className="text-muted-foreground mt-1" data-testid="text-tools-description">
            Access and configure your platform tools and widgets.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-md bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-24" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTools.map((tool) => (
              <Card
                key={tool.id}
                className="cursor-pointer hover-elevate active-elevate-2 transition-colors"
                onClick={() => setLocation(tool.url)}
                data-testid={`card-tool-${tool.id}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-md ${tool.iconBg} flex items-center justify-center shrink-0`}>
                      <tool.icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">{tool.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* External Integrations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Integrations</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Connect and manage external tools that power your agents.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IntegrationCard
            id="google-sheets"
            title="Google Sheets"
            category="Data & Spreadsheets"
            description="Push appointment, contacts and form data to Google Sheets in real time."
            icon={<SiGooglesheets className="w-6 h-6 text-green-600 dark:text-green-400" />}
            iconBg="bg-green-500/10 dark:bg-green-500/20"
            isConnected={!!googleStatus?.connected}
            isConnecting={connecting === "google-sheets"}
            onConnect={googleStatus?.connected ? () => disconnectGoogleMutation.mutate() : handleConnectGoogle}
          />
          {PROVIDER_ORDER.map(renderProviderCard)}
        </div>
      </div>

      <IntegrationConfigDialog
        provider={configProvider}
        state={configProvider ? providerState(configProvider) : undefined}
        open={configProvider !== null}
        onOpenChange={(open) => { if (!open) setConfigProvider(null); }}
        onReconnect={(provider) => void startOAuth(provider)}
      />

      <IntegrationLogsDialog
        provider={logsProvider}
        open={logsProvider !== null}
        onOpenChange={(open) => { if (!open) setLogsProvider(null); }}
      />

      <IntegrationDisconnectDialog
        provider={disconnectProvider}
        pending={disconnectMutation.isPending}
        onConfirm={(provider) => disconnectMutation.mutate(provider)}
        onClose={() => setDisconnectProvider(null)}
      />

      <IntegrationNotConfiguredDialog
        provider={notConfiguredProvider}
        isAdmin={isAdmin}
        onClose={() => setNotConfiguredProvider(null)}
      />
    </div>
  );
}
