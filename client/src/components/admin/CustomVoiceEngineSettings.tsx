import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Key, Server, Sliders, Mic, Play, Eye, EyeOff, Save, Loader2, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FreeSwitchNode {
  id: string;
  name: string;
  esl_host: string;
  esl_port: number;
  sip_host: string;
  sip_port: number;
  ws_port: number;
  max_calls: number;
  status: string;
  created_at: string;
}

interface ProviderKeysResponse {
  stt: {
    activeProvider: string;
    allowedProviders: string[];
    defaultModel: string;
    deepgramModel: string;
    deepgramAllowedModels: string[];
    sarvamModel: string;
    sarvamAllowedModels: string[];
    providers: Record<string, { name: string; hasKey: boolean; maskedKey: string }>;
  };
  llm: {
    activeProvider: string;
    defaultModel: string;
    allowedModels: string[];
    providers: Record<string, { name: string; hasKey: boolean; maskedKey: string }>;
  };
  tts: {
    activeProvider: string;
    allowedProviders: string[];
    defaultModel: string;
    deepgramModel: string;
    deepgramAllowedModels: string[];
    sarvamModel: string;
    sarvamAllowedModels: string[];
    sarvamSpeaker: string;
    providers: Record<string, { name: string; hasKey: boolean; maskedKey: string }>;
  };
  freeswitch: {
    eslHost: string;
    eslPort: number;
    eslPassword?: string;
  };
  pluginEnabled: boolean;
}

