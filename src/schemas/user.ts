import { z } from 'zod'

export const usersCollectionSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: '닉네임 형식이 올바르지 않습니다.' })
    .min(1, { message: '닉네임은 최소 1자 이상으로 입력해주세요' })
    .max(12, { message: '닉네임은 최대 12자 이하로 입력해주세요' }),
  image: z.string(),
  characterName: z
    .string({ invalid_type_error: '대표 캐릭터명 형식이 올바르지 않습니다.' })
    .min(1, { message: '대표 캐릭터명은 최소 1자 이상으로 입력해주세요' })
    .max(12, { message: '대표 캐릭터명은 최대 12자 이하로 입력해주세요' }),
})

export const userProfileFormSchema = z.object({
  name: usersCollectionSchema.shape.name.trim(),
})

export const userCharacterNameFormSchema = z.object({
  characterName: usersCollectionSchema.shape.characterName.trim(),
})

export const usersAPIPatchBodySchema = usersCollectionSchema
  .pick({
    name: true,
    characterName: true,
  })
  .partial()

export type User = z.infer<typeof usersCollectionSchema>
export type UsersCollection = z.infer<typeof usersCollectionSchema>
