import { getServerSession } from '@/libs/auth'
import RaidStudioAPI from '@/libs/raidStudio/api'
import { clearsAPIDeleteBodySchema, clearsAPIPutBodySchema } from '@/schemas/clears'
import { createCustomErrorResponse, createTryCatchErrorResponse } from '@/utils/api'

export async function PUT(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  try {
    const body = clearsAPIPutBodySchema.parse(await request.json())

    if (body.userId !== session.user.id) {
      return createCustomErrorResponse('권한이 없습니다.', 403)
    }

    await RaidStudioAPI.clears.setCharacterRaidClear(body)

    return Response.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    return createTryCatchErrorResponse(error)
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  try {
    const body = clearsAPIDeleteBodySchema.parse(await request.json())

    if (body.userId !== session.user.id) {
      return createCustomErrorResponse('권한이 없습니다.', 403)
    }

    await RaidStudioAPI.clears.deleteCharacterRaidClear(body)

    return Response.json({
      success: true,
    })
  } catch (error) {
    return createTryCatchErrorResponse(error)
  }
}
