import { RAIDS_ARRAY_ORDER_BY_GOLD_DESC } from '@/data/raid'
import { Character } from '@/schemas/character'

const MAX_RAID_COUNT = 3
const MAX_CHARACTER_COUNT = 6

export const getWeekGold = (characters: Character[]) => {
  let gold = 0
  let characterCount = 0

  const _characters = [...characters]

  _characters.sort((a, b) => {
    return b.level - a.level
  })

  for (const character of _characters) {
    if (characterCount >= MAX_CHARACTER_COUNT) break

    let raidCount = 0
    let usedRaidNames: string[] = []

    for (const raid of RAIDS_ARRAY_ORDER_BY_GOLD_DESC) {
      if (raid.minLevel > character.level) continue
      if (raidCount >= MAX_RAID_COUNT) break
      if (usedRaidNames.includes(raid.name)) continue

      raidCount++
      usedRaidNames.push(raid.name)

      for (const step of raid.steps) {
        if (step.level > character.level) continue
        gold += step.gold
      }
    }

    if (raidCount > 0) characterCount++
  }

  return gold
}
