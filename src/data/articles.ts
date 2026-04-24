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
    slug: '天堂．山',
    title: '天堂．山',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2012.01.25',
    summary: '泰雅小孩說：天堂是一座美麗的山，所有愛的人都在身邊，還有吃不完的食物。退休後山居，發現自己活在天堂裡。',
  },
  {
    slug: '扶桑',
    title: '扶桑',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2013.02.05',
    summary: '籬邊不請自來一株扶桑，怎麼剪、怎麼插，都頑強存活；原以為難種，卻處處生意盎然，讓人見識到生命的韌性。',
  },
  {
    slug: '抗蚊記',
    title: '抗蚊記',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2012.06.26',
    summary: '嚴重過敏體質，試遍蚊香、防蚊液、香茅油皆失敗，最終靠魚腥草禁衛軍與皂絲妙方抗蚊，才在山中安居。',
  },
  {
    slug: '抗鼠記',
    title: '抗鼠記',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2012.06.26',
    summary: '老鼠不但偷喝果汁、咬破雜糧筒，放生後還夜半回來報仇。一場曠日廢時的人鼠之爭。',
  },
  {
    slug: '生命庇護所',
    title: '生命庇護所',
    author: '李雅卿',
    category: "隨筆雜感",
    date: '2018.03.15',
    summary: '烏來山的小天地，二十年間從荒地長成菜園、魚池與百合花圃，山與原住民庇護了土地，土地庇護著更小的動植物。',
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