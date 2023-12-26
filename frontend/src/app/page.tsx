'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import BackgroundAnimation from '@/components/BackgroundAnimation'

import SignInDiscordButton from '@/features/auth/SignInDiscordButton'
import SignInTestUserButton from '@/features/auth/SignInTestUserButton'
import PageContentMotion from '@/features/motion/PageContentMotion'

import useAuth from '@/hooks/useAuth'

const Home = () => {
  const [mounted, setMounted] = useState(false)

  const { user } = useAuth()

  useEffect(() => setMounted(true), [])

  return (
    <PageContentMotion>
      <BackgroundAnimation />

      <div className="container relative pt-20">
        <h1 className="font-aquatico text-4xl">Raid Studio</h1>

        <p className="mt-6">
          로스트아크 고정 파티원, 길드원 등 팀을 만들어 레이드 진행 상황을 공유 및 일정 관리를
          도와주는 서비스입니다
        </p>

        <br />

        {mounted && user ? (
          <Button asChild>
            <Link href="/studio/my/characters">Studio로 이동</Link>
          </Button>
        ) : (
          <div className="flex gap-2">
            <SignInDiscordButton />
            <SignInTestUserButton />
          </div>
        )}
      </div>
    </PageContentMotion>
  )
}

export default Home
