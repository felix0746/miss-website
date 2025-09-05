'use client'

// 強制動態渲染，避免服務端預渲染問題
export const dynamic = 'force-dynamic'

export default function Cases() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">案例展示</h1>
        <p className="text-center text-gray-600">
          這是一個最簡化的案例頁面，用於測試部署。
        </p>
      </div>
    </main>
  )
}
