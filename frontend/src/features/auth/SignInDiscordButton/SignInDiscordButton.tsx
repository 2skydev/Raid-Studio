'use client'

import Button from '@/components/Button'

import { supabase } from '@/lib/supabase'

const SignInDiscordButton = () => {
  const signInDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  }

  return <Button onClick={signInDiscord}>Discord 계정으로 시작하기</Button>
}

export default SignInDiscordButton
