import { atomWithDefault } from 'jotai/utils'

import { RaidStudioAPI } from '@/apis'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { SquadName } from '@/types/squads.types'

type RaidsAtomValue = Tables<'raids'>[]

export const getRaidsAtomValue = async () => {
  const raids = await RaidStudioAPI.raids.getRaids()

  return raids || []
}

export const raidsAtom = atomWithDefault<RaidsAtomValue | Promise<RaidsAtomValue>>(
  getRaidsAtomValue,
)
