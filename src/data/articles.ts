export interface ArticleInfo {
  slug: string
  title: string
  date: string
  summary: string
  author?: string
  attention_needed?: boolean
  category?: string
  type?: 'article' | 'video'
  link?: string
}

export const categories: string[] = [
  "以佛煉心",
  "以儒應世",
  "以道護體",
  "隨筆雜感"
]

export const tags: string[] = [
  "修行體悟",
  "日常功課",
  "丹道心法",
  "師門記憶",
  "隨筆雜感",
  "其他",
]

export const articles: ArticleInfo[] = [
  {
    slug: '緣起',
    title: '緣起',
    author: '李雅卿',
    date: '2026.04.21',
    summary: '記錄我從新聞工作者走入全真修行的因緣、師承與三十餘年未輟的體悟，並以數位方式傳承全真的初心。',
    attention_needed: true,
  },
  {
    slug: '芙蓉說',
    title: '芙蓉說',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2012.10.01',
    summary: '芙蓉風華，一日三幻化——晨迎朝露，絳極離枝，功成身退，乃合天道。',
  },
  {
    slug: '走路',
    title: '走路',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2012.05.06',
    summary: '在山上，要走路。走山路，是不說話的。',
  },
  {
    slug: '經脈通震法',
    title: '經脈通震法',
    category: '以道護體',
    date: '2026.04.23',
    summary: '道家幫助初入門者震通全身經絡的日常保健方式。無甚禁忌，唯飯後不宜。',
    type: 'video',
    link: 'https://www.youtube.com/watch?v=XE5hgnDv7_8',
  },
]

export function getArticleBySlug(slug: string): ArticleInfo | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: string): ArticleInfo[] {
  return articles.filter((article) => article.category === category)
}