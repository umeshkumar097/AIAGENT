import { motion, useReducedMotion, useInView } from "framer-motion";
import { Check, ChevronDown, Phone, Headphones, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { AuthStorage } from "@/lib/auth-storage";
import { DemoCallingWidget } from "@/components/landing/DemoCallingWidget";
import { useTranslation } from 'react-i18next';
const heroCardSales = "/images/hero-card-sales.png";
const heroCardSupport = "/images/hero-card-support.png";
const heroCardLeads = "/images/hero-card-leads.png";
const heroCardAppointments = "/images/hero-card-appointments.png";

const TypingWord = ({ words, reduceMotion }: { words: string[]; reduceMotion: boolean | null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
    }

    const currentWord = words[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      } else {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, words, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(words[currentIndex]);
    }
  }, [currentIndex, words, reduceMotion]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 font-extrabold">
        {displayText}
      </span>
      {!reduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.9em] bg-blue-500 ml-1 align-middle"
        />
      )}
    </span>
  );
};

const StatsBadge = ({ value, label }: { value: string; label: string }) => (
  <div 
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
    data-testid={`stats-badge-${label.toLowerCase()}`}
  >
    <span className="text-lg font-bold text-white">{value}</span>
    <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">{label}</span>
  </div>
);

const TrustBadge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-sm text-slate-300">
    <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
      <Check className="h-3 w-3 text-emerald-400" />
    </div>
    <span>{text}</span>
  </div>
);

const useCaseCards = [
  {
    label: "Voice Agent for",
    title: "Sales Outreach",
    icon: Phone,
    image: heroCardSales,
  },
  {
    label: "Voice Agent for",
    title: "Customer Support",
    icon: Headphones,
    image: heroCardSupport,
  },
  {
    label: "Voice Agent for",
    title: "Lead Qualification",
    icon: MessageSquare,
    image: heroCardLeads,
  },
  {
    label: "Voice Agent for",
    title: "Appointments",
    icon: Calendar,
    image: heroCardAppointments,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export function HeroSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const rotatingWords = [
    t('landing.hero.rotatingWords.sales'),
    t('landing.hero.rotatingWords.support'),
    t('landing.hero.rotatingWords.outreach'),
    t('landing.hero.rotatingWords.appointments'),
  ];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  const getDashboardLink = () => {
    if (isAuthenticated) {
      return isAdmin ? "/admin" : "/app";
    }
    return "/login";
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center overflow-hidden bg-[#030308] pt-32 pb-16 md:pt-40 md:pb-24"
      data-testid="hero-section"
    >
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_60%,transparent_100%)]"></div>
      
      {/* Subtle Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? { opacity: 1 } : "hidden"}
            animate={shouldReduceMotion ? { opacity: 1 } : (isInView ? "visible" : "hidden")}
            className="space-y-7 text-left"
          >
            <motion.div variants={itemVariants} className="flex justify-start">
              <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
                {t('landing.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white"
              data-testid="hero-headline"
            >
              {t('landing.hero.headline')}
              <br />
              <TypingWord words={rotatingWords} reduceMotion={shouldReduceMotion} />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
              data-testid="hero-subheadline"
            >
              {t('landing.hero.subheadline')}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-start gap-3 pt-2"
            >
              <StatsBadge value="5X" label={t('landing.hero.statsProductivity')} />
              <StatsBadge value="100X" label={t('landing.hero.statsScalability')} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-start pt-4"
            >
              <Link href={getDashboardLink()}>
                <Button
                  size="lg"
                  className="rounded-full shadow-blue-500/25 shadow-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 font-semibold px-8 transition-all hover:scale-105"
                  data-testid="button-hero-get-started"
                >
                  {t('landing.hero.getStarted')}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-8 pt-2"
              data-testid="hero-trust-badges"
            >
            <TrustBadge text={t('landing.hero.freeTrial')} />
            <TrustBadge text={t('landing.hero.freeCredit')} />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <DemoCallingWidget />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        animate={shouldReduceMotion ? { opacity: 1 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
        transition={shouldReduceMotion ? undefined : { delay: 0.8, duration: 0.7 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useCaseCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
              transition={shouldReduceMotion ? undefined : { delay: 1 + index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl flex flex-col p-6 border border-white/5 bg-white/[0.02] backdrop-blur-xl group hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 shadow-2xl"
              data-testid={`card-usecase-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="mb-4">
                <card.icon className="h-8 w-8 text-cyan-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium mb-1">{card.label}</p>
                <p className="text-white text-base sm:text-lg font-bold leading-tight">{card.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? undefined : { delay: 1.5, duration: 0.6 }}
        className="relative z-10 mt-12"
      >
        <button
          onClick={handleScrollDown}
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2"
          aria-label="Scroll down"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className={`h-6 w-6 text-slate-400 transition-colors ${shouldReduceMotion ? '' : 'animate-bounce'}`} />
        </button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
