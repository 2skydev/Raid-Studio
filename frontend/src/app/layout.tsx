import type { Metadata } from 'next'

import { ScrollArea } from '@/components/ui/scroll-area'

import Header from '@/components/Header'

import RedirectRegisterPage from '@/features/auth/RedirectRegisterPage'

import Providers from '@/app/providers'
import AquaticoFont from '@/assets/fonts/Aquatico'
import PretendardFont from '@/assets/fonts/Pretendard'
import '@/styles/global.css'

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
      <body className="font-pretendard">
        <Providers>
          <RedirectRegisterPage>
            <div id="app">
              <ScrollArea className="h-screen" type="always">
                <Header />
                {children}
              </ScrollArea>
            </div>
          </RedirectRegisterPage>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
