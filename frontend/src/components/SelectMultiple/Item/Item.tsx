import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ItemText as ItemTextPrimitive } from '@radix-ui/react-select'
import { CheckIcon } from 'lucide-react'

import { Flex } from '@styled-system/jsx'

import { SelectItemPrimitiveWithStyled } from '@/components/Select'
import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

export interface ItemProps {
  children?: ReactNode
}

const Item = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof SelectItemPrimitiveWithStyled>) => {
  const { selectedValues, handleClickItem } = useSelectMultiple()

  const isSelected = selectedValues.includes(props.value)

  return (
    <SelectItemPrimitiveWithStyled onClick={() => handleClickItem(props.value)} {...props}>
      <Flex w="full" justifyContent="space-between">
        <ItemTextPrimitive>{children}</ItemTextPrimitive>
        {isSelected && <CheckIcon size="1rem" />}
      </Flex>
    </SelectItemPrimitiveWithStyled>
  )
}

export default Item
