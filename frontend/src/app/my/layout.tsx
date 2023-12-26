'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import AuthenticatedOnly from '@/features/auth/AuthenticatedOnly'
import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'

import { cn } from '@/utils'

const sideMenuItems = [
  {
    title: '프로필',
    url: '/my/profile',
  },
  {
    title: '대표 캐릭터',
    url: '/my/character',
  },
]

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <AuthenticatedOnly>
      <LayoutScaleMotion className="h-mainHeight">
        <div className="container h-full py-8">
          <h1 className="text-2xl font-bold">내 설정</h1>

          <p className="text-muted-foreground">
            내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
          </p>

          <Separator className="my-6" />

          <div className="flex gap-12">
            <aside className="-mx-4 flex w-64 flex-col gap-1">
              {sideMenuItems.map(item => (
                <Button
                  key={item.title}
                  variant="link"
                  className={cn('justify-start', item.url === pathname && 'bg-muted')}
                  asChild
                >
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              ))}
            </aside>

            <div className="h-[calc(theme(sizes.mainHeight) - 10rem)] flex flex-1 overflow-hidden">
              <PageContentMotion key={pathname} className="size-full">
                <ScrollArea className="size-full">
                  <div className="w-full max-w-2xl px-2.5 pb-10">{children}</div>
                </ScrollArea>
              </PageContentMotion>
            </div>
          </div>
        </div>
      </LayoutScaleMotion>
    </AuthenticatedOnly>
  )
}

export default MyLayout
