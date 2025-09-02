'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedTag, setSelectedTag] = useState('')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState('')

  const news = [
    {
      id: 'news-1',
      title: '覓食 (MISS) 榮獲2024年台灣餐飲顧問服務優質獎',
      subtitle: '專業服務獲得肯定，持續為餐飲業者提供優質顧問服務',
      excerpt: '覓食國際餐飲企業有限公司憑藉專業的餐飲顧問服務與優異的客戶滿意度，榮獲2024年台灣餐飲顧問服務優質獎。這項殊榮肯定了我們在品牌規劃、商業設計與整合行銷等領域的專業能力...',
      content: '覓食國際餐飲企業有限公司憑藉專業的餐飲顧問服務與優異的客戶滿意度，榮獲2024年台灣餐飲顧問服務優質獎。這項殊榮肯定了我們在品牌規劃、商業設計與整合行銷等領域的專業能力。\n\n我們將持續秉持「讓覓食餐飲陪你一起成長，用台灣美食帶給人們笑容」的理念，為更多餐飲品牌提供專業服務，協助他們在競爭激烈的市場中脫穎而出。\n\n未來，覓食將繼續投入研發創新服務模式，結合數位科技與傳統餐飲智慧，為客戶創造更大的價值。',
      image: '/images/brand-story-team.webp',
      category: '公司榮譽',
      tags: ['獎項', '肯定', '專業服務'],
      author: '覓食團隊',
      publishDate: '2024-01-15',
      readTime: '3 分鐘',
      featured: true
    },
    {
      id: 'news-2',
      title: '新服務上線：餐飲品牌數位轉型顧問服務',
      subtitle: '協助傳統餐飲業者擁抱數位時代，提升競爭力',
      excerpt: '隨著數位化時代來臨，傳統餐飲業者面臨轉型挑戰。覓食推出全新的「餐飲品牌數位轉型顧問服務」，協助業者建立線上訂餐系統、社群媒體行銷策略...',
      content: '隨著數位化時代來臨，傳統餐飲業者面臨轉型挑戰。覓食推出全新的「餐飲品牌數位轉型顧問服務」，協助業者建立線上訂餐系統、社群媒體行銷策略、客戶關係管理等數位化營運模式。\n\n這項服務包含：\n• 數位化營運診斷\n• 線上訂餐系統建置\n• 社群媒體行銷策略\n• 客戶數據分析\n• 數位化員工培訓\n\n我們相信，透過數位轉型，傳統餐飲業者能夠在保持原有特色的同時，提升營運效率與客戶體驗。',
      image: '/images/service-planning.webp',
      category: '服務更新',
      tags: ['數位轉型', '新服務', '科技應用'],
      author: '產品團隊',
      publishDate: '2024-01-10',
      readTime: '5 分鐘',
      featured: false
    },
    {
      id: 'news-3',
      title: '成功案例分享：老江紅茶牛奶品牌升級成果',
      subtitle: '從單店經營到連鎖品牌的成功轉型之路',
      excerpt: '老江紅茶牛奶是我們近期完成的品牌升級專案。透過系統性的品牌重塑、視覺識別更新與連鎖擴展策略制定，成功協助老江從高雄地區的單店...',
      content: '老江紅茶牛奶是我們近期完成的品牌升級專案。透過系統性的品牌重塑、視覺識別更新與連鎖擴展策略制定，成功協助老江從高雄地區的單店經營轉型為連鎖品牌。\n\n專案成果：\n• 連鎖店數從 1 家擴展至 8 家\n• 品牌價值提升 200%\n• 營收成長 150%\n• 市場覆蓋率提升 300%\n\n這個成功案例展現了覓食在品牌升級與連鎖擴展方面的專業能力，也為其他傳統餐飲業者提供了寶貴的參考經驗。',
      image: '/images/case-logo-laojiang.webp',
      category: '成功案例',
      tags: ['品牌升級', '連鎖擴展', '成功案例'],
      author: '顧問團隊',
      publishDate: '2024-01-05',
      readTime: '4 分鐘',
      featured: false
    },
    {
      id: 'news-4',
      title: '2024年餐飲趨勢預測：健康飲食與永續發展',
      subtitle: '洞察未來餐飲市場發展方向，協助客戶提前布局',
      excerpt: '根據市場研究與消費者行為分析，2024年餐飲業將呈現健康飲食與永續發展兩大趨勢。消費者越來越重視食材來源、營養價值與環境影響...',
      content: '根據市場研究與消費者行為分析，2024年餐飲業將呈現健康飲食與永續發展兩大趨勢。消費者越來越重視食材來源、營養價值與環境影響。\n\n主要趨勢包括：\n• 植物性飲食需求增長\n• 有機與無添加食材\n• 低碳足跡餐飲\n• 包裝環保化\n• 營養標示透明化\n\n覓食將協助客戶順應這些趨勢，調整產品策略與行銷方向，在競爭中取得優勢。',
      image: '/images/service-strategy.webp',
      category: '市場趨勢',
      tags: ['趨勢預測', '健康飲食', '永續發展'],
      author: '研究團隊',
      publishDate: '2023-12-28',
      readTime: '6 分鐘',
      featured: false
    },
    {
      id: 'news-5',
      title: '覓食團隊擴編：歡迎新成員加入',
      subtitle: '強化服務能力，為客戶提供更全面的解決方案',
      excerpt: '為了提供更優質的服務，覓食近期擴編了設計團隊與顧問團隊。新成員來自知名設計公司與餐飲集團，擁有豐富的實務經驗...',
      content: '為了提供更優質的服務，覓食近期擴編了設計團隊與顧問團隊。新成員來自知名設計公司與餐飲集團，擁有豐富的實務經驗。\n\n新增團隊成員：\n• 資深品牌設計師 2 名\n• 餐飲營運顧問 1 名\n• 數位行銷專員 1 名\n• 客戶服務專員 1 名\n\n團隊擴編後，我們將能夠同時處理更多專案，為客戶提供更快速、更專業的服務。同時，多元化的專業背景也讓我們能夠從不同角度為客戶解決問題。',
      image: '/images/brand-story-team.webp',
      category: '團隊動態',
      tags: ['團隊擴編', '新成員', '服務升級'],
      author: '人資團隊',
      publishDate: '2023-12-20',
      readTime: '3 分鐘',
      featured: false
    },
    {
      id: 'news-6',
      title: '客戶回饋：蘭亭餐廳空間改造專案滿意度調查',
      subtitle: '客戶高度肯定我們的專業服務與執行能力',
      excerpt: '蘭亭餐廳空間改造專案完成後，我們進行了客戶滿意度調查。結果顯示，客戶對我們的服務給予了高度評價，特別是在設計創意...',
      content: '蘭亭餐廳空間改造專案完成後，我們進行了客戶滿意度調查。結果顯示，客戶對我們的服務給予了高度評價，特別是在設計創意、施工品質與時程控制方面。\n\n滿意度調查結果：\n• 整體滿意度：96%\n• 設計創意：98%\n• 施工品質：95%\n• 時程控制：94%\n• 溝通協調：97%\n\n這些正面回饋激勵我們持續精進服務品質，為更多客戶創造滿意的成果。',
      image: '/images/case-logo-lanting.webp',
      category: '客戶回饋',
      tags: ['客戶滿意', '回饋調查', '服務品質'],
      author: '客戶服務團隊',
      publishDate: '2023-12-15',
      readTime: '4 分鐘',
      featured: false
    }
  ]

  const categories = ['全部', '公司榮譽', '服務更新', '成功案例', '市場趨勢', '團隊動態', '客戶回饋']
  const tags = ['獎項', '肯定', '專業服務', '數位轉型', '新服務', '科技應用', '品牌升級', '連鎖擴展', '成功案例', '趨勢預測', '健康飲食', '永續發展', '團隊擴編', '新成員', '服務升級', '客戶滿意', '回饋調查', '服務品質']

  // 篩選邏輯
  const filteredNews = news.filter(newsItem => {
    const categoryMatch = selectedCategory === '全部' || newsItem.category === selectedCategory
    const tagMatch = selectedTag === '' || newsItem.tags.includes(selectedTag)
    return categoryMatch && tagMatch
  })

  // 訂閱處理函數
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setSubscriptionMessage('請輸入電子郵件地址')
      return
    }
    
    setIsSubscribing(true)
    setSubscriptionMessage('')
    
    // 模擬訂閱處理
    setTimeout(() => {
      setIsSubscribing(false)
      setSubscriptionMessage('訂閱成功！感謝您的支持')
      setEmail('')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            覓食消息
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            掌握覓食 (MISS) 的最新動態、服務更新、成功案例與市場趨勢，了解餐飲產業的最新發展
          </p>
        </div>
      </section>

      {/* Featured News */}
      {news.filter(item => item.featured).map(featuredNews => (
        <section key={featuredNews.id} className="py-8 sm:py-12 bg-white">
          <div className="container">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 sm:p-8 lg:p-12 overflow-hidden relative">
              {/* Background Watermark */}
              <div className="absolute top-0 right-0 opacity-5 z-0">
                <Image
                  src="/images/miss-logo-watermark.webp"
                  alt=""
                  width={200}
                  height={200}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
              </div>
              
              <div className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        精選消息
                      </span>
                      <span className="text-sm text-gray-600">{featuredNews.publishDate}</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {featuredNews.title}
                    </h2>
                    
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>作者：{featuredNews.author}</span>
                      <span>閱讀時間：{featuredNews.readTime}</span>
                    </div>
                    
                    <Link
                      href={`/news/${featuredNews.id}`}
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
                    >
                      閱讀全文
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Filter Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">依分類篩選</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">依標籤篩選</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                    selectedTag === ''
                      ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                  }`}
                >
                  全部
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-secondary-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-secondary-100 hover:text-secondary-700 hover:shadow-sm'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Filter Status */}
          {(selectedCategory !== '全部' || selectedTag !== '') && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="text-gray-600">目前篩選：</span>
                {selectedCategory !== '全部' && (
                  <span className="inline-flex items-center gap-1 bg-primary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('全部')}
                      className="ml-1 hover:bg-primary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag !== '' && (
                  <span className="inline-flex items-center gap-1 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
                    #{selectedTag}
                    <button
                      onClick={() => setSelectedTag('')}
                      className="ml-1 hover:bg-secondary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('全部')
                    setSelectedTag('')
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm transition-colors"
                >
                  清除所有篩選
                </button>
              </div>
            </div>
          )}
          
          {filteredNews.filter(item => !item.featured).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredNews.filter(item => !item.featured).map((newsItem) => (
              <article key={newsItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                {/* News Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {newsItem.category}
                    </span>
                  </div>
                </div>

                {/* News Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                    <span>{newsItem.publishDate}</span>
                    <span>•</span>
                    <span>{newsItem.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-tight">
                    {newsItem.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium leading-tight">
                    {newsItem.subtitle}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {newsItem.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {newsItem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">作者：{newsItem.author}</span>
                    <Link
                      href={`/news/${newsItem.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base transition-colors"
                    >
                      閱讀全文 →
                    </Link>
                  </div>
                </div>
              </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                找不到符合條件的消息
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                請嘗試調整篩選條件，或瀏覽其他類型的消息
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('全部')
                  setSelectedTag('')
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                清除篩選
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                更多精彩內容即將推出
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                我們正在準備更多有價值的餐飲業資訊、成功案例分享與市場趨勢分析，敬請期待！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            訂閱覓食消息
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
            第一時間掌握最新消息、服務更新與市場趨勢，讓您的餐飲事業與時俱進
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="輸入您的電子郵件"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-white text-primary-600 hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500 px-6 py-3 rounded-lg font-semibold transition-colors min-h-[44px] sm:min-h-[48px] whitespace-nowrap"
                >
                  {isSubscribing ? '訂閱中...' : '訂閱'}
                </button>
              </div>
              {subscriptionMessage && (
                <p className={`text-sm ${subscriptionMessage.includes('成功') ? 'text-green-200' : 'text-red-200'}`}>
                  {subscriptionMessage}
                </p>
              )}
              <p className="text-xs text-primary-100">
                我們尊重您的隱私，不會向第三方分享您的資訊
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
