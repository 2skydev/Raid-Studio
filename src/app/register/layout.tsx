'use client'

import { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className={css({ w: '100vw', h: 'mainHeight', bg: 'Background' })}>
      <LayoutScaleMotion className={css({ w: 'full', h: 'full' })}>
        <Flex
          w="full"
          h="calc(100vh - token(sizes.14) - 1px)"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          pb="10"
        >
          {children}
        </Flex>
      </LayoutScaleMotion>
    </div>
  )
}

export default RegisterLayout
