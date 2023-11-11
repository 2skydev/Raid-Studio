import { useAtom } from 'jotai'
import { atomWithDefault } from 'jotai/utils'
import { useRouter } from 'next-nprogress-bar'

import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types'
import { NonNullableDeep } from '@/types/util.types'

interface UserAtomValue {
  id: string
  profile: null | Tables<'profiles'>
}

export const getUserAtomValue = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const { data: profiles } = await supabase.from('profiles').select().eq('id', session.user.id)

  return {
    id: session.user.id,
    profile: profiles?.[0] || null,
  }
}

export const useAuth = <Authenticated extends boolean = false>() => {
  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setUser(null)
  }

  const reload = async () => {
    const value = await getUserAtomValue()
    setUser(value)
    return value
  }

  return {
    user: user as Authenticated extends true
      ? NonNullableDeep<UserAtomValue>
      : UserAtomValue | null,
    setUser,
    signOut,
    reload,
  }
}

export const userAtom = atomWithDefault<UserAtomValue | null | Promise<UserAtomValue | null>>(
  getUserAtomValue,
)
