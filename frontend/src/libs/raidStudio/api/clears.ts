import { RAIDS } from '@/assets/data/raid'
import collections from '@/libs/db/collections'
import { ClearsAPIDeleteBody, ClearsAPIPutBody } from '@/schemas/clears'

export const setCharacterRaidClear = async ({
  userId,
  characterName,
  raidId,
  step,
}: ClearsAPIPutBody) => {
  const raid = RAIDS[raidId]
  const stepData = raid.steps[step - 1]

  await collections.clears.updateOne(
    {
      userId,
      characterName,
      raidId,
      cooldownWeek: stepData.cooldownWeek,
    },
    {
      $set: {
        userId,
        characterName,
        raidId,
        step,
        cooldownWeek: stepData.cooldownWeek,
        createdAt: new Date().toISOString(),
      },
    },
    {
      upsert: true,
    },
  )
}

export const deleteCharacterRaidClear = async ({
  userId,
  characterName,
  raidId,
}: ClearsAPIDeleteBody) => {
  await collections.clears.deleteMany({
    userId,
    characterName,
    raidId,
  })
}
