'use client'

import { useState } from 'react'

import { SwordsIcon, LogInIcon, PlusIcon } from 'lucide-react'
import { z } from 'zod'

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

import useAPI from '@/hooks/useAPI'
import { SquadWithOverview, squadWithOverviewSchema } from '@/schemas/squad'

const SquadListPage = () => {
  const [openCreateSquadDialog, setOpenCreateSquadDialog] = useState(false)
  const [openJoinSquadDialog, setOpenJoinSquadDialog] = useState(false)

  const { data, isValidating } = useAPI<SquadWithOverview[]>('/squads')

  const squads = data && z.array(squadWithOverviewSchema).parse(data)

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
                key={item.id}
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
                      공대장: {item.owner.name} / {item.owner.characterName}
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
                      <Avatar w="8" h="8" key={user.name}>
                        <AvatarImage src={user.image} alt="profile" />
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

                  <TooltipContent>이 공격대 참가하기</TooltipContent>
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
