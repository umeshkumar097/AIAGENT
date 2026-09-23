/**
 * "How many minutes do you call per month?" slider. Recommends the cheapest plan that covers the
 * usage, or the largest plan plus top-up packs when usage exceeds it. Every number comes from the
 * plans and packages served by /api/public/pricing.
 */
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PublicCreditPackage, PublicPlan, PublicPricing } from "./types";
import { formatCount, formatInrWhole, gstNote, type Tr } from "./format";

interface UsageCalculatorProps {
  pricing: PublicPricing | null;
}

interface Recommendation {
  plan: PublicPlan;
  extraMinutes: number;
  packs: Array<{ pkg: PublicCreditPackage; qty: number }>;
  topUpCost: number;
  monthlyTotal: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Cheapest multiset of packs covering at least `minutes` (unbounded knapsack over the ladder,
 * in units of the packs' common divisor so the table stays tiny).
 */
function topUpFor(minutes: number, packages: PublicCreditPackage[]): Array<{ pkg: PublicCreditPackage; qty: number }> {
  const packs = packages.filter((p) => p.credits > 0 && p.price > 0);
  if (minutes <= 0 || packs.length === 0) return [];
  const unit = packs.reduce((g, p) => gcd(g, p.credits), packs[0].credits);
  const target = Math.ceil(minutes / unit);
  if (target > 20000) return [];
  const cost = new Array<number>(target + 1).fill(Infinity);
  const pick = new Array<PublicCreditPackage | null>(target + 1).fill(null);
  cost[0] = 0;
  for (let i = 1; i <= target; i++) {
    for (const p of packs) {
      const prev = Math.max(0, i - p.credits / unit);
      const c = cost[prev] + p.price;
      if (c < cost[i]) {
        cost[i] = c;
        pick[i] = p;
      }
    }
  }
  const counts = new Map<string, { pkg: PublicCreditPackage; qty: number }>();
  for (let i = target; i > 0; ) {
    const p = pick[i];
    if (!p) break;
    const entry = counts.get(p.id) ?? { pkg: p, qty: 0 };
    entry.qty += 1;
    counts.set(p.id, entry);
    i = Math.max(0, i - p.credits / unit);
  }
  return [...counts.values()].sort((a, b) => b.pkg.credits - a.pkg.credits);
}

/**
 * Cheapest way to get `minutes` a month: each plan's price plus top-ups for any shortfall
 * (the free plan cannot buy top-ups, so it only qualifies when it covers the usage outright).
 * Ties go to the plan with more included minutes.
 */
function recommend(minutes: number, pricing: PublicPricing): Recommendation | null {
  const plans = [...pricing.plans].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  if (plans.length === 0) return null;
  let best: Recommendation | null = null;
  for (const plan of plans) {
    const extraMinutes = Math.max(0, minutes - plan.includedCredits);
    const isFree = plan.monthlyPrice <= 0;
    if (isFree && extraMinutes > 0) continue;
    const packs = topUpFor(extraMinutes, pricing.packages);
    const bought = packs.reduce((sum, { pkg, qty }) => sum + pkg.credits * qty, 0);
    if (extraMinutes > 0 && bought < extraMinutes) continue;
    const topUpCost = packs.reduce((sum, { pkg, qty }) => sum + pkg.price * qty, 0);
    const candidate = { plan, extraMinutes, packs, topUpCost, monthlyTotal: plan.monthlyPrice + topUpCost };
    if (!best || candidate.monthlyTotal < best.monthlyTotal ||
      (candidate.monthlyTotal === best.monthlyTotal && plan.includedCredits > best.plan.includedCredits)) {
      best = candidate;
    }
  }
  if (best) return best;
  const largest = plans[plans.length - 1];
  return { plan: largest, extraMinutes: Math.max(0, minutes - largest.includedCredits), packs: [], topUpCost: 0, monthlyTotal: largest.monthlyPrice };
}

export function UsageCalculator({ pricing }: UsageCalculatorProps) {
  const { t } = useTranslation();
  const tr = t as Tr;
  const maxIncluded = pricing ? Math.max(100, ...pricing.plans.map((p) => p.includedCredits)) : 2500;
  const maxMins = Math.ceil((maxIncluded * 2) / 500) * 500;
  const [minutes, setMinutes] = useState(500);
  const rec = useMemo(() => (pricing ? recommend(minutes, pricing) : null), [pricing, minutes]);

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-3">{tr("landing.publicPricing.calc.title", "Which plan fits your call volume?")}</h3>
        <p className="text-slate-400">{tr("landing.publicPricing.calc.subtitle", "Drag to your expected minutes per month. 1 credit = 1 minute, billed per started minute.")}</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
          <div className="flex-1 w-full">
            <div className="text-sm text-[#27D3C9] font-bold tracking-widest uppercase mb-1">
              {tr("landing.publicPricing.calc.expected", "Expected usage")}
            </div>
            <div className="text-4xl font-extrabold text-white mb-6">
              {formatCount(minutes)} <span className="text-xl text-slate-400 font-medium">{tr("landing.publicPricing.calc.minsPerMonth", "mins / month")}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxMins}
              step={50}
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
              aria-label={tr("landing.publicPricing.calc.expected", "Expected usage")}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#27D3C9]"
              data-testid="usage-slider"
            />
            <div className="flex justify-between text-xs font-medium text-slate-500 mt-3">
              <span>0</span>
              <span>{formatCount(maxMins)}+</span>
            </div>
          </div>

          <div className="w-full md:w-[340px] bg-black/40 border border-white/10 rounded-2xl p-6 text-center shadow-inner">
            <div className="text-sm text-slate-400 mb-2">{tr("landing.publicPricing.calc.recommended", "Recommended plan")}</div>
            {!rec ? (
              <div className="text-xl font-bold text-white">—</div>
            ) : (
              <>
                <div className="text-2xl font-bold text-white" data-testid="usage-recommended-plan">{rec.plan.displayName}</div>
                <div className="text-sm text-[#27D3C9] mt-1">
                  {tr("landing.publicPricing.calc.covers", "{{count}} minutes included", { count: formatCount(rec.plan.includedCredits) })}
                </div>
                {rec.extraMinutes > 0 && (
                  <div className="text-xs text-slate-400 mt-3 space-y-1">
                    <div>{tr("landing.publicPricing.calc.plusTopUp", "+ {{count}} extra minutes via top-up:", { count: formatCount(rec.extraMinutes) })}</div>
                    {rec.packs.map(({ pkg, qty }) => (
                      <div key={pkg.id}>{qty > 1 ? `${qty} × ` : ""}{pkg.name} — {formatInrWhole(pkg.price * qty)}</div>
                    ))}
                  </div>
                )}
                <div className="border-t border-white/10 mt-5 pt-5">
                  <div className="text-sm text-slate-400 mb-1">{tr("landing.publicPricing.calc.estimate", "Estimated monthly cost")}</div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#27D3C9] to-blue-400" data-testid="usage-estimate">
                    {rec.monthlyTotal > 0 ? formatInrWhole(rec.monthlyTotal) : tr("landing.publicPricing.freePrice", "Free")}
                  </div>
                  {pricing && rec.monthlyTotal > 0 && <div className="text-xs text-slate-500 mt-1">{gstNote(pricing, tr)}</div>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
