'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation'
import SimpleAnimatedSection from '@/components/SimpleAnimatedSection'

// 強制動態渲染，避免服務端預渲染問題
export const dynamic = 'force-dynamic'

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner.webp"
            alt="追求你所熱愛 努力不懈"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center min-h-[56px]"
            >
              {t('hero.cta1')}
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center min-h-[56px]"
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with CSS Animation */}
      <SimpleAnimatedSection className="py-16 bg-gray-50" delay={0.2}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t('about.description')}
          </p>
        </div>
      </SimpleAnimatedSection>

      {/* Services Section with CSS Animation */}
      <SimpleAnimatedSection className="py-16 bg-white" delay={0.4}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{t('services.item1.title')}</h3>
              <p className="text-gray-600">{t('services.item1.description')}</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{t('services.item2.title')}</h3>
              <p className="text-gray-600">{t('services.item2.description')}</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{t('services.item3.title')}</h3>
              <p className="text-gray-600">{t('services.item3.description')}</p>
            </div>
          </div>
        </div>
      </SimpleAnimatedSection>
    </main>
  )
}
