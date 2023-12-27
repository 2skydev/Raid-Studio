import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SelectTrigger } from '@/components/ui/select'

import { cn } from '@/utils'

export interface TriggerProps {
  children?: ReactNode
}

const Trigger = ({
  className,
  asChild,
  ...props
}: ComponentPropsWithoutRef<typeof SelectTrigger>) => {
  if (asChild) return <SelectTrigger asChild {...props} />

  return (
    <SelectTrigger {...props} asChild>
      <Button
        onPointerDown={e => {
          // badge에 있는 x 아이콘을 클릭했을 때, select가 열리는 것을 방지
          // @ts-ignore: e.target 타입 에러 무시
          if (e.target.tagName === 'path' || e.target.tagName === 'svg') {
            e.preventDefault()
          }
        }}
        className={cn('h-auto hover:bg-transparent', className)}
      >
        {props.children}
        <ChevronDownIcon className="size-4 text-primary opacity-50" />
      </Button>
    </SelectTrigger>
  )
}

export default Trigger
