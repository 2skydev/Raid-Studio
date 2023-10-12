import collections from '@/libs/db/collections'
import LostArkAPI from '@/libs/lostark/api'
import RaidStudioAPI from '@/libs/raidStudio/api'
import { usersAPIPatchBodySchema } from '@/schemas/user'
import { createCustomErrorResponse, createTryCatchErrorResponse } from '@/utils/api'

export async function GET(request: Request) {
  const user = await RaidStudioAPI.users.getCurrentUser()

  if (!user) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  return Response.json(user)
}

export async function PATCH(request: Request) {
  const user = await RaidStudioAPI.users.getCurrentUser()

  if (!user) {
    return createCustomErrorResponse('로그인 후 이용해주세요.', 401)
  }

  try {
    const body = usersAPIPatchBodySchema.parse(await request.json())

    if (body.characterName) {
      const characters = await LostArkAPI.characters.getCharacters(body.characterName)

      if (!characters) {
        return createCustomErrorResponse('캐릭터를 찾을 수 없습니다.', 404)
      }

      await collections.characters.replaceOne(
        {
          userId: user.id,
        },
        {
          userId: user.id,
          characters,
        },
        {
          upsert: true,
        },
      )
    }

    await collections.users.updateOne(
      {
        id: user.id,
      },
      {
        $set: body,
      },
    )

    return Response.json({
      success: true,
    })
  } catch (error) {
    return createTryCatchErrorResponse(error)
  }
}
