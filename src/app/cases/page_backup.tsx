'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation'

// 強制動態渲染，避免服務端預渲染問題
export const dynamic = 'force-dynamic'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedText from '@/components/AnimatedText'
import MobileCard from '@/components/MobileCard'
import { useSwipeDetection } from '@/components/MobileInteractions'

// Define a type for a single case
interface Case {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  services: string[];
  year: string;
}

export default function Cases() {
  const { t, languageData, currentLanguage, isLoading } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedService, setSelectedService] = useState('')
  
  // 滑動檢測
  const swipeHandlers = useSwipeDetection(
    () => setSelectedCategory('全部'), // 左滑重置
    () => setSelectedService('') // 右滑重置
  )

  const cases: Case[] = !isLoading && languageData[currentLanguage]?.case_data 
    ? (languageData[currentLanguage].case_data as Case[]) 
    : [];

  const categories = ['全部', ...new Set(cases.map((c: Case) => c.category))];
  const services = [...new Set(cases.flatMap((c: Case) => c.services))];

  // 篩選邏輯
  const filteredCases = cases.filter((caseItem: Case) => {
    const categoryMatch = selectedCategory === '全部' || caseItem.category === selectedCategory
    const serviceMatch = selectedService === '' || caseItem.services.includes(selectedService)
    return categoryMatch && serviceMatch
  })

  return (
    <main className="min-h-screen bg-white" {...swipeHandlers}>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <AnimatedText>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('cases.title')}
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('cases.subtitle')}
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-50">
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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12">
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
              {filteredCases.map((caseItem, index) => (
              <AnimatedCard key={caseItem.id} delay={index * 0.1}>
                <MobileCard>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl active:shadow-xl transition-all duration-300 group active:scale-95 sm:active:scale-100">
                {/* Case Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={caseItem.image}
                    alt={`${caseItem.title} 案例`}
                    fill
                    className="object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
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
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 group-active:text-primary-600 transition-colors">
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
                    {t('cases.viewDetails')}
                  </Link>
                </div>
                  </div>
                </MobileCard>
              </AnimatedCard>
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
                {t('cases.noResults')}
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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('cases.statistics.title')}
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
              <p className="text-gray-600 text-sm sm:text-base">{t('cases.statistics.projects')}</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-600 mb-2">
                95%
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{t('cases.statistics.satisfaction')}</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                3年+
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{t('cases.statistics.years')}</p>
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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('home.cta.title')}
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-white mb-5 sm:mb-6 max-w-2xl mx-auto px-4"
            dangerouslySetInnerHTML={{ __html: t('home.cta.description') }}
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 relative z-10">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('home.cta.cta1')}
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('home.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
