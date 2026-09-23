/**
 * Smart retry rules for campaigns: one rule per outcome (no_answer / busy / failed / voicemail).
 * `campaigns.retry_rules` wins; when it is null the rules are derived from the legacy columns
 * (retryEnabled, retryOnNoAnswer, retryOnBusy, retryOnFailed, retryIntervalMinutes, retryMaxAttempts)
 * so existing campaigns behave exactly as before. Pure functions — no I/O.
 */
import { RETRY_OUTCOMES, RetryRulesSchema, type RetryOutcome, type RetryRule, type RetryRules } from '@shared/schema';

/** The campaign columns the resolver reads (a full Campaign row satisfies this). */
export interface RetryCampaignLike {
  retryEnabled?: boolean | null;
  retryOnNoAnswer?: boolean | null;
  retryOnBusy?: boolean | null;
  retryOnFailed?: boolean | null;
  retryIntervalMinutes?: number | null;
  retryMaxAttempts?: number | null;
  retryRules?: RetryRules | unknown | null;
}

/** Contact statuses that map to a retry outcome (voicemail is written by scheduleContactRetry). */
export const RETRY_CONTACT_STATUS: Record<RetryOutcome, string> = {
  no_answer: 'no-answer',
  busy: 'busy',
  failed: 'failed',
  voicemail: 'voicemail',
};

const clampDelay = (n: unknown, fallback: number): number => {
  const v = typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback;
  return Math.min(10080, Math.max(5, v));
};
const clampMax = (n: unknown, fallback: number): number => {
  const v = typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback;
  return Math.min(10, Math.max(0, v));
};

/** Rules derived from the legacy boolean/interval columns (voicemail follows no_answer's settings, disabled). */
export function legacyRetryRules(c: RetryCampaignLike): RetryRules {
  const enabled = !!c.retryEnabled;
  const delay = clampDelay(c.retryIntervalMinutes, 60);
  const max = clampMax(c.retryMaxAttempts, 3);
  const rule = (on: boolean): RetryRule => ({ enabled: enabled && on, delayMinutes: delay, maxAttempts: max });
  return {
    no_answer: rule(c.retryOnNoAnswer !== false),
    busy: rule(c.retryOnBusy === true),
    failed: rule(c.retryOnFailed === true),
    voicemail: rule(false),
  };
}

/** Effective rules for a campaign: stored `retryRules` (validated, gaps filled from legacy) or the legacy derivation. */
export function resolveRetryRules(c: RetryCampaignLike): RetryRules {
  const base = legacyRetryRules(c);
  const stored = c.retryRules;
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return base;
  const out: RetryRules = { ...base };
  for (const key of RETRY_OUTCOMES) {
    const r = (stored as Record<string, unknown>)[key];
    if (!r || typeof r !== 'object') continue;
    const rule = r as Partial<RetryRule>;
    out[key] = {
      enabled: rule.enabled === true,
      delayMinutes: clampDelay(rule.delayMinutes, base[key].delayMinutes),
      maxAttempts: clampMax(rule.maxAttempts, base[key].maxAttempts),
    };
  }
  return out;
}

/** True when at least one rule is enabled with room for a retry. */
export function anyRetryEnabled(rules: RetryRules): boolean {
  return RETRY_OUTCOMES.some(k => rules[k].enabled && rules[k].maxAttempts > 1);
}

/** The rule for a terminal call: `outcome` (voicemail) wins over the Plivo status. Null when not retryable. */
export function retryRuleFor(rules: RetryRules, status: string, outcome?: string | null): { key: RetryOutcome; rule: RetryRule } | null {
  let key: RetryOutcome | null = null;
  if (outcome === 'voicemail') key = 'voicemail';
  else if (status === 'no-answer' || status === 'no_answer') key = 'no_answer';
  else if (status === 'busy') key = 'busy';
  else if (status === 'failed') key = 'failed';
  if (!key) return null;
  const rule = rules[key];
  return rule.enabled ? { key, rule } : null;
}

/** Contact statuses currently eligible for a retry pass, with their rule. */
export function enabledRetryStatuses(rules: RetryRules): Array<{ key: RetryOutcome; status: string; rule: RetryRule }> {
  return RETRY_OUTCOMES
    .filter(k => rules[k].enabled)
    .map(k => ({ key: k, status: RETRY_CONTACT_STATUS[k], rule: rules[k] }));
}

/** Validate an API payload; returns the rules or an error message. */
export function parseRetryRulesInput(input: unknown): { rules: RetryRules } | { error: string } {
  const parsed = RetryRulesSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { error: `Invalid retryRules${issue?.path?.length ? ` at ${issue.path.join('.')}` : ''}: ${issue?.message || 'invalid'}` };
  }
  return { rules: parsed.data };
}

/**
 * Legacy column values that mirror a rule set, so engines that still read the old columns
 * (ElevenLabs / Twilio paths) keep working after the client saves `retryRules`.
 */
export function legacyColumnsFrom(rules: RetryRules): {
  retryEnabled: boolean; retryOnNoAnswer: boolean; retryOnBusy: boolean; retryOnFailed: boolean;
  retryIntervalMinutes: number; retryMaxAttempts: number;
} {
  const enabledRules = RETRY_OUTCOMES.filter(k => rules[k].enabled).map(k => rules[k]);
  return {
    retryEnabled: enabledRules.length > 0,
    retryOnNoAnswer: rules.no_answer.enabled,
    retryOnBusy: rules.busy.enabled,
    retryOnFailed: rules.failed.enabled,
    retryIntervalMinutes: (rules.no_answer.enabled ? rules.no_answer : enabledRules[0] || rules.no_answer).delayMinutes,
    retryMaxAttempts: Math.max(1, ...(enabledRules.length ? enabledRules : [rules.no_answer]).map(r => r.maxAttempts)),
  };
}
