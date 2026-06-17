import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Check, X, Zap, Phone, BrainCircuit, 
  Activity, BookOpen, Webhook, Headphones, 
  Server, Shield, PhoneCall, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useSeoSettings } from "@/hooks/useSeoSettings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuthStorage } from "@/lib/auth-storage";

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
}

const DEFAULT_FAQS = [
  {
    question: "How do credits work?",
    answer: "Credits are directly mapped to your call minutes. 1 credit equals 1 minute of call time (or 60 seconds). For example, a 62-second call will consume 2 credits as billing is rounded up to the nearest minute."
  },
  {
    question: "Can I buy extra credits?",
    answer: "Yes, once you exceed your plan's included credits, you can seamlessly purchase extra credits on a pay-as-you-go basis directly from your billing dashboard without interrupting your service."
  },
  {
    question: "Can I upgrade my plan anytime?",
    answer: "Absolutely. You can upgrade to a higher tier at any time. The remaining balance on your current plan will be prorated and automatically applied to your new plan."
  },
  {
    question: "Do unused credits rollover to the next month?",
    answer: "Included monthly credits reset at the beginning of each billing cycle and do not rollover. However, any 'Add-on' credits you purchase manually will never expire."
  },
  {
    question: "How are calls billed?",
    answer: "Calls are billed in one-minute increments. The timer starts exactly when the call connects and ends the moment either party hangs up."
  }
];

