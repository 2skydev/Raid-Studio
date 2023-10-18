import { omit } from 'lodash'

import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'

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

export const getMyCharacters = async () => {
  const session = await getServerSession()

  if (!session) return null

  const userId = session.user.id

  const data = await collections.characters.findOne({ userId })

  if (!data) return null

  return data.characters
}
