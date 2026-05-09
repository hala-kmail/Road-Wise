import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Globe, Linkedin, Twitter, Facebook, Instagram, Sprout } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { content } from '../lib/constants';
import { cn } from '../lib/utils';
import palestineImg from '../assets/palestine.jpg';
import jordanImg from '../assets/jordan.png';

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

  // Carousel Data
  const carouselItems = [
    {
      title: lang === 'en' ? "New Partnership in Jordan" : "شراكة جديدة في الأردن",
      category: lang === 'en' ? "News" : "أخبار",
      date: "2024",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: lang === 'en' ? "Strategic Infrastructure Project" : "مشروع بنية تحتية استراتيجي",
      category: lang === 'en' ? "Project" : "مشروع",
      date: "2024",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: lang === 'en' ? "Consulting Excellence Award" : "جائزة التميز في الاستشارات",
      category: lang === 'en' ? "Award" : "جائزة",
      date: "2023",
      image: "https://images.unsplash.com/photo-1523240715639-93f8fa096ee2?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-deep px-6 pt-32 pb-24"
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
        <motion.div
          animate={{ x: mousePos.x * 0.6, y: mousePos.y * 0.5 }}
          className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-accent-yellow/8 rounded-full blur-[140px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* MAIN HERO CARD */}
          <div className="lg:col-span-8 flex flex-col justify-center p-8 md:p-16 glass-card rounded-[3rem] relative overflow-hidden group">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent-yellow/12 to-primary/8 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-700" />
            <div className="hidden sm:block absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/20 m-8 rounded-bl-2xl" />

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

          {/* NEWS/GALLERY CAROUSEL CARD */}
          <div className="lg:col-span-4 relative group">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="h-full glass-card rounded-[3rem] bg-dark overflow-hidden relative"
            >
              {carouselItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSlide === idx ? 1 : 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary text-white text-[8px] font-black uppercase rounded-full">{item.category}</span>
                        <span className="text-[10px] text-white/40 font-bold">{item.date}</span>
                     </div>
                     <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-4">{item.title}</h3>
                     <div className="flex gap-1">
                        {carouselItems.map((_, i) => (
                          <div 
                            key={i} 
                            onClick={() => setActiveSlide(i)}
                            className={cn(
                              "h-1 transition-all duration-300 cursor-pointer rounded-full",
                              activeSlide === i ? "w-8 bg-primary" : "w-2 bg-primary/22"
                            )} 
                          />
                        ))}
                     </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* BOTTOM STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="glass-card rounded-[2rem] p-6 flex flex-col justify-between border-t-4 border-accent-blue min-h-[160px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-dark/30">{lang === 'en' ? 'Impact' : 'الأثر'}</span>
                  <div className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-[8px] font-black rounded-lg">{lang === 'en' ? 'VERIFIED' : 'موثّق'}</div>
                </div>
                <div className="text-4xl font-black text-dark tracking-tighter mb-1">{t.stats[0].prefix}{t.stats[0].value}</div>
                <p className="text-xs font-bold text-dark/40">{t.stats[0].label}</p>
              </div>
              <div className="flex gap-2 mt-4">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-accent-blue/10 rounded-full overflow-hidden"><div className="h-full bg-accent-blue w-full opacity-60" /></div>)}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="glass-card rounded-[2rem] p-6 flex flex-col justify-center border-t-4 border-accent-red bg-accent-red/5 min-h-[160px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-red rounded-xl flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-dark/30 leading-none mb-1">{t.stats[1].label}</p>
                   <p className="text-xl font-black text-dark">{t.stats[1].value}</p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-dark/40 italic">
                {lang === 'en' ? "Consistently delivering high-quality advisory services." : "تقديم خدمات استشارية عالية الجودة باستمرار."}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="glass-card rounded-[2rem] p-6 border-t-4 border-accent-brown min-h-[160px] relative"
            >
              <div
                className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between"
                dir="ltr"
              >
              <div
                className={cn(
                  'relative z-10 min-w-0 flex-1',
                  lang === 'ar' ? 'text-right' : 'text-left'
                )}
              >
                <p className="text-xs font-bold text-dark/30 mb-1">{t.stats[2].label}</p>
                <p className="text-lg font-black text-dark tracking-tighter leading-tight">{t.stats[2].value}</p>
              </div>

              <div
                className="relative z-10 flex shrink-0 items-center justify-center gap-3 sm:gap-4"
              >
                <div className="flex h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/88 ring-1 ring-accent-brown/14 shadow-sm">
                  <img
                    src={palestineImg}
                    alt={lang === 'en' ? 'Palestine' : 'فلسطين'}
                    className="max-h-full max-w-full h-auto w-auto object-contain p-1.5"
                  />
                </div>
                <div className="flex h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/88 ring-1 ring-accent-brown/14 shadow-sm">
                  <img
                    src={jordanImg}
                    alt={lang === 'en' ? 'Jordan' : 'الأردن'}
                    className="max-h-full max-w-full h-auto w-auto object-contain p-1.5"
                  />
                </div>
              </div>
              </div>
            </motion.div>
        </div>
      </div>

      {/* Social Bar (Modern floating vertical bar) */}
      <motion.div
        initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-20",
          lang === 'ar' ? "right-12" : "left-12"
        )}
      >
        {[
          { icon: <Linkedin className="w-4 h-4" />, href: "#", color: "hover:text-[#0077b5]" },
          { icon: <Twitter className="w-4 h-4" />, href: "#", color: "hover:text-[#1DA1F2]" },
          { icon: <Facebook className="w-4 h-4" />, href: "#", color: "hover:text-[#4267B2]" },
          { icon: <Instagram className="w-4 h-4" />, href: "#", color: "hover:text-[#E1306C]" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            whileHover={{ scale: 1.2, x: lang === 'ar' ? -5 : 5 }}
            className={cn(
              "p-3 glass rounded-xl border border-black/5 text-dark/30 transition-all duration-300 shadow-sm",
              social.color
            )}
          >
            {social.icon}
          </motion.a>
        ))}
        <div className="w-px h-24 bg-gradient-to-b from-dark/10 to-transparent mx-auto mt-2" />
      </motion.div>

      {/* Floating Badge (Refined) */}
     
    </section>
  );
};
