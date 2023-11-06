'use client'

import { ReactNode } from 'react'

import { css } from '@styled-system/css'

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
    <div className={css({ w: '80', rounded: 'md', border: 'base', p: '4' })}>
      <CharacterProfile characterClassName={characterClassName} name={name} level={level} />
      {children}
    </div>
  )
}

export default CharacterCard
