'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface PageContentMotionScaleProps {
  className?: string
  children?: ReactNode
}

const PageContentScaleMotion = ({ className, children }: PageContentMotionScaleProps) => {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

export default PageContentScaleMotion
