'use client'

import { LogOutIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { icon } from '@styled-system/recipes'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

export interface CurrentUserProfileDropdownMenuProps {}

const CurrentUserProfileDropdownMenu = ({}: CurrentUserProfileDropdownMenuProps) => {
  const session = useSession()

  if (!session.data) return null

  const user = session.data.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" lineHeight="1">
          <Avatar w="6" h="6">
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>
          {user.name} / 풍선알바
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent w="40">
        <DropdownMenuItem>
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
