import React from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface ClientsProps { lang: 'en' | 'ar'; }

export const Clients: React.FC<ClientsProps> = ({ lang }) => {
  const t = content[lang].clients;
  const half = Math.ceil(t.partners.length / 2);
  const row1 = t.partners.slice(0, half);
  const row2 = t.partners.slice(half);

  return (
    <section id="clients" className="py-32 bg-bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.h2 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-dark"
        >
          {t.title}
        </motion.h2>
        <p className="text-dark/30 font-black tracking-widest uppercase text-xs">Our Strategic Global Partners</p>
      </div>

      <div className="space-y-8 relative">
        {/* Row 1 */}
        <div className="flex overflow-hidden mask-fade-x">
          <div className={cn(
            "flex py-4 gap-8 whitespace-nowrap hover:pause transition-all",
            lang === 'ar' ? "animate-marquee-right" : "animate-marquee-left"
          )}>
            {[...row1, ...row1, ...row1].map((p, i) => (
              <div key={i} className="px-10 py-6 glass rounded-2xl border border-black/5 hover:border-primary/50 transition-colors flex items-center justify-center min-w-[200px] group cursor-default shadow-sm">
                <span className="text-xl font-bold text-dark/30 group-hover:text-primary transition-colors">{p}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* Row 2 */}
        <div className="flex overflow-hidden mask-fade-x">
          <div className={cn(
            "flex py-4 gap-8 whitespace-nowrap hover:pause transition-all",
            lang === 'ar' ? "animate-marquee-left" : "animate-marquee-right"
          )}>
            {[...row2, ...row2, ...row2].map((p, i) => (
              <div key={i} className="px-10 py-6 glass rounded-2xl border border-black/5 hover:border-primary/50 transition-colors flex items-center justify-center min-w-[200px] group cursor-default shadow-sm">
                 <span className="text-xl font-bold text-dark/30 group-hover:text-primary transition-colors">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
