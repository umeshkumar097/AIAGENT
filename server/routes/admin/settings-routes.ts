'use strict';
import { Router, Response } from 'express';
import { storage } from '../../storage';
import { AdminRequest, requireAdminPermission } from '../../middleware/admin-auth';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { openaiCredentials } from '@shared/schema';
import { ElevenLabsPoolService } from '../../services/elevenlabs-pool';
import { getResourceStatus, clearSettingsCache } from '../../services/resource-watchdog';
import { resyncElevenLabsPhoneCredentials } from '../../services/elevenlabs-phone-resync';
import { INTEGRATION_SECRET_KEYS, INTEGRATION_SETTING_KEYS, SALESFORCE_LOGIN_URLS, ZOHO_ACCOUNTS_DOMAINS } from '../../integrations/app-keys';

const INVOICE_SETTING_KEYS = [
  'invoice_seller_name', 'invoice_seller_trade_name', 'invoice_seller_gstin', 'invoice_seller_cin', 'invoice_seller_dpiit',
  'invoice_seller_address', 'invoice_seller_state_code', 'invoice_seller_email', 'invoice_seller_phone', 'invoice_prefix',
  'invoice_gst_rate', 'invoice_hsn_sac', 'invoice_footer_text', 'invoice_logo_url',
];

