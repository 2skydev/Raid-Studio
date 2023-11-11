'use client'

import UserProfileForm from '@/features/user/UserProfileForm'

import { useAuth } from '@/stores/userAtom'

const MyProfilePage = () => {
  const { user } = useAuth<true>()

  return <UserProfileForm id={user.id} name={user.profile.nickname} image={user.profile.photo} />
}

export default MyProfilePage
