import { atomWithDefault } from 'jotai/utils'

import { RaidStudioAPI } from '@/apis'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'

interface UserAtomValue {
  id: string
  profile: null | Tables<'profiles'>
}

export const getUserAtomValue = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const profile = await RaidStudioAPI.profiles.getUserProfile(session.user.id)

  return {
    id: session.user.id,
    profile,
  }
}

export const userAtom = atomWithDefault<UserAtomValue | null | Promise<UserAtomValue | null>>(
  getUserAtomValue,
)
