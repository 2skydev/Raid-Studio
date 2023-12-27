import { ComponentProps } from 'react'

import { TabsList } from '@/components/ui/tabs'

import { cn } from '@/utils'

const List = ({ className, ...props }: ComponentProps<typeof TabsList>) => {
  return (
    <TabsList
      className={cn('-mx-4 flex h-auto flex-col gap-1 bg-transparent p-0', className)}
      {...props}
    />
  )
}

export default List
