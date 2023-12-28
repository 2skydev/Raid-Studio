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

  const hasRequireData = user?.profile?.nickname && user?.profile?.main_character_name
  const isNeedRedirect = user && !hasRequireData && pathname !== '/register/steps'

  useEffect(() => {
    if (isNeedRedirect) router.replace('/register/steps')
  }, [isNeedRedirect])

  if (isNeedRedirect) return null

  return children
}

export default RedirectRegisterPage