export default function PricingSection() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { data: seoSettings } = useSeoSettings();
  const isAuthenticated = AuthStorage.isAuthenticated();

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

  // Fallback to default FAQs if db is empty
  const faqs = (seoSettings?.structuredDataFaq && seoSettings.structuredDataFaq.length > 0)
    ? seoSettings.structuredDataFaq
    : DEFAULT_FAQS;

  const [sliderValue, setSliderValue] = useState(2000);
  const maxMins = sortedPlans.length > 0 ? Math.max(...sortedPlans.map(p => p.includedCredits)) * 1.5 : 10000;
  
  const recommendedPlan = useMemo(() => {
    if (!sortedPlans || sortedPlans.length === 0) return null;
    const capablePlans = sortedPlans.filter(p => p.includedCredits >= sliderValue);
    if (capablePlans.length > 0) return capablePlans[0];
    return sortedPlans[sortedPlans.length - 1]; 
  }, [sortedPlans, sliderValue]);

  const currencySymbol = "₹";

  return (
    <section className="bg-[#050505] text-white overflow-hidden py-10" id="pricing">
      
      {/* Glow Effects */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#27D3C9]/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27D3C9]/30 bg-[#27D3C9]/10 text-[#27D3C9] text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white">
              Choose the perfect plan for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27D3C9] to-blue-500">AI calling business.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400">
              Scale infinitely with no hidden fees. Start for free and upgrade as you grow.
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24 justify-center">
          {sortedPlans.map((plan, index) => {
            const isPopular = index === 1 || plan.name.toLowerCase().includes('pro');
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col rounded-3xl p-8 backdrop-blur-xl transition-all duration-300
                  ${isPopular 
                    ? 'border-2 border-[#27D3C9] bg-gradient-to-b from-[#27D3C9]/10 to-white/5 shadow-2xl shadow-[#27D3C9]/20' 
                    : 'border border-white/10 bg-white/5 hover:border-white/20'
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#27D3C9] text-black text-xs font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.displayName}</h3>
                  <p className="text-sm text-slate-400 min-h-[40px]">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {currencySymbol}{parseFloat(plan.monthlyPrice).toLocaleString()}
                    </span>
                    <span className="text-slate-400 mb-1">/mo</span>
                  </div>
                  <div className="text-sm text-[#27D3C9] font-medium mt-2">
                    Includes {plan.includedCredits.toLocaleString()} Credits
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxAgents}</b> AI Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxCampaigns}</b> Campaigns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxPhoneNumbers}</b> Phone Numbers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxFlows}</b> Flow Automations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxKnowledgeBases}</b> Knowledge Bases</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Webhook className="w-5 h-5 text-[#27D3C9]" />
                    <span className="text-sm text-slate-300"><b>{plan.maxWebhooks}</b> Webhooks</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {plan.restApiEnabled ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500/50" />
                    )}
                    <span className={`text-sm ${plan.restApiEnabled ? 'text-slate-300' : 'text-slate-500 line-through'}`}>REST API Access</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {plan.sipEnabled ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500/50" />
                    )}
                    <span className={`text-sm ${plan.sipEnabled ? 'text-slate-300' : 'text-slate-500 line-through'}`}>SIP Trunking</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setLocation(isAuthenticated ? '/app' : '/login')}
                  className={`w-full h-12 rounded-xl font-bold text-base transition-all
                    ${isPopular 
                      ? 'bg-[#27D3C9] hover:bg-[#20b5ad] text-black shadow-lg shadow-[#27D3C9]/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                  Get Started
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* SECTION 3: Credit Usage Calculator */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Calculate Your Usage</h3>
            <p className="text-slate-400">Estimate your required credits based on monthly call minutes.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-sm text-[#27D3C9] font-bold tracking-widest uppercase mb-1">Expected Usage</div>
                    <div className="text-4xl font-extrabold text-white">
                      {sliderValue.toLocaleString()} <span className="text-xl text-slate-400 font-medium">mins/mo</span>
                    </div>
                  </div>
                </div>
                
                <input 
                  type="range" 
                  min={0} 
                  max={maxMins} 
                  step={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#27D3C9]"
                />
                
                <div className="flex justify-between text-xs font-medium text-slate-500 mt-4">
                  <span>0 mins</span>
                  <span>{maxMins.toLocaleString()} mins+</span>
                </div>
              </div>

              <div className="w-full md:w-[350px] bg-black/40 border border-white/10 rounded-2xl p-6 text-center shadow-inner">
                <div className="text-sm text-slate-400 mb-2">Credits Required</div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#27D3C9] to-blue-400 mb-6">
                  {sliderValue.toLocaleString()}
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <div className="text-sm text-slate-400 mb-2">Recommended Plan</div>
                  <div className="text-xl font-bold text-white">
                    {recommendedPlan ? recommendedPlan.displayName : 'Select Usage'}
                  </div>
                  {recommendedPlan && (
                    <div className="text-sm text-[#27D3C9] mt-1">
                      Covers first {recommendedPlan.includedCredits.toLocaleString()} mins
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Credit-Based Calling Explanation */}
        <div className="mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">How Credits Work</h3>
            <p className="text-slate-400">1 Credit equals exactly 60 seconds (1 minute) of call time. Billing is rounded up to the nearest minute.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3">
              <PhoneCall className="w-8 h-8 text-slate-400" />
              <div className="text-xl font-bold text-white">30 sec call</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-[#27D3C9]">
                1 Credit
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3">
              <PhoneCall className="w-8 h-8 text-slate-400" />
              <div className="text-xl font-bold text-white">60 sec call</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-[#27D3C9]">
                1 Credit
              </div>
            </div>
            <div className="bg-white/5 border border-[#27D3C9]/30 shadow-lg shadow-[#27D3C9]/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#27D3C9]/10 to-transparent pointer-events-none" />
              <PhoneCall className="w-8 h-8 text-[#27D3C9]" />
              <div className="text-xl font-bold text-white">62 sec call</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#27D3C9]/20 rounded-full text-sm font-bold text-[#27D3C9]">
                2 Credits
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3">
              <PhoneCall className="w-8 h-8 text-slate-400" />
              <div className="text-xl font-bold text-white">5 min call</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-[#27D3C9]">
                5 Credits
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Feature Comparison Table */}
        <div className="mb-24 overflow-x-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Compare Features</h3>
          </div>
          <div className="min-w-[800px] border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-white/10 bg-black/40 text-slate-400 font-medium">Features</th>
                  {sortedPlans.map(plan => (
                    <th key={plan.id} className="p-4 border-b border-white/10 bg-black/40 font-bold text-white text-center">
                      {plan.displayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">AI Agents Limit</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxAgents}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">Campaigns Limit</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxCampaigns}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">Contacts per Campaign</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxContactsPerCampaign}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">Phone Numbers</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxPhoneNumbers}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">Flow Automations</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxFlows}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">Knowledge Bases</td>
                  {sortedPlans.map(plan => <td key={plan.id} className="p-4 border-b border-white/5 text-center text-slate-400">{plan.maxKnowledgeBases}</td>)}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">REST API</td>
                  {sortedPlans.map(plan => (
                    <td key={plan.id} className="p-4 border-b border-white/5 text-center">
                      {plan.restApiEnabled ? <Check className="w-4 h-4 mx-auto text-[#27D3C9]" /> : <X className="w-4 h-4 mx-auto text-slate-600" />}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-white/5 font-medium text-slate-300">SIP Trunk Access</td>
                  {sortedPlans.map(plan => (
                    <td key={plan.id} className="p-4 border-b border-white/5 text-center">
                      {plan.sipEnabled ? <Check className="w-4 h-4 mx-auto text-[#27D3C9]" /> : <X className="w-4 h-4 mx-auto text-slate-600" />}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-300">Priority Support</td>
                  {sortedPlans.map(plan => (
                    <td key={plan.id} className="p-4 text-center text-slate-400">
                      {plan.name.toLowerCase().includes('enterprise') || plan.name.toLowerCase().includes('scale') ? '24/7 Priority' : 'Standard'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 6: Enterprise */}
        <div className="mb-24">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/20 via-[#27D3C9]/10 to-transparent border border-[#27D3C9]/20 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#27D3C9]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="w-3 h-3" /> Enterprise
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Need unlimited scale?</h3>
              <p className="text-slate-400 max-w-2xl mb-6">
                Get dedicated infrastructure, unlimited agents, priority engineering support, and custom integrations tailored to your specific workflow.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#27D3C9]" /> Unlimited Agents</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#27D3C9]" /> Dedicated Servers</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#27D3C9]" /> White-Label Options</div>
              </div>
            </div>
            
            <div className="relative z-10">
              <Button 
                size="lg" 
                onClick={() => setLocation('/contact')}
                className="rounded-full bg-white text-black hover:bg-slate-200 font-bold px-8 shadow-xl shadow-white/10"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>

        {/* SECTION 7: FAQ */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 bg-white/5 rounded-2xl px-6 data-[state=open]:bg-white/10 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5 [&[data-state=open]>svg]:text-[#27D3C9]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
