'use strict';
/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import nodemailer, { type Transporter, type SendMailOptions } from 'nodemailer';
import { storage } from '../storage';
import { logger } from '../utils/logger';
import type { DispatchOptions, DispatchResult, EventKey } from './event-dispatcher';

const SOURCE = 'EmailService';
const DEFAULT_COMPANY_NAME = '';
const DEFAULT_TAGLINE = 'AI-Powered Calling Platform';

interface BrandingSettings {
  appName: string;
  tagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  baseUrl: string;
  dashboardUrl: string;
  loginUrl: string;
  billingUrl: string;
  supportUrl: string;
  privacyUrl: string;
  termsUrl: string;
  fromEmail: string;
  fromName: string;
}

async function getBrandingSettings(): Promise<BrandingSettings> {
  try {
    const [
      appNameSetting,
      taglineSetting,
      logoSetting,
      faviconSetting,
      fromEmailSetting,
      fromNameSetting
    ] = await Promise.all([
      storage.getGlobalSetting('app_name'),
      storage.getGlobalSetting('app_tagline'),
      storage.getGlobalSetting('logo_url'),
      storage.getGlobalSetting('favicon_url'),
      storage.getGlobalSetting('smtp_from_email'),
      storage.getGlobalSetting('smtp_from_name'),
    ]);

    const baseUrl = process.env.APP_URL || '';
    const appName = (appNameSetting?.value as string) || DEFAULT_COMPANY_NAME;

    return {
      appName,
      tagline: (taglineSetting?.value as string) || DEFAULT_TAGLINE,
      logoUrl: (logoSetting?.value as string) || null,
      faviconUrl: (faviconSetting?.value as string) || null,
      baseUrl,
      dashboardUrl: baseUrl ? `${baseUrl}/app` : '/app',
      loginUrl: baseUrl ? `${baseUrl}/auth` : '/auth',
      billingUrl: baseUrl ? `${baseUrl}/billing` : '/billing',
      supportUrl: baseUrl ? `${baseUrl}/contact` : '/contact',
      privacyUrl: baseUrl ? `${baseUrl}/privacy` : '/privacy',
      termsUrl: baseUrl ? `${baseUrl}/terms` : '/terms',
      fromEmail: (fromEmailSetting?.value as string) || process.env.SMTP_FROM_EMAIL || '',
      fromName: (fromNameSetting?.value as string) || appName,
    };
  } catch (error) {
    logger.error('Failed to fetch branding settings', error, SOURCE);
    const baseUrl = process.env.APP_URL || '';
    return {
      appName: DEFAULT_COMPANY_NAME,
      tagline: DEFAULT_TAGLINE,
      logoUrl: null,
      faviconUrl: null,
      baseUrl,
      dashboardUrl: baseUrl ? `${baseUrl}/app` : '/app',
      loginUrl: baseUrl ? `${baseUrl}/auth` : '/auth',
      billingUrl: baseUrl ? `${baseUrl}/billing` : '/billing',
      supportUrl: baseUrl ? `${baseUrl}/contact` : '/contact',
      privacyUrl: baseUrl ? `${baseUrl}/privacy` : '/privacy',
      termsUrl: baseUrl ? `${baseUrl}/terms` : '/terms',
      fromEmail: process.env.SMTP_FROM_EMAIL || '',
      fromName: DEFAULT_COMPANY_NAME,
    };
  }
}

interface EmailAttachment {
  filename: string;
  content: Buffer | string;
}

interface CallCreditFailedData {
  userName: string;
  creditsRequired: number;
  currentBalance: number;
  callId: string;
  callUrl: string;
  durationSeconds?: number;
}

const NOTIFICATION_TYPE_MAP: Record<string, string> = {
  call_credit_failed: 'callCreditFailed',
};

