import clsx from 'clsx'
import { GithubIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import Button from '@/components/Button'
import CommandMenu from '@/components/CommandMenu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/NavigationMenu'

import ThemeToggleButton from '@/features/theme/ThemeToggleButton'
import CurrentUserProfileDropdownMenu from '@/features/user/CurrentUserProfileDropdownMenu'

import logoImage from '@/assets/images/logo.png'

import * as Styled from './Header.styled'

export interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <Styled.Root className={clsx('Header', className)}>
      <Styled.Wrap>
        <Link href="/" className={css({ fontFamily: 'aquatico' })}>
          <Flex
            alignItems="center"
            gap="2"
            _light={{
              '& img': {
                filter: 'invert(1)',
              },
            }}
          >
            <Image src={logoImage} width={22} height={22} alt="logo" />
            <span className={css({ leading: '1', mt: '0.5' })}>Raid Studio</span>
          </Flex>
        </Link>

        <Flex gap="1" alignItems="center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/squad/list">전체 공격대 목록</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <CommandMenu />

          <CurrentUserProfileDropdownMenu />

          <ThemeToggleButton />

          <Button w="9" h="9" p="0" variant="ghost" asChild>
            <Link href="https://github.com/2skydev/Raid-Studio" target="_blank">
              <GithubIcon size="1.2rem" />
            </Link>
          </Button>
        </Flex>
      </Styled.Wrap>
    </Styled.Root>
  )
}

export default Header
