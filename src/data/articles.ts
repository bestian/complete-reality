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
  "緣起通論",
  "心法原則",
  "功法小技",
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
    category: '緣起通論',
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
    category: '功法小技',
    date: '2026.04.23',
    summary: '道家幫助初入門者震通全身經絡的日常保健方式。無甚禁忌，唯飯後不宜。',
    type: 'video',
    link: 'https://www.youtube.com/watch?v=XE5hgnDv7_8',
  },
  {
    slug: '全真是什麼',
    title: '全真是什麼',
    author: '李雅卿',
    category: '緣起通論',
    date: '2026.04.24',
    summary: '南宋王重陽融儒釋道三家義理創立全真道，一言止殺，倡性命雙修、苦己濟世；以白話略述其源流、特質與現代傳承之念。',
  },
  {
    slug: '身化太極，魂入太虛～～感念吾師 熊先生衛',
    title: '身化太極，魂入太虛～～感念吾師 熊先生衛',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.25',
    summary: '追憶與熊衛師父三十年的師承因緣，記下太極導引如何救我於危難之中，以及暌別師門至今的愧念與感恩。',
  },
  {
    slug: '台灣道場淺介',
    title: '台灣道場淺介',
    author: '李雅卿',
    category: '緣起通論',
    date: '2026.04.27',
    summary: '簡介台灣諸宗教道場與學脈，記下這座小島如何容納多元信仰、激盪出包容的民主文化。',
  },
  {
    slug: '養生小技系列之一：經脈通震法',
    title: '養生小技系列之一：經脈通震法',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.28',
    summary: '來靜師父傳授的日常保健功法：以腳尖、腳跟輪跳振通全身經脈，幫助了我父親改善晚年腿部無力，也幫助了久坐的現代人調理氣血。',
  },
  {
    slug: '養生小技系列之二：補水',
    title: '養生小技系列之二：補水',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.28',
    summary: '現代人常因怕麻煩而喝水不足，影響全身代謝。分享一位師兄的妙招：把全天水量帶去上班，「每次起身先喝水再上廁所」，以膀胱自然提醒取代刻意記錄。',
  },
  {
    slug: '養生小技系列之三：兒童護眼',
    title: '養生小技系列之三：兒童護眼',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.30',
    summary: '3C 時代孩子容易用眼過度，如何避免得近視呢？分享「陪孩子看天」的實用小秘訣：看雲、編故事、享受光影，自然讓孩子養成抬頭遠眺、調整焦距的習慣。',
  },
  {
    slug: '養生小技系列之四：在呼氣時才用力',
    title: '養生小技系列之四：在呼氣時才用力',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.30',
    summary: '一個小技巧可避免大部分運動傷害：在呼氣時才用力、自然呼吸、不憋氣——肌肉放鬆，副交感神經活躍，經脈伸展更深沉。',
  },
  {
    slug: '養生小技系列之五：清晨深呼吸',
    title: '養生小技系列之五：清晨深呼吸',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.04.30',
    summary: '清晨深呼吸適合入門，面光垂手，吸氣抬手、閉氣合掌、呼氣落手，配合默數節律；進階者可循道家逆呼吸法行小周天，九次即可撫平思緒、安定迎接一日。',
  },
  {
    slug: '行住坐臥，道在日常',
    title: '行住坐臥，道在日常',
    author: '李雅卿',
    category: '心法原則',
    date: '2026.05.13',
    summary: '修道無須隱居或翻天覆地，只要把注意力從外在轉回自我改造，便已上路。全真派是講求「性（心行）、命（身體）雙修，三家一貫，重在知行合一、為學日益、為道日損。',
  },
  {
    slug: '十二經脈按摩',
    title: '十二經脈按摩',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.05.15',
    summary: '介紹十二經脈的位置與按摩手法，幫助調理身體機能、日常保健、養顏美容。',
    type: 'video',
    link: 'https://www.youtube.com/watch?v=tipVLD2DXKI',
  },
  {
    slug: '十二經脈按摩',
    title: '十二經脈按摩',
    author: '李雅卿',
    category: '功法小技',
    date: '2026.05.15',
    summary: '源自古代道士為宮廷設計的養生功法，全套約三十分鐘，涵蓋臉頭、軀幹、腿腳、上肢與平甩收功，按摩後神清氣爽、周身舒泰，兼具美容與保健效果，站坐躺皆可行。',
  },
  {
    slug: '周行不殆，道在呼吸',
    title: '周行不殆，道在呼吸',
    author: '李雅卿',
    category: '心法原則',
    date: '2026.05.16',
    summary: '呼吸是生命須臾不離的活動，也是道佛儒三家共同重視的入門。分享以呼吸補能、轉圜情緒、自癒傷病、感知周遭的日常體會，並借《莊子》壺子戲季咸的故事，說明「氣隨心轉，心不為氣所困」的修煉極致。',
  },
]

export function getArticleBySlug(slug: string): ArticleInfo | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: string): ArticleInfo[] {
  return articles.filter((article) => article.category === category)
}