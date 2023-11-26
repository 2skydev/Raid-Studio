import { useAtomValue } from 'jotai'

import { raidsAtom } from '@/stores/raidsAtom'

const useRaids = () => {
  const raids = useAtomValue(raidsAtom)

  const getBestGoldRaidStatsByLevel = (level: number) => {}

  return {
    raids,
    getBestGoldRaidStatsByLevel,
  }
}

export default useRaids
