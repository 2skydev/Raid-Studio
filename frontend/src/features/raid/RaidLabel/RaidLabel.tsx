import { css } from '@styled-system/css'

import { RaidDifficulty } from '@/types/raid.types'

export interface RaidLabelProps {
  difficulty: RaidDifficulty
  name?: string
}

const RaidLabel = ({ difficulty, name }: RaidLabelProps) => {
  return (
    <div className={css({ fontSize: 'sm', leading: '1' })}>
      <span
        className={css({
          color: difficulty === '노말' ? 'blue.300' : 'orange.500',
        })}
      >
        {difficulty}
      </span>
      {name && ` ${name}`}
    </div>
  )
}

export default RaidLabel
