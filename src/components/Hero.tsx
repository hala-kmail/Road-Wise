import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Facebook, Instagram, Sprout, Sparkles } from 'lucide-react';
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
  const carouselItems = useMemo(
    () => [
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
    ],
    [lang]
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const slideTotal = String(carouselItems.length).padStart(2, '0');
  const slideCurrent = String(activeSlide + 1).padStart(2, '0');

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-bg-deep px-4 sm:px-6 pt-28 sm:pt-32 pb-20 sm:pb-28"
    >
      <div className="absolute inset-0 z-0 hero-backdrop-mesh opacity-[0.92] pointer-events-none" />
      <div className="absolute inset-0 z-0 hero-fine-grid opacity-[0.65] pointer-events-none" />
      <div className="absolute inset-0 z-0 hero-noise pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/45 via-transparent to-bg-deep pointer-events-none max-h-[42%]" />

      {/* Slow aurora + mouse parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hero-aurora-blob absolute -top-32 -start-[20%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-primary/12 blur-[100px]" />
        <div className="hero-aurora-blob--2 absolute top-1/4 -end-[15%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-secondary/10 blur-[90px]" />
        <div className="hero-aurora-blob--3 absolute -bottom-24 start-1/3 h-[min(60vw,440px)] w-[min(60vw,440px)] rounded-full bg-accent-yellow/9 blur-[88px]" />
        <motion.div
          animate={{ x: mousePos.x * 1, y: mousePos.y * 1 }}
          className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/6 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ x: mousePos.x * -0.8, y: mousePos.y * -0.8 }}
          className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-secondary/7 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ x: mousePos.x * 0.6, y: mousePos.y * 0.5 }}
          className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-accent-yellow/8 rounded-full blur-[140px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch">
          
          {/* MAIN HERO — modern glass stack */}
          <div className="lg:col-span-8 relative group/hero">
            <div
              className="absolute -inset-[1px] rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-white/55 to-accent-yellow/30 opacity-80 blur-[1px] transition-opacity duration-700 group-hover/hero:opacity-100"
              aria-hidden
            />
            <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-[1px] bg-gradient-to-br from-primary/30 via-white/80 to-accent-yellow/25 shadow-[0_32px_100px_-36px_rgba(47,159,157,0.22),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
              <div className="hero-glass-inset flex flex-col justify-center rounded-[1.72rem] sm:rounded-[2.2rem] md:rounded-[2.45rem] border border-white/60 bg-white/75 p-8 sm:p-12 md:p-14 lg:p-16 backdrop-blur-2xl relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_0%,rgba(47,159,157,0.07),transparent_50%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(248,192,45,0.06),transparent_55%)]" />
                <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

                <div className="absolute -top-24 -end-24 h-56 w-56 rounded-full bg-gradient-to-bl from-accent-yellow/20 to-primary/10 blur-3xl group-hover/hero:scale-110 transition-transform duration-1000 ease-out" />
                <div className="hidden sm:block absolute bottom-10 start-10 h-16 w-16 rounded-2xl border border-primary/12 bg-primary/[0.03] backdrop-blur-sm" />

                <motion.div
                  initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10 mb-8 sm:mb-10 inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-white/65 px-4 py-2 shadow-[0_8px_32px_-12px_rgba(47,159,157,0.2)] backdrop-blur-md"
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  <div className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/35 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
                    {lang === 'en' ? "Consulting Excellence" : "تميز استشاري"}
                  </span>
                </motion.div>

                <div className="relative z-10 mb-8 sm:mb-10">
                  <div className="flex max-w-[95%] flex-wrap gap-x-3 gap-y-1 sm:gap-x-4">
                    {words.map((word, idx) => (
                      <div key={idx} className="overflow-hidden py-0.5">
                        <motion.span
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{
                            delay: idx * 0.07,
                            duration: 0.68,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={cn(
                            'block text-balance text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-8xl font-black tracking-[-0.04em] leading-[1.02]',
                            idx % 2 === 0
                              ? 'text-dark'
                              : 'bg-gradient-to-br from-primary via-primary-light to-secondary bg-clip-text text-transparent'
                          )}
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
                  transition={{ delay: 0.55, duration: 0.9 }}
                  className="relative z-10 mb-8 max-w-2xl border-s-[3px] border-primary/30 ps-5 text-pretty text-base font-medium leading-relaxed text-dark/55 sm:mb-12 sm:text-lg"
                >
                  {t.tagline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.9 }}
                  className="relative z-10 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  <a
                    href="#services"
                    className="hero-cta-shine group/cta relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-primary-light to-primary px-9 py-4 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-[0_12px_40px_-8px_rgba(47,159,157,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset] ring-1 ring-white/25 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_48px_-10px_rgba(47,159,157,0.5)] active:scale-[0.98] sm:px-11 sm:py-5"
                  >
                    <span className="relative z-10">{t.cta1}</span>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100" />
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 rounded-full border border-dark/[0.08] bg-white/40 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-dark/75 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:bg-white/70 hover:text-dark hover:shadow-md sm:px-10 sm:py-5"
                  >
                    {t.cta2}
                    <span className="h-2 w-2 rounded-full bg-accent-yellow shadow-[0_0_0_4px_rgba(248,192,45,0.2)] transition-transform group-hover:scale-125" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* CAROUSEL — editorial panel */}
          <div className="lg:col-span-4 relative group min-h-[320px] lg:min-h-[min(74vh,560px)]">
            <div className="absolute -inset-[1px] rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] bg-gradient-to-b from-white/40 to-primary/20 opacity-70 blur-[1px] transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" aria-hidden />
            <motion.div 
               initial={{ opacity: 0, y: 16 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.45, type: 'spring', stiffness: 100, damping: 24 }}
               className="relative flex h-full min-h-[inherit] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] border border-white/15 bg-zinc-950 shadow-[0_32px_80px_-28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-black/40 backdrop-blur-sm"
               aria-roledescription="carousel"
            >
              <div className="relative z-20 flex items-center justify-between gap-3 border-b border-white/[0.08] bg-black/25 px-5 py-3.5 backdrop-blur-xl sm:px-6">
                <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/45">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/60" aria-hidden />
                  {lang === 'en' ? 'Spotlight' : 'مختارات'}
                </span>
                <span className="font-mono text-[11px] font-medium tabular-nums tracking-tight text-white/55">
                  <span className="text-white">{slideCurrent}</span>
                  <span className="text-white/35"> / {slideTotal}</span>
                </span>
              </div>

              <span className="sr-only" aria-live="polite">
                {carouselItems[activeSlide]?.title}
              </span>
              <div className="relative min-h-[260px] flex-1 sm:min-h-[280px] lg:min-h-0">
              {carouselItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSlide === idx ? 1 : 0 }}
                  transition={{ duration: 0.85 }}
                  className="absolute inset-0"
                  aria-hidden={activeSlide !== idx}
                >
                  <img 
                    src={item.image} 
                    alt=""
                    className="h-full w-full scale-105 object-cover opacity-55 grayscale-[0.15] transition-all duration-[2200ms] group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/20" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-6 pb-7 pt-28 sm:px-8 sm:pb-8 sm:pt-32">
                     <div className="mb-3 flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full border border-white/10 bg-primary/90 px-3.5 py-1.5 text-[8px] font-black uppercase tracking-wider text-white shadow-lg shadow-primary/25 backdrop-blur-sm">{item.category}</span>
                        <span className="text-[10px] font-semibold tabular-nums text-white/45">{item.date}</span>
                     </div>
                     <h3 className="mb-5 text-pretty text-xl font-black leading-[1.15] text-white sm:text-2xl">{item.title}</h3>
                     <div className="flex items-center gap-2" role="tablist" aria-label={lang === 'en' ? 'Highlight slides' : 'شرائح المميزات'}>
                        {carouselItems.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={activeSlide === i}
                            onClick={() => setActiveSlide(i)}
                            className={cn(
                              "min-h-[6px] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                              activeSlide === i
                                ? "h-2 w-10 bg-gradient-to-r from-primary to-primary-light shadow-[0_0_16px_rgba(47,159,157,0.5)]"
                                : "h-1.5 w-2 bg-white/20 hover:bg-white/35"
                            )}
                          />
                        ))}
                     </div>
                  </div>
                </motion.div>
              ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM STATS ROW */}
        <div className="grid grid-cols-1 gap-5 pt-1 md:grid-cols-3 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative flex min-h-[172px] flex-col justify-between overflow-hidden rounded-2xl border border-white/50 bg-white/55 p-6 shadow-[0_20px_50px_-28px_rgba(47,159,157,0.12)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-accent-blue before:to-primary-light sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute -end-6 -top-8 h-24 w-24 rounded-full bg-accent-blue/[0.07] blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-dark/30">{lang === 'en' ? 'Impact' : 'الأثر'}</span>
                  <div className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-[8px] font-black rounded-lg">{lang === 'en' ? 'VERIFIED' : 'موثّق'}</div>
                </div>
                <div className="text-4xl font-black text-dark tracking-tighter mb-1">{t.stats[0].prefix}{t.stats[0].value}</div>
                <p className="text-xs font-bold text-dark/40">{t.stats[0].label}</p>
              </div>
              <div className="relative z-10 flex gap-2 mt-4">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-accent-blue/10 rounded-full overflow-hidden"><div className="h-full bg-accent-blue w-full opacity-60" /></div>)}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="relative flex min-h-[172px] flex-col justify-center overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-6 shadow-[0_20px_50px_-28px_rgba(149,13,22,0.08)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-accent-red before:to-accent-yellow/90 sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute -start-4 bottom-0 h-20 w-20 rounded-full bg-accent-red/10 blur-2xl" />
              <div className="relative z-10 flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-accent-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent-red/20 ring-1 ring-white/10">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-dark/30 leading-none mb-1">{t.stats[1].label}</p>
                   <p className="text-xl font-black text-dark tracking-tight">{t.stats[1].value}</p>
                </div>
              </div>
              <p className="relative z-10 text-[10px] font-bold text-dark/40 italic leading-relaxed">
                {lang === 'en' ? "Consistently delivering high-quality advisory services." : "تقديم خدمات استشارية عالية الجودة باستمرار."}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative min-h-[172px] overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-6 shadow-[0_20px_50px_-28px_rgba(117,62,4,0.1)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-accent-brown before:to-primary/80 sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-brown/[0.03] to-transparent" />
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
                <div className="flex h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-white/60 bg-white/90 shadow-inner shadow-black/5 ring-1 ring-black/[0.04]">
                  <img
                    src={palestineImg}
                    alt={lang === 'en' ? 'Palestine' : 'فلسطين'}
                    className="max-h-full max-w-full h-auto w-auto object-contain p-1.5"
                  />
                </div>
                <div className="flex h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-white/60 bg-white/90 shadow-inner shadow-black/5 ring-1 ring-black/[0.04]">
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
        initial={{ opacity: 0, x: lang === 'ar' ? 24 : -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.15, duration: 0.85 }}
        className={cn(
          "absolute top-1/2 z-20 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-center xl:gap-3",
          lang === 'ar' ? "right-10" : "left-10"
        )}
      >
        <div className="flex flex-col gap-2 rounded-full border border-white/55 bg-white/45 p-2 shadow-[0_16px_40px_-20px_rgba(47,159,157,0.2)] backdrop-blur-xl ring-1 ring-black/[0.03]">
        {[
          { icon: <Linkedin className="h-4 w-4" />, href: "#", color: "hover:text-[#0077b5]", label: lang === 'en' ? 'LinkedIn' : 'لينكدإن' },
          { icon: <Twitter className="h-4 w-4" />, href: "#", color: "hover:text-[#1DA1F2]", label: lang === 'en' ? 'Twitter' : 'تويتر' },
          { icon: <Facebook className="h-4 w-4" />, href: "#", color: "hover:text-[#4267B2]", label: lang === 'en' ? 'Facebook' : 'فيسبوك' },
          { icon: <Instagram className="h-4 w-4" />, href: "#", color: "hover:text-[#E1306C]", label: lang === 'en' ? 'Instagram' : 'إنستغرام' },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            aria-label={social.label}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-dark/35 transition-all duration-300 hover:border-dark/[0.06] hover:bg-white/80 hover:shadow-sm",
              social.color
            )}
          >
            {social.icon}
          </motion.a>
        ))}
        </div>
        <div className="mx-auto mt-1 h-16 w-px bg-gradient-to-b from-primary/20 via-dark/10 to-transparent" />
      </motion.div>

    </section>
  );
};
