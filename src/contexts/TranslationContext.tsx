'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// A more precise type for nested translation objects that allows arrays
type NestedTranslations = {
  [key: string]: string | NestedTranslations | unknown[];
};

interface LanguageData {
  [key: string]: NestedTranslations;
}

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  t: (key: string) => string;
  languageData: LanguageData;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState('zh-TW');
  const [languageData, setLanguageData] = useState<LanguageData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On mount, read language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'zh-TW';
    setCurrentLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    async function loadLanguageData() {
      if (!currentLanguage) return;
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

  const t = (key: string): string => {
    if (isLoading || !languageData[currentLanguage]) {
      return key;
    }
    try {
      const keys = key.split('.');
      let result: string | NestedTranslations | unknown[] | undefined = languageData[currentLanguage];
      for (const k of keys) {
        // We only want to traverse objects, not arrays or strings
        if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
          result = (result as NestedTranslations)[k];
        } else {
          // If it's not a traversable object, we can't go deeper.
          return key;
        }

        if (result === undefined) {
          return key;
        }
      }
      // At the end, we expect a string.
      return typeof result === 'string' ? result : key;
    } catch {
      return key;
    }
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

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
