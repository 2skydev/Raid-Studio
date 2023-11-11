import useSWR from 'swr'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { useToast } from '@/components/Toast/useToast'

import { RaidStudioAPI } from '@/apis'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/stores/userAtom'

export interface SignInTestUserButtonProps {}

const SignInTestUserButton = ({}: SignInTestUserButtonProps) => {
  const { reload } = useAuth()

  const { toast } = useToast()

  const { data: profiles } = useSWR('test_profiles', RaidStudioAPI.profiles.getTestUserProfiles, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })

  const signInTestUser = async (nickname: string) => {
    await supabase.auth.signInWithPassword({
      email: `${nickname}@example.com`,
      password: 'password123',
    })

    await reload()

    toast({
      title: '테스트 계정으로 로그인되었습니다.',
      description: ``,
      status: 'success',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">테스트 계정으로 둘러보기</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {profiles?.map(profile => (
          <DropdownMenuItem
            cursor="pointer"
            key={profile.nickname}
            onClick={() => signInTestUser(profile.nickname)}
          >
            <Flex alignItems="center" gap="2" py="1">
              <Avatar w="8" h="8">
                <AvatarImage src={profile.photo} alt={profile.nickname} />
              </Avatar>

              <div>
                <div className={css({ leading: '1' })}>테스트 {profile.nickname}</div>
                <div
                  className={css({
                    leading: '1',
                    mt: '1',
                    fontSize: 'xs',
                    color: 'muted.foreground',
                  })}
                >
                  {profile.main_character_name}
                </div>
              </div>
            </Flex>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SignInTestUserButton
