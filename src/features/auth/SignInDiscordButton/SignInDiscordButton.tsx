'use client'

import { signIn } from 'next-auth/react'

import Button from '@/components/Button'

const SignInDiscordButton = () => {
  return <Button onClick={() => signIn('discord')}>Discord 계정으로 시작하기</Button>
}

export default SignInDiscordButton
