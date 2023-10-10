import { Fragment } from 'react'

import clsx from 'clsx'

import { type HTMLStyledProps } from '@styled-system/types'

import * as Styled from './Kbd.styled'

export interface KbdProps extends HTMLStyledProps<typeof Styled.Root> {
  className?: string
  useCommandKey?: boolean
  keys?: string[]
}

const Kbd = ({ className, useCommandKey, keys, ...props }: KbdProps) => {
  return (
    <Styled.Root className={clsx('Kbd', className)} {...props}>
      {useCommandKey && <span className="commandKey">⌘</span>}
      {keys?.map((key, index) => (
        <Fragment key={key}>
          <span>{key}</span>
          {index !== keys.length - 1 && <span>+</span>}
        </Fragment>
      ))}
    </Styled.Root>
  )
}

export default Kbd
