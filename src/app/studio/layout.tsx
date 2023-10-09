'use client'

import { usePathname } from 'next/navigation'

import { css } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

import { ScrollArea } from '@/components/ScrollArea'
import Sidebar from '@/components/Sidebar'

import PageContentMotion from '@/features/motion/PageContentMotion'
import SidebarMotion from '@/features/motion/SidebarMotion'

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <styled.div px="4">
      <SidebarMotion
        className={css({
          w: '280px',
          h: 'mainHeight',
          pos: 'fixed',
        })}
      >
        <ScrollArea
          h="full"
          pr="2.5"
          py="6"
          lg={{
            py: '8',
          }}
        >
          <Sidebar />
        </ScrollArea>
      </SidebarMotion>

      <PageContentMotion
        key={pathname}
        className={css({
          ml: 'calc(280px + token(sizes.10))',
          flex: '1',
          py: '6',
          pr: '8',
          lg: {
            py: '8',
          },
        })}
      >
        {children}
      </PageContentMotion>
    </styled.div>
  )
}

export default StudioLayout
