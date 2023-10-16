'use client'

import { useAtomValue } from 'jotai'

import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import { currentUserAtom } from '@/stores/currentUserAtom'

const MyCharacterPage = () => {
  const user = useAtomValue(currentUserAtom)!

  return <UserCharacterNameForm characterName={user.characterName || ''} />
}

export default MyCharacterPage
