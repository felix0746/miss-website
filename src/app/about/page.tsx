'use client'

import Image from 'next/image'
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation';
import Link from 'next/link';

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('about.title')}
          </h1>
          <p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('about.subtitle') }}
          />
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('about.introduction.title')}</h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('about.introduction.p1')}
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('about.introduction.p2')}
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('about.introduction.p3')}
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
            {t('about.coreValues.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{t('about.coreValues.value1.title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('about.coreValues.value1.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{t('about.coreValues.value2.title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('about.coreValues.value2.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{t('about.coreValues.value3.title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t('about.coreValues.value3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            {t('about.team.title')}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.team.member1.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('about.team.member1.description')}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.team.member2.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('about.team.member2.description')}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.team.member3.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('about.team.member3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-5 sm:mb-6 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('nav.consultation')}
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
