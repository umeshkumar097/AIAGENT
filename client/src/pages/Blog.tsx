/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, Search } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/landing/SEOHead";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBranding } from "@/components/BrandingProvider";
import { useSeoSettings } from "@/hooks/useSeoSettings";

const blogImg1 = "/images/stock_images/blog_ai_voice_india.jpg";
const blogImg2 = "/images/stock_images/blog_case_study_roi.jpg";
const blogImg3 = "/images/stock_images/blog_flow_agent_builder.jpg";
const blogImg4 = "/images/stock_images/ai_machine_learning__d444b91e.jpg";
const blogImg5 = "/images/stock_images/business_roi_calcula_56d75db8.jpg";
const blogImg6 = "/images/stock_images/global_multilingual__ad881e71.jpg";
const blogImg7 = "/images/stock_images/enterprise_security__35497ac5.jpg";
const blogImg8 = "/images/stock_images/healthcare_appointme_3e181b08.jpg";
const blogImg9 = "/images/stock_images/analytics_dashboard__3fb5a841.jpg";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  gradient: string;
  image: string;
}

const allArticles: Article[] = [
  {
    id: "1",
    slug: "ai-voice-agents-customer-service-india",
    title: "How AI Voice Agents Are Transforming Customer Service in India",
    excerpt: "India ke businesses ke liye AI voice agents ek game-changer ban gaye hain. Janiye kaise top companies 24/7 support deliver kar rahi hain bina ek bhi human agent ke — aur customer satisfaction 40% badha rahi hain.",
    category: "AI Technology",
    categoryColor: "bg-blue-500/90 text-white",
    readTime: "7 min read",
    date: "Jun 20, 2025",
    gradient: "from-blue-600 via-blue-500 to-indigo-600",
    image: blogImg1,
  },
  {
    id: "2",
    slug: "case-study-ecommerce-cost-reduction-ai-calling",
    title: "Case Study: Kaise Ek Indian E-commerce Company Ne 65% Support Cost Reduce Kiya AI Calling Se",
    excerpt: "Bangalore ki ek leading e-commerce company ne Zonvo AI voice agents deploy kar ke apne 50-agent call center ko 12 agents tak reduce kiya — aur CSAT score 62% se 91% tak pahuncha. Poori kahani yahan hai.",
    category: "Case Studies",
    categoryColor: "bg-emerald-500/90 text-white",
    readTime: "9 min read",
    date: "Jun 15, 2025",
    gradient: "from-emerald-600 via-brand to-cyan-600",
    image: blogImg2,
  },
  {
    id: "3",
    slug: "flow-agents-visual-call-scripting",
    title: "Flow Agents: Bina Coding Ke Apna AI Call Script Banao in 10 Minutes",
    excerpt: "Zonvo ka Flow Agent builder aapko drag-and-drop interface se complete call flows banana allow karta hai — greeting se lekar appointment booking tak. Ek bhi line code likhne ki zaroorat nahi.",
    category: "Product Updates",
    categoryColor: "bg-purple-500/90 text-white",
    readTime: "5 min read",
    date: "Jun 10, 2025",
    gradient: "from-purple-600 via-violet-500 to-fuchsia-600",
    image: blogImg3,
  },
  {
    id: "4",
    slug: "ai-voice-agent-use-cases-india-2025",
    title: "Top 7 AI Voice Agent Use Cases for Indian Businesses in 2025",
    excerpt: "E-commerce returns se lekar loan EMI reminders tak — AI voice agents Indian businesses ke liye 7 powerful use cases. Janiye kaun sa aapke business ke liye best fit hai aur ROI kya milega.",
    category: "AI Technology",
    categoryColor: "bg-blue-500/90 text-white",
    readTime: "8 min read",
    date: "Jun 5, 2025",
    gradient: "from-indigo-600 via-blue-500 to-cyan-600",
    image: blogImg4,
  },
  {
    id: "5",
    slug: "how-to-setup-ai-voice-agent-15-minutes",
    title: "15 Minutes Mein Apna Pehla AI Voice Agent Kaise Setup Karein — Step by Step Guide",
    excerpt: "Zonvo pe account banane se lekar pehli live call tak — is complete step-by-step guide mein hum aapko hath pakad ke sab kuch sikhayenge. Koi technical knowledge required nahi.",
    category: "Tutorials",
    categoryColor: "bg-orange-500/90 text-white",
    readTime: "6 min read",
    date: "May 28, 2025",
    gradient: "from-brand via-emerald-500 to-green-600",
    image: blogImg5,
  },
  {
    id: "6",
    slug: "ai-voice-agents-vs-ivr-comparison",
    title: "AI Voice Agent vs Traditional IVR: Indian Businesses Ke Liye Kaun Better Hai?",
    excerpt: "\"Press 1 for Hindi, Press 2 for English\" — ye zamaana khatam ho raha hai. AI voice agents aur traditional IVR mein kya fark hai, kaunsa zyada cost-effective hai, aur 2025 mein Indian companies kaun sa choose kar rahi hain.",
    category: "Industry Insights",
    categoryColor: "bg-amber-500/90 text-white",
    readTime: "7 min read",
    date: "May 20, 2025",
    gradient: "from-violet-600 via-purple-500 to-pink-600",
    image: blogImg6,
  },
  {
    id: "7",
    slug: "best-practices-training-ai-agent",
    title: "AI Voice Agent Ka System Prompt Kaise Likhen: 10 Proven Tips",
    excerpt: "Ek acha system prompt hi decide karta hai ki aapka AI agent kitna smart aur natural lagega. Ye 10 tips follow karo aur apne agent ki performance 3x improve karo — Hindi aur Hinglish dono mein.",
    category: "AI Technology",
    categoryColor: "bg-blue-500/90 text-white",
    readTime: "6 min read",
    date: "May 15, 2025",
    gradient: "from-slate-600 via-blue-500 to-indigo-600",
    image: blogImg7,
  },
  {
    id: "8",
    slug: "healthcare-appointment-scheduling",
    title: "Case Study: Hospital Appointment Booking Ka Automation — 80% Calls AI Ne Handle Kiye",
    excerpt: "Delhi ki ek multi-specialty hospital ne Zonvo deploy kar ke roz ke 2,000+ appointment calls ko automate kiya. No-show rate 28% se 12% pe aaya aur receptionist team ka time 70% free hua.",
    category: "Case Studies",
    categoryColor: "bg-emerald-500/90 text-white",
    readTime: "7 min read",
    date: "May 10, 2025",
    gradient: "from-cyan-600 via-brand to-emerald-600",
    image: blogImg8,
  },
  {
    id: "9",
    slug: "analytics-dashboard-update",
    title: "Zonvo Analytics Dashboard: Apne AI Agents Ki Performance Real-Time Track Karo",
    excerpt: "Naya analytics dashboard ab aapko call success rate, average call duration, conversion metrics aur agent-wise performance ek hi jagah deta hai. Custom reports bhi bana sakte hain.",
    category: "Product Updates",
    categoryColor: "bg-purple-500/90 text-white",
    readTime: "4 min read",
    date: "May 5, 2025",
    gradient: "from-pink-600 via-purple-500 to-violet-600",
    image: blogImg9,
  },
];

