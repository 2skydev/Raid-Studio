import { getServerSession } from '@/libs/auth'
import { userCollection } from '@/libs/db/collections'

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

  const { characterName } = await request.json()

  await userCollection.updateOne(
    {
      id: session.user.id,
    },
    {
      $set: {
        characterName,
      },
    },
  )

  return Response.json({
    success: true,
  })
}
