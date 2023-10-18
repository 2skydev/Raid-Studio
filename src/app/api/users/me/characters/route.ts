import RaidStudioAPI from '@/libs/raidStudio/api'
import { createCustomErrorResponse } from '@/utils/api'

export async function GET(request: Request) {
  const characters = await RaidStudioAPI.users.getMyCharacters()

  if (!characters) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  return Response.json(characters)
}
