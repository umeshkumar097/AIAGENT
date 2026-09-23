import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { RotateCcw } from "lucide-react";

/**
 * Per-outcome retry rules (campaigns.retry_rules). The legacy flat columns are kept in
 * sync so servers without `retryRules` support keep working — see `legacyFromRules`.
 */
export const RETRY_OUTCOMES = ['no_answer', 'busy', 'failed', 'voicemail'] as const;
export type RetryOutcome = typeof RETRY_OUTCOMES[number];
export interface RetryRule { enabled: boolean; delayMinutes: number; maxAttempts: number }
export type RetryRules = Record<RetryOutcome, RetryRule>;

export const RETRY_DELAY_MIN = 5;
export const RETRY_DELAY_MAX = 10080;
export const RETRY_ATTEMPTS_MAX = 10;

export interface LegacyRetryFields {
  retryEnabled: boolean;
  retryMaxAttempts: number;
  retryIntervalMinutes: number;
  retryOnNoAnswer: boolean;
  retryOnBusy: boolean;
  retryOnFailed: boolean;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? v : lo)));

export function defaultRetryRules(): RetryRules {
  const rule = (enabled: boolean): RetryRule => ({ enabled, delayMinutes: 60, maxAttempts: 3 });
  return { no_answer: rule(true), busy: rule(false), failed: rule(false), voicemail: rule(false) };
}

/** Rules from a campaign row: `retryRules` when present, otherwise derived from the legacy columns. */
export function rulesFromCampaign(c: Partial<LegacyRetryFields> & { retryRules?: Partial<Record<string, Partial<RetryRule>>> | null }): RetryRules {
  const base = defaultRetryRules();
  const delay = clamp(c.retryIntervalMinutes ?? 60, RETRY_DELAY_MIN, RETRY_DELAY_MAX);
  const max = clamp(c.retryMaxAttempts ?? 3, 1, RETRY_ATTEMPTS_MAX);
  const on = c.retryEnabled === true;
  const legacy: RetryRules = {
    no_answer: { enabled: on && c.retryOnNoAnswer !== false, delayMinutes: delay, maxAttempts: max },
    busy: { enabled: on && c.retryOnBusy === true, delayMinutes: delay, maxAttempts: max },
    failed: { enabled: on && c.retryOnFailed === true, delayMinutes: delay, maxAttempts: max },
    voicemail: { enabled: false, delayMinutes: delay, maxAttempts: max },
  };
  if (!c.retryRules || typeof c.retryRules !== 'object') return c.retryEnabled === undefined ? base : legacy;
  const out = { ...legacy };
  for (const key of RETRY_OUTCOMES) {
    const r = c.retryRules[key];
    if (!r || typeof r !== 'object') continue;
    out[key] = {
      enabled: r.enabled === true,
      delayMinutes: clamp(typeof r.delayMinutes === 'number' ? r.delayMinutes : legacy[key].delayMinutes, RETRY_DELAY_MIN, RETRY_DELAY_MAX),
      maxAttempts: clamp(typeof r.maxAttempts === 'number' ? r.maxAttempts : legacy[key].maxAttempts, 1, RETRY_ATTEMPTS_MAX),
    };
  }
  return out;
}

/** Rules as the server should see them: all off when the master toggle is off. */
export function effectiveRetryRules(enabled: boolean, rules: RetryRules): RetryRules {
  const out = { ...rules };
  for (const key of RETRY_OUTCOMES) {
    out[key] = {
      enabled: enabled && rules[key].enabled,
      delayMinutes: clamp(rules[key].delayMinutes, RETRY_DELAY_MIN, RETRY_DELAY_MAX),
      maxAttempts: clamp(rules[key].maxAttempts, 1, RETRY_ATTEMPTS_MAX),
    };
  }
  return out;
}

/** Legacy columns that best approximate the rules (old servers / old scheduler code paths). */
export function legacyFromRules(rules: RetryRules): LegacyRetryFields {
  const enabled = RETRY_OUTCOMES.filter(k => rules[k].enabled);
  const anyOn = enabled.length > 0;
  return {
    retryEnabled: anyOn,
    retryMaxAttempts: anyOn ? clamp(Math.max(...enabled.map(k => rules[k].maxAttempts)), 1, 5) : 3,
    retryIntervalMinutes: anyOn ? clamp(Math.min(...enabled.map(k => rules[k].delayMinutes)), 15, 1440) : 60,
    retryOnNoAnswer: rules.no_answer.enabled,
    retryOnBusy: rules.busy.enabled,
    retryOnFailed: rules.failed.enabled,
  };
}

