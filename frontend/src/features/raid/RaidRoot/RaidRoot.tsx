import { ReactNode, useState } from 'react'

import { Badge } from '@/components/ui/badge'

import RaidLabel from '@/features/raid/RaidLabel'

import useRaids from '@/hooks/useRaids'
import { Tables } from '@/types/database.types'
import { RaidDifficulty } from '@/types/raid.types'
import { cn } from '@/utils'

export interface RaidRootProps {
  children?: ReactNode
  name: string
  level?: number
}

const RAID_DIFFICULTY = ['노말', '하드']

const RaidRoot = ({ name, level = Infinity }: RaidRootProps) => {
  const [routes, setRoutes] = useState<string[]>([])
  const { raids } = useRaids()

  const handleClickBadge = (difficulty: string, i: number) => {
    if (i > routes.length) {
      setRoutes(prev => {
        const newRoutes = [...prev, ...Array(i - prev.length).fill(difficulty), difficulty]
        return newRoutes
      })
    } else {
      setRoutes(prev => {
        const newRoutes = [...prev]

        newRoutes[i] = difficulty

        return newRoutes
      })
    }
  }

  const raidsGroupByDifficulty = raids
    .filter(raid => raid.name === name)
    .reduce((acc, raid) => {
      const i = RAID_DIFFICULTY.indexOf(raid.difficulty)

      if (i === -1) return acc

      acc[i] ??= []

      acc[i].push(raid)

      return acc
    }, [] as Tables<'raids'>[][])

  return (
    <div className="rounded-md border p-4">
      <div className="mb-4 font-bold">{name}</div>

      <div className="space-y-2">
        {raidsGroupByDifficulty.map(raids => {
          const difficulty = raids[0].difficulty

          return (
            <div key={difficulty} className="flex items-center gap-2">
              <RaidLabel difficulty={difficulty as RaidDifficulty} />

              <div className="flex gap-1">
                {raids.map((raid, i) => {
                  const isDisabled = raid.level > level
                  const isActive = routes[i] === difficulty

                  return (
                    <Badge
                      key={raid.step}
                      variant={isActive ? 'default' : 'outline'}
                      className={cn('cursor-pointer', isDisabled ? 'opacity-50' : 'opacity-100')}
                      onClick={() => !isDisabled && handleClickBadge(difficulty, i)}
                    >
                      {raid.step}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RaidRoot
