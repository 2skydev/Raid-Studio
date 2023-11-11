'use client'

import { ReactNode, Suspense } from 'react'

import { Provider as JotaiProvider } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'

import { css } from '@styled-system/css'
import { token } from '@styled-system/tokens'

import { Toaster } from '@/components/Toast/Toaster'
import { TooltipProvider } from '@/components/Tooltip'

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
        <Suspense
          fallback={
            <div
              className={css({
                w: '100vw',
                h: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <Loader2Icon className={css({ animation: 'spin' })} />
            </div>
          }
        >
          <TooltipProvider>
            <AppProgressBar options={{ showSpinner: false }} style={progressBarStyleString} />
            <Toaster />
            {children}
          </TooltipProvider>
        </Suspense>
      </JotaiProvider>
    </ThemeProvider>
  )
}

export default Providers
