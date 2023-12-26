import { ComponentProps, ReactNode, useEffect } from 'react'

import { ExternalToast, toast } from 'sonner'

import { Dialog } from '@/components/ui/dialog'

import useAuth from '@/hooks/useAuth'

export interface AuthenticatedOnlyDialogProps extends ComponentProps<typeof Dialog> {
  errorToastOptions?: ExternalToast
  children: ReactNode
}

const AuthenticatedOnlyDialog = ({
  open,
  onOpenChange,
  errorToastOptions = {},
  children,
  ...props
}: AuthenticatedOnlyDialogProps) => {
  const { user } = useAuth()

  const internalOpen = Boolean(user && open)

  useEffect(() => {
    if (!user && open) {
      onOpenChange?.(false)

      toast.error('로그인이 필요한 서비스입니다', {
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
