'use client'

import { AlertCircleIcon, CheckCircleIcon, InfoIcon, XOctagonIcon } from 'lucide-react'

import { Flex, styled } from '@styled-system/jsx'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/Toast'
import { useToast } from '@/components/Toast/useToast'

const ToastStatusIcons = {
  info: <InfoIcon size="1.2rem" />,
  success: <CheckCircleIcon size="1.2rem" />,
  warning: <AlertCircleIcon size="1.2rem" />,
  error: <XOctagonIcon size="1.2rem" />,
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, status, ...props }) => (
        <Toast key={id} {...props}>
          <Flex spaceX="2.5">
            {status && ToastStatusIcons[status]}

            <div>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription mt="1">{description}</ToastDescription>}
            </div>
          </Flex>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport spaceY="2" />
    </ToastProvider>
  )
}
