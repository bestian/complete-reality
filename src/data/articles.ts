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
  "通論概說",
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
    category: '通論概說',
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
  {
    slug: '全真是什麼',
    title: '全真是什麼',
    author: '李雅卿',
    category: '通論概說',
    date: '2026.04.24',
    summary: '南宋王重陽融儒釋道三家義理創立全真道，一言止殺，倡性命雙修、苦己濟世；以白話略述其源流、特質與現代傳承之念。',
  },
  {
    slug: '身化太極，魂入太虛～～感念吾師 熊先生衛',
    title: '身化太極，魂入太虛～～感念吾師 熊先生衛',
    author: '李雅卿',
    category: '以道護體',
    date: '2026.04.25',
    summary: '追憶與熊衛師父三十年的師承因緣，記下太極導引如何救我於危難之中，以及暌別師門至今的愧念與感恩。',
  },
  {
    slug: '台灣道場淺介',
    title: '台灣道場淺介',
    author: '李雅卿',
    category: '通論概說',
    date: '2026.04.27',
    summary: '簡介台灣諸宗教道場與學脈，記下這座小島如何容納多元信仰、激盪出包容的民主文化。',
  },
]

export function getArticleBySlug(slug: string): ArticleInfo | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: string): ArticleInfo[] {
  return articles.filter((article) => article.category === category)
}