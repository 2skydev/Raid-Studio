'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Share2Icon } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import CopyButton from '@/components/CopyButton'

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
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
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
    <div className="max-w-3xl">
      <div className="flex items-center justify-between py-4">
        {isLoading ? (
          <Skeleton className="h-10 w-80" />
        ) : (
          <Input
            className="w-80"
            placeholder="닉네임으로 검색..."
            value={(table.getColumn('profile')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('profile')?.setFilterValue(event.target.value)}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-32">
                <Share2Icon size="1rem" />
                초대하기
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <h2 className="font-medium">참여 코드로 초대하기</h2>
              <p className="text-sm text-muted-foreground">
                참여 코드로 공격대 목록에서 참여 할 수 있습니다.
              </p>
              <div className="mt-2 flex items-center justify-between rounded-md border p-2 pl-3">
                <span className="text-sm">{code}</span>
                <CopyButton value={code} />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="w-full rounded-md border">
        {isLoading ? (
          <div className="space-y-2 p-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
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
                  <TableCell className="h-24 text-center" colSpan={columns.length}>
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default SquadUsersManageDataTable
