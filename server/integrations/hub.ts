import { eq } from "drizzle-orm";
import { db } from "../db";
import { appointments, type leads, type UserIntegration } from "@shared/schema";
import { getProvider } from "./providers";
import {
  findExternalId, listIntegrationRows, logSync, logSyncResults, markIntegrationError, markIntegrationSynced, wasRecentlySynced,
} from "./token-store";
import { asObject, eventSourceId, str } from "./normalize";
import { ProviderAuthError, errorMessage, type EventData, type HandleContext } from "./types";

const ROW_CACHE_TTL_MS = 10_000;
const DEDUPE_WINDOW_MS = 5 * 60_000;
const LOG = "[Integrations]";

type LeadRow = typeof leads.$inferSelect;

/** Structural subset of the CRM processor's CallData so this module does not import the processor */
export interface LeadCallContext {
  id: string;
  callDirection?: string | null;
  duration?: number | null;
  transcript?: string | null;
  aiSummary?: string | null;
  fromNumber?: string | null;
  toNumber?: string | null;
  phoneNumber?: string | null;
  engine?: string;
  campaignId?: string | null;
}

export interface LeadUpsertContext {
  created: boolean;
  callData?: LeadCallContext | null;
}

const LEAD_PUBLIC_FIELDS = [
  "id", "firstName", "lastName", "phone", "email", "company", "stage", "leadScore", "aiSummary", "aiNextAction", "sentiment", "aiCategory",
  "hasAppointment", "hasFormSubmission", "hasTransfer", "hasCallback", "appointmentDate", "appointmentDetails", "formData", "transferredTo",
  "tags", "sourceType", "campaignId", "totalCalls", "lastCallAt", "createdAt", "updatedAt",
] as const;

const rowCache = new Map<string, { at: number; rows: UserIntegration[] }>();

export function invalidateIntegrationCache(userId: string): void {
  rowCache.delete(userId);
}

async function connectedRows(userId: string): Promise<UserIntegration[]> {
  const cached = rowCache.get(userId);
  if (cached && Date.now() - cached.at < ROW_CACHE_TTL_MS) return cached.rows;
  const rows = (await listIntegrationRows(userId)).filter((r) => r.status === "connected");
  rowCache.set(userId, { at: Date.now(), rows });
  return rows;
}

function publicLead(lead: LeadRow): Record<string, unknown> {
  const source = lead as unknown as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of LEAD_PUBLIC_FIELDS) out[key] = source[key] ?? null;
  return out;
}

/** The app never emits `appointment.booked` itself, so the hub derives it from the appointment the call created. */
async function appointmentPayloadForLead(lead: LeadRow, callId: string | null): Promise<EventData | null> {
  const details = asObject(lead.appointmentDetails);
  const apptId = str(details?.appointmentId);
  let row: typeof appointments.$inferSelect | undefined;
  if (apptId) [row] = await db.select().from(appointments).where(eq(appointments.id, apptId)).limit(1);
  if (!row && callId) [row] = await db.select().from(appointments).where(eq(appointments.callId, callId)).limit(1);
  if (row) {
    if (row.status === "cancelled") return null;
    return {
      appointment: {
        id: row.id, type: row.serviceName, status: row.status, scheduledDate: row.appointmentDate, scheduledTime: row.appointmentTime,
        duration: row.duration, notes: row.notes,
      },
      contact: { name: row.contactName, phone: row.contactPhone, email: row.contactEmail, company: lead.company },
      call: row.callId ? { id: row.callId } : null,
      lead: { id: lead.id },
    };
  }
  const date = str(details?.date);
  const time = str(details?.time);
  if (!date || !time) return null;
  return {
    appointment: { id: `lead-${lead.id}`, type: str(details?.serviceName), status: "scheduled", scheduledDate: date, scheduledTime: time, duration: Number(details?.duration) || 30, notes: null },
    contact: { name: str(details?.contactName) ?? ([lead.firstName, lead.lastName].filter(Boolean).join(" ") || null), phone: str(details?.contactPhone) ?? lead.phone, email: lead.email, company: lead.company },
    call: callId ? { id: callId } : null,
    lead: { id: lead.id },
  };
}

class IntegrationHub {
  /** Fire-and-forget: routes an app event to every connected provider for the user. Never throws. */
  dispatch(userId: string, event: string, data: EventData): void {
    if (!userId || event === "webhook.test") return;
    this.run(userId, event, data).catch((err) => console.error(`${LOG} dispatch ${event} failed:`, errorMessage(err)));
  }

  private async run(userId: string, event: string, data: EventData): Promise<void> {
    const rows = await connectedRows(userId);
    if (!rows.length) return;
    const sourceId = eventSourceId(event, data);
    await Promise.allSettled(rows.map((row) => this.runProvider(row, event, data, sourceId)));
  }

  private async runProvider(row: UserIntegration, event: string, data: EventData, sourceId: string | null): Promise<void> {
    const provider = getProvider(row.provider);
    if (!provider || !provider.supports(event, row)) return;
    if (sourceId && await wasRecentlySynced(row.userId, row.provider, event, sourceId, DEDUPE_WINDOW_MS)) return;
    const ctx: HandleContext = {
      userId: row.userId,
      sourceId,
      findExternalId: (action, id) => findExternalId(row.provider, id, action, row.userId),
    };
    try {
      const results = await provider.handle(row, event, data, ctx);
      await logSyncResults(row.userId, row.provider, event, results);
      const failed = results.find((r) => r.status === "failed");
      if (results.some((r) => r.status === "success")) await markIntegrationSynced(row.id, failed?.error ?? null);
      else if (failed) await markIntegrationError(row.id, failed.error ?? "Sync failed");
    } catch (err) {
      const message = errorMessage(err);
      console.error(`${LOG} ${row.provider} ${event} failed for user ${row.userId}: ${message}`);
      await logSync({ userId: row.userId, provider: row.provider, event, action: "handle", status: "failed", sourceId, error: message });
      const authFailure = err instanceof ProviderAuthError;
      await markIntegrationError(row.id, message, authFailure ? "error" : undefined);
      if (authFailure) invalidateIntegrationCache(row.userId);
    }
  }

  /** Called by the CRM lead processor after a lead row was created/updated from a call. Never throws. */
  async onLeadUpserted(userId: string, lead: LeadRow, context: LeadUpsertContext): Promise<void> {
    try {
      const rows = await connectedRows(userId);
      if (!rows.length) return;
      const call = context.callData;
      this.dispatch(userId, "lead.upserted", {
        lead: publicLead(lead),
        created: context.created,
        call: call ? {
          id: call.id, direction: call.callDirection ?? null, duration: call.duration ?? null, summary: call.aiSummary ?? null,
          transcript: call.transcript ?? null, from: call.fromNumber ?? null, to: call.toNumber ?? null, engine: call.engine ?? null, campaignId: call.campaignId ?? null,
        } : null,
      });
      if (lead.hasAppointment) {
        const payload = await appointmentPayloadForLead(lead, call?.id ?? null);
        if (payload) this.dispatch(userId, "appointment.booked", payload);
      }
    } catch (err) {
      console.error(`${LOG} onLeadUpserted failed for user ${userId}:`, errorMessage(err));
    }
  }
}

export const integrationHub = new IntegrationHub();
