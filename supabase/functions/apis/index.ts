import { Application, isHttpError } from 'oak'

import { routes } from './routers/index.ts'
import { createClient } from 'supabase'
import { Database } from '../_shared/types/database.types.ts'

const origins = ['http://localhost:3000', 'https://raidstudio.2skydev.com']

export interface State {
  supabase: ReturnType<typeof createClient<Database>>
}

const app = new Application<State>()

app.use((ctx, next) => {
  const origin = ctx.request.url.origin

  if (!origins.includes(origin)) return next()

  ctx.response.headers.set('Access-Control-Allow-Origin', origin)
  ctx.response.headers.set(
    'Access-Control-Allow-Headers',
    'authorization, x-client-info, apikey, content-type',
  )

  return next()
})

app.use((ctx, next) => {
  const Authorization = ctx.request.headers.get('Authorization')!

  const supabase = createClient<Database>(
    Deno.env.get('DEV_ONLY_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('DEV_ONLY_SUPABASE_ANON_KEY') ??
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization } } },
  )

  ctx.state.supabase = supabase

  return next()
})

app.use(async (ctx, next) => {
  try {
    return await next()
  } catch (err) {
    if (isHttpError(err)) {
      ctx.response.status = err.status
      ctx.response.body = { error: err.message }
    } else {
      ctx.response.status = 500
      ctx.response.body = { error: 'Internal server error' }
    }
  }
})

app.use(routes)

await app.listen({ port: 8000 })
