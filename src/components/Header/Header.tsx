import clsx from 'clsx'
import Link from 'next/link'

import ThemeToggleButton from '@/features/theme/ThemeToggleButton'

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

        <ThemeToggleButton />
      </Styled.Wrap>
    </Styled.Root>
  )
}

export default Header
