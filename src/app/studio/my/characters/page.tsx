'use client'

import { css } from '@styled-system/css'

import { Badge } from '@/components/Badge'
import Skeleton from '@/components/Skeleton'

import CharacterCard from '@/features/character/CharacterCard'
import useCharactersDetail from '@/features/character/hooks/useCharactersDetail'

import useAPI from '@/hooks/useAPI'
import { Character } from '@/schemas/character'
import { CharacterClassName } from '@/types/character'

const StudioCharactersPage = () => {
  const { data, isLoading } = useAPI<Character[]>('/users/me/characters')

  const { characters, weekGold } = useCharactersDetail(data || [])

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>내 캐릭터 관리</h1>
      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>

      <div className={css({ mt: '6' })}>
        <div className={css({ display: 'flex', mb: '6' })}>
          {isLoading && <Skeleton w="40" h="6" rounded="full" />}

          {!isLoading && (
            <>
              <Badge>주간 골드: {weekGold.toLocaleString()}골드</Badge>
            </>
          )}
        </div>

        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
          {isLoading &&
            Array(9)
              .fill(0)
              .map((_, index) => <Skeleton key={index} w="80" h="20" />)}

          {!isLoading &&
            characters.map(item => {
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
    </div>
  )
}

export default StudioCharactersPage
