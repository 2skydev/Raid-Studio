export interface Raid {
  id: string
  name: string
  difficulty: '노말' | '하드'
  minLevel: number
  steps: RaidStep[]
}

export interface RaidStep {
  step: number
  level: number
  cooldownWeek: number
  gold: number
}
