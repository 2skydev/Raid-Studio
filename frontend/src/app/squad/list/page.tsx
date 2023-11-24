'use client'

import { useMemo, useState } from 'react'

import { debounce } from 'lodash'
import { SwordsIcon, LogInIcon, PlusIcon } from 'lucide-react'
import useSWR from 'swr'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { icon, muted } from '@styled-system/recipes'
import { token } from '@styled-system/tokens'

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

import { RaidStudioAPI } from '@/apis'

const SquadListPage = () => {
  const [openCreateSquadDialog, setOpenCreateSquadDialog] = useState(false)
  const [openJoinSquadDialog, setOpenJoinSquadDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const { data: squads, isValidating } = useSWR(['public_squads', search], ([, keyword]) => {
    return RaidStudioAPI.squads.getPublicSquads(keyword)
  })

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value)
        setLoading(false)
      }, 500),
    [],
  )

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Input
          onChange={e => {
            setLoading(true)
            debouncedSearch(e.target.value)
          }}
          w="64"
          placeholder="공격대 이름으로 검색..."
        />

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
            !loading &&
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
                  h: '20',
                })}
              >
                <Flex gap="6" alignItems="center">
                  <div
                    className={css({
                      w: '16rem',
                    })}
                  >
                    <h3>{item.name}</h3>
                    <p className={muted()}>
                      공대장: {item.owner?.nickname} / {item.owner?.main_character_name}
                    </p>
                  </div>

                  <div
                    className={css({
                      display: 'flex',
                      spaceX: '-2',
                    })}
                  >
                    {item.users.map(user => (
                      <Avatar
                        border="3px solid token(colors.background)"
                        key={user.profile!.nickname}
                      >
                        <AvatarImage src={user.profile!.photo} alt="profile" />
                      </Avatar>
                    ))}

                    {item.userCount > 5 && (
                      <Avatar
                        border="3px solid token(colors.background)"
                        bg="muted"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        fontWeight="bold"
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
          {(isValidating || loading) && (
            <>
              <Skeleton w="full" h="20" />
              <Skeleton w="full" h="20" />
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
