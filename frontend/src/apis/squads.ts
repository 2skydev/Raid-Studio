import { supabase } from '@/lib/supabase'
import { showErrorToast } from '@/utils/error'

export const createSquad = async (name: string) => {
  const { error } = await supabase.functions.invoke('apis/squads', {
    method: 'POST',
    body: {
      name,
    },
  })

  if (error) {
    await showErrorToast(error, {
      title: '공격대 생성 오류',
    })

    throw error
  }

  return true
}

export const joinSquad = async (code: string) => {
  const { error } = await supabase.functions.invoke(`apis/squads/join/${code}`, {
    method: 'PUT',
  })

  if (error) {
    await showErrorToast(error, {
      title: '공격대 참여 오류',
    })

    throw error
  }

  return true
}
