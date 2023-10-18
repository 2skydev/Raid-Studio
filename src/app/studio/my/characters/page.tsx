'use client'

import { useMemo } from 'react'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

import { Badge } from '@/components/Badge'
import Skeleton from '@/components/Skeleton'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'

import useAPI from '@/hooks/useAPI'
import { Character } from '@/schemas/character'
import { CharacterClassName } from '@/types/character'
import { getWeekGold } from '@/utils/character'

const StudioCharactersPage = () => {
  const { data, isLoading } = useAPI<Character[]>('/users/me/characters')

  const characters = useMemo(() => {
    const clone = [...(data || [])]

    clone.sort((a, b) => {
      return b.level - a.level
    })

    return clone
  }, [data])

  const weekGold = useMemo(() => getWeekGold(characters), [characters])

  return (
    <div>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>내 캐릭터 관리</h1>
      <p className={css({ color: 'muted.foreground' })}>
        내 프로필, 대표 캐릭터, 팀 등을 설정할 수 있습니다
      </p>

      <div className={css({ mt: '6' })}>
        <div className={css({ display: 'flex', mb: '6' })}>
          {isLoading && <Skeleton w="40" h="6" rounded="full" />}

          {!isLoading && (
            <>
              <Badge>주간 골드: {weekGold.toLocaleString()}골드</Badge>
            </>
          )}
        </div>

        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
          {isLoading &&
            Array(9)
              .fill(0)
              .map((_, index) => <Skeleton key={index} w="80" h="20" />)}

          {!isLoading &&
            characters.map(item => {
              return (
                <div
                  key={item.name}
                  className={css({ w: '80', rounded: 'md', border: 'base', p: '4' })}
                >
                  <Flex alignItems="center">
                    <CharacterClassIcon
                      characterClassName={item.class as CharacterClassName}
                      width={26}
                      height={26}
                    />

                    <div className={css({ ml: '3' })}>
                      <div
                        className={css({ fontSize: 'sm', fontWeight: 'medium', leading: 'tight' })}
                      >
                        {item.name}
                      </div>
                      <div
                        className={css({
                          fontSize: 'xs',
                          color: 'muted.foreground',
                          leading: 'tight',
                        })}
                      >
                        {item.class} / {item.level}
                      </div>
                    </div>
                  </Flex>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default StudioCharactersPage
