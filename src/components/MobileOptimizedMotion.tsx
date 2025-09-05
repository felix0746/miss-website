'use client';

import { motion, MotionProps, type Transition } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

interface MobileOptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  // 手機版是否啟用動畫
  disableOnMobile?: boolean;
  // 簡化的動畫配置
  simpleAnimation?: boolean;
}

export default function MobileOptimizedMotion({
  children,
  className,
  disableOnMobile = false,
  simpleAnimation = false,
  ...props
}: MobileOptimizedMotionProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // 在手機版且禁用動畫時，返回普通div
  if (isMobile && disableOnMobile) {
    return <div className={className}>{children}</div>;
  }

  // 簡化動畫配置（手機版優化）
  const optimizedProps: MotionProps = isMobile && simpleAnimation ? {
    ...props,
    transition: {
      duration: 0.3, // 更短的動畫時間
      ease: "easeOut"
    } as Transition,
    // 減少複雜的動畫效果
    whileHover: undefined,
    whileTap: undefined,
  } : props;

  return (
    <motion.div className={className} {...optimizedProps}>
      {children}
    </motion.div>
  );
}
