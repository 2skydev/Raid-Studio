'use client'

import { ChevronDownIcon, LogOutIcon, UserCircle2Icon, UserCog2Icon } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useAuth from '@/hooks/useAuth'

export interface CurrentUserProfileDropdownMenuProps {}

const CurrentUserProfileDropdownMenu = ({}: CurrentUserProfileDropdownMenuProps) => {
  const router = useRouter()

  const { user, signOut } = useAuth()

  if (!user || !user.profile) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">
          <Avatar className="!size-6">
            <AvatarImage src={user.profile.photo} alt="profile" />
          </Avatar>
          {user.profile.nickname}
          {user.profile.main_character_name && ` / ${user.profile.main_character_name}`}
          <ChevronDownIcon size="1rem" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuItem onClick={() => router.push('/my/profile')}>
          <UserCircle2Icon className="size-4" />
          프로필 설정
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/my/character')}>
          <UserCog2Icon className="size-4" />
          대표 캐릭터 변경
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon className="size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrentUserProfileDropdownMenu
