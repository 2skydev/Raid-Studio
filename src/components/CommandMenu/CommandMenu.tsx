'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { CircleIcon, LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'

import { css } from '@styled-system/css'

import Button from '@/components/Button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/Command'
import Kbd from '@/components/Kbd'

export interface CommandMenuProps {}

interface CommandMenuItem {
  icon?: ReactNode
  title: string
  url?: string
  onClick?: () => unknown
}

const CommandMenu = ({}: CommandMenuProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const items: CommandMenuItem[] = [
    {
      title: '대표 캐릭터 변경',
      url: '/register/character',
    },
    {
      icon: <LogOutIcon />,
      title: '로그아웃',
      onClick: () => {
        signOut()
      },
    },
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <Button
        variant="outline"
        className={css({
          position: 'relative',
          w: '60',
          justifyContent: 'flex-start',
          textStyle: 'sm',
          color: 'muted.foreground',
          mx: '4',
        })}
        onClick={() => setOpen(true)}
      >
        검색 후 바로가기...
        <Kbd
          keys={['K']}
          useCommandKey
          pos="absolute"
          right="2"
          top="50%"
          transform="translateY(-50%)"
        />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="커맨드 입력 또는 검색..." />
        <CommandList pb="1">
          <CommandEmpty mb="-1">검색 결과가 없습니다.</CommandEmpty>

          <CommandGroup heading="페이지">
            {items.map(item => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  if (item.url) {
                    runCommand(() => router.push(item.url as string))
                  } else {
                    item.onClick?.()
                  }
                }}
              >
                <div
                  className={css({
                    display: 'flex',
                    h: '4',
                    w: '4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& > svg': {
                      w: '3',
                      h: '3',
                    },
                  })}
                >
                  {item.icon || <CircleIcon />}
                </div>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
