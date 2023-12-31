'use client'

import { useEffect, useState, type ReactNode, useMemo } from 'react'

import { CircleIcon, LogOutIcon, RefreshCwIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import Kbd from '@/components/Kbd'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'

export interface CommandMenuProps extends ButtonProps {}

interface CommandMenuGroup {
  heading: string
  items: CommandMenuItem[]
}

interface CommandMenuItem {
  icon?: ReactNode
  title: string
  url?: string
  onClick?: () => unknown
}

const CommandMenu = ({ ...props }: CommandMenuProps) => {
  const router = useRouter()
  const [loadingText, setLoadingText] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()

  const groups: CommandMenuGroup[] = useMemo(
    () => [
      {
        heading: '페이지',
        items: [
          {
            title: '홈 페이지',
            url: '/',
          },
          {
            title: '공개된 공격대 목록',
            url: '/squad/list',
          },
          ...(user
            ? [
                {
                  title: '프로필 설정',
                  url: '/my/profile',
                },
                {
                  title: '대표 캐릭터 변경',
                  url: '/my/character',
                },
                {
                  title: '내 클리어 현황',
                  url: '/studio/my/characters',
                },
              ]
            : []),
        ],
      },
      ...(user
        ? [
            {
              heading: '액션',
              items: [
                {
                  icon: <RefreshCwIcon />,
                  title: '내 캐릭터들 정보 갱신',
                  onClick: async () => {
                    try {
                      setLoadingText('내 캐릭터들 정보 갱신중...')
                      await RaidStudioAPI.characters.reloadCharacters(user.id)
                      setOpen(false)
                    } catch {
                    } finally {
                      setLoadingText(null)
                    }
                  },
                },
                {
                  icon: <LogOutIcon />,
                  title: '로그아웃',
                  onClick: async () => {
                    await signOut()
                    setOpen(false)
                  },
                },
              ],
            },
          ]
        : []),
    ],
    [user],
  )

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
        size="sm"
        className="relative w-56 justify-start text-xs text-muted-foreground"
        onClick={() => setOpen(true)}
        {...props}
      >
        검색 후 바로가기...
        <Kbd keys={['K']} useCommandKey className="absolute right-2 top-1/2 -translate-y-1/2" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="커맨드 입력 또는 검색..." />
        <CommandList className="pb-1">
          {loadingText && (
            <div className="flex h-60 w-full flex-col items-center justify-center gap-2">
              <Loader2Icon className="animate-spin" />
              <p className="text-sm text-muted-foreground">{loadingText}</p>
            </div>
          )}

          {!loadingText && (
            <>
              <CommandEmpty className="-mb-1">검색 결과가 없습니다.</CommandEmpty>

              {groups.map((group, i) => (
                <div key={group.heading}>
                  <CommandGroup heading={group.heading}>
                    {group.items.map(item => (
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
                        <div className="flex size-4 items-center justify-center [&>svg]:!size-3">
                          {item.icon || <CircleIcon />}
                        </div>
                        {item.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {i < groups.length - 1 && <CommandSeparator className="mt-1" />}
                </div>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
