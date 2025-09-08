import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 關閉Vercel的預設行為
  poweredByHeader: false,
  
  // 隱藏 Vercel 品牌標識
  generateEtags: false,
  
  // 性能優化
  experimental: {
    optimizePackageImports: ['framer-motion'],
    optimizeCss: true, // 啟用CSS優化
    webVitalsAttribution: ['CLS', 'LCP'], // 監控關鍵效能指標
  },
  
  // 現代瀏覽器支援
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true, // 優化樣式組件
  },
  
  // 圖片優化 - 針對手機版優化
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF優先，更好的壓縮率
    minimumCacheTTL: 31536000, // 1年快取
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 手機版優化
    unoptimized: false,
    loader: 'default',
  },
  
  // 壓縮和優化
  compress: true,
  
  // 手機版效能優化
  // swcMinify 在 Next.js 15 中已預設啟用，無需明確設定
  
  // 預載入優化
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  },
};

export default nextConfig;
