import { toast } from 'sonner'
import { z } from 'zod'

import { supabase } from '@/lib/supabase'
import { LostArkCharacter, lostArkCharacterSchema } from '@/schemas/character'
import { Tables } from '@/types/database.types'
import { showErrorToast } from '@/utils/error'

export const getLostArkCharacters = async (characterName: string) => {
  const { data } = await supabase.functions.invoke(`apis/lostark/characters/${characterName}`, {
    method: 'GET',
  })

  return z.array(lostArkCharacterSchema).parse(data)
}

export const updateAndMergeCharacters = async (
  userId: string,
  lostArkCharacters: LostArkCharacter[],
) => {
  const { data } = await supabase.from('characters').select().eq('user_id', userId)

  const beforeMap = new Map<string, Tables<'characters'>>()

  if (data) {
    data.forEach(character => {
      beforeMap.set(character.name, character)
    })
  }

  const characters = lostArkCharacters.map(baseCharacter => {
    const character = beforeMap.get(baseCharacter.name)

    return {
      id: `${baseCharacter.name}.${userId}`,
      user_id: userId,
      ...character,
      ...baseCharacter,
    }
  })

  const { error } = await supabase.from('characters').upsert(characters)

  if (error) {
    showErrorToast(error, {
      title: '캐릭터 정보 업데이트 오류',
    })

    throw error
  }

  const { error: deleteError } = await supabase
    .from('characters')
    .delete()
    .not('name', 'in', `(${characters.map(({ name }) => name).join(',')})`)

  if (deleteError) {
    showErrorToast(deleteError, {
      title: '캐릭터 정보 업데이트 오류',
    })

    throw deleteError
  }

  return true
}

export const reloadCharacters = async (userId: string) => {
  const { data } = await supabase.from('profiles').select('main_character_name').eq('id', userId)

  if (!data || !data.length) return false

  const characterName = data[0].main_character_name

  if (!characterName) return false

  const characters = await getLostArkCharacters(characterName)

  await updateAndMergeCharacters(userId, characters)

  toast.success('내 캐릭터들 정보를 업데이트 했습니다.')

  return true
}

export const getCharacters = async (userId: string) => {
  const { data } = await supabase
    .from('characters')
    .select(
      `
        name,
        level,
        class,
        server
      `,
    )
    .eq('user_id', userId)

  return data
}

export const getCharactersWithDetailData = async (userId: string) => {
  const { data } = await supabase
    .from('characters')
    .select(
      `
        name,
        level,
        class,
        server,
        clears (
          raid_id,
          cleared_at
        )
      `,
    )
    .eq('user_id', userId)

  return data
}
