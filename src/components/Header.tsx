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
            className="md:hidden p-3 rounded-xl hover:bg-primary-50 transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary-600 transition-all duration-300 group-hover:scale-110" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 transition-all duration-300 group-hover:text-primary-600 group-hover:scale-110" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu - 現代化設計 */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-40">
            <div className="px-5 py-6 space-y-5">
              {/* 導覽連結 */}
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    className="group block text-gray-800 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-3 rounded-xl hover:bg-primary-50 text-base border border-transparent hover:border-primary-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {t(item.nameKey)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* 語言切換器區域 */}
              <div className="pt-4 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs font-medium text-gray-500 mb-2 px-1">語言選擇</div>
                  <div className="flex gap-2">
                    {[
                      { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
                      { code: 'en', name: 'English', flag: '🇺🇸' }
                    ].map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setCurrentLanguage(language.code);
                          setIsMenuOpen(false);
                        }}
                        className={`flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          currentLanguage === language.code 
                            ? 'bg-primary-600 text-white shadow-sm' 
                            : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        <span className="mr-1.5 text-sm">{language.flag}</span>
                        <span className="font-medium text-xs">{language.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* CTA 按鈕 */}
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-5 py-3.5 rounded-xl transition-all duration-300 font-semibold text-center text-base shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {t('nav.consultation')}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
