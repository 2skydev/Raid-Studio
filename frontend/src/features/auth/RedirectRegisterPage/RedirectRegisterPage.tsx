'use client'

import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next-nprogress-bar'
import { usePathname } from 'next/navigation'

import useAuth from '@/hooks/useAuth'

export interface RedirectRegisterPageProps {
  children?: ReactNode
}

const RedirectRegisterPage = ({ children }: RedirectRegisterPageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  useEffect(() => {
    if (
      user &&
      (!user.profile?.nickname || !user.profile?.main_character_name) &&
      pathname !== '/register/steps'
    ) {
      router.replace('/register/steps')
    }
  }, [user, pathname])

  if (
    user &&
    (!user.profile?.nickname || !user.profile?.main_character_name) &&
    pathname !== '/register/steps'
  )
    return null

  return children
}

export default RedirectRegisterPage
