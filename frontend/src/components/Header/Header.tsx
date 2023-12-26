'use client'

import clsx from 'clsx'
import { GithubIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

import CommandMenu from '@/components/CommandMenu'
import HeaderNavigationMenu from '@/components/HeaderNavigationMenu'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'
import MySquadSelect from '@/features/squad/MySquadSelect'
import ThemeToggleButton from '@/features/theme/ThemeToggleButton'

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
    <div
      className={clsx(
        'Header',
        'sticky top-0 z-header w-full border-b bg-background/80 backdrop-blur-md',
        className,
      )}
    >
      <div className="flex h-headerHeight items-center justify-between pl-4 pr-5">
        <div className="flex items-center gap-1">
          <Link href={isStudioPage ? '/studio/my/characters' : '/'} className="mr-6 font-aquatico">
            <div className="flex items-center gap-2">
              <CharacterClassIcon characterClassName="블레이드" width={22} height={22} />
              <span className="leading-1 mt-0.5">Raid Studio</span>
            </div>
          </Link>

          {isStudioPage ? <MySquadSelect /> : <HeaderNavigationMenu />}
        </div>

        <div className="flex items-center gap-1">
          <CurrentUserProfileDropdownMenu />

          <CommandMenu />

          <ThemeToggleButton />

          <Button className="h-9 w-9 p-0" variant="ghost" asChild>
            <Link href="https://github.com/2skydev/Raid-Studio" target="_blank">
              <GithubIcon size="1.2rem" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
