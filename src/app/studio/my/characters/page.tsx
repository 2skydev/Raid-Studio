'use client'

import { useAtomValue } from 'jotai'

import { css } from '@styled-system/css'

import { Badge } from '@/components/Badge'
import Skeleton from '@/components/Skeleton'

import CharacterCard from '@/features/character/CharacterCard'
import useCharactersDetail from '@/features/character/hooks/useCharactersDetail'

import useAPI from '@/hooks/useAPI'
import raidStudioClient from '@/libs/raidStudio/client'
import { CharacterWithClears } from '@/schemas/character'
import { currentUserAtom } from '@/stores/currentUserAtom'
import { CharacterClassName } from '@/types/character'
import { showAxiosErrorToast } from '@/utils/api'

const StudioCharactersPage = () => {
  const user = useAtomValue(currentUserAtom)!

  const { data, isLoading, mutate } = useAPI<CharacterWithClears[]>('/users/me/characters')

  const { characters, weekGold } = useCharactersDetail(data || [])

  const handleClear = async (characterName: string, raidId: string, step: number) => {
    try {
      const afterData = characters.map(character => {
        if (character.name !== characterName) return character

        // 데이터 삭제
        if (!step) {
          const clears = character.clears.filter(clear => clear.raidId !== raidId)

          return {
            ...character,
            clears,
          }
        }

        // 데이터 수정
        if (character.clears.some(clear => clear.raidId === raidId)) {
          const clears = character.clears.map(clear => {
            if (clear.raidId !== raidId) return clear

            return {
              ...clear,
              step,
              createdAt: new Date().toISOString(),
            }
          })

          return {
            ...character,
            clears,
          }
        } else {
          // 데이터 추가
          return {
            ...character,
            clears: [
              ...character.clears,
              {
                raidId,
                step,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        }
      })

      if (step) {
        await raidStudioClient.put('/clears', {
          userId: user.id,
          characterName,
          raidId,
          step,
        })
      } else {
        await raidStudioClient.delete('/clears', {
          data: {
            userId: user.id,
            characterName,
            raidId,
          },
        })
      }

      mutate(afterData, {
        revalidate: false,
      })
    } catch (error) {
      showAxiosErrorToast(error)
    }
  }

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
                <CharacterCard
                  key={item.name}
                  name={item.name}
                  level={item.level}
                  characterClassName={item.class as CharacterClassName}
                  clears={item.clears}
                  onClear={handleClear}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default StudioCharactersPage
