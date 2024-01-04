'use client'

import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
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
          <Avatar className="size-6">
            <AvatarImage src={user.profile.photo} alt="profile" />
          </Avatar>
          {user.profile.nickname}
          {user.profile.main_character_name && ` / ${user.profile.main_character_name}`}
          <ChevronDownIcon size="1rem" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-52" align="start">
        <DropdownMenuLabel className="flex items-center gap-3 p-2">
          <Avatar className="size-8">
            <AvatarImage src={user.profile.photo} alt="profile" />
          </Avatar>

          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">{user.profile.nickname}</div>
            <div className="text-xs leading-none text-muted-foreground">
              {user.profile.main_character_name}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/my/profile')}>프로필 설정</DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/my/character')}>
          대표 캐릭터 변경
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500" onClick={signOut}>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrentUserProfileDropdownMenu
