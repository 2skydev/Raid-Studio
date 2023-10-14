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
