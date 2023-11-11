'use client'

import { ComponentProps } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next-nprogress-bar'

import { css } from '@styled-system/css'

import Button from '@/components/Button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/Form'
import { Input } from '@/components/Input'

import AuthenticatedOnlyDialog from '@/features/auth/AuthenticatedOnlyDialog'

import useCustomForm from '@/hooks/useCustomForm'
import { supabase } from '@/lib/supabase'
import { SquadFormSchema } from '@/schemas/squad'
import { showFunctionsInvokeErrorToast } from '@/utils/api'

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
      const { error } = await supabase.functions.invoke('apis/squads', {
        method: 'POST',
        body: {
          name,
        },
      })

      if (error) {
        return await showFunctionsInvokeErrorToast(error, {
          title: '공격대 생성 오류',
        })
      }

      form.reset()

      props.onOpenChange?.(false)

      router.push('/studio/squad/members')
    },
  })

  return (
    <AuthenticatedOnlyDialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공격대 생성</DialogTitle>
          <DialogDescription>새로운 공격대를 생성하여 팀원들을 초대합니다.</DialogDescription>
        </DialogHeader>

        <Form my="4" form={form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>공격대명</FormLabel>

                <FormControl>
                  <Input placeholder="공격대명을 입력해주세요" {...field} />
                </FormControl>

                <FormDescription>
                  <ul
                    className={css({
                      ml: '6',
                      listStyle: 'disc',
                    })}
                  >
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
          <Button type="button" onClick={form.submit} useOnClickLoading>
            생성하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </AuthenticatedOnlyDialog>
  )
}

export default CreateSquadDialog
