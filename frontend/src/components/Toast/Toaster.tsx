'use client'

import { AlertCircleIcon, CheckCircleIcon, InfoIcon, XOctagonIcon } from 'lucide-react'

import { css } from '@styled-system/css'
import { Flex, styled } from '@styled-system/jsx'
import { token } from '@styled-system/tokens'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/Toast'
import { useToast } from '@/components/Toast/useToast'

const TOAST_STATUS_COLORS = {
  info: token('colors.blue.500'),
  success: token('colors.green.500'),
  warning: token('colors.yellow.500'),
  error: token('colors.red.500'),
}

const TOAST_STATUS_ICONS = {
  info: <InfoIcon size="1.2rem" />,
  success: <CheckCircleIcon size="1.2rem" />,
  warning: <AlertCircleIcon size="1.2rem" />,
  error: <XOctagonIcon size="1.2rem" />,
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, status, icon, color, ...props }) => (
        <Toast key={id} {...props}>
          <Flex spaceX="3">
            {(icon || status) && (
              <div className={css({ y: '1px' })}>
                {icon || (status && TOAST_STATUS_ICONS[status])}
              </div>
            )}

            <div>
              {title && (
                <ToastTitle style={{ color: color || (status && TOAST_STATUS_COLORS[status]) }}>
                  {title}
                </ToastTitle>
              )}
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
