import { supabase } from '@/lib/supabase'

export const getRaids = async () => {
  const { data } = await supabase.from('raids').select()

  return data
}
