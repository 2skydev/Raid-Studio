'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightFromLineIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import AsyncButton from '@/components/AsyncButton'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'
import CreateSquadDialog from '@/features/squad/CreateSquadDialog'
import JoinSquadDialog from '@/features/squad/JoinSquadDialog'
import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'
import useCustomForm from '@/hooks/useCustomForm'
import { CreateProfileFormSchema } from '@/schemas/profiles'

type SetStep = Dispatch<SetStateAction<1 | 2 | 3>>

const RegisterNicknamePage = ({ setStep }: { setStep: SetStep }) => {
  const { user, setUser } = useAuth()

  const form = useCustomForm({
    resolver: zodResolver(CreateProfileFormSchema),
    defaultValues: {
      nickname: '',
    },
    onSubmit: async ({ nickname }) => {
      try {
        const profile = await RaidStudioAPI.profiles.createCurrentUserProfile(nickname)

        setUser({
          ...user!,
          profile,
        })

        setStep(2)
      } catch {}
    },
  })

  return (
    <>
      <h1 className="text-2xl">계정 닉네임 설정</h1>
      <p className="text-sm text-muted-foreground">모든 사람에게 표시될 닉네임을 설정합니다</p>

      <br />

      <Form className="w-96" form={form}>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input className="flex-1" placeholder="닉네임을 입력해주세요" {...field} />

                  <AsyncButton type="button" onClick={form.submit} shouldLoadingIconShow>
                    저장하기
                  </AsyncButton>
                </div>
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
      <h1 className="text-2xl">대표 캐릭터 등록</h1>
      <p className="text-sm text-muted-foreground">
        공격대 생성, 참여 전에 대표 캐릭터 등록이 필요합니다
      </p>

      <br />

      <UserCharacterNameForm
        className="w-96"
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
      <h1 className="text-2xl">공격대 생성 및 참여</h1>
      <p className="text-sm text-muted-foreground">이 단계는 다음에 진행할 수 있습니다.</p>

      <br />

      <div className="flex gap-2">
        <Card className="w-96 text-left">
          <CardHeader>
            <CardTitle className="text-lg">공격대 생성</CardTitle>
            <CardDescription>직접 공격대를 생성하여 다른 팀원들을 초대합니다.</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full" onClick={() => setOpenCreateSquadDialog(true)}>
              <PlusIcon size="1rem" />
              생성하기
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-96 text-left">
          <CardHeader>
            <CardTitle className="text-lg">공격대 참여</CardTitle>
            <CardDescription>다른 사람이 만들어둔 공격대에 참여합니다.</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full" onClick={() => setOpenJoinSquadDialog(true)}>
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

const STEP_COMPONENTS = [RegisterNicknamePage, RegisterCharacterPage, RegisterSquadPage]

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
    <div className="h-mainHeight w-screen">
      <LayoutScaleMotion className="size-full">
        <PageContentMotion
          key={step}
          className="flex h-[calc(100vh-theme(height.headerHeight)-1px)] w-full flex-col items-center justify-center pb-10 text-center"
        >
          <CurrentStepComponent setStep={setStep} />
        </PageContentMotion>
      </LayoutScaleMotion>
    </div>
  )
}

export default RegisterSteps
