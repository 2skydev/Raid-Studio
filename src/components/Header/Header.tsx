import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import ThemeToggleButton from '@/features/theme/ThemeToggleButton'
import CurrentUserProfileDropdownMenu from '@/features/user/CurrentUserProfileDropdownMenu'

import AquaticoFont from '@/assets/fonts/Aquatico'
import logoImage from '@/assets/images/logo.png'

import * as Styled from './Header.styled'

export interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <Styled.Root className={clsx('Header', className)}>
      <Styled.Wrap>
        <Link href="/" className={AquaticoFont.className}>
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

        <Flex gap="4">
          <CurrentUserProfileDropdownMenu />
          <ThemeToggleButton />
        </Flex>
      </Styled.Wrap>
    </Styled.Root>
  )
}

export default Header
