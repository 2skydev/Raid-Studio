import { omit } from 'lodash'

import { getServerSession } from '@/libs/auth'
import collections from '@/libs/db/collections'

export const getCurrentUser = async () => {
  const session = await getServerSession()

  if (!session) return null

  const user = await collections.users.findOne({ id: session.user.id })

  if (!user) return null

  return omit(user, ['_id'])
}
