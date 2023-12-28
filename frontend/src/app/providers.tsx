'use client'

import { ReactNode, Suspense } from 'react'

import { Provider as JotaiProvider } from 'jotai'
import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import FullscreenLoading from '@/components/FullscreenLoading'

import { theme } from '@/styles/theme'

const progressBarStyleString = `
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${theme.colors.zinc['600']};

  position: fixed;
  z-index: ${theme.zIndex.pageProgressBar};
  top: calc(${theme.height.headerHeight} + 1px);
  left: 0;

  width: 100%;
  height: 1px;
}
`

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <JotaiProvider>
        <Suspense fallback={<FullscreenLoading />}>
          <TooltipProvider>
            <AppProgressBar options={{ showSpinner: false }} style={progressBarStyleString} />
            <Toaster closeButton />
            {children}
          </TooltipProvider>
        </Suspense>
      </JotaiProvider>
    </ThemeProvider>
  )
}

export default Providers
