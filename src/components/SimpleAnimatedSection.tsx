'use client'

import { ReactNode } from 'react'

interface SimpleAnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function SimpleAnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: SimpleAnimatedSectionProps) {
  const directionClasses = {
    up: 'animate-fade-in-up',
    down: 'animate-fade-in-down',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right'
  }

  const style = {
    animationDelay: `${delay}s`
  }

  return (
    <div
      className={`${directionClasses[direction]} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
