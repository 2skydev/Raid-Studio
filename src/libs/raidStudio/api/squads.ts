import { ObjectId } from 'mongodb'

import collections from '@/libs/db/collections'
import { SquadWithOverview } from '@/schemas/squad'

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

export const getSquadMembers = async (squadId: string) => {
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
        pipeline: [{ $project: { _id: 0, image: 1, name: 1, characterName: 1 } }],
        as: 'users',
      },
    },
    {
      $project: {
        _id: 0,
        users: 1,
        ownerUserId: 1,
        count: { $size: '$userIds' },
      },
    },
  ])

  const data = (await cursor.toArray())[0]

  if (!data) return null

  const squadMembers = {
    count: data.count,
    users: data.users,
  }

  return squadMembers
}
