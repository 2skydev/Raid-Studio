'use client'

import { css } from '@styled-system/css'
import { h3, muted } from '@styled-system/recipes'

import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

const RegisterCharacterPage = () => {
  return (
    <>
      <h1 className={h3()}>대표 캐릭터 등록</h1>
      <p className={muted()}>공격대 생성, 참여 전에 대표 캐릭터 등록이 필요합니다</p>

      <br />

      <UserCharacterNameForm className={css({ w: 'sm' })} characterName="" simple />
    </>
  )
}

export default RegisterCharacterPage
