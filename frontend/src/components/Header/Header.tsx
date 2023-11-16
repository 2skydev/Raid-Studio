'use client'

import clsx from 'clsx'
import { GithubIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import Button from '@/components/Button'
import CommandMenu from '@/components/CommandMenu'
import HeaderNavigationMenu from '@/components/HeaderNavigationMenu'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'
import MySquadSelect from '@/features/squad/MySquadSelect'
import ThemeToggleButton from '@/features/theme/ThemeToggleButton'

import * as Styled from './Header.styled'

const CurrentUserProfileDropdownMenu = dynamic(
  () => import('@/features/user/CurrentUserProfileDropdownMenu'),
  { ssr: false },
)

export interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname()
  const isStudioPage = pathname.startsWith('/studio')

  return (
    <Styled.Root className={clsx('Header', className)}>
      <Styled.Wrap>
        <Flex gap="1" alignItems="center">
          <Link
            href={isStudioPage ? '/studio/my/characters' : '/'}
            className={css({ fontFamily: 'aquatico', mr: '6' })}
          >
            <Flex alignItems="center" gap="2">
              <CharacterClassIcon characterClassName="블레이드" width={22} height={22} />
              <span className={css({ leading: '1', mt: '0.5' })}>Raid Studio</span>
            </Flex>
          </Link>

          {isStudioPage ? <MySquadSelect /> : <HeaderNavigationMenu />}
        </Flex>

        <Flex gap="1" alignItems="center">
          <CurrentUserProfileDropdownMenu />

          <CommandMenu />

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
