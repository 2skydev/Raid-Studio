'use client'

import { ReactNode, useEffect } from 'react'

import { useSetAtom } from 'jotai'
import { Loader2Icon } from 'lucide-react'

import { css } from '@styled-system/css'

import useAPI from '@/hooks/useAPI'
import { User } from '@/schemas/user'
import { currentUserAtom } from '@/stores/currentUserAtom'

export interface AuthProviderProps {
  children?: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading } = useAPI<User>('/users/me')
  const setCurrentUser = useSetAtom(currentUserAtom)

  useEffect(() => {
    if (!isLoading) setCurrentUser(user || null)
  }, [user, isLoading])

  if (isLoading)
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