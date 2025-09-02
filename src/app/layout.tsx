import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '覓食 MISS - 餐飲顧問｜品牌規劃｜商業設計｜整合行銷',
  description: '覓食 (MISS) - 您的餐飲事業最佳夥伴。我們提供專業的餐飲顧問、品牌規劃、商業設計與整合行銷服務，協助您的品牌從理想到落地，創造無限可能。',
  keywords: '餐飲顧問,品牌規劃,商業設計,整合行銷,餐廳管理,台灣美食,覓食,MISS',
  authors: [{ name: '覓食國際餐飲企業有限公司' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://miss-blog-backend-92eb6.web.app/',
    title: '覓食 MISS - 餐飲顧問專家',
    description: '專業餐飲顧問服務，提供品牌規劃、商業設計與整合行銷，助您的餐飲事業邁向成功。',
    siteName: '覓食 MISS',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: '覓食 MISS - 餐飲顧問專家',
    description: '專業餐飲顧問服務，提供品牌規劃、商業設計與整合行銷，助您的餐飲事業邁向成功。',
  },
  alternates: {
    canonical: 'https://miss-blog-backend-92eb6.web.app/',
    languages: {
      'zh-TW': 'https://miss-blog-backend-92eb6.web.app/',
    },
  },
  verification: {
    google: 'CfkGRGCzoLRHKrj1PkdQCZ0Y0zoReg8jrmdHu7GOGLs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
