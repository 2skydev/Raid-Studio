import { ReactNode, forwardRef } from 'react'

import { css } from '@styled-system/css'

import { Input, InputProps } from '@/components/Input'

export interface InputWithPrefixSuffixProps extends Omit<InputProps, 'prefix' | 'suffix'> {
  prefix?: ReactNode
  suffix?: ReactNode
}

const InputWithPrefixSuffix = forwardRef<HTMLInputElement, InputWithPrefixSuffixProps>(
  ({ prefix, suffix, ...props }, ref) => {
    return (
      <div className={css({ pos: 'relative' })}>
        {prefix && (
          <div
            className={css({
              pos: 'absolute',
              left: '1',
              top: '50%',
              transform: 'translateY(-50%)',
            })}
          >
            {prefix}
          </div>
        )}

        <Input prefix="test" placeholder="참여 코드를 입력해주세요" {...props} ref={ref} />

        {suffix && (
          <div
            className={css({
              pos: 'absolute',
              right: '1',
              top: '50%',
              transform: 'translateY(-50%)',
            })}
          >
            {suffix}
          </div>
        )}
      </div>
    )
  },
)

InputWithPrefixSuffix.displayName = 'InputWithPrefixSuffix'

export default InputWithPrefixSuffix
