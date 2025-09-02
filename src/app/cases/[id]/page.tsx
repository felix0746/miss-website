import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';

// 頁面資料
const cases = {
  kenting: {
    title: '肯特西餐廳',
    subtitle: '品牌重塑與空間改造',
    description: '協助肯特西餐廳進行品牌重塑與空間改造，從老舊西餐廳轉型為現代化美式餐廳，打造家的味道與懷舊氛圍。',
    fullDescription: '肯特西餐廳是老闆於民國六十四年創立的肯特西餐牛排館，曾經是台北東區唯一有駐唱的西餐廳，充滿濃厚的懷舊氛圍。經歷世代變遷，老舊西餐廳面臨歇業危機，但老闆秉持初衷，希望以「家」為本，用最美式的方式料理，把店內所有的餐點都賦予家的味道。我們協助其進行品牌重塑與空間改造，包括LOGO設計、菜單規劃、餐廳裝潢設計等，成功轉型為現代化美式餐廳。',
    image: '/images/case-logo-kenting.webp',
    category: '西餐廳',
    services: ['LOGO設計', '菜單規劃', '空間設計'],
    year: '2023',
    results: [
      '品牌形象現代化提升 80%',
      '顧客滿意度提升至 90%',
      '營收成長 35%',
      '年輕客群增加 60%'
    ],
    challenges: [
      '老舊西餐廳風格過時',
      '無法吸引年輕族群',
      '空間設計昏暗老舊',
      '品牌識別度不足'
    ],
    solutions: [
      '設計現代化LOGO，融合蜂巢、心型、家徽等元素',
      '重新規劃菜單設計與視覺SOP',
      '全面改造餐廳裝潢，營造活潑熱鬧氛圍',
      '建立品牌一致性與現代化形象'
    ]
  },
  lanting: {
    title: '蘭亭餐廳',
    subtitle: '空間設計與品牌識別',
    description: '為蘭亭餐廳打造獨特的空間設計與品牌識別系統，創造優雅的用餐環境與品牌形象。',
    fullDescription: '蘭亭餐廳是一家主打精緻中餐的高級餐廳，希望透過空間設計與品牌識別系統的整合，創造獨特的用餐體驗。我們從品牌理念出發，設計了完整的視覺識別系統，並規劃了優雅的用餐空間，成功打造了蘭亭的品牌特色。',
    image: '/images/case-logo-lanting.webp',
    category: '餐廳',
    services: ['空間設計', '品牌識別', '視覺設計'],
    year: '2023',
    results: [
      '顧客回流率提升 60%',
      '平均消費金額提升 30%',
      '品牌識別度提升 80%',
      '空間利用率提升 25%'
    ],
    challenges: [
      '品牌特色不明顯',
      '空間設計缺乏一致性',
      '視覺元素雜亂',
      '顧客體驗不佳'
    ],
    solutions: [
      '建立完整的品牌識別系統',
      '設計統一的空間風格',
      '整合視覺元素與空間設計',
      '優化顧客用餐流程'
    ]
  },
  laojiang: {
    title: '老江紅茶牛奶',
    subtitle: '品牌升級與連鎖擴展',
    description: '協助老江紅茶牛奶進行品牌升級，制定連鎖擴展策略，提升品牌價值與市場份額。',
    fullDescription: '老江紅茶牛奶是高雄地區知名的傳統飲料店，希望透過品牌升級與連鎖擴展，擴大市場影響力。我們協助其進行品牌現代化改造，制定標準化的營運流程，並規劃連鎖擴展策略，成功幫助老江從單店經營轉型為連鎖品牌。',
    image: '/images/case-logo-laojiang.webp',
    category: '飲料業',
    services: ['品牌升級', '連鎖策略', '營運規劃'],
    year: '2023',
    results: [
      '連鎖店數從 1 家擴展至 8 家',
      '品牌價值提升 200%',
      '營收成長 150%',
      '市場覆蓋率提升 300%'
    ],
    challenges: [
      '品牌形象傳統',
      '缺乏標準化流程',
      '擴展經驗不足',
      '管理體系不完善'
    ],
    solutions: [
      '設計現代化的品牌形象',
      '建立標準化營運流程',
      '制定連鎖擴展策略',
      '建立完善的管理體系'
    ]
  },
  xianglian: {
    title: '香連鐵板料理',
    subtitle: '品牌重塑與餐廳改造',
    description: '協助香連鐵板料理進行品牌重塑與餐廳改造，結合台北石牌商圈文化與新竹竹東客家人待客豪情，打造獨特的日式鐵板料理品牌。',
    fullDescription: '香連鐵板料理是一家位於台北石牌的日本鐵板料理，店內強調嚴選當季食材，並以創新的料理方式呈現給顧客。覓食團隊以第一代經營者，來自台北石牌商圈人與新竹竹東客家人的待客豪情文化結合，導入創意設計，塑造核心文化。我們協助其進行品牌重塑與餐廳改造，包括LOGO設計、餐廳外觀改造等，成功打造獨特的日式鐵板料理品牌形象。',
    image: '/images/xianglian-logo-large.webp',
    category: '鐵板燒',
    services: ['LOGO設計', '餐廳改造', '品牌重塑'],
    year: '2023',
    results: [
      '品牌識別度提升 85%',
      '顧客滿意度提升至 92%',
      '營收成長 40%',
      '媒體曝光度增加 200%'
    ],
    challenges: [
      '店面設計單調缺乏特色',
      '品牌識別度不足',
      '無法體現文化底蘊',
      '缺乏日式風格氛圍'
    ],
    solutions: [
      '設計獨特LOGO，結合鐵板料理鍋鏟元素與中國風字體',
      '改造餐廳外觀，融入日式風格與牡丹花圖樣',
      '結合台北石牌商圈文化與新竹竹東客家人待客豪情',
      '搭配溫暖黃光與木紋，打造舒適用餐環境'
    ]
  },
  sansan: {
    title: '三三燒肉',
    subtitle: '商業模式優化',
    description: '為三三燒肉進行商業模式診斷與優化，提升營運效率與顧客滿意度。',
    fullDescription: '三三燒肉是一家新興的日式燒肉店，希望透過商業模式優化來提升營運效率與顧客滿意度。我們協助其進行全面的商業診斷，包括營運流程分析、成本結構優化、服務流程改善等，成功提升了整體營運效能。',
    image: '/images/case-logo-sansan.webp',
    category: '燒肉店',
    services: ['商業診斷', '營運優化', '流程改善'],
    year: '2023',
    results: [
      '營運效率提升 45%',
      '顧客滿意度提升至 88%',
      '成本控制改善 25%',
      '翻桌率提升 30%'
    ],
    challenges: [
      '營運流程不順暢',
      '成本控制不佳',
      '服務效率有待提升',
      '缺乏標準化作業'
    ],
    solutions: [
      '建立標準化營運流程',
      '優化成本結構與採購策略',
      '改善服務流程與人員配置',
      '導入數位化營運管理系統'
    ]
  },
  tianyuan: {
    title: '天元茶業',
    subtitle: '品牌定位與行銷推廣',
    description: '協助天元茶業建立清晰的品牌定位，制定有效的行銷推廣策略，擴大市場影響力。',
    fullDescription: '天元茶業是一家傳統茶葉品牌，希望透過品牌定位與行銷推廣策略的制定，擴大市場影響力。我們協助其建立清晰的品牌定位，制定有效的行銷推廣策略，包括品牌故事塑造、目標客群分析、行銷通路規劃等，成功提升了品牌知名度與市場份額。',
    image: '/images/case-logo-tianyuan.webp',
    category: '茶業',
    services: ['品牌定位', '行銷推廣', '市場策略'],
    year: '2023',
    results: [
      '品牌知名度提升 70%',
      '市場份額成長 40%',
      '線上銷售成長 120%',
      '客戶忠誠度提升 55%'
    ],
    challenges: [
      '品牌定位不明確',
      '行銷策略缺乏系統性',
      '目標客群模糊',
      '數位化程度不足'
    ],
    solutions: [
      '建立清晰的品牌定位與價值主張',
      '制定系統性的行銷推廣策略',
      '精準定位目標客群',
      '導入數位行銷工具與平台'
    ]
  }
}

