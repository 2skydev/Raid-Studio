'use client'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import useSWR from 'swr'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import Skeleton from '@/components/Skeleton'

import { RaidStudioAPI } from '@/apis'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

export interface MySquadSelectProps {}

const MySquadSelect = ({}: MySquadSelectProps) => {
  const { data: mySquads = [], isLoading } = useSWR(
    'my_squads',
    RaidStudioAPI.squads.getCurrentUserSquads,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom)

  useEffect(() => {
    if (mySquads.length && selectedSquadId === null) {
      setSelectedSquadId(mySquads[0].id)
    }
  }, [selectedSquadId, mySquads])

  if (isLoading) {
    return <Skeleton w="180px" h="10" />
  }

  return (
    <Select
      value={selectedSquadId === null ? 'none' : String(selectedSquadId)}
      onValueChange={value => setSelectedSquadId(+value)}
    >
      <SelectTrigger focusRingColor="transparent" w="180px" h="10">
        <SelectValue placeholder="참여된 공격대 없음" />
      </SelectTrigger>

      <SelectContent>
        {!mySquads.length && (
          <SelectItem value="none" disabled>
            참여된 공격대 없음
          </SelectItem>
        )}

        {mySquads.map(squad => (
          <SelectItem key={squad.id} value={String(squad.id)}>
            {squad.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MySquadSelect
