import type { CharactersCollection } from '@/schemas/character'
import { ClearsCollection } from '@/schemas/clears'
import type { SquadsCollection } from '@/schemas/squad'
import type { UsersCollection } from '@/schemas/user'

import { db } from './index'

const collections = {
  users: db.collection<UsersCollection>('users'),
  characters: db.collection<CharactersCollection>('characters'),
  squads: db.collection<SquadsCollection>('squads'),
  clears: db.collection<ClearsCollection>('clears'),
}

export default collections
