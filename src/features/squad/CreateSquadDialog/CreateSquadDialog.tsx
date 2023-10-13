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
import { squadCreateFormSchema } from '@/schemas/squad'
import { showAxiosErrorToast } from '@/utils/api'

export interface CreateSquadDialogProps extends ComponentProps<typeof Dialog> {}

const CreateSquadDialog = (props: CreateSquadDialogProps) => {
  const form = useCustomForm({
    resolver: zodResolver(squadCreateFormSchema),
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        await raidStudioClient.post('/squads', {
          name,
        })

        props.onOpenChange?.(false)
      } catch (error) {
        showAxiosErrorToast(error, {
          title: '공격대 생성 오류',
        })
      }
    },
  })

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공격대 생성</DialogTitle>
          <DialogDescription>공격대명은 중복될 수 없습니다.</DialogDescription>
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

                <FormDescription>공격대명은 중복될 수 없습니다.</FormDescription>

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
    </Dialog>
  )
}

export default CreateSquadDialog
