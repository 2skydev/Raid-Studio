import { Router } from 'oak'
import { State } from '../index.ts'
import { nanoid } from 'nanoid'
import { supabaseAdmin } from '../client.ts'

export const squadsRouter = new Router<State>()

squadsRouter.post(`/`, async (ctx) => {
  const { name } = await ctx.request.body().value

  const { data: { user } } = await ctx.state.supabase.auth.getUser()

  if (!user) {
    return ctx.throw(401, '로그인 후 이용해주세요.')
  }

  const { data: squad, error } = await supabaseAdmin.from('squads').insert(
    {
      name,
      code: nanoid(),
    },
  ).select().single()

  if (error || !squad) {
    if (error?.message.includes('squads_name_key')) {
      return ctx.throw(400, '이미 사용중인 공격대명입니다.')
    }

    return ctx.throw(500, error.message)
  }

  const { error: squads_user_error } = await supabaseAdmin.from(
    'squad_users',
  ).insert({
    squad_id: squad.id,
    user_id: user.id,
    role: 'owner',
  })

  if (squads_user_error) {
    return ctx.throw(500, squads_user_error.message)
  }

  ctx.response.body = 'ok'
})
