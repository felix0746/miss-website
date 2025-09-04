import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 關閉Vercel的預設行為
  poweredByHeader: false,
  
  // 性能優化
  experimental: {
    optimizePackageImports: ['framer-motion'],
    optimizeCss: true,
  },
  
  // 圖片優化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 壓縮和優化
  compress: true,
  
  // 編譯優化
  swcMinify: true,
};

export default nextConfig;
