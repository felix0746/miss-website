import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/mobile-optimization.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import MobilePerformanceOptimizer from '@/components/MobilePerformanceOptimizer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 優化字體載入
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  // 標題範本，%s 會被子頁面的標題取代
  title: {
    template: '%s | 覓食 MISS - 您的餐飲事業最佳夥伴',
    default: '覓食 MISS - 餐飲顧問｜品牌規劃｜商業設計｜整合行銷', // 預設標題
  },
  description: '覓食 (MISS) - 您的餐飲事業最佳夥伴。我們提供專業的餐飲顧問、品牌規劃、商業設計與整合行銷服務，協助您的品牌從理想到落地，創造無限可能。',
  keywords: ['餐飲顧問', '品牌規劃', '商業設計', '整合行銷', '餐廳管理', '菜單設計', '空間設計', '人力資源', '覓食', 'MISS'],
  authors: [{ name: '覓食國際餐飲企業有限公司', url: 'https://miss-website-nextjs-psi.vercel.app/' }],
  creator: '覓食國際餐飲企業有限公司',
  publisher: '覓食國際餐飲企業有限公司',

  // 網站圖示
  icons: {
    icon: '/miss-favicon.webp',
    shortcut: '/miss-favicon.webp',
    apple: '/miss-favicon.webp',
  },
  
  // Open Graph (社群分享)
  openGraph: {
    type: 'website',
    url: 'https://miss-website-nextjs-psi.vercel.app/', // 您的新網站 URL
    title: '覓食 MISS - 您的餐飲事業最佳夥伴',
    description: '專業餐飲顧問服務，提供品牌規劃、商業設計與整合行銷，助您的餐飲事業邁向成功。',
    siteName: '覓食 MISS',
    locale: 'zh_TW',
    images: [
      {
        url: 'https://miss-website-nextjs-psi.vercel.app/og-image.png', // 建議建立一個 1200x630 的圖片
        width: 1200,
        height: 630,
        alt: '覓食 MISS - 餐飲顧問',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '覓食 MISS - 您的餐飲事業最佳夥伴',
    description: '專業餐飲顧問服務，提供品牌規劃、商業設計與整合行銷，助您的餐飲事業邁向成功。',
    images: ['https://miss-website-nextjs-psi.vercel.app/twitter-image.png'], // 建議建立一個 1200x675 的圖片
    creator: '@MISS_Consulting', // 您的 Twitter 帳號
  },

  // 搜尋引擎指令
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 標準 URL
  alternates: {
    canonical: 'https://miss-website-nextjs-psi.vercel.app/',
    languages: {
      'zh-TW': 'https://miss-website-nextjs-psi.vercel.app/',
    },
  },

  // Google Search Console 驗證
  verification: {
    google: 'wry9ix6DEHAyH4l-rcrpVhbVGC8mXgO_hFMEOj412BI',
  },

  // 讓 PWA (漸進式網路應用) 體驗更好
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hero Section Styles */
          .hero-text { font-size: 2.25rem; font-weight: 800; color: white; }
          @media (min-width: 640px) { .hero-text { font-size: 3rem; } }
          @media (min-width: 1024px) { .hero-text { font-size: 4rem; } }
          /* Section Title Styles */
          .section-title { font-size: 1.875rem; font-weight: 700; }
          @media (min-width: 768px) { .section-title { font-size: 2.25rem; } }
          /* Primary Button Styles */
          .primary-button { 
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 0.5rem;
            background-color: #4f46e5; 
            color: white;
            transition: background-color 0.2s;
          }
          .primary-button:hover { background-color: #4338ca; }
        ` }} />
      </head>
      <body 
        className={`${inter.className} bg-gray-50 antialiased`}
        suppressHydrationWarning
      >
        <PerformanceMonitor />
        <MobilePerformanceOptimizer />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
