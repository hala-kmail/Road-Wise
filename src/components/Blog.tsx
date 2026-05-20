import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { fetchArticles, type BlogPost } from '../lib/posts';
import { PostCard } from './ui/PostCard.tsx';
import { cn } from '../lib/utils';

function PostCardSkeleton() {
  return (
    <div className="flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_20px_50px_-36px_rgba(47,159,157,0.18)] animate-pulse sm:min-h-[24rem]">
      <div className="aspect-video shrink-0 bg-gradient-to-br from-primary/8 to-secondary/8" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="h-4 w-24 shrink-0 rounded-full bg-primary/15" />
        <div className="h-12 w-full shrink-0 rounded-xl bg-dark/[0.06]" />
        <div className="min-h-[4.75rem] flex-1 space-y-2 sm:min-h-[5.25rem]">
          <div className="h-3.5 w-full rounded-full bg-dark/[0.07]" />
          <div className="h-3.5 w-[92%] rounded-full bg-dark/[0.07]" />
          <div className="h-3.5 w-4/5 rounded-full bg-dark/[0.07]" />
        </div>
        <div className="mt-auto flex shrink-0 justify-between border-t border-black/[0.06] pt-3">
          <div className="h-3 w-20 rounded-full bg-dark/[0.07]" />
          <div className="h-3 w-16 rounded-full bg-dark/[0.07]" />
        </div>
      </div>
    </div>
  );
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isRtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

  useEffect(() => {
    document.title = 'Blog | Road Wise for Consulting';
    fetchArticles()
      .then(setPosts)
      .catch(() => setError('Failed to load articles. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-deep pb-24 pt-14 text-dark sm:pt-16">
      <div className="hero-backdrop-mesh pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden />
      <div className="hero-fine-grid pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />
      <div
        className="pointer-events-none absolute -start-[12%] top-0 h-[min(28rem,70vw)] w-[min(28rem,70vw)] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 68%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute end-0 bottom-[10%] h-[min(22rem,55vw)] w-[min(22rem,55vw)] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent-yellow) 14%, transparent) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-4 py-2 text-meta font-black uppercase tracking-[0.2em] text-dark/45 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            <ArrowLeft className={cn('h-3.5 w-3.5 shrink-0', isRtl && 'rotate-180')} aria-hidden />
            {isRtl ? 'الرئيسية' : 'Home'}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center lg:mb-16 lg:text-start"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/85 px-4 py-1.5 text-meta font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent-yellow" aria-hidden />
            {isRtl ? 'رؤى وتحديثات' : 'Insights & updates'}
          </span>
          <h1 className="text-display font-black tracking-tight text-dark">
            <span className="bg-gradient-to-br from-dark via-dark to-primary bg-clip-text text-transparent">
              {isRtl ? 'المدونة' : 'Our blog'}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base font-medium leading-relaxed text-dark/58 sm:text-lg lg:mx-0">
            {isRtl
              ? 'مقالات حول الاستشارات، التطوير المؤسسي، وبناء القدرات — من فريق رودوايز.'
              : 'Articles on consulting, institutional development, and capacity building — from the Road Wise team.'}
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-primary via-primary-light to-accent-yellow lg:mx-0 lg:origin-start"
            aria-hidden
          />
        </motion.div>

        {error ? (
          <div className="rounded-2xl border border-black/[0.07] bg-white/90 px-6 py-16 text-center shadow-[0_24px_60px_-40px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <p className="text-base font-medium text-dark/55">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-flex text-sm font-black uppercase tracking-widest text-primary hover:text-primary-light"
            >
              {isRtl ? 'العودة للرئيسية' : 'Back home'}
            </Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-[1.75rem] border border-black/[0.07] bg-white/95 px-8 py-16 text-center shadow-[0_28px_70px_-44px_rgba(47,159,157,0.2)] backdrop-blur-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/12 to-accent-yellow/15 ring-1 ring-primary/15">
              <BookOpen className="h-7 w-7 text-primary" aria-hidden />
            </div>
            <p className="text-lg font-black text-dark">{isRtl ? 'لا توجد مقالات بعد' : 'No posts yet'}</p>
            <p className="text-sm font-medium leading-relaxed text-dark/45">
              {isRtl
                ? 'ستظهر المقالات هنا بعد نشرها من لوحة Strapi.'
                : 'Articles will show here once they are published from Strapi.'}
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-meta font-black uppercase tracking-widest text-white shadow-md shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isRtl ? 'الرئيسية' : 'Home'}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
