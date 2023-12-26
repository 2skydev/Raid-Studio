'use client'

import { useMemo, useState } from 'react'

import { debounce } from 'lodash'
import { SwordsIcon, LogInIcon, PlusIcon } from 'lucide-react'
import useSWR from 'swr'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
      <div className="flex items-center justify-between">
        <Input
          className="w-64"
          placeholder="공격대 이름으로 검색..."
          onChange={e => {
            setLoading(true)
            debouncedSearch(e.target.value)
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>공격대 생성 또는 참여하기</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpenCreateSquadDialog(true)}>
              <PlusIcon className="size-4" />
              공격대 생성
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenJoinSquadDialog(true)}>
              <LogInIcon className="size-4" />
              공격대 참여하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-8">
        <div className="space-y-4">
          {!isValidating && !loading && squads && squads.length === 0 && (
            <div className="text-center">
              <p className="p-10 text-muted-foreground">검색 결과가 없습니다.</p>
            </div>
          )}
          {!isValidating &&
            !loading &&
            squads &&
            squads.map(item => (
              <div
                key={item.name}
                className="flex h-20 items-center justify-between rounded-md border px-4 py-4"
              >
                <div className="flex items-center gap-6">
                  <div className="w-[16rem]">
                    <h3>{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      공대장: {item.owner?.nickname} / {item.owner?.main_character_name}
                    </p>
                  </div>

                  <div className="flex -space-x-2">
                    {item.users.map(user => (
                      <Avatar
                        className="size-10 border-[3px] border-background"
                        key={user.profile!.nickname}
                      >
                        <AvatarImage src={user.profile!.photo} alt="profile" />
                      </Avatar>
                    ))}

                    {item.userCount > 5 && (
                      <Avatar className="size-10 items-center justify-center border-[3px] border-background bg-muted pt-0.5 text-xs font-bold leading-none">
                        +{item.userCount - 5}
                      </Avatar>
                    )}
                  </div>
                </div>

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
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
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
