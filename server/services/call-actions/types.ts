/**
 * Shared context for the call-time action tools (transfer, appointments, save lead,
 * callbacks, custom API lookups). Built once per call by plivo-stream.ts.
 */
import type { AgentActionsConfig } from '@shared/schema';
import type { CallTool } from '../call-messaging-tools';

/** The columns of the `agents` row the action tools read (plivo-stream selects a subset). */
export interface CallActionAgent {
  id: string;
  name?: string | null;
  transferEnabled?: boolean | null;
  transferPhoneNumber?: string | null;
  appointmentBookingEnabled?: boolean | null;
  messagingWhatsappTemplate?: string | null;
  messagingWhatsappTemplates?: string[] | null;
  messagingEmailTemplate?: string | null;
  messagingEmailTemplates?: string[] | null;
  config?: unknown;
}

export interface CallActionContext {
  userId: string;
  agentId: string;
  callId: string;
  callUuid: string;
  fromNumber: string;
  toNumber: string;
  callDirection: 'inbound' | 'outbound';
  /** The non-Plivo party: fromNumber on inbound, toNumber on outbound (normalised, may be ''). */
  callerPhone: string;
  plivoPhoneNumberId: string | null;
  plivoCredentialId: string | null;
  campaignId?: string | null;
  agent: CallActionAgent;
  actions: AgentActionsConfig;
  language: string;
  /** The messaging tools built for this call (used for appointment confirmations). */
  messagingTools?: CallTool[];
}
