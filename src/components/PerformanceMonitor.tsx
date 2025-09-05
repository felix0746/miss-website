'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // 只在生產環境和手機版監控
    if (process.env.NODE_ENV !== 'production') return;
    
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // 監控 Core Web Vitals
    const reportWebVitals = (metric: { name: string; value: number }) => {
      const metrics: PerformanceMetrics = {};
      
      switch (metric.name) {
        case 'LCP':
          metrics.lcp = metric.value;
          break;
        case 'FID':
          metrics.fid = metric.value;
          break;
        case 'CLS':
          metrics.cls = metric.value;
          break;
        case 'FCP':
          metrics.fcp = metric.value;
          break;
        case 'TTFB':
          metrics.ttfb = metric.value;
          break;
      }

      // 發送到分析服務（這裡只是console.log，實際可以發送到Google Analytics等）
      if (Object.keys(metrics).length > 0) {
        console.log('Mobile Performance Metrics:', metrics);
        
        // 可以發送到分析服務
        // gtag('event', 'web_vitals', metrics);
      }
    };

    // 監控資源載入時間
    const monitorResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => 
        resource.duration > 1000 // 超過1秒的資源
      );
      
      if (slowResources.length > 0) {
        console.warn('Slow loading resources on mobile:', slowResources);
      }
    };

    // 監控記憶體使用
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Record<string, unknown>).memory as {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
        const memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        };
        
        if (memoryUsage.used / memoryUsage.limit > 0.8) {
          console.warn('High memory usage on mobile:', memoryUsage);
        }
      }
    };

    // 延遲監控，避免影響初始載入
    setTimeout(() => {
      monitorResourceTiming();
      monitorMemory();
    }, 5000);

    // 監控頁面可見性變化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 頁面隱藏時暫停動畫
        document.body.style.animationPlayState = 'paused';
      } else {
        // 頁面顯示時恢復動畫
        document.body.style.animationPlayState = 'running';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // 這個組件不渲染任何內容
}
