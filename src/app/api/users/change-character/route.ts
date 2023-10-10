import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'
import LostArkAPI from '@/libs/lostark/api'

export async function PATCH(request: Request) {
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

  const userId = session.user.id
  const { characterName } = await request.json()

  const characters = await LostArkAPI.characters.getCharacters(characterName)

  if (!characters) {
    return Response.json(
      {
        error: '캐릭터를 찾을 수 없습니다.',
      },
      {
        status: 404,
      },
    )
  }

  await collections.users.updateOne(
    {
      id: userId,
    },
    {
      $set: {
        characterName,
      },
    },
  )

  await collections.characters.replaceOne(
    {
      userId,
    },
    {
      userId,
      characters,
    },
    {
      upsert: true,
    },
  )

  return Response.json({
    success: true,
  })
}
