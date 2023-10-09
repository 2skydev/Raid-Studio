'use client'

import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { h3, list, muted } from '@styled-system/recipes'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/AlertDialog'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useToast } from '@/components/Toast/useToast'

import useCustomForm from '@/hooks/useCustomForm'
import apiClient from '@/libs/api/client'
import { Character } from '@/types/character'

const RegisterCharacterPage = () => {
  const [loading, setLoading] = useState(false)
  const [openConformDialog, setOpenConformDialog] = useState(false)
  const [mainCharacter, setMainCharacter] = useState<Character | null>(null)

  const router = useRouter()

  const { toast } = useToast()

  const form = useCustomForm({
    defaultValues: {
      characterName: '',
    },
    onSubmit: async values => {
      if (!values.characterName.trim()) {
        toast({
          status: 'warning',
          title: '캐릭터명을 입력해주세요',
        })
        return
      }

      try {
        setLoading(true)

        const { data } = await apiClient.get<Character[]>(
          `/lostark/characters/${values.characterName}`,
        )

        setMainCharacter(data.find(character => character.name === values.characterName)!)
        setOpenConformDialog(true)
      } catch (error: any) {
        toast({
          status: 'warning',
          title: '캐릭터 불러오기 실패',
          description: error.response.data?.error || '알 수 없는 에러가 발생했습니다.',
        })
      } finally {
        setLoading(false)
      }
    },
  })

  const registerCharacter = async () => {
    try {
      await apiClient.patch('/users/change-character', {
        characterName: mainCharacter?.name,
      })

      router.push('/studio/characters')
    } catch (error: any) {
      toast({
        status: 'error',
        title: '대표 캐릭터 지정 오류',
        description: error.response.data?.error || '알 수 없는 에러가 발생했습니다.',
      })
    }
  }

  return (
    <main>
      <Flex
        w="100vw"
        h="calc(100vh - token(sizes.14) - 1px)"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        pb="10"
        bg={{
          base: 'Background',
          _dark: 'Background',
        }}
      >
        <h1 className={h3()}>대표 캐릭터 등록</h1>
        <p className={muted()}>팀 참가, 생성 전에 대표 캐릭터 등록이 필요합니다</p>

        <br />

        <form
          className={css({
            display: 'flex',
            w: 'full',
            maxW: 'sm',
            spaceX: '2',
            alignItems: 'center',
          })}
          onSubmit={form.handleSubmit}
        >
          <Controller
            control={form.control}
            name="characterName"
            render={({ field }) => <Input {...field} placeholder="대표 캐릭터명을 입력해주세요" />}
          />

          <Button whiteSpace="nowrap" type="submit" loading={loading}>
            검색하기
          </Button>
        </form>
      </Flex>

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
                  <ul className={list()}>
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
            <Button onClick={registerCharacter} useOnClickLoading>
              등록하기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default RegisterCharacterPage
