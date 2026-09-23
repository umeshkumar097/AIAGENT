/**
 * `mark_do_not_call` — always available on Sarvam calls. Adds the caller's number to the owner's
 * do-not-call list and tags the call outcome; the model then confirms and calls end_call itself.
 */
import { logger } from '../../utils/logger';
import { addDoNotCall } from '../dnd-service';
import { setCallOutcome } from '../../engines/plivo/services/call-outcome';
import type { CallTool } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { normalizePhone, str } from './util';

const SOURCE = 'CallActions';

export function buildDoNotCallTool(ctx: CallActionContext): CallTool | null {
  return {
    definition: {
      type: 'function',
      function: {
        name: 'mark_do_not_call',
        description: "Add the caller's number to the do-not-call list when they ask not to be called again, want their number removed, or ask to unsubscribe. Call it once, then confirm in one sentence and end the call.",
        parameters: {
          type: 'object',
          properties: {
            reason: { type: 'string', description: 'What the caller said, in a few words.' },
            phone: { type: 'string', description: 'Only if the caller gives a different number to block.' },
          },
        },
      },
    },
    handler: async (args) => {
      // Only the caller's own number can be listed: a model-supplied number is accepted only when it
      // is the same line (last 6 digits match); anything else falls back to the caller's number.
      const given = normalizePhone(str(args.phone));
      const sameLine = given && ctx.callerPhone && given.slice(-6) === ctx.callerPhone.slice(-6);
      const phone = ctx.callerPhone || (sameLine ? given : '');
      if (!phone) return { success: false, message: 'This call has no caller number to block. Tell the caller you have noted their request.' };
      try {
        const { added } = await addDoNotCall({
          userId: ctx.userId, phone, reason: 'caller_request', source: 'agent', callId: ctx.callId, note: str(args.reason) || null,
        });
        await setCallOutcome(ctx.callId, 'do_not_call', 'agent');
        logger.info(`[CallActions] mark_do_not_call on ${ctx.callUuid} (${added ? 'added' : 'already listed'})`, undefined, SOURCE);
        return {
          success: true,
          message: 'Done — the number will not be called again. Apologise briefly, confirm this in one sentence, then call end_call.',
        };
      } catch (e: any) {
        logger.error(`[CallActions] mark_do_not_call failed on ${ctx.callId}: ${e.message}`, e, SOURCE);
        return { success: false, message: 'Could not update the list right now. Tell the caller you have noted it and end the call politely.' };
      }
    },
  };
}
