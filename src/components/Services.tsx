import React from 'react';
import { motion } from 'motion/react';
import {
  Presentation,
  FolderTree,
  Scale,
  Megaphone,
  FileSignature,
  LineChart,
  HandCoins,
  ShieldUser,
  type LucideIcon,
} from 'lucide-react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface ServicesProps {
  lang: 'en' | 'ar';
}

/** Order must match `content.*.services.items`. FA 5/6 → Lucide: chalkboard-teacher/graduation-cap, sitemap, balance-scale, bullhorn, file-signature, chart-line, hand-holding-usd/coins, user-shield */
const SERVICE_ICONS: LucideIcon[] = [
  Presentation,
  FolderTree,
  Scale,
  Megaphone,
  FileSignature,
  LineChart,
  HandCoins,
  ShieldUser,
];

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = content[lang].services;

  const iconColors = [
    'text-primary-light bg-primary/15 ring-primary/20',
    'text-secondary bg-secondary/15 ring-secondary/20',
    'text-accent-blue bg-accent-blue/15 ring-accent-blue/20',
    'text-accent-yellow bg-accent-yellow/12 ring-accent-yellow/25',
    'text-accent-brown bg-accent-brown/15 ring-accent-brown/20',
    'text-accent-red bg-accent-red/15 ring-accent-red/20',
    'text-primary-light bg-primary/15 ring-primary/20',
    'text-secondary bg-secondary/15 ring-secondary/20',
  ];

  return (
    <section
      id="services"
      className="relative border-t border-white/10 bg-dark py-24 text-white/90"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,159,157,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 sm:items-end md:flex-row">
          <div className="text-start">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-black leading-none tracking-tighter text-white md:text-5xl"
            >
              {t.portfolioTitle}
            </motion.h2>
            <p className="text-sm font-bold uppercase tracking-widest text-white/45">{t.title}</p>
          </div>
          <div className="hidden h-1 w-32 rounded-full bg-white/15 md:block" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {t.items.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300',
                  'hover:border-primary/40 hover:bg-white/[0.1] hover:shadow-[0_22px_50px_-24px_rgba(47,159,157,0.22)]'
                )}
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-transform duration-500 group-hover:scale-110',
                      iconColors[idx % iconColors.length]
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/45">
                    {t.categoryLabel} {idx + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-black leading-tight text-white">{service.title}</h3>
                <p className="mb-6 flex-1 text-xs font-medium leading-relaxed text-white/55">{service.desc}</p>

                <div className="mt-auto flex items-center justify-between py-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border border-white/25 bg-white/10"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary-light transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  >
                    {t.detailsCta}
                    <span className="flex h-3 w-3 items-center justify-center rounded-full border border-primary-light/60">
                      <span className="h-1 w-1 rounded-full bg-primary-light" />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
