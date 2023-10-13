'use client'

import { usePathname } from 'next/navigation'

import { css } from '@styled-system/css'
import { Container, Divider } from '@styled-system/jsx'

import { ScrollArea } from '@/components/ScrollArea'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'

const SquadLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <LayoutScaleMotion className={css({ h: 'mainHeight' })}>
      <Container py="8" h="full">
        <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>전체 공격대 목록</h1>

        <p className={css({ fontWeight: '500', color: 'muted.foreground' })}>
          여기서 모든 공격대 목록, 공격대 생성, 공격대 참여 등을 할 수 있습니다
        </p>

        <Divider my="6" borderColor="border" />

        <PageContentMotion key={pathname}>
          <div className={css({ pb: '10', px: '2.5' })}>{children}</div>
        </PageContentMotion>
      </Container>
    </LayoutScaleMotion>
  )
}

export default SquadLayout
