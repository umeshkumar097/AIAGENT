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
import { Star } from "lucide-react";
import { useBranding } from "@/components/BrandingProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

interface Testimonial {
  quote: string;
  highlight?: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

const testimonialKeys = [
  "jennifer", "lisa", "mike", "robert", "tom", "amanda",
  "james", "maria", "rachel", "carlos", "sarah", "david"
];



function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" data-testid="star-rating">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          data-testid={`star-${i}`}
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index, atText }: TestimonialCardProps & { atText: string }) {
  return (
    <div
      className="bg-card rounded-xl p-5 -mb-2 shadow-sm border border-border/50 relative z-10 hover:z-20 transition-all"
      data-testid={`testimonial-card-${index}`}
    >
      <p className="text-sm leading-relaxed mb-4" data-testid={`testimonial-quote-${index}`}>
        {testimonial.quote}{" "}
        {testimonial.highlight && (
          <span className="text-amber-600 dark:text-amber-400 font-medium">
            {testimonial.highlight}
          </span>
        )}
      </p>
      
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={testimonial.image}
            alt={testimonial.author}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {testimonial.author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-sm" data-testid={`testimonial-author-${index}`}>
            {testimonial.author}
          </div>
          <div className="text-xs text-muted-foreground" data-testid={`testimonial-role-${index}`}>
            {testimonial.role} {atText} {testimonial.company}
          </div>
        </div>
      </div>
      
      <StarRating count={testimonial.rating} />
    </div>
  );
}

interface ScrollColumnProps {
  testimonials: Testimonial[];
  columnIndex: number;
  speed: number;
  direction?: "up" | "down";
  atText: string;
}

function ScrollColumn({ testimonials, columnIndex, speed, direction = "up", atText }: ScrollColumnProps) {
  const animationName = direction === "up" ? "scrollUp" : "scrollDown";
  
  return (
    <div 
      className="flex flex-col"
      style={{
        animation: `${animationName} ${speed}s linear infinite`,
      }}
    >
      {testimonials.map((testimonial, idx) => (
        <TestimonialCard
          key={`${columnIndex}-${idx}`}
          testimonial={testimonial}
          index={columnIndex * 100 + idx}
          atText={atText}
        />
      ))}
      {/* Duplicate for seamless loop */}
      {testimonials.map((testimonial, idx) => (
        <TestimonialCard
          key={`${columnIndex}-dup-${idx}`}
          testimonial={testimonial}
          index={columnIndex * 100 + idx + 50}
          atText={atText}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const { branding } = useBranding();
  const { t } = useTranslation();
  
  const getTestimonials = (): Testimonial[] => {
    return testimonialKeys.map(key => {
      const author = t(`landing.testimonials.quotes.${key}.author`);
      return {
        quote: t(`landing.testimonials.quotes.${key}.quote`, { appName: branding.app_name }),
        highlight: t(`landing.testimonials.quotes.${key}.highlight`),
        author,
        role: t(`landing.testimonials.quotes.${key}.role`),
        company: t(`landing.testimonials.quotes.${key}.company`),
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&color=fff&size=150`,
        rating: 5,
      };
    });
  };
  
  const allTestimonials = getTestimonials();
  
  // Split testimonials into 4 columns
  const columns: Testimonial[][] = [[], [], [], []];
  allTestimonials.forEach((testimonial, idx) => {
    columns[idx % 4].push(testimonial);
  });
  
  // Different speeds for each column (in seconds) - slower = smoother
  const speeds = [45, 38, 50, 42];
  const directions: ("up" | "down")[] = ["up", "down", "up", "down"];

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      data-testid="testimonials-section"
    >
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white"
            data-testid="testimonials-headline"
          >
            {t('landing.testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            {t('landing.testimonials.subtitle', { appName: branding.app_name })}
          </p>
        </div>

        {/* Testimonials Grid with Fade Masks */}
        <div 
          className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full"
            data-testid="testimonials-grid"
          >
            {columns.map((columnTestimonials, columnIdx) => (
              <div 
                key={columnIdx} 
                className="overflow-hidden"
              >
                <ScrollColumn
                  testimonials={columnTestimonials}
                  columnIndex={columnIdx}
                  speed={speeds[columnIdx]}
                  direction={directions[columnIdx]}
                  atText={t('landing.testimonials.at')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
