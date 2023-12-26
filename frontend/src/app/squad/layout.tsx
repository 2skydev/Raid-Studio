'use client'

import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'

import LayoutScaleMotion from '@/features/motion/LayoutScaleMotion'
import PageContentMotion from '@/features/motion/PageContentMotion'

const SquadLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <LayoutScaleMotion className="h-mainHeight">
      <div className="container h-full max-w-4xl py-8">
        <h1 className="text-2xl font-bold">공개된 공격대 목록</h1>

        <p className="font-medium text-muted-foreground">
          여기서 모든 공격대 목록, 공격대 생성, 공격대 참여 등을 할 수 있습니다
        </p>

        <Separator className="my-6" />

        <PageContentMotion key={pathname}>
          <div className="px-2.5 pb-10">{children}</div>
        </PageContentMotion>
      </div>
    </LayoutScaleMotion>
  )
}

export default SquadLayout
