import { RefreshCwIcon } from 'lucide-react'

import Button, { ButtonProps } from '@/components/Button'

import { RaidStudioAPI } from '@/apis'
import useAuth from '@/hooks/useAuth'

export interface MyCharactersReloadButtonProps extends ButtonProps {}

const MyCharactersReloadButton = ({ children, ...props }: MyCharactersReloadButtonProps) => {
  const { user } = useAuth()

  const reloadMyCharacters = async () => {
    try {
      if (!user) return
      await RaidStudioAPI.characters.reloadCharacters(user.id)
    } catch (error) {}
  }

  return (
    <Button onClick={reloadMyCharacters} useOnClickLoading {...props}>
      {children ?? (
        <>
          <RefreshCwIcon size="1rem" />내 캐릭터들 정보 갱신
        </>
      )}
    </Button>
  )
}

export default MyCharactersReloadButton
