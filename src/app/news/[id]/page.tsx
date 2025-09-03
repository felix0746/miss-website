'use client';

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface NewsDetailData {
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

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function NewsDetail({
  params
}: PageProps) {
  const { id } = params;
  const { languageData, currentLanguage, isLoading, t } = useTranslation();
  const [newsData, setNewsData] = useState<NewsDetailData | null>(null);

  useEffect(() => {
    if (!isLoading && languageData[currentLanguage]?.news_data) {
      const allNews = languageData[currentLanguage].news_data;
      const currentNews = allNews.find((n: NewsDetailData) => n.id === id);
      if (currentNews) {
        setNewsData(currentNews);
      } else {
        notFound();
      }
    }
  }, [isLoading, currentLanguage, languageData, id]);

  if (isLoading || !newsData) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner
  }

  const contentParagraphs = newsData.content.split('\n\n').filter(paragraph => paragraph.trim());
  const allNews = languageData[currentLanguage]?.news_data || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href="/news"
                  className="text-primary-600 hover:text-primary-700 text-sm sm:text-base font-medium"
                >
                  ← {t('news.details.back')}
                </Link>
              </div>
              
              <div className="space-y-2">
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {newsData.category}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium ml-2">
                  {newsData.publishDate}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                {newsData.title}
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium">
                {newsData.subtitle}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{t('news.details.author')}{newsData.author}</span>
                <span>•</span>
                <span>{t('news.details.readTime')}{newsData.readTime}</span>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src={newsData.image}
                alt={newsData.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Content Paragraphs */}
              <div className="prose prose-lg max-w-none">
                {contentParagraphs.map((paragraph, index) => {
                  // 檢查是否包含項目符號
                  if (paragraph.includes('•')) {
                    const items = paragraph.split('\n').filter(item => item.trim())
                    return (
                      <div key={index} className="mb-6">
                        <ul className="space-y-2">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{item.replace('•', '').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  
                  return (
                    <p key={index} className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('news.details.tags')}</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {newsData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Article Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('news.details.info')}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">{t('news.details.category')}: </span>
                    <span className="text-gray-600">{newsData.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('news.details.publishDate')}: </span>
                    <span className="text-gray-600">{newsData.publishDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('news.details.author')}: </span>
                    <span className="text-gray-600">{newsData.author}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('news.details.readTime')}: </span>
                    <span className="text-gray-600">{newsData.readTime}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-primary-600 p-5 rounded-lg text-white text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-3">{t('news.details.cta.title')}</h3>
                <p className="text-primary-100 mb-4 text-sm">
                  {t('news.details.cta.subtitle')}
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  {t('nav.consultation')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {t('news.details.related')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allNews
              .filter((item: NewsDetailData) => item.id !== id)
              .slice(0, 3)
              .map((item: NewsDetailData) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {item.category}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
