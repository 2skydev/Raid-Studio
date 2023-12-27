import { useState } from 'react'

import { RefreshCwIcon } from 'lucide-react'
import { useSWRConfig } from 'swr'

import { Button, ButtonProps } from '@/components/ui/button'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'
import { cn } from '@/utils'

export interface MyCharactersReloadButtonProps extends ButtonProps {}

const MyCharactersReloadButton = ({ children, ...props }: MyCharactersReloadButtonProps) => {
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const reloadMyCharacters = async () => {
    try {
      if (!user) return
      setLoading(true)
      await RaidStudioAPI.characters.reloadCharacters(user.id)
      mutate('my_characters')
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={reloadMyCharacters} {...props}>
      {children ?? (
        <>
          <RefreshCwIcon className={cn(loading && 'animate-spin')} size="1rem" />내 캐릭터들 정보
          갱신
        </>
      )}
    </Button>
  )
}

export default MyCharactersReloadButton
