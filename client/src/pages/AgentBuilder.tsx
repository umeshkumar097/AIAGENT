import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Save, Loader2, Bot, Settings2, PhoneCall, Globe, Wrench, Calendar, Database, FileText, Webhook, Mic2 } from "lucide-react";

export default function AgentBuilder() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();

  const isNew = id === 'new';

  const { data: agent, isLoading } = useQuery({
    queryKey: ['agent', id],
    queryFn: async () => {
      if (isNew) return null;
      const res = await apiRequest("GET", `/api/agents/${id}`);
      return await res.json();
    },
    enabled: !isNew
  });

  const [formData, setFormData] = useState<any>({
    name: "New Agent",
    systemPrompt: "",
    firstMessage: "",
    language: "en",
    openaiVoice: "alloy",
    llmModel: "gpt-realtime-1.5",
    type: "incoming",
    telephonyProvider: "plivo"
  });

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (isNew) {
        const res = await apiRequest("POST", "/api/agents", data);
        return await res.json();
      } else {
        const res = await apiRequest("PATCH", `/api/agents/${id}`, data);
        return await res.json();
      }
    },
    onSuccess: (savedAgent) => {
      toast({ title: "Agent saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      if (isNew) {
        setLocation(`/app/agents/${savedAgent.id}`);
      }
    },
    onError: (err: any) => {
      toast({ title: "Failed to save agent", description: err.message, variant: "destructive" });
    }
  });

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <header className="h-14 border-b flex items-center justify-between px-4 shrink-0 bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation('/app/agents')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg">Agent Builder</h1>
            <span className="text-muted-foreground text-sm">/ {formData.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Agent
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Core Settings */}
        <div className="w-[35%] flex flex-col border-r bg-background">
          <div className="p-4 border-b flex items-center gap-2 bg-muted/20">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-medium">Core Configuration</h2>
          </div>
          <div className="p-4 overflow-y-auto space-y-6 flex-1">
            <div className="space-y-2">
              <Label>Agent Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="E.g., Sales Assistant"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Welcome Message Mode</Label>
              <Select 
                value={formData.firstMessage ? "agent" : "user"}
                onValueChange={v => {
                  if (v === "user") setFormData({...formData, firstMessage: ""});
                  else setFormData({...formData, firstMessage: "Hello! How can I help you today?"});
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Agent speaks first</SelectItem>
                  <SelectItem value="user">User speaks first</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.firstMessage !== "" && (
              <div className="space-y-2">
                <Label>Agent Welcome Message</Label>
                <Textarea 
                  value={formData.firstMessage}
                  onChange={e => setFormData({...formData, firstMessage: e.target.value})}
                  rows={2}
                />
              </div>
            )}

            <div className="space-y-2 flex-1 flex flex-col">
              <Label>System Prompt</Label>
              <Textarea 
                value={formData.systemPrompt || ""}
                onChange={e => setFormData({...formData, systemPrompt: e.target.value})}
                className="flex-1 min-h-[300px]"
                placeholder="You are a helpful assistant..."
              />
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Functions */}
        <div className="w-[30%] flex flex-col border-r bg-muted/5">
          <div className="p-4 border-b flex items-center gap-2 bg-muted/20">
            <Wrench className="h-5 w-5 text-primary" />
            <h2 className="font-medium">Functions</h2>
          </div>
          <div className="p-4 overflow-y-auto space-y-4 flex-1">
            <Accordion type="multiple" className="w-full">
              
              <AccordionItem value="calendars">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Calendars & Appointments
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-normal">Enable Appointment Booking</Label>
                    <Switch 
                      checked={formData.appointmentBookingEnabled}
                      onCheckedChange={(v) => setFormData({...formData, appointmentBookingEnabled: v})}
                    />
                  </div>
                  {formData.appointmentBookingEnabled && (
                    <p className="text-xs text-muted-foreground mt-2">Connects to your system calendars to schedule meetings during the call.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="knowledge">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Knowledge Base
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <p className="text-xs text-muted-foreground">Select documents for the agent to reference.</p>
                  {/* Select would go here */}
                  <Button variant="outline" size="sm" className="w-full mt-2">Manage Documents</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="webhooks">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Webhook className="w-4 h-4 text-muted-foreground" />
                    Webhook Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Post-Call Webhook URL</Label>
                    <Input 
                      placeholder="https://..." 
                      value={formData.postCallWebhookUrl || ""}
                      onChange={(e) => setFormData({...formData, postCallWebhookUrl: e.target.value})}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="speech">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mic2 className="w-4 h-4 text-muted-foreground" />
                    Speech Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Language Detection</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-detect Language</span>
                      <Switch 
                        checked={formData.detectLanguageEnabled}
                        onCheckedChange={(v) => setFormData({...formData, detectLanguageEnabled: v})}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>

        {/* RIGHT COLUMN: Testing */}
        <div className="w-[35%] flex flex-col bg-background">
          <div className="p-4 border-b flex items-center gap-2 bg-muted/20">
            <Settings2 className="h-5 w-5 text-primary" />
            <h2 className="font-medium">Test Agent</h2>
          </div>
          <div className="flex-1 flex flex-col p-4">
            <Tabs defaultValue="phone" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone"><PhoneCall className="w-4 h-4 mr-2"/> Phone Call</TabsTrigger>
                <TabsTrigger value="web"><Globe className="w-4 h-4 mr-2"/> Web Call</TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone" className="flex-1 pt-4">
                <Card className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>From Number (System)</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a purchased number" />
                      </SelectTrigger>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>To Number</Label>
                    <Input placeholder="+91..." />
                  </div>
                  <Button className="w-full mt-4" size="lg">Start Phone Call</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="web" className="flex-1 pt-4">
                <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <Globe className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">WebRTC Testing</h3>
                    <p className="text-sm text-muted-foreground">Test directly from your browser mic.</p>
                  </div>
                  <Button variant="outline">Initialize Web Call</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  );
}
