import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { SelectTrigger } from '@/components/Select'

export interface TriggerProps {
  children?: ReactNode
}

const Trigger = (props: ComponentPropsWithoutRef<typeof SelectTrigger>) => {
  return <SelectTrigger height="auto" {...props} />
}

export default Trigger
