'use client'

import UserProfileForm from '@/features/user/UserProfileForm'

import useAuth from '@/hooks/useAuth'

const MyProfilePage = () => {
  const { user } = useAuth<true>()

  return <UserProfileForm nickname={user.profile.nickname} photo={user.profile.photo} />
}

export default MyProfilePage
