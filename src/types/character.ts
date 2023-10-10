export interface Character {
  server: string
  name: string
  level: number
  class: string
}

export interface CharactersCollectionItem {
  userId: string
  characters: Character[]
}
