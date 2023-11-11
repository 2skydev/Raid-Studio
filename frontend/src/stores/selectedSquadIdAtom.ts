import { atomWithStorage } from 'jotai/utils'

const KEY = 'jotai.selectedSquadId'

export const selectedSquadIdAtom = atomWithStorage<null | number>(KEY, null)
