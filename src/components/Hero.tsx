import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Sprout } from 'lucide-react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';
import { fetchArticles } from '../lib/posts';
import palestineImg from '../assets/palestine.svg';
import jordanImg from '../assets/jordan.png';

interface HeroProps {
  lang: 'en' | 'ar';
}

type HeroCarouselItem = {
  title: string;
  category: string;
  date: string;
  image: string;
  href?: string;
};

const HERO_COVER_FALLBACK =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';

function formatHeroPublishedAt(iso: string, lang: 'en' | 'ar'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}

function buildFallbackCarousel(lang: 'en' | 'ar'): HeroCarouselItem[] {
  return [
    {
      title: lang === 'en' ? 'New Partnership in Jordan' : 'شراكة جديدة في الأردن',
      category: lang === 'en' ? 'News' : 'أخبار',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: lang === 'en' ? 'Strategic Infrastructure Project' : 'مشروع بنية تحتية استراتيجي',
      category: lang === 'en' ? 'Project' : 'مشروع',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: lang === 'en' ? 'Consulting Excellence Award' : 'جائزة التميز في الاستشارات',
      category: lang === 'en' ? 'Award' : 'جائزة',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1523240715639-93f8fa096ee2?auto=format&fit=crop&q=80&w=800',
    },
  ];
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = content[lang].hero;
  const containerRef = useRef<HTMLDivElement>(null);

  const words = t.title.split(' ');

  const fallbackCarousel = useMemo(() => buildFallbackCarousel(lang), [lang]);

  const [carouselItems, setCarouselItems] = useState<HeroCarouselItem[]>(fallbackCarousel);

  useEffect(() => {
    setCarouselItems(fallbackCarousel);
  }, [fallbackCarousel]);

  useEffect(() => {
    let cancelled = false;
    fetchArticles().then((posts) => {
      if (cancelled) {
        return;
      }
      if (!posts.length) {
        return;
      }
      const sorted = [...posts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      const fromApi: HeroCarouselItem[] = sorted.slice(0, 6).map((p) => ({
        title: p.title,
        category: p.categories[0] ?? (lang === 'en' ? 'Blog' : 'المدونة'),
        date: formatHeroPublishedAt(p.publishedAt, lang),
        image: p.coverImageUrl ?? HERO_COVER_FALLBACK,
        href: `/blog/${p.documentId}`,
      }));
      setCarouselItems(fromApi);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide((prev) => {
      if (carouselItems.length === 0) {
        return 0;
      }
      return prev % carouselItems.length;
    });
  }, [carouselItems]);

  useEffect(() => {
    if (carouselItems.length === 0) {
      return;
    }
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const slideTotal = String(carouselItems.length).padStart(2, '0');
  const slideCurrent = String(activeSlide + 1).padStart(2, '0');

  const socials = [
    { icon: <Linkedin className="h-4 w-4" />, href: '#', color: 'hover:text-[#0077b5]', label: lang === 'en' ? 'LinkedIn' : 'لينكدإن' },
    { icon: <Twitter className="h-4 w-4" />, href: '#', color: 'hover:text-[#1DA1F2]', label: lang === 'en' ? 'Twitter' : 'تويتر' },
    { icon: <Facebook className="h-4 w-4" />, href: '#', color: 'hover:text-[#4267B2]', label: lang === 'en' ? 'Facebook' : 'فيسبوك' },
    { icon: <Instagram className="h-4 w-4" />, href: '#', color: 'hover:text-[#E1306C]', label: lang === 'en' ? 'Instagram' : 'إنستغرام' },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-bg-deep px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% -10%, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 58%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 sm:space-y-10">
        {/* واحدة: نص + كاروسيل */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-white shadow-[0_28px_80px_-48px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.8)_inset] sm:rounded-[1.85rem] lg:rounded-[2rem]"
        >
          <div className="grid min-h-[min(100vh-10rem,720px)] grid-cols-1 lg:grid-cols-[1fr_minmax(300px,40%)] lg:min-h-[min(88vh,640px)]">
            {/* عمود النص */}
            <div className="flex flex-col justify-center border-black/[0.06] p-8 sm:p-10 lg:border-e lg:p-12 xl:p-14">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1.5 text-label font-bold uppercase tracking-[0.22em] text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/35 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {lang === 'en' ? 'Consulting Excellence' : 'تميز استشاري'}
                </span>
              </motion.div>

              <div className="mb-8 sm:mb-10">
                <h1 className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-3.5">
                  {words.map((word, idx) => (
                    <span key={idx} className="overflow-hidden py-0.5">
                      <motion.span
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.12 + idx * 0.06,
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="block text-display font-black leading-[1.05] tracking-tight text-dark"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <div className="mt-6 h-px max-w-md bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" aria-hidden />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="mb-10 max-w-xl text-pretty text-base leading-relaxed text-dark/60 sm:text-lg"
              >
                {t.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.65 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-label font-black uppercase tracking-[0.2em] text-white shadow-md shadow-primary/25 transition-transform hover:scale-[1.02] hover:bg-primary-light active:scale-[0.98] sm:px-10 sm:py-4"
                  >
                    {t.cta1}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-dark/10 bg-white px-7 py-3.5 text-label font-black uppercase tracking-[0.18em] text-dark/70 transition-colors hover:border-primary/30 hover:text-dark sm:px-9 sm:py-4"
                  >
                    {t.cta2}
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow ring-2 ring-accent-yellow/25" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-6">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.06] bg-bg-deep/40 text-dark/35 transition-colors hover:border-primary/25 hover:bg-white hover:text-dark',
                        s.color
                      )}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* كاروسيل */}
            <div className="group relative flex min-h-[280px] flex-col bg-zinc-950 lg:min-h-0">
              <div className="absolute start-5 top-5 z-20 sm:start-6 sm:top-6">
                <span className="rounded-md bg-black/45 px-2 py-1 font-mono text-label font-medium tabular-nums text-white/80 backdrop-blur-sm">
                  {slideCurrent}/{slideTotal}
                </span>
              </div>

              <span className="sr-only" aria-live="polite">
                {carouselItems[activeSlide]?.title}
              </span>

              <div className="relative flex-1">
                {carouselItems.map((item, idx) => (
                  <motion.div
                    key={item.href ?? `fallback-${idx}`}
                    initial={false}
                    animate={{ opacity: activeSlide === idx ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                    aria-hidden={activeSlide !== idx}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="absolute inset-x-0 top-0 bottom-[5.25rem] z-[1] block cursor-pointer overflow-hidden outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                        aria-label={
                          lang === 'en' ? `Open article: ${item.title}` : `فتح المقال: ${item.title}`
                        }
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-85"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="relative z-[2] flex h-full flex-col justify-end px-6 pb-2 sm:px-8">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-white/15 px-2.5 py-1 text-label-sm font-black uppercase tracking-wider text-white backdrop-blur-md">
                              {item.category}
                            </span>
                            <span className="text-label font-semibold tabular-nums text-white/50">{item.date}</span>
                          </div>
                          <h2 className="max-w-lg text-pretty text-xl font-black leading-snug text-white transition-colors group-hover:text-primary-light sm:text-2xl">
                            {item.title}
                          </h2>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-85"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute inset-x-0 bottom-[5.25rem] z-[1] px-6 sm:px-8">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-white/15 px-2.5 py-1 text-label-sm font-black uppercase tracking-wider text-white backdrop-blur-md">
                              {item.category}
                            </span>
                            <span className="text-label font-semibold tabular-nums text-white/50">{item.date}</span>
                          </div>
                          <h2 className="max-w-lg text-pretty text-xl font-black leading-snug text-white sm:text-2xl">
                            {item.title}
                          </h2>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-8 pt-1 sm:px-8 sm:pb-10">
                      <div
                        className="flex gap-2"
                        role="tablist"
                        aria-label={lang === 'en' ? 'Highlight slides' : 'شرائح المميزات'}
                      >
                        {carouselItems.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={activeSlide === i}
                            onClick={() => {
                              setActiveSlide(i);
                            }}
                            className={cn(
                              'h-1.5 min-h-[6px] rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                              activeSlide === i ? 'w-10 bg-primary' : 'w-2 bg-white/25 hover:bg-white/40'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* إحصائيات — بدون بطاقات؛ فواصل رمادية */}
        <div className="flex flex-col divide-y divide-dark/12 md:flex-row md:divide-x md:divide-y-0 md:divide-dark/12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            className="px-6 py-8 md:flex-1 md:px-8 md:py-10 lg:px-10"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-label font-black uppercase tracking-widest text-dark/35">
                {lang === 'en' ? 'Impact' : 'الأثر'}
              </span>
              <span className="rounded-md bg-accent-blue/10 px-2 py-0.5 text-label-sm font-black text-accent-blue">
                {lang === 'en' ? 'VERIFIED' : 'موثّق'}
              </span>
            </div>
            <p className="mb-1 text-stat font-black tracking-tighter text-dark">
              {t.stats[0].prefix}
              {t.stats[0].value}
            </p>
            <p className="text-meta font-bold text-dark/45">{t.stats[0].label}</p>
            <div className="mt-5 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-accent-blue/10">
                  <div className="h-full w-full bg-accent-blue/50 opacity-70" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.55 }}
            className="px-6 py-8 md:flex-1 md:px-8 md:py-10 lg:px-10"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-red text-white">
                <Sprout className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-label font-black uppercase leading-none text-dark/35">{t.stats[1].label}</p>
                <p className="mt-1 text-xl font-black tracking-tight text-dark">{t.stats[1].value}</p>
              </div>
            </div>
            <p className="text-meta font-medium italic leading-relaxed text-dark/45">
              {lang === 'en'
                ? 'Consistently delivering high-quality advisory services.'
                : 'تقديم خدمات استشارية عالية الجودة باستمرار.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.55 }}
            className="px-6 py-8 md:flex-1 md:px-8 md:py-10 lg:px-10"
          >
            <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between" dir="ltr">
              <div className={cn('min-w-0 flex-1', lang === 'ar' ? 'text-right' : 'text-left')}>
                <p className="mb-1 text-xs font-bold text-dark/35">{t.stats[2].label}</p>
                <p className="text-lg font-black leading-tight tracking-tighter text-dark">{t.stats[2].value}</p>
              </div>
              <div className="flex shrink-0 justify-center gap-3 sm:gap-4">
                <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center sm:h-20 sm:w-20">
                  <img
                    src={palestineImg}
                    alt={lang === 'en' ? 'Palestine' : 'فلسطين'}
                    className="max-h-full max-w-full object-contain p-1.5"
                  />
                </div>
                <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center sm:h-20 sm:w-20">
                  <img
                    src={jordanImg}
                    alt={lang === 'en' ? 'Jordan' : 'الأردن'}
                    className="max-h-full max-w-full object-contain p-1.5"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
