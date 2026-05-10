import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import type { BlogPost } from '../../lib/posts';
import { cn } from '../../lib/utils';

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to={`/blog/${post.documentId}`}
      className={cn(
        'group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.06]',
        'bg-white shadow-[0_20px_56px_-38px_rgba(47,159,157,0.22),0_0_0_1px_rgba(255,255,255,0.9)_inset]',
        'transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_28px_70px_-36px_rgba(47,159,157,0.28)]'
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-video shrink-0 overflow-hidden bg-gradient-to-br from-primary/[0.12] to-secondary/[0.08]">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            width={640}
            height={360}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none text-5xl font-black tracking-tighter text-primary/25">RW</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary opacity-0 shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      {/* Content — flex-1 + min-h على المقتطف يوحّد ارتفاع البطاقات في الصف */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 bg-gradient-to-b from-white to-bg-deep/35 p-5 sm:p-6">
        {/* Category badges */}
        {post.categories.length > 0 && (
          <div className="flex shrink-0 flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="line-clamp-2 shrink-0 text-lg font-black leading-snug text-dark transition-colors duration-200 group-hover:text-primary sm:text-xl">
          {post.title}
        </h3>

        {/* Excerpt — ارتفاع محجوز لثلاث أسطر حتى بدون نص */}
        <div className="min-h-[4.75rem] flex-1 sm:min-h-[5.25rem]">
          <p className="line-clamp-3 text-sm leading-relaxed text-dark/50">
            {post.excerpt?.trim() ? post.excerpt : '\u00a0'}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex shrink-0 items-center gap-3 border-t border-black/[0.07] pt-3">
          {post.author && (
            <span className="flex items-center gap-1.5 text-xs text-dark/35 font-medium min-w-0 flex-1">
              <User className="w-3.5 h-3.5 shrink-0 text-dark/25" />
              <span className="truncate">{post.author}</span>
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5 text-xs text-dark/35 font-medium shrink-0 ml-auto">
              <Calendar className="w-3.5 h-3.5 text-dark/25" />
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
