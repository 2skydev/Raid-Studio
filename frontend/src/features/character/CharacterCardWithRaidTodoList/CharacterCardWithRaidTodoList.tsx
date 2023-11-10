import { ReactNode } from 'react'

import { Separator } from '@/components/Separator'

import CharacterCard, { CharacterCardProps } from '@/features/character/CharacterCard'
import RaidTodoList, { RaidTodoListProps } from '@/features/raid/RaidTodoList'

export interface CharacterCardWithRaidTodoListProps extends CharacterCardProps, RaidTodoListProps {}

const CharacterCardWithRaidTodoList = ({
  characterClassName,
  name,
  level,
  clears,
  fixedRaidIds,
  onClear,
}: CharacterCardWithRaidTodoListProps) => {
  return (
    <CharacterCard characterClassName={characterClassName} name={name} level={level}>
      <Separator my="3" />

      <RaidTodoList clears={clears} fixedRaidIds={fixedRaidIds} onClear={onClear} />
    </CharacterCard>
  )
}

export default CharacterCardWithRaidTodoList
