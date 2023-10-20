import lostarkClient from '@/libs/lostark/client'
import { Character } from '@/schemas/character'

export const getCharacters = async (characterName: string): Promise<Character[] | null> => {
  const { data } = await lostarkClient.get(`/characters/${characterName}/siblings`)

  if (!data) return null

  return data
    .map((character: any) => ({
      server: character.ServerName,
      name: character.CharacterName,
      level: +character.ItemMaxLevel.replace(',', ''),
      class: character.CharacterClassName,
    }))
    .filter((character: any) => character.level >= 1415)
}
