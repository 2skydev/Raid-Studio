'use client'

import { useAtomValue } from 'jotai'

import UserProfileForm from '@/features/user/UserProfileForm'

import { userAtom } from '@/stores/userAtom'

const MyProfilePage = () => {
  const user = useAtomValue(userAtom)!

  return <UserProfileForm id={user.id} name={user.name || ''} image={user.image} />
}

export default MyProfilePage
