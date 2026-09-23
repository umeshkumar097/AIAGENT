import type { WhatsAppMessageType } from '../types';

/**
 * Inbound WhatsApp payload parsing shared by the Meta Cloud API webhook and the Waki webhook.
 * Waki (WhatsWay-compatible) relays either the raw Meta envelope or a flat `message.received`
 * event, so `parseWakiPayload` accepts both and returns one normalized shape.
 */

export interface ExtractedContent {
  content: string;
  messageType: WhatsAppMessageType;
  mediaUrl: string | null;
  mediaMimeType: string | null;
  metadata: Record<string, any>;
}

export interface NormalizedInbound extends ExtractedContent {
  /** Provider message id (used for de-duplication). */
  messageId: string;
  from: string;
  contactName: string;
  contactWaId: string;
  receivedAt: Date;
}

export interface NormalizedStatus {
  messageId: string;
  status: string;
  errorMessage: string | null;
}

export interface ParsedInboundPayload {
  messages: NormalizedInbound[];
  statuses: NormalizedStatus[];
  /** True when nothing in the body looked like a WhatsApp event (logged, not an error). */
  unrecognized: boolean;
}

const MESSAGE_TYPES = new Set<string>([
  'text', 'template', 'image', 'document', 'audio', 'video', 'reaction',
  'button', 'interactive', 'sticker', 'location', 'contacts',
]);

function toMessageType(type: string): WhatsAppMessageType {
  return (MESSAGE_TYPES.has(type) ? type : 'unknown') as WhatsAppMessageType;
}

/** Meta Cloud API message object → stored content. */
export function extractMessageContent(message: any): ExtractedContent {
  const type = message.type || 'unknown';
  let content = '';
  let messageType: WhatsAppMessageType = toMessageType(type);
  let mediaUrl: string | null = null;
  let mediaMimeType: string | null = null;
  let metadata: Record<string, any> = {};

  switch (type) {
    case 'text':
      content = message.text?.body || '';
      break;
    case 'image':
      content = message.image?.caption || '[Image]';
      mediaUrl = message.image?.id || null;
      mediaMimeType = message.image?.mime_type || 'image/jpeg';
      metadata = { mediaId: message.image?.id, sha256: message.image?.sha256 };
      break;
    case 'video':
      content = message.video?.caption || '[Video]';
      mediaUrl = message.video?.id || null;
      mediaMimeType = message.video?.mime_type || 'video/mp4';
      metadata = { mediaId: message.video?.id };
      break;
    case 'audio':
      content = '[Audio]';
      mediaUrl = message.audio?.id || null;
      mediaMimeType = message.audio?.mime_type || 'audio/ogg';
      metadata = { mediaId: message.audio?.id };
      break;
    case 'document':
      content = message.document?.filename || '[Document]';
      mediaUrl = message.document?.id || null;
      mediaMimeType = message.document?.mime_type || 'application/octet-stream';
      metadata = { mediaId: message.document?.id, filename: message.document?.filename };
      break;
    case 'sticker':
      content = '[Sticker]';
      mediaUrl = message.sticker?.id || null;
      mediaMimeType = message.sticker?.mime_type || 'image/webp';
      metadata = { mediaId: message.sticker?.id };
      break;
    case 'reaction':
      content = message.reaction?.emoji || '';
      metadata = { reactedMessageId: message.reaction?.message_id };
      break;
    case 'button':
      content = message.button?.text || '';
      metadata = { payload: message.button?.payload };
      break;
    case 'interactive':
      if (message.interactive?.type === 'button_reply') {
        content = message.interactive.button_reply?.title || '';
        metadata = { buttonId: message.interactive.button_reply?.id };
      } else if (message.interactive?.type === 'list_reply') {
        content = message.interactive.list_reply?.title || '';
        metadata = { listId: message.interactive.list_reply?.id, description: message.interactive.list_reply?.description };
      } else {
        content = '[Interactive]';
      }
      break;
    case 'location':
      content = `[Location: ${message.location?.latitude}, ${message.location?.longitude}]`;
      metadata = { latitude: message.location?.latitude, longitude: message.location?.longitude, name: message.location?.name, address: message.location?.address };
      break;
    case 'contacts': {
      const firstContact = message.contacts?.[0];
      content = firstContact?.name?.formatted_name || '[Contact]';
      metadata = { contacts: message.contacts };
      break;
    }
    default:
      content = `[${type}]`;
      messageType = 'unknown';
  }

  return { content, messageType, mediaUrl, mediaMimeType, metadata };
}

