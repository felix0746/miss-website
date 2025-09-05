'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const { currentLanguage, setCurrentLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'zh-TW', name: '繁體中文', countryCode: 'TW', flag: '🇹🇼' },
    { code: 'en', name: 'English', countryCode: 'US', flag: '🇺🇸' }
  ];

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
        className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
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
        className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
        aria-label="切換語言"
      >
        <Globe className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-3 py-2 text-left text-sm transition-colors duration-200 ${
                currentLanguage === language.code 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50'
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
