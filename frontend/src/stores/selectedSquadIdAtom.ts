import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { userAtom } from '@/stores/userAtom'

export const SELECTED_SQUAD_ID_MAP_STORAGE_KEY = 'jotai.selected-squad-id-map'

interface SelectedSquadIdMap {
  [userId: string]: number
}

const selectedSquadIdMapAtomWithStorage = atomWithStorage<SelectedSquadIdMap>(
  SELECTED_SQUAD_ID_MAP_STORAGE_KEY,
  {},
)

export const selectedSquadIdAtom = atom(
  async get => {
    const selectedSquadIdMap = get(selectedSquadIdMapAtomWithStorage)

    const user = await get(userAtom)

    if (user) {
      const savedValue = selectedSquadIdMap[user.id] as number | undefined

      return savedValue ?? user.squadNames[0]?.id ?? null
    }

    return null
  },
  async (get, set, update: number | null) => {
    const user = await get(userAtom)

    if (!user) return

    set(selectedSquadIdMapAtomWithStorage, update === null ? {} : { [user.id]: update })
  },
)
