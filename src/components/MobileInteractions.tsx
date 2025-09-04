'use client'

import { useEffect, useState } from 'react'

// 觸控回饋 Hook
export function useTouchFeedback() {
  const [isTouching, setIsTouching] = useState(false)

  const handleTouchStart = () => {
    setIsTouching(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => setIsTouching(false), 150)
  }

  return {
    isTouching,
    touchProps: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    }
  }
}

// 滑動檢測 Hook
export function useSwipeDetection(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd: onTouchEndHandler,
  }
}

// 下拉刷新 Hook
export function usePullToRefresh(onRefresh: () => void) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY
      const distance = currentY - startY
      
      if (distance > 0) {
        setIsPulling(true)
        setPullDistance(Math.min(distance * 0.5, 100))
        e.preventDefault()
      }
    }
  }

  const handleTouchEnd = () => {
    if (isPulling && pullDistance > 60) {
      onRefresh()
    }
    setIsPulling(false)
    setPullDistance(0)
    setStartY(0)
  }

  return {
    isPulling,
    pullDistance,
    touchProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  }
}
