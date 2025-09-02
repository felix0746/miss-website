'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: '關於我們', href: '/about' },
  { name: '服務項目', href: '/services' },
  { name: '案例展示', href: '/cases' },
  { name: '最新消息', href: '/news' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-2">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                立即諮詢
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

        {/* Mobile Menu - 更舒適的間距 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium px-4 py-2.5 rounded-md hover:bg-gray-50 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/contact"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-md transition-colors duration-200 font-medium text-center text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  立即諮詢
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
