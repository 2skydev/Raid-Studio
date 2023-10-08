'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

export interface NextAuthSessionProviderProps {
  children?: ReactNode
}

const NextAuthSessionProvider = ({ children }: NextAuthSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
