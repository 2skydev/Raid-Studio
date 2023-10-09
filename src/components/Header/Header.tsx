import clsx from 'clsx'
import { GithubIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import Button from '@/components/Button'

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

        <Flex gap="1">
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
