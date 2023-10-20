import { useMemo } from 'react'

import { CharacterWithClears } from '@/schemas/character'
import { getWeekGold } from '@/utils/character'

const useCharactersDetail = (data: CharacterWithClears[]) => {
  const characters = useMemo(() => {
    const clone = [...(data || [])]

    clone.sort((a, b) => {
      return b.level - a.level
    })

    return clone.filter(character => character.level >= 1415)
  }, [data])

  const weekGold = useMemo(() => getWeekGold(characters), [characters])

  return {
    characters,
    weekGold,
  }
}

export default useCharactersDetail
