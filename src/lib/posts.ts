const STRAPI_BASE = import.meta.env.VITE_STRAPI_URL ?? 'https://roadwise.blogs.orapexdev.com';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: string;
  description?: string;
  excerpt?: string;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  cover?: StrapiMedia;
  author?: { name: string; email?: string };
  category?: { name: string; slug?: string };
  blocks?: StrapiBlock[];
}

export type StrapiBlock =
  | { __component: 'shared.rich-text'; body: string }
  | { __component: 'shared.quote'; title?: string; body: string }
  | { __component: 'shared.media'; id?: number; file: StrapiMedia }
  | { __component: 'shared.slider'; id?: number; files?: StrapiMedia[] };

/** Prefer populated nested media; never replace a block that already has files with an empty merge. */
function mergeDynamicZoneBlocks(
  blocks: StrapiBlock[],
  mediaBlocks: StrapiBlock[],
  sliderBlocks: StrapiBlock[]
): StrapiBlock[] {
  return blocks.map((block) => {
    if (block.__component === 'shared.media') {
      const bid = (block as { id?: number }).id;
      const repl =
        (bid != null
          ? mediaBlocks.find(
              (b): b is Extract<StrapiBlock, { __component: 'shared.media' }> =>
                b.__component === 'shared.media' && (b as { id?: number }).id === bid
            )
          : undefined) ??
        mediaBlocks.find((b): b is Extract<StrapiBlock, { __component: 'shared.media' }> => b.__component === 'shared.media');
      if (repl?.file?.url) {
        return repl;
      }
      return block;
    }
    if (block.__component === 'shared.slider') {
      const bid = (block as { id?: number }).id;
      const repl =
        (bid != null
          ? sliderBlocks.find(
              (b): b is Extract<StrapiBlock, { __component: 'shared.slider' }> =>
                b.__component === 'shared.slider' && (b as { id?: number }).id === bid
            )
          : undefined) ??
        sliderBlocks.find(
          (b): b is Extract<StrapiBlock, { __component: 'shared.slider' }> => b.__component === 'shared.slider'
        );
      const origLen = block.files?.length ?? 0;
      const replLen = repl?.files?.length ?? 0;
      if (replLen > origLen) {
        return repl;
      }
      if (origLen > 0) {
        return block;
      }
      if (repl) {
        return repl;
      }
      return block;
    }
    return block;
  });
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  status: string;
  publishedAt: string;
  coverImageUrl?: string;
  author?: string;
  categories: string[];
  blocks?: StrapiBlock[];
}

function buildImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE}${url}`;
}

export function strapiArticleToBlogPost(article: StrapiArticle): BlogPost {
  const coverUrl =
    article.cover?.formats?.large?.url ??
    article.cover?.formats?.medium?.url ??
    article.cover?.url;
  return {
    id: article.id,
    documentId: article.documentId,
    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt ?? article.description,
    status: article.status,
    publishedAt: article.publishedAt ?? article.createdAt,
    coverImageUrl: buildImageUrl(coverUrl),
    author: article.author?.name,
    categories: article.category ? [article.category.name] : [],
    blocks: article.blocks,
  };
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function fetchArticles(): Promise<BlogPost[]> {
  const json = await fetchJSON<StrapiResponse<StrapiArticle | StrapiArticle[]>>(
    `${STRAPI_BASE}/api/articles?populate=*`
  );
  if (!json?.data) return [];
  const data = Array.isArray(json.data) ? json.data : [json.data];
  return data.map(strapiArticleToBlogPost);
}

export async function fetchArticleByDocumentId(documentId: string): Promise<BlogPost | null> {
  const [mainJson, mediaJson, sliderJson] = await Promise.all([
    fetchJSON<StrapiResponse<StrapiArticle>>(
      `${STRAPI_BASE}/api/articles/${documentId}?populate=*`
    ),
    fetchJSON<StrapiResponse<StrapiArticle>>(
      `${STRAPI_BASE}/api/articles/${documentId}?populate[blocks][on][shared.media][populate]=*`
    ),
    fetchJSON<StrapiResponse<StrapiArticle>>(
      `${STRAPI_BASE}/api/articles/${documentId}?populate[blocks][on][shared.slider][populate]=*`
    ),
  ]);

  if (!mainJson?.data) return null;
  const article: StrapiArticle = { ...mainJson.data };

  if (article.blocks?.length) {
    const mediaBlocks: StrapiBlock[] = mediaJson?.data?.blocks ?? [];
    const sliderBlocks: StrapiBlock[] = sliderJson?.data?.blocks ?? [];
    article.blocks = mergeDynamicZoneBlocks(article.blocks, mediaBlocks, sliderBlocks);
  }

  return strapiArticleToBlogPost(article);
}

export async function fetchArticleBySlug(slug: string): Promise<BlogPost | null> {
  const json = await fetchJSON<StrapiResponse<StrapiArticle[]>>(
    `${STRAPI_BASE}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  if (!json?.data) return null;
  const articles = Array.isArray(json.data) ? json.data : [json.data];
  return articles[0] ? strapiArticleToBlogPost(articles[0]) : null;
}

export async function fetchArticleById(id: string | number): Promise<BlogPost | null> {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  if (!isNaN(numId)) {
    const json = await fetchJSON<StrapiResponse<StrapiArticle>>(
      `${STRAPI_BASE}/api/articles/${numId}?populate=*`
    );
    if (json?.data) return strapiArticleToBlogPost(json.data);
  }
  return fetchArticleByDocumentId(String(id));
}

export { STRAPI_BASE };
