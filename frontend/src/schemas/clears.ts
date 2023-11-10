import { z } from 'zod'

export const clearsCollectionSchema = z.object({
  userId: z.string(),
  characterName: z.string(),
  raidId: z.string(),
  step: z.number(),
  cooldownWeek: z.number(),
  createdAt: z.string(),
})

export const clearsAPIPutBodySchema = clearsCollectionSchema.pick({
  userId: true,
  characterName: true,
  raidId: true,
  step: true,
})

export const clearsAPIDeleteBodySchema = clearsCollectionSchema.pick({
  userId: true,
  characterName: true,
  raidId: true,
})

export type ClearsCollection = z.infer<typeof clearsCollectionSchema>
export type ClearsAPIPutBody = z.infer<typeof clearsAPIPutBodySchema>
export type ClearsAPIDeleteBody = z.infer<typeof clearsAPIDeleteBodySchema>