const categories = ["All", "AI Technology", "Case Studies", "Product Updates", "Tutorials", "Industry Insights"];


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

interface ArticleCardProps {
  article: Article;
  index: number;
  readArticleText: string;
}

function ArticleCard({ article, index, readArticleText }: ArticleCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      data-testid={`card-article-${article.slug}`}
    >
      <Link href={`/blog/${article.slug}`}>
        <Card className="rounded-3xl overflow-hidden hover-elevate transition-all h-full group cursor-pointer">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid={`img-article-${article.slug}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />
            <Badge
              className={`absolute top-4 left-4 ${article.categoryColor} border-0 shadow-lg`}
              data-testid={`badge-category-${article.slug}`}
            >
              {article.category}
            </Badge>
          </div>

          <div className="p-6 space-y-4">
            <h3
              className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors"
              data-testid={`title-article-${article.slug}`}
            >
              {article.title}
            </h3>

            <p
              className="text-muted-foreground leading-relaxed line-clamp-3"
              data-testid={`excerpt-article-${article.slug}`}
            >
              {article.excerpt}
            </p>

            <div
              className="flex items-center gap-4 text-sm text-muted-foreground pt-2"
              data-testid={`meta-article-${article.slug}`}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>

            <div className="flex items-center text-sm font-medium text-primary group-hover:underline pt-2">
              {readArticleText}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  const { branding } = useBranding();
  const { data: seoSettings } = useSeoSettings();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Blog & Resources"
        description={`Stay ahead with the latest AI voice agent strategies, case studies, product updates, and industry insights from ${branding.app_name}.`}
        canonicalUrl={seoSettings?.canonicalBaseUrl ? `${seoSettings.canonicalBaseUrl}/blog` : undefined}
        ogImage={seoSettings?.defaultOgImage || undefined}
        keywords={[
          "AI voice agents",
          "automated calling",
          "voice automation blog",
          "AI customer service",
          "case studies",
          "product updates",
        ]}
        ogSiteName={branding.app_name}
        twitterSite={seoSettings?.twitterHandle || undefined}
        twitterCreator={seoSettings?.twitterHandle || undefined}
        googleVerification={seoSettings?.googleVerification || undefined}
        bingVerification={seoSettings?.bingVerification || undefined}
        facebookAppId={seoSettings?.facebookAppId || undefined}
        structuredDataOrg={seoSettings?.structuredDataOrg}
      />

      <Navbar />

      <main className="min-h-screen pt-16" data-testid="page-blog">
        <section
          className="py-16 md:py-24 relative overflow-hidden"
          data-testid="section-blog-hero"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-200/30 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <Badge
                variant="secondary"
                className="px-4 py-1.5"
                data-testid="badge-blog-header"
              >
                {t("landing.blogPage.badge")}
              </Badge>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                data-testid="heading-blog"
              >
                {t("landing.blogPage.title")}
              </h1>
              <p
                className="text-xl text-muted-foreground leading-relaxed"
                data-testid="subheading-blog"
              >
                {t("landing.blogPage.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        <section
          className="pb-24 md:pb-32 relative"
          data-testid="section-blog-content"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
            >
              <div
                className="flex flex-wrap justify-center md:justify-start gap-2"
                data-testid="filter-tabs"
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`rounded-full ${
                      activeCategory === category
                        ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
                        : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                    data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("landing.blogPage.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-64 rounded-full"
                  data-testid="input-search"
                />
              </div>
            </motion.div>

            {filteredArticles.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                data-testid="grid-articles"
              >
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                    readArticleText={t("landing.blogPage.readArticle")}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
                data-testid="empty-state"
              >
                <p className="text-lg text-muted-foreground">
                  {t("landing.blogPage.noArticlesFound")}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  data-testid="button-clear-filters"
                >
                  {t("landing.blogPage.clearFilters")}
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        <section
          className="py-16 md:py-24 bg-muted/30"
          data-testid="section-newsletter"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <h2
                className="text-3xl md:text-4xl font-bold"
                data-testid="heading-newsletter"
              >
                {t("landing.blogPage.newsletter.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("landing.blogPage.newsletter.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={t("landing.blogPage.newsletter.emailPlaceholder")}
                  className="flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button
                  className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
                  data-testid="button-subscribe"
                >
                  {t("landing.blogPage.newsletter.subscribe")}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("landing.blogPage.newsletter.disclaimer")}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
