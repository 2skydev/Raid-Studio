'use client'

import { useAtomValue } from 'jotai'

import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import { userAtom } from '@/stores/userAtom'

const MyCharacterPage = () => {
  const user = useAtomValue(userAtom)!

  return <UserCharacterNameForm characterName={user.characterName || ''} />
}

export default MyCharacterPage
