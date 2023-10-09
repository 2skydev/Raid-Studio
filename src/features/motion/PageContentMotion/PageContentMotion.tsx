'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface PageContentMotionProps {
  className?: string
  children?: ReactNode
}

const PageContentMotion = ({ className, children }: PageContentMotionProps) => {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

export default PageContentMotion
