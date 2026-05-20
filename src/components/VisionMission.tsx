import React from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { Telescope, Target } from 'lucide-react';
import { cn } from '../lib/utils';

interface VisionMissionProps {
  lang: 'en' | 'ar';
}

export const VisionMission: React.FC<VisionMissionProps> = ({ lang }) => {
  const t = content[lang].visionMission;
  const about = content[lang].about;
  const rtl = lang === 'ar';

  return (
    <section
      id="vision-mission"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f8fa] to-bg-deep/40 py-16 sm:py-24 lg:py-28"
      aria-labelledby="vision-mission-heading"
    >
      <div
        className="pointer-events-none absolute -start-[20%] top-1/4 h-[min(520px,55vw)] w-[min(520px,55vw)] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, var(--color-primary), transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-[15%] bottom-0 h-[min(400px,45vw)] w-[min(400px,45vw)] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, var(--color-secondary), transparent 72%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-mono text-label font-semibold uppercase tracking-[0.32em] text-dark/40"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            id="vision-mission-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.03 }}
            className="text-heading-section font-black tracking-tighter text-dark"
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm font-medium leading-relaxed text-dark/55 sm:text-base"
          >
            {t.sectionSubtitle}
          </motion.p>
          <div
            className="mx-auto mt-6 h-px max-w-xs bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white p-8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.9)_inset] sm:rounded-[1.65rem] sm:p-10 lg:p-11"
          >
            <span
              className={cn(
                'pointer-events-none absolute bottom-0 select-none text-[clamp(5rem,18vw,9rem)] font-black leading-none tracking-tighter text-accent-blue/[0.06]',
                rtl ? 'left-2' : 'right-2'
              )}
              aria-hidden
            >
              01
            </span>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue/0 via-accent-blue/35 to-accent-blue/0 opacity-80"
              aria-hidden
            />
            <div className={cn('relative flex flex-col gap-5', rtl && 'text-right')}>
              <div className={cn('flex items-center gap-3', rtl && 'flex-row-reverse')}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue/12 to-accent-blue/5 text-accent-blue ring-1 ring-accent-blue/10">
                  <Telescope className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.22em] text-accent-blue">{t.visionTitle}</h3>
              </div>
              <p className="relative text-pretty text-base font-semibold leading-[1.8] text-dark/88 md:text-lg text-justify">
                {about.vision}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white p-8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.9)_inset] sm:rounded-[1.65rem] sm:p-10 lg:p-11"
          >
            <span
              className={cn(
                'pointer-events-none absolute bottom-0 select-none text-[clamp(5rem,18vw,9rem)] font-black leading-none tracking-tighter text-accent-yellow/[0.08]',
                rtl ? 'left-2' : 'right-2'
              )}
              aria-hidden
            >
              02
            </span>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-yellow/0 via-accent-yellow/40 to-accent-yellow/0 opacity-90"
              aria-hidden
            />
            <div className={cn('relative flex flex-col gap-5', rtl && 'text-right')}>
              <div className={cn('flex items-center gap-3', rtl && 'flex-row-reverse')}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-yellow/18 to-accent-yellow/6 text-dark/80 ring-1 ring-accent-yellow/15">
                  <Target className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.22em] text-dark/70">{t.missionTitle}</h3>
              </div>
              <p className="relative text-pretty text-base font-semibold leading-[1.8] text-dark/75 md:text-lg text-justify">
                {about.mission}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
