import { css } from '@styled-system/css'

import { Avatar, AvatarImage } from '@/components/Avatar'
import { Badge } from '@/components/Badge'

import CharacterCard from '@/features/character/CharacterCard'
import useCharactersDetail from '@/features/character/hooks/useCharactersDetail'

import { Character } from '@/schemas/character'
import { User } from '@/schemas/user'
import { CharacterClassName } from '@/types/character'

export interface CharacterCardListWithUserProps {
  user: User
  characters: Character[]
}

const CharacterCardListWithUser = ({
  user,
  characters: charactersProp,
}: CharacterCardListWithUserProps) => {
  const { characters, weekGold } = useCharactersDetail(charactersProp)

  return (
    <div className={css({ mt: '8' })}>
      <div className={css({ display: 'flex', alignItems: 'center', mb: '4' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '2', mr: '4' })}>
          <Avatar w="8" h="8">
            <AvatarImage src={user.image} alt="profile" />
          </Avatar>
          {user.name}
        </div>

        <Badge>주간 골드: {weekGold.toLocaleString()}골드</Badge>
      </div>

      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
        {characters.map(item => {
          return (
            <CharacterCard
              key={item.name}
              name={item.name}
              level={item.level}
              characterClassName={item.class as CharacterClassName}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CharacterCardListWithUser
