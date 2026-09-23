import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

/**
 * Call outcomes (shared const CALL_OUTCOMES on the server). Agent-set ones come from the
 * `set_call_outcome` tool, system ones from Plivo status / AMD / transfer / booking.
 */
export const CALL_OUTCOME_IDS = [
  'interested', 'not_interested', 'callback_requested', 'wrong_number', 'already_customer', 'do_not_call', 'no_decision',
  'voicemail', 'no_answer', 'busy', 'failed', 'transferred', 'appointment_booked',
] as const;
export type CallOutcomeId = typeof CALL_OUTCOME_IDS[number];

export interface OutcomeOption { id: string; label: string; kind: 'agent' | 'system' }

const GREEN = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
const AMBER = "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
const ROSE = "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
const SLATE = "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20";
const VIOLET = "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20";
const SKY = "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20";

const STYLE: Record<string, string> = {
  interested: GREEN, appointment_booked: GREEN, already_customer: SKY,
  callback_requested: AMBER, transferred: VIOLET, no_decision: SLATE,
  not_interested: ROSE, wrong_number: ROSE, do_not_call: ROSE, failed: ROSE,
  voicemail: AMBER, no_answer: SLATE, busy: SLATE,
};

const FALLBACK_LABELS: Record<string, string> = {
  interested: 'Interested', not_interested: 'Not interested', callback_requested: 'Callback requested',
  wrong_number: 'Wrong number', already_customer: 'Already a customer', do_not_call: 'Do not call',
  no_decision: 'No decision', voicemail: 'Voicemail', no_answer: 'No answer', busy: 'Busy',
  failed: 'Failed', transferred: 'Transferred', appointment_booked: 'Appointment booked',
};

export function useOutcomeLabel(): (id: string) => string {
  const { t } = useTranslation();
  return (id: string) => t(`callOutcomes.${id}`, FALLBACK_LABELS[id] || id.replace(/_/g, ' '));
}

/** Filter options from GET /api/calls/outcomes, with the shared list as a fallback while loading / on old servers. */
export function useOutcomeOptions(): OutcomeOption[] {
  const label = useOutcomeLabel();
  const q = useQuery<{ outcomes: OutcomeOption[] }>({ queryKey: ["/api/calls/outcomes"], staleTime: 600000, retry: false });
  const fromServer = q.data?.outcomes;
  if (Array.isArray(fromServer) && fromServer.length > 0) {
    return fromServer.map(o => ({ id: o.id, label: o.label || label(o.id), kind: o.kind === 'system' ? 'system' : 'agent' }));
  }
  const systemSet = new Set(['voicemail', 'no_answer', 'busy', 'failed', 'transferred', 'appointment_booked']);
  return CALL_OUTCOME_IDS.map(id => ({ id, label: label(id), kind: systemSet.has(id) ? 'system' : 'agent' }));
}

/** Outcome of a call row: the new `outcome` field, else metadata.outcome (older rows). */
export function callOutcome(call: { outcome?: string | null; metadata?: Record<string, unknown> | null }): string | null {
  if (typeof call.outcome === 'string' && call.outcome) return call.outcome;
  const m = call.metadata?.outcome;
  return typeof m === 'string' && m ? m : null;
}

export function OutcomeBadge({ outcome, className = "" }: { outcome: string | null | undefined; className?: string }) {
  const label = useOutcomeLabel();
  if (!outcome) return null;
  return (
    <Badge className={`${STYLE[outcome] || SLATE} ${className}`} data-testid={`badge-outcome-${outcome}`}>
      {label(outcome)}
    </Badge>
  );
}
