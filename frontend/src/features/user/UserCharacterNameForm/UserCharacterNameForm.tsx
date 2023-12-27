'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
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
import useCustomForm from '@/hooks/useCustomForm'
import { LostArkCharacter } from '@/schemas/character'
import { userCharacterNameFormSchema } from '@/schemas/user'
import { showErrorToast } from '@/utils/error'

export interface UserCharacterNameFormProps {
  className?: string
  userId: string
  characterName: string
  simple?: boolean
  onUpdate?: (characterName: string) => void
}

const UserCharacterNameForm = ({
  className,
  userId,
  characterName,
  simple,
  onUpdate,
}: UserCharacterNameFormProps) => {
  const [loading, setLoading] = useState(false)
  const [openConformDialog, setOpenConformDialog] = useState(false)
  const [mainCharacter, setMainCharacter] = useState<LostArkCharacter | null>(null)
  const [lostArkCharacters, setLostArkCharacters] = useState<LostArkCharacter[]>([])

  const form = useCustomForm({
    resolver: zodResolver(userCharacterNameFormSchema),
    defaultValues: {
      characterName,
    },
    onSubmit: async values => {
      if (values.characterName === characterName) return

      try {
        setLoading(true)

        const lostArkCharacters = await RaidStudioAPI.characters.getLostArkCharacters(
          values.characterName,
        )

        setLostArkCharacters(lostArkCharacters)
        setMainCharacter(
          lostArkCharacters.find(character => character.name === values.characterName)!,
        )
        setOpenConformDialog(true)
      } catch (error: any) {
        showErrorToast(error, {
          title: '로스트아크 캐릭터 가져오기 실패',
        })
      } finally {
        setLoading(false)
      }
    },
  })

  const inputCharacterName = form.watch('characterName')

  const updateMainCharacter = async () => {
    try {
      await RaidStudioAPI.profiles.updateMainCharacterName(userId, mainCharacter!.name)
      await RaidStudioAPI.characters.updateAndMergeCharacters(userId, lostArkCharacters)

      setOpenConformDialog(false)

      onUpdate?.(mainCharacter!.name)
    } catch {}
  }

  return (
    <>
      <Form className={clsx('UserCharacterNameForm', className)} form={form}>
        {!simple && (
          <FormHeader title="대표 캐릭터" description="대표 캐릭터를 설정할 수 있습니다." />
        )}

        <FormField
          control={form.control}
          name="characterName"
          render={({ field }) => (
            <FormItem>
              {!simple && <FormLabel>대표 캐릭터 닉네임</FormLabel>}

              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="대표 캐릭터명을 입력해주세요" {...field} />

                  <AsyncButton
                    className="whitespace-nowrap"
                    type="submit"
                    disabled={inputCharacterName === characterName}
                    loading={loading}
                  >
                    검색하기
                  </AsyncButton>
                </div>
              </FormControl>

              {!simple && (
                <FormDescription>
                  내 로스트아크 대표 캐릭터 닉네임입니다. 내 다른 캐릭터를 불러올 때 사용됩니다.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <AlertDialog open={openConformDialog} onOpenChange={setOpenConformDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>대표 캐릭터로 등록 하시겠습니까?</AlertDialogTitle>

            {mainCharacter && (
              <AlertDialogDescription asChild>
                <div>
                  <b>
                    [{mainCharacter.class}] {mainCharacter.name}{' '}
                    {mainCharacter.level.toLocaleString()}
                  </b>{' '}
                  캐릭터로 등록하시겠습니까?
                  <br />
                  <ul className="list-disc">
                    <li>대표 캐릭터는 이후에 변경할 수 있습니다.</li>
                    <li>대표 캐릭터 기준으로 다른 캐릭터들을 불러옵니다.</li>
                    <li>대표 캐릭터 닉네임 변경 시, 다시 등록해야 합니다.</li>
                  </ul>
                </div>
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AsyncButton onClick={updateMainCharacter} shouldLoadingIconShow>
              등록하기
            </AsyncButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default UserCharacterNameForm
