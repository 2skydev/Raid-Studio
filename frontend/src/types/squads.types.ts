import { Enums, Tables } from '@/types/database.types'

export interface SquadUser {
  id: string
  role: Enums<'squad_role'>
  profile: Pick<Tables<'profiles'>, 'nickname' | 'photo' | 'main_character_name'>
}

export interface SquadName {
  id: number
  name: string
}
