import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import { css } from '@styled-system/css'

import Button, { ButtonProps } from '@/components/Button'
import { TabsTrigger } from '@/components/Tabs'

interface TriggerProps extends ButtonProps {}

const Trigger = ({
  value,
  className,
  ...props
}: TriggerProps & ComponentPropsWithoutRef<typeof TabsTrigger>) => {
  return (
    <TabsTrigger value={value} asChild>
      <Button
        className={clsx(
          css({
            bg: 'none',
            '&[data-state=active]': {
              bg: 'muted',
            },
          }),
          className,
        )}
        w="full"
        variant="ghost"
        justifyContent="start"
        {...props}
      >
        {props.children}
      </Button>
    </TabsTrigger>
  )
}

export default Trigger
