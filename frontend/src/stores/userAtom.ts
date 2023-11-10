import { atomWithDefault } from 'jotai/utils'

import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'

interface UserAtomValue {
  id: string
  profile: null | Tables<'profiles'>
}

export const userAtom = atomWithDefault<UserAtomValue | Promise<UserAtomValue | null>>(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const { data: profiles } = await supabase.from('profiles').select().eq('id', session.user.id)

  return {
    id: session.user.id,
    profile: profiles?.[0] || null,
  }
})
