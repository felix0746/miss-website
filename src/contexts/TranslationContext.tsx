import { ReactNode, createContext, useContext } from 'react';

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

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  // 伺服器端永遠使用預設語言
  const serverContextValue: TranslationContextType = {
    currentLanguage: 'zh-TW',
    setCurrentLanguage: () => {}, // 伺服器端不需要這個功能
    t: (key: string) => key, // 伺服器端直接返回 key
    languageData: {},
    isLoading: true, // 在伺服器端永遠是加載中狀態
  };

  return (
    <TranslationContext.Provider value={serverContextValue}>
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
