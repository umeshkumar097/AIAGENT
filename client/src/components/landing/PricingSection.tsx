/**
 * Public pricing page body. Every price, minute count and plan name comes from
 * GET /api/public/pricing (see components/pricing); nothing monetary is hard-coded here.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, PhoneCall, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePublicPricing } from "@/components/pricing/usePublicPricing";
import { PlanCards } from "@/components/pricing/PlanCards";
import { TopUpTable } from "@/components/pricing/TopUpTable";
import { CompareTable } from "@/components/pricing/CompareTable";
import { UsageCalculator } from "@/components/pricing/UsageCalculator";
import { formatCount, gstNote, type Tr } from "@/components/pricing/format";
import type { BillingPeriod, PublicPricing } from "@/components/pricing/types";

function buildFaqs(tr: Tr, pricing: PublicPricing | null): Array<{ question: string; answer: string }> {
  const free = pricing?.plans.find((p) => p.monthlyPrice === 0);
  const gst = pricing ? gstNote(pricing, tr) : tr("landing.publicPricing.exclGst", "excl. GST");
  return [
    {
      question: tr("landing.publicPricing.faq.credits.q", "How do credits work?"),
      answer: tr("landing.publicPricing.faq.credits.a", "1 credit = 1 minute of call time. Billing is rounded up to the next minute, so a 62-second call uses 2 credits. The timer runs from the moment the call connects until either side hangs up."),
    },
    {
      question: tr("landing.publicPricing.faq.gst.q", "Are prices inclusive of GST?"),
      answer: tr("landing.publicPricing.faq.gst.a", "Prices are shown in INR, {{gst}}. The exact tax is calculated at checkout and you receive a GST tax invoice for every payment.", { gst }),
    },
    {
      question: tr("landing.publicPricing.faq.topUp.q", "What if I run out of included minutes?"),
      answer: tr("landing.publicPricing.faq.topUp.a", "Paid plans can buy top-up packs from the billing dashboard at any time. Top-up credits do not expire; the minutes included with your plan reset each billing cycle and do not roll over."),
    },
    {
      question: tr("landing.publicPricing.faq.upgrade.q", "Can I change plans later?"),
      answer: tr("landing.publicPricing.faq.upgrade.a", "Yes. You can upgrade to a higher plan at any time from your billing dashboard, monthly or yearly."),
    },
    {
      question: tr("landing.publicPricing.faq.free.q", "What does the free plan include?"),
      answer: free
        ? tr("landing.publicPricing.faq.free.a", "{{count}} call minutes to try AI calling on shared numbers, with call recording and transcripts. No card is needed to sign up.", { count: formatCount(free.includedCredits) })
        : tr("landing.publicPricing.faq.free.aGeneric", "A small allowance of call minutes to try AI calling on shared numbers. No card is needed to sign up."),
    },
  ];
}

export default function PricingSection() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const tr = t as Tr;
  const { pricing, isLoading, isFallback } = usePublicPricing();
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const faqs = buildFaqs(tr, pricing);

  return (
    <section className="bg-[#050505] text-white overflow-hidden py-10" id="pricing">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#27D3C9]/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27D3C9]/30 bg-[#27D3C9]/10 text-[#27D3C9] text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              {tr("landing.publicPricing.badge", "Simple, transparent pricing")}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white">
              {tr("landing.publicPricing.title", "Pay for minutes,")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27D3C9] to-blue-500">
                {tr("landing.publicPricing.titleHighlight", "not seats.")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400">
              {tr("landing.publicPricing.subtitle", "Start free, pick a plan when you are ready, and top up minutes whenever you need more. Prices in INR.")}
            </p>
            {pricing && (
              <p className="text-sm text-slate-500 mt-3" data-testid="pricing-gst-note">
                {tr("landing.publicPricing.gstBanner", "All prices {{gst}}. Tax is added at checkout with a GST invoice.", { gst: gstNote(pricing, tr) })}
              </p>
            )}
            {isFallback && (
              <p className="text-xs text-amber-300/80 mt-2" role="status" data-testid="pricing-fallback-note">
                {tr("landing.publicPricing.fallbackNote", "Showing our standard price list — live prices could not be loaded. Final prices are confirmed at checkout.")}
              </p>
            )}
          </motion.div>
        </div>

        <div className="mb-24">
          <PlanCards pricing={pricing} isLoading={isLoading} period={period} onPeriodChange={setPeriod} />
        </div>

        <div className="mb-24">
          <UsageCalculator pricing={pricing} />
        </div>

        <div className="mb-24">
          <TopUpTable pricing={pricing} isLoading={isLoading} />
        </div>

        <div className="mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-3">{tr("landing.publicPricing.credits.title", "How credits work")}</h3>
            <p className="text-slate-400">{tr("landing.publicPricing.credits.subtitle", "1 credit = 60 seconds of call time. Billing is rounded up to the next minute.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: tr("landing.publicPricing.credits.s30", "30 sec call"), credits: 1 },
              { label: tr("landing.publicPricing.credits.s60", "60 sec call"), credits: 1 },
              { label: tr("landing.publicPricing.credits.s62", "62 sec call"), credits: 2, highlight: true },
              { label: tr("landing.publicPricing.credits.m5", "5 min call"), credits: 5 },
            ].map((ex) => (
              <div
                key={ex.label}
                className={`rounded-2xl p-5 text-center flex flex-col items-center gap-3 border ${
                  ex.highlight ? "bg-white/5 border-[#27D3C9]/30 shadow-lg shadow-[#27D3C9]/10" : "bg-white/5 border-white/10"
                }`}
              >
                <PhoneCall className={`w-7 h-7 ${ex.highlight ? "text-[#27D3C9]" : "text-slate-400"}`} />
                <div className="text-lg font-bold text-white">{ex.label}</div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium text-[#27D3C9] ${ex.highlight ? "bg-[#27D3C9]/20 font-bold" : "bg-white/10"}`}>
                  {ex.credits === 1
                    ? tr("landing.publicPricing.credits.one", "1 credit")
                    : tr("landing.publicPricing.credits.many", "{{count}} credits", { count: ex.credits })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <CompareTable pricing={pricing} />
        </div>

        <div className="mb-24">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/20 via-[#27D3C9]/10 to-transparent border border-[#27D3C9]/20 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#27D3C9]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="w-3 h-3" /> {tr("landing.publicPricing.enterprise.badge", "Higher volumes")}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{tr("landing.publicPricing.enterprise.title", "Calling more than the largest plan covers?")}</h3>
              <p className="text-slate-400 max-w-2xl">
                {tr("landing.publicPricing.enterprise.subtitle", "Talk to us about custom minute volumes and limits for your team.")}
              </p>
            </div>
            <div className="relative z-10">
              <Button size="lg" onClick={() => setLocation("/contact")} className="rounded-full bg-white text-black hover:bg-slate-200 font-bold px-8 shadow-xl shadow-white/10">
                {tr("landing.publicPricing.enterprise.cta", "Talk to sales")}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">{tr("landing.publicPricing.faq.title", "Frequently asked questions")}</h3>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border border-white/10 bg-white/5 rounded-2xl px-6 data-[state=open]:bg-white/10 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5 [&[data-state=open]>svg]:text-[#27D3C9]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
