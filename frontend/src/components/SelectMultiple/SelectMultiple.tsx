import { ComponentPropsWithoutRef, ReactNode, useState } from 'react'

import { Select } from '@/components/Select'

import { SelectMultipleContext } from './useSelectMultiple'

export interface SelectMultipleProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Select>,
    'defaultValues' | 'value' | 'onValueChange'
  > {
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
}

const SelectMultiple = ({
  values,
  defaultValues,
  onValuesChange,
  ...props
}: SelectMultipleProps) => {
  const [_open, setOpen] = useState(props.defaultOpen ?? false)
  const [_selectedValues, setSelectedValues] = useState(values ?? [])

  const open = props.open ?? _open
  const selectedValues = values ?? _selectedValues

  const handleValueChange = (value: string) => {
    let result = []

    if (selectedValues.includes(value)) {
      result = selectedValues.filter(item => item !== value)
    } else {
      result = [...selectedValues, value]
    }

    setSelectedValues(result)
    onValuesChange?.(result)
  }

  return (
    <SelectMultipleContext.Provider
      value={{
        setOpen,
        selectedValues,
      }}
    >
      <Select
        open={open}
        onOpenChange={isOpen => isOpen && setOpen(true)}
        onValueChange={handleValueChange}
        {...props}
      >
        {props.children}
      </Select>
    </SelectMultipleContext.Provider>
  )
}

export default SelectMultiple
