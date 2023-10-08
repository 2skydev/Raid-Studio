import lostarkClient from '@/libs/lostark/client'

export async function GET(request: Request, { params }: { params: { characterName: string } }) {
  const { data } = await lostarkClient.get(`/characters/${params.characterName}/siblings`)

  if (!data) {
    return Response.json(
      { error: '캐릭터를 찾을 수 없습니다.' },
      {
        status: 404,
      },
    )
  }

  const characters = data.map((character: any) => ({
    server: character.ServerName,
    name: character.CharacterName,
    level: +character.ItemMaxLevel.replace(',', ''),
    class: character.CharacterClassName,
  }))

  return Response.json(characters)
}
