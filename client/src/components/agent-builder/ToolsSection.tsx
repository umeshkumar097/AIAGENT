import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import type { AgentBuilderForm } from "./types";

export interface KnowledgeItem {
  id: string;
  title: string;
  type: string;
  /** From /api/rag-knowledge — only 'completed' items can be used on calls */
  ragStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  chunkCount?: number;
}

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
  knowledgeBase: KnowledgeItem[];
}

function ToggleRow({ id, label, hint, checked, onCheckedChange }: {
  id: string; label: string; hint: string; checked: boolean; onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} data-testid={`switch-${id}`} />
    </div>
  );
}

export default function ToolsSection({ form, onChange, knowledgeBase }: Props) {
  const { t } = useTranslation();
  const isSarvam = form.engine === 'sarvam-plivo';

  const toggleKb = (id: string, on: boolean) => onChange({
    knowledgeBaseIds: on ? [...form.knowledgeBaseIds, id] : form.knowledgeBaseIds.filter(x => x !== id),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">4 · {t('agentBuilder.tools.title', 'Tools & knowledge')}</CardTitle>
        <CardDescription>{t('agentBuilder.tools.desc', 'Optional. Everything here can be changed later.')}</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        <div>
          <ToggleRow
            id="transfer"
            label={t('agentBuilder.transfer', 'Transfer to a human')}
            hint={t('agentBuilder.transferHint', 'The agent can hand the call to this number when asked.')}
            checked={form.transferEnabled}
            onCheckedChange={(v) => onChange({ transferEnabled: v })}
          />
          {form.transferEnabled && (
            <div className="pb-3">
              <Input
                type="tel"
                value={form.transferPhoneNumber}
                onChange={(e) => onChange({ transferPhoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-transfer-number"
              />
            </div>
          )}
        </div>

        <ToggleRow
          id="end-conversation"
          label={t('agentBuilder.endCall', 'Let the agent end the call')}
          hint={t('agentBuilder.endCallHint', 'Hangs up politely once the conversation is done. Saves minutes.')}
          checked={form.endConversationEnabled}
          onCheckedChange={(v) => onChange({ endConversationEnabled: v })}
        />

        <ToggleRow
          id="detect-language"
          label={t('agentBuilder.detectLanguage', 'Follow the caller\'s language')}
          hint={isSarvam
            ? t('agentBuilder.detectLanguageHintSarvam', 'Hears Hindi, English and 10 Indian languages and replies in whichever the caller uses — even if they switch mid-call.')
            : t('agentBuilder.detectLanguageHint', 'Reply in whatever language the caller speaks.')}
          checked={form.detectLanguageEnabled}
          onCheckedChange={(v) => onChange({ detectLanguageEnabled: v })}
        />

        <div className="pt-3 space-y-2">
          <Label>{t('agentBuilder.knowledge', 'Knowledge base')}</Label>
          {knowledgeBase.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t('agentBuilder.noKnowledge', 'No documents yet. Add them under Knowledge Base and they will show up here.')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {knowledgeBase.map(kb => {
                const ready = kb.ragStatus === 'completed' || (kb.chunkCount ?? 0) > 0;
                const statusLabel = ready
                  ? null
                  : kb.ragStatus === 'failed'
                    ? t('agentBuilder.kbFailed', 'indexing failed')
                    : t('agentBuilder.kbProcessing', 'indexing…');
                return (
                  <label key={kb.id} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-muted/40">
                    <Checkbox
                      checked={form.knowledgeBaseIds.includes(kb.id)}
                      onCheckedChange={(v) => toggleKb(kb.id, v === true)}
                      data-testid={`kb-${kb.id}`}
                    />
                    <span className="truncate">{kb.title}</span>
                    {statusLabel && <span className="text-[10px] text-amber-600 dark:text-amber-400 whitespace-nowrap">{statusLabel}</span>}
                    <span className="ml-auto text-[10px] uppercase text-muted-foreground">{kb.type}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
