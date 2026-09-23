/**
 * Public pricing for the marketing pages. Reads GET /api/public/pricing (no auth) and falls back
 * to the static snapshot in ./types when the request fails, so the pricing page never renders
 * empty. `isFallback` lets the UI say so instead of presenting stale numbers as live.
 */
import { useQuery } from "@tanstack/react-query";
import { FALLBACK_PRICING, type PublicPlan, type PublicPricing } from "./types";

export const PUBLIC_PRICING_QUERY_KEY = ["/api/public/pricing"] as const;

function isPublicPricing(value: unknown): value is PublicPricing {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<PublicPricing>;
  return Array.isArray(v.plans) && Array.isArray(v.packages) && typeof v.gstRate === "number";
}

export interface UsePublicPricingResult {
  pricing: PublicPricing | null;
  isLoading: boolean;
  isFallback: boolean;
  /** The ₹0 plan (marketing copy reads its included minutes) */
  freePlan: PublicPlan | null;
  /** Plans a visitor can sign up for — free first, then by monthly price (as served) */
  paidPlans: PublicPlan[];
}

export function usePublicPricing(): UsePublicPricingResult {
  const { data, isLoading, isError } = useQuery<unknown>({
    queryKey: PUBLIC_PRICING_QUERY_KEY,
    staleTime: 60 * 1000,
    retry: 1,
  });

  const live = isPublicPricing(data) ? data : null;
  const isFallback = !live && (isError || (data !== undefined && !isLoading));
  const pricing = live ?? (isFallback ? FALLBACK_PRICING : null);

  const freePlan = pricing?.plans.find((p) => p.monthlyPrice === 0) ?? null;
  const paidPlans = pricing?.plans.filter((p) => p.monthlyPrice > 0) ?? [];

  return { pricing, isLoading: !pricing && isLoading, isFallback, freePlan, paidPlans };
}

/** Included minutes on the free plan, for trust badges ("15 free call minutes"). */
export function useFreeMinutes(): number {
  const { freePlan } = usePublicPricing();
  return freePlan?.includedCredits ?? FALLBACK_PRICING.plans[0].includedCredits;
}
