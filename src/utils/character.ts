import { RAIDS_ARRAY_ORDER_BY_GOLD_DESC } from '@/assets/data/raid'
import { Character } from '@/schemas/character'
import { Raid } from '@/types/raid'

const MAX_RAID_COUNT = 3
const MAX_CHARACTER_COUNT = 6

/**
 * 주간 획득 가능 골드량을 계산합니다.
 *
 * @param characters 레벨이 높은 순으로 정렬된 캐릭터 목록
 * @param ignoreRaidFn
 *
 * @description characters는 레벨이 높은 순으로 정렬되어야 합니다.
 */
export const getWeekGold = (
  characters: Character[],
  ignoreRaidFn?: (character: Character, raid: Raid) => boolean,
) => {
  let gold = 0
  let characterCount = 0

  for (const character of characters) {
    if (characterCount >= MAX_CHARACTER_COUNT) break

    let raidCount = 0
    let usedRaidNames: string[] = []

    for (const raid of RAIDS_ARRAY_ORDER_BY_GOLD_DESC) {
      if (raid.minLevel > character.level) continue
      if (raidCount >= MAX_RAID_COUNT) break
      if (usedRaidNames.includes(raid.name)) continue
      if (ignoreRaidFn && ignoreRaidFn(character, raid)) continue

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
