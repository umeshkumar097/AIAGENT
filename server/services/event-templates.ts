'use strict';
/**
 * Built-in default templates for every notification EventKey.
 *
 * Single source of truth used by:
 *  - event-dispatcher.ts  → runtime fallback when no active DB template exists
 *  - seed-email-templates.ts → idempotent seeding of email_templates rows
 *  - admin notification routes → sample data for "send test" and variable lists
 *
 * Placeholders use {{var}} syntax. Layout variables ({{appName}}, {{appUrl}},
 * {{supportEmail}}, {{year}}, {{userName}}) are injected by the dispatcher.
 */
import type { EventKey } from './event-dispatcher';

export interface EventTemplateDef {
  /** Admin display name */
  name: string;
  /** Category for grouping in the admin UI */
  category: 'account' | 'billing' | 'credits' | 'plan' | 'phone' | 'campaign' | 'kyc' | 'team';
  subject: string;
  htmlBody: string;
  textBody: string;
  variables: string[];
  /** Sample data for admin test sends */
  sample: Record<string, string | number>;
  /** In-app notification copy (omit for email-only events such as OTP) */
  inApp?: { title: string; message: string; link: string; icon: string; priority: number };
}

const BASE_STYLES = `body{margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2937;line-height:1.6}
.wrap{max-width:600px;margin:0 auto;padding:32px 16px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.05)}
.hdr{background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:28px 32px;text-align:center}
.hdr h1{margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-.5px}
.body{padding:32px}
.body h2{margin:0 0 16px;font-size:20px;color:#111827}
.body p{margin:0 0 16px;font-size:15px;color:#374151}
.box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;margin:20px 0}
.box table{width:100%;border-collapse:collapse;font-size:14px}
.box td{padding:6px 0;vertical-align:top}
.box td:first-child{color:#64748b;width:45%}
.box td:last-child{color:#111827;font-weight:600;text-align:right}
.btn{display:inline-block;background:#2563eb;color:#fff !important;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px;margin:8px 0 20px}
.code{font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:30px;letter-spacing:8px;font-weight:700;color:#111827;text-align:center;background:#f1f5f9;border-radius:8px;padding:18px;margin:20px 0}
.warn{border-left:4px solid #f59e0b;background:#fffbeb}
.bad{border-left:4px solid #ef4444;background:#fef2f2}
.good{border-left:4px solid #10b981;background:#ecfdf5}
.ftr{padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#94a3b8}
.ftr a{color:#64748b}
@media (max-width:620px){.wrap{padding:16px 8px}.body{padding:24px 20px}.hdr{padding:22px 20px}}`;

