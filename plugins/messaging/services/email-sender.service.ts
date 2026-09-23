/**
 * Platform email transport for the messaging plugin.
 *
 * Delegates to the core email service (Resend or SMTP, whichever the admin
 * configured under Master Settings). The user never configures SMTP here;
 * `replyTo` carries the sending user's account email so replies reach them.
 */
type PlatformEmailService = {
  sendEmail(
    to: string,
    subject: string,
    html: string,
    attachments?: unknown,
    options?: { replyTo?: string; text?: string }
  ): Promise<{ success: boolean; error?: string; messageId?: string }>;
};

/** The core emailService singleton, published by server/services/email-service.ts (plugins run from their own bundle). */
function platformEmailService(): PlatformEmailService | null {
  const svc = (globalThis as any).__platformEmailService as PlatformEmailService | undefined;
  return svc && typeof svc.sendEmail === 'function' ? svc : null;
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const emailService = platformEmailService();
  if (!emailService) {
    const error = 'Platform email service is not available';
    console.error(`[Email Sender] Cannot send to ${to}: ${error}`);
    return { success: false, error };
  }
  try {
    const result = await emailService.sendEmail(
      to,
      subject,
      html,
      undefined,
      replyTo ? { replyTo } : undefined
    );
    if (!result.success) {
      console.warn(`[Email Sender] Platform email to ${to} failed: ${result.error}`);
    }
    return result;
  } catch (error: any) {
    console.error(`[Email Sender] Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message || 'Unknown email error' };
  }
}
