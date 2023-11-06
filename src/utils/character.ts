import { RAIDS, RAIDS_ARRAY_ORDER_BY_GOLD_DESC } from '@/assets/data/raid'
import { Character, CharacterWithClears } from '@/schemas/character'
import { Raid } from '@/types/raid'

const MAX_RAID_COUNT = 3
// const MAX_CHARACTER_COUNT = 6

// /**
//  * 주간 획득 가능 골드량을 계산합니다.
//  *
//  * @param characters 레벨이 높은 순으로 정렬된 캐릭터 목록
//  *
//  * @description characters는 레벨이 높은 순으로 정렬되어야 합니다.
//  */
// export const getWeekGold = (characters: Character[]) => {
//   let gold = 0
//   let characterCount = 0

//   for (const character of characters) {
//     if (characterCount >= MAX_CHARACTER_COUNT) break

//     const { totalGold } = getBestGoldRaidStatsByCharacter(character)

//     gold += totalGold
//     characterCount++
//   }

//   return gold
// }

export interface BestGoldRaidStats {
  raidIds: string[]
  steps: BestGoldRaidStatsStep[]
  totalGold: number
}

interface BestGoldRaidStatsStep {
  raidId: string
  difficulty: Raid['difficulty']
  step: number
  gold: number
}

interface GetBestGoldRaidStatsByCharacterOptions {
  disableRaidCountLimit?: boolean
}

export const getBestGoldRaidStatsByCharacter = (
  character: Character | CharacterWithClears,
  options?: GetBestGoldRaidStatsByCharacterOptions,
) => {
  const { disableRaidCountLimit } = options || {}

  let stats: BestGoldRaidStats = {
    raidIds: [],
    steps: [],
    totalGold: 0,
  }

  let usedRaidNames: string[] = []

  for (const raid of RAIDS_ARRAY_ORDER_BY_GOLD_DESC) {
    if (raid.minLevel > character.level) continue
    if (!disableRaidCountLimit && usedRaidNames.length >= MAX_RAID_COUNT) break
    if (usedRaidNames.includes(raid.name)) continue

    usedRaidNames.push(raid.name)

    stats.raidIds.push(raid.id)

    for (const step of raid.steps) {
      // 관문 레벨 제한
      if (step.level > character.level) {
        // 하드 레이드인 경우 노말 레이드로 더 진행이 가능한지 확인합니다.
        // 로스트아크 골드 제한은 같은 이름의 레이드 기준으로 하므로 관문 레벨 제한이 걸렸다면 같은 종류의 레이드를 낮은 난이도로 진행이 가능합니다.
        if (raid.difficulty === '하드') {
          const normalRaid = RAIDS_ARRAY_ORDER_BY_GOLD_DESC.find(
            item => item.name === raid.name && item.difficulty === '노말',
          )

          if (normalRaid) {
            stats.raidIds.push(normalRaid.id)

            for (const normalStep of normalRaid.steps.slice(step.step - 1)) {
              if (normalStep.level > character.level) break

              stats.steps.push({
                raidId: normalRaid.id,
                difficulty: normalRaid.difficulty,
                step: normalStep.step,
                gold: normalStep.gold,
              })

              stats.totalGold += normalStep.gold
            }
          }
        }

        break
      }

      stats.steps.push({
        raidId: raid.id,
        difficulty: raid.difficulty,
        step: step.step,
        gold: step.gold,
      })

      stats.totalGold += step.gold
    }
  }

  stats.raidIds.sort((a, b) => RAIDS[b].minLevel - RAIDS[a].minLevel)

  return stats
}
