import { ComponentProps, ReactNode, useEffect } from 'react'

import { useAtomValue } from 'jotai'

import { Dialog } from '@/components/Dialog'
import DiscordIcon from '@/components/DiscordIcon'
import { ToastOptions, useToast } from '@/components/Toast/useToast'

import { userAtom } from '@/stores/userAtom'

export interface AuthenticatedOnlyDialogProps extends ComponentProps<typeof Dialog> {
  errorToastOptions?: ToastOptions
  children: ReactNode
}

const AuthenticatedOnlyDialog = ({
  open,
  onOpenChange,
  errorToastOptions = {},
  children,
  ...props
}: AuthenticatedOnlyDialogProps) => {
  const { toast } = useToast()
  const user = useAtomValue(userAtom)

  const internalOpen = Boolean(user && open)

  useEffect(() => {
    if (!user && open) {
      onOpenChange?.(false)

      toast({
        icon: <DiscordIcon w="5" h="5" fill="foreground" />,
        color: '#5662f6',
        title: '로그인이 필요한 서비스입니다',
        description: '홈 화면에서 로그인 후 이용해주세요.',
        ...errorToastOptions,
      })
    }
  }, [user, open])

  return (
    <Dialog open={internalOpen} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog>
  )
}

export default AuthenticatedOnlyDialog
