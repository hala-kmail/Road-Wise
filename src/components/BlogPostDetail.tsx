import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchArticleByDocumentId, STRAPI_BASE, type BlogPost, type StrapiBlock, type StrapiMedia } from '../lib/posts';
import { buildArticleSchema } from '../lib/schema';
import { JsonLd } from './seo/JsonLd.tsx';
import { cn } from '../lib/utils';

function resolveImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE}${url}`;
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function SliderBlockCarousel({ files }: { files: StrapiMedia[] }) {
  const total = files.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (total <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, 5500);
    return () => window.clearInterval(id);
  }, [total]);

  const go = (delta: number) => {
    setActive((i) => (i + delta + total) % total);
  };

  if (total === 0) {
    return null;
  }

  return (
    <figure className="my-10 -mx-1 sm:mx-0">
      <div
        className="group/slider relative overflow-hidden rounded-[1.35rem] border border-black/[0.07] bg-gradient-to-br from-white via-bg-deep/50 to-primary/[0.07] shadow-[0_28px_70px_-40px_rgba(47,159,157,0.32),inset_0_1px_0_rgba(255,255,255,0.92)]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Image gallery"
      >
        <div className="relative aspect-[16/10] max-h-[min(68vh,520px)] w-full bg-zinc-900/[0.04]">
          {files.map((file, i) => (
            <motion.div
              key={`${file.url}-${i}`}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 1.035,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
              aria-hidden={active !== i}
            >
              <img
                src={resolveImageUrl(file.url)}
                alt={file.alternativeText ?? `Gallery image ${i + 1} of ${total}`}
                className="max-h-full max-w-full rounded-xl object-contain shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06]"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </motion.div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                go(-1);
              }}
              className={cn(
                'absolute inset-y-0 start-2 z-10 my-auto flex h-11 w-11 items-center justify-center rounded-full',
                'border border-black/8 bg-white/95 text-dark shadow-lg backdrop-blur-sm transition-all',
                'hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => {
                go(1);
              }}
              className={cn(
                'absolute inset-y-0 end-2 z-10 my-auto flex h-11 w-11 items-center justify-center rounded-full',
                'border border-black/8 bg-white/95 text-dark shadow-lg backdrop-blur-sm transition-all',
                'hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>

            <div
              className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 bg-gradient-to-t from-bg-deep from-25% via-bg-deep/75 to-transparent pb-3.5 pt-12"
              role="tablist"
              aria-label="Slide indicators"
            >
              {files.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => {
                    setActive(i);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    active === i ? 'w-9 bg-primary shadow-sm shadow-primary/30' : 'w-2 bg-dark/20 hover:bg-dark/40'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </figure>
  );
}

function BlockRenderer({ block }: { block: StrapiBlock }) {
  switch (block.__component) {
    case 'shared.rich-text':
      return (
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: block.body }}
        />
      );

    case 'shared.quote':
      return (
        <blockquote className="relative my-8 pl-6 border-l-4 border-primary py-1">
          {block.title && (
            <p className="text-label font-black text-primary uppercase tracking-widest mb-2">
              {block.title}
            </p>
          )}
          <p className="text-xl sm:text-2xl font-medium text-dark/75 leading-relaxed italic">
            {block.body}
          </p>
        </blockquote>
      );

    case 'shared.media':
      if (!block.file?.url) return null;
      return (
        <figure className="my-8 rounded-2xl overflow-hidden">
          <img
            src={resolveImageUrl(block.file.url)}
            alt={block.file.alternativeText ?? ''}
            className="w-full object-cover"
            width={block.file.width ?? 800}
            height={block.file.height ?? 450}
            loading="lazy"
          />
        </figure>
      );

    case 'shared.slider':
      if (!block.files?.length) {
        return null;
      }
      return <SliderBlockCarousel files={block.files} />;

    default:
      return null;
  }
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-deep pt-14 pb-20 px-4 sm:pt-16">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="aspect-video bg-dark/8 rounded-2xl mb-10" />
        <div className="h-5 bg-dark/8 rounded-full w-20 mb-5" />
        <div className="h-10 bg-dark/8 rounded-full w-full mb-3" />
        <div className="h-10 bg-dark/8 rounded-full w-3/4 mb-8" />
        <div className="flex gap-4 mb-10 pb-8 border-b border-black/6">
          <div className="h-4 bg-dark/8 rounded-full w-28" />
          <div className="h-4 bg-dark/8 rounded-full w-24" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-dark/8 rounded-full"
              style={{ width: `${95 - (i % 4) * 8}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogPostDetail() {
  const { documentId } = useParams<{ documentId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!documentId) {
      return;
    }
    setLoading(true);
    setNotFound(false);
    fetchArticleByDocumentId(documentId)
      .then((p) => {
        if (p) {
          setPost(p);
          document.title = `${p.title} | Road Wise for Consulting`;
        } else {
          setNotFound(true);
          document.title = 'Article Not Found | Road Wise for Consulting';
        }
      })
      .finally(() => setLoading(false));
  }, [documentId]);

  if (loading) return <DetailSkeleton />;

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-bg-deep pt-20 pb-20 flex flex-col items-center justify-center gap-5 sm:pt-24">
        <p className="text-dark/48 text-2xl font-black tracking-tight">Article not found</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-black text-primary/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const siteUrl = import.meta.env.VITE_SITE_URL ?? '';
  const schema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.documentId}`,
    image: post.coverImageUrl,
    datePublished: post.publishedAt,
    authorName: post.author,
  });

  return (
    <>
      <JsonLd data={schema} />

      <article className="min-h-screen bg-bg-deep">
        {/* Cover image — full bleed */}
        {post.coverImageUrl && (
          <div className="w-full h-[45vh] sm:h-[55vh] overflow-hidden relative">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              width={1400}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/10 to-transparent" />
          </div>
        )}

        <div className={`max-w-3xl mx-auto px-4 sm:px-6 pb-24 ${post.coverImageUrl ? '-mt-16 relative' : 'pt-14 sm:pt-16'}`}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-meta font-black uppercase tracking-widest text-dark/42 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Blog
            </Link>
          </motion.div>

          {/* Category badges */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-label font-black uppercase tracking-wider"
                >
                  <Tag className="w-3 h-3" />
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-heading-section font-black text-dark tracking-tighter leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-wrap items-center gap-5 mb-10 pb-8 border-b border-black/8"
          >
            {post.author && (
              <span className="flex items-center gap-2.5 text-sm text-dark/58 font-medium">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-white" />
                </span>
                {post.author}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-2 text-sm text-dark/48">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </motion.div>

          {/* Excerpt / lead */}
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-dark/68 leading-relaxed mb-10 font-medium">
              {post.excerpt}
            </p>
          )}

          {/* Blocks or fallback content */}
          {post.blocks && post.blocks.length > 0 ? (
            <div className="space-y-2">
              {post.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>
          ) : post.content ? (
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : null}
        </div>
      </article>
    </>
  );
}
