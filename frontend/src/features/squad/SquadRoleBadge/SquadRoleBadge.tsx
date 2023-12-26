import { Badge } from '@/components/ui/badge'

import { Enums } from '@/types/database.types'

export interface SquadRoleBadgeProps {
  role: Enums<'squad_role'>
}

const SquadRoleBadge = ({ role }: SquadRoleBadgeProps) => {
  return (
    <div>
      {role === 'owner' && <Badge>공대장</Badge>}
      {role === 'normal' && <Badge variant="outline">팀원</Badge>}
    </div>
  )
}

export default SquadRoleBadge
