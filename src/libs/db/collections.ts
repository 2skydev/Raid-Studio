import { CharactersCollectionItem } from '@/types/character'
import { UsersCollectionItem } from '@/types/user'

import { db } from './index'

const collections = {
  users: db.collection<UsersCollectionItem>('users'),
  characters: db.collection<CharactersCollectionItem>('characters'),
}

export default collections
