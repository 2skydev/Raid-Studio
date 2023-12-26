import { ChevronDownIcon } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import CharacterCard from '@/features/character/CharacterCard'
import CharacterProfile from '@/features/character/CharacterProfile'
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
    <div className="w-[calc(19rem * 2 + token(spacing.4))]">
      <div className="mb-4 flex items-center">
        <div className="mr-4 flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={photo} alt="profile" />
          </Avatar>
          {nickname}
        </div>

        <Badge>주간 골드: {weekGold.toLocaleString()}골드</Badge>
      </div>

      <div className="flex flex-wrap gap-4">
        {_characters.slice(0, 6).map(item => {
          return (
            <CharacterCard key={item.name}>
              <div className="flex items-center justify-between">
                <CharacterProfile
                  name={item.name}
                  level={item.level}
                  characterClassName={item.class as CharacterClassName}
                />

                <div className="flex items-center gap-2">
                  <div className="whitespace-nowrap text-xs text-muted-foreground">1 / 3</div>

                  <Button className="size-8 p-0" variant="ghost">
                    <ChevronDownIcon size="1rem" />
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-[3px] w-full">
                <div className="shadow-[0 0 5px theme(colors.teal.500)] h-full w-[33%] rounded-b-[5px] bg-teal-500" />
              </div>
            </CharacterCard>
          )
        })}
      </div>
    </div>
  )
}

export default CharacterCardListWithUser
