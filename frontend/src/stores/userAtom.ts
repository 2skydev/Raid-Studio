import { atomWithDefault } from 'jotai/utils'

import { RaidStudioAPI } from '@/apis'
import { Tables } from '@/types/database.types'

interface UserAtomValue {
  id: string
  profile: null | Tables<'profiles'>
}

export const getUserAtomValue = async () => {
  const profile = await RaidStudioAPI.profiles.getCurrentUserProfile()

  if (!profile) return null

  return {
    id: profile.id,
    profile,
  }
}

export const userAtom = atomWithDefault<UserAtomValue | null | Promise<UserAtomValue | null>>(
  getUserAtomValue,
)