function getBaseEmailStyles(): string {
  return `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .email-container {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      padding: 32px;
      text-align: center;
    }
    .email-logo {
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .email-tagline {
      color: #94a3b8;
      font-size: 14px;
      margin: 8px 0 0 0;
    }
    .email-body {
      padding: 40px 32px;
    }
    .email-title {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 16px 0;
    }
    .email-text {
      font-size: 16px;
      color: #4b5563;
      margin: 0 0 24px 0;
    }
    .email-highlight-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .email-metric {
      text-align: center;
      padding: 16px;
    }
    .email-metric-value {
      font-size: 36px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    }
    .email-metric-label {
      font-size: 14px;
      color: #64748b;
      margin: 4px 0 0 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .email-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    .email-table td {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
      font-size: 15px;
    }
    .email-table td:first-child {
      color: #6b7280;
    }
    .email-table td:last-child {
      text-align: right;
      font-weight: 500;
      color: #1f2937;
    }
    .email-table tr:last-child td {
      border-bottom: none;
      font-weight: 600;
    }
    .email-button {
      display: inline-block;
      background: #1e293b;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      margin: 24px 0;
    }
    .email-button-secondary {
      background: #f1f5f9;
      color: #1e293b !important;
    }
    .email-alert {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 24px 0;
      border-radius: 0 8px 8px 0;
    }
    .email-alert-error {
      background: #fee2e2;
      border-left-color: #ef4444;
    }
    .email-alert-success {
      background: #dcfce7;
      border-left-color: #22c55e;
    }
    .email-alert-info {
      background: #dbeafe;
      border-left-color: #3b82f6;
    }
    .email-footer {
      background: #f8fafc;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .email-footer-text {
      font-size: 13px;
      color: #9ca3af;
      margin: 0 0 12px 0;
    }
    .email-footer-links a {
      color: #6b7280;
      text-decoration: none;
      margin: 0 8px;
      font-size: 13px;
    }
    .email-footer-links a:hover {
      color: #1f2937;
    }
    .email-divider {
      border: 0;
      height: 1px;
      background: #e5e7eb;
      margin: 24px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 12px;
      }
      .email-body {
        padding: 28px 20px;
      }
      .email-header {
        padding: 24px 20px;
      }
      .email-title {
        font-size: 20px;
      }
    }
  `;
}

