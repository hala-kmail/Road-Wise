import React from 'react';
import { motion } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import { 
  Users, Settings, ShieldCheck, Globe, 
  FileText, LineChart, TrendingUp, Baby 
} from 'lucide-react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface ServicesProps { lang: 'en' | 'ar'; }

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = content[lang].services;
  const icons = [Users, Settings, ShieldCheck, Globe, FileText, LineChart, TrendingUp, Baby];
  const glows = [
    'rgba(47,159,157,0.3)', 'rgba(99,41,108,0.3)', 'rgba(37,160,164,0.3)', 'rgba(248,192,45,0.3)',
    'rgba(117,62,4,0.3)', 'rgba(149,13,22,0.3)', 'rgba(47,159,157,0.3)', 'rgba(99,41,108,0.3)'
  ];

  const iconColors = [
    'text-primary bg-primary/5',
    'text-secondary bg-secondary/5',
    'text-accent-blue bg-accent-blue/5',
    'text-accent-brown bg-accent-brown/5',
    'text-accent-red bg-accent-red/5',
    'text-accent-yellow bg-accent-yellow/5',
    'text-primary bg-primary/5',
    'text-secondary bg-secondary/5'
  ];

  return (
    <section id="services" className="py-24 bg-bg-card px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="text-start">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-dark leading-none"
            >
              Strategic Portfolio
            </motion.h2>
            <p className="text-dark/40 font-bold text-sm uppercase tracking-widest">{t.title}</p>
          </div>
          <div className="hidden md:block w-32 h-1 bg-dark/5 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {t.items.map((service, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group p-6 bg-white rounded-[2rem] border border-black/5 hover:border-primary/20 transition-all shadow-sm hover:shadow-md flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", iconColors[idx % iconColors.length])}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-dark/20 px-2 py-1 bg-bg-card rounded-lg border border-black/5">Category {idx + 1}</span>
                </div>

                <h3 className="text-lg font-black text-dark mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-dark/50 text-xs leading-relaxed mb-6 font-medium">
                  {service.desc}
                </p>
                
                <div className="mt-auto py-2 flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full border border-white bg-dark/10" />)}
                  </div>
                  <button className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                     Details
                     <div className="w-3 h-3 rounded-full border border-primary flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                     </div>
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
