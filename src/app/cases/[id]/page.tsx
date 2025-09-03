'use client';

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface CaseDetailData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  services: string[];
  year: string;
  results: string[];
  challenges: string[];
  solutions: string[];
}

interface PageProps {
  params: { id: string };
}

export default function CaseDetail({ params }: PageProps) {
  const { id } = params;
  const { languageData, currentLanguage, isLoading, t } = useTranslation();
  const [caseData, setCaseData] = useState<CaseDetailData | null>(null);
  
  useEffect(() => {
    if (!isLoading && languageData[currentLanguage]?.case_data) {
      const allCases = languageData[currentLanguage].case_data as (CaseDetailData & { id: string })[];
      const currentCase = allCases.find((c) => c.id === id);
      if (currentCase) {
        setCaseData(currentCase);
      } else {
        notFound();
      }
    }
  }, [isLoading, currentLanguage, languageData, id]);

  if (isLoading || !caseData) {
    return <div>Loading...</div>; // 或者一個更美觀的加載畫面
  }

  const allCases = (languageData[currentLanguage]?.case_data || []) as CaseDetailData[];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - 手機版優化 */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container px-4">
          <div className="space-y-4 sm:space-y-6">
            {/* Back Button - 手機版優化 */}
            <div className="flex items-center">
              <Link
                href="/cases"
                className="text-primary-600 hover:text-primary-700 text-sm sm:text-base font-medium flex items-center gap-2"
              >
                <span className="text-lg">←</span>
                <span>{t('cases.details.back')}</span>
              </Link>
            </div>
            
            {/* Case Info - 手機版優化佈局 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {caseData.category}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {caseData.year}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center sm:text-left leading-tight">
                {caseData.title}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium text-center sm:text-left leading-tight">
                {caseData.subtitle}
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-left">
                {caseData.description}
              </p>
            </div>
            
            {/* Case Image - 手機版優化 */}
            <div className="relative w-full max-w-md mx-auto sm:mx-0">
              <Image
                src={caseData.image}
                alt={`${caseData.title} 案例`}
                width={400}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Details - 手機版優化 */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4">
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Full Description */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center sm:text-left">{t('cases.details.title')}</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-left">
                {caseData.fullDescription}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">{t('cases.details.services')}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {caseData.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block bg-primary-100 text-primary-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions - 手機版垂直排列 */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">{t('cases.details.challenges')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {caseData.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                      <span className="text-red-500 mt-1 text-lg">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">{t('cases.details.solutions')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {caseData.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                      <span className="text-green-500 mt-1 text-lg">✓</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results & CTA - 手機版優化 */}
            <div className="space-y-4 sm:space-y-6">
              {/* Results */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">{t('cases.details.results')}</h3>
                <div className="space-y-2 sm:space-y-3">
                  {caseData.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{result}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Related Cases - 手機版優化 */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6 md:mb-8">
            {t('cases.details.related')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allCases
              .filter((c) => c.id !== id)
              .slice(0, 3)
              .map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={`${caseItem.title} 案例`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-primary-600 transition-colors leading-tight">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-tight">{caseItem.subtitle}</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {caseItem.category}
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
