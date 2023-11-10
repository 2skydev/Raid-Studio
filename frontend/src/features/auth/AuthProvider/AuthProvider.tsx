'use client'

import { ReactNode, useEffect } from 'react'

import { useAtom } from 'jotai'
import { Loader2Icon } from 'lucide-react'

import { css } from '@styled-system/css'

import { userAtom } from '@/stores/userAtom'

export interface AuthProviderProps {
  children?: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useAtom(userAtom)

  if (currentUser === undefined)
    return (
      <div
        className={css({
          w: '100vw',
          h: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Loader2Icon className={css({ animation: 'spin' })} />
      </div>
    )

  return children
}

export default AuthProvider