/** Wrap inner HTML in the responsive layout (placeholders are resolved at send time). */
export function wrapEventEmail(inner: string, cta?: { label: string; url: string }): string {
  const button = cta ? `<a class="btn" href="${cta.url}">${cta.label}</a>` : '';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{{appName}}</title><style>${BASE_STYLES}</style></head>
<body><div class="wrap"><div class="card">
<div class="hdr"><h1>{{appName}}</h1></div>
<div class="body">
${inner}
${button}
<p style="font-size:13px;color:#6b7280;margin:0">Need help? Write to <a href="mailto:{{supportEmail}}">{{supportEmail}}</a>.</p>
</div>
<div class="ftr">&copy; {{year}} {{appName}}. All rights reserved.<br><a href="{{appUrl}}">{{appUrl}}</a></div>
</div></div></body></html>`;
}

const FOOTER_TEXT = `\n\nNeed help? Write to {{supportEmail}}.\n(c) {{year}} {{appName}} - {{appUrl}}`;

function row(label: string, value: string): string {
  return `<tr><td>${label}</td><td>${value}</td></tr>`;
}

function def(
  name: string,
  category: EventTemplateDef['category'],
  subject: string,
  title: string,
  paragraphs: string[],
  opts: {
    rows?: [string, string][];
    boxClass?: string;
    cta?: { label: string; url: string };
    extraHtml?: string;
    variables: string[];
    sample: Record<string, string | number>;
    inApp?: EventTemplateDef['inApp'];
  }
): EventTemplateDef {
  const box = opts.rows?.length
    ? `<div class="box ${opts.boxClass || ''}"><table>${opts.rows.map(([l, v]) => row(l, v)).join('')}</table></div>`
    : '';
  const inner = `<h2>${title}</h2><p>Hi {{userName}},</p>${paragraphs.map(p => `<p>${p}</p>`).join('')}${opts.extraHtml || ''}${box}`;
  const textRows = opts.rows?.length ? `\n${opts.rows.map(([l, v]) => `${l}: ${v}`).join('\n')}\n` : '';
  const textCta = opts.cta ? `\n${opts.cta.label}: ${opts.cta.url}\n` : '';
  const strip = (s: string) => s.replace(/<[^>]+>/g, '');
  const textBody = `${strip(title)}\n\nHi {{userName}},\n\n${paragraphs.map(strip).join('\n\n')}${textRows}${textCta}${FOOTER_TEXT}`;
  return {
    name,
    category,
    subject,
    htmlBody: wrapEventEmail(inner, opts.cta),
    textBody,
    variables: Array.from(new Set(['userName', 'appName', 'appUrl', 'supportEmail', 'year', ...opts.variables])),
    sample: opts.sample,
    inApp: opts.inApp,
  };
}

const BILLING = '{{appUrl}}/app/billing';
const PHONES = '{{appUrl}}/app/phone-numbers';

export const EVENT_TEMPLATE_DEFAULTS: Record<EventKey, EventTemplateDef> = {
  welcome: def('Welcome Email', 'account', 'Welcome to {{appName}}!', 'Welcome aboard',
    ['Thank you for joining {{appName}}. Your account is ready - create your first AI voice agent, import contacts and launch a campaign in minutes.'],
    { cta: { label: 'Go to Dashboard', url: '{{appUrl}}/app' }, variables: [], sample: {},
      inApp: { title: 'Welcome to {{appName}}, {{userName}}', message: 'Get started by creating your first AI agent and launching a campaign.', link: '/app/agents', icon: 'sparkles', priority: 0 } }),

  email_verification: def('Email Verification (OTP)', 'account', 'Your {{appName}} verification code', 'Verify your email',
    ['Use the code below to verify your email address. It expires in {{expiryMinutes}} minutes.', 'If you did not request this, you can safely ignore this email.'],
    { extraHtml: '<div class="code">{{otpCode}}</div>', variables: ['otpCode', 'code', 'expiryMinutes', 'email'], sample: { otpCode: '482913', code: '482913', expiryMinutes: 5 } }),

  password_reset: def('Password Reset (OTP)', 'account', 'Reset your {{appName}} password', 'Password reset request',
    ['We received a request to reset your password. Enter the code below to continue. It expires in {{expiryMinutes}} minutes.', 'If you did not request a reset, no action is needed - your password stays unchanged.'],
    { extraHtml: '<div class="code">{{otpCode}}</div>', variables: ['otpCode', 'code', 'expiryMinutes', 'email'], sample: { otpCode: '731046', code: '731046', expiryMinutes: 5 } }),

  purchase_completed: def('Purchase Completed', 'billing', 'Payment received - {{appName}}', 'Payment successful',
    ['Thank you for your purchase. Your payment has been received and applied to your account.'],
    { rows: [['Description', '{{description}}'], ['Amount', '{{currency}} {{amount}}'], ['Payment method', '{{paymentMethod}}'], ['Order ID', '{{orderId}}'], ['Invoice', '{{invoiceNumber}}']], boxClass: 'good',
      cta: { label: 'View Billing', url: BILLING }, variables: ['description', 'amount', 'currency', 'paymentMethod', 'orderId', 'invoiceNumber', 'transactionId'],
      sample: { description: '500 credits pack', amount: '1,180.00', currency: 'INR', paymentMethod: 'UPI', orderId: 'ORD_TEST_0001', invoiceNumber: 'AIC/25-26/0001', transactionId: 'txn_test' },
      inApp: { title: 'Payment received', message: '{{description}} - {{currency}} {{amount}} paid successfully.', link: '/app/billing', icon: 'credit-card', priority: 10 } }),

  invoice_created: def('Invoice Created', 'billing', 'Your tax invoice {{invoiceNumber}} - {{appName}}', 'Tax invoice available',
    ['Your GST tax invoice has been generated. A PDF copy is attached to this email and is always available from your billing page.'],
    { rows: [['Invoice number', '{{invoiceNumber}}'], ['Invoice date', '{{invoiceDate}}'], ['Total', '{{currency}} {{amount}}']],
      cta: { label: 'Download Invoice', url: '{{invoiceUrl}}' }, variables: ['invoiceNumber', 'invoiceDate', 'amount', 'currency', 'invoiceUrl'],
      sample: { invoiceNumber: 'AIC/25-26/0001', invoiceDate: '23 Sep 2026', amount: '1,180.00', currency: 'INR', invoiceUrl: '{{appUrl}}/app/billing' },
      inApp: { title: 'Invoice {{invoiceNumber}} ready', message: 'Your tax invoice for {{currency}} {{amount}} is ready to download.', link: '/app/billing', icon: 'file-text', priority: 5 } }),

  payment_failed: def('Payment Failed', 'billing', 'Payment failed - {{appName}}', 'We could not process your payment',
    ['Unfortunately your payment did not go through. No amount has been charged. You can retry the payment from your billing page.'],
    { rows: [['Description', '{{description}}'], ['Amount', '{{currency}} {{amount}}'], ['Reason', '{{reason}}'], ['Order ID', '{{orderId}}']], boxClass: 'bad',
      cta: { label: 'Retry Payment', url: BILLING }, variables: ['description', 'amount', 'currency', 'reason', 'orderId'],
      sample: { description: 'Pro plan (monthly)', amount: '2,360.00', currency: 'INR', reason: 'Bank declined the transaction', orderId: 'ORD_TEST_0002' },
      inApp: { title: 'Payment failed', message: 'Your payment of {{currency}} {{amount}} failed: {{reason}}. Please retry.', link: '/app/billing', icon: 'alert-triangle', priority: 80 } }),

  refund_processed: def('Refund Processed', 'billing', 'Refund processed - {{appName}}', 'Your refund is on its way',
    ['A refund has been issued to your original payment method. Depending on your bank it can take 5-7 working days to appear.'],
    { rows: [['Refund amount', '{{currency}} {{amount}}'], ['Credit note', '{{creditNoteNumber}}'], ['Original invoice', '{{invoiceNumber}}'], ['Reason', '{{reason}}']],
      cta: { label: 'View Billing', url: BILLING }, variables: ['amount', 'currency', 'creditNoteNumber', 'invoiceNumber', 'reason', 'transactionId'],
      sample: { amount: '1,180.00', currency: 'INR', creditNoteNumber: 'CN/25-26/0001', invoiceNumber: 'AIC/25-26/0001', reason: 'Requested by customer', transactionId: 'txn_test' },
      inApp: { title: 'Refund processed', message: '{{currency}} {{amount}} refunded ({{creditNoteNumber}}).', link: '/app/billing', icon: 'rotate-ccw', priority: 20 } }),

  credits_added: def('Credits Added', 'credits', '{{credits}} credits added to your account - {{appName}}', 'Credits added',
    ['Your purchase is complete and credits have been added to your balance.'],
    { rows: [['Credits added', '{{credits}}'], ['New balance', '{{balance}}'], ['Description', '{{description}}']], boxClass: 'good',
      cta: { label: 'View Balance', url: BILLING }, variables: ['credits', 'balance', 'description'],
      sample: { credits: 500, balance: 640, description: '500 credits pack' },
      inApp: { title: '{{credits}} credits added', message: 'Your balance is now {{balance}} credits.', link: '/app/billing', icon: 'coins', priority: 10 } }),

  credits_added_by_admin: def('Credits Added by Admin', 'credits', '{{credits}} credits added to your account - {{appName}}', 'Credits added to your account',
    ['Our team has added credits to your account.'],
    { rows: [['Credits added', '{{credits}}'], ['New balance', '{{balance}}'], ['Note', '{{reason}}']], boxClass: 'good',
      cta: { label: 'View Balance', url: BILLING }, variables: ['credits', 'balance', 'reason'],
      sample: { credits: 100, balance: 240, reason: 'Goodwill credit' },
      inApp: { title: '{{credits}} credits added', message: '{{reason}}. Your balance is now {{balance}} credits.', link: '/app/billing', icon: 'gift', priority: 10 } }),

  low_credits: def('Low Credits Warning', 'credits', 'Low credit balance - {{appName}}', 'Your credits are running low',
    ['Your balance has dropped below the threshold. Top up now so calls, campaigns and phone number renewals keep running without interruption.'],
    { rows: [['Current balance', '{{currentCredits}} credits'], ['Alert threshold', '{{threshold}} credits']], boxClass: 'warn',
      cta: { label: 'Buy Credits', url: BILLING }, variables: ['currentCredits', 'threshold'],
      sample: { currentCredits: 25, threshold: 50 },
      inApp: { title: 'Low credits', message: 'Only {{currentCredits}} credits left. Top up to keep calls running.', link: '/app/billing', icon: 'alert-circle', priority: 60 } }),

  plan_activated: def('Plan Activated', 'plan', 'Your {{planName}} plan is active - {{appName}}', 'Welcome to {{planName}}',
    ['Your plan has been activated and all its features are now available on your account.'],
    { rows: [['Plan', '{{planName}}'], ['Billing period', '{{billingPeriod}}'], ['Amount paid', '{{currency}} {{amount}}'], ['Valid until', '{{expiresAt}}']], boxClass: 'good',
      cta: { label: 'Go to Dashboard', url: '{{appUrl}}/app' }, variables: ['planName', 'billingPeriod', 'amount', 'currency', 'expiresAt'],
      sample: { planName: 'Pro', billingPeriod: 'monthly', amount: '2,360.00', currency: 'INR', expiresAt: '23 Oct 2026' },
      inApp: { title: '{{planName}} plan activated', message: 'Your {{planName}} plan is active until {{expiresAt}}.', link: '/app/billing', icon: 'crown', priority: 20 } }),

  plan_renewed: def('Plan Renewed', 'plan', 'Your {{planName}} plan has been renewed - {{appName}}', 'Plan renewed',
    ['Thank you - your plan has been renewed and your access continues without interruption.'],
    { rows: [['Plan', '{{planName}}'], ['Billing period', '{{billingPeriod}}'], ['Amount paid', '{{currency}} {{amount}}'], ['Valid until', '{{expiresAt}}']], boxClass: 'good',
      cta: { label: 'View Billing', url: BILLING }, variables: ['planName', 'billingPeriod', 'amount', 'currency', 'expiresAt'],
      sample: { planName: 'Pro', billingPeriod: 'monthly', amount: '2,360.00', currency: 'INR', expiresAt: '23 Nov 2026' },
      inApp: { title: '{{planName}} plan renewed', message: 'Your plan is now valid until {{expiresAt}}.', link: '/app/billing', icon: 'refresh-cw', priority: 10 } }),

  plan_expiring: def('Plan Expiring Reminder', 'plan', 'Your {{planName}} plan expires in {{daysLeft}} day(s) - {{appName}}', 'Your plan expires soon',
    ['Your {{planName}} plan expires in {{daysLeft}} day(s). Renew now with a one-time payment to keep your agents, campaigns and phone numbers active.'],
    { rows: [['Plan', '{{planName}}'], ['Expires on', '{{expiresAt}}'], ['Renewal amount', '{{currency}} {{amount}}']], boxClass: 'warn',
      cta: { label: 'Renew Now', url: BILLING }, variables: ['planName', 'daysLeft', 'expiresAt', 'amount', 'currency'],
      sample: { planName: 'Pro', daysLeft: 3, expiresAt: '26 Sep 2026', amount: '2,360.00', currency: 'INR' },
      inApp: { title: 'Plan expires in {{daysLeft}} day(s)', message: 'Renew your {{planName}} plan before {{expiresAt}} to avoid interruption.', link: '/app/billing', icon: 'clock', priority: 50 } }),

  plan_expired: def('Plan Expired', 'plan', 'Your {{planName}} plan has expired - {{appName}}', 'Your plan has expired',
    ['Your {{planName}} plan expired on {{expiredAt}} and your account has been moved to the Free plan. Renew any time to restore full access.'],
    { rows: [['Previous plan', '{{planName}}'], ['Expired on', '{{expiredAt}}']], boxClass: 'bad',
      cta: { label: 'Renew Plan', url: BILLING }, variables: ['planName', 'expiredAt'],
      sample: { planName: 'Pro', expiredAt: '23 Sep 2026' },
      inApp: { title: '{{planName}} plan expired', message: 'Your account is now on the Free plan. Renew to restore access.', link: '/app/billing', icon: 'alert-triangle', priority: 70 } }),

  auto_renew_enabled: def('Auto-renew Enabled', 'plan', 'Auto-renew is on for your {{planName}} plan - {{appName}}', 'Auto-renew enabled',
    ['Your {{planName}} plan will now renew automatically via {{paymentMethod}}, so your agents, campaigns and phone numbers stay active without a manual payment each period. You can turn this off any time from the billing page.'],
    { rows: [['Plan', '{{planName}}'], ['Billing period', '{{billingPeriod}}'], ['Renewal amount', '{{currency}} {{amount}}'], ['Next charge on', '{{nextChargeAt}}'], ['Payment method', '{{paymentMethod}}']], boxClass: 'good',
      cta: { label: 'Manage Auto-renew', url: BILLING }, variables: ['planName', 'billingPeriod', 'amount', 'currency', 'nextChargeAt', 'paymentMethod'],
      sample: { planName: 'Pro', billingPeriod: 'monthly', amount: '2,360.00', currency: 'INR', nextChargeAt: '23 Oct 2026', paymentMethod: 'UPI AutoPay' },
      inApp: { title: 'Auto-renew enabled', message: 'Your {{planName}} plan renews automatically on {{nextChargeAt}} via {{paymentMethod}}.', link: '/app/billing', icon: 'refresh-cw', priority: 10 } }),

  auto_renew_disabled: def('Auto-renew Disabled', 'plan', 'Auto-renew is off for your {{planName}} plan - {{appName}}', 'Auto-renew turned off',
    ['Automatic renewal has been turned off for your {{planName}} plan. Your current period stays active until {{expiresAt}}; after that, renew with a one-time payment or enable auto-renew again from the billing page.'],
    { rows: [['Plan', '{{planName}}'], ['Active until', '{{expiresAt}}']], boxClass: 'warn',
      cta: { label: 'View Billing', url: BILLING }, variables: ['planName', 'expiresAt'],
      sample: { planName: 'Pro', expiresAt: '23 Oct 2026' },
      inApp: { title: 'Auto-renew turned off', message: 'Your {{planName}} plan will not renew automatically. It stays active until {{expiresAt}}.', link: '/app/billing', icon: 'alert-circle', priority: 40 } }),

  phone_number_purchased: def('Phone Number Purchased', 'phone', 'Phone number {{phoneNumber}} is ready - {{appName}}', 'Your new phone number',
    ['Your phone number has been provisioned and is ready to be assigned to an agent.'],
    { rows: [['Number', '{{phoneNumber}}'], ['Country', '{{country}}'], ['Amount', '{{currency}} {{amount}}'], ['Next renewal', '{{nextBillingDate}}']], boxClass: 'good',
      cta: { label: 'Manage Numbers', url: PHONES }, variables: ['phoneNumber', 'country', 'amount', 'currency', 'nextBillingDate'],
      sample: { phoneNumber: '+91 80000 00000', country: 'IN', amount: '1,180.00', currency: 'INR', nextBillingDate: '23 Oct 2026' },
      inApp: { title: 'Phone number ready', message: '{{phoneNumber}} has been added to your account.', link: '/app/phone-numbers', icon: 'phone', priority: 10 } }),

  phone_number_expiring: def('Phone Number Expiring', 'phone', 'Phone number {{phoneNumber}} renews in {{daysLeft}} day(s) - {{appName}}', 'Phone number renewal due',
    ['Your phone number is due for renewal in {{daysLeft}} day(s). Make sure you have enough credits or renew now to keep the number.'],
    { rows: [['Number', '{{phoneNumber}}'], ['Renewal date', '{{nextBillingDate}}'], ['Renewal cost', '{{monthlyCredits}} credits']], boxClass: 'warn',
      cta: { label: 'Manage Numbers', url: PHONES }, variables: ['phoneNumber', 'daysLeft', 'nextBillingDate', 'monthlyCredits', 'provider'],
      sample: { phoneNumber: '+91 80000 00000', daysLeft: 3, nextBillingDate: '26 Sep 2026', monthlyCredits: 100, provider: 'plivo' },
      inApp: { title: 'Number renews in {{daysLeft}} day(s)', message: '{{phoneNumber}} renews on {{nextBillingDate}} for {{monthlyCredits}} credits.', link: '/app/phone-numbers', icon: 'clock', priority: 40 } }),

  phone_number_released: def('Phone Number Released', 'phone', 'Phone number {{phoneNumber}} released - {{appName}}', 'Phone number released',
    ['Your phone number has been released and is no longer attached to your account.'],
    { rows: [['Number', '{{phoneNumber}}'], ['Reason', '{{reason}}']], boxClass: 'bad',
      cta: { label: 'Get a New Number', url: PHONES }, variables: ['phoneNumber', 'reason'],
      sample: { phoneNumber: '+91 80000 00000', reason: 'Insufficient credits at renewal' },
      inApp: { title: 'Phone number released', message: '{{phoneNumber}} was released: {{reason}}', link: '/app/phone-numbers', icon: 'phone-off', priority: 70 } }),

  phone_billing_failed: def('Phone Number Billing Failed', 'phone', 'Renewal failed for {{phoneNumber}} - {{appName}}', 'Phone number renewal failed',
    ['We could not renew your phone number because your credit balance was too low. Campaigns using this number have been paused.'],
    { rows: [['Number', '{{phoneNumber}}'], ['Credits required', '{{creditsRequired}}'], ['Current balance', '{{currentCredits}}'], ['Details', '{{reason}}']], boxClass: 'bad',
      cta: { label: 'Buy Credits', url: BILLING }, variables: ['phoneNumber', 'creditsRequired', 'currentCredits', 'reason'],
      sample: { phoneNumber: '+91 80000 00000', creditsRequired: 100, currentCredits: 20, reason: 'Insufficient credits' },
      inApp: { title: 'Phone number billing failed', message: '{{phoneNumber}}: {{reason}}. Top up to restore it.', link: '/app/phone-numbers', icon: 'alert-triangle', priority: 80 } }),

  campaign_completed: def('Campaign Completed', 'campaign', 'Campaign "{{campaignName}}" completed - {{appName}}', 'Campaign completed',
    ['Your campaign has finished. Here is a quick summary of the results.'],
    { rows: [['Campaign', '{{campaignName}}'], ['Calls made', '{{callsCompleted}}'], ['Successful', '{{callsSuccessful}}'], ['Success rate', '{{successRate}}']], boxClass: 'good',
      cta: { label: 'View Results', url: '{{appUrl}}/app/campaigns/{{campaignId}}' }, variables: ['campaignName', 'campaignId', 'callsCompleted', 'callsSuccessful', 'successRate'],
      sample: { campaignName: 'Diwali Offer', campaignId: 'sample', callsCompleted: 120, callsSuccessful: 96, successRate: '80%' },
      inApp: { title: 'Campaign completed', message: '"{{campaignName}}" finished with {{callsCompleted}} calls ({{successRate}} successful).', link: '/app/campaigns/{{campaignId}}', icon: 'check-circle', priority: 10 } }),

  campaign_failed: def('Campaign Failed', 'campaign', 'Campaign "{{campaignName}}" failed - {{appName}}', 'Campaign failed',
    ['Your campaign stopped because of an error. Review the details below and restart the campaign when ready.'],
    { rows: [['Campaign', '{{campaignName}}'], ['Reason', '{{reason}}']], boxClass: 'bad',
      cta: { label: 'Open Campaign', url: '{{appUrl}}/app/campaigns/{{campaignId}}' }, variables: ['campaignName', 'campaignId', 'reason'],
      sample: { campaignName: 'Diwali Offer', campaignId: 'sample', reason: 'Phone number unavailable' },
      inApp: { title: 'Campaign failed', message: '"{{campaignName}}" failed: {{reason}}', link: '/app/campaigns/{{campaignId}}', icon: 'x-circle', priority: 70 } }),

  kyc_approved: def('KYC Approved', 'kyc', 'KYC verification approved - {{appName}}', 'KYC approved',
    ['Your KYC documents have been verified. You can now purchase phone numbers and use all calling features.'],
    { cta: { label: 'Buy a Phone Number', url: PHONES }, variables: [], sample: {},
      inApp: { title: 'KYC approved', message: 'Your KYC verification has been approved. You can now purchase phone numbers.', link: '/app/settings', icon: 'shield-check', priority: 20 } }),

  kyc_rejected: def('KYC Rejected', 'kyc', 'KYC verification needs attention - {{appName}}', 'KYC verification rejected',
    ['We could not verify the documents you submitted. Please review the reason below and resubmit.'],
    { rows: [['Reason', '{{reason}}']], boxClass: 'bad',
      cta: { label: 'Resubmit Documents', url: '{{appUrl}}/app/settings' }, variables: ['reason'],
      sample: { reason: 'Document image is not readable' },
      inApp: { title: 'KYC rejected', message: 'Your KYC verification was rejected: {{reason}}. Please resubmit.', link: '/app/settings', icon: 'shield-alert', priority: 60 } }),

  team_invite: def('Team Invitation', 'team', '{{inviterName}} invited you to {{teamName}} on {{appName}}', 'You have been invited',
    ['{{inviterName}} has invited you to join the team "{{teamName}}" as {{role}}. Accept the invitation to get started.'],
    { cta: { label: 'Accept Invitation', url: '{{inviteUrl}}' }, variables: ['inviterName', 'teamName', 'role', 'inviteUrl'],
      sample: { inviterName: 'Priya', teamName: 'Sales Team', role: 'member', inviteUrl: '{{appUrl}}/auth' } }),

  account_suspended: def('Account Suspended', 'account', 'Your {{appName}} account has been suspended', 'Account suspended',
    ['Your account has been suspended and you can no longer sign in. If you believe this is a mistake, please contact support.'],
    { rows: [['Reason', '{{reason}}']], boxClass: 'bad', variables: ['reason'], sample: { reason: 'Terms of service violation' } }),

  account_reactivated: def('Account Reactivated', 'account', 'Your {{appName}} account is active again', 'Account reactivated',
    ['Good news - your account has been reactivated and you can sign in and use all features again.'],
    { cta: { label: 'Sign In', url: '{{appUrl}}/auth' }, variables: [], sample: {},
      inApp: { title: 'Account reactivated', message: 'Your account is active again. Welcome back!', link: '/app', icon: 'check-circle', priority: 20 } }),
};

export const ALL_EVENT_KEYS = Object.keys(EVENT_TEMPLATE_DEFAULTS) as EventKey[];

export function isEventKey(value: unknown): value is EventKey {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(EVENT_TEMPLATE_DEFAULTS, value);
}
