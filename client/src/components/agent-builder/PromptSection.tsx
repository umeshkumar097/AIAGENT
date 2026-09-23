import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import PromptTemplatesLibrary from "@/components/PromptTemplatesLibrary";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { PURPOSES, type AgentBuilderForm } from "./types";

const PURPOSE_LABELS: Record<string, string> = {
  support: 'Customer support', sales: 'Sales / follow-up', appointment: 'Appointment booking',
  reminder: 'Reminders', custom: 'Custom',
};

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
}

export default function PromptSection({ form, onChange }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const applyPurpose = (id: string) => {
    const preset = PURPOSES.find(p => p.id === id);
    if (!preset) return;
    if (id === 'custom') { onChange({ purpose: id }); return; }
    const greeting = form.language === 'hi' ? preset.firstMessage.hi : preset.firstMessage.en;
    const fill = () => onChange({ purpose: id, systemPrompt: preset.systemPrompt, firstMessage: greeting });
    const hasText = form.systemPrompt.trim().length > 0 || form.firstMessage.trim().length > 0;
    if (!hasText) { fill(); return; }
    // Never overwrite typed text silently — offer to replace instead of a blocking confirm()
    onChange({ purpose: id });
    toast({
      title: t('agentBuilder.replacePromptTitle', 'Keep your current text?'),
      description: t('agentBuilder.replacePromptConfirm', 'Replace the current prompt and greeting with this template?'),
      action: (
        <ToastAction altText={t('agentBuilder.replace', 'Replace')} onClick={fill}>
          {t('agentBuilder.replace', 'Replace')}
        </ToastAction>
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">3 · {t('agentBuilder.prompt.title', 'What should it do?')}</CardTitle>
        <CardDescription>{t('agentBuilder.prompt.desc', 'Tap a job below — we write the instructions for you. Edit them in plain words, like briefing a new employee.')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>{t('agentBuilder.purpose', 'What will this agent do?')}</Label>
          <div className="flex flex-wrap gap-2">
            {PURPOSES.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPurpose(p.id)}
                data-testid={`purpose-${p.id}`}
                className={cn("rounded-full border px-3 py-1.5 text-sm transition-colors",
                  form.purpose === p.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted/50")}
              >
                {t(`agentBuilder.purposes.${p.id}`, { defaultValue: PURPOSE_LABELS[p.id] ?? p.id })}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ab-system-prompt">{t('agentBuilder.systemPrompt', 'Instructions')} <span className="text-destructive">*</span></Label>
          <Textarea
            id="ab-system-prompt"
            rows={9}
            value={form.systemPrompt}
            onChange={(e) => onChange({ systemPrompt: e.target.value })}
            placeholder={t('agentBuilder.systemPromptPlaceholder', 'Who is the agent, what should it do, what should it never do…')}
            data-testid="input-system-prompt"
          />
          <p className="text-xs text-muted-foreground">
            {t('agentBuilder.variablesHint', 'Tip: replace {{company_name}} and {{agent_name}} with your real names, or keep them — they are filled in automatically when known.')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ab-first-message">{t('agentBuilder.firstMessage', 'Opening line')}</Label>
          <Input
            id="ab-first-message"
            value={form.firstMessage}
            onChange={(e) => onChange({ firstMessage: e.target.value })}
            placeholder={form.language === 'hi'
              ? 'नमस्ते! मैं आपकी कैसे मदद कर सकती हूँ?'
              : 'Hello! How can I help you today?'}
            data-testid="input-first-message"
          />
          <p className="text-xs text-muted-foreground">{t('agentBuilder.firstMessageHint', 'Said as soon as the call connects. Keep it to one short sentence.')}</p>
        </div>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-4 w-4" /> {t('agentBuilder.browseTemplates', 'Browse saved prompt templates')}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <PromptTemplatesLibrary
              mode="select"
              onSelectTemplate={(template) => onChange({
                purpose: 'custom',
                systemPrompt: template.systemPrompt,
                firstMessage: template.firstMessage || form.firstMessage,
              })}
            />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
