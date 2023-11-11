import { useAtom } from 'jotai'
import { useRouter } from 'next-nprogress-bar'

import { supabase } from '@/lib/supabase'
import { getUserAtomValue, userAtom } from '@/stores/userAtom'
import { NonNullableDeep } from '@/types/util.types'

const useAuth = <Authenticated extends boolean = false>() => {
  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)

  const signInWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  }

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
    user: user as Authenticated extends true ? NonNullableDeep<typeof user> : typeof user | null,
    setUser,
    signInWithDiscord,
    signOut,
    reload,
  }
}

export default useAuth
