import { ComponentPropsWithoutRef } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'
import { TabsTrigger } from '@/components/ui/tabs'

import { cn } from '@/utils'

interface TriggerProps extends ButtonProps {}

const Trigger = ({
  value,
  className,
  ...props
}: TriggerProps & ComponentPropsWithoutRef<typeof TabsTrigger>) => {
  return (
    <TabsTrigger value={value} asChild>
      <Button
        className={cn(
          'w-full justify-start rounded-md bg-none text-primary hover:bg-transparent hover:underline hover:underline-offset-[3px] [&[data-state=active]]:bg-muted',
          className,
        )}
        variant="ghost"
        {...props}
      >
        {props.children}
      </Button>
    </TabsTrigger>
  )
}

export default Trigger
