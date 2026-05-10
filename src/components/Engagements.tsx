import React, { useId } from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';
import {
  Megaphone,
  Building2,
  ShieldUser,
  Scale,
  type LucideIcon,
} from 'lucide-react';

interface EngagementsProps {
  lang: 'en' | 'ar';
}

const ENGAGEMENT_ICONS: LucideIcon[] = [Megaphone, Building2, ShieldUser, Scale];

const ENGAGEMENT_TILE = [
  {
    top: 'border-t-[3px] border-t-secondary',
    icon: 'text-secondary',
    iconBox:
      'bg-gradient-to-br from-secondary/15 to-secondary/5 text-secondary shadow-inner ring-secondary/25 group-hover:from-secondary group-hover:to-secondary group-hover:text-white group-hover:ring-secondary/40 group-hover:shadow-md',
    wash: 'from-secondary/[0.12] via-secondary/[0.04]',
    node: 'bg-secondary shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
  },
  {
    top: 'border-t-[3px] border-t-accent-brown',
    icon: 'text-accent-brown',
    iconBox:
      'bg-gradient-to-br from-accent-brown/18 to-accent-brown/5 text-accent-brown shadow-inner ring-accent-brown/30 group-hover:from-accent-brown group-hover:to-accent-brown group-hover:text-white group-hover:shadow-md',
    wash: 'from-accent-brown/[0.11] via-accent-brown/[0.03]',
    node: 'bg-accent-brown shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
  },
  {
    top: 'border-t-[3px] border-t-primary',
    icon: 'text-primary',
    iconBox:
      'bg-gradient-to-br from-primary/18 to-primary/5 text-primary shadow-inner ring-primary/25 group-hover:from-primary group-hover:to-primary group-hover:text-white group-hover:ring-primary/35 group-hover:shadow-md',
    wash: 'from-primary/[0.11] via-primary/[0.03]',
    node: 'bg-primary shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
  },
  {
    top: 'border-t-[3px] border-t-accent-yellow',
    icon: 'text-accent-yellow',
    iconBox:
      'bg-gradient-to-br from-accent-yellow/25 to-accent-yellow/8 text-dark/85 shadow-inner ring-accent-yellow/35 group-hover:from-accent-yellow group-hover:to-amber-300 group-hover:text-dark group-hover:shadow-md',
    wash: 'from-accent-yellow/[0.14] via-accent-yellow/[0.04]',
    node: 'bg-accent-yellow shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
  },
] as const;

