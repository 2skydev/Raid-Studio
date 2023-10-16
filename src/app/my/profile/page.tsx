'use client'

import { useAtomValue } from 'jotai'

import UserProfileForm from '@/features/user/UserProfileForm'

import { currentUserAtom } from '@/stores/currentUserAtom'

const MyProfilePage = () => {
  const user = useAtomValue(currentUserAtom)!

  return <UserProfileForm id={user.id} name={user.name || ''} image={user.image} />
}

export default MyProfilePage
