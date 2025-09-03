'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/contexts/TranslationContext';

const navigation = [
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.services', href: '/services' },
  { nameKey: 'nav.cases', href: '/cases' },
  { nameKey: 'nav.news', href: '/news' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, currentLanguage, setCurrentLanguage } = useTranslation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:py-2">
          {/* Logo - 更顯眼的設計 */}
          <Link href="/" className="flex items-center group">
            <div className="w-20 h-16 md:w-18 md:h-14 relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-1">
              <Image
                src="/images/MISS.webp"
                alt="覓食 MISS Logo"
                fill
                className="object-contain drop-shadow-xl filter brightness-125 contrast-150 saturate-150"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation - 更緊湊的佈局 */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.nameKey}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                {t(item.nameKey)}
              </Link>
            ))}
            <LanguageSwitcher />
            <div className="ml-2">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                {t('nav.consultation')}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu - 優化美編設計 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
            <nav className="px-4 py-6 space-y-4">
              {/* 導覽連結 */}
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    className="block text-gray-700 hover:text-red-600 transition-all duration-300 font-medium px-4 py-3 rounded-xl hover:bg-white hover:shadow-md text-base border border-transparent hover:border-red-100"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {t(item.nameKey)}
                    </span>
                  </Link>
                ))}
              </div>
              
              {/* 語言切換器區域 */}
              <div className="pt-4 border-t border-gray-200">
                <div 
                  className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    // 直接切換語言
                    const nextLanguage = currentLanguage === 'zh-TW' ? 'en' : 'zh-TW';
                    setCurrentLanguage(nextLanguage);
                  }}
                >
                  <span className="text-sm font-medium text-gray-600">語言 / Language</span>
                  <div className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-md hover:bg-gray-50">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* CTA 按鈕 */}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold text-center text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {t('nav.consultation')}
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
