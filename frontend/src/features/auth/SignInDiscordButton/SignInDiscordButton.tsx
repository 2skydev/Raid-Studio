'use client'

import { Button } from '@/components/ui/button'

import useAuth from '@/hooks/useAuth'

const SignInDiscordButton = () => {
  const { signInWithDiscord } = useAuth()

  return <Button onClick={signInWithDiscord}>Discord 계정으로 시작하기</Button>
}

export default SignInDiscordButton
