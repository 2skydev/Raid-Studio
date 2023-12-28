import { User } from 'supabase'
import { TEST_SQUAD_NAMES, TEST_USER_EMAILS } from '../constants/test.ts'

export const checkTestUser = (user: User) => user.email ? TEST_USER_EMAILS.includes(user.email) : false
export const checkTestSquadName = (name: string) => TEST_SQUAD_NAMES.includes(name)