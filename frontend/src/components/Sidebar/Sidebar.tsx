'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { cn } from '@/utils'

export interface SidebarProps {
  className?: string
  children?: ReactNode
}

const menus = [
  {
    title: '내 레이드 관리',
    items: [
      {
        title: '내 캐릭터 레이드 관리',
        url: '/studio/my/characters',
      },
    ],
  },
  {
    title: '내 공격대',
    items: [
      {
        title: '모든 캐릭터',
        url: '/studio/squad/characters',
      },
      {
        title: '멤버 관리',
        url: '/studio/squad/users',
      },
    ],
  },
]

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <div>
      <Accordion
        className={clsx('Sidebar', 'w-full', className)}
        type="multiple"
        defaultValue={menus.map(menu => menu.title)}
        asChild
      >
        <ul>
          {menus.map(menu => (
            <AccordionItem key={menu.title} className="border-b-0" value={menu.title} asChild>
              <li>
                <AccordionTrigger className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:no-underline [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                  {menu.title}
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="ml-4 mt-2 space-y-1 border-l pl-2">
                    {menu.items.map(item => (
                      <li key={item.title}>
                        <Link
                          className={cn(
                            'flex w-full cursor-pointer rounded-md bg-transparent px-3 py-2 text-sm font-medium hover:bg-muted',
                            pathname === item.url && 'bg-muted',
                          )}
                          href={item.url}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </li>
            </AccordionItem>
          ))}
        </ul>
      </Accordion>
    </div>
  )
}

export default Sidebar
