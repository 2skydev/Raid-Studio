import { Squad } from '@/schemas/squad'
import { CharactersCollectionItem } from '@/types/character'
import { UsersCollectionItem } from '@/types/user'

import { db } from './index'

const collections = {
  users: db.collection<UsersCollectionItem>('users'),
  characters: db.collection<CharactersCollectionItem>('characters'),
  squads: db.collection<Squad>('squads'),
}

export default collections
