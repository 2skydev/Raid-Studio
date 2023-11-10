import { Router } from 'oak'
import { State } from '../index.ts'

export const lostarkRouter = new Router<State>()

lostarkRouter.get(`/characters/:characterName`, async (ctx) => {
  const { characterName } = ctx.params

  const user = await ctx.state.supabase.auth.getUser()

  if (!user.data.user) {
    return ctx.throw(401, 'Unauthorized')
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
