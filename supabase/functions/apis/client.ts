import { createClient } from 'supabase'
import { Database } from '../_shared/types/database.types.ts'

export const supabaseAdmin = createClient<Database>(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)
