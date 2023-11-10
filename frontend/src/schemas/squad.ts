import { z } from 'zod'

import { usersCollectionSchema } from '@/schemas/user'

export const SquadFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9가-힣\s]{1,12}$/, {
    message: '공백, 영문, 숫자, 한글, 1 ~ 12글자',
  }),
  code: z.string().regex(/^[a-zA-Z0-9가-힣\s\_\-]{1,30}$/, {
    message: '공백, 영문, 숫자, 한글, _, -, 1 ~ 30글자',
  }),
})

export const squadsCollectionSchema = z.object({
  name: z
    .string({ invalid_type_error: '공격대명 형식이 올바르지 않습니다.' })
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, {
      message: '공격대명은 공백, 영문, 숫자, 한글만 입력 가능합니다.',
    })
    .min(1, { message: '공격대명은 최소 1자 이상으로 입력해주세요' })
    .max(12, { message: '공격대명은 최대 12자 이하로 입력해주세요' }),
  userIds: z.array(usersCollectionSchema.shape.id),
  ownerUserId: usersCollectionSchema.shape.id,
  code: z.string().min(1, { message: '공격대 참여 코드는 최소 1자 이상으로 입력해주세요' }),
})

export const squadCreateFormSchema = z.object({
  name: squadsCollectionSchema.shape.name.trim(),
})

export const squadJoinFormSchema = z.object({
  code: squadsCollectionSchema.shape.code.trim(),
})

export const squadWithOverviewSchema = z.object({
  id: z.string(),
  name: squadsCollectionSchema.shape.name,
  userCount: z.number(),
  users: z.array(
    usersCollectionSchema.pick({
      image: true,
      name: true,
      characterName: true,
    }),
  ),
  owner: usersCollectionSchema.pick({
    image: true,
    name: true,
    characterName: true,
  }),
})

export const mySquads = z.array(
  z.object({
    id: z.string(),
    name: squadsCollectionSchema.shape.name,
  }),
)

export const squadMembersSchema = z.array(
  usersCollectionSchema.pick({
    id: true,
    image: true,
    name: true,
    characterName: true,
  }),
)

export type SquadsCollection = z.infer<typeof squadsCollectionSchema>
export type SquadWithOverview = z.infer<typeof squadWithOverviewSchema>
export type MySquads = z.infer<typeof mySquads>
export type SquadMembers = z.infer<typeof squadMembersSchema>
