import { supabase } from '@/lib/supabase'
import { showErrorToast } from '@/utils/error'

export const getPublicSquads = async () => {
  const { data } = await supabase
    .from('squads_public_view')
    .select(
      `
      name,
      created_at,
      users: squad_users (
        role,
        profile: profiles (
          nickname,
          photo,
          main_character_name
        )
      ),
      userCount: squad_users (count)
    `,
    )
    .limit(5, { foreignTable: 'users' })
    .order('role', { foreignTable: 'users' })

  return data?.map(squad => ({
    ...squad,
    owner: squad.users.find(user => user.role === 'owner')?.profile,
    // @ts-ignore
    userCount: squad.userCount[0].count as number,
  }))
}

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
