import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';

// 頁面資料
const news = {
  'news-1': {
    title: '覓食 (MISS) 榮獲2024年台灣餐飲顧問服務優質獎',
    subtitle: '專業服務獲得肯定，持續為餐飲業者提供優質顧問服務',
    excerpt: '覓食國際餐飲企業有限公司憑藉專業的餐飲顧問服務與優異的客戶滿意度，榮獲2024年台灣餐飲顧問服務優質獎。這項殊榮肯定了我們在品牌規劃、商業設計與整合行銷等領域的專業能力...',
    content: '覓食國際餐飲企業有限公司憑藉專業的餐飲顧問服務與優異的客戶滿意度，榮獲2024年台灣餐飲顧問服務優質獎。這項殊榮肯定了我們在品牌規劃、商業設計與整合行銷等領域的專業能力。\n\n我們將持續秉持「讓覓食餐飲陪你一起成長，用台灣美食帶給人們笑容」的理念，為更多餐飲品牌提供專業服務，協助他們在競爭激烈的市場中脫穎而出。\n\n未來，覓食將繼續投入研發創新服務模式，結合數位科技與傳統餐飲智慧，為客戶創造更大的價值。',
    image: '/images/brand-story-team.webp',
    category: '公司榮譽',
    tags: ['獎項', '肯定', '專業服務'],
    author: '覓食團隊',
    publishDate: '2024-01-15',
    readTime: '3 分鐘',
    featured: true
  },
  'news-2': {
    title: '新服務上線：餐飲品牌數位轉型顧問服務',
    subtitle: '協助傳統餐飲業者擁抱數位時代，提升競爭力',
    excerpt: '隨著數位化時代來臨，傳統餐飲業者面臨轉型挑戰。覓食推出全新的「餐飲品牌數位轉型顧問服務」，協助業者建立線上訂餐系統、社群媒體行銷策略...',
    content: '隨著數位化時代來臨，傳統餐飲業者面臨轉型挑戰。覓食推出全新的「餐飲品牌數位轉型顧問服務」，協助業者建立線上訂餐系統、社群媒體行銷策略、客戶關係管理等數位化營運模式。\n\n這項服務包含：\n• 數位化營運診斷\n• 線上訂餐系統建置\n• 社群媒體行銷策略\n• 客戶數據分析\n• 數位化員工培訓\n\n我們相信，透過數位轉型，傳統餐飲業者能夠在保持原有特色的同時，提升營運效率與客戶體驗。',
    image: '/images/service-planning.webp',
    category: '服務更新',
    tags: ['數位轉型', '新服務', '科技應用'],
    author: '產品團隊',
    publishDate: '2024-01-10',
    readTime: '5 分鐘',
    featured: false
  },
  'news-3': {
    title: '成功案例分享：老江紅茶牛奶品牌升級成果',
    subtitle: '從單店經營到連鎖品牌的成功轉型之路',
    excerpt: '老江紅茶牛奶是我們近期完成的品牌升級專案。透過系統性的品牌重塑、視覺識別更新與連鎖擴展策略制定，成功協助老江從高雄地區的單店...',
    content: '老江紅茶牛奶是我們近期完成的品牌升級專案。透過系統性的品牌重塑、視覺識別更新與連鎖擴展策略制定，成功協助老江從高雄地區的單店經營轉型為連鎖品牌。\n\n專案成果：\n• 連鎖店數從 1 家擴展至 8 家\n• 品牌價值提升 200%\n• 營收成長 150%\n• 市場覆蓋率提升 300%\n\n這個成功案例展現了覓食在品牌升級與連鎖擴展方面的專業能力，也為其他傳統餐飲業者提供了寶貴的參考經驗。',
    image: '/images/case-logo-laojiang.webp',
    category: '成功案例',
    tags: ['品牌升級', '連鎖擴展', '成功案例'],
    author: '顧問團隊',
    publishDate: '2024-01-05',
    readTime: '4 分鐘',
    featured: false
  },
  'news-4': {
    title: '2024年餐飲趨勢預測：健康飲食與永續發展',
    subtitle: '洞察未來餐飲市場發展方向，協助客戶提前布局',
    excerpt: '根據市場研究與消費者行為分析，2024年餐飲業將呈現健康飲食與永續發展兩大趨勢。消費者越來越重視食材來源、營養價值與環境影響...',
    content: '根據市場研究與消費者行為分析，2024年餐飲業將呈現健康飲食與永續發展兩大趨勢。消費者越來越重視食材來源、營養價值與環境影響。\n\n主要趨勢包括：\n• 植物性飲食需求增長\n• 有機與無添加食材\n• 低碳足跡餐飲\n• 包裝環保化\n• 營養標示透明化\n\n覓食將協助客戶順應這些趨勢，調整產品策略與行銷方向，在競爭中取得優勢。',
    image: '/images/service-strategy.webp',
    category: '市場趨勢',
    tags: ['趨勢預測', '健康飲食', '永續發展'],
    author: '研究團隊',
    publishDate: '2023-12-28',
    readTime: '6 分鐘',
    featured: false
  },
  'news-5': {
    title: '覓食團隊擴編：歡迎新成員加入',
    subtitle: '強化服務能力，為客戶提供更全面的解決方案',
    excerpt: '為了提供更優質的服務，覓食近期擴編了設計團隊與顧問團隊。新成員來自知名設計公司與餐飲集團，擁有豐富的實務經驗...',
    content: '為了提供更優質的服務，覓食近期擴編了設計團隊與顧問團隊。新成員來自知名設計公司與餐飲集團，擁有豐富的實務經驗。\n\n新增團隊成員：\n• 資深品牌設計師 2 名\n• 餐飲營運顧問 1 名\n• 數位行銷專員 1 名\n• 客戶服務專員 1 名\n\n團隊擴編後，我們將能夠同時處理更多專案，為客戶提供更快速、更專業的服務。同時，多元化的專業背景也讓我們能夠從不同角度為客戶解決問題。',
    image: '/images/brand-story-team.webp',
    category: '團隊動態',
    tags: ['團隊擴編', '新成員', '服務升級'],
    author: '人資團隊',
    publishDate: '2023-12-20',
    readTime: '3 分鐘',
    featured: false
  },
  'news-6': {
    title: '客戶回饋：蘭亭餐廳空間改造專案滿意度調查',
    subtitle: '客戶高度肯定我們的專業服務與執行能力',
    excerpt: '蘭亭餐廳空間改造專案完成後，我們進行了客戶滿意度調查。結果顯示，客戶對我們的服務給予了高度評價，特別是在設計創意...',
    content: '蘭亭餐廳空間改造專案完成後，我們進行了客戶滿意度調查。結果顯示，客戶對我們的服務給予了高度評價，特別是在設計創意、施工品質與時程控制方面。\n\n滿意度調查結果：\n• 整體滿意度：96%\n• 設計創意：98%\n• 施工品質：95%\n• 時程控制：94%\n• 溝通協調：97%\n\n這些正面回饋激勵我們持續精進服務品質，為更多客戶創造滿意的成果。',
    image: '/images/case-logo-lanting.webp',
    category: '客戶回饋',
    tags: ['客戶滿意', '回饋調查', '服務品質'],
    author: '客戶服務團隊',
    publishDate: '2023-12-15',
    readTime: '4 分鐘',
    featured: false
  }
}

