import Link from 'next/link'

import { css } from '@styled-system/css'
import { Container, Divider, Flex } from '@styled-system/jsx'

import { Avatar, AvatarImage } from '@/components/Avatar'
import Button from '@/components/Button'
import { Input } from '@/components/Input'

import PageContentScaleMotion from '@/features/motion/PageContentScaleMotion'

const MyProfilePage = () => {
  return (
    <PageContentScaleMotion>
      <Container py="8">
        <h1 className={css({ fontSize: '2xl' })}>내 설정</h1>
        <p className={css({ color: 'muted.foreground' })}>
          내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
        </p>
        <Divider my="6" borderColor="border" />

        <Flex spaceX="12">
          <aside
            className={css({
              w: '64',
              display: 'flex',
              flexDir: 'column',
              spaceY: '1',
              mx: '-4',
            })}
          >
            <Button
              justifyContent="start"
              variant="link"
              className={css({
                bg: 'muted',
              })}
              asChild
            >
              <Link href="/my/profile">프로필</Link>
            </Button>

            <Button justifyContent="start" variant="link" asChild>
              <Link href="/my/profile">대표 캐릭터</Link>
            </Button>

            <Button justifyContent="start" variant="link" asChild>
              <Link href="/my/profile">팀</Link>
            </Button>
          </aside>

          <div className={css({ w: '2xl' })}>
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'medium',
              })}
            >
              프로필
            </h3>
            <p
              className={css({
                fontSize: 'sm',
                color: 'muted.foreground',
              })}
            >
              대표 캐릭터, 닉네임을 설정할 수 있습니다
            </p>

            <Divider my="6" borderColor="border" />

            <form className={css({ spaceY: '8' })}>
              <div className={css({ spaceY: '2' })}>
                <div>
                  <div>프로필 사진</div>
                  <p className={css({ fontSize: 'xs', color: 'muted.foreground' })}>
                    다른 사람들에게 표시될 프로필 사진입니다. 사진은 변경할 수 없습니다.
                  </p>
                </div>

                <Avatar>
                  <AvatarImage
                    src="https://cdn.discordapp.com/avatars/356034498137423873/2ef51ca98b8cd1e3037d55a825f81861.png"
                    alt="2sky"
                  />
                </Avatar>
              </div>

              <div className={css({ spaceY: '2' })}>
                <label>닉네임</label>
                <Input placeholder="닉네임을 입력해주세요" />
                <p className={css({ fontSize: 'xs', color: 'muted.foreground' })}>
                  다른 사람들에게 표시될 닉네임입니다.
                </p>
              </div>

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
        </Flex>
      </Container>
    </PageContentScaleMotion>
  )
}

export default MyProfilePage
