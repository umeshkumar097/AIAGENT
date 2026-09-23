import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Check, ChevronDown, Loader2, Play, Square } from "lucide-react";
import OpenAIVoicePreviewButton from "@/components/OpenAIVoicePreviewButton";
import { SUPPORTED_LANGUAGES, isProviderSupported } from "@/lib/languages";
import { cn } from "@/lib/utils";
import {
  DEFAULT_CHAT_MODEL, DEFAULT_REALTIME_MODEL,
  SARVAM_LANGUAGES, SARVAM_LANG_CODES, SARVAM_PREVIEW_LANGUAGE,
  engineDefaults, engineForLanguage,
  type AgentBuilderForm, type BuilderEngine,
} from "./types";

export interface SarvamVoice { id: string; name: string; gender: string; language: string; description: string }
export interface OpenAIVoice { id: string; name: string; description: string }
export interface ChatModel { modelId: string; name: string; provider: string; tier: string }

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
  sarvamEnabled: boolean;
  plivoEnabled: boolean;
  sarvamVoices: SarvamVoice[];
  openaiVoices: OpenAIVoice[];
  chatModels: ChatModel[];
  realtimeModels: string[];
}

/**
 * Language & voice. A non-technical user only picks a language and a speaker;
 * the engine (Sarvam for Indian languages, OpenAI otherwise) follows the
 * language automatically and can be overridden under "Change".
 */
