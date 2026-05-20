import React from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import {
  Sprout,
  Building2,
  LineChart,
  CheckCheck,
  Brain,
  Users,
  type LucideIcon,
} from 'lucide-react';

/** Order must match `content.en.approach.tags` / `content.ar.approach.tags`. Maps to FA: seedling, city, chart-line, check-double, brain, users. */
const APPROACH_TAG_ICONS: LucideIcon[] = [
  Sprout,
  Building2,
  LineChart,
  CheckCheck,
  Brain,
  Users,
];

interface ApproachProps { lang: 'en' | 'ar'; }

export const Approach: React.FC<ApproachProps> = ({ lang }) => {
  const t = content[lang].approach;

  return (
    <section id="approach" className="bg-bg-deep px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <span className="text-label font-black uppercase tracking-[0.4em] text-secondary mb-4 block">{lang === 'en' ? 'Methodology' : 'المنهجية'}</span>
               <h2 className="text-heading-section font-black mb-6 tracking-tighter leading-none text-dark">
                 {t.title}
               </h2>
               <p className="text-base text-dark/50 leading-relaxed font-bold mb-8 md:text-lg xl:text-xl">
                 {lang === 'en' 
                   ? "Our methodology is rooted in Asset-Based Community Development (ABCD), focusing on local strengths rather than just needs." 
                   : "تتجذر منهجيتنا في تطوير المجتمع القائم على الأصول (ABCD)، مع التركيز على نقاط القوة المحلية بدلاً من الاحتياجات فقط."}
               </p>
               <div className="flex gap-2">
                  {[1,2,3].map(i => <div key={i} className="h-1 flex-1 bg-secondary/10 rounded-full overflow-hidden leading-none"><motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ delay: i*0.2 }} className="h-full bg-secondary" /></div>)}
               </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {t.tags.map((tag, idx) => {
              const Icon = APPROACH_TAG_ICONS[idx] ?? APPROACH_TAG_ICONS[0];
              return (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 rounded-[2rem] border border-black/5 bg-bg-card p-5 transition-all group hover:border-secondary sm:gap-6 sm:p-6"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex-shrink-0 flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-all transform group-hover:scale-105" aria-hidden>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                   <span className="text-label-sm font-black text-secondary/40 uppercase mb-1 block">{lang === 'en' ? `Phase 0${idx+1}` : `المرحلة 0${idx+1}`}</span>
                   <h3 className="text-pretty text-base font-bold leading-snug text-dark sm:text-lg">{tag}</h3>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
