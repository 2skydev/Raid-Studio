import { css } from '@styled-system/css'
import { Divider } from '@styled-system/jsx'

import Button from '@/components/Button'
import { Input } from '@/components/Input'

const MyCharacterPage = () => {
  return (
    <div>
      <h3
        className={css({
          fontSize: 'lg',
          fontWeight: 'medium',
        })}
      >
        대표 캐릭터
      </h3>
      <p
        className={css({
          fontSize: 'sm',
          color: 'muted.foreground',
        })}
      >
        대표 캐릭터를 설정할 수 있습니다
      </p>

      <Divider my="6" borderColor="border" />

      <form className={css({ spaceY: '8' })}>
        <div className={css({ spaceY: '2' })}>
          <label>대표 캐릭터 닉네임</label>
          <Input placeholder="대표 캐릭터 닉네임을 입력해주세요" />
          <p className={css({ fontSize: 'xs', color: 'muted.foreground' })}>
            내 로스트아크 대표 캐릭터 닉네임입니다. 내 다른 캐릭터를 불러올 때 사용됩니다.
          </p>
        </div>

        <Button type="submit">저장하기</Button>
      </form>
    </div>
  )
}

export default MyCharacterPage
