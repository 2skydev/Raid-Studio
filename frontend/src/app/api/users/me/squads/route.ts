import RaidStudioAPI from '@/libs/raidStudio/api'
import { createCustomErrorResponse } from '@/utils/api'

export async function GET(request: Request) {
  const squads = await RaidStudioAPI.users.getMySquads()

  if (!squads) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  return Response.json(squads)
}
