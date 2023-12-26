import CharacterClassIcon from '@/features/character/CharacterClassIcon'

import { CharacterClassName } from '@/types/character'

export interface CharacterProfileProps {
  characterClassName: CharacterClassName
  name: string
  level: number
}

const CharacterProfile = ({ characterClassName, name, level }: CharacterProfileProps) => {
  return (
    <div className="flex items-center">
      <CharacterClassIcon characterClassName={characterClassName} width={26} height={26} />

      <div className="ml-3">
        <div className="text-sm font-medium leading-tight">{name}</div>
        <div className="text-xs leading-tight text-muted-foreground">
          {characterClassName} / {level}
        </div>
      </div>
    </div>
  )
}

export default CharacterProfile
