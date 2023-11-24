import { ComponentPropsWithoutRef } from 'react'

import { css } from '@styled-system/css'

import { Badge } from '@/components/Badge'
import { SelectValue } from '@/components/Select'
import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

const Value = ({ ...props }: ComponentPropsWithoutRef<typeof SelectValue>) => {
  const { selectedValues } = useSelectMultiple()

  return (
    <SelectValue asChild {...props}>
      <div className={css({ spaceX: '1' })}>
        {selectedValues.map(value => (
          <Badge variant="secondary" key={value}>
            {value}
          </Badge>
        ))}
      </div>
    </SelectValue>
  )
}

export default Value
