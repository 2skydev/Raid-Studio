import { ReactNode } from 'react'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import { Badge } from '@/components/Badge'

import useRaids from '@/hooks/useRaids'
import { Tables } from '@/types/database.types'

export interface RaidRootProps {
  children?: ReactNode
  name: string
  level?: number
}

const RAID_DIFFICULTY = ['노말', '하드']

const RaidRoot = ({ name, level = Infinity }: RaidRootProps) => {
  const { raids } = useRaids()

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
    <div>
      <div className={css({ fontSize: 'md', fontWeight: 'bold', mb: '2' })}>{name}</div>

      <div className={css({ spaceY: '1' })}>
        {raidsGroupByDifficulty.map(raids => {
          const difficulty = raids[0].difficulty

          return (
            <Flex key={difficulty} gap="2" alignItems="center">
              <div className={css({ fontSize: 'sm' })}>{difficulty}</div>

              <Flex gap="1">
                {raids.map(raid => (
                  <Badge
                    className={css({
                      opacity: raid.level > level ? 0.5 : 1,
                    })}
                    key={raid.step}
                    variant="outline"
                    cursor="pointer"
                  >
                    {raid.step}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          )
        })}
      </div>
    </div>
  )
}

export default RaidRoot
