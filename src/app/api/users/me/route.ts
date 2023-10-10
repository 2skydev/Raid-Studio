import { omit } from 'lodash'

import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return Response.json(
      {
        error: '로그인 후 이용해주세요.',
      },
      {
        status: 401,
      },
    )
  }

  const user = await collections.users.findOne({
    id: session.user.id,
  })

  if (!user) {
    return Response.json(
      {
        error: '유저를 찾을 수 없습니다.',
      },
      {
        status: 404,
      },
    )
  }

  return Response.json(omit(user, ['_id']))
}
