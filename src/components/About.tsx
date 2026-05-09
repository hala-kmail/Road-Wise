import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { content } from '../lib/constants';
import { getPartnerLogoMarqueeSlides } from '../lib/partnerMarqueeSlides';
import { cn } from '../lib/utils';
import { Users, Globe, Telescope, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const LEADERSHIP_ROTATE_MS = 6000;

const leadershipAvatarSrc = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaarsNeutral/svg?seed=${encodeURIComponent(seed)}&radius=12`;

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
    <section id="about" className="sm:py-32 py-16 bg-white px-6 relative">
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
            className="md:col-span-4 lg:col-span-4 bento-item bg-white"
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
            className="relative md:col-span-2 lg:col-span-2 bg-transparent flex flex-col gap-4 overflow-visible"
            onMouseEnter={() => setPauseRotate(true)}
            onMouseLeave={() => setPauseRotate(false)}
          >
            <Users className={`pointer-events-none w-8 h-8 text-primary/10 absolute top-6 ${rtl ? 'left-10' : 'right-10'} scale-150`} />

            <div className={`relative px-6 pt-6 pb-2 ${rtl ? 'pl-14' : 'pr-14'}`}>
              <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6">
                {lang === 'en' ? 'Leadership' : 'القيادة'}
              </h4>

              <div
                className="relative isolate px-2 sm:px-4 pt-8 pb-[26px]"
                dir={rtl ? 'rtl' : 'ltr'}
              >
                {/* Decorative stacked “backs”: same visual language, no real content */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-12 z-[1] h-[min(100%,18rem)] min-h-[200px] rounded-3xl border border-black/5 bg-gradient-to-b from-neutral-50 to-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] translate-y-[30px] scale-[0.9] origin-top"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 top-8 z-[2] min-h-[220px] rounded-3xl border-t-[6px] border-primary/35 bg-white shadow-md translate-y-[14px] scale-[0.96] origin-top"
                />

                {/* Single interactive card — content swaps; stack illusion from layers above */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={activeLeader.avatarSeed}
                    role="article"
                    initial={{ opacity: 0, x: rtl ? -16 : 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: rtl ? 12 : -12, filter: 'blur(2px)' }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-[3] bento-item bg-white border-t-8 border-primary shadow-xl"
                  >
                    <div className={`flex gap-4 mb-4 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <div className="shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/15 overflow-hidden ring-2 ring-white shadow-md">
                          <img
                            src={leadershipAvatarSrc(activeLeader.avatarSeed)}
                            alt=""
                            className="w-full h-full object-contain object-center"
                            width={80}
                            height={80}
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div className={`min-w-0 flex-1 pt-1 ${rtl ? 'text-right' : ''}`}>
                        <p className="text-xl font-black text-dark leading-tight mb-1">{activeLeader.name}</p>
                        <p className="text-[10px] font-bold text-dark/45 uppercase tracking-widest leading-snug">
                          {activeLeader.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed text-dark/60 font-medium italic">
                      &quot;{activeLeader.bio}&quot;
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            {leaderCount > 1 && (
              <div
                className={`flex flex-wrap items-center justify-between gap-3 px-6 pb-5 pt-0 ${rtl ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex gap-1.5">
                  {leaders.map((person, dotIdx) => (
                    <button
                      key={person.avatarSeed}
                      type="button"
                      aria-label={lang === 'en' ? `Show ${person.name}` : `عرض ${person.name}`}
                      aria-current={dotIdx === activeLeaderIdx}
                      onClick={() => setActiveLeaderIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dotIdx === activeLeaderIdx ? 'w-8 bg-primary' : 'w-2 bg-dark/15 hover:bg-dark/35'
                      }`}
                    />
                  ))}
                </div>
                <div className={`flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={() => (rtl ? goNext() : goPrev())}
                    className="h-9 w-9 rounded-xl border border-dark/10 bg-white hover:bg-black/[0.04] flex items-center justify-center shadow-sm transition-colors"
                    aria-label={lang === 'en' ? 'Previous leader' : 'السابق'}
                  >
                    <ChevronLeft className={`w-5 h-5 text-dark ${rtl ? 'scale-x-[-1]' : ''}`} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => (rtl ? goPrev() : goNext())}
                    className="h-9 w-9 rounded-xl border border-dark/10 bg-white hover:bg-black/[0.04] flex items-center justify-center shadow-sm transition-colors"
                    aria-label={lang === 'en' ? 'Next leader' : 'التالي'}
                  >
                    <ChevronRight className={`w-5 h-5 text-dark ${rtl ? 'scale-x-[-1]' : ''}`} aria-hidden />
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
            className="md:col-span-2 lg:col-span-3 bento-item bg-white border-t-8 border-accent-blue"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                 <Telescope className="w-4 h-4 text-accent-blue" aria-hidden />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest leading-none text-accent-blue">{lang === 'en' ? 'Vision' : 'الرؤية'}</h4>
             </div>
             <p className="text-base font-bold leading-relaxed mb-6 text-dark text-justify">
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
            className="md:col-span-2 lg:col-span-3 bento-item border-l-8 border-accent-yellow bg-white"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-yellow/10 rounded-lg flex items-center justify-center text-accent-yellow">
                 <Target className="w-4 h-4" aria-hidden />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest text-dark leading-none">{lang === 'en' ? 'Mission' : 'الرسالة'}</h4>
             </div>
             <p className="text-base font-bold leading-relaxed text-dark/70 text-justify">
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
