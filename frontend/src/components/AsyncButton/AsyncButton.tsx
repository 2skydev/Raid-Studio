import { ReactNode, useState } from 'react'

import { Loader2Icon } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

export interface AsyncButtonProps extends Omit<ButtonProps, 'asChild'> {
  children?: ReactNode
  loading?: boolean
  shouldLoadingIconShow?: boolean
}

const AsyncButton = ({
  onClick,
  loading,
  children,
  shouldLoadingIconShow,
  ...props
}: AsyncButtonProps) => {
  const [isLoadingState, setIsLoadingState] = useState(false)

  const isLoading = loading ?? isLoadingState

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick && onClick.constructor.name === 'AsyncFunction') {
      setIsLoadingState(true)
      await (onClick(event) as unknown as Promise<void>)
      setIsLoadingState(false)
      return
    }

    onClick?.(event)
  }

  return (
    <Button disabled={isLoading} onClick={onClick && handleClick} {...props}>
      {children}
      {isLoading && shouldLoadingIconShow && <Loader2Icon className="size-4 animate-spin" />}
    </Button>
  )
}

export default AsyncButton
