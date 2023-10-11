'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { css } from '@styled-system/css'
import { Container, Divider, Flex } from '@styled-system/jsx'

import Button from '@/components/Button'
import { ScrollArea } from '@/components/ScrollArea'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'

const sideMenuItems = [
  {
    title: '프로필',
    url: '/my/profile',
  },
  {
    title: '대표 캐릭터',
    url: '/my/character',
  },
  {
    title: '팀',
    url: '/my/team',
  },
]

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <LayoutScaleMotion className={css({ h: 'mainHeight' })}>
      <Container py="8" h="full">
        <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>내 설정</h1>

        <p className={css({ color: 'muted.foreground' })}>
          내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
        </p>

        <Divider my="6" borderColor="border" />

        <Flex spaceX="12">
          <aside
            className={css({
              w: '64',
              display: 'flex',
              flexDir: 'column',
              spaceY: '1',
              mx: '-4',
            })}
          >
            {sideMenuItems.map(item => (
              <Button
                key={item.title}
                justifyContent="start"
                variant="link"
                className={css({
                  bg: item.url === pathname ? 'muted' : undefined,
                })}
                asChild
              >
                <Link href={item.url}>{item.title}</Link>
              </Button>
            ))}
          </aside>

          <div
            className={css({
              flex: 1,
              h: 'calc(token(sizes.mainHeight) - 10rem)',
              overflow: 'hidden',
            })}
          >
            <PageContentMotion
              key={pathname}
              className={css({
                w: 'full',
                h: 'full',
              })}
            >
              <ScrollArea w="full" h="full">
                <div className={css({ w: '2xl', pb: '10', px: '2.5' })}>{children}</div>
              </ScrollArea>
            </PageContentMotion>
          </div>
        </Flex>
      </Container>
    </LayoutScaleMotion>
  )
}

export default MyLayout
