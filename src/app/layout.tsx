import type { Metadata } from 'next'

import Header from '@/components/Header'
import { ScrollArea } from '@/components/ScrollArea'
import { Toaster } from '@/components/Toast/Toaster'

import NextAuthSessionProvider from '@/features/auth/NextAuthSessionProvider'
import ThemeProvider from '@/features/theme/ThemeProvider'

import '@/styles/index.css'

export const metadata: Metadata = {
  title: '로스트아크 레이드 매니저',
  description:
    '레이드 고정 멤버와 진행한 레이드를 기록하고 공유, 일정 관리를 할 수 있는 서비스입니다.',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthSessionProvider>
            <Toaster />

            <div id="app">
              <ScrollArea h="100vh" type="always">
                <Header />
                {children}
              </ScrollArea>
            </div>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
