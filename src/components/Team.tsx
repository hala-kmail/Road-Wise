import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface TeamProps {
  lang: 'en' | 'ar';
}

type TeamMember = (typeof content.en.team.members)[number];

const avatarTone = (idx: number) => {
  const tones = [
    'bg-primary shadow-[0_12px_28px_-8px_rgba(47,159,157,0.45)] ring-primary/25',
    'bg-secondary shadow-[0_12px_28px_-8px_rgba(99,41,108,0.4)] ring-secondary/25',
    'bg-accent-blue shadow-[0_12px_28px_-8px_rgba(37,160,164,0.4)] ring-accent-blue/25',
    'bg-accent-yellow text-dark shadow-[0_12px_28px_-8px_rgba(248,192,45,0.35)] ring-accent-yellow/30',
    'bg-accent-brown shadow-[0_12px_28px_-8px_rgba(117,62,4,0.35)] ring-accent-brown/25',
    'bg-accent-red shadow-[0_12px_28px_-8px_rgba(149,13,22,0.4)] ring-accent-red/25',
  ];
  return tones[idx % tones.length];
};

export const Team: React.FC<TeamProps> = ({ lang }) => {
  const t = content[lang].team;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = Math.max(0, scrollWidth - clientWidth);
    setCanPrev(scrollLeft > 6);
    setCanNext(scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, lang, t.members.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: 0 });
      updateScrollState();
    }
  }, [lang, updateScrollState]);

  const scrollStrip = (forward: boolean) => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const step = Math.min(el.clientWidth * 0.78, 340);
    el.scrollBy({ left: forward ? step : -step, behavior: 'smooth' });
  };

  return (
    <section id="team" className="overflow-hidden bg-bg-deep py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 text-start">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 text-heading-section font-black leading-[1.05] tracking-tighter text-dark"
            >
              {t.title}
            </motion.h2>
            <p className="text-meta font-bold uppercase tracking-[0.2em] text-dark/35 lg:text-base">{t.subtitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-stretch sm:self-auto">
            <button
              type="button"
              aria-label={lang === 'en' ? 'Scroll team left' : 'تمرير الفريق لليسار'}
              disabled={!canPrev}
              onClick={() => {
                scrollStrip(false);
              }}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border border-dark/[0.08] bg-white/80 text-dark shadow-sm backdrop-blur-md transition-all',
                'hover:border-primary/25 hover:bg-white hover:text-primary hover:shadow-md',
                'disabled:pointer-events-none disabled:opacity-35'
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={lang === 'en' ? 'Scroll team right' : 'تمرير الفريق لليمين'}
              disabled={!canNext}
              onClick={() => {
                scrollStrip(true);
              }}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border border-dark/[0.08] bg-white/80 text-dark shadow-sm backdrop-blur-md transition-all',
                'hover:border-primary/25 hover:bg-white hover:text-primary hover:shadow-md',
                'disabled:pointer-events-none disabled:opacity-35'
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* LTR scroll track so scrollLeft / arrows behave consistently; each card sets text direction */}
        <div className="relative -mx-4 sm:-mx-6">
          <div
            className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-bg-deep to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-bg-deep to-transparent sm:w-14"
            aria-hidden
          />
          <div
            ref={scrollRef}
            dir="ltr"
            className={cn(
              'flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:gap-5 sm:px-6',
              'scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            )}
          >
            {t.members.map((member: TeamMember, idx: number) => (
              <motion.article
                key={`${member.name}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.04, duration: 0.45 }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className={cn(
                  'group relative flex min-h-[340px] w-[min(100%,280px)] shrink-0 snap-center flex-col sm:min-h-[360px] sm:w-[300px] lg:w-[340px] xl:w-[360px]',
                  'rounded-[1.75rem] border border-white/55 bg-white/65 p-6 shadow-[0_20px_50px_-28px_rgba(47,159,157,0.12)] backdrop-blur-xl lg:p-7',
                  'ring-1 ring-black/[0.03] transition-all duration-300',
                  'hover:-translate-y-1 hover:border-primary/20 hover:bg-white/85 hover:shadow-[0_28px_60px_-24px_rgba(47,159,157,0.18)]'
                )}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-[1.75rem] bg-gradient-to-r from-primary/80 via-primary-light/90 to-accent-yellow/70 opacity-90"
                  aria-hidden
                />

                <div className="mb-5 flex flex-col items-center text-center">
                  <div
                    className={cn(
                      'mb-4 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl text-xl font-black tracking-tight text-white ring-2 ring-white/40 transition-transform duration-300 group-hover:scale-[1.04] lg:h-[4.75rem] lg:w-[4.75rem] lg:text-2xl',
                      avatarTone(idx)
                    )}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-balance text-lg font-black leading-tight text-dark lg:text-xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-pretty text-card-body font-semibold leading-snug text-primary/90">
                    {member.title}
                  </p>
                </div>

                <div className="mb-5 flex flex-1 flex-col gap-3 rounded-2xl border border-black/[0.05] bg-white/50 p-3.5 lg:p-4">
                  <div className="flex items-center justify-between gap-2 text-label font-black uppercase tracking-wider text-dark/35">
                    <span>{lang === 'en' ? 'Expertise' : 'الخبرة'}</span>
                    <span className="tabular-nums text-body-sm text-dark/55">{member.exp}</span>
                  </div>
                  <span className="inline-flex w-fit max-w-full rounded-lg border border-primary/10 bg-primary/[0.06] px-2.5 py-1.5 text-label font-black uppercase tracking-wide text-primary/90 lg:px-3 lg:text-meta">
                    {member.specialty}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-black/[0.06] pt-4">
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-white/90 text-dark/40 transition-all hover:border-primary/25 hover:text-primary"
                      aria-label={lang === 'en' ? 'LinkedIn' : 'لينكدإن'}
                    >
                      <Linkedin className="h-3.5 w-3.5" aria-hidden />
                    </a>
                    <a
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-white/90 text-dark/40 transition-all hover:border-primary/25 hover:text-primary"
                      aria-label={lang === 'en' ? 'Email' : 'البريد'}
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-primary to-primary-light opacity-60 ring-4 ring-primary/10 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6">
        <p className="text-center text-label font-bold uppercase tracking-widest text-dark/25 lg:text-meta">{t.disclaimer}</p>
      </div>
    </section>
  );
};
