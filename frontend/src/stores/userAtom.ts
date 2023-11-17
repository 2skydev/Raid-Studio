import { atomWithDefault } from 'jotai/utils'

import { RaidStudioAPI } from '@/apis'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { SquadName } from '@/types/squads.types'

interface UserAtomValue {
  id: string
  profile: Tables<'profiles'> | null
  squadNames: SquadName[]
}

export const getUserAtomValue = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const profile = await RaidStudioAPI.profiles.getUserProfile(session.user.id)
  const squadNames = await RaidStudioAPI.squads.getSquadNames(session.user.id)

  return {
    id: session.user.id,
    profile,
    squadNames: squadNames || [],
  }
}

export const userAtom = atomWithDefault<UserAtomValue | null | Promise<UserAtomValue | null>>(
  getUserAtomValue,
)
