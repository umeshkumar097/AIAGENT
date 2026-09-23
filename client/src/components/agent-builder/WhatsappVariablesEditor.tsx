import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { MAX_WHATSAPP_VARIABLES, type WhatsappTemplateVariables, type WhatsappVariableMode } from "./types";

interface Props {
  templateName: string;
  variables: WhatsappTemplateVariables;
  onChange: (next: WhatsappTemplateVariables) => void;
}

/** Highest positional key present — Waki returns no component metadata, so the user sets the count by hand. */
function variableCount(vars: WhatsappTemplateVariables): number {
  return Object.keys(vars).reduce((max, k) => Math.max(max, Number(k) || 0), 0);
}

/**
 * Body variables for one approved WhatsApp template: how many {{n}} placeholders it has and,
 * for each, whether the agent asks the caller for it (collect) or always sends a fixed value.
 */
export default function WhatsappVariablesEditor({ templateName, variables, onChange }: Props) {
  const { t } = useTranslation();
  const count = variableCount(variables);
  const safeId = templateName.replace(/[^a-zA-Z0-9_-]/g, '_');

  const setCount = (next: number) => {
    const n = Math.max(0, Math.min(MAX_WHATSAPP_VARIABLES, next));
    const out: WhatsappTemplateVariables = {};
    for (let i = 1; i <= n; i++) out[String(i)] = variables[String(i)] || { mode: 'collect', value: '' };
    onChange(out);
  };

  const setMode = (key: string, mode: WhatsappVariableMode) =>
    onChange({ ...variables, [key]: { mode, value: variables[key]?.value || '' } });
  const setValue = (key: string, value: string) =>
    onChange({ ...variables, [key]: { mode: variables[key]?.mode || 'collect', value } });

  return (
    <div className="mt-2 space-y-2 rounded-md border bg-muted/30 p-3" data-testid={`wa-vars-${safeId}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <Label className="text-xs font-medium">{t('agentBuilder.messaging.bodyVariables', 'Body variables')}</Label>
          <p className="text-[11px] text-muted-foreground">
            {t('agentBuilder.messaging.bodyVariablesHint', 'How many numbered placeholders the template body has.')}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button" variant="outline" size="icon" className="h-7 w-7"
            onClick={() => setCount(count - 1)} disabled={count <= 0}
            aria-label={t('agentBuilder.messaging.fewerVariables', 'Fewer variables')}
            data-testid={`wa-vars-minus-${safeId}`}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-6 text-center text-sm tabular-nums" data-testid={`wa-vars-count-${safeId}`}>{count}</span>
          <Button
            type="button" variant="outline" size="icon" className="h-7 w-7"
            onClick={() => setCount(count + 1)} disabled={count >= MAX_WHATSAPP_VARIABLES}
            aria-label={t('agentBuilder.messaging.moreVariables', 'More variables')}
            data-testid={`wa-vars-plus-${safeId}`}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {count > 0 && (
        <div className="space-y-2">
          {Array.from({ length: count }, (_, i) => String(i + 1)).map(key => {
            const v = variables[key] || { mode: 'collect' as const, value: '' };
            const collect = v.mode === 'collect';
            return (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground w-10 shrink-0">{`{{${key}}}`}</span>
                <div className="flex rounded-md border overflow-hidden shrink-0">
                  <button
                    type="button"
                    className={`px-2 py-1 text-xs ${collect ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => setMode(key, 'collect')}
                    data-testid={`wa-var-collect-${safeId}-${key}`}
                  >
                    {t('agentBuilder.messaging.modeCollect', 'Ask caller')}
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-1 text-xs border-l ${!collect ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => setMode(key, 'fixed')}
                    data-testid={`wa-var-fixed-${safeId}-${key}`}
                  >
                    {t('agentBuilder.messaging.modeFixed', 'Fixed')}
                  </button>
                </div>
                <Input
                  value={v.value}
                  onChange={(e) => setValue(key, e.target.value)}
                  className="h-8 text-sm"
                  placeholder={collect
                    ? t('agentBuilder.messaging.collectPlaceholder', 'What should the agent ask for? e.g. customer name')
                    : t('agentBuilder.messaging.fixedPlaceholder', 'Value to send, e.g. your company name')}
                  data-testid={`wa-var-value-${safeId}-${key}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
