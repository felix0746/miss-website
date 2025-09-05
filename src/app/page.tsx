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
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
                
                {/* Bottom Line */}
                <div className="mt-2 w-16 sm:w-16 h-0.5 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 mx-auto rounded-full"></div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary-500/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-secondary-500/30 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </SimpleAnimatedSection>
          
          <SimpleAnimatedSection delay={0.4}>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-3 md:mb-4 leading-tight">
              {t('home.hero.title_line1')}
              <span className="block text-gradient mt-2 sm:mt-1">{t('home.hero.title_line2')}</span>
            </h1>
          </SimpleAnimatedSection>
          
          <SimpleAnimatedSection delay={0.6}>
            <p className="text-base sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed px-1">
              {t('home.hero.subtitle')}
            </p>
          </SimpleAnimatedSection>
          
          <SimpleAnimatedSection delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center px-2 sm:px-4">
              <Link
                href="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base sm:text-base px-8 sm:px-6 py-4 sm:py-3 rounded-xl transition-colors w-full sm:w-32 min-h-[48px] sm:min-h-[44px] inline-flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
              >
                {t('home.hero.cta1')}
              </Link>
              <Link
                href="/services"
                className="bg-white hover:bg-gray-100 text-gray-900 font-semibold text-base sm:text-base px-8 sm:px-6 py-4 sm:py-3 rounded-xl transition-colors w-full sm:w-32 min-h-[48px] sm:min-h-[44px] inline-flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
              >
                {t('home.hero.cta2')}
              </Link>
            </div>
          </SimpleAnimatedSection>
        </div>
      </section>

      {/* Brand Story Section */}
      <SimpleAnimatedSection className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50" delay={0.2}>
        <div className="container">
          <h2 className="section-title text-2xl sm:text-3xl mb-8 sm:mb-12">{t('home.brandStory.title')}</h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('footer.companyName')}</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('home.brandStory.content_p1')}
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('home.brandStory.content_p2')}
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('home.brandStory.content_p3')}
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('home.brandStory.content_p4')}
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('home.brandStory.content_p5')}
              </p>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <Image
                src="/images/brand-story-team.webp"
                alt="覓食國際團隊合照"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12">
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
              <p className="text-gray-700 italic text-sm sm:text-base md:text-lg text-center">
                {t('home.brandStory.quote')}
              </p>
            </div>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* Brand Vision Section */}
      <SimpleAnimatedSection className="py-8 sm:py-12 md:py-16 lg:py-20" delay={0.4}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{t('home.brandVision.title')}</h2>
              <p className="text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed">
                {t('home.brandVision.subtitle')}
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('home.brandVision.vision1.title')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{t('home.brandVision.vision1.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-600 text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('home.brandVision.vision2.title')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{t('home.brandVision.vision2.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('home.brandVision.vision3.title')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{t('home.brandVision.vision3.description')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/brand-vision-image.webp"
                alt="品牌願景"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* Services Section */}
      <SimpleAnimatedSection className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50" delay={0.6}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4 text-gray-800">
              {t('home.services.title')}
            </h2>
            <div className="w-16 h-0.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <SimpleAnimatedSection delay={0.2}>
              <a href="/services#strategy" className="block bg-white/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg active:shadow-lg transition-all duration-300 text-center group active:scale-95 sm:active:scale-100 border border-white/30 hover:bg-white/70">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-active:text-secondary-600 transition-colors">{t('home.services.strategyPlanning')}</h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium">{t('home.services.strategyPlanningDescription')}</p>
              </a>
            </SimpleAnimatedSection>
            
            <SimpleAnimatedSection delay={0.3}>
              <a href="/services#diagnosis" className="block bg-white/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg active:shadow-lg transition-all duration-300 text-center group active:scale-95 sm:active:scale-100 border border-white/30 hover:bg-white/70">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-active:text-primary-600 transition-colors">{t('home.services.businessDiagnosis')}</h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium">{t('home.services.businessDiagnosisDescription')}</p>
              </a>
            </SimpleAnimatedSection>
            
            <SimpleAnimatedSection delay={0.4}>
              <a href="https://believe-in-goodness-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="block bg-white/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg active:shadow-lg transition-all duration-300 text-center group active:scale-95 sm:active:scale-100 border border-white/30 hover:bg-white/70">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-active:text-secondary-600 transition-colors">{t('home.services.hrDevelopment')}</h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium">{t('home.services.hrDevelopmentDescription')}</p>
              </a>
            </SimpleAnimatedSection>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* Related Enterprises Section */}
      <SimpleAnimatedSection className="py-8 sm:py-12 md:py-16 lg:py-20" delay={0.8}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4 text-gray-800">
              {t('home.relatedEnterprises.title')}
            </h2>
            <div className="w-16 h-0.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Mobile: Horizontal Scroll */}
          <div className="block sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <SimpleAnimatedSection delay={0.1}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block text-center group flex-shrink-0 w-20">
                  <div className="w-16 h-16 mx-auto relative mb-2">
                    <Image
                      src="/images/MISS.webp"
                      alt="覓食國際餐飲企業有限公司 Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, 100px"
                      quality={80}
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-700 group-hover:text-primary-600 transition-colors leading-tight">
                    覓食國際
                  </h3>
                </a>
              </SimpleAnimatedSection>
              
              <SimpleAnimatedSection delay={0.2}>
                <a href="http://www.sltpanyaki.com.tw/front/bin/home.phtml" target="_blank" rel="noopener noreferrer" className="block text-center group flex-shrink-0 w-20">
                  <div className="w-16 h-16 mx-auto relative mb-2">
                    <Image
                      src="/images/SLT.webp"
                      alt="SLT 鐵板燒 Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, 100px"
                      quality={80}
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-700 group-hover:text-primary-600 transition-colors leading-tight">
                    SLT 鐵板燒
                  </h3>
                </a>
              </SimpleAnimatedSection>
              
              <SimpleAnimatedSection delay={0.3}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block text-center group flex-shrink-0 w-20">
                  <div className="w-16 h-16 mx-auto relative mb-2">
                    <Image
                      src="/images/other-enterprise.webp"
                      alt="其他企業 Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, 100px"
                      quality={80}
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-700 group-hover:text-primary-600 transition-colors leading-tight">
                    其他企業
                  </h3>
                </a>
              </SimpleAnimatedSection>
            </div>
          </div>
          
          {/* Desktop: Grid Layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <SimpleAnimatedSection delay={0.1}>
              <a href="#" target="_blank" rel="noopener noreferrer" className="block text-center group">
                <div className="w-20 h-20 mx-auto relative mb-4">
                  <Image
                    src="/images/MISS.webp"
                    alt="覓食國際餐飲企業有限公司 Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, 100px"
                    quality={80}
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  覓食國際
                </h3>
              </a>
            </SimpleAnimatedSection>
            
            <SimpleAnimatedSection delay={0.2}>
              <a href="http://www.sltpanyaki.com.tw/front/bin/home.phtml" target="_blank" rel="noopener noreferrer" className="block text-center group">
                <div className="w-20 h-20 mx-auto relative mb-4">
                  <Image
                    src="/images/SLT.webp"
                    alt="SLT 鐵板燒 Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, 100px"
                    quality={80}
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  SLT 鐵板燒
                </h3>
              </a>
            </SimpleAnimatedSection>
            
            <SimpleAnimatedSection delay={0.3}>
              <a href="#" target="_blank" rel="noopener noreferrer" className="block text-center group">
                <div className="w-20 h-20 mx-auto relative mb-4">
                  <Image
                    src="/images/other-enterprise.webp"
                    alt="其他企業 Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, 100px"
                    quality={80}
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  其他企業
                </h3>
              </a>
            </SimpleAnimatedSection>
          </div>
        </div>
      </SimpleAnimatedSection>

      {/* CTA Section */}
      <SimpleAnimatedSection className="py-8 sm:py-12 md:py-16 lg:py-20 bg-primary-600" delay={1.0}>
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              {t('home.cta.primary')}
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              {t('home.cta.secondary')}
            </Link>
          </div>
        </div>
      </SimpleAnimatedSection>
    </main>
  )
}
