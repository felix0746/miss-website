'use client';

import { Suspense, lazy, ComponentType, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface DynamicImportProps {
  component: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  fallback?: React.ReactNode;
  // 手機版是否延遲載入
  delayOnMobile?: boolean;
  // 延遲時間（毫秒）
  delay?: number;
}

export default function DynamicImport({
  component,
  fallback = <div className="animate-pulse bg-gray-200 rounded h-32 w-full" />,
  delayOnMobile = true,
  delay = 100
}: DynamicImportProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [shouldLoad, setShouldLoad] = useState(!isMobile || !delayOnMobile);

  useEffect(() => {
    if (isMobile && delayOnMobile) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, delayOnMobile, delay]);

  const LazyComponent = lazy(component);

  if (!shouldLoad) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
}
