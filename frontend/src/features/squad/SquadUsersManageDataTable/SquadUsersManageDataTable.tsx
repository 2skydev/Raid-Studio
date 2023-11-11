'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Share2Icon } from 'lucide-react'

import { css } from '@styled-system/css'
import { Box, Flex } from '@styled-system/jsx'

import { Avatar, AvatarImage } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import Button from '@/components/Button'
import CopyButton from '@/components/CopyButton'
import { DataTableColumnHeader } from '@/components/DataTable/ColumnHeader'
import { Input } from '@/components/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import Skeleton from '@/components/Skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'

import SquadRoleBadge from '@/features/squad/SquadRoleBadge'

import { SquadUser } from '@/types/squads.types'

export interface SquadUsersManageDataTableProps {
  data: SquadUser[]
  code: string
  isLoading?: boolean
}

const columns: ColumnDef<SquadUser>[] = [
  {
    id: 'profile',
    header: '프로필',
    cell: ({ row }) => (
      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
        <Avatar w="10" h="10">
          <AvatarImage src={row.original.profile.photo} alt="profile" />
        </Avatar>

        {row.original.profile.nickname}
      </div>
    ),
  },
  {
    header: '대표 캐릭터',
    cell: ({ row }) => row.original.profile.main_character_name,
  },
  {
    header: '역할',
    cell: ({ row }) => <SquadRoleBadge role={row.original.role} />,
  },
  {
    id: 'action',
    header: '',
    cell: () => null,
  },
]

const SquadUsersManageDataTable = ({ data, code, isLoading }: SquadUsersManageDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={css({ maxW: '3xl' })}>
      <Flex align="center" justifyContent="space-between" py="4">
        {isLoading ? (
          <Skeleton w="xs" h="10" />
        ) : (
          <Input
            placeholder="닉네임으로 검색..."
            value={(table.getColumn('profile')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('profile')?.setFilterValue(event.target.value)}
            w="xs"
          />
        )}

        {isLoading ? (
          <Skeleton w="30" h="10" />
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button w="30">
                <Share2Icon size="1rem" />
                초대하기
              </Button>
            </PopoverTrigger>

            <PopoverContent w="80">
              <h2 className={css({ fontSize: 'md', fontWeight: 'medium' })}>
                참여 코드로 초대하기
              </h2>
              <p className={css({ fontSize: 'sm', color: 'muted.foreground' })}>
                참여 코드로 공격대 목록에서 참여 할 수 있습니다.
              </p>
              <div
                className={css({
                  mt: '2',
                  p: '2',
                  pl: '3',
                  border: 'base',
                  rounded: 'md',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                })}
              >
                <span className={css({ fontSize: 'sm' })}>{code}</span>
                <CopyButton value={code} />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </Flex>

      <Box w="full" rounded="md" border="base">
        {isLoading ? (
          <Box p="2" spaceY="2">
            <Skeleton w="full" h="12" />
            <Skeleton w="full" h="12" />
            <Skeleton w="full" h="12" />
          </Box>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} h="24" textAlign="center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Box>
    </div>
  )
}

export default SquadUsersManageDataTable
