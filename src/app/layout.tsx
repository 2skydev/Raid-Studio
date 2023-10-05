import type { Metadata } from 'next'

import ThemeProvider from '@/components/ThemeProvider'

import './globals.css'

export const metadata: Metadata = {
  title: '로스트아크 레이드 매니저',
  description:
    '레이드 고정 멤버와 진행한 레이드를 기록하고 공유, 일정 관리를 할 수 있는 서비스입니다.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
