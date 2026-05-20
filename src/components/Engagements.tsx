import React from 'react';
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
    connectorDot: 'bg-secondary',
    hline: 'start-1/2 end-[-0.75rem] bg-gradient-to-r from-secondary/50 to-primary/35',
  },
  {
    top: 'border-t-[3px] border-t-accent-brown',
    icon: 'text-accent-brown',
    iconBox:
      'bg-gradient-to-br from-accent-brown/18 to-accent-brown/5 text-accent-brown shadow-inner ring-accent-brown/30 group-hover:from-accent-brown group-hover:to-accent-brown group-hover:text-white group-hover:shadow-md',
    wash: 'from-accent-brown/[0.11] via-accent-brown/[0.03]',
    node: 'bg-accent-brown shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
    connectorDot: 'bg-accent-brown',
    hline: '-inset-x-3 bg-primary/35',
  },
  {
    top: 'border-t-[3px] border-t-primary',
    icon: 'text-primary',
    iconBox:
      'bg-gradient-to-br from-primary/18 to-primary/5 text-primary shadow-inner ring-primary/25 group-hover:from-primary group-hover:to-primary group-hover:text-white group-hover:ring-primary/35 group-hover:shadow-md',
    wash: 'from-primary/[0.11] via-primary/[0.03]',
    node: 'bg-primary shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
    connectorDot: 'bg-primary',
    hline: '-inset-x-3 bg-primary/35',
  },
  {
    top: 'border-t-[3px] border-t-accent-yellow',
    icon: 'text-accent-yellow',
    iconBox:
      'bg-gradient-to-br from-accent-yellow/25 to-accent-yellow/8 text-dark/85 shadow-inner ring-accent-yellow/35 group-hover:from-accent-yellow group-hover:to-amber-300 group-hover:text-dark group-hover:shadow-md',
    wash: 'from-accent-yellow/[0.14] via-accent-yellow/[0.04]',
    node: 'bg-accent-yellow shadow-[0_0_0_3px_rgba(255,255,255,0.95)]',
    connectorDot: 'bg-accent-yellow',
    hline: 'start-[-0.75rem] end-1/2 bg-gradient-to-l from-primary/35 to-accent-yellow/50',
  },
] as const;

/** Branch connector — lives in the same grid cell as its card */
function EngagementBranch({
  idx,
  count,
  connectorDot,
  hline,
}: {
  idx: number;
  count: number;
  connectorDot: string;
  hline: string;
}) {
  const isFirst = idx === 0;
  const isLast = idx === count - 1;

  return (
    <div className="relative hidden h-[5.25rem] shrink-0 lg:block" aria-hidden>
      <div
        className={cn(
          'absolute top-9 h-px rounded-full',
          isFirst && isLast ? 'inset-x-1/2 w-0' : hline
        )}
      />
      <div className="absolute top-9 bottom-1.5 start-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-dark/25 to-dark/12" />
      <div
        className={cn(
          'absolute bottom-0 start-1/2 size-[11px] -translate-x-1/2 rounded-full border-2 border-white shadow-sm',
          connectorDot
        )}
      />
    </div>
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

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-heading-section font-black tracking-tighter text-dark"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className={cn(
              'mx-auto mt-4 max-w-xl text-base font-semibold leading-relaxed text-dark/50 lg:text-lg',
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
          <ul
            className="relative m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            role="list"
          >
            {/* Root node — centered above the grid, desktop only */}
            <div
              className="pointer-events-none absolute start-1/2 top-5 z-10 hidden -translate-x-1/2 flex-col items-center lg:flex"
              aria-hidden
            >
              <div className="size-3.5 rounded-full bg-primary shadow-[0_0_14px_rgba(47,159,157,0.35)] ring-4 ring-white" />
              <div className="h-4 w-px bg-gradient-to-b from-primary/55 to-dark/20" />
            </div>

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
                  className="relative flex min-h-0 flex-col"
                >
                  <EngagementBranch
                    idx={idx}
                    count={t.items.length}
                    connectorDot={tile.connectorDot}
                    hline={tile.hline}
                  />

                  <div className="flex min-h-0 flex-1 gap-3 sm:gap-4 lg:block">
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
                          'group relative flex h-full min-h-[12rem] flex-col overflow-hidden rounded-[1.2rem] border border-black/[0.06] bg-white/90 shadow-[0_14px_44px_-28px_rgba(47,159,157,0.18),0_8px_28px_-24px_rgba(0,0,0,0.07)] ring-1 ring-inset ring-white/80 transition-all duration-300 sm:min-h-[13rem] sm:rounded-[1.35rem] lg:min-h-[15rem]',
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
                        <div className="relative flex h-full min-h-0 flex-col p-4 sm:p-5 lg:p-6">
                          <div
                            className={cn(
                              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/[0.05] ring-1 transition-all duration-300 group-hover:scale-[1.06] lg:h-12 lg:w-12',
                              tile.icon,
                              tile.iconBox
                            )}
                            aria-hidden
                          >
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <h3 className="mt-3 line-clamp-4 text-pretty text-base font-bold leading-snug tracking-tight text-dark sm:text-lg lg:mt-3.5 lg:leading-normal">
                            {item.title}
                          </h3>
                          <p className="mt-2 line-clamp-4 text-pretty text-sm font-normal leading-relaxed text-dark/55 sm:text-base lg:mt-2.5 lg:text-lg lg:leading-relaxed">
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
