import clsx from 'clsx'
import Link from 'next/link'

import { css } from '@styled-system/css'
import { Container } from '@styled-system/jsx'
import { h1, p } from '@styled-system/recipes'

import BackgroundAnimation from '@/components/BackgroundAnimation'
import Button from '@/components/Button'

import SignInDiscordButton from '@/features/auth/SignInDiscordButton'
import PageContentMotion from '@/features/motion/PageContentMotion'

import { getServerSession } from '@/libs/auth'

const Home = async () => {
  const session = await getServerSession()

  return (
    <PageContentMotion>
      <BackgroundAnimation />

      <Container pt="20">
        <h1 className={clsx(h1(), css({ fontFamily: 'aquatico' }))}>Raid Studio</h1>

        <p className={p()}>
          로스트아크 고정 파티원, 길드원 등 팀을 만들어 레이드 진행 상황을 공유 및 일정 관리를
          도와주는 서비스입니다
        </p>

        <br />

        {Boolean(session) ? (
          <Button asChild>
            <Link href="/studio/characters">Studio로 이동</Link>
          </Button>
        ) : (
          <SignInDiscordButton />
        )}
      </Container>
    </PageContentMotion>
  )
}

export default Home