export function registerSettingsRoutes(router: Router) {
  router.get('/settings', requireAdminPermission('settings', 'system_settings', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const settingKeys = [
        'default_llm_free', 'default_tts_model', 'pro_plan_bonus_credits', 'credit_price_per_minute',
        'elevenlabs_credit_price_per_minute', 'sarvam_api_key',
        'phone_number_monthly_credits', 'min_credit_purchase', 'system_phone_pool_size', 'llm_margin_percentage',
        'twilio_account_sid', 'twilio_auth_token', 'plivo_auth_id', 'plivo_auth_token',
        'elevenlabs_api_key', 'openai_api_key',
        'google_client_id', 'google_client_secret',
        ...INTEGRATION_SETTING_KEYS,
        'cashfree_enabled', 'cashfree_app_id', 'cashfree_secret_key', 'cashfree_environment', 'cashfree_last_webhook_at',
        'phone_number_price_inr',
        ...INVOICE_SETTING_KEYS,
        'auto_restart_enabled', 'auto_restart_ram_percent', 'auto_restart_cpu_percent'
      ];
      
      const settings: Record<string, any> = {};
      for (const key of settingKeys) {
        const setting = await storage.getGlobalSetting(key);
        if (setting) {
          settings[key] = setting.value;
        }
      }
      
      const dbTwilioSid = settings.twilio_account_sid;
      const dbTwilioToken = settings.twilio_auth_token;
      const dbTwilioConfigured = !!(dbTwilioSid && dbTwilioSid.trim() && dbTwilioToken && dbTwilioToken.trim());
      settings.twilio_configured = dbTwilioConfigured;
      
      const dbPlivoAuthId = settings.plivo_auth_id;
      const dbPlivoAuthToken = settings.plivo_auth_token;
      const dbPlivoConfigured = !!(dbPlivoAuthId && dbPlivoAuthId.trim() && dbPlivoAuthToken && dbPlivoAuthToken.trim());
      settings.plivo_configured = dbPlivoConfigured;
      
      const poolStats = await ElevenLabsPoolService.getPoolStats();
      settings.elevenlabs_configured = poolStats.totalKeys > 0;
      
      const dbOpenAIKey = settings.openai_api_key;
      settings.openai_configured = !!(dbOpenAIKey && dbOpenAIKey.trim());
      
      const openaiRealtimeCredentials = await db.select().from(openaiCredentials).where(eq(openaiCredentials.isActive, true));
      settings.openai_realtime_configured = openaiRealtimeCredentials.length > 0;
      
      settings.cashfree_configured = !!(
        (settings.cashfree_app_id || process.env.CASHFREE_APP_ID) &&
        (settings.cashfree_secret_key || process.env.CASHFREE_SECRET_KEY)
      );
      settings.cashfree_environment = settings.cashfree_environment === 'production' ? 'production' : 'sandbox';

      const dbGoogleClientId = settings.google_client_id;
      const dbGoogleClientSecret = settings.google_client_secret;
      const envGoogleClientId = process.env.GOOGLE_CLIENT_ID;
      const envGoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
      settings.google_oauth_configured = !!((dbGoogleClientId || envGoogleClientId) && (dbGoogleClientSecret || envGoogleClientSecret));
      // Mask both google credential fields — replace raw values with display-safe form
      if (dbGoogleClientId) {
        settings.google_client_id_display = dbGoogleClientId.length > 8 ? `...${dbGoogleClientId.slice(-8)}` : dbGoogleClientId;
        settings.google_client_id = undefined; // remove raw value from response
      } else if (envGoogleClientId) {
        settings.google_client_id_display = envGoogleClientId.length > 8 ? `...${envGoogleClientId.slice(-8)}` : envGoogleClientId;
        settings.google_client_id_from_env = true;
        settings.google_client_id = undefined;
      }
      
      settings.payment_gateway = 'cashfree';
      
      const secretKeys = [
        'cashfree_secret_key', 'twilio_auth_token', 'plivo_auth_token', 'openai_api_key',
        'google_client_secret', ...INTEGRATION_SECRET_KEYS
      ];
      for (const key of secretKeys) {
        if (settings[key]) {
          settings[key] = true;
        }
      }
      
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  router.get('/system-settings', requireAdminPermission('settings', 'system_settings', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const systemSettingKeys = [
        'jwt_expiry_days', 'otp_expiry_minutes', 'password_reset_expiry_minutes', 'phone_number_monthly_credits',
        'low_credits_threshold', 'webhook_retry_max_attempts', 'webhook_retry_intervals_minutes', 'webhook_expiry_hours',
        'system_phone_pool_size', 'max_ws_connections_per_process', 'max_ws_connections_per_user', 'max_ws_connections_per_ip',
        'max_openai_connections_per_credential', 'openai_connection_timeout_ms', 'openai_idle_timeout_ms',
        'db_pool_min_connections', 'db_pool_max_connections', 'db_pool_idle_timeout_ms', 'campaign_batch_concurrency',
      ];
      
      const systemSettings: Record<string, any> = {};
      for (const key of systemSettingKeys) {
        const setting = await storage.getGlobalSetting(key);
        if (setting) {
          systemSettings[key] = setting.value;
        }
      }
      
      const defaults: Record<string, any> = {
        jwt_expiry_days: 7, otp_expiry_minutes: 5, password_reset_expiry_minutes: 5, phone_number_monthly_credits: 50,
        low_credits_threshold: 50, webhook_retry_max_attempts: 5, webhook_retry_intervals_minutes: [1, 5, 15, 30, 60],
        webhook_expiry_hours: 24, system_phone_pool_size: 5, max_ws_connections_per_process: 1000,
        max_ws_connections_per_user: 5, max_ws_connections_per_ip: 10, max_openai_connections_per_credential: 50,
        openai_connection_timeout_ms: 3600000, openai_idle_timeout_ms: 300000, db_pool_min_connections: 2,
        db_pool_max_connections: 20, db_pool_idle_timeout_ms: 30000, campaign_batch_concurrency: 10,
      };
      
      for (const key of systemSettingKeys) {
        if (systemSettings[key] === undefined) {
          systemSettings[key] = defaults[key];
        }
      }
      
      res.json(systemSettings);
    } catch (error) {
      console.error('Error fetching system settings:', error);
      res.status(500).json({ error: 'Failed to fetch system settings' });
    }
  });

  router.get('/settings/:key', requireAdminPermission('settings', 'system_settings', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const { key } = req.params;
      const setting = await storage.getGlobalSetting(key);
      
      if (!setting) {
        const defaults: Record<string, any> = {
          'default_tts_model': 'eleven_turbo_v2', 'default_llm_free': null, 'pro_plan_bonus_credits': 0,
          'credit_price_per_minute': 1, 'elevenlabs_credit_price_per_minute': 2,
          'phone_number_monthly_credits': 50, 'min_credit_purchase': 10,
          'system_phone_pool_size': 5, 'llm_margin_percentage': 15, 'cashfree_environment': 'sandbox',
          'phone_number_price_inr': 400, 'auto_restart_enabled': false,
          'auto_restart_ram_percent': 75, 'auto_restart_cpu_percent': 85,
        };
        
        return res.json({ [key]: defaults[key] ?? null });
      }
      
      res.json({ [key]: setting.value });
    } catch (error) {
      console.error('Error fetching setting:', error);
      res.status(500).json({ error: 'Failed to fetch setting' });
    }
  });

  router.patch('/settings/:key', requireAdminPermission('settings', 'system_settings', 'update'), async (req: AdminRequest, res: Response) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      const allowedCredentials = [
        'twilio_account_sid', 'twilio_auth_token', 'openai_api_key', 'elevenlabs_hmac_secret',
        'smtp_host', 'smtp_port', 'smtp_username', 'smtp_password', 'smtp_from_email', 'smtp_from_name', 'email_provider', 'resend_api_key',
        'app_name', 'app_tagline', 'logo_url', 'favicon_url', 'branding_updated_at',
        'google_client_id', 'google_client_secret',
        ...INTEGRATION_SETTING_KEYS,
        'cashfree_enabled', 'cashfree_app_id', 'cashfree_secret_key', 'cashfree_environment',
        'phone_number_price_inr', ...INVOICE_SETTING_KEYS, 'password_reset_expiry_minutes'
      ];
      if (!allowedCredentials.includes(key) && (key.includes('api_key') || key.includes('secret') || key.includes('password'))) {
        return res.status(400).json({ error: 'API keys must be configured as environment variables' });
      }
      
      let finalValue = value;

      if (key === 'cashfree_environment' && value !== 'sandbox' && value !== 'production') {
        return res.status(400).json({ error: "cashfree_environment must be 'sandbox' or 'production'" });
      }
      if (INTEGRATION_SETTING_KEYS.includes(key)) {
        if (typeof value !== 'string') return res.status(400).json({ error: `${key} must be a string` });
        finalValue = value.trim();
        if (key === 'salesforce_login_url' && finalValue && !SALESFORCE_LOGIN_URLS.includes(finalValue)) {
          return res.status(400).json({ error: `salesforce_login_url must be one of: ${SALESFORCE_LOGIN_URLS.join(', ')}` });
        }
        if (key === 'zoho_accounts_domain' && finalValue && !ZOHO_ACCOUNTS_DOMAINS.includes(finalValue)) {
          return res.status(400).json({ error: `zoho_accounts_domain must be one of: ${ZOHO_ACCOUNTS_DOMAINS.join(', ')}` });
        }
      }
      if (key === 'cashfree_enabled') {
        finalValue = value === true || value === 'true';
      }
      if (key === 'phone_number_price_inr' || key === 'invoice_gst_rate') {
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0) return res.status(400).json({ error: `${key} must be a non-negative number` });
        finalValue = n;
      }

      if (key === 'auto_restart_enabled') {
        finalValue = value === true || value === 'true';
      } else if (key === 'auto_restart_ram_percent') {
        const ramPercent = Number(value);
        if (isNaN(ramPercent)) return res.status(400).json({ error: 'RAM percentage must be a number' });
        finalValue = Math.max(50, Math.min(95, ramPercent));
      } else if (key === 'auto_restart_cpu_percent') {
        const cpuPercent = Number(value);
        if (isNaN(cpuPercent)) return res.status(400).json({ error: 'CPU percentage must be a number' });
        finalValue = Math.max(20, Math.min(95, cpuPercent));
      }
      
      await storage.updateGlobalSetting(key, finalValue);
      
      if (key.startsWith('auto_restart_')) {
        clearSettingsCache();
      }
      if (key === 'twilio_account_sid' || key === 'twilio_auth_token') {
        resyncElevenLabsPhoneCredentials().then(summary => {
          if (summary.synced > 0 || summary.failed > 0) {
            console.log(`[Settings] Twilio credential change: re-synced ${summary.synced} ElevenLabs phone number(s), ${summary.failed} failed`);
          }
          if (summary.errors.length > 0) {
            console.error('[Settings] ElevenLabs resync errors:', summary.errors);
          }
        }).catch(err => {
          console.error('[Settings] Background ElevenLabs resync failed:', err.message);
        });
      }
      
res.json({ success: true, key, value: finalValue });
    } catch (error: any) {
      console.error(`Error updating setting '${req.params.key}':`, error);
      res.status(500).json({ error: 'Failed to update setting' });
    }
  });

  router.get('/resource-status', requireAdminPermission('settings', 'system_settings', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const status = await getResourceStatus();
      res.json(status);
    } catch (error) {
      console.error('Error getting resource status:', error);
      res.status(500).json({ error: 'Failed to get resource status' });
    }
  });

  router.get('/analytics', requireAdminPermission('settings', 'analytics_settings', 'read'), async (req: AdminRequest, res: Response) => {
    try {
      const timeRange = (req.query.timeRange as string) || '30days';
      const analytics = await storage.getGlobalAnalytics(timeRange);
      res.json(analytics || {});
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  });
}
