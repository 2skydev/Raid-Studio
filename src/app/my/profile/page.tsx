import UserProfileForm from '@/features/user/UserProfileForm'

import RaidStudioAPI from '@/libs/raidStudio/api'

const MyProfilePage = async () => {
  const currentUser = await RaidStudioAPI.users.getCurrentUser()

  if (!currentUser) {
    return null
  }

  return <UserProfileForm id={currentUser.id} name={currentUser.name} image={currentUser.image} />
}

export default MyProfilePage
