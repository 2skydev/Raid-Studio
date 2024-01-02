'use client'

import { useMemo, useState } from 'react'
import { FilePond } from 'react-filepond'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { FilePondFile, FilePondInitialFile } from 'filepond'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormHeader,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import AsyncButton from '@/components/AsyncButton'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'
import useCustomForm from '@/hooks/useCustomForm'
import { UpdateProfileFormSchema } from '@/schemas/profiles'
import { Tables } from '@/types/database.types'
import { showErrorToast } from '@/utils/error'

export interface UserProfileFormProps extends Pick<Tables<'profiles'>, 'nickname' | 'photo'> {
  className?: string
}

const UserProfileForm = ({ nickname, photo, className }: UserProfileFormProps) => {
  const { user, setUser } = useAuth<true>()

  const [files, setFiles] = useState<FilePondFile[]>([])

  console.log(files)

  const form = useCustomForm({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      photo,
      nickname,
    },
    onSubmit: async values => {
      try {
        const { photo } = await RaidStudioAPI.profiles.updateCurrentUserProfile(
          values,
          files?.[0]?.file as File | undefined,
        )

        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...values,
            photo: photo || user.profile.photo,
          },
        })
      } catch (e) {}
    },
  })

  return (
    <Form className={clsx('UserProfileForm', className)} form={form}>
      <FormHeader title="프로필" description="다른 사람들에게 표시될 정보들입니다." />

      <FormItem>
        <FormLabel>프로필 사진</FormLabel>

        <FormDescription>
          다른 사람들에게 표시될 프로필 사진입니다. 사진은 변경할 수 없습니다.
        </FormDescription>

        <FilePond
          files={files}
          onupdatefiles={setFiles}
          imageResizeMode="cover"
          imageTransformOutputQuality={0}
          acceptedFileTypes={['image/*']}
          labelIdle="프로필 사진을 업로드해주세요"
        />
      </FormItem>

      <FormField
        control={form.control}
        name="nickname"
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

      <AsyncButton type="button" onClick={form.submit} shouldLoadingIconShow>
        저장하기
      </AsyncButton>
    </Form>
  )
}

export default UserProfileForm
