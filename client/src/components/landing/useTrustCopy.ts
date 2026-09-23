/**
 * Trust-badge copy shared by the landing sections ("15 free call minutes", "No credit card
 * required"). The minute count is read from the free plan on /api/public/pricing so the
 * marketing site never drifts from what the product actually grants.
 */
import { useTranslation } from "react-i18next";
import { useFreeMinutes } from "@/components/pricing/usePublicPricing";

export function useTrustCopy(): { freeMinutes: string; noCard: string; trustLine: string } {
  const { t } = useTranslation();
  const minutes = useFreeMinutes();
  const freeMinutes = t("landing.trust.freeMinutes", "{{count}} free call minutes", { count: minutes });
  const noCard = t("landing.trust.noCard", "No credit card required");
  const trustLine = t("landing.trust.line", "{{minutes}} • No credit card required", { minutes: freeMinutes });
  return { freeMinutes, noCard, trustLine };
}
