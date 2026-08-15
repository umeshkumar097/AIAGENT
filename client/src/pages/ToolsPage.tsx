import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calendar, Webhook, Globe, Key, Users, Mail, ContactRound, Link as LinkIcon, TableProperties, ExternalLink, Unlink, Loader2 } from "lucide-react";
import { usePluginStatus } from "@/hooks/use-plugin-status";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { IntegrationCard } from "@/components/dashboard/IntegrationCard";
import { MessageSquare, Calendar as CalendarIcon, Workflow, Database, Cable } from "lucide-react";
import { SiZapier, SiZoho, SiGooglesheets } from "react-icons/si";

// SiSalesforce removed from react-icons v5 — using inline SVG
const SiSalesforce = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.815 18.235c-.32.169-.684.265-1.07.265-1.29 0-2.337-1.048-2.337-2.337 0-.483.147-.932.4-1.305a3.984 3.984 0 01-1.4.255C3.762 15.113 2.5 13.851 2.5 12.3a2.815 2.815 0 012.315-2.773 2.516 2.516 0 01-.19-.965c0-1.394 1.131-2.525 2.525-2.525.304 0 .594.054.864.152A2.975 2.975 0 0110.8 4.5a2.977 2.977 0 012.894 2.27 2.526 2.526 0 011.281-.348c1.394 0 2.525 1.131 2.525 2.525 0 .13-.01.257-.028.382.066-.003.133-.005.2-.005A2.83 2.83 0 0120.5 12.15a2.83 2.83 0 01-2.828 2.828 2.81 2.81 0 01-.823-.123 2.097 2.097 0 01-1.879 1.168 2.09 2.09 0 01-.907-.206 2.386 2.386 0 01-2.312 1.8 2.382 2.382 0 01-1.936-.99z"/>
  </svg>
);

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
  const { isPluginEnabled, isLoading } = usePluginStatus();
  const { toast } = useToast();

  const [connecting, setConnecting] = useState<string | null>(null);

  const { data: googleStatus } = useQuery<{ connected: boolean; email?: string }>({
    queryKey: ["/api/integrations/google/status"],
    retry: false,
  });

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

  const handleConnectPlaceholder = (name: string) => {
    setConnecting(name);
    setTimeout(() => {
      toast({ title: `${name} Integration`, description: "This integration is coming soon in a future update." });
      setConnecting(null);
    }, 1000);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleConnected = params.get("google_connected");
    const googleError = params.get("google_error");
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
    }
  }, []);

  const visibleTools = allTools.filter((tool) => {
    if (!tool.pluginRequired) return true;
    return isPluginEnabled?.(tool.pluginRequired) ?? false;
  });

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
          <IntegrationCard 
            id="gohighlevel"
            title="GoHighLevel"
            category="CRM & Marketing Automation"
            description="Manage CRM contacts, sync calendars, and automate appointments with GHL."
            icon={<Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            iconBg="bg-blue-500/10 dark:bg-blue-500/20"
            isConnected={false}
            isConnecting={connecting === "GoHighLevel"}
            onConnect={() => handleConnectPlaceholder("GoHighLevel")}
          />
          <IntegrationCard 
            id="salesforce"
            title="Salesforce"
            category="CRM"
            description="Sync contacts, deals, and appointments with your Salesforce org via OAuth."
            icon={<SiSalesforce className="w-6 h-6 text-sky-500 dark:text-sky-400" />}
            iconBg="bg-sky-500/10 dark:bg-sky-500/20"
            isConnected={false}
            isConnecting={connecting === "Salesforce"}
            onConnect={() => handleConnectPlaceholder("Salesforce")}
          />
          <IntegrationCard 
            id="calcom"
            title="Cal.com"
            category="Scheduling & Booking"
            description="Sync booking pages and let agents handle appointment scheduling directly."
            icon={<CalendarIcon className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />}
            iconBg="bg-zinc-500/10 dark:bg-zinc-500/20"
            isConnected={false}
            isConnecting={connecting === "Cal.com"}
            onConnect={() => handleConnectPlaceholder("Cal.com")}
          />
          <IntegrationCard 
            id="zapier"
            title="Zapier"
            category="Automation"
            description="Connect your AI agents to 5000+ apps through Zapier webhooks and triggers."
            icon={<SiZapier className="w-6 h-6 text-orange-500 dark:text-orange-400" />}
            iconBg="bg-orange-500/10 dark:bg-orange-500/20"
            isConnected={false}
            isConnecting={connecting === "Zapier"}
            onConnect={() => handleConnectPlaceholder("Zapier")}
          />
          <IntegrationCard 
            id="pabbly"
            title="Pabbly Connect"
            category="Automation"
            description="Create custom workflows and automate tasks without any coding."
            icon={<Cable className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            iconBg="bg-emerald-500/10 dark:bg-emerald-500/20"
            isConnected={false}
            isConnecting={connecting === "Pabbly Connect"}
            onConnect={() => handleConnectPlaceholder("Pabbly Connect")}
          />
          <IntegrationCard 
            id="zoho"
            title="Zoho CRM"
            category="CRM"
            description="Sync your leads and contacts with Zoho CRM for better pipeline management."
            icon={<SiZoho className="w-6 h-6 text-red-500 dark:text-red-400" />}
            iconBg="bg-red-500/10 dark:bg-red-500/20"
            isConnected={false}
            isConnecting={connecting === "Zoho CRM"}
            onConnect={() => handleConnectPlaceholder("Zoho CRM")}
          />
        </div>
      </div>
    </div>
  );
}
