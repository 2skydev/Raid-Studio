'use client'

import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next-nprogress-bar'

import useAuth from '@/hooks/useAuth'

export interface AuthenticatedOnlyProps {
  /**
   * 인증이 되지 않은 유저인 경우 이동할 URL
   *
   * @description 값이 없으면 router.back을 호출합니다.
   */
  replaceUrl?: string

  /**
   * 인증된 유저인 경우 렌더링할 컴포넌트
   */
  children: ReactNode
}

const AuthenticatedOnly = ({ replaceUrl, children }: AuthenticatedOnlyProps) => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      if (replaceUrl) {
        router.replace(replaceUrl)
      } else {
        router.back()
      }
    }
  }, [])

  if (!user) return null

  return children
}

export default AuthenticatedOnly
