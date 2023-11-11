import { ToastOptions, toast } from '@/components/Toast/useToast'

export const showErrorToast = async (error: any, options?: ToastOptions) => {
  let message = '알 수 없는 오류가 발생했습니다.'

  if (!options?.description) {
    console.log({ error })
    if (typeof error?.context?.json === 'function') {
      // Supabase edge function error
      const body = await error.context.json()
      message = body.error
    } else if (typeof error?.message === 'string') {
      // Supabase PostgREST error
      if (error.message.includes('row-level security')) {
        message = '해당 작업에 대한 권한이 없습니다.'
      } else {
        message = error.message
      }
    }
  }

  toast({
    status: 'error',
    title: '요청 중 오류가 발생했습니다.',
    description: message,
    ...options,
  })
}
