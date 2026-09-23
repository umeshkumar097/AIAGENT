/**
 * Call-time actions for Sarvam calls: assembles the tools an agent may call during a call
 * (transfer, appointments, save lead, callbacks, custom API lookups) and the short prompt rules
 * the Sarvam bridge appends to its system-prompt wrapper when those tools are present.
 */
import type { AgentActionsConfig } from '@shared/schema';
import { logger } from '../../utils/logger';
import type { CallTool } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { buildTransferTool } from './transfer';
import { buildAppointmentTools } from './appointments';
import { buildSaveLeadTool } from './leads';
import { buildCallbackTool } from './callbacks';
import { buildApiTools } from './api-tools';
import { buildDoNotCallTool } from './dnd';
import { buildOutcomeTool } from './outcome';
import { DAY_NAMES, DEFAULT_TIME_ZONE, isValidTimeZone, nowInZone } from './util';

export type { CallActionContext, CallActionAgent } from './types';
export { runApiTool } from './api-tools';

const SOURCE = 'CallActions';

/** `agents.config.actions`, or {} when absent/malformed. */
export function readActionsConfig(config: unknown): AgentActionsConfig {
  if (!config || typeof config !== 'object') return {};
  const actions = (config as { actions?: unknown }).actions;
  return actions && typeof actions === 'object' && !Array.isArray(actions) ? (actions as AgentActionsConfig) : {};
}

/** Build every enabled action tool for one call. Never throws — a failing group is skipped and logged. */
export async function buildCallActionTools(ctx: CallActionContext): Promise<CallTool[]> {
  const tools: CallTool[] = [];
  const groups: Array<[string, () => CallTool[] | CallTool | null]> = [
    ['transfer', () => buildTransferTool(ctx)],
    ['appointments', () => buildAppointmentTools(ctx)],
    ['save_lead', () => buildSaveLeadTool(ctx)],
    ['callback', () => buildCallbackTool(ctx)],
    ['api', () => buildApiTools(ctx)],
    // Always on for Sarvam calls
    ['do_not_call', () => buildDoNotCallTool(ctx)],
    ['outcome', () => buildOutcomeTool(ctx)],
  ];
  for (const [name, build] of groups) {
    try {
      const built = build();
      if (Array.isArray(built)) tools.push(...built);
      else if (built) tools.push(built);
    } catch (e: any) {
      logger.error(`Action tools "${name}" unavailable for agent ${ctx.agentId}: ${e.message}`, e, SOURCE);
    }
  }
  if (tools.length) {
    logger.info(`Call action tools for agent ${ctx.agentId}: ${tools.map(t => t.definition.function.name).join(', ')}`, undefined, SOURCE);
  }
  return tools;
}

/** True when any enabled action needs the wall clock (bookings / callbacks). */
export function needsClock(tools: CallTool[]): boolean {
  const names = new Set(tools.map(t => t.definition.function.name));
  return names.has('book_appointment') || names.has('check_availability') || names.has('schedule_callback');
}

/** Clock line appended to the latest user message (keeps the system prompt cache-stable). */
export function nowLine(timeZone: string = DEFAULT_TIME_ZONE): string {
  const tz = isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIME_ZONE;
  const now = nowInZone(tz);
  return `(Now: ${DAY_NAMES[now.weekday]} ${now.date}, ${now.time} ${tz})`;
}

/** 1–2 short lines per enabled action, for the Sarvam prompt wrapper. '' when none apply. */
export function actionPromptRules(tools: CallTool[], timeZone: string = DEFAULT_TIME_ZONE): string {
  const names = new Set(tools.map(t => t.definition.function.name));
  const lines: string[] = [];
  const hasBooking = names.has('book_appointment') || names.has('check_availability');
  const hasCallback = names.has('schedule_callback');

  if (hasBooking || hasCallback) {
    // The actual clock is appended to the latest user message (see `nowLine`) so the system
    // prompt stays byte-identical across turns and OpenAI prompt caching keeps working.
    lines.push(`- The current date and time (${isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIME_ZONE}) is given at the end of the caller's latest message. Work out "tomorrow" or "next Monday" as a YYYY-MM-DD date yourself.`);
  }
  if (hasBooking) lines.push('- Before booking, call check_availability and offer 2–3 slots. Confirm name, date and time in one sentence, then call book_appointment.');
  if (names.has('transfer_call')) lines.push('- When the caller asks for a person or the issue is beyond you, say you are connecting them and call transfer_call.');
  if (names.has('save_lead')) lines.push("- Capture the caller's name and requirement with save_lead before ending the call.");
  if (hasCallback) lines.push('- Confirm the exact date and time with the caller before schedule_callback.');
  if ([...names].some(n => n.startsWith('api_'))) lines.push("- Use api_* tools only for the caller's own data; never invent values. Relay the result in one short sentence.");
  if (names.has('mark_do_not_call')) lines.push('- If the caller asks not to be called again or wants their number removed: call mark_do_not_call, apologise in one sentence, then call end_call.');
  if (names.has('set_call_outcome')) lines.push('- Before ending the call, call set_call_outcome once with the best-fitting outcome (never mention it to the caller).');
  return lines.join('\n');
}
