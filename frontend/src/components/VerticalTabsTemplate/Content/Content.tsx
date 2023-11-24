import { ComponentPropsWithoutRef } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'

import { styled } from '@styled-system/jsx'

import { TabsContent } from '@/components/Tabs'

const MotionDivWithStyled = motion(styled.div)

const Content = ({
  value,
  forceMount,
  children,
  ...props
}: HTMLMotionProps<'div'> & ComponentPropsWithoutRef<typeof TabsContent>) => {
  return (
    <TabsContent value={value} forceMount={forceMount} asChild>
      <MotionDivWithStyled
        mt="0"
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </MotionDivWithStyled>
    </TabsContent>
  )
}

export default Content
