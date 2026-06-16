import React, { useState } from "react";
import { Link } from "wouter";
import { Check, X, PhoneCall, Bot, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const PRICING_PLANS = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams exploring AI calling.",
    price: "500",
    features: [
      "1 AI Agent",
      "500 Minutes included",
      "Standard Voices",
      "Basic Analytics",
      "Email Support"
    ],
    notIncluded: ["Custom Voice Cloning", "CRM Integrations", "Dedicated Account Manager"],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Growth",
    description: "For growing businesses scaling their outreach operations.",
    price: "2,500",
    features: [
      "5 AI Agents",
      "2,000 Minutes included",
      "Premium 11Labs Voices",
      "Advanced Analytics & Recording",
      "WhatsApp & SMS integration",
      "Priority Support"
    ],
    notIncluded: ["Dedicated Account Manager"],
    popular: true,
    cta: "Get Started"
  },
  {
    name: "Scale",
    description: "High-volume teams needing maximum capabilities and reliability.",
    price: "4,500",
    features: [
      "Unlimited AI Agents",
      "10,000 Minutes included",
      "Custom Voice Cloning",
      "HubSpot & Salesforce Integrations",
      "Custom Webhooks",
      "24/7 Phone Support"
    ],
    notIncluded: [],
    popular: false,
    cta: "Upgrade to Scale"
  },
  {
    name: "Enterprise",
    description: "Custom built solutions for large-scale enterprise needs.",
    price: "Custom",
    features: [
      "Unlimited Minutes at Custom Rates",
      "Dedicated Account Manager",
      "White-labeling Options",
      "On-premise deployment support",
      "SLA Guarantee",
      "Custom Contract Invoicing"
    ],
    notIncluded: [],
    popular: false,
    cta: "Contact Sales"
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-50 flex flex-col font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Simple, transparent pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-green-400">Indian</span> businesses.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              No hidden fees. Scale your AI calling operations infinitely.
            </p>
          </div>

          <div className="flex justify-center items-center mb-12">
            <div className="bg-slate-900 p-1 rounded-full inline-flex border border-slate-800">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "yearly" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
              >
                Yearly <span className="ml-1 text-xs text-green-400 font-bold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
            {PRICING_PLANS.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-3xl p-8 flex flex-col bg-slate-900/50 backdrop-blur-xl border ${plan.popular ? 'border-primary shadow-[0_0_40px_-10px_rgba(31,213,249,0.3)]' : 'border-slate-800'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-400 h-10">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold">{plan.price === "Custom" ? "" : "₹"}{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-slate-400 ml-2">/mo</span>}
                  </div>
                  {billingCycle === "yearly" && plan.price !== "Custom" && (
                    <p className="text-xs text-green-400 mt-2">Billed annually at ₹{(parseInt(plan.price.replace(',', '')) * 12 * 0.8).toLocaleString()}</p>
                  )}
                </div>

                <div className="flex-1">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start opacity-50">
                        <X className="h-5 w-5 text-slate-500 shrink-0 mr-3" />
                        <span className="text-sm text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full py-6 rounded-xl font-semibold text-md ${plan.popular ? 'bg-primary hover:bg-primary/90 text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Telephony Cost Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 mb-24 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">BYOC: Bring Your Own Carrier</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We believe in complete transparency. Our platform integrates directly with your Twilio or Exotel account. You pay the telecom providers directly for phone numbers and call durations at their wholesale rates.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                  <PhoneCall className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Twilio Integration</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                  <PhoneCall className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Exotel Integration</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 text-center">
              <p className="text-sm text-slate-400 mb-2">Estimated Carrier Cost</p>
              <div className="text-3xl font-bold text-white mb-2">~₹1.5 <span className="text-sm font-normal text-slate-400">/ min</span></div>
              <p className="text-xs text-slate-500">Paid directly to Twilio/Exotel</p>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "What happens if I exceed my included minutes?", a: "Once you exhaust your plan's included minutes, you will be charged a simple pay-as-you-go rate for additional minutes. You can also upgrade your plan at any time." },
                { q: "Do I need to pay for Twilio separately?", a: "Yes. Our platform handles the AI and software layer. You connect your own Twilio or Exotel account to handle the actual telecom routing, giving you the best possible telecom rates." },
                { q: "Can I use Indian voices?", a: "Absolutely. We support ElevenLabs and OpenAI voices, including premium Indian-accented English and Hindi voices for a localized experience." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
