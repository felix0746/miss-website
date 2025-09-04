import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 關閉Vercel的預設行為
  poweredByHeader: false,
  
  // 性能優化
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  
  // 圖片優化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // 壓縮
  compress: true,
};

export default nextConfig;
