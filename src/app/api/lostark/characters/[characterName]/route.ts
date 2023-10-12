import LostArkAPI from '@/libs/lostark/api'
import { createCustomErrorResponse } from '@/utils/api'

export async function GET(request: Request, { params }: { params: { characterName: string } }) {
  const characters = await LostArkAPI.characters.getCharacters(params.characterName)

  if (!characters) {
    return createCustomErrorResponse('캐릭터를 찾을 수 없습니다.', 404)
  }

  return Response.json(characters)
}
