import { atomWithDefault } from 'jotai/utils'

import { mySquadsAtom } from '@/stores/mySquadsAtom'

export const selectedSquadIdAtom = atomWithDefault(async get => {
  const mySquads = await get(mySquadsAtom)
  return mySquads[0]?.id
})
