'use client'

import { useAtomValue } from 'jotai'

import { css } from '@styled-system/css'

import SquadMemberManageDataTable from '@/features/squad/SquadMemberManageDataTable'

import useAPI from '@/hooks/useAPI'
import { SquadMembers } from '@/schemas/squad'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

const StudioSquadMembersPage = () => {
  const selectedSquadId = useAtomValue(selectedSquadIdAtom)
  const { data: members, isLoading: isLoadingFromSquadMembers } = useAPI<SquadMembers>(
    `/squads/${selectedSquadId}/members`,
    {
      disabled: !selectedSquadId,
    },
  )

  const { data: code, isLoading: isLoadingFromSquadCode } = useAPI<{ code: string }>(
    `/squads/${selectedSquadId}/code`,
    {
      disabled: !selectedSquadId,
    },
  )

  const isLoading = isLoadingFromSquadMembers || isLoadingFromSquadCode

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>공격대 멤버 관리</h1>
      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>
      <br />

      <SquadMemberManageDataTable
        data={members || []}
        code={code?.code || ''}
        isLoading={isLoading}
      />
    </div>
  )
}

export default StudioSquadMembersPage