interface Props {
  enabled: boolean;
  rules: RetryRules;
  onChange: (next: { enabled: boolean; rules: RetryRules }) => void;
  /** Prefix for ids / test ids ("" for create, "edit-" for edit). */
  idPrefix?: string;
}

export default function RetryRulesEditor({ enabled, rules, onChange, idPrefix = "" }: Props) {
  const { t } = useTranslation();
  const labels: Record<RetryOutcome, string> = {
    no_answer: t('retryRules.no_answer', 'No answer'),
    busy: t('retryRules.busy', 'Busy'),
    failed: t('retryRules.failed', 'Call failed'),
    voicemail: t('retryRules.voicemail', 'Voicemail'),
  };
  const setRule = (key: RetryOutcome, patch: Partial<RetryRule>) =>
    onChange({ enabled, rules: { ...rules, [key]: { ...rules[key], ...patch } } });
  const active = RETRY_OUTCOMES.filter(k => rules[k].enabled);

  return (
    <div className="space-y-4 border-t pt-4" data-testid={`${idPrefix}retry-rules`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          <Label className="text-base">{t('retryRules.title', 'Auto-retry missed calls')}</Label>
          <InfoTooltip content={t('retryRules.tooltip', 'Re-call contacts per outcome with its own wait time and attempt cap. Contacts who were interested, booked, wrong-number, not interested or asked not to be called are never retried.')} />
        </div>
        <Switch checked={enabled} onCheckedChange={(v) => onChange({ enabled: v, rules })} data-testid={`switch-${idPrefix}retry-enabled`} />
      </div>
      <p className="text-sm text-muted-foreground">
        {t('retryRules.desc', 'Each outcome has its own delay and maximum number of calls (including the first).')}
      </p>

      {enabled && (
        <div className="space-y-2 pl-1">
          <div className="hidden sm:grid grid-cols-[1fr_130px_110px] gap-2 text-xs text-muted-foreground px-1">
            <span>{t('retryRules.outcome', 'Outcome')}</span>
            <span>{t('retryRules.delay', 'Wait (minutes)')}</span>
            <span>{t('retryRules.maxAttempts', 'Max calls')}</span>
          </div>
          {RETRY_OUTCOMES.map(key => {
            const r = rules[key];
            return (
              <div key={key} className="grid grid-cols-1 sm:grid-cols-[1fr_130px_110px] gap-2 items-center rounded-md border px-2 py-1.5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={r.enabled} onCheckedChange={(v) => setRule(key, { enabled: v === true })} data-testid={`checkbox-${idPrefix}retry-${key}`} />
                  {labels[key]}
                </label>
                <Input
                  type="number" min={RETRY_DELAY_MIN} max={RETRY_DELAY_MAX} step={5} value={r.delayMinutes} disabled={!r.enabled}
                  onChange={(e) => setRule(key, { delayMinutes: Number(e.target.value) })}
                  onBlur={() => setRule(key, { delayMinutes: clamp(r.delayMinutes, RETRY_DELAY_MIN, RETRY_DELAY_MAX) })}
                  className="h-8" aria-label={`${labels[key]} ${t('retryRules.delay', 'Wait (minutes)')}`}
                  data-testid={`input-${idPrefix}retry-delay-${key}`}
                />
                <Input
                  type="number" min={1} max={RETRY_ATTEMPTS_MAX} value={r.maxAttempts} disabled={!r.enabled}
                  onChange={(e) => setRule(key, { maxAttempts: Number(e.target.value) })}
                  onBlur={() => setRule(key, { maxAttempts: clamp(r.maxAttempts, 1, RETRY_ATTEMPTS_MAX) })}
                  className="h-8" aria-label={`${labels[key]} ${t('retryRules.maxAttempts', 'Max calls')}`}
                  data-testid={`input-${idPrefix}retry-max-${key}`}
                />
              </div>
            );
          })}
          <div className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground" data-testid={`text-${idPrefix}retry-summary`}>
            {active.length === 0
              ? t('retryRules.summaryNone', 'No outcome selected — nothing will be retried.')
              : active.map(k => `${labels[k]}: ${t('retryRules.summaryRow', 'up to {{max}} calls, {{delay}} min apart', { max: rules[k].maxAttempts, delay: rules[k].delayMinutes })}`).join(' · ')}
          </div>
        </div>
      )}
    </div>
  );
}
