'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface LanguageData {
  [key: string]: any;
}

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  t: (key: string) => string;
  languageData: LanguageData;
  isLoading: boolean;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function ClientTranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState('zh-TW');
  const [languageData, setLanguageData] = useState<LanguageData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'zh-TW';
    setCurrentLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    async function loadLanguageData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/locales/${currentLanguage}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${currentLanguage}.json`);
        }
        const data = await response.json();
        setLanguageData((prevData) => ({ ...prevData, [currentLanguage]: data }));
        document.documentElement.lang = currentLanguage;
      } catch (error) {
        console.error('Error loading language data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadLanguageData();
  }, [currentLanguage]);

  const setCurrentLanguage = (language: string) => {
    localStorage.setItem('language', language);
    setCurrentLanguageState(language);
  };

  const t = (key: string) => {
    if (isLoading || !languageData[currentLanguage]) {
      return key; // 或者返回一個加載中的提示
    }
    const keys = key.split('.');
    let result = languageData[currentLanguage];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key;
      }
    }
    return result || key;
  };
  
  const value = {
    currentLanguage,
    setCurrentLanguage,
    t,
    languageData,
    isLoading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
