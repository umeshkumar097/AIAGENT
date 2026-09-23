/**
 * `save_lead` — capture the caller's details during the call. Upserts `leads` by
 * (userId, phone) scoped like the CRM processor (campaign vs incoming), feeds the integrations
 * hub, and records `metadata.leadCaptured` on the call so the post-call processor updates the
 * same row instead of creating another.
 */
import { and, eq } from 'drizzle-orm';
import { db } from '../../db';
import { leads, type Lead, type InsertLead } from '@shared/schema';
import { CRMStorage } from '../../storage/crm-storage';
import { integrationHub } from '../../integrations/hub';
import { logger } from '../../utils/logger';
import type { CallTool, CallToolResult } from '../call-messaging-tools';
import type { CallActionContext } from './types';
import { mergeCallMetadata } from './call-meta';
import { EMAIL_RE, normalizePhone, str } from './util';

const SOURCE = 'CallActions';
const KEY_RE = /^[A-Za-z_][A-Za-z0-9_]{0,39}$/;
const RESERVED = new Set(['firstName', 'lastName', 'email', 'phone', 'company', 'notes']);

interface CustomField { key: string; label: string; required: boolean }

function customFields(ctx: CallActionContext): CustomField[] {
  return (ctx.actions.saveLead?.fields || [])
    .filter(f => f && KEY_RE.test(str(f.key)) && !RESERVED.has(str(f.key)) && str(f.label))
    .slice(0, 8)
    .map(f => ({ key: str(f.key), label: str(f.label), required: !!f.required }));
}

/** The lead the CRM processor would match for this call: campaign-scoped, else incoming, else any. */
async function findLead(ctx: CallActionContext, phone: string): Promise<Lead | null> {
  const scope = ctx.campaignId ? eq(leads.campaignId, ctx.campaignId) : eq(leads.sourceType, 'incoming');
  const [scoped] = await db.select().from(leads).where(and(eq(leads.userId, ctx.userId), eq(leads.phone, phone), scope)).limit(1);
  if (scoped) return scoped;
  const [any] = await db.select().from(leads).where(and(eq(leads.userId, ctx.userId), eq(leads.phone, phone))).limit(1);
  return any || null;
}

export function buildSaveLeadTool(ctx: CallActionContext): CallTool | null {
  if (!ctx.actions.saveLead) return null;
  const fields = customFields(ctx);

  const properties: Record<string, unknown> = {
    firstName: { type: 'string', description: "The caller's first name." },
    lastName: { type: 'string', description: "The caller's last name, if given." },
    email: { type: 'string', description: 'Email address, if given.' },
    phone: { type: 'string', description: 'Phone number with country code. Omit to use the number they are calling from.' },
    company: { type: 'string', description: 'Company or organisation, if relevant.' },
    notes: { type: 'string', description: 'What the caller wants, in one or two short sentences.' },
  };
  for (const f of fields) properties[f.key] = { type: 'string', description: f.label };
  const required = ['firstName', ...fields.filter(f => f.required).map(f => f.key)];
  const extra = fields.length ? ` Also collect: ${fields.map(f => `${f.label}${f.required ? ' (required)' : ''}`).join(', ')}.` : '';

  return {
    definition: {
      type: 'function',
      function: {
        name: 'save_lead',
        description: `Save the caller's details as a lead once you know their name and what they need. Call it once per call; call again to add details.${extra}`,
        parameters: { type: 'object', properties, required },
      },
    },
    handler: async (args): Promise<CallToolResult> => {
      const firstName = str(args.firstName);
      if (!firstName) return { success: false, message: 'Ask the caller for their name first.' };
      const phone = normalizePhone(str(args.phone)) || ctx.callerPhone;
      if (!phone) return { success: false, message: 'Ask the caller for a phone number.' };
      const email = str(args.email);
      const custom: Record<string, string> = {};
      const missing: string[] = [];
      for (const f of fields) {
        const v = str(args[f.key]);
        if (v) custom[f.key] = v;
        else if (f.required) missing.push(f.label);
      }
      if (missing.length) return { success: false, message: `Ask the caller for: ${missing.join(', ')}.` };
      const notes = str(args.notes);
      if (notes) custom.callNotes = notes;

      const details = {
        firstName,
        lastName: str(args.lastName) || undefined,
        email: email && EMAIL_RE.test(email) ? email : undefined,
        company: str(args.company) || undefined,
      };

      try {
        const existing = await findLead(ctx, phone);
        let lead: Lead | null;
        if (existing) {
          const updates: Partial<InsertLead> = {
            ...details,
            customFields: { ...(existing.customFields || {}), ...custom },
            lastCallAt: new Date(),
            plivoCallId: existing.plivoCallId || ctx.callId,
          };
          lead = await CRMStorage.updateLead(existing.id, ctx.userId, updates);
        } else {
          lead = await CRMStorage.createLead({
            userId: ctx.userId,
            sourceType: ctx.campaignId ? 'campaign' : 'incoming',
            campaignId: ctx.campaignId || null,
            phone,
            ...details,
            customFields: custom,
            stage: 'new',
            plivoCallId: ctx.callId,
            lastCallAt: new Date(),
            totalCalls: 1,
            aiNextAction: 'Follow up on the request captured during the call',
          });
        }
        if (!lead) return { success: false, message: 'The details could not be saved. Continue the call and try once more later.' };

        void integrationHub.onLeadUpserted(ctx.userId, lead, { created: !existing, callData: null });
        void mergeCallMetadata(ctx.callId, {
          customerPhone: phone,
          leadCaptured: { leadId: lead.id, ...details, phone, customFields: custom, capturedAt: new Date().toISOString() },
        });
        logger.info(`[CallActions] Lead ${lead.id} ${existing ? 'updated' : 'created'} from call ${ctx.callId}`, undefined, SOURCE);
        return { success: true, message: `Saved ${firstName}'s details. Carry on with the conversation; do not read them back.`, data: { leadId: lead.id } };
      } catch (e: any) {
        logger.error(`[CallActions] save_lead failed on call ${ctx.callId}: ${e.message}`, e, SOURCE);
        return { success: false, message: 'The details could not be saved right now. Continue the call.' };
      }
    },
  };
}
