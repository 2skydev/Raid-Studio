import { ReactNode } from 'react'

import { AxiosError } from 'axios'
import { z } from 'zod'

import { css } from '@styled-system/css'
import { list } from '@styled-system/recipes'

import { ToastOptions, toast } from '@/components/Toast/useToast'

export const createCustomErrorResponse = (
  errorMessage: string | string[],
  status: number = 500,
) => {
  return Response.json(
    {
      error: {
        messages: Array.isArray(errorMessage) ? errorMessage : [errorMessage],
      },
    },
    {
      status,
    },
  )
}

export const createTryCatchErrorResponse = (error: unknown) => {
  if (error instanceof z.ZodError) {
    return createCustomErrorResponse(
      error.issues.map(issue => issue.message),
      400,
    )
  } else {
    return createCustomErrorResponse('알 수 없는 오류가 발생했습니다.', 500)
  }
}

export const showAxiosErrorToast = (error: any, options?: ToastOptions) => {
  const messages: string[] = error.response?.data?.error?.messages || [
    '알 수 없는 오류가 발생했습니다.',
  ]

  toast({
    status: 'error',
    title: '요청 중 오류가 발생했습니다.',
    description: (
      <>
        <ul
          className={css({
            mt: '2',
          })}
        >
          {messages.map((message: string, i) => (
            <li
              key={i}
              className={css({
                listStyleType: 'disc',
                ml: '5',
              })}
            >
              {message}
            </li>
          ))}
        </ul>
      </>
    ),
    ...options,
  })
}
