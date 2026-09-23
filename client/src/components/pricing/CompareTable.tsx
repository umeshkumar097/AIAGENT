/**
 * Side-by-side plan comparison built from the plan rows served by /api/public/pricing.
 * Every cell is a quota or flag on the plan — no hand-maintained feature matrix.
 */
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PublicPlan, PublicPricing } from "./types";
import { formatCount, formatInrWhole, type Tr } from "./format";

interface CompareTableProps {
  pricing: PublicPricing | null;
}

type Row = { label: string; cell: (plan: PublicPlan) => string | boolean };

function Flag({ on }: { on: boolean }) {
  return on ? <Check className="w-4 h-4 mx-auto text-[#27D3C9]" aria-label="yes" /> : <X className="w-4 h-4 mx-auto text-slate-600" aria-label="no" />;
}

export function CompareTable({ pricing }: CompareTableProps) {
  const { t } = useTranslation();
  const tr = t as Tr;
  const plans = pricing?.plans ?? [];
  if (plans.length === 0) return null;

  const c = (key: string, fallback: string) => tr(`landing.pricingPage.comparison.${key}`, fallback);
  const rows: Row[] = [
    { label: c("monthlyPrice", "Monthly price"), cell: (p) => (p.monthlyPrice > 0 ? formatInrWhole(p.monthlyPrice) : tr("landing.publicPricing.freePrice", "Free")) },
    { label: c("callMinutes", "Call minutes / month"), cell: (p) => formatCount(p.includedCredits) },
    { label: c("aiAgents", "AI agents"), cell: (p) => formatCount(p.maxAgents) },
    { label: c("campaigns", "Campaigns"), cell: (p) => formatCount(p.maxCampaigns) },
    { label: c("contactsPerCampaign", "Contacts per campaign"), cell: (p) => formatCount(p.maxContactsPerCampaign) },
    { label: c("phoneNumbers", "Own phone numbers"), cell: (p) => (p.maxPhoneNumbers > 0 ? formatCount(p.maxPhoneNumbers) : c("sharedNumbers", "Shared")) },
    { label: c("flowBuilder", "Flow automations"), cell: (p) => formatCount(p.maxFlows) },
    { label: c("knowledgeBase", "Knowledge bases"), cell: (p) => formatCount(p.maxKnowledgeBases) },
    { label: c("webhookIntegrations", "Webhooks"), cell: (p) => formatCount(p.maxWebhooks) },
    { label: c("chooseLlm", "Choose LLM"), cell: (p) => p.canChooseLlm },
    { label: c("apiAccess", "REST API"), cell: (p) => p.restApiEnabled },
    { label: c("teamMembers", "Team members"), cell: (p) => (p.teamManagementEnabled && p.maxTeamMembers > 0 ? formatCount(p.maxTeamMembers) : false) },
    { label: c("prioritySupport", "Priority support"), cell: (p) => p.features?.prioritySupport === true },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-3">{c("title", "Compare plans")}</h3>
        <p className="text-slate-400">{c("subtitle", "See what's included in each plan")}</p>
      </div>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[640px] border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <table className="w-full text-left border-collapse" data-testid="compare-table">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 bg-black/40 text-slate-400 font-medium">{c("feature", "Feature")}</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="p-4 border-b border-white/10 bg-black/40 font-bold text-white text-center">
                    {plan.displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">{row.label}</td>
                  {plans.map((plan) => {
                    const value = row.cell(plan);
                    return (
                      <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">
                        {typeof value === "boolean" ? <Flag on={value} /> : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
