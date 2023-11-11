import { supabase } from '@/lib/supabase'
import { showFunctionsInvokeErrorToast } from '@/utils/api'

export const createSquad = async (name: string) => {
  // await supabase.from()
}

export const joinSquad = async (code: string) => {
  const { error } = await supabase.functions.invoke(`apis/squads/join/${code}`, {
    method: 'PUT',
  })

  if (error) {
    await showFunctionsInvokeErrorToast(error, {
      title: '공격대 참여 오류',
    })

    throw error
  }

  return true
}
