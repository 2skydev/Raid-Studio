import { ExternalToast, toast } from 'sonner'

export const showErrorToast = async (error: any, options?: ExternalToast & { title?: string }) => {
  const title = options?.title || '요청 중 오류가 발생했습니다.'
  let message = typeof error === 'string' ? error : '알 수 없는 오류가 발생했습니다.'

  if (!options?.description) {
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

  toast.error(title, {
    description: message,
    ...options,
  })
}
