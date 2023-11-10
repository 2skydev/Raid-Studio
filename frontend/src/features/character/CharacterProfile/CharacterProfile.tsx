import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'

import { CharacterClassName } from '@/types/character'

export interface CharacterProfileProps {
  characterClassName: CharacterClassName
  name: string
  level: number
}

const CharacterProfile = ({ characterClassName, name, level }: CharacterProfileProps) => {
  return (
    <Flex alignItems="center">
      <CharacterClassIcon characterClassName={characterClassName} width={26} height={26} />

      <div className={css({ ml: '3' })}>
        <div className={css({ fontSize: 'sm', fontWeight: 'medium', leading: 'tight' })}>
          {name}
        </div>
        <div
          className={css({
            fontSize: 'xs',
            color: 'muted.foreground',
            leading: 'tight',
          })}
        >
          {characterClassName} / {level}
        </div>
      </div>
    </Flex>
  )
}

export default CharacterProfile
