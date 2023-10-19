'use client'

import { useMemo } from 'react'

import { useAtomValue } from 'jotai'

import { css } from '@styled-system/css'

import CharacterCardListWithUser from '@/features/character/CharacterCardListWithUser'

import useAPI from '@/hooks/useAPI'
import { CharactersWithUser } from '@/schemas/character'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

const StudioCharactersPage = () => {
  const selectedSquadId = useAtomValue(selectedSquadIdAtom)

  const { data, isLoading } = useAPI<CharactersWithUser[]>(`/squads/${selectedSquadId}/characters`)

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>공격대 모든 캐릭터</h1>
      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>

      <div className={css({ mt: '6' })}>
        {isLoading && <div>로딩중...</div>}

        {data &&
          data.map(item => (
            <CharacterCardListWithUser
              key={item.user.id}
              user={item.user}
              characters={item.characters}
            />
          ))}
      </div>
    </div>
  )
}

export default StudioCharactersPage
