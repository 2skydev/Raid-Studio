import collections from '@/libs/db/collections'
import LostArkAPI from '@/libs/lostark/api'
import RaidStudioAPI from '@/libs/raidStudio/api'
import { createCustomErrorResponse } from '@/utils/api'

export async function PATCH(request: Request) {
  const user = await RaidStudioAPI.users.getCurrentUser()

  if (!user) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  if (!user.characterName) {
    return createCustomErrorResponse('캐릭터 정보가 없습니다.', 404)
  }

  const lostArkCharacters = await LostArkAPI.characters.getCharacters(user.characterName)

  if (!lostArkCharacters) {
    return createCustomErrorResponse('캐릭터 정보를 찾을 수 없습니다.', 404)
  }

  await RaidStudioAPI.users.mergeAndUpSertCharacters(user.id, lostArkCharacters)

  return Response.json({ success: true })
}