export default function EngineVoiceSection({
  form, onChange, sarvamEnabled, plivoEnabled, sarvamVoices, openaiVoices, chatModels, realtimeModels,
}: Props) {
  const { t } = useTranslation();
  const isSarvam = form.engine === 'sarvam-plivo';
  const [showEngines, setShowEngines] = useState(false);

  // ── Language list: Indian languages first (Sarvam), then the rest (OpenAI) ──
  const languageOptions = useMemo(() => {
    const indian = sarvamEnabled
      ? SARVAM_LANGUAGES.map(l => ({ value: l.code, label: `${l.label} · ${l.native}`, indian: true }))
      : [];
    const others = plivoEnabled
      ? SUPPORTED_LANGUAGES
          .filter(l => isProviderSupported(l.value, 'openai') && !(sarvamEnabled && SARVAM_LANG_CODES.has(l.value)))
          .map(l => ({ value: l.value, label: l.label, indian: false }))
      : [];
    return [...indian, ...others];
  }, [sarvamEnabled, plivoEnabled]);

  const changeLanguage = (code: string) => {
    const patch: Partial<AgentBuilderForm> = { language: code };
    let engine = form.engine;
    if (form.engineAuto) {
      engine = engineForLanguage(code, sarvamEnabled, plivoEnabled);
      if (engine !== form.engine) Object.assign(patch, { engine }, engineDefaults(engine));
    }
    // Prefer a speaker native to the new language (e.g. Telugu → Pavithra) unless the current one already is
    if (engine === 'sarvam-plivo') {
      const langLabel = SARVAM_LANGUAGES.find(l => l.code === code)?.label.split(' ')[0];
      const current = sarvamVoices.find(v => v.id === (patch.voice ?? form.voice));
      const native = langLabel ? sarvamVoices.find(v => v.language === langLabel) : undefined;
      if (native && current?.language !== langLabel) patch.voice = native.id;
    }
    onChange(patch);
  };

  const pickEngine = (engine: BuilderEngine) => {
    if (engine === form.engine) { onChange({ engineAuto: false }); return; }
    stopPreview();
    onChange({ engine, engineAuto: false, ...engineDefaults(engine) });
  };

  // ── Sarvam preview (same idiom as the Voices page) ────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const stopPreview = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(null);
  };

  const previewSarvam = async (voice: SarvamVoice) => {
    if (playing === voice.id) { stopPreview(); return; }
    stopPreview();
    setPreviewError(null);
    setLoading(voice.id);
    try {
      const resp = await fetch('/api/sarvam/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voiceId: voice.id, language: SARVAM_PREVIEW_LANGUAGE[form.language] || voice.language }),
      });
      const data = await resp.json();
      if (!data.success || !data.audio) throw new Error(data.error || 'preview failed');
      const bytes = Uint8Array.from(atob(data.audio), c => c.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setPlaying(null); audioRef.current = null; URL.revokeObjectURL(url); };
      await audio.play();
      setPlaying(voice.id);
    } catch (e: any) {
      setPreviewError(e?.message || 'Preview failed');
    } finally {
      setLoading(null);
    }
  };

  // Speakers that natively match the selected language come first
  const selectedLangLabel = SARVAM_LANGUAGES.find(l => l.code === form.language)?.label.split(' ')[0];
  const sortedSarvamVoices = useMemo(() => {
    const match = (v: SarvamVoice) => selectedLangLabel && v.language === selectedLangLabel;
    return [...sarvamVoices].sort((a, b) => Number(!!match(b)) - Number(!!match(a)));
  }, [sarvamVoices, selectedLangLabel]);

  const openaiChatModels = chatModels.filter(m => m.provider === 'openai');
  const engineLabel = isSarvam
    ? t('agentBuilder.engine.sarvam', 'Sarvam — Indian voices')
    : t('agentBuilder.engine.openai', 'OpenAI Realtime');

  const voiceCard = (id: string, name: string, meta: string | null, desc: string, preview: React.ReactNode) => {
    const selected = form.voice === id;
    return (
      <div
        key={id}
        role="button"
        tabIndex={0}
        onClick={() => onChange({ voice: id })}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChange({ voice: id }); }}
        data-testid={`voice-${id}`}
        className={cn("flex items-center justify-between gap-2 rounded-lg border px-3 py-2 cursor-pointer",
          selected ? "border-primary bg-primary/5" : "hover:bg-muted/40")}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{name}</span>
            {meta && <span className="text-[10px] text-muted-foreground">{meta}</span>}
            {selected && <Check className="h-3.5 w-3.5 text-primary" />}
          </div>
          <p className="text-xs text-muted-foreground truncate">{desc}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>{preview}</div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">2 · {t('agentBuilder.voice.title', 'Language & voice')}</CardTitle>
        <CardDescription>{t('agentBuilder.voice.desc', 'Pick the language your callers speak and a voice you like. We set up the right engine for it.')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>{t('agentBuilder.language', 'Language')}</Label>
          <Select value={form.language} onValueChange={changeLanguage}>
            <SelectTrigger data-testid="select-language"><SelectValue /></SelectTrigger>
            <SelectContent>
              {languageOptions.map(l => (
                <SelectItem key={l.value} value={l.value}>
                  {l.indian ? '🇮🇳 ' : ''}{l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-2">
            <span>{t('agentBuilder.engineLine', 'Voice engine')}: <span className="font-medium text-foreground">{engineLabel}</span></span>
            {sarvamEnabled && plivoEnabled && (
              <button type="button" className="underline" onClick={() => setShowEngines(v => !v)} data-testid="button-change-engine">
                {showEngines ? t('common.close', 'Close') : t('agentBuilder.change', 'Change')}
              </button>
            )}
            {form.engineAuto && <Badge variant="secondary" className="text-[10px]">{t('agentBuilder.auto', 'auto')}</Badge>}
          </div>
          {showEngines && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {([
                ['sarvam-plivo', sarvamEnabled, t('agentBuilder.engine.sarvam', 'Sarvam — Indian voices'), t('agentBuilder.engine.sarvamDesc', 'Hindi, Hinglish and 10 Indian languages. Natural Indian accent.')],
                ['plivo', plivoEnabled, t('agentBuilder.engine.openai', 'OpenAI Realtime'), t('agentBuilder.engine.openaiDesc', 'International languages, OpenAI voices.')],
              ] as [BuilderEngine, boolean, string, string][]).map(([engine, enabled, title, desc]) => (
                <button
                  key={engine}
                  type="button"
                  disabled={!enabled}
                  onClick={() => pickEngine(engine)}
                  data-testid={`engine-${engine}`}
                  className={cn("text-left rounded-xl border p-3 transition-colors",
                    form.engine === engine ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted/40",
                    !enabled && "opacity-50 cursor-not-allowed")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">{title}</span>
                    {form.engine === engine && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t('agentBuilder.speaker', 'Voice')}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {isSarvam
              ? sortedSarvamVoices.map(v => voiceCard(
                  v.id, v.name, `${v.gender} · ${v.language}`, v.description,
                  <Button
                    type="button" size="icon" variant="ghost" className="h-8 w-8 shrink-0"
                    onClick={() => previewSarvam(v)}
                    aria-label={t('agentBuilder.preview', 'Preview')}
                    data-testid={`preview-${v.id}`}
                  >
                    {loading === v.id ? <Loader2 className="h-4 w-4 animate-spin" /> : playing === v.id ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>,
                ))
              : openaiVoices.map(v => voiceCard(v.id, v.name, null, v.description, <OpenAIVoicePreviewButton voiceId={v.id} voiceName={v.name} />))}
          </div>
          {((isSarvam && sarvamVoices.length === 0) || (!isSarvam && openaiVoices.length === 0)) && (
            <p className="text-sm text-muted-foreground">{t('agentBuilder.noVoices', 'No voices available.')}</p>
          )}
          {previewError && <p className="text-xs text-destructive">{previewError}</p>}
        </div>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-4 w-4" /> {t('agentBuilder.advanced', 'Advanced')}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-4">
            <div className="space-y-2">
              <Label>{t('agentBuilder.model', 'AI model')}</Label>
              <Select value={form.model} onValueChange={(v) => onChange({ model: v })}>
                <SelectTrigger data-testid="select-model"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {isSarvam
                    ? (openaiChatModels.length ? openaiChatModels : [{ modelId: DEFAULT_CHAT_MODEL, name: 'GPT-4o mini', provider: 'openai', tier: 'free' }])
                        .map(m => <SelectItem key={m.modelId} value={m.modelId}>{m.name}{m.tier === 'pro' ? ' · Pro' : ''}</SelectItem>)
                    : (realtimeModels.length ? realtimeModels : [DEFAULT_REALTIME_MODEL])
                        .map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {isSarvam
                  ? t('agentBuilder.modelHintSarvam', 'GPT-4o mini is fastest on phone calls.')
                  : t('agentBuilder.modelHintOpenai', 'Realtime models talk directly — no separate speech step.')}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t('agentBuilder.temperature', 'Creativity (temperature)')}</Label>
                <span className="text-xs text-muted-foreground">{form.temperature.toFixed(1)}</span>
              </div>
              <Slider min={0} max={1} step={0.1} value={[form.temperature]} onValueChange={([v]) => onChange({ temperature: v })} />
              <p className="text-xs text-muted-foreground">{t('agentBuilder.temperatureHint', 'Lower = more consistent answers. 0.3–0.6 works well for phone calls.')}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
