import { ComponentProps } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'

const studioSubMenus = [
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
  {
    url: '/studio/my/characters',
    title: '클리어 관리',
    description: '클리어한 레이드, 어비스 던전 등을 관리합니다.',
  },
]

export interface HeaderNavigationMenuProps {
  className?: string
}

const HeaderNavigationMenu = ({ className }: HeaderNavigationMenuProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent" onClick={e => e.preventDefault()}>
            RAID STUDIO 소개
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="grid-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="text-decoration-none flex size-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="flex flex-col items-start justify-center">
                      <CharacterClassIcon characterClassName="블레이드" width={26} height={26} />

                      <div className="text-md mb-2 mt-4 font-aquatico font-bold leading-[1.1]">
                        RAID STUDIO
                      </div>
                    </div>

                    <p className="break-keep text-sm leading-tight text-muted-foreground">
                      로스트아크 레이드 클리어 현황을 고정 파티에게 공유 및 일정 관리 하는
                      서비스입니다.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ListItem href="/" title="가이드">
                공격대 생성, 참여 등 여러가지 기능에 대한 가이드를 제공합니다.
              </ListItem>

              <ListItem href="/" title="FAQs">
                &quot;참여 코드를 얻는 방법&quot; 같은 자주 묻는 질문들을 확인할 수 있습니다.
              </ListItem>

              <ListItem href="/" title="문의하기">
                새로운 기능 제안, 버그 제보 등을 할 수 있습니다.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent" onClick={e => e.preventDefault()}>
            Studio
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {studioSubMenus.map(component => (
                <ListItem key={component.title} title={component.title} href={component.url}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/squad/list" className={navigationMenuTriggerStyle()}>
              공개된 공격대 목록
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps extends ComponentProps<typeof Link> {
  title: string
}

const ListItem = ({ title, className, children, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={clsx(
            'block select-none space-y-1 rounded-md bg-transparent p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default HeaderNavigationMenu
