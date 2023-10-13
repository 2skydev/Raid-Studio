import { nanoid } from 'nanoid'

import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'
import RaidStudioAPI from '@/libs/raidStudio/api'
import { squadCreateFormSchema } from '@/schemas/squad'
import { createCustomErrorResponse, createTryCatchErrorResponse } from '@/utils/api'

export async function GET(request: Request) {
  const squads = await RaidStudioAPI.squads.getSquads()

  return Response.json(squads)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  const userId = session.user.id

  try {
    const { name } = squadCreateFormSchema.parse(await request.json())

    const isExist = Boolean(
      await collections.squads.findOne(
        { name },
        {
          projection: {
            _id: 1,
          },
        },
      ),
    )

    if (isExist) {
      return createCustomErrorResponse('이미 사용중인 공격대명입니다.', 400)
    }

    await collections.squads.insertOne({
      name,
      userIds: [userId],
      code: nanoid(),
    })

    return Response.json({
      success: true,
    })
  } catch (error) {
    return createTryCatchErrorResponse(error)
  }
}
