import { css } from '@styled-system/css'

import { Raid } from '@/types/raid'

export interface RaidLabelProps {
  difficulty: Raid['difficulty']
  name: string
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
      </span>{' '}
      {name}
    </div>
  )
}

export default RaidLabel