function wrapEmailTemplate(branding: BrandingSettings, content: string): string {
  const logoHtml = branding.logoUrl
    ? `<img src="${branding.logoUrl}" alt="${branding.appName}" style="max-height: 48px; max-width: 200px; margin-bottom: 12px;" />`
    : `<h1 class="email-logo">${branding.appName}</h1>`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${branding.appName}</title>
  ${branding.faviconUrl ? `<link rel="icon" href="${branding.faviconUrl}" type="image/x-icon">` : ''}
  <style>${getBaseEmailStyles()}</style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header">
        ${logoHtml}
        <p class="email-tagline">${branding.tagline}</p>
      </div>
      ${content}
      <div class="email-footer">
        <p class="email-footer-text">
          &copy; ${new Date().getFullYear()} ${branding.appName}. All rights reserved.
        </p>
        <p class="email-footer-text" style="margin-top: 8px;">
          This is a transactional email sent from ${branding.appName}.
        </p>
        <p class="email-footer-links" style="margin-top: 16px;">
          <a href="${branding.privacyUrl}">Privacy Policy</a> |
          <a href="${branding.termsUrl}">Terms of Service</a> |
          <a href="${branding.supportUrl}">Contact Support</a>
        </p>
        ${branding.baseUrl ? `<p class="email-footer-text" style="margin-top: 12px; font-size: 11px;">${branding.baseUrl}</p>` : ''}
      </div>
    </div>
  </div>
</body>
</html>
`;
}

export function callCreditFailedEmail(data: CallCreditFailedData, branding: BrandingSettings): string {
  const minutesText = data.durationSeconds && data.durationSeconds > 0
    ? `${Math.ceil(data.durationSeconds / 60)} minute${Math.ceil(data.durationSeconds / 60) === 1 ? '' : 's'}`
    : '';
  const content = `
    <div class="email-body">
      <h2 class="email-title">Call Could Not Be Billed</h2>
      <p class="email-text">
        Hi ${data.userName},
      </p>
      <p class="email-text">
        One of your recent calls completed${minutesText ? ` (${minutesText})` : ''} but we could not deduct credits for it because your balance was too low.
        The call has been marked as <strong>credit_failed</strong> and no further calls will be billed until you top up.
      </p>
      <div class="email-highlight-box">
        <table style="width: 100%; text-align: center;">
          <tr>
            <td style="padding: 16px;">
              <p class="email-metric-value">${data.creditsRequired.toLocaleString()}</p>
              <p class="email-metric-label">Credits Required</p>
            </td>
            <td style="padding: 16px;">
              <p class="email-metric-value">${data.currentBalance.toLocaleString()}</p>
              <p class="email-metric-label">Your Balance</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="email-alert email-alert-error">
        <strong>Action required:</strong> Top up your credits to continue making calls and to avoid more calls failing to bill.
      </div>
      <a href="${branding.billingUrl}" class="email-button">Top Up Credits</a>
      <p class="email-text" style="font-size: 14px; color: #6b7280; margin-top: 24px;">
        <a href="${data.callUrl}" style="color: #6b7280;">View call details</a>
      </p>
    </div>
  `;
  return wrapEmailTemplate(branding, content);
}

/**
 * Strip characters that are unsafe in RFC 5322 display names.
 * Removes pipe, angle brackets, quotes, and normalises non-ASCII to ASCII
 * so that the From header is accepted by strict corporate mail gateways.
 */
function sanitizeDisplayName(name: string): string {
  if (!name) return '';
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[|<>"\\]/g, '')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert an HTML email body to a plain-text alternative.
 * Strips CSS/style blocks, turns block-level tags into newlines,
 * removes remaining tags, decodes common entities, and collapses whitespace.
 */
function htmlToText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?(h[1-6]|p|div|section|article|header|footer|li|tr)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(table|thead|tbody|ul|ol)[^>]*>/gi, '\n')
    .replace(/<td[^>]*>/gi, '  ')
    .replace(/<th[^>]*>/gi, '  ')
    .replace(/<a[^>]+href="([^"]+)"[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export class EmailService {
  private transporter: Transporter | null = null;
  private smtpConfigured: boolean = false;
  private fromAddress: string = '';
  private fromName: string = '';
  /** 'smtp' (nodemailer) or 'resend' (HTTPS API — no open ports, no SMTP credentials) */
  private provider: 'smtp' | 'resend' = 'smtp';
  private resendApiKey: string = '';

  getProvider(): 'smtp' | 'resend' {
    return this.provider;
  }

  /** Validate a Resend API key without sending anything (GET /domains). */
  static async testResendKey(apiKey: string): Promise<{ success: boolean; error?: string; domains?: { name: string; status: string }[] }> {
    try {
      const res = await fetch('https://api.resend.com/domains', { headers: { Authorization: `Bearer ${apiKey}` } });
      if (res.status === 401 || res.status === 403) return { success: false, error: 'Resend rejected the API key' };
      if (!res.ok) return { success: false, error: `Resend returned HTTP ${res.status}` };
      const data: any = await res.json().catch(() => ({}));
      const domains = Array.isArray(data?.data) ? data.data.map((d: any) => ({ name: String(d.name), status: String(d.status) })) : [];
      return { success: true, domains };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Could not reach Resend' };
    }
  }

  private async sendViaResend(
    from: string,
    to: string,
    subject: string,
    html: string,
    text: string,
    attachments?: EmailAttachment[],
    replyTo?: string
  ): Promise<{ success: boolean; error?: string; messageId?: string }> {
    const body: Record<string, unknown> = { from, to, subject, html, text };
    if (replyTo) body.reply_to = replyTo;
    if (attachments?.length) {
      body.attachments = attachments.map(att => ({
        filename: att.filename,
        content: (Buffer.isBuffer(att.content) ? att.content : Buffer.from(String(att.content))).toString('base64'),
      }));
    }
    let lastError = 'Unknown error';
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.resendApiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const data: any = await res.json().catch(() => ({}));
          logger.info(`Email sent via Resend to: ${to}`, { messageId: data?.id }, SOURCE);
          console.log(`✅ [Email] Sent via Resend to: ${to}, Id: ${data?.id}`);
          return { success: true, messageId: data?.id };
        }
        const errText = await res.text().catch(() => '');
        lastError = `Resend HTTP ${res.status}: ${errText.slice(0, 300)}`;
        // 4xx (other than rate limiting) will not succeed on retry
        if (res.status < 500 && res.status !== 429) break;
      } catch (e: any) {
        lastError = e?.message || 'Network error';
      }
    }
    logger.error(`Failed to send email via Resend to: ${to}`, lastError, SOURCE);
    console.log(`❌ [Email] Resend failed to: ${to} - ${lastError}`);
    return { success: false, error: lastError };
  }

  constructor() {
    this.initialize();
  }

  /**
   * Helper to clean database values that may have extra quotes
   * e.g., """value""" -> value, "value" -> value
   */
  private cleanDbValue(value: string | undefined | null): string {
    if (!value) return '';
    // Remove leading/trailing whitespace first
    let cleaned = value.trim();
    // Remove multiple layers of quotes (handles """value""" case)
    while (
      (cleaned.startsWith('"""') && cleaned.endsWith('"""')) ||
      (cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length > 2)
    ) {
      if (cleaned.startsWith('"""') && cleaned.endsWith('"""')) {
        cleaned = cleaned.slice(3, -3);
      } else if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
      }
      cleaned = cleaned.trim();
    }
    return cleaned;
  }

  /**
   * Extract raw email from a potentially formatted address
   * e.g., "Name" <email@domain.com> -> email@domain.com
   */
  private extractRawEmail(address: string): string {
    if (!address) return '';
    const cleaned = this.cleanDbValue(address);
    // Check if it's in "Name" <email> format
    const match = cleaned.match(/<([^>]+)>/);
    if (match) {
      return match[1].trim();
    }
    return cleaned;
  }

  private initialize(): void {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (host && port && user && pass) {
      try {
        const portNum = parseInt(port, 10);
        this.transporter = nodemailer.createTransport({
          host,
          port: portNum,
          secure: portNum === 465,
          requireTLS: portNum === 587,
          pool: true,
          maxConnections: 5,
          auth: {
            user,
            pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 15000,
        });
        this.smtpConfigured = true;
        this.fromAddress = from || '';
        logger.info('Email service initialized with SMTP configuration', undefined, SOURCE);
      } catch (error) {
        logger.error('Failed to initialize SMTP transporter', error, SOURCE);
        this.smtpConfigured = false;
      }
    } else {
      logger.warn('SMTP not configured via env vars - will try database settings', undefined, SOURCE);
      this.smtpConfigured = false;
    }
  }

  /**
   * Reinitialize SMTP transporter with settings from database
   * Called when admin updates SMTP settings in Communications page
   */
  async reinitializeFromDatabase(): Promise<boolean> {
    try {
      const hostSetting = await storage.getGlobalSetting('smtp_host');
      const portSetting = await storage.getGlobalSetting('smtp_port');
      const userSetting = await storage.getGlobalSetting('smtp_username');
      const passSetting = await storage.getGlobalSetting('smtp_password');
      const fromEmailSetting = await storage.getGlobalSetting('smtp_from_email');
      const fromNameSetting = await storage.getGlobalSetting('smtp_from_name');
      const providerSetting = await storage.getGlobalSetting('email_provider');
      const resendKeySetting = await storage.getGlobalSetting('resend_api_key');

      const resendKey = this.cleanDbValue(resendKeySetting?.value as string);
      if (this.cleanDbValue(providerSetting?.value as string) === 'resend' && resendKey) {
        this.provider = 'resend';
        this.resendApiKey = resendKey;
        this.fromAddress = this.extractRawEmail(this.cleanDbValue(fromEmailSetting?.value as string)) || '';
        this.fromName = this.cleanDbValue(fromNameSetting?.value as string) || '';
        logger.info('Email service using Resend', { fromAddress: this.fromAddress, fromName: this.fromName }, SOURCE);
        return true;
      }
      this.provider = 'smtp';
      this.resendApiKey = '';

      // Clean database values to remove extra quotes
      const host = this.cleanDbValue(hostSetting?.value as string);
      const port = portSetting?.value as number | string;
      const user = this.cleanDbValue(userSetting?.value as string);
      const pass = this.cleanDbValue(passSetting?.value as string);
      const fromEmail = this.cleanDbValue(fromEmailSetting?.value as string);
      const fromName = this.cleanDbValue(fromNameSetting?.value as string);

      if (host && port && user && pass) {
        const portNum = typeof port === 'string' ? parseInt(port, 10) : port;
        
        this.transporter = nodemailer.createTransport({
          host,
          port: portNum,
          secure: portNum === 465,
          requireTLS: portNum === 587,
          pool: true,
          maxConnections: 5,
          auth: {
            user,
            pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 15000,
        });
        this.smtpConfigured = true;
        // Store only raw email address (not formatted string)
        // Extract raw email in case fromEmail is formatted like "Name" <email>
        this.fromAddress = this.extractRawEmail(fromEmail) || user || '';
        this.fromName = fromName || '';
        logger.info('Email service reinitialized from database settings', { fromAddress: this.fromAddress, fromName: this.fromName }, SOURCE);
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to reinitialize SMTP from database', error, SOURCE);
      return false;
    }
  }

  /**
   * Test SMTP connection with provided settings (without saving)
   */
  async testConnection(config: {
    host: string;
    port: number;
    username: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const testTransporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        requireTLS: config.port === 587,
        auth: {
          user: config.username,
          pass: config.password,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
      });

      await testTransporter.verify();
      return { success: true };
    } catch (error: any) {
      logger.error('SMTP connection test failed', error, SOURCE);
      return { 
        success: false, 
        error: error.message || 'Connection test failed' 
      };
    }
  }

  isEnabled(): boolean {
    if (this.provider === 'resend') return !!this.resendApiKey;
    return this.smtpConfigured && this.transporter !== null;
  }

  private async isNotificationTypeEnabled(eventType: string): Promise<boolean> {
    try {
      const setting = await storage.getEmailNotificationSetting(eventType);
      return setting?.isEnabled ?? true;
    } catch {
      return true;
    }
  }

  /**
   * Load an email template from the database and perform variable substitution
   * Falls back to null if template not found or not active (caller should use hardcoded fallback)
   */
  private async getTemplateFromDatabase(
    templateType: string,
    variables: Record<string, string | number>
  ): Promise<{ subject: string; htmlBody: string; textBody: string } | null> {
    try {
      const template = await storage.getEmailTemplate(templateType);
      
      if (!template || !template.isActive) {
        logger.debug(`Template ${templateType} not found or inactive, using fallback`, undefined, SOURCE);
        return null;
      }

      // Perform variable substitution
      let subject = template.subject;
      let htmlBody = template.htmlBody;
      let textBody = template.textBody || '';

      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        const strValue = String(value);
        subject = subject.replace(regex, strValue);
        htmlBody = htmlBody.replace(regex, strValue);
        textBody = textBody.replace(regex, strValue);
      }

      return { subject, htmlBody, textBody };
    } catch (error) {
      logger.error(`Failed to load template ${templateType} from database`, error, SOURCE);
      return null;
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    attachments?: EmailAttachment[],
    options?: { replyTo?: string; text?: string }
  ): Promise<{ success: boolean; error?: string; messageId?: string }> {
    // Check if SMTP is enabled
    if (!this.isEnabled()) {
      const reason = this.provider === 'resend'
        ? 'Resend API key not configured'
        : !this.smtpConfigured
          ? 'SMTP not configured (missing SMTP_HOST, SMTP_PORT, SMTP_USER, or SMTP_PASS)'
          : 'Email transporter not initialized';
      logger.warn(`[EMAIL DISABLED] Cannot send to: ${to} - ${reason}`, { subject }, SOURCE);
      console.log(`⚠️ [Email] SMTP not enabled - email to ${to} not sent. Subject: "${subject}"`);
      return { success: false, error: reason };
    }

    const branding = await getBrandingSettings();
    
    // Ensure we have a valid from address with proper email format validation
    // Extract raw email in case fromAddress is still in formatted form
    const rawFromAddress = this.extractRawEmail(this.fromAddress) || this.fromAddress;
    const fromAddress = rawFromAddress || branding.fromEmail || (this.provider === 'smtp' ? process.env.SMTP_USER : '') || '';
    if (!fromAddress) {
      const error = this.provider === 'resend'
        ? 'No from address configured (set the From email in Admin → Email; it must be on a domain verified in Resend)'
        : 'No from address configured (SMTP_FROM or SMTP_USER required)';
      logger.error(`[EMAIL ERROR] ${error}`, undefined, SOURCE);
      console.log(`❌ [Email] ${error}`);
      return { success: false, error };
    }
    
    // Simple RFC5322-safe email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromAddress)) {
      const error = `Invalid from address format: ${fromAddress}. Must be a valid email address.`;
      logger.error(`[EMAIL ERROR] ${error}`, undefined, SOURCE);
      console.log(`❌ [Email] ${error}`);
      return { success: false, error };
    }

    // Use configured fromName if available, otherwise fall back to branding appName.
    // Sanitise the display name so it is RFC 5322-safe (no pipe, angle brackets,
    // non-ASCII etc.) which prevents header parsing failures on strict corporate
    // mail gateways (Outlook / Exchange / Microsoft 365).
    const rawDisplayName = this.fromName || branding.fromName || branding.appName;
    const displayName = sanitizeDisplayName(rawDisplayName);

    // Always provide a plain-text alternative alongside the HTML body.
    // Emails that arrive with ONLY an HTML part (no text/plain) are flagged
    // by corporate spam filters and silently dropped — especially on Microsoft
    // 365 / Exchange environments.  Generate it automatically so every email
    // type benefits without each caller needing to pass it explicitly.
    const textBody = options?.text || htmlToText(html);

    if (this.provider === 'resend') {
      console.log(`📧 [Email] Sending via Resend to: ${to}, Subject: "${subject}", From: ${fromAddress}`);
      return this.sendViaResend(`${displayName} <${fromAddress}>`, to, subject, html, textBody, attachments, options?.replyTo);
    }

    try {
      const mailOptions: SendMailOptions = {
        from: `"${displayName}" <${fromAddress}>`,
        to,
        subject,
        html,
        text: textBody,
        attachments: attachments?.map(att => ({
          filename: att.filename,
          content: att.content,
        })),
      };
      
      // Add optional replyTo if provided
      if (options?.replyTo) {
        mailOptions.replyTo = options.replyTo;
      }

      console.log(`📧 [Email] Sending to: ${to}, Subject: "${subject}", From: ${fromAddress}${options?.replyTo ? `, Reply-To: ${options.replyTo}` : ''}`);
      
      const retryableCodes = new Set(['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'ESOCKET', 'EAI_AGAIN']);
      const maxRetries = 2;
      let lastError: any = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          if (attempt > 0) {
            const delay = attempt * 1000;
            console.log(`🔄 [Email] Retry ${attempt}/${maxRetries} to ${to} after ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
          const info = await this.transporter!.sendMail(mailOptions);
          logger.info(`Email sent successfully to: ${to}`, { messageId: info.messageId, attempts: attempt + 1 }, SOURCE);
          console.log(`✅ [Email] Sent successfully to: ${to}, MessageId: ${info.messageId}${attempt > 0 ? ` (after ${attempt} retries)` : ''}`);
          return { success: true, messageId: info.messageId };
        } catch (error: any) {
          lastError = error;
          if (!retryableCodes.has(error?.code) || attempt === maxRetries) {
            break;
          }
          console.log(`⚠️ [Email] Transient error sending to ${to}: ${error.code || error.message}`);
        }
      }

      const errorMsg = lastError?.message || 'Unknown error';
      logger.error(`Failed to send email to: ${to}`, lastError, SOURCE);
      console.log(`❌ [Email] Failed to send to: ${to} - Error: ${errorMsg}`);
      return { success: false, error: errorMsg };
    } catch (error: any) {
      const errorMsg = error?.message || 'Unknown error';
      logger.error(`Failed to send email to: ${to}`, error, SOURCE);
      console.log(`❌ [Email] Failed to send to: ${to} - Error: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
  }

  /**
   * All event emails go through the dispatcher (templated, toggled, logged).
   * Loaded lazily so this transport module never statically depends on it.
   */
  private async dispatch(eventKey: EventKey, opts: DispatchOptions): Promise<DispatchResult> {
    const { dispatchEvent } = await import('./event-dispatcher');
    return dispatchEvent(eventKey, opts);
  }

  private toBool(result: DispatchResult): boolean {
    return result.email === 'sent';
  }

  async sendWelcomeEmail(userId: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.dispatch('welcome', { userId });
    return result.email === 'sent' ? { success: true } : { success: false, error: `welcome email ${result.email}` };
  }

  /** Purchase confirmation → purchase_completed event (optionally with the invoice PDF attached). */
  async sendPurchaseConfirmation(transactionId: string, invoicePDF?: Buffer): Promise<boolean> {
    try {
      const transaction = await storage.getPaymentTransaction(transactionId);
      if (!transaction) {
        logger.error(`Transaction not found for purchase confirmation: ${transactionId}`, undefined, SOURCE);
        return false;
      }
      const invoice = await storage.getTransactionInvoice(transactionId).catch(() => undefined);
      const invoiceNumber = invoice?.invoiceNumber || 'N/A';
      const result = await this.dispatch('purchase_completed', {
        userId: transaction.userId,
        data: {
          amount: String(transaction.amount),
          currency: transaction.currency || 'INR',
          description: transaction.description,
          invoiceNumber,
          transactionId: transaction.id,
          orderId: transaction.gatewayOrderId || '',
          paymentMethod: transaction.paymentMethod || '',
        },
        attachments: invoicePDF ? [{ filename: `invoice-${invoiceNumber.replace(/[^\w.-]+/g, '_')}.pdf`, content: invoicePDF, contentType: 'application/pdf' }] : undefined,
      });
      return this.toBool(result);
    } catch (error) {
      logger.error(`Failed to send purchase confirmation for transaction: ${transactionId}`, error, SOURCE);
      return false;
    }
  }

  async sendLowCreditsAlert(userId: string, currentCredits: number): Promise<boolean> {
    let threshold = 50;
    try {
      const setting = await storage.getGlobalSetting('low_credits_threshold');
      if (typeof setting?.value === 'number') threshold = setting.value;
    } catch {
      // keep default threshold
    }
    return this.toBool(await this.dispatch('low_credits', { userId, data: { currentCredits, threshold } }));
  }

  async sendCallCreditFailedAlert(
    userId: string,
    options: { callId: string; creditsRequired: number; currentBalance: number; durationSeconds?: number }
  ): Promise<boolean> {
    const eventType = NOTIFICATION_TYPE_MAP.call_credit_failed;
    if (!(await this.isNotificationTypeEnabled(eventType))) {
      logger.info(`Call credit failed email disabled for event type: ${eventType}`, undefined, SOURCE);
      return false;
    }

    try {
      const user = await storage.getUser(userId);
      if (!user) {
        logger.error(`User not found for call credit failed alert: ${userId}`, undefined, SOURCE);
        return false;
      }

      const branding = await getBrandingSettings();
      const callUrl = `${branding.baseUrl || ''}/app/calls/${options.callId}`;

      const dbTemplate = await this.getTemplateFromDatabase('call_credit_failed', {
        userName: user.name,
        creditsRequired: options.creditsRequired,
        currentBalance: options.currentBalance,
        callId: options.callId,
        callUrl,
        creditsUrl: branding.billingUrl,
        companyName: branding.appName,
      });

      if (dbTemplate) {
        const result = await this.sendEmail(user.email, dbTemplate.subject, dbTemplate.htmlBody);
        return result.success;
      }

      const data: CallCreditFailedData = {
        userName: user.name,
        creditsRequired: options.creditsRequired,
        currentBalance: options.currentBalance,
        callId: options.callId,
        callUrl,
        durationSeconds: options.durationSeconds,
      };

      const html = callCreditFailedEmail(data, branding);
      const subject = `Call Could Not Be Billed - ${branding.appName}`;
      const result = await this.sendEmail(user.email, subject, html);
      return result.success;
    } catch (error) {
      logger.error(`Failed to send call credit failed alert for user: ${userId}`, error, SOURCE);
      return false;
    }
  }

  async sendCampaignCompleted(campaignId: string): Promise<boolean> {
    try {
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        logger.error(`Campaign not found for completion email: ${campaignId}`, undefined, SOURCE);
        return false;
      }
      const calls = await storage.getCampaignCalls(campaignId);
      const callsCompleted = calls.length;
      const callsSuccessful = calls.filter(c => c.status === 'completed').length;
      const successRate = callsCompleted > 0 ? Math.round((callsSuccessful / callsCompleted) * 100) : 0;
      const result = await this.dispatch('campaign_completed', {
        userId: campaign.userId,
        data: { campaignId, campaignName: campaign.name, callsCompleted, callsSuccessful, successRate: `${successRate}%` },
      });
      return this.toBool(result);
    } catch (error) {
      logger.error(`Failed to send campaign completed email for campaign: ${campaignId}`, error, SOURCE);
      return false;
    }
  }

  async sendPaymentFailed(userId: string, amount: string, reason: string): Promise<boolean> {
    return this.toBool(await this.dispatch('payment_failed', { userId, data: { amount, reason, currency: 'INR' } }));
  }

  async sendAccountSuspended(userId: string, reason: string): Promise<boolean> {
    return this.toBool(await this.dispatch('account_suspended', { userId, data: { reason } }));
  }

  async sendAccountReactivated(userId: string): Promise<boolean> {
    return this.toBool(await this.dispatch('account_reactivated', { userId }));
  }

  /** Legacy name: a paid plan became active → plan_activated event. */
  async sendMembershipUpgrade(userId: string, newPlanName: string): Promise<boolean> {
    return this.toBool(await this.dispatch('plan_activated', { userId, data: { planName: newPlanName, newPlanName } }));
  }

  /** Legacy name: subscription period ending soon → plan_expiring event. */
  async sendRenewalReminder(subscriptionId: string): Promise<boolean> {
    try {
      const allSubscriptions = await storage.getAllUserSubscriptions();
      const subscription = allSubscriptions.find(s => s.id === subscriptionId);
      if (!subscription) {
        logger.error(`Subscription not found for renewal reminder: ${subscriptionId}`, undefined, SOURCE);
        return false;
      }
      const userSubscription = await storage.getUserSubscription(subscription.userId);
      const plan = userSubscription?.plan;
      if (!plan) {
        logger.error(`Plan not found for subscription: ${subscriptionId}`, undefined, SOURCE);
        return false;
      }
      const periodEnd = subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : null;
      const expiresAt = periodEnd
        ? periodEnd.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';
      const daysLeft = periodEnd ? Math.max(0, Math.ceil((periodEnd.getTime() - Date.now()) / 86_400_000)) : 0;
      const amount = subscription.billingPeriod === 'yearly'
        ? (plan.yearlyPrice ?? plan.monthlyPrice)
        : plan.monthlyPrice;
      const result = await this.dispatch('plan_expiring', {
        userId: subscription.userId,
        data: {
          planName: plan.displayName || plan.name,
          billingPeriod: subscription.billingPeriod,
          expiresAt,
          renewalDate: expiresAt,
          daysLeft,
          amount: String(amount ?? ''),
          currency: 'INR',
        },
      });
      return this.toBool(result);
    } catch (error) {
      logger.error(`Failed to send renewal reminder for subscription: ${subscriptionId}`, error, SOURCE);
      return false;
    }
  }

  /** Signup OTP → email_verification event (always on; recipient may not be a user yet). */
  async sendOTPEmail(email: string, code: string, name?: string, expiryMinutes: number = 5): Promise<{ success: boolean; messageId?: string }> {
    const result = await this.dispatch('email_verification', {
      userId: '',
      to: email,
      data: { otpCode: code, code, expiryMinutes: String(expiryMinutes), userName: name || '' },
    });
    if (result.email !== 'sent') {
      logger.error(`Failed to send OTP email to: ${email} (${result.email})`, undefined, SOURCE);
      throw new Error('Failed to send verification email');
    }
    return { success: true };
  }

  /** Password reset OTP → password_reset event (always on). */
  async sendPasswordResetEmail(email: string, code: string, name?: string, expiryMinutes: number = 5): Promise<{ success: boolean; messageId?: string }> {
    const user = await storage.getUserByEmail(email).catch(() => undefined);
    const result = await this.dispatch('password_reset', {
      userId: user?.id || '',
      to: email,
      data: { otpCode: code, code, expiryMinutes: String(expiryMinutes), userName: name || user?.name || '' },
    });
    if (result.email !== 'sent') {
      logger.error(`Failed to send password reset email to: ${email} (${result.email})`, undefined, SOURCE);
      throw new Error('Failed to send password reset email');
    }
    return { success: true };
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.isEnabled()) {
      logger.warn('Cannot verify connection - SMTP not configured', undefined, SOURCE);
      return false;
    }

    if (this.provider === 'resend') {
      const check = await EmailService.testResendKey(this.resendApiKey);
      if (!check.success) logger.error('Resend API key verification failed', check.error, SOURCE);
      return check.success;
    }

    try {
      await this.transporter!.verify();
      logger.info('SMTP connection verified successfully', undefined, SOURCE);
      return true;
    } catch (error) {
      logger.error('SMTP connection verification failed', error, SOURCE);
      return false;
    }
  }

  async sendKycApproved(userId: string): Promise<boolean> {
    return this.toBool(await this.dispatch('kyc_approved', { userId }));
  }

  async sendKycRejected(userId: string, reason: string): Promise<boolean> {
    return this.toBool(await this.dispatch('kyc_rejected', { userId, data: { reason } }));
  }
}

export const emailService = new EmailService();
