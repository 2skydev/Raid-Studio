import { z } from 'zod'

export const ProfileNicknameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9가-힣\s]+$/, {
    message: '닉네임은 공백, 영문, 숫자, 한글만 입력 가능합니다.',
  })
  .min(1, { message: '닉네임은 최소 1자 이상으로 입력해주세요' })
  .max(12, { message: '닉네임은 최대 12자 이하로 입력해주세요' })
  .nullable()

export const CreateProfileFormSchema = z.object({
  nickname: ProfileNicknameSchema,
})

export const UpdateProfileFormSchema = z.object({
  nickname: ProfileNicknameSchema,
})
