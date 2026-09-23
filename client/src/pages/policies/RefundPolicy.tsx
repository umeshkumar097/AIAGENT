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
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useBranding } from "@/components/BrandingProvider";
import { useCompanyInfo } from "@/components/landing/Footer";

export default function RefundPolicy() {
  const [, setLocation] = useLocation();
  const { branding, currentLogo } = useBranding();
  const company = useCompanyInfo();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-background sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation("/")}>
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt={branding.app_name}
                  className="h-10 w-auto max-w-[180px] object-contain"
                  data-testid="img-policy-logo"
                />
              ) : (
                <>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Mic2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {branding.app_name}
                  </span>
                </>
              )}
            </div>
            <Button variant="ghost" onClick={() => setLocation("/")} data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund &amp; Cancellation Policy</h1>
          <p className="text-muted-foreground text-lg mb-12">Effective date: January 1, 2026</p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Scope</h2>
            <p className="text-lg leading-relaxed mb-4">
              This Refund &amp; Cancellation Policy applies to all purchases made on {branding.app_name}, operated by {company.legalName} ({company.tradingAs}). It covers:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
              <li><strong>Credit and minute packs:</strong> prepaid calling credits or minutes added to your account balance</li>
              <li><strong>Subscription plans:</strong> prepaid access to platform features for a fixed billing period</li>
              <li><strong>Phone number rentals:</strong> recurring fees for virtual phone numbers provisioned to your account</li>
            </ul>
            <p className="text-lg leading-relaxed mb-4">
              All of the above are digital services. Prices are quoted and billed in Indian Rupees (INR), inclusive of applicable GST, and payments are processed by Cashfree Payments India Pvt. Ltd.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Cancellation</h2>
            <p className="text-lg leading-relaxed mb-4">
              Subscription plans are prepaid for each billing period and do not auto-renew. Cancelling a subscription simply means choosing not to renew it at the end of the current period. No further charges are made unless you purchase a new plan or pack.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              After cancellation, your access to plan features and any remaining plan allowances continues until the end of the billing period you have already paid for.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. Refunds</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
              <li><strong>Unused credit packs:</strong> A credit or minute pack that is entirely unused may be refunded on request within 7 days of purchase.</li>
              <li><strong>Consumed credits and minutes:</strong> Credits or minutes that have been used, in whole or in part, are not refundable.</li>
              <li><strong>Partially used plans:</strong> Subscription fees are not refundable once the billing period has started and any plan feature or allowance has been used.</li>
              <li><strong>Phone number rentals:</strong> Rental fees are non-refundable once the phone number has been provisioned to your account.</li>
              <li><strong>Failed or duplicate payments:</strong> Amounts debited for a failed transaction, or charged more than once for the same order, are refunded automatically to the original payment method within 5 to 7 business days.</li>
            </ul>
            <p className="text-lg leading-relaxed mb-4">
              Approved refunds are issued to the original payment method only. Depending on your bank or card issuer, it may take additional time for the amount to appear in your statement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. How to Request a Refund</h2>
            <p className="text-lg leading-relaxed mb-4">
              To request a refund, email us at{" "}
              <a href={`mailto:${company.supportEmail}`} className="underline" data-testid="link-refund-support-email">
                {company.supportEmail}
              </a>{" "}
              from the email address registered to your account. Please include your order or transaction ID, the date of purchase and the reason for the request. We aim to respond within 3 business days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Disputes and Chargebacks</h2>
            <p className="text-lg leading-relaxed mb-4">
              We encourage you to contact us before raising a dispute or chargeback with your bank or card issuer, as most billing issues can be resolved quickly through support. Where a chargeback is raised for a service that has been delivered in accordance with this policy, we reserve the right to suspend the associated account and to provide transaction and usage records to the payment processor or issuing bank.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Governing Law and Jurisdiction</h2>
            <p className="text-lg leading-relaxed mb-4">
              This policy is governed by the laws of India. Any dispute arising out of or in connection with it is subject to the exclusive jurisdiction of the courts of Gautam Buddha Nagar, Uttar Pradesh.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Changes to This Policy</h2>
            <p className="text-lg leading-relaxed mb-4">
              We may update this policy from time to time. Changes take effect when posted on this page, and the effective date above will be updated. Purchases made before a change remain subject to the policy in force at the time of purchase.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Contact</h2>
            <p className="text-lg leading-relaxed mb-2" data-testid="text-refund-company">
              <strong>{company.legalName}</strong> ({company.tradingAs})
            </p>
            <p className="text-lg leading-relaxed mb-2" data-testid="text-refund-address">
              Registered Office: {company.address}
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Email:{" "}
              <a href={`mailto:${company.supportEmail}`} className="underline">
                {company.supportEmail}
              </a>
              {company.phone && (
                <>
                  {" "}· Phone:{" "}
                  <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="underline">
                    {company.phone}
                  </a>
                </>
              )}
            </p>
            <p className="text-lg leading-relaxed mb-4">
              See also our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
