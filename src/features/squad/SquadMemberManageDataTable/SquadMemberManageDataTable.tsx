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
import Button from '@/components/Button'
import CopyButton from '@/components/CopyButton'
import { DataTableColumnHeader } from '@/components/DataTable/ColumnHeader'
import { Input } from '@/components/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import Skeleton from '@/components/Skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'

import { SquadMembers } from '@/schemas/squad'

export interface SquadMemberManageDataTableProps {
  data: SquadMembers
  code: string
  isLoading?: boolean
}

const columns: ColumnDef<SquadMembers[number]>[] = [
  {
    id: 'profile',
    header: '프로필',
    cell: ({ row }) => (
      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
        <Avatar w="7" h="7">
          <AvatarImage src={row.original.image} alt="profile" />
        </Avatar>

        {row.original.name}
      </div>
    ),
  },
  {
    header: '대표 캐릭터',
    cell: ({ row }) => row.original.characterName,
  },
  {
    id: 'action',
    header: '',
    cell: () => null,
  },
]

const SquadMemberManageDataTable = ({ data, code, isLoading }: SquadMemberManageDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={css({ maxW: '3xl' })}>
      <Flex align="center" justifyContent="space-between" py="4">
        {isLoading ? (
          <Skeleton w="sm" h="10" />
        ) : (
          <Input
            placeholder="닉네임으로 검색..."
            value={(table.getColumn('profile')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('profile')?.setFilterValue(event.target.value)}
            w="sm"
          />
        )}

        {isLoading ? (
          <Skeleton w="32" h="10" />
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button w="32">
                <Share2Icon size="1rem" />
                초대하기
              </Button>
            </PopoverTrigger>

            <PopoverContent w="80">
              <h2 className={css({ fontSize: 'md', fontWeight: 'medium' })}>
                참가 코드로 초대하기
              </h2>
              <p className={css({ fontSize: 'sm', color: 'muted.foreground' })}>
                참가 코드로 공격대 목록에서 참가 할 수 있습니다.
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

export default SquadMemberManageDataTable
