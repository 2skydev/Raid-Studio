import { z } from 'zod'

export const characterSchema = z.object({
  server: z.string(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
})

export const userCharactersSchema = z.object({
  userId: z.string(),
  characters: z.array(characterSchema),
})

export type Character = z.infer<typeof characterSchema>
