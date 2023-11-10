'use client'

import { ReactNode, useEffect } from 'react'

import { useAtom, useAtomValue } from 'jotai'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'

import { mySquadsAtom } from '@/stores/mySquadsAtom'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

export interface MySquadSelectProps {
  children?: ReactNode
}

const MySquadSelect = ({ children }: MySquadSelectProps) => {
  const mySquads = useAtomValue(mySquadsAtom)
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom)

  return (
    <Select value={selectedSquadId} onValueChange={setSelectedSquadId}>
      <SelectTrigger focusRingColor="transparent" w="180px" h="10">
        <SelectValue placeholder="참여된 공격대 없음" />
      </SelectTrigger>

      <SelectContent>
        {mySquads.map(squad => (
          <SelectItem key={squad.id} value={squad.id}>
            {squad.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MySquadSelect
