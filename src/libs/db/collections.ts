import { User } from '@/types/user'

import { db } from './client'

export const userCollection = db.collection<User>('users')
