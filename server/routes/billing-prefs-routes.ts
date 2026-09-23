/**
 * Usage alert preferences (own row only). Mounted at /api/billing/preferences behind authenticateToken.
 *   GET  /       → preferences + effective threshold + plan minutes
 *   PUT  /       { alertThresholdPercent?, alertThresholdCredits?, alertEmail?, alertWhatsappPhone?,
 *                  whatsappTemplate?, pauseCampaignsWhenEmpty?, dailyUsageSummary? }
 *   POST /test   → sends a test alert on every configured channel (1 per minute per user)
 */
import { Router, type Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '@shared/schema';
import { userBillingPreferences, updateBillingPreferencesSchema } from '@shared/schema-billing';
import type { AuthRequest } from '../middleware/auth';
import { normalizePhone } from '../services/call-actions/util';
import { DEFAULT_PREFS, loadPrefs, resolveThreshold, sendTestAlert, type AlertPrefs } from '../services/usage-alerts-cron';

const TEST_COOLDOWN_MS = 60_000;
const lastTestAt = new Map<string, number>();

export const billingPrefsRouter = Router();

async function shape(userId: string, prefs: AlertPrefs) {
  const [user] = await db.select({ email: users.email, credits: users.credits }).from(users).where(eq(users.id, userId)).limit(1);
  const { threshold, planMinutes, source } = await resolveThreshold(userId, prefs);
  return {
    alertThresholdPercent: prefs.alertThresholdPercent,
    alertThresholdCredits: prefs.alertThresholdCredits,
    alertEmail: prefs.alertEmail,
    alertWhatsappPhone: prefs.alertWhatsappPhone,
    whatsappTemplate: prefs.whatsappTemplate,
    pauseCampaignsWhenEmpty: prefs.pauseCampaignsWhenEmpty,
    dailyUsageSummary: prefs.dailyUsageSummary,
    accountEmail: user?.email ?? null,
    balance: user?.credits ?? 0,
    effectiveThreshold: threshold,
    thresholdSource: source,
    planMonthlyMinutes: planMinutes,
  };
}

billingPrefsRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    res.json(await shape(userId, await loadPrefs(userId)));
  } catch (error: any) {
    console.error('[BillingPrefs] GET failed:', error?.message);
    res.status(500).json({ error: 'Failed to load billing preferences' });
  }
});

billingPrefsRouter.put('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const parsed = updateBillingPreferencesSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid preferences', details: parsed.error.flatten().fieldErrors });
    }
    const patch = { ...parsed.data };
    if (patch.alertWhatsappPhone) {
      const normalized = normalizePhone(patch.alertWhatsappPhone);
      if (!normalized) return res.status(400).json({ error: 'Invalid WhatsApp phone number' });
      patch.alertWhatsappPhone = normalized;
    }
    const [row] = await db.insert(userBillingPreferences)
      .values({ userId, ...patch })
      .onConflictDoUpdate({ target: userBillingPreferences.userId, set: { ...patch, updatedAt: new Date() } })
      .returning();
    res.json(await shape(userId, { ...DEFAULT_PREFS, ...row }));
  } catch (error: any) {
    console.error('[BillingPrefs] PUT failed:', error?.message);
    res.status(500).json({ error: 'Failed to save billing preferences' });
  }
});

billingPrefsRouter.post('/test', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const last = lastTestAt.get(userId) ?? 0;
    if (Date.now() - last < TEST_COOLDOWN_MS) {
      return res.status(429).json({ error: 'Please wait a minute before sending another test alert' });
    }
    lastTestAt.set(userId, Date.now());
    const result = await sendTestAlert(userId);
    res.json({ success: result.email === 'sent' || result.whatsapp === 'sent' || result.inApp === 'sent', ...result });
  } catch (error: any) {
    console.error('[BillingPrefs] test alert failed:', error?.message);
    res.status(500).json({ error: 'Failed to send test alert' });
  }
});
