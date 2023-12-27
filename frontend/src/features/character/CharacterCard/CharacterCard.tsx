'use client'

import { ReactNode } from 'react'

// const lostArkServerDiffWeek = Math.abs(dayjs('2023-10-24').diff(RAID_RESET_REFERENCE_DATE, 'week'))

export interface CharacterCardProps {
  children?: ReactNode
}

const CharacterCard = ({ children }: CharacterCardProps) => {
  return <div className="relative w-[19rem] rounded-md border p-4">{children}</div>
}

export default CharacterCard
