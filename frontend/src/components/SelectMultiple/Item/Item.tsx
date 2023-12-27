import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'
import { CheckIcon } from 'lucide-react'

import { SelectItem as SelectItemPrimitive } from '@/components/ui/select'

import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

export interface ItemProps {
  children?: ReactNode
}

const Item = ({ children, ...props }: ComponentPropsWithoutRef<typeof SelectItemPrimitive>) => {
  const { selectedValues, handleClickItem } = useSelectMultiple()

  const isSelected = selectedValues.includes(props.value)

  return (
    <SelectItemPrimitive
      className={clsx(isSelected && 'bg-accent')}
      indicator={isSelected && <CheckIcon size="1rem" />}
      onClick={() => handleClickItem(props.value)}
      {...props}
    >
      {children}
    </SelectItemPrimitive>
  )
}

export default Item
