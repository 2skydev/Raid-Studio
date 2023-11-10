import { z } from 'zod'

import { clearsCollectionSchema } from '@/schemas/clears'
import { usersCollectionSchema } from '@/schemas/user'

export const lostArkCharacterSchema = z.object({
  server: z.string(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
})

export const characterSchema = z.object({
  server: z.string(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
  fixedRaidIds: z.array(z.string()),
})

export const charactersCollectionSchema = z.object({
  userId: usersCollectionSchema.shape.id,
  characters: z.array(characterSchema),
})

export const charactersWithUserSchema = z.object({
  user: usersCollectionSchema,
  characters: z.array(characterSchema),
})

export const characterWithClearsSchema = z
  .object({
    clears: z.array(
      clearsCollectionSchema.omit({ userId: true, characterName: true, cooldownWeek: true }),
    ),
  })
  .merge(characterSchema)

export type LostArkCharacter = z.infer<typeof lostArkCharacterSchema>
export type Character = z.infer<typeof characterSchema>
export type CharactersCollection = z.infer<typeof charactersCollectionSchema>
export type CharactersWithUser = z.infer<typeof charactersWithUserSchema>
export type CharacterWithClears = z.infer<typeof characterWithClearsSchema>
