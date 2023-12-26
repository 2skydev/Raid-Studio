import { toast } from 'sonner'
import useSWR from 'swr'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export interface SignInTestUserButtonProps {}

const SignInTestUserButton = ({}: SignInTestUserButtonProps) => {
  const { reload } = useAuth()

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

    toast.success('테스트 계정으로 로그인되었습니다.', {
      description: (
        <ul className="ml-4 mt-1 list-disc">
          <li>테스트 계정은 읽기 전용입니다.</li>
          <li>
            생성, 수정, 삭제 등의 작업은 작동 하는것 처럼 보일 수 있지만 실제로 이루어지지 않습니다.
          </li>
        </ul>
      ),
      duration: 6000,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">테스트 계정으로 둘러보기</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="space-y-1" align="start">
        {profiles?.map(profile => (
          <DropdownMenuItem key={profile.nickname} onClick={() => signInTestUser(profile.nickname)}>
            <div className="py1 flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={profile.photo} alt={profile.nickname} />
              </Avatar>

              <div>
                <div className="leading-none">테스트 {profile.nickname}</div>
                <div className="mt-1 text-xs leading-none text-muted-foreground">
                  {profile.main_character_name}
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SignInTestUserButton
