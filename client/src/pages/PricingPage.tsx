import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";
import { SEOHead } from "@/components/landing/SEOHead";
import { useBranding } from "@/components/BrandingProvider";
import { useSeoSettings } from "@/hooks/useSeoSettings";

export default function PricingPage() {
  const { branding } = useBranding();
  const { data: seoSettings } = useSeoSettings();

  const seoTitle = `Pricing | ${seoSettings?.defaultTitle || "AI Voice Agents"}`;
  const seoDescription = "Transparent volume pricing for AI calling operations. Scale infinitely with no hidden fees.";

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-50 flex flex-col font-sans selection:bg-primary/30">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        ogSiteName={branding.app_name}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-20">
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
}
