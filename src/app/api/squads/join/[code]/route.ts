import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'
import { squadJoinFormSchema } from '@/schemas/squad'
import { createCustomErrorResponse, createTryCatchErrorResponse } from '@/utils/api'

export async function PATCH(request: Request, { params }: { params: { code: string } }) {
  const session = await getServerSession()

  if (!session) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  const userId = session.user.id

  try {
    const { code } = squadJoinFormSchema.parse(params)

    const squad = await collections.squads.findOne(
      { code },
      {
        projection: {
          _id: 1,
          userIds: 1,
        },
      },
    )

    if (!squad) {
      return createCustomErrorResponse('유효하지 않는 공격대 참여 코드입니다.', 400)
    }

    if (squad.userIds.includes(userId)) {
      return createCustomErrorResponse('이미 참여중인 공격대입니다.', 400)
    }

    await collections.squads.updateOne(
      {
        _id: squad._id,
      },
      {
        $push: {
          userIds: userId,
        },
      },
    )

    return Response.json({
      success: true,
    })
  } catch (error) {
    return createTryCatchErrorResponse(error)
  }
}
