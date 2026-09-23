import { Router, Request, Response } from 'express';
import { whatsAppConversationService } from '../services/whatsapp-conversation.service';
import { whatsAppAutoReplySettingsService } from '../services/whatsapp-auto-reply-settings.service';
import { whatsAppAutoReplyService } from '../services/whatsapp-auto-reply.service';
import { parseWakiPayload, type NormalizedInbound } from '../services/whatsapp-inbound-parser';

/**
 * Inbound webhook for Waki (WhatsWay-compatible) channels.
 *
 * URL: /api/webhooks/messaging/waki/:secret — the secret is per user (Messaging → WhatsApp →
 * "Auto-reply with agent"). Waki can relay either the raw Meta envelope or a flat
 * `message.received` event; both are normalized by parseWakiPayload. When the sender also signs
 * the body (`X-Webhook-Signature: sha256=<hmac>`), the signature is checked with the same secret.
 */

const router = Router();
const LOG = '[Waki Webhook]';

async function resolveUser(req: Request, res: Response): Promise<string | null> {
  const secret = String(req.params.secret || '');
  const userId = await whatsAppAutoReplySettingsService.findUserBySecret(secret);
  if (!userId) {
    console.warn(`${LOG} Unknown webhook secret — rejecting`);
    res.status(403).json({ success: false, error: 'Forbidden' });
    return null;
  }
  const signature = (req.headers['x-webhook-signature'] || req.headers['x-hub-signature-256']) as string | undefined;
  if (!whatsAppAutoReplySettingsService.verifySignature((req as any).rawBody, signature, secret)) {
    console.warn(`${LOG} Invalid webhook signature — rejecting`);
    res.status(403).json({ success: false, error: 'Forbidden' });
    return null;
  }
  return userId;
}

/** Verification ping (also echoes a Meta-style hub.challenge if Waki forwards one). */
router.get('/:secret', async (req: Request, res: Response) => {
  const userId = await resolveUser(req, res);
  if (!userId) return;
  const challenge = req.query['hub.challenge'];
  if (typeof challenge === 'string' && challenge) {
    return res.status(200).send(challenge);
  }
  return res.json({ success: true, message: 'Waki webhook is connected' });
});

router.post('/:secret', async (req: Request, res: Response) => {
  const userId = await resolveUser(req, res);
  if (!userId) return;

  // Acknowledge first: providers retry on slow responses, and the AI reply can take seconds.
  res.status(200).json({ success: true });

  try {
    const parsed = parseWakiPayload(req.body);
    if (parsed.unrecognized) {
      const keys = req.body && typeof req.body === 'object' ? Object.keys(req.body).slice(0, 10).join(',') : typeof req.body;
      console.warn(`${LOG} Unrecognized payload shape (keys: ${keys})`);
      return;
    }

    for (const inbound of parsed.messages) {
      await storeInbound(userId, inbound);
    }

    for (const status of parsed.statuses) {
      try {
        await whatsAppConversationService.updateMessageStatus(status.messageId, status.status as any, status.errorMessage || undefined);
      } catch (error: any) {
        console.error(`${LOG} Status update failed for ${status.messageId}: ${error.message}`);
      }
    }
  } catch (error: any) {
    console.error(`${LOG} Error processing webhook: ${error.message}`);
  }
});

async function storeInbound(userId: string, inbound: NormalizedInbound): Promise<void> {
  try {
    if (!inbound.from) {
      console.warn(`${LOG} Inbound without sender phone — skipped`);
      return;
    }
    if (inbound.messageId && await whatsAppConversationService.isDuplicateMessage(inbound.messageId)) {
      console.log(`${LOG} Skipping duplicate message ${inbound.messageId}`);
      return;
    }

    let conversation = await whatsAppConversationService.getOrCreateConversation(
      userId,
      inbound.from,
      inbound.contactName,
      inbound.contactWaId
    );
    conversation = await whatsAppAutoReplyService.applyUserDefaults(userId, conversation);

    await whatsAppConversationService.refreshWindow(conversation.id);

    const stored = await whatsAppConversationService.addMessage({
      conversationId: conversation.id,
      userId,
      direction: 'inbound',
      senderType: 'customer',
      messageType: inbound.messageType,
      content: inbound.content,
      metaMessageId: inbound.messageId || undefined,
      mediaUrl: inbound.mediaUrl || undefined,
      mediaMimeType: inbound.mediaMimeType || undefined,
      status: 'delivered',
      metadata: { ...inbound.metadata, receivedAt: inbound.receivedAt.toISOString() },
    });

    console.log(`${LOG} Inbound message stored in conversation ${conversation.id}`);

    void whatsAppAutoReplyService.handleInbound({
      userId,
      conversation,
      message: stored,
      provider: 'whatsway',
      receivedAt: inbound.receivedAt,
    });
  } catch (error: any) {
    console.error(`${LOG} Error storing inbound message: ${error.message}`);
  }
}

export default router;
