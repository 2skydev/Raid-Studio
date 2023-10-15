import { atom } from 'jotai'

import { User } from '@/schemas/user'

export const currentUserAtom = atom<null | User>(null)
