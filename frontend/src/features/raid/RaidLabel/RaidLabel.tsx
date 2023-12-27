import { RaidDifficulty } from '@/types/raid.types'
import { cn } from '@/utils'

export interface RaidLabelProps {
  difficulty: RaidDifficulty
  name?: string
}

const RaidLabel = ({ difficulty, name }: RaidLabelProps) => {
  return (
    <div className="text-sm leading-none">
      <span className={cn(difficulty === '노말' ? 'text-blue-300' : 'text-orange-500')}>
        {difficulty}
      </span>
      {name && ` ${name}`}
    </div>
  )
}

export default RaidLabel
