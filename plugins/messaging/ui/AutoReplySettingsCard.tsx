import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Copy, Loader2, RefreshCw, Save } from "lucide-react";

/**
 * "Auto-reply with agent" — account-level default for new WhatsApp conversations plus the
 * per-user Waki inbound webhook URL. Rendered inside the Messaging → WhatsApp settings tab.
 */

const apiRequest = (typeof window !== "undefined" && (window as any).apiRequest)
  ? (window as any).apiRequest
  : (async (method: string, url: string, data?: any) => {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res;
  });

function toast(props: { title: string; description?: string; variant?: string }) {
  const globalToast = typeof window !== "undefined" ? (window as any).__AGENTLABS_TOAST__ : null;
  if (globalToast) return globalToast(props);
  console.warn("[Messaging Plugin] Toast not available", props.title);
}

interface AutoReplySettings {
  defaultWhatsappAgentId: string | null;
  whatsappAutoReplyDefault: boolean;
  webhookUrl: string;
}

interface AgentOption {
  id: string;
  name: string;
}

const NONE = "__none__";

async function readJson(res: any) {
  const json = await res.json();
  if (json && json.success === false) throw new Error(json.error || "Request failed");
  return json?.data ?? json;
}

export default function AutoReplySettingsCard() {
  const queryClient = useQueryClient();
  const [agentId, setAgentId] = useState<string>(NONE);
  const [enabled, setEnabled] = useState(false);

  const { data: settings, isLoading } = useQuery<AutoReplySettings>({
    queryKey: ["/api/messaging/auto-reply/settings"],
    queryFn: async () => readJson(await apiRequest("GET", "/api/messaging/auto-reply/settings")),
  });

  const { data: agents = [] } = useQuery<AgentOption[]>({
    queryKey: ["/api/agents"],
    select: (res: any) => {
      const list = res?.data || res || [];
      return Array.isArray(list) ? list.map((a: any) => ({ id: a.id, name: a.name })) : [];
    },
  });

  useEffect(() => {
    if (!settings) return;
    setAgentId(settings.defaultWhatsappAgentId || NONE);
    setEnabled(Boolean(settings.whatsappAutoReplyDefault));
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => readJson(await apiRequest("PUT", "/api/messaging/auto-reply/settings", {
      defaultWhatsappAgentId: agentId === NONE ? null : agentId,
      whatsappAutoReplyDefault: enabled,
    })),
    onSuccess: () => {
      toast({ title: "Auto-reply settings saved" });
      queryClient.invalidateQueries({ queryKey: ["/api/messaging/auto-reply/settings"] });
    },
    onError: (err: any) => toast({ title: "Could not save", description: err.message, variant: "destructive" }),
  });

  const regenerateMutation = useMutation({
    mutationFn: async () => readJson(await apiRequest("POST", "/api/messaging/auto-reply/regenerate-secret")),
    onSuccess: () => {
      toast({ title: "Webhook URL regenerated", description: "Update the URL in Waki — the old one stops working now." });
      queryClient.invalidateQueries({ queryKey: ["/api/messaging/auto-reply/settings"] });
    },
    onError: (err: any) => toast({ title: "Could not regenerate", description: err.message, variant: "destructive" }),
  });

  const copyUrl = async () => {
    if (!settings?.webhookUrl) return;
    try {
      await navigator.clipboard.writeText(settings.webhookUrl);
      toast({ title: "Webhook URL copied" });
    } catch {
      toast({ title: "Copy failed", description: "Select the URL and copy it manually.", variant: "destructive" });
    }
  };

  const dirty = !!settings && (
    (settings.defaultWhatsappAgentId || NONE) !== agentId || Boolean(settings.whatsappAutoReplyDefault) !== enabled
  );

  return (
    <Card data-testid="card-whatsapp-auto-reply">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Auto-reply with agent
        </CardTitle>
        <CardDescription>
          New WhatsApp chats are answered by this agent in chat (short replies, your knowledge base, human handoff when
          the customer asks for a person). You can still switch auto-reply on or off per conversation in the inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="space-y-2">
                <Label htmlFor="autoReplyAgent">Agent</Label>
                <Select value={agentId} onValueChange={setAgentId}>
                  <SelectTrigger id="autoReplyAgent" data-testid="select-auto-reply-agent">
                    <SelectValue placeholder="Choose an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>No agent</SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pb-1">
                <Switch
                  id="autoReplyDefault"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  disabled={agentId === NONE}
                  data-testid="switch-auto-reply-default"
                />
                <Label htmlFor="autoReplyDefault">Auto-reply on new chats</Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => saveMutation.mutate()}
                disabled={!dirty || saveMutation.isPending || (enabled && agentId === NONE)}
                data-testid="button-save-auto-reply"
              >
                {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label htmlFor="wakiWebhookUrl">Waki inbound webhook URL</Label>
              <div className="flex gap-2">
                <Input id="wakiWebhookUrl" readOnly value={settings?.webhookUrl || ""} data-testid="input-waki-webhook-url" />
                <Button variant="outline" size="icon" onClick={copyUrl} title="Copy" data-testid="button-copy-waki-webhook">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => regenerateMutation.mutate()}
                  disabled={regenerateMutation.isPending}
                  title="Regenerate"
                  data-testid="button-regenerate-waki-webhook"
                >
                  <RefreshCw className={`w-4 h-4 ${regenerateMutation.isPending ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste this URL in app.waki.in → Settings → Webhooks for the event <code>message.received</code>. Incoming
                chats then show up in Conversations and, when auto-reply is on, the agent answers within the 24-hour
                session window. The URL contains your secret — treat it like a password.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
