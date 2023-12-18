import { ReactNode, useState } from 'react'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import { Badge } from '@/components/Badge'

import RaidLabel from '@/features/raid/RaidLabel'

import useRaids from '@/hooks/useRaids'
import { Tables } from '@/types/database.types'
import { RaidDifficulty } from '@/types/raid.types'

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
    <div className={css({ border: 'base', p: '4', rounded: 'md' })}>
      <div className={css({ fontSize: 'md', fontWeight: 'bold', mb: '4' })}>{name}</div>

      <div className={css({ spaceY: '2' })}>
        {raidsGroupByDifficulty.map(raids => {
          const difficulty = raids[0].difficulty

          return (
            <Flex key={difficulty} gap="2" alignItems="center">
              <RaidLabel difficulty={difficulty as RaidDifficulty} />

              <Flex gap="1">
                {raids.map((raid, i) => {
                  const isDisabled = raid.level > level
                  const isActive = routes[i] === difficulty

                  return (
                    <Badge
                      key={raid.step}
                      variant={isActive ? 'default' : 'outline'}
                      opacity={isDisabled ? 0.5 : 1}
                      cursor="pointer"
                      onClick={() => !isDisabled && handleClickBadge(difficulty, i)}
                    >
                      {raid.step}
                    </Badge>
                  )
                })}
              </Flex>
            </Flex>
          )
        })}
      </div>
    </div>
  )
}

export default RaidRoot
