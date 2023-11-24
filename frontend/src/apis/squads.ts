import { supabase } from '@/lib/supabase'
import { SquadUser } from '@/types/squads.types'
import { NonNullableDeep } from '@/types/util.types'
import { showErrorToast } from '@/utils/error'

export const getPublicSquads = async (keyword: string) => {
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
    .like('name', `%${keyword}%`)
    .limit(5, { foreignTable: 'users' })
    .order('role', { foreignTable: 'users' })

  return data?.map(squad => ({
    ...squad,
    owner: squad.users.find(user => user.role === 'owner')?.profile,
    // @ts-ignore
    userCount: squad.userCount[0].count as number,
  }))
}

export const getSquadNames = async (userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select(
      `
        squads (
          id,
          name
        )
      `,
    )
    .eq('id', userId)
    .single()

  return data?.squads || null
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

export const getSquadUsers = async (squadId: number) => {
  const { data } = await supabase
    .from('squads_public_view')
    .select(
      `
        users: squad_users (
          id: user_id,
          role,
          profile: profiles (
            nickname,
            photo,
            main_character_name
          )
        )
      `,
    )
    .eq('id', squadId)
    .single()

  return data?.users as SquadUser[]
}

export const getSquadCode = async (squadId: number) => {
  const { data } = await supabase.from('squads').select('code').eq('id', squadId).single()

  return data?.code
}

export const getSquadUsersWithCharacters = async (squadId: number) => {
  const { data } = await supabase
    .from('squads_public_view')
    .select(
      `
        users: squad_users (
          id: user_id,
          role,
          profile: profiles (
            nickname,
            photo,
            main_character_name,
            characters: characters!characters_user_id_fkey (
              name,
              class,
              level,
              server
            )
          )
        )
      `,
    )
    .eq('id', squadId)
    .single()

  return data?.users ? (data.users as NonNullableDeep<typeof data.users>) : null
}
