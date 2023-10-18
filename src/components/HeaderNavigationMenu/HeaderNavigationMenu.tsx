import { ComponentProps } from 'react'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { css, cx } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/NavigationMenu'

import logoImage from '@/assets/images/logo.png'

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

export interface HeaderNavigationMenuProps {}

const HeaderNavigationMenu = ({}: HeaderNavigationMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link href="/" className={css({ bg: 'transparent', _hover: { bg: 'accent' } })}>
              RAID STUDIO 소개 <ChevronDown aria-hidden="true" />
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={css({
                display: 'grid',
                gap: '3',
                p: '6',
                md: {
                  w: '400px',
                },
                lg: {
                  w: '500px',
                  gridTemplateColumns: '.75fr 1fr',
                },
              })}
            >
              <li className={css({ gridRow: '3' })}>
                <NavigationMenuLink asChild>
                  <Link
                    className={css({
                      display: 'flex',
                      h: 'full',
                      w: 'full',
                      userSelect: 'none',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      rounded: 'md',
                      bgGradient: 'to-b',
                      gradientFromAlpha: 'muted/50',
                      gradientToAlpha: 'muted',
                      p: '4',
                      textDecoration: 'none',
                      outline: 'none',

                      _focus: {
                        shadow: 'md',
                      },
                    })}
                    href="/"
                  >
                    <Flex direction="column" alignItems="flex-start" justifyContent="center">
                      <Image
                        className={css({ _light: { filter: 'invert(1)' } })}
                        src={logoImage}
                        width={26}
                        height={26}
                        alt="logo"
                      />

                      <div
                        className={css({
                          mt: '4',
                          mb: '2',
                          fontSize: 'md',
                          lineHeight: '1.1',
                          fontWeight: 'bold',
                          fontFamily: 'aquatico',
                        })}
                      >
                        RAID STUDIO
                      </div>
                    </Flex>

                    <p
                      className={css({
                        textStyle: 'sm',
                        leading: 'tight',
                        color: 'muted.foreground',
                        wordBreak: 'keep-all',
                      })}
                    >
                      로스트아크 레이드 클리어 현황을 고정 파티에게 공유 및 일정 관리 하는
                      서비스입니다.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ListItem className={css({ wordBreak: 'keep-all' })} href="/" title="가이드">
                공격대 생성, 참가 등 여러가지 기능에 대한 가이드를 제공합니다.
              </ListItem>

              <ListItem href="/" title="FAQs">
                &quot;참가 코드를 얻는 방법&quot; 같은 자주 묻는 질문들을 확인할 수 있습니다.
              </ListItem>

              <ListItem href="/" title="문의하기">
                새로운 기능 제안, 버그 제보 등을 할 수 있습니다.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link
              href="/squad/list"
              className={css({ bg: 'transparent', _hover: { bg: 'accent' } })}
            >
              Studio <ChevronDown aria-hidden="true" />
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={css({
                display: 'grid',
                w: '400px',
                gap: '3',
                p: '4',

                md: {
                  w: '500px',
                  gridTemplateColumns: '2',
                },

                lg: {
                  w: '600px',
                },
              })}
            >
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
            <Link
              href="/squad/list"
              className={css({ bg: 'transparent', _hover: { bg: 'accent' } })}
            >
              공격대 목록
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
          className={cx(
            css({
              display: 'block',
              userSelect: 'none',
              spaceY: '1',
              rounded: 'md',
              p: '3',
              leading: 'none',
              textDecoration: 'none',
              outline: 'none',
              transition: 'colors',
              _hover: {
                bg: 'accent',
                color: 'accent.foreground',
              },
              _focus: {
                bg: 'accent',
                color: 'accent.foreground',
              },
            }),
            className,
          )}
          {...props}
        >
          <div>
            <div
              className={css({
                textStyle: 'sm',
                fontWeight: 'medium',
              })}
            >
              {title}
            </div>
            <p
              className={css({
                lineClamp: '2',
                textStyle: 'sm',
                color: 'muted.foreground',
              })}
            >
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default HeaderNavigationMenu
