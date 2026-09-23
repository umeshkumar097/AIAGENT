/**
 * Credit top-up table (1 credit = 1 call minute). Rows come from /api/public/pricing; the
 * per-minute column and "save vs. smallest pack" are computed, not hard-coded.
 */
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import type { PublicPricing } from "./types";
import { formatCount, formatInrPaise, formatInrWhole, gstNote, perMinute, type Tr } from "./format";

interface TopUpTableProps {
  pricing: PublicPricing | null;
  isLoading: boolean;
}

export function TopUpTable({ pricing, isLoading }: TopUpTableProps) {
  const { t } = useTranslation();
  const tr = t as Tr;
  const packages = pricing?.packages ?? [];
  const baseRate = packages.length > 0 ? perMinute(packages[0].price, packages[0].credits) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-3">
          {tr("landing.publicPricing.topUps.title", "Need more minutes? Top up any time")}
        </h3>
        <p className="text-slate-400">
          {tr("landing.publicPricing.topUps.subtitle", "Add-on minutes for paid plans. 1 credit = 1 call minute, and top-up credits never expire.")}
        </p>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[520px]" data-testid="topup-table">
            <thead>
              <tr className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">{tr("landing.publicPricing.topUps.pack", "Pack")}</th>
                <th className="p-4 font-medium text-right">{tr("landing.publicPricing.topUps.minutes", "Minutes")}</th>
                <th className="p-4 font-medium text-right">{tr("landing.publicPricing.topUps.price", "Price")}</th>
                <th className="p-4 font-medium text-right">{tr("landing.publicPricing.topUps.perMinute", "Per minute")}</th>
                <th className="p-4 font-medium text-right hidden sm:table-cell">{tr("landing.publicPricing.topUps.saving", "You save")}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading || !pricing
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t border-white/5" aria-hidden="true">
                      {Array.from({ length: 5 }).map((__, j) => (
                        <td key={j} className={`p-4 ${j === 4 ? "hidden sm:table-cell" : ""}`}>
                          <Skeleton className="h-4 w-20 bg-white/10 ml-auto" />
                        </td>
                      ))}
                    </tr>
                  ))
                : packages.map((pkg) => {
                    const rate = perMinute(pkg.price, pkg.credits);
                    const saving = rate !== null && baseRate !== null && baseRate > 0 ? Math.round((1 - rate / baseRate) * 100) : 0;
                    return (
                      <tr key={pkg.id} className="border-t border-white/5" data-testid={`topup-row-${pkg.credits}`}>
                        <td className="p-4 font-semibold text-white">{pkg.name}</td>
                        <td className="p-4 text-right text-slate-300">{formatCount(pkg.credits)}</td>
                        <td className="p-4 text-right text-white font-semibold">{formatInrWhole(pkg.price)}</td>
                        <td className="p-4 text-right text-[#27D3C9]">{rate !== null ? formatInrPaise(rate) : "—"}</td>
                        <td className="p-4 text-right text-slate-400 hidden sm:table-cell">{saving > 0 ? `${saving}%` : "—"}</td>
                      </tr>
                    );
                  })}
              {!isLoading && pricing && packages.length === 0 && (
                <tr className="border-t border-white/5">
                  <td className="p-6 text-center text-slate-400" colSpan={5}>
                    {tr("landing.publicPricing.topUps.none", "Top-up packs are available from your billing dashboard.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {pricing && (
        <p className="text-xs text-slate-500 text-center mt-4">
          {tr("landing.publicPricing.topUps.note", "Prices in INR, {{gst}}. Calls are billed per started minute.", { gst: gstNote(pricing, tr) })}
        </p>
      )}
    </div>
  );
}
