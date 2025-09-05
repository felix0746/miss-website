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
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ contain: 'layout' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner.webp"
            alt="追求你所熱愛 努力不懈"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 sm:px-4 max-w-4xl mx-auto" style={{ minHeight: '400px' }}>
          <SimpleAnimatedSection delay={0.2}>
            <div className="mb-6 sm:mb-6">
              <div className="inline-block px-6 sm:px-6 py-4 sm:py-4 bg-white/98 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/80 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white">
                <div className="relative">
                  {/* Logo Container */}
                  <div className="w-24 h-20 sm:w-24 sm:h-20 relative mx-auto group">
                    <Image
                      src="/images/MISS.webp"
                      alt="覓食 MISS Logo"
                      fill
                      className="object-contain drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SimpleAnimatedSection>

          <SimpleAnimatedSection delay={0.4}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              {t('hero.title')}
            </h1>
          </SimpleAnimatedSection>

          <SimpleAnimatedSection delay={0.6}>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
              {t('hero.subtitle')}
            </p>
          </SimpleAnimatedSection>

          <SimpleAnimatedSection delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center min-h-[56px] transform hover:scale-105 transition-transform duration-300"
              >
                {t('hero.cta1')}
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center min-h-[56px] transform hover:scale-105 transition-transform duration-300"
              >
                {t('hero.cta2')}
              </Link>
            </div>
          </SimpleAnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <SimpleAnimatedSection className="py-16 bg-gray-50" delay={0.2}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.feature1.title')}</h3>
                  <p className="text-gray-600">{t('about.feature1.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.feature2.title')}</h3>
                  <p className="text-gray-600">{t('about.feature2.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.feature3.title')}</h3>
                  <p className="text-gray-600">{t('about.feature3.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/about-image.webp"
                alt="關於我們"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* Services Section */}
      <SimpleAnimatedSection className="py-16 bg-white" delay={0.4}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('services.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary-600">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('services.item1.title')}</h3>
              <p className="text-gray-600 mb-6">{t('services.item1.description')}</p>
              <Link
                href="/services"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
              >
                了解更多 →
              </Link>
            </div>
            
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary-600">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('services.item2.title')}</h3>
              <p className="text-gray-600 mb-6">{t('services.item2.description')}</p>
              <Link
                href="/services"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
              >
                了解更多 →
              </Link>
            </div>
            
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary-600">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('services.item3.title')}</h3>
              <p className="text-gray-600 mb-6">{t('services.item3.description')}</p>
              <Link
                href="/services"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
              >
                了解更多 →
              </Link>
            </div>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* Cases Section */}
      <SimpleAnimatedSection className="py-16 bg-gray-50" delay={0.6}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cases.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('cases.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/case1.webp"
                alt="案例 1"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('cases.item1.title')}</h3>
                <p className="text-gray-600 mb-4">{t('cases.item1.description')}</p>
                <Link
                  href="/cases"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  查看詳情 →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/case2.webp"
                alt="案例 2"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('cases.item2.title')}</h3>
                <p className="text-gray-600 mb-4">{t('cases.item2.description')}</p>
                <Link
                  href="/cases"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  查看詳情 →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/case3.webp"
                alt="案例 3"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t('cases.item3.title')}</h3>
                <p className="text-gray-600 mb-4">{t('cases.item3.description')}</p>
                <Link
                  href="/cases"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  查看詳情 →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/cases"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
            >
              {t('cases.cta')}
            </Link>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* CTA Section */}
      <SimpleAnimatedSection className="py-16 bg-primary-600" delay={0.8}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              {t('cta.primary')}
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </SimpleAnimatedSection>
    </main>
  )
}
