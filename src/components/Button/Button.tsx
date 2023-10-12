'use client'

import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { Loader2Icon } from 'lucide-react'

import { cx, css } from '@styled-system/css'
import { styled, type HTMLStyledProps } from '@styled-system/jsx'
import { button, icon } from '@styled-system/recipes'

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; children?: React.ReactNode }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} {...props} />
})
BaseButton.displayName = 'Button'

export const ButtonBasic = styled(BaseButton, button)

export type ButtonBasicProps = HTMLStyledProps<typeof ButtonBasic>

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonBasicProps & { useOnClickLoading?: boolean; loading?: boolean }
>(({ children, onClick, useOnClickLoading, loading: loadingProp, ...props }, ref) => {
  const [loadingState, setLoading] = React.useState(false)

  const loading = loadingProp || loadingState

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick && useOnClickLoading && onClick.constructor.name === 'AsyncFunction') {
      setLoading(true)
      await onClick(event)
      setLoading(false)
      return
    }

    onClick?.(event)
  }

  if (props.asChild) {
    return (
      <ButtonBasic ref={ref} onClick={onClick} {...props}>
        {children}
      </ButtonBasic>
    )
  }

  return (
    <ButtonBasic ref={ref} onClick={onClick && handleClick} disabled={loading} {...props}>
      {children}
      {loading && <Loader2Icon className={cx(icon(), css({ animation: 'spin' }))} />}
    </ButtonBasic>
  )
})

Button.displayName = 'Button'

export type ButtonProps = HTMLStyledProps<typeof Button>

export default Button
