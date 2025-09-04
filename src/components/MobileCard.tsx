'use client'

import { ReactNode } from 'react'
import { useTouchFeedback } from './MobileInteractions'

interface MobileCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function MobileCard({ 
  children, 
  className = '', 
  onClick,
  disabled = false 
}: MobileCardProps) {
  const { isTouching, touchProps } = useTouchFeedback()

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      {...touchProps}
      style={{
        transform: isTouching && !disabled ? 'scale(0.98)' : 'scale(1)',
        backgroundColor: isTouching && !disabled ? 'rgba(0,0,0,0.02)' : 'transparent'
      }}
    >
      {/* 觸控回饋效果 */}
      {isTouching && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 animate-pulse" />
      )}
      
      {/* 內容 */}
      <div className="relative z-10">
        {children}
      </div>

      {/* 觸控指示器 */}
      {!disabled && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-500/30 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      )}
    </div>
  )
}
