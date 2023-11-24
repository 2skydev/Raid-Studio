import { CogIcon } from 'lucide-react'

import { Flex } from '@styled-system/jsx'

import Button from '@/components/Button'
import { Separator } from '@/components/Separator'

import CharacterCard from '@/features/character/CharacterCard'
import CharacterConfigDialog from '@/features/character/CharacterConfigDialog'
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
      <Flex alignItems="center" justifyContent="space-between">
        <CharacterProfile characterClassName={characterClassName} name={name} level={level} />

        <Button w="8" h="8" p="0" variant="ghost" onClick={() => setOpen(true)}>
          <CogIcon size="1rem" />
        </Button>
      </Flex>

      <Separator my="3" />

      <RaidTodoList clears={clears} fixedRaidIds={fixedRaidIds} onClear={onClear} />

      <CharacterConfigDialog characterName={name} open={open} onOpenChange={handleOpenChange} />
    </CharacterCard>
  )
}

export default CharacterCardWithRaidTodoList
