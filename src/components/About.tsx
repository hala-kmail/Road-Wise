import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { content } from '../lib/constants';
import { getPartnerLogoMarqueeSlides } from '../lib/partnerMarqueeSlides';
import { cn } from '../lib/utils';
import { Users, Globe, Telescope, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const LEADERSHIP_ROTATE_MS = 6000;

/** Editorial monogram tones — no cartoon avatars, brand-aligned gradients */
const leaderMonogramTone = (idx: number) => {
  const tones = [
    'bg-gradient-to-br from-primary via-[#379e9c] to-accent-blue',
    'bg-gradient-to-br from-secondary via-[#7a3d85] to-primary',
    'bg-gradient-to-br from-accent-blue via-primary to-[#2a8f8d]',
    'bg-gradient-to-br from-accent-blue via-primary to-accent-yellow',
  ] as const;
  return tones[idx % tones.length];
};

interface AboutProps { lang: 'en' | 'ar'; }

const Counter: React.FC<{ value: number; isYear?: boolean; prefix?: string }> = ({ value, isYear, prefix }) => {
  const [count, setCount] = useState(isYear ? value - 10 : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = isYear ? value - 10 : 0;
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, isYear]);

  return <span ref={ref}>{prefix}{count}</span>;
};

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = content[lang].about;
  const leaders = t.leadershipTeam;
  const leaderCount = leaders.length;
  const [activeLeaderIdx, setActiveLeaderIdx] = useState(0);
  const [pauseRotate, setPauseRotate] = useState(false);

  useEffect(() => {
    if (pauseRotate || leaderCount <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveLeaderIdx((prev) => (prev + 1) % leaderCount);
    }, LEADERSHIP_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pauseRotate, leaderCount]);

  const goPrev = () => {
    setActiveLeaderIdx((prev) => (prev - 1 + leaderCount) % leaderCount);
  };

  const goNext = () => {
    setActiveLeaderIdx((prev) => (prev + 1) % leaderCount);
  };

  const partnerSlides = getPartnerLogoMarqueeSlides(lang);
  const rtl = lang === 'ar';
  const activeLeader = leaders[activeLeaderIdx] ?? leaders[0];

  return (
    <section id="about" className="sm:py-32 py-16 bg-bg-deep px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:mb-20 mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 inline-block tracking-tighter text-dark"
          >
            {t.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Main Description & Coverage */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 bento-item"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <div className="w-4 h-1 bg-accent-blue rounded-full" />
              <div className="w-2 h-1 bg-accent-yellow rounded-full" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">{lang === 'en' ? 'Our Foundation' : 'أساسنا'}</h3>
            <p className="text-lg md:text-xl font-bold leading-tight text-dark mb-8 text-justify">
              {t.description}
            </p>
            
            <div className="mt-auto p-4 bg-accent-blue/5 rounded-2xl border border-accent-blue/10">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-accent-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-blue">{lang === 'en' ? 'Geographic Coverage' : 'التغطية الجغرافية'}</span>
              </div>
              <p className="text-xs font-bold text-dark/70 leading-relaxed text-justify">
                {t.coverage}
              </p>
            </div>
          </motion.div>

          {/* Leadership stacked cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative md:col-span-2 lg:col-span-2 rounded-[2rem] bg-gradient-to-b from-bg-card via-white to-white ring-1 ring-black/5 shadow-[0_1px_0_rgba(47,159,157,0.06)] flex flex-col gap-4 overflow-visible"
            onMouseEnter={() => setPauseRotate(true)}
            onMouseLeave={() => setPauseRotate(false)}
          >
            <Users className={`pointer-events-none w-7 h-7 text-primary/[0.12] absolute top-7 ${rtl ? 'left-8' : 'right-8'}`} />

            <div className={`relative px-5 sm:px-6 pt-6 pb-2 ${rtl ? 'pl-12' : 'pr-12'}`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/90 mb-5">
                {lang === 'en' ? 'Leadership' : 'القيادة'}
              </h4>

              <div
                className="relative isolate px-1 sm:px-3 pt-6 pb-5 min-h-[260px]"
                dir={rtl ? 'rtl' : 'ltr'}
              >
                {/* Light stack silhouette — softer depth */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-7 top-11 z-0 rounded-[1.65rem] bg-gradient-to-b from-neutral-100/90 to-neutral-50/70 border border-neutral-200/60 translate-y-[38px] scale-[0.86] origin-top shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] h-[calc(100%-2.5rem)] min-h-[200px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 top-6 z-[1] rounded-[1.75rem] bg-white border border-black/[0.06] translate-y-[18px] scale-[0.94] origin-top shadow-[0_12px_36px_-22px_rgba(47,159,157,0.18)] min-h-[220px]"
                />

                {/* Active card — editorial, calm */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={`${activeLeaderIdx}-${activeLeader.avatarSeed}`}
                    role="article"
                    initial={{ opacity: 0, y: rtl ? -10 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: rtl ? 6 : -6 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative z-[2] rounded-[1.75rem] bg-white p-5 sm:p-6 ring-1 ring-black/[0.06] shadow-[0_24px_52px_-36px_rgba(47,159,157,0.22),inset_0_1px_0_0_rgba(255,255,255,0.9)] flex flex-col"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-[1.75rem]"
                    />
                    <div className={`flex gap-4 sm:gap-5 mb-5 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <div className="shrink-0">
                        <div
                          className={cn(
                            'flex size-[4.25rem] sm:size-[4.75rem] items-center justify-center rounded-2xl text-lg sm:text-xl font-black tracking-tight text-white shadow-[0_8px_24px_-10px_rgba(47,159,157,0.65)] ring-4 ring-white',
                            leaderMonogramTone(activeLeaderIdx)
                          )}
                          aria-hidden
                        >
                          {activeLeader.initials}
                        </div>
                      </div>
                      <div className={`min-w-0 flex-1 flex flex-col justify-center ${rtl ? 'text-right' : ''}`}>
                        <p className="text-lg sm:text-xl font-black text-dark leading-snug mb-1.5">{activeLeader.name}</p>
                        <p className="text-[10px] sm:text-[11px] font-bold text-primary/80 uppercase tracking-widest leading-snug">
                          {activeLeader.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-[1.65] text-dark/55 font-medium border-s-[3px] border-primary/25 ps-3.5 -ms-px">
                      {activeLeader.bio}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            {leaderCount > 1 && (
              <div
                className={`flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 pb-5 pt-0 ${rtl ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex gap-1.5 items-center">
                  {leaders.map((person, dotIdx) => (
                    <button
                      key={person.avatarSeed}
                      type="button"
                      aria-label={lang === 'en' ? `Show ${person.name}` : `عرض ${person.name}`}
                      aria-current={dotIdx === activeLeaderIdx}
                      onClick={() => setActiveLeaderIdx(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === activeLeaderIdx ? 'w-7 bg-primary shadow-[0_0_12px_-2px_rgba(47,159,157,0.7)]' : 'w-1.5 bg-dark/12 hover:bg-dark/28'
                      }`}
                    />
                  ))}
                </div>
                <div className={`flex items-center gap-1.5 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={() => (rtl ? goNext() : goPrev())}
                    className="h-9 w-9 rounded-xl border border-black/[0.07] bg-white text-dark/50 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center shadow-sm transition-all duration-200"
                    aria-label={lang === 'en' ? 'Previous leader' : 'السابق'}
                  >
                    <ChevronLeft className={`w-5 h-5 ${rtl ? 'scale-x-[-1]' : ''}`} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => (rtl ? goPrev() : goNext())}
                    className="h-9 w-9 rounded-xl border border-black/[0.07] bg-white text-dark/50 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center shadow-sm transition-all duration-200"
                    aria-label={lang === 'en' ? 'Next leader' : 'التالي'}
                  >
                    <ChevronRight className={`w-5 h-5 ${rtl ? 'scale-x-[-1]' : ''}`} aria-hidden />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-3 bento-item border-t-8 border-accent-blue"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                 <Telescope className="w-4 h-4 text-accent-blue" aria-hidden />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest leading-none text-accent-blue">{lang === 'en' ? 'Vision' : 'الرؤية'}</h4>
             </div>
             <p className="text-base  leading-relaxed mb-6 text-dark text-justify">
               {t.vision}
             </p>
             <div className="mt-auto h-1 w-full bg-accent-blue/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} className="h-full bg-accent-blue" />
             </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3 bento-item border-l-8 border-accent-yellow"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-yellow/10 rounded-lg flex items-center justify-center text-accent-yellow">
                 <Target className="w-4 h-4" aria-hidden />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest text-dark leading-none">{lang === 'en' ? 'Mission' : 'الرسالة'}</h4>
             </div>
             <p className="text-base  leading-relaxed text-dark/70 text-justify">
               {t.mission}
             </p>
          </motion.div>

         

          {/* Marquee/Partners (Wide) */}
          <motion.div 
            initial={{  y: 20 }}
            whileInView={{  y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="md:col-span-4 lg:col-span-6 bento-item bg-bg-card p-6 lg:p-8 border border-black/5"
          >
            <div className="flex items-center justify-between mb-6">
               <p className="text-[9px] font-black text-dark/40 uppercase tracking-[0.3em]">{lang === 'en' ? 'Institutional Network' : 'الشبكة المؤسسية'}</p>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
               </div>
            </div>
            <div className="flex overflow-hidden mask-fade-x" dir="ltr">
               <div className={cn(
                 "flex py-2 gap-10 sm:gap-12 whitespace-nowrap w-max will-change-transform animate-marquee-fast"
               )}>
                  {[...partnerSlides, ...partnerSlides, ...partnerSlides].map((slide, i) => (
                      <span key={i} className="inline-flex items-center shrink-0">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="max-h-14 sm:max-h-16 max-w-[200px] sm:max-w-[220px] w-auto object-contain"
                        />
                      </span>
                    )
                  )}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 36s linear infinite;
        }
      `}</style>
    </section>
  );
};
