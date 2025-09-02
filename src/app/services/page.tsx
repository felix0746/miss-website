import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Lightbulb, Users, BarChart, HardHat, UtensilsCrossed } from 'lucide-react';

export const metadata: Metadata = {
  title: '服務項目 | 覓食 MISS',
  description: '探索覓食 (MISS) 提供的四大核心服務：品牌規劃、策略佈局、營運診斷、管理顧問。我們為您的餐飲事業提供全方位的解決方案。',
};

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            服務項目
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            探索覓食 (MISS) 的核心服務項目。我們提供從品牌規劃、策略制定、商業模式診斷到專業管理顧問等一站式解決方案，助您的餐飲事業邁向成功。
          </p>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Brand Planning */}
          <div id="planning" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 relative overflow-hidden">
              {/* Background Watermark */}
              <div className="absolute top-0 right-0 opacity-5 z-0">
                <Image
                  src="/images/miss-logo-watermark.webp"
                  alt=""
                  width={200}
                  height={200}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">餐旅商業設計</h2>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                    對店家進行品牌診斷，給予企業識別規劃、美學意象上的建議與執行。
                  </p>
                </div>

                {/* Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">餐旅品牌系統</h4>
                    <p className="text-gray-600 text-sm sm:text-base">從0到1規劃專屬品牌建立品牌視覺</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">商業平面設計</h4>
                    <p className="text-gray-600 text-sm sm:text-base">菜單、海報、名片設計，面面俱到全方位打造品牌</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">制服設計</h4>
                    <p className="text-gray-600 text-sm sm:text-base">餐飲人員制服設計建立專業、親切服務形象</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">空間設計</h4>
                    <p className="text-gray-600 text-sm sm:text-base">餐廳、攤車裝潢打造吸睛、舒適實用情境</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="relative">
                    <Image
                      src="/images/planning-meeting.webp"
                      alt="會議討論"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
                      我們會為您的品牌建立獨特的品牌定位，針對您能為消費者所提供的價值建立品牌的核心理念。
                    </h3>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 leading-relaxed">
                      讓覓食餐飲陪你一起成長<br/>
                      用台灣美食帶給人們笑容
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Planning */}
          <div id="strategy" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">策略規劃</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  深入分析市場趨勢與競爭環境，制定適合的商業策略，協助您的餐飲事業在競爭中脫穎而出。
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">策略規劃</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    深入分析市場趨勢與競爭環境，制定適合的商業策略，協助您的餐飲事業在競爭中脫穎而出。
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      市場分析與競爭研究
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      商業模式設計
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      營運策略制定
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      成長路徑規劃
                    </li>
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-lg shadow-lg p-8 sm:p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-12 h-12 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">策略規劃</h3>
                    <p className="text-gray-600">專業的商業策略制定與執行</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Diagnosis */}
          <div id="diagnosis" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">商業模式診斷</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  全面檢視您的餐飲事業，找出問題點與改善機會，提供具體的改善建議與執行方案。
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">商業模式診斷</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    全面檢視您的餐飲事業，找出問題點與改善機會，提供具體的改善建議與執行方案。
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      營運流程分析
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      財務結構檢視
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      客戶體驗評估
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      改善方案制定
                    </li>
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg shadow-lg p-8 sm:p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">商業診斷</h3>
                    <p className="text-gray-600">全面檢視與改善建議</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Management Consultant */}
          <div id="consultant" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">管理顧問</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  建立完善的人才培訓體系，提升團隊專業能力，為您的餐飲事業培養優秀的人才隊伍。
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-lg shadow-lg p-8 sm:p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-12 h-12 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">人才育成</h3>
                    <p className="text-gray-600">專業團隊培訓與管理</p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">人才育成</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    建立完善的人才培訓體系，提升團隊專業能力，為您的餐飲事業培養優秀的人才隊伍。
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      員工培訓計畫
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      管理技能提升
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      團隊文化建立
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      績效管理系統
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                更多專業服務即將推出
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                我們正在開發更多專業的餐飲顧問服務，包括數位轉型、國際化策略、供應鏈管理等，為您的餐飲事業提供更全面的支援！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            準備好開始了嗎？
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
            聯絡我們，讓我們一起討論如何協助您的餐飲事業成長
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              立即諮詢
            </Link>
            <Link
              href="/cases"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              查看案例
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
