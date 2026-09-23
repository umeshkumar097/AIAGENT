/**
 * Admin → Payments: Cashfree gateway, Invoice & GST settings, transactional email events.
 */
import { useTranslation } from "react-i18next";
import { CashfreeSettingsCard } from "@/components/admin/payments/CashfreeSettingsCard";
import { InvoiceSettingsCard } from "@/components/admin/payments/InvoiceSettingsCard";
import { EmailEventsCard } from "@/components/admin/payments/EmailEventsCard";

export default function PaymentsSettings() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6" data-testid="payments-settings">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">{t("admin.payments.cashfree.pageTitle", "Payments & invoicing")}</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          {t("admin.payments.cashfree.pageDescription", "Cashfree is the only payment gateway. Configure credentials, GST invoice details and the emails customers receive.")}
        </p>
      </div>
      <CashfreeSettingsCard />
      <InvoiceSettingsCard />
      <EmailEventsCard />
    </div>
  );
}
