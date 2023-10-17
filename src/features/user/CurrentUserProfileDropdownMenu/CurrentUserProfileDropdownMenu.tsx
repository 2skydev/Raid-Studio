'use client'

import { useAtomValue } from 'jotai'
import { LogOutIcon, SettingsIcon, UserCircle2Icon, UserCog2Icon, UsersIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'

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

import { currentUserAtom } from '@/stores/currentUserAtom'

export interface CurrentUserProfileDropdownMenuProps {}

const CurrentUserProfileDropdownMenu = ({}: CurrentUserProfileDropdownMenuProps) => {
  const router = useRouter()

  const user = useAtomValue(currentUserAtom)

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" lineHeight="1">
          <Avatar w="5" h="5">
            <AvatarImage src={user.image} alt="profile" />
          </Avatar>
          {user.name}
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

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className={icon()} />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrentUserProfileDropdownMenu
