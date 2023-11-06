import { RefreshCwIcon } from 'lucide-react'
import { useSWRConfig } from 'swr'

import Button, { ButtonProps } from '@/components/Button'

import raidStudioClient from '@/libs/raidStudio/client'
import { showAxiosErrorToast } from '@/utils/api'

export interface MyCharactersReloadButtonProps extends ButtonProps {}

const MyCharactersReloadButton = ({ children, ...props }: MyCharactersReloadButtonProps) => {
  const { mutate } = useSWRConfig()

  const reloadMyCharacters = async () => {
    try {
      await raidStudioClient.patch('/users/me/characters/reload')
      mutate('/users/me/characters')
    } catch (error) {
      showAxiosErrorToast(error)
    }
  }

  return (
    <Button onClick={reloadMyCharacters} {...props}>
      {children ?? (
        <>
          <RefreshCwIcon size="1rem" />내 캐릭터들 정보 갱신
        </>
      )}
    </Button>
  )
}

export default MyCharactersReloadButton
