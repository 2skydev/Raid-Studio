'use client'

import { ChevronDownIcon, CogIcon, LogOutIcon, UserCircle2Icon, UserCog2Icon } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

import { css } from '@styled-system/css'
import { icon } from '@styled-system/recipes'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

import useAuth from '@/hooks/useAuth'

export interface CurrentUserProfileDropdownMenuProps {}

const CurrentUserProfileDropdownMenu = ({}: CurrentUserProfileDropdownMenuProps) => {
  const router = useRouter()

  const { user, signOut } = useAuth()

  if (!user || !user.profile) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" fontSize="xs">
          <Avatar w="6" h="6">
            <AvatarImage src={user.profile.photo} alt="profile" />
          </Avatar>
          {user.profile.nickname}
          {user.profile.main_character_name && ` / ${user.profile.main_character_name}`}
          <ChevronDownIcon size="1rem" className={css({ color: 'muted.foreground' })} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent w="40" align="start">
        <DropdownMenuItem onClick={() => router.push('/my/profile')}>
          <UserCircle2Icon className={icon()} />
          프로필 설정
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/my/character')}>
          <UserCog2Icon className={icon()} />
          대표 캐릭터 변경
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon className={icon()} />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrentUserProfileDropdownMenu
