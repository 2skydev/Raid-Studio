'use client'

import { useAtomValue } from 'jotai'

import { css } from '@styled-system/css'

import SquadMemberManageDataTable from '@/features/squad/SquadMemberManageDataTable'

import useAPI from '@/hooks/useAPI'
import { SquadMembers } from '@/schemas/squad'
import { selectedSquadIdAtom } from '@/stores/selectedSquadIdAtom'

const StudioSquadMembersPage = () => {
  const selectedSquadId = useAtomValue(selectedSquadIdAtom)
  const { data } = useAPI<SquadMembers>(`/squads/${selectedSquadId}/members`, {
    disabled: !selectedSquadId,
  })

  const { data: code } = useAPI<{ code: string }>(`/squads/${selectedSquadId}/code`, {
    disabled: !selectedSquadId,
  })

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>공격대 멤버 관리</h1>

      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>

      <br />

      {data && code && <SquadMemberManageDataTable data={data} code={code.code} />}
    </div>
  )
}

export default StudioSquadMembersPage
