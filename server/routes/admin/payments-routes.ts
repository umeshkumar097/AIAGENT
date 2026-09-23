'use strict';
/**
 * Admin payment gateway routes (mounted under /api/admin)
 *   GET  /payments/cashfree        → settings (secret masked)
 *   PUT  /payments/cashfree        → update settings
 *   POST /payments/cashfree/test   → credential check against Cashfree
 *   POST /payments/refunds         → Cashfree refund + credit note
 */
import { Router, Response } from 'express';
import { storage } from '../../storage';
import { AdminRequest, requireAdminPermission } from '../../middleware/admin-auth';
import { FRONTEND_URL, getLastWebhookReceivedAt, getWebhookUrl } from '../../engines/payment/webhook-helper';
import {
  CASHFREE_SETTINGS,
  getCashfreeSettings,
  testCredentials,
  processCashfreeRefund,
  RefundValidationError,
  type CashfreeEnvironment,
} from '../../engines/payment/gateways/cashfree';

const MASK_PREFIX = '****';

function maskSecret(secret: string): string | null {
  if (!secret) return null;
  return `${MASK_PREFIX}${secret.slice(-4)}`;
}

function isMaskedSecret(value: unknown): boolean {
  return typeof value === 'string' && value.trim().startsWith(MASK_PREFIX);
}

async function buildCashfreeAdminView() {
  const settings = await getCashfreeSettings();
  const lastWebhookAt = await getLastWebhookReceivedAt('cashfree');
  return {
    enabled: settings.enabled,
    appId: settings.appId || null,
    secretKeyMasked: maskSecret(settings.secretKey),
    configured: !!(settings.appId && settings.secretKey),
    environment: settings.environment,
    lastWebhookAt: lastWebhookAt ? lastWebhookAt.toISOString() : null,
    webhookUrl: getWebhookUrl('cashfree'),
    returnUrl: `${FRONTEND_URL}/app/payment-result?gateway=cashfree&order_id={order_id}`,
  };
}

export function registerPaymentsRoutes(router: Router) {
  router.get('/payments/cashfree', requireAdminPermission('billing', 'payments', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.json(await buildCashfreeAdminView());
    } catch (error) {
      console.error('Error fetching Cashfree settings:', error);
      res.status(500).json({ error: 'Failed to fetch Cashfree settings' });
    }
  });

  router.put('/payments/cashfree', requireAdminPermission('billing', 'payments', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { enabled, appId, secretKey, environment } = req.body || {};

      if (environment !== undefined && environment !== 'sandbox' && environment !== 'production') {
        return res.status(400).json({ error: "environment must be 'sandbox' or 'production'" });
      }
      if (appId !== undefined && typeof appId !== 'string') {
        return res.status(400).json({ error: 'appId must be a string' });
      }
      if (secretKey !== undefined && typeof secretKey !== 'string') {
        return res.status(400).json({ error: 'secretKey must be a string' });
      }

      if (typeof appId === 'string') {
        await storage.updateGlobalSetting(CASHFREE_SETTINGS.APP_ID, appId.trim());
      }
      if (typeof secretKey === 'string' && secretKey.trim() && !isMaskedSecret(secretKey)) {
        await storage.updateGlobalSetting(CASHFREE_SETTINGS.SECRET_KEY, secretKey.trim());
      }
      if (environment !== undefined) {
        await storage.updateGlobalSetting(CASHFREE_SETTINGS.ENVIRONMENT, environment as CashfreeEnvironment);
      }
      if (enabled !== undefined) {
        const enabledBool = enabled === true || enabled === 'true';
        if (enabledBool) {
          const current = await getCashfreeSettings();
          if (!current.appId || !current.secretKey) {
            return res.status(400).json({ error: 'Add the App ID and Secret Key before enabling Cashfree' });
          }
        }
        await storage.updateGlobalSetting(CASHFREE_SETTINGS.ENABLED, enabledBool);
      }

      res.json(await buildCashfreeAdminView());
    } catch (error) {
      console.error('Error updating Cashfree settings:', error);
      res.status(500).json({ error: 'Failed to update Cashfree settings' });
    }
  });

  router.post('/payments/cashfree/test', requireAdminPermission('billing', 'payments', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { appId, secretKey, environment } = req.body || {};
      const override: { appId?: string; secretKey?: string; environment?: CashfreeEnvironment } = {};
      if (typeof appId === 'string' && appId.trim()) override.appId = appId.trim();
      if (typeof secretKey === 'string' && secretKey.trim() && !isMaskedSecret(secretKey)) override.secretKey = secretKey.trim();
      if (environment === 'sandbox' || environment === 'production') override.environment = environment;

      const result = await testCredentials(override);
      res.json(result);
    } catch (error: any) {
      console.error('Error testing Cashfree credentials:', error);
      res.status(500).json({ success: false, message: error?.message || 'Connection test failed' });
    }
  });

  router.post('/payments/refunds', requireAdminPermission('billing', 'payments', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { transactionId, amount, reason, adminNote, customerNote } = req.body || {};
      if (typeof transactionId !== 'string' || !transactionId) {
        return res.status(400).json({ error: 'transactionId is required' });
      }
      const adminId = req.userId || null;

      const result = await processCashfreeRefund({
        transactionId,
        amount: Number(amount),
        reason: typeof reason === 'string' ? reason : undefined,
        adminId,
        adminNote: typeof adminNote === 'string' ? adminNote : null,
        customerNote: typeof customerNote === 'string' ? customerNote : null,
      });

      res.json({
        success: true,
        refund: result.refund,
        cfRefundId: result.cfRefundId,
        cfRefundStatus: result.cfRefundStatus,
        creditNoteId: result.creditNoteId,
        creditsReversed: result.creditsReversed,
      });
    } catch (error: any) {
      if (error instanceof RefundValidationError) {
        return res.status(error.status).json({ error: error.message });
      }
      console.error('Error processing Cashfree refund:', error);
      res.status(500).json({ error: 'Failed to process refund' });
    }
  });
}
