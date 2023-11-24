import { useState } from 'react'

import { RefreshCwIcon } from 'lucide-react'
import { useSWRConfig } from 'swr'

import { css } from '@styled-system/css'

import Button, { ButtonProps } from '@/components/Button'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'

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
          <RefreshCwIcon className={css({ animation: loading ? 'spin' : '' })} size="1rem" />내
          캐릭터들 정보 갱신
        </>
      )}
    </Button>
  )
}

export default MyCharactersReloadButton
