interface ArticleSchemaOptions {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export function buildArticleSchema(opts: ArticleSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    ...(opts.description && { description: opts.description }),
    url: opts.url,
    ...(opts.image && { image: opts.image }),
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    dateModified: opts.dateModified ?? opts.datePublished,
    ...(opts.authorName && { author: { '@type': 'Person', name: opts.authorName } }),
  };
}
