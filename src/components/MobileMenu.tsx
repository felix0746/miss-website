'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import Link from 'next/link'
import Image from 'next/image'
import { useTouchFeedback } from './MobileInteractions'

export default function MobileMenu() {
  const { t, currentLanguage, setCurrentLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { isTouching, touchProps } = useTouchFeedback()

  // 防止背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/cases', label: t('nav.cases') },
    { href: '/news', label: t('nav.news') },
    { href: '/contact', label: t('nav.contact') },
  ]

  return (
    <>
      {/* 漢堡選單按鈕 */}
      <button
        className="lg:hidden relative z-50 p-2 rounded-lg transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        {...touchProps}
        style={{
          transform: isTouching ? 'scale(0.95)' : 'scale(1)',
          backgroundColor: isTouching ? 'rgba(0,0,0,0.1)' : 'transparent'
        }}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <span 
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </div>
      </button>

      {/* 背景遮罩 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 選單內容 */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 relative group">
              <Image
                src="/images/MISS.webp"
                alt="覓食 MISS Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {/* 裝飾性光暈效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <p className="text-center text-gray-600 text-sm">覓食國際餐飲企業有限公司</p>
          </div>

          {/* 選單項目 */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-4 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 語言切換器 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
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
                      setCurrentLanguage(language.code as 'zh-TW' | 'en');
                      setIsOpen(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentLanguage === language.code
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                    }`}
                  >
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA 按鈕 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/contact"
              className="block w-full bg-primary-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-700 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.consultation')}
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
