'use client'

import { useAtom } from 'jotai'
import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
          className="leading-1 h-auto w-auto border-none px-3 py-1.5 text-xs focus:ring-transparent"
          variant="ghost"
        >
          <SelectValue placeholder="참여된 공격대 없음" />
          <ChevronsUpDownIcon className="size-4 opacity-50" />
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
