import { Tables } from '@/types/database.types'

const clearPiecesToClearsMap = (
  clearPieces: Pick<
    Tables<'clears'>,
    'raid_name' | 'raid_step' | 'raid_difficulty' | 'cleared_at'
  >[],
) => {
  const clearsMap = new Map<string, any>()

  for (let item of clearPieces) {
    if (!clearsMap.has(item.raid_name)) {
      clearsMap.set(item.raid_name, [])
    }
  }

  return clearsMap
}
