'use client'

import { ComponentProps } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import {
  Dialog,
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

import useCustomForm from '@/hooks/useCustomForm'
import raidStudioClient from '@/libs/raidStudio/client'
import { squadJoinFormSchema } from '@/schemas/squad'
import { showAxiosErrorToast } from '@/utils/api'

export interface JoinSquadDialogProps extends ComponentProps<typeof Dialog> {}

const JoinSquadDialog = (props: JoinSquadDialogProps) => {
  const form = useCustomForm({
    resolver: zodResolver(squadJoinFormSchema),
    defaultValues: {
      code: '',
    },
    onSubmit: async ({ code }) => {
      try {
        await raidStudioClient.patch(`/squads/join/${code}`)

        props.onOpenChange?.(false)
      } catch (error) {
        showAxiosErrorToast(error, {
          title: '공격대 참여 오류',
        })
      }
    },
  })

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공격대 참여</DialogTitle>
          <DialogDescription>공격대 참여 코드를 사용하여 들어가기</DialogDescription>
        </DialogHeader>

        <Form my="4" form={form}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>공격대 참여 코드</FormLabel>

                <FormControl>
                  <Input placeholder="공격대 참여 코드를 입력해주세요" {...field} />
                </FormControl>

                <FormDescription>공유받은 공격대 참여 코드를 입력해주세요</FormDescription>

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
            참여하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinSquadDialog
