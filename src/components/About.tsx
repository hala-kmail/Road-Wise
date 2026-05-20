import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { content } from '../lib/constants';
import { getPartnerLogoMarqueeSlides } from '../lib/partnerMarqueeSlides';
import { cn } from '../lib/utils';
import { Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const LEADERSHIP_ROTATE_MS = 6000;

const leaderMonogramTone = (idx: number) => {
  const tones = [
    'bg-gradient-to-br from-primary via-[#379e9c] to-accent-blue',
    'bg-gradient-to-br from-secondary via-[#7a3d85] to-primary',
    'bg-gradient-to-br from-accent-blue via-primary to-[#2a8f8d]',
    'bg-gradient-to-br from-accent-blue via-primary to-accent-yellow',
  ] as const;
  return tones[idx % tones.length];
};

interface AboutProps {
  lang: 'en' | 'ar';
}

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
    <section id="about" className="relative bg-bg-deep py-16 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 55% at 50% -8%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-heading-section font-black tracking-tighter text-dark"
          >
            {t.title}
          </motion.h2>
          <div className="mx-auto mt-5 h-px max-w-xs bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-white shadow-[0_28px_80px_-48px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.85)_inset] sm:rounded-[1.85rem]"
        >
          {/* صف علوي: النص + القيادة */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,38%)] lg:divide-x lg:divide-dark/12">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-6 flex gap-2">
                <div className="h-1 w-8 rounded-full bg-primary" />
                <div className="h-1 w-4 rounded-full bg-accent-blue/80" />
                <div className="h-1 w-2.5 rounded-full bg-accent-yellow" />
              </div>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
                {lang === 'en' ? 'Our Foundation' : 'أساسنا'}
              </h3>
              <p className="max-w-3xl text-pretty text-lg font-semibold leading-[1.75] text-dark/88 md:text-xl lg:text-2xl text-justify">
                {t.description}
              </p>

              <div className="mt-10 border-t border-dark/12 pt-10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    <Globe className="h-4 w-4" aria-hidden />
                  </div>
                  <span className="text-label font-black uppercase tracking-[0.2em] text-primary">
                    {lang === 'en' ? 'Geographic Coverage' : 'التغطية الجغرافية'}
                  </span>
                </div>
                <p className="max-w-3xl text-pretty text-base font-medium leading-relaxed text-dark/65 sm:text-lg lg:text-xl">
                  {t.coverage}
                </p>
              </div>
            </div>

            <div
              className="relative flex flex-col border-t border-dark/12 bg-bg-deep/25 p-6 sm:p-8 lg:border-t-0 lg:min-h-[360px]"
              onMouseEnter={() => {
                setPauseRotate(true);
              }}
              onMouseLeave={() => {
                setPauseRotate(false);
              }}
            >
              <Users
                className={cn(
                  'pointer-events-none absolute top-7 h-7 w-7 text-primary/15',
                  rtl ? 'left-7' : 'right-7'
                )}
                aria-hidden
              />

              <div className={cn('relative', rtl ? 'pl-10' : 'pr-10')}>
                <h4 className="mb-6 text-label font-black uppercase tracking-[0.22em] text-primary">
                  {lang === 'en' ? 'Leadership' : 'القيادة'}
                </h4>

                <div className="relative min-h-[260px]" dir={rtl ? 'rtl' : 'ltr'}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.article
                      key={`${activeLeaderIdx}-${activeLeader.avatarSeed}`}
                      role="article"
                      initial={{ opacity: 0, y: rtl ? -8 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: rtl ? 4 : -4 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl bg-white p-5 sm:p-6"
                    >
                      <div className={cn('mb-5 flex gap-4 sm:gap-5', rtl ? 'flex-row-reverse' : '')}>
                        <div className="shrink-0">
                          <div
                            className={cn(
                              'flex size-[4rem] items-center justify-center rounded-xl text-base font-black tracking-tight text-white sm:size-[4.5rem] sm:text-lg',
                              leaderMonogramTone(activeLeaderIdx)
                            )}
                            aria-hidden
                          >
                            {activeLeader.initials}
                          </div>
                        </div>
                        <div className={cn('flex min-w-0 flex-1 flex-col justify-center', rtl ? 'text-right' : '')}>
                          <p className="mb-1.5 text-lg font-black leading-snug text-dark sm:text-xl">{activeLeader.name}</p>
                          <p className="text-label font-bold uppercase tracking-widest text-primary/85 sm:text-meta">
                            {activeLeader.role}
                          </p>
                        </div>
                      </div>
                      <p className="-ms-px border-s-[3px] border-primary/20 ps-3.5 text-xs font-medium leading-relaxed text-dark/58 sm:text-body-sm">
                        {activeLeader.bio}
                      </p>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>

              {leaderCount > 1 && (
                <div
                  className={cn(
                    'mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-dark/10 px-1 pb-1 pt-5',
                    rtl ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {leaders.map((person, dotIdx) => (
                      <button
                        key={person.avatarSeed}
                        type="button"
                        aria-label={lang === 'en' ? `Show ${person.name}` : `عرض ${person.name}`}
                        aria-current={dotIdx === activeLeaderIdx}
                        onClick={() => {
                          setActiveLeaderIdx(dotIdx);
                        }}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300',
                          dotIdx === activeLeaderIdx ? 'w-7 bg-primary' : 'w-1.5 bg-dark/15 hover:bg-dark/30'
                        )}
                      />
                    ))}
                  </div>
                  <div className={cn('flex items-center gap-1.5', rtl ? 'flex-row-reverse' : '')}>
                    <button
                      type="button"
                      onClick={() => {
                        if (rtl) {
                          goNext();
                        } else {
                          goPrev();
                        }
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-dark/45 transition-colors hover:bg-white hover:text-primary"
                      aria-label={lang === 'en' ? 'Previous leader' : 'السابق'}
                    >
                      <ChevronLeft className={cn('h-5 w-5', rtl && 'scale-x-[-1]')} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (rtl) {
                          goPrev();
                        } else {
                          goNext();
                        }
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-dark/45 transition-colors hover:bg-white hover:text-primary"
                      aria-label={lang === 'en' ? 'Next leader' : 'التالي'}
                    >
                      <ChevronRight className={cn('h-5 w-5', rtl && 'scale-x-[-1]')} aria-hidden />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* شركاء */}
          <div className="border-t border-dark/12 px-6 py-8 sm:px-10 sm:py-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-label-sm font-black uppercase tracking-[0.28em] text-dark/38">
                {lang === 'en' ? 'Institutional Network' : 'الشبكة المؤسسية'}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
              </div>
            </div>
            <div className="flex overflow-hidden rounded-lg mask-fade-x" dir="ltr">
              <div
                className={cn(
                  'flex w-max gap-10 whitespace-nowrap py-2 will-change-transform animate-marquee-fast sm:gap-12'
                )}
              >
                {[...partnerSlides, ...partnerSlides, ...partnerSlides].map((slide, i) => (
                  <span key={i} className="inline-flex shrink-0 items-center opacity-[0.88] transition-opacity hover:opacity-100">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="h-auto max-h-14 w-auto max-w-[200px] object-contain sm:max-h-16 sm:max-w-[220px]"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
