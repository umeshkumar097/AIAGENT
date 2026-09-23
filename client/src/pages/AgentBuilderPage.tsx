/**
 * Agent Builder — dedicated page for creating / editing Plivo agents.
 * One agent works for both incoming calls (attach a number) and campaigns.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Bot, Check, Loader2, Mail, Megaphone, MessageSquare, PhoneIncoming } from "lucide-react";
import EngineVoiceSection, { type ChatModel, type OpenAIVoice, type SarvamVoice } from "@/components/agent-builder/EngineVoiceSection";
import PromptSection from "@/components/agent-builder/PromptSection";
import ToolsSection, { type KnowledgeItem } from "@/components/agent-builder/ToolsSection";
import PhoneSection, { type AvailableNumber, type CurrentConnection } from "@/components/agent-builder/PhoneSection";
import MessagingSection from "@/components/agent-builder/MessagingSection";
import { usePluginStatus } from "@/hooks/use-plugin-status";
import { enabledActionLabels } from "@/components/agent-builder/actions";
import {
  DEFAULT_OPENAI_VOICE, DEFAULT_REALTIME_MODEL, SARVAM_LANGUAGES,
  defaultForm, formFromAgent, toAgentPayload, validateForm,
  type AgentBuilderForm, type BuilderAgent,
} from "@/components/agent-builder/types";

interface VoiceEngineSettings { plivo_openai_engine_enabled: boolean; sarvam_engine_enabled?: boolean }
interface ConnectionsResponse {
  connections: Array<{ phoneNumberId: string; phoneNumber: string; friendlyName: string | null; agent: { id: string } | null }>;
  availablePhoneNumbers: AvailableNumber[];
}

const BUILDER_ENGINES = ['plivo', 'sarvam-plivo'];

export default function AgentBuilderPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<AgentBuilderForm>(defaultForm);
  const onChange = (patch: Partial<AgentBuilderForm>) => setForm(prev => ({ ...prev, ...patch }));
  const hydrated = useRef(false);

  // ── Data ────────────────────────────────────────────────────────────────
  const { data: settings } = useQuery<VoiceEngineSettings>({ queryKey: ["/api/settings/voice-engine"], staleTime: 60000 });
  const { data: sarvamRes } = useQuery<{ voices: SarvamVoice[] }>({ queryKey: ["/api/sarvam/voices"], staleTime: 300000 });
  const { data: openaiRes } = useQuery<{ voices: OpenAIVoice[] }>({ queryKey: ["/api/plivo/openai/voices"], staleTime: 300000 });
  const { data: realtimeRes } = useQuery<{ models: string[] }>({ queryKey: ["/api/plivo/openai/models"], staleTime: 300000 });
  const { data: chatModels = [] } = useQuery<ChatModel[]>({ queryKey: ["/api/llm-models/available"], staleTime: 300000 });
  const { data: knowledgeBase = [] } = useQuery<KnowledgeItem[]>({ queryKey: ["/api/rag-knowledge"] });
  const { data: connections, isLoading: numbersLoading, error: connectionsError } = useQuery<ConnectionsResponse>({ queryKey: ["/api/plivo/incoming-connections"] });
  const { isEnabled: messagingPluginEnabled } = usePluginStatus('messaging') as { isEnabled: boolean };
  // Key parts join into the URL (/api/agents/<id>) and stay under the "/api/agents" prefix for invalidation
  const { data: agentRaw, isLoading: agentLoading, error: agentError } = useQuery<BuilderAgent | { agent: BuilderAgent }>({
    queryKey: ["/api/agents", id],
    enabled: isEdit,
  });
  const agent: BuilderAgent | undefined = agentRaw ? ((agentRaw as { agent?: BuilderAgent }).agent ?? (agentRaw as BuilderAgent)) : undefined;

  const plivoEnabled = settings?.plivo_openai_engine_enabled ?? false;
  const sarvamEnabled = settings?.sarvam_engine_enabled ?? false;
  const anyEngine = plivoEnabled || sarvamEnabled;

  const current: CurrentConnection | null = useMemo(() => {
    if (!isEdit || !connections) return null;
    const c = connections.connections.find(x => x.agent?.id === id);
    return c ? { phoneNumberId: c.phoneNumberId, phoneNumber: c.phoneNumber, friendlyName: c.friendlyName } : null;
  }, [connections, id, isEdit]);

  // Hydrate the form from the agent alone (the number list may fail or arrive later)
  useEffect(() => {
    if (!isEdit || hydrated.current || !agent) return;
    hydrated.current = true;
    setForm(formFromAgent(agent, ''));
  }, [isEdit, agent]);
  const phoneHydrated = useRef(false);
  useEffect(() => {
    if (!isEdit || !hydrated.current || phoneHydrated.current || !connections) return;
    phoneHydrated.current = true;
    if (current) setForm(prev => (prev.phoneNumberId ? prev : { ...prev, phoneNumberId: current.phoneNumberId }));
  }, [isEdit, connections, current]);

  // If Sarvam is off but Plivo+OpenAI is on, start there (create mode only)
  useEffect(() => {
    if (isEdit || hydrated.current || !settings) return;
    hydrated.current = true;
    if (!sarvamEnabled && plivoEnabled) {
      setForm(prev => ({ ...prev, engine: 'plivo', voice: DEFAULT_OPENAI_VOICE, model: DEFAULT_REALTIME_MODEL, language: 'en', engineAuto: true }));
    }
  }, [isEdit, settings, sarvamEnabled, plivoEnabled]);

  const unsupportedAgent = isEdit && agent && !BUILDER_ENGINES.includes(agent.telephonyProvider || '');
  const validationKey = validateForm(form);
  const validationMsg = validationKey && {
    nameRequired: t('agentBuilder.errors.nameRequired', 'Give the agent a name.'),
    promptRequired: t('agentBuilder.errors.promptRequired', 'Write the instructions first.'),
    transferNumberRequired: t('agentBuilder.errors.transferNumberRequired', 'Add the transfer phone number.'),
    appointmentHoursInvalid: t('agentBuilder.errors.appointmentHoursInvalid', 'Appointment working hours: the end time must be after the start.'),
    appointmentDaysRequired: t('agentBuilder.errors.appointmentDaysRequired', 'Pick at least one working day for appointments.'),
    leadFieldKeyRequired: t('agentBuilder.errors.leadFieldKeyRequired', 'Every lead field needs a key.'),
  }[validationKey];

  // ── Save ────────────────────────────────────────────────────────────────
  const save = useMutation({
    mutationFn: async () => {
      const { type, ...rest } = toAgentPayload(form);
      // The API refuses a type on PATCH ("Cannot change agent type"); it is only needed on create
      const res = isEdit
        ? await apiRequest("PATCH", `/api/agents/${id}`, rest)
        : await apiRequest("POST", "/api/agents", { type, ...rest });
      const saved = await res.json();
      const agentId: string = saved?.id ?? saved?.agent?.id ?? id;
      if (!agentId) throw new Error('Agent was saved but no id was returned');

      // The agent is saved at this point — a number problem must not look like a failed save
      let phoneError: string | null = null;
      const prevNumber = current?.phoneNumberId || '';
      if (form.phoneNumberId !== prevNumber) {
        try {
          if (form.phoneNumberId) {
            await apiRequest("POST", "/api/plivo/incoming-connections", { phoneNumberId: form.phoneNumberId, agentId });
            if (prevNumber) await apiRequest("DELETE", `/api/plivo/incoming-connections/${prevNumber}`);
          } else if (prevNumber) {
            await apiRequest("DELETE", `/api/plivo/incoming-connections/${prevNumber}`);
          }
        } catch (e: any) {
          phoneError = e?.message || 'Could not attach the number';
        }
      }
      return { agentId, phoneError };
    },
    onSuccess: ({ agentId, phoneError }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/plivo/incoming-connections"] });
      if (phoneError) {
        toast({
          title: t('agentBuilder.savedNoNumberTitle', 'Agent saved — number not attached'),
          description: phoneError,
          variant: 'destructive',
        });
        navigate(`/app/agents/${agentId}/edit`);
        return;
      }
      toast({
        title: isEdit ? t('agentBuilder.savedTitle', 'Agent updated') : t('agentBuilder.createdTitle', 'Agent created'),
        description: form.phoneNumberId
          ? t('agentBuilder.createdWithNumber', 'It will answer calls on the attached number and is available for campaigns.')
          : t('agentBuilder.createdNoNumber', 'It is available for campaigns. Attach a number any time to take incoming calls.'),
      });
      navigate('/app/agents');
    },
    onError: (e: Error) => {
      toast({ title: t('agentBuilder.saveFailed', 'Could not save agent'), description: e.message, variant: 'destructive' });
    },
  });

  // ── Render ──────────────────────────────────────────────────────────────
  if (isEdit && agentLoading) {
    return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-64 w-full" /></div>;
  }
  if (isEdit && (agentError || !agent)) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t('agentBuilder.notFound', 'Agent not found.')}{' '}
          <Link href="/app/agents" className="underline">{t('agentBuilder.backToAgents', 'Back to agents')}</Link>
        </AlertDescription>
      </Alert>
    );
  }
  if (unsupportedAgent) {
    return (
      <Alert>
        <AlertDescription>
          {t('agentBuilder.legacyEngine', 'This agent uses a non-Plivo engine. Edit it from the Agents page.')}{' '}
          <Link href="/app/agents" className="underline">{t('agentBuilder.backToAgents', 'Back to agents')}</Link>
        </AlertDescription>
      </Alert>
    );
  }

  const languageLabel = SARVAM_LANGUAGES.find(l => l.code === form.language)?.label || form.language;
  const voiceLabel = form.engine === 'sarvam-plivo'
    ? sarvamRes?.voices.find(v => v.id === form.voice)?.name || form.voice
    : openaiRes?.voices.find(v => v.id === form.voice)?.name || form.voice;
  const templateCount = (n: number) => n === 0
    ? t('agentBuilder.summary.anyTemplate', 'Any template')
    : t('agentBuilder.summary.templateCount', '{{count}} templates', { count: n });
  const numberLabel = form.phoneNumberId
    ? (connections?.availablePhoneNumbers.find(n => n.id === form.phoneNumberId)?.phoneNumber || current?.phoneNumber || '')
    : null;
  const actionLabels = enabledActionLabels(form.actions, form, {
    transfer: t('agentBuilder.summary.actionTransfer', 'Transfer'),
    appointments: t('agentBuilder.summary.actionAppointments', 'Appointments'),
    saveLead: t('agentBuilder.summary.actionSaveLead', 'Save lead'),
    callbacks: t('agentBuilder.summary.actionCallbacks', 'Callbacks'),
    apiTools: (n) => t('agentBuilder.summary.actionApiTools', '{{count}} API lookups', { count: n }),
  });

  const submitButton = (
    <Button
      onClick={() => save.mutate()}
      disabled={!!validationKey || save.isPending || !anyEngine}
      className="w-full"
      data-testid="button-save-agent"
    >
      {save.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
      {isEdit ? t('agentBuilder.save', 'Save changes') : t('agentBuilder.create', 'Create agent')}
    </Button>
  );

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/app/agents')} aria-label={t('agentBuilder.back', 'Back')} data-testid="button-back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
            {isEdit ? t('agentBuilder.editTitle', 'Edit agent') : t('agentBuilder.title', 'New agent')}
          </h1>
          <p className="text-muted-foreground">
            {t('agentBuilder.subtitle', 'One agent for incoming calls and campaigns, running on Plivo.')}
          </p>
        </div>
      </div>

      {connectionsError && (
        <Alert>
          <AlertDescription>{t('agentBuilder.numbersUnavailable', 'Could not load your Plivo numbers right now — you can still save the agent and attach a number later.')}</AlertDescription>
        </Alert>
      )}

      {!anyEngine && settings && (
        <Alert variant="destructive">
          <AlertDescription>{t('agentBuilder.noEngine', 'Neither Sarvam nor Plivo+OpenAI is enabled. Ask your admin to enable a voice engine in Settings.')}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1 · {t('agentBuilder.basics.title', 'Name your agent')}</CardTitle>
              <CardDescription>{t('agentBuilder.basics.desc', 'Any name you like — e.g. "Clinic receptionist". Only you see it.')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="ab-name" className="sr-only">{t('agentBuilder.name', 'Agent name')}</Label>
              <Input
                id="ab-name"
                value={form.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder={t('agentBuilder.namePlaceholder', 'e.g. Support — Hindi')}
                data-testid="input-agent-name"
                autoFocus={!isEdit}
              />
            </CardContent>
          </Card>

          <EngineVoiceSection
            form={form}
            onChange={onChange}
            sarvamEnabled={sarvamEnabled}
            plivoEnabled={plivoEnabled}
            sarvamVoices={sarvamRes?.voices || []}
            openaiVoices={openaiRes?.voices || []}
            chatModels={chatModels}
            realtimeModels={realtimeRes?.models || []}
          />
          <PromptSection form={form} onChange={onChange} />
          <ToolsSection form={form} onChange={onChange} knowledgeBase={knowledgeBase} messagingAvailable={messagingPluginEnabled} />
          {messagingPluginEnabled && <MessagingSection form={form} onChange={onChange} />}
          <PhoneSection
            step={messagingPluginEnabled ? 6 : 5}
            form={form}
            onChange={onChange}
            numbers={connections?.availablePhoneNumbers || []}
            current={current}
            isLoading={numbersLoading}
          />
        </div>

        <aside className="hidden lg:block sticky top-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('agentBuilder.summary.title', 'Summary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <dl className="space-y-2">
                <SummaryRow label={t('agentBuilder.summary.engine', 'Voice engine')} value={form.engine === 'sarvam-plivo' ? 'Sarvam (Indian)' : 'OpenAI'} />
                <SummaryRow label={t('agentBuilder.language', 'Language')} value={languageLabel} />
                <SummaryRow label={t('agentBuilder.speaker', 'Speaker')} value={voiceLabel} />
                <SummaryRow label={t('agentBuilder.model', 'AI model')} value={form.model} />
                <SummaryRow label={t('agentBuilder.summary.number', 'Number')} value={numberLabel || t('agentBuilder.summary.noNumber', 'None')} />
                <SummaryRow label={t('agentBuilder.summary.actions', 'Actions')} value={actionLabels.length ? actionLabels.join(', ') : t('agentBuilder.summary.noActions', 'None')} />
                {messagingPluginEnabled && form.messagingWhatsappEnabled && (
                  <SummaryRow label={t('agentBuilder.summary.whatsapp', 'WhatsApp')} value={templateCount(form.messagingWhatsappTemplates.length)} />
                )}
                {messagingPluginEnabled && form.messagingEmailEnabled && (
                  <SummaryRow label={t('agentBuilder.summary.email', 'Email')} value={templateCount(form.messagingEmailTemplates.length)} />
                )}
              </dl>
              <div className="space-y-1.5 border-t pt-3">
                <p className="text-xs font-medium text-muted-foreground">{t('agentBuilder.summary.readyFor', 'Ready for')}</p>
                <ReadyRow ok={!!form.phoneNumberId} icon={<PhoneIncoming className="h-4 w-4" />} label={t('agentBuilder.summary.incoming', 'Incoming calls')} hint={form.phoneNumberId ? undefined : t('agentBuilder.summary.attachNumber', 'attach a number')} />
                <ReadyRow ok icon={<Megaphone className="h-4 w-4" />} label={t('agentBuilder.summary.campaigns', 'Campaigns')} />
                {messagingPluginEnabled && form.messagingWhatsappEnabled && (
                  <ReadyRow ok icon={<MessageSquare className="h-4 w-4" />} label={t('agentBuilder.summary.whatsappReady', 'WhatsApp templates')} />
                )}
                {messagingPluginEnabled && form.messagingEmailEnabled && (
                  <ReadyRow ok icon={<Mail className="h-4 w-4" />} label={t('agentBuilder.summary.emailReady', 'Email templates')} />
                )}
              </div>
              {validationMsg && <p className="text-xs text-muted-foreground">{validationMsg}</p>}
              {submitButton}
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 border-t bg-background/95 backdrop-blur p-4 z-20">
        {validationMsg && <p className="text-xs text-muted-foreground mb-2">{validationMsg}</p>}
        {submitButton}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-right truncate">{value}</dd>
    </div>
  );
}

function ReadyRow({ ok, icon, label, hint }: { ok: boolean; icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <div className={`flex items-center gap-2 ${ok ? '' : 'text-muted-foreground'}`}>
      {icon}
      <span>{label}</span>
      {ok ? <Check className="h-4 w-4 text-emerald-600 ml-auto" /> : hint ? <span className="text-xs ml-auto">{hint}</span> : null}
    </div>
  );
}
