'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const { currentLanguage, setCurrentLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const languages = [
    { code: 'zh-TW', name: '繁體中文', countryCode: 'TW', flag: '🇹🇼' },
    { code: 'en', name: 'English', countryCode: 'US', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  // 監聽語言變化事件
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    setIsOpen(false);
  };

  // 手機版直接切換語言
  const handleMobileToggle = () => {
    const nextLanguage = currentLanguage === 'zh-TW' ? 'en' : 'zh-TW';
    setCurrentLanguage(nextLanguage);
  };

  // 手機版渲染
  if (isMobile) {
    return (
      <button
        onClick={handleMobileToggle}
        className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-red-600 transition-all duration-200 rounded-md hover:bg-gray-100 hover:shadow-sm"
        aria-label="切換語言"
      >
        <Globe className="w-4 h-4" />
      </button>
    );
  }

  // 桌面版渲染
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 text-gray-700 hover:text-red-600 transition-all duration-200 rounded-md hover:bg-gray-100 hover:shadow-sm"
        aria-label="切換語言"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium">
          {currentLang?.countryCode || 'TW'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 relative ${
                currentLanguage === language.code 
                  ? 'bg-red-50 text-red-600 font-medium border-l-2 border-red-500' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:border-l-2 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
