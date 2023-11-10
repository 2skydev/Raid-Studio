import { z } from 'zod'

import { supabase } from '@/lib/supabase'
import { LostArkCharacter, lostArkCharacterSchema } from '@/schemas/character'
import { Tables } from '@/types/database.types'

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

  if (error) throw error
}

export const reloadCharacters = async (userId: string) => {
  const { data } = await supabase.from('profiles').select('main_character_name').eq('id', userId)

  if (!data || !data.length) return false

  const characterName = data[0].main_character_name

  if (!characterName) return false

  const characters = await getLostArkCharacters(characterName)

  await updateAndMergeCharacters(userId, characters)

  return true
}
