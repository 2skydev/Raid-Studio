'use client'

import { LogOutIcon, SettingsIcon, UsersIcon } from 'lucide-react'
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

import useAPI from '@/hooks/useAPI'
import { User } from '@/schemas/user'

export interface CurrentUserProfileDropdownMenuProps {}

const CurrentUserProfileDropdownMenu = ({}: CurrentUserProfileDropdownMenuProps) => {
  const router = useRouter()

  const { data: user } = useAPI<User>('/users/me')

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" lineHeight="1">
          <Avatar w="6" h="6">
            <AvatarImage src={user.image} alt="profile" />
          </Avatar>
          {user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent w="40">
        <DropdownMenuItem onClick={() => router.push('/my/profile')}>
          <SettingsIcon className={icon()} />
          설정
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <UsersIcon className={icon()} />팀 목록
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UsersIcon className={icon()} />팀 초대하기
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UsersIcon className={icon()} />팀 생성
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
