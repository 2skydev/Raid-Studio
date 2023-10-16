'use client'

import { ReactNode, useEffect } from 'react'

import { useAtomValue } from 'jotai'
import { useRouter } from 'next-nprogress-bar'
import { usePathname } from 'next/navigation'

import { currentUserAtom } from '@/stores/currentUserAtom'

export interface RedirectRegisterPageProps {
  children?: ReactNode
}

const RedirectRegisterPage = ({ children }: RedirectRegisterPageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const user = useAtomValue(currentUserAtom)

  useEffect(() => {
    if (user && (!user.name || !user.characterName) && pathname !== '/register/steps') {
      router.replace('/register/steps')
    }
  }, [user, pathname])

  if (user && (!user.name || !user.characterName) && pathname !== '/register/steps') return null

  return children
}

export default RedirectRegisterPage
