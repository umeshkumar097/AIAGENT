import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { whatsAppConversationService } from '../services/whatsapp-conversation.service';
import { metaWhatsAppAdminService } from '../services/meta-whatsapp-admin.service';
import { metaWhatsAppService } from '../services/meta-whatsapp.service';
import { extractMessageContent } from '../services/whatsapp-inbound-parser';
import { whatsAppAutoReplyService } from '../services/whatsapp-auto-reply.service';
const router = Router();

function getConversationService() {
  return whatsAppConversationService;
}

function getAdminService() {
  return metaWhatsAppAdminService;
}

function getMetaService() {
  return metaWhatsAppService;
}

function verifySignature(rawBody: Buffer | string, signatureHeader: string, appSecret: string): boolean {
  if (!signatureHeader || !appSecret) return false;
  try {
    const expectedSignature = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

router.get('/webhook', async (req: Request, res: Response) => {
  try {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    console.log(`[Meta Webhook] Verification request: mode=${mode}, token=${token ? token.substring(0, 8) + '...' : '(empty)'}, challenge=${challenge ? 'present' : 'missing'}`);

    if (mode !== 'subscribe') {
      console.log('[Meta Webhook] Verification failed: mode is not subscribe');
      return res.status(403).send('Forbidden');
    }

    const admin = getAdminService();
    const config = await admin.getConfig();
    const storedToken = config?.webhookVerifyToken || '';

    console.log(`[Meta Webhook] Stored token: ${storedToken ? storedToken.substring(0, 8) + '...' : '(empty)'}, Received token: ${token ? token.substring(0, 8) + '...' : '(empty)'}`);

    if (!storedToken || token !== storedToken) {
      console.log('[Meta Webhook] Verification failed: token mismatch');
      return res.status(403).send('Forbidden');
    }

    console.log('[Meta Webhook] Verification successful — returning challenge');
    return res.status(200).send(challenge);
  } catch (error: any) {
    console.error('[Meta Webhook] Verification error:', error.message);
    return res.status(403).send('Forbidden');
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signatureHeader = req.headers['x-hub-signature-256'] as string;
    const admin = getAdminService();
    const config = await admin.getConfig();
    const appSecret = config?.metaAppSecret || '';

    if (appSecret) {
      if (!signatureHeader) {
        console.warn('[Meta Webhook] Missing X-Hub-Signature-256 header — rejecting');
        return res.status(401).send('Unauthorized');
      }

      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        console.warn('[Meta Webhook] rawBody not captured — rejecting (ensure raw body middleware is active)');
        return res.status(500).send('Server configuration error');
      }

      if (!verifySignature(Buffer.from(rawBody as Uint8Array), signatureHeader, appSecret)) {
        console.warn('[Meta Webhook] Invalid HMAC signature — rejecting');
        return res.status(403).send('Forbidden');
      }
    }

    const body = req.body;
    if (body?.object !== 'whatsapp_business_account') {
      return res.status(200).send('OK');
    }

    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const value = change.value;
        if (!value) continue;

        if (value.messages && Array.isArray(value.messages)) {
          await processInboundMessages(value);
        }

        if (value.statuses && Array.isArray(value.statuses)) {
          await processStatusUpdates(value.statuses);
        }
      }
    }
  } catch (error: any) {
    console.error('[Meta Webhook] Error processing webhook:', error.message);
  }

  return res.status(200).send('OK');
});

async function processInboundMessages(value: any): Promise<void> {
  const phoneNumberId = value.metadata?.phone_number_id;
  if (!phoneNumberId) {
    console.warn('[Meta Webhook] No phone_number_id in metadata');
    return;
  }

  const convService = getConversationService();
  const meta = getMetaService();

  let userId = await convService.findUserByPhoneNumberId(phoneNumberId);
  if (!userId) {
    const wabaId = value.metadata?.waba_id;
    if (wabaId) {
      const wabaMatch = await convService.findUserByWabaId(wabaId);
      if (wabaMatch) {
        console.log(`[Meta Webhook] phone_number_id mismatch detected. Auto-healing via WABA lookup`);
        await convService.updatePhoneNumberId(wabaMatch.userId, phoneNumberId);
        userId = wabaMatch.userId;
      }
    }
    if (!userId) {
      console.warn(`[Meta Webhook] No user found for incoming phone_number_id`);
      return;
    }
  }

  const contactName = value.contacts?.[0]?.profile?.name || '';
  const contactWaId = value.contacts?.[0]?.wa_id || '';

  for (const message of value.messages) {
    try {
      const isDuplicate = await convService.isDuplicateMessage(message.id);
      if (isDuplicate) {
        console.log(`[Meta Webhook] Skipping duplicate message: ${message.id}`);
        continue;
      }

      let conversation = await convService.getOrCreateConversation(
        userId,
        message.from,
        contactName,
        contactWaId
      );
      conversation = await whatsAppAutoReplyService.applyUserDefaults(userId, conversation);

      await convService.refreshWindow(conversation.id);

      const { content, messageType, mediaUrl, mediaMimeType, metadata } = extractMessageContent(message);

      const stored = await convService.addMessage({
        conversationId: conversation.id,
        userId,
        direction: 'inbound',
        senderType: 'customer',
        messageType,
        content,
        metaMessageId: message.id,
        mediaUrl,
        mediaMimeType,
        metadata,
      });

      meta.markMessageRead(userId, message.id).catch(() => {});

      console.log(`[Meta Webhook] Inbound message from ${message.from} stored (${message.id})`);

      const tsSeconds = Number(message.timestamp);
      const receivedAt = Number.isFinite(tsSeconds) && tsSeconds > 0 ? new Date(tsSeconds * 1000) : new Date();
      void whatsAppAutoReplyService.handleInbound({ userId, conversation, message: stored, provider: 'meta', receivedAt });
    } catch (error: any) {
      console.error(`[Meta Webhook] Error processing message ${message.id}:`, error.message);
    }
  }
}

async function processStatusUpdates(statuses: any[]): Promise<void> {
  const convService = getConversationService();

  for (const status of statuses) {
    try {
      const errorMessage = status.errors?.[0]?.message || null;
      await convService.updateMessageStatus(status.id, status.status, errorMessage);
    } catch (error: any) {
      console.error(`[Meta Webhook] Error processing status update for ${status.id}:`, error.message);
    }
  }
}

export default router;
