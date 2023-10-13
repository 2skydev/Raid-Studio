import { z } from 'zod'

import { userSchema } from '@/schemas/user'

export const characterSchema = z.object({
  server: z.string(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
})

export const userCharactersSchema = z.object({
  userId: userSchema.shape.id,
  characters: z.array(characterSchema),
})

export type Character = z.infer<typeof characterSchema>
