import collections from '@/libs/db/collections'

export const getSquads = async () => {
  const squads = await collections.squads.find(
    {},
    {
      limit: 10,
    },
  )

  return squads.toArray()
}
