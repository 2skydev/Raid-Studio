'use client'

import { ReactNode } from 'react'

import { Provider as JotaiProvider } from 'jotai'
import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'

import { token } from '@styled-system/tokens'

import { Toaster } from '@/components/Toast/Toaster'
import { TooltipProvider } from '@/components/Tooltip'

import AuthProvider from '@/features/auth/AuthProvider'

const progressBarStyleString = `
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${token('colors.foreground')};

  position: fixed;
  z-index: ${token('zIndex.pageProgressBar')};
  top: calc(${token('sizes.headerHeight')} + 1px);
  left: 0;

  width: 100%;
  height: 1px;
}
`

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <JotaiProvider>
        <TooltipProvider>
          <AuthProvider>
            <AppProgressBar options={{ showSpinner: false }} style={progressBarStyleString} />
            <Toaster />
            {children}
          </AuthProvider>
        </TooltipProvider>
      </JotaiProvider>
    </ThemeProvider>
  )
}

export default Providers
