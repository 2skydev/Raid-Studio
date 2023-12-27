import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { SelectContent } from '@/components/ui/select'

import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

export interface ContentProps {
  children?: ReactNode
}

const Content = (props: ComponentPropsWithoutRef<typeof SelectContent>) => {
  const { setOpen } = useSelectMultiple()
  return <SelectContent onPointerDownOutside={() => setOpen(false)} {...props} />
}

export default Content