type MetadataProps = {
  params: { id: string };
};

// 動態生成 metadata
export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const id = params.id as keyof typeof cases;
  const caseData = cases[id];

  if (!caseData) {
    return {
      title: '案例不存在 | 覓食 MISS',
    };
  }

  return {
    title: `${caseData.title} | 成功案例`,
    description: caseData.description,
    openGraph: {
      title: `${caseData.title} | 覓食 MISS 成功案例`,
      description: caseData.description,
      images: [
        {
          url: `https://miss-website-nextjs-psi.vercel.app${caseData.image}`,
          width: 800,
          height: 600,
          alt: caseData.title,
        },
      ],
    },
    twitter: {
      title: `${caseData.title} | 覓食 MISS 成功案例`,
      description: caseData.description,
      images: [`https://miss-website-nextjs-psi.vercel.app${caseData.image}`],
    },
  };
}

export default function CaseDetail({ 
  params 
}: { 
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params.id as keyof typeof cases;
  
  // 將頁面資料移至函數外部
  const caseData = cases[id];

  if (!caseData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - 手機版優化 */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container px-4">
          <div className="space-y-4 sm:space-y-6">
            {/* Back Button - 手機版優化 */}
            <div className="flex items-center">
              <Link
                href="/cases"
                className="text-primary-600 hover:text-primary-700 text-sm sm:text-base font-medium flex items-center gap-2"
              >
                <span className="text-lg">←</span>
                <span>返回案例列表</span>
              </Link>
            </div>
            
            {/* Case Info - 手機版優化佈局 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {caseData.category}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {caseData.year}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center sm:text-left leading-tight">
                {caseData.title}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium text-center sm:text-left leading-tight">
                {caseData.subtitle}
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-left">
                {caseData.description}
              </p>
            </div>
            
            {/* Case Image - 手機版優化 */}
            <div className="relative w-full max-w-md mx-auto sm:mx-0">
              <Image
                src={caseData.image}
                alt={`${caseData.title} 案例`}
                width={400}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Details - 手機版優化 */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4">
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Full Description */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center sm:text-left">案例詳情</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-left">
                {caseData.fullDescription}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">服務項目</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {caseData.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block bg-primary-100 text-primary-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions - 手機版垂直排列 */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">面臨挑戰</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {caseData.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                      <span className="text-red-500 mt-1 text-lg">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">解決方案</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {caseData.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results & CTA - 手機版優化 */}
            <div className="space-y-4 sm:space-y-6">
              {/* Results */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">專案成果</h3>
                <div className="space-y-2 sm:space-y-3">
                  {caseData.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{result}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Related Cases - 手機版優化 */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6 md:mb-8">
            其他成功案例
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(cases)
              .filter(([caseId]) => caseId !== id)
              .slice(0, 3)
              .map(([id, caseItem]) => (
                <Link
                  key={id}
                  href={`/cases/${id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={`${caseItem.title} 案例`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-primary-600 transition-colors leading-tight">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-tight">{caseItem.subtitle}</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {caseItem.category}
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
