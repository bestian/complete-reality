export interface ArticleInfo {
  slug: string
  title: string
  date: string
  summary: string
}

export const articles: ArticleInfo[] = [
  {
    slug: '芙蓉說',
    title: '芙蓉說',
    date: '2012.10.01',
    summary: '芙蓉風華，一日三幻化——晨迎朝露，絳極離枝，功成身退，乃合天道。',
  },
  {
    slug: '走路',
    title: '走路',
    date: '2012.05.06',
    summary: '在山上，要走路。走山路，是不說話的。',
  },
]

export function getArticleBySlug(slug: string): ArticleInfo | undefined {
  return articles.find((article) => article.slug === slug)
}
