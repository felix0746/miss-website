'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export default function AnimatedText({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.1
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
        staggerChildren: stagger
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
