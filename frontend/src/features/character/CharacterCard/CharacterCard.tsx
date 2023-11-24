'use client'

import { ReactNode } from 'react'

import { css } from '@styled-system/css'

// const lostArkServerDiffWeek = Math.abs(dayjs('2023-10-24').diff(RAID_RESET_REFERENCE_DATE, 'week'))

export interface CharacterCardProps {
  children?: ReactNode
}

const CharacterCard = ({ children }: CharacterCardProps) => {
  return (
    <div className={css({ w: '19rem', rounded: 'md', border: 'base', p: '4', pos: 'relative' })}>
      {children}
    </div>
  )
}

export default CharacterCard
