'use strict';
/**
 * Admin invoice & GST settings: GET/PUT /api/admin/invoice-settings
 * Exposes every invoice_* global setting with the Aiclex defaults pre-filled.
 * Registered from server/routes/admin-routes.ts (router already runs checkAdminOrTeamMember).
 */
import type { Router, Response } from 'express';
import { storage } from '../../storage';
import { requireAdminPermission, type AdminRequest } from '../../middleware/admin-auth';
import { INVOICE_SETTING_DEFAULTS, INVOICE_SETTING_KEYS, getInvoiceSettings, resolveStateCode, type InvoiceSettingKey } from '../../engines/payment/invoice-gst';
import { logger } from '../../utils/logger';

const SOURCE = 'InvoiceSettingsRoutes';
const MAX_STRING = 500;
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

type Validated = { ok: true; value: string | number } | { ok: false; error: string };

function validateSetting(key: InvoiceSettingKey, raw: unknown): Validated {
  if (key === 'invoice_gst_rate') {
    const rate = typeof raw === 'number' ? raw : Number(String(raw ?? '').trim());
    if (!Number.isFinite(rate) || rate < 0 || rate > 100) return { ok: false, error: 'invoice_gst_rate must be a number between 0 and 100' };
    return { ok: true, value: Math.round(rate * 100) / 100 };
  }
  if (key === 'invoice_prices_include_gst') {
    if (raw === true || raw === 'true') return { ok: true, value: 'true' };
    if (raw === false || raw === 'false' || raw === null || raw === undefined || raw === '') return { ok: true, value: 'false' };
    return { ok: false, error: 'invoice_prices_include_gst must be true or false' };
  }
  if (raw === null || raw === undefined) return { ok: true, value: '' };
  if (typeof raw !== 'string' && typeof raw !== 'number') return { ok: false, error: `${key} must be a string` };
  const value = String(raw).trim();
  if (value.length > MAX_STRING) return { ok: false, error: `${key} must be at most ${MAX_STRING} characters` };
  if (key === 'invoice_prefix' && !/^[A-Za-z0-9]{1,10}$/.test(value)) return { ok: false, error: 'invoice_prefix must be 1-10 letters or digits' };
  if (key === 'invoice_seller_state_code') {
    const code = resolveStateCode(value);
    if (!code) return { ok: false, error: 'invoice_seller_state_code must be a valid 2-digit GST state code' };
    return { ok: true, value: code };
  }
  if (key === 'invoice_seller_gstin' && value && !GSTIN_RE.test(value.toUpperCase())) return { ok: false, error: 'invoice_seller_gstin must be a valid 15-character GSTIN' };
  if (key === 'invoice_seller_gstin') return { ok: true, value: value.toUpperCase() };
  if (key === 'invoice_seller_email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { ok: false, error: 'invoice_seller_email must be a valid email' };
  if (key === 'invoice_hsn_sac' && value && !/^[0-9]{4,8}$/.test(value)) return { ok: false, error: 'invoice_hsn_sac must be 4-8 digits' };
  if (key === 'invoice_logo_url' && value && !/^(https?:\/\/|data:image\/)/i.test(value)) return { ok: false, error: 'invoice_logo_url must be an http(s) URL or a data:image URI' };
  return { ok: true, value };
}

export function registerInvoiceSettingsRoutes(router: Router): void {
  router.get('/invoice-settings', requireAdminPermission('settings', 'system_settings', 'read'), async (_req: AdminRequest, res: Response) => {
    try {
      const settings = await getInvoiceSettings();
      res.json({ ...settings, defaults: INVOICE_SETTING_DEFAULTS });
    } catch (error: any) {
      logger.error('Failed to load invoice settings', error, SOURCE);
      res.status(500).json({ message: 'Failed to load invoice settings' });
    }
  });

  router.put('/invoice-settings', requireAdminPermission('settings', 'system_settings', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({ message: 'Body must be an object of invoice_* settings' });
      }
      const known = new Set<string>(INVOICE_SETTING_KEYS);
      const unknownKeys = Object.keys(body).filter(k => !known.has(k) && k !== 'defaults');
      if (unknownKeys.length > 0) {
        return res.status(400).json({ message: 'Unknown settings keys', unknownKeys });
      }
      const updates: [InvoiceSettingKey, string | number][] = [];
      const errors: string[] = [];
      for (const key of INVOICE_SETTING_KEYS) {
        if (!(key in body)) continue;
        const result = validateSetting(key, body[key]);
        if (result.ok) updates.push([key, result.value]);
        else errors.push(result.error);
      }
      if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid invoice settings', errors });
      }
      for (const [key, value] of updates) {
        await storage.updateGlobalSetting(key, value);
      }
      logger.info(`Invoice settings updated by ${req.userId}`, { keys: updates.map(([k]) => k) }, SOURCE);
      const settings = await getInvoiceSettings();
      res.json({ ...settings, defaults: INVOICE_SETTING_DEFAULTS });
    } catch (error: any) {
      logger.error('Failed to update invoice settings', error, SOURCE);
      res.status(500).json({ message: 'Failed to update invoice settings' });
    }
  });
}
