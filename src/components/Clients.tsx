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
      <div
        key={i}
        className="group flex min-w-[200px] cursor-default items-center justify-center rounded-xl border border-black/[0.06] bg-white/70 px-6 py-4 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/35 sm:min-w-[220px] sm:px-7 sm:py-5"
      >
        <img
          src={slide.src}
          alt={slide.alt}
          className="h-auto max-h-12 w-auto max-w-[145px] object-contain opacity-55 transition-opacity group-hover:opacity-90 sm:max-h-14 sm:max-w-[165px] md:max-h-[3.75rem] md:max-w-[180px]"
        />
      </div>
    );
  };

  return (
    <section id="clients" className="overflow-hidden bg-bg-card py-16 sm:py-24">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:mb-14 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-heading-section font-black tracking-tighter text-dark"
        >
          {t.title}
        </motion.h2>
        <p className="text-label font-bold uppercase tracking-[0.22em] text-dark/35">
          {lang === 'en' ? 'Our Strategic Global Partners' : 'شركاؤنا الاستراتيجيون العالميون'}
        </p>
      </div>

      <div className="relative space-y-5 sm:space-y-6">
        {/* Row 1 */}
        <div className="flex overflow-hidden mask-fade-x" dir="ltr">
          <div
            className={cn(
              'flex gap-6 whitespace-nowrap py-3 transition-all hover:pause sm:gap-8 sm:py-4',
              'animate-marquee-left'
            )}
          >
            {[...row1, ...row1, ...row1].map((slide, i) => renderSlide(slide, i))}
          </div>
        </div>
 
        {/* Row 2 */}
        <div className="flex overflow-hidden mask-fade-x" dir="ltr">
          <div
            className={cn(
              'flex gap-6 whitespace-nowrap py-3 transition-all hover:pause sm:gap-8 sm:py-4',
              'animate-marquee-right'
            )}
          >
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
