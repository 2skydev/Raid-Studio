'use client'

import { ReactNode } from 'react'

import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'

import { token } from '@styled-system/tokens'

import { Toaster } from '@/components/Toast/Toaster'

const progressBarStyleString = `
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${token('colors.foreground')};

  position: fixed;
  z-index: ${token('zIndex.pageProgressBar')};
  top: ${token('sizes.headerHeight')};
  left: 0;

  width: 100%;
  height: 1px;
}
`

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProgressBar options={{ showSpinner: false }} style={progressBarStyleString} />
      <Toaster />

      {children}
    </ThemeProvider>
  )
}

export default Providers
