import { CogIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import CharacterCard from '@/features/character/CharacterCard'
import CharacterConfigDrawer from '@/features/character/CharacterConfigDrawer'
import CharacterProfile, { CharacterProfileProps } from '@/features/character/CharacterProfile'
import RaidTodoList, { RaidTodoListProps } from '@/features/raid/RaidTodoList'

import useDialog from '@/hooks/useDialog'

export interface CharacterCardWithRaidTodoListProps
  extends CharacterProfileProps,
    RaidTodoListProps {}

const CharacterCardWithRaidTodoList = ({
  characterClassName,
  name,
  level,
  clears,
  fixedRaidIds,
  onClear,
}: CharacterCardWithRaidTodoListProps) => {
  const { open, setOpen, handleOpenChange } = useDialog()

  return (
    <CharacterCard>
      <div className="flex items-center justify-between">
        <CharacterProfile characterClassName={characterClassName} name={name} level={level} />

        <Button className="!size-8 p-0" variant="ghost" onClick={() => setOpen(true)}>
          <CogIcon size="1rem" />
        </Button>
      </div>

      <Separator className="my-3" />

      <RaidTodoList clears={clears} fixedRaidIds={fixedRaidIds} onClear={onClear} />

      <CharacterConfigDrawer characterName={name} open={open} onOpenChange={handleOpenChange} />
    </CharacterCard>
  )
}

export default CharacterCardWithRaidTodoList