type MetadataProps = {
  params: { id: string };
};

// 動態生成 metadata
export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const id = params.id as keyof typeof news;
  const newsData = news[id];

  if (!newsData) {
    return {
      title: '消息不存在 | 覓食 MISS',
    };
  }

  return {
    title: `${newsData.title} | 覓食消息`,
    description: newsData.excerpt,
    openGraph: {
      title: `${newsData.title} | 覓食 MISS 消息`,
      description: newsData.excerpt,
      images: [
        {
          url: `https://miss-website-nextjs-psi.vercel.app${newsData.image}`,
          width: 1200,
          height: 630,
          alt: newsData.title,
        },
      ],
    },
    twitter: {
      title: `${newsData.title} | 覓食 MISS 消息`,
      description: newsData.excerpt,
      images: [`https://miss-website-nextjs-psi.vercel.app${newsData.image}`],
    },
  };
}

export default async function NewsDetail({
  params
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;

  // 將頁面資料移至函數外部
  const newsData = news[id as keyof typeof news];

  if (!newsData) {
    notFound();
  }

  // 將內容中的換行符轉換為段落
  const contentParagraphs = newsData.content.split('\n\n').filter(paragraph => paragraph.trim())

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href="/news"
                  className="text-primary-600 hover:text-primary-700 text-sm sm:text-base font-medium"
                >
                  ← 返回消息列表
                </Link>
              </div>
              
              <div className="space-y-2">
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {newsData.category}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium ml-2">
                  {newsData.publishDate}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                {newsData.title}
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium">
                {newsData.subtitle}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>作者：{newsData.author}</span>
                <span>•</span>
                <span>閱讀時間：{newsData.readTime}</span>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src={newsData.image}
                alt={newsData.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Content Paragraphs */}
              <div className="prose prose-lg max-w-none">
                {contentParagraphs.map((paragraph, index) => {
                  // 檢查是否包含項目符號
                  if (paragraph.includes('•')) {
                    const items = paragraph.split('\n').filter(item => item.trim())
                    return (
                      <div key={index} className="mb-6">
                        <ul className="space-y-2">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{item.replace('•', '').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  
                  return (
                    <p key={index} className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">相關標籤</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {newsData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Article Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">文章資訊</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">分類：</span>
                    <span className="text-gray-600">{newsData.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">發布日期：</span>
                    <span className="text-gray-600">{newsData.publishDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">作者：</span>
                    <span className="text-gray-600">{newsData.author}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">閱讀時間：</span>
                    <span className="text-gray-600">{newsData.readTime}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-primary-600 p-6 rounded-lg text-white text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-3">想要了解更多？</h3>
                <p className="text-primary-100 mb-4 text-sm">
                  聯絡我們，讓我們一起討論如何協助您的餐飲事業成長
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  立即諮詢
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            相關消息
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(news)
              .filter(([newsId]) => newsId !== id)
              .slice(0, 3)
              .map(([id, newsItem]) => (
                <Link
                  key={id}
                  href={`/news/${id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={newsItem.image}
                      alt={newsItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{newsItem.subtitle}</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {newsItem.category}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
