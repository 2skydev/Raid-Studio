'use client'

import { Table } from '@tanstack/react-table'
import { SlidersHorizontalIcon } from 'lucide-react'

import { icon } from '@styled-system/recipes'

import Button from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" ml="auto" display="none" h="8" lg={{ display: 'flex' }}>
          <SlidersHorizontalIcon className={icon({ right: 'sm' })} />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" w="150px">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                textTransform="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
