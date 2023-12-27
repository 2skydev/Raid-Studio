import { ComponentPropsWithoutRef } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'

import { TabsContent } from '@/components/ui/tabs'

const Content = ({
  value,
  forceMount,
  children,
  ...props
}: HTMLMotionProps<'div'> & ComponentPropsWithoutRef<typeof TabsContent>) => {
  return (
    <TabsContent value={value} forceMount={forceMount} asChild>
      <motion.div
        className="mt-0"
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    </TabsContent>
  )
}

export default Content
