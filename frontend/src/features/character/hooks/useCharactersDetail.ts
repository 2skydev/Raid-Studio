import { useMemo } from 'react'

import { Character, CharacterWithClears } from '@/schemas/character'
import { BestGoldRaidStats, getBestGoldRaidStatsByCharacter } from '@/utils/character'

const useCharactersDetail = (data: CharacterWithClears[]) => {
  const characters = useMemo(() => {
    const items = (data || []).map(character => {
      let fixedRaidIds = character.fixedRaidIds

      const stats = getBestGoldRaidStatsByCharacter(character)

      if (!fixedRaidIds.length) {
        fixedRaidIds = stats.raidIds
      }

      return {
        ...character,
        fixedRaidIds,
        stats,
      }
    })

    items.sort((a, b) => {
      return b.level - a.level
    })

    return items
  }, [data])

  const weekGold = characters.slice(0, 6).reduce((acc, character) => {
    return acc + character.stats.totalGold
  }, 0)

  return {
    characters,
    weekGold,
  }
}

export default useCharactersDetail
