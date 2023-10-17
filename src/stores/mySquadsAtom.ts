import { atom } from 'jotai'

import raidStudioClient from '@/libs/raidStudio/client'
import { MySquads } from '@/schemas/squad'

export const mySquadsAtom = atom(async () => {
  try {
    const { data } = await raidStudioClient.get<MySquads>('/users/me/squads')
    return data
  } catch (error) {
    return []
  }
})
