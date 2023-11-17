import { css } from '@styled-system/css'

import { Avatar, AvatarImage } from '@/components/Avatar'
import { Badge } from '@/components/Badge'

import CharacterCard from '@/features/character/CharacterCard'
import useCharactersDetail from '@/features/character/hooks/useCharactersDetail'

import { Character } from '@/schemas/character'
import { CharacterClassName } from '@/types/character'
import { Tables } from '@/types/database.types'

export interface CharacterCardListWithUserProps
  extends Pick<Tables<'profiles'>, 'nickname' | 'photo'> {
  characters: Character[]
}

const CharacterCardListWithUser = ({
  nickname,
  photo,
  characters,
}: CharacterCardListWithUserProps) => {
  const { characters: _characters, weekGold } = useCharactersDetail(characters)

  return (
    <div className={css({ w: 'calc(19rem * 2 + token(sizes.4))' })}>
      <div className={css({ display: 'flex', alignItems: 'center', mb: '4' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '2', mr: '4' })}>
          <Avatar w="8" h="8">
            <AvatarImage src={photo} alt="profile" />
          </Avatar>
          {nickname}
        </div>

        <Badge>주간 골드: {weekGold.toLocaleString()}골드</Badge>
      </div>

      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
        {_characters.slice(0, 7).map(item => {
          return (
            <CharacterCard
              key={item.name}
              name={item.name}
              level={item.level}
              characterClassName={item.class as CharacterClassName}
            >
              <div
                className={css({
                  pos: 'absolute',
                  bottom: '0px',
                  left: '0px',
                  w: 'full',
                  h: '3px',
                })}
              >
                <div
                  className={css({
                    width: '33%',
                    h: 'full',
                    bg: 'teal.500',
                    // boxShadow: '0 0 5px rgb(21, 128, 61)',
                    roundedBottom: '5px',
                  })}
                ></div>
              </div>
            </CharacterCard>
          )
        })}
      </div>
    </div>
  )
}

export default CharacterCardListWithUser
