import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import RaidStudioAPI from '@/libs/raidStudio/api'

const MyCharacterPage = async () => {
  const currentUser = await RaidStudioAPI.users.getCurrentUser()

  if (!currentUser) {
    return null
  }

  return <UserCharacterNameForm characterName={currentUser.characterName || ''} />
}

export default MyCharacterPage
