'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Record<string, any>;
}

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  t: (key: string) => string;
  languageData: LanguageData;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('zh-TW');
  const [languageData, setLanguageData] = useState<LanguageData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 從 localStorage 讀取保存的語言設定
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // 載入語言資料
    fetch('/languages.json')
      .then(response => response.json())
      .then(data => {
        setLanguageData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading language data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // 保存語言設定到 localStorage
    localStorage.setItem('selectedLanguage', currentLanguage);
    // 更新 HTML lang 屬性
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = (key: string): string => {
    if (isLoading || !languageData[currentLanguage]) {
      return key; // Return key if data is loading or not available
    }

    try {
      // Use reduce to safely traverse the nested object path
      const value = key.split('.').reduce((obj, k) => {
        if (obj && typeof obj === 'object' && k in obj) {
          // Move to the next level in the object
          return (obj as any)[k];
        }
        // If at any point the key is not found, throw an error to exit
        throw new Error(`Translation key not found: ${key}`);
      }, languageData[currentLanguage]);

      // If the final value is a string, return it, otherwise return the key
      return typeof value === 'string' ? value : key;
    } catch (error) {
      // If the key path is invalid, return the original key
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setCurrentLanguage,
      t,
      languageData,
      isLoading
    }}>
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
