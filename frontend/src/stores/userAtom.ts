import { atomWithDefault } from 'jotai/utils'

import { RaidStudioAPI } from '@/apis'
import { channelTalk } from '@/lib/channelTalk'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { SquadName } from '@/types/squads.types'
import { checkTestUser } from '@/utils/test'

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
  let squadNames: SquadName[] = []

  if (profile) {
    squadNames = (await RaidStudioAPI.squads.getSquadNames(session.user.id)) || []

    if (!checkTestUser(session.user)) {
      channelTalk.updateUser({
        profile: {
          id: session.user.id,
          memberId: session.user.id,
          name: profile.nickname,
          avatarUrl: profile.photo,
          email: session.user.email as string,
        },
      })
    }
  }

  return {
    id: session.user.id,
    profile,
    squadNames,
  }
}

export const userAtom = atomWithDefault<UserAtomValue | null | Promise<UserAtomValue | null>>(
  getUserAtomValue,
)
