import { atom } from 'jotai'

import { User } from '@/schemas/user'

export const currentUserAtom = atom<undefined | null | User>(undefined)
