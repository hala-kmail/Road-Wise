import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Globe } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { content } from '../lib/constants';
import { cn } from '../lib/utils';

interface HeroProps {
  lang: 'en' | 'ar';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = content[lang].hero;
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax for subtle motion
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = t.title.split(' ');

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6 pt-28 pb-12"
    >
      {/* GRID PATTERN BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#353535 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* AMBIENT GLOWS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: mousePos.x * 1, y: mousePos.y * 1 }}
          className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ x: mousePos.x * -0.8, y: mousePos.y * -0.8 }}
          className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[180px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* MAIN HERO CARD */}
          <div className="lg:col-span-8 flex flex-col justify-center p-8 md:p-16 glass-card rounded-[3rem] bg-white relative overflow-hidden group">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/20 m-8 rounded-bl-2xl" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-10 w-fit"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {lang === 'en' ? "Consulting Excellence" : "تميز استشاري"}
              </span>
            </motion.div>

            <div className="sm:mb-10 mb-8">
              <div className="flex flex-wrap gap-x-4 gap-y-0">
                {words.map((word, idx) => (
                  <div key={idx} className="overflow-hidden py-1">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                        delay: idx * 0.08, 
                        duration: 0.7, 
                        ease: [0.33, 1, 0.68, 1] 
                      }}
                      className="block text-4xl sm:text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.95]"
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg sm:text-xl text-dark/60 font-medium max-w-xl leading-relaxed sm:mb-12 mb-8"
            >
              {t.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#services"
                className="group relative px-8 py-5 bg-primary text-white rounded-2xl font-black tracking-widest text-[10px] uppercase overflow-hidden transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
              >
                <span className="relative z-10">{t.cta1}</span>
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a
                href="#contact"
                className="group px-8 py-5 border-2 border-dark/5 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-dark/5 transition-all text-dark/70 flex items-center gap-3"
              >
                {t.cta2}
                <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full group-hover:scale-150 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* SIDE INFO CARDS (DENSITY) */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-t-4 border-accent-blue"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-dark/30">Impact</span>
                  <div className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-[8px] font-black rounded-lg">VERIFIED</div>
                </div>
                <div className="text-5xl font-black text-dark tracking-tighter mb-1">{t.stats[0].prefix}{t.stats[0].value}</div>
                <p className="text-xs font-bold text-dark/40">{t.stats[0].label}</p>
              </div>
              <div className="flex gap-2 mt-6">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-accent-blue/10 rounded-full overflow-hidden"><div className="h-full bg-accent-blue w-full opacity-60" /></div>)}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="glass-card rounded-[2.5rem] p-8 flex flex-col border-t-4 border-accent-red bg-accent-red/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-red rounded-xl flex items-center justify-center text-white">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-dark/30 leading-none mb-1">{t.stats[1].label}</p>
                   <p className="text-xl font-black text-dark">{t.stats[1].value}</p>
                </div>
              </div>
              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-dark/40 italic">
                    {lang === 'en' ? "Consistently delivering high-quality advisory services." : "تقديم خدمات استشارية عالية الجودة باستمرار."}
                 </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="glass-card rounded-[2.5rem] p-8 flex items-center justify-between border-t-4 border-accent-brown"
            >
              <div>
                <p className="text-xs font-bold text-dark/30 mb-1">{t.stats[2].label}</p>
                <p className="text-lg font-black text-dark tracking-tighter leading-tight">{t.stats[2].value}</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-accent-brown/20 flex items-center justify-center">
                 <div className="w-2 h-2 bg-accent-brown rounded-full animate-ping" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Badge (Refined) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className={cn(
          "absolute bottom-6 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-black/5 shadow-xl z-20",
          lang === 'ar' ? "left-6" : "right-6"
        )}
      >
        <div className="w-8 h-8 bg-dark rounded-xl flex items-center justify-center text-white">
          <Globe className="w-4 h-4" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dark/40">{t.stats[3].label} — {t.stats[3].value}</p>
      </motion.div>
    </section>
  );
};
