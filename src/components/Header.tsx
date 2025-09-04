'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { useTranslation } from '@/contexts/TranslationContext';

const navigation = [
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.services', href: '/services' },
  { nameKey: 'nav.cases', href: '/cases' },
  { nameKey: 'nav.news', href: '/news' },
];

export default function Header() {
  const { t } = useTranslation();

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
          <MobileMenu />
        </div>

      </div>
    </header>
  );
}
