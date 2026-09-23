/**
 * `transfer_call` — the handler only *requests* the transfer. The Sarvam bridge performs it
 * (plivo-transfer.ts) once the model's follow-up sentence has been spoken, so the caller hears
 * "connecting you now" before the stream is stopped.
 */
import { logger } from '../../utils/logger';
import type { CallTool } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { str } from './util';

export function buildTransferTool(ctx: CallActionContext): CallTool | null {
  const target = str(ctx.agent.transferPhoneNumber);
  if (!ctx.agent.transferEnabled || target.replace(/\D/g, '').length < 6) return null;

  return {
    definition: {
      type: 'function',
      function: {
        name: 'transfer_call',
        description: 'Transfer this call to a human team member. Use it when the caller asks for a person, or when the request is beyond what you can handle. Say you are connecting them, then call this.',
        parameters: {
          type: 'object',
          properties: {
            reason: { type: 'string', description: 'Why the caller needs a human, in a few words.' },
          },
        },
      },
    },
    handler: async (args) => {
      logger.info(`[CallActions] transfer_call requested on ${ctx.callUuid}${str(args.reason) ? ` (${str(args.reason).substring(0, 80)})` : ''}`, undefined, 'CallActions');
      return {
        success: true,
        message: 'Tell the caller you are connecting them now, in one short sentence.',
        action: 'transfer',
        phoneNumber: target,
      };
    },
  };
}
