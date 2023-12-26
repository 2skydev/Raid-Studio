'use client'

import { ComponentProps } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next-nprogress-bar'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import AsyncButton from '@/components/AsyncButton'

import AuthenticatedOnlyDialog from '@/features/auth/AuthenticatedOnlyDialog'

import { RaidStudioAPI } from '@/apis'
import useCustomForm from '@/hooks/useCustomForm'
import { SquadFormSchema } from '@/schemas/squad'

export interface CreateSquadDialogProps
  extends Omit<ComponentProps<typeof AuthenticatedOnlyDialog>, 'children'> {}

const CreateSquadDialog = (props: CreateSquadDialogProps) => {
  const router = useRouter()

  const form = useCustomForm({
    resolver: zodResolver(SquadFormSchema),
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        await RaidStudioAPI.squads.createSquad(name)

        form.reset()

        props.onOpenChange?.(false)

        router.push('/studio/squad/users')
      } catch {}
    },
  })

  return (
    <AuthenticatedOnlyDialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공격대 생성</DialogTitle>
          <DialogDescription>새로운 공격대를 생성하여 팀원들을 초대합니다.</DialogDescription>
        </DialogHeader>

        <Form className="my-4" form={form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>공격대명</FormLabel>

                <FormControl>
                  <Input placeholder="공격대명을 입력해주세요" {...field} />
                </FormControl>

                <FormDescription asChild>
                  <ul className="ml-6 list-disc">
                    <li>영어, 한글, 공백만 사용가능</li>
                    <li>1 ~ 12자</li>
                    <li>중복 불가</li>
                  </ul>
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => props.onOpenChange?.(false)}>
            취소
          </Button>
          <AsyncButton type="button" onClick={form.submit} shouldLoadingIconShow>
            생성하기
          </AsyncButton>
        </DialogFooter>
      </DialogContent>
    </AuthenticatedOnlyDialog>
  )
}

export default CreateSquadDialog
