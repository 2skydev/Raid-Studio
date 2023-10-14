import { z } from 'zod'

import { usersCollectionSchema } from '@/schemas/user'

export const squadsCollectionSchema = z.object({
  name: z
    .string({ invalid_type_error: '공격대명 형식이 올바르지 않습니다.' })
    .min(1, { message: '공격대명은 최소 1자 이상으로 입력해주세요' })
    .max(12, { message: '공격대명은 최대 12자 이하로 입력해주세요' }),
  userIds: z.array(usersCollectionSchema.shape.id),
  createdUserId: usersCollectionSchema.shape.id,
  code: z.string(),
})

export const squadCreateFormSchema = squadsCollectionSchema.pick({
  name: true,
})

export type SquadsCollection = z.infer<typeof squadsCollectionSchema>
