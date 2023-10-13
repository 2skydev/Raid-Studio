import type { Metadata } from 'next'

import { css } from '@styled-system/css'

import Header from '@/components/Header'
import { ScrollArea } from '@/components/ScrollArea'

import Providers from '@/app/providers'
import AquaticoFont from '@/assets/fonts/Aquatico'
import PretendardFont from '@/assets/fonts/Pretendard'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'RAID STUDIO',
  description:
    '레이드 고정 멤버와 진행한 레이드를 기록하고 공유, 일정 관리를 할 수 있는 서비스입니다.',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ko"
      className={`${PretendardFont.variable} ${AquaticoFont.variable}`}
      suppressHydrationWarning
    >
      <body className={css({ fontFamily: 'pretendard' })}>
        <Providers>
          <div id="app">
            <ScrollArea h="100vh" type="always">
              <Header />

              {children}
            </ScrollArea>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
