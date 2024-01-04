import { Loader2Icon } from 'lucide-react'

import { cn } from '@/utils'

export interface FullscreenLoadingProps {
  className?: string
}

const FullscreenLoading = ({ className }: FullscreenLoadingProps) => {
  return (
    <div className={cn('flex h-screen w-screen items-center justify-center', className)}>
      <Loader2Icon className="animate-spin" />
    </div>
  )
}

export default FullscreenLoading
