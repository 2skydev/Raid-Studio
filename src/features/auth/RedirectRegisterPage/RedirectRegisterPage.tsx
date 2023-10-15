'use client'

import { ReactNode } from 'react'

import { useAtomValue } from 'jotai'
import { redirect, usePathname } from 'next/navigation'

import { currentUserAtom } from '@/stores/currentUserAtom'

export interface RedirectRegisterPageProps {
  children?: ReactNode
}

const RedirectRegisterPage = ({ children }: RedirectRegisterPageProps) => {
  const pathname = usePathname()
  const user = useAtomValue(currentUserAtom)

  if (user && !pathname.startsWith('/register')) {
    if (!user.name) {
      redirect('/register/step1')
    }

    if (!user.characterName) {
      redirect('/register/step2')
    }
  }

  return children
}

export default RedirectRegisterPage
