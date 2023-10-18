import { ObjectId } from 'mongodb'

import collections from '@/libs/db/collections'
import { SquadMembers, SquadWithOverview } from '@/schemas/squad'

export const getSquadsWithOverview = async () => {
  const cursor = collections.squads.aggregate([
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userIds',
        foreignField: 'id',
        pipeline: [{ $limit: 5 }, { $project: { _id: 0, image: 1, name: 1, characterName: 1 } }],
        as: 'users',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'ownerUserId',
        foreignField: 'id',
        pipeline: [{ $project: { _id: 0, image: 1, name: 1, characterName: 1 } }],
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
    },
    {
      $project: {
        _id: 0,
        id: {
          $toString: '$_id',
        },
        name: 1,
        userCount: { $size: '$userIds' },
        users: 1,
        owner: 1,
      },
    },
  ])

  return (await cursor.toArray()) as SquadWithOverview[]
}

export const getSquadMembers = async (squadId: string): Promise<SquadMembers | null> => {
  const cursor = await collections.squads.aggregate([
    {
      $match: {
        _id: new ObjectId(squadId),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userIds',
        foreignField: 'id',
        pipeline: [{ $project: { _id: 0, id: 1, image: 1, name: 1, characterName: 1 } }],
        as: 'users',
      },
    },
    {
      $project: {
        _id: 0,
        users: 1,
      },
    },
  ])

  const data = (await cursor.toArray())[0]

  if (!data) return null

  return data.users
}

export const getSquadCode = async (squadId: string): Promise<string | null> => {
  const squad = await collections.squads.findOne(
    {
      _id: new ObjectId(squadId),
    },
    {
      projection: {
        code: 1,
      },
    },
  )

  if (!squad) return null

  return squad.code
}

export const isAccessibleSquad = async (squadId: string, userId: string): Promise<boolean> => {
  const squad = await collections.squads.findOne(
    {
      _id: new ObjectId(squadId),
      userIds: userId,
    },
    {
      projection: {
        _id: 1,
      },
    },
  )

  return Boolean(squad)
}
