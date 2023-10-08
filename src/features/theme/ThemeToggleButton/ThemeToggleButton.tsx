'use client'

import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import Button from '@/components/Button'
import Skeleton from '@/components/Skeleton'

export interface ThemeToggleButtonProps {
  className?: string
}

const ThemeToggleButton = ({ className }: ThemeToggleButtonProps) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  if (!mounted) return <Skeleton w="9" h="9" />

  return (
    <Button
      onClick={toggleTheme}
      className={clsx('ThemeToggleButton', className)}
      variant="ghost"
      w="9"
      h="9"
      p="0"
    >
      {resolvedTheme === 'light' ? <SunIcon size="1.2rem" /> : <MoonIcon size="1.2rem" />}
    </Button>
  )
}

export default ThemeToggleButton
