import { ComponentPropsWithoutRef } from 'react'

import { css } from '@styled-system/css'

import { Badge } from '@/components/Badge'
import { SelectValue } from '@/components/Select'
import useSelectMultiple from '@/components/SelectMultiple/useSelectMultiple'

const Value = ({ ...props }: ComponentPropsWithoutRef<typeof SelectValue>) => {
  const { selectedValues } = useSelectMultiple()

  return (
    <SelectValue asChild {...props}>
      <div
        className={css({
          spaceX: '1',
          mb: '-1',
          display: 'flex',
          flexWrap: 'wrap',
        })}
      >
        {selectedValues.length === 0 && (
          <div
            className={css({
              p: '0.5',
              leading: '1rem',
              fontSize: '0.75rem',
              mb: '1',
              border: 'base',
              borderColor: 'transparent!',
              color: 'muted.foreground',
            })}
          >
            선택된 레이드가 없습니다
          </div>
        )}
        {selectedValues.map(value => (
          <Badge key={value} variant="secondary" whiteSpace="nowrap" mb="1">
            {value}
          </Badge>
        ))}
      </div>
    </SelectValue>
  )
}

export default Value
