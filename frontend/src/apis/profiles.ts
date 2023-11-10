import { supabase } from '@/lib/supabase'

export const updateMainCharacterName = async (userId: string, name: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ main_character_name: name })
    .eq('id', userId)

  if (error) throw error
}
