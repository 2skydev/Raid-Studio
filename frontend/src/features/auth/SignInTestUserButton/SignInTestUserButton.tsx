import useSWR from 'swr'

import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

import { supabase } from '@/lib/supabase'

export interface SignInTestUserButtonProps {}

const SignInTestUserButton = ({}: SignInTestUserButtonProps) => {
  const { data: profiles, isValidating } = useSWR('test_profiles', async () => {
    const { data } = await supabase
      .from('profiles')
      .select(
        `
          nickname,
          photo,
          main_character_name
        `,
      )
      .in(
        'nickname',
        Array(10)
          .fill(null)
          .map((_, i) => `user${i}`),
      )

    return data
  })

  const signInTestUser = async (nickname: string) => {
    await supabase.auth.signInWithPassword({
      email: `${nickname}@example.com`,
      password: 'password123',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">테스트 계정으로 둘러보기</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent w="40" align="start">
        {profiles?.map(profile => (
          <DropdownMenuItem key={profile.nickname} onClick={() => signInTestUser(profile.nickname)}>
            {profile.nickname}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SignInTestUserButton