function parseTimestamp(raw: unknown): Date {
  if (raw == null || raw === '') return new Date();
  if (raw instanceof Date) return raw;
  const asNumber = typeof raw === 'number' ? raw : Number(raw);
  if (Number.isFinite(asNumber) && asNumber > 0) {
    // Meta sends epoch seconds; some relays send milliseconds
    return new Date(asNumber < 1e12 ? asNumber * 1000 : asNumber);
  }
  const parsed = new Date(String(raw));
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function digitsOnly(value: unknown): string {
  return String(value ?? '').replace(/[^0-9]/g, '');
}

/** Meta-style `value` object (messages/contacts/statuses) → normalized. */
function fromMetaValue(value: any, out: ParsedInboundPayload): void {
  const contactName = value.contacts?.[0]?.profile?.name || '';
  const contactWaId = value.contacts?.[0]?.wa_id || '';
  for (const message of value.messages || []) {
    if (!message || !message.from) continue;
    out.messages.push({
      ...extractMessageContent(message),
      messageId: String(message.id || ''),
      from: digitsOnly(message.from),
      contactName,
      contactWaId,
      receivedAt: parseTimestamp(message.timestamp),
    });
  }
  for (const status of value.statuses || []) {
    if (!status?.id || !status.status) continue;
    out.statuses.push({
      messageId: String(status.id),
      status: String(status.status),
      errorMessage: status.errors?.[0]?.message || null,
    });
  }
}

function eventName(event: any): string {
  return String(event?.event || event?.type || event?.name || '').toLowerCase();
}

/** Flat Waki / WhatsWay event (`{ event: 'message.received', data: {...} }` or a bare message). */
function fromFlatEvent(event: any, out: ParsedInboundPayload): boolean {
  const data = event?.data || event?.message || event?.payload || event;
  if (!data || typeof data !== 'object') return false;

  const name = eventName(event);
  const statusValue = data.status || data.messageStatus;
  if (name.includes('status') && (data.messageId || data.id || data.whatsappMessageId) && statusValue) {
    out.statuses.push({
      messageId: String(data.whatsappMessageId || data.messageId || data.id),
      status: String(statusValue).toLowerCase(),
      errorMessage: data.error || data.errorMessage || null,
    });
    return true;
  }

  const from = data.from || data.phone || data.contactPhone || data.wa_id || data.waId || data.sender;
  if (!from) return false;

  // Our own outbound echoed back: recognized, but never something to reply to
  const direction = String(data.direction || '').toLowerCase();
  if (direction === 'outbound' || data.fromMe === true || data.isFromMe === true) return true;

  const rawText = data.text?.body ?? data.text ?? data.body ?? data.message ?? data.content ?? '';
  const text = typeof rawText === 'string' ? rawText : String(rawText?.body ?? '');
  const type = String(data.type || data.messageType || 'text').toLowerCase();
  const mediaUrl = data.mediaUrl || data.media?.url || data.mediaId || data.media?.id || null;

  out.messages.push({
    content: text || (type !== 'text' ? `[${type}]` : ''),
    messageType: toMessageType(type),
    mediaUrl: mediaUrl ? String(mediaUrl) : null,
    mediaMimeType: data.mimeType || data.media?.mimeType || data.mediaMimeType || null,
    metadata: { source: 'waki', event: name || 'message.received' },
    messageId: String(data.whatsappMessageId || data.messageId || data.id || data.wamid || ''),
    from: digitsOnly(from),
    contactName: data.contactName || data.name || data.profileName || data.profile?.name || '',
    contactWaId: digitsOnly(data.wa_id || data.waId || from),
    receivedAt: parseTimestamp(data.timestamp || data.createdAt || data.receivedAt || event?.timestamp),
  });
  return true;
}

/** Accepts a Meta envelope, a single flat event, or an array of flat events. */
export function parseWakiPayload(body: any): ParsedInboundPayload {
  const out: ParsedInboundPayload = { messages: [], statuses: [], unrecognized: false };
  if (!body || typeof body !== 'object') {
    out.unrecognized = true;
    return out;
  }

  const events = Array.isArray(body) ? body : [body];
  let matched = false;
  for (const event of events) {
    if (Array.isArray(event?.entry)) {
      for (const entry of event.entry) {
        for (const change of entry?.changes || []) {
          if (change?.value) {
            fromMetaValue(change.value, out);
            matched = true;
          }
        }
      }
      continue;
    }
    if (event?.messages || event?.statuses) {
      fromMetaValue(event, out);
      matched = true;
      continue;
    }
    if (fromFlatEvent(event, out)) matched = true;
  }

  out.unrecognized = !matched;
  return out;
}
