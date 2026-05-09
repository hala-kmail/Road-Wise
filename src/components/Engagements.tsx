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

interface EngagementsProps { lang: 'en' | 'ar'; }

/** Order must match `content.*.engagements.items`. FA 5/6: bullhorn, city, shield-heart / user-shield, balance-scale. Lucide lacks ShieldHeart here → ShieldUser */
const ENGAGEMENT_ICONS: LucideIcon[] = [Megaphone, Building2, ShieldUser, Scale];

/** Matches site @theme accents: advocacy / municipalities / EiE safeguarding / accountability */
const ENGAGEMENT_PALETTE = [
  {
    top: 'border-t-secondary',
    hoverBorder: 'hover:border-secondary',
    icon: 'text-secondary',
    iconHoverBg: 'group-hover:bg-secondary',
    iconHoverFg: 'group-hover:text-white',
    footer: 'text-secondary',
    dotSoft: 'bg-secondary/25',
    dot: 'bg-secondary',
    wash: 'from-secondary/[0.07]',
  },
  {
    top: 'border-t-accent-brown',
    hoverBorder: 'hover:border-accent-brown',
    icon: 'text-accent-brown',
    iconHoverBg: 'group-hover:bg-accent-brown',
    iconHoverFg: 'group-hover:text-white',
    footer: 'text-accent-brown',
    dotSoft: 'bg-accent-brown/25',
    dot: 'bg-accent-brown',
    wash: 'from-accent-brown/[0.07]',
  },
  {
    top: 'border-t-primary',
    hoverBorder: 'hover:border-primary',
    icon: 'text-primary',
    iconHoverBg: 'group-hover:bg-primary',
    iconHoverFg: 'group-hover:text-white',
    footer: 'text-primary',
    dotSoft: 'bg-primary/25',
    dot: 'bg-primary',
    wash: 'from-primary/[0.07]',
  },
  {
    top: 'border-t-accent-yellow',
    hoverBorder: 'hover:border-accent-yellow',
    icon: 'text-accent-yellow',
    iconHoverBg: 'group-hover:bg-accent-yellow',
    iconHoverFg: 'group-hover:text-dark',
    footer: 'text-accent-yellow',
    dotSoft: 'bg-accent-yellow/40',
    dot: 'bg-accent-yellow',
    wash: 'from-accent-yellow/[0.12]',
  },
] as const;

export const Engagements: React.FC<EngagementsProps> = ({ lang }) => {
  const t = content[lang].engagements;

  return (
    <section id="engagements" className="sm:py-24 py-16 bg-gradient-to-b from-bg-card via-white to-bg-card px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="text-start">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-2 tracking-tighter text-dark leading-none"
            >
              {t.title}
            </motion.h2>
            <p className="text-dark/30 font-bold text-xs uppercase tracking-widest leading-none">
               {lang === 'en' ? 'Impact across diverse sectors' : 'أثر ممتد عبر قطاعات متنوعة'}
            </p>
            <div className="flex gap-2 mt-4 flex-wrap" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-secondary" />
              <span className="h-1 w-8 rounded-full bg-accent-brown" />
              <span className="h-1 w-12 rounded-full bg-primary" />
              <span className="h-1 w-9 rounded-full bg-accent-yellow" />
              <span className="h-1 w-7 rounded-full bg-accent-blue" />
              <span className="h-1 w-6 rounded-full bg-accent-red opacity-90" />
            </div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark/15 to-transparent hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          {t.items.map((item, idx) => {
            const Icon = ENGAGEMENT_ICONS[idx] ?? ENGAGEMENT_ICONS[0];
            const palette = ENGAGEMENT_PALETTE[idx] ?? ENGAGEMENT_PALETTE[0];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'relative p-8 bento-item group bg-bg-card border border-black/5 border-t-[5px] transition-all overflow-hidden',
                  palette.top,
                  palette.hoverBorder,
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-[0.85] rounded-[inherit]',
                    palette.wash,
                  )}
                  aria-hidden
                />
                <div className="relative">
                <div
                  className={cn(
                    'w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm border border-black/5 transition-all transform group-hover:scale-105',
                    palette.icon,
                    palette.iconHoverBg,
                    palette.iconHoverFg,
                  )}
                  aria-hidden
                >
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-black text-dark mb-3 leading-tight">{item.title}</h3>
                <p className="text-dark/40 leading-relaxed text-xs font-bold mb-8">{item.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className={cn('text-[9px] font-black uppercase tracking-widest', palette.footer)}>{lang === 'en' ? 'Sector Analysis' : 'تحليل القطاعات'}</span>
                  <div className="flex gap-1">
                     <div className={cn('w-1.5 h-1.5 rounded-full', palette.dotSoft)} />
                     <div className={cn('w-1.5 h-1.5 rounded-full', palette.dot)} />
                  </div>
                </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
