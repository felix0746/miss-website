'use client';

import { useState, useEffect } from 'react';

// A more precise type for nested translation objects that allows arrays
type NestedTranslations = {
  [key: string]: string | NestedTranslations | unknown[];
};

interface LanguageData {
  [key: string]: NestedTranslations;
}

let globalLanguageData: LanguageData = {};
let globalCurrentLanguage = 'zh-TW';
let globalIsLoading = true;

export function useSimpleTranslation() {
  const [currentLanguage, setCurrentLanguageState] = useState(globalCurrentLanguage);
  const [languageData, setLanguageData] = useState<LanguageData>(globalLanguageData);
  const [isLoading, setIsLoading] = useState(globalIsLoading);

  useEffect(() => {
    // 確保只在客戶端環境中執行
    if (typeof window === 'undefined') return;
    
    // 從 localStorage 讀取語言設定
    const savedLanguage = localStorage.getItem('language') || 'zh-TW';
    if (savedLanguage !== globalCurrentLanguage) {
      globalCurrentLanguage = savedLanguage;
      setCurrentLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // 確保只在客戶端環境中執行
    if (typeof window === 'undefined') return;
    
    async function loadLanguageData() {
      if (!currentLanguage) return;
      setIsLoading(true);
      globalIsLoading = true;
      
      try {
        // 檢查是否已經加載過這個語言的數據
        if (globalLanguageData[currentLanguage]) {
          setLanguageData(globalLanguageData);
          setIsLoading(false);
          globalIsLoading = false;
          return;
        }

        const response = await fetch('/languages.json');
        if (!response.ok) {
          throw new Error('Failed to load languages.json');
        }
        const allLanguageData = await response.json();
        const data = allLanguageData[currentLanguage];
        
        globalLanguageData = { ...globalLanguageData, [currentLanguage]: data };
        setLanguageData(globalLanguageData);
        
        document.documentElement.lang = currentLanguage;
      } catch (error) {
        console.error('Error loading language data:', error);
      } finally {
        setIsLoading(false);
        globalIsLoading = false;
      }
    }
    
    loadLanguageData();
  }, [currentLanguage]);

  const setCurrentLanguage = (language: string) => {
    // 確保只在客戶端環境中執行
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
    globalCurrentLanguage = language;
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
        if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
          result = (result as NestedTranslations)[k];
        } else {
          return key;
        }
        if (result === undefined) {
          return key;
        }
      }
      return typeof result === 'string' ? result : key;
    } catch {
      return key;
    }
  };

  return {
    currentLanguage,
    setCurrentLanguage,
    t,
    languageData,
    isLoading,
  };
}
