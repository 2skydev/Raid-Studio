import RaidStudioAPI from '@/libs/raidStudio/api'
import { createCustomErrorResponse } from '@/utils/api'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await RaidStudioAPI.users.getCurrentUser()

  if (!user) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  const isAccessibleSquad = await RaidStudioAPI.squads.isAccessibleSquad(params.id, user.id)

  if (!isAccessibleSquad) {
    return createCustomErrorResponse('요청한 공격대에 접근할 권한이 없습니다.', 403)
  }

  const squadsMembers = await RaidStudioAPI.squads.getSquadMembers(params.id)

  if (!squadsMembers) {
    return createCustomErrorResponse('공격대 정보를 불러올 수 없습니다.', 404)
  }

  return Response.json(squadsMembers)
}
