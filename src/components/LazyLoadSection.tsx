'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, type TargetAndTransition, type Transition } from 'framer-motion';

interface LazyLoadSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  // 手機版優化
  disableOnMobile?: boolean;
  // 動畫配置
  animation?: {
    initial?: TargetAndTransition | boolean;
    animate?: TargetAndTransition | boolean;
    transition?: Transition;
  };
}

export default function LazyLoadSection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  disableOnMobile = false,
  animation = {
    initial: { opacity: 0, y: 20 } as TargetAndTransition,
    animate: { opacity: 1, y: 0 } as TargetAndTransition,
    transition: { duration: 0.5 } as Transition
  }
}: LazyLoadSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 檢測是否為手機版
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 載入後停止觀察
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // 手機版且禁用動畫時，直接顯示內容
  if (isMobile && disableOnMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <motion.div
          initial={animation.initial}
          animate={animation.animate}
          transition={animation.transition}
        >
          {children}
        </motion.div>
      ) : (
        // 載入中的佔位符
        <div className="animate-pulse bg-gray-200 rounded h-32 w-full" />
      )}
    </div>
  );
}
