'use client'

import { css } from '@styled-system/css'
import { h3, muted } from '@styled-system/recipes'

import UserCharacterNameForm from '@/features/user/UserCharacterNameForm'

const RegisterNamePage = () => {
  return (
    <>
      <h1 className={h3()}>계정 닉네임 설정</h1>
      <p className={muted()}>모든 사람에게 표시될 닉네임을 설정합니다</p>

      <br />

      <UserCharacterNameForm className={css({ w: 'sm' })} characterName="" simple />
    </>
  )
}

export default RegisterNamePage
