'use client'

import { ReactNode } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormHeader,
} from '@/components/Form'
import { Input } from '@/components/Input'

import useCustomForm from '@/hooks/useCustomForm'
import raidStudioClient from '@/libs/raidStudio/client'
import { userProfileFormSchema, User } from '@/schemas/users'
import { showAxiosErrorToast } from '@/utils/api'

export interface UserProfileFormProps extends Omit<User, 'characterName'> {
  className?: string
  children?: ReactNode
}

const UserProfileForm = ({ className, id, image, name }: UserProfileFormProps) => {
  const form = useCustomForm({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      name,
    },
    onSubmit: async values => {
      try {
        await raidStudioClient.patch('/users/me', {
          name: values.name,
        })
      } catch (error) {
        showAxiosErrorToast(error, {
          title: '프로필 업데이트 오류',
        })
      }
    },
  })

  return (
    <Form className={clsx('UserProfileForm', className)} form={form}>
      <FormHeader title="프로필" description="다른 사람들에게 표시될 정보들입니다." />

      <FormItem>
        <FormLabel>Discord ID</FormLabel>

        <FormControl>
          <Input defaultValue={id} disabled />
        </FormControl>

        <FormDescription>Discord 고유 ID입니다. 유저를 식별하는데 사용됩니다.</FormDescription>
      </FormItem>

      <FormItem>
        <FormLabel>프로필 사진</FormLabel>

        <FormDescription>
          다른 사람들에게 표시될 프로필 사진입니다. 사진은 변경할 수 없습니다.
        </FormDescription>

        <FormControl>
          <Avatar>
            <AvatarImage src={image} alt={name} />
          </Avatar>
        </FormControl>
      </FormItem>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>닉네임</FormLabel>

            <FormControl>
              <Input placeholder="닉네임을 입력해주세요" {...field} />
            </FormControl>

            <FormDescription>다른 사람들에게 표시될 닉네임입니다.</FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="button" onClick={form.submit} useOnClickLoading>
        저장하기
      </Button>
    </Form>
  )
}

export default UserProfileForm
