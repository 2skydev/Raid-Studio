'use client'

import { useAtom } from 'jotai'
import { ChevronsUpDownIcon } from 'lucide-react'

import { css } from '@styled-system/css'

import Button from '@/components/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'

import useAuth from '@/hooks/useAuth'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

export interface MySquadSelectProps {}

const MySquadSelect = ({}: MySquadSelectProps) => {
  const { user } = useAuth()
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom)

  return (
    <Select
      value={selectedSquadId === null ? 'none' : String(selectedSquadId)}
      onValueChange={value => setSelectedSquadId(+value)}
    >
      <SelectTrigger asChild>
        <Button
          focusRingColor="transparent"
          variant="ghost"
          w="auto"
          h="auto"
          fontSize="xs"
          border="none"
          px="3"
          py="1.5"
          leading="1"
        >
          <SelectValue placeholder="참여된 공격대 없음" />
          <ChevronsUpDownIcon size="1rem" className={css({ color: 'muted.foreground' })} />
        </Button>
      </SelectTrigger>

      <SelectContent>
        {!user?.squadNames?.length && (
          <SelectItem value="none" disabled>
            참여된 공격대 없음
          </SelectItem>
        )}

        {user?.squadNames?.map(squad => (
          <SelectItem key={squad.id} value={String(squad.id)}>
            {squad.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MySquadSelect
