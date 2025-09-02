'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// 註：在 'use client' 組件中無法直接導出 metadata
// SEO 資訊建議在父層的 layout.tsx 或 page.tsx (Server Component) 中設定
// 這裡我們先為頁面內容做準備，SEO 資訊可以在 `cases/layout.tsx` 中補上

export default function Cases() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedService, setSelectedService] = useState('')

  const cases = [
    {
      id: 'kenting',
      title: '肯特西餐廳',
      subtitle: '品牌重塑與空間改造',
      description: '協助肯特西餐廳進行品牌重塑與空間改造，從老舊西餐廳轉型為現代化美式餐廳，打造家的味道與懷舊氛圍。',
      image: '/images/case-logo-kenting.webp',
      category: '西餐廳',
      services: ['LOGO設計', '菜單規劃', '空間設計'],
      year: '2023'
    },
    {
      id: 'lanting',
      title: '蘭亭餐廳',
      subtitle: '空間設計與品牌識別',
      description: '為蘭亭餐廳打造獨特的空間設計與品牌識別系統，創造優雅的用餐環境與品牌形象。',
      image: '/images/case-logo-lanting.webp',
      category: '餐廳',
      services: ['空間設計', '品牌識別', '視覺設計'],
      year: '2023'
    },
    {
      id: 'laojiang',
      title: '老江紅茶牛奶',
      subtitle: '品牌升級與連鎖擴展',
      description: '協助老江紅茶牛奶進行品牌升級，制定連鎖擴展策略，提升品牌價值與市場份額。',
      image: '/images/case-logo-laojiang.webp',
      category: '飲料業',
      services: ['品牌升級', '連鎖策略', '營運規劃'],
      year: '2023'
    },
    {
      id: 'sansan',
      title: '三三燒肉',
      subtitle: '商業模式優化',
      description: '為三三燒肉進行商業模式診斷與優化，提升營運效率與顧客滿意度。',
      image: '/images/case-logo-sansan.webp',
      category: '燒肉店',
      services: ['商業診斷', '營運優化', '流程改善'],
      year: '2023'
    },
    {
      id: 'tianyuan',
      title: '天元茶業',
      subtitle: '品牌定位與行銷推廣',
      description: '協助天元茶業建立清晰的品牌定位，制定有效的行銷推廣策略，擴大市場影響力。',
      image: '/images/case-logo-tianyuan.webp',
      category: '茶業',
      services: ['品牌定位', '行銷推廣', '市場策略'],
      year: '2023'
    },
    {
      id: 'xianglian',
      title: '香連鐵板料理',
      subtitle: '品牌重塑與餐廳改造',
      description: '協助香連鐵板料理進行品牌重塑與餐廳改造，結合台北石牌商圈文化與新竹竹東客家人待客豪情，打造獨特的日式鐵板料理品牌。',
      image: '/images/xianglian-logo-large.webp',
      category: '鐵板燒',
      services: ['LOGO設計', '餐廳改造', '品牌重塑'],
      year: '2023'
    }
  ]

  const categories = ['全部', '西餐廳', '餐廳', '飲料業', '燒肉店', '茶業', '鐵板燒']
  const services = ['品牌規劃', '行銷策略', '視覺設計', '空間設計', '品牌識別', '品牌升級', '連鎖策略', '營運規劃', '商業診斷', '營運優化', '流程改善', '品牌定位', '市場策略', '品牌重塑', '空間改造', 'LOGO設計', '菜單規劃', '餐廳改造']

  // 篩選邏輯
  const filteredCases = cases.filter(caseItem => {
    const categoryMatch = selectedCategory === '全部' || caseItem.category === selectedCategory
    const serviceMatch = selectedService === '' || caseItem.services.includes(selectedService)
    return categoryMatch && serviceMatch
  })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            案例展示
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            探索覓食 (MISS) 的成功案例，了解我們如何協助餐飲品牌從理想到落地，創造無限可能。
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">依產業分類</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">依服務類型</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedService('')}
                  className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                    selectedService === ''
                      ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                  }`}
                >
                  全部
                </button>
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                      selectedService === service
                        ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Filter Status */}
          {(selectedCategory !== '全部' || selectedService !== '') && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="text-gray-600">目前篩選：</span>
                {selectedCategory !== '全部' && (
                  <span className="inline-flex items-center gap-1 bg-primary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('全部')}
                      className="ml-1 hover:bg-primary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedService !== '' && (
                  <span className="inline-flex items-center gap-1 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
                    {selectedService}
                    <button
                      onClick={() => setSelectedService('')}
                      className="ml-1 hover:bg-secondary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('全部')
                    setSelectedService('')
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm transition-colors"
                >
                  清除所有篩選
                </button>
              </div>
            </div>
          )}
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Case Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={caseItem.image}
                    alt={`${caseItem.title} 案例`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {caseItem.year}
                  </div>
                </div>

                {/* Case Content */}
                <div className="p-4 sm:p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mb-2">
                      {caseItem.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {caseItem.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">
                    {caseItem.subtitle}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {caseItem.services.map((service) => (
                      <span
                        key={service}
                        className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/cases/${caseItem.id}`}
                    className="inline-block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    查看詳情
                  </Link>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                找不到符合條件的案例
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                請嘗試調整篩選條件，或瀏覽其他類型的案例
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('全部')
                  setSelectedService('')
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                清除篩選
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我們的成就
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              透過專業的服務與豐富的經驗，我們已成功協助眾多餐飲品牌實現夢想
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <p className="text-gray-600 text-sm sm:text-base">成功案例</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-600 mb-2">
                95%
              </div>
              <p className="text-gray-600 text-sm sm:text-base">客戶滿意度</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                3年+
              </div>
              <p className="text-gray-600 text-sm sm:text-base">服務經驗</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600 text-sm sm:text-base">專業支援</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            準備好開始您的成功故事了嗎？
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
            聯絡我們，讓我們一起討論如何協助您的餐飲事業成長，創造屬於您的成功案例
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center"
            >
              立即諮詢
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center"
            >
              查看服務
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
