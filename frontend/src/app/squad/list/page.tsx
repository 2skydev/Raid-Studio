'use client'

import { useState } from 'react'

import { SwordsIcon, LogInIcon, PlusIcon } from 'lucide-react'
import useSWR from 'swr'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { icon, muted } from '@styled-system/recipes'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import Skeleton from '@/components/Skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

import CreateSquadDialog from '@/features/squad/CreateSquadDialog'
import JoinSquadDialog from '@/features/squad/JoinSquadDialog'

import { supabase } from '@/lib/supabase'

const SquadListPage = () => {
  const [openCreateSquadDialog, setOpenCreateSquadDialog] = useState(false)
  const [openJoinSquadDialog, setOpenJoinSquadDialog] = useState(false)

  const { data: squads, isValidating } = useSWR('all_squads', async () => {
    const { data } = await supabase
      .from('squads_public_view')
      .select(
        `
          name,
          created_at,
          users: squad_users (
            role,
            profile: profiles (
              nickname,
              photo,
              main_character_name
            )
          ),
          userCount: squad_users (count)
        `,
      )
      .limit(5, { foreignTable: 'users' })
      .order('role', { foreignTable: 'users' })

    return data?.map(squad => ({
      ...squad,
      owner: squad.users.find(user => user.role === 'owner')?.profile,
      // @ts-ignore
      userCount: squad.userCount[0].count,
    }))
  })

  console.log(squads)

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Input w="64" placeholder="공격대 이름으로 검색..." />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>공격대 생성 또는 참여하기</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpenCreateSquadDialog(true)}>
              <PlusIcon className={icon()} />
              공격대 생성
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenJoinSquadDialog(true)}>
              <LogInIcon className={icon()} />
              공격대 참여하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>

      <div className={css({ mt: '8' })}>
        <div className={css({ spaceY: '4' })}>
          {!isValidating &&
            squads &&
            squads.map(item => (
              <div
                key={item.name}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: '4',
                  py: '4',
                  border: 'base',
                  borderRadius: 'md',
                })}
              >
                <Flex gap="6" alignItems="center">
                  <div>
                    <h3>{item.name}</h3>
                    <p className={muted()}>
                      공대장: {item.owner?.nickname} / {item.owner?.main_character_name}
                    </p>
                  </div>

                  <div
                    className={css({
                      display: 'flex',
                      '& > .avatar__root': {
                        border: 'base',
                      },
                      spaceX: '-4',
                    })}
                  >
                    {item.users.map(user => (
                      <Avatar w="8" h="8" key={user.profile!.nickname}>
                        <AvatarImage src={user.profile!.photo} alt="profile" />
                      </Avatar>
                    ))}

                    {item.userCount > 5 && (
                      <Avatar
                        w="8"
                        h="8"
                        bg="background"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        lineHeight="1"
                        pt="0.5"
                      >
                        +{item.userCount - 5}
                      </Avatar>
                    )}
                  </div>
                </Flex>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenJoinSquadDialog(true)}
                    >
                      <SwordsIcon size="1.2rem" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>이 공격대 참여하기</TooltipContent>
                </Tooltip>
              </div>
            ))}
          {isValidating && (
            <>
              <Skeleton w="full" h="12" />
              <Skeleton w="full" h="12" />
              <Skeleton w="full" h="12" />
            </>
          )}
        </div>
      </div>

      <CreateSquadDialog open={openCreateSquadDialog} onOpenChange={setOpenCreateSquadDialog} />
      <JoinSquadDialog open={openJoinSquadDialog} onOpenChange={setOpenJoinSquadDialog} />
    </div>
  )
}

export default SquadListPage
