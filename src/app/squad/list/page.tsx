'use client'

import { useState } from 'react'

import { LogInIcon, PlusIcon, TicketIcon, UsersIcon } from 'lucide-react'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { icon } from '@styled-system/recipes'

import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { Input } from '@/components/Input'

import CreateSquadDialog from '@/features/squad/CreateSquadDialog'

const SquadListPage = () => {
  const [openCreateSquadDialog, setOpenCreateSquadDialog] = useState(false)

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

            <DropdownMenuItem>
              <LogInIcon className={icon()} />
              공격대 참여하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>

      <div className="list"></div>

      <CreateSquadDialog open={openCreateSquadDialog} onOpenChange={setOpenCreateSquadDialog} />
    </div>
  )
}

export default SquadListPage
