/**
 * `set_call_outcome` — always available on Sarvam calls. The model tags the call once, before ending,
 * with the best-fitting agent outcome. `callback_requested` does not create a callback by itself
 * (schedule_callback does); `do_not_call` here does not touch the DND list (mark_do_not_call does).
 */
import { AGENT_CALL_OUTCOMES, type AgentCallOutcome } from '@shared/schema';
import { logger } from '../../utils/logger';
import { setCallOutcome } from '../../engines/plivo/services/call-outcome';
import type { CallTool } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { str } from './util';

const SOURCE = 'CallActions';

export function buildOutcomeTool(ctx: CallActionContext): CallTool | null {
  return {
    definition: {
      type: 'function',
      function: {
        name: 'set_call_outcome',
        description: 'Record how this call went. Call it once, just before ending the call, with the outcome that fits best: interested (wants to proceed), not_interested, callback_requested (asked to be contacted later), wrong_number, already_customer, do_not_call, no_decision (unclear / cut short).',
        parameters: {
          type: 'object',
          properties: {
            outcome: { type: 'string', enum: [...AGENT_CALL_OUTCOMES] },
            note: { type: 'string', description: 'One short line of context (optional).' },
          },
          required: ['outcome'],
        },
      },
    },
    handler: async (args) => {
      const outcome = str(args.outcome) as AgentCallOutcome;
      if (!AGENT_CALL_OUTCOMES.includes(outcome)) return { success: false, message: `Unknown outcome. Use one of: ${AGENT_CALL_OUTCOMES.join(', ')}.` };
      const note = str(args.note).substring(0, 300);
      const ok = await setCallOutcome(ctx.callId, outcome, 'agent', note ? { outcomeNote: note } : {});
      logger.info(`[CallActions] set_call_outcome ${outcome} on ${ctx.callUuid} (${ok ? 'saved' : 'not saved'})`, undefined, SOURCE);
      return { success: true, message: `Outcome recorded as ${outcome}. Continue the call naturally; do not mention this to the caller.` };
    },
  };
}
