import LostArkAPI from '@/libs/lostark/api'

export async function GET(request: Request, { params }: { params: { characterName: string } }) {
  const characters = await LostArkAPI.characters.getCharacters(params.characterName)

  if (!characters) {
    return Response.json(
      { error: '캐릭터를 찾을 수 없습니다.' },
      {
        status: 404,
      },
    )
  }

  return Response.json(characters)
}
