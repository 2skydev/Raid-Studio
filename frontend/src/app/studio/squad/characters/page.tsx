'use client'

import { useAtomValue } from 'jotai'
import useSWR from 'swr'

import CharacterCardListWithUser from '@/features/character/CharacterCardListWithUser'

import { RaidStudioAPI } from '@/apis'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

const StudioCharactersPage = () => {
  const selectedSquadId = useAtomValue(selectedSquadIdAtom)

  const { data, isLoading } = useSWR(
    selectedSquadId ? ['squad_users_with_characters', selectedSquadId] : null,
    async ([, squadId]) => await RaidStudioAPI.squads.getSquadUsersWithCharacters(squadId),
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">공격대 모든 캐릭터</h1>
      <p className="text-muted-foreground">
        엔드 콘텐츠 골드 획득 횟수를 빠르게 확인할 수 있습니다
      </p>

      <div className="grid-cols-[repeat(2, calc(theme(spacing.72) * 2 + theme(spacing.4)))] mt-6 grid gap-x-24 gap-y-16">
        {isLoading && <div>로딩중...</div>}

        {data?.map(item => (
          <CharacterCardListWithUser
            key={item.id}
            nickname={item.profile.nickname}
            photo={item.profile.photo}
            characters={item.profile.characters.map(x => ({ ...x, fixedRaidIds: [] }))}
          />
        ))}
      </div>
    </div>
  )
}

export default StudioCharactersPage
