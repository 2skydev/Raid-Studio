'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface SidebarMotionProps {
  className?: string
  children?: ReactNode
}

const SidebarMotion = ({ className, children }: SidebarMotionProps) => {
  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.aside>
  )
}

export default SidebarMotion
