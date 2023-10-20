import { omit } from 'lodash'

import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'
import { CharacterWithClears } from '@/schemas/character'

export const getCurrentUser = async () => {
  const session = await getServerSession()

  if (!session) return null

  const user = await collections.users.findOne({ id: session.user.id })

  if (!user) return null

  return omit(user, ['_id'])
}

export const getMySquads = async () => {
  const session = await getServerSession()

  if (!session) return null

  const userId = session.user.id

  const cursor = collections.squads.find(
    { userIds: userId },
    {
      projection: {
        _id: false,
        id: {
          $toString: '$_id',
        },
        name: true,
      },
    },
  )

  return await cursor.toArray()
}

export const getMyCharacters = async (): Promise<CharacterWithClears[] | null> => {
  const session = await getServerSession()

  if (!session) return null

  const userId = session.user.id

  const data = await collections.characters.findOne({ userId })

  if (!data) return null

  const clears = await collections.clears
    .find({ userId }, { projection: { _id: 0, userId: 0, cooldownWeek: 0 }, sort: { step: 1 } })
    .toArray()

  return data.characters.map(character => {
    const characterClears = clears.filter(clear => clear.characterName === character.name)

    return {
      ...character,
      clears: characterClears.map(clear => omit(clear, ['characterName'])),
    }
  })
}
