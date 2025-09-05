'use client';

import { useSimpleTranslation as useTranslation } from '@/hooks/useSimpleTranslation'

// 強制動態渲染，避免服務端預渲染問題
export const dynamic = 'force-dynamic'

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">覓食 MISS</h1>
        <p className="text-center text-gray-600 text-lg">
          餐飲顧問專家 - 測試翻譯功能: {t('nav.home')}
        </p>
      </div>
    </main>
  )
}
