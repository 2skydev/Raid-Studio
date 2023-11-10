import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { mySquadsAtom } from '@/stores/mySquadsAtom'

const KEY = 'jotai.selectedSquadId'

const persistenceAtom = atomWithStorage<null | string>(KEY, null)

export const selectedSquadIdAtom = atom(
  async get => {
    const selectedSquadId = get(persistenceAtom)

    const mySquads = await get(mySquadsAtom)
    return selectedSquadId || mySquads[0]?.id
  },
  (get, set, id: string) => {
    set(persistenceAtom, id)
  },
)
