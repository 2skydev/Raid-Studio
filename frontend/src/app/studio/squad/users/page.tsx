'use client'

import { useAtomValue } from 'jotai'
import useSWR from 'swr'

import { css } from '@styled-system/css'

import SquadUsersManageDataTable from '@/features/squad/SquadUsersManageDataTable'

import { RaidStudioAPI } from '@/apis'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

const StudioSquadUsersPage = () => {
  const selectedSquadId = useAtomValue(selectedSquadIdAtom)

  const { data: squadUsers, isLoading: isLoadingFromSquadUsers } = useSWR(
    selectedSquadId ? ['squad_users', selectedSquadId] : null,
    async ([, squadId]) => {
      return await RaidStudioAPI.squads.getSquadUsers(squadId)
    },
  )

  const { data: code, isLoading: isLoadingFromSquadCode } = useSWR(
    selectedSquadId ? [`squad_code`, selectedSquadId] : null,
    async ([, squadId]) => {
      return await RaidStudioAPI.squads.getSquadCode(squadId)
    },
  )

  const isLoading = isLoadingFromSquadUsers || isLoadingFromSquadCode

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>공격대 멤버 관리</h1>
      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>
      <br />

      <SquadUsersManageDataTable data={squadUsers || []} code={code || ''} isLoading={isLoading} />
    </div>
  )
}

export default StudioSquadUsersPage
