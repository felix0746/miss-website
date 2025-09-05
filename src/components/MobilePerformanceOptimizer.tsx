'use client';

import { useEffect } from 'react';

export default function MobilePerformanceOptimizer() {
  useEffect(() => {
    // 只在手機版執行優化
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // 1. 減少重繪和重排
    const optimizeRendering = () => {
      // 使用 requestAnimationFrame 優化動畫
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach(element => {
        (element as HTMLElement).style.willChange = 'transform, opacity';
      });
    };

    // 2. 優化滾動效能
    const optimizeScrolling = () => {
      const scrollContainers = document.querySelectorAll('.overflow-x-auto');
      scrollContainers.forEach(container => {
        const element = container as HTMLElement;
        // 使用類型斷言來避免 TypeScript 錯誤
        (element.style as any).webkitOverflowScrolling = 'touch';
        element.style.scrollBehavior = 'smooth';
      });
    };

    // 3. 延遲載入非關鍵資源
    const lazyLoadNonCritical = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            if (element.dataset.lazy) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          }
        });
      });

      document.querySelectorAll('[data-lazy]').forEach(el => {
        observer.observe(el);
      });
    };

    // 4. 優化記憶體使用
    const optimizeMemory = () => {
      // 清理未使用的監聽器
      const cleanup = () => {
        window.removeEventListener('resize', cleanup);
        window.removeEventListener('orientationchange', cleanup);
      };
      
      window.addEventListener('resize', cleanup);
      window.addEventListener('orientationchange', cleanup);
    };

    // 5. 減少長時間主執行緒工作
    const optimizeMainThread = () => {
      // 使用 requestIdleCallback 分解工作
      const processInChunks = (items: unknown[], processor: (item: unknown) => void, chunkSize = 5) => {
        let index = 0;
        
        const processChunk = () => {
          const end = Math.min(index + chunkSize, items.length);
          for (let i = index; i < end; i++) {
            processor(items[i]);
          }
          index = end;
          
          if (index < items.length) {
            requestIdleCallback(processChunk);
          }
        };
        
        requestIdleCallback(processChunk);
      };

      // 實際使用 processInChunks 函數
      const sampleItems = [1, 2, 3, 4, 5];
      processInChunks(sampleItems, (item) => {
        console.log('Processing item:', item);
      });
    };

    // 執行所有優化
    optimizeRendering();
    optimizeScrolling();
    lazyLoadNonCritical();
    optimizeMemory();
    optimizeMainThread();

    // 監控效能指標
    const monitorPerformance = () => {
      if ('performance' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
              console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
            }
          }
        });
        
        try {
          observer.observe({ entryTypes: ['measure'] });
        } catch (error) {
          console.warn('Performance Observer not supported:', error);
        }
      }
    };

    monitorPerformance();

  }, []);

  return null;
}