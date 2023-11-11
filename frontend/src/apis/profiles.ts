import { supabase } from '@/lib/supabase'
import { showErrorToast } from '@/utils/error'

export const updateMainCharacterName = async (userId: string, name: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ main_character_name: name })
    .eq('id', userId)

  if (error) throw error
}

export const getCurrentUserProfile = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id)
    .single()

  return profile
}

export const getTestUserProfiles = async () => {
  const { data } = await supabase
    .from('profiles')
    .select(
      `
      nickname,
      photo,
      main_character_name
    `,
    )
    .in(
      'nickname',
      Array(10)
        .fill(null)
        .map((_, i) => `user${i}`),
    )

  return data
}

export const createCurrentUserProfile = async (nickname: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) throw '로그인이 필요합니다.'

  const profile = {
    id: session.user.id,
    nickname,
    photo: session.user.user_metadata.avatar_url,
    main_character_name: null,
  }

  const { error } = await supabase.from('profiles').upsert(profile)

  if (error) {
    await showErrorToast(error, {
      title: '닉네임 설정 오류',
    })

    throw error
  }

  return profile
}
