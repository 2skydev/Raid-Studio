'use client'

import { usePathname } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'

import Sidebar from '@/components/Sidebar'

import AuthenticatedOnly from '@/features/auth/AuthenticatedOnly'
import PageContentMotion from '@/features/motion/PageContentMotion'
import SidebarMotion from '@/features/motion/SidebarMotion'

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <AuthenticatedOnly>
      <div className="mx-auto max-w-[1920px] px-4">
        <SidebarMotion className="fixed h-mainHeight w-[280px]">
          <ScrollArea className="h-full py-6 pr-2.5 lg:py-8">
            <Sidebar />
          </ScrollArea>
        </SidebarMotion>

        <PageContentMotion
          key={pathname}
          className="ml-[calc(280px+theme(spacing.10))] flex-1 py-6 pr-8 lg:py-8"
        >
          {children}
        </PageContentMotion>
      </div>
    </AuthenticatedOnly>
  )
}

export default StudioLayout
