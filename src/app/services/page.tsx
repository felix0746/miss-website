'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation';

export default function Services() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('services.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.brandPlanning.title')}</h2>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                    {t('services.brandPlanning.description')}
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
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('services.brandPlanning.item1.title')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('services.brandPlanning.item1.description')}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('services.brandPlanning.item2.title')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('services.brandPlanning.item2.description')}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('services.brandPlanning.item3.title')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('services.brandPlanning.item3.description')}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('services.brandPlanning.item4.title')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('services.brandPlanning.item4.description')}</p>
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
                      {t('services.brandPlanning.bottom.p1')}
                    </h3>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 leading-relaxed">
                      {t('services.brandPlanning.bottom.p2.line1')}<br/>
                      {t('services.brandPlanning.bottom.p2.line2')}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Diagnosis */}
          <div id="diagnosis" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.businessDiagnosis.title')}</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  {t('services.businessDiagnosis.description')}
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
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('services.businessDiagnosis.title')}</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {t('services.businessDiagnosis.description')}
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      {t('services.businessDiagnosis.listItem1')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      {t('services.businessDiagnosis.listItem2')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      {t('services.businessDiagnosis.listItem3')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      {t('services.businessDiagnosis.listItem4')}
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
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('services.businessDiagnosis.title')}</h3>
                    <p className="text-gray-600">{t('services.businessDiagnosis.cardDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Planning */}
          <div id="strategy" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.strategyPlanning.title')}</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  {t('services.strategyPlanning.description')}
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
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('services.strategyPlanning.title')}</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {t('services.strategyPlanning.description')}
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.strategyPlanning.listItem1')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.strategyPlanning.listItem2')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.strategyPlanning.listItem3')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.strategyPlanning.listItem4')}
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
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('services.strategyPlanning.title')}</h3>
                    <p className="text-gray-600">{t('services.strategyPlanning.cardDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Management Consultant */}
          <div id="consultant" className="mb-16 sm:mb-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.hrDevelopment.title')}</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                  {t('services.hrDevelopment.description')}
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
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('services.hrDevelopment.title')}</h3>
                    <p className="text-gray-600">{t('services.hrDevelopment.cardDescription')}</p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('services.hrDevelopment.title')}</h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {t('services.hrDevelopment.description')}
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.hrDevelopment.listItem1')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.hrDevelopment.listItem2')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.hrDevelopment.listItem3')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary-600 mt-1">✓</span>
                      {t('services.hrDevelopment.listItem4')}
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
                {t('services.comingSoon')}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('services.comingSoonDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-5 sm:mb-6 max-w-2xl mx-auto">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('services.cta.cta1')}
            </Link>
            <Link
              href="/cases"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('services.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}