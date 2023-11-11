'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightFromLineIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { h3, muted } from '@styled-system/recipes'

import Button from '@/components/Button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'
import CreateSquadDialog from '@/features/squad/CreateSquadDialog'
import JoinSquadDialog from '@/features/squad/JoinSquadDialog'
import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import useCustomForm from '@/hooks/useCustomForm'
import { supabase } from '@/lib/supabase'
import { userProfileFormSchema } from '@/schemas/user'
import { useAuth } from '@/stores/userAtom'
import { showAxiosErrorToast } from '@/utils/api'

type SetStep = Dispatch<SetStateAction<1 | 2 | 3>>

const RegisterNamePage = ({ setStep }: { setStep: SetStep }) => {
  const { user, setUser } = useAuth()

  const form = useCustomForm({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      name: '',
    },
    onSubmit: async values => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const profile = {
        id: user!.id,
        nickname: values.name,
        photo: session!.user.user_metadata.avatar_url,
        main_character_name: '',
      }

      const { error } = await supabase.from('profiles').upsert(profile)

      if (error) {
        return showAxiosErrorToast(error, {
          title: '닉네임 설정 오류',
        })
      }

      setUser({
        ...user!,
        profile,
      })
      setStep(2)
    },
  })

  return (
    <>
      <h1 className={h3()}>계정 닉네임 설정</h1>
      <p className={muted()}>모든 사람에게 표시될 닉네임을 설정합니다</p>

      <br />

      <Form w="sm" form={form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem flex="1">
              <FormControl>
                <Flex alignItems="center" gap="2">
                  <Input flex="1" placeholder="닉네임을 입력해주세요" {...field} />

                  <Button type="button" onClick={form.submit} useOnClickLoading>
                    저장하기
                  </Button>
                </Flex>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </>
  )
}

const RegisterCharacterPage = ({ setStep }: { setStep: SetStep }) => {
  const { user, setUser } = useAuth()

  return (
    <>
      <h1 className={h3()}>대표 캐릭터 등록</h1>
      <p className={muted()}>공격대 생성, 참여 전에 대표 캐릭터 등록이 필요합니다</p>

      <br />

      <UserCharacterNameForm
        className={css({ w: 'sm' })}
        userId={user!.id}
        characterName=""
        onUpdate={characterName => {
          setUser({
            ...user!,
            profile: {
              ...user!.profile!,
              main_character_name: characterName,
            },
          })
          setStep(3)
        }}
        simple
      />
    </>
  )
}

const RegisterSquadPage = ({ setStep }: { setStep: SetStep }) => {
  const router = useRouter()
  const [openCreateSquadDialog, setOpenCreateSquadDialog] = useState(false)
  const [openJoinSquadDialog, setOpenJoinSquadDialog] = useState(false)

  return (
    <>
      <h1 className={h3()}>공격대 생성 및 참여</h1>
      <p className={muted()}>이 단계는 다음에 진행할 수 있습니다.</p>

      <br />

      <div className={css({ display: 'flex', gap: '2' })}>
        <Card w="sm" textAlign="left">
          <CardHeader>
            <CardTitle fontSize="lg">공격대 생성</CardTitle>
            <CardDescription>직접 공격대를 생성하여 다른 팀원들을 초대합니다.</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button w="full" onClick={() => setOpenCreateSquadDialog(true)}>
              <PlusIcon size="1rem" />
              생성하기
            </Button>
          </CardFooter>
        </Card>

        <Card w="sm" textAlign="left">
          <CardHeader>
            <CardTitle fontSize="lg">공격대 참여</CardTitle>
            <CardDescription>다른 사람이 만들어둔 공격대에 참여합니다.</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button w="full" onClick={() => setOpenJoinSquadDialog(true)}>
              <ArrowRightFromLineIcon size="1rem" />
              참여하기
            </Button>
          </CardFooter>
        </Card>
      </div>

      <br />

      <Button variant="secondary" onClick={() => router.push('/')}>
        나중에하기
      </Button>

      <CreateSquadDialog open={openCreateSquadDialog} onOpenChange={setOpenCreateSquadDialog} />
      <JoinSquadDialog open={openJoinSquadDialog} onOpenChange={setOpenJoinSquadDialog} />
    </>
  )
}

const STEP_COMPONENTS = [RegisterNamePage, RegisterCharacterPage, RegisterSquadPage]

const RegisterSteps = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState<1 | 2 | 3>(
    user ? (user.profile?.nickname ? (user.profile?.main_character_name ? 3 : 2) : 1) : 1,
  )

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [])

  if (!user) {
    return null
  }

  const CurrentStepComponent = STEP_COMPONENTS[step - 1]

  return (
    <div className={css({ w: '100vw', h: 'mainHeight' })}>
      <LayoutScaleMotion className={css({ w: 'full', h: 'full' })}>
        <PageContentMotion
          key={step}
          className={css({
            textAlign: 'center',
            pb: '10',
            w: 'full',
            h: 'calc(100vh - token(sizes.14) - 1px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <CurrentStepComponent setStep={setStep} />
        </PageContentMotion>
      </LayoutScaleMotion>
    </div>
  )
}

export default RegisterSteps
