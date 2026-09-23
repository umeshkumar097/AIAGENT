import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { LEAD_KEY_RE, MAX_LEAD_FIELDS, type LeadField } from "./actions";

interface Props {
  fields: LeadField[];
  onChange: (fields: LeadField[]) => void;
}

const BUILT_IN = ['name', 'email', 'phone'];

/** e.g. "Budget (INR)" → "budget_inr" */
export function slugKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').replace(/^[0-9]+/, '').slice(0, 30);
}

/** Extra fields the agent should capture with save_lead, beyond name / email / phone. */
export default function LeadFieldsEditor({ fields, onChange }: Props) {
  const { t } = useTranslation();

  const update = (i: number, patch: Partial<LeadField>) =>
    onChange(fields.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  const remove = (i: number) => onChange(fields.filter((_, idx) => idx !== i));
  const add = () => onChange([...fields, { key: '', label: '', required: false }]);

  const onLabel = (i: number, label: string) => {
    const prev = fields[i];
    const keyWasAuto = !prev.key || prev.key === slugKey(prev.label);
    update(i, { label, ...(keyWasAuto ? { key: slugKey(label) } : {}) });
  };

  const keys = fields.map(f => f.key);
  const keyError = (f: LeadField, i: number): string | null => {
    if (!f.key) return t('agentBuilder.actions.saveLead.keyRequired', 'Key needed');
    if (!LEAD_KEY_RE.test(f.key)) return t('agentBuilder.actions.saveLead.keyInvalid', 'a–z, 0–9, _');
    if (BUILT_IN.includes(f.key) || keys.indexOf(f.key) !== i) return t('agentBuilder.actions.saveLead.keyDuplicate', 'Already used');
    return null;
  };

  return (
    <div className="pb-3 space-y-2" data-testid="lead-fields-editor">
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <span>{t('agentBuilder.actions.saveLead.alwaysCaptured', 'Always captured:')}</span>
        {BUILT_IN.map(k => <Badge key={k} variant="secondary" className="font-mono text-[10px] px-1.5 py-0">{k}</Badge>)}
      </div>

      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((f, i) => {
            const err = keyError(f, i);
            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2" data-testid={`lead-field-${i}`}>
                <Input
                  className="h-8 text-sm sm:flex-1" value={f.label} maxLength={60}
                  onChange={(e) => onLabel(i, e.target.value)}
                  placeholder={t('agentBuilder.actions.saveLead.labelPlaceholder', 'What to ask, e.g. Budget')}
                  data-testid={`lead-field-label-${i}`}
                />
                <div className="sm:w-40">
                  <Input
                    className={`h-8 text-sm font-mono ${err ? 'border-destructive' : ''}`} value={f.key} maxLength={30}
                    onChange={(e) => update(i, { key: e.target.value.toLowerCase() })}
                    placeholder="key"
                    data-testid={`lead-field-key-${i}`}
                  />
                  {err && <p className="text-[10px] text-destructive mt-0.5">{err}</p>}
                </div>
                <label className="flex items-center gap-1.5 text-xs whitespace-nowrap cursor-pointer">
                  <Checkbox checked={f.required} onCheckedChange={(v) => update(i, { required: v === true })} data-testid={`lead-field-required-${i}`} />
                  {t('agentBuilder.actions.saveLead.required', 'Required')}
                </label>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => remove(i)}
                  aria-label={t('agentBuilder.actions.remove', 'Remove')} data-testid={`lead-field-remove-${i}`}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <Button type="button" variant="outline" size="sm" onClick={add} disabled={fields.length >= MAX_LEAD_FIELDS} data-testid="button-add-lead-field">
        <Plus className="h-3.5 w-3.5 mr-1" />
        {t('agentBuilder.actions.saveLead.addField', 'Add a field')}
        <span className="ml-1 text-muted-foreground">({fields.length}/{MAX_LEAD_FIELDS})</span>
      </Button>
    </div>
  );
}
