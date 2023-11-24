'use client'

import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { createStyleContext } from '@shadow-panda/style-context'
import { Check, ChevronDown } from 'lucide-react'

import { styled } from '@styled-system/jsx'
import { select, icon } from '@styled-system/recipes'

const { withProvider, withContext } = createStyleContext(select)

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  if (props.asChild) {
    return (
      <SelectPrimitive.Trigger ref={ref} {...props}>
        {children}
      </SelectPrimitive.Trigger>
    )
  }

  return (
    <SelectPrimitive.Trigger ref={ref} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className={icon({ dimmed: true })} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
Trigger.displayName = SelectPrimitive.Trigger.displayName

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport')

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} position={position} data-position={position} {...props}>
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
Content.displayName = SelectPrimitive.Content.displayName

const ItemIndicator = withContext(
  styled(SelectPrimitive.ItemIndicator, {
    base: {
      left: 'initial',
      right: '2',
    },
  }),
  'itemIndicator',
)

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>
  </SelectPrimitive.Item>
))
Item.displayName = SelectPrimitive.Item.displayName

export const Select = withProvider(styled(SelectPrimitive.Root), 'root')
export const SelectGroup = withContext(styled(SelectPrimitive.Group), 'group')
export const SelectValue = withContext(styled(SelectPrimitive.Value), 'value')
export const SelectTrigger = withContext(styled(Trigger), 'trigger')
export const SelectContent = withContext(styled(Content), 'content')
export const SelectLabel = withContext(styled(SelectPrimitive.Label), 'label')
export const SelectItem = withContext(
  styled(Item, {
    base: {
      pl: '2',
      pr: '8',
    },
  }),
  'item',
)
export const SelectSeparator = withContext(styled(SelectPrimitive.Separator), 'separator')