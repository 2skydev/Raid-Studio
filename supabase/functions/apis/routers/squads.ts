import { Router } from 'oak'
import { State } from '../index.ts'
import { nanoid } from 'nanoid'
import { supabaseAdmin } from '../client.ts'
import { checkTestSquadName, checkTestUser } from '../../_shared/utils/test.ts'

export const squadsRouter = new Router<State>()

squadsRouter.post('/', async (ctx) => {
  const { name } = await ctx.request.body().value

  const { data: { user } } = await ctx.state.supabase.auth.getUser()

  if (!user) {
    return ctx.throw(401, '로그인 후 이용해주세요.')
  }

  if (checkTestUser(user)) {
    return ctx.throw(403, '테스트 계정으로는 공격대를 만들 수 없습니다.')
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

squadsRouter.put('/join/:code', async (ctx) => {
  const { code } = ctx.params

  const { data: { user } } = await ctx.state.supabase.auth.getUser()

  if (!user) {
    return ctx.throw(401, '로그인 후 이용해주세요.')
  }

  if (checkTestUser(user)) {
    return ctx.throw(403, '테스트 계정으로는 공격대에 참여할 수 없습니다.')
  }

  const { data: squad } = await supabaseAdmin.from('squads').select('id, name').eq(
    'code',
    code,
  ).single()

  if (!squad) {
    return ctx.throw(404, '존재하지 않는 공격대 참여 코드입니다.')
  }

  if (checkTestSquadName(squad.name)) {
    return ctx.throw(403, '테스트 공격대에는 참여할 수 없습니다.')
  }

  const { data: squad_user } = await supabaseAdmin.from('squad_users')
    .select('id')
    .eq('squad_id', squad.id)
    .eq('user_id', user.id)
    .single()

  if (squad_user) {
    return ctx.throw(400, '이미 참여중인 공격대입니다.')
  }

  const { error: squads_user_error } = await supabaseAdmin.from(
    'squad_users',
  ).insert({
    squad_id: squad.id,
    user_id: user.id,
  })

  if (squads_user_error) {
    return ctx.throw(500, squads_user_error.message)
  }

  ctx.response.body = 'ok'
})
