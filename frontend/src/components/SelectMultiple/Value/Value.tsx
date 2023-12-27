import { ComponentPropsWithoutRef } from 'react'

import { XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SelectValue } from '@/components/ui/select'

import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

const Value = ({ placeholder, ...props }: ComponentPropsWithoutRef<typeof SelectValue>) => {
  const { selectedValues, handleClickItem } = useSelectMultiple()

  return (
    <SelectValue asChild {...props}>
      <div className="flex flex-wrap gap-1">
        {selectedValues.length === 0 && (
          <div className="border border-transparent p-0.5 text-xs leading-4 text-muted-foreground">
            {placeholder ?? '선택된 항목이 없습니다'}
          </div>
        )}
        {selectedValues.map(value => (
          <Badge key={value} variant="secondary" className="whitespace-nowrap rounded-md">
            {value}
            <XIcon
              className="close pointer-events-auto ml-2 size-3 opacity-30 transition-opacity hover:opacity-60"
              onClick={() => handleClickItem(value)}
            />
          </Badge>
        ))}
      </div>
    </SelectValue>
  )
}

export default Value
