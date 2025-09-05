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
let globalUpdateTrigger = 0;

export function useSimpleTranslation() {
  const [currentLanguage, setCurrentLanguageState] = useState(globalCurrentLanguage);
  const [languageData, setLanguageData] = useState<LanguageData>(globalLanguageData);
  const [isLoading, setIsLoading] = useState(globalIsLoading);
  const [updateTrigger, setUpdateTrigger] = useState(globalUpdateTrigger);

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

  // 監聽語言變化事件
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguageState(globalCurrentLanguage);
      setLanguageData({ ...globalLanguageData });
      setIsLoading(globalIsLoading);
    };

    // 監聽自定義事件
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
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
          setLanguageData({ ...globalLanguageData });
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
        setLanguageData({ ...globalLanguageData });
        
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
    
    // 強制重新加載語言數據
    if (globalLanguageData[language]) {
      setLanguageData({ ...globalLanguageData });
    } else {
      // 如果新語言數據不存在，觸發重新加載
      setIsLoading(true);
      globalIsLoading = true;
    }
    
    // 觸發所有組件重新渲染
    globalUpdateTrigger += 1;
    setUpdateTrigger(globalUpdateTrigger);
    
    // 觸發自定義事件通知所有組件
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged'));
    }
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
