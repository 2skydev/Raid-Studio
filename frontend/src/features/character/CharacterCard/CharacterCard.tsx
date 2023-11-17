'use client'

import { ReactNode } from 'react'

import { ChevronDown } from 'lucide-react'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import Button from '@/components/Button'

import CharacterProfile from '@/features/character/CharacterProfile'

import { CharacterClassName } from '@/types/character'

// const lostArkServerDiffWeek = Math.abs(dayjs('2023-10-24').diff(RAID_RESET_REFERENCE_DATE, 'week'))

export interface CharacterCardProps {
  characterClassName: CharacterClassName
  name: string
  level: number
  children?: ReactNode
}

const CharacterCard = ({ characterClassName, name, level, children }: CharacterCardProps) => {
  return (
    <div className={css({ w: '19rem', rounded: 'md', border: 'base', p: '4', pos: 'relative' })}>
      <Flex alignItems="center" justifyContent="space-between">
        <CharacterProfile characterClassName={characterClassName} name={name} level={level} />

        <Flex alignItems="center" gap="2">
          <div className={css({ whiteSpace: 'nowrap', color: 'muted.foreground', fontSize: 'xs' })}>
            1 / 3
          </div>

          <Button w="8" h="8" p="0" variant="ghost">
            <ChevronDown size="1rem" />
          </Button>
        </Flex>
      </Flex>
      {children}
    </div>
  )
}

export default CharacterCard
