import clsx from 'clsx'
import Link from 'next/link'

import { Flex } from '@styled-system/jsx'

import ThemeToggleButton from '@/features/theme/ThemeToggleButton'
import CurrentUserProfileDropdownMenu from '@/features/user/CurrentUserProfileDropdownMenu'

import AquaticoFont from '@/assets/fonts/Aquatico'

import * as Styled from './Header.styled'

export interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <Styled.Root className={clsx('Header', className)}>
      <Styled.Wrap>
        <Link href="/" className={AquaticoFont.className}>
          Raid Studio
        </Link>

        <Flex gap="4">
          <CurrentUserProfileDropdownMenu />
          <ThemeToggleButton />
        </Flex>
      </Styled.Wrap>
    </Styled.Root>
  )
}

export default Header
