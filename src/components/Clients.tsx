import React from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { getPartnerLogoMarqueeSlides } from '../lib/partnerMarqueeSlides';
import { cn } from '../lib/utils';

interface ClientsProps { lang: 'en' | 'ar'; }

export const Clients: React.FC<ClientsProps> = ({ lang }) => {
  const t = content[lang].clients;
  const slides = getPartnerLogoMarqueeSlides(lang);
  const half = Math.ceil(slides.length / 2);
  const row1 = slides.slice(0, half);
  const row2 = slides.slice(half);

  const renderSlide = (slide: (typeof slides)[number], i: number) => {
    return (
      <div key={i} className="px-10 py-7 glass rounded-2xl border border-black/5 hover:border-primary/50 transition-colors flex items-center justify-center min-w-[260px] sm:min-w-[280px] group cursor-default shadow-sm">
        <img
          src={slide.src}
          alt={slide.alt}
          className="max-h-16 sm:max-h-20 max-w-[220px] sm:max-w-[260px] w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity"
        />
      </div>
    );
  };

  return (
    <section id="clients" className="sm:py-32 py-16 bg-bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.h2 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-dark"
        >
          {t.title}
        </motion.h2>
        <p className="text-dark/30 font-black tracking-widest uppercase text-xs">{lang === 'en' ? 'Our Strategic Global Partners' : 'شركاؤنا الاستراتيجيون العالميون'}</p>
      </div>

      <div className="space-y-8 relative">
        {/* Row 1 */}
        <div className="flex overflow-hidden mask-fade-x" dir="ltr">
          <div className={cn(
            "flex py-5 gap-10 sm:gap-12 whitespace-nowrap hover:pause transition-all",
            "animate-marquee-left"
          )}>
            {[...row1, ...row1, ...row1].map((slide, i) => renderSlide(slide, i))}
          </div>
        </div>
 
        {/* Row 2 */}
        <div className="flex overflow-hidden mask-fade-x" dir="ltr">
          <div className={cn(
            "flex py-5 gap-10 sm:gap-12 whitespace-nowrap hover:pause transition-all",
            "animate-marquee-right"
          )}>
            {[...row2, ...row2, ...row2].map((slide, i) => renderSlide(slide, i))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
