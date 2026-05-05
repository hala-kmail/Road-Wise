import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { content } from '../lib/constants';
import { getPartnerLogoMarqueeSlides } from '../lib/partnerMarqueeSlides';
import { cn } from '../lib/utils';
import { ClipboardCheck, Calendar, MapPin, Languages, Trophy, Users, Globe } from 'lucide-react';

interface AboutProps { lang: 'en' | 'ar'; }

const Counter: React.FC<{ value: number; isYear?: boolean; prefix?: string }> = ({ value, isYear, prefix }) => {
  const [count, setCount] = useState(isYear ? value - 10 : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = isYear ? value - 10 : 0;
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, isYear]);

  return <span ref={ref}>{prefix}{count}</span>;
};

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = content[lang].about;
  const partnerSlides = getPartnerLogoMarqueeSlides(lang);
  
  return (
    <section id="about" className="sm:py-32 py-16 bg-white px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:mb-20 mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-4 inline-block tracking-tighter text-dark"
          >
            {t.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Main Description & Coverage */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 bento-item bg-white"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <div className="w-4 h-1 bg-accent-blue rounded-full" />
              <div className="w-2 h-1 bg-accent-yellow rounded-full" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">{lang === 'en' ? 'Our Foundation' : 'أساسنا'}</h3>
            <p className="text-lg md:text-xl font-bold leading-tight text-dark mb-8">
              {t.description}
            </p>
            
            <div className="mt-auto p-4 bg-accent-blue/5 rounded-2xl border border-accent-blue/10">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-accent-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-blue">{lang === 'en' ? 'Geographic Coverage' : 'التغطية الجغرافية'}</span>
              </div>
              <p className="text-xs font-bold text-dark/70 leading-relaxed">
                {t.coverage}
              </p>
            </div>
          </motion.div>

          {/* Leadership Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 bento-item bg-white border-t-8 border-primary shadow-lg"
          >
            <Users className={`w-8 h-8 text-primary/10 absolute  ${lang === 'ar' ? 'left-8' : 'right-8'} scale-150`} />
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black mb-4">
                MZ
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-1">{lang === 'en' ? 'Leadership' : 'القيادة'}</h4>
              <p className="text-xl font-black text-dark leading-none mb-1">{t.leadership.ceo}</p>
              <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">{lang === 'en' ? 'CEO & Senior Consultant' : 'المدير التنفيذي والمستشار الأول'}</p>
            </div>
            <p className="text-[11px] leading-relaxed text-dark/60 font-medium italic">
              "{t.leadership.bio}"
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-3 bento-item bg-white border-t-8 border-accent-blue"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                 <Trophy className="w-4 h-4 text-accent-blue" />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest leading-none text-accent-blue">{lang === 'en' ? 'Vision' : 'الرؤية'}</h4>
             </div>
             <p className="text-base font-bold leading-relaxed mb-6 text-dark">
               {t.vision}
             </p>
             <div className="mt-auto h-1 w-full bg-accent-blue/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} className="h-full bg-accent-blue" />
             </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3 bento-item border-l-8 border-accent-yellow bg-white"
          >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-accent-yellow/10 rounded-lg flex items-center justify-center text-accent-yellow">
                 <ClipboardCheck className="w-4 h-4" />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest text-dark leading-none">{lang === 'en' ? 'Mission' : 'الرسالة'}</h4>
             </div>
             <p className="text-base font-bold leading-relaxed text-dark/70">
               {t.mission}
             </p>
          </motion.div>

          {/* Core Stat 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 lg:col-span-2 bento-item bg-white border-t-8 border-accent-red"
          >
            <h3 className="text-5xl font-black mb-1 text-accent-red">
               <Counter value={t.stats[0].value} prefix={t.stats[0].prefix} />
            </h3>
            <p className="text-[10px] font-black uppercase tracking-wider text-dark/40">
              {t.stats[0].label}
            </p>
          </motion.div>

          {/* Locations */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 lg:col-span-2 bento-item bg-white border border-black/5"
          >
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center text-accent-blue shadow-sm">
                   <MapPin className="w-4 h-4" />
                 </div>
                 <div>
                  <p className="text-[8px] font-black uppercase text-dark/20 leading-none mb-1">{lang === 'en' ? 'Operational Hubs' : 'مراكز التشغيل'}</p>
                  <p className="text-sm font-black text-dark">{lang === 'en' ? 'Palestine / Jordan' : 'فلسطين / الأردن'}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center text-accent-yellow shadow-sm">
                   <Languages className="w-4 h-4" />
                 </div>
                 <div>
                  <p className="text-[8px] font-black uppercase text-dark/20 leading-none mb-1">{lang === 'en' ? 'Communications' : 'لغة التواصل'}</p>
                  <p className="text-sm font-black text-dark">{lang === 'en' ? 'English / Arabic' : 'العربية / الإنجليزية'}</p>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Secondary Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="md:col-span-1 lg:col-span-2 bento-item bg-bg-card"
          >
             <h3 className="text-4xl font-black text-dark mb-1 leading-none">
               {t.stats[1].isYear ? (
                 <span className="flex items-center gap-1">
                    <span className="text-[10px] font-black uppercase text-dark/40 mt-auto mb-1">{t.stats[1].label}</span>
                    <Counter value={t.stats[1].value} isYear={true} />
                 </span>
               ) : (
                 <Counter value={t.stats[1].value} />
               )}
            </h3>
            {!t.stats[1].isYear && (
              <p className="text-[10px] font-black uppercase tracking-wider text-dark/40">
                {t.stats[1].label}
              </p>
            )}
          </motion.div>

          {/* Marquee/Partners (Wide) */}
          <motion.div 
            initial={{  y: 20 }}
            whileInView={{  y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="md:col-span-4 lg:col-span-6 bento-item bg-bg-card p-6 lg:p-8 border border-black/5"
          >
            <div className="flex items-center justify-between mb-6">
               <p className="text-[9px] font-black text-dark/40 uppercase tracking-[0.3em]">{lang === 'en' ? 'Institutional Network' : 'الشبكة المؤسسية'}</p>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
               </div>
            </div>
            <div className="flex overflow-hidden mask-fade-x" dir="ltr">
               <div className={cn(
                 "flex py-2 gap-8 whitespace-nowrap",
                 "animate-marquee-fast"
               )}>
                  {partnerSlides.concat(partnerSlides).map((slide, i) => (
                      <span key={i} className="inline-flex items-center shrink-0">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="max-h-10 max-w-[140px] w-auto object-contain "
                        />
                      </span>
                    )
                  )}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-fast-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 30s linear infinite;
        }
        .animate-marquee-fast-rtl {
          animation: marquee-fast-rtl 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
