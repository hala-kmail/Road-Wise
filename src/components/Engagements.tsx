import React from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { Briefcase, Building2, Shield, FileSearch } from 'lucide-react';
import { cn } from '../lib/utils';

interface EngagementsProps { lang: 'en' | 'ar'; }

export const Engagements: React.FC<EngagementsProps> = ({ lang }) => {
  const t = content[lang].engagements;
  const icons = [Briefcase, Building2, Shield, FileSearch];

  return (
    <section id="engagements" className="py-24 bg-white px-6 overflow-hidden">
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
               Impact across diverse sectors
            </p>
          </div>
          <div className="h-px flex-1 bg-dark/5 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          {t.items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-8 bento-item group bg-bg-card border border-black/5 hover:border-accent-blue transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent-blue mb-8 shadow-sm group-hover:bg-accent-blue group-hover:text-white transition-all transform group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-dark mb-3 leading-tight">{item.title}</h3>
                <p className="text-dark/40 leading-relaxed text-xs font-bold mb-8">{item.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-accent-blue">Sector Analysis</span>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/20" />
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
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
