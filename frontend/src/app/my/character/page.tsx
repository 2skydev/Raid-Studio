'use client'

import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import { useAuth } from '@/stores/userAtom'

const MyCharacterPage = () => {
  const { user } = useAuth<true>()

  return <UserCharacterNameForm userId={user.id} characterName={user.profile.main_character_name} />
}

export default MyCharacterPage
