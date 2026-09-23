import { Router, Request, Response } from 'express';
import { whatsAppAutoReplySettingsService } from '../services/whatsapp-auto-reply-settings.service';
import type { WhatsAppAutoReplySettings } from '../types';

/**
 * User settings for WhatsApp AI auto-reply (session auth, mounted under /api/messaging/auto-reply).
 */

const router = Router();

function requestOrigin(req: Request): string {
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || '';
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const proto = isLocal ? 'http' : ((req.headers['x-forwarded-proto'] as string)?.split(',')[0]?.trim() || 'https');
  return `${proto}://${host}`;
}

function present(req: Request, settings: WhatsAppAutoReplySettings) {
  return {
    defaultWhatsappAgentId: settings.defaultWhatsappAgentId,
    whatsappAutoReplyDefault: settings.whatsappAutoReplyDefault,
    webhookUrl: whatsAppAutoReplySettingsService.buildWebhookUrl(requestOrigin(req), settings.webhookSecret),
    updatedAt: settings.updatedAt,
  };
}

router.get('/settings', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const settings = await whatsAppAutoReplySettingsService.getSettings(userId);
    res.json({ success: true, data: present(req, settings) });
  } catch (error: any) {
    console.error('[Messaging] Error fetching auto-reply settings:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch auto-reply settings' });
  }
});

router.put('/settings', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const { defaultWhatsappAgentId, whatsappAutoReplyDefault } = req.body || {};
    const agentId = typeof defaultWhatsappAgentId === 'string' && defaultWhatsappAgentId.trim()
      ? defaultWhatsappAgentId.trim()
      : null;
    const enabled = Boolean(whatsappAutoReplyDefault);

    if (agentId && agentId.length > 64) {
      return res.status(400).json({ success: false, error: 'Invalid agent id' });
    }
    if (agentId && !(await whatsAppAutoReplySettingsService.agentBelongsToUser(userId, agentId))) {
      return res.status(400).json({ success: false, error: 'Agent not found' });
    }
    if (enabled && !agentId) {
      return res.status(400).json({ success: false, error: 'Pick an agent to auto-reply with' });
    }

    const settings = await whatsAppAutoReplySettingsService.saveSettings(userId, {
      defaultWhatsappAgentId: agentId,
      whatsappAutoReplyDefault: enabled,
    });
    res.json({ success: true, data: present(req, settings) });
  } catch (error: any) {
    console.error('[Messaging] Error saving auto-reply settings:', error.message);
    res.status(500).json({ success: false, error: 'Failed to save auto-reply settings' });
  }
});

router.post('/regenerate-secret', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const settings = await whatsAppAutoReplySettingsService.regenerateSecret(userId);
    res.json({ success: true, data: present(req, settings) });
  } catch (error: any) {
    console.error('[Messaging] Error regenerating webhook secret:', error.message);
    res.status(500).json({ success: false, error: 'Failed to regenerate webhook secret' });
  }
});

export default router;
