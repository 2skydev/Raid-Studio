'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { Accordion, AccordionContent, AccordionItem } from '@/components/Accordion'

import * as Styled from './Sidebar.styled'

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
        className={clsx('Sidebar', className)}
        type="multiple"
        w="full"
        defaultValue={menus.map(menu => menu.title)}
        asChild
      >
        <ul>
          {menus.map(menu => (
            <AccordionItem key={menu.title} value={menu.title} borderBottom="none" asChild>
              <li>
                <Styled.MenuAccordionTrigger>{menu.title}</Styled.MenuAccordionTrigger>

                <AccordionContent>
                  <Styled.MenuItemsGroup>
                    {menu.items.map(item => (
                      <li key={item.title}>
                        <Styled.MenuLink href={item.url} active={pathname === item.url}>
                          {item.title}
                        </Styled.MenuLink>
                      </li>
                    ))}
                  </Styled.MenuItemsGroup>
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
