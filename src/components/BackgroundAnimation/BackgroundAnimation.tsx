import clsx from 'clsx'

import { HTMLStyledProps } from '@styled-system/types'

import * as Styled from './BackgroundAnimation.styled'

export interface BackgroundAnimationProps extends HTMLStyledProps<typeof Styled.Root> {
  className?: string
}

const BackgroundAnimation = ({ className, ...props }: BackgroundAnimationProps) => {
  return (
    <Styled.Root className={clsx('BackgroundAnimation', className)} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Styled.Root>
  )
}

export default BackgroundAnimation
