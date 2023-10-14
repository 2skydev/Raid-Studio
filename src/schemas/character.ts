import { z } from 'zod'

import { usersCollectionSchema } from '@/schemas/user'

export const characterSchema = z.object({
  server: z.string(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
})

export const charactersCollectionSchema = z.object({
  userId: usersCollectionSchema.shape.id,
  characters: z.array(characterSchema),
})

export type Character = z.infer<typeof characterSchema>
export type CharactersCollection = z.infer<typeof charactersCollectionSchema>
