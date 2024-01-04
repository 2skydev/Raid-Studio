import { User } from '@supabase/supabase-js'

import { TEST_SQUAD_NAMES, TEST_USER_EMAILS } from '@/constants/test'

export const checkTestUser = (user: User) =>
  user.email ? TEST_USER_EMAILS.includes(user.email) : false
export const checkTestSquadName = (name: string) => TEST_SQUAD_NAMES.includes(name)
