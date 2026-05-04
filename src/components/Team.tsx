import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface TeamProps { lang: 'en' | 'ar'; }

export const Team: React.FC<TeamProps> = ({ lang }) => {
  const t = content[lang].team;
  const scrollRef = useRef<HTMLDivElement>(null);

  const colors = [
    'from-primary/20 to-primary/5',
    'from-secondary/20 to-secondary/5',
    'from-cyan/20 to-cyan/5',
    'from-yellow/20 to-yellow/5',
    'from-brown/20 to-brown/5',
    'from-brand-red/20 to-brand-red/5'
  ];

  const borderGlows = [
    'group-hover:border-primary/50 group-hover:shadow-[0_10px_30px_rgba(47,159,157,0.1)]',
    'group-hover:border-secondary/50 group-hover:shadow-[0_10px_30px_rgba(99,41,108,0.1)]',
    'group-hover:border-cyan/50 group-hover:shadow-[0_10px_30px_rgba(37,160,164,0.1)]',
    'group-hover:border-yellow/50 group-hover:shadow-[0_10px_30px_rgba(248,192,45,0.1)]',
    'group-hover:border-brown/50 group-hover:shadow-[0_10px_30px_rgba(117,62,4,0.1)]',
    'group-hover:border-brand-red/50 group-hover:shadow-[0_10px_30px_rgba(149,13,22,0.1)]'
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between gap-8 mb-12">
          <div className="text-start">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-2 tracking-tighter text-dark leading-none"
            >
              {t.title}
            </motion.h2>
            <p className="text-dark/30 font-bold text-xs uppercase tracking-widest leading-none">{t.subtitle}</p>
          </div>
          <div className="h-px flex-1 bg-dark/5 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {t.members.map((member: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 glass-card rounded-[2rem] bg-bg-card/50 border border-black/5 hover:border-primary/20 transition-all flex flex-col group h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-sm transition-transform group-hover:rotate-6",
                  idx % 6 === 0 ? "bg-primary" : 
                  idx % 6 === 1 ? "bg-secondary" : 
                  idx % 6 === 2 ? "bg-accent-blue" : 
                  idx % 6 === 3 ? "bg-accent-yellow" : 
                  idx % 6 === 4 ? "bg-accent-brown" : "bg-accent-red"
                )}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-sm font-black text-dark leading-tight">{member.name}</h3>
                  <p className="text-[10px] font-bold text-primary italic leading-none mt-1">{member.title}</p>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase text-dark/30">
                    <span>Expertise</span>
                    <span className="text-dark/50">{member.exp}</span>
                 </div>
                 <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-white border border-black/5 rounded-md text-[8px] font-black uppercase text-dark/40 tracking-wider">
                       {member.specialty}
                    </span>
                 </div>
              </div>

              <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                 <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-dark/30 hover:text-primary hover:border-primary transition-all">
                       <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-dark/30 hover:text-primary hover:border-primary transition-all">
                       <Mail className="w-3.5 h-3.5" />
                    </a>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pb-12">
        <p className="text-center text-dark/20 text-[9px] font-bold uppercase tracking-widest">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
};
