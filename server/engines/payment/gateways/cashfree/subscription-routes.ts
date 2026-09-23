'use strict';
/**
 * Cashfree auto-renew (mandate) routes — mounted on the /api/cashfree router
 *   POST /subscriptions                         (auth, rate-limited) → { subscriptionId, subscriptionSessionId, environment, amount, billingPeriod, nextChargeAt }
 *   GET  /subscriptions/:subscriptionId/status  (auth, owner)        → syncs the mandate from Cashfree and returns it
 *   POST /subscriptions/cancel                  (auth)               → CANCEL at Cashfree; the paid period stays active
 */

import express, { type Response, type Router } from 'express';
import { authenticateToken, type AuthRequest } from '../../../../middleware/auth';
import { paymentRateLimiter } from '../../../../middleware/rateLimiter';
import { logger } from '../../../../utils/logger';
import { resolveAppOrigin } from '../../webhook-helper';
import { CashfreeApiError, getCashfreeSettings, isCashfreeEnabled } from './service';
import {
  MandateRequestError,
  SUBSCRIPTION_ID_PATTERN,
  cancelMandate,
  createMandate,
  fetchAndSyncMandate,
  getSubscriptionRowByCashfreeId,
} from './subscriptions';

const router: Router = express.Router();

function sendMandateError(res: Response, error: unknown, fallback: string): void {
  if (error instanceof MandateRequestError) {
    res.status(error.status).json({ error: error.message, ...(error.details || {}) });
    return;
  }
  if (error instanceof CashfreeApiError) {
    res.status(error.status === 404 ? 404 : 502).json({ error: error.status === 404 ? 'Subscription not found at Cashfree' : error.message });
    return;
  }
  logger.error(fallback, error, 'Cashfree');
  res.status(500).json({ error: fallback });
}

router.post('/subscriptions', paymentRateLimiter, authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!(await isCashfreeEnabled())) {
      return res.status(400).json({ error: 'Cashfree payments are not enabled' });
    }
    const mandate = await createMandate(req.userId!, resolveAppOrigin(req));
    const { environment } = await getCashfreeSettings();
    res.json({
      subscriptionId: mandate.subscriptionId,
      subscriptionSessionId: mandate.subscriptionSessionId,
      environment,
      amount: mandate.amount,
      currency: 'INR',
      billingPeriod: mandate.billingPeriod,
      nextChargeAt: mandate.nextChargeAt,
    });
  } catch (error) {
    sendMandateError(res, error, 'Failed to set up auto-renew');
  }
});

router.get('/subscriptions/:subscriptionId/status', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    if (!SUBSCRIPTION_ID_PATTERN.test(subscriptionId)) {
      return res.status(400).json({ error: 'Invalid subscription id' });
    }
    const row = await getSubscriptionRowByCashfreeId(subscriptionId);
    if (!row || row.userId !== req.userId) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json(await fetchAndSyncMandate(row));
  } catch (error) {
    sendMandateError(res, error, 'Failed to check auto-renew status');
  }
});

router.post('/subscriptions/cancel', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPeriodEnd, alreadyOff } = await cancelMandate(req.userId!);
    res.json({ success: true, currentPeriodEnd, alreadyOff });
  } catch (error) {
    sendMandateError(res, error, 'Failed to turn off auto-renew');
  }
});

export const cashfreeSubscriptionRouter = router;
