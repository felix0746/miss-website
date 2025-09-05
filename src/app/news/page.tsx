'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation'

// Define a type for a single news item
interface News {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
}

export default function News() {
  const { t, languageData, currentLanguage, isLoading } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedTag, setSelectedTag] = useState('')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState('')

  const news: News[] = !isLoading && languageData[currentLanguage]?.news_data 
    ? (languageData[currentLanguage].news_data as News[]) 
    : [];

  const categories = ['全部', ...new Set(news.map(item => item.category))];
  const tags = [...new Set(news.flatMap(item => item.tags))];

  // 篩選邏輯
  const filteredNews = news.filter(newsItem => {
    const categoryMatch = selectedCategory === '全部' || newsItem.category === selectedCategory
    const tagMatch = selectedTag === '' || newsItem.tags.includes(selectedTag)
    return categoryMatch && tagMatch
  })

  // 訂閱處理函數
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setSubscriptionMessage('請輸入電子郵件地址')
      return
    }
    
    setIsSubscribing(true)
    setSubscriptionMessage('')
    
    // 模擬訂閱處理
    setTimeout(() => {
      setIsSubscribing(false)
      setSubscriptionMessage('訂閱成功！感謝您的支持')
      setEmail('')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('news.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('news.subtitle')}
          </p>
        </div>
      </section>

      {/* Featured News */}
      {news.filter(item => item.featured).map(featuredNews => (
        <section key={featuredNews.id} className="py-8 sm:py-12 bg-white">
          <div className="container">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 sm:p-8 lg:p-12 overflow-hidden relative">
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
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t('news.featured')}
                      </span>
                      <span className="text-sm text-gray-600">{featuredNews.publishDate}</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {featuredNews.title}
                    </h2>
                    
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>作者：{featuredNews.author}</span>
                      <span>閱讀時間：{featuredNews.readTime}</span>
                    </div>
                    
                    <Link
                      href={`/news/${featuredNews.id}`}
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
                    >
                      {t('news.readMore')}
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Filter Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('news.filter.byCategory')}</h3>
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

            {/* Tags Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('news.filter.byTag')}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                    selectedTag === ''
                      ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                  }`}
                >
                  {t('news.filter.all')}
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Filter Status */}
          {(selectedCategory !== '全部' || selectedTag !== '') && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="text-gray-600">{t('news.filter.current')}:</span>
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
                {selectedTag !== '' && (
                  <span className="inline-flex items-center gap-1 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
                    #{selectedTag}
                    <button
                      onClick={() => setSelectedTag('')}
                      className="ml-1 hover:bg-secondary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('全部')
                    setSelectedTag('')
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm transition-colors"
                >
                  {t('news.filter.clear')}
                </button>
              </div>
            </div>
          )}
          
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredNews.filter(item => !item.featured).map((newsItem) => (
              <article key={newsItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl active:shadow-xl transition-all duration-300 group active:scale-95 sm:active:scale-100">
                {/* News Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    fill
                    className="object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {newsItem.category}
                    </span>
                  </div>
                </div>

                {/* News Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                    <span>{newsItem.publishDate}</span>
                    <span>•</span>
                    <span>{newsItem.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 group-active:text-primary-600 transition-colors leading-tight">
                    {newsItem.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium leading-tight">
                    {newsItem.subtitle}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {newsItem.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {newsItem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">作者：{newsItem.author}</span>
                    <Link
                      href={`/news/${newsItem.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base transition-colors"
                    >
                      {t('news.readMore')} →
                    </Link>
                  </div>
                </div>
              </article>
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
                {t('news.noResults')}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                {t('news.noResultsDescription')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('全部')
                  setSelectedTag('')
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {t('news.filter.clear')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {t('news.comingSoon.title')}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('news.comingSoon.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 lg:p-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {t('news.subscription.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t('news.subscription.subtitle')}
                </p>
                
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('news.subscription.placeholder')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      disabled={isSubscribing}
                    />
                    <button 
                      type="submit"
                      disabled={isSubscribing}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 whitespace-nowrap shadow-lg"
                    >
                      {isSubscribing ? '訂閱中...' : t('news.subscription.button')}
                    </button>
                  </div>
                  
                  {subscriptionMessage && (
                    <div className={`p-3 rounded-lg mb-4 ${subscriptionMessage.includes('成功') || subscriptionMessage.includes('Success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {subscriptionMessage}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    {t('news.subscription.privacy')}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
