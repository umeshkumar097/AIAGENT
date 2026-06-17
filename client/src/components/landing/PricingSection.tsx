import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

// Define our types
interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string | null;
  maxAgents: number;
  maxCampaigns: number;
  maxContactsPerCampaign: number;
  maxWebhooks: number;
  maxKnowledgeBases: number;
  maxFlows: number;
  maxPhoneNumbers: number;
  includedCredits: number;
  canChooseLlm: boolean;
  canPurchaseNumbers: boolean;
  features: any;
  sipEnabled?: boolean;
  restApiEnabled?: boolean;
  // Dynamic gateways
  razorpayMonthlyPrice: string | null;
  paypalMonthlyPrice: string | null;
  paystackMonthlyPrice: string | null;
  mercadopagoMonthlyPrice: string | null;
}

const currencySymbols: Record<string, string> = {
  'USD': '$', 'INR': '₹', 'EUR': '€', 'GBP': '£'
};

export function PricingSection() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  
  // Hardcode INR symbol for now as per user preference (previous fix was INR)
  const currencySymbol = "₹";

  const { data: plans } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  const sortedPlans = useMemo(() => {
    return [...(plans || [])].sort((a, b) => {
      if (a.name === 'free') return -1;
      if (b.name === 'free') return 1;
      return parseFloat(a.monthlyPrice || '0') - parseFloat(b.monthlyPrice || '0');
    });
  }, [plans]);

  // Volume Pricing State
  const maxMins = sortedPlans.length > 0 ? Math.max(...sortedPlans.map(p => p.includedCredits)) * 1.5 : 10000;
  const minMins = 0;
  const [sliderValue, setSliderValue] = useState(2000); // Default middle

  // Recommend best plan based on minutes
  const recommendedPlan = useMemo(() => {
    if (!sortedPlans || sortedPlans.length === 0) return null;
    // Find the cheapest plan that covers the sliderValue
    const capablePlans = sortedPlans.filter(p => p.includedCredits >= sliderValue);
    if (capablePlans.length > 0) return capablePlans[0];
    return sortedPlans[sortedPlans.length - 1]; // Return max plan if exceeds all
  }, [sortedPlans, sliderValue]);

  const getPrice = (plan: Plan): string => {
    // For simplicity, prioritize monthly price of default gateway or fallback
    let price = plan.razorpayMonthlyPrice || plan.monthlyPrice;
    if (!price || parseFloat(price) === 0) {
      price = plan.paypalMonthlyPrice || plan.stripeMonthlyPrice || plan.monthlyPrice || "0";
    }
    return parseFloat(price).toLocaleString();
  };

  const handleBookDemo = () => setLocation('/contact');
  const handleSignUp = () => setLocation('/login');

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">Volume Pricing</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Volume pricing that scales.
          </h2>
          <p className="text-lg text-gray-600">
            Estimate monthly cost at your usage. We always recommend the plan with the lowest total cost for your minutes.
          </p>
        </div>

        {/* Dynamic Calculator Box */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-500/5 p-6 md:p-10 mb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Slider Area */}
            <div className="flex-1 space-y-8">
              <div>
                <p className="text-sm font-bold text-orange-500 tracking-wider mb-4 uppercase">Usage</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  {sliderValue.toLocaleString()} mins <span className="text-xl text-gray-500 font-medium">/ month</span>
                </h3>
                
                <input 
                  type="range" 
                  min={minMins} 
                  max={maxMins} 
                  step={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                  <span>{minMins} mins</span>
                  <span>{maxMins.toLocaleString()} mins+</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                <p className="text-gray-700 text-sm">
                  {recommendedPlan 
                    ? <><span className="font-semibold text-gray-900">{recommendedPlan.displayName}</span> is the lowest-cost plan at this usage. Includes first {recommendedPlan.includedCredits.toLocaleString()} mins.</>
                    : "Adjust slider to see recommended plans."}
                </p>
              </div>

              {/* Tiers display */}
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-3 uppercase">Rate Tiers</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sortedPlans.slice(-4).map(plan => (
                    <div 
                      key={plan.id} 
                      className={`p-3 rounded-xl border text-center transition-all ${recommendedPlan?.id === plan.id ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}
                    >
                      <p className="font-semibold text-gray-900 text-sm mb-1">{plan.displayName}</p>
                      <p className="text-xs text-gray-500">{plan.includedCredits.toLocaleString()} mins</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Estimate Card */}
            <div className="lg:w-96 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-orange-500 tracking-wider mb-2 uppercase">Estimated Monthly Cost</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">{currencySymbol}{recommendedPlan ? getPrice(recommendedPlan) : '0'}</span>
                  <span className="text-gray-500 font-medium ml-1">/month</span>
                </div>
                
                <div className="space-y-3 text-sm border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Base plan</span>
                    <span className="font-medium text-gray-900">{currencySymbol}{recommendedPlan ? getPrice(recommendedPlan) : '0'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Included minutes</span>
                    <span className="font-medium text-gray-900">{recommendedPlan?.includedCredits.toLocaleString() || 0} mins</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSignUp} className="w-full mt-8 bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-12 text-base font-semibold shadow-sm">
                Start with {recommendedPlan?.displayName || 'Plan'}
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="mb-20 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Headers */}
            <div className="grid grid-cols-5 border-b-2 border-gray-100 sticky top-0 bg-white z-10">
              <div className="col-span-1 py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Capability</div>
              {sortedPlans.slice(-4).map(plan => (
                <div key={`header-${plan.id}`} className={`col-span-1 py-4 px-4 text-center font-bold uppercase tracking-wide text-sm ${recommendedPlan?.id === plan.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>
                  {plan.displayName}
                </div>
              ))}
            </div>

            {/* Section: Limits & Capacity */}
            <div className="bg-gray-50/50 py-3 px-4 font-bold text-gray-900 text-sm uppercase tracking-wider mt-4 rounded-t-lg">Limits & Capacity</div>
            
            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">AI Agents</div>
              {sortedPlans.slice(-4).map(plan => (
                <div key={`agents-${plan.id}`} className={`col-span-1 py-4 px-4 text-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30 font-semibold text-gray-900' : 'text-gray-600'}`}>{plan.maxAgents}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">Concurrent Calls</div>
              {sortedPlans.slice(-4).map(plan => (
                <div key={`calls-${plan.id}`} className={`col-span-1 py-4 px-4 text-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30 font-semibold text-gray-900' : 'text-gray-600'}`}>Custom</div>
              ))}
            </div>

            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">Knowledge Bases</div>
              {sortedPlans.slice(-4).map(plan => (
                <div key={`kb-${plan.id}`} className={`col-span-1 py-4 px-4 text-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30 font-semibold text-gray-900' : 'text-gray-600'}`}>{plan.maxKnowledgeBases}</div>
              ))}
            </div>

            {/* Section: Voice & Language */}
            <div className="bg-gray-50/50 py-3 px-4 font-bold text-gray-900 text-sm uppercase tracking-wider mt-4 rounded-t-lg">Voice & Language</div>
            
            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">Custom Voice Cloning</div>
              {sortedPlans.slice(-4).map((plan, i) => (
                <div key={`voice-${plan.id}`} className={`col-span-1 py-4 px-4 flex justify-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30' : ''}`}>
                  {i > 0 ? <Check className="w-5 h-5 text-emerald-500" /> : <span className="text-gray-400">—</span>}
                </div>
              ))}
            </div>

            {/* Section: Calls & Workflows */}
            <div className="bg-gray-50/50 py-3 px-4 font-bold text-gray-900 text-sm uppercase tracking-wider mt-4 rounded-t-lg">Calls & Workflows</div>
            
            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">Post-call summary & sentiment</div>
              {sortedPlans.slice(-4).map(plan => (
                <div key={`summary-${plan.id}`} className={`col-span-1 py-4 px-4 flex justify-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30' : ''}`}>
                  <Check className="w-5 h-5 text-emerald-500" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-1 py-4 px-4 text-sm font-medium text-gray-700">Webhook notifications</div>
              {sortedPlans.slice(-4).map((plan, i) => (
                <div key={`webhooks-${plan.id}`} className={`col-span-1 py-4 px-4 flex justify-center text-sm ${recommendedPlan?.id === plan.id ? 'bg-orange-50/30' : ''}`}>
                  {plan.maxWebhooks > 0 ? <Check className="w-5 h-5 text-emerald-500" /> : <span className="text-gray-400">—</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Cost Estimates Use Cases */}
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4 text-center lg:text-left">Total cost estimates</h3>
          <p className="text-gray-600 mb-10 text-center lg:text-left">Platform combined with telecom estimates for common deployment scenarios.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-gray-900 text-lg mb-1">Local Business — 1,000 calls/mo</h4>
              <p className="text-xs font-mono text-gray-400 mb-6 uppercase">Plan: Starter</p>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="font-medium">{currencySymbol}2,500</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Telecom usage</span>
                  <span className="font-medium">{currencySymbol}500</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
                <span className="font-bold text-gray-900">Total / month</span>
                <span className="font-extrabold text-xl text-gray-900">~{currencySymbol}3,000</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-gray-900 text-lg mb-1">EdTech Telesales — 5,000 calls/mo</h4>
              <p className="text-xs font-mono text-gray-400 mb-6 uppercase">Plan: Growth</p>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="font-medium">{currencySymbol}8,500</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Telecom usage</span>
                  <span className="font-medium">{currencySymbol}2,500</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
                <span className="font-bold text-gray-900">Total / month</span>
                <span className="font-extrabold text-xl text-gray-900">~{currencySymbol}11,000</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-gray-900 text-lg mb-1">Enterprise Contact Center</h4>
              <p className="text-xs font-mono text-gray-400 mb-6 uppercase">Plan: Enterprise</p>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="font-medium">Custom</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Telecom usage</span>
                  <span className="font-medium">Wholesale rates</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
                <span className="font-bold text-gray-900">Total / month</span>
                <span className="font-extrabold text-xl text-gray-900">Custom Quote</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
