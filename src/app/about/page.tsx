import { Metadata } from 'next';
import Image from 'next/image'

export const metadata: Metadata = {
  title: '關於我們 | 覓食 MISS',
  description: '了解覓食 (MISS) 的品牌故事、經營理念與專業團隊。我們致力於為餐飲業者提供最專業的顧問服務，與您一同成長。',
};

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            關於覓食 MISS
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我們是一群對餐旅事業充滿熱情的專業團隊，致力於協助餐飲品牌從理想到落地，創造無限可能。
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">公司簡介</h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                覓食國際餐飲企業有限公司成立於2021年，由一群對餐旅事業有高度熱忱的青年所組成。
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                「覓食」的命名乃是以英文 Miss 的諧音作為發想，其意涵有想念、饗宴、回味無窮之意。
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                我們成立的使命是以台灣的本土化美食為依歸，推廣與行銷在地美食，提高台灣美食能見度。
              </p>
            </div>
            
            <div className="relative">
              <Image
                src="/images/philosophy-image.webp"
                alt="覓食企業理念"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            核心價值
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">專業導向</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                以專業知識和豐富經驗，為客戶提供最適合的解決方案
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">夥伴關係</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                與客戶建立長期夥伴關係，共同成長，共享成功
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">創新思維</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                持續創新，結合傳統與現代，創造獨特的餐飲體驗
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development History */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            發展歷程
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2021
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">公司成立</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  覓食國際餐飲企業有限公司正式成立，開始提供餐飲顧問服務
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2022
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">服務擴展</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  新增品牌規劃、商業設計等服務項目，服務範圍進一步擴大
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2023
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">案例累積</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  成功協助多個餐飲品牌轉型升級，建立豐富的成功案例
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2024
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">持續成長</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  持續創新服務模式，為更多餐飲品牌提供專業支援
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            我們的團隊
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src="/images/brand-story-team.webp"
                  alt="團隊成員"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">專業顧問團隊</h3>
              <p className="text-gray-600 text-sm">
                擁有豐富餐飲產業經驗的專業顧問，為客戶提供最適合的解決方案
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src="/images/planning-meeting.webp"
                  alt="規劃會議"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">策略規劃團隊</h3>
              <p className="text-gray-600 text-sm">
                專精於餐飲事業策略制定與市場分析，協助客戶制定長遠發展計畫
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center sm:col-span-2 lg:col-span-1">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src="/images/service-icon-graphic.webp"
                  alt="設計團隊"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">設計創意團隊</h3>
              <p className="text-gray-600 text-sm">
                結合美學與實用性的設計理念，為品牌創造獨特的視覺識別
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            想要了解更多嗎？
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
            聯絡我們，讓我們一起討論如何協助您的餐飲事業成長
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto">
              立即諮詢
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto">
              查看服務
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