export default function CustomVoiceEngineSettings() {
  const [activeTab, setActiveTab] = useState("providers");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Custom Voice Engine Settings
          </CardTitle>
          <CardDescription>
            Configure STT, TTS, LLM providers and FreeSWITCH cluster settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="providers">
                <Key className="h-4 w-4 mr-2" />
                API Credentials
              </TabsTrigger>
              <TabsTrigger value="pipelines">
                <Sliders className="h-4 w-4 mr-2" />
                Voice Pipeline Configuration
              </TabsTrigger>
              <TabsTrigger value="nodes">
                <Server className="h-4 w-4 mr-2" />
                FreeSWITCH Nodes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="providers" className="mt-6">
              <ProvidersSection />
            </TabsContent>

            <TabsContent value="pipelines" className="mt-6">
              <PipelinesSection />
            </TabsContent>

            <TabsContent value="nodes" className="mt-6">
              <NodesSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ProvidersSection() {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testingProviders, setTestingProviders] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, { connected: boolean; details: string }>>({});

  const { data: keysData, isLoading } = useQuery<{ success: boolean; data: ProviderKeysResponse }>({
    queryKey: ["/api/voice-engine/admin/provider-keys"],
  });

  const updateKeysMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiRequest("PUT", "/api/voice-engine/admin/provider-keys", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/voice-engine/admin/provider-keys"] });
      toast({ title: "Settings updated successfully" });
    },
    onError: (err: any) => {
      toast({ title: "Failed to update keys", description: err.message, variant: "destructive" });
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const data = keysData?.data;

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTestProvider = async (provider: string) => {
    setTestingProviders(prev => ({ ...prev, [provider]: true }));
    try {
      const res = await apiRequest("POST", `/api/voice-engine/admin/provider-keys/test/${provider}`);
      const json = await res.json();
      if (json.success && json.data) {
        setTestResults(prev => ({
          ...prev,
          [provider]: {
            connected: json.data.connected,
            details: json.data.details || (json.data.connected ? "Connection active" : "Connection failed"),
          }
        }));
        if (json.data.connected) {
          toast({ title: `${provider.toUpperCase()} Connected`, description: json.data.details || "API key verified successfully" });
        } else {
          toast({ title: `${provider.toUpperCase()} Connection Failed`, description: json.data.details || "API key rejected by provider", variant: "destructive" });
        }
      } else {
        throw new Error(json.error || "Server returned empty test response");
      }
    } catch (err: any) {
      toast({ title: "Test Failed", description: err.message, variant: "destructive" });
    } finally {
      setTestingProviders(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handleSaveKeys = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: any = {};
    
    const deepgram = formData.get("deepgramApiKey") as string;
    const sarvam = formData.get("sarvamApiKey") as string;
    const openrouter = formData.get("openrouterApiKey") as string;

    if (deepgram && !deepgram.startsWith("•")) payload.deepgramApiKey = deepgram;
    if (sarvam && !sarvam.startsWith("•")) payload.sarvamApiKey = sarvam;
    if (openrouter && !openrouter.startsWith("•")) payload.openrouterApiKey = openrouter;

    updateKeysMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSaveKeys} className="space-y-6">
      <div className="space-y-6">
        {/* Deepgram */}
        <div className="space-y-2 border p-4 rounded-lg bg-muted/10">
          <div className="flex justify-between items-center">
            <Label htmlFor="dg-key" className="font-semibold">Deepgram API Key</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={testingProviders["deepgram"]}
              onClick={() => handleTestProvider("deepgram")}
            >
              {testingProviders["deepgram"] ? <Loader2 className="h-3 w-3 mr-2 animate-spin" /> : "Test Key"}
            </Button>
          </div>
          <div className="relative">
            <Input
              id="dg-key"
              name="deepgramApiKey"
              type={showKeys["deepgram"] ? "text" : "password"}
              defaultValue={data?.stt.providers.deepgram.maskedKey || ""}
              placeholder="Enter Deepgram token API key..."
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => toggleShowKey("deepgram")}
            >
              {showKeys["deepgram"] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {testResults["deepgram"] && (
            <p className={`text-xs mt-1 font-medium ${testResults["deepgram"].connected ? "text-green-600" : "text-red-500"}`}>
              {testResults["deepgram"].connected ? "✓" : "✗"} {testResults["deepgram"].details}
            </p>
          )}
        </div>

        {/* Sarvam */}
        <div className="space-y-2 border p-4 rounded-lg bg-muted/10">
          <div className="flex justify-between items-center">
            <Label htmlFor="sarvam-key" className="font-semibold">Sarvam AI API Key</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={testingProviders["sarvam"]}
              onClick={() => handleTestProvider("sarvam")}
            >
              {testingProviders["sarvam"] ? <Loader2 className="h-3 w-3 mr-2 animate-spin" /> : "Test Key"}
            </Button>
          </div>
          <div className="relative">
            <Input
              id="sarvam-key"
              name="sarvamApiKey"
              type={showKeys["sarvam"] ? "text" : "password"}
              defaultValue={data?.stt.providers.sarvam.maskedKey || ""}
              placeholder="Enter Sarvam AI API key..."
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => toggleShowKey("sarvam")}
            >
              {showKeys["sarvam"] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {testResults["sarvam"] && (
            <p className={`text-xs mt-1 font-medium ${testResults["sarvam"].connected ? "text-green-600" : "text-red-500"}`}>
              {testResults["sarvam"].connected ? "✓" : "✗"} {testResults["sarvam"].details}
            </p>
          )}
        </div>

        {/* OpenRouter */}
        <div className="space-y-2 border p-4 rounded-lg bg-muted/10">
          <div className="flex justify-between items-center">
            <Label htmlFor="openrouter-key" className="font-semibold">OpenRouter API Key</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={testingProviders["openrouter"]}
              onClick={() => handleTestProvider("openrouter")}
            >
              {testingProviders["openrouter"] ? <Loader2 className="h-3 w-3 mr-2 animate-spin" /> : "Test Key"}
            </Button>
          </div>
          <div className="relative">
            <Input
              id="openrouter-key"
              name="openrouterApiKey"
              type={showKeys["openrouter"] ? "text" : "password"}
              defaultValue={data?.llm.providers.openrouter.maskedKey || ""}
              placeholder="Enter OpenRouter API key..."
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => toggleShowKey("openrouter")}
            >
              {showKeys["openrouter"] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {testResults["openrouter"] && (
            <p className={`text-xs mt-1 font-medium ${testResults["openrouter"].connected ? "text-green-600" : "text-red-500"}`}>
              {testResults["openrouter"].connected ? "✓" : "✗"} {testResults["openrouter"].details}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={updateKeysMutation.isPending}>
          {updateKeysMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Save className="h-4 w-4 mr-2" />
          Save API Keys
        </Button>
      </div>
    </form>
  );
}

function PipelinesSection() {
  const { toast } = useToast();

  const { data: keysData, isLoading } = useQuery<{ success: boolean; data: ProviderKeysResponse }>({
    queryKey: ["/api/voice-engine/admin/provider-keys"],
  });

  const updatePipelineMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiRequest("PUT", "/api/voice-engine/admin/provider-keys", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/voice-engine/admin/provider-keys"] });
      toast({ title: "Pipeline configuration updated" });
    },
    onError: (err: any) => {
      toast({ title: "Failed to update configuration", description: err.message, variant: "destructive" });
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const data = keysData?.data;

  const handleSavePipeline = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      sttActiveProvider: formData.get("sttActiveProvider"),
      ttsActiveProvider: formData.get("ttsActiveProvider"),
      llmActiveProvider: formData.get("llmActiveProvider"),
      llmDefaultModel: formData.get("llmDefaultModel"),
      sttDeepgramModel: formData.get("sttDeepgramModel"),
      sttSarvamModel: formData.get("sttSarvamModel"),
      ttsDeepgramModel: formData.get("ttsDeepgramModel"),
      ttsSarvamModel: formData.get("ttsSarvamModel"),
      ttsSarvamSpeaker: formData.get("ttsSarvamSpeaker"),
      pluginEnabled: formData.get("pluginEnabled") === "true",
    };

    updatePipelineMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSavePipeline} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* STT Config */}
        <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Mic className="h-5 w-5 text-orange-500" />
            Speech-To-Text (STT)
          </h3>
          <div className="space-y-2">
            <Label>Active Provider</Label>
            <Select name="sttActiveProvider" defaultValue={data?.stt.activeProvider || "deepgram"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepgram">Deepgram</SelectItem>
                <SelectItem value="sarvam">Sarvam AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Deepgram Default Model</Label>
            <Select name="sttDeepgramModel" defaultValue={data?.stt.deepgramModel || "nova-2"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nova-2">Nova-2 (General)</SelectItem>
                <SelectItem value="nova-2-phonecall">Nova-2 Phonecall</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sarvam Default Model</Label>
            <Select name="sttSarvamModel" defaultValue={data?.stt.sarvamModel || "saaras:v3"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saaras:v3">Saaras V3 (Hinglish/Indian)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TTS Config */}
        <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Play className="h-5 w-5 text-green-500" />
            Text-To-Speech (TTS)
          </h3>
          <div className="space-y-2">
            <Label>Active Provider</Label>
            <Select name="ttsActiveProvider" defaultValue={data?.tts.activeProvider || "deepgram"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepgram">Deepgram</SelectItem>
                <SelectItem value="sarvam">Sarvam AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Deepgram Voice Model</Label>
            <Select name="ttsDeepgramModel" defaultValue={data?.tts.deepgramModel || "aura-asteria-en"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aura-asteria-en">Asteria (Female - US)</SelectItem>
                <SelectItem value="aura-luna-en">Luna (Female - US)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sarvam Voice Model</Label>
            <Select name="ttsSarvamModel" defaultValue={data?.tts.sarvamModel || "bulbul:v3"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bulbul:v3">Bulbul V3 (Indian Voices)</SelectItem>
                <SelectItem value="bulbul:v2">Bulbul V2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sarvam Speaker Character</Label>
            <Select name="ttsSarvamSpeaker" defaultValue={data?.tts.sarvamSpeaker || "neha"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neha">Neha (Female)</SelectItem>
                <SelectItem value="arvind">Arvind (Male)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* LLM Routing Config */}
        <div className="space-y-4 border p-4 rounded-lg bg-muted/20 md:col-span-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Play className="h-5 w-5 text-indigo-500" />
            LLM Router Integration (OpenRouter)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Active LLM Gateway</Label>
              <Select name="llmActiveProvider" defaultValue={data?.llm.activeProvider || "openrouter"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openrouter">OpenRouter Gateway</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default LLM Model Path</Label>
              <Select name="llmDefaultModel" defaultValue={data?.llm.defaultModel || "openai/gpt-4o-mini"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai/gpt-4o-mini">GPT-4o Mini (OpenAI)</SelectItem>
                  <SelectItem value="anthropic/claude-3-haiku">Claude 3 Haiku (Anthropic)</SelectItem>
                  <SelectItem value="google/gemini-flash-1.5">Gemini 1.5 Flash (Google)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={updatePipelineMutation.isPending}>
          {updatePipelineMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Save className="h-4 w-4 mr-2" />
          Save Config Pipeline
        </Button>
      </div>
    </form>
  );
}

function NodesSection() {
  const { toast } = useToast();
  const [nodeDialogOpen, setNodeDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<FreeSwitchNode | null>(null);

  const { data: nodesResponse, isLoading } = useQuery<{ success: boolean; data: any }>({
    queryKey: ["/api/voice-engine/admin/settings/nodes"],
  });

  const nodes: FreeSwitchNode[] = nodesResponse?.data || [];

  const addNodeMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiRequest("POST", "/api/voice-engine/admin/settings/nodes", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/voice-engine/admin/settings/nodes"] });
      setNodeDialogOpen(false);
      toast({ title: "FreeSWITCH node added successfully" });
    },
    onError: (err: any) => {
      toast({ title: "Failed to add node", description: err.message, variant: "destructive" });
    }
  });

  const deleteNodeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/voice-engine/admin/settings/nodes/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/voice-engine/admin/settings/nodes"] });
      toast({ title: "FreeSWITCH node deleted" });
    },
    onError: (err: any) => {
      toast({ title: "Failed to delete node", description: err.message, variant: "destructive" });
    }
  });

  const handleAddNode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      eslHost: formData.get("eslHost"),
      eslPort: parseInt(formData.get("eslPort") as string),
      eslPassword: formData.get("eslPassword") || "ClueCon",
      sipHost: formData.get("sipHost"),
      sipPort: parseInt(formData.get("sipPort") as string),
      wsPort: parseInt(formData.get("wsPort") as string),
      maxCalls: parseInt(formData.get("maxCalls") as string) || 100,
    };
    addNodeMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Cluster Nodes</h3>
          <p className="text-sm text-muted-foreground">Manage your FreeSWITCH cluster nodes for streaming media calls.</p>
        </div>
        <Button onClick={() => setNodeDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Node
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Node Name</TableHead>
              <TableHead>ESL Address</TableHead>
              <TableHead>SIP Interface</TableHead>
              <TableHead>WS Port</TableHead>
              <TableHead>Max Calls</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No FreeSWITCH nodes added yet. Add one to handle streaming calls.
                </TableCell>
              </TableRow>
            ) : (
              nodes.map(node => (
                <TableRow key={node.id}>
                  <TableCell className="font-medium">{node.name}</TableCell>
                  <TableCell>{node.esl_host}:{node.esl_port}</TableCell>
                  <TableCell>{node.sip_host}:{node.sip_port}</TableCell>
                  <TableCell>{node.ws_port}</TableCell>
                  <TableCell>{node.max_calls}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      node.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {node.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => deleteNodeMutation.mutate(node.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={nodeDialogOpen} onOpenChange={setNodeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add FreeSWITCH Cluster Node</DialogTitle>
            <DialogDescription>
              Input parameters of the FreeSWITCH host virtual machine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddNode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-name">Node Name</Label>
              <Input id="node-name" name="name" required placeholder="e.g. Asia-Pacific-Node-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="esl-host">ESL Host Address</Label>
                <Input id="esl-host" name="eslHost" required placeholder="127.0.0.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="esl-port">ESL Port</Label>
                <Input id="esl-port" name="eslPort" type="number" required defaultValue="8021" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="esl-pass">ESL Password</Label>
              <Input id="esl-pass" name="eslPassword" type="password" defaultValue="ClueCon" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sip-host">SIP Host Address</Label>
                <Input id="sip-host" name="sipHost" required placeholder="127.0.0.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip-port">SIP Port</Label>
                <Input id="sip-port" name="sipPort" type="number" required defaultValue="5060" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ws-port">WS Port</Label>
                <Input id="ws-port" name="wsPort" type="number" required defaultValue="8089" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-calls">Max Concurrency Limit</Label>
                <Input id="max-calls" name="maxCalls" type="number" defaultValue="100" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={addNodeMutation.isPending}>
                {addNodeMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add Node
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
