import { Router } from 'oak'
import { State } from '../index.ts'

export const lostarkRouter = new Router<State>()

lostarkRouter.get(`/characters/:characterName`, async (ctx) => {
  const { characterName } = ctx.params

  const { data: { user } } = await ctx.state.supabase.auth.getUser()

  if (!user) {
    return ctx.throw(401, '로그인 후 이용해주세요.')
  }

  const data = await fetch(
    `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get('LOSTARK_API_KEY')}`,
      },
    },
  ).then((res) => res.json())

  ctx.response.body = data
    .map((character: any) => ({
      server: character.ServerName,
      name: character.CharacterName,
      level: +character.ItemMaxLevel.replace(',', ''),
      class: character.CharacterClassName,
    }))
    .filter((character: any) => character.level >= 1415)
})