/** شجرة تنظيمية — تدرج خط، وهج جذر، عقد نهاية الفروع */
function EngagementsTreeSvg({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const gradLine = `eng-tree-line-${uid}`;
  const gradRoot = `eng-tree-root-${uid}`;
  const filterGlow = `eng-tree-glow-${uid}`;

  return (
    <svg
      className={cn('w-full max-w-[52rem] overflow-visible text-dark/25', className)}
      viewBox="0 0 400 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradLine} x1="40" y1="36" x2="360" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#63296c" stopOpacity="0.45" />
          <stop offset="0.33" stopColor="#2f9f9d" stopOpacity="0.5" />
          <stop offset="0.66" stopColor="#25a0a4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f8c02d" stopOpacity="0.42" />
        </linearGradient>
        <radialGradient id={gradRoot} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2f9f9d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2f9f9d" stopOpacity="0" />
        </radialGradient>
        <filter id={filterGlow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="200" cy="14" r="22" fill={`url(#${gradRoot})`} opacity="0.85" />
      <path
        d="M200 14 L200 38 M 52 38 L 348 38 M 52 38 L 52 88 M 150 38 L 150 88 M 250 38 L 250 88 M 348 38 L 348 88"
        stroke={`url(#${gradLine})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M200 14 L200 38 M 52 38 L 348 38 M 52 38 L 52 88 M 150 38 L 150 88 M 250 38 L 250 88 M 348 38 L 348 88"
        className="text-dark/[0.07]"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0.35, 0.35)"
      />

      <circle cx="200" cy="14" r="7" className="fill-primary" filter={`url(#${filterGlow})`} opacity="0.95" />
      <circle cx="200" cy="14" r="5" className="fill-white" opacity="0.35" />

      <circle cx="52" cy="88" r="5.5" className="fill-white stroke-secondary" strokeWidth="2" />
      <circle cx="150" cy="88" r="5.5" className="fill-white stroke-[#753e04]" strokeWidth="2" />
      <circle cx="250" cy="88" r="5.5" className="fill-white stroke-primary" strokeWidth="2" />
      <circle cx="348" cy="88" r="5.5" className="fill-white stroke-accent-yellow" strokeWidth="2" />
    </svg>
  );
}

export const Engagements: React.FC<EngagementsProps> = ({ lang }) => {
  const t = content[lang].engagements;

  return (
    <section
      id="engagements"
      className="relative border-y border-black/[0.06] bg-gradient-to-b from-white via-bg-deep/35 to-bg-deep px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 52%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-4xl font-black tracking-tighter text-dark md:text-5xl"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className={cn(
              'mx-auto mt-4 max-w-xl text-sm font-semibold leading-relaxed text-dark/50 sm:text-base',
              lang === 'en' && 'text-pretty'
            )}
          >
            {t.subtitle}
          </motion.p>
          <div
            className="mx-auto mt-6 h-px w-28 max-w-full bg-gradient-to-r from-transparent via-primary/45 to-transparent"
            aria-hidden
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.65rem] border border-black/[0.06] bg-gradient-to-b from-white via-white to-zinc-50/90 p-5 shadow-[0_32px_90px_-50px_rgba(47,159,157,0.18),0_24px_64px_-48px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1.9rem] sm:p-7 lg:p-9"
        >
          <div className="mb-1 hidden justify-center px-1 lg:flex lg:mb-2">
            <EngagementsTreeSvg className="h-[6.25rem] text-dark/20 sm:h-[6.75rem]" />
          </div>

          <ul
            className="relative m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            role="list"
          >
            <span
              className="pointer-events-none absolute start-[0.7rem] top-4 bottom-4 hidden w-px bg-gradient-to-b from-primary/25 via-dark/10 to-accent-yellow/25 max-sm:block sm:hidden lg:hidden"
              aria-hidden
            />

            {t.items.map((item, idx) => {
              const Icon = ENGAGEMENT_ICONS[idx] ?? ENGAGEMENT_ICONS[0];
              const tile = ENGAGEMENT_TILE[idx] ?? ENGAGEMENT_TILE[0];
              return (
                <motion.li
                  key={item.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-12px' }}
                  transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="relative min-h-0 lg:block"
                >
                  <div className="flex gap-3 sm:gap-4 lg:block">
                    <div className="relative z-[1] hidden w-7 shrink-0 justify-center pt-5 max-sm:flex">
                      <span
                        className={cn(
                          'h-3 w-3 shrink-0 rounded-full ring-[5px] ring-white shadow-sm',
                          tile.node
                        )}
                        aria-hidden
                      />
                    </div>

                    <div className="min-w-0 flex-1 lg:w-auto">
                      <div
                        className={cn(
                          'group relative flex min-h-[11rem] flex-col overflow-hidden rounded-[1.2rem] border border-black/[0.06] bg-white/90 shadow-[0_14px_44px_-28px_rgba(47,159,157,0.18),0_8px_28px_-24px_rgba(0,0,0,0.07)] ring-1 ring-inset ring-white/80 transition-all duration-300 sm:min-h-[12rem] sm:rounded-[1.35rem] lg:aspect-square lg:min-h-0',
                          'hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_28px_56px_-32px_rgba(47,159,157,0.28),0_16px_40px_-28px_rgba(0,0,0,0.1)]',
                          tile.top
                        )}
                      >
                        <div
                          className={cn(
                            'pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-[0.92]',
                            tile.wash
                          )}
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-90"
                          aria-hidden
                        />
                        <div className="relative flex h-full min-h-0 flex-col p-4 sm:p-5">
                          <div
                            className={cn(
                              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/[0.05] ring-1 transition-all duration-300 group-hover:scale-[1.06]',
                              tile.icon,
                              tile.iconBox
                            )}
                            aria-hidden
                          >
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <h3 className="mt-3.5 line-clamp-4 flex-1 text-pretty text-[0.8125rem] font-black leading-snug tracking-tight text-dark sm:text-sm">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 line-clamp-3 text-pretty text-[11px] font-semibold leading-relaxed text-dark/50 sm:text-xs">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
