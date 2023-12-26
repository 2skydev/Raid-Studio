'use client'

import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

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

  if (!mounted) return <Skeleton className="size-9" />

  return (
    <Button
      onClick={toggleTheme}
      className={clsx('ThemeToggleButton', 'size-9 p-0', className)}
      variant="ghost"
    >
      {resolvedTheme === 'light' ? <SunIcon size="1.2rem" /> : <MoonIcon size="1.2rem" />}
    </Button>
  )
}

export default ThemeToggleButton
