import { Context } from 'oak'
import { createClient } from 'supabase'
import { Database } from '../../_shared/types/database.types.ts'

export const createSupabaseClient = (ctx: Context) => {
  const Authorization = ctx.request.headers.get('Authorization')!

  const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization } } },
  )

  return supabase
}
