import { ToastOptions, toast } from '@/components/Toast/useToast'

export const showErrorToast = async (error: any, options?: ToastOptions) => {
  let message = '알 수 없는 오류가 발생했습니다.'

  if (typeof error?.context?.json === 'function') {
    // Supabase edge function error
    const body = await error.context.json()
    message = body.error
  } else if (typeof error?.message === 'string') {
    // Supabase PostgREST error
    message = error.message
  }

  toast({
    status: 'error',
    title: '요청 중 오류가 발생했습니다.',
    description: message,
    ...options,
  })
}
